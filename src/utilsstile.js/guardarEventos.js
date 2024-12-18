import axios from "axios"
import { GetMetodo } from "utils/CarritoLocalStorang"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { correlativosadd } from "utils/Querypanelsigui"

export const ReservaEvento = async (codigo,nombre) => {
    console.log(nombre)
    let datosPersonal = getDatosUsuariosLocalStorag().cedula
    let id = clienteInfo() != null ? clienteInfo().id : getDatosUsuariosLocalStorag().id
    let metodo = "Efectivo-Local"
    let id_localidad = codigo == "6E1FO4" ? 22 : 23
    let idespaciolocalida = codigo == "6E1FO4" ? 177 : 178
    //  si discrimino lo tengo que guardar  let total = GetMetodo() == "Tarjeta" ? parseFloat(GetValores().total) : parseFloat(GetValores().comision) + parseFloat(GetValores().subtotal)
    let concierto = [1].map((e) => {
        return {
            "nombreConcierto": codigo == "6E1FO4" ? "participante-quito" : "participantes-jessi",
            "id_localidad": id_localidad,
            "idespaciolocalida": idespaciolocalida,
            "cantidad": 1,
        }
    })
    let datos = {
        "cedula": datosPersonal,
        "id_usuario": parseInt(id),
        "forma_pago": metodo,
        "concierto": [...concierto],
        "valores": {
            "total": parseFloat(0.00),
            "comision": parseFloat(0.00),
            "subtotal": parseFloat(0.00),
            "comision_bancaria": parseFloat(0.00),
            "description": codigo == "6E1FO4" ? "participante-quito" :"participantes-jessi"
        },
        "idfactura": "",
        "transaccion": ""
    }
    // console.log(datos, concierto)
    try {
        //console.log(datos)
        const { data } = await axios.post("https://api.t-ickets.com/ms_login//api/v1/registraCompra ", datos, {
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

export const agregaReserva = async (codigo, nombre) => {
    let datosPersonal = getDatosUsuariosLocalStorag().cedula
    let id_localidad = codigo == "6E1FO4" ? 22 : 23
    try {
        let datos = await correlativosadd({ "id": id_localidad, 
        "estado": "reservado",
            "cedula": datosPersonal, 
         "mas": "mas",
          "cantidad": 1 })
        console.log(datos)
        if (datos.success) {
            let reserva = await ReservaEvento(codigo, nombre)
            return reserva   
         
        }
    } catch (error) {
        return error

    }





}