import { DatosUsuarioLocalStorang,DatoTokenusuario } from "./constantes"
import jwtDecode from "jwt-decode";
import axios from "axios";
export const DatosUsuariosLocalStorag = (data) => {
    localStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(data))
    return true
}

export const getDatosUsuariosLocalStorag = () => {
    let data = JSON.parse(localStorage.getItem(DatosUsuarioLocalStorang))
    if(data !== null){
        return  data
    }else{
        return null
    }
}
export async function getCedula(cedula) {
    try {

        const { data } = await axios.get("https://rec.netbot.ec/pdfqr/api/v1/cedula/"+cedula)
        const { message, portal } = data;
        if (message.name) {
            return message;
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
        localStorage.setItem(DatoTokenusuario, data)
        return true
    } catch (error) {
        console.log(error)
        // return {'estado':false,'error':error}        
    }
}


export function getUsuario() {
    try {
        const data = localStorage.getItem(DatoTokenusuario)
        return  data;

    } catch (error) {
        console.log(error)
        return error
    }
}
export function removeDatosUsuario() {
    try {
        localStorage.removeItem(DatoTokenusuario)
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