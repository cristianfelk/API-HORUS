<template>
<div class="edit-fiscalizacao-container">
    <Navbar />
    <div v-if="loading" class="loading-message">Carregando dados da fiscalização...</div>
    <div v-else class="edit-fiscalizacao">
        <h2>Editar Fiscalização</h2>
        <form @submit.prevent="patchFiscalizacao">
            <div class="form-row">
                <div class="form-group">
                    <label for="logradouro">Logradouro:</label>
                    <input v-model="fiscalizacao.logradouro_fiscalizacao" id="logradouro" type="text" placeholder="Logradouro" />
                </div>
                <div class="form-group">
                    <label for="numero">Número:</label>
                    <input v-model="fiscalizacao.numero" id="numero" type="text" placeholder="Número" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="complemento">Complemento:</label>
                    <input v-model="fiscalizacao.complemento" id="complemento" type="text" placeholder="Complemento" />
                </div>
                <div class="form-group">
                    <label for="quarteirao">Quarteirão:</label>
                    <input v-model="fiscalizacao.quarteirao" id="quarteirao" type="text" placeholder="Quarteirão" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="sequencia">Sequência:</label>
                    <input v-model="fiscalizacao.sequencia" id="sequencia" type="text" placeholder="Sequência" />
                </div>
                <div class="form-group">
                    <label for="visita">Tipo Imóvel:</label>
                    <select v-model="fiscalizacao.tipo_imovel" id="visita">
                        <option value="R">Residencial</option>
                        <option value="c">Comercial</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="hora_entrada">Hora de Entrada:</label>
                    <input v-model="fiscalizacao.hora_entrada" id="hora_entrada" type="datetime-local" />
                </div>
                <div class="form-group">
                    <label for="visita">Visita:</label>
                    <select v-model="fiscalizacao.visita" id="visita">
                        <option value="S">Sim</option>
                        <option value="N">Não</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="tipo_imovel">Pendência:</label>
                    <input v-model="fiscalizacao.pendencia" id="tipo_imovel" type="text" placeholder="Tipo de Imóvel" />
                </div>
                <div class="form-group">
                    <label for="status">Status:</label>
                    <select v-model="fiscalizacao.status" id="status">
                        <option value="1">Novo</option>
                        <option value="2">Em andamento</option>
                        <option value="3">Finalizado</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="save-button">Salvar</button>
        </form>
    </div>
</div>
</template>

<script>
import {
    getFiscalizacaoById,
    updateFiscalizacao
} from '../services/apiService.js';
import Navbar from '../components/NavBar.vue';

export default {
    name: 'EditFiscalizacao',
    components: {
        Navbar,
    },
    data() {
        return {
            fiscalizacao: {},
            loading: true,
        };
    },
    methods: {
        async fetchFiscalizacao() {
            const fiscalizacaoId = this.$route.params.id;
            try {
                const response = await getFiscalizacaoById(fiscalizacaoId);
                this.fiscalizacao = response.data[0];
            } catch (error) {
                alert('Erro ao carregar dados da fiscalização.');
            } finally {
                this.loading = false;
            }
        },
        async patchFiscalizacao() {
            const fiscalizacaoId = this.$route.params.id;
            try {
                const updatedFiscalizacao = {
                    quarteirao: this.fiscalizacao.quarteirao || null,
                    sequencia: this.fiscalizacao.sequencia || null,
                    logradouro_fiscalizacao: this.fiscalizacao.logradouro_fiscalizacao || null,
                    numero: this.fiscalizacao.numero || null,
                    complemento: this.fiscalizacao.complemento || null,
                    tipo_imovel: this.fiscalizacao.tipo_imovel || null,
                    hora_entrada: this.fiscalizacao.hora_entrada || null,
                    visita: this.fiscalizacao.visita || null,
                    pendencia: this.fiscalizacao.pendencia || null,
                    status: this.fiscalizacao.status || null,
                };

                await updateFiscalizacao(fiscalizacaoId, updatedFiscalizacao);
                alert('Fiscalização atualizada com sucesso');
                this.$router.push('/fiscalizacoes');
            } catch (error) {
                console.error('Erro ao atualizar fiscalização:', error);
                alert('Erro ao atualizar a fiscalização');
            }
        }
    },
    mounted() {
        this.fetchFiscalizacao();
    },
};
</script>

<style scoped>
.edit-fiscalizacao-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    margin-top: 60px;
}

.loading-message {
    margin-top: 100px;
    font-size: 18px;
    color: #555;
    text-align: center;
}

.edit-fiscalizacao {
    padding: 20px;
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.form-group {
    flex: 1;
    margin-right: 10px;
}

.form-group:last-child {
    margin-right: 0;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.save-button {
    margin-top: 20px;
    padding: 12px 15px;
    background-color: #69c369;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.save-button:hover {
    background-color: #5dad5d;
}
</style>
