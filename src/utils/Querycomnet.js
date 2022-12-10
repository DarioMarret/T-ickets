import axios from "axios";
import { token } from "./constantes";
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag";
/*
https://portal.comnet.ec/api/v1/NewUser

{
    "token": "RXQ0eGpqSnpodGRNRnNvdktBYUNCQT09",
        "nombre": "Carlos miguel perez",
            "cedula": "45464534",
                "correo": "correo@correo.com",
                    "telefono": "5124345",
                        "movil": "989898989",
                            "direccion_principal": "CONCIERTO ELADIO CARRION"
}*/
export const crearusercomnet = async () => {
    let user = getDatosUsuariosLocalStorag()
    let informa = {

        "token": token,
        "nombre": user.name,
        "cedula": user.cedula,
        "correo": user.email,
        "telefono": "",
        "movil": user.telefono,
        "direccion_principal": user.name
    }
    //console.log("estado informa", informa)
    try {
        const { data } = await axios.post("https://portal.comnet.ec/api/v1/NewUser", informa)
        return data
    } catch (error) {
        return error
    }

}
