import { Modal } from "react-bootstrap"
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useState } from "react";
import { Buffer } from "buffer";
import axios from "../../../../node_modules/axios/index";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import { Dropzone, FileMosaic } from "@files-ui/react";
export default function ModalFirma() {
    const [files, setFiles] = useState([]);
    const updateFiles = (incommingFiles) => {
        console.log(incommingFiles)
        incommingFiles.length == 0 ? setFiles([]):setFiles([incommingFiles[incommingFiles.length - 1]]);
       if (incommingFiles.length > 0) {
           const file = incommingFiles[incommingFiles.length - 1].file
           console.log(file)
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
        }}
    };
    let [imageDataUrlcedula, setImagenurl] = useState("")
    let [type, setType] = useState("")
    let imagecedula;
    $(document).ready(function () {

        const canvas = document.querySelector("#canvas");
        const btnlimpiar = document.querySelector("#limpiar")
        const descargar = document.querySelector("#descarga");
        let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
        const contexto = canvas.getContext("2d");
        const COLOR_PINCEL = "black";
        const COLOR_FONDO = "white";
        const GROSOR = 2;
        let haComenzadoDibujo = false;
        const obtenerXReal = (clientX) => clientX - canvas.getBoundingClientRect().left;
        const obtenerYReal = (clientY) => clientY - canvas.getBoundingClientRect().top;
        canvas.addEventListener("mousedown", evento => {
            // En este evento solo se ha iniciado el clic, así que dibujamos un punto
            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento.clientX);
            yActual = obtenerYReal(evento.clientY);
            contexto.beginPath();
            contexto.fillStyle = COLOR_PINCEL;
            contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
            contexto.closePath();
            // Y establecemos la bandera
            haComenzadoDibujo = true;
        });

        canvas.addEventListener("mousemove", (evento) => {
            if (!haComenzadoDibujo) {
                return;
            }
            // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

            xAnterior = xActual;
            yAnterior = yActual;
            xActual = obtenerXReal(evento.clientX);
            yActual = obtenerYReal(evento.clientY);
            contexto.beginPath();
            contexto.moveTo(xAnterior, yAnterior);
            contexto.lineTo(xActual, yActual);
            contexto.strokeStyle = COLOR_PINCEL;
            contexto.lineWidth = GROSOR;
            contexto.stroke();
            contexto.closePath();
        });
        ["mouseup", "mouseout"].forEach(nombreDeEvento => {
            canvas.addEventListener(nombreDeEvento, () => {
                haComenzadoDibujo = false;
            });
        });
        const limpiar = () => {
            contexto.fillStyle = COLOR_FONDO;
            contexto.fillRect(0, 0, canvas.width, canvas.height)
        }
        limpiar()
        btnlimpiar.onclick = () => limpiar()
        descargar.onclick = () => {
            functionModificaPDF()
            const enlace = document.createElement('a');
            // El título
            /*  enlace.download = "Firma.png";
              // Convertir la imagen a Base64 y ponerlo en el enlace
              enlace.href = $canvas.toDataURL();
              // Hacer click en él
              enlace.click();*/
        }
        const fileInput = document.getElementById("file-input");
       /* fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
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
        });*/
    })
    const functionModificaPDF = async () => {
        const url = "https://payurl.link/voucher/dmOZNM1930001431997";
        const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        // Convert the canvas to a PNG image
        const imageDataUrl = canvas.toDataURL("image/png");

        // Load the image into the PDF
        const imageBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);
        const jpgDims = image.scale(0.5)
        console.log(image, imageBytes)
        firstPage.drawImage(image, {
            x: 110,
            y: 5,
            width: width / 3, // Change this to adjust the width of the image
            height: height / 10, // Change this to adjust the height of the image
        });
        // Create a new page and add it to the PDF
        //variable de imagen base64 imageDataUrlcedula
        //   console.log(imageDataUrlcedula)
        const newPage = pdfDoc.addPage([width, height]);
        const base64Image = imageDataUrlcedula;
        const base64Data = base64Image.split(";base64,")[1];
        const imageBytesimgen = Buffer.from(base64Data, "base64");
        if (type == "png") imagecedula = await pdfDoc.embedPng(imageBytesimgen)
        if (type == "jpeg") imagecedula = await pdfDoc.embedJpg(imageBytesimgen)

        // Draw the image in the new PDF page
        newPage.drawImage(imagecedula, {
            x: 50,
            y: width / 2,
            width: width / 2, // Change this to adjust the width of the image
            height: height / 2

        });

        const pdfBytes = await pdfDoc.save();
        //const pdfBase64 = btoa(String.fromCharCode.apply(null, pdfBytes));

        // Envía el PDF como parte de un formulario de datos de usuario
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        console.log(pdfBytes, pdfBlob)
        const fordata = new FormData();
        fordata.append('image', pdfBlob, 'dmOZNM1930001431997.pdf');
        try {
            //const fordata = new FormData();
            //fordata.append('image', parm);
            //console.log(parm)
            const { data } = await axios.post("https://api.ticketsecuador.ec/store/api/img/", fordata,
                {
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                    }
                })
            if (!data.success) return null
            console.log(data)
            return data.link

        } catch (error) {
            console.log(error)
            return null

        }
        //const formData = new FormData();
        // formData.append('pdfFile', new Blob([pdfBytes], { type: 'application/pdf' }), 'pdf-lib_modification_example.pdf');
        download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    };

    return (
        <>
            <Modal
                show={true}
            >
                <Modal.Header>

                </Modal.Header>
                <Modal.Body className=" m-auto">
                    <Dropzone onChange={updateFiles} value={files}
                        type="file" accept="image/png, image/jpeg"
                    >
                        {files.map((file) => (
                            <FileMosaic {...file} preview />
                        ))}
                    </Dropzone>
                    
                    <p>Firmar a continuación:</p>
                    <canvas id="canvas"></canvas>
                    <br></br>
                    <button className="btn btn-default" id="limpiar">Limpiar</button>
                    <button className="btn btn-default" id="descarga">Descargar</button>
                    <button className="btn btn-default" id="btnGenerarDocumento">Pasar a documento</button>
                </Modal.Body>

            </Modal>
        </>
    )
}