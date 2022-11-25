import {
    CarritoTicket, Metodos,
    DatosUsuarioLocalStorang,
    Valorcarrito, listaasiento,
    sillaspalco, seleccionmapa, Eventoid, concierto,
    DatosUsuariocliente
} from "./constantes"
import { getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
let PViten = []
let PVsilla = []
export function TiendaIten(producto) {
    VerTienda()
    const existe = PViten.some(iten => iten.localidad === producto.localidad)
    if (existe) {
        const Product = PViten.map(iten => {
            if (iten.localidad === producto.localidad) {
                if (iten.cantidad == 0) {
                    return item
                }
                if (producto.cantidad == 1) {
                    iten.cantidad++
                    return iten;
                }
                if (producto.cantidad == -1) {

                    iten.cantidad--
                    return iten;
                }
            } else {
                return iten
            }
        })
        PViten = [...Product];
        sessionStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        let array = JSON.parse(sessionStorage.getItem(CarritoTicket))
        return array
    } else {
        sessionStorage.setItem(CarritoTicket, JSON.stringify([...PViten, producto]))
        let array = JSON.parse(sessionStorage.getItem(CarritoTicket))
        return array
    }
}
export function TiendaSillas(producto) {
    VerTienda()
    sessionStorage.setItem(CarritoTicket, JSON.stringify([...PViten, producto]))
    let array = JSON.parse(sessionStorage.getItem(CarritoTicket))
    return array
}

function VerTienda() {
    try {
        let iten = JSON.parse(sessionStorage.getItem(CarritoTicket));
        if (iten !== null) {
            PViten = iten.filter(iten => iten.cantidad > 0);
        }
    } catch (error) {
        console.log(error)
    }
}

export function getVerTienda() {
    try {
        let iten = JSON.parse(sessionStorage.getItem(CarritoTicket));
        if (iten !== null) {
            PViten = [];
            return PViten = iten.filter(iten => iten.cantidad > 0);
        } else {
            PViten = [];
            sessionStorage.removeItem(CarritoTicket)
            return PViten
        }
    } catch (error) {
        console.log(error);
    }
}
export function EliminarByStora(localidad) {
    let iten = JSON.parse(sessionStorage.getItem(CarritoTicket));
    let Cost = []
    Cost = iten.filter(tienda => tienda.localidad !== localidad)
    sessionStorage.setItem(CarritoTicket, JSON.stringify(Cost));
    return getVerTienda()
}
export function EliminarSillas(silla) {
    let nuevo = PVsilla.filter((e) => { return e.seleccionmapa != silla.localidad + "-" + silla.silla })
    const isBelowThreshold = (currentValue) => currentValue.localidad == silla.localidad;
    if (nuevo.filter(isBelowThreshold).length == 0) {
        let iten = JSON.parse(sessionStorage.getItem(CarritoTicket));
        let Cost = []
        Cost = iten.filter(tienda => tienda.localidad != silla.localidad)
        // console.log("Aqui", Cost)
        console.log(nuevo)
        sessionStorage.setItem(CarritoTicket, JSON.stringify(Cost));
        sessionStorage.setItem(listaasiento, JSON.stringify(nuevo));
        Filterduplicados()
        getVerTienda()
    } else
        sessionStorage.setItem(listaasiento, JSON.stringify(nuevo));
    Filterduplicados()
    getVerTienda()
}
export function EliminarsilladeMesa(silla) {
    VerSillas()
    let ListadeSillas = PVsilla.filter((iten) => iten.seleccionmapa != silla.localodad)
    console.log(ListadeSillas)
    sessionStorage.setItem(listaasiento, JSON.stringify(ListadeSillas));
    Filterduplicados()
    //getVerTienda()
}

export function ActualizarCantidad1(valor, id,) {
    VerTienda()
    const existe = PViten.some(iten => iten.id === id)
    if (existe) {
        const Actualizar = PViten.map(iten => {
            if (iten.id === id) {
                iten.cantidad = iten.cantidad + valor;
                return iten;
            } else {
                return iten;
            }
        })
        PViten = [...Actualizar];
        sessionStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        JSON.parse(sessionStorage.getItem(CarritoTicket))
    }
}

export function GetCantidades() {
    let iten = JSON.parse(sessionStorage.getItem(CarritoTicket))
    if (iten !== null) {
        let cantidad_1 = 0
        let cantidad_2 = 0
        iten.map(tienda => {
            if (tienda.localidad == "PEGA LA VUELTA - PREFERENCIAL") {
                cantidad_2 += tienda.cantidad
            }
            if (tienda.localidad == "A ESA - GENERAL") {
                cantidad_1 += tienda.cantidad
            }
        })
        return {
            cantidad_1,
            cantidad_2
        }
    } else {
        return {
            cantidad_1: 0,
            cantidad_2: 0
        }
    }
}
export function AgregarAsiento(sillas) {
    VerSillas()
    PVsilla.push(sillas)
    sessionStorage.setItem(listaasiento, JSON.stringify(PVsilla))
    Filterduplicados()

}

let valorDuplicadas = [];
function Filterduplicados() {
    VerSillas()
    VerTienda()
    let ListadeSillas = PVsilla.filter((iten) => iten.estado == "reservado" || iten.estado == "seleccionado")
    ListadeSillas.length > 0 ? ListadeSillas.forEach((p, i) => {
        if (valorDuplicadas.findIndex(pd => pd.localidad === p.localidad) === -1) {
            valorDuplicadas.push({ localidad: p.localidad, fila: '', localidaEspacio: p.localidaEspacio, nombreConcierto: p.nombreConcierto, valor: p.valor, cantidad: 1, discapacidad: p.localidaEspacio.precio_discapacidad });
        }
        else {
            valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].fila = parseInt(valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].fila) + 1;
            valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].valor = parseFloat(valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].valor);
        }
    }) : ''
    sessionStorage.sillaspalco = JSON.stringify(valorDuplicadas)
    valorDuplicadas.length > 0 ? valorDuplicadas.forEach((e, i) => {
        if (PViten.findIndex(item => item.localidad === e.localidad) === -1) {
            PViten.push({ localidad: e.localidad, fila: e.fila, localidaEspacio: e.localidaEspacio, nombreConcierto: e.nombreConcierto, valor: e.valor, cantidad: 1, discapacidad: e.localidaEspacio.precio_discapacidad })
        } else {
            let cantidad = ListadeSillas.filter(f => f.localidad == e.localidad).length
            PViten[PViten.findIndex(item => item.localidad === e.localidad)].cantidad = cantidad
            PViten[PViten.findIndex(item => item.localidad === e.localidad)].valor = e.valor
        }
    }) : ''
    PViten.length > 0 ? sessionStorage.setItem(CarritoTicket, JSON.stringify(PViten)) : ''
}
export function EliminarSillaLocal(silla) {
    VerSillas()
    let nuevo = PVsilla.filter(e => e.localidad != silla)
    sessionStorage.setItem(listaasiento, JSON.stringify(nuevo));
}

