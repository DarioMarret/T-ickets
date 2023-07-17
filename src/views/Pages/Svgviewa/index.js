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


                        <svg className="p-0 m-0" width="90%" height="90%" xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 8267.72 6299.21">

                            <g id="Capa_x0020_1">

                                <path className="tulcanfila0" d="M6816.55 925.98l-1610.02 -273.74c-325.57,-49.41 -702.97,-84.23 -1031.37,-44.95 -930.95,112.57 -1699.11,428.02 -2186.25,1099.4l-1821 2696.87c64.79,520.34 156.31,1098.19 1405.53,1329.81l1925.07 337.72c1283.65,68.84 2310.16,-242.56 2951.18,-1123.7l1496.64 -2248.61c269.69,-331.24 242.96,-679.08 184.65,-960.11 -32.4,-154.28 -76.54,-306.54 -148.21,-461.63 -145.37,-314.63 -708.64,-293.58 -1166.22,-351.08z" />
                                <path className="tulcanfila1" d="M6778.48 822.32l-1616.91 -274.55c-326.78,-49.81 -705.8,-85.04 -1035.42,-45.35 -935.41,112.98 -1706.81,429.64 -2195.97,1104.26l-1828.69 2708.62c65.19,522.37 156.71,1102.64 1411.61,1335.07l1933.17 339.33c1289.32,69.24 2320.28,-243.77 2963.73,-1128.56l1503.53 -2258.33c270.5,-332.86 244.18,-681.91 185.06,-964.15 -32.39,-155.09 -76.53,-307.75 -148.61,-463.65 -145.78,-315.85 -711.47,-294.8 -1171.48,-352.7z" />
                                <path className="none" d="M6686.16 437.22l-1626.22 -276.17c-328.81,-49.81 -709.85,-85.04 -1041.5,-45.35 -940.67,113.38 -1716.53,432.07 -2208.52,1110.33l-1405.94 2126.72c-661.26,914.75 -275.36,1706.81 986.83,1940.46l1946.93 339.33c1248.82,114.19 2096.76,-284.26 2817.55,-900.58 161.17,-137.68 198.42,-191.94 315.44,-366.46l1408.37 -2107.29c584.72,-1113.98 -164.81,-1591.81 -1192.94,-1821z" />
                                <path className="tulcanfila3" d="M6247.21 806.12l-1367.07 -232.03c-276.17,-42.11 -596.47,-71.67 -875.07,-38.06 -790.43,95.16 -1442.79,362.82 -1856.22,932.97l-1181.61 1787.39c-555.98,768.98 -231.62,1434.69 829.31,1631.08l1636.35 285.48c1049.59,95.57 1762.28,-238.91 2368.07,-757.23 135.65,-115.81 166.83,-161.17 265.23,-307.75l1183.63 -1771.19c491.59,-936.21 -138.49,-1338.31 -1002.62,-1530.66z" />
                                <path className="tulcanfila4" d="M6253.28 834.06l-1361.4 -231.22c-274.95,-42.11 -594.04,-71.67 -871.42,-38.06 -787.2,95.16 -1436.71,361.61 -1848.54,929.33l-1176.74 1779.69c-553.55,765.73 -230.41,1428.61 825.67,1624.2l1629.87 284.26c1045.14,95.16 1754.99,-238.1 2357.94,-753.59 135.25,-115.81 166.43,-160.76 264.02,-306.94l1179.17 -1763.9c489.16,-932.17 -138.08,-1332.24 -998.57,-1523.78z" />
                                <path className="tulcanfila5 tulcan0" d="M3501.34 1196.81l2742.16 522c128.21,46.11 187.86,154.37 133.93,260.48l-1684.59 2624.78c-20.8,29.07 -24.15,37.23 -43.62,58.22 -126.09,135.92 -279.78,181.42 -438.82,162.43l-2513.64 -460.87c-192.04,-52.61 -351.06,-248.55 -264.19,-420.43l1698.58 -2645.13c66.1,-77.85 156.93,-125.44 370.19,-101.49z" />
                                <path className="none tulcan1" d="M3486.07 1131.59l2742.16 522c128.21,46.11 187.86,154.37 133.94,260.48l-1684.59 2624.78c-20.81,29.07 -24.15,37.23 -43.62,58.22 -126.08,135.92 -279.77,181.42 -438.82,162.43l-2513.64 -460.87c-192.04,-52.61 -351.06,-248.55 -264.19,-420.43l1698.58 -2645.13c66.1,-77.85 156.93,-125.44 370.19,-101.49z" />
                                <path className="none tulcan1" d="M5775.67 2827.91l-1096.24 1714.61c-20.81,29.07 -24.15,37.23 -43.62,58.22 -126.08,135.92 -279.78,181.42 -438.82,162.43l-2513.65 -460.87c-192.04,-52.61 -351.06,-248.55 -264.19,-420.43l969.93 -1516.96 3386.59 463z" />
                                <polygon className="tulcanfila7 tulcan2" points="3787.37,1059.2 3474.67,1541.02 5977.21,1873.17 6259.02,1380.17 " />
                                <polygon className="tulcanfila8 tulcan2" points="3808.96,1025.4 3504.96,1501.37 5921.98,1842.33 6192.72,1370.66 " />
                                <polygon className="tulcanfila9" points="4137.49,1192.83 4118.86,1230.9 3999.81,1211.46 3968.63,1274.63 4075.54,1292.05 4057.72,1327.68 3951.22,1310.27 3919.63,1374.25 4042.33,1394.09 4023.7,1432.15 3863.35,1405.83 3980.78,1167.33 " />
                                <path id="_1" className="tulcanfila9" d="M4241.56 1243.45c-10.93,-1.62 -21.06,-0.81 -30.78,2.83 -9.31,3.65 -16.2,10.53 -21.06,20.25 -4.86,9.31 -4.86,17.41 -0.41,23.89 4.45,6.07 16.6,14.17 36.85,23.49 19.84,9.72 32.8,20.65 39.28,33.61 6.07,12.55 4.46,29.15 -6.07,49.81 -10.13,21.06 -25.92,36.44 -46.97,47.37 -21.06,10.53 -43.33,13.77 -67.22,10.13 -34.83,-5.67 -59.53,-23.89 -73.7,-53.86l38.47 -26.32c12.15,24.3 30.37,38.47 54.67,42.52 12.15,2.03 23.08,0.81 32.8,-3.64 10.12,-4.46 17.41,-11.34 21.87,-20.25 4.45,-9.31 4.45,-17.01 0.41,-23.48 -4.05,-6.07 -13.36,-12.56 -27.54,-19.44 -14.58,-6.89 -25.11,-12.56 -31.59,-17.82 -6.88,-4.86 -12.15,-10.53 -15.79,-17.41 -8.1,-12.55 -6.48,-30.37 4.45,-52.24 10.53,-22.27 26.73,-38.06 47.38,-47.38 21.06,-9.72 42.52,-12.55 64.39,-8.91 14.58,2.43 27.54,7.29 38.87,14.58 11.74,7.29 20.25,16.2 25.92,26.73l-34.83 27.13c-3.65,-7.29 -10.12,-14.17 -19.44,-19.84 -8.91,-6.07 -19.03,-9.72 -29.96,-11.74z" />
                                <path id="_2" className="tulcanfila9" d="M4392.6 1452.4c12.96,2.02 25.11,1.62 36.85,-1.62 11.74,-3.24 25.11,-8.91 40.5,-17.41l10.93 30.37c-37.26,24.3 -72.89,33.61 -106.5,27.94 -33.61,-5.26 -55.88,-21.46 -66.81,-48.19 -10.93,-27.13 -7.29,-57.91 10.13,-93.54 17.41,-35.63 43.33,-63.17 77.74,-83.42 34.02,-19.84 68.84,-27.13 103.26,-21.46 34.42,5.67 56.69,23.89 66.41,55.07l-37.66 23.89c-5.26,-12.55 -11.74,-21.87 -19.03,-27.54 -7.29,-6.07 -17.41,-9.72 -29.97,-12.15 -22.67,-3.64 -45.35,1.22 -68.43,14.58 -23.08,12.96 -40.49,31.59 -52.24,55.88 -12.15,24.3 -14.58,45.76 -7.29,64.39 7.29,18.63 21.06,29.96 42.11,33.2z" />
                                <polygon id="_3" className="tulcanfila9" points="4781.74,1297.31 4763.12,1334.97 4644.07,1315.94 4612.89,1379.11 4719.79,1396.11 4701.97,1432.15 4595.47,1414.74 4563.89,1478.72 4686.58,1498.56 4667.96,1536.22 4507.6,1510.31 4625.04,1271.8 " />
                                <polygon id="_4" className="tulcanfila9" points="5000.81,1332.94 5038.47,1339.02 4921.04,1577.53 4880.14,1570.64 4839.65,1376.27 4753.8,1550.39 4716.15,1544.32 4833.57,1305.81 4871.24,1311.89 4912.94,1510.71 " />
                                <path id="_5" className="tulcanfila9" d="M5040.9 1538.25l-49 50.61 -40.09 -6.48 215.83 -222.72 40.09 6.48 -19.44 254.7 -40.09 -6.48 4.45 -57.91 -111.76 -18.22zm114.6 -21.46l8.1 -104.88 -89.09 91.52 80.99 13.36z" />
                                <path id="_6" className="tulcanfila9" d="M5476.61 1493.7c-19.44,39.28 -47.78,61.55 -84.63,66.41l15.39 96.37 -47.78 -8.1 -13.77 -88.68 -49.4 -8.1 -39.28 80.18 -37.66 -6.07 117.43 -238.51 83.02 13.36c34.01,5.67 55.07,15.8 63.98,30.37 8.5,14.58 6.07,35.64 -7.29,62.77zm-115.41 29.15c21.46,3.24 37.66,2.03 48.59,-3.64 11.34,-5.67 20.65,-16.6 28.35,-31.99 7.69,-15.79 8.91,-27.13 4.05,-34.02 -4.86,-7.29 -17.41,-12.15 -37.66,-15.79l-47.78 -7.69 -42.11 85.44 46.57 7.69z" />
                                <polygon id="_7" className="tulcanfila9" points="5568.94,1424.87 5606.6,1430.94 5489.17,1669.44 5451.51,1663.37 " />
                                <path id="_8" className="tulcanfila9" d="M5799.75 1523.26c-6.88,-19.44 -21.46,-30.78 -43.33,-34.42 -22.27,-3.65 -44.95,1.62 -68.43,16.2 -23.49,14.17 -41.3,33.61 -53.05,57.5 -11.74,23.89 -14.17,45.76 -7.29,64.79 6.88,19.43 21.46,30.77 43.33,34.42 22.27,3.65 44.95,-1.62 68.43,-16.2 23.49,-14.17 41.3,-33.61 53.05,-57.5 11.74,-23.89 14.17,-45.76 7.29,-64.79zm-45.76 153.47c-34.42,19.84 -68.03,27.13 -101.24,21.87 -33.2,-5.26 -55.07,-21.46 -66,-49 -10.93,-27.13 -7.69,-58.31 9.72,-93.54 17.01,-34.82 42.92,-62.36 76.94,-82.61 34.42,-19.84 68.03,-27.13 101.23,-21.46 32.8,5.26 55.07,21.46 66.01,48.59 10.93,27.54 7.69,58.72 -9.72,93.54 -17.41,35.23 -42.92,62.76 -76.94,82.61z" />
                                <text x="2125.48" y="3672.08" className="tulcanfila5 tulcanfnt0">GENERAL</text>
                                <text x="3831.74" y="2468.63" className="tulcanfila5 tulcanfnt1">VIP</text>
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