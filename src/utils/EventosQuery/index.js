import axios from "axios";

export const Actualisardescripcionevento = async () => {
    try {
        let { data } = axios.get("https://rec.netbot.ec/ms_login/api/v1/actualisar_descripcion_evento")
        return data
    } catch (error) {
        return error
    }
}