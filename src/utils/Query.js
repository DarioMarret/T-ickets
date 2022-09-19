import axios from "axios"


export const GenerarLinkPagoMedios = async () => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_medio")
    return  data.data
    
}

export const CrearLinkPagoPayPhone = async () => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/pago_payphone")
    return  data
    
}