<template>
<div class="container">
    <Navbar />
    <div class="form-container">
        <h1>Cadastrar Novo Logradouro</h1>
        <form @submit.prevent="createLogradouro">
            <div class="form-group">
                <label for="municipio_id">Município ID:</label>
                <input v-model="logradouro.municipio_id" type="number" id="municipio_id" required />
            </div>
            <div class="form-group">
                <label for="cep">CEP:</label>
                <input v-model="logradouro.cep" type="text" id="cep" required />
            </div>
            <div class="form-group">
                <label for="logradouro">Logradouro:</label>
                <input v-model="logradouro.logradouro" type="text" id="logradouro" required />
            </div>
            <div class="form-group">
                <label for="complemento">Complemento:</label>
                <input v-model="logradouro.complemento" type="text" id="complemento" />
            </div>
            <div class="form-group">
                <label for="bairro">Bairro:</label>
                <input v-model="logradouro.bairro" type="text" id="bairro" required />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    createLogradouro
} from '../services/apiService';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            logradouro: {
                municipio_id: '',
                cep: '',
                logradouro: '',
                complemento: '',
                bairro: ''
            }
        };
    },
    methods: {
        async createLogradouro() {
            try {
                await createLogradouro(this.logradouro);
                alert('Logradouro cadastrado com sucesso');
                this.$router.push('/logradouros');
            } catch (error) {
                console.error('Erro ao cadastrar logradouro:', error);
                alert('Erro ao cadastrar logradouro');
            }
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.form-container {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
}

h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #218838;
}

button:focus {
    outline: none;
}

@media (max-width: 768px) {
    .form-container {
        padding: 15px;
        margin-top: 10px;
    }

    h1 {
        font-size: 20px;
    }
}
</style>
