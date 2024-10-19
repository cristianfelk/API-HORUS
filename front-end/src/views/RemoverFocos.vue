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
                <button @click="removerFoco(foco.id)" class="btn-remove">Remover</button>
                <button @click="abrirModal(foco.latitude, foco.longitude)" class="btn-map">Ver no Mapa</button>
            </div>
        </li>
    </ul>

    <div v-if="isModalVisible" class="modal">
        <div class="modal-content">
            <span class="close" @click="fecharModal">&times;</span>
            <h2>Localização do Foco</h2>
            <div id="map" class="map-container"></div>
        </div>
    </div>
</div>
</template>

<script>
import L from 'leaflet';
import {
    getFocosDengue,
    deleteFoco
} from '../services/apiService';
import Navbar from "@/components/NavBar.vue";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            focos: [],
            map: null,
            isModalVisible: false
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
        async removerFoco(id) {
            try {
                await deleteFoco(id);
                this.focos = this.focos.filter(foco => foco.id !== id);
            } catch (error) {
                console.error('Erro ao remover foco:', error);
            }
        },
        abrirModal(latitude, longitude) {
            this.isModalVisible = true;
            this.$nextTick(() => {
                if (!this.map) {
                    this.iniciarMapa(latitude, longitude);
                } else {
                    this.atualizarMapa(latitude, longitude);
                }
            });
        },
        iniciarMapa(lat, lng) {
            this.map = L.map('map').setView([lat, lng], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);
            this.adicionarCirculo(lat, lng);
        },
        atualizarMapa(lat, lng) {
            this.map.setView([lat, lng], 16);
            this.adicionarCirculo(lat, lng);
        },
        adicionarCirculo(lat, lng) {
            if (this.map) {
                this.map.eachLayer((layer) => {
                    if (layer instanceof L.Circle) {
                        this.map.removeLayer(layer);
                    }
                });
            }

            L.circle([lat, lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 50
            }).addTo(this.map).bindPopup("Foco localizado aqui!").openPopup();
        },
        fecharModal() {
            this.isModalVisible = false;
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        }
    },
    created() {
        this.fetchFocos();
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 1.5em;
    color: #888;
    cursor: pointer;
}

.close:hover {
    color: #333;
}

.map-container {
    width: 100%;
    height: 300px;
    margin-top: 20px;
    border-radius: 10px;
}
</style>
