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
    //console.log(datos,paramas)
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
export async function getCedula(cedula) {
    try {
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/cedula/" + cedula)
        //console.log(data)
        const { success } = data
        if (success) {
            return data.data;
        } else {
            return false
        }
    } catch (error) {
        //console.log(error)
        return false;
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
        //console.log(error)
        // return {'estado':false,'error':error}        
    }
}
export function checkLocalStorageExpiration() {
    const data = localStorage.getItem("Time");
    console.log(data)
    if (data) {
        console.log("Entro")
        const parsedData = JSON.parse(data);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000; // 12 horas en milisegundos
        console.log(data)
        if (!parsedData.timestamp) {
            //window.location.reload()
            sessionStorage.removeItem(DatoTokenusuario);
            sessionStorage.removeItem("Time");
            console.log(`no encotreo tiempo`);
            return true
        }
        if (now - parsedData.timestamp > twelveHours) {
            // window.location.reload()
            sessionStorage.removeItem(DatoTokenusuario); // Borra el dato si ha pasado el tiempo
            sessionStorage.removeItem("Time");
            console.log(`El dato con clave "${now}" ha sido eliminado por expiración.`);
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
        //   //console.log(data)
        return data;

    } catch (error) {
        //console.log(error)
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
    // //console.log(jwtDecode(user))
    if (user) {
        return jwtDecode(user)
    } else {
        return null
    }
}