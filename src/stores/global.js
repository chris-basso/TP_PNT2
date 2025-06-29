import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({ contador: 0 }),
  getters: {
    getContador: state => state.contador
  },
  actions: {
    incrementarContador(paso) {
      this.contador += paso
    },
  },
})