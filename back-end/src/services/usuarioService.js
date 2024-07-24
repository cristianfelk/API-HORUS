const db = require('../configs/pg');
const crypto = require('crypto');

const postUsuario = async (params) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const senhaCriptografada = crypto.createHash('sha256').update(params.senha + salt).digest('hex');
        //gera a criptografia da senha do usuario

        const sql_post = `insert into usuario (nome, login, senha, salt, email, data_cadastro)
                          values ('${params.nome}', 
                                  '${params.login}',
                                  '${senhaCriptografada}',
                                  '${salt}',
                                  '${params.email}',
                                  current_date)`;
        await db.query(sql_post);
    } catch (error) {
        
    }
}

// busca todos usuários
const getUsuario = async () => {
    const sql_get = `select * from usuario`
    return await db.query(sql_get)
}

//consulta usuario por id
const getUsuarioById = async (params) => {
    const sql_get = `select * from usuario where id = $1`
    const { id } = params 
    return await db.query(sql_get, [id])
}

const deleteUsuario = async (params) => {
    const sql_delete = `delete from usuario where id = $1`
    const { id } = params
    await db.query(sql_delete, [id])
}

const putUsuario = async (params) => {
    const sql_put = `update usuario set
            nome = $2, 
            login = $3,
            senha = $4,
            email = $5
            where id = $1`
    const { id, nome, login, senha, email } = params 
    return await db.query(sql_put, [id, nome, login, senha, email])
}

const patchUsuario = async (params) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const senhaCriptografada = crypto.createHash('sha256').update(params.senha + salt).digest('hex');
    const { senha, ...paramsSemSenha } = params; //remove a senha pra nao atualizar diretamente

    let fields = [];
    Object.keys(paramsSemSenha).forEach(e => e !== 'id' && fields.push(`${e} = '${paramsSemSenha[e]}'`));
    fields.push(`senha = '${senhaCriptografada}'`);
    fields = fields.join(', ');

    const sql = ` update usuario set ${fields} where id = ${params.id}`;
    await db.query(sql);

};


module.exports.postUsuario = postUsuario
module.exports.getUsuario = getUsuario
module.exports.getUsuarioById = getUsuarioById
module.exports.deleteUsuario = deleteUsuario
module.exports.putUsuario = putUsuario
module.exports.patchUsuario = patchUsuario