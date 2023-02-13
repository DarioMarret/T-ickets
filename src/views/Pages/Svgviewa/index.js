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
                        <svg xmlns="http://www.w3.org/2000/svg" className="mapanuevo d-none" width="90%" height="90%" version="1.1"
                            viewBox="0 0 21000 19700"
                        >

                            <path className="machfil0" d="M17018 6505l-3976 -676c-804,-122 -1736,-208 -2547,-111 -2299,278 -4196,1057 -5399,2715l-4497 6660c160,1285 386,2712 3471,3284l4754 834c3170,170 5705,-599 7288,-2775l3696 -5553c666,-818 600,-1677 456,-2371 -80,-381 -189,-757 -366,-1140 -359,-777 -1750,-725 -2880,-867z" />
                            <path className="machfil1" d="M16924 6249l-3993 -678c-807,-123 -1743,-210 -2557,-112 -2310,279 -4215,1061 -5423,2727l-4516 6689c161,1290 387,2723 3486,3297l4774 838c3184,171 5730,-602 7319,-2787l3713 -5577c668,-822 603,-1684 457,-2381 -80,-383 -189,-760 -367,-1145 -360,-780 -1757,-728 -2893,-871z" />
                            <path className="machfil1" d="M16696 5298l-4016 -682c-812,-123 -1753,-210 -2572,-112 -2323,280 -4239,1067 -5454,2742l-3472 5252c-1633,2259 -680,4215 2437,4792l4808 838c3084,282 5178,-702 6958,-2224 398,-340 490,-474 779,-905l3478 -5204c1444,-2751 -407,-3931 -2946,-4497z" />
                             <path className="machfil3" d="M16712 5316l-4011 -681c-811,-123 -1751,-211 -2569,-112 -2319,280 -4233,1066 -5447,2739l-599 907 2279 2256 4189 1382 8136 -557 965 -1443c1442,-2747 -407,-3926 -2943,-4491z" />
                            <path className="machfil1" d="M15612 6209l-3376 -573c-682,-104 -1473,-177 -2161,-94 -1952,235 -3563,896 -4584,2304l-2918 4414c-1373,1899 -572,3543 2048,4028l4041 705c2592,236 4352,-590 5848,-1870 335,-286 412,-398 655,-760l2923 -4374c1214,-2312 -342,-3305 -2476,-3780z" />
                            <path className="machfil4" d="M15627 6278l-3362 -571c-679,-104 -1467,-177 -2152,-94 -1944,235 -3548,893 -4565,2295l-2906 4395c-1367,1891 -569,3528 2039,4011l4025 702c2581,235 4334,-588 5823,-1861 334,-286 411,-397 652,-758l2912 -4356c1208,-2302 -341,-3290 -2466,-3763z" />
                            <polygon className="machfil5" points="11709,15775 13658,12786 13614,12760 5410,11412 3253,14434 " />

                            <polygon  className="machfil4 " points="11679,15669 13616,12760 5440,11331 3305,14353 " />

                            <polygon className="machfil7 machr0" points="7525,8211 15722,9446 15773,9476 13889,12426 5437,11015 " />

                            <polygon id="mapas1" className=" opciones" points="7497,8167 15722,9446 13832,12353 5458,10981 " />

                            <polygon className="machfil7 machr1" points="9766,6864 8152,7807 15580,8941 16401,7913 16364,7862 " />
                            <polygon className="machfil0 machr1" points="8946,6665 8115,7746 15543,8880 16348,7859 " />


                            <polygon className="machfil9 ecenario" points="10402,7164 10356,7258 10062,7210 9985,7366 10249,7409 10205,7497 9942,7454 9864,7612 10167,7661 10121,7755 9725,7690 10015,7101 " />
                            <path className="machfil9 ecenario" d="M10659 7289c-27,-4 -52,-2 -76,7 -23,9 -40,26 -52,50 -12,23 -12,43 -1,59 11,15 41,35 91,58 49,24 81,51 97,83 15,31 11,72 -15,123 -25,52 -64,90 -116,117 -52,26 -107,34 -166,25 -86,-14 -147,-59 -182,-133l95 -65c30,60 75,95 135,105 30,5 57,2 81,-9 25,-11 43,-28 54,-50 11,-23 11,-42 1,-58 -10,-15 -33,-31 -68,-48 -36,-17 -62,-31 -78,-44 -17,-12 -30,-26 -39,-43 -20,-31 -16,-75 11,-129 26,-55 66,-94 117,-117 52,-24 105,-31 159,-22 36,6 68,18 96,36 29,18 50,40 64,66l-86 67c-9,-18 -25,-35 -48,-49 -22,-15 -47,-24 -74,-29z" />
                            <path className="machfil9 ecenario" d="M11032 7805c32,5 62,4 91,-4 29,-8 62,-22 100,-43l27 75c-92,60 -180,83 -263,69 -83,-13 -138,-53 -165,-119 -27,-67 -18,-143 25,-231 43,-88 107,-156 192,-206 84,-49 170,-67 255,-53 85,14 140,59 164,136l-93 59c-13,-31 -29,-54 -47,-68 -18,-15 -43,-24 -74,-30 -56,-9 -112,3 -169,36 -57,32 -100,78 -129,138 -30,60 -36,113 -18,159 18,46 52,74 104,82z" />
                            <polygon className="machfil9 ecenario" points="11993,7422 11947,7515 11653,7468 11576,7624 11840,7666 11796,7755 11533,7712 11455,7870 11758,7919 11712,8012 11316,7948 11606,7359 " />
                            <polygon className="machfil9 ecenario" points="12534,7510 12627,7525 12337,8114 12236,8097 12136,7617 11924,8047 11831,8032 12121,7443 12214,7458 12317,7949 " />
                            <path className="machfil9 ecenario" d="M12633 8017l-121 125 -99 -16 533 -550 99 16 -48 629 -99 -16 11 -143 -276 -45zm283 -53l20 -259 -220 226 200 33z" />
                            <path className="machfil9 ecenario" d="M13709 7907c-48,97 -118,152 -209,164l38 238 -118 -20 -34 -219 -122 -20 -97 198 -93 -15 290 -589 205 33c84,14 136,39 158,75 21,36 15,88 -18,155zm-285 72c53,8 93,5 120,-9 28,-14 51,-41 70,-79 19,-39 22,-67 10,-84 -12,-18 -43,-30 -93,-39l-118 -19 -104 211 115 19z" />
                            <polygon className="machfil9 ecenario" points="13937,7737 14030,7752 13740,8341 13647,8326 " />
                            <path className="machfil9 ecenario" d="M14507 7980c-17,-48 -53,-76 -107,-85 -55,-9 -111,4 -169,40 -58,35 -102,83 -131,142 -29,59 -35,113 -18,160 17,48 53,76 107,85 55,9 111,-4 169,-40 58,-35 102,-83 131,-142 29,-59 35,-113 18,-160zm-113 379c-85,49 -168,67 -250,54 -82,-13 -136,-53 -163,-121 -27,-67 -19,-144 24,-231 42,-86 106,-154 190,-204 85,-49 168,-67 250,-53 81,13 136,53 163,120 27,68 19,145 -24,231 -43,87 -106,155 -190,204z" />
                            <path className="machfil9 d-none golden " d="M8270 9890l93 15 -99 201c-82,53 -171,72 -268,56 -81,-13 -135,-53 -162,-119 -27,-66 -18,-143 25,-231 43,-88 107,-156 192,-205 84,-50 166,-68 246,-55 79,13 133,48 161,106l-87 68c-12,-23 -27,-40 -45,-52 -18,-11 -42,-19 -70,-23 -56,-9 -112,2 -169,35 -57,32 -101,80 -132,142 -30,63 -37,116 -19,160 18,44 53,70 106,79 52,8 102,3 149,-15l79 -162z" />
                            <path className="machfil9 d-none golden" d="M8959 9825c-17,-48 -53,-76 -108,-85 -54,-9 -111,4 -169,40 -58,35 -101,83 -131,142 -29,59 -35,113 -18,160 17,48 53,76 108,85 54,9 110,-4 169,-40 58,-35 101,-83 130,-142 30,-59 36,-113 19,-160zm-114 380c-84,49 -167,67 -249,53 -82,-13 -137,-53 -164,-120 -27,-68 -19,-145 24,-231 43,-87 106,-155 191,-204 84,-49 167,-67 249,-54 82,13 136,53 163,121 27,67 19,144 -23,231 -43,86 -107,154 -191,204z" />
                            <polygon className="machfil9 d-none golden" points="9006,10318 9296,9729 9389,9744 9145,10239 9396,10280 9350,10374 " />
                            <path className="machfil9 d-none golden" d="M9931 9832c99,16 162,54 190,114 27,60 19,136 -27,228 -45,91 -106,159 -184,204 -78,46 -170,59 -276,42l-182 -29 290 -590 189 31zm68 329c67,-135 28,-214 -116,-238l-93 -15 -199 404 103 17c66,11 126,2 178,-26 52,-29 95,-76 127,-142z" />
                            <polygon className="machfil9 d-none golden" points="10745,9964 10698,10058 10405,10010 10328,10166 10592,10209 10548,10297 10284,10254 10207,10412 10510,10461 10464,10555 10067,10490 10358,9901 " />
                            <polygon className="machfil9 d-none golden" points="11286,10052 11379,10067 11088,10656 10987,10640 10887,10159 10675,10589 10583,10574 10873,9985 10966,10000 11069,10492 " />
                            <path className="machfil9 d-none golden" d="M11698 10755l-241 -39 290 -590 214 35c38,6 67,16 90,30 22,14 36,30 41,49 10,34 6,70 -13,109 -23,46 -53,78 -92,96 -13,6 -23,10 -27,11 -5,2 -13,4 -25,7 30,13 50,34 57,62 8,29 3,61 -15,98 -20,41 -51,75 -93,103 -49,31 -111,41 -186,29zm22 -369l118 19c67,11 113,-8 137,-57 14,-28 15,-50 5,-65 -10,-15 -32,-25 -66,-30l-119 -20 -75 153zm-125 253l146 23c34,6 63,4 87,-4 23,-9 43,-29 59,-61 26,-52 -1,-85 -79,-97l-134 -22 -79 161z" />
                            <path className="machfil9 d-none golden" d="M12627 10419c-17,-47 -53,-76 -107,-84 -55,-9 -111,4 -169,40 -58,35 -102,82 -131,142 -29,59 -35,112 -18,160 17,48 53,76 107,85 55,9 111,-5 169,-40 58,-36 102,-83 131,-142 29,-60 35,-113 18,-161zm-113 380c-85,49 -168,67 -250,54 -82,-13 -136,-54 -163,-121 -27,-67 -19,-144 24,-231 42,-87 106,-155 190,-204 85,-49 168,-67 250,-53 82,13 136,53 163,120 27,67 19,144 -24,231 -43,87 -106,155 -190,204z" />
                            <polygon className="machfil9 d-none" points="12981,10963 12955,10719 12951,10718 12706,10918 12590,10899 12928,10627 12894,10312 13009,10331 13034,10550 13038,10550 13258,10371 13373,10390 13057,10648 13097,10981 " />
                            <polygon className="machfil10 d-none vip" points="7910,13769 7806,13752 7876,13127 7979,13144 7932,13611 8318,13199 8422,13216 " />
                            <polygon className="machfil10 d-none vip" points="8501,13228 8594,13244 8303,13833 8211,13818 " />
                            <path className="machfil10 d-none vip" d="M8936 13299c83,13 136,40 157,81 21,40 15,96 -21,168 -35,71 -80,120 -136,147 -55,27 -123,34 -204,21l-98 -16 -85 173 -93 -16 291 -589 189 31zm-149 328c51,8 91,4 120,-15 29,-18 54,-47 74,-88 20,-40 23,-71 7,-92 -15,-21 -48,-35 -98,-43l-95 -15 -116 236 108 17z" />
                            <path className="machfil11 d-none general" d="M1843 12490l55 -83 169 111c21,81 2,164 -55,251 -48,73 -113,118 -193,135 -81,18 -158,2 -231,-46 -74,-49 -118,-114 -134,-197 -16,-83 0,-159 47,-230 47,-71 107,-117 179,-136l34 86c-29,8 -53,20 -72,36 -20,15 -38,36 -55,61 -33,50 -45,103 -35,158 10,55 41,100 93,135 53,35 106,46 160,34 53,-12 95,-41 126,-88 31,-47 47,-93 48,-137l-136 -90zm104 -707l78 52 -174 263 131 86 156 -236 74 49 -156 236 132 88 180 -272 78 52 -235 355 -494 -327 230 -346zm321 -485l55 -84 494 327 -60 90 -545 42 360 238 -55 83 -494 -326 55 -84 559 -42 -369 -244zm375 -567l79 52 -175 263 131 86 157 -236 74 49 -157 237 132 87 180 -272 78 52 -235 355 -493 -327 229 -346zm498 -403c81,54 109,123 83,208l265 -10 -70 106 -244 8 -73 109 166 110 -55 83 -493 -326 121 -184c50,-75 98,-121 145,-136 47,-16 99,-5 155,32zm-46 267c32,-47 45,-83 42,-110 -3,-27 -21,-51 -53,-72 -33,-21 -60,-27 -84,-18 -23,10 -50,37 -80,81l-70 106 177 117 68 -104zm392 -311l80 124 -59 89 -350 -544 59 -89 638 109 -59 89 -145 -25 -164 247zm64 -264l-262 -45 144 224 118 -179zm349 -115l-493 -327 55 -83 414 274 149 -225 79 52 -204 309z" />
                            <path className="machfil11 d-none general" d="M15529 14938l56 -83 168 111c21,81 2,165 -55,251 -48,73 -113,118 -193,136 -81,17 -158,1 -231,-47 -74,-49 -118,-114 -134,-197 -16,-82 0,-159 47,-230 47,-71 107,-117 179,-136l34 86c-29,9 -53,20 -72,36 -20,15 -38,36 -55,62 -33,50 -45,102 -35,157 10,56 41,101 94,135 52,35 105,46 159,34 53,-11 95,-41 126,-88 32,-46 47,-92 48,-137l-136 -90zm104 -707l78 52 -174 263 131 87 156 -237 74 49 -156 237 132 87 180 -272 78 52 -235 355 -493 -327 229 -346zm321 -485l55 -83 494 326 -60 91 -545 41 360 238 -55 83 -494 -326 55 -84 559 -42 -369 -244zm375 -567l79 52 -175 263 131 87 157 -237 74 49 -157 237 132 87 180 -272 79 52 -236 355 -493 -326 229 -347zm498 -403c81,54 109,123 83,208l265 -10 -70 106 -244 8 -73 109 166 110 -55 84 -493 -327 121 -184c50,-75 98,-120 145,-136 47,-16 99,-5 155,32zm-46 268c32,-47 46,-84 42,-111 -3,-26 -21,-50 -53,-72 -32,-21 -60,-27 -84,-18 -23,10 -50,37 -80,82l-70 106 177 116 68 -103zm392 -312l80 124 -59 89 -350 -544 59 -89 638 109 -59 89 -145 -25 -164 247zm65 -264l-263 -45 144 225 119 -180zm348 -115l-493 -327 55 -83 414 274 149 -225 79 52 -204 309z" />
                            <path className="machfil11 d-none general" d="M4430 16867l98 15 -30 200c-64,52 -148,71 -250,56 -87,-13 -155,-53 -205,-118 -50,-66 -68,-142 -55,-230 13,-87 54,-155 122,-204 68,-49 144,-67 229,-55 84,13 150,48 199,106l-64 67c-20,-23 -41,-40 -63,-51 -22,-11 -49,-19 -79,-23 -60,-9 -112,2 -158,35 -46,32 -74,79 -83,141 -9,63 3,115 36,159 34,44 78,69 134,78 55,8 103,3 144,-15l25 -161zm693 -188l-15 93 -312 -53 -26 154 280 48 -15 87 -280 -47 -26 156 321 55 -16 92 -420 -71 99 -583 410 69zm574 98l98 16 -99 584 -107 -18 -258 -482 -72 425 -99 -16 99 -584 99 17 265 493 74 -435zm670 113l-16 93 -311 -53 -26 155 279 47 -15 88 -279 -48 -27 156 322 55 -16 93 -420 -72 99 -583 410 69zm570 292c-17,96 -69,150 -157,161l116 238 -125 -22 -106 -220 -129 -21 -34 196 -98 -17 99 -584 217 37c89,15 150,41 184,78 33,36 44,88 33,154zm-263 67c55,9 95,7 118,-7 22,-13 37,-39 44,-78 6,-38 0,-66 -18,-83 -18,-18 -54,-31 -106,-40l-126 -21 -35 208 123 21zm443 232l-81 123 -105 -18 356 -539 105 17 158 628 -105 -18 -36 -143 -292 -50zm267 -48l-65 -258 -147 222 212 36zm247 273l134 -577 97 23 -112 484 263 61 -22 92 -360 -83z" />

                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" viewBox="0 0 925 753">
                            <defs>
                                <filter id="filter" x="96" y="102" width="718.75" height="489.062" filterUnits="userSpaceOnUse">
                                    <feOffset result="offset" dx="-3.611" dy="-4.792" in="SourceAlpha" />
                                    <feGaussianBlur result="blur" />
                                    <feFlood result="flood" flood-color="#121012" flood-opacity="0.54" />
                                    <feComposite result="composite" operator="in" in2="blur" />
                                    <feBlend result="blend" in="SourceGraphic" />
                                </filter>
                                <path id="text-path" />
                            </defs>
                            <path id="" data-name="Rectángulo redondeado 1 copia 2" class="cls-1" d="M474.671,69.372L789.74,126.389c95.084,17.208,127.748,108.019,73.317,203.479L739.124,547.222c-55.531,97.39-179.774,164.48-277.886,149.2l-325.2-50.663C34.55,629.944-.028,535.725,59.2,436L191.342,213.5C249.363,115.808,376.381,51.584,474.671,69.372Z" />
                            <path id="" data-name="Rectángulo redondeado 1" class="cls-2" d="M455.674,61.865l326.144,41.024c101.182,12.726,136.2,97.924,78,189.8l-130.094,205.4c-57.671,91.051-184.669,151.831-282.7,138.034L128.48,591.287C31.8,577.679-2.215,494.867,52.318,405.855L176.261,203.547C231.265,113.765,355.922,49.318,455.674,61.865Z" />
                            <path id="" data-name="Rectángulo redondeado 1 copia" class="cls-3" d="M462.535,109.113l268.488,37.106c82.615,11.417,108.38,83.408,57.914,160.071l-111.906,170C627.771,551.121,523.4,600.758,444,589.473L183.936,552.506c-79.574-11.31-107.159-80.115-61.3-154.358L227.726,228.036C274.7,152,379.76,97.674,462.535,109.113Z" />
                            <path id="" data-name="Rectángulo 1" class="cls-4" d="M342.2,204.943L694.108,249.9,528.719,521.178,167.451,471.054Z" />
                            <path id="" data-name="Rectángulo 2" class="cls-4" d="M392.789,138.047l321.342,41.1-33.316,45.521L360.047,182.918Z" />
                            <path id="" data-name="Rectángulo 2 copia" class="cls-5" d="M392.789,134.047l321.342,41.1-33.316,45.521L360.047,178.918Z" />
                            <path id="1" data-name="none" class="cls-6" d="M341.2,201.943L693.108,246.9,527.719,518.178,166.451,468.054Z" />
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