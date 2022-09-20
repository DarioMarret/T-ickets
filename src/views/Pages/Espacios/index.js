import React, {useEffect,useState} from  "react";


const EventosViews =()=>{
   let ListadeFilas=[]
   let Listasillas=[]
   let i=0
   let f=0
    const [valoresFilas,setValoresFila]=useState({
        filas:5,
        enpieza:'A2',
        sillas:''
    })
    const GeneraFilas=()=>{
        const letrafilas = valoresFilas.enpieza.replace(/[0-9]+/g, "")
        const numeroinicofilas= valoresFilas.enpieza.replace(/[^0-9]+/g, "");
        //console.log(letrafilas,numeroinicofilas)
        const repeticiones =parseInt(numeroinicofilas) + parseInt(valoresFilas.filas)
        console.log(repeticiones)
        for(i= numeroinicofilas; i < repeticiones; i++){
            ListadeFilas.push({fila:letrafilas+""+i,sillas:0,asientos:[]});        
        }
        console.log(ListadeFilas)
    }
    const AgregasSillasMesa=()=>{ 


        for(i=0; i< ListadeFilas.length; i++){            
            ListadeFilas[i]["sillas"]=5;
         const fila =ListadeFilas[i]["fila"]
          //console.log( ListadeFilas[i]["fila"])
            for(f=0; f< 5; f++ ){
                ListadeFilas[i]["asientos"][f]=fila+"-s-"+f;                
            }
            //
            //ListadeFilas[i]["asientos"]=Listasillas
        }
        console.log(ListadeFilas)


        
    }
    useEffect(()=>{
        GeneraFilas()
    },[])

    return(
        <div className="container-fluid">        
            <div className="row">           
            <div className="modal fade" id="espacioModal"  role="dialog" aria-labelledby="espacioModal" aria-hidden="true" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="espacioModal">Registrar espacio</h5>
                        </div>

                                    <form  method="POST">
                                        <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="form-label"><b>Nombre</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del espacio" />
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
                                            <textarea className="form-control" name="descripcion" id="descripcion" cols="30" rows="4"  placeholder="Ingresa una descripción del espacio"></textarea>
                                                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                                        <button className="btn btn-primary close-modal">Grabar</button>
                                                </div>
                        </form>
                    </div>
                </div>
            </div>    <div  className="modal fade" id="seccionesModal" aria-labelledby="seccionesModal" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="seccionesModal">Registrar secciones</h5>
                        </div>

                                    <form method="POST">
                                        <div className="modal-body">

                                <div className="row">
                                    
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
                                                            <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del espacio" />
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
                                                            <input type="text" className="form-control" id="descripcion" placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-7">
                                    <ul className="nav nav-tabs">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-toggle="tab" href="#filas">Filas y Asientos</a>
                                                    </li>
                                                                                    
                                                    <li className="nav-item">
                                                        <a className="nav-link " data-toggle="tab" href="#mesas">Mesas y sillas</a>
                                                    </li>
                                                
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-toggle="tab" href="#correlativos">Números Correlativos</a>
                                                    </li>
                                                
                                                </ul>
                                                
                                                
                                                <div className="tab-content">
                                                    <div className="tab-pane active container" id="filas">
                                                        <div className="mt-4 row">
                                                            <div className="col-sm-5">
                                                                <label className="form-label"><b>Cantidad de filas</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" name="cantidad_filas" className="form-control" id="cantidad_filas" placeholder="10" />
                                                                                                                        </div>
                                                            </div>


                                                            <div className="col-sm-5">
                                                                <label className="form-label"><b>Número inicial</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="text" name="numero_inicial" className="form-control" id="numero_inicial" placeholder="10" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button type="button"  className="btn btn-info"><i className="fa fa-plus"></i></button>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-6" style={{ height:'450px', overflowY: 'scroll'}}>
                                                                <ul className="list-group">
                                                                                                                        </ul>
                                                            </div>
                                                            <div className="col-sm">
                                                            <div className="input-group mb-3">
                                                                    
                                                                    
                                                                    <input type="text" name="numeromesas" className="form-control" id="numero_mesa" placeholder="# Sillas" />
                                                                                                                    </div>
                                                            <div className="input-group mb-3">
                                                                    
                                                                    <select className="form-control " aria-label="Selecione Fila" >
                                                                    
                                                                        <option >Todas</option>
                                                                    </select>
                                                                    
                                                            </div>
                                                            <button className="btn btn-success" type="button" >
                                                                    Agregar
                                                                </button>
                                                                <button type="button" className="btn btn-info">esp</button>
                                                            
                                                                
                                                            </div>
                                                            
                                                            
                                                            
                                                        </div>

                                                    </div>

                                                    <div className="tab-pane container" id="correlativos">
                                                        <div className="mt-4 row">
                                                            <div className="col-sm-6">
                                                                <label className="form-label"><b>Cantidad de asientos</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" className="form-control" id="nc_ca" placeholder="100" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label className="form-label"><b>Primer número</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" className="form-control" id="nc_nombre" placeholder="100" />
                                                                                                                        </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="tab-pane  container" id="mesas">
                                                    <div className="mt-4 row">
                                                            
                                                        </div>

                                                        <div className="row">
                                                        
                                                        <div className="col-sm-5">
                                                                <label className="form-label"><b>Mesas x Fila</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" name="cantidad_mesas" className="form-control" id="cantidad_mesas" placeholder="10" />
                                                                                                                        </div>
                                                            </div>


                                                            <div className="col-sm-5">
                                                                <label className="form-label"><b>Número inicial</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="text" name="numero_partida" className="form-control" id="numero_partida" placeholder="10" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button type="button"  className="btn btn-info"><i className="fa fa-plus"></i></button>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <label className="form-label"><b> Mesa</b></label>
                                                                <div className="input-group mb-3">
                                                                    
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="numero_columna"  id="numero_columna" >
                                                                    <option  ></option>
                                                                        <option >Todas</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <label className="form-label"><b>Sillas x mesa</b></label>
                                                                <div className="input-group mb-3">
                                                                    
                                                                    <select className="form-control " aria-label="Selecione Mesa" name="numero_silla" id="numero_silla" >
                                                                    <option ></option>
                                                                    <option >4</option>
                                                                    <option >6</option>
                                                                    <option >8</option>
                                                                    <option >10</option>
                                                                    <option >12</option>
                                                                    <option >14</option>                                                         
                                                                    </select>
                                                                </div>
                                                            </div>                                                
                                                            <div className="col-sm-3">
                                                            <label className="form-label"><b> Mesa</b></label>
                                                                <div className="input-group mb-3">
                                                                <div className="card d-flex   container p-2  ">
                                                                0
                                                                    </div>  
                                                                
                                                </div>

                                                            </div>

                                                            <div className="col-sm-2 text-left">
                                                                <label className="form-label" style={{color:'white'}}><b>.</b></label><br/>
                                                                <button type="button" className="btn btn-info">Agrega</button>
                                                            
                                                            </div>
                                                        
                                                            
                                                            <div className="col-sm-12">
                                                                <div className="d-flex flex-nowrap w-100" style={{ overflowX: 'scroll'}}>
                                                                                                                        </div>
                                                            </div>
                                                            
                                                        </div>

                                                    </div>
                                                    
                                                    
                                                </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                                        <button type="submit" className="btn btn-primary close-modal">Grabar</button>
                                                </div>
                        </form>
                    </div>
                </div>
            </div>
                <div>
                </div>
                <div className="col-md-12">

                    <button  className="btn btn-success" data-toggle="modal" data-target="#espacioModal" ><i className="mr-2 fa fa-plus"></i> Nuevo espacio</button>
                    <button  className="btn btn-success" onClick={AgregasSillasMesa}><i className="mr-2 fa fa-plus"></i>Sillas</button>

                    <br/><br/>

                    <div className="card card-primary card-outline text-left">
                        <div className="card-header">
                            Eventos
                        </div>
                        <div className="card-body">

                            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripcion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            </div>

    )
}
export default EventosViews