<template>
  <div class="user-management-container">
    <div class="navbar">
      <button @click="goHome" class="navbar-logo-button">
        <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo">
      </button>
      <button @click="logout" class="logout-button">Sair</button>
    </div>
    <div class="user-management">
      <h2 class="title">Gerenciamento de Usuários</h2>
      <div class="button-container">
        <button @click="createUser" class="create-button">Cadastrar Novo Usuário</button>
        <button @click="generatePDF" class="generate-pdf-button">Gerar Relatório PDF</button>
      </div>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    },
    generatePDF() {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Relatório de Usuários', 14, 20);

      doc.autoTable({
        startY: 30,
        head: [['Id', 'Nome', 'Login', 'Email', 'Status']],
        body: this.users.map(user => [
          user.id,
          user.nome,
          user.login,
          user.email,
          user.status
        ]),
        theme: 'striped'
      });

      doc.save('relatorio_usuarios.pdf');
    }
  },
  mounted() {
    this.fetchUsers(); // Busca os usuários ao montar o componente
  },
}
</script>

<style scoped>
.user-management-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: #f9f9f9; /* Cor de fundo clara para o contêiner principal */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #228B22; /* Verde floresta */
  padding: 10px 20px;
  color: white;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-logo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.navbar-logo {
  height: 50px; /* Ajuste o tamanho conforme necessário */
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff3333;
}

.user-management {
  padding: 80px 20px 20px 20px; /* Adiciona padding para o conteúdo não sobrepor a navbar */
  margin-left: 0; /* Remove o espaço da margem esquerda */
  margin-right: 0; /* Remove o espaço da margem direita */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.button-container {
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
  margin-bottom: 20px; /* Espaço abaixo dos botões */
}

.create-button,
.generate-pdf-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.create-button {
  background-color: #28a745;
  color: white;
}

.create-button:hover {
  background-color: #218838;
}

.generate-pdf-button {
  background-color: #007bff;
  color: white;
}

.generate-pdf-button:hover {
  background-color: #0056b3;
}

.user-table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Espaço abaixo da tabela */
}

.user-table {
  width: 90%;
  max-width: 1200px;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}

.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}

.confirmation-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.confirmation-popup p {
  margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.cancel-button {
  background-color: #dc3545;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>
