import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import Modalregistroespacio from "./MODAL/Registrolocalidad.js";
import { EliminarEspacios, ListarEspacios } from "utils/EspaciosQuery/index.js";
import { Row, Col, Card } from "react-bootstrap";
import NewEspacioView from "./MODAL/NuevoEspacio.js";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import RegistroViwstab from "./MODAL/Registrodos.js";
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
import { EliminarLocalidad } from "utils/Querypanel.js";
import { columns } from "utils/ColumnTabla.js";

const EventosViews = () => {
  const [localidaname, setLocalidad] = useState({ id: '', nombre: '', descripcion: '' })
  const [estado, SetEstado] = useState("")
  const [alert, setAlert] = React.useState(null)
  const [show, setShowToast] = useState(false)
  const [showNuevo, SetShownuev] = useState(false)
  const [listaEsp, setListaEspa] = useState([])

  function AgregasSillasMesa(e) {
    setLocalidad(e)
    sessionStorage.removeItem("mapa")  
    setShowToast(true)
  }
  async function Lista() {
    const cargarLista = await ListarEspacios()
    const { success, data } = cargarLista
    if (success) {
      console.log(data)
      setListaEspa(data)
    }
  }
  async function Elimnar(e) {
    try {
      const listar = await ListarLocalidad()
      if (listar.data.length) {
        listar.data.filter((a) => a.espacio == e.nombre).map(async (element) => {
          await EliminarLocalidad(element.id)
        });
        const elimonado = await EliminarEspacios(e.id)
        if (elimonado.success) {
          await Lista()
          hideAlert()
        }
      }
      else {
        const elimonado = await EliminarEspacios(e.id)
        if (elimonado.success) {
          await Lista()
          hideAlert()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  function Editar(e, estado) {
    SetEstado(estado)
    setLocalidad({ ...e })
    SetShownuev(true)
  }


  useEffect(() => {
    (async () => {
      await Lista()

    })()


  }, [showNuevo, show])
  const successAlert = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Elimnar(e)}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel
      >Esta seguro de eliminar este Espacio
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

  const hideAlert = () => {
    setAlert(null);
  };


  return (
    <div className="container-fluid">
      {alert}
      <Row className="d-none" >
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




        <div>
        </div>
        <div className="col-md-12">
          <button className="btn btn-success" onClick={() => Editar({ id: '', nombre: '', description: '' }, "")} ><i className="mr-2 fa fa-plus"></i> Nuevo espacio  </button>


          <br /><br />

          <div className="card card-primary card-outline text-left">
            <div className="card-header pb-3">
              Eventos
            </div>
            <div className="">


              <MaterialReactTable
                columns={columns}
                data={listaEsp}
                initialState={
                  {
                    columnVisibility: { id: false }
                  }
                }
                muiTableBodyProps={{
                  sx: { columnVisibility: { id: false } }
                }}
                enableRowActions
                renderRowActions={({ row }) => (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      color="primary"
                      onClick={() => AgregasSillasMesa(row.original)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => Editar(row.original, "update")}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => successAlert(row.original)}
                    >
                      <Delete />
                    </IconButton>

                  </Box>
                )}



                localization={MRT_Localization_ES}

              />

            </div>
          </div>
        </div>
      </div>
      <RegistroViwstab
        show={show}
        setShowToast={setShowToast}
        localidaname={localidaname}
      />
      <NewEspacioView
        showNuevo={showNuevo}
        localidaname={localidaname}
        estado={estado}
        SetShownuev={SetShownuev}
      />
    </div>

  )
}
export default EventosViews