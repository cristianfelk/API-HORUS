<template>
<div class="dashboard-container">
    <Navbar />
    <SideBar :isSidebarCollapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
    <div :class="['content', { 'content-expanded': isSidebarCollapsed }]">
        <div class="dashboard-content">
            <div class="content-wrapper">
                <div class="card">
                    <div class="card-header">
                        <h3>Registrar nova fiscalização</h3>
                    </div>
                    <div class="card-body">
                        <button @click="registrarFiscalizacao" class="register-button">Registrar +</button>
                    </div>
                </div>
                <div class="card ultimas-fiscalizacoes">
                    <div class="card-header">
                        <h3>Últimas Fiscalizações</h3>
                    </div>
                    <div class="card-body">
                        <div class="fiscalizacao-cards">
                            <div v-for="fiscalizacao in ultimasFiscalizacoes" :key="fiscalizacao.id" class="fiscalizacao-card">
                                <h4>{{ fiscalizacao.descricao }}</h4>
                                <p><strong>Logradouro:</strong> {{ fiscalizacao.logradouro_fiscalizacao }}</p>
                                <p><strong>Data e Hora:</strong> {{ fiscalizacao.hora_entrada }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="dashboard-content">
            <div class="content-wrapper">
                <div class="card">
                    <div class="card-header">
                        <h3>Registrar nova denúncia</h3>
                    </div>
                    <div class="card-body">
                        <button @click="registrarDenuncia" class="register-button">Registrar +</button>
                    </div>
                </div>
                <div class="card ultimas-fiscalizacoes">
                    <div class="card-header">
                        <h3>Últimas Denúncias</h3>
                    </div>
                    <div class="card-body">
                        <div class="fiscalizacao-cards">
                            <div v-for="denuncias in ultimasDenuncias" :key="denuncias.id" class="fiscalizacao-card">
                                <p><strong>Municipio:</strong> {{ denuncias.id_municipio }}</p>
                                <p><strong>Descrição:</strong> {{ denuncias.descricao_denuncia }}</p>
                                <p><strong>Chave denncia:</strong> {{ denuncias.chave_denuncia }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/NavBar.vue';
import {
    getUltimasFiscalizacoes,
    getUltimasDenuncias
} from '../services/apiService';

export default {
    name: 'Dashboard',
    components: {
        Navbar,
        SideBar
    },
    data() {
        return {
            isSidebarCollapsed: false,
            ultimasFiscalizacoes: [],
            ultimasDenuncias: []
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        registrarFiscalizacao() {
            this.$router.push('/fiscalizacao/novo');
        },
        registrarDenuncia() {
            this.$router.push('/report');
        },
        async buscarUltimasFiscalizacoes() {
            try {
                const resposta = await getUltimasFiscalizacoes(3);
                this.ultimasFiscalizacoes = resposta.data;
            } catch (erro) {
                console.error('Erro ao buscar últimas fiscalizações:', erro);
            }
        },
        async buscarUltimasDenuncias() {
            try {
                const resposta = await getUltimasDenuncias(3);
                this.ultimasDenuncias = resposta.data;
            } catch (erro) {
                console.error('Erro ao buscar últimas denuncias:', erro);
            }
        }
    },
    created() {
        this.buscarUltimasFiscalizacoes();
        this.buscarUltimasDenuncias();
    }
}
</script>

<style scoped>
.dashboard-container {
    display: flex;
    height: 100vh;
    flex-direction: row;
    background-color: #F4F7FA;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 240px;
    margin-top: 10px;
    padding: 20px;
    transition: margin-left 0.3s ease;
}

.content-expanded {
    margin-left: 60px;
}

.dashboard-content {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 20px;
    flex: 1;
    min-width: 300px;
}

.card-header {
    margin-bottom: 15px;
}

.card-header h3 {
    margin: 0;
    font-size: 20px;
    color: #333;
}

.card-body {
    text-align: center;
}

.register-button {
    background-color: #69c369;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.register-button:hover {
    background-color: #5dad5d;
}

.ultimas-fiscalizacoes {
    margin-left: 20px;
}

.fiscalizacao-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.fiscalizacao-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(33.333% - 20px);
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .dashboard-container {
        flex-direction: column;
    }

    .content {
        margin-left: 0;
    }

    .content-expanded {
        margin-left: 0;
    }

    .content-wrapper {
        flex-direction: column;
    }

    .card {
        margin-bottom: 10px;
    }

    .ultimas-fiscalizacoes {
        margin-left: 0;
    }

    .fiscalizacao-card {
        flex: 1 1 100%;
    }
}
</style>
