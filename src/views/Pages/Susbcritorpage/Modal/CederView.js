import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Modal, Form } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { GetSuscritores } from "utils/Querypanel";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { Triangle } from "react-loader-spinner";

const CederView = () => {
    let estatusModal = useSelector(state => state.SuscritorSlice.modal)
    let [alert, setAlert] = useState(null)
    let [spinervi, setspinervi] = useState("d-none")
    let usedispatch = useDispatch()
    const [lista, setLista] = useState([])
    const [datos, setDausuario] = useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: ''
    })
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title="Estás Seguro de ceder el boleto?"
                onConfirm={() => succesceder()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Este ticket dejara de ser de su propiedad  y pasara a ser de {datos.nombreCompleto}
            </SweetAlert>
        )
    }
    const succesceder = () => {
        hideAlert()
        usedispatch(setModal({ nombre: '', estado: '' }))
        usedispatch(setToastes({
            show: true,
            message: 'se cambio el propietario del boleto',
            color: 'bg-success', estado: 'Cambio exitoso '
        }))

    }
    const hideAlert = () => {
        setAlert(null)
    }
    const filterNames = async () => {
        let nombre = $('#cedula').val()
        if (nombre.trim().length >= 10) {
            $("#search").removeClass("d-none")
            if (lista.find(e => e.cedula == nombre.trim() || e.email == nombre.trim()) != null) {
                setDausuario({ ...lista.find(e => e.cedula == nombre.trim() || e.email == nombre.trim()), whatsapp: lista.find(e => e.cedula == nombre.trim() || e.email == nombre.trim()).movil, password: '', resgistro: true })
                $('#movil').val(lista.find(e => e.cedula == nombre.trim() || e.email == nombre.trim()).movil)
                $("#search").addClass("d-none")
                return
            } else {
                setDausuario({
                    nombreCompleto: '',
                    ciudad: '',
                    email: '',
                    movil: '',
                    resgistro: '',
                    password: '', resgistro: false
                })
                $('#movil').val("")
                usedispatch(setToastes({
                    show: true,
                    message: 'El correo o cédula ingresados no se encontraron',
                    color: 'bg-danger', estado: 'No encontrado'
                }))
            }
        } else if (nombre.length == 0) {
            $('#movil').val("")
        }
    }
    const handelChange = e => {
        setDausuario({
            ...datos,
            [e.name]: e.value
        })
    }
    useEffect(() => {
        GetSuscritores().then(oupt => {
            if (oupt.users) setLista([...oupt.users])
        }).catch(erro => {
            console.log(erro)
        })

    }, [estatusModal.nombre == "ceder" ? true : false])
    return (
        <>
            {alert}
            <Modal
                show={estatusModal.nombre == "ceder" ? true : false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <button type="button" className="close"
                        onClick={() => usedispatch(setModal({ nombre: '', estado: '' }))}
                    >
                        ×
                    </button>

                </Modal.Header>
                <Modal.Body>

                    <div className=" container " >
                        <div className="container mb-3">
                            <div className="col-12 d-none">
                                <Form.Control
                                    placeholder="Ingrese el Nombre o cédula"
                                    onChange={(e) => filterNames(e.target.value)}
                                    type="text"
                                >
                                </Form.Control>
                            </div>
                        </div>
                        <div className="container-fluid row "  >
                            <div className="col-12 p-0  d-flex flex-column">
                                <div className=" d-flex pt-0 mb-2 justify-content-center" >
                                    <h4> CONSULTAR CLIENTE A CEDER</h4>
                                </div>
                                <div>
                                    <form id="register" className=" needs-validation  " onSubmit={(e) => e.preventDefault()}  >
                                        <div className="row d-flex justify-content-center">

                                            <div className="col-9">
                                                <div className="input-group mb-3">

                                                    <input id="cedula" type="text"
                                                        className="form-control "
                                                        name="cedula"
                                                        minLength={10}
                                                        maxLength={20}

                                                        placeholder={"Ingrese correo electrónico o cédula"} />
                                                    <div className="input-group-prepend">
                                                        <button className="input-group-text  btn-primary" onClick={filterNames} ><i className="fa fa-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2" >
                                                {datos.resgistro ? <button className="btn btn-success" onClick={succesAlert}  > CEDER </button> :
                                                    <button className="btn btn-success" disabled={true} > CEDER </button>}
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                    </div>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="nombreCompleto"
                                                        value={datos.nombreCompleto}

                                                        name="nombreCompleto"
                                                        onChange={(e) => handelChange(e.target)}
                                                        placeholder="Ingrese su nombres completos" />
                                                    <div className="invalid-feedback">
                                                        Ingrese sus nombres

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">


                                            <div className="col-12 col-lg-6  ">
                                                <div className="input-group mb-3  px-0 d-flex justify-content-center ">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fab fa-whatsapp"></i></span>
                                                    </div>
                                                    <input
                                                        name="movil" type="tel"
                                                        className="m-0 inptFielsd form-control " id="movil"



                                                        placeholder="999 999 999" />


                                                    <div className="invalid-feedback">
                                                        Ingrese un numero de Whatsapp

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <div className="input-group mb-3" >
                                                    <div className=" input-group-prepend">
                                                        <span className=" input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                                    </div>
                                                    <input type="text"
                                                        className="form-control form-control-sm"
                                                        id="direccion"
                                                        name="ciudad"
                                                        maxLength={255}

                                                        value={datos.ciudad}
                                                        onChange={(e) => handelChange(e.target)}
                                                        placeholder="Ingrese su dirección"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Ingrese una direccion

                                                    </div>
                                                </div>

                                            </div>

                                        </div>


                                        <div className="row d-flex justify-content-center">
                                            <div className="col-lg-6 ">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                                    </div>

                                                    <input id="email" type="email" className="form-control" name="email"
                                                        value={datos.email}
                                                        onChange={(e) => handelChange(e.target)}
                                                        placeholder="Email" />
                                                    <div className="invalid-feedback">
                                                        Correo incompleto

                                                    </div>

                                                </div>
                                            </div>


                                        </div>




                                    </form>
                                </div>


                            </div>


                        </div>



                    </div>

                </Modal.Body>
            </Modal>
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
                    <Triangle
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                    <h4 className='text-light'>Consultando datos ...</h4>


                </div>
            </div>
        </>
    )

}

export default CederView;