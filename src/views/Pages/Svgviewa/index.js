import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
import "./class.css"
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
			<ModalFirma/>
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


						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 735.9 517.95">
								
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