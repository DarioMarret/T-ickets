import React, { useState, useEffect } from "react"
import MesacuatroView from "./Plantillas/Mesacuatro";
import MesaochoView from "./Plantillas/Mesasocho";
import MesaseisView from "./Plantillas/Mesaseis";
import MesadosView from "./Plantillas/Mesados";
import MesacerView from "./Plantillas/Mesacer";
import MesadiesView from "./Plantillas/Mesasdies";
import './mesas.css'
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

import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
import { logWithCallback } from "utilsstile.js/style";
function MesasView({ text, status, list }) {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  let usedispatch = useDispatch();
  const [alert, setAlert] = useState(null)
  let user = getDatosUsuariosLocalStorag()
  const modalshow = useSelector((state) => state.SuscritorSlice.modal)
  var mapath = useSelector((state) => state.mapaLocalSlice.pathmap)
  function Estado(e) {
    let randon = sessionStorage.getItem("random") || ""
    let estado = list.find(f => f.silla == e)
    if (estado.estado == null || estado.estado == undefined) return "disponible"
    if (estado.cedula != null && estado.cedula != "") {
      if ((estado.cedula == "" || estado.cedula == undefined || estado.cedula == null) && estado.estado.toLowerCase() == "ocupado") return "apartado"
      //if ((estado.cedula != null && estado.cedula != "") && estado.estado.toLowerCase() == "ocupado") return "apartado"
      if (estado.estado.toLowerCase() == "ocupado") return estado.estado.toLowerCase()
      if (user != null && estado.cedula == user.cedula || (estado.cedula == randon && randon != "")) return "seleccionado"

      else return estado.estado.toLowerCase()
      return
    }
    if ((estado.cedula == "" || estado.cedula == undefined || estado.cedula == null) && estado.estado.toLowerCase() == "ocupado") return "apartado"
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
            return ["seleccionado"];
          }
          // if ((k.cedula == "" || k.cedula == undefined || k.cedula == null) && k.estado.toLowerCase() == "ocupado") return "apartado"
          else { return k.estado }
        }
        else return [k.estado]
      }
    });
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isApartado = (currentValue) => currentValue == "apartado";
    const isOcupado = (currentValue) => currentValue == "Ocupado" || currentValue == "OCUPADO";
    const isReserva = (currentValue) => currentValue == "RESERVADO" || currentValue == "reservado";
    const isDispon = (currentValue) => currentValue == "disponible" || currentValue == "DISPONIBLE";
    const isDisnone = (currentValue) => currentValue == "none" || currentValue == "d-none";
    let mesas = ["A", "B", "C", "D"]
    let sillabloquea = ["D42", "D41", "D40", "D38", "D39", "D37", "D36"]
    let envotid = sessionStorage.getItem("eventoid")
    if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
    if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
    if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
    if (Object.values(asiento).every(isApartado)) { return "mesaapartada" }
    if (Object.values(asiento).every(isDisnone)) { return "none" }
    return "mesadisponible"
  }
  /*  obtener sillas  */
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado
  }
  function sillasid(e) {
    // return
    let info = getDatosUsuariosLocalStorag()
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

        usedispatch(setSpinersli({ spiner: false }))
        if (ou.success) {
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": { "idcolor": nombre.id_localidad || nombre.idcolor, "ideprecio": nombre.ideprecio, "espacio": nombre.id_espacio, ...nombre }, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
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
          }, 1000);


        }
        else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
        logWithCallback(err)
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
        "random": sessionStorage.getItem("random"),
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            "random": sessionStorage.getItem("random"),
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      usedispatch(setSpinersli({ spiner: false }))
      correlativosadd(datos).then(ou => {
        if (ou.success) {
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": { "idcolor": nombre.id_localidad || nombre.idcolor, "ideprecio": nombre.ideprecio, "espacio": nombre.id_espacio, ...nombre }, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
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
            let sillaids = document.getElementById("silla-" + e)
            sillaids.classList.add('disponible')
            sillaids.classList.remove('seleccionado')

            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })
          setTimeout(function () {
            usedispatch(setSpinersli({ spiner: true }))
          }, 1000)
        } else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
        logWithCallback(err)
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
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": {
                ...nombre,
                "idcolor": nombre.id_localidad || nombre.idcolor, "ideprecio": nombre.ideprecio,
                "espacio": nombre.id_espacio
              }, "id": nombre.id_localidad,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
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
          }, 1000);


        }
        else {
          usedispatch(setSpinersli({ spiner: true }))
        }
      }).catch(err => {
       logWithCallback(err)
        usedispatch(setSpinersli({ spiner: true }))
      })
    }
  }
  function enviarsillas(text) {
    
    let datos = document.getElementById(text).classList.value
    if (datos.includes("none")) {
      return
    }
    if (datos.includes("mesareserva")) {
      return
    }
    if (datos.includes("mesaocupado")) {
      return
    }
    if (datos.includes("mesaapartada")) {
      return
    }
    if (datos.includes("mesaselecion")) {
      modalshow.nombre == "Modallocalida" ? succesDesmar(text) : ''
      return
    }
    let info = getDatosUsuariosLocalStorag()
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
    let mesas = ["A", "B", "C"]
    let mesa = ["A"]
    let sillabloquea = ["J4", "J5", "J3"]
    let sillesSAmor = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "B4", "B3"]
    let sillasAmor = []
    const randon = sessionStorage.getItem("random") || ""
    let info = getDatosUsuariosLocalStorag()
    let envotid = sessionStorage.getItem("eventoid")
    // if ((envotid == 'FMNPLU') && (![...sillabloquea,].includes(text) && clienteInfo() == null)) {
    //   $.confirm({
    //     title: 'Mesas Habilitadas',
    //     content: 'En esta localidad solo están habilitadas las siguientes sillas inidividuales en las localidades:<br><strong>GOLDEN BOX</strong><br><strong>J3, J4, J5,</strong><br>' +
    //       '' +
    //       '',
    //     type: 'blue',
    //     typeAnimated: true,
    //     buttons: {
    //       aceptar: {
    //         text: 'Aceptar',
    //         btnClass: 'btn-blue',
    //         action: function () {
    //         }
    //       }
    //     }
    //   });
    //   return
    // }

    if ((envotid == '7EZFQ6') && (![...sillabloquea, ...sillasAmor, ...sillesSAmor].includes(text) && clienteInfo() == null)) return
    /*
   if (((envotid == "X5U5VR") && (clienteInfo() == null) && (mesas.includes(text.split("")[0])) || (sillabloquea.includes(text))) && clienteInfo() == null) return
   if (((envotid == "X5U5VR") && (mesas.includes(text.split("")[0])) && clienteInfo() == null)) {
     return
   }*/
    let silla = list.find(f => f.silla == e)
    if (silla.idsilla == undefined) return
    if (info == undefined) {
      return
    }
    if (silla.estado.toLowerCase().includes("ocupado") || silla.estado.toLowerCase().includes("none")) {
      return
    }
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
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula == silla.cedula || (silla.cedula == randon && randon != ""))) {
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
    let info = getDatosUsuariosLocalStorag()
    let nuevo = list.filter(es => es.estado.toLowerCase() == "disponible").map(({ idsilla, ...e }) => {
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula || "",
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
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {
      if (ou.success) {
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": { "idcolor": nombre.id_localidad || nombre.idcolor, "ideprecio": nombre.ideprecio, "espacio": nombre.id_espacio, ...nombre }, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
          })
          usedispatch(addSillas({
            "localidad": nombre.localidad, "localidaEspacio": nombre,
            "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla, "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla, "estado": "seleccionado"
          }))
          let sillaids = document.getElementById("silla-" + e)
          sillaids.classList.remove('disponible')
          sillaids.classList.add('seleccionado')
        }))
        ou.update.map((e) => {
          let asiento = list.filter(ef => ef.idsilla == e)
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
        }, 1000);
      } else {
        usedispatch(setSpinersli({ spiner: true }))
      }
    }).catch(err => {
      usedispatch(setSpinersli({ spiner: true }))
    })

  }
  function reservas() {
    let info = getDatosUsuariosLocalStorag()
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
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {
      if (ou.success) {
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": { "idcolor": nombre.id_localidad || nombre.idcolor, "ideprecio": nombre.ideprecio, "espacio": nombre.id_espacio, ...nombre }, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
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
          usedispatch(deleteSillas({
            "localidad": nombre.localidad,
            "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla,
            "estado": "seleccionado"
          }))
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
    })
  }
  const hideAlert = () => setAlert(null)
  return (
    <div>
      {(() => {
        switch (status) {

          case 2:
            return <MesadosView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)} />;
          case 4:
            return <MesacuatroView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)} />;
          case 6:
            return <MesaseisView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)}
            />;
          case 8:
            return <MesaochoView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)} />;
          case 10:
            return <MesadiesView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)} />;
          case 11:
            return <MesadiesView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)}

            />;
          case 12:
            return <MesadiesView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)}

            />;
          default:
            return <MesacerView text={text} list={list}
              obtenerid={obtenerid}
              succesSilla={succesSilla}
              succesLimit={succesLimit}
              Estado={Estado}
              MesaEstado={MesaEstado}
              alert={alert}
              enviarsillas={() => enviarsillas(text)}

            />;
        }
      })()}
    </div>
  );
}

export default MesasView