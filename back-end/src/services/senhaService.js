const db = require('../configs/pg');
const crypto = require('crypto');

const getUsuarioByEmail = async (email) => {
    const sql_get = `select * from usuario where email = $1`;
    return await db.query(sql_get, [email]);
};

const generatePasswordResetToken = async (userId, token) => {
    const sql_update = `update usuario set reset_token = $2, reset_token_expiration = current_timestamp + interval '1 hour' where id = $1`;
    await db.query(sql_update, [userId, token]);
};

const verifyResetCode = async (token) => {
    const sql_get = `
        select * from usuario 
        where reset_token = $1 and reset_token_expiration > current_timestamp
    `;
    const result = await db.query(sql_get, [token]);
    return result.rows.length > 0;
};

const resetPassword = async (token, newPassword) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const senhaCriptografada = crypto.createHash('sha256').update(newPassword + salt).digest('hex');

    const sql_update = `update usuario set senha = $2, salt = $3, reset_token = NULL, reset_token_expiration = NULL where reset_token = $1`;
    await db.query(sql_update, [token, senhaCriptografada, salt]);
};

module.exports = {
    getUsuarioByEmail,
    generatePasswordResetToken,
    verifyResetCode,
    resetPassword
};