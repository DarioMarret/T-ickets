import axios from "axios";
import { GetMetodo, GetValores, getVerTienda } from "./CarritoLocalStorang";
import { Host, token } from "./constantes";
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
/*export const crearusercomnet = async () => {
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
}*/

export const PagoRapido = async (transaccion) => {
    let datosPersonal = getDatosUsuariosLocalStorag().cedula
    let metodo = GetMetodo()
    let concierto = getVerTienda().map((e) => {
        return {
            "nombreConcierto": e.nombreConcierto,
            "id_localidad": e.localidaEspacio["idcolor"],
            "cantidad": e.cantidad,
        }
    })
    let datos = {
        "cedula": datosPersonal,
        "forma_pago": metodo,
        "concierto": [...concierto],
        "valores": {
            "total": parseFloat(GetValores().total).toFixed(2),
            "comision": parseFloat(GetValores().comision).toFixed(2),
            "subtotal": parseFloat(GetValores().subtotal).toFixed(2),
            "comision_bancaria": parseFloat(GetValores().comision_bancaria).toFixed(2),
            "description": GetValores().description
        },
        "idfactura": "",
        "transaccion": transaccion
    }
    try {

        console.log(datos, concierto)
        const { data } = await axios.post(Host + "/api/v1/registraCompra ", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        console.log(data)
        return data;

    } catch (error) {
        return error

    }



}

