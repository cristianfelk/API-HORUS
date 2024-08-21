const denunciaController = require('../controllers/denunciaController');

module.exports = (app) => { 
    const basePath = '/denuncia';

    app.route(basePath)
        .post(denunciaController.postDenuncia)
        .get(denunciaController.getDenuncia);

    app.route(`${basePath}/:id`)
        .delete(denunciaController.deleteDenuncia)
        .put(denunciaController.putDenuncia)
        .patch(denunciaController.patchDenuncia);
};