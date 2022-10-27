import { CarritoTicket, Metodos,DatosUsuarioLocalStorang,Valorcarrito } from "./constantes"
import {getDatosUsuariosLocalStorag}from "./DatosUsuarioLocalStorag"

let PViten = []
export function TiendaIten(producto) {
    VerTienda()
    const existe = PViten.some(iten => iten.localidad === producto.localidad)
    if (existe) {
        //Actualizar Cantidad
        const Product = PViten.map(iten => {
            if (iten.localidad === producto.localidad) {
                if (producto.cantidad == 1) {
                    iten.cantidad++
                    return iten; // restorna la cantidad actualizada
                }
                if (producto.cantidad == -1 ){ 
                   
                    iten.cantidad--
                    return iten; // restorna la cantidad actualizada
                }
            } else {
                return iten //retorna la objetos que no son actualizado
            }
        })
        PViten = [...Product];
        localStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        let array = JSON.parse(localStorage.getItem(CarritoTicket))
        return array
    } else {
        //Agregamos a la tienda 
        localStorage.setItem(CarritoTicket, JSON.stringify([...PViten, producto]))
        let array = JSON.parse(localStorage.getItem(CarritoTicket))
        return array
    }
}
export function TiendaSillas(producto){
    VerTienda()   
        //Agregamos a la tienda 
        localStorage.setItem(CarritoTicket, JSON.stringify([...PViten, producto]))
        let array = JSON.parse(localStorage.getItem(CarritoTicket))
        return array
}
export function ElimnarSilla(){
    
}
function VerTienda() {
    try {
        let iten = JSON.parse(localStorage.getItem(CarritoTicket));
        if (iten !== null) {
            PViten = iten.filter(iten => iten.cantidad > 0);
        }
    } catch (error) {
        console.log(error)
    }
}

export function getVerTienda() {
    try {
        let iten = JSON.parse(localStorage.getItem(CarritoTicket));
        if (iten !== null) {
            PViten = [];
            return PViten = iten.filter(iten => iten.cantidad > 0);
        } else {
            PViten = [];
            localStorage.removeItem(CarritoTicket)
            return PViten
        }
    } catch (error) {
        console.log(error);
    }
}

export function EliminarByStora(localidad) {
    let iten = JSON.parse(localStorage.getItem(CarritoTicket));
    let Cost = []
    Cost = iten.filter(tienda => tienda.localidad !== localidad)
    localStorage.setItem(CarritoTicket, JSON.stringify(Cost));
    return getVerTienda()
}

export function ActualizarCantidad1(valor, id,) {
    VerTienda()
    const existe = PViten.some(iten => iten.id === id)
    if (existe) {
        const Actualizar = PViten.map(iten => {
            if (iten.id === id) {
                iten.cantidad = iten.cantidad + valor;
                return iten; // restorna la cantidad actualizada
            } else {
                return iten; //retorna la objetos que no son actualizado
            }
        })
        PViten = [...Actualizar];
        localStorage.setItem(CarritoTicket, JSON.stringify(PViten))
        JSON.parse(localStorage.getItem(CarritoTicket))
    }
}

export function GetCantidades() {
    let iten = JSON.parse(localStorage.getItem(CarritoTicket))
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


///subtotaltotal 
//metodo de pago
export function GetValores() {    
    let tag = JSON.parse(localStorage.getItem(CarritoTicket));
    var valor = 0;  
    var subtotal = 0;
    var comision = 0;
    var descrption = ""
    if (tag !== null) {
        tag.map(tienda => {
            subtotal += tienda.valor * tienda.cantidad
            descrption = tienda.nombreConcierto
            if(tienda.valor >= 101){
                comision += tienda.cantidad * 2
            }else if(tienda.valor >= 201){
                comision += tienda.cantidad * 3
            }else if(tienda.valor >= 301){
                comision += tienda.cantidad * 4
            }else if(tienda.valor >= 401){
                comision += tienda.cantidad * 5
            }else{
                comision += tienda.cantidad
            }

        })        
        valor =subtotal + comision;       
        let precios = {
            total: valor.toFixed(2)*5/100+valor,
            comision:comision.toFixed(2),
            comision_bancaria:  valor.toFixed(2)*5/100,
            subtotal: subtotal.toFixed(2),
            description: descrption,
            envio: getDatosUsuariosLocalStorag()? getDatosUsuariosLocalStorag().envio:''
        }         
        localStorage.setItem(Valorcarrito,JSON.stringify(precios) )
       
        return precios
    } else {
        return {
            total: 0,
            comision: 0,
            subtotal: 0
        }
    }
}

export function GetPrecio() {

}
export function LimpiarLocalStore(){
    localStorage.removeItem(CarritoTicket)
    localStorage.removeItem(DatosUsuarioLocalStorang)
    localStorage.removeItem(Metodos)

}


export function GetMetodo() {
    let tag = localStorage.getItem(Metodos);
    if (tag !== null) {
        return tag;
    } else {
        return null
    }
}