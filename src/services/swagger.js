const swaggerAutogen = require('swagger-autogen')('pt-BR');

const doc = {
    info: {
        version: "1.0.0",
        title: "API - FORUM HORUS",
        description: "Essa documentação utilizando Swagger, é a versão 1.0 da documentação da API - FORUM HORUS, onde possuí intuito de apresentar dúvidas e respostas dos academicos com assuntos gerais da faculdade, está API possuí 5 tabelas, que estão documentadas abaixo, com seus métodos e exemplos."
    },
    host: `localhost:3000`,
    basePath: "",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './src/docs/swagger.yaml';
const endpointsFiles = ['./src/routes/usuario.js', './src/routes/categoria.js', './src/routes/topico.js', './src/routes/resposta.js', './src/routes/voto_resposta.js']

swaggerAutogen(outputFile, endpointsFiles, doc);