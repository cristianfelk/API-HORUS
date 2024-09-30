const usuarioController = require('../controllers/usuarioController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Usuário
     *   description: Operações relacionadas ao gerenciamento de usuários
     */

    /**
     * @swagger
     * /usuario:
     *   post:
     *     tags: [Usuário]
     *     summary: Cria um novo usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome do usuário
     *               email:
     *                 type: string
     *                 description: Email do usuário
     *               senha:
     *                 type: string
     *                 description: Senha do usuário
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *       400:
     *         description: Erro na criação do usuário
     */
    app.post('/usuario', usuarioController.postUsuario);

    /**
     * @swagger
     * /usuario:
     *   get:
     *     tags: [Usuário]
     *     summary: Retorna uma lista de usuários
     *     responses:
     *       200:
     *         description: Lista de usuários retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   nome:
     *                     type: string
     *                   email:
     *                     type: string
     */
    app.get('/usuario', usuarioController.getUsuario);

    /**
     * @swagger
     * /usuario/{id}:
     *   get:
     *     tags: [Usuário]
     *     summary: Retorna os detalhes de um usuário específico
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do usuário
     *     responses:
     *       200:
     *         description: Dados do usuário retornados com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    app.get('/usuario/:id', usuarioController.getUsuarioById);

    /**
     * @swagger
     * /usuario/{id}:
     *   delete:
     *     tags: [Usuário]
     *     summary: Exclui um usuário específico
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do usuário
     *     responses:
     *       200:
     *         description: Usuário excluído com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    app.delete('/usuario/:id', usuarioController.deleteUsuario);

    /**
     * @swagger
     * /usuario/{id}:
     *   put:
     *     tags: [Usuário]
     *     summary: Atualiza um usuário específico
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuário atualizado com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    app.put('/usuario/:id', usuarioController.putUsuario);

    /**
     * @swagger
     * /usuario/{id}:
     *   patch:
     *     tags: [Usuário]
     *     summary: Atualiza parcialmente um usuário específico
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Usuário atualizado parcialmente com sucesso
     *       404:
     *         description: Usuário não encontrado
     */
    app.patch('/usuario/:id', usuarioController.patchUsuario);
};
