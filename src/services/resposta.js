const db = require('../configs/pg')

const postResposta = async (params) => {
    try {
        const sql_post = ` insert into resposta (conteudo, data_criacao, usuario_id, topico_id)
            values ('${params.conteudo}', 
                    current_date, 
                    '${params.usuario_id}', 
                    '${params.topico_id}') `
        await db.query(sql_post)
    } catch (error) {

    }
}

const getResposta = async () => {
    const sql_get = `select * from resposta`
    return await db.query(sql_get, [])
}

const deleteResposta = async (params) => {
    const sql_delete = `delete from resposta where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}


const putResposta = async (params) => {
    const sql_put = `update topico set
            conteudo = $2, 
            data_criacao = $3, 
            usuario_id = $4,
            topico_id = $5
            where id = $1`
    const { id, conteudo, data_criacao, usuario_id, topico_id } = params 
    return await db.query(sql_put, [id, conteudo, data_criacao, usuario_id, topico_id])
}

const patchResposta = async (params) => {
    const sql_patch = ` update resposta set `
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if (params.conteudo) {
        countParams ++
        fields += ` conteudo = $${countParams} `
        binds.push(params.conteudo)
    }
    if (params.usuario_id) {
        countParams ++
        fields += ` usuario_id = $${countParams} `
        binds.push(params.usuario_id)
    }
    if (params.topico_id) {
        countParams ++
        fields += ` topico_id = $${countParams} `
        binds.push(params.topico_id)
    }
    let sql = sql_patch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}

module.exports.postResposta = postResposta
module.exports.deleteResposta = deleteResposta
module.exports.getResposta = getResposta
module.exports.putResposta = putResposta
module.exports.patchResposta = patchResposta