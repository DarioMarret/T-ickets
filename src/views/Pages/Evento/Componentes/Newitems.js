
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Viewcorrelativos from "./OpcionNumero";
import { Listar_preciolocalidad } from "utils/EventosQuery";
import Viewsilla from "./Opcionsilla";
import { useEffect ,useState} from "react";

export default function Newitemview() {
    let moda = useSelector(state => state.SuscritorSlice.modal);
    let [items, setItems] = useState([])
    useEffect(() => {
        console.log(moda.estado.id)
        Listar_preciolocalidad(moda.estado.id).then(ouput=>{
            console.log(ouput)
            if(ouput.success){
                setItems(ouput.data)
            }
        }).catch(err=>{
            console.log(err)
        })
       // setItems(itemlocalidad)
    }, [(moda.nombre == "Newitemview")])
    return (<Modal
        show={(moda.nombre == "Newitemview")}
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
                        <li className="nav-item">
                            <a className="nav-link " data-toggle="tab" href="#listas"
                            >Localidades Agregadas</a>
                        </li>
                        <li className="nav-item  ">
                            <a className="nav-link  d-none" data-toggle="tab" href="#seleclocalidad"
                            >Seleccionar locación</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#mapa"

                            >Diseñar Mapa</a>
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
    </Modal>)
}