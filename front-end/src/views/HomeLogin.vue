<template>
    <div class="login-container">
      <div class="login-content">
        <img src="../assets/logoPzo.png" alt="Logo" class="login-logo">
        <div class="login-box">
          <form>
            <div class="input-group">
              <label for="username">Usuário</label>
              <input type="text" id="username" placeholder="Digite seu usuário">
            </div>
            <div class="input-group">
              <label for="password">Senha</label>
              <input type="password" id="password" placeholder="Digite sua senha">
            </div>
            <button type="submit" class="login-button">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeLogin',
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 100vw;
    margin: 0;
  }
  
  .login-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login-logo {
    width: 250px; /* Ajuste o tamanho conforme necessário */
    margin-bottom: 30px; /* Espaço entre a logo e a caixa de login */
  }
  
  .login-box {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center; /* Centraliza o conteúdo dentro da caixa de login */
  }
  
  .input-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .input-group label {
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
  }
  
  .input-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .login-button {
    width: 50%;
    padding: 10px;
    background-color: rgba(34, 139, 34, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .login-button:hover {
    background-color: rgba(34, 139, 34, 1);
  }
  </style>
  