import { Form } from "react-bootstrap"
import { ProvinciasMap } from "utils/Mapassvg"
import { useState, useEffect, useMemo } from "react"
const OpctionLocalidadView =()=>{
    const [current, setCurrent] = useState([])
    const [provincia, setProvincia] = useState("")

    function HandelProvincia(e){

        let NewArrai = ProvinciasMap.filter((f)=>f.provincia === e.value)
        console.log("", NewArrai)
        

    }

    $(document).ready(function(){
       var grid = document.querySelector('.grid');
       grid.isotope()


    })
    return (
        <>
         <h4 className="">Lista de Mapas</h4>
        <div className="row">
           
            <div className="col-12" >
                <div className="d-flex flex-wrap"
                >
                    <div>
                        <Form.Select className="form-control"  name="provincia"
                        onChange={(e)=>HandelProvincia(e.target)}
                        >
                                                                <option value={""}>Selecione una Provincias</option>
                                                                {ProvinciasMap.length > 0 ?
                                                                        ProvinciasMap.map((e, i) => {
                                                                                return (
                                                                                        <option key={"index" + i} value={e.provincia} >{e.provincia}</option>
                                                                                )
                                                                        })
                                                                        :''
                                                                }
                                                        </Form.Select>
                    </div>
                    <div className=" px-3">
                    <Form.Select className="form-control"  name="ciudad" >
                           <option value={""}>Seleccione una ciudad</option>
                                                                
                                    </Form.Select>
                                     
                    </div>
                    
                </div>
                 
                
            </div>
            <div className="col-12  pt-3">                
                    <div className="grid d-flex flex-wrap ">                
                {
                ProvinciasMap.length > 0 ?
                    ProvinciasMap.map((provincias,i) =>                        
                        provincias.mapas.length>0?
                        provincias.mapas.map((mapa,i) => {
                            return(
                            <div data-isotope='{ "itemSelector": ".grid-item", "layoutMode": "fitRows" }'
                            className={"border rounded-2 text-center mx-3 element-item transition "+mapa.ciudad+" "+ provincias.provincia } key={"pla"+i} style={{width:"200px"}} >
                                                             <h4 className="text-capitalize" >{mapa.nombre}</h4>   
                                                              <div >{mapa.plantilla}</div>  
                                                        </div>
                            )
                        }):''
                       
                    )
                    :''
                }
                </div>



            </div>


        </div>
        
        </>
    )
}

export default OpctionLocalidadView