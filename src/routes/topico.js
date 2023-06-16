const topicoController = require('../controllers/topico');

module.exports = (app) => {
    app.post('/topico', topicoController.postTopico
        // #swagger.tags = ['Topico']   
        // #swagger.summary = 'Cadastro de Topico'
        // #swagger.description = 'Cadastro de Topico do sistema da forum horus'
        /* #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para inserir um Topico',
            required: 'true',
            type: 'json',
            schema: {
            "titulo": "Exemplo de topico",
            "conteudo": "Este é um topico de conteúdo.",
            "usuario_id": 2,
            "categoria_id": 2
            }
        } */)
    app.get('/topico', topicoController.getTopico
        /*
        #swagger.tags = ['Topico']   
        #swagger.summary = 'Consulta todos Topicos'       
    
        #swagger.responses[200] = { description: 'Sucesso!',
        schema: {
            "total": 1,
            "Topico": [
            
        {
            "id": 2,
            "titulo": "Exemplo de topico",
            "conteudo": "Este é um topico de conteúdo.",
            "data_criacao": "2023-06-01T03:00:00.000Z",
            "usuario_id": 2,
            "categoria_id": 2
        }
            
            ]
        }
        }
        */)
    app.delete('/topico/:id', topicoController.deleteTopico
        /* #swagger.tags = ['Topico']
        #swagger.summary = 'Efetua deleção de um Topico com parametro id.'*/)
    app.put('/topico/:id', topicoController.putTopico
        /* #swagger.tags = ['Topico']
        #swagger.summary = 'Efetua atualização parcial de um parcialmente com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',             
            description: 'Dados que podem ser passados para atualizar parcialmente um Topico',
            required: 'true',
            type: 'json',
            schema:     {
    
            "titulo": "TITULO",
            "conteudo": "CONTEUDO",
            "data_criacao": "DATA",
            "usuario_id": 2,
            "categoria_id": 2
        }
        }*/)
    app.patch('/topico/:id', topicoController.patchTopico
        /* #swagger.tags = ['Topico']
        #swagger.summary = 'Efetua atualização parcial de um Topico com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados que podem ser passados para atualizar um Topico',
            required: 'true',
            type: 'json',
            schema:     {
    
            "titulo": "TITULO",
            "conteudo": "CONTEUDO",
            "data_criacao": "DATA",
            "usuario_id": 2,
            "categoria_id": 2
        }
        }*/)
}