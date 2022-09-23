import React, { useEffect, useState } from 'react';
import { Modal, Spinner,InputGroup } from "react-bootstrap"
import { GetMetodo } from 'utils/CarritoLocalStorang';
import { Envio } from 'utils/constantes';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { DatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { getCedula } from 'utils/DatosUsuarioLocalStorag';

function ModalDetalle(props) {
    const { showDetalle, handleDetalleColse,
        listaPrecio, listarCarritoDetalle,
        setModalPago, handelReporShow, handelefctivorShow,
        setDetalle,setDatoToas
    } = props

    const [actualState, changeCheckState] = useState({
        check1: false,
        check2: false,
        check3: false
    });
    const [checked, setChecked] = useState(false)

    const [spinervi, setspiner] = useState("d-none")
    const [hidecomision, sethideComision] = useState("d-none")

    const [datosPerson, setPerson] = useState({
        cedula: '',
        name: '',
        email: '',
        whatsapp: '',
        metodoPago: '',
        envio: '',
        direccion: '',
    })

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
        if(validarEmail(datosPerson.email)){
        setDetalle(!showDetalle)
        setModalPago(true)}
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
                DatosUsuariosLocalStorag({ ...datos, cedula: value,envio:datosPerson.envio,whatsapp:datosPerson.whatsapp })
                const { name, email, direccion } = datos
                console.log(datos)
                setPerson({
                    ...datosPerson,
                    email: email? email:'',
                    name: name,
                    cedula: value,
                    direccion: direccion? direccion:'',
                    envio:datosPerson.envio,
                    whatsapp:datosPerson.whatsapp
                })
                setspiner("d-none")
            } else {
                
                setPerson({
                    ...datosPerson,
                    email: '',
                    name: '',
                    direccion: '',
                })
                setspiner("d-none")
                setDatoToas({ show:true,
                    message:'Ingrese el número de cédula correcta o intente mas tarde',
                    color:'bg-danger',
                    estado:'No se encontraron datos',
                  })
            }
        }
    }
    function hanbleDatos(e) {
        setPerson({
            ...datosPerson,
            [e.target.name]: e.target.value
        })
        let datosPersonal = getDatosUsuariosLocalStorag()
        DatosUsuariosLocalStorag({
            ...datosPersonal,
            [e.target.name]: e.target.value
        })
    }
    function validarEmail(valor) {
       let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;       
        if (emailRegex.test(valor) ){
         return true
        } else {
            setDatoToas({ show:true,
                message:'Campos inconpletos o Formato de correo inválido ',
                color:'bg-danger',
                estado:'Complete la información',
              })
              return false
        }
      }
      $(document).ready(function() {
        $(".numero").keypress(function(e) {
          var n = (e = e || window.event).keyCode || e.which,
            t = -1 != "0123456789xX".indexOf(String.fromCharCode(n));
          (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })     
      });


useEffect(() => {
    let datosPersonal = getDatosUsuariosLocalStorag()
    let metodoPago = GetMetodo()
    if (datosPersonal !== null) {
        setPerson({
            ...datosPerson,
            direccion: datosPersonal.direccion,
            email: datosPersonal.email,
            name: datosPersonal.name,
            whatsapp: datosPersonal.whatsapp,
            envio: datosPersonal.envio,
            cedula: datosPersonal.cedula,
            metodoPago: metodoPago
        })
        DatosUsuariosLocalStorag({
            ...datosPersonal,
            ['metodoPago']: metodoPago,
            direccion: datosPersonal.direccion,
        })
    }
   /* setPerson({
        ...datosPerson,
        email: datosPersonal ? datosPersonal.email : '',
        name: datosPersonal ? datosPersonal.name : '',
        whatsapp: datosPersonal ? datosPersonal.whatsapp : '',
        cedula: datosPersonal ? datosPersonal.cedula : '',
        metodoPago: metodoPago,       
        direccion: datosPersonal ? datosPersonal.direccion : ''
    })*/
    let mostrarcomision = GetMetodo()
    const mostrar= mostrarcomision!="Tarjeta"? "d-none":""
    sethideComision(mostrar)
}, [showDetalle, actualState])
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
                            name="metodoPago"
                            value={datosPerson.metodoPago}
                            id="formaPago" disabled={true}
                            placeholder="forma de pago Selecionada"
                        />
                        <div className="col-12 border border-bottom mb-3"></div>
                        

                        <span>Cedula DNI:</span>
                        <input type="text"
                            className="numero form-control form-control-sm"
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
                            onChange={(e) => hanbleDatos(e)}

                            placeholder="Ingrese su nombre completo"
                        />
                    </div>
                    <div className="col-6 col-sm-6 d-flex flex-column">
                        <span>Forma de envío:</span>
                        <div>
                            <select className="form-select"                             
                            value={datosPerson.envio || ''} id="envio" name="envio" onChange={(e) => hanbleDatos(e)}>
                                {
                                    Envio.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>{item.envio}</option>
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
                            className="numero form-control form-control-sm"
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
                    <div className="col-12 col-sm-12 d-flex flex-column">
                        <span>Direccion:</span>
                        <input type="text"
                            className="form-control form-control-sm"
                            id="direccion"
                            name="direccion"
                            maxLength={255}
                            required
                            value={datosPerson.direccion}
                            onChange={(e) => hanbleDatos(e)}
                            placeholder="Ingrese su direccion"
                        />
                    </div>
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
                        <div className={hidecomision}>
                            <p>Comision Bancaria:</p>
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
                        <div  className={"container-fluid "+hidecomision}>
                            <h4 className="comision-boleto text-end">${listaPrecio.comision_bancaria} </h4>
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
                                checked={actualState.check1}
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
                                    checked={actualState.check2}
                                    name="check2"
                                    onChange={(e) => handleCheckboxChange(e.target)}
                                />
                            </div>
                        </div>
                        <div className="d-flex text-end  flex-wrap-reverse">
                            <div className="col-10 d-flex text-end">
                            <strong>
                                <p style={{ fontSize: "0.8em" }}>
                                <strong> Acepto que se crea mi cuenta de usuario en el portal de flasthetickets, la misma que contiene mis datos persoanales, así como los
                                    datos de mis compras, tambien recibir las promociones por ese mismo medio.</strong>  
                                </p>
                            </strong>
                            </div>
                            <div className="px-3">
                                <input className="form-check-input terminoscheck" id="check3"
                                checked={actualState.check3}
                                    name="check3" type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e.target)} />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-lg-2 text-center align-items-end ">
                        {
                            datosPerson.metodoPago == "Tarjeta" ?
                                <button id="pagarcuenta" className="btn btn-primary"
                                    disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                    onClick={handlePago}
                                >
                                    <i className="fa fa-credit-card "> </i>PAGAR </button> : ""
                        }
                        {
                            datosPerson.metodoPago == "Efectivo" ?
                                <button id="pagarcuenta" className="btn btn-primary"
                                    disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                    onClick={()=>{if(validarEmail(datosPerson.email)){handelefctivorShow()}}}
                                >
                                    <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                        }
                        {
                            datosPerson.metodoPago == "Deposito" ?
                                <button id="pagarcuenta" className="btn btn-primary"
                                    disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                    onClick={()=>{ if(validarEmail(datosPerson.email)){handelReporShow()} }}
                                >
                                    <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                        }
                                                {
                            !datosPerson.metodoPago ?
                                <button id="pagarcuenta" className="btn btn-primary"
                                    disabled={true}
                                >
                                    <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                        }

                    </div>
                </div>
            </div>
            <div className={spinervi}
                    style={{
                        display: 'none',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '1000'
                    }}
                >

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        padding: '10px',
                    }}>
                        <Spinner animation="border" variant="light" size='120'></Spinner>
                        <h4 className='text-light'>Consultando datos ...</h4>


                    </div>
                </div>
        </Modal.Body>
    </Modal>
);
}

export default ModalDetalle;