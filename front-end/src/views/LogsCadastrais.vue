<template>
    <div>
      <Navbar />
      <div class="logs-container">
        <h1>Logs Cadastrais</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ação</th>
              <th>Tabela</th>
              <th>Usuário</th>
              <th>Dados Antigos</th>
              <th>Dados Alterados</th>
              <th>Data do Log</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id">
              <td>{{ log.id }}</td>
              <td>{{ log.acao }}</td>
              <td>{{ log.tabela }}</td>
              <td>{{ log.usuario_acao }}</td>
              <td>
                <pre>{{ log.dados_antigos
                
                
                
                }}</pre>
              </td>
              <td>
                <pre>{{ log.dados_alterados }}</pre> <!-- Use <pre> para manter a formatação do JSON -->
              </td>
              <td>{{ log.data_log }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/NavBar.vue';
  import { getLog } from '../services/apiService';
  
  export default {
    name: 'LogsCadastrais',
    components: {
      Navbar,
    },
    data() {
      return {
        logs: [],
      };
    },
    created() {
      this.fetchLogs();
    },
    methods: {
      async fetchLogs() {
        try {
          const response = await getLog();
          this.logs = response.data;
        } catch (error) {
          console.error('Erro ao buscar logs:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .logs-container {
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
  }
  pre {
    white-space: pre-wrap; /* Mantém a formatação do JSON */
    word-wrap: break-word; /* Evita quebra de linha */
  }
  </style>