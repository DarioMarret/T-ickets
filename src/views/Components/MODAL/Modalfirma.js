import { Modal } from "react-bootstrap"
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useState } from "react";
import { Buffer } from "buffer";
import axios from "../../../../node_modules/axios/index";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Boleteria_voucher } from "utils/EventosQuery/index";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
export default function ModalFirma() {
    let usedispatch = useDispatch()
    const [files, setFiles] = useState([]);
    let detallid = JSON.parse(sessionStorage.getItem("Detalleuid"))
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [loading, setLoading] = useState("d-none");
    //const [linea,setLinea]=useState(0)
    const updateFiles = (incommingFiles) => {
        console.log(incommingFiles)
        incommingFiles.length == 0 ? setFiles([]) : setFiles([incommingFiles[incommingFiles.length - 1]]);
        if (incommingFiles.length > 0) {
            const file = incommingFiles[incommingFiles.length - 1].file
            //console.log(file)
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = async () => {
                    console.log(file)
                    setImagenurl(reader.result)
                    if (file.type == "image/png") setType("png")
                    if (file.type == "image/jpeg") setType("jpeg")
                    if (file.type == "image/jpg") setType("jpg")
                };
                reader.readAsDataURL(file);
            } else {
                alert("Por favor, selecciona un archivo de imagen.");
            }
        }
    };
    let [imageDataUrlcedula, setImagenurl] = useState("")
    let [type, setType] = useState("")
    let imagecedula;

    $(document).ready(function () {

        const canvas = document.querySelector("#canvas");
        const btnlimpiar = document.querySelector("#limpiar");
        const descargar = document.querySelector("#descarga");
        let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
        const contexto = canvas.getContext("2d");
        const COLOR_PINCEL = "black";
        const COLOR_FONDO = "white";
        const GROSOR = 2;
        let haComenzadoDibujo = false;

        const obtenerXReal = (evento) => {
            if (evento.touches && evento.touches.length > 0) {
                return evento.touches[0].clientX - canvas.getBoundingClientRect().left;
            } else {
                return evento.clientX - canvas.getBoundingClientRect().left;
            }
        };

        const obtenerYReal = (evento) => {
            if (evento.touches && evento.touches.length > 0) {
                return evento.touches[0].clientY - canvas.getBoundingClientRect().top;
            } else {
                return evento.clientY - canvas.getBoundingClientRect().top;
            }
        };

        const inicioDibujo = (evento) => {
            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento);
            yActual = obtenerYReal(evento);
            contexto.beginPath();
            contexto.fillStyle = COLOR_PINCEL;
            contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
            contexto.closePath();
            haComenzadoDibujo = true;
        };

        const movimientoDibujo = (evento) => {
            if (!haComenzadoDibujo) {
                return;
            }

            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento);
            yActual = obtenerYReal(evento);
            contexto.beginPath();
            contexto.moveTo(xAnterior, yAnterior);
            contexto.lineTo(xActual, yActual);
            contexto.strokeStyle = COLOR_PINCEL;
            contexto.lineWidth = GROSOR;
            contexto.stroke();
            contexto.closePath();
            evento.preventDefault();
        };

        const finDibujo = () => {
            haComenzadoDibujo = false;
        };

        canvas.addEventListener("mousedown", inicioDibujo);
        canvas.addEventListener("mousemove", movimientoDibujo);
        canvas.addEventListener("mouseup", finDibujo);
        canvas.addEventListener("mouseout", finDibujo);

        canvas.addEventListener("touchstart", inicioDibujo);
        canvas.addEventListener("touchmove", movimientoDibujo);
        canvas.addEventListener("touchend", finDibujo);

        const limpiar = () => {
            contexto.fillStyle = COLOR_FONDO;
            contexto.fillRect(0, 0, canvas.width, canvas.height);
        };

        limpiar();
        btnlimpiar.onclick = () => limpiar()
        descargar.onclick = () => {
            //  if (files.length == 0) return

            functionModificaPDF()
            const enlace = document.createElement('a');
            // El título
            /*  enlace.download = "Firma.png";
              // Convertir la imagen a Base64 y ponerlo en el enlace
              enlace.href = $canvas.toDataURL();
              // Hacer click en él
              enlace.click();*/
        }
    });



    const functionModificaPDF = async () => {
        //setLoading("")
        const url = modal.estado.link_pago.replace("k/", "k/voucher/");
        console.log(url)
        const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        const imageDataUrl = canvas.toDataURL("image/png");
        const imageBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);
        const jpgDims = image.scale(0.5)
        console.log(image, imageBytes)
        firstPage.drawImage(image, {
            x: 110,
            y: 5,
            width: width / 3,
            height: height / 10,
        });
        const newPage = pdfDoc.addPage([width, height]);
        const base64Image = imageDataUrlcedula;
        const base64Data = base64Image.split(";base64,")[1];
        const imageBytesimgen = Buffer.from(base64Data, "base64");
        if (type == "png") imagecedula = await pdfDoc.embedPng(imageBytesimgen)
        if (type == "jpeg") imagecedula = await pdfDoc.embedJpg(imageBytesimgen)
        newPage.drawImage(imagecedula, {
            x: 50,
            y: width / 2,
            width: width / 2,
            height: height / 2

        });

        const pdfBytes = await pdfDoc.save();

        // Envía el PDF como parte de un formulario de datos de usuario
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        console.log(pdfBytes, pdfBlob)
        const fordata = new FormData();
        let nombre = url.split("voucher/")[1]
        fordata.append('image', pdfBlob, nombre + '.pdf');
        try {
            const { data } = await axios.post("https://api.ticketsecuador.ec/store/api/img/", fordata,
                {
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                    }
                })
            console.log(data)
            if (!data.success) {
                console.log(data)
                setLoading("d-none")
                return null
            }
            console.log(data)
            setLoading("")
            let boleto = await Boleteria_voucher({
                "estado": clienteInfo() == null ? 0 : 1,
                "id": "" + modal.estado.id,
                "link": data.link
            })
            if (boleto.estado) {
                let boletos = JSON.stringify({ ...detallid, ...boleto.datos })
                console.log(boletos)
                sessionStorage.setItem("Detalleuid", boletos)
                window.location.reload()
            }
            console.log(boleto, {
                "estado": "1",
                "id": modal.estado.id,
                "link": data.link
            })
            setLoading("")
            return data.link

        } catch (error) {
            console.log(error)
            return null

        }
        download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    };
    function cerrar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
    }

    return (
        <>
            <Modal
                show={(modal.nombre == "firma")}
                
                fullscreen={'md-down'}
            >
                <Modal.Header >
                    <button className="close mb-2" onClick={cerrar} >X</button>

                </Modal.Header>
                <Modal.Body className=" m-auto text-center ">
                    <div className="d-flex justify-content-center ">
                        <div className="row text-center col-10 ">
                            <div className="col-12 ">

                                <p >Agrega la foto de la cédula del propietario de la tarjeta:</p>
                                <Dropzone className="dropzone" onChange={updateFiles} value={files}
                                    type="file" accept="image/png, image/jpeg">
                                    {files.map((file) => (
                                        <FileMosaic {...file} preview />
                                    ))}
                                </Dropzone>
                            </div>

                            <p className={files.length == 0 ? "d-none" : ""}>Firmar a continuación:</p>
                            <canvas id="canvas" className={files.length == 0 ? "d-none" : ""}></canvas>
                        </div>

                    </div>
                    <br></br>
                    <div className=" d-flex justify-content-around">
                        <div>
                            <button className="btn btn-danger" id="limpiar">Limpiar</button>
                        </div>
                        <div>
                            <button disabled={files.length == 0} className="btn btn-success" id="descarga">Firmar</button>
                        </div>
                    </div>

                </Modal.Body>
                <div className={"d-none"}
                    style={{
                        display: 'none',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#eaebec',
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
                        <div class="spiner_loaging"></div>
                        <h4 className=' text-secondary'>Actualizando....</h4>


                    </div>
                </div>

            </Modal>
        </>
    )
}