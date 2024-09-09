<template>
<div class="rel-fiscalizacoes">
    <Navbar />
    <h1>Relatório de Fiscalizações</h1>

    <div class="filters">
        <label for="quarteirao">Quarteirão:</label>
        <input type="text" v-model="filters.quarteirao" placeholder="Filtrar por Quarteirão" />

        <label for="sequencia">Sequência:</label>
        <input type="text" v-model="filters.sequencia" placeholder="Filtrar por Sequência" />

        <label for="logradouro">Logradouro:</label>
        <input type="text" v-model="filters.logradouro_fiscalizacao" placeholder="Filtrar por Logradouro" />

        <label for="tipoImovel">Tipo de Imóvel:</label>
        <input type="text" v-model="filters.tipo_imovel" placeholder="Filtrar por Tipo de Imóvel" />

        <button @click="clearFilters">Limpar Filtros</button>
    </div>

    <button @click="generatePDF">Gerar PDF</button>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
    getFiscalizacaoRel
} from '../services/apiService';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            fiscalizacoes: [],
            filters: {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                tipo_imovel: '',
            },
        };
    },
    computed: {
        filteredFiscalizacoes() {
            return this.fiscalizacoes.filter((fiscalizacao) => {
                return (
                    (this.filters.quarteirao === '' || fiscalizacao.quarteirao.includes(this.filters.quarteirao)) &&
                    (this.filters.sequencia === '' || fiscalizacao.sequencia.includes(this.filters.sequencia)) &&
                    (this.filters.logradouro_fiscalizacao === '' || fiscalizacao.logradouro_fiscalizacao.toLowerCase().includes(this.filters.logradouro_fiscalizacao.toLowerCase())) &&
                    (this.filters.tipo_imovel === '' || fiscalizacao.tipo_imovel.toLowerCase().includes(this.filters.tipo_imovel.toLowerCase()))
                );
            });
        },
    },
    methods: {
        async fetchFiscalizacoes() {
            try {
                const response = await getFiscalizacaoRel();
                this.fiscalizacoes = response.data;
            } catch (error) {
                console.error('Erro ao buscar fiscalizações:', error);
            }
        },
        generatePDF() {
            const doc = new jsPDF();
            doc.text('Relatório de Fiscalizações', 10, 10);

            const columns = [
                'Quarteirão',
                'Sequência',
                'Logradouro',
                'Número',
                'Complemento',
                'Hora de Entrada',
                'Tipo de Imóvel',
            ];

            const rows = this.filteredFiscalizacoes.map((fiscalizacao) => [
                fiscalizacao.quarteirao,
                fiscalizacao.sequencia,
                fiscalizacao.logradouro_fiscalizacao,
                fiscalizacao.numero,
                fiscalizacao.complemento,
                this.formatDate(fiscalizacao.hora_entrada),
                fiscalizacao.tipo_imovel,
            ]);

            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 20,
            });

            doc.save('relatorio_fiscalizacoes.pdf');
        },
        formatDate(date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            return new Date(date).toLocaleDateString('pt-BR', options);
        },
        clearFilters() {
            this.filters = {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                tipo_imovel: '',
            };
        },
    },
    mounted() {
        this.fetchFiscalizacoes();
    },
};
</script>

<style scoped>
.rel-fiscalizacoes {
    margin: 20px;
}

.filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.filters label {
    margin-bottom: 5px;
    font-weight: bold;
}

.filters input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
}
</style>
