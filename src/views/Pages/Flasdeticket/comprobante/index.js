
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { GetValores } from "utils/CarritoLocalStorang";
import { FacturaComnet } from "utils/constantes";
import { carrusel } from "views/Pages/Flasdeticket/imagenstatctic";
let { facilitodos } = carrusel



export default function () {
    let Modalshow = useSelector((state) => state.SuscritorSlice.modal)
    function codigoregistro() {
        const codigoregistro = JSON.parse(sessionStorage.getItem(FacturaComnet))
        if (codigoregistro != null) return { ...codigoregistro }
        else return "00000"
    }

    return (
        <>


            <div id="comprobantepago" className=" col-12 border px-0  d-flex flex-column  ">
                <div className=" d-flex flex-wrap bg-dark  justify-content-center align-items-center   col-12 text-center"
                >
                    <div className="pt-3  text-light"  ><p style={{

                        fontWeight: "bold"
                    }}>Servicio Recaudación   </p></div>
                </div>
                <div className=" d-flex flex-wrap   bg-secondary justify-content-center align-items-center   col-12 text-center"
                    style={{

                        height: 30
                    }}
                >
                    <div className="    text-light "><p> Empres: Comnet - Speed - T-ickets    </p></div>

                </div>
                <div className="row py-2">
                    <div className="col-6 d-flex  justify-content-center">
                        <div>
                            <h5
                                style={{
                                    fontSize: "1.1em",
                                    fontWeight: "bold"
                                }}
                            >
                                CODIGO DE PAGO
                            </h5>
                            <h5 className="text-danger"
                                style={{
                                    fontSize: "1.1em",
                                    fontWeight: "bold"
                                }}
                            >
                                0923980742
                            </h5>
                        </div>
                    </div>
                    <div className="col-6 d-flex  justify-content-center">
                        <div>
                            <h5
                                style={{
                                    fontSize: "1.1em",
                                    fontWeight: "bold"
                                }}
                            >
                                MONTO A PAGAR
                            </h5>
                            <h5 className="text-danger"
                                style={{
                                    fontSize: "1.1em",
                                    fontWeight: "bold"
                                }}
                            >
                                {Modalshow.nombre == "ordendepago" ? "$" + parseFloat(codigoregistro().total).toFixed(2) : ''}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}