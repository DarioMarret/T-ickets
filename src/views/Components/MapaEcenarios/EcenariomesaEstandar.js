const EcenarioEstandar =()=>{
return(
    <>
   <div className="d-flex ">
  <div className="d-flex flex-column align-items-center">
    <div className="d-flex pb-2">
    
      <div className="d-flex rounded-4 bg-secondary align-items-center justify-content-center ecenario border " style={{height: '5rem' ,width: '20rem'}}>
      <h4>ecenario</h4> 
      </div>
      </div>
      
      <div className="d-flex ">
        <div className="izquierda rounded-4 border bg-light" style={{height:' 28rem', width:'5.6rem'}}>
          izquierda
        </div>
        <div className="central d-flex flex-column">
          
          <div className="divicion  d-flex flex-wrap justify-content-center" >
            <div className="izquierda border rounded-4 bg-light mx-1" style={{height:' 5rem', width:'9.9rem'}}></div>
            <div className="derecha border rounded-4 bg-light" style={{height:' 5rem', width:'9.9rem'}}></div>
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
                
              </div>
            </div>
            
    
          </div>
          <div className="p-2">
            <div className=" border rounded-4 bg-light " style={{height: '5rem' ,width: '20rem'}}>
            ultimo
            </div>
          </div>
          <div className="p-2">
            <div className=" border rounded-4 bg-light " style={{height: '5rem' ,width: '20rem'}}>
            ultimo
            </div>
          </div>
          
         </div>
         <div className="">
          <div className=" derecha rounded-4 border bg-light" style={{height:' 28rem', width:'5.6rem'}}>
            derecha
          </div>
         </div>
         
        
      </div>
      <div className="px-2 pt-1">
        <div className=" rounded-4 border bg-light" style={{height:' 5rem', width:'31.3rem'}}>
           abajo
        </div>
      </div>
  </div>
 
 
  
</div>
    </>
)

}
export default EcenarioEstandar