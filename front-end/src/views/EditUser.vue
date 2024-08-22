<template>
    <div class="edit-user-container">
      <div class="navbar">
        <button @click="goHome" class="navbar-logo-button">
          <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo">
        </button>
        <button @click="logout" class="logout-button">Sair</button>
      </div>
      <div class="edit-user">
        <h2>Editar Usuário</h2>
        <form @submit.prevent="putUsuario">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input v-model="user.nome" id="nome" type="text" placeholder="Nome do Usuário"/>
          </div>
          <div class="form-group">
            <label for="login">Login:</label>
            <input v-model="user.login" id="login" type="text" placeholder="Login"/>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="user.email" id="email" type="email" placeholder="Email"/>
          </div>
          <div class="form-group">
            <label for="senha">Senha:</label>
            <input v-model="user.senha" id="senha" type="password" placeholder="Senha (deixe em branco se não for alterar)"/>
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select v-model="user.status" id="status">
              <option value="">Selecione o Status (opcional)</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
          <button type="submit" class="save-button">Salvar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditUser',
    data() {
      return {
        user: {
          nome: '',
          login: '',
          senha: '',
          email: '',
          status: ''
        }
      };
    },
    methods: {
      async fetchUser() {
        const userId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:3000/usuario/${userId}`);
          this.user = {
            nome: response.data.nome,
            login: response.data.login,
            email: response.data.email,
            status: response.data.status
          };
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      },
      async putUsuario() {
        const userId = this.$route.params.id;
        try {
          const updatedUser = {
            id: userId,
            nome: this.user.nome || null,
            login: this.user.login || null,
            senha: this.user.senha ? this.user.senha : '',
            email: this.user.email || null,
            status: this.user.status || null
          };
  
          console.log('Atualizando usuário com os seguintes dados:', updatedUser);
          const response = await axios.put(`http://localhost:3000/usuario/${userId}`, updatedUser);
          console.log('Resposta da atualização:', response.data); 
          this.$router.push('/usuarios');
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
        }
      },
      logout() {
        localStorage.removeItem('authToken');
        this.$router.push('/');
      },
      goHome() {
        this.$router.push('/dashboard'); 
      }
    },
    mounted() {
      this.fetchUser();
    }
  };
  </script>
  
  <style scoped>
  .edit-user-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
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
  
  .navbar-logo-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .navbar-logo {
    height: 40px; 
  }
  
  .logout-button {
    background-color: rgba(34, 139, 34, 1); 
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  .logout-button:hover {
    background-color: rgba(34, 139, 34, 0.8); 
  }
  
  .edit-user {
    padding: 80px 20px 20px 20px; 
    margin-left: 0; 
    margin-right: auto; 
    margin-left: auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .save-button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: darkgreen;
  }
  </style>