import axios from "axios"
import { InstanciaAxio } from "utils/Instancias"



export const Listar_mapa =async()=>{
    try {
        let {data}= await InstanciaAxio.get("listar_mapa")
        return data
    } catch (error) {
        return error
    }
}

export const Listar_mapaeventos =async()=>{
    try {
        let {data}= await InstanciaAxio.get("listar_mapaeventos")
        return data
    } catch (error) {
        return error
    }
}
export const Crear_mapa =async(parms)=>{
    try {
        let {data}= await InstanciaAxio.post("crear_mapa",parms)
        return data
    } catch (error) {
        return error
    }
}
export const Actualizar_mapa =async(parms,id)=>{
    try {
        let {data}= await InstanciaAxio.put("actualizar_mapa/",parms,id)
        return data
    } catch (error) {
        return error
    }
}
export const Eliminar_mapa =async(id)=>{
    try {
        let {data}= await InstanciaAxio.put("eliminar_mapa/"+id)
        return data
    } catch (error) {
        return error
    }
}




export const cargarMapa = async () => {
    try {
        const { data } = await axios.get("https://rec.netbot.ec/ms_login/listarMapas", {
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
export const guardarMapar = async (parm) => {
    try {
        const { data } = await axios.post("https://rec.netbot.ec/ms_login/guardarMapa", parm, {
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
export const editarMapa = async (parm) => {
    try {
        const { data } = await axios.put("https://rec.netbot.ec/ms_login/actualizarMapa", parm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
export const eliminaMapa = async (parm) => {
    try {
        const { data } = await axios.delete("https://rec.netbot.ec/ms_login/eliminarMapa/" + parm, {
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