<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo" @click="goHome" />
      <ul class="navbar-links" :class="{ 'is-active': isMenuOpen }">
        <li><a href="#prevention" @click="scrollToSection('prevention')">Prevenção</a></li>
        <li><a href="#symptoms" @click="scrollToSection('symptoms')">Sintomas</a></li>
        <li><a href="#contact" @click="scrollToSection('contact')">Contato</a></li>
      </ul>
      <button class="login-btn" @click="login">Login</button>
      <button class="hamburger" @click="toggleMenu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    scrollToSection(section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    login() {
      this.$router.push('/HomeLogin');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #69c369;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  height: 50px;
  cursor: pointer;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar-links li {
  display: inline;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #f1f1f1;
}

.login-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #ff1a1a;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .navbar-links {
    position: fixed;
    top: 60px;
    right: 0;
    background-color: #69c369;
    flex-direction: column;
    width: 100%;
    height: calc(40vh - 80px);
    display: none;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .navbar-links.is-active {
    display: flex;
  }

  .navbar-links li {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }

  .hamburger {
    display: flex;
  }

  .login-btn {
    display: block;
    margin-left: 10px;
  }
}

@media (max-width: 480px) {
  .navbar-links {
    right: 0;
    width: 100%;
  }

  .login-btn {
    display: block; /* Exibe o botão de login mesmo em telas pequenas */
    margin-left: 10px; /* Ajuste de espaçamento */
  }
}
</style>
