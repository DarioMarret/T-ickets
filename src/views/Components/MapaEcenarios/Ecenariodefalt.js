import React from "react"

const EcenarioDefView =()=>{
 return(
    <>
    <div className="d-flex  align-items-center" style={{width:'100%'}}>
    <div className="d-flex flex-wrap  align-items-center">
  <div className="d-flex ">
    <div className="">
      <div className="izquierda px-1 border rounded-4 bg-light" style={{height: '22rem',width: '6rem'}}>
      <select>
      <option>primera</option>
      </select>
        
      </div>
    </div>
    
    <div className="central d-flex flex-column px-1">
      <div className="d-flex justify-content-center align-items-center border rounded-4 bg-secondary" style={{height: '5rem', width: '20rem'}}>
        <h4>ecenario </h4> 
      </div>
      <div className="d-flex flex-wrap pt-1 pb-1 justify-content-between " >
        <div>
          <div className="izquierda border rounded-4 bg-light" style={{height: '5rem', width: '9.5rem'}}>
          <select>
      <option>primera</option>
      </select>
          </div>
          
        </div>
        <div>
          <div className="derecha border rounded-4 bg-light" style={{height: '5rem', width: '9.5rem'}}>
          <select>
      <option>primera</option>
      </select>
          </div>
        </div>
        
      </div>
      <div>
        <p className="ecenario rounded-4 border bg-light" style={{height: '5rem', width: '20rem'}}>
        <select>
      <option>primera</option>
      </select>
        </p>
      </div>
      
      <div className="ecenario border rounded-4 bg-light" style={{height: '5rem' ,width: '20rem'}}>
      <select>
      <option>primera</option>
      </select>
      </div>
     </div>
     
     <div className="izquierda px-1 rounded-4 border bg-light" style={{ height: '22rem', width: '6rem'}}>
     <select>
      <option>primera</option>
      </select>
    </div>
      
  </div>
  <div className="pt-2">
    <div className="izquierda  rounded-4 border bg-light" style={{ height: '6rem', width: '32rem'}}>
    <select>
      <option>primera</option>
      </select>
    </div>
  </div>
  
  
</div>
    </div>
  
    </>
 )

}
export default EcenarioDefView