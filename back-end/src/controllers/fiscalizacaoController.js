const fiscalizacaoService = require('../services/fiscalizacaoService')

const postFiscalizacao = async (req, res, next) => {
    await fiscalizacaoService.postFiscalizacao(req.body)
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(500).send(err))
};

const getFiscalizacao = async (req, res) => {
    const { page = 1, limit = 10, logradouro = '', complemento = '' } = req.query;

    try {
        const fiscalizacoes = await fiscalizacaoService.getFiscalizacao(parseInt(page, 10), parseInt(limit, 10), logradouro, complemento);
        const total = await fiscalizacaoService.getTotalFiscalizacoes(logradouro, complemento);

        res.json({
            data: fiscalizacoes.rows,
            pagination: {
                total: total,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalPages: Math.ceil(total / parseInt(limit, 10))
            }
        });
    } catch (error) {
        res.status(500).send('Erro ao obter fiscalização');
    }
};

const getUltimasFiscalizacoes = async (req, res) => {
    const { limit = 6 } = req.query;

    try {
        const fiscalizacoes = await fiscalizacaoService.getUltimasFiscalizacoes(parseInt(limit, 10));
        res.json(fiscalizacoes.rows);
    } catch (error) {
        res.status(500).send('Erro ao obter últimas fiscalizações');
    }
};

const deleteFiscalizacao = async (req, res, next) => {
    try {
        await fiscalizacaoService.deleteFiscalizacao(req.params)
            .then(ret => res.status(204).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

const putFiscalizacao = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoService.putFiscalizacao(params)
            .then(ret => res.status(201).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

const patchFiscalizacao = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await fiscalizacaoService.patchFiscalizacao(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

const getFiscalizacaoRel = async (req, res, next) => {
    try {
        const ret = await fiscalizacaoService.getFiscalizacaoRel();
        res.status(200).send(ret.rows); 
    } catch (err) {
        res.status(500).send({ error: err.message }); 
    }
};

const getFiscalizacaoById = async (req, res, next) => {
    try {
        await fiscalizacaoService.getFiscalizacaoById(req.params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postFiscalizacao,
    getFiscalizacao,
    deleteFiscalizacao,
    putFiscalizacao,
    patchFiscalizacao,
    getUltimasFiscalizacoes,
    getFiscalizacaoRel,
    getFiscalizacaoById
};