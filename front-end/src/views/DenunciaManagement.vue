<template>
<div class="denuncia-management-container">
    <Navbar />

    <div class="denuncia-management">
        <h1 class="title">Monitoramento de Denúncias</h1>
        <p class="subtitle">Acompanhe todas as denúncias registradas e seus detalhes.</p>

        <div v-if="denuncias && denuncias.length" class="denuncia-list">
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome Denunciante</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Município</th>
                            <th>Logradouro</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="denuncia in denuncias" :key="denuncia.id">
                            <td>{{ denuncia.id }}</td>
                            <td v-if="!denuncia.anonima">{{ denuncia.nome_denunciante }}</td>
                            <td v-else>Anônima</td>
                            <td v-if="!denuncia.anonima">{{ denuncia.email_denunciante }}</td>
                            <td v-else>Anônima</td>
                            <td v-if="!denuncia.anonima">{{ denuncia.telefone_denunciante }}</td>
                            <td v-else>Anônima</td>
                            <td>{{ denuncia.id_municipio }}</td>
                            <td>{{ denuncia.logradouro }}</td>
                            <td>{{ denuncia.descricao_denuncia }}</td>
                            <td>{{ denuncia.confirmado }}</td>
                            <td>
                                <button @click="editDenuncia(denuncia)" class="action-button">Editar</button>
                                <button @click="verNoMapa(denuncia)" class="action-button">Ver no mapa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pagination-controls">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="pagination-button">Anterior</button>
                <span>Página {{ currentPage }} de {{ totalPages }}</span>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="pagination-button">Próxima</button>
            </div>
        </div>

        <div v-else-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-else class="loading-message">
            <p>Carregando denúncias...</p>
        </div>

        <div v-if="isMapVisible" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeMapModal">&times;</span>
                <h2>Localização no Mapa</h2>
                <div id="map" class="map"></div>
            </div>
        </div>

        <div v-if="isEditing" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Editar Denúncia</h2>
                <form @submit.prevent="updateDenuncia">
                    <div class="form-group" v-if="!selectedDenuncia.anonima">
                        <label for="nomeDenunciante">Nome Denunciante:</label>
                        <input id="nomeDenunciante" type="text" v-model="selectedDenuncia.nome_denunciante" required />
                    </div>
                    <div class="form-group" v-if="!selectedDenuncia.anonima">
                        <label for="emailDenunciante">Email:</label>
                        <input id="emailDenunciante" type="email" v-model="selectedDenuncia.email_denunciante" required />
                    </div>
                    <div class="form-group" v-if="!selectedDenuncia.anonima">
                        <label for="telefoneDenunciante">Telefone:</label>
                        <input id="telefoneDenunciante" type="text" v-model="selectedDenuncia.telefone_denunciante" required />
                    </div>
                    <div class="form-group">
                        <label for="municipio">Município:</label>
                        <input id="municipio" type="text" v-model="selectedDenuncia.id_municipio" required />
                    </div>
                    <div class="form-group">
                        <label for="logradouro">Logradouro:</label>
                        <input id="logradouro" type="text" v-model="selectedDenuncia.logradouro" required />
                    </div>
                    <div class="form-group">
                        <label for="status">Status:</label>
                        <select id="status" v-model="selectedDenuncia.confirmado" required>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Não Confirmado">Não Confirmado</option>
                            <option value="Resolvido">Resolvido</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="descricao">Descrição:</label>
                        <textarea id="descricao" v-model="selectedDenuncia.descricao_denuncia" required></textarea>
                    </div>
                    <div class="form-controls">
                        <button class="submit-button" type="submit">Salvar</button>
                        <button class="cancel-button" type="button" @click="closeModal">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

    
