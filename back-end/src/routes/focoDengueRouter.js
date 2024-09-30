const focoDengueController = require('../controllers/focoDengueController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Foco de Dengue
     *   description: Operações relacionadas a focos de dengue
     */

    /**
     * @swagger
     * /foco:
     *   post:
     *     tags: [Foco de Dengue]
     *     summary: Cria um novo foco de dengue
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               localizacao:
     *                 type: string
     *                 description: Localização do foco
     *               descricao:
     *                 type: string
     *                 description: Descrição do foco de dengue
     *     responses:
     *       201:
     *         description: Foco de dengue criado com sucesso
     *       400:
     *         description: Erro na criação do foco de dengue
     */
    app.post('/foco', focoDengueController.postFoco);

    /**
     * @swagger
     * /foco:
     *   get:
     *     tags: [Foco de Dengue]
     *     summary: Retorna uma lista de focos de dengue
     *     responses:
     *       200:
     *         description: Lista de focos de dengue retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   localizacao:
     *                     type: string
     *                   descricao:
     *                     type: string
     */
    app.get('/foco', focoDengueController.getFoco);
};
