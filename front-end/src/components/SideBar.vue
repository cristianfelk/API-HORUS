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
        <!-- Cadastros -->
        <li class="sidebar-item dropdown">
            <a href="#" class="dropdown-toggle">
                <img src="https://img.icons8.com/?size=100&id=k1xXzD3NEvLF&format=png&color=000000" alt="Cadastros" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Cadastros</span>
            </a>
            <ul class="dropdown-menu" v-if="!isSidebarCollapsed">
                <li v-if="userProfile === 'admin'" class="dropdown-item">
                    <router-link to="/usuarios">
                        <img src="https://img.icons8.com/ios-filled/50/user.png" alt="Usuário" class="menu-icon" />
                        <span v-if="!isSidebarCollapsed">Usuário</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/logradouros">
                        <img src="https://img.icons8.com/ios-filled/50/map.png" alt="Logradouros" class="menu-icon" />
                        <span v-if="!isSidebarCollapsed">Logradouros</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/municipios">
                        <img src="https://img.icons8.com/ios-filled/50/earth-planet.png" alt="Município" class="menu-icon" />
                        <span v-if="!isSidebarCollapsed">Município</span>
                    </router-link>
                </li>
            </ul>
        </li>
        <!-- Controles -->
        <li v-if="userProfile === 'admin'" class="sidebar-item dropdown">
            <a href="#" class="dropdown-toggle">
                <img src="https://img.icons8.com/ios-filled/50/management.png" alt="Controles" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Controles</span>
            </a>
            <ul class="dropdown-menu" v-if="!isSidebarCollapsed">
                <li class="dropdown-item">
                    <router-link to="/denuncias">
                        <img src="https://img.icons8.com/ios-filled/50/complaint.png" alt="Denúncias" class="menu-icon" />
                        <span v-if="!isSidebarCollapsed">Denúncias</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/fiscalizacoes">
                        <img src="https://img.icons8.com/ios-filled/50/law.png" alt="Fiscalizações" class="menu-icon" />
                        <span v-if="!isSidebarCollapsed">Fiscalizações</span>
                    </router-link>
                </li>
            </ul>
        </li>
        <!-- Monitoramento -->
        <li v-if="userProfile === 'admin'" class="sidebar-item">
            <router-link to="/monitoramento">
                <img src="https://img.icons8.com/?size=100&id=2150&format=png&color=000000" alt="Monitoramento" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Monitoramento</span>
            </router-link>
        </li>
        <!-- Focos -->
        <li class="sidebar-item dropdown">
            <a href="#" class="dropdown-toggle">
                <img src="https://img.icons8.com/?size=100&id=4464&format=png&color=000000" alt="Focos" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Focos</span>
            </a>
            <ul class="dropdown-menu" v-if="!isSidebarCollapsed">
                <li class="dropdown-item">
                    <router-link to="/AdminFocoDengue">
                        <span v-if="!isSidebarCollapsed">Adicionar foco</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/RemoverFoco">
                        <span v-if="!isSidebarCollapsed">Remover foco</span>
                    </router-link>
                </li>
            </ul>
        </li>
        <!-- Relatórios -->
        <li v-if="userProfile === 'admin'" class="sidebar-item dropdown">
            <a href="#" class="dropdown-toggle">
                <img src="https://img.icons8.com/?size=100&id=57715&format=png&color=000000" alt="Relatórios" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Relatórios</span>
            </a>
            <ul class="dropdown-menu" v-if="!isSidebarCollapsed">
                <li class="dropdown-item">
                    <router-link to="/rel-denuncias">
                        <span v-if="!isSidebarCollapsed">Relatório de denúncias</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/rel-fiscalizacao">
                        <span v-if="!isSidebarCollapsed">Relatório de fiscalizações</span>
                    </router-link>
                </li>
                <li class="dropdown-item">
                    <router-link to="/rel-focos">
                        <span v-if="!isSidebarCollapsed">Relatório de focos</span>
                    </router-link>
                </li>
            </ul>
        </li>
        <!-- Logs -->
        <li v-if="userProfile === 'admin'" class="sidebar-item">
            <router-link to="/logs">
                <img src="https://img.icons8.com/?size=100&id=jmDBJzRWW4s0&format=png&color=000000" alt="Logs" class="menu-icon" />
                <span v-if="!isSidebarCollapsed">Logs</span>
            </router-link>
        </li>
    </ul>
    <div class="sidebar-footer">
        <button @click="logout" class="logout-button">
            <img src="https://img.icons8.com/ios-filled/50/exit.png" alt="Sair" class="menu-icon" />
            <span v-if="!isSidebarCollapsed">Sair</span>
        </button>
    </div>
</div>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        isSidebarCollapsed: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            userProfile: localStorage.getItem("userProfile"),
        };
    },
    methods: {
        toggleSidebar() {
            this.$emit("toggle-sidebar");
        },
        logout() {
            localStorage.removeItem("authToken");
            this.$router.push("/HomeLogin");
        },
    },
};
</script>

<style scoped>
.sidebar {
    width: 240px;
    background-color: #69c369;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

.sidebar-item a,
.sidebar-item button {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
}

.sidebar-item a:hover,
.sidebar-item button:hover {
    background-color: #5dad5d;
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
    background-color: #69c369;
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
    background-color: #5dad5d;
}

.dropdown:hover .dropdown-menu {
    display: block;
}

.sidebar-footer {
    margin-top: auto;
    padding-bottom: 20px;
}

.logout-button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #5dad5d;
}

@media (max-width: 390px) {
    .sidebar {
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        position: fixed;
    }
}
</style>
