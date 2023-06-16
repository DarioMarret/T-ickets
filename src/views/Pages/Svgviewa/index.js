import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
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
        {/*<ModalFirma/>*/}
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
                       
                        <svg id="Capa_1" width="90%" height="90%"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.28 453.54">
                            
                            <path className="cls-1" 
                                d="M378.3,448.38,74.92,445.2C58.84,445,40.71,418,46.66,403.06L204,36.79a22.91,22.91,0,0,1,21.52-14.43L524.37,13c16.08.16,31.51,29,25.56,43.92L399.82,434A22.91,22.91,0,0,1,378.3,448.38Z" />
                            <path className="cls-2"
                                d="M371.74,435.71,68.36,432.53a22.9,22.9,0,0,1-21-31.37l150.11-377A22.9,22.9,0,0,1,219,9.69l303.38,3.17a22.9,22.9,0,0,1,21,31.37l-150.11,377A22.91,22.91,0,0,1,371.74,435.71Z" />
                            <path className="cls-3"
                                d="M333.12,430.26l-226.59-2.39a5,5,0,0,1-4.5-7.11l25.28-55.17a5,5,0,0,1,4.61-2.93l226.59,2.4a5,5,0,0,1,4.51,7.11l-25.28,55.17A5,5,0,0,1,333.12,430.26Z" />
                            <path className="none"
                                d="M331.22,426.71l-226.47-2.4a5.08,5.08,0,0,1-4.56-7.19l25.23-55.05a5.06,5.06,0,0,1,4.67-3l226.46,2.39a5.07,5.07,0,0,1,4.56,7.19l-25.23,55.06A5.07,5.07,0,0,1,331.22,426.71Z" />
                            <path className="cls-3"
                                d="M198.76,239.86l-22.6-.23a3,3,0,0,1-2.77-4.15L181.16,216a3,3,0,0,1,2.84-1.9l22.59.23a3,3,0,0,1,2.78,4.15L201.6,238A3,3,0,0,1,198.76,239.86Z" />
                            <path className="cls-3"
                                d="M242.12,240.32l-22.6-.24a3,3,0,0,1-2.77-4.14l7.77-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14L245,238.41A3,3,0,0,1,242.12,240.32Z" />
                            <path className="cls-3"
                                d="M285.88,240.77l-22.6-.23a3,3,0,0,1-2.77-4.14l7.77-19.54a3,3,0,0,1,2.84-1.9l22.59.24a3,3,0,0,1,2.78,4.14l-7.77,19.53A3,3,0,0,1,285.88,240.77Z" />
                            <path className="cls-3"
                                d="M329,241.23l-22.6-.24a3,3,0,0,1-2.77-4.14l7.77-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.77,19.53A3,3,0,0,1,329,241.23Z" />
                            <path className="cls-3"
                                d="M372.3,241.68l-22.6-.24a3,3,0,0,1-2.77-4.14l7.77-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.77,19.53A3,3,0,0,1,372.3,241.68Z" />
                            <path className="cls-3"
                                d="M415.46,242.13l-22.59-.24a3,3,0,0,1-2.78-4.14l7.77-19.53a3,3,0,0,1,2.84-1.91l22.6.24a3,3,0,0,1,2.77,4.14l-7.77,19.54A3,3,0,0,1,415.46,242.13Z" />
                            <path className="cls-3"
                                d="M184.32,275.43l-22.67-.24a3,3,0,0,1-2.74-4.09l7.8-19.61a3,3,0,0,1,2.81-1.88l22.67.24a3,3,0,0,1,2.74,4.08l-7.8,19.62A3,3,0,0,1,184.32,275.43Z" />
                            <path className="cls-3"
                                d="M227.68,275.88,205,275.64a3,3,0,0,1-2.74-4.09l7.8-19.61a3,3,0,0,1,2.81-1.88l22.67.24a3,3,0,0,1,2.74,4.09L230.49,274A3,3,0,0,1,227.68,275.88Z" />
                            <path className="cls-3"
                                d="M271.44,276.34l-22.67-.24A3,3,0,0,1,246,272l7.8-19.61a3,3,0,0,1,2.81-1.88l22.67.24a3,3,0,0,1,2.74,4.09l-7.8,19.61A3,3,0,0,1,271.44,276.34Z" />
                            <path className="cls-3"
                                d="M314.6,276.79l-22.67-.24a3,3,0,0,1-2.74-4.09l7.8-19.61A3,3,0,0,1,299.8,251l22.67.24a3,3,0,0,1,2.74,4.09l-7.8,19.61A3,3,0,0,1,314.6,276.79Z" />
                            <path className="cls-3"
                                d="M357.86,277.24,335.19,277a3,3,0,0,1-2.74-4.08l7.8-19.61a3,3,0,0,1,2.81-1.88l22.67.23a3,3,0,0,1,2.74,4.09l-7.8,19.61A3,3,0,0,1,357.86,277.24Z" />
                            <path className="cls-3"
                                d="M401,277.69l-22.67-.23a3,3,0,0,1-2.74-4.09l7.8-19.61a3,3,0,0,1,2.81-1.88l22.67.23a3,3,0,0,1,2.75,4.09l-7.81,19.61A3,3,0,0,1,401,277.69Z" />
                            <path className="cls-3"
                                d="M192.35,311.22,169.81,311a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.23a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,192.35,311.22Z" />
                            <path className="cls-3"
                                d="M235.71,311.68l-22.54-.24a3,3,0,0,1-2.8-4.17l7.76-19.49a3,3,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.49A3,3,0,0,1,235.71,311.68Z" />
                            <path className="cls-3"
                                d="M279.47,312.14l-22.54-.24a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.49A3,3,0,0,1,279.47,312.14Z" />
                            <path className="cls-3"
                                d="M322.63,312.59l-22.54-.24a3,3,0,0,1-2.8-4.17l7.76-19.49a3,3,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.49A3,3,0,0,1,322.63,312.59Z" />
                            <path className="cls-3"
                                d="M365.89,313l-22.54-.24a3,3,0,0,1-2.8-4.17l7.76-19.48a3,3,0,0,1,2.86-1.93l22.54.24a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,365.89,313Z" />
                            <path className="cls-3"
                                d="M178.09,346.17l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.05,3.05,0,0,1,2.87-1.92l22.54.23a3.05,3.05,0,0,1,2.8,4.18L181,344.25A3.06,3.06,0,0,1,178.09,346.17Z" />
                            <path className="cls-3"
                                d="M221.45,346.63l-22.54-.24a3,3,0,0,1-2.8-4.18l7.75-19.48a3.07,3.07,0,0,1,2.87-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.48A3,3,0,0,1,221.45,346.63Z" />
                            <path className="cls-3"
                                d="M265.21,347.08l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.05,3.05,0,0,1,2.87-1.92l22.54.23a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,265.21,347.08Z" />
                            <path className="cls-3"
                                d="M308.4,347.54l-22.66-.24a3,3,0,0,1-2.74-4.1l7.8-19.6a3,3,0,0,1,2.81-1.88l22.66.24a3,3,0,0,1,2.75,4.09l-7.81,19.6A3,3,0,0,1,308.4,347.54Z" />
                            <path className="cls-3"
                                d="M351.66,348,329,347.75a3,3,0,0,1-2.74-4.1l7.8-19.59a3,3,0,0,1,2.81-1.89l22.66.24a3,3,0,0,1,2.75,4.1l-7.8,19.59A3,3,0,0,1,351.66,348Z" />
                            <path className="cls-3"
                                d="M245.18,123.38l-22.61-.24A3,3,0,0,1,219.8,119l7.79-19.56a3,3,0,0,1,2.83-1.9L253,97.8a3,3,0,0,1,2.77,4.13L248,121.48A3,3,0,0,1,245.18,123.38Z" />
                            <path className="cls-3"
                                d="M288.54,123.83l-22.61-.23a3,3,0,0,1-2.77-4.13L271,99.92a3,3,0,0,1,2.83-1.9l22.61.23a3,3,0,0,1,2.77,4.13l-7.79,19.56A3,3,0,0,1,288.54,123.83Z" />
                            <path className="cls-3"
                                d="M332.3,124.29l-22.61-.23a3,3,0,0,1-2.77-4.13l7.79-19.56a3,3,0,0,1,2.83-1.89l22.61.23a3,3,0,0,1,2.77,4.13l-7.79,19.55A3,3,0,0,1,332.3,124.29Z" />
                            <path className="cls-3"
                                d="M375.46,124.74l-22.61-.23a3,3,0,0,1-2.77-4.13l7.79-19.55a3,3,0,0,1,2.83-1.9l22.61.23a3,3,0,0,1,2.77,4.13l-7.79,19.56A3,3,0,0,1,375.46,124.74Z" />
                            <path className="cls-3"
                                d="M418.72,125.2,396.11,125a3,3,0,0,1-2.77-4.13l7.79-19.55a3,3,0,0,1,2.83-1.9l22.61.24a3,3,0,0,1,2.77,4.12l-7.79,19.56A3,3,0,0,1,418.72,125.2Z" />
                            <path className="cls-3"
                                d="M461.88,125.65l-22.61-.24a3,3,0,0,1-2.77-4.12l7.79-19.56a3,3,0,0,1,2.83-1.9l22.61.24a3,3,0,0,1,2.77,4.12l-7.79,19.56A3,3,0,0,1,461.88,125.65Z" />
                            <path className="cls-3"
                                d="M230.7,158.94l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.23a3.05,3.05,0,0,1,2.8,4.18L233.56,157A3,3,0,0,1,230.7,158.94Z" />
                            <path className="cls-3"
                                d="M274.06,159.4l-22.54-.24a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.48A3,3,0,0,1,274.06,159.4Z" />
                            <path className="cls-3"
                                d="M317.82,159.85l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18L300.24,136A3,3,0,0,1,303.1,134l22.54.23a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,317.82,159.85Z" />
                            <path className="cls-3"
                                d="M361,160.31l-22.54-.24a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.48A3,3,0,0,1,361,160.31Z" />
                            <path className="cls-3"
                                d="M404.24,160.76l-22.54-.24a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.24a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,404.24,160.76Z" />
                            <path className="cls-3"
                                d="M447.4,161.21,424.86,161a3,3,0,0,1-2.8-4.17l7.76-19.48a3.05,3.05,0,0,1,2.86-1.93l22.54.24a3.05,3.05,0,0,1,2.8,4.18l-7.75,19.48A3.07,3.07,0,0,1,447.4,161.21Z" />
                            <path className="cls-3"
                                d="M238.86,194.74l-22.81-.24a2.92,2.92,0,0,1-2.69-4l7.86-19.73a2.91,2.91,0,0,1,2.75-1.84l22.8.23a2.93,2.93,0,0,1,2.69,4L241.6,192.9A2.92,2.92,0,0,1,238.86,194.74Z" />
                            <path className="cls-3"
                                d="M282.22,195.2,259.41,195a2.93,2.93,0,0,1-2.69-4l7.86-19.73a2.94,2.94,0,0,1,2.75-1.84l22.8.24a2.92,2.92,0,0,1,2.69,4L285,193.35A2.92,2.92,0,0,1,282.22,195.2Z" />
                            <path className="cls-3"
                                d="M326,195.65l-22.81-.23a2.93,2.93,0,0,1-2.69-4l7.86-19.73a2.92,2.92,0,0,1,2.75-1.84l22.8.24a2.92,2.92,0,0,1,2.69,4l-7.86,19.73A2.91,2.91,0,0,1,326,195.65Z" />
                            <path className="cls-3"
                                d="M369.14,196.11l-22.81-.24a2.93,2.93,0,0,1-2.69-4l7.86-19.73a2.94,2.94,0,0,1,2.75-1.84l22.8.24a2.92,2.92,0,0,1,2.69,4l-7.86,19.73A2.92,2.92,0,0,1,369.14,196.11Z" />
                            <path className="cls-3"
                                d="M412.4,196.56l-22.81-.24a2.92,2.92,0,0,1-2.69-4l7.86-19.74a2.94,2.94,0,0,1,2.75-1.84l22.81.24a2.92,2.92,0,0,1,2.68,4l-7.86,19.74A2.92,2.92,0,0,1,412.4,196.56Z" />
                            
                            
                            
                            <path className="cls-6"
                                d="M243.75,121.11l-22.62-.23a3,3,0,0,1-2.76-4.13l7.78-19.56A3,3,0,0,1,229,95.3l22.62.23a3,3,0,0,1,2.77,4.13l-7.79,19.56A3,3,0,0,1,243.75,121.11Z" />
                            <path className="cls-6"
                                d="M287.11,121.57l-22.62-.24a3,3,0,0,1-2.76-4.13l7.78-19.55a3,3,0,0,1,2.83-1.9L295,96a3,3,0,0,1,2.77,4.12l-7.79,19.56A3,3,0,0,1,287.11,121.57Z" />
                            <path className="cls-6"
                                d="M330.87,122l-22.62-.23a3,3,0,0,1-2.76-4.13l7.78-19.55a3,3,0,0,1,2.83-1.9l22.62.24a3,3,0,0,1,2.77,4.12l-7.79,19.56A3,3,0,0,1,330.87,122Z" />
                            <path className="cls-6"
                                d="M374,122.48l-22.62-.24a3,3,0,0,1-2.76-4.13l7.78-19.55a3,3,0,0,1,2.83-1.9l22.62.24a3,3,0,0,1,2.77,4.12l-7.79,19.56A3,3,0,0,1,374,122.48Z" />
                            <path className="cls-6"
                                d="M417.29,122.93l-22.62-.24a3,3,0,0,1-2.76-4.12L399.69,99a3,3,0,0,1,2.83-1.9l22.62.24a3,3,0,0,1,2.77,4.12L420.12,121A3,3,0,0,1,417.29,122.93Z" />
                            <path className="cls-6"
                                d="M460.45,123.38l-22.62-.24a3,3,0,0,1-2.76-4.12l7.78-19.56a3,3,0,0,1,2.83-1.9l22.62.24a3,3,0,0,1,2.77,4.13l-7.79,19.55A3,3,0,0,1,460.45,123.38Z" />
                            <path className="cls-6"
                                d="M229.26,156.68l-22.53-.24a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.07,3.07,0,0,1,2.87-1.92l22.53.24a3,3,0,0,1,2.81,4.17l-7.76,19.48A3.06,3.06,0,0,1,229.26,156.68Z" />
                            <path className="cls-6"
                                d="M272.62,157.13l-22.53-.24a3,3,0,0,1-2.8-4.17L255,133.24a3.06,3.06,0,0,1,2.87-1.93l22.53.24a3.05,3.05,0,0,1,2.81,4.18l-7.76,19.48A3.06,3.06,0,0,1,272.62,157.13Z" />
                            <path className="cls-6"
                                d="M316.38,157.59l-22.53-.24a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.07,3.07,0,0,1,2.87-1.92l22.53.24a3.05,3.05,0,0,1,2.81,4.18l-7.76,19.48A3.06,3.06,0,0,1,316.38,157.59Z" />
                            <path className="cls-6"
                                d="M359.54,158,337,157.8a3.05,3.05,0,0,1-2.8-4.18L342,134.14a3.07,3.07,0,0,1,2.87-1.92l22.53.24a3.05,3.05,0,0,1,2.81,4.18l-7.76,19.48A3.06,3.06,0,0,1,359.54,158Z" />
                            <path className="cls-6"
                                d="M402.81,158.49l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.05,3.05,0,0,1,2.87-1.92l22.53.23a3.05,3.05,0,0,1,2.81,4.18l-7.76,19.48A3.05,3.05,0,0,1,402.81,158.49Z" />
                            <path className="cls-6"
                                d="M446,158.94l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.75-19.48a3.05,3.05,0,0,1,2.87-1.92l22.53.23a3.06,3.06,0,0,1,2.81,4.18L448.83,157A3,3,0,0,1,446,158.94Z" />
                           
                           
                            <path className="none"
                                d="M237.42,192.47l-22.81-.23a2.93,2.93,0,0,1-2.68-4l7.86-19.73a2.91,2.91,0,0,1,2.74-1.84l22.81.24a2.92,2.92,0,0,1,2.68,4l-7.85,19.73A2.91,2.91,0,0,1,237.42,192.47Z" />
                            <path className="none"
                                d="M280.78,192.93,258,192.69a2.92,2.92,0,0,1-2.68-4L263.15,169a2.91,2.91,0,0,1,2.74-1.84l22.81.24a2.92,2.92,0,0,1,2.68,4l-7.85,19.74A2.94,2.94,0,0,1,280.78,192.93Z" />
                            <path className="none"
                                d="M324.54,193.39l-22.81-.24a2.92,2.92,0,0,1-2.68-4l7.86-19.74a2.91,2.91,0,0,1,2.74-1.84l22.81.24a2.92,2.92,0,0,1,2.68,4l-7.85,19.74A2.94,2.94,0,0,1,324.54,193.39Z" />
                            <path className="none"
                                d="M367.7,193.84l-22.81-.24a2.92,2.92,0,0,1-2.68-4l7.86-19.74a2.91,2.91,0,0,1,2.74-1.84l22.81.24a2.92,2.92,0,0,1,2.68,4L370.45,192A2.94,2.94,0,0,1,367.7,193.84Z" />
                            <path className="none"
                                d="M411,194.29l-22.81-.24a2.92,2.92,0,0,1-2.68-4l7.86-19.74a2.91,2.91,0,0,1,2.74-1.84l22.81.24a2.93,2.93,0,0,1,2.69,4l-7.86,19.74A2.94,2.94,0,0,1,411,194.29Z" />
                            



                            <path className="cls-5"
                                d="M197.37,237.21,174.78,237a3,3,0,0,1-2.78-4.14l7.78-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.78,19.53A3,3,0,0,1,197.37,237.21Z" />

                            <path className="cls-5"
                                d="M240.73,237.66l-22.59-.24a3,3,0,0,1-2.78-4.14l7.78-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.78,19.53A3,3,0,0,1,240.73,237.66Z" />
                            <path className="none"
                                d="M284.49,238.12l-22.59-.24a3,3,0,0,1-2.78-4.14l7.78-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.78,19.53A3,3,0,0,1,284.49,238.12Z" />
                            <path className="none"
                                d="M327.65,238.57l-22.59-.24a3,3,0,0,1-2.78-4.14l7.78-19.53a3,3,0,0,1,2.84-1.91l22.59.24a3,3,0,0,1,2.78,4.14l-7.78,19.53A3,3,0,0,1,327.65,238.57Z" />
                            <path className="none"
                                d="M370.91,239l-22.59-.24a3,3,0,0,1-2.78-4.14l7.78-19.53a3,3,0,0,1,2.84-1.9l22.59.23a3,3,0,0,1,2.78,4.14l-7.78,19.54A3,3,0,0,1,370.91,239Z" />
                            <path className="none"
                                d="M414.07,239.47l-22.59-.23a3,3,0,0,1-2.78-4.15l7.78-19.53a3,3,0,0,1,2.84-1.9l22.59.23a3,3,0,0,1,2.78,4.15l-7.78,19.53A3,3,0,0,1,414.07,239.47Z" />
                            <path className="none"
                                d="M182.94,272.77l-22.68-.24a3,3,0,0,1-2.74-4.09l7.81-19.61a3,3,0,0,1,2.8-1.88l22.68.24a3,3,0,0,1,2.74,4.09l-7.81,19.61A3,3,0,0,1,182.94,272.77Z" />
                            <path className="none"
                                d="M226.3,273.22,203.62,273a3,3,0,0,1-2.74-4.08l7.81-19.61a3,3,0,0,1,2.8-1.88l22.68.23a3,3,0,0,1,2.74,4.09l-7.81,19.61A3,3,0,0,1,226.3,273.22Z" />
                            <path className="none"
                                d="M270.06,273.68l-22.68-.24a3,3,0,0,1-2.74-4.08l7.81-19.62a3,3,0,0,1,2.8-1.88l22.68.24a3,3,0,0,1,2.74,4.09l-7.81,19.61A3,3,0,0,1,270.06,273.68Z" />
                            <path className="none"
                                d="M313.22,274.13l-22.68-.24a3,3,0,0,1-2.74-4.08l7.81-19.61a3,3,0,0,1,2.8-1.88l22.68.23a3,3,0,0,1,2.74,4.09L316,272.25A3,3,0,0,1,313.22,274.13Z" />
                            <path className="none"
                                d="M356.48,274.58l-22.67-.23a3,3,0,0,1-2.75-4.09l7.81-19.61a3,3,0,0,1,2.81-1.88l22.67.24a3,3,0,0,1,2.74,4.08l-7.81,19.61A3,3,0,0,1,356.48,274.58Z" />
                            <path className="none"
                                d="M399.64,275,377,274.8a3,3,0,0,1-2.75-4.09L382,251.1a3,3,0,0,1,2.81-1.88l22.67.24a3,3,0,0,1,2.74,4.08l-7.8,19.62A3,3,0,0,1,399.64,275Z" />
                            <path className="none"
                                d="M191,308.57l-22.54-.24a3,3,0,0,1-2.8-4.17l7.75-19.49a3.07,3.07,0,0,1,2.87-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.76,19.49A3.05,3.05,0,0,1,191,308.57Z" />
                            <path className="none"
                                d="M234.33,309l-22.54-.24a3,3,0,0,1-2.8-4.17l7.75-19.48a3.06,3.06,0,0,1,2.87-1.93l22.54.24a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3.05,3.05,0,0,1,234.33,309Z" />
                            <path className="none"
                                d="M278.09,309.48l-22.54-.24a3,3,0,0,1-2.8-4.17l7.75-19.49a3.07,3.07,0,0,1,2.87-1.92l22.54.24a3,3,0,0,1,2.8,4.17L281,307.56A3.05,3.05,0,0,1,278.09,309.48Z" />
                            <path className="none"
                                d="M321.25,309.93l-22.54-.24a3,3,0,0,1-2.8-4.17L303.67,286a3,3,0,0,1,2.86-1.92l22.54.24a3.05,3.05,0,0,1,2.8,4.18L324.11,308A3,3,0,0,1,321.25,309.93Z" />
                            <path className="none"
                                d="M364.51,310.38,342,310.15a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3,3,0,0,1,2.86-1.92l22.54.23a3.05,3.05,0,0,1,2.8,4.18l-7.76,19.48A3,3,0,0,1,364.51,310.38Z" />
                            <path className="none"
                                d="M176.7,343.51l-22.54-.23a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48A3.05,3.05,0,0,1,162,317.7l22.54.23a3.05,3.05,0,0,1,2.8,4.18l-7.75,19.48A3.05,3.05,0,0,1,176.7,343.51Z" />
                            <path className="none"
                                d="M220.06,344l-22.54-.24a3,3,0,0,1-2.8-4.17l7.76-19.49a3.05,3.05,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.75,19.49A3.07,3.07,0,0,1,220.06,344Z" />
                            <path className="none"
                                d="M263.82,344.43l-22.54-.24a3.05,3.05,0,0,1-2.8-4.18l7.76-19.48a3.05,3.05,0,0,1,2.86-1.92l22.54.24a3,3,0,0,1,2.8,4.17l-7.75,19.49A3.07,3.07,0,0,1,263.82,344.43Z" />
                            <path className="none"
                                d="M307,344.88l-22.66-.24a3,3,0,0,1-2.75-4.1L289.42,321a3,3,0,0,1,2.81-1.89l22.66.24a3,3,0,0,1,2.74,4.1L309.83,343A3,3,0,0,1,307,344.88Z" />
                            <path className="none"
                                d="M350.28,345.33l-22.66-.24a3,3,0,0,1-2.75-4.09l7.81-19.6a3,3,0,0,1,2.81-1.89l22.66.24a3,3,0,0,1,2.74,4.1l-7.8,19.6A3,3,0,0,1,350.28,345.33Z" />
                            
                            
                            
                            
                            <polygon className="cls-7" points="440.86 90.11 264.02 88.26 294.99 10.48 471.82 12.33 440.86 90.11" />
                            <text className="cls-8" transform="matrix(1.06, 0.01, -0.37, 0.93, 359.21, 60.19)">ESCENARIO</text>
                            <line className="cls-9" x1="184.09" y1="201.71" x2="479.45" y2="204.8" />
                            <line className="cls-9" x1="123.05" y1="355.03" x2="393.85" y2="357.87" />
                            <line className="cls-10" x1="184.09" y1="201.71" x2="193.06" y2="179.18" />
                            <line className="cls-10" x1="135.94" y1="178.58" x2="193.06" y2="179.18" />
                            <line className="cls-10" x1="123.05" y1="355.03" x2="138.51" y2="317.45" />
                            <line className="cls-10" x1="80.89" y1="316.85" x2="138.51" y2="317.45" />
                            <line className="cls-10" x1="393.85" y1="357.87" x2="408.81" y2="320.28" />
                            <line className="cls-10" x1="433.37" y1="320.54" x2="408.81" y2="320.28" />
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 175.01, 231.74)">01</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 218.14, 232.43)">02</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 261.48, 233.12)">03</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 304.64, 233.57)">04</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 347.69, 233.55)">05</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 391.73, 234.01)">06</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 160.67, 267.04)">07</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 203.79, 267.73)">08</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 247.13, 268.42)">09</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 290.29, 268.87)">10</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 333.34, 268.85)">11</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 377.38, 269.31)">12</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 167.18, 302.7)">13</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 210.52, 303.39)">14</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 253.68, 303.84)">15</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 296.73, 303.82)">16</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 340.77, 304.28)">17</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 152.76, 337.58)">18</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 197.28, 338.28)">19</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 241.61, 338.75)">20</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 284.66, 338.73)">21</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 328.7, 339.19)">22</text>
                            <text className="cls-12" transform="matrix(1.06, 0.01, -0.37, 0.93, 160.66, 414.05)">V I P</text>
                            <text className="cls-13" transform="matrix(0.35, -0.88, 1, 0.01, 120.67, 305.74)">PL<tspan
                                className="cls-14" x="24.47" y="0">A</tspan><tspan x="37.51" y="0">TINUM</tspan></text>
                            <text className="cls-15" transform="matrix(0.35, -0.88, 1, 0.01, 173.82, 172.22)">GOLDEN</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 222.14, 114.4)">01</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 265.26, 115.09)">02</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 308.61, 115.78)">03</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 351.77, 116.23)">04</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 394.81, 116.21)">05</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 438.85, 116.67)">06</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 207.38, 150.73)">07</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 250.5, 151.42)">08</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 293.84, 152.11)">09</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 337, 152.56)">10</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 380.05, 152.54)">11</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 424.09, 153)">12</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 215.06, 186.4)">13</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 258.41, 187.09)">14</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 301.57, 187.54)">15</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 344.61, 187.52)">16</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 388.65, 187.98)">17</text>
                        </svg>
                    </div>


                </div>

            </div>
            <div client="1" hall="2" session="0" id="rsr" className="hasSVG d-none">

                <ExampleDataTable/>
            </div>
        </>
    )

}

export default Viewssvg