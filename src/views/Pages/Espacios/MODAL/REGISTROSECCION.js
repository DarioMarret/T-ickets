import React, { useEffect, useState } from 'react';
import { Modal, Spinner,InputGroup } from "react-bootstrap"


const Registroseccion =(props)=>{
    const {show,setShowToast} =props
    let ListadeFilas=[]
    let Listasillas=[]
    let i=0
    let f=1
    let g=0
    const [tabactivo,setTabactive]=useState({
        tab1:'',
        tab2:'d-none',
        tab3:'d-none'
    })
  
    const [filass,setFilass]=useState({
        cantidad:'',
        inicial:'',
        fila:'',
        sillas:''
    })
    const [ListaFilas,setFilas]=useState([])
    const [listaFilasConsillas,setFilasSillas]=useState([])

    
    
     const [valoresFilas,setValoresFila]=useState({
         filas:'7',
         enpieza:"A2",
         sillas:''
     })
    const GeneraFilas=()=>{
        if(filass.inicial!=" "&& filass.cantidad!=" " ){
        const letrafilas = filass.inicial.replace(/[0-9]+/g, "")
        const numeroinicofilas= filass.inicial.replace(/[^0-9]+/g, "");        
        const repeticiones =parseInt(numeroinicofilas) + parseInt(filass.cantidad)
        console.log(repeticiones)
        for(i= numeroinicofilas; i < repeticiones; i++){
            ListadeFilas.push({fila:letrafilas+""+i,sillas:0,asientos:[]});        
        }}
        setFilas(ListadeFilas)
        console.log(ListadeFilas)
    }
     const AgregasSillasMesa=()=>{ 
        ListadeFilas=ListaFilas
        console.log(filass.fila,filass.sillas)
        let interar = parseInt(filass.sillas);
         if(filass.fila!=""&& filass.sillas !=""){
          
            console.log(interar)
            if(filass.fila==="todas"){
                console.log(interar)              
                for(i=0; i< ListadeFilas.length; i++){            
                    ListadeFilas[i]["sillas"]=interar;
                 const numfila =ListadeFilas[i]["fila"]
                  console.log( ListadeFilas[i]["fila"])
                    for(f=0; f< interar; f++ ){                               
                        ListadeFilas[i]["asientos"][f]={silla:numfila+"-s-"+f,estado:"disponible"};                            
                    }                   
                }               
                setFilas([])                  
                setFilasSillas(ListadeFilas)
                setFilas(ListadeFilas)               
                setFilasSillas([])     
            
            }else{
                let sillas=[]
                let interarr = parseInt(filass.sillas);
                var numero=0
                var index = ListadeFilas.findIndex(obj => obj.fila==filass.fila);
                for(g=0; g< interarr;g++){                    
                    numero=1+g                   
                    sillas[g]={silla:"-s-"+numero,estado:"disponible"}                  
                }
                ListadeFilas[index].asientos=[...sillas]
              
                //console.log(ListadeFilas[index])
                
                setFilas([...ListadeFilas])               
                //setFilasSillas([])                  
            }
         }         
     }

    const  cambiar =(a,b,c)=>{
        setTabactive({
            tab1:a,
            tab2:b,
            tab3:c
        })

    }
    function handelchange(e){
        setFilass({
            ...filass,
            [e.name]:e.value    
 
        })
       
    }
    
useEffect(()=>{
    console.log(filass)
    console.log(ListaFilas)
},[show])
    return(
    <Modal 
    show={show}
    size='lg'
    onHide={()=>setShowToast(false)}
    >
        <Modal.Header closeButton>
    <Modal.Title>Registro de Espacio</Modal.Title>
         </Modal.Header>
            <Modal.Body> 
            <div className='container-fluid row p-0'>
            <div className='col-12'>                     
            <ul className="nav nav-tabs">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-toggle="tab" href="#filas"
                                                        onClick={()=>cambiar('','d-none','d-none')} 
                                                        >Filas y Asientos</a>
                                                    </li>
                                                                                    
                                                    <li className="nav-item">
                                                        <a className="nav-link " data-toggle="tab" href="#mesas"
                                                         onClick={()=>cambiar('d-none','','d-none')} 
                                                         >Mesas y sillas</a>
                                                    </li>
                                                
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-toggle="tab" href="#correlativos"
                                                         onClick={()=>cambiar('d-none','d-none','')} 
                                                         >Números Correlativos</a>
                                                    </li>
                                                
               </ul>           
            </div>
            <div className='row col-12 pt-2'>
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
                                                            <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del espacio" />
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
                                                            <input type="text" className="form-control" id="descripcion" placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-content col-sm-7">
                                    <div className="tab-pane active container " id="filas">
                                    <div className="mt-4 row">
                                    <div className="col-sm-5">
                                                                <label className="form-label"><b>Cantidad de filas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" name="cantidad" 
                                                                    value={filass.cantidad }
                                                                    className="form-control" id="cantidad"
                                                                    onChange={(e)=> handelchange(e.target)}
                                                                     placeholder="10" />
                                                                                                                        </div>
                                     </div>


                                                            <div className="col-sm-5">
                                                                <label className="form-label"><b>Número inicial</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="text" 
                                                                    name="inicial" 
                                                                    value={filass.inicial }
                                                                    onChange={(e)=> handelchange(e.target)}
                                                                    className="form-control" id="numero_inicial" 
                                                                    placeholder="10" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button   className="btn btn-info" onClick={GeneraFilas}><i className="fa fa-plus"></i></button>
                                                            </div>
                                                             <div className="col-sm-5"> 
                                                            <div className="input-group mb-3">                                                                   
                                                            <div className="input-group-prepend">
                                                             <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                             </div>
                                                                    <input type="text" name="sillas" className="form-control" 
                                                                    id="sillas" 
                                                                    value={filass.sillas}
                                                                    onChange={(e)=>handelchange(e.target)}
                                                                    placeholder="# Sillas" />
                                                            </div>
                                                             </div>
                                                             <div className="col-sm-5">
                                                            <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <select className="form-control " value={filass.fila}  name='fila' aria-label="Selecione Fila" onChange={(e)=>handelchange(e.target)} >
                                                                    <option >Seleccione una opcion</option>
                                                                        <option value={"todas"}>Todas</option>
                                                                        {ListaFilas.length>0?
                                                                                ListaFilas.map((elem,i)=>{
                                                                                    return(  
                                                                                    <option value={elem.fila}>{elem.fila}</option>
                                                                                    )
                                                                                  
                                                                                }) :""     }
                                                                    </select>
                                                                    
                                                            </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                            <button className="btn btn-success" onClick={AgregasSillasMesa} >
                                                                    Agregar
                                                                </button>
                                                                </div>                                                              
                                                                
                                                            </div>
                                                       
                                        

                                    </div>
                                    <div className="tab-pane  container" id="mesas">
                                                    <div className="mt-4 row">
                                                            
                                                        </div>

                                                        <div className="row">
                                                        
                                                        <div className="col-sm-5">
                                                                <label className="form-label"><b> Fila</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" name="cantidad_mesas" className="form-control" id="cantidad_mesas" placeholder="10" />
                                                                                                                        </div>
                                                            </div>


                                                            <div className="col-sm-5">
                                                                <label className="form-label"><b>Número inicial</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="text" name="numero_partida" className="form-control" id="numero_partida" placeholder="10" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button   className="btn btn-info"><i className="fa fa-plus"></i></button>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label className="form-label"><b> Mesas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div> 
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="numero_columna"  id="numero_columna" >
                                                                    <option  ></option>
                                                                        <option >Todas</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label className="form-label"><b>Sillas x Mesa</b></label>
                                                                <div className="input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="numero_silla" id="numero_silla" >
                                                                    <option ></option>
                                                                    <option >4</option>
                                                                    <option >6</option>
                                                                    <option >8</option>
                                                                    <option >10</option>
                                                                    <option >12</option>
                                                                    <option >14</option>                                                         
                                                                    </select>
                                                                </div>
                                                            </div>                                                
                                                            <div className="col-sm-2">
                                                            <label className="form-label"><b> Sillas</b></label>
                                                         
                                                                <div className="input-group mb-3">
                                                                  <div className="">
                                                                        <span className="input-group-text"><i className="fa fa-tablet"></i> 0</span>
                                                                    </div>
                                                             </div>  
                                                                
                                                

                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button  className="btn btn-info">Agrega</button>
                                                            
                                                            </div>
                                                        
                                                            
                                                            
                                                            
                                                        </div>

                                                    </div>
                                    <div className="tab-pane container" id="correlativos">
                                                        <div className="mt-4 row">
                                                            <div className="col-sm-6">
                                                                <label className="form-label"><b>Cantidad de asientos</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" className="form-control" id="nc_ca" placeholder="100" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label className="form-label"><b>Primer número</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" className="form-control" id="nc_nombre" placeholder="100" />
                                                                                                                        </div>
                                                            </div>
                                                        </div>
                                     </div>

                                    </div>


                


            </div>
            
            <div className={"col-sm-12 text-center "+ tabactivo.tab1 } style={{ height:'450px', overflowY: 'scroll',overflowX: 'scroll',}}>
            { ListaFilas.length>0?

            ListaFilas.map((e,i)=>{
                
                {                    
            return(
                <div className='d-flex  px-3'>
                <ul className="list-group " style={{ height:'50px',width:'150px'}} >
                     <li className="list-group-item">{e.fila} </li>  
                </ul> 
                                                                 
                {e.asientos.length>0?
                   <div className=' d-flex p-1 justify-content-center align-items-center ' >                    
                     {e.asientos.map((silla,index)=>{
                        return(
                        <div  className='d-flex   mx-1 bg-light shadow-md  rounded-5 text-center  justify-content-center align-items-center ' style={{ height:'50px', width:'50px'}} >
                        <div className={'px-3 '+ silla.silla} >
                            {index}
                        </div>  
                        </div>    )                    
                     })}
                     </div>:""}

                   
                  
                 </div>
                 
                 )}
               
                 
              

            })                           
             :""}
          
             
            </div>
            <div className={"col-sm-12 "+ tabactivo.tab2 } style={{ height:'450px', overflowY: 'scroll'}}>
            <ul className="list-group">
                tab2
             </ul>
            </div>
            <div className={"col-sm-12 "+ tabactivo.tab3 } style={{ height:'450px', overflowY: 'scroll'}}>
            <ul className="list-group">
                tab3
             </ul>
            </div>
            </div>
                 
            
            </Modal.Body>


        <Modal.Footer>    
        </Modal.Footer>
    </Modal>
    )

}
export default Registroseccion