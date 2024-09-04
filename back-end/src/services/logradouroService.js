const db = require('../configs/pg')

const postLogradouro = async (params) => {
    try {
        const sql_post = ` insert into logradouro (municipio_id, cep, logradouro, complemento, bairro)
            values (${params.municipio_id}, 
                     '${params.cep}',
                     '${params.logradouro}',
                     '${params.complemento}',
                     '${params.bairro}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getLogradouroById  = async (params) => {
    const sql_get = `select * from logradouro where id = $1`;
    const { id } = params;
    return (await db.query(sql_get, [id])).rows;   
}

const getLogradourosByNome = async (logradouro) => {
    const sql_search = `
        select * 
        from logradouro 
        where logradouro ilike $1
    `;
    const searchParam = `%${logradouro}%`;
    const result = await db.query(sql_search, [searchParam]);
    return result.rows;
};

const getByComplemento = async (complemento) => {
    const sql_search = `
        select * 
        from logradouro 
        where complemento ilike $1
    `;
    const searchParam = `%${complemento}%`;
    const result = await db.query(sql_search, [searchParam]);
    return result.rows;
};

const getLogradouro = async (page = 1, limit = 10, cep = '', bairro = '') => {
    const offset = (page - 1) * limit;
    let sql_get = `select * from logradouro where true`;
    let values = [];

    if (cep) {
        sql_get += ` and cep = $${values.length + 1}`;
        values.push(cep);
    }

    if (bairro) {
        sql_get += ` and bairro ilike $${values.length + 1}`;
        values.push(`%${bairro}%`);
    }

    sql_get += ` order by bairro limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);

    return await db.query(sql_get, values);
};

const getTotalLogradouros = async (cep = '', bairro = '') => {
    let sql_count = 'select count(*) as total from logradouro where true';
    let values = [];

    if (cep) {
        sql_count += ` and cep = $${values.length + 1}`;
        values.push(cep);
    }

    if (bairro) {
        sql_count += ` and bairro ilike $${values.length + 1}`;
        values.push(`%${bairro}%`);
    }

    const result = await db.query(sql_count, values);
    return parseInt(result.rows[0].total, 10);
}; 

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
};

module.exports = {
    postLogradouro,
    getLogradouro,
    deleteLogradouro,
    putLogradouro,
    patchLogradouro,
    getLogradouroById,
    getTotalLogradouros,
    getLogradourosByNome,
    getByComplemento
};