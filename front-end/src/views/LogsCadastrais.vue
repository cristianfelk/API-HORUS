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

        <!-- Tabela de logs dinâmica -->
        <table v-if="logs.length">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>Tabela</th>
                    <th>Usuário</th>
                    <!-- Renderiza colunas específicas com base no tipo de log -->
                    <template v-if="selectedLogType === 'monitoramento'">
                        <th>Casos Ativos (Antigos)</th>
                        <th>Casos Mortes (Antigos)</th>
                        <th>Casos Confirmados (Antigos)</th>
                        <th>Casos Monitorados (Antigos)</th>
                        <th>Casos Ativos (Novos)</th>
                        <th>Casos Mortes (Novos)</th>
                        <th>Casos Confirmados (Novos)</th>
                        <th>Casos Monitorados (Novos)</th>
                    </template>
                    <template v-else-if="selectedLogType === 'denuncia'">
                        <th>Anônima (Antigos)</th>
                        <th>Latitude (Antigos)</th>
                        <th>Longitude (Antigos)</th>
                        <th>Confirmado (Antigos)</th>
                        <th>Logradouro (Antigos)</th>
                        <th>Descrição (Antigos)</th>
                        <th>Anônima (Novos)</th>
                        <th>Latitude (Novos)</th>
                        <th>Longitude (Novos)</th>
                        <th>Confirmado (Novos)</th>
                        <th>Logradouro (Novos)</th>
                        <th>Descrição (Novos)</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logs" :key="log.id">
                    <td>{{ log.acao }}</td>
                    <td>{{ log.tabela }}</td>
                    <td>{{ log.usuario_acao }}</td>
                    <!-- Exibe dados do log de monitoramento -->
                    <template v-if="selectedLogType === 'monitoramento'">
                        <td>{{ log.old_casos_ativos }}</td>
                        <td>{{ log.old_casos_mortes }}</td>
                        <td>{{ log.old_casos_confirmados }}</td>
                        <td>{{ log.old_casos_monitorados }}</td>
                        <td>{{ log.new_casos_ativos }}</td>
                        <td>{{ log.new_casos_mortes }}</td>
                        <td>{{ log.new_casos_confirmados }}</td>
                        <td>{{ log.new_casos_monitorados }}</td>
                    </template>
                    <!-- Exibe dados do log de denúncia -->
                    <template v-else-if="selectedLogType === 'denuncia'">
                        <td>{{ log.old_anonima }}</td>
                        <td>{{ log.old_latitude }}</td>
                        <td>{{ log.old_longitude }}</td>
                        <td>{{ log.old_confirmado }}</td>
                        <td>{{ log.old_logradouro }}</td>
                        <td>{{ log.old_descricao_denuncia }}</td>
                        <td>{{ log.new_anonima }}</td>
                        <td>{{ log.new_latitude }}</td>
                        <td>{{ log.new_longitude }}</td>
                        <td>{{ log.new_confirmado }}</td>
                        <td>{{ log.new_logradouro }}</td>
                        <td>{{ log.new_descricao_denuncia }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
        <p v-else>Nenhum log encontrado.</p>
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
            selectedLogType: 'monitoramento', // Tipo de log padrão
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

pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
