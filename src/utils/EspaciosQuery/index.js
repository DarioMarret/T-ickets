import axios from "axios"
export const GuardarEspacio = async (parms) => {
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/gusdar_espacio", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}

export const ListarEspacios = async () => {
    const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_espacios", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
/** Verificar error 500 internal server error */
export const EliminarEspacios = async (parms) => {
    const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar_espacio/" + parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
export const ActualizarEspacio = async (parms) => {
    const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_espacio", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}