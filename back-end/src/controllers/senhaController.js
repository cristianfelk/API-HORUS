const crypto = require('crypto');
const nodemailer = require('nodemailer');
const senhaService = require('../services/senhaService');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "horusapi@outlook.com",
        pass: "Horus123."
    },
    tls: {
        rejectUnauthorized: false
    }
});

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const userResult = await senhaService.getUsuarioByEmail(email);
        if (userResult.rows.length === 0) {
            return res.status(404).send('E-mail não encontrado');
        }

        const user = userResult.rows[0];

        const resetToken = crypto.randomBytes(6).toString('hex');

        await senhaService.generatePasswordResetToken(user.id, resetToken);

        const mailOptions = {
            from: 'horusapi@outlook.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Seu código de recuperação é: ${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('Código de recuperação enviado para o e-mail fornecido');
    } catch (error) {
        console.error('Erro ao solicitar recuperação de senha:', error);
        res.status(500).send('Erro interno do servidor');
    }
};

const verifyResetCode = async (req, res) => {
    const { token } = req.body;

    try {
        const isValid = await senhaService.verifyPasswordResetToken(token);
        if (isValid) {
            res.status(200).send('Código de recuperação válido');
        } else {
            res.status(400).send('Código de recuperação inválido');
        }
    } catch (error) {
        console.error('Erro ao verificar código de recuperação:', error);
        res.status(500).send('Erro interno do servidor');
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const isValid = await senhaService.verifyPasswordResetToken(token);
        if (isValid) {
            const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
            await senhaService.resetPassword(token, hashedPassword);
            res.status(200).send('Senha redefinida com sucesso');
        } else {
            res.status(400).send('Código de recuperação inválido');
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(500).send('Erro interno do servidor');
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
};