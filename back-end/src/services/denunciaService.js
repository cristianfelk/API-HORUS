const db = require('../configs/pg')

const postDenuncia = async (params) => {
    try {
        const sql_post = `
            insert into denuncia 
            (anonima, email_denunciante, nome_denunciante, telefone_denunciante, 
             id_municipio, id_logradouro, descricao_denuncia, latitude, longitude, id_status, chave_denuncia)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        const values = [
            params.anonima, 
            params.email_denunciante || null, 
            params.nome_denunciante || null,  
            params.telefone_denunciante || null,  
            params.id_municipio,
            params.id_logradouro,
            params.descricao_denuncia,
            params.latitude,
            params.longitude,
            params.id_status, 
            params.chave_denuncia
        ];

        await db.query(sql_post, values);
    } catch (error) {
        console.error('Erro ao inserir denúncia:', error);
        throw error;
    }
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

module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia
};