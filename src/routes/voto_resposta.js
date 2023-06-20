const votorespostaController = require('../controllers/voto_resposta');

module.exports = (app) => {
  app.post('/voto_resposta', votorespostaController.postVoto
    // #swagger.tags = ['Voto Resposta']   
    // #swagger.summary = 'Efetua o voto das respostas.'
    // #swagger.description = 'Efetua a postagem de um voto sendo eles 0 para Resposta incorreta e 1 para resposta correta.'
    /* #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados para inserir um voto na resposta',
        required: 'true',
        type: 'json',
        schema: 
        {
             "usuario_id": 123,
              "resposta_id": 456,
              "tipo_voto": 1
        }
    } */)
  app.get('/voto_resposta', votorespostaController.getVoto
    /*
    #swagger.tags = ['Voto Resposta']   
    #swagger.summary = 'Consulta todos os votos das respostas'       
   
    #swagger.responses[200] = { description: 'Sucesso!',
    schema: {
        "total": 1,
        "votos": 
        [
          {
        "usuario_id": 5,
        "resposta_id": 4,
        "tipo_voto": 0
          }
        ]
      }
    }
    */)
  app.delete('/voto_resposta/:id', votorespostaController.deleteVoto
    /* #swagger.tags = ['Voto Resposta']
    #swagger.summary = 'Efetua deleção de um Voto com parametro id.'*/)
  app.put('/voto_resposta/:id', votorespostaController.putVoto
    /* #swagger.tags = ['Voto Resposta']
    #swagger.summary = 'Efetua atualização de todos os campos de um voto na resposta com parametro id.'
    #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados que podem ser passados para atualizar totalmente um voto na resposta',
        required: 'true',
        type: 'json',
        schema: {
        "usuario_id": 5,
        "resposta_id": 4,
        "tipo_voto": 0
        }
    }
    */)
  app.patch('/voto_resposta/:id', votorespostaController.patchVoto
    /* #swagger.tags = ['Voto Resposta']
    #swagger.summary = 'Esta rota, atualiza dados de um voto de resposta, o voto da resposta é efetuado para que seja 1 - correta ou 0 - incorreta'
    #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados que podem ser passados para atualizar um voto na resposta',
        required: 'true',
        type: 'json',
        schema: {
        "usuario_id": 5,
        "resposta_id": 4,
        "tipo_voto": 0
        }
    }*/)
}