const loginService = require('../services/loginService');

const postLogin = async (req, res, next) => {
  try {
      const params = req.body; // Pegando os dados do corpo da requisição
      const result = await loginService.postLogin(params);
      
      if (result.success) {
          res.status(200).send(result); // Login bem-sucedido
      } else {
          res.status(401).send(result); // Credenciais inválidas
      }
  } catch (err) {
      next(err);
  } 
}

module.exports.postLogin = postLogin;
