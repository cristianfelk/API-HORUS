<template>
<div class="rel-fiscalizacoes">
    <Navbar />
    <h1>Relatório de Fiscalizações</h1>

    <div class="tabs">
        <button :class="{ active: activeTab === 'filtros' }" @click="activeTab = 'filtros'">Filtros Gerais</button>
        <button :class="{ active: activeTab === 'listar' }" @click="activeTab = 'listar'">Listar</button>
    </div>

    <div v-if="activeTab === 'filtros'" class="filters">
        <div class="filter-item date-range">
            <label for="dataInicial">Data Inicial:</label>
            <input type="date" v-model="filters.dataInicial" />
            <label for="dataFinal">Data Final:</label>
            <input type="date" v-model="filters.dataFinal" />
        </div>
        <div class="filter-item">
            <label for="quarteirao">Quarteirão:</label>
            <input type="text" v-model="filters.quarteirao" placeholder="Filtrar por Quarteirão" />
        </div>
        <div class="filter-item">
            <label for="sequencia">Sequência:</label>
            <input type="text" v-model="filters.sequencia" placeholder="Filtrar por Sequência" />
        </div>
        <div class="filter-item">
            <label for="logradouro">Logradouro:</label>
            <input type="text" v-model="filters.logradouro_fiscalizacao" placeholder="Filtrar por Logradouro" />
        </div>
        <div class="filter-item">
            <label for="tipoImovel">Tipo de Imóvel:</label>
            <input type="text" v-model="filters.tipo_imovel" placeholder="Filtrar por Tipo de Imóvel" />
        </div>

        <button @click="clearFilters">Limpar Filtros</button>
    </div>

    <div v-if="activeTab === 'listar'" class="fields">
        <h3>Selecione os campos para incluir no PDF:</h3>
        <div class="checkbox-group">
            <div v-for="(label, field) in availableFields" :key="field" class="checkbox-item">
                <input type="checkbox" v-model="selectedFields" :value="field" id="field-{{ field }}" />
                <label :for="'field-' + field">{{ label }}</label>
            </div>
        </div>
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
import logo from '../assets/pinhalzinho.png';

