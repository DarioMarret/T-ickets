export const CarritoTicket = "CarritoTicket:"
export const DetalleLocalStorang = "DetalleLocalStorang"
export const DatosUsuarioLocalStorang = "DatosUsuarioLocalStorang"
export const DatoTokenusuario= "DatoTokenusuario";

export const Valores = "Costos"
export const Metodos = "Metodo-pago"
 

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
        nombre:"Estadio uno",
        localidad:[
            {nombre:"Normal Vip"},
            {nombre:"Vip Normal"},
            {nombre:"Vip General"}
        ]        
    },

]