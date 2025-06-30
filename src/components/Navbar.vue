<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-2">
    <div class="container-fluid"> ">
      <RouterLink class="navbar-brand" to="/excursiones">Inicio</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/registro">Registro</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/excursiones">Excursiones</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/inscripciones">Inscripciones</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/turistas">Turistas</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/estado">Estado</RouterLink>
          </li>
          <li class="nav-item ">
            <RouterLink class="nav-link" to="/estado" style="font-style: italic">Ya hemos hecho {{
              globalStore.getExcursionesHechas }} excursiones esta semana!</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useGlobalStore } from '@/stores/global'
export default {
  name: 'navbar',
  props: [],
  data() {
    return {
      globalStore: useGlobalStore()
    }
  },

  computed: {

  }
}
</script>

<style scoped></style>