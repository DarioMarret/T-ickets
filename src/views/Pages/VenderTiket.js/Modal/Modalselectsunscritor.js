import { useState, useEffect } from "react"
import { GetSuscritores } from "utils/Querypanel"
import { Modal } from "react-bootstrap"
import { DatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import { Form } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { getCedula } from "utils/DatosUsuarioLocalStorag"
import { DatosUsuariocliente } from "utils/constantes"

export default function ListaSuscritor(prop) {
    const { abrir } = prop
    let usedispatch = useDispatch()
    let modalshow = useSelector((state) => state.SuscritorSlice)
    let sleccionlocalidad = useSelector((state) => state.mapaLocalSlice)
    const [lista, setLista] = useState([])
    const [alert, setAlert] = useState(null)

    const Vender = async (e) => {
        try {
            const cedulas = await getCedula(e.cedula)
            DatosUsuariosLocalStorag({ ...cedulas, ...e, whatsapp: e.movil, password: '' })
            sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...cedulas, whatsapp: e.movil, ...e, password: '' }))
            abrir(modalshow.modal.estado)
            hideAlert()
        } catch (error) {
            console.log(error)
        }
    }
    const successAlert = (e) => {
        setAlert(
            <SweetAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title={"Desea continuar la Compra"}
                onConfirm={() => Vender(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, continuar"
                cancelBtnText="Cancelar"
                openAnim={{ name: 'showSweetAlert', duration: 500 }}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                Con el Suscriptor de cédula # {e.cedula}
            </SweetAlert >
        )
    }
    const hideAlert = () => {
        setAlert(null)
    }
    useEffect(() => {
        GetSuscritores().then(datos => {
            if (datos.users) setLista([...datos.users])
        }).catch(error => {
            console.log(error)
        })
    }, [modalshow.modal.nombre == "suscritor" ? true : ''])

    const filterNames = (nombre) => {
        $('.grid').isotope({
            filter: function () {
                var name = $(this).find('.nombre').text();
                var cedula = $(this).find('.cedula').text();
                return (name.toLowerCase().indexOf(nombre.toLowerCase()) > -1 || cedula.indexOf(nombre.toLocaleLowerCase()) > -1);
            }
        })
    };


    return (
        <>
            {alert}
            <Modal
                show={modalshow.modal.nombre == "suscritor" ? true : ''}
                size="lg"
            >
                <Modal.Header  >
                    <h2> Seleccione el Suscriptor </h2>
                    <button type="button" className="close"
                        onClick={() => usedispatch(setModal({ nombre: '', estado: '' }))}
                    >
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className=" container " >
                        <div className="container mb-3">
                            <div className="col-12">
                                <Form.Control
                                    placeholder="Ingrese el Nombre o cédula"
                                    onChange={(e) => filterNames(e.target.value)}
                                    type="text"
                                >
                                </Form.Control>

                            </div>
                        </div>
                        <div className=" " style={{ height: '450px', overflowY: 'auto', overflowX: 'auto', }} >
                            <div className="grid  " >
                                {lista.length > 0 ?
                                    lista.map((e, i) => {
                                        return (
                                            <div className="grid-item element-item transition list-group-item border rounded-5 mt-2 container-fluid" key={i} >

                                                <li className=" d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-column ">
                                                        <div style={{ Height: '180px', }}>

                                                            <h3 className="nombre" style={{ fontSize: '1.2em' }} >{e.nombreCompleto}</h3>

                                                        </div>
                                                        <span>cédula: <span className="cedula">{e.cedula} </span></span>
                                                    </div>
                                                    <div>
                                                        <button className="btn   btn-outline-success"
                                                            onClick={() => successAlert(e)}>
                                                            <i className="fa fa-check" ></i>

                                                        </button>
                                                    </div>
                                                </li>
                                            </div>

                                        )

                                    }) : ''
                                }


                            </div>
                        </div>



                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <div>
                        <button className="btn btn-outline-primary" onClick={() => usedispatch(setModal({ nombre: 'newsuscri', estado: '' }))} > CREAR SUSCRIPTOR </button>
                    </div>

                </Modal.Footer>
            </Modal>

        </>
    )

}