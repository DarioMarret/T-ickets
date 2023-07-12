import axios from "axios"
import { getDatosUsuariosLocalStorag, getCliente } from "./DatosUsuarioLocalStorag"
import { GetValores, GetMetodo, getVerTienda } from "./CarritoLocalStorang"
import { Host, Whatsappnumero, DatosUsuariocliente, Valores } from "./constantes"
/**
 * 
 * @returns {
 * success: boolean,
 * url: string,
 * }
 * 
 */
export const Authsucrito = async (parms) => {
    //console.log(parms)
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/auth_suscriptor", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    console.log(data)
    return data
}
export const GenerarLinkPagoMedios = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let concierto = getVerTienda()
    let valores = GetValores()
    let metodo = { "forma_paago": GetMetodo() }
    console.log("se esta generando")
    console.log(datosPersonal,
        valores,
        metodo,
        concierto)

    if (datosPersonal != null && valores != null) {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/pago_medio", {
            datosPersonal,
            valores,
            metodo,
            concierto
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log({
            datosPersonal,
            valores,
            metodo,
            concierto
        }, data
        )
        return data.data
    }
}
export const GuardarDatosdelComprador = async () => {
    let datosPerson = getDatosUsuariosLocalStorag()
    let datos = {
        cedula: datosPerson.cedula,
        ciudad: datosPerson.direccion,
        discapacidad: datosPerson.discapacidad,
        edad: datosPerson.edad,
        email: datosPerson.email,
        genero: datosPerson.genero,
        nombreCompleto: datosPerson.name,
        sexo: datosPerson.sexo,
        movil: datosPerson.whatsapp,
        password: datosPerson.cedula
    }
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_suscriptor",
        datos, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    }
    )

    return data

}
export const ValidarWhatsapp = async () => {
    let datosPerson = getDatosUsuariosLocalStorag()
    let nuemero = datosPerson.whatsapp
    const validanumero = nuemero.length == 10 ? nuemero.substring(1, 10) : nuemero
    const { data } = await axios.post("https://api.t-ickets.com/api_whatsapp_qr/api/validarNumero", { from: "593" + validanumero })
    console.log(validanumero, data)
    if (data.success && data.msg != null) {
        sessionStorage.setItem(Whatsappnumero, data.msg["_serialized"])
        return data.msg
    } else {

        return null
    }
}
let Produ = []
let message
export const EnviarmensajeWhastapp = async (parms) => {
    let valores = GetValores()
    let datosPerson = getDatosUsuariosLocalStorag()
    let lista = "593" + datosPerson.whatsapp + "@c.us"
    let from = sessionStorage.getItem(Whatsappnumero)
    Produ = getVerTienda()
    let codigo = parms != null ? "y por lo cual Deposite la cantidad de $" + (parseFloat(valores.comision) + parseFloat(valores.subtotal)).toFixed(2) + " con Código de depósito  " + parms : " "
    message = message = "Hola soy " + datosPerson.name + " con cédula " + datosPerson.whatsapp
    message = message + " seleccione "
    Produ != null ? Produ.map((e, i) => {
        message = message + " la cantidad de " + e.cantidad + " asiento para el concierto " + e.nombreConcierto + " de la localidad  " + e.localidad + ", "
    }) : ''
    message = message + codigo + " podría contactarse conmigo para terminar el proceso de compra"
    console.log("mensaje -->", message)
    return message
}
/**
 * Guargdar Pagos medios
 * @param {*} transaccion 
 * @returns 
 */
export const ReportarDepositoCompra = async (transaccion) => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let concierto = getVerTienda()
    let valores = GetValores()
    let metodo = GetMetodo()
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/pago_medio", {
        datosPersonal,
        valores,
        metodo,
        concierto,
        "transaccion": transaccion
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    }
    )
    return data;


}
/* *
*Guardar la compra y crear usuario no genera link de pago
*/
export const ReportarEfectivoCompra = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    //  let datosPersonal = { cedula: getDatosUsuariosLocalStorag().cedula }
    //let metodo = { "forma_paago": GetMetodo() }
    let concierto = getVerTienda()
    let valores = GetValores()
    let metodo = GetMetodo()
    //console.log({datosPersonal,concierto,valores,metodo})
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/pago_medio", {
        datosPersonal,
        valores,
        concierto,
        metodo,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    }
    )
    return data;

}

