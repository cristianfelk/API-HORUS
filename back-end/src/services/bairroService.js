const db = require('../configs/pg')

const postBairro = async (params) => {
    try {
        const sql_post = ` insert into bairro (descricao, municipio_id)
            values ('${params.descricao}', 
                    ${params.municipio_id})`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getBairro = async () => {
    const sql_get = `select * from bairro`
    return await db.query(sql_get)
}

const deleteBairro = async (params) => {
    const sql_delete = `delete from bairro where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putBairro = async (params) => {
    const sql_put = `update bairro set
            descricao = $2, 
            municipio_id = $3,
            where id = $1`
    const { id, descricao, municipio_id } = params 
    return await db.query(sql_put, [id, descricao, municipio_id])
}

const patchBairro = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update bairro set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.postBairro = postBairro
module.exports.getBairro = getBairro
module.exports.deleteBairro = deleteBairro
module.exports.putBairro = putBairro
module.exports.patchBairro = patchBairro