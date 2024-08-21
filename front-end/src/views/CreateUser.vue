<template>
  <div class="create-user">
    <div class="navbar">
      <button @click="goBack" class="back-button">← Voltar</button>
      <button @click="logout" class="logout-button">Sair</button>
    </div>
    <h2>Cadastrar Novo Usuário</h2>
    <form @submit.prevent="postUsuario" autocomplete="off">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" v-model="form.nome" id="nome" required />
      </div>

      <div class="form-group">
        <label for="login">Login</label>
        <input type="text" v-model="form.login" id="login" required />
      </div>

      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" v-model="form.senha" id="senha" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status" required>
          <option value="" disabled>Selecione o status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateUser',
  data() {
    return {
      form: {
        nome: '',
        login: '',
        senha: '',
        email: '',
        status: '',
      },
    };
  },
  methods: {
    async postUsuario() {
      try {
        const response = await axios.post('http://localhost:3000/usuario', this.form);
        console.log('Usuário criado com sucesso:', response.data);
        this.$router.push('/usuarios');
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    },
    goBack() {
      this.$router.push('/usuarios');
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.create-user {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(34, 139, 34, 1);
  padding: 10px 20px;
  color: white;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.logout-button {
  background-color: rgba(34, 139, 34, 1);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.logout-button:hover {
  background-color: rgba(34, 139, 34, 0.8);
}

h2 {
  margin-top: 80px;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

label {
  width: 120px;
  margin-right: 20px;
  font-weight: bold;
  text-align: right;
}

input[type="text"],
input[type="password"],
input[type="email"],
select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
