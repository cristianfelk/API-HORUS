<template>
<div class="reset-password">
    <h1>Redefinir Senha</h1>
    <form @submit.prevent="submitResetPassword">
        <div>
            <label for="new-password">Nova Senha:</label>
            <input type="password" v-model="newPassword" id="new-password" required />
        </div>
        <div>
            <label for="confirm-password">Confirme a Nova Senha:</label>
            <input type="password" v-model="confirmPassword" id="confirm-password" required />
        </div>
        <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Redefinindo...' : 'Redefinir Senha' }}
        </button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
</div>
</template>

<script>
import {
    ref
} from 'vue';
import {
    useRouter
} from 'vue-router';
import {
    resetPassword as apiResetPassword
} from '../services/apiService.js';

export default {
    name: 'ResetPassword',
    setup() {
        const newPassword = ref('');
        const confirmPassword = ref('');
        const errorMessage = ref('');
        const successMessage = ref('');
        const isLoading = ref(false);
        const router = useRouter();

        const submitResetPassword = async () => {
            if (newPassword.value !== confirmPassword.value) {
                errorMessage.value = 'As senhas não coincidem.';
                return;
            }

            isLoading.value = true;
            errorMessage.value = '';
            successMessage.value = '';

            try {
                const response = await apiResetPassword({
                    newPassword: newPassword.value
                });
                successMessage.value = 'Senha redefinida com sucesso!';
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } catch (error) {
                errorMessage.value = 'Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde.';
            } finally {
                isLoading.value = false;
            }
        };

        return {
            newPassword,
            confirmPassword,
            errorMessage,
            successMessage,
            isLoading,
            submitResetPassword,
        };
    },
};
</script>

<style scoped>
.reset-password {
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

.success {
    color: green;
    text-align: center;
    margin-top: 15px;
}
</style>
