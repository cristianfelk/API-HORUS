const monitoramentoController = require('../controllers/monitoramentoController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Monitoramento
     *   description: Operações relacionadas ao monitoramento
     */

    /**
     * @swagger
     * /monitoramento:
     *   get:
     *     tags: [Monitoramento]
     *     summary: Retorna uma lista de monitoramentos
     *     responses:
     *       200:
     *         description: Lista de monitoramentos retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   descricao:
     *                     type: string
     *                   status:
     *                     type: string
     *                   timestamp:
     *                     type: string
     *                     format: date-time
     */
    app.get('/monitoramento', monitoramentoController.getMonitoramento);

    /**
     * @swagger
     * /monitoramento:
     *   post:
     *     tags: [Monitoramento]
     *     summary: Atualiza ou cria um monitoramento
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Descrição do monitoramento
     *               status:
     *                 type: string
     *                 description: Status do monitoramento
     *     responses:
     *       200:
     *         description: Monitoramento atualizado com sucesso
     *       201:
     *         description: Novo monitoramento criado com sucesso
     *       400:
     *         description: Erro na requisição
     */
    app.post('/monitoramento', monitoramentoController.updateMonitoramento);
};
