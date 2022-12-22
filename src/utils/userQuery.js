import axios from "axios"
import { Host } from "./constantes"

export const Listarticketporestado = async (parms) => {
    try {
        const { data } = await axios.post(Host + "ticket_usuario", {
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