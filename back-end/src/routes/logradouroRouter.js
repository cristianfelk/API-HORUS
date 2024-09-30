const logradouroController = require('../controllers/logradouroController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Logradouro
     *   description: Operações relacionadas a logradouros
     */

    /**
     * @swagger
     * /logradouro:
     *   post:
     *     tags: [Logradouro]
     *     summary: Cria um novo logradouro
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome do logradouro
     *               complemento:
     *                 type: string
     *                 description: Complemento do logradouro
     *     responses:
     *       201:
     *         description: Logradouro criado com sucesso
     *       400:
     *         description: Erro na criação do logradouro
     */
    app.post('/logradouro', logradouroController.postLogradouro);

    /**
     * @swagger
     * /logradouro:
     *   get:
     *     tags: [Logradouro]
     *     summary: Retorna uma lista de logradouros
     *     responses:
     *       200:
     *         description: Lista de logradouros retornada com sucesso
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
     *                   complemento:
     *                     type: string
     */
    app.get('/logradouro', logradouroController.getLogradouro);

    /**
     * @swagger
     * /logradouro/{id}:
     *   get:
     *     tags: [Logradouro]
     *     summary: Retorna um logradouro pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do logradouro
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Logradouro encontrado com sucesso
     *       404:
     *         description: Logradouro não encontrado
     */
    app.get('/logradouro/:id', logradouroController.getLogradouroById);

    /**
     * @swagger
     * /logradouro/search/{logradouro}:
     *   get:
     *     tags: [Logradouro]
     *     summary: Retorna logradouros pelo nome
     *     parameters:
     *       - in: path
     *         name: logradouro
     *         required: true
     *         description: Nome do logradouro para busca
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Logradouros encontrados com sucesso
     *       404:
     *         description: Nenhum logradouro encontrado
     */
    app.get('/logradouro/search/:logradouro', logradouroController.getLogradourosByNome);

    /**
     * @swagger
     * /logradouro/searchComplemento/{complemento}:
     *   get:
     *     tags: [Logradouro]
     *     summary: Retorna logradouros pelo complemento
     *     parameters:
     *       - in: path
     *         name: complemento
     *         required: true
     *         description: Complemento para busca
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Logradouros encontrados com sucesso
     *       404:
     *         description: Nenhum logradouro encontrado
     */
    app.get('/logradouro/searchComplemento/:complemento', logradouroController.getByComplemento);

    /**
     * @swagger
     * /logradouro/{id}:
     *   delete:
     *     tags: [Logradouro]
     *     summary: Remove um logradouro pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do logradouro a ser removido
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Logradouro removido com sucesso
     *       404:
     *         description: Logradouro não encontrado
     */
    app.delete('/logradouro/:id', logradouroController.deleteLogradouro);

    /**
     * @swagger
     * /logradouro/{id}:
     *   put:
     *     tags: [Logradouro]
     *     summary: Atualiza um logradouro pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do logradouro a ser atualizado
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Novo nome do logradouro
     *               complemento:
     *                 type: string
     *                 description: Novo complemento do logradouro
     *     responses:
     *       200:
     *         description: Logradouro atualizado com sucesso
     *       404:
     *         description: Logradouro não encontrado
     */
    app.put('/logradouro/:id', logradouroController.putLogradouro);

    /**
     * @swagger
     * /logradouro/{id}:
     *   patch:
     *     tags: [Logradouro]
     *     summary: Atualiza parcialmente um logradouro pelo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do logradouro a ser atualizado
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Novo nome do logradouro (opcional)
     *               complemento:
     *                 type: string
     *                 description: Novo complemento do logradouro (opcional)
     *     responses:
     *       200:
     *         description: Logradouro atualizado com sucesso
     *       404:
     *         description: Logradouro não encontrado
     */
    app.patch('/logradouro/:id', logradouroController.patchLogradouro);
};
