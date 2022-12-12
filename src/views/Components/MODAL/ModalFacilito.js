import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { carrusel } from "views/Pages/Flasdeticket/imagenstatctic";
let { facilitodos } = carrusel

export default function ModalFacilitoView() {
    let usedispatch = useDispatch()
    let Modalshow = useSelector((state) => state.SuscritorSlice.modal)
    //console.log(Modalshow)
    const Cerrar = () => usedispatch(setModal({ nombre: '', estado: '' }))
    return (
        <>
            <Modal
                show={Modalshow.nombre == "ordendepago" ? true : false}
                size="lg">
                <Modal.Header>
                    <button className="close" onClick={Cerrar}> x</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row border">
                        <div className=" col-6 py-2">
                            <img src={facilitodos} className=""
                                style={{
                                    height: 50
                                }}
                            ></img>
                        </div>
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <h3>Información para tu pago</h3>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="d-flex   flex-column">
                            <div className="col-8">
                                <h4 style={{ fontSize: '0.9em' }}>orden Generada correctamente: 777 </h4>
                            </div>
                            <div className=" d-flex  flex-wrap  justify-content-center">
                                <div className="col-12  d-flex justify-content-center">
                                    <h5>¡Estas a punto de finalizar tu compra en t-ickets.com!</h5>
                                </div>
                                <div className=" col-9 border px-0  d-flex flex-column  ">
                                    <div className=" d-flex flex-wrap  justify-content-center align-items-center   col-12 text-center"
                                        style={{
                                            backgroundColor: "#A6A6A6"
                                        }}
                                    >
                                        <div className="pt-3"><p> <strong>Servicio Recaudación </strong>   </p></div>
                                    </div>
                                    <div className=" d-flex flex-wrap  justify-content-center align-items-center   col-12 text-center"
                                        style={{
                                            backgroundColor: "#C2C1C1",
                                            height: 30
                                        }}
                                    >
                                        <div className=""><p> Empres: Comnet - Speed - T-ickets    </p></div>

                                    </div>
                                    <div className="row ">
                                        <div className="col-6 d-flex  justify-content-center">
                                            <div>
                                                <h5>
                                                    CODIGO DE PAGO
                                                </h5>
                                                <h5 className="text-danger">
                                                    0923980742
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex  justify-content-center">
                                            <div>
                                                <h5>
                                                    MONTO A PAGAR
                                                </h5>
                                                <h5 className="text-danger">
                                                    $38.00
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row py-3 col-9 ">
                                    <div className="col-3 d-flex justify-content-end">
                                        <button className="btn btn-primary">
                                            Enviar a:
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <select className=" form-select">
                                            <option>Seleccione</option>
                                            <option>Whastapp</option>
                                            <option>Correo</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <button className=" btn btn-primary"> imprimir</button>
                                    </div>
                                </div>
                                <div className="  col-9">
                                    <div className="">
                                        <h5>
                                            Como Realizar el Pago
                                        </h5>
                                        <p style={{ fontSize: '0.9em' }}>1. Indica que vas realizar un pago a la empresa: COMNET - SPEED - T-ICKETS</p>
                                        <p style={{ fontSize: '0.9em' }}>   2. Indica el número de cedula del cliente, comprador del boleto</p>
                                        <p style={{ fontSize: '0.9em' }}>    3. Una vez realizado el pago tus boletos llegaran al correo registrado</p>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </Modal.Body>


            </Modal>
        </>
    )
}