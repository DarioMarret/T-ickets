import axios from "axios"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
export const GetSuscritores = async (ini, fin) => {
    const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listas_suscriptor?init=" + ini + "&size=" + fin, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Editar subscritores */
export const EditarSuscrito = async (id, parms) => {
    try {

        console.log(parms, id)
        let ids = clienteInfo() != null ? clienteInfo().id : 0
        let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
        let parmspro = {
            "id_usuario": parseInt(idop),
            "id_operador": parseInt(ids),
        }
        const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/actualizar_suscriptor/" + id, { ...parms, ...parmspro }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
/**
 * * Eliminar suscritor especifico
 */
export const EliminarSuscrito = async (id) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    const { data } = await axios.delete("https://api.ticketsecuador.ec/ms_login/api/v1/eliminar_suscriptor/" + id, parmspro, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data

}
export const CancelarSubscriptor = async (id) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    //console.log("query",id)   
    const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/cancelation_suscriptor/" + id, parmspro, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    //console.log("query",data)
    return data
}