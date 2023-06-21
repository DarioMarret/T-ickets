import axios from "axios"
import { InstanciaGETAxios } from "utils/Instancias"
import { InstanciaAxio } from "utils/Instancias"
export const GetSuscritores = async (ini, fin) => {
    const { data } = await InstanciaAxio.get("/listar_suscriptores?init=" + ini + "&size=" + fin)
    return data
}
export const Olvide_password = async (parms) => {
    try {
        let { data } = await InstanciaGETAxios.post("/olvide_password", parms)
        return data
    } catch (error) {
        return error
    }
}
/**Editar subscritores */
export const EditarSuscrito = async (id, parms) => {
    console.log(parms, id)
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/actualizar_suscriptor/" + id, parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    console.log(data)
    return data
}
/**
 * * Eliminar suscritor especifico
 */
export const EliminarSuscrito = async (id) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data

}
export const CancelarSubscriptor = async (id) => {
    //console.log("query",id)   
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/cancelation_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    //console.log("query",data)
    return data
}