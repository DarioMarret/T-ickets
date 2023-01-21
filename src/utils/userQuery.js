import axios from "axios"
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
        return data
    } catch (error) {
        return error
    }

}