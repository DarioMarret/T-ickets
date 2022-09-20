import React, { useEffect, useState } from 'react';
import { CrearLinkPagoPayPhone } from 'utils/Query';
import { GenerarLinkPagoMedios } from 'utils/Query';
import Iframe from '../IFrame/Iframe';
import ButtonPago from '../PayPhone/ButtonPago';
import { Spinner } from 'react-bootstrap';

function ModalPago(props) {
    const { setModalPago, modalPago } = props
    const [spinerst, setSpiner] = useState("d-none")
    const [estadoFrame, setEstadoFrame] = useState(false)
    const [url, setUrl] = useState('')
    const [cargar, setCargar] = useState(false)

    useEffect(() => {
        setCargar(!cargar)
    }, [modalPago])

    async function CrearPagoMedio() {
        setSpiner("")
        const data = await GenerarLinkPagoMedios()

        if (data.status === 200) {
            setUrl(data.data.url)
            setEstadoFrame(!estadoFrame)
            setSpiner("d-none")
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
        let newWindow = window.open(URL, 'Pagos Medios', "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000,height=800,left = 390,top = 50");
        // newWindow.focus();
        console.log(newWindow)
        newWindow.onload = function () {
            let html = `<div style="font-size:300px">Welcome!</div>`;
            newWindow.document.body.innerHTML = html;
        };
    }


    useEffect(() => {
        // popUp("https://cloud.abitmedia.com/pagos/solicitudes/?t=2y-13-vh6rdxnaqfsq3det0iesr-huvle2bnw-0-47ivgkj-lsjgehlz3m6")
    }, [])
    //https://cloud.abitmedia.com/pagos/solicitudes/?t=2y-13-uvvrjal98e4jhycxepstlurylxqgnqnltcxz9plpn-npytcuwvabi
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

                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <strong>
                            <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>escoja el metodo de pago</h2>
                        </strong>
                    </div>

                    {/* //PAGO CON PAGO MEDIO */}
                    <label htmlFor="pagoMedio"
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
                    <label htmlFor="payPhone"
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
                    <ButtonPago cargar={cargar} /> */}
                    </label>


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
                        <button
                            style={{
                                backgroundColor: 'rgb(232, 232, 232, 0.5)',
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
                        <Spinner animation="grow" variant="light" size='100'></Spinner>
                        <h4 className='text-light'>Cargando metodo de Pago</h4>


                    </div>
                </div>
            </div>

            {
                estadoFrame ?
                    <Iframe
                        setEstadoFrame={setEstadoFrame}
                        url={url}
                    />
                    : null

            }
        </div>
    );
}


export default ModalPago;