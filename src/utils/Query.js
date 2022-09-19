import axios from "axios"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
import { GetValores } from "./CarritoLocalStorang"

export const GenerarLinkPagoMedios = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_medio",{
        datosPersonal,
        valores
    })
    return  data.data
}

export const CrearLinkPagoPayPhone = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_payphone",{
        datosPersonal,
        valores
    })
    return  data
}