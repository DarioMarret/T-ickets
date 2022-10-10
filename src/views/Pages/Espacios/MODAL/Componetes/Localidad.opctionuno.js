import React,{useEffect,useState} from "react"
import { Modal,ProgressBar,OverlayTrigger,Tooltip,Button} from "react-bootstrap"
import { GuardarLocalidad } from "utils/Querypanel"
const TabunoView=(props)=>{
    const {localidaname}=props
    let ListadeFilas=[]
    const [nmobretabuno,setLocalidad]=useState({
        nombre:'',
        description:''
    })
    const [filass,setFilass]=useState({
        cantidad:'',
        inicial:'',
        fila:'',
        sillas:''

    })
    const [ListaFilas,setFilas]=useState([])
    const [listaFilasConsillas,setFilasSillas]=useState([])
    const GeneraFilas=()=>{
        if(filass.inicial!=" "&& filass.cantidad!=" " ){
        const letrafilas = filass.inicial.replace(/[0-9]+/g, "")
        const numeroinicofilas= filass.inicial.replace(/[^0-9]+/g, "");        
        const repeticiones =parseInt(numeroinicofilas) + parseInt(filass.cantidad)      
        for(var i= numeroinicofilas; i < repeticiones; i++){
            ListadeFilas.push({fila:letrafilas+""+i,sillas:0,asientos:[]});        
        }}
        setFilas(ListadeFilas)       
    }
     const AgregasSillasFila=()=>{ 
        ListadeFilas=ListaFilas
       // console.log(filass.fila,filass.sillas)
        let interar = parseInt(filass.sillas);
         if(filass.fila!=""&& filass.sillas !=""){          
           
            if(filass.fila==="Todas"){
               
                for(var i=0; i< ListadeFilas.length; i++){            
                    ListadeFilas[i]["sillas"]=interar;
                    ListadeFilas[i]["asientos"]=[]
                 const numfila =ListadeFilas[i]["fila"]                
                    for(var f=0; f< interar; f++ ){       
                        numero=1+f                        
                        ListadeFilas[i]["asientos"][f]={silla:numfila+"-s-"+numero,estado:"disponible"};                         
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
                var letra = ListadeFilas[index].fila
                ListadeFilas[index].sillas=interarr
                for(var g=0; g< interarr;g++){                    
                    numero=1+g                   
                    sillas[g]={silla:letra+"-s-"+numero,estado:"disponible"}                  
                }
                
                ListadeFilas[index].asientos=[...sillas]
              
               
                
                setFilas([...ListadeFilas])               
                          
            }
         }         
     }
     function handelchange(e){
        setFilass({
            ...filass,
            [e.name]:e.value    
 
        }) }
    function handelchangelocalidad(e){
        setLocalidad({
            ...nmobretabuno,
            [e.name]:e.value
        })

    }
    async function AgregaLocalidad(){
        if(nmobretabuno.nombre=="" || nmobretabuno.description==""|| ListaFilas.length>0) {alert("Complete los datos y localidad creada") }
        else{
        try {
            console.log({"espacio":localidaname.nombre,"descripcion":nmobretabuno.description,"nombre":nmobretabuno.nombre,"mesas_array":JSON.stringify({Typo:'fila',datos: ListaFilas})})
     
        //  const agrega = await GuardarLocalidad({"espacio":localidaname.nombre,"descripcion":nmobretabuno.description,"nombre":nmobretabuno.nombre,"mesas_array":JSON.stringify({Typo:'fila',datos: ListaFilas})})
      //    console.log(agrega)
               
        } catch (error) {
            console.log(error)
            
        }}

    }
    console.log(ListaFilas)
    
   return( <>
    <div className="d-flex flex-column">
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
                                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                            value={nmobretabuno.nombre}
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
                                                            value={nmobretabuno.description}
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
                                                            placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex text-end ju">
                                                <button onClick={AgregaLocalidad} className="btn btn-success">Guardar</button>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-sm-7 row">
                                    <div className="col-sm-5">
                                                                <label className="form-label"><b>Cantidad de filas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" minLength={1} name="cantidad" 
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
                                                                        <option value={"Todas"}>Todas</option>
                                                                        {ListaFilas.length>0?
                                                                                ListaFilas.map((elem,i)=>{
                                                                                    return(  
                                                                                    <option key={i} value={elem.fila}>{elem.fila}</option>
                                                                                    )
                                                                                  
                                                                                }) :""     }
                                                                    </select>
                                                                    
                                                            </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                            <button className="btn btn-success" onClick={AgregasSillasFila} >
                                                                    Agregar
                                                                </button>
                                                                </div>                                                              
                                                                
                                                            </div>
                                                        </div>

                                                        {ListaFilas.length>0?
            <div className='conatiner col-12'>
                <div className={" col-sm-12 text-center " } style={{ height:'400px', overflowY: 'auto',overflowX: 'auto',}}>
            { ListaFilas.length>0?

            ListaFilas.map((e,i)=>{
                
                {                    
            return(
                <div className='d-flex  px-3 p-1  align-items-center ' key={"lista"+i}>
                      <OverlayTrigger placement='right' overlay={<Tooltip id={"tooltip-disabled"}>Asientos {e.asientos.length>0?e.asientos.length:""}</Tooltip>}>
                      <span className="d-inline-block " disabled >
                      <div className="d-flex   mx-1 bg-primary text-white  rounded-5 text-center  justify-content-center align-items-center" style={{ height:'50px',width:'50px'}} >
                                {e.fila} 
                     </div> 
                </span>
                    </OverlayTrigger>
                
                                                                 
                {e.asientos.length>0?
                   <div className=' d-flex p-1 justify-content-center align-items-center ' >                    
                     {e.asientos.map((silla,index)=>{
                        let numero = index+1
                        return(
                        <div key={"silla"+index}  className='d-flex   mx-1 bg-success   rounded-5 text-center  justify-content-center align-items-center ' style={{ height:'50px', width:'50px'}} >
                        <div className={'px-3 '+ silla.silla} >
                            {numero}
                        </div>  
                        </div>    )                    
                     })}
                     </div>:""}

                   
                  
                 </div>
                 
                 )}               
              

            })                           
             :""}
          </div>
          <div className='d-flex justify-content-end pt-2'>
         
          </div>
            
            </div>:""}

    </div>
    </>)

}
export default TabunoView