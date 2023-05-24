import React, { useEffect, useState } from "react";
import { Card, Col, Row, Modal } from "react-bootstrap";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Columnevento } from "utils/ColumnTabla";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
import { EliminarEventoid, ActualizarEvento, ListarEventos } from "utils/EventosQuery";
import ModalcreaEventoView from "./MODAL/ModalcreaEventos";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import Modalpreciolocalidad from "./MODAL/Modalpreciolocalidad";
import ListarPreciView from "./MODAL/ModalListaprecio";
import { removeDatosUsuario } from "utils/DatosUsuarioLocalStorag";
import Newitemview from "./Componentes/Newitems";
import OpcionMapaViews from "./Componentes/Opcionmapa";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
require('moment/locale/es.js')

const EventosViews = () => {
  let history = useHistory()
  let dispatch = useDispatch()
  let modal = useSelector(state => state.SuscritorSlice.modal)
  const [localidaname, setLocalidad] = useState({ id: '', nombre: '', descripcion: '' })
  const [show, setShow] = useState(false)
  const [eventoslist, setEventos] = useState([])
  const [alert, setAlert] = React.useState(null)
  const sorter = (a, b) => a.id > b.id || new Date(a.fechaConcierto) < new Date(b.fechaConcierto) ? 1 : -1;

  function nuevoevento() {
    dispatch(setModal({ nombre: "ModalcreaEventoView", estado: "" }))
  }
  async function GetEventos() {
    try {
      const lista = await ListarEventos()
      console.log(lista,)
      if (lista.success) {
        setEventos([...lista.data])
        return;
      }
      if (!lista.success && lista.error != "jwt expired") {
        dispatch(setToastes({ show: true, message: lista.message, color: 'bg-danger', estado: 'Error' }))

        return
      }
      if (!lista.success && lista.error == "jwt expired") {
        removeDatosUsuario()
        history.push("/admin")
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function Elimna(e) {
    let { codigo, fecha, id } = e
    var f1 = new Date(fecha);
    var fhoy = new Date();
    if (false) {
      hideAlert()
      dispatch(setToastes({ show: true, message: 'El evento ya no se puede elimnar', color: 'bg-danger', estado: 'Error' }))
    }
    else
      try {
        console.log(e, e.id)
        EliminarEventoid(e.id).then(Output => {
          console.log(Output.status, Output)

          if (Output.success) {
            hideAlert()
            dispatch(setToastes({ show: true, message: 'Se elimino el evento el evento', color: 'bg-success', estado: 'Eliminado' }))
            window.location.reload()
            return

          }
          if (!Output.success) {
            hideAlert()
            dispatch(setToastes({ show: true, message: 'El evento tiene localidades anidadas ', color: 'bg-success', estado: 'No se puede eliminar' }))
          }
          else {
            console.log(Output)
            hideAlert()
            dispatch(setToastes({ show: true, message: 'Hubo un error al elimnar el evento', color: 'bg-danger', estado: 'Error' }))
          }



        }).catch(err => {
          console.log(err)
        })

      } catch (error) {
        dispatch(setToastes({ show: true, message: 'Hubo un error en el procceso', color: 'bg-danger', estado: 'Error' }))
      }
  }
  const successAlert = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Elimna(e)}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel
      >
        Esta seguro de eliminar este evento
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
      >Se a cancelado la acción
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };

  useEffect(() => {

    (async () => {
      await GetEventos()
    })()
  }, [show])
  return (
    <div className="container-fluid">
      {alert}
      {(modal.nombre == "ModalcreaEventoView") ? <ModalcreaEventoView /> : ""}
      {(modal.nombre == "Modalpreciolocalidad") ? <Modalpreciolocalidad /> : ""}
      {(modal.nombre == "OpcionMapaViews") ? <OpcionMapaViews /> : ""}
      {(modal.nombre == "ListarPreciView") ? <ListarPreciView /> : ""}
      {
        (modal.nombre == "Newitemview") ? <Newitemview /> : ""
      }
      {/* <NewEspacioView
      showNuevo={(modal.nombre=="NewEspacioView")}
      
  />*/}
      <Row className="d-none">
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Number</p>
                    <Card.Title as="h4">150GB</Card.Title>
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
      </Row>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success" onClick={nuevoevento}><i className="mr-2 fa fa-plus"></i> Nuevo evento</button>
          <br /><br />
          <div className="card card-primary card-outline text-left">
            <div className="card-header">
              Eventos
            </div>
            <div className="">
              <MaterialReactTable
                columns={Columnevento}
                data={eventoslist.sort(sorter)}
                muiTableProps={{
                  sx: {
                    tableLayout: 'flex'
                  }
                }}
                enableRowActions
                renderDetailPanel={({ row }) => (
                  <Box
                    sx={{
                      display: 'grid',
                      margin: 'auto',
                      gridTemplateColumns: '1fr 1fr',
                      width: '100%',
                    }}
                  >
                    <Typography>Estado : {
                      (moment(row.original.fechaConcierto + " " + row.original.horaConcierto).format('DD MMMM YYYY HH:mm') > moment().format('DD MMMM YYYY HH:mm')) ?
                        row.original.estado : "FINALIZO"} </Typography>
                    <Typography>Ciudad : {row.original.cuidadConcert} </Typography>
                    <Typography>Descripción : {row.original.descripcionConcierto} </Typography>
                  </Box>
                )}
                renderRowActions={({ row }) => (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      color="error"
                      aria-label="Bloquear"
                      onClick={() => successAlert({ id: row.original.id, codigo: row.original.codigoEvento, fecha: row.original.fechaConcierto })}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="Ver"
                      onClick={() => history.push("/admin/Evento/" + row.original.id)}
                    ><Visibility />
                    </IconButton>
                  </Box>
                )}
                positionToolbarAlertBanner="bottom"
                localization={MRT_Localization_ES}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}
export default EventosViews;