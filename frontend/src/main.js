import { createApp, markRaw } from 'vue'
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.css";
import './axios';
import App from './App.vue'
import router from './router'
import './assets/main.css'


const pinia = createPinia();
const app = createApp(App)

pinia.use(({store}) => {
    store.router = markRaw(router);
});

app.use(pinia)
app.use(router)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";