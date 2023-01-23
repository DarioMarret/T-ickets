import axios from "axios"
import { data, post } from "jquery"
import { Host } from "./constantes"

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
        const {data} = await axios.post("",{
            
        })
    } catch (error) {
        
    }
}