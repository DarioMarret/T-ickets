import axios from "axios"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
export const cargarMapa = async () => {
    try {
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/listarMapas", {
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
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/guardarMapa", {...parm,...parmspro}, {
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
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/actualizarMapa", {...parm,...parmspro}, {
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
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.delete("https://api.ticketsecuador.ec/ms_login/eliminarMapa/" + parm,parmspro, {
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