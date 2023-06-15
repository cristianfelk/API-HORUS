const topicoService = require('../services/topico')
const postTopico = async (req, res) => {
    await topicoService.postTopico(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err.message))
}

const getTopico = async (req, res, next) => {
    try {
    await topicoService.getTopico()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}  catch (err) {
    next(err);
} 

}

const deleteTopico = async (req, res, next) => {
    try {
        await topicoService.deleteTopico(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putTopico = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await topicoService.putTopico(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchTopico = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await topicoService.patchTopico(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.deleteTopico = deleteTopico
module.exports.getTopico = getTopico 
module.exports.postTopico = postTopico
module.exports.putTopico = putTopico
module.exports.patchTopico = patchTopico