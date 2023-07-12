import axios from "axios"
export const agregarNoticia = async (datos) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_publicidad", datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {

    }
}
export const ListarNoticias = async () => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_publicidad", {
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
export const Actualizarpublicdad = async (id, parms) => {
    try {
        const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_publicidad/" + id, parms, {
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
export const Eliminarpublici = async (parms) => {
    try {
        const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar_publicidad/" + parms, {
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