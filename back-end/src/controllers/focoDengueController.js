const focoDengueService = require('../services/focoDengueService')

const postFoco = async (req, res, next) => {
    await focoDengueService.postFoco(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
};

const getFoco = async (req, res, next) => {
    try {
        await focoDengueService.getFoco()
            .then(ret => res.status(200).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
};

const deleteFoco = async (req, res, next) => {
    try {
        await focoDengueService.deleteFoco(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postFoco,
    getFoco,
    deleteFoco
};