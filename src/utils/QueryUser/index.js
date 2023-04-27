import axios from "axios"
import { InstanciaGETAxios } from "utils/Instancias"
import { InstanciaAxio } from "utils/Instancias"
/**Crear nuevo usuario */
export const CrearUser = async (parms) => {
    try {
        const { data } = await InstanciaAxio.post("crear_admin", parms)
        return data
    } catch (error) {
        return error
    }

}
/**Listar usuarios */
export const GetUserList = async () => {
    try {
        const { data } = await InstanciaAxio.get("listar_admin")
        return data;
    } catch (error) {
        return error
    }

}
/**Editar User
 * @id id de usuario a editar
 * @parms campos a editar
 */
export const EditUser = async (id, parms) => {
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/actualizar_user/" + id, parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Eliminar Usuario por el is */
export const EliminaUser = async (id) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar/" + id, {
        headers: {
            'Content-Type': 'aplication/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const ObtenerPermisos = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_perfiles")
        return data
    } catch (error) {
        return error
    }
}
export const ObtnerCiudades = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_ciudades")
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerFormaforPago = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_formas_pago")
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerEstadosforEventos = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_estado_eventos")
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerEstadosforAsientos = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_estados_asientos")
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerlistBancos = async () => {
    try {
        let { data } = await InstanciaGETAxios.get("listar_bancos")
        return data
    } catch (error) {
            return error
    }
}
