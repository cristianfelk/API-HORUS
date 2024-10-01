<template>
    <div>
        <Navbar />
    
        <div class="denuncia-management-container">
            <h1 class="title">Monitoramento de Denúncias</h1>
            <p class="subtitle">Acompanhe todas as denúncias registradas e seus detalhes.</p>
    
            <div v-if="denuncias && denuncias.length" class="denuncia-list">
                <h2>Lista de Denúncias</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome Denunciante</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Município</th>
                            <th>Endereço</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="denuncia in denuncias" :key="denuncia.id">
                            <td>{{ denuncia.id }}</td>
                            <td v-if="!denuncia.anonima">{{ denuncia.nome_denunciante }}</td>
                            <td v-else>Anônima</td>
                            <td>{{ denuncia.email_denunciante }}</td>
                            <td>{{ denuncia.telefone_denunciante }}</td>
                            <td>{{ denuncia.id_municipio }}</td>
                            <td>{{ denuncia.id_logradouro }}</td>
                            <td>{{ denuncia.descricao_denuncia }}</td>
                            <td>{{ denuncia.id_status || 'Pendente' }}</td>
                            <td>
                                <button @click="editDenuncia(denuncia)">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
            <div v-else-if="errorMessage" class="error-message">
                <p>{{ errorMessage }}</p>
            </div>
            <div v-else class="loading-message">
                <p>Carregando denúncias...</p>
            </div>
    
            <!-- Modal de Edição -->
            <div v-if="isEditing" class="modal">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <h2>Editar Denúncia</h2>
                    <form @submit.prevent="updateDenuncia">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nome Denunciante:</label>
                                <input type="text" v-model="selectedDenuncia.nome_denunciante" />
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" v-model="selectedDenuncia.email_denunciante" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Telefone:</label>
                                <input type="text" v-model="selectedDenuncia.telefone_denunciante" />
                            </div>
                            <div class="form-group">
                                <label>Município:</label>
                                <input type="text" v-model="selectedDenuncia.id_municipio" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Endereço:</label>
                                <input type="text" v-model="selectedDenuncia.id_logradouro" />
                            </div>
                            <div class="form-group">
                                <label>Status:</label>
                                <input type="text" v-model="selectedDenuncia.id_status" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Descrição:</label>
                            <textarea v-model="selectedDenuncia.descricao_denuncia"></textarea>
                        </div>
                        <button class="submit-button" type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import Navbar from "@/components/NavBar.vue";
    import {
        getDenuncia,
        updateDenuncia
    } from "../services/apiService";
    
    export default {
        components: {
            Navbar,
        },
        data() {
            return {
                denuncias: [],
                errorMessage: "",
                isEditing: false,
                selectedDenuncia: {}
            };
        },
        async created() {
            await this.fetchDenuncias();
        },
        methods: {
            async fetchDenuncias() {
                try {
                    const response = await getDenuncia();
                    this.denuncias = response.data;
                    this.errorMessage = "";
                } catch (error) {
                    this.errorMessage = "Erro ao buscar as denúncias.";
                    console.error("Erro ao buscar as denúncias:", error);
                }
            },
            editDenuncia(denuncia) {
                this.selectedDenuncia = { ...denuncia }; // Cria uma cópia para edição
                this.isEditing = true; // Abre o modal de edição
            },
            async updateDenuncia() {
                try {
                    await updateDenuncia(this.selectedDenuncia); // Chama a API para atualizar a denúncia
                    this.isEditing = false; // Fecha o modal
                    await this.fetchDenuncias(); // Atualiza a lista de denúncias
                } catch (error) {
                    console.error("Erro ao atualizar a denúncia:", error);
                }
            },
            closeModal() {
                this.isEditing = false; // Fecha o modal
            }
        },
    };
    </script>
    
    <style scoped>
    .denuncia-management-container {
        max-width: 1200px;
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
    
    .denuncia-list {
        margin-top: 20px;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    
    table th,
    table td {
        padding: 12px 15px;
        border: 1px solid #ddd;
        text-align: left;
    }
    
    table th {
        background-color: #f4f4f4;
        font-weight: bold;
    }
    
    .loading-message,
    .error-message {
        text-align: center;
        font-size: 1.2rem;
        color: #ff4d4d;
    }
    
    /* Estilos do modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000; /* Adicionado para garantir que o modal esteja acima de outros elementos */
    }
    
    .modal-content {
        background-color: #fff;
        padding: 15px; /* Ajustado para diminuir a altura */
        border-radius: 8px;
        width: 500px; /* Ajuste da largura para permitir espaço para dois campos lado a lado */
        max-width: 90%; /* Para garantir que o modal não ultrapasse a tela em dispositivos menores */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        position: relative; /* Para posicionar o botão de fechar */
    }
    
    .close {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: #aaa;
    }
    
    .close:hover {
        color: #ff4d4d; /* Mudança de cor no hover */
    }
    
    .form-row {
        display: flex;
        justify-content: space-between; /* Espaçamento entre os campos */
        margin-bottom: 15px; /* Espaçamento entre linhas de campos */
    }
    
    .form-group {
        flex: 1; /* Cada grupo ocupa espaço igual */
        margin-right: 10px; /* Espaçamento entre os campos */
    }
    
    .form-group:last-child {
        margin-right: 0; /* Remove o espaçamento do último campo */
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    
    .form-group textarea {
        resize: vertical; /* Permite redimensionar verticalmente */
    }
    
    .submit-button {
        background-color: #28a745;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .submit-button:hover {
        background-color: #218838; /* Escurece ao passar o mouse */
    }
    </style>
    