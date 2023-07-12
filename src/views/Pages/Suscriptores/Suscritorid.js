import React, { useState, useEffect } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography, Tabs, Tooltip, Tab, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, Summarize } from '@mui/icons-material';
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import { CancelarSubscriptor } from "utils/SuscritorQuery";
import { GetSuscritores } from "utils/SuscritorQuery";
import ModalSuscritoView from "./ModalSuscritor";
import { carrusel } from "../Flasdeticket/imagenstatctic";
let { cedericon } = carrusel
import moment from "moment";
import 'moment-timezone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { EliminarSuscrito } from "utils/SuscritorQuery";
import { columnsTicket } from "utils/ColumnTabla";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { ticketsboletos } from "utils/columnasub";
import { Listarticketporestado } from "utils/userQuery";
import { setdetalle } from "StoreRedux/Slice/SuscritorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { eliminarRegistro } from "utils/pagos/Queripagos";
import { eliminartiket } from "utils/pagos/Queripagos";
import { generaTiketspdf } from "utils/Querycomnet";
import ExportToExcel from "utils/Exportelemin";
import { BoletosTikets } from "utils/userQuery";
import { BoletosTiketsGlobal } from "utils/userQuery";
import { Liverarasiento } from "utils/userQuery";
import { setTabs } from "StoreRedux/Slice/SuscritorSlice";
import ModalTickte from "./ModalSuscritor/agregarTickte";
import axios from "axios";
import { listartecero } from "utils/columnasub";
import { EliminarTickteTercero } from "utils/TicktesT";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";

