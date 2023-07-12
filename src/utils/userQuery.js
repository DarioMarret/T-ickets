import axios from "axios"
import { data, post } from "jquery"
import { Host } from "./constantes"
//*api boletos
export const Listarticketporestado = async (parms) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/ticket_usuario", {
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
//Compra/post_api_v1_liverar_asiento
export const Liverarasiento = async(parms)=>{
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/liverar_asiento",{
            "id_ticket_usuarios": parms
        },{

        },{

        })
        return data
    } catch (error) {
        return error
    }
}
 //Ticket/get_ticket_admin
export const BoletosTiketsGlobal=async(parms)=>{   
   // console.log(parms)
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/ticket_admin",
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
//validar_existencia_asientos
export const GEnerarBoletos=async(parms)=>{
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/validar_existencia_asientos",
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
//post_api_v1_selecion_usuario
export const Seleccionaruserlista=async(parms)=>{
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/selecion_usuario",parms,{
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

//post_api_v1_actualisar_descripcion_evento
export const actualizarDescription = async (parms)=>{
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/actualisar_descripcion_evento", parms, {
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

//post_api_v1_actualisar_precio_localidad
export const actualizarPrecios= async(parms)=>{
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/actualisar_precio_localidad",parms,{
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

///api/v1/actualisar_descripcion_evento
export const Putdescriptionevent = (parms) => {
    try {
        let { data } = axios.post("https://api.t-ickets.com/ms_login/api/v1/actualisar_descripcion_evento",
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