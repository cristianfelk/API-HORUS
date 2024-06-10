const usuario = require('./usuarioRouter');
const fiscalizacao = require('./fiscalizacaoRouter');
const fiscalizacao_dados = require('./fiscalizacaoDadosRouter');
const bairro = require('./bairroRouter');
const denuncia = require('./denunciaRouter');
const municipio = require('./municipioRouter');

module.exports = (app) => {
    usuario(app),
    fiscalizacao(app),
    fiscalizacao_dados(app),
    bairro(app),
    denuncia(app),
    municipio(app)
}