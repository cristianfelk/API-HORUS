<template>
<div class="form-container">
    <Navbar />
    <h1>Cadastrar Fiscalização</h1>
    <div class="steps-container">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <span class="step-number">1</span>
            <label>Logradouro e número</label>
        </div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <span class="step-number">2</span>
            <label>No depósito</label>
        </div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <span class="step-number">3</span>
            <label>Coleta de amostra</label>
        </div>
        <div class="step" :class="{ active: currentStep === 4, completed: currentStep > 4 }">
            <span class="step-number">4</span>
            <label>Tratamento</label>
        </div>
    </div>

    <form @submit.prevent="handleSubmit">
        <div v-if="currentStep === 1" class="form-grid">

            <div class="form-group">
                <label for="quarteirao">No quarteirão:</label>
                <input type="text" id="quarteirao" v-model="fiscalizacao.quarteirao" @keydown.enter="focusNextField('sequencia')" required />
            </div>

            <div class="form-group">
                <label for="sequencia">Sequência:</label>
                <input type="text" id="sequencia" v-model="fiscalizacao.sequencia" @keydown.enter="focusNextField('logradouro')" required />
            </div>

            <div class="form-group">
                <label for="logradouro">Logradouro:</label>
                <input type="text" id="logradouro" v-model="fiscalizacao.logradouro_fiscalizacao" @input="searchLogradouro" @keydown.enter="focusNextField('numero')" required />
                <ul v-if="logradouroSuggestions.length" class="suggestions-list">
                    <li v-for="logradouro in logradouroSuggestions" :key="logradouro.id" @click="selectLogradouro(logradouro)">
                        {{ logradouro.logradouro }}
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label for="numero">Número:</label>
                <input type="text" id="numero" v-model="fiscalizacao.numero" @keydown.enter="focusNextField('complemento')" required />
            </div>

            <div class="form-group">
                <label for="complemento">Complemento:</label>
                <input type="text" id="complemento" v-model="fiscalizacao.complemento" @input="searchComplemento" @keydown.enter="focusNextField('tipo_imovel')" required />
                <ul v-if="complementoSuggestions.length" class="suggestions-list">
                    <li v-for="complemento in complementoSuggestions" :key="complemento.id" @click="selectComplemento(complemento)">
                        {{ complemento.complemento }}
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label for="tipo_imovel">Tipo do Imóvel:</label>
                <select id="tipo_imovel" v-model="fiscalizacao.tipo_imovel" @keydown.enter="focusNextField('hora_entrada')" required>
                    <option value="R">Residencial</option>
                    <option value="C">Comercial</option>
                </select>
            </div>

            <div class="form-group">
                <label for="hora_entrada">Hora Entrada:</label>
                <input type="datetime-local" id="hora_entrada" v-model="fiscalizacao.hora_entrada" @keydown.enter="focusNextField('visita')" required />
            </div>

            <div class="form-group">
                <label for="visita">Visita:</label>
                <select id="visita" v-model="fiscalizacao.visita" @keydown.enter="focusNextField('pendencia')" required>
                    <option value="N">Normal</option>
                    <option value="R">Recuperação</option>
                </select>
            </div>

            <div class="form-group">
                <label for="pendencia">Pendência:</label>
                <input type="text" id="pendencia" v-model="fiscalizacao.pendencia" @keydown.enter="focusNextField('status')" required />
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" v-model="fiscalizacao.status" @keydown.enter="focusNextField('continuar')" required>
                    <option value="1">Novo</option>
                    <option value="2">Em andamento</option>
                    <option value="3">Finalizado</option>
                </select>
            </div>

        </div>

        <div v-if="currentStep === 2" class="form-group">
            <div class="form-group">
                <label for="inspecionado">Inspecionado:</label>
                <div class="form-grid">
                    <input type="text" id="a1" v-model="fiscalizacao.a1" placeholder="A1" @keydown.enter="focusNextField('a2')" required />
                    <input type="text" id="a2" v-model="fiscalizacao.a2" placeholder="A2" @keydown.enter="focusNextField('b')" required />
                    <input type="text" id="b" v-model="fiscalizacao.b" placeholder="B" @keydown.enter="focusNextField('c')" required />
                    <input type="text" id="c" v-model="fiscalizacao.c" placeholder="C" @keydown.enter="focusNextField('d1')" required />
                    <input type="text" id="d1" v-model="fiscalizacao.d1" placeholder="D1" @keydown.enter="focusNextField('d2')" required />
                    <input type="text" id="d2" v-model="fiscalizacao.d2" placeholder="D2" @keydown.enter="focusNextField('e')" required />
                    <input type="text" id="e" v-model="fiscalizacao.e" placeholder="E" @keydown.enter="focusNextField('eliminado')" required />
                </div>
            </div>

            <div class="form-group">
                <label for="eliminado">Eliminado:</label>
                <input type="text" id="eliminado" v-model="fiscalizacao.eliminado" placeholder="Eliminado" required />
            </div>
        </div>

        <div v-if="currentStep === 3" class="form-group">
            <div class="form-group">
                <label for="nota_amostra">Nota da amostra:</label>
                <div class="form-grid">
                    <input type="text" id="inicial" v-model="fiscalizacao.inicial" placeholder="Inicial" @keydown.enter="focusNextField('final')" required />
                    <input type="text" id="final" v-model="fiscalizacao.final" placeholder="Final" @keydown.enter="focusNextField('qtd_tubitos')" required />
                </div>
            </div>

            <div class="form-group">
                <label for="quantidade_tubitos">Quantidade Tubitos:</label>
                <input type="text" id="qtd_tubitos" v-model="fiscalizacao.qtd_tubitos" placeholder="Quantidade Tubitos" required />
            </div>
        </div>

        <div v-if="currentStep === 4" class="form-group">
            <div class="form-group">
                <label for="nota_amostra">Focal:</label>
                <div class="form-grid">
                    <input type="text" id="im_trat" v-model="fiscalizacao.im_trat" placeholder="Im. Trat." @keydown.enter="focusNextField('tipo_focal')" required />
                    <input type="text" id="tipo_focal" v-model="fiscalizacao.tipo_focal" placeholder="Tipo" @keydown.enter="focusNextField('qtd_grama')" required />
                    <input type="text" id="qtd_grama" v-model="fiscalizacao.qtd_grama" placeholder="Qtde (Gramas)" @keydown.enter="focusNextField('qtd_tratado')" required />
                    <input type="text" id="qtd_tratado" v-model="fiscalizacao.qtd_tratado" placeholder="Qtde dep. Tratado" @keydown.enter="focusNextField('tipo_perifocal')" required />
                </div>
            </div>

            <div class="form-group">
                <label for="nota_amostra">Perifocal:</label>
                <div class="form-grid">
                    <input type="text" id="tipo_perifocal" v-model="fiscalizacao.tipo_perifocal" placeholder="Tipo" @keydown.enter="focusNextField('qtd_gramas')" required />
                    <input type="text" id="qtd_gramas" v-model="fiscalizacao.qtd_gramas" placeholder="Quantidade gramas" required />
                </div>
            </div>

        </div>

        <div class="button-container">
            <button v-if="currentStep > 1" type="button" class="back-button" @click="backStep">
                Voltar
            </button>

            <button type="button" class="next-button" @click="handleSubmit">
                {{ currentStep < 4 ? 'Continuar' : 'Salvar' }}
            </button>
        </div>

    </form>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    CreateFiscalizacao,
    searchLogradourosByNome,
    searchByComplementos
} from '../services/apiService.js';

