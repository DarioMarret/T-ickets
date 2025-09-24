import { DatosUsuarioLocalStorang, DatoTokenusuario, Host, DatosUsuariocliente, Whatsappnumero } from "./constantes"
import jwtDecode from "jwt-decode";
import axios from "axios";
export const DatosUsuariosLocalStorag = (data) => {
    sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(data))
    return true
}

export const getDatosUsuariosLocalStorag = () => {
    let data = JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang))
    const randon = sessionStorage.getItem("random") || ""
    if (data !== null) {
        return data
    } else {
        return { id: 0, cedula: "" + randon, discapacidad: "No" }
    }
}
export const UpdateDatosUsuariosLocalStorag = (paramas) => {
    let data = JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang))
    let datos = {
        ...data,
        ...paramas
    }
    sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(datos))
    const randon = sessionStorage.getItem("random") || ""
    if (data !== null) {
        return JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang))
    } else {
        return { id: 0, cedula: "" + randon, discapacidad: "No" }
    }
}
export function getCliente() {
    let data = JSON.parse(sessionStorage.getItem(DatosUsuariocliente))
    if (data !== null) {
        return data
    } else {
        return null
    }
}
// export async function getCedula(cedula) {
//     try {
//         const { data } = await axios.get("https://api.t-ickets.com/ms_login/cedula/" + cedula)

//         const { success } = data
//         if (success) {
//             return data.data;
//         } else {
//             return false
//         }
//     } catch (error) {
//         return false;
//     }
// }

export async function getCedula(params) {
    try {
        const { data } = await axios.post("https://api.t-ickets.com/sris/ConsultasCedula", {
            "ruc": `${params}`,
            "usuario": "CONSULTASLRSOFTSOLUTION",
            "token": "SGFGD90890234%@DFS2354565465214234HJNFDSO4658641189"

        })
        if(data){
            return {
                "id": 0,
                "cedula": data.datos.nui,
                "direccion": data.datos.lugarNacimiento,
                "discapacidad": String(data.datos.condicionCedulado).includes("DISCAPA")?"Si":"No",
                "edad": "",
                "email": "null",
                "genero": "Masculino",
                "name": data.datos.nombre,
                "sexo": "Masculino",
                "telefono": null,
                "estado_civil": null,
                "fecha_nacimiento": null
            }
        }
    } catch (error) {

    }
}

//estas funciones las Agrege en caso de uso dee usuario loggeado
export function setDatosUser(data) {
    try {
        const datas = {
            timestamp: Date.now() // Guarda el tiempo actual en milisegundos
        };
        sessionStorage.setItem(DatoTokenusuario, data)
        //sessionStorage.setItem("Time", JSON.stringify(datas))
        return true
    } catch (error) {
        // return {'estado':false,'error':error}        
    }
}
export function checkLocalStorageExpiration() {
    const data = localStorage.getItem("Time");

    if (data) {
        const parsedData = JSON.parse(data);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

        if (!parsedData.timestamp) {
            //window.location.reload()
            sessionStorage.removeItem(DatoTokenusuario);
            sessionStorage.removeItem("Time");
            return true
        }
        if (now - parsedData.timestamp > twelveHours) {
            // window.location.reload()
            sessionStorage.removeItem(DatoTokenusuario); // Borra el dato si ha pasado el tiempo


            return true
        }
        sessionStorage.removeItem(DatoTokenusuario); // Borra el dato si ha pasado el tiempo
        sessionStorage.removeItem("Time");
        return false
    }
}
export function getUsuario() {
    try {
        const data = sessionStorage.getItem(DatoTokenusuario)

        return data;

    } catch (error) {
        return error
    }
}
export function removeDatosUsuario() {
    try {
        sessionStorage.removeItem(DatoTokenusuario)
        sessionStorage.removeItem("Time");
    } catch (error) {

    }
}
export function clienteInfo() {

    let user = getUsuario();
    if (user) {
        return jwtDecode(user)
    } else {
        return null
    }
}