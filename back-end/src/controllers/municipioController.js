const municipioService = require('../services/municipioService');

const postMunicipio = async (req, res, next) => {
    try {
        await municipioService.postMunicipio(req.body);
        res.status(201).send('Município criado com sucesso');
    } catch (err) {
        next(err);
    }
};

const getMunicipio = async (req, res, next) => {
    try {
        // Extraindo os parâmetros de paginação
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        // Chamando o serviço com paginação
        const result = await municipioService.getMunicipio(page, limit);
        
        // Obtendo o total de municípios
        const total = await municipioService.getTotalMunicipios();

        res.status(200).json({
            data: result.rows,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        });
    } catch (err) {
        next(err); 
    }
};

const deleteMunicipio = async (req, res, next) => {
    try {
        await municipioService.deleteMunicipio(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

const putMunicipio = async (req, res, next) => {
    try {
        const params = { id: req.params.id, ...req.body };
        await municipioService.putMunicipio(params);
        res.status(200).send('Município atualizado com sucesso');
    } catch (err) {
        next(err);
    }
};

const patchMunicipio = async (req, res, next) => {
    try {
        const params = { id: req.params.id, ...req.body };
        await municipioService.patchMunicipio(params);
        res.status(200).send('Município atualizado parcialmente com sucesso');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postMunicipio,
    getMunicipio,
    deleteMunicipio,
    putMunicipio,
    patchMunicipio
};
