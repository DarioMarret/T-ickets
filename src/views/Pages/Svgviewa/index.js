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
            <svg
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1080 1080"
              xmlSpace="preserve"

            >
              <style>
                {
                  ".st1{fill:#66655d}.st2{fill:#fff}.st3{fill:#606060}.st6{font-family:&apos;ArialMT&apos;}.st7{font-size:12px}.st8{font-family:&apos;Mont-HeavyDEMO&apos;}.st9{font-size:48px}.st13{fill:none}.st14{fill:#e3e3e3}.st15{fill:#d8b88f}.st16{fill:#af8727}.st17{fill:#a91922}.st18{fill:#01518c}.st19{fill:#011e3c}.st20{fill:#5e0b07}.st21{font-family:&apos;Impact&apos;}.st23{fill:#dbd9d9;stroke:#f4e9e9;stroke-miterlimit:10}"
                }
              </style>
              <path
                d="M234.4 674l-3.2-16.9 33.9-335.6s4.2-16.9 8.5-29.6c0 0 66.7-113.3 292.2-100.6 0 0 158.8 23.3 191.6 104.8l53 360.9s-48.7 153.5-249.9 176.8c0 0-186.4 19.1-311.3-130.2L234.4 674z"
                fill="#3c3c3a"
              />
              <path
                className="st1"
                d="M846 710l11.3 4.2s-47.7 191.8-312 214.9C363.9 945 204.4 845.9 166.2 713.5l7.1-4.2s99.9 208.2 370.9 192.4C815.3 885.7 846 710 846 710z"
              />
              <path
                className="st2"
                d="M292.9 679.4l-128.5 28.8c1 2.6 2.1 5.2 3.3 7.7 0 0 66.7 181.1 308.1 204.4 0 0 14.8 1.8 38.4 1.8 48.1 0 133.1-7.6 206.2-53.7 0 0 105.9-69.9 131.3-157.8L736.2 680S688.6 785.9 535 797.5c0 0-9.6 1.3-25.1 1.3-48.6 0-156.1-12.7-216.3-117.8 0 0-.2-.5-.7-1.6z"
              />
              <path
                className="st3"
                d="M289.1 684.2c62.4 107.1 174.3 118.6 219.7 118.6 14.8 0 24.3-1.2 25.7-1.3 80.6-6.2 132-38.4 161-64.4 24.9-22.4 37.8-43.7 42.3-52.2l106.5 28.3c-13.8 42.3-46.6 80-72.2 104.6-28.5 27.4-54.4 44.7-55.5 45.5-31.8 20.1-69.1 34.7-110.8 43.5-37.1 7.8-70.9 9.5-92.7 9.5-23 0-37.7-1.8-37.8-1.8h-.2c-54.3-5.2-104.1-19.1-147.9-41.1-35-17.6-66.4-40.5-93.2-68-45.7-46.9-62.6-91.6-62.8-92l-.1-.2-.1-.2c-.3-.7-.6-1.3-.9-2l119-26.8"
              />
              <path
                className='none' id='mapas1'
                d="M289.1 684.2c62.4 107.1 174.3 118.6 219.7 118.6 14.8 0 24.3-1.2 25.7-1.3 80.6-6.2 132-38.4 161-64.4 24.9-22.4 37.8-43.7 42.3-52.2l106.5 28.3c-13.8 42.3-46.6 80-72.2 104.6-28.5 27.4-54.4 44.7-55.5 45.5-31.8 20.1-69.1 34.7-110.8 43.5-37.1 7.8-70.9 9.5-92.7 9.5-23 0-37.7-1.8-37.8-1.8h-.2c-54.3-5.2-104.1-19.1-147.9-41.1-35-17.6-66.4-40.5-93.2-68-45.7-46.9-62.6-91.6-62.8-92l-.1-.2-.1-.2c-.3-.7-.6-1.3-.9-2l119-26.8"

              />
              <path
                className="st2"
                d="M230.6 312.8c-12.2 18.4-27.2 46.5-28.4 74.9l-41.3 226.6s-5.9 34.1-.5 69l126.7-26.9c-.1-.3-.1-.5-.2-.8 0 0 4.2-184.2 37.1-316.6 0 0 .6-1.2 1.8-3.2l-95.2-23z"
              />
              <path
                className='none' id='mapas2'
                d="M303.2 668.3l48-350.1s162.4-112.9 316.2-1.4l45.2 351.5S660.4 820.8 419 765.7c-.1 0-91.8-32.4-115.8-97.4z"

              />
              <path
                className="st1"
                d="M694.9 322.4L694.9 326.7 784.6 306.9 786 301.3z"
              />
              <path
                className="st1"
                d="M238.9 299.5L238.9 304.8 333.5 328.1 333.6 322.8z"
              />
              <path
                className="st1"
                d="M333.5 328.1s54.8-76.7 174.4-75.3c0 0 109.2-5.6 187.1 73.9v-4.2s-64.7-73.9-188.9-73.4c0 0-110.8-4.5-172.3 73.7l-.3 5.3z"
              />
              <path
                className="st1"
                d="M159.7 682.7L162.9 687.6 286.7 662.2 286.4 655.7z"
              />
              <path
                className="st1"
                d="M738 658.1L738.5 663.6 922.9 696.1 927.2 690.9z"
              />
              <text transform="rotate(22.829 -1912.615 1333.87)" className="st6 st7" />
              <text
                transform="rotate(21.69 -2027.567 1391.569)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(19.993 -2225.957 1505.12)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(18.323 -2457.134 1637.978)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(16.672 -2729.71 1794.633)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(15.058 -3054.358 1982.228)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(13.468 -3448.526 2210.303)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(11.918 -3936.781 2494.68)"
                className="st2 st8 st9"
              />
              <text className="st6 st7" />
              <path
                className="st2"
                d="M864.4 289.3l-165.2 46.6s32.5 115.8 38.1 321.5l189.2 32.8s46.6-49.4 32.5-79.1l-46.6-273.9c0 .1-15.6-42.3-48-47.9z"
              />
              <path
                className="st3"
                d="M863.9 294.4c26.9 5.5 41.3 40.1 42.9 44.2L953.3 612l.1.7.3.6c9.9 20.8-16.6 56.9-29.8 71.5l-182.5-31.7c-3.1-104.6-13.2-185.1-21.1-234.5-6.7-41.8-13.2-68.9-15.8-79.3l159.4-44.9"
              />
              <path
                className='none' id='mapas3'
                d="M863.9 295.5c26.9 5.5 41.3 40.1 42.9 44.2l46.5 273.4.1.7.3.6c9.9 20.8-16.6 56.9-29.8 71.5l-182.5-31.7c-3.1-104.6-13.2-185.1-21.1-234.5-6.7-41.8-13.2-68.9-15.8-79.3l159.4-44.9"

              />
              <path
                className="st2"
                d="M517.7 180.7c-112.3 0-225.6 47.5-270.7 110 0 0-2.9 3.2-7.1 8.8l94.8 23.3c20.2-25.5 72.8-73.4 183.9-73.4H521.5c5.3 0 101.4 1 174.5 73.1l91.1-21.2S723.6 215.5 591.2 188c-24-5-48.7-7.3-73.5-7.3z"
              />
              <path
                d="M517.8 185.7c25.1 0 49.5 2.4 72.4 7.2 29.7 6.2 58.3 15.9 85 28.8 21.4 10.4 41.6 22.8 60.2 37 21.5 16.5 35.8 31.5 42.7 39.6L697.6 317c-30.8-29.6-68.7-50.8-112.9-62.9-34.4-9.4-60.3-9.7-63.1-9.7H518.7c-108.3 0-162.4 44.5-185.8 72.8l-84.1-20.7c1.3-1.6 2.1-2.5 2.1-2.5l.2-.2.1-.2c21.5-29.7 59.8-57 108-76.7 49-20.1 105.4-31.2 158.6-31.2"
                fill="#27348b"
              />
              <text transform="rotate(-18.612 975.89 -1122.853)" className="st6 st7" />
              <text
                transform="rotate(-17.44 1026.78 -1219.229)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(-15.647 1115.811 -1413.388)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(-13.832 1229.151 -1660.078)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(-11.993 1379.19 -1985.466)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(-10.134 1586.472 -2433.909)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(-8.244 1891.408 -3093.31)"
                className="st2 st8 st9"
              />
              <text className="st6 st7" />
              <path
                className="st3"
                d="M232.9 319.2l85.9 20.8c-16.8 68.4-25.9 150.4-30.6 207.3-4.4 52.9-5.8 94.5-6.2 105.9l-117.4 25c-3.9-31.8 1.2-61.9 1.2-62.1l41.3-226.6.1-.3v-.3c1.2-26 14.2-51.8 25.7-69.7"
              />
              <path
                className='none' id='mapas4'
                d="M232.9 319.2l85.9 20.8c-16.8 68.4-25.9 150.4-30.6 207.3-4.4 52.9-5.8 94.5-6.2 105.9l-117.4 25c-3.9-31.8 1.2-61.9 1.2-62.1l41.3-226.6.1-.3v-.3c1.2-26 14.2-51.8 25.7-69.7"

              />
              <path
                id="SVGID_x5F_00000007410317060522796580000000835565151317055140_x5F_"
                className="st13"
                d="M243.9 648.6l35.3-266.8"
              />
              <text transform="rotate(-82.461 454.95 142.896)" className="st6 st7" />
              <text className="st6 st7" />
              <path
                className="st14"
                d="M690.8 554.3L326.9 554.3 354.8 335.4 662.9 335.4z"
              />
              <path
                className="st15"
                d="M625.6 360.1L390.1 360.1 392.1 339.5 623.6 339.5z"
              />
              <path
                className="st15"
                d="M516.1 517.8L499.6 517.8 500.7 360.1 515.3 360.1z"
              />
              <path
                className="st15"
                d="M551.1 551.4L465.9 551.4 467 517.8 550.1 517.8z"
              />
              <path
                className="st16"
                d="M527.1 373.9L517.4 373.9 517.3 361.4 526.9 361.4z"
              />
              <path
                className="st16"
                d="M541.2 373.9L531.5 373.9 531.2 361.4 540.9 361.4z"
              />
              <path
                className="st16"
                d="M555.3 373.9L545.6 373.9 545.2 361.4 554.8 361.4z"
              />
              <path
                className="st16"
                d="M569.4 373.9L559.6 373.9 559.1 361.4 568.8 361.4z"
              />
              <path
                className="st16"
                d="M583.5 373.9L573.7 373.9 573.1 361.4 582.7 361.4z"
              />
              <path
                className="st16"
                d="M597.6 373.9L587.8 373.9 587 361.4 596.7 361.4z"
              />
              <path
                className="st16"
                d="M611.7 373.9L601.9 373.9 601 361.4 610.6 361.4z"
              />
              <path
                className="st16"
                d="M527.3 390L517.5 390 517.4 377.2 527.1 377.2z"
              />
              <path
                className="st16"
                d="M541.6 390L531.8 390 531.5 377.2 541.3 377.2z"
              />
              <path className="st16" d="M555.9 390L546 390 545.6 377.2 555.4 377.2z" />
              <path
                className="st16"
                d="M570.2 390L560.3 390 559.8 377.2 569.5 377.2z"
              />
              <path
                className="st16"
                d="M584.4 390L574.6 390 573.9 377.2 583.7 377.2z"
              />
              <path className="st16" d="M598.7 390L588.9 390 588 377.2 597.8 377.2z" />
              <path className="st16" d="M613 390L603.1 390 602.2 377.2 611.9 377.2z" />
              <path className="st16" d="M627.2 390L617.3 390 616.2 377.2 626 377.2z" />
              <g>
                <path
                  className="st16"
                  d="M398.8 390.2L388.9 390.2 390.2 377.3 399.9 377.3z"
                />
                <path
                  className="st16"
                  d="M413.1 390.2L403.2 390.2 404.3 377.3 414.1 377.3z"
                />
                <path
                  className="st16"
                  d="M427.4 390.2L417.5 390.2 418.5 377.3 428.2 377.3z"
                />
                <path
                  className="st16"
                  d="M441.6 390.2L431.8 390.2 432.6 377.3 442.3 377.3z"
                />
                <path
                  className="st16"
                  d="M455.9 390.2L446.1 390.2 446.7 377.3 456.5 377.3z"
                />
                <path
                  className="st16"
                  d="M470.2 390.2L460.4 390.2 460.9 377.3 470.6 377.3z"
                />
                <path
                  className="st16"
                  d="M484.5 390.2L474.6 390.2 475 377.3 484.7 377.3z"
                />
                <path
                  className="st16"
                  d="M498.7 390.2L488.8 390.2 489 377.3 498.8 377.3z"
                />
              </g>
              <g>
                <path
                  className="st16"
                  d="M527.6 406.6L517.6 406.6 517.5 393.4 527.4 393.4z"
                />
                <path
                  className="st16"
                  d="M542 406.6L532.1 406.6 531.8 393.4 541.7 393.4z"
                />
                <path
                  className="st16"
                  d="M556.5 406.6L546.5 406.6 546.1 393.4 556 393.4z"
                />
                <path
                  className="st16"
                  d="M571 406.6L561 406.6 560.4 393.4 570.3 393.4z"
                />
                <path
                  className="st16"
                  d="M585.4 406.6L575.5 406.6 574.8 393.4 584.6 393.4z"
                />
                <path
                  className="st16"
                  d="M599.9 406.6L589.9 406.6 589.1 393.4 599 393.4z"
                />
                <path
                  className="st16"
                  d="M614.4 406.6L604.4 406.6 603.4 393.4 613.3 393.4z"
                />
                <path
                  className="st16"
                  d="M628.8 406.6L618.8 406.6 617.6 393.4 627.5 393.4z"
                />
                <path
                  className="st16"
                  d="M643.6 406.6L633.6 406.6 632.3 393.4 642.2 393.4z"
                />
                <path
                  className="st16"
                  d="M658 406.6L648 406.6 646.6 393.4 656.5 393.4z"
                />
              </g>
              <g>
                <path
                  className="st17"
                  d="M527.8 423.6L517.7 423.6 517.6 410 527.6 410z"
                />
                <path
                  className="st17"
                  d="M542.5 423.6L532.4 423.6 532.1 410 542.1 410z"
                />
                <path
                  className="st17"
                  d="M557.1 423.6L547 423.6 546.6 410 556.6 410z"
                />
                <path
                  className="st17"
                  d="M571.8 423.6L561.7 423.6 561.1 410 571.1 410z"
                />
                <path
                  className="st17"
                  d="M586.5 423.6L576.4 423.6 575.6 410 585.6 410z"
                />
                <path
                  className="st17"
                  d="M601.1 423.6L591 423.6 590.1 410 600.2 410z"
                />
                <path
                  className="st17"
                  d="M615.8 423.6L605.7 423.6 604.7 410 614.7 410z"
                />
                <path
                  className="st17"
                  d="M630.4 423.6L620.3 423.6 619.1 410 629.1 410z"
                />
                <path className="st17" d="M645.4 423.6L635.3 423.6 634 410 644 410z" />
                <path
                  className="st17"
                  d="M660 423.6L649.9 423.6 648.4 410 658.4 410z"
                />
              </g>
              <g className="none">
                <path
                  className='none' id='mapas5'
                  d="M528.6 477.5L518.1 477.5 518 462.7 528.4 462.7z"
                />
                <path
                  className="st18"
                  d="M543.9 477.5L533.4 477.5 533.1 462.7 543.5 462.7z"
                />
                <path
                  className="st18"
                  d="M559.2 477.5L548.6 477.5 548.2 462.7 558.6 462.7z"
                />
                <path
                  className="st18"
                  d="M574.4 477.5L563.9 477.5 563.3 462.7 573.7 462.7z"
                />
                <path
                  className="st18"
                  d="M589.7 477.5L579.2 477.5 578.4 462.7 588.8 462.7z"
                />
                <path
                  className="st18"
                  d="M605 477.5L594.5 477.5 593.5 462.7 603.9 462.7z"
                />
                <path
                  className="st18"
                  d="M620.3 477.5L609.7 477.5 608.6 462.7 619 462.7z"
                />
                <path
                  className="st18"
                  d="M635.5 477.5L624.9 477.5 623.7 462.7 634.1 462.7z"
                />
                <path
                  className="st18"
                  d="M651.2 477.5L640.6 477.5 639.2 462.7 649.6 462.7z"
                />
                <path
                  className="st18"
                  d="M666.4 477.5L655.8 477.5 654.2 462.7 664.6 462.7z"
                />
              </g>
              <g>
                <path
                  className="st18"
                  d="M528.9 496.4L518.2 496.4 518.1 481.3 528.7 481.3z"
                />
                <path
                  className="st18"
                  d="M544.4 496.4L533.7 496.4 533.4 481.3 544 481.3z"
                />
                <path
                  className="st18"
                  d="M559.9 496.4L549.2 496.4 548.7 481.3 559.3 481.3z"
                />
                <path
                  className="st18"
                  d="M575.4 496.4L564.7 496.4 564.1 481.3 574.6 481.3z"
                />
                <path
                  className="st18"
                  d="M590.9 496.4L580.2 496.4 579.4 481.3 590 481.3z"
                />
                <path
                  className="st18"
                  d="M606.4 496.4L595.7 496.4 594.7 481.3 605.3 481.3z"
                />
                <path
                  className="st18"
                  d="M621.9 496.4L611.2 496.4 610 481.3 620.6 481.3z"
                />
                <path
                  className="st18"
                  d="M637.3 496.4L626.6 496.4 625.3 481.3 635.8 481.3z"
                />
                <path
                  className="st18"
                  d="M653.2 496.4L642.5 496.4 641 481.3 651.6 481.3z"
                />
                <path
                  className="st18"
                  d="M668.6 496.4L657.9 496.4 656.2 481.3 666.8 481.3z"
                />
              </g>
              <g>
                <path
                  className="st18"
                  d="M529.2 516L518.3 516 518.2 500.4 529 500.4z"
                />
                <path
                  className="st18"
                  d="M544.9 516L534.1 516 533.8 500.4 544.5 500.4z"
                />
                <path
                  className="st18"
                  d="M560.6 516L549.8 516 549.3 500.4 560 500.4z"
                />
                <path
                  className="st18"
                  d="M576.3 516L565.5 516 564.8 500.4 575.6 500.4z"
                />
                <path
                  className="st18"
                  d="M592 516L581.2 516 580.4 500.4 591.1 500.4z"
                />
                <path
                  className="st19"
                  d="M607.8 516L596.9 516 595.9 500.4 606.6 500.4z"
                />
                <path
                  className="st19"
                  d="M623.5 516L612.6 516 611.5 500.4 622.2 500.4z"
                />
                <path
                  className="st19"
                  d="M639.1 516L628.3 516 626.9 500.4 637.6 500.4z"
                />
                <path
                  className="st19"
                  d="M655.3 516L644.4 516 642.9 500.4 653.6 500.4z"
                />
                <path
                  className="st19"
                  d="M670.9 516L660 516 658.3 500.4 669.1 500.4z"
                />
              </g>
              <g>
                <path
                  className="st17"
                  d="M528.1 441.1L517.8 441.1 517.7 427.1 527.9 427.1z"
                />
                <path
                  className="st17"
                  d="M542.9 441.1L532.7 441.1 532.4 427.1 542.6 427.1z"
                />
                <path
                  className="st17"
                  d="M557.8 441.1L547.5 441.1 547.1 427.1 557.3 427.1z"
                />
                <path
                  className="st17"
                  d="M572.7 441.1L562.4 441.1 561.8 427.1 572 427.1z"
                />
                <path
                  className="st17"
                  d="M587.5 441.1L577.3 441.1 576.5 427.1 586.7 427.1z"
                />
                <path
                  className="st17"
                  d="M602.4 441.1L592.1 441.1 591.2 427.1 601.4 427.1z"
                />
                <path
                  className="st17"
                  d="M617.2 441.1L607 441.1 605.9 427.1 616.1 427.1z"
                />
                <path
                  className="st17"
                  d="M632 441.1L621.8 441.1 620.6 427.1 630.7 427.1z"
                />
                <path
                  className="st17"
                  d="M647.3 441.1L637 441.1 635.7 427.1 645.8 427.1z"
                />
                <path
                  className="st17"
                  d="M662.1 441.1L651.8 441.1 650.3 427.1 660.4 427.1z"
                />
              </g>
              <g>
                <path
                  className="st17"
                  d="M528.3 459L517.9 459 517.8 444.7 528.1 444.7z"
                />
                <path className="st17" d="M543.4 459L533 459 532.8 444.7 543 444.7z" />
                <path
                  className="st17"
                  d="M558.5 459L548.1 459 547.7 444.7 557.9 444.7z"
                />
                <path
                  className="st17"
                  d="M573.5 459L563.1 459 562.6 444.7 572.8 444.7z"
                />
                <path
                  className="st17"
                  d="M588.6 459L578.2 459 577.5 444.7 587.7 444.7z"
                />
                <path
                  className="st20"
                  d="M603.7 459L593.3 459 592.4 444.7 602.6 444.7z"
                />
                <path
                  className="st20"
                  d="M618.7 459L608.3 459 607.3 444.7 617.5 444.7z"
                />
                <path
                  className="st20"
                  d="M633.7 459L623.3 459 622.1 444.7 632.4 444.7z"
                />
                <path
                  className="st20"
                  d="M649.2 459L638.8 459 637.4 444.7 647.7 444.7z"
                />
                <path
                  className="st20"
                  d="M664.2 459L653.8 459 652.2 444.7 662.5 444.7z"
                />
              </g>
              <g>
                <path
                  className="st17"
                  d="M487.6 423.6L497.7 423.6 497.9 410 487.9 410z"
                />
                <path
                  className="st17"
                  d="M473 423.6L483.1 423.6 483.4 410 473.4 410z"
                />
                <path
                  className="st17"
                  d="M458.3 423.6L468.4 423.6 468.9 410 458.8 410z"
                />
                <path
                  className="st17"
                  d="M443.6 423.6L453.8 423.6 454.3 410 444.3 410z"
                />
                <path
                  className="st17"
                  d="M429 423.6L439.1 423.6 439.8 410 429.8 410z"
                />
                <path
                  className="st17"
                  d="M414.3 423.6L424.4 423.6 425.3 410 415.3 410z"
                />
                <path
                  className="st17"
                  d="M399.7 423.6L409.8 423.6 410.8 410 400.8 410z"
                />
                <path
                  className="st17"
                  d="M385.1 423.6L395.2 423.6 396.4 410 386.4 410z"
                />
                <path
                  className="st17"
                  d="M370 423.6L380.1 423.6 381.5 410 371.5 410z"
                />
                <path
                  className="st17"
                  d="M355.4 423.6L365.6 423.6 367.1 410 357.1 410z"
                />
                <g>
                  <path
                    className="st18"
                    d="M486.7 477.5L497.3 477.5 497.4 462.7 487 462.7z"
                  />
                  <path
                    className="st18"
                    d="M471.5 477.5L482 477.5 482.3 462.7 471.9 462.7z"
                  />
                  <path
                    className="st18"
                    d="M456.2 477.5L466.7 477.5 467.2 462.7 456.8 462.7z"
                  />
                  <path
                    className="st18"
                    d="M440.9 477.5L451.4 477.5 452.1 462.7 441.7 462.7z"
                  />
                  <path
                    className="st18"
                    d="M425.6 477.5L436.2 477.5 437 462.7 426.5 462.7z"
                  />
                  <path
                    className="st18"
                    d="M410.4 477.5L420.9 477.5 421.9 462.7 411.4 462.7z"
                  />
                  <path
                    className="st18"
                    d="M395.1 477.5L405.6 477.5 406.8 462.7 396.3 462.7z"
                  />
                  <path
                    className="st18"
                    d="M379.9 477.5L390.4 477.5 391.7 462.7 381.3 462.7z"
                  />
                  <path
                    className="st18"
                    d="M364.2 477.5L374.7 477.5 376.2 462.7 365.8 462.7z"
                  />
                  <path
                    className="st18"
                    d="M349 477.5L359.5 477.5 361.2 462.7 350.8 462.7z"
                  />
                </g>
                <g>
                  <path
                    className="st18"
                    d="M486.4 496.4L497.1 496.4 497.2 481.3 486.7 481.3z"
                  />
                  <path
                    className="st18"
                    d="M470.9 496.4L481.6 496.4 481.9 481.3 471.4 481.3z"
                  />
                  <path
                    className="st18"
                    d="M455.4 496.4L466.1 496.4 466.6 481.3 456 481.3z"
                  />
                  <path
                    className="st18"
                    d="M439.9 496.4L450.6 496.4 451.3 481.3 440.7 481.3z"
                  />
                  <path
                    className="st18"
                    d="M424.5 496.4L435.1 496.4 436 481.3 425.4 481.3z"
                  />
                  <path
                    className="st18"
                    d="M409 496.4L419.6 496.4 420.6 481.3 410.1 481.3z"
                  />
                  <path
                    className="st18"
                    d="M393.5 496.4L404.2 496.4 405.3 481.3 394.8 481.3z"
                  />
                  <path
                    className="st18"
                    d="M378.1 496.4L388.7 496.4 390.1 481.3 379.5 481.3z"
                  />
                  <path
                    className="st18"
                    d="M362.1 496.4L372.8 496.4 374.4 481.3 363.8 481.3z"
                  />
                  <path
                    className="st18"
                    d="M346.7 496.4L357.4 496.4 359.1 481.3 348.5 481.3z"
                  />
                </g>
                <g>
                  <path
                    className="st18"
                    d="M486.1 516L496.9 516 497.1 500.4 486.4 500.4z"
                  />
                  <path
                    className="st18"
                    d="M470.4 516L481.2 516 481.5 500.4 470.8 500.4z"
                  />
                  <path
                    className="st18"
                    d="M454.7 516L465.5 516 466 500.4 455.3 500.4z"
                  />
                  <path
                    className="st18"
                    d="M439 516L449.8 516 450.5 500.4 439.7 500.4z"
                  />
                  <path
                    className="st18"
                    d="M423.2 516L434.1 516 434.9 500.4 424.2 500.4z"
                  />
                  <path
                    className="st19"
                    d="M407.5 516L418.4 516 419.4 500.4 408.7 500.4z"
                  />
                  <path
                    className="st19"
                    d="M391.8 516L402.6 516 403.8 500.4 393.1 500.4z"
                  />
                  <path
                    className="st19"
                    d="M376.2 516L387 516 388.4 500.4 377.7 500.4z"
                  />
                  <path
                    className="st19"
                    d="M360 516L370.9 516 372.4 500.4 361.7 500.4z"
                  />
                  <path
                    className="st19"
                    d="M344.4 516L355.2 516 357 500.4 346.3 500.4z"
                  />
                </g>
                <g>
                  <path
                    className="st17"
                    d="M487.3 441.1L497.6 441.1 497.7 427.1 487.6 427.1z"
                  />
                  <path
                    className="st17"
                    d="M472.5 441.1L482.7 441.1 483 427.1 472.9 427.1z"
                  />
                  <path
                    className="st17"
                    d="M457.6 441.1L467.9 441.1 468.3 427.1 458.2 427.1z"
                  />
                  <path
                    className="st17"
                    d="M442.8 441.1L453 441.1 453.6 427.1 443.5 427.1z"
                  />
                  <path
                    className="st17"
                    d="M427.9 441.1L438.1 441.1 438.9 427.1 428.8 427.1z"
                  />
                  <path
                    className="st17"
                    d="M413 441.1L423.3 441.1 424.2 427.1 414.1 427.1z"
                  />
                  <path
                    className="st17"
                    d="M398.2 441.1L408.4 441.1 409.5 427.1 399.4 427.1z"
                  />
                  <path
                    className="st17"
                    d="M383.4 441.1L393.6 441.1 394.9 427.1 384.7 427.1z"
                  />
                  <path
                    className="st17"
                    d="M368.1 441.1L378.4 441.1 379.8 427.1 369.6 427.1z"
                  />
                  <path
                    className="st17"
                    d="M353.4 441.1L363.6 441.1 365.2 427.1 355 427.1z"
                  />
                </g>
                <g>
                  <path
                    className="st17"
                    d="M487 459L497.4 459 497.6 444.7 487.3 444.7z"
                  />
                  <path
                    className="st17"
                    d="M472 459L482.4 459 482.7 444.7 472.4 444.7z"
                  />
                  <path
                    className="st17"
                    d="M456.9 459L467.3 459 467.8 444.7 457.5 444.7z"
                  />
                  <path
                    className="st17"
                    d="M441.8 459L452.2 459 452.9 444.7 442.6 444.7z"
                  />
                  <path
                    className="st17"
                    d="M426.8 459L437.2 459 438 444.7 427.7 444.7z"
                  />
                  <path
                    className="st20"
                    d="M411.7 459L422.1 459 423.1 444.7 412.8 444.7z"
                  />
                  <path
                    className="st20"
                    d="M396.6 459L407 459 408.1 444.7 397.9 444.7z"
                  />
                  <path
                    className="st20"
                    d="M381.7 459L392.1 459 393.3 444.7 383 444.7z"
                  />
                  <path
                    className='none' id='mapas6'
                    d="M366.2 459L376.6 459 378 444.7 367.7 444.7z"
                  />
                  <path
                    className="st20"
                    d="M351.2 459L361.6 459 363.2 444.7 352.9 444.7z"
                  />
                </g>
              </g>
              <g>
                <path
                  className="st16"
                  d="M367.8 406.9L357.9 406.9 359.4 393.7 369.3 393.7z"
                />
                <path
                  className="st16"
                  d="M382.3 406.9L372.3 406.9 373.8 393.7 383.6 393.7z"
                />
                <path
                  className="st16"
                  d="M396.8 406.9L386.8 406.9 388.1 393.7 398 393.7z"
                />
                <path
                  className="st16"
                  d="M411.3 406.9L401.3 406.9 402.4 393.7 412.3 393.7z"
                />
                <path
                  className="st16"
                  d="M425.7 406.9L415.7 406.9 416.7 393.7 426.6 393.7z"
                />
                <path
                  className="st16"
                  d="M440.2 406.9L430.2 406.9 431 393.7 440.9 393.7z"
                />
                <path
                  className="st16"
                  d="M454.7 406.9L444.7 406.9 445.4 393.7 455.2 393.7z"
                />
                <path
                  className="st16"
                  d="M469.1 406.9L459.1 406.9 459.6 393.7 469.5 393.7z"
                />
                <path
                  className="st16"
                  d="M483.9 406.9L473.9 406.9 474.3 393.7 484.2 393.7z"
                />
                <path
                  className="st16"
                  d="M498.3 406.9L488.3 406.9 488.6 393.7 498.4 393.7z"
                />
              </g>
              <g>
                <path
                  className="st16"
                  d="M414.3 373.9L404.5 373.9 405.6 361.4 415.2 361.4z"
                />
                <path
                  className="st16"
                  d="M428.3 373.9L418.6 373.9 419.5 361.4 429.2 361.4z"
                />
                <path
                  className="st16"
                  d="M442.4 373.9L432.7 373.9 433.5 361.4 443.1 361.4z"
                />
                <path
                  className="st16"
                  d="M456.5 373.9L446.8 373.9 447.4 361.4 457.1 361.4z"
                />
                <path
                  className="st16"
                  d="M470.6 373.9L460.9 373.9 461.4 361.4 471 361.4z"
                />
                <path
                  className="st16"
                  d="M484.7 373.9L475 373.9 475.3 361.4 485 361.4z"
                />
                <path
                  className="st16"
                  d="M498.8 373.9L489.1 373.9 489.3 361.4 498.9 361.4z"
                />
              </g>
              <text
                transform="translate(412 673.615)"
                className="st2 st21"
                fontSize="55.9839px"
              >
                {"CANCHA"}
              </text>
              <path
                className="st14"
                d="M354.8 335.4l2.1-13.8s79.1-48 154.4-48c0 0 91.3.9 148.7 47.5l2.9 14.3H354.8z"
              />
              <g>
                <path
                  className="st23"
                  d="M461.2 240.1L461.2 302.8 466.8 302.8 466.8 240.2z"
                />
                <path
                  className="st23"
                  d="M544.8 240.1L544.8 302.8 550.4 302.8 550.4 240.2z"
                />
                <path
                  className="st23"
                  d="M568.4 211.6L568.4 331.5 575.9 331.5 575.9 211.7z"
                />
                <path
                  className="st23"
                  d="M435.8 211.6L435.8 331.5 443.2 331.5 443.2 211.7z"
                />
                <path fill="#b3b3b3" d="M435.3 205.5H575.9V211.7H435.3z" />
                <path
                  className="st3"
                  d="M435.4 205.5L479.7 175.8 531.8 175.8 576 205.5z"
                />
                <path
                  className="st23"
                  d="M443.2 212.4L466.5 233.5 466.5 240.2 461.2 240.1 443.4 227.7z"
                />
                <path
                  className="st23"
                  d="M568.3 212.4L545 233.5 545 240.2 550.3 240.1 568.1 227.7z"
                />
                <path className="st23" d="M435.8 211.6H575.9V222.7H435.8z" />
                <path className="st23" d="M461.2 233.7H550.5V240.2H461.2z" />
                <path
                  fill="#181818"
                  d="M442.4 314L442.4 329.9 567.4 329.9 567.4 314z"
                />
                <path
                  fill="#353535"
                  d="M443 314.4L566.8 314.4 549.6 303.2 460.2 302.8z"
                />
                <path fill="#b0b0b0" d="M466.8 240.2H544.8V302.9H466.8z" />
              </g>
              <path
                id="SVGID_x5F_1_x5F_"
                className="st13"
                d="M208.7 732.7s93.2 152.5 301.8 156.7c0 0 207.5 3.2 293.3-169.4"
              />
              <text>
                <textPath xlinkHref="#SVGID_x5F_1_x5F_" startOffset="23.3549%">
                  <tspan className="st2 st21" fontSize="72px">
                    {" GENERAL"}
                  </tspan>
                </textPath>
              </text>
              <path
                id="SVGID_x5F_00000124841879130412774450000014670174898037156514_x5F_"
                className="st13"
                d="M251.7 620.5L284.3 396"
              />
              <text>
                <textPath
                  xlinkHref="#SVGID_x5F_00000124841879130412774450000014670174898037156514_x5F_"
                  startOffset="18.2617%"
                >
                  <tspan className="st2 st21" fontSize="59.8387px">
                    {"TRIBUNA"}
                  </tspan>
                </textPath>
              </text>
              <path
                id="SVGID_x5F_00000170997970629921327360000016535251117255215274_x5F_"
                className="st13"
                d="M784.2 328.9l33.4 331.8"
              />
              <text>
                <textPath
                  xlinkHref="#SVGID_x5F_00000170997970629921327360000016535251117255215274_x5F_"
                  startOffset="18.2617%"
                >
                  <tspan className="st2 st21" fontSize="52.9228px">
                    {"PREFERENCIA"}
                  </tspan>
                </textPath>
              </text>
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