const db = require('../configs/pg')

const getLog = async () => {
    const sql_get = `select 
                        id, acao, tabela, 
                        usuario_acao, dados_antigos, 
                        dados_alterados, 
                        to_char(data_log, 'DD/MM/YYYY HH24:MI:SS') as data_log
                    from log`;
    return await db.query(sql_get)
}

module.exports = {
    getLog
};