function VerSillas() {
    try {
        let iten = JSON.parse(sessionStorage.getItem(listaasiento));
        if (iten != null) {
            PVsilla = iten
        } else {
            PViten = []
        }
    } catch (error) {
        console.log(error)
    }

}
export function VerSillaslist() {
    try {
        let iten = JSON.parse(sessionStorage.getItem(listaasiento));
        if (iten != null) {
            iten.filter((e) => e.estado === "seleccionado").map((e) => {
                e.estado = 'ocupado'
                return e
            })
            return [...iten]
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
    }

}
export function TotalSelecion() {
    let total = 0
    try {
        let iten = JSON.parse(sessionStorage.getItem(CarritoTicket))
        if (iten != null) {
            iten.map((e) => {
                total = total + e.cantidad
            })
            return total
        } else {
            return 0
        }
    } catch (err) {
        console.log(err)
    }
}
export function GetEstadousu() {
    let user = JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang))
    if (user == null) return { discapacidad: "No" }
    else if (user) return { discapacidad: user.discapacidad }
}
export function GetValores() {
    let tag = JSON.parse(sessionStorage.getItem(CarritoTicket));
    let user = JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang)) ? JSON.parse(sessionStorage.getItem(DatosUsuarioLocalStorang)) : { discapacidad: "No" }
    var valor = 0;
    var subtotal = 0;
    var comision = 0;
    var descrption = ""
    if (tag !== null) {
        tag.map(tienda => {
            let valores = user.discapacidad === "No" ? tienda.valor : tienda.localidaEspacio.precio_discapacidad
            subtotal += valores * tienda.cantidad
            descrption = tienda.nombreConcierto
            if (valores >= 101) {
                comision += tienda.cantidad * 2
            } else if (valores >= 201) {
                comision += tienda.cantidad * 3
            } else if (valores >= 301) {
                comision += tienda.cantidad * 4
            } else if (valores >= 401) {
                comision += tienda.cantidad * 5
            } else {
                comision += tienda.cantidad
            }
        })
        valor = subtotal + comision;
        let precios = {
            total: valor.toFixed(2) * 5 / 100 + valor,
            comision: comision.toFixed(2),
            comision_bancaria: valor.toFixed(2) * 5 / 100,
            subtotal: subtotal.toFixed(2),
            description: descrption + "" + user.discapacidad,
            envio: getDatosUsuariosLocalStorag() ? getDatosUsuariosLocalStorag().envio : ''
        }
        sessionStorage.setItem(Valorcarrito, JSON.stringify(precios))
        return precios
    } else {
        return {
            total: 0,
            comision: 0,
            subtotal: 0
        }
    }
}

export function LimpiarLocalStore() {
    PVsilla = []
    PViten = []
    valorDuplicadas = []
    sessionStorage.removeItem(CarritoTicket)
    sessionStorage.removeItem(Metodos)
}
export function Limpiarseleccion() {
    sessionStorage.removeItem(sillaspalco)
    sessionStorage.removeItem(listaasiento)
    sessionStorage.removeItem(CarritoTicket)
    sessionStorage.removeItem(listaasiento)
    sessionStorage.removeItem(seleccionmapa)
    sessionStorage.removeItem(Eventoid)
    sessionStorage.removeItem(concierto)
}
export function GetMetodo() {
    let tag = sessionStorage.getItem(Metodos);
    if (tag !== null) {
        return tag;
    } else {
        return null
    }
}