export default {
    components: {
        Navbar
    },
    data() {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        return {
            fiscalizacoes: [],
            filters: {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                tipo_imovel: '',
                dataInicial: firstDayOfMonth.toISOString().split('T')[0],
                dataFinal: lastDayOfMonth.toISOString().split('T')[0]
            },
            availableFields: {
                quarteirao: 'Quarteirão',
                sequencia: 'Sequência',
                logradouro_fiscalizacao: 'Logradouro',
                numero: 'Número',
                complemento: 'Complemento',
                hora_entrada: 'Hora de Entrada',
                tipo_imovel: 'Tipo de Imóvel',
                visita: 'Visita',
                pendencia: 'Pendência',
                status: 'Status',
                a1: 'A1',
                a2: 'A2',
                b: 'B',
                c: 'C',
                d1: 'D1',
                d2: 'D2',
                e: 'E',
                eliminado: 'Eliminado',
                inicial: 'Inicial',
                final: 'Final',
                qtd_tubitos: 'Qtd. Tubitos',
                im_trat: 'Im. Tratado',
                tipo_focal: 'Tipo Focal',
                qtd_grama: 'Qtd. Gramas',
                qtd_tratado: 'Qtd. Tratado',
                tipo_perifocal: 'Tipo Perifocal',
                qtd_gramas: 'Qtd. Gramas'
            },
            selectedFields: ['quarteirao', 'sequencia', 'logradouro_fiscalizacao', 'numero', 'complemento', 'hora_entrada', 'tipo_imovel'],
            userProfile: localStorage.getItem("userName"),
            activeTab: 'filtros'
        };
    },
    computed: {
        filteredFiscalizacoes() {
            return this.fiscalizacoes.filter(fiscalizacao => {
                const horaEntrada = new Date(fiscalizacao.hora_entrada);
                const dataInicial = this.filters.dataInicial ? new Date(this.filters.dataInicial) : null;
                const dataFinal = this.filters.dataFinal ? new Date(this.filters.dataFinal) : null;

                const isWithinDateRange = (!dataInicial || horaEntrada >= dataInicial) &&
                    (!dataFinal || horaEntrada <= dataFinal);

                return (
                    (this.filters.quarteirao === '' || fiscalizacao.quarteirao.includes(this.filters.quarteirao)) &&
                    (this.filters.sequencia === '' || fiscalizacao.sequencia.includes(this.filters.sequencia)) &&
                    (this.filters.logradouro_fiscalizacao === '' || fiscalizacao.logradouro_fiscalizacao.toLowerCase().includes(this.filters.logradouro_fiscalizacao.toLowerCase())) &&
                    (this.filters.tipo_imovel === '' || fiscalizacao.tipo_imovel.toLowerCase().includes(this.filters.tipo_imovel.toLowerCase())) &&
                    isWithinDateRange
                );
            });
        }
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
            const logoRel = logo;
            doc.addImage(logoRel, 'png', 15, 8, 30, 30);

            const title = "Secretária Municipal de Saúde - Pinhalzinho SC";
            const address = "Endereço: Avenida Belém, 353 - Centro - Pinhalzinho";
            const phone = "Telefone: (49) 3366-6640";
            doc.setFontSize(10);
            doc.text('Relatório de Fiscalizações', doc.internal.pageSize.getWidth() / 2, 14, {
                align: 'center'
            });
            doc.text(title, doc.internal.pageSize.getWidth() / 2, 20, {
                align: 'center'
            });
            doc.text(address, doc.internal.pageSize.getWidth() / 2, 26, {
                align: 'center'
            });
            doc.text(phone, doc.internal.pageSize.getWidth() / 2, 32, {
                align: 'center'
            });

            const username = this.userProfile;
            const emit = `Emitido por: ${username}`;
            const emissionDate = `Data de emissão: ${new Date().toLocaleDateString('pt-BR')}`;
            doc.setFontSize(8);
            doc.text(emit, doc.internal.pageSize.getWidth() - 51, 26);
            doc.text(emissionDate, doc.internal.pageSize.getWidth() - 51, 32);

            const columns = this.selectedFields.map(field => this.availableFields[field]);
            const rows = this.filteredFiscalizacoes.map(fiscalizacao =>
                this.selectedFields.map(field => {
                    if (field === 'hora_entrada') {
                        return this.formatDate(fiscalizacao.hora_entrada);
                    }
                    return fiscalizacao[field] || '';
                })
            );
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 40
            });

            doc.save('relatorio_fiscalizacoes.pdf');
        },
        formatDate(date) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(date).toLocaleDateString('pt-BR', options);
        },
        clearFilters() {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            this.filters = {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                tipo_imovel: '',
                dataInicial: firstDayOfMonth.toISOString().split('T')[0],
                dataFinal: lastDayOfMonth.toISOString().split('T')[0]
            };
            this.selectedFields = [];
        }
    },
    mounted() {
        this.fetchFiscalizacoes();
    }
};
</script>

<style scoped>
.rel-fiscalizacoes {
    max-width: 900px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

.tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.tabs button {
    background-color: #69c36983;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.tabs button.active {
    background-color: #69c369;
    color: white;
    font-weight: bold;
}

.filters,
.fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.filters .filter-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filters label {
    font-weight: bold;
    font-size: 14px;
    color: #333;
    flex: 0 0 150px;
}

.filters input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
}

.filters input:focus {
    border-color: #4285f4;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 255, 34, 0.5);
}

.filters .date-range {
    display: flex;
    gap: 10px;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    width: calc(50% - 10px);
}

.checkbox-item input[type='checkbox'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #69c369;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.checkbox-item input[type='checkbox']:checked {
    background-color: #69c369;
    border-color: #69c369;
}

.checkbox-item input[type='checkbox']:checked::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin: auto;
    background-color: white;
    border-radius: 2px;
}

.checkbox-item label {
    font-size: 14px;
    color: #333;
    cursor: pointer;
}

button {
    margin-top: 20px;
    padding: 12px 18px;
    background-color: #69c369;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #85f885;
}

button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
}
</style>
