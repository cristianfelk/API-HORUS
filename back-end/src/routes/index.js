const usuario = require('./usuarioRouter');
const fiscalizacao = require('./fiscalizacaoRouter');
const fiscalizacao_dados = require('./fiscalizacaoDadosRouter');
const logradouro = require('./logradouroRouter');
const denuncia = require('./denunciaRouter');
const municipio = require('./municipioRouter');
const login = require('./loginRouter');

module.exports = (app) => {
    usuario(app),
    fiscalizacao(app),
    fiscalizacao_dados(app),
    logradouro(app),
    denuncia(app),
    municipio(app),
    login(app)
}