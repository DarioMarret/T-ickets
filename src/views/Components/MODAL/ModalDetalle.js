import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from "react-bootstrap"
import { GetMetodo } from 'utils/CarritoLocalStorang';
import { Envio } from 'utils/constantes';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { DatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { getCedula } from 'utils/localstore';

function ModalDetalle(props) {
    const { showDetalle, handleDetalleColse,
        listaPrecio, listarCarritoDetalle,
        datosPerson, setPerson, setModalPago,
        setDetalle
    } = props

    const [actualState, changeCheckState] = useState({
        check1: false,
        check2: false,
        check3: false
    });
    const [spinervi, setspiner] = useState("d-none")
    const handleCheckboxChange = (event) => {
        const { name, checked } = event
        if (checked) {
            changeCheckState({
                ...actualState,
                [name]: true
            })
        }
        else {
            changeCheckState({
                ...actualState,
                [name]: false
            })
        }
    }

    function handlePago() {
        setDetalle(!showDetalle)
        setModalPago(true)
    }

    async function Consultacedula() {
    }

    async function handelchange(e) {

        const { value, name } = e;
        setPerson({
            ...datosPerson,
            [name]: value
        })
        if (name === "cedula" && value.length == 10) {
            setspiner("")
            const datos = await getCedula(value)
            if (datos.name) {
                DatosUsuariosLocalStorag({...datos, cedula:value})
                const { name, email } = datos
                setPerson({
                    ...datosPerson,
                    email: email,
                    name: name,
                })
                setspiner("d-none")
            } else {
                setPerson({
                    ...datosPerson,
                    email: '',
                    name: '',
                })
                setspiner("d-none")
            }
        }
    }
    function hanbleDatos(e) {
        setPerson({
            ...datosPerson,
            [e.target.name]: e.target.value
        })
        let datosPersonal = getDatosUsuariosLocalStorag()
        if (datosPersonal !== null) {
            DatosUsuariosLocalStorag({
                ...datosPersonal,
                [e.target.name]: e.target.value
            })
        }
    }

    useEffect(() => {
        let datosPersonal = getDatosUsuariosLocalStorag()
        let metodoPago = GetMetodo()
        if(datosPersonal !== null){
            setPerson({
                ...datosPerson,
                email: datosPersonal.email,
                name: datosPersonal.name,
                whatsapp: datosPersonal.whatsapp,
                cedula: datosPersonal.cedula,
            })
            DatosUsuariosLocalStorag({
                ...datosPersonal,
                ['metodoPago']: metodoPago
            })
        }
        setPerson({
            ...datosPerson,
            metodoPago: metodoPago
        })
    }, [])



    return (
        <Modal
            show={showDetalle}
            onHide={handleDetalleColse}
            size="lg"
        >
            <Modal.Header closeButton>

            </Modal.Header>

            <Modal.Body>

                <div className="container-fluid flex-wrap-reverse justify-content-center " style={{ height: "auto" }}>
                    <div className="row p-4 ">
                        <div className="col-12 col-lg-6">
                            <h3>Resumen de compra</h3>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-end">

                            <button className="btn  btn-primary" onClick={handleDetalleColse}
                                data-backdrop="static" data-keyboard="false">CANCELAR COMPRA</button>
                        </div>
                    </div>
                    <div className="row container-fluid">
                        <div className="col-6 col-sm-6 d-flex flex-column">
                            <span>Forma de Pago:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                name="metodo"
                                value={datosPerson.metodoPago}
                                id="formaPago" disabled={true}
                                placeholder="forma de pago Selecionada"
                            />
                            <div className="col-12 border border-bottom mb-3"></div>
                            <div className="d-flex flex-wrap">
                                <Spinner className={spinervi} animation="grow" />
                                <span className={spinervi} >Consultando datos</span>
                            </div>

                            <span>Cedula DNI:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="dni"
                                maxLength={10}
                                name='cedula'
                                value={datosPerson.cedula}
                                onChange={(e) => handelchange(e.target)}
                                placeholder="Ingrese su numero de identificacion"
                            />

                            <span>Nombre Completo:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="name"

                                name="name"
                                value={datosPerson.name}

                                placeholder="Ingrese su nombre completo"
                            />
                        </div>
                        <div className="col-6 col-sm-6 d-flex flex-column">
                            <span>Forma de envío:</span>
                            <div>
                                <select className="form-select" id="envio-resumen" name="envio" onChange={(e) => handelchange(e)}>
                                    {
                                        Envio.map((item, index) => {
                                            return (
                                                <option key={index} value={item.envio}>{item.envio}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-12 border border-bottom mb-3"></div>

                            <span>Correo:</span>
                            <input type="email"
                                className="form-control form-control-sm"
                                id="email"
                                name='email'
                                required
                                value={datosPerson.email}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su correo electronico"
                            />

                            <span>Whatsapp Contacto:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="whatsapp"
                                name="whatsapp"
                                minLength={10}
                                maxLength={10}
                                required
                                value={datosPerson.whatsapp}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su whatsapp o numero de contacto"
                            />

                        </div>
                            <span>Direccion:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="direccion"
                                name="direccion"
                                minLength={10}
                                maxLength={10}
                                required
                                value={datosPerson.direccion}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su direccion"
                            />
                    </div>
                    <div className="container table-responsive">
                        <table className="resumen-table table ">
                            <thead>
                                <tr className="text-black">
                                    <th scope="col" className="text-black">CONCIENTO</th>
                                    <th className="text-black">LOCALIDAD</th>
                                    <th className="text-black" scope="col">FILA</th>
                                    <th className="text-black" scope="col">ASIENTO</th>
                                    <th className="text-black" scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listarCarritoDetalle.length > 0 ?
                                        listarCarritoDetalle.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="align-self-center">{item.nombreConcierto}</td>
                                                    <td className="align-self-center">{item.localidad}</td>
                                                    <td className="align-self-center">{item.fila}</td>
                                                    <td className="align-self-center">{item.cantidad}</td>
                                                    <td className="align-self-center">${item.valor * item.cantidad}</td>
                                                </tr>
                                            )
                                        })
                                        : null
                                }
                            </tbody>
                        </table>

                    </div>
                    <div className="row p-4 float-rigth">
                        <div className="col-6 col-lg-8 text-end d-flex align-items-end flex-column  ">
                            <div>
                                <h4>Subtotal:</h4>
                            </div>
                            <div>
                                <p>Comision por Boleto:</p>
                            </div>
                            <div>
                                <h4>Total:</h4>
                            </div>
                        </div>
                        <div className="col-sm col-lg-2  text-end align-items-end flex-column ">
                            <div className="container ">
                                <h4 className="subtotal">${listaPrecio.subtotal} </h4>
                            </div>
                            <div className="container-fluid">
                                <h4 className="comision-boleto text-end">${listaPrecio.comision} </h4>
                            </div>
                            <div className="container  ">
                                <h4 className="total-text"> ${listaPrecio.total} </h4>
                            </div>

                        </div>

                    </div>
                    <div className="row pb-3">
                        <div className="col-12 col-lg-10 text-end d-flex flex-column  ">
                            <div className="d-flex text-end  flex-wrap-reverse">
                                <div className="col-10 text-end">
                                    <p style={{ fontSize: "0.7em" }}>Acepto los <strong>Términos y condiciones</strong> emitidas por
                                        FlahsTheTikest</p>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck"
                                        id="check1"
                                        name="check1"
                                        onChange={(e) => handleCheckboxChange(e.target)}
                                        type="checkbox" />
                                </div>

                            </div>

                            <div className="d-flex text-end  flex-wrap-reverse">
                                <div className="col-10 d-flex text-end">
                                    <p style={{ fontSize: "0.7em" }}>
                                        Acepto que para canjear los tickets, debo presentar la tarjeta con la que fue
                                        realizada la compra , caso contrario no podra retirar los boletos duros sin opcion a
                                        rembolso
                                    </p>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck" id="check2" type="checkbox"
                                        name="check2"
                                        onChange={(e) => handleCheckboxChange(e.target)}
                                    />
                                </div>

                            </div>
                            <div className="d-flex text-end  flex-wrap-reverse">
                                <div className="col-10 d-flex text-end">
                                    <p style={{ fontSize: "0.7em" }}>
                                        Acepto que para canjear los tickets, debo presentar la tarjeta con la que fue
                                        realizada la compra , caso contrario no podra retirar los boletos duros sin opcion a
                                        rembolso
                                    </p>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck" id="check3"
                                        name="check3" type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e.target)} />
                                </div>

                            </div>

                        </div>
                        <div className="col-12 col-lg-2 text-center align-items-end ">
                            <button id="pagarcuenta" className="btn btn-primary"
                                disabled={false} onClick={handlePago}
                            ><i className="fa fa-credit-card p-1"> </i>PAGAR</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalDetalle;