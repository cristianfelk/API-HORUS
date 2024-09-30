const LogController = require('../controllers/LogController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Logs
     *   description: Operações relacionadas aos logs
     */

    /**
     * @swagger
     * /log:
     *   get:
     *     tags: [Logs]
     *     summary: Retorna uma lista de logs
     *     responses:
     *       200:
     *         description: Lista de logs retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   mensagem:
     *                     type: string
     *                   timestamp:
     *                     type: string
     *                     format: date-time
     */
    app.get('/log', LogController.getLog); 
};
