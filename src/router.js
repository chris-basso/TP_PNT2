import { createRouter, createWebHistory } from "vue-router";

import Registro from "./components/Registro/index.vue";
import Excursiones from "./components/Excursiones/index.vue";
import Inscripciones from "./components/Inscripciones/index.vue";
import Turistas from "./components/Turistas/index.vue";
import Estado from "./components/Estado/index.vue";

const routes = [
    { path: '/registro', component: Registro },
    { path: '/excursiones', component: Excursiones },
    { path: '/inscripciones', component: Inscripciones },
    { path: '/turistas', component: Turistas },
    { path: '/estado', component: Estado },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router