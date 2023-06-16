const db = require('../configs/pg')

const postVoto = async (params) => {
    try {
        const sql_post = `insert into voto_resposta (usuario_id, resposta_id, tipo_voto) values (
            '${params.usuario_id}' , 
            '${params.resposta_id}', 
            '${params.tipo_voto}')`
        await db.query(sql_post)    
    } catch (error) {   
    }
}

const getVoto = async () => {
    const sql_get = `select * from voto_resposta`
    return await db.query(sql_get)
}


const deleteVoto = async (params) => {
    const sql_delete = `delete from voto_resposta where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putVoto = async (params) => {
    const sql_put = `update voto_resposta set
            usuario_id = $2, 
            resposta_id = $3, 
            tipo_voto = $4
            where id = $1`
    const { id, usuario_id, resposta_id, tipo_voto } = params 
    return await db.query(sql_put, [ id, usuario_id, resposta_id, tipo_voto ])
}

const patchVoto = async (params) => {
    const sql_patch = ` update voto_resposta set `
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if (params.resposta_id) {
        countParams ++
        fields += ` resposta_id = $${countParams} `
        binds.push(params.resposta_id)
    }
    if (params.tipo_voto) {
        countParams ++
        fields += ` tipo_voto = $${countParams} `
        binds.push(params.tipo_voto)
    }
    let sql = sql_patch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}

module.exports.postVoto = postVoto
module.exports.deleteVoto = deleteVoto
module.exports.getVoto = getVoto
module.exports.putVoto = putVoto
module.exports.patchVoto = patchVoto