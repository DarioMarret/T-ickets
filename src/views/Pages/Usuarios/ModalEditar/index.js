import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Modal } from "react-bootstrap";
import { GetRoles,EditUser,CrearUser } from "utils/Querypanel";

const EditaruserView =(props)=>{
  let history = useHistory()
    const {editShow,SetModalEdit,datosuser,estado,roles}=props
    const [validate,setValidate]= useState("")
  //  const [roles, setRoles] = React.useState([])
    const [datos,setDatos]=useState({
        name:'',
        perfil:'',
        username:'',
        email:'',
        password:'',
        id:''
    })
    function handelchnge(e){
        setDatos({
            ...datos,
            [e.name]:e.value
        })
            
    }
   async function Editar(){
    let params ={
        "name":datos.name,
        "email":datos.email,
        "username":datos.username,      
        "perfil":datos.perfil,
        "new_password":datos.password
    }
    
   // console.log(Object.values(params).every((d)=>d))

    if(!Object.values(params).every((d)=>d)) {setValidate("was-validated")  }
    else{
   // console.log(params)
    try {
      const editados= await EditUser(datos.id,params)
      const {success,message} =editados
      if(success){
       //alert(message)
       SetModalEdit(false)
       location.reload()
     //  history.push("/admin/usuario")
      }   
    } catch (error) {
      
    }}


              
    }
    async function Crearuser(){
        let params ={
            "name":datos.name,
            "email":datos.email,
            "username":datos.username,      
            "perfil":datos.perfil,
            "password":datos.password
        }     
        
        if(!Object.values(params).every((d)=>d)){ 
          setValidate("was-validated")  
          return true }
        else {
        try {
          setValidate("")
       const useradd=await CrearUser(params)
          const {success,message} =useradd
          if(success){
           
            SetModalEdit(false)
            history.push("/admin/usuario")
          }                
        } catch (error) {
          console.log(error)          
        }
    }

    }
    

    useEffect(()=>{
      setDatos({
        name:'',
        perfil:'',
        username:'',
        email:'',
        password:'',
        id:'',

      })
     
        setValidate("")  
        if(estado=="update"){
        //console.log(datosuser)
        setDatos({
            ...datos,
            name:datosuser.name,
            perfil:datosuser.perfil,
            email:datosuser.email,
            username:datosuser.username,
            id:datosuser.id
            })       }
            else{
                setDatos({                   
                    name:'',
                    perfil:roles.length>0?roles[0].roles:'',
                    username:'',
                    email:'',
                    password:'',
                    id:''
                    })

            }
    },[editShow])


    return(
        <>
        <Modal
        show={editShow}        
        onHide={()=>SetModalEdit(false)}
>
        <Modal.Header closeButton>
            <h5>
            {estado=="update"?" Editar usuario":"Crear nuevo Usuario"}
            </h5>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <form className={validate} >
                     <div className="row">
                     <div className="col-md-12">
                     <label className="form-label"><b>Nombres</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input id="name"
                              type="text"
                              value={datos.name}
                              onChange={(e)=>handelchnge(e.target)}
                              className="form-control"
                              name="name" 
                              required />
                </div>
                </div>
                     </div>
                
                <div className="row">
                <div className="col-md-12">
                <label className="form-label"><b>Correo</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                            </div>
                            <input id="email"
                            value={datos.email}
                              type="email"
                              onChange={(e)=>handelchnge(e.target)}
                              className="form-control"
                              name="email" 
                              required />

                </div>
                </div>
                </div>
                
                <div className="row">
                <div className="col-md-6">
                <label className="form-label"><b>Username</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input id="username"
                            value={datos.username}
                            onChange={(e)=>handelchnge(e.target)}
                              type="text"
                              className="form-control"
                              name="username" 
                              required />

                </div>
                </div>
                <div className="col-md-6">
                <label className="form-label"><b>Permiso</b></label>
                        
                     <select className="form-control" required value={datos.perfil} name="perfil" onChange={(e)=>handelchnge(e.target)}>
                     <option  value={""}></option>
                        {roles.length>0?
                        roles.map((e,i)=>{
                            return(
                            <option key={e.id+"index"+i} value={e.roles}>{e.roles}</option>
                            )
                        })
                        :
                        ""    
                    }
                     </select>
                                                   

               
                </div>

                </div>
                <div className="row">
                <div className="col-md-12">
                <label className="form-label"><b>Password</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input id="password"
                            value={datos.password}
                            onChange={(e)=>handelchnge(e.target)}
                              type="password"
                              className="form-control"
                              name="password" 
                              required />

                </div>
                </div>
                </div>
                
                
                </form>
                <div className="d-flex flex-wrap  justify-content-end ">
                                
                                {estado=="update"?
                                <button  className="btn btn-success float-right" onClick={Editar}>Actualizar</button>:
                                <button  className="btn btn-success float-right" onClick={Crearuser}>Crear</button>

                            
                            }
                 </div>
            </div>
        </Modal.Body>
      
        </Modal>
        </>

    )
}

export default EditaruserView