const LogService = require('../services/LogService')

const getLogMonitoramento = async (req, res, next) => {
    try {
        await LogService.getLogMonitoramento()
            .then(ret => res.status(200).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
};

const getLogDenuncia = async (req, res, next) => {
    try {
        await LogService.getLogDenuncia()
            .then(ret => res.status(200).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
};

module.exports = {
    getLogMonitoramento,
    getLogDenuncia
};