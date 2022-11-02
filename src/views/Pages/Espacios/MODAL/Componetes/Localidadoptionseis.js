
import { Form } from "react-bootstrap"
const OpctionLocalidadView =()=>{
    return (
        <>
         <h4 className="">ListarLocalidad</h4>
        <div className="row">
           
            <div className="col-4" >
                 <Form.Select className="form-control"  name="name" id="name">
                                                                <option value={""}></option>
                                                                
                                                                <option value={"estadio monumental"}>Estadio monumental</option>
                                                                <option value={"estadio monumental de quito"}>Estadio monumental de quito</option>
                                                        </Form.Select>
                
            </div>
            <div className="col-8 ">



            </div>


        </div>
        
        </>
    )
}

export default OpctionLocalidadView