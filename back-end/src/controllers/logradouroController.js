const logradouroService = require('../services/logradouroService')

const postLogradouro = async (req, res, next) => {
    await logradouroService.postLogradouro(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
}

const getLogradouro = async (req, res) => {
    const { page = 1, limit = 10, cep = '', bairro = '' } = req.query;

    try {
        const logradouros = await logradouroService.getLogradouro(parseInt(page, 10), parseInt(limit, 10), cep, bairro);
        const total = await logradouroService.getTotalLogradouros(cep, bairro);

        res.json({
            data: logradouros.rows,
            pagination: {
                total: total,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalPages: Math.ceil(total / parseInt(limit, 10))
            }
        });
    } catch (error) {
        res.status(500).send('Erro ao obter logradouros');
    }
};

const getLogradouroById = async (req, res, next) => {
    try {
        await logradouroService.getLogradouroById(req.params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const getLogradourosByNome = async (req, res) => {
    const { logradouro } = req.params;
    try {
        const logradouros = await logradouroService.getLogradourosByNome(logradouro);
        res.status(200).json(logradouros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getByComplemento = async (req, res) => {
    const { complemento } = req.params;
    try {
        const complementos = await logradouroService.getByComplemento(complemento);
        res.status(200).json(complementos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLogradouro = async (req, res, next) => {
    try {
        await logradouroService.deleteLogradouro(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const putLogradouro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await logradouroService.putLogradouro(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

const patchLogradouro = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await logradouroService.patchLogradouro(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postLogradouro,
    getLogradouro,
    deleteLogradouro,
    putLogradouro,
    patchLogradouro,
    getLogradouroById,
    getLogradourosByNome,
    getByComplemento
};