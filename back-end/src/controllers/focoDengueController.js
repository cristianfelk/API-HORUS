const focoDengueService = require('../services/focoDengueService')

const postFoco = async (req, res, next) => {
    await focoDengueService.postFoco(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    postFoco
};