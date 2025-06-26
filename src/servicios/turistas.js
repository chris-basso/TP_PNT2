import axios from "axios"
class ServicioTuristas {
    #url

    constructor() {
        // this.#url = 'https://683cd1f0199a0039e9e3803f.mockapi.io/apitp3/Usuarios'
        this.#url = 'https://683e444a1cd60dca33dadfc0.mockapi.io/Turistas'
    }

    getAll = async () => {
        try {
            const { data: turistas } = await axios.get(this.#url)
            return turistas
        }
        catch (error) {
            console.error("Error turistas GET", error)
        }
    }

    post = async turista => {
        try {
            const { data: turistaGuardado } = await axios.post(this.#url, turista)
            return turistaGuardado
        }
        catch (error) {
            console.error("Error turistas POST", error)

        }
    }
}

export default ServicioTuristas