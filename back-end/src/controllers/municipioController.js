const municipioService = require('../services/municipioService');

const postMunicipio = async (req, res) => {
    try {
        await municipioService.postMunicipio(req.body);
        res.status(201).send('Município criado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao criar município');
    }
};

const getMunicipio = async (req, res) => {
    const { page = 1, limit = 10, uf = '', nome = '' } = req.query;

    try {
        const municipios = await municipioService.getMunicipio(parseInt(page, 10), parseInt(limit, 10), uf, nome);
        const total = await municipioService.getTotalMunicipios(uf, nome);

        res.json({
            data: municipios.rows,
            pagination: {
                total: total,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalPages: Math.ceil(total / parseInt(limit, 10))
            }
        });
    } catch (error) {
        res.status(500).send('Erro ao obter municípios');
    }
};

const deleteMunicipio = async (req, res) => {
    try {
        await municipioService.deleteMunicipio(req.params.id);
        res.status(200).send('Município excluído com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao excluir município');
    }
};

const putMunicipio = async (req, res) => {
    try {
        await municipioService.putMunicipio({ id: req.params.id, ...req.body });
        res.status(200).send('Município atualizado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao atualizar município');
    }
};

const patchMunicipio = async (req, res) => {
    try {
        await municipioService.patchMunicipio({ id: req.params.id, ...req.body });
        res.status(200).send('Município parcialmente atualizado com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao atualizar parcialmente município');
    }
};

module.exports = {
    postMunicipio,
    getMunicipio,
    deleteMunicipio,
    putMunicipio,
    patchMunicipio
};