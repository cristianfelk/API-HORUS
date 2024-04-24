const fiscalizacaoController = require('../controllers/fiscalizacao');

module.exports = (app) => { 
    app.post('/fiscalizacao', fiscalizacaoController.postFiscalizacao)
    app.get('/fiscalizacao', fiscalizacaoController.getFiscalizacao)
    app.delete('/fiscalizacao/:id', fiscalizacaoController.deleteFiscalizacao)
    app.put('/fiscalizacao/:id', fiscalizacaoController.putFiscalizacao)
    app.patch('/fiscalizacao/:id', fiscalizacaoController.patchFiscalizacao)
} 