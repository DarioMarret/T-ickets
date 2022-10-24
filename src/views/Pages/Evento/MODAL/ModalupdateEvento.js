import React, { useEffect, useState } from "react";
import { Modal, Alert, OverlayTrigger, Tooltip } from "react-bootstrap"
import { ListarLocalidad, ListarEspacios, GuardarEvento, ActualizarLocalidad } from "utils/Querypanel.js";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import moment from "moment";
import { Obtenerlinkimagen } from "utils/Querypanel";
const Modalupdate = (props) => {
    const { show, Setshow, evento } = props;
    let usedispatch = useDispatch()

    let user = clienteInfo()

    const [alertnone, showAlernone] = useState("d-none")
    const [espacios, setListaEspa] = useState([])
    /*informacion de los enventos nuevos */
    const [neweventos, setNewEventos] = useState(
        {
            nombreConcierto: '',
            fechaConcierto: '',
            horaConcierto: '',
            lugarConcierto: '',
            cuidadConcert: '',
            descripcionConcierto: '',
            imagenConcierto: '',
            fechacreacion: '',
            idUsuario: "" + user.id,
        })
    const [precios, setPrecios] = useState({
        localodad: '',
        precio_normal: 0,
        precio_discapacidad: 0,
        precio_tarjeta: 0,
        precio_descuento: 0,
        id: '',
        localodad: '',
        habilitar_cortesia: 0
    })
    const [selectLocalidad, setLocalidad] = useState([])
    async function Lista() {
        const datos = await ListarLocalidad()
        const cargarLista = await ListarEspacios()

        const { success, data } = cargarLista
        console.log(data)
        if (success) {
            setListaEspa(data)
            // setLocalidades(datos.data)
        }
    }
    function toggleValueInArray(value) {
        //copia de array de localidades
        let ArrayCopia = selectLocalidad;
        console.log("datos", value, selectLocalidad)
        var index = ArrayCopia.findIndex(obj => obj.id == value.id);

        if (index == -1) {
            ArrayCopia.push(value);
        } else {
            ArrayCopia[index] = { ...value }
        }
        setLocalidad(ArrayCopia)
        console.log(ArrayCopia)
        setPrecios({
            localodad: '',
            precio_normal: 0,
            precio_discapacidad: 0,
            precio_tarjeta: 0,
            precio_descuento: 0,
            habilitar_cortesia: 0
        })
    }





    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789,.".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });

    function handelchangeComposeventos(e) {

        if (e.name == "imagenConcierto") {
            let img = new Image()
            img.src = window.URL.createObjectURL(e.files[0])
            img.onload = () => {

                if (img.width < 750 || img.height < 500) {
                    e.value = ""
                    setNewEventos({ ...neweventos, imagenConcierto: '' })
                    usedispatch(setToastes({ show: true, message: 'Las dimensión de la imagen no es validad, necesita un alto de 500px y un ancho minimo de 750px', color: 'bg-warning', estado: 'Advertencia' }))
                }
                else setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
            }
            img.onerror = () => {
                setNewEventos({ ...neweventos, imagenConcierto: '' })

            }

        } else {
            setNewEventos({
                ...neweventos,
                [e.name]: e.value,
            })
        }
    }


    function soloSelectespacio(e) {
        let array = selectLocalidad
        var index = array.findIndex(obj => obj.localodad == e.value);
        console.log(array)
        console.log(array[index])
        setPrecios({
            precio_normal: array[index] ? array[index].precio_normal : '',
            precio_discapacidad: array[index] ? array[index].precio_discapacidad : '',
            precio_tarjeta: array[index] ? array[index].precio_tarjeta : '',
            precio_descuento: array[index] ? array[index].precio_descuento : '',
            habilitar_cortesia: array[index] ? array[index].habilitar_cortesia : '',
            id: array[index] ? array[index].id : '',
            localodad: array[index] ? array[index].localodad : '',
        })
    }
    function handelchangeLocalidad(e) {
        setPrecios({
            ...precios,
            [e.name]: e.value,
        })
    }
    function Agregarprecios() {
        toggleValueInArray(precios)
        showAlernone("")
        setTimeout(() => {
            showAlernone("d-none")
        }, "1500")
    }
    async function Actualizar() {
        if (neweventos.imagenConcierto == evento.imagenConcierto) {
            console.log(neweventos)
            let guarda = {
                ...neweventos,
                estado: "PROCESO",
                "LocalodadPrecios": selectLocalidad
            }
            console.log(guarda)
            try {
                const actualiza = await ActualizarLocalidad(evento.codigoEvento, guarda)
                // console.log(actualiza)
                if (actualiza.success) {
                    Setshow(false)
                    usedispatch(setToastes({ show: true, message: 'Datos del evento Actalizados', color: 'bg-success', estado: 'Actualizado' }))
                }
                else {
                    usedispatch(setToastes({ show: true, message: 'Hubo un error no se actualizaron los datos', color: 'bg-danger', estado: 'Error  ' }))
                }
            } catch (error) {
                usedispatch(setToastes({ show: true, message: "" + error, color: 'bg-danger', estado: 'Error' }))
                console.log(error)
            }
        } else {
            try {
                const link = await Obtenerlinkimagen(neweventos.imagenConcierto)
                if (link == null) return
                let info = {
                    ...neweventos,
                    imagenConcierto: link,
                    estado: "PROCESO",
                    "LocalodadPrecios": selectLocalidad
                }
                const actualiza = await ActualizarLocalidad(evento.codigoEvento, info)
                if (actualiza.success) {
                    Setshow(false)
                    usedispatch(setToastes({ show: true, message: 'Datos de evento Actalizados', color: 'bg-success', estado: 'Actualizado' }))
                }
                else {
                    usedispatch(setToastes({ show: true, message: 'Hubo un error no se actualizaron los datos', color: 'bg-danger', estado: 'Error  ' }))
                }
            } catch (error) {
                usedispatch(setToastes({ show: true, message: "" + error, color: 'bg-danger', estado: 'Error' }))
                console.log(error)

            }

        }

    }

    useEffect(() => {
        setNewEventos(
            {
                nombreConcierto: evento.nombreConcierto ? evento.nombreConcierto : '',
                fechaConcierto: evento.fechaConcierto ? new Date(evento.fechaConcierto).toISOString().slice(0, 10) : '',
                horaConcierto: evento.horaConcierto ? evento.horaConcierto : '',
                lugarConcierto: evento.lugarConcierto ? evento.lugarConcierto : '',
                cuidadConcert: evento.cuidadConcert ? evento.cuidadConcert : '',
                descripcionConcierto: evento.descripcionConcierto ? evento.descripcionConcierto : '',
                fechaCreacion: evento.fechaCreacion ? evento.fechaCreacion : '',
                imagenConcierto: evento.imagenConcierto ? evento.imagenConcierto : '',
                idUsuario: "" + user.id,
            })
        setLocalidad(evento.LocalodadPrecios)
        //   console.log(neweventos)
        // console.log(Object.values(neweventos).every((d) => d))
    }, [show])
    return (
        <Modal
            show={show}
            size='lg'
            onHide={() => Setshow(false)}
        >
            <Modal.Header >
                <h5>Editar datos del Evento</h5>
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
                                    <label className="form-label">Hora</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                        </div>
                                        <input type="time" className="form-control" id="horaConcierto" name="horaConcierto"
                                            value={moment(neweventos.horaConcierto, ["h:mm A"]).format("HH:mm")}
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="hora del evento" />
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
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            placeholder="Imagen del concierto" />

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
                                            id="cuidadConcert" placeholder="Ciudad " />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Descriptión </label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-bookmark"></i>
                                            </span>
                                        </div>
                                        <input type="text" name="descripcionConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            value={neweventos.descripcionConcierto}
                                            id="descripcionConcierto" placeholder="Descriptión del concierto" />

                                    </div>
                                </div>


                                <div className="col-12 col-md-12">
                                    <label className="form-label"> {neweventos.imagenConcierto ? "Hay una imagen Cargada " : "Seleccione una imagen"}</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="imagenConcierto" placeholder="Imagen del concierto" />

                                    </div>
                                </div>

                            </div>




                            <div className="col-12">

                                <h3>Precios de Localidades </h3>
                                <div className="d-flex flex-wrap">
                                    <div className="input-group mb-3 col-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-map"></i></span>
                                        </div>
                                        <select className="form-control" name="localodad" value={precios.localodad} onChange={(e) => soloSelectespacio(e.target)}>
                                            <option value={""}>Seleccione localidad</option>
                                            {selectLocalidad.map((e, i) => {
                                                <option></option>
                                                return (
                                                    <option value={e.localodad} key={i + "op" + e.localodad}>{e.localodad}</option>
                                                )
                                            })


                                            }

                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <button className="numero btn btn-success" onClick={(e) => Agregarprecios()} disabled={!Object.values(precios).every((e) => e)} >  Actualizar precios</button>
                                    </div>
                                    <div className="col-6">
                                        <Alert className={alertnone} variant="success">
                                            Precios actualizados a la Localidad

                                        </Alert>

                                    </div>
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >PRECIO NORMAL</label>
                                    </div>
                                    <input className="numero form-control col-6" value={precios.precio_normal} name="precio_normal" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >PRECIO DISCAPACIDA</label>
                                    </div>
                                    <input className="numero form-control col-6" value={precios.precio_discapacidad} name="precio_discapacidad" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >PRECIO TC/TD </label>
                                    </div>
                                    <input className="numero form-control col-6" value={precios.precio_tarjeta} name="precio_tarjeta" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >PRECIO DESCUENTO </label>
                                    </div>
                                    <input className="numero form-control col-6" value={precios.precio_descuento} name="precio_descuento" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >HABILITAR CORTESIA </label>
                                    </div>
                                    <input className="numero form-control col-6" value={precios.habilitar_cortesia} name="habilitar_cortesia" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>

                            </div>



                        </div>



                    </div>
                </div>
                <div className="d-flex modal-footer justify-content-end align-items-end">
                    <button className="btn btn-success" disabled={!Object.values(neweventos).every((d) => d)} onClick={Actualizar}>Actualizar</button>

                </div>


            </Modal.Body>





        </Modal>)

}
export default Modalupdate