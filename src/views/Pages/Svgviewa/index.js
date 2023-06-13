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
                            
                            <polygon className="cls-1"
                                points="391.45 444.94 38.98 441.25 207.25 18.59 559.72 22.27 391.45 444.94" />
                            <polygon className="cls-2"
                                points="387.45 435.87 34.97 432.19 203.24 9.52 555.72 13.21 387.45 435.87" />
                            <polygon className="cls-3"
                                points="336.38 430.3 98.81 427.78 128.66 362.63 366.24 365.14 336.38 430.3" />


                            <polygon className="none"
                                points="334.51 426.74 96.94 424.23 126.8 359.07 364.37 361.59 334.51 426.74" />


                            <polygon className="cls-3"
                                points="200.83 239.88 171.76 239.58 181.93 214.03 211 214.33 200.83 239.88" />
                            <polygon className="cls-3"
                                points="244.19 240.34 215.12 240.03 225.29 214.48 254.36 214.78 244.19 240.34" />
                            <polygon className="cls-3"
                                points="287.95 240.8 258.88 240.49 269.05 214.94 298.12 215.24 287.95 240.8" />
                            <polygon className="cls-3"
                                points="331.11 241.25 302.04 240.94 312.21 215.39 341.28 215.69 331.11 241.25" />
                            <polygon className="cls-3"
                                points="374.37 241.7 345.3 241.4 355.47 215.84 384.54 216.15 374.37 241.7" />
                            <polygon className="cls-3"
                                points="417.53 242.15 388.46 241.85 398.63 216.29 427.7 216.6 417.53 242.15" />
                            <polygon className="cls-3"
                                points="186.37 275.45 157.3 275.14 167.47 249.59 196.54 249.89 186.37 275.45" />
                            <polygon className="cls-3"
                                points="229.73 275.9 200.66 275.6 210.83 250.04 239.9 250.35 229.73 275.9" />
                            <polygon className="cls-3"
                                points="273.49 276.36 244.42 276.06 254.59 250.5 283.66 250.8 273.49 276.36" />
                            <polygon className="cls-3"
                                points="316.65 276.81 287.58 276.51 297.75 250.95 326.82 251.26 316.65 276.81" />
                            <polygon className="cls-3"
                                points="359.91 277.26 330.84 276.96 341.01 251.4 370.08 251.71 359.91 277.26" />
                            <polygon className="cls-3"
                                points="403.07 277.71 374 277.41 384.17 251.86 413.25 252.16 403.07 277.71" />
                            <polygon className="cls-3"
                                points="194.44 311.25 165.37 310.94 175.54 285.39 204.61 285.69 194.44 311.25" />
                            <polygon className="cls-3" points="237.8 311.7 208.73 311.39 218.9 285.84 247.97 286.14 237.8 311.7" />
                            <polygon className="cls-3"
                                points="281.56 312.16 252.49 311.85 262.66 286.3 291.73 286.6 281.56 312.16" />
                            <polygon className="cls-3"
                                points="324.72 312.61 295.65 312.31 305.82 286.75 334.89 287.05 324.72 312.61" />
                            <polygon className="cls-3"
                                points="367.98 313.06 338.91 312.76 349.08 287.2 378.15 287.51 367.98 313.06" />
                            <polygon className="cls-3"
                                points="180.18 346.19 151.1 345.89 161.28 320.33 190.35 320.64 180.18 346.19" />
                            <polygon className="cls-3"
                                points="223.54 346.65 194.46 346.34 204.64 320.79 233.71 321.09 223.54 346.65" />
                            <polygon fill="#0000" className="cls-3"
                                points="267.3 347.11 238.22 346.8 248.4 321.25 277.47 321.55 267.3 347.11" />
                            <polygon className="cls-3"
                                points="310.46 347.56 281.38 347.25 291.56 321.7 320.63 322 310.46 347.56" />
                            <polygon className="cls-3"
                                points="353.72 348.01 324.64 347.7 334.82 322.15 363.89 322.45 353.72 348.01" />
                            <polygon className="cls-3" points="247.25 123.4 218.18 123.1 228.35 97.54 257.42 97.85 247.25 123.4" />
                            <polygon className="cls-3" points="290.61 123.86 261.54 123.55 271.71 98 300.78 98.3 290.61 123.86" />
                            <polygon className="cls-3"
                                points="334.37 124.31 305.3 124.01 315.47 98.45 344.54 98.76 334.37 124.31" />
                            <polygon className="cls-3"
                                points="377.53 124.77 348.46 124.46 358.63 98.91 387.7 99.21 377.53 124.77" />
                            <polygon className="cls-3"
                                points="420.79 125.22 391.72 124.91 401.89 99.36 430.96 99.66 420.79 125.22" />
                            <polygon className="cls-3"
                                points="463.95 125.67 434.88 125.36 445.05 99.81 474.12 100.11 463.95 125.67" />
                            <polygon className="cls-3"
                                points="232.79 158.97 203.72 158.66 213.89 133.11 242.96 133.41 232.79 158.97" />
                            <polygon className="cls-3"
                                points="276.15 159.42 247.08 159.11 257.25 133.56 286.32 133.86 276.15 159.42" />
                            <polygon className="cls-3"
                                points="319.91 159.88 290.84 159.57 301.01 134.02 330.08 134.32 319.91 159.88" />
                            <polygon className="cls-3"
                                points="363.07 160.33 334 160.02 344.17 134.47 373.25 134.77 363.07 160.33" />
                            <polygon className="cls-3"
                                points="406.33 160.78 377.26 160.48 387.43 134.92 416.5 135.23 406.33 160.78" />
                            <polygon className="cls-3"
                                points="449.49 161.23 420.42 160.93 430.59 135.37 459.67 135.68 449.49 161.23" />
                            <polygon className="cls-3"
                                points="240.86 194.76 211.79 194.46 221.96 168.9 251.03 169.21 240.86 194.76" />
                            <polygon className="cls-3"
                                points="284.22 195.22 255.15 194.91 265.32 169.36 294.39 169.66 284.22 195.22" />
                            <polygon className="cls-3"
                                points="327.98 195.68 298.91 195.37 309.08 169.82 338.15 170.12 327.98 195.68" />
                            <polygon className="cls-3"
                                points="371.14 196.13 342.07 195.82 352.24 170.27 381.31 170.57 371.14 196.13" />
                            <polygon className="cls-3"
                                points="414.4 196.58 385.33 196.28 395.5 170.72 424.57 171.02 414.4 196.58" />
                           


                            <polygon className="none"
                                points="245.82 121.13 216.74 120.83 226.92 95.28 255.99 95.58 245.82 121.13" />
                            <polygon className="none"
                                points="289.18 121.59 260.1 121.28 270.28 95.73 299.35 96.03 289.18 121.59" />
                            <polygon className="none"
                                points="332.94 122.05 303.86 121.74 314.04 96.19 343.11 96.49 332.94 122.05" />
                            <polygon className="none" points="376.1 122.5 347.02 122.19 357.2 96.64 386.27 96.94 376.1 122.5" />
                            <polygon className="none"
                                points="419.36 122.95 390.28 122.65 400.46 97.09 429.53 97.39 419.36 122.95" />
                            <polygon className="none" points="462.52 123.4 433.44 123.1 443.62 97.54 472.69 97.85 462.52 123.4" />
                            <polygon className="none"
                                points="231.36 156.7 202.28 156.39 212.46 130.84 241.53 131.14 231.36 156.7" />
                            <polygon className="none"
                                points="274.72 157.15 245.64 156.85 255.82 131.29 284.89 131.6 274.72 157.15" />
                            <polygon className="none"
                                points="318.48 157.61 289.4 157.31 299.58 131.75 328.65 132.05 318.48 157.61" />
                            <polygon className="none"
                                points="361.64 158.06 332.56 157.76 342.74 132.2 371.81 132.51 361.64 158.06" />
                            <polygon className="none" points="404.9 158.51 375.82 158.21 386 132.65 415.07 132.96 404.9 158.51" />
                            <polygon className="none"
                                points="448.06 158.97 418.98 158.66 429.16 133.11 458.23 133.41 448.06 158.97" />
                            <polygon className="none"
                                points="239.43 192.5 210.35 192.19 220.53 166.64 249.6 166.94 239.43 192.5" />
                            <polygon className="none"
                                points="282.79 192.95 253.71 192.65 263.89 167.09 292.96 167.4 282.79 192.95" />
                            <polygon className="none"
                                points="326.55 193.41 297.47 193.1 307.65 167.55 336.72 167.85 326.55 193.41" />
                            <polygon className="none"
                                points="369.71 193.86 340.63 193.56 350.81 168 379.88 168.3 369.71 193.86" />
                            <polygon className="none"
                                points="412.97 194.31 383.89 194.01 394.07 168.45 423.14 168.76 412.97 194.31" />
                            
                            


                            <polygon className="none"
                                points="199.45 237.23 170.37 236.92 180.55 211.37 209.62 211.67 199.45 237.23" />
                            <polygon className="none"
                                points="242.81 237.68 213.73 237.38 223.91 211.82 252.98 212.13 242.81 237.68" />
                            <polygon className="none"
                                points="286.57 238.14 257.49 237.83 267.67 212.28 296.74 212.58 286.57 238.14" />
                            <polygon className="none"
                                points="329.73 238.59 300.65 238.29 310.83 212.73 339.9 213.03 329.73 238.59" />
                            <polygon className="none"
                                points="372.99 239.04 343.91 238.74 354.09 213.18 383.16 213.49 372.99 239.04" />
                            <polygon className="none"
                                points="416.15 239.49 387.07 239.19 397.25 213.63 426.32 213.94 416.15 239.49" />
                            <polygon className="none"
                                points="184.99 272.79 155.91 272.49 166.09 246.93 195.16 247.24 184.99 272.79" />
                            <polygon className="none"
                                points="228.35 273.24 199.27 272.94 209.45 247.38 238.52 247.69 228.35 273.24" />
                            <polygon className="none"
                                points="272.11 273.7 243.03 273.4 253.21 247.84 282.28 248.15 272.11 273.7" />
                            <polygon className="none"
                                points="315.27 274.15 286.19 273.85 296.37 248.29 325.44 248.6 315.27 274.15" />
                            <polygon className="none"
                                points="358.53 274.61 329.45 274.3 339.63 248.75 368.7 249.05 358.53 274.61" />
                            <polygon className="none"
                                points="401.69 275.06 372.62 274.75 382.79 249.2 411.86 249.5 401.69 275.06" />
                            <polygon className="none"
                                points="193.06 308.59 163.98 308.28 174.16 282.73 203.23 283.03 193.06 308.59" />
                            <polygon className="none"
                                points="236.42 309.04 207.34 308.74 217.52 283.18 246.59 283.49 236.42 309.04" />
                            <polygon className="none"
                                points="280.18 309.5 251.1 309.2 261.28 283.64 290.35 283.94 280.18 309.5" />
                            <polygon className="none"
                                points="323.34 309.95 294.26 309.65 304.44 284.09 333.51 284.4 323.34 309.95" />
                            <polygon className="none" points="366.6 310.4 337.52 310.1 347.7 284.55 376.77 284.85 366.6 310.4" />
                            <polygon className="none"
                                points="178.79 343.54 149.72 343.23 159.89 317.68 188.97 317.98 178.79 343.54" />
                            <polygon className="none"
                                points="222.15 343.99 193.08 343.69 203.25 318.13 232.33 318.44 222.15 343.99" />
                            <polygon className="none"
                                points="265.91 344.45 236.84 344.14 247.01 318.59 276.09 318.89 265.91 344.45" />
                            <polygon className="none" points="309.07 344.9 280 344.6 290.17 319.04 319.25 319.34 309.07 344.9" />
                            <polygon className="none"
                                points="352.33 345.35 323.26 345.05 333.43 319.49 362.51 319.8 352.33 345.35" />



                            <polygon className="cls-7" points="440.86 90.11 264.02 88.26 294.99 10.48 471.82 12.33 440.86 90.11" />
                            <text className="cls-8" transform="matrix(1.06, 0.01, -0.47, 0.93, 357.38, 58.5)">ESCENARIO</text>
                            <line className="cls-9" x1="184.09" y1="201.71" x2="479.45" y2="204.8" />
                            <line className="cls-9" x1="123.05" y1="355.03" x2="393.85" y2="357.87" />
                            <line className="cls-10" x1="184.09" y1="201.71" x2="193.06" y2="179.18" />
                            <line className="cls-10" x1="135.94" y1="178.58" x2="193.06" y2="179.18" />
                            <line className="cls-10" x1="123.05" y1="355.03" x2="138.51" y2="317.45" />
                            <line className="cls-10" x1="80.89" y1="316.85" x2="138.51" y2="317.45" />
                            <line className="cls-10" x1="393.85" y1="357.87" x2="408.81" y2="320.28" />
                            <line className="cls-10" x1="433.37" y1="320.54" x2="408.81" y2="320.28" />
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 174.94, 231.76)">01</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 218.07, 232.45)">02</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 261.41, 233.14)">03</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 304.57, 233.59)">04</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 347.62, 233.57)">05</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 391.65, 234.03)">06</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 160.59, 267.06)">07</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 203.72, 267.75)">08</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 247.06, 268.44)">09</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 290.22, 268.89)">10</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 333.27, 268.87)">11</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 377.3, 269.33)">12</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 167.11, 302.72)">13</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 210.45, 303.41)">14</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 253.61, 303.86)">15</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 296.65, 303.84)">16</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 340.69, 304.3)">17</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 152.69, 337.6)">18</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 197.2, 338.3)">19</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 241.54, 338.77)">20</text>
                            <text className="cls-11 " transform="matrix(1.06, 0.01, -0.37, 0.93, 284.58, 338.74)">21</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 328.62, 339.21)">22</text>
                            <text className="cls-12" transform="matrix(1.06, 0.01, -0.37, 0.93, 160.59, 414.07)">V I P</text>
                            <text className="cls-13" transform="matrix(0.35, -0.88, 1, 0.01, 120.59, 305.76)">PL<tspan
                                className="cls-14" x="24.47" y="0">A</tspan><tspan x="37.51" y="0">TINUM</tspan></text>
                            <text className="cls-15" transform="matrix(0.35, -0.88, 1, 0.01, 173.75, 172.24)">GOLDEN</text>
                            <polygon className="cls-1"
                                points="34.97 433.27 38.98 442.33 391.45 446.02 560.46 22.65 556.55 14.05 387.45 436.96 34.97 433.27" />
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 222.06, 114.42)">01</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 265.19, 115.11)">02</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 308.53, 115.8)">03</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 351.69, 116.25)">04</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 394.74, 116.23)">05</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 438.78, 116.69)">06</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 207.3, 150.75)">07</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 250.43, 151.44)">08</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 293.77, 152.13)">09</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 336.93, 152.58)">10</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 379.98, 152.56)">11</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 424.01, 153.02)">12</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 214.99, 186.42)">13</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 258.33, 187.11)">14</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 301.49, 187.56)">15</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 344.54, 187.54)">16</text>
                            <text className="cls-11" transform="matrix(1.06, 0.01, -0.37, 0.93, 388.58, 188)">17</text>
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