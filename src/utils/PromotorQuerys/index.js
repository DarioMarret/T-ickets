import { InstanciaAxio } from "utils/Instancias"
export const listar_promotores = async () => {
    try {
        let { data } = await InstanciaAxio.get("listar_promotores")
        return data
    } catch (error) {
        return error
    }
}
export const CrearPromotor = async (parms) => {
    try {
        let { data } = await InstanciaAxio.post("crear_promotor", parms)
        return data
    } catch (error) {
        return error
    }
}
export const ActualizarPromotor = async (parms) => {
    try {
        let { data } = await InstanciaAxio.put("actualizar_promotor/" + id, { parms })
        return data
    } catch (error) {
        return error
    }
}
export const EliminarPromotor = async (parms)=>{
    try {
        let { data } = await InstanciaAxio.delete("eliminar_promotor/"+parms)
        return data
    } catch (error) {
        return error
    }
}