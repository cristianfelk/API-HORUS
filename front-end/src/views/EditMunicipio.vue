<template>
  <div class="form-container">
    <h1>Editar Município</h1>
    <form @submit.prevent="updateMunicipio">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" v-model="municipio.nome" id="nome" required>
      </div>
      <div class="form-group">
        <label for="cep">CEP:</label>
        <input type="text" v-model="municipio.cep" id="cep" required>
      </div>
      <div class="form-group">
        <label for="uf">UF:</label>
        <select v-model="municipio.uf" id="uf" required>
          <option value="" disabled>Selecione uma UF</option>
          <option value="1">AC</option>
          <option value="2">AL</option>
          <option value="3">AP</option>
          <option value="4">AM</option>
          <option value="5">BA</option>
          <option value="6">CE</option>
          <option value="7">DF</option>
          <option value="8">ES</option>
          <option value="9">GO</option>
          <option value="10">MA</option>
          <option value="11">MT</option>
          <option value="12">MS</option>
          <option value="13">MG</option>
          <option value="14">PA</option>
          <option value="15">PB</option>
          <option value="16">PR</option>
          <option value="17">PE</option>
          <option value="18">PI</option>
          <option value="19">RJ</option>
          <option value="20">RN</option>
          <option value="21">RS</option>
          <option value="22">RO</option>
          <option value="23">RR</option>
          <option value="24">SC</option>
          <option value="25">SP</option>
          <option value="26">SE</option>
          <option value="27">TO</option>
        </select>
      </div>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      municipio: {
        nome: '',
        cep: '',
        uf: ''
      }
    };
  },
  created() {
    this.fetchMunicipio();
  },
  methods: {
    async fetchMunicipio() {
      try {
        const response = await fetch(`http://localhost:3000/municipio/${this.$route.params.id}`);
        if (response.ok) {
          this.municipio = await response.json();
        } else {
          console.error('Erro ao buscar município');
        }
      } catch (error) {
        console.error('Erro ao buscar município:', error);
      }
    },
    async updateMunicipio() {
      try {
        const response = await fetch(`http://localhost:3000/municipio/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.municipio)
        });
        if (response.ok) {
          this.$router.push('/municipios');
        } else {
          console.error('Erro ao atualizar município');
        }
      } catch (error) {
        console.error('Erro ao atualizar município:', error);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
