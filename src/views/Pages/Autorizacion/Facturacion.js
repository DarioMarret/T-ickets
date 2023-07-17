import "./index.css"
export default function FacturaView() {
    return (
        <div className=" container-fluid">
            <div className='col-8 mx-auto' aria-controls="example-collapse-text">
                <div className="cardt cardt-dark boxshadow  ">
                    <div className="pt-2">


                        <div className='row '>
                            <div className='col-8 my-auto '>
                                <h5 class="card-title">RUC: 098506604646465</h5>
                                <p class="card-text pr-2 pt-2">City Oficce 310 </p>
                                <p class="card-text pr-2 pt-2">contabilidad </p>
        
                            </div>
                            <div className='col-3  '>
                                <div className='   float-end  ms-3 mb-1 rounded-3 shadow' style={{
                                    width: "78px",
                                    height: "78px",
                                    zIndex: 2
                                }}>
                                    <img src="https://api.t-ickets.com/store/img/tckets-texto-azul.png" className="p-2 img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className=" row m-auto  h-100 ">                            
                            <div class="card-body px-0 col-6">
                                <h5 class="card-title">Razón social : tickets.com</h5>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2">Tipo Comprobante: 12</p>
                                    <p class="card-text pr-2 pt-2">matriz : 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2">Punto de emision: </p>
                                    <p class="card-text pr-2 pt-2">numero secuencial : 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2 text-white">. </p>
                                   
                                </div>
                              
                                <p class="card-text"><small class="text-muted">Entidad certificante</small></p>

                            </div>
                            <div class="card-body px-0 col-6 d-flex flex-column align-items-end">
                                <h5 class="card-title">Corre : tickets@g,ail.com</h5>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2">Tipo de emision: 1</p>
                                    <p class="card-text pr-2 pt-2">whatsapp : 09875454545</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2">Ambiente: 1</p>
                                    <p class="card-text pr-2 pt-2">clave: 0001</p>
                                    <p class="card-text pr-2 pt-2">firma: 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p class="card-text pr-2 pt-2">Tarifa: </p>
                                    <p class="card-text pr-2 pt-2">Tarifa: </p>

                                </div>

                                <p class="card-text"><small class="text-muted">fechaemision:  fecha_vencimiento :</small></p>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}