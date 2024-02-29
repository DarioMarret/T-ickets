import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatearNumero } from "utils/Emails";
import { EnviaWhast } from "utils/Emails";
import { Obtenerlinkimagen } from "utils/Querypanel";


export default function WhastappWiev() {
    let [estado, setEstad] = useState(false);
    let [disan, setDisanbe] = useState(false)
    let usedispacth = useDispatch();
    let datos = useSelector(state => state.SuscritorSlice.modal)
    let [info, setDatos] = useState({
        mensaje: "",
        link: ""
    })
    function Cambiar(e) {
        //  console.log(e.name,e.value)
        if (e.name == "link") {
            setDatos({
                ...info,
                [e.name]: e.files
            })
            console.log(e.name, e.files)
            return
        }
        setDatos({
            ...info,
            [e.name]: e.value
        })
    }
    function onChange(e) {

        setEstad(e.checked)
    }
    async function Enviarmensajeadjunto() {
        let Celular = datos.estado["movil"].replace(/\s+/g, '').length == 10 ? datos.estado["movil"].replace(/\s+/g, '').slice(1) : datos.estado["movil"].replace(/\s+/g, '')
        console.log(formatearNumero(Celular), Celular)
        if (formatearNumero(Celular) == undefined) {
            usedispacth(setToastes({ show: true, message: 'Formato de celular incorrecto', color: 'bg-danger', estado: 'invalido' }))
            return
        }
        if (info.mensaje.trim() == "" || info.mensaje == undefined) {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }

        if (info.link == undefined || info.link[0] == undefined) {
            usedispacth(setToastes({ show: true, message: 'Adjunte una imagen ', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        console.log(info.mensaje, info.link[0])
        setDisanbe(true)
        const link = await Obtenerlinkimagen(info.link[0])
        console.log(link)
        if (link == null) {
            setDisanbe(false)
            usedispacth(
                setToastes({
                    show: true,
                    message: 'La imagen no se pudo leer Comuníquese con un accesor al número +593980008000',
                    color: 'bg-warning',
                    estado: 'Hubo un error'
                }))
            return;
        }
        setDisanbe(true)
        setTimeout(function () {
            let informa = {
                "sessionName": "1_tickets_prueba19177232201",
                "numero": [formatearNumero(Celular)],
                "mensaje": {
                    "type": "text",
                    "text": info.mensaje + " " + link,
                }
            }
            /* let informa = {
             "user_ids": [formatearNumero(Celular)],
             "message": info.mensaje,
             "link": link
         }*/
            console.log(informa)
            EnviaWhast(informa).then(sal => {
                //sal.status == "PENDING"
                if (sal) {
                    usedispacth(setToastes({ show: true, message: 'Mensaje enviado con éxito', color: 'bg-success', estado: 'Datos vacios' }))
                    usedispacth(setModal({ nombre: "", estado: "" }))
                    setDisanbe(false)
                } else {
                    usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                    setDisanbe(false)
                }
                console.log(sal)
            }).catch(err => {
                usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                setDisanbe(false)
                console.log(err)
            })
        },
            1000)

    }
    function EnviarMendaje() {

        let Celular = datos.estado["movil"].replace(/\s+/g, '').length == 10 ? datos.estado["movil"].replace(/\s+/g, '').slice(1) : datos.estado["movil"].replace(/\s+/g, '')
        console.log(formatearNumero(Celular), Celular)
        if (formatearNumero(Celular) == undefined) {
            usedispacth(setToastes({ show: true, message: 'Formato de celular incorrecto', color: 'bg-danger', estado: 'invalido' }))
            return
        }
        if (info.mensaje.trim() == " ") {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        console.log(datos.estado["movil"])
        let informa = {
            "sessionName": "1_tickets_prueba19177232201",
            "numero": [formatearNumero(Celular)],
            "mensaje": {
                "type": "text",
                "text": info.mensaje
            }
        }
        console.log(informa)
        setDisanbe(true)
        EnviaWhast(informa).then(sal => {
            if (sal) {
                usedispacth(setToastes({ show: true, message: 'Mensaje enviado con éxito', color: 'bg-success', estado: 'Datos vacios' }))
                usedispacth(setModal({ nombre: "", estado: "" }))
                setDisanbe(false)
            } else {
                usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                setDisanbe(false)
            }
            console.log(sal)
        }).catch(err => {
            usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
            setDisanbe(false)
            console.log(err)
        })

    }
    async function EnviarmensajeadjuntoMasivo() {
        //let Celular = datos.estado["movil"].replace(/\s+/g, '').length == 10 ? datos.estado["movil"].replace(/\s+/g, '').slice(1) : datos.estado["movil"].replace(/\s+/g, '')

        if (info.mensaje.trim() == "" || info.mensaje == undefined) {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }

        if (info.link == undefined || info.link[0] == undefined) {
            usedispacth(setToastes({ show: true, message: 'Adjunte una imagen ', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        console.log(info.mensaje, info.link[0])
        setDisanbe(true)
        const link = await Obtenerlinkimagen(info.link[0])
        console.log(link)
        if (link == null) {
            setDisanbe(false)
            usedispacth(
                setToastes({
                    show: true,
                    message: 'La imagen no se pudo leer Comuníquese con un accesor al número +593980008000',
                    color: 'bg-warning',
                    estado: 'Hubo un error'
                }))
            return;
        }
        setDisanbe(true)
        setTimeout(function () {
            let informa = {
                "sessionName": "1_tickets_prueba19177232201",
                "numero": [...datos.estado],
                "mensaje": {
                    "type": "text",
                    "text": info.mensaje + " " + link,
                }
            }
            EnviaWhast(informa).then(sal => {
                if (sal) {
                    usedispacth(setToastes({ show: true, message: 'Mensaje enviado con éxito', color: 'bg-success', estado: 'Datos vacios' }))
                    usedispacth(setModal({ nombre: "", estado: "" }))
                    setDisanbe(false)
                } else {
                    usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                    setDisanbe(false)
                }
                console.log(sal)
            }).catch(err => {
                usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                setDisanbe(false)
                console.log(err)
            })
        },
            1000)

    }
    function EnviarMendajeMasivo() {

        // let Celular = datos.estado["movil"].replace(/\s+/g, '').length == 10 ? datos.estado["movil"].replace(/\s+/g, '').slice(1) : datos.estado["movil"].replace(/\s+/g, '')
        /* console.log(formatearNumero(Celular),Celular)
         if (formatearNumero(Celular)==undefined){
             usedispacth(setToastes({ show: true, message: 'Formato de celular incorrecto', color: 'bg-danger', estado: 'invalido' }))
             return 
         }*/
        if (info.mensaje.trim() == " ") {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        //console.log(datos.estado["movil"])

        let informa = {
            "sessionName": "1_tickets_prueba19177232201",
            "numero": [...datos.estado],
            "mensaje": {
                "type": "text",
                "text": info.mensaje,
            }
        }
        console.log(informa)
        setDisanbe(true)

        EnviaWhast(informa).then(sal => {
            if (sal) {
                usedispacth(setToastes({ show: true, message: 'Mensaje enviado con éxito', color: 'bg-success', estado: 'Datos vacios' }))
                usedispacth(setModal({ nombre: "", estado: "" }))
                setDisanbe(false)
            } else {
                usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
                setDisanbe(false)
            }
            console.log(sal)
        }).catch(err => {
            usedispacth(setToastes({ show: true, message: 'Hubo un error no se envió el mensaje por favor verifique el número celular', color: 'bg-success', estado: 'Datos vacios' }))
            setDisanbe(false)
            console.log(err)
        })

    }




    useEffect(() => {
        /*$(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                scroll: false,
                containment: "#root",
            })
        })*/
    }, [(datos.nombre == "whastapp" || datos.nombre == "masivos")])
    return (
        <>
            <Modal
                show={(datos.nombre == "whastapp" || datos.nombre == "masivos")}>
                <Modal.Header className="p-3">
                    <h5>Enviar mensaje</h5>
                    <button className="close" onClick={() => usedispacth(setModal({ nombre: "", estado: "" }))}>X</button>

                </Modal.Header>
                <Modal.Body>
                    <div className="">

                    </div>
                    <div className=" row">
                        <div className="invoice-from">
                            <small>Para:</small>
                            <div className="m-t-5 m-b-5">
                                <strong className="text-inverse">{datos.nombre == "whastapp" ? datos.estado["nombreCompleto"] : "total de números masivos " + datos.estado.length}</strong>
                                {datos.nombre == "whastapp" ? <small>
                                    <br></br>
                                    Celular:{datos.estado["movil"]} <br></br>

                                </small> : ""}
                            </div>

                        </div>
                        <textarea
                            name="mensaje"
                            onChange={(e) => Cambiar(e.target)}
                            className=" form-control"
                            style={{ height: 150 }}
                        />
                        <div>
                            <label className="d-flex   align-content-center">
                                <span className="mr-1 ">Agregar imagen</span>
                                <Form.Check
                                    type="switch"
                                    id="edita-evento"
                                    checked={estado}
                                    className="mt-1"
                                    onChange={(e) => onChange(e.target)}
                                />

                            </label>
                        </div>
                        {
                            !estado ? "" : <input name="link" type="file" accept="image/*" onChange={(e) => Cambiar(e.target)} className=" form-control"></input>
                        }
                    </div>
                    <div className="container pt-2">
                        {!estado ? <button className=" btn btn-danger  float-right" disabled={disan} onClick={datos.nombre == "whastapp" ? EnviarMendaje : EnviarMendajeMasivo}>
                            <i className=" fa fa-send" ></i>
                        </button> :
                            <button className=" btn btn-success  float-right" disabled={disan} onClick={datos.nombre == "whastapp" ? Enviarmensajeadjunto : EnviarmensajeadjuntoMasivo}>
                                <i className=" fa fa-send"></i>
                            </button>}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}