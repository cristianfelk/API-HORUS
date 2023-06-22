const categoriaController = require('../controllers/categoria');

module.exports = (app) => { 
    app.post('/categoria', categoriaController.postCategoria
        // #swagger.tags = ['Categoria']   
        // #swagger.summary = 'Cadastro de Categoria'
        // #swagger.description = 'Cadastro de Categoria do sistema da forum horus'
        /* #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para inserir um Categoria',
            required: 'true',
            type: 'json',
            schema:     {
        "nome": "Perguntas sobre programação",
        "descricao": "Essa é uma descrição de exemplo",
        "data_criacao": "2023-06-01",
        "quantidade_topicos": 10
                        }
        } */)
    app.get('/categoria', categoriaController.getCategoria
        /*
        #swagger.tags = ['Categoria']   
        #swagger.summary = 'Consulta todos Categoria'       
    
        #swagger.responses[200] = { description: 'Sucesso!',
        schema: {
            "total": 1,
            "Categoria": [
                {
        "id": 2,
        "nome": "Perguntas sobre programação",
        "descricao": "Essa é uma descrição de exemplo",
        "data_criacao": "2023-06-01",
        "quantidade_topicos": 10
                }
            ]
        }
        }
        */)
    app.delete('/categoria/:id', categoriaController.deleteCategoria
        /* #swagger.tags = ['Categoria']
        #swagger.summary = 'Efetua deleção de uma categoria utilizando o id.'
        */)
    app.put('/categoria/:id', categoriaController.putCategoria
        /* #swagger.tags = ['Categoria']
        #swagger.summary = 'Efetua atualização de todos os campos de um Categoria com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados que podem ser passados para atualizar totalmente um Categoria',
            required: 'true',
            type: 'json',
            schema: {
        "nome": "Perguntas sobre programação",
        "descricao": "Essa é uma descrição de exemplo",
        "data_criacao": "2023-06-01",
        "quantidade_topicos": 10
            }
        }
        */)
    app.patch('/categoria/:id', categoriaController.patchCategoria
        /* #swagger.tags = ['Categoria']
        #swagger.summary = 'Efetua atualização parcial de um Categoria com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados que podem ser passados para atualizar um Categoria',
            required: 'true',
            type: 'json',
            schema:             {
        "nome": "Perguntas sobre programação",
        "descricao": "Essa é uma descrição de exemplo",
        "data_criacao": "2023-06-01",
        "quantidade_topicos": 10
                }
        }*/)
} 