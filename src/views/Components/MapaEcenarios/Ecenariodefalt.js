import React,{useEffect,useState} from "react"
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"

const EcenarioDefView =(props)=>{
  const {localidaname} =props
  const [datas,setData]=useState([])
  const [espacios,SetEspacio]=useState({
    izquierda:'',
    derecha:'',
    centrouno:'',
    centrodos:'',
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
   }
  useEffect(()=>{
    (async()=>{
        await ObtenLocalidad()
    })()

  },[])
 return(
    <>
    <div className="d-flex flex-column   " style={{width:'90%'}}> 
    <div>
      <button className="btn btn-primary float-right ">Guarda Mapa  </button>
      {/*<button className="btn btn-primary mx-1 float-right">Actualizar </button>*/}
      </div>
   
    <div className="d-flex flex-column">
    
      <div>
         <div className="d-flex flex-row">  
                <div className="">
                  <div className="izquierda px-1 border rounded-4 bg-light" style={{height: '22rem',width: '6rem'}}>
                  <select className="form-control-sm col-12"
                  name="izquierda"
                  value={espacios.izquierda}
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
                <div className="central d-flex flex-column px-1">
                  <div className="d-flex justify-content-center align-items-center border rounded-4 bg-secondary" style={{height: '5rem', width: '20rem'}}>
                    <h4>ecenario </h4> 
                  </div>
                  <div className="d-flex flex-wrap pt-1 pb-1 justify-content-between " >
                    <div>
                      <div className="centro border rounded-4 bg-light" style={{height: '5rem', width: '9.5rem'}}>
                      <select className="form-control-sm"
                        name="centrouno"
                        value={espacios.centrouno}
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
                      <div className="derecha border rounded-4 bg-light" style={{height: '5rem', width: '9.5rem'}}>
                      <select className="form-control-sm"
                      name="centrodos"
                      value={espacios.centrodos}
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
                  <div>
                    <div className="ecenario rounded-4 mb-1 border bg-light" style={{height: '5rem', width: '20rem'}}>
                    <select className="form-control-sm"
                  name="centrotres"
                  value={espacios.centrotres}
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
                  
                  <div className="ecenario border rounded-4 bg-light" style={{height: '5rem' ,width: '20rem'}}>
                  <select className="form-control-sm"
                  name="centrocuatro"
                  value={espacios.centrocuatro}
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
                <div>
                <div className="derecha px-1 rounded-4 border bg-light" style={{ height: '22rem', width: '6rem'}}>
                <select className="form-control-sm col-12"
                  name="derecha"
                  value={espacios.derecha}
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

          <div>
          <div className="d-flex flex-row pt-2">
            <div>
            <div className="abajo  rounded-4 border bg-light" style={{ height: '6rem', width: '32.5rem'}}>
            <select className="form-control-sm"
              name="abajo"
              value={espacios.abajo}
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
  
 
    </div>
    </>
 )

}
export default EcenarioDefView