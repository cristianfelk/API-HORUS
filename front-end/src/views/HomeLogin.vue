<template>
<div class="login-container">
    <div class="login-content">
        <img src="../assets/logoPzo.png" alt="Logo" class="login-logo">
        <div class="login-box">
            <form @submit.prevent="postLogin">
                <div class="input-group">
                    <label for="login">Usuário</label>
                    <input type="text" v-model="login" id="login" placeholder="Digite seu usuário">
                </div>
                <div class="input-group">
                    <label for="senha">Senha</label>
                    <input type="password" v-model="senha" id="senha" placeholder="Digite sua senha">
                </div>
                <!-- <p class="forgot-password-link" @click="navigateToRecoverPassword">Esqueci minha senha</p> -->
                <button type="submit" class="login-button">Entrar</button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {
    login
} from '../services/apiService.js';

export default {
    name: 'HomeLogin',
    data() {
        return {
            login: '',
            senha: '',
            errorMessage: ''
        };
    },
    methods: {
        async postLogin() {
            this.errorMessage = '';
            try {
                const response = await login({
                    login: this.login,
                    senha: this.senha
                });

                if (response.data.success) {
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('userProfile', response.data.user.perfil);
                    localStorage.setItem('userName', response.data.user.nome);
                    localStorage.setItem('userId', response.data.user.id);

                    this.$router.push('/dashboard');
                } else {
                    this.errorMessage = 'Login ou senha incorretos';
                }
            } catch (error) {
                console.error('Erro no login:', error);
                this.errorMessage = 'Usuário ou senha incorreto. Verifique suas credenciais.';
            }
        },
        navigateToRecoverPassword() {
            this.$router.push('/recover-password');
        }
    }
};
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 100vw;
    margin: 0;
}

.login-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-logo {
    width: 250px;
    margin-bottom: 30px;
}

.login-box {
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

.forgot-password-link {
    text-align: right;
    color: #007bff;
    cursor: pointer;
    margin-bottom: 15px;
    font-size: 14px;
}

.forgot-password-link:hover {
    text-decoration: underline;
}

.login-button {
    width: 50%;
    padding: 10px;
    background-color: rgba(34, 139, 34, 0.8);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.login-button:hover {
    background-color: rgba(34, 139, 34, 1);
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}
</style>
