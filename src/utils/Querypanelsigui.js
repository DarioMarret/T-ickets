import axios from "axios"
import { Host, seleccionmapa } from "./constantes"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
export const ActualizaEstadoLocalidad = async (id, parms) => {
    const { data } = await axios.put("https://api.t-ickets.com/ms_login/actualizarevento_estado/" + id, parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const cargarEventoActivo = async (parms) => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/listareventos/" + parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        if (data.data == 0) return null
        return data.data
    } catch (error) {
        return null

    }

}
/*
export const cargarMapa = async () => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/listarMapas", {
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
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/guardarMapa", parm, {
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
        const { data } = await axios.put("https://api.t-ickets.com/ms_login/actualizarMapa", parm, {
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
        const { data } = await axios.delete("https://api.t-ickets.com/ms_login/eliminarMapa/" + parm, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}*/
export const enviasilla = async (info) => {
    let user = getDatosUsuariosLocalStorag()
    let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
    console.log(info, nombres)
    const datos = {
        id: nombres.idcolor,
        cedula: user.cedula,
        silla: info.silla,
        estado: "reservado",
    }
    console.log("sillas--", datos)
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/selecionar_localidad", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return { error: error, info: info }

    }
}
export const correlativosadd = async (parms) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/selecionar_localidad_correlativa",
            parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {
        return error
    }
}
export const correlativodelete = async (parms) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/selecionar_localidad_correlativa_eliminar",
            parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
       // console.log(data)
        return data

    } catch (error) {

    }
}
export const listarLocalidadaEspeci = async (parms) => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_localidades_id_espacio_descripcion/" + parms, {
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
export const guardarCarrusel = async (parms) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/", parms, {
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
export const quitarsilla = async (parms) => {
    try {
        const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/quitarselecion_localidad",
            parms, {
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
export const buscarcliente = async (datos) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/consultar_cedula", datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error

    }
}
export const sumarcorrelativo = async (datos) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/selecionar_localidad_correlativa",
            datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {

    }
}

export const noticiasEvento = async (datos) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_evento_publicidad", datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {

    }
}
/*
export const agregarNoticia = async (datos) => {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_publicidad", datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {

    }
}
export const ListarNoticias = async () => {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_publicidad", {
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
export const Actualizarpublicdad = async (id, parms) => {
    try {
        const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_publicidad/" + id, parms, {
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
export const Eliminarpublici = async (parms) => {
    try {
        const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar_publicidad/" + parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}*/
