import ServicioExcursiones from '@/servicios/excursiones.js'
export default {
  name: 'registro',
  props: [],
  mounted() {
    console.log('Registro -> mounted')
    this.obtener()
  },
  data() {
    return {
      servicioExcursiones: new ServicioExcursiones(),
      excursiones: [],
      excursion: this.iniForm(),
      excursionDirty: this.iniForm(),
      idEditar: null
    }
  },
  methods: {
    iniForm() {
      return {
        id: null,
        partida: null,
        destino: null,
        dia: null,
        nombreGuia: null,
        capacidadTotal: null,
        capacidadOcupada: null,
        precio: null,
      }
    },

    async obtener() {
      const excursiones = await this.servicioExcursiones.getAll()

      this.excursiones = excursiones
    },

    validarBotonEnvio() {
      return !this.errorPartida.ok || !this.errorDestino.ok || !this.errorDia.ok || !this.errorCapacidadTotal.ok || !this.errorCapacidadOcupada.ok || !this.errorPrecio.ok || !this.errorNombreGuia.ok 
    },

    async enviarActualizar() {
      const excursion = { ...this.excursion }


      if (!this.idEditar) {
        console.log('enviar', excursion)

        const excursionGuardado = await this.servicioExcursiones.post(excursion)

        this.excursiones.push(excursionGuardado)
      }
      else {
        console.log('actualizar', excursion)

        excursion.id = this.idEditar

        const excursionActualizado = await this.servicioExcursiones.put(this.idEditar, excursion)

        const index = this.excursiones.findIndex(e => e.id === this.idEditar)
        this.excursiones.splice(index, 1, excursionActualizado)

        this.idEditar = null
      }

      this.excursion = this.iniForm()

      this.excursionDirty = this.iniForm()
    },

    borrarTodo() {
      this.excursiones = []
    },

    ponerCancel(id) {
      return this.idEditar && this.idEditar == id
    },

    editar(id) {
      console.log('editar', id)

      if (!this.idEditar || this.idEditar != id) {
        this.excursion = { ...this.excursiones.find(p => p.id == id) }
        this.idEditar = id
      }
      else {
        this.idEditar = null
        this.excursion = this.iniForm()
      }
    },
    async borrar(id) {
      console.log('borrar', id)

      if (confirm('¿Desea borrar el excursion?')) {

        const excursionEliminado = await this.servicioExcursiones.delete(id)

        const index = this.excursiones.findIndex(p => p.id === excursionEliminado.id)
        this.excursiones.splice(index, 1)
      }
    },
  },
  computed: {
    errorPartida() {
      let mensaje = ''
      if (!this.excursion.partida) mensaje = 'Campo requerido'
      else if (this.excursion.partida?.length < 3) mensaje = 'Este campo debe poseer como mínimo 5 caracteres'
      else if (this.excursion.partida?.length > 20) mensaje = 'Este campo debe poseer como máximo 20 caracteres'

      return {
        mostrar: mensaje != '' && this.excursion.partida,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorDestino() {
      let mensaje = ''
      if (!this.excursion.destino) mensaje = 'Campo requerido'
      else if (this.excursion.destino?.length < 3) mensaje = 'Este campo debe poseer como mínimo 5 caracteres'
      else if (this.excursion.destino?.length > 20) mensaje = 'Este campo debe poseer como máximo 20 caracteres'

      return {
        mostrar: mensaje != '' && this.excursion.destino,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorDia() {
      let mensaje = ''
      if (!this.excursion.dia) mensaje = 'Campo requerido'

      return {
        mostrar: mensaje != '' && this.excursion.dia,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorNombreGuia() {
      let mensaje = ''
      if (!this.excursion.nombreGuia) mensaje = 'Campo requerido'
      else if (this.excursion.nombreGuia?.length < 5) mensaje = 'Este campo debe poseer como mínimo 5 caracteres'
      else if (this.excursion.nombreGuia?.length > 20) mensaje = 'Este campo debe poseer como máximo 20 caracteres'

      return {
        mostrar: mensaje != '' && this.excursion.nombreGuia,
        mensaje,
        ok: mensaje == ''
      }
    },

    errorCapacidadTotal() {
      let mensaje = ''
     if (this.excursion.capacidadTotal === null || this.excursion.capacidadTotal === undefined || this.excursion.capacidadTotal === '') mensaje = 'Campo requerido'
      else if (isNaN(this.excursion.capacidadTotal)) mensaje = 'La capacidad total debe ser un número'
      else if (this.excursion.capacidadTotal < 1) mensaje = 'La capacidad total debe ser mayor a 0'
      else if (this.excursion.capacidadTotal > 1000) mensaje = 'La capacidad total no puede ser mayor a 1000'
      else if (this.excursion.capacidadTotal < this.excursion.capacidadOcupada) mensaje = 'La capacidad total no puede ser menor a la capacidad ocupada'

      return {
        mostrar: mensaje != '' && this.excursion.capacidadTotal,
        mensaje,
        ok: mensaje == ''
      }
    },

    errorCapacidadOcupada() {
      let mensaje = ''
      if (this.excursion.capacidadOcupada === null || this.excursion.capacidadOcupada === undefined || this.excursion.capacidadOcupada === '') mensaje = 'Campo requerido'
      else if (isNaN(this.excursion.capacidadOcupada)) mensaje = 'La capacidad ocupada debe ser un número'
      else if (this.excursion.capacidadOcupada < 0) mensaje = 'La capacidad ocupada no puede ser negativa'
      else if (this.excursion.capacidadOcupada > this.excursion.capacidadTotal) mensaje = 'La capacidad ocupada no puede ser mayor a la capacidad total'
      else if (this.excursion.capacidadOcupada > 1000) mensaje = 'La capacidad ocupada no puede ser mayor a 1000'

      return {
        mostrar: mensaje != '' && this.excursion.capacidadOcupada,
        mensaje,
        ok: mensaje == ''
      }
    },

    errorPrecio() {
      let mensaje = ''
      if (!this.excursion.precio) mensaje = 'Campo requerido'
      else if (isNaN(this.excursion.precio)) mensaje = 'El precio debe ser un número'
      else if (this.excursion.precio < 0) mensaje = 'El precio no puede ser negativo'
      else if (this.excursion.precio > 100000) mensaje = 'El precio no puede ser mayor a 100000'

      return {
        mostrar: mensaje != '' && this.excursion.precio,
        mensaje,
        ok: mensaje == ''
      }
    }
  }
}