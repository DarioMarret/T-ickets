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
import { da } from "date-fns/locale";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { DatosUsuarioLocalStorang } from "utils/constantes";

const ModalLogin = (props) => {
  const { showLogin, setShowLogin } = props
  let histoty = useHistory()
  const usedispatch = useDispatch()
  const [message, setmessage] = useState("");
  const [show, setShowToas] = useState(false);
  const [showtoass, setShowToass] = useState(false);
  const [credenciales, setnombre] = useState({
    username: '',
    pass: '',
  });
  const handleSubmit = async (event) => {
    var hoy = new Date();
    event.preventDefault();

    if (credenciales.username !== '' && credenciales.pass !== '') {
      try {
        // console.log(credenciales,encodedToken)
        const { data } = await axios.post(Host + "api/v1/auth_suscriptor", { email: credenciales.username, password: credenciales.pass }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
          }
        })
        //  console.log(data)
        if (data.success) {
          const cedula = await getCedula(data.data.cedula)
          let client = {
            cedula: data.data.cedula, direccion: data.data.ciudad, whatsapp: data.data.movil,
            telefono: data.data.movil, name: data.data.nombreCompleto,
            email: data.data.email, hora: String(hoy),
            enable: data.data.enable, id: data.data.id,
            discapacidad: cedula.discapacidad
          }
          sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(client))
          sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(client))
          usedispatch(addususcritor({ ...client }))
          setShowLogin(false)
          setShowToass(true)
          setmessage("Bienvenido " + data.data.nombreCompleto)

        }
        else {
          setShowToas(true)
          setmessage(data.message)
          //console.log("mensage de alvertencia")
        }
      } catch (error) {
        console.log(error)
        setShowToas(true)
        setmessage("Hubo un error Verifique correo y contraseña e intente de nuevo")

        //console.log("error Logincredet-->",error)
      }

    }
  };
  function regsitronew() {
    setShowLogin(false)
    usedispatch(setModal({ nombre: 'registro', estado: true }))
  }
  const handleChange = (target) => {
    const { name, value } = target
    setnombre({
      ...credenciales,
      [name]: value
    })
  }
  useEffect(() => {


  }, [showLogin])

  return (
    <>
      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex text-center">
          <button type="button" className="close"
            onClick={() => setShowLogin(false)}>
            ×
          </button>

        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex flex-column justify-content-center">


            <div className=" text-center">
              <h5 className="">INICIA SECCIÓN</h5>
            </div>
            <div className="card-body">
              <div className="container text-center">
                <img src={logo} className="mb-4 img-fluid " style={{ height: '80px', color: 'black' }} alt="" />
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
                  <input id="pass" type="password" className="form-control"
                    name="pass"
                    value={credenciales.pass}
                    required
                    onChange={(e) => handleChange(e.target)}
                    placeholder="Contraseña" />
                </div>
                <div className="row text-center">
                  <div className="col-12">
                    <button className="btn btn-primary px-4" type="submit">ENTAR</button>
                  </div>
                  <div className="col-12">
                    <a className="btn btn-link  nav-link px-4" onClick={regsitronew} href="#">Crear Cuenta</a>
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
          top: 60,
          left: '50%',
          transform: 'translate(-50 %, -50 %)',
          zIndex: 10000,
        }}>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Hubo un error </strong>
          <small></small>
          <button type="button" className="close"
            onClick={() => setShowToas({ ...Toastestado, show: false })} >
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
          top: 60,
          left: '50%',
          transform: 'translate(-50 %, -50 %)',
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