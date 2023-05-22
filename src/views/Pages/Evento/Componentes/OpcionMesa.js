import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function OpcionMesa(props){
    let { localidades, setItems } = props;
    let usedispatch = useDispatch();
    let moda = useSelector(state => state.SuscritorSlice.modal)
    const [localidaname, setLocalidad] = useState({
        nombre: '',
        description: '',
        cantidad: '',
        info: [],
        inicio: '',
        id: '',
    })
    function handelchangelocalidad(e) {
        setLocalidad({
            ...localidaname,
            [e.name]: e.value
        })
    }

    return(
        <div className=" container-fluid d-flex  flex-column">
            <div className="row col-12 pt-2">
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label"><b>Nombre</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                        </div>
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={localidaname.nombre}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingrese el nombre del espacio" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label"><b>Descripción</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                        </div>
                                        <input type="text" className="form-control" id="descripcion" name="description"
                                            value={localidaname.description}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingresa una descripción de la seccion" />

                                    </div>
                                </div>
                            </div>

                            <div className="d-flex text-end row">
                                {localidaname.id !== "" ? <button className="btn btn-primary col-12" onClick={actualizalocalidad}>Actualizar</button> : ''}
                                {inputdisable ? '' : <button className="btn btn-success" onClick={agregaLocaliad}>Guardar</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-7 container-fluid" id="mesas">
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Agregar Filas
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="row col-12 col-sm-12 col-md-12 col-lg-6">
                                        <div className='col-12 col-md-6'>
                                            <label className=" form-label">
                                                Filas
                                            </label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <div className=" container-fluid ">

                
            </div>
        </div>
        )
}