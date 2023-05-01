import { InstanciaAxio } from "utils/Instancias"

export const Listar_carrusel = async()=>{
    try {
        let {data} = await InstanciaAxio.get("listar_carrusel")
        return data
    } catch (error) {
        return error
    }
}
export const Listar_carrusel_activos =async()=>{
    try {
        let {data} = await InstanciaAxio.get("listar_carrusel_activos")
        return data
    } catch (error) {
        return error
    }
}
export const Crear_carrusel=async(parms)=>{
    try {
        let {data}= await InstanciaAxio.post("crear_carrusel",parms)
        return data
    } catch (error) {
        return error
    }
}
export const Actualizar_carrusel= async(parms,id)=>{
    try {
        let {data}= await InstanciaAxio.put("actualizar_carrusel/"+id,parms)
        return data
    } catch (error) {
        return error
    }
}
export const Eliminar_carrusel = async (id)=>{
    try {
        let {data}= await InstanciaAxio.delete("eliminar_carrusel/"+id)
        return data
    } catch (error) {
        return error
    }
}