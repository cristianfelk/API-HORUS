const logradouroController = require('../controllers/logradouroController');

module.exports = (app) => { 
    app.post('/logradouro', logradouroController.postLogradouro);
    app.get('/logradouro', logradouroController.getLogradouro); 
    app.get('/logradouro/:id', logradouroController.getLogradouroById);
    app.get('/logradouro/search/:logradouro', logradouroController.getLogradourosByNome);
    app.get('/logradouro/searchComplemento/:complemento', logradouroController.getByComplemento);
    app.delete('/logradouro/:id', logradouroController.deleteLogradouro);
    app.put('/logradouro/:id', logradouroController.putLogradouro);
    app.patch('/logradouro/:id', logradouroController.patchLogradouro);
};
