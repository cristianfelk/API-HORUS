<template>
  <div class="municipio-management-container">
    <div class="navbar">
      <button @click="goHome" class="navbar-logo-button">
        <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo">
      </button>
      <button @click="logout" class="logout-button">Sair</button>
    </div>
    <div class="municipio-management">
      <h2 class="title">Gerenciamento de Municípios</h2>
      <div class="button-container">
        <button @click="createMunicipio" class="create-button">Cadastrar Novo Município</button>
      </div>
      <div class="municipio-table-container">
        <table class="municipio-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>IBGE</th>
              <th>UF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="municipio in municipios" :key="municipio.id">
              <td>{{ municipio.id }}</td>
              <td>{{ municipio.nome }}</td>
              <td>{{ municipio.ibge }}</td>
              <td>{{ municipio.uf }}</td>
              <td>
                <button @click="editMunicipio(municipio.id)" class="edit-button">Editar</button>
                <button @click="confirmDelete(municipio.id)" class="delete-button">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="pagination-button">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="!hasMore" class="pagination-button">Próximo</button>
      </div>
      <div v-if="showConfirmation" class="confirmation-popup">
        <p>Tem certeza que deseja excluir este município?</p>
        <button @click="deleteMunicipio(currentMunicipioId)" class="confirm-button">Sim</button>
        <button @click="cancelDelete" class="cancel-button">Não</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MunicipioManagement',
  data() {
    return {
      municipios: [], // Lista de municípios
      showConfirmation: false, // Controle de exibição do popup
      currentMunicipioId: null, // ID do município que será excluído
      currentPage: 1, // Página atual
      hasMore: false // Se há mais páginas disponíveis
    };
  },
  methods: {
    async fetchMunicipios(page = 1) {
      try {
        const response = await axios.get('http://localhost:3000/municipio', {
          params: {
            page: page,
            limit: 10
          }
        });
        this.municipios = response.data.data; // Lista de municípios
        this.currentPage = response.data.pagination.page; // Página atual
        this.hasMore = this.currentPage < response.data.pagination.totalPages; // Verifica se há mais páginas
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
      }
    },
    createMunicipio() {
      this.$router.push('/municipios/novo');
    },
    editMunicipio(municipioId) {
      this.$router.push(`/municipios/${municipioId}/editar`);
    },
    confirmDelete(municipioId) {
      this.currentMunicipioId = municipioId;
      this.showConfirmation = true;
    },
    async deleteMunicipio(municipioId) {
      try {
        await axios.delete(`http://localhost:3000/municipio/${municipioId}`);
        this.fetchMunicipios(this.currentPage);
        this.showConfirmation = false;
      } catch (error) {
        console.error('Erro ao excluir município:', error);
      }
    },
    cancelDelete() {
      this.showConfirmation = false;
      this.currentMunicipioId = null;
    },
    changePage(page) {
      if (page > 0 && page !== this.currentPage) {
        this.fetchMunicipios(page);
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
    this.fetchMunicipios();
  }
}
</script>

<style scoped>
.municipio-management-container {
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

.municipio-management {
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

.create-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  background-color: #28a745;
  color: white;
}

.create-button:hover {
  background-color: #218838;
}

.municipio-table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Espaço abaixo da tabela */
}

.municipio-table {
  width: 90%;
  max-width: 1200px;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}

.municipio-table th,
.municipio-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.municipio-table th {
  background-color: #f2f2f2;
}

.municipio-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.municipio-table tr:hover {
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px; /* Espaço acima da navegação de página */
}

.pagination-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.pagination-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination-button:not(:disabled) {
  background-color: #007bff;
  color: white;
}

.pagination-button:not(:disabled):hover {
  background-color: #0056b3;
}

.confirmation-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
}

.confirmation-popup p {
  margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.confirm-button {
  background-color: #28a745;
  color: white;
}

.confirm-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}

.cancel-button:hover {
  background-color: #c82333;
}
</style>