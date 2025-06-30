import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({ contador: 250 }),
  getters: {
    getContador: state => state.contador
  },
  actions: {
    incrementarContador(paso) {
      this.contador += paso
    },
    decrementarContador(paso) {
      this.contador -= paso
    }
  },
})