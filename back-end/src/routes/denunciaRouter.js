const denunciaController = require('../controllers/denunciaController');

module.exports = (app) => { 
    app.post('/denuncia', denunciaController.postDenuncia)
    app.get('/denuncia', denunciaController.getDenuncia)
    app.delete('/denuncia/:id', denunciaController.deleteDenuncia)
    app.put('/denuncia/:id', denunciaController.putDenuncia)
    app.patch('/denuncia/:id', denunciaController.patchDenuncia)
} 