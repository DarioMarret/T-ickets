import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { Columnusuarios, Columnasubcrito } from "utils/ColumnTabla";
import { useHistory } from "react-router";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import {  GetRoles,  } from "utils/Querypanel";
import EditaruserView from "./ModalEditar";
import { Button, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import 'moment-timezone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { GetUserList, Eliminaruser } from "utils/QueryUser/index";
const UsersView = () => {
  const [fecha, setFecha] = useState(new Date())
  let history = useHistory()
  let user = clienteInfo()
  const [listUsuarios, setListauser] = useState([])
  const [editShow, SetModalEdit] = useState(false)
  const [datosuser, SetDatosUser] = useState({})
  const [roles, setRoles] = useState([])
  const [estado, setEstado] = useState("")
  const [id, setIdentificado] = useState("")
  const [alert, setAlert] = React.useState(null)
  const cerraredit = (e) => {
    setEstado("update")
    SetDatosUser(e)
    SetModalEdit(true)
    // console.log(e)
  }
  const Crearuser = () => {
    setEstado("")
    SetModalEdit(true)
  }
  async function ListarUsuarios() {
    try {

      let Roles = await GetRoles()


      const data = await GetUserList()
      //  console.log(data)
      if (data.users.length > 0) {
        let dato = Roles.data.map((e, i) => {
          return { "value": e.roles, "label": e.roles }
        })
        setRoles(dato)
        setListauser(data.users)
     
      }
    } catch (error) {
      console.log(error)

    }


  }
  function reloadpage() {
    // console.log("se creo")
    location.reload()
    //history.push("/admin/usuario")
  }

  async function Eliminar(id) {
    if (id == user.id) {
      cancelDetele1()
    }
    else {
      try {
        const elimna = await EliminaUser(id)
        let lista = listUsuarios.filter(e => e.id != id)
        const { success, message } = elimna
        if (success) {
          setListauser(lista)
          successDelete()
        }

      } catch (error) {
        console.log(error)

      }
    }


  }
  useEffect(() => {
    (async () => {
      await ListarUsuarios()


    })()

    console.log(listUsuarios)
  }, [])


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
    <Row className="d-none">
      <Col lg="3" sm="6" >
        <Card className="card-stats ">
          <Card.Body>
            <Row className="">
              <Col xs="5">
                <div className="icon-big text-center ">
                  <i className="nc-icon nc-square-pin text-warning"></i>
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Eventos Globales</p>
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
                  <p className="card-category">Recaudaciones Globales</p>
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
                  <p className="card-category">Tickets Globales</p>
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
                  <p className="card-category">Total de usuarios</p>
                  <Card.Title as="h4">{listUsuarios.length ? listUsuarios.length : 0}</Card.Title>
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
        <button className="btn btn-success" onClick={Crearuser} ><i className="mr-2 fa fa-plus"></i> Nuevo Usuario</button>

        <br /><br />

        <div className="card card-primary card-outline text-left">
          <div className="card-header mb-1">
            Usuarios
          </div>
          <MaterialReactTable
            columns={Columnusuarios}
            data={listUsuarios}

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
                  onClick={() => history.push("/admin/usuario/" + row.original.id)}
                >
                  <Visibility />
                </IconButton>


              </Box>
            )}
            positionToolbarAlertBanner="bottom"
            localization={MRT_Localization_ES}
          />
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