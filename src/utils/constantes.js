export const CarritoTicket = "CarritoTicket:"
export const DetalleLocalStorang = "DetalleLocalStorang"
export const DatosUsuarioLocalStorang = "DatosUsuarioLocalStorang"
export const DatoTokenusuario= "SeccionToken";
export const DatosUsuariocliente="DatoCliente";
export const Valorcarrito="Valorescarro";
export const Whatsappnumero ="WhastappValido";
export const Eventoid="eventoid";
//export const Host = "https://a8e1-45-187-2-162.sa.ngrok.io/"
export const Host = "https://rec.netbot.ec/ms_login/"
//export const Host = "  https://rec.netbot.ec/pdfqr/api/v1/"

export const Valores = "Costos"
export const Metodos = "Metodo-pago"
 export function Salircliente(){
   // localStorage.removeItem(DatosUsuariocliente)
 //   localStorage.removeItem(DatosUsuarioLocalStorang)
    localStorage.removeItem(Valorcarrito)
    localStorage.removeItem(CarritoTicket)
    localStorage.removeItem(Whatsappnumero)
 }

export const Envio = [
    {
        id: 1,
        envio: "",
        value:"",
        class:""
    },
    {
        id: 2,
        envio: "Correo Electrónico",
        value:"correo",
        class:""
    },
    {
        id: 3,
        envio: "Whatsapp",
        value:"whatsapp",
        class:""
    }
]
export const Letras =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
export const Localidades=[
    {
        id:1,
        nombre:"Estadio uno",
        localidad:[
            {nombre:"General"},
            {nombre:"Vip"},
            {nombre:"General Vip"}
        ]        
    },
    {
        id:2,
        nombre:"Estadio dos",
        localidad:[
            {nombre:"Normal Vip"},
            {nombre:"Vip Normal"},
            {nombre:"Vip General"}
        ]        
    },

]
export const Dias ={   
    0:"Lunes",
    1:"Martes",
    2: "Miercoles",
    3:"Jueves",
    4:"Viernes",
    5:"Sabado",
    6:"Domingo",
}
