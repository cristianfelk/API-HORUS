<template>
    <div class="remover-focos">
        <Navbar />
      <h1>Remover Focos</h1>
      <ul class="focos-list">
        <li v-for="foco in focos" :key="foco.id" class="foco-item">
          <div class="foco-info">
            <p><strong>Descrição:</strong> {{ foco.descricao }}</p>
            <p><strong>Confirmado:</strong> {{ foco.confirmado ? 'Sim' : 'Não' }}</p>
            <p><strong>Latitude:</strong> {{ foco.latitude }}</p>
            <p><strong>Longitude:</strong> {{ foco.longitude }}</p>
            <p><strong>Data de Registro:</strong> {{ formatDate(foco.data_registro) }}</p>
          </div>
          <div class="button-group">
            <button @click="removerFoco(foco.descricao)" class="btn-remove">Remover</button>
            <button @click="verNoMapa(foco.latitude, foco.longitude)" class="btn-map">Ver no Mapa</button>
          </div>
        </li>
      </ul>
      <div id="map" class="map-container"></div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import { getFocosDengue, deleteFoco } from '../services/apiService';
  import Navbar from "@/components/NavBar.vue";
  
  export default {
    components: {
        Navbar,
    },
    data() {
      return {
        focos: [],
        map: null
      };
    },
    methods: {
      async fetchFocos() {
        try {
          const response = await getFocosDengue();
          this.focos = response.data;
          this.addFocosToMap();
        } catch (error) {
          console.error('Erro ao buscar focos:', error);
        }
      },
      async removerFoco(id) {
        try {
          await deleteFoco(id);
          this.focos = this.focos.filter(foco => foco.id !== id);
          this.updateMap();
        } catch (error) {
          console.error('Erro ao remover foco:', error);
        }
      },
      addFocosToMap() {
        this.focos.forEach(foco => {
          const lat = parseFloat(foco.latitude);
          const lng = parseFloat(foco.longitude);
          const circle = L.circle([lat, lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50,
          }).addTo(this.map);
          foco.circle = circle;
        });
      },
      updateMap() {
        this.focos.forEach(foco => {
          if (foco.circle) {
            foco.circle.remove();
          }
        });
        this.addFocosToMap();
      },
      initMap() {
        this.map = L.map('map').setView([-26.8481, -52.9885], 14);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        this.addFocosToMap();
      },
      verNoMapa(lat, lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        this.map.setView([latitude, longitude], 16);  
        L.popup()
          .setLatLng([latitude, longitude])
          .setContent(`<p>Foco localizado aqui!</p>`)
          .openOn(this.map);
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
      }
    },
    created() {
      this.fetchFocos();
    },
    mounted() {
      this.initMap();
    }
  };
  </script>
  
  <style scoped>
  .remover-focos {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
  }
  
  .focos-list {
    list-style-type: none;
    padding: 0;
  }
  
  .foco-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .foco-info p {
    margin: 0;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  
  .btn-remove {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .btn-remove:hover {
    background-color: #d32f2f;
  }
  
  .btn-map {
    background-color: #2196f3;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .btn-map:hover {
    background-color: #1976d2;
  }
  
  .map-container {
    height: 300px;
    margin-top: 20px;
    border-radius: 10px;
  }
  </style>
  