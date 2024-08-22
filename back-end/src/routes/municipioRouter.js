const municipioController = require('../controllers/municipioController');

module.exports = (app) => { 
    app.post('/municipio', municipioController.postMunicipio);
    app.get('/municipio', municipioController.getMunicipio);  // Agora aceita query params para paginação
    app.delete('/municipio/:id', municipioController.deleteMunicipio);
    app.put('/municipio/:id', municipioController.putMunicipio);
    app.patch('/municipio/:id', municipioController.patchMunicipio);
};