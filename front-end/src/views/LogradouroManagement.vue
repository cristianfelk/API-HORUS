<template>
<div class="logradouro-management-container">
    <Navbar />
    <div class="logradouro-management">
        <h2 class="title">Gerenciamento de Logradouros</h2>
        <div class="filter-container">
            <label for="cep-filter">Filtrar por CEP:</label>
            <input id="cep-filter" v-model="filters.cep" type="text" placeholder="Digite o CEP" />

            <label for="bairro-filter">Filtrar por Bairro:</label>
            <input id="bairro-filter" v-model="filters.bairro" type="text" placeholder="Digite o bairro" />

            <button @click="applyFilters" class="apply-filter-button">Aplicar Filtros</button>
        </div>
        <div class="button-container">
            <button @click="openModal" class="create-button">Cadastrar Novo Logradouro</button>
        </div>
        <div class="logradouro-table-container">
            <table class="logradouro-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cep</th>
                        <th>Logradouro</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="logradouro in logradouros" :key="logradouro.id">
                        <td>{{ logradouro.id }}</td>
                        <td>{{ logradouro.cep }}</td>
                        <td>{{ logradouro.logradouro }}</td>
                        <td>{{ logradouro.complemento }}</td>
                        <td>{{ logradouro.bairro }}</td>
                        <td>
                            <button @click="editLogradouro(logradouro.id)" class="edit-button">Editar</button>
                            <button @click="confirmDelete(logradouro.id)" class="delete-button">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="pagination-button">Anterior</button>
            <span>Página {{ currentPage }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="!hasMore" class="pagination-button">Próximo</button>
        </div>
        <div v-if="showConfirmation" class="confirmation-popup">
            <p>Tem certeza que deseja excluir este logradouro?</p>
            <button @click="deleteLogradouro(currentLogradouroId)" class="confirm-button">Sim</button>
            <button @click="cancelDelete" class="cancel-button">Não</button>
        </div>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h3>Cadastrar Novo Logradouro</h3>
                <form @submit.prevent="saveLogradouro">
                    <div class="form-group municipio-group">
                        <label for="municipio">Município:</label>
                        <input type="text" id="municipio" v-model="municipioSearch" @input="searchMunicipio" placeholder="Digite o nome do município" required />
                        <ul v-if="municipioSuggestions.length" class="suggestions-list">
                            <li v-for="municipio in municipioSuggestions" :key="municipio.id" @click="selectMunicipio(municipio)" class="suggestion-item">
                                {{ municipio.nome }}
                            </li>
                        </ul>
                    </div>

                    <div class="modal-input-group">
                        <label for="cep">CEP:</label>
                        <input type="text" v-model="newLogradouro.cep" id="cep" placeholder="Digite o CEP" required>
                    </div>

                    <div class="modal-input-group">
                        <label for="logradouro">Logradouro:</label>
                        <input type="text" v-model="newLogradouro.logradouro" id="logradouro" placeholder="Digite o logradouro" required>
                    </div>

                    <div class="modal-input-group">
                        <label for="complemento">Complemento:</label>
                        <input type="text" v-model="newLogradouro.complemento" id="complemento" placeholder="Digite o complemento">
                    </div>

                    <div class="modal-input-group">
                        <label for="bairro">Bairro:</label>
                        <input type="text" v-model="newLogradouro.bairro" id="bairro" placeholder="Digite o bairro" required>
                    </div>

                    <div class="modal-buttons">
                        <button type="submit" class="save-button">Salvar</button>
                        <button @click="closeModal" type="button" class="cancel-button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/NavBar.vue';
import {
    searchMunicipioByNome
} from "../services/apiService";

export default {
    name: 'LogradouroManagement',
    components: {
        Navbar,
    },
    data() {
        return {
            logradouros: [],
            showConfirmation: false,
            currentLogradouroId: null,
            currentPage: 1,
            hasMore: false,
            filters: {
                cep: '',
                bairro: ''
            },
            showModal: false,
            newLogradouro: {
                municipio_id: '',
                cep: '',
                logradouro: '',
                complemento: '',
                bairro: ''
            },
            municipioSearch: "",
            municipioSuggestions: []
        };
    },
    methods: {
        async fetchLogradouros(page = 1) {
            try {
                const response = await axios.get('http://localhost:3000/logradouro', {
                    params: {
                        page: page,
                        limit: 8,
                        cep: this.filters.cep,
                        bairro: this.filters.bairro
                    }
                });
                this.logradouros = response.data.data;
                this.currentPage = response.data.pagination.page;
                this.hasMore = this.currentPage < response.data.pagination.totalPages;
            } catch (error) {
                console.error('Erro ao buscar logradouros:', error);
            }
        },
        closeModal() {
            this.showModal = false;
            this.resetNewLogradouro();
        },
        async searchMunicipio() {
            if (this.municipioSearch.length > 2) {
                const response = await searchMunicipioByNome(this.municipioSearch);
                this.municipioSuggestions = response.data;
            }
        },
        selectMunicipio(municipio) {
            this.newLogradouro.municipio_id = municipio.id;
            this.municipioSearch = municipio.nome;
            this.municipioSuggestions = [];
        },
        async saveLogradouro() {
            try {
                await axios.post('http://localhost:3000/logradouro', this.newLogradouro);
                this.fetchLogradouros(this.currentPage);
                this.closeModal();
            } catch (error) {
                console.error('Erro ao cadastrar logradouro:', error);
            }
        },
        resetNewLogradouro() {
            this.newLogradouro = {
                municipio_id: '',
                cep: '',
                logradouro: '',
                complemento: '',
                bairro: ''
            };
        },
        openModal() {
            this.showModal = true; // Abre o modal
        },
        editLogradouro(logradouroId) {
            this.$router.push(`/logradouros/${logradouroId}/editar`);
        },
        confirmDelete(logradouroId) {
            this.currentLogradouroId = logradouroId;
            this.showConfirmation = true;
        },
        async deleteLogradouro(logradouroId) {
            try {
                await axios.delete(`http://localhost:3000/logradouro/${logradouroId}`);
                this.fetchLogradouros(this.currentPage);
                this.showConfirmation = false;
            } catch (error) {
                console.error('Erro ao excluir logradouro:', error);
            }
        },
        cancelDelete() {
            this.showConfirmation = false;
            this.currentLogradouroId = null;
        },
        changePage(page) {
            if (page > 0 && page !== this.currentPage) {
                this.fetchLogradouros(page);
            }
        },
        applyFilters() {
            this.fetchLogradouros(1);
        }
    },
    mounted() {
        this.fetchLogradouros();
    }
}
</script>

<style scoped>
.logradouro-management-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #f9f9f9;
}

