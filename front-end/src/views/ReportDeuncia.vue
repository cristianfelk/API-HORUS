<template>
<div>
    <Navbar />

    <div class="report-container">
        <h1 class="title">Denuncie Focos de Mosquito</h1>
        <p class="subtitle">
            Ajude a combater a dengue informando sobre possíveis focos do mosquito
            Aedes aegypti.
        </p>

        <form @submit.prevent="submitReport">
            <div class="form-group">
                <label for="anonima">Denúncia Anônima:</label>
                <input type="checkbox" id="anonima" v-model="report.anonima" />
            </div>

            <div v-if="!report.anonima">
                <div class="form-group">
                    <label for="nome">Nome do Denunciante:</label>
                    <input type="text" id="nome" v-model="report.nome_denunciante" />
                </div>
                <div class="form-group">
                    <label for="email">Email do Denunciante:</label>
                    <input type="email" id="email" v-model="report.email_denunciante" />
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone do Denunciante:</label>
                    <input type="text" id="telefone" v-model="report.telefone_denunciante" />
                </div>
            </div>

            <div class="form-group municipio-group">
                <label for="municipio">Município:</label>
                <input type="text" id="municipio" v-model="municipioSearch" @input="searchMunicipio" placeholder="Digite o nome do município" required />
                <ul v-if="municipioSuggestions.length" class="suggestions-list">
                    <li v-for="municipio in municipioSuggestions" :key="municipio.id" @click="selectMunicipio(municipio)" class="suggestion-item">
                        {{ municipio.nome }}
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label for="logradouro">Localização do Foco (Endereço):</label>
                <input type="text" id="logradouro" v-model="report.logradouro" required />
            </div>

            <div class="form-group">
                <label for="description">Descrição do Foco:</label>
                <textarea id="description" v-model="report.descricao_denuncia" required></textarea>
            </div>

            <label for="latitude">Localização aproximada do foco:</label>
            <div class="map-container">
                <div id="map" class="map"></div>
            </div>

            <div class="form-group">
                <label for="image">Imagem (opcional):</label>
                <input type="file" id="image" @change="handleFileUpload" />
            </div>

            <button type="submit" class="submit-button">Enviar Denúncia</button>
        </form>

        <p v-if="message" class="success-message">{{ message }}</p>
    </div>
</div>
</template>

    
<script>
import Navbar from "@/components/NavBarHome.vue";
import {
    searchMunicipioByNome,
    createDenuncia,
    adicionarFocoDengue
} from "../services/apiService";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            report: {
                anonima: false,
                nome_denunciante: "",
                email_denunciante: "",
                telefone_denunciante: "",
                id_municipio: null,
                logradouro: "",
                descricao_denuncia: "",
                image: null,
            },
            latitude: null,
            longitude: null,
            defaultLat: -26.8481,
            defaultLng: -52.9885,
            map: null,
            marker: null,
            municipioSearch: "",
            municipioSuggestions: [],
            message: "",
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map("map").setView([this.defaultLat, this.defaultLng], 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);
            this.map.on("click", this.addMarker);
        },
        addMarker(event) {
            const {
                lat,
                lng
            } = event.latlng;
            this.latitude = lat;
            this.longitude = lng;

            if (this.marker) {
                this.map.removeLayer(this.marker);
            }

            this.marker = L.marker([lat, lng]).addTo(this.map);

            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        },
        handleFileUpload(event) {
            this.report.image = event.target.files[0];
        },
        async searchMunicipio() {
            if (this.municipioSearch.length > 2) {
                const response = await searchMunicipioByNome(this.municipioSearch);
                this.municipioSuggestions = response.data;
            }
        },
        selectMunicipio(municipio) {
            this.report.id_municipio = municipio.id;
            this.municipioSearch = municipio.nome;
            this.municipioSuggestions = [];
        },
        async submitReport() {
            try {
                const formDataDenuncia = new FormData();
                formDataDenuncia.append("anonima", this.report.anonima);
                if (!this.report.anonima) {
                    formDataDenuncia.append("nome_denunciante", this.report.nome_denunciante);
                    formDataDenuncia.append("email_denunciante", this.report.email_denunciante);
                    formDataDenuncia.append("telefone_denunciante", this.report.telefone_denunciante);
                }
                formDataDenuncia.append("id_municipio", this.report.id_municipio);
                formDataDenuncia.append("logradouro", this.report.logradouro);
                formDataDenuncia.append("descricao_denuncia", this.report.descricao_denuncia);
                if (this.report.image) {
                    formDataDenuncia.append("image", this.report.image);
                }

                await createDenuncia(formDataDenuncia);

                const formDataFoco = new FormData();
                formDataFoco.append("descricao", 'Denuncia'); 
                formDataFoco.append("latitude", this.latitude);
                formDataFoco.append("longitude", this.longitude);
                formDataFoco.append("confirmado", false); 

                await adicionarFocoDengue(formDataFoco);

                this.message = "Denúncia enviada com sucesso!";
                this.resetForm();
            } catch (error) {
                console.error("Erro ao enviar a denúncia:", error);
            }
        },
        resetForm() {
            this.report = {
                anonima: false,
                nome_denunciante: "",
                email_denunciante: "",
                telefone_denunciante: "",
                id_municipio: null,
                logradouro: "",
                descricao_denuncia: "",
                image: null,
            };
            this.municipioSearch = "";
            this.municipioSuggestions = [];
        },
    },
};
</script>

    
<style scoped>
.report-container {
    max-width: 600px;
    margin: 80px auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 1rem;
    margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group textarea {
    resize: vertical;
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

.suggestions-list {
    list-style-type: none;
    padding: 0;
    margin-top: 5px;
    border: 1px solid #ccc;
    background-color: #ffffff;
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.suggestion-item:hover {
    background-color: #f0f8ff;
    font-weight: bold;
    color: #ff4d4d;
}

ul {
    padding-left: 0;
}

li {
    list-style-type: none;
}

.submit-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #ff1a1a;
}

.success-message {
    margin-top: 20px;
    text-align: center;
    color: green;
}
</style>
