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
              x="0px"
              y="0px"
              width={"90%"}
              height={"90%"}
              viewBox="0 0 1080 1080"
              xmlSpace="preserve"
            >
              <style>
                {
                  ".st1{fill:#66655d}.st2{fill:#fff}.st3{fill:#606060}.st6{font-family:&apos;ArialMT&apos;}.st8{font-family:&apos;Mont-HeavyDEMO&apos;}.st9{font-size:48px}.st12{font-size:48.0017px}.st14{font-size:12px}.st20{fill:none}.st22{fill:#e3e3e3}.st23{font-family:&apos;Impact&apos;}.st25{fill:#dbd9d9;stroke:#f4e9e9;stroke-miterlimit:10}.st30{font-size:72px}.st31{font-size:59.8387px}.st32{font-size:52.9228px}.st33{fill:#e0c399}.st34{fill:#b1862a}.st35{fill:#c11717}.st36{fill:#01538f}.st37{fill:#c11718}.st38{fill:#c41922}"
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
                className="none" id="1"
                d="M289.1 684.2c62.4 107.1 174.3 118.6 219.7 118.6 14.8 0 24.3-1.2 25.7-1.3 80.6-6.2 132-38.4 161-64.4 24.9-22.4 37.8-43.7 42.3-52.2l106.5 28.3c-13.8 42.3-46.6 80-72.2 104.6-28.5 27.4-54.4 44.7-55.5 45.5-31.8 20.1-69.1 34.7-110.8 43.5-37.1 7.8-70.9 9.5-92.7 9.5-23 0-37.7-1.8-37.8-1.8h-.2c-54.3-5.2-104.1-19.1-147.9-41.1-35-17.6-66.4-40.5-93.2-68-45.7-46.9-62.6-91.6-62.8-92l-.1-.2-.1-.2c-.3-.7-.6-1.3-.9-2l119-26.8"

              />
              <path
                className="st2"
                d="M230.6 312.8c-12.2 18.4-27.2 46.5-28.4 74.9l-41.3 226.6s-5.9 34.1-.5 69l126.7-26.9c-.1-.3-.1-.5-.2-.8 0 0 4.2-184.2 37.1-316.6 0 0 .6-1.2 1.8-3.2l-95.2-23z"
              />
              <path
              className="none" id="2"
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
              <text
                transform="rotate(22.829 -1912.615 1333.87)"
                className="st6"
                fontSize="12.0004px"
              />
              <text
                transform="rotate(21.69 -2027.567 1391.569)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(19.993 -2225.96 1505.119)"
                className="st2 st8"
                fontSize="47.9984px"
              />
              <text
                transform="rotate(18.323 -2457.135 1637.979)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(16.672 -2729.71 1794.633)"
                className="st2 st8"
                fontSize="48.0018px"
              />
              <text
                transform="rotate(15.058 -3054.357 1982.228)"
                className="st2 st8 st12"
              />
              <text
                transform="rotate(13.468 -3448.526 2210.303)"
                className="st2 st8 st9"
              />
              <text
                transform="rotate(11.918 -3936.78 2494.68)"
                className="st2 st8"
                fontSize="47.9978px"
              />
              <text className="st6 st14" />
              <path
                className="st2"
                d="M864.4 289.3l-165.2 46.6s32.5 115.8 38.1 321.5l189.2 32.8s46.6-49.4 32.5-79.1l-46.6-273.9c0 .1-15.6-42.3-48-47.9z"
              />
              <path
                className="st3"
                d="M863.9 294.4c26.9 5.5 41.3 40.1 42.9 44.2L953.3 612l.1.7.3.6c9.9 20.8-16.6 56.9-29.8 71.5l-182.5-31.7c-3.1-104.6-13.2-185.1-21.1-234.5-6.7-41.8-13.2-68.9-15.8-79.3l159.4-44.9"
              />
              <path
                className="none" id="3"
                d="M863.9 295.5c26.9 5.5 41.3 40.1 42.9 44.2l46.5 273.4.1.7.3.6c9.9 20.8-16.6 56.9-29.8 71.5l-182.5-31.7c-3.1-104.6-13.2-185.1-21.1-234.5-6.7-41.8-13.2-68.9-15.8-79.3l159.4-44.9"
                fill="#4a4997"
              />
              <path
                className="st2"
                d="M517.7 180.7c-112.3 0-225.6 47.5-270.7 110 0 0-2.9 3.2-7.1 8.8l94.8 23.3c20.2-25.5 72.8-73.4 183.9-73.4H521.5c5.3 0 101.4 1 174.5 73.1l91.1-21.2S723.6 215.5 591.2 188c-24-5-48.7-7.3-73.5-7.3z"
              />
              <path
                d="M517.8 185.7c25.1 0 49.5 2.4 72.4 7.2 29.7 6.2 58.3 15.9 85 28.8 21.4 10.4 41.6 22.8 60.2 37 21.5 16.5 35.8 31.5 42.7 39.6L697.6 317c-30.8-29.6-68.7-50.8-112.9-62.9-34.4-9.4-60.3-9.7-63.1-9.7H518.7c-108.3 0-162.4 44.5-185.8 72.8l-84.1-20.7c1.3-1.6 2.1-2.5 2.1-2.5l.2-.2.1-.2c21.5-29.7 59.8-57 108-76.7 49-20.1 105.4-31.2 158.6-31.2"
                fill="#27348b"
              />
              <text transform="rotate(-18.612 975.89 -1122.853)" className="st6 st14" />
              <text
                transform="rotate(-17.44 1026.782 -1219.228)"
                className="st2 st8"
                fontSize="47.9985px"
              />
              <text
                transform="rotate(-15.647 1115.81 -1413.386)"
                className="st2 st8"
                fontSize="47.9979px"
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
                transform="rotate(-8.244 1891.4 -3093.308)"
                className="st2 st8 st12"
              />
              <text className="st6 st14" />
              <path
                className="st3"
                d="M232.9 319.2l85.9 20.8c-16.8 68.4-25.9 150.4-30.6 207.3-4.4 52.9-5.8 94.5-6.2 105.9l-117.4 25c-3.9-31.8 1.2-61.9 1.2-62.1l41.3-226.6.1-.3v-.3c1.2-26 14.2-51.8 25.7-69.7"
              />
              <path
                className="none" id="4"
                d="M232.9 319.2l85.9 20.8c-16.8 68.4-25.9 150.4-30.6 207.3-4.4 52.9-5.8 94.5-6.2 105.9l-117.4 25c-3.9-31.8 1.2-61.9 1.2-62.1l41.3-226.6.1-.3v-.3c1.2-26 14.2-51.8 25.7-69.7"

              />
              <path
                id="SVGID_x5F_00000007410317060522796580000000835565151317055140_x5F_"
                className="st20"
                d="M243.9 648.6l35.3-266.8"
              />
              <text
                transform="rotate(-82.461 454.95 142.896)"
                className="st6"
                fontSize="12.0005px"
              />
              <text className="st6 st14" />
              <path
                className="st22"
                d="M690.8 554.3L326.9 554.3 354.8 335.4 662.9 335.4z"
              />
              <text
                transform="translate(412 673.615)"
                className="st2 st23"
                fontSize="55.9839px"
              >
                {"CANCHA"}
              </text>
              <path
                className="st22"
                d="M354.8 335.4l2.1-13.8s79.1-48 154.4-48c0 0 91.3.9 148.7 47.5l2.9 14.3H354.8z"
              />
              <path
                className="st25"
                d="M461.2 240.1L461.2 302.8 466.8 302.8 466.8 240.2z"
              />
              <path
                className="st25"
                d="M544.8 240.1L544.8 302.8 550.4 302.8 550.4 240.2z"
              />
              <path
                className="st25"
                d="M568.4 211.6L568.4 331.5 575.9 331.5 575.9 211.7z"
              />
              <path
                className="st25"
                d="M435.8 211.6L435.8 331.5 443.2 331.5 443.2 211.7z"
              />
              <path fill="#b3b3b3" d="M435.3 205.5H575.9V211.7H435.3z" />
              <path
                className="st3"
                d="M435.4 205.5L479.7 175.8 531.8 175.8 576 205.5z"
              />
              <path
                className="st25"
                d="M443.2 212.4L466.5 233.5 466.5 240.2 461.2 240.1 443.4 227.7z"
              />
              <path
                className="st25"
                d="M568.3 212.4L545 233.5 545 240.2 550.3 240.1 568.1 227.7z"
              />
              <path className="st25" d="M435.8 211.6H575.9V222.7H435.8z" />
              <path className="st25" d="M461.2 233.7H550.5V240.2H461.2z" />
              <path fill="#181818" d="M442.4 314L442.4 329.9 567.4 329.9 567.4 314z" />
              <path
                fill="#353535"
                d="M443 314.4L566.8 314.4 549.6 303.2 460.2 302.8z"
              />
              <path fill="#b0b0b0" d="M466.8 240.2H544.8V302.9H466.8z" />
              <path
                id="SVGID_x5F_1_x5F_"
                className="st20"
                d="M208.7 732.7s93.2 152.5 301.8 156.7c0 0 207.5 3.2 293.3-169.4"
              />
              <text transform="rotate(40.217 -950.328 767.749)" className="st6 st14" />
              <text
                transform="rotate(38.986 -989.448 785.155)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(37.022 -1060.915 826.006)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(35.055 -1140.158 871.199)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(33.091 -1228.454 921.68)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(31.141 -1327.018 978.222)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(29.191 -1438.191 1041.89)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(27.252 -1564.187 1114.186)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(25.338 -1707.406 1196.767)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(23.44 -1871.726 1291.556)"
                className="st2 st23 st30"
              />
              <text
                transform="rotate(19.61 -2293.077 1501.202)"
                className="st2 st23 st30"
              >
                {"G"}
              </text>
              <text
                transform="rotate(14.738 -3159.544 2014.271)"
                className="st2 st23 st30"
              >
                {"E"}
              </text>
              <text
                transform="rotate(7.227 -6731.102 3900.276)"
                className="st2 st23 st30"
              >
                {"N"}
              </text>
              <text
                transform="rotate(2.144 -23314.253 13141.734)"
                className="st2 st23 st30"
              >
                {"E"}
              </text>
              <text
                transform="rotate(-2.651 19354.36 -10490.875) scale(.99997)"
                className="st2 st23 st30"
              >
                {"R"}
              </text>
              <text
                transform="rotate(-8.19 6429.446 -3361.391)"
                className="st2 st23 st30"
              >
                {"A"}
              </text>
              <text
                transform="rotate(-13.303 4048.538 -2051.818)"
                className="st2 st23 st30"
              >
                {"L"}
              </text>
              <text className="st6 st14" />
              <path
                id="SVGID_x5F_00000124841879130412774450000014670174898037156514_x5F_"
                className="st20"
                d="M251.7 620.5L284.3 396"
              />
              <text transform="rotate(-81.738 463.695 140.873)" className="st6 st14" />
              <text
                transform="rotate(-81.738 462.028 138.947)"
                className="st2 st23 st31"
              >
                {"T"}
              </text>
              <text
                transform="rotate(-81.738 448.237 123.008)"
                className="st2 st23 st31"
              >
                {"R"}
              </text>
              <text
                transform="rotate(-81.738 432.123 104.385)"
                className="st2 st23 st31"
              >
                {"I"}
              </text>
              <text
                transform="rotate(-81.738 423.504 94.424)"
                className="st2 st23 st31"
              >
                {"B"}
              </text>
              <text
                transform="rotate(-81.738 406.981 75.328)"
                className="st2 st23 st31"
              >
                {"U"}
              </text>
              <text transform="rotate(-81.738 390.62 56.418)" className="st2 st23 st31">
                {"N"}
              </text>
              <text
                transform="rotate(-81.738 373.974 37.735)"
                className="st2 st23 st31"
              >
                {"A"}
              </text>
              <text className="st6 st14" />
              <path
                id="SVGID_x5F_00000170997970629921327360000016535251117255215274_x5F_"
                className="st20"
                d="M784.2 328.9l33.4 331.8"
              />
              <text transform="rotate(84.25 184.41 628.918)" className="st6 st14" />
              <text transform="rotate(84.25 198.353 616.644)" className="st2 st23 st32">
                {"P"}
              </text>
              <text transform="rotate(84.25 185.07 631.33)" className="st2 st23 st32">
                {"R"}
              </text>
              <text transform="rotate(84.25 170.82 647.088)" className="st2 st23 st32">
                {"E"}
              </text>
              <text transform="rotate(84.25 159.823 659.245)" className="st2 st23 st32">
                {"F"}
              </text>
              <text transform="rotate(84.25 149.293 670.889)" className="st2 st23 st32">
                {"E"}
              </text>
              <text transform="rotate(84.25 138.297 683.046)" className="st2 st23 st32">
                {"R"}
              </text>
              <text transform="rotate(84.25 124.046 698.804)" className="st2 st23 st32">
                {"E"}
              </text>
              <text transform="rotate(84.25 113.05 710.961)" className="st2 st23 st32">
                {"N"}
              </text>
              <text transform="rotate(84.25 98.722 726.805)" className="st2 st23 st32">
                {"C"}
              </text>
              <text transform="rotate(84.25 84.069 743.005)" className="st2 st23 st32">
                {"I"}
              </text>
              <text transform="rotate(84.25 76.446 751.434)" className="st2 st23 st32">
                {"A"}
              </text>
              <text className="st6 st14" />
              <g>
                <path
                  className="st33"
                  d="M660 360.7L356.9 360.7 359.2 342.1 657.7 342.1z"
                />
                <path d="M424.6 351.5c-.3.4-.8.8-1.3 1-.6.3-1.3.4-2 .4H420l-.2 2.7h-3.1l.6-8.4h4.2c1.2 0 2.1.3 2.7.8.6.5.9 1.2.8 2.1.1.5-.1 1-.4 1.4zm-2.6-1.4c0-.5-.3-.8-.9-.8h-.9l-.1 1.5h.9c.6.1 1-.2 1-.7zM429.3 347.2l-.5 8.4h-3.1l.6-8.4h3zM431.1 355c-.7-.5-1.1-1.2-1.1-2.1h3.2c0 .5.2.7.7.7.2 0 .3 0 .4-.1.1-.1.2-.2.2-.3 0-.2-.1-.4-.3-.5-.2-.1-.6-.3-1.1-.4-.6-.2-1.1-.4-1.5-.6-.4-.2-.7-.4-1-.8-.3-.3-.4-.8-.3-1.3 0-.5.2-1 .6-1.4.3-.4.8-.7 1.4-.9.6-.2 1.2-.3 1.9-.3 1.2 0 2.1.2 2.8.7.7.5 1 1.1 1 2h-3.3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3 0 .2.1.3.3.5.2.1.6.3 1.1.4.6.2 1.1.4 1.5.6.4.2.7.4 1 .8.3.3.4.7.4 1.2s-.2 1-.5 1.4c-.3.4-.8.7-1.3 1-.6.2-1.2.3-2 .3-1.3.1-2.3-.1-3-.6zM446.8 347.2l-.1 2.1h-2.6l-.3 6.3h-3.1l.3-6.3h-2.5l.1-2.1h8.2zM453.5 354.3h-3.2l-.5 1.3h-3.2l4-8.4h3.5l3.2 8.4h-3.2l-.6-1.3zm-.6-1.9l-.8-2.3-1 2.3h1.8zM461.1 355c-.7-.5-1.1-1.2-1.2-2.1h3.2c0 .5.3.7.7.7.2 0 .3 0 .4-.1.1-.1.2-.2.2-.3 0-.2-.1-.4-.4-.5-.2-.1-.6-.3-1.1-.4-.6-.2-1.1-.4-1.5-.6-.4-.2-.7-.4-1-.8-.3-.3-.4-.8-.4-1.3s.2-1 .5-1.4c.3-.4.8-.7 1.4-.9.6-.2 1.2-.3 1.9-.3 1.2 0 2.1.2 2.8.7.7.5 1 1.1 1 2h-3.3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3 0 .2.1.3.3.5.2.1.6.3 1.1.4.6.2 1.1.4 1.5.6.4.2.7.4 1 .8.3.3.4.7.4 1.2s-.2 1-.5 1.4c-.3.4-.7.7-1.3 1-.6.2-1.2.3-2 .3-.9.1-1.8-.1-2.6-.6zM471 355.2c-.8-.4-1.3-.9-1.8-1.6-.4-.7-.6-1.4-.6-2.2 0-.8.3-1.6.7-2.2.5-.7 1.1-1.2 1.9-1.5.8-.4 1.6-.5 2.5-.5.9 0 1.7.2 2.5.5.7.4 1.3.9 1.8 1.5.4.7.6 1.4.6 2.2 0 .8-.3 1.6-.7 2.2-.5.7-1.1 1.2-1.9 1.6-.8.4-1.6.6-2.5.6-.9-.1-1.7-.3-2.5-.6zm4-2.5c.3-.3.5-.8.5-1.4 0-.6-.1-1-.5-1.4-.3-.3-.8-.5-1.4-.5-.6 0-1.1.2-1.4.5-.3.3-.5.8-.5 1.4 0 .6.1 1 .5 1.4.3.3.8.5 1.4.5.6 0 1.1-.1 1.4-.5zM489 355.6h-3l-3.1-4.3-.1 4.3h-3.1l.2-8.4h3l3.1 4.3.1-4.3h3l-.1 8.4zM492.6 355.2c-.8-.4-1.4-.9-1.8-1.6-.4-.7-.7-1.4-.6-2.2 0-.8.2-1.6.7-2.2.5-.7 1.1-1.2 1.8-1.5.8-.4 1.6-.5 2.5-.5.9 0 1.7.2 2.5.5.8.4 1.4.9 1.8 1.5.4.7.7 1.4.6 2.2 0 .8-.2 1.6-.7 2.2-.4.7-1.1 1.2-1.8 1.6-.8.4-1.6.6-2.5.6-.9-.1-1.7-.3-2.5-.6zm4-2.5c.3-.3.5-.8.5-1.4 0-.6-.2-1-.5-1.4-.3-.3-.8-.5-1.4-.5-.6 0-1.1.2-1.4.5-.3.3-.5.8-.5 1.4 0 .6.2 1 .5 1.4.3.3.8.5 1.4.5.6 0 1-.1 1.4-.5zM506.1 355.6l-1.8-3v3h-3.1v-8.4h4.5c.8 0 1.5.1 2 .4.6.2 1 .6 1.3 1 .3.4.4.9.4 1.4 0 .6-.2 1.1-.5 1.5-.4.4-.9.8-1.6.9l2.1 3.2h-3.3zm-1.8-4.8h1.2c.3 0 .5-.1.7-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.7-.2h-1.2v1.4zM516.7 354.3h-3.2l-.5 1.3h-3.2l3.5-8.4h3.5l3.6 8.4h-3.2l-.5-1.3zm-.7-1.9l-.9-2.3-.9 2.3h1.8zM523.7 349.2c.4-.6.9-1.2 1.6-1.5.7-.4 1.6-.5 2.5-.5.8 0 1.6.1 2.3.4.7.3 1.2.7 1.6 1.2.4.5.7 1.1.9 1.7h-3.2c-.2-.3-.4-.5-.6-.6-.3-.2-.6-.2-.9-.2-.5 0-.9.2-1.2.5-.3.3-.4.8-.4 1.3 0 .6.2 1 .5 1.3.3.3.7.5 1.2.5.3 0 .7-.1.9-.2.3-.2.5-.4.6-.6h3.2c-.1.7-.4 1.3-.8 1.8s-.9.9-1.6 1.2c-.7.3-1.4.4-2.3.4-1 0-1.8-.2-2.6-.5-.7-.4-1.3-.9-1.7-1.5-.4-.7-.6-1.4-.6-2.2 0-1.1.2-1.9.6-2.5zM540 354.3h-3.2l-.5 1.3h-3.2l3.4-8.4h3.5l3.8 8.4h-3.2l-.6-1.3zm-.7-1.9l-.9-2.3-.8 2.3h1.7zM552.2 352c.3.4.5.8.5 1.3 0 .7-.2 1.3-.8 1.7-.6.4-1.4.6-2.4.6h-5.1l-.2-8.4h4.9c1 0 1.8.2 2.3.6.6.4.9.9.9 1.6 0 .5-.1.9-.4 1.2-.3.3-.7.6-1.2.7.7.1 1.2.4 1.5.7zm-4.8-1.5h1.2c.3 0 .5 0 .6-.1.1-.1.2-.2.2-.4s-.1-.4-.2-.5c-.1-.1-.3-.1-.6-.1h-1.2v1.1zm2.1 2.9c.1-.1.2-.2.2-.4 0-.4-.3-.6-.8-.6h-1.4v1.2h1.4c.2-.1.4-.1.6-.2zM560.1 354.3h-3.2l-.4 1.3h-3.2l3.2-8.4h3.5l3.9 8.4h-3.2l-.6-1.3zm-.8-1.9l-1-2.3-.8 2.3h1.8zM567.5 353.6h2.9l.1 2h-6l-.4-8.4h3l.4 6.4zM574.5 353.6h2.9l.1 2h-6l-.4-8.4h3l.4 6.4zM580.7 355.2c-.8-.4-1.4-.9-1.9-1.6-.5-.7-.8-1.4-.8-2.2 0-.8.1-1.6.5-2.2.4-.7 1-1.2 1.7-1.5.7-.4 1.6-.5 2.5-.5.9 0 1.8.2 2.5.5.8.4 1.4.9 1.9 1.5.5.7.8 1.4.8 2.2.1.8-.1 1.6-.5 2.2-.4.7-1 1.2-1.7 1.6-.7.4-1.6.6-2.5.6-.9-.1-1.7-.3-2.5-.6zm3.8-2.5c.3-.3.4-.8.4-1.4 0-.6-.2-1-.6-1.4-.4-.3-.8-.5-1.4-.5-.6 0-1.1.2-1.4.5-.3.3-.4.8-.4 1.4 0 .6.2 1 .6 1.4.4.3.8.5 1.4.5.6 0 1.1-.1 1.4-.5zM590.2 355c-.8-.5-1.2-1.2-1.4-2.1h3.2c.1.5.3.7.8.7.2 0 .3 0 .4-.1.1-.1.2-.2.1-.3 0-.2-.1-.4-.4-.5-.3-.1-.7-.3-1.2-.4-.6-.2-1.2-.4-1.6-.6-.4-.2-.8-.4-1.1-.8-.3-.3-.5-.8-.5-1.3s.1-1 .4-1.4c.3-.4.7-.7 1.3-.9.5-.2 1.2-.3 1.9-.3 1.2 0 2.1.2 2.9.7.7.5 1.1 1.1 1.2 2h-3.3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3 0 .2.1.3.4.5.3.1.6.3 1.2.4.6.2 1.1.4 1.6.6.4.2.8.4 1.1.8.3.3.5.7.5 1.2s-.1 1-.3 1.4c-.3.4-.7.7-1.2 1-.5.2-1.2.3-2 .3-1.1.1-2.1-.1-2.9-.6z" />
                <path d="M366.6 373.2L355.8 373.2 357 363.5 367.7 363.5z" />
                <path d="M381.2 373.2L370.5 373.2 371.5 363.5 382.2 363.5z" />
                <path d="M395.9 373.2L385.1 373.2 386.1 363.5 396.8 363.5z" />
                <path d="M410.6 373.2L399.8 373.2 400.6 363.5 411.3 363.5z" />
                <path d="M425.2 373.2L414.4 373.2 415.2 363.5 425.9 363.5z" />
                <path d="M439.9 373.2L429.1 373.2 429.7 363.5 440.4 363.5z" />
                <path d="M454.5 373.2L443.8 373.2 444.3 363.5 454.9 363.5z" />
                <path d="M469.2 373.2L458.4 373.2 458.8 363.5 469.5 363.5z" />
                <path d="M483.8 373.2L473.1 373.2 473.3 363.5 484 363.5z" />
                <path d="M498.5 373.2L487.7 373.2 487.9 363.5 498.6 363.5z" />
                <path
                  className="st34"
                  d="M365.2 385.4L354.3 385.4 355.5 375.6 366.3 375.6z"
                />
                <path
                  className="st34"
                  d="M380 385.4L369.1 385.4 370.2 375.6 381 375.6z"
                />
                <path
                  className="st34"
                  d="M394.8 385.4L383.9 385.4 384.9 375.6 395.7 375.6z"
                />
                <path
                  className="st34"
                  d="M409.6 385.4L398.7 385.4 399.6 375.6 410.4 375.6z"
                />
                <path
                  className="st34"
                  d="M424.4 385.4L413.5 385.4 414.3 375.6 425.1 375.6z"
                />
                <path
                  className="st34"
                  d="M439.2 385.4L428.3 385.4 429 375.6 439.7 375.6z"
                />
                <path
                  className="st34"
                  d="M454 385.4L443.1 385.4 443.6 375.6 454.4 375.6z"
                />
                <path
                  className="st34"
                  d="M468.8 385.4L457.9 385.4 458.3 375.6 469.1 375.6z"
                />
                <path
                  className="none" id="5"
                  d="M483.6 385.4L472.7 385.4 473 375.6 483.8 375.6z"
                />
                <path className="st34" d="M544 385.8L533.1 385.8 533 376 543.7 376z" />
                <path
                  className="st34"
                  d="M558.8 385.8L548 385.8 547.6 376 558.4 376z"
                />
                <path
                  className="st34"
                  d="M573.6 385.8L562.8 385.8 562.3 376 573.1 376z"
                />
                <path
                  className="st34"
                  d="M588.4 385.8L577.6 385.8 577 376 587.8 376z"
                />
                <path
                  className="st34"
                  d="M603.2 385.8L592.4 385.8 591.7 376 602.5 376z"
                />
                <path
                  className="st34"
                  d="M618 385.8L607.2 385.8 606.4 376 617.2 376z"
                />
                <path
                  className="st34"
                  d="M632.9 385.8L622 385.8 621.1 376 631.9 376z"
                />
                <path
                  className="st34"
                  d="M647.7 385.8L636.8 385.8 635.8 376 646.6 376z"
                />
                <path
                  className="st34"
                  d="M662.5 385.8L651.6 385.8 650.5 376 661.3 376z"
                />
                <path
                  className="st35"
                  d="M561.3 451L549.9 451 549.6 440.1 560.9 440.1z"
                />
                <path
                  className="st35"
                  d="M576.9 451L565.5 451 565 440.1 576.3 440.1z"
                />
                <path
                  className="st35"
                  d="M592.5 451L581 451 580.4 440.1 591.8 440.1z"
                />
                <path
                  className="st35"
                  d="M608 451L596.6 451 595.9 440.1 607.2 440.1z"
                />
                <path
                  className="st35"
                  d="M623.6 451L612.2 451 611.3 440.1 622.7 440.1z"
                />
                <path
                  className="st35"
                  d="M639.2 451L627.7 451 626.8 440.1 638.1 440.1z"
                />
                <path
                  className="st35"
                  d="M654.7 451L643.3 451 642.2 440.1 653.5 440.1z"
                />
                <path
                  className="st35"
                  d="M670.3 451L658.9 451 657.6 440.1 669 440.1z"
                />
                <g>
                  <path
                    className="st35"
                    d="M358.2 451L346.8 451 348.1 440.1 359.4 440.1z"
                  />
                  <path
                    className="st35"
                    d="M373.8 451L362.3 451 363.5 440.1 374.9 440.1z"
                  />
                  <path
                    className="st35"
                    d="M389.3 451L377.9 451 379 440.1 390.3 440.1z"
                  />
                  <path
                    className="st35"
                    d="M404.9 451L393.5 451 394.4 440.1 405.8 440.1z"
                  />
                  <path
                    className="st35"
                    d="M420.5 451L409.1 451 409.9 440.1 421.2 440.1z"
                  />
                  <path
                    className="st35"
                    d="M436.1 451L424.6 451 425.3 440.1 436.6 440.1z"
                  />
                  <path
                    className="st35"
                    d="M451.6 451L440.2 451 440.7 440.1 452.1 440.1z"
                  />
                  <path
                    className="st35"
                    d="M467.2 451L455.8 451 456.2 440.1 467.5 440.1z"
                  />
                </g>
                <g>
                  <path
                    className="st35"
                    d="M356.6 465.3L345 465.3 346.4 454.2 357.8 454.2z"
                  />
                  <path
                    className="st35"
                    d="M372.3 465.3L360.8 465.3 362 454.2 373.4 454.2z"
                  />
                  <path
                    className="st35"
                    d="M388.1 465.3L376.5 465.3 377.6 454.2 389.1 454.2z"
                  />
                  <path
                    className="st35"
                    d="M403.8 465.3L392.2 465.3 393.2 454.2 404.7 454.2z"
                  />
                  <path
                    className="st35"
                    d="M419.5 465.3L408 465.3 408.8 454.2 420.3 454.2z"
                  />
                  <path
                    className="st35"
                    d="M435.3 465.3L423.7 465.3 424.4 454.2 435.9 454.2z"
                  />
                  <path
                    className="st35"
                    d="M451 465.3L439.5 465.3 440 454.2 451.5 454.2z"
                  />
                  <path
                    className="st35"
                    d="M466.7 465.3L455.2 465.3 455.6 454.2 467.1 454.2z"
                  />
                </g>
                <g>
                  <path
                    className="st35"
                    d="M354.9 480L343.2 480 344.6 468.7 356.2 468.7z"
                  />
                  <path
                    className="st35"
                    d="M370.8 480L359.1 480 360.4 468.7 372 468.7z"
                  />
                  <path
                    className="st35"
                    d="M386.7 480L375.1 480 376.2 468.7 387.8 468.7z"
                  />
                  <path
                    className="st35"
                    d="M402.6 480L391 480 391.9 468.7 403.5 468.7z"
                  />
                  <path
                    className="st35"
                    d="M418.6 480L406.9 480 407.7 468.7 419.3 468.7z"
                  />
                  <path
                    className="st35"
                    d="M434.5 480L422.8 480 423.5 468.7 435.1 468.7z"
                  />
                  <path
                    className="st35"
                    d="M450.4 480L438.7 480 439.3 468.7 450.9 468.7z"
                  />
                  <path
                    className="st35"
                    d="M466.3 480L454.6 480 455.1 468.7 466.6 468.7z"
                  />
                  <g>
                    <path
                      className="st35"
                      d="M483.1 480L471.4 480 471.7 468.7 483.3 468.7z"
                    />
                    <path
                      className="st35"
                      d="M499 480L487.3 480 487.5 468.7 499.1 468.7z"
                    />
                    <path
                      className="st35"
                      d="M514.9 480L503.2 480 503.3 468.7 514.9 468.7z"
                    />
                    <path
                      className="st35"
                      d="M530.8 480L519.1 480 519.1 468.7 530.6 468.7z"
                    />
                    <path
                      className="st35"
                      d="M546.7 480L535.1 480 534.8 468.7 546.4 468.7z"
                    />
                    <path
                      className="st35"
                      d="M562.6 480L551 480 550.6 468.7 562.2 468.7z"
                    />
                    <path
                      className="st35"
                      d="M578.6 480L566.9 480 566.4 468.7 578 468.7z"
                    />
                    <path
                      className="st35"
                      d="M594.5 480L582.8 480 582.2 468.7 593.7 468.7z"
                    />
                  </g>
                  <g>
                    <path
                      className="st35"
                      d="M610.6 480L598.9 480 598.2 468.7 609.7 468.7z"
                    />
                    <path
                      className="st35"
                      d="M626.5 480L614.8 480 613.9 468.7 625.5 468.7z"
                    />
                    <path
                      className="st35"
                      d="M642.4 480L630.7 480 629.7 468.7 641.3 468.7z"
                    />
                    <path
                      className="st35"
                      d="M658.3 480L646.6 480 645.5 468.7 657.1 468.7z"
                    />
                    <path
                      className="st35"
                      d="M674.2 480L662.5 480 661.3 468.7 672.8 468.7z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    className="st35"
                    d="M353.3 494.7L341.5 494.7 342.9 483.1 354.6 483.1z"
                  />
                  <path
                    className="st35"
                    d="M369.3 494.7L357.5 494.7 358.8 483.1 370.5 483.1z"
                  />
                  <path
                    className="st35"
                    d="M385.4 494.7L373.6 494.7 374.8 483.1 386.5 483.1z"
                  />
                  <path
                    className="st35"
                    d="M401.5 494.7L389.7 494.7 390.7 483.1 402.4 483.1z"
                  />
                  <path
                    className="st35"
                    d="M417.6 494.7L405.8 494.7 406.6 483.1 418.4 483.1z"
                  />
                  <path
                    className="st35"
                    d="M433.7 494.7L421.9 494.7 422.6 483.1 434.3 483.1z"
                  />
                  <path
                    className="st35"
                    d="M449.8 494.7L437.9 494.7 438.5 483.1 450.2 483.1z"
                  />
                  <path
                    className="st35"
                    d="M465.8 494.7L454 494.7 454.5 483.1 466.2 483.1z"
                  />
                  <g>
                    <path
                      className="st35"
                      d="M482.8 494.7L471 494.7 471.3 483.1 483 483.1z"
                    />
                    <path
                      className="st35"
                      d="M498.9 494.7L487.1 494.7 487.3 483.1 499 483.1z"
                    />
                    <path
                      className="none" id="6"
                      d="M515 494.7L503.2 494.7 503.2 483.1 514.9 483.1z"
                    />
                    <path
                      className="st35"
                      d="M531.1 494.7L519.3 494.7 519.2 483.1 530.9 483.1z"
                    />
                    <path
                      className="st35"
                      d="M547.1 494.7L535.3 494.7 535.1 483.1 546.8 483.1z"
                    />
                    <path
                      className="st35"
                      d="M563.2 494.7L551.4 494.7 551.1 483.1 562.8 483.1z"
                    />
                    <path
                      className="st35"
                      d="M579.3 494.7L567.5 494.7 567 483.1 578.7 483.1z"
                    />
                    <path
                      className="st35"
                      d="M595.4 494.7L583.6 494.7 583 483.1 594.7 483.1z"
                    />
                  </g>
                  <g>
                    <path
                      className="st35"
                      d="M611.7 494.7L599.9 494.7 599.1 483.1 610.8 483.1z"
                    />
                    <path
                      className="st35"
                      d="M627.8 494.7L616 494.7 615.1 483.1 626.8 483.1z"
                    />
                    <path
                      className="st35"
                      d="M643.9 494.7L632 494.7 631 483.1 642.7 483.1z"
                    />
                    <path
                      className="st35"
                      d="M659.9 494.7L648.1 494.7 646.9 483.1 658.7 483.1z"
                    />
                    <path
                      className="st35"
                      d="M676 494.7L664.2 494.7 662.9 483.1 674.6 483.1z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    className="st36"
                    d="M351.7 509L339.7 509 341.2 497.2 353 497.2z"
                  />
                  <path
                    className="st36"
                    d="M367.9 509L356 509 357.3 497.2 369.1 497.2z"
                  />
                  <path
                    className="st36"
                    d="M384.1 509L372.2 509 373.4 497.2 385.2 497.2z"
                  />
                  <path
                    className="st36"
                    d="M400.4 509L388.5 509 389.5 497.2 401.3 497.2z"
                  />
                  <path
                    className="st36"
                    d="M416.6 509L404.7 509 405.6 497.2 417.4 497.2z"
                  />
                  <path
                    className="st36"
                    d="M432.9 509L421 509 421.7 497.2 433.5 497.2z"
                  />
                  <path
                    className="st36"
                    d="M449.1 509L437.2 509 437.8 497.2 449.6 497.2z"
                  />
                  <path
                    className="st36"
                    d="M465.4 509L453.5 509 453.9 497.2 465.8 497.2z"
                  />
                  <g>
                    <path
                      className="st36"
                      d="M482.6 509L470.6 509 470.9 497.2 482.8 497.2z"
                    />
                    <path
                      className="st36"
                      d="M498.8 509L486.9 509 487.1 497.2 498.9 497.2z"
                    />
                    <path
                      className="st36"
                      d="M515.1 509L503.1 509 503.2 497.2 515 497.2z"
                    />
                    <path
                      className="st36"
                      d="M531.3 509L519.4 509 519.3 497.2 531.1 497.2z"
                    />
                    <path
                      className="st36"
                      d="M547.6 509L535.6 509 535.4 497.2 547.2 497.2z"
                    />
                    <path
                      className="st36"
                      d="M563.8 509L551.9 509 551.5 497.2 563.3 497.2z"
                    />
                    <path
                      className="st36"
                      d="M580 509L568.1 509 567.6 497.2 579.4 497.2z"
                    />
                    <path
                      className="st36"
                      d="M596.3 509L584.4 509 583.7 497.2 595.5 497.2z"
                    />
                  </g>
                  <g>
                    <path
                      className="st36"
                      d="M612.8 509L600.8 509 600 497.2 611.9 497.2z"
                    />
                    <path
                      className="st36"
                      d="M629 509L617.1 509 616.2 497.2 628 497.2z"
                    />
                    <path
                      className="st36"
                      d="M645.3 509L633.3 509 632.3 497.2 644.1 497.2z"
                    />
                    <path
                      className="st36"
                      d="M661.5 509L649.6 509 648.4 497.2 660.2 497.2z"
                    />
                    <path
                      className="st36"
                      d="M677.8 509L665.8 509 664.5 497.2 676.3 497.2z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    className="st36"
                    d="M349.9 524.6L337.8 524.6 339.3 512.5 351.2 512.5z"
                  />
                  <path
                    className="st36"
                    d="M366.3 524.6L354.2 524.6 355.6 512.5 367.5 512.5z"
                  />
                  <path
                    className="st36"
                    d="M382.7 524.6L370.7 524.6 371.9 512.5 383.8 512.5z"
                  />
                  <path
                    className="st36"
                    d="M399.2 524.6L387.1 524.6 388.2 512.5 400.1 512.5z"
                  />
                  <path
                    className="st36"
                    d="M415.6 524.6L403.5 524.6 404.4 512.5 416.4 512.5z"
                  />
                  <path
                    className="st36"
                    d="M432 524.6L420 524.6 420.7 512.5 432.7 512.5z"
                  />
                  <path
                    className="st36"
                    d="M448.5 524.6L436.4 524.6 437 512.5 449 512.5z"
                  />
                  <path
                    className="st36"
                    d="M464.9 524.6L452.8 524.6 453.3 512.5 465.3 512.5z"
                  />
                  <g>
                    <path
                      className="st36"
                      d="M482.3 524.6L470.2 524.6 470.5 512.5 482.5 512.5z"
                    />
                    <path
                      className="st36"
                      d="M498.7 524.6L486.6 524.6 486.8 512.5 498.8 512.5z"
                    />
                    <path
                      className="st36"
                      d="M515.1 524.6L503.1 524.6 503.1 512.5 515.1 512.5z"
                    />
                    <path
                      className="st36"
                      d="M531.6 524.6L519.5 524.6 519.4 512.5 531.4 512.5z"
                    />
                    <path
                      className="st36"
                      d="M548 524.6L535.9 524.6 535.7 512.5 547.7 512.5z"
                    />
                    <path
                      className="st36"
                      d="M564.4 524.6L552.4 524.6 552 512.5 563.9 512.5z"
                    />
                    <path
                      className="st36"
                      d="M580.9 524.6L568.8 524.6 568.3 512.5 580.2 512.5z"
                    />
                    <path
                      className="st36"
                      d="M597.3 524.6L585.2 524.6 584.6 512.5 596.5 512.5z"
                    />
                  </g>
                  <g>
                    <path
                      className="st36"
                      d="M613.9 524.6L601.9 524.6 601.1 512.5 613 512.5z"
                    />
                    <path
                      className="st36"
                      d="M630.4 524.6L618.3 524.6 617.4 512.5 629.3 512.5z"
                    />
                    <path
                      className="st36"
                      d="M646.8 524.6L634.7 524.6 633.6 512.5 645.6 512.5z"
                    />
                    <path
                      className="st36"
                      d="M663.2 524.6L651.2 524.6 649.9 512.5 661.9 512.5z"
                    />
                    <path
                      className="st36"
                      d="M679.7 524.6L667.6 524.6 666.2 512.5 678.2 512.5z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    className="st36"
                    d="M348.2 539.8L336 539.8 337.5 527.5 349.6 527.5z"
                  />
                  <path
                    className="st36"
                    d="M364.8 539.8L352.6 539.8 353.9 527.5 366 527.5z"
                  />
                  <path
                    className="st36"
                    d="M381.4 539.8L369.2 539.8 370.4 527.5 382.5 527.5z"
                  />
                  <path
                    className="st36"
                    d="M398 539.8L385.8 539.8 386.9 527.5 398.9 527.5z"
                  />
                  <path
                    className="st36"
                    d="M414.6 539.8L402.4 539.8 403.3 527.5 415.4 527.5z"
                  />
                  <path
                    className="st36"
                    d="M431.2 539.8L419 539.8 419.8 527.5 431.9 527.5z"
                  />
                  <path
                    className="st36"
                    d="M447.8 539.8L435.6 539.8 436.3 527.5 448.3 527.5z"
                  />
                  <path
                    className="st36"
                    d="M464.4 539.8L452.2 539.8 452.7 527.5 464.8 527.5z"
                  />
                  <g>
                    <path
                      className="st36"
                      d="M482 539.8L469.8 539.8 470.1 527.5 482.2 527.5z"
                    />
                    <path
                      className="st36"
                      d="M498.6 539.8L486.4 539.8 486.6 527.5 498.7 527.5z"
                    />
                    <path
                      className="none" id="7"
                      d="M515.2 539.8L503 539.8 503.1 527.5 515.1 527.5z"
                    />
                    <path
                      className="st36"
                      d="M531.8 539.8L519.6 539.8 519.5 527.5 531.6 527.5z"
                    />
                    <path
                      className="st36"
                      d="M548.4 539.8L536.2 539.8 536 527.5 548.1 527.5z"
                    />
                    <path
                      className="st36"
                      d="M565 539.8L552.8 539.8 552.4 527.5 564.5 527.5z"
                    />
                    <path
                      className="st36"
                      d="M581.6 539.8L569.4 539.8 568.9 527.5 581 527.5z"
                    />
                    <path
                      className="st36"
                      d="M598.3 539.8L586.1 539.8 585.4 527.5 597.5 527.5z"
                    />
                  </g>
                  <g>
                    <path
                      className="st36"
                      d="M615.1 539.8L602.9 539.8 602.1 527.5 614.2 527.5z"
                    />
                    <path
                      className="st36"
                      d="M631.7 539.8L619.5 539.8 618.5 527.5 630.6 527.5z"
                    />
                    <path
                      className="st36"
                      d="M648.3 539.8L636.1 539.8 635 527.5 647.1 527.5z"
                    />
                    <path
                      className="st36"
                      d="M664.9 539.8L652.7 539.8 651.5 527.5 663.6 527.5z"
                    />
                    <path
                      className="st36"
                      d="M681.5 539.8L669.3 539.8 667.9 527.5 680 527.5z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    className="st35"
                    d="M561.9 465.3L550.3 465.3 550 454.2 561.5 454.2z"
                  />
                  <path
                    className="st35"
                    d="M577.6 465.3L566.1 465.3 565.6 454.2 577.1 454.2z"
                  />
                  <path
                    className="st35"
                    d="M593.4 465.3L581.8 465.3 581.2 454.2 592.7 454.2z"
                  />
                  <path
                    className="st35"
                    d="M609.1 465.3L597.5 465.3 596.8 454.2 608.3 454.2z"
                  />
                  <path
                    className="st35"
                    d="M624.8 465.3L613.3 465.3 612.4 454.2 623.9 454.2z"
                  />
                  <path
                    className="st35"
                    d="M640.6 465.3L629 465.3 628 454.2 639.5 454.2z"
                  />
                  <path
                    className="st35"
                    d="M656.3 465.3L644.8 465.3 643.6 454.2 655.1 454.2z"
                  />
                  <path
                    className="st35"
                    d="M672 465.3L660.5 465.3 659.2 454.2 670.7 454.2z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M544.4 398.4L533.4 398.4 533.2 388.4 544.1 388.4z"
                  />
                  <path
                    className="st34"
                    d="M559.3 398.4L548.3 398.4 548 388.4 558.9 388.4z"
                  />
                  <path
                    className="st34"
                    d="M574.3 398.4L563.3 398.4 562.9 388.4 573.8 388.4z"
                  />
                  <path
                    className="st34"
                    d="M589.2 398.4L578.3 398.4 577.7 388.4 588.6 388.4z"
                  />
                  <path
                    className="st34"
                    d="M604.2 398.4L593.2 398.4 592.5 388.4 603.4 388.4z"
                  />
                  <path
                    className="st34"
                    d="M619.1 398.4L608.2 398.4 607.4 388.4 618.3 388.4z"
                  />
                  <path
                    className="st34"
                    d="M634.1 398.4L623.1 398.4 622.2 388.4 633.1 388.4z"
                  />
                  <path
                    className="st34"
                    d="M649 398.4L638.1 398.4 637.1 388.4 647.9 388.4z"
                  />
                  <path
                    className="st34"
                    d="M664 398.4L653 398.4 651.9 388.4 662.8 388.4z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M364 398.4L353 398.4 354.3 388.4 365.2 388.4z"
                  />
                  <path
                    className="st34"
                    d="M379 398.4L368 398.4 369.1 388.4 380 388.4z"
                  />
                  <path
                    className="st34"
                    d="M393.9 398.4L383 398.4 383.9 388.4 394.8 388.4z"
                  />
                  <path
                    className="st34"
                    d="M408.9 398.4L397.9 398.4 398.8 388.4 409.7 388.4z"
                  />
                  <path
                    className="st34"
                    d="M423.8 398.4L412.9 398.4 413.6 388.4 424.5 388.4z"
                  />
                  <path
                    className="st34"
                    d="M438.8 398.4L427.8 398.4 428.4 388.4 439.3 388.4z"
                  />
                  <path
                    className="st34"
                    d="M453.7 398.4L442.8 398.4 443.3 388.4 454.2 388.4z"
                  />
                  <path
                    className="st34"
                    d="M468.7 398.4L457.7 398.4 458.1 388.4 469 388.4z"
                  />
                  <path
                    className="st34"
                    d="M483.7 398.4L472.7 398.4 473 388.4 483.8 388.4z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M362.6 411L351.5 411 352.8 400.8 363.8 400.8z"
                  />
                  <path
                    className="st34"
                    d="M377.7 411L366.6 411 367.7 400.8 378.7 400.8z"
                  />
                  <path
                    className="st34"
                    d="M392.8 411L381.7 411 382.7 400.8 393.7 400.8z"
                  />
                  <path
                    className="st34"
                    d="M407.9 411L396.8 411 397.7 400.8 408.7 400.8z"
                  />
                  <path
                    className="st34"
                    d="M423 411L411.9 411 412.7 400.8 423.7 400.8z"
                  />
                  <path
                    className="st34"
                    d="M438.1 411L427 411 427.7 400.8 438.7 400.8z"
                  />
                  <path
                    className="st34"
                    d="M453.2 411L442.1 411 442.6 400.8 453.6 400.8z"
                  />
                  <path
                    className="st34"
                    d="M468.3 411L457.2 411 457.6 400.8 468.6 400.8z"
                  />
                  <path
                    className="st34"
                    d="M483.4 411L472.3 411 472.6 400.8 483.6 400.8z"
                  />
                </g>
                <g>
                  <path
                    className="st37"
                    d="M361.2 423.7L350 423.7 351.2 413.3 362.3 413.3z"
                  />
                  <path
                    className="st37"
                    d="M376.4 423.7L365.2 423.7 366.4 413.3 377.5 413.3z"
                  />
                  <path
                    className="st37"
                    d="M391.7 423.7L380.5 423.7 381.5 413.3 392.6 413.3z"
                  />
                  <path
                    className="st37"
                    d="M406.9 423.7L395.7 423.7 396.6 413.3 407.7 413.3z"
                  />
                  <path
                    className="st34"
                    d="M422.2 423.7L411 423.7 411.7 413.3 422.9 413.3z"
                  />
                  <path
                    className="st34"
                    d="M437.4 423.7L426.2 423.7 426.9 413.3 438 413.3z"
                  />
                  <path
                    className="st34"
                    d="M452.7 423.7L441.5 423.7 442 413.3 453.1 413.3z"
                  />
                  <path
                    className="st34"
                    d="M467.9 423.7L456.7 423.7 457.1 413.3 468.2 413.3z"
                  />
                  <path
                    className="st34"
                    d="M483.2 423.7L472 423.7 472.3 413.3 483.4 413.3z"
                  />
                </g>
                <g>
                  <path
                    className="st37"
                    d="M359.6 437.4L348.3 437.4 349.6 426.8 360.8 426.8z"
                  />
                  <path
                    className="st37"
                    d="M375 437.4L363.7 437.4 364.9 426.8 376.1 426.8z"
                  />
                  <path
                    className="st37"
                    d="M390.4 437.4L379.1 437.4 380.2 426.8 391.4 426.8z"
                  />
                  <path
                    className="st37"
                    d="M405.8 437.4L394.5 437.4 395.5 426.8 406.7 426.8z"
                  />
                  <path
                    className="st34"
                    d="M421.3 437.4L409.9 437.4 410.7 426.8 422 426.8z"
                  />
                  <path
                    className="st34"
                    d="M436.7 437.4L425.4 437.4 426 426.8 437.2 426.8z"
                  />
                  <path
                    className="st34"
                    d="M452.1 437.4L440.8 437.4 441.3 426.8 452.5 426.8z"
                  />
                  <path
                    className="st34"
                    d="M467.5 437.4L456.2 437.4 456.6 426.8 467.8 426.8z"
                  />
                  <path
                    className="st34"
                    d="M482.9 437.4L471.6 437.4 471.9 426.8 483.1 426.8z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M544.7 411.2L533.6 411.2 533.4 401 544.4 401z"
                  />
                  <path
                    className="st34"
                    d="M559.8 411.2L548.7 411.2 548.4 401 559.4 401z"
                  />
                  <path
                    className="st34"
                    d="M574.9 411.2L563.8 411.2 563.4 401 574.4 401z"
                  />
                  <path
                    className="st34"
                    d="M590 411.2L579 411.2 578.4 401 589.4 401z"
                  />
                  <path
                    className="st34"
                    d="M605.1 411.2L594.1 411.2 593.4 401 604.4 401z"
                  />
                  <path
                    className="st34"
                    d="M620.2 411.2L609.2 411.2 608.4 401 619.4 401z"
                  />
                  <path
                    className="st34"
                    d="M635.3 411.2L624.3 411.2 623.3 401 634.3 401z"
                  />
                  <path
                    className="st34"
                    d="M650.5 411.2L639.4 411.2 638.3 401 649.3 401z"
                  />
                  <path
                    className="st34"
                    d="M665.6 411.2L654.5 411.2 653.3 401 664.3 401z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M545.1 424.1L533.9 424.1 533.7 413.7 544.8 413.7z"
                  />
                  <path
                    className="st34"
                    d="M560.4 424.1L549.2 424.1 548.8 413.7 559.9 413.7z"
                  />
                  <path
                    className="st34"
                    d="M575.6 424.1L564.4 424.1 564 413.7 575.1 413.7z"
                  />
                  <path
                    className="st34"
                    d="M590.9 424.1L579.7 424.1 579.1 413.7 590.2 413.7z"
                  />
                  <path
                    className="st34"
                    d="M606.1 424.1L594.9 424.1 594.2 413.7 605.3 413.7z"
                  />
                  <path
                    className="st35"
                    d="M621.4 424.1L610.2 424.1 609.4 413.7 620.5 413.7z"
                  />
                  <path
                    className="st35"
                    d="M636.6 424.1L625.4 424.1 624.5 413.7 635.6 413.7z"
                  />
                  <path
                    className="st35"
                    d="M651.9 424.1L640.7 424.1 639.6 413.7 650.7 413.7z"
                  />
                  <path
                    className="st35"
                    d="M667.1 424.1L655.9 424.1 654.8 413.7 665.9 413.7z"
                  />
                </g>
                <g>
                  <path
                    className="st34"
                    d="M545.5 437.6L534.2 437.6 534 427 545.2 427z"
                  />
                  <path
                    className="st34"
                    d="M560.9 437.6L549.6 437.6 549.2 427 560.5 427z"
                  />
                  <path
                    className="st34"
                    d="M576.3 437.6L565 437.6 564.5 427 575.8 427z"
                  />
                  <path
                    className="st34"
                    d="M591.7 437.6L580.4 437.6 579.8 427 591 427z"
                  />
                  <path
                    className="st34"
                    d="M607.1 437.6L595.8 437.6 595.1 427 606.3 427z"
                  />
                  <path
                    className="st38"
                    d="M622.5 437.6L611.2 437.6 610.4 427 621.6 427z"
                  />
                  <path
                    className="st38"
                    d="M638 437.6L626.6 437.6 625.7 427 636.9 427z"
                  />
                  <path
                    className="st38"
                    d="M653.4 437.6L642 437.6 641 427 652.2 427z"
                  />
                  <path
                    className="st38"
                    d="M668.8 437.6L657.5 437.6 656.3 427 667.5 427z"
                  />
                </g>
                <path d="M498.4 385.4L487.5 385.4 487.7 375.6 498.5 375.6z" />
                <path d="M529.6 373.2L518.9 373.2 518.8 363.5 529.5 363.5z" />
                <path d="M529.8 385.6L519 385.6 518.9 375.8 529.7 375.8z" />
                <path d="M530.1 398.2L519.1 398.2 519 388.2 529.9 388.2z" />
                <path d="M530.3 411.2L519.2 411.2 519.1 401 530.1 401z" />
                <path d="M530.5 424.3L519.3 424.3 519.2 413.9 530.3 413.9z" />
                <path d="M530.7 437.8L519.4 437.8 519.3 427.2 530.5 427.2z" />
                <path d="M498.4 398.2L487.4 398.2 487.6 388.2 498.5 388.2z" />
                <path d="M498.3 411.2L487.2 411.2 487.4 401 498.4 401z" />
                <path d="M498.2 424.3L487 424.3 487.2 413.9 498.3 413.9z" />
                <path d="M498.1 437.8L486.8 437.8 486.9 427.2 498.2 427.2z" />
                <path d="M544.3 373.2L533.5 373.2 533.3 363.5 544 363.5z" />
                <path d="M558.9 373.2L548.2 373.2 547.9 363.5 558.6 363.5z" />
                <path d="M573.6 373.2L562.8 373.2 562.4 363.5 573.1 363.5z" />
                <path d="M588.3 373.2L577.5 373.2 577 363.5 587.6 363.5z" />
                <path d="M602.9 373.2L592.2 373.2 591.5 363.5 602.2 363.5z" />
                <path d="M617.6 373.2L606.8 373.2 606.1 363.5 616.7 363.5z" />
                <path d="M632.2 373.2L621.5 373.2 620.6 363.5 631.3 363.5z" />
                <path d="M646.9 373.2L636.1 373.2 635.1 363.5 645.8 363.5z" />
                <path d="M661.5 373.2L650.8 373.2 649.7 363.5 660.4 363.5z" />
                <path
                  className="st33"
                  d="M517 439.9L499.9 439.9 500.4 361 516.5 361z"
                />
                <path
                  className="st33"
                  d="M468.5 465.2L469.3 439.8 547.4 439.8 548.2 465.2z"
                />
                <g>
                  <path d="M508.7 433.9c.2.1.4.3.6.5.1.2.2.5.2.9v.5h1.4v1.3h-4.5v-1.8c0-.5.1-.9.4-1.2.3-.3.7-.4 1.1-.4.3 0 .6.1.8.2zm-.8 1.2c-.3 0-.4.1-.4.4v.4h.8v-.4c.1-.3-.1-.4-.4-.4zM506.4 432h4.5v1.3h-4.5V432zM510.6 431c-.3.3-.6.5-1.1.5v-1.4c.3 0 .4-.1.4-.3 0-.1 0-.1-.1-.2 0 0-.1-.1-.2-.1s-.2.1-.3.2c-.1.1-.1.3-.2.5-.1.3-.2.5-.3.7-.1.2-.2.3-.4.5-.2.1-.4.2-.7.2-.3 0-.5-.1-.8-.2-.2-.1-.4-.3-.5-.6-.1-.2-.2-.5-.2-.8 0-.5.1-.9.4-1.2.3-.3.6-.5 1.1-.5v1.4c-.1 0-.2 0-.3.1-.1.1-.1.1-.1.2s0 .1.1.1c0 0 .1.1.2.1s.2-.1.3-.2c.1-.1.1-.3.2-.5.1-.3.2-.5.3-.7.1-.2.2-.3.4-.4.2-.1.4-.2.7-.2.3 0 .5.1.7.2.2.1.4.3.5.5.1.2.2.5.2.9.1.5-.1.9-.3 1.2zM506.4 424.5h1.1v1.1h3.4v1.3h-3.4v1.1h-1.1v-3.5zM510.2 421.5v1.4l.7.2v1.4l-4.5-1.5v-1.5l4.5-1.5v1.4l-.7.1zm-1 .3l-1.3.4 1.3.4v-.8zM510.6 418.3c-.3.3-.6.5-1.1.5v-1.4c.3 0 .4-.1.4-.3 0-.1 0-.1-.1-.2 0 0-.1-.1-.2-.1s-.2.1-.3.2c-.1.1-.1.3-.2.5-.1.3-.2.5-.3.7-.1.2-.2.3-.4.4-.2.1-.4.2-.7.2-.3 0-.5-.1-.7-.2-.2-.1-.4-.3-.5-.6-.1-.2-.2-.5-.2-.8 0-.5.1-.9.4-1.2.3-.3.6-.4 1.1-.5v1.4c-.1 0-.2 0-.3.1-.1.1-.1.1-.1.2s0 .1.1.1c0 0 .1.1.2.1s.2-.1.2-.2c.1-.1.1-.3.2-.5.1-.3.2-.5.3-.6.1-.2.2-.3.4-.4.2-.1.4-.2.7-.2.3 0 .5.1.7.2.2.1.4.3.5.5.1.2.2.5.2.8 0 .5-.1.9-.3 1.3zM510.6 414.1c-.2.3-.5.6-.8.8-.3.2-.7.3-1.2.3-.4 0-.8-.1-1.2-.3-.3-.2-.6-.4-.8-.8-.2-.3-.3-.7-.3-1.1 0-.4.1-.7.3-1.1.2-.3.5-.6.8-.8.3-.2.7-.3 1.2-.3.4 0 .8.1 1.2.3.3.2.6.4.8.8.2.3.3.7.3 1 0 .5-.1.9-.3 1.2zm-1.2-1.6c-.2-.1-.4-.2-.7-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.6s.1.5.3.6c.2.1.4.2.7.2.3 0 .5-.1.7-.2.2-.1.3-.3.3-.6-.1-.3-.2-.5-.3-.6zM510.9 406.6v1.3l-2.2 1.3h2.2v1.3h-4.5v-1.3l2.3-1.3h-2.3v-1.3h4.5zM510.6 405.2c-.2.3-.5.6-.8.8-.3.2-.7.3-1.2.3-.4 0-.8-.1-1.2-.3-.3-.2-.6-.4-.8-.8-.2-.3-.3-.7-.3-1 0-.4.1-.7.3-1 .2-.3.5-.6.8-.7.3-.2.7-.3 1.2-.3.4 0 .8.1 1.2.3.3.2.6.4.8.7.2.3.3.7.3 1 0 .3-.1.6-.3 1zm-1.3-1.7c-.2-.1-.4-.2-.7-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.6s.1.4.3.6c.2.1.4.2.7.2.3 0 .5-.1.7-.2.2-.1.3-.3.3-.6 0-.2-.1-.4-.3-.6zM510.9 399.6l-1.6.7h1.6v1.3h-4.4v-1.9c0-.3.1-.6.2-.8.1-.2.3-.4.5-.5.2-.1.5-.2.7-.2.3 0 .6.1.8.2.2.1.4.4.5.6l1.7-.9v1.5zm-2.5.8v-.5c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3v.5h.8zM510.2 395.3v1.3l.7.2v1.3l-4.4-1.5v-1.4l4.4-1.4v1.3l-.7.2zm-1.1.3l-1.2.4 1.2.4v-.8zM507.5 392.5c-.3-.2-.6-.4-.8-.7-.2-.3-.3-.6-.3-1 0-.3.1-.6.2-.9.1-.3.3-.5.6-.7.3-.2.6-.3.9-.3v1.3c-.1.1-.3.1-.3.3-.1.1-.1.2-.1.4s.1.4.3.5c.2.1.4.2.7.2.3 0 .5-.1.7-.2.2-.1.3-.3.3-.5 0-.1 0-.3-.1-.4l-.3-.3v-1.3l.9.3c.3.2.5.4.6.7.1.3.2.6.2.9 0 .4-.1.7-.3 1-.2.3-.5.5-.8.7-.3.2-.7.2-1.2.2s-.9-.1-1.2-.2zM510.2 385.9v1.3l.7.2v1.3l-4.4-1.4v-1.4l4.4-1.4v1.3l-.7.1zm-1.1.3l-1.2.4 1.2.4v-.8zM509 381c.2-.1.4-.2.7-.2.4 0 .7.1.9.3.2.2.3.5.3 1v2h-4.4v-2c0-.4.1-.7.3-.9.2-.2.5-.3.8-.3.3 0 .5.1.6.2.2.1.3.3.3.5.2-.3.3-.5.5-.6zm-.8 1.9v-.5c0-.1 0-.2-.1-.2 0-.1-.1-.1-.2-.1s-.2 0-.2.1c-.1.1-.1.1-.1.2v.5h.6zm1.5-.8c0-.1-.1-.1-.2-.1-.2 0-.3.1-.3.3v.6h.6v-.6c-.1 0-.1-.1-.1-.2zM510.2 377.9v1.3l.7.2v1.3l-4.4-1.4v-1.4l4.3-1.4v1.3l-.6.1zm-1.1.3l-1.2.3 1.2.3v-.6zM509.8 375v-1.2h1v2.4h-4.3V375h3.3zM509.8 372.3v-1.2h1v2.3h-4.3v-1.2h3.3zM510.6 369.9c-.2.3-.5.5-.8.7-.3.2-.7.3-1.1.3-.4 0-.8-.1-1.1-.3-.3-.2-.6-.4-.8-.7-.2-.3-.3-.6-.3-1s.1-.7.3-1c.2-.3.5-.5.8-.7.3-.2.7-.3 1.1-.3.4 0 .8.1 1.1.3.3.2.6.4.8.7.2.3.3.6.3 1-.1.4-.1.7-.3 1zm-1.3-1.5c-.2-.1-.4-.2-.7-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.5s.1.4.3.6c.2.1.4.2.7.2.3 0 .5-.1.7-.2.2-.1.3-.3.3-.6 0-.2-.1-.4-.3-.5zM510.5 366.2c-.2.3-.6.5-1.1.5v-1.3c.2 0 .4-.1.4-.3 0-.1 0-.1-.1-.2 0 0-.1-.1-.2-.1s-.2 0-.2.1c-.1.1-.1.2-.2.4l-.3.6c-.1.2-.2.3-.4.4-.2.1-.4.2-.7.2-.3 0-.5-.1-.7-.2-.2-.1-.3-.3-.4-.5-.1-.2-.2-.5-.2-.7 0-.5.1-.8.4-1.1.2-.3.6-.4 1-.4v1.3c-.1 0-.2 0-.3.1-.1.1-.1.1-.1.2s0 .1.1.1h.2c.1 0 .2 0 .2-.1.1-.1.1-.2.2-.4l.3-.6c.1-.2.2-.3.4-.4.2-.1.4-.2.6-.2.3 0 .5.1.7.2.2.1.4.3.5.5.1.2.2.5.2.8 0 .4-.1.8-.3 1.1z" />
                </g>
                <g>
                  <path d="M483.6 448.4c-.2.3-.4.5-.7.6-.3.2-.7.2-1.1.2h-.7v1.6h-1.7l.1-5h2.3c.7 0 1.1.2 1.5.5.3.3.5.7.5 1.2.1.3 0 .6-.2.9zm-1.4-.9c0-.3-.2-.5-.5-.5h-.5v.9h.5c.3.1.5-.1.5-.4zM486.1 445.8l-.1 5h-1.7l.1-5h1.7zM487.3 450.4c-.4-.3-.6-.7-.7-1.2h1.8c0 .3.2.4.4.4.1 0 .2 0 .2-.1.1 0 .1-.1.1-.2s-.1-.2-.2-.3c-.1-.1-.3-.2-.6-.3-.3-.1-.6-.2-.8-.3-.2-.1-.4-.3-.6-.5-.2-.2-.2-.5-.2-.8 0-.3.1-.6.3-.8.2-.2.4-.4.7-.5.3-.1.7-.2 1-.2.7 0 1.2.1 1.5.4.4.3.6.7.6 1.2H489c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-.1 0-.2.1 0 0-.1.1-.1.2s.1.2.2.3c.1.1.3.2.6.3.3.1.6.2.8.3.2.1.4.3.6.5.2.2.2.4.2.7 0 .3-.1.6-.3.8-.2.2-.4.4-.7.6-.3.1-.7.2-1.1.2-.4.1-.9-.1-1.3-.4zM495.7 445.8v1.2h-1.4v3.8h-1.7V447h-1.4v-1.2h4.5zM499.6 450.1h-1.8l-.3.8h-1.8l2-5h1.9l1.9 5h-1.8l-.1-.8zm-.4-1.2l-.5-1.4-.5 1.4h1zM503.8 450.4c-.4-.3-.6-.7-.7-1.2h1.8c0 .3.2.4.4.4.1 0 .2 0 .2-.1.1 0 .1-.1.1-.2s-.1-.2-.2-.3c-.1-.1-.3-.2-.6-.3-.3-.1-.6-.2-.8-.3-.2-.1-.4-.3-.6-.5-.2-.2-.2-.5-.2-.8 0-.3.1-.6.3-.8.2-.2.4-.4.7-.5.3-.1.7-.2 1-.2.7 0 1.2.1 1.6.4.4.3.6.7.6 1.2h-1.8c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-.1 0-.2.1 0 0-.1.1-.1.2s.1.2.2.3c.1.1.3.2.6.3.3.1.6.2.8.3.2.1.4.3.6.5.2.2.2.4.2.7 0 .3-.1.6-.2.8-.2.2-.4.4-.7.6-.3.1-.7.2-1.1.2-.6.1-1.1-.1-1.5-.4zM509.2 450.5c-.4-.2-.8-.5-1-.9-.2-.4-.4-.8-.4-1.3s.1-.9.4-1.3c.2-.4.6-.7 1-.9.4-.2.9-.3 1.4-.3.5 0 1 .1 1.4.3.4.2.7.5 1 .9.2.4.4.8.4 1.3s-.1.9-.4 1.3c-.2.4-.6.7-1 .9-.4.2-.9.3-1.4.3-.5.1-1-.1-1.4-.3zm2.1-1.4c.2-.2.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.4.3.8.3s.6-.1.8-.3zM519 450.8h-1.7l-1.8-2.5v2.5h-1.7v-5h1.7l1.8 2.5v-2.5h1.7v5zM521 450.5c-.4-.2-.8-.5-1-.9-.2-.4-.4-.8-.4-1.3s.1-.9.4-1.3c.2-.4.6-.7 1-.9.4-.2.9-.3 1.4-.3s1 .1 1.4.3c.4.2.8.5 1 .9.2.4.4.8.4 1.3s-.1.9-.3 1.3c-.2.4-.6.7-1 .9-.4.2-.9.3-1.4.3-.6.1-1.1-.1-1.5-.3zm2.1-1.4c.2-.2.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.4.3.8.3s.7-.1.8-.3zM528.4 450.8l-1-1.8v1.8h-1.7l-.1-5h2.5c.4 0 .8.1 1.1.2.3.1.5.3.7.6.2.2.2.5.2.8 0 .3-.1.6-.3.9-.2.3-.5.4-.8.6l1.2 1.9h-1.8zm-1-2.8h.7c.2 0 .3 0 .4-.1.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.2-.1-.4-.1h-.7v.8zM534.2 450.1h-1.8l-.3.8h-1.8l1.9-5h1.9l2 5h-1.8l-.1-.8zm-.4-1.2l-.5-1.4-.5 1.4h1zM488.4 455.5c.2-.4.5-.7.9-.9.4-.2.9-.3 1.4-.3.5 0 .9.1 1.2.2.4.2.7.4.9.7.2.3.4.6.4 1h-1.8c-.1-.2-.2-.3-.3-.4-.1-.1-.3-.1-.5-.1-.3 0-.5.1-.7.3-.2.2-.3.5-.3.8 0 .3.1.6.2.8.2.2.4.3.7.3.2 0 .4 0 .5-.1s.3-.2.4-.4h1.8c-.1.4-.2.8-.5 1.1-.2.3-.5.5-.9.7-.4.2-.8.2-1.3.2s-1-.1-1.4-.3c-.4-.2-.7-.5-.9-.9-.2-.4-.3-.8-.3-1.3.1-.6.2-1 .5-1.4zM497.3 458.6h-1.8l-.3.8h-1.8l2-5.1h1.9l1.9 5.1h-1.8l-.1-.8zm-.4-1.2l-.5-1.4-.5 1.4h1zM504.1 457.2c.2.2.3.5.3.8 0 .4-.2.8-.5 1-.3.2-.8.4-1.3.4h-2.8v-5.1h2.7c.5 0 1 .1 1.3.3.3.2.5.5.5 1 0 .3-.1.5-.2.7-.2.2-.4.3-.7.4.3.1.5.3.7.5zm-2.7-.9h.7c.2 0 .3 0 .3-.1.1-.1.1-.1.1-.3 0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1h-.7v.8zm1.1 1.7c.1-.1.1-.1.1-.3 0-.2-.1-.4-.4-.4h-.8v.7h.8c.1.1.2.1.3 0zM508.4 458.6h-1.8l-.3.8h-1.8l2-5.1h1.9l2 5.1h-1.8l-.2-.8zm-.4-1.2l-.5-1.4-.5 1.4h1zM512.5 458.2h1.6v1.2h-3.3v-5.1h1.7v3.9zM516.3 458.2h1.6v1.2h-3.3v-5.1h1.7v3.9zM519.7 459.1c-.4-.2-.8-.5-1-.9-.3-.4-.4-.8-.4-1.3s.1-.9.4-1.3c.2-.4.6-.7 1-.9.4-.2.9-.3 1.4-.3.5 0 1 .1 1.4.3.4.2.8.5 1 .9.2.4.4.8.4 1.3s-.1.9-.4 1.3c-.2.4-.6.7-1 .9-.4.2-.9.3-1.4.3-.5 0-1-.1-1.4-.3zm2.2-1.5c.2-.2.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8 0 .3.1.6.3.8.2.2.4.3.8.3.3 0 .6-.1.8-.3zM525 459c-.4-.3-.7-.7-.7-1.2h1.8c0 .3.2.4.4.4.1 0 .2 0 .2-.1.1 0 .1-.1.1-.2s-.1-.2-.2-.3c-.1-.1-.4-.2-.6-.3l-.9-.3c-.2-.1-.4-.3-.6-.5-.2-.2-.2-.5-.2-.8 0-.3.1-.6.3-.8.2-.2.4-.4.7-.5.3-.1.7-.2 1-.2.7 0 1.2.1 1.6.4.4.3.6.7.6 1.2h-1.8c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-.1 0-.2.1 0 0-.1.1-.1.2s.1.2.2.3c.1.1.3.2.6.3.3.1.6.2.8.3.2.1.4.3.6.5.2.2.2.4.3.7 0 .3-.1.6-.2.8-.2.2-.4.4-.7.6-.3.1-.7.2-1.1.2-.6 0-1.1-.1-1.5-.4z" />
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