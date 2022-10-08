import React,{useState,useEffect} from "react"
import { Modal,ProgressBar,OverlayTrigger,Tooltip,Button,Form} from "react-bootstrap"
import { GuardarLocalidad } from 'utils/Querypanel';
import MesasView from 'views/Pages/Mesas';
import MesacerView from 'views/Pages/Mesas/Plantillas/Mesacer';
import { Letras } from "utils/constantes";
import Accordion from 'react-bootstrap/Accordion';
const TabdosView =()=>{
    let ejemplo =[1,2,3,4,5]
    let ListadeMesas=[]
    const [ListaMesa,setMesas]=useState([])
    const [listaFilasConsillas,setFilasSillas]=useState([])

    const [Mesass,setMesass]=useState({
        me_cantidad:'todas',
        me_inicial:'',
        mesas:'',
        me_sillas:''
    })
    const [SillasMesas, SetSillasmes]=useState({
        sillas:'',
        cantidad:''
    })
    const [localidaname,setLocalidad]=useState({
        nombre:'',
        description:''
    })
    
    const AgregarFilas=()=>{
        const data = Letras.slice(0,8).map((e,i)=>{
            return {Fila:e,data:[]}
        })
            console.log(data)
    }
    const AgregasSillasMesa =()=>{
       
        if(Mesass.mesas!="" && Mesass.me_sillas!=""){    
            ListadeMesas=ListaMesa
            console.log(ListadeMesas)
            let interar = parseInt(Mesass.me_sillas);     
                 if(Mesass.mesas==="todas"){
                     console.log(interar)              
                     for(var i=0; i< ListadeMesas.length; i++){            
                         ListadeMesas[i]["sillas"]=interar;
                        ListadeMesas[i]["asientos"]=[]
                      const nummesa =ListadeMesas[i]["mesa"]                
                         for(var f=0; f< interar; f++ ){                               
                             ListadeMesas[i]["asientos"][f]={silla:nummesa+"-s-"+f,estado:"disponible"};                         
                         }                   
                     }   
                     SetSillasmes({sillas:"Todas",cantidad:interar})            
                     setMesas([])                  
                     setFilasSillas(ListadeMesas)
                     setMesas(ListadeMesas)    
                     console.log("nueva lista",ListadeMesas)           
                     setFilasSillas([])     
                      setMesass({...Mesass,
                        me_sillas:'',
                        mesas:''
                    })
                 }else{
                     let sillas=[]
                     let interarr = parseInt(Mesass.me_sillas);
                     var numero=0
                     var index = ListadeMesas.findIndex(obj => obj.mesa==Mesass.mesas);
                    // console.log(index,ListadeMesas[index])
                    var letra = ListadeMesas[index].mesa
                     setMesass({...Mesass,
                        me_sillas:'',
                        mesas:''
                    })
                     for(var g=0; g< interarr;g++){                    
                         numero=1+g                   
                         sillas[g]={silla:letra+"-s-"+numero,estado:"disponible"}                  
                     }
                     ListadeMesas[index].sillas=interarr
                     ListadeMesas[index].asientos=[...sillas]
                     SetSillasmes({sillas:letra,cantidad:interarr})    
                    /* setMesass({...Mesass,
                        me_sillas:interarr})*/
                     
                     setMesas([...ListadeMesas])         
                               
                 }
                    

        }
        
     }  
     const GenerMesas=()=>{
        if(Mesass.me_inicial!=" "&& Mesass.me_cantidad!=" " ){
            const letrafilas = Mesass.me_inicial.replace(/[0-9]+/g, "")
            const numeroinicofilas= Mesass.me_inicial.replace(/[^0-9]+/g, "");        
            const repeticiones =parseInt(numeroinicofilas) + parseInt(Mesass.me_cantidad)
          //  console.log(repeticiones)
            for(var i= numeroinicofilas; i < repeticiones; i++){
                ListadeMesas.push({mesa:letrafilas+""+i,sillas:0,asientos:[]});        
            }}
            setMesas(ListadeMesas)
            //console.log(ListadeMesas)
     }
     function handelchangeMesa(e){
        setMesass({
            ...Mesass,
            [e.name]:e.value
        })
        SetSillasmes({sillas:'',cantidad:''})
        //console.log(Mesass)
    }
    function handelchangelocalidad(e){
        setLocalidad({
            ...localidaname,
            [e.name]:e.value
        })
    }
    
    useEffect(()=>{
            AgregarFilas()
    },[])
    return(
        <>
        <div className="d-flex flex-column">
            <div className="row col-12 pt-2">
                         <div className="col-sm-5">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label className="form-label"><b>Nombre</b></label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                            value={localidaname.nombre}
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
                                                            placeholder="Ingrese el nombre del espacio" />
                                                                                                        </div>                            
                                                    </div>
                                                </div>
                            
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <label className="form-label"><b>Descripción</b></label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                                            </div>
                                                            <input type="text" className="form-control" id="descripcion"name="description"
                                                            value={localidaname.description}
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
                                                            placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                         </div>
                         <div className="col-sm-7  container" id="mesas">
                        <Accordion  flush>
                                 <Accordion.Item eventKey="0">
                                    < Accordion.Header>Agregar Fila</Accordion.Header>
                                        <Accordion.Body>
                                                    <div className='row'>
                                                    <div className="row col-12 col-sm-12 col-md-12 col-lg-6">
                                                        <div className='col-12 col-md-6'>
                                                        <label className="form-label"><b>Filas </b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="number"
                                                                    min={1}
                                                                    max={27}
                                                                    />
                                                        </div>
                                                        

                                                        </div>
                                                        
                                                        <div className='col-12 col-md-6'>
                                                        <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button   className="btn btn-info" >Crear fila</button>
                                                            

                                                        </div>
                                                    </div>
                                                    <div className="row col-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div className='col-12 col-md-6'>
                                                        <label className="form-label"><b>Filas </b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input 
                                                                    className="form-control" 
                                                                    type="number"
                                                                    min={1}
                                                                    max={27}
                                                                    />
                                                        </div>
                                                        

                                                        </div>
                                                        
                                                        <div className='col-12 col-md-6'>
                                                        <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button   className="btn btn-info" >Agregar fila</button>
                                                            

                                                        </div>
                                                    </div>

                                                        </div>
                                                      
                                            </Accordion.Body>
                                 </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Agergar Mesas</Accordion.Header>
                                            <Accordion.Body>
                                            <div className='row'>
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                                                                <label className="form-label"><b>Filas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <Form.Select  className="form-control" >
                                                                    <option  value=""></option>
                                                                        {Letras.length>0?
                                                                    
                                                                    Letras.map((e,i)=>{
                                                                            return(
                                                                            <option key={"op"+i} value={e}>{e}</option>
                                                                            )
                                                                        })
                                                                        : 
                                                                        ""   
                                                                    }
                                                                    </Form.Select>
                                                            
                                                                    {/*<input type="number" name="me_cantidad" id="me_cantidad"
                                                                    onChange={(e)=>handelchangeMesa(e.target)}
                                                                className="form-control" placeholder="10" />*/}
                                                            </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                                                                <label className="form-label"><b># de  Mesas x Fila</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" name="me_inicial" 
                                                                    onChange={(e)=>handelchangeMesa(e.target)}
                                                                    className="form-control" id="numero_partida" placeholder="10" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-12 col-md-2 text-left">
                                                            <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                 <button   className="btn btn-info" onClick={GenerMesas}>Agregar</button>
                                                            </div>
                                                        </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Agregar sillas </Accordion.Header>
                                        <Accordion.Body>
                                        <div className='row'>
                                                            {
                                                            ListaMesa.length>0?
                                                            <div className="col-12 col-md-5">
                                                                <label className="form-label"><b> Mesas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div> 
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="mesas" 
                                                                    value={Mesass.mesas}
                                                                    onChange={(e)=>handelchangeMesa(e.target)} id="numero_columna" >  
                                                                     <option  ></option>                                                                 
                                                                        <option value={"todas"} >Todas</option>
                                                                        {ListaMesa.length>0?
                                                                        ListaMesa.map((e,i)=>{
                                                                            return(
                                                                            <option key={i} value={e.mesa} >{e.mesa}</option>
                                                                            )
                                                                        })
                                                                        :""}
                                                                    </select>
                                                                </div>                                                                
                                                            </div>:""}
                                                            {
                                                            ListaMesa.length>0?
                                                            <div className="col-12 col-md-5">
                                                                <label className="form-label"><b># de Sillas </b></label>
                                                                <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="me_sillas" 
                                                                    value={Mesass.me_sillas}
                                                                    onChange={(e)=>handelchangeMesa(e.target)}
                                                                    id="numero_silla" >
                                                                    <option ></option>
                                                                    <option value={2} >2</option>
                                                                    <option value={4} >4</option>
                                                                    <option value={6} >6</option>
                                                                    <option  value={8}>8</option>
                                                                    <option value={10}>10</option>                                                                                                                          
                                                                    </select>
                                                                </div>
                                                            </div>   :""}    
                                                            
                                                            {
                                                                ListaMesa.length>0?
                                                            <div className="col-md-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button  className="btn btn-info" onClick={AgregasSillasMesa}>Agrega</button>
                                                            
                                                            </div>:""}
                                                </div>

                                        </Accordion.Body>

                                    
                                </Accordion.Item>
                           </Accordion>                            
                </div>
            </div>
            
            <div className="col-sm-12  text-center ">
            <div className="col-sm-12 text-center "  style={{ height:'400px', overflowY: 'hide',overflowX: 'auto',}}>
            {ListaMesa.length>0?
                ejemplo.map((e,index)=>{
                    return(
                    <div className='d-flex  px-3 align-items-center' key={index}>
                        <div className='d-flex pb-2'>
                        <MesacerView
                        text={index}                       
                        />
                        </div>
                        
                     <div className='d-flex  pb-2' >
                    {ListaMesa.map((e,i)=>{                   
                        return(
                            <div key={i}>
                            <MesasView
                            status={e.asientos.length}
                             text={e.mesa+""+index}/> 
                            </div>
                            
                        )
                    })}
                    </div>
                    </div>)

                 }):""}
                </div>
            </div>



        </div>
        </>
    )


}

export default TabdosView