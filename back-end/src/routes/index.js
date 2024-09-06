const usuario = require('./usuarioRouter');
const fiscalizacao = require('./fiscalizacaoRouter');
const logradouro = require('./logradouroRouter');
const denuncia = require('./denunciaRouter');
const municipio = require('./municipioRouter');
const login = require('./loginRouter');
const senha = require('./senhaRouter');
const log = require('./LogRouter');

module.exports = (app) => {
    usuario(app),
    fiscalizacao(app),
    logradouro(app),
    denuncia(app),
    municipio(app),
    login(app),
    senha(app),
    log(app)
};