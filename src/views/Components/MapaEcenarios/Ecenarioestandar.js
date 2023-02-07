import React,{useEffect,useState} from "react"
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"
const EcenarioEstaView =(props)=>{
  const {localidaname} =props
  const [datas,setData]=useState([])
  const [espacios,SetEspacio]=useState({
    primero:'',
    segundo:'',
    tercero:'',
    cuarto:'',    
  })
  async function ObtenLocalidad(){    
     try {
      const datos =await ListarLocalidad()
const {success,data}=datos

      if(success){
      const filtrado = data.filter(e => e.espacio == localidaname.nombre)
      //console.log("Filtrado en ecenario estandaar",filtrado)
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
  }

  useEffect(()=>{
    (async()=>{
        await ObtenLocalidad()
    })()

  },[])
    return(
    <>
    <div className="d-flex flex-column  " style={{width:'90%',height:'auto'}} >
    <div>
      <button className="btn btn-primary  float-right">Guarda Mapa </button>
      {/*<button className="btn btn-primary float-right">Guarda </button>*/}
      </div>
  <div className="d-flex p-2">
    
  <div className="d-flex rounded-4 bg-secondary align-items-center justify-content-center ecenario border " style={{height: '5rem',width: '20rem'}}>
  <h4>ecenario</h4> 
  </div>
  </div>
  
  <div className="d-flex ">
    
    <div className="central d-flex flex-column">
      
      <div className="divicion  d-flex flex-wrap justify-content-center" >
        <div className="izquierda border rounded-4 bg-light mx-1" style={{height: '5rem', width:'20rem'}}>

        <select className="form-control-sm"
      name="primero"
      value={espacios.primero}
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
      <div className="consola  d-flex flex-column p-2">
        <div >
          <div className="d-flex flex-wrap " >

            <div className="izquierda border-top  border-right border-left  bg-light" style={{ height: '4rem', width: '7.5rem',borderTopLeftRadius: '5px'}}></div>
            <div className="text-center   " style={{height: '4rem', width: '5rem'}}>
            consola
            </div>
            <div className="derecha border-top  border-right border-left bg-light" style={{height: '4rem', width: '7.5rem', borderTopLeftRadius: '5px'}}></div>
          </div>   
          <div className="ecenario  pb-2  border-bottom  border-right border-left bg-light" style={{height: '5rem', width: '20rem'}}>
          <select className="form-control-sm mt-1"
      name="segundo"
      value={espacios.segundo}
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
      <div className="px-2">
        <div className=" border rounded-4 bg-light " style={{height: '5rem', width: '20rem'}}>
        <select className="form-control-sm"
      name="tercero"
      value={espacios.tercero}
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
      <div className="px-2 pt-1">
        <div className=" border rounded-4 bg-light " style={{height: '5rem', width: '20rem'}}>
        <select className="form-control-sm"
      name="cuarto"
      value={espacios.cuarto}
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
  </div>
</div>
    </>
    )

}
export default EcenarioEstaView