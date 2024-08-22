<template>
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
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    props: {
      isSidebarCollapsed: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      toggleSidebar() {
        this.$emit('toggle-sidebar');
      }
    }
  }
  </script>
  
  <style scoped>
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
  </style>  