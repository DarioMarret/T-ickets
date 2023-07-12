import { DatosUsuarioLocalStorang, DatoTokenusuario, Host, DatosUsuariocliente, Whatsappnumero } from "./constantes"
import jwtDecode from "jwt-decode";
import axios from "axios";
export const DatosUsuariosLocalStorag = (data) => {
    sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(data))
    return true
}

export const getDatosUsuariosLocalStorag = () => {
    let data = JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang))
    if (data !== null) {
        return data
    } else {
        return null
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
    //    console.log(data)
        const { success } = data
        if (success) {
            return data.data;
        } else {
            return false
        }
    } catch (error) {
        return error;
    }
}

//estas funciones las Agrege en caso de uso dee usuario loggeado
export function setDatosUser(data) {
    try {
        sessionStorage.setItem(DatoTokenusuario, data)
        return true
    } catch (error) {
        console.log(error)
        // return {'estado':false,'error':error}        
    }
}
export function getUsuario() {
    try {
        const data = sessionStorage.getItem(DatoTokenusuario)
        //   console.log(data)
        return data;

    } catch (error) {
        console.log(error)
        return error
    }
}
export function removeDatosUsuario() {
    try {
        sessionStorage.removeItem(DatoTokenusuario)
    } catch (error) {

    }
}
export function clienteInfo() {

    let user = getUsuario();
    //console.log(jwtDecode(user))
    if (user) {
        return jwtDecode(user)
    } else {
        return null
    }
}