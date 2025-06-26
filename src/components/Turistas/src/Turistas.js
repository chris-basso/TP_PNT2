import ServicioTuristas from '@/servicios/turistas'
export default {
  name: 'turistas',
  props: [],
  mounted() {
    console.log('Turistas -> mounted')
    this.obtener()
  },
  data() {
    return {
      servicioTuristas: new ServicioTuristas(),
      turistas: [],
      criterioDeBusquedaNombre: '',
      criterioDeBusquedaDia: '',
    }
  },
  computed: {
    turistasFiltrados() {
      return this.turistas.filter((turista) => {
        let registroNombre = `${turista.nombre} ${turista.apellido}`
        let registroDia = `${turista.dia}`
        return registroNombre.toLowerCase()
          .includes(this.criterioDeBusquedaNombre.toLowerCase()) &&
          registroDia.includes(this.criterioDeBusquedaDia)
      });
    },
    mostrarAdvertencia() {
      const shouldShow = (this.criterioDeBusquedaNombre.length > 0 &&
        this.criterioDeBusquedaNombre.length < 3) ||
        (this.criterioDeBusquedaDia.length > 0 &&
          this.criterioDeBusquedaDia.length < 3);
      console.log('mostrarAdvertencia:', shouldShow);
      return shouldShow;
    },
  },

  methods: {

    async obtener() {
      const turistas = await this.servicioTuristas.getAll()

      this.turistas = turistas
    },
    getNombre(turista) {
      return `${turista.nombre}`
    },
  }
}
