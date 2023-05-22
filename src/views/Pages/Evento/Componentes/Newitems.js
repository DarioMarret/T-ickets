
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Viewcorrelativos from "./OpcionNumero";
import { Listar_preciolocalidad } from "utils/EventosQuery";
import Viewsilla from "./Opcionsilla";
import OpcionMesas from "./OpcionMesa";
import { useEffect ,useState} from "react";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useHistory } from "react-router";
import { removeDatosUsuario } from "utils/DatosUsuarioLocalStorag";

export default function Newitemview() {
    let moda = useSelector(state => state.SuscritorSlice.modal);
    let usedispatch = useDispatch()
    let history = useHistory();
    let [items, setItems] = useState([])
    useEffect(() => {
        console.log(moda.estado.id)
        Listar_preciolocalidad(moda.estado.id).then(ouput=>{
           // console.log(ouput.response)
            if(ouput.success){
                setItems(ouput.data)
            }
            else if (!ouput.success && ouput.error != "jwt expired"){
                console.log(ouput)
                usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-danger', estado: 'Hubo un error' }))
            }
           /* else if (!ouput.success && ouput.error == "jwt expired") {
                console.log(ouput.data)
                usedispatch(setToastes({ show: true, message: 'La sessión a caducado ', color: 'bg-danger', estado: 'Hubo un error' }))
                setTimeout(function () {
                    removeDatosUsuario()
                    history.push("/")
                }, 1000)

            }*/
        }).catch(err=>{
            console.log(err)
        })
       // setItems(itemlocalidad)
    }, [true])
    return (<Modal
        show={(moda.nombre != "Newitemview")}
        fullscreen={true}
    >
        <Modal.Header className="py-4">
            <h5> Creación de los espacios </h5>

        </Modal.Header>
        <Modal.Body>

            <div className='container-fluid row p-0'>
                <div className='col-12'>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#filas"
                            >Filas y Asientos</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link " data-toggle="tab" href="#mesas"
                            >Mesas y sillas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#correlativos">Números Correlativos</a>
                        </li>
                       
                       
                        

                    </ul>
                </div>
                <div className="tab-content col-sm-12">
                    <div className="tab-pane active container " id="filas">
                        <Viewsilla 
                         localidades={items}
                         setItems={setItems}
                        />

                    </div>
                    <div className="tab-pane  container " id="mesas">
                        <OpcionMesas 
                            localidades={items}
                            setItems={setItems}
                        />

                    </div>
                    <div className="tab-pane  container " id="correlativos">
                        <Viewcorrelativos
                        localidades={items}
                        setItems={setItems}
                        />

                    </div>
                    <div className="tab-pane container" id="seleclocalidad" >
                        
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className=" container">
            <div className=" text-end">
                    {items.length==0?  <button className="btn  btn-success" 
                        onClick={() => usedispatch(setModal({ nombre:"OpcionMapaViews",estado:moda.estado})) }
                    >Crear Mapa </button>:""}
            </div>
            </div>
        </Modal.Footer>
    </Modal>)
}