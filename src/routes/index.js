const usuario = require('./usuario');
const categoria = require('./categoria');
const resposta = require('./resposta');
const topico = require('./topico');
const voto_resposta = require('./voto_resposta');

module.exports = (app) => {
    usuario(app)
    categoria(app)
    resposta(app)
    topico(app)
    voto_resposta(app)
}