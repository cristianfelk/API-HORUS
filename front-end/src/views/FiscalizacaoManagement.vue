<template>
<div class="fiscalizacao-management-container">
    <Navbar />
    <div class="fiscalizacao-management">
        <h2 class="title">Gerenciamento de Fiscalizações</h2>

        <div>
            <ul class="tabs">
                <li :class="{ active: activeTab === 'novo' }" @click="setTab('novo')">Novo</li>
                <li :class="{ active: activeTab === 'andamento' }" @click="setTab('andamento')">Em Andamento</li>
                <li :class="{ active: activeTab === 'finalizado' }" @click="setTab('finalizado')">Finalizado</li>
            </ul>
        </div>

        <div v-if="activeTab === 'novo'">
            <div class="fiscalizacao-grid">
                <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesNovas" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                    <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                    <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                    <p><strong>Usuário:</strong> {{ fiscalizacao.usuario_id }}</p>
                    <p><strong>Hora Entrada:</strong> {{ fiscalizacao.format_data }}</p>
                    <div class="card-actions">
                        <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                        <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'andamento'">
            <div class="fiscalizacao-grid">
                <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesAndamento" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                    <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                    <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                    <p><strong>Usuário:</strong> {{ fiscalizacao.usuario_id }}</p>
                    <p><strong>Hora Entrada:</strong> {{ fiscalizacao.format_data }}</p>
                    <div class="card-actions">
                        <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                        <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'finalizado'">
            <div class="fiscalizacao-grid">
                <div class="fiscalizacao-card" v-for="fiscalizacao in fiscalizacoesFinalizadas" :key="fiscalizacao.id" @click="openFiscalizacaoDetails(fiscalizacao)">
                    <h3>{{ fiscalizacao.logradouro_fiscalizacao + ' - ' + fiscalizacao.numero }}</h3>
                    <p><strong>Complemento:</strong> {{ fiscalizacao.complemento }}</p>
                    <p><strong>Usuário:</strong> {{ fiscalizacao.usuario_id }}</p>
                    <p><strong>Hora Entrada:</strong> {{ fiscalizacao.format_data }}</p>
                    <div class="card-actions">
                        <button @click.stop="editFiscalizacao(fiscalizacao.id)" class="edit-button">Editar</button>
                        <button @click.stop="confirmDelete(fiscalizacao.id)" class="delete-button">Excluir</button>
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
            pageSize: 9,
            activeTab: 'novo'
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
        },

        setTab(tab) {
            this.activeTab = tab;
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
    text-align: center;
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
}

.tabs {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.tabs li {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-bottom: none;
    margin-right: 5px;
    background-color: #f1f1f1;
    transition: background-color 0.3s ease;
}

.tabs li.active {
    background-color: #007bff;
    color: #fff;
}

.tabs li:hover {
    background-color: #e0e0e0;
}

.card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    height: calc(2 * 350px + 20px);
    overflow-y: auto;
}

.fiscalizacao-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    height: calc(2 * 350px + 20px);
    overflow-y: auto;
}

.fiscalizacao-card {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 350px;
}

.tabs {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.tabs li {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-bottom: none;
    margin-right: 5px;
    background-color: #f1f1f1;
    transition: background-color 0.3s ease;
}

.tabs li.active {
    background-color: #007bff;
    color: #fff;
}

.tabs li:hover {
    background-color: #e0e0e0;
}

.fiscalizacao-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
}

.fiscalizacao-card p {
    margin: 5px 0;
    color: #555;
}

.card-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.edit-button,
.delete-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.delete-button {
    background-color: #dc3545;
}

.edit-button:hover,
.delete-button:hover {
    opacity: 0.9;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 4px;
}

.pagination-button[disabled] {
    background-color: #ddd;
    cursor: not-allowed;
}

.fiscalizacao-details-modal,
.confirmation-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.close-button,
.confirm-button,
.cancel-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    margin-top: 20px;
    border-radius: 4px;
}

.cancel-button {
    background-color: #dc3545;
}
</style>
