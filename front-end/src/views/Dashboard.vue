<template>
  <div class="dashboard-container">
    <div :class="['sidebar', { 'sidebar-collapsed': isSidebarCollapsed }]">
      <div class="sidebar-title">
        <span v-if="!isSidebarCollapsed">Menu</span>
        <button @click="toggleSidebar" class="toggle-button">
          <span v-if="isSidebarCollapsed">☰</span>
          <span v-else>←</span>
        </button>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-item dropdown">
          <a href="#" class="dropdown-toggle">
            <img src="https://img.icons8.com/?size=100&id=k1xXzD3NEvLF&format=png&color=000000" alt="Cadastros" class="menu-icon" />
            <span v-if="!isSidebarCollapsed">Cadastros</span>
          </a>
          <ul class="dropdown-menu" v-if="!isSidebarCollapsed">
            <li class="dropdown-item">
              <router-link to="/usuarios">
                <img src="https://img.icons8.com/ios-filled/50/user.png" alt="Usuário" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Usuário</span>
              </router-link>
            </li>
            <li class="dropdown-item">
              <a href="#">
                <img src="https://img.icons8.com/ios-filled/50/map.png" alt="Bairro" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Logradouros</span>
              </a>
            </li>
            <li class="dropdown-item">
              <router-link to="/municipios">
                <img src="https://img.icons8.com/ios-filled/50/earth-planet.png" alt="Município" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Município</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div :class="['content', { 'content-expanded': isSidebarCollapsed }]">
      <div class="navbar">
        <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo">
        <button @click="logout" class="logout-button">Sair</button>
      </div>
      <div class="dashboard-content">
        <div class="card">
          <div class="card-header">
            <h3>Registrar nova fiscalização</h3>
          </div>
          <div class="card-body">
            <button @click="registerInspection" class="register-button">Registrar +</button>
          </div>
        </div>
        <!-- Outros conteúdos podem ser adicionados aqui -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    },
    registerInspection() {
      this.$router.push('/fiscalizacao/novo');
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
  background-color: #F4F7FA;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #008000; /* Verde harmonioso */
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

.sidebar {
  width: 240px;
  background-color: #008000;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 60px;
}

.toggle-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  transition: transform 0.3s ease;
}

.sidebar-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-item {
  position: relative;
}

.sidebar-item a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar-item a:hover {
  background-color: #228B22;
}

.menu-icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.dropdown-menu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #228B22;
  width: 200px;
  border-radius: 5px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.dropdown-item {
  margin-bottom: 0;
}

.dropdown-item a {
  padding: 10px 20px;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.dropdown-item a:last-child {
  border-bottom: none;
}

.dropdown-item a:hover {
  background-color: #006400;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  margin-top: 60px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.content-expanded {
  margin-left: 60px;
}

.dashboard-content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-width: 400px;
}

.card-header {
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.card-body {
  text-align: center;
}

.register-button {
  background-color: #008000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #006400;
}
</style>
