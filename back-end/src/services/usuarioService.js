const db = require('../configs/pg');
const crypto = require('crypto');

const postUsuario = async (params) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const senhaCriptografada = crypto.createHash('sha256').update(params.senha + salt).digest('hex');

        const sql_post = `insert into usuario (nome, login, senha, salt, email, status, data_cadastro)
                          values ('${params.nome}', 
                                  '${params.login}',
                                  '${senhaCriptografada}',
                                  '${salt}',
                                  '${params.email}',
                                  '${params.status}',
                                  current_date)`;
        await db.query(sql_post);
    } catch (error) {
        
    }
}

const getUsuario = async () => {
    const sql_get = `select * from usuario`
    return await db.query(sql_get)
}

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
    let sql_put = `update usuario set
            nome = $2, 
            login = $3,
            email = $4,
            status = $5
            where id = $1`;
    
    const values = [params.id, params.nome, params.login, params.email, params.status];

    if (params.senha) {
        const salt = crypto.randomBytes(16).toString('hex');
        const senhaCriptografada = crypto.createHash('sha256').update(params.senha + salt).digest('hex');
        sql_put = `update usuario set
                    nome = $2, 
                    login = $3,
                    senha = $4,
                    salt = $5,
                    email = $6,
                    status = $7
                    where id = $1`;
        values.splice(3, 0, senhaCriptografada); 
        values.splice(4, 0, salt);
    }

    return await db.query(sql_put, values);
}

const patchUsuario = async (params) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const senhaCriptografada = crypto.createHash('sha256').update(params.senha + salt).digest('hex');
    const { senha, ...paramsSemSenha } = params;

    let fields = [];
    Object.keys(paramsSemSenha).forEach(e => e !== 'id' && fields.push(`${e} = '${paramsSemSenha[e]}'`));
    fields.push(`senha = '${senhaCriptografada}'`);
    fields = fields.join(', ');

    const sql = ` update usuario set ${fields} where id = ${params.id}`;
    await db.query(sql);

};

module.exports = {
    postUsuario,
    getUsuario,
    getUsuarioById,
    deleteUsuario,
    putUsuario,
    patchUsuario
};