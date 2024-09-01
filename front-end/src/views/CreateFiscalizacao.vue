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
        <div v-if="currentStep === 1">
          <label for="municipio">Município:</label>
          <input type="text" id="municipio" v-model="fiscalizacao.municipio" required />
  
          <label for="logradouro">Logradouro:</label>
          <input type="text" id="logradouro" v-model="fiscalizacao.logradouro" required />
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
  import { CreateFiscalizacao } from '../services/apiService.js';
  
  export default {
    name: 'FiscalizacaoManagement',
    components: {
      Navbar,
    },
    data() {
      return {
        currentStep: 1,
        fiscalizacao: {
          municipio: '',
          logradouro: '',
          deposito: '',
          amostra: '',
          tratamento: '',
        },
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
        }
      },
      handleSubmit() {
        if (this.currentStep < 4) {
          this.nextStep();
        } else {
          this.postFiscalizacao();
        }
      },
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
  </style>
  