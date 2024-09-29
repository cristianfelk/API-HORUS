<template>
<div>
    <Navbar />

    <div class="denuncia-management-container">
        <h1 class="title">Monitoramento de Denúncias</h1>
        <p class="subtitle">Acompanhe todas as denúncias registradas e seus detalhes.</p>

        <div v-if="denuncias && denuncias.length" class="denuncia-list">
            <h2>Lista de Denúncias</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Denunciante</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Município</th>
                        <th>Endereço</th>
                        <th>Descrição</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="denuncia in denuncias" :key="denuncia.id">
                        <td>{{ denuncia.id }}</td>
                        <td v-if="!denuncia.anonima">{{ denuncia.nome_denunciante }}</td>
                        <td v-else>Anônima</td>
                        <td>{{ denuncia.email_denunciante }}</td>
                        <td>{{ denuncia.telefone_denunciante }}</td>
                        <td>{{ denuncia.id_municipio }}</td>
                        <td>{{ denuncia.id_logradouro }}</td>
                        <td>{{ denuncia.descricao_denuncia }}</td>
                        <td>{{ denuncia.id_status || 'Pendente' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-else class="loading-message">
            <p>Carregando denúncias...</p>
        </div>
    </div>
</div>
</template>

  
<script>
import Navbar from "@/components/NavBarHome.vue";
import {
    getDenuncia
} from "../services/apiService";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            denuncias: [],
            errorMessage: "",
        };
    },
    async created() {
        await this.fetchDenuncias();
    },
    methods: {
        async fetchDenuncias() {
            try {
                const response = await getDenuncia();
                this.denuncias = response.data;
                this.errorMessage = "";
            } catch (error) {
                this.errorMessage = "Erro ao buscar as denúncias.";
                console.error("Erro ao buscar as denúncias:", error);
            }
        },
    },
};
</script>

  
<style scoped>
.denuncia-management-container {
    max-width: 1200px;
    margin: 80px auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 30px;
}

.denuncia-list {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table th,
table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
}

table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.loading-message,
.error-message {
    text-align: center;
    font-size: 1.2rem;
    color: #ff4d4d;
}
</style>
