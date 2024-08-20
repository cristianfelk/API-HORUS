<template>
  <div class="login-container">
    <div class="login-content">
      <img src="../assets/logoPzo.png" alt="Logo" class="login-logo">
      <div class="login-box">
        <form @submit.prevent="postLogin">
          <div class="input-group">
            <label for="login">Usuário</label>
            <input type="text" v-model="login" id="login" placeholder="Digite seu usuário">
          </div>
          <div class="input-group">
            <label for="senha">Senha</label>
            <input type="password" v-model="senha" id="senha" placeholder="Digite sua senha">
          </div>
          <button type="submit" class="login-button">Entrar</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeLogin',
  data() {
    return {
      login: '',
      senha: '',
      errorMessage: '' // Adiciona um campo para a mensagem de erro
    };
  },
  methods: {
    async postLogin() {
      this.errorMessage = ''; // Limpa a mensagem de erro ao tentar fazer login
      try {
        const response = await axios.post('http://localhost:3000/login', {
          login: this.login,
          senha: this.senha
        });

        if (response.data.success) {
          localStorage.setItem('authToken', 'exampleToken'); // Armazena o token
          this.$router.push('/dashboard'); // Redireciona para a tela inicial do sistema
        } else {
          this.errorMessage = 'Login ou senha incorretos'; // Atualiza a mensagem de erro
        }
      } catch (error) {
        this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.'; // Atualiza a mensagem de erro
      }
    }
  }
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
  width: 250px;
  margin-bottom: 30px;
}

.login-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
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

/* Estilo para a mensagem de erro */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
