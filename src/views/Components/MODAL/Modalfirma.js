import { Modal } from "react-bootstrap"
import { degrees,PDFDocument,rgb,StandardFonts } from "pdf-lib";
export default function ModalFirma() {

    $(document).ready(function(){
        
    const canvas = document.querySelector("#canvas");
    const btnlimpiar =document.querySelector("#limpiar")
    const descargar = document.querySelector("#descarga");
    let xAnterior=0, yAnterior=0, xActual=0,yActual=0;
    const contexto = canvas.getContext("2d");
    const COLOR_PINCEL ="black";
    const COLOR_FONDO = "white";
    const GROSOR=2;
    let haComenzadoDibujo=false;
    const obtenerXReal=(clientX)=> clientX - canvas.getBoundingClientRect().left;
    const obtenerYReal=(clientY)=> clientY - canvas.getBoundingClientRect().top;
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
    const limpiar=()=>{
        contexto.fillStyle=COLOR_FONDO;
        contexto.fillRect(0,0,canvas.width,canvas.height)
    }
    limpiar()
    btnlimpiar.onclick=()=>limpiar()
    descargar.onclick=()=>{
        functionModificaPDF()
        const enlace = document.createElement('a');
        // El título
      /*  enlace.download = "Firma.png";
        // Convertir la imagen a Base64 y ponerlo en el enlace
        enlace.href = $canvas.toDataURL();
        // Hacer click en él
        enlace.click();*/
    }
    })
    const functionModificaPDF=async()=>{
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
       //let imagen=canvas.toDataURL();
       firstPage.drawText('This text was added with JavaScript!', {
          x: 5,
          y: height / 2 + 300,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(-45),
        })
      
        const pdfBytes = await pdfDoc.save()
       download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    }
    

    return (
        <>
            <Modal
            show={true}
            >
                <Modal.Header>

                </Modal.Header>
                <Modal.Body className=" m-auto">
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