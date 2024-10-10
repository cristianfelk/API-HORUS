<template>
<div>
    <Navbar />

    <div class="home-container">
        <section class="carousel">
            <div class="carousel-container">
                <button @click="prevImage" class="carousel-control prev">‹</button>
                <img :src="currentImage" class="carousel-image" alt="Imagem de Prevenção à Dengue" />
                <button @click="nextImage" class="carousel-control next">›</button>
            </div>
        </section>

        <section class="hero">
            <div class="hero-content">
                <h1 class="title">Prevenção e Controle da Dengue</h1>
                <p class="subtitle">Saiba mais sobre a dengue, seus sintomas e como preveni-la. Proteja você e sua família.</p>
                <button class="learn-more" @click="navigateTo('prevention')">Saiba Mais</button>
            </div>
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

        <div class="map-container">
            <div id="map" class="map"></div>
        </div>

        <section class="info-section" id="prevention">
            <div class="info-card">
                <h2>O que é Dengue?</h2>
                <p>A dengue é uma doença viral transmitida pelo mosquito Aedes aegypti. Os sintomas incluem febre alta, dores no corpo, manchas na pele e outros.</p>
            </div>

            <div class="info-card" id="symptoms">
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
                <p>A melhor forma de prevenir a dengue é evitar a proliferação do mosquito Aedes aegypti. Evite água parada e mantenha a higiene dos ambientes.</p>
            </div>
        </section>

        <section class="call-to-action">
            <div class="denuncia-container">
                <h2>Proteja sua comunidade!</h2>
                <p>Denuncie focos de mosquito ou participe de campanhas de prevenção.</p>
                <button class="action-button" @click="navigateTo('report')">Denuncie Focos de Mosquito</button>
            </div>

            <div class="contact-info-container">
                <div class="contact-info" id="contact">
                    <p>Se você tem dúvidas ou deseja mais informações sobre como combater a dengue, entre em contato conosco:</p>
                    <ul>
                        <li><strong>Email:</strong> contato@prevencaodengue.com</li>
                        <li><strong>Telefone:</strong> (11) 1234-5678</li>
                        <li><strong>Endereço:</strong> Rua Exemplo, 123 - Cidade, Estado</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/NavBarHome.vue';
import L from 'leaflet';
import {
    getMonitoramento,
    getFocosDengue
} from '../services/apiService';
import image1 from '../assets/contradengue.png';
import image2 from '../assets/acaodengue.png';
import image3 from '../assets/logoPzo.png';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            stats: {
                casos_ativos: 0,
                casos_confirmados: 0,
                casos_monitorados: 0,
                casos_mortes: 0,
            },
            defaultLat: -26.8481,
            defaultLng: -52.9885,
            map: null,
            images: [image1, image2, image3],
            currentIndex: 0,
            slideInterval: null,
        };
    },
    computed: {
        currentImage() {
            return this.images[this.currentIndex];
        },
    },
    created() {
        this.fetchStats();
        this.startAutoSlide();
    },
    mounted() {
        this.initMap();
        this.loadFocosDengue();
    },
    beforeDestroy() {
        this.stopAutoSlide();
    },
    methods: {
        navigateTo(section) {
            this.$router.push(`/${section}`);
        },
        initMap() {
            this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 14);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(this.map);
        },
        async fetchStats() {
            try {
                const response = await getMonitoramento();
                this.stats = response.data;
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            }
        },
        async loadFocosDengue() {
            try {
                const response = await getFocosDengue();
                const focos = response.data;
                focos.forEach(foco => {
                    const lat = parseFloat(foco.latitude);
                    const lng = parseFloat(foco.longitude);
                    L.circle([lat, lng], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5,
                        radius: 50,
                    }).addTo(this.map);
                });
            } catch (error) {
                console.error('Erro ao carregar focos de dengue:', error);
            }
        },
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        startAutoSlide() {
            this.slideInterval = setInterval(this.nextImage, 3000);
        },
        stopAutoSlide() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
            }
        },
    },
};
</script>

<style scoped>
.home-container {
    font-family: 'Roboto', sans-serif;
    color: #333;
    line-height: 1.6;
}

.carousel {
    text-align: center;
    margin: 20px 0;
    margin-top: 80px;
    margin-bottom: 20px;
}

.carousel-container {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 800px;
    height: 400px;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0 15px;
    cursor: pointer;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

.hero {
    background: url('https://example.com/dengue-banner.jpg') center/cover no-repeat;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-content {
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    padding: 30px;
    border-radius: 8px;
    animation: fadeIn 1.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.title {
    font-size: 3rem;
    font-weight: bold;
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.learn-more {
    background-color: #ff6f61;
    border: none;
    color: white;
    padding: 12px 24px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.learn-more:hover {
    background-color: #ff3d3d;
    transform: scale(1.05);
}

.stats-section {
    padding: 50px 20px;
    background-color: #f3f3f3;
}

.stats-card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}

.stats-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 23%;
    max-width: 300px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-5px);
}

.map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 450px;
    margin: 20px 0;
}

.map {
    width: 100%;
    max-width: 1000px;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.info-section {
    display: flex;
    justify-content: space-between;
    padding: 40px 20px;
    background-color: #fff;
}

.info-card {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 30%;
    transition: transform 0.3s ease;
}

.info-card:hover {
    transform: scale(1.05);
}

.call-to-action {
    background-color: #69c369;
    color: white;
    padding: 50px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.denuncia-container {
    background-color: #69c369;
    border-radius: 8px;
    padding: 15px;
    flex: 1;
    margin-top: 20px;
    margin-right: 20px;
}

.contact-info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.contact-info {
    background-color: #69c369;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
}

.action-button {
    background-color: #fff;
    color: #656464;
    border: 1px solid white;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.action-button:hover {
    background-color: #ff3d3d;
    color: white;
}

@media (max-width: 768px) {
    .carousel-container {
        height: 220px;
    }

    .hero {
        height: 35vh;
        padding: 20px;
    }

    .hero-content {
        padding: 20px;
    }

    .title {
        font-size: 2rem;
        line-height: 1.2;
    }

    .subtitle {
        font-size: 1rem;
        margin-bottom: 10px;
    }

    .learn-more {
        padding: 10px 20px;
        font-size: 1rem;
    }

    .stats-section {
        padding: 30px 10px;
    }

    .stats-card-container {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .stats-card {
        width: 90%;
        max-width: 300px;
        padding: 15px;
        text-align: center;
    }

    .map-container {
        height: 300px;
        width: 100%;
        margin-top: 20px;
    }

    .info-section {
        flex-direction: column;
        align-items: center;
        padding: 20px 10px;
    }

    .info-card {
        width: 90%;
        padding: 15px;
        margin-bottom: 15px;
    }

    .call-to-action {
        flex-direction: column;
        padding: 20px;
        text-align: center;
        gap: 20px;
    }

    .denuncia-container,
    .contact-info {
        width: 100%;
        padding: 15px;
        margin: 0;
    }
}

@media (max-width: 480px) {
    .carousel-container {
        height: 180px;
    }

    .title {
        font-size: 1.6rem;
        line-height: 1.1;
    }

    .subtitle {
        font-size: 0.9rem;
    }

    .learn-more,
    .action-button {
        font-size: 0.9rem;
        padding: 8px 16px;
    }

    .stats-card {
        width: 100%;
        max-width: 280px;
        padding: 12px;
    }

    .map-container {
        height: 250px;
    }

    .info-card {
        width: 100%;
        padding: 10px;
    }
}
</style>
