import React,{useEffect,useState} from "react"
import { Modal } from "react-bootstrap" 
import { Metodos } from 'utils/constantes'
import { listarpreciolocalidad } from "utils/Querypanel"
import { TiendaIten , GetValores,getVerTienda, EliminarByStora, } from "utils/CarritoLocalStorang"
import { useDispatch,useSelector } from "react-redux"
import { cargarmapa,settypo ,filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice"
import mapa from '../../../assets/img/mapa.png'
const  ModalCarritoView=(prop)=>{
    const{showshop, handleClosesop,handleContinuar,setMapashow,precios,setListaPrecio,setListarCarritoDetalle,datos}=prop
    let usedispatch= useDispatch()
    let sleccionlocalidad = useSelector((state)=>state.mapaLocalSlice)
    const [detalle,setDetalle]=useState([])
    const [timer, setTimer] = useState(false)
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
    function abrirlocalidad(){
        setMapashow(true)
        handleClosesop(false)
    }
    useEffect(()=>{
        /*(async()=>{
            await lista()
        })()*/
        setDetalle(getVerTienda())
        setListarCarritoDetalle(getVerTienda())
        setListaPrecio(GetValores())
       // console.log(precios.pathmapa)
      
          precios.pathmapa.length>0? precios.pathmapa.map((e,i)=>{
            $("#"+e.path).attr("class",e.id+"  disponible " + e.tipo )
             $("#"+e.path).attr("fill",e.fill)   
          //  $("#"+e.path).attr("fill",e.fill,"class",e.id )  
            //$("#"+e.path).addClass("class","seleccion") 
           // console.log("deveria pintar")        
       }):''
    },[showshop,timer])
   /* $(document).on('click','path.disponible',function(){        
        let consulta = precios.precios.filter((F)=>F.idcolor== this.classList[0])
        let color = precios.pathmapa
        let mapa = precios.mapa
        console.log(consulta)
      
    })*/

    const path = document.querySelectorAll('path.disponible')

    path.forEach(E=>{
        E.addEventListener("click",function(){
            let consulta = precios.precios.filter((F)=>F.idcolor== this.classList[0])
        let color = precios.pathmapa.filter((E)=>E.id== consulta[0].idcolor)
        let filtro = sleccionlocalidad.localidades.filter((G)=>G.nombre==consulta[0].localodad)
        let espacio = JSON.parse(filtro[0].mesas_array)
        usedispatch(cargarmapa(color))
        usedispatch(settypo({nombre:precios.mapa,typo:consulta[0].tipo,precio: {...consulta[0]}}))
        usedispatch(filtrarlocali(espacio.datos))
        localStorage.seleccionmapa= JSON.stringify(consulta[0])

        abrirlocalidad()       
        })
    })



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
            fullscreen={true}>
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
                    { precios.precios.length>0?
                    precios.precios.map((e,i)=>{
                        return(
                            <div className="d-flex row list-group-item" key={i} >
                              <div className="flex-row  d-none d-sm-block    first text-center col-4"  role="cell">
                                <div className="d-flex justify-content-center align-items-baseline  ">
                                <div className="rounded-3 px-2" style={{ backgroundColor: e.color, width: '30px', height: '20px' }}></div>
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

                  {/*<img className="img-fluid" onClick={abrirlocalidad} src={mapa}/>*/}
                    <div className="d-flex justify-content-center" >
                                      
                                    {showshop?     <svg version="1.0" id="estandar" xmlns="http://www.w3.org/2000/svg"   style={{width:'90%',height:'auto'}}
                                            width="1024.000000pt"  viewBox="0 0 1024.000000 768.000000"
                                            preserveAspectRatio="xMidYMid meet"
                                            >
                                            <g transform="translate(0.000000,768.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M3010 7295 c-80 -13 -150 -24 -156 -24 -9 -1 37 -234 178 -901 l14
                            -65 40 1 c21 1 101 5 177 9 l137 8 0 499 0 498 -122 -1 c-76 -1 -179 -10 -268
                            -24z m90 -405 c12 -23 3 -45 -30 -75 l-22 -20 28 -5 c51 -9 40 -30 -15 -30
                            -63 0 -66 15 -14 63 24 23 34 40 30 51 -8 20 -36 21 -43 1 -7 -18 -24 -20 -24
                            -2 0 38 71 52 90 17z m112 -5 c10 -23 8 -29 -21 -59 l-33 -34 28 -4 c15 -2 29
                            -9 32 -15 2 -9 -11 -13 -47 -13 -62 0 -65 12 -16 60 19 19 35 40 35 47 0 21
                            -31 28 -42 10 -11 -20 -28 -22 -28 -4 0 42 74 52 92 12z m108 5 c9 -16 8 -20
                            -5 -20 -8 0 -15 5 -15 10 0 17 -29 11 -39 -8 -8 -14 -5 -17 21 -17 39 0 56
                            -24 42 -62 -11 -33 -53 -43 -78 -18 -21 22 -21 98 0 119 22 22 61 20 74 -4z" id="0" className="none"></path><path d="M3264 6826 c-8 -22 3 -49 19 -43 6 2 12 14 12 27 0 27 -22 39 -31 16z" id="1" className="none"></path><path d="M3420 6800 l0 -520 119 0 120 0 3 28 c3 26 6 27 65 30 l62 3 3 82 3
                            82 143 3 142 3 0 404 0 405 -330 0 -330 0 0 -520z m238 98 c19 -19 14 -40 -20
                            -75 l-32 -33 32 0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15
                            60 19 19 35 42 35 52 0 23 -36 24 -44 1 -5 -12 -10 -13 -18 -5 -8 8 -8 15 2
                            27 15 18 61 20 78 3z m110 0 c19 -19 14 -40 -20 -75 l-32 -33 32 0 c22 0 32
                            -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 19 19 35 42 35 52 0 23
                            -36 24 -44 1 -5 -12 -10 -13 -18 -5 -8 8 -8 15 2 27 15 18 61 20 78 3z m122 5
                            c0 -4 -11 -30 -25 -58 -13 -27 -26 -58 -29 -68 -9 -29 -27 -9 -20 21 4 15 15
                            42 25 60 l18 32 -34 0 c-19 0 -35 5 -35 10 0 6 23 10 50 10 28 0 50 -3 50 -7z" id="2" className="none"></path><path d="M4100 6800 l0 -520 125 0 125 0 0 30 0 30 65 0 65 0 0 85 0 85 150 0
                            150 0 0 405 0 405 -340 0 -340 0 0 -520z m248 76 c3 -20 -4 -36 -23 -56 l-27
                            -28 26 -4 c43 -5 35 -23 -13 -26 -65 -5 -70 10 -22 57 22 22 41 45 41 51 0 19
                            -32 24 -45 7 -15 -20 -25 -22 -25 -4 0 23 24 38 55 35 25 -2 31 -8 33 -32z
                            m112 14 c12 -23 3 -45 -30 -75 l-22 -20 28 -5 c45 -8 34 -25 -18 -28 -60 -4
                            -64 15 -12 62 25 23 35 39 31 50 -8 20 -36 21 -43 1 -7 -18 -24 -20 -24 -2 0
                            38 71 52 90 17z m106 -15 c0 -17 4 -37 8 -44 4 -6 5 -23 2 -36 -7 -28 -50 -44
                            -75 -28 -20 12 -26 50 -12 67 7 9 7 16 0 23 -8 8 -7 17 1 33 9 16 19 20 43 18
                            28 -3 32 -7 33 -33z" id="3" className="none"></path><path d="M4510 6876 c0 -8 4 -17 8 -20 13 -8 35 11 28 23 -10 16 -36 14 -36
                            -3z" id="4" className="none"></path><path d="M4504 6819 c-8 -14 21 -43 35 -35 19 12 13 46 -8 46 -11 0 -23 -5
                            -27 -11z" id="5" className="none"></path><path d="M4790 6800 l0 -520 335 0 335 0 0 520 0 520 -335 0 -335 0 0 -520z
                            m268 23 c2 -24 -4 -36 -28 -57 l-32 -26 31 0 c21 0 31 -5 31 -15 0 -11 -12
                            -15 -44 -15 -25 0 -48 4 -51 10 -3 5 13 30 36 55 33 35 40 48 30 58 -9 9 -16
                            9 -31 -1 -26 -16 -30 -15 -30 3 0 20 39 35 65 25 13 -5 21 -18 23 -37z m111
                            18 c11 -20 0 -50 -29 -76 l-22 -20 28 -5 c41 -7 31 -25 -17 -28 -63 -5 -68 10
                            -20 59 22 23 41 48 41 56 0 15 -36 18 -45 3 -9 -15 -25 -12 -25 5 0 34 72 38
                            89 6z m112 -4 c24 -44 -6 -127 -46 -127 -21 0 -48 27 -41 39 6 9 12 9 25 -3
                            13 -12 20 -13 29 -4 16 16 15 29 -2 22 -26 -10 -56 15 -56 46 0 54 67 74 91
                            27z" id="6" className="none"></path><path d="M5214 6825 c-8 -20 4 -35 27 -35 14 0 19 7 19 25 0 18 -5 25 -20 25
                            -11 0 -23 -7 -26 -15z" id="7" className="none"></path><path d="M5480 6915 l0 -404 128 -3 127 -3 3 -112 3 -113 209 0 210 0 0 520 0
                            520 -340 0 -340 0 0 -405z m278 -27 c20 -20 14 -50 -15 -80 l-27 -28 27 0 c17
                            0 27 -5 27 -15 0 -11 -12 -15 -50 -15 -29 0 -50 5 -50 11 0 6 18 28 40 50 22
                            22 40 44 40 50 0 18 -33 23 -45 6 -16 -22 -25 -21 -25 2 0 30 54 43 78 19z
                            m112 -3 c7 -8 10 -22 6 -31 -3 -8 -1 -24 5 -35 16 -30 -14 -71 -48 -67 -27 3
                            -53 32 -40 44 4 4 13 -1 21 -11 8 -11 20 -16 30 -12 22 9 20 38 -4 44 -24 6
                            -26 19 -5 27 18 7 20 36 2 36 -7 0 -18 -5 -25 -12 -17 -17 -28 -2 -12 17 16
                            19 54 19 70 0z m111 -2 c8 -9 14 -35 14 -58 0 -23 -6 -49 -14 -58 -18 -23 -58
                            -21 -71 2 -14 27 -13 104 2 119 17 17 53 15 69 -5z" id="8" className="none"></path><path d="M5926 6865 c-17 -46 0 -102 29 -92 23 9 18 100 -6 105 -9 2 -19 -4
                            -23 -13z" id="9" className="none"></path><path d="M6170 6910 l0 -410 130 0 130 0 0 -110 0 -110 205 0 205 0 0 520 0
                            520 -335 0 -335 0 0 -410z m278 -22 c20 -20 14 -48 -17 -78 l-28 -29 25 -3
                            c14 -2 27 -9 30 -15 2 -9 -11 -13 -47 -13 -62 0 -65 12 -16 60 36 35 46 70 20
                            70 -9 0 -18 -7 -21 -15 -4 -8 -12 -15 -20 -15 -17 0 -17 5 -4 31 12 22 59 26
                            78 7z m112 -9 c8 -15 8 -24 0 -34 -7 -9 -8 -15 0 -20 14 -8 13 -48 -2 -63 -19
                            -19 -66 -15 -78 7 -13 25 8 42 22 17 11 -20 34 -21 42 0 8 20 -1 34 -20 34
                            -19 0 -18 10 4 26 13 10 14 15 5 25 -10 10 -15 10 -27 0 -23 -20 -42 -9 -22
                            12 24 23 63 22 76 -4z m100 -54 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 51 0
                            41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7 -34 7 -75z" id="10" className="none"></path><path d="M6860 6822 l0 -499 133 -6 c72 -4 152 -9 177 -13 l46 -6 102 483 c56
                            266 100 484 98 486 -12 13 -348 53 -442 53 l-114 0 0 -498z m160 68 c12 -23 3
                            -45 -30 -75 l-22 -20 28 -5 c51 -9 40 -30 -15 -30 -62 0 -65 12 -16 60 19 19
                            35 40 35 47 0 21 -31 28 -42 10 -11 -20 -28 -22 -28 -4 0 38 71 52 90 17z
                            m100 6 c6 -8 10 -23 8 -33 -1 -10 1 -24 6 -31 4 -7 5 -24 2 -37 -10 -40 -78
                            -47 -92 -10 -10 25 4 30 25 11 23 -21 41 -14 41 15 0 13 -7 19 -22 19 l-23 0
                            24 19 c13 10 21 23 17 30 -9 14 -36 15 -36 1 0 -5 -7 -10 -15 -10 -18 0 -19
                            12 -3 28 16 16 53 15 68 -2z m118 2 c20 -20 13 -49 -19 -79 l-31 -29 31 0 c21
                            0 31 -5 31 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 39 38 46 70 15 70
                            -11 0 -20 -7 -20 -15 0 -8 -7 -15 -15 -15 -18 0 -18 5 -5 31 12 22 59 26 78 7z" id="11" className="none"></path><path d="M2700 7239 c-122 -28 -380 -124 -380 -141 0 -12 291 -721 300 -731 6
                            -7 354 94 367 107 4 4 -154 787 -161 792 0 1 -57 -12 -126 -27z m-92 -361 c19
                            -19 14 -40 -20 -75 l-32 -33 32 0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15
                            -61 0 -64 13 -15 60 39 37 46 70 16 70 -10 0 -21 -7 -25 -15 -7 -18 -26 -20
                            -26 -2 0 21 22 37 50 37 14 0 31 -5 38 -12z m110 0 c20 -20 14 -44 -20 -77
                            l-32 -31 32 0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60
                            19 19 35 42 35 52 0 23 -36 24 -44 1 -5 -12 -10 -13 -18 -5 -8 8 -8 15 2 27
                            15 18 61 20 78 3z m122 2 c0 -5 -13 -10 -29 -10 -16 0 -31 -6 -35 -15 -4 -11
                            1 -15 17 -15 31 0 47 -18 47 -52 0 -27 -23 -48 -54 -48 -16 0 -46 26 -46 41 0
                            15 22 10 36 -8 12 -17 14 -17 30 -1 26 26 11 52 -26 44 -27 -5 -30 -3 -30 18
                            0 45 10 56 51 56 21 0 39 -4 39 -10z" id="12" className="none"></path><path d="M7435 7256 c-11 -34 -164 -781 -161 -784 7 -6 367 -114 370 -110 2 2
                            263 637 302 733 2 6 -56 34 -129 63 -146 58 -376 117 -382 98z m73 -378 c20
                            -20 14 -44 -20 -77 l-32 -31 32 0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15
                            -61 0 -64 13 -15 60 19 19 35 42 35 52 0 23 -36 24 -44 1 -5 -12 -10 -13 -18
                            -5 -8 8 -8 15 2 27 15 18 61 20 78 3z m108 -25 c0 -18 3 -36 7 -39 25 -25 -6
                            -74 -47 -74 -16 0 -46 26 -46 41 0 15 22 10 35 -8 11 -14 15 -15 28 -4 18 14
                            12 41 -9 41 -19 0 -18 10 3 25 9 7 13 17 9 23 -9 15 -36 16 -36 2 0 -5 -7 -10
                            -15 -10 -13 0 -14 4 -5 21 9 15 19 19 43 17 29 -3 32 -6 33 -35z m114 16 c8
                            -15 8 -24 0 -34 -7 -9 -8 -15 0 -20 14 -8 13 -48 -2 -63 -24 -24 -88 -4 -88
                            29 0 15 22 10 36 -8 12 -17 14 -17 30 -1 18 17 12 38 -12 38 -19 0 -18 16 1
                            24 18 7 20 36 2 36 -7 0 -18 -5 -25 -12 -15 -15 -26 -4 -19 17 9 23 64 19 77
                            -6z" id="13" className="none"></path><path d="M2175 7042 c-110 -50 -287 -148 -343 -191 l-24 -17 279 -422 c153
                            -231 281 -421 286 -422 13 0 307 163 307 171 0 9 -367 906 -378 924 -5 8 -44
                            -5 -127 -43z m25 -442 c12 -23 3 -45 -30 -75 l-22 -20 28 -5 c51 -9 40 -30
                            -15 -30 -62 0 -66 15 -16 61 39 35 46 69 16 69 -10 0 -21 -7 -25 -15 -7 -18
                            -26 -20 -26 -2 0 38 71 52 90 17z m108 8 c19 -19 14 -40 -20 -75 l-32 -33 32
                            0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 39 37 46 70
                            16 70 -10 0 -21 -7 -25 -15 -7 -18 -26 -20 -26 -2 0 21 22 37 50 37 14 0 31
                            -5 38 -12z m102 -32 c0 -26 5 -47 13 -50 10 -5 10 -7 0 -12 -7 -3 -13 -14 -13
                            -25 0 -10 -4 -19 -10 -19 -5 0 -10 9 -10 20 0 16 -7 20 -35 20 -19 0 -35 3
                            -35 8 1 13 70 102 80 102 6 0 10 -20 10 -44z" id="14" className="none"></path><path d="M2372 6560 c-16 -26 -15 -30 3 -30 9 0 15 9 15 25 0 30 -2 31 -18 5z" id="15" className="none"></path><path d="M7771 6628 c-106 -259 -191 -471 -189 -473 10 -8 302 -165 308 -165
                            4 0 133 190 286 421 l278 422 -29 23 c-49 39 -235 141 -351 192 l-110 49 -193
                            -469z m147 -20 c20 -20 14 -44 -20 -77 l-32 -31 32 0 c22 0 32 -5 32 -15 0
                            -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 19 19 35 42 35 52 0 23 -36 24 -44 1
                            -5 -12 -10 -13 -18 -5 -8 8 -8 15 2 27 15 18 61 20 78 3z m108 -25 c0 -18 3
                            -36 7 -39 25 -25 -6 -74 -47 -74 -16 0 -46 26 -46 41 0 15 22 10 35 -8 11 -14
                            15 -15 28 -4 18 14 12 41 -9 41 -19 0 -18 10 3 25 9 7 13 17 9 23 -9 15 -36
                            16 -36 2 0 -5 -7 -10 -15 -10 -13 0 -14 4 -5 21 9 15 19 19 43 17 29 -3 32 -6
                            33 -35z m104 -7 c0 -26 5 -47 13 -50 10 -5 10 -7 0 -12 -7 -3 -13 -14 -13 -25
                            0 -10 -4 -19 -10 -19 -5 0 -10 9 -10 20 0 16 -7 20 -30 20 -16 0 -30 5 -30 11
                            0 15 59 99 70 99 6 0 10 -20 10 -44z" id="16" className="none"></path><path d="M8092 6558 c-16 -16 -15 -28 3 -28 8 0 15 9 15 20 0 23 -2 24 -18 8z" id="17" className="none"></path><path d="M1740 6788 c-131 -90 -223 -165 -298 -241 l-83 -84 283 -277 283
                            -277 35 39 c58 64 151 138 218 171 42 21 60 36 55 44 -63 102 -435 657 -441
                            657 -4 -1 -27 -15 -52 -32z m-2 -392 c3 -20 -4 -36 -23 -56 l-27 -28 26 -4
                            c43 -5 35 -23 -13 -26 -65 -5 -70 10 -22 57 22 22 41 45 41 51 0 19 -32 24
                            -45 7 -15 -20 -25 -22 -25 -4 0 23 24 38 55 35 25 -2 31 -8 33 -32z m112 14
                            c12 -23 3 -45 -30 -75 l-22 -20 28 -5 c45 -8 34 -25 -18 -28 -60 -4 -64 15
                            -12 62 25 23 35 39 31 50 -8 20 -36 21 -43 1 -7 -18 -24 -20 -24 -2 0 38 71
                            52 90 17z m100 6 c6 -8 10 -23 8 -33 -1 -10 1 -24 6 -31 4 -7 5 -24 2 -37 -10
                            -40 -78 -47 -92 -10 -10 25 4 30 25 11 23 -21 41 -14 41 15 0 12 -7 19 -20 19
                            -11 0 -20 4 -20 9 0 5 9 13 20 16 11 3 20 11 20 16 0 15 -33 24 -38 11 -4 -13
                            -32 -17 -32 -4 0 30 59 43 80 18z" id="18" className="none"></path><path d="M8245 6489 c-245 -371 -232 -334 -140 -381 51 -26 167 -121 206 -167
                            l29 -36 283 283 282 282 -104 97 c-57 53 -122 111 -145 127 -78 57 -180 126
                            -185 126 -3 0 -105 -149 -226 -331z m133 -71 c20 -20 14 -48 -17 -79 l-29 -29
                            29 0 c19 0 29 -5 29 -15 0 -11 -12 -15 -50 -15 -27 0 -50 5 -50 10 0 6 18 30
                            41 55 39 42 44 65 14 65 -8 0 -18 -7 -23 -16 -14 -25 -35 -8 -22 17 12 22 59
                            26 78 7z m113 -4 c10 -12 10 -20 1 -35 -7 -11 -8 -19 -2 -19 15 0 12 -56 -4
                            -70 -20 -15 -56 -9 -70 12 -15 24 1 36 18 13 8 -11 20 -16 30 -12 22 9 20 38
                            -4 44 -24 6 -26 19 -5 27 18 7 20 36 2 36 -7 0 -18 -5 -25 -12 -15 -15 -26 -4
                            -19 17 8 20 61 20 78 -1z m119 6 c0 -5 -13 -10 -30 -10 -20 0 -30 -5 -30 -15
                            0 -9 9 -15 25 -15 17 0 29 -8 37 -25 24 -54 -54 -103 -86 -53 -15 24 1 36 18
                            13 18 -25 49 -13 44 17 -2 19 -8 23 -36 20 -34 -2 -35 -1 -26 47 6 28 10 31
                            45 31 22 0 39 -4 39 -10z" id="19" className="none"></path><path d="M8550 6095 l-364 -364 81 -84 c45 -47 98 -110 118 -141 22 -33 42
                            -53 49 -49 6 4 83 57 171 118 88 61 270 187 405 280 135 92 246 169 248 170 9
                            8 -218 311 -275 367 l-68 68 -365 -365z m110 -105 c12 -23 3 -45 -30 -75 l-22
                            -20 28 -5 c51 -9 40 -30 -15 -30 -63 0 -66 15 -14 63 24 23 34 40 30 51 -8 20
                            -36 21 -43 1 -7 -18 -24 -20 -24 -2 0 38 71 52 90 17z m100 6 c6 -8 10 -23 8
                            -33 -1 -10 1 -24 6 -31 4 -7 5 -24 2 -37 -10 -40 -78 -47 -92 -10 -10 24 6 32
                            21 11 17 -23 45 -14 45 14 0 13 -7 20 -20 20 -11 0 -20 4 -20 9 0 5 9 11 20
                            14 11 3 20 10 20 16 0 16 -33 27 -38 13 -4 -13 -32 -17 -32 -4 0 30 59 43 80
                            18z m120 -6 c9 -16 8 -20 -5 -20 -8 0 -15 5 -15 10 0 17 -29 11 -39 -8 -8 -14
                            -5 -17 21 -17 39 0 56 -24 42 -62 -11 -33 -53 -43 -78 -18 -21 22 -21 98 0
                            119 22 22 61 20 74 -4z" id="20" className="none"></path><path d="M8824 5926 c-8 -22 3 -49 19 -43 6 2 12 14 12 27 0 27 -22 39 -31 16z" id="21" className="none"></path><path d="M1263 6368 c-68 -70 -253 -316 -253 -338 0 -4 71 -55 158 -115 86
                            -60 274 -190 416 -288 143 -99 261 -176 263 -171 9 27 69 105 143 185 l83 91
                            -359 359 c-197 197 -361 359 -364 359 -3 0 -42 -37 -87 -82z m195 -370 c20
                            -20 14 -48 -17 -79 l-29 -29 29 0 c19 0 29 -5 29 -15 0 -11 -12 -15 -50 -15
                            -61 0 -64 13 -15 60 36 35 46 70 20 70 -7 0 -18 -7 -23 -16 -14 -25 -35 -8
                            -22 17 12 22 59 26 78 7z m110 0 c20 -20 14 -50 -15 -80 l-27 -28 27 0 c17 0
                            27 -5 27 -15 0 -11 -12 -15 -50 -15 -27 0 -50 5 -50 10 0 6 18 30 41 55 39 43
                            44 65 13 65 -8 0 -17 -7 -20 -15 -4 -8 -10 -15 -15 -15 -10 0 -12 33 -2 43 11
                            11 58 8 71 -5z m110 0 c20 -20 14 -50 -15 -80 l-27 -28 27 0 c17 0 27 -5 27
                            -15 0 -11 -12 -15 -50 -15 -29 0 -50 5 -50 11 0 6 18 28 40 50 22 22 40 44 40
                            50 0 18 -33 23 -45 6 -15 -20 -25 -22 -25 -4 0 19 21 37 45 37 12 0 26 -5 33
                            -12z" id="22" className="none"></path><path d="M3060 6105 c-184 -35 -318 -81 -312 -106 3 -13 402 -990 407 -997 2
                            -2 20 4 41 12 30 12 180 46 200 46 2 0 4 243 4 540 l0 540 -82 -1 c-47 -1
                            -159 -16 -258 -34z m8 -467 c-2 -46 -7 -73 -15 -76 -9 -3 -13 12 -13 52 0 45
                            -3 54 -15 50 -20 -8 -19 5 2 28 33 37 44 23 41 -54z m112 -3 c0 -60 -3 -75
                            -15 -75 -12 0 -15 13 -15 55 0 44 -3 53 -15 49 -20 -8 -19 5 3 27 34 35 42 24
                            42 -56z m140 69 c0 -3 -8 -18 -19 -32 -10 -15 -24 -46 -31 -69 -7 -24 -17 -43
                            -22 -43 -14 0 -8 43 12 88 l19 42 -29 0 c-17 0 -30 5 -30 10 0 6 23 10 50 10
                            28 0 50 -3 50 -6z" id="23" className="none"></path><path d="M3420 5460 l0 -680 335 0 335 0 0 680 0 680 -335 0 -335 0 0 -680z
                            m240 -5 c0 -43 -4 -75 -10 -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3
                            -20 -3 -20 1 0 10 42 53 53 53 4 1 7 -33 7 -74z m110 0 c0 -43 -4 -75 -10 -75
                            -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 9 42 52 53 53 4
                            1 7 -33 7 -74z m119 66 c8 -5 15 -32 17 -64 3 -48 1 -58 -17 -71 -39 -27 -96
                            14 -72 53 6 10 9 28 6 40 -10 38 31 64 66 42z" id="24" className="none"></path><path d="M3845 5501 c-8 -15 3 -31 21 -31 9 0 14 7 12 17 -4 20 -24 28 -33 14z" id="25" className="none"></path><path d="M3847 5443 c-15 -14 -7 -43 12 -43 26 0 36 17 21 35 -14 16 -23 19
                            -33 8z" id="26" className="none"></path><path d="M4100 5460 l0 -680 340 0 340 0 0 680 0 680 -340 0 -340 0 0 -680z
                            m250 -5 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m110 0 c0 -43 -4 -75 -10 -75
                            -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 11 42 54 52 54 4
                            0 8 -34 8 -75z m120 55 c34 -34 21 -122 -19 -133 -20 -5 -61 17 -61 34 0 13
                            28 11 32 -3 5 -14 38 -4 38 12 0 5 -10 10 -23 10 -45 0 -64 52 -31 84 21 21
                            40 20 64 -4z" id="27" className="none"></path><path d="M4531 5497 c-15 -19 -3 -49 18 -45 9 2 16 13 16 27 0 29 -17 37 -34
                            18z" fill="red" className="none" id="28"></path><path d="M4790 5460 l0 -680 335 0 335 0 0 680 0 680 -335 0 -335 0 0 -680z
                            m250 -5 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m124 53 c18 -25 8 -51 -33
                            -85 l-26 -22 38 -1 c20 0 37 -4 37 -10 0 -5 -25 -10 -55 -10 -50 0 -55 2 -46
                            18 5 9 23 30 40 46 17 17 31 35 31 42 0 22 -20 27 -39 10 -22 -20 -31 -20 -31
                            -1 0 35 62 45 84 13z m105 8 c18 -21 24 -77 13 -107 -13 -32 -44 -42 -71 -22
                            -27 18 -30 103 -5 127 19 20 48 21 63 2z" id="29" className="none"></path><path d="M5220 5490 c-22 -40 -6 -98 24 -87 22 9 23 92 1 101 -8 3 -19 -3 -25
                            -14z" id="30" className="none"></path><path d="M5480 5460 l0 -680 340 0 340 0 0 680 0 680 -340 0 -340 0 0 -680z
                            m250 -5 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m122 58 c26 -24 22 -41 -18
                            -79 l-35 -34 35 0 c20 0 36 -4 36 -10 0 -5 -25 -10 -55 -10 -50 0 -55 2 -46
                            18 5 9 23 30 40 46 17 17 31 35 31 42 0 22 -20 27 -39 10 -22 -20 -31 -20 -31
                            -1 0 15 26 34 49 35 8 0 23 -7 33 -17z m98 -58 c0 -43 -4 -75 -10 -75 -5 0
                            -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 11 42 54 52 54 4 0 8
                            -34 8 -75z" id="31" className="none"></path><path d="M6170 5460 l0 -680 295 0 295 0 0 680 0 680 -295 0 -295 0 0 -680z
                            m210 -5 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m122 58 c26 -24 22 -41 -18
                            -79 l-35 -34 35 0 c20 0 36 -4 36 -10 0 -5 -25 -10 -55 -10 -50 0 -55 2 -46
                            18 5 9 23 30 40 46 17 17 31 35 31 42 0 22 -20 27 -39 10 -22 -20 -31 -20 -31
                            -1 0 15 26 34 49 35 8 0 23 -7 33 -17z m112 1 c24 -23 20 -42 -18 -80 l-34
                            -34 34 0 c19 0 34 -4 34 -10 0 -5 -22 -10 -50 -10 -61 0 -64 13 -15 60 19 19
                            35 40 35 46 0 21 -22 28 -35 11 -13 -18 -35 -23 -35 -8 0 16 31 41 50 41 10 0
                            26 -7 34 -16z" id="32" className="none"></path><path d="M6880 5456 l0 -684 60 -22 c33 -12 88 -42 122 -66 l63 -44 113 113
                            113 112 -38 32 c-21 18 -75 54 -121 79 -46 26 -81 52 -78 58 56 135 386 963
                            386 971 0 32 -431 135 -566 135 l-54 0 0 -684z m140 19 c0 -60 -3 -75 -15 -75
                            -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -24 -9 -18 20 8 37 12 9 25 16 30 16 4
                            1 7 -33 7 -74z m114 69 c25 -10 19 -55 -11 -86 l-27 -28 27 0 c17 0 27 -5 27
                            -15 0 -11 -12 -15 -50 -15 -28 0 -50 5 -50 10 0 6 18 28 40 50 22 22 40 44 40
                            50 0 19 -32 24 -45 7 -15 -20 -25 -22 -25 -4 0 30 37 45 74 31z m116 -8 c6 -8
                            10 -23 9 -33 -2 -10 1 -28 5 -41 16 -49 -60 -84 -88 -40 -15 24 1 36 18 13 8
                            -11 20 -16 30 -12 22 9 20 38 -4 44 -24 6 -26 19 -5 27 18 7 20 36 2 36 -7 0
                            -18 -5 -25 -12 -17 -17 -28 -2 -12 17 16 19 54 19 70 1z" id="33" className="none"></path><path d="M965 5976 c-29 -39 -198 -348 -222 -407 -8 -22 -14 -42 -11 -44 5 -6
                            700 -293 718 -297 8 -2 17 14 25 42 17 65 70 166 122 233 38 49 43 61 32 72
                            -18 16 -627 435 -633 435 -3 0 -17 -15 -31 -34z m143 -350 c2 -19 -5 -34 -30
                            -56 l-32 -30 32 0 c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -31 0 -50 4 -50
                            11 0 7 18 32 40 56 23 24 38 48 35 53 -8 13 -45 13 -45 0 0 -5 -7 -10 -15 -10
                            -21 0 -7 30 19 40 32 11 61 -3 64 -34z m110 0 c3 -20 -5 -35 -28 -56 l-32 -30
                            31 0 c21 0 31 -5 31 -15 0 -11 -12 -15 -50 -15 -27 0 -50 5 -50 10 0 6 19 31
                            42 56 32 34 39 47 29 57 -9 9 -16 9 -31 -1 -26 -16 -30 -15 -30 3 0 20 39 35
                            65 25 12 -4 21 -18 23 -34z m92 -42 c0 -56 -3 -75 -12 -72 -8 3 -14 26 -16 56
                            -2 40 -6 50 -18 45 -19 -7 -18 6 3 29 33 36 43 23 43 -58z" id="34" className="none"></path><path d="M8949 5794 c-173 -119 -318 -220 -322 -223 -4 -4 10 -30 31 -57 45
                            -56 115 -190 131 -252 11 -38 13 -41 36 -32 31 12 709 292 712 294 5 4 -51
                            118 -125 256 -85 158 -129 230 -142 230 -3 0 -148 -97 -321 -216z m70 -153
                            c12 -22 -2 -54 -34 -79 l-26 -21 33 -3 c46 -4 37 -22 -13 -26 -63 -5 -67 10
                            -20 61 23 24 41 49 41 56 0 14 -36 15 -45 1 -9 -15 -25 -12 -25 5 0 34 72 38
                            89 6z m106 -1 c3 -9 3 -24 0 -33 -4 -8 -2 -18 4 -22 17 -10 13 -40 -9 -60 -22
                            -20 -67 -14 -77 11 -8 23 5 29 24 12 22 -19 43 -13 43 13 0 12 -7 19 -20 19
                            -26 0 -26 16 1 31 16 8 18 14 10 22 -9 9 -17 8 -32 -1 -30 -19 -39 -4 -12 18
                            26 21 60 16 68 -10z m125 16 c0 -3 -10 -21 -21 -41 -12 -20 -25 -50 -28 -67
                            -4 -18 -12 -33 -19 -36 -19 -6 -15 39 8 83 11 22 20 41 20 42 0 2 -13 3 -30 3
                            -16 0 -30 5 -30 10 0 6 23 10 50 10 28 0 50 -2 50 -4z" id="35" className="none"></path><path d="M2635 5962 c-129 -69 -349 -216 -410 -275 l-60 -57 385 -380 c212
                            -208 387 -379 390 -380 3 0 30 19 60 41 30 23 74 51 98 62 23 12 41 26 38 32
                            -2 5 -93 226 -201 490 -109 264 -200 486 -202 493 -8 18 -22 15 -98 -26z m-35
                            -517 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -24 -9 -18
                            20 8 37 12 9 25 16 30 16 4 1 7 -33 7 -74z m110 -1 c0 -56 -3 -75 -12 -72 -7
                            3 -14 25 -16 51 -2 33 -7 47 -18 47 -7 0 -14 3 -14 6 0 8 43 43 53 44 4 0 7
                            -34 7 -76z m127 61 c8 -21 -6 -33 -17 -15 -7 11 -14 12 -27 4 -28 -18 -25 -29
                            9 -29 26 0 34 -5 42 -27 18 -50 -41 -89 -78 -52 -18 18 -21 85 -6 115 13 24
                            68 26 77 4z" id="36" className="none"></path><path d="M2777 5436 c-8 -21 19 -54 33 -40 7 7 10 20 8 30 -4 23 -33 30 -41
                            10z" id="37" className="none"></path><path d="M7509 5973 c-5 -14 -89 -223 -185 -462 -97 -240 -180 -446 -185 -458
                            -7 -20 0 -26 71 -68 44 -25 96 -60 116 -77 l35 -31 43 44 c24 24 185 191 359
                            370 175 180 317 331 317 335 0 20 -143 136 -274 223 -121 82 -249 151 -277
                            151 -5 0 -14 -12 -20 -27z m89 -459 c30 -21 28 -42 -10 -81 l-32 -33 32 0 c22
                            0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 39 38 46 70 15 70
                            -11 0 -20 -4 -20 -10 0 -5 -7 -10 -15 -10 -8 0 -15 4 -15 9 0 10 39 41 50 41
                            3 0 16 -7 28 -16z m-118 -69 c0 -43 -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49
                            -2 54 -20 49 -11 -3 -20 -1 -20 5 0 10 39 41 53 41 4 1 7 -33 7 -74z m230 31
                            c0 -26 5 -47 13 -50 10 -5 10 -7 0 -12 -7 -3 -13 -14 -13 -25 0 -10 -4 -19
                            -10 -19 -5 0 -10 9 -10 20 0 16 -7 20 -30 20 -19 0 -30 5 -30 13 0 18 57 97
                            70 97 6 0 10 -20 10 -44z" id="38" className="none"></path><path d="M7672 5460 c-16 -26 -15 -30 3 -30 9 0 15 9 15 25 0 30 -2 31 -18 5z" id="39" className="none"></path><path d="M6800 5854 c0 -3 6 -11 13 -18 10 -11 15 -11 25 0 18 19 15 24 -13
                            24 -14 0 -25 -3 -25 -6z" id="40" className="none"></path><path d="M6801 5788 c1 -16 3 -18 6 -6 2 9 14 19 26 21 18 4 17 5 -5 6 -23 1
                            -28 -3 -27 -21z" id="41" className="none"></path><path d="M6807 5753 c-4 -3 -7 -15 -7 -25 0 -13 7 -18 25 -18 14 0 25 4 25 9
                            0 5 -9 7 -20 4 -14 -4 -20 0 -20 12 0 12 6 16 20 12 11 -3 18 -1 14 4 -6 11
                            -28 12 -37 2z" id="42" className="none"></path><path d="M6804 5685 c-9 -23 4 -47 23 -43 9 2 19 10 21 18 4 13 3 13 -10 2
                            -11 -9 -18 -10 -23 -2 -9 15 5 32 22 26 8 -3 11 -1 8 4 -9 15 -35 12 -41 -5z" id="43" className="none"></path><path d="M6808 5623 c9 -3 10 -9 2 -18 -8 -10 -4 -12 15 -12 14 0 25 4 25 9 0
                            5 -4 6 -10 3 -5 -3 -10 -2 -10 4 0 5 6 12 13 14 6 3 -1 5 -18 5 -16 0 -24 -2
                            -17 -5z" id="44" className="none"></path><path d="M2089 5553 c-87 -90 -305 -488 -276 -504 22 -12 735 -309 742 -309 3
                            0 19 29 35 65 33 74 78 145 123 192 16 17 28 36 26 41 -5 13 -579 572 -588
                            572 -4 0 -32 -26 -62 -57z m91 -418 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15
                            51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7 -34 7 -75z
                            m110 0 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -8 -3
                            -15 -1 -15 5 0 11 40 48 53 49 4 0 7 -34 7 -75z m130 60 c0 -10 -10 -15 -30
                            -15 -16 0 -30 -4 -30 -10 0 -5 9 -10 19 -10 25 0 51 -26 51 -50 0 -26 -27 -50
                            -54 -50 -27 0 -51 24 -41 40 5 8 11 5 20 -6 17 -24 47 -11 43 18 -3 19 -8 23
                            -37 20 -30 -2 -33 0 -27 20 3 13 6 31 6 41 0 13 9 17 40 17 29 0 40 -4 40 -15z" id="45" className="none"></path><path d="M7669 5174 c-233 -240 -447 -462 -475 -493 l-51 -56 42 -47 42 -47
                            604 260 c332 143 606 262 608 265 8 8 -54 141 -132 284 -59 107 -95 161 -140
                            208 -34 34 -64 62 -67 62 -4 0 -197 -196 -431 -436z m101 -129 c0 -43 -4 -75
                            -10 -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 11 42 54
                            52 54 4 0 8 -34 8 -75z m124 59 c24 -24 19 -43 -20 -80 l-35 -34 35 0 c20 0
                            36 -4 36 -10 0 -5 -22 -10 -50 -10 -61 0 -64 13 -15 60 19 19 35 40 35 46 0
                            22 -20 27 -39 10 -22 -20 -31 -20 -31 -1 0 32 58 45 84 19z m116 1 c0 -9 -9
                            -15 -24 -15 -14 0 -28 -4 -31 -10 -3 -6 4 -10 17 -10 31 0 48 -18 48 -50 0
                            -14 -5 -31 -12 -38 -23 -23 -88 -9 -88 20 0 4 7 8 15 8 8 0 15 -4 15 -10 0 -5
                            9 -10 21 -10 16 0 20 5 17 28 -3 26 -11 30 -48 21 -11 -3 -14 3 -12 26 5 49
                            10 55 47 55 24 0 35 -4 35 -15z" id="46" className="none"></path><path d="M6805 5514 c0 -25 4 -28 29 -18 22 9 20 19 -6 31 -20 9 -23 8 -23
                            -13z" id="47" className="none"></path><path d="M709 5482 c-5 -15 -26 -69 -45 -120 -32 -83 -94 -322 -94 -362 0 -12
                            88 -33 468 -109 257 -51 479 -95 493 -98 24 -4 26 -1 38 54 7 32 31 105 52
                            162 22 58 36 108 32 112 -5 4 -201 87 -438 184 -236 98 -445 183 -463 191 -32
                            13 -33 12 -43 -14z m299 -314 c20 -20 14 -48 -17 -78 l-28 -29 25 -3 c14 -2
                            27 -9 30 -15 2 -9 -11 -13 -47 -13 -62 0 -65 12 -16 60 36 35 46 70 20 70 -9
                            0 -18 -7 -21 -15 -4 -8 -12 -15 -20 -15 -17 0 -17 5 -4 31 12 22 59 26 78 7z
                            m110 0 c20 -20 14 -53 -14 -79 l-26 -24 23 -5 c12 -3 24 -11 27 -18 2 -8 -12
                            -12 -47 -12 -28 0 -51 5 -51 10 0 6 17 29 39 53 38 41 43 67 15 67 -8 0 -17
                            -7 -20 -15 -7 -16 -34 -21 -34 -6 0 33 64 53 88 29z m112 -7 c15 -29 12 -107
                            -4 -121 -22 -18 -59 -8 -74 20 -14 28 -10 84 9 106 17 20 57 17 69 -5z" id="48" className="none"></path><path d="M1177 5153 c-4 -3 -7 -26 -7 -50 0 -31 5 -45 16 -50 20 -7 34 13 34
                            49 0 48 -21 73 -43 51z" id="49" className="none"></path><path d="M9090 5321 c-250 -103 -463 -190 -472 -194 -16 -6 -15 -12 9 -74 14
                            -37 39 -110 54 -161 15 -52 30 -96 32 -98 5 -6 969 187 979 195 12 11 -60 293
                            -105 408 l-43 111 -454 -187z m20 -160 c15 -29 13 -37 -20 -68 l-30 -28 27 -5
                            c50 -9 39 -30 -16 -30 -62 0 -65 12 -16 60 19 19 35 40 35 47 0 21 -31 28 -42
                            10 -11 -20 -28 -22 -28 -4 0 38 71 52 90 18z m100 5 c6 -8 10 -23 9 -33 -1
                            -10 1 -26 6 -36 4 -10 3 -29 -4 -43 -9 -20 -17 -25 -43 -22 -17 2 -36 11 -42
                            20 -15 24 3 37 19 14 17 -23 45 -14 45 14 0 14 -7 20 -22 20 l-23 0 24 19 c13
                            10 21 23 17 30 -10 16 -33 14 -40 -5 -3 -8 -10 -12 -16 -9 -7 4 -7 13 0 26 13
                            22 52 25 70 5z m120 -7 c8 -15 8 -24 0 -34 -7 -9 -8 -15 0 -20 14 -8 13 -48
                            -2 -63 -7 -7 -24 -12 -38 -12 -14 0 -31 5 -38 12 -14 14 -16 54 -3 62 4 3 6
                            17 3 32 -8 44 57 64 78 23z" id="50" className="none"></path><path d="M9274 5149 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5
                            -16 -11z" id="51" className="none"></path><path d="M9270 5080 c0 -24 29 -38 40 -20 12 19 1 40 -21 40 -12 0 -19 -7 -19
                            -20z" id="52" className="none"></path><path d="M6807 5473 c-10 -10 -8 -43 2 -43 5 0 7 10 3 22 -4 18 -2 20 16 16
                            12 -4 20 -2 16 3 -6 11 -28 12 -37 2z" id="53" className="none"></path><path d="M6803 5405 c-3 -9 -3 -19 1 -22 3 -4 6 2 6 11 0 13 6 17 20 13 11 -3
                            18 -1 14 4 -9 14 -34 10 -41 -6z" id="54" className="none"></path><path d="M6801 5338 c0 -22 1 -22 8 -3 l8 20 5 -20 c5 -17 6 -18 7 -2 0 10 6
                            15 11 12 6 -3 10 -1 10 4 0 6 -11 11 -25 11 -19 0 -25 -5 -24 -22z" id="55" className="none"></path><path d="M6800 5289 c0 -27 14 -30 33 -8 22 25 22 27 -8 27 -17 0 -25 -6 -25
                            -19z" id="56" className="none"></path><path d="M6801 5233 c-1 -28 9 -29 32 -3 9 11 12 20 7 20 -6 0 -14 -8 -17 -17
                            -6 -15 -7 -15 -14 3 -7 17 -8 17 -8 -3z" id="57" className="none"></path><path d="M1763 4957 c-49 -127 -103 -405 -103 -532 l0 -105 415 0 415 0 0 53
                            c0 61 33 269 49 311 7 16 8 33 4 37 -4 4 -161 71 -348 150 -187 78 -354 148
                            -370 155 l-30 12 -32 -81z m217 -352 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15
                            50 0 40 -3 48 -15 44 -8 -4 -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z
                            m110 0 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m120 26 c0 -30 5 -52 13 -55
                            10 -5 10 -7 0 -12 -7 -3 -13 -12 -13 -20 0 -8 -7 -14 -15 -14 -8 0 -15 7 -15
                            15 0 10 -10 15 -30 15 -16 0 -30 5 -30 11 0 15 69 109 81 109 5 0 9 -22 9 -49z" fill="red" className="none" id="58"></path><path d="M2160 4600 c-9 -16 -8 -20 5 -20 8 0 15 9 15 20 0 11 -2 20 -5 20 -2
                            0 -9 -9 -15 -20z" id="59" className="none"></path><path d="M7856 4785 c-323 -140 -594 -256 -602 -259 -12 -4 -8 -17 16 -62 16
                            -31 35 -74 42 -95 l11 -39 629 0 628 0 0 108 c0 84 -8 147 -34 278 -30 145
                            -74 292 -95 316 -3 3 -271 -108 -595 -247z m84 -210 c0 -60 -3 -75 -15 -75
                            -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4
                            0 7 -34 7 -75z m124 59 c9 -8 16 -18 16 -20 0 -13 -25 -49 -49 -70 l-26 -23
                            38 -1 c20 0 37 -4 37 -10 0 -5 -22 -10 -50 -10 -61 0 -64 13 -15 60 19 19 35
                            40 35 47 0 21 -31 28 -42 10 -11 -20 -28 -22 -28 -4 0 35 56 50 84 21z m116
                            -4 c8 -16 8 -20 -4 -20 -8 0 -18 5 -21 10 -10 16 -23 12 -36 -11 -8 -16 -8
                            -20 1 -14 6 4 22 4 35 1 29 -7 42 -45 25 -75 -14 -28 -65 -29 -80 -2 -15 30
                            -12 92 7 113 21 24 60 23 73 -2z" id="60" className="none"></path><path d="M8127 4574 c-4 -4 -7 -18 -7 -31 0 -17 6 -23 21 -23 16 0 20 5 17 27
                            -3 26 -18 39 -31 27z" id="61" className="none"></path><path d="M556 4943 c-31 -154 -45 -292 -51 -515 l-6 -248 491 0 490 0 0 140 0
                            140 -90 0 -90 0 0 57 c0 31 10 110 21 175 12 66 20 120 18 122 -2 1 -168 35
                            -369 75 -201 40 -375 75 -387 78 -17 4 -22 -1 -27 -24z m309 -377 c19 -29 10
                            -53 -32 -85 l-28 -20 38 -1 c20 0 37 -4 37 -10 0 -5 -25 -10 -55 -10 -50 0
                            -55 2 -46 18 5 9 23 30 40 46 17 17 31 36 31 43 0 15 -36 18 -45 3 -9 -15 -25
                            -12 -25 5 0 16 27 34 52 35 10 0 25 -11 33 -24z m95 -51 c0 -43 -4 -75 -10
                            -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 9 42 52 53
                            53 4 1 7 -33 7 -74z m120 55 c40 -40 15 -140 -34 -140 -16 0 -46 26 -46 41 0
                            13 28 11 32 -3 5 -14 38 -3 38 13 0 6 -6 9 -14 6 -20 -8 -56 21 -56 45 0 25
                            27 58 47 58 7 0 22 -9 33 -20z" id="62" className="none"></path><path d="M1028 4548 c-8 -21 2 -38 23 -38 14 0 19 7 19 25 0 18 -5 25 -19 25
                            -10 0 -21 -6 -23 -12z" id="63" className="none"></path><path d="M9308 4891 c-207 -42 -379 -78 -381 -81 -3 -3 3 -50 13 -105 11 -55
                            19 -133 20 -172 l0 -73 -85 0 -85 0 0 -140 0 -140 487 0 486 0 -7 263 c-8 263
                            -37 517 -61 523 -6 1 -180 -33 -387 -75z m-67 -311 c28 -16 23 -50 -13 -87
                            l-32 -33 32 0 c18 0 32 -4 32 -10 0 -5 -22 -10 -50 -10 -27 0 -50 3 -50 6 0 4
                            18 27 40 51 23 24 38 48 35 53 -9 14 -42 13 -47 -1 -2 -7 -10 -10 -18 -7 -10
                            3 -9 9 8 26 25 25 35 27 63 12z m110 -6 c7 -9 14 -40 16 -70 3 -50 1 -55 -22
                            -64 -30 -11 -52 -4 -66 21 -7 15 -6 19 6 19 8 0 15 -4 15 -10 0 -13 37 -13 45
                            0 8 13 -14 42 -26 34 -5 -3 -9 2 -9 10 0 9 7 16 15 16 8 0 15 7 15 15 0 8 -9
                            15 -20 15 -11 0 -20 -4 -20 -10 0 -5 -4 -10 -10 -10 -17 0 -11 28 8 39 24 15
                            38 13 53 -5z m106 8 c6 -4 16 -20 22 -35 23 -61 -22 -132 -68 -107 -21 11 -29
                            40 -11 40 6 0 10 -5 10 -11 0 -14 42 -7 48 9 2 8 -7 12 -27 12 -20 0 -34 7
                            -41 19 -14 28 -13 38 10 61 21 21 37 25 57 12z" id="64" className="none"></path><path d="M9414 4545 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44
                            8z" id="65" className="none"></path><path d="M6806 4798 l17 -32 18 23 c27 33 24 41 -16 41 l-36 0 17 -32z" id="66" className="none"></path><path d="M3910 4405 l0 -275 490 0 490 0 0 275 0 275 -490 0 -490 0 0 -275z
                            m520 51 c6 -8 10 -23 9 -33 -1 -10 1 -26 6 -36 4 -10 3 -29 -4 -43 -9 -20 -17
                            -25 -43 -22 -17 2 -36 11 -42 20 -15 24 3 37 19 14 16 -21 45 -15 45 9 0 9
                            -10 19 -22 24 l-22 8 22 12 c26 14 28 29 7 38 -9 3 -22 -2 -29 -12 -9 -13 -15
                            -15 -20 -6 -20 31 49 56 74 27z" id="67" fill="red" className="none"></path><path d="M4910 4405 l0 -275 505 0 505 0 0 275 0 275 -505 0 -505 0 0 -275z
                            m547 50 c8 -22 -4 -30 -22 -15 -16 13 -45 7 -45 -10 0 -5 10 -10 23 -10 30 0
                            47 -18 47 -51 0 -34 -23 -53 -55 -45 -43 11 -58 92 -24 133 16 18 68 17 76 -2z" fill="red" id="68" className="none"></path><path d="M5394 4386 c-8 -21 13 -46 32 -39 20 8 13 47 -9 51 -9 2 -20 -4 -23
                            -12z" id="69" className="none"></path><path d="M5940 4405 l0 -275 470 0 470 0 0 275 0 275 -470 0 -470 0 0 -275z
                            m509 31 c30 -64 -32 -148 -77 -103 -19 20 -8 35 13 17 12 -10 18 -10 30 0 22
                            18 18 28 -9 23 -18 -4 -29 2 -41 21 -16 24 -16 28 -1 52 23 35 66 30 85 -10z" id="70" fill="red" className="none"></path><path d="M6387 4443 c-12 -12 -7 -41 7 -46 19 -7 40 18 32 38 -6 15 -28 20
                            -39 8z" id="71" className="none"></path><path d="M2710 3830 l0 -670 520 0 520 0 0 670 0 670 -520 0 -520 0 0 -670z
                            m442 373 c2 -36 7 -49 21 -51 14 -3 17 4 17 42 0 33 4 46 14 46 10 0 16 -14
                            18 -42 2 -35 7 -43 23 -43 17 0 20 8 23 48 2 33 7 47 18 47 11 0 14 -15 14
                            -65 l0 -65 -90 0 -90 0 0 58 c0 32 3 62 7 65 15 16 22 4 25 -40z m132 -135
                            c43 -60 1 -138 -74 -138 -76 0 -116 75 -71 131 16 19 22 21 32 12 10 -10 9
                            -16 -4 -31 -23 -25 -21 -48 5 -66 29 -21 51 -20 78 2 18 14 22 25 16 45 -7 31
                            -36 37 -36 7 0 -11 -7 -20 -15 -20 -10 0 -15 10 -15 33 0 41 5 47 41 47 17 0
                            34 -8 43 -22z m16 -173 c0 -8 -9 -19 -20 -25 -14 -7 -20 -21 -20 -45 0 -25 5
                            -35 20 -40 11 -3 20 -15 20 -26 0 -10 -1 -19 -3 -19 -2 0 -41 15 -88 34 -110
                            44 -111 59 -9 102 86 37 100 40 100 19z m-150 -180 c0 -23 3 -24 72 -27 60 -2
                            73 -6 76 -20 3 -16 -6 -18 -72 -18 -74 0 -76 -1 -76 -25 0 -16 -6 -25 -15 -25
                            -12 0 -15 14 -15 63 0 35 3 67 7 70 13 14 23 6 23 -18z m17 -173 c-19 -21 -22
                            -48 -7 -57 5 -3 20 16 32 42 18 37 29 49 49 51 35 4 59 -22 59 -61 0 -38 -7
                            -50 -37 -66 -19 -10 -23 -9 -23 4 0 9 7 23 16 32 18 19 15 58 -6 58 -8 0 -20
                            -14 -25 -31 -20 -62 -52 -79 -87 -47 -24 22 -23 68 3 94 27 27 52 10 26 -19z" id="72" ></path><path d="M3195 3836 l-30 -13 29 -7 c32 -8 39 -4 34 17 -2 13 -8 13 -33 3z" id="73" className="none"></path><path d="M7335 4293 c5 -10 10 -64 13 -120 l4 -103 224 0 224 0 0 -120 0 -120
                            390 0 390 0 0 240 0 240 -626 0 c-593 0 -626 -1 -619 -17z m625 -208 c0 -43
                            -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49 -2 54 -20 49 -11 -3 -20 -2 -20 2 0 8
                            42 44 53 45 4 0 7 -34 7 -75z m128 63 c19 -19 14 -40 -20 -75 l-32 -33 32 0
                            c22 0 32 -5 32 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 19 19 35 42 35
                            52 0 23 -36 24 -44 1 -5 -12 -10 -13 -18 -5 -8 8 -8 15 2 27 15 18 61 20 78 3z
                            m122 5 c0 -4 -11 -30 -25 -58 -13 -27 -26 -58 -29 -68 -9 -29 -27 -9 -20 21 4
                            15 15 42 25 60 l18 32 -34 0 c-19 0 -35 5 -35 10 0 6 23 10 50 10 28 0 50 -3
                            50 -7z" id="74" className="none"></path><path d="M1660 4065 l0 -235 250 0 250 0 0 84 c0 46 3 104 6 130 l7 46 158 0
                            159 0 0 105 0 105 -415 0 -415 0 0 -235z m160 19 c0 -56 -3 -75 -12 -72 -7 3
                            -14 25 -16 51 -2 33 -7 47 -18 47 -7 0 -14 4 -14 9 0 9 39 40 53 40 4 1 7 -33
                            7 -75z m110 1 c0 -43 -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49 -2 54 -20 49
                            -11 -3 -20 -1 -20 5 0 10 39 41 53 41 4 1 7 -33 7 -74z m126 38 c0 -18 3 -36
                            7 -39 13 -13 7 -41 -13 -59 -22 -20 -67 -14 -77 11 -9 24 5 29 26 10 23 -21
                            41 -14 41 15 0 12 -7 19 -20 19 -26 0 -25 8 3 30 21 18 21 19 3 26 -12 5 -21
                            3 -24 -4 -4 -13 -32 -17 -32 -4 0 18 27 33 55 30 26 -3 30 -7 31 -35z" id="75" className="none"></path><path d="M500 3830 l0 -330 515 0 515 0 0 330 0 330 -515 0 -515 0 0 -330z
                            m438 58 c20 -20 13 -51 -20 -85 l-32 -33 32 0 c18 0 32 -4 32 -10 0 -5 -22
                            -10 -50 -10 -28 0 -50 5 -50 10 0 6 18 28 40 50 22 22 40 44 40 50 0 20 -32
                            24 -46 6 -19 -27 -38 -16 -19 12 17 24 54 29 73 10z m102 -63 c0 -60 -3 -75
                            -15 -75 -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48
                            53 49 4 0 7 -34 7 -75z m120 60 c7 -8 10 -25 7 -37 -4 -12 -1 -28 5 -35 19
                            -24 -6 -63 -41 -63 -36 0 -65 34 -51 60 5 9 6 27 3 38 -7 28 13 52 42 52 12 0
                            28 -7 35 -15z" id="76" className="none"></path><path d="M1110 3860 c0 -11 7 -20 15 -20 8 0 15 9 15 20 0 11 -7 20 -15 20 -8
                            0 -15 -9 -15 -20z" id="77" className="none"></path><path d="M1104 3805 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44
                            8z" id="78" className="none"></path><path d="M8720 3830 l0 -330 525 0 525 0 0 330 0 330 -525 0 -525 0 0 -330z
                            m444 54 c24 -24 19 -43 -21 -80 l-37 -34 37 0 c20 0 37 -4 37 -10 0 -5 -22
                            -10 -50 -10 -61 0 -64 13 -15 60 19 19 35 40 35 46 0 22 -20 27 -39 10 -21
                            -19 -31 -20 -31 -3 0 35 56 50 84 21z m106 -29 c0 -25 5 -45 10 -45 6 0 10 -7
                            10 -15 0 -8 -4 -15 -10 -15 -5 0 -10 -7 -10 -15 0 -8 -4 -15 -10 -15 -5 0 -10
                            7 -10 15 0 10 -10 15 -29 15 -17 0 -32 4 -35 8 -6 11 61 112 74 112 6 0 10
                            -20 10 -45z m114 29 c18 -18 21 -85 6 -115 -16 -30 -68 -26 -80 7 -31 80 24
                            159 74 108z" id="79" className="none"></path><path d="M9232 3838 c-16 -16 -15 -28 3 -28 8 0 15 9 15 20 0 23 -2 24 -18 8z" id="80" className="none"></path><path d="M9334 3866 c-3 -8 -4 -31 -2 -52 4 -53 34 -60 43 -11 10 51 -25 104
                            -41 63z" id="81" className="none"></path><path d="M3910 3830 l0 -280 495 0 495 0 0 280 0 280 -495 0 -495 0 0 -280z
                            m521 60 c28 -16 23 -50 -13 -87 l-32 -33 32 0 c18 0 32 -4 32 -10 0 -5 -22
                            -10 -50 -10 -27 0 -50 4 -50 8 0 4 19 27 41 51 39 40 40 44 25 59 -16 16 -18
                            16 -31 -2 -20 -27 -39 -16 -20 12 18 24 36 28 66 12z" id="82" fill="red" className="none"></path><path d="M4913 3998 c4 -62 7 -188 7 -281 l0 -167 498 2 497 3 3 278 2 277
                            -506 0 -507 0 6 -112z m547 -108 c0 -5 -13 -10 -30 -10 -20 0 -30 -5 -30 -15
                            0 -9 9 -15 25 -15 17 0 29 -8 37 -25 24 -54 -54 -103 -86 -53 -15 24 1 36 18
                            13 18 -25 49 -13 44 17 -2 19 -8 23 -36 20 -34 -2 -35 -1 -26 47 6 28 10 31
                            45 31 22 0 39 -4 39 -10z" id="83" fill="red" className="none"></path>
                            <path d="M1660 3583 l0 -233 415 0 415 0 0 103 0 102 -165 -3 -165 -3 0 130 0
                            130 -250 3 -250 3 0 -232z m160 -38 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15
                            50 0 40 -3 48 -15 44 -8 -4 -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z
                            m110 0 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z m122 58 c26 -24 22 -41 -18
                            -79 l-35 -34 35 0 c20 0 36 -4 36 -10 0 -5 -22 -10 -50 -10 -61 0 -64 13 -15
                            60 19 19 35 40 35 46 0 22 -20 27 -39 10 -22 -20 -31 -20 -31 -1 0 15 26 34
                            49 35 8 0 23 -7 33 -17z" id="87" className="none"></path><path d="M7800 3695 l0 -115 -225 0 -225 0 0 -82 c0 -46 -4 -100 -9 -120 l-9
                            -38 624 0 624 0 0 235 0 235 -390 0 -390 0 0 -115z m278 -91 c30 -20 28 -37
                            -9 -79 l-31 -35 32 0 c51 0 31 -25 -23 -28 -59 -4 -63 16 -12 61 39 34 46 67
                            15 67 -11 0 -20 -4 -20 -10 0 -5 -7 -10 -15 -10 -8 0 -15 4 -15 9 0 10 39 41
                            50 41 3 0 16 -7 28 -16z m103 5 c14 -7 19 -19 18 -37 -2 -15 0 -33 5 -40 22
                            -37 -20 -81 -64 -67 -23 7 -37 52 -22 67 8 8 8 17 1 29 -7 14 -5 23 11 39 23
                            23 25 24 51 9z m-221 -74 c0 -43 -4 -75 -10 -75 -5 0 -10 25 -10 56 0 51 -2
                            55 -20 49 -11 -3 -20 -2 -20 3 0 10 39 41 53 41 4 1 7 -33 7 -74z" id="88" className="none"></path><path d="M8140 3575 c0 -8 9 -15 20 -15 11 0 20 7 20 15 0 8 -9 15 -20 15 -11
                            0 -20 -7 -20 -15z" id="89" className="none"></path><path d="M8142 3508 c2 -13 10 -23 18 -23 8 0 16 10 18 23 3 17 -2 22 -18 22
                            -16 0 -21 -5 -18 -22z" id="90" className="none"></path><path d="M3938 3533 l-28 -4 0 -280 0 -279 500 0 500 0 0 178 c0 99 -3 227 -7
                            285 l-6 107 -466 -1 c-256 -1 -478 -4 -493 -6z m492 -288 c0 -60 -3 -75 -15
                            -75 -11 0 -15 12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53
                            49 4 0 7 -34 7 -75z" id="91" fill="red" className="none"></path><path d="M5053 3533 l-133 -4 0 -279 0 -280 500 0 500 0 0 285 0 285 -367 -2
                            c-203 -1 -428 -4 -500 -5z m397 -257 c0 -26 5 -47 13 -50 10 -5 10 -7 0 -12
                            -7 -3 -13 -14 -13 -25 0 -25 -20 -25 -27 1 -4 14 -14 20 -34 20 -16 0 -29 3
                            -29 7 0 15 66 103 78 103 8 0 12 -15 12 -44z" id="92" fill="red" className="none"></path><path d="M5402 3250 c-10 -17 -10 -20 3 -20 8 0 15 9 15 20 0 11 -1 20 -3 20
                            -1 0 -8 -9 -15 -20z" id="93" className="none"></path><path d="M5940 3255 l0 -285 470 0 470 0 -2 283 -3 282 -467 3 -468 2 0 -285z
                            m512 60 c3 -3 -8 -31 -24 -61 -15 -31 -28 -63 -28 -70 0 -8 -4 -14 -10 -14
                            -15 0 -12 35 5 77 19 45 19 43 -10 43 -16 0 -25 6 -25 15 0 11 11 15 43 15 24
                            0 46 -2 49 -5z" id="94" fill="red" className="none"></path><path d="M505 3243 c5 -189 12 -282 30 -392 14 -79 26 -145 28 -148 5 -4 767
                            144 774 151 3 3 -4 58 -16 123 -12 65 -21 142 -21 171 l0 52 90 0 90 0 0 145
                            0 145 -491 0 -490 0 6 -247z m365 -53 c12 -23 3 -45 -30 -75 l-22 -20 28 -5
                            c45 -8 34 -25 -18 -28 -60 -4 -64 15 -12 62 25 23 35 39 31 50 -8 20 -36 21
                            -43 1 -7 -18 -24 -20 -24 -2 0 38 71 52 90 17z m90 -55 c0 -43 -4 -75 -10 -75
                            -5 0 -10 24 -10 54 0 49 -2 54 -20 49 -11 -3 -20 -2 -20 2 0 8 42 44 53 45 4
                            0 7 -34 7 -75z m140 67 c0 -4 -7 -18 -16 -31 -9 -13 -22 -42 -29 -64 -13 -43
                            -35 -62 -35 -30 0 11 11 41 24 66 l23 47 -33 0 c-19 0 -34 5 -34 10 0 6 23 10
                            50 10 28 0 50 -3 50 -8z" id="95" className="none"></path><path d="M8790 3345 l0 -145 85 0 85 0 0 -63 c0 -35 -9 -113 -20 -172 -10 -60
                            -18 -110 -17 -111 3 -3 761 -154 772 -154 24 0 55 269 62 533 l6 257 -486 0
                            -487 0 0 -145z m458 -147 c20 -20 13 -49 -19 -79 l-31 -29 31 0 c21 0 31 -5
                            31 -15 0 -11 -12 -15 -50 -15 -61 0 -64 13 -15 60 36 35 46 70 20 70 -7 0 -18
                            -7 -23 -16 -14 -25 -35 -8 -22 17 12 22 59 26 78 7z m102 -32 c0 -26 5 -47 13
                            -50 10 -5 10 -7 0 -12 -7 -3 -13 -14 -13 -25 0 -10 -4 -19 -10 -19 -5 0 -10 9
                            -10 20 0 16 -7 20 -30 20 -16 0 -30 5 -30 11 0 15 59 99 70 99 6 0 10 -20 10
                            -44z m110 -31 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 38 -4 50 -15 50
                            -8 0 -15 4 -15 9 0 9 39 40 53 40 4 1 7 -33 7 -74z" id="96" className="none"></path><path d="M9310 3140 c-9 -16 -8 -20 5 -20 8 0 15 9 15 20 0 11 -2 20 -5 20 -2
                            0 -9 -9 -15 -20z" id="97" className="none"></path><path d="M1660 3227 c0 -126 53 -407 101 -534 29 -75 33 -81 53 -73 106 41
                            723 303 729 309 4 4 1 26 -7 47 -18 46 -46 233 -46 304 l0 50 -415 0 -415 0 0
                            -103z m318 -194 c-3 -87 -21 -103 -26 -24 -2 39 -6 49 -18 44 -7 -3 -14 -2
                            -14 3 0 11 42 54 52 54 5 0 8 -35 6 -77z m110 0 c-3 -87 -21 -103 -26 -24 -2
                            39 -6 49 -18 44 -7 -3 -14 -2 -14 3 0 11 42 54 52 54 5 0 8 -35 6 -77z m112 3
                            c0 -41 -4 -78 -10 -81 -6 -4 -10 15 -10 50 0 52 -2 56 -20 50 -11 -3 -20 -3
                            -20 1 0 9 42 52 53 53 4 1 7 -32 7 -73z" id="98" className="none"></path><path d="M7311 3278 c-7 -24 -26 -66 -42 -95 -16 -29 -25 -54 -20 -57 41 -26
                            1197 -514 1202 -509 21 22 64 167 95 317 26 131 34 194 34 278 l0 108 -628 0
                            -629 0 -12 -42z m629 -224 c0 -56 -3 -75 -12 -72 -8 3 -14 25 -16 52 -2 37 -7
                            46 -18 42 -8 -3 -14 -1 -14 5 0 11 40 48 53 49 4 0 7 -34 7 -76z m130 56 c12
                            -23 3 -45 -30 -75 l-22 -20 28 -5 c51 -9 40 -30 -15 -30 -62 0 -64 11 -15 61
                            23 24 34 43 31 53 -8 20 -36 21 -43 1 -7 -18 -24 -20 -24 -2 0 38 71 52 90 17z
                            m102 3 c39 -35 13 -133 -36 -133 -22 0 -46 17 -46 32 0 13 28 9 32 -4 6 -16
                            38 -2 38 16 0 9 -7 12 -20 9 -27 -7 -50 14 -50 46 0 49 45 68 82 34z" id="99" className="none"></path><path d="M8116 3094 c-9 -23 19 -53 35 -37 15 15 7 47 -12 51 -9 2 -19 -5 -23
                            -14z" id="100" className="none"></path><path d="M7182 3069 l-42 -46 476 -492 c262 -271 480 -491 484 -489 4 2 32 26
                            62 53 43 40 74 85 141 205 78 142 145 287 136 294 -2 1 -276 119 -609 262
                            l-605 259 -43 -46z m588 -484 c0 -43 -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49
                            -2 54 -20 49 -11 -3 -20 -1 -20 5 0 10 39 41 53 41 4 1 7 -33 7 -74z m126 38
                            c0 -18 3 -36 7 -39 13 -13 7 -41 -13 -59 -22 -20 -67 -14 -77 11 -9 24 5 29
                            26 10 23 -21 41 -14 41 15 0 12 -7 19 -20 19 -26 0 -25 8 3 30 21 18 21 19 3
                            26 -12 5 -21 3 -24 -4 -4 -13 -32 -17 -32 -4 0 18 27 33 55 30 26 -3 30 -7 31
                            -35z m114 18 c25 -48 0 -131 -40 -131 -26 0 -50 38 -50 78 0 49 16 72 50 72
                            19 0 33 -7 40 -19z" id="101" className="none"></path><path d="M7947 2614 c-6 -36 6 -79 24 -79 22 0 20 99 -2 103 -11 2 -18 -6 -22
                            -24z" id="102" className="none"></path><path d="M7063 2965 c-34 -24 -90 -54 -123 -66 l-60 -22 0 -683 0 -684 59 0
                            c116 0 496 85 562 125 3 3 -83 226 -191 497 l-198 492 80 46 c45 25 98 61 120
                            80 l39 35 -113 111 -113 112 -62 -43z m-43 -810 c0 -60 -3 -75 -15 -75 -11 0
                            -15 12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7
                            -34 7 -75z m120 59 c8 -8 13 -35 13 -59 0 -50 -16 -75 -48 -75 -33 0 -47 23
                            -47 75 0 25 6 52 12 60 16 20 54 19 70 -1z m114 0 c22 -21 20 -28 -14 -68
                            l-31 -35 27 -3 c15 -2 29 -9 32 -15 3 -9 -12 -13 -52 -13 -31 0 -56 2 -56 5 0
                            3 19 26 41 50 25 28 39 51 35 60 -7 19 -35 19 -42 0 -7 -18 -24 -20 -24 -2 0
                            35 56 50 84 21z" id="103" fill="red" className="none"></path><path d="M7086 2194 c-14 -37 -3 -94 19 -94 15 0 25 22 25 55 0 33 -10 55 -25
                            55 -7 0 -16 -7 -19 -16z" id="104" className="none"></path><path d="M2190 2760 c-195 -82 -363 -153 -372 -157 -15 -7 -14 -16 18 -86 63
                            -143 200 -369 259 -427 l54 -54 53 49 c132 122 538 523 538 532 0 5 -12 20
                            -26 34 -35 32 -91 119 -126 197 -15 34 -32 62 -36 62 -4 -1 -167 -68 -362
                            -150z m-10 -265 c0 -60 -3 -75 -15 -75 -12 0 -15 13 -15 55 0 44 -3 53 -15 49
                            -20 -8 -19 5 3 27 34 35 42 24 42 -56z m110 -1 c0 -56 -3 -75 -12 -72 -7 3
                            -14 25 -16 51 -2 33 -7 47 -18 47 -7 0 -14 4 -14 9 0 9 39 40 53 40 4 1 7 -33
                            7 -75z m121 59 c8 -9 14 -35 14 -58 0 -23 -6 -49 -14 -58 -18 -23 -58 -21 -71
                            2 -14 27 -13 104 2 119 17 17 53 15 69 -5z" id="105" className="none"></path><path d="M2356 2535 c-18 -47 9 -114 35 -88 17 17 7 97 -12 101 -9 2 -19 -4
                            -23 -13z" id="106" className="none"></path><path d="M1060 2779 c-267 -54 -488 -98 -491 -99 -3 0 9 -64 27 -142 37 -161
                            115 -374 136 -372 11 1 918 372 926 379 2 2 -14 52 -36 112 -22 59 -45 132
                            -52 161 -6 28 -15 54 -19 56 -3 1 -224 -41 -491 -95z m-52 -171 c20 -20 14
                            -45 -19 -83 l-31 -35 31 0 c17 0 31 -4 31 -10 0 -5 -22 -10 -50 -10 -61 0 -64
                            13 -15 60 19 19 35 40 35 46 0 21 -22 28 -35 11 -13 -18 -35 -23 -35 -8 0 33
                            64 53 88 29z m100 -66 c2 -60 0 -72 -13 -72 -11 0 -15 12 -15 51 0 41 -3 50
                            -15 45 -20 -7 -19 10 3 33 28 31 37 19 40 -57z m120 66 c16 -16 15 -28 -3 -28
                            -8 0 -15 5 -15 10 0 6 -7 10 -15 10 -8 0 -15 -2 -15 -4 0 -2 -3 -11 -6 -19 -4
                            -12 0 -14 15 -10 28 7 51 -13 51 -46 0 -54 -57 -71 -86 -26 -18 28 -14 85 7
                            111 14 17 51 18 67 2z" id="107" className="none"></path><path d="M1182 2541 c-19 -11 -11 -45 11 -49 9 -2 20 4 23 13 9 21 -16 47 -34
                            36z" id="108" className="none"></path><path d="M8701 2843 c-5 -21 -13 -51 -17 -67 -4 -15 -24 -74 -45 -129 -21 -55
                            -38 -101 -36 -102 16 -10 939 -386 941 -384 2 2 22 54 45 114 38 97 116 393
                            107 402 -2 2 -217 46 -477 99 -261 52 -482 97 -491 100 -13 4 -19 -4 -27 -33z
                            m403 -239 c24 -23 20 -39 -21 -79 l-36 -35 36 0 c21 0 37 -4 37 -10 0 -5 -22
                            -10 -50 -10 -61 0 -64 13 -15 60 19 19 35 40 35 47 0 21 -31 28 -42 10 -11
                            -20 -28 -22 -28 -4 0 35 56 50 84 21z m106 -29 c0 -25 5 -45 10 -45 6 0 10 -7
                            10 -15 0 -8 -4 -15 -10 -15 -5 0 -10 -7 -10 -15 0 -8 -5 -15 -10 -15 -6 0 -13
                            7 -16 15 -4 8 -17 15 -29 15 -13 0 -27 5 -30 10 -7 11 61 110 76 110 5 0 9
                            -20 9 -45z m118 33 c21 -21 13 -50 -24 -84 l-35 -34 35 0 c20 0 36 -4 36 -10
                            0 -5 -22 -10 -50 -10 -61 0 -64 13 -15 60 19 19 35 40 35 46 0 21 -22 28 -35
                            11 -13 -18 -35 -23 -35 -8 0 33 64 53 88 29z" id="109" className="none"></path><path d="M9166 2551 c-4 -7 -5 -15 -2 -18 9 -9 19 4 14 18 -4 11 -6 11 -12 0z" id="110" className="none"></path><path d="M3420 2190 l0 -680 330 0 330 0 0 680 0 680 -330 0 -330 0 0 -680z
                            m360 50 c39 -39 17 -140 -30 -140 -47 0 -69 101 -30 140 11 11 25 20 30 20 6
                            0 19 -9 30 -20z m-120 -65 c0 -43 -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49 -2
                            54 -20 49 -11 -3 -20 -1 -20 5 0 10 39 41 53 41 4 1 7 -33 7 -74z m250 67 c0
                            -4 -7 -18 -16 -31 -9 -13 -22 -41 -28 -63 -7 -21 -16 -38 -22 -36 -14 4 -5 48
                            16 86 l19 32 -34 0 c-19 0 -35 5 -35 10 0 6 23 10 50 10 28 0 50 -3 50 -8z" id="111" fill="red" className="none"></path><path d="M3732 2178 c2 -39 7 -53 18 -53 11 0 16 14 18 53 3 47 1 52 -18 52
                            -19 0 -21 -5 -18 -52z" id="112" className="none"></path><path d="M4100 2190 l0 -680 340 0 340 0 0 680 0 680 -340 0 -340 0 0 -680z
                            m382 31 c20 -52 -8 -121 -48 -121 -45 0 -64 115 -23 143 27 20 58 10 71 -22z
                            m108 4 c0 -8 -4 -15 -10 -15 -5 0 -10 5 -10 10 0 6 -9 10 -20 10 -11 0 -20 -2
                            -20 -4 0 -2 -3 -11 -6 -19 -4 -11 1 -13 20 -10 50 10 74 -40 39 -79 -36 -40
                            -83 -8 -83 57 0 42 14 69 40 77 20 7 50 -9 50 -27z m-240 -51 c0 -56 -3 -75
                            -12 -72 -8 3 -14 26 -16 56 -2 40 -6 50 -18 45 -22 -8 -17 13 9 30 12 9 25 16
                            30 16 4 1 7 -33 7 -75z" id="113" fill="red" className="none"></path><path d="M4416 2215 c-10 -27 -7 -60 7 -79 12 -16 14 -16 26 -3 18 22 10 91
                            -10 95 -9 2 -19 -4 -23 -13z" id="114" className="none"></path><path d="M4532 2153 c2 -17 9 -28 18 -28 9 0 16 11 18 28 3 22 -1 27 -18 27
                            -17 0 -21 -5 -18 -27z" id="115" className="none"></path><path d="M4790 2190 l0 -680 335 0 335 0 0 680 0 680 -335 0 -335 0 0 -680z
                            m380 24 c19 -57 -5 -114 -49 -114 -42 0 -59 116 -20 143 30 21 56 10 69 -29z
                            m-130 -40 c0 -56 -3 -75 -12 -72 -8 3 -14 26 -16 56 -2 40 -6 50 -18 45 -19
                            -7 -18 6 3 29 33 36 43 23 43 -58z m240 66 c0 -5 -13 -10 -30 -10 -21 0 -30
                            -5 -30 -16 0 -8 5 -12 10 -9 18 11 60 -24 60 -49 0 -33 -33 -60 -65 -52 -25 7
                            -43 31 -31 43 3 3 14 -1 23 -9 24 -21 43 -12 43 19 0 24 -2 25 -36 18 -35 -6
                            -36 -5 -30 17 3 13 6 31 6 41 0 13 9 17 40 17 22 0 40 -4 40 -10z" id="116" fill="red" className="none"></path><path d="M5106 2215 c-19 -50 7 -112 33 -81 18 21 10 90 -10 94 -9 2 -19 -4
                            -23 -13z" id="117" className="none"></path><path d="M5480 2190 l0 -680 340 0 340 0 0 680 0 680 -340 0 -340 0 0 -680z
                            m385 13 l10 -41 34 49 c18 27 37 46 42 43 5 -3 9 -25 9 -49 0 -25 5 -46 13
                            -49 10 -5 10 -7 0 -12 -7 -3 -13 -14 -13 -25 0 -25 -20 -25 -27 0 -6 22 -73
                            36 -73 14 0 -12 -30 -33 -49 -33 -43 0 -59 116 -20 144 33 23 62 6 74 -41z
                            m-135 -29 c0 -56 -3 -75 -12 -72 -8 3 -14 26 -16 56 -2 40 -6 50 -18 45 -22
                            -8 -17 13 9 30 12 9 25 16 30 16 4 1 7 -33 7 -75z" id="118" fill="red" className="none"></path><path d="M5796 2215 c-10 -27 -7 -60 7 -79 12 -16 14 -16 26 -3 18 22 10 91
                            -10 95 -9 2 -19 -4 -23 -13z" id="119" className="none"></path><path d="M5912 2180 c-10 -17 -10 -20 3 -20 8 0 15 9 15 20 0 11 -1 20 -3 20
                            -1 0 -8 -9 -15 -20z" id="120" className="none"></path><path d="M6170 2190 l0 -680 300 0 300 0 0 680 0 680 -300 0 -300 0 0 -680z
                            m330 50 c39 -39 17 -140 -30 -140 -47 0 -69 101 -30 140 11 11 25 20 30 20 6
                            0 19 -9 30 -20z m116 -28 c0 -18 3 -35 7 -38 22 -22 -8 -74 -43 -74 -19 0 -50
                            25 -50 41 0 15 22 10 35 -8 7 -9 17 -13 23 -9 17 10 15 46 -3 46 -8 0 -15 7
                            -15 15 0 8 7 15 15 15 8 0 15 7 15 15 0 8 -9 15 -20 15 -11 0 -20 -4 -20 -10
                            0 -5 -7 -10 -15 -10 -21 0 -18 16 6 34 32 22 64 6 65 -32z m-236 -37 c0 -43
                            -4 -75 -10 -75 -5 0 -10 24 -10 54 0 49 -2 54 -20 49 -11 -3 -20 -1 -20 5 0
                            10 39 41 53 41 4 1 7 -33 7 -74z" id="121" fill="red" className="none"></path><path d="M6446 2200 c-7 -36 9 -83 27 -78 7 3 13 26 15 56 3 46 1 52 -16 52
                            -14 0 -21 -9 -26 -30z" id="122" className="none"></path><path d="M6802 2818 l-21 -33 35 -3 c20 -2 38 -1 41 1 2 3 -5 19 -15 36 l-19
                            32 -21 -33z" id="123" className="none"></path><path d="M2555 2405 c-212 -208 -385 -380 -385 -384 0 -37 309 -256 485 -344
                            l70 -35 205 499 c113 275 206 503 208 508 1 4 -17 16 -40 27 -36 16 -82 46
                            -145 96 -9 7 -122 -97 -398 -367z m45 -220 c0 -60 -3 -75 -15 -75 -11 0 -15
                            12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7 -34 7
                            -75z m119 61 c19 -22 23 -78 9 -106 -15 -28 -52 -38 -74 -20 -16 14 -19 92 -4
                            121 12 22 52 25 69 5z m115 -8 c33 -47 9 -128 -38 -128 -24 0 -54 26 -43 37 4
                            3 13 0 22 -7 16 -13 45 -7 45 10 0 5 -10 10 -23 10 -30 0 -47 18 -47 50 0 51
                            55 69 84 28z" id="124" className="none"></path><path d="M2672 2228 c-14 -14 -16 -67 -3 -87 5 -8 16 -11 26 -8 12 5 15 17 13
                            54 -3 48 -15 62 -36 41z" id="125" className="none"></path><path d="M2781 2227 c-15 -19 -3 -49 18 -45 9 2 16 13 16 27 0 29 -17 37 -34
                            18z" id="126" className="none"></path><path d="M7330 2741 c-37 -30 -154 -103 -182 -114 -17 -6 -17 -8 0 -49 9 -24
                            98 -244 196 -489 l179 -446 61 26 c119 50 496 317 496 351 0 5 -158 172 -351
                            372 -194 200 -355 366 -358 370 -4 4 -22 -5 -41 -21z m150 -556 c0 -43 -4 -75
                            -10 -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 10 42 53
                            53 53 4 1 7 -33 7 -74z m124 53 c23 -32 20 -94 -4 -118 -35 -35 -80 -2 -80 60
                            0 69 52 104 84 58z m96 -53 c0 -43 -4 -75 -10 -75 -5 0 -10 23 -10 51 0 46 -2
                            50 -20 44 -11 -3 -20 -3 -20 1 0 7 49 52 58 54 1 0 2 -34 2 -75z" id="127" className="none"></path><path d="M7557 2234 c-4 -4 -7 -29 -7 -56 0 -42 3 -48 21 -48 18 0 20 5 17 52
                            -3 48 -15 68 -31 52z" id="128" className="none"></path><path d="M2950 2149 c-113 -275 -206 -504 -208 -508 -1 -4 37 -21 85 -39 108
                            -39 393 -92 497 -92 l76 0 0 539 0 538 -87 18 c-49 9 -103 23 -122 31 -18 8
                            -34 14 -35 14 0 0 -93 -226 -206 -501z m120 -154 c0 -60 -3 -75 -15 -75 -11 0
                            -15 12 -15 51 0 41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7
                            -34 7 -75z m114 59 c19 -19 22 -104 4 -122 -17 -17 -53 -15 -69 5 -17 20 -17
                            97 1 118 16 19 44 19 64 -1z m116 1 c7 -8 10 -25 7 -37 -4 -12 -1 -28 5 -35 8
                            -10 8 -20 0 -38 -16 -35 -78 -36 -91 -2 -5 12 -5 29 0 38 4 9 5 26 2 37 -7 28
                            13 52 42 52 12 0 28 -7 35 -15z" id="129" className="none"></path><path d="M3136 2034 c-12 -32 -6 -84 10 -91 20 -8 34 13 34 53 0 44 -31 72
                            -44 38z" id="130" className="none"></path><path d="M3257 2043 c-13 -12 -7 -33 8 -33 8 0 15 9 15 20 0 20 -11 26 -23 13z" id="131" className="none"></path><path d="M3244 1975 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44
                            8z" id="132" className="none"></path><path d="M1085 2293 c-192 -80 -352 -147 -354 -149 -7 -7 24 -72 121 -254 54
                            -102 108 -197 121 -211 l22 -26 310 214 c171 118 316 220 324 228 12 11 8 21
                            -27 62 -46 56 -117 193 -127 246 -5 26 -12 37 -24 36 -9 -1 -173 -66 -366
                            -146z m6 -163 c28 -16 23 -50 -13 -87 l-32 -33 33 0 c46 0 35 -24 -14 -28 -60
                            -5 -64 11 -16 63 23 25 39 50 36 55 -9 14 -42 13 -47 -1 -2 -7 -10 -10 -18 -7
                            -10 3 -9 9 8 26 25 25 35 27 63 12z m107 -76 c-3 -79 -21 -90 -26 -15 -2 39
                            -6 49 -18 44 -21 -8 -17 7 8 34 12 13 26 19 30 15 5 -5 8 -40 6 -78z m132 66
                            c0 -5 -13 -10 -30 -10 -37 0 -40 -15 -5 -24 51 -13 55 -85 5 -101 -24 -8 -60
                            11 -60 30 0 18 12 19 27 4 17 -17 43 -3 43 22 0 19 -4 21 -35 16 -38 -6 -38
                            -5 -29 42 6 28 10 31 45 31 22 0 39 -4 39 -10z" id="133" className="none"></path><path d="M6812 2426 c7 -8 15 -10 16 -5 2 5 8 7 13 3 5 -3 9 0 9 5 0 6 -11 11
                            -25 11 -22 0 -24 -2 -13 -14z" id="134" className="none"></path><path d="M8789 2398 c-17 -64 -82 -187 -128 -243 -42 -50 -42 -50 -21 -67 46
                            -38 620 -428 629 -428 6 0 23 19 39 43 33 50 180 321 210 390 l21 48 -22 9
                            c-99 43 -703 290 -709 290 -4 0 -12 -19 -19 -42z m220 -277 c25 -25 17 -56
                            -21 -84 l-30 -22 31 -5 c47 -7 42 -25 -8 -28 -65 -5 -70 9 -22 61 23 24 41 49
                            41 56 0 14 -36 15 -45 1 -9 -15 -25 -12 -25 5 0 15 26 34 48 35 6 0 21 -9 31
                            -19z m111 -36 c0 -25 5 -45 13 -48 8 -4 9 -8 1 -14 -6 -4 -13 -16 -17 -26 -8
                            -20 -27 -14 -27 9 0 9 -11 14 -30 14 -16 0 -30 4 -30 10 0 18 72 110 81 104 5
                            -3 9 -25 9 -49z m105 42 c12 -10 16 -22 13 -41 -3 -14 -1 -29 3 -32 17 -10 9
                            -44 -16 -60 -27 -18 -60 -12 -69 13 -8 21 1 30 16 15 7 -7 20 -12 30 -12 27 0
                            23 36 -4 44 l-23 6 25 19 c24 19 24 20 6 27 -12 5 -21 3 -24 -4 -4 -13 -32
                            -17 -32 -5 0 11 33 43 45 43 6 0 19 -6 30 -13z" id="135" className="none"></path><path d="M9070 2060 c-9 -16 -8 -20 5 -20 8 0 15 9 15 20 0 11 -2 20 -5 20 -2
                            0 -9 -9 -15 -20z" id="136" className="none"></path><path d="M6801 2368 c1 -16 3 -18 6 -6 2 9 14 19 26 21 18 4 17 5 -5 6 -23 1
                            -28 -3 -27 -21z" id="137" className="none"></path><path d="M6802 2318 c2 -15 11 -24 26 -26 12 -2 22 1 22 6 0 6 -9 8 -20 5 -14
                            -4 -20 0 -20 12 0 12 6 16 20 12 11 -3 20 -1 20 4 0 5 -12 9 -26 9 -21 0 -25
                            -4 -22 -22z" id="138" className="none"></path><path d="M6807 2273 c-4 -3 -7 -15 -7 -25 0 -13 7 -18 25 -18 14 0 25 4 25 9
                            0 5 -9 7 -20 4 -14 -4 -20 0 -20 12 0 12 6 16 20 12 11 -3 18 -1 14 4 -6 11
                            -28 12 -37 2z" id="139" className="none"></path><path d="M6809 2211 c11 -7 12 -13 4 -23 -9 -10 -6 -13 13 -14 13 -1 24 2 24
                            8 0 5 -4 6 -10 3 -5 -3 -10 1 -10 10 0 9 5 13 10 10 6 -3 10 -1 10 4 0 6 -12
                            11 -27 11 -21 0 -24 -3 -14 -9z" id="140" className="none"></path><path d="M8394 2173 c-15 -26 -67 -89 -116 -141 l-90 -95 364 -364 363 -363
                            73 73 c65 64 274 344 267 357 -2 3 -149 105 -327 228 -177 123 -364 252 -415
                            287 l-92 64 -27 -46z m260 -402 c21 -23 10 -52 -33 -88 l-26 -22 38 -1 c20 0
                            37 -4 37 -10 0 -5 -25 -10 -55 -10 -50 0 -55 2 -46 18 5 9 23 30 40 46 17 17
                            31 35 31 42 0 22 -20 27 -39 10 -21 -19 -31 -20 -31 -3 0 37 56 49 84 18z
                            m106 -26 c0 -33 4 -45 15 -45 8 0 28 20 45 45 17 25 35 45 40 45 6 0 10 -20
                            10 -45 0 -25 5 -45 10 -45 6 0 10 -7 10 -15 0 -8 -4 -15 -10 -15 -5 0 -10 -7
                            -10 -15 0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 11 -12 15 -45 15 -33 0 -45
                            -4 -45 -15 0 -8 -7 -15 -15 -15 -8 0 -15 7 -15 15 0 10 -10 15 -30 15 -16 0
                            -30 5 -30 11 0 15 69 109 81 109 5 0 9 -20 9 -45z" id="141" className="none"></path><path d="M8832 1728 c-16 -16 -15 -28 3 -28 8 0 15 9 15 20 0 23 -2 24 -18 8z" id="142" className="none"></path><path d="M8716 1721 c-4 -7 -5 -15 -2 -18 9 -9 19 4 14 18 -4 11 -6 11 -12 0z" id="143" className="none"></path><path d="M1420 1929 c-223 -154 -406 -284 -408 -289 -6 -17 199 -297 268 -365
                            l69 -69 365 364 365 363 -90 95 c-50 53 -102 115 -116 139 -14 24 -30 43 -36
                            42 -7 0 -194 -127 -417 -280z m38 -151 c20 -20 13 -51 -20 -85 l-32 -33 32 0
                            c18 0 32 -4 32 -10 0 -5 -22 -10 -50 -10 -28 0 -50 5 -50 10 0 6 19 29 41 51
                            39 38 40 42 25 57 -16 16 -18 16 -30 0 -13 -18 -36 -25 -36 -11 0 3 7 15 17
                            25 18 21 53 24 71 6z m102 -63 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 51 0
                            41 -3 50 -15 45 -8 -3 -15 -1 -15 5 0 11 40 48 53 49 4 0 7 -34 7 -75z m121
                            19 c4 -27 5 -59 2 -71 -6 -25 -33 -32 -33 -8 0 10 -10 15 -30 15 -17 0 -30 5
                            -30 12 0 20 64 108 75 105 6 -2 13 -26 16 -53z" id="144" className="none"></path><path d="M1632 1720 c-10 -17 -10 -20 3 -20 8 0 15 9 15 20 0 11 -1 20 -3 20
                            -1 0 -8 -9 -15 -20z" id="145" className="none"></path><path d="M6805 2095 c0 -29 0 -29 27 -14 21 11 21 12 3 25 -26 19 -30 18 -30
                            -11z" id="146" className="none"></path><path d="M6803 2045 c-3 -9 -3 -19 1 -22 3 -4 6 2 6 11 0 13 6 17 20 13 11 -3
                            20 -1 20 4 0 15 -40 10 -47 -6z" id="147" className="none"></path><path d="M6801 1978 c1 -19 2 -20 6 -5 3 13 11 17 24 14 10 -3 19 -1 19 4 0 5
                            -11 9 -25 9 -20 0 -25 -5 -24 -22z" id="148" className="none"></path><path d="M6801 1918 c1 -20 2 -20 6 -4 3 11 8 14 12 9 4 -7 11 -6 19 3 11 12
                            9 14 -13 14 -20 0 -25 -5 -24 -22z" id="149" className="none"></path><path d="M6801 1873 c-1 -14 5 -23 14 -23 8 0 15 6 15 14 0 8 6 17 13 19 9 4
                            9 6 -1 6 -7 1 -16 -7 -19 -16 -6 -15 -7 -15 -14 3 -7 17 -8 17 -8 -3z" id="150" className="none"></path><path d="M6800 1819 c0 -27 14 -30 33 -8 22 25 22 27 -8 27 -17 0 -25 -6 -25
                            -19z" id="151" className="none"></path><path d="M1642 1477 l-282 -282 103 -97 c57 -53 155 -133 218 -177 l114 -81
                            222 337 223 338 -58 29 c-61 31 -197 139 -235 187 l-22 29 -283 -283z m92
                            -129 c18 -25 8 -51 -33 -85 l-26 -22 38 -1 c20 0 37 -4 37 -10 0 -5 -25 -10
                            -55 -10 -50 0 -55 2 -46 18 5 9 23 30 40 46 17 17 31 35 31 42 0 22 -20 27
                            -39 10 -22 -20 -31 -20 -31 -1 0 35 62 45 84 13z m96 -53 c0 -43 -4 -75 -10
                            -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 11 42 54 52
                            54 4 0 8 -34 8 -75z m115 61 c12 -9 16 -20 12 -36 -3 -12 0 -31 6 -41 24 -39
                            -33 -80 -72 -53 -24 18 -27 34 -6 34 8 0 15 -4 15 -10 0 -5 9 -10 20 -10 28 0
                            27 40 -1 47 -21 6 -21 6 2 24 19 14 21 21 12 30 -10 10 -16 9 -31 -4 -32 -29
                            -47 -13 -16 17 19 20 35 20 59 2z" id="152" className="none"></path><path d="M8308 1723 c-46 -55 -151 -137 -218 -173 l-69 -36 224 -337 225 -336
                            97 67 c92 64 244 193 308 262 l30 32 -278 274 c-153 151 -282 274 -287 274 -4
                            0 -19 -12 -32 -27z m63 -363 c28 -16 23 -50 -13 -87 l-32 -33 32 0 c18 0 32
                            -4 32 -10 0 -5 -22 -10 -50 -10 -27 0 -50 4 -50 8 0 4 19 27 41 51 39 40 40
                            44 25 59 -16 16 -18 16 -31 -2 -20 -27 -39 -16 -20 12 18 24 36 28 66 12z
                            m113 -6 c25 -24 22 -109 -5 -127 -29 -21 -56 -10 -69 28 -25 74 28 145 74 99z
                            m106 -59 c0 -60 -3 -75 -15 -75 -11 0 -15 12 -15 50 0 40 -3 48 -15 44 -8 -4
                            -15 -3 -15 2 0 11 41 54 52 54 4 0 8 -34 8 -75z" id="153" className="none"></path><path d="M8442 1338 c-18 -18 -15 -87 4 -95 20 -8 34 13 34 53 0 37 -20 60
                            -38 42z" id="154" className="none"></path><path d="M2090 1258 l-281 -423 28 -23 c77 -63 449 -251 463 -235 10 11 380
                            917 380 929 0 6 -24 22 -52 36 -29 15 -99 52 -156 83 l-102 56 -280 -423z
                            m102 -95 c26 -24 22 -41 -18 -79 l-35 -34 35 0 c20 0 36 -4 36 -10 0 -5 -22
                            -10 -50 -10 -61 0 -64 13 -15 60 19 19 35 40 35 46 0 22 -20 27 -39 10 -22
                            -20 -31 -20 -31 -1 0 15 26 34 49 35 8 0 23 -7 33 -17z m98 -58 c0 -43 -4 -75
                            -10 -75 -5 0 -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 10 42 53
                            53 53 4 1 7 -33 7 -74z m124 59 c23 -22 20 -39 -15 -79 l-31 -35 31 0 c17 0
                            31 -4 31 -10 0 -5 -22 -10 -50 -10 -60 0 -63 11 -15 54 36 33 44 59 23 72 -6
                            4 -16 0 -23 -9 -13 -18 -35 -23 -35 -8 0 16 31 41 50 41 10 0 26 -7 34 -16z" id="155" className="none"></path><path d="M7740 1599 c-80 -44 -148 -83 -152 -87 -6 -6 363 -927 376 -940 7 -6
                            271 121 351 169 133 81 136 83 133 95 -4 15 -552 843 -558 843 -3 0 -70 -36
                            -150 -80z m174 -435 c23 -22 20 -39 -15 -79 l-31 -35 31 0 c17 0 31 -4 31 -10
                            0 -5 -22 -10 -50 -10 -61 0 -66 17 -15 56 35 26 45 57 23 70 -6 4 -16 0 -23
                            -9 -13 -18 -35 -23 -35 -8 0 16 31 41 50 41 10 0 26 -7 34 -16z m108 -1 c26
                            -23 25 -96 -2 -123 -52 -52 -110 53 -64 118 18 26 41 28 66 5z m109 7 c28 -16
                            23 -50 -13 -87 l-32 -33 32 0 c18 0 32 -4 32 -10 0 -5 -22 -10 -50 -10 -27 0
                            -50 4 -50 10 0 5 19 28 41 50 40 39 41 42 25 58 -16 16 -18 16 -31 -2 -20 -27
                            -39 -16 -20 12 18 24 36 28 66 12z" id="156" className="none"></path><path d="M7974 1146 c-3 -8 -4 -31 -2 -52 4 -49 33 -60 42 -16 11 49 -24 109
                            -40 68z" id="157" className="none"></path><path d="M3420 870 l0 -520 330 0 330 0 0 400 0 400 -130 0 -130 0 0 43 c0 24
                            -3 78 -6 120 l-7 77 -193 0 -194 0 0 -520z m230 10 c26 -26 25 -33 -11 -75
                            l-31 -35 32 0 c51 0 31 -25 -23 -28 -40 -3 -47 0 -47 16 0 10 16 32 35 49 19
                            17 35 38 35 47 0 19 -31 21 -48 4 -15 -15 -24 -6 -16 15 5 14 19 22 47 26 4 0
                            16 -8 27 -19z m121 -17 c13 -36 11 -76 -7 -101 -34 -49 -84 -14 -84 59 0 37 5
                            51 21 62 27 19 58 10 70 -20z m107 9 c19 -25 15 -89 -8 -112 -24 -24 -43 -25
                            -64 -4 -21 21 -9 40 12 21 19 -16 42 -12 42 8 0 8 -7 11 -19 8 -44 -11 -69 63
                            -30 91 23 16 47 12 67 -12z" id="158" className="none"></path><path d="M3705 837 c-8 -42 8 -79 31 -70 22 8 16 97 -8 101 -12 2 -19 -6 -23
                            -31z" id="159" className="none"></path><path d="M3818 858 c-8 -21 2 -38 23 -38 14 0 19 7 19 25 0 18 -5 25 -19 25
                            -10 0 -21 -6 -23 -12z" id="160" className="none"></path><path d="M4100 870 l0 -520 340 0 340 0 0 405 0 405 -140 0 -140 0 0 115 0
                            115 -200 0 -200 0 0 -520z m239 11 c25 -25 17 -56 -21 -84 l-30 -22 31 -5 c47
                            -7 42 -25 -8 -28 -65 -5 -70 9 -22 61 23 24 41 49 41 56 0 14 -36 15 -45 1 -9
                            -15 -25 -12 -25 5 0 15 26 34 48 35 6 0 21 -9 31 -19z m101 9 c41 -22 36 -123
                            -6 -142 -38 -17 -64 13 -64 73 0 38 5 51 22 63 27 19 24 19 48 6z m115 -3 c12
                            -10 16 -22 13 -41 -3 -14 -1 -29 3 -32 33 -20 -21 -82 -60 -69 -24 7 -39 51
                            -23 67 8 8 8 17 0 31 -9 17 -7 24 12 39 27 22 31 22 55 5z" id="161" className="none"></path><path d="M4394 846 c-9 -39 3 -78 24 -74 13 3 17 14 17 48 0 34 -4 45 -17 48
                            -12 2 -19 -5 -24 -22z" id="162" className="none"></path><path d="M4510 854 c0 -9 7 -14 17 -12 25 5 28 28 4 28 -12 0 -21 -6 -21 -16z" id="163" className="none"></path><path d="M4505 800 c-9 -15 4 -30 26 -30 12 0 19 7 19 20 0 21 -33 29 -45 10z" id="164" className="none"></path><path d="M5910 1360 l0 -30 -80 0 -80 0 0 -85 0 -85 -135 0 -135 0 0 -405 0
                            -405 340 0 340 0 0 514 0 513 -46 7 c-26 3 -82 6 -125 6 l-79 0 0 -30z m-152
                            -482 c21 -21 13 -56 -20 -87 l-33 -31 33 0 c17 0 32 -4 32 -10 0 -5 -23 -10
                            -50 -10 -45 0 -50 2 -41 18 5 9 23 30 40 46 17 17 31 35 31 42 0 19 -28 25
                            -44 9 -18 -19 -26 -19 -26 0 0 29 56 45 78 23z m102 2 c40 -21 32 -132 -10
                            -143 -36 -9 -60 19 -60 73 0 67 26 93 70 70z m124 -12 c5 -9 7 -21 2 -25 -4
                            -4 -12 0 -17 10 -13 23 -26 22 -39 -3 -10 -19 -9 -20 12 -15 17 4 30 0 43 -15
                            38 -42 -17 -107 -64 -74 -27 19 -30 98 -4 126 20 22 51 20 67 -4z" id="165" className="none"></path><path d="M5822 858 c-14 -14 -16 -67 -3 -87 17 -26 41 -4 41 37 0 44 -19 69
                            -38 50z" id="166" className="none"></path><path d="M5926 801 c-10 -16 5 -41 25 -41 14 0 19 7 19 25 0 18 -5 25 -19 25
                            -11 0 -22 -4 -25 -9z" id="167" className="none"></path><path d="M4793 865 l-2 -515 335 0 334 0 0 358 c0 196 3 428 7 515 l6 157
                            -339 0 -339 0 -2 -515z m267 45 c12 -23 3 -45 -30 -75 l-22 -20 28 -5 c45 -8
                            34 -25 -18 -28 -60 -4 -64 15 -12 62 25 23 35 39 31 50 -8 20 -36 21 -43 1 -7
                            -18 -24 -20 -24 -2 0 38 71 52 90 17z m108 -5 c35 -77 -21 -161 -72 -109 -18
                            18 -21 85 -6 115 16 29 64 25 78 -6z m122 17 c0 -4 -7 -18 -16 -31 -9 -13 -22
                            -42 -29 -64 -13 -43 -35 -62 -35 -30 0 11 11 41 24 66 l23 47 -33 0 c-19 0
                            -34 5 -34 10 0 6 23 10 50 10 28 0 50 -3 50 -8z" id="168" className="none"></path><path d="M5105 877 c-7 -38 9 -81 28 -74 7 2 12 24 12 53 0 38 -4 49 -17 52
                            -12 2 -19 -6 -23 -31z" id="169" className="none"></path><path d="M6590 1350 l0 -30 -80 0 -80 0 0 -85 0 -85 -130 0 -130 0 0 -400 0
                            -400 335 0 335 0 0 515 0 515 -125 0 -125 0 0 -30z m-149 -470 c28 -16 23 -50
                            -13 -87 l-32 -33 32 0 c18 0 32 -4 32 -10 0 -5 -22 -10 -50 -10 -27 0 -50 3
                            -50 6 0 4 18 27 40 51 23 24 38 48 35 53 -9 14 -42 13 -47 -1 -2 -7 -10 -10
                            -18 -7 -10 3 -9 9 8 26 25 25 35 27 63 12z m111 -7 c13 -11 18 -30 18 -64 0
                            -40 -4 -51 -24 -64 -47 -31 -87 22 -71 95 10 46 45 62 77 33z m126 0 c2 -9 -7
                            -13 -27 -13 -17 0 -31 -4 -31 -10 0 -5 9 -10 20 -10 26 0 51 -39 43 -68 -6
                            -26 -44 -45 -68 -36 -22 9 -40 44 -22 44 7 0 18 -5 24 -11 16 -16 43 -4 43 20
                            0 22 -21 33 -41 20 -8 -5 -17 -9 -21 -9 -11 0 -10 34 2 65 8 22 15 26 42 23
                            17 -2 33 -9 36 -15z" id="170" className="none"></path><path d="M6504 846 c-11 -28 1 -81 18 -84 21 -4 33 35 24 73 -7 27 -33 34 -42
                            11z" id="171" className="none"></path><path d="M3046 1359 c-5 -13 -194 -919 -199 -948 -3 -23 255 -59 421 -60 l132
                            -1 0 499 0 498 -152 6 c-84 3 -163 9 -175 13 -15 4 -24 2 -27 -7z m47 -490
                            c20 -27 11 -54 -27 -84 l-31 -25 38 0 c20 0 37 -4 37 -10 0 -5 -25 -10 -55
                            -10 -50 0 -55 2 -46 18 5 9 23 30 40 46 17 17 31 35 31 42 0 22 -20 27 -39 10
                            -22 -20 -31 -20 -31 -1 0 34 62 45 83 14z m97 -54 c0 -43 -4 -75 -10 -75 -5 0
                            -10 23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 11 42 54 52 54 4 0 8
                            -34 8 -75z m124 53 c19 -27 21 -88 4 -110 -37 -45 -88 -16 -88 50 0 71 51 107
                            84 60z" id="172" className="none"></path><path d="M3265 858 c-6 -16 -9 -46 -7 -75 2 -16 8 -23 23 -23 18 0 20 5 17 52
                            -3 49 -22 76 -33 46z" id="173" className="none"></path><path d="M7135 1360 c-27 -5 -101 -9 -162 -9 l-113 -1 0 -500 0 -500 133 1
                            c84 0 185 8 277 23 143 22 145 22 142 46 -1 14 -43 216 -92 450 -49 234 -92
                            442 -95 463 -8 40 -6 40 -90 27z m-123 -487 c26 -24 22 -41 -18 -79 l-35 -34
                            35 0 c20 0 36 -4 36 -10 0 -5 -22 -10 -50 -10 -61 0 -64 13 -15 60 19 19 35
                            40 35 46 0 22 -20 27 -39 10 -22 -20 -31 -20 -31 -1 0 15 26 34 49 35 8 0 23
                            -7 33 -17z m112 -5 c9 -12 16 -36 16 -52 0 -29 1 -29 36 22 20 29 41 52 45 52
                            5 0 9 -19 9 -43 0 -24 6 -49 13 -56 10 -11 10 -14 0 -18 -7 -3 -13 -11 -13
                            -19 0 -8 -4 -14 -10 -14 -5 0 -10 6 -10 14 0 22 -69 26 -80 5 -14 -26 -49 -30
                            -71 -8 -13 13 -19 33 -19 61 0 69 51 103 84 56z" id="174" className="none"></path><path d="M7070 846 c-13 -36 -2 -88 19 -84 12 3 16 15 16 52 0 56 -19 73 -35
                            32z" id="175" className="none"></path><path d="M7190 820 c-9 -16 -8 -20 5 -20 8 0 15 9 15 20 0 11 -2 20 -5 20 -2
                            0 -9 -9 -15 -20z" id="176" className="none"></path><path d="M2613 1292 c-4 -9 -71 -174 -150 -367 -79 -192 -142 -353 -140 -358
                            6 -19 241 -106 367 -136 73 -18 134 -30 135 -29 4 4 165 772 165 785 0 6 -33
                            20 -72 32 -40 12 -124 37 -186 55 -102 31 -114 33 -119 18z m-11 -399 c25 -23
                            23 -37 -13 -78 l-31 -35 31 0 c17 0 31 -4 31 -10 0 -5 -22 -10 -50 -10 -61 0
                            -64 14 -15 57 39 35 46 63 15 63 -11 0 -20 -4 -20 -10 0 -5 -7 -10 -15 -10
                            -19 0 -19 14 1 34 20 21 43 20 66 -1z m98 -58 c0 -43 -4 -75 -10 -75 -5 0 -10
                            23 -10 51 0 46 -2 50 -20 44 -11 -3 -20 -3 -20 1 0 7 49 52 58 54 1 0 2 -34 2
                            -75z m110 0 c0 -43 -4 -75 -10 -75 -5 0 -10 22 -10 49 0 44 -2 49 -20 44 -28
                            -7 -25 7 8 34 15 12 28 22 30 23 1 0 2 -34 2 -75z" id="177" className="none"></path><path d="M7455 1252 c-99 -30 -181 -55 -183 -57 -3 -3 159 -787 164 -794 8
                            -10 286 68 390 111 114 46 122 52 114 72 -46 119 -293 712 -298 717 -4 3 -88
                            -19 -187 -49z m49 -358 c23 -22 20 -39 -15 -79 l-31 -35 31 0 c17 0 31 -4 31
                            -10 0 -5 -22 -10 -50 -10 -60 0 -63 11 -15 54 39 36 46 66 15 66 -11 0 -20 -4
                            -20 -10 0 -5 -7 -10 -15 -10 -19 0 -19 9 2 32 20 22 46 23 67 2z m108 -1 c26
                            -23 25 -96 -2 -123 -11 -11 -24 -20 -30 -20 -24 0 -50 41 -50 80 0 27 7 47 20
                            60 24 24 38 25 62 3z m109 1 c7 -9 14 -38 16 -65 2 -42 -1 -51 -21 -64 -26
                            -18 -52 -11 -67 16 -7 15 -6 19 6 19 8 0 15 -4 15 -10 0 -13 37 -13 45 0 8 13
                            -14 42 -26 34 -5 -3 -9 2 -9 10 0 9 7 16 15 16 8 0 15 7 15 15 0 8 -9 15 -20
                            15 -11 0 -20 -4 -20 -10 0 -5 -4 -10 -10 -10 -14 0 -13 23 2 38 17 17 43 15
                            59 -4z" id="178" className="none"></path><path d="M7560 830 c0 -42 3 -50 19 -50 22 0 35 37 25 75 -4 16 -13 25 -25 25
                            -16 0 -19 -8 -19 -50z" id="179" className="none"></path></g>
                                    </svg>:''}
                    </div>
                    <div className="d-flex flex-wrap justify-content-center  p-3 ">
                                                        {precios.precios.length>0?
                                                        precios.precios.map((elm, i) => {
                                                            
                                                            return(
                                                                <div  className="d-flex flex-row px-3 precios align-items-center" key={i}  >
                                                                    <div id={"precios"+elm.id} className="mx-1  rounded-4" style={{height:40,width:40,backgroundColor:elm.color}}></div>
                                                                    <div className="d-flex flex-column justify-content-center align-items-center" >
                                                                        <span>{elm.localodad}</span>
                                                                        <span> $ {elm.precio_normal}</span>
                                                                    </div>
                                                                    

                                                                </div>
                                                            )
                                                        }):''
                                                        }

                                            </div>
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