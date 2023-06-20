const db = require('../configs/pg')

const postCategoria = async (params) => {
    try {
        const sql_post = ` insert into categoria (nome, descricao, data_criacao, quantidade_topicos)
            values ('${params.nome}', 
                    '${params.descricao}',
                    current_date,
                    '${params.quantidade_topicos}')`
        await db.query(sql_post)
    } catch (error) {

    }
}

const getCategoria = async () => {
    const sql_get = `select * from categoria`
    return await db.query(sql_get)
}

const deleteCategoria = async (params) => {
    const sql_delete = `delete from categoria where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putCategoria = async (params) => {
    const sql_put = `update categoria set
            nome = $2, 
            descricao = $3,
            data_criacao = $4,
            quantidade_topicos = $5
            where id = $1`
    const { id, nome, descricao, data_criacao, quantidade_topicos } = params 
    return await db.query(sql_put, [id, nome, descricao, data_criacao, quantidade_topicos])
}

const patchCategoria = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update categoria set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.postCategoria = postCategoria
module.exports.getCategoria = getCategoria
module.exports.deleteCategoria = deleteCategoria
module.exports.putCategoria = putCategoria
module.exports.patchCategoria = patchCategoria