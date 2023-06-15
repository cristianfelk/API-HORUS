const votorespostaService = require('../services/voto_resposta')

const postVoto = async (req, res, next) => {
    await votorespostaService.postVoto(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getVoto = async (req, res, next) => {
    try {
    await votorespostaService.getVoto()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}  catch (err) {
    next(err);
} 

}

const deleteVoto = async (req, res, next) => {
    try {
        await votorespostaService.deleteVoto(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putVoto = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await votorespostaService.putVoto(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchVoto = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await votorespostaService.patchVoto(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.deleteVoto = deleteVoto
module.exports.postVoto = postVoto
module.exports.getVoto = getVoto
module.exports.putVoto = putVoto
module.exports.patchVoto = patchVoto