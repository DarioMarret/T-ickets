import axios from "axios"
import { data, post } from "jquery"
import { Host } from "./constantes"
//*api boletos
export const Listarticketporestado = async (parms) => {
    try {
        const { data } = await axios.post("https://rec.netbot.ec/ms_login/ticket_usuario", {
            "cedula": parms
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error
    }

}
export const Liverarasiento = async(parms)=>{
    try {
        const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/liverar_asiento",{
            "id_ticket_usuarios": parms
        },{

        },{

        })
        return data
    } catch (error) {
        return error
    }
}
 //https://rec.netbot.ec/ms_login/ticket_usuario
export const BoletosTiketsGlobal=async(parms)=>{   
   // console.log(parms)
    try {
        const { data } = await axios.get("https://rec.netbot.ec/ms_login/ticket_admin",
            {
                "cedula":parms
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {
        return error
    }
}
// https://rec.netbot.ec/ms_login/api/v1/validar_existencia_asientos
export const GEnerarBoletos=async(parms)=>{
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/validar_existencia_asientos",
            parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {
        return error        
    }
} 
//* seleccion usuario https://rec.netbot.ec/ms_login/doc/static/index.html#/Localidades/post_api_v1_selecion_usuario
export const Seleccionaruserlista=async(parms)=>{
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/selecion_usuario",parms,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error        
    }
}