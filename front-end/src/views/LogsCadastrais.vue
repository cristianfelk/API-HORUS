<template>
<div>
    <Navbar />
    <div class="logs-container">
        <h1>Logs Cadastrais</h1>

        <!-- Dropdown para selecionar o tipo de log -->
        <div class="log-selector">
            <label for="logType">Selecione o Tipo de Log:</label>
            <select id="logType" v-model="selectedLogType" @change="fetchLogs">
                <option value="monitoramento">Monitoramento</option>
                <option value="denuncia">Denúncia</option>
            </select>
        </div>

        <!-- Tabela de logs -->
        <table v-if="logs.length">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>Tabela</th>
                    <th>Usuário</th>
                    <th>Data do Log</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logs" :key="log.id">
                    <td>{{ log.acao }}</td>
                    <td>{{ log.tabela }}</td>
                    <td>{{ log.usuario_acao }}</td>
                    <td>{{ log.data_log }}</td>
                    <td>
                        <button @click="openModal(log)">Ver Log</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Nenhum log encontrado.</p>

        <!-- Modal para exibir os dados antigos e novos -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Detalhes do Log</h2>
                <div class="log-details">
                    <div class="log-column">
                        <h3>Dados Antigos</h3>
                        <template v-if="selectedLogType === 'monitoramento'">
                            <p><strong>Casos Ativos:</strong> {{ currentLog.old_casos_ativos }}</p>
                            <p><strong>Casos Mortes:</strong> {{ currentLog.old_casos_mortes }}</p>
                            <p><strong>Casos Confirmados:</strong> {{ currentLog.old_casos_confirmados }}</p>
                            <p><strong>Casos Monitorados:</strong> {{ currentLog.old_casos_monitorados }}</p>
                        </template>
                        <template v-else-if="selectedLogType === 'denuncia'">
                            <p><strong>Anônima:</strong> {{ currentLog.old_anonima }}</p>
                            <p><strong>Latitude:</strong> {{ currentLog.old_latitude }}</p>
                            <p><strong>Longitude:</strong> {{ currentLog.old_longitude }}</p>
                            <p><strong>Confirmado:</strong> {{ currentLog.old_confirmado }}</p>
                            <p><strong>Logradouro:</strong> {{ currentLog.old_logradouro }}</p>
                            <p><strong>Descrição:</strong> {{ currentLog.old_descricao_denuncia }}</p>
                        </template>
                    </div>
                    <div class="log-column">
                        <h3>Dados Novos</h3>
                        <template v-if="selectedLogType === 'monitoramento'">
                            <p><strong>Casos Ativos:</strong> {{ currentLog.new_casos_ativos }}</p>
                            <p><strong>Casos Mortes:</strong> {{ currentLog.new_casos_mortes }}</p>
                            <p><strong>Casos Confirmados:</strong> {{ currentLog.new_casos_confirmados }}</p>
                            <p><strong>Casos Monitorados:</strong> {{ currentLog.new_casos_monitorados }}</p>
                        </template>
                        <template v-else-if="selectedLogType === 'denuncia'">
                            <p><strong>Anônima:</strong> {{ currentLog.new_anonima }}</p>
                            <p><strong>Latitude:</strong> {{ currentLog.new_latitude }}</p>
                            <p><strong>Longitude:</strong> {{ currentLog.new_longitude }}</p>
                            <p><strong>Confirmado:</strong> {{ currentLog.new_confirmado }}</p>
                            <p><strong>Logradouro:</strong> {{ currentLog.new_logradouro }}</p>
                            <p><strong>Descrição:</strong> {{ currentLog.new_descricao_denuncia }}</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    getLogMonitoramento,
    getLogDenuncia
} from '../services/apiService';

export default {
    name: 'LogsCadastrais',
    components: {
        Navbar,
    },
    data() {
        return {
            logs: [],
            selectedLogType: 'monitoramento',
            showModal: false,
            currentLog: null,
        };
    },
    created() {
        this.fetchLogs();
    },
    methods: {
        async fetchLogs() {
            try {
                let response;
                if (this.selectedLogType === 'monitoramento') {
                    response = await getLogMonitoramento();
                } else if (this.selectedLogType === 'denuncia') {
                    response = await getLogDenuncia();
                }
                this.logs = response.data;
            } catch (error) {
                console.error('Erro ao buscar logs:', error);
            }
        },
        openModal(log) {
            this.currentLog = log;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.currentLog = null;
        },
    },
};
</script>

<style scoped>
.logs-container {
    padding: 20px;
}

.log-selector {
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f4f4f4;
}

button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 70%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
}

.close {
    align-self: flex-end;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: red;
}

.log-details {
    display: flex;
    justify-content: space-between;
}

.log-column {
    width: 48%;
}

.log-column h3 {
    margin-bottom: 10px;
}
</style>
