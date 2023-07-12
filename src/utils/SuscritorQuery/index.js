import axios from "axios"
export const GetSuscritores = async (ini,fin) => {
    const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listas_suscriptor?init="+ini+"&size="+fin, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Editar subscritores */
export const EditarSuscrito = async (id, parms) => {
    console.log(parms, id)
    const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_suscriptor/" + id, parms, {
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
    const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data

}
export const CancelarSubscriptor = async (id) => {
    //console.log("query",id)   
    const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/cancelation_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    //console.log("query",data)
    return data
}