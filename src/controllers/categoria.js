const categoriaService = require('../services/categoria')

const postCategoria = async (req, res, next) => {
    await categoriaService.postCategoria(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getCategoria = async (req, res, next) => {
    try {
    await categoriaService.getCategoria()
        .then(ret => res.status(201).send(ret.rows))
        .catch(err => res.status(500).send(err))
}  catch (err) {
    next(err);
} 
}

const deleteCategoria = async (req, res, next) => {
    try {
        await categoriaService.deleteCategoria(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putCategoria = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await categoriaService.putCategoria(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchCategoria = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await categoriaService.patchCategoria(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports.postCategoria = postCategoria
module.exports.getCategoria = getCategoria
module.exports.deleteCategoria = deleteCategoria
module.exports.putCategoria = putCategoria
module.exports.patchCategoria = patchCategoria