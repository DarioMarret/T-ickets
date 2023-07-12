import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { bancos } from "utils/Imgenesutils";
import { setDatosUser } from "utils/DatosUsuarioLocalStorag";
import { Loginadmin } from "utils/Querypanel";
let { logo, portada } = bancos
import { Badge, Button, Card, Form, Navbar, Nav, Toast, Container, Col, Row } from "react-bootstrap";
function LoginPage() {
  const history = useHistory();
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  const [show, setShow] = useState(false);
  const [message, setmessage] = useState("");
  const [credenciales, setnombre] = useState({
    username: '',
    password: '',
  });
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 500);
  });
  React.useEffect(() => {
    (async () => {
      //await Perfils()
    })()
  }, [])
  const Logincredet = async () => {
    try {
      if (credenciales.email != '' && credenciales.password != '') {
        const { data, status } = await axios.post("https://api.t-ickets.com/ms_login//api/v1/auth_admin", credenciales, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
          }
        })
        const { success, tocken } = data
        if (success) {
          setDatosUser(tocken)
          history.push('/admin')
        }
      } else {
        setShow(true)
        setmessage("Hubo un Correo o contraseña erronea")
        console.log("mensage de alvertencia")
      }
    } catch (error) {
      setmessage("Hubo un error verifique Correo o intente mas tarde")
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credenciales.username.trim() !== '' && credenciales.password.trim() !== '') {
      try {
        const data = await Loginadmin({ username: credenciales.username.trim() ,password:credenciales.password.trim()})
        const { success, token } = data
        if (success) {
          //console.log("success-->",data)
          setDatosUser(token)
          setShow(true)
          setmessage("Inicio de session exitoso")
          history.push('/admin/inicio')
        }
        else {
          setShow(true)
          setmessage("Usuario o contraeña incorrecta")
          console.log("mensage de alvertencia", data)
        }
      } catch (error) {
        setmessage("Hubo un error intente de nuevo o verifique mas tarde")
        console.log("error Logincredet-->", error)
      }
      setShow(true)
    }
    setShow(true)
  };
  const handleChange = (target) => {
    const { name, value } = target
    setnombre({
      ...credenciales,
      [name]: value
    })
    // console.log(credenciales)
  }
  return (
    <>

      <div style={{
        position: 'absolute',
        backgroundColor: '#c9ccd1',
      }} className=" container-fluid  h-100 d-flex justify-content-center align-items-center">
        <Container className="d-flex justify-content-center">
          <div className="card-group row col-12 col-md-10">
            <div className="card p-4 col-12 px-0 shadow-md">
              <div className="card-body">
                <div className="container text-center">
                  <img src={"https://api.t-ickets.com/store/img/tckets-texto-azul.png"} className="mb-4 img-fluid" style={{ height: '80px' }} alt="" />
                </div>
                <form onSubmit={(e) => handleSubmit(e)} method="post">
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                    </div>
                    <input id="username" type="text" className="form-control"
                      name="username"
                      onChange={(e) => handleChange(e.target)}
                      placeholder="Usuario" required />
                  </div>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-lock"></i></span>
                    </div>
                    <input id="password" type="password" className="form-control"
                      name="password"
                      onChange={(e) => handleChange(e.target)}
                      placeholder="Contraseña" required />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-primary px-4" type="submit">Sign In</button>
                    </div>
                    <div className="col-6 text-right">
                      <a className="btn btn-link px-0" href="#">I forgot my password</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card px-0  shadow-md text-white py-5 d-none d-lg-block "
              style={{
                width: '100%', backgroundImage:
                  "url('https://api.t-ickets.com/store/img/portada-login.png')", backgroundSize: 'cover'
              }}>
              <div className="card-body text-center">
                <div>
                  <h2></h2>
                  <br /><br /><br /><br /><br /><br /><br />
                  <a href="register" className="d-none btn btn-primary active mt-3" type="button">Registro</a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/*<div className="full-page ">
        <div className="content d-flex align-items-center p-0">

        </div>
        <div>
        </div>
        <div
          className="full-page-background"
          style={{
            background: '#00000',
            backgroundImage:
              "url(" + require("assets/img/full-screen-image-2.jpg") + ")"

          }}
        ></div>
      </div>*/}
      <Toast
        onClose={() => setShow(false)} show={show} delay={4000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 4
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Hubo un error </strong>
          <small></small>
        </Toast.Header>
        <Toast.Body className="bg-danger text-white" >{message} </Toast.Body>
      </Toast>
    </>
  );
}

export default LoginPage;
