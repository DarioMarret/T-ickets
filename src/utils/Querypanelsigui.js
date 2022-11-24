import axios from "axios"
import { Host } from "./constantes"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
export const ActualizaEstadoLocalidad = async (id, parms) => {
    const { data } = await axios.put(Host + "actualizarevento_estado/" + id, parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const cargarEventoActivo = async () => {
    try {
        const { data } = await axios.get(Host + "listareventos/ACTIVO", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        if (data.data == 0) return null
        return data.data
    } catch (error) {
        return error

    }

}
export const cargarMapa = async () => {
    try {
        const { data } = await axios.get(Host + "listarMapas", {
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
        const { data } = await axios.post(Host + "guardarMapa", parm, {
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
        const { data } = await axios.put(Host + "actualizarMapa", parm, {
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
        const { data } = await axios.delete(Host + "eliminarMapa/" + parm, {
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
export const enviasilla = async (info) => {
    let user = getDatosUsuariosLocalStorag()
    //console.log(user)
    const datos = {
        id: info.id,
        cedula: user.cedula,
        silla: info.silla,
        estado: "reservado",
    }
    // console.log(datos)
    try {
        const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/selecionar_localidad", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        // console.log(data)
        // console.log(data)
        //  usedispatch(filtrarlocali(data.datos))
        return data.data.datos
    } catch (error) {
        console.log(error)
        return { error: error, info: info }

    }
}
