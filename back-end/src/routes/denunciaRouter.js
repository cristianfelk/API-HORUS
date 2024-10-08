const denunciaController = require('../controllers/denunciaController');

module.exports = (app, upload) => {
    const basePath = '/denuncia';

    app.post('/denuncia', upload.single('image_url'), denunciaController.postDenuncia)
    app.get('/denuncia/ultimas', denunciaController.getUltimasDenuncias)


    app.route(basePath)
        .get(denunciaController.getDenuncia);

    app.route(`${basePath}/:id`)
        .delete(denunciaController.deleteDenuncia)
        .put(denunciaController.putDenuncia)
        .patch(denunciaController.patchDenuncia);
};
