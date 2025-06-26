import ServicioExcursiones from '@/servicios/excursiones.js'
export default {
  name: 'excursiones',
  props: [],
  mounted() {
    console.log('Registro -> mounted')
    this.obtener()
  },
  data() {
    return {
      servicioExcursiones: new ServicioExcursiones(),
      excursiones: [],
      mostrar: true,
    }
  },
  methods: {
    async obtener() {
      const excursiones = await this.servicioExcursiones.getAll()

      this.excursiones = excursiones
    },
  },
  computed: {
  }
}