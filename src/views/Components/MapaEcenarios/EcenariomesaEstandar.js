import React,{useEffect,useState} from "react"
import { ListarLocalidad } from "utils/Querypanel"

const EcenarioEstandar =(props)=>{
  const {localidaname} =props
  const [datas,setData]=useState([])
  const [espacios,SetEspacio]=useState({
    izquierda:'',
    derecha:'',
    centrouno:'',
    centrodos:'',
    centroconsola:'',
    centrotres:'',
    centrocuatro:'',
    final:'',
  })
  async function ObtenLocalidad(){    
     try {
      const datos =await ListarLocalidad()
const {success,data}=datos

      if(success){
      const filtrado = data.filter(e => e.espacio == localidaname.nombre)
      //console.log("Filtrado en ecenario defec",filtrado)
      setData(filtrado)
     }
     
     } catch (error) {   
      console.log(error)
     }
  }
  function handelChange(e){
    SetEspacio({
      ...espacios,
      [e.name]:e.value
    })
    console.log({[e.name]:e.value})

  }
  useEffect(()=>{
    (async()=>{
        await ObtenLocalidad()
    })()

  },[])
return(
    <>
   <div className="row " style={{width:'90%'}}>
   <div>
      <button className="btn btn-primary  float-right">Guarda Mapa </button>
      {/*<button className="btn btn-primary float-right">Guarda </button>*/}
      </div>
  <div className="d-flex flex-column ">
 <div>
    <div className="d-flex pb-2">
      <div>
      <div style={{height:' 5rem', width:'7.7rem'}}>
      </div>
      </div>
            <div>
      <div className="d-flex rounded-4 bg-secondary align-items-center justify-content-center ecenario border " style={{height: '5rem' ,width: '20rem'}}>
      <h4>ecenario</h4> 
      </div></div>
      <div>
      <div style={{height:' 5rem', width:'7.7rem'}}>

      </div>
      </div>
      </div>
      
      <div className="d-flex flex-row ">
        <div>
        <div className=" izquierda rounded-4 border bg-light" style={{height:' 28rem', width:'7.7rem'}}>
        <select className="col-12 form-control-sm"  value={espacios.izquierda} 
        name="izquierda"
        onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
        </div>
        </div>
        <div>
        <div className="central d-flex flex-column">
          
          <div className="divicion  d-flex flex-wrap justify-content-center" >
            <div className="izquierda border rounded-4 bg-light mx-1" style={{height:' 5rem', width:'9.9rem'}}>
            <select  className="form-control-sm col-12"
            value={espacios.centrouno}
            name="centrouno" onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
            </div>
            <div className="derecha border rounded-4 bg-light" style={{height:' 5rem', width:'9.9rem'}}>
            <select className="form-control-sm col-12"
            value={espacios.centrodos}
            name="centrodos"
            onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
            </div>
          </div>
          <div className="consola  d-flex flex-column p-2">
            <div >
              <div className="d-flex flex-wrap " >
    
                <div className="izquierda border-top  border-right border-left  bg-light" style={{height: '4rem',width: '7.5rem',borderTopLeftRadius:'5px'}}>

                </div>
                <div className="text-center   " style={{height:' 4rem', width:'5rem'}}>
                consola
                </div>
                <div className="derecha border-top  border-right border-left bg-light" style={{height: '4rem',width: '7.5rem',borderTopRightRadius:'5px'}}
                ></div>
              </div>
        
        
              <div className="ecenario  pb-2 px-2 border-bottom  border-right border-left bg-light" style={{height: '5rem' ,width: '20rem'}}>
              <select className="mt-1
              form-control-sm col-12"
              value={espacios.centroconsola}
              name="centroconsola" onChange={(e)=>handelChange(e.target)}>
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
              </div>
            </div>
            
    
          </div>
          <div className="p-2">
            <div className=" border rounded-4 bg-light " style={{height: '5rem' ,width: '20rem'}}>
            <select className="form-control-sm col-12"
            value={espacios.centrotres}
            name="centrotres"
             onChange={(e)=>handelChange(e.target)}>
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
            </div>
          </div>
          <div className="p-2">
            <div className=" border rounded-4 bg-light " style={{height: '5rem' ,width: '20rem'}}>
            <select className="form-control-sm col-12"
            value={espacios.centrocuatro}
            name="centrocuatro"
             onChange={(e)=>handelChange(e.target)}>
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
            </div>
          </div>
          
         </div>
         </div>
         <div className="">
          <div className=" derecha rounded-4 border bg-light" style={{height:' 28rem', width:'7.7rem'}}>
          <select className="form-control-sm col-12"
            value={espacios.derecha}
            name="derecha"
             onChange={(e)=>handelChange(e.target)}>
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
          </div>
         </div>
         
        
      </div>
      <div className="localidad baja px-2 d-flex flex-row pt-1">
        <div>
        <div className="" style={{height:' 5rem', width:'2rem'}}></div>
        </div>
        <div>
        <div className=" rounded-4 border bg-light" style={{height:' 5rem', width:'31.3rem'}}>
        <select className="form-control-sm col-12"
            value={espacios.final}
            name="final"
             onChange={(e)=>handelChange(e.target)}>
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      })
      :''}
      </select>
        </div>
        </div>
        <div>
        <div className="" style={{height:' 5rem', width:'2rem'}}></div>
        </div>
      </div>
      </div>
  </div>
 
 
  
</div>
    </>
)

}
export default EcenarioEstandar