<script>
import Navbar from "@/components/NavBar.vue";
import {
    getDenuncia,
    updateDenuncia
} from "../services/apiService";
import L from "leaflet";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            denuncias: [],
            errorMessage: "",
            isEditing: false,
            isMapVisible: false,
            selectedDenuncia: null,
            map: null,
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 1,
        };
    },
    async created() {
        await this.fetchDenuncias();
    },
    methods: {
        async fetchDenuncias(page = 1) {
            try {
                const response = await getDenuncia({
                    page: page,
                    limit: this.itemsPerPage,
                });
                this.denuncias = response.data.data;
                this.totalPages = response.data.pagination.totalPages;
                this.currentPage = page;
                this.errorMessage = "";
            } catch (error) {
                this.errorMessage = "Erro ao buscar as denúncias.";
                console.error("Erro ao buscar as denúncias:", error);
            }
        },
        editDenuncia(denuncia) {
            this.selectedDenuncia = {
                ...denuncia
            };
            this.isEditing = true;
        },
        verNoMapa(denuncia) {
            this.selectedDenuncia = {
                ...denuncia
            };
            this.isMapVisible = true;
            this.$nextTick(() => {
                if (!this.map) {
                    this.initMap(denuncia.latitude, denuncia.longitude);
                } else {
                    this.updateMap(denuncia.latitude, denuncia.longitude);
                }
            });
        },
        initMap(lat, lon) {
            this.map = L.map("map").setView([lat, lon], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);
            L.marker([lat, lon]).addTo(this.map).bindPopup("Local da denúncia").openPopup();
        },
        updateMap(lat, lon) {
            this.map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(this.map).bindPopup("Local da denúncia").openPopup();
        },
        closeMapModal() {
            this.isMapVisible = false;
            this.map = null;
        },
        async updateDenuncia() {
            try {
                await updateDenuncia(this.selectedDenuncia.id, this.selectedDenuncia);
                this.isEditing = false;
                this.selectedDenuncia = null;
                await this.fetchDenuncias(this.currentPage);
            } catch (error) {
                console.error("Erro ao atualizar a denúncia:", error);
            }
        },
        closeModal() {
            this.isEditing = false;
            this.selectedDenuncia = null;
        },
        changePage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.fetchDenuncias(newPage);
            }
        },
    },
};
</script>

<style scoped>
.denuncia-management-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f4f7fa;
    min-height: 100vh;
}

.denuncia-management {
    width: 100%;
    max-width: 1200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 20px;
}

.title {
    font-size: 2.5em;
    margin-bottom: 10px;
    color: #333;
}

.subtitle {
    font-size: 1.2em;
    color: #555;
    margin-bottom: 20px;
}

.denuncia-list {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #000000;
}

th {
    background-color: #69c369;
    color: #ffffff;
    font-weight: bold;
}

tr:hover {
    background-color: #f1f1f1;
}

.pagination-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.error-message,
.loading-message {
    text-align: center;
    font-size: 1.1em;
    color: #f44336;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.close {
    cursor: pointer;
    font-size: 1.5em;
    color: #888;
    float: right;
}

.close:hover {
    color: #333;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form-group {
    flex: 1;
    margin-right: 10px;
}

.form-group:last-child {
    margin-right: 0;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
}

input,
select,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #007bff;
    outline: none;
}

textarea {
    resize: vertical;
    height: 100px;
}

.form-controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.submit-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-left: 10px;
    transition: background-color 0.3s;
}

.submit-button {
    background-color: #28a745;
    color: white;
}

.submit-button:hover {
    background-color: #218838;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
}

.cancel-button:hover {
    background-color: #c82333;
}

.button-container {
    display: flex;
    gap: 10px;
}

.button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s;
}

.button.edit {
    background-color: #007bff;
    color: white;
}

.button.edit:hover {
    background-color: #0056b3;
}

.button.map {
    background-color: #17a2b8;
    color: white;
}

.button.map:hover {
    background-color: #138496;
}

.map {
    width: 100%;
    height: 400px;
    margin-top: 20px;
    border-radius: 8px;
}
</style>
