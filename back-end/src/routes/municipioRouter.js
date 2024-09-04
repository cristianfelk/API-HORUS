const municipioController = require('../controllers/municipioController');

module.exports = (app) => { 
    app.post('/municipio', municipioController.postMunicipio);
    app.get('/municipio', municipioController.getMunicipio);
    app.get('/municipio/search/:nome', municipioController.getMunicipioByNome);
    app.delete('/municipio/:id', municipioController.deleteMunicipio);
    app.put('/municipio/:id', municipioController.putMunicipio);
    app.patch('/municipio/:id', municipioController.patchMunicipio);
};