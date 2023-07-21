import { Modal } from "react-bootstrap"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useDispatch } from "react-redux";
const steps = ['Datos empresa', 'Datos de facuras', 'Datos complementales '];
export default function ModalFacturacionView(props) {
    let { show, setShow } = props
    let usedispatch= useDispatch()
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [logo, setLogo] = React.useState("")
    const [firma, setFirma] = React.useState("")
    const [datos, setDatos] = React.useState({
        "razon_social": "",
        "ruc": "",
        "ambiente": "1",
        "establecimiento": "",
        "direccion": "",
        "matriz": "",
        "correo": "",
        "punto_emision": "",
        "tipo_emision": "",
        "tipo_comprobante": "",
        "numero_secuencial": "",
        "iva_actual": "",
        "tarifa": "",
        "entidad_cert": "",
        "whatsapp": "",
        "fecha_emision": "",
        "fecha_vencimiento": "",
        "file": "",
        "contabilidad": "",
        "firma": ""
    })
    const isStepOptional = (step) => {
        return step === 1;
    };
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        const form = document.getElementById("primero")
        const formData = new FormData(form);
        const formProps = Object.fromEntries(formData);
        console.log(formProps)
        console.log(Object.values(Object.fromEntries(formData)).every(e => e))
        if (!Object.values(Object.fromEntries(formData)).every(e => e)) {
            form.classList.add("was-validated")
            return
        }
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleNextdos = () => {
        let newSkipped = skipped;
        const formse = document.getElementById("segundo")
        const formData = new FormData(formse);
        const formProps = Object.fromEntries(formData);
        console.log(Object.values(Object.fromEntries(formData)).some(e => e))
        console.log(formProps)
        if (!Object.values(Object.fromEntries(formData)).every(e => e)) {
            formse.classList.add("was-validated")
            return
        }
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleNexttres = () => {
        let newSkipped = skipped;
        const fomrte = document.getElementById("tercero")
        const formData = new FormData(fomrte);
        const formProps = Object.fromEntries(formData);
        console.log(Object.values(Object.fromEntries(formData)).some(e => e))
        console.log(formProps)
        console.log(datos, firma)
        if (!Object.values(Object.fromEntries(formData)).every(e => e)) {
            fomrte.classList.add("was-validated")
            return
        }
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handechange = (e) => {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }
    const handelchangeIMG = (e) => {
        if (e.name == "file") {
            setLogo(e.files[0] ? e.files[0] : '')
        } else if (e.name == "firma") {
            setFirma(e.files[0] ? e.files[0] : '')
        }
    }


    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const guradarinfoFactura = async () => {
        setinput(true)
        try {
            const conci = await Obtenerlinkimagen(logo)
            if (conci == null) {
                console.log(conci, "mapa")
                usedispatch(setToastes({ show: true, message: 'Imagen no se creo', color: 'bg-success', estado: 'Guardado' }))
                return
            }
            setTimeout(async function () {
                const mapa = await Obtenerlinkimagen(firma)
                if (mapa == null) {
                    console.log(conci, "mapa")
                    usedispatch(setToastes({ show: true, message: 'Imagen mapa no se creo', color: 'bg-success', estado: 'Guardado' }))
                    return
                }
                let defauldata = {
                    ...datos
                }
                console.log(defauldata)
                if (evento.success) {
                    console.log(evento)
                    ListaPrecios()
                    usedispatch(setToastes({ show: true, message: 'Evento guardado correctamente', color: 'bg-success', estado: 'Guardado' }))
                }
            }, 3000)


        } catch (error) {
            console.log(error)
            usedispatch(setToastes({ show: true, message: 'No se guardaron los datos del evento', color: 'bg-danger', estado: 'Hubo un error' }))
            setinput(false)
        }
    }
    return (
        <Modal
            show={show}
            size="lg"
            centered
        >
            <Modal.Header className="py-3">
                <button className="close" onClick={() => setShow(!show)}><i className=" fa fa-close"></i></button>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {/* <Wizard />*/}
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                /* if (isStepOptional(index)) {
                                     labelProps.optional = (
                                         <Typography variant="caption">Optional</Typography>
                                     );
                                 }*/
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    {activeStep == 0 ?
                                        <form id="primero" className="">
                                            <div className="row">
                                                <div className="col-12 ">
                                                    <div className="group">
                                                        <input type="text"
                                                            value={datos.razon_social}
                                                            onChange={(e) => handechange(e.target)}
                                                            name="razon_social"

                                                            className="textbox " required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Rason social</label>
                                                        <div class="invalid-tooltip">
                                                            Complete la razon social</div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6 ">
                                                    <div className="group">
                                                        <input type="number"
                                                            value={datos.ruc}
                                                            onChange={(e) => handechange(e.target)}
                                                            name="ruc"
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>RUC:</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el RUC:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <select type="text"
                                                            name="ambiente"
                                                            value={datos.ambiente}
                                                            onChange={(e) => handechange(e.target)}
                                                            placeholder="Ambiente"
                                                            className="textbox" required >
                                                            <option value="" disabled></option>
                                                            <option value="1">Producion</option>
                                                            <option value="2">Prueba</option>
                                                        </select>
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Ambiente</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el RUC:
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            maxLength={3}
                                                            value={datos.establecimiento}
                                                            onChange={(e) => handechange(e.target)}
                                                            name="establecimiento"
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Establecimiento</label>
                                                        <div class="invalid-tooltip">
                                                            Complete  los tres digitois del establecimiento:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="text"
                                                            name="direccion"
                                                            value={datos.direccion}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Dirección</label>
                                                        <div class="invalid-tooltip">
                                                            Complete la direccón:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="text"
                                                            name="matriz"
                                                            value={datos.matriz}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Matriz</label>
                                                        <div class="invalid-tooltip">
                                                            Complete los datos de Matris:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="email"
                                                            name="correo"
                                                            value={datos.correo}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Correo</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el correo:
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        : ""}
                                    {activeStep == 1 ?
                                        <form id="segundo">
                                            <div className="row">
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            maxLength={3}
                                                            value={datos.punto_emision}
                                                            onChange={(e) => handechange(e.target)}
                                                            name="punto_emision"
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Emisión</label>
                                                        <div class="invalid-tooltip">
                                                            Complete la emisión:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            maxLength={3}
                                                            name="tipo_emision"
                                                            value={datos.tipo_emision}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Tipo emision</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el tipo emisión:
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            maxLength={3}
                                                            name="tipo_comprobante"
                                                            value={datos.tipo_comprobante}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Tipo Comprobante</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el Comprobante
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            maxLength={9}
                                                            name="numero_secuencial"
                                                            value={datos.numero_secuencial}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Secuencial</label>
                                                        <div class="invalid-tooltip">el numero seciencial de 9 digitos
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            name="iva_actual"
                                                            value={datos.iva_actual}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Iva actual</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el valor del Iva
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            name="tarifa"
                                                            value={datos.tarifa}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Tarifa</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el valor de la tarifa
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="text"
                                                            name="entidad_cert"
                                                            value={datos.entidad_cert}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>Entidad cerificadora</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el nombre de la entidad
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="number"
                                                            name="whatsapp"
                                                            value={datos.whatsapp}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label>whastapp</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el numero del whastapp
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>

                                        : ""}
                                    {activeStep == 2 ?
                                        <form id="tercero">
                                            <div className="row">
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="date"
                                                            name="fecha_emision"
                                                            value={datos.fecha_emision}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label className="active">Fecha emision</label>
                                                        <div class="invalid-tooltip">
                                                            Complete la fecha de emision
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="date"
                                                            value={datos.fecha_vencimiento}
                                                            name="fecha_vencimiento"
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label className="active">Fecha vencimiento</label>
                                                        <div class="invalid-tooltip">
                                                            Complete la fecha de vencimiento
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="file"
                                                            name="file"

                                                            accept="image/*"
                                                            onChange={(e) => handelchangeIMG(e.target)}
                                                            className="form-control" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label className="active">LOGO</label>

                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="text"
                                                            name="contabilidad"
                                                            value={datos.contabilidad}
                                                            onChange={(e) => handechange(e.target)}
                                                            className="textbox" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label >Contabilidad</label>
                                                        <div class="invalid-tooltip">
                                                            Complete el Comprobante
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div className="group">
                                                        <input type="file"
                                                            accept="p12/*"
                                                            name="firma"

                                                            onChange={(e) => handelchangeIMG(e.target)}
                                                            className="form-control" required />
                                                        <span className="highlight"></span>
                                                        <span className="bar"></span>
                                                        <label className="active">Firma p2</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </form> : ""}

                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Atras
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {/*isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )*/}

                                    {activeStep === steps.length - 1 ?
                                        <Button onClick={handleNexttres}>Guardar</Button>
                                        : ""}
                                    {
                                        activeStep == 0 ?
                                            <Button onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                            :
                                            ""
                                    }
                                    {
                                        activeStep == 1 ?
                                            <Button onClick={handleNextdos}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                            :
                                            ""
                                    }
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>

                </div>

            </Modal.Body>
        </Modal>
    )
}