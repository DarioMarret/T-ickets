import { refType } from "@mui/utils";
import axios from "axios";
import { GetMetodo, GetValores, getVerTienda } from "./CarritoLocalStorang";
import { Host, token } from "./constantes";
import { clienteInfo, getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag";

/** reportar Pago */
export const PagoRapido = async (transaccion) => {
    let datosPersonal =  getDatosUsuariosLocalStorag().cedula
    let id = clienteInfo() !=null ? clienteInfo().id: getDatosUsuariosLocalStorag().id
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
        "id_usuario": parseInt(id),
        "forma_pago": metodo,
        "concierto": [...concierto],
        "valores": {
            "total": parseFloat(GetValores().total),
            "comision": parseFloat(GetValores().comision),
            "subtotal": parseFloat(GetValores().subtotal),
            "comision_bancaria": parseFloat(GetValores().comision_bancaria),
            "description": GetValores().description
        },
        "idfactura": "",
        "transaccion": transaccion
    }
    // console.log(datos, concierto)
    try {

        console.log(datos, concierto)
        const { data } = await axios.post("https://rec.netbot.ec/ms_login//api/v1/registraCompra ", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        // console.log(data)
        return data;

    } catch (error) {
        return error

    }
}
/** Listar todos los reportes de tickes */
export const AprobarTiket = async () => {
    try {
        let { data } = await axios.get("https://rec.netbot.ec/ms_login//ticket_admin", {
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
export const ConsolidaBoleto = async () => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login//boletos", {
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
export const Pagofisico = async () => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login//pagosefectivi", {
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
export const cederboleto = async (ceder) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login//api/v1/ceder_boleto", ceder, {

        }, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log(data)
    } catch (error) {
        console.log(error)

    }
}

export const GeneraToken = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/generar_token", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (err) {
        return err
    }
}
export const ValidarToken = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/confirmarpago", {
            
            "id": parms
            }
        , {
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
export const generaTiketspdf = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ticket/api/v1/ticket_pdf_link", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const CambiarPagoTC =async (parms)=>{
    try {
        let {data} = await axios.post("",parms,{
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

//https://rec.netbot.ec/ms_login/doc/static/index.html#/Compra/post_api_v1_liverar_asiento
//https://rec.netbot.ec/ms_login/doc/static/index.html#/Compra/post_api_v1_generarBoleto     