<template>
<div class="municipio-management-container">
    <Navbar /> <!-- Adicionando o componente Navbar -->
    <div class="municipio-management">
        <h2 class="title">Gerenciamento de Municípios</h2>
        <div class="filter-container">
            <label for="uf-filter">Filtrar por UF:</label>
            <input id="uf-filter" v-model="filters.uf" type="text" placeholder="Digite UF">

            <label for="nome-filter">Filtrar por Nome:</label>
            <input id="nome-filter" v-model="filters.nome" type="text" placeholder="Digite Nome">

            <button @click="applyFilters" class="apply-filter-button">Aplicar Filtros</button>
        </div>
        <div class="button-container">
            <button @click="createMunicipio" class="create-button">Cadastrar Novo Município</button>
        </div>
        <div class="municipio-table-container">
            <table class="municipio-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>IBGE</th>
                        <th>UF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="municipio in municipios" :key="municipio.id">
                        <td>{{ municipio.id }}</td>
                        <td>{{ municipio.nome }}</td>
                        <td>{{ municipio.ibge }}</td>
                        <td>{{ municipio.uf }}</td>
                        <td>
                            <button @click="editMunicipio(municipio.id)" class="edit-button">Editar</button>
                            <button @click="confirmDelete(municipio.id)" class="delete-button">Excluir</button>
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
            <p>Tem certeza que deseja excluir este município?</p>
            <button @click="deleteMunicipio(currentMunicipioId)" class="confirm-button">Sim</button>
            <button @click="cancelDelete" class="cancel-button">Não</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/NavBar.vue'; // Importando o componente Navbar

export default {
    name: 'MunicipioManagement',
    components: {
        Navbar,
    },
    data() {
        return {
            municipios: [],
            showConfirmation: false,
            currentMunicipioId: null,
            currentPage: 1,
            hasMore: false,
            filters: {
                uf: '',
                nome: ''
            }
        };
    },
    methods: {
        async fetchMunicipios(page = 1) {
            try {
                const response = await axios.get('http://localhost:3000/municipio', {
                    params: {
                        page: page,
                        limit: 5,
                        uf: this.filters.uf,
                        nome: this.filters.nome
                    }
                });
                this.municipios = response.data.data;
                this.currentPage = response.data.pagination.page;
                this.hasMore = this.currentPage < response.data.pagination.totalPages;
            } catch (error) {
                console.error('Erro ao buscar municípios:', error);
            }
        },
        createMunicipio() {
            this.$router.push('/municipios/novo');
        },
        editMunicipio(municipioId) {
            this.$router.push(`/municipios/${municipioId}/editar`);
        },
        confirmDelete(municipioId) {
            this.currentMunicipioId = municipioId;
            this.showConfirmation = true;
        },
        async deleteMunicipio(municipioId) {
            try {
                await axios.delete(`http://localhost:3000/municipio/${municipioId}`);
                this.fetchMunicipios(this.currentPage);
                this.showConfirmation = false;
            } catch (error) {
                console.error('Erro ao excluir município:', error);
            }
        },
        cancelDelete() {
            this.showConfirmation = false;
            this.currentMunicipioId = null;
        },
        changePage(page) {
            if (page > 0 && page !== this.currentPage) {
                this.fetchMunicipios(page);
            }
        },
        applyFilters() {
            this.fetchMunicipios(1);
        }
    },
    mounted() {
        this.fetchMunicipios();
    }
}
</script>

<style scoped>
.municipio-management-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #f9f9f9;
}

.municipio-management {
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
}

.filter-container label {
    margin-right: 10px;
}

.filter-container input {
    padding: 8px;
    margin-right: 10px;
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

.municipio-table-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.municipio-table {
    width: 90%;
    max-width: 1200px;
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
}

.municipio-table th,
.municipio-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.municipio-table th {
    background-color: #f2f2f2;
}

.municipio-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.municipio-table tr:hover {
    background-color: #f1f1f1;
}

.edit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #c82333;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.pagination-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.pagination-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

.pagination-button:not(:disabled) {
    background-color: #007bff;
    color: white;
}

.pagination-button:not(:disabled):hover {
    background-color: #0056b3;
}

.confirmation-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1000;
}

.confirmation-popup p {
    margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.confirm-button {
    background-color: #28a745;
    color: white;
}

.confirm-button:hover {
    background-color: #218838;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
}

.cancel-button:hover {
    background-color: #c82333;
}
</style>
