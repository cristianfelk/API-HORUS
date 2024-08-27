const LogService = require('../services/LogService')

const getLog = async (req, res, next) => {
    try {
        await LogService.getLog()
            .then(ret => res.status(200).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

module.exports = {
    getLog
};