<template>
<nav class="navbar">
    <div class="navbar-left">
        <img @click="goDashboard" src="@/assets/logoPzo.png" alt="Logo" class="logo" />
    </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
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

@media (max-width: 768px) {
    .navbar {
        padding: 10px;
    }

    .logo {
        height: 35px;
    }
}
</style>
