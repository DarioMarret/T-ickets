import axios from "axios";
import { InstanciaAxio } from "utils/Instancias";
import { ListarLocalidad } from "utils/LocalidadesQuery";

export const CrearEvento =async(parms)=>{
    try {
        let { data } = await InstanciaAxio.post("crear_evento",parms)
        return data
    } catch (error) {
        return error
    }
}
export const ActualizarEvento = async (parms,id)=>{
    try {
        let { data } = await InstanciaAxio.put("actualizar_evento/"+id,parms)
        return data
    } catch (error) {
        return error
    }
}
export const EliminarEventoid = async (id)=>{
    try {
        let { data } = InstanciaAxio.delete("eliminar_evento"+id)
        return data
    } catch (error) {
        return error
    }
}
export const ListarEventos = async()=>{
    try {
        let { data } = InstanciaAxio.get("listar_eventos")
        return data
    } catch (error) {
        return error
    }
} 
export const Actualisardescripcionevento = async () => {
    try {
        let { data } = axios.get("https://rec.netbot.ec/ms_login/api/v1/actualisar_descripcion_evento", {
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

const ListarEventosLis = async () => {
    try {
        const { data } = await axios.get("https://rec.netbot.ec/ms_login/listareventos/", {
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

export const ListaPreciosEvent = async () => {
    const resultado = await ListarEventosLis()
    //const data = await TraerLocalidad()
    let newarr = []
    const data = await Promise.all(
        resultado.map(async (e) => {
            const info = await traerprecios("https://rec.netbot.ec/ms_login/ListaPreciosLocalidades/" + e.codigoEvento)
            e.Precios = info
            return e
        }))
    let datos = await data.map((e) => {
         e.Precios.map(f=>{
            newarr.push({...f})
         })
    })

    console.log(newarr)
    return sessionStorage.setItem("PreciosLocalidad", JSON.stringify(newarr))
}