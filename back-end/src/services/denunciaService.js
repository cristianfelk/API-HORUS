const db = require('../configs/pg')

const postDenuncia = async (params) => {
    try {
        const sql_post = ` insert into denuncia (anonima, dados_denuncia, chave_denuncia)
            values (${params.anonima}, 
                    ${params.dados_denuncia},
                    '${params.chave_denuncia}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getDenuncia = async () => {
    const sql_get = `select * from denuncia`
    return await db.query(sql_get)
}

const deleteDenuncia = async (params) => {
    const sql_delete = `delete from denuncia where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putDenuncia = async (params) => {
    const sql_put = `update denuncia set
            anonima = $2, 
            dados_denuncia = $3,
            chave_denuncia = $4
            where id = $1`
    const { id, anonima, dados_denuncia, chave_denuncia } = params 
    return await db.query(sql_put, [id, anonima, dados_denuncia, chave_denuncia])
}

const patchDenuncia = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update denuncia set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.postDenuncia = postDenuncia
module.exports.getDenuncia = getDenuncia
module.exports.deleteDenuncia = deleteDenuncia
module.exports.putDenuncia = putDenuncia
module.exports.patchDenuncia = patchDenuncia