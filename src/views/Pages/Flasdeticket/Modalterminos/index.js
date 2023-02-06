import React from "react"
import { Modal, Accordion } from "react-bootstrap"
const Modalterminos = () => {

  return (
    <div className="modal fade" id="terminosModalModal" role="dialog" aria-labelledby="erminosModalModalLabel"
      aria-hidden="true">
      <div className="modal-dialog   modal-lg" role="document">
        <div className="terminos  modal-content  ">
          <div className="modal-header">
            <h5 className="modal-title text-center justify-content-center text-dark ">TÉRMINOS Y CONDICIONES</h5>
            <button type="button" className=" close" data-dismiss="modal" aria-label="Close">
              <span className="" aria-hidden="true">x</span>
            </button>
          </div>
          <div className="modal-body ">
            <div className="container" style={{ minHeight: 600, maxHeight: 600, overflowY: 'auto' }}>
              <Accordion flush >
                <Accordion.Item eventKey="0" >
                  <Accordion.Header>PRIMERA</Accordion.Header>
                  <Accordion.Body>
                    T-ICKETS, es una marca registrada cuyo objeto social, para efectos de las presentes condiciones, es la impresión y comercialización de entradas para eventos o espectáculos.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" >
                  <Accordion.Header>
                    SEGUNDA
                  </Accordion.Header>
                  <Accordion.Body>
                    Una vez realizada la compra los tickets seran enviados a su correo electronico registrdo donde se le especificara el dia, hora del evento, valor pagado,nombre del evento y politicas para poder ingresar al mismo.No existen cambios, reembolsos ni cancelaciones de compra de tickets.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>TERCERA</Accordion.Header>
                  <Accordion.Body>
                    EL CLIENTE es el usuario, que adquiere los Tickets y está previamente registrado en la página web WWW.T-ICKETS.COM o en el sistema de facturación de los puntos de venta de T-ICKETS quien acepta haber ingresado toda la información real personal requerida, y es él único y exclusivamente responsable por la información registrada. T-ICKETS no se hace responsable por tiquetes falsos o adulterados o adquiridos en lugares no autorizados. Quien suministre información o use su(s) entrada(s) para falsificaciones o adulteraciones será responsable ante las entidades legales pertinentes, esto puede dar lugar a RESPONSABILIDAD PENAL.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" >
                  <Accordion.Header>CUARTA</Accordion.Header>
                  <Accordion.Body>
                    EL CLIENTE acepta que toda la información de las entradas seleccionadas han sido verificadas. El CLIENTE reconoce que la realización de cualquier evento o espectáculo, del que adquiera las entradas mediante los puntos de venta de T-ICKETS  o por el sistema de WWW.T-ICKETS.Com no depende de T-ICKETS , quien no se responsabiliza por por errores de fechas, horas, valores registrados, nombre de eventos, calidad de los espectáculos, condiciones de seguridad, organizacion, contenido o en general causas ajenas a responsabilidades propias. Este ticket es válido sólo por el día,hora y lugar del evento en el especificado, el ingreso después de la hora señalada está sujeta a las reglas del lugar donde se realiza el evento.Una vez adquirido el tiquete no se aceptan cambios, devoluciones o reintegros, salvo en aquellos casos en que el empresario, promotor del evento o la ley lo establezca y en las condiciones que los mismos lo dispongan. T-ICKETS no está obligado hacer devoluciones de dinero, el empresario es la única persona legalmente responsable del evento, información impresa en la parte frontal del presente ticket.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    QUINTA
                  </Accordion.Header>
                  <Accordion.Body>
                    T-ICKETS  no se hace responsable por la pérdida o robo del presente ticket, no existe obligación alguna de emitir un nuevo ticket o permitirle el ingreso aunque logre comprobar la adquisición del ticket, estos son de entera responsabilidad del CLIENTE. El cliente acepta y conoce que los tiquetes que compre tienen un costo adicional por el servicio ofrecido por el sistema T-ICKETS  y que en ningún caso será reembolsable. Para el ingreso al evento el ticket debe ser presentado completo y sin alteraciones. Únicamente serán válidas para entrar al evento los tickets emitidos por T-ICKETS.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    SEXTA
                  </Accordion.Header>
                  <Accordion.Body>EL CLIENTE acepta que los organizadores se reservan el derecho de admisión y el derecho de agregar, modificar o sustituir artistas, así como de variar los programas, precios, ubicaciones, fechas, capacidad del escenario y ubicación de los mismos. En caso de que el evento sea postergado este ticket será válido para el ingreso en la fecha indicada por el empresario. El cliente no tendrá derecho a la devolución de su dinero.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>SEPTIMA</Accordion.Header>
                  <Accordion.Body>
                    Al ingreso y durante el evento los asistentes estarán sujetos a las medidas de seguridad y políticas establecidas por el escenario, quien no cumpla los controles respectivos, o desacate los mismos, se le prohibirá el ingreso o se le solicitará su retiro, sin lugar a devolución del dinero pagado por el ticket. En las localidades numeradas se deberá respetar el número de silla, de lo contrario el personal de logística podrá reubicarlo en el lugar adquirido o solicitarle el retiro del escenario.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header >OCTABA</Accordion.Header>
                  <Accordion.Body>
                    No se permite el ingreso de cámaras de vídeo, fotográficas, bebidas alcohólicas u objetos que pongan en peligro la seguridad del público, pudiendo ser retirados del lugar y destruido su contenido.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header> NOVENA </Accordion.Header>
                  <Accordion.Body>
                    No se permite el ingreso de cámaras de vídeo, fotográficas, bebidas alcohólicas u objetos que pongan en peligro la seguridad del público, pudiendo ser retirados del lugar y destruido su contenido.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9" >
                  <Accordion.Header>DECIMA</Accordion.Header>
                  <Accordion.Body>
                    Las compras realizadas por el portal WWW.T-ICKET.COM están sujetas a la verificación y aceptación de la tarjeta débito o crédito por parte del BANCO o entidad financiera en el transcurso de 24 horas después de haber efectuado la compra.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="10" >
                  <Accordion.Header>DECIMA PRIMERA </Accordion.Header>
                  <Accordion.Body>
                    En caso de cancelación definitiva del evento por cualquier causa, T-ICKETS es en su condición de simple intermediario para la distribución y venta del ticket, no se hacen responsable por la devolución del dinero pagado por este ticket, siendo única y exclusivamente responsable el empresario, promotor o productor del evento. El presente ticket es emitido por la imprenta autorizada por mandato del empresario quien es la única persona legalmente responsable del evento, información impresa en la parte frontal del presente ticket. T-ICKETS gestionará la devolución solo en caso de ser contratado por EL EMPRESARIO para esta gestión. En caso que T-ICKETS gestione la devolución del dinero, EL CLIENTE deberá seguir las indicaciones publicadas en el sitio web WWW.t-ickets.COM.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="11" >
                  <Accordion.Header>DECIMA SEGUNDA</Accordion.Header>
                  <Accordion.Body>
                    En caso de cancelación definitiva del evento por cualquier causa, T-ICKETS es en su condición de simple intermediario para la distribución y venta del ticket, no se hacen responsable por la devolución del dinero pagado por este ticket, siendo única y exclusivamente responsable el empresario, promotor o productor del evento. El presente ticket es emitido por la imprenta autorizada por mandato del empresario quien es la única persona legalmente responsable del evento, información impresa en la parte frontal del presente ticket. T-ICKETS gestionará la devolución solo en caso de ser contratado por EL EMPRESARIO para esta gestión. En caso que T-ICKETS gestione la devolución del dinero, EL CLIENTE deberá seguir las indicaciones publicadas en el sitio web WWW.T-ICKET.COM.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="12" >
                  <Accordion.Header>DECIMA TERCERA</Accordion.Header>
                  <Accordion.Body>
                    EL CLIENTE acepta que los tickets comprados o reservados por la web WWW.t-ICKETS.COM deberán ser recogidos por el usuario registrado en el sistema de T-ICKETS o por la persona que el usuario haya indicado en el proceso de la compra, mostrando su documento de identidad original.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="13">
                  <Accordion.Header>
                    DECIMA CUARTA
                  </Accordion.Header>
                  <Accordion.Body>
                    Las compras efectuadas en la página web WWW.T-ICKETS.COM se entienden efectuadas en los términos de la legislación ecuatoriana, en particular la ley de Comercio Electrónico y su Reglamento, por lo que la contratación y la firma electrónica se reputa válida y obliga al usuario, en los términos legales y contractuales del negocio jurídico realizado.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/*  <p className=" text-center" style={{ fontSiize: '1.2em' }}>
                La sección de Términos y condiciones es como un contrato entre tus clientes y tú. Pones la información y
                los servicios disponibles a tus clientes y tus clientes deben seguir las reglas.
              </p>

              <p style={{ fontSiize: '1.0em' }}>* Los puntos en común en un acuerdo de términos y condiciones te permite hacer
                lo
                siguiente: </p>

              <p style={{ fontSiize: '1.0em' }}>* Retirar y cancelar servicios y hacer transacciones financieras. </p>
              <p style={{ fontSiize: '1.0em' }}>* Gestionar las expectativas del cliente, como la responsabilidad legal por los
                errores de información o el
                tiempo en que el sitio web está inactivo.
              </p >
              <p style={{ fontSiize: '1.0em' }}>* Explicar las reglas de los derechos de autor, como la atribución, adaptación,
                uso comercial o no
                comercial, etc.
              </p>
              <p style={{ fontSiize: '1.0em' }}>* Establecer reglas para el comportamiento de los usuarios, como prohibir
                conductas ilegales, como
                expresiones de odio, acoso, promociones, mensajes no deseados, etc.
              </p>
              <p style={{ fontSiize: '1.0em' }}>* Deshabilitar las cuentas del usuario.</p>
              <p style={{ fontSiize: '1.0em' }}>* Escribir otros términos o condiciones que te protejan a ti o a tu audiencia.
              </p>*/}
            </div>
          </div>

        </div>
      </div></div>
  )

}
export default Modalterminos