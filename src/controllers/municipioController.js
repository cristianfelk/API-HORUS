const municipioService = require('../services/municipioService')

const postMunicipio = async (req, res, next) => {
    await municipioService.postMunicipio(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getMunicipio = async (req, res, next) => {
    try {
        await usuarioService.getMunicipio()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteMunicipio = async (req, res, next) => {
    try {
        await municipioService.deleteMunicipio(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putMunicipio = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await municipioService.putMunicipio(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchMunicipio = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await municipioService.patchMunicipio(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.postMunicipio = postMunicipio
module.exports.getMunicipio = getMunicipio
module.exports.deleteMunicipio = deleteMunicipio
module.exports.putMunicipio = putMunicipio
module.exports.patchMunicipio = patchMunicipio