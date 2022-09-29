import React,{useEffect,useState} from "react";

import { Card,Col,Row ,Modal } from "react-bootstrap";
import { GetUserList,GetRoles } from "utils/Querypanel";
import EditaruserView from "./ModalEditar";

const UsersView=()=>{
    const [listUsuarios,setListauser]=useState([])
    const [editShow,SetModalEdit]=useState(false)
    const [datosuser,SetDatosUser]=useState({})
    const [roles, setRoles] = useState([])
    const [estado,setEstado] =useState("")
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

    useEffect(()=>{
        (async()=>{
            await ListarUsuarios()
           
         
        })()

    },[])

   return (<div className="container-fluid">

            
    {/*<Row>
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="4">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-chart text-warning"></i>
              </div>
            </Col>
            <Col xs="8">
              <div className="numbers">
                <p className="card-category">Total Suscritores</p>
                <Card.Title as="h4"></Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="fas fa-redo mr-1"></i>
            Update Now
          </div>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-light-3 text-success"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Revenue</p>
                <Card.Title as="h4">$ 1,345</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="far fa-calendar-alt mr-1"></i>
            Last day
          </div>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-vector text-danger"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Errors</p>
                <Card.Title as="h4">23</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="far fa-clock-o mr-1"></i>
            In the last hour
          </div>
        </Card.Footer>
      </Card>
    </Col>
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-favourite-28 text-primary"></i>
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">Followers</p>
                <Card.Title as="h4">+45K</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <hr></hr>
          <div className="stats">
            <i className="fas fa-redo mr-1"></i>
            Update now
          </div>
        </Card.Footer>
      </Card>
    </Col>
    </Row>*/}
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
                                      <a className="btn btn-primary btn-sm mx-1" data-toggle="tooltip" title="Eliminar Usuario"><i className="fa fa-eye"></i></a>
                                      <a className="btn btn-primary btn-sm mx-1"  data-toggle="tooltip" title="Editar Usuario" onClick={()=>cerraredit(e)}><i className="fa fa-edit"></i></a>
                                       </td>
                                 </tr>

                                    )
                                  }):
                                ""}
                                  
                                 {/* <tr>
                                      <th scope="row">Evento 3</th>
                                      <td>3</td>
                                      <td>Thornton</td>
                                      <td><span className="badge me-1 bg-dark text-white">Anulado</span></td>
                                      <td><a href="#">Descargar</a></td>
                                      <td >
                                      <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                          <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                          <a className="btn btn-primary btn-sm px-1"  data-toggle="tooltip" title="Ver mapa"><i className="fa fa-edit"></i></a>
                                       </td>
                                 </tr>*/}
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
          />
         
      </div>)


}

export default UsersView