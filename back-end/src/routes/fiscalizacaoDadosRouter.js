const fiscalizacaoDadosController = require('../controllers/fiscalizacaoDadosController');

module.exports = (app) => { 
    app.post('/fiscalizacao_dados', fiscalizacaoDadosController.postFiscalizacaoDados)
    app.get('/fiscalizacao_dados', fiscalizacaoDadosController.getFiscalizacaoDados)
    app.delete('/fiscalizacao_dados/:id', fiscalizacaoDadosController.deleteFiscalizacaoDados)
    app.put('/fiscalizacao_dados/:id', fiscalizacaoDadosController.putFiscalizacaoDados)
    app.patch('/fiscalizacao_dados/:id', fiscalizacaoDadosController.patchFiscalizacaoDados)
} 