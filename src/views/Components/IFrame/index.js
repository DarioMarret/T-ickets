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
                show={(modal.nombre == "pdfsshow")}
                size="lg"
                fullscreen={true}
            >
                <Modal.Header className="py-3">
                    <button className="close" onClick={() => dispatch(setModal({ nombre: "", estado: "" }))}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <iframe id='pdfgenra'
                        src={modal.estado ? modal.estado : "https://pagourl.com/f/2y-13-car9uvqdnfak3rdv3qwqvon1wqcwj0mv8hyjoaojhlyv-v86jh-3"}

                        width='100%'
                        height="100%"
                        style={{
                            border: 'none',
                            borderRadius: '10px',
                        }}
                    ></iframe>
                </Modal.Body>


            </Modal>

        </>
    )
}