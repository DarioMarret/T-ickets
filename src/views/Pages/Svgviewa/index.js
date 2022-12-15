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
                    $("#"+e.path).attr("filal",e.fill,"class","seleccion")        
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
                        this.removeAttribute("filal")   
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
                t.setAttribute("filal", "white");
                t.setAttribute("font-size", (b.height / 10));
                this.parentNode.insertBefore(t, b.nextSibling);
                //  b.parentNode.insertBefore(t, b.nextSibling);

                //this.classList.add("class")   
                //this.setAttribute("filal","#DC2A27")
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
                t.setAttribute("filal", "white");
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
    t.setAttribute("filal", "red");
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


                        <svg className="mapanuevo" xmlns="http://www.w3.org/2000/svg" width="194.766mm" height="144mm" version="1.1"
                            viewBox="0 0 19477 14400"
                        >

                            <g id="Capa_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <path className="fila0" d="M9186 2866c3582,-515 8726,-115 8847,345l866 3304c518,1971 -3918,5392 -7803,6446 -5327,1445 -10017,366 -10614,-2495 -597,-2862 3161,-6803 8704,-7600z" />
                                <path className="fila1 stra0" d="M814 8878c-309,2104 835,3474 3608,4022 5087,773 9373,-857 13075,-4255 824,-922 1428,-1926 998,-3439 -1938,6618 -16285,8862 -17681,3672z" />
                                <path className="fila0" d="M8832 1753c5022,-1187 9275,-217 9744,2322 469,2538 -3066,5770 -7952,7097 -4885,1328 -9150,368 -9739,-2289 -588,-2657 2925,-5943 7947,-7130z" />
                                <path className="fila2 stra1" d="M15332 4684c679,1616 -1351,3712 -4536,4681 -3185,970 -6318,447 -6998,-1169 -680,-1616 1351,-3712 4536,-4682 3185,-969 6318,-446 6998,1170z" />
                                <path id="1" className="none" d="M1987 5556c1178,-1416 3245,-2722 5823,-3521 938,-290 1873,-492 2776,-609l-463 1594c-572,81 -1161,212 -1751,395 -1898,588 -3388,1581 -4144,2635l-2241 -494z" />
                                <path id="2" className="none" d="M9750 11249c-4080,817 -7768,-47 -8649,-2181 -442,-1071 -103,-2283 818,-3428l2249 496c-470,695 -619,1413 -353,2056 581,1409 2966,2003 5644,1525l291 1532z" />
                                <path id="3" className="none" d="M17260 7298c-1178,1417 -3246,2723 -5824,3522 -526,163 -1050,297 -1569,405l-290 -1530c414,-78 835,-182 1257,-313 1710,-530 3089,-1388 3898,-2324l2528 240z" />
                                <path id="4" className="none" d="M18145 3787c442,1070 104,2279 -813,3423l-2526 -240c648,-788 891,-1626 586,-2365 -545,-1321 -2673,-1925 -5142,-1603l463 -1592c3576,-434 6640,457 7432,2377z" />
                                <path id="5" className="none" d="M9428 9634c-2578,449 -4866,-127 -5426,-1485 -255,-618 -115,-1307 332,-1975l1736 376c-400,538 -472,1064 -123,1457 519,584 1831,714 3284,405l197 1222z" />
                                <path id="7" className="none" d="M9450 9020l-103 -634c515,-117 1045,-288 1562,-513 694,-301 1274,-660 1708,-1034l1111 117c-861,700 -2858,1838 -4278,2064z" />
                                <path id="9" className="none" d="M14581 7045c-783,909 -2120,1743 -3780,2257 -422,131 -842,234 -1256,311l-84 -523c137,-21 315,-63 950,-260 894,-277 2463,-1072 3384,-1867l786 82z" />
                                <path id="10" className="none" d="M5177 6259l-784 -171c729,-1026 2176,-1993 4023,-2565 566,-176 1130,-302 1679,-381l-199 712c-178,23 -257,27 -1053,274 -993,307 -2820,1255 -3666,2131z" />
                                <path id="8" className="none" d="M9722 4477c-466,115 -942,274 -1408,476 -987,429 -1745,974 -2179,1514l-904 -197c583,-633 3021,-2117 4644,-2343l-153 550z" />
                                <path id="6" className="none" d="M15215 4675c294,714 62,1522 -561,2283l-1941 -204c760,-692 1016,-1425 563,-1934 -536,-604 -1916,-722 -3424,-374l369 -1321c2397,-316 4465,269 4994,1550z" />
                                <path id="11" className="fila2" d="M13183 4868c696,784 -334,2113 -2302,2969 -1968,855 -4128,913 -4824,129 -697,-784 334,-2113 2301,-2968 1968,-856 4128,-914 4825,-130z" />
                                <polygon className="fila2" points="4604,4780 4860,4518 4330,4185 3959,4516 " />
                                <path className="fila2" d="M5263 4992c41,-32 90,-70 153,-118l-520 -254 -115 125 482 247z" />
                                <path className="fila2" d="M3686 7607c-1,-47 -3,-103 0,-174l-644 6 11 213 633 -45z" />
                                <polygon className="fila2" points="2845,7438 2868,7707 2561,7778 2542,7425 " />
                                <polygon className="fila2" points="6366,10398 6017,10265 5820,10458 6245,10640 " />
                                <path className="fila2" d="M6623 9813c-77,-11 -153,-22 -227,-34l-222 397 198 70 251 -433z" />
                                <polygon className="fila2" points="10693,9926 11113,9784 11512,10246 10866,10453 " />
                                <path className="fila2" d="M10549 9466c71,-19 146,-41 223,-65l191 320 -235 79 -179 -334z" />
                                <polygon className="fila2" points="15017,7833 15262,7627 15806,7867 15513,8114 " />
                                <path className="fila2" d="M14866 7720l146 -117 -528 -278c-48,48 -93,93 -136,131l518 264z" />
                                <polygon className="fila2" points="16653,4859 16659,5129 17416,5161 17419,4772 " />
                                <path className="fila2" d="M16517 5059l0 -143 -1016 78c9,59 15,117 18,172l998 -107z" />
                                <path className="fila2" d="M14055 2729l-217 -49c-121,163 -242,325 -363,488 85,24 168,50 248,79l332 -518z" />
                                <polygon className="fila2" points="14214,2642 13769,2558 14031,2133 14496,2185 " />
                                <polygon className="fila2" points="9148,2640 9567,2530 9344,2099 8900,2225 " />
                                <path className="fila2" d="M9713 3086c-72,14 -145,27 -220,42l-202 -375 215 -56 207 389z" />
                                <path className="fila8" d="M873 8792c-309,2104 835,3474 3608,4022 5086,773 9373,-857 13075,-4256 824,-922 1420,-1877 990,-3389 -1938,6617 -16277,8813 -17673,3623z" />
                                <path className="fila9" d="M6248 12191l0 0c285,0 518,234 519,520l1 296c-344,-4 -690,-21 -1040,-50l0 -246c0,-286 234,-520 520,-520z" />
                                <path className="fila2" d="M6264 12222l0 0c285,0 523,234 519,519l-4 267c-344,-8 -680,-20 -1030,-45l-5 -222c-7,-285 234,-519 520,-519z" />
                                <path className="fila9" d="M10534 11597l0 0c285,0 525,233 519,519l-6 291c-344,111 -685,193 -1034,267l1 -558c0,-286 234,-519 520,-519z" />
                                <path className="fila2" d="M10577 11620l0 0c286,0 526,234 520,519l-6 254c-337,112 -679,197 -1034,272l1 -526c0,-285 234,-519 519,-519z" />
                                <path className="fila9" d="M14866 9765l0 0c295,0 523,247 523,538 -332,224 -682,456 -1041,655l-1 -674c-1,-285 233,-519 519,-519z" />
                                <path className="fila2" d="M14914 9819l0 0c295,0 475,193 475,484 -318,214 -625,423 -993,628l-1 -665c-1,-286 234,-447 519,-447z" />
                                <path className="fila9" d="M18218 6789l0 0c139,0 265,55 358,144 -95,365 -405,982 -867,1474l-10 -1099c-3,-285 234,-519 519,-519z" />
                                <path className="fila2" d="M18268 6833l0 0c139,0 215,12 308,102 -100,377 -385,913 -817,1423l-10 -1005c-3,-286 234,-520 519,-520z" />
                                <path className="fila0" d="M2255 10940l0 0c286,0 520,234 520,519 0,178 32,825 30,839 -379,-178 -714,-365 -1066,-688l-3 -151c-8,-285 233,-519 519,-519z" />
                                <path className="fila2" d="M2273 10964l0 0c286,0 520,234 520,520 0,177 32,824 30,838 -379,-178 -714,-365 -1065,-688l-4 -150c-8,-286 233,-520 519,-520z" />
                                <g id="_2059959272512">
                                    <polygon className="fila10" points="10387,5992 11198,5557 10880,5455 10069,5889 9652,5752 9345,5884 8198,5495 7621,5690 8746,6125 8439,6278 8960,6483 8960,6483 8144,6925 8412,7051 9250,6598 9834,6828 10150,6647 11545,7175 12058,6782 10735,6333 10923,6167 " />
                                    <polygon className="fila11" points="10391,5960 11202,5525 10884,5423 10074,5857 9656,5721 9349,5852 8203,5463 7626,5659 8751,6093 8444,6247 8964,6451 8964,6451 8149,6893 8417,7019 9254,6566 9839,6796 10155,6615 11550,7143 12063,6751 10739,6301 10927,6135 " />
                                    <path className="fila12" d="M9074 5922l-10 32 -106 -35 -18 53 96 31 -10 30 -95 -32 -18 54 110 36 -10 31 -144 -47 65 -199 140 46zm98 61c-9,-3 -18,-4 -26,-2 -7,2 -12,7 -15,15 -3,8 -1,15 3,22 5,6 17,15 36,27 19,11 32,23 39,35 8,13 9,28 3,45 -6,17 -17,29 -33,36 -17,6 -36,6 -57,-1 -32,-10 -56,-30 -73,-59l30 -18c14,24 32,39 54,46 11,4 20,4 28,2 8,-3 13,-8 15,-16 3,-7 2,-14 -3,-21 -4,-6 -13,-13 -27,-21 -13,-9 -23,-16 -30,-21 -7,-5 -12,-11 -16,-18 -9,-13 -11,-29 -5,-47 6,-18 18,-30 34,-36 17,-6 35,-5 55,1 13,4 25,11 36,19 11,8 20,18 26,28l-26 20c-4,-8 -10,-15 -19,-21 -9,-7 -19,-12 -29,-15zm164 211c12,4 22,5 32,4 10,-1 20,-5 32,-10l15 29c-29,17 -58,20 -88,10 -31,-10 -52,-28 -66,-53 -14,-26 -15,-54 -6,-84 10,-29 28,-51 55,-64 26,-13 55,-15 86,-5 31,11 53,30 66,60l-29 16c-6,-12 -13,-21 -20,-28 -8,-6 -17,-11 -28,-15 -21,-6 -40,-5 -57,3 -18,9 -31,23 -37,44 -7,20 -6,39 4,57 9,18 23,30 41,36zm314 -84l-10 31 -107 -34 -17 52 96 32 -10 29 -95 -31 -18 54 110 35 -10 32 -144 -47 65 -199 140 46zm196 64l34 11 -65 199 -37 -12 -65 -182 -48 145 -33 -11 65 -199 33 11 67 186 49 -148zm67 192l-35 39 -36 -12 153 -171 36 12 23 228 -36 -12 -5 -52 -100 -32zm96 -3l-9 -94 -63 70 72 24zm276 25c-11,33 -32,49 -64,48l29 90 -43 -14 -26 -83 -44 -14 -22 67 -33 -11 65 -199 74 24c30,10 50,22 60,36 10,15 11,34 4,56zm-96 10c19,6 33,7 42,4 8,-4 15,-12 19,-25 4,-13 4,-23 -2,-30 -5,-8 -17,-14 -35,-20l-43 -14 -23 71 42 14zm165 -59l34 11 -65 200 -34 -11 65 -200zm216 123c-9,-19 -24,-31 -43,-38 -20,-6 -39,-5 -57,5 -19,10 -31,25 -37,45 -7,20 -6,39 3,57 9,19 24,31 44,38 19,6 38,5 56,-5 19,-10 31,-25 37,-45 7,-20 6,-39 -3,-57zm-16 132c-27,13 -55,15 -84,6 -30,-10 -52,-28 -66,-54 -13,-26 -15,-54 -6,-84 10,-29 28,-50 54,-63 27,-14 55,-15 85,-6 29,10 51,28 65,54 13,26 16,54 6,84 -10,29 -28,50 -54,63z" />
                                </g>
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