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
    return await db.query(sql_get)
}

const deleteResposta = async (params) => {
    const sql_delete = `delete from resposta where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}


const putResposta = async (params) => {
    const sql_put = `update resposta set
            conteudo = $2, 
            data_criacao = $3, 
            usuario_id = $4,
            topico_id = $5
            where id = $1`
    const { id, conteudo, data_criacao, usuario_id, topico_id} = params 
    return await db.query(sql_put, [id, conteudo, data_criacao, usuario_id, topico_id])
}

const patchResposta = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update resposta set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.postResposta = postResposta
module.exports.deleteResposta = deleteResposta
module.exports.getResposta = getResposta
module.exports.putResposta = putResposta
module.exports.patchResposta = patchResposta