import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';

import App from './App.vue';
import router from './router';

// import './assets/main.css';
import 'vuetify/styles';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(createVuetify());

app.mount('#app');
