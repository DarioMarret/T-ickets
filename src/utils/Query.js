import axios from "axios"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
import { GetValores,GetMetodo } from "./CarritoLocalStorang"
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
    let metodo = GetMetodo()
    console.log("se esta generando")    
        
if(datosPersonal!=null && valores!=null )   {
          const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_medio",{
        datosPersonal,
        valores,
        metodo
        })
    console.log("GenerarLinkPagoMedios data-----",data)
        return  data.data
        }
}

/**
 * 
 * @returns {
 * data
 * }
 */
/*
export const CrearLinkPagoPayPhone = async () => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    console.log("CrearLinkPagoPayPhone-----",{ datosPersonal,valores})
    console.log(valores)
    console.log(datosPersonal)
    if(datosPersonal!=null&& valore!=null)   {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_payphone",{
        datosPersonal,
        valores
    })
    return  data
     }
}*
/* 
Guradar compra y crear usuario Reportar deposito no genera link de pago
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
      
}
/* *
*Guardar la compra y crear usuario no genera link de pago
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
}
export const listarusauriosregistrados=()=>{
    /*
    const {data} =await axios.get("")
    return data;
    */
}
export const listarTicketsvendidos=()=>{
    /*
        const {data} = await axios.get("")
        return data;
    */
}
export const Iniciasession =async(params)=>{
    const {data} = await axios.post("endpoit-login",{
        params
    })
    return data;
}
