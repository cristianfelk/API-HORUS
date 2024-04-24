const fiscalizacaoService = require('../services/fiscalizacao')

const postFiscalizacao = async (req, res, next) => {
    await fiscalizacaoService.postFiscalizacao(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getFiscalizacao = async (req, res, next) => {
    try {
        await fiscalizacaoService.getFiscalizacao()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const deleteFiscalizacao = async (req, res, next) => {
    try {
        await fiscalizacaoService.deleteFiscalizacao(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putFiscalizacao = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoService.putFiscalizacao(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchFiscalizacao = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoService.patchFiscalizacao(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.postFiscalizacao = postFiscalizacao
module.exports.getFiscalizacao = getFiscalizacao
module.exports.deleteFiscalizacao = deleteFiscalizacao
module.exports.putFiscalizacao = putFiscalizacao
module.exports.patchFiscalizacao = patchFiscalizacao