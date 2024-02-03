import axios from "axios";

const interAxiosWhaspp = axios.create({
    baseURL: "https://api.t-ickets.com/qrmasivo/"
})
/**QR */
export const EstadoQRsession = async qr => {
    try {
        let { data } = await interAxiosWhaspp.get("estado_session", {
            "sessionName": qr
        })
        return data
    } catch (error) {
        return error
    }
}
export const NuevaConexiopnQR = async qr => {
    try {
        let { data } = await interAxiosWhaspp.post("nuevaconexion", qr)
        return data;
    } catch (error) {
        return error
    }
}


/**Cuenta */
export const getQrLista = async () => {
    try {
        let { data } = await interAxiosWhaspp.get("listarcuenta")
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const postQRGenerado = async qrData => {
    try {
        let { data } = await interAxiosWhaspp.post("crearcuenta", qrData)
        return data
    } catch (error) {
        return error
    }
}
export const DeleteQrCuenta = async qr => {
    try {
        let { data } = await interAxiosWhaspp.delete("eliminarcuenta/" + qr)
        return data
    } catch (error) {
        return error
    }
}


/** Masivos */

/**
 * ActualizarMasivo
 * ruta actualizarmasivo
 * @param {,id,cuentaId,mensaje,imagen,video,fecha_envio,hora_envio} qr 
 * @returns 
 */
export const ActualizarMasivo = async qr => {
    let parmas = {
        "id": 0,
        "cuentaId": 0,
        "mensaje": "string",
        "imagen": "string",
        "video": "string",
        "fecha_envio": "string",
        "hora_envio": "string"
    }
    try {
        let { data } = await interAxiosWhaspp.put("actualizarmasivo", qr)
        return data
    } catch (error) {
        return error
    }
}

export const ListarMasivos = async (qr) => {
    try {
        console.log(qr)
        if (qr == 0) {
            let { data } = await interAxiosWhaspp.get("allmasivos")
            console.log(data)
            return data
        } else {
            let { data } = await interAxiosWhaspp.get("listarmasivos/" + qr)
            return data
        }
    } catch (error) {
        return error
    }
}
export const EliminarMasivo = async (qr) => {
    try {
        let { data } = await interAxiosWhaspp.delete("eliminarmasivo/" + qr)
        return data
    } catch (error) {
        return error
    }
}

export const ProgramarQR = async (params) => {
    try {
        let { data } = await interAxiosWhaspp.post("programarmasivo", params)
        return data
    } catch (error) {
        return error
    }
}

export const ActualizarContacto = async (parmas) => {
    try {
        let { data } = await interAxiosWhaspp.put("actualizarcontacto", parmas)
        return data
    } catch (error) {
        return error
    }
}
export const ObtenerContactos = async (id) => {
    try {
        let { data } = await interAxiosWhaspp.get("allcontactos")
        return data
    } catch (error) {
        return error
    }
}
export const EliminarContacto = async (id) => {
    try {
        let { data } = await interAxiosWhaspp.delete("eliminarcontacto/" + id)
        return data
    } catch (error) {
        return error
    }
}
export const Imporcontactos = async (ID,cuenta, parms) => {
    try {
        let nuevos = new FormData()
        nuevos.append("file", parms)
        let { data } = await interAxiosWhaspp.post("importarcontactos?cuentaId=" + cuenta + "&id_masivo=" + ID, nuevos)
        return data
    } catch (error) {
        return error
    }
}
