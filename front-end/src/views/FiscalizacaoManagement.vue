<template>
<div class="fiscalizacao-management-container">
    <Navbar />
    <div class="fiscalizacao-management">
        <h2 class="title">Gerenciamento de Fiscalizações</h2>
        <div class="button-container">
            <button @click="generatePDF" class="generate-pdf-button">Gerar Relatório PDF</button>
        </div>
        <div class="fiscalizacao-table-container">
            <table class="fiscalizacao-table">
                <thead>
                    <tr>
                        <th>Logradouro</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="fiscalizacao in fiscalizacoes" :key="fiscalizacao.id">
                        <td>{{ fiscalizacao.logradouro_fiscalizacao }}</td>
                        <td>
                            <button @click="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                            <button @click="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showConfirmation" class="confirmation-popup">
            <p>Tem certeza que deseja excluir esta Fiscalização?</p>
            <button @click="deleteFiscalizacao(currentFiscalizacaoId)" class="confirm-button">Sim</button>
            <button @click="cancelDelete" class="cancel-button">Não</button>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    getFiscalizacao,
    deleteFiscalizacao
} from '../services/apiService.js';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            fiscalizacoes: [],
            showConfirmation: false,
            currentFiscalizacaoId: null,
        };
    },
    methods: {
        async fetchFiscalizacao() {
            try {
                const response = await getFiscalizacao();
                this.fiscalizacoes = response.data;
            } catch (error) {
                console.error('Erro ao buscar fiscalizações:', error);
            }
        },
        editFiscalizacao(fiscalizacaoId) {
            this.$router.push(`/fiscalizacoes/${fiscalizacaoId}/editar`);
        },
        confirmDelete(fiscalizacaoId) {
            this.currentFiscalizacaoId = fiscalizacaoId;
            this.showConfirmation = true;
        },
        async deleteFiscalizacao(fiscalizacaoId) {
            try {
                await deleteFiscalizacao(fiscalizacaoId);
                this.fetchFiscalizacao();
                this.showConfirmation = false;
            } catch (error) {
                console.error('Erro ao excluir fiscalização:', error);
            }
        },
        cancelDelete() {
            this.showConfirmation = false;
            this.currentFiscalizacaoId = null;
        },
        generatePDF() {
        }
    },
    mounted() {
        this.fetchFiscalizacao();
    }
}
</script>

<style scoped>
.fiscalizacao-management-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f9f9f9;
    padding: 0 20px;
}

.fiscalizacao-management {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.button-container {
    margin-bottom: 20px;
}

.generate-pdf-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    background-color: #007bff;
    color: white;
}

.generate-pdf-button:hover {
    background-color: #0056b3;
}

.fiscalizacao-table-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.fiscalizacao-table {
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fiscalizacao-table th,
.fiscalizacao-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.fiscalizacao-table th {
    background-color: #f2f2f2;
}

.fiscalizacao-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.fiscalizacao-table tr:hover {
    background-color: #f1f1f1;
}

.edit-button,
.delete-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.edit-button {
    background-color: #007bff;
    color: white;
}

.edit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.delete-button:hover {
    background-color: #c82333;
}

.confirmation-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.confirmation-popup p {
    margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
}

.cancel-button {
    background-color: #dc3545;
}

.confirm-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #c82333;
}
</style>
