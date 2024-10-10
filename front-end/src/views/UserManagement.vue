<template>
<div class="user-management-container">
    <Navbar />
    <div class="user-management">
        <h2 class="title">Gerenciamento de Usuários</h2>
        <div class="button-container">
            <button @click="createUser" class="create-button">Cadastrar Novo Usuário</button>
            <button @click="generatePDF" class="generate-pdf-button">Gerar Relatório PDF</button>
        </div>
        <div class="user-table-container">
            <table class="user-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Perfil</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.nome }}</td>
                        <td>{{ user.login }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.perfil }}</td>
                        <td>{{ user.status }}</td>
                        <td>
                            <button @click="editUser(user.id)" class="edit-button">Editar</button>
                            <button @click="confirmDelete(user.id)" class="delete-button">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showConfirmation" class="confirmation-popup">
            <p>Tem certeza que deseja excluir este usuário?</p>
            <button @click="deleteUser(currentUserId)" class="confirm-button">Sim</button>
            <button @click="cancelDelete" class="cancel-button">Não</button>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import {
    getUsers,
    deleteUser
} from '../services/apiService.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            users: [],
            showConfirmation: false,
            currentUserId: null,
            userProfile: localStorage.getItem('userProfile'), 
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await getUsers();
                this.users = response.data;
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        },
        createUser() {
            this.$router.push('/usuarios/novo');
        },
        editUser(userId) {
            this.$router.push(`/usuarios/${userId}/editar`);
        },
        confirmDelete(userId) {
            this.currentUserId = userId;
            this.showConfirmation = true;
        },
        async deleteUser(userId) {
            try {
                await deleteUser(userId);
                this.fetchUsers();
                this.showConfirmation = false;
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        },
        cancelDelete() {
            this.showConfirmation = false;
            this.currentUserId = null;
        },
        logout() {
            this.$router.push('/');
        },
        goHome() {
            this.$router.push('/dashboard');
        },
        generatePDF() {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text('Relatório de Usuários', 14, 20);

            doc.autoTable({
                startY: 30,
                head: [
                    ['Id', 'Nome', 'Login', 'Email', 'Status']
                ],
                body: this.users.map(user => [
                    user.id,
                    user.nome,
                    user.login,
                    user.email,
                    user.status
                ]),
                theme: 'striped'
            });

            doc.save('relatorio_usuarios.pdf');
        }
    },
    mounted() {
        if (this.userProfile !== 'admin') {
            alert('Acesso não autorizado. Você não tem permissão para acessar esta página.');
            this.$router.push('/'); 
        } else {
            this.fetchUsers(); 
        }
    },
}
</script>

<style scoped>
.user-management-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #f9f9f9;
}

.user-management {
    padding: 20px;
    margin-left: 0;
    margin-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px;
}

.create-button,
.generate-pdf-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    width: 100%;
}

.create-button {
    background-color: #69c369;
    color: white;
}

.create-button:hover {
    background-color: #5dad5d;
}

.generate-pdf-button {
    background-color: #007bff;
    color: white;
}

.generate-pdf-button:hover {
    background-color: #0056b3;
}

.user-table-container {
    width: 100%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.user-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
}

.user-table th,
.user-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    font-size: 14px;
}

.user-table th {
    background-color: #f2f2f2;
}

.user-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.user-table tr:hover {
    background-color: #f1f1f1;
}

.edit-button,
.delete-button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.edit-button {
    background-color: #007bff;
    color: white;
    border: none;
}

.edit-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
}

.delete-button:hover {
    background-color: #c82333;
}

.confirmation-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 80%;
    max-width: 400px;
}

.confirmation-popup p {
    margin-bottom: 20px;
}

.confirm-button,
.cancel-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
}

.cancel-button {
    background-color: #dc3545;
}

.confirm-button:hover {
    background-color: #0056b3;
}

.cancel-button:hover {
    background-color: #c82333;
}

@media (max-width: 768px) {
    .user-management {
        padding: 10px;
    }

    .title {
        font-size: 20px;
    }

    .button-container {
        flex-direction: column;
        gap: 10px;
    }

    .create-button,
    .generate-pdf-button {
        font-size: 14px;
    }

    .user-table-container {
        overflow-x: hidden;
    }

    .user-table {
        width: 100%;
        min-width: 100%;
        display: block;
        overflow-x: auto;
    }

    .user-table th,
    .user-table td {
        display: block;
        width: 100%;
    }

    .user-table td {
        border: none;
        border-bottom: 1px solid #ddd;
    }

    .user-table thead {
        display: none;
    }

    .user-table tr {
        margin-bottom: 10px;
        display: block;
    }

    .user-table td:before {
        content: attr(data-label);
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
    }
}
</style>
