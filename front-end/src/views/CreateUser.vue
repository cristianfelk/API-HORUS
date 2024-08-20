<template>
    <div class="create-user">
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
    },
  };
  </script>
  
  <style scoped>
  .create-user {
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .submit-button {
    padding: 10px 15px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    width: 100%;
    border-radius: 4px;
    font-size: 16px;
  }
  </style>
  