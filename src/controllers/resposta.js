const respostaService = require('../services/resposta');

const postResposta = async (req, res, next) => {
    await respostaService.postResposta(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getResposta = async (req, res, next) => {
    try {
    await respostaService.getResposta()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}  catch (err) {
    next(err);
} 

}

const deleteResposta = async (req, res, next) => {
    try {
        await respostaService.deleteResposta(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putResposta = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await respostaService.putResposta(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchResposta = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await respostaService.patchResposta(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.deleteResposta = deleteResposta
module.exports.postResposta = postResposta
module.exports.getResposta = getResposta
module.exports.putResposta = putResposta
module.exports.patchResposta = patchResposta