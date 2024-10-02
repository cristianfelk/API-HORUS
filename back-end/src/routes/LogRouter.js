const LogController = require('../controllers/LogController');

module.exports = (app) => { 
    app.get('/log', LogController.getLog); 
};