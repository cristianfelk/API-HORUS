const loginController = require('../controllers/loginController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Autenticação
     *   description: Operações relacionadas à autenticação do usuário
     */

    /**
     * @swagger
     * /login:
     *   post:
     *     tags: [Autenticação]
     *     summary: Realiza o login do usuário
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
     *               senha:
     *                 type: string
     *                 description: Senha do usuário
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   description: Token de autenticação do usuário
     *       401:
     *         description: Credenciais inválidas
     *       400:
     *         description: Erro na requisição
     */
    app.post('/login', loginController.postLogin);
};
