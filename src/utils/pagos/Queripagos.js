import axios from "axios";
import { Host } from "utils/constantes";


export const registraPagos = async (parms) => {
    try {
        let { data } = await axios.post(Host + "api/v1/registraPagos ", parms, {
            Headers: {
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
export const listarRegistropanel = async (parms) => {
    try {
        let { data } = await axios.post(Host + "api/v1/listarRegistros", parms, {
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
export const generarBoleto = async () => {
    try {
        let { data } = await axios.post(Host + "api/v1/generarBoleto", parms, {
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
export const eliminarRegistro = async (parms) => {
    try {
        let { data } = await axios.post(Host + "api/v1/eliminarRegistro",
            parms, {
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
export const eliminartiket = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login//ticket_usuario_eliminar",
            parms, {
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
export const cambiarMetodo = async (parms) => {
    try {
        let { data } = await axios.post(Host + "api/v1/cambiandoMetodoPago", parms, {
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