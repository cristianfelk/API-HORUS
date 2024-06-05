const bairroService = require('../services/bairroService')

const postBairro = async (req, res, next) => {
    await bairroService.postBairro(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getBairro = async (req, res, next) => {
    try {
        await bairroService.getBairro()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteBairro = async (req, res, next) => {
    try {
        await bairroService.deleteBairro(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putBairro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await bairroService.putBairro(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchBairro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await bairroService.patchBairro(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.postBairro = postBairro
module.exports.getBairro = getBairro
module.exports.deleteBairro = deleteBairro
module.exports.putBairro = putBairro
module.exports.patchBairro = patchBairro