export const PreciosStore = () => {
  let datos = JSON.parse(sessionStorage.getItem("PreciosLocalidad"))
  if (datos != null) {
    return datos
  } else {
    return []
  }
}
const SuscritoridView = () => {
  let { id } = useParams()
  let history = useHistory()
  let usedispatch = useDispatch()
  // sessionStorage.setItem("Suscritorid", JSON.stringify(row.original))
  let info = JSON.parse(sessionStorage.getItem("Suscritorid"))
  const [spinervi, setSpiner] = useState("d-none")
  const [show, setshow] = useState(false)
  const [alert, setAlert] = React.useState(null)
  const [tiketslist, setTikes] = useState([])
  const [boletos, setBoletos] = useState([])
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
  //console.log(clienteInfo())
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

  const [showdos, setshowdos] = useState(false)


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
    usedispatch(setTabs({ number: newValue }))
    //  setValue(newValue);
  };
  let value = useSelector((state) => state.SuscritorSlice.tabps)

  // const [value, setValue] = React.useState(0);
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
    console.log(info)

    try {
      const data = await GetSuscritores()
      // console.log(data.users.length>0)
      if (data.users.length > 0) {
        const datos = data.users.filter((e) => e.id == id)
        setsuscritor({ ...datos[0] })
        console.log(datos[0].cedula)
        let registro = await listarRegistropanel({ "cedula": info.cedula })
        setTimeout(async function () {
          let tiket = await Listarticketporestado("" + info.cedula)
          console.log(registro)
          if (registro.success) {
            if (tiket.success)
              setTikes(registro.data)
            setBoletos(tiket.data)
          }

        }, 1000)


      }
    } catch (error) {
      console.log(error)
    }
  }
  function abrirModal(e) {
    usedispatch(setModal({ nombre: "confirmar", estado: e }))
  }
  function detalle(e) {
    console.log(e)
    sessionStorage.setItem("Detalleuid", JSON.stringify({ ...e }))
    history.push("/admin/Reporte/" + e.id)
  }
  const canjear = (e) => {
    $.confirm({
      title: 'Canjear boleto!',
      type: 'blue',
      content: '' +
        '<form action="" class="formName">' +
        '<div class="container form-group">' +
        '<label>Ingrese email</label>' +
        '<input  type="text" placeholder="Email" value="' + suscritoid.email + '" class="form-control name" required />' +
        '</div>' +
        '</form>',
      buttons: {
        formSubmit: {
          text: 'Canjear',
          btnClass: 'btn-blue',
          action: function () {
            var name = this.$content.find('.name').val();
            if (!name) {
              $.alert('provide a valid name');
              return false;
            }

            $.alert('Email ' + name);
          }
        },
        cancel: function () {
          //close
        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          // if the user submits the form by pressing enter in the fiel
          console.log(e)
          e.preventDefault();
          jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
      }
    });
  }
  const eliminarss = (e) => {
    $.confirm({
      title: 'Desea eliminar Este boleto # ' + e.sillas + '',
      content: 'De <span class="txt-capitalize"> ' + e.concierto + '</span> en la localidad:  ' + e.localidad + ' ',
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'Eliminar',
          btnClass: 'btn-red',
          action: function () {

          }
        },
        close: function () {
        }
      }
    });

  }
  const eliminarregistro = (parms) => {
    //console.log(parms)

    $.confirm({
      title: 'Desea eliminar Este registro de compra ',
      content: '',
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'Eliminar',
          btnClass: 'btn-red',
          action: function () {

            eliminarRegistro({ "id": parms.id }).then(ouput => {
              console.log(ouput)
              console.log(parms.id)
              if (!ouput.success) { return $.alert("" + ouput.message) }
              window.location.reload()

              $.alert("Registro Eliminado correctamente")

            }).catch(error => {
              $.alert("hubo un error no se pudo eliminar este registro")
            })
          }
        },
        close: function () {
        }
      }
    });

  }
  const eliminarTiket = (parm) => {
  //  console.log(parm)
    $.confirm({
      title: 'Desea eliminar este registro ',
      content: '',
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'Eliminar',
          btnClass: 'btn-red',
          action: function () {
            EliminarTickteTercero({ "id": parm.id }).then(ouput => {
              console.log(ouput)
              console.log(parm.id)
              if (!ouput.success) { return $.alert("" + ouput.message) }              
              //nuevoevento()
              $.alert("Registro eliminado correctamente")
              setTimeout(function(){
                window.location.reload()
              },1000)
              

            }).catch(error => {
              $.alert("hubo un error no se pudo eliminar este registro")
            })
          }
        },
        close: function () {
        }
      }
    });

  }
  function generaPDF(row) {
    // console.log(row)
    //window.open("https://tickets.com.ec/", "_blank");
    generaTiketspdf({
      "cedula": row.cedula,
      "codigoEvento": row.codigoEvento,
      "id_ticket_usuarios": row.id
    }).then(ouput => {
      console.log(ouput)
      //window.open('Prosjektplan.pdf')
      window.open(ouput.link, "_blank");
      console.log(ouput)
    }).catch(eror => {
      console.log(eror)
    })
  }
  const Eliminara = (parm) => {
    console.log(parm)
    $.confirm({
      title: 'Desea eliminar este boleto ',
      content: '',
      type: 'red',
      typeAnimated: true,
      buttons: {
        tryAgain: {
          text: 'Eliminar',
          btnClass: 'btn-red',
          action: function () {
            eliminartiket([parm]).then(ouput => {
              // console.log(ouput)

              if (ouput.success) {
                console.log(ouput)
                window.location.reload()
                //setTikes(ouput.data)
              }
              if (!ouput.success) {
                return $.alert("" + ouput.message)
              }

            }).catch(error => {
              console.log(error)
              $.alert("hubo un error no se pudo eliminar este registro")
            })
          }
        },
        close: function () {
        }
      }
    });

  }
  const Licerarrasientos = (parms) => {
    $.confirm({
      title: 'Liberar asiento',
      type: 'blue',
      content: '',
      buttons: {
        formSubmit: {
          text: 'Aceptar',
          btnClass: 'btn-blue',
          action: function () {
            Liverarasiento(parms).then(ouput => {
              if (ouput.success) {
                window.location.reload()
                return
              }
              $.alert("No se registro")


            }).catch(err => {

            })


          }
        },
        cancel: function () {
          //close
        },
      },
    });


  }
  let precio = {
    1: 21,
    2: 31,
    3: 41.5,
    4: 51.5,
    5: 82,
    9: 122,
    10: 67,
    11: 36,
    12: 122,
    13: 67,
    14: 36,
  }
  let localidades = {
    1: "General",
    2: "Preferencia",
    3: "Butacas",
    4: "Butacas VIP",
    5: "Ranchenato BOX",
    9: "SEN2 KBRN-G",
    10: "SAUCES BOYZ-G",
    11: "TODO O NADA-G",
    12: "SEN2 KBRN-Q",
    13: "SAUCES BOYZ-Q",
    14: "TODO-O-NADA-Q",
  }
  function LocalidadPrecio(evento, localidad) {
    if (localidad == 9) {
      return "SEN2 KBRN Guayaquil"
    }
    if (localidad == 10) {
      return "SAUCES BOYZ Guayaquil"
    }
    if (localidad == 11) {
      return "TODO O NADA Guayaquil"
    }
    if (localidad == 12) {
      return "SEN2 KBRN Quito"
    }
    if (localidad == 13) {
      return "SAUCES BOYZ Quito"
    }
    if (localidad == 14) {
      return "TODO-O-NADA Quito"
    }
    return PreciosStore().filter(f => f.id == evento)[0].localidad
  }
  function ListarPrecio(evento, localidad) {
    if (localidad == 9) {
      return precio[9]
    }
    if (localidad == 10) {
      return precio[10]
    }
    if (localidad == 11) {
      return precio[11]
    }
    if (localidad == 12) {
      return precio[12]
    }
    if (localidad == 13) {
      return precio[13]
    }
    if (localidad == 14) {
      return precio[14]
    }
    return PreciosStore().filter(f => f.id == evento)[0].precio_normal
  }
  function ListarComision(evento, localidad) {
    if (localidad == 9) {
      return 2
    }
    if (localidad == 10) {
      return 2
    }
    if (localidad == 11) {
      return 1
    }
    if (localidad == 12) {
      return 2
    }
    if (localidad == 13) {
      return 2
    }
    if (localidad == 14) {
      return 1
    }
    return parseFloat(PreciosStore().filter(f => f.id == evento)[0].comision_boleto)
  }
  const [global, setGlobal] = useState([])
  const Listarfaci = async (parms) => {
    try {
      let { data } = await axios.post("https://api.t-ickets.com/ms_login/get_link_external_tickets", parms, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
      })
      return data
    } catch (error) {
      return error
    }
  }
  const [tikesele, setTicket] = useState([])
  useEffect(() => {
    setsuscritor({ ...info })
    Listarticketporestado("" + info.cedula).then(ouput => {
      console.log(ouput)
      ouput.success ? setBoletos(ouput.data)
        : ""
    }).catch(err => {
      console.log(err)
    })
    listarRegistropanel({ "cedula": info.cedula }).then(ouput => {
      console.log(ouput)
      if (ouput.success) {
      let datos = ouput.data
      //console.log(datos)
      ouput.success ? setTikes(datos) : ""}
    })
    Listarfaci({ "cedula": info.cedula }).then(ouput => {
      if (ouput.success) {
      //  console.log(ouput)
        setTicket([...ouput.data])
      }
      //console.log(ouput)
    }).catch(err => {
      console.log(err)
    })

    /*BoletosTiketsGlobal(""+info.cedula).then(ouput=>{
      if(!ouput.success) return
      setGlobal(ouput.data.filter(e.cedula =="1726979659"))
      console.log(ouput)
    }).catch(err=>{
      console.log(err)
    })*/

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
           {/* <Button className="btn btn-wd btn-outline mr-1"
              type="button"
              variant="outline-warning"
              onClick={() => setshowdos(true)}
            >Ticktefacil</Button>*/}
            {clienteInfo().perfil == "vendedores"?"": <Button className="btn-wd btn-outline mr-1"
              onClick={deleteAlert}
              type="button"
              variant="danger">
              <span className="btn-label">
                <i className="fas fa-trash"></i>
              </span>
              Eliminar
            </Button>}
            {clienteInfo().perfil == "vendedores" ? "" : <Button className="btn-wd btn-outline mr-1"
              onClick={successAlert}
              type="button"
              variant={suscritoid.enable == 0 ? "danger" : "success"}>
              <span className="btn-label">
                <i className="fas fa-trash"></i>
              </span>
              {suscritoid.enable == 0 ? " Cancelar Suscripción " : "Habilitar Suscripción"}
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
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Boletos</p>
                      <Card.Title as="h4">{boletos.length}</Card.Title>
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
                      <Card.Title as="h4">${tiketslist.map(e => { return parseFloat(e.Valortotal) }).reduce((a, b) => a + b, 0)}</Card.Title>
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
                     
                      <p className="card-category">{suscritoid ? suscritoid.cedula : ''} </p>
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

        <ModalConfima />
        <div className="">
          <div className='container-fluid row p-0'>
            <div className="col-10">
              <ExportToExcel apiData={tiketslist} fileName={"Todos Boletos"} />
            </div>
            <Tabs value={value} onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab className="" label={"Registro: " + tiketslist.length}{...a11yProps(0)} />
              <Tab className="" label={"Registro tercero: " + tikesele.length} {...a11yProps(1)} />
              <Tab className="d-none" label={"Registro Pagados: " + tiketslist.filter(e => e.estado_pago == "Pagado").length} {...a11yProps(2)} />
              <Tab label={"Tickets: " + boletos.length} {...a11yProps(3)} />
            </Tabs>
            <div className=" text-center  py-2  ">
              {/** pendientes*/}
              <TabPanel value={value} index={0} className="text-center" >
                <MaterialReactTable
                  columns={listaRegistro}
                  data={tiketslist}
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
                            onClick={() => abrirModal(row.original)}
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

                      <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => detalle(row.original)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      {clienteInfo().perfil == "vendedores" ? "" : <Tooltip
                        title="Eliminar"
                        placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => eliminarregistro(row.original)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>}
                    </Box>
                  )}

                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              {/** expirado */}
              <TabPanel value={value} index={1} className="text-center">
                <MaterialReactTable
                  columns={listartecero}
                  data={tikesele}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    clienteInfo().perfil == "vendedores" ? "" :  <Box sx={{ display: 'flex' }}>
                      
                      <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="success"
                          //onClick={() => detalle(row.original)}
                        >
                          <a 
                            href={row.original.link_external}
                            target="_blank"
                          >
                            <Visibility /></a>
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Eliminar"
                        placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => eliminarTiket(row.original)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              {/** pagados */}
              <TabPanel value={value} index={2} className="text-center">

                <MaterialReactTable
                  columns={listaRegistro}
                  data={tiketslist}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'flex'
                    }
                  }}
                  enableRowActions
                  positionActionsColumn="first"
                  renderRowActions={({ row }) => (
                    clienteInfo().perfil == "vendedores" ? "" : <Box sx={{ display: 'flex' }}>
                      {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                        <Tooltip title="Reportar" placement="top">
                          <IconButton
                            color="error"
                            aria-label="Bloquear"
                            onClick={() => abrirModal(row.original)}
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
                      <Tooltip
                        title="Comprobar" placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => detalle(row.original)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title="Cambiar a Tarjeta"
                        placement="top"
                      >
                        <IconButton
                          color="error"
                        >
                          <a
                            className="border  btn-default btn-sm">
                            <img src={cedericon}
                              style={
                                {
                                  height: 20
                                }
                              }
                            />
                          </a>
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Eliminar"
                        placement="top"
                      >
                        <IconButton
                          color="error"
                          onClick={() => eliminarregistro(row.original)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  localization={MRT_Localization_ES}
                />
              </TabPanel>
              {/** boletos  */}
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
                    clienteInfo().perfil == "vendedores" ? "" :  <Box sx={{ display: 'flex' }}>

                      <div className=" btn-group  " >
                        {row.original.estado != "reservado" ?
                          <Tooltip className="" title="Ver Ticket" placement="top">
                            <a
                              className=" border  btn-default btn-sm"

                              onClick={() => generaPDF(row.original)}
                            >
                              <i className="fa fa-download text-primary"></i>


                            </a>
                          </Tooltip> :
                          <a
                            className="border  btn-default btn-sm btn-disable"
                            disabled

                          >
                            <i className="fa fa-download "></i>


                          </a>
                        }

                        <a
                          onClick={() => Eliminara(row.original.id)}
                          className="border  btn-default btn-sm cursor "


                        >
                          Eliminar
                        </a>
                        <a
                          onClick={() => Licerarrasientos(row.original.id)}
                          className="border  btn-default btn-sm cursor "
                        >
                          Liberar


                        </a>

                        {/*row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? 
                        <Tooltip title="Ceder ticket" placement="top-start">
                          <a className=" btn btn-default btn-sm btn-disable"


                            onClick={() => console.log(row.original)}
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
                            className="border  btn-default btn-sm btn-disable"
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

                        */}


                        {false ? <Tooltip
                          title="Canjear"
                          placement="top"
                        >
                          <a
                            className="border  btn-default btn-sm "
                            onClick={() => canjear(row.original)}

                          >
                            <i className="fa fa-check-circle text-success" aria-hidden="true"></i>


                          </a>
                        </Tooltip> : ""
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


      </div>
      <div className="d-flex   justify-content-end">


        <div className="   d-flex justify-content-end align-items-end p-3"
          style={{

            widows: 50
          }}
        >
          <a className=" rounded-circle btn-primary p-2 text-white"
            onClick={() => history.goBack()}
          >
            <i className=" fa fa-arrow-left"></i>
          </a>

        </div>
      </div>
      <ModalSuscritoView
        show={show}
        setshow={setshow}
        estado={"update"}
        datosperson={suscritoid} />
      {!showdos ?"": <ModalTickte
        shows={showdos}
        setshows={setshowdos}
        estado={"update"}
        datosperson={suscritoid}
      />}
      <div className={spinervi}
        style={{
          display: 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }}
      >

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '10px',
        }}>
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          <h4 className='text-light'>Cargando  evento  ...</h4>


        </div>
      </div>

    </>

  )

}
export default SuscritoridView;