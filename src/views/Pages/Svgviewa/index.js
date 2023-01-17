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
                        <svg xmlns="http://www.w3.org/2000/svg" className="mapanuevo" width="90%" height="90%" version="1.1"
                            viewBox="0 0 21000 29700">
                            
                            <path className="fil0" d="M5091 3904l-1004 -2050c300,-56 602,-190 906,-392 398,-78 772,-255 1125,-515 381,-88 538,-120 942,-279 2253,-315 4707,-446 7032,26 342,216 706,390 1090,524 315,271 692,442 1085,588 274,186 554,345 844,462l-905 1794c-3812,-1312 -7530,-1302 -11115,-158z" />
                            <path className="fil0" d="M926 11394c6343,-3442 12683,-3266 19319,85 -1182,333 -2053,960 -2425,2056 -719,650 -1109,1399 -1152,2251 -958,214 -1495,770 -1845,1477l-8446 -59c-348,-892 -997,-1372 -1885,-1524 -38,-927 -456,-1755 -1145,-2260 -400,-1349 -1554,-1834 -2421,-2026z" />
                            <path className="fil1" d="M1170 11391c6272,-3442 12540,-3267 19101,84 -1169,334 -2030,961 -2398,2057 -711,650 -1096,1399 -1139,2251 -118,27 -229,59 -335,95 -3876,-1956 -8101,-2128 -11705,-235 -46,-914 -458,-1727 -1131,-2227 -522,-1346 -1403,-1867 -2393,-2025z" />
                            <path className="bordesvg" d="M5602 9732l1499 4514c-704,185 -1395,472 -2116,785l0 0 -162 23 -2588 -4115c1092,-496 2273,-917 3367,-1207z" />
                            <path id="1"className="none" d="M5657 9888l1542 4359c-729,191 -1466,451 -2214,784l-2515 -3998c1061,-482 2123,-863 3187,-1145z" />
                            <path className="bordesvg" d="M9458 13855l-532 -4229 -947 157 -48 -495c-637,86 -1381,218 -2017,372l1588 4487c686,-162 1283,-246 1956,-292z" />
                            <path id="2" className="none" d="M9490 13866l-584 -4202 -959 163 -42 -388c-619,84 -1241,201 -1859,351l1464 4379c666,-158 1325,-257 1980,-303z" />
                            <path className="bordesvg" d="M9762 13838l-526 -4673c988,-56 1979,-32 2974,71l-439 4692c-678,-83 -1323,-121 -2009,-90z" />
                            <path id="3" className="none" d="M9785 13849l-511 -4540c960,-55 1922,-31 2889,69l-392 4550c-658,-81 -1320,-108 -1986,-79z" />
                            <path className="bordesvg" d="M12086 13956l402 -4282 656 144 143 -429 5 0c742,117 1503,273 2232,472l-1491 4553c-681,-208 -1262,-359 -1947,-458z" />
                            <path id="4" className="none" d="M12043 13964l435 -4051 20 -192 676 134 113 -326 30 3c697,72 1375,265 2066,453l-1350 4429c-662,-202 -1324,-353 -1990,-450z" />
                            <path className="bordesvg" d="M19100 11147l-2629 4187 -167 -30c-7,-2 17,-40 11,-43 -624,-290 -1246,-539 -1868,-743l1316 -4579c1068,310 2256,727 3337,1208z" />
                            <path id="5" className="none" d="M18859 11235l-2555 4069c-657,-313 -1312,-578 -1967,-794l1389 -4428c1038,301 2082,686 3133,1153z" />
                            <path className="bordesvg" d="M7948 9285c302,-39 606,-76 913,-99l58 422 -923 136 -48 -459z" />
                            <path className="fil3" d="M7981 9425c290,-36 590,-67 885,-89l33 248 -888 131 -30 -290z" />
                            <path className="fil0" d="M981 11088c6468,-3420 12863,-3457 19242,50l8 -924c-382,-9853 -18818,-10312 -19273,0l23 874z" />
                            <path className="fil1" d="M1179 10890c6409,-3376 12745,-3413 19066,50l8 -913c-379,-9726 -18646,-10179 -19097,0l23 863z" />
                            <path className="fil1" d="M5305 3885l-985 -2012c294,-56 591,-187 890,-385 390,-77 757,-250 1104,-505 374,-86 528,-119 924,-275 2212,-309 4621,-438 6903,26 336,213 693,383 1070,514 309,267 679,435 1065,578 268,183 544,338 829,453l-889 1761c-3742,-1288 -7392,-1278 -10911,-155z" />
                            <path className="bordesvg" d="M6403 1503l873 -225 223 1757c-700,129 -1518,325 -2215,539 -3,1 -4,4 -7,4l-89 -1 -462 -1014 1274 -266 -129 -389 579 -143 -47 -262z" />
                            <path id="6" className="none" d="M6461 1510l818 -210 220 1735c-718,133 -1515,321 -2223,543l-467 -1023 1256 -263 -128 -383 570 -141 -46 -258z" />
                            <path className="bordesvg" d="M15150 1594l-883 -223 -197 1742c728,135 1477,330 2196,555l135 -67 426 -946 -1275 -267 130 -388 -579 -143 47 -263z" />
                            <path id="7" className="none" d="M15080 1600l-818 -210 -219 1735c718,133 1515,321 2223,543l467 -1023 -1256 -263 128 -382 -571 -141 46 -259z" />
                            <path className="bordesvg" d="M7586 1224l2146 -222 72 1773c-752,20 -1250,80 -1982,197 -3,1 -5,5 -7,5l-41 0 -188 -1753z" />
                            <path id="8" className="none" d="M7627 1235l2105 -219 72 1759c-757,20 -1243,82 -1990,202l-187 -1742z" />
                            <path className="bordesvg" d="M13823 3074l2 -33 88 -1234 -233 -19 -9 -281 -257 -12 7 -330 -1880 -165 -20 1772c758,44 1471,149 2236,297 5,1 10,4 15,4l51 1z" />
                            <path id="9" className="none" d="M13772 3074l89 -1265 -229 -19 -10 -276 -252 -12 6 -326 -1837 -163 -27 1777c384,22 755,55 1126,101 372,47 745,106 1134,183z" />
                            <path className="bordesvg" d="M6414 4140l157 1296 -1188 280 -75 -22 -213 -1165c424,-141 897,-281 1319,-389z" />
                            <path id="10" className="none" d="M6421 4195l205 1267 -1249 255 -211 -1153c419,-140 837,-262 1255,-369z" />
                            <path className="bordesvg" d="M14758 4006l-183 1285 1163 237 59 45 39 -13 214 -1177c-423,-140 -870,-269 -1292,-377z" />
                            <path id="11" className="none" d="M14753 4051l-205 1267 1249 255 211 -1153c-419,-140 -837,-262 -1255,-369z" />
                            <path className="bordesvg" d="M8329 8104l-480 -4266c-346,61 -731,139 -1078,219l577 4200 48 2c0,0 -1,0 0,0 308,-56 619,-111 933,-155z" />
                            <path id="12" className="none" d="M8367 8103l-513 -4217c-343,61 -686,131 -1029,211l571 4162c320,-59 643,-111 971,-156z" />
                            <path className="bordesvg" d="M12860 7959l510 -4261c346,61 733,137 1080,218l-598 4196 -30 3c-2,0 -3,-2 -5,-3 -315,-58 -634,-109 -957,-153z" />
                            <path id="13" className="none" d="M12851 7959l513 -4217c343,61 686,131 1029,210l-571 4163c-320,-59 -644,-111 -971,-156z" />
                            <path className="bordesvg" d="M9703 3597l273 4340c-422,28 -839,67 -1250,116 -3,1 -6,5 -9,4l-35 -1 -501 -4273c501,-79 1023,-141 1522,-186z" />
                            <path id="14" className="none" d="M9705 3642l291 4295c-432,29 -859,69 -1280,120l-496 -4232c496,-78 991,-139 1485,-183z" />
                            <path className="bordesvg" d="M11540 3453l-296 4339c425,28 849,67 1263,117 5,0 14,4 14,4l21 -3 12 -93 525 -4171c-501,-80 -1040,-148 -1539,-193z" />
                            <path id="15" className="none" d="M11532 3497l-291 4296c433,29 859,69 1280,120l497 -4232c-496,-79 -992,-139 -1486,-184z" />
                            <path className="bordesvg" d="M1994 7842c-49,775 -96,1517 -144,2292l102 9c8,1 3,-36 9,-38 566,-234 1096,-544 1666,-773l-515 -2314c-255,290 -676,602 -1118,824z" />
                            <path id="16" className="none" d="M2096 7843c-48,767 -96,1533 -144,2300 571,-307 1158,-582 1761,-825l-584 -2229c-252,287 -595,535 -1033,754z" />
                            <path className="bordesvg" d="M19152 7697c48,774 95,1524 144,2298l-74 4c-3,0 0,-20 -2,-21 -553,-294 -1120,-557 -1702,-792l537 -2280c254,290 655,569 1097,791z" />
                            <path id="17" className="none" d="M19077 7699c49,767 97,1533 145,2300 -571,-307 -1158,-582 -1761,-825l584 -2229c252,287 595,535 1032,754z" />
                            <path className="bordesvg" d="M3216 6846l707 2363 85 -5c4,0 2,-19 6,-20 482,-177 1094,-382 1578,-517l-763 -4060c-140,50 -346,137 -486,191 -137,343 -372,604 -775,725 12,514 -104,949 -352,1323z" />
                            <path id="18" className="none" d="M3306 6857l702 2347c489,-182 1140,-402 1650,-544l-820 -3984c-139,50 -278,101 -417,154 -135,340 -368,597 -767,717 12,510 -102,940 -348,1310z" />
                            <path className="bordesvg" d="M17954 6721l-718 2336 -70 3c-2,0 -17,-15 -26,-19 -484,-177 -1099,-384 -1587,-520l792 -4041c141,50 196,73 336,127 137,343 557,603 960,724 -13,515 65,1017 313,1390z" />
                            <path id="19" className="none" d="M17867 6713l-701 2347c-489,-182 -1140,-403 -1650,-545l820 -3983c139,49 174,61 313,114 135,340 529,614 927,734 -12,510 46,963 291,1333z" />
                            <path className="bordesvg" d="M12494 9641l639 139 136 -398c-245,-46 -491,-77 -736,-107l-39 366z" />
                            <path className="fil3" d="M12517 9605l598 130 107 -310c-230,-43 -445,-77 -675,-105l-30 285z" />
                            <path className="fil6" d="M6885 16668l-504 -849c2903,-1211 5818,-1148 8744,97l-475 853c-2678,-504 -5264,-513 -7765,-101z" />
                            <polygon className="fil7" points="9250,15549 9250,15617 9024,15617 9024,15729 9227,15729 9227,15792 9024,15792 9024,15906 9257,15906 9257,15973 8953,15973 8953,15549 " />
                            <path  className="fil7" d="M9477 15605c-21,0 -38,4 -51,13 -14,8 -20,21 -20,38 0,18 6,31 20,40 13,9 41,19 85,29 43,11 76,25 98,44 22,19 33,47 33,84 0,37 -14,67 -42,90 -28,23 -64,35 -109,35 -67,0 -125,-23 -177,-69l45 -54c43,38 87,56 133,56 23,0 42,-5 55,-15 14,-10 21,-23 21,-39 0,-16 -7,-29 -20,-38 -12,-9 -34,-18 -65,-25 -31,-8 -55,-14 -71,-21 -16,-6 -31,-14 -43,-24 -25,-19 -38,-48 -38,-88 0,-39 15,-69 43,-90 28,-21 64,-32 106,-32 27,0 54,5 80,13 27,9 50,22 69,38l-38 54c-12,-11 -29,-21 -51,-28 -21,-7 -42,-11 -63,-11z" />
                            <path  className="fil7" d="M9924 15908c24,0 46,-4 63,-12 18,-9 37,-22 56,-40l46 47c-45,50 -99,75 -163,75 -64,0 -117,-21 -159,-62 -43,-41 -64,-93 -64,-156 0,-63 22,-116 65,-158 43,-42 97,-63 163,-63 65,0 120,24 164,73l-45 49c-20,-19 -40,-32 -57,-40 -18,-8 -40,-12 -64,-12 -43,0 -79,14 -108,42 -29,28 -43,63 -43,106 0,43 14,79 43,108 29,29 63,43 103,43z" />
                            <polygon className="fil7" points="10474,15549 10474,15617 10248,15617 10248,15729 10451,15729 10451,15792 10248,15792 10248,15906 10481,15906 10481,15973 10176,15973 10176,15549 " />
                            <polygon  className="fil7" points="10890,15549 10961,15549 10961,15973 10884,15973 10644,15664 10644,15973 10573,15973 10573,15549 10644,15549 10890,15866 " />
                            <path  className="fil7" d="M11139 15877l-42 96 -77 0 187 -424 76 0 187 424 -77 0 -42 -96 -212 0zm183 -66l-77 -175 -77 175 154 0z" />
                            <path  className="fil7" d="M11867 15687c0,70 -31,114 -92,132l111 154 -91 0 -101 -142 -94 0 0 142 -71 0 0 -424 157 0c65,0 111,11 139,33 28,22 42,57 42,105zm-178 79c40,0 68,-7 82,-19 15,-13 22,-33 22,-60 0,-28 -7,-47 -22,-57 -15,-11 -42,-16 -80,-16l-91 0 0 152 89 0z" />
                            <polygon  className="fil7" points="11970,15549 12041,15549 12041,15973 11970,15973 " />
                            <path className="fil7" d="M12461 15649c-29,-30 -65,-44 -107,-44 -42,0 -77,14 -106,44 -29,30 -43,67 -43,109 0,43 14,79 43,109 29,30 64,45 106,45 42,0 78,-15 107,-45 28,-30 43,-66 43,-109 0,-42 -15,-79 -43,-109zm52 265c-43,42 -96,63 -159,63 -63,0 -116,-21 -158,-63 -43,-41 -65,-93 -65,-156 0,-62 22,-114 65,-156 42,-42 95,-63 158,-63 63,0 116,21 159,63 43,42 64,94 64,156 0,63 -21,115 -64,156z" />

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