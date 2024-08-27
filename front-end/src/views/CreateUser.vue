<template>
<div class="create-user">
    <Navbar />
    <h2>Cadastrar Novo Usuário</h2>
    <form @submit.prevent="submitForm" autocomplete="off">
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" v-model="form.nome" id="nome" required autocomplete="off" />
        </div>

        <div class="form-group">
            <label for="login">Login</label>
            <input type="text" v-model="form.login" id="login" required autocomplete="off" />
        </div>

        <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" v-model="form.senha" id="senha" required autocomplete="new-password" />
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="form.email" id="email" required autocomplete="off" />
        </div>

        <div class="form-group">
            <label for="status">Status</label>
            <select v-model="form.status" id="status" required>
                <option value="" disabled>Selecione o status</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
            </select>
        </div>

        <button type="submit" class="submit-button">Cadastrar</button>
    </form>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    createUser,
    logout
} from '../services/apiService.js';

export default {
    name: 'CreateUser',
    components: {
        Navbar
    },
    data() {
        return {
            form: {
                nome: '',
                login: '',
                senha: '',
                email: '',
                status: '',
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                await createUser(this.form);
                this.$router.push('/usuarios');
                this.$toast.success('Usuário criado com sucesso!');
                this.form = {
                    nome: '',
                    login: '',
                    senha: '',
                    email: '',
                    status: '',
                };
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                this.$toast.error('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
            }
        },
        goBack() {
            this.$router.push('/usuarios');
        },
        handleLogout() {
            logout();
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.create-user {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-top: 80px;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

label {
    width: 120px;
    margin-right: 20px;
    font-weight: bold;
    text-align: right;
}

input[type="text"],
input[type="password"],
input[type="email"],
select {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.submit-button {
    padding: 12px 20px;
    background-color: #69c369;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #5dad5d;
}
</style>
