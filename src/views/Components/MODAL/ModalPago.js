import React, { useEffect, useState } from 'react';
//import { CrearLinkPagoPayPhone } from 'utils/Query';
import { GenerarLinkPagoMedios,EnviarEmail,EnviarmensajeWhastapp } from 'utils/Query';
import {LimpiarLocalStore} from '../../../utils/CarritoLocalStorang';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { GetMetodo } from '../../../utils/CarritoLocalStorang';
// import ButtonPago from '../PayPhone/ButtonPago';
import { Spinner } from 'react-bootstrap';

function ModalPago(props) {
    const { setModalPago, modalPago,setDatoToas } = props
    const [spinerst, setSpiner] = useState("d-none")
    const [estadoFrame, setEstadoFrame] = useState(false)
    const [url, setUrl] = useState('')
    const [cargar, setCargar] = useState(false)
    const [datosPerson, setPerson] = useState({
        cedula: '',
        name: '',
        email: '',
        whatsapp: '',
        metodoPago: '',
        envio: '',
        direccion: '',
    })
    useEffect(() => {
        let datosPersonal = getDatosUsuariosLocalStorag()
        if (datosPersonal !== null) {
            setPerson({
                ...datosPerson,
                direccion: datosPersonal.direccion,
                email: datosPersonal.email,
                name: datosPersonal.name,
                whatsapp: datosPersonal.whatsapp,
                envio: datosPersonal.envio,
                cedula: datosPersonal.cedula,
                
            })         
        }
        setCargar(!cargar)
    }, [modalPago])

    async function CrearPagoMedio() {
        setSpiner("")
        const data = await GenerarLinkPagoMedios()
        
        if (data.status === 200) {
            popUp(data.data.url)               
            setEstadoFrame(!estadoFrame)
            setSpiner("d-none")
            setModalPago(false)
            
        }
        setSpiner("d-none")
    }
    async function CrearLinkPayPhone() {
        setSpiner("")
        const data = await CrearLinkPagoPayPhone()
        if (data.success) {
            setUrl(data.url)
            setEstadoFrame(!estadoFrame)
            setSpiner("d-none")
        }
        setSpiner("d-none")
    }
    function popUp(URL) {
        window.open(URL, 'Pagos Medios', "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000,height=800,left = 390,top = 50");
               
        LimpiarLocalStore()
    }
    
    return (
        <div
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
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '20px',
                    alignItems: 'center',
                }}
            >

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '3px solid #000000',
                    borderRadius: '10px',
                    padding: '10px',
                }}>

                    <div className='d-flex flex-column pb-3' style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <strong>
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Una vez confirmado el pago se enviara los boletos a :
                             </span>
                           
                        </strong>
                        <strong>
                        <span className='text-primary pt-2' style={{ fontWeight: 'bold',fontSize:'1.4em' }}>  
                           {datosPerson.envio!="whatsapp"?datosPerson.email:datosPerson.whatsapp } 

                        </span></strong>
                    </div>

                    {/* //PAGO CON PAGO MEDIO */}  
                    <label className='pt-3' htmlFor="pagoMedio"
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div  
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={CrearPagoMedio}
                        >
                            <img
                                src="https://codigomarret.online/img/whatsapp image 2022-09-18 at 15.12.28.jpeg"
                                width={340}
                                alt="Pagos medios"
                            />
                        </div>
                    </label>


                    {/* //PAGO CON PAYPHONE */}
                    {/*<label htmlFor="payPhone"
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={() => CrearLinkPayPhone()}
                        >
                            <img
                                src="https://codigomarret.online/img/payphone.jpeg"
                                width={300}
                                alt="Pagos medios"
                            />
                        </div>
                        {/* 
                    <ButtonPago cargar={cargar} /> }
                    </label> */}


                  <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <button className='btn btn-primary text-white'
                            style={{
                                
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px',
                                cursor: 'pointer'

                            }}
                            onClick={() => setModalPago(false)}
                        >Cancelar</button>
                    </div>

                </div>
            </div>
            <div>
                <div className={spinerst}
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
                        <h4 className='text-light'>Generando Link de Pago</h4>


                    </div>
                </div>
            </div>

            {/* {
                estadoFrame ?
                    <Iframe
                        setEstadoFrame={setEstadoFrame}
                        url={url}
                    />
                    : null

            } */}
        </div>
    );
}


export default ModalPago;