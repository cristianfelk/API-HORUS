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
}

const postDenuncia = async (req, res, next) => {
    try {
        const { anonima, email_denunciante, nome_denunciante, telefone_denunciante, id_municipio, logradouro, descricao_denuncia, id_status, chave_denuncia } = req.body;
        const reportData = {
            anonima,
            email_denunciante,
            nome_denunciante,
            telefone_denunciante,
            id_municipio,
            logradouro,
            descricao_denuncia,
            id_status,
            chave_denuncia
        };

        if (req.file) {
            reportData.image_url = req.file.filename;
        }

        const ret = await denunciaService.postDenuncia(reportData);
        res.status(201).send(ret);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getDenuncia = async (req, res, next) => {
    try {
        const ret = await denunciaService.getDenuncia();
        res.status(200).send(ret.rows);
    } catch (err) {
        next(err);
    }
}

const deleteDenuncia = async (req, res, next) => {
    try {
        await denunciaService.deleteDenuncia(req.params);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

const putDenuncia = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await denunciaService.putDenuncia(params);
        res.status(200).send(ret);
    } catch (err) {
        next(err);
    }
}

const patchDenuncia = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await denunciaService.patchDenuncia(params);
        res.status(200).send(ret);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postDenuncia,
    getDenuncia,
    deleteDenuncia,
    putDenuncia,
    patchDenuncia
};
