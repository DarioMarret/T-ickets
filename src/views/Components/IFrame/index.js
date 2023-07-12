import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";

export default function Inframene() {
    let dispatch = useDispatch()
    let modal = useSelector(state => state.SuscritorSlice.modal)
    /// console.log(modal)
    return (
        <>
            <Modal
                show={(modal.nombre == "pdfsshow" || modal.nombre == "pdfsshowpar" )}
                size={"lg"}
                fullscreen={(modal.nombre == "pdfsshow")}
            >
                <Modal.Header className="py-3">
                    {(modal.nombre == "pdfsshowpar")? <h5>
                        Felicidades, estás participando no olvides seguir los pasos:
                    </h5>:""}
                    <button className="close" onClick={() => dispatch(setModal({ nombre: "", estado: "" }))}>X</button>
                </Modal.Header>
                <Modal.Body>
                { (modal.nombre == "pdfsshow") ?  <iframe id='pdfgenra'
                        src={modal.estado ? modal.estado : ""}

                        width='100%'
                        height="100%"
                        style={{
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    ></iframe>:
                    <div className=" h-75" >
                            <img className=" img-fluid" src={"https://api.t-ickets.com/store/img/mesa de trabajo 1.jpg"} ></img>
                    </div>
                    
                }
                </Modal.Body>


            </Modal>

        </>
    )
}