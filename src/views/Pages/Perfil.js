import React, { useEffect, useState } from "react";
import { getCliente } from "utils/DatosUsuarioLocalStorag";
import { DatosUsuariocliente } from "utils/constantes";
import moment from "moment";
import 'moment-timezone'
import { CancelarSubscriptor } from "utils/SuscritorQuery/index.js";
import { EditarSuscrito } from "utils/SuscritorQuery/index.js";
import { DatosUsuarioLocalStorang } from "utils/constantes";
import { useDispatch, useSelector } from "react-redux";
import { deletesuscrito, addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { GetSuscritores } from "utils/SuscritorQuery/index.js";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Badge, Tooltip } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
import { PickersDay } from "@mui/x-date-pickers";
import TextField from '@mui/material/TextField';
// react component used to creat
// react-bootstrap components
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate() + 2;
import SweetAlert from 'react-bootstrap-sweetalert';
// react-bootstrap components
import {
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { display } from "@mui/system";
import { Button } from "@mui/material";
import { cargarEventoActivo } from "utils/Querypanelsigui";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { buscarcliente } from "utils/Querypanelsigui";

function PerfilPage(props) {
  const { setDatoToas } = props
  const usedispatch = useDispatch()
  const userauthi = useSelector((state) => state.SuscritorSlice)
  const [alert, setAlert] = React.useState(null)
  const [validate, setValidate] = useState("")
  const [value, setValue] = React.useState(Date(y, m, d));
  const [Eventos, setEventos] = useState([])
  const [datosPersons, setPerson] = useState({
    cedula: '',
    direccion: '',
    whatsapp: '',
    telefono: '',
    name: '',
    email: '',
    hora: '',
    enable: 0,
    id: 0,
    new_password: ''
  })

  function handelchange(e) {
    setPerson({
      ...datosPersons,
      [e.name]: e.value
    })

  }
  async function Eliminasucrito() {
    try {
      if (datosPersons.email != '') {
        const cancelar = await CancelarSubscriptor(datosPersons.email)
        const datos = await GetSuscritores()
        const { success } = cancelar
        // console.log(cancelar)
        if (success) {
          const dato = datos.users.filter((e) => e.id == datosPersons.id)
          let users = { ...datosPersons, enable: dato[0].enable }
          var msg = dato[0].enable != 0 ? 'se Cancelo' : 'se Habilito'
          setPerson({ ...users })
          usedispatch(addususcritor({ users }))
          sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
          hideAlert()
          setDatoToas({
            show: true,
            message: "Suscripción actualizada con éxito, " + msg,
            color: 'bg-success',
            estado: 'Actualizado',
          })
        }
      }
    } catch (error) {
      setDatoToas({
        show: true,
        message: 'Hubo un error, verifique su conexión o intente mas tarde',
        color: 'bg-danger',
        estado: 'Error',
      })
      console.log(error)
    }
  }
  async function Actualizar() {
    let Datos = {
      "nombreCompleto": datosPersons.name,
      "email": datosPersons.email,
      "new_password": datosPersons.new_password,
      "movil": datosPersons.whatsapp,
      "ciudad": datosPersons.direccion
    }
    if (datosPersons.new_password.length < 6) {
      setValidate("was-validated")
      return
    }
    try {
      setValidate("")
      const editar = await EditarSuscrito(datosPersons.id, Datos)
      console.log(Datos)
      const { success } = editar
      if (success) {
        usedispatch(addususcritor({ datosPersons }))
        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(datosPersons))
        setDatoToas({
          show: true,
          message: 'Datos actualizados con éxito',
          color: 'bg-success',
          estado: 'Actualizado',
        })
      }
    } catch (error) {
      setDatoToas({
        show: true,
        message: 'Hubo un error, verifique su conexión o intente mas tarde',
        color: 'bg-danger',
        estado: 'Error',
      })
      //console.log("Error al Actualizar-->", error)
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
        Esta seguro de cancelar su suscripción
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

  const evento = async () => {
    try {
      const data = await cargarEventoActivo("ACTIVO")
      const filtro = data != null ? data.filter((e) => new Date(e.fechaConcierto + " 23:59:59") > new Date()) : []
      const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
      if (data != null) {
        // console.log(filtro.sort(sorter))
        setEventos(filtro.sort(sorter))
      }
      else if (data == null) setEventos([])
    } catch (error) {
      console.log(error)
    }
  } 
  function obtener(cedula){

    let informacion = {
      "cedula": cedula,
      "email": ""
    }
   // history.push("/admin")
    buscarcliente({ ...informacion }).then(output=>{
      console.log(output)
      if(output.success){
        setPerson({ ...output.data, whatsapp: output.data.movil, direccion: output.data.ciudad ? output.data.ciudad :"",name:output.data.nombreCompleto, new_password: ''})
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(() => {
   // let da = getDatosUsuariosLocalStorag()
  // console.log(da)
    // obtener(da.cedula)
    (async () => {

      let info = getDatosUsuariosLocalStorag()
      obtener(info.cedula)
     /* try {
        const suscrito = await GetSuscritores()
        console.log()
        const dato = suscrito.users.filter((e) => e.cedula == info.cedula)
        //  console.log(info, suscrito)
        setPerson({ ...info, new_password: '', enable: dato[0].enable })
        // console.log({...info,new_password:'',enable:dato[0].enable})
        //console.log(dato)
      } catch (error) {
        console.log(error)

      }*/
      await evento()
    })()



  }, [])
  return (
    <>

      <Container fluid className="px-0">
        {alert}
        <div className="section-image" >
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row className="d-flex justify-content-center">
              <Col lg="6" md="12" sm="12">
                <Row>
                  <Col lg="12" sm="12">
                    <Card className="card-stats">
                      <Card.Body>
                        <Row>
                          <Col xl="8" xs="8">
                            <div className="">
                              <Card.Title as="h5">Bienvenido </Card.Title>
                              <p className="card-category" >
                                {datosPersons ? datosPersons.name : ''}</p>

                            </div>
                          </Col>
                          <Col xs="4">
                            <div className="icon-big text-center ">
                              <i className="nc-icon nc-satisfied text-danger"></i>
                            </div>
                          </Col>


                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <hr></hr>
                        <div className="stats" >
                          <i className="far fa-clock mr-1"></i>
                          {moment(datosPersons.hora).format('DD MMMM YYYY hh:mm')}
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col lg="6" sm="12" >
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
                          Total Boletos
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                  <Col lg="6" sm="12">
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


                </Row>

              </Col>
              <Col lg="4" sm="12">
                <Card className="card-stats d-none d-sm-none d-md-block" >
                  <LocalizationProvider dateAdapter={AdapterMoment} >
                    <StaticDatePicker

                     
                      label={"Nuevos Eventos"}
                      openTo="day"
                      value={value}
                      minDate={new Date()}
                      hideTabs={false} componentsProps={{
                        actionBar: {
                          actions: [''],
                        },
                      }}
                      minDateTime={today}
                      renderDay={(day, value, DayComponentProps) => {
                        // console.log(moment(DayComponentProps.key).format('MM/DD/YYYY'))
                        const isDate = Eventos.some(event => moment(event.fechaConcierto).format('MM/DD/YYYY') === moment(DayComponentProps.key).format('MM/DD/YYYY'));
                        const info = Eventos.find(event => moment(event.fechaConcierto).format('MM/DD/YYYY') === moment(DayComponentProps.key).format('MM/DD/YYYY'))
                        //console.log(day.toString())

                        return (

                          <Tooltip key={day.toString()} title={isDate ? info.nombreConcierto : 'sin evento'} placement="top">
                            <Badge
                              overlap="circular"
                              badgeContent={isDate ? '' : ''}
                            >

                              <PickersDay {...DayComponentProps} />
                              <span hidden={!isDate} className="position-absolute bottom-0 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                              </span>

                            </Badge>
                          </Tooltip>

                        )

                      }

                      }
                      // shouldDisableDate={isWeekend}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}

                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                </Card>
                <Card className="card-stats d-block d-sm-block d-md-none" style={{ maxHeight: '510px' }} >
                  <LocalizationProvider dateAdapter={AdapterMoment} >
                    <StaticDatePicker

                     
                      label={"Nuevos Eventos"}
                      openTo="day"
                      value={value}
                      minDate={new Date()}
                      hideTabs={false} componentsProps={{
                        actionBar: {
                          actions: [''],
                        },
                      }}
                      minDateTime={today}
                      renderDay={(day, value, DayComponentProps) => {
                        // console.log(moment(DayComponentProps.key).format('MM/DD/YYYY'))
                        const isDate = Eventos.some(event => moment(event.fechaConcierto).format('MM/DD/YYYY') === moment(DayComponentProps.key).format('MM/DD/YYYY'));
                        const info = Eventos.find(event => moment(event.fechaConcierto).format('MM/DD/YYYY') === moment(DayComponentProps.key).format('MM/DD/YYYY'))
                        //console.log(day.toString())

                        return (

                          <Tooltip key={day.toString()} title={isDate ? info.nombreConcierto : 'sin evento'} placement="top">
                            <Badge
                              overlap="circular"
                              badgeContent={isDate ? '' : ''}
                            >

                              <PickersDay {...DayComponentProps} />
                              <span hidden={!isDate} className="position-absolute bottom-0 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                              </span>

                            </Badge>
                          </Tooltip>

                        )

                      }

                      }
                      // shouldDisableDate={isWeekend}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}

                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                </Card>

              </Col>
            </Row>

            <Row className="d-flex justify-content-center">
              <Col md="12" sm="12" xl="8">

                <Card>
                  <Card.Header>
                    <Card.Header>
                      <Card.Title as="h4">DATOS PERSONALES </Card.Title>
                    </Card.Header>
                  </Card.Header>
                  <Card.Body>
                    <form className={validate}>
                      <Row>
                        <Col className="p-2" md="12">
                          <Form.Group>
                            <label>Nombres</label>
                            <Form.Control
                              placeholder="name"
                              required
                              value={datosPersons.name}
                              onChange={(e) => handelchange(e.target)}
                              name="name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Cédula </label>
                            <Form.Control
                              required
                              placeholder=""
                              disabled
                              value={datosPersons.cedula}
                              onChange={(e) => handelchange(e.target)}
                              name="cedula"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Correos
                            </label>
                            <Form.Control
                              disabled
                              value={datosPersons.email}
                              onChange={(e) => handelchange(e.target)}
                              placeholder=""
                              name="email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>


                      </Row>
                      <Row>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Whatsapp </label>
                            <Form.Control
                              name="whatsapp"
                              required
                              value={datosPersons.whatsapp}
                              onChange={(e) => handelchange(e.target)}
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Dirección</label>
                            <Form.Control
                              name="direccion"
                              value={datosPersons.direccion}
                              onChange={(e) => handelchange(e.target)}
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1 pl-1" md="12">
                          <Form.Group>
                            <label>Nueva Contraseña</label>
                            <Form.Control
                              name="new_password"
                              placeholder=""
                              required
                              minLength={6}
                              type="password"
                              value={datosPersons.new_password}
                              onChange={(e) => handelchange(e.target)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </form>
                    <button

                      onClick={Actualizar}
                      className="btn-fill pull-right btn btn-success">
                      Actualizar
                    </button>
                    <div className="clearfix"></div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>



      </Container>
      <div className="container-fluid p-0" style={{
        position: 'sticky',
        bottom: 10,
        justifyContent: 'end',
        display: 'inline-block',

      }} >
        <div className="d-flex justify-content-end align-items-end">
          <button className={" border rounded-5  px-3  txt-white"}
            onClick={successAlert}
            style={{
              height: '40px',
              backgroundColor: datosPersons.enable == 1 ? "#198754" : "#198754"
            }}>

            {datosPersons.enable == 1 ? "Habilitar suscripción" : "Cancelar suscripción"}
          </button>


        </div>




      </div>
    </>
  );
}

export default PerfilPage;
