import { Modal } from "react-bootstrap"

export default function ModalFirma() {

    $(document).ready(function(){
        
    const canvas = document.querySelector("#canvas");
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
    })


    return (
        <>
            <Modal
            show={true}
            >
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <p>Firmar a continuación:</p>
                    <canvas id="canvas"></canvas>
                    <br></br>
                        <button id="btnLimpiar">Limpiar</button>
                        <button id="btnDescargar">Descargar</button>
                        <button id="btnGenerarDocumento">Pasar a documento</button>
                </Modal.Body>

            </Modal>
        </>
    )
}