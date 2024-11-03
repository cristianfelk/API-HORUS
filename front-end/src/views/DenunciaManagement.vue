<template>
<div class="denuncia-management-container">
    <Navbar />

    <div class="denuncia-management">
        <h1 class="title">Monitoramento de Denúncias</h1>

        <div class="filter-container">
            <p>Pesquisar por:</p>
            <select v-model="filtroSelecionado" @change="aplicarFiltro">
                <option value="">Selecionar filtro</option>
                <option value="nome_denunciante">Nome</option>
                <option value="email_denunciante">Email</option>
                <option value="chave_denuncia">Chave da Denúncia</option>
                <option value="logradouro">Logradouro</option>
            </select>
            <input v-model="filtroValor" @input="aplicarFiltro" placeholder="Digite o valor do filtro" />
        </div>

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
                        <tr v-for="denuncia in denunciasFiltradas" :key="denuncia.id">
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
                            <td>{{ denuncia.status }}</td>
                            <td class="icons">
                                <img src="https://img.icons8.com/?size=100&id=71201&format=png&color=000000" @click="editDenuncia(denuncia)" alt="Editar" class="action-icon" />
                                <img src="https://img.icons8.com/?size=100&id=7891&format=png&color=000000" @click="verNoMapa(denuncia)" alt="Ver no mapa" class="action-icon" />
                                <img src="https://img.icons8.com/?size=100&id=68826&format=png&color=000000" @click="verImagem(denuncia.image_url)" alt="Visualizar Imagem" class="action-icon" />
                                <img src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000" @click="confirmDelete(denuncia.id)" alt="Deletar denuncia" class="action-icon" />
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
                        <select id="status" v-model="selectedDenuncia.status" required>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Não confirmado">Não confirmado</option>
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

        <div v-if="isImageVisible" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeImageModal">&times;</span>
                <h2>Imagem denúncia</h2>
                <img :src="currentImageUrl" alt="Imagem da Denúncia" class="image-preview" />
            </div>
        </div>
        <div v-if="showConfirmation" class="confirmation-popup">
            <div class="modal-content">
                <p>Você tem certeza que deseja excluir esta de denuncia?</p>
                <button @click="deleteDenuncia(currentDenunciaId)" class="confirm-button">Confirmar</button>
                <button @click="cancelDelete" class="cancel-button">Cancelar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import {
    getDenuncia,
    updateDenuncia,
    deleteDenuncia
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
            isImageVisible: false,
            currentImageUrl: null,
            selectedDenuncia: null,
            map: null,
            currentPage: 1,
            itemsPerPage: 5,
            totalPages: 1,
            filtroSelecionado: '',
            filtroValor: '',
            currentDenunciaId: null,
            showConfirmation: false,
        };
    },
    computed: {
        denunciasFiltradas() {
            if (!this.filtroSelecionado || !this.filtroValor) {
                return this.denuncias;
            }
            return this.denuncias.filter(denuncia =>
                denuncia[this.filtroSelecionado] ?.toLowerCase()
                .includes(this.filtroValor.toLowerCase())
            );
        },
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
        aplicarFiltro() {},
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
        confirmDelete(denunciaId) {
            this.currentDenunciaId = denunciaId;
            this.showConfirmation = true;
        },
        async deleteDenuncia(denunciaId) {
            try {
                await deleteDenuncia(denunciaId);
                this.fetchDenuncias();
                this.showConfirmation = false;
            } catch (error) {
                console.error('Erro ao excluir denuncia:', error);
            }
        },
        cancelDelete() {
            this.showConfirmation = false;
            this.currentDenunciaId = null;
        },
        verImagem(imageNome) {
            this.currentImageUrl = `http://localhost:3000/files/${imageNome}`;
            this.isImageVisible = true;
        },
        initMap(lat, lon) {
            this.map = L.map("map").setView([lat, lon], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(this.map);
            L.marker([lat, lon]).addTo(this.map);
        },
        updateMap(lat, lon) {
            this.map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(this.map);
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
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.fetchDenuncias(page);
        },
        closeMapModal() {
            this.isMapVisible = false;
            this.map = null;
        },
        closeModal() {
            this.isEditing = false;
            this.selectedDenuncia = null;
        },
        closeImageModal() {
            this.isImageVisible = false;
            this.currentImageUrl = "";
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
    background-color: #f0f4f8;
    min-height: 100vh;
}

.denuncia-management {
    width: 100%;
    max-width: 1400px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 2px 0;
}

.image-preview {
    max-width: 100%;
    height: auto;
}

.title {
    font-size: 2.2rem;
    margin-bottom: 20px;
    color: #444;
    font-weight: bold;
    text-align: center;
}

.filter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #e8f0fe;
    border-radius: 8px;
    margin-bottom: 25px;
}

.filter-container p {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
    font-weight: 500;
}

.filter-container select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 180px;
    margin-right: 25%;
}

.filter-container input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 250px;
    margin-right: 21%;
}

.filter-container select:focus,
.filter-container input:focus {
    border-color: #007bff;
    outline: none;
}

.denuncia-list {
    width: 100%;
    margin-bottom: 30px;
}

.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
}

th,
td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #69c369;
    color: white;
    font-weight: 600;
}

tr:hover {
    background-color: #f5f5f5;
}

.icons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.action-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 10px;
}

.icons .action-icon:last-child {
    margin-right: 0;
}

.confirmation-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.confirmation-popup p {
    margin-bottom: 20px;
    color: rgb(0, 0, 0);
}

.action-button {
    padding: 8px 12px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    background-color: #7a93ae;
    color: white;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #8698ac;
}

.pagination-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination-button {
    padding: 8px 12px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination-button:hover:enabled {
    background-color: #0056b3;
}

.error-message,
.loading-message {
    text-align: center;
    font-size: 1.2rem;
    color: #dc3545;
    padding: 20px;
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
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    position: relative;
}

.close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
}

.close:hover {
    color: #333;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input,
select,
textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #007bff;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

.form-controls {
    display: flex;
    justify-content: flex-end;
}

.submit-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
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
    margin-left: 10px;
}

.cancel-button:hover {
    background-color: #c82333;
}

.map {
    width: 100%;
    height: 400px;
    margin-top: 20px;
    border-radius: 8px;
}
</style>
