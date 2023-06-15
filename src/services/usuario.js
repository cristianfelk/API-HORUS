const db = require('../configs/pg')
const cript = require('../configs/crypto')

const getUsuario = async () => {
    const sql_get = `select * from usuario`
    return await db.query(sql_get, [])
}


const deleteUsuario = async (params) => {
    const sql_delete = `delete from usuario where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const postUsuario = async (params) => {
    try {
        const sql_post = `insert into usuario (nome, email, senha, data_cadastro, reputacao) values (
            '${params.nome}' , 
            '${params.email}', 
            '${params.senha}', 
            current_date,
            '${params.reputacao}'
        )`
        await db.query(sql_post)
        const salt = cript.generateSalt
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
            where id = $1`
    const { id, nome, email, senha, data_cadastro, reputacao } = params 
    return await db.query(sql_put, [id, nome, email, senha, data_cadastro, reputacao])
}

const patchUsuario = async (params) => {
    const sql_patch = ` update usuario set `
    let fields = ''
    let binds = []
    binds.push(params.id)
    let countParams = 1
    if (params.nome) {
        countParams ++
        fields += ` nome = $${countParams} `
        binds.push(params.nome)
    }
    if (params.email) {
        countParams ++
        fields += ` email = $${countParams} `
        binds.push(params.email)
    }
    if (params.senha) {
        countParams ++
        fields += ` senha = $${countParams} `
        binds.push(params.senha)
    }
    let sql = sql_patch + fields + ' where id = $1 '
    return await db.query(sql, binds)
}

module.exports.getUsuario = getUsuario
module.exports.deleteUsuario = deleteUsuario
module.exports.postUsuario = postUsuario
module.exports.putUsuario = putUsuario
module.exports.patchUsuario = patchUsuario