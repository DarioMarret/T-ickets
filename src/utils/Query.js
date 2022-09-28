import axios from "axios"
import { getDatosUsuariosLocalStorag ,getCliente} from "./DatosUsuarioLocalStorag"
import { GetValores,GetMetodo,getVerTienda } from "./CarritoLocalStorang"
import { Host ,Whatsappnumero} from "./constantes"
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
        const envios= datosPersonal.envio=="correo"? await EnviarEmail() : await EnviarmensajeWhastapp() 
        return  data.data
        }
}
export const GuardarDatosdelComprador =async()=>{
    let auth = getCliente()
    let datosPerson = getDatosUsuariosLocalStorag()    
    let datos ={
        cedula:auth==null?datosPerson.cedula: auth.cedula,
        direccion:auth==null?datosPerson.direccion: auth.direccion,
        discapacidad:auth==null?datosPerson.discapacidad: auth.discapacidad,
        edad:auth==null?datosPerson.edad: auth.edad,
        email:auth==null?datosPerson.email: auth.email,
        genero:auth==null?datosPerson.genero: auth.genero,
        name:auth==null?datosPerson.name: auth.name,
        sexo:auth==null?datosPerson.sexo: auth.sexo,
        telefono:auth==null?datosPerson.whatsapp: auth.whatsapp,      
    }
    const {data}= await axios.post(Host+"suscripcion",
        datos
    )
    return data
    
}
export const ValidarWhatsapp =async()=>{
    let datosPerson = getDatosUsuariosLocalStorag()    
    const validanumero = datosPerson.whatsapp.substring(1,10)    
    const {data}= await axios.post("https://rec.netbot.ec/api_whatsapp_qr/api/validarNumero",{from: "593"+validanumero})
        if(data.msg!=null){
            console.log(data)
            localStorage.setItem(Whatsappnumero, data.msg["_serialized"])        
        return data.msg
        }else{
     
        return null
        }
}
let Produ=[]
let message 
export const EnviarmensajeWhastapp=async ()=>{
    let auth = getCliente()
    let datosPerson = getDatosUsuariosLocalStorag()   
    let from = localStorage.getItem(Whatsappnumero)
    Produ = getVerTienda()
    let datos = auth!=null? auth:datosPerson    
    console.log(datos.nombreCompleto)
    !auth!=null?  message = "Hola soy "+auth.nombreCompleto+" con cédula "+auth.movil: message = "Hola soy "+datosPerson.name+" con cédula "+datosPerson.whatsapp
    message = message + " seleccione "
    Produ!=null? Produ.map((e,i)=>{
        message= message+" la cantidad de "+ e.cantidad+" asiento para el concierto "+ e.nombreConcierto + " de la localidad  " + e.localidad+ ", "

    }):''
    console.log(from)
    message = message+" podria contactarse comgigo para terminar el proceso de compra"
    console.log("mensaje a enviar---> ",message)   
   /* const {data}= await axios.post("https://rec.netbot.ec/api_whatsapp_qr/api/send_whatsapp",{
        from:from,
        mensaje:message,
        link:null
    })*/
    console.log("mensaje -->",message)
    
    return message
}
export const EnviarEmail=async()=>{
    let auth = getCliente()
    let datosPerson = getDatosUsuariosLocalStorag()   
    let datos = auth!=null? auth:datosPerson
   
    message = "Hola soy "+!datos.nombreCompleto?datos.name:datos.nombreCompleto+" con cédula "+!datos.movil?datos.cedula:datos.movil
    message = message + " seleccione "
    Produ!=null? Produ.map((e,i)=>{
        //console.log(e)
        message= message+" la cantidad de "+ e.cantidad+" asiento para el concierto "+ e.nombreConcierto + " de la localidad  " + e.localidad+ ", "

    }):''
    const {data} =await axios.post("",{
        from:datos.email,
        message:message,
        link:null
    })

    return data


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
    let auth = getCliente()
    let datosPersonal = getDatosUsuariosLocalStorag()
    let valores = GetValores()
    let metodo = GetMetodo()
    let dato = auth==null?datosPersonal :auth
/*const {data} = await axios.post(Host+"pago_medio",{        
         dato,
        valores,
        metodo
    })
    return data;*/
    return true
}
