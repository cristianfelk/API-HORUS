const fiscalizacaoDadosService = require('../services/fiscalizacaoDadosService')

const postFiscalizacaoDados = async (req, res, next) => {
    await fiscalizacaoDadosService.postFiscalizacaoDados(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getFiscalizacaoDados = async (req, res, next) => {
    try {
        await fiscalizacaoDadosService.getFiscalizacaoDados()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteFiscalizacaoDados = async (req, res, next) => {
    try {
        await fiscalizacaoDadosService.deleteFiscalizacaoDados(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putFiscalizacaoDados = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoDadosService.putFiscalizacaoDados(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchFiscalizacaoDados = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoDadosService.patchFiscalizacaoDados(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.postFiscalizacaoDados = postFiscalizacaoDados
module.exports.getFiscalizacaoDados = getFiscalizacaoDados
module.exports.deleteFiscalizacaoDados = deleteFiscalizacaoDados
module.exports.putFiscalizacaoDados = putFiscalizacaoDados
module.exports.patchFiscalizacaoDados = patchFiscalizacaoDados