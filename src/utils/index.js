import axios from "../../node_modules/axios/index"

export const mikroAxios = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/",
    headers: {
        'Content-Type': 'application/json',
        'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})
export const AxioBoleteria = axios.create({
    baseURL: "https://api.t-ickets.com/ms_login/",
    headers: {
        'Content-Type': 'application/json',
        'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})
export const Axiosmikroserdos = axios.create({
    baseURL: "https://api.t-ickets.com/mikrotiv2/",
    headers: {
        'Content-Type': 'application/json',
        'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})
export const boleteriaAxios = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/",
    headers: {
        'Content-Type': 'application/json',
        'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})


export const Consultar_codigos = async (param) => {
    try {
        let { data } = await boleteriaAxios.post("Boleteria/codigos", param)
        return data;
    } catch (error) {
        return error
    }
}