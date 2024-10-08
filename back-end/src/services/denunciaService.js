const db = require('../configs/pg')

const generateRandomKey = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const postDenuncia = async (params) => {
    try {

        const sql_post = `
            insert into denuncia 
            (anonima, email_denunciante, nome_denunciante, telefone_denunciante, 
             id_municipio, logradouro, descricao_denuncia, confirmado, latitude, longitude, chave_denuncia, image_url)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;

        const values = [
            params.anonima, 
            params.email_denunciante || null, 
            params.nome_denunciante || null,  
            params.telefone_denunciante || null,  
            params.id_municipio,
            params.logradouro,
            params.descricao_denuncia,
            params.confirmado,
            params.latitude || null,
            params.longitude || null,
            generateRandomKey(10),
            params.image_url || null 
        ];

        await db.query(sql_post, values);
    } catch (error) {
        console.error('Erro ao inserir denúncia:', error);
        throw error;
    }
};

const getUltimasDenuncias = async (limit = 5) => {
    const sql_get = `select d.*, m.nome as id_municipio
                     from denuncia d
                     left join municipio m on (d.id_municipio = m.id)
                     order by d.id desc
                     limit $1`;
    
    return await db.query(sql_get, [limit]);
};

const putDenuncia = async (params) => {
    const sql_put = `
        update denuncia set
            anonima = $2, 
            email_denunciante = $3,
            nome_denunciante = $4,
            telefone_denunciante = $5,
            id_municipio = $6,
            logradouro = $7,
            descricao_denuncia = $8,
            id_status = $9
        where id = $1
    `;
    const { id, anonima, email_denunciante, nome_denunciante, telefone_denunciante, id_municipio, logradouro, descricao_denuncia, id_status  } = params;

    return await db.query(sql_put, [id, anonima, email_denunciante, nome_denunciante, telefone_denunciante, id_municipio, logradouro, descricao_denuncia, id_status]);
};

const getDenuncia = async (page = 1, limit = 10, chave_denuncia = '', email_denunciante = '') => {
    const offset = (page - 1) * limit;
    let sql_get = `select * from denuncia where true`;
    let values = [];

    if (chave_denuncia) {
        sql_get += ` and chave_denuncia = $${values.length + 1}`;
        values.push(chave_denuncia);
    }

    if (email_denunciante) {
        sql_get += ` and email_denunciante ilike $${values.length + 1}`;
        values.push(`%${email_denunciante}%`);
    }

    sql_get += ` order by id limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);

    return await db.query(sql_get, values);
};

const getTotalDenuncias = async (chave_denuncia = '', email_denunciante = '') => {
    let sql_count = 'select count(*) as total from denuncia where true';
    let values = [];

    if (chave_denuncia) {
        sql_count += ` and chave_denuncia = $${values.length + 1}`;
        values.push(chave_denuncia);
    }

    if (email_denunciante) {
        sql_count += ` and email_denunciante ilike $${values.length + 1}`;
        values.push(`%${email_denunciante}%`);
    }

    const result = await db.query(sql_count, values);
    return parseInt(result.rows[0].total, 10);
};

const deleteDenuncia = async (params) => {
    const sql_delete = `delete from denuncia where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const patchDenuncia = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    const sql = `update denuncia set ${fields} where id = ${params.id}`;
    await db.query(sql);
};


module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia,
    getTotalDenuncias,
    getUltimasDenuncias
};