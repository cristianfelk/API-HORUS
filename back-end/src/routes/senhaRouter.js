const senhaController = require('../controllers/senhaController');

module.exports = (app) => { 
    app.post('/recover-password', senhaController.requestPasswordReset);
    app.post('/verify-reset-code', senhaController.verifyResetCode);
    app.post('/reset-password', senhaController.resetPassword);
};