import React from "react"
import { Modal } from "react-bootstrap"
const Modalterminos=()=>{
    
    return(
        <div class="modal fade" id="terminosModalModal" tabindex="-1" role="dialog" aria-labelledby="erminosModalModalLabel"
        aria-hidden="true">
             <div className="modal-dialog   modal-lg" role="document">
      <div className="terminos  bg-black modal-content  ">
        <div className="modal-header">
          <h5 className="modal-title text-center justify-content-center ">TÉRMINOS Y CONDICIONES</h5>
          <button type="button"style={{color:'white'}} className=" close" data-dismiss="modal" aria-label="Close">
            <span className="" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body ">
          <div className="container">
            <p className=" text-center" style={{fontSiize:'1.2em'}}>
              La sección de Términos y condiciones es como un contrato entre tus clientes y tú. Pones la información y
              los servicios disponibles a tus clientes y tus clientes deben seguir las reglas.
            </p>

            <p style={{fontSiize:'1.0em'}}>* Los puntos en común en un acuerdo de términos y condiciones te permite hacer
              lo
              siguiente: </p>
            
            <p style={{fontSiize:'1.0em'}}>* Retirar y cancelar servicios y hacer transacciones financieras. </p>
            <p style={{fontSiize:'1.0em'}}>* Gestionar las expectativas del cliente, como la responsabilidad legal por los
              errores de información o el
              tiempo en que el sitio web está inactivo.
            </p >
            <p style={{fontSiize:'1.0em'}}>* Explicar las reglas de los derechos de autor, como la atribución, adaptación,
              uso comercial o no
              comercial, etc.
            </p>
            <p style={{fontSiize:'1.0em'}}>* Establecer reglas para el comportamiento de los usuarios, como prohibir
              conductas ilegales, como
              expresiones de odio, acoso, promociones, mensajes no deseados, etc.
            </p>
            <p style={{fontSiize:'1.0em'}}>* Deshabilitar las cuentas del usuario.</p>
            <p style={{fontSiize:'1.0em'}}>* Escribir otros términos o condiciones que te protejan a ti o a tu audiencia.
            </p>
                 </div>
                </div>

                </div>
            </div></div>
        )
        
}
export default Modalterminos