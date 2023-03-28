import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";



export default function ModalTickte({ shows, datosperson, setshows }) {

    let [info, setInfo] = useState({
        localidad: "",
        metodo: "",
        cantidad: "",
        protocolo: ""
    })
    function handelchnge(e) {
        setInfo({
            ...info,
            [e.name]: e.value
        })
    }
    function Summit() {
        console.log(info)
        Reserva().then(ouput => {
            console.log(ouput)
            if (ouput[0].token_ocupadas.includes("solicita")) {
                $.alert("Localidad Agotada" + ouput[0].token_ocupadas);
                return
            }
                console.log(ouput[0].token_ocupadas)
                Pagartickt(ouput[0].token_ocupadas, ouput[0].total).then(salida => {
                    console.log(salida[0].estado, salida[0].link_factura)
                    var win = window.open(salida[0].link_factura, '_blank');
                    // Cambiar el foco al nuevo tab (punto opcional)
                    win.focus();
                    $.alert("" + JSON.stringify(salida));
                }).catch(err => {
                    console.log(err)
                })
            

        }).catch(err => {
            console.log(err)
        })
    }
    const Reserva = async () => {
        try {
            let { data } = await axios.get("https://www.ticketfacil.ec/ticket2prueba/ticket/ajax.pventa.php?api_wts=ticketfacil_api&action=get&typedata=evento_valores&data=1102||" + info.localidad + "||" + info.metodo + "||" + info.cantidad + "")

            return data
        } catch (error) {
            return error
        }
    }
    const Pagartickt = async (token, valor) => {
        try {
            let { data } = await axios.get("https://server1.ticketfacil.ec/ticket2/ajax.pventa.php?api_wts=ticketfacil_api&action=create&typedata=factura_api&data=" + datosperson.nombreCompleto + "||" + datosperson.email + "||" + datosperson.cedula + "||" + datosperson.movil + "||" + info.protocolo + "||" + valor + "||" + token + "||1102||" + info.localidad + "||" + info.cantidad + "")
            return data
        } catch (error) {
            return error
        }

    }


    return (
        <>
            <Modal
                show={shows}
                onHide={() => setshows(false)}
            >
                <Modal.Header>
                    <button className="close" onClick={() => setshows(false)}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        </div>
                                        <select className=" form-select" name="localidad" id="localidad"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.localidad}
                                        >
                                            <option value="" >
                                                Seleccione la localidad
                                            </option>
                                            <option value="13782">
                                                GENERAL PREVENTA
                                            </option>
                                            <option value="13788">
                                                GOLDEN BOX PREVENTA
                                            </option>
                                            <option value="13780">
                                                OLD SCHOOL BOX PREVENTA
                                            </option>
                                            <option value="13789">
                                                PALCO PREVENTA
                                            </option>
                                            <option value="13802">
                                                PREFERENCIA PREVENTA
                                            </option>
                                            <option value="13806">
                                                TRIBUNA PREVENTA
                                            </option>
                                            <option value="13805">
                                                URBAN BOX PREVENTA
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        </div>
                                        <select className=" form-select" name="metodo" id="metodo"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.metodo}
                                        >
                                            <option value="">
                                                Seleccione froma de pago
                                            </option>
                                            <option value="1">
                                                Efectivo
                                            </option>
                                            <option value="2">
                                                Tarjeta
                                            </option>
                                            <option value="3">
                                                Deposito
                                            </option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        </div>
                                        <input
                                            id="cantidad"
                                            value={info.cantidad}
                                            onChange={(e) => handelchnge(e.target)}
                                            type="number"
                                            placeholder="Cantidad"
                                            className="form-control"
                                            name="cantidad"
                                            required />
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        </div>
                                        <input id="cedula"
                                            type="text"
                                            className="form-control numero"


                                            value={datosperson.cedula}
                                            name="cedula"
                                            minLength={10}
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese una cédula
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <label className="form-label"><b>Correo</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        </div>
                                        <input id="email"
                                            value={datosperson.email}
                                            className="form-control"
                                            name="email"
                                            required />
                                        <div className="invalid-feedback is-invalid">
                                            Ingrese una Dirección de correo
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label"><b>Nombres</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input id="nombreCompleto"
                                            type="text"
                                            value={datosperson.nombreCompleto}
                                            className="form-control"
                                            name="nombreCompleto"
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese Nombre
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label"><b>Celular</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                        </div>
                                        <input id="movil"
                                            value={datosperson.movil}
                                            type="text"
                                            className="form-control"
                                            name="movil"
                                            minLength={10}
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese un numero de contacto
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><b>Control o protocolo</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-map"></i></span>
                                        </div>
                                        <input id="protocolo"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.protocolo}
                                            type="text"
                                            className="form-control"
                                            name="protocolo"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Ingrese numero de control
                                        </div>

                                    </div>
                                </div>


                            </div>




                        </form>
                        <div className="d-flex flex-wrap  justify-content-end ">


                            <button className="btn btn-success float-right" onClick={Summit} >Agregar</button>


                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}