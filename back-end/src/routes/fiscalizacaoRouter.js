const fiscalizacaoController = require('../controllers/fiscalizacaoController');

module.exports = (app) => { 
    app.post('/fiscalizacao', fiscalizacaoController.postFiscalizacao)
    app.get('/fiscalizacao', fiscalizacaoController.getFiscalizacao)
    app.get('/fiscalizacao/ultimas', fiscalizacaoController.getUltimasFiscalizacoes);
    app.delete('/fiscalizacao/:id', fiscalizacaoController.deleteFiscalizacao)
    app.put('/fiscalizacao/:id', fiscalizacaoController.putFiscalizacao)
    app.patch('/fiscalizacao/:id', fiscalizacaoController.patchFiscalizacao)
} 