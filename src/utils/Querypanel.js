import axios from "axios"
import { id } from "date-fns/locale"
import { Host } from "./constantes"

/**Listar Suscritorea */
export const GetSuscritores = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listas_suscriptor", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Listar Usuarios */
export const GetUserList = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listas_user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data;
}
/**Listar Roles */
export const GetRoles = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listar_roles", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/** Editar Usuarios */
export const EditUser = async (id, parms) => {
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/actualizar_user/" + id, parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Crear nuevo usuario */
export const CrearUser = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/crear_user", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Eliminar Usuario */
export const EliminaUser = async (id) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar/" + id, {
        headers: {
            'Content-Type': 'aplication/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Login de usuario */
export const Loginadmin = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/auth_admin", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}

/**Editar subscritores */
export const EditarSuscrito = async (id, parms) => {
    console.log(parms, id)
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/actualizar_suscriptor/" + id, parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    console.log(data)
    return data
}
/**
 * * Eliminar suscritor especifico
 */
export const EliminarSuscrito = async (id) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data

}
/**
 * Crear nuevo suscritor
 */
export const CrearSuscritor = async (parms) => {
    // console.log(parms)
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/crear_suscriptor", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    // console.log(data)
    return data
}
export const CancelarSubscriptor = async (id) => {
    //console.log("query",id)   
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/cancelation_suscriptor/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    //console.log("query",data)
    return data
}
export const ListarTikets = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/pdfqr/api/v1/szchat/listar/")
    return data
}
export const ListarConcierto = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/filtrar_concierto", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}

export const GuardarEspacio = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/gusdar_espacio", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}

export const ListarEspacios = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listar_espacios", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
/** Verificar error 500 internal server error */
export const EliminarEspacios = async (parms) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar_espacio/" + parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
export const ActualizarEspacio = async (parms) => {
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/actualizar_espacio", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}

export const GuardarLocalidad = async (parms) => {
    console.log(parms)
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/guardar_localidad", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='


        }
    })
    return data
}
export const ListarLocalidad = async (parms) => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listar_localidades/" + parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const localidaandespacio = async (parms, id) => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listar_localidades_id_espacio/" + parms + "/" + id, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
export const Listarlocalidadid = async (parms) => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/listar_localidades_id_espacio/" + parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
export const AptualizarLocalida = async (parms) => {
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/api/v1/listar_localidades", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
/**50 */
export const EliminarLocalidad = async (parms) => {
    // console.log(parms)

    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/api/v1/eliminar_localidad/" + parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    //console.log(data)
    return data
}

export const FiltrarConcierto = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/filtrar_concierto", { "nombreconcert": parms }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data
}
export const GuardarEvento = async (parms) => {
    const { data } = await axios.post("https://rec.netbot.ec/ms_login/crearevento", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data;
}
export const ListarEventos = async (parms) => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/listareventos/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data;
}
export const EventosActivos = async () => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/listareventos/ACTIVO", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data;
}
export const listarpreciolocalidad = async (parms) => {
    const { data } = await axios.get("https://rec.netbot.ec/ms_login/ListaPreciosLocalidades/" + parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

        }
    })
    return data;
}
export const EliminarEvento = async (parm) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/eliminarevento/" + parm, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const EliminareventoLocalidad = async (parm, id) => {
    const { data } = await axios.delete("https://rec.netbot.ec/ms_login/eliminarevento/" + parm + "/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const ActualizarLocalidad = async (id, parms) => {
    const { data } = await axios.put("https://rec.netbot.ec/ms_login/actualizarevento/" + id, parms, {
        header: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const Obtenerlinkimagen = async (parm) => {
    try {
        const fordata = new FormData();
        fordata.append('image', parm);
        const { data } = await axios.post("https://flash.t-ickets.com/store/api/img", fordata)
        if (!data.success) return null
        //  console.log(data)
        return data.link

    } catch (error) {
        return null

    }

}