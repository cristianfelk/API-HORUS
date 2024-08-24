<template>
    <div class="logradouro-management">
      <Navbar />
      <div class="container">
        <h1>Gerenciamento de Logradouros</h1>
        <button @click="createLogradouro">Cadastrar Novo Logradouro</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Município</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="logradouro in logradouros" :key="logradouro.id">
              <td>{{ logradouro.id }}</td>
              <td>{{ logradouro.municipio_id }}</td>
              <td>{{ logradouro.cep }}</td>
              <td>{{ logradouro.logradouro }}</td>
              <td>{{ logradouro.complemento }}</td>
              <td>{{ logradouro.bairro }}</td>
              <td>
                <button @click="editLogradouro(logradouro.id)">Editar</button>
                <button @click="deleteLogradouro(logradouro.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/NavBar.vue';
  import { getLogradouros, deleteLogradouro } from '../services/apiService';
  
  export default {
    name: 'LogradouroManagement',
    components: {
      Navbar,
    },
    data() {
      return {
        logradouros: [],
      };
    },
    methods: {
      async fetchLogradouros() {
        try {
          const response = await getLogradouros();
          this.logradouros = response.data;
        } catch (error) {
          console.error('Erro ao buscar logradouros:', error);
        }
      },
      createLogradouro() {
        this.$router.push('/create-logradouro');
      },
      editLogradouro(id) {
        this.$router.push(`/edit-logradouro/${id}`);
      },
      async deleteLogradouro(id) {
        if (confirm('Tem certeza que deseja excluir este logradouro?')) {
          try {
            await deleteLogradouro(id);
            this.fetchLogradouros();
          } catch (error) {
            console.error('Erro ao excluir logradouro:', error);
          }
        }
      },
    },
    mounted() {
      this.fetchLogradouros();
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  button {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #69c369;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #5dad5d;
  }
  </style>
  