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
    const [code, setCode] = useState("cedula")
    const [datos, setDausuario] = useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: ''

    })
    /*const Vender = async (e) => {
        try {
            const cedulas = await getCedula(e.cedula)
            DatosUsuariosLocalStorag({ ...cedulas, ...e, whatsapp: e.movil, password: '' })
            sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...cedulas, whatsapp: e.movil, ...e, password: '' }))
            abrir(modalshow.modal.estado)
            hideAlert()
        } catch (error) {
            console.log(error)
        }
    }*/
    const VenderTickest = async () => {
        try {
            const cedulas = await getCedula(datos.cedula)
            DatosUsuariosLocalStorag({ ...cedulas, ...datos, whatsapp: datos.movil, password: '' })
            sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...cedulas, whatsapp: datos.movil, ...datos, password: '' }))
            abrir(modalshow.modal.estado)
            hideAlert()

        } catch (error) {
            console.log(error)
        }
    }
    const CrearUSuario = () => {
        let datosend = {
            nombreCompleto: datos.nombreCompleto,
            ciudad: datos.ciudad,
            email: datos.email,
            movil: datos.movil,
            password: datos.password,
            cedula: $("#cedula").val()
        }
        console.log(datosend, Object.values(datosend).every(e => e))
        if (Object.values(datosend).every(e => e)) {
            console.log("registro")
        }
        else {
            console.log("nuevo")
            /// document.getElementById("register").classList.add("needs-validation")
        }

    }
    const successAlert = () => {
        setAlert(
            <SweetAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title={"Desea continuar la Compra"}
                onConfirm={() => VenderTickest()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, continuar"
                cancelBtnText="Cancelar"
                openAnim={{ name: 'showSweetAlert', duration: 500 }}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                Con el Suscriptor de cédula # {datos.cedula}
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

    const filterNames = async (nombre) => {
        if (nombre.length == 10) {
            if (lista.find(e => e.cedula == nombre) != null) {
                setDausuario({ ...lista.find(e => e.cedula == nombre), whatsapp: lista.find(e => e.cedula == nombre).movil, password: '', resgistro: true })
                //console.log({ ...lista.find(e => e.cedula == nombre), discapacidad: cedula.discapacidad, password: '' })
                $('#movil').val(lista.find(e => e.cedula == nombre).movil)
            } else {
                let cedula = await getCedula(nombre)
                console.log(cedula)
                if (cedula) {
                    setDausuario({
                        nombreCompleto: cedula.name,
                        ciudad: cedula.ciudad,
                        email: '',
                        whatsapp: '', password: '', resgistro: false
                    })
                    $('#movil').val("")

                } else
                    setDausuario({
                        nombreCompleto: '',
                        ciudad: '',
                        email: '',
                        movil: '',
                        resgistro: false
                    })
                $('#movil').val("")
            }
        } else if (nombre.length == 0) {
            setDausuario({
                nombreCompleto: '',
                ciudad: '',
                email: '',
                movil: '',
                resgistro: false
            })
            $('#movil').val("")
        }
    }
    $(document).ready(function () {
        const phoneInputField = document.querySelector("#movil");
        intlTelInput(phoneInputField, {
            initialCountry: "ec",
            separateDialCode: true,
            autoHideDialCode: false,
            nationalMode: false,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        })

    });

    const handelChange = e => {
        setDausuario({
            ...datos,
            [e.name]: e.value
        })
    }
    return (
        <>
            {alert}
            <Modal
                show={modalshow.modal.nombre == "suscritor" ? true : ''}
                size="lg"
            >
                <Modal.Header  >
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
                                    <h2> CONSULTAR CLIENTE </h2>
                                </div>
                                <div>
                                    <form id="register" className=" needs-validation  " novalidate onSubmit={(e) => e.preventDefault()}  >
                                        <div className="row">

                                            <div className="col-4">
                                                <div className=" input-group mb-3" >
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"></span>
                                                    </div>
                                                    <Form.Select className="form-control" defaultValue={"cedula"} value={code} onChange={(e) => setCode(e.target.value)} >
                                                        <option value={"cedula"}>Cédula ecuatoriana</option>
                                                        <option value={"extranjera"}>Cédula extranjera</option>
                                                        <option value={"pasaporte"}>Pasaporte</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                    </div>
                                                    <input id="cedula" type="text"
                                                        className="form-control numero"
                                                        name="cedula"
                                                        minLength={10}
                                                        maxLength={10}
                                                        onChange={(e) => filterNames(e.target.value)}

                                                        placeholder={(code == "cedula") ? "Ingrese cédula" : "Ingrese su número de identificación"} required />

                                                </div>

                                            </div>
                                            <div className="col-2" >
                                                {!datos.resgistro ? <button className="btn btn-success" onClick={CrearUSuario} > Crear</button> :
                                                    <button className="btn btn-primary" onClick={successAlert} > <i className=" fa fa-check-circle"></i> </button>}
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
                                                        disabled={(code == "cedula")}
                                                        name="nombreCompleto"
                                                        onChange={(e) => handelChange(e.target)}
                                                        placeholder="Ingrese su nombres completos" required />
                                                    <div className="invalid-feedback">
                                                        Ingrese sus nombres

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">


                                            <div className="col-12 col-lg-6  ">
                                                <div className="input-group mb-3  px-0 d-flex justify-content-center  fle">

                                                    <input
                                                        name="movil" type="tel"
                                                        className=" inptFielsd form-control " id="movil"

                                                        minLength={10}
                                                        maxLength={10}
                                                        required

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
                                                        required
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


                                        <div className="row">
                                            <div className="col-lg-6">
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
                                            <div className="col-lg-6" >
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                    </div>

                                                    <input type="password"

                                                        id="password"
                                                        name='password'

                                                        minLength={7}
                                                        placeholder="contraseña"
                                                        className="form-control"
                                                        value={datos.password}
                                                        onChange={(e) => handelChange(e.target)}
                                                    />
                                                    <div className="invalid-feedback">
                                                        La contraseña debe ser mayor de 7 caracteres
                                                    </div>

                                                </div>
                                            </div>

                                        </div>



                                        <div className="row d-none">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-success" type="submit">Crear Cuenta</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>


                        </div>
                        <div className="d-none " style={{ height: '450px', overflowY: 'auto', overflowX: 'auto', }} >
                            <div className="grid  " >
                                {lista.length == null ?
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
                    <div className="d-none">
                        <button className="btn btn-outline-primary" onClick={() => usedispatch(setModal({ nombre: 'newsuscri', estado: '' }))} > CREAR SUSCRIPTOR </button>
                    </div>

                </Modal.Footer>
            </Modal>

        </>
    )

}