<template>
<div class="form-container">
    <Navbar />
    <h1>Criar Município</h1>
    <form @submit.prevent="postMunicipio">
        <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" v-model="nome" id="nome" required>
        </div>
        <div class="form-group">
            <label for="ibge">IBGE:</label>
            <input type="text" v-model="ibge" id="ibge" required>
        </div>
        <div class="form-group">
            <label for="uf">UF:</label>
            <select v-model="uf" id="uf" required>
                <option value="" disabled>Selecione uma UF</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
            </select>
        </div>
        <button type="submit">Salvar</button>
    </form>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    createMunicipio
} from '../services/apiService.js';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            nome: '',
            ibge: '',
            uf: ''
        };
    },
    methods: {
        async postMunicipio() {
            try {
                const response = await createMunicipio({
                    nome: this.nome,
                    ibge: this.ibge,
                    uf: this.uf
                });
                if (response) {
                    this.$router.push('/municipios');
                } else {
                    console.error('Erro ao criar município');
                }
            } catch (error) {
                console.error('Erro ao criar município:', error);
            }
        }
    }
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

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
