import React, { useState, useEffect } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography, Tabs, Tooltip, Tab, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, Summarize } from '@mui/icons-material';
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import { CancelarSubscriptor, GetSuscritores } from "utils/Querypanel";
import ModalSuscritoView from "./ModalSuscritor";
import { carrusel } from "../Flasdeticket/imagenstatctic";
let { cedericon }= carrusel
import moment from "moment";
import 'moment-timezone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { EliminarSuscrito } from "utils/Querypanel";
import { columnsTicket } from "utils/ColumnTabla";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { ticketsboletos } from "utils/columnasub";
import { Listarticketporestado } from "utils/userQuery";
const SuscritoridView = () => {
  let { id } = useParams()
  let history = useHistory()
  const [show, setshow] = useState(false)
  const [alert, setAlert] = React.useState(null)
  const [tiketslist, setTikes] = useState([])
  const [boletos,setBoletos]=useState([])
  const [suscritoid, setsuscritor] = useState({
    ciudad: "",
    email: "",
    enable: 0,
    fechaCreacion: "",
    id: 0,
    movil: "",
    nombreCompleto: ""
  })
  async function Eliminasucrito() {
    try {
      if (suscritoid.email != '') {
        const cancelar = await CancelarSubscriptor(suscritoid.email)
        const { success } = cancelar
        //console.log(cancelar)
        if (success) {
          history.push("/admin/suscritor")
        }
      }
    } catch (error) {
      hideAlert()
      console.log(error)
    }

  }
  async function EliminarS() {
    try {
      const deleter = await EliminarSuscrito(id)
      const { success } = deleter
      console.log(success)
      if (success) {
        history.push("/admin/suscritor")
      }

    } catch (error) {
      console.log(error)

    }
  }
  const successAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Eliminasucrito()}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel
      >
        Esta seguro de {suscritoid.enable == 0 ? " Cancelar Suscripción " : "Habilitar Suscripción"}
      </SweetAlert>
    );
  };
  const deleteAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => EliminarS()}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel>
        Esta seguro de Eliminar  al Suscritor
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
        El suscritor se elimino correctamenta
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            <span>{children}</span>
          </div>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const nuevoevento = async () => {
    try {
      const data = await GetSuscritores()
      // console.log(data.users.length>0)
      if (data.users.length > 0) {
        const datos = data.users.filter((e) => e.id == id)
        setsuscritor({ ...datos[0] })
        //console.log(datos[0].cedula)
        let registro = await listarRegistropanel({ "cedula": datos[0].cedula })
        let tiket = await Listarticketporestado(datos[0].cedula)
        if (registro.success && tiket.success){
          setTikes(registro.data)
          setBoletos(tiket.data)
          //console.log(tiket)
        }
        //console.log(registro)
        // console.log(datos[0])
        // setTikes(data.users)

      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    (async () => {
      await nuevoevento()
    })()

  }, []);
  return (
    <>
      {alert}
      <div className="container-fluid">
        <div className="d-flex justify-content-end align-row.originals-end pb-2" >
          <div>
            <Button className="btn btn-wd btn-outline mr-1"
              type="button"
              onClick={() => setshow(true)}
              variant="success">
              <span className="btn-label">
                <i className="fas fa-edit"></i>
              </span>
              Editar
            </Button>
            <Button className="btn-wd btn-outline mr-1"
              onClick={deleteAlert}
              type="button"
              variant="danger">
              <span className="btn-label">
                <i className="fas fa-trash"></i>
              </span>
              Eliminar
            </Button>
            <Button className="btn-wd btn-outline mr-1"
              onClick={successAlert}
              type="button"
              variant={suscritoid.enable == 0 ? "danger" : "success"}>
              <span className="btn-label">
                <i className="fas fa-trash"></i>
              </span>
              {suscritoid.enable == 0 ? " Cancelar Suscripción " : "Habilitar Suscripción"}
            </Button>
          </div>
        </div>
        <Row>
          <Col lg="3" sm="6" >
            <Card className="card-stats ">
              <Card.Body>
                <Row className="">
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Boletos</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-music mr-1"></i>
                  Boletos
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
                      <i className="nc-icon nc-cart-simple text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Compras</p>
                      <Card.Title as="h4">$0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Total Compras
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="6" sm="12">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xl="6" xs="6">
                    <div className="">
                      <Card.Title as="h4">Suscritor </Card.Title>
                      <p className="card-category">
                        {suscritoid ? suscritoid.nombreCompleto : ''}</p>

                    </div>
                  </Col>
                  <Col xl="5" xs="6">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>
                    {/* <Button                                         
                    variant="danger"                   
                    className="text-danger  like">
                    <i className="fa fa-trash" />
                     Eliminar suscriptor
                    </Button>
                  </Col>
                  <Col  xl="3" xs="6">
                  <Button
                   variant="danger"
                   onClick={successAlert}
                   className="text-danger  like">
                    <i className="fa fa-trash" />
                     Cancelar suscriptor
                    </Button> */}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock mr-1"></i>
                  Fecha de registro {moment(suscritoid.fechaCreacion).format('DD MMMM YYYY hh:mm:ss')}
                </div>
              </Card.Footer>

            </Card>
          </Col>

        </Row>

        <div className="">
          <div className='container-fluid row p-0'>
            <Tabs value={value} onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab className="" label="Registro pendientes "{...a11yProps(0)} />
              <Tab label="Registro expirado" {...a11yProps(1)} />
              <Tab label="Registro Pagados" {...a11yProps(2)} />
              <Tab label="Tickets" {...a11yProps(3)} />
            </Tabs>
            <div className=" text-center  py-2  ">

              <TabPanel value={value} index={0} className="text-center" >
                <MaterialReactTable
                  columns={listaRegistro}
                  data={tiketslist.filter(e => e.estado_pago =="Pendiente")}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>
                      {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                        <Tooltip title="Reportar" placement="top">
                          <IconButton
                            color="error"
                            aria-label="Bloquear"
                            onClick={() => abrirModal(row)}
                          >
                            <Summarize />
                          </IconButton>
                        </Tooltip> : <IconButton
                          disabled={true}
                          color="error"
                          aria-label="Consolidar"

                        >
                          <Summarize />
                        </IconButton>}
                      { row.original.forma_pago == "Deposito" && row.original.link_comprobante == null ? <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => detalle(row.original)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip> : ""}
                    </Box>
                  )}

                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              <TabPanel value={value} index={1} className="text-center">
                <MaterialReactTable
                  columns={listaRegistro}
                  data={tiketslist.filter(e => e.estado_pago == "Expirado")}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>
                      {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                        <Tooltip title="Reportar" placement="top">
                          <IconButton
                            color="error"
                            aria-label="Bloquear"
                            onClick={() => abrirModal(row)}
                          >
                            <Summarize />
                          </IconButton>
                        </Tooltip> : <IconButton
                          disabled={true}
                          color="error"
                          aria-label="Consolidar"

                        >
                          <Summarize />
                        </IconButton>}
                      {row.original.forma_pago == "Deposito" && row.original.link_comprobante == null ? <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => detalle(row.original)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip> : ""}
                    </Box>
                  )}
                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              <TabPanel value={value} index={2} className="text-center">
                <MaterialReactTable
                  columns={listaRegistro}
                  data={tiketslist.filter(e => e.estado_pago == "Pagado")}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>
                      {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                        <Tooltip title="Reportar" placement="top">
                          <IconButton
                            color="error"
                            aria-label="Bloquear"
                            onClick={() => abrirModal(row)}
                          >
                            <Summarize />
                          </IconButton>
                        </Tooltip> : <IconButton
                          disabled={true}
                          color="error"
                          aria-label="Consolidar"

                        >
                          <Summarize />
                        </IconButton>}
                      {row.original.forma_pago == "Deposito" && row.original.link_comprobante == null ? <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => detalle(row.original)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip> : ""}
                    </Box>
                  )}
                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              <TabPanel value={value} index={3} className="text-center">
                <MaterialReactTable 
                columns={ticketsboletos}
                  data={boletos}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>

                      <div className=" btn-group  " >
                        {row.original.estado != "reservado" && row.original.pdf != null && row.original.link == "SI" ?
                          <Tooltip className="" title="Ver Ticket" placement="top">
                            <a
                              className=" btn btn-default btn-sm"

                              href={row.original.pdf}
                              target="_black"
                            >
                              <i className="fa fa-download "></i>


                            </a>
                          </Tooltip> :
                          <a
                            className=" btn btn-default btn-sm btn-disable"
                            disabled

                          >
                            <i className="fa fa-download "></i>


                          </a>
                        }
                        {row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                          <a className=" btn btn-default btn-sm"


                            onClick={() => successAlert(row.original)}
                          >
                            <img src={cedericon}
                              style={
                                {
                                  height: 20
                                }
                              }
                            />
                          </a>
                        </Tooltip> :
                          <a
                            className=" btn btn-default btn-sm btn-disable"
                            disabled

                          >
                            <img src={cedericon}
                              style={
                                {
                                  height: 20
                                }
                              }
                            />


                          </a>
                        }




                      </div>
                    </Box>
                  )}
                  localization={MRT_Localization_ES}
                />

              </TabPanel>
            </div>
          </div>
        </div>

        <div className="row d-none">
          <div className="col-md-12">
            <div className="card card-primary card-outline text-left">
              <div className="card-header mb-1">
                Tickets
              </div>
              <MaterialReactTable
                columns={columnsTicket}
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
              {/*  <div className="card-body table-responsive">

                                                    <table className="table table-hover text-center ">
                                                            <thead>
                                                                <tr>
                                                                <th scope="col">Concierto</th>
                                                                    <th scope="col">Cantidad</th>
                                                                    
                                                                    <th scope="col">Localidad</th>
                                                                    <th scope="col">Valor</th>
                                                                    <th scope="col">Estado</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                suscritores.length>0?
                                                                suscritores.map((e,i)=>{
                                                                    return(
                                                                    <tr>
                                                                    <th scope="row">{e.concierto}</th>
                                                                    <td>{e.cantidad}</td>
                                                                    <td>{e.valor}</td>
                                                                    
                                                                    <td> {e.localidad} </td>
                                                                    <td><span className="badge me-1 bg-success text-white">{e.estado}</span></td>
                                                                    <td>
                                                                    <a className="btn btn-primary btn-sm mx-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                                    <a className="btn btn-primary btn-sm mx-1"  data-toggle="tooltip" title="Enviar"><i className="fa fa-paper-plane"></i></a> 
                                                            
                                                                    </td>
                                                                </tr>
                                                                    )
                                                                }): 
                                                                <tr>
                                                                <th scope="row"></th>
                                                                <th scope="row"></th>
                                                                <td >No hay datos</td>
                                                                <th scope="row"></th>
                                                                <th scope="row"></th> 
                                                                <th scope="row"></th>
                                                            </tr>
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>*/}
            </div>
          </div>
        </div>

      </div>
      <ModalSuscritoView
        show={show}
        setshow={setshow}
        estado={"update"}
        datosperson={suscritoid} />
    </>
  )

}
export default SuscritoridView;