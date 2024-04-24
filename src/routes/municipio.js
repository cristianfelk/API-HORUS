const municipioController = require('../controllers/municipio');

module.exports = (app) => { 
    app.post('/municipio', municipioController.postMunicipio)
    app.get('/municipio', municipioController.getMunicipio)
    app.delete('/municipio/:id', municipioController.deleteMunicipio)
    app.put('/municipio/:id', municipioController.putMunicipio)
    app.patch('/municipio/:id', municipioController.patchMunicipio)
} 