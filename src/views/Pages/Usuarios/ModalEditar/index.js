import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Autocomplete from '@mui/material/Autocomplete';
import { Modal, Toast, Form, FormCheck, Col } from "react-bootstrap";
import { GetRoles } from "utils/Querypanel";
import InputGroup from 'react-bootstrap/InputGroup';

import Select from "react-select";
import { EditUser, CrearUser } from "utils/QueryUser/index";
const EditaruserView = (props) => {
  const options = ['Option 1', 'Option 2'];
  let history = useHistory()
  let id = useParams()
  const { editShow, SetModalEdit, datosuser, estado, roles, reloadpage } = props
  const [validate, setValidate] = useState("")
  const [message, setmessage] = useState("");
  const [showtoas, setShowToas] = useState(false);
  const [datos, setDatos] = useState({
    name: '',
    perfil: '',
    username: '',
    email: '',
    password: '',
    id: ''
  })
  function handelchnge(e) {
    setDatos({
      ...datos,
      [e.name]: e.value
    })

  }

  async function Editar() {
    let params = {
      "name": datos.name,
      "email": datos.email,
      "username": datos.username,
      "perfil": datos.perfil,
      "new_password": datos.password
    }

    if (datos.password.length < 7 || !Object.values(params).every((d) => d)) { setValidate("was-validated") }
    else {
      try {
        const editados = await EditUser(id.id, params)
        const { success, message } = editados
        if (success) {
          //location.reload()
          console.log(message)
          SetModalEdit(false)
        }
      } catch (error) {
        setValidate("was-validated")
        setShowToas(true)
        setmessage("Hubo un error Verifique  que el correo no este duplicado")
      }
    }
  }
  async function Crearuser() {
    let params = {
      "name": datos.name,
      "email": datos.email,
      "username": datos.username,
      "perfil": datos.perfil,
      "password": datos.password
    }

    if (!Object.values(params).every((d) => d)) {
      setValidate("was-validated")
      return true
    }
    else {
      try {
        setValidate("")
        const useradd = await CrearUser(params)
        const { success, message } = useradd
        if (success) {
          reloadpage()
          SetModalEdit(false)
          history.push("/admin/usuario")
        }
      } catch (error) {
        setValidate("was-validated")
        setShowToas(true)
        setmessage("Hubo un error Verifique  que el correo no este duplicado")
        console.log(error)
      }
    }

  }
  useEffect(() => {
    setDatos({
      name: '',
      perfil: '',
      username: '',
      email: '',
      password: '',
      id: '',

    })
    setValidate("")
    if (estado == "update") {
      //console.log(datosuser)
      setDatos({
        ...datos,
        name: datosuser.name,
        perfil: datosuser.perfil,
        email: datosuser.email,
        username: datosuser.username,
        id: datosuser.id
      })
    }
    else {
      setDatos({
        name: '',
        perfil: roles.length > 0 ? roles[0].roles : '',
        username: '',
        email: '',
        password: '',
        id: ''
      })

    }
  }, [editShow])
  const inputSelect = () => {
    <div>

    </div>
  }

  return (
    <>
      <Modal className="nuevos"
        show={editShow}
        size="lg"
        onHide={() => SetModalEdit(false)}
        style={{
          width: "100% !important"
        }}
      >
        <Modal.Header className=" py-3" >
          <h5>
            {estado == "update" ? " Editar usuario" : "CREAR NUEVO USUARIO"}
          </h5>
          <button type="button" className="close"
            onClick={() => SetModalEdit(false)}>
            X
          </button>
        </Modal.Header>
        <Modal.Body
        >
          <div className="row ">
            <div className="container col-12 col-md-5">
              <form className={validate} >
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label"><b>Nombres</b></label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                      </div>
                      <input id="name"
                        type="text"
                        value={datos.name}
                        onChange={(e) => handelchnge(e.target)}
                        className="form-control"
                        name="name"
                        required />
                      <div className="invalid-feedback">
                        Ingeres un nombre
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label"><b>Correo</b></label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                      </div>
                      <input id="email"
                        value={datos.email}
                        type="email"
                        onChange={(e) => handelchnge(e.target)}
                        className="form-control"
                        name="email"
                        required />
                      <div className="invalid-feedback">
                        Ingrese un correo
                      </div>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label"><b>Username</b></label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                      </div>
                      <input id="username"
                        value={datos.username}
                        onChange={(e) => handelchnge(e.target)}
                        type="text"
                        className="form-control"
                        name="username"
                        required />
                      <div className="invalid-feedback">
                        Ingrese  un usuario
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><b>Permiso</b></label>

                    <Form.Select className="form-control" value={datos.perfil} name="perfil" onChange={(e) => handelchnge(e.target)}>
                      <option value={""}></option>
                      {roles.length > 0 ?

                        roles.map((e, i) => {
                          return (
                            <option key={"index" + i} value={e.value}>{e.value}</option>
                          )
                        })
                        :
                        ""
                      }
                    </Form.Select>
                    <div className="invalid-feedback">
                      Seleccione un Permiso
                    </div>




                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label"><b>Password</b></label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                      </div>
                      <input id="password"
                        value={datos.password}
                        onChange={(e) => handelchnge(e.target)}
                        type="password"
                        className="form-control"
                        minLength={7}
                        name="password"
                        required />
                      <div className="invalid-feedback">
                        La contraseña debe ser mayor de 7 caracteres
                      </div>

                    </div>
                  </div>
                </div>


              </form>
              <div className="d-flex flex-wrap  justify-content-center ">

                {estado == "update" ?
                  <button className="btn btn-success float-right" onClick={Editar}>ACTUALIZAR</button> :
                  <button className="btn btn-success float-right" onClick={Crearuser}>CREAR</button>


                }
              </div>
            </div>
            <div className="col-12 col-md-6 border px-0 pl-2">
              <div className="col-12  modal-header txt-white py-2  ">
                <h4 className="px-3">    Permisos</h4>

              </div>
              <div className=" col-12 ">
                <div className="row pl-1">
                  <div className=" col-4  px-0">
                    <h6 className="py-2" style={{
                      fontWeight: "bold"
                    }}>Ventas</h6>

                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="menu"
                        defaultChecked
                      />
                      <span className="ml-1">Acceso Menú</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="nuevo"
                        defaultChecked
                      />
                      <span className="ml-1">Nuevo</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="elimina"
                        defaultChecked
                      />
                      <span className="ml-1">Eliminar</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="editar"
                        defaultChecked
                      />
                      <span className="ml-1">Editar</span>
                    </label>
                  </div>
                  <div className=" col-4 px-0">


                    <h6 className="py-2" style={{

                      fontWeight: "bold"
                    }}>Eventos</h6>

                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="menu-evento"
                        defaultChecked
                      />
                      <span className="ml-1">Acceso Menú</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="nuevo-enveto"
                        defaultChecked
                      />
                      <span className="ml-1">Nuevo</span>
                    </label>
                    <label className="d-flex ">

                      <Form.Check
                        type="switch"
                        id="elimina-evento"
                        defaultChecked
                      />
                      <span className="ml-1">Eliminar</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="edita-evento"
                        defaultChecked
                      />
                      <span className="ml-1">Editar</span>
                    </label>
                  </div>
                  <div className=" col-4 px-0">


                    <h6 className="py-2" style={{

                      fontWeight: "bold"
                    }}>Configuración</h6>

                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="menu-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Acceso Menú</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="nuevo-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Nuevo</span>
                    </label>
                    <label className="d-flex ">

                      <Form.Check
                        type="switch"
                        id="elimina-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Eliminar</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="edita-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Editar</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="ver-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Ver Antena</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="Ping-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Ping Antena</span>
                    </label>
                    <label className="d-flex ">
                      <Form.Check
                        type="switch"
                        id="Grafico-configua"
                        defaultChecked
                      />
                      <span className="ml-1">Gráfico</span>
                    </label>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </Modal.Body>

      </Modal>
      <Toast
        onClose={() => setShowToas(false)} show={showtoas} delay={4000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10000
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

  )
}

export default EditaruserView