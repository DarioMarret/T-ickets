import axios from "../../node_modules/axios/index"

export const mikroAxios = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})
export const Axiosmikroserdos = axios.create({
    baseURL: "https://api.t-ickets.com/mikrotiv2/"
})
export const boleteriaAxios = axios.create({
    baseURL: "https://api.t-ickets.com/mikroti/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
    },
    maxBodyLength: Infinity,
})


export const Consultar_codigos = async (param) => {
    try {
        console.log(param)
        let { data } = await boleteriaAxios.post("Boleteria/codigos", param)
        return data;
    } catch (error) {
        return error
    }
}