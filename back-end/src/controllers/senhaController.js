const senhaService = require('../services/senhaService');

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await senhaService.getUsuarioByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        await senhaService.generatePasswordResetToken(user.id, token);

        res.status(200).json({ message: 'Instruções de recuperação de senha enviadas para o email.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao solicitar recuperação de senha.' });
    }
};

const verifyResetCode = async (req, res) => {
    try {
        const { userId, token } = req.body;
        const isValid = await senhaService.verifyResetCode(userId, token);

        if (!isValid) {
            return res.status(400).json({ message: 'Código inválido ou expirado.' });
        }

        res.status(200).json({ message: 'Código verificado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao verificar código de recuperação.' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await senhaService.resetPassword(token, newPassword);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao redefinir a senha.' });
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword
};
