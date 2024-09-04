<template>
  <div class="form-container">
    <Navbar />
    <h1>Cadastrar Fiscalização</h1>
    <div class="steps-container">
      <div
        class="step"
        :class="{ active: currentStep === 1, completed: currentStep > 1 }"
      >
        <span class="step-number">1</span>
        <label>Logradouro e número</label>
      </div>
      <div
        class="step"
        :class="{ active: currentStep === 2, completed: currentStep > 2 }"
      >
        <span class="step-number">2</span>
        <label>No depósito</label>
      </div>
      <div
        class="step"
        :class="{ active: currentStep === 3, completed: currentStep > 3 }"
      >
        <span class="step-number">3</span>
        <label>Coleta de amostra</label>
      </div>
      <div
        class="step"
        :class="{ active: currentStep === 4, completed: currentStep > 4 }"
      >
        <span class="step-number">4</span>
        <label>Tratamento</label>
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <div v-if="currentStep === 1" class="form-grid">
        <div class="form-group">
          <label for="logradouro">Logradouro:</label>
          <input
            type="text"
            id="logradouro"
            v-model="fiscalizacao.logradouro"
            @input="searchLogradouro"
            required
          />
          <ul v-if="logradouroSuggestions.length" class="suggestions-list">
            <li
              v-for="logradouro in logradouroSuggestions"
              :key="logradouro.id"
              @click="selectLogradouro(logradouro)"
            >
              {{ logradouro.logradouro }}
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label for="quarteirao">No quarteirão:</label>
          <input
            type="text"
            id="quarteirao"
            v-model="fiscalizacao.quarteirao"
            required
          />
        </div>

        <div class="form-group">
          <label for="sequencia">Sequência:</label>
          <input
            type="text"
            id="sequencia"
            v-model="fiscalizacao.sequencia"
            required
          />
        </div>

        <div class="form-group">
          <label for="numero">Número:</label>
          <input
            type="text"
            id="numero"
            v-model="fiscalizacao.numero"
            required
          />
        </div>

        <div class="form-group">
          <label for="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            v-model="fiscalizacao.complemento"
            @input="searchComplemento"
            required
          />
          <ul v-if="complementoSuggestions.length" class="suggestions-list">
            <li
              v-for="complemento in complementoSuggestions"
              :key="complemento.id"
              @click="selectComplemento(complemento)"
            >
              {{ complemento.complemento }}
            </li>
          </ul>
        </div>

        <div class="form-group">
          <label for="tipo-imovel">Tipo do Imóvel:</label>
          <select
            id="tipo-imovel"
            v-model="fiscalizacao.tipoImovel"
            required
          >
            <option value="R">Residencial</option>
            <option value="C">Comercial</option>
          </select>
        </div>

        <div class="form-group">
          <label for="numero">Número:</label>
          <input
            type="text"
            id="numero"
            v-model="fiscalizacao.numero"
            required
          />
        </div>
      </div>

      <div v-if="currentStep === 2">
        <label for="deposito">Depósito:</label>
        <input type="text" id="deposito" v-model="fiscalizacao.deposito" required />
      </div>

      <div v-if="currentStep === 3">
        <label for="amostra">Coleta de Amostra:</label>
        <input type="text" id="amostra" v-model="fiscalizacao.amostra" required />
      </div>

      <div v-if="currentStep === 4">
        <label for="tratamento">Tratamento:</label>
        <input type="text" id="tratamento" v-model="fiscalizacao.tratamento" required />
      </div>

      <button type="button" @click="nextStep">
        {{ currentStep < 4 ? 'Continuar' : 'Salvar' }}
      </button>
    </form>
  </div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import { CreateFiscalizacao, searchLogradourosByNome, searchByComplementos } from '../services/apiService.js';

export default {
  name: 'FiscalizacaoManagement',
  components: {
    Navbar,
  },
  data() {
    return {
      currentStep: 1,
      fiscalizacao: {
        logradouro: '',
        complemento: '',
        quarteirao: '',
        sequencia: '',
        numero: '',
        deposito: '',
        amostra: '',
        tratamento: '',
      },
      logradouroSuggestions: [],
      complementoSuggestions: [],
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      } else {
        this.postFiscalizacao();
      }
    },
    async postFiscalizacao() {
      try {
        await CreateFiscalizacao(this.fiscalizacao);
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
      if (this.fiscalizacao.logradouro.length > 2) {
        try {
          const response = await searchLogradourosByNome(this.fiscalizacao.logradouro);
          this.logradouroSuggestions = response.data;
        } catch (error) {
          console.error('Erro ao buscar logradouros:', error);
        }
      } else {
        this.logradouroSuggestions = [];
      }
    },
    selectLogradouro(logradouro) {
      this.fiscalizacao.logradouro = logradouro.logradouro;
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  z-index: 1;
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
  margin-bottom: 8px;
  z-index: 2;
}

.step.active .step-number {
  background-color: #4caf50;
  color: white;
}

.step.completed .step-number {
  background-color: #4caf50;
  color: white;
}

.steps-container::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  height: 4px;
  background-color: #e0e0e0;
  z-index: 0;
}

.step.completed ~ .step::before {
  background-color: #4caf50;
}

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  z-index: 1000;
  position: absolute;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* Novas regras para o layout dos campos */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>