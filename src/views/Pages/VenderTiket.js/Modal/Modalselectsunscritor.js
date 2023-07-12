import { useState, useEffect } from "react"
import { GetSuscritores } from "utils/SuscritorQuery"
import { Modal } from "react-bootstrap"
import { DatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import { Form } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { getCedula } from "utils/DatosUsuarioLocalStorag"
import { DatosUsuariocliente } from "utils/constantes"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import { Authsucrito } from "utils/Query"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import axios from "axios"
import { ValidarWhatsapp } from "utils/Query"
import { Host } from "utils/constantes"
import { MagnifyingGlass } from "react-loader-spinner"
import { buscarcliente } from "utils/Querypanelsigui"
//import{R}

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
        let cedula = getDatosUsuariosLocalStorag()
        try {
            const cedulas = await getCedula(cedula.cedula)
            DatosUsuariosLocalStorag({ ...cedulas, ...datos, whatsapp: datos.movil, password: '' })
            sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...cedulas, whatsapp: datos.movil, ...datos, password: '' }))
            abrir(modalshow.modal.estado)
            hideAlert()

        } catch (error) {
            console.log(error)
        }
    }
    const CrearUSuario = async () => {
        let usuarios = getDatosUsuariosLocalStorag()
        let datosend = {
            nombreCompleto: datos.nombreCompleto,
            ciudad: datos.ciudad,
            email: datos.email,
            movil: $("#movil").val(),
            password: datos.password,
            cedula: $("#cedula").val()
        }
        DatosUsuariosLocalStorag({ ...usuarios, ...datos, whatsapp: $("#movil").val(), })
        if ($("#movil").val() == " ") {
            usedispatch(setToastes({
                show: true,
                message: "Falta Celualar",
                color: 'bg-warning',
                estado: "hubo un error",
            }))
            return
        }
        if ($("#cedula").val() == " ") {
            usedispatch(setToastes({
                show: true,
                message: "Falta Cédula",
                color: 'bg-warning',
                estado: "hubo un error",
            }))
            return
        }
        if (datos.nombreCompleto == " ") {
            usedispatch(setToastes({
                show: true,
                message: "Falta Nombre",
                color: 'bg-warning',
                estado: "hubo un error",
            }))
            return
        }
        if (Object.values(datosend).every(e => e)) {


            try {
                const registro = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_suscriptor", datosend, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                    }
                })
                console.log(registro.data.success)
                if (registro.data.success) {
                    usedispatch(setToastes({
                        show: true,
                        message: "Usuario " + datosend.nombreCompleto + " creado correctamente",
                        color: 'bg-success',
                        estado: "Inicio Exitoso",
                    }))
                    successAlert()
                }
                else {
                    usedispatch(setToastes({
                        show: true,
                        message: "Atentos",
                        color: 'bg-warning',
                        estado: "hubo un error",
                    }))
                }

            } catch (error) {
                usedispatch(setToastes({
                    show: true,
                    message: "Cédula o email ya registrado",
                    color: 'bg-danger',
                    estado: "Huboo un error ",
                }))
                // console.log(error)

            }


        }
        else {
            usedispatch(setToastes({
                show: true,
                message: 'Complete toda la información ',
                color: 'bg-danger', estado: 'Campos vacíos'
            }))
            //console.log("nuevo")
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

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                Con el Suscriptor de cédula # {$("#cedula").val()}
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
        if (code == "cedula" && nombre.trim().length >= 10) {

            $("#search").removeClass("d-none")
            //console.log(lista.find(e => e.cedula == nombre))
            buscarcliente({}).then(oupt => console.log(oupt)).catch(err => {
                console.log(err)
            })
            if (lista.find(e => e.cedula == nombre) != null) {
                setDausuario({
                    nombreCompleto: lista.find(e => e.cedula == nombre).nombreCompleto,
                    ciudad: lista.find(e => e.cedula == nombre).ciudad,
                    email: lista.find(e => e.cedula == nombre).email,
                    movil: lista.find(e => e.cedula == nombre).movil,
                    resgistro: lista.find(e => e.cedula == nombre).registro,
                    password: '',
                    whatsapp: lista.find(e => e.cedula == nombre).movil, password: '', resgistro: true
                })

                DatosUsuariosLocalStorag({ ...lista.find(e => e.cedula == nombre) })
                //   console.log(lista.find(e => e.cedula == nombre))
                //console.log({ ...lista.find(e => e.cedula == nombre), discapacidad: cedula.discapacidad, password: '' })
                $('#movil').val(lista.find(e => e.cedula == nombre).movil)
                $("#search").addClass("d-none")

                return
            } else {
                let cedula = await getCedula(nombre)
                //console.log(cedula)
                if (cedula) {

                    setDausuario({
                        nombreCompleto: cedula.name,
                        ciudad: cedula.direccion,
                        email: '',
                        whatsapp: '', password: '', resgistro: false
                    })
                    DatosUsuariosLocalStorag({ ...cedula })
                    sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...cedula }))
                    $('#movil').val("")
                    $("#search").addClass("d-none")

                } else {
                    //  console.log(cedula)
                    setDausuario({
                        nombreCompleto: '',
                        ciudad: '',
                        email: '',
                        movil: '',
                        resgistro: '',
                        password: '',
                        resgistro: false
                    })
                    usedispatch(setToastes({
                        show: true,
                        message: 'Intente nuevamente o cambie el metodo de identificación ',
                        color: 'bg-warning text-black',
                        estado: 'No hubo coincidencia'
                    }))
                    $("#search").addClass("d-none")
                    $('#movil').val("")
                }
            }
        } else if (nombre.length == 0) {
            setDausuario({
                nombreCompleto: '',
                ciudad: '',
                email: '',
                movil: '',
                resgistro: '',
                password: '',
                resgistro: false
            })
            $('#movil').val("")
        }
    }
    const buscarsuscritor = () => {
        let nombre = $('#cedula').val()
        if (nombre.trim().length < 9) {
            console.log("error", nombre)
            return
        }
        let informacion = {
            "cedula": !isNaN(nombre.trim()) ? nombre.trim() : '',
            "email": isNaN(nombre.trim()) ? nombre.trim() : ''
        }
        buscarcliente({ ...informacion }).then(ouput => {
            //  console.log(ouput)
            if (!ouput.success) {
                getCedula(nombre).then(salida => {
                    if (salida.success) {
                        usedispatch(setToastes({
                            show: true, message: ouput.message
                            , color: 'bg-warning', estado:
                                "No hubo ninguna coincidencia"
                        }))
                        setDausuario({
                            nombreCompleto: "",
                            ciudad: "",
                            email: "",
                            movil: "",
                            resgistro: "",
                            password: '',
                            whatsapp: "", password: '', resgistro: false
                        })
                        return
                    }
                    else {
                        setDausuario({
                            nombreCompleto: salida.name,
                            ciudad: salida.direccion != null ? salida.direccion : ' ',
                            email: '',
                            movil: "",
                            resgistro: "",
                            whatsapp: '', password: '', resgistro: false
                        })
                        DatosUsuariosLocalStorag({ ...salida })
                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...salida }))
                        //$('#movil').val("")
                        $("#search").addClass("d-none")
                    }
                }).catch(erro => {
                    console.log(erro)
                })


                return
            }
            else {
                setDausuario({
                    nombreCompleto: ouput.data.nombreCompleto,
                    ciudad: ouput.data.ciudad,
                    email: ouput.data.email,
                    movil: "0" + ouput.data.movil,
                    resgistro: ouput.data.registro,
                    password: '',
                    whatsapp: ouput.data.movil, password: '', resgistro: true
                })
                DatosUsuariosLocalStorag({ ...ouput.data })
            }

        }).catch(erro => {
            console.log(erro)
        })
    }
    const verificar = () => {

    }
    $(document).ready(function () {
        const phoneInputField = document.querySelector("#movil");
        modalshow.modal.nombre == "suscritor" ? intlTelInput(phoneInputField, {
            initialCountry: "ec",
            separateDialCode: true,
            nationalMode: true,
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",

        }) : ''

    })

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
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Header className="py-3" >
                    <h5 className="modal-title">
                        CONSULTAR CLIENTE  /  CREAR CLIENTE
                    </h5>
                    <button type="button" className="close"
                        onClick={() => usedispatch(setModal({ nombre: '', estado: '' }))}
                    >
                        X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className=" container " >
                        <div className="container mb-3">

                        </div>
                        <div className="container-fluid row "  >
                            <div className="col-12 p-0  d-flex flex-column">
                                <div className=" d-flex pt-0 mb-2 justify-content-center" >
                                </div>
                                <div>
                                    <form id="register" className=" needs-validation  " onSubmit={(e) => e.preventDefault()}  >
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <div className=" d-flex  justify-content-end">

                                                    <button className="btn btn-danger mx-3" onClick={buscarsuscritor}> <i className=" fa fa-search"></i> Buscar cliente </button>
                                                    {
                                                        !datos.resgistro ? <button className="d-none btn btn-success "  ><i className="fa fa-search "></i> Buscar cédula </button> : ''
                                                    }
                                                    {!datos.resgistro ? <button className="btn btn-success ml-3" onClick={CrearUSuario} ><i className=" fa fa-plus-circle"></i> CREAR </button> :
                                                        <button className="btn btn-primary" onClick={successAlert} > <i className=" fa fa-check-circle"></i> </button>}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className=" input-group mb-3" >
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-address-card"></i>
                                                        </span>
                                                    </div>
                                                    <Form.Select className="form-control" value={code} onChange={(e) => setCode(e.target.value)} >
                                                        <option value={"cedula"}>Cédula ecuatoriana</option>
                                                        <option value={"extranjera"}>Cédula extranjera</option>
                                                        <option value={"pasaporte"}>Pasaporte</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 py-sm-2">
                                                <input id="cedula" type="text"
                                                    className="form-control numero"
                                                    name="cedula"
                                                    minLength={10}
                                                    maxLength={code == "cedula" ? 10 : 20}
                                                    onChange={() => setDausuario({
                                                        nombreCompleto: '',
                                                        ciudad: '',
                                                        email: '',
                                                        movil: '',
                                                        resgistro: '',
                                                        password: ''
                                                    })}
                                                placeholder={(code == "cedula") ? "Ingrese cédula" : "Ingrese su número de identificación"} required />
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
                                                        placeholder="Ingrese su nombres completos" required />
                                                    <div className="invalid-feedback">
                                                        Ingrese sus nombres

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-lg-6  ">
                                                <div className="input-group mb-3  px-0 d-flex justify-content-center ">
                                                    <input
                                                        name="movil" type="tel"
                                                        className="m-0 inptFielsd form-control " id="movil"
                                                        size={100}

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
                                                        id="ciudad"
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
                <div id="search" className="d-none"
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

                    }} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        padding: '10px',
                    }}>

                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="MagnifyingGlass-loading"
                            wrapperStyle={{}}
                            wrapperClass="MagnifyingGlass-wrapper"
                            glassColor='#c0efff'
                            color='green'
                        />
                    </div>

                </div>
            </Modal>


        </>
    )

}