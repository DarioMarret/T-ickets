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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" >
              <defs>
                <style>
                  {
                    ".cls-1{fill:#6b6e6b}.cls-2{fill:#ffb6b6}.cls-6{fill:#4f6057}.cls-13{stroke:#fff;stroke-miterlimit:10}.cls-13,.cls-14{fill:none}.cls-15,.cls-16,.cls-17,.cls-18,.cls-19,.cls-20{font-family:Nexa-Black,Nexa;font-weight:800}.cls-15,.cls-17{font-size:14px}.cls-23{fill:#7c7d7b}.cls-24,.cls-25{fill:#f39200}.cls-26{fill:#443f34}.cls-25{opacity:.6}.cls-31{fill:#676a68}.cls-16{font-size:12px}.cls-16,.cls-17,.cls-18,.cls-19{fill:#fff}.cls-41{fill:#717273}.cls-45{fill:#373a82}.cls-49{mix-blend-mode:hard-light}.cls-18{font-size:34px}.cls-52{fill:#010000}.cls-19{font-size:23px}.cls-66{fill:#373a88}.cls-20{font-size:26px}.cls-71{fill:#767f7e}.cls-72{fill:#606060}.cls-81{fill:#8d8e8e}.cls-84{fill:#919191}"
                  }
                </style>
                <clipPath id="clippath">
                  <path
                    className="cls-14"
                    d="M302.28 265.6L324.34 250.6 400.75 326.31 387.34 337.43 302.28 265.6z"
                  />
                </clipPath>
                <clipPath id="clippath-1">
                  <path
                    className="cls-14"
                    d="M323.87 249.72L360.69 231.54 420.87 315.02 399.75 326.31 323.87 249.72z"
                  />
                </clipPath>
                <clipPath id="clippath-2">
                  <path
                    className="cls-14"
                    d="M360.1 230.91L398.81 218.49 443.12 306.79 420.5 314.66 360.1 230.91z"
                  />
                </clipPath>
                <clipPath id="clippath-3">
                  <path
                    className="cls-14"
                    d="M397.92 217.43L437.1 207.9 464.81 298.43 441.87 306.37 397.92 217.43z"
                  />
                </clipPath>
                <clipPath id="clippath-4">
                  <path
                    className="cls-14"
                    d="M437.1 207.9L471.86 202.85 489.34 294.19 465.16 299.31 437.1 207.9z"
                  />
                </clipPath>
                <clipPath id="clippath-5">
                  <path
                    className="cls-14"
                    d="M566.53 200.59L601.35 205.06 576.17 296.59 552.17 293.3 566.53 200.59z"
                  />
                </clipPath>
                <clipPath id="clippath-6">
                  <path
                    className="cls-14"
                    d="M601.35 205.06L640.88 214.24 596.88 301.53 576.15 296.92 601.35 205.06z"
                  />
                </clipPath>
                <clipPath id="clippath-7">
                  <path
                    className="cls-14"
                    d="M647.08 216.04L680.41 229.06 621.11 310.47 601.82 304.12 647.08 216.04z"
                  />
                </clipPath>
                <clipPath id="clippath-8">
                  <path
                    className="cls-14"
                    d="M680.41 227.88L710.53 242.94 640.41 321.77 620.41 311.41 680.41 227.88z"
                  />
                </clipPath>
                <clipPath id="clippath-9">
                  <path
                    className="cls-14"
                    d="M711.42 242.62L739.19 261.67 656.17 333.77 640.41 321.77 711.42 242.62z"
                  />
                </clipPath>
                <clipPath id="clippath-10">
                  <path
                    className="cls-14"
                    d="M742.14 262.95L769.34 287.12 676.79 353.66 658.29 336.12 742.14 262.95z"
                  />
                </clipPath>
                <clipPath id="clippath-11">
                  <path
                    className="cls-14"
                    d="M769.34 287.12L794.76 314.47 694.06 375.88 676.64 354.47 769.34 287.12z"
                  />
                </clipPath>
                <clipPath id="clippath-12">
                  <path
                    className="cls-14"
                    d="M798.29 318.47L811.47 334.94 707.23 394.94 697.11 381.06 798.29 318.47z"
                  />
                </clipPath>
                <clipPath id="clippath-13">
                  <path
                    className="cls-14"
                    d="M811.47 334.94L824.16 353.39 714.29 407.65 707.23 394.94 811.47 334.94z"
                  />
                </clipPath>
                <clipPath id="clippath-14">
                  <path
                    className="cls-14"
                    d="M823.94 352.59L835.59 372.52 719.94 420.35 715.02 408.23 823.94 352.59z"
                  />
                </clipPath>
                <clipPath id="clippath-15">
                  <path
                    className="cls-14"
                    d="M835.23 371.88L846.29 393.77 726.06 440.59 719.94 420.35 835.23 371.88z"
                  />
                </clipPath>
                <clipPath id="clippath-16">
                  <path
                    className="cls-14"
                    d="M845.82 394.71L854.76 424.83 731.5 459.69 726.85 439.06 845.82 394.71z"
                  />
                </clipPath>
                <clipPath id="clippath-17">
                  <path
                    className="cls-14"
                    d="M854.84 424.94L864.41 455.88 737.82 486 732.17 459.41 854.84 424.94z"
                  />
                </clipPath>
                <clipPath id="clippath-18">
                  <path
                    className="cls-14"
                    d="M864.88 456.35L870.06 493.3 739.94 512.12 737.95 484.6 864.88 456.35z"
                  />
                </clipPath>
                <clipPath id="clippath-19">
                  <path
                    className="cls-14"
                    d="M870.06 493.3L871.86 527.14 739.94 538.24 741.59 512.12 870.06 493.3z"
                  />
                </clipPath>
                <clipPath id="clippath-20">
                  <path
                    className="cls-14"
                    d="M871.34 527.25L867 566.24 730.53 578.71 739.94 538.24 871.34 527.25z"
                  />
                </clipPath>
                <clipPath id="clippath-21">
                  <path
                    className="cls-14"
                    d="M868.98 565.68L854.93 612.44 720.39 608.73 730.98 579.09 868.98 565.68z"
                  />
                </clipPath>
                <clipPath id="clippath-22">
                  <path
                    className="cls-14"
                    d="M854.16 613.32L837.92 650.73 705.92 638.03 720.39 608.73 854.16 613.32z"
                  />
                </clipPath>
                <clipPath id="clippath-23">
                  <path
                    className="cls-14"
                    d="M837.92 650.73L815.19 689.35 686.51 664.5 705.92 638.03 837.92 650.73z"
                  />
                </clipPath>
                <clipPath id="clippath-24">
                  <path
                    className="cls-14"
                    d="M815.88 690.83L771.05 732.83 665.17 687.65 690.93 661.53 815.88 690.83z"
                  />
                </clipPath>
                <clipPath id="clippath-25">
                  <path
                    className="cls-14"
                    d="M764.05 735.16L725.17 763.18 638.34 701.86 659.51 689.15 764.05 735.16z"
                  />
                </clipPath>
                <clipPath id="clippath-26">
                  <path
                    className="cls-14"
                    d="M725.17 763.18L662.7 791.41 603.75 715.62 638.34 701.86 725.17 763.18z"
                  />
                </clipPath>
                <clipPath id="clippath-27">
                  <path
                    className="cls-14"
                    d="M656.35 792.47L596.35 809.41 564.22 726.21 597.04 718.8 656.35 792.47z"
                  />
                </clipPath>
                <clipPath id="clippath-28">
                  <path
                    className="cls-14"
                    d="M596.7 808.35L529.99 813.3 529.63 729.03 564.22 726.21 596.7 808.35z"
                  />
                </clipPath>
                <clipPath id="clippath-29">
                  <path
                    className="cls-14"
                    d="M459.76 808.35L404.35 797.06 461.51 720.92 490.1 726.56 459.76 808.35z"
                  />
                </clipPath>
                <clipPath id="clippath-30">
                  <path
                    className="cls-14"
                    d="M396.23 796.35L331.29 772.35 426.07 708.37 453.3 718.76 396.23 796.35z"
                  />
                </clipPath>
                <clipPath id="clippath-31">
                  <path
                    className="cls-14"
                    d="M329.4 773.77L281.4 739.41 390.22 688.09 425.16 708.21 329.4 773.77z"
                  />
                </clipPath>
                <clipPath id="clippath-32">
                  <path
                    className="cls-14"
                    d="M272.35 733.53L236.75 699.04 365.51 665.15 386.34 683.5 272.35 733.53z"
                  />
                </clipPath>
                <clipPath id="clippath-33">
                  <path
                    className="cls-14"
                    d="M227.17 702.83L210.93 660.83 346.68 645.02 365.16 664.09 227.17 702.83z"
                  />
                </clipPath>
                <clipPath id="clippath-34">
                  <path
                    className="cls-14"
                    d="M525.05 814.71L458.7 809.77 490.1 726.56 525.39 728.68 525.05 814.71z"
                  />
                </clipPath>
              </defs>
              <g
              >
                <g id="Capa_1" data-name="Capa 1">
                  <path
                    d="M551 291.41l-.47-12.24 12.71-80 44.24 4.71 41.88 9.88L683.24 226l32.94 16.47 32 20.71 24 22.12 28.71 29.65 16.94 21.65 16.94 24.94 14.59 28.71 9.88 31.06 9.88 34.35 4.71 34.82.47 37.65s-3.29 35.29-4.24 38.12l-10.82 40.47-13.65 35.29-25.41 40-39.06 40-48.47 33.88-64 29.65-65.88 17.41-72.47 7.06-67.76-5.65-72.94-15.06-52.24-22.12-60.71-36.71-32-29.18-34.82-48.47-17.88-44.24s-12.71-43.29-14.59-68.24l-.47-23.06s.47-88.47 56.94-180.24c0 0 40-51.76 67.29-69.65l28.71-21.18 34.35-17.41 28.71-9.88 88-19.76 4.24 23.53 2.35-3.76 10.35 62.12v10.82s-93.65 5.18-143.53 83.76c0 0-44.71 47.53-43.29 152 0 0 2.35 60.24 38.59 115.76 0 0 35.76 60.24 110.59 77.18 0 0 74.82 20.24 148.24-6.12 0 0 84.24-24.94 115.29-109.65 0 0 32.94-70.59 11.76-145.88 0 0-25.88-129.41-158.12-161.41l-26.35-6.12z"
                    fill="#6e7070"
                  />
                  <path className="none" id="mapas1"
                    d="M217.94 527.06l36.94 2.82s-4.47-41.65 7.88-85.76c0 0 6.71-22.94 15.53-43.41l-42.71-28.24s-41.06 67.06-40.36 145.76l10.36 6.71 12.35 2.12z"
                    fill="#008d36"
                  />
                  <path
                    className="none" id="mapas2"
                    d="M550.41 292.71s-.71-7.41-.71-9.88l14.12-81.88 43.41 5.65 38.12 8.47 37.06 13.41L717 244.72l27.88 19.06-85.41 71.65s-34.94-34.59-109.06-42.71zM480.29 201.41l16.47 79.29.24 12.47s-38.35 4.94-71.06 20.24c0 0-23.53 11.29-38.35 25.18l-83.53-72 6.05-9.53 16.94-13.76 31.06-14.47 40.94-16.24 41.95-5.06 39.29-6.12z"
                  />
                  <path 
                    className="none" id="mapas3"
                    d="M659.47 335.41l85.41-71.65s35.65 29.88 38.47 34.12c0 0 27.76 32 31.06 36.71 0 0 26.82 39.53 33.41 56l12.24 37.65 9.88 30.59 2.82 34.82 1.41 37.65-4.24 36.71-10.82 40-15.06 38.12s-24.94 39.06-31.06 44.71l-120.94-29.18 15.53-22.12 16.47-33.41s13.18-33.88 16.94-69.18c0 0 7.53-70.12-21.18-122.35 0 0-21.18-44.71-60.24-75.29l-.12-3.88z"
                  />
                  <path className="none" id="mapas4"
                    d="M385.94 340l-85.88-71.06s-19.06 11.53-56.94 57.41c0 0-21.41 27.29-30.59 41.65l67.53 28.71 1.43.68c-13.11 23.03-20.31 55.21-20.31 55.21l51.71 17.12c2.35-13.8 13.76-45.29 16.27-52.13 3.83-8.41 20.8-42.81 56.79-77.58z"
                    fill="#e30613"
                  />
                  <path
                    className="none" id="mapas5"
                    d="M176.76 520.71l78.12 9.18s-3.06-50.41 6.36-79.59l50.82 17.7s-10.59 63.54 10.59 122.83c0 0 10.12 30.12 23.29 50.59l-136.42 16.24s-25.53-43.76-35.65-97.41c0 0-11.65-46.94 2.89-39.53z"
                    fill="#ece65a"
                  />
                  <path
                    className="none" id="mapas6"
                    d="M211.59 657.41l134.59-16L365 669.65s39.06 39.06 85.18 49.88c0 0 34.35 8.47 41.88 9.88l36.24 1.41 43.29-3.29 37.65-10.35L637 705.42l31.06-19.29 24-24.47L813 690.84l-32.94 34.82s-26.82 19.76-49.41 32.94l-64.94 29.18s-52.24 14.12-65.88 17.41l-71.53 6.59-67.76-4.71-63.53-12.71-60.24-24-59.29-36.24-34.35-32.94s-18.82-20.24-31.53-43.76z"
                    fill="#4860c8"
                  />
                  <g className="cls-49">
                    <g clipPath="url(#clippath)">
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 310.193 247.566)"
                        d="M282.25 247.21H338.13V247.92000000000002H282.25z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 311.159 248.641)"
                        d="M283.21 248.29H339.09V249H283.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 313.06 250.795)"
                        d="M285.12 250.44H341V251.15H285.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 314.007 251.878)"
                        d="M286.07 251.52H341.95V252.23000000000002H286.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 314.973 252.954)"
                        d="M287.02 252.6H342.9V253.31H287.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 315.92 254.037)"
                        d="M287.98 253.68H343.86V254.39000000000001H287.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 312.107 249.725)"
                        d="M284.16 249.36H340.04V250.07000000000002H284.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 317.821 256.19)"
                        d="M289.88 255.83H345.76V256.54H289.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 318.787 257.266)"
                        d="M290.84 256.91H346.71999999999997V257.62H290.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 316.874 255.107)"
                        d="M288.93 254.75H344.81V255.46H288.93z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 319.74 258.336)"
                        d="M291.79 257.99H347.67V258.7H291.79z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 320.688 259.42)"
                        d="M292.75 259.07H348.63V259.78H292.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 322.601 261.579)"
                        d="M294.65 261.22H350.53V261.93H294.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 323.554 262.649)"
                        d="M295.61 262.3H351.49V263.01H295.61z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 324.502 263.732)"
                        d="M296.56 263.38H352.44V264.09H296.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 325.455 264.803)"
                        d="M297.51 264.46H353.39V265.16999999999996H297.51z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 321.64 260.49)"
                        d="M293.7 260.14H349.58V260.84999999999997H293.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 327.368 266.961)"
                        d="M299.42 266.61H355.3V267.32H299.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 328.316 268.045)"
                        d="M300.38 267.69H356.26V268.4H300.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 326.416 265.891)"
                        d="M298.47 265.53H354.35V266.23999999999995H298.47z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 329.282 269.12)"
                        d="M301.33 268.77H357.21V269.47999999999996H301.33z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 330.23 270.204)"
                        d="M302.28 269.85H358.15999999999997V270.56H302.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 332.13 272.357)"
                        d="M304.19 272H360.07V272.71H304.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 333.096 273.433)"
                        d="M305.14 273.08H361.02V273.78999999999996H305.14z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 334.044 274.516)"
                        d="M306.1 274.16H361.98V274.87H306.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 334.997 275.586)"
                        d="M307.05 275.24H362.93V275.95H307.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 331.183 271.274)"
                        d="M303.24 270.92H359.12V271.63H303.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 336.91 277.745)"
                        d="M308.96 277.39H364.84V278.09999999999997H308.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 337.858 278.829)"
                        d="M309.91 278.47H365.79V279.18H309.91z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 335.945 276.67)"
                        d="M308.01 276.31H363.89V277.02H308.01z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 338.811 279.899)"
                        d="M310.87 279.55H366.75V280.26H310.87z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 339.759 280.982)"
                        d="M311.82 280.63H367.7V281.34H311.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 341.673 283.141)"
                        d="M313.73 282.78H369.61V283.48999999999995H313.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 342.625 284.211)"
                        d="M314.68 283.86H370.56V284.57H314.68z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 343.586 285.3)"
                        d="M315.64 284.94H371.52V285.65H315.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 344.539 286.37)"
                        d="M316.59 286.02H372.46999999999997V286.72999999999996H316.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 340.725 282.058)"
                        d="M312.78 281.7H368.65999999999997V282.40999999999997H312.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 346.44 288.524)"
                        d="M318.5 288.17H374.38V288.88H318.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 347.4 289.612)"
                        d="M319.45 289.25H375.33V289.96H319.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 345.487 287.454)"
                        d="M317.54 287.09H373.42V287.79999999999995H317.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 348.353 290.683)"
                        d="M320.41 290.33H376.29V291.03999999999996H320.41z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 349.301 291.766)"
                        d="M321.36 291.41H377.24V292.12H321.36z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 350.254 292.836)"
                        d="M322.31 292.48H378.19V293.19H322.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 352.167 294.995)"
                        d="M324.22 294.64H380.1V295.34999999999997H324.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 353.115 296.078)"
                        d="M325.17 295.72H381.05V296.43H325.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 354.068 297.149)"
                        d="M326.13 296.8H382.01V297.51H326.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 355.029 298.237)"
                        d="M327.08 297.87H382.96V298.58H327.08z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 351.215 293.925)"
                        d="M323.27 293.56H379.15V294.27H323.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 356.93 300.391)"
                        d="M328.99 300.03H384.87V300.73999999999995H328.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 357.882 301.461)"
                        d="M329.94 301.11H385.82V301.82H329.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 355.982 299.308)"
                        d="M328.04 298.95H383.92V299.65999999999997H328.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 359.796 303.62)"
                        d="M331.85 303.26H387.73V303.96999999999997H331.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 360.749 304.69)"
                        d="M332.8 304.34H388.68V305.04999999999995H332.8z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 361.71 305.779)"
                        d="M333.76 305.42H389.64V306.13H333.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 362.662 306.849)"
                        d="M334.71 306.5H390.59V307.21H334.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 358.843 302.55)"
                        d="M330.9 302.19H386.78V302.9H330.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 364.563 309.003)"
                        d="M336.62 308.65H392.5V309.35999999999996H336.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 365.524 310.091)"
                        d="M337.57 309.73H393.45V310.44H337.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 363.61 307.932)"
                        d="M335.67 307.58H391.55V308.28999999999996H335.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 367.424 312.245)"
                        d="M339.48 311.89H395.36V312.59999999999997H339.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 368.377 313.315)"
                        d="M340.43 312.97H396.31V313.68H340.43z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 369.338 314.404)"
                        d="M341.39 314.05H397.27V314.76H341.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 370.29 315.474)"
                        d="M342.34 315.12H398.21999999999997V315.83H342.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 366.477 311.161)"
                        d="M338.53 310.81H394.40999999999997V311.52H338.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 372.191 317.628)"
                        d="M344.25 317.28H400.13V317.98999999999995H344.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 373.152 318.716)"
                        d="M345.2 318.36H401.08V319.07H345.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 371.238 316.557)"
                        d="M343.3 316.2H399.18V316.90999999999997H343.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 375.095 320.916)"
                        d="M347.15 320.55H403.03V321.26H347.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 376.048 321.987)"
                        d="M348.1 321.63H403.98V322.34H348.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 374.135 319.828)"
                        d="M346.19 319.48H402.07V320.19H346.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 376.996 323.07)"
                        d="M349.05 322.71H404.93V323.41999999999996H349.05z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-41.5 377.949 324.14)"
                        d="M350.01 323.79H405.89V324.5H350.01z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-41.5 378.91 325.229)"
                        d="M350.96 324.87H406.84V325.58H350.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 380.81 327.383)"
                        d="M352.87 327.02H408.75V327.72999999999996H352.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 381.763 328.453)"
                        d="M353.82 328.1H409.7V328.81H353.82z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 382.729 329.528)"
                        d="M354.78 329.18H410.65999999999997V329.89H354.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 383.677 330.612)"
                        d="M355.73 330.26H411.61V330.96999999999997H355.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 379.862 326.3)"
                        d="M351.92 325.94H407.8V326.65H351.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 385.59 332.77)"
                        d="M357.64 332.41H413.52V333.12H357.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 386.543 333.84)"
                        d="M358.59 333.49H414.46999999999997V334.2H358.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 384.63 331.682)"
                        d="M356.68 331.33H412.56V332.03999999999996H356.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 388.444 335.994)"
                        d="M360.5 335.65H416.38V336.35999999999996H360.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 389.405 337.083)"
                        d="M361.45 336.72H417.33V337.43H361.45z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 390.357 338.153)"
                        d="M362.41 337.8H418.29V338.51H362.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 391.305 339.237)"
                        d="M363.36 338.88H419.24V339.59H363.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 387.49 334.924)"
                        d="M359.55 334.57H415.43V335.28H359.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 393.219 341.395)"
                        d="M365.27 341.04H421.15V341.75H365.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 394.172 342.466)"
                        d="M366.22 342.11H422.1V342.82H366.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 392.258 340.307)"
                        d="M364.31 339.96H420.19V340.66999999999996H364.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 396.072 344.62)"
                        d="M368.13 344.27H424.01V344.97999999999996H368.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 397.033 345.708)"
                        d="M369.08 345.35H424.96V346.06H369.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-41.5 397.986 346.778)"
                        d="M370.04 346.43H425.92V347.14H370.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 398.934 347.861)"
                        d="M370.99 347.5H426.87V348.21H370.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 395.12 343.549)"
                        d="M367.18 343.19H423.06V343.9H367.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 400.847 350.02)"
                        d="M372.9 349.66H428.78V350.37H372.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-41.5 401.8 351.09)"
                        d="M373.85 350.74H429.73V351.45H373.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-41.5 399.886 348.932)"
                        d="M371.95 348.58H427.83V349.28999999999996H371.95z"
                      />
                    </g>
                    <g clipPath="url(#clippath-1)">
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 341.425 229.695)"
                        d="M313.47 229.33H369.35V230.04000000000002H313.47z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 342.249 230.876)"
                        d="M314.3 230.51H370.18V231.22H314.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 343.902 233.224)"
                        d="M315.95 232.86H371.83V233.57000000000002H315.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 344.732 234.39)"
                        d="M316.78 234.04H372.65999999999997V234.75H316.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 345.556 235.571)"
                        d="M317.61 235.22H373.49V235.93H317.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 346.396 236.758)"
                        d="M318.44 236.4H374.32V237.11H318.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 343.078 232.042)"
                        d="M315.13 231.69H371.01V232.4H315.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 348.05 239.106)"
                        d="M320.1 238.75H375.98V239.46H320.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 348.873 240.287)"
                        d="M320.93 239.93H376.81V240.64000000000001H320.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 347.225 237.924)"
                        d="M319.27 237.57H375.15V238.28H319.27z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 349.703 241.453)"
                        d="M321.76 241.1H377.64V241.81H321.76z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 350.527 242.635)"
                        d="M322.58 242.28H378.46V242.99H322.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 352.196 244.987)"
                        d="M324.24 244.63H380.12V245.34H324.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 353.02 246.169)"
                        d="M325.07 245.81H380.95V246.52H325.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 353.845 247.35)"
                        d="M325.9 246.99H381.78V247.70000000000002H325.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 354.674 248.516)"
                        d="M326.73 248.16H382.61V248.87H326.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 351.367 243.821)"
                        d="M323.41 243.46H379.29V244.17000000000002H323.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 356.343 250.869)"
                        d="M328.39 250.52H384.27V251.23000000000002H328.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 357.167 252.05)"
                        d="M329.21 251.7H385.09V252.41H329.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 355.514 249.703)"
                        d="M327.56 249.34H383.44V250.05H327.56z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 357.991 253.232)"
                        d="M330.04 252.87H385.92V253.58H330.04z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 358.82 254.398)"
                        d="M330.87 254.05H386.75V254.76000000000002H330.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 360.485 256.766)"
                        d="M332.53 256.4H388.40999999999997V257.10999999999996H332.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 361.314 257.932)"
                        d="M333.36 257.58H389.24V258.28999999999996H333.36z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 362.138 259.114)"
                        d="M334.19 258.76H390.07V259.46999999999997H334.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 362.963 260.296)"
                        d="M335.02 259.93H390.9V260.64H335.02z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 359.645 255.58)"
                        d="M331.7 255.23H387.58V255.94H331.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 364.616 262.643)"
                        d="M336.67 262.29H392.55V263H336.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 365.456 263.83)"
                        d="M337.5 263.46H393.38V264.16999999999996H337.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 363.792 261.461)"
                        d="M335.84 261.11H391.71999999999997V261.82H335.84z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 366.285 264.996)"
                        d="M338.33 264.64H394.21V265.34999999999997H338.33z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 367.11 266.177)"
                        d="M339.16 265.82H395.04V266.53H339.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 368.763 268.525)"
                        d="M340.82 268.17H396.7V268.88H340.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 369.587 269.706)"
                        d="M341.64 269.35H397.52V270.06H341.64z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 370.432 270.877)"
                        d="M342.47 270.53H398.35V271.23999999999995H342.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 371.256 272.059)"
                        d="M343.3 271.7H399.18V272.40999999999997H343.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 367.934 267.359)"
                        d="M339.99 266.99H395.87V267.7H339.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 372.91 274.406)"
                        d="M344.96 274.06H400.84V274.77H344.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 373.734 275.588)"
                        d="M345.79 275.23H401.67V275.94H345.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 372.08 273.24)"
                        d="M344.13 272.88H400.01V273.59H344.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 374.574 276.775)"
                        d="M346.62 276.41H402.5V277.12H346.62z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 375.403 277.94)"
                        d="M347.45 277.59H403.33V278.29999999999995H347.45z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 376.228 279.122)"
                        d="M348.27 278.76H404.15V279.46999999999997H348.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 377.881 281.47)"
                        d="M349.93 281.12H405.81V281.83H349.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 378.705 282.651)"
                        d="M350.76 282.29H406.64V283H350.76z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 379.545 283.838)"
                        d="M351.59 283.47H407.46999999999997V284.18H351.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 380.375 285.004)"
                        d="M352.42 284.65H408.3V285.35999999999996H352.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 377.052 280.304)"
                        d="M349.1 279.94H404.98V280.65H349.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 382.023 287.367)"
                        d="M354.08 287H409.96V287.71H354.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 382.852 288.533)"
                        d="M354.9 288.18H410.78V288.89H354.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 381.199 286.186)"
                        d="M353.25 285.83H409.13V286.53999999999996H353.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 384.521 290.886)"
                        d="M356.56 290.53H412.44V291.23999999999995H356.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 385.346 292.067)"
                        d="M357.39 291.71H413.27V292.41999999999996H357.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 386.17 293.249)"
                        d="M358.22 292.89H414.1V293.59999999999997H358.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 387 294.415)"
                        d="M359.05 294.06H414.93V294.77H359.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 383.676 289.715)"
                        d="M355.73 289.36H411.61V290.07H355.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 388.648 296.778)"
                        d="M360.71 296.42H416.59V297.13H360.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 389.493 297.949)"
                        d="M361.53 297.59H417.40999999999997V298.29999999999995H361.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 387.823 295.596)"
                        d="M359.88 295.24H415.76V295.95H359.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 391.141 300.312)"
                        d="M363.19 299.95H419.07V300.65999999999997H363.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 391.97 301.478)"
                        d="M364.02 301.13H419.9V301.84H364.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 392.795 302.66)"
                        d="M364.85 302.3H420.73V303.01H364.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 393.635 303.846)"
                        d="M365.68 303.48H421.56V304.19H365.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 390.317 299.13)"
                        d="M362.36 298.77H418.24V299.47999999999996H362.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 395.288 306.194)"
                        d="M367.33 305.83H423.21V306.53999999999996H367.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 396.117 307.36)"
                        d="M368.16 307.01H424.04V307.71999999999997H368.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 394.464 305.012)"
                        d="M366.51 304.66H422.39V305.37H366.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 397.803 309.77)"
                        d="M369.85 309.41H425.73V310.12H369.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 398.632 310.936)"
                        d="M370.68 310.58H426.56V311.28999999999996H370.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 396.979 308.588)"
                        d="M369.02 308.23H424.9V308.94H369.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 399.456 312.117)"
                        d="M371.51 311.76H427.39V312.46999999999997H371.51z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-35.15 400.28 313.299)"
                        d="M372.34 312.94H428.21999999999997V313.65H372.34z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-35.15 401.126 314.47)"
                        d="M373.17 314.11H429.05V314.82H373.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 402.774 316.833)"
                        d="M374.82 316.47H430.7V317.18H374.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 403.603 317.999)"
                        d="M375.65 317.65H431.53V318.35999999999996H375.65z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 404.428 319.18)"
                        d="M376.48 318.82H432.36V319.53H376.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 405.268 320.367)"
                        d="M377.31 320H433.19V320.71H377.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 401.95 315.651)"
                        d="M374 315.29H429.88V316H374z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 406.921 322.715)"
                        d="M378.97 322.35H434.85V323.06H378.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 407.75 323.88)"
                        d="M379.8 323.53H435.68V324.23999999999995H379.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 406.097 321.533)"
                        d="M378.14 321.18H434.02V321.89H378.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 409.399 326.244)"
                        d="M381.45 325.88H437.33V326.59H381.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 410.244 327.415)"
                        d="M382.28 327.06H438.15999999999997V327.77H382.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 411.068 328.596)"
                        d="M383.11 328.24H438.99V328.95H383.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 411.892 329.778)"
                        d="M383.94 329.41H439.82V330.12H383.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 408.575 325.062)"
                        d="M380.62 324.71H436.5V325.41999999999996H380.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 413.546 332.126)"
                        d="M385.6 331.77H441.48V332.47999999999996H385.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 414.37 333.307)"
                        d="M386.43 332.95H442.31V333.65999999999997H386.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 412.721 330.944)"
                        d="M384.77 330.59H440.65V331.29999999999995H384.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 416.04 335.66)"
                        d="M388.08 335.3H443.96V336.01H388.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 416.863 336.841)"
                        d="M388.91 336.48H444.79V337.19H388.91z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-35.15 417.693 338.007)"
                        d="M389.74 337.65H445.62V338.35999999999996H389.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 418.517 339.189)"
                        d="M390.57 338.83H446.45V339.53999999999996H390.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 415.215 334.478)"
                        d="M387.25 334.12H443.13V334.83H387.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 420.186 341.541)"
                        d="M392.23 341.18H448.11V341.89H392.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-35.15 421.01 342.723)"
                        d="M393.06 342.36H448.94V343.07H393.06z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-35.15 419.341 340.37)"
                        d="M391.4 340.01H447.28V340.71999999999997H391.4z"
                      />
                    </g>
                    <g clipPath="url(#clippath-2)">
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 380.46 213.825)"
                        d="M352.61 213.49H408.49V214.20000000000002H352.61z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 381.112 215.109)"
                        d="M353.24 214.78H409.12V215.49H353.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 382.368 217.688)"
                        d="M354.51 217.37H410.39V218.08H354.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 383.015 218.993)"
                        d="M355.15 218.66H411.03V219.37H355.15z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 383.646 220.272)"
                        d="M355.78 219.95H411.65999999999997V220.66H355.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 384.271 221.573)"
                        d="M356.42 221.24H412.3V221.95000000000002H356.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 381.737 216.409)"
                        d="M353.88 216.08H409.76V216.79000000000002H353.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 385.549 224.157)"
                        d="M357.69 223.82H413.57V224.53H357.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 386.18 225.436)"
                        d="M358.33 225.12H414.21V225.83H358.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 384.923 222.856)"
                        d="M357.05 222.53H412.93V223.24H357.05z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 386.827 226.741)"
                        d="M358.96 226.41H414.84V227.12H358.96z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 387.457 228.02)"
                        d="M359.6 227.7H415.48V228.41H359.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 388.735 230.604)"
                        d="M360.87 230.28H416.75V230.99H360.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 389.36 231.905)"
                        d="M361.5 231.57H417.38V232.28H361.5z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 390.012 233.188)"
                        d="M362.14 232.86H418.02V233.57000000000002H362.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 390.638 234.489)"
                        d="M362.78 234.16H418.65999999999997V234.87H362.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 388.083 229.32)"
                        d="M360.23 228.99H416.11V229.70000000000002H360.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 391.916 237.073)"
                        d="M364.05 236.74H419.93V237.45000000000002H364.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 392.546 238.352)"
                        d="M364.68 238.03H420.56V238.74H364.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 391.269 235.768)"
                        d="M363.41 235.45H419.29V236.16H363.41z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 393.172 239.652)"
                        d="M365.32 239.32H421.2V240.03H365.32z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 393.824 240.936)"
                        d="M365.95 240.61H421.83V241.32000000000002H365.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 395.08 243.515)"
                        d="M367.22 243.2H423.1V243.91H367.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 395.727 244.82)"
                        d="M367.86 244.49H423.74V245.20000000000002H367.86z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 396.358 246.1)"
                        d="M368.5 245.78H424.38V246.49H368.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 396.983 247.4)"
                        d="M369.13 247.07H425.01V247.78H369.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 394.45 242.237)"
                        d="M366.59 241.9H422.46999999999997V242.61H366.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 398.261 249.984)"
                        d="M370.4 249.65H426.28V250.36H370.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 398.892 251.263)"
                        d="M371.04 250.94H426.92V251.65H371.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 397.635 248.684)"
                        d="M369.77 248.36H425.65V249.07000000000002H369.77z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 399.539 252.569)"
                        d="M371.67 252.24H427.55V252.95000000000002H371.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 400.17 253.847)"
                        d="M372.31 253.53H428.19V254.24H372.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 401.447 256.432)"
                        d="M373.58 256.11H429.46V256.82H373.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 402.073 257.732)"
                        d="M374.22 257.4H430.1V258.10999999999996H374.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 402.703 259.01)"
                        d="M374.85 258.69H430.73V259.4H374.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 403.35 260.316)"
                        d="M375.49 259.99H431.37V260.7H375.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 400.795 255.148)"
                        d="M372.94 254.82H428.82V255.53H372.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 404.606 262.896)"
                        d="M376.76 262.57H432.64V263.28H376.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 405.258 264.18)"
                        d="M377.39 263.86H433.27V264.57H377.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 403.98 261.595)"
                        d="M376.12 261.28H432V261.98999999999995H376.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 405.884 265.48)"
                        d="M378.03 265.15H433.90999999999997V265.85999999999996H378.03z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 406.515 266.759)"
                        d="M378.67 266.44H434.55V267.15H378.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 407.162 268.064)"
                        d="M379.3 267.73H435.18V268.44H379.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 408.418 270.643)"
                        d="M380.57 270.32H436.45V271.03H380.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 409.07 271.927)"
                        d="M381.21 271.61H437.09V272.32H381.21z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 409.695 273.228)"
                        d="M381.84 272.9H437.71999999999997V273.60999999999996H381.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 410.326 274.506)"
                        d="M382.48 274.19H438.36V274.9H382.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 407.792 269.343)"
                        d="M379.94 269.03H435.82V269.73999999999995H379.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 411.604 277.09)"
                        d="M383.75 276.77H439.63V277.47999999999996H383.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 412.23 278.391)"
                        d="M384.39 278.07H440.27V278.78H384.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 410.973 275.812)"
                        d="M383.11 275.48H438.99V276.19H383.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 413.507 280.975)"
                        d="M385.66 280.65H441.54V281.35999999999996H385.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 414.159 282.26)"
                        d="M386.29 281.94H442.17V282.65H386.29z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 414.785 283.56)"
                        d="M386.93 283.23H442.81V283.94H386.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 415.415 284.838)"
                        d="M387.56 284.52H443.44V285.22999999999996H387.56z"
                      />
                      <path
                        className="cls-1"
                        d="M430.42 263.45L380.28 288.13 387.74 291.73 437.87 267.06 430.42 263.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 416.693 287.423)"
                        d="M388.84 287.11H444.71999999999997V287.82H388.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 417.318 288.723)"
                        d="M389.47 288.4H445.35V289.10999999999996H389.47z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 416.062 286.144)"
                        d="M388.2 285.81H444.08V286.52H388.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 418.596 291.307)"
                        d="M390.74 290.98H446.62V291.69H390.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 419.227 292.586)"
                        d="M391.38 292.27H447.26V292.97999999999996H391.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 419.874 293.892)"
                        d="M392.01 293.56H447.89V294.27H392.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 420.504 295.17)"
                        d="M392.65 294.85H448.53V295.56H392.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 417.97 290.007)"
                        d="M390.11 289.69H445.99V290.4H390.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 421.782 297.755)"
                        d="M393.92 297.44H449.8V298.15H393.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 422.408 299.055)"
                        d="M394.56 298.73H450.44V299.44H394.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 421.13 296.47)"
                        d="M393.28 296.15H449.15999999999997V296.85999999999996H393.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 423.702 301.666)"
                        d="M395.85 301.36H451.73V302.07H395.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 424.349 302.971)"
                        d="M396.49 302.65H452.37V303.35999999999996H396.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 423.071 300.387)"
                        d="M395.22 300.07H451.1V300.78H395.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 424.98 304.25)"
                        d="M397.12 303.94H453V304.65H397.12z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-26.21 425.605 305.55)"
                        d="M397.76 305.23H453.64V305.94H397.76z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-26.21 426.257 306.834)"
                        d="M398.39 306.53H454.27V307.23999999999995H398.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 427.513 309.414)"
                        d="M399.66 309.11H455.54V309.82H399.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 428.16 310.719)"
                        d="M400.3 310.4H456.18V311.10999999999996H400.3z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 428.79 311.998)"
                        d="M400.94 311.69H456.82V312.4H400.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 429.416 313.298)"
                        d="M401.57 312.98H457.45V313.69H401.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 426.883 308.135)"
                        d="M399.03 307.82H454.90999999999997V308.53H399.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 430.694 315.882)"
                        d="M402.84 315.57H458.71999999999997V316.28H402.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 431.325 317.161)"
                        d="M403.48 316.86H459.36V317.57H403.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 430.068 314.582)"
                        d="M402.21 314.27H458.09V314.97999999999996H402.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 432.602 319.746)"
                        d="M404.75 319.44H460.63V320.15H404.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 433.228 321.046)"
                        d="M405.39 320.73H461.27V321.44H405.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 433.88 322.33)"
                        d="M406.02 322.02H461.9V322.72999999999996H406.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 434.506 323.63)"
                        d="M406.66 323.31H462.54V324.02H406.66z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 431.972 318.467)"
                        d="M404.11 318.15H459.99V318.85999999999996H404.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 435.783 326.214)"
                        d="M407.93 325.9H463.81V326.60999999999996H407.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 436.414 327.493)"
                        d="M408.56 327.19H464.44V327.9H408.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 435.136 324.91)"
                        d="M407.29 324.61H463.17V325.32H407.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 437.691 330.078)"
                        d="M409.83 329.77H465.71V330.47999999999996H409.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 438.317 331.378)"
                        d="M410.47 331.06H466.35V331.77H410.47z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-26.21 438.948 332.657)"
                        d="M411.11 332.35H466.99V333.06H411.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 439.595 333.962)"
                        d="M411.74 333.65H467.62V334.35999999999996H411.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 437.04 328.794)"
                        d="M409.2 328.48H465.08V329.19H409.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 440.85 336.541)"
                        d="M413.01 336.23H468.89V336.94H413.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-26.21 441.503 337.825)"
                        d="M413.65 337.52H469.53V338.22999999999996H413.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-26.21 440.225 335.241)"
                        d="M412.38 334.94H468.26V335.65H412.38z"
                      />
                    </g>
                    <g clipPath="url(#clippath-3)">
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 420.072 202.635)"
                        d="M392.13 202.28H448.01V202.99H392.13z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 420.494 204.017)"
                        d="M392.54 203.66H448.42V204.37H392.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 421.339 206.781)"
                        d="M393.37 206.42H449.25V207.13H393.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 421.727 208.158)"
                        d="M393.78 207.8H449.65999999999997V208.51000000000002H393.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 422.149 209.54)"
                        d="M394.2 209.17H450.08V209.88H394.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 422.57 210.923)"
                        d="M394.61 210.55H450.49V211.26000000000002H394.61z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 420.916 205.4)"
                        d="M392.96 205.04H448.84V205.75H392.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 423.38 213.682)"
                        d="M395.44 213.31H451.32V214.02H395.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 423.808 215.03)"
                        d="M395.86 214.69H451.74V215.4H395.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 422.993 212.305)"
                        d="M395.03 211.93H450.90999999999997V212.64000000000001H395.03z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 424.23 216.412)"
                        d="M396.27 216.07H452.15V216.78H396.27z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 424.652 217.794)"
                        d="M396.69 217.44H452.57V218.15H396.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 425.462 220.554)"
                        d="M397.51 220.2H453.39V220.91H397.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 425.884 221.936)"
                        d="M397.93 221.58H453.81V222.29000000000002H397.93z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 426.306 223.318)"
                        d="M398.34 222.96H454.21999999999997V223.67000000000002H398.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 426.728 224.7)"
                        d="M398.76 224.34H454.64V225.05H398.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 425.074 219.176)"
                        d="M397.1 218.82H452.98V219.53H397.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 427.538 227.46)"
                        d="M399.59 227.09H455.46999999999997V227.8H399.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 427.96 228.841)"
                        d="M400 228.47H455.88V229.18H400z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 427.116 226.077)"
                        d="M399.17 225.72H455.05V226.43H399.17z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 428.383 230.224)"
                        d="M400.41 229.85H456.29V230.56H400.41z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 428.77 231.6)"
                        d="M400.83 231.23H456.71V231.94H400.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 429.62 234.331)"
                        d="M401.66 233.99H457.54V234.70000000000002H401.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 430.042 235.713)"
                        d="M402.07 235.36H457.95V236.07000000000002H402.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 430.43 237.09)"
                        d="M402.49 236.74H458.37V237.45000000000002H402.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 430.852 238.472)"
                        d="M402.9 238.12H458.78V238.83H402.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 429.193 232.983)"
                        d="M401.24 232.61H457.12V233.32000000000002H401.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 431.696 241.237)"
                        d="M403.73 240.88H459.61V241.59H403.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 432.118 242.619)"
                        d="M404.14 242.26H460.02V242.97H404.14z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 431.274 239.855)"
                        d="M403.31 239.5H459.19V240.21H403.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 432.506 243.996)"
                        d="M404.56 243.64H460.44V244.35H404.56z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 432.928 245.378)"
                        d="M404.97 245.01H460.85V245.72H404.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 433.772 248.142)"
                        d="M405.8 247.77H461.68V248.48000000000002H405.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 434.16 249.52)"
                        d="M406.22 249.15H462.1V249.86H406.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 434.583 250.902)"
                        d="M406.63 250.53H462.51V251.24H406.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 435.005 252.284)"
                        d="M407.04 251.91H462.92V252.62H407.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 433.35 246.76)"
                        d="M405.39 246.39H461.27V247.1H405.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 435.82 255.01)"
                        d="M407.87 254.66H463.75V255.37H407.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 436.242 256.391)"
                        d="M408.29 256.04H464.17V256.75H408.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 435.432 253.632)"
                        d="M407.46 253.28H463.34V253.99H407.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 436.664 257.773)"
                        d="M408.7 257.42H464.58V258.13H408.7z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 437.086 259.155)"
                        d="M409.12 258.8H465V259.51H409.12z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 437.474 260.533)"
                        d="M409.53 260.18H465.40999999999997V260.89H409.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 438.318 263.297)"
                        d="M410.36 262.93H466.24V263.64H410.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 438.74 264.68)"
                        d="M410.77 264.31H466.65V265.02H410.77z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 439.128 266.056)"
                        d="M411.19 265.69H467.07V266.4H411.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 439.55 267.438)"
                        d="M411.6 267.07H467.48V267.78H411.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 437.896 261.915)"
                        d="M409.94 261.56H465.82V262.27H409.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 440.394 270.203)"
                        d="M412.43 269.83H468.31V270.53999999999996H412.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 440.817 271.585)"
                        d="M412.85 271.2H468.73V271.90999999999997H412.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 439.972 268.82)"
                        d="M412.02 268.45H467.9V269.15999999999997H412.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 441.632 274.31)"
                        d="M413.67 273.96H469.55V274.66999999999996H413.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 442.054 275.692)"
                        d="M414.09 275.34H469.96999999999997V276.04999999999995H414.09z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 442.476 277.074)"
                        d="M414.5 276.72H470.38V277.43H414.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 442.864 278.451)"
                        d="M414.92 278.1H470.8V278.81H414.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 441.21 272.928)"
                        d="M413.26 272.58H469.14V273.28999999999996H413.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 443.708 281.216)"
                        d="M415.75 280.85H471.63V281.56H415.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 444.13 282.598)"
                        d="M416.16 282.23H472.04V282.94H416.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 443.286 279.834)"
                        d="M415.33 279.48H471.21V280.19H415.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 444.94 285.357)"
                        d="M416.99 284.99H472.87V285.7H416.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 445.362 286.74)"
                        d="M417.4 286.37H473.28V287.08H417.4z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 445.784 288.121)"
                        d="M417.82 287.75H473.7V288.46H417.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 446.172 289.499)"
                        d="M418.23 289.12H474.11V289.83H418.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 444.518 283.975)"
                        d="M416.57 283.61H472.45V284.32H416.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 447.022 292.229)"
                        d="M419.06 291.88H474.94V292.59H419.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 447.444 293.611)"
                        d="M419.48 293.26H475.36V293.96999999999997H419.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 446.594 290.88)"
                        d="M418.65 290.5H474.53V291.21H418.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 448.278 296.443)"
                        d="M420.32 296.07H476.2V296.78H420.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 448.7 297.825)"
                        d="M420.73 297.45H476.61V298.15999999999997H420.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 447.856 295.061)"
                        d="M419.9 294.69H475.78V295.4H419.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 449.093 299.169)"
                        d="M421.15 298.82H477.03V299.53H421.15z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-16.73 449.515 300.55)"
                        d="M421.56 300.2H477.44V300.90999999999997H421.56z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-16.73 449.937 301.933)"
                        d="M421.98 301.58H477.86V302.28999999999996H421.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 450.781 304.697)"
                        d="M422.81 304.34H478.69V305.04999999999995H422.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 451.17 306.074)"
                        d="M423.22 305.72H479.1V306.43H423.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 451.591 307.456)"
                        d="M423.63 307.1H479.51V307.81H423.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 452.013 308.838)"
                        d="M424.05 308.47H479.93V309.18H424.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 450.36 303.315)"
                        d="M422.39 302.96H478.27V303.66999999999996H422.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 452.823 311.598)"
                        d="M424.88 311.23H480.76V311.94H424.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 453.246 312.98)"
                        d="M425.29 312.61H481.17V313.32H425.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 452.435 310.22)"
                        d="M424.46 309.85H480.34V310.56H424.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 454.09 315.744)"
                        d="M426.12 315.37H482V316.08H426.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 454.478 317.121)"
                        d="M426.53 316.74H482.40999999999997V317.45H426.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 454.905 318.47)"
                        d="M426.95 318.12H482.83V318.83H426.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 455.327 319.852)"
                        d="M427.36 319.5H483.24V320.21H427.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 453.668 314.362)"
                        d="M425.71 313.99H481.59V314.7H425.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 456.137 322.61)"
                        d="M428.19 322.26H484.07V322.96999999999997H428.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 456.559 323.993)"
                        d="M428.61 323.64H484.49V324.34999999999997H428.61z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 455.749 321.234)"
                        d="M427.78 320.88H483.65999999999997V321.59H427.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 457.403 326.757)"
                        d="M429.44 326.39H485.32V327.09999999999997H429.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 457.825 328.14)"
                        d="M429.85 327.77H485.73V328.47999999999996H429.85z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-16.73 458.213 329.517)"
                        d="M430.26 329.15H486.14V329.85999999999996H430.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 458.635 330.899)"
                        d="M430.68 330.53H486.56V331.23999999999995H430.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 456.981 325.375)"
                        d="M429.02 325.02H484.9V325.72999999999996H429.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 459.48 333.663)"
                        d="M431.51 333.29H487.39V334H431.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-16.73 459.868 335.04)"
                        d="M431.92 334.66H487.8V335.37H431.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-16.73 459.057 332.28)"
                        d="M431.09 331.91H486.96999999999997V332.62H431.09z"
                      />
                    </g>
                    <g clipPath="url(#clippath-4)">
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 447.068 189.747)"
                        d="M419.35 189.48H475.23V190.19H419.35z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 447.331 191.167)"
                        d="M419.6 190.89H475.48V191.6H419.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 447.856 194.005)"
                        d="M420.12 193.73H476V194.44H420.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 448.119 195.424)"
                        d="M420.38 195.14H476.26V195.85H420.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 448.381 196.844)"
                        d="M420.63 196.56H476.51V197.27H420.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 448.644 198.263)"
                        d="M420.89 197.97H476.77V198.68H420.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 447.594 192.586)"
                        d="M419.86 192.31H475.74V193.02H419.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 449.114 201.096)"
                        d="M421.41 200.81H477.29V201.52H421.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 449.376 202.515)"
                        d="M421.67 202.22H477.55V202.93H421.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 448.907 199.682)"
                        d="M421.15 199.39H477.03V200.1H421.15z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 449.639 203.935)"
                        d="M421.92 203.64H477.8V204.35H421.92z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 449.902 205.354)"
                        d="M422.18 205.06H478.06V205.77H422.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 450.427 208.192)"
                        d="M422.7 207.89H478.58V208.6H422.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 450.694 209.556)"
                        d="M422.95 209.3H478.83V210.01000000000002H422.95z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 450.957 210.975)"
                        d="M423.21 210.72H479.09V211.43H423.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 451.22 212.395)"
                        d="M423.47 212.14H479.35V212.85H423.47z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 450.164 206.773)"
                        d="M422.44 206.47H478.32V207.18H422.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 451.69 215.228)"
                        d="M423.99 214.97H479.87V215.68H423.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 451.952 216.647)"
                        d="M424.24 216.38H480.12V217.09H424.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 451.482 213.814)"
                        d="M423.73 213.55H479.61V214.26000000000002H423.73z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 452.214 218.067)"
                        d="M424.5 217.8H480.38V218.51000000000002H424.5z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 452.477 219.486)"
                        d="M424.76 219.22H480.64V219.93H424.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 453.002 222.324)"
                        d="M425.27 222.05H481.15V222.76000000000002H425.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 453.265 223.743)"
                        d="M425.53 223.46H481.40999999999997V224.17000000000002H425.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 453.527 225.163)"
                        d="M425.79 224.88H481.67V225.59H425.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 453.79 226.582)"
                        d="M426.05 226.3H481.93V227.01000000000002H426.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 452.74 220.905)"
                        d="M425.02 220.63H480.9V221.34H425.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 454.315 229.42)"
                        d="M426.56 229.13H482.44V229.84H426.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 454.522 230.835)"
                        d="M426.82 230.55H482.7V231.26000000000002H426.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 454.052 228.001)"
                        d="M426.31 227.71H482.19V228.42000000000002H426.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 454.785 232.254)"
                        d="M427.08 231.96H482.96V232.67000000000002H427.08z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 455.052 233.618)"
                        d="M427.34 233.38H483.21999999999997V234.09H427.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 455.578 236.456)"
                        d="M427.85 236.21H483.73V236.92000000000002H427.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 455.84 237.875)"
                        d="M428.11 237.63H483.99V238.34H428.11z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 456.103 239.295)"
                        d="M428.37 239.04H484.25V239.75H428.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 456.365 240.714)"
                        d="M428.63 240.46H484.51V241.17000000000002H428.63z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 455.315 235.037)"
                        d="M427.59 234.79H483.46999999999997V235.5H427.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 456.89 243.552)"
                        d="M429.14 243.29H485.02V244H429.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 457.098 244.966)"
                        d="M429.4 244.71H485.28V245.42000000000002H429.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 456.628 242.133)"
                        d="M428.88 241.87H484.76V242.58H428.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 457.36 246.386)"
                        d="M429.66 246.12H485.54V246.83H429.66z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 457.623 247.805)"
                        d="M429.91 247.54H485.79V248.25H429.91z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 457.885 249.224)"
                        d="M430.17 248.96H486.05V249.67000000000002H430.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 458.41 252.063)"
                        d="M430.69 251.79H486.57V252.5H430.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 458.673 253.482)"
                        d="M430.94 253.2H486.82V253.91H430.94z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 458.936 254.901)"
                        d="M431.2 254.62H487.08V255.33H431.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 459.198 256.32)"
                        d="M431.46 256.04H487.34V256.75H431.46z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 458.148 250.643)"
                        d="M430.43 250.37H486.31V251.08H430.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 459.729 259.103)"
                        d="M431.98 258.87H487.86V259.58H431.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 459.936 260.518)"
                        d="M432.23 260.28H488.11V260.98999999999995H432.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 459.466 257.684)"
                        d="M431.72 257.45H487.6V258.15999999999997H431.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 460.461 263.356)"
                        d="M432.75 263.12H488.63V263.83H432.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 460.724 264.775)"
                        d="M433.01 264.53H488.89V265.23999999999995H433.01z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 460.986 266.194)"
                        d="M433.26 265.95H489.14V266.65999999999997H433.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 461.249 267.614)"
                        d="M433.52 267.36H489.4V268.07H433.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 460.198 261.937)"
                        d="M432.49 261.7H488.37V262.40999999999997H432.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 461.774 270.452)"
                        d="M434.04 270.2H489.92V270.90999999999997H434.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 462.036 271.871)"
                        d="M434.3 271.61H490.18V272.32H434.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 461.511 269.033)"
                        d="M433.78 268.78H489.65999999999997V269.48999999999995H433.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 462.506 274.705)"
                        d="M434.81 274.45H490.69V275.15999999999997H434.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 462.769 276.124)"
                        d="M435.07 275.86H490.95V276.57H435.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 463.031 277.543)"
                        d="M435.33 277.28H491.21V277.98999999999995H435.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 463.294 278.962)"
                        d="M435.58 278.69H491.46V279.4H435.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 462.299 273.29)"
                        d="M434.55 273.03H490.43V273.73999999999995H434.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 463.824 281.746)"
                        d="M436.1 281.53H491.98V282.23999999999995H436.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 464.087 283.165)"
                        d="M436.36 282.94H492.24V283.65H436.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 463.557 280.382)"
                        d="M435.84 280.11H491.71999999999997V280.82H435.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 464.607 286.059)"
                        d="M436.88 285.83H492.76V286.53999999999996H436.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 464.87 287.478)"
                        d="M437.14 287.24H493.02V287.95H437.14z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 464.344 284.64)"
                        d="M436.62 284.41H492.5V285.12H436.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 465.132 288.897)"
                        d="M437.4 288.66H493.28V289.37H437.4z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-10.32 465.395 290.316)"
                        d="M437.66 290.08H493.54V290.78999999999996H437.66z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-10.32 465.657 291.735)"
                        d="M437.91 291.49H493.79V292.2H437.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 466.127 294.569)"
                        d="M438.43 294.32H494.31V295.03H438.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 466.39 295.988)"
                        d="M438.69 295.74H494.57V296.45H438.69z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 466.652 297.407)"
                        d="M438.94 297.16H494.82V297.87H438.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 466.915 298.827)"
                        d="M439.2 298.57H495.08V299.28H439.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 465.864 293.15)"
                        d="M438.17 292.91H494.05V293.62H438.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 467.44 301.665)"
                        d="M439.72 301.4H495.6V302.10999999999996H439.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 467.703 303.084)"
                        d="M439.98 302.82H495.86V303.53H439.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 467.177 300.246)"
                        d="M439.46 299.99H495.34V300.7H439.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 468.233 305.867)"
                        d="M440.49 305.65H496.37V306.35999999999996H440.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 468.495 307.287)"
                        d="M440.75 307.07H496.63V307.78H440.75z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 468.703 308.7)"
                        d="M441.01 308.49H496.89V309.2H441.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 468.965 310.12)"
                        d="M441.26 309.9H497.14V310.60999999999996H441.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 467.97 304.448)"
                        d="M440.23 304.24H496.11V304.95H440.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 469.49 312.958)"
                        d="M441.78 312.73H497.65999999999997V313.44H441.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 469.753 314.378)"
                        d="M442.04 314.15H497.92V314.85999999999996H442.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 469.228 311.54)"
                        d="M441.52 311.32H497.4V312.03H441.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 470.278 317.216)"
                        d="M442.55 316.98H498.43V317.69H442.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 470.54 318.635)"
                        d="M442.81 318.4H498.69V319.10999999999996H442.81z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-10.32 470.803 320.055)"
                        d="M443.07 319.81H498.95V320.52H443.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 471.066 321.474)"
                        d="M443.33 321.23H499.21V321.94H443.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 470.015 315.797)"
                        d="M442.3 315.57H498.18V316.28H442.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 471.536 324.307)"
                        d="M443.84 324.06H499.71999999999997V324.77H443.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-10.32 471.798 325.727)"
                        d="M444.1 325.48H499.98V326.19H444.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-10.32 471.273 322.888)"
                        d="M443.58 322.65H499.46V323.35999999999996H443.58z"
                      />
                    </g>
                  </g>
                  <g className="cls-49">
                    <g clipPath="url(#clippath-5)">
                      <path
                        className="cls-81"
                        transform="rotate(9.77 581.395 188.858)"
                        d="M553.32 188.43H609.2V189.14000000000001H553.32z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 581.16 190.233)"
                        d="M553.07 189.84H608.95V190.55H553.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 580.697 193.102)"
                        d="M552.59 192.68H608.47V193.39000000000001H552.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 580.408 194.54)"
                        d="M552.34 194.1H608.22V194.81H552.34z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 580.172 195.916)"
                        d="M552.1 195.52H607.98V196.23000000000002H552.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 579.94 197.35)"
                        d="M551.85 196.94H607.73V197.65H551.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 580.928 191.667)"
                        d="M552.83 191.26H608.71V191.97H552.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 579.479 200.218)"
                        d="M551.36 199.77H607.24V200.48000000000002H551.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 579.184 201.599)"
                        d="M551.12 201.19H607V201.9H551.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 579.71 198.784)"
                        d="M551.61 198.36H607.49V199.07000000000002H551.61z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(9.77 578.953 203.033)"
                        d="M550.88 202.61H606.76V203.32000000000002H550.88z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 578.722 204.467)"
                        d="M550.63 204.03H606.51V204.74H550.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 578.255 207.277)"
                        d="M550.14 206.87H606.02V207.58H550.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 577.966 208.716)"
                        d="M549.9 208.28H605.78V208.99H549.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 577.735 210.15)"
                        d="M549.65 209.7H605.53V210.41H549.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 577.499 211.525)"
                        d="M549.41 211.12H605.29V211.83H549.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 578.486 205.843)"
                        d="M550.39 205.45H606.27V206.16H550.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 577.037 214.393)"
                        d="M548.92 213.96H604.8V214.67000000000002H548.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 576.742 215.774)"
                        d="M548.68 215.38H604.56V216.09H548.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 577.268 212.96)"
                        d="M549.17 212.54H605.05V213.25H549.17z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(9.77 576.511 217.208)"
                        d="M548.43 216.8H604.31V217.51000000000002H548.43z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 576.28 218.642)"
                        d="M548.19 218.21H604.07V218.92000000000002H548.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 575.755 221.457)"
                        d="M547.7 221.05H603.58V221.76000000000002H547.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 575.524 222.89)"
                        d="M547.46 222.47H603.34V223.18H547.46z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 575.293 224.325)"
                        d="M547.21 223.89H603.09V224.6H547.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 575.061 225.759)"
                        d="M546.97 225.31H602.85V226.02H546.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 576.05 220.076)"
                        d="M547.94 219.63H603.82V220.34H547.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 574.536 228.573)"
                        d="M546.48 228.14H602.36V228.85H546.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 574.305 230.008)"
                        d="M546.23 229.56H602.11V230.27H546.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 574.825 227.134)"
                        d="M546.72 226.73H602.6V227.44H546.72z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(9.77 574.069 231.383)"
                        d="M545.99 230.98H601.87V231.69H545.99z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 573.838 232.817)"
                        d="M545.75 232.4H601.63V233.11H545.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 573.317 235.69)"
                        d="M545.26 235.24H601.14V235.95000000000002H545.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 573.081 237.066)"
                        d="M545.01 236.65H600.89V237.36H545.01z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 572.85 238.5)"
                        d="M544.77 238.07H600.65V238.78H544.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 572.62 239.934)"
                        d="M544.52 239.49H600.4V240.20000000000002H544.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 573.607 234.251)"
                        d="M545.5 233.82H601.38V234.53H545.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 572.094 242.749)"
                        d="M544.04 242.33H599.92V243.04000000000002H544.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 571.863 244.183)"
                        d="M543.79 243.75H599.67V244.46H543.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 572.383 241.31)"
                        d="M544.28 240.91H600.16V241.62H544.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 571.632 245.617)"
                        d="M543.55 245.17H599.43V245.88H543.55z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(9.77 571.396 246.992)"
                        d="M543.3 246.58H599.18V247.29000000000002H543.3z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 571.165 248.426)"
                        d="M543.06 248H598.9399999999999V248.71H543.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 570.644 251.3)"
                        d="M542.57 250.84H598.45V251.55H542.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 570.408 252.675)"
                        d="M542.32 252.26H598.2V252.97H542.32z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 570.177 254.109)"
                        d="M542.08 253.68H597.96V254.39000000000001H542.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 569.946 255.543)"
                        d="M541.84 255.1H597.72V255.81H541.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 570.875 249.865)"
                        d="M542.81 249.42H598.6899999999999V250.13H542.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 569.42 258.358)"
                        d="M541.35 257.93H597.23V258.64H541.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 569.19 259.792)"
                        d="M541.1 259.35H596.98V260.06H541.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 569.652 256.924)"
                        d="M541.59 256.51H597.47V257.21999999999997H541.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 568.723 262.601)"
                        d="M540.61 262.19H596.49V262.9H540.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 568.433 264.04)"
                        d="M540.37 263.61H596.25V264.32H540.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 568.202 265.474)"
                        d="M540.13 265.02H596.01V265.72999999999996H540.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 567.966 266.85)"
                        d="M539.88 266.44H595.76V267.15H539.88z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 568.959 261.226)"
                        d="M540.86 260.77H596.74V261.47999999999996H540.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 567.504 269.718)"
                        d="M539.39 269.28H595.27V269.98999999999995H539.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 567.215 271.157)"
                        d="M539.15 270.7H595.03V271.40999999999997H539.15z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 567.735 268.284)"
                        d="M539.64 267.86H595.52V268.57H539.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 566.747 273.967)"
                        d="M538.66 273.54H594.54V274.25H538.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 566.516 275.4)"
                        d="M538.42 274.95H594.3V275.65999999999997H538.42z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 566.227 276.84)"
                        d="M538.17 276.37H594.05V277.08H538.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 565.99 278.216)"
                        d="M537.93 277.79H593.81V278.5H537.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 566.978 272.533)"
                        d="M538.9 272.12H594.78V272.83H538.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 565.529 281.084)"
                        d="M537.44 280.63H593.32V281.34H537.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 565.293 282.46)"
                        d="M537.19 282.05H593.07V282.76H537.19z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 565.76 279.65)"
                        d="M537.68 279.21H593.56V279.91999999999996H537.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 564.777 285.39)"
                        d="M536.7 284.94H592.58V285.65H536.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 564.541 286.766)"
                        d="M536.45 286.36H592.33V287.07H536.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 565.008 283.957)"
                        d="M536.94 283.52H592.82V284.22999999999996H536.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 564.31 288.2)"
                        d="M536.21 287.77H592.09V288.47999999999996H536.21z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(9.77 564.02 289.64)"
                        d="M535.96 289.19H591.84V289.9H535.96z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(9.77 563.79 291.074)"
                        d="M535.72 290.61H591.6V291.32H535.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 563.323 293.883)"
                        d="M535.23 293.45H591.11V294.15999999999997H535.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 563.092 295.317)"
                        d="M534.99 294.87H590.87V295.58H534.99z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 562.802 296.756)"
                        d="M534.74 296.28H590.62V296.98999999999995H534.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 562.566 298.132)"
                        d="M534.5 297.7H590.38V298.40999999999997H534.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 563.554 292.45)"
                        d="M535.47 292.03H591.35V292.73999999999995H535.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 562.104 301)"
                        d="M534.01 300.54H589.89V301.25H534.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 561.868 302.375)"
                        d="M533.76 301.96H589.64V302.66999999999996H533.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 562.335 299.566)"
                        d="M534.25 299.12H590.13V299.83H534.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 561.348 305.249)"
                        d="M533.28 304.8H589.16V305.51H533.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 561.117 306.683)"
                        d="M533.03 306.21H588.91V306.91999999999996H533.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 560.88 308.058)"
                        d="M532.79 307.63H588.67V308.34H532.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 560.65 309.492)"
                        d="M532.54 309.05H588.42V309.76H532.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 561.579 303.815)"
                        d="M533.52 303.38H589.4V304.09H533.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 560.13 312.365)"
                        d="M532.05 311.89H587.93V312.59999999999997H532.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 559.893 313.741)"
                        d="M531.81 313.31H587.6899999999999V314.02H531.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 560.36 310.931)"
                        d="M532.3 310.47H588.18V311.18H532.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 559.373 316.614)"
                        d="M531.32 316.14H587.2V316.84999999999997H531.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 559.137 317.99)"
                        d="M531.08 317.56H586.96V318.27H531.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(9.77 558.905 319.424)"
                        d="M530.83 318.98H586.71V319.69H530.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 558.674 320.858)"
                        d="M530.59 320.4H586.47V321.10999999999996H530.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 559.662 315.175)"
                        d="M531.57 314.73H587.45V315.44H531.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 558.149 323.672)"
                        d="M530.1 323.24H585.98V323.95H530.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(9.77 557.918 325.106)"
                        d="M529.86 324.65H585.74V325.35999999999996H529.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(9.77 558.443 322.292)"
                        d="M530.34 321.82H586.22V322.53H530.34z"
                      />
                    </g>
                    <g clipPath="url(#clippath-6)">
                      <path
                        className="cls-81"
                        transform="rotate(16.21 616.916 196.392)"
                        d="M588.83 195.98H644.71V196.69H588.83z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 616.504 197.776)"
                        d="M588.43 197.36H644.31V198.07000000000002H588.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 615.68 200.544)"
                        d="M587.63 200.12H643.51V200.83H587.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 615.304 201.923)"
                        d="M587.23 201.5H643.11V202.21H587.23z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 614.892 203.307)"
                        d="M586.82 202.89H642.7V203.6H586.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 614.48 204.691)"
                        d="M586.42 204.27H642.3V204.98000000000002H586.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 616.093 199.16)"
                        d="M588.03 198.74H643.91V199.45000000000002H588.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 613.692 207.454)"
                        d="M585.62 207.03H641.5V207.74H585.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 613.28 208.838)"
                        d="M585.22 208.41H641.1V209.12H585.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 614.103 206.07)"
                        d="M586.02 205.65H641.9V206.36H586.02z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(16.21 612.868 210.222)"
                        d="M584.82 209.8H640.7V210.51000000000002H584.82z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 612.491 211.602)"
                        d="M584.41 211.18H640.29V211.89000000000001H584.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 611.667 214.37)"
                        d="M583.61 213.94H639.49V214.65H583.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 611.29 215.749)"
                        d="M583.21 215.33H639.09V216.04000000000002H583.21z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 610.879 217.133)"
                        d="M582.81 216.71H638.6899999999999V217.42000000000002H582.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 610.467 218.517)"
                        d="M582.4 218.09H638.28V218.8H582.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 612.08 212.986)"
                        d="M584.01 212.56H639.89V213.27H584.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 609.678 221.28)"
                        d="M581.6 220.85H637.48V221.56H581.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 609.266 222.664)"
                        d="M581.2 222.24H637.08V222.95000000000002H581.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 610.055 219.9)"
                        d="M582 219.47H637.88V220.18H582z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(16.21 608.855 224.048)"
                        d="M580.8 223.62H636.68V224.33H580.8z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 608.443 225.432)"
                        d="M580.39 225H636.27V225.71H580.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 607.654 228.195)"
                        d="M579.59 227.76H635.47V228.47H579.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 607.242 229.58)"
                        d="M579.19 229.15H635.07V229.86H579.19z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 606.865 230.958)"
                        d="M578.79 230.53H634.67V231.24H578.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 606.454 232.342)"
                        d="M578.38 231.91H634.26V232.62H578.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 608.066 226.811)"
                        d="M579.99 226.38H635.87V227.09H579.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 605.63 235.11)"
                        d="M577.58 234.68H633.46V235.39000000000001H577.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 605.253 236.49)"
                        d="M577.18 236.06H633.06V236.77H577.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 606.042 233.727)"
                        d="M577.98 233.29H633.86V234H577.98z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(16.21 604.841 237.874)"
                        d="M576.78 237.44H632.66V238.15H576.78z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 604.43 239.258)"
                        d="M576.38 238.82H632.26V239.53H576.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 603.64 242.02)"
                        d="M575.57 241.59H631.45V242.3H575.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 603.229 243.405)"
                        d="M575.17 242.97H631.05V243.68H575.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 602.817 244.79)"
                        d="M574.77 244.35H630.65V245.06H574.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 602.44 246.168)"
                        d="M574.37 245.73H630.25V246.44H574.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 604.053 240.637)"
                        d="M575.97 240.2H631.85V240.91H575.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 601.616 248.936)"
                        d="M573.56 248.5H629.4399999999999V249.21H573.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 601.24 250.315)"
                        d="M573.16 249.88H629.04V250.59H573.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 602.028 247.552)"
                        d="M573.96 247.11H629.84V247.82000000000002H573.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 600.828 251.7)"
                        d="M572.76 251.26H628.64V251.97H572.76z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(16.21 600.416 253.083)"
                        d="M572.36 252.64H628.24V253.35H572.36z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 600.004 254.468)"
                        d="M571.95 254.03H627.83V254.74H571.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 599.215 257.23)"
                        d="M571.15 256.79H627.03V257.5H571.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 598.804 258.615)"
                        d="M570.75 258.17H626.63V258.88H570.75z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 598.427 259.994)"
                        d="M570.35 259.55H626.23V260.26H570.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 598.015 261.378)"
                        d="M569.94 260.94H625.82V261.65H569.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 599.627 255.847)"
                        d="M571.55 255.41H627.43V256.12H571.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 597.191 264.146)"
                        d="M569.14 263.7H625.02V264.40999999999997H569.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 596.814 265.525)"
                        d="M568.74 265.08H624.62V265.78999999999996H568.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 597.603 262.762)"
                        d="M569.54 262.32H625.42V263.03H569.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 595.99 268.293)"
                        d="M567.94 267.85H623.82V268.56H567.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 595.579 269.677)"
                        d="M567.53 269.23H623.41V269.94H567.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 595.202 271.056)"
                        d="M567.13 270.61H623.01V271.32H567.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 594.79 272.44)"
                        d="M566.73 271.99H622.61V272.7H566.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 596.403 266.91)"
                        d="M568.34 266.46H624.22V267.16999999999996H568.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 594.002 275.204)"
                        d="M565.93 274.76H621.81V275.46999999999997H565.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 593.59 276.588)"
                        d="M565.52 276.14H621.4V276.84999999999997H565.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 594.378 273.824)"
                        d="M566.33 273.38H622.21V274.09H566.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 592.766 279.356)"
                        d="M564.72 278.9H620.6V279.60999999999996H564.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 592.39 280.735)"
                        d="M564.32 280.29H620.2V281H564.32z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 591.972 282.084)"
                        d="M563.92 281.67H619.8V282.38H563.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 591.56 283.468)"
                        d="M563.51 283.05H619.39V283.76H563.51z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 593.178 277.972)"
                        d="M565.12 277.52H621V278.22999999999996H565.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 590.772 286.23)"
                        d="M562.71 285.81H618.59V286.52H562.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 590.36 287.615)"
                        d="M562.31 287.2H618.1899999999999V287.90999999999997H562.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 591.184 284.847)"
                        d="M563.11 284.43H618.99V285.14H563.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 589.546 290.453)"
                        d="M561.49 290.01H617.37V290.71999999999997H561.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 589.134 291.837)"
                        d="M561.09 291.39H616.97V292.09999999999997H561.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 589.958 289.07)"
                        d="M561.89 288.63H617.77V289.34H561.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 588.758 293.216)"
                        d="M560.69 292.78H616.57V293.48999999999995H560.69z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(16.21 588.346 294.6)"
                        d="M560.28 294.16H616.16V294.87H560.28z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(16.21 587.934 295.985)"
                        d="M559.88 295.54H615.76V296.25H559.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 587.145 298.748)"
                        d="M559.08 298.31H614.96V299.02H559.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 586.733 300.132)"
                        d="M558.68 299.69H614.56V300.4H558.68z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 586.322 301.516)"
                        d="M558.27 301.07H614.15V301.78H558.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 585.945 302.895)"
                        d="M557.87 302.45H613.75V303.15999999999997H557.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 587.522 297.369)"
                        d="M559.48 296.92H615.36V297.63H559.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 585.121 305.663)"
                        d="M557.07 305.22H612.95V305.93H557.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 584.71 307.047)"
                        d="M556.67 306.6H612.55V307.31H556.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 585.533 304.279)"
                        d="M557.47 303.83H613.35V304.53999999999996H557.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 583.92 309.81)"
                        d="M555.86 309.36H611.74V310.07H555.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 583.509 311.194)"
                        d="M555.46 310.74H611.34V311.45H555.46z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 583.132 312.573)"
                        d="M555.06 312.13H610.9399999999999V312.84H555.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 582.72 313.957)"
                        d="M554.66 313.51H610.54V314.21999999999997H554.66z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 584.332 308.426)"
                        d="M556.27 307.98H612.15V308.69H556.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 581.896 316.726)"
                        d="M553.85 316.27H609.73V316.97999999999996H553.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 581.52 318.105)"
                        d="M553.45 317.66H609.33V318.37H553.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 582.308 315.341)"
                        d="M554.26 314.89H610.14V315.59999999999997H554.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 580.696 320.873)"
                        d="M552.65 320.42H608.53V321.13H552.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 580.32 322.252)"
                        d="M552.25 321.8H608.13V322.51H552.25z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(16.21 579.907 323.636)"
                        d="M551.84 323.18H607.72V323.89H551.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 579.495 325.02)"
                        d="M551.44 324.57H607.32V325.28H551.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 581.108 319.489)"
                        d="M553.05 319.04H608.93V319.75H553.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 578.707 327.783)"
                        d="M550.64 327.33H606.52V328.03999999999996H550.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(16.21 578.295 329.167)"
                        d="M550.24 328.71H606.12V329.41999999999996H550.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(16.21 579.083 326.404)"
                        d="M551.04 325.95H606.92V326.65999999999997H551.04z"
                      />
                    </g>
                    <g clipPath="url(#clippath-7)">
                      <path
                        className="cls-81"
                        transform="rotate(24.23 662.977 210.636)"
                        d="M635.16 210.36H691.04V211.07000000000002H635.16z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 662.383 211.958)"
                        d="M634.57 211.68H690.45V212.39000000000001H634.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 661.19 214.577)"
                        d="M633.39 214.3H689.27V215.01000000000002H633.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 660.62 215.894)"
                        d="M632.8 215.61H688.68V216.32000000000002H632.8z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 660.027 217.215)"
                        d="M632.2 216.93H688.08V217.64000000000001H632.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 659.429 218.513)"
                        d="M631.61 218.24H687.49V218.95000000000002H631.61z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 661.79 213.28)"
                        d="M633.98 212.99H689.86V213.70000000000002H633.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 658.241 221.156)"
                        d="M630.43 220.86H686.31V221.57000000000002H630.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 657.666 222.449)"
                        d="M629.84 222.18H685.72V222.89000000000001H629.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 658.835 219.834)"
                        d="M631.02 219.55H686.9V220.26000000000002H631.02z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(24.23 657.073 223.77)"
                        d="M629.25 223.49H685.13V224.20000000000002H629.25z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 656.479 225.092)"
                        d="M628.66 224.8H684.54V225.51000000000002H628.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 655.31 227.706)"
                        d="M627.48 227.43H683.36V228.14000000000001H627.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 654.717 229.027)"
                        d="M626.89 228.74H682.77V229.45000000000002H626.89z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 654.118 230.325)"
                        d="M626.3 230.05H682.18V230.76000000000002H626.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 653.525 231.647)"
                        d="M625.71 231.37H681.59V232.08H625.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 655.88 226.39)"
                        d="M628.07 226.12H683.95V226.83H628.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 652.356 234.261)"
                        d="M624.53 233.99H680.41V234.70000000000002H624.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 651.762 235.583)"
                        d="M623.94 235.3H679.82V236.01000000000002H623.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 652.931 232.968)"
                        d="M625.12 232.68H681V233.39000000000001H625.12z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(24.23 651.169 236.904)"
                        d="M623.35 236.62H679.23V237.33H623.35z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 650.57 238.202)"
                        d="M622.75 237.93H678.63V238.64000000000001H622.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 649.406 240.84)"
                        d="M621.57 240.55H677.45V241.26000000000002H621.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 648.808 242.138)"
                        d="M620.98 241.87H676.86V242.58H620.98z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 648.214 243.46)"
                        d="M620.39 243.18H676.27V243.89000000000001H620.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 647.62 244.78)"
                        d="M619.8 244.49H675.68V245.20000000000002H619.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 649.977 239.523)"
                        d="M622.16 239.24H678.04V239.95000000000002H622.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 646.452 247.395)"
                        d="M618.62 247.12H674.5V247.83H618.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 645.858 248.716)"
                        d="M618.03 248.43H673.91V249.14000000000001H618.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 647.022 246.079)"
                        d="M619.21 245.8H675.09V246.51000000000002H619.21z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(24.23 645.26 250.014)"
                        d="M617.44 249.74H673.32V250.45000000000002H617.44z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 644.666 251.336)"
                        d="M616.85 251.06H672.73V251.77H616.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 643.497 253.95)"
                        d="M615.67 253.68H671.55V254.39000000000001H615.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 642.904 255.272)"
                        d="M615.08 254.99H670.96V255.70000000000002H615.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 642.31 256.593)"
                        d="M614.49 256.31H670.37V257.02H614.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 641.712 257.891)"
                        d="M613.9 257.62H669.78V258.33H613.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 644.073 252.657)"
                        d="M616.26 252.37H672.14V253.08H616.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 640.548 260.529)"
                        d="M612.71 260.24H668.59V260.95H612.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 639.95 261.827)"
                        d="M612.12 261.56H668V262.27H612.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 641.118 259.212)"
                        d="M613.3 258.93H669.18V259.64H613.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 639.356 263.148)"
                        d="M611.53 262.87H667.41V263.58H611.53z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(24.23 638.757 264.446)"
                        d="M610.94 264.18H666.82V264.89H610.94z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 638.187 265.763)"
                        d="M610.35 265.49H666.23V266.2H610.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 636.995 268.382)"
                        d="M609.17 268.12H665.05V268.83H609.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 636.401 269.703)"
                        d="M608.58 269.43H664.46V270.14H608.58z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 635.808 271.025)"
                        d="M607.99 270.74H663.87V271.45H607.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 635.232 272.318)"
                        d="M607.4 272.06H663.28V272.77H607.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 637.593 267.084)"
                        d="M609.76 266.81H665.64V267.52H609.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 634.045 274.96)"
                        d="M606.22 274.68H662.1V275.39H606.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 633.447 276.259)"
                        d="M605.63 276H661.51V276.71H605.63z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 634.639 273.64)"
                        d="M606.81 273.37H662.6899999999999V274.08H606.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 632.283 278.896)"
                        d="M604.45 278.62H660.33V279.33H604.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 631.684 280.195)"
                        d="M603.85 279.93H659.73V280.64H603.85z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 631.09 281.516)"
                        d="M603.26 281.25H659.14V281.96H603.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 630.497 282.837)"
                        d="M602.67 282.56H658.55V283.27H602.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 632.853 277.58)"
                        d="M605.04 277.31H660.92V278.02H605.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 629.328 285.452)"
                        d="M601.49 285.18H657.37V285.89H601.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 628.735 286.773)"
                        d="M600.9 286.5H656.78V287.21H600.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 629.899 284.135)"
                        d="M602.08 283.87H657.96V284.58H602.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 627.543 289.392)"
                        d="M599.72 289.12H655.6V289.83H599.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 626.95 290.714)"
                        d="M599.13 290.43H655.01V291.14H599.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 626.374 292.007)"
                        d="M598.54 291.75H654.42V292.46H598.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 625.78 293.328)"
                        d="M597.95 293.06H653.83V293.77H597.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 628.136 288.071)"
                        d="M600.31 287.81H656.1899999999999V288.52H600.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 624.588 295.948)"
                        d="M596.77 295.69H652.65V296.4H596.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 623.995 297.27)"
                        d="M596.18 297H652.06V297.71H596.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 625.187 294.65)"
                        d="M597.36 294.37H653.24V295.08H597.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 622.813 299.935)"
                        d="M594.97 299.67H650.85V300.38H594.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 622.22 301.256)"
                        d="M594.38 300.98H650.26V301.69H594.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 623.383 298.619)"
                        d="M595.56 298.36H651.4399999999999V299.07H595.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 621.62 302.555)"
                        d="M593.79 302.3H649.67V303.01H593.79z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(24.23 621.027 303.876)"
                        d="M593.2 303.61H649.08V304.32H593.2z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(24.23 620.433 305.197)"
                        d="M592.61 304.92H648.49V305.63H592.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 619.265 307.812)"
                        d="M591.43 307.55H647.31V308.26H591.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 618.671 309.133)"
                        d="M590.84 308.86H646.72V309.57H590.84z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 618.073 310.431)"
                        d="M590.25 310.17H646.13V310.88H590.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 617.479 311.753)"
                        d="M589.66 311.49H645.54V312.2H589.66z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 619.858 306.49)"
                        d="M592.02 306.24H647.9V306.95H592.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 616.31 314.367)"
                        d="M588.48 314.11H644.36V314.82H588.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 615.717 315.688)"
                        d="M587.89 315.42H643.77V316.13H587.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 616.909 313.069)"
                        d="M589.07 312.8H644.95V313.51H589.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 614.525 318.308)"
                        d="M586.71 318.05H642.59V318.76H586.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 613.954 319.624)"
                        d="M586.11 319.36H641.99V320.07H586.11z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 613.36 320.945)"
                        d="M585.52 320.67H641.4V321.38H585.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 612.762 322.244)"
                        d="M584.93 321.99H640.81V322.7H584.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 615.123 317.01)"
                        d="M587.3 316.74H643.18V317.45H587.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 611.575 324.886)"
                        d="M583.75 324.61H639.63V325.32H583.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 611 326.18)"
                        d="M583.16 325.92H639.04V326.63H583.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 612.169 323.565)"
                        d="M584.34 323.3H640.22V324.01H584.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 609.813 328.822)"
                        d="M581.98 328.55H637.86V329.26H581.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 609.214 330.12)"
                        d="M581.39 329.86H637.27V330.57H581.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(24.23 608.62 331.442)"
                        d="M580.8 331.18H636.68V331.89H580.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 608.05 332.758)"
                        d="M580.21 332.49H636.09V333.2H580.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 610.406 327.5)"
                        d="M582.57 327.24H638.45V327.95H582.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 606.858 335.377)"
                        d="M579.03 335.11H634.91V335.82H579.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(24.23 606.265 336.699)"
                        d="M578.44 336.43H634.32V337.14H578.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(24.23 607.452 334.056)"
                        d="M579.62 333.8H635.5V334.51H579.62z"
                      />
                    </g>
                    <g clipPath="url(#clippath-8)">
                      <path
                        className="cls-81"
                        transform="rotate(27.35 696.866 224.611)"
                        d="M668.91 224.24H724.79V224.95000000000002H668.91z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 696.197 225.884)"
                        d="M668.24 225.52H724.12V226.23000000000002H668.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 694.883 228.446)"
                        d="M666.92 228.07H722.8V228.78H666.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 694.213 229.719)"
                        d="M666.26 229.35H722.14V230.06H666.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 693.543 230.992)"
                        d="M665.6 230.63H721.48V231.34H665.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 692.9 232.28)"
                        d="M664.94 231.91H720.82V232.62H664.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 695.527 227.157)"
                        d="M667.58 226.8H723.46V227.51000000000002H667.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 691.56 234.827)"
                        d="M663.61 234.47H719.49V235.18H663.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 690.915 236.115)"
                        d="M662.95 235.75H718.83V236.46H662.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 692.23 233.553)"
                        d="M664.28 233.19H720.16V233.9H664.28z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(27.35 690.246 237.388)"
                        d="M662.29 237.02H718.17V237.73000000000002H662.29z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 689.576 238.661)"
                        d="M661.63 238.3H717.51V239.01000000000002H661.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 688.262 241.223)"
                        d="M660.31 240.86H716.1899999999999V241.57000000000002H660.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 687.592 242.496)"
                        d="M659.65 242.14H715.53V242.85H659.65z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 686.948 243.784)"
                        d="M658.99 243.42H714.87V244.13H658.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 686.278 245.057)"
                        d="M658.32 244.69H714.2V245.4H658.32z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 688.932 239.95)"
                        d="M660.97 239.58H716.85V240.29000000000002H660.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 684.964 247.62)"
                        d="M657 247.25H712.88V247.96H657z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 684.295 248.892)"
                        d="M656.34 248.53H712.22V249.24H656.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 685.609 246.33)"
                        d="M657.66 245.97H713.54V246.68H657.66z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(27.35 683.625 250.165)"
                        d="M655.68 249.81H711.56V250.52H655.68z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 682.98 251.454)"
                        d="M655.02 251.09H710.9V251.8H655.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 681.641 254)"
                        d="M653.69 253.64H709.57V254.35H653.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 680.997 255.288)"
                        d="M653.03 254.92H708.91V255.63H653.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 680.327 256.561)"
                        d="M652.37 256.2H708.25V256.90999999999997H652.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 679.663 257.855)"
                        d="M651.71 257.48H707.59V258.19H651.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 682.311 252.727)"
                        d="M654.36 252.37H710.24V253.08H654.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 678.344 260.396)"
                        d="M650.39 260.04H706.27V260.75H650.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 677.679 261.69)"
                        d="M649.73 261.31H705.61V262.02H649.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 679.013 259.123)"
                        d="M651.05 258.76H706.93V259.46999999999997H651.05z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(27.35 677.03 262.958)"
                        d="M649.07 262.59H704.95V263.29999999999995H649.07z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 676.36 264.23)"
                        d="M648.4 263.87H704.28V264.58H648.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 675.046 266.792)"
                        d="M647.08 266.43H702.96V267.14H647.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 674.376 268.065)"
                        d="M646.42 267.71H702.3V268.41999999999996H646.42z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 673.712 269.36)"
                        d="M645.76 268.99H701.64V269.7H645.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 673.062 270.627)"
                        d="M645.1 270.26H700.98V270.96999999999997H645.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 675.695 265.524)"
                        d="M647.74 265.15H703.62V265.85999999999996H647.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 671.728 273.194)"
                        d="M643.78 272.82H699.66V273.53H643.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 671.058 274.467)"
                        d="M643.11 274.1H698.99V274.81H643.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 672.393 271.9)"
                        d="M644.44 271.54H700.32V272.25H644.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 670.409 275.735)"
                        d="M642.45 275.38H698.33V276.09H642.45z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(27.35 669.744 277.028)"
                        d="M641.79 276.66H697.67V277.37H641.79z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 669.075 278.301)"
                        d="M641.13 277.94H697.01V278.65H641.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 667.76 280.863)"
                        d="M639.81 280.49H695.6899999999999V281.2H639.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 667.09 282.136)"
                        d="M639.15 281.77H695.03V282.47999999999996H639.15z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 666.442 283.404)"
                        d="M638.48 283.05H694.36V283.76H638.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 665.777 284.698)"
                        d="M637.82 284.33H693.7V285.03999999999996H637.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 668.425 279.57)"
                        d="M640.47 279.21H696.35V279.91999999999996H640.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 664.458 287.239)"
                        d="M636.5 286.88H692.38V287.59H636.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 663.793 288.532)"
                        d="M635.84 288.16H691.72V288.87H635.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 665.107 285.97)"
                        d="M637.16 285.61H693.04V286.32H637.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 662.48 291.094)"
                        d="M634.52 290.72H690.4V291.43H634.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 661.81 292.367)"
                        d="M633.86 292H689.74V292.71H633.86z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 661.14 293.64)"
                        d="M633.19 293.28H689.07V293.98999999999995H633.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 660.496 294.929)"
                        d="M632.53 294.56H688.41V295.27H632.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 663.124 289.805)"
                        d="M635.18 289.44H691.06V290.15H635.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 659.156 297.475)"
                        d="M631.21 297.11H687.09V297.82H631.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 658.512 298.763)"
                        d="M630.55 298.39H686.43V299.09999999999997H630.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 659.826 296.202)"
                        d="M631.87 295.83H687.75V296.53999999999996H631.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 657.173 301.31)"
                        d="M629.23 300.95H685.11V301.65999999999997H629.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 656.528 302.598)"
                        d="M628.57 302.23H684.45V302.94H628.57z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 655.859 303.871)"
                        d="M627.9 303.51H683.78V304.21999999999997H627.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 655.189 305.144)"
                        d="M627.24 304.78H683.12V305.48999999999995H627.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 657.842 300.036)"
                        d="M629.89 299.67H685.77V300.38H629.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 653.875 307.706)"
                        d="M625.92 307.34H681.8V308.04999999999995H625.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 653.205 308.979)"
                        d="M625.26 308.62H681.14V309.33H625.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 654.545 306.433)"
                        d="M626.58 306.06H682.46V306.77H626.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 651.86 311.592)"
                        d="M623.91 311.22H679.79V311.93H623.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 651.211 312.86)"
                        d="M623.25 312.5H679.13V313.21H623.25z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 652.53 310.318)"
                        d="M624.57 309.94H680.45V310.65H624.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 650.546 314.153)"
                        d="M622.59 313.78H678.47V314.48999999999995H622.59z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(27.35 649.876 315.426)"
                        d="M621.93 315.06H677.81V315.77H621.93z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(27.35 649.227 316.694)"
                        d="M621.27 316.34H677.15V317.04999999999995H621.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 647.893 319.26)"
                        d="M619.94 318.89H675.82V319.59999999999997H619.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 647.244 320.529)"
                        d="M619.28 320.17H675.16V320.88H619.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 646.579 321.822)"
                        d="M618.62 321.45H674.5V322.15999999999997H618.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 645.91 323.096)"
                        d="M617.96 322.73H673.84V323.44H617.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 648.563 317.988)"
                        d="M620.6 317.62H676.48V318.33H620.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 644.595 325.657)"
                        d="M616.64 325.29H672.52V326H616.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 643.925 326.93)"
                        d="M615.98 326.57H671.86V327.28H615.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 645.26 324.364)"
                        d="M617.3 324.01H673.18V324.71999999999997H617.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 642.612 329.492)"
                        d="M614.65 329.12H670.53V329.83H614.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 641.942 330.765)"
                        d="M613.99 330.4H669.87V331.10999999999996H613.99z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 641.272 332.038)"
                        d="M613.33 331.68H669.21V332.39H613.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 640.628 333.326)"
                        d="M612.67 332.96H668.55V333.66999999999996H612.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 643.256 328.203)"
                        d="M615.31 327.84H671.1899999999999V328.54999999999995H615.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 639.293 335.893)"
                        d="M611.35 335.51H667.23V336.21999999999997H611.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 638.644 337.161)"
                        d="M610.69 336.79H666.57V337.5H610.69z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 639.958 334.6)"
                        d="M612.01 334.24H667.89V334.95H612.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 637.31 339.728)"
                        d="M609.36 339.35H665.24V340.06H609.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 636.66 340.996)"
                        d="M608.7 340.63H664.58V341.34H608.7z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(27.35 635.99 342.269)"
                        d="M608.04 341.91H663.92V342.62H608.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 635.326 343.562)"
                        d="M607.38 343.19H663.26V343.9H607.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 637.974 338.434)"
                        d="M610.02 338.07H665.9V338.78H610.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 634.007 346.104)"
                        d="M606.06 345.74H661.9399999999999V346.45H606.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(27.35 633.342 347.397)"
                        d="M605.39 347.02H661.27V347.72999999999996H605.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(27.35 634.677 344.83)"
                        d="M606.72 344.46H662.6V345.16999999999996H606.72z"
                      />
                    </g>
                    <g clipPath="url(#clippath-9)">
                      <path
                        className="cls-81"
                        transform="rotate(35.25 728.136 241.603)"
                        d="M700.22 241.26H756.1V241.97H700.22z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 727.315 242.782)"
                        d="M699.39 242.44H755.27V243.15H699.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 725.652 245.13)"
                        d="M697.72 244.79H753.6V245.5H697.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 724.815 246.314)"
                        d="M696.89 245.96H752.77V246.67000000000002H696.89z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 723.99 247.477)"
                        d="M696.06 247.14H751.9399999999999V247.85H696.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 723.153 248.662)"
                        d="M695.23 248.32H751.11V249.03H695.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 726.473 243.95)"
                        d="M698.55 243.61H754.43V244.32000000000002H698.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 721.49 251.01)"
                        d="M693.57 250.67H749.45V251.38H693.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 720.67 252.188)"
                        d="M692.74 251.84H748.62V252.55H692.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 722.327 249.825)"
                        d="M694.4 249.49H750.28V250.20000000000002H694.4z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(35.25 719.828 253.357)"
                        d="M691.91 253.02H747.79V253.73000000000002H691.91z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 719.007 254.536)"
                        d="M691.08 254.19H746.96V254.9H691.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 717.344 256.883)"
                        d="M689.42 256.54H745.3V257.25H689.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 716.507 258.067)"
                        d="M688.59 257.72H744.47V258.43H688.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 715.682 259.23)"
                        d="M687.76 258.89H743.64V259.59999999999997H687.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 714.845 260.415)"
                        d="M686.92 260.07H742.8V260.78H686.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 718.165 255.704)"
                        d="M690.25 255.37H746.13V256.08H690.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 713.182 262.762)"
                        d="M685.26 262.42H741.14V263.13H685.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 712.361 263.941)"
                        d="M684.43 263.6H740.31V264.31H684.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 714.019 261.578)"
                        d="M686.09 261.25H741.97V261.96H686.09z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(35.25 711.52 265.11)"
                        d="M683.6 264.77H739.48V265.47999999999996H683.6z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 710.699 266.289)"
                        d="M682.77 265.95H738.65V266.65999999999997H682.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 709.036 268.636)"
                        d="M681.11 268.3H736.99V269.01H681.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 708.2 269.82)"
                        d="M680.28 269.47H736.16V270.18H680.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 707.373 270.984)"
                        d="M679.45 270.65H735.33V271.35999999999996H679.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 706.537 272.168)"
                        d="M678.62 271.82H734.5V272.53H678.62z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 709.862 267.473)"
                        d="M681.94 267.12H737.82V267.83H681.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 704.874 274.516)"
                        d="M676.96 274.18H732.84V274.89H676.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 704.053 275.695)"
                        d="M676.13 275.35H732.01V276.06H676.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 705.716 273.347)"
                        d="M677.79 273H733.67V273.71H677.79z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(35.25 703.212 276.863)"
                        d="M675.29 276.53H731.17V277.23999999999995H675.29z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 702.39 278.042)"
                        d="M674.46 277.7H730.34V278.40999999999997H674.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 700.728 280.39)"
                        d="M672.8 280.05H728.68V280.76H672.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 699.891 281.574)"
                        d="M671.97 281.23H727.85V281.94H671.97z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 699.065 282.737)"
                        d="M671.14 282.4H727.02V283.10999999999996H671.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 698.229 283.921)"
                        d="M670.31 283.58H726.1899999999999V284.28999999999996H670.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 701.554 279.226)"
                        d="M673.63 278.88H729.51V279.59H673.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 696.566 286.269)"
                        d="M668.65 285.93H724.53V286.64H668.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 695.745 287.448)"
                        d="M667.82 287.11H723.7V287.82H667.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 697.408 285.1)"
                        d="M669.48 284.76H725.36V285.46999999999997H669.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 694.904 288.616)"
                        d="M666.99 288.28H722.87V288.98999999999995H666.99z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(35.25 694.083 289.796)"
                        d="M666.16 289.46H722.04V290.16999999999996H666.16z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 693.246 290.98)"
                        d="M665.33 290.63H721.21V291.34H665.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 691.583 293.327)"
                        d="M663.66 292.98H719.54V293.69H663.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 690.762 294.506)"
                        d="M662.83 294.16H718.71V294.87H662.83z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 689.92 295.675)"
                        d="M662 295.33H717.88V296.03999999999996H662z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 689.1 296.854)"
                        d="M661.17 296.51H717.05V297.21999999999997H661.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 692.42 292.143)"
                        d="M664.5 291.81H720.38V292.52H664.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 687.437 299.201)"
                        d="M659.51 298.86H715.39V299.57H659.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 686.6 300.385)"
                        d="M658.68 300.04H714.56V300.75H658.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 688.258 298.022)"
                        d="M660.34 297.69H716.22V298.4H660.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 684.938 302.733)"
                        d="M657.02 302.39H712.9V303.09999999999997H657.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 684.112 303.896)"
                        d="M656.19 303.56H712.07V304.27H656.19z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 683.275 305.08)"
                        d="M655.36 304.74H711.24V305.45H655.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 682.454 306.26)"
                        d="M654.53 305.91H710.41V306.62H654.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 685.775 301.549)"
                        d="M657.85 301.21H713.73V301.91999999999996H657.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 680.792 308.607)"
                        d="M652.87 308.26H708.75V308.96999999999997H652.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 679.95 309.775)"
                        d="M652.03 309.44H707.91V310.15H652.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 681.613 307.428)"
                        d="M653.7 307.09H709.58V307.79999999999995H653.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 678.293 312.139)"
                        d="M650.37 311.79H706.25V312.5H650.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 677.467 313.302)"
                        d="M649.54 312.97H705.42V313.68H649.54z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 676.63 314.486)"
                        d="M648.71 314.14H704.59V314.84999999999997H648.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 675.809 315.665)"
                        d="M647.88 315.32H703.76V316.03H647.88z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 679.13 310.955)"
                        d="M651.2 310.62H707.08V311.33H651.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 674.146 318.013)"
                        d="M646.22 317.67H702.1V318.38H646.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 673.305 319.181)"
                        d="M645.39 318.84H701.27V319.54999999999995H645.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 674.967 316.834)"
                        d="M647.05 316.49H702.93V317.2H647.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 671.626 321.586)"
                        d="M643.7 321.24H699.58V321.95H643.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 670.784 322.754)"
                        d="M642.87 322.41H698.75V323.12H642.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 672.447 320.407)"
                        d="M644.53 320.06H700.41V320.77H644.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 669.963 323.933)"
                        d="M642.03 323.59H697.91V324.29999999999995H642.03z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(35.25 669.121 325.102)"
                        d="M641.2 324.77H697.08V325.47999999999996H641.2z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(35.25 668.3 326.28)"
                        d="M640.37 325.94H696.25V326.65H640.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 666.638 328.628)"
                        d="M638.71 328.29H694.59V329H638.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 665.801 329.813)"
                        d="M637.88 329.47H693.76V330.18H637.88z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 664.975 330.976)"
                        d="M637.05 330.64H692.93V331.34999999999997H637.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 664.139 332.16)"
                        d="M636.22 331.82H692.1V332.53H636.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 667.464 327.465)"
                        d="M639.54 327.12H695.42V327.83H639.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 662.476 334.508)"
                        d="M634.56 334.17H690.4399999999999V334.88H634.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 661.655 335.687)"
                        d="M633.73 335.34H689.61V336.04999999999995H633.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 663.318 333.34)"
                        d="M635.39 332.99H691.27V333.7H635.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 659.992 338.034)"
                        d="M632.07 337.7H687.95V338.40999999999997H632.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 659.156 339.218)"
                        d="M631.24 338.87H687.12V339.58H631.24z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 658.33 340.382)"
                        d="M630.4 340.05H686.28V340.76H630.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 657.493 341.566)"
                        d="M629.57 341.22H685.45V341.93H629.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 660.813 336.855)"
                        d="M632.9 336.52H688.78V337.22999999999996H632.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 655.83 343.913)"
                        d="M627.91 343.57H683.79V344.28H627.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 655.01 345.092)"
                        d="M627.08 344.75H682.96V345.46H627.08z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 656.667 342.73)"
                        d="M628.74 342.4H684.62V343.10999999999996H628.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 653.347 347.44)"
                        d="M625.42 347.1H681.3V347.81H625.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 652.51 348.624)"
                        d="M624.59 348.27H680.47V348.97999999999996H624.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(35.25 651.684 349.787)"
                        d="M623.76 349.45H679.64V350.15999999999997H623.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 650.848 350.972)"
                        d="M622.93 350.63H678.81V351.34H622.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 654.168 346.26)"
                        d="M626.25 345.92H682.13V346.63H626.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 649.185 353.32)"
                        d="M621.27 352.98H677.15V353.69H621.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(35.25 648.364 354.498)"
                        d="M620.44 354.15H676.32V354.85999999999996H620.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(35.25 650.022 352.135)"
                        d="M622.1 351.8H677.98V352.51H622.1z"
                      />
                    </g>
                    <g clipPath="url(#clippath-10)">
                      <path
                        className="cls-81"
                        transform="rotate(42.12 758.93 264.013)"
                        d="M730.93 263.6H786.81V264.31H730.93z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 757.97 265.084)"
                        d="M729.96 264.67H785.84V265.38H729.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 756.034 267.216)"
                        d="M728.03 266.8H783.91V267.51H728.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 755.074 268.287)"
                        d="M727.07 267.87H782.95V268.58H727.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 754.114 269.357)"
                        d="M726.1 268.94H781.98V269.65H726.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 753.137 270.42)"
                        d="M725.14 270.01H781.02V270.71999999999997H725.14z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 757.011 266.154)"
                        d="M729 265.74H784.88V266.45H729z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 751.218 272.56)"
                        d="M723.2 272.14H779.08V272.84999999999997H723.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 750.24 273.622)"
                        d="M722.24 273.21H778.12V273.91999999999996H722.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 752.177 271.49)"
                        d="M724.17 271.07H780.05V271.78H724.17z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(42.12 749.28 274.692)"
                        d="M721.27 274.28H777.15V274.98999999999995H721.27z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 748.32 275.763)"
                        d="M720.31 275.34H776.1899999999999V276.04999999999995H720.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 746.384 277.895)"
                        d="M718.38 277.48H774.26V278.19H718.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 745.424 278.965)"
                        d="M717.41 278.55H773.29V279.26H717.41z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 744.446 280.028)"
                        d="M716.45 279.61H772.33V280.32H716.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 743.487 281.098)"
                        d="M715.48 280.68H771.36V281.39H715.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 747.343 276.825)"
                        d="M719.34 276.41H775.22V277.12H719.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 741.55 283.23)"
                        d="M713.55 282.82H769.43V283.53H713.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 740.59 284.3)"
                        d="M712.58 283.88H768.46V284.59H712.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 742.527 282.168)"
                        d="M714.52 281.75H770.4V282.46H714.52z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(42.12 739.63 285.371)"
                        d="M711.62 284.95H767.5V285.65999999999997H711.62z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 738.653 286.434)"
                        d="M710.65 286.02H766.53V286.72999999999996H710.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 736.734 288.574)"
                        d="M708.72 288.16H764.6V288.87H708.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 735.756 289.636)"
                        d="M707.76 289.22H763.64V289.93H707.76z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 734.796 290.707)"
                        d="M706.79 290.29H762.67V291H706.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 733.837 291.777)"
                        d="M705.83 291.36H761.71V292.07H705.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 737.693 287.504)"
                        d="M709.69 287.09H765.57V287.79999999999995H709.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 731.9 293.91)"
                        d="M703.89 293.49H759.77V294.2H703.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 730.94 294.98)"
                        d="M702.93 294.56H758.81V295.27H702.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 732.86 292.84)"
                        d="M704.86 292.43H760.74V293.14H704.86z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(42.12 729.962 296.042)"
                        d="M701.96 295.63H757.84V296.34H701.96z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 729.003 297.112)"
                        d="M701 296.7H756.88V297.40999999999997H701z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 727.066 299.245)"
                        d="M699.07 298.83H754.95V299.53999999999996H699.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 726.106 300.315)"
                        d="M698.1 299.9H753.98V300.60999999999996H698.1z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 725.147 301.386)"
                        d="M697.14 300.97H753.02V301.68H697.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 724.169 302.448)"
                        d="M696.17 302.03H752.05V302.73999999999995H696.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 728.043 298.183)"
                        d="M700.03 297.76H755.91V298.46999999999997H700.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 722.25 304.588)"
                        d="M694.24 304.17H750.12V304.88H694.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 721.272 305.65)"
                        d="M693.27 305.24H749.15V305.95H693.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 723.21 303.518)"
                        d="M695.21 303.1H751.09V303.81H695.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 720.313 306.721)"
                        d="M692.31 306.3H748.1899999999999V307.01H692.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(42.12 719.353 307.791)"
                        d="M691.34 307.37H747.22V308.08H691.34z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 718.375 308.854)"
                        d="M690.38 308.44H746.26V309.15H690.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 716.456 310.994)"
                        d="M688.45 310.57H744.33V311.28H688.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 715.479 312.056)"
                        d="M687.48 311.64H743.36V312.34999999999997H687.48z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 714.519 313.127)"
                        d="M686.52 312.71H742.4V313.41999999999996H686.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 713.56 314.197)"
                        d="M685.55 313.78H741.43V314.48999999999995H685.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 717.416 309.924)"
                        d="M689.41 309.51H745.29V310.21999999999997H689.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 711.622 316.33)"
                        d="M683.62 315.91H739.5V316.62H683.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 710.663 317.4)"
                        d="M682.65 316.98H738.53V317.69H682.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 712.582 315.26)"
                        d="M684.59 314.84H740.47V315.54999999999995H684.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 708.725 319.532)"
                        d="M680.72 319.11H736.6V319.82H680.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 707.766 320.603)"
                        d="M679.76 320.18H735.64V320.89H679.76z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 706.788 321.665)"
                        d="M678.79 321.25H734.67V321.96H678.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 705.829 322.735)"
                        d="M677.83 322.32H733.71V323.03H677.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 709.685 318.462)"
                        d="M681.69 318.05H737.57V318.76H681.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 703.891 324.868)"
                        d="M675.9 324.45H731.78V325.15999999999997H675.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 702.932 325.938)"
                        d="M674.93 325.52H730.81V326.22999999999996H674.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 704.869 323.806)"
                        d="M676.86 323.39H732.74V324.09999999999997H676.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 700.995 328.07)"
                        d="M673 327.66H728.88V328.37H673z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 700.035 329.141)"
                        d="M672.03 328.72H727.91V329.43H672.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 699.075 330.211)"
                        d="M671.07 329.79H726.95V330.5H671.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 698.098 331.274)"
                        d="M670.1 330.86H725.98V331.57H670.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 701.972 327.009)"
                        d="M673.97 326.59H729.85V327.29999999999995H673.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 696.179 333.414)"
                        d="M668.17 332.99H724.05V333.7H668.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 695.201 334.477)"
                        d="M667.21 334.06H723.09V334.77H667.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 697.138 332.344)"
                        d="M669.14 331.93H725.02V332.64H669.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 693.235 336.65)"
                        d="M665.24 336.24H721.12V336.95H665.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 692.275 337.72)"
                        d="M664.27 337.3H720.15V338.01H664.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 694.213 335.588)"
                        d="M666.21 335.17H722.09V335.88H666.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 691.316 338.79)"
                        d="M663.31 338.37H719.1899999999999V339.08H663.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(42.12 690.338 339.853)"
                        d="M662.34 339.44H718.22V340.15H662.34z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(42.12 689.379 340.923)"
                        d="M661.38 340.51H717.26V341.21999999999997H661.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 687.441 343.056)"
                        d="M659.45 342.64H715.33V343.34999999999997H659.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 686.482 344.126)"
                        d="M658.48 343.71H714.36V344.41999999999996H658.48z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 685.522 345.196)"
                        d="M657.52 344.78H713.4V345.48999999999995H657.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 684.545 346.259)"
                        d="M656.55 345.84H712.43V346.54999999999995H656.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 688.419 341.994)"
                        d="M660.41 341.57H716.29V342.28H660.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 682.625 348.4)"
                        d="M654.62 347.98H710.5V348.69H654.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 681.648 349.462)"
                        d="M653.65 349.05H709.53V349.76H653.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 683.585 347.329)"
                        d="M655.59 346.91H711.47V347.62H655.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 679.729 351.602)"
                        d="M651.72 351.18H707.6V351.89H651.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 678.751 352.664)"
                        d="M650.76 352.25H706.64V352.96H650.76z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 677.791 353.735)"
                        d="M649.79 353.32H705.67V354.03H649.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 676.832 354.805)"
                        d="M648.83 354.38H704.71V355.09H648.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 680.688 350.532)"
                        d="M652.69 350.11H708.57V350.82H652.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 674.895 356.938)"
                        d="M646.9 356.52H702.78V357.22999999999996H646.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 673.922 358.013)"
                        d="M645.93 357.59H701.81V358.29999999999995H645.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 675.854 355.867)"
                        d="M647.86 355.45H703.74V356.15999999999997H647.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 671.998 360.14)"
                        d="M644 359.72H699.88V360.43H644z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 671.025 361.216)"
                        d="M643.03 360.79H698.91V361.5H643.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(42.12 670.06 362.273)"
                        d="M642.07 361.86H697.95V362.57H642.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 669.101 363.343)"
                        d="M641.1 362.93H696.98V363.64H641.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 672.957 359.07)"
                        d="M644.97 358.66H700.85V359.37H644.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 667.164 365.476)"
                        d="M639.17 365.06H695.05V365.77H639.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(42.12 666.204 366.546)"
                        d="M638.21 366.13H694.09V366.84H638.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(42.12 668.128 364.419)"
                        d="M640.14 363.99H696.02V364.7H640.14z"
                      />
                    </g>
                    <g clipPath="url(#clippath-11)">
                      <path
                        className="cls-81"
                        transform="rotate(46.8 785.888 289.45)"
                        d="M757.99 289.14H813.87V289.84999999999997H757.99z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 784.847 290.435)"
                        d="M756.94 290.12H812.82V290.83H756.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 782.736 292.405)"
                        d="M754.85 292.09H810.73V292.79999999999995H754.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 781.695 293.39)"
                        d="M753.8 293.08H809.68V293.78999999999996H753.8z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 780.642 294.38)"
                        d="M752.75 294.06H808.63V294.77H752.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 779.6 295.366)"
                        d="M751.7 295.05H807.58V295.76H751.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 783.794 291.425)"
                        d="M755.9 291.11H811.78V291.82H755.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 777.501 297.331)"
                        d="M749.6 297.02H805.48V297.72999999999996H749.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 776.448 298.322)"
                        d="M748.55 298.01H804.43V298.71999999999997H748.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 778.542 296.345)"
                        d="M750.65 296.03H806.53V296.73999999999995H750.65z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(46.8 775.407 299.307)"
                        d="M747.5 298.99H803.38V299.7H747.5z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 774.35 300.286)"
                        d="M746.45 299.98H802.33V300.69H746.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 772.255 302.263)"
                        d="M744.35 301.95H800.23V302.65999999999997H744.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 771.197 303.242)"
                        d="M743.3 302.93H799.18V303.64H743.3z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 770.156 304.227)"
                        d="M742.26 303.92H798.14V304.63H742.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 769.103 305.218)"
                        d="M741.21 304.9H797.09V305.60999999999996H741.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 773.296 301.277)"
                        d="M745.4 300.96H801.28V301.66999999999996H745.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 767.004 307.183)"
                        d="M739.11 306.87H794.99V307.58H739.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 765.962 308.168)"
                        d="M738.06 307.86H793.9399999999999V308.57H738.06z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 768.062 306.204)"
                        d="M740.16 305.89H796.04V306.59999999999997H740.16z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(46.8 764.91 309.159)"
                        d="M737.01 308.84H792.89V309.54999999999995H737.01z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 763.857 310.15)"
                        d="M735.96 309.83H791.84V310.53999999999996H735.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 761.757 312.114)"
                        d="M733.86 311.8H789.74V312.51H733.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 760.716 313.1)"
                        d="M732.81 312.79H788.6899999999999V313.5H732.81z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 759.663 314.09)"
                        d="M731.76 313.77H787.64V314.47999999999996H731.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 758.617 315.064)"
                        d="M730.71 314.76H786.59V315.46999999999997H730.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 762.81 311.123)"
                        d="M734.91 310.82H790.79V311.53H734.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 756.511 317.046)"
                        d="M728.62 316.73H784.5V317.44H728.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 755.465 318.02)"
                        d="M727.57 317.71H783.45V318.41999999999996H727.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 757.564 316.055)"
                        d="M729.66 315.74H785.54V316.45H729.66z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(46.8 754.412 319.01)"
                        d="M726.52 318.7H782.4V319.40999999999997H726.52z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 753.37 319.996)"
                        d="M725.47 319.68H781.35V320.39H725.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 751.272 321.96)"
                        d="M723.37 321.65H779.25V322.35999999999996H723.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 750.219 322.951)"
                        d="M722.32 322.64H778.2V323.34999999999997H722.32z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 749.177 323.937)"
                        d="M721.27 323.63H777.15V324.34H721.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 748.125 324.927)"
                        d="M720.22 324.61H776.1V325.32H720.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 752.318 320.987)"
                        d="M724.42 320.67H780.3V321.38H724.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 746.025 326.892)"
                        d="M718.12 326.58H774V327.28999999999996H718.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 744.972 327.883)"
                        d="M717.07 327.57H772.95V328.28H717.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 747.067 325.907)"
                        d="M719.17 325.6H775.05V326.31H719.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 743.931 328.868)"
                        d="M716.02 328.55H771.9V329.26H716.02z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(46.8 742.873 329.847)"
                        d="M714.98 329.54H770.86V330.25H714.98z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 741.832 330.833)"
                        d="M713.93 330.52H769.81V331.22999999999996H713.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 739.726 332.814)"
                        d="M711.83 332.49H767.71V333.2H711.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 738.68 333.788)"
                        d="M710.78 333.48H766.66V334.19H710.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 737.627 334.779)"
                        d="M709.73 334.46H765.61V335.16999999999996H709.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 736.586 335.765)"
                        d="M708.68 335.45H764.56V336.15999999999997H708.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 740.78 331.824)"
                        d="M712.88 331.51H768.76V332.21999999999997H712.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 734.487 337.73)"
                        d="M706.58 337.42H762.46V338.13H706.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 733.434 338.72)"
                        d="M705.53 338.41H761.41V339.12H705.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 735.528 336.744)"
                        d="M707.63 336.44H763.51V337.15H707.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 731.335 340.685)"
                        d="M703.43 340.38H759.31V341.09H703.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 730.282 341.675)"
                        d="M702.39 341.36H758.27V342.07H702.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 729.24 342.66)"
                        d="M701.34 342.35H757.22V343.06H701.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 728.188 343.651)"
                        d="M700.29 343.33H756.17V344.03999999999996H700.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 732.392 339.706)"
                        d="M704.48 339.39H760.36V340.09999999999997H704.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 726.088 345.616)"
                        d="M698.19 345.3H754.07V346.01H698.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 725.047 346.602)"
                        d="M697.14 346.29H753.02V347H697.14z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 727.141 344.626)"
                        d="M699.24 344.32H755.12V345.03H699.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 722.936 348.571)"
                        d="M695.04 348.26H750.92V348.96999999999997H695.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 721.895 349.557)"
                        d="M693.99 349.25H749.87V349.96H693.99z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 720.842 350.548)"
                        d="M692.94 350.23H748.82V350.94H692.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 719.796 351.522)"
                        d="M691.89 351.22H747.77V351.93H691.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 723.994 347.592)"
                        d="M696.09 347.27H751.97V347.97999999999996H696.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 717.702 353.498)"
                        d="M689.79 353.19H745.67V353.9H689.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 716.649 354.489)"
                        d="M688.75 354.17H744.63V354.88H688.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 718.743 352.512)"
                        d="M690.84 352.2H746.72V352.90999999999997H690.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 714.513 356.496)"
                        d="M686.61 356.18H742.49V356.89H686.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 713.455 357.475)"
                        d="M685.56 357.17H741.4399999999999V357.88H685.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 715.566 355.506)"
                        d="M687.66 355.19H743.54V355.9H687.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 712.414 358.461)"
                        d="M684.51 358.15H740.39V358.85999999999996H684.51z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(46.8 711.361 359.452)"
                        d="M683.46 359.14H739.34V359.84999999999997H683.46z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(46.8 710.32 360.437)"
                        d="M682.41 360.12H738.29V360.83H682.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 708.22 362.402)"
                        d="M680.31 362.09H736.1899999999999V362.79999999999995H680.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 707.168 363.393)"
                        d="M679.26 363.08H735.14V363.78999999999996H679.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 706.11 364.372)"
                        d="M678.21 364.06H734.09V364.77H678.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 705.069 365.357)"
                        d="M677.16 365.05H733.04V365.76H677.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 709.262 361.416)"
                        d="M681.36 361.11H737.24V361.82H681.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 702.975 367.334)"
                        d="M675.07 367.02H730.95V367.72999999999996H675.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 701.917 368.313)"
                        d="M674.02 368H729.9V368.71H674.02z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 704.016 366.348)"
                        d="M676.12 366.03H732V366.73999999999995H676.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 699.823 370.289)"
                        d="M671.92 369.98H727.8V370.69H671.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 698.781 371.274)"
                        d="M670.87 370.96H726.75V371.66999999999996H670.87z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 697.723 372.254)"
                        d="M669.82 371.95H725.7V372.65999999999997H669.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 696.67 373.244)"
                        d="M668.77 372.93H724.65V373.64H668.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 700.875 369.298)"
                        d="M672.97 368.99H728.85V369.7H672.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 694.576 375.22)"
                        d="M666.67 374.9H722.55V375.60999999999996H666.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 693.53 376.194)"
                        d="M665.62 375.89H721.5V376.59999999999997H665.62z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 695.63 374.23)"
                        d="M667.72 373.92H723.6V374.63H667.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 691.436 378.17)"
                        d="M663.52 377.86H719.4V378.57H663.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 690.378 379.15)"
                        d="M662.48 378.84H718.36V379.54999999999995H662.48z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(46.8 689.337 380.135)"
                        d="M661.43 379.83H717.31V380.53999999999996H661.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 688.284 381.126)"
                        d="M660.38 380.81H716.26V381.52H660.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 692.477 377.185)"
                        d="M664.57 376.87H720.45V377.58H664.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 686.185 383.09)"
                        d="M658.28 382.79H714.16V383.5H658.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(46.8 685.132 384.081)"
                        d="M657.23 383.77H713.11V384.47999999999996H657.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(46.8 687.23 382.117)"
                        d="M659.33 381.8H715.21V382.51H659.33z"
                      />
                    </g>
                    <g clipPath="url(#clippath-12)">
                      <path
                        className="cls-81"
                        transform="rotate(50.99 816.413 322.936)"
                        d="M788.46 322.57H844.34V323.28H788.46z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 815.3 323.84)"
                        d="M787.34 323.48H843.22V324.19H787.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 813.063 325.654)"
                        d="M785.11 325.29H840.99V326H785.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 811.939 326.563)"
                        d="M783.99 326.19H839.87V326.9H783.99z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 810.826 327.467)"
                        d="M782.87 327.1H838.75V327.81H782.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 809.702 328.376)"
                        d="M781.75 328.01H837.63V328.71999999999997H781.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 814.176 324.75)"
                        d="M786.22 324.38H842.1V325.09H786.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 807.465 330.189)"
                        d="M779.51 329.82H835.39V330.53H779.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 806.352 331.093)"
                        d="M778.4 330.72H834.28V331.43H778.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 808.589 329.28)"
                        d="M780.63 328.91H836.51V329.62H780.63z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(50.99 805.228 332.002)"
                        d="M777.28 331.63H833.16V332.34H777.28z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 804.115 332.906)"
                        d="M776.16 332.54H832.04V333.25H776.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 801.878 334.72)"
                        d="M773.92 334.35H829.8V335.06H773.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 800.754 335.628)"
                        d="M772.8 335.25H828.68V335.96H772.8z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 799.641 336.532)"
                        d="M771.68 336.16H827.56V336.87H771.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 798.517 337.441)"
                        d="M770.57 337.07H826.45V337.78H770.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 802.991 333.815)"
                        d="M775.04 333.44H830.92V334.15H775.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 796.28 339.255)"
                        d="M768.33 338.88H824.21V339.59H768.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 795.167 340.159)"
                        d="M767.21 339.78H823.09V340.48999999999995H767.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 797.404 338.345)"
                        d="M769.45 337.97H825.33V338.68H769.45z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(50.99 794.044 341.068)"
                        d="M766.09 340.69H821.97V341.4H766.09z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 792.93 341.972)"
                        d="M764.97 341.6H820.85V342.31H764.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 790.689 343.774)"
                        d="M762.74 343.41H818.62V344.12H762.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 789.565 344.683)"
                        d="M761.62 344.31H817.5V345.02H761.62z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 788.452 345.588)"
                        d="M760.5 345.22H816.38V345.93H760.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 787.328 346.497)"
                        d="M759.38 346.13H815.26V346.84H759.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 791.802 342.87)"
                        d="M763.85 342.5H819.73V343.21H763.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 785.102 348.305)"
                        d="M757.14 347.94H813.02V348.65H757.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 783.978 349.214)"
                        d="M756.03 348.84H811.91V349.54999999999995H756.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 786.215 347.4)"
                        d="M758.26 347.03H814.14V347.73999999999995H758.26z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(50.99 782.865 350.118)"
                        d="M754.91 349.75H810.79V350.46H754.91z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 781.74 351.027)"
                        d="M753.79 350.66H809.67V351.37H753.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 779.504 352.84)"
                        d="M751.55 352.47H807.43V353.18H751.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 778.39 353.744)"
                        d="M750.43 353.37H806.31V354.08H750.43z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 777.267 354.653)"
                        d="M749.31 354.28H805.1899999999999V354.98999999999995H749.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 776.154 355.557)"
                        d="M748.2 355.19H804.08V355.9H748.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 780.628 351.931)"
                        d="M752.67 351.56H808.55V352.27H752.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 773.917 357.37)"
                        d="M745.96 357H801.84V357.71H745.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 772.793 358.28)"
                        d="M744.84 357.9H800.72V358.60999999999996H744.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 775.03 356.466)"
                        d="M747.08 356.09H802.96V356.79999999999995H747.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 771.68 359.184)"
                        d="M743.72 358.81H799.6V359.52H743.72z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(50.99 770.556 360.093)"
                        d="M742.6 359.72H798.48V360.43H742.6z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 769.443 360.997)"
                        d="M741.49 360.62H797.37V361.33H741.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 767.201 362.8)"
                        d="M739.25 362.43H795.13V363.14H739.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 766.078 363.708)"
                        d="M738.13 363.34H794.01V364.04999999999995H738.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 764.964 364.612)"
                        d="M737.01 364.25H792.89V364.96H737.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 763.84 365.522)"
                        d="M735.89 365.15H791.77V365.85999999999996H735.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 768.32 361.906)"
                        d="M740.37 361.53H796.25V362.23999999999995H740.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 761.604 367.335)"
                        d="M733.66 366.96H789.54V367.66999999999996H733.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 760.49 368.239)"
                        d="M732.54 367.87H788.42V368.58H732.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 762.727 366.426)"
                        d="M734.77 366.06H790.65V366.77H734.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 758.254 370.052)"
                        d="M730.3 369.68H786.18V370.39H730.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 757.13 370.96)"
                        d="M729.18 370.59H785.06V371.29999999999995H729.18z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 756.017 371.865)"
                        d="M728.06 371.49H783.9399999999999V372.2H728.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 754.893 372.774)"
                        d="M726.94 372.4H782.82V373.10999999999996H726.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 759.367 369.148)"
                        d="M731.42 368.78H787.3V369.48999999999995H731.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 752.656 374.587)"
                        d="M724.71 374.21H780.59V374.91999999999996H724.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 751.543 375.491)"
                        d="M723.59 375.12H779.47V375.83H723.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 753.78 373.678)"
                        d="M725.83 373.31H781.71V374.02H725.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 749.306 377.304)"
                        d="M721.35 376.93H777.23V377.64H721.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 748.193 378.208)"
                        d="M720.23 377.84H776.11V378.54999999999995H720.23z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 747.07 379.118)"
                        d="M719.12 378.74H775V379.45H719.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 745.956 380.022)"
                        d="M718 379.65H773.88V380.35999999999996H718z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 750.42 376.4)"
                        d="M722.47 376.02H778.35V376.72999999999996H722.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 743.72 381.835)"
                        d="M715.76 381.46H771.64V382.16999999999996H715.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 742.59 382.733)"
                        d="M714.64 382.37H770.52V383.08H714.64z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 744.832 380.93)"
                        d="M716.88 380.55H772.76V381.26H716.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 740.317 384.577)"
                        d="M712.36 384.21H768.24V384.91999999999996H712.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 739.193 385.486)"
                        d="M711.24 385.12H767.12V385.83H711.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 741.43 383.673)"
                        d="M713.48 383.31H769.36V384.02H713.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 738.08 386.39)"
                        d="M710.13 386.02H766.01V386.72999999999996H710.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(50.99 736.956 387.3)"
                        d="M709.01 386.93H764.89V387.64H709.01z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(50.99 735.843 388.203)"
                        d="M707.89 387.84H763.77V388.54999999999995H707.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 733.606 390.016)"
                        d="M705.65 389.65H761.53V390.35999999999996H705.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 732.482 390.925)"
                        d="M704.53 390.55H760.41V391.26H704.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 731.369 391.83)"
                        d="M703.42 391.46H759.3V392.16999999999996H703.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 730.245 392.739)"
                        d="M702.3 392.37H758.18V393.08H702.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 734.719 389.112)"
                        d="M706.77 388.74H762.65V389.45H706.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 728.008 394.552)"
                        d="M700.06 394.18H755.9399999999999V394.89H700.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 726.895 395.456)"
                        d="M698.94 395.08H754.82V395.78999999999996H698.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 729.132 393.643)"
                        d="M701.18 393.27H757.06V393.97999999999996H701.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 724.658 397.269)"
                        d="M696.7 396.9H752.58V397.60999999999996H696.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 723.535 398.178)"
                        d="M695.59 397.8H751.47V398.51H695.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 722.421 399.082)"
                        d="M694.47 398.71H750.35V399.41999999999996H694.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 721.298 399.991)"
                        d="M693.35 399.61H749.23V400.32H693.35z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 725.771 396.365)"
                        d="M697.82 395.99H753.7V396.7H697.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 719.06 401.804)"
                        d="M691.11 401.43H746.99V402.14H691.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 717.947 402.708)"
                        d="M689.99 402.33H745.87V403.03999999999996H689.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 720.184 400.895)"
                        d="M692.23 400.52H748.11V401.22999999999996H692.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 715.706 404.51)"
                        d="M687.76 404.14H743.64V404.84999999999997H687.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 714.582 405.42)"
                        d="M686.64 405.05H742.52V405.76H686.64z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(50.99 713.469 406.324)"
                        d="M685.52 405.96H741.4V406.66999999999996H685.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 712.355 407.228)"
                        d="M684.4 406.86H740.28V407.57H684.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 716.824 403.617)"
                        d="M688.88 403.24H744.76V403.95H688.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 710.119 409.041)"
                        d="M682.16 408.67H738.04V409.38H682.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(50.99 708.995 409.95)"
                        d="M681.05 409.58H736.93V410.28999999999996H681.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(50.99 711.232 408.137)"
                        d="M683.28 407.77H739.16V408.47999999999996H683.28z"
                      />
                    </g>
                    <g clipPath="url(#clippath-13)">
                      <path
                        className="cls-81"
                        transform="rotate(55.05 829.88 341.7)"
                        d="M801.99 341.4H857.87V342.10999999999996H801.99z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 828.7 342.524)"
                        d="M800.81 342.22H856.6899999999999V342.93H800.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 826.35 344.175)"
                        d="M798.45 343.87H854.33V344.58H798.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 825.17 344.998)"
                        d="M797.27 344.7H853.15V345.40999999999997H797.27z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 823.988 345.821)"
                        d="M796.09 345.52H851.97V346.22999999999996H796.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 822.806 346.644)"
                        d="M794.91 346.35H850.79V347.06H794.91z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 827.518 343.347)"
                        d="M799.63 343.05H855.51V343.76H799.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 820.448 348.3)"
                        d="M792.55 348H848.43V348.71H792.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 819.267 349.123)"
                        d="M791.37 348.82H847.25V349.53H791.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 821.625 347.467)"
                        d="M793.73 347.17H849.61V347.88H793.73z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(55.05 818.085 349.946)"
                        d="M790.19 349.65H846.07V350.35999999999996H790.19z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 816.904 350.77)"
                        d="M789.01 350.47H844.89V351.18H789.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 814.546 352.425)"
                        d="M786.65 352.12H842.53V352.83H786.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 813.364 353.248)"
                        d="M785.47 352.94H841.35V353.65H785.47z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 812.192 354.066)"
                        d="M784.29 353.77H840.17V354.47999999999996H784.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 811.01 354.89)"
                        d="M783.11 354.59H838.99V355.29999999999995H783.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 815.727 351.602)"
                        d="M787.83 351.3H843.71V352.01H787.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 808.653 356.545)"
                        d="M780.75 356.24H836.63V356.95H780.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 807.471 357.368)"
                        d="M779.57 357.07H835.45V357.78H779.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 809.834 355.722)"
                        d="M781.93 355.42H837.81V356.13H781.93z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(55.05 806.29 358.191)"
                        d="M778.39 357.89H834.27V358.59999999999997H778.39z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 805.108 359.015)"
                        d="M777.21 358.72H833.09V359.43H777.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 802.75 360.67)"
                        d="M774.85 360.37H830.73V361.08H774.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 801.569 361.493)"
                        d="M773.68 361.19H829.56V361.9H773.68z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 800.387 362.317)"
                        d="M772.5 362.02H828.38V362.72999999999996H772.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 799.216 363.135)"
                        d="M771.32 362.84H827.2V363.54999999999995H771.32z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 803.932 359.847)"
                        d="M776.03 359.54H831.91V360.25H776.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 796.858 364.79)"
                        d="M768.96 364.49H824.84V365.2H768.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 795.676 365.614)"
                        d="M767.78 365.31H823.66V366.02H767.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 798.04 363.967)"
                        d="M770.14 363.66H826.02V364.37H770.14z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(55.05 794.495 366.437)"
                        d="M766.6 366.14H822.48V366.84999999999997H766.6z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 793.313 367.26)"
                        d="M765.42 366.96H821.3V367.66999999999996H765.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 790.955 368.916)"
                        d="M763.06 368.61H818.9399999999999V369.32H763.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 789.774 369.739)"
                        d="M761.88 369.44H817.76V370.15H761.88z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 788.592 370.562)"
                        d="M760.7 370.26H816.58V370.96999999999997H760.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 787.41 371.385)"
                        d="M759.52 371.09H815.4V371.79999999999995H759.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 792.137 368.093)"
                        d="M764.24 367.79H820.12V368.5H764.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 785.062 373.036)"
                        d="M757.16 372.74H813.04V373.45H757.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 783.88 373.859)"
                        d="M755.98 373.56H811.86V374.27H755.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 786.234 372.218)"
                        d="M758.34 371.91H814.22V372.62H758.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 782.7 374.682)"
                        d="M754.8 374.39H810.68V375.09999999999997H754.8z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(55.05 781.518 375.505)"
                        d="M753.62 375.21H809.5V375.91999999999996H753.62z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 780.341 376.338)"
                        d="M752.44 376.03H808.32V376.73999999999995H752.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 777.978 377.984)"
                        d="M750.08 377.68H805.96V378.39H750.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 776.797 378.807)"
                        d="M748.9 378.51H804.78V379.21999999999997H748.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 775.615 379.63)"
                        d="M747.72 379.33H803.6V380.03999999999996H747.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 774.439 380.463)"
                        d="M746.54 380.16H802.42V380.87H746.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 779.16 377.16)"
                        d="M751.26 376.86H807.14V377.57H751.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 772.085 382.104)"
                        d="M744.18 381.81H800.06V382.52H744.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 770.904 382.927)"
                        d="M743 382.63H798.88V383.34H743z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 773.257 381.286)"
                        d="M745.36 380.98H801.24V381.69H745.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 768.546 384.583)"
                        d="M740.64 384.28H796.52V384.98999999999995H740.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 767.364 385.406)"
                        d="M739.46 385.11H795.34V385.82H739.46z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 766.183 386.23)"
                        d="M738.28 385.93H794.16V386.64H738.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 765.001 387.052)"
                        d="M737.1 386.76H792.98V387.46999999999997H737.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 769.727 383.76)"
                        d="M741.82 383.46H797.7V384.16999999999996H741.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 762.643 388.708)"
                        d="M734.74 388.4H790.62V389.10999999999996H734.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 761.462 389.531)"
                        d="M733.56 389.23H789.4399999999999V389.94H733.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 763.825 387.885)"
                        d="M735.92 387.58H791.8V388.28999999999996H735.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 759.099 391.178)"
                        d="M731.2 390.88H787.08V391.59H731.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 757.932 392.005)"
                        d="M730.02 391.7H785.9V392.40999999999997H730.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 756.75 392.828)"
                        d="M728.84 392.53H784.72V393.23999999999995H728.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 755.569 393.651)"
                        d="M727.67 393.35H783.55V394.06H727.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 760.28 390.354)"
                        d="M732.38 390.05H788.26V390.76H732.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 753.206 395.298)"
                        d="M725.31 395H781.1899999999999V395.71H725.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 752.03 396.13)"
                        d="M724.13 395.83H780.01V396.53999999999996H724.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 754.387 394.475)"
                        d="M726.49 394.18H782.37V394.89H726.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 749.623 397.811)"
                        d="M721.72 397.51H777.6V398.21999999999997H721.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 748.442 398.634)"
                        d="M720.54 398.33H776.42V399.03999999999996H720.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 750.8 396.979)"
                        d="M722.9 396.68H778.78V397.39H722.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 747.26 399.457)"
                        d="M719.36 399.16H775.24V399.87H719.36z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(55.05 746.089 400.276)"
                        d="M718.18 399.98H774.06V400.69H718.18z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(55.05 744.907 401.099)"
                        d="M717 400.81H772.88V401.52H717z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 742.549 402.754)"
                        d="M714.64 402.45H770.52V403.15999999999997H714.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 741.368 403.578)"
                        d="M713.46 403.28H769.34V403.98999999999995H713.46z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 740.186 404.4)"
                        d="M712.28 404.1H768.16V404.81H712.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 739.005 405.224)"
                        d="M711.1 404.93H766.98V405.64H711.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 743.73 401.931)"
                        d="M715.82 401.63H771.7V402.34H715.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 736.647 406.88)"
                        d="M708.75 406.58H764.63V407.28999999999996H708.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 735.465 407.703)"
                        d="M707.57 407.4H763.45V408.10999999999996H707.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 737.828 406.057)"
                        d="M709.93 405.75H765.81V406.46H709.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 733.107 409.359)"
                        d="M705.21 409.05H761.09V409.76H705.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 731.935 410.177)"
                        d="M704.03 409.88H759.91V410.59H704.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 730.754 411)"
                        d="M702.85 410.7H758.73V411.40999999999997H702.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 729.572 411.823)"
                        d="M701.67 411.53H757.55V412.23999999999995H701.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 734.284 408.526)"
                        d="M706.39 408.23H762.27V408.94H706.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 727.214 413.479)"
                        d="M699.31 413.17H755.1899999999999V413.88H699.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 726.033 414.302)"
                        d="M698.13 414H754.01V414.71H698.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 728.39 412.646)"
                        d="M700.49 412.35H756.37V413.06H700.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 723.67 415.948)"
                        d="M695.77 415.65H751.65V416.35999999999996H695.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 722.488 416.771)"
                        d="M694.59 416.47H750.47V417.18H694.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(55.05 721.312 417.604)"
                        d="M693.41 417.3H749.29V418.01H693.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 720.13 418.427)"
                        d="M692.23 418.12H748.11V418.83H692.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 724.851 415.125)"
                        d="M696.95 414.82H752.83V415.53H696.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 717.777 420.068)"
                        d="M689.87 419.77H745.75V420.47999999999996H689.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(55.05 716.595 420.891)"
                        d="M688.69 420.6H744.57V421.31H688.69z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(55.05 718.958 419.245)"
                        d="M691.05 418.95H746.93V419.65999999999997H691.05z"
                      />
                    </g>
                    <g clipPath="url(#clippath-14)">
                      <path
                        className="cls-81"
                        transform="rotate(62.38 844.892 364.638)"
                        d="M816.93 364.25H872.81V364.96H816.93z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 843.625 365.303)"
                        d="M815.66 364.92H871.54V365.63H815.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 841.069 366.637)"
                        d="M813.11 366.25H868.99V366.96H813.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 839.793 367.307)"
                        d="M811.83 366.92H867.71V367.63H811.83z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 838.517 367.978)"
                        d="M810.56 367.59H866.4399999999999V368.29999999999995H810.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 837.245 368.635)"
                        d="M809.28 368.25H865.16V368.96H809.28z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 842.344 365.966)"
                        d="M814.38 365.59H870.26V366.29999999999995H814.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 834.694 369.977)"
                        d="M806.73 369.59H862.61V370.29999999999995H806.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 833.413 370.64)"
                        d="M805.46 370.26H861.34V370.96999999999997H805.46z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 835.97 369.306)"
                        d="M808.01 368.92H863.89V369.63H808.01z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(62.38 832.137 371.31)"
                        d="M804.18 370.92H860.06V371.63H804.18z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 830.87 371.975)"
                        d="M802.91 371.59H858.79V372.29999999999995H802.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 828.314 373.308)"
                        d="M800.35 372.93H856.23V373.64H800.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 827.038 373.98)"
                        d="M799.08 373.59H854.96V374.29999999999995H799.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 825.763 374.65)"
                        d="M797.8 374.26H853.68V374.96999999999997H797.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 824.49 375.307)"
                        d="M796.53 374.93H852.41V375.64H796.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 829.59 372.638)"
                        d="M801.63 372.26H857.51V372.96999999999997H801.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 821.939 376.649)"
                        d="M793.98 376.26H849.86V376.96999999999997H793.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 820.658 377.31)"
                        d="M792.7 376.93H848.58V377.64H792.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 823.215 375.978)"
                        d="M795.25 375.59H851.13V376.29999999999995H795.25z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(62.38 819.383 377.982)"
                        d="M791.43 377.6H847.31V378.31H791.43z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 818.115 378.647)"
                        d="M790.15 378.26H846.03V378.96999999999997H790.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 815.56 379.98)"
                        d="M787.6 379.6H843.48V380.31H787.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 814.283 380.651)"
                        d="M786.33 380.27H842.21V380.97999999999996H786.33z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 813.008 381.322)"
                        d="M785.05 380.93H840.93V381.64H785.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 811.735 381.98)"
                        d="M783.77 381.6H839.65V382.31H783.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 816.84 379.318)"
                        d="M788.88 378.93H844.76V379.64H788.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 809.184 383.32)"
                        d="M781.22 382.93H837.1V383.64H781.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 807.909 383.991)"
                        d="M779.95 383.6H835.83V384.31H779.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 810.46 382.65)"
                        d="M782.5 382.27H838.38V382.97999999999996H782.5z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(62.38 806.628 384.654)"
                        d="M778.67 384.27H834.55V384.97999999999996H778.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 805.36 385.32)"
                        d="M777.4 384.94H833.28V385.65H777.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 802.804 386.652)"
                        d="M774.85 386.27H830.73V386.97999999999996H774.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 801.529 387.323)"
                        d="M773.57 386.94H829.45V387.65H773.57z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 800.253 387.994)"
                        d="M772.3 387.61H828.18V388.32H772.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 798.98 388.651)"
                        d="M771.02 388.27H826.9V388.97999999999996H771.02z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 804.085 385.99)"
                        d="M776.12 385.6H832V386.31H776.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 796.43 389.992)"
                        d="M768.47 389.61H824.35V390.32H768.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 795.154 390.663)"
                        d="M767.19 390.27H823.07V390.97999999999996H767.19z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 797.705 389.322)"
                        d="M769.75 388.94H825.63V389.65H769.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 793.873 391.325)"
                        d="M765.92 390.94H821.8V391.65H765.92z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(62.38 792.606 391.991)"
                        d="M764.64 391.61H820.52V392.32H764.64z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 791.33 392.662)"
                        d="M763.37 392.28H819.25V392.98999999999995H763.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 788.774 393.995)"
                        d="M760.82 393.61H816.7V394.32H760.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 787.498 394.665)"
                        d="M759.54 394.28H815.42V394.98999999999995H759.54z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 786.231 395.331)"
                        d="M758.27 394.95H814.15V395.65999999999997H758.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 784.95 395.994)"
                        d="M756.99 395.61H812.87V396.32H756.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 790.05 393.324)"
                        d="M762.09 392.94H817.97V393.65H762.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 782.4 397.335)"
                        d="M754.44 396.95H810.32V397.65999999999997H754.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 781.118 397.997)"
                        d="M753.17 397.61H809.05V398.32H753.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 783.675 396.664)"
                        d="M755.72 396.28H811.6V396.98999999999995H755.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 778.575 399.334)"
                        d="M750.61 398.95H806.49V399.65999999999997H750.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 777.295 399.996)"
                        d="M749.34 399.62H805.22V400.33H749.34z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 776.02 400.667)"
                        d="M748.06 400.28H803.9399999999999V400.98999999999995H748.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 774.744 401.337)"
                        d="M746.79 400.95H802.67V401.65999999999997H746.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 779.851 398.663)"
                        d="M751.89 398.28H807.77V398.98999999999995H751.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 772.196 402.665)"
                        d="M744.24 402.29H800.12V403H744.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 770.92 403.336)"
                        d="M742.96 402.95H798.84V403.65999999999997H742.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 773.468 402.008)"
                        d="M745.51 401.62H801.39V402.33H745.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 768.364 404.67)"
                        d="M740.41 404.29H796.29V405H740.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 767.088 405.34)"
                        d="M739.14 404.95H795.02V405.65999999999997H739.14z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 765.82 406.006)"
                        d="M737.86 405.62H793.74V406.33H737.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 764.545 406.676)"
                        d="M736.59 406.29H792.47V407H736.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 769.644 404.007)"
                        d="M741.69 403.62H797.57V404.33H741.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 761.989 408.01)"
                        d="M734.03 407.62H789.91V408.33H734.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 760.713 408.68)"
                        d="M732.76 408.29H788.64V409H732.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 763.264 407.339)"
                        d="M735.31 406.96H791.1899999999999V407.66999999999996H735.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 758.116 410.038)"
                        d="M730.16 409.65H786.04V410.35999999999996H730.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 756.843 410.695)"
                        d="M728.89 410.32H784.77V411.03H728.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 759.391 409.367)"
                        d="M731.44 408.98H787.32V409.69H731.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 755.568 411.366)"
                        d="M727.61 410.98H783.49V411.69H727.61z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(62.38 754.292 412.037)"
                        d="M726.33 411.65H782.21V412.35999999999996H726.33z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(62.38 753.016 412.707)"
                        d="M725.06 412.32H780.9399999999999V413.03H725.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 750.468 414.035)"
                        d="M722.51 413.65H778.39V414.35999999999996H722.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 749.193 414.706)"
                        d="M721.23 414.32H777.11V415.03H721.23z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 747.912 415.369)"
                        d="M719.96 414.99H775.84V415.7H719.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 746.637 416.04)"
                        d="M718.68 415.65H774.56V416.35999999999996H718.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 751.736 413.37)"
                        d="M723.78 412.99H779.66V413.7H723.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 744.089 417.367)"
                        d="M716.13 416.99H772.01V417.7H716.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 742.813 418.038)"
                        d="M714.86 417.66H770.74V418.37H714.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 745.36 416.71)"
                        d="M717.41 416.32H773.29V417.03H717.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 740.262 419.38)"
                        d="M712.31 418.99H768.1899999999999V419.7H712.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 738.981 420.042)"
                        d="M711.03 419.66H766.91V420.37H711.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 737.714 420.707)"
                        d="M709.75 420.33H765.63V421.03999999999996H709.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 736.438 421.378)"
                        d="M708.48 420.99H764.36V421.7H708.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 741.537 418.709)"
                        d="M713.58 418.32H769.46V419.03H713.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 733.882 422.711)"
                        d="M705.93 422.33H761.81V423.03999999999996H705.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 732.606 423.382)"
                        d="M704.65 422.99H760.53V423.7H704.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 735.157 422.04)"
                        d="M707.2 421.66H763.08V422.37H707.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 730.058 424.71)"
                        d="M702.1 424.33H757.98V425.03999999999996H702.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 728.783 425.38)"
                        d="M700.83 425H756.71V425.71H700.83z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(62.38 727.507 426.051)"
                        d="M699.55 425.66H755.43V426.37H699.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 726.226 426.714)"
                        d="M698.28 426.33H754.16V427.03999999999996H698.28z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 731.339 424.047)"
                        d="M703.38 423.66H759.26V424.37H703.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 723.683 428.05)"
                        d="M695.73 427.67H751.61V428.38H695.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(62.38 722.408 428.72)"
                        d="M694.45 428.33H750.33V429.03999999999996H694.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(62.38 724.959 427.38)"
                        d="M697 427H752.88V427.71H697z"
                      />
                    </g>
                    <g clipPath="url(#clippath-15)">
                      <path
                        className="cls-81"
                        transform="rotate(69.07 854.693 388.362)"
                        d="M826.77 388.03H882.65V388.73999999999995H826.77z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 853.348 388.88)"
                        d="M825.42 388.55H881.3V389.26H825.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 850.66 389.906)"
                        d="M822.74 389.57H878.62V390.28H822.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 849.317 390.413)"
                        d="M821.39 390.09H877.27V390.79999999999995H821.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 847.971 390.932)"
                        d="M820.05 390.6H875.93V391.31H820.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 846.626 391.45)"
                        d="M818.7 391.12H874.58V391.83H818.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 852.005 389.387)"
                        d="M824.08 389.06H879.96V389.77H824.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 843.938 392.476)"
                        d="M816.01 392.15H871.89V392.85999999999996H816.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 842.588 392.988)"
                        d="M814.67 392.66H870.55V393.37H814.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 845.283 391.957)"
                        d="M817.36 391.63H873.24V392.34H817.36z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(69.07 841.25 393.502)"
                        d="M813.33 393.17H869.21V393.88H813.33z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 839.905 394.02)"
                        d="M811.98 393.69H867.86V394.4H811.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 837.216 395.046)"
                        d="M809.29 394.72H865.17V395.43H809.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 835.871 395.565)"
                        d="M807.95 395.23H863.83V395.94H807.95z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 834.528 396.072)"
                        d="M806.6 395.75H862.48V396.46H806.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 833.183 396.59)"
                        d="M805.26 396.26H861.14V396.96999999999997H805.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 838.562 394.527)"
                        d="M810.64 394.2H866.52V394.90999999999997H810.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 830.495 397.616)"
                        d="M802.57 397.29H858.45V398H802.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 829.15 398.135)"
                        d="M801.23 397.8H857.11V398.51H801.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 831.833 397.102)"
                        d="M803.91 396.77H859.79V397.47999999999996H803.91z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(69.07 827.807 398.642)"
                        d="M799.88 398.32H855.76V399.03H799.88z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 826.462 399.16)"
                        d="M798.54 398.83H854.42V399.53999999999996H798.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 823.773 400.186)"
                        d="M795.85 399.86H851.73V400.57H795.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 822.428 400.705)"
                        d="M794.5 400.37H850.38V401.08H794.5z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 821.085 401.212)"
                        d="M793.16 400.89H849.04V401.59999999999997H793.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 819.74 401.73)"
                        d="M791.81 401.4H847.6899999999999V402.10999999999996H791.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 825.116 399.68)"
                        d="M797.19 399.35H853.07V400.06H797.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 817.052 402.756)"
                        d="M789.13 402.43H845.01V403.14H789.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 815.707 403.275)"
                        d="M787.78 402.95H843.66V403.65999999999997H787.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 818.395 402.25)"
                        d="M790.47 401.92H846.35V402.63H790.47z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(69.07 814.361 403.794)"
                        d="M786.44 403.46H842.32V404.16999999999996H786.44z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 813.018 404.3)"
                        d="M785.09 403.97H840.97V404.68H785.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 810.33 405.326)"
                        d="M782.4 405H838.28V405.71H782.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 808.985 405.845)"
                        d="M781.06 405.52H836.9399999999999V406.22999999999996H781.06z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 807.64 406.364)"
                        d="M779.72 406.03H835.6V406.73999999999995H779.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 806.297 406.87)"
                        d="M778.37 406.54H834.25V407.25H778.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 811.673 404.82)"
                        d="M783.75 404.49H839.63V405.2H783.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 803.601 407.901)"
                        d="M775.68 407.57H831.56V408.28H775.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 802.263 408.415)"
                        d="M774.34 408.09H830.22V408.79999999999995H774.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 804.952 407.39)"
                        d="M777.03 407.06H832.91V407.77H777.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 800.918 408.934)"
                        d="M772.99 408.6H828.87V409.31H772.99z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(69.07 799.575 409.44)"
                        d="M771.65 409.12H827.53V409.83H771.65z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 798.23 409.96)"
                        d="M770.3 409.63H826.18V410.34H770.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 795.542 410.985)"
                        d="M767.62 410.66H823.5V411.37H767.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 794.197 411.504)"
                        d="M766.27 411.17H822.15V411.88H766.27z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 792.854 412.01)"
                        d="M764.93 411.69H820.81V412.4H764.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 791.508 412.53)"
                        d="M763.58 412.2H819.46V412.90999999999997H763.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 796.885 410.478)"
                        d="M768.96 410.14H824.84V410.84999999999997H768.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 788.82 413.555)"
                        d="M760.89 413.23H816.77V413.94H760.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 787.475 414.074)"
                        d="M759.55 413.74H815.43V414.45H759.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 790.163 413.048)"
                        d="M762.24 412.72H818.12V413.43H762.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 784.787 415.1)"
                        d="M756.86 414.77H812.74V415.47999999999996H756.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 783.442 415.618)"
                        d="M755.52 415.29H811.4V416H755.52z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 782.099 416.125)"
                        d="M754.17 415.8H810.05V416.51H754.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 780.753 416.644)"
                        d="M752.83 416.32H808.71V417.03H752.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 786.13 414.593)"
                        d="M758.2 414.26H814.08V414.96999999999997H758.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 778.065 417.67)"
                        d="M750.14 417.34H806.02V418.04999999999995H750.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 776.72 418.188)"
                        d="M748.79 417.86H804.67V418.57H748.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 779.408 417.163)"
                        d="M751.48 416.83H807.36V417.53999999999996H751.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 774.032 419.214)"
                        d="M746.11 418.89H801.99V419.59999999999997H746.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 772.687 419.733)"
                        d="M744.76 419.4H800.64V420.10999999999996H744.76z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 771.344 420.24)"
                        d="M743.42 419.91H799.3V420.62H743.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 769.999 420.758)"
                        d="M742.07 420.43H797.95V421.14H742.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 775.37 418.7)"
                        d="M747.45 418.37H803.33V419.08H747.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 767.31 421.784)"
                        d="M739.38 421.46H795.26V422.16999999999996H739.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 765.965 422.303)"
                        d="M738.04 421.97H793.92V422.68H738.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 768.653 421.277)"
                        d="M740.73 420.94H796.61V421.65H740.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 763.228 423.351)"
                        d="M735.3 423.02H791.18V423.72999999999996H735.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 761.878 423.863)"
                        d="M733.96 423.53H789.84V424.23999999999995H733.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 764.574 422.832)"
                        d="M736.64 422.51H792.52V423.21999999999997H736.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 760.54 424.377)"
                        d="M732.61 424.05H788.49V424.76H732.61z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(69.07 759.19 424.888)"
                        d="M731.27 424.56H787.15V425.27H731.27z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(69.07 757.852 425.402)"
                        d="M729.92 425.08H785.8V425.78999999999996H729.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 755.157 426.433)"
                        d="M727.23 426.1H783.11V426.81H727.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 753.819 426.947)"
                        d="M725.89 426.62H781.77V427.33H725.89z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 752.473 427.466)"
                        d="M724.54 427.13H780.42V427.84H724.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 751.123 427.977)"
                        d="M723.2 427.65H779.08V428.35999999999996H723.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 756.507 425.921)"
                        d="M728.58 425.59H784.46V426.29999999999995H728.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 748.435 429.003)"
                        d="M720.51 428.68H776.39V429.39H720.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 747.097 429.517)"
                        d="M719.17 429.19H775.05V429.9H719.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 749.785 428.491)"
                        d="M721.86 428.16H777.74V428.87H721.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 744.402 430.547)"
                        d="M716.48 430.22H772.36V430.93H716.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 743.064 431.061)"
                        d="M715.13 430.73H771.01V431.44H715.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 741.718 431.58)"
                        d="M713.79 431.25H769.67V431.96H713.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 740.368 432.092)"
                        d="M712.45 431.76H768.33V432.46999999999997H712.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 745.752 430.036)"
                        d="M717.82 429.7H773.7V430.40999999999997H717.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 737.68 433.117)"
                        d="M709.76 432.79H765.64V433.5H709.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 736.342 433.631)"
                        d="M708.41 433.3H764.29V434.01H708.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 739.03 432.606)"
                        d="M711.1 432.28H766.98V432.98999999999995H711.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 733.647 434.662)"
                        d="M705.72 434.33H761.6V435.03999999999996H705.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 732.309 435.176)"
                        d="M704.38 434.85H760.26V435.56H704.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(69.07 730.963 435.695)"
                        d="M703.03 435.36H758.91V436.07H703.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 729.613 436.206)"
                        d="M701.69 435.88H757.57V436.59H701.69z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 734.997 434.15)"
                        d="M707.07 433.82H762.95V434.53H707.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 726.925 437.232)"
                        d="M699 436.9H754.88V437.60999999999996H699z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(69.07 725.587 437.746)"
                        d="M697.66 437.42H753.54V438.13H697.66z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(69.07 728.275 436.72)"
                        d="M700.35 436.39H756.23V437.09999999999997H700.35z"
                      />
                    </g>
                    <g clipPath="url(#clippath-16)">
                      <path
                        className="cls-81"
                        transform="rotate(73.2 863.547 416.826)"
                        d="M835.63 416.53H891.51V417.23999999999995H835.63z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 862.166 417.246)"
                        d="M834.26 416.94H890.14V417.65H834.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 859.411 418.08)"
                        d="M831.5 417.77H887.38V418.47999999999996H831.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 858.038 418.494)"
                        d="M830.12 418.19H886V418.9H830.12z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 856.657 418.914)"
                        d="M828.74 418.61H884.62V419.32H828.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 855.278 419.321)"
                        d="M827.37 419.02H883.25V419.72999999999996H827.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 860.792 417.66)"
                        d="M832.88 417.36H888.76V418.07H832.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 852.523 420.155)"
                        d="M824.61 419.86H880.49V420.57H824.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 851.143 420.575)"
                        d="M823.23 420.27H879.11V420.97999999999996H823.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 853.897 419.741)"
                        d="M825.99 419.44H881.87V420.15H825.99z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(73.2 849.769 420.99)"
                        d="M821.85 420.69H877.73V421.4H821.85z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 848.388 421.409)"
                        d="M820.48 421.1H876.36V421.81H820.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 845.633 422.243)"
                        d="M817.72 421.94H873.6V422.65H817.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 844.26 422.658)"
                        d="M816.34 422.35H872.22V423.06H816.34z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 842.874 423.07)"
                        d="M814.96 422.77H870.84V423.47999999999996H814.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 841.5 423.485)"
                        d="M813.59 423.18H869.47V423.89H813.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 847.014 421.824)"
                        d="M819.1 421.52H874.98V422.22999999999996H819.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 838.745 424.319)"
                        d="M810.83 424.02H866.71V424.72999999999996H810.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 837.365 424.738)"
                        d="M809.45 424.43H865.33V425.14H809.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 840.12 423.904)"
                        d="M812.21 423.6H868.09V424.31H812.21z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(73.2 835.99 425.153)"
                        d="M808.07 424.85H863.95V425.56H808.07z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 834.61 425.572)"
                        d="M806.7 425.26H862.58V425.96999999999997H806.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 831.85 426.4)"
                        d="M803.94 426.1H859.82V426.81H803.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 830.477 426.814)"
                        d="M802.56 426.51H858.4399999999999V427.21999999999997H802.56z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 829.096 427.234)"
                        d="M801.19 426.93H857.07V427.64H801.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 827.722 427.648)"
                        d="M799.81 427.35H855.6899999999999V428.06H799.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 833.236 425.987)"
                        d="M805.32 425.68H861.2V426.39H805.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 824.967 428.482)"
                        d="M797.05 428.18H852.93V428.89H797.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 823.587 428.902)"
                        d="M795.67 428.59H851.55V429.29999999999995H795.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 826.341 428.068)"
                        d="M798.43 427.76H854.31V428.46999999999997H798.43z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(73.2 822.213 429.316)"
                        d="M794.3 429.01H850.18V429.71999999999997H794.3z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 820.827 429.73)"
                        d="M792.92 429.43H848.8V430.14H792.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 818.072 430.563)"
                        d="M790.16 430.26H846.04V430.96999999999997H790.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 816.699 430.978)"
                        d="M788.78 430.67H844.66V431.38H788.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 815.318 431.397)"
                        d="M787.41 431.09H843.29V431.79999999999995H787.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 813.944 431.812)"
                        d="M786.03 431.51H841.91V432.21999999999997H786.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 819.453 430.144)"
                        d="M791.54 429.84H847.42V430.54999999999995H791.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 811.19 432.646)"
                        d="M783.27 432.34H839.15V433.04999999999995H783.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 809.804 433.059)"
                        d="M781.89 432.76H837.77V433.46999999999997H781.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 812.563 432.231)"
                        d="M784.65 431.92H840.53V432.63H784.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 808.43 433.473)"
                        d="M780.52 433.17H836.4V433.88H780.52z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(73.2 807.05 433.893)"
                        d="M779.14 433.59H835.02V434.29999999999995H779.14z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 805.675 434.307)"
                        d="M777.76 434H833.64V434.71H777.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 802.92 435.141)"
                        d="M775 434.84H830.88V435.54999999999995H775z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 801.547 435.556)"
                        d="M773.63 435.25H829.51V435.96H773.63z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 800.166 435.975)"
                        d="M772.25 435.67H828.13V436.38H772.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 798.792 436.39)"
                        d="M770.87 436.08H826.75V436.78999999999996H770.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 804.294 434.727)"
                        d="M776.38 434.42H832.26V435.13H776.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 796.032 437.217)"
                        d="M768.11 436.92H823.99V437.63H768.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 794.652 437.636)"
                        d="M766.74 437.33H822.62V438.03999999999996H766.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 797.406 436.802)"
                        d="M769.49 436.5H825.37V437.21H769.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 791.897 438.47)"
                        d="M763.98 438.16H819.86V438.87H763.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 790.523 438.885)"
                        d="M762.6 438.58H818.48V439.28999999999996H762.6z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 789.143 439.304)"
                        d="M761.23 439H817.11V439.71H761.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 787.769 439.719)"
                        d="M759.85 439.41H815.73V440.12H759.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 793.278 438.05)"
                        d="M765.36 437.75H821.24V438.46H765.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 785.009 440.546)"
                        d="M757.09 440.25H812.97V440.96H757.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 783.628 440.966)"
                        d="M755.71 440.66H811.59V441.37H755.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 786.383 440.132)"
                        d="M758.47 439.83H814.35V440.53999999999996H758.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 780.874 441.8)"
                        d="M752.96 441.49H808.84V442.2H752.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 779.5 442.214)"
                        d="M751.58 441.91H807.46V442.62H751.58z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 778.12 442.634)"
                        d="M750.2 442.33H806.08V443.03999999999996H750.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 776.745 443.048)"
                        d="M748.82 442.74H804.7V443.45H748.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 782.254 441.38)"
                        d="M754.34 441.08H810.22V441.78999999999996H754.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 773.986 443.876)"
                        d="M746.07 443.57H801.95V444.28H746.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 772.605 444.295)"
                        d="M744.69 443.99H800.57V444.7H744.69z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 775.36 443.461)"
                        d="M747.45 443.16H803.33V443.87H747.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 769.8 445.146)"
                        d="M741.88 444.84H797.76V445.54999999999995H741.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 768.426 445.56)"
                        d="M740.5 445.25H796.38V445.96H740.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 771.18 444.726)"
                        d="M743.26 444.42H799.14V445.13H743.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 767.045 445.98)"
                        d="M739.13 445.67H795.01V446.38H739.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(73.2 765.666 446.388)"
                        d="M737.75 446.09H793.63V446.79999999999995H737.75z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(73.2 764.286 446.807)"
                        d="M736.37 446.5H792.25V447.21H736.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 761.531 447.641)"
                        d="M733.62 447.34H789.5V448.04999999999995H733.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 760.157 448.056)"
                        d="M732.24 447.75H788.12V448.46H732.24z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 758.777 448.475)"
                        d="M730.86 448.17H786.74V448.88H730.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 757.403 448.89)"
                        d="M729.48 448.58H785.36V449.28999999999996H729.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 762.912 447.222)"
                        d="M734.99 446.92H790.87V447.63H734.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 754.643 449.717)"
                        d="M726.73 449.42H782.61V450.13H726.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 753.262 450.136)"
                        d="M725.35 449.83H781.23V450.53999999999996H725.35z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 756.022 449.31)"
                        d="M728.1 449H783.98V449.71H728.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 750.508 450.97)"
                        d="M722.59 450.66H778.47V451.37H722.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 749.134 451.385)"
                        d="M721.21 451.08H777.09V451.78999999999996H721.21z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 747.753 451.805)"
                        d="M719.84 451.5H775.72V452.21H719.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 746.38 452.22)"
                        d="M718.46 451.91H774.34V452.62H718.46z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 751.888 450.551)"
                        d="M723.97 450.25H779.85V450.96H723.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 743.62 453.046)"
                        d="M715.7 452.74H771.58V453.45H715.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 742.239 453.466)"
                        d="M714.32 453.16H770.2V453.87H714.32z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 744.999 452.639)"
                        d="M717.08 452.33H772.96V453.03999999999996H717.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 739.484 454.3)"
                        d="M711.57 453.99H767.45V454.7H711.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 738.11 454.714)"
                        d="M710.19 454.41H766.07V455.12H710.19z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(73.2 736.73 455.134)"
                        d="M708.81 454.83H764.6899999999999V455.53999999999996H708.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 735.356 455.548)"
                        d="M707.43 455.24H763.31V455.95H707.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 740.865 453.88)"
                        d="M712.95 453.58H768.83V454.28999999999996H712.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 732.601 456.382)"
                        d="M704.68 456.07H760.56V456.78H704.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(73.2 731.216 456.795)"
                        d="M703.3 456.49H759.18V457.2H703.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(73.2 733.975 455.968)"
                        d="M706.06 455.66H761.9399999999999V456.37H706.06z"
                      />
                    </g>
                    <g clipPath="url(#clippath-17)">
                      <path
                        className="cls-81"
                        transform="rotate(75.49 871.713 447.859)"
                        d="M843.75 447.45H899.63V448.15999999999997H843.75z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 870.321 448.223)"
                        d="M842.36 447.81H898.24V448.52H842.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 867.54 448.94)"
                        d="M839.57 448.53H895.45V449.23999999999995H839.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 866.144 449.298)"
                        d="M838.18 448.89H894.06V449.59999999999997H838.18z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 864.747 449.656)"
                        d="M836.79 449.25H892.67V449.96H836.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 863.356 450.02)"
                        d="M835.39 449.62H891.27V450.33H835.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 868.931 448.576)"
                        d="M840.97 448.17H896.85V448.88H840.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 860.569 450.743)"
                        d="M832.61 450.34H888.49V451.04999999999995H832.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 859.172 451.1)"
                        d="M831.21 450.7H887.09V451.40999999999997H831.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 861.96 450.379)"
                        d="M834 449.98H889.88V450.69H834z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(75.49 857.78 451.465)"
                        d="M829.82 451.06H885.7V451.77H829.82z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 856.385 451.823)"
                        d="M828.42 451.42H884.3V452.13H828.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 853.597 452.545)"
                        d="M825.64 452.14H881.52V452.84999999999997H825.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 852.206 452.91)"
                        d="M824.24 452.5H880.12V453.21H824.24z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 850.81 453.268)"
                        d="M822.85 452.86H878.73V453.57H822.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 849.42 453.62)"
                        d="M821.46 453.22H877.34V453.93H821.46z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 854.993 452.187)"
                        d="M827.03 451.78H882.91V452.48999999999995H827.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 846.632 454.343)"
                        d="M818.67 453.94H874.55V454.65H818.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 845.24 454.707)"
                        d="M817.28 454.3H873.16V455.01H817.28z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 848.028 453.985)"
                        d="M820.06 453.58H875.9399999999999V454.28999999999996H820.06z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(75.49 843.844 455.065)"
                        d="M815.88 454.66H871.76V455.37H815.88z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 842.453 455.43)"
                        d="M814.49 455.02H870.37V455.72999999999996H814.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 839.665 456.151)"
                        d="M811.7 455.74H867.58V456.45H811.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 838.269 456.51)"
                        d="M810.31 456.11H866.1899999999999V456.82H810.31z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 836.878 456.874)"
                        d="M808.92 456.47H864.8V457.18H808.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 835.481 457.232)"
                        d="M807.52 456.83H863.4V457.53999999999996H807.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 841.057 455.787)"
                        d="M813.1 455.38H868.98V456.09H813.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 832.694 457.954)"
                        d="M804.74 457.55H860.62V458.26H804.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 831.297 458.312)"
                        d="M803.34 457.91H859.22V458.62H803.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 834.09 457.596)"
                        d="M806.13 457.19H862.01V457.9H806.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(75.49 829.906 458.676)"
                        d="M801.95 458.27H857.83V458.97999999999996H801.95z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 828.516 459.029)"
                        d="M800.55 458.63H856.43V459.34H800.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 825.728 459.751)"
                        d="M797.77 459.35H853.65V460.06H797.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 824.337 460.116)"
                        d="M796.37 459.71H852.25V460.41999999999996H796.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 822.94 460.473)"
                        d="M794.98 460.07H850.86V460.78H794.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 821.55 460.838)"
                        d="M793.59 460.43H849.47V461.14H793.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 827.125 459.393)"
                        d="M799.16 458.99H855.04V459.7H799.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 818.762 461.56)"
                        d="M790.8 461.15H846.68V461.85999999999996H790.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 817.366 461.918)"
                        d="M789.41 461.51H845.29V462.21999999999997H789.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 820.153 461.196)"
                        d="M792.19 460.79H848.07V461.5H792.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 815.97 462.276)"
                        d="M788.01 461.87H843.89V462.58H788.01z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(75.49 814.578 462.64)"
                        d="M786.62 462.23H842.5V462.94H786.62z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 813.182 462.998)"
                        d="M785.23 462.59H841.11V463.29999999999995H785.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 810.394 463.72)"
                        d="M782.44 463.32H838.32V464.03H782.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 809.003 464.085)"
                        d="M781.05 463.68H836.93V464.39H781.05z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 807.613 464.437)"
                        d="M779.65 464.04H835.53V464.75H779.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 806.222 464.802)"
                        d="M778.26 464.4H834.14V465.10999999999996H778.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 811.79 463.362)"
                        d="M783.83 462.96H839.71V463.66999999999996H783.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 803.434 465.524)"
                        d="M775.47 465.12H831.35V465.83H775.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 802.038 465.882)"
                        d="M774.08 465.48H829.96V466.19H774.08z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 804.825 465.16)"
                        d="M776.86 464.76H832.74V465.46999999999997H776.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 799.25 466.604)"
                        d="M771.29 466.2H827.17V466.90999999999997H771.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 797.854 466.962)"
                        d="M769.9 466.56H825.78V467.27H769.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 796.462 467.326)"
                        d="M768.5 466.92H824.38V467.63H768.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 795.066 467.684)"
                        d="M767.11 467.28H822.99V467.98999999999995H767.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 800.641 466.24)"
                        d="M772.68 465.84H828.56V466.54999999999995H772.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 792.278 468.407)"
                        d="M764.32 468H820.2V468.71H764.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 790.887 468.77)"
                        d="M762.93 468.36H818.81V469.07H762.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 793.675 468.049)"
                        d="M765.72 467.64H821.6V468.34999999999997H765.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 788.106 469.488)"
                        d="M760.14 469.08H816.02V469.78999999999996H760.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 786.71 469.846)"
                        d="M758.75 469.45H814.63V470.15999999999997H758.75z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 785.318 470.21)"
                        d="M757.36 469.81H813.24V470.52H757.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 783.922 470.568)"
                        d="M755.96 470.17H811.84V470.88H755.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 789.49 469.129)"
                        d="M761.54 468.72H817.42V469.43H761.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 781.134 471.29)"
                        d="M753.18 470.89H809.06V471.59999999999997H753.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 779.738 471.648)"
                        d="M751.78 471.25H807.66V471.96H751.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 782.526 470.926)"
                        d="M754.57 470.53H810.45V471.23999999999995H754.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 776.902 472.388)"
                        d="M748.94 471.98H804.82V472.69H748.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 775.505 472.746)"
                        d="M747.55 472.34H803.43V473.04999999999995H747.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 778.293 472.023)"
                        d="M750.34 471.62H806.22V472.33H750.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 774.114 473.11)"
                        d="M746.16 472.7H802.04V473.40999999999997H746.16z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(75.49 772.718 473.468)"
                        d="M744.76 473.06H800.64V473.77H744.76z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(75.49 771.326 473.832)"
                        d="M743.37 473.42H799.25V474.13H743.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 768.534 474.548)"
                        d="M740.58 474.15H796.46V474.85999999999996H740.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 767.149 474.907)"
                        d="M739.19 474.51H795.07V475.21999999999997H739.19z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 765.752 475.265)"
                        d="M737.79 474.87H793.67V475.58H737.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 764.361 475.63)"
                        d="M736.4 475.23H792.28V475.94H736.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 769.93 474.19)"
                        d="M741.98 473.78H797.86V474.48999999999995H741.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 761.573 476.352)"
                        d="M733.61 475.95H789.49V476.65999999999997H733.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 760.177 476.71)"
                        d="M732.22 476.31H788.1V477.02H732.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 762.965 475.987)"
                        d="M735.01 475.59H790.89V476.29999999999995H735.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 757.39 477.432)"
                        d="M729.43 477.03H785.31V477.73999999999995H729.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 755.998 477.796)"
                        d="M728.04 477.39H783.92V478.09999999999997H728.04z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 754.602 478.154)"
                        d="M726.65 477.75H782.53V478.46H726.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 753.206 478.512)"
                        d="M725.25 478.11H781.13V478.82H725.25z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 758.786 477.074)"
                        d="M730.83 476.67H786.71V477.38H730.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 750.418 479.234)"
                        d="M722.47 478.83H778.35V479.53999999999996H722.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 749.027 479.599)"
                        d="M721.07 479.19H776.95V479.9H721.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 751.814 478.876)"
                        d="M723.86 478.47H779.74V479.18H723.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 746.245 480.316)"
                        d="M718.29 479.91H774.17V480.62H718.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 744.85 480.674)"
                        d="M716.89 480.27H772.77V480.97999999999996H716.89z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(75.49 743.458 481.038)"
                        d="M715.5 480.64H771.38V481.34999999999997H715.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 742.061 481.396)"
                        d="M714.11 481H769.99V481.71H714.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 747.63 479.956)"
                        d="M719.68 479.55H775.56V480.26H719.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 739.274 482.118)"
                        d="M711.32 481.72H767.2V482.43H711.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(75.49 737.883 482.482)"
                        d="M709.92 482.08H765.8V482.78999999999996H709.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(75.49 740.67 481.76)"
                        d="M712.71 481.36H768.59V482.07H712.71z"
                      />
                    </g>
                    <g clipPath="url(#clippath-18)">
                      <path
                        className="cls-81"
                        transform="rotate(79.76 877.945 483.419)"
                        d="M850 483.05H905.88V483.76H850z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 876.532 483.674)"
                        d="M848.59 483.31H904.47V484.02H848.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 873.696 484.184)"
                        d="M845.75 483.82H901.63V484.53H845.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 872.278 484.445)"
                        d="M844.34 484.08H900.22V484.78999999999996H844.34z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 870.866 484.7)"
                        d="M842.92 484.33H898.8V485.03999999999996H842.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 869.448 484.95)"
                        d="M841.5 484.59H897.38V485.29999999999995H841.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 875.114 483.935)"
                        d="M847.17 483.56H903.05V484.27H847.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 866.617 485.466)"
                        d="M838.67 485.1H894.55V485.81H838.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 865.199 485.726)"
                        d="M837.25 485.36H893.13V486.07H837.25z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 868.03 485.21)"
                        d="M840.09 484.84H895.97V485.54999999999995H840.09z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(79.76 863.781 485.975)"
                        d="M835.84 485.61H891.72V486.32H835.84z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 862.363 486.236)"
                        d="M834.42 485.87H890.3V486.58H834.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 859.527 486.746)"
                        d="M831.59 486.38H887.47V487.09H831.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 858.114 487.001)"
                        d="M830.17 486.63H886.05V487.34H830.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 856.702 487.257)"
                        d="M828.76 486.89H884.64V487.59999999999997H828.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 855.283 487.517)"
                        d="M827.34 487.15H883.22V487.85999999999996H827.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 860.95 486.491)"
                        d="M833 486.12H888.88V486.83H833z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 852.448 488.027)"
                        d="M824.51 487.66H880.39V488.37H824.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 851.035 488.282)"
                        d="M823.09 487.91H878.97V488.62H823.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 853.866 487.767)"
                        d="M825.92 487.4H881.8V488.10999999999996H825.92z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(79.76 849.612 488.537)"
                        d="M821.67 488.17H877.55V488.88H821.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 848.2 488.792)"
                        d="M820.26 488.43H876.14V489.14H820.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 845.363 489.302)"
                        d="M817.42 488.94H873.3V489.65H817.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 843.95 489.558)"
                        d="M816.01 489.19H871.89V489.9H816.01z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 842.532 489.818)"
                        d="M814.59 489.45H870.47V490.15999999999997H814.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 841.12 490.074)"
                        d="M813.17 489.7H869.05V490.40999999999997H813.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 846.787 489.048)"
                        d="M818.84 488.68H874.72V489.39H818.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 838.284 490.583)"
                        d="M810.34 490.22H866.22V490.93H810.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 836.871 490.839)"
                        d="M808.92 490.47H864.8V491.18H808.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 839.696 490.328)"
                        d="M811.76 489.96H867.64V490.66999999999996H811.76z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(79.76 835.448 491.093)"
                        d="M807.51 490.73H863.39V491.44H807.51z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 834.036 491.349)"
                        d="M806.09 490.98H861.97V491.69H806.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 831.205 491.865)"
                        d="M803.26 491.5H859.14V492.21H803.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 829.781 492.12)"
                        d="M801.84 491.75H857.72V492.46H801.84z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 828.369 492.375)"
                        d="M800.43 492.01H856.31V492.71999999999997H800.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 826.956 492.63)"
                        d="M799.01 492.26H854.89V492.96999999999997H799.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 832.617 491.61)"
                        d="M804.68 491.24H860.56V491.95H804.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 824.12 493.14)"
                        d="M796.18 492.77H852.06V493.47999999999996H796.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 822.702 493.4)"
                        d="M794.76 493.03H850.64V493.73999999999995H794.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 825.533 492.884)"
                        d="M797.59 492.52H853.47V493.22999999999996H797.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 821.29 493.656)"
                        d="M793.34 493.29H849.22V494H793.34z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(79.76 819.866 493.91)"
                        d="M791.93 493.54H847.81V494.25H791.93z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 818.453 494.166)"
                        d="M790.51 493.8H846.39V494.51H790.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 815.618 494.676)"
                        d="M787.68 494.31H843.56V495.02H787.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 814.205 494.931)"
                        d="M786.26 494.57H842.14V495.28H786.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 812.787 495.191)"
                        d="M784.84 494.82H840.72V495.53H784.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 811.37 495.44)"
                        d="M783.43 495.08H839.31V495.78999999999996H783.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 817.041 494.421)"
                        d="M789.09 494.05H844.97V494.76H789.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 808.538 495.957)"
                        d="M780.6 495.59H836.48V496.29999999999995H780.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 807.126 496.212)"
                        d="M779.18 495.85H835.06V496.56H779.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 809.95 495.701)"
                        d="M782.01 495.33H837.89V496.03999999999996H782.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 804.29 496.722)"
                        d="M776.35 496.36H832.23V497.07H776.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 802.871 496.983)"
                        d="M774.93 496.61H830.81V497.32H774.93z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 801.454 497.232)"
                        d="M773.51 496.87H829.39V497.58H773.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 800.035 497.492)"
                        d="M772.1 497.12H827.98V497.83H772.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 805.702 496.467)"
                        d="M777.76 496.1H833.64V496.81H777.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 797.21 498.003)"
                        d="M769.26 497.64H825.14V498.34999999999997H769.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 795.787 498.258)"
                        d="M767.85 497.89H823.73V498.59999999999997H767.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 798.623 497.748)"
                        d="M770.68 497.38H826.56V498.09H770.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 792.956 498.774)"
                        d="M765.01 498.4H820.89V499.10999999999996H765.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 791.539 499.023)"
                        d="M763.6 498.66H819.48V499.37H763.6z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 790.12 499.284)"
                        d="M762.18 498.92H818.06V499.63H762.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 788.708 499.539)"
                        d="M760.76 499.17H816.64V499.88H760.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 794.375 498.513)"
                        d="M766.43 498.15H822.31V498.85999999999996H766.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 785.872 500.049)"
                        d="M757.93 499.68H813.81V500.39H757.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 784.46 500.304)"
                        d="M756.52 499.94H812.4V500.65H756.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 787.295 499.794)"
                        d="M759.35 499.43H815.23V500.14H759.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 781.573 500.826)"
                        d="M753.63 500.46H809.51V501.16999999999996H753.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 780.16 501.082)"
                        d="M752.21 500.72H808.09V501.43H752.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 782.985 500.57)"
                        d="M755.05 500.2H810.93V500.90999999999997H755.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 778.737 501.336)"
                        d="M750.8 500.97H806.68V501.68H750.8z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(79.76 777.324 501.592)"
                        d="M749.38 501.23H805.26V501.94H749.38z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(79.76 775.906 501.852)"
                        d="M747.96 501.48H803.84V502.19H747.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 773.07 502.362)"
                        d="M745.13 502H801.01V502.71H745.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 771.657 502.617)"
                        d="M743.71 502.25H799.59V502.96H743.71z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 770.239 502.878)"
                        d="M742.3 502.51H798.18V503.21999999999997H742.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 768.821 503.127)"
                        d="M740.88 502.76H796.76V503.46999999999997H740.88z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 774.493 502.107)"
                        d="M746.55 501.74H802.43V502.45H746.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 765.99 503.643)"
                        d="M738.05 503.27H793.93V503.97999999999996H738.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 764.578 503.899)"
                        d="M736.63 503.53H792.51V504.23999999999995H736.63z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 767.409 503.383)"
                        d="M739.47 503.02H795.35V503.72999999999996H739.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 761.742 504.408)"
                        d="M733.8 504.04H789.68V504.75H733.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 760.324 504.669)"
                        d="M732.38 504.3H788.26V505.01H732.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 758.906 504.918)"
                        d="M730.97 504.55H786.85V505.26H730.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 757.494 505.174)"
                        d="M729.55 504.81H785.43V505.52H729.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 763.155 504.153)"
                        d="M735.22 503.79H791.1V504.5H735.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 754.658 505.684)"
                        d="M726.72 505.32H782.6V506.03H726.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 753.24 505.944)"
                        d="M725.3 505.58H781.18V506.28999999999996H725.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 756.075 505.434)"
                        d="M728.13 505.07H784.01V505.78H728.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 750.408 506.46)"
                        d="M722.47 506.09H778.35V506.79999999999995H722.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 748.991 506.71)"
                        d="M721.05 506.34H776.93V507.04999999999995H721.05z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(79.76 747.578 506.965)"
                        d="M719.63 506.6H775.51V507.31H719.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 746.16 507.225)"
                        d="M718.22 506.86H774.1V507.57H718.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 751.827 506.2)"
                        d="M723.88 505.83H779.76V506.53999999999996H723.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 743.324 507.735)"
                        d="M715.39 507.37H771.27V508.08H715.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(79.76 741.912 507.99)"
                        d="M713.97 507.62H769.85V508.33H713.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(79.76 744.743 507.475)"
                        d="M716.8 507.11H772.68V507.82H716.8z"
                      />
                    </g>
                    <g clipPath="url(#clippath-19)">
                      <path
                        className="cls-81"
                        transform="rotate(84.71 880.559 517.952)"
                        d="M852.63 517.62H908.51V518.33H852.63z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 879.13 518.08)"
                        d="M851.2 517.75H907.08V518.46H851.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 876.26 518.347)"
                        d="M848.33 518.01H904.21V518.72H848.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 874.824 518.48)"
                        d="M846.9 518.15H902.78V518.86H846.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 873.4 518.614)"
                        d="M845.46 518.28H901.34V518.99H845.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 871.964 518.747)"
                        d="M844.03 518.41H899.91V519.12H844.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 877.694 518.214)"
                        d="M849.76 517.88H905.64V518.59H849.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 869.094 519.014)"
                        d="M841.16 518.68H897.04V519.39H841.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 867.66 519.147)"
                        d="M839.73 518.81H895.61V519.52H839.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 870.53 518.88)"
                        d="M842.6 518.55H898.48V519.26H842.6z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(84.71 866.23 519.276)"
                        d="M838.3 518.94H894.18V519.6500000000001H838.3z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 864.795 519.409)"
                        d="M836.86 519.08H892.74V519.7900000000001H836.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 861.924 519.676)"
                        d="M834 519.34H889.88V520.0500000000001H834z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 860.5 519.81)"
                        d="M832.56 519.48H888.4399999999999V520.19H832.56z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 859.065 519.943)"
                        d="M831.13 519.61H887.01V520.32H831.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 857.63 520.076)"
                        d="M829.7 519.74H885.58V520.45H829.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 863.36 519.542)"
                        d="M835.43 519.21H891.31V519.9200000000001H835.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 854.765 520.338)"
                        d="M826.83 520.01H882.71V520.72H826.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 853.33 520.471)"
                        d="M825.4 520.14H881.28V520.85H825.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 856.195 520.21)"
                        d="M828.26 519.87H884.14V520.58H828.26z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(84.71 851.895 520.605)"
                        d="M823.96 520.27H879.84V520.98H823.96z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 850.46 520.738)"
                        d="M822.53 520.4H878.41V521.11H822.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 847.6 521.005)"
                        d="M819.66 520.67H875.54V521.38H819.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 846.165 521.138)"
                        d="M818.23 520.8H874.11V521.51H818.23z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 844.73 521.272)"
                        d="M816.8 520.94H872.68V521.6500000000001H816.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 843.295 521.405)"
                        d="M815.36 521.07H871.24V521.7800000000001H815.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 849.03 520.866)"
                        d="M821.1 520.54H876.98V521.25H821.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 840.43 521.667)"
                        d="M812.5 521.33H868.38V522.0400000000001H812.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 838.995 521.8)"
                        d="M811.06 521.47H866.9399999999999V522.1800000000001H811.06z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 841.865 521.533)"
                        d="M813.93 521.2H869.81V521.9100000000001H813.93z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(84.71 837.56 521.933)"
                        d="M809.63 521.6H865.51V522.3100000000001H809.63z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 836.13 522.062)"
                        d="M808.2 521.73H864.08V522.44H808.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 833.265 522.334)"
                        d="M805.33 522H861.21V522.71H805.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 831.83 522.467)"
                        d="M803.9 522.13H859.78V522.84H803.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 830.4 522.595)"
                        d="M802.46 522.26H858.34V522.97H802.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 828.966 522.729)"
                        d="M801.03 522.4H856.91V523.11H801.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 834.7 522.2)"
                        d="M806.76 521.86H862.64V522.57H806.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 826.095 522.995)"
                        d="M798.17 522.66H854.05V523.37H798.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 824.666 523.124)"
                        d="M796.73 522.79H852.61V523.5H796.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 827.53 522.862)"
                        d="M799.6 522.53H855.48V523.24H799.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 823.23 523.257)"
                        d="M795.3 522.93H851.18V523.64H795.3z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(84.71 821.8 523.396)"
                        d="M793.87 523.06H849.75V523.77H793.87z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 820.366 523.53)"
                        d="M792.43 523.19H848.31V523.9000000000001H792.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 817.501 523.79)"
                        d="M789.57 523.46H845.45V524.1700000000001H789.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 816.066 523.924)"
                        d="M788.13 523.59H844.01V524.3000000000001H788.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 814.63 524.058)"
                        d="M786.7 523.72H842.58V524.4300000000001H786.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 813.196 524.19)"
                        d="M785.27 523.86H841.15V524.57H785.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 818.93 523.663)"
                        d="M791 523.32H846.88V524.0300000000001H791z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 810.331 524.453)"
                        d="M782.4 524.12H838.28V524.83H782.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 808.901 524.591)"
                        d="M780.97 524.25H836.85V524.96H780.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 811.766 524.32)"
                        d="M783.83 523.99H839.71V524.7H783.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 806.036 524.853)"
                        d="M778.1 524.52H833.98V525.23H778.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 804.601 524.986)"
                        d="M776.67 524.65H832.55V525.36H776.67z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 803.166 525.12)"
                        d="M775.23 524.78H831.11V525.49H775.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 801.731 525.253)"
                        d="M773.8 524.92H829.68V525.63H773.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 807.466 524.725)"
                        d="M779.53 524.39H835.41V525.1H779.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 798.866 525.515)"
                        d="M770.93 525.18H826.81V525.89H770.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 797.431 525.648)"
                        d="M769.5 525.32H825.38V526.0300000000001H769.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 800.302 525.381)"
                        d="M772.37 525.05H828.25V525.76H772.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 794.566 525.92)"
                        d="M766.63 525.58H822.51V526.2900000000001H766.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 793.137 526.049)"
                        d="M765.2 525.71H821.08V526.4200000000001H765.2z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 791.702 526.182)"
                        d="M763.77 525.85H819.65V526.5600000000001H763.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 790.267 526.315)"
                        d="M762.33 525.98H818.21V526.69H762.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 796.001 525.787)"
                        d="M768.07 525.45H823.95V526.1600000000001H768.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 787.402 526.577)"
                        d="M759.47 526.25H815.35V526.96H759.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 785.967 526.71)"
                        d="M758.03 526.38H813.91V527.09H758.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 788.831 526.449)"
                        d="M760.9 526.11H816.78V526.82H760.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 783.05 526.98)"
                        d="M755.11 526.65H810.99V527.36H755.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 781.614 527.113)"
                        d="M753.68 526.78H809.56V527.49H753.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 784.479 526.852)"
                        d="M756.55 526.52H812.43V527.23H756.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 780.18 527.247)"
                        d="M752.25 526.91H808.13V527.62H752.25z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(84.71 778.749 527.385)"
                        d="M750.81 527.05H806.6899999999999V527.76H750.81z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(84.71 777.32 527.514)"
                        d="M749.38 527.18H805.26V527.89H749.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 774.45 527.78)"
                        d="M746.51 527.44H802.39V528.1500000000001H746.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 773.014 527.914)"
                        d="M745.08 527.58H800.96V528.2900000000001H745.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 771.58 528.047)"
                        d="M743.65 527.71H799.53V528.4200000000001H743.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 770.15 528.175)"
                        d="M742.21 527.84H798.09V528.5500000000001H742.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 775.884 527.647)"
                        d="M747.95 527.31H803.83V528.02H747.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 767.28 528.442)"
                        d="M739.35 528.11H795.23V528.82H739.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 765.844 528.575)"
                        d="M737.91 528.24H793.79V528.95H737.91z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 768.714 528.309)"
                        d="M740.78 527.98H796.66V528.69H740.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 762.985 528.843)"
                        d="M735.05 528.51H790.93V529.22H735.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 761.55 528.976)"
                        d="M733.62 528.64H789.5V529.35H733.62z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 760.115 529.11)"
                        d="M732.18 528.77H788.06V529.48H732.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 758.685 529.238)"
                        d="M730.75 528.9H786.63V529.61H730.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 764.42 528.71)"
                        d="M736.48 528.37H792.36V529.08H736.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 755.815 529.504)"
                        d="M727.88 529.17H783.76V529.88H727.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 754.38 529.638)"
                        d="M726.45 529.3H782.33V530.01H726.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 757.25 529.37)"
                        d="M729.32 529.04H785.2V529.75H729.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 751.52 529.905)"
                        d="M723.58 529.57H779.46V530.2800000000001H723.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 750.085 530.038)"
                        d="M722.15 529.7H778.03V530.4100000000001H722.15z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(84.71 748.65 530.171)"
                        d="M720.72 529.83H776.6V530.5400000000001H720.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 747.215 530.305)"
                        d="M719.28 529.97H775.16V530.6800000000001H719.28z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 752.945 529.77)"
                        d="M725.02 529.44H780.9V530.1500000000001H725.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 744.35 530.566)"
                        d="M716.42 530.23H772.3V530.94H716.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(84.71 742.915 530.7)"
                        d="M714.98 530.37H770.86V531.08H714.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(84.71 745.785 530.433)"
                        d="M717.85 530.1H773.73V530.8100000000001H717.85z"
                      />
                    </g>
                    <g clipPath="url(#clippath-20)">
                      <path
                        className="cls-81"
                        transform="rotate(88.31 869.696 551.843)"
                        d="M841.75 551.48H897.63V552.19H841.75z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 868.259 551.888)"
                        d="M840.32 551.52H896.2V552.23H840.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 865.38 551.972)"
                        d="M837.44 551.61H893.32V552.32H837.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 863.938 552.012)"
                        d="M836 551.65H891.88V552.36H836z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 862.5 552.056)"
                        d="M834.56 551.69H890.4399999999999V552.4000000000001H834.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 861.063 552.101)"
                        d="M833.12 551.73H889V552.44H833.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 866.817 551.927)"
                        d="M838.88 551.57H894.76V552.2800000000001H838.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 858.184 552.186)"
                        d="M830.24 551.82H886.12V552.5300000000001H830.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 856.742 552.225)"
                        d="M828.81 551.86H884.6899999999999V552.57H828.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 859.621 552.14)"
                        d="M831.68 551.78H887.56V552.49H831.68z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(88.31 855.31 552.265)"
                        d="M827.37 551.9H883.25V552.61H827.37z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 853.873 552.31)"
                        d="M825.93 551.95H881.81V552.6600000000001H825.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 850.993 552.394)"
                        d="M823.05 552.03H878.93V552.74H823.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 849.551 552.434)"
                        d="M821.61 552.07H877.49V552.7800000000001H821.61z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 848.114 552.479)"
                        d="M820.17 552.12H876.05V552.83H820.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 846.677 552.523)"
                        d="M818.73 552.16H874.61V552.87H818.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 852.43 552.35)"
                        d="M824.49 551.99H880.37V552.7H824.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 843.798 552.608)"
                        d="M815.86 552.24H871.74V552.95H815.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 842.355 552.648)"
                        d="M814.42 552.29H870.3V553H814.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 845.235 552.563)"
                        d="M817.3 552.2H873.18V552.9100000000001H817.3z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(88.31 840.918 552.692)"
                        d="M812.98 552.33H868.86V553.0400000000001H812.98z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 839.481 552.737)"
                        d="M811.54 552.37H867.42V553.08H811.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 836.602 552.822)"
                        d="M808.66 552.46H864.54V553.1700000000001H808.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 835.165 552.866)"
                        d="M807.22 552.5H863.1V553.21H807.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 833.728 552.901)"
                        d="M805.79 552.54H861.67V553.25H805.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 832.29 552.946)"
                        d="M804.35 552.58H860.23V553.2900000000001H804.35z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 838.039 552.777)"
                        d="M810.1 552.41H865.98V553.12H810.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 829.411 553.03)"
                        d="M801.47 552.67H857.35V553.38H801.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 827.974 553.075)"
                        d="M800.03 552.71H855.91V553.4200000000001H800.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 830.848 552.985)"
                        d="M802.91 552.63H858.79V553.34H802.91z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(88.31 826.532 553.115)"
                        d="M798.59 552.75H854.47V553.46H798.59z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 825.095 553.16)"
                        d="M797.15 552.8H853.03V553.51H797.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 822.215 553.244)"
                        d="M794.28 552.88H850.16V553.59H794.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 820.778 553.289)"
                        d="M792.84 552.92H848.72V553.63H792.84z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 819.336 553.328)"
                        d="M791.4 552.97H847.28V553.6800000000001H791.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 817.899 553.373)"
                        d="M789.96 553.01H845.84V553.72H789.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 823.653 553.2)"
                        d="M795.71 552.84H851.59V553.5500000000001H795.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 815.02 553.458)"
                        d="M787.08 553.09H842.96V553.8000000000001H787.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 813.582 553.502)"
                        d="M785.64 553.13H841.52V553.84H785.64z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 816.457 553.413)"
                        d="M788.52 553.05H844.4V553.76H788.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 812.145 553.537)"
                        d="M784.2 553.18H840.08V553.89H784.2z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(88.31 810.708 553.582)"
                        d="M782.77 553.22H838.65V553.9300000000001H782.77z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 809.266 553.621)"
                        d="M781.33 553.26H837.21V553.97H781.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 806.392 553.711)"
                        d="M778.45 553.35H834.33V554.0600000000001H778.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 804.95 553.75)"
                        d="M777.01 553.39H832.89V554.1H777.01z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 803.513 553.795)"
                        d="M775.57 553.43H831.45V554.14H775.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 802.07 553.835)"
                        d="M774.13 553.47H830.01V554.1800000000001H774.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 807.829 553.666)"
                        d="M779.89 553.3H835.77V554.01H779.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 799.196 553.925)"
                        d="M771.26 553.56H827.14V554.27H771.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 797.754 553.964)"
                        d="M769.82 553.6H825.7V554.3100000000001H769.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 800.633 553.88)"
                        d="M772.69 553.52H828.57V554.23H772.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 794.875 554.049)"
                        d="M766.94 553.69H822.82V554.4000000000001H766.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 793.437 554.093)"
                        d="M765.5 553.73H821.38V554.44H765.5z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 792.005 554.133)"
                        d="M764.06 553.77H819.9399999999999V554.48H764.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 790.563 554.173)"
                        d="M762.62 553.81H818.5V554.52H762.62z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 796.317 554.01)"
                        d="M768.38 553.64H824.26V554.35H768.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 787.684 554.257)"
                        d="M759.74 553.9H815.62V554.61H759.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 786.247 554.302)"
                        d="M758.31 553.94H814.1899999999999V554.6500000000001H758.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 789.126 554.218)"
                        d="M761.18 553.86H817.06V554.57H761.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 783.367 554.387)"
                        d="M755.43 554.03H811.31V554.74H755.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 781.93 554.431)"
                        d="M753.99 554.07H809.87V554.7800000000001H753.99z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 780.493 554.476)"
                        d="M752.55 554.11H808.43V554.82H752.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 779.051 554.516)"
                        d="M751.11 554.15H806.99V554.86H751.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 784.81 554.347)"
                        d="M756.87 553.98H812.75V554.69H756.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 776.172 554.6)"
                        d="M748.23 554.24H804.11V554.95H748.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 774.735 554.645)"
                        d="M746.8 554.28H802.68V554.99H746.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 777.614 554.56)"
                        d="M749.67 554.2H805.55V554.9100000000001H749.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 771.804 554.729)"
                        d="M743.87 554.37H799.75V555.08H743.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 770.367 554.773)"
                        d="M742.43 554.41H798.31V555.12H742.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 773.247 554.69)"
                        d="M745.3 554.32H801.18V555.0300000000001H745.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 768.925 554.813)"
                        d="M740.99 554.45H796.87V555.1600000000001H740.99z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(88.31 767.488 554.858)"
                        d="M739.55 554.49H795.43V555.2H739.55z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(88.31 766.05 554.903)"
                        d="M738.11 554.54H793.99V555.25H738.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 763.172 554.987)"
                        d="M735.23 554.62H791.11V555.33H735.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 761.73 555.027)"
                        d="M733.79 554.66H789.67V555.37H733.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 760.292 555.072)"
                        d="M732.35 554.71H788.23V555.4200000000001H732.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 758.86 555.111)"
                        d="M730.92 554.75H786.8V555.46H730.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 764.609 554.942)"
                        d="M736.67 554.58H792.55V555.2900000000001H736.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 755.98 555.196)"
                        d="M728.04 554.83H783.92V555.5400000000001H728.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 754.539 555.235)"
                        d="M726.6 554.88H782.48V555.59H726.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 757.418 555.151)"
                        d="M729.48 554.79H785.36V555.5H729.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 751.664 555.325)"
                        d="M723.72 554.96H779.6V555.6700000000001H723.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 750.222 555.365)"
                        d="M722.28 555H778.16V555.71H722.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 748.785 555.41)"
                        d="M720.84 555.05H776.72V555.76H720.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 747.343 555.45)"
                        d="M719.41 555.09H775.29V555.8000000000001H719.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 753.102 555.28)"
                        d="M725.16 554.92H781.04V555.63H725.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 744.469 555.539)"
                        d="M716.53 555.17H772.41V555.88H716.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 743.027 555.578)"
                        d="M715.09 555.22H770.97V555.9300000000001H715.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 745.906 555.494)"
                        d="M717.97 555.13H773.85V555.84H717.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 740.147 555.663)"
                        d="M712.21 555.3H768.09V556.01H712.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 738.715 555.703)"
                        d="M710.77 555.34H766.65V556.0500000000001H710.77z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(88.31 737.278 555.747)"
                        d="M709.33 555.39H765.21V556.1H709.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 735.836 555.787)"
                        d="M707.9 555.43H763.78V556.14H707.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 741.59 555.623)"
                        d="M713.65 555.26H769.53V555.97H713.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 732.957 555.871)"
                        d="M705.02 555.51H760.9V556.22H705.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(88.31 731.52 555.916)"
                        d="M703.58 555.56H759.46V556.27H703.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(88.31 734.399 555.832)"
                        d="M706.46 555.47H762.34V556.1800000000001H706.46z"
                      />
                    </g>
                  </g>
                  <g className="cls-49">
                    <g clipPath="url(#clippath-21)">
                      <path
                        className="cls-81"
                        transform="rotate(99.76 867.325 604.95)"
                        d="M828.06 604.66H906.6099999999999V605.37H828.06z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 865.908 604.705)"
                        d="M826.64 604.41H905.1899999999999V605.12H826.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 863.068 604.218)"
                        d="M823.8 603.93H902.3499999999999V604.64H823.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 861.65 603.973)"
                        d="M822.38 603.68H900.93V604.39H822.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 860.229 603.732)"
                        d="M820.96 603.44H899.51V604.1500000000001H820.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 858.816 603.491)"
                        d="M819.54 603.19H898.0899999999999V603.9000000000001H819.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 864.486 604.464)"
                        d="M825.22 604.17H903.77V604.88H825.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 855.98 603)"
                        d="M816.71 602.71H895.26V603.4200000000001H816.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 854.559 602.76)"
                        d="M815.29 602.46H893.8399999999999V603.1700000000001H815.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 857.398 603.245)"
                        d="M818.13 602.95H896.68V603.6600000000001H818.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(99.76 853.14 602.514)"
                        d="M813.87 602.22H892.42V602.9300000000001H813.87z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 851.723 602.268)"
                        d="M812.45 601.98H891V602.69H812.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 848.884 601.782)"
                        d="M809.61 601.49H888.16V602.2H809.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 847.466 601.537)"
                        d="M808.2 601.24H886.75V601.95H808.2z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 846.048 601.291)"
                        d="M806.78 601H885.3299999999999V601.71H806.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 844.626 601.05)"
                        d="M805.36 600.76H883.91V601.47H805.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 850.301 602.028)"
                        d="M811.03 601.73H889.5799999999999V602.44H811.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 841.791 600.56)"
                        d="M802.52 600.27H881.0699999999999V600.98H802.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 840.37 600.319)"
                        d="M801.1 600.02H879.65V600.73H801.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 843.209 600.805)"
                        d="M803.94 600.51H882.49V601.22H803.94z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(99.76 838.951 600.073)"
                        d="M799.68 599.78H878.2299999999999V600.49H799.68z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 837.539 599.832)"
                        d="M798.27 599.54H876.8199999999999V600.25H798.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 834.7 599.346)"
                        d="M795.43 599.05H873.9799999999999V599.76H795.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 833.281 599.1)"
                        d="M794.01 598.8H872.56V599.51H794.01z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 831.864 598.855)"
                        d="M792.59 598.56H871.14V599.27H792.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 830.442 598.614)"
                        d="M791.17 598.32H869.7199999999999V599.0300000000001H791.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 836.121 599.587)"
                        d="M796.85 599.29H875.4V600H796.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 827.606 598.123)"
                        d="M788.34 597.83H866.89V598.5400000000001H788.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 826.189 597.878)"
                        d="M786.92 597.59H865.4699999999999V598.3000000000001H786.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 829.024 598.369)"
                        d="M789.75 598.07H868.3V598.7800000000001H789.75z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(99.76 824.767 597.637)"
                        d="M785.5 597.34H864.05V598.0500000000001H785.5z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 823.35 597.392)"
                        d="M784.08 597.1H862.63V597.8100000000001H784.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 820.51 596.906)"
                        d="M781.24 596.61H859.79V597.32H781.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 819.092 596.66)"
                        d="M779.82 596.37H858.37V597.08H779.82z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 817.68 596.419)"
                        d="M778.41 596.12H856.9599999999999V596.83H778.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 816.262 596.173)"
                        d="M776.99 595.88H855.54V596.59H776.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 821.932 597.146)"
                        d="M782.66 596.85H861.2099999999999V597.5600000000001H782.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 813.422 595.687)"
                        d="M774.15 595.39H852.6999999999999V596.1H774.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 812.004 595.442)"
                        d="M772.73 595.15H851.28V595.86H772.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 814.84 595.933)"
                        d="M775.57 595.63H854.12V596.34H775.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 810.582 595.201)"
                        d="M771.31 594.9H849.8599999999999V595.61H771.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(99.76 809.165 594.956)"
                        d="M769.89 594.66H848.4399999999999V595.37H769.89z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 807.747 594.71)"
                        d="M768.48 594.41H847.03V595.12H768.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 804.907 594.224)"
                        d="M765.64 593.93H844.1899999999999V594.64H765.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 803.49 593.978)"
                        d="M764.22 593.68H842.77V594.39H764.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 802.072 593.733)"
                        d="M762.8 593.44H841.3499999999999V594.1500000000001H762.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 800.65 593.492)"
                        d="M761.38 593.2H839.93V593.9100000000001H761.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 806.33 594.464)"
                        d="M767.06 594.17H845.6099999999999V594.88H767.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 797.82 593.005)"
                        d="M758.55 592.71H837.0999999999999V593.4200000000001H758.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 796.402 592.76)"
                        d="M757.13 592.46H835.68V593.1700000000001H757.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 799.233 593.247)"
                        d="M759.96 592.95H838.51V593.6600000000001H759.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 793.563 592.274)"
                        d="M754.29 591.98H832.8399999999999V592.69H754.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 792.145 592.028)"
                        d="M752.87 591.73H831.42V592.44H752.87z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 790.723 591.788)"
                        d="M751.45 591.49H830V592.2H751.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 789.305 591.542)"
                        d="M750.03 591.24H828.5799999999999V591.95H750.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 794.98 592.52)"
                        d="M755.71 592.22H834.26V592.9300000000001H755.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 786.47 591.051)"
                        d="M747.2 590.76H825.75V591.47H747.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 785.048 590.81)"
                        d="M745.78 590.51H824.3299999999999V591.22H745.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 787.888 591.297)"
                        d="M748.61 591H827.16V591.71H748.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 782.213 590.32)"
                        d="M742.94 590.02H821.49V590.73H742.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 780.79 590.079)"
                        d="M741.52 589.78H820.0699999999999V590.49H741.52z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 779.373 589.833)"
                        d="M740.1 589.54H818.65V590.25H740.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 777.96 589.592)"
                        d="M738.68 589.29H817.2299999999999V590H738.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 783.63 590.565)"
                        d="M744.36 590.27H822.91V590.98H744.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 775.12 589.106)"
                        d="M735.85 588.81H814.4V589.52H735.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 773.703 588.86)"
                        d="M734.43 588.56H812.9799999999999V589.27H734.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 776.543 589.347)"
                        d="M737.27 589.05H815.8199999999999V589.76H737.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 770.812 588.365)"
                        d="M731.54 588.06H810.0899999999999V588.77H731.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 769.394 588.12)"
                        d="M730.12 587.82H808.67V588.5300000000001H730.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 772.234 588.605)"
                        d="M732.96 588.31H811.51V589.02H732.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 767.976 587.874)"
                        d="M728.7 587.58H807.25V588.2900000000001H728.7z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(99.76 766.554 587.633)"
                        d="M727.28 587.33H805.8299999999999V588.0400000000001H727.28z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(99.76 765.137 587.388)"
                        d="M725.86 587.09H804.41V587.8000000000001H725.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 762.301 586.897)"
                        d="M723.03 586.6H801.5799999999999V587.3100000000001H723.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 760.88 586.656)"
                        d="M721.61 586.36H800.16V587.07H721.61z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 759.462 586.41)"
                        d="M720.19 586.11H798.74V586.82H720.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 758.044 586.165)"
                        d="M718.77 585.87H797.3199999999999V586.58H718.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 763.72 587.142)"
                        d="M724.45 586.85H803V587.5600000000001H724.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 755.21 585.683)"
                        d="M715.93 585.38H794.4799999999999V586.09H715.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 753.792 585.438)"
                        d="M714.52 585.14H793.0699999999999V585.85H714.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 756.627 585.929)"
                        d="M717.35 585.63H795.9V586.34H717.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 750.952 584.951)"
                        d="M711.68 584.65H790.2299999999999V585.36H711.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 749.535 584.706)"
                        d="M710.26 584.41H788.81V585.12H710.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 748.117 584.46)"
                        d="M708.84 584.16H787.39V584.87H708.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 746.695 584.22)"
                        d="M707.42 583.92H785.9699999999999V584.63H707.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 752.374 585.192)"
                        d="M713.1 584.89H791.65V585.6H713.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 743.86 583.729)"
                        d="M704.59 583.43H783.14V584.14H704.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 742.442 583.483)"
                        d="M703.17 583.19H781.7199999999999V583.9000000000001H703.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 745.277 583.974)"
                        d="M706 583.67H784.55V584.38H706z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 739.602 582.997)"
                        d="M700.33 582.7H778.88V583.4100000000001H700.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 738.185 582.752)"
                        d="M698.91 582.46H777.4599999999999V583.1700000000001H698.91z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 736.763 582.511)"
                        d="M697.49 582.21H776.04V582.9200000000001H697.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 735.35 582.27)"
                        d="M696.07 581.97H774.62V582.6800000000001H696.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 741.02 583.243)"
                        d="M701.75 582.94H780.3V583.6500000000001H701.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 732.515 581.779)"
                        d="M693.24 581.48H771.79V582.19H693.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 731.093 581.538)"
                        d="M691.82 581.24H770.37V581.95H691.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 733.932 582.024)"
                        d="M694.66 581.72H773.2099999999999V582.4300000000001H694.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 727.96 580.882)"
                        d="M688.68 580.58H767.2299999999999V581.2900000000001H688.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 726.543 580.637)"
                        d="M687.26 580.34H765.81V581.0500000000001H687.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(99.76 725.12 580.396)"
                        d="M685.85 580.09H764.4V580.8000000000001H685.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 723.703 580.15)"
                        d="M684.43 579.85H762.9799999999999V580.5600000000001H684.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 729.378 581.128)"
                        d="M690.1 580.83H768.65V581.5400000000001H690.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 720.863 579.664)"
                        d="M681.59 579.36H760.14V580.07H681.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(99.76 719.446 579.419)"
                        d="M680.17 579.12H758.7199999999999V579.83H680.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(99.76 722.285 579.905)"
                        d="M683.01 579.61H761.56V580.32H683.01z"
                      />
                    </g>
                    <g clipPath="url(#clippath-22)">
                      <path
                        className="cls-81"
                        transform="rotate(108.24 850.412 652.318)"
                        d="M811.14 651.91H889.6899999999999V652.62H811.14z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 849.049 651.865)"
                        d="M809.77 651.46H888.3199999999999V652.1700000000001H809.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 846.31 650.965)"
                        d="M807.04 650.56H885.5899999999999V651.27H807.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 844.947 650.512)"
                        d="M805.67 650.11H884.2199999999999V650.82H805.67z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 843.58 650.064)"
                        d="M804.3 649.66H882.8499999999999V650.37H804.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 842.212 649.608)"
                        d="M802.94 649.21H881.49V649.9200000000001H802.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 847.677 651.413)"
                        d="M808.41 651.01H886.9599999999999V651.72H808.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 839.478 648.712)"
                        d="M800.2 648.31H878.75V649.02H800.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 838.11 648.255)"
                        d="M798.84 647.86H877.39V648.57H798.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 840.845 649.16)"
                        d="M801.57 648.76H880.12V649.47H801.57z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(108.24 836.743 647.808)"
                        d="M797.47 647.41H876.02V648.12H797.47z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 835.377 647.36)"
                        d="M796.1 646.96H874.65V647.6700000000001H796.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 832.642 646.455)"
                        d="M793.37 646.05H871.92V646.76H793.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 831.275 646.007)"
                        d="M792 645.6H870.55V646.3100000000001H792z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 829.912 645.554)"
                        d="M790.63 645.15H869.18V645.86H790.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 828.54 645.103)"
                        d="M789.27 644.7H867.8199999999999V645.4100000000001H789.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 834.008 646.903)"
                        d="M794.74 646.51H873.29V647.22H794.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 825.81 644.202)"
                        d="M786.53 643.8H865.0799999999999V644.51H786.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 824.438 643.75)"
                        d="M785.17 643.35H863.7199999999999V644.0600000000001H785.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 827.173 644.655)"
                        d="M787.9 644.25H866.4499999999999V644.96H787.9z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(108.24 823.071 643.303)"
                        d="M783.8 642.9H862.3499999999999V643.61H783.8z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 821.708 642.85)"
                        d="M782.43 642.45H860.9799999999999V643.1600000000001H782.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 818.97 641.95)"
                        d="M779.7 641.55H858.25V642.26H779.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 817.606 641.497)"
                        d="M778.33 641.1H856.88V641.8100000000001H778.33z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 816.24 641.05)"
                        d="M776.96 640.65H855.51V641.36H776.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 814.868 640.598)"
                        d="M775.6 640.2H854.15V640.9100000000001H775.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 820.336 642.398)"
                        d="M781.06 642H859.6099999999999V642.71H781.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 812.138 639.697)"
                        d="M772.86 639.3H851.41V640.01H772.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 810.766 639.245)"
                        d="M771.5 638.84H850.05V639.5500000000001H771.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 813.505 640.145)"
                        d="M774.23 639.75H852.78V640.46H774.23z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(108.24 809.403 638.793)"
                        d="M770.13 638.39H848.68V639.1H770.13z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 808.036 638.345)"
                        d="M768.76 637.94H847.31V638.6500000000001H768.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 805.301 637.44)"
                        d="M766.03 637.04H844.5799999999999V637.75H766.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 803.934 636.992)"
                        d="M764.66 636.59H843.2099999999999V637.3000000000001H764.66z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 802.568 636.544)"
                        d="M763.29 636.14H841.8399999999999V636.85H763.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 801.2 636.088)"
                        d="M761.93 635.69H840.4799999999999V636.4000000000001H761.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 806.664 637.893)"
                        d="M767.39 637.49H845.9399999999999V638.2H767.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 798.466 635.192)"
                        d="M759.19 634.79H837.74V635.5H759.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 797.098 634.735)"
                        d="M757.83 634.34H836.38V635.0500000000001H757.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 799.833 635.64)"
                        d="M760.56 635.24H839.1099999999999V635.95H760.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 795.73 634.288)"
                        d="M756.46 633.89H835.01V634.6H756.46z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(108.24 794.364 633.84)"
                        d="M755.09 633.44H833.64V634.1500000000001H755.09z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 792.996 633.383)"
                        d="M753.72 632.99H832.27V633.7H753.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 790.262 632.487)"
                        d="M750.99 632.09H829.54V632.8000000000001H750.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 788.9 632.034)"
                        d="M749.62 631.63H828.17V632.34H749.62z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 787.527 631.583)"
                        d="M748.26 631.18H826.81V631.89H748.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 786.16 631.135)"
                        d="M746.89 630.73H825.4399999999999V631.44H746.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 791.63 632.935)"
                        d="M752.36 632.54H830.91V633.25H752.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 783.426 630.23)"
                        d="M744.15 629.83H822.6999999999999V630.5400000000001H744.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 782.059 629.783)"
                        d="M742.79 629.38H821.3399999999999V630.09H742.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 784.797 630.682)"
                        d="M745.52 630.28H824.0699999999999V630.99H745.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 779.324 628.878)"
                        d="M740.05 628.48H818.5999999999999V629.19H740.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 777.957 628.43)"
                        d="M738.69 628.03H817.24V628.74H738.69z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 776.594 627.977)"
                        d="M737.32 627.58H815.87V628.2900000000001H737.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 775.227 627.53)"
                        d="M735.95 627.13H814.5V627.84H735.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 780.696 629.33)"
                        d="M741.42 628.93H819.9699999999999V629.64H741.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 772.492 626.625)"
                        d="M733.22 626.23H811.77V626.94H733.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 771.125 626.177)"
                        d="M731.85 625.78H810.4V626.49H731.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 773.855 627.078)"
                        d="M734.59 626.68H813.14V627.39H734.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 768.39 625.273)"
                        d="M729.12 624.88H807.67V625.59H729.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 767.024 624.825)"
                        d="M727.75 624.42H806.3V625.13H727.75z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 765.66 624.372)"
                        d="M726.38 623.97H804.93V624.6800000000001H726.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 764.289 623.92)"
                        d="M725.02 623.52H803.5699999999999V624.23H725.02z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 769.754 625.725)"
                        d="M730.48 625.33H809.03V626.0400000000001H730.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 761.559 623.02)"
                        d="M722.28 622.62H800.8299999999999V623.33H722.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 760.187 622.568)"
                        d="M720.92 622.17H799.4699999999999V622.88H720.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 762.922 623.472)"
                        d="M723.65 623.07H802.1999999999999V623.7800000000001H723.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 757.401 621.65)"
                        d="M718.13 621.25H796.68V621.96H718.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 756.034 621.202)"
                        d="M716.76 620.8H795.31V621.51H716.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 758.773 622.101)"
                        d="M719.5 621.7H798.05V622.4100000000001H719.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 754.671 620.749)"
                        d="M715.4 620.35H793.9499999999999V621.0600000000001H715.4z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(108.24 753.304 620.3)"
                        d="M714.03 619.9H792.5799999999999V620.61H714.03z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(108.24 751.933 619.85)"
                        d="M712.66 619.45H791.2099999999999V620.1600000000001H712.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 749.203 618.948)"
                        d="M709.93 618.55H788.4799999999999V619.26H709.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 747.83 618.497)"
                        d="M708.56 618.1H787.1099999999999V618.8100000000001H708.56z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 746.468 618.044)"
                        d="M707.19 617.65H785.74V618.36H707.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 745.1 617.596)"
                        d="M705.83 617.2H784.38V617.9100000000001H705.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 750.57 619.396)"
                        d="M711.3 619H789.8499999999999V619.71H711.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 742.366 616.692)"
                        d="M703.09 616.3H781.64V617.01H703.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 741 616.244)"
                        d="M701.73 615.85H780.28V616.5600000000001H701.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 743.729 617.144)"
                        d="M704.46 616.75H783.01V617.46H704.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 738.264 615.34)"
                        d="M698.99 614.94H777.54V615.6500000000001H698.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 736.897 614.891)"
                        d="M697.62 614.49H776.17V615.2H697.62z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 735.53 614.443)"
                        d="M696.26 614.04H774.81V614.75H696.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 734.162 613.987)"
                        d="M694.89 613.59H773.4399999999999V614.3000000000001H694.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 739.632 615.796)"
                        d="M700.36 615.4H778.91V616.11H700.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 731.429 613.091)"
                        d="M692.16 612.69H770.7099999999999V613.4000000000001H692.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 730.06 612.634)"
                        d="M690.79 612.24H769.3399999999999V612.95H690.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 732.796 613.539)"
                        d="M693.52 613.14H772.0699999999999V613.85H693.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 727.327 611.739)"
                        d="M688.06 611.34H766.6099999999999V612.0500000000001H688.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 725.964 611.286)"
                        d="M686.69 610.89H765.24V611.6H686.69z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 724.592 610.834)"
                        d="M685.32 610.44H763.87V611.1500000000001H685.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 723.225 610.386)"
                        d="M683.95 609.99H762.5V610.7H683.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 728.694 612.187)"
                        d="M689.42 611.79H767.9699999999999V612.5H689.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 720.49 609.482)"
                        d="M681.22 609.09H759.77V609.8000000000001H681.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 719.124 609.034)"
                        d="M679.85 608.64H758.4V609.35H679.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 721.862 609.933)"
                        d="M682.59 609.54H761.14V610.25H682.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 716.12 607.92)"
                        d="M676.85 607.53H755.4V608.24H676.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 714.754 607.473)"
                        d="M675.48 607.07H754.03V607.7800000000001H675.48z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(108.24 713.387 607.025)"
                        d="M674.11 606.62H752.66V607.33H674.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 712.02 606.568)"
                        d="M672.75 606.17H751.3V606.88H672.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 717.484 608.373)"
                        d="M678.22 607.98H756.77V608.69H678.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 709.29 605.667)"
                        d="M670.01 605.27H748.56V605.98H670.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(108.24 707.917 605.216)"
                        d="M668.65 604.82H747.1999999999999V605.5300000000001H668.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(108.24 710.652 606.12)"
                        d="M671.38 605.72H749.93V606.4300000000001H671.38z"
                      />
                    </g>
                    <g clipPath="url(#clippath-23)">
                      <path
                        className="cls-81"
                        transform="rotate(115.2 829.925 687.027)"
                        d="M784.73 686.68H875.12V687.39H784.73z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 828.621 686.417)"
                        d="M783.43 686.07H873.8199999999999V686.7800000000001H783.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 826.018 685.193)"
                        d="M780.82 684.84H871.21V685.5500000000001H780.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 824.713 684.575)"
                        d="M779.52 684.23H869.91V684.94H779.52z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 823.41 683.965)"
                        d="M778.22 683.61H868.61V684.32H778.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 822.11 683.35)"
                        d="M776.92 683H867.31V683.71H776.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 827.321 685.802)"
                        d="M782.13 685.45H872.52V686.1600000000001H782.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 819.506 682.126)"
                        d="M774.31 681.78H864.6999999999999V682.49H774.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 818.205 681.511)"
                        d="M773.01 681.16H863.4V681.87H773.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 820.806 682.74)"
                        d="M775.61 682.39H866V683.1H775.61z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(115.2 816.902 680.901)"
                        d="M771.71 680.55H862.1V681.26H771.71z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 815.597 680.283)"
                        d="M770.4 679.94H860.79V680.6500000000001H770.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 812.993 679.059)"
                        d="M767.8 678.71H858.1899999999999V679.4200000000001H767.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 811.69 678.45)"
                        d="M766.5 678.1H856.89V678.8100000000001H766.5z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 810.39 677.835)"
                        d="M765.19 677.49H855.58V678.2H765.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 809.086 677.225)"
                        d="M763.89 676.87H854.28V677.58H763.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 814.293 679.674)"
                        d="M769.1 679.32H859.49V680.0300000000001H769.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 806.478 675.997)"
                        d="M761.29 675.65H851.68V676.36H761.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 805.178 675.383)"
                        d="M759.98 675.03H850.37V675.74H759.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 807.786 676.61)"
                        d="M762.59 676.26H852.98V676.97H762.59z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(115.2 803.874 674.773)"
                        d="M758.68 674.42H849.0699999999999V675.13H758.68z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 802.574 674.158)"
                        d="M757.38 673.81H847.77V674.52H757.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 799.97 672.934)"
                        d="M754.78 672.58H845.17V673.2900000000001H754.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 798.67 672.319)"
                        d="M753.47 671.97H843.86V672.6800000000001H753.47z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 797.362 671.706)"
                        d="M752.17 671.36H842.56V672.07H752.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 796.062 671.091)"
                        d="M750.87 670.74H841.26V671.45H750.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 801.27 673.548)"
                        d="M756.08 673.2H846.47V673.9100000000001H756.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 793.458 669.867)"
                        d="M748.26 669.52H838.65V670.23H748.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 792.155 669.257)"
                        d="M746.96 668.91H837.35V669.62H746.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 794.758 670.482)"
                        d="M749.57 670.13H839.96V670.84H749.57z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(115.2 790.855 668.643)"
                        d="M745.66 668.29H836.05V669H745.66z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 789.546 668.03)"
                        d="M744.36 667.68H834.75V668.39H744.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 786.943 666.805)"
                        d="M741.75 666.45H832.14V667.1600000000001H741.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 785.643 666.19)"
                        d="M740.45 665.84H830.84V666.5500000000001H740.45z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 784.34 665.58)"
                        d="M739.15 665.23H829.54V665.94H739.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 783.039 664.966)"
                        d="M737.84 664.62H828.23V665.33H737.84z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 788.246 667.415)"
                        d="M743.05 667.07H833.4399999999999V667.7800000000001H743.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 780.43 663.738)"
                        d="M735.24 663.39H825.63V664.1H735.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 779.13 663.124)"
                        d="M733.94 662.78H824.33V663.49H733.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 781.736 664.356)"
                        d="M736.54 664H826.93V664.71H736.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 777.827 662.514)"
                        d="M732.63 662.16H823.02V662.87H732.63z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(115.2 776.527 661.9)"
                        d="M731.33 661.55H821.72V662.26H731.33z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 775.223 661.29)"
                        d="M730.03 660.94H820.42V661.6500000000001H730.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 772.62 660.065)"
                        d="M727.42 659.71H817.81V660.4200000000001H727.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 771.315 659.447)"
                        d="M726.12 659.1H816.51V659.8100000000001H726.12z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 770.011 658.838)"
                        d="M724.82 658.49H815.21V659.2H724.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 768.711 658.223)"
                        d="M723.52 657.87H813.91V658.58H723.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 773.923 660.675)"
                        d="M728.73 660.33H819.12V661.0400000000001H728.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 766.107 656.998)"
                        d="M720.91 656.65H811.3V657.36H720.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 764.804 656.389)"
                        d="M719.61 656.04H810V656.75H719.61z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 767.408 657.613)"
                        d="M722.21 657.26H812.6V657.97H722.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 762.195 655.161)"
                        d="M717.01 654.81H807.4V655.52H717.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 760.895 654.546)"
                        d="M715.7 654.2H806.09V654.9100000000001H715.7z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 759.595 653.932)"
                        d="M714.4 653.58H804.79V654.2900000000001H714.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 758.292 653.322)"
                        d="M713.1 652.97H803.49V653.6800000000001H713.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 763.504 655.774)"
                        d="M718.31 655.42H808.6999999999999V656.13H718.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 755.688 652.097)"
                        d="M710.49 651.75H800.88V652.46H710.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 754.388 651.483)"
                        d="M709.19 651.13H799.58V651.84H709.19z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 756.992 652.707)"
                        d="M711.8 652.36H802.1899999999999V653.07H711.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 751.78 650.255)"
                        d="M706.59 649.91H796.98V650.62H706.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 750.476 649.645)"
                        d="M705.28 649.29H795.67V650H705.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 749.176 649.03)"
                        d="M703.98 648.68H794.37V649.39H703.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 747.872 648.421)"
                        d="M702.68 648.07H793.0699999999999V648.7800000000001H702.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 753.08 650.87)"
                        d="M707.89 650.52H798.28V651.23H707.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 745.269 647.197)"
                        d="M700.07 646.84H790.46V647.5500000000001H700.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 743.964 646.579)"
                        d="M698.77 646.23H789.16V646.94H698.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 746.572 647.806)"
                        d="M701.38 647.46H791.77V648.1700000000001H701.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 741.312 645.33)"
                        d="M696.12 644.98H786.51V645.69H696.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 740.009 644.721)"
                        d="M694.82 644.37H785.21V645.08H694.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 742.612 645.945)"
                        d="M697.42 645.59H787.81V646.3000000000001H697.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 738.708 644.106)"
                        d="M693.51 643.76H783.9V644.47H693.51z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(115.2 737.405 643.497)"
                        d="M692.21 643.14H782.6V643.85H692.21z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(115.2 736.105 642.882)"
                        d="M690.91 642.53H781.3V643.24H690.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 733.496 641.654)"
                        d="M688.3 641.3H778.6899999999999V642.01H688.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 732.196 641.04)"
                        d="M687 640.69H777.39V641.4000000000001H687z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 730.893 640.43)"
                        d="M685.7 640.08H776.09V640.7900000000001H685.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 729.593 639.815)"
                        d="M684.4 639.47H774.79V640.1800000000001H684.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 734.8 642.264)"
                        d="M689.61 641.92H780V642.63H689.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 726.984 638.587)"
                        d="M681.79 638.24H772.18V638.95H681.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 725.68 637.978)"
                        d="M680.49 637.63H770.88V638.34H680.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 728.29 639.205)"
                        d="M683.09 638.85H773.48V639.5600000000001H683.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 723.077 636.753)"
                        d="M677.88 636.4H768.27V637.11H677.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 721.777 636.139)"
                        d="M676.58 635.79H766.97V636.5H676.58z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 720.474 635.529)"
                        d="M675.28 635.18H765.67V635.89H675.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 719.173 634.914)"
                        d="M673.98 634.56H764.37V635.27H673.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 724.38 637.363)"
                        d="M679.19 637.01H769.58V637.72H679.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 716.565 633.687)"
                        d="M671.37 633.34H761.76V634.0500000000001H671.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 715.265 633.072)"
                        d="M670.07 632.72H760.46V633.4300000000001H670.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 717.865 634.301)"
                        d="M672.68 633.95H763.0699999999999V634.6600000000001H672.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 712.661 631.847)"
                        d="M667.47 631.5H757.86V632.21H667.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 711.358 631.238)"
                        d="M666.16 630.89H756.55V631.6H666.16z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 710.057 630.623)"
                        d="M664.86 630.27H755.25V630.98H664.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 708.75 630.01)"
                        d="M663.56 629.66H753.9499999999999V630.37H663.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 713.961 632.462)"
                        d="M668.77 632.11H759.16V632.82H668.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 706.146 628.786)"
                        d="M660.95 628.43H751.34V629.14H660.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 704.845 628.171)"
                        d="M659.65 627.82H750.04V628.5300000000001H659.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 707.449 629.395)"
                        d="M662.26 629.05H752.65V629.76H662.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 702.004 626.69)"
                        d="M656.81 626.34H747.1999999999999V627.0500000000001H656.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 700.704 626.076)"
                        d="M655.51 625.73H745.9V626.44H655.51z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(115.2 699.4 625.466)"
                        d="M654.21 625.12H744.6V625.83H654.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 698.096 624.848)"
                        d="M652.9 624.5H743.29V625.21H652.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 703.305 627.305)"
                        d="M658.11 626.95H748.5V627.6600000000001H658.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 695.492 623.624)"
                        d="M650.3 623.28H740.6899999999999V623.99H650.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(115.2 694.189 623.014)"
                        d="M649 622.66H739.39V623.37H649z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(115.2 696.792 624.239)"
                        d="M651.6 623.89H741.99V624.6H651.6z"
                      />
                    </g>
                  </g>
                  <g
                    style={{
                      mixBlendMode: "soft-light"
                    }}
                  >
                    <g clipPath="url(#clippath-24)">
                      <path
                        className="cls-81"
                        transform="rotate(128.4 796.498 733.628)"
                        d="M751.32 733.24H841.71V733.95H751.32z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 795.37 732.732)"
                        d="M750.19 732.34H840.58V733.0500000000001H750.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 793.113 730.944)"
                        d="M747.93 730.56H838.3199999999999V731.27H747.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 791.984 730.052)"
                        d="M746.8 729.66H837.1899999999999V730.37H746.8z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 790.857 729.156)"
                        d="M745.68 728.77H836.0699999999999V729.48H745.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 789.73 728.26)"
                        d="M744.55 727.87H834.9399999999999V728.58H744.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 794.24 731.84)"
                        d="M749.06 731.45H839.4499999999999V732.1600000000001H749.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 787.478 726.474)"
                        d="M742.29 726.09H832.68V726.8000000000001H742.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 786.348 725.582)"
                        d="M741.16 725.19H831.55V725.9000000000001H741.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 788.605 727.37)"
                        d="M743.42 726.98H833.81V727.69H743.42z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(128.4 785.22 724.685)"
                        d="M740.04 724.3H830.43V725.01H740.04z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 784.091 723.794)"
                        d="M738.91 723.4H829.3V724.11H738.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 781.837 722)"
                        d="M736.65 721.61H827.04V722.32H736.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 780.707 721.11)"
                        d="M735.52 720.72H825.91V721.4300000000001H735.52z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 779.58 720.213)"
                        d="M734.4 719.83H824.79V720.5400000000001H734.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 778.45 719.321)"
                        d="M733.27 718.93H823.66V719.64H733.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 782.964 722.897)"
                        d="M737.78 722.51H828.17V723.22H737.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 776.193 717.533)"
                        d="M731.01 717.14H821.4V717.85H731.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 775.066 716.637)"
                        d="M729.88 716.25H820.27V716.96H729.88z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 777.323 718.425)"
                        d="M732.14 718.04H822.53V718.75H732.14z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(128.4 773.936 715.745)"
                        d="M728.76 715.36H819.15V716.07H728.76z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 772.81 714.849)"
                        d="M727.63 714.46H818.02V715.1700000000001H727.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 770.557 713.063)"
                        d="M725.37 712.67H815.76V713.38H725.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 769.43 712.167)"
                        d="M724.24 711.78H814.63V712.49H724.24z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 768.3 711.275)"
                        d="M723.12 710.89H813.51V711.6H723.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 767.173 710.379)"
                        d="M721.99 709.99H812.38V710.7H721.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 771.682 713.952)"
                        d="M726.5 713.57H816.89V714.2800000000001H726.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 764.916 708.59)"
                        d="M719.73 708.2H810.12V708.9100000000001H719.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 763.789 707.694)"
                        d="M718.6 707.31H808.99V708.02H718.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 766.043 709.487)"
                        d="M720.86 709.1H811.25V709.8100000000001H720.86z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(128.4 762.66 706.802)"
                        d="M717.48 706.41H807.87V707.12H717.48z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 761.532 705.906)"
                        d="M716.35 705.52H806.74V706.23H716.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 759.275 704.118)"
                        d="M714.09 703.73H804.48V704.44H714.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 758.146 703.226)"
                        d="M712.96 702.84H803.35V703.5500000000001H712.96z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 757.018 702.33)"
                        d="M711.84 701.94H802.23V702.6500000000001H711.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 755.889 701.438)"
                        d="M710.71 701.05H801.1V701.76H710.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 760.403 705.014)"
                        d="M715.22 704.63H805.61V705.34H715.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 753.634 699.645)"
                        d="M708.45 699.26H798.84V699.97H708.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 752.505 698.754)"
                        d="M707.32 698.37H797.71V699.08H707.32z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 754.762 700.542)"
                        d="M709.58 700.16H799.97V700.87H709.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 751.382 697.86)"
                        d="M706.2 697.47H796.59V698.1800000000001H706.2z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(128.4 750.253 696.968)"
                        d="M705.07 696.58H795.46V697.2900000000001H705.07z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 749.126 696.072)"
                        d="M703.94 695.68H794.33V696.39H703.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 746.869 694.283)"
                        d="M701.68 693.9H792.0699999999999V694.61H701.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 745.741 693.387)"
                        d="M700.56 693H790.9499999999999V693.71H700.56z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 744.612 692.495)"
                        d="M699.43 692.11H789.8199999999999V692.82H699.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 743.485 691.599)"
                        d="M698.3 691.21H788.6899999999999V691.9200000000001H698.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 747.996 695.18)"
                        d="M702.81 694.79H793.1999999999999V695.5H702.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 741.228 689.81)"
                        d="M696.04 689.43H786.43V690.14H696.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 740.098 688.92)"
                        d="M694.92 688.53H785.31V689.24H694.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 742.355 690.707)"
                        d="M697.17 690.32H787.56V691.0300000000001H697.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 737.841 687.131)"
                        d="M692.66 686.74H783.05V687.45H692.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 736.714 686.235)"
                        d="M691.53 685.85H781.92V686.5600000000001H691.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 735.587 685.338)"
                        d="M690.4 684.95H780.79V685.6600000000001H690.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 734.457 684.447)"
                        d="M689.28 684.06H779.67V684.77H689.28z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 738.97 688.023)"
                        d="M693.79 687.64H784.18V688.35H693.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 732.205 682.661)"
                        d="M687.02 682.27H777.41V682.98H687.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 731.078 681.765)"
                        d="M685.89 681.38H776.28V682.09H685.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 733.335 683.553)"
                        d="M688.15 683.17H778.54V683.88H688.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 728.821 679.977)"
                        d="M683.64 679.59H774.03V680.3000000000001H683.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 727.694 679.08)"
                        d="M682.51 678.7H772.9V679.4100000000001H682.51z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 726.564 678.188)"
                        d="M681.38 677.8H771.77V678.51H681.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 725.437 677.292)"
                        d="M680.25 676.91H770.64V677.62H680.25z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 729.948 680.873)"
                        d="M684.76 680.48H775.15V681.19H684.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 723.18 675.504)"
                        d="M678 675.12H768.39V675.83H678z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 722.05 674.612)"
                        d="M676.87 674.23H767.26V674.94H676.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 724.307 676.4)"
                        d="M679.12 676.01H769.51V676.72H679.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 719.756 672.788)"
                        d="M674.57 672.4H764.96V673.11H674.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 718.626 671.896)"
                        d="M673.44 671.51H763.83V672.22H673.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 720.883 673.684)"
                        d="M675.7 673.3H766.09V674.01H675.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 717.5 671)"
                        d="M672.32 670.62H762.71V671.33H672.32z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(128.4 716.37 670.108)"
                        d="M671.19 669.72H761.58V670.4300000000001H671.19z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(128.4 715.242 669.211)"
                        d="M670.06 668.83H760.4499999999999V669.5400000000001H670.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 712.985 667.423)"
                        d="M667.8 667.04H758.1899999999999V667.75H667.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 711.858 666.527)"
                        d="M666.68 666.14H757.0699999999999V666.85H666.68z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 710.728 665.635)"
                        d="M665.55 665.25H755.9399999999999V665.96H665.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 709.601 664.739)"
                        d="M664.42 664.36H754.81V665.07H664.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 714.113 668.32)"
                        d="M668.93 667.93H759.3199999999999V668.64H668.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 707.35 662.953)"
                        d="M662.16 662.57H752.55V663.2800000000001H662.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 706.22 662.062)"
                        d="M661.04 661.67H751.43V662.38H661.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 708.472 663.847)"
                        d="M663.29 663.46H753.68V664.1700000000001H663.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 703.963 660.274)"
                        d="M658.78 659.89H749.17V660.6H658.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 702.836 659.377)"
                        d="M657.65 658.99H748.04V659.7H657.65z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 701.708 658.48)"
                        d="M656.52 658.1H746.91V658.8100000000001H656.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 700.579 657.589)"
                        d="M655.4 657.2H745.79V657.9100000000001H655.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 705.093 661.165)"
                        d="M659.91 660.78H750.3V661.49H659.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 698.322 655.801)"
                        d="M653.14 655.41H743.53V656.12H653.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 697.195 654.904)"
                        d="M652.01 654.52H742.4V655.23H652.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 699.452 656.693)"
                        d="M654.27 656.31H744.66V657.02H654.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 694.938 653.116)"
                        d="M649.76 652.73H740.15V653.44H649.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 693.81 652.22)"
                        d="M648.63 651.84H739.02V652.5500000000001H648.63z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 692.681 651.328)"
                        d="M647.5 650.94H737.89V651.6500000000001H647.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 691.554 650.432)"
                        d="M646.37 650.05H736.76V650.76H646.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 696.065 654.013)"
                        d="M650.88 653.63H741.27V654.34H650.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 689.297 648.644)"
                        d="M644.12 648.26H734.51V648.97H644.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 688.172 647.755)"
                        d="M642.99 647.37H733.38V648.08H642.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 690.424 649.54)"
                        d="M645.24 649.16H735.63V649.87H645.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 685.742 645.661)"
                        d="M640.56 645.28H730.9499999999999V645.99H640.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 684.615 644.764)"
                        d="M639.43 644.38H729.8199999999999V645.09H639.43z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(128.4 683.486 643.873)"
                        d="M638.3 643.49H728.6899999999999V644.2H638.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 682.358 642.976)"
                        d="M637.18 642.59H727.5699999999999V643.3000000000001H637.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 686.872 646.552)"
                        d="M641.69 646.17H732.08V646.88H641.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 680.101 641.188)"
                        d="M634.92 640.81H725.31V641.52H634.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(128.4 678.98 640.294)"
                        d="M633.79 639.91H724.18V640.62H633.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(128.4 681.229 642.085)"
                        d="M636.05 641.7H726.4399999999999V642.4100000000001H636.05z"
                      />
                    </g>
                    <g clipPath="url(#clippath-25)">
                      <path
                        className="cls-81"
                        transform="rotate(141.63 745.49 774.193)"
                        d="M700.32 773.8H790.71V774.51H700.32z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 744.595 773.063)"
                        d="M699.42 772.67H789.81V773.38H699.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 742.806 770.809)"
                        d="M697.64 770.42H788.03V771.13H697.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 741.915 769.68)"
                        d="M696.74 769.29H787.13V770H696.74z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 741.024 768.552)"
                        d="M695.85 768.16H786.24V768.87H695.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 740.128 767.422)"
                        d="M694.96 767.03H785.35V767.74H694.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 743.702 771.94)"
                        d="M698.53 771.55H788.92V772.26H698.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 738.341 765.164)"
                        d="M693.17 764.77H783.56V765.48H693.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 737.45 764.035)"
                        d="M692.27 763.65H782.66V764.36H692.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 739.237 766.294)"
                        d="M694.06 765.9H784.4499999999999V766.61H694.06z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(141.63 736.554 762.905)"
                        d="M691.38 762.52H781.77V763.23H691.38z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 735.663 761.777)"
                        d="M690.49 761.39H780.88V762.1H690.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 733.874 759.523)"
                        d="M688.7 759.13H779.09V759.84H688.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 732.983 758.395)"
                        d="M687.81 758H778.1999999999999V758.71H687.81z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 732.087 757.265)"
                        d="M686.91 756.87H777.3V757.58H686.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 731.196 756.136)"
                        d="M686.02 755.75H776.41V756.46H686.02z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 734.77 760.653)"
                        d="M689.59 760.26H779.98V760.97H689.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 729.41 753.878)"
                        d="M684.23 753.49H774.62V754.2H684.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 728.513 752.747)"
                        d="M683.34 752.36H773.73V753.07H683.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 730.3 755.006)"
                        d="M685.13 754.62H775.52V755.33H685.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(141.63 727.622 751.62)"
                        d="M682.45 751.23H772.84V751.94H682.45z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 726.73 750.496)"
                        d="M681.55 750.1H771.9399999999999V750.8100000000001H681.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 724.943 748.237)"
                        d="M679.77 747.85H770.16V748.5600000000001H679.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 724.047 747.107)"
                        d="M678.87 746.72H769.26V747.4300000000001H678.87z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 723.156 745.979)"
                        d="M677.98 745.59H768.37V746.3000000000001H677.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 722.26 744.849)"
                        d="M677.09 744.46H767.48V745.1700000000001H677.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 725.834 749.366)"
                        d="M680.66 748.97H771.05V749.6800000000001H680.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 720.478 742.592)"
                        d="M675.3 742.2H765.6899999999999V742.9100000000001H675.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 719.582 741.462)"
                        d="M674.41 741.07H764.8V741.7800000000001H674.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 721.369 743.72)"
                        d="M676.19 743.33H766.58V744.0400000000001H676.19z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(141.63 718.69 740.333)"
                        d="M673.51 739.95H763.9V740.6600000000001H673.51z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 717.793 739.208)"
                        d="M672.62 738.82H763.01V739.5300000000001H672.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 716.006 736.95)"
                        d="M670.83 736.56H761.22V737.27H670.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 715.115 735.821)"
                        d="M669.94 735.43H760.33V736.14H669.94z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 714.219 734.691)"
                        d="M669.05 734.3H759.4399999999999V735.01H669.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 713.328 733.563)"
                        d="M668.15 733.17H758.54V733.88H668.15z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 716.902 738.08)"
                        d="M671.73 737.69H762.12V738.4000000000001H671.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 711.54 731.304)"
                        d="M666.37 730.92H756.76V731.63H666.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 710.65 730.176)"
                        d="M665.47 729.79H755.86V730.5H665.47z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 712.437 732.434)"
                        d="M667.26 732.05H757.65V732.76H667.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 709.752 729.05)"
                        d="M664.58 728.66H754.97V729.37H664.58z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(141.63 708.861 727.922)"
                        d="M663.69 727.53H754.08V728.24H663.69z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 707.965 726.792)"
                        d="M662.79 726.4H753.18V727.11H662.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 706.183 724.535)"
                        d="M661.01 724.15H751.4V724.86H661.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 705.287 723.405)"
                        d="M660.11 723.02H750.5V723.73H660.11z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 704.396 722.277)"
                        d="M659.22 721.89H749.61V722.6H659.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 703.5 721.147)"
                        d="M658.33 720.76H748.72V721.47H658.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 707.074 725.664)"
                        d="M661.9 725.27H752.29V725.98H661.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 701.711 718.893)"
                        d="M656.54 718.5H746.93V719.21H656.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 700.82 717.765)"
                        d="M655.65 717.37H746.04V718.08H655.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 702.61 720.018)"
                        d="M657.43 719.63H747.8199999999999V720.34H657.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 699.033 715.506)"
                        d="M653.86 715.12H744.25V715.83H653.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 698.142 714.378)"
                        d="M652.97 713.99H743.36V714.7H652.97z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 697.246 713.248)"
                        d="M652.07 712.86H742.46V713.57H652.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 696.355 712.12)"
                        d="M651.18 711.73H741.5699999999999V712.44H651.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 699.93 716.636)"
                        d="M654.75 716.25H745.14V716.96H654.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 694.568 709.86)"
                        d="M649.39 709.47H739.78V710.1800000000001H649.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 693.672 708.73)"
                        d="M648.5 708.35H738.89V709.0600000000001H648.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 695.46 710.989)"
                        d="M650.29 710.6H740.68V711.3100000000001H650.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 691.889 706.479)"
                        d="M646.71 706.09H737.1V706.8000000000001H646.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 690.993 705.349)"
                        d="M645.82 704.96H736.21V705.6700000000001H645.82z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 690.102 704.22)"
                        d="M644.92 703.83H735.31V704.5400000000001H644.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 689.206 703.09)"
                        d="M644.03 702.7H734.42V703.4100000000001H644.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 692.78 707.607)"
                        d="M647.6 707.22H737.99V707.9300000000001H647.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 687.419 700.832)"
                        d="M642.24 700.45H732.63V701.1600000000001H642.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 686.528 699.703)"
                        d="M641.35 699.32H731.74V700.0300000000001H641.35z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 688.315 701.962)"
                        d="M643.14 701.57H733.53V702.2800000000001H643.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 684.71 697.406)"
                        d="M639.53 697.02H729.92V697.73H639.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 683.813 696.276)"
                        d="M638.64 695.89H729.03V696.6H638.64z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 685.6 698.534)"
                        d="M640.42 698.15H730.81V698.86H640.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 682.922 695.147)"
                        d="M637.74 694.76H728.13V695.47H637.74z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(141.63 682.026 694.017)"
                        d="M636.85 693.63H727.24V694.34H636.85z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(141.63 681.134 692.894)"
                        d="M635.96 692.5H726.35V693.21H635.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 679.347 690.635)"
                        d="M634.17 690.25H724.56V690.96H634.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 678.45 689.505)"
                        d="M633.28 689.12H723.67V689.83H633.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 677.56 688.377)"
                        d="M632.38 687.99H722.77V688.7H632.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 676.669 687.248)"
                        d="M631.49 686.86H721.88V687.57H631.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 680.238 691.763)"
                        d="M635.06 691.37H725.4499999999999V692.08H635.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 674.882 684.99)"
                        d="M629.7 684.6H720.09V685.3100000000001H629.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 673.986 683.86)"
                        d="M628.81 683.47H719.1999999999999V684.1800000000001H628.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 675.773 686.118)"
                        d="M630.6 685.73H720.99V686.44H630.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 672.197 681.606)"
                        d="M627.02 681.22H717.41V681.9300000000001H627.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 671.306 680.478)"
                        d="M626.13 680.09H716.52V680.8000000000001H626.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 670.415 679.35)"
                        d="M625.24 678.96H715.63V679.6700000000001H625.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 669.519 678.219)"
                        d="M624.34 677.83H714.73V678.5400000000001H624.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 673.095 682.731)"
                        d="M627.92 682.35H718.31V683.0600000000001H627.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 667.732 675.96)"
                        d="M622.56 675.57H712.9499999999999V676.2800000000001H622.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 666.84 674.832)"
                        d="M621.66 674.45H712.05V675.1600000000001H621.66z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 668.628 677.09)"
                        d="M623.45 676.7H713.84V677.4100000000001H623.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 665.054 672.574)"
                        d="M619.88 672.19H710.27V672.9000000000001H619.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 664.161 671.45)"
                        d="M618.98 671.06H709.37V671.77H618.98z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 663.265 670.32)"
                        d="M618.09 669.93H708.48V670.64H618.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 662.374 669.192)"
                        d="M617.2 668.8H707.59V669.51H617.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 665.945 673.702)"
                        d="M620.77 673.32H711.16V674.0300000000001H620.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 660.587 666.933)"
                        d="M615.41 666.55H705.8V667.26H615.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 659.691 665.803)"
                        d="M614.52 665.42H704.91V666.13H614.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 661.478 668.062)"
                        d="M616.3 667.67H706.6899999999999V668.38H616.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 657.806 663.213)"
                        d="M612.63 662.83H703.02V663.5400000000001H612.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 656.915 662.085)"
                        d="M611.74 661.7H702.13V662.4100000000001H611.74z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(141.63 656.02 660.955)"
                        d="M610.84 660.57H701.23V661.2800000000001H610.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 655.128 659.826)"
                        d="M609.95 659.44H700.34V660.1500000000001H609.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 658.702 664.343)"
                        d="M613.52 663.95H703.91V664.6600000000001H613.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 653.341 657.568)"
                        d="M608.16 657.18H698.55V657.89H608.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(141.63 652.45 656.44)"
                        d="M607.27 656.05H697.66V656.76H607.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(141.63 654.237 658.698)"
                        d="M609.06 658.31H699.4499999999999V659.02H609.06z"
                      />
                    </g>
                    <g clipPath="url(#clippath-26)">
                      <path
                        className="cls-81"
                        transform="rotate(154.27 692.14 801.683)"
                        d="M646.92 801.37H737.31V802.08H646.92z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 691.515 800.388)"
                        d="M646.29 800.07H736.68V800.7800000000001H646.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 690.267 797.794)"
                        d="M645.04 797.48H735.43V798.19H645.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 689.642 796.499)"
                        d="M644.42 796.18H734.81V796.89H644.42z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 689.012 795.203)"
                        d="M643.79 794.89H734.18V795.6H643.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 688.387 793.908)"
                        d="M643.17 793.59H733.56V794.3000000000001H643.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 690.89 799.094)"
                        d="M645.67 798.78H736.06V799.49H645.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 687.138 791.313)"
                        d="M641.92 791H732.31V791.71H641.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 686.513 790.019)"
                        d="M641.29 789.7H731.68V790.4100000000001H641.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 687.763 792.608)"
                        d="M642.54 792.29H732.93V793H642.54z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(154.27 685.89 788.719)"
                        d="M640.67 788.4H731.06V789.11H640.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 685.265 787.424)"
                        d="M640.04 787.11H730.43V787.82H640.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 684.016 784.83)"
                        d="M638.79 784.51H729.18V785.22H638.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 683.391 783.534)"
                        d="M638.17 783.22H728.56V783.9300000000001H638.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 682.761 782.238)"
                        d="M637.54 781.92H727.93V782.63H637.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 682.137 780.939)"
                        d="M636.92 780.62H727.31V781.33H636.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 684.64 786.129)"
                        d="M639.42 785.81H729.81V786.52H639.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 680.887 778.349)"
                        d="M635.67 778.03H726.06V778.74H635.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 680.264 777.049)"
                        d="M635.04 776.73H725.43V777.44H635.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 681.512 779.644)"
                        d="M636.29 779.33H726.68V780.0400000000001H636.29z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(154.27 679.639 775.754)"
                        d="M634.42 775.44H724.81V776.1500000000001H634.42z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 679.014 774.46)"
                        d="M633.79 774.14H724.18V774.85H633.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 677.765 771.865)"
                        d="M632.54 771.55H722.93V772.26H632.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 677.14 770.57)"
                        d="M631.92 770.25H722.31V770.96H631.92z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 676.511 769.269)"
                        d="M631.29 768.95H721.68V769.6600000000001H631.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 675.887 767.974)"
                        d="M630.67 767.66H721.06V768.37H630.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 678.39 773.16)"
                        d="M633.17 772.84H723.56V773.5500000000001H633.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 674.638 765.38)"
                        d="M629.42 765.06H719.81V765.77H629.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 674.013 764.084)"
                        d="M628.79 763.77H719.18V764.48H628.79z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 675.262 766.68)"
                        d="M630.04 766.36H720.43V767.07H630.04z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(154.27 673.388 762.79)"
                        d="M628.17 762.47H718.56V763.1800000000001H628.17z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 672.764 761.49)"
                        d="M627.54 761.17H717.93V761.88H627.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 671.514 758.9)"
                        d="M626.29 758.58H716.68V759.2900000000001H626.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 670.89 757.6)"
                        d="M625.67 757.28H716.06V757.99H625.67z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 670.26 756.304)"
                        d="M625.04 755.99H715.43V756.7H625.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 669.636 755.01)"
                        d="M624.42 754.69H714.81V755.4000000000001H624.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 672.14 760.195)"
                        d="M626.92 759.88H717.31V760.59H626.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 668.387 752.415)"
                        d="M623.17 752.1H713.56V752.8100000000001H623.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 667.762 751.12)"
                        d="M622.54 750.8H712.93V751.51H622.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 669.012 753.71)"
                        d="M623.79 753.39H714.18V754.1H623.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 667.138 749.82)"
                        d="M621.92 749.5H712.31V750.21H621.92z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(154.27 666.514 748.525)"
                        d="M621.29 748.21H711.68V748.9200000000001H621.29z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 665.889 747.23)"
                        d="M620.67 746.91H711.06V747.62H620.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 664.64 744.636)"
                        d="M619.42 744.32H709.81V745.0300000000001H619.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 664.01 743.34)"
                        d="M618.79 743.02H709.18V743.73H618.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 663.386 742.04)"
                        d="M618.17 741.73H708.56V742.44H618.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 662.761 740.745)"
                        d="M617.54 740.43H707.93V741.14H617.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 665.265 745.93)"
                        d="M620.04 745.61H710.43V746.32H620.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 661.513 738.15)"
                        d="M616.29 737.84H706.68V738.5500000000001H616.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 660.888 736.856)"
                        d="M615.67 736.54H706.06V737.25H615.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 662.136 739.45)"
                        d="M616.92 739.13H707.31V739.84H616.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 659.638 734.266)"
                        d="M614.42 733.95H704.81V734.6600000000001H614.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 659.014 732.966)"
                        d="M613.79 732.65H704.18V733.36H613.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 658.39 731.671)"
                        d="M613.17 731.35H703.56V732.0600000000001H613.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 657.76 730.375)"
                        d="M612.54 730.06H702.93V730.77H612.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 660.263 735.56)"
                        d="M615.04 735.24H705.43V735.95H615.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 656.51 727.78)"
                        d="M611.29 727.46H701.68V728.1700000000001H611.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 655.886 726.486)"
                        d="M610.67 726.17H701.06V726.88H610.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 657.136 729.075)"
                        d="M611.92 728.76H702.31V729.47H611.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 654.637 723.891)"
                        d="M609.42 723.57H699.81V724.2800000000001H609.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 654.012 722.596)"
                        d="M608.79 722.28H699.18V722.99H608.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 653.388 721.296)"
                        d="M608.17 720.98H698.56V721.69H608.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 652.763 720.001)"
                        d="M607.54 719.68H697.93V720.39H607.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 655.262 725.186)"
                        d="M610.04 724.87H700.43V725.58H610.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 651.51 717.406)"
                        d="M606.29 717.09H696.68V717.8000000000001H606.29z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 650.885 716.11)"
                        d="M605.67 715.79H696.06V716.5H605.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 652.138 718.707)"
                        d="M606.92 718.39H697.31V719.1H606.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 649.615 713.47)"
                        d="M604.4 713.15H694.79V713.86H604.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 648.99 712.174)"
                        d="M603.77 711.85H694.16V712.5600000000001H603.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 650.24 714.764)"
                        d="M605.02 714.45H695.41V715.1600000000001H605.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 648.362 710.873)"
                        d="M603.15 710.56H693.54V711.27H603.15z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(154.27 647.737 709.579)"
                        d="M602.52 709.26H692.91V709.97H602.52z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(154.27 647.112 708.284)"
                        d="M601.9 707.96H692.29V708.6700000000001H601.9z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 645.863 705.69)"
                        d="M600.65 705.37H691.04V706.08H600.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 645.238 704.394)"
                        d="M600.02 704.07H690.41V704.7800000000001H600.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 644.613 703.1)"
                        d="M599.4 702.78H689.79V703.49H599.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 643.99 701.8)"
                        d="M598.77 701.48H689.16V702.19H598.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 646.487 706.989)"
                        d="M601.27 706.67H691.66V707.38H601.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 642.74 699.21)"
                        d="M597.52 698.89H687.91V699.6H597.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 642.11 697.909)"
                        d="M596.9 697.59H687.29V698.3000000000001H596.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 643.364 700.505)"
                        d="M598.15 700.18H688.54V700.89H598.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 640.861 695.32)"
                        d="M595.65 695H686.04V695.71H595.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 640.237 694.02)"
                        d="M595.02 693.7H685.41V694.4100000000001H595.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 639.612 692.725)"
                        d="M594.4 692.41H684.79V693.12H594.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 638.987 691.43)"
                        d="M593.77 691.11H684.16V691.82H593.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 641.486 696.614)"
                        d="M596.27 696.3H686.66V697.01H596.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 637.739 688.835)"
                        d="M592.52 688.52H682.91V689.23H592.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 637.114 687.54)"
                        d="M591.9 687.22H682.29V687.9300000000001H591.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 638.364 690.13)"
                        d="M593.15 689.81H683.54V690.52H593.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 635.86 684.944)"
                        d="M590.65 684.63H681.04V685.34H590.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 635.235 683.65)"
                        d="M590.02 683.33H680.41V684.0400000000001H590.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 634.611 682.35)"
                        d="M589.4 682.03H679.79V682.74H589.4z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 633.986 681.055)"
                        d="M588.77 680.74H679.16V681.45H588.77z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 636.49 686.24)"
                        d="M591.27 685.92H681.66V686.63H591.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 632.738 678.46)"
                        d="M587.52 678.14H677.91V678.85H587.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 632.113 677.165)"
                        d="M586.9 676.85H677.29V677.5600000000001H586.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 633.362 679.76)"
                        d="M588.15 679.44H678.54V680.1500000000001H588.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 630.838 674.223)"
                        d="M585.62 673.91H676.01V674.62H585.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 630.213 672.928)"
                        d="M585 672.61H675.39V673.32H585z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(154.27 629.589 671.633)"
                        d="M584.37 671.31H674.76V672.02H584.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 628.965 670.333)"
                        d="M583.75 670.02H674.14V670.73H583.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 631.462 675.523)"
                        d="M586.25 675.2H676.64V675.9100000000001H586.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 627.715 667.744)"
                        d="M582.5 667.42H672.89V668.13H582.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(154.27 627.091 666.444)"
                        d="M581.87 666.13H672.26V666.84H581.87z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(154.27 628.34 669.038)"
                        d="M583.12 668.72H673.51V669.4300000000001H583.12z"
                      />
                    </g>
                    <g clipPath="url(#clippath-27)">
                      <path
                        className="cls-81"
                        transform="rotate(170.32 619.762 828.337)"
                        d="M574.6 827.96H664.99V828.6700000000001H574.6z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 619.52 826.916)"
                        d="M574.36 826.54H664.75V827.25H574.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 619.04 824.08)"
                        d="M573.87 823.7H664.26V824.4100000000001H573.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 618.797 822.66)"
                        d="M573.63 822.28H664.02V822.99H573.63z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 618.555 821.24)"
                        d="M573.39 820.86H663.78V821.57H573.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 618.312 819.824)"
                        d="M573.15 819.44H663.54V820.1500000000001H573.15z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 619.282 825.496)"
                        d="M574.12 825.12H664.51V825.83H574.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 617.827 816.983)"
                        d="M572.67 816.6H663.06V817.3100000000001H572.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 617.585 815.563)"
                        d="M572.42 815.19H662.81V815.9000000000001H572.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 618.07 818.404)"
                        d="M572.91 818.02H663.3V818.73H572.91z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(170.32 617.342 814.147)"
                        d="M572.18 813.77H662.5699999999999V814.48H572.18z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 617.105 812.727)"
                        d="M571.94 812.35H662.33V813.0600000000001H571.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 616.62 809.891)"
                        d="M571.46 809.51H661.85V810.22H571.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 616.378 808.47)"
                        d="M571.21 808.09H661.6V808.8000000000001H571.21z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 616.135 807.05)"
                        d="M570.97 806.67H661.36V807.38H570.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 615.893 805.635)"
                        d="M570.73 805.25H661.12V805.96H570.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 616.863 811.307)"
                        d="M571.7 810.93H662.09V811.64H571.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 615.408 802.794)"
                        d="M570.25 802.41H660.64V803.12H570.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 615.166 801.373)"
                        d="M570 801H660.39V801.71H570z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 615.65 804.214)"
                        d="M570.49 803.83H660.88V804.5400000000001H570.49z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(170.32 614.928 799.958)"
                        d="M569.76 799.58H660.15V800.2900000000001H569.76z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 614.686 798.538)"
                        d="M569.52 798.16H659.91V798.87H569.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 614.2 795.702)"
                        d="M569.04 795.32H659.43V796.0300000000001H569.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 613.958 794.282)"
                        d="M568.79 793.9H659.18V794.61H568.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 613.716 792.861)"
                        d="M568.55 792.48H658.9399999999999V793.19H568.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 613.473 791.446)"
                        d="M568.31 791.06H658.6999999999999V791.77H568.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 614.443 797.117)"
                        d="M569.28 796.74H659.67V797.45H569.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 612.994 788.605)"
                        d="M567.83 788.23H658.22V788.94H567.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 612.751 787.185)"
                        d="M567.59 786.81H657.98V787.52H567.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 613.231 790.025)"
                        d="M568.07 789.64H658.46V790.35H568.07z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(170.32 612.509 785.769)"
                        d="M567.34 785.39H657.73V786.1H567.34z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 612.266 784.349)"
                        d="M567.1 783.97H657.49V784.6800000000001H567.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 611.781 781.513)"
                        d="M566.62 781.13H657.01V781.84H566.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 611.54 780.092)"
                        d="M566.38 779.71H656.77V780.4200000000001H566.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 611.297 778.672)"
                        d="M566.13 778.29H656.52V779H566.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 611.054 777.256)"
                        d="M565.89 776.87H656.28V777.58H565.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 612.024 782.928)"
                        d="M566.86 782.55H657.25V783.26H566.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 610.574 774.416)"
                        d="M565.41 774.04H655.8V774.75H565.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 610.332 772.995)"
                        d="M565.17 772.62H655.56V773.33H565.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 610.817 775.836)"
                        d="M565.65 775.46H656.04V776.1700000000001H565.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 610.09 771.58)"
                        d="M564.92 771.2H655.31V771.9100000000001H564.92z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(170.32 609.847 770.16)"
                        d="M564.68 769.78H655.0699999999999V770.49H564.68z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 609.605 768.739)"
                        d="M564.44 768.36H654.83V769.07H564.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 609.12 765.903)"
                        d="M563.96 765.52H654.35V766.23H563.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 608.877 764.482)"
                        d="M563.71 764.1H654.1V764.8100000000001H563.71z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 608.64 763.067)"
                        d="M563.47 762.69H653.86V763.4000000000001H563.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 608.397 761.647)"
                        d="M563.23 761.27H653.62V761.98H563.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 609.362 767.323)"
                        d="M564.2 766.94H654.59V767.6500000000001H564.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 607.913 758.806)"
                        d="M562.75 758.43H653.14V759.14H562.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 607.67 757.39)"
                        d="M562.5 757.01H652.89V757.72H562.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 608.155 760.226)"
                        d="M562.99 759.85H653.38V760.5600000000001H562.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 607.186 754.55)"
                        d="M562.02 754.17H652.41V754.88H562.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 606.943 753.134)"
                        d="M561.78 752.75H652.17V753.46H561.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 606.7 751.713)"
                        d="M561.54 751.33H651.93V752.0400000000001H561.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 606.463 750.293)"
                        d="M561.3 749.91H651.6899999999999V750.62H561.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 607.428 755.97)"
                        d="M562.26 755.59H652.65V756.3000000000001H562.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 605.978 747.457)"
                        d="M560.81 747.08H651.1999999999999V747.7900000000001H560.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 605.736 746.037)"
                        d="M560.57 745.66H650.96V746.37H560.57z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 606.22 748.878)"
                        d="M561.05 748.5H651.4399999999999V749.21H561.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 605.25 743.2)"
                        d="M560.09 742.82H650.48V743.5300000000001H560.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 605.009 741.78)"
                        d="M559.84 741.4H650.23V742.11H559.84z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 604.766 740.36)"
                        d="M559.6 739.98H649.99V740.69H559.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 604.524 738.944)"
                        d="M559.36 738.56H649.75V739.27H559.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 605.494 744.616)"
                        d="M560.33 744.24H650.72V744.95H560.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 604.044 736.104)"
                        d="M558.88 735.73H649.27V736.44H558.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 603.801 734.688)"
                        d="M558.63 734.31H649.02V735.02H558.63z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 604.286 737.524)"
                        d="M559.12 737.14H649.51V737.85H559.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 603.306 731.796)"
                        d="M558.14 731.42H648.53V732.13H558.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 603.064 730.376)"
                        d="M557.9 730H648.29V730.71H557.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 603.548 733.217)"
                        d="M558.38 732.84H648.77V733.5500000000001H558.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 602.826 728.956)"
                        d="M557.66 728.58H648.05V729.2900000000001H557.66z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(170.32 602.584 727.54)"
                        d="M557.42 727.16H647.81V727.87H557.42z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(170.32 602.341 726.12)"
                        d="M557.17 725.74H647.56V726.45H557.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 601.856 723.284)"
                        d="M556.69 722.9H647.08V723.61H556.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 601.614 721.863)"
                        d="M556.45 721.48H646.84V722.19H556.45z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 601.372 720.443)"
                        d="M556.21 720.06H646.6V720.77H556.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 601.129 719.027)"
                        d="M555.96 718.65H646.35V719.36H555.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 602.099 724.7)"
                        d="M556.93 724.32H647.3199999999999V725.0300000000001H556.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 600.65 716.187)"
                        d="M555.48 715.81H645.87V716.52H555.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 600.407 714.766)"
                        d="M555.24 714.39H645.63V715.1H555.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 600.892 717.607)"
                        d="M555.72 717.23H646.11V717.94H555.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 599.922 711.93)"
                        d="M554.75 711.55H645.14V712.26H554.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 599.68 710.51)"
                        d="M554.51 710.13H644.9V710.84H554.51z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 599.437 709.094)"
                        d="M554.27 708.71H644.66V709.4200000000001H554.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 599.195 707.674)"
                        d="M554.03 707.29H644.42V708H554.03z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 600.164 713.35)"
                        d="M555 712.97H645.39V713.6800000000001H555z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 598.715 704.838)"
                        d="M553.55 704.46H643.9399999999999V705.1700000000001H553.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 598.472 703.418)"
                        d="M553.3 703.04H643.6899999999999V703.75H553.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 598.952 706.253)"
                        d="M553.79 705.88H644.18V706.59H553.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 597.988 700.577)"
                        d="M552.82 700.2H643.21V700.9100000000001H552.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 597.745 699.161)"
                        d="M552.58 698.78H642.97V699.49H552.58z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 597.503 697.74)"
                        d="M552.34 697.36H642.73V698.07H552.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 597.26 696.32)"
                        d="M552.09 695.94H642.48V696.6500000000001H552.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 598.23 701.997)"
                        d="M553.06 701.62H643.4499999999999V702.33H553.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 596.775 693.484)"
                        d="M551.61 693.11H642V693.82H551.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 596.538 692.064)"
                        d="M551.37 691.69H641.76V692.4000000000001H551.37z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 597.018 694.905)"
                        d="M551.85 694.52H642.24V695.23H551.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 596.127 688.887)"
                        d="M550.96 688.51H641.35V689.22H550.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 595.885 687.467)"
                        d="M550.72 687.09H641.11V687.8000000000001H550.72z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(170.32 595.642 686.051)"
                        d="M550.47 685.67H640.86V686.38H550.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 595.4 684.63)"
                        d="M550.23 684.25H640.62V684.96H550.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 596.37 690.308)"
                        d="M551.2 689.93H641.59V690.64H551.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 594.915 681.795)"
                        d="M549.75 681.41H640.14V682.12H549.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(170.32 594.678 680.375)"
                        d="M549.51 680H639.9V680.71H549.51z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(170.32 595.158 683.21)"
                        d="M549.99 682.83H640.38V683.5400000000001H549.99z"
                      />
                    </g>
                    <g clipPath="url(#clippath-28)">
                      <path
                        className="cls-81"
                        transform="rotate(178.53 568.747 836.688)"
                        d="M523.55 836.34H613.9399999999999V837.0500000000001H523.55z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 568.71 835.252)"
                        d="M523.52 834.9H613.91V835.61H523.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.637 832.37)"
                        d="M523.44 832.02H613.83V832.73H523.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.595 830.935)"
                        d="M523.4 830.58H613.79V831.2900000000001H523.4z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 568.559 829.494)"
                        d="M523.37 829.14H613.76V829.85H523.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.522 828.059)"
                        d="M523.33 827.7H613.72V828.4100000000001H523.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 568.673 833.811)"
                        d="M523.48 833.46H613.87V834.1700000000001H523.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.45 825.177)"
                        d="M523.26 824.83H613.65V825.5400000000001H523.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.413 823.741)"
                        d="M523.22 823.39H613.61V824.1H523.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 568.486 826.618)"
                        d="M523.29 826.26H613.68V826.97H523.29z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(178.53 568.376 822.3)"
                        d="M523.18 821.95H613.5699999999999V822.6600000000001H523.18z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 568.34 820.86)"
                        d="M523.15 820.51H613.54V821.22H523.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.266 817.984)"
                        d="M523.07 817.63H613.46V818.34H523.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.23 816.543)"
                        d="M523.04 816.19H613.43V816.9000000000001H523.04z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 568.193 815.107)"
                        d="M523 814.75H613.39V815.46H523z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.157 813.667)"
                        d="M522.96 813.31H613.35V814.02H522.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 568.303 819.424)"
                        d="M523.11 819.07H613.5V819.7800000000001H523.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.079 810.79)"
                        d="M522.89 810.44H613.28V811.1500000000001H522.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 568.042 809.35)"
                        d="M522.85 809H613.24V809.71H522.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 568.115 812.226)"
                        d="M522.92 811.88H613.31V812.59H522.92z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(178.53 568.006 807.914)"
                        d="M522.81 807.56H613.1999999999999V808.27H522.81z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 567.969 806.473)"
                        d="M522.78 806.12H613.17V806.83H522.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.896 803.597)"
                        d="M522.7 803.24H613.09V803.95H522.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.86 802.156)"
                        d="M522.67 801.8H613.06V802.51H522.67z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 567.823 800.715)"
                        d="M522.63 800.36H613.02V801.07H522.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.786 799.28)"
                        d="M522.59 798.92H612.98V799.63H522.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 567.932 805.032)"
                        d="M522.74 804.68H613.13V805.39H522.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.713 796.398)"
                        d="M522.52 796.05H612.91V796.76H522.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.677 794.962)"
                        d="M522.48 794.61H612.87V795.32H522.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 567.75 797.839)"
                        d="M522.56 797.49H612.9499999999999V798.2H522.56z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(178.53 567.64 793.522)"
                        d="M522.44 793.17H612.83V793.88H522.44z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 567.599 792.08)"
                        d="M522.41 791.73H612.8V792.44H522.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.525 789.204)"
                        d="M522.33 788.85H612.72V789.5600000000001H522.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.489 787.769)"
                        d="M522.3 787.41H612.6899999999999V788.12H522.3z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 567.452 786.328)"
                        d="M522.26 785.97H612.65V786.6800000000001H522.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.416 784.887)"
                        d="M522.22 784.54H612.61V785.25H522.22z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 567.562 790.645)"
                        d="M522.37 790.29H612.76V791H522.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.343 782.01)"
                        d="M522.15 781.66H612.54V782.37H522.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.306 780.57)"
                        d="M522.11 780.22H612.5V780.9300000000001H522.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 567.38 783.452)"
                        d="M522.19 783.1H612.58V783.8100000000001H522.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.27 779.134)"
                        d="M522.08 778.78H612.47V779.49H522.08z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(178.53 567.233 777.694)"
                        d="M522.04 777.34H612.43V778.0500000000001H522.04z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 567.197 776.253)"
                        d="M522 775.9H612.39V776.61H522z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.118 773.377)"
                        d="M521.93 773.02H612.3199999999999V773.73H521.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.082 771.936)"
                        d="M521.89 771.59H612.28V772.3000000000001H521.89z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 567.045 770.5)"
                        d="M521.85 770.15H612.24V770.86H521.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 567.009 769.06)"
                        d="M521.82 768.71H612.21V769.4200000000001H521.82z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 567.16 774.817)"
                        d="M521.96 774.46H612.35V775.1700000000001H521.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.936 766.183)"
                        d="M521.74 765.83H612.13V766.5400000000001H521.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.9 764.742)"
                        d="M521.71 764.39H612.1V765.1H521.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.972 767.624)"
                        d="M521.78 767.27H612.17V767.98H521.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.826 761.866)"
                        d="M521.63 761.51H612.02V762.22H521.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.79 760.425)"
                        d="M521.6 760.07H611.99V760.7800000000001H521.6z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 566.753 758.99)"
                        d="M521.56 758.63H611.9499999999999V759.34H521.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.716 757.549)"
                        d="M521.52 757.2H611.91V757.9100000000001H521.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.863 763.307)"
                        d="M521.67 762.95H612.06V763.6600000000001H521.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.638 754.672)"
                        d="M521.45 754.32H611.84V755.0300000000001H521.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.602 753.232)"
                        d="M521.41 752.88H611.8V753.59H521.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.68 756.108)"
                        d="M521.48 755.76H611.87V756.47H521.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.529 750.355)"
                        d="M521.34 750H611.73V750.71H521.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.492 748.914)"
                        d="M521.3 748.56H611.6899999999999V749.27H521.3z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 566.455 747.479)"
                        d="M521.26 747.12H611.65V747.83H521.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.419 746.038)"
                        d="M521.23 745.68H611.62V746.39H521.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.565 751.79)"
                        d="M521.37 751.44H611.76V752.1500000000001H521.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.346 743.162)"
                        d="M521.15 742.81H611.54V743.52H521.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.31 741.721)"
                        d="M521.12 741.37H611.51V742.08H521.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.382 744.597)"
                        d="M521.19 744.25H611.58V744.96H521.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.232 738.79)"
                        d="M521.04 738.44H611.43V739.1500000000001H521.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.195 737.349)"
                        d="M521 737H611.39V737.71H521z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.268 740.23)"
                        d="M521.08 739.88H611.47V740.59H521.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.159 735.913)"
                        d="M520.97 735.56H611.36V736.27H520.97z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(178.53 566.122 734.472)"
                        d="M520.93 734.12H611.3199999999999V734.83H520.93z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(178.53 566.086 733.032)"
                        d="M520.89 732.68H611.28V733.39H520.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 566.013 730.155)"
                        d="M520.82 729.8H611.21V730.51H520.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.976 728.72)"
                        d="M520.78 728.36H611.17V729.07H520.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 565.94 727.279)"
                        d="M520.74 726.93H611.13V727.64H520.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.903 725.838)"
                        d="M520.71 725.49H611.1V726.2H520.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 566.05 731.596)"
                        d="M520.86 731.24H611.25V731.95H520.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.825 722.962)"
                        d="M520.63 722.61H611.02V723.32H520.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.788 721.521)"
                        d="M520.6 721.17H610.99V721.88H520.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.866 724.402)"
                        d="M520.67 724.05H611.06V724.76H520.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.715 718.645)"
                        d="M520.52 718.29H610.91V719H520.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.679 717.204)"
                        d="M520.49 716.85H610.88V717.5600000000001H520.49z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 565.642 715.768)"
                        d="M520.45 715.41H610.84V716.12H520.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.606 714.327)"
                        d="M520.41 713.97H610.8V714.6800000000001H520.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.752 720.085)"
                        d="M520.56 719.73H610.9499999999999V720.44H520.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.532 711.451)"
                        d="M520.34 711.1H610.73V711.8100000000001H520.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.496 710.01)"
                        d="M520.3 709.66H610.6899999999999V710.37H520.3z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.569 712.887)"
                        d="M520.38 712.54H610.77V713.25H520.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.423 707.134)"
                        d="M520.23 706.78H610.62V707.49H520.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.386 705.693)"
                        d="M520.19 705.34H610.58V706.0500000000001H520.19z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 565.345 704.257)"
                        d="M520.15 703.9H610.54V704.61H520.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.308 702.817)"
                        d="M520.12 702.46H610.51V703.1700000000001H520.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.46 708.575)"
                        d="M520.26 708.22H610.65V708.9300000000001H520.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.235 699.94)"
                        d="M520.04 699.59H610.43V700.3000000000001H520.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.199 698.5)"
                        d="M520.01 698.15H610.4V698.86H520.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.272 701.376)"
                        d="M520.08 701.02H610.47V701.73H520.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.25 695.295)"
                        d="M520.05 694.94H610.4399999999999V695.6500000000001H520.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.213 693.859)"
                        d="M520.02 693.5H610.41V694.21H520.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(178.53 565.172 692.418)"
                        d="M519.98 692.07H610.37V692.7800000000001H519.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.135 690.978)"
                        d="M519.94 690.63H610.33V691.34H519.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.286 696.735)"
                        d="M520.09 696.38H610.48V697.09H520.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.062 688.101)"
                        d="M519.87 687.75H610.26V688.46H519.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(178.53 565.025 686.665)"
                        d="M519.83 686.31H610.22V687.02H519.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(178.53 565.098 689.542)"
                        d="M519.91 689.19H610.3V689.9000000000001H519.91z"
                      />
                    </g>
                    <g clipPath="url(#clippath-29)">
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 433.372 831.639)"
                        d="M388.14 831.3H478.53V832.01H388.14z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 433.783 830.26)"
                        d="M388.55 829.92H478.94V830.63H388.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 434.611 827.505)"
                        d="M389.38 827.16H479.77V827.87H389.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 435.022 826.122)"
                        d="M389.79 825.78H480.18V826.49H389.79z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 435.433 824.744)"
                        d="M390.2 824.41H480.59V825.12H390.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 435.844 823.366)"
                        d="M390.61 823.03H481V823.74H390.61z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 434.2 828.882)"
                        d="M388.97 828.54H479.36V829.25H388.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 436.671 820.605)"
                        d="M391.44 820.27H481.83V820.98H391.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 437.083 819.228)"
                        d="M391.85 818.89H482.24V819.6H391.85z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 436.256 821.989)"
                        d="M391.03 821.65H481.41999999999996V822.36H391.03z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 437.494 817.85)"
                        d="M392.26 817.51H482.65V818.22H392.26z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 437.905 816.472)"
                        d="M392.68 816.13H483.07V816.84H392.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 438.727 813.712)"
                        d="M393.5 813.37H483.89V814.08H393.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 439.144 812.333)"
                        d="M393.91 811.99H484.3V812.7H393.91z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 439.554 810.95)"
                        d="M394.32 810.61H484.71V811.32H394.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 439.966 809.573)"
                        d="M394.74 809.23H485.13V809.94H394.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 438.316 815.09)"
                        d="M393.09 814.75H483.47999999999996V815.46H393.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 440.788 806.817)"
                        d="M395.56 806.48H485.95V807.19H395.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 441.2 805.434)"
                        d="M395.97 805.1H486.36V805.8100000000001H395.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 440.377 808.195)"
                        d="M395.15 807.86H485.53999999999996V808.57H395.15z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 441.615 804.056)"
                        d="M396.38 803.72H486.77V804.4300000000001H396.38z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 442.027 802.678)"
                        d="M396.8 802.34H487.19V803.0500000000001H396.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 442.849 799.918)"
                        d="M397.62 799.58H488.01V800.2900000000001H397.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 443.26 798.54)"
                        d="M398.03 798.2H488.41999999999996V798.9100000000001H398.03z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 443.676 797.161)"
                        d="M398.44 796.82H488.83V797.5300000000001H398.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 444.088 795.784)"
                        d="M398.86 795.44H489.25V796.1500000000001H398.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 442.438 801.3)"
                        d="M397.21 800.96H487.59999999999997V801.6700000000001H397.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 444.91 793.023)"
                        d="M399.68 792.68H490.07V793.39H399.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 445.321 791.645)"
                        d="M400.09 791.31H490.47999999999996V792.02H400.09z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 444.498 794.4)"
                        d="M399.27 794.06H489.65999999999997V794.77H399.27z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 445.732 790.268)"
                        d="M400.5 789.93H490.89V790.64H400.5z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 446.148 788.884)"
                        d="M400.92 788.55H491.31V789.26H400.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 446.97 786.129)"
                        d="M401.74 785.79H492.13V786.5H401.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 447.382 784.751)"
                        d="M402.15 784.41H492.53999999999996V785.12H402.15z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 447.793 783.368)"
                        d="M402.56 783.03H492.95V783.74H402.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 448.204 781.99)"
                        d="M402.98 781.65H493.37V782.36H402.98z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 446.56 787.506)"
                        d="M401.33 787.17H491.71999999999997V787.88H401.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 449.031 779.23)"
                        d="M403.8 778.89H494.19V779.6H403.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 449.442 777.852)"
                        d="M404.21 777.51H494.59999999999997V778.22H404.21z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 448.62 780.612)"
                        d="M403.39 780.27H493.78V780.98H403.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 449.854 776.474)"
                        d="M404.62 776.13H495.01V776.84H404.62z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 450.265 775.096)"
                        d="M405.04 774.76H495.43V775.47H405.04z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 450.676 773.713)"
                        d="M405.45 773.38H495.84V774.09H405.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 451.503 770.957)"
                        d="M406.27 770.62H496.65999999999997V771.33H406.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 451.915 769.58)"
                        d="M406.69 769.24H497.08V769.95H406.69z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 452.325 768.197)"
                        d="M407.1 767.86H497.49V768.57H407.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 452.737 766.819)"
                        d="M407.51 766.48H497.9V767.19H407.51z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 451.092 772.335)"
                        d="M405.86 772H496.25V772.71H405.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 453.564 764.063)"
                        d="M408.33 763.72H498.71999999999997V764.4300000000001H408.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 453.975 762.68)"
                        d="M408.75 762.34H499.14V763.0500000000001H408.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 453.148 765.441)"
                        d="M407.92 765.1H498.31V765.8100000000001H407.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 454.798 759.924)"
                        d="M409.57 759.58H499.96V760.2900000000001H409.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 455.21 758.547)"
                        d="M409.98 758.21H500.37V758.9200000000001H409.98z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 455.62 757.164)"
                        d="M410.39 756.83H500.78V757.5400000000001H410.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 456.036 755.785)"
                        d="M410.81 755.45H501.2V756.1600000000001H410.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 454.386 761.302)"
                        d="M409.16 760.96H499.55V761.6700000000001H409.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 456.858 753.025)"
                        d="M411.63 752.69H502.02V753.4000000000001H411.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 457.27 751.647)"
                        d="M412.04 751.31H502.43V752.02H412.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 456.447 754.408)"
                        d="M411.22 754.07H501.61V754.7800000000001H411.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 458.092 748.892)"
                        d="M412.87 748.55H503.26V749.26H412.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 458.508 747.508)"
                        d="M413.28 747.17H503.66999999999996V747.88H413.28z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 458.92 746.13)"
                        d="M413.69 745.79H504.08V746.5H413.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 459.33 744.753)"
                        d="M414.1 744.41H504.49V745.12H414.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 457.68 750.27)"
                        d="M412.45 749.93H502.84V750.64H412.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 460.152 741.992)"
                        d="M414.93 741.66H505.32V742.37H414.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 460.564 740.614)"
                        d="M415.34 740.28H505.72999999999996V740.99H415.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 459.742 743.375)"
                        d="M414.51 743.04H504.9V743.75H414.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 461.404 737.805)"
                        d="M416.18 737.47H506.57V738.1800000000001H416.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 461.815 736.428)"
                        d="M416.59 736.09H506.97999999999996V736.8000000000001H416.59z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 460.993 739.183)"
                        d="M415.77 738.85H506.15999999999997V739.5600000000001H415.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 462.231 735.044)"
                        d="M417 734.71H507.39V735.4200000000001H417z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-163.36 462.642 733.666)"
                        d="M417.41 733.33H507.8V734.0400000000001H417.41z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-163.36 463.054 732.289)"
                        d="M417.83 731.95H508.21999999999997V732.6600000000001H417.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 463.876 729.528)"
                        d="M418.65 729.19H509.03999999999996V729.9000000000001H418.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 464.287 728.15)"
                        d="M419.06 727.81H509.45V728.52H419.06z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 464.703 726.772)"
                        d="M419.47 726.43H509.86V727.14H419.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 465.115 725.394)"
                        d="M419.89 725.05H510.28V725.76H419.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 463.465 730.91)"
                        d="M418.24 730.57H508.63V731.2800000000001H418.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 465.937 722.634)"
                        d="M420.71 722.3H511.09999999999997V723.01H420.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 466.348 721.256)"
                        d="M421.12 720.92H511.51V721.63H421.12z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 465.525 724.011)"
                        d="M420.3 723.68H510.69V724.39H420.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 467.175 718.495)"
                        d="M421.95 718.16H512.34V718.87H421.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 467.586 717.117)"
                        d="M422.36 716.78H512.75V717.49H422.36z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 467.998 715.74)"
                        d="M422.77 715.4H513.16V716.11H422.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 468.41 714.362)"
                        d="M423.18 714.02H513.57V714.73H423.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 466.76 719.878)"
                        d="M421.53 719.54H511.91999999999996V720.25H421.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 469.236 711.6)"
                        d="M424.01 711.26H514.4V711.97H424.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 469.647 710.223)"
                        d="M424.42 709.88H514.8100000000001V710.59H424.42z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 468.82 712.979)"
                        d="M423.6 712.64H513.99V713.35H423.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 470.47 707.462)"
                        d="M425.24 707.13H515.63V707.84H425.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 470.88 706.084)"
                        d="M425.66 705.75H516.0500000000001V706.46H425.66z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 471.292 704.707)"
                        d="M426.07 704.37H516.46V705.08H426.07z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 471.708 703.323)"
                        d="M426.48 702.99H516.87V703.7H426.48z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 470.059 708.845)"
                        d="M424.83 708.51H515.22V709.22H424.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 472.53 700.568)"
                        d="M427.3 700.23H517.69V700.94H427.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 472.942 699.19)"
                        d="M427.72 698.85H518.11V699.5600000000001H427.72z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 472.12 701.945)"
                        d="M426.89 701.61H517.28V702.32H426.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 473.984 696.157)"
                        d="M428.76 695.82H519.15V696.5300000000001H428.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 474.396 694.78)"
                        d="M429.17 694.44H519.5600000000001V695.1500000000001H429.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-163.36 474.807 693.402)"
                        d="M429.58 693.06H519.97V693.77H429.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 475.218 692.019)"
                        d="M429.99 691.68H520.38V692.39H429.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 473.574 697.54)"
                        d="M428.35 697.2H518.74V697.9100000000001H428.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 476.045 689.263)"
                        d="M430.82 688.93H521.21V689.64H430.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-163.36 476.457 687.885)"
                        d="M431.23 687.55H521.62V688.26H431.23z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-163.36 475.63 690.641)"
                        d="M430.41 690.3H520.8000000000001V691.01H430.41z"
                      />
                    </g>
                    <g clipPath="url(#clippath-30)">
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 357.032 812.763)"
                        d="M311.83 812.41H402.21999999999997V813.12H311.83z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 357.673 811.469)"
                        d="M312.47 811.12H402.86V811.83H312.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 358.947 808.892)"
                        d="M313.75 808.54H404.14V809.25H313.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 359.59 807.603)"
                        d="M314.39 807.25H404.78V807.96H314.39z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 360.227 806.314)"
                        d="M315.03 805.96H405.41999999999996V806.6700000000001H315.03z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 360.863 805.021)"
                        d="M315.67 804.67H406.06V805.38H315.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 358.31 810.18)"
                        d="M313.11 809.83H403.5V810.5400000000001H313.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 362.142 802.443)"
                        d="M316.95 802.09H407.34V802.8000000000001H316.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 362.784 801.154)"
                        d="M317.58 800.8H407.96999999999997V801.51H317.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 361.505 803.732)"
                        d="M316.31 803.38H406.7V804.09H316.31z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 363.42 799.86)"
                        d="M318.22 799.51H408.61V800.22H318.22z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 364.057 798.572)"
                        d="M318.86 798.22H409.25V798.9300000000001H318.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 365.337 795.994)"
                        d="M320.14 795.64H410.53V796.35H320.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 365.979 794.705)"
                        d="M320.78 794.35H411.16999999999996V795.0600000000001H320.78z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 366.615 793.411)"
                        d="M321.42 793.06H411.81V793.77H321.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 367.252 792.123)"
                        d="M322.06 791.77H412.45V792.48H322.06z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 364.7 797.283)"
                        d="M319.5 796.93H409.89V797.64H319.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 368.531 789.545)"
                        d="M323.33 789.19H413.71999999999997V789.9000000000001H323.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 369.169 788.257)"
                        d="M323.97 787.9H414.36V788.61H323.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 367.894 790.833)"
                        d="M322.7 790.48H413.09V791.19H322.7z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 369.81 786.962)"
                        d="M324.61 786.61H415V787.32H324.61z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 370.447 785.674)"
                        d="M325.25 785.32H415.64V786.0300000000001H325.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 371.726 783.096)"
                        d="M326.53 782.74H416.91999999999996V783.45H326.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 372.363 781.808)"
                        d="M327.17 781.45H417.56V782.1600000000001H327.17z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 373.004 780.513)"
                        d="M327.81 780.16H418.2V780.87H327.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 373.642 779.225)"
                        d="M328.45 778.87H418.84V779.58H328.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 371.089 784.384)"
                        d="M325.89 784.03H416.28V784.74H325.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 374.921 776.647)"
                        d="M329.72 776.29H420.11V777H329.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 375.557 775.354)"
                        d="M330.36 775H420.75V775.71H330.36z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 374.284 777.935)"
                        d="M329.08 777.58H419.46999999999997V778.2900000000001H329.08z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 376.2 774.064)"
                        d="M331 773.71H421.39V774.4200000000001H331z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 376.836 772.776)"
                        d="M331.64 772.42H422.03V773.13H331.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 378.116 770.198)"
                        d="M332.92 769.84H423.31V770.5500000000001H332.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 378.752 768.905)"
                        d="M333.56 768.55H423.95V769.26H333.56z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 379.394 767.615)"
                        d="M334.2 767.26H424.59V767.97H334.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 380.031 766.327)"
                        d="M334.83 765.97H425.21999999999997V766.6800000000001H334.83z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 377.474 771.488)"
                        d="M332.28 771.13H422.66999999999996V771.84H332.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 381.31 763.749)"
                        d="M336.11 763.4H426.5V764.11H336.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 381.946 762.456)"
                        d="M336.75 762.11H427.14V762.82H336.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 380.668 765.039)"
                        d="M335.47 764.68H425.86V765.39H335.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 382.589 761.166)"
                        d="M337.39 760.82H427.78V761.5300000000001H337.39z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 383.226 759.878)"
                        d="M338.03 759.53H428.41999999999996V760.24H338.03z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 383.863 758.59)"
                        d="M338.67 758.24H429.06V758.95H338.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 385.141 756.007)"
                        d="M339.94 755.66H430.33V756.37H339.94z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 385.778 754.718)"
                        d="M340.58 754.37H430.96999999999997V755.08H340.58z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 386.42 753.429)"
                        d="M341.22 753.08H431.61V753.7900000000001H341.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 387.058 752.14)"
                        d="M341.86 751.79H432.25V752.5H341.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 384.504 757.295)"
                        d="M339.31 756.95H429.7V757.6600000000001H339.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 388.336 749.558)"
                        d="M343.14 749.21H433.53V749.9200000000001H343.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 388.973 748.27)"
                        d="M343.78 747.92H434.16999999999996V748.63H343.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 387.699 750.846)"
                        d="M342.5 750.5H432.89V751.21H342.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 390.253 745.691)"
                        d="M345.06 745.34H435.45V746.0500000000001H345.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 390.894 744.397)"
                        d="M345.69 744.05H436.08V744.76H345.69z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 391.53 743.109)"
                        d="M346.33 742.76H436.71999999999997V743.47H346.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 392.168 741.82)"
                        d="M346.97 741.47H437.36V742.1800000000001H346.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 389.615 746.98)"
                        d="M344.42 746.63H434.81V747.34H344.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 393.447 739.242)"
                        d="M348.25 738.89H438.64V739.6H348.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 394.083 737.95)"
                        d="M348.89 737.6H439.28V738.3100000000001H348.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 392.81 740.53)"
                        d="M347.61 740.18H438V740.89H347.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 395.363 735.371)"
                        d="M350.17 735.02H440.56V735.73H350.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 396.005 734.082)"
                        d="M350.81 733.73H441.2V734.44H350.81z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 396.64 732.788)"
                        d="M351.44 732.44H441.83V733.1500000000001H351.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 397.278 731.5)"
                        d="M352.08 731.15H442.46999999999997V731.86H352.08z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 394.726 736.66)"
                        d="M349.53 736.31H439.91999999999996V737.02H349.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 398.557 728.922)"
                        d="M353.36 728.57H443.75V729.2800000000001H353.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 399.2 727.633)"
                        d="M354 727.28H444.39V727.99H354z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 397.92 730.21)"
                        d="M352.72 729.86H443.11V730.57H352.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 400.498 725.003)"
                        d="M355.3 724.65H445.69V725.36H355.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 401.136 723.714)"
                        d="M355.94 723.36H446.33V724.07H355.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 399.861 726.291)"
                        d="M354.66 725.94H445.05V726.6500000000001H354.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 401.778 722.425)"
                        d="M356.58 722.07H446.96999999999997V722.7800000000001H356.58z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-153.65 402.415 721.137)"
                        d="M357.22 720.78H447.61V721.49H357.22z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-153.65 403.051 719.843)"
                        d="M357.86 719.49H448.25V720.2H357.86z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 404.33 717.265)"
                        d="M359.13 716.91H449.52V717.62H359.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 404.973 715.976)"
                        d="M359.77 715.62H450.15999999999997V716.33H359.77z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 405.609 714.683)"
                        d="M360.41 714.33H450.8V715.0400000000001H360.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 406.246 713.394)"
                        d="M361.05 713.04H451.44V713.75H361.05z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 403.693 718.554)"
                        d="M358.5 718.2H448.89V718.9100000000001H358.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 407.525 710.816)"
                        d="M362.33 710.46H452.71999999999997V711.1700000000001H362.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 408.167 709.527)"
                        d="M362.97 709.17H453.36V709.88H362.97z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 406.888 712.105)"
                        d="M361.69 711.75H452.08V712.46H361.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 409.44 706.945)"
                        d="M364.25 706.59H454.64V707.3000000000001H364.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 410.083 705.656)"
                        d="M364.88 705.3H455.27V706.01H364.88z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 410.72 704.367)"
                        d="M365.52 704.01H455.90999999999997V704.72H365.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 411.362 703.078)"
                        d="M366.16 702.72H456.55V703.4300000000001H366.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 408.803 708.234)"
                        d="M363.61 707.88H454V708.59H363.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 412.635 700.496)"
                        d="M367.44 700.14H457.83V700.85H367.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 413.277 699.207)"
                        d="M368.08 698.85H458.46999999999997V699.5600000000001H368.08z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 411.998 701.785)"
                        d="M366.8 701.43H457.19V702.14H366.8z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 414.55 696.625)"
                        d="M369.36 696.28H459.75V696.99H369.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 415.193 695.335)"
                        d="M370 694.99H460.39V695.7H370z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 415.83 694.047)"
                        d="M370.63 693.7H461.02V694.4100000000001H370.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 416.472 692.758)"
                        d="M371.27 692.41H461.65999999999997V693.12H371.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 413.915 697.918)"
                        d="M368.72 697.56H459.11V698.27H368.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 417.745 690.176)"
                        d="M372.55 689.83H462.94V690.5400000000001H372.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 418.388 688.886)"
                        d="M373.19 688.54H463.58V689.25H373.19z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 417.11 691.47)"
                        d="M371.91 691.12H462.3V691.83H371.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 419.925 686.08)"
                        d="M374.73 685.73H465.12V686.44H374.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 420.56 684.786)"
                        d="M375.37 684.44H465.76V685.1500000000001H375.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-153.65 421.203 683.497)"
                        d="M376.01 683.15H466.4V683.86H376.01z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 421.84 682.208)"
                        d="M376.64 681.86H467.03V682.57H376.64z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 419.287 687.368)"
                        d="M374.09 687.02H464.47999999999996V687.73H374.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 423.12 679.63)"
                        d="M377.92 679.28H468.31V679.99H377.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-153.65 423.755 678.337)"
                        d="M378.56 677.99H468.95V678.7H378.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-153.65 422.482 680.919)"
                        d="M377.28 680.57H467.66999999999996V681.2800000000001H377.28z"
                      />
                    </g>
                    <g clipPath="url(#clippath-31)">
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 309.88 781.138)"
                        d="M247.99 780.79H371.73V781.5H247.99z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 310.718 779.97)"
                        d="M248.82 779.62H372.56V780.33H248.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 312.394 777.629)"
                        d="M250.5 777.28H374.24V777.99H250.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 313.23 776.456)"
                        d="M251.34 776.1H375.08V776.8100000000001H251.34z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 314.067 775.283)"
                        d="M252.17 774.93H375.90999999999997V775.64H252.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 314.906 774.115)"
                        d="M253.01 773.76H376.75V774.47H253.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 311.555 778.797)"
                        d="M249.66 778.45H373.4V779.1600000000001H249.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 316.581 771.774)"
                        d="M254.69 771.42H378.43V772.13H254.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 317.418 770.6)"
                        d="M255.52 770.25H379.26V770.96H255.52z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 315.743 772.942)"
                        d="M253.85 772.59H377.59V773.3000000000001H253.85z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 318.257 769.433)"
                        d="M256.36 769.08H380.1V769.7900000000001H256.36z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 319.094 768.26)"
                        d="M257.2 767.91H380.94V768.62H257.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 320.769 765.92)"
                        d="M258.87 765.57H382.61V766.2800000000001H258.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 321.606 764.746)"
                        d="M259.71 764.4H383.45V765.11H259.71z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 322.444 763.578)"
                        d="M260.55 763.23H384.29V763.94H260.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 323.281 762.405)"
                        d="M261.39 762.06H385.13V762.77H261.39z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 319.93 767.087)"
                        d="M258.04 766.74H381.78000000000003V767.45H258.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 324.957 760.064)"
                        d="M263.06 759.71H386.8V760.4200000000001H263.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 325.794 758.891)"
                        d="M263.9 758.54H387.64V759.25H263.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 324.12 761.237)"
                        d="M262.22 760.89H385.96000000000004V761.6H262.22z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 326.632 757.723)"
                        d="M264.74 757.37H388.48V758.08H264.74z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 327.469 756.55)"
                        d="M265.57 756.2H389.31V756.9100000000001H265.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 329.144 754.21)"
                        d="M267.25 753.86H390.99V754.57H267.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 329.983 753.042)"
                        d="M268.08 752.69H391.82V753.4000000000001H268.08z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 330.815 751.87)"
                        d="M268.92 751.52H392.66V752.23H268.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 331.652 750.697)"
                        d="M269.76 750.35H393.5V751.0600000000001H269.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 328.307 755.382)"
                        d="M266.41 755.03H390.15000000000003V755.74H266.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 333.327 748.356)"
                        d="M271.43 748.01H395.17V748.72H271.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 334.165 747.188)"
                        d="M272.27 746.84H396.01V747.5500000000001H272.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 332.49 749.53)"
                        d="M270.6 749.18H394.34000000000003V749.89H270.6z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 335.002 746.015)"
                        d="M273.11 745.67H396.85V746.38H273.11z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 335.84 744.847)"
                        d="M273.95 744.5H397.69V745.21H273.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 337.515 742.501)"
                        d="M275.62 742.15H399.36V742.86H275.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 338.353 741.334)"
                        d="M276.46 740.98H400.2V741.69H276.46z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 339.19 740.16)"
                        d="M277.3 739.81H401.04V740.52H277.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 340.028 738.993)"
                        d="M278.13 738.64H401.87V739.35H278.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 336.678 743.674)"
                        d="M274.78 743.32H398.52V744.0300000000001H274.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 341.704 736.652)"
                        d="M279.81 736.3H403.55V737.01H279.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 342.54 735.479)"
                        d="M280.65 735.13H404.39V735.84H280.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 340.865 737.82)"
                        d="M278.97 737.47H402.71000000000004V738.1800000000001H278.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 343.378 734.306)"
                        d="M281.48 733.96H405.22V734.6700000000001H281.48z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 344.216 733.138)"
                        d="M282.32 732.79H406.06V733.5H282.32z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 345.053 731.965)"
                        d="M283.16 731.62H406.90000000000003V732.33H283.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 346.728 729.624)"
                        d="M284.83 729.28H408.57V729.99H284.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 347.567 728.456)"
                        d="M285.67 728.1H409.41V728.8100000000001H285.67z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 348.404 727.283)"
                        d="M286.51 726.93H410.25V727.64H286.51z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 349.24 726.11)"
                        d="M287.35 725.76H411.09000000000003V726.47H287.35z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 345.891 730.797)"
                        d="M284 730.45H407.74V731.1600000000001H284z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 350.916 723.77)"
                        d="M289.02 723.42H412.76V724.13H289.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 351.754 722.601)"
                        d="M289.86 722.25H413.6V722.96H289.86z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 350.079 724.942)"
                        d="M288.18 724.59H411.92V725.3000000000001H288.18z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 353.43 720.26)"
                        d="M291.53 719.91H415.27V720.62H291.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 354.262 719.089)"
                        d="M292.37 718.74H416.11V719.45H292.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 355.099 717.916)"
                        d="M293.21 717.57H416.95V718.2800000000001H293.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 355.937 716.748)"
                        d="M294.04 716.4H417.78000000000003V717.11H294.04z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 352.591 721.428)"
                        d="M290.7 721.08H414.44V721.7900000000001H290.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 357.612 714.407)"
                        d="M295.72 714.06H419.46000000000004V714.77H295.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 358.45 713.234)"
                        d="M296.56 712.89H420.3V713.6H296.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 356.774 715.575)"
                        d="M294.88 715.23H418.62V715.94H294.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 360.125 710.893)"
                        d="M298.23 710.54H421.97V711.25H298.23z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 360.962 709.72)"
                        d="M299.07 709.37H422.81V710.08H299.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 361.8 708.552)"
                        d="M299.91 708.2H423.65000000000003V708.9100000000001H299.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 362.637 707.38)"
                        d="M300.74 707.03H424.48V707.74H300.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 359.288 712.066)"
                        d="M297.39 711.71H421.13V712.4200000000001H297.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 364.312 705.038)"
                        d="M302.42 704.69H426.16V705.4000000000001H302.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 365.15 703.87)"
                        d="M303.26 703.52H427V704.23H303.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 363.475 706.211)"
                        d="M301.58 705.86H425.32V706.57H301.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 366.855 701.482)"
                        d="M304.96 701.13H428.7V701.84H304.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 367.693 700.314)"
                        d="M305.8 699.96H429.54V700.6700000000001H305.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 366.018 702.655)"
                        d="M304.13 702.31H427.87V703.02H304.13z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 368.53 699.14)"
                        d="M306.64 698.79H430.38V699.5H306.64z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-144.42 369.369 697.973)"
                        d="M307.47 697.62H431.21000000000004V698.33H307.47z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-144.42 370.206 696.8)"
                        d="M308.31 696.45H432.05V697.1600000000001H308.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 371.881 694.459)"
                        d="M309.99 694.11H433.73V694.82H309.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 372.718 693.286)"
                        d="M310.82 692.94H434.56V693.6500000000001H310.82z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 373.556 692.118)"
                        d="M311.66 691.77H435.40000000000003V692.48H311.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 374.393 690.945)"
                        d="M312.5 690.6H436.24V691.3100000000001H312.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 371.044 695.632)"
                        d="M309.15 695.28H432.89V695.99H309.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 376.069 688.604)"
                        d="M314.17 688.26H437.91V688.97H314.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 376.907 687.436)"
                        d="M315.01 687.09H438.75V687.8000000000001H315.01z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 375.232 689.777)"
                        d="M313.34 689.43H437.08V690.14H313.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 378.58 685.09)"
                        d="M316.69 684.74H440.43V685.45H316.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 379.42 683.922)"
                        d="M317.52 683.57H441.26V684.2800000000001H317.52z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 380.256 682.75)"
                        d="M318.36 682.4H442.1V683.11H318.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 381.09 681.583)"
                        d="M319.2 681.23H442.94V681.94H319.2z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 377.744 686.263)"
                        d="M315.85 685.92H439.59000000000003V686.63H315.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 382.765 679.242)"
                        d="M320.87 678.89H444.61V679.6H320.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 383.602 678.07)"
                        d="M321.71 677.72H445.45V678.4300000000001H321.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 381.927 680.41)"
                        d="M320.04 680.06H443.78000000000003V680.77H320.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 385.277 675.728)"
                        d="M323.39 675.38H447.13V676.09H323.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 386.114 674.555)"
                        d="M324.22 674.21H447.96000000000004V674.9200000000001H324.22z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 386.953 673.387)"
                        d="M325.06 673.04H448.8V673.75H325.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 387.79 672.214)"
                        d="M325.9 671.87H449.64V672.58H325.9z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 384.439 676.896)"
                        d="M322.55 676.55H446.29V677.26H322.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 389.465 669.873)"
                        d="M327.57 669.53H451.31V670.24H327.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 390.302 668.7)"
                        d="M328.41 668.35H452.15000000000003V669.0600000000001H328.41z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 388.628 671.046)"
                        d="M326.74 670.7H450.48V671.4100000000001H326.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 392.313 666.202)"
                        d="M330.42 665.86H454.16V666.57H330.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 393.15 665.03)"
                        d="M331.26 664.68H455V665.39H331.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-144.42 393.988 663.861)"
                        d="M332.09 663.51H455.83V664.22H332.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 394.825 662.688)"
                        d="M332.93 662.34H456.67V663.0500000000001H332.93z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 391.476 667.375)"
                        d="M329.58 667.03H453.32V667.74H329.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 396.496 660.349)"
                        d="M334.61 660H458.35V660.71H334.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-144.42 397.334 659.181)"
                        d="M335.44 658.83H459.18V659.5400000000001H335.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-144.42 395.659 661.522)"
                        d="M333.77 661.17H457.51V661.88H333.77z"
                      />
                    </g>
                    <g clipPath="url(#clippath-32)">
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 260.469 745.788)"
                        d="M215.24 745.43H305.63V746.14H215.24z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 261.471 744.756)"
                        d="M216.25 744.4H306.64V745.11H216.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 263.482 742.696)"
                        d="M218.26 742.34H308.65V743.0500000000001H218.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 264.492 741.667)"
                        d="M219.26 741.31H309.65V742.02H219.26z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 265.494 740.635)"
                        d="M220.27 740.28H310.66V740.99H220.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 266.498 739.608)"
                        d="M221.27 739.25H311.66V739.96H221.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 262.48 743.727)"
                        d="M217.25 743.37H307.64V744.08H217.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 268.51 737.548)"
                        d="M223.28 737.19H313.67V737.9000000000001H223.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 269.516 736.514)"
                        d="M224.29 736.16H314.68V736.87H224.29z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 267.505 738.575)"
                        d="M222.28 738.22H312.67V738.9300000000001H222.28z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 270.52 735.487)"
                        d="M225.29 735.13H315.68V735.84H225.29z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 271.528 734.453)"
                        d="M226.3 734.1H316.69V734.8100000000001H226.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 273.534 732.395)"
                        d="M228.31 732.04H318.7V732.75H228.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 274.543 731.366)"
                        d="M229.32 731.01H319.71V731.72H229.32z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 275.546 730.334)"
                        d="M230.32 729.98H320.71V730.69H230.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 276.555 729.306)"
                        d="M231.33 728.95H321.72V729.6600000000001H231.33z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 272.532 733.427)"
                        d="M227.31 733.07H317.7V733.7800000000001H227.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 278.566 727.245)"
                        d="M233.34 726.89H323.73V727.6H233.34z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 279.568 726.213)"
                        d="M234.34 725.86H324.73V726.57H234.34z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 277.557 728.274)"
                        d="M232.33 727.92H322.72V728.63H232.33z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 280.577 725.184)"
                        d="M235.35 724.83H325.74V725.5400000000001H235.35z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 281.58 724.153)"
                        d="M236.35 723.8H326.74V724.51H236.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 283.591 722.092)"
                        d="M238.36 721.74H328.75V722.45H238.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 284.595 721.065)"
                        d="M239.37 720.71H329.76V721.4200000000001H239.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 285.602 720.032)"
                        d="M240.38 719.68H330.77V720.39H240.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 286.607 719.005)"
                        d="M241.38 718.65H331.77V719.36H241.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 282.584 723.126)"
                        d="M237.36 722.77H327.75V723.48H237.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 288.618 716.944)"
                        d="M243.39 716.59H333.78V717.3000000000001H243.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 289.62 715.913)"
                        d="M244.4 715.56H334.79V716.27H244.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 287.614 717.971)"
                        d="M242.39 717.62H332.78V718.33H242.39z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 290.63 714.884)"
                        d="M245.4 714.53H335.79V715.24H245.4z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 291.631 713.852)"
                        d="M246.41 713.5H336.8V714.21H246.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 293.643 711.791)"
                        d="M248.42 711.44H338.81V712.1500000000001H248.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 294.652 710.763)"
                        d="M249.42 710.41H339.81V711.12H249.42z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 295.654 709.731)"
                        d="M250.43 709.38H340.82V710.09H250.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 296.663 708.702)"
                        d="M251.43 708.35H341.82V709.0600000000001H251.43z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 292.64 712.823)"
                        d="M247.41 712.47H337.8V713.1800000000001H247.41z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 298.67 706.644)"
                        d="M253.45 706.29H343.84V707H253.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 299.677 705.61)"
                        d="M254.45 705.26H344.84V705.97H254.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 297.665 707.67)"
                        d="M252.44 707.32H342.83V708.0300000000001H252.44z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 300.681 704.583)"
                        d="M255.46 704.23H345.85V704.94H255.46z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 301.688 703.55)"
                        d="M256.46 703.2H346.84999999999997V703.9100000000001H256.46z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 302.692 702.523)"
                        d="M257.47 702.17H347.86V702.88H257.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 304.704 700.462)"
                        d="M259.48 700.11H349.87V700.82H259.48z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 305.706 699.43)"
                        d="M260.48 699.08H350.87V699.7900000000001H260.48z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 306.715 698.401)"
                        d="M261.49 698.05H351.88V698.76H261.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 307.717 697.37)"
                        d="M262.49 697.02H352.88V697.73H262.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 303.7 701.489)"
                        d="M258.47 701.14H348.86V701.85H258.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 309.729 695.31)"
                        d="M264.5 694.96H354.89V695.6700000000001H264.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 310.738 694.28)"
                        d="M265.51 693.93H355.9V694.64H265.51z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 308.726 696.34)"
                        d="M263.5 695.99H353.89V696.7H263.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 312.75 692.22)"
                        d="M267.52 691.87H357.90999999999997V692.58H267.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 313.751 691.188)"
                        d="M268.53 690.84H358.91999999999996V691.5500000000001H268.53z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 314.756 690.161)"
                        d="M269.53 689.81H359.91999999999996V690.52H269.53z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 315.763 689.128)"
                        d="M270.54 688.78H360.93V689.49H270.54z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 311.74 693.249)"
                        d="M266.52 692.9H356.90999999999997V693.61H266.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 317.776 687.072)"
                        d="M272.55 686.72H362.94V687.4300000000001H272.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 318.778 686.04)"
                        d="M273.55 685.69H363.94V686.4000000000001H273.55z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 316.767 688.1)"
                        d="M271.54 687.75H361.93V688.46H271.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 320.79 683.98)"
                        d="M275.56 683.63H365.95V684.34H275.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 321.794 682.953)"
                        d="M276.57 682.6H366.96V683.3100000000001H276.57z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 322.801 681.92)"
                        d="M277.57 681.57H367.96V682.2800000000001H277.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 323.805 680.892)"
                        d="M278.58 680.54H368.96999999999997V681.25H278.58z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 319.787 685.011)"
                        d="M274.56 684.66H364.95V685.37H274.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 325.817 678.832)"
                        d="M280.59 678.48H370.97999999999996V679.19H280.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 326.824 677.798)"
                        d="M281.6 677.45H371.99V678.1600000000001H281.6z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 324.812 679.859)"
                        d="M279.59 679.51H369.97999999999996V680.22H279.59z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 328.872 675.7)"
                        d="M283.64 675.35H374.03V676.0600000000001H283.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 329.876 674.672)"
                        d="M284.65 674.32H375.03999999999996V675.0300000000001H284.65z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 327.865 676.733)"
                        d="M282.64 676.38H373.03V677.09H282.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 330.878 673.64)"
                        d="M285.66 673.29H376.05V674H285.66z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-135.69 331.887 672.612)"
                        d="M286.66 672.26H377.05V672.97H286.66z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-135.69 332.89 671.58)"
                        d="M287.67 671.23H378.06V671.94H287.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 334.901 669.52)"
                        d="M289.68 669.17H380.07V669.88H289.68z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 335.91 668.49)"
                        d="M290.68 668.14H381.07V668.85H290.68z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 336.912 667.459)"
                        d="M291.69 667.11H382.08V667.82H291.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 337.922 666.43)"
                        d="M292.69 666.08H383.08V666.7900000000001H292.69z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 333.899 670.551)"
                        d="M288.67 670.2H379.06V670.9100000000001H288.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 339.928 664.372)"
                        d="M294.7 664.02H385.09V664.73H294.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 340.935 663.338)"
                        d="M295.71 662.99H386.09999999999997V663.7H295.71z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 338.924 665.398)"
                        d="M293.7 665.05H384.09V665.76H293.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 342.946 661.277)"
                        d="M297.72 660.93H388.11V661.64H297.72z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 343.95 660.25)"
                        d="M298.73 659.9H389.12V660.61H298.73z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 344.958 659.217)"
                        d="M299.73 658.87H390.12V659.58H299.73z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 345.962 658.19)"
                        d="M300.74 657.84H391.13V658.5500000000001H300.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 341.94 662.311)"
                        d="M296.71 661.96H387.09999999999997V662.6700000000001H296.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 347.973 656.13)"
                        d="M302.75 655.78H393.14V656.49H302.75z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 348.975 655.098)"
                        d="M303.75 654.75H394.14V655.46H303.75z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 346.964 657.158)"
                        d="M301.74 656.81H392.13V657.52H301.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 350.987 653.037)"
                        d="M305.76 652.69H396.15V653.4000000000001H305.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 351.996 652.008)"
                        d="M306.77 651.66H397.15999999999997V652.37H306.77z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 352.998 650.977)"
                        d="M307.77 650.63H398.15999999999997V651.34H307.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 354.002 649.95)"
                        d="M308.78 649.6H399.16999999999996V650.3100000000001H308.78z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 349.985 654.069)"
                        d="M304.76 653.72H395.15V654.4300000000001H304.76z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 356.014 647.89)"
                        d="M310.79 647.54H401.18V648.25H310.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 357.02 646.856)"
                        d="M311.8 646.51H402.19V647.22H311.8z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 355.01 648.916)"
                        d="M309.78 648.57H400.16999999999996V649.2800000000001H309.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 359.35 644.66)"
                        d="M314.12 644.31H404.51V645.02H314.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 360.357 643.626)"
                        d="M315.13 643.28H405.52V643.99H315.13z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-135.69 361.362 642.6)"
                        d="M316.14 642.25H406.53V642.96H316.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 362.364 641.567)"
                        d="M317.14 641.22H407.53V641.9300000000001H317.14z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 358.346 645.686)"
                        d="M313.12 645.34H403.51V646.0500000000001H313.12z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 364.375 639.507)"
                        d="M319.15 639.16H409.53999999999996V639.87H319.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-135.69 365.384 638.478)"
                        d="M320.16 638.13H410.55V638.84H320.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-135.69 363.373 640.539)"
                        d="M318.15 640.19H408.53999999999996V640.9000000000001H318.15z"
                      />
                    </g>
                    <g clipPath="url(#clippath-33)">
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 228.525 704.827)"
                        d="M183.31 704.47H273.7V705.1800000000001H183.31z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 229.701 704)"
                        d="M184.49 703.64H274.88V704.35H184.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 232.062 702.346)"
                        d="M186.84 701.99H277.23V702.7H186.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 233.239 701.517)"
                        d="M188.02 701.16H278.41V701.87H188.02z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 234.418 700.694)"
                        d="M189.2 700.34H279.59V701.0500000000001H189.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 235.594 699.866)"
                        d="M190.38 699.51H280.77V700.22H190.38z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 230.88 703.176)"
                        d="M185.67 702.82H276.06V703.5300000000001H185.67z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 237.955 698.213)"
                        d="M192.74 697.86H283.13V698.57H192.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 239.134 697.39)"
                        d="M193.92 697.03H284.31V697.74H193.92z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 236.773 699.043)"
                        d="M191.56 698.68H281.95V699.39H191.56z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 240.31 696.561)"
                        d="M195.09 696.21H285.48V696.9200000000001H195.09z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 241.49 695.738)"
                        d="M196.27 695.38H286.66V696.09H196.27z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 243.843 694.082)"
                        d="M198.63 693.73H289.02V694.44H198.63z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 245.027 693.256)"
                        d="M199.81 692.9H290.2V693.61H199.81z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 246.204 692.428)"
                        d="M200.99 692.07H291.38V692.7800000000001H200.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 247.383 691.605)"
                        d="M202.17 691.25H292.56V691.96H202.17z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 242.666 694.91)"
                        d="M197.45 694.55H287.84V695.26H197.45z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 249.739 689.954)"
                        d="M204.52 689.6H294.91V690.3100000000001H204.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 250.915 689.126)"
                        d="M205.7 688.77H296.09V689.48H205.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 248.56 690.777)"
                        d="M203.34 690.42H293.73V691.13H203.34z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 252.1 688.3)"
                        d="M206.88 687.94H297.27V688.6500000000001H206.88z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 253.276 687.472)"
                        d="M208.06 687.12H298.45V687.83H208.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 255.632 685.82)"
                        d="M210.42 685.46H300.81V686.1700000000001H210.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 256.808 684.993)"
                        d="M211.59 684.64H301.98V685.35H211.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 257.992 684.167)"
                        d="M212.77 683.81H303.16V684.52H212.77z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 259.169 683.339)"
                        d="M213.95 682.99H304.34V683.7H213.95z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 254.452 686.644)"
                        d="M209.24 686.29H299.63V687H209.24z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 261.525 681.688)"
                        d="M216.31 681.33H306.7V682.0400000000001H216.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 262.704 680.865)"
                        d="M217.49 680.51H307.88V681.22H217.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 260.348 682.516)"
                        d="M215.13 682.16H305.52V682.87H215.13z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 263.88 680.037)"
                        d="M218.67 679.68H309.06V680.39H218.67z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 265.062 679.206)"
                        d="M219.85 678.85H310.24V679.5600000000001H219.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 267.418 677.555)"
                        d="M222.2 677.2H312.59V677.9100000000001H222.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 268.597 676.732)"
                        d="M223.38 676.38H313.77V677.09H223.38z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 269.773 675.903)"
                        d="M224.56 675.55H314.95V676.26H224.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 270.953 675.08)"
                        d="M225.74 674.72H316.13V675.4300000000001H225.74z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 266.241 678.383)"
                        d="M221.02 678.03H311.41V678.74H221.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 273.313 673.427)"
                        d="M228.1 673.07H318.49V673.7800000000001H228.1z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 274.49 672.599)"
                        d="M229.27 672.24H319.66V672.95H229.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 272.134 674.25)"
                        d="M226.92 673.9H317.31V674.61H226.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 275.666 671.77)"
                        d="M230.45 671.42H320.84V672.13H230.45z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 276.846 670.947)"
                        d="M231.63 670.59H322.02V671.3000000000001H231.63z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 278.027 670.117)"
                        d="M232.81 669.76H323.2V670.47H232.81z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 280.383 668.465)"
                        d="M235.17 668.11H325.56V668.82H235.17z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 281.562 667.642)"
                        d="M236.35 667.29H326.74V668H236.35z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 282.739 666.814)"
                        d="M237.52 666.46H327.91V667.1700000000001H237.52z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 283.918 665.991)"
                        d="M238.7 665.63H329.09V666.34H238.7z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 279.206 669.294)"
                        d="M233.99 668.94H324.38V669.6500000000001H233.99z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 286.276 664.332)"
                        d="M241.06 663.98H331.45V664.69H241.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 287.455 663.51)"
                        d="M242.24 663.15H332.63V663.86H242.24z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 285.1 665.16)"
                        d="M239.88 664.81H330.27V665.52H239.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 289.81 661.858)"
                        d="M244.6 661.5H334.99V662.21H244.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 290.987 661.03)"
                        d="M245.77 660.68H336.16V661.39H245.77z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 292.171 660.204)"
                        d="M246.95 659.85H337.34V660.5600000000001H246.95z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 293.348 659.376)"
                        d="M248.13 659.02H338.52V659.73H248.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 288.632 662.681)"
                        d="M243.42 662.33H333.81V663.0400000000001H243.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 295.704 657.725)"
                        d="M250.49 657.37H340.88V658.08H250.49z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 296.883 656.902)"
                        d="M251.67 656.54H342.06V657.25H251.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 294.527 658.553)"
                        d="M249.31 658.2H339.7V658.9100000000001H249.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 299.241 655.243)"
                        d="M254.02 654.89H344.41V655.6H254.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 300.42 654.42)"
                        d="M255.2 654.07H345.59V654.7800000000001H255.2z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 301.597 653.592)"
                        d="M256.38 653.24H346.77V653.95H256.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 302.776 652.769)"
                        d="M257.56 652.41H347.95V653.12H257.56z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 298.064 656.071)"
                        d="M252.85 655.72H343.24V656.4300000000001H252.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 305.137 651.115)"
                        d="M259.92 650.76H350.31V651.47H259.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 306.313 650.287)"
                        d="M261.1 649.93H351.49V650.64H261.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 303.952 651.94)"
                        d="M258.74 651.59H349.13V652.3000000000001H258.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 308.716 648.605)"
                        d="M263.5 648.25H353.89V648.96H263.5z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 309.893 647.777)"
                        d="M264.68 647.42H355.07V648.13H264.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 307.532 649.43)"
                        d="M262.32 649.08H352.71V649.7900000000001H262.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 311.072 646.954)"
                        d="M265.85 646.6H356.24V647.3100000000001H265.85z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-125.03 312.249 646.125)"
                        d="M267.03 645.77H357.41999999999996V646.48H267.03z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-125.03 313.425 645.297)"
                        d="M268.21 644.95H358.59999999999997V645.6600000000001H268.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 315.786 643.644)"
                        d="M270.57 643.29H360.96V644H270.57z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 316.965 642.82)"
                        d="M271.75 642.47H362.14V643.1800000000001H271.75z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 318.142 641.992)"
                        d="M272.93 641.64H363.32V642.35H272.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 319.32 641.17)"
                        d="M274.1 640.81H364.49V641.52H274.1z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 314.604 644.474)"
                        d="M269.39 644.12H359.78V644.83H269.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 321.676 639.518)"
                        d="M276.46 639.16H366.84999999999997V639.87H276.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 322.858 638.687)"
                        d="M277.64 638.34H368.03V639.0500000000001H277.64z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 320.497 640.341)"
                        d="M275.28 639.99H365.66999999999996V640.7H275.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 325.214 637.036)"
                        d="M280 636.68H370.39V637.39H280z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 326.39 636.208)"
                        d="M281.18 635.86H371.57V636.57H281.18z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 327.57 635.385)"
                        d="M282.36 635.03H372.75V635.74H282.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 328.751 634.554)"
                        d="M283.53 634.2H373.91999999999996V634.9100000000001H283.53z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 324.035 637.86)"
                        d="M278.82 637.51H369.21V638.22H278.82z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 331.107 632.903)"
                        d="M285.89 632.55H376.28V633.26H285.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 332.286 632.08)"
                        d="M287.07 631.73H377.46V632.44H287.07z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 329.93 633.731)"
                        d="M284.71 633.38H375.09999999999997V634.09H284.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 334.639 630.424)"
                        d="M289.43 630.07H379.82V630.7800000000001H289.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 335.823 629.598)"
                        d="M290.61 629.25H381V629.96H290.61z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 337 628.77)"
                        d="M291.78 628.42H382.16999999999996V629.13H291.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 338.179 627.947)"
                        d="M292.96 627.59H383.34999999999997V628.3000000000001H292.96z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 333.462 631.252)"
                        d="M288.25 630.9H378.64V631.61H288.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 340.535 626.296)"
                        d="M295.32 625.94H385.71V626.6500000000001H295.32z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 341.711 625.468)"
                        d="M296.5 625.11H386.89V625.82H296.5z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 339.355 627.119)"
                        d="M294.14 626.77H384.53V627.48H294.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 344.413 623.738)"
                        d="M299.19 623.38H389.58V624.09H299.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 345.59 622.91)"
                        d="M300.37 622.56H390.76V623.27H300.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-125.03 346.767 622.082)"
                        d="M301.55 621.73H391.94V622.44H301.55z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 347.946 621.258)"
                        d="M302.73 620.91H393.12V621.62H302.73z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 343.23 624.563)"
                        d="M298.02 624.21H388.40999999999997V624.9200000000001H298.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 350.301 619.607)"
                        d="M305.09 619.25H395.47999999999996V619.96H305.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-125.03 351.483 618.777)"
                        d="M306.27 618.43H396.65999999999997V619.14H306.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-125.03 349.122 620.43)"
                        d="M303.91 620.08H394.3V620.7900000000001H303.91z"
                      />
                    </g>
                    <g clipPath="url(#clippath-34)">
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 495.042 837.194)"
                        d="M449.84 836.85H540.23V837.5600000000001H449.84z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 495.058 835.754)"
                        d="M449.85 835.41H540.24V836.12H449.85z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.092 832.879)"
                        d="M449.89 832.53H540.28V833.24H449.89z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.108 831.439)"
                        d="M449.9 831.09H540.29V831.8000000000001H449.9z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.125 829.999)"
                        d="M449.92 829.65H540.3100000000001V830.36H449.92z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.141 828.558)"
                        d="M449.94 828.21H540.33V828.9200000000001H449.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.075 834.314)"
                        d="M449.87 833.97H540.26V834.6800000000001H449.87z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.174 825.678)"
                        d="M449.97 825.33H540.36V826.0400000000001H449.97z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.191 824.243)"
                        d="M449.99 823.9H540.38V824.61H449.99z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.158 827.118)"
                        d="M449.95 826.77H540.34V827.48H449.95z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 495.208 822.803)"
                        d="M450 822.46H540.39V823.1700000000001H450z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 495.224 821.363)"
                        d="M450.02 821.02H540.41V821.73H450.02z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.257 818.482)"
                        d="M450.05 818.14H540.44V818.85H450.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.274 817.042)"
                        d="M450.07 816.7H540.46V817.4100000000001H450.07z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.296 815.607)"
                        d="M450.09 815.26H540.48V815.97H450.09z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.312 814.167)"
                        d="M450.11 813.82H540.5V814.5300000000001H450.11z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.24 819.922)"
                        d="M450.04 819.58H540.4300000000001V820.2900000000001H450.04z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.345 811.287)"
                        d="M450.14 810.94H540.53V811.6500000000001H450.14z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.362 809.846)"
                        d="M450.16 809.5H540.5500000000001V810.21H450.16z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.329 812.727)"
                        d="M450.12 812.38H540.51V813.09H450.12z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 495.378 808.411)"
                        d="M450.17 808.06H540.5600000000001V808.77H450.17z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 495.395 806.971)"
                        d="M450.19 806.62H540.58V807.33H450.19z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.428 804.09)"
                        d="M450.22 803.74H540.61V804.45H450.22z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.445 802.65)"
                        d="M450.24 802.31H540.63V803.02H450.24z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.461 801.21)"
                        d="M450.26 800.87H540.65V801.58H450.26z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.478 799.775)"
                        d="M450.27 799.43H540.66V800.14H450.27z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.412 805.531)"
                        d="M450.21 805.18H540.6V805.89H450.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.511 796.895)"
                        d="M450.31 796.55H540.7V797.26H450.31z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.528 795.455)"
                        d="M450.32 795.11H540.71V795.82H450.32z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.495 798.335)"
                        d="M450.29 797.99H540.6800000000001V798.7H450.29z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 495.544 794.015)"
                        d="M450.34 793.67H540.73V794.38H450.34z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 495.56 792.575)"
                        d="M450.36 792.23H540.75V792.94H450.36z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.594 789.7)"
                        d="M450.39 789.35H540.78V790.0600000000001H450.39z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.61 788.26)"
                        d="M450.41 787.91H540.8000000000001V788.62H450.41z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.627 786.82)"
                        d="M450.42 786.47H540.8100000000001V787.1800000000001H450.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.644 785.379)"
                        d="M450.44 785.03H540.83V785.74H450.44z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.578 791.14)"
                        d="M450.37 790.79H540.76V791.5H450.37z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.677 782.504)"
                        d="M450.47 782.16H540.86V782.87H450.47z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.694 781.064)"
                        d="M450.49 780.72H540.88V781.4300000000001H450.49z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.66 783.939)"
                        d="M450.46 783.59H540.85V784.3000000000001H450.46z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.71 779.623)"
                        d="M450.51 779.28H540.9V779.99H450.51z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 495.727 778.183)"
                        d="M450.52 777.84H540.91V778.5500000000001H450.52z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 495.748 776.743)"
                        d="M450.54 776.4H540.9300000000001V777.11H450.54z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.782 773.868)"
                        d="M450.58 773.52H540.97V774.23H450.58z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.798 772.428)"
                        d="M450.59 772.08H540.98V772.7900000000001H450.59z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.815 770.987)"
                        d="M450.61 770.64H541V771.35H450.61z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.831 769.547)"
                        d="M450.63 769.2H541.02V769.9100000000001H450.63z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.765 775.303)"
                        d="M450.56 774.96H540.95V775.6700000000001H450.56z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.864 766.667)"
                        d="M450.66 766.32H541.0500000000001V767.0300000000001H450.66z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.881 765.232)"
                        d="M450.68 764.88H541.07V765.59H450.68z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.848 768.107)"
                        d="M450.64 767.76H541.03V768.47H450.64z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.914 762.352)"
                        d="M450.71 762.01H541.1V762.72H450.71z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.93 760.911)"
                        d="M450.73 760.57H541.12V761.2800000000001H450.73z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 495.947 759.471)"
                        d="M450.74 759.13H541.13V759.84H450.74z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.964 758.031)"
                        d="M450.76 757.69H541.15V758.4000000000001H450.76z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.898 763.792)"
                        d="M450.69 763.44H541.08V764.1500000000001H450.69z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 495.997 755.156)"
                        d="M450.79 754.81H541.1800000000001V755.52H450.79z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.014 753.716)"
                        d="M450.81 753.37H541.2V754.08H450.81z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 495.98 756.596)"
                        d="M450.78 756.25H541.17V756.96H450.78z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.047 750.835)"
                        d="M450.84 750.49H541.23V751.2H450.84z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.063 749.395)"
                        d="M450.86 749.05H541.25V749.76H450.86z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 496.08 747.96)"
                        d="M450.88 747.61H541.27V748.32H450.88z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.097 746.52)"
                        d="M450.89 746.17H541.28V746.88H450.89z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.03 752.276)"
                        d="M450.83 751.93H541.22V752.64H450.83z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.13 743.64)"
                        d="M450.93 743.29H541.32V744H450.93z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.146 742.2)"
                        d="M450.94 741.86H541.33V742.57H450.94z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.113 745.08)"
                        d="M450.91 744.73H541.3000000000001V745.44H450.91z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.184 739.27)"
                        d="M450.98 738.92H541.37V739.63H450.98z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.2 737.83)"
                        d="M451 737.48H541.39V738.19H451z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.168 740.71)"
                        d="M450.96 740.36H541.35V741.07H450.96z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.217 736.389)"
                        d="M451.01 736.04H541.4V736.75H451.01z"
                      />
                      <path
                        className="cls-81"
                        transform="rotate(-179.33 496.234 734.949)"
                        d="M451.03 734.61H541.42V735.32H451.03z"
                      />
                      <path
                        className="cls-41"
                        transform="rotate(-179.33 496.25 733.514)"
                        d="M451.05 733.17H541.44V733.88H451.05z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.284 730.633)"
                        d="M451.08 730.29H541.47V731H451.08z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.3 729.193)"
                        d="M451.1 728.85H541.49V729.5600000000001H451.1z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 496.317 727.753)"
                        d="M451.11 727.41H541.5V728.12H451.11z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.334 726.318)"
                        d="M451.13 725.97H541.52V726.6800000000001H451.13z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.267 732.073)"
                        d="M451.06 731.73H541.45V732.44H451.06z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.367 723.438)"
                        d="M451.16 723.09H541.5500000000001V723.8000000000001H451.16z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.383 721.997)"
                        d="M451.18 721.65H541.57V722.36H451.18z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.35 724.878)"
                        d="M451.15 724.53H541.54V725.24H451.15z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.416 719.117)"
                        d="M451.21 718.77H541.6V719.48H451.21z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.433 717.682)"
                        d="M451.23 717.33H541.62V718.0400000000001H451.23z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 496.45 716.242)"
                        d="M451.25 715.89H541.64V716.6H451.25z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.466 714.802)"
                        d="M451.26 714.46H541.65V715.1700000000001H451.26z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.4 720.557)"
                        d="M451.2 720.21H541.59V720.9200000000001H451.2z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.5 711.921)"
                        d="M451.3 711.58H541.69V712.2900000000001H451.3z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.516 710.481)"
                        d="M451.31 710.14H541.7V710.85H451.31z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.483 713.362)"
                        d="M451.28 713.02H541.67V713.73H451.28z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.55 707.606)"
                        d="M451.35 707.26H541.74V707.97H451.35z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.57 706.166)"
                        d="M451.37 705.82H541.76V706.5300000000001H451.37z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 496.587 704.726)"
                        d="M451.38 704.38H541.77V705.09H451.38z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.604 703.286)"
                        d="M451.4 702.94H541.79V703.6500000000001H451.4z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.533 709.046)"
                        d="M451.33 708.7H541.72V709.4100000000001H451.33z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.637 700.41)"
                        d="M451.43 700.06H541.82V700.77H451.43z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.654 698.97)"
                        d="M451.45 698.62H541.84V699.33H451.45z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.62 701.845)"
                        d="M451.42 701.5H541.8100000000001V702.21H451.42z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.82 695.769)"
                        d="M451.62 695.42H542.01V696.13H451.62z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.837 694.329)"
                        d="M451.63 693.98H542.02V694.69H451.63z"
                      />
                      <path
                        className="cls-31"
                        transform="rotate(-179.33 496.853 692.889)"
                        d="M451.65 692.54H542.04V693.25H451.65z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.87 691.454)"
                        d="M451.67 691.11H542.0600000000001V691.82H451.67z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.803 697.21)"
                        d="M451.6 696.86H541.99V697.57H451.6z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.903 688.573)"
                        d="M451.7 688.23H542.09V688.94H451.7z"
                      />
                      <path
                        className="cls-23"
                        transform="rotate(-179.33 496.92 687.133)"
                        d="M451.72 686.79H542.11V687.5H451.72z"
                      />
                      <path
                        className="cls-1"
                        transform="rotate(-179.33 496.886 690.013)"
                        d="M451.68 689.67H542.07V690.38H451.68z"
                      />
                    </g>
                  </g>
                  <path
                    className="cls-24"
                    d="M274.88 731.41L383.58 685.76 390.17 689.99 285.23 737.99 274.88 731.41z"
                  />
                  <path
                    className="cls-24"
                    d="M395.82 792.58L406.64 794.94 461.23 722.46 452.76 719.64 395.82 792.58z"
                  />
                  <path
                    className="cls-24"
                    d="M523.82 729.52L523.35 809.99 530.41 810.46 528.05 729.05 523.82 729.52z"
                  />
                  <path
                    className="cls-24"
                    d="M594.41 720.11l57.41 71.06 9.88-3.29s-56.94-70.12-58.35-70.12-8.94 2.35-8.94 2.35z"
                  />
                  <path
                    className="cls-24"
                    d="M657.94 689.52L760.99 737.52 770.41 731.41 665.47 685.29 657.94 689.52z"
                  />
                  <path
                    className="cls-24"
                    d="M699.35 649.52L704.99 641.05 835.82 656.58 826.88 669.29 699.35 649.52z"
                  />
                  <path
                    className="cls-24"
                    d="M734.64 565.76L732.29 574.7 869.23 560.58 871.58 549.76 734.64 565.76z"
                  />
                  <path
                    className="cls-24"
                    d="M737.47 471.17L739.35 480.58 861.7 443.88 858.41 431.17 737.47 471.17z"
                  />
                  <path
                    className="cls-24"
                    d="M696.52 376.58L700.76 382.7 802.41 320.11 797.23 313.99 696.52 376.58z"
                  />
                  <path
                    className="cls-24"
                    d="M664.05 339.41L656.05 331.88 740.76 260.35 752.05 269.29 664.05 339.41z"
                  />
                  <path
                    className="cls-24"
                    d="M598.64 302.7c1.41 0 9.88 2.82 9.88 2.82l43.76-88-10.35-3.76-43.29 88.94z"
                  />
                  <path
                    className="cls-24"
                    d="M555.35 293.29L547.35 293.29 562.88 200.11 571.35 201.05 555.35 293.29z"
                  />
                  <path
                    className="cls-24"
                    d="M472.52 201.99L490.88 293.76 497.47 291.88 479.11 200.11 472.52 201.99z"
                  />
                  <path
                    className="cls-24"
                    d="M377.94 224.11L384.99 221.76 438.17 307.41 430.64 309.76 377.94 224.11z"
                  />
                  <path
                    className="cls-25"
                    d="M304.99 264.11L388.99 335.46 384.52 339.88 297.94 268.82 304.99 264.11z"
                  />
                  <path
                    className="cls-25"
                    d="M289.11 302.46L292.29 299.29 369.58 355.05 366.64 357.76 289.11 302.46z"
                  />
                  <path
                    className="cls-25"
                    d="M266.52 325.41L268.99 322.58 352.64 374.82 350.52 378.35 266.52 325.41z"
                  />
                  <path
                    className="cls-25"
                    d="M337.11 400.23L339.58 395.99 251.7 347.29 248.52 351.88 337.11 400.23z"
                  />
                  <path
                    className="cls-25"
                    d="M325.47 422.82L327.58 418.94 235.11 376.23 233.35 381.17 325.47 422.82z"
                  />
                  <path
                    className="cls-25"
                    d="M316.99 447.52L319.11 442.58 223.11 405.52 221.7 409.76 316.99 447.52z"
                  />
                  <path
                    className="cls-25"
                    d="M310.99 476.11L312.05 467.99 215.7 435.88 214.64 443.99 310.99 476.11z"
                  />
                  <path
                    className="cls-25"
                    d="M308.17 502.94L308.17 498.35 212.88 473.64 212.52 478.23 308.17 502.94z"
                  />
                  <path
                    className="cls-25"
                    d="M308.52 530.11L308.17 526.23 202.88 506.35 202.52 510.23 308.52 530.11z"
                  />
                  <path
                    className="cls-25"
                    d="M312.76 560.11l-.71-5.29-114-14.12s-1.76 4.94 0 4.94 114.71 14.47 114.71 14.47z"
                  />
                  <path
                    className="cls-25"
                    d="M320.88 588.7L319.11 584.82 204.76 578.11 205.47 582.35 320.88 588.7z"
                  />
                  <path
                    className="cls-25"
                    d="M332.88 619.05L331.11 614.82 217.11 616.58 218.52 621.52 332.88 619.05z"
                  />
                  <path
                    className="cls-25"
                    d="M351.23 651.11l-3.53-5.59-134.82 14.47s3.88 8.47 5.65 8.12 132.71-17 132.71-17z"
                  />
                  <path
                    d="M549.47 290c110.12 12.83 150.59 90.32 150.59 90.32 70.12 97.45 33.41 199.18 33.41 199.18-40.94 150.69-185.41 152.12-185.41 152.12-122.82 11.41-183.53-61.32-183.53-61.32C293 580.93 311 481.46 311 481.46c8.12-84.85 78-146.53 78-146.53 52.59-42.43 106.94-43.5 106.94-43.5l53.53-1.43z"
                    fill="#568825"
                  />
                  <path className=""
                    d="M495.35 287.06l.24-3.06-.47-8.71-11.06-60.24-.94 4.47-5.41-31.06-.24-18.35s23.53-5.18 85.18-.47v19.76l-.53 25.29-1.41-1.59-11.12 66.35-1.53 7.59s97.41 1.65 151.53 88.24c0 0 52.24 64 39.06 164.24 0 0 8.94-52.24-16.47-114.82 0 0-47.06-131.76-186.82-131.29l1.41-45.65-31.53-.47 3.29 48s-81.88-11.76-151.06 76.24c0 0-59.29 64.47-46.12 170.35 0 0-18.82-56 23.06-145.41 0 0 38.59-75.29 108.24-97.41 0 0 30.59-10.82 52.71-12z"
                    fill="#909090"
                  />
                  <path className=""
                    d="M190.64 627.77l13.65 36.71 13.18 37.18 13.65 33.41s16 27.29 29.65 43.76c.47 1.41 65.88 74.35 178.35 89.88 112.47 15.53 194.47-7 226.94-21.59s113.29-59.29 148.59-123.82l19.29-32.94 14.12-47.06-6.12 8s-12.71 27.76-38.59 54.12c-25.88 26.35-64.47 58.82-161.88 92.71 0 0-87.06 28.71-219.29 3.29 0 0-116.71-28.24-168-83.29 0 0-46.59-46.12-63.53-90.35z"
                    fill="#787c7d"
                  />
                  <path
                    d="M189.35 620.24l15.18 39.53 7.06 16.24 6.71 8.82 16.24 25.76 3.53 6 28.24 28.24-1.76-8.12 4.94 10.59 10.24 9.53 16.59 10.59-2.12-7.41 7.06 11.65 31.06 18.71-.71-7.76 7.41 11.29 44.12 17.29-.71-8.12 5.29 12 43.41 8.82v-7.76c0-1.06 6.71 9.53 6.71 9.53l20.47 4.94 27.53 1.41v-9.53l6 10.94s36.35 2.47 48.71.71l.35-9.18 5.65 10.24 51.88-6.35 1.06-10.24 2.82 10.59 48-13.76 1.06-7.76 3.53 6.71s33.53-10.94 40.59-15.18c.71-3.18 2.47-10.24 2.47-10.24l2.47 9.18 34.24-18 1.76-10.24 2.12 8.47 36.71-25.76 2.82-9.88 1.06 5.29 20.82-21.18 3.53-9.53s-1.41 7.06 0 5.65 15.53-15.18 15.53-16.24 3.18-11.29 3.18-11.29v6s21.53-34.59 21.53-36 3.18-11.29 3.18-11.29l-19.41 31.41s-24.71 31.06-39.18 42.71c0 0-31.76 33.88-89.29 57.88 0 0-59.65 28.59-117.88 31.41 0 0-45.88 9.18-123.18.35 0 0-68.82-8.12-127.06-39.88 0 0-51.88-29.65-79.76-59.65 0 0-37.06-39.53-49.41-70.59l-12.35-27.53z"
                    fill="#121f26"
                  />
                  <path
                    className="cls-26"
                    d="M302.17 787.18L306.88 801.53 338.17 823.41 334.88 808.35 302.17 787.18z"
                  />
                  <path
                    className="cls-26"
                    d="M337.94 810.24L341 824.35 385.47 842.94 382.88 828.35 337.94 810.24z"
                  />
                  <path
                    className="cls-26"
                    d="M386.17 831.18L389.47 844.35 404.53 849.77 433.47 856.59 429.94 841.77 386.17 831.18z"
                  />
                  <path
                    className="cls-26"
                    d="M434.88 843.88L437 856.59 462.17 862.94 482.88 865.06 481.94 850.71 459.82 849.06 434.88 843.88z"
                  />
                  <path
                    className="cls-26"
                    d="M485.47 851.18L486.64 865.3 536.76 867.65 535.59 853.06 485.47 851.18z"
                  />
                  <path
                    className="cls-26"
                    d="M539.59 853.53L540.06 866.47 591.11 862.24 591.82 848.35 539.59 853.53z"
                  />
                  <path
                    className="cls-26"
                    d="M595.59 848.12L595.59 861.06 599.11 860.35 640.76 849.77 641.23 836.59 598.88 848.12 595.59 848.12z"
                  />
                  <path
                    className="cls-26"
                    d="M645.47 835.18c.24.71 0 12.94 0 12.94l17.18-3.53 21.41-10.12 1.88-13.65-26.59 11.06-13.88 3.29z"
                  />
                  <path
                    className="cls-26"
                    d="M690.17 819.41L687.59 833.3 723.35 814.24 725.47 801.53 690.17 819.41z"
                  />
                  <path
                    d="M487.11 244.12l68-.47 6.59-40.47-.24-2.59 27.53 3.29 21.65 3.53 34.12 8.24 36.71 13.41 32.24 15.53 28.47 19.06L769 286.24l28.47 28.94 16.24 20.71 15.53 23.53 17.18 32.71 1.65 3.29-.94 6.12s8.94 21.18 14.12 46.12l.71 2.59 4.94.24s4.24 27.53 4.94 63.76c0 0 .82 47.18-16.12 96.59l-13.41 34.59-24 39.88-43.06 42.71-42.71 29.29-50.12 23.65-21.53 8.12-61.76 16.59-69.53 6-60.35-3.88-78.35-15.18-60.71-24-30.71-19.76-26.12-16.59-31.76-30-9.88-9.88s-13.41-22.24-27.18-45.18c0 0-17.29-34.94-25.76-76.24 0 0-5.29-36.59-4.59-51.29l-3.18-7.29-3.18 1.41s-4.24 29.29 17.65 101.29c0 0 13.41 33.18 21.18 46.94 7.76 13.76 23.29 36.35 23.29 36.35l41.65 38.47s50.82 34.24 54.71 36.35c3.88 2.12 52.94 21.53 52.94 21.53l50.82 12.71 52.59 6.71 56.12 3.18 59.29-4.59 63.88-17.65 16.24-4.94 6-2.47 50.47-24 43.06-28.94 43.06-46.59 25.76-40.59 13.06-32.82s13.76-39.18 16.24-68.82c0-1.41 4.94-53.65 1.41-76.59l-3.53-22.59s-5.65-58.94-58.94-121.76c0 0-44.47-76.59-167.65-114.71 0 0-54.71-15.88-85.06-15.53l.71-18.71s-63.88-4.24-85.41.71l1.06 18.35s-64.94-1.76-155.29 47.65c0 0-62.12 37.76-105.18 102.35l9.88-1.41s46.24-58.24 96.35-93.88c0 0 41.29-22.24 50.47-24 0 0 60.35-21.53 104.82-24l7.65 42.35z"
                    fill="#c1c5c6"
                  />
                  <path
                    d="M207 674.71l16 39.06 27.06 40 39.76 40.47 51.29 33.41 51.76 21.65 52.71 13.65 27.29 4.71 64.47 2.82 60.24-6.12 59.76-16.47-61.65 19.76s-119.06 27.76-224.94-14.59c0 0-104.94-36.24-138.82-117.18 0 0-20.71-42.35-24.94-61.18z"
                    fill="#443e3f"
                  />
                  <path
                    fill="#959eb3"
                    d="M140.82 475.77L155.88 474.83 186.46 370.83 173.76 373.18 140.82 475.77z"
                  />
                  <path
                    d="M146.46 509.65l33.41 90.82s-16.47-46.59-8.94-84.24l-1.88-6.82s7.06-84 32.47-138.12l15.06-26.35-21.18.94-48.94 163.76z"
                    fill="#bbc3cd"
                  />
                  <path
                    className="cls-84"
                    d="M169.05 509.41l3.76 10.12 80.24 13.41s1.88-1.88 1.88-4.94l-59.71-9.76s17.82-14.71 31.24-22.24c0 0-17.41-77.18 36.24-153.41l-46.12 2.35s-50.94 69.88-47.53 164.47z"
                  />
                  <path
                    className="cls-84"
                    d="M140.35 475.77L149.76 500.24 157.29 473.88 140.35 475.77z"
                  />
                  <path
                    className="cls-72"
                    d="M508.53 295.36s-89.71-10.07-160.77 89.47c0 0-70.12 88.65-18.35 223.27 0 0 23.22 104.52 166.9 122.89 0 0 122.51 18.37 192.63-66.95 0 0 64.94-81.06 48.47-186.3 0 0-27.29-167.81-178.82-183.45l-23.23-.83 12.71-6.4s75 .12 130.05 60.8c55.06 60.68 68.71 124.2 64.47 188.67s-44.71 148.85-117.65 178.71C552 745.1 458.35 747.47 378.82 686.32c0 0-62.59-41.72-71.06-168.76s85.65-196.73 111.53-209.05c0 0 50.95-21.57 76.06-21.45l13.18 8.3z"
                  />
                  <path
                    d="M369.4 423.18l8.94-56 2.82-15.53s33.41-52.71 138.82-59.76c0 0 99.29-3.76 142.12 50.35 0 0 13.65 16.94 13.65 29.18l24.47 183.53s22.12 77.65-76.24 125.65c0 0-119.53 59.76-230.59-16.94 0 0-47.06-29.65-46.59-86.59l22.59-153.88z"
                    fill="#c26f6b"
                  />
                  <path
                    d="M394.64 603l263.29-.71s8.47-15.53 7.76-33.18l-19.06-198.35s-4.94-21.18-12-23.29l-208.94-.71s-10.59 12.71-12 17.65l-27.35 194.76s-.18 30.41 8.29 43.82z"
                    fill="#779011"
                  />
                  <path
                    className="cls-13"
                    d="M384.93 346l-7.06 56.94-21.18 138.35s-10.35 37.65-1.41 63.06c0 0 21.18 90.35 168.94 94.59 0 0 106.35 2.35 153.88-69.65 0 0 21.18-20.24 17.41-61.18l-19.29-153.88-6.59-48.47s-4.71-24.94-32.94-41.88c0 0-29.76-23.41-89.41-28.35 0 0-57.53-7.41-109.41 17.29 0 0-27.88 9.53-48.71 39.18 0 0-3.53 4.94-4.94 9.88"
                  />
                  <path
                    className="cls-13"
                    d="M392.99 348.91l-6.65 55.1-19.95 133.89s-9.75 36.43-1.33 61.02c0 0 19.95 87.44 159.14 91.54 0 0 100.18 2.28 144.96-67.4 0 0 19.95-19.58 16.4-59.2l-18.18-148.92-6.21-46.91s-4.43-24.14-31.03-40.53c0 0-28.04-22.66-84.23-27.44 0 0-54.19-7.17-103.07 16.74 0 0-26.27 9.22-45.88 37.91 0 0-3.32 4.78-4.65 9.56"
                  />
                  <path
                    className="cls-13"
                    d="M396.34 350.22l-6.46 54.21-19.38 131.72s-9.48 35.84-1.29 60.03c0 0 19.38 86.02 154.64 90.05 0 0 97.35 2.24 140.86-66.31 0 0 19.38-19.26 15.94-58.24l-17.66-146.5-6.03-46.15s-4.31-23.74-30.15-39.87c0 0-27.25-22.29-81.84-26.99 0 0-52.66-7.06-100.15 16.46 0 0-25.52 9.07-44.58 37.3 0 0-3.23 4.7-4.52 9.41"
                  />
                  <path
                    className="cls-13"
                    d="M399.76 351.27l-6.29 53.41-18.86 129.78s-9.22 35.32-1.26 59.15c0 0 18.86 84.76 150.48 88.73 0 0 94.73 2.21 137.07-65.33 0 0 18.86-18.98 15.51-57.39l-17.19-144.35-5.87-45.47s-4.19-23.4-29.34-39.29c0 0-26.51-21.96-79.64-26.6 0 0-51.24-6.95-97.46 16.22 0 0-24.84 8.94-43.38 36.75 0 0-3.14 4.64-4.4 9.27"
                  />
                  <path
                    className="cls-13"
                    d="M403.78 352.97l-6.09 52.57-18.28 127.73s-8.94 34.76-1.22 58.22c0 0 18.28 83.42 145.81 87.33 0 0 91.79 2.17 132.81-64.3 0 0 18.28-18.68 15.03-56.48l-16.65-142.07-5.69-44.75s-4.06-23.03-28.43-38.67c0 0-25.69-21.61-77.17-26.18 0 0-49.65-6.84-94.43 15.97 0 0-24.06 8.8-42.04 36.17 0 0-3.05 4.56-4.26 9.12"
                  />
                  <path
                    className="cls-13"
                    d="M408.22 353.97l-5.91 51.73-17.73 125.68s-8.67 34.2-1.18 57.28c0 0 17.73 82.08 141.48 85.92 0 0 89.07 2.14 128.87-63.27 0 0 17.73-18.38 14.58-55.57l-16.16-139.79-5.52-44.03s-3.94-22.66-27.59-38.05c0 0-24.93-21.27-74.88-25.76 0 0-48.18-6.73-91.63 15.71 0 0-23.35 8.66-40.79 35.59 0 0-2.96 4.49-4.14 8.98"
                  />
                  <path
                    className="cls-13"
                    d="M412.73 354.71l-5.75 50.98-17.24 123.87s-8.43 33.71-1.15 56.46c0 0 17.24 80.89 137.5 84.69 0 0 86.56 2.11 125.24-62.36 0 0 17.24-18.12 14.17-54.77l-15.7-137.77-5.36-43.4s-3.83-22.33-26.81-37.5c0 0-24.22-20.96-72.77-25.38 0 0-46.82-6.64-89.05 15.48 0 0-22.69 8.53-39.64 35.07 0 0-2.87 4.42-4.02 8.85"
                  />
                  <path
                    className="cls-13"
                    d="M388.72 347.25l-6.87 56-20.6 136.06s-10.07 37.02-1.37 62.01c0 0 20.6 88.86 164.34 93.02 0 0 103.46 2.31 149.69-68.49 0 0 20.6-19.9 16.94-60.16l-18.77-151.33-6.41-47.67s-4.58-24.53-32.04-41.19c0 0-28.95-23.02-86.98-27.88 0 0-55.96-7.29-106.43 17.01 0 0-27.12 9.37-47.38 38.53 0 0-3.43 4.86-4.81 9.72"
                  />
                  <path
                    className="cls-13"
                    d="M381.9 345.03l-7.24 57.84-21.71 140.53s-10.62 38.24-1.45 64.05c0 0 21.71 91.77 173.22 96.08 0 0 109.05 2.39 157.78-70.74 0 0 21.71-20.55 17.85-62.14l-19.78-156.3-6.76-49.23s-4.83-25.33-33.78-42.54c0 0-30.52-23.78-91.68-28.8 0 0-58.99-7.53-112.19 17.57 0 0-28.59 9.68-49.94 39.79 0 0-3.62 5.02-5.07 10.04"
                  />
                  <path
                    className="cls-13"
                    d="M394.82 594.71L656.46 593.77 634.82 359.41 420.23 359.88 394.82 594.71z"
                  />
                  <path
                    className="cls-13"
                    d="M463.99 359.41L462.58 390.47 592.46 390.47 591.05 358.47"
                  />
                  <path
                    className="cls-13"
                    d="M497.88 359.88L497.88 369.3 556.23 368.83 556.23 359.41"
                  />
                  <path
                    className="cls-13"
                    d="M447.99 593.77L450.35 550 600.93 550.47 602.35 593.3"
                  />
                  <path
                    className="cls-13"
                    d="M489.88 593.3L490.35 579.18 560.93 580.12 561.4 593.3"
                  />
                  <path
                    className="cls-13"
                    d="M510.82 593.77v-5.41h29.65v6.12M499.29 550.24c0-.71 7.06-10.12 30.35-9.18 0 0 18.12 1.65 22.35 8.94"
                  />
                  <path
                    className="cls-13"
                    d="M409.17 465.06L495.05 464.89 644.7 464.59"
                  />
                  <path
                    className="cls-13"
                    d="M531.29 444.83s-32.23-2.46-36.23 20.06c0 0-1.65 19.7 32.94 20.64 0 0 30.35-1.18 29.65-21.65 0 0 1.18-14.82-26.35-19.06zM503.99 390.47s5.65 7.53 25.88 6.82c0 0 14.82-.94 20-6.82"
                  />
                  <path
                    className="cls-13"
                    d="M515.99 358.94L515.99 352.59 539.29 352.59 539.29 358.94"
                  />
                  <path
                    fill="#040404"
                    d="M490.93 187.35L491.64 212.77 550.58 212.41 550.93 187.53 490.93 187.35z"
                  />
                  <path
                    fill="#ffdd21"
                    d="M490.76 179.94L490.76 186.47 550.93 186.47 550.93 179.41 490.76 179.94z"
                  />
                  <path
                    d="M174.64 520.71s-6.17 58.12 34.82 136.71l6.41-.82s-35.65-56.82-35.29-135.53l-5.94-.35z"
                    fill="#312783"
                  />
                  <path
                    d="M229.64 343.88h6.71s33.88-42.71 67.41-69.53l-5.29-3.88s-48.71 39.53-68.82 73.41z"
                    fill="#be1622"
                  />
                  <path
                    className="cls-72"
                    d="M289.11 302.46L279.4 296.24 282.93 292.35 292.29 299.29 289.11 302.46z"
                  />
                  <path
                    className="cls-72"
                    d="M268.99 322.58L260.23 316.12 257.17 319.18 266.52 325.41 268.99 322.58z"
                  />
                  <path
                    className="cls-72"
                    d="M198.05 540.7L198.05 545.64 183.76 544.35 183.4 539.3 198.05 540.7z"
                  />
                  <path
                    className="cls-72"
                    d="M218.52 621.52L217.11 616.58 199.64 617.24 202.29 622.71 218.52 621.52z"
                  />
                  <path
                    className="cls-72"
                    d="M204.76 578.11L205.47 582.35 189.76 582.47 188.35 577.35 204.76 578.11z"
                  />
                  <path
                    className="cls-14"
                    d="M526.16 286.92c-11.26.19-22.21 1.1-32.83 2.67l.31 2.07-.31-2.07c-108.46 15.98-181.64 101.65-181.64 218.07 0 67.78 22.81 127.46 64.24 168.04 37.87 37.1 89.44 56.05 149.14 54.83 125.71-2.59 213.5-94.24 213.5-222.88 0-63.73-23.25-121.69-65.47-163.19-32.87-32.31-75.45-51.91-121.85-56.51l-.45 1.94.45-1.94c-7.04-.7-14.16-1.06-21.35-1.06-1.25 0-2.5.01-3.76.03z"
                  />
                  <path
                    d="M726.8 414.67c-11.6-28.55-28.24-53.61-49.48-74.49-33.68-33.11-73.04-52.48-120.5-57.36l-8.76 4.24c46.4 4.6 92.19 25.09 125.06 57.4 42.22 41.51 65.47 99.46 65.47 163.19 0 128.64-87.8 220.29-213.5 222.88-59.7 1.22-111.27-17.73-149.14-54.83-41.42-40.58-64.24-100.26-64.24-168.04 0-116.42 75.19-204.61 183.65-220.59L488 284.6c-50.5 7.27-89.5 28.13-122.56 63.21-38.52 40.87-59.73 97.64-59.73 159.86 0 69.41 23.45 130.61 66.04 172.33 37.86 37.09 88.91 56.6 147.9 56.6 1.85 0 3.7-.02 5.56-.06 65.14-1.34 120.66-24.91 160.55-68.15 37.94-41.13 58.83-98.21 58.83-160.72 0-32.64-5.98-63.92-17.79-92.98z"
                    fill="#c6c6c6"
                  />
                  <path
                    className="cls-45"
                    d="M404.93 268.59l.24 5.41s-19.76 5.65-60.94 39.76c0 0-58.82 51.06-79.53 124.24l-3.06 12.71s0-18.35 12.47-47.06c0 0 31.06-71.76 87.18-110.59 0 0 19.18-14.71 43.65-24.47zM420.7 262.71l.71 4.94s33.65-11.06 68.24-15.06l-.71-5.18s-42.82 5.41-68.24 15.29zM555.99 246.71l-.24 5.41s43.29 4.47 57.41 10.59l.24-5.65s-8.24-4.47-57.41-10.35zM632.46 263.65v5.41s38.35 12.71 70.82 41.88 52.47 60.71 52.47 60.71 28.94 47.76 34.12 82.35c0 0 9.65 48 3.76 81.41l.71 1.18s8.71-56-8.71-108.24c-17.41-52.24-41.65-85.41-80.94-122.82 0 0-33.41-30.12-72.24-41.88z"
                  />
                  <path
                    className="cls-66"
                    d="M639.52 736.83l.71 4.24s43.76-17.18 70.59-39.29c26.82-22.12 38.35-39.06 50.59-60.24s16.94-40 16.94-40-15.06 43.06-44.24 73.41-61.88 50.12-94.59 61.88zM545.64 756.12l.24 5.88s37.88-.24 66.12-11.53c-.24-2.82.47-5.88.47-5.88s-35.53 12.47-66.82 11.53zM514.58 757.06l-.24 5.18s-40.71.47-65.18-8l-.24-5.41s29.18 9.41 65.65 8.24zM429.4 749.06v-5.18l-44.47-16.94s-43.53-22.12-70.12-52.24c0 0-28.71-34.82-37.18-61.65 0 0 17.88 50.35 52.94 80.94s78.35 49.88 98.82 55.06z"
                  />
                  <path
                    d="M716.93 244.45l.35-9.53 2.12-2.12s54.71 31.76 86.82 73.06l1.06-2.82 7.41-.35 18 23.65-2.12 11.65s21.53 31.76 27.18 46.94l5.65.35s14.12 32.82 16.24 51.18l-3.18 8.82s11.65 60-2.12 122.47l-6.35 19.41-4.59 4.59s21.53-76.94 7.06-138.35v-4.24l-6.71.71s-2.47-26.82-13.41-50.12l1.06-4.24s-10.94-30.35-47.29-75.88c0 0-50.82-59.29-87.18-75.18z"
                    fill="#bbbabb"
                  />
                  <path
                    d="M850.52 384.57s11.29 27.53 15.53 48.35l-3.88 15.88s-6.71-34.24-14.82-50.12l3.18-14.12z"
                    fill="#3a443e"
                  />
                  <path
                    d="M861.11 383.87s9.88 26.12 15.53 49.76l-10.59-.71s-7.76-31.41-15.53-48.35l10.59-.71z"
                    fill="#95a0b7"
                  />
                  <path
                    className="cls-71"
                    d="M862.17 448.81h9.18s4.94-7.76 5.29-15.18l-10.94.41-3.53 14.76z"
                  />
                  <path
                    className="cls-71"
                    d="M840.64 378.75L842.93 371.87 839.76 366.22 837.11 372.75 840.64 378.75z"
                  />
                  <path
                    className="cls-71"
                    d="M831.11 361.1L832.87 352.1 830.05 348.57 827.93 355.81 831.11 361.1z"
                  />
                  <path
                    className="cls-71"
                    d="M823.7 348.57L825.82 340.1 822.99 336.93 821.05 344.34 823.7 348.57z"
                  />
                  <path
                    className="cls-71"
                    d="M809.93 329.69L810.82 323.87 814.17 328.28 813.29 334.1 809.93 329.69z"
                  />
                  <path
                    className="cls-71"
                    d="M800.93 318.04c-.18-.53.88-8.29.88-8.29s-19.59-21.35-21.18-22.06l-.35 7.41 20.65 22.94z"
                  />
                  <path
                    className="cls-71"
                    d="M753.29 270.4L753.29 266.34 758.58 270.04 759.29 265.98 745.87 255.22 745.52 258.4 749.4 262.28 748.87 267.57 753.29 270.4z"
                  />
                  <path
                    className="cls-71"
                    d="M739.34 259.45L739.7 252.75 722.58 241.28 722.23 247.63 739.34 259.45z"
                  />
                  <path
                    className="cls-52"
                    d="M680.58 219.04L681.11 209.16 644.05 196.63 643.52 205.98 680.58 219.04z"
                  />
                  <path
                    className="cls-52"
                    d="M722.05 237.04L722.58 227.51 757.52 250.45 756.11 259.81 722.05 237.04z"
                  />
                  <path
                    className="cls-52"
                    d="M805.7 312.93L807.11 303.04 827.05 325.98 824.23 336.75 805.7 312.93z"
                  />
                  <path
                    className="cls-6"
                    d="M874.76 485.12c.94-1.88 4.71-11.76 4.71-11.76l1.88 15.06-5.18 9.88-1.41-13.18z"
                  />
                  <path
                    className="cls-6"
                    d="M875.71 523.24L881.35 512.88 879.94 528.41 875.24 533.59 875.71 523.24z"
                  />
                  <path
                    fill="#030204"
                    d="M875.71 565.12L879.94 528.41 883.71 517.59 879.47 558.06 875.71 565.12z"
                  />
                  <text className="cls-20" transform="rotate(-29.77 715.046 -535.895)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-28.39 739.044 -581.732)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-27.13 762.78 -628.635)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-25.94 787.098 -677.736)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-24.81 812.156 -729.275)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-23.71 838.712 -784.557)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-22.64 866.907 -843.736)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-21.58 897.543 -908.284)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-20.54 930.563 -978.227)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(-19.5 967.076 -1055.58)">
                    <tspan x={0} y={0} />
                  </text>
                  <text
                    className="cls-20"
                    transform="rotate(-17.28 1062.874 -1229.581)"
                  >
                    <tspan x={0} y={0}>
                      {"G"}
                    </tspan>
                  </text>
                  <text
                    className="cls-20"
                    transform="rotate(-14.09 1245.476 -1619.578)"
                  >
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text
                    className="cls-20"
                    transform="rotate(-10.84 1542.988 -2237.485)"
                  >
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(-7.58 2094.755 -3409.097)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(-4.42 3406.97 -6161.613)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text
                    className="cls-20"
                    transform="rotate(-.96 14740.693 -29930.145)"
                  >
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(2.26 -5884.842 13403.777)">
                    <tspan x={0} y={0}>
                      {"L"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(4.17 -3070.122 7537.098)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(6.44 -1891.008 4971.284)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(10.03 -1117.124 3345.318)">
                    <tspan x={0} y={0}>
                      {"O"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(13.43 -766.075 2616.275)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(16.26 -585.856 2242.862)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(18.94 -464.135 1987.994)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-113.77 335.283 244.57)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-112.98 336.914 242.34)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-112.24 338.344 240.16)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-111 342.003 237.308)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-109.09 345.481 231.323)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-107.69 346.236 225.519)">
                    <tspan x={0} y={0}>
                      {"I"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-106.32 349.66 221.677)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-104.43 352.528 214.845)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-102.52 355.273 207.585)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-100.6 358.068 200.07)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-99.43 357.797 193.676)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-98.36 360.865 190.537)">
                    <tspan x={0} y={0}>
                      {"S"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-96.62 363.888 183.593)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-94.8 366.552 175.6)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-19" transform="rotate(-85.25 393.332 115.307)">
                    <tspan x={0} y={0}>
                      {"P"}
                    </tspan>
                  </text>
                  <text className="cls-19" transform="rotate(-81.95 401.57 99.303)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-19" transform="rotate(-78.94 407.195 80.984)">
                    <tspan x={0} y={0}>
                      {"L"}
                    </tspan>
                  </text>
                  <text className="cls-19" transform="rotate(-76.28 413.584 65.11)">
                    <tspan x={0} y={0}>
                      {"C"}
                    </tspan>
                  </text>
                  <text className="cls-19" transform="rotate(-73.29 421.213 46.183)">
                    <tspan x={0} y={0}>
                      {"O"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-113.77 365.553 215.768)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-112.98 367.125 213.203)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-112.24 368.492 210.696)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-111 372.046 207.304)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-109.09 375.37 200.47)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-107.69 376.007 194.017)">
                    <tspan x={0} y={0}>
                      {"I"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-106.32 379.313 189.548)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-104.43 382.011 181.813)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-102.52 384.588 173.628)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-100.6 387.211 165.147)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-99.43 386.82 158.155)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-98.36 389.79 154.464)">
                    <tspan x={0} y={0}>
                      {"S"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-96.62 392.648 146.59)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-94.8 395.118 137.603)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-93.64 395.112 130.209)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-15" transform="rotate(-92.47 398.672 125.95)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-90.61 401.829 116.543)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-88.78 404.514 106.465)">
                    <tspan x={0} y={0}>
                      {"J"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-86.98 407.856 96.853)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-75.78 441.044 46.013)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-75.09 443.388 41.956)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-74.44 445.556 37.968)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-73.36 450.27 32.629)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-71.69 455.827 21.493)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-70.45 458.542 10.75)">
                    <tspan x={0} y={0}>
                      {"I"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-69.26 463.46 3.289)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-67.61 468.831 -9.832)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-65.95 474.243 -23.957)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-64.29 479.859 -38.792)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-63.29 481.606 -50.906)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-62.24 486.992 -58.35)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-60.55 493.412 -75.002)">
                    <tspan x={0} y={0}>
                      {"O"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-58.92 499.406 -92.76)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-57.53 504.785 -108.635)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-56.17 510.679 -124.14)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-55.24 513.451 -137.823)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-54.23 519.596 -147.387)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-52.64 527.396 -167.517)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-51.06 535.167 -189.52)">
                    <tspan x={0} y={0}>
                      {"J"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-49.52 543.666 -211.222)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-106.07 352.492 210.252)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-103.91 355.912 202.407)">
                    <tspan x={0} y={0}>
                      {"L"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-102.4 358.52 196.901)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-15" transform="rotate(-100.67 361.878 190.708)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-66.17 423.726 -4.35)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-65.48 426.277 -9.049)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-64.83 428.642 -13.68)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-63.76 433.66 -19.828)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-62.08 439.876 -32.957)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-60.84 443.098 -45.716)">
                    <tspan x={0} y={0}>
                      {"I"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-59.65 448.525 -54.61)">
                    <tspan x={0} y={0}>
                      {"B"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-58 454.695 -70.357)">
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-56.34 461 -87.47)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-54.68 467.605 -105.618)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-53.68 470.009 -120.519)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-16" transform="rotate(-52.63 476.123 -129.81)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-50.94 483.843 -150.67)">
                    <tspan x={0} y={0}>
                      {"O"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-49.31 491.242 -173.124)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-47.92 497.943 -193.426)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-16" transform="rotate(-46.56 505.254 -213.48)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-17" transform="rotate(-58.42 464.09 -80.018)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-17" transform="rotate(-56.25 472.9 -102.047)">
                    <tspan x={0} y={0}>
                      {"L"}
                    </tspan>
                  </text>
                  <text className="cls-17" transform="rotate(-54.74 479.562 -118.075)">
                    <tspan x={0} y={0}>
                      {"T"}
                    </tspan>
                  </text>
                  <text className="cls-17" transform="rotate(-53.02 487.852 -136.796)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(28.78 -1270.18 1060.467)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-18" transform="rotate(27.31 -1355.806 1115.708)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-18" transform="rotate(25.97 -1442.52 1172.848)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-18" transform="rotate(24.71 -1532.696 1233.156)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-18" transform="rotate(22.11 -1746.696 1358.066)">
                    <tspan x={0} y={0}>
                      {"G"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(18.42 -2162.267 1640.046)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(14.62 -2804.886 2062.973)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(10.68 -3952.844 2833.006)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(6.72 -6454.277 4479.861)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text
                    className="cls-18"
                    transform="rotate(2.19 -20388.731 13618.831)"
                  >
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                  <text
                    className="cls-18"
                    transform="rotate(-2.21 20745.348 -13439.831)"
                  >
                    <tspan x={0} y={0}>
                      {"L"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(-4.9 9497.647 -6096.203)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-18" transform="rotate(-7.77 6086.811 -3757.379)">
                    <tspan x={0} y={0}>
                      {"S"}
                    </tspan>
                  </text>
                  <text
                    className="cls-18"
                    transform="rotate(-12.45 3893.236 -2299.477)"
                  >
                    <tspan x={0} y={0}>
                      {"U"}
                    </tspan>
                  </text>
                  <text className="cls-18" transform="rotate(-17.35 2860.7 -1622.964)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(45.69 -8.24 1021.61)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(47.2 2.34 997.438)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(48.59 11.312 976.952)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(49.9 19.166 958.986)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(51.16 26.252 942.78)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(52.39 32.81 927.782)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(53.59 38.856 913.912)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(54.78 44.577 900.786)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(55.95 49.944 888.47)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(57.11 55.046 876.733)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(58.28 60.01 865.328)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(59.44 64.74 854.44)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(60.59 69.254 844.06)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(61.75 73.664 833.92)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(62.91 77.925 824.124)">
                    <tspan x={0} y={0} />
                  </text>
                  <text className="cls-20" transform="rotate(65.28 89.302 800.234)">
                    <tspan x={0} y={0}>
                      {"P"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(68.94 101.287 773.164)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(72.52 111.499 749.67)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(75.89 120.501 729.072)">
                    <tspan x={0} y={0}>
                      {"F"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(79.25 129.125 709.644)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(82.78 137.66 690.557)">
                    <tspan x={0} y={0}>
                      {"R"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(86.25 144.623 674.049)">
                    <tspan x={0} y={0}>
                      {"E"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(89.76 152.055 657.528)">
                    <tspan x={0} y={0}>
                      {"N"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(93.25 157.54 643.553)">
                    <tspan x={0} y={0}>
                      {"C"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(95.6 158.733 636.686)">
                    <tspan x={0} y={0}>
                      {"I"}
                    </tspan>
                  </text>
                  <text className="cls-20" transform="rotate(98.07 165.152 625.033)">
                    <tspan x={0} y={0}>
                      {"A"}
                    </tspan>
                  </text>
                </g>
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