import React from "react";
const MesacuatroView =({text})=>{
    return(
        <div className=""  style={{padding: '0.7px'}}>
              <div className="d-flex px-1">
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
              </div>
        
              <div className=" d-flex  align-items-center">
                <div className="d-flex flex-column">
                  <a className={"sillas bg-success "+text+"-s-0"}  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                  </a>          
                 
                  <a className={"sillas bg-success "+text+"-s-1"}  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                  </a>
                </div>
                <div className={text +"  Mesa bg-success d-flex p-1"} style={{height:'40px',width:'50px',borderRadius:'5px',alignItems:'center',justifyContent:'center'}}>
                {text}
                </div>
                
                <div className="d-flex flex-column">
                  <a className={"sillas bg-danger "+text+"-s-2"}  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                  </a>         
                  <a className={"sillas bg-success "+text+"-s-3"} style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                  </a>
                </div>
              </div>
        
              <div className="d-flex px-1 ">
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
                <div className=" "  style={{margin:'0.7',height:'15px',width:'15px',borderRadius:'5px'}}>
                </div>
              </div>  
            </div> 


        )

}

export default MesacuatroView;