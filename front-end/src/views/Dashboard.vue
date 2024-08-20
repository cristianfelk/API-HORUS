<template>
  <div>
    <div class="navbar">
      <div class="navbar-title">Bem-vindo ao Sistema!</div>
      <button @click="logout" class="logout-button">Sair</button>
    </div>
    <div class="dashboard-content">
      <!-- Aqui você pode adicionar o conteúdo do seu dashboard -->
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
/* Remove qualquer margem padrão no corpo da página */
body {
  margin: 0;
}

/* Estilos para a navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
  padding: 10px 20px;
  color: white;
  position: fixed; /* Fixa a navbar no topo da página */
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Garante que a navbar fique sobre outros conteúdos */
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
}

.logout-button {
  background-color: rgba(34, 139, 34, 1); /* Verde igual ao botão de login */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px; /* Ajusta a posição do botão para a esquerda */
}

.logout-button:hover {
  background-color: rgba(34, 139, 34, 0.8); /* Efeito hover */
}

/* Ajusta o conteúdo para que não fique oculto atrás da navbar fixa */
.dashboard-content {
  padding: 80px 20px 20px; /* Espaço no topo para a navbar */
}
</style>
