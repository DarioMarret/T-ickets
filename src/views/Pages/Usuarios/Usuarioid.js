import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { Row, Col, Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import {  GetRoles } from "utils/Querypanel";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import EditaruserView from "./ModalEditar";
import { ColumnaUsuarioid } from "utils/ColumnTabla";
import moment from "moment";
import 'moment-timezone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { eliminarRegistro } from "utils/pagos/Queripagos";
import { GetUserList, EliminaUser } from "utils/QueryUser/index";
const UseridView = () => {
  let user = clienteInfo()
  let history = useHistory()
  const [fecha, setFecha] = useState(new Date())
  let { id } = useParams()
  const [alert, setAlert] = React.useState(null)
  const [editShow, SetModalEdit] = useState(false)
  // console.log(id)
  //console.log("Estado dentro")
  const [roles, setRoles] = useState([])
  const [datauser, setDatauser] = useState({
    name: '',
    perfil: '',
    username: '',
    email: '',
    password: '',
  })
  const cerraredit = () => {
    SetModalEdit(true)
  }
  async function ListarUsuarios() {
    try {
      let Roles = await GetRoles()
      const data = await GetUserList()
      if (data.users.length > 0) {
        let rol = Roles.data.map((e, i) => {
          return { "value": e.roles, "label": e.roles }
        })
        setRoles(rol)
        const dato = data.users.filter((e) => e.id == id)
        setDatauser({
          username: dato[0].username,
          name: dato[0].name,
          email: dato[0].email,
          perfil: dato[0].perfil,
          password: ''
        })
      }
    } catch (error) {
      console.log(error)

    }
  }
  async function Eliminaruser(id) {
    EliminaUser(id).then(oupt=>{
      console.log(oupt)
      history.goBack()
    }).catch(err=>{
      console.log(err)
    })
  }
  const successAlert = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Eliminaruser(e)}
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
  useEffect(() => {
    (async () => {
      await ListarUsuarios()
    })()

  }, [])
  return (
    <>

      {alert}
      <div>
        <div className="d-flex justify-content-end align-items-end pb-2" >
          <div>
            <Button className="btn btn-wd btn-outline mr-1"
              type="button"
              onClick={cerraredit}
              variant="success">
              <span className="btn-label">
                <i className="fas fa-edit"></i>
              </span>
              Editar
            </Button>
            {
              String(user.id) === String(id) ?
                '' : <Button className="btn-wd btn-outline mr-1"
                  onClick={()=>successAlert(id)}
                  type="button"
                  variant="danger">
                  <span className="btn-label">
                    <i className="fas fa-trash"></i>
                  </span>
                  Eliminar
                </Button>}
          </div>




        </div>

        <Row>
          <Col lg="3" sm="6" >
            <Card className="card-stats ">
              <Card.Body>
                <Row className="">
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-chart-bar-32 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Info</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  Actualizado {moment(fecha).format('DD MMMM YYYY ')}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Recaudaciones</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Actualizado {moment(fecha).format('DD MMMM YYYY ')}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-notification-70 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tickets vendidos</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Actualizado {moment(fecha).format('DD MMMM YYYY ')}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-circle-09 text-info"></i>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">{datauser.name}</p>
                      <Card.Title as="h4">{datauser.username}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Actualizado {moment(fecha).format('DD MMMM YYYY ')}
                </div>
              </Card.Footer>
            </Card>
          </Col>



        </Row>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary card-outline text-left">
              <div className="card-header">
                Lista
              </div>
              <MaterialReactTable
                columns={ColumnaUsuarioid}
                data={[]}

                muiTableProps={{
                  sx: {
                    tableLayout: 'fixed'
                  }
                }}

                enableRowActions
                renderRowActions={({ row }) => (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      color="error"
                    >
                      <Delete />
                    </IconButton>


                  </Box>
                )}
                positionToolbarAlertBanner="bottom"

                localization={MRT_Localization_ES}
              />


              { /*<div className="card-body table-responsive">
                            <table className="table table-hover text-center ">
                                    <thead>
                                        <tr>
                                        <th scope="col">Actividad</th>
                                            <th scope="col">Cantidad</th>
                                            
                                            <th scope="col">fecha</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>                                     
                                        <tr>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <td>No hay datos</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th> 
                                        <th scope="row"></th>
                                      </tr>  
                                    </tbody>
                                </table>
                            </div>*/}
            </div>

          </div>
        </div>


      </div>
      <EditaruserView
        editShow={editShow}
        SetModalEdit={SetModalEdit}
        datosuser={datauser}
        roles={roles}
        estado={"update"}

      />


    </>
  )

}

export default UseridView;