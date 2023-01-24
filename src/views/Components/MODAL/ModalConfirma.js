import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Form } from "react-bootstrap";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo } from "utils/CarritoLocalStorang";
import { GetValores } from "utils/CarritoLocalStorang";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { useEffect, useState } from "react";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { PagoRapido } from "utils/Querycomnet";
import SweetAlert from "react-bootstrap-sweetalert";
import { registraPagos } from "utils/pagos/Queripagos";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { cambiarMetodo } from "utils/pagos/Queripagos";
export default function Pagarlink (){
    
    let usedispatch = useDispatch()
    const [estado, setEstado] = useState(false)
    const [alert, setAlert] = useState(null)
    const [spiner, setspiner] = useState("")
    const [comproba, setcomprobante] = useState({
        numeroTransaccion: "",
        link_comprobante: "",
        banco: ""
    })
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
 console.log(modal)

    
    function onhandelChange(e) {
        if (e.name == "comprobante") {
            setcomprobante({
                ...comproba,
                link_comprobante: e.value
            })
        } else {
            setcomprobante({
                ...comproba,
                [e.name]: e.value
            })
        }
    }
 
    async function onSubmitT(e) {
        e.preventDefault();
        if (comproba.numeroTransaccion == "") {
            usedispatch(setToastes({ show: true, message: 'completes toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
      
        if (comproba.link_comprobante == "") {
            usedispatch(setToastes({ show: true, message: 'Escribe numero de lote', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else if ([comproba.banco, comproba.numeroTransaccion].some(e => e)) {
            try {
                setEstado(true)
                //const link = await Obtenerlinkimagen(comproba.link_comprobante[0])
                setTimeout(async function () {
                    const reporte = {
                        "id_usuario": clienteInfo().id,
                        "forma_pago": spiner ,
                        "link_comprobante": comproba.link_comprobante,
                        "id":  modal.estado.id ,
                        "numeroTransaccion": comproba.numeroTransaccion,
                        "cedula":  modal.estado.cedula ,
                        "estado":  "Pagado"
                    }
                   /* registraPagos(reporte).then(ouput => {
                        if (ouput.success) {
                            setEstado(false)
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            usedispatch(setToastes({ show: true, message: 'Su comprobante a sido registrado con exitó ', color: 'bg-success', estado: 'Comprobante registrado' }))
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            setTimeout(function () {
                                window.location.reload()
                            }, 1000)

                        }
                        else {
                            setEstado(false)
                            usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-danger', estado: 'Hubo un error' }))
                        }
                    }).catch(erro => {
                        console.log(erro)
                        setEstado(true)
                        usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: 'Hubo un error, intente mas tarde' }))
                    })*/

                    console.log(reporte)
                    setEstado(false)
                }, 2000)

            } catch (error) {
                console.log(error)

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

  
    return (
        <>

            <Modal
                show={modal.nombre=="canjear"?true:false}
                fullscreen={'md-down'}
                centered
            >
                <Modal.Header className=" d-flex  rounded-top-4 m-0   bg-dark   justify-content-between align-items-center">
                    <div className="d-flex  container   justify-content-center text-center" >
                        <h3 className=" p-2 ">
                            Confirmación de Pago
                        </h3>
                    </div>
                    <div className=" float-left " style={{ marginTop: '-45px' }}>
                        <button type="button" className="text-light" onClick={() => usedispatch(setModal({ nombre: "", estado: "" }))} >
                           X
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body className="d-flex align-items-center row">
                    <div className="container d-flex flex-column col-12 ">
                        <form onSubmit={(e) => onSubmitT(e)} className="was-validated">
                            <div className=" p-1">
                                <div className="d-none text-center"
                                >
                                    <p style={{
                                        fontWeight: "bold"
                                    }}>Tiempo restante <span className=" text-danger"> {intervalo}</span> </p>

                                </div>
                                <h5 className=" font-weight-bold text-danger">Forma de Pago</h5>
                                     <select className="form-select" value={spiner}
                                        onChange={(g) => setspiner(g.target.value)}>
                                        <option value={""} disabled></option>
                                    <option value={"Tarjeta-local"}>Deposito Efectivo facilito</option>
                                        <option value={"Efectivo-local"}>Deposito Efectivo facilito</option>
                                        <option value={"Deposito-local"}>Deposito</option>
                                        <option value={"Transferencia-local"}>Transeferencia</option>
                                    </select>
                                <h5 className="mt-1" style={{ fontSize: "1.0em" }}>
                                    Selecione el banco al que realizó la transferencia
                                </h5>
                                
                            </div>
                            {comproba.banco != "Efectivo" ? <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de comprobante de la transferencia
                                </h5>
                                <input className=" form-control numero"
                                    name="numeroTransaccion"
                                    value={comproba.numeroTransaccion}
                                    required
                                    onChange={(e) => onhandelChange(e.target)}
                                    type={"text"}
                                />
                            </div> :
                                ""}
                           
                         <div className="p-1" >
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        numero de lote
                                    </h5>
                                    <input type="text" name="comprobante" id="comprobante"
                                        required
                                        onChange={(e) => onhandelChange(e.target)}
                                        className="form-control"
                                    />
                                    <span className=" text-danger">Tamaño Maximo de la imagen un  1MB</span>
                                </div>
                            
                            <div className=" p-1 ">
                                {modal.nombre == "confirmar" && !clienteInfo() ? <span>
                                    Una vez confirmado el deposito su ticket sera enviado  {
                                        GetValores() ? "" : GetValores().envio == "correo " ? "al: correo " + getDatosUsuariosLocalStorag().email : "al: Whatsapp " + getDatosUsuariosLocalStorag().whatsapp
                                    }
                                </span> : ''}

                            </div>
                            <div className="d-flex container justify-content-center  flex-column text-center">
                                <div>
                                    {comproba.banco != "Efectivo" && comproba.banco != "transferencia" ?

                                        !estado ? <button className=" btn p-2 btn-success">Confirmar Transferencia</button> : <button disabled className=" btn p-2 btn-success">Confirmar Transferencia</button>

                                        :
                                        ""

                                    }
                                    {
                                        comproba.banco == "transferencia" ? <button className=" btn btn-primary" >Reporte en transferencia </button> : ""
                                    }

                                </div>
                                <div>
                                </div>
                            </div>
                        </form>
                    </div>
                
                    <div className="col-12 text-center">

                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

