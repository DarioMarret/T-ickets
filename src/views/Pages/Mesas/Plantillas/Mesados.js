import React from "react";
const MesadosView =({text})=>{
    return(
        <div  style={{padding: '0.7px'}}>
        <div className="d-flex px-1">
          <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </div>
          
            <div   style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}></div>
          
            <a className={"sillas bg-success "+text+"-s-0"}  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </a>
          <div  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </div>
        </div>
  
        <div className=" d-flex  align-items-center">
          <div className="d-flex flex-column">
            <div style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
            </div>          
           
            <div style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
            </div>   
          </div>
          <div className={text +"  Mesa bg-success d-flex p-1"}   style={{height:'40px',width:'50px',borderRadius:'5px',alignItems:'center',justifyContent:'center'}}>
          {text}
          </div>
          
          <div className="d-flex flex-column">
          <div style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
            </div>           
            <div style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
            </div>   
          </div>
        </div>
  
        <div className="d-flex px-1">
          <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </div>
          
            <div   style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}></div>
          
          <a className={"sillas bg-success "+text+"-s-1"}  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </a>
          <div  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
          </div>
        </div>
      </div> 


        )

}

export default MesadosView;