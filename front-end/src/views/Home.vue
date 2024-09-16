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

export default {
    components: {
        Navbar,
    },
    methods: {
        navigateTo(section) {
            if (section === 'prevention') {
                this.$router.push('/prevention');
            } else if (section === 'report') {
                this.$router.push('/report');
            }
        },
    },
};
</script>

<style scoped>
.home-container {
    font-family: Arial, sans-serif;
}

.home-content {
    margin-top: 80px;
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

.info-section {
    display: flex;
    justify-content: space-around;
    padding: 40px 20px;
    background-color: #f7f7f7;
}

.info-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 30%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.info-card p,
.info-card ul {
    font-size: 1rem;
    color: #333;
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
</style>
