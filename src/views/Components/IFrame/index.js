import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import jsPDF from "jspdf";
import PdfViewticketApp from "views/Pages/Suscriptores/Pdfwie";

export default function Inframene() {
    let dispatch = useDispatch()
    let modal = useSelector(state => state.SuscritorSlice.modal)
    /// console.log(modal)
    function imprime(){
        html2canvas(document.querySelector("#printe")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            let frame = document.querySelector("#frame")
            //frame.src = pdf.output("bloburl");
            // setTimeout(function () { document.querySelector("#printe").remove() }, 1000)
            //document.querySelector("#printe").remove()
            //return
            //pdf.save()
            window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        })
    }
    useEffect(() => {
        const nuevo = () => {

            // Agrega la imagen al contenedor

            html2canvas(document.querySelector("#pdfgenra")).then(canvas => {
                console.log("aqui")
                var imgWidth = 130;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                const contentDataURL = canvas.toDataURL('image/png')
                let pdf = new jsPDF('p', 'mm', 'a4'); // a5 size page of PDF
                var position = 10;
                pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
                let frame = document.querySelector("#frame")
                // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
                // frame.src = pdf.output("bloburl");
                //setTimeout(function () { document.querySelector("#pdfgenra").remove() }, 1000)
                //document.querySelector("#printe").remove()
                return
                //pdf.save()
                window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
            });



        }
        /*  setTimeout(function(){
              nuevo()
          },3000)*/
        //nuevo()
    }, [(modal.nombre == "pdfsshow")])
    return (
        <>
            <Modal
                show={(modal.nombre == "pdfsshow" || modal.nombre == "pdfsshowpar")}
                size={"lg"}
                fullscreen={(modal.nombre == "pdfsshow")}
            >
                <Modal.Header className="py-3">
                    {(modal.nombre == "pdfsshowpar") ? <h5>
                        Felicidades, estás participando no olvides seguir los pasos:
                    </h5> : ""}
                    <button className="close" onClick={() => dispatch(setModal({ nombre: "", estado: "" }))}>X</button>
                </Modal.Header>
                <Modal.Body className="">
                    {(modal.nombre == "pdfsshow") ?
                        <div >
                        <div className="w-100 text-center py-2">
                                <button className="btn btn-default" onClick={imprime} >imprime <i className=" fa  fa-file-pdf"></i></button>
                        </div>
                        
                        <PdfViewticketApp
                            link={modal.estado}/>
                        </div>
                        :
                        ""

                    }
                </Modal.Body>


            </Modal>

        </>
    )
}