import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import OpctionLocalidadView from "views/Pages/Espacios/MODAL/Componetes/Localidadoptionseis";

export default function OpcionMapaViews(){
    let modal = useSelector(state => state.SuscritorSlice.modal)
    return(
        <Modal 
            show={(modal.nombre =="OpcionMapaViews")}
        fullscreen={true}        
        >
            <Modal.Body>
            <OpctionLocalidadView/>
            </Modal.Body>
        </Modal>
    )
}