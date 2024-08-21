const denunciaService = require('../services/denunciaService')

const postDenuncia = async (req, res, next) => {
    await denunciaService.postDenuncia(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getDenuncia = async (req, res, next) => {
    try {
        await denunciaService.getDenuncia()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteDenuncia = async (req, res, next) => {
    try {
        await denunciaService.deleteDenuncia(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putDenuncia = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await denunciaService.putDenuncia(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchDenuncia = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await denunciaService.patchDenuncia(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia
};