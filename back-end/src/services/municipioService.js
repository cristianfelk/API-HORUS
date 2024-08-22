const db = require('../configs/pg');

const postMunicipio = async (params) => {
    try {
        const sql_post = `insert into municipio (nome, ibge, uf)
                          values ($1, $2, $3)`;
        await db.query(sql_post, [params.nome, params.ibge, params.uf]);
    } catch (error) {
        console.error('Erro ao inserir município:', error);
        throw error;
    }
};

const getMunicipio = async (page = 1, limit = 10, uf = '', nome = '') => {
    const offset = (page - 1) * limit;
    let sql_get = `select * from municipio where true`;
    let values = [];

    if (uf) {
        sql_get += ` and uf = $${values.length + 1}`;
        values.push(uf);
    }

    if (nome) {
        sql_get += ` and nome ILIKE $${values.length + 1}`;
        values.push(`%${nome}%`);
    }

    sql_get += ` order by nome limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);

    return await db.query(sql_get, values);
};

const getTotalMunicipios = async (uf = '', nome = '') => {
    let sql_count = 'select count(*) as total from municipio where true';
    let values = [];

    if (uf) {
        sql_count += ` and uf = $${values.length + 1}`;
        values.push(uf);
    }

    if (nome) {
        sql_count += ` and nome ILIKE $${values.length + 1}`;
        values.push(`%${nome}%`);
    }

    const result = await db.query(sql_count, values);
    return parseInt(result.rows[0].total, 10);
};

const deleteMunicipio = async (id) => {
    const sql_delete = `delete from municipio where id = $1`;
    await db.query(sql_delete, [id]);
};

const putMunicipio = async (params) => {
    const sql_put = `update municipio set
                     nome = $2, 
                     ibge = $3,
                     uf = $4
                     where id = $1`;
    const { id, nome, ibge, uf } = params;
    return await db.query(sql_put, [id, nome, ibge, uf]);
};

const patchMunicipio = async (params) => {
    let fields = [];
    Object.keys(params).forEach(e => e !== 'id' && fields.push(`${e} = $${fields.length + 2}`));
    fields = fields.join(', ');
    const sql = `update municipio set ${fields} where id = $1`;
    const values = [params.id, ...Object.values(params).filter((_, index) => index !== 0)];
    await db.query(sql, values);
};

module.exports = {
    postMunicipio,
    getMunicipio,
    getTotalMunicipios,
    deleteMunicipio,
    putMunicipio,
    patchMunicipio
};