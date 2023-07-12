import axios from "axios"
import { useState, useEffect } from "react"
import { Modal, Spinner, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { DatosUsuariocliente } from "utils/constantes"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { DatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { getCedula } from "utils/DatosUsuarioLocalStorag"
import { Authsucrito } from "utils/Query"
import { ValidarWhatsapp } from "utils/Query"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import intlTelInput from 'intl-tel-input';
import logo from "../../../../assets/imagen/logo-inicio.png";
import { Whatsappnumero } from "utils/constantes"
import { Triangle } from "react-loader-spinner"
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice"
import { buscarcliente } from "utils/Querypanelsigui"
import ReactGA from 'react-ga';
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import addNotification from "react-push-notification/dist"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
import ToastViews from "views/Components/TOAST/toast"
import { Emailcontec } from "utils/Emails"
const ResgistroView = (prop) => {
    const { setDatoToas, abrir } = prop
    let usedispatch = useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [spinervi, seTspine] = useState("d-none")
    const [datosPerson, setPerson] = useState({
        cedula: '', name: '', email: '', edad: '', movil: '', discapacidad: '', genero: '', direccion: '', password: '',
    })
    const [primro, setsegundo] = useState("password")
    const [segundo, setprimero] = useState("password")
    const [check, setCheck] = useState({
        primero: '',
        segunfo: ''
    })
    const [nedvalida, sedtValida] = useState("")
    const [code, setCode] = useState("cedula")

    async function hanbleOnchange(e) {
        const usuario = getDatosUsuariosLocalStorag()

        setPerson({
            ...datosPerson,
            [e.target.name]: e.target.value
        })
        if (e.target.name == "emailconfirma") {
            document.getElementById("emailconfirma").classList.remove("is-invalid")
        }
        if (e.target.name == "passwordcomfirma") {
            document.getElementById("passwordcomfirma").classList.remove("is-invalid")
        }
        if (e.target.name === "cedula" && e.target.value.length == 10) {
            if (code == "cedula") {
                try {
                    seTspine("")
                    const busacar = await buscarcliente({ "cedula": e.target.value, "email": "" })
                    console.log(busacar)
                    if (busacar.success == true) {
                       usedispatch(setToastes({
                            show: true,
                            message: "Por favor inicie sesión con el correo: " + busacar.data["email"],
                            color: 'bg-success',
                            estado: "Usuario Registrado",
                        }))
                        usedispatch(setModal({ nombre: 'loginpage', estado: modal.estado }))
                        seTspine("d-none")

                    } else {
                        const datos = await getCedula(e.target.value)
                        console.log(datos)
                        const { name, direccion } = datos
                        if (name) {

                            seTspine("d-none")
                            setPerson({
                                nombreCompleto: name,
                                whatsapp: '', ...datos,
                                direccion: direccion,
                                email: ''
                            })
                           usedispatch(setToastes({
                                show: true,
                                message: "Encontrado: " + name,
                                color: 'bg-success',
                                estado: "Hubo una coincidencia, Complete los datos restantes ",
                            }))
                            DatosUsuariosLocalStorag({
                                ...usuario,
                                ...datos
                            })
                        }
                        else {
                            seTspine("d-none")
                            setPerson({
                                cedula: e.target.value, name: '', email: '', edad: '', movil: '', discapacidad: '', genero: '', direccion: '', password: '',
                            })
                            DatosUsuariosLocalStorag({
                                email: '',
                                edad: '',
                                movil: '',
                                discapacidad: '',
                                genero: '',
                                direccion: '',
                                password: '',
                            })
                           usedispatch(setToastes({
                                show: true,
                                message: "Vuelva a interntarlo o cambie de metodo de identificación",
                                color: 'bg-danger',
                                estado: "No hubo coincidencia de cédula",
                            }))
                        }
                    }
                } catch (error) {

                    seTspine("d-none")
                }
            }

        }
        else if (e.target.name == "movil") {
            DatosUsuariosLocalStorag({
                ...datosPerson,
                whatsapp: e.target.value
            })
        }

    }
    function Suscritosfirs() {
        usedispatch(setModal({ nombre: '', estado: '' }))
    }

    async function Registeruser(e) {
        e.preventDefault();
        sedtValida("was-validated")
        let info = getDatosUsuariosLocalStorag()
        const form = new FormData(e.target)
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const { name, email, password, movil, direccion, cedula, passwordcomfirma, emailconfirma } = Object.fromEntries(form.entries())
        // console.log(Object.fromEntries(form.entries()))
        sessionStorage.setItem(Whatsappnumero, movil)
        let datos = {
            nombreCompleto: name.trim(),
            email: email.trim(),
            password: password.trim(),
            movil: movil.trim(),
            ciudad: "guayaquil",
            //ciudad: modal.estado == "Subscription" ? "Eladio Carrion" :"guayaquil",
            direccion: direccion.trim(),
            cedula: cedula.trim(),
        }
        console.log(datos)
        DatosUsuariosLocalStorag({ ...info, whatsapp: movil })

        if (!Object.values(Object.fromEntries(form.entries())).some(e => e)) {
           usedispatch(setToastes({
                show: true,
                message: "Falta datos por completar",
                color: 'bg-danger',
                estado: "Complete toda la información",
            }))
            return
        }
        if (parseInt(movil.substring(0, 1)) == 0) {
           usedispatch(setToastes({
                show: true,
                message: "Ejemplo 999 999 999 ",
                color: 'bg-danger',
                estado: "El fromato celular no es el correcto ",
            }))
            return
        }
        if (password.length < 8) {
           usedispatch(setToastes({
                show: true,
                message: "La contraseña debe tener almenos 8 caracteres",
                color: 'bg-danger',
                estado: "Email " + email + " Invalido",
            }))
            return
        }

        if (!emailRegex.test(email)) {
           usedispatch(setToastes({
                show: true,
                message: "Fromato de correo Erroneo",
                color: 'bg-danger',
                estado: "Email " + email + " Invalido",
            }))
            return
        }
        if (password.length < 7 && movil.length != 9) {
            console.log("aqui")
            return
        }
        if (password != passwordcomfirma) {
            document.getElementById("passwordcomfirma").classList.add("is-invalid");
            //  console.log("asta qui no msa")
            if (email != emailconfirma) {
                document.getElementById("emailconfirma").classList.add("is-invalid");
                return
            }

            return
        }
        if (email != emailconfirma) {
            document.getElementById("emailconfirma").classList.add("is-invalid");
            if (password != passwordcomfirma) {
                document.getElementById("passwordcomfirma").classList.add("is-invalid");
                return
            }
            return
        }

        else {
            try {
                //let nuemro = await ValidarWhatsapp()
                /*if (nuemro != null) {
                   usedispatch(setToastes({
                        show: true,
                        message: "Ingrese un numero de Whatsapp",
                        color: 'bg-danger',
                        estado: "Numero " + movil + " Invalido",
                    })
                    console.log("AQUI")
                    return
                }*/

                try {
                    // console.log("condireccion-->", datos)


                    const registro = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_suscriptor", datos, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                        }
                    })
                    console.log(datos, registro)

                    if (registro.data.success) {
                        if (clienteInfo() != null) {
                            window.location.reload()
                            return
                        }
                        let usuario = getDatosUsuariosLocalStorag()
                        const { data } = await Authsucrito({ email: email, password: password },)
                        var hoy = new Date();
                        let users = {
                            ...usuario,
                            cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil,
                            telefono: movil, name: data.nombreCompleto,
                            email: data.email, hora: String(hoy),
                            enable: data.enable, id: data.id,
                            envio: ''
                        }

                        DatosUsuariosLocalStorag({ ...usuario, ...users })
                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                        usedispatch(setToastes({
                            show: true,
                            message: "Bienvenido " + data.nombreCompleto,
                            color: 'bg-success',
                            estado: "Inicio Exitoso",
                        }))
                        /*  usedispatch(setToastes({
                               show: true,
                               message: "Bienvenido " + data.nombreCompleto,
                               color: 'bg-success',
                               estado: "Inicio Exitoso",
                           })*/
                      /*  addNotification({
                            title: 'Bienvenido',
                            subtitle: 'registro exitosos ',
                            message: 'Atento tendremos Noticias sobre Eladio Carrión Guayaquil',
                            theme: 'darkblue',
                            native: true // when using native, your OS will handle theming.
                        })*/
                        modal.estado != null ? abrir(modal.estado) :
                            usedispatch(setModal({ nombre: "", estado: "" }))
                        usedispatch(addususcritor({ users }))
                        ReactGA.event({
                            category: "Registrado",
                            action: "registro",
                            label: "Button",
                        })
                        Emailcontec({ correo: data.email, nombre: data.nombreCompleto }).then(sal=>{
                            console.log(sal)
                        }).catch(err=>{
                            console.log(err)

                        })
                    } else {
                        usedispatch(setToastes({
                            show: true,
                            message: "El Email ya " + email + " se encuentra registrado intente con otro",
                            color: 'bg-danger',
                            estado: "Error de registro",
                        }))
                    }
                } catch (error) {
                    //console.log(error)
                    usedispatch(setToastes({
                        show: true,
                        message: "El Email ya " + email + " se encuentra registrado intente con otro",
                        color: 'bg-danger',
                        estado: "Email dubplicado",
                    }))

                }

            } catch (error) {
                document.getElementById("cedula").classList.add("is-invalid")
                document.getElementById("email").classList.add("is-invalid")
                usedispatch(setToastes({
                    show: true,
                    message: "Hubo un error intente de nuevo",
                    color: 'bg-danger',
                    estado: "Error",
                }))
                console.log(error)
            }

        }

    }
    function handelMetodopago(target, value) {
        setCheck({
            ...check,
            [target.name]: target.checked
        })
        // sessionStorage.setItem(Metodos, value)
        // setCheck(false)
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
        $(".nombres").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 === "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
        // document.getElementById("movil");
        $("#movil").intlTelInput({
            initialCountry: "ec",
            separateDialCode: true,
            nationalMode: true,
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",

        })

    });

    useEffect(() => {
        /* if("geolocation"in navigator){
             navigator.geolocation.getCurrentPosition(function(position){
                 let lat = position.coords.latitude;
                 let log = position.coords.longitude;
                 console.log(lat,log)
             })
         }
         else{
             console.log("no soport")
         }*/
        $(document).ready(function () {
            $(".numero").keypress(function (e) {
                var n = (e = e || window.event).keyCode || e.which,
                    t = -1 != "0123456789".indexOf(String.fromCharCode(n));
                (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
            })
            $(".nombres").keypress(function (e) {
                var n = (e = e || window.event).keyCode || e.which,
                    t = -1 === "0123456789".indexOf(String.fromCharCode(n));
                (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
            })
            // document.getElementById("movil");
            var input = document.querySelector("#movil");
            window.intlTelInput(input, {
                initialCountry: "ec",
                separateDialCode: true,
                nationalMode: true,
                utilsScript:
                    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",

            })

        });
    }, [modal.nombre == "registro" ? true : false])
    return (
        <>
            <Modal
                show={modal.nombre == "registro" ? true : false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size='lg'
                fullscreen={"md-down"}
                onHide={() => usedispatch(setModal({ nombre: 'loginpage', estado: modal.estado }))}
            >
                <Modal.Header className="py-4  bg-dark ">
                    <button type="button" className="close"
                        onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: modal.estado }))}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column ">
                        <div className="container text-center d-none d-sm-none d-md-block">
                            <img src={logo} className="mb-4 img-fluid " style={{ height: '125px', color: 'black' }} alt="" />
                        </div>
                        <div className="container-fluid row "  >
                            <div className="col-12 p-0 d-flex flex-column">
                                <div>
                                    <form className={nedvalida} onSubmit={(e) => Registeruser(e)} method="post" >
                                        <div className="row">

                                            <div className="col-12 col-lg-4">
                                                <div className=" input-group mb-3" >
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="fa fa-address-card"></i>

                                                        </span>
                                                    </div>
                                                    <Form.Select className="form-control" value={code} onChange={(e) => setCode(e.target.value)} name="perfil" >
                                                        <option value={"cedula"}>Cédula ecuatoriana</option>
                                                        <option value={"extranjera"}>Cédula extranjera</option>
                                                        <option value={"pasaporte"}>Pasaporte</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                    </div>

                                                    {code == "cedula" ?
                                                        <input id="cedula" type="text"
                                                            className="form-control numero"
                                                            name="cedula"
                                                            value={datosPerson.cedula}
                                                            minLength={10}
                                                            maxLength={10}

                                                            onChange={(e) => hanbleOnchange(e)}
                                                            placeholder="cédula" />
                                                        : <input id="cedula" type="text"
                                                            className="form-control numero"
                                                            name="cedula"
                                                            value={datosPerson.cedula}
                                                            minLength={0}


                                                            onChange={(e) => hanbleOnchange(e)}
                                                            placeholder="cédula" />

                                                    }
                                                    < div className="invalid-feedback">
                                                        identificación registrada o inválida
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                    </div>

                                                    <input type="text"
                                                        className="form-control nombres"
                                                        id="name"
                                                        name="name"
                                                        value={datosPerson.name}

                                                        required
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Ingrese su nombre completo" />
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
                                                        id="movil"
                                                        name="movil" type="tel"
                                                        className="m-0 inptFielsd  "
                                                        onChange={(e)=>console.log(e.target.value)}
                                                        placeholder="999 999 99" />
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
                                                        name="direccion"
                                                        maxLength={255}
                                                        required
                                                        value={datosPerson.direccion}
                                                        onChange={(e) => hanbleOnchange(e)}
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

                                                    <input id="email" type="email" className="form-control " name="email"
                                                        value={datosPerson.email}
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        required
                                                        placeholder="Email" />
                                                    <div className="invalid-feedback">
                                                        Ingrese un email
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-6" >
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                                    </div>

                                                    <input id="emailconfirma" type="email" className="form-control"
                                                        name="emailconfirma"
                                                        required
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Confirmar Email" />
                                                    <div className="invalid-feedback">
                                                        El correo no Coincide  </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                    </div>

                                                    <input id="password" type={primro} className="form-control" name="password"

                                                        onChange={(e) => hanbleOnchange(e)}
                                                        required
                                                        placeholder="Contraseñas" />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text groud-eye"
                                                            onClick={() => primro == "password" ? setsegundo("text") : setsegundo("password")}
                                                        ><i className={primro != "password" ? "fa fa-eye" : "fa fa-eye-slash"}

                                                        ></i></span>
                                                    </div>
                                                    <div className="invalid-feedback">
                                                        La contraseña debe ser mayor de 7 caracteres
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-6" >
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                    </div>
                                                    <input type={segundo}
                                                        id="passwordcomfirma"
                                                        name='passwordcomfirma'
                                                        required
                                                        minLength={8}
                                                        placeholder="Confirmar Contraseña"
                                                        className="form-control"
                                                        onChange={(e) => hanbleOnchange(e)} />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text groud-eye"
                                                            onClick={() => segundo == "password" ? setprimero("text") : setprimero("password")}
                                                        ><i className={segundo != "password" ? "fa fa-eye" : "fa fa-eye-slash"}

                                                        ></i></span>
                                                    </div>
                                                    <div className="invalid-feedback">
                                                        La contraseña no Coincide
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12  text-start d-flex flex-column d-none d-sm-none d-md-block ">
                                            <div className="d-flex text-start  flex-wrap-reverse ">
                                                <div className="col-12 ">
                                                    <p style={{ fontSize: "0.7em" }}>Acepto los <span style={{
                                                        fontWeight: "bold"
                                                    }}>Términos y condiciones</span> emitidas por
                                                        t-icket</p>
                                                </div>

                                            </div>

                                            <div className="d-flex   flex-wrap-reverse ">
                                                <div className="col-12 d-flex ">
                                                    <input className="form-check-input" type="checkbox"
                                                        name="primero"
                                                        checked={check.primero}
                                                        onChange={(e) => handelMetodopago(e.target)}

                                                        value="" id="invalidCheck" required />
                                                    <p style={{ fontSize: "0.7em" }}>
                                                        Acepto que para canjear los tickets, debo presentar la tarjeta con la que fue
                                                        realizada la compra , caso contrario no podrá retirar los boletos duros sin opción a
                                                        rembolso
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex ">
                                                <div className="col-12 d-flex ">
                                                    <input className="form-check-input"
                                                        name="segunfo"
                                                        type="checkbox" id="segunfo" required
                                                        checked={check.segunfo}
                                                        onChange={(e) => handelMetodopago(e.target)}
                                                    />
                                                    <p style={{
                                                        fontSize: "0.8em",
                                                        fontWeight: "bold"
                                                    }}>
                                                        Acepto que se crea mi cuenta de usuario en el portal de t-ickets, la misma que contiene mis datos personales, así como los
                                                        datos de mis compras, también recibir las promociones por ese mismo medio.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-success"
                                                    disabled={(!check.primero || !check.segunfo)}
                                                    type="submit"
                                                >Crear Cuenta</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>



                        </div>


                    </div>
                    <div >
                        <ToastViews />

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

                </Modal.Body>
                <Modal.Footer>
                    <div className="col-12 border-top  px-0 pb-0 text-start d-flex flex-column d-block d-sm-block d-md-none ">
                        <div className="d-flex text-start  flex-wrap-reverse ">
                            <div className="col-12 ">
                                <p style={{ fontSize: "0.7em" }}>Acepto los <span style={{
                                    fontWeight: "bold"
                                }}>Términos y condiciones</span> emitidas por
                                    t-icket</p>
                            </div>

                        </div>

                        <div className="d-flex   flex-wrap-reverse ">
                            <div className="col-12 d-flex ">
                                <input className="form-check-input" type="checkbox"
                                    name="primero"
                                    checked={check.primero}
                                    onChange={(e) => handelMetodopago(e.target)}

                                    value="" id="invalidCheck" required />
                                <p style={{ fontSize: "0.7em" }}>
                                    Acepto que para canjear los tickets, debo presentar la tarjeta con la que fue
                                    realizada la compra , caso contrario no podrá retirar los boletos duros sin opción a
                                    rembolso
                                </p>
                            </div>
                        </div>
                        <div className="d-flex ">
                            <div className="col-12 d-flex ">
                                <input className="form-check-input"
                                    name="segunfo"
                                    type="checkbox" id="segunfo" required
                                    checked={check.segunfo}
                                    onChange={(e) => handelMetodopago(e.target)}
                                />
                                <p style={{
                                    fontSize: "0.7em",
                                    fontWeight: "bold"
                                }}>
                                    Acepto que se crea mi cuenta de usuario en el portal de t-ickets, la misma que contiene mis datos personales, así como los
                                    datos de mis compras, también recibir las promociones por ese mismo medio.
                                </p>

                            </div>

                        </div>

                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ResgistroView