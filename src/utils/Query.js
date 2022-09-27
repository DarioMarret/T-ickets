import axios from "axios"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
import { GetValores,GetMetodo } from "./CarritoLocalStorang"
import { Host } from "./constantes"
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
export const GuardarDatosdelComprador =async()=>{
    let datosPerson = getDatosUsuariosLocalStorag()
    let metodo = GetMetodo()
    let datos ={
        cedula:datosPerson.cedula,
        direccion:datosPerson.direccion,
        discapacidad:datosPerson.discapacidad,
        edad:datosPerson.edad,
        email:datosPerson.email,
        genero:datosPerson.genero,
        name:datosPerson.name,
        sexo:datosPerson.sexo,
        telefono:datosPerson.whatsapp,      
    }
    const {data}= await axios.post("https://a8e1-45-187-2-162.sa.ngrok.io/suscripcion",
        datos
    )
  //  console.log(datos,data)
    return data
    
}
export const EnviarWhastapp =async()=>{
    let datosPerson = getDatosUsuariosLocalStorag()
    const validcero = datosPerson.substring(0,1)
    const validanumero = datosPerson.substring(1,10)
   // https://rec.netbot.ec/api_whatsapp_qr/api/send_whatsapp
   // https://rec.netbot.ec/api_whatsapp_qr/api/validarNumero
   // if()

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
    let metodo = GetMetodo()
 //   console.log({datosPersonal, valores})
const {data} = await axios.post(Host+"pago_medio",{        
        datosPersonal,
        valores,
        metodo
    })
    console.log(data)
    return data;
     
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
export const ListarEventos= async()=>{
    const {data} = await axios.get("")
    return data;
}
