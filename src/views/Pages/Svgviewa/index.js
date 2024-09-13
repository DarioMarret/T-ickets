import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
import "./class.css"
import "./svg.css"
import "./cultura.css"
import ExampleDataTable from "components/ReactTable/Datatable.js/ExampleTable"
import ModalFirma from "views/Components/MODAL/Modalfirma"
const Viewssvg = () => {
  const [localidadmap, setselection] = useState({
    name: "",
    color: '#A12121',
  })
  const [mapa, setmapa] = useState([])
  const [lista, setLsita] = useState([])
  const [localidad, setLocalidad] = useState([])

  function handelChange(e) {
    setselection({
      ...localidadmap,
      [e.name]: e.value
    })

  }

  /*
    function agergaraALarray(dato,id,color){
       let array = lista       
      // let nuevo = mapa
     // console.log(array)
        var index = array.findIndex(obj => obj.path==dato);
        if (index == -1) { 
        array.push({path:dato,id:id, fill:color});
          
        } else {
        do {
          array.splice(index, 1);
         index = array.indexOf({path:dato,id:id, fill:color});
        } while (index != -1);
        }
        setLsita(array)
      //  console.log("mpap?",nuevo) 
      insertLocalidad(array,{path:dato,id:id, fill:color})
      cargarcolores()
      listadecolores()
        
      }
        
      function cargarcolores (){
        let colores = getMapacolor()
        colores.length>0? setLsita(colores):''
        colores.length>0? colores.map((e,i)=>{
          $("#"+e.path).attr("class","seleccion")               
          $("#"+e.path).attr("machfilal",e.fill,"class","seleccion")        
        }):''
      }
           $(document).on("click",".none",function(){
          let co = document.getElementById("color").value;
          let id = document.getElementById("name").value;
          if(this.classList.contains('none')){
            if(id.trim()=== "") {
            return  }
            else
          agergaraALarray(this.getAttribute('id'),id,co)   
                this.removeAttribute("class","")       
                this.setAttribute("class","seleccion")   
              }
           })
          $(document).on("click",".seleccion",function(){
           if(this.classList.contains('seleccion')){
            this.removeAttribute("machfilal")   
            agergaraALarray(this.getAttribute('id'),'','')
            this.removeAttribute("class","seleccion")   
            this.setAttribute("class","")                             
              } 
           })
    
     
           async function GetLocalidad(){
            let obtent = await ListarLocalidad()
            setLocalidad(obtent.data)
            let nuevo = obtent.data.map((e,i)=>{
              return{ id:e.id, nombre:e.nombre,color:''}
            })
            setmapa(obtent.data.map((e,i)=>{
              return{ id:e.id, nombre:e.nombre,color:''}
            }))
            //console.log("localidades",nuevo)
            sessionStorage.localidad = JSON.straingify(obtent.data)
            cargarcolores()   
          }
          async function listadecolores(){
            let nuevo = getLocalidadmapa()
            //  console.log("Function mapa",nuevo)
            let colores = getMapacolor()
            const valorDuplicadas = [];
            nuevo.length>0 && colores.length>0 ? colores.forEach(p => {
                if(valorDuplicadas.findIndex(pd => pd.id === p.id) === -1) {       
                 let index =nuevo.findIndex((e)=>parseInt(e.id)=== parseInt(p.id))
                  valorDuplicadas.push({id:p.id,nombre:nuevo[index]?nuevo[index].nombre:'',color:p.fill});
                }
                }):''     
            nuevo.length>0 && colores.length>0 ? nuevo.map((L)=>{
                if(valorDuplicadas.findIndex((e)=>parseInt(e.id)=== parseInt(L.id))!=-1){
                  L.color=valorDuplicadas[valorDuplicadas.findIndex((e)=>parseInt(e.id)=== parseInt(L.id))].color;
                  return L
                }else{
                  return L
                }
                }):''
             //         console.log("mutado",nuevo)  
    
               // console.log("duplicado",valorDuplicadas)
                nuevo.length>0 && colores.length>0?setmapa(nuevo) :''
                nuevo.length>0 && colores.length>0? sessionStorage.localidad = JSON.straingify(nuevo):''
          }*/

  useEffect(() => {
    const paths = document.querySelectorAll(" polygon.cuadro, rect.cuadro")
    paths.forEach(e => {
      e.addEventListener("click", function () {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var b = this.getBBox();
        console.log(b)
        console.log((b.x + b.width / 2) + " " + (b.y + b.height / 2))
        t.setAttribute("transform", "translate(" + (b.x + b.height / 8) + " " + (b.y + b.height / 2) + ")");
        t.textContent = "NOMBRE DE LOCALIDAD";
        t.setAttribute("machfilal", "white");
        t.setAttribute("font-size", (b.height / 10));
        this.parentNode.insertBefore(t, b.nextSibling);
        //  b.parentNode.insertBefore(t, b.nextSibling);

        //this.classList.add("class")   
        //this.setAttribute("machfilal","#DC2A27")
        //console.log( this)
      })
    })
    const textPaths = document.querySelectorAll("polygon.texto")

    textPaths.forEach(e => {
      e.addEventListener("click", function () {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var b = this.getBBox();
        console.log(b)
        //console.log((b.x + b.width/2) + " " + (b.y + b.height/2))
        t.setAttribute("transform", "translate(" + (b.x + b.height / 8) + " " + (b.y + b.height) + ")");
        t.textContent = "Sillas";
        t.setAttribute("machfilal", "white");
        t.setAttribute("font-size", (b.height));
        this.parentNode.insertBefore(t, b.nextSibling);
      })
    })


    //agregar id y class
    /*
 var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  var b = p.getBBox();
  t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
  t.textContent = "a";
  t.setAttribute("machfilal", "red");
  t.setAttribute("font-size", "14");
  p.parentNode.insertBefore(t, p.nextSibling);*/

    /*
    const path = document.querySelectorAll("path")
      $(path).each(function(index){ 
        this.setAttribute("id", "mapas"+index)
        this.setAttribute("class", "mapas")
         // console.log(this)
        //alert($(this).text())
      });*/


  }, [])


  return (
    <>
      <ModalFirma />
      <div className="d-flex flex-wrap">
        <div className="col-12 col-md-6">
          <form className="container">
            <div className="row">
              <div className="col-8">
                <label className="form-label">Selecione localidad elija el color de la Localidad </label>
                <select className="form-control" value={localidadmap.name} name="name" id="name" onChange={(e) => handelChange(e.target)}>
                  <option value="">

                  </option>


                  {localidad.length > 0 ?
                    localidad.map((e, i) => {
                      return (
                        <option key={i} value={e.id} >{e.nombre}</option>
                      )
                    }) : ''
                  }
                </select>
              </div>
              <div className="col-sm">
                <label className="form-label" >.</label>
                <input
                  className="form-control form-control-color"
                  value={localidadmap.color} name="color" id="color"
                  type="color"
                  onChange={(e) => handelChange(e.target)}
                />
              </div>

            </div>


          </form>

        </div>
        <div className=" d-flex flex-column text-center justify-content-center col-12 col-md-6">
          <div className="d-flex flex-wrap justify-content-center  pb-5">
            {mapa.length > 0 ?
              mapa.map((elm, i) => {
                return (
                  <div className="d-flex flex-row px-3 precios align-items-center" key={i}  >
                    <div className="mx-1  rounded-4" style={{ height: 20, width: 20, backgroundColor: elm.color }}></div>
                    <span>{elm.nombre}</span>
                  </div>
                )
              }) : ''
            }
          </div>
          <div className=" border d-flex text-center bg-azul justify-content-center" style={{ width: '100%' }}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" >
              <style>
                {
                  ".st4{fill:#b3842e}.st5{fill:#fff}.st6{font-family:&apos;NexaBold&apos;}.st7{font-size:13.2052px}.st9{font-size:41.3304px}.st10{letter-spacing:3}.st11{fill:#fff;stroke:#b2842b;stroke-width:7;stroke-miterlimit:10}"
                }
              </style>
              <path
                fill="#ededed"
                stroke="#c6c6c6"
                strokeWidth={7}
                strokeMiterlimit={10}
                d="M198.52 164.84H886.5799999999999V934.9200000000001H198.52z"
              />

              <path d="M339.88 168.5H746.3399999999999V312.47H339.88z" />

              <path fill="#706e6f" id="1" d="M202.49 376.86H541.915V929.57H202.49z" />
              <path fill="#706e6f" id="4" d="M541.915 376.86H881.34V929.57H541.915z" />

              <path fill="#e3e3e3" id="2" className="" d="M288.22 313.17H796.3V538.79H288.22z" />
              <path fill="#b2842b" id="3" className="none" d="M288.22 540.51H796.3V762.52H288.22z" />
              <path
                className="st4"
                d="M315.41 336.97H349.63V367.39000000000004H315.41z"
              />
              <path
                className="st4"
                d="M357.87 336.97H392.09000000000003V367.39000000000004H357.87z"
              />
              <path
                className="st4"
                d="M400.32 336.97H434.53999999999996V367.39000000000004H400.32z"
              />
              <path
                className="st4"
                d="M442.77 336.97H476.99V367.39000000000004H442.77z"
              />
              <path
                className="st4"
                d="M485.22 336.97H519.44V367.39000000000004H485.22z"
              />
              <path
                className="st4"
                d="M527.67 336.97H561.89V367.39000000000004H527.67z"
              />
              <path
                className="st4"
                d="M570.13 336.97H604.35V367.39000000000004H570.13z"
              />
              <path
                className="st4"
                d="M612.58 336.97H646.8000000000001V367.39000000000004H612.58z"
              />
              <path
                className="st4"
                d="M655.03 336.97H689.25V367.39000000000004H655.03z"
              />
              <path
                className="st4"
                d="M697.48 336.97H731.7V367.39000000000004H697.48z"
              />
              <path
                className="st4"
                d="M739.93 336.97H774.15V367.39000000000004H739.93z"
              />
              <path className="st4" d="M315.41 375.75H349.63V406.17H315.41z" />
              <path
                className="st4"
                d="M357.87 375.75H392.09000000000003V406.17H357.87z"
              />
              <path
                className="st4"
                d="M400.32 375.75H434.53999999999996V406.17H400.32z"
              />
              <path className="st4" d="M442.77 375.75H476.99V406.17H442.77z" />
              <path className="st4" d="M485.22 375.75H519.44V406.17H485.22z" />
              <path className="st4" d="M527.67 375.75H561.89V406.17H527.67z" />
              <path className="st4" d="M570.13 375.75H604.35V406.17H570.13z" />
              <path
                className="st4"
                d="M612.58 375.75H646.8000000000001V406.17H612.58z"
              />
              <path className="st4" d="M655.03 375.75H689.25V406.17H655.03z" />
              <path className="st4" d="M697.48 375.75H731.7V406.17H697.48z" />
              <path className="st4" d="M739.93 375.75H774.15V406.17H739.93z" />
              <path
                className="st4"
                d="M315.41 414.16H349.63V444.58000000000004H315.41z"
              />
              <path
                className="st4"
                d="M357.87 414.16H392.09000000000003V444.58000000000004H357.87z"
              />
              <path
                className="st4"
                d="M400.32 414.16H434.53999999999996V444.58000000000004H400.32z"
              />
              <path
                className="st4"
                d="M442.77 414.16H476.99V444.58000000000004H442.77z"
              />
              <path
                className="st4"
                d="M485.22 414.16H519.44V444.58000000000004H485.22z"
              />
              <path
                className="st4"
                d="M527.67 414.16H561.89V444.58000000000004H527.67z"
              />
              <path
                className="st4"
                d="M570.13 414.16H604.35V444.58000000000004H570.13z"
              />
              <path
                className="st4"
                d="M612.58 414.16H646.8000000000001V444.58000000000004H612.58z"
              />
              <path
                className="st4"
                d="M655.03 414.16H689.25V444.58000000000004H655.03z"
              />
              <path
                className="st4"
                d="M697.48 414.16H731.7V444.58000000000004H697.48z"
              />
              <path
                className="st4"
                d="M739.93 414.16H774.15V444.58000000000004H739.93z"
              />
              <path d="M315.41 452.55H349.63V482.97H315.41z" />
              <path d="M357.87 452.55H392.09000000000003V482.97H357.87z" />
              <path
                className="st4"
                d="M400.32 452.55H434.53999999999996V482.97H400.32z"
              />
              <path className="st4" d="M442.77 452.55H476.99V482.97H442.77z" />
              <path className="st4" d="M485.22 452.55H519.44V482.97H485.22z" />
              <path className="st4" d="M527.67 452.55H561.89V482.97H527.67z" />
              <path className="st4" d="M570.13 452.55H604.35V482.97H570.13z" />
              <path
                className="st4"
                d="M612.58 452.55H646.8000000000001V482.97H612.58z"
              />
              <path className="st4" d="M655.03 452.55H689.25V482.97H655.03z" />
              <path d="M697.48 452.55H731.7V482.97H697.48z" />
              <path d="M739.93 452.55H774.15V482.97H739.93z" />
              <path d="M315.41 488.29H349.63V518.71H315.41z" />
              <path d="M357.87 488.29H392.09000000000003V518.71H357.87z" />
              <path d="M400.32 488.29H434.53999999999996V518.71H400.32z" />
              <path d="M442.77 488.29H476.99V518.71H442.77z" />
              <path d="M485.22 488.29H519.44V518.71H485.22z" />
              <path d="M527.67 488.29H561.89V518.71H527.67z" />
              <path d="M570.13 488.29H604.35V518.71H570.13z" />
              <path d="M612.58 488.29H646.8000000000001V518.71H612.58z" />
              <path d="M655.03 488.29H689.25V518.71H655.03z" />
              <path d="M697.48 488.29H731.7V518.71H697.48z" />
              <path d="M739.93 488.29H774.15V518.71H739.93z" />
              <text transform="translate(324.941 357.286)" className="st5 st6 st7">
                {"01"}
              </text>
              <text transform="translate(365.393 357.286)" className="st5 st6 st7">
                {"02"}
              </text>
              <text transform="translate(407.567 357.286)" className="st5 st6 st7">
                {"03"}
              </text>
              <text transform="translate(451.127 357.286)" className="st5 st6 st7">
                {"04"}
              </text>
              <text transform="translate(493.579 357.286)" className="st5 st6 st7">
                {"05"}
              </text>
              <text transform="translate(536.03 357.286)" className="st5 st6 st7">
                {"06"}
              </text>
              <text transform="translate(578.482 357.286)" className="st5 st6 st7">
                {"07"}
              </text>
              <text transform="translate(620.84 357.286)" className="st5 st6 st7">
                {"08"}
              </text>
              <text transform="translate(663.033 357.286)" className="st5 st6 st7">
                {"09"}
              </text>
              <text transform="translate(707.485 357.286)" className="st5 st6 st7">
                {"10"}
              </text>
              <text transform="translate(753.659 357.286)" className="st5 st6 st7">
                {"11"}
              </text>
              <text transform="translate(326.141 396.067)" className="st5 st6 st7">
                {"12"}
              </text>
              <text transform="translate(368.613 396.067)" className="st5 st6 st7">
                {"13"}
              </text>
              <text transform="translate(411.537 396.067)" className="st5 st6 st7">
                {"14"}
              </text>
              <text transform="translate(454.01 396.067)" className="st5 st6 st7">
                {"15"}
              </text>
              <text transform="translate(496.481 396.067)" className="st5 st6 st7">
                {"16"}
              </text>
              <text transform="translate(538.148 396.067)" className="st5 st6 st7">
                {"17"}
              </text>
              <text transform="translate(581.545 396.067)" className="st5 st6 st7">
                {"18"}
              </text>
              <text transform="translate(624.017 396.067)" className="st5 st6 st7">
                {"19"}
              </text>
              <text transform="translate(664.469 396.067)" className="st5 st6 st7">
                {"20"}
              </text>
              <text transform="translate(708.037 396.067)" className="st5 st6 st7">
                {"21"}
              </text>
              <text transform="translate(750.49 396.067)" className="st5 st6 st7">
                {"22"}
              </text>
              <text transform="translate(324.413 434.473)" className="st5 st6 st7">
                {"23"}
              </text>
              <text transform="translate(366.433 434.473)" className="st5 st6 st7">
                {"24"}
              </text>
              <text transform="translate(409.653 434.473)" className="st5 st6 st7">
                {"25"}
              </text>
              <text transform="translate(450.77 434.473)" className="st5 st6 st7">
                {"26"}
              </text>
              <text transform="translate(495.501 434.473)" className="st5 st6 st7">
                {"27"}
              </text>
              <text transform="translate(537.521 434.473)" className="st5 st6 st7">
                {"28"}
              </text>
              <text transform="translate(579.09 434.473)" className="st5 st6 st7">
                {"29"}
              </text>
              <text transform="translate(621.11 434.473)" className="st5 st6 st7">
                {"30"}
              </text>
              <text transform="translate(665.562 434.473)" className="st5 st6 st7">
                {"31"}
              </text>
              <text transform="translate(708.014 434.473)" className="st5 st6 st7">
                {"32"}
              </text>
              <text transform="translate(748.678 434.473)" className="st5 st6 st7">
                {"33"}
              </text>
              <text transform="translate(324.16 472.864)" className="st5 st6 st7">
                {"34"}
              </text>
              <text transform="translate(367.084 472.864)" className="st5 st6 st7">
                {"35"}
              </text>
              <text transform="translate(409.536 472.864)" className="st5 st6 st7">
                {"36"}
              </text>
              <text transform="translate(452.517 472.864)" className="st5 st6 st7">
                {"37"}
              </text>
              <text transform="translate(494.086 472.864)" className="st5 st6 st7">
                {"38"}
              </text>
              <text transform="translate(536.462 472.864)" className="st5 st6 st7">
                {"39"}
              </text>
              <text transform="translate(578.6 472.864)" className="st5 st6 st7">
                {"40"}
              </text>
              <text transform="translate(622.168 472.864)" className="st5 st6 st7">
                {"41"}
              </text>
              <text transform="translate(663.64 472.864)" className="st5 st6 st7">
                {"42"}
              </text>
              <text transform="translate(705.209 472.864)" className="st5 st6 st7">
                {"43"}
              </text>
              <text transform="translate(747.133 472.864)" className="st5 st6 st7">
                {"44"}
              </text>
              <text transform="translate(322.615 508.603)" className="st5 st6 st7">
                {"45"}
              </text>
              <text transform="translate(365.99 508.603)" className="st5 st6 st7">
                {"46"}
              </text>
              <text transform="translate(408.442 508.603)" className="st5 st6 st7">
                {"47"}
              </text>
              <text transform="translate(451.231 508.603)" className="st5 st6 st7">
                {"48"}
              </text>
              <text transform="translate(494.155 508.603)" className="st5 st6 st7">
                {"49"}
              </text>
              <text transform="translate(536.627 508.603)" className="st5 st6 st7">
                {"50"}
              </text>
              <text transform="translate(580.099 508.603)" className="st5 st6 st7">
                {"51"}
              </text>
              <text transform="translate(621.475 508.603)" className="st5 st6 st7">
                {"52"}
              </text>
              <text transform="translate(663.947 508.603)" className="st5 st6 st7">
                {"53"}
              </text>
              <text transform="translate(707.322 508.603)" className="st5 st6 st7">
                {"54"}
              </text>
              <text transform="translate(748.891 508.603)" className="st5 st6 st7">
                {"55"}
              </text>
              <text
                transform="translate(433.235 688.398)"
                className="st5 st6"
                fontSize="139.6225px"
              >
                {"VIP"}
              </text>
              <text transform="translate(411.358 252.19)" className="st5 st6 st9">
                {"ESCENARIO"}
              </text>
              <text transform="translate(417.775 856.67)" className="st5 st6 st9 st10">
                {"GENERAL"}
              </text>
              <text
                transform="rotate(-90 488.805 230.064)"
                className="st5 st6 st9 st10"
              >
                {"GENERAL"}
              </text>
              <text transform="rotate(-90 785.27 -66.4)" className="st5 st6 st9 st10">
                {"GENERAL"}
              </text>
              <path
                className="st11"
                d="M437.84 726.93c16.51 0 49.95-16.51 49.95-26.86 0-4.25-5.69-6.78-12.4-8.63-8.22-2.26-17.54-3.49-17.54-9.52 0-11.51 22.13-20.69 32.13-21.03 6.23-.21 10.41 1.3 10.35 6.58-.14 8.15-12.06 16.99-19.32 16.99-1.37 0-3.43-.55-3.43-2.06 0-2.81 2.67-5.75 4.04-6.58-1.03 1.17-1.44 2.6-1.44 3.56 0 .41.41.41.82.41 2.81 0 16.17-7.67 17.06-13.91.34-2.19-1.51-2.81-4.11-2.81-.75 0-1.64.07-2.54.14-8.77.96-28.91 12.26-28.91 19.32 0 3.97 6.58 5.69 13.5 7.6 7.74 2.12 15.76 4.66 15.76 12.26 0 15-34.12 29.67-52.82 29.67-4.52 0-11.1-1.3-11.1-6.71 0-10.14 30.97-26.51 39.81-26.31-18.16 4.93-35.56 20.07-35.56 25.14-.01 2.68 3.55 2.75 5.75 2.75zM495.25 717.34c-1.1-.34-2.81-2.06-2.81-3.29 0-3.97 9.93-18.91 14.32-22.4.34-.34.75-.41 1.03-.41 1.58 0 4.32 2.74 4.32 4.45 0 .27-.34-.07-.89-.14-2.81-.27-12.19 15.35-13.02 18.16 4.18-1.1 14.18-10.62 18.36-14.66.48-.34.82.21.62.41-5.96 6.44-16.85 17.61-21.1 17.95-.29 0-.49 0-.83-.07zm22.88-34.39c.62.69 1.03 1.71.75 1.71-.14 0-.69-.27-1.44.07-1.16.48-4.32 3.29-5.14 4.45-.96 1.23-2.4-.21-2.47-1.44-.07-1.99 2.54-6.44 4.32-6.99 1.58-.2 3.09 1.17 3.98 2.2z"
              />
              <path
                className="st11"
                d="M532.58 674.18c2.06-2.67 3.97-4.86 5.69-6.23 1.03-.82 1.92-1.37 2.54-1.37 3.84-.21 6.58 3.77 5.28 3.01-2.4-1.1-6.85 5.34-9.87 9.04-2.95 3.77-5.75 7.81-9.18 12.81-5.96 9.04-11.1 17.74-12.74 22.13 2.95.34 14.32-10.82 18.36-14.52.41-.34.69.21.48.41-3.36 3.84-15.28 16.31-19.39 17.81-.89.34-1.58.07-2.19-.27-.55-.27-2.05-1.71-2.47-2.74-.07-.14-.21-.27-.21-1.03 0-2.06 3.15-8.7 11.51-21.79 4.25-6.64 8.63-12.6 12.19-17.26z"
              />
              <path
                className="st11"
                d="M549.09 674.18c2.06-2.67 3.97-4.86 5.69-6.23 1.03-.82 1.92-1.37 2.54-1.37 3.84-.21 6.58 3.77 5.28 3.01-2.4-1.1-6.85 5.34-9.87 9.04-2.95 3.77-5.75 7.81-9.18 12.81-5.96 9.04-11.1 17.74-12.74 22.13 2.95.34 14.32-10.82 18.36-14.52.41-.34.69.21.48.41-3.36 3.84-15.28 16.31-19.39 17.81-.89.34-1.58.07-2.19-.27-.55-.27-2.05-1.71-2.47-2.74-.07-.14-.21-.27-.21-1.03 0-2.06 3.15-8.7 11.51-21.79 4.25-6.64 8.63-12.6 12.19-17.26z"
              />
              <path
                className="st11"
                d="M562.39 703.84c-2.06 2.06-15.42 13.57-18.29 13.57-.14 0-.48-.14-.62-.21-1.23-.62-3.01-3.22-3.01-4.59 0-7.47 15.69-22.75 28.29-22.75 2.6 0 6.03 1.1 6.03 4.32 0 1.17-.62 2.33-1.3 3.22-.14.07-.27 0-.21-.07.34-.62.75-1.44.75-2.47 0-2.06-1.3-3.08-3.36-2.95-3.97.21-8.98 3.08-13.43 6.85-6.51 5.55-11.65 14.18-11.03 14.52.14.07.27.07.48 0 2.26-.75 11.85-7.67 15.42-10.69 1.23-1.1 5.69-5.41 7.4-6.37 1.37-.69 3.7 3.08 3.43 3.91-.34-.69-6.51 6.78-8.56 11.17-.41.96-.68 1.78-.68 2.33 4.32-1.23 14.11-10.62 18.36-14.59.34-.34.68.21.48.41-5.96 6.51-17.13 17.95-21.24 17.95-.34 0-.68-.14-1.16-.41-.96-.55-2.26-1.99-2.26-3.22 0-.69.27-1.51.55-2.54.8-2.52 2.65-5.68 3.96-7.39z"
              />
              <path
                className="st11"
                d="M583.49 702.06c-.27 1.17 1.37 2.26 2.06 2.88 10.96-6.17 19.73-7.67 20.62-7.67.14 0 .41.14.41.34.62.21-12.95 3.77-20.42 8.22.89.68 2.6 2.67 2.4 4.11-.96 4.45-10 8.08-14.46 8.08-1.51 0-2.26-1.23-2.6-2.74.21-2.95 10.28-8.7 12.67-9.66-.75-.96-4.8-3.43-4.18-6.44 1.1-5.21 10.96-10.35 16.99-10.35 1.92 0 2.81 3.15 2.6 5.14-.07.96-4.38 5.07-6.23 5.07-.07 0-.21-.27-.14-.27.21 0 4.8-4.8 4.93-6.17-3.14-.27-13.76 6.24-14.65 9.46zm-10.21 12.47c2.67-.75 11.17-5.14 11.17-7.74-4.11 2.33-9.19 5.75-11.17 7.74z"
              />
              <g>
                <path
                  className="st5"
                  d="M437.84 726.93c16.51 0 49.95-16.51 49.95-26.86 0-4.25-5.69-6.78-12.4-8.63-8.22-2.26-17.54-3.49-17.54-9.52 0-11.51 22.13-20.69 32.13-21.03 6.23-.21 10.41 1.3 10.35 6.58-.14 8.15-12.06 16.99-19.32 16.99-1.37 0-3.43-.55-3.43-2.06 0-2.81 2.67-5.75 4.04-6.58-1.03 1.17-1.44 2.6-1.44 3.56 0 .41.41.41.82.41 2.81 0 16.17-7.67 17.06-13.91.34-2.19-1.51-2.81-4.11-2.81-.75 0-1.64.07-2.54.14-8.77.96-28.91 12.26-28.91 19.32 0 3.97 6.58 5.69 13.5 7.6 7.74 2.12 15.76 4.66 15.76 12.26 0 15-34.12 29.67-52.82 29.67-4.52 0-11.1-1.3-11.1-6.71 0-10.14 30.97-26.51 39.81-26.31-18.16 4.93-35.56 20.07-35.56 25.14-.01 2.68 3.55 2.75 5.75 2.75zM495.25 717.34c-1.1-.34-2.81-2.06-2.81-3.29 0-3.97 9.93-18.91 14.32-22.4.34-.34.75-.41 1.03-.41 1.58 0 4.32 2.74 4.32 4.45 0 .27-.34-.07-.89-.14-2.81-.27-12.19 15.35-13.02 18.16 4.18-1.1 14.18-10.62 18.36-14.66.48-.34.82.21.62.41-5.96 6.44-16.85 17.61-21.1 17.95-.29 0-.49 0-.83-.07zm22.88-34.39c.62.69 1.03 1.71.75 1.71-.14 0-.69-.27-1.44.07-1.16.48-4.32 3.29-5.14 4.45-.96 1.23-2.4-.21-2.47-1.44-.07-1.99 2.54-6.44 4.32-6.99 1.58-.2 3.09 1.17 3.98 2.2z"
                />
                <path
                  className="st5"
                  d="M532.58 674.18c2.06-2.67 3.97-4.86 5.69-6.23 1.03-.82 1.92-1.37 2.54-1.37 3.84-.21 6.58 3.77 5.28 3.01-2.4-1.1-6.85 5.34-9.87 9.04-2.95 3.77-5.75 7.81-9.18 12.81-5.96 9.04-11.1 17.74-12.74 22.13 2.95.34 14.32-10.82 18.36-14.52.41-.34.69.21.48.41-3.36 3.84-15.28 16.31-19.39 17.81-.89.34-1.58.07-2.19-.27-.55-.27-2.05-1.71-2.47-2.74-.07-.14-.21-.27-.21-1.03 0-2.06 3.15-8.7 11.51-21.79 4.25-6.64 8.63-12.6 12.19-17.26z"
                />
                <path
                  className="st5"
                  d="M549.09 674.18c2.06-2.67 3.97-4.86 5.69-6.23 1.03-.82 1.92-1.37 2.54-1.37 3.84-.21 6.58 3.77 5.28 3.01-2.4-1.1-6.85 5.34-9.87 9.04-2.95 3.77-5.75 7.81-9.18 12.81-5.96 9.04-11.1 17.74-12.74 22.13 2.95.34 14.32-10.82 18.36-14.52.41-.34.69.21.48.41-3.36 3.84-15.28 16.31-19.39 17.81-.89.34-1.58.07-2.19-.27-.55-.27-2.05-1.71-2.47-2.74-.07-.14-.21-.27-.21-1.03 0-2.06 3.15-8.7 11.51-21.79 4.25-6.64 8.63-12.6 12.19-17.26z"
                />
                <path
                  className="st5"
                  d="M562.39 703.84c-2.06 2.06-15.42 13.57-18.29 13.57-.14 0-.48-.14-.62-.21-1.23-.62-3.01-3.22-3.01-4.59 0-7.47 15.69-22.75 28.29-22.75 2.6 0 6.03 1.1 6.03 4.32 0 1.17-.62 2.33-1.3 3.22-.14.07-.27 0-.21-.07.34-.62.75-1.44.75-2.47 0-2.06-1.3-3.08-3.36-2.95-3.97.21-8.98 3.08-13.43 6.85-6.51 5.55-11.65 14.18-11.03 14.52.14.07.27.07.48 0 2.26-.75 11.85-7.67 15.42-10.69 1.23-1.1 5.69-5.41 7.4-6.37 1.37-.69 3.7 3.08 3.43 3.91-.34-.69-6.51 6.78-8.56 11.17-.41.96-.68 1.78-.68 2.33 4.32-1.23 14.11-10.62 18.36-14.59.34-.34.68.21.48.41-5.96 6.51-17.13 17.95-21.24 17.95-.34 0-.68-.14-1.16-.41-.96-.55-2.26-1.99-2.26-3.22 0-.69.27-1.51.55-2.54.8-2.52 2.65-5.68 3.96-7.39z"
                />
                <path
                  className="st5"
                  d="M583.49 702.06c-.27 1.17 1.37 2.26 2.06 2.88 10.96-6.17 19.73-7.67 20.62-7.67.14 0 .41.14.41.34.62.21-12.95 3.77-20.42 8.22.89.68 2.6 2.67 2.4 4.11-.96 4.45-10 8.08-14.46 8.08-1.51 0-2.26-1.23-2.6-2.74.21-2.95 10.28-8.7 12.67-9.66-.75-.96-4.8-3.43-4.18-6.44 1.1-5.21 10.96-10.35 16.99-10.35 1.92 0 2.81 3.15 2.6 5.14-.07.96-4.38 5.07-6.23 5.07-.07 0-.21-.27-.14-.27.21 0 4.8-4.8 4.93-6.17-3.14-.27-13.76 6.24-14.65 9.46zm-10.21 12.47c2.67-.75 11.17-5.14 11.17-7.74-4.11 2.33-9.19 5.75-11.17 7.74z"
                />
              </g>

            </svg>
          </div>


        </div>

      </div >
      <div client="1" hall="2" session="0" id="rsr" className="hasSVG d-none">

        <ExampleDataTable />
      </div>
    </>
  )

}

export default Viewssvg