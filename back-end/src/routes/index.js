const usuario = require('./usuarioRouter');
const fiscalizacao = require('./fiscalizacaoRouter');
const logradouro = require('./logradouroRouter');
const denuncia = require('./denunciaRouter');
const municipio = require('./municipioRouter');
const login = require('./loginRouter');
const senha = require('./senhaRouter');
const log = require('./LogRouter');
const monitoramento = require('./monitoramentoRouter');
const foco = require('./focoDengueRouter');


module.exports = (app, upload) => {
    usuario(app),
    fiscalizacao(app),
    logradouro(app),
    denuncia(app, upload),
    municipio(app),
    login(app),
    senha(app),
    log(app),
    monitoramento(app),
    foco(app)
};