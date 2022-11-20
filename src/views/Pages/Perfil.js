import React, { useEffect, useState } from "react";
import { getCliente } from "utils/DatosUsuarioLocalStorag";
import { DatosUsuariocliente } from "utils/constantes";
import moment from "moment";
import 'moment-timezone'
import { CancelarSubscriptor, EditarSuscrito } from "utils/Querypanel";
import { DatosUsuarioLocalStorang } from "utils/constantes";
import { useDispatch, useSelector } from "react-redux";
import { deletesuscrito, addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { GetSuscritores } from "utils/Querypanel";

import SweetAlert from 'react-bootstrap-sweetalert';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function PerfilPage(props) {
  const { setDatoToas } = props
  const usedispatch = useDispatch()
  const userauthi = useSelector((state) => state.SuscritorSlice)
  const [alert, setAlert] = React.useState(null)
  const [validate, setValidate] = useState("")
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
      "ciudad": datosPersons.ciudad
    }
    if (datosPersons.new_password.length < 6) {
      setValidate("was-validated")
      return
    }
    try {
      setValidate("")
      /* const editar = await EditarSuscrito(datosPersons.id,Datos)
       const {success} =editar
       if(success){
       usedispatch(addususcritor({datosPersons}))
       sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(datosPersons))
       setDatoToas({  show:true,
         message:'Datos actualizados con éxito',
         color:'bg-success',
         estado:'Actualizado',})
       }*/
    } catch (error) {
      setDatoToas({
        show: true,
        message: 'Hubo un error, verifique su conexión o intente mas tarde',
        color: 'bg-danger',
        estado: 'Error',
      })
      console.log("Error al Actualizar-->", error)

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
  const Error = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Hubo un error"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
        Intente mas tarde
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };


  useEffect(() => {

    (async () => {
      let info = getCliente()

      try {
        const suscrito = await GetSuscritores()
        console.log()
        const dato = suscrito.users.filter((e) => e.id == info.id)
        // console.log(dato)
        setPerson({ ...info, new_password: '', enable: dato[0].enable })
        // console.log({...info,new_password:'',enable:dato[0].enable})
        //console.log(dato)
      } catch (error) {
        console.log(error)

      }
    })()


  }, [])
  return (
    <>
      <Container fluid>
        {alert}
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
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
                      Total Boletos
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
                      <Col xl="5" xs="12">
                        <div className="">
                          <Card.Title as="h4">Bienvenido </Card.Title>
                          <p className="card-category">
                            {datosPersons ? datosPersons.name : ''}</p>

                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="icon-big text-center ">
                          <i className="nc-icon nc-satisfied text-danger"></i>
                        </div>
                      </Col>
                      <Col xl="3" xs="6">
                        <button
                          className={datosPersons.enable == 1 ? " btn-success " : " btn-danger "}
                          onClick={successAlert}
                        >
                          {datosPersons.enable == 1 ? "Habilitar suscripción" : "Cancelar suscripción"}
                        </button>

                      </Col>

                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-clock mr-1"></i>
                      Hora de inicio {moment(datosPersons.hora).format('DD MMMM YYYY hh:mm:ss')}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>

            </Row>
            <Row>
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
    </>
  );
}

export default PerfilPage;
