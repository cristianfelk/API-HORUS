const usuario = require('./usuario');
const fiscalizacao = require('./fiscalizacao');
const fiscalizacao_dados = require('./fiscalizacao_dados');
const bairro = require('./bairro');
const denuncia = require('./denuncia');
const municipio = require('./municipio');

module.exports = (app) => {
    usuario(app),
    fiscalizacao(app),
    fiscalizacao_dados(app),
    bairro(app),
    denuncia(app),
    municipio(app)
}