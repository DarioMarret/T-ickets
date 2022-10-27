import React,{useState,useEffect} from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"


const LocalidadmapViews=(props)=>{
    const {precios,Tipo,espacios} = props

    const [sillaarray,setSilla]=useState([])

    function toggleValueInArray(value) {
        let array =sillaarray
        var index = array.findIndex(obj => obj.silla==value.silla);
      //var index = array.indexOf(value);     
      if (index === -1) {
        array.push(value);    
      } else {
        do {
          array.splice(index, 1);
          index = array.indexOf(value);      
        } while (index != -1);
      }
      setSilla(array) 
      console.log(array)
    }

    useEffect(()=>{

    },[])

    return (
        <>
        <Modal>
            <Modal.Header>
            <h5 className="modal-title text-center justify-content-center">localidad</h5>
                <button type="button" className="close"   >
                    ×
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='conatiner col-12'>
                   {Tipo=="silla"?
                   <div className={" col-sm-12 text-center "} style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', }}>
                        {espacios.length > 0 ?
                            espacios.map((e, i) => {
                                {
                                    return (
                                        <div className='d-flex  px-3 p-1 justify-content-ce ' key={"lista" + i}>
                                                <span className="d-inline-block " disabled >
                                                    <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: e.anchor, width: e.anchor }} >
                                                        <div className="d-flex justify-content-center">
                                                            <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                        </div>
                                                    </div>
                                                </span>
                                         
                                                {e.asientos.length > 0 ?
                                                <div className=' d-flex px-1  align-items-stretch ' style={{ width: '100%' }}>
                                                    {e.asientos.map((silla, index, arr) => {
                                                        let numero = index + 1
                                                        return (
                                                            <div key={"silla" + index} className='d-flex rounded-5 text-center  justify-content-center align-items-center '
                                                                style={{ height: silla.anchor, width: silla.anchor, marginLeft: silla.marginLeft, marginRight: silla.marginRight }} >
                                                                <div className={''+ silla.silla + 'd-flex px-3 '+ silla.estado +'  text-white justify-content-center  '} >
                                                                    <div className="d-flex justify-content-center">
                                                                        <span style={{ fontSize: '0.7em' }}>    {numero} </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                </div> : ""}



                                        </div>

                                    )
                                }


                            })
                            : ""}
                    </div>:''}
                    
                    {Tipo=="mesas"?<div className="col-sm-12 text-center " style={{ height: '400px', overflowY: 'hide', overflowX: 'auto', }}>
                        {
                        espacios.length>0?
                        espacios.map((e,index)=>{
                            return(
                                <div className='d-flex  px-3 align-items-center' key={index}>
                                        <div className='d-flex pb-2'>
                                            <MesaiView
                                                text={e.Fila}
                                            />
                                        </div>
                                        <div className='d-flex  pb-2' >
                                            {e.Mesas.length>0?
                                            e.Mesas.map((e, i) => {
                                                return (
                                                    <div key={i}>
                                                        <MesasView
                                                            status={e.sillas}
                                                            text={e.mesa} />
                                                    </div>
                                                )
                                            }):''}
                                        </div>
                                </div>

                            )
                        }):''
                        }                       
                    </div>:''}
                </div>             


            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-wrap" >
                    <div>
                        Sillas Selecionadas
                    </div>

                </div>

            </Modal.Footer>

        </Modal>
        </>
    )

}

export default LocalidadmapViews