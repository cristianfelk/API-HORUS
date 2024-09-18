const monitoramentoController = require('../controllers/monitoramentoController');

module.exports = (app) => { 
    app.get('/monitoramento', monitoramentoController.getMonitoramento);
    app.post('/monitoramento', monitoramentoController.updateMonitoramento);
};
