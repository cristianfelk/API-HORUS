const usuarioService = require('../services/usuario')

const postUsuario = async (req, res, next) => {
    await usuarioService.postUsuario(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
} 

const getUsuario = async (req, res, next) => {
    try {
    await usuarioService.getUsuario()
        .then(ret => res.status(200).send(ret.rows))
        .catch(err => res.status(500).send(err))
}  catch (err) {
    next(err);
} 

}

const deleteUsuario = async (req, res, next) => {
    try {
        await usuarioService.deleteUsuario(req.params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putUsuario = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await usuarioService.putUsuario(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchUsuario = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await usuarioService.patchUsuario(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.putUsuario = putUsuario
module.exports.postUsuario = postUsuario
module.exports.getUsuario = getUsuario
module.exports.deleteUsuario = deleteUsuario
module.exports.patchUsuario = patchUsuario