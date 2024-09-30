const municipioController = require('../controllers/municipioController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Municípios
     *   description: Operações relacionadas aos municípios
     */

    /**
     * @swagger
     * /municipio:
     *   post:
     *     tags: [Municípios]
     *     summary: Cria um novo município
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome do município
     *               estado:
     *                 type: string
     *                 description: Estado do município
     *     responses:
     *       201:
     *         description: Município criado com sucesso
     *       400:
     *         description: Erro na criação do município
     */
    app.post('/municipio', municipioController.postMunicipio);

    /**
     * @swagger
     * /municipio:
     *   get:
     *     tags: [Municípios]
     *     summary: Retorna uma lista de municípios
     *     responses:
     *       200:
     *         description: Lista de municípios retornada com sucesso
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
     *                   estado:
     *                     type: string
     */
    app.get('/municipio', municipioController.getMunicipio);

    /**
     * @swagger
     * /municipio/search/{nome}:
     *   get:
     *     tags: [Municípios]
     *     summary: Busca um município pelo nome
     *     parameters:
     *       - name: nome
     *         in: path
     *         required: true
     *         description: Nome do município a ser buscado
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Município encontrado com sucesso
     *       404:
     *         description: Município não encontrado
     */
    app.get('/municipio/search/:nome', municipioController.getMunicipioByNome);

    /**
     * @swagger
     * /municipio/{id}:
     *   delete:
     *     tags: [Municípios]
     *     summary: Deleta um município pelo ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do município a ser deletado
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Município deletado com sucesso
     *       404:
     *         description: Município não encontrado
     */
    app.delete('/municipio/:id', municipioController.deleteMunicipio);

    /**
     * @swagger
     * /municipio/{id}:
     *   put:
     *     tags: [Municípios]
     *     summary: Atualiza um município pelo ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do município a ser atualizado
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
     *                 description: Nome do município
     *               estado:
     *                 type: string
     *                 description: Estado do município
     *     responses:
     *       200:
     *         description: Município atualizado com sucesso
     *       404:
     *         description: Município não encontrado
     */
    app.put('/municipio/:id', municipioController.putMunicipio);

    /**
     * @swagger
     * /municipio/{id}:
     *   patch:
     *     tags: [Municípios]
     *     summary: Atualiza parcialmente um município pelo ID
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID do município a ser atualizado
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
     *                 description: Nome do município
     *               estado:
     *                 type: string
     *                 description: Estado do município
     *     responses:
     *       200:
     *         description: Município atualizado com sucesso
     *       404:
     *         description: Município não encontrado
     */
    app.patch('/municipio/:id', municipioController.patchMunicipio);
};
