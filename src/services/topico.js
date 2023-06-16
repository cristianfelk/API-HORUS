const db = require('../configs/pg');

const postTopico = async (params) => {
    try {
        const sql_post = ` insert into topico (titulo, conteudo, data_criacao, usuario_id, categoria_id)
            values ('${params.titulo}',
                    '${params.conteudo}', 
                    current_date, 
                    '${params.usuario_id}', 
                    '${params.categoria_id}') `
        await db.query(sql_post)
    } catch (error) {

    }
}

const getTopico = async () => {
    const sql_get = `select * from topico`
    return await db.query(sql_get)
}

const deleteTopico = async (params) => {
    const sql_delete = `delete from topico where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putTopico = async (params) => {
    const sql_put = `update topico set
            titulo = $2, 
            conteudo = $3, 
            data_criacao = $4,
            usuario_id = $5,
            categoria_id = $6
            where id = $1`
    const { id, titulo, conteudo, data_criacao, usuario_id, categoria_id } = params 
    return await db.query(sql_put, [id, titulo, conteudo, data_criacao, usuario_id, categoria_id])
}

const patchTopico = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update topico set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.deleteTopico = deleteTopico
module.exports.postTopico = postTopico
module.exports.getTopico = getTopico
module.exports.putTopico = putTopico
module.exports.patchTopico = patchTopico