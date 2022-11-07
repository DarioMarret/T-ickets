import { CarritoTicket, Metodos,DatosUsuarioLocalStorang,Valorcarrito,listaasiento } from "./constantes"
import {getDatosUsuariosLocalStorag}from "./DatosUsuarioLocalStorag"

let PViten = []
let PVsilla = []
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
export function AgregarAsiento(sillas) {
    VerSillas()
    PVsilla.push(sillas) 
    localStorage.setItem(listaasiento,JSON.stringify(PVsilla))
    Filterduplicados()
}
export function EliminarSillas(silla){
    VerSillas()
     VerTienda()
    let nuevo = PVsilla.filter((e)=>{return e.seleccionmapa!=silla.localidad+"-"+silla.silla})
    const isBelowThreshold = (currentValue) => currentValue.localidad ==silla.localidad;
   // console.log( nuevo.filter(isBelowThreshold))
    if(nuevo.filter(isBelowThreshold).length==0){
        let iten = JSON.parse(localStorage.getItem(CarritoTicket));
    let Cost = []
    Cost = iten.filter(tienda => tienda.localidad !== silla.localidad)
    localStorage.setItem(CarritoTicket, JSON.stringify(Cost));
     localStorage.setItem(listaasiento, JSON.stringify(nuevo));
     Filterduplicados()
    return getVerTienda()
    }else
    localStorage.setItem(listaasiento, JSON.stringify(nuevo));
    return Filterduplicados()
}

 function Filterduplicados(){
    VerSillas()
    VerTienda()
    const valorDuplicadas = [];
                PVsilla.length > 0? PVsilla.forEach((p ,i)=> {
                        if (valorDuplicadas.findIndex(pd => pd.localidad === p.localidad) === -1) {
                            valorDuplicadas.push({ localidad: p.localidad,fila: '',localidaEspacio:p.localidaEspacio,nombreConcierto:p.nombreConcierto,valor:p.valor, cantidad: 1});
                            //console.log(p)
                            }
                        else{
                            valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].cantidad = parseInt(valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].cantidad) +1;
                            valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].fila = parseInt(valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].fila) +1;
                            valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].valor = parseFloat(valorDuplicadas[valorDuplicadas.findIndex(pd => pd.localidad === p.localidad)].valor);
                        }
                }) : ''
            localStorage.sillaspalco= JSON.stringify(valorDuplicadas)
            valorDuplicadas.length>0? valorDuplicadas.forEach((e,i)=>{
                if(PViten.findIndex(item=>item.localidad===e.localidad)===-1){
                    PViten.push({ localidad: e.localidad,fila: e.fila,localidaEspacio:e.localidaEspacio,nombreConcierto:e.nombreConcierto,valor:e.valor, cantidad: 1})
                }else{
                    PViten[PViten.findIndex(item=>item.localidad===e.localidad)].cantidad= e.cantidad
                    PViten[PViten.findIndex(item=>item.localidad===e.localidad)].valor= e.valor
                }
            }):''
           PViten.length>0? localStorage.setItem(CarritoTicket, JSON.stringify(PViten)):''
         //  PViten.length>0? console.log( PViten):''

}
export  function EliminarSillaLocal(silla) {    
      VerSillas()
       let nuevo = PVsilla.filter(e=>e.localidad!=silla)      
       localStorage.setItem(listaasiento, JSON.stringify(nuevo));
}

function VerSillas(){
     try {
        let iten = JSON.parse(localStorage.getItem(listaasiento));
        if (iten !== null) {            
            PVsilla= iten
        }
    } catch (error) {
        console.log(error)
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