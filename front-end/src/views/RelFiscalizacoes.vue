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
        <div class="fields">
            <h3>Selecione os campos para incluir no PDF:</h3>
            <div class="checkbox-group">
                <div v-for="(label, field) in availableFields" :key="field" class="checkbox-item">
                    <input type="checkbox" v-model="selectedFields" :value="field" id="field-{{ field }}" />
                    <label :for="'field-' + field">{{ label }}</label>
                </div>
            </div>
        </div>

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
import logo from '../assets/pinhalzinho.png';

export default {
    components: {
        Navbar
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
                qtd_gramas: 'Qtd. Gramas',
            },
            selectedFields: ['quarteirao', 'sequencia', 'logradouro_fiscalizacao', 'numero', 'complemento', 'hora_entrada', 'tipo_imovel'],
            userProfile: localStorage.getItem("userName"),
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

            const columns = this.selectedFields.map((field) => this.availableFields[field]);
            const rows = this.filteredFiscalizacoes.map((fiscalizacao) =>
                this.selectedFields.map((field) => {
                    if (field === 'hora_entrada') {
                        return this.formatDate(fiscalizacao.hora_entrada);
                    }
                    return fiscalizacao[field] || '';
                })
            );
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 40,
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
            this.selectedFields = [];
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

.fields {
    margin-bottom: 20px;
}

.fields h3 {
    font-weight: bold;
    margin-bottom: 10px;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.checkbox-item {
    display: flex;
    align-items: center;
}

.checkbox-item input[type='checkbox'] {
    margin-right: 5px;
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
</style>
