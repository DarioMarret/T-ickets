import axios from "axios"
export const cargarMapa = async () => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/backend/listarMapas", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const guardarMapar = async (parm) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/backend/guardarMapa", parm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const editarMapa = async (parm) => {
    try {
        const { data } = await axios.put("https://api.t-ickets.com/backend/actualizarMapa", parm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const eliminaMapa = async (parm) => {
    try {
        const { data } = await axios.delete("https://api.t-ickets.com/backend/eliminarMapa/" + parm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}