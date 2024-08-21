const db = require('../configs/pg')

const postLogradouro = async (params) => {
    try {
        const sql_post = ` insert into logradouro (municipio_id, cep, logradouro, complemento, bairro)
            values (${params.municipio_id}, 
                     '${params.cep}',
                     '${params.logradouro}',
                     '${ṕarams.complemento}',
                     '${params.bairro}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getLogradouro = async () => {
    const sql_get = `select * from logradouro`
    return await db.query(sql_get)
}

const deleteLogradouro = async (params) => {
    const sql_delete = `delete from logradouro where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putLogradouro = async (params) => {
    const sql_put = `update logradouro set
            municipio_id = $2, 
            cep = $3,
            logradouro = $4,
            complemento = $5,
            bairro = $6
            where id = $1`
    const { id, municipio_id, cep, logradouro, complemento, bairro } = params 
    return await db.query(sql_put, [id, municipio_id, cep, logradouro, complemento, bairro])
}

const patchLogradouro = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update logradouro set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports = {
    postLogradouro,
    getLogradouro,
    deleteLogradouro,
    putLogradouro,
    patchLogradouro
};
