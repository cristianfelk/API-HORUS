const focoDengueController = require('../controllers/focoDengueController');

module.exports = (app) => { 
    app.post('/foco', focoDengueController.postFoco);
    app.get('/foco', focoDengueController.getFoco);
};
