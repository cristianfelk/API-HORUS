<template>
<div class="logradouro-management-container">
    <Navbar />
    <div class="logradouro-management">
        <h2 class="title">Gerenciamento de Logradouros</h2>
        <div class="filter-container">
            <label for="cep-filter">Filtrar por CEP:</label>
            <input id="cep-filter" v-model="filters.cep" type="text" placeholder="Digite o CEP">

            <label for="bairro-filter">Filtrar por Bairro:</label>
            <input id="bairro-filter" v-model="filters.bairro" type="text" placeholder="Digite o bairro">

            <button @click="applyFilters" class="apply-filter-button">Aplicar Filtros</button>
        </div>
        <div class="button-container">
            <button @click="createLogradouro" class="create-button">Cadastrar Novo Logradouro</button>
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
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/NavBar.vue';

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
                uf: '',
                nome: ''
            }
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
        createLogradouro() {
            this.$router.push('/logradouros/novo');
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
/* Estilos principais */

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
    margin-bottom: 20px;
    overflow-x: auto;
}

.logradouro-table {
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
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

/* Responsividade */
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
</style>
