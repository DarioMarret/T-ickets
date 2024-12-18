import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"

export default function Noticiamodal() {
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let usedispatch = useDispatch()
    
    return (
        <>
            <Modal
                show={modal.nombre == "noticia" ? true : false}
              
                centered
            >
                <Modal.Header className="py-3">
                    <button className="close " onClick={()=>usedispatch(setModal({ nombre: "", estado: "" }))}>X</button>
                </Modal.Header>
                
                <img className=" img-fluid" src="https://api.t-ickets.com/store/img/whatsapp image 2023-01-30 at 18.48.09.jpeg"></img>
            </Modal>
        </>
    )
}
