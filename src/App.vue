<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <header class="card-header text-center fw-bold">
        <h2>Todo Viajes - Argentina</h2>
      </header>

      <main class="card-body">
        <div>
         
            <ul class="list-group">
              <li class="list-group-item bg-secondary">  <RouterLink   to="/estado"> <h5>Tenemos {{ globalStore.getContador }} excusiones disponibles !!</h5></RouterLink></li>
            </ul>
        </div>
        <Navbar />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Excursiones from './components/Excursiones/index.vue'
import Inscripciones from './components/Inscripciones/index.vue'
import Turistas from './components/Turistas/index.vue'
import { useGlobalStore } from '@/stores/global'
import ServicioExcursiones from './servicios/excursiones'

export default {
  name: 'app',
  components: {
    Navbar,
    Excursiones,
    Inscripciones,
    Turistas
  },
  data() {
    return {
      globalStore: useGlobalStore(),
      servicioExcursiones: new ServicioExcursiones()
    }
  },
  async mounted() {

    const excursiones = await this.servicioExcursiones.getAll()
    this.globalStore.setExcursiones(excursiones)
  }
} 
</script>

<style scoped>
.card-header {
  background-color: rgb(128, 4, 0);
  color: white;
}

h5{
  
}
.list-group-item a{
  color: white;
  text-decoration: none;
  text-align: center;
}
</style>