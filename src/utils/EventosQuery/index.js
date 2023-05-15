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
        let { data } = await InstanciaAxio.delete("eliminar_evento/"+id)
        return data
    } catch (error) {
        return error
    }
}
export const ListarEventos = async()=>{
    try {
        let { data } = await InstanciaAxio.get("listar_eventos")
        return data
    } catch (error) {
        return error
    }
}
export const Crearprecios= async(parms)=>{
    try {
        let {data}= await InstanciaAxio.post("crear_preciolocalidad",parms)
        return data
    } catch (error) {
    return error        
    }
}
export const Listar_preciolocalidad= async (id)=>{
    try {
        let {data}= await InstanciaAxio.get("listar_preciolocalidad/"+id)
        return data
    } catch (error) {
        return error
        
    }
}
export const Actualizar_preciolocalidad = async(parms,id)=>{
    try {
        let {data}=await InstanciaAxio.put("actualizar_preciolocalidad/"+id,parms)
        return data
    } catch (error) {
        return error
    }
}
export const Eliminar_preciolocalidad = async(id)=>{
    try {
        let {data} = await InstanciaAxio.delete("eliminar_preciolocalidad/"+id)
        return data
    } catch (error) {
        return error
    }
}
export const Localidaitmes_content = async ()=>{
    try {
        let { data } = await InstanciaAxio.get("localidaditems_content")
        return data
    } catch (error) {
        return error
    }
}
export const Localidaditmes_create =async(parms)=>{
    try {
        let { data } = await InstanciaAxio.post("localidaditems_create",parms)
        return data
    } catch (error) {
        return error
    }
}
export const Localidaditems_delete= async(id_localidad,id_evento)=>{
    try {
        let { data } = await InstanciaAxio.delete("localidaditems_delete/"+id_localidad+"/"+id_evento)
        return data;
    } catch (error) {
        return error
    }
}
export const Localidaditems_seleccion_correlativo = async(parms)=>{
    try {
        let { data } = await InstanciaAxio.post("localidaditems_seleccion_correlativo",parms)
        return data
    } catch (error) {
        return error
    }
}