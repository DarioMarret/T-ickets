import React, { useState, useEffect } from "react"
import MesacuatroView from "./Mesacuatro";
import MesaseisView from "./Mesaseis";
import MesadosView from "./Mesados";
import MesacerView from "./Mesacer";
import MesadiesView from "./Mesasdies";
import '../mesas.css'
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
import MesaochoView from "./Mesasocho";
import { mikroAxios } from "utils/index";
import { data } from "jquery";
function MesasViews({ text, status, list, setMapa }) {
  let useradmin = clienteInfo()
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  let usedispatch = useDispatch();
  const [alert, setAlert] = useState(null)
  let user = getDatosUsuariosLocalStorag()
  const modalshow = useSelector((state) => state.SuscritorSlice.modal)
  var mapath = useSelector((state) => state.mapaLocalSlice.pathmap)
  function Estado(e) {
    let randon = sessionStorage.getItem("random") || ""
    let estado = list.find(f => f.silla == e)
    //console.log(estado, randon)
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
            // console.log(k.cedula, user.cedula)
            return ["seleccionado"];
          }
          // if ((k.cedula == "" || k.cedula == undefined || k.cedula == null) && k.estado.toLowerCase() == "ocupado") return "apartado"
          else { return k.estado }
        }
        else return [k.estado]
      }
    });
    //console.log(asiento)
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isApartado = (currentValue) => currentValue == "apartado";
    const isOcupado = (currentValue) => currentValue == "Ocupado" || currentValue == "OCUPADO";
    const isReserva = (currentValue) => currentValue == "RESERVADO" || currentValue == "reservado";
    const isDispon = (currentValue) => currentValue == "disponible" || currentValue == "DISPONIBLE";
    const isDisnone = (currentValue) => currentValue == "none" || currentValue == "d-none";
    let mesas = ["A", "B", "C", "D"]
    let sillabloquea = ["D42", "D41", "D40", "D38", "D39", "D37", "D36"]
    //console.log(e.substring(0, 1))
    let envotid = sessionStorage.getItem("eventoid")
    //if (Object.values(asiento).every(isDispon)) { return "mesadisponible" }
    if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
    if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
    if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
    if (Object.values(asiento).every(isApartado)) { return "mesaapartada" }
    if (Object.values(asiento).every(isDisnone)) { return "none" }
    // if (!mesas.includes(e.substring(0, 1))) { return "bg-secondary" }
    //  if ((envotid == "X5U5VR") && !mesas.includes(e.substring(0, 1)) || (e.substring(0, 1) == 'D' && !sillabloquea.includes(e))) { return "bg-dark" }
    return "mesadisponible"
  }
  /*  obtener sillas  */
  function obtenerid(e) {
    const sillaObj = list.find(f => f.silla == e);
    if (!sillaObj) return "";
    let estado = sillaObj.idsilla !== undefined ? "silla-" + sillaObj.idsilla : "";
    return estado;
  }
  function obtenersila(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).silla + "\n" + list.find(f => f.silla == e).cedula + "\n #" + list.find(f => f.silla == e).idsilla : ""
    return estado
  }
  function sillasid(e) {

    // console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "ADVERTENCIA")
  }
  function enviarsillas(text) {
    console.log(list)
    let dato = list.filter(elm => elm.estado == 'Ocupado' && (elm.cedula == null || elm.cedula == ''))
    let bloque = list.filter(elm => elm.estado != 'none').map(el => {
      if (el.cedula == null || el.cedula == '') {
        return el.idsilla
      }
    }).filter(e => e != undefined)
    let datos = document.getElementById(text).classList.value
    // console.log(datos.split(" ").includes("mesadisponible"))
    if (bloque.length == 0) return
    succesLimit(bloque, datos, dato)
  }
  const succesLimit = (me, datos, lista) => {
    if (useradmin.perfil == 'suscriptores') return
    console.log("Sillas", me, lista)

    const Botoon = () => lista.length > 0 ? <button

      className="btn btn-danger "
      onClick={() => enviarComentario(me, me)}
    >
      Add / modi Comentario
    </button> : ""
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Deseas Cambiar el estado de las sillas libres"}
        onConfirm={() => enviarLocalidad('Disponible', me)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Disponible"
        cancelBtnText="Ocupado"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel
        customButtons={
          <React.Fragment>
            <button
              className="btn btn-primary"
              onClick={() => hideAlert()}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={() => enviarLocalidad('Disponible', me)}
            >
              Disponible
            </button>
            <button
              className="btn btn-danger"
              onClick={() => enviarLocalidad('Ocupado', me)}
            >
              Ocupado
            </button>
            <Botoon />

          </React.Fragment>
        }
      >
        {"de la Mesa " + datos.split(" ")[0]}
      </SweetAlert>
    )
  }
  async function enviarComentario(params, Localidades,) {
    console.log(params)
    if (params.length > 1) {
      $.confirm({
        title: 'Enviar Comentario',
        content: `
    <input type="text" id="comentarioInput" class="form-control" placeholder="Comentario..."><br>
    <button id="actualizarBtn" class="btn btn-primary btn-sm">Actualizar</button>
  `,
        onContentReady: function () {
          const self = this;

          self.$content.find('#actualizarBtn').on('click', function () {
            const comentario = self.$content.find('#comentarioInput').val();
            // Aquí puedes hacer lo que necesites con el comentario, como enviarlo vía AJAX

            $.ajax({
              url: 'https://api.t-ickets.com/mikroti/Boleteria/item_localidad',
              "url": "https://api.t-ickets.com/mikroti/Boleteria/item_localidad",
              "method": "PUT",
              "timeout": 0,
              "headers": {
                "Content-Type": "application/json"
              },
              "data": JSON.stringify({
                "id_localidades": params,
                "estado": comentario,
                "comentario": true
              }),
              success: function (res) {
                $.alert('Comentario enviado correctamente.');
                window.location.reload();
              },
              error: function () {
                $.alert('Error al enviar el comentario.');
              }
            });
          });
        }
      });
      return
    }
    let data = JSON.stringify({
      "id_localidades": Localidades[0],
      "espacio": ""
    });
    
    var settings = {
      url: "https://api.t-ickets.com/mikroti/Boleteria/itemlocalidad",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
    };
    $.confirm({
      title: 'Detalle de mesas',
      content: function () {
        var self = this;

        return $.ajax(settings).done(function (response) {
          if (response.estado) {
            let html = `
              <input type="text" id="comentarioInput" class="form-control" placeholder="Comentario..."><br>
              <button id="actualizarBtn" class="btn btn-primary btn-sm">Actualizar</button>
              <hr>
              <ul>
            `;

            response.localidades.forEach(loc => {
              html += `<li><strong>Silla:</strong> ${loc.silla} &nbsp; <strong>Comentario:</strong> ${loc.id_registraCompra || ''}</li>`;
            });

            html += '</ul>';

            self.setContent(html);
          } else {
            self.setContent('No hay localidades disponibles.');
          }
        }).fail(function () {
          self.setContent('Algo salió mal al obtener los datos.');
        });
      },
      onContentReady: function () {
        const self = this;

        // Aquí el DOM ya está completamente insertado
        self.$content.on('click', '#actualizarBtn', function () {
          const comentario = self.$content.find('#comentarioInput').val();
          console.log('Comentario:', comentario);

          $.ajax({
            url: 'https://api.t-ickets.com/mikroti/Boleteria/item_localidad',
            method: 'PUT',
            timeout: 0,
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify({
              id_localidades: Localidades[0],
              estado: comentario,
              comentario: true
            }),
            success: function (res) {
              $.alert('Comentario enviado correctamente.');
              window.location.reload();
            },
            error: function () {
              $.alert('Error al enviar el comentario.');
            }
          });
        });
      }
    });
    
    

  }
  async function enviarLocalidad(estado, Localidades) {
    try {
      let { data } = await mikroAxios.put('/Boleteria/item_localidad', {


        "id_localidades": Localidades,
        "estado": estado

      })
      console.log(estado, Localidades)
      console.log(data)
      hideAlert()
      setMapa()
    } catch (error) {
      console.log(data)
    }


  }
  const succesSilla = (e) => {
    console.log(e)
    let dato = e.length == 1 ? e[0].idsilla : e
    if (useradmin.perfil == 'suscriptores') return
    console.log(list.find(f => f.silla == e))
    let datos = list.find(f => f.silla == e)
    if (datos.estado == 'none') return
    if (datos.cedula == null || datos.cedula == "" || datos.cedula == undefined) {
      let estado = datos.estado == "Ocupado" ? 'Disponible' : 'Ocupado'
      console.log([datos])
      let me = [datos.idsilla]
      const Botoon = () => datos.estado == "Ocupado" ? <button

        className="btn btn-danger "
        onClick={() => enviarComentario(datos, me)}
      >
        Ver Comentario
      </button> : ""
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Deseas Cambiar el estado "}
          onConfirm={() => enviarLocalidad("" + estado, me)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Si, Continuar"
          cancelBtnText="Cancelar"
          closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-primary"
                onClick={() => hideAlert()}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success"
                onClick={() => enviarLocalidad("" + estado, me)}
              >
                Si, Continuar
              </button>
              <Botoon />
            </React.Fragment>
          }
          showCancel>
          {"la sillas " + e + " por " + estado}
        </SweetAlert>)
    }
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
              enviarsillas={() => enviarsillas(text)} />;
        }
      })()}
    </div>
  );
}

export default MesasViews