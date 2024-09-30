const senhaController = require('../controllers/senhaController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Senha
     *   description: Operações relacionadas à recuperação de senha
     */

    /**
     * @swagger
     * /recover-password:
     *   post:
     *     tags: [Senha]
     *     summary: Solicita a recuperação de senha
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do usuário para o qual a recuperação de senha será enviada
     *     responses:
     *       200:
     *         description: E-mail de recuperação enviado com sucesso
     *       404:
     *         description: Usuário não encontrado
     *       400:
     *         description: Erro na solicitação
     */
    app.post('/recover-password', senhaController.requestPasswordReset);

    /**
     * @swagger
     * /verify-reset-code:
     *   post:
     *     tags: [Senha]
     *     summary: Verifica o código de redefinição de senha
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               code:
     *                 type: string
     *                 description: Código de verificação enviado ao email
     *     responses:
     *       200:
     *         description: Código verificado com sucesso
     *       400:
     *         description: Código inválido ou expirado
     */
    app.post('/verify-reset-code', senhaController.verifyResetCode);

    /**
     * @swagger
     * /reset-password:
     *   post:
     *     tags: [Senha]
     *     summary: Redefine a senha do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               newPassword:
     *                 type: string
     *                 description: Nova senha do usuário
     *     responses:
     *       200:
     *         description: Senha redefinida com sucesso
     *       400:
     *         description: Erro na redefinição da senha
     */
    app.post('/reset-password', senhaController.resetPassword);
};
