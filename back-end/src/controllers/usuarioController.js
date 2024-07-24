const usuarioService = require('../services/usuarioService');

const postUsuario = async (req, res) => {
    try {
        const emailIvalido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //valida formato do email

        if (!emailIvalido.test(req.body.email)) {
            return res.status(400).json({ error: "Formato de email inválido" });
        }

        await usuarioService.postUsuario(req.body);
        res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar usuário", message: err.message });
    }
}

const getUsuario = async  (res, next) => {
    try {
        await usuarioService.getUsuario()
            .then(ret => res.status(201).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
}

const getUsuarioById = async (req, res, next) => {
    try {
        await usuarioService.getUsuarioById(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const deleteUsuario = async (req, res, next) => {
    try {
        await usuarioService.deleteUsuario(req.params)
            .then(ret => res.status(204).send(ret))
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

module.exports.postUsuario = postUsuario
module.exports.getUsuario = getUsuario
module.exports.getUsuarioById = getUsuarioById
module.exports.deleteUsuario = deleteUsuario
module.exports.putUsuario = putUsuario
module.exports.patchUsuario = patchUsuario