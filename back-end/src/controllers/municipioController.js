const municipioService = require('../services/municipioService');

const postMunicipio = async (req, res, next) => {
    try {
        await municipioService.postMunicipio(req.body);
        res.status(201).send('Município criado com sucesso');
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento de erros
    }
}

const getMunicipio = async (req, res, next) => {
    try {
        const result = await municipioService.getMunicipio();
        res.status(200).json(result.rows);
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento de erros
    }
}

const deleteMunicipio = async (req, res, next) => {
    try {
        await municipioService.deleteMunicipio({ id: req.params.id });
        res.status(204).send(); // Código 204 indica que a operação foi bem-sucedida e não há conteúdo para retornar
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento de erros
    }
}

const putMunicipio = async (req, res, next) => {
    try {
        const params = { id: req.params.id, ...req.body };
        await municipioService.putMunicipio(params);
        res.status(200).send('Município atualizado com sucesso');
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento de erros
    }
}

const patchMunicipio = async (req, res, next) => {
    try {
        const params = { id: req.params.id, ...req.body };
        await municipioService.patchMunicipio(params);
        res.status(200).send('Município atualizado parcialmente com sucesso');
    } catch (err) {
        next(err); // Passa o erro para o middleware de tratamento de erros
    }
}

module.exports.postMunicipio = postMunicipio
module.exports.getMunicipio = getMunicipio
module.exports.deleteMunicipio = deleteMunicipio
module.exports.putMunicipio = putMunicipio
module.exports.patchMunicipio = patchMunicipio