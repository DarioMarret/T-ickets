import { DatosUsuarioLocalStorang } from "./constantes"

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