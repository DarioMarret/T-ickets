import React,{useEffect,useState} from "react"
import { Modal } from "react-bootstrap" 
import { Metodos } from 'utils/constantes'
import { listarpreciolocalidad } from "utils/Querypanel"
import { TiendaIten , GetValores,getVerTienda, EliminarByStora, } from "utils/CarritoLocalStorang"
import mapa from '../../../assets/img/mapa.png'



const  ModalCarritoView=(prop)=>{
    const{showshop, handleClosesop,handleContinuar,precios,setListaPrecio,setListarCarritoDetalle,datos}=prop
    const [detalle,setDetalle]=useState([])
    const [timer, setTimer] = useState(false)
    const lista =async ()=>{
        let precios = await listarpreciolocalidad(datos.codigoEvento)
        setPrecios(precios.data)
    }
    const [checked, setChecked] = useState({
        Efectivo: "",
        Tarjeta: "",
        Deposito: "",
    })
    const [check, setCheck] = useState(true)
    function handelMetodopago(target, value) {
        setChecked({
            [target.name]: value,
        })       
        localStorage.setItem(Metodos, value)
        setCheck(false)
    }
    function agregar(e){
        let arr = detalle        
        var index = arr.findIndex(obj => obj.id==e.id);
        
        //var ind = arr.includes(index=>index.id==e.id)
        let producto = {
            cantidad: 1,
            localidad:e.localodad,
            id:e.id,
            fila: 0,
            valor: e.precio_normal,
            nombreConcierto: "GIRA 40 ANIVERSARIO",
        }
        TiendaIten(producto)
        setDetalle([])
  if (index == -1) {
    let nuevo = {id:e.id, localidad:e.localodad,valor:e.precio_normal, cantidad:1}
    arr.push(nuevo);
   // console.log(arr)
 //  cosole.log(nuevo)
    setDetalle(getVerTienda())
    setTimer(!timer)
    let data = GetValores()
   // console.log(data)

  } else {
    
   
    let suma=     parseFloat(arr[index].valor) + parseFloat(e.precio_normal) 
    let cantidad = arr[index].cantidad +1    
    arr[index].valor = suma.toFixed(2)
     arr[index].cantidad=cantidad
   
    setDetalle(getVerTienda())
    let data = GetValores()
    setTimer(!timer)
    //console.log(data)

  }
    }
    function restaprecio(e){
        let arr = detalle        
        var index = arr.findIndex(obj => obj.id==e.id);
        let producto = {
            cantidad: -1,
            localidad:e.localodad,
           
            fila: 0,
            valor: e.precio_normal,
            nombreConcierto: "GIRA 40 ANIVERSARIO",
        }

      
        setDetalle([])
        if (index != -1) {
        let suma=     parseFloat(arr[index].valor) - parseFloat(e.precio_normal) 
        let cantidad = arr[index].cantidad   
        arr[index].valor = suma.toFixed(2)
         arr[index].cantidad=cantidad
         if(cantidad>0){
         setDetalle(getVerTienda())
         setTimer(!timer)
         let data = GetValores()
         console.log(data)
         cantidad>=1? TiendaIten(producto):''
        }else if(cantidad==0){
        let array = detalle    
        let filtro = array.filter(obj=>obj.id!=e.id)
        setDetalle(getVerTienda())
        setTimer(!timer)
        let data = GetValores()
        console.log(data)
        setTimer(!timer)
    }   }else{
            setDetalle(getVerTienda())
            setTimer(!timer)
        }
      }
    function Eliminar(e){
       // let array = detalle
       // e.localidad 
        EliminarByStora(e.localidad )
        setDetalle(getVerTienda())
      //  setDetalle([])
      /*  console.log("Elimina",e)
        let filtro = array.filter(obj=>obj.id!=e.id)
        setDetalle(filtro)*/
    }
   
    useEffect(()=>{
        /*(async()=>{
            await lista()
        })()*/
        setDetalle(getVerTienda())
        setListarCarritoDetalle(getVerTienda())
        setListaPrecio(GetValores())

    },[showshop,timer])
    return (
        <>
       {/* <div className="bg-danger" style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            zIndex: 10000

        }}>

        </div>*/}
        <Modal
            show={showshop}          
            size="lg"

            style={{height: "100%",width: "100%"}}
            fullscreen={true}            
        >
            <Modal.Header >
                <h5 className="modal-title text-center justify-content-center">Boleteria</h5>
                <button type="button" className="close"  onClick={()=>handleClosesop()} >
                    ×
                </button>
            </Modal.Header>

            <Modal.Body  >
                <div className="d-flex flex-wrap-reverse" >
                <div className="col-12 col-lg-8" >
                    <div>
                <div className=" table table-striped  ">
                      <div className="bg-secondary p-1 d-none d-sm-block text-black flex-table row" role="rowgroup">
                            <div className="row text-center header" role="rowgroup">
                            <div className="flex-row text-center col-4" role="columnheader">Localidad</div>
                        
                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Precio</div>
                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Cantidad</div>
                            <div className="flex-row  text-center col-2 col-md-3" role="columnheader">Características</div>
                            </div>                       
                            </div>
                            <div className="bg-secondary p-1 text-black flex-table row d-block d-sm-none" >                                
                                <h4>LOCALIDADES</h4>                            
                            </div>
                   
                   
                    <div className="text-center list-group-flush "style={{maxHeight:'250px' ,overflowY:'auto',overflowX:'hidden' }}>
                    { precios.length>0?
                    precios.map((e,i)=>{
                        return(
                            <div className="d-flex row list-group-item" key={i} >
                              <div className="flex-row  d-none d-sm-block    first text-center col-4"  role="cell">
                                <div className="d-flex justify-content-center align-items-baseline  ">
                                <div className="rounded-3 px-2" style={{ backgroundColor: 'brown', width: '30px', height: '20px' }}></div>
                                    <p className="px-2 " style={{ fontSize: '1em' }}>{e.localodad}</p>
                                </div>
                                </div>
                                <div className="d-flex justify-content-center  d-none d-sm-block   flex-row  col-6 col-md-3" role="cell">{e.precio_normal}</div>
                                <div className="flex-row d-none d-sm-block  d-none d-sm-block  justify-content-center px-3 col-12 col-md-2" role="cell">
                                <div className="d-flex  flex-row justify-content-center  ">
                                        <p className="resta input-group-text  " onClick={()=>restaprecio(e)} ><i className="fa fa-minus"></i></p>
                                       {/* <input size="4" disabled={true}
                                        
                                            type="text" style={{
                                                width: '50px!important',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }} className="form-control d-none form-control-sm" />*/}

                                        <p className="suma input-group-text mx-1" onClick={()=>agregar(e)}><i className="fa fa-plus"></i></p>
                                </div>
                                </div>
                                <div className="flex-row d-flex  d-none d-sm-block  justify-content-center col-12 col-md-3" role="cell">
                                <p className="px-2 " style={{ fontSize: ' 1em' }}>tipo</p>
                                </div>      
                                <div className=" col-6 d-block d-sm-none col-6 d-flex flex-row ">
                                                        <div className="d-flex flex-column ">
                                                        <h5 className="card-title">{e.localodad}</h5>
                                                      
                                                        <p className="card-subtitle">precio ${e.precio_normal}</p>
                                                        <p className="card-subtitle">Tipo </p>
                                                        </div>
                                                    </div>
                                            <div className="col-6 d-block d-sm-none text-center d-flex justify-content-end align-items-center">
                                                    <p className="resta input-group-text  " onClick={()=>restaprecio(e)} ><i className="fa fa-minus"></i></p>
                                                            {/*<input size="4" disabled={true}
                                                                type="text" style={{
                                                                    width: '50px!important',
                                                                    alignItems: 'center',
                                                                    textAlign: 'center',
                                                                }} className="form-control d-none form-control-sm" />*/}
                                                    <p className="suma input-group-text " onClick={()=>agregar(e)}><i className="fa fa-plus"></i></p>
                                            </div>
                            </div>
                        )
                    })
                    :''}
                    </div>              
                    
                  
                </div>
                </div>
                <div className="  ">
                        <div className="detalles-resumen  "
                        >
                            <div className="bg-secondary p-2 d-none d-sm-block text-black flex-table row" role="rowgroup">
                            
                            <div className="row text-center header" role="rowgroup">
                            <div className="flex-row text-center col-2 col-md-3" role="columnheader">Localidad</div>
                            <div className=" flex-row  text-center col-2 col-md-2" role="columnheader">Asiento</div>
                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Precio</div>
                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Cantidad</div>
                            <div className="flex-row  text-center col-2 col-md-3" role="columnheader">Características</div>
                            </div>
                       
                            </div>
                            <div className="bg-secondary p-1 text-black flex-table row d-block d-sm-none " >
                                
                                    <h4>AGRAGADOS</h4>
                                
                            </div>
                            <div className="text-center px-2  list-group-flush"style={{maxHeight:'250px'  ,overflowY:'auto',overflowX:'hidden' }}>
                            {
                                detalle.length>0?
                                detalle.map((e,i)=>{
                                    return(
                                        <div className="d-flex flex-table row list-group-item" role="rowgroup" key={"items"+i}>
                                            <div className="flex-row first text-center d-none d-sm-block col-3 col-md-3" role="cell">{e.localidad}</div>
                             <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">{e.fila}</div>
                            <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">${e.valor * e.cantidad}</div>
                            <div className="flex-row d-none d-sm-block text-center  col-2 col-md-2">{e.cantidad}</div>
                             <div className="flex-row d-none d-sm-block  text-center 
                             col-3 col-md-3">
                             <button className="btn btn-danger" onClick={()=>Eliminar(e)} >                                                            Eliminar
                                                        </button>
                                                    </div>
                                                    <div className=" col-6 d-block d-sm-none col-6 d-flex flex-row ">
                                                        <div className="d-flex flex-column ">
                                                        <h5 className="card-title">{e.localidad}</h5>
                                                        <p className="card-subtitle">fila {e.fila}</p>
                                                        <p className="card-subtitle">Valor ${e.valor * e.cantidad}</p>
                                                        <p className="card-subtitle">Cantidad {e.cantidad}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 d-block d-sm-none text-center d-flex justify-content-end align-items-center"

                                                    >
                                                        <button className="btn btn-danger" onClick={()=>Eliminar(e)} >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                    
                                                    {/*<hr className=" border bg-dark" style={{height:'1px',marginLeft:0,marginRight:0 }} ></hr>*/}

                                        </div>
                                    )
                                })
                                :''

                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-none d-sm-block col-lg-4">

                    <img className="img-fluid" src={mapa}/>

                </div>
                </div>
               
            </Modal.Body>
            <Modal.Footer className="d-flex  p-3 border-top  justify-content-between align-items-cente">
                
                    <div className="d-flex flex-column">
                    
                            <div className="px-5">
                                Método de pago
                                <div className="form-check">
                                    <input className="v-check form-check-input" type="radio"
                                        name="Efectivo" id="Efectivo"
                                        checked={checked.Efectivo == "Efectivo" ? true : false}
                                        onChange={(e) => handelMetodopago(e.target, "Efectivo")}                                   
                                    />
                                    <label className="form-check-label" >
                                        Efectivo
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="v-check form-check-input" type="radio"
                                         checked={checked.Tarjeta == "Tarjeta" ? true : false}
                                         onChange={(e) => handelMetodopago(e.target, "Tarjeta")}
                                         name="Tarjeta" id="Tarjeta" />
                                    <label className="form-check-label" >
                                        Tarjeta
                                    </label>
                                </div>
                                <div className="form-check ">
                                    <input className="form-check-input" type="radio"
                                     checked={checked.Deposito == "Deposito" ? true : false}
                                     onChange={(e) => handelMetodopago(e.target, "Deposito")}
                                     name="Deposito" id="Deposito" />
                                    <label className="form-check-label" >
                                        Deposito-transferencia
                                    </label>
                                </div>
                            </div>
                        
                    </div>
                    <div className="d-flex flex-column" > 
                    <h4
                            style={{ 
                                fontSize: '2rem',
                            }}
                            >SUBTOTAL:</h4>
                                <h4 
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                }}
                                className="px-1 total-detalle"> {GetValores()? "$" + GetValores().subtotal : null}</h4>

                    </div>
                    <div className="">
                        { detalle.length>0?
                            <button className="btn btn-primary" disabled={check } onClick={handleContinuar}>continuar</button>:
                            <button className="btn btn-primary" disabled={true} >continuar</button>
                        }
                    
                    </div>

                
                   
            </Modal.Footer>
           
        </Modal>
    
       
    </>
    )
}
export default ModalCarritoView