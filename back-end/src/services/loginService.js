const db = require('../configs/pg');
const crypto = require('crypto');

const postLogin = async (params) => {
    try {
        const { login, senha } = params;

        const sql_get = `SELECT senha, salt FROM usuario WHERE login = $1`;
        const result = await db.query(sql_get, [login]);

        if (result.rows.length > 0) {
            const { senha: senhaArmazenada, salt } = result.rows[0];
            
            const senhaCriptografada = crypto.createHash('sha256').update(senha + salt).digest('hex');

            if (senhaCriptografada === senhaArmazenada) {
                return { success: true, message: 'Login bem-sucedido' };
            } else {
                return { success: false, message: 'Login ou senha incorretos' };
            }
        } else {
            return { success: false, message: 'Usuário não encontrado' };
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        return { success: false, message: 'Erro no servidor. Tente novamente mais tarde.' };
    }
};

module.exports.postLogin = postLogin;
