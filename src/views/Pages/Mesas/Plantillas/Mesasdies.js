import React, { useState } from "react";
import { Stylesilla } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { deleteSillas } from "StoreRedux/Slice/sillasSlice";
import { addSillas } from "StoreRedux/Slice/sillasSlice";
import { AgregarAsiento } from "utils/CarritoLocalStorang";
import { correlativosadd } from "utils/Querypanelsigui";
import SweetAlert from "react-bootstrap-sweetalert";
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice";
import { TotalSelecion } from "utils/CarritoLocalStorang";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { bancos } from "utils/Imgenesutils";
let { atencion } = bancos
const MesadiesView = ({ text, list }) => {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  let usedispatch = useDispatch();
  const [alert, setAlert] = useState(null)
  let user = getDatosUsuariosLocalStorag()
  const modalshow = useSelector((state) => state.SuscritorSlice.modal)
  var mapath = useSelector((state) => state.mapaLocalSlice.pathmap)
  function Estado(e) {
    let estado = list.find(f => f.silla == e)
    if (estado.cedula != null && estado.cedula != "") {
      if (estado.estado.toLowerCase() == "ocupado") return estado.estado.toLowerCase()
      if (user != null && estado.cedula == user.cedula) return "seleccionado"

      else return estado.estado.toLowerCase()
      return
    }
    //if ((estado.cedula == null && estado.estado.toLowerCase() == "reservado")) return "disponible"
    else return estado.estado.toLowerCase()
  }
  function MesaEstado(e) {

    if (list.length == 0) {
      return
    }
    let asiento = list.map(function (k) {
      {
        if (k.cedula != "") {
          if (user == undefined) {
            if (k.estado.toLowerCase() == "reservado" && (k.cedula == null || k.cedula == "" || k.cedula == undefined)) return "disponible"
            return k.estado
          }
          if (k.cedula == user.cedula) {
            // console.log(k.cedula, user.cedula)
            return ["seleccionado"];
          }
          else { return k.estado }
        }
        else return [k.estado]
      }
    });
    //console.log(asiento)
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isOcupado = (currentValue) => currentValue == "Ocupado" || currentValue == "OCUPADO";
    const isReserva = (currentValue) => currentValue == "RESERVADO" || currentValue == "reservado";
    const isDispon = (currentValue) => currentValue == "disponible" || currentValue == "DISPONIBLE";
    if (Object.values(asiento).every(isDispon)) { return "mesadisponible" }
    if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
    if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
    if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
    return "mesadisponible"
  }
  /*  obtener sillas  */
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado
  }
  function obtenersila(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).silla + "\n" + list.find(f => f.silla == e).cedula + "\n #" + list.find(f => f.silla == e).idsilla : ""
    return estado
  }
  function sillasid(e) {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    let silla = list.find(f => f.silla == e)
    if (info == undefined) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && silla.cedula == null) {
      let datos = {
        "cedula": info.cedula,
        "estado": "disponible",
        random: sessionStorage.getItem("random"),
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            random: sessionStorage.getItem("random"),
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      usedispatch(setSpinersli({ spiner: false }))
      correlativosadd(datos).then(ou => {
        console.log(datos, ou)
        usedispatch(setSpinersli({ spiner: false }))
        if (ou.success) {
          console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
            })
            usedispatch(addSillas({
              "localidad": nombre.localidad, "localidaEspacio": nombre,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla, "estado": "seleccionado"
            }))

          }))
          ou.update.map((e) => {
            let asiento = silla
            usedispatch(deleteSillas({
              "localidad": nombre.localidad,
              "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla,
              "estado": "seleccionado"
            }))
            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })
          setTimeout(() => {
            usedispatch(setSpinersli({ spiner: true }))
            //   
          }, 5000);


        }
        else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
        console.log(err)
        usedispatch(setSpinersli({ spiner: true }))
      })
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula != silla.cedula)) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula == silla.cedula)) {
      let datos = {
        "cedula": info.cedula,
        "estado": "disponible",
        random: sessionStorage.getItem("random"),
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            random: sessionStorage.getItem("random"),
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      usedispatch(setSpinersli({ spiner: false }))
      correlativosadd(datos).then(ou => {

        if (ou.success) {
          //console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
            })
            usedispatch(addSillas({
              "localidad": nombre.localidad, "localidaEspacio": nombre,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla, "estado": "seleccionado"
            }))
            let sillaids = document.getElementById("silla-" + e)
            sillaids.classList.remove('disponible')
            sillaids.classList.add('seleccionado')

          }))
          ou.update.map((e) => {
            let asiento = silla
            usedispatch(deleteSillas({
              "localidad": nombre.localidad,
              "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla,
              "estado": "seleccionado"
            }))
            //console.log(e)
            let sillaids = document.getElementById("silla-" + e)
            sillaids.classList.add('disponible')
            sillaids.classList.remove('seleccionado')

            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })
          setTimeout(function () {
            usedispatch(setSpinersli({ spiner: true }))
            //    
          }, 5000)

          // hideAlert()

        } else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
        console.log(err)
      })
      return
    }

    if (silla.estado.toLowerCase().includes("disponible") || silla.cedula == null) {
      let datos = {
        "cedula": info.cedula,
        "estado": "disponible",
        random: sessionStorage.getItem("random"),
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            random: sessionStorage.getItem("random"),
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      usedispatch(setSpinersli({ spiner: false }))
      correlativosadd(datos).then(ou => {

        usedispatch(setSpinersli({ spiner: false }))
        if (ou.success) {
          console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
            })
            usedispatch(addSillas({
              "localidad": nombre.localidad, "localidaEspacio": nombre,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla, "estado": "seleccionado"
            }))

          }))
          ou.update.map((e) => {
            let asiento = silla
            usedispatch(deleteSillas({
              "localidad": nombre.localidad,
              "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla,
              "estado": "seleccionado"
            }))
            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })
          setTimeout(() => {
            usedispatch(setSpinersli({ spiner: true }))
            //   
          }, 5000);


        }
        else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
        console.log(err)
        usedispatch(setSpinersli({ spiner: true }))
      })
    }

    console.log(estado, list.find(f => f.silla == e))
    // console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "ADVERTENCIA")
  }
  function enviarsillas(text) {
    console.log(list)
    let datos = document.getElementById(text).classList.value
    if (datos.includes("mesareserva")) {
      return
    }
    if (datos.includes("mesaocupado")) {
      return
    }
    if (datos.includes("mesaselecion")) {
      modalshow.nombre == "Modallocalida" ? succesDesmar(text) : ''
      return
    }
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    if (TotalSelecion() >= 1) {
      usedispatch(setToastes({
        show: true,
        message: 'Debes desmarcar la selección anterior para poder comprar la mesa completa',
        color: 'bg-warning', estado: 'Límite alcanzado'
      }))
      return
    }
    modalshow.nombre == "Modallocalida" ? succesLimit(text) : ''
  }
  const succesLimit = (me) => {
    if (TotalSelecion() >= 10) {
      usedispatch(setToastes({
        show: true,
        message: 'Has alcanzado el limite de selección',
        color: 'bg-warning', estado: 'No puedes seleccionar toda la mesa'
      }))
      return
    }
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Deseas selecionar todas las sillas"
        onConfirm={() => timeposlimites()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Continuar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel>
        En la mesa  {me}
      </SweetAlert>
    )

  }
  const succesSilla = (e) => {
    /**/
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let silla = list.find(f => f.silla == e)
    if (info == undefined) {
      return
    }
    if (silla.estado.toLowerCase().includes("ocupado")) {
      return
    }
    // console.log(silla)
    if (silla.estado.toLowerCase().includes("reservado") && (silla.cedula == null)) {
      if (TotalSelecion() < 10) {
        setAlert(
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "-100px" }}
            title={"Deseas selecionar "}
            onConfirm={() => sillasid(e)}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="success"
            cancelBtnBsStyle="danger"
            confirmBtnText="Si, Continuar"
            cancelBtnText="Cancelar"
            closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            showCancel>
            {"la sillas " + e}
          </SweetAlert>)
      }
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula != silla.cedula)) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula == silla.cedula)) {

      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Deseas desmarcar "}
          onConfirm={() => sillasid(e)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Si, Continuar"
          cancelBtnText="Cancelar"
          closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
          showCancel>
          {"la sillas " + e}
        </SweetAlert>)

      return
    }
    //console.log((TotalSelecion() < 10))
    if (TotalSelecion() < 10) {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Deseas selecionar "}
          onConfirm={() => sillasid(e)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Si, Continuar"
          cancelBtnText="Cancelar"
          closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
          showCancel>
          {"la sillas " + e}
        </SweetAlert>)
    }
  }
  const succesDesmar = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Deseas desmarcar toda la seleccion de esta mesa "}
        onConfirm={() => reservas(e)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Continuar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel>
        {"la sillas " + e}
      </SweetAlert>)
  }
  function timeposlimites() {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let nuevo = list.filter(es => es.estado == "disponible" || es.estado == "DISPONIBLE").map(({ idsilla, ...e }) => {
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula,
        random: sessionStorage.getItem("random"),
        estado: "",
        ...e
      }
    })

    let datos = {
      "cedula": info.cedula,
      "estado": "disponible",
      random: sessionStorage.getItem("random"),
      "mesa": [
        ...nuevo,
        // , ...data
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {
      if (ou.success) {
        //console.log(ou)
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          // console.log(asiento, e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
          })
          usedispatch(addSillas({
            "localidad": nombre.localidad, "localidaEspacio": nombre,
            "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla, "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla, "estado": "seleccionado"
          }))
          console.log(e)
          let sillaids = document.getElementById("silla-" + e)
          sillaids.classList.remove('disponible')
          sillaids.classList.add('seleccionado')
        }))
        ou.update.map((e) => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento)
          usedispatch(deleteSillas({
            "localidad": nombre.localidad,
            "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla,
            "estado": "seleccionado"
          }))

          EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento[0].silla })
        })
        setTimeout(() => {
          usedispatch(setSpinersli({ spiner: true }))

        }, 5000);

      } else {
        usedispatch(setSpinersli({ spiner: true }))
      }
      //usedispatch(setSpinersli({ spiner: true }))
    }).catch(err => {
      usedispatch(setSpinersli({ spiner: true }))
      console.log(err)
    })
    //console.log(datos)

  }
  function reservas() {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let nuevo = list.filter(es => es.cedula == info.cedula).map(({ idsilla, ...e }) => {
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula,
        random: sessionStorage.getItem("random"),
        estado: "",
        ...e
      }
    })

    let datos = {
      "cedula": info.cedula,
      "estado": "disponible",
      random: sessionStorage.getItem("random"),
      "mesa": [
        ...nuevo
        // , ...data
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {

      if (ou.success) {
        // console.log(ou)
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento, e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
          })
          usedispatch(addSillas({
            "localidad": nombre.localidad, "localidaEspacio": nombre,
            "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla, "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla, "estado": "seleccionado"
          }))
        }))
        ou.update.map((e) => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento)
          usedispatch(deleteSillas({
            "localidad": nombre.localidad,
            "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla,
            "estado": "seleccionado"
          }))
          console.log(e)
          let sillaids = document.getElementById("silla-" + e)
          sillaids.classList.remove('seleccionado')
          sillaids.classList.add('disponible')
          EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento[0].silla })
        })
        usedispatch(setSpinersli({ spiner: true }))

      }
      usedispatch(setSpinersli({ spiner: true }))
    }).catch(err => {
      usedispatch(setSpinersli({ spiner: true }))
      console.log(err)
    })
    // console.log(datos)

  }
  const hideAlert = () => setAlert(null)
  return (
    <div style={{ padding: '0.7px' }}>
      {alert}
      <div className="d-flex">
        <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
        </div>

        <a id={obtenerid(text + "-s-1")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-1")}
          onClick={() => succesSilla(text + "-s-1")}
          className={text + "-s-1 sillas   " + Estado(text + "-s-1")} style={Stylesilla.asientos}></a>

        <a id={obtenerid(text + "-s-2")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-2")}
          onClick={() => succesSilla(text + "-s-2")}
          className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-3")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-3")}
          onClick={() => succesSilla(text + "-s-3")}
          className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
        </a>
      </div>
      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-4")}
            onClick={() => succesSilla(text + "-s-4")}
            data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-4")}
            className={text + "-s-4 sillas " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-5")}
            data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-5")}
            onClick={() => succesSilla(text + "-s-5")}
            className={text + "-s-5 sillas  " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
          {text}
        </div>
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-6")}
            data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-6")}
            onClick={() => succesSilla(text + "-s-6")}
            className={text + "-s-6 sillas  " + Estado(text + "-s-6")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-7")}
            data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-7")}
            onClick={() => succesSilla(text + "-s-7")}
            className={text + "-s-7 sillas  " + Estado(text + "-s-7")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex ">
        <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
        </div>
        <a id={obtenerid(text + "-s-8")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-8")}
          onClick={() => succesSilla(text + "-s-8")}
          className={text + "-s-8 sillas  " + Estado(text + "-s-8")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-9")}
          onClick={() => succesSilla(text + "-s-9")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-9")}
          className={text + "-s-9 sillas  " + Estado(text + "-s-9")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-10")}
          onClick={() => succesSilla(text + "-s-10")}
          data-toggle="tooltip" data-placement="top" title={obtenersila(text + "-s-10")}
          className={text + "-s-10 sillas  " + Estado(text + "-s-10")} style={Stylesilla.asientos}>
        </a>
      </div>
    </div >


  )

}

export default MesadiesView;