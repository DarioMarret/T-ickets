import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EnviaWhast } from "utils/Emails";
import { Obtenerlinkimagen } from "utils/Querypanel";


export default function WhastappWiev() {
    let [estado, setEstad] = useState(false);
    let usedispacth = useDispatch();
    let datos = useSelector(state => state.SuscritorSlice.modal)
    let [info, setDatos] = useState({
        mensaje: "",
        link: ""
    })
    function Cambiar(e) {
        setEstad({
            info,
            [e.name]: e.value
        })
    }
    function onChange(e) {
        setEstad(e.checked)
        //   console.log(e.checked)
    }
   async function Enviarmensaje() {
       if (info.mensaje.trim() == "") {
           usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
           return
       }
       if (comproba.link_comprobante[0] == undefined) {
           usedispacth(setToastes({ show: true, message: 'Adjunte una imagen del Comprobante', color: 'bg-danger', estado: 'Datos vacios' }))
           return
       }
        const link = await Obtenerlinkimagen(info.link[0])
        console.log(link)
        if (link == null) {
            usedispacth(
                setToastes({
                    show: true,
                    message: 'La imagen no se pudo leer Comuníquese con un accesor al número +5930969200247',
                    color: 'bg-warning',
                    estado: 'Hubo un error'
                }))
       //     setEstado(false)
            return;
        }
        setTimeout(function(){
            let informa = {
                "phone": datos.estado["movil"],
                "message": info.mensaje,
                "link": link
            }
            EnviaWhast(informa).then(sal => {
                console.log(sal)
            }).cath(err => {
                console.log(err)
            })

        },
        1000)

    }
    function EnviarMendajeadjunto() {
        if (info.mensaje.trim() == "") {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        let informa = {
            "phone": datos.estado["movil"],
             ...info
        }
        EnviaWhast(informa).then(sal => {
            console.log(sal)
        }).cath(err => {
            console.log(err)
        })

    }
    useEffect(() => {
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                scroll: false,
                containment: "#root",
            })
        })
    }, [(datos.nombre == "whastapp")])
    return (
        <>
            <Modal
                show={(datos.nombre == "whastapp")}>
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
                                <strong className="text-inverse">{datos.estado["nombreCompleto"]}</strong>
                                <small>
                                    <br></br>
                                    Celular: 0{datos.estado["movil"]} <br></br>

                                </small>
                            </div>

                        </div>
                        <textarea
                            name="mesaje"
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

                                    className="mt-1"
                                    onChange={(e) => onChange(e.target)}
                                />

                            </label>
                        </div>
                        {
                            !estado ? "" : <input type="file" name="link" accept="image/*" className=" form-control"></input>
                        }
                    </div>
                    <div className="container pt-2">
                        {estado ? <button className=" btn btn-success  float-right">
                            <i className=" fa fa-send"></i>
                        </button> :
                            <button className=" btn btn-success  float-right">
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