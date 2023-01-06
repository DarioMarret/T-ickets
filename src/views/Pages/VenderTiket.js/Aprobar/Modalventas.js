import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";

export default function ModalAprobarViews() {
        let usedispatch = useDispatch();
    let modal = useSelector((state) => state.SuscritorSlice.modal)
 
   function salir(){
       usedispatch(setModal({ nombre: "", estado :""}))
   }
    return (
        <>
            <Modal 
                show={modal.nombre =="Aprobar"?true:false}
                centered
                size="lg"
                >
            
                <Modal.Header>
                    <h5>
                        Reportar Lista de Boletos
                    </h5>
                    <button className="close" onClick={salir}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="form">
                        <form class="row g-3 needs-validation" >
                            <div class="col-md-6">
                                <label  class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="datos" 
                                 />
                                    
                            </div>
                            </form>

                        
                    </div>


                </Modal.Body>
            </Modal>
        </>
    )
}