<template>
  <div>
    <Navbar />

    <div class="home-container">
      <section class="hero">
        <div class="hero-content">
          <h1 class="title">Prevenção e Controle da Dengue</h1>
          <p class="subtitle">
            Saiba mais sobre a dengue, seus sintomas e como preveni-la. Proteja
            você e sua família.
          </p>
          <button class="learn-more" @click="navigateTo('prevention')">
            Saiba Mais
          </button>
        </div>
      </section>

      <section class="carousel">
        <vue-carousel :items="carouselItems" />
      </section>

      <section class="stats-section">
        <h2>Estatísticas Recentes</h2>
        <div class="stats-card-container">
          <div class="stats-card">
            <h3>Casos Ativos</h3>
            <p>{{ stats.casos_ativos }}</p>
          </div>
          <div class="stats-card">
            <h3>Casos Confirmados</h3>
            <p>{{ stats.casos_confirmados }}</p>
          </div>
          <div class="stats-card">
            <h3>Casos Monitorados</h3>
            <p>{{ stats.casos_monitorados }}</p>
          </div>
          <div class="stats-card">
            <h3>Mortes</h3>
            <p>{{ stats.casos_mortes }}</p>
          </div>
        </div>
      </section>

      <section class="info-section" id="prevention">
        <div class="info-card">
          <h2>O que é Dengue?</h2>
          <p>
            A dengue é uma doença viral transmitida pelo mosquito Aedes aegypti.
            Os sintomas incluem febre alta, dores no corpo, manchas na pele e
            outros.
          </p>
        </div>

        <div class="info-card">
          <h2>Sintomas da Dengue</h2>
          <ul>
            <li>Febre alta</li>
            <li>Dor de cabeça intensa</li>
            <li>Dores musculares e articulares</li>
            <li>Manchas vermelhas na pele</li>
            <li>Náusea e vômitos</li>
          </ul>
        </div>

        <div class="info-card">
          <h2>Como Prevenir?</h2>
          <p>
            A melhor forma de prevenir a dengue é evitar a proliferação do
            mosquito Aedes aegypti. Evite água parada e mantenha a higiene dos
            ambientes.
          </p>
        </div>
      </section>

      <section class="call-to-action">
        <h2>Proteja sua comunidade!</h2>
        <p>
          Denuncie focos de mosquito ou participe de campanhas de prevenção.
        </p>
        <button class="action-button" @click="navigateTo('report')">
          Denuncie Focos de Mosquito
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBarHome.vue';
import VueCarousel from 'vue-carousel';
import { getMonitoramento } from '../services/apiService';

export default {
  components: {
    Navbar,
    VueCarousel
  },
  data() {
    return {
      carouselItems: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ],
      stats: {
        casos_ativos: 0,
        casos_confirmados: 0,
        casos_monitorados: 0,
        casos_mortes: 0
      }
    };
  },
  created() {
    this.fetchStats();
  },
  methods: {
    navigateTo(section) {
      if (section === 'prevention') {
        this.$router.push('/prevention');
      } else if (section === 'report') {
        this.$router.push('/report');
      }
    },
    async fetchStats() {
      try {
        const response = await getMonitoramento();
        this.stats = response.data;
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  font-family: Arial, sans-serif;
}

.hero {
  background: url('https://example.com/dengue-banner.jpg') center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.hero-content {
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.learn-more {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.learn-more:hover {
  background-color: #ff1a1a;
}

.carousel {
  padding: 20px;
  background-color: #f7f7f7;
}

.stats-section {
  padding: 40px 20px;
  background-color: #f7f7f7;
}

.stats-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.stats-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 45%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stats-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.stats-card p {
  font-size: 1.5rem;
  color: #333;
}

.stats-card:hover {
  transform: scale(1.05);
}

.info-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 40px 20px;
  background-color: #f7f7f7;
}

.info-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: scale(1.05);
}

.call-to-action {
  background-color: #69c369;
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.call-to-action h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.call-to-action p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.action-button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #ff1a1a;
}

@media (max-width: 768px) {
  .hero {
    height: 50vh;
  }

  .hero-content {
    padding: 15px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .info-card {
    width: 80%;
  }

  .stats-card {
    width: 100%;
  }

  .call-to-action h2 {
    font-size: 1.5rem;
  }

  .call-to-action p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    height: 40vh;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .learn-more {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .info-card {
    width: 100%;
  }

  .stats-card {
    width: 100%;
  }

  .call-to-action h2 {
    font-size: 1.2rem;
  }

  .call-to-action p {
    font-size: 0.9rem;
  }

  .action-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
