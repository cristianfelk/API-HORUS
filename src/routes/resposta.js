const respostaController = require('../controllers/resposta');

module.exports = (app) => {
    app.post('/resposta', respostaController.postResposta
        // #swagger.tags = ['Resposta']   
        // #swagger.summary = 'Cadastro de Resposta'
        // #swagger.description = 'Cadastro de Resposta do sistema da forum horus'
        /* #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para inserir um Resposta',
            required: 'true',
            type: 'json',
            schema:     {
            "conteudo": "TEXT",
            "data_criacao": "DATE",
            "usuario_id": 2,
            "topico_id": 2
        }}
        } */)
    app.get('/resposta', respostaController.getResposta
        /*
        #swagger.tags = ['Resposta']   
        #swagger.summary = 'Consulta todos Resposta'       
    
        #swagger.responses[200] = { description: 'Sucesso!',
        schema: {
            "total": 1,
            "Resposta": [    
            {
        "id": 8,
        "conteudo": "Não está certo essa sua respota amigo",
        "data_criacao": "2023-06-15",
        "usuario_id": 2,
        "topico_id": 1
            }    
            ]
        }
        }
        */)
    app.delete('/resposta/:id', respostaController.deleteResposta
        /* #swagger.tags = ['Resposta']
        #swagger.summary = 'Efetua deleção de uma resposta com parametro id.'*/)
    app.put('/resposta/:id', respostaController.putResposta
        /* #swagger.tags = ['Resposta']
        #swagger.summary = 'Efetua atualização de todos os campos de um Resposta com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados que podem ser passados para atualizar totalmente um Resposta',
            required: 'true',
            type: 'json',
            schema: {
        "conteudo": "Não está certo essa sua respota amigo",
        "data_criacao": "2023-06-15",
        "usuario_id": 2,
        "topico_id": 1
            }
        }
        */)
    app.patch('/resposta/:id', respostaController.patchResposta
        /* #swagger.tags = ['Resposta']
        #swagger.summary = 'Efetua atualização parcial de um Resposta com parametro id.'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados que podem ser passados para atualizar um Resposta',
            required: 'true',
            type: 'json',
            schema:     {
        "conteudo": "Não está certo essa sua respota amigo",
        "data_criacao": "2023-06-15",
        "usuario_id": 2,
        "topico_id": 1
        }
        }*/)
}