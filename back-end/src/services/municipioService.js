const db = require('../configs/pg');

const postMunicipio = async (params) => {
    try {
        const sql_post = `INSERT INTO municipio (nome, ibge, uf)
                          VALUES ($1, $2, $3)`;
        await db.query(sql_post, [params.nome, params.ibge, params.uf]);
    } catch (error) {
        console.error('Erro ao inserir município:', error);
        throw error;
    }
};

const getMunicipio = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const sql_get = `SELECT * FROM municipio ORDER BY id LIMIT $1 OFFSET $2`;
    return await db.query(sql_get, [limit, offset]);
};

const getTotalMunicipios = async () => {
    const sql_count = 'SELECT COUNT(*) AS total FROM municipio';
    const result = await db.query(sql_count);
    return parseInt(result.rows[0].total, 10);
};

const deleteMunicipio = async (id) => {
    const sql_delete = `DELETE FROM municipio WHERE id = $1`;
    await db.query(sql_delete, [id]);
};

const putMunicipio = async (params) => {
    const sql_put = `UPDATE municipio SET
                     nome = $2, 
                     ibge = $3,
                     uf = $4
                     WHERE id = $1`;
    const { id, nome, ibge, uf } = params;
    return await db.query(sql_put, [id, nome, ibge, uf]);
};

const patchMunicipio = async (params) => {
    let fields = [];
    Object.keys(params).forEach(e => e !== 'id' && fields.push(`${e} = $${fields.length + 2}`));
    fields = fields.join(', ');
    const sql = `UPDATE municipio SET ${fields} WHERE id = $1`;
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