export default {
    name: 'FiscalizacaoManagement',
    components: {
        Navbar,
    },
    data() {
        return {
            currentStep: 1,
            fiscalizacao: {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                numero: '',
                complemento: '',
                tipo_imovel: '',
                hora_entrada: this.getCurrentDateTime(),
                timestamp_entrada: null,
                usuario_id: null,
                a1: '',
                a2: '',
                b: '',
                c: '',
                d1: '',
                d2: '',
                e: '',
                eliminado: '',
                inicial: '',
                final: '',
                qtd_tubitos: '',
                im_trat: '',
                tipo_focal: '',
                qtd_grama: '',
                qtd_tratado: '',
                tipo_perifocal: '',
                qtd_gramas: '',
            },
            logradouroSuggestions: [],
            complementoSuggestions: [],
        };
    },
    methods: {
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },

        convertToTimestamp(dateString) {
            return new Date(dateString).getTime();
        },

        nextStep() {
            if (this.currentStep < 4) {
                this.currentStep++;
            } else {
                this.postFiscalizacao();
            }
        },

        backStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        focusNextField(nextFieldId) {
            const nextField = document.getElementById(nextFieldId);
            if (nextField) {
                nextField.focus();
            }
        },

        resetForm() {
            this.fiscalizacao = {
                quarteirao: '',
                sequencia: '',
                logradouro_fiscalizacao: '',
                numero: '',
                complemento: '',
                tipo_imovel: '',
                hora_entrada: this.getCurrentDateTime(),
                timestamp_entrada: null,
                usuario_id: null,
                a1: '',
                a2: '',
                b: '',
                c: '',
                d1: '',
                d2: '',
                e: '',
                eliminado: '',
                inicial: '',
                final: '',
                qtd_tubitos: '',
                im_trat: '',
                tipo_focal: '',
                qtd_grama: '',
                qtd_tratado: '',
                tipo_perifocal: '',
                qtd_gramas: '',
            };
            this.currentStep = 1;
        },

        async postFiscalizacao() {
            try {
                this.fiscalizacao.timestamp_entrada = this.convertToTimestamp(this.fiscalizacao.hora_entrada);

                await CreateFiscalizacao(this.fiscalizacao);
                alert('Fiscalização criada com sucesso!');

                this.resetForm();
            } catch (error) {
                console.error(error);
            }
        },

        handleSubmit() {
            if (this.currentStep < 4) {
                this.nextStep();
            } else {
                this.postFiscalizacao();
            }
        },
        async searchLogradouro() {
            if (this.fiscalizacao.logradouro_fiscalizacao.length > 2) {
                try {
                    const response = await searchLogradourosByNome(this.fiscalizacao.logradouro_fiscalizacao);
                    this.logradouroSuggestions = response.data;
                } catch (error) {
                    console.error('Erro ao buscar logradouros:', error);
                }
            } else {
                this.logradouroSuggestions = [];
            }
        },
        selectLogradouro(logradouro) {
            this.fiscalizacao.logradouro_fiscalizacao = logradouro.logradouro;
            this.logradouroSuggestions = [];
        },
        async searchComplemento() {
            if (this.fiscalizacao.complemento.length > 2) {
                try {
                    const response = await searchByComplementos(this.fiscalizacao.complemento);
                    this.complementoSuggestions = response.data;
                } catch (error) {
                    console.error('Erro ao buscar complementos:', error);
                }
            } else {
                this.complementoSuggestions = [];
            }
        },
        selectComplemento(complemento) {
            this.fiscalizacao.complemento = complemento.complemento;
            this.complementoSuggestions = [];
        }

    },
};
</script>

<style scoped>
.form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.steps-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    position: relative;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    flex: 1;
}

.step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e0e0e0;
    color: #555;
    font-weight: bold;
    font-size:8px;
    /* Ajuste do tamanho da fonte */
    margin-bottom: 4px;
    z-index: 2;
    transition: background-color 0.3s, color 0.3s;
}

.step.active .step-number,
.step.completed .step-number {
    background-color: #4caf50;
    color: white;
}

.steps-container::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #e0e0e0;
    z-index: 0;
}

.step.completed~.step::before {
    background-color: #4caf50;
}

.step::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #e0e0e0;
    z-index: -1;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 4px;
    font-size: 14px;
}

.form-group select,
.form-group input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    margin-bottom: 5px;
    box-sizing: border-box;
}

::placeholder {
    color: #b7b7b7;
    opacity: 0.8;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.button-container>button {
    padding: 8px 16px;
    margin: 0 8px;
    font-size: 14px;
}

.back-button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #d32f2f;
}

.next-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.next-button:hover {
    background-color: #45a049;
}
</style>
