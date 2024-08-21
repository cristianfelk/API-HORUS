<template>
  <div class="municipio-form">
    <h2>{{ isEditing ? 'Editar Município' : 'Cadastrar Novo Município' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input v-model="municipio.nome" id="nome" type="text" required>
      </div>
      <div class="form-group">
        <label for="cep">CEP</label>
        <input v-model="municipio.cep" id="cep" type="text" required>
      </div>
      <button type="submit" class="submit-button">{{ isEditing ? 'Atualizar' : 'Cadastrar' }}</button>
      <button @click="$router.push('/municipios')" type="button" class="cancel-button">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MunicipioForm',
  data() {
    return {
      municipio: {
        nome: '',
        cep: ''
      },
      isEditing: false
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/api/municipio/${this.$route.params.id}`, this.municipio);
        } else {
          await axios.post('http://localhost:3000/api/municipio', this.municipio);
        }
        this.$router.push('/municipios');
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
      }
    },
    async fetchMunicipio() {
      try {
        const response = await axios.get(`http://localhost:3000/api/municipio/${this.$route.params.id}`);
        this.municipio = response.data;
      } catch (error) {
        console.error('Erro ao buscar município:', error);
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.isEditing = true;
      this.fetchMunicipio();
    }
  }
}
</script>

<style scoped>
/* Adicione o estilo para o formulário de município aqui */
</style>
