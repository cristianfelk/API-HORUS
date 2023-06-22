const usuarioController = require('../controllers/usuario');

module.exports = (app) => {
  app.get('/usuario', usuarioController.getUsuario
    /*
    #swagger.tags = ['Usuario']   
    #swagger.summary = 'Consulta todos usuarios'       
  
    #swagger.responses[200] = { description: 'Sucesso!',
    schema: {
        "total": 1,
        "Usuario": [
          {
        "id": 2,
        "nome": "Cristian",
        "email": "cristianfeldkircher@gmail.com",
        "senha": "Cristian123",
        "data_cadastro": "2023-05-25",
        "reputacao": 4
          }
        ]
      }
    }
    */)
  app.delete('/usuario/:id', usuarioController.deleteUsuario
    /*
    #swagger.tags = ['Usuario']   
    #swagger.summary = 'Deleta um usuario - Basta passa - localhost:3000/usuario/id.'
    */)
  app.post('/usuario', usuarioController.postUsuario
    // #swagger.tags = ['Usuario']   
    // #swagger.summary = 'Cadastro de Usuario'
    // #swagger.description = 'Cadastro de Usuario do sistema da forum horus'
    /* #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados para inserir um usuario',
        required: 'true',
        type: 'json',
        schema: {
            "nome": "NOME",
            "email": "EMAIL",
            "senha": "SENHA",
            "reputacao": 0
        }
    } */)
  app.put('/usuario/:id', usuarioController.putUsuario
    /* #swagger.tags = ['Usuario']
    #swagger.summary = 'Efetua atualização de todos os campos de um Usuario com parametro id.'
    #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados que podem ser passados para atualizar totalmente um usuario',
        required: 'true',
        type: 'json',
        schema: {
          "nome": "NOME",
          "email": "EMAIL",
          "senha": "SENHA",
          "data_cadastro": "DATA",
          "reputacao": "REPUTACAO"
        }
    }
    */)
  app.patch('/usuario/:id', usuarioController.patchUsuario
    /* #swagger.tags = ['Usuario']
    #swagger.summary = 'Efetua atualização parcial de um Usuario com parametro id.'
    #swagger.parameters['json'] = {
        in: 'body',
        description: 'Dados que podem ser passados para atualizar um usuario',
        required: 'true',
        type: 'json',
        schema: {
        "nome": "Usuário 5",
        "email": "usuario5@example.com",
        "senha": "senhaxyz",
        "data_cadastro": "2023-05-26",
        "reputacao": 0
        }
    }*/)
}