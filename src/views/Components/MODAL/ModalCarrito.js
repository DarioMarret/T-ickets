import { GetCantidades, GetMetodo, getVerTienda, TiendaIten, GetValores } from 'utils/CarritoLocalStorang'
import { EliminarByStora } from 'utils/CarritoLocalStorang'
import React, { useEffect, useState } from 'react'
import { Metodos } from 'utils/constantes'
import { Modal } from 'react-bootstrap'
import { Table } from 'reactstrap'


function ModalCarrito(props) {
    const { show, handleClose, handleContinuar, setListaPrecio, setListarCarritoDetalle, setPerson, datosPerson } = props
    const [estado, setEstado] = useState({
        cantidad_1: 0,
        cantidad_2: 0,
        valorGeneral: 30,
        valorPregerencial: 50,
        localidades_1: "A ESA - GENERAL",
        localidades_2: "PEGA LA VUELTA - PREFERENCIAL",
    })
    const [Total, setTotal] = useState(0)
    const [listarCarrito, setListarCarrito] = useState([])
    const [timer, setTimer] = useState(false)
    const [check, setCheck] = useState(true)
    const [checked, setChecked] = useState({
        Efectivo: "",
        Tarjeta: "",
        Deposito: "",
    })

    const [cantidad, setCantidad] = useState({
        cantidad_1: 0,
        cantidad_2: 0,
    })

    //A ESA - GENERAL 
    function hanbleMas() {
        AgregarAlCarrito(1, "A ESA - GENERAL", estado.valorGeneral)
    }

    function hanbleMenos() {
        if (cantidad.cantidad_1 > 0) {
            AgregarAlCarrito(-1, "A ESA - GENERAL", estado.valorGeneral)
        }
    }


    //B ESA - PREGERENCIAL
    function hanbleMasPreferencia() {
        AgregarAlCarrito(1, "PEGA LA VUELTA - PREFERENCIAL", estado.valorPregerencial)
    }

    function hanbleMenosPreferencia() {
        if (cantidad.cantidad_2 > 0) {
            AgregarAlCarrito(-1, "PEGA LA VUELTA - PREFERENCIAL", estado.valorPregerencial)
        }
    }

    function AgregarAlCarrito(cantidad, localidad, valor) {
        let producto = {
            cantidad: cantidad,
            localidad: localidad,
            fila: 0,
            valor: valor,
            nombreConcierto: "GIRA 40 ANIVERSARIO",
        }
        TiendaIten(producto)
        setTimer(!timer)
    }

    function QuitarDelcarrito(localidad) {
        EliminarByStora(localidad)
        setTimer(!timer)
        if (localidad === "A ESA - GENERAL") {
            setEstado({
                ...estado,
                cantidad_1: 0,
                valorGeneral: 30,
            })

        } else {
            setEstado({
                ...estado,
                cantidad_2: 0,
                valorPregerencial: 50,

            })
        }

    }

    function CargarValores() {
        var canti = GetCantidades()

        setCantidad(canti)
    }


    function handelMetodopago(target, value) {
        setChecked({
            [target.name]: value,
        })
        setPerson({
            ...datosPerson,
            'metodo': value,
        })
        sessionStorage.setItem(Metodos, value)
        setCheck(false)
    }

    function listarCheck() {
        var metodo = GetMetodo()
        if (metodo != null) {
            setChecked({
                [metodo]: metodo,
            })
        }
    }

    function validateCheck() {
        if (cantidad.cantidad_2 != 0 || cantidad.cantidad_1 != 0) {
            if (checked.Efectivo != "" || checked.Tarjeta != "" || checked.Deposito != "") {
                setCheck(false)
            } else {
                setCheck(true)
            }
        } else {
            setCheck(true)
        }
    }
    useEffect(() => {
        validateCheck()
    })
    useEffect(() => {
        setListarCarrito(getVerTienda())

        setListarCarritoDetalle(getVerTienda())
        CargarValores()
        listarCheck()
        let data = GetValores()

        setListaPrecio(data)
        setTotal(GetValores().subtotal)
    }, [timer, show])


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"

            >
                <Modal.Header >
                    <h5 className="modal-title text-center justify-content-center">LOCALIDADES</h5>
                    <button type="button" className="close"
                        onClick={handleClose}>
                        X
                    </button>
                </Modal.Header>
                <div >
                    <Modal.Body className='col-12'>
                        <Table>
                            <thead className="bg-secondary text-black">
                                <tr className='text-'>
                                    <th className="text-center text-black" scope="col">LOCALIDAD</th>
                                    <th className="text-center text-black" scope="col">PRECIO</th>
                                    <th className="text-center text-black" scope="col">CANTIDAD</th>
                                    <th className="text-center text-black" scope="col">CARACTERISTICA</th>
                                </tr>
                            </thead>
                            <tbody className="text-center ">
                                <tr>
                                    <td className="align-self-center">
                                        <div className="d-flex  align-items-stretch">
                                            <div className="rounded-3 px-2" style={{ backgroundColor: 'brown', width: '30px', height: '20px' }}>
                                            </div>
                                            <p className="px-2 " style={{ fontSize: '1em' }}>A ESA  - GENERAL</p>
                                        </div>
                                    </td>
                                    <td className="align-self-center">${estado.valorGeneral}</td>
                                    <td className=" d-flex justify-content-center text-center">

                                        <p className="resta input-group-text  " onClick={hanbleMenos}><i className="fa fa-minus"></i></p>

                                        <input size="4" disabled={true}
                                            value={cantidad.cantidad_1}
                                            type="text" style={{
                                                width: '50px!important',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }} className="form-control form-control-sm" />

                                        <p className="suma input-group-text " onClick={hanbleMas} ><i className="fa fa-plus"></i></p>

                                    </td>
                                    <td className="align-self-center">
                                        <p className="px-2 " style={{ fontSize: ' 1em' }}>GRADAS NO NUMERADO</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-self-center">
                                        <div className="d-flex  align-items-stretch">
                                            <div className="rounded-3  px-2"
                                                style={{ backgroundColor: 'rgb(231, 134, 43)', width: '30px', height: '20px' }}>
                                            </div>
                                            <p className="px-0 " style={{ fontSize: ' 1em' }}>PEGA LA VUELTA - PREFERENCIA</p>
                                        </div>
                                    </td>
                                    <td className="align-self-center">${estado.valorPregerencial}</td>
                                    <td className=" d-flex justify-content-center text-center">
                                        <p className="resta input-group-text" onClick={hanbleMenosPreferencia} ><i className="fa fa-minus"></i></p>

                                        <input size="4" disabled={true}
                                            value={cantidad.cantidad_2}
                                            style={{
                                                width: '50px!important',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }} className="form-control form-control-sm" />

                                        <p className="suma input-group-text " onClick={hanbleMasPreferencia} ><i className="fa fa-plus"></i></p>

                                    </td>
                                    <td className="align-self-center">
                                        <p className="px-2 " style={{ fontSize: ' 1em' }}>GRADAS NO NUMERADO</p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className=" table-responsive">
                            <table className="detalles-resumen table table-striped display cell-border"
                            >
                                <thead className="bg-secondary text-black">
                                    <tr>
                                        <th className="text-center text-black" scope="col">LOCALIDAD</th>
                                        <th className="text-center text-black" scope="col">FILA</th>
                                        <th className="text-center text-black" scope="col">TOTAL ASIENTOS</th>
                                        <th className="text-center text-black" scope="col">TOTAL</th>
                                        <th className="text-center text-black" scope="col">ACCION</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center ">
                                    {
                                        listarCarrito.length > 0 ?
                                            listarCarrito.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="align-self-center">{item.localidad}</td>
                                                        <td className="align-self-center">{item.fila}</td>
                                                        <td className="align-self-center">{item.cantidad}</td>
                                                        <td className="align-self-center">${item.valor * item.cantidad}</td>
                                                        <td className="align-self-center">
                                                            <button className="btn btn-danger" onClick={() => QuitarDelcarrito(item.localidad,)}>
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : <tr></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row justify-content-center bg-gray">
                            <div className="col-6 d-flex  align-self-center justify-content-center">
                                <h4
                                    style={{
                                        fontSize: '2rem',
                                    }}
                                >SUBTOTAL:</h4>
                                <h4
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                    }}
                                    className="px-1 total-detalle"> {Total != 0 ? "$" + Total : null}</h4>
                            </div>
                            <div className="col-sm d-flex flex-column align-items-end ">
                                <div className="px-5">
                                    Método de pago
                                    <div className="form-check">
                                        <input className="v-check form-check-input" type="radio"
                                            name="Efectivo" id="Efectivo"
                                            checked={checked.Efectivo == "Efectivo" ? true : false}
                                            onChange={(e) => handelMetodopago(e.target, "Efectivo")}
                                        />
                                        <label className="form-check-label" >
                                            Efectivo
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="v-check form-check-input" type="radio"
                                            checked={checked.Tarjeta == "Tarjeta" ? true : false}
                                            onChange={(e) => handelMetodopago(e.target, "Tarjeta")}
                                            name="Tarjeta" id="Tarjeta" />
                                        <label className="form-check-label" >
                                            Tarjeta
                                        </label>
                                    </div>
                                    <div className="form-check ">
                                        <input className="form-check-input" type="radio"
                                            checked={checked.Deposito == "Deposito" ? true : false}
                                            onChange={(e) => handelMetodopago(e.target, "Deposito")}
                                            name="Deposito" id="Deposito" />
                                        <label className="form-check-label" >
                                            Deposito-transferencia
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 py-2 d-flex justify-content-center align-items-center">
                                <input className="form-control" type="text"></input>
                                <button disabled={check} className="btn btn-primary fw-bold px-3 py-2 rounded-6"
                                    onClick={() => handleContinuar()} >
                                    CONTINUAR</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <div className='col-4'>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalCarrito;