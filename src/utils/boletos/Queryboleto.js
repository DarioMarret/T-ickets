import axios from "axios";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { Host } from "utils/constantes";
export const generarBoleto = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post(Host + "/api/v1/generaboleto" + parmspro, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const generaPDF = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post(Host + "/api/v1/ticket_pdf", {...parms,...parmspro}, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const enviarEmail = async (parm) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        ...parm,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post(Host + "/api/v1/ticket_pdf", parmspro, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const CanjearBoletoRegistro = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        ... parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/canje_boleto", parmspro, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }

}
