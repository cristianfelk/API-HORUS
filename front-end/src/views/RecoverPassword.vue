<template>
<div class="recover-password-container">
    <div class="recover-password-content">
        <h2>Recuperação de Senha</h2>
        <form @submit.prevent="requestPasswordReset">
            <div class="input-group">
                <label for="email">E-mail</label>
                <input type="email" v-model="email" id="email" placeholder="Digite seu e-mail">
            </div>
            <button type="submit" class="submit-button">Enviar E-mail</button>
            <p v-if="message" class="message">{{ message }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</div>
</template>

  
<script>
import {
    requestPasswordReset
} from '../services/apiService.js';

export default {
    name: 'RecoverPassword',
    data() {
        return {
            email: '',
            message: '',
            errorMessage: ''
        };
    },
    methods: {
        async requestPasswordReset() {
            this.errorMessage = '';
            this.message = '';
            try {
                const response = await requestPasswordReset(this.email);
                if (response.status === 200) {
                    this.message = 'Código de recuperação enviado. Verifique seu e-mail.';
                    this.$router.push('/verify-code');
                }
            } catch (error) {
                this.errorMessage = 'Erro ao enviar o email de recuperação. Tente novamente.';
            }
        }
    }
};
</script>

  
<style scoped>
.recover-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 100vw;
}

.recover-password-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.input-group label {
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
}

.input-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.submit-button {
    width: 50%;
    padding: 10px;
    background-color: rgba(34, 139, 34, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.submit-button:hover {
    background-color: rgba(34, 139, 34, 1);
}

.message {
    color: green;
    margin-top: 10px;
    font-size: 14px;
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}
</style>
