<template>
    <div class="container">
      <Navbar />
      <div class="form-container">
        <h1>Editar Logradouro</h1>
        <form @submit.prevent="updateLogradouro">
          <div class="form-group">
            <label for="municipio_id">Município ID:</label>
            <input v-model="logradouro.municipio_id" type="number" id="municipio_id" required />
          </div>
          <div class="form-group">
            <label for="cep">CEP:</label>
            <input v-model="logradouro.cep" type="text" id="cep" required />
          </div>
          <div class="form-group">
            <label for="logradouro">Logradouro:</label>
            <input v-model="logradouro.logradouro" type="text" id="logradouro" required />
          </div>
          <div class="form-group">
            <label for="complemento">Complemento:</label>
            <input v-model="logradouro.complemento" type="text" id="complemento" />
          </div>
          <div class="form-group">
            <label for="bairro">Bairro:</label>
            <input v-model="logradouro.bairro" type="text" id="bairro" required />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/NavBar.vue';
  import { getLogradouroById, updateLogradouro } from '../services/apiService';
  
  export default {
    components: { Navbar },
    data() {
      return {
        logradouro: {
          municipio_id: '',
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: ''
        }
      };
    },
    async created() {
      try {
        const id = this.$route.params.id;
        const response = await getLogradouroById(id);
        this.logradouro = response.data;
      } catch (error) {
        console.error('Erro ao carregar logradouro:', error);
        alert('Erro ao carregar logradouro');
      }
    },
    methods: {
      async updateLogradouro() {
        try {
          const id = this.$route.params.id;
          await updateLogradouro(id, this.logradouro);
          alert('Logradouro atualizado com sucesso');
          this.$router.push('/logradouros');
        } catch (error) {
          console.error('Erro ao atualizar logradouro:', error);
          alert('Erro ao atualizar logradouro');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .form-container {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
  }
  
  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  button:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
      margin-top: 10px;
    }
  
    h1 {
      font-size: 20px;
    }
  }
  </style>  