const LogController = require('../controllers/LogController');

module.exports = (app) => { 
    app.get('/logMonitoramento', LogController.getLogMonitoramento); 
    app.get('/logDenuncia', LogController.getLogDenuncia); 
};