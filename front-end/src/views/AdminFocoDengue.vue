<template>
<div>
    <Navbar />
    <div class="admin-container">
        <h2>Adicionar Novo Foco de Dengue</h2>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="descricao">Descrição do Foco</label>
                <input type="text" v-model="descricao" required class="descricao-input" placeholder="Digite a descrição do foco..." />
            </div>

            <div class="map-container">
                <div id="map" class="map"></div>
            </div>

            <div class="coordinates-container">
                <div class="form-group">
                    <label for="latitude">Latitude Selecionada:</label>
                    <span class="coordinate-value">{{ latitude }}</span>
                </div>
                <div class="form-group">
                    <label for="longitude">Longitude Selecionada:</label>
                    <span class="coordinate-value">{{ longitude }}</span>
                </div>
            </div>

            <button type="submit" class="btn-submit">Salvar Foco</button>
        </form>
    </div>
</div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/NavBar.vue';
import L from 'leaflet';
import {
    adicionarFocoDengue
} from '../services/apiService';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            descricao: '',
            latitude: null,
            longitude: null,
            defaultLat: -26.8481,
            defaultLng: -52.9885,
            map: null,
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
            this.map.on('click', this.addMarker);
        },
        addMarker(e) {
            L.circle([e.latlng.lat, e.latlng.lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 25
            }).addTo(this.map);
            this.updateLocation(e);
        },
        updateLocation(event) {
            const {
                lat,
                lng
            } = event.latlng;
            this.latitude = lat;
            this.longitude = lng;
        },
        async submitForm() {
            if (!this.latitude || !this.longitude) {
                alert('Por favor, selecione uma localização no mapa.');
                return;
            }

            try {
                await adicionarFocoDengue({
                    descricao: this.descricao,
                    latitude: this.latitude,
                    longitude: this.longitude,
                });
                alert('Foco de dengue adicionado com sucesso!');
                location.reload();
            } catch (error) {
                console.error('Erro ao adicionar foco de dengue:', error);
                alert('Erro ao adicionar foco de dengue. Tente novamente.');
            }
        },
    },
};
</script>

<style scoped>
.admin-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

.descricao-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.descricao-input:focus {
    border-color: #ff6f61;
    outline: none;
}

.map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 450px;
}

.map {
    height: 100%;
    width: 100%;
}

.coordinates-container {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.coordinate-value {
    font-weight: bold;
    color: #555;
}

.btn-submit {
    background-color: #ff6f61;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s;
    width: 100%;
}

.btn-submit:hover {
    background-color: #e55b50;
}
</style>
