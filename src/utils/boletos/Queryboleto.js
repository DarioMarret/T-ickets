import axios from "axios";
import { Host } from "utils/constantes";
export const generarBoleto = async (parms) => {
    try {
        let { data } = await axios.post(Host + "/api/v1/generaboleto" + parms, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const generaPDF = async (parms) => {
    try {
        let { data } = await axios.post(Host + "/api/v1/ticket_pdf", parms, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const enviarEmail = async (parm) => {
    try {
        let { data } = await axios.post(Host + "/api/v1/ticket_pdf", parm, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const CanjearBoletoRegistro = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/canje_boleto", parms, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }

}
