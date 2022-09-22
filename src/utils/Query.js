import axios from "axios"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
import { GetValores } from "./CarritoLocalStorang"
/**
 * 
 * @returns {
 * success: boolean,
 * url: string,
 * }
 * 
 */
export const GenerarLinkPagoMedios = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()

    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_medio",{
        datosPersonal,
        valores
    })
    return  data.data
}

/**
 * 
 * @returns {
 * data
 * }
 */
export const CrearLinkPagoPayPhone = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    console.log(valores)
    console.log(datosPersonal)
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_payphone",{
        datosPersonal,
        valores
    })
    return  data
}
/* 
Guradar compra y crear usuario Reportar deposito
@parms codigo:codigo del deposito
*/
export const ReportarDepositoCompra= async(codigo)=>{
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    console.log({codigo,
        datosPersonal,
        valores})
   /* const {data} = await axios.post("endpoit-de-deposito",{
        codigo,
        datosPersonal,
        valores
    })
    return data;
   */
    return {codigo, datosPersonal,valores}   
}
/* *
*Guardar la compra y crear usuario
*/
export const ReportarEfectivoCompra= async()=>{
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    console.log({datosPersonal, valores})
   /* const {data} = await axios.post("endpoit-de-deposito",{        
        datosPersonal,
        valores
    })
    return data;
   */
    return {datosPersonal,valores}   
}
