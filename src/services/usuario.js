const db = require('../configs/pg')


const getUsuario = async () => {
    const sql_get = `select * from usuario`
    return await db.query(sql_get)
}


const deleteUsuario = async (params) => {
    const sql_delete = `delete from usuario where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const postUsuario = async (params) => {
    try {
        const sql_post = `insert into usuario (nome, email, senha, data_cadastro, reputacao) values (
            '${params.nome}', 
            '${params.email}', 
            '${params.senha}', 
            current_date,
            '${params.reputacao}'
        )`
        await db.query(sql_post)
    } catch (error) {   
    }
}

const putUsuario = async (params) => {
    const sql_put = `update usuario set
            nome = $2,
            email = $3,
            senha = $4,
            data_cadastro = $5,
            reputacao = $6
            where id = $1 `
    const { id, nome, email, senha, data_cadastro, reputacao } = params 
    return await db.query(sql_put, [id, nome, email, senha, data_cadastro, reputacao])
}


const patchUsuario = async (params) => {
    let fields = [];
    Object.keys(params).map(p => p).forEach(e => e !== 'id' && fields.push(`${e} = '${params[e]}'`));
    fields = fields.join(', ');
    console.log(params)
    const sql = `update usuario set ${fields} where id = ${params.id}`;
    await db.query(sql);
}

module.exports.getUsuario = getUsuario
module.exports.deleteUsuario = deleteUsuario
module.exports.postUsuario = postUsuario
module.exports.putUsuario = putUsuario
module.exports.patchUsuario = patchUsuario