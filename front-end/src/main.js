import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import VueCarousel from 'vue-carousel';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'; // Certifique-se de importar apenas uma vez.

const vuetify = createVuetify({});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(VueCarousel); 

app.component('LMap', LMap);
app.component('LTileLayer', LTileLayer);
app.component('LMarker', LMarker);

app.mount('#app');
