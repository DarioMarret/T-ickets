import React, { useEffect, useState } from "react";
import { Modal, Alert, OverlayTrigger, Tooltip, Form } from "react-bootstrap"
import { Localidades } from "utils/constantes";
import {  GuardarEvento } from "utils/Querypanel.js";
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
import { ListarEspacios } from "utils/EspaciosQuery/index.js";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { listarLocalidadaEspeci } from "utils/Querypanelsigui";
import { ListarEventos } from "utils/Querypanel";
import { ListaPreciosEvent } from "utils/EventosQuery";
const ModalNewEvento = (props) => {
    const { show, Setshow } = props;
    let user = clienteInfo()
    let usedispatch = useDispatch()
    const [alertnone, showAlernone] = useState("d-none")
    const [espacios, setListaEspa] = useState([])
    //Array donde se crearan las localidades con sus precios
    const [localidadPreci, setPreLocalidad] = useState([])
    const [localidad, setLocalidades] = useState([])
    const [inputdisable, setinput] = useState(false)
    const [localidadfiltrada, setFiltra] = useState([])
    const [selectLocalidad, setLocalidad] = useState([])
    async function Lista() {
        const datos = await ListarLocalidad()
        const cargarLista = await ListarEspacios()
        const eventos = await ListarEventos()

        const { success, data } = cargarLista
        //console.log(data)
        if (success) {

            console.log(data)
            setListaEspa(data)
            setLocalidades(datos.data)
        }
    }
    const ListaPrecios = async () => {
        const info = await ListaPreciosEvent();
        console.log(info)
        //ListaPrecio()
        return info
    }
    function toggleValueInArray(array, value) {
        //copia de array de localidades
        console.log(value)
        let ArrayCopia = array;
        console.log(ArrayCopia)
        let arr = selectLocalidad
        console.log(arr)
        var index = ArrayCopia.findIndex(obj => obj.identificador == value.identificador);
        var i = arr.findIndex(obj => obj.id == value.identificador);
        //console.log(value, array)
        //console.log(arr[i])
        if (index == -1) {
            ArrayCopia.push({ ...value, identificador: arr[i].id, tipo: arr[i].mesas_array });
        } else {
            ArrayCopia[index] = { ...value }
        }
        setPreLocalidad(ArrayCopia)
        setPrecios({
            localidad: '',
            identificador: '',
            precio_normal: '',
            precio_discapacidad: '',
            precio_tarjeta: '',
            precio_descuento: '',
            habilitar_cortesia: '',
            comision_boleto: ''
        })
        console.log(ArrayCopia)
    }

    async function gaurdaPrueba() {
        setinput(true)
        try {
            console.log(neweventos)
            //const mapa = await Obtenerlinkimagen(neweventos.mapaConcierto)codigo: neweventos.autorizacion == "preventa" ? 'preventa' : neweventos.codigo,
            const conci = await Obtenerlinkimagen(neweventos.imagenConcierto)

            if (conci == null) {
                console.log(conci, "mapa")
                usedispatch(setToastes({ show: true, message: 'Imagen no se creo', color: 'bg-success', estado: 'Guardado' }))

                return
            }
            setTimeout(async function () {
                const mapa = await Obtenerlinkimagen(neweventos.mapaConcierto)
                if (mapa == null) {
                    console.log(conci, "mapa")
                    usedispatch(setToastes({ show: true, message: 'Imagen mapa no se creo', color: 'bg-success', estado: 'Guardado' }))
                    return
                }
                let defauldata = {
                    ...neweventos,
                    imagenConcierto: conci,

                    mapaConcierto: mapa,
                    estado: "ACTIVO",
                    "LocalodadPrecios": [
                        ...localidadPreci
                    ]
                }
                const evento = await GuardarEvento(defauldata)
                console.log(defauldata)
                if (evento.success) {
                    console.log(evento)
                    ListaPrecios()
                    usedispatch(setToastes({ show: true, message: 'Evento guardado correctamente', color: 'bg-success', estado: 'Guardado' }))
                    setinput(false)
                    Setshow(false)
                }


            }, 3000)


        } catch (error) {
            console.log(error)
            usedispatch(setToastes({ show: true, message: 'No se guardaron los datos del evento', color: 'bg-danger', estado: 'Hubo un error' }))
            setinput(false)
        }

    }


    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789,.".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    const [neweventos, setNewEventos] = useState(
        {
            nombreConcierto: '',
            fechaConcierto: '',
            horaConcierto: '',
            lugarConcierto: '',
            cuidadConcert: '',
            descripcionConcierto: '',
            imagenConcierto: '',
            idUsuario: '' + user.id,
            mapaConcierto: ''
        })
    function handelchangeComposeventos(e) {
        let img = new Image()
        if (e.name == "imagenConcierto") {
            setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
            /* 
             img.src = window.URL.createObjectURL(e.files[0])
             img.onload = () => {
                 setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
                  if (img.width < 750 || img.height < 500) {
                      e.value = ""
                      usedispatch(setToastes({ show: true, message: 'La dimensión de la imagen no es validad, necesita un alto mínimo de 500px y máximo 600px, un ancho mínimo de 750px y máximo de 900px', color: 'bg-warning', estado: 'Advertencia' }))
                  }
                  if (img.width > 900 || img.height > 620) {
                      e.value = ""                                                                                                    // alto de 3662px y un ancho minimo de 13830px
                      usedispatch(setToastes({ show: true, message: 'La dimensión de la imagen no es validad, necesita un alto mínimo de 3662px y máximo 3762px, un ancho mínimo de 750px y máximo de 900px', color: 'bg-warning', estado: 'Advertencia' }))
                  } else setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
             }
             img.onerror = () => {
                 setNewEventos({ ...neweventos, imagenConcierto: '' })
             }*/
        } else if (e.name == "mapaConcierto") {
            setNewEventos({ ...neweventos, mapaConcierto: e.files[0] ? e.files[0] : '' })
            /* 
              img.src = window.URL.createObjectURL(e.files[0])
              img.onload = () => {
                  setNewEventos({ ...neweventos, mapaConcierto: e.files[0] ? e.files[0] : '' })
                  /* if (img.width < 13830 || img.height < 3662) {
                       e.value = ""
                       setNewEventos({ ...neweventos, imagenConcierto: '' })
                       usedispatch(setToastes({ show: true, message: 'Las dimensión de la imagen no es validad, necesita un alto de 3662px y un ancho minimo de 13830px', color: 'bg-warning', estado: 'Advertencia' }))
                   }
                   else setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })*
              }
              img.onerror = () => {
                  setNewEventos({ ...neweventos, mapaConcierto: '' })
              }*/
        } else if (e.name == "autorizacion") {
            setNewEventos({
                ...neweventos,
                [e.name]: e.value,
                codigo: e.value == "preventa" ? 'preventa' : '',
            })
        }
        else {
            setNewEventos({
                ...neweventos,
                [e.name]: e.value,
            })
        }
    }
    const [precios, setPrecios] = useState(
        {
            localidad: '',
            identificador: '',
            precio_normal: '',
            precio_discapacidad: '',
            precio_tarjeta: '',
            precio_descuento: '',
            habilitar_cortesia: '',
            comision_boleto: '',
            habilitar: "NO",
        }
    )
    function handelchange(e) {
        if (e.value != "") {

            ListarLocalidad("").then(oupt => {
                //console.log(oupt.data.filter(f => f.id_espacio == e.value), e.value)
                setLocalidad(oupt.data.filter(f => f.id_espacio == e.value))
                setPreLocalidad([])
                setPrecios({
                    localidad: '',
                    precio_normal: 0,
                    identificador: '',
                    precio_discapacidad: 0,
                    precio_tarjeta: 0,
                    precio_descuento: 0,
                    habilitar_cortesia: 0,
                    comision_boleto: 0,
                    habilitar: "NO",
                })
            }
            ).catch(err =>
                console.log(err))

            var index = espacios.find(obj => obj.id == e.value);
            setNewEventos({
                ...neweventos,
                lugarConcierto: index.nombre,
            })
        } else { setLocalidad([]) }

    }
    function soloSelectespacio(e) {
        var index = localidadPreci.filter(obj => obj.identificador == e.value)[0];
        console.log(e.value)
        console.log(selectLocalidad)
        var dato = selectLocalidad.find(D => D.id == e.value)
        console.log(dato.nombre, index, localidadPreci.filter(obj => obj.identificador == e.value))
        if (dato != undefined) {
            setPrecios({
                precio_normal: index!=undefined ? index.precio_normal : 0,
                precio_discapacidad: index != undefined ? index.precio_discapacidad : 0,
                precio_tarjeta: index != undefined ? index.precio_tarjeta : 0,
                precio_descuento: index != undefined ? index.precio_descuento : 0,
                habilitar_cortesia: index != undefined ? index.habilitar_cortesia : 0,
                localidad: dato.nombre,
                comision_boleto: index != undefined ? index.comision_boleto : 0,
                habilitar: index != undefined ? index.habilitar : "NO",
                identificador: e.value,
            })
            //console.log(precios)
        }
        else{
            
        }
    }
    function handelchangeLocalidad(e) {
        if (e.name == "habilitar") {
            setPrecios({
                ...precios,
                [e.name]: e.checked,
            })
            return
        }
        setPrecios({
            ...precios,
            [e.name]: e.value,
        })
    }
    function Agregarprecios() {
        toggleValueInArray(localidadPreci, precios)
        showAlernone("")
        setTimeout(() => {
            showAlernone("d-none")
        }, "1500")

    }

    useEffect(() => {
        (async () => {
            await Lista()
        })()
    }, [show])
    return (
        <Modal
            show={show}
            size='lg'
            onHide={() => Setshow(false)}
        >
            <Modal.Header >
                <Modal.Title>Registro Nuevo Evento</Modal.Title>
                <button type="button" className="close"
                    onClick={() => Setshow(false)}>
                    ×
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                        </div>
                                        <input type="text" className="form-control" id="nombreConcierto" name="nombreConcierto"
                                            value={neweventos.nombreConcierto}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="Nombre del evento" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                        </div>
                                        <input className="form-control" id="fechaConcierto" name="fechaConcierto"
                                            value={neweventos.fechaConcierto} type="date"
                                            onChange={(e) => handelchangeComposeventos(e.target)} placeholder="Fecha del evento" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                        </div>
                                        <input type="time" className="form-control" id="horaConcierto" name="horaConcierto"
                                            value={neweventos.horaConcierto}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="hora del evento" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-map"></i></span>
                                        </div>
                                        <select className="form-control" name="localidad" onChange={(e) => handelchange(e.target)} placeholder="Seleccione localidad">
                                            <option value={""}>Seleccione espacio</option>
                                            {espacios.map((e, i) => {
                                                return (
                                                    <option value={e.id} key={i + "n" + e.id}>{e.nombre}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <label className="form-label">Lugar</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-map"></i></span>
                                        </div>
                                        <input type="text" name="lugarConcierto" className="form-control "
                                            value={neweventos.lugarConcierto}
                                            disabled={true}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="" />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Ciudad </label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-map"></i></span>
                                        </div>
                                        <input type="text" name="cuidadConcert" className="form-control "
                                            value={neweventos.cuidadConcert}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="cuidadConcert" placeholder="ciudad del concierto" />

                                    </div>
                                </div>
                                {/*<div className="col-12 col-md-6" >
                                    <label className="form-label">
                                        estado legal
                                    </label>
                                    <select className="form-control" value={neweventos.autorizacion} name="autorizacion" onChange={(e) => handelchangeComposeventos(e.target)} >
                                        <option value=""></option>
                                        <option value="Autorizacion">Autorizacion del sri</option>
                                        <option value="preventa">Preventa</option>
                                    </select>
                                </div>
                                {neweventos.autorizacion != "Autorizacion" ?

                                    <div className="col-12 col-md-6" >
                                        <label className="form-label">
                                            Ingrese autorización
                                        </label>
                                        <input
                                            disabled={true}
                                            className="form-control" value={"preventa"}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            name="codigo" />
                                    </div> :
                                    <div className="col-12 col-md-6" >
                                        <label className="form-label">
                                            Ingrese autorización
                                        </label>
                                        <input className="form-control" name="codigo"
                                            value={neweventos.codigo}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                        />
                                    </div>
                                }*/}
                                <div className="col-12 col-md-12">
                                    <label className="form-label">Descripción </label>
                                    <div className="input-group mb-3">

                                        <input type="text" name="descripcionConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            value={neweventos.descripcionConcierto}
                                            id="descripcionConcierto" placeholder="Descriptión del concierto" />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-12">
                                    <label className="form-label">{neweventos.imagenConcierto ? "Hay una imagen Cargada " : "Seleccione una imagen"}</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="imagenConcierto" placeholder="Imagen del concierto" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <label className="form-label"> {neweventos.mapaConcierto ? "Hay un mapa Cargada " : "Subir imagen del mapa"}</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="mapaConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="mapaConcierto" placeholder="Imagen del mapa" />

                                    </div>
                                </div>
                                { /*  <div className="col-12 col-md-12">
                                    <label className="form-label">selecione una imagen para el carrusel</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="imagenCarrusel" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="Imagen promoción"
                                        />
                                    </div>
                                </div>*/}


                            </div>


                            <div className="input-group mb-3 d-none">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-dollar-sign"></i></span>
                                </div>
                                <input disabled={true} type="text" className="d-none form-control" id="user_id" placeholder="usuario que creo el evento" />
                            </div>
                            {
                                selectLocalidad.length > 0 ?
                                    <div className="col-12">

                                        <h3>Precios de Localidades </h3>
                                        <div className="d-flex flex-wrap">
                                            <div className="input-group mb-3 col-6">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control" name="identificador" value={precios.identificador} onChange={(e) => soloSelectespacio(e.target)}>
                                                    <option value={""}>Seleccione localidad</option>
                                                    {selectLocalidad.map((e, i) => {
                                                        <option></option>
                                                        return (
                                                            <option value={e.id} key={i + "op" + e.nombre}>{e.nombre}</option>
                                                        )
                                                    })


                                                    }

                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <button className="numero btn btn-success" onClick={(e) => Agregarprecios()} disabled={!Object.values(precios).every((e) => e)} >  Agregar precios</button>
                                            </div>
                                            <div className="col-6">
                                                <Alert className={alertnone} variant="success">
                                                    Precios Agregados a la Localidad

                                                </Alert>

                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >PRECIO NORMAL</label>
                                            </div>
                                            <input className="numero form-control col-4" value={precios.precio_normal} name="precio_normal" onChange={(e) => handelchangeLocalidad(e.target)} />
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >PRECIO DISCAPACIDAD</label>
                                            </div>
                                            <input className="numero form-control col-4" value={precios.precio_discapacidad} name="precio_discapacidad" onChange={(e) => handelchangeLocalidad(e.target)} />
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >PRECIO TC/TD </label>
                                            </div>
                                            <input className="numero form-control col-4" value={precios.precio_tarjeta} name="precio_tarjeta" onChange={(e) => handelchangeLocalidad(e.target)} />
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >PRECIO DESCUENTO </label>
                                            </div>
                                            <input className="numero form-control col-4" value={precios.precio_descuento} name="precio_descuento" onChange={(e) => handelchangeLocalidad(e.target)} />
                                            <div className=" d-flex  justify-content-center px-2">

                                                <Form.Check className="py-1 pr-1"
                                                    type="switch"
                                                    id="habilitar"
                                                    name="habilitar"
                                                    value="Stripe"
                                                    checked={precios.habilitar == "NO" && precios.habilitar != true ? false : true}
                                                    onChange={(e) => handelchangeLocalidad(e.target)}
                                                />
                                                <label className=" ">Habilitar Descuento</label>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >HABILITAR CORTESIA </label>
                                            </div>
                                            <input className="numero form-control col-4" value={precios.habilitar_cortesia} name="habilitar_cortesia" onChange={(e) => handelchangeLocalidad(e.target)} />
                                        </div>
                                        <div className="d-flex flex-wrap mb-2">
                                            <div className="px-2 col-4">
                                                <label >Costo de emision </label>
                                            </div>
                                            <input className="numero form-control col-4"
                                                value={precios.comision_boleto} name="comision_boleto" onChange={(e) => handelchangeLocalidad(e.target)} />
                                        </div>

                                    </div> : ""}



                        </div>



                    </div>
                </div>
                <div className="d-flex modal-footer justify-content-end align-items-end">
                    <button type="button" className="btn d-none btn-secondary close-btn" >Salir</button>
                    {selectLocalidad.length > 0 && selectLocalidad.length != localidadPreci.length ?
                        <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar</button> :
                        ""}
                    {!selectLocalidad.length > 0 && Object.values(neweventos).every(e => e) ?
                        <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar</button> :
                        ""}
                    {selectLocalidad.length > 0 && selectLocalidad.length == localidadPreci.length && !inputdisable ?
                        <button disabled={!Object.values(neweventos).every(e => e)}
                            onClick={gaurdaPrueba}
                            className="btn btn-primary close-modal float-rigth">Grabar</button>
                        :
                        ""}
                    {inputdisable ?
                        <button className="btn btn-primary" disabled={true} >
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Guardando</button>
                        : ''

                    }

                </div>


            </Modal.Body>





        </Modal>)

}
export default ModalNewEvento