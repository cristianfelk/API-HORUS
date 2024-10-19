<template>
<div class="fiscalizacao-management-container">
    <Navbar />
    <div class="fiscalizacao-management">
        <h2 class="title">Gerenciamento de Fiscalizações</h2>

        <div class="status-container">
            <div class="status-section novo">
                <h3 class="status-title">Novo</h3>
                <div class="fiscalizacao-grid">
                    <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesNovas" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                        <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                        <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                        <p><strong>Hora Entrada:</strong> {{ fiscalizacao.hora_entrada }}</p>
                        <div class="card-actions">
                            <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                            <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="status-section andamento">
                <h3 class="status-title">Em Andamento</h3>
                <div class="fiscalizacao-grid">
                    <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesAndamento" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                        <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                        <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                        <p><strong>Hora Entrada:</strong> {{ fiscalizacao.format_data }}</p>
                        <div class="card-actions">
                            <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                            <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="status-section finalizado">
                <h3 class="status-title">Finalizado</h3>
                <div class="fiscalizacao-grid">
                    <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesFinalizadas" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                        <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                        <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                        <p><strong>Hora Entrada:</strong> {{ fiscalizacao.hora_entrada }}</p>
                        <div class="card-actions">
                            <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                            <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pagination-container">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">Anterior</button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Próximo</button>
        </div>

        <div v-if="showDetails" class="fiscalizacao-details-modal">
            <div class="modal-content">
                <h3>Detalhes da Fiscalização</h3>
                <p><strong>Logradouro:</strong> {{ selectedFiscalizacao.logradouro_fiscalizacao }}</p>
                <p><strong>Número:</strong> {{ selectedFiscalizacao.numero }}</p>
                <p><strong>Complemento:</strong> {{ selectedFiscalizacao.complemento }}</p>
                <p><strong>Quarteirão:</strong> {{ selectedFiscalizacao.quarteirao }}</p>
                <p><strong>Sequência:</strong> {{ selectedFiscalizacao.sequencia }}</p>
                <p><strong>Tipo de Imóvel:</strong> {{ selectedFiscalizacao.tipo_imovel }}</p>
                <p><strong>Hora Entrada:</strong> {{ selectedFiscalizacao.format_data }}</p>
                <p><strong>Visita:</strong> {{ selectedFiscalizacao.visita }}</p>
                <p><strong>Pendência:</strong> {{ selectedFiscalizacao.pendencia }}</p>
                <p><strong>A1:</strong> {{ selectedFiscalizacao.a1 }}</p>
                <p><strong>A2:</strong> {{ selectedFiscalizacao.a2 }}</p>
                <p><strong>B:</strong> {{ selectedFiscalizacao.b }}</p>
                <p><strong>C:</strong> {{ selectedFiscalizacao.c }}</p>
                <p><strong>D1:</strong> {{ selectedFiscalizacao.d1 }}</p>
                <p><strong>D2:</strong> {{ selectedFiscalizacao.d2 }}</p>
                <p><strong>E:</strong> {{ selectedFiscalizacao.e }}</p>
                <p><strong>Eliminado:</strong> {{ selectedFiscalizacao.eliminado }}</p>
                <p><strong>Inicial:</strong> {{ selectedFiscalizacao.inicial }}</p>
                <p><strong>Final:</strong> {{ selectedFiscalizacao.final }}</p>
                <p><strong>Quantidade Tubitos:</strong> {{ selectedFiscalizacao.qtd_tubitos }}</p>
                <p><strong>IM Tratado:</strong> {{ selectedFiscalizacao.im_trat }}</p>
                <p><strong>Tipo Focal:</strong> {{ selectedFiscalizacao.tipo_focal }}</p>
                <p><strong>Quantidade Grama:</strong> {{ selectedFiscalizacao.qtd_grama }}</p>
                <p><strong>Quantidade Tratado:</strong> {{ selectedFiscalizacao.qtd_tratado }}</p>
                <p><strong>Tipo Perifocal:</strong> {{ selectedFiscalizacao.tipo_perifocal }}</p>
                <p><strong>Quantidade Gramas:</strong> {{ selectedFiscalizacao.qtd_gramas }}</p>
                <button @click="closeDetails" class="close-button">Fechar</button>
            </div>
        </div>

        <div v-if="showConfirmation" class="confirmation-popup">
            <div class="modal-content">
                <p>Você tem certeza que deseja excluir esta fiscalização?</p>
                <button @click="deleteFiscalizacao(currentFiscalizacaoId)" class="confirm-button">Confirmar</button>
                <button @click="cancelDelete" class="cancel-button">Cancelar</button>
            </div>
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
            fiscalizacoesNovas: [],
            fiscalizacoesAndamento: [],
            fiscalizacoesFinalizadas: [],
            showConfirmation: false,
            currentFiscalizacaoId: null,
            showDetails: false,
            selectedFiscalizacao: null,
            currentPage: 1,
            totalPages: 1,
            pageSize: 5
        };
    },
    methods: {
        async fetchFiscalizacao() {
            try {
                const response = await getFiscalizacao({
                    page: this.currentPage,
                    limit: this.pageSize
                });

                if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
                    this.fiscalizacoes = response.data.data;
                    if (response.data.pagination) {
                        this.totalPages = response.data.pagination.totalPages || 1;
                    } else {
                        this.totalPages = 1;
                    }
                    this.separarFiscalizacoes();
                } else {
                    console.error('Dados da resposta não encontrados:', response);
                }
            } catch (error) {
                console.error('Erro ao buscar fiscalizações:', error);
            }
        },

        separarFiscalizacoes() {
            this.fiscalizacoesNovas = this.fiscalizacoes.filter(f => f.status === 1);
            this.fiscalizacoesAndamento = this.fiscalizacoes.filter(f => f.status === 2);
            this.fiscalizacoesFinalizadas = this.fiscalizacoes.filter(f => f.status === 3);
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
        openFiscalizacaoDetails(fiscalizacao) {
            this.selectedFiscalizacao = fiscalizacao;
            this.showDetails = true;
        },
        closeDetails() {
            this.showDetails = false;
            this.selectedFiscalizacao = null;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchFiscalizacao();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fetchFiscalizacao();
            }
        }
    },
    mounted() {
        this.fetchFiscalizacao();
    }
};
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
    color: #333;
}

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
    padding-top: 80px;
}

.button-container {
    margin-bottom: 20px;
}

.status-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.status-section {
    flex: 1;
    min-width: 300px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-section h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
}

.fiscalizacao-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.fiscalizacao-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.fiscalizacao-card:hover {
    background-color: #f0f0f0;
}

.card-actions {
    display: flex;
    justify-content: space-between;
}

.edit-button,
.delete-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.edit-button {
    background-color: #28a745;
    color: white;
}

.edit-button:hover {
    background-color: #218838;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.delete-button:hover {
    background-color: #c82333;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.pagination-button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
    background-color: #007bff;
    color: white;
}

.pagination-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

.fiscalizacao-details-modal {
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

.modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    max-width: 500px;
    width: 100%;
}

.close-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-top: 20px;
}

.close-button:hover {
    background-color: #0056b3;
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

.confirm-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 10px;
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
