const crypto = require('crypto');
const senhaService = require('../services/senhaService');

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: 'Email inválido.' });
        }

        const user = await senhaService.getUsuarioByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        await senhaService.generatePasswordResetToken(user.id, token);

        res.status(200).json({ message: 'Instruções de recuperação de senha enviadas para o email.' });
    } catch (error) {
        console.error('Erro ao solicitar recuperação de senha:', error);
        res.status(500).json({ message: 'Erro ao solicitar recuperação de senha.' });
    }
};

const verifyResetCode = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token é necessário.' });
        }

        const isValid = await senhaService.verifyResetCode(token);

        if (!isValid) {
            return res.status(400).json({ message: 'Código inválido ou expirado.' });
        }

        res.status(200).json({ message: 'Código verificado com sucesso.' });
    } catch (error) {
        console.error('Erro ao verificar código de recuperação:', error);
        res.status(500).json({ message: 'Erro ao verificar código de recuperação.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Token ou senha inválidos.' });
        }

        await senhaService.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(500).json({ message: 'Erro ao redefinir a senha.' });
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
};