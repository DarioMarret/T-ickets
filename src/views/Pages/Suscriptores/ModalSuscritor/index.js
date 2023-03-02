import React, { useEffect, useState } from "react";
import { Modal, Toast } from "react-bootstrap";
import { getCedula } from "utils/DatosUsuarioLocalStorag";
import {  CrearSuscritor } from "utils/Querypanel";
import { EditarSuscrito } from "utils/SuscritorQuery/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
const ModalSuscritoView = (props) => {
  const { show, datosperson, setshow, estado } = props
  let usedispatch = useDispatch()
  const [validate, setValidate] = useState("")
  const [datos, setDatos] = useState({
    nombreCompleto: '',
    email: '',
    movil: '',
    ciudad: '',
    new_password: '',
    id: '',
    direccion: '',
    cedula: '',
  })
  function handelchnge(e) {
    setDatos({
      ...datos,
      [e.name]: e.value
    })
  }
  async function Editasuscrito() {
    let parms = {
      "nombreCompleto": datos.nombreCompleto,
      "email": datos.email,
      "new_password": datos.new_password,
      "movil": datos.movil,
      "ciudad": datos.ciudad
    }
    if (datos.new_password.length < 7 || !Object.values(parms).every((e) => e)) {
      setValidate("was-validated")
      return true
    } else {
      console.log("paso")
      console.log(datos)
      try {
        const editados = await EditarSuscrito(datos.id, parms)
        const { success, message } = editados
        if (success) {
          location.reload()
        }
      } catch (error) {
        console.log(error)

      }
    }
  }
  async function Crearsuscrito() {
    const numeroid = document.getElementById("cedula").value
    let params = {
      "nombreCompleto": datos.nombreCompleto,
      "email": datos.email,
      "password": datos.new_password,
      "movil": datos.movil,
      "ciudad": datos.ciudad,
      "direccion": datos.direccion,
      "cedula": numeroid,
    }
    if (!(numeroid.length == 10 || /^\s+$/.test(numeroid))) {
      setValidate("was-validated")
      return true
    }
    if (!Object.values(params).every((d) => d)) {
      setValidate("was-validated")
      return true
    }
    if (datos.new_password.length < 7) {
      setValidate("was-validated")
      return true
    }
    else {
      try {
        console.log("crea")
        setValidate("")
        const useradd = await CrearSuscritor(params)
        const { success, message } = useradd
        if (success) {
          location.reload()
        }
      } catch (error) {
        setValidate("was-validated")
        //console.log(error)
        setDatos({
          nombreCompleto: '',
          email: '',
          movil: '',
          ciudad: '',
          new_password: '',
          id: ''
        })
        usedispatch(setToastes({ show: true, message: 'Hubo un error Verifique  que el correo o cédula no este duplicado', color: 'bg-danger', estado: 'Advertencia' }))

      }
    }


  }
  const cedulachange = async (e) => {
    if (e.length == 10) {
      try {
        let info = await getCedula(e)
        if (info != false)
          // console.log(info)
          setDatos({
            ...datos,
            nombreCompleto: info.name,
            email: info.email,
            ciudad: info.direccion,
          })

      } catch (error) {

      }
    }

  }
  $(document).ready(function () {
    $(".numero").keypress(function (e) {
      var n = (e = e || window.event).keyCode || e.which,
        t = -1 != "0123456789".indexOf(String.fromCharCode(n));
      (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
    })
  });
  useEffect(() => {
    setValidate("")

    if (estado == "update") {

      setDatos({
        ...datos,
        nombreCompleto: datosperson ? datosperson.nombreCompleto : '',
        email: datosperson ? datosperson.email : '',
        movil: datosperson ? datosperson.movil : '',
        ciudad: datosperson ? datosperson.ciudad : '',
        id: datosperson ? datosperson.id : '',
        cedula: datosperson ? datosperson.cedula : ''
      })
    } else {
      setDatos({
        nombreCompleto: '',
        email: '',
        movil: '',
        ciudad: '',
        new_password: '',
        id: ''
      })
    }


  }, [show])
  return (
    <>
      <Modal
        show={show}
        onHide={() => setshow(false)}
      >
        <Modal.Header
        >
          <h5>
            {estado == "update" ? " Datos de suscritor" : "Crear suscritor"}
          </h5>
          <button type="button" className="close"
            onClick={() => setshow(false)}>
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form className={validate} >
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input id="cedula"
                      type="text"
                      className="form-control numero"
                      onChange={(e) => cedulachange(e.target.value)}
                      disabled={estado == "update" ? true : false}
                      value={datosperson.cedula}
                      name="cedula"
                      minLength={10}
                      required />
                    <div className="invalid-feedback">
                      Ingrese una cédula
                    </div>
                  </div>

                </div>
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
                    <div className="invalid-feedback is-invalid">
                      Ingrese una Dirección de correo
                    </div>

                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label"><b>Nombres</b></label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>
                    <input id="nombreCompleto"
                      type="text"
                      value={datos.nombreCompleto}
                      onChange={(e) => handelchnge(e.target)}
                      className="form-control"
                      name="nombreCompleto"
                      required />
                    <div className="invalid-feedback">
                      Ingrese Nombre
                    </div>
                  </div>
                </div>

              </div>



              <div className="row">
                <div className="col-md-6">
                  <label className="form-label"><b>Celuar</b></label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-phone"></i></span>
                    </div>
                    <input id="movil"
                      value={datos.movil}
                      onChange={(e) => handelchnge(e.target)}
                      type="text"
                      className="form-control"
                      name="movil"
                      minLength={10}
                      required />
                    <div className="invalid-feedback">
                      Ingrese un numero de contacto
                    </div>

                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label"><b>Dirección</b></label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-map"></i></span>
                    </div>
                    <input id="ciudad"
                      value={datos.ciudad}
                      onChange={(e) => handelchnge(e.target)}
                      type="text"
                      className="form-control"
                      name="ciudad"
                      required
                    />
                    <div className="invalid-feedback">
                      Ingrese una Dirección
                    </div>

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
                    <input id="new_password"
                      value={datos.new_password}
                      type="password"
                      onChange={(e) => handelchnge(e.target)}
                      className="form-control"
                      name="new_password"
                      minLength={7}
                      required />

                    <div className="invalid-feedback">
                      La contraseña debe ser mayor de 7 caracteres
                    </div>

                  </div>
                </div>
              </div>



            </form>
            <div className="d-flex flex-wrap  justify-content-end ">

              {estado == "update" ?
                <button className="btn btn-success float-right" onClick={Editasuscrito}>Actualizar</button> :
                <button className="btn btn-success float-right" onClick={Crearsuscrito}>Crear</button>


              }
            </div>
          </div>
        </Modal.Body>
      </Modal>


    </>
  )





}
export default ModalSuscritoView