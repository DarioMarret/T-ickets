import React,{useEffect,useState} from "react";
import { useHistory } from "react-router";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { GetUserList,GetRoles,EliminaUser } from "utils/Querypanel";
import EditaruserView from "./ModalEditar";
import { Button } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

import SweetAlert from 'react-bootstrap-sweetalert';
const UsersView=()=>{
  let history= useHistory()
  let user = clienteInfo()
    const [listUsuarios,setListauser]=useState([])
    const [editShow,SetModalEdit]=useState(false)
    const [datosuser,SetDatosUser]=useState({})
    const [roles, setRoles] = useState([])
    const [estado,setEstado] =useState("")
    const [id,setIdentificado]=useState("")
    const [alert,setAlert] = React.useState(null)
    const cerraredit=(e)=>{
        setEstado("update")
        SetDatosUser(e)       
        SetModalEdit(true)
       // console.log(e)
    }
    const Crearuser=()=>{
        setEstado("")           
        SetModalEdit(true)

    }
   
    async function ListarUsuarios(){
        try {
            
            let Roles = await GetRoles()
            

            const data = await GetUserList()
          //  console.log(data)
            if(data.users.length>0){
                setRoles(Roles.data) 
                setListauser(data.users)
            }
        } catch (error) {
            console.log(error)
            
        }

        
    }
    function reloadpage(){
      console.log("se creo")
      location.reload()
      //history.push("/admin/usuario")
    }
    
    async function Eliminar(id){
      if(id==user.id){
        cancelDetele1()
      }
      else{try {
        const elimna = await EliminaUser(id)
        let lista =listUsuarios.filter(e=>e.id!=id) 
        const { success,message} =elimna
         if(success){
        setListauser(lista)         
        successDelete()
      }
        
      } catch (error) {
        console.log(error)
        
      }}
      

    }
    useEffect(()=>{
      (async()=>{
          await ListarUsuarios()
         
       
      })()
      

  },[])
  
 
  const successAlert = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Eliminar(e)}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel
      >
        Esta seguro de eliminar este Usuario
      </SweetAlert>
    );
  };
  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Eliminado!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
        El usuario se elimino correctamenta
      </SweetAlert>
    );
  };
  const cancelDetele = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelado"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
       Se a cancelado la acción 
      </SweetAlert>
    );
  };
  const cancelDetele1 = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Session Activa"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
      La seccion esta activa no se puede eliminar 
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };
  

   return (<div className="container-fluid">

            
    
    {alert}
          <div className="row">        
              <div className="col-md-12">
                  <button  className="btn btn-success"onClick={Crearuser} ><i className="mr-2 fa fa-plus"></i> Nuevo Usuario</button>

                  <br/><br/>

                  <div className="card card-primary card-outline text-left">
                      <div className="card-header">
                         Usuarios
                      </div>
                      <div className="card-body">

                          <table className="table table-hover text-center">
                              <thead>
                                  <tr>
                                      
                                      <th scope="col">Nombres</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Usuario</th>                                            
                                      <th scope="col">Permiso</th>
                                      <th scope="Col">Fecha de Registro </th>
                                      
                                      <th></th>
                                  </tr>
                              </thead>
                              <tbody>
                                {listUsuarios.length>0?
                                  listUsuarios.map((e,i)=>{
                                    return(
                                      <tr key={e.id+""+i}>
                                      <td >{e.name}</td>
                                      <td>{e.email}</td>
                                      <td>{e.username}</td>
                                      <td>{e.perfil} </td>
                                      <td>{e.fecha_creacion} </td>
                                      <td >
                                     
                                      <Button
                                          onClick={() => successAlert(e.id)}
                                          variant="danger"
                                          size="sm"
                                          className="text-danger btn-link like"
                                        >
                                          <i className="fa fa-trash" />
                                        </Button>
                                        <Button
                                          onClick={()=>cerraredit(e)}
                                          variant="info"
                                          size="sm"
                                          className="text-info btn-link like"
                                        >
                                          <i className="fa fa-edit" />
                                        </Button>
                                       
                                      
                                      
                                       </td>
                                 </tr>

                                    )
                                  }):
                                  <tr></tr> }
                                
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          <EditaruserView 
          editShow={editShow}
          SetModalEdit={SetModalEdit}
          datosuser={datosuser}
          roles={roles}
          estado={estado}
          reloadpage={reloadpage}
          />
         
      </div>)


}

export default UsersView