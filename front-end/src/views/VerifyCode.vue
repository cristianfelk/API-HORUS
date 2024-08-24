<template>
  <div class="verify-code">
    <h1>Verificar Código</h1>
    <form @submit.prevent="verifyCode">
      <div>
        <label for="code">Código de Recuperação:</label>
        <input type="text" v-model="code" id="code" required />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Verificando...' : 'Verificar Código' }}
      </button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { verifyResetCode } from '../services/apiService.js';

export default {
  name: 'VerifyCode',
  setup() {
    const code = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    const verifyCode = async () => {
      isLoading.value = true;
      errorMessage.value = '';

      try {
        await verifyResetCode(code.value);
        router.push('/reset-password'); 
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = 'Código inválido. Por favor, tente novamente.';
        } else if (error.response && error.response.status === 410) {
          errorMessage.value = 'Código expirado. Solicite um novo código.';
        } else {
          errorMessage.value = 'Ocorreu um erro. Tente novamente mais tarde.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      code,
      errorMessage,
      isLoading,
      verifyCode,
    };
  },
};
</script>

<style scoped>
.verify-code {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #9e9e9e;
}

button:not(:disabled):hover {
  background-color: #45a049;
}

.error {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>