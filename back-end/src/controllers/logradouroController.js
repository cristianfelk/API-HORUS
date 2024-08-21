const logradouroService = require('../services/logradouroService')

const postLogradouro = async (req, res, next) => {
    await logradouroService.postLogradouro(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getLogradouro = async (req, res, next) => {
    try {
        await logradouroService.getLogradouro()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteLogradouro = async (req, res, next) => {
    try {
        await logradouroService.deleteLogradouro(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putLogradouro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await logradouroService.putLogradouro(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchLogradouro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await logradouroService.patchLogradouro(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postLogradouro,
    getLogradouro,
    deleteLogradouro,
    putLogradouro,
    patchLogradouro
};
