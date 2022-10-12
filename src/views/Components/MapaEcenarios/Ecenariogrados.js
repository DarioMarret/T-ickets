import React,{useEffect,useState} from "react"
import { ListarLocalidad } from "utils/Querypanel"
const EcenarioGradoView =(props)=>{
  const {localidaname} =props
  const [datas,setData]=useState([])
  const [espacios,SetEspacio]=useState({
    izquierdauno:'',
    izquierdados:'',
    arribauno:'',
    arribados:'',
    abajouno:'',
    abajodos:'',
    derechauno:'',
    derechados:'',
  })
  async function ObtenLocalidad(){    
     try {
      const datos =await ListarLocalidad()
const {success,data}=datos

      if(success){
      const filtrado = data.filter(e => e.espacio == localidaname.nombre)
     // console.log("Filtrado en ecenario grado",filtrado)
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
   
    //const resultado = Object.values(espacios).reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
   // console.log("validar repetido",resultado)
   // const validarepetido=Object.values(resultado).filter((d) =>d>1)
   // console.log("validar repetido",validarepetido)
   // console.log("validar repetido",(validarepetido.length>0))
  }
  useEffect(()=>{
    (async()=>{
        await ObtenLocalidad()
    })()
console.log(espacios)
  },[])


return(
    <>
   <div className="row" style={{width:'90%'}}> 
   <div>
      <button className="btn btn-primary  float-right">Guarda Mapa </button>
      {/*<button className="btn btn-primary float-right">Guarda </button>*/}
      </div>
  <div className="d-flex     flex-column " > 
    <div className="d-flex flex-row">
      <div>

      
        <div className="centro izquierdados  mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        </div>
        <div>
        <div className="centro izquierdados   mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        </div>
        <div>
          
      <div className="arribauno border mb-1 bg-light  rounded-4" style={{width:' 20rem',height:' 5rem'}}>
        
      <select 
      className="form-control-sm"
      name="arribados"
      value={espacios.arribados}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
      </div>
      </div>
      <div className="   mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        <div className="    mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
    </div>
    <div className="d-flex  pb-1 flex-row">
      <div>
    <div className="centro izquierdados  mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        </div>
        <div>
        <div className="centro izquierdados   mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        </div>
        <div>
      <div className="border bg-light rounded-4  " style={{width:' 20rem',height:' 5rem'}}>
      <select className="form-control-sm"
      name="arribauno"
      value={espacios.arribauno}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
      </div>
      </div>
      <div className="centro izquierdados  mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
        <div className="centro izquierdados   mx-1 rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
    </div>
    <div className="centro d-flex flex-row">
      <div className="px-1">

        <div className="centro izquierdados border bg-light mb-1 rounded-4" style={{width:' 5rem',height:' 20rem'}}>
        <select  className="form-control-sm col-12"
      name="izquierdados"
      value={espacios.izquierdados}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
        </div>

      </div>



      <div className="px-1">

        <div className="centro iquierdauno  border bg-light rounded-4" style={{width:' 5rem',height:' 20rem'}}>
        <select  className="form-control-sm col-12"
      name="izquierdauno"
      value={espacios.izquierdauno}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
        </div>

      </div>


      <div className="px-1">

        <div className="d-flex justify-content-center align-items-center centro rounded-4  border bg-secondary p-1" style={{width:' 20rem',height:' 20rem'}}>
          <h4>ecenario </h4> 
        </div>

      </div>
     <div className="derecha">

      <div className="centro derecha border bg-light mx-1 rounded-4" style={{width:' 5rem',height:' 20rem'}}>
      <select className="form-control-sm col-12"
      name="derechauno"
      value={espacios.derechauno}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
      </div>

     </div>
      <div>

        <div className="centro derecha derechados border bg-light rounded-4" style={{width:' 5rem',height:' 20rem'}}>
        <select  className="form-control-sm col-12"
      name="derechados"
      value={espacios.derechados}
      onChange={(e)=>handelChange(e.target)}
        >
      <option></option>
      {datas.length>0?
      datas.map((e,i)=>{
        return(
          <option value={e.nombre} key={i+"-"+e.id} >{e.nombre}</option>
        )
      }):''}
      </select>
        </div>
        
      </div>
      
    </div>





    <div  className="d-flex flex-row">
    <div className="px-1">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div className="px-1">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div>
      <div className="border bg-light  rounded-4" style={{width:' 20rem',height:' 5rem'}}>
      <select className="form-control-sm"
            value={espacios.abajouno}
            name="abajouno"
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
      <div className="">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div className="">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
    </div>
    <div className=" d-flex flex-row mt-1">
      <div className="px-1">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div className="px-1">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div className="">       
      <div className="border bg-light rounded-4 p-1" style={{width:' 20rem',height:' 5rem'}}>
      <select className="form-control-sm"
            value={espacios.abajodos}
            name="abajodos"
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
      <div>
      </div>
      
      </div>
      <div className="">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
      <div className="">
        <div className="centro izquierdados   rounded-4" style={{width:' 5rem',height:' 5rem'}}>
        
        </div>
      </div>
    </div>
  </div>
</div>

    </>
)

}
export default EcenarioGradoView