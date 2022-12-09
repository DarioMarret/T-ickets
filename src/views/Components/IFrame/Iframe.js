import zIndex from '@mui/material/styles/zIndex'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import { setModal } from 'StoreRedux/Slice/SuscritorSlice'
import SweetAlert from 'react-bootstrap-sweetalert'

function Iframe(props) {
    const modal = useSelector((state) => state.SuscritorSlice.modal)
    const usedispatch = useDispatch()

    const { url, setEstadoFrame, intervalo, detener } = props
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(1024)
    const [alert, setAlert] = useState(null)
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    })
    const cerrarPago = () => {
        detener()
        useDispatch(setModal({ nombre: '', estado: '' }))
    }
    const successAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro de cerrar?"
                onConfirm={() => cerrarPago()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Se Borraran Todas las Localidades Seleccionadas
            </SweetAlert>
        );
    };

    const hideAlert = () => setAlert(null)



    useEffect(() => {
        renderWidth()
    }, [width, height])


    function renderWidth() {
        if (width < 630) {
            return "100%"
        }
        else return "700px";
    }
    return (
        <>
            {alert}
            <Modal
                show={modal.nombre == "pago" ? true : false}
                size="lg"
                fullscreen={'lg-down'}
            >
                <Modal.Header>
                    <div className="d-flex col-6 justify-content-between  align-items-center " >
                        <div>
                            <h5 className="modal-title text-center justify-content-center"
                                style={{ fontFamily: 'fantasy' }}
                            >  Tiempo restante para la compra <span className="text-danger"
                                style={{ fontFamily: 'fantasy' }}
                            >{intervalo}</span> </h5>
                        </div>

                    </div>
                    <div className=" float-end ">

                    </div>
                    <button type="button" className="close" onClick={successAlert} >
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body
                    className='d-flex  justify-content-center'
                    style={{ minHeight: '700px' }}>
                    <div>

                    </div>
                    <iframe
                        src={url ? url : "https://pagourl.com/f/2y-13-car9uvqdnfak3rdv3qwqvon1wqcwj0mv8hyjoaojhlyv-v86jh-3"}
                        title="W3Schools Free Online Web Tutorials"
                        width='100%'
                        height={renderWidth()}
                        style={{
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    ></iframe>

                </Modal.Body>
            </Modal>
            <div className='d-none'
                style={{
                    display: 'none',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}> <button
                    style={{
                        backgroundColor: 'rgb(232, 232, 232, 0.5)',
                        border: 'none',
                        borderRadius: '50px',
                        width: '50px',
                        height: '50px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                    onClick={() => setEstadoFrame(false)}
                >X</button>
                <div style={{
                    position: 'sticky',
                    width: '90%', height: '50%', zIndex: '10000',
                    backgroundColor: 'white'
                }}>
                    <div className='d-flex'
                        style={{
                            position: 'relative',
                            top: '10'
                        }}
                    >
                        <h5>Intervalo de tiempor</h5>

                    </div>
                    <div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Iframe;