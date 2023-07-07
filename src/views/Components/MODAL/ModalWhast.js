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
    let [disan,setDisanbe]= useState(false)
    let usedispacth = useDispatch();
    let datos = useSelector(state => state.SuscritorSlice.modal)
    let [info, setDatos] = useState({
        mensaje: "",
        link: ""
    })
    function Cambiar(e) {
        //  console.log(e.name,e.value)
        if (e.name == "link"){
            setDatos({
                ...info,
                [e.name]: e.files
            })
            console.log(e.name,e.files)
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

        if (info.mensaje.trim() == "" || info.mensaje==undefined) {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
       
        if (info.link == undefined || info.link[0]== undefined) {
            usedispacth(setToastes({ show: true, message: 'Adjunte una imagen ', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        console.log(info.mensaje,info.link[0])
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
                "phone": Celular,
                "message": info.mensaje,
                "link": link
            }
          
            EnviaWhast(informa).then(sal => {
                if (sal.status == 200) {
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
        if (info.mensaje.trim() == " ") {
            usedispacth(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        console.log(datos.estado["movil"])
        let informa = {
            "phone": Celular,
            "mensaje": info.mensaje,
            "link": info.link
        }
        console.log(informa)
        setDisanbe(true)
        EnviaWhast(informa).then(sal => {
            if (sal.status == 200) {
                usedispacth(setToastes({ show: true, message: 'Mensaje enviado con éxito', color: 'bg-success', estado: 'Datos vacios' }))
                usedispacth(setModal({ nombre: "", estado: "" }))
                setDisanbe(false)
            }else{
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
                                    Celular:{datos.estado["movil"]} <br></br>

                                </small>
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
                            !estado ? "" : <input  name="link" type="file" accept="image/*" onChange={(e) => Cambiar(e.target)} className=" form-control"></input>
                        }
                    </div>
                    <div className="container pt-2">
                        {!estado ? <button className=" btn btn-danger  float-right" disabled={disan} onClick={EnviarMendaje}>
                            <i className=" fa fa-send" ></i>
                        </button> :
                            <button className=" btn btn-success  float-right" disabled={disan} onClick={Enviarmensajeadjunto}>
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