import React, { useEffect, useState } from "react";
import { Modal, Container, Toast } from "react-bootstrap";
import { getCedula } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { Host } from "utils/constantes";
import axios from "axios";
import { DatosUsuariocliente } from "utils/constantes";
import logo from "../../../../assets/imagen/logo-inicio.png";
import { useSelector, useDispatch } from "react-redux";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { DatosUsuarioLocalStorang } from "utils/constantes";

const ModalLogin = (props) => {
  const { showLogin, setShowLogin, abrir } = props
  let histoty = useHistory()
  let Modalstatus = useSelector((state) => state.SuscritorSlice.modal)
  const usedispatch = useDispatch()
  const [message, setmessage] = useState("");
  const [show, setShowToas] = useState(false);
  const [showtoass, setShowToass] = useState(false);
  const [credenciales, setnombre] = useState({ username: '', pass: '', });
  const [tipo, setTipo] = useState(true)
  const handleSubmit = async (event) => {
    var hoy = new Date();
    event.preventDefault();
    //console.log(credenciales)
    if (credenciales.username !== '' && credenciales.pass !== '') {

      try {
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/auth_suscriptor", { email: credenciales.username.trim(), password: credenciales.pass.trim() }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
          }
        })
        if (data.success) {
          const cedula = await getCedula(data.data.cedula)
          let client = {
            cedula: data.data.cedula, direccion: data.data.ciudad, whatsapp: data.data.movil,
            telefono: data.data.movil, name: data.data.nombreCompleto,
            email: data.data.email, hora: String(hoy),
            enable: data.data.enable, id: data.data.id,
            discapacidad: cedula.discapacidad,
            envio: ''
          }
          sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(client))
          sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(client))
          usedispatch(addususcritor({ ...client }))
          // setShowToass(true)
          // setmessage("Bienvenido " + data.data.nombreCompleto)
          usedispatch(setToastes({
            show: true,
            message: "Bienvenido " + data.data.nombreCompleto,
            color: 'bg-success',
            estado: "Inicio Exitoso",
          }))
          /* setDatoToas({
             show: true,
             message: "Bienvenido " + data.nombreCompleto,
             color: 'bg-success',
             estado: "Inicio Exitoso",
           })*/
           Modalstatus.estado != "" ? abrir(Modalstatus.estado) : ''
          usedispatch(setModal({ nombre: '', estado: '' }))
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: "Hubo un error Verifique correo y contraseña e intente de nuevo",
            color: 'bg-danger',
            estado: "Hubo un error",
          }))

          // usedispatch(setToastes({ show: true, message: data.message, color: 'bg-success', estado: 'Se guardo el numero de control'}))
        }
      } catch (error) {
        //console.log(error)
        //setShowToas(true)
        //setmessage("Hubo un error Verifique correo y contraseña e intente de nuevo")
        usedispatch(setToastes({
          show: true,
          message: "Hubo un error Verifique correo y contraseña e intente de nuevo",
          color: 'bg-danger',
          estado: "Hubo un error",
        }))
      }

    }
  };
  function RecuperarContraseña() {
  /*
      $.confirm({
        title: 'Recuperar Contraseña!',
        content: '' +
          '<form action="" className="formName">' +
          '<div className="form-group">' +
          '<label>Ingrese su correo electrónico</label>' +
          '<input type="text" placeholder="Correo" class="form-control codigo " required />' +
          '</div>' +
          '</form>',
        buttons: {
          formSubmit: {
            text: 'Enviar',
            btnClass: 'btn-blue',
            action: function () {
              var name = this.$content.find('.codigo').val();
              if (!name) {
                $.alert('Ingrese un correo validso');
                return false;
              }
              //abrir(e)
            }
          },
          cancel: function () {

          }
        }
      }) */
  }
  function regsitronew() {
    setShowLogin(false)
    usedispatch(setModal({ nombre: 'registro', estado: Modalstatus.estado }))
  }
  const handleChange = (target) => {
    const { name, value } = target
    setnombre({
      ...credenciales,
      [name]: value
    })
  }
  useEffect(() => {
  }, [Modalstatus.nombre == "loginpage" ? true : false])

  return (
    <>
      <Modal
        show={Modalstatus.nombre == "loginpage" ? true : false}
        onHide={() => setShowLogin(false)}
        fullscreen={"md-down"}
        centered
      >
        <Modal.Header className="py-4  bg-dark ">
          <div className=" d-flex  col-12 ">
            <div className="col-sm   justify-content-end  pl-0 ">
              <h5 className="modal-title text-center">INICIA SESIÓN</h5>
            </div>

            <button type="button" className="close "
              onClick={() => usedispatch(setModal({ nombre: '', estado: '' }))}>
              ×
            </button>
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex   align-items-center">
          <Container className="d-flex flex-column justify-content-center">
            <div className="card-body">
              <div className="container text-center">
                <img src={logo} className="mb-4 img-fluid " style={{ height: '125px', color: 'black' }} alt="" />
              </div>
              <form onSubmit={(e) => handleSubmit(e)}  >
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                  </div>
                  <input id="username" type="text" className="form-control"
                    name="username"
                    value={credenciales.username}
                    onChange={(e) => handleChange(e.target)}
                    required
                    placeholder="Usuario" />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                  </div>
                  <input id="pass" type={tipo ? "password" : ""} className="form-control"
                    name="pass"
                    value={credenciales.pass}
                    required
                    onChange={(e) => handleChange(e.target)}
                    placeholder="Contraseña" />
                  <div className="input-group-prepend">
                    <span className="input-group-text " onClick={() => setTipo(!tipo)}><i className={!tipo ? "fa fa-eye" : "fa fa-eye-slash"}></i></span>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-12">
                    <button className="btn btn-primary px-4" type="submit">INGRESAR</button>
                  </div>
                  <div className="col-12 "
                  >
                    <a className="btn btn-link text-pag  px-4" onClick={regsitronew} href="#"
                      style={{
                        fontWeight: "bold",
                        color: "#3F40E0"
                      }}
                    >Crear Cuenta</a>
                  </div>
                  <div className="col-12 ">
                    <a className=" nav-link btn btn-link" href="#" onClick={RecuperarContraseña} > Olvide mi contraseña </a>

                  </div>
                </div>
              </form>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
      <Toast
        onClose={() => setShowToas(false)} show={show} delay={4000} autohide
        className="top-center"
        style={{
          position: 'fixed',
          top: 30,
          right: 2,
          transform: 'translate(-50 %, 0 %)',
          zIndex: 10000,
        }}>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Hubo un error </strong>
          <small></small>
          <button type="button" className="close"
            onClick={() => setShowToas(false)} >
            ×
          </button>
        </Toast.Header>
        <Toast.Body className="bg-danger text-white" >{message} </Toast.Body>
      </Toast>

      <Toast
        onClose={() => setShowToass(false)} show={showtoass} delay={3500} autohide
        className="top-center"
        style={{
          position: 'fixed',
          top: 30,
          right: 2,
          transform: 'translate(-50 %, 0 %)',
          zIndex: 10000,
        }}>
        <Toast.Header closeButton={false} >
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Inicio Exitoso </strong>
          <small></small>

          <button type="button" className="close"
            onClose={() => setShowToass(false)} >
            ×
          </button>
        </Toast.Header>
        <Toast.Body className="bg-success text-white" >   {message} </Toast.Body>
      </Toast>
    </>
  )

}

export default ModalLogin;