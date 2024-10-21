const db = require('../configs/pg')

const getLogMonitoramento = async () => {
    const sql_get = `select 
            acao,
            tabela,
            usuario_acao,
            to_char(data_log, 'DD/MM/YYYY HH24:MI:SS') as data_log,
            dados_antigos->'casos_ativos' as old_casos_ativos,
            dados_antigos->'casos_mortes' as old_casos_mortes,
            dados_antigos->'casos_confirmados' as old_casos_confirmados,
            dados_antigos->'casos_monitorados' as old_casos_monitorados,
            dados_alterados->'casos_ativos' as new_casos_ativos,
            dados_alterados->'casos_mortes' as new_casos_mortes,
            dados_alterados->'casos_confirmados' as new_casos_confirmados,
            dados_alterados->'casos_monitorados' as new_casos_monitorados
        from log
        where tabela = 'monitoramento'`;
    return await db.query(sql_get)
};

const getLogDenuncia = async () => {
    const sql_get = `select 
            acao,
            tabela,
            usuario_acao,
            to_char(data_log, 'DD/MM/YYYY HH24:MI:SS') as data_log,
            dados_antigos->'anonima' as old_anonima,
            dados_antigos->'latitude' as old_latitude,
            dados_antigos->'image_url' as old_image_url,
            dados_antigos->'longitude' as old_longitude,
            dados_antigos->'confirmado' as old_confirmado,
            dados_antigos->'logradouro' as old_logradouro,
            dados_antigos->'id_municipio' as old_id_municipio,
            dados_antigos->'chave_denuncia' as old_chave_denuncia,
            dados_antigos->'nome_denunciante' as old_nome_denunciante,
            dados_antigos->'email_denunciante' as old_email_denunciante,
            dados_antigos->'descricao_denuncia' as old_descricao_denuncia,
            dados_antigos->'telefone_denunciante' as old_telefone_denunciante,
            dados_alterados->'anonima' as new_anonima,
            dados_alterados->'latitude' as new_latitude,
            dados_alterados->'image_url' as new_image_url,
            dados_alterados->'longitude' as new_longitude,
            dados_alterados->'confirmado' as new_confirmado,
            dados_alterados->'logradouro' as new_logradouro,
            dados_alterados->'id_municipio' as new_id_municipio,
            dados_alterados->'chave_denuncia' as new_chave_denuncia,
            dados_alterados->'nome_denunciante' as new_nome_denunciante,
            dados_alterados->'email_denunciante' as new_email_denunciante,
            dados_alterados->'descricao_denuncia' as new_descricao_denuncia,
            dados_alterados->'telefone_denunciante' as new_telefone_denunciante
        from log 
        where tabela = 'denuncia'`;
    return await db.query(sql_get)
};

module.exports = {
    getLogMonitoramento,
    getLogDenuncia
};