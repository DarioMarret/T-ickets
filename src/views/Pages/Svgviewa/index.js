import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
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
                    $("#"+e.path).attr("fill",e.fill,"class","seleccion")        
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
                              this.removeAttribute("class","none")       
                              this.setAttribute("class","seleccion")   
                            }
                     })
                    $(document).on("click",".seleccion",function(){
                     if(this.classList.contains('seleccion')){
                        this.removeAttribute("fill")   
                        agergaraALarray(this.getAttribute('id'),'','')
                        this.removeAttribute("class","seleccion")   
                        this.setAttribute("class","none")                             
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
                        sessionStorage.localidad = JSON.stringify(obtent.data)
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
                              nuevo.length>0 && colores.length>0? sessionStorage.localidad = JSON.stringify(nuevo):''
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
                t.setAttribute("fill", "white");
                t.setAttribute("font-size", (b.height / 10));
                this.parentNode.insertBefore(t, b.nextSibling);
                //  b.parentNode.insertBefore(t, b.nextSibling);

                //this.classList.add("class")   
                //this.setAttribute("fill","#DC2A27")
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
                t.setAttribute("fill", "white");
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
    t.setAttribute("fill", "red");
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


                        <svg className="seudtres " xmlns="http://www.w3.org/2000/svg" width="194.766mm" height="144mm" version="1.1"
                            viewBox="0 0 19477 14400"
                        ><g id="Capa_x0020_1">
                                <ellipse className="fil0" transform="matrix(0.0574626 0.00618266 -0.0126404 0.117482 9670.37 6932.29)" rx="162923" ry="57868" />
                                <ellipse className="fil1" transform="matrix(0.280167 0.0253639 -0.033402 0.36202 10097.7 6158.01)" rx="28173" ry="14669" />
                                <ellipse id="3" className="none" transform="matrix(0.276319 0.0209976 -0.0430459 0.565517 10231.6 6337.4)" rx="27834" ry="9123" />
                                <ellipse className="fil3" transform="matrix(0.271525 0.0316058 -0.0552549 0.464959 10113.2 6239.44)" rx="23963" ry="9725" />
                                <ellipse id="2" className="none" transform="matrix(0.266285 0.0309959 -0.0541887 0.455987 10084.5 6221.34)" rx="23963" ry="9725" />
                                <ellipse className="fil3" transform="matrix(0.203249 0.0236585 -0.0413609 0.348044 10115 6121.18)" rx="23963" ry="9725" />
                                <ellipse id="1" className="none" transform="matrix(0.200677 0.0233591 -0.0408375 0.343639 10121.4 6125.87)" rx="23963" ry="9725" />
                                <path className="fil6" d="M18211 7540c261,578 326,1252 -204,2218l-520 -151 375 354c-512,971 -1229,1660 -2143,2073l-561 -531 -418 197 296 750c-673,429 -1419,645 -2201,755l-226 -541 23 529c-930,318 -1913,334 -2904,302 -98,-280 -438,-427 -941,-511 221,135 295,263 358,478l-2049 -321 79 -305 775 -50 41 -441c-813,-142 -1593,-427 -2344,-802l-69 181 299 319 -116 349 -1429 -680 348 -319 244 23 250 -169c-600,-290 -1193,-574 -1655,-1240l-976 549c-425,-366 -709,-801 -941,-1260l1011 -616c-215,-435 -389,-812 -441,-1239l-959 496c-65,-879 237,-1805 776,-2761 -238,8768 15152,8685 16222,2364z" />
                                <path className="fil7" d="M18324 7401c262,580 327,1256 -205,2225l-521 -152 376 356c-514,975 -1233,1665 -2151,2080l-562 -533 -420 198 297 752c-675,430 -1423,647 -2208,758l-227 -543 23 531c-933,319 -1919,335 -2914,303 -98,-281 -439,-429 -944,-513 222,135 297,264 359,479l-2055 -322 79 -306 778 -49 41 -443c-816,-143 -1598,-429 -2352,-805l-70 182 300 320 -116 350 -1434 -682 350 -321 245 24 250 -169c-602,-292 -1197,-577 -1661,-1245l-979 551c-426,-368 -712,-803 -944,-1264l1014 -618c-215,-437 -390,-815 -442,-1244l-962 498c-66,-882 238,-1811 778,-2770 -238,8798 15204,8714 16277,2372z" />
                                <polygon className="fil0 str0" points="11051,5553 12305,4880 11813,4723 10560,5393 9915,5183 9440,5386 7668,4785 6776,5087 8515,5759 8040,5996 8845,6313 8844,6312 7584,6996 7998,7190 9294,6489 10197,6845 10685,6566 12842,7382 13635,6775 11589,6080 11879,5823 " />
                                <polygon className="fil8 str1" points="11057,5504 12311,4831 11820,4674 10567,5344 9921,5134 9447,5337 7674,4735 6782,5038 8521,5709 8047,5947 8851,6263 8851,6263 7591,6947 8005,7141 9300,6440 10204,6796 10692,6517 12849,7333 13642,6726 11595,6031 11886,5774 " />
                                <path className="fil9 str2" d="M9022 5445l-16 48 -165 -53 -26 81 147 49 -15 46 -147 -48 -27 82 169 55 -16 49 -221 -72 100 -308 217 71zm151 94c-15,-5 -28,-6 -40,-3 -11,3 -19,11 -23,23 -5,13 -3,24 5,34 7,9 26,23 55,41 29,18 49,37 61,56 11,19 12,42 4,69 -9,27 -26,45 -52,55 -26,10 -55,10 -88,-1 -48,-15 -86,-46 -112,-91l45 -29c23,37 51,61 84,72 17,6 31,6 44,2 12,-4 20,-12 24,-23 4,-12 2,-23 -5,-33 -7,-9 -21,-21 -42,-33 -21,-13 -37,-24 -47,-32 -10,-9 -19,-18 -25,-28 -14,-20 -16,-44 -7,-73 9,-28 27,-47 53,-55 25,-9 54,-8 84,2 20,6 38,16 56,28 17,13 31,28 41,44l-41 30c-6,-11 -16,-22 -30,-32 -14,-10 -28,-18 -44,-23zm254 326c18,6 34,8 49,6 15,-1 31,-7 50,-15l22 45c-44,26 -90,31 -136,16 -47,-16 -81,-43 -102,-83 -21,-40 -23,-83 -9,-129 15,-46 44,-79 85,-99 41,-21 86,-23 133,-7 48,15 82,46 103,92l-45 25c-10,-19 -21,-33 -32,-43 -11,-10 -26,-18 -43,-24 -32,-10 -61,-8 -89,5 -28,13 -46,35 -57,67 -10,31 -8,61 6,88 14,28 36,47 65,56zm485 -130l-16 49 -164 -54 -27 82 148 48 -15 46 -148 -48 -27 83 170 55 -16 49 -222 -73 101 -308 216 71zm303 99l52 17 -101 308 -56 -19 -101 -281 -74 224 -52 -16 101 -309 52 17 104 289 75 -230zm103 297l-53 60 -56 -18 236 -264 56 18 35 352 -55 -18 -8 -80 -155 -50zm149 -5l-14 -145 -98 109 112 36zm426 40c-17,50 -49,75 -98,74l44 138 -66 -21 -40 -128 -68 -22 -34 103 -52 -17 100 -308 115 38c47,15 78,34 93,56 15,23 17,52 6,87zm-148 15c29,9 51,11 64,6 14,-6 24,-19 31,-39 6,-20 5,-36 -3,-47 -9,-11 -27,-21 -55,-30l-66 -22 -36 111 65 21zm255 -91l52 17 -100 308 -52 -17 100 -308zm334 189c-14,-29 -36,-48 -67,-58 -31,-10 -60,-7 -88,8 -28,15 -47,38 -57,69 -10,31 -8,60 5,89 14,29 37,48 67,58 31,10 60,7 88,-8 28,-15 47,-38 58,-69 10,-31 8,-60 -6,-89zm-25 205c-41,21 -84,23 -130,8 -46,-15 -80,-42 -101,-83 -21,-40 -24,-83 -10,-129 15,-45 43,-78 84,-98 41,-21 85,-23 130,-8 46,14 80,42 101,83 21,40 25,83 10,129 -15,45 -43,78 -84,98z" />

                            </g>

                        </svg>



                    </div>


                </div>

            </div>
            <div client="1" hall="2" session="0" id="rsr" className="hasSVG">


            </div>
        </>
    )

}

export default Viewssvg