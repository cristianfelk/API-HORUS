const fiscalizacaoController = require('../controllers/fiscalizacaoController');

module.exports = (app) => { 
    /**
     * @swagger
     * tags:
     *   name: Fiscalização
     *   description: Operações relacionadas à fiscalização
     */

    /**
     * @swagger
     * /fiscalizacao:
     *   post:
     *     tags: [Fiscalização]
     *     summary: Cria uma nova fiscalização
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Descrição da fiscalização
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Data da fiscalização
     *     responses:
     *       201:
     *         description: Fiscalização criada com sucesso
     *       400:
     *         description: Erro na criação da fiscalização
     */
    app.post('/fiscalizacao', fiscalizacaoController.postFiscalizacao);

    /**
     * @swagger
     * /fiscalizacao:
     *   get:
     *     tags: [Fiscalização]
     *     summary: Retorna uma lista de fiscalizações
     *     responses:
     *       200:
     *         description: Lista de fiscalizações retornada com sucesso
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
     *                   data:
     *                     type: string
     *                     format: date
     */
    app.get('/fiscalizacao', fiscalizacaoController.getFiscalizacao);

    /**
     * @swagger
     * /fiscalizacao/ultimas:
     *   get:
     *     tags: [Fiscalização]
     *     summary: Retorna as últimas fiscalizações
     *     responses:
     *       200:
     *         description: Últimas fiscalizações retornadas com sucesso
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
     *                   data:
     *                     type: string
     *                     format: date
     */
    app.get('/fiscalizacao/ultimas', fiscalizacaoController.getUltimasFiscalizacoes);

    /**
     * @swagger
     * /fiscalizacao/relatorio:
     *   get:
     *     tags: [Fiscalização]
     *     summary: Gera um relatório de fiscalizações
     *     responses:
     *       200:
     *         description: Relatório gerado com sucesso
     */
    app.get('/fiscalizacao/relatorio', fiscalizacaoController.getFiscalizacaoRel);

    /**
     * @swagger
     * /fiscalizacao/{id}:
     *   delete:
     *     tags: [Fiscalização]
     *     summary: Deleta uma fiscalização específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da fiscalização a ser deletada
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Fiscalização deletada com sucesso
     *       404:
     *         description: Fiscalização não encontrada
     */
    app.delete('/fiscalizacao/:id', fiscalizacaoController.deleteFiscalizacao);

    /**
     * @swagger
     * /fiscalizacao/{id}:
     *   put:
     *     tags: [Fiscalização]
     *     summary: Atualiza uma fiscalização específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da fiscalização a ser atualizada
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nova descrição da fiscalização
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Nova data da fiscalização
     *     responses:
     *       200:
     *         description: Fiscalização atualizada com sucesso
     *       404:
     *         description: Fiscalização não encontrada
     */
    app.put('/fiscalizacao/:id', fiscalizacaoController.putFiscalizacao);

    /**
     * @swagger
     * /fiscalizacao/{id}:
     *   patch:
     *     tags: [Fiscalização]
     *     summary: Atualiza parcialmente uma fiscalização específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da fiscalização a ser atualizada
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nova descrição da fiscalização
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Nova data da fiscalização
     *     responses:
     *       200:
     *         description: Fiscalização atualizada parcialmente com sucesso
     *       404:
     *         description: Fiscalização não encontrada
     */
    app.patch('/fiscalizacao/:id', fiscalizacaoController.patchFiscalizacao);
};
