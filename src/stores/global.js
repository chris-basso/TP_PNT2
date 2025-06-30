import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    excursiones: []
  }),
  getters: {
    getContador(state) {
      return state.excursiones.filter(e => 
        (e.capacidadTotal - e.capacidadOcupada) > 0
      ).length
    },
    getExcursionesHechas(state){
      return state.excursiones.filter(e => 
        (e.capacidadTotal - e.capacidadOcupada) <= 0
      ).length
    }
  },
  actions: {
    incrementarContador(paso) {
      this.contador += paso
    },
    setExcursiones(lista){
      this.excursiones = lista
    }
  },
})