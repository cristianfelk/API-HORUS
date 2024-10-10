<template>
<div class="prevencao-container">
    <Navbar />

    <div class="prevencao-content">
        <h1>Prevenção Contra a Dengue</h1>
        <p>
            A dengue é uma doença transmitida pelo mosquito Aedes aegypti, e prevenir sua proliferação é essencial.
            Siga estas dicas para se proteger:
        </p>

        <ul>
            <li>Mantenha a caixa d'água bem fechada.</li>
            <li>Limpe frequentemente calhas e ralos para evitar o acúmulo de água.</li>
            <li>Evite acumular água em vasos de plantas e pneus velhos.</li>
            <li>Descarte corretamente recipientes que possam acumular água.</li>
            <li>Use repelente e mantenha portas e janelas fechadas ou com telas.</li>
        </ul>

        <div class="img-container">
            <img src="@/assets/prevencao.png" alt="Prevenção contra a dengue" />
        </div>
    </div>
</div>
</template>

  
<script>
import Navbar from "@/components/NavBarHome.vue";

export default {
    name: "PrevencaoDengue",
    components: {
        Navbar,
    },
};
</script>

  
<style scoped>
.prevencao-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.prevencao-content {
    max-width: 900px;
    text-align: center;
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.prevencao-content h1 {
    font-size: 2.5rem;
    color: #006400;
    margin-bottom: 20px;
}

.prevencao-content p {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 30px;
}

.prevencao-content ul {
    list-style: none;
    padding: 0;
}

.prevencao-content ul li {
    font-size: 1.1rem;
    margin: 10px 0;
    background-color: #e0f7fa;
    padding: 15px;
    border-radius: 5px;
}

.img-container {
    margin-top: 30px;
}

.img-container img {
    max-width: 100%;
    border-radius: 10px;
}
</style>
