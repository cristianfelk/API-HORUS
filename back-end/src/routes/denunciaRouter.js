const denunciaController = require('../controllers/denunciaController');
const multer = require('multer');

// Configuração do multer para salvar as imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde a imagem será salva
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = (app) => {
    const basePath = '/denuncia';

    /**
     * @swagger
     * tags:
     *   name: Denúncias
     *   description: Operações relacionadas às denúncias
     */

    /**
     * @swagger
     * /denuncia:
     *   post:
     *     tags: [Denúncias]
     *     summary: Registra uma nova denúncia com imagem
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               tipo:
     *                 type: string
     *                 description: Tipo da denúncia
     *               descricao:
     *                 type: string
     *                 description: Descrição detalhada da denúncia
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Data da denúncia
     *               image:
     *                 type: string
     *                 format: binary
     *                 description: Imagem associada à denúncia
     *     responses:
     *       201:
     *         description: Denúncia registrada com sucesso
     *       400:
     *         description: Erro ao registrar a denúncia
     */
    app.route(basePath)
        .post(upload.single('image'), denunciaController.postDenuncia)  // Adiciona o upload de imagem
        .get(denunciaController.getDenuncia);

    /**
     * @swagger
     * /denuncia:
     *   get:
     *     tags: [Denúncias]
     *     summary: Retorna uma lista de denúncias
     *     responses:
     *       200:
     *         description: Lista de denúncias retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   tipo:
     *                     type: string
     *                   descricao:
     *                     type: string
     *                   data:
     *                     type: string
     *                     format: date
     */
    app.route(basePath)
        .get(denunciaController.getDenuncia);

    /**
     * @swagger
     * /denuncia/{id}:
     *   delete:
     *     tags: [Denúncias]
     *     summary: Deleta uma denúncia específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da denúncia a ser deletada
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Denúncia deletada com sucesso
     *       404:
     *         description: Denúncia não encontrada
     */
    app.route(`${basePath}/:id`)
        .delete(denunciaController.deleteDenuncia)
        .put(denunciaController.putDenuncia)
        .patch(denunciaController.patchDenuncia);

    /**
     * @swagger
     * /denuncia/{id}:
     *   put:
     *     tags: [Denúncias]
     *     summary: Atualiza uma denúncia específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da denúncia a ser atualizada
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tipo:
     *                 type: string
     *                 description: Novo tipo da denúncia
     *               descricao:
     *                 type: string
     *                 description: Nova descrição da denúncia
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Nova data da denúncia
     *     responses:
     *       200:
     *         description: Denúncia atualizada com sucesso
     *       404:
     *         description: Denúncia não encontrada
     */
    app.route(`${basePath}/:id`)
        .put(denunciaController.putDenuncia);

    /**
     * @swagger
     * /denuncia/{id}:
     *   patch:
     *     tags: [Denúncias]
     *     summary: Atualiza parcialmente uma denúncia específica
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID da denúncia a ser atualizada
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tipo:
     *                 type: string
     *                 description: Novo tipo da denúncia
     *               descricao:
     *                 type: string
     *                 description: Nova descrição da denúncia
     *               data:
     *                 type: string
     *                 format: date
     *                 description: Nova data da denúncia
     *     responses:
     *       200:
     *         description: Denúncia atualizada parcialmente com sucesso
     *       404:
     *         description: Denúncia não encontrada
     */
    app.route(`${basePath}/:id`)
        .patch(denunciaController.patchDenuncia);
};
