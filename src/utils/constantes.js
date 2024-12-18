export const CarritoTicket = "CarritoTicket:"
export const DetalleLocalStorang = "DetalleLocalStorang"
export const DatosUsuarioLocalStorang = "DatosUsuarioLocalStorang"
export const DatoTokenusuario = "SeccionToken";
export const DatosUsuariocliente = "DatoCliente";
export const Valorcarrito = "Valorescarro";
export const Whatsappnumero = "WhastappValido";
export const Eventoid = "eventoid";
export const listaasiento = "asientosList";
export const asientosList = "asientosList";
export const concierto = "consierto";
export const seleccionmapa = "seleccionmapa";
export const sillaspalco = "sillaspalco";
export const Eventolocalidad = "Eventolocalidad"
export const FacturaComnet = "idFactura"
export const espacio = "espacio"
//export const Host = "https://a8e1-45-187-2-162.sa.ngrok.io/"
export const Host = "https://api.t-ickets.com/ms_login/";
export const token = "RXQ0eGpqSnpodGRNRnNvdktBYUNCQT09"
export const Valores = "Costos"
export const Metodos = "Metodo-pago"
export function Salircliente() {
    sessionStorage.removeItem(Valorcarrito)
    sessionStorage.removeItem(CarritoTicket)
    sessionStorage.removeItem(Whatsappnumero)
}

export const Envio = [
    {
        id: 1,
        envio: "",
        value: "",
        class: ""
    },
    {
        id: 2,
        envio: "Correo Electrónico",
        value: "correo",
        class: ""
    },
    {
        id: 3,
        envio: "Whatsapp",
        value: "whatsapp",
        class: ""
    }
]
export const Envioadmin = [
    {
        id: 1,
        envio: "",
        value: "",
        class: "",
    },
    {
        id: 2,
        envio: "Correo Electrónico",
        value: "correo",
        class: ""
    },
    {
        id: 3,
        envio: "Whatsapp",
        value: "whatsapp",
        class: ""
    },
    {
        id: 4,
        envio: "Impresion",
        value: "Impresion",
        class: ""
    }

]
export const Letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

export const Dias = {
    0: "Lunes",
    1: "Martes",
    2: "Miercoles",
    3: "Jueves",
    4: "Viernes",
    5: "Sabado",
    6: "Domingo",
}
export const Provincias = [
    {
        provincia: "Guayas",
        ciudades: ["Guayaquil", "Duran", "Samborondón"]
    },
    {
        provincia: "Manabí",
        ciudades: ["Portoviejo", "manata"]
    },
    {
        provincia: "Esmeralda",
        ciudades: ["Quininde"]
    }

]


