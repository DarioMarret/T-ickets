import React, { useEffect, useState } from "react";
import { Modal, Alert, OverlayTrigger, Tooltip, Form } from "react-bootstrap"
import { ListarLocalidad, } from "utils/LocalidadesQuery/index.js";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import moment from "moment";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { actualizarDescription } from "utils/userQuery";
import { ListarEspacios } from "utils/EspaciosQuery/index.js";
const Modalupdate = (props) => {
    const { show, Setshow, evento } = props;
    let usedispatch = useDispatch()
    //console.log(evento)
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
            mapaConcierto: '',
            id_evento: "",

        })
    const [newimagen, setImagen] = useState({
        imagenConcierto: '',
        mapaConcierto: ''
    })
    const [precios, setPrecios] = useState({
        localidad: '',
        precio_normal: 0,
        precio_discapacidad: 0,
        precio_tarjeta: 0,
        precio_descuento: 0,
        id: '',

        habilitar_cortesia: 0,
        comision_boleto: 0,
        habilitar: ""
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
        // console.log("datos", value, selectLocalidad)
        var index = ArrayCopia.findIndex(obj => obj.id == value.id);

        if (index == -1) {
            ArrayCopia.push(value);
        } else {
            ArrayCopia[index] = { ...value }
        }
        setLocalidad(ArrayCopia)
        setPrecios({
            localidad: '',
            precio_normal: 0,
            precio_discapacidad: 0,
            precio_tarjeta: 0,
            precio_descuento: 0,
            habilitar_cortesia: 0,
            comision_boleto: 0,
            habilitar: "NO"

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
        let img = new Image()

        if (e.name == "imagenConcierto") {
            setImagen({ ...neweventos, imagenConcierto: e.files[0] })
            console.log({ imagenConcierto: e.files[0] })
            console.log(e.files)
            img.src = window.URL.createObjectURL(e.files[0])
            //   console.log(window.URL.createObjectURL(e.files[0]))
            //   img.src = window.URL.createObjectURL(e.files[0])
            img.onload = () => {
                setImagen({ ...newimagen, imagenConcierto: e.files[0] })
                // console.log(img.width)
                if (img.width < 1100 || img.height < 400) {
                    e.value = ""
                    setImagen({ ...newimagen, imagenConcierto: e.files[0] })
                    usedispatch(setToastes({ show: true, message: 'Las dimensión de la imagen no es validad, necesita un alto de 3662px y un ancho minimo de 13830px', color: 'bg-warning', estado: 'Advertencia' }))
                }
                else setImagen({ ...newimagen, imagenConcierto: e.files })
            }
            img.onerror = () => {
                setImagen({ ...newimagen, imagenConcierto: '' })
            }
        } else if (e.name == "mapaConcierto") {
            setImagen({ ...neweventos, mapaConcierto: e.files })
            console.log({ mapaConcierto: e.files[0] })
           /*  img.src = window.URL.createObjectURL(e.files[0])
             img.onload = () => {
                  //const mapa = await Obtenerlinkimagen(neweventos.mapaConcierto)
                  console.log(img.width)
                 setImagen({ ...newimagen, mapaConcierto: e.files[0] })
                  console.log(e.value)
                  if (img.width < 400 || img.height < 400) {
                      e.value = ""
                      setImagen({ ...newimagen, imagenConcierto: '' })
                      usedispatch(setToastes({ show: true, message: 'Las dimensión de la imagen no es validad, necesita un alto de 3662px y un ancho minimo de 13830px', color: 'bg-warning', estado: 'Advertencia' }))
                  }
                  else setImagen({ ...newimagen, mapaConcierto: e.files ? e.files[0] : '' })
              }
              img.onerror = () => {
                  setImagen({ ...newimagen, mapaConcierto: '' })
              }*/
        } else {
            setNewEventos({
                ...neweventos,
                [e.name]: e.value
            })

        }

    }
    function soloSelectespacio(e) {
        let array = selectLocalidad
        var index = array.findIndex(obj => obj.localidad == e.value);
        setPrecios({
            precio_normal: array[index] ? array[index].precio_normal : '',
            precio_discapacidad: array[index] ? array[index].precio_discapacidad : '',
            precio_tarjeta: array[index] ? array[index].precio_tarjeta : '',
            precio_descuento: array[index] ? array[index].precio_descuento : '',
            habilitar_cortesia: array[index] ? array[index].habilitar_cortesia : '',
            comision_boleto: array[index] ? array[index].comision_boleto : '',
            habilitar: array[index] ? array[index].habilitar : "NO",
            id: array[index] ? array[index].id : '',
        })
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
        toggleValueInArray(precios)
        showAlernone("")
        setTimeout(() => {
            showAlernone("d-none")
        }, "1500")
    }
    function Actualizar() {
        //        console.log(neweventos)
        let info = {
            "id_evento": neweventos.id_evento,
            "nombreConcierto": neweventos.nombreConcierto,
            "fechaConcierto": neweventos.fechaConcierto,
            "horaConcierto": neweventos.horaConcierto,
            "lugarConcierto": neweventos.lugarConcierto,
            "cuidadConcert": neweventos.cuidadConcert,
            "descripcionConcierto": neweventos.descripcionConcierto,
            "imagenConcierto": neweventos.imagenConcierto,
            "mapaConcierto": neweventos.mapaConcierto
        }
        if (Object.values(neweventos).some(e => e == "")) {
            console.log("aqui llega")
            return
        }
        actualizarDescription(info).then(oup => {
            if (oup.success) {
                Setshow(false)
                window.location.reload()
            }
            //console.log(oup)
        }).catch(err =>
            console.log(err))
        /*if (neweventos.imagenConcierto == evento.imagenConcierto && neweventos.mapaConcierto == evento.mapaConcierto) {
            let guarda = {
                ...neweventos,
                estado: "PROCESO",
                "LocalodadPrecios": selectLocalidad
            }
            try {
                
              //  const actualiza = await ActualizarLocalidad(evento.codigoEvento, guarda)
              /*  if (actualiza.success) {
                    Setshow(false)
                    usedispatch(setToastes({ show: true, message: 'Datos del evento Actalizados', color: 'bg-success', estado: 'Actualizado' }))
                }
                else {
                    console.log("pasa")
                    usedispatch(setToastes({ show: true, message: 'Hubo un error no se actualizaron los datos', color: 'bg-danger', estado: 'Error  ' }))
                }*
            } catch (error) {
                usedispatch(setToastes({ show: true, message: " Hubo un error " + error, color: 'bg-danger', estado: 'Intnete de nuevo' }))
                console.log(error)
            }
        }*/
        /* else if (neweventos.imagenConcierto == evento.imagenConcierto && neweventos.mapaConcierto != evento.mapaConcierto) {
             console.log(neweventos.mapaConcierto)
             const linkmapas = await Obtenerlinkimagen(neweventos.mapaConcierto)
             console.log(linkmapas)
             if (linkmapas == null) {
                 usedispatch(setToastes({ show: true, message: "no se genero link de Imagen",color: 'bg-danger', estado: 'Error' }))
                 return
             }
             console.log(linkmapas)
             let guardados = {
                 ...neweventos,
                 mapaConcierto: linkmapas,
                 estado: "PROCESO",                
                 "LocalodadPrecios": selectLocalidad
             }
             console.log(guardados)
             try {
                 const actualiza = await ActualizarLocalidad(evento.codigoEvento, guardados)
                 if (actualiza.success) {
                     Setshow(false)
                     usedispatch(setToastes({ show: true, message: 'Datos del evento Actalizados', color: 'bg-success', estado: 'Actualizado' }))
                 }
                 else {
                     console.log("pasa")
                     usedispatch(setToastes({ show: true, message: 'Hubo un error no se actualizaron los datos', color: 'bg-danger', estado: 'Error  ' }))
                 }
             } catch (error) {
                 usedispatch(setToastes({ show: true, message: "mapa error" + error, color: 'bg-danger', estado: 'Error' }))
                 console.log(error)
             }
         }*/
        /* else if (neweventos.imagenConcierto != evento.imagenConcierto && neweventos.mapaConcierto == evento.mapaConcierto) {
             const link = await Obtenerlinkimagen(neweventos.imagenConcierto)
             if (link == null) {
                 usedispatch(setToastes({ show: true, message: "" + error, color: 'bg-danger', estado: 'Error' }))
                 return
             }
             setTimeout( async() => {
                 let guarda = {
                     ...neweventos,
                     estado: "PROCESO",
                     imagenConcierto: link,
                     "LocalodadPrecios": selectLocalidad
                 }
                 try {
                     const actualiza = await ActualizarLocalidad(evento.codigoEvento, guarda)
                     if (actualiza.success) {
                         Setshow(false)
                         usedispatch(setToastes({ show: true, message: 'Datos del evento Actalizados', color: 'bg-success', estado: 'Actualizado' }))
                     }
                     else {
                         console.log("pasa")
                         usedispatch(setToastes({ show: true, message: 'Hubo un error no se actualizaron los datos', color: 'bg-danger', estado: 'Error  ' }))
                     }
                 } catch (error) {
                     usedispatch(setToastes({ show: true, message: "" + error, color: 'bg-danger', estado: 'Error' }))
                     console.log(error)
                 }
                 
             }, 1000);
            
         }
         else if (neweventos.imagenConcierto != evento.imagenConcierto && neweventos.mapaConcierto != evento.mapaConcierto) {
             try {
                 console.log(neweventos)
                 if (neweventos.imagenConcierto == " ") {
                     usedispatch(setToastes({ show: true, message: 'no se genero link de Imagen ', color: 'bg-success', estado: 'Guardado' }))
                     return
                 }
                 if (neweventos.mapaConcierto == " ") {
                     usedispatch(setToastes({ show: true, message: 'no se genero link de Imagen ', color: 'bg-success', estado: 'Guardado' }))
                     return
                 }
                 else {
                     console.log(neweventos)
                     const img = await Obtenerlinkimagen(neweventos.imagenConcierto)
 
                     if (img == null) {
 
                         usedispatch(setToastes({ show: true, message: 'no se genero link de Imagen ', color: 'bg-success', estado: 'Guardado' }))
 
                         return
                     }
 
                     setTimeout(async function () {
                         const mapacon = await Obtenerlinkimagen(neweventos.mapaConcierto)
                         if (mapacon == null) {
                             usedispatch(setToastes({ show: true, message: 'Imagen mapa no se creo', color: 'bg-danger', estado: 'Error' }))
                             return
                         }
 
                         let defauldata = {
                             ...neweventos,
                             imagenConcierto: img,
                             mapaConcierto: mapacon,
                             estado: "ACTIVO",
                             "LocalodadPrecios": selectLocalidad
                         }
                         const evento = await ActualizarLocalidad(evento.codigoEvento, defauldata)
                         console.log(defauldata, evento)
                         if (evento.success) {
                             console.log(evento)
                             usedispatch(setToastes({ show: true, message: 'Evento guardado correctamente', color: 'bg-success', estado: 'Guardado' }))
                             setinput(false)
                             Setshow(false)
                             window.location.reload()
                         }
                     }, 2000)
                 }
             } catch (error) {
                 usedispatch(setToastes({ show: true, message: "" + error, color: 'bg-danger', estado: 'Error' }))
                 console.log(error)
 
             }
 
         }*/

    }
    async function ActualizarMapa(e) {
        // console.log(e.target.setatr('disabled') == true)
        e.target.setAttribute('disabled', "true");
        // e.setAttribute('disabled', true);     
        console.log(newimagen.mapaConcierto)     
       // newimagen.mapaConcierto[0] == undefined   
        if (newimagen.mapaConcierto[0] == undefined) {
            usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del los precios', color: 'bg-danger', estado: 'Datos vacios' }))
            e.target.removeAttribute('disabled')
            return
        }
       // let ouput = await Obtenerlinkimagen(newimagen.imagenConcierto[0])
        Obtenerlinkimagen(newimagen.mapaConcierto[0]).then(oup => {
            console.log(oup)
            if (oup!=null) {
                let info = {
                    "id_evento": neweventos.id_evento,
                    "nombreConcierto": neweventos.nombreConcierto,
                    "fechaConcierto": neweventos.fechaConcierto,
                    "horaConcierto": neweventos.horaConcierto,
                    "lugarConcierto": neweventos.lugarConcierto,
                    "cuidadConcert": neweventos.cuidadConcert,
                    "descripcionConcierto": neweventos.descripcionConcierto,
                    "imagenConcierto": neweventos.imagenConcierto,
                    "mapaConcierto": oup
                }
                console.log("aqui", info)
                setTimeout(function () {
                    actualizarDescription(info).then(oup => {
                        if (oup.success) {
                            console.log(oup,info)
                            e.target.removeAttribute('disabled')
                            Setshow(false)
                           // window.location.reload()
                        }
                        //console.log(oup)
                    }).catch(err => {
                        e.target.removeAttribute('disabled')
                        console.log(err)
                    })

                }, 1000)

            }
            let info = {
                "id_evento": neweventos.id_evento,
                "nombreConcierto": neweventos.nombreConcierto,
                "fechaConcierto": neweventos.fechaConcierto,
                "horaConcierto": neweventos.horaConcierto,
                "lugarConcierto": neweventos.lugarConcierto,
                "cuidadConcert": neweventos.cuidadConcert,
                "descripcionConcierto": neweventos.descripcionConcierto,
                "imagenConcierto": neweventos.imagenConcierto,
                "mapaConcierto": oup.link
            }
            console.log("aqui", info)
        }).catch(err => {
            console.log(err)
        })
        console.log("mapa", newimagen)



    }
    async function ActualizarImagen(e) {
        console.log(newimagen.imagenConcierto)
        if (newimagen.imagenConcierto[0] == undefined) {
            usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del evento', color: 'bg-danger', estado: 'Datos vacios' }))
            //  e.target.removeAttribute('disabled')
            return
        }
        let ouput = await Obtenerlinkimagen(newimagen.imagenConcierto[0])
        e.target.setAttribute('disabled', "true");
        console.log(ouput)
        if (ouput) {
            let info = {
                "id_evento": neweventos.id_evento,
                "nombreConcierto": neweventos.nombreConcierto,
                "fechaConcierto": neweventos.fechaConcierto,
                "horaConcierto": neweventos.horaConcierto,
                "lugarConcierto": neweventos.lugarConcierto,
                "cuidadConcert": neweventos.cuidadConcert,
                "descripcionConcierto": neweventos.descripcionConcierto,
                "imagenConcierto": ouput,
                
            }
            console.log(info)
            setTimeout(async function () {
                console.log("actualiza")
                let imgen = await actualizarDescription(info)
                if(imgen.success){
                    window.location.reload()
                }else{
                    usedispatch(setToastes({ show: true, message: 'Hubo un error al actualizar datos', color: 'bg-danger', estado: 'Error al actualizar' }))

                }
               // console.log(imgen)
            }, 1000)
        } else {

        }

        console.log("evento", newimagen)
    }
    function cerrar() {
        setImagen({
            imagenConcierto: '',
            mapaConcierto: ''
        })
        Setshow(false)
    }

    useEffect(() => {
        //  console.log(evento)
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
                mapaConcierto: evento.mapaConcierto ? evento.mapaConcierto : '',
                id_evento: evento.id,
            })
        //  console.log(evento.LocalodadPrecios)
        setLocalidad(evento.LocalodadPrecios)
        //  console.log(neweventos)
        // console.log(Object.values(neweventos).every((d) => d))
    }, [show])
    return (
        <Modal
            show={show}
            size='lg'
            onHide={() => cerrar()}
        >
            <Modal.Header >
                <h5>Editar datos del Evento</h5>
                <button type="button" className="close"
                    onClick={() => cerrar()}>
                    X
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
                                            disabled={true}
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
                                    <label className="form-label">Descripción </label>
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


                                <div className="col-12 col-md-12 d-none">
                                    <label className="form-label"> {neweventos.imagenConcierto ? "Hay una imagen Cargada " : "Seleccione una imagen del concierto"}</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="imagenConcierto" placeholder="Imagen del concierto" />

                                    </div>
                                </div>
                                <div className="col-12 col-md-12 d-none">
                                    <label className="form-label"> {neweventos.mapaConcierto ? "Hay un mapa Cargada " : "Subir imagen del mapa"}</label>
                                    <div className="input-group mb-3">

                                        <input type="file" accept="image/*" name="mapaConcierto" className="form-control "
                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                            id="mapaConcierto" placeholder="Imagen del mapa" />

                                    </div>
                                </div>


                            </div>




                            <div className="col-12 d-none">

                                <h3>Precios de Localidades </h3>
                                <div className="d-flex flex-wrap">
                                    <div className="input-group mb-3 col-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-map"></i></span>
                                        </div>
                                        <select className="form-control" name="localidad" value={precios.localidad} onChange={(e) => soloSelectespacio(e.target)}>
                                            <option value={""}>Seleccione localidad</option>
                                            {selectLocalidad.map((e, i) => {
                                                <option></option>
                                                return (
                                                    <option value={e.localidad} key={i + "op" + e.localidad}>{e.localidad}</option>
                                                )
                                            })


                                            }

                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <button className="numero btn btn-success" onClick={(e) => Agregarprecios()} disabled={!Object.values({ ...precios, habilitar: "NO" }).every((e) => e)} >  Actualizar precios</button>
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
                                    <input className="numero form-control col-4" value={precios.precio_normal} name="precio_normal" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                                <div className="d-flex flex-wrap mb-2">
                                    <div className="px-2 col-4">
                                        <label >PRECIO DISCAPACIDA</label>
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
                                        <label >Comision boleto </label>
                                    </div>
                                    <input className="numero form-control col-4" value={precios.comision_boleto} name="comision_boleto" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>


                            </div>



                        </div>



                    </div>
                </div>
                <div className="d-flex modal-footer justify-content-end align-items-end">
                    <button className="btn btn-success" disabled={false} onClick={(e) => Actualizar(e)}>Actualizar</button>

                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="col-12 col-md-12 ">
                            <label className="form-label"> {neweventos.imagenConcierto ? "Hay una imagen Cargada " : "Seleccione una imagen del concierto"}</label>
                            <div className="input-group mb-3">

                                <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                    onChange={(e) => handelchangeComposeventos(e.target)}
                                    id="imagenConcierto" placeholder="Imagen del concierto" />

                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={ActualizarImagen}>Actualizar imagen de evento</button>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="col-12 col-md-12  ">
                            <label className="form-label"> {neweventos.mapaConcierto ? "Hay un mapa Cargada " : "Subir imagen del mapa"}</label>
                            <div className="input-group mb-3">

                                <input type="file" accept="image/*" name="mapaConcierto" className="form-control "
                                    onChange={(e) => handelchangeComposeventos(e.target)}
                                    id="mapaConcierto" placeholder="Imagen del mapa" />

                            </div>
                        </div>
                        <div className="text-center ">
                            <button className="btn btn-success" onClick={(e) => ActualizarMapa(e)}>Actualizar imagen de precios</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>)

}
export default Modalupdate