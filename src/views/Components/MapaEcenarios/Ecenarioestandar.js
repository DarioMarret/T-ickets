import React from "react"
const EcenarioEstaView =()=>{
    return(
    <>
    <div className="d-flex flex-column  justify-content-center align-items-center" style={{width:'90%',height:'auto'}} >
  <div className="d-flex p-2">
    
  <div className="d-flex rounded-4 bg-secondary align-items-center justify-content-center ecenario border " style={{height: '5rem',width: '20rem'}}>
  <h4>ecenario</h4> 
  </div>
  </div>
  
  <div className="d-flex ">
    
    <div className="central d-flex flex-column">
      
      <div className="divicion  d-flex flex-wrap justify-content-center" >
        <div className="izquierda border rounded-4 bg-light mx-1" style={{height: '5rem', width:'20rem'}}>

        <select>
      <option>primera</option>
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
          <div className="ecenario  pb-2 px-2 border-bottom  border-right border-left bg-light" style={{height: '5rem', width: '20rem'}}>
          <select>
      <option>primera</option>
      </select>
          </div>
        </div>
         

      </div>
      <div className="px-2">
        <div className=" border rounded-4 bg-light " style={{height: '5rem', width: '20rem'}}>
        <select>
      <option>primera</option>
      </select>
        </div>
      </div>
      <div className="px-2 pt-1">
        <div className=" border rounded-4 bg-light " style={{height: '5rem', width: '20rem'}}>
        <select>
      <option>primera</option>
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