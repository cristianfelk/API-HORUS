<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img src="@/assets/logoPzo.png" alt="Logo" class="navbar-logo" @click="goHome" />
      <ul class="navbar-links">
        <li><a href="#prevention" @click="scrollToSection('prevention')">Prevenção</a></li>
        <li><a href="#symptoms" @click="scrollToSection('symptoms')">Sintomas</a></li>
        <li><a href="#contact" @click="scrollToSection('contact')">Contato</a></li>
      </ul>
      <button class="login-btn" @click="login">Login</button>
    </div>
  </nav>
</template>

<script>
export default {
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
</style>
