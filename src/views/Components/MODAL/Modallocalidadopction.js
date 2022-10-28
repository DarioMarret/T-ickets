import React,{useEffect,useState} from "react"
import { Modal } from "react-bootstrap"
const LocalidadesView =(props)=>{
    const {id} =props

    const [sillaarray,setSilla]=useState([])
    //let arrayList = [];
    function toggleValueInArray(value) {
        let array =sillaarray
        var index = array.findIndex(obj => obj.silla==value.silla);
      //var index = array.indexOf(value);     
      if (index === -1) {
        array.push(value);    
      } else {
        do {
          array.splice(index, 1);
          index = array.indexOf(value);      
        } while (index != -1);
      }
      setSilla(array) 
      console.log(array)
    }
   $(document).on('click','a.sillas',function (e){
      e.preventDefault();
  if(this.classList.contains("bg-success")){
      if(!this.classList.contains('bg-danger')){
     this.classList.remove('bg-success')
      this.classList.remove('sillas')
      this.classList.add('bg-secondary')
      this.classList.add('asiento')
     // console.log(this.classList[0].split("-")[0])
      toggleValueInArray({"fila":this.classList[0].split("-")[0],"silla":this.classList[0]})
     // $("div.Mesa").removeClass("bg-secondary").addClass("bg-success")       
       }      
       return
     }
      
  })
  $(document).on('click','a.asiento',function (e){
      e.preventDefault();
  if(this.classList.contains("bg-secondary")){
  if(!this.classList.contains('bg-danger')){
      this.classList.remove('bg-secondary')
      this.classList.remove('asiento')
      this.classList.add('bg-success')
      this.classList.add('sillas')        
     // console.log(this.classList[0].split("-")[0])
      toggleValueInArray({"fila":this.classList[0].split("-")[0],"silla":this.classList[0]})
     // $("div.Mesa").removeClass("bg-secondary").addClass("bg-success")       
       }      
       return
     }
      
  })
  $(document).on('click','div.Mesa',function(e){     
      e.preventDefault();
      let fila =e.target.getAttribute('class').split(" ")[0]
        
      this.classList.replace('bg-success','bg-secondary');
      this.classList.replace('Mesa','Sillas')
       for(i=0;i<10;i++){             
           var puesto =fila+'-s-'+i;            
          if(!$("."+puesto).hasClass('bg-danger') && $("."+puesto).hasClass('bg-success')){
              $("a."+puesto).removeClass("bg-success").removeClass("sillas").addClass("bg-secondary").addClass("asiento")   
              $("a").hasClass(''+puesto)? toggleValueInArray({"fila":fila,"silla":puesto}):''
          }
          /*else if(!$("."+puesto).hasClass('bg-danger') && !$("."+puesto).hasClass('bg-success')){
              this.classList.replace('bg-secondary','bg-success');
              $("a."+puesto).removeClass("bg-secondary").removeClass("asiento").addClass("bg-success").addClass("sillas")   
              $("a").hasClass(''+puesto)? toggleValueInArray({"fila":fila,"silla":puesto}):''
          }*/         
       }       
   })
   $(document).on('click','div.Sillas',function(e){     
      e.preventDefault();
      let fila =e.target.getAttribute('class').split(" ")[0]
        
      this.classList.replace('bg-secondary','bg-success');
      this.classList.replace('Sillas','Mesa')
       for(i=0;i<10;i++){             
           var puesto =fila+'-s-'+i;            
           if(!$("."+puesto).hasClass('bg-danger') && !$("."+puesto).hasClass('bg-success')){              
              $("a."+puesto).removeClass("bg-secondary").removeClass("asiento").addClass("bg-success").addClass("sillas")   
              $("a").hasClass(''+puesto)? toggleValueInArray({"fila":fila,"silla":puesto}):''
          }   
       }       
   })
   /*
   let array = [];
   function toggleValueInArray(value) {
      
       var index = array.findIndex(obj => obj.silla==value.silla);
     //var index = array.indexOf(value);     
     if (index === -1) {
       array.push(value);    
     } else {
       do {
         array.splice(index, 1);
         index = array.indexOf(value);      
       } while (index != -1);
     }
     setSilla(array) 
     console.log(array)
   }
   $(document).on('click','a.sillas',function (e){
       e.preventDefault();
   if(this.classList.contains("bg-success")){
       if(!this.classList.contains('bg-danger')){
      this.classList.remove('bg-success')
       this.classList.remove('sillas')
       this.classList.add('bg-secondary')
       this.classList.add('asiento')
      // console.log(this.classList[0].split("-")[0])
       toggleValueInArray({"fila":this.classList[0].split("-")[0],"silla":this.classList[0]})
      // $("div.Mesa").removeClass("bg-secondary").addClass("bg-success")       
        }      
        return
      }
       
   })
   $(document).on('click','a.asiento',function (e){
       e.preventDefault();
   if(this.classList.contains("bg-secondary")){
   if(!this.classList.contains('bg-danger')){
       this.classList.remove('bg-secondary')
       this.classList.remove('asiento')
       this.classList.add('bg-success')
       this.classList.add('sillas')        
      // console.log(this.classList[0].split("-")[0])
       toggleValueInArray({"fila":this.classList[0].split("-")[0],"silla":this.classList[0]})
      // $("div.Mesa").removeClass("bg-secondary").addClass("bg-success")       
        }      
        return
      }
       
   })
   $(document).on('click','div.Mesa',function(e){     
       e.preventDefault();
       let fila =e.target.getAttribute('class').split(" ")[0]
         
       this.classList.replace('bg-success','bg-secondary');
       this.classList.replace('Mesa','Sillas')
        for(i=0;i<10;i++){             
            var puesto =fila+'-s-'+i;            
           if(!$("."+puesto).hasClass('bg-danger') && $("."+puesto).hasClass('bg-success')){
               $("a."+puesto).removeClass("bg-success").removeClass("sillas").addClass("bg-secondary").addClass("asiento")   
               $("a").hasClass(''+puesto)? toggleValueInArray({"fila":fila,"silla":puesto}):''
           }
        }       
    })
    $(document).on('click','div.Sillas',function(e){     
       e.preventDefault();
       let fila =e.target.getAttribute('class').split(" ")[0]
         
       this.classList.replace('bg-secondary','bg-success');
       this.classList.replace('Sillas','Mesa')
        for(i=0;i<10;i++){             
            var puesto =fila+'-s-'+i;            
            if(!$("."+puesto).hasClass('bg-danger') && !$("."+puesto).hasClass('bg-success')){              
               $("a."+puesto).removeClass("bg-secondary").removeClass("asiento").addClass("bg-success").addClass("sillas")   
               $("a").hasClass(''+puesto)? toggleValueInArray({"fila":fila,"silla":puesto}):''
           }   
        }       
    })*/

    useEffect(()=>{
     },[]) 
    return(
    <>
    <Modal 
    
    fullscreen={true}
    >
       <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>

    </Modal>
    </>)
}
export default LocalidadesView