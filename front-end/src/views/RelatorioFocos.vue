<template>
<div class="relatorio-focos">
    <Navbar />
    <h1>Relatório de Focos e Denúncias</h1>

    <form @submit.prevent="filtrarFocosEDenuncias">
        <div>
            <label for="dataInicio">Data Inicial:</label>
            <input type="date" v-model="dataInicio" required />
        </div>

        <div>
            <label for="dataFim">Data Final:</label>
            <input type="date" v-model="dataFim" required />
        </div>

        <button type="submit" class="btn-filtrar">Filtrar</button>
    </form>

    <div id="map" class="map-container"></div>
</div>
</template>

<script>
import L from 'leaflet';
import {
    getFocosDengue,
    getDenunciasConfirmadas
} from '../services/apiService';
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
        },
        setMesAtual() {
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = hoje.getMonth();

            this.dataInicio = `${ano}-${String(mes + 1).padStart(2, '0')}-01`;
            this.dataFim = new Date(ano, mes + 1, 0).toISOString().split('T')[0];
        }
    },
    async created() {
        await this.fetchFocos();
        await this.fetchDenuncias();
    },
    mounted() {
        this.iniciarMapa();
        this.setMesAtual();
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
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

form div {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 200px;
}

form label {
    white-space: nowrap;
}

form input {
    padding: 5px;
    flex: 1;
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

@media (max-width: 600px) {
    form {
        flex-direction: column;
        gap: 15px;
    }

    .btn-filtrar {
        align-self: center;
    }
}
</style>
