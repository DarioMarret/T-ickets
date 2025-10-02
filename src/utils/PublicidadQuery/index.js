import axios from "axios"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
export const agregarNoticia = async (datos) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...datos,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_publicidad", parmspro, {
            header: {
                'Content-Type': 'application/json',
                'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
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
                'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error

    }
}
export const Actualizarpublicdad = async (id, parms) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_publicidad/" + id, {...parms,parmspro}, {
            headers: {
                'Content-Type': 'application/json',
                'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const Eliminarpublici = async (parms) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar_publicidad/" + parms,parmspro, {
            headers: {
                'Content-Type': 'application/json',
                'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}