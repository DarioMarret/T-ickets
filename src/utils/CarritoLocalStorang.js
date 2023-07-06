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
export function verAsientos() {
    try {
        let item = JSON.parse(sessionStorage.getItem("asientosList"))
        if (item != null) {
            return item.map(e=>{
                return {
                    id_silla: e.ids,
                    id: e.localidaEspacio.idcolor,
                    cedula: e.cedula,
                    estado: "",
                    ...e
}
            })
        } else {
            return []
        }
    } catch (error) {
        return []
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
        //   console.log(nuevo)
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
    let ListadeSillas = PVsilla.filter((iten) => iten.seleccionmapa != silla.localidad)
    // console.log(ListadeSillas)
    sessionStorage.setItem(listaasiento, JSON.stringify(ListadeSillas));
    Filterduplicados()
    //getVerTienda()
}


export function Verificalocalidad(valor, id) {
    let user = getDatosUsuariosLocalStorag()
    VerTienda()
    if (PViten.some(item => item.id == valor.id) && id.find(e => e.cedula == user.cedula) != undefined) {
        let index = PViten.findIndex(k => k.id == valor.id)
        PViten[index] = { ...valor, cantidad: id.find(e => e.cedula == user.cedula).cantidad, protocol: id.find(e => e.cedula == user.cedula).protocol }
        sessionStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        let array = JSON.parse(sessionStorage.getItem(CarritoTicket))

        return array
    }
    else if (id.find(e => e.cedula == user.cedula) != undefined) {
        PViten.push({ ...valor, cantidad: id.find(e => e.cedula == user.cedula).cantidad, protocol: id.find(e => e.cedula == user.cedula).protocol })
        sessionStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        let array = JSON.parse(sessionStorage.getItem(CarritoTicket))

        return array
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
            valorDuplicadas.push({ localidad: p.localidad, fila: '', localidaEspacio: p.localidaEspacio, id: p.localidaEspacio["idcolor"], nombreConcierto: p.nombreConcierto, valor: p.valor, cantidad: 1, discapacidad: p.localidaEspacio.precio_discapacidad });
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
function ListaEliminaLocalida() {
    let user = getDatosUsuariosLocalStorag()
    let iten = JSON.parse(sessionStorage.getItem(listaasiento));
    if (iten != undefined && iten != null) {
        return iten.map(e => {
            return {
                silla: e.silla, cedula: user.cedula,
                id: e.localidaEspacio["idcolor"],
                estado: "disponible"
            }
        })
    }
    else {
        return []
    }
}
export function ListaElimnaLCompleta() {
    return ListaEliminaLocalida()
}
export function listaEliminasillas(parms) {
    return ListaEliminaLocalida().filter(e => e.id == parms)
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
    var sumcomision = 0;
    var descrption = ""
    if (tag !== null) {
        tag.map(tienda2 => {
            //tienda2.localidaEspacio.descuento>0
            if (false) {
                let descuento = "1." + tienda2.localidaEspacio.descuento
                tienda2.valor = (parseInt(tienda2.valor) * parseInt(tienda2.cantidad)) / parseFloat(descuento)
            } else {
                tienda2.valor = (parseInt(tienda2.valor) * parseInt(tienda2.cantidad))
            }
            return tienda2

        })

        tag.map(tienda => {
            let comisioreal = (tienda.localidaEspacio["id"] == 285 && sessionStorage.getItem("Metodo-pago") == "Efectivo-Local") ? 1 : tienda.localidaEspacio["comision_boleto"]
            let valores = tienda.valor
            subtotal += valores
            descrption = tienda.nombreConcierto
            sumcomision += parseInt(tienda.cantidad) * parseFloat(comisioreal)
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
        valor = subtotal + sumcomision;
        let precios = {
            sumcomision: parseFloat(sumcomision.toFixed(2)),
            comision_bancaria: valor.toFixed(2) * 8 / 100,
            subtotal: subtotal.toFixed(2),
            description: descrption,
            comision: parseFloat(sumcomision).toFixed(2),
            envio: getDatosUsuariosLocalStorag() ? getDatosUsuariosLocalStorag().envio : '',
            total: valor.toFixed(2) * 8 / 100 + valor,
            desctc: Math.round((valor.toFixed(2) * 8 / 100 + valor) / 1.15),
            desc: Math.round((subtotal + comision) / 1.15),
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