import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { carrusel } from "../imagenstatctic";
let { proximo } = carrusel
export default function SubscrtitoViews() {
    let usedispach= useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
   // console.log(modal)
    function cerrar(){
        usedispach(setModal({ nombre: '', estado: '' }))
    }
    return (
        <>
            <Modal show={modal.nombre =="Subscription"}>
                <Modal.Header className="py-3">
                    <button className="close" onClick={cerrar} >X</button>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className=" font-weight-bold">Espera Próximamente</h5>
                    <img className=" border rounded-4 img-fluid"
                        src={proximo}
                    ></img>
                </Modal.Body>
            </Modal>
        </>
    )
}