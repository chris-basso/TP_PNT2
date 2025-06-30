import ServicioTuristas from '@/servicios/turistas'
export default {
  name: 'inscripciones',
  props: [],
  mounted() {
    console.log('Inscripciones -> mounted')
    this.obtener()
  },
  data() {
    return {
      servicioTuristas: new ServicioTuristas(),
      turistas: [],
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
    }
  },
  methods: {
    getInicialData() {
      return {
        nombre: null,
        edad: null,
        email: null,
        numeroTelefono: null,
        dia: null,
        pago: null
      }
    },
    async obtener() {
      const turistas = await this.servicioTuristas.getAll()

      this.turistas = turistas
    },

    validarBotonEnvio() {
      return !this.errorNombre.ok || !this.errorEdad.ok || !this.errorEmail.ok || !this.errorNumeroTelefono.ok || !this.errorDia.ok || !this.errorPago.ok
    },

    async enviar() {
      const datos = { ...this.formData }
      console.log(datos)
      this.formData = this.getInicialData()
      this.formDirty = this.getInicialData()
      const turistaGuardado = await this.servicioTuristas.post(datos)
      this.turistas.push(turistaGuardado)
    }
  },
  computed: {
    errorNombre() {
      let mensaje = ''
      if (!this.formData.nombre) mensaje = 'Campo requerido'
      else if (this.formData.nombre?.length < 5) mensaje = 'Este campo debe poseer como mínimo 5 caracteres'
      else if (this.formData.nombre?.length > 15) mensaje = 'Este campo debe poseer como máximo 15 caracteres'
      else if (this.formData.nombre.includes(' ')) mensaje = 'Este campo no permite espacios intermedios'

      return {
        mostrar: mensaje != '' && this.formDirty.nombre,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorEdad() {
      let mensaje = ''
      if (!this.formData.edad) mensaje = 'Campo requerido'
      else if (this.formData.edad < 18) mensaje = 'Debe ingresar un edad mayor a 18 años.'
      else if (this.formData.edad > 120) mensaje = 'Debe ingresar una edad menor a 120 años.'

      return {
        mostrar: mensaje != '' && this.formDirty.edad,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorEmail() {

      let mensaje = ''
      if (!this.formData.email) mensaje = 'Campo requerido'
      else if (!this.formData.email.includes('@')) mensaje = 'Debe ingresar un email válido'
      else if (!this.formData.email.includes('.')) mensaje = 'Debe ingresar un email válido'
      else if (this.formData.email?.length < 5) mensaje = 'Este campo debe poseer como mínimo 5 caracteres'
      else if (this.formData.email?.length > 50) mensaje = 'Este campo debe poseer como máximo 50 caracteres'
      else if (this.formData.email.includes(' ')) mensaje = 'Este campo no permite espacios intermedios'
      else if (!this.formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) mensaje = 'Debe ingresar un email válido'

      return {
        mostrar: mensaje != '' && this.formDirty.email,
        mensaje,
        ok: mensaje == ''
      }
    },

    errorNumeroTelefono() {
      let mensaje = ''
      if (!this.formData.numeroTelefono) mensaje = 'Campo requerido'
      else if (this.formData.numeroTelefono?.length < 10) mensaje = 'Este campo debe poseer como mínimo 10 caracteres'
      else if (this.formData.numeroTelefono?.length > 15) mensaje = 'Este campo debe poseer como máximo 15 caracteres'
      else if (this.formData.numeroTelefono.includes(' ')) mensaje = 'Este campo no permite espacios intermedios'
      else if (!/^\d+$/.test(this.formData.numeroTelefono)) mensaje = 'Este campo solo permite números'
      else if (!/^\d{10,15}$/.test(this.formData.numeroTelefono)) mensaje = 'Este campo debe contener entre 10 y 15 dígitos'

      return {
        mostrar: mensaje != '' && this.formDirty.numeroTelefono,
        mensaje,
        ok: mensaje == ''
      }
    },

    errorDia() {
      let mensaje = ''
      if (!this.formData.dia) mensaje = 'Campo requerido'

      return {
        mostrar: mensaje != '' && this.formDirty.dia,
        mensaje,
        ok: mensaje == ''
      }
    },
    errorPago() {
      let mensaje = ''
      if (!this.formData.pago) mensaje = 'Campo requerido'

      return {
        mostrar: mensaje != '' && this.formDirty.pago,
        mensaje,
        ok: mensaje == '',
      }
    }
  }
}