<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="sidebar-title">Menu</div>
      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/50/user.png" alt="Usuário" class="menu-icon" />
            Usuário
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/50/map.png" alt="Bairro" class="menu-icon" />
            Bairro
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#">
            <img src="https://img.icons8.com/ios-filled/50/earth-planet.png" alt="Município" class="menu-icon" />
            Município
          </a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="navbar">
        <div class="navbar-title">Bem-vindo ao Sistema!</div>
        <button @click="logout" class="logout-button">Sair</button>
      </div>
      <div class="dashboard-content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    logout() {
      localStorage.removeItem('authToken'); // Remove o token do localStorage
      this.$router.push('/'); // Redireciona para a página de login
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 90vh;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
  padding: 10px 20px;
  color: white;
  z-index: 1000; /* Garante que a navbar fique sobre outros conteúdos */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* Ajuste conforme necessário */
}

.sidebar {
  width: 220px;
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: fixed;
  top: 60px; /* Alinha o sidebar logo abaixo da navbar */
  left: 0;
  bottom: 0;
}

.sidebar-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-item {
  margin-bottom: 5px;
}

.sidebar-item a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
}

.sidebar-item a:hover {
  background-color: rgba(34, 139, 34, 0.8); /* Efeito hover */
}

.menu-icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

/* Estilo do conteúdo do dashboard */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 220px; /* Compensa a largura do sidebar */
  margin-top: 60px; /* Compensa a altura da navbar */
  padding: 20px;
}

.dashboard-content {
  padding: 20px;
}

</style>
