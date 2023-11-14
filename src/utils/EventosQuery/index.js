import axios from "axios";
import { ListarLocalidad } from "utils/LocalidadesQuery";

export const Actualisardescripcionevento = async () => {
    try {
        let { data } = axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/actualisar_descripcion_evento", {
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
export const ListarEventosFinalizados = async () => {
    try {
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/listareventos/ACTIVO/", {
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
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/listareventos/ACTIVO/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

            }
        })
        const datas = await axios.get("https://api.ticketsecuador.ec/ms_login/listareventos/PROCESO/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

            }
        })
        console.log(datas.data.data)
        return [...data.data, ...datas.data.data]
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
        let { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listar_localidades/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
       // sessionStorage.setItem("nombrelocalidades", JSON.stringify(data.data))
        console.log(data.data)
        let info = data.data.map(e=>{
            return { nombre: e.nombre,
            id:e.id
            }
        })

        sessionStorage.setItem("localidadesnombres", JSON.stringify(info))
        return info
    } catch (error) {
        return error
    }
}

export const ListaPreciosEvent = async () => {
    const resultado = await ListarEventosLis()
    const dat= await TraerLocalidad()
    let newarr = []
    const data = await Promise.all(
        resultado.map(async (e) => {
            const info = await traerprecios("https://api.ticketsecuador.ec/ms_login/ListaPreciosLocalidades/" + e.codigoEvento)
            e.Precios = info
            return e
        }))
    let datos = await data.map((e) => {
        e.Precios.map(f => {
            newarr.push({ ...f })
        })
    })

    console.log(resultado, data)
    return sessionStorage.setItem("PreciosLocalidad", JSON.stringify(newarr))
}