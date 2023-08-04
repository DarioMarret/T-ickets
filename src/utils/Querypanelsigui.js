import axios from "axios"
import { Host, seleccionmapa } from "./constantes"
import { clienteInfo, getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
export const ActualizaEstadoLocalidad = async (id, parms) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/actualizarevento_estado/" + id, { ...parms, ...parmspro }, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const cargarEventoActivo = async (parms) => {
    try {
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/listareventos/" + parms+"/", {
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
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/listarMapas", {
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/guardarMapa", parm, {
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
        const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/actualizarMapa", parm, {
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
        const { data } = await axios.delete("https://api.ticketsecuador.ec/ms_login/eliminarMapa/" + parm, {
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
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    console.log("sillas--", datos)
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/selecionar_localidad", { ...datos, ...parmspro }, {
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
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/selecionar_localidad_correlativa",
            { ...parms, ...parmspro }, {
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
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/selecionar_localidad_correlativa_eliminar",
            { ...parms, ...parmspro }, {
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
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listar_localidades_id_espacio_descripcion/" + parms, {
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/", parms, {
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
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/quitarselecion_localidad",
            {
                ...parms,
                ...parmspro
            }, {
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/consultar_cedula", datos, {
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/selecionar_localidad_correlativa",
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/crear_evento_publicidad", datos, {
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
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/crear_publicidad", datos, {
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
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listar_publicidad", {
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
        const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/actualizar_publicidad/" + id, parms, {
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
        const { data } = await axios.delete("https://api.ticketsecuador.ec/ms_login/api/v1/eliminar_publicidad/" + parms, {
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
