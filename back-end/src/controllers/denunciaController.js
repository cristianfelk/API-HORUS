const denunciaService = require('../services/denunciaService');
const path = require('path');
const fs = require('fs');

const moveFile = (file, destination) => {
    return new Promise((resolve, reject) => {
        const tempPath = file.path;
        const targetPath = path.join(destination, file.originalname);

        fs.rename(tempPath, targetPath, (err) => {
            if (err) reject(err);
            resolve(targetPath);
        });
    });
};

const postDenuncia = async (req, res, next) => {
    try {
        const { 
            anonima, 
            email_denunciante, 
            nome_denunciante, 
            telefone_denunciante, 
            id_municipio, 
            logradouro, 
            descricao_denuncia, 
            id_status, 
            chave_denuncia, 
            latitude, 
            longitude,
            confirmado 
        } = req.body;

        const reportData = {
            anonima,
            email_denunciante,
            nome_denunciante,
            telefone_denunciante,
            id_municipio,
            logradouro,
            descricao_denuncia,
            id_status,
            chave_denuncia,
            latitude,  
            longitude, 
            confirmado   
        };

        if (req.file) {
            reportData.image_url = req.file.filename;
        }

        const ret = await denunciaService.postDenuncia(reportData);
        res.status(201).send(ret);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getDenuncia = async (req, res) => {
    const { page = 1, limit = 10, chave_denuncia = '', email_denunciante = '' } = req.query;

    try {
        const denuncias = await denunciaService.getDenuncia(parseInt(page, 10), parseInt(limit, 10), chave_denuncia, email_denunciante);
        const total = await denunciaService.getTotalDenuncias(chave_denuncia, email_denunciante);

        res.json({
            data: denuncias.rows,
            pagination: {
                total: total,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalPages: Math.ceil(total / parseInt(limit, 10))
            }
        });
    } catch (error) {
        res.status(500).send('Erro ao obter denuncias');
    }
};

const deleteDenuncia = async (req, res, next) => {
    try {
        await denunciaService.deleteDenuncia(req.params);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

const putDenuncia = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await denunciaService.putDenuncia(params);
        res.status(200).send(ret);
    } catch (err) {
        next(err);
    }
};

const patchDenuncia = async (req, res, next) => {
    try {
        let params = req.body
        params.id = req.params.id
        await denunciaService.patchDenuncia(params)
            .then(ret => res.status(200).send(ret))
            .catch(err => res.status(500).send(err))
    } catch (err) {
        next(err);
    }
};

const getUltimasDenuncias = async (req, res) => {
    const { limit = 5 } = req.query;

    try {
        const denuncias = await denunciaService.getUltimasDenuncias(parseInt(limit, 10));
        res.json(denuncias.rows);
    } catch (error) {
        res.status(500).send('Erro ao obter últimas denuncias');
    }
};

const getDenunciasConfirmadas = async (req, res, next) => {
    try {
        await denunciaService.getDenunciasConfirmadas()
            .then(ret => res.status(200).send(ret.rows))
            .catch(err => res.status(500).send(err.message))
    } catch (err) {
        next(err);
    } 
};

module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia,
    getUltimasDenuncias,
    getDenunciasConfirmadas
};
