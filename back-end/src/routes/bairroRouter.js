const bairroController = require('../controllers/bairroController');

module.exports = (app) => { 
    app.post('/bairro', bairroController.postBairro)
    app.get('/bairro', bairroController.getBairro)
    app.delete('/bairro/:id', bairroController.deleteBairro)
    app.put('/bairro/:id', bairroController.putBairro)
    app.patch('/bairro/:id', bairroController.patchBairro)
} 