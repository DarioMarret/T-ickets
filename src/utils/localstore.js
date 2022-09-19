import jwtDecode from "jwt-decode";
import axios from "axios";
export function setDatosUser(data) {
    try {
        localStorage.setItem("usuaruario", data)
        return true
    } catch (error) {
        console.log(error)
        // return {'estado':false,'error':error}        
    }
}
export async function getCedula(cedula) {
    try {
        const res = await axios.get("https://rec.netbot.ec/pdfqr/api/v1/cedula/" + cedula)
        const { data } = await res;
        const { message, portal } = data;
        console.log("info", data)
        if (message.name) {
            return message;
        }
        else return false
    } catch (error) {
        return error;
    }

}

export function getUsuario() {
    try {
        const data = localStorage.getItem("usuaruario")
        return data;

    } catch (error) {
        console.log(error)
        return error
    }
}
export function removeDatosUsuario() {
    try {
        localStorage.removeItem("usuaruario")
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