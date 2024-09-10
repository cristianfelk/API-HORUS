<template>
<nav class="navbar">
    <div class="navbar-left">
        <img @click="goDashboard" src="@/assets/logoPzo.png" alt="Logo" class="logo" />
    </div>
    <div class="navbar-right">
        <button @click="logout" class="logout-btn">Sair</button>
    </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            this.$router.push('/');
        },
        goDashboard() {
            this.$router.push('/dashboard');
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 9999;
}

.logo {
    height: 40px;
    cursor: pointer;
}

.logout-btn {
    background-color: #ff5f5f;
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.logout-btn:hover {
    background-color: #ff1f1f;
}

@media (max-width: 768px) {
    .navbar {
        padding: 10px;
    }

    .logout-btn {
        font-size: 14px;
        padding: 8px 16px;
    }

    .logo {
        height: 35px;
    }
}
</style>
