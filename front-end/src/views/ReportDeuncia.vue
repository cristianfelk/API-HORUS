<template>
    <div>
      <Navbar />
  
      <div class="report-container">
        <h1 class="title">Denuncie Focos de Mosquito</h1>
        <p class="subtitle">
          Ajude a combater a dengue informando sobre possíveis focos do mosquito Aedes aegypti.
        </p>
  
        <form @submit.prevent="submitReport">
          <div class="form-group">
            <label for="location">Localização do Foco (Endereço):</label>
            <input type="text" id="location" v-model="report.location" required />
          </div>
  
          <div class="form-group">
            <label for="description">Descrição do Foco:</label>
            <textarea id="description" v-model="report.description" required></textarea>
          </div>
  
          <div class="form-group">
            <label for="image">Imagem (opcional):</label>
            <input type="file" id="image" @change="handleFileUpload" />
          </div>
  
          <button type="submit" class="submit-button">Enviar Denúncia</button>
        </form>
  
        <p v-if="message" class="success-message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/NavBarHome.vue';
  
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        report: {
          location: '',
          description: '',
          image: null,
        },
        message: '',
      };
    },
    methods: {
      handleFileUpload(event) {
        this.report.image = event.target.files[0];
      },
      async submitReport() {
        // Simula o envio da denúncia (substitua pela lógica real de envio de API)
        try {
          const formData = new FormData();
          formData.append('location', this.report.location);
          formData.append('description', this.report.description);
          if (this.report.image) {
            formData.append('image', this.report.image);
          }
  
          // Chamada à API (substitua pela função real)
          await this.$axios.post('/denuncias', formData);
  
          // Feedback para o usuário
          this.message = 'Denúncia enviada com sucesso!';
          this.report.location = '';
          this.report.description = '';
          this.report.image = null;
        } catch (error) {
          console.error('Erro ao enviar a denúncia:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .report-container {
    max-width: 600px;
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
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #ff1a1a;
  }
  
  .success-message {
    margin-top: 20px;
    text-align: center;
    color: green;
  }
  </style>
  