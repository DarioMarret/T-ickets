import axios from "axios"
import { InstanciaAxio } from "utils/Instancias"
export const GuardarEspacio = async (parms) => {
    try {
        let { data } = await InstanciaAxio.post("crear_espacio", parms)
        return data
    } catch (error) {
        return error
    }
}

export const ListarEspacios = async () => {
    try {
        const { data } = await InstanciaAxio.get("listar_espacio")
        return data
    } catch (error) {
        return error
    }
}
/** Verificar error 500 internal server error */
export const EliminarEspacios = async (parms) => {
    try {
        const { data } = await InstanciaAxio.delete("eliminar_espacio/" + parms)
        return data
    } catch (error) {
        return error
    }

}
export const ActualizarEspacio = async (parms, id) => {
    try {
        const { data } = await InstanciaAxio.put("actualizar_espacio/" + id, {
            "nombre": parms.nombre,
            "descripcion": parms.descripcion
        })
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        return error
    }
}