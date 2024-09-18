<template>
  <div class="monitoramento-container">
    <Navbar />

    <h1>Monitoramento</h1>
    <div class="stats">
      <div class="stat-group">
        <div class="stat-input">
          <h2>Casos Confirmados</h2>
          <input type="number" v-model="monitoramento.casos_confirmados" />
          <h2>Casos Mortes</h2>
          <input type="number" v-model="monitoramento.casos_mortes" />
          <h2>Casos Monitorados</h2>
          <input type="number" v-model="monitoramento.casos_monitorados" />
          <h2>Casos Ativos</h2>
          <input type="number" v-model="monitoramento.casos_ativos" />
          <button @click="updateMonitoramento">Atualizar Dados</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import { getMonitoramento, updateMonitoramento } from '../services/apiService';

export default {
  components: {
    Navbar
  },
  name: "Monitoramento",
  data() {
    return {
      monitoramento: {
        casos_confirmados: 0,
        casos_mortes: 0,
        casos_monitorados: 0,
        casos_ativos: 0,
      },
    };
  },
  methods: {
    async fetchMonitoramento() {
      try {
        const response = await getMonitoramento();
        this.monitoramento = response.data;
      } catch (error) {
        console.error('Erro ao buscar dados de monitoramento:', error);
      }
    },
    async updateMonitoramento() {
      const updatedData = {
        casos_confirmados: this.monitoramento.casos_confirmados,
        casos_mortes: this.monitoramento.casos_mortes,
        casos_monitorados: this.monitoramento.casos_monitorados,
        casos_ativos: this.monitoramento.casos_ativos,
      };
      try {
        await updateMonitoramento(updatedData);
        this.fetchMonitoramento(); 
      } catch (error) {
        console.error('Erro ao atualizar dados de monitoramento:', error);
      }
    },
  },
  created() {
    this.fetchMonitoramento();
  },
};
</script>

<style scoped>
.monitoramento-container {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  margin-bottom: 10px;
  font-size: 24px;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.stat-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
}

.stat-input {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 280px;
  text-align: center;
}

.stat-input h2 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.stat-input input {
  width: 100%;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #69c369;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #5aad5a;
}
</style>
