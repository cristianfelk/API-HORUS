<template>
<div class="edit-user-container">
    <Navbar />
    <div class="edit-user">
        <h2>Editar Usuário</h2>
        <form @submit.prevent="patchUsuario">
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input v-model="user.nome" id="nome" type="text" placeholder="Nome do Usuário" />
            </div>
            <div class="form-group">
                <label for="login">Login:</label>
                <input v-model="user.login" id="login" type="text" placeholder="Login" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="user.email" id="email" type="email" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="senha">Senha:</label>
                <input v-model="user.senha" id="senha" type="password" placeholder="Senha (deixe em branco se não for alterar)" />
            </div>
            <div class="form-group">
                <label for="status">Status:</label>
                <select v-model="user.status" id="status">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <button type="submit" class="save-button">Salvar</button>
        </form>
    </div>
</div>
</template>

<script>
import {
    getUserById,
    updateUser
} from '../services/apiService.js';
import Navbar from '../components/NavBar.vue';

export default {
    name: 'EditUser',
    components: {
        Navbar,
    },
    data() {
        return {
            user: {
                nome: '',
                login: '',
                senha: '',
                email: '',
                status: ''
            }
        };
    },
    methods: {
        async fetchUser() {
            const userId = this.$route.params.id;
            try {
                const response = await getUserById(userId);
                this.user = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        },
        async patchUsuario() {
            const userId = this.$route.params.id;
            try {
                const updatedUser = {
                    nome: this.user.nome || null,
                    login: this.user.login || null,
                    senha: this.user.senha ? this.user.senha : '',
                    email: this.user.email || null,
                    status: this.user.status || null
                };

                console.log('Atualizando usuário com os seguintes dados:', updatedUser);
                const response = await updateUser(userId, updatedUser);
                console.log('Resposta da atualização:', response.data);
                this.$router.push('/usuarios');
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
            }
        }
    },
    mounted() {
        this.fetchUser();
    }
};
</script>

<style scoped>
.edit-user-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    margin-top: 60px;
}

.edit-user {
    padding: 20px;
    margin: 0 auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
    width: 100%;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.save-button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #69c369;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.save-button:hover {
    background-color: #5dad5d;
}
</style>
