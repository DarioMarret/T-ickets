import { Modal } from "react-bootstrap"
import { useSelector } from "react-redux"

export default function Noticiamodal() {
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    return (
        <>
            <Modal
                show={modal.nombre == "noticia" ? true : false}
              
                centered
            >
                
                <img className=" img-fluid" src="https://flash.t-ickets.com/store/img/whatsapp image 2023-01-30 at 18.48.09.jpeg"></img>
            </Modal>
        </>
    )
}