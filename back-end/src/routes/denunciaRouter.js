const denunciaController = require('../controllers/denunciaController');

module.exports = (app, upload) => {
    const basePath = '/denuncia';

    app.post('/denuncia', upload.single('image_url'), denunciaController.postDenuncia)
    app.get('/denuncia/ultimas', denunciaController.getUltimasDenuncias)
    app.get('/denunciaConfirmada', denunciaController.getDenunciasConfirmadas)
    app.delete('/denuncia/:id', denunciaController.deleteDenuncia)
    app.patch('/denuncia/:id', denunciaController.patchDenuncia)
    
    app.route(basePath)
        .get(denunciaController.getDenuncia);

    app.route(`${basePath}/:id`)
        .put(denunciaController.putDenuncia)
};
