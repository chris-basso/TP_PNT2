import axios from "axios"

class ServicioExcursiones {
    #url

    constructor() {
        this.#url = 'https://683cd1f0199a0039e9e3803f.mockapi.io/apitp3/Excursiones/'
    }

    getAll = async () => {
        try {
            const { data: excursiones } = await axios.get(this.#url)
            return excursiones
        }
        catch (error) {
            console.error("Error excursiones GET", error)
        }
    }

    post = async excursion => {
        try {
            const { data: excursionGuardado } = await axios.post(this.#url, excursion)
            return excursionGuardado
        }
        catch (error) {
            console.error("Error excursiones POST", error)

        }
    }

    put = async (id, excursion) => {
        try {
            const { data: excursionActualizado } = await axios.put(this.#url + id, excursion)
            return excursionActualizado
        }
        catch (error) {
            console.error("Error excursiones PUT", error)

        }
    }

    delete = async id => {
        try {
            const { data: excursionEliminado } = await axios.delete(this.#url + id)
            return excursionEliminado
        }
        catch (error) {
            console.error("Error excursiones DELETE", error)

        }
    }
}

export default ServicioExcursiones