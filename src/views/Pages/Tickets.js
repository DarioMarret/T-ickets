import React, { useEffect, useState } from "react";
import { ListarTikets ,FiltrarConcierto} from "utils/Querypanel";
import ReactTable from "components/ReactTable/ReactTable.js";
import { Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
const EventosViews =()=>{
    const [TiktesList,setTikes]=useState([])
    const [DatosGlobal,setDatosGloabl]=useState([])
    const [Evento,setEvento]=useState([])
    const [slidetitem,SetSlidet]=useState([])
        async function ConsultarTikets(){
            try {
                const Datos = await ListarTikets()
                const infor = Datos.data.map((e,i)=>{
                    return {
                        id: e.id,
                        nombre: e.nombre,
                        cedula: e.cedula,
                        celular:e.celular,
                        fecha:e.actual,
                        ciudad: e.cuidadconcert,
                        concierto: e.nombreconcert,
                        protocolo:e.protocol,
                        link:e.link,
                        qr:e.qr,
                       
                      };
                })
                setDatosGloabl(infor)
                const Filtrar = Datos.data.map((e,i)=>{
                  return {nombre:e.nombreconcert,ciudad:e.cuidadconcert,fecha:e.actual}
                })
                const ids = Filtrar.map(o => o.nombre)
                const filtered = Filtrar.filter(({nombre}, index) => !ids.includes(nombre, index + 1))
                setEvento(filtered)
                const concierto = infor.filter(e => e.concierto == filtered[0].nombre)
               // setTikes(concierto)
               
               
              await  Concietos(filtered[0].nombre)
            } catch (error) {
                console.log(error)
                
            }
         
        }

        async function Concietos (e){ 
          try {
              const datos= await FiltrarConcierto(e)
              const infor = datos.map((e,i)=>{
                return {
                    id: e.id,
                    nombre: e.nombre,
                    cedula: e.cedula,
                    celular:e.celular,
                    fecha:e.actual,
                    ciudad: e.cuidadconcert,
                    concierto: e.nombreconcert,
                    protocolo:e.protocol,
                    link:e.link,
                    qr:e.qr,
                   
                  };
            })
              setTikes(infor)
            //  console.log(datos)            
          } catch (error) {
            console.log(error)
          }

        }
       

    useEffect(()=>{
        (async()=>{
           await ConsultarTikets()
        })()
        console.log(slidetitem)

    },[])
return(
    <div className="container-fluid">
                
<div className="row">
    <div className="col-md-12">
      
        <div className="card text-left">
            <div className="card-header">
                Eventos y Tickets
            </div>
            <div className="card-body">
            <Swiper navigation={true}   modules={[Navigation]} 
          
           
           onSlideChange={ async (swiperCore) => {
             const {
               activeIndex,
               snapIndex,
               previousIndex,
               realIndex,
             } = swiperCore;
             console.log(Evento[realIndex].nombre)
             var arraycopia = DatosGlobal
             //const concierto = arraycopia.filter(e => e.concierto == Evento[realIndex].nombre)
              Concietos(Evento[realIndex].nombre)
           //  console.log(DatosGlobal)
             //setTikes(concierto)
            // console.log(Evento[realIndex]) 
            // console.log({ activeIndex, snapIndex, previousIndex, realIndex });
         }}
              onSwiper={e => {
                const {
                  activeIndex,
                  snapIndex,
                  previousIndex,
                  realIndex,
                } =e
                console.log(Evento[realIndex]) 
              }}
            //onSwiper={swiper =>{ console.log(swiper)}}
            className="mySwiper">
              {Evento.length>0?
              Evento.map((e,i)=>{
                return(
                  <SwiperSlide key={i}>
                  <div className=" container mt-4 px-0">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{fontSize: '1.6em'}}><span id="artista" className="fw-bold">{e.nombre}</span> </h1>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{fontSize: '1.2em'}}><b>Fecha:</b><span id="fechaEvento"> Miercoles 28-10-2022</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Lugar:</b><span id="lugarEvento"> Estadio Alberto Spencer</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Hora:</b><span id="horaEvento"> 22:30</span></p>                       
                      </div>
                    </div>
                  </div>
                  </SwiperSlide>
                )
              })
              :""}
       
      </Swiper>
                

    
                  <ReactTable
      data={TiktesList}
     
      columns={[
        {
          Header: "Nombre",
          accessor: "nombre",
          isVisible: true,
        },
        {
          Header: "Cédula",
          accessor: "cedula",
          isVisible: true,
        },
        {
          Header: "Fecha",
          accessor: "fecha",
          isVisible: true,
        },
        {
          Header: "Lugar",
          accessor: "ciudad",
          isVisible: true
          
        },
        {
          Header: "Concierto",
          accessor: "concierto",
          isVisible: true
          
        }, {
            Header: "Protocolo",
            accessor: "protocolo",
            isVisible: true
            
          },
           {
            Header: "Qr",
            accessor: "qr",
            isVisible: true
            
          }, {
            Header: "Link",
            accessor: "link",
            isVisible: true
            
          },
        
      ]}     
      
      
      
      /*
        You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
      
      className="-striped -highlight success-pagination"*/
    /> 

                {/*<table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Evento</th>
                            <th scope="col">Ticket</th>
                            <th scope="col">Forma de pago</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Descargar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Evento 1</th>
                            <td>1</td>
                            <td>Otto</td>
                            <td><span className="badge me-1 bg-success text-white">Emitido</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                        <tr>
                            <th scope="row">Evento 2</th>
                            <td>2</td>
                            <td>Thornton</td>
                            <td><span className="badge me-1 bg-danger text-white">Usado</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                        <tr>
                            <th scope="row">Evento 3</th>
                            <td>3</td>
                            <td>Thornton</td>
                            <td><span className="badge me-1 bg-dark text-white">Anulado</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                    </tbody>
                </table>*/}
            </div>
        </div>
    </div>
</div>
            </div>
)
}

export default EventosViews;