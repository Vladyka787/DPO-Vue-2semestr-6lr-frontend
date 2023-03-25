import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import vuedraggable from "vuedraggable/src/vuedraggable";

createApp(App)
    .use(router)
    .use(vuedraggable)
    .mount('#app')