.logradouro-management {
    padding: 80px 20px 20px 20px;
    margin-left: 0;
    margin-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.filter-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.filter-container label {
    margin-right: 10px;
}

.filter-container input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.apply-filter-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
}

.apply-filter-button:hover {
    background-color: #0056b3;
}

.button-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.create-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    background-color: #28a745;
    color: white;
}

.create-button:hover {
    background-color: #218838;
}

.logradouro-table-container {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow-x: auto;
}

.logradouro-table {
    width: 100%;
    border-collapse: collapse;
}

.logradouro-table th,
.logradouro-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.logradouro-table th {
    background-color: #f2f2f2;
}

.logradouro-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.logradouro-table tr:hover {
    background-color: #f1f1f1;
}

.edit-button,
.delete-button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.edit-button {
    background-color: #007bff;
    color: white;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}

.confirmation-popup {
    width: 80%;
    max-width: 400px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-input-group {
    margin-bottom: 15px;
}

.modal-input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.modal-input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.save-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.save-button:hover {
    background-color: #218838;
}

.cancel-button {
    padding: 10px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cancel-button:hover {
    background-color: #c82333;
}

@media (max-width: 768px) {
    .filter-container {
        flex-direction: column;
        width: 100%;
    }

    .logradouro-table th,
    .logradouro-table td {
        display: block;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .logradouro-table tr {
        display: block;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .logradouro-table th {
        display: none;
    }

    .logradouro-table td {
        position: relative;
        padding-left: 50%;
    }

    .logradouro-table td::before {
        position: absolute;
        top: 10px;
        left: 10px;
        width: calc(50% - 20px);
        padding-right: 10px;
        white-space: nowrap;
        font-weight: bold;
    }

    .logradouro-table td:nth-of-type(1)::before {
        content: "Id";
    }

    .logradouro-table td:nth-of-type(2)::before {
        content: "Cep";
    }

    .logradouro-table td:nth-of-type(3)::before {
        content: "Logradouro";
    }

    .logradouro-table td:nth-of-type(4)::before {
        content: "Complemento";
    }

    .logradouro-table td:nth-of-type(5)::before {
        content: "Bairro";
    }

    .logradouro-table td:nth-of-type(6)::before {
        content: "Ações";
    }
}
</style>
