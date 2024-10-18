<template>
  <div class="relatorio-focos">
    <Navbar />
    <h1>Relatório de Focos e Denúncias</h1>

    <!-- Formulário de Filtro -->
    <form @submit.prevent="filtrarFocosEDenuncias">
      <label for="dataInicio">Data Inicial:</label>
      <input type="date" v-model="dataInicio" required />

      <label for="dataFim">Data Final:</label>
      <input type="date" v-model="dataFim" required />

      <button type="submit" class="btn-filtrar">Filtrar</button>
    </form>

    <!-- Mapa -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import { getFocosDengue, getDenunciasConfirmadas } from '../services/apiService';
import Navbar from "@/components/NavBar.vue";

export default {
  components: {
      Navbar,
  },
  data() {
    return {
      focos: [],
      denuncias: [],
      map: null,
      dataInicio: '',
      dataFim: ''
    };
  },
  methods: {
    async fetchFocos() {
      try {
        const response = await getFocosDengue();
        this.focos = response.data;
      } catch (error) {
        console.error('Erro ao buscar focos:', error);
      }
    },
    async fetchDenuncias() {
      try {
        const response = await getDenunciasConfirmadas();
        this.denuncias = response.data;
      } catch (error) {
        console.error('Erro ao buscar denúncias:', error);
      }
    },
    async filtrarFocosEDenuncias() {
      const dataInicio = new Date(this.dataInicio);
      const dataFim = new Date(this.dataFim);

      const focosFiltrados = this.focos.filter(foco => {
        const dataRegistro = new Date(foco.data_registro);
        return dataRegistro >= dataInicio && dataRegistro <= dataFim;
      });

      const denunciasFiltradas = this.denuncias.filter(denuncia => {
        const dataRegistro = new Date(denuncia.data_registro);
        return dataRegistro >= dataInicio && dataRegistro <= dataFim;
      });

      this.atualizarMapa(focosFiltrados, denunciasFiltradas);
    },
    iniciarMapa() {
      this.map = L.map('map').setView([-26.8481, -52.9885], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
    },
    atualizarMapa(focos, denuncias) {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Circle || layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      focos.forEach(foco => {
        const lat = parseFloat(foco.latitude);
        const lng = parseFloat(foco.longitude);
        L.circle([lat, lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 50
        }).addTo(this.map).bindPopup(`><p>Data: ${this.formatDate(foco.data_registro)}</p>`);
      });

      denuncias.forEach(denuncia => {
        const lat = parseFloat(denuncia.latitude);
        const lng = parseFloat(denuncia.longitude);
        L.circle([lat, lng], {
          color: 'blue',
          fillColor: '#03a9f4',
          fillOpacity: 0.5,
          radius: 50
        }).addTo(this.map).bindPopup(`<p>Data: ${this.formatDate(denuncia.data_registro)}</p>`);
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  },
  async created() {
    await this.fetchFocos();
    await this.fetchDenuncias();
  },
  mounted() {
    this.iniciarMapa();
  }
};
</script>

<style scoped>
.relatorio-focos {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

form label {
  margin-right: 10px;
}

form input {
  margin-right: 10px;
  padding: 5px;
}

.btn-filtrar {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-filtrar:hover {
  background-color: #45a049;
}

.map-container {
  height: 300px;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
