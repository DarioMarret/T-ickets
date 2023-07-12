import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/img/logo-t-ickets.png";
import { Host } from "utils/constantes";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Media,
  Toast,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";


function RegisterPage() {
  const [registro, setregistro] = useState({
    name: '',
    cedula: '',
    email: '',
    username: '',
    password: '',
    fecha: '',
    email: '',
    edad: '',
  })
  const [show, setShow] = useState(false);
  const [cedula, setname] = useState("");
  const [roles, setRoles] = useState([]);
  const [spiner, setSpiner] = useState("d-none");
  const [cedulaapi, setCedulaapi] = useState("");


  const Registeruser = async (e) => {
    e.preventDefault();
    console.log(registro)
    if (registro.name !== '' || registro.password !== '' || registro.username !== '') {
      try {
        const { data } = await axios.post("https://43d5-45-187-2-162.sa.ngrok.io/api/v1/crear_user", registro, {
          headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4='
          }
        })
        console.log("registro-->", data)
      } catch (error) {
        console.log(error)
        setShow(true)

      }

    }
    setShow(true)
  }

  function hanbleOnchange(target) {
    const { name, value } = target
    setregistro({
      ...registro,
      [name]: value
    })
    //console.log(value)
  }
  React.useEffect(() => {
    (async () => {
      await Perfils()
    })()
  }, [registro])
  const Perfils = async () => {
    const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listas_suscriptor", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
      }
    })
    if (!data.success) return
    setRoles(data.data)
    console.log("Perfils-->", data)
  }
  const Consulcedula = async () => {

    const consulta = registro.cedula;
    if (consulta == " ") { return; }
    try {
      setSpiner("");
      setCedulaapi("d-none");
      const res = await axios.get("https://api.t-ickets.com/ms_login//cedula/" + consulta)

      const { data } = res
      const { message } = data

      /* if (!respons.portal) {
         setSpiner("d-none");
         setCedulaapi("");
       }*/
      setregistro(data.data)
      console.log(registro.name)
      setSpiner("d-none");
      setCedulaapi("");
      console.log("datos cedula", data)
    } catch (error) {
      setSpiner("d-none");
      setCedulaapi("");
      console.log(error)

    }
    //if (numero.length !=10) return

    //console.log(numero)

  }


  return (
    <>
      <div className="full-page ">
        <div className="content">

          <Container>
            <div className="row justify-content-center">

              <div className="col-md-8" style={{ height: '70%' }}>
                <div className="card mx-4">

                  <div className="card-body p-4">


                    <div className="container text-center">
                      <img src={logo} className="mb-4 img-fluid" style={{ height: '80px' }} alt="" />
                    </div>


                    <div className="row">
                      <div className="col-md-8">

                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-address-card"></i></span>
                          </div>

                          <input id="cedula" type="text"
                            className="form-control" name="cedula"
                            value={registro.cedula}
                            onChange={(e) => hanbleOnchange(e.target)}
                            placeholder="Numero de cédula" />

                          <div className="input-group-append">
                            <button className={"input-group-text btn-primary h-auto " + cedulaapi} onClick={Consulcedula} ><i className="fas fa-search"></i></button>
                            <button className={"input-group-text  btn-primary  " + spiner} ><i className="spinner-border spinner-border-sm" ></i></button>
                          </div>

                        </div>

                      </div>
                    </div>

                    <form onSubmit={(e) => Registeruser(e)} method="post">

                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>

                            <input id="name" type="text"
                              className="form-control"
                              name="name"
                              value={registro.name || ''}
                              onChange={(e) => hanbleOnchange(e.target)}
                              placeholder="Full name" required />

                          </div>
                        </div>
                      </div>
                      <div className="row">

                        <div className="col-12 col-md-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-birthday-cake"></i></span>
                            </div>

                            <input id="fecha_nacimiento"
                              type="date"
                              className="form-control"
                              name="fecha_nacimiento"
                              value={registro.fecha || ''}
                              onChange={(e) => hanbleOnchange(e.target)}
                              required />

                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i></span>
                            </div>

                            <input id="edad"
                              type=""
                              className="form-control" name="edad" placeholder="Edad"
                              value={registro.edad}
                              onChange={(e) => hanbleOnchange(e.target)} />

                          </div>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                            </div>

                            <input id="email" type="email" className="form-control" name="email"
                              value={registro.email}
                              onChange={(e) => hanbleOnchange(e.target)}
                              placeholder="Email" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fab fa-whatsapp"></i></span>
                            </div>

                            <input id="username" type="username" className="form-control"
                              name="username"
                              onChange={(e => hanbleOnchange(e.target))}
                              placeholder="Ingrese su numero de whatsapp" />
                          </div>
                        </div>
                      </div>
                      <div className="row" hidden="">
                        <div className="col-md-6">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fa fa-lock"></i></span>
                            </div>
                            <input id="password" type="password" className="form-control"
                              name="password"
                              onChange={(e) => hanbleOnchange(e.target)}
                              placeholder="Password" />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <button className="btn btn-block btn-success" type="submit">Crear Cuenta</button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="card-footer p-4">
                    <div className="row">
                      <div className="col-12">
                        <a className="btn btn-outline-primary btn-block" href="/auth/login">Login</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>


        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage: "url(" + require("assets/img/full-screen-image-2.jpg") + ")"
          }}
        ></div>
      </div>
      <Toast
        onClose={() => setShow(false)} show={show} delay={1500} autohide
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 4,

        }}
      >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          Hubo un error
        </Toast.Header >
        <Toast.Body>Intenete de nuevo</Toast.Body>
      </Toast>
    </>
  );
}


export default RegisterPage;
