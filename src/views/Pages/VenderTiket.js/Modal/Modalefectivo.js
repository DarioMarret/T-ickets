import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import {  GetValores, GetMetodo } from 'utils/CarritoLocalStorang';
import { LimpiarLocalStore, Limpiarseleccion } from 'utils/CarritoLocalStorang';
import { clearMapa } from 'StoreRedux/Slice/mapaLocalSlice';
import { borrarseleccion } from 'StoreRedux/Slice/sillasSlice';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PagoRapido } from 'utils/Querycomnet';

const ModalEfectivo = () => {
    let usedispatch = useDispatch()
    const [suelto, SetSuelto] = useState(0)
    const [spiner,setSpiner]= useState(false)
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [alert, setAlert] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const [ticktes,setTickets]=useState([])
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleKeyPress = (event) => {
        let arrgelo = ticktes
        if (event.key === 'Enter') {
            if(inputValue!=""){
                if(arrgelo.includes(inputValue)){

                }else{
                    arrgelo.push(inputValue)
                    setInputValue("")
                    setTickets(arrgelo)
                }
            }
        }
    };
    function borrar() {
        Limpiarseleccion()
        LimpiarLocalStore()
        usedispatch(setModal({ nombre: "", estado: "" }))
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        hideAlert()
    }
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Esta seguro de cancelar la venta"
                closeOnClickOutside={false}
                onConfirm={() => borrar()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Borrar"
                cancelBtnText="Cancelar"
                showCancel
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Desea borrar los datos y continuar
            </SweetAlert>
        );
    }
    const hideAlert = () => {
        setAlert(null)
    }
    function onchange(e) {
        let total = parseFloat(GetValores().total) 
        let valor = parseFloat(total) - parseFloat(e.value)
        SetSuelto(valor)
    }
    function creaComprobante() {
        console.log("vender")
        setSpiner(true)
        sessionStorage.setItem("ticktesfisio",JSON.stringify(ticktes))
        PagoRapido("").then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                usedispatch(setModal({ nombre: "", estado: "" }))
                usedispatch(setToastes({ show: true, message: 'Registro generado exitosamente verifica los Boletos como canjeados', color: 'bg-success', estado: "compra guardada" }))
                setSpiner(false)
            }
            else {
                usedispatch(setToastes({ show: true, message: 'Orden de pago no generado', color: 'bg-danger', estado: "error" }))
                setSpiner(false)
            }
        }).catch(err => {
            setSpiner(false)
            console.log(err)
        })
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789.".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    function Qitar(e){
        if(e!=""){
            let arr = ticktes.filter(f=>f!=e)
            setTickets(arr)

        }
    }
    useEffect(() => {
        // detenervelocidad()
    }, [modalshow.nombre == "modalpago" ? true : false])
    return (
        <>
            {alert}
            <iframe className='d-none' id="main-iframe" ></iframe>
            <Modal
                show={modalshow.nombre == "modalpago" ? true : false}
                size='lg'
            >
                <Modal.Header className='py-3'>
                    <h5><span className="text-danger" ></span> </h5>
                    <button type="button" className="close"
                        onClick={() => succesAlert()}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container ">
                        <div className='d-flex col-12 justify-content-end align-items-center px-0' >
                            <div><button className='close text-dark' onClick={() => usedispatch(setModal({ nombre: "ModalDetalle", estado: "" }))} >  <i className="bi bi-caret-left-fill"></i>  </button></div>
                        </div>
                        <div className="d-flex flex-column " >
                            <h3 className='text-center'> VALOR EFECTIVO </h3>
                            <div className='container'>
                                <input className='numero form-control'
                                    type="number"
                                    onChange={(e) => onchange(e.target)}
                                    placeholder='Obtener cambio'
                                >
                                </input>
                            </div>
                            <table className="table table-borderless ">
                                <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Subtotal:</td>
                                        <td className='text-center'>${GetValores().subtotal}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Comisión por Boleto:</td>
                                        <td className='text-center'>${GetValores().comision}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Total:</td>
                                        <td className='text-center'>${GetMetodo() === "Tarjeta" ? GetValores().total : (parseFloat(GetValores().total) ).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Cambio:</td>
                                        <td className='text-center'>${suelto.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="container d-flex flex-column  text-between p-3">
                                <div className="row  d-flex d-none   justify-content-between  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-items-cemter'>
                                        <h6 >Subtotal: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().subtotal}</strong>  </h6>
                                    </div>
                                </div>
                                <div className="row d-none   d-flex justify-content-center  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-content-end'>
                                        <h6 >Comision: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().comision}</strong> </h6>
                                    </div>
                                </div>
                                <div className="row d-none   d-flex justify-content-center  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-content-end'>
                                        <h6 >Total <span className=' text-white'>......</span>:  </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 >  <strong> ${GetMetodo()!= "Tarjeta" ? GetValores().total : ""}  </strong></h6>
                                    </div>
                                </div>
                                <div className='row '>

                                    <strong>Agregar Boletos</strong>
                                    <div className='container'>
                                        <input className='numero form-control'
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                            placeholder='ticktes'
                                        >
                                        </input>
                                    </div>
                                    <div className='d-flex flex-row-reverse col-12'
                                    style={{
                                        maxHeight:"100px"
                                    }}
                                    >
                                        

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center pt-3  p-1">
                                    <button className="btn btn-primary 
                                    col-12"
                                        disabled={spiner}
                                        onClick={creaComprobante}
                                    >COBRAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-wrap" style={{ minHeight: '10px', maxHeight: '150px', overflowY: 'auto', overflowX: 'hide', }}>
                        {ticktes.length > 0 ?
                            ticktes.map(e=> {
                                return (<div>
                                    <li  className= '  d-flex agregados rounded-5  bg-success justify-content-center align-items-center '
                                        onClick={() =>  Qitar(e)}
                                        style={{ height: '30px', width: '120px', margin: '1px' }} >
                                        <div className={'d-flex   text-white justify-content-center  '} >
                                            <div className="d-flex  justify-content-center text-center p-2">
                                                <span className="mx-1" style={{ fontSize: '0.8em' }}>{e}</span>
                                                
                                            </div>
                                        </div>
                                    </li>
                                   

                                </div>)
                            }) : ""
                        }
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalEfectivo;