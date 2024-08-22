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

const getMunicipio = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const sql_get = `select * from municipio order by nome limit $1 offset $2`;
    return await db.query(sql_get, [limit, offset]);
};

const getTotalMunicipios = async () => {
    const sql_count = 'select count(*) as total from municipio';
    const result = await db.query(sql_count);
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
