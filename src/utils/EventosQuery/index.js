import axios from "axios";
import { ListarLocalidad } from "utils/LocalidadesQuery";

export const Actualisardescripcionevento = async () => {
    try {
        let { data } = axios.get("https://api.t-ickets.com/ms_login/api/v1/actualisar_descripcion_evento", {
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
export const ListarEventosFinalizados= async()=>{
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/listareventos/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

            }
        })
        // console.log(data)
        return data.data
    } catch (error) {
        return error;

    }
}
 const ListarEventosLis = async () => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/listareventos/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

            }
        })
        // console.log(data)
        return data.data
    } catch (error) {
        return error;

    }
}

const traerprecios = async (path) => {
    try {
        let { data } = await axios.get(path, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        //console.log(data.data)
        return data.data
    } catch (error) {
        return error
    }

}
const TraerLocalidad = async () => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_localidades/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        //console.log(data.data)
        return data.data
    } catch (error) {
        return error
    }
}

export const ListaPreciosEvent = async () => {
    const resultado = await ListarEventosLis()
    //const data = await TraerLocalidad()
    let newarr = []
    const data = await Promise.all(
        resultado.map(async (e) => {
            const info = await traerprecios("https://api.t-ickets.com/ms_login/ListaPreciosLocalidades/" + e.codigoEvento)
            e.Precios = info
            return e
        }))
    let datos = await data.map((e) => {
         e.Precios.map(f=>{
            newarr.push({...f})
         })
    })

   // console.log(newarr)
    return sessionStorage.setItem("PreciosLocalidad", JSON.stringify(newarr))
}