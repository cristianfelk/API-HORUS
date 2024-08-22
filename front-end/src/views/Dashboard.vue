<template>
  <div class="dashboard-container">
    <Navbar />
    <SideBar :isSidebarCollapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
    <div :class="['content', { 'content-expanded': isSidebarCollapsed }]">
      <div class="dashboard-content">
        <div class="card">
          <div class="card-header">
            <h3>Registrar nova fiscalização</h3>
          </div>
          <div class="card-body">
            <button @click="registerInspection" class="register-button">Registrar +</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    SideBar
  },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
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