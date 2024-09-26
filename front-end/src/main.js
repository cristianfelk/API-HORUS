import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import VueCarousel from 'vue-carousel';

const vuetify = createVuetify({});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueCarousel); 

app.mount('#app');
