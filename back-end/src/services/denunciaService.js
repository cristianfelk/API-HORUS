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
             id_municipio, logradouro, descricao_denuncia, id_status, chave_denuncia, image_url)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;

        const values = [
            params.anonima, 
            params.email_denunciante || null, 
            params.nome_denunciante || null,  
            params.telefone_denunciante || null,  
            params.id_municipio,
            params.logradouro,
            params.descricao_denuncia,
            params.id_status = 'Pendente', 
            generateRandomKey(10),
            params.image_url || null 
        ];

        await db.query(sql_post, values);
    } catch (error) {
        console.error('Erro ao inserir denúncia:', error);
        throw error;
    }
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
            id_status = $9,
            chave_denuncia = $10,
            image_url = $11
        where id = $1
    `;
    const { id, anonima, email_denunciante, nome_denunciante, telefone_denunciante, id_municipio, logradouro, descricao_denuncia, id_status, chave_denuncia, image_url } = params;

    return await db.query(sql_put, [id, anonima, email_denunciante, nome_denunciante, telefone_denunciante, id_municipio, logradouro, descricao_denuncia, id_status, chave_denuncia, image_url]);
};

const getDenuncia = async () => {
    const sql_get = `select * from denuncia`
    return await db.query(sql_get)
}

const deleteDenuncia = async (params) => {
    const sql_delete = `delete from denuncia where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const patchDenuncia = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    const sql = `update denuncia SET ${fields}  id = ${params.id}`;
    await db.query(sql);
};


module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia
};