<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <header class="card-header text-center fw-bold">
        <h2>Todo Viajes - Argentina</h2>
      </header>

      <main class="card-body">
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

export default {
  name: 'app',
  components: {
    Navbar,
    Excursiones,
    Inscripciones,
    Turistas
  }
}
</script>

<style scoped>
.card-header {
  background-color: rgb(128, 4, 0);
  color: white;
}
</style>