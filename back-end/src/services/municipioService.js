const db = require('../configs/pg')

const postMunicipio = async (params) => {
    try {
        const sql_post = ` insert into municipio (nome, ibge, uf)
            values ('${params.nome}', 
                    '${params.ibge}',
                    '${params.uf}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getMunicipio = async () => {
    const sql_get = `select * from municipio`
    return await db.query(sql_get)
}

const deleteMunicipio = async (params) => {
    const sql_delete = `delete from municipio where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putMunicipio = async (params) => {
    const sql_put = `update municipio set
            nome = $2, 
            ibge = $3,
            uf = $4
            where id = $1`
    const { id, nome, ibge, uf } = params 
    return await db.query(sql_put, [id, nome, ibge, uf])
}

const patchMunicipio = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update municipio set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.postMunicipio = postMunicipio
module.exports.getMunicipio = getMunicipio
module.exports.deleteMunicipio = deleteMunicipio
module.exports.putMunicipio = putMunicipio
module.exports.patchMunicipio = patchMunicipio
