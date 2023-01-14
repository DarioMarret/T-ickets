import axios from "axios";
import { GetMetodo, GetValores, getVerTienda } from "./CarritoLocalStorang";
import { Host, token } from "./constantes";
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag";

/** reportar Pago */
export const PagoRapido = async (transaccion) => {
    let datosPersonal = getDatosUsuariosLocalStorag().cedula
    let metodo = GetMetodo() == "Transferencia" ? "Deposito" : GetMetodo()
    let concierto = getVerTienda().map((e) => {
        return {
            "nombreConcierto": e.nombreConcierto,
            "id_localidad": e.localidaEspacio["idcolor"],
            "idespaciolocalida": e.localidaEspacio["ideprecio"],
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
/** Listar todos los reportes de tickes */
export const AprobarTiket = async () => {
    try {
        let { data } = await axios.get(Host + "/ticket_admin", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
/**  */
export const  ConsolidaBoleto = async ()=>{
    try {
        let {data} =await axios.post(Host+"/boletos",{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const Pagofisico=async()=>{
    try {
        let {data}=await axios.post(Host+"/pagosefectivi",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}