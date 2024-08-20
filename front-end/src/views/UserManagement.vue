<template>
    <div class="user-management-container">
      <div class="navbar">
        <button @click="goHome" class="navbar-logo-button">
          <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo">
        </button>
        <button @click="logout" class="logout-button">Sair</button>
      </div>
      <div class="user-management">
        <h2>Gerenciamento de Usuários</h2>
        <button @click="createUser" class="create-button">Cadastrar Novo Usuário</button>
        <div class="user-table-container">
          <table class="user-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Login</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.nome }}</td>
                <td>{{ user.login }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.status }}</td>
                <td>
                  <button @click="editUser(user.id)" class="edit-button">Editar</button>
                  <button @click="confirmDelete(user.id)" class="delete-button">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <div v-if="showConfirmation" class="confirmation-popup">
          <p>Tem certeza que deseja excluir este usuário?</p>
          <button @click="deleteUser(currentUserId)" class="confirm-button">Sim</button>
          <button @click="cancelDelete" class="cancel-button">Não</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserManagement',
    data() {
      return {
        users: [], // Lista de usuários
        showConfirmation: false, // Controle de exibição do popup
        currentUserId: null, // ID do usuário que será excluído
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/usuario');
          this.users = response.data;
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        }
      },
      createUser() {
        this.$router.push('/usuarios/novo'); // Redireciona para a tela de criação de usuário
      },
      editUser(userId) {
        this.$router.push(`/usuarios/${userId}/editar`); // Redireciona para a tela de edição
      },
      confirmDelete(userId) {
        this.currentUserId = userId; // Armazena o ID do usuário para exclusão
        this.showConfirmation = true; // Exibe o popup de confirmação
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3000/usuario/${userId}`); // Chama a API para excluir o usuário
          this.fetchUsers(); // Atualiza a lista de usuários
          this.showConfirmation = false; // Esconde o popup de confirmação
        } catch (error) {
          console.error('Erro ao excluir usuário:', error);
        }
      },
      cancelDelete() {
        this.showConfirmation = false; // Cancela a exclusão e esconde o popup
        this.currentUserId = null; // Reseta o ID do usuário
      },
      logout() {
        localStorage.removeItem('authToken'); // Remove o token do localStorage
        this.$router.push('/'); // Redireciona para a página de login
      },
      goHome() {
        this.$router.push('/dashboard'); // Redireciona para a página inicial
      }
    },
    mounted() {
      this.fetchUsers(); // Busca os usuários ao montar o componente
    },
  };
  </script>
  
  <style scoped>
.user-management-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
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
  height: 40px; /* Ajuste o tamanho conforme necessário */
}

.logout-button {
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.logout-button:hover {
  background-color: rgba(34, 139, 34, 0.8); /* Efeito hover */
}

.user-management {
  padding: 80px 20px 20px 20px; /* Adiciona padding para o conteúdo não sobrepor a navbar */
  margin-left: 0; /* Remove o espaço da margem esquerda */
  margin-right: 0; /* Remove o espaço da margem direita */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
}

.user-table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.user-table {
  width: 90%; /* Ajusta a largura da tabela */
  max-width: 1200px; /* Limita a largura máxima para evitar que a tabela fique muito larga */
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.edit-button {
  margin-right: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.confirmation-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
}

.confirm-button {
  margin-right: 10px;
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.cancel-button {
  background-color: grey;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
