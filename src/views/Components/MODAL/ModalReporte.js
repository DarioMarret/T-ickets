import React, { useEffect, useState } from 'react';
import {Modal ,Container} from 'react-bootstrap';
import { Salircliente } from 'utils/constantes';
import metodos from "../../../assets/Banco_Internacional_Ecuador.png";
import {ReportarDepositoCompra,EnviarmensajeWhastapp} from "../../../utils/Query";


const Reporte =(props) => {
    const { repShop, handlereportColse,
      setDatoToas,setrepShow
     } = props
    const [codigo,setCodigo] = useState("") 
   
    function  handelchange(e){
      setCodigo(e.target.value)
    }
    async  function  reportarComprobante(){
      if(codigo.length>4){
        try {
          const info = await ReportarDepositoCompra(codigo)
          const mensajes = await EnviarmensajeWhastapp(codigo)
            const {msg} =info
            console.log(info)
            if(msg!=null){
              Salircliente()
          setDatoToas({ show:true,
            message:'En breve uno de nuestros colaboradores se comunicar con usted',
            color:'bg-success',
            estado:'Se ha Guardado exitosamente su reporte',
          })
          setrepShow(false)
        }else{
          setDatoToas({ show:true,
            message:'Hubo un error',
            color:'bg-success',
            estado:'',
          })
        }
          
          //console.log(mensajes)
        } catch (error) {
          console.log(error)
        }
       
      }else{
        setDatoToas({ show:true,
          message:'La longitud del código debe ser mayor a 4 dígitos',
          color:'bg-danger',
          estado:'Formato ',
        })

      }
    }   
   
   return (
   <>
    <Modal 
    show={repShop}
                onHide={handlereportColse}
                size="lg"
                >
    <Modal.Header  >
    <button type="button" className="close"
                        onClick={handlereportColse}>
                        ×
                    </button>
                    
                </Modal.Header>
                <Modal.Body>
                <Container>
                <div className="container ">
    <div className="d-flex flex-wrap justify-content-center align-items-center" >
    <div className='d-flex flex-column text-center justify-content-center align-items-center'>
    <h3 className="modal-title pb-3 ">PARA DEPOSITO O TRANSFERENCIA</h3>
    <img src={metodos} className="img-fluid"  style={{width:'300px'}} alt=""/>
    <h3>Numero de Cuenta</h3>
    <h3> <strong>1500618760</strong> </h3>
    </div>



      <div className="d-flex flex-wrap">
        <div className="col-12 col-sm-6 d-flex flex-column p-3">
          <select className="form-control " name="banco" defaultValue={"Banco Internacional"}  aria-label="Selecione el Banco">             
            <option  value="Banco Internacional"> Banco Internacional</option>            
          </select>
          <label >Numero de Control</label>
          <input className="form-control" type="text" name="control" 
          value={codigo?codigo:''}
          onChange={(e)=>handelchange(e)}
          />
        </div>
        <div className="col-12 col-sm-6 d-flex flex-column p-3 align-items-end" >
          <h5 >LUEGO DE REALIZAR LA TRANSACCIÓN 
            POR FAVOR REPORTAR EL PAGO
          </h5>

          <button className="btn btn-danger col-6 float-end" 
            onClick={reportarComprobante}
          >
            Reportar Pago
          </button> 

        </div>
        
      </div>
    </div>

  </div>

                </Container>

                </Modal.Body>
    </Modal>
    </>)

}
export default Reporte