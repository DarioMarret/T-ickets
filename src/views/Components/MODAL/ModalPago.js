import React, { useEffect, useState } from 'react';
import { GenerarLinkPagoMedios } from 'utils/Query';
import Iframe from '../IFrame/Iframe';
import ButtonPago from '../PayPhone/ButtonPago';

function ModalPago(props) {
    const { setModalPago, modalPago } = props
    const [estadoFrame, setEstadoFrame] = useState(false)
    const [url, setUrl] = useState('')
    const [cargar, setCargar] = useState(false)

    useEffect(() => {
        setCargar(!cargar)
    }, [modalPago])

    async function CrearLinkPagoMedio(){
        const respuesta = await GenerarLinkPagoMedios()
        if (respuesta.status === 200) {
            setUrl(respuesta.data.url)
            setEstadoFrame(!estadoFrame)
        }
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
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                </div>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <strong>
                        <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Seleccione el Metodo de Pago</h2>
                        <h2 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>De su Preferencia.</h2>
                    </strong>
                </div>

                {/* //PAGO CON PAYPHONE */}
                <label htmlFor="payPhone"
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <strong
                        style={{
                            fontSize: '20px'
                        }}
                    >PayPhone</strong>
                    <ButtonPago cargar={cargar} />
                </label>

                {/* //PAGO CON PAGO MEDIO */}
                <label htmlFor="pagoMedio"
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <strong
                        style={{
                            fontSize: '20px'
                        }}
                    >Pago Medios</strong>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid gray',
                            borderRadius: '10px',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={()=>CrearLinkPagoMedio()}
                    >
                        <img 
                        src="https://codigomarret.online/img/whatsapp image 2022-09-18 at 15.12.28.jpeg"
                        width={300}
                            alt="Pagos medios"
                        />
                    </div>
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