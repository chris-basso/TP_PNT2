<template>
  <section class="card">
    <div class="card-header">
      <h3>Estado de las excursiones de la semana</h3>
    </div>
    <div class="card-body">
      <h4>Excursiones completas esta semana: {{ globalStore.getContador }}</h4>
      <button class="btn btn-primary my-3" @click="incrementar">Agregar </button>


      <div v-for="(excursion, index) in excursiones" :key="index"
        class="media alert alert-secondary mb-3 d-flex align-items-center" :class="colorTarjeta(excursion)">
        <img :src="excursion.fotoGuia" width="150" class="me-3">
        <div>
          <h5 class="mb-3">Código de excursión: {{ excursion.id }}</h5>
          <p><b>Nombre de guía:</b> {{ excursion.nombreGuia }}</p>
          <p><b>Lugar de Partida:</b> <i>{{ excursion.partida }}</i></p>
          <p><b>Lugar de Destino:</b> <i>{{ excursion.destino }}</i></p>
          <p><b>Día:</b> <i>{{ excursion.dia }}</i></p>
          <p><b>Capacidad:</b> {{ excursion.capacidadTotal }}</p>
          <p><b>Turistas inscriptos:</b> {{ excursion.capacidadOcupada }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ServicioExcursiones from '@/servicios/excursiones.js'
import { useGlobalStore } from '@/stores/global'
export default {
  name: 'estado',
  props: [],
  mounted() {
    console.log('Registro -> mounted')
    this.obtener()
    
  },
  data() {
    return {
      globalStore: useGlobalStore(),
      servicioExcursiones: new ServicioExcursiones(),
      excursiones: [],
    }
  },
  methods: {
    incrementar() {
      console.log('incrementar')
      this.globalStore.incrementarContador(1)
    },
    async obtener() {
      const excursiones = await this.servicioExcursiones.getAll()
      this.excursiones = excursiones
      this.globalStore.contador = this.excursionesDisponibles

    },
    colorTarjeta(excursion) {
      const dif = excursion.capacidadTotal - excursion.capacidadOcupada
      if (dif <= 0) return 'alert-danger'
      return 'alert-success'
    }
  },
  computed: {
    excursionesDisponibles(){
      let contador = 0
      this.excursiones.forEach(e => {
        const dif = e.capacidadTotal - e.capacidadOcupada
        if (dif > 0) {
          contador++
        }
      });
      return contador
    }
  }
}
</script>

<style scoped>
.card-header {
  background-color: rgb(128, 4, 0);
  color: white;
}
</style>
