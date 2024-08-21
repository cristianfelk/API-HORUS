const logradouroController = require('../controllers/logradouroController');

module.exports = (app) => { 
    app.post('/logradouro', logradouroController.postLogradouro)
    app.get('/logradouro', logradouroController.getLogradouro)
    app.delete('/logradouro/:id', logradouroController.deleteLogradouro)
    app.put('/logradouro/:id', logradouroController.putLogradouro)
    app.patch('/logradouro/:id', logradouroController.patchLogradouro)
} 
