import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import logo from "../../assets/img/logo-t-ickets.png";
import logoportal from "../../assets/portada-login.png";
import { getCedula } from 'utils/DatosUsuarioLocalStorag';
import { setDatosUser } from "utils/DatosUsuarioLocalStorag";
// react-bootstrap components
import {Badge, Button,Card,Form,Navbar,Nav,oast,Container,Col,Row} from "react-bootstrap";
//import ToastContainer from 'react-bootstrap/ToastContainer';
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
    // e.preventDefault()
    //console.log(credenciales)
    try {
      if (credenciales.email != '' && credenciales.password != '') {
        const { data, status } = await axios.post("https://43d5-45-187-2-162.sa.ngrok.io/api/v1/auth_admin", credenciales, {
          headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4='
          }
        })
        const { success, tocken } = data
        if (success) {
          // console.log("data-->", jwt_decode(token))
          setDatosUser(tocken)
          //setShow(true)
         // setmessage("Inicio de session exitoso")
          history.push('/admin')
          //console.log("success-->", success)
          //console.log("status-->", status)
        }
      } else {
        setShow(true)
        setmessage("Hubo un error")
        console.log("mensage de alvertencia")
      }
    } catch (error) {
      setmessage("Hubo un error verifique mas tarde")
      //console.log("error Logincredet-->",error)
    }
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credenciales.email !== '' && credenciales.password !== '') {
    try {      
        const { data, status } = await axios.post("https://43d5-45-187-2-162.sa.ngrok.io/api/v1/auth_admin", credenciales, {
          headers: {
            'Authorization': 'Basic YWRtaW46YWRtaW4='
          }
        })
        const { success, tocken } = data
        if (success) {
          console.log("success-->",success)
          setDatosUser(tocken)
          //setShow(true)
          //setmessage("Inicio de session exitoso")
          history.push('/admin')
        }
       else {
        setShow(true)
        setmessage("Hubo un error")
        console.log("mensage de alvertencia")
      }
    } catch (error) {
      setmessage("Hubo un error intente de nuevo o verifique mas tarde")
      console.log("error Logincredet-->",error)
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
    <title>ContactUs</title>
      <div className="full-page ">
        <div className="content d-flex align-items-center p-0">
          <Container className="d-flex justify-content-center">
            <div className="card-group col-12 col-sm-8">
              <div className="card p-4 ">
                <div className="card-body">
                  <div className="container text-center">
                    <img src={logo} className="mb-4 img-fluid" style={{ height: '80px' }} alt="" />
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
              <div className="card text-white py-5 d-md-down-none" style={{ width: '100%', backgroundImage: `url(${logoportal})`, backgroundSize: 'cover' }}>
                <div className="card-body text-center">
                  <div>
                    <h2></h2>
                    <br /><br /><br /><br /><br /><br /><br />
                    <a href="register" className="btn btn-primary active mt-3" type="button">Registro</a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div>
        </div>
      </div>
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
