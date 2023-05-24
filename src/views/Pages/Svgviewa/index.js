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
                        <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" version="1.1" className="mapanuevo"
                            viewBox="0 0 21000 29700"
                        >


                            <ellipse className="fil0" cx="10242.86" cy="15284.64" rx="9241.73" ry="6238.09" />
                            <ellipse className="fila12" cx="10282.98" cy="15267.31" rx="8717.09" ry="6179.28" />
                            <path className="none" d="M10227.28 9194.62c1702.58,0 3288.88,352.51 4621.91,960.11l0 1939.62c-1287.74,-550 -2796.29,-866.6 -4409.38,-866.6 -1803.66,0 -3476.72,395.62 -4856.41,1071.02l0 -2133.84c1337.59,-613.79 2931.91,-970.31 4643.88,-970.31z" />
                            <path className="none" d="M10217.71 21369.62c1702.58,0 3288.88,-352.51 4621.91,-960.11l0 -1939.62c-1287.74,550 -2796.29,866.6 -4409.38,866.6 -1803.66,0 -3476.72,-395.62 -4856.41,-1071.02l0 2133.84c1337.59,613.79 2931.91,970.31 4643.88,970.31z" />
                            <path className="none" d="M14209.97 18612.15c-1116.86,337.11 -2473.86,610.42 -3859.66,610.42 -1385.8,0 -2648.38,-317.42 -3856.47,-727.8l0 -871.16c1201.89,405.27 2502.66,724.98 3888.37,724.98 1385.71,0 2704.7,-281.7 3827.76,-623.46l0 887.02zm-12381.06 -5403.67l4.65 -56.32c2.73,18.86 6.29,37.54 9.38,56.32l-14.03 0z" />
                            <path className="none" d="M14054.86 11920.92c-1116.86,-337.11 -2473.86,-610.42 -3859.66,-610.42 -1385.8,0 -2648.39,317.42 -3856.47,727.8l0 871.16c1201.89,-405.27 2502.66,-724.97 3888.37,-724.97 1385.7,0 2704.7,281.69 3827.76,623.45l0 -887.02zm-12381.06 5403.67l4.65 56.32c2.73,-18.86 6.28,-37.54 9.38,-56.32l-14.03 0z" />
                            <rect className="fila13 str0" x="6532.32" y="13351.06" width="7627.45" height="3722.26" />
                            <ellipse className="fil1 str0" cx="10323.38" cy="15225.91" rx="847.49" ry="926.89" />
                            <polygon className="fil str0" points="10325.86,13341.85 10325.86,17073.31 " />
                            <rect className="fil6 str0" x="6532.32" y="14475.87" width="301.02" height="1500.67" />
                            <rect className="fil6 str0" x="13847.6" y="14470.88" width="301.02" height="1500.67" />

                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="90%" height="90%" version="1.1" className="mapanuevo d-none"
                            viewBox="0 0 21000 16000"
                            >

                            <g id="Capa_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer" />
                                <path className="lineas0" d="M17088 2485l-3976 -676c-804,-122 -1736,-208 -2547,-111 -2299,278 -4196,1057 -5399,2715l-4497 6660c160,1285 386,2712 3471,3284l4754 834c3170,170 5705,-599 7288,-2775l3696 -5553c666,-818 600,-1677 456,-2371 -80,-381 -189,-757 -366,-1140 -359,-777 -1750,-725 -2880,-867z" />
                                <path className="lineas1" d="M16994 2229l-3993 -678c-807,-123 -1743,-210 -2557,-112 -2310,279 -4215,1061 -5423,2727l-4516 6689c161,1290 387,2723 3486,3297l4774 838c3184,171 5730,-602 7319,-2787l3713 -5577c668,-822 603,-1684 457,-2381 -80,-383 -189,-760 -367,-1145 -360,-780 -1757,-728 -2893,-871z" />
                                <path className="lineas2 " d="M16766 1278l-4016 -682c-812,-123 -1753,-210 -2572,-112 -2323,280 -4239,1067 -5454,2742l-3472 5252c-1633,2259 -680,4215 2437,4792l4808 838c3084,282 5178,-702 6958,-2224 398,-340 490,-474 779,-905l3478 -5204c1444,-2751 -407,-3931 -2946,-4497z" />
                                <path className="none activo" d="M16784 1276l-4007 -681c-809,-123 -1749,-210 -2565,-112 -1419,172 -2686,532 -3733,1170 1043,-628 2301,-984 3709,-1154 818,-99 1758,-11 2569,112l4011 681c2532,564 4379,1741 2949,4479l7 -9c1440,-2744 -407,-3923 -2940,-4486zm-12632 2879l-2845 4303c-1629,2253 -678,4205 2431,4780l4797 837c3077,281 5166,-700 6941,-2219 398,-339 490,-472 777,-903l2492 -3727 -8135 557 -4189 -1382 -2269 -2246z" />
                                <path className="lineas4" d="M16782 1296l-4011 -681c-811,-123 -1751,-211 -2569,-112 -2319,280 -4233,1066 -5447,2739l-599 907 2279 2256 4189 1382 8136 -557 965 -1443c1442,-2747 -407,-3926 -2943,-4491z" />
                                <path className="lineas2" d="M15682 2189l-3376 -573c-682,-104 -1473,-177 -2161,-94 -1952,235 -3563,896 -4584,2304l-2918 4414c-1373,1899 -572,3543 2048,4028l4041 705c2592,236 4352,-590 5848,-1870 335,-286 412,-398 655,-760l2923 -4374c1214,-2312 -342,-3305 -2476,-3780z" />
                                <path className="lineas5" d="M15697 2258l-3362 -571c-679,-104 -1467,-177 -2152,-94 -1944,235 -3548,893 -4565,2295l-2906 4395c-1367,1891 -569,3528 2039,4011l4025 702c2581,235 4334,-588 5823,-1861 334,-286 411,-397 652,-758l2912 -4356c1208,-2302 -341,-3290 -2466,-3763z" />
                                <path className="lineas6 LINR0" d="M8901 3154l6771 1289c317,114 464,382 331,644l-4160 6482c-51,71 -60,92 -108,143 -311,336 -691,448 -1083,402l-6208 -1139c-474,-130 -867,-613 -652,-1038l4194 -6532c164,-192 388,-310 915,-251z" />
                                <path className=" none  activo" id="elecion" d="M8863 2993l6772 1289c316,114 464,382 330,644l-4160 6482c-51,71 -59,91 -107,143 -312,336 -691,448 -1084,401l-6208 -1138c-474,-130 -867,-613 -652,-1038l4195 -6532c163,-192 387,-310 914,-251z" />
                                <polygon className="lineas8 LINR2" points="9607,2814 8835,4004 15015,4825 15711,3607 " />
                                <polygon className="lineas9 LINR2" points="9660,2731 8910,3906 14878,4748 15547,3584 " />
                                <polygon className="lineas10" points="10472,3144 10426,3238 10132,3190 10055,3346 10319,3389 10275,3477 10012,3434 9934,3592 10237,3641 10191,3735 9795,3670 10085,3081 " />
                                <path id="_1" className="lineas10" d="M10729 3269c-27,-4 -52,-2 -76,7 -23,9 -40,26 -52,50 -12,23 -12,43 -1,59 11,15 41,35 91,58 49,24 81,51 97,83 15,31 11,72 -15,123 -25,52 -64,90 -116,117 -52,26 -107,34 -166,25 -86,-14 -147,-59 -182,-133l95 -65c30,60 75,95 135,105 30,5 57,2 81,-9 25,-11 43,-28 54,-50 11,-23 11,-42 1,-58 -10,-15 -33,-31 -68,-48 -36,-17 -62,-31 -78,-44 -17,-12 -30,-26 -39,-43 -20,-31 -16,-75 11,-129 26,-55 66,-94 117,-117 52,-24 105,-31 159,-22 36,6 68,18 96,36 29,18 50,40 64,66l-86 67c-9,-18 -25,-35 -48,-49 -22,-15 -47,-24 -74,-29z" />
                                <path id="_2" className="lineas10" d="M11102 3785c32,5 62,4 91,-4 29,-8 62,-22 100,-43l27 75c-92,60 -180,83 -263,69 -83,-13 -138,-53 -165,-119 -27,-67 -18,-143 25,-231 43,-88 107,-156 192,-206 84,-49 170,-67 255,-53 85,14 140,59 164,136l-93 59c-13,-31 -29,-54 -47,-68 -18,-15 -43,-24 -74,-30 -56,-9 -112,3 -169,36 -57,32 -100,78 -129,138 -30,60 -36,113 -18,159 18,46 52,74 104,82z" />
                                <polygon id="_3" className="lineas10" points="12063,3402 12017,3495 11723,3448 11646,3604 11910,3646 11866,3735 11603,3692 11525,3850 11828,3899 11782,3992 11386,3928 11676,3339 " />
                                <polygon id="_4" className="lineas10" points="12604,3490 12697,3505 12407,4094 12306,4077 12206,3597 11994,4027 11901,4012 12191,3423 12284,3438 12387,3929 " />
                                <path id="_5" className="lineas10" d="M12703 3997l-121 125 -99 -16 533 -550 99 16 -48 629 -99 -16 11 -143 -276 -45zm283 -53l20 -259 -220 226 200 33z" />
                                <path id="_6" className="lineas10" d="M13779 3887c-48,97 -118,152 -209,164l38 238 -118 -20 -34 -219 -122 -20 -97 198 -93 -15 290 -589 205 33c84,14 136,39 158,75 21,36 15,88 -18,155zm-285 72c53,8 93,5 120,-9 28,-14 51,-41 70,-79 19,-39 22,-67 10,-84 -12,-18 -43,-30 -93,-39l-118 -19 -104 211 115 19z" />
                                <polygon id="_7" className="lineas10" points="14007,3717 14100,3732 13810,4321 13717,4306 " />
                                <path id="_8" className="lineas10" d="M14577 3960c-17,-48 -53,-76 -107,-85 -55,-9 -111,4 -169,40 -58,35 -102,83 -131,142 -29,59 -35,113 -18,160 17,48 53,76 107,85 55,9 111,-4 169,-40 58,-35 102,-83 131,-142 29,-59 35,-113 18,-160zm-113 379c-85,49 -168,67 -250,54 -82,-13 -136,-53 -163,-121 -27,-67 -19,-144 24,-231 42,-86 106,-154 190,-204 85,-49 168,-67 250,-53 81,13 136,53 163,120 27,68 19,145 -24,231 -43,87 -106,155 -190,204z" />
                                <g id="_2624438319712">
                                    <polygon className="lineas0 LINR3" points="8513,4357 9148,4411 8880,4825 8242,4762 " />
                                    <polygon className="lineas0 LINR3" points="9389,4515 10024,4568 9756,4982 9117,4920 " />
                                    <polygon className="lineas0 LINR3" points="10264,4672 10899,4726 10632,5140 9993,5077 " />
                                    <polygon className="lineas0 LINR3" points="11140,4830 11775,4883 11507,5297 10869,5235 " />
                                    <polygon className="lineas0 LINR3" points="12016,4987 12651,5041 12383,5455 11744,5392 " />
                                    <polygon className="lineas0 LINR3" points="12891,5145 13526,5198 13259,5612 12620,5550 " />
                                    <polygon className="lineas0 LINR3" points="13767,5302 14402,5356 14134,5770 13496,5707 " />
                                    <polygon className="lineas0 LINR3" points="8119,4938 8754,4992 8487,5406 7848,5343 " />
                                    <polygon className="lineas0 LINR3" points="8995,5096 9630,5149 9362,5564 8724,5501 " />
                                    <polygon className="lineas0 LINR3" points="9871,5253 10506,5307 10238,5721 9599,5658 " />
                                    <polygon className="lineas0 LINR3" points="10746,5411 11381,5464 11114,5879 10475,5816 " />
                                    <polygon className="lineas0 LINR3" points="11622,5568 12257,5622 11989,6036 11351,5973 " />
                                    <polygon className="lineas0 LINR3" points="12498,5726 13133,5779 12865,6194 12226,6131 " />
                                    <polygon className="lineas0 LINR3" points="13373,5883 14008,5937 13741,6351 13102,6288 " />
                                    <polygon className="lineas0 LINR3" points="7726,5520 8361,5573 8093,5987 7455,5924 " />
                                    <polygon className="lineas0 LINR3" points="8602,5677 9237,5730 8969,6145 8330,6082 " />
                                    <polygon className="lineas0 LINR3" points="9477,5835 10112,5888 9844,6302 9206,6239 " />
                                    <polygon className="lineas0 LINR3" points="10353,5992 10988,6045 10720,6460 10082,6397 " />
                                    <polygon className="lineas0 LINR3" points="11229,6150 11864,6203 11596,6617 10957,6554 " />
                                    <polygon className="lineas0 LINR3" points="12104,6307 12739,6360 12471,6775 11833,6712 " />
                                    <polygon className="lineas0 LINR3" points="12980,6465 13615,6518 13347,6932 12709,6869 " />
                                    <polygon className="lineas0 LINR3" points="7332,6101 7967,6154 7699,6568 7061,6506 " />
                                    <polygon className="lineas0 LINR3" points="8208,6258 8843,6312 8575,6726 7937,6663 " />
                                    <polygon className="lineas0 LINR3" points="9084,6416 9719,6469 9451,6883 8812,6821 " />
                                    <polygon className="lineas0 LINR3" points="9959,6573 10594,6627 10326,7041 9688,6978 " />
                                    <polygon className="lineas0 LINR3" points="10835,6731 11470,6784 11202,7198 10564,7136 " />
                                    <polygon className="lineas0 LINR3" points="11711,6888 12346,6942 12078,7356 11439,7293 " />
                                    <polygon className="lineas0 LINR3" points="12586,7046 13221,7099 12954,7513 12315,7451 " />
                                    <polygon className="lineas0 LINR3" points="6939,6682 7574,6735 7306,7150 6667,7087 " />
                                    <polygon className="lineas0 LINR3" points="7814,6839 8449,6893 8182,7307 7543,7244 " />
                                    <polygon className="lineas0 LINR3" points="8690,6997 9325,7050 9057,7465 8419,7402 " />
                                    <polygon className="lineas0 LINR3" points="9566,7154 10201,7208 9933,7622 9294,7559 " />
                                    <polygon className="lineas0 LINR3" points="10441,7312 11076,7365 10809,7780 10170,7717 " />
                                    <polygon className="lineas0 LINR3" points="11317,7469 11952,7523 11684,7937 11046,7874 " />
                                    <polygon className="lineas0 LINR3" points="12193,7627 12828,7680 12560,8095 11921,8032 " />
                                    <polygon className="lineas0 LINR3" points="6545,7263 7180,7316 6912,7731 6274,7668 " />
                                    <polygon className="lineas0 LINR3" points="7421,7421 8056,7474 7788,7888 7149,7825 " />
                                    <polygon className="lineas0 LINR3" points="8296,7578 8931,7631 8664,8046 8025,7983 " />
                                    <polygon className="lineas0 LINR3" points="9172,7736 9807,7789 9539,8203 8901,8140 " />
                                    <polygon className="lineas0 LINR3" points="10048,7893 10683,7946 10415,8361 9776,8298 " />
                                    <polygon className="lineas0 LINR3" points="10923,8051 11559,8104 11291,8518 10652,8455 " />
                                    <polygon className="lineas0 LINR3" points="11799,8208 12434,8261 12166,8676 11528,8613 " />
                                    <polygon className="lineas0 LINR3" points="6152,7844 6787,7898 6519,8312 5880,8249 " />
                                    <polygon className="lineas0 LINR3" points="7027,8002 7662,8055 7394,8469 6756,8407 " />
                                    <polygon className="lineas0 LINR3" points="7903,8159 8538,8213 8270,8627 7632,8564 " />
                                    <polygon className="lineas0 LINR3" points="8779,8317 9414,8370 9146,8784 8507,8722 " />
                                    <polygon className="lineas0 LINR3" points="9654,8474 10289,8528 10021,8942 9383,8879 " />
                                    <polygon className="lineas0 LINR3" points="10530,8632 11165,8685 10897,9099 10259,9037 " />
                                    <polygon className="lineas0 LINR3" points="11406,8789 12041,8843 11773,9257 11134,9194 " />
                                    <polygon className="lineas0 LINR3" points="5758,8425 6393,8479 6125,8893 5487,8830 " />
                                    <polygon className="lineas0 LINR3" points="6634,8583 7269,8636 7001,9051 6362,8988 " />
                                    <polygon className="lineas0 LINR3" points="7509,8740 8144,8794 7877,9208 7238,9145 " />
                                    <polygon className="lineas0 LINR3" points="8385,8898 9020,8951 8752,9366 8114,9303 " />
                                    <polygon className="lineas0 LINR3" points="9261,9055 9896,9109 9628,9523 8989,9460 " />
                                    <polygon className="lineas0 LINR3" points="10136,9213 10771,9266 10504,9681 9865,9618 " />
                                    <polygon className="lineas0 LINR3" points="11012,9370 11647,9424 11379,9838 10741,9775 " />
                                    <polygon className="lineas0 LINR3" points="5364,9007 5999,9060 5732,9474 5093,9411 " />
                                    <polygon className="lineas0 LINR3" points="6240,9164 6875,9217 6607,9632 5969,9569 " />
                                    <polygon className="lineas0 LINR3" points="7116,9322 7751,9375 7483,9789 6844,9726 " />
                                    <polygon className="lineas0 LINR3" points="7991,9479 8626,9532 8359,9947 7720,9884 " />
                                    <polygon className="lineas0 LINR3" points="8867,9637 9502,9690 9234,10104 8596,10041 " />
                                    <polygon className="lineas0 LINR3" points="9743,9794 10378,9847 10110,10262 9471,10199 " />
                                    <polygon className="lineas0 LINR3" points="10618,9952 11253,10005 10986,10419 10347,10356 " />
                                    <polygon className="lineas0 LINR3" points="4971,9588 5606,9641 5338,10055 4699,9993 " />
                                    <polygon className="lineas0 LINR3" points="5847,9745 6482,9799 6214,10213 5575,10150 " />
                                    <polygon className="lineas0 LINR3" points="6722,9903 7357,9956 7089,10370 6451,10308 " />
                                    <polygon className="lineas0 LINR3" points="7598,10060 8233,10114 7965,10528 7326,10465 " />
                                    <polygon className="lineas0 LINR3" points="8474,10218 9109,10271 8841,10685 8202,10623 " />
                                    <polygon className="lineas0 LINR3" points="9349,10375 9984,10429 9716,10843 9078,10780 " />
                                    <polygon className="lineas0 LINR3" points="10225,10533 10860,10586 10592,11000 9953,10937 " />
                                </g>
                                <g id="_2625802073504">
                                    <polygon className="lineas12" points="8566,4331 9201,4384 8933,4798 8295,4735 " />
                                    <polygon className="lineas12" points="9442,4488 10077,4541 9809,4956 9170,4893 " />
                                    <polygon className="lineas12" points="10317,4646 10952,4699 10685,5113 10046,5050 " />
                                    <polygon className="lineas12" points="11193,4803 11828,4856 11560,5271 10922,5208 " />
                                    <polygon className="lineas12" points="12069,4961 12704,5014 12436,5428 11797,5365 " />
                                    <polygon className="lineas12" points="12944,5118 13579,5171 13312,5586 12673,5523 " />
                                    <polygon className="lineas12" points="13820,5275 14455,5329 14187,5743 13549,5680 " />
                                    <polygon className="lineas12" points="8173,4912 8808,4965 8540,5379 7901,5317 " />
                                    <polygon className="lineas12" points="9048,5069 9683,5123 9415,5537 8777,5474 " />
                                    <polygon className="lineas12" points="9924,5227 10559,5280 10291,5694 9653,5632 " />
                                    <polygon className="lineas12" points="10800,5384 11435,5438 11167,5852 10528,5789 " />
                                    <polygon className="lineas12" points="11675,5542 12310,5595 12042,6009 11404,5946 " />
                                    <polygon className="lineas12" points="12551,5699 13186,5752 12918,6167 12280,6104 " />
                                    <polygon className="lineas12" points="13427,5857 14062,5910 13794,6324 13155,6261 " />
                                    <polygon className="lineas12" points="7779,5493 8414,5546 8146,5961 7508,5898 " />
                                    <polygon className="lineas12" points="8655,5650 9290,5704 9022,6118 8383,6055 " />
                                    <polygon className="lineas12" points="9530,5808 10165,5861 9897,6275 9259,6213 " />
                                    <polygon className="lineas12" points="10406,5965 11041,6019 10773,6433 10135,6370 " />
                                    <polygon className="lineas12" points="11282,6123 11917,6176 11649,6590 11010,6528 " />
                                    <polygon className="lineas12" points="12157,6280 12792,6334 12525,6748 11886,6685 " />
                                    <polygon className="lineas12" points="13033,6438 13668,6491 13400,6905 12762,6843 " />
                                    <polygon className="lineas12" points="7385,6074 8020,6127 7753,6542 7114,6479 " />
                                    <polygon className="lineas12" points="8261,6232 8896,6285 8628,6699 7990,6636 " />
                                    <polygon className="lineas12" points="9137,6389 9772,6442 9504,6857 8865,6794 " />
                                    <polygon className="lineas12" points="10012,6546 10647,6600 10380,7014 9741,6951 " />
                                    <polygon className="lineas12" points="10888,6704 11523,6757 11255,7172 10617,7109 " />
                                    <polygon className="lineas12" points="11764,6861 12399,6915 12131,7329 11492,7266 " />
                                    <polygon className="lineas12" points="12639,7019 13274,7072 13007,7487 12368,7424 " />
                                    <polygon className="lineas12" points="6992,6655 7627,6709 7359,7123 6720,7060 " />
                                    <polygon className="lineas12" points="7867,6813 8503,6866 8235,7280 7596,7217 " />
                                    <polygon className="lineas12" points="8743,6970 9378,7024 9110,7438 8472,7375 " />
                                    <polygon className="lineas12" points="9619,7128 10254,7181 9986,7595 9347,7532 " />
                                    <polygon className="lineas12" points="10495,7285 11130,7338 10862,7753 10223,7690 " />
                                    <polygon className="lineas12 LINR4" points="11370,7443 12005,7496 11737,7910 11099,7847 " />
                                    <polygon className="lineas12" points="12246,7600 12881,7653 12613,8068 11974,8005 " />
                                    <polygon className="lineas12" points="6598,7236 7233,7290 6965,7704 6327,7641 " />
                                    <polygon className="lineas12" points="7474,7394 8109,7447 7841,7861 7203,7799 " />
                                    <polygon className="lineas12" points="8350,7551 8985,7605 8717,8019 8078,7956 " />
                                    <polygon className="lineas12" points="9225,7709 9860,7762 9592,8176 8954,8114 " />
                                    <polygon className="lineas12" points="10101,7866 10736,7920 10468,8334 9830,8271 " />
                                    <polygon className="lineas12" points="10977,8024 11612,8077 11344,8491 10705,8429 " />
                                    <polygon className="lineas12" points="11852,8181 12487,8235 12219,8649 11581,8586 " />
                                    <polygon className="lineas12" points="6205,7818 6840,7871 6572,8285 5933,8222 " />
                                    <polygon className="lineas12" points="7080,7975 7715,8028 7448,8443 6809,8380 " />
                                    <polygon className="lineas12" points="7956,8132 8591,8186 8323,8600 7685,8537 " />
                                    <polygon className="lineas12" points="8832,8290 9467,8343 9199,8758 8560,8695 " />
                                    <polygon className="lineas12" points="9707,8447 10342,8501 10075,8915 9436,8852 " />
                                    <polygon className="lineas12 LINR4" points="10583,8605 11218,8658 10950,9073 10312,9010 " />
                                    <polygon className="lineas12" points="11459,8762 12094,8816 11826,9230 11187,9167 " />
                                    <polygon className="lineas12" points="5811,8399 6446,8452 6178,8866 5540,8803 " />
                                    <polygon className="lineas12" points="6687,8556 7322,8609 7054,9024 6415,8961 " />
                                    <polygon className="lineas12" points="7562,8714 8197,8767 7930,9181 7291,9118 " />
                                    <polygon className="lineas12" points="8438,8871 9073,8924 8805,9339 8167,9276 " />
                                    <polygon className="lineas12" points="9314,9029 9949,9082 9681,9496 9042,9433 " />
                                    <polygon className="lineas12" points="10189,9186 10824,9239 10557,9654 9918,9591 " />
                                    <polygon className="lineas12" points="11065,9344 11700,9397 11432,9811 10794,9748 " />
                                    <polygon className="lineas12" points="5418,8980 6053,9033 5785,9447 5146,9385 " />
                                    <polygon className="lineas12" points="6293,9137 6928,9191 6660,9605 6022,9542 " />
                                    <polygon className="lineas12" points="7169,9295 7804,9348 7536,9762 6897,9700 " />
                                    <polygon className="lineas12" points="8045,9452 8680,9506 8412,9920 7773,9857 " />
                                    <polygon className="lineas12" points="8920,9610 9555,9663 9287,10077 8649,10015 " />
                                    <polygon className="lineas12" points="9796,9767 10431,9821 10163,10235 9524,10172 " />
                                    <polygon className="lineas12" points="10672,9925 11307,9978 11039,10392 10400,10330 " />
                                    <polygon className="lineas12 LINR4" points="5024,9561 5659,9614 5391,10029 4753,9966 " />
                                    <polygon className="lineas12" points="5900,9718 6535,9772 6267,10186 5628,10123 " />
                                    <polygon className="lineas12" points="6775,9876 7410,9929 7142,10344 6504,10281 " />
                                    <polygon className="lineas12" points="7651,10033 8286,10087 8018,10501 7380,10438 " />
                                    <polygon className="lineas12" points="8527,10191 9162,10244 8894,10659 8255,10596 " />
                                    <polygon className="lineas12" points="9402,10348 10037,10402 9769,10816 9131,10753 " />
                                    <polygon className="lineas12" points="10278,10506 10913,10559 10645,10974 10007,10911 " />
                                </g>
                            </g>
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