import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { EstadosCosolidados } from "utils/pagos/Queripagos";
import SweetAlert from "react-bootstrap-sweetalert";
export default function ConsolidaRegistr() {
    let modal = useSelector(state => state.SuscritorSlice.modal)
    let usedispatch = useDispatch()
    const [first, setfirst] = useState("")
    function handelchange(e){
            setfirst(e.value)
    }
  
    function verRegistro(){
        if(first.trim() !="") return
        let datos = modal.estado.filter(e => e.id == first)
        //sessionStorage.setItem("Detalleuid", JSON.stringify({ ...datos[0] }))
        //history.push("/admin/Reporte/" + datos[0].id)
        console.log(datos)
    }
    useEffect(() => {
        /*EstadosCosolidados().then(ouput => {
            console.log(ouput)
            setfirst(ouput)
        }).catch(error => {
            console.log(error)
        })*/
    }, [modal.nombre == "ConsolidaRegistr" ? true : false])
    return (
        <>
            <Modal
                show={modal.nombre == "ConsolidaRegistr" ? true : false}
            >
                <Modal.Header className="py-2">
                    <button className="close" onClick={()=> usedispatch(setModal({ nombre: "", estado: "" }))}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className=" container">
                        <div className="col-md-12">
                            <label className="form-label">Comprobantes repetidos</label>
                            <select className="form-select" aria-label="Default select example" value={first}
                                onChange={(e) => handelchange(e.target)}>
                                <option value="" ></option>
                                {modal.estado.length > 0 ?
                                    modal.estado.map((e, i) => {
                                        return (
                                            <option value={e.id} key={i}>{e.id}</option>
                                        )
                                    }) : ""}
                            </select>
                        </div>
                        <div className="col-md-12  text-center py-2  flex-row">
                            <a className=" btn btn-default btn-sm m-1" onClick={verRegistro} ><i className=" fa fa-eye"> </i> ver rgistro</a>
                            <a className=" btn btn-default btn-sm m-1" ><i className=" fa fa-trash"> </i> eliminar rgistro</a>
                        </div>


                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}