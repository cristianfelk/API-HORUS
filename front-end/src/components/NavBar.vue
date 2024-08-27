<template>
<div class="navbar">
    <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo" @click="goBack">
    <button @click="logout" class="logout-button">Sair</button>
</div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            this.$router.push('/');
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #69c369;
    padding: 10px 20px;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.navbar-logo {
    height: 50px;
    margin-right: auto;
    cursor: pointer;
}

.logout-button {
    background-color: #FF6F61;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #E55D4E;
}
</style>
