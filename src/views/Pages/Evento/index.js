import React, { useEffect, useState } from "react";
import { Card, Col, Row, Modal } from "react-bootstrap";
import ModalNewEvento from "./MODAL/ModalnewEvento";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { ListarLocalidad, ListarEspacios, ListarEventos } from "utils/Querypanel.js";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Columnevento } from "utils/ColumnTabla";
import { EliminarEvento } from "utils/Querypanel";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
import { ListaPreciosEvent } from "utils/EventosQuery";
require('moment/locale/es.js')

const EventosViews = () => {
  let history = useHistory()
  let dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [eventoslist, setEventos] = useState([])
  const [alert, setAlert] = React.useState(null)
  const sorter = (a, b) => a.id > b.id || new Date(a.fechaConcierto) < new Date(b.fechaConcierto) ? 1 : -1;

  function nuevoevento() {
    setShow(true)
  }
  async function GetEventos() {
    try {
  
      const lista = await ListarEventos("PROCESO")
      if (lista.success) {
        setEventos([...lista.data.filter((e) => e.codigoEvento != "001")])
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function Elimna(e) {
    let { codigo, fecha } = e
    var f1 = new Date(fecha);
    var fhoy = new Date();
    if (false) {
      hideAlert()
      dispatch(setToastes({ show: true, message: 'El evento ya no se puede elimnar', color: 'bg-danger', estado: 'Error' }))
    }
    else
      try {
        const elimina = await EliminarEvento(codigo)
        const lista = await ListarEventos("PROCESO")
        if (elimina.success) {
          setEventos([...lista.data])
          successDelete()
          dispatch(setToastes({ show: true, message: 'Evento Eliminado con éxito', color: 'bg-success', estado: 'Correcto' }))
        }
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
  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Eliminado!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success">
        El evento se elimino correctamenta
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
  const ListaPrecios = async () => {
    const info = await ListaPreciosEvent();
    console.log(info)
    //ListaPrecio()
    return info
  }
  useEffect(() => {
    
    (async () => {
      await ListaPrecios()
      await GetEventos()
    })()
  }, [show])
  return (
    <div className="container-fluid">
      {alert}
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
                      onClick={() => successAlert({ codigo: row.original.codigoEvento, fecha: row.original.fechaConcierto })}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="Ver"
                      onClick={() => history.push("/admin/Evento/" + row.original.codigoEvento)}
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
      <ModalNewEvento
        show={show}
        Setshow={setShow}
      />
    </div>
  )

}
export default EventosViews;