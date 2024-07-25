import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
import "./class.css"
import "./svg.css"
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
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1080 1080" >

							<polygon className="stlove0" points="389.97,171.57 389.97,48.96 800.52,48.96 799.98,171.03 " />
							<g>
								<defs>
									<polygon id="SVGID_1_" points="388.91,174.75 388.91,52.13 799.46,52.13 798.92,174.21 		" />
								</defs>
								<clipPath id="SVGID_00000024720497485172445910000018412358380905146815_">
									<use style={{ "overflow": "visible;" }} />
								</clipPath>
							</g>
							<path className="stlove1" d="M206.35,806.12c0,0-20.12,42.06,49.76,48.41c69.88,6.35,369.53,7.35,369.53,7.35l288-6.29
	c0,0,85.41,3.47,82.59-37.47c0,0,16.24,38.82-72,48.71l-650.82,1.41C273.41,868.24,180.24,865.41,206.35,806.12z"/>
							<path className="stlove4" d="M311,197.71h554.12l86.82,408.71l43.76,201.88c0,0,15.53,36.71-52.94,50.12c0,0-15.88,4.24-136.24,4.24
	l-542.12-1.41c0,0-67.76-4.24-64.24-46.59L311,197.71z"/>
							<polygon id="1" className="none" points="915.53,439.82 265.77,439.82 241.68,573.94 944.02,573.94 " />
							<path className="stlove6" d="M994.29,806.47l-43.76-201.88l-6.51-30.65H241.68l-42.91,238.88c-3.53,42.35,64.24,46.59,64.24,46.59
	l542.12,1.41c120.35,0,136.24-4.24,136.24-4.24C1009.82,843.18,994.29,806.47,994.29,806.47z"/>
							<polygon id="2" className="none" points="863.71,195.88 309.59,195.88 265.77,439.82 915.53,439.82 " />
							<polygon className="stlove8" points="384.92,223.22 805.11,222.76 805.11,234.7 384.46,232.4 " />
							<polygon className="stlove0" points="384.92,233.55 805.11,233.09 805.11,245.03 384.46,242.74 " />
							<polyline id="3" className="none" points="384.92,222.76 392.27,168.11 799.14,168.11 805.11,222.3 385.84,224.14 " />
							<g>
								<g>
									<g>
										<g>
											<g>

												<rect x="592.3" y="144.1" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 1188.3645 310.3887)" className="stlove10" width="3.77" height="22.2" />
												<path className="stlove11" d="M596.22,165.87v0.84c2.99,0.37,3.54,1.81,3.54,1.81h-7.6v-2.75L596.22,165.87z" />
												<path className="stlove12" d="M599.66,169.2h-7.41c-0.2,0-0.36-0.16-0.36-0.36l0,0c0-0.2,0.16-0.36,0.36-0.36h7.41
						c0.2,0,0.36,0.16,0.36,0.36l0,0C600.02,169.04,599.86,169.2,599.66,169.2z"/>
											</g>
										</g>
										<g>
											<g>
												<rect x="587.39" y="144.1" className="stlove10" width="3.77" height="22.2" />
												<path className="stlove11" d="M587.24,165.87v0.84c-2.99,0.37-3.54,1.81-3.54,1.81h7.6v-2.75L587.24,165.87z" />
												<path className="stlove12" d="M583.8,169.2h7.41c0.2,0,0.36-0.16,0.36-0.36l0,0c0-0.2-0.16-0.36-0.36-0.36h-7.41
						c-0.2,0-0.36,0.16-0.36,0.36l0,0C583.44,169.04,583.6,169.2,583.8,169.2z"/>
											</g>
										</g>
										<path className="stlove10" d="M593.71,147.09h-3.93c-1.96,0-3.55-1.59-3.55-3.55v-1.8h11.02v1.8
				C597.26,145.5,595.67,147.09,593.71,147.09z"/>
									</g>
									<g>
										<path className="stlove13" d="M592.02,123.45h-0.45c-3.17,0-5.75,2.79-5.75,6.23v12.06h11.95v-12.06
				C597.77,126.24,595.2,123.45,592.02,123.45z"/>
									</g>
									<g>
										<g>
											<g>
												<path className="stlove14" d="M591.76,119.98L591.76,119.98c-1.5,0-2.71,1.21-2.71,2.71v1.46c0,1.5,1.21,2.71,2.71,2.71l0,0
						c1.5,0,2.71-1.21,2.71-2.71v-1.46C594.47,121.19,593.25,119.98,591.76,119.98z"/>
												<path className="stlove15" d="M594.34,124.96c0.08-0.26,0.13-0.53,0.13-0.82v-1.46c0-1.5-1.21-2.71-2.71-2.71l0,0
						c-1.5,0-2.71,1.21-2.71,2.71v0.94C590.94,125.13,592.81,125.29,594.34,124.96z"/>
											</g>
											<g>
												<path className="stlove14" d="M593.34,123.3h-3.16c-1.72,0-3.12-1.4-3.12-3.12v-6.43c0-1.31,1.07-2.38,2.38-2.38h4.64
						c1.31,0,2.38,1.07,2.38,2.38v6.43C596.46,121.9,595.06,123.3,593.34,123.3z"/>
												<g>
													<path className="stlove16" d="M589.38,116.25c-0.37,0-0.67,0.3-0.67,0.67c0,0.37,0.3,0.67,0.67,0.67c0.37,0,0.67-0.3,0.67-0.67
							C590.04,116.55,589.75,116.25,589.38,116.25z"/>
													<path className="stlove16" d="M593.59,116.25c-0.37,0-0.67,0.3-0.67,0.67c0,0.37,0.3,0.67,0.67,0.67c0.37,0,0.67-0.3,0.67-0.67
							C594.26,116.55,593.96,116.25,593.59,116.25z"/>
												</g>
												<g>
													<g>
														<path className="stlove14" d="M595.92,117.12c-0.26,0.98,0.06,1.92,0.71,2.11c0.65,0.19,1.39-0.45,1.64-1.42
								c0.26-0.98-0.06-1.92-0.71-2.11C596.91,115.51,596.18,116.15,595.92,117.12z"/>
														<path className="stlove15" d="M596.61,117.29c-0.1-0.03-0.2-0.03-0.3,0c0-0.02,0.01-0.03,0.01-0.05c0.17-0.64,0.66-1.06,1.09-0.94
								c0.43,0.13,0.64,0.75,0.47,1.39c-0.13,0.5-0.45,0.86-0.78,0.94C597.24,118.01,597.03,117.41,596.61,117.29z"/>
													</g>
												</g>
												<g>
													<g>
														<path className="stlove14" d="M587.61,117.12c0.26,0.98-0.06,1.92-0.71,2.11c-0.65,0.19-1.39-0.45-1.64-1.42
								c-0.26-0.98,0.06-1.92,0.71-2.11C586.62,115.51,587.36,116.15,587.61,117.12z"/>
														<path className="stlove15" d="M586.92,117.29c0.1-0.03,0.2-0.03,0.3,0c0-0.02-0.01-0.03-0.01-0.05c-0.17-0.64-0.66-1.06-1.08-0.94
								c-0.43,0.13-0.64,0.75-0.47,1.39c0.13,0.5,0.45,0.86,0.78,0.94C586.3,118.01,586.51,117.41,586.92,117.29z"/>
													</g>
												</g>
												<path className="stlove4" d="M589.94,119.74l3.35-0.2c0,0-0.14,1.37-1.66,1.41C590.1,120.99,589.94,119.74,589.94,119.74z" />
												<path className="stlove17" d="M587.81,116.41l2.52-0.97C590.33,115.44,588.13,113.89,587.81,116.41z" />
												<path className="stlove17" d="M595.26,116.7l-2.42-1.21C592.84,115.49,595.18,114.15,595.26,116.7z" />
											</g>
											<path className="stlove15" d="M591.37,116.75l-0.2,1.48l-0.78-0.13c0,0-0.09,1.15,1.32,1.17L591.37,116.75z" />
										</g>
										<path className="stlove18" d="M585.32,115.48c0-7.11,12.66-7.54,13.09-0.18" />
										<g>
											<path className="stlove19" d="M597.23,117.26c0,1.53-0.23,2.77,1.02,2.77c1.25,0,2.27-1.24,2.27-2.77c0-1.53-1.01-2.77-2.27-2.77
					C596.99,114.49,597.23,115.73,597.23,117.26z"/>
											<g className="stlove20">
												<path className="stlove21" d="M598.24,119.15c1.13,0,2.06-1.01,2.24-2.33c0.02,0.14,0.03,0.29,0.03,0.44c0,1.53-1.01,2.77-2.27,2.77
						c-1.07,0-1.05-0.91-1.03-2.14C597.26,118.65,597.45,119.15,598.24,119.15z"/>
												<path className="stlove21" d="M597.23,116.38c0,0.15,0,0.3-0.01,0.44c-0.01-0.39-0.02-0.76,0-1.08
						C597.22,115.95,597.23,116.16,597.23,116.38z"/>
											</g>
											<path className="stlove22" d="M596.75,119.62c0,0.23,0.15,0.41,0.34,0.41l0,0c0.19,0,0.34-0.19,0.34-0.41v-4.5
					c0-0.23-0.15-0.41-0.34-0.41l0,0c-0.19,0-0.34,0.19-0.34,0.41V119.62z"/>
										</g>
										<g>
											<path className="stlove19" d="M586.34,117.26c0,1.53,0.23,2.77-1.02,2.77c-1.25,0-2.27-1.24-2.27-2.77c0-1.53,1.01-2.77,2.27-2.77
					C586.58,114.49,586.34,115.73,586.34,117.26z"/>
											<g className="stlove20">
												<path className="stlove21" d="M585.33,119.15c-1.13,0-2.06-1.01-2.24-2.33c-0.02,0.14-0.03,0.29-0.03,0.44c0,1.53,1.01,2.77,2.27,2.77
						c1.07,0,1.05-0.91,1.03-2.14C586.32,118.65,586.12,119.15,585.33,119.15z"/>
												<path className="stlove21" d="M586.34,116.38c0,0.15,0,0.3,0.01,0.44c0.01-0.39,0.02-0.76,0-1.08
						C586.35,115.95,586.34,116.16,586.34,116.38z"/>
											</g>
											<path className="stlove22" d="M586.82,119.62c0,0.23-0.15,0.41-0.34,0.41l0,0c-0.19,0-0.34-0.19-0.34-0.41v-4.5
					c0-0.23,0.15-0.41,0.34-0.41l0,0c0.19,0,0.34,0.19,0.34,0.41V119.62z"/>
										</g>
									</g>
									<path className="stlove23" d="M578.4,114.11c-5.06,11.75-1.02,16.88,9.02,12.5" />
									<path className="stlove17" d="M586.84,117.48c0,0-0.94-3.66,0.51-5.28c0,0-0.87-2.42,0.9-3.68l0.4,2.31c0,0-0.54-2.85,1.48-3.82l0.58,3.64
			c0,0,5.12,0.18,5.74,2.16c0.61,1.98-0.04,4.24-0.04,4.24l-1.19-3.28c0,0-3.54,1.98-6.96,0l0.76,0.67c0,0-0.76,0.13-1.28-0.41
			L586.84,117.48z"/>
									<path className="stlove14" d="M579.33,114.9c2.13-0.53,0.35-1.04,0.35-1.04s1.86-1.64,1.2-2.91c-0.62-1.19-2.9,1.1-3.31,2.6
			C577.15,115.04,579.33,114.9,579.33,114.9z"/>
								</g>
								<g>
									<g>
										<rect x="534.77" y="151.26" className="stlove13" width="116.01" height="30.01" />
										<polygon className="stlove24" points="635.36,141.52 550.16,141.52 534.77,151.26 650.75,151.26 			" />
									</g>
									<g>
										<g>
											<path className="stlove25" d="M576.68,145.07c-1.58-1.14-5.95-1.95-11.09-1.95c-5.14,0-9.51,0.82-11.09,1.95h-0.63v0.94
					c0,1.6,5.25,2.89,11.73,2.89c6.48,0,11.73-1.29,11.73-2.89v-0.94H576.68z"/>
											<path className="stlove26" d="M577.32,145.23c0,1.6-5.25,2.89-11.73,2.89c-6.48,0-11.73-1.29-11.73-2.89c0-1.6,5.25-2.89,11.73-2.89
					C572.07,142.34,577.32,143.64,577.32,145.23z"/>
											<g>
												<path className="stlove25" d="M549.96,148.94c-0.18-0.13-0.67,0.02-1.24,0.02s-1.07-0.15-1.24-0.02h-0.07v0.35
						c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32v-0.35H549.96z"/>
												<path className="stlove19" d="M550.03,148.94c0,0.18-0.59,0.32-1.31,0.32s-1.31-0.14-1.31-0.32c0-0.18,0.59-0.32,1.31-0.32
						S550.03,148.76,550.03,148.94z"/>
											</g>
											<g>
												<path className="stlove25" d="M554.2,148.94c-0.18-0.13-0.67,0.02-1.24,0.02c-0.58,0-1.07-0.15-1.24-0.02h-0.07v0.35
						c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32v-0.35H554.2z"/>
												<path className="stlove19" d="M554.27,148.94c0,0.18-0.59,0.32-1.31,0.32s-1.31-0.14-1.31-0.32c0-0.18,0.59-0.32,1.31-0.32
						S554.27,148.76,554.27,148.94z"/>
											</g>
											<g>
												<path className="stlove25" d="M552.18,147.34c-0.18-0.13-0.67,0.02-1.24,0.02c-0.58,0-1.07-0.15-1.24-0.02h-0.07v0.35
						c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32v-0.35H552.18z"/>
												<path className="stlove19" d="M552.25,147.34c0,0.18-0.59,0.32-1.31,0.32s-1.31-0.14-1.31-0.32c0-0.18,0.59-0.32,1.31-0.32
						S552.25,147.16,552.25,147.34z"/>
											</g>
											<path className="stlove19" d="M572.61,144.96c0,0.81-3.14,1.46-7.02,1.46c-3.88,0-7.02-0.66-7.02-1.46c0-0.81,3.14-1.46,7.02-1.46
					C569.47,143.5,572.61,144.16,572.61,144.96z"/>
											<path className="stlove24" d="M565.88,144.52c0,0.16-0.13,0.15-0.29,0.15l0,0c-0.16,0-0.29,0.01-0.29-0.15v-1.12
					c0-0.16,0.13-0.29,0.29-0.29l0,0c0.16,0,0.29,0.13,0.29,0.29V144.52z"/>
										</g>
										<g>
											<g>
												<path className="stlove25" d="M600.72,144.27c0.32-0.23,1.22,0.04,2.27,0.04c1.05,0,1.94-0.27,2.27-0.04h0.13v0.63
						c0,0.33-1.07,0.59-2.4,0.59c-1.32,0-2.4-0.26-2.4-0.59v-0.63H600.72z"/>
												<path className="stlove26" d="M600.59,144.27c0,0.33,1.07,0.59,2.4,0.59c1.32,0,2.4-0.26,2.4-0.59c0-0.33-1.07-0.59-2.4-0.59
						C601.66,143.68,600.59,143.95,600.59,144.27z"/>
											</g>
											<g>
												<path className="stlove25" d="M601.6,143.79c0.2-0.14,0.74,0.03,1.39,0.03s1.19-0.17,1.39-0.03h0.08v0.39c0,0.2-0.66,0.36-1.47,0.36
						c-0.81,0-1.47-0.16-1.47-0.36v-0.39H601.6z"/>
												<path className="stlove27" d="M601.52,143.79c0,0.2,0.66,0.36,1.47,0.36c0.81,0,1.47-0.16,1.47-0.36c0-0.2-0.66-0.36-1.47-0.36
						C602.18,143.43,601.52,143.59,601.52,143.79z"/>
											</g>
										</g>
										<g>
											<g>
												<path className="stlove25" d="M600.72,147.27c0.32-0.23,1.22,0.04,2.27,0.04c1.05,0,1.94-0.27,2.27-0.04h0.13v0.63
						c0,0.33-1.07,0.59-2.4,0.59c-1.32,0-2.4-0.26-2.4-0.59v-0.63H600.72z"/>
												<path className="stlove26" d="M600.59,147.27c0,0.33,1.07,0.59,2.4,0.59c1.32,0,2.4-0.26,2.4-0.59c0-0.33-1.07-0.59-2.4-0.59
						C601.66,146.68,600.59,146.94,600.59,147.27z"/>
											</g>
											<g>
												<path className="stlove25" d="M601.6,146.79c0.2-0.14,0.74,0.03,1.39,0.03s1.19-0.17,1.39-0.03h0.08v0.39c0,0.2-0.66,0.36-1.47,0.36
						c-0.81,0-1.47-0.16-1.47-0.36v-0.39H601.6z"/>
												<path className="stlove27" d="M601.52,146.79c0,0.2,0.66,0.36,1.47,0.36c0.81,0,1.47-0.16,1.47-0.36c0-0.2-0.66-0.36-1.47-0.36
						C602.18,146.43,601.52,146.59,601.52,146.79z"/>
											</g>
										</g>
										<g>
											<g>
												<g>
													<path className="stlove25" d="M555.25,142.67c-0.32-0.23-1.22,0.04-2.27,0.04s-1.94-0.27-2.27-0.04h-0.13v0.63
							c0,0.33,1.07,0.59,2.4,0.59c1.32,0,2.4-0.26,2.4-0.59v-0.63H555.25z"/>
													<path className="stlove26" d="M555.38,142.67c0,0.33-1.07,0.59-2.4,0.59c-1.32,0-2.4-0.26-2.4-0.59c0-0.33,1.07-0.59,2.4-0.59
							C554.31,142.08,555.38,142.35,555.38,142.67z"/>
												</g>
												<g>
													<path className="stlove25" d="M554.37,142.19c-0.2-0.14-0.74,0.03-1.39,0.03c-0.64,0-1.19-0.17-1.39-0.03h-0.08v0.39
							c0,0.2,0.66,0.36,1.47,0.36c0.81,0,1.47-0.16,1.47-0.36v-0.39H554.37z"/>
													<path className="stlove26" d="M554.45,142.19c0,0.2-0.66,0.36-1.47,0.36c-0.81,0-1.47-0.16-1.47-0.36c0-0.2,0.66-0.36,1.47-0.36
							C553.8,141.83,554.45,141.99,554.45,142.19z"/>
												</g>
											</g>
											<polygon className="stlove28" points="552.51,142.19 560.18,143.77 560.21,142.87 553.2,141.58 552.51,141.58 				" />
											<polygon className="stlove29" points="552.51,141.58 560.27,143.24 560.28,142.87 553.24,141.51 				" />
											<g>
												<polygon className="stlove26" points="559.35,142.49 558.28,142.64 558.28,143.47 560.17,143.99 561.02,143.74 561.02,142.86 					" />
												<polygon className="stlove25" points="561.02,142.86 560.18,143.03 558.28,142.64 558.28,143.47 560.17,143.99 561.02,143.74 					" />
											</g>
										</g>
										<g>
											<path className="stlove25" d="M608.64,145.07c1.58-1.14,5.95-1.95,11.09-1.95c5.14,0,9.51,0.82,11.09,1.95h0.63v0.94
					c0,1.6-5.25,2.89-11.73,2.89c-6.48,0-11.73-1.29-11.73-2.89v-0.94H608.64z"/>
											<path className="stlove26" d="M608.01,145.23c0,1.6,5.25,2.89,11.73,2.89c6.48,0,11.73-1.29,11.73-2.89c0-1.6-5.25-2.89-11.73-2.89
					C613.26,142.34,608.01,143.64,608.01,145.23z"/>
											<g>
												<path className="stlove25" d="M635.36,148.94c0.18-0.13,0.67,0.02,1.24,0.02s1.07-0.15,1.24-0.02h0.07v0.35c0,0.18-0.59,0.32-1.31,0.32
						s-1.31-0.14-1.31-0.32v-0.35H635.36z"/>
												<path className="stlove30" d="M635.29,148.94c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32c0-0.18-0.59-0.32-1.31-0.32
						S635.29,148.76,635.29,148.94z"/>
											</g>
											<g>
												<path className="stlove25" d="M631.13,148.94c0.18-0.13,0.67,0.02,1.24,0.02c0.58,0,1.07-0.15,1.24-0.02h0.07v0.35
						c0,0.18-0.59,0.32-1.31,0.32s-1.31-0.14-1.31-0.32v-0.35H631.13z"/>
												<path className="stlove30" d="M631.05,148.94c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32c0-0.18-0.59-0.32-1.31-0.32
						S631.05,148.76,631.05,148.94z"/>
											</g>
											<g>
												<path className="stlove25" d="M633.14,147.34c0.18-0.13,0.67,0.02,1.24,0.02s1.07-0.15,1.24-0.02h0.07v0.35c0,0.18-0.59,0.32-1.31,0.32
						s-1.31-0.14-1.31-0.32v-0.35H633.14z"/>
												<path className="stlove30" d="M633.07,147.34c0,0.18,0.59,0.32,1.31,0.32s1.31-0.14,1.31-0.32c0-0.18-0.59-0.32-1.31-0.32
						S633.07,147.16,633.07,147.34z"/>
											</g>
											<path className="stlove19" d="M612.71,144.96c0,0.81,3.14,1.46,7.02,1.46c3.88,0,7.02-0.66,7.02-1.46c0-0.81-3.14-1.46-7.02-1.46
					C615.86,143.5,612.71,144.16,612.71,144.96z"/>
											<path className="stlove24" d="M619.45,144.52c0,0.16,0.13,0.15,0.29,0.15l0,0c0.16,0,0.29,0.01,0.29-0.15v-1.12
					c0-0.16-0.13-0.29-0.29-0.29l0,0c-0.16,0-0.29,0.13-0.29,0.29V144.52z"/>
										</g>
										<g>
											<g>
												<g>
													<path className="stlove25" d="M630.07,142.67c0.32-0.23,1.22,0.04,2.27,0.04c1.05,0,1.94-0.27,2.27-0.04h0.13v0.63
							c0,0.33-1.07,0.59-2.4,0.59c-1.32,0-2.4-0.26-2.4-0.59v-0.63H630.07z"/>
													<path className="stlove26" d="M629.94,142.67c0,0.33,1.07,0.59,2.4,0.59c1.32,0,2.4-0.26,2.4-0.59c0-0.33-1.07-0.59-2.4-0.59
							C631.01,142.08,629.94,142.35,629.94,142.67z"/>
												</g>
												<g>
													<path className="stlove25" d="M630.95,142.19c0.2-0.14,0.74,0.03,1.39,0.03c0.64,0,1.19-0.17,1.39-0.03h0.08v0.39
							c0,0.2-0.66,0.36-1.47,0.36c-0.81,0-1.47-0.16-1.47-0.36v-0.39H630.95z"/>
													<path className="stlove26" d="M630.87,142.19c0,0.2,0.66,0.36,1.47,0.36c0.81,0,1.47-0.16,1.47-0.36c0-0.2-0.66-0.36-1.47-0.36
							C631.53,141.83,630.87,141.99,630.87,142.19z"/>
												</g>
											</g>
											<polygon className="stlove28" points="632.81,142.19 625.14,143.77 625.11,142.87 632.12,141.58 632.81,141.58 				" />
											<polygon className="stlove29" points="632.81,141.58 625.06,143.24 625.04,142.87 632.08,141.51 				" />
											<g>
												<polygon className="stlove26" points="625.97,142.49 627.04,142.64 627.04,143.47 625.15,143.99 624.3,143.74 624.3,142.86 					" />
												<polygon className="stlove25" points="624.3,142.86 625.14,143.03 627.04,142.64 627.04,143.47 625.15,143.99 624.3,143.74 					" />
											</g>
										</g>
										<polygon className="stlove27" points="582.81,149.61 580.67,149.61 582.44,143.31 583.89,143.31 			" />
										<polygon className="stlove27" points="586.63,149.61 584.48,149.61 585.47,143.31 586.91,143.31 			" />
										<polygon className="stlove27" points="595.82,149.61 597.96,149.61 596.19,143.31 594.74,143.31 			" />
										<polygon className="stlove27" points="592,149.61 594.15,149.61 593.16,143.31 591.72,143.31 			" />
										<polygon className="stlove27" points="590.36,149.61 588.21,149.61 588.57,143.31 590.01,143.31 			" />
										<g>
											<polygon className="stlove31" points="581.49,146.68 580.67,149.61 582.81,149.61 583.31,146.68 				" />
											<polygon className="stlove31" points="585.16,145.3 584.48,149.61 586.63,149.61 586.82,145.3 				" />
											<polygon className="stlove31" points="588.21,149.61 590.36,149.61 590.2,146.68 588.38,146.68 				" />
											<polygon className="stlove31" points="592,149.61 594.15,149.61 593.29,144.14 591.75,144.14 				" />
											<polygon className="stlove31" points="595.82,149.61 597.96,149.61 596.95,146.01 595.2,146.01 				" />
										</g>
									</g>
									<path className="stlove32" d="M650.94,158.08H534.61c-0.81,0-1.46-0.65-1.46-1.46l0,0c0-0.81,0.65-1.46,1.46-1.46h116.34
			c0.81,0,1.46,0.65,1.46,1.46l0,0C652.4,157.43,651.75,158.08,650.94,158.08z"/>
									<path className="stlove32" d="M650.94,167.5H534.61c-0.81,0-1.46-0.65-1.46-1.46l0,0c0-0.81,0.65-1.46,1.46-1.46h116.34
			c0.81,0,1.46,0.65,1.46,1.46l0,0C652.4,166.84,651.75,167.5,650.94,167.5z"/>
									<path className="stlove32" d="M650.94,176.91H534.61c-0.81,0-1.46-0.65-1.46-1.46l0,0c0-0.81,0.65-1.46,1.46-1.46h116.34
			c0.81,0,1.46,0.65,1.46,1.46l0,0C652.4,176.26,651.75,176.91,650.94,176.91z"/>
								</g>
								<path className="stlove23" d="M597.06,127.45c3.33,7.57,2.73,11.13,12.49,14.72" />
								<path className="stlove14" d="M609.09,143.23c0.84,2.03,1.08,0.19,1.08,0.19s1.9,1.6,3.06,0.76c1.08-0.78-1.52-2.71-3.06-2.89
		C608.63,141.09,609.09,143.23,609.09,143.23z"/>
							</g>
							<g>
								<rect x="783.76" y="145.15" className="stlove33" width="20.67" height="77.76" />
								<g>
									<g>
										<g>
											<g>
												<rect x="784.75" y="204.51" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="789.34" cy="208.89" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -24.6921 272.49)" className="stlove35" cx="789.34" cy="208.89" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 383.0553 917.1486)" className="stlove34" cx="789.34" cy="208.89" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,208.89c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C789.68,208.29,789.95,208.56,789.95,208.89z"/>
												</g>
												<g>
													<circle className="stlove34" cx="789.34" cy="217.13" r="3.67" />
													<circle className="stlove35" cx="789.34" cy="217.13" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 375.0969 923.2532)" className="stlove34" cx="789.34" cy="217.13" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,217.13c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C789.68,216.53,789.95,216.8,789.95,217.13z"/>
												</g>
											</g>
											<g>
												<rect x="794.7" y="204.51" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="799.29" cy="208.89" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -24.1335 275.7769)" className="stlove35" cx="799.29" cy="208.89" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 390.4269 926.7585)" className="stlove34" cx="799.29" cy="208.89" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,208.89c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							S799.9,208.56,799.9,208.89z"/>
												</g>
												<g>
													<circle className="stlove34" cx="799.29" cy="217.13" r="3.67" />
													<circle className="stlove35" cx="799.29" cy="217.13" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 382.4686 932.8632)" className="stlove34" cx="799.29" cy="217.13" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,217.13c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6S799.9,216.8,799.9,217.13z"
													/>
												</g>
											</g>
											<g>
												<rect x="784.75" y="186.26" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="789.34" cy="190.64" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -18.6629 271.4654)" className="stlove35" cx="789.34" cy="190.64" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 400.6827 903.6268)" className="stlove34" cx="789.34" cy="190.64" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,190.64c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C789.68,190.04,789.95,190.31,789.95,190.64z"/>
												</g>
												<g>
													<circle className="stlove34" cx="789.34" cy="198.88" r="3.67" />
													<circle className="stlove35" cx="789.34" cy="198.88" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 392.7244 909.7315)" className="stlove34" cx="789.34" cy="198.88" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,198.88c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C789.68,198.28,789.95,198.55,789.95,198.88z"/>
												</g>
											</g>
											<g>
												<rect x="794.7" y="186.26" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="799.29" cy="190.64" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -18.1043 274.7523)" className="stlove35" cx="799.29" cy="190.64" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 408.0544 913.2368)" className="stlove34" cx="799.29" cy="190.64" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,190.64c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							S799.9,190.31,799.9,190.64z"/>
												</g>
												<g>
													<circle className="stlove34" cx="799.29" cy="198.88" r="3.67" />
													<circle className="stlove35" cx="799.29" cy="198.88" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 400.0961 919.3415)" className="stlove34" cx="799.29" cy="198.88" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,198.88c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6S799.9,198.55,799.9,198.88z"
													/>
												</g>
											</g>
										</g>
										<g>
											<g>
												<rect x="784.75" y="168.08" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="789.34" cy="172.46" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -12.6568 270.4446)" className="stlove35" cx="789.34" cy="172.46" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 418.2426 890.1569)" className="stlove34" cx="789.34" cy="172.46" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,172.46c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C789.68,171.86,789.95,172.13,789.95,172.46z"/>
												</g>
												<g>
													<circle className="stlove34" cx="789.34" cy="180.7" r="3.67" />
													<circle className="stlove35" cx="789.34" cy="180.7" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 410.2843 896.2616)" className="stlove34" cx="789.34" cy="180.7" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,180.7c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C789.68,180.1,789.95,180.37,789.95,180.7z"/>
												</g>
											</g>
											<g>
												<rect x="794.7" y="168.08" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="799.29" cy="172.46" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -12.0982 273.7316)" className="stlove35" cx="799.29" cy="172.46" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 425.6143 899.7669)" className="stlove34" cx="799.29" cy="172.46" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,172.46c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							S799.9,172.13,799.9,172.46z"/>
												</g>
												<g>
													<circle className="stlove34" cx="799.29" cy="180.7" r="3.67" />
													<circle className="stlove35" cx="799.29" cy="180.7" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 417.656 905.8716)" className="stlove34" cx="799.29" cy="180.7" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,180.7c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6S799.9,180.37,799.9,180.7z" />
												</g>
											</g>
											<g>
												<rect x="784.75" y="149.83" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="789.34" cy="154.21" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -6.6275 269.42)" className="stlove35" cx="789.34" cy="154.21" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 435.8701 876.6351)" className="stlove34" cx="789.34" cy="154.21" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,154.21c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C789.68,153.61,789.95,153.88,789.95,154.21z"/>
												</g>
												<g>
													<circle className="stlove34" cx="789.34" cy="162.45" r="3.67" />
													<circle className="stlove35" cx="789.34" cy="162.45" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 427.9118 882.7399)" className="stlove34" cx="789.34" cy="162.45" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M789.95,162.45c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C789.68,161.85,789.95,162.12,789.95,162.45z"/>
												</g>
											</g>
											<g>
												<rect x="794.7" y="149.83" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="799.29" cy="154.21" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -6.0689 272.7069)" className="stlove35" cx="799.29" cy="154.21" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 443.2418 886.2452)" className="stlove34" cx="799.29" cy="154.21" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,154.21c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							S799.9,153.88,799.9,154.21z"/>
												</g>
												<g>
													<circle className="stlove34" cx="799.29" cy="162.45" r="3.67" />
													<circle className="stlove35" cx="799.29" cy="162.45" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 435.2834 892.3499)" className="stlove34" cx="799.29" cy="162.45" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M799.9,162.45c0,0.33-0.27,0.6-0.6,0.6s-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6S799.9,162.12,799.9,162.45z"
													/>
												</g>
											</g>
										</g>
									</g>
									<polygon className="stlove36" points="784.6,145.76 784.9,149.28 803.58,149.28 803.58,145.76 		" />
								</g>
							</g>
							<g>
								<rect x="382.7" y="145.15" className="stlove33" width="20.67" height="77.76" />
								<g>
									<g>
										<g>
											<g>
												<rect x="383.7" y="204.51" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="388.29" cy="208.89" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -47.2084 140.0004)" className="stlove35" cx="388.29" cy="208.89" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 85.9204 529.7918)" className="stlove34" cx="388.29" cy="208.89" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,208.89c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C388.62,208.29,388.89,208.56,388.89,208.89z"/>
												</g>
												<g>
													<circle className="stlove34" cx="388.29" cy="217.13" r="3.67" />
													<circle className="stlove35" cx="388.29" cy="217.13" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 77.9621 535.8965)" className="stlove34" cx="388.29" cy="217.13" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,217.13c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C388.62,216.53,388.89,216.8,388.89,217.13z"/>
												</g>
											</g>
											<g>
												<rect x="393.65" y="204.51" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="398.24" cy="208.89" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -46.6497 143.2873)" className="stlove35" cx="398.24" cy="208.89" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 93.2921 539.4018)" className="stlove34" cx="398.24" cy="208.89" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,208.89c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C398.57,208.29,398.84,208.56,398.84,208.89z"/>
												</g>
												<g>
													<circle className="stlove34" cx="398.24" cy="217.13" r="3.67" />
													<circle className="stlove35" cx="398.24" cy="217.13" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 85.3338 545.5065)" className="stlove34" cx="398.24" cy="217.13" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,217.13c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C398.57,216.53,398.84,216.8,398.84,217.13z"/>
												</g>
											</g>
											<g>
												<rect x="383.7" y="186.26" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="388.29" cy="190.64" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -41.1791 138.9757)" className="stlove35" cx="388.29" cy="190.64" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 103.5479 516.27)" className="stlove34" cx="388.29" cy="190.64" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,190.64c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C388.62,190.04,388.89,190.31,388.89,190.64z"/>
												</g>
												<g>
													<circle className="stlove34" cx="388.29" cy="198.88" r="3.67" />
													<circle className="stlove35" cx="388.29" cy="198.88" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 95.5896 522.3748)" className="stlove34" cx="388.29" cy="198.88" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,198.88c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C388.62,198.28,388.89,198.55,388.89,198.88z"/>
												</g>
											</g>
											<g>
												<rect x="393.65" y="186.26" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="398.24" cy="190.64" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -40.6205 142.2626)" className="stlove35" cx="398.24" cy="190.64" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 110.9196 525.8801)" className="stlove34" cx="398.24" cy="190.64" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,190.64c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C398.57,190.04,398.84,190.31,398.84,190.64z"/>
												</g>
												<g>
													<circle className="stlove34" cx="398.24" cy="198.88" r="3.67" />
													<circle className="stlove35" cx="398.24" cy="198.88" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 102.9612 531.9847)" className="stlove34" cx="398.24" cy="198.88" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,198.88c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C398.57,198.28,398.84,198.55,398.84,198.88z"/>
												</g>
											</g>
										</g>
										<g>
											<g>
												<rect x="383.7" y="168.08" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="388.29" cy="172.46" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -35.173 137.955)" className="stlove35" cx="388.29" cy="172.46" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 121.1078 502.8001)" className="stlove34" cx="388.29" cy="172.46" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,172.46c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C388.62,171.86,388.89,172.13,388.89,172.46z"/>
												</g>
												<g>
													<circle className="stlove34" cx="388.29" cy="180.7" r="3.67" />
													<circle className="stlove35" cx="388.29" cy="180.7" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 113.1495 508.9048)" className="stlove34" cx="388.29" cy="180.7" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,180.7c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C388.62,180.1,388.89,180.37,388.89,180.7z"/>
												</g>
											</g>
											<g>
												<rect x="393.65" y="168.08" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="398.24" cy="172.46" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -34.6144 141.2419)" className="stlove35" cx="398.24" cy="172.46" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 128.4795 512.4102)" className="stlove34" cx="398.24" cy="172.46" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,172.46c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C398.57,171.86,398.84,172.13,398.84,172.46z"/>
												</g>
												<g>
													<circle className="stlove34" cx="398.24" cy="180.7" r="3.67" />
													<circle className="stlove35" cx="398.24" cy="180.7" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 120.5211 518.5148)" className="stlove34" cx="398.24" cy="180.7" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,180.7c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C398.57,180.1,398.84,180.37,398.84,180.7z"/>
												</g>
											</g>
											<g>
												<rect x="383.7" y="149.83" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="388.29" cy="154.21" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -29.1438 136.9303)" className="stlove35" cx="388.29" cy="154.21" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 138.7353 489.2784)" className="stlove34" cx="388.29" cy="154.21" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,154.21c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C388.62,153.61,388.89,153.88,388.89,154.21z"/>
												</g>
												<g>
													<circle className="stlove34" cx="388.29" cy="162.45" r="3.67" />
													<circle className="stlove35" cx="388.29" cy="162.45" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 130.7769 495.3831)" className="stlove34" cx="388.29" cy="162.45" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M388.89,162.45c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C388.62,161.85,388.89,162.12,388.89,162.45z"/>
												</g>
											</g>
											<g>
												<rect x="393.65" y="149.83" className="stlove13" width="9.18" height="17.03" />
												<g>
													<circle className="stlove34" cx="398.24" cy="154.21" r="3.67" />

													<ellipse transform="matrix(0.9439 -0.3304 0.3304 0.9439 -28.5852 140.2173)" className="stlove35" cx="398.24" cy="154.21" rx="3.1" ry="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 146.1069 498.8884)" className="stlove34" cx="398.24" cy="154.21" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,154.21c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6c0-0.33,0.27-0.6,0.6-0.6
							C398.57,153.61,398.84,153.88,398.84,154.21z"/>
												</g>
												<g>
													<circle className="stlove34" cx="398.24" cy="162.45" r="3.67" />
													<circle className="stlove35" cx="398.24" cy="162.45" r="3.1" />

													<ellipse transform="matrix(0.2591 -0.9658 0.9658 0.2591 138.1486 504.9931)" className="stlove34" cx="398.24" cy="162.45" rx="1.68" ry="1.68" />
													<path className="stlove13" d="M398.84,162.45c0,0.33-0.27,0.6-0.6,0.6c-0.33,0-0.6-0.27-0.6-0.6s0.27-0.6,0.6-0.6
							C398.57,161.85,398.84,162.12,398.84,162.45z"/>
												</g>
											</g>
										</g>
									</g>
									<polygon className="stlove36" points="383.54,145.76 383.85,149.28 402.52,149.28 402.52,145.76 		" />
								</g>
							</g>
							<g>
								<path className="stlove4" d="M483.17,296.34c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02h-20.24c-1.2,0-2.2,0.1-2.99,0.3
		c-0.79,0.2-1.42,0.54-1.9,1.02c-0.48,0.48-0.81,1.13-1,1.95c-0.19,0.82-0.28,1.83-0.28,3.03v0.46h26.17c0.68,0,1.02,0.34,1.02,1.02
		v3.66c0,0.68-0.34,1.02-1.02,1.02h-26.17v0.79c0,1.2,0.09,2.22,0.28,3.03c0.19,0.82,0.52,1.47,1,1.95c0.48,0.48,1.11,0.82,1.9,1.02
		c0.79,0.2,1.78,0.3,2.99,0.3h20.24c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02h-20.38c-2.35,0-4.34-0.22-5.98-0.65
		c-1.64-0.43-2.97-1.13-4.01-2.11c-1.04-0.97-1.79-2.24-2.27-3.8c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65
		c0.48-1.54,1.23-2.8,2.27-3.77c1.03-0.97,2.37-1.68,4.01-2.13c1.64-0.45,3.63-0.67,5.98-0.67H483.17z"/>
								<path className="stlove4" d="M495.53,296.34c0.68,0,1.02,0.34,1.02,1.02v18.48c0,1.24,0.1,2.26,0.3,3.08c0.2,0.82,0.53,1.47,1,1.95
		c0.46,0.48,1.09,0.82,1.88,1.02c0.79,0.2,1.78,0.3,2.99,0.3h18.76c0.68,0,1.02,0.34,1.02,1.02v4.54c0,0.68-0.34,1.02-1.02,1.02
		h-19.04c-2.35,0-4.34-0.22-5.98-0.65c-1.64-0.43-2.97-1.13-4.01-2.11c-1.04-0.97-1.79-2.24-2.27-3.8
		c-0.48-1.56-0.72-3.45-0.72-5.67v-19.18c0-0.68,0.35-1.02,1.07-1.02H495.53z"/>
								<path className="stlove4" d="M559.64,296.34c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02H539.4c-1.2,0-2.2,0.1-2.99,0.3
		c-0.79,0.2-1.42,0.54-1.9,1.02c-0.48,0.48-0.81,1.13-1,1.95c-0.19,0.82-0.28,1.83-0.28,3.03v0.46h26.17c0.68,0,1.02,0.34,1.02,1.02
		v3.66c0,0.68-0.34,1.02-1.02,1.02h-26.17v0.79c0,1.2,0.09,2.22,0.28,3.03c0.19,0.82,0.52,1.47,1,1.95c0.48,0.48,1.11,0.82,1.9,1.02
		c0.79,0.2,1.78,0.3,2.99,0.3h20.24c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02h-20.38c-2.35,0-4.34-0.22-5.98-0.65
		c-1.64-0.43-2.97-1.13-4.01-2.11c-1.04-0.97-1.79-2.24-2.27-3.8c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65
		c0.48-1.54,1.23-2.8,2.27-3.77c1.03-0.97,2.37-1.68,4.01-2.13c1.64-0.45,3.63-0.67,5.98-0.67H559.64z"/>
								<path className="stlove4" d="M599.52,296.34c0.68,0,1.02,0.34,1.02,1.02v4.54c0,0.71-0.34,1.07-1.02,1.07h-20.61c-1.21,0-2.2,0.1-2.99,0.3
		c-0.79,0.2-1.41,0.54-1.88,1.02c-0.46,0.48-0.79,1.12-1,1.92c-0.2,0.8-0.3,1.82-0.3,3.06v6.58c0,1.24,0.1,2.26,0.3,3.08
		c0.2,0.82,0.53,1.47,1,1.95c0.46,0.48,1.09,0.82,1.88,1.02c0.79,0.2,1.78,0.3,2.99,0.3h20.61c0.68,0,1.02,0.34,1.02,1.02v4.54
		c0,0.68-0.34,1.02-1.02,1.02h-20.89c-2.35,0-4.34-0.22-5.98-0.65c-1.64-0.43-2.97-1.13-4.01-2.11c-1.03-0.97-1.79-2.24-2.27-3.8
		c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65c0.48-1.54,1.24-2.8,2.27-3.77s2.37-1.68,4.01-2.13
		c1.64-0.45,3.63-0.67,5.98-0.67H599.52z"/>
								<path className="stlove4" d="M640.75,296.34c0.71,0,1.07,0.34,1.07,1.02v4.54c0,0.71-0.36,1.07-1.07,1.07H626.2v24.78
		c0,0.68-0.34,1.02-1.02,1.02h-5.05c-0.68,0-1.02-0.34-1.02-1.02v-24.78h-14.54c-0.71,0-1.07-0.35-1.07-1.07v-4.54
		c0-0.68,0.35-1.02,1.07-1.02H640.75z"/>
								<path className="stlove4" d="M672.2,296.34c3.55,0,6.1,0.8,7.64,2.41c1.54,1.61,2.32,3.98,2.32,7.13v2.64c0,2.66-0.54,4.76-1.62,6.3
		c-1.08,1.54-2.84,2.53-5.28,2.96l7.92,9.82c0.15,0.16,0.2,0.39,0.14,0.69c-0.06,0.31-0.31,0.46-0.74,0.46h-5.98
		c-0.4,0-0.68-0.05-0.83-0.14c-0.16-0.09-0.31-0.25-0.46-0.46l-7.32-9.63h-14.96v9.22c0,0.68-0.34,1.02-1.02,1.02h-5
		c-0.71,0-1.07-0.34-1.07-1.02v-30.02c0-0.93,0.46-1.39,1.39-1.39H672.2z M653.02,312.87h17.74c1.58,0,2.69-0.34,3.33-1.02
		c0.65-0.68,0.97-1.71,0.97-3.1v-1.95c0-1.39-0.32-2.42-0.97-3.1c-0.65-0.68-1.76-1.02-3.33-1.02h-17.14c-0.4,0-0.6,0.19-0.6,0.56
		V312.87z"/>
								<path className="stlove4" d="M713.93,296.34c2.35,0,4.35,0.22,6,0.67c1.65,0.45,2.99,1.16,4.03,2.13c1.03,0.97,1.78,2.23,2.25,3.77
		c0.46,1.54,0.69,3.43,0.69,5.65v7.97c0,2.22-0.23,4.12-0.69,5.67c-0.46,1.56-1.21,2.83-2.25,3.8c-1.04,0.97-2.38,1.68-4.03,2.11
		c-1.65,0.43-3.65,0.65-6,0.65h-14.31c-2.35,0-4.34-0.22-5.98-0.65c-1.64-0.43-2.97-1.13-4.01-2.11c-1.03-0.97-1.79-2.24-2.27-3.8
		c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65c0.48-1.54,1.24-2.8,2.27-3.77s2.37-1.68,4.01-2.13
		c1.64-0.45,3.63-0.67,5.98-0.67H713.93z M693.74,316.02c0,1.2,0.1,2.22,0.3,3.03c0.2,0.82,0.53,1.47,1,1.95
		c0.46,0.48,1.09,0.82,1.88,1.02c0.79,0.2,1.78,0.3,2.99,0.3h13.76c1.2,0,2.2-0.1,2.99-0.3c0.79-0.2,1.41-0.54,1.88-1.02
		c0.46-0.48,0.79-1.13,1-1.95c0.2-0.82,0.3-1.83,0.3-3.03v-6.95c0-1.2-0.1-2.22-0.3-3.03c-0.2-0.82-0.53-1.47-1-1.95
		c-0.46-0.48-1.09-0.82-1.88-1.02c-0.79-0.2-1.78-0.3-2.99-0.3H699.9c-1.21,0-2.2,0.1-2.99,0.3c-0.79,0.2-1.41,0.54-1.88,1.02
		c-0.46,0.48-0.79,1.13-1,1.95c-0.2,0.82-0.3,1.83-0.3,3.03V316.02z"/>
								<path className="stlove4" d="M515.61,351.92c0.68,0,1.02,0.34,1.02,1.02v18.48c0,1.24,0.1,2.26,0.3,3.08c0.2,0.82,0.53,1.47,1,1.95
		c0.46,0.48,1.09,0.82,1.88,1.02c0.79,0.2,1.78,0.3,2.99,0.3h18.76c0.68,0,1.02,0.34,1.02,1.02v4.54c0,0.68-0.34,1.02-1.02,1.02
		h-19.04c-2.35,0-4.34-0.22-5.98-0.65c-1.64-0.43-2.97-1.13-4.01-2.11c-1.04-0.97-1.79-2.24-2.27-3.8
		c-0.48-1.56-0.72-3.45-0.72-5.67v-19.18c0-0.68,0.35-1.02,1.07-1.02H515.61z"/>
								<path className="stlove4" d="M573.65,351.92c2.35,0,4.35,0.22,6,0.67c1.65,0.45,2.99,1.16,4.03,2.13c1.03,0.97,1.78,2.23,2.25,3.77
		c0.46,1.54,0.69,3.43,0.69,5.65v7.97c0,2.22-0.23,4.12-0.69,5.67c-0.46,1.56-1.21,2.83-2.25,3.8c-1.04,0.97-2.38,1.68-4.03,2.11
		c-1.65,0.43-3.65,0.65-6,0.65h-14.31c-2.35,0-4.34-0.22-5.98-0.65c-1.64-0.43-2.97-1.13-4.01-2.11c-1.03-0.97-1.79-2.24-2.27-3.8
		c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65c0.48-1.54,1.24-2.8,2.27-3.77s2.37-1.68,4.01-2.13
		c1.64-0.45,3.63-0.67,5.98-0.67H573.65z M553.46,371.61c0,1.2,0.1,2.22,0.3,3.03c0.2,0.82,0.53,1.47,1,1.95
		c0.46,0.48,1.09,0.82,1.88,1.02c0.79,0.2,1.78,0.3,2.99,0.3h13.76c1.2,0,2.2-0.1,2.99-0.3c0.79-0.2,1.41-0.54,1.88-1.02
		c0.46-0.48,0.79-1.13,1-1.95c0.2-0.82,0.3-1.83,0.3-3.03v-6.95c0-1.2-0.1-2.22-0.3-3.03c-0.2-0.82-0.53-1.47-1-1.95
		c-0.46-0.48-1.09-0.82-1.88-1.02c-0.79-0.2-1.78-0.3-2.99-0.3h-13.76c-1.21,0-2.2,0.1-2.99,0.3c-0.79,0.2-1.41,0.54-1.88,1.02
		c-0.46,0.48-0.79,1.13-1,1.95c-0.2,0.82-0.3,1.83-0.3,3.03V371.61z"/>
								<path className="stlove4" d="M594.73,351.92c0.31,0,0.53,0.05,0.67,0.14c0.14,0.09,0.27,0.25,0.39,0.46l13.57,24.92
		c0.09,0.22,0.28,0.32,0.56,0.32h0.23c0.21,0,0.39-0.11,0.51-0.32l13.39-24.92c0.19-0.4,0.54-0.6,1.07-0.6h6.07
		c0.37,0,0.59,0.1,0.67,0.3c0.08,0.2,0.04,0.46-0.12,0.76l-15.19,27.84c-0.77,1.42-1.53,2.36-2.27,2.83s-1.61,0.69-2.59,0.69H609
		c-1.2,0-2.2-0.23-2.99-0.69c-0.79-0.46-1.57-1.4-2.34-2.83l-15.38-27.84c-0.16-0.31-0.19-0.56-0.12-0.76
		c0.08-0.2,0.32-0.3,0.72-0.3H594.73z"/>
								<path className="stlove4" d="M666.8,351.92c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02h-20.24c-1.2,0-2.2,0.1-2.99,0.3
		c-0.79,0.2-1.42,0.54-1.9,1.02c-0.48,0.48-0.81,1.13-1,1.95c-0.18,0.82-0.28,1.83-0.28,3.03v0.46h26.17c0.68,0,1.02,0.34,1.02,1.02
		v3.66c0,0.68-0.34,1.02-1.02,1.02H640.4v0.79c0,1.2,0.09,2.22,0.28,3.03c0.19,0.82,0.52,1.47,1,1.95c0.48,0.48,1.11,0.82,1.9,1.02
		c0.79,0.2,1.78,0.3,2.99,0.3h20.24c0.71,0,1.07,0.34,1.07,1.02v4.4c0,0.68-0.36,1.02-1.07,1.02h-20.38c-2.35,0-4.34-0.22-5.98-0.65
		c-1.64-0.43-2.97-1.13-4.01-2.11c-1.03-0.97-1.79-2.24-2.27-3.8c-0.48-1.56-0.72-3.45-0.72-5.67v-7.97c0-2.22,0.24-4.11,0.72-5.65
		c0.48-1.54,1.24-2.8,2.27-3.77s2.37-1.68,4.01-2.13c1.64-0.45,3.63-0.67,5.98-0.67H666.8z"/>
							</g>
							<g>
								<path className="stlove4" d="M508.13,190.46c1.8,0,3.08,0.36,3.83,1.07c0.76,0.72,1.14,1.8,1.14,3.25v1.26c0,1.47-0.56,2.57-1.68,3.32
		c1.2,0.7,1.81,1.82,1.81,3.38v1.52c0,0.7-0.08,1.33-0.24,1.88s-0.41,1.03-0.77,1.43c-0.36,0.39-0.83,0.69-1.43,0.9
		c-0.59,0.21-1.33,0.31-2.2,0.31h-15.55c-0.52,0-0.79-0.26-0.79-0.79v-16.75c0-0.52,0.26-0.79,0.79-0.79H508.13z M496.28,198.07
		h10.73c0.87,0,1.47-0.13,1.78-0.39c0.31-0.26,0.47-0.65,0.47-1.15v-0.89c0-0.54-0.15-0.94-0.46-1.19c-0.31-0.25-0.8-0.38-1.48-0.38
		h-10.71c-0.23,0-0.34,0.11-0.34,0.34V198.07z M496.28,200.93v3.9c0,0.23,0.11,0.34,0.34,0.34h10.73c0.7,0,1.19-0.13,1.49-0.38
		s0.45-0.66,0.45-1.22v-0.99c0-0.54-0.16-0.95-0.48-1.23c-0.32-0.28-0.92-0.42-1.79-0.42H496.28z"/>
								<path className="stlove4" d="M527.09,190.46c0.66,0,1.22,0.14,1.67,0.41s0.9,0.8,1.33,1.58l8.66,15.73c0.09,0.17,0.11,0.32,0.07,0.43
		s-0.17,0.17-0.38,0.17h-3.32c-0.3,0-0.5-0.11-0.6-0.34l-1.86-3.38h-12.3l-1.81,3.38c-0.12,0.23-0.32,0.34-0.6,0.34h-3.4
		c-0.23,0-0.36-0.06-0.41-0.17c-0.04-0.11-0.02-0.26,0.07-0.43l8.59-15.73c0.44-0.79,0.86-1.31,1.28-1.58s0.91-0.41,1.47-0.41
		H527.09z M522.01,202.03h9l-4.16-7.67c-0.07-0.12-0.17-0.18-0.29-0.18h-0.16c-0.12,0-0.22,0.06-0.29,0.18L522.01,202.03z"/>
								<path className="stlove4" d="M558.86,190.46c0.38,0,0.58,0.19,0.58,0.58v2.57c0,0.4-0.19,0.6-0.58,0.6h-11.65c-0.68,0-1.24,0.06-1.69,0.17
		c-0.45,0.11-0.8,0.31-1.06,0.58s-0.45,0.63-0.56,1.09c-0.11,0.45-0.17,1.03-0.17,1.73v3.72c0,0.7,0.06,1.28,0.17,1.74
		c0.11,0.46,0.3,0.83,0.56,1.1s0.62,0.46,1.06,0.58c0.44,0.11,1.01,0.17,1.69,0.17h11.65c0.38,0,0.58,0.19,0.58,0.58v2.57
		c0,0.38-0.19,0.58-0.58,0.58h-11.8c-1.33,0-2.45-0.12-3.38-0.37c-0.92-0.24-1.68-0.64-2.26-1.19c-0.58-0.55-1.01-1.26-1.28-2.15
		s-0.41-1.95-0.41-3.21v-4.5c0-1.26,0.14-2.32,0.41-3.19c0.27-0.87,0.7-1.58,1.28-2.13c0.58-0.55,1.34-0.95,2.26-1.2
		c0.92-0.25,2.05-0.38,3.38-0.38H558.86z"/>
								<path className="stlove4" d="M565.67,190.46c0.38,0,0.58,0.19,0.58,0.58V198h3.69c0.42,0,0.77-0.01,1.05-0.04
		c0.28-0.03,0.52-0.08,0.73-0.17c0.21-0.09,0.4-0.21,0.58-0.37c0.17-0.16,0.36-0.36,0.55-0.6l4.5-6.02
		c0.09-0.12,0.17-0.21,0.26-0.26c0.09-0.05,0.25-0.08,0.5-0.08h3.25c0.23,0,0.36,0.07,0.41,0.22c0.04,0.15,0.02,0.28-0.07,0.41
		l-5.08,6.57c-0.3,0.4-0.57,0.74-0.82,1.02s-0.5,0.52-0.75,0.73c0.68,0.42,1.34,1.05,1.99,1.88l5.37,6.81
		c0.07,0.09,0.1,0.22,0.08,0.41s-0.16,0.27-0.42,0.27h-3.35c-0.23,0-0.38-0.03-0.47-0.08c-0.09-0.05-0.17-0.14-0.26-0.26l-4.82-6.23
		c-0.35-0.45-0.72-0.76-1.12-0.93c-0.4-0.17-1-0.25-1.81-0.25h-3.98v7.17c0,0.38-0.19,0.58-0.58,0.58h-2.83
		c-0.4,0-0.6-0.19-0.6-0.58v-17.17c0-0.38,0.2-0.58,0.6-0.58H565.67z"/>
								<path className="stlove4" d="M602.78,190.46c0.38,0,0.58,0.19,0.58,0.58v2.49c0,0.38-0.19,0.58-0.58,0.58h-13.11
		c-0.51,0-0.86,0.13-1.07,0.39c-0.21,0.26-0.31,0.62-0.31,1.07v0.89c0,0.98,0.45,1.47,1.36,1.47h9.82c1.52,0,2.66,0.39,3.43,1.17
		c0.77,0.78,1.15,1.89,1.15,3.34v2.09c0,1.27-0.38,2.3-1.12,3.09c-0.75,0.79-1.92,1.18-3.51,1.18h-14.5c-0.4,0-0.6-0.19-0.6-0.58
		v-2.49c0-0.38,0.2-0.58,0.6-0.58h13.74c0.51,0,0.86-0.13,1.07-0.39c0.21-0.26,0.31-0.62,0.31-1.07v-1.07
		c0-0.98-0.45-1.47-1.36-1.47h-9.82c-1.52,0-2.66-0.39-3.43-1.17c-0.77-0.78-1.15-1.89-1.15-3.34v-1.91c0-1.27,0.38-2.3,1.13-3.09
		c0.75-0.79,1.92-1.18,3.51-1.18H602.78z"/>
								<path className="stlove4" d="M626.94,190.46c0.4,0,0.6,0.19,0.6,0.58v2.57c0,0.4-0.2,0.6-0.6,0.6h-8.22v14c0,0.38-0.19,0.58-0.58,0.58
		h-2.85c-0.38,0-0.58-0.19-0.58-0.58v-14h-8.22c-0.4,0-0.6-0.2-0.6-0.6v-2.57c0-0.38,0.2-0.58,0.6-0.58H626.94z"/>
								<path className="stlove4" d="M638.09,190.46c0.66,0,1.22,0.14,1.67,0.41s0.9,0.8,1.33,1.58l8.66,15.73c0.09,0.17,0.11,0.32,0.07,0.43
		s-0.17,0.17-0.38,0.17h-3.32c-0.3,0-0.5-0.11-0.6-0.34l-1.86-3.38h-12.3l-1.81,3.38c-0.12,0.23-0.32,0.34-0.6,0.34h-3.4
		c-0.23,0-0.36-0.06-0.41-0.17c-0.04-0.11-0.02-0.26,0.07-0.43l8.59-15.73c0.44-0.79,0.86-1.31,1.28-1.58
		c0.42-0.27,0.91-0.41,1.47-0.41H638.09z M633.02,202.03h9l-4.16-7.67c-0.07-0.12-0.17-0.18-0.29-0.18h-0.16
		c-0.12,0-0.22,0.06-0.29,0.18L633.02,202.03z"/>
								<path className="stlove4" d="M671.34,190.46c0.38,0,0.58,0.19,0.58,0.58v2.57c0,0.4-0.19,0.6-0.58,0.6h-13.11c-0.68,0-1.24,0.06-1.69,0.17
		c-0.45,0.11-0.8,0.31-1.06,0.58s-0.45,0.63-0.56,1.09c-0.11,0.45-0.17,1.03-0.17,1.73v3.77c0,0.7,0.06,1.28,0.17,1.74
		c0.11,0.46,0.3,0.83,0.56,1.1c0.26,0.27,0.62,0.46,1.06,0.58c0.44,0.11,1.01,0.17,1.69,0.17h8.64c0.45,0,0.79-0.12,0.99-0.35
		c0.21-0.24,0.31-0.65,0.31-1.24v-2.12c0-0.23-0.1-0.34-0.31-0.34h-7.67c-0.38,0-0.58-0.2-0.58-0.6v-1.96c0-0.4,0.19-0.6,0.58-0.6
		h10.92c0.52,0,0.79,0.26,0.79,0.79v6.1c0,1.47-0.28,2.5-0.84,3.1s-1.36,0.9-2.41,0.9h-10.57c-1.33,0-2.45-0.12-3.38-0.37
		c-0.92-0.24-1.68-0.64-2.26-1.19c-0.58-0.55-1.01-1.26-1.28-2.15s-0.41-1.95-0.41-3.21v-4.5c0-1.26,0.13-2.32,0.41-3.19
		c0.27-0.87,0.7-1.58,1.28-2.13c0.58-0.55,1.34-0.95,2.26-1.2c0.92-0.25,2.05-0.38,3.38-0.38H671.34z"/>
								<path className="stlove4" d="M693.82,190.46c0.4,0,0.6,0.19,0.6,0.58v2.49c0,0.38-0.2,0.58-0.6,0.58h-11.44c-0.68,0-1.24,0.06-1.69,0.17
		c-0.44,0.11-0.8,0.31-1.07,0.58c-0.27,0.27-0.46,0.64-0.56,1.1s-0.16,1.03-0.16,1.71v0.26h14.79c0.38,0,0.58,0.19,0.58,0.58v2.07
		c0,0.38-0.19,0.58-0.58,0.58H678.9v0.44c0,0.68,0.05,1.25,0.16,1.71c0.1,0.46,0.29,0.83,0.56,1.1s0.63,0.46,1.07,0.58
		c0.45,0.11,1.01,0.17,1.69,0.17h11.44c0.4,0,0.6,0.19,0.6,0.58v2.49c0,0.38-0.2,0.58-0.6,0.58H682.3c-1.33,0-2.45-0.12-3.38-0.37
		c-0.92-0.24-1.68-0.64-2.26-1.19c-0.58-0.55-1.01-1.26-1.28-2.15s-0.41-1.95-0.41-3.21v-4.5c0-1.26,0.13-2.32,0.41-3.19
		c0.27-0.87,0.7-1.58,1.28-2.13c0.58-0.55,1.34-0.95,2.26-1.2c0.92-0.25,2.05-0.38,3.38-0.38H693.82z"/>
							</g>
							<g>
								<path className="stlove4" d="M460.39,492.1c3.12,0,5.34,0.62,6.66,1.86c1.32,1.24,1.98,3.12,1.98,5.64v2.18c0,2.55-0.97,4.47-2.91,5.77
		c2.09,1.21,3.14,3.17,3.14,5.87v2.64c0,1.21-0.14,2.3-0.41,3.27c-0.27,0.97-0.72,1.8-1.34,2.48c-0.62,0.68-1.45,1.21-2.48,1.57
		c-1.03,0.36-2.3,0.55-3.82,0.55H434.2c-0.91,0-1.36-0.45-1.36-1.36v-29.1c0-0.91,0.45-1.36,1.36-1.36H460.39z M439.8,505.33h18.64
		c1.52,0,2.55-0.23,3.09-0.68c0.55-0.45,0.82-1.12,0.82-2v-1.55c0-0.94-0.27-1.63-0.8-2.07c-0.53-0.44-1.39-0.66-2.57-0.66h-18.6
		c-0.39,0-0.59,0.2-0.59,0.59V505.33z M439.8,510.29v6.77c0,0.39,0.2,0.59,0.59,0.59h18.64c1.21,0,2.08-0.22,2.59-0.66
		c0.51-0.44,0.77-1.14,0.77-2.11v-1.73c0-0.94-0.28-1.65-0.84-2.14c-0.56-0.48-1.6-0.73-3.11-0.73H439.8z"/>
								<path className="stlove4" d="M501.04,492.1c2.3,0,4.27,0.22,5.89,0.66c1.62,0.44,2.94,1.14,3.96,2.09c1.02,0.95,1.75,2.19,2.21,3.71
		c0.45,1.52,0.68,3.36,0.68,5.55v7.82c0,2.18-0.23,4.04-0.68,5.57c-0.45,1.53-1.19,2.77-2.21,3.73c-1.02,0.95-2.33,1.64-3.96,2.07
		c-1.62,0.42-3.58,0.64-5.89,0.64h-14.05c-2.3,0-4.26-0.21-5.87-0.64c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73
		c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82c0-2.18,0.23-4.03,0.7-5.55c0.47-1.52,1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09
		c1.61-0.44,3.56-0.66,5.87-0.66H501.04z M481.21,511.43c0,1.18,0.1,2.18,0.3,2.98c0.2,0.8,0.52,1.44,0.98,1.91
		c0.45,0.47,1.07,0.8,1.84,1c0.77,0.2,1.75,0.3,2.93,0.3h13.5c1.18,0,2.16-0.1,2.93-0.3c0.77-0.2,1.39-0.53,1.84-1
		c0.45-0.47,0.78-1.11,0.98-1.91c0.2-0.8,0.3-1.8,0.3-2.98v-6.82c0-1.18-0.1-2.17-0.3-2.98c-0.2-0.8-0.52-1.44-0.98-1.91
		c-0.45-0.47-1.07-0.8-1.84-1c-0.77-0.2-1.75-0.3-2.93-0.3h-13.5c-1.18,0-2.16,0.1-2.93,0.3c-0.77,0.2-1.39,0.53-1.84,1
		c-0.45,0.47-0.78,1.11-0.98,1.91c-0.2,0.8-0.3,1.8-0.3,2.98V511.43z"/>
								<path className="stlove4" d="M553.46,492.1c0.42,0,0.66,0.14,0.71,0.43c0.04,0.29-0.04,0.54-0.25,0.75l-13.96,14.14l14.6,15.32
		c0.21,0.21,0.29,0.46,0.25,0.75c-0.05,0.29-0.28,0.43-0.71,0.43h-6.23c-0.36,0-0.65-0.05-0.86-0.14c-0.21-0.09-0.41-0.26-0.59-0.5
		l-11.23-11.78l-11.28,11.78c-0.21,0.24-0.42,0.41-0.61,0.5c-0.2,0.09-0.49,0.14-0.89,0.14h-5.91c-0.39,0-0.61-0.14-0.66-0.43
		c-0.05-0.29,0.04-0.54,0.25-0.75l14.96-15.55l-13.5-13.91c-0.18-0.21-0.26-0.46-0.23-0.75c0.03-0.29,0.26-0.43,0.68-0.43h6.23
		c0.36,0,0.65,0.05,0.86,0.16c0.21,0.11,0.41,0.27,0.59,0.48l9.91,10.55l10.5-10.55c0.18-0.21,0.38-0.37,0.59-0.48
		c0.21-0.11,0.5-0.16,0.86-0.16H553.46z"/>
								<path className="stlove4" d="M593.97,492.1c1.15,0,2.12,0.24,2.91,0.7c0.79,0.47,1.56,1.39,2.32,2.75l15.05,27.32
		c0.15,0.3,0.19,0.55,0.11,0.75c-0.08,0.2-0.29,0.3-0.66,0.3h-5.78c-0.52,0-0.86-0.2-1.04-0.59l-3.23-5.87h-21.37l-3.14,5.87
		c-0.21,0.39-0.56,0.59-1.05,0.59h-5.91c-0.39,0-0.63-0.1-0.71-0.3c-0.08-0.2-0.04-0.45,0.11-0.75l14.91-27.32
		c0.76-1.36,1.5-2.28,2.23-2.75c0.73-0.47,1.58-0.7,2.54-0.7H593.97z M585.15,512.2h15.64l-7.23-13.32
		c-0.12-0.21-0.29-0.32-0.5-0.32h-0.27c-0.21,0-0.38,0.11-0.5,0.32L585.15,512.2z"/>
								<path className="stlove4" d="M643.89,492.1c3.49,0,5.99,0.79,7.5,2.36c1.52,1.58,2.27,3.91,2.27,7v2.59c0,2.61-0.53,4.67-1.59,6.18
		c-1.06,1.52-2.79,2.49-5.18,2.91l7.77,9.64c0.15,0.15,0.2,0.38,0.14,0.68c-0.06,0.3-0.3,0.45-0.73,0.45h-5.87
		c-0.39,0-0.67-0.05-0.82-0.14c-0.15-0.09-0.3-0.24-0.46-0.45l-7.18-9.46h-14.69v9.05c0,0.67-0.33,1-1,1h-4.91
		c-0.7,0-1.05-0.33-1.05-1v-29.46c0-0.91,0.45-1.36,1.36-1.36H643.89z M625.07,508.34h17.41c1.54,0,2.64-0.33,3.27-1
		c0.64-0.67,0.95-1.68,0.95-3.05v-1.91c0-1.36-0.32-2.38-0.95-3.05c-0.64-0.67-1.73-1-3.27-1h-16.82c-0.39,0-0.59,0.18-0.59,0.55
		V508.34z"/>
								<path className="stlove4" d="M690.81,492.1c0.7,0,1.04,0.33,1.04,1v4.32c0,0.67-0.35,1-1.04,1h-19.87c-1.18,0-2.16,0.1-2.93,0.3
		c-0.77,0.2-1.39,0.53-1.87,1c-0.47,0.47-0.79,1.11-0.98,1.91c-0.18,0.8-0.27,1.8-0.27,2.98v0.45h25.69c0.67,0,1,0.33,1,1v3.59
		c0,0.67-0.33,1-1,1h-25.69v0.77c0,1.18,0.09,2.18,0.27,2.98c0.18,0.8,0.51,1.44,0.98,1.91c0.47,0.47,1.09,0.8,1.87,1
		c0.77,0.2,1.75,0.3,2.93,0.3h19.87c0.7,0,1.04,0.33,1.04,1v4.32c0,0.67-0.35,1-1.04,1h-20c-2.3,0-4.26-0.21-5.87-0.64
		c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82c0-2.18,0.23-4.03,0.7-5.55
		c0.47-1.52,1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09c1.61-0.44,3.56-0.66,5.87-0.66H690.81z"/>
								<path className="stlove4" d="M717.27,492.1c1.15,0,2.12,0.24,2.91,0.7c0.79,0.47,1.56,1.39,2.32,2.75l15.05,27.32
		c0.15,0.3,0.19,0.55,0.11,0.75c-0.08,0.2-0.29,0.3-0.66,0.3h-5.78c-0.52,0-0.86-0.2-1.04-0.59l-3.23-5.87h-21.37l-3.14,5.87
		c-0.21,0.39-0.56,0.59-1.05,0.59h-5.91c-0.39,0-0.63-0.1-0.71-0.3c-0.08-0.2-0.04-0.45,0.11-0.75l14.91-27.32
		c0.76-1.36,1.5-2.28,2.23-2.75c0.73-0.47,1.58-0.7,2.54-0.7H717.27z M708.45,512.2h15.64l-7.23-13.32
		c-0.12-0.21-0.29-0.32-0.5-0.32h-0.27c-0.21,0-0.38,0.11-0.5,0.32L708.45,512.2z"/>
							</g>
							<g>
								<path id="4" className="none" d="M993.88,808.29l-43.76-201.88l-6.9-32.47H241.59l-43.24,240.71c-3.53,42.35,64.24,46.59,64.24,46.59
		l542.12,1.41c120.35,0,136.24-4.24,136.24-4.24C1009.41,845,993.88,808.29,993.88,808.29z"/>
							</g>
							<g>
								<path className="stlove4" d="M395.74,695.51c2.46,0,4.56,0.25,6.32,0.75c1.76,0.5,3.2,1.27,4.32,2.32c1.12,1.05,1.95,2.38,2.48,4
		c0.53,1.62,0.8,3.54,0.8,5.75v6.18c0,2.21-0.27,4.13-0.8,5.75c-0.53,1.62-1.36,2.96-2.48,4c-1.12,1.05-2.56,1.82-4.32,2.32
		c-1.76,0.5-3.86,0.75-6.32,0.75h-21.28c-0.91,0-1.36-0.46-1.36-1.36v-29.1c0-0.91,0.45-1.36,1.36-1.36H395.74z M380.06,720.43
		c0,0.39,0.2,0.59,0.59,0.59h14.91c1.33,0,2.46-0.12,3.36-0.36c0.91-0.24,1.64-0.64,2.21-1.18c0.56-0.54,0.96-1.27,1.21-2.18
		c0.24-0.91,0.36-2.03,0.36-3.37v-5c0-1.33-0.12-2.46-0.36-3.36c-0.24-0.91-0.64-1.64-1.21-2.18c-0.56-0.54-1.3-0.94-2.21-1.18
		c-0.91-0.24-2.03-0.36-3.36-0.36h-14.91c-0.39,0-0.59,0.21-0.59,0.64V720.43z"/>
								<path className="stlove4" d="M433.71,695.51c1.15,0,2.12,0.24,2.91,0.7c0.79,0.47,1.56,1.39,2.32,2.75l15.05,27.33
		c0.15,0.3,0.19,0.55,0.11,0.75c-0.08,0.2-0.3,0.3-0.66,0.3h-5.77c-0.52,0-0.86-0.2-1.05-0.59l-3.23-5.87h-21.37l-3.14,5.87
		c-0.21,0.39-0.56,0.59-1.05,0.59h-5.91c-0.39,0-0.63-0.1-0.71-0.3c-0.08-0.2-0.04-0.45,0.11-0.75l14.91-27.33
		c0.76-1.36,1.5-2.28,2.23-2.75c0.73-0.47,1.58-0.7,2.55-0.7H433.71z M424.88,715.61h15.64l-7.23-13.32
		c-0.12-0.21-0.29-0.32-0.5-0.32h-0.27c-0.21,0-0.38,0.11-0.5,0.32L424.88,715.61z"/>
								<path className="stlove4" d="M465.94,695.51c0.73,0,1.33,0.03,1.82,0.09c0.48,0.06,0.91,0.19,1.27,0.39c0.36,0.2,0.71,0.47,1.05,0.82
		c0.33,0.35,0.71,0.81,1.14,1.39l16.91,22.19c0.12,0.21,0.32,0.32,0.59,0.32h0.41c0.24,0,0.36-0.15,0.36-0.45v-23.73
		c0-0.67,0.33-1,1-1h4.77c0.67,0,1,0.33,1,1v26.1c0,1.85-0.33,3.1-1,3.75c-0.67,0.65-1.7,0.98-3.09,0.98h-3.91
		c-0.7,0-1.28-0.03-1.75-0.09c-0.47-0.06-0.89-0.18-1.25-0.36s-0.72-0.45-1.07-0.8c-0.35-0.35-0.75-0.83-1.2-1.43l-16.96-22.19
		c-0.18-0.21-0.38-0.32-0.59-0.32h-0.41c-0.24,0-0.36,0.15-0.36,0.46v23.73c0,0.67-0.33,1-1,1h-4.77c-0.7,0-1.05-0.33-1.05-1v-26.1
		c0-1.85,0.33-3.1,1-3.75c0.67-0.65,1.7-0.98,3.09-0.98H465.94z"/>
								<path className="stlove4" d="M535.18,695.51c0.67,0,1,0.33,1,1v4.46c0,0.7-0.33,1.05-1,1.05h-20.23c-1.18,0-2.16,0.1-2.93,0.29
		c-0.77,0.2-1.39,0.53-1.84,1c-0.45,0.47-0.78,1.1-0.98,1.89c-0.2,0.79-0.3,1.79-0.3,3v6.46c0,1.21,0.1,2.22,0.3,3.02
		c0.2,0.8,0.52,1.44,0.98,1.91s1.07,0.8,1.84,1c0.77,0.2,1.75,0.3,2.93,0.3h20.23c0.67,0,1,0.33,1,1v4.46c0,0.67-0.33,1-1,1h-20.5
		c-2.3,0-4.26-0.21-5.87-0.64c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82
		c0-2.18,0.23-4.03,0.7-5.55c0.47-1.52,1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09c1.61-0.44,3.56-0.66,5.87-0.66H535.18z"
								/>
								<path className="stlove4" d="M573.42,695.51c0.7,0,1.05,0.33,1.05,1v4.32c0,0.67-0.35,1-1.05,1h-19.87c-1.18,0-2.16,0.1-2.93,0.3
		c-0.77,0.2-1.39,0.53-1.86,1c-0.47,0.47-0.8,1.11-0.98,1.91s-0.27,1.8-0.27,2.98v0.46h25.69c0.67,0,1,0.33,1,1v3.59
		c0,0.67-0.33,1-1,1H547.5v0.77c0,1.18,0.09,2.17,0.27,2.98c0.18,0.8,0.51,1.44,0.98,1.91c0.47,0.47,1.09,0.8,1.86,1
		c0.77,0.2,1.75,0.29,2.93,0.29h19.87c0.7,0,1.05,0.33,1.05,1v4.32c0,0.67-0.35,1-1.05,1h-20c-2.3,0-4.26-0.21-5.87-0.64
		c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82c0-2.18,0.23-4.03,0.7-5.55
		c0.47-1.52,1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09s3.56-0.66,5.87-0.66H573.42z"/>
								<path className="stlove4" d="M627.3,695.51c0.7,0,1.05,0.33,1.05,1v4.32c0,0.67-0.35,1-1.05,1h-19.73c-1.18,0-2.16,0.1-2.93,0.3
		c-0.77,0.2-1.39,0.53-1.84,1c-0.46,0.47-0.78,1.11-0.98,1.91c-0.2,0.8-0.3,1.8-0.3,2.98v0.91h25.55c0.67,0,1,0.33,1,1v3.59
		c0,0.67-0.33,1-1,1h-25.55v11.82c0,0.67-0.33,1-1,1h-4.91c-0.7,0-1.05-0.33-1.05-1v-18.82c0-2.18,0.23-4.03,0.71-5.55
		c0.47-1.52,1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09s3.56-0.66,5.87-0.66H627.3z"/>
								<path className="stlove4" d="M638.71,695.51c0.67,0,1,0.33,1,1v18.14c0,1.21,0.1,2.22,0.3,3.02c0.2,0.8,0.52,1.44,0.98,1.91
		c0.45,0.47,1.07,0.8,1.84,1c0.77,0.2,1.75,0.3,2.93,0.3h18.41c0.67,0,1,0.33,1,1v4.46c0,0.67-0.33,1-1,1h-18.69
		c-2.3,0-4.26-0.21-5.87-0.64c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73c-0.47-1.53-0.71-3.39-0.71-5.57v-18.82
		c0-0.67,0.35-1,1.05-1H638.71z"/>
								<path className="stlove4" d="M695.68,695.51c2.3,0,4.27,0.22,5.89,0.66c1.62,0.44,2.94,1.14,3.96,2.09c1.02,0.95,1.75,2.19,2.21,3.71
		c0.46,1.52,0.68,3.36,0.68,5.55v7.82c0,2.18-0.23,4.04-0.68,5.57c-0.45,1.53-1.19,2.77-2.21,3.73c-1.02,0.95-2.33,1.64-3.96,2.07
		c-1.62,0.42-3.58,0.64-5.89,0.64h-14.05c-2.3,0-4.26-0.21-5.87-0.64c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73
		c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82c0-2.18,0.23-4.03,0.7-5.55s1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09
		c1.61-0.44,3.56-0.66,5.87-0.66H695.68z M675.85,714.83c0,1.18,0.1,2.17,0.29,2.98c0.2,0.8,0.52,1.44,0.98,1.91
		c0.46,0.47,1.07,0.8,1.84,1c0.77,0.2,1.75,0.29,2.93,0.29h13.5c1.18,0,2.16-0.1,2.93-0.29c0.77-0.2,1.39-0.53,1.84-1
		c0.45-0.47,0.78-1.11,0.98-1.91c0.2-0.8,0.29-1.8,0.29-2.98v-6.82c0-1.18-0.1-2.17-0.29-2.98c-0.2-0.8-0.52-1.44-0.98-1.91
		c-0.46-0.47-1.07-0.8-1.84-1c-0.77-0.2-1.75-0.3-2.93-0.3h-13.5c-1.18,0-2.16,0.1-2.93,0.3c-0.77,0.2-1.39,0.53-1.84,1
		c-0.45,0.47-0.78,1.11-0.98,1.91s-0.29,1.8-0.29,2.98V714.83z"/>
								<path className="stlove4" d="M740.46,695.51c2.3,0,4.27,0.22,5.89,0.66c1.62,0.44,2.94,1.14,3.96,2.09c1.02,0.95,1.75,2.19,2.21,3.71
		c0.46,1.52,0.68,3.36,0.68,5.55v7.82c0,2.18-0.23,4.04-0.68,5.57c-0.45,1.53-1.19,2.77-2.21,3.73c-1.02,0.95-2.33,1.64-3.96,2.07
		c-1.62,0.42-3.58,0.64-5.89,0.64h-14.05c-2.3,0-4.26-0.21-5.87-0.64c-1.61-0.42-2.92-1.11-3.93-2.07c-1.02-0.96-1.76-2.2-2.23-3.73
		c-0.47-1.53-0.7-3.39-0.7-5.57v-7.82c0-2.18,0.23-4.03,0.7-5.55s1.21-2.75,2.23-3.71c1.02-0.96,2.33-1.65,3.93-2.09
		c1.61-0.44,3.56-0.66,5.87-0.66H740.46z M720.64,714.83c0,1.18,0.1,2.17,0.29,2.98c0.2,0.8,0.52,1.44,0.98,1.91
		c0.46,0.47,1.07,0.8,1.84,1c0.77,0.2,1.75,0.29,2.93,0.29h13.5c1.18,0,2.16-0.1,2.93-0.29c0.77-0.2,1.39-0.53,1.84-1
		c0.45-0.47,0.78-1.11,0.98-1.91c0.2-0.8,0.29-1.8,0.29-2.98v-6.82c0-1.18-0.1-2.17-0.29-2.98c-0.2-0.8-0.52-1.44-0.98-1.91
		c-0.46-0.47-1.07-0.8-1.84-1c-0.77-0.2-1.75-0.3-2.93-0.3h-13.5c-1.18,0-2.16,0.1-2.93,0.3c-0.77,0.2-1.39,0.53-1.84,1
		c-0.45,0.47-0.78,1.11-0.98,1.91s-0.29,1.8-0.29,2.98V714.83z"/>
								<path className="stlove4" d="M784.61,695.51c3.49,0,5.99,0.79,7.5,2.36c1.51,1.58,2.27,3.91,2.27,7v2.59c0,2.61-0.53,4.67-1.59,6.18
		c-1.06,1.52-2.79,2.49-5.18,2.91l7.77,9.64c0.15,0.15,0.2,0.38,0.14,0.68c-0.06,0.3-0.3,0.46-0.73,0.46h-5.87
		c-0.39,0-0.67-0.05-0.82-0.14c-0.15-0.09-0.3-0.24-0.46-0.45l-7.18-9.46h-14.69v9.05c0,0.67-0.33,1-1,1h-4.91
		c-0.7,0-1.05-0.33-1.05-1v-29.46c0-0.91,0.46-1.36,1.36-1.36H784.61z M765.78,711.74h17.41c1.55,0,2.64-0.33,3.27-1
		c0.64-0.67,0.95-1.68,0.95-3.05v-1.91c0-1.36-0.32-2.38-0.95-3.05c-0.64-0.67-1.73-1-3.27-1h-16.82c-0.39,0-0.59,0.18-0.59,0.55
		V711.74z"/>
							</g>
							<rect x="389" y="36.06" className="stlove38" width="411.52" height="12.9" />
							<g>
								<rect x="810.41" y="213.47" className="stlove39" width="58.82" height="8" />
								<g>
									<rect x="810.41" y="133" className="stlove39" width="58.82" height="95.29" />
									<rect x="810.88" y="142.18" className="stlove40" width="27.53" height="66.82" />
									<rect x="841" y="142.18" className="stlove40" width="27.53" height="66.82" />
									<rect x="814.65" y="145" className="stlove40" width="15.06" height="15.06" />
									<circle className="stlove41" cx="819.12" cy="153" r="5.65" />
									<circle className="stlove41" cx="831.12" cy="153" r="5.65" />
									<circle className="stlove41" cx="819.12" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="831.12" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="819.12" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="831.12" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="819.12" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="831.12" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="849" cy="153" r="5.65" />
									<circle className="stlove41" cx="861" cy="153" r="5.65" />
									<circle className="stlove41" cx="849" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="861" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="849" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="861" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="849" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="861" cy="193.94" r="5.65" />
								</g>
								<circle className="stlove40" cx="819.06" cy="153.12" r="2.76" />
								<circle className="stlove40" cx="831.06" cy="153.12" r="2.76" />
								<circle className="stlove40" cx="819.06" cy="166.41" r="2.76" />
								<circle className="stlove40" cx="831.06" cy="166.41" r="2.76" />
								<circle className="stlove40" cx="819.06" cy="180.65" r="2.76" />
								<circle className="stlove40" cx="831.06" cy="180.65" r="2.76" />
								<g>
									<circle className="stlove40" cx="819.06" cy="193.71" r="2.76" />
									<circle className="stlove40" cx="831.06" cy="193.71" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="848.94" cy="193.71" r="2.76" />
									<circle className="stlove40" cx="860.94" cy="193.71" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="848.94" cy="180.06" r="2.76" />
									<circle className="stlove40" cx="860.94" cy="180.06" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="848.94" cy="166.41" r="2.76" />
									<circle className="stlove40" cx="860.94" cy="166.41" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="848.94" cy="152.88" r="2.76" />
									<circle className="stlove40" cx="860.94" cy="152.88" r="2.76" />
								</g>
							</g>
							<g>
								<rect x="317.53" y="213.47" className="stlove39" width="58.82" height="8" />
								<g>
									<rect x="317.53" y="133" className="stlove39" width="58.82" height="95.29" />
									<rect x="318" y="142.18" className="stlove40" width="27.53" height="66.82" />
									<rect x="348.12" y="142.18" className="stlove40" width="27.53" height="66.82" />
									<rect x="321.76" y="145" className="stlove40" width="15.06" height="15.06" />
									<circle className="stlove41" cx="326.24" cy="153" r="5.65" />
									<circle className="stlove41" cx="338.24" cy="153" r="5.65" />
									<circle className="stlove41" cx="326.24" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="338.24" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="326.24" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="338.24" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="326.24" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="338.24" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="356.12" cy="153" r="5.65" />
									<circle className="stlove41" cx="368.12" cy="153" r="5.65" />
									<circle className="stlove41" cx="356.12" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="368.12" cy="166.65" r="5.65" />
									<circle className="stlove41" cx="356.12" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="368.12" cy="180.53" r="5.65" />
									<circle className="stlove41" cx="356.12" cy="193.94" r="5.65" />
									<circle className="stlove41" cx="368.12" cy="193.94" r="5.65" />
								</g>
								<circle className="stlove40" cx="326.18" cy="153.12" r="2.76" />
								<circle className="stlove40" cx="338.18" cy="153.12" r="2.76" />
								<circle className="stlove40" cx="326.18" cy="166.41" r="2.76" />
								<circle className="stlove40" cx="338.18" cy="166.41" r="2.76" />
								<circle className="stlove40" cx="326.18" cy="180.65" r="2.76" />
								<circle className="stlove40" cx="338.18" cy="180.65" r="2.76" />
								<g>
									<circle className="stlove40" cx="326.18" cy="193.71" r="2.76" />
									<circle className="stlove40" cx="338.18" cy="193.71" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="356.06" cy="193.71" r="2.76" />
									<circle className="stlove40" cx="368.06" cy="193.71" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="356.06" cy="180.06" r="2.76" />
									<circle className="stlove40" cx="368.06" cy="180.06" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="356.06" cy="166.41" r="2.76" />
									<circle className="stlove40" cx="368.06" cy="166.41" r="2.76" />
								</g>
								<g>
									<circle className="stlove40" cx="356.06" cy="152.88" r="2.76" />
									<circle className="stlove40" cx="368.06" cy="152.88" r="2.76" />
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