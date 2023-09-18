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


						<svg className="p-0 m-0  " width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1080 1080">

							<path className="navas0" d="M574.14,258.23l-486.04,280c-67.85,39.09-67.81,137,0.07,176.04l398.8,229.36l512.13-295.01
	c56.25-32.42,56.19-113.62-0.11-145.96L574.14,258.23z"/>
							<g>
								<g>
									<path className="navas1" d="M890.04,511.78L644.7,370.14c-30.45-17.58-67.96-17.58-98.41,0L162,592.01c-28.79,16.62-28.79,58.18,0,74.8
			l247.28,142.76c30.45,17.58,67.96,17.58,98.41,0l382.35-220.74C919.69,571.71,919.69,528.9,890.04,511.78z M863.97,563.01
			L483.09,782.9c-15.23,8.79-33.99,8.79-49.22,0L190.02,642.11c-9.78-5.65-9.78-19.76,0-25.41l380.87-219.9
			c15.23-8.79,33.99-8.79,49.22,0L863.97,537.6C873.75,543.25,873.75,557.36,863.97,563.01z"/>
									<path className="navas2" d="M458.48,824.45c-17.31,0-34.63-4.46-50.06-13.37L161.13,668.32c-14.06-8.12-22.45-22.66-22.46-38.9
			c0-16.24,8.4-30.78,22.46-38.91l384.3-221.87c30.9-17.83,69.26-17.83,100.14,0L890.9,510.28c14.47,8.36,23.11,23.32,23.11,40.03
			c0,16.71-8.64,31.67-23.11,40.03L508.56,811.07C493.11,819.99,475.79,824.45,458.48,824.45z M595.5,358.73
			c-16.72,0-33.43,4.3-48.34,12.91L162.87,593.51c-12.98,7.49-20.73,20.92-20.73,35.9c0,14.99,7.75,28.41,20.73,35.89l247.28,142.78
			c29.81,17.2,66.85,17.22,96.67-0.02l382.35-220.73c13.38-7.73,21.37-21.57,21.37-37.03c0-15.46-7.98-29.3-21.37-37.03
			L643.84,371.64C628.93,363.03,612.22,358.73,595.5,358.73z M458.48,791.21c-8.81,0-17.62-2.26-25.48-6.8l-243.86-140.8
			c-5.13-2.96-8.2-8.26-8.2-14.19c-0.01-5.93,3.06-11.25,8.2-14.22l380.87-219.9c15.71-9.07,35.24-9.07,50.95,0L864.83,536.1
			c5.14,2.96,8.21,8.27,8.21,14.2c0,5.93-3.06,11.24-8.21,14.2l-380.87,219.9C476.1,788.94,467.3,791.21,458.48,791.21z
			 M595.5,391.97c-8.21,0-16.42,2.12-23.74,6.34l-380.87,219.9c-4.06,2.34-6.47,6.53-6.47,11.2s2.42,8.86,6.46,11.19l243.86,140.8
			c14.65,8.46,32.85,8.45,47.48,0L863.1,561.5c4.05-2.34,6.47-6.53,6.47-11.2c0-4.67-2.42-8.86-6.47-11.2L619.25,398.31
			C611.92,394.09,603.71,391.97,595.5,391.97z"/>
								</g>
								<g>
									<path className="navas3" d="M458.49,816.69c-16.18,0-32.14-4.28-46.17-12.37l-250-145c-14.32-8.84-15.38-22.32-14.4-35.58
			c1.33-17.85,18.34-27.39,28.5-33.08c0.98-0.55,1.9-1.06,2.75-1.56L549.33,375.4c14.02-8.09,29.98-12.38,46.17-12.38
			c16.19,0,32.16,4.28,46.17,12.38l243.14,140.37c18.15,11.53,20.24,25.03,20.24,34.18c0,10.35-1.89,22.32-15.91,32.53
			L504.66,804.32C490.63,812.41,474.66,816.69,458.49,816.69z M595.5,364.76c-15.89,0-31.56,4.2-45.31,12.13L180.03,590.61
			c-0.85,0.49-1.79,1.02-2.77,1.57c-10.5,5.89-26.36,14.78-27.62,31.69c-0.88,11.84-0.62,25.21,13.56,33.97l249.98,144.99
			c13.77,7.94,29.43,12.14,45.3,12.14c15.87,0,31.53-4.2,45.3-12.14L888.2,581.03c13.32-9.71,15.13-21.16,15.13-31.08
			c0-8.75-2.01-21.65-19.42-32.71L640.8,376.89C627.05,368.95,611.39,364.76,595.5,364.76z M458.48,797.29
			c-9.99,0-19.85-2.64-28.5-7.64L186.12,648.86c-7.03-4.05-11.24-11.32-11.24-19.45c0-8.13,4.2-15.4,11.24-19.46l380.88-219.89
			c8.65-5,18.51-7.64,28.51-7.64c10,0,19.86,2.65,28.5,7.64l243.86,140.79c7.04,4.06,11.24,11.33,11.24,19.46
			c0,8.12-4.2,15.4-11.24,19.46L486.99,789.66C478.34,794.66,468.48,797.29,458.48,797.29z"/>
								</g>
								<polygon className="navas4" points="864.74,548.61 459.89,782.35 189.25,626.09 594.09,392.35 	" />
								<polygon className="navas5" points="689.09,484.01 666.73,480.04 658.71,485.02 715.29,518.37 731.01,510 	" />
								<g>
									<polygon className="navas6" points="301.92,561.04 281.62,572.76 552.26,729.01 572.57,717.29 		" />
									<polygon className="navas6" points="342.26,537.75 321.96,549.47 592.6,705.73 612.9,694.01 		" />
									<polygon className="navas6" points="261.59,584.32 241.29,596.04 511.93,752.3 532.23,740.58 		" />
									<polygon className="navas6" points="471.6,775.59 491.9,763.87 221.26,607.61 200.95,619.33 		" />
									<polygon className="navas6" points="382.59,514.47 362.29,526.19 632.93,682.44 653.23,670.72 		" />
									<polygon className="navas6" points="543.92,421.32 523.62,433.04 794.26,589.3 814.57,577.58 		" />
									<polygon className="navas6" points="422.92,491.18 402.62,502.9 673.26,659.16 693.57,647.43 		" />
									<polygon className="navas6" points="584.26,398.03 563.95,409.76 834.6,566.01 854.9,554.29 		" />
									<polygon className="navas6" points="503.59,444.61 483.29,456.33 753.93,612.58 774.23,600.86 		" />
									<polygon className="navas6" points="463.26,467.89 442.96,479.61 713.6,635.87 733.9,624.15 		" />
								</g>
								<g>
									<path className="navas7" d="M459.89,780.44L220.41,642.17l1.89-1.1l371.79-214.64l0.63,0.36l238.86,137.9L459.89,780.44z M225.46,642.17
			l234.43,135.35l368.63-212.83L594.09,429.35L225.46,642.17z"/>
								</g>
								<g>

									<rect x="536.68" y="460.31" transform="matrix(0.5 -0.866 0.866 0.5 -248.1465 764.4227)" className="navas7" width="2.53" height="273.61" />
								</g>
								<g>
									<polygon className="navas7" points="719.42,560.12 718.79,559.76 599.77,491.1 652.56,460.61 653.83,462.81 604.82,491.1 719.42,557.21 
			769.39,528.45 770.66,530.64 		"/>
								</g>
								<g>
									<polygon className="navas7" points="399.54,744.82 398.29,742.63 446.99,714.59 332.68,648.23 282.42,677.25 281.15,675.06 
			332.68,645.31 333.32,645.68 452.04,714.61 		"/>
								</g>
								<g>
									<path className="navas7" d="M661.76,544.51c-17.89,0-32.45-8.47-32.45-18.88c0-5.41,3.93-10.55,10.78-14.1l1.16,2.25
			c-5.98,3.1-9.41,7.42-9.41,11.85c0,9.01,13.42,16.35,29.92,16.35c8,0,15.54-1.73,21.22-4.88l1.23,2.21
			C678.15,542.66,670.18,544.51,661.76,544.51z"/>
								</g>
								<g>
									<path className="navas7" d="M538.55,640.37c-41.7,0-75.62-19.41-75.62-43.26c0-23.85,33.93-43.26,75.62-43.26s75.62,19.41,75.62,43.26
			C614.16,620.97,580.24,640.37,538.55,640.37z M538.55,556.39c-40.31,0-73.09,18.27-73.09,40.73c0,22.46,32.78,40.73,73.09,40.73
			c40.3,0,73.09-18.27,73.09-40.73C611.63,574.66,578.85,556.39,538.55,556.39z"/>
								</g>
								<g>
									<path className="navas7" d="M408.89,691.2l-1.2-2.23c5.72-3.08,9-7.31,9-11.63c0-9.02-13.42-16.35-29.92-16.35
			c-7.98,0-15.5,1.72-21.17,4.85l-1.22-2.21c6.03-3.33,13.99-5.17,22.39-5.17c17.89,0,32.45,8.47,32.45,18.88
			C419.21,682.69,415.55,687.61,408.89,691.2z"/>
								</g>
							</g>
							<polygon className="navas5" points="586.85,384.26 179.43,619.39 189.25,626.09 591.84,390.98 " />
							<g>
								<polygon className="navas8" points="864.74,539.01 594.09,382.75 594.09,392.35 864.74,548.61 	" />
								<polygon className="navas5" points="848.7,539.01 446.44,771.16 453.99,776.49 864.74,539.01 	" />
								<polygon className="navas9" points="864.74,539.01 459.89,772.75 459.89,782.35 864.74,548.61 	" />
								<polygon className="navas9" points="594.09,382.75 189.25,616.49 189.25,626.09 594.09,392.35 	" />
								<polygon className="navas8" points="459.89,772.75 189.25,616.49 189.25,626.09 459.89,782.35 	" />
							</g>
							<g>
								<polygon className="navas5" points="470.01,480.34 451.93,490.88 459.85,495.44 478.04,484.83 	" />
							</g>
							<g>
								<polygon className="navas5" points="333.86,560.38 315.77,570.92 323.69,575.47 341.88,564.86 	" />
							</g>
							<g>
								<g>
									<g>
										<g>
											<g>
												<g>
													<polygon className="navas10" points="389.22,425.82 33.91,630.74 32.76,644.34 389.22,438.75 						" />
													<polygon className="navas11" points="389.22,425.82 32.14,631.76 32.14,623.18 381.78,421.52 						" />
												</g>
												<g>
													<polygon className="navas10" points="381.78,408.6 31.61,610.55 32.14,623.18 381.78,421.53 						" />
													<polygon className="navas11" points="381.78,408.59 29.73,611.64 29.68,603.08 374.33,404.29 						" />
												</g>
												<g>
													<polygon className="navas10" points="374.33,391.37 24.7,593.02 26.64,604.83 374.33,404.3 						" />
													<polygon className="navas12" points="366.89,387.07 359.44,382.77 25.77,575.23 24.7,588.05 26.14,592.19 374.33,391.36 						" />
												</g>
											</g>
										</g>
										<g>
											<g>
												<g>
													<polygon className="navas10" points="359.45,369.84 25.77,562.3 25.77,575.23 359.45,382.77 						" />
													<polygon className="navas11" points="359.44,369.84 25.77,562.3 28.42,552.19 352,365.54 						" />
												</g>
												<g>
													<polygon className="navas10" points="352,352.61 24.7,541.22 28.42,552.19 352,365.54 						" />
													<polygon className="navas11" points="352,352.61 24.7,541.22 24.7,532.81 344.55,348.31 						" />
												</g>
												<g>
													<polygon className="navas10" points="344.56,335.38 24.24,520.16 24.7,532.81 344.56,348.32 						" />
													<polygon className="navas13" points="344.55,335.38 28.42,517.75 20.98,513.45 337.11,331.08 						" />
												</g>
											</g>
										</g>
									</g>
									<polygon className="navas13" points="20.98,584.94 28.42,584.94 28.42,516.15 20.98,513.45 		" />
									<rect x="28.42" y="530.68" className="navas14" width="7.45" height="58.6" />
									<rect x="35.87" y="547.95" className="navas14" width="7.45" height="58.6" />
									<rect x="58.2" y="586.35" className="navas14" width="7.45" height="26.79" />
									<rect x="43.31" y="564.54" className="navas12" width="14.89" height="50.64" />
									<g>
										<g>
											<g>
												<polygon className="navas11" points="65.65,636.74 326.85,786.6 334.3,782.31 73.09,632.45 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas11" points="58.2,628.11 319.41,777.97 326.85,773.67 65.65,623.81 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas11" points="50.76,619.48 311.96,769.34 319.41,765.04 58.2,615.18 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas11" points="43.31,610.84 304.52,760.7 311.96,756.4 50.76,606.54 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas15" points="28.42,593.58 289.63,743.43 289.63,756.36 28.42,606.51 					" />
												<polygon className="navas11" points="28.42,593.57 289.63,743.43 297.07,739.13 35.87,589.27 					" />
											</g>
										</g>
										<polygon className="navas13" points="20.98,584.94 282.18,734.8 289.63,730.5 28.42,580.64 			" />
										<polygon className="navas16" points="297.07,752.07 297.07,765 304.52,760.7 			" />
										<polygon className="navas10" points="282.18,734.8 282.18,825.31 334.3,795.24 334.3,782.31 326.85,786.6 326.85,773.67 319.41,777.97 
				319.41,765.04 311.96,769.34 311.96,756.4 297.07,765 297.07,739.13 289.63,743.43 289.63,730.5 			"/>
										<polygon className="navas17" points="282.18,736.96 282.18,734.8 20.98,584.94 20.98,597.87 20.98,597.87 20.98,675.45 282.18,825.31 
				282.18,736.96 			"/>
									</g>
								</g>
							</g>
							<g>
								<polygon className="navas18" points="728.71,397.67 687.47,373.47 732.89,347.24 774.89,371.01 	" />
								<g>
									<polygon className="navas19" points="978.08,393.03 981.72,391.03 981.72,357.91 923.25,324.22 919.61,326.22 		" />
									<rect x="932.09" y="359.79" className="navas20" width="6.89" height="25.78" />
									<rect x="938.98" y="362.25" className="navas21" width="3.45" height="25.78" />
									<rect x="956.9" y="375.14" className="navas20" width="6.89" height="25.78" />
									<rect x="963.8" y="377.6" className="navas21" width="3.45" height="25.78" />
									<polygon className="navas22" points="919.61,359.34 978.08,393.03 978.08,359.91 919.61,326.22 		" />
									<polygon className="navas23" points="922.27,355.7 922.27,332.93 975.42,363.55 975.42,386.31 		" />
								</g>
								<g>
									<g>
										<polygon className="navas24" points="747.33,379.87 726.53,367.66 726.53,362.04 770.62,360.81 770.62,366.42 			" />
										<polygon className="navas25" points="747.33,374.25 726.53,362.04 749.44,348.82 770.62,360.81 			" />
									</g>
									<g>
										<g>
											<g>
												<g>
													<polygon className="navas26" points="747.86,360.31 745.91,359.19 745.91,163.26 747.88,164.37 749.81,359.19 						" />
													<polygon className="navas27" points="747.86,360.31 749.81,359.19 749.8,163.26 747.88,164.37 						" />
													<polygon className="navas28" points="745.91,163.26 747.86,162.13 749.8,163.26 747.88,164.37 						" />
													<polygon className="navas28" points="736.5,168.65 738.45,167.53 739.17,167.98 737.25,169.09 						" />
												</g>
												<polygon className="navas29" points="747.64,272.08 746.63,271.5 737.47,276.79 738.47,278.53 747.64,273.24 					" />
												<polygon className="navas27" points="747.64,272.08 747.64,273.24 738.47,278.53 737.97,277.66 					" />
												<polygon className="navas29" points="747.64,290.04 746.63,289.46 737.47,294.75 738.47,296.49 747.64,291.2 					" />
												<polygon className="navas30" points="739.34,277.62 738.76,277.4 745.9,289.83 746.77,290.54 740.5,277.62 					" />
												<polygon className="navas27" points="739.34,277.62 739.97,276.75 747.64,290.04 746.77,290.54 					" />
												<path className="navas30" d="M738.4,313.25l-0.87-0.5l4.41-11.37l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L738.4,313.25z"/>
												<polygon className="navas29" points="747.64,308 746.63,307.42 737.47,312.71 738.47,314.45 747.64,309.16 					" />
												<polygon className="navas27" points="747.64,291.2 746.39,291.93 738.29,312.51 739.16,313.01 					" />
												<polygon className="navas27" points="747.64,290.04 747.64,291.2 738.47,296.49 737.97,295.62 					" />
												<polygon className="navas29" points="747.64,325.96 746.63,325.38 737.47,330.67 738.47,332.41 747.64,327.13 					" />
												<path className="navas30" d="M738.4,349.17l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L738.4,349.17z"/>
												<polygon className="navas29" points="747.64,343.92 746.63,343.34 737.47,348.63 738.47,350.38 747.64,345.09 					" />
												<polygon className="navas29" points="746.99,358.06 745.99,357.48 736.7,362.83 738.35,364.2 746.99,359.23 					" />
												<polygon className="navas27" points="747.64,357.69 747.64,358.85 738.35,364.2 737.85,363.33 					" />
												<polygon className="navas30" points="739.34,349.46 738.76,349.24 745.9,357.47 746.77,358.19 740.36,349.46 					" />
												<polygon className="navas27" points="739.34,349.46 739.97,348.6 747.64,357.69 746.77,358.19 					" />
												<polygon className="navas27" points="747.64,343.92 747.64,345.09 738.47,350.38 737.97,349.5 					" />
												<polygon className="navas27" points="747.64,327.13 746.39,327.85 738.29,348.43 739.16,348.93 					" />
												<polygon className="navas27" points="747.64,325.96 747.64,327.13 738.47,332.41 737.97,331.54 					" />
												<polygon className="navas30" points="739.34,313.54 738.76,313.32 745.9,325.75 746.77,326.47 740.36,313.54 					" />
												<polygon className="navas27" points="747.64,308 747.64,309.16 738.47,314.45 737.97,313.58 					" />
												<polygon className="navas27" points="739.34,313.54 739.97,312.67 747.64,325.96 746.77,326.47 					" />
												<polygon className="navas29" points="747.64,218.25 746.63,217.67 737.47,222.96 738.47,224.7 747.64,219.41 					" />
												<polygon className="navas27" points="747.64,218.25 747.64,219.41 738.47,224.7 737.97,223.83 					" />
												<polygon className="navas29" points="747.64,236.21 746.63,235.63 737.47,240.92 738.47,242.66 747.64,237.37 					" />
												<polygon className="navas30" points="739.34,223.79 738.76,223.57 745.9,235.99 746.77,236.71 740.5,223.79 					" />
												<polygon className="navas27" points="739.34,223.79 739.97,222.92 747.64,236.21 746.77,236.71 					" />
												<path className="navas30" d="M738.4,259.42l-0.87-0.5l4.41-11.37l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L738.4,259.42z"/>
												<polygon className="navas29" points="747.64,254.17 746.63,253.59 737.47,258.88 738.47,260.62 747.64,255.33 					" />
												<polygon className="navas27" points="747.64,237.37 746.39,238.1 738.29,258.68 739.16,259.18 					" />
												<polygon className="navas27" points="747.64,236.21 747.64,237.37 738.47,242.66 737.97,241.79 					" />
												<polygon className="navas30" points="739.34,259.71 738.76,259.49 745.9,271.92 746.77,272.64 740.36,259.71 					" />
												<polygon className="navas27" points="747.64,254.17 747.64,255.33 738.47,260.62 737.97,259.75 					" />
												<polygon className="navas27" points="739.34,259.71 739.97,258.84 747.64,272.13 746.77,272.64 					" />
												<polygon className="navas29" points="747.64,164.42 746.63,163.84 737.47,169.13 738.47,170.87 747.64,165.58 					" />
												<polygon className="navas27" points="747.64,164.42 747.64,165.58 738.47,170.87 737.97,170 					" />
												<polygon className="navas29" points="747.64,182.38 746.63,181.8 737.47,187.09 738.47,188.83 747.64,183.54 					" />
												<polygon className="navas30" points="739.34,169.95 738.76,169.74 745.9,182.16 746.77,182.88 740.5,169.95 					" />
												<polygon className="navas27" points="739.34,169.95 739.97,169.09 747.64,182.38 746.77,182.88 					" />
												<path className="navas30" d="M738.4,205.58l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L738.4,205.58z"/>
												<polygon className="navas29" points="747.64,200.34 746.63,199.76 737.47,205.05 738.47,206.79 747.64,201.5 					" />
												<polygon className="navas27" points="747.64,183.54 746.39,184.27 738.29,204.85 739.16,205.35 					" />
												<polygon className="navas27" points="747.64,182.38 747.64,183.54 738.47,188.83 737.97,187.96 					" />
												<polygon className="navas30" points="739.34,205.88 738.76,205.66 745.9,218.08 746.77,218.8 740.36,205.88 					" />
												<polygon className="navas27" points="747.64,200.34 747.64,201.5 738.47,206.79 737.97,205.92 					" />
												<polygon className="navas27" points="739.34,205.88 739.97,205.01 747.64,218.3 746.77,218.8 					" />
												<polygon className="navas31" points="737.19,365.6 736.44,365.18 736.5,168.65 737.25,169.09 739.13,364.48 					" />
												<polygon className="navas27" points="737.19,365.6 739.13,364.48 739.2,167.95 737.25,169.09 					" />
											</g>
											<g>
												<g>
													<polygon className="navas32" points="749.12,360.81 751.06,359.69 751.07,163.76 749.1,164.87 747.17,359.69 						" />
													<polygon className="navas33" points="749.12,360.81 747.17,359.69 747.17,163.76 749.1,164.87 						" />
													<polygon className="navas34" points="751.07,163.76 749.12,162.63 747.17,163.76 749.1,164.87 						" />
													<polygon className="navas34" points="760.47,169.15 758.53,168.02 757.8,168.48 759.73,169.59 						" />
												</g>
												<polygon className="navas35" points="749.33,272.58 750.34,272 759.51,277.29 758.5,279.03 749.33,273.74 					" />
												<polygon className="navas33" points="749.33,272.58 749.33,273.74 758.5,279.03 759.01,278.16 					" />
												<polygon className="navas35" points="749.33,290.54 750.34,289.96 759.51,295.25 758.5,296.99 749.33,291.7 					" />
												<polygon className="navas36" points="757.63,278.12 758.21,277.9 751.08,290.32 750.21,291.04 756.47,278.12 					" />
												<polygon className="navas33" points="757.63,278.12 757.01,277.25 749.33,290.54 750.21,291.04 					" />
												<path className="navas36" d="M758.58,313.75l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L758.58,313.75z"/>
												<polygon className="navas35" points="749.33,308.5 750.34,307.92 759.51,313.21 758.5,314.95 749.33,309.66 					" />
												<polygon className="navas33" points="749.33,291.7 750.59,292.43 758.68,313.01 757.81,313.51 					" />
												<polygon className="navas33" points="749.33,290.54 749.33,291.7 758.5,296.99 759.01,296.12 					" />
												<polygon className="navas35" points="749.33,326.46 750.34,325.88 759.51,331.17 758.5,332.91 749.33,327.62 					" />
												<path className="navas36" d="M758.58,349.67l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L758.58,349.67z"/>
												<polygon className="navas35" points="749.33,344.42 750.34,343.84 759.51,349.13 758.5,350.87 749.33,345.58 					" />
												<polygon className="navas35" points="749.98,358.56 750.99,357.98 759.01,362.6 758.62,364.7 749.98,359.72 					" />
												<polygon className="navas33" points="749.33,358.19 749.33,359.35 758.62,364.7 759.13,363.83 					" />
												<polygon className="navas36" points="757.63,349.96 758.21,349.74 751.08,357.97 750.21,358.69 756.61,349.96 					" />
												<polygon className="navas33" points="757.63,349.96 757.01,349.09 749.33,358.19 750.21,358.69 					" />
												<polygon className="navas33" points="749.33,344.42 749.33,345.58 758.5,350.87 759.01,350 					" />
												<polygon className="navas33" points="749.33,327.62 750.59,328.35 758.68,348.93 757.81,349.43 					" />
												<polygon className="navas33" points="749.33,326.46 749.33,327.62 758.5,332.91 759.01,332.04 					" />
												<polygon className="navas36" points="757.63,314.04 758.21,313.82 751.08,326.24 750.21,326.96 756.61,314.04 					" />
												<polygon className="navas33" points="749.33,308.5 749.33,309.66 758.5,314.95 759.01,314.08 					" />
												<polygon className="navas33" points="757.63,314.04 757.01,313.17 749.33,326.46 750.21,326.96 					" />
												<polygon className="navas35" points="749.33,218.75 750.34,218.17 759.51,223.46 758.5,225.2 749.33,219.91 					" />
												<polygon className="navas33" points="749.33,218.75 749.33,219.91 758.5,225.2 759.01,224.33 					" />
												<polygon className="navas35" points="749.33,236.71 750.34,236.13 759.51,241.42 758.5,243.16 749.33,237.87 					" />
												<polygon className="navas36" points="757.63,224.28 758.21,224.07 751.08,236.49 750.21,237.21 756.47,224.28 					" />
												<polygon className="navas33" points="757.63,224.28 757.01,223.42 749.33,236.71 750.21,237.21 					" />
												<path className="navas36" d="M758.58,259.91l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L758.58,259.91z"/>
												<polygon className="navas35" points="749.33,254.67 750.34,254.09 759.51,259.38 758.5,261.12 749.33,255.83 					" />
												<polygon className="navas33" points="749.33,237.87 750.59,238.59 758.68,259.18 757.81,259.68 					" />
												<polygon className="navas33" points="749.33,236.71 749.33,237.87 758.5,243.16 759.01,242.29 					" />
												<polygon className="navas36" points="757.63,260.21 758.21,259.99 751.08,272.41 750.21,273.13 756.61,260.21 					" />
												<polygon className="navas33" points="749.33,254.67 749.33,255.83 758.5,261.12 759.01,260.25 					" />
												<polygon className="navas33" points="757.63,260.21 757.01,259.34 749.33,272.63 750.21,273.13 					" />
												<polygon className="navas35" points="749.33,164.92 750.34,164.34 759.51,169.63 758.5,171.37 749.33,166.08 					" />
												<polygon className="navas33" points="749.33,164.92 749.33,166.08 758.5,171.37 759.01,170.5 					" />
												<polygon className="navas35" points="749.33,182.88 750.34,182.3 759.51,187.59 758.5,189.33 749.33,184.04 					" />
												<polygon className="navas36" points="757.63,170.45 758.21,170.24 751.08,182.66 750.21,183.38 756.47,170.45 					" />
												<polygon className="navas33" points="757.63,170.45 757.01,169.59 749.33,182.88 750.21,183.38 					" />
												<path className="navas36" d="M758.58,206.08l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L758.58,206.08z"/>
												<polygon className="navas35" points="749.33,200.84 750.34,200.26 759.51,205.55 758.5,207.29 749.33,202 					" />
												<polygon className="navas33" points="749.33,184.04 750.59,184.76 758.68,205.34 757.81,205.85 					" />
												<polygon className="navas33" points="749.33,182.88 749.33,184.04 758.5,189.33 759.01,188.46 					" />
												<polygon className="navas36" points="757.63,206.37 758.21,206.16 751.08,218.58 750.21,219.3 756.61,206.37 					" />
												<polygon className="navas33" points="749.33,200.84 749.33,202 758.5,207.29 759.01,206.42 					" />
												<polygon className="navas33" points="757.63,206.37 757.01,205.51 749.33,218.8 750.21,219.3 					" />
												<polygon className="navas33" points="759.66,366.1 757.84,364.97 757.78,168.45 759.73,169.59 					" />
											</g>
											<g>
												<g>
													<polygon className="navas37" points="758.71,366.8 756.77,365.68 756.76,169.75 758.74,170.86 760.66,365.68 						" />
													<polygon className="navas38" points="758.71,366.8 760.66,365.68 760.66,169.75 758.74,170.86 						" />
													<polygon className="navas39" points="756.76,169.75 758.71,168.62 760.66,169.75 758.74,170.86 						" />
													<polygon className="navas39" points="747.36,175.14 749.3,174.02 750.03,174.47 748.1,175.58 						" />
												</g>
												<polygon className="navas19" points="758.49,278.57 757.49,277.99 748.32,283.28 749.33,285.02 758.49,279.73 					" />
												<polygon className="navas38" points="758.49,278.57 758.49,279.73 749.33,285.02 748.82,284.15 					" />
												<polygon className="navas19" points="758.49,296.53 757.49,295.95 748.32,301.24 749.33,302.98 758.49,297.69 					" />
												<polygon className="navas40" points="750.2,284.11 749.62,283.89 756.75,296.32 757.62,297.04 751.36,284.11 					" />
												<polygon className="navas38" points="750.2,284.11 750.82,283.24 758.49,296.53 757.62,297.04 					" />
												<path className="navas40" d="M749.25,319.74l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L749.25,319.74z"/>
												<polygon className="navas19" points="758.49,314.49 757.49,313.91 748.32,319.2 749.33,320.94 758.49,315.65 					" />
												<polygon className="navas38" points="758.49,297.69 757.24,298.42 749.15,319 750.02,319.5 					" />
												<polygon className="navas38" points="758.49,296.53 758.49,297.69 749.33,302.98 748.82,302.11 					" />
												<polygon className="navas19" points="758.49,332.45 757.49,331.87 748.32,337.16 749.33,338.9 758.49,333.62 					" />
												<path className="navas40" d="M749.25,355.66l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L749.25,355.66z"/>
												<polygon className="navas19" points="758.49,350.41 757.49,349.83 748.32,355.12 749.33,356.87 758.49,351.58 					" />
												<polygon className="navas19" points="757.85,364.55 756.84,363.97 747.55,369.32 749.21,370.69 757.85,365.72 					" />
												<polygon className="navas38" points="758.49,364.18 758.49,365.34 749.21,370.69 748.7,369.82 					" />
												<polygon className="navas40" points="750.2,355.95 749.62,355.73 756.75,363.96 757.62,364.68 751.22,355.95 					" />
												<polygon className="navas38" points="750.2,355.95 750.82,355.09 758.49,364.18 757.62,364.68 					" />
												<polygon className="navas38" points="758.49,350.41 758.49,351.58 749.33,356.87 748.82,355.99 					" />
												<polygon className="navas38" points="758.49,333.62 757.24,334.34 749.15,354.92 750.02,355.42 					" />
												<polygon className="navas38" points="758.49,332.45 758.49,333.62 749.33,338.9 748.82,338.03 					" />
												<polygon className="navas40" points="750.2,320.03 749.62,319.81 756.75,332.24 757.62,332.96 751.22,320.03 					" />
												<polygon className="navas38" points="758.49,314.49 758.49,315.65 749.33,320.94 748.82,320.07 					" />
												<polygon className="navas38" points="750.2,320.03 750.82,319.16 758.49,332.45 757.62,332.96 					" />
												<polygon className="navas19" points="758.49,224.74 757.49,224.16 748.32,229.45 749.33,231.19 758.49,225.9 					" />
												<polygon className="navas38" points="758.49,224.74 758.49,225.9 749.33,231.19 748.82,230.32 					" />
												<polygon className="navas19" points="758.49,242.7 757.49,242.12 748.32,247.41 749.33,249.15 758.49,243.86 					" />
												<polygon className="navas40" points="750.2,230.28 749.62,230.06 756.75,242.49 757.62,243.2 751.36,230.28 					" />
												<polygon className="navas38" points="750.2,230.28 750.82,229.41 758.49,242.7 757.62,243.2 					" />
												<path className="navas40" d="M749.25,265.91l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L749.25,265.91z"/>
												<polygon className="navas19" points="758.49,260.66 757.49,260.08 748.32,265.37 749.33,267.11 758.49,261.82 					" />
												<polygon className="navas38" points="758.49,243.86 757.24,244.59 749.15,265.17 750.02,265.67 					" />
												<polygon className="navas38" points="758.49,242.7 758.49,243.86 749.33,249.15 748.82,248.28 					" />
												<polygon className="navas40" points="750.2,266.2 749.62,265.98 756.75,278.41 757.62,279.13 751.22,266.2 					" />
												<polygon className="navas38" points="758.49,260.66 758.49,261.82 749.33,267.11 748.82,266.24 					" />
												<polygon className="navas38" points="750.2,266.2 750.82,265.33 758.49,278.62 757.62,279.13 					" />
												<polygon className="navas19" points="758.49,170.91 757.49,170.33 748.32,175.62 749.33,177.36 758.49,172.07 					" />
												<polygon className="navas38" points="758.49,170.91 758.49,172.07 749.33,177.36 748.82,176.49 					" />
												<polygon className="navas19" points="758.49,188.87 757.49,188.29 748.32,193.58 749.33,195.32 758.49,190.03 					" />
												<polygon className="navas40" points="750.2,176.44 749.62,176.23 756.75,188.65 757.62,189.37 751.36,176.44 					" />
												<polygon className="navas38" points="750.2,176.44 750.82,175.58 758.49,188.87 757.62,189.37 					" />
												<path className="navas40" d="M749.25,212.07l-0.87-0.5l4.41-11.36l0,0l4.2-10.52l0.8,0.41l-4.59,12.06c-0.02-0.03-0.04-0.07-0.05-0.11
						L749.25,212.07z"/>
												<polygon className="navas19" points="758.49,206.83 757.49,206.25 748.32,211.54 749.33,213.28 758.49,207.99 					" />
												<polygon className="navas38" points="758.49,190.03 757.24,190.76 749.15,211.34 750.02,211.84 					" />
												<polygon className="navas38" points="758.49,188.87 758.49,190.03 749.33,195.32 748.82,194.45 					" />
												<polygon className="navas40" points="750.2,212.37 749.62,212.15 756.75,224.58 757.62,225.3 751.22,212.37 					" />
												<polygon className="navas38" points="758.49,206.83 758.49,207.99 749.33,213.28 748.82,212.41 					" />
												<polygon className="navas38" points="750.2,212.37 750.82,211.5 758.49,224.79 757.62,225.3 					" />
												<polygon className="navas41" points="748.04,372.09 747.29,371.67 747.36,175.14 748.1,175.58 749.99,370.97 					" />
												<polygon className="navas38" points="748.04,372.09 749.99,370.97 750.05,174.44 748.1,175.58 					" />
											</g>
											<g>
												<g>
													<polygon className="navas42" points="737.49,366.8 739.44,365.68 739.44,169.75 737.47,170.86 735.55,365.68 						" />
													<polygon className="navas22" points="737.49,366.8 735.55,365.68 735.55,169.75 737.47,170.86 						" />
													<polygon className="navas43" points="739.44,169.75 737.5,168.62 735.55,169.75 737.47,170.86 						" />
													<polygon className="navas43" points="748.85,175.14 746.9,174.02 746.18,174.47 748.1,175.58 						" />
												</g>
												<polygon className="navas44" points="737.71,278.57 738.72,277.99 747.89,283.28 746.88,285.02 737.71,279.73 					" />
												<polygon className="navas22" points="737.71,278.57 737.71,279.73 746.88,285.02 747.38,284.15 					" />
												<polygon className="navas44" points="737.71,296.53 738.72,295.95 747.89,301.24 746.88,302.98 737.71,297.69 					" />
												<polygon className="navas45" points="746.01,284.11 746.59,283.89 739.46,296.32 738.58,297.04 744.85,284.11 					" />
												<polygon className="navas22" points="746.01,284.11 745.39,283.24 737.71,296.53 738.58,297.04 					" />
												<path className="navas45" d="M746.96,319.74l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L746.96,319.74z"/>
												<polygon className="navas44" points="737.71,314.49 738.72,313.91 747.89,319.2 746.88,320.94 737.71,315.65 					" />
												<polygon className="navas22" points="737.71,297.69 738.96,298.42 747.06,319 746.19,319.5 					" />
												<polygon className="navas22" points="737.71,296.53 737.71,297.69 746.88,302.98 747.38,302.11 					" />
												<polygon className="navas44" points="737.71,332.45 738.72,331.87 747.89,337.16 746.88,338.9 737.71,333.62 					" />
												<path className="navas45" d="M746.96,355.66l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L746.96,355.66z"/>
												<polygon className="navas44" points="737.71,350.41 738.72,349.83 747.89,355.12 746.88,356.87 737.71,351.58 					" />
												<polygon className="navas44" points="738.36,364.55 739.37,363.97 747.39,368.59 747,370.69 738.36,365.72 					" />
												<polygon className="navas22" points="737.71,364.18 737.71,365.34 747,370.69 747.5,369.82 					" />
												<polygon className="navas45" points="746.01,355.95 746.59,355.73 739.46,363.96 738.58,364.68 744.99,355.95 					" />
												<polygon className="navas22" points="746.01,355.95 745.39,355.09 737.71,364.18 738.58,364.68 					" />
												<polygon className="navas22" points="737.71,350.41 737.71,351.58 746.88,356.87 747.38,355.99 					" />
												<polygon className="navas22" points="737.71,333.62 738.96,334.34 747.06,354.92 746.19,355.42 					" />
												<polygon className="navas22" points="737.71,332.45 737.71,333.62 746.88,338.9 747.38,338.03 					" />
												<polygon className="navas45" points="746.01,320.03 746.59,319.81 739.46,332.24 738.58,332.96 744.99,320.03 					" />
												<polygon className="navas22" points="737.71,314.49 737.71,315.65 746.88,320.94 747.38,320.07 					" />
												<polygon className="navas22" points="746.01,320.03 745.39,319.16 737.71,332.45 738.58,332.96 					" />
												<polygon className="navas44" points="737.71,224.74 738.72,224.16 747.89,229.45 746.88,231.19 737.71,225.9 					" />
												<polygon className="navas22" points="737.71,224.74 737.71,225.9 746.88,231.19 747.38,230.32 					" />
												<polygon className="navas44" points="737.71,242.7 738.72,242.12 747.89,247.41 746.88,249.15 737.71,243.86 					" />
												<polygon className="navas45" points="746.01,230.28 746.59,230.06 739.46,242.49 738.58,243.2 744.85,230.28 					" />
												<polygon className="navas22" points="746.01,230.28 745.39,229.41 737.71,242.7 738.58,243.2 					" />
												<path className="navas45" d="M746.96,265.91l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L746.96,265.91z"/>
												<polygon className="navas44" points="737.71,260.66 738.72,260.08 747.89,265.37 746.88,267.11 737.71,261.82 					" />
												<polygon className="navas22" points="737.71,243.86 738.96,244.59 747.06,265.17 746.19,265.67 					" />
												<polygon className="navas22" points="737.71,242.7 737.71,243.86 746.88,249.15 747.38,248.28 					" />
												<polygon className="navas45" points="746.01,266.2 746.59,265.98 739.46,278.41 738.58,279.13 744.99,266.2 					" />
												<polygon className="navas22" points="737.71,260.66 737.71,261.82 746.88,267.11 747.38,266.24 					" />
												<polygon className="navas22" points="746.01,266.2 745.39,265.33 737.71,278.62 738.58,279.13 					" />
												<polygon className="navas44" points="737.71,170.91 738.72,170.33 747.89,175.62 746.88,177.36 737.71,172.07 					" />
												<polygon className="navas22" points="737.71,170.91 737.71,172.07 746.88,177.36 747.38,176.49 					" />
												<polygon className="navas44" points="737.71,188.87 738.72,188.29 747.89,193.58 746.88,195.32 737.71,190.03 					" />
												<polygon className="navas45" points="746.01,176.44 746.59,176.23 739.46,188.65 738.58,189.37 744.85,176.44 					" />
												<polygon className="navas22" points="746.01,176.44 745.39,175.58 737.71,188.87 738.58,189.37 					" />
												<path className="navas45" d="M746.96,212.07l0.87-0.5l-4.41-11.36l0,0l-4.2-10.52l-0.8,0.41l4.59,12.06c0.02-0.03,0.04-0.07,0.05-0.11
						L746.96,212.07z"/>
												<polygon className="navas44" points="737.71,206.83 738.72,206.25 747.89,211.54 746.88,213.28 737.71,207.99 					" />
												<polygon className="navas22" points="737.71,190.03 738.96,190.76 747.06,211.34 746.19,211.84 					" />
												<polygon className="navas22" points="737.71,188.87 737.71,190.03 746.88,195.32 747.38,194.45 					" />
												<polygon className="navas45" points="746.01,212.37 746.59,212.15 739.46,224.58 738.58,225.3 744.99,212.37 					" />
												<polygon className="navas22" points="737.71,206.83 737.71,207.99 746.88,213.28 747.38,212.41 					" />
												<polygon className="navas22" points="746.01,212.37 745.39,211.5 737.71,224.79 738.58,225.3 					" />
												<polygon className="navas22" points="748.04,372.09 746.22,370.97 746.16,174.44 748.1,175.58 					" />
											</g>
										</g>
										<g>
											<g>
												<rect x="732.05" y="172.4" className="navas46" width="15.37" height="9.48" />
												<rect x="732.53" y="172.87" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="743.57,167.85 735.9,167.85 732.05,172.4 747.42,172.4 					" />
												<polygon className="navas49" points="743.34,176.86 736.14,176.86 732.53,181.41 746.95,181.41 					" />
												<polygon className="navas50" points="746.95,172.87 732.53,172.87 736.14,176.86 743.34,176.86 					" />
												<path className="navas51" d="M737.74,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C737.09,177.3,737.82,178.04,737.74,178.91z"/>
												<path className="navas51" d="M741.55,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C740.9,177.3,741.63,178.04,741.55,178.91z"/>
												<path className="navas51" d="M745.36,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C744.71,177.3,745.44,178.04,745.36,178.91z"/>
												<path className="navas51" d="M737.74,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C737.09,173.71,737.82,174.45,737.74,175.32z"/>
												<path className="navas51" d="M741.55,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C740.9,173.71,741.63,174.45,741.55,175.32z"/>
												<path className="navas51" d="M745.36,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C744.71,173.71,745.44,174.45,745.36,175.32z"/>
											</g>
											<g>
												<rect x="748.31" y="172.4" className="navas46" width="15.37" height="9.48" />
												<rect x="748.79" y="172.87" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="759.83,167.85 752.16,167.85 748.31,172.4 763.68,172.4 					" />
												<polygon className="navas49" points="759.59,176.86 752.4,176.86 748.78,181.41 763.2,181.41 					" />
												<polygon className="navas50" points="763.2,172.87 748.79,172.87 752.4,176.86 759.59,176.86 					" />
												<path className="navas51" d="M754,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C753.34,177.3,754.08,178.04,754,178.91z"/>
												<path className="navas51" d="M757.81,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C757.15,177.3,757.89,178.04,757.81,178.91z"/>
												<path className="navas51" d="M761.62,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C760.96,177.3,761.69,178.04,761.62,178.91z"/>
												<path className="navas51" d="M754,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C753.34,173.71,754.08,174.45,754,175.32z"/>
												<path className="navas51" d="M757.81,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C757.15,173.71,757.89,174.45,757.81,175.32z"/>
												<path className="navas51" d="M761.62,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C760.96,173.71,761.69,174.45,761.62,175.32z"/>
											</g>
											<g>
												<rect x="732.05" y="161.65" className="navas46" width="15.37" height="9.48" />
												<rect x="732.53" y="162.13" className="navas47" width="14.41" height="8.53" />
												<polygon className="navas48" points="743.57,157.11 735.9,157.11 732.05,161.65 747.42,161.65 					" />
												<polygon className="navas49" points="743.34,166.11 736.14,166.11 732.53,170.66 746.95,170.66 					" />
												<polygon className="navas50" points="746.95,162.13 732.53,162.13 736.14,166.11 743.34,166.11 					" />
												<path className="navas51" d="M737.74,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C737.09,166.55,737.82,167.29,737.74,168.17z"/>
												<path className="navas51" d="M741.55,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C740.9,166.55,741.63,167.29,741.55,168.17z"/>
												<path className="navas51" d="M745.36,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C744.71,166.55,745.44,167.29,745.36,168.17z"/>
												<path className="navas51" d="M737.74,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C737.09,162.96,737.82,163.7,737.74,164.58z"/>
												<path className="navas51" d="M741.55,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C740.9,162.96,741.63,163.7,741.55,164.58z"/>
												<path className="navas51" d="M745.36,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C744.71,162.96,745.44,163.7,745.36,164.58z"/>
											</g>
											<g>
												<rect x="716.08" y="172.4" className="navas46" width="15.37" height="9.48" />
												<rect x="716.56" y="172.87" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="727.6,167.85 719.93,167.85 716.08,172.4 731.45,172.4 					" />
												<polygon className="navas49" points="727.36,176.86 720.17,176.86 716.55,181.41 730.97,181.41 					" />
												<polygon className="navas50" points="730.97,172.87 716.56,172.87 720.17,176.86 727.36,176.86 					" />
												<path className="navas51" d="M721.77,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C721.11,177.3,721.85,178.04,721.77,178.91z"/>
												<path className="navas51" d="M725.58,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C724.92,177.3,725.66,178.04,725.58,178.91z"/>
												<path className="navas51" d="M729.39,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C728.73,177.3,729.47,178.04,729.39,178.91z"/>
												<path className="navas51" d="M721.77,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C721.11,173.71,721.85,174.45,721.77,175.32z"/>
												<path className="navas51" d="M725.58,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C724.92,173.71,725.66,174.45,725.58,175.32z"/>
												<path className="navas51" d="M729.39,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C728.73,173.71,729.47,174.45,729.39,175.32z"/>
											</g>
											<g>
												<rect x="716.08" y="161.65" className="navas46" width="15.37" height="9.48" />
												<rect x="716.56" y="162.13" className="navas47" width="14.41" height="8.53" />
												<polygon className="navas48" points="727.6,157.11 719.93,157.11 716.08,161.65 731.45,161.65 					" />
												<polygon className="navas49" points="727.36,166.11 720.17,166.11 716.55,170.66 730.97,170.66 					" />
												<polygon className="navas50" points="730.97,162.13 716.56,162.13 720.17,166.11 727.36,166.11 					" />
												<path className="navas51" d="M721.77,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C721.11,166.55,721.85,167.29,721.77,168.17z"/>
												<path className="navas51" d="M725.58,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C724.92,166.55,725.66,167.29,725.58,168.17z"/>
												<path className="navas51" d="M729.39,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C728.73,166.55,729.47,167.29,729.39,168.17z"/>
												<path className="navas51" d="M721.77,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C721.11,162.96,721.85,163.7,721.77,164.58z"/>
												<path className="navas51" d="M725.58,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C724.92,162.96,725.66,163.7,725.58,164.58z"/>
												<path className="navas51" d="M729.39,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C728.73,162.96,729.47,163.7,729.39,164.58z"/>
											</g>
											<g>
												<rect x="748.31" y="161.65" className="navas46" width="15.37" height="9.48" />
												<rect x="748.79" y="162.13" className="navas47" width="14.42" height="8.53" />
												<polygon className="navas48" points="759.83,157.11 752.16,157.11 748.31,161.65 763.68,161.65 					" />
												<polygon className="navas49" points="759.59,166.11 752.4,166.11 748.78,170.66 763.2,170.66 					" />
												<polygon className="navas50" points="763.2,162.13 748.79,162.13 752.4,166.11 759.59,166.11 					" />
												<path className="navas51" d="M754,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C753.34,166.55,754.08,167.29,754,168.17z"/>
												<path className="navas51" d="M757.81,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C757.15,166.55,757.89,167.29,757.81,168.17z"/>
												<path className="navas51" d="M761.62,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C760.96,166.55,761.69,167.29,761.62,168.17z"/>
												<path className="navas51" d="M754,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C753.34,162.96,754.08,163.7,754,164.58z"/>
												<path className="navas51" d="M757.81,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C757.15,162.96,757.89,163.7,757.81,164.58z"/>
												<path className="navas51" d="M761.62,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C760.96,162.96,761.69,163.7,761.62,164.58z"/>
											</g>
											<g>
												<rect x="764.6" y="172.4" className="navas46" width="15.37" height="9.48" />
												<rect x="765.08" y="172.87" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="776.12,167.85 768.45,167.85 764.6,172.4 779.97,172.4 					" />
												<polygon className="navas49" points="775.89,176.86 768.69,176.86 765.08,181.41 779.5,181.41 					" />
												<polygon className="navas50" points="779.49,172.87 765.08,172.87 768.69,176.86 775.89,176.86 					" />
												<path className="navas51" d="M770.29,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C769.64,177.3,770.37,178.04,770.29,178.91z"/>
												<path className="navas51" d="M774.1,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C773.45,177.3,774.18,178.04,774.1,178.91z"/>
												<path className="navas51" d="M777.91,178.91c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C777.25,177.3,777.99,178.04,777.91,178.91z"/>
												<path className="navas51" d="M770.29,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C769.64,173.71,770.37,174.45,770.29,175.32z"/>
												<path className="navas51" d="M774.1,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C773.45,173.71,774.18,174.45,774.1,175.32z"/>
												<path className="navas51" d="M777.91,175.32c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C777.25,173.71,777.99,174.45,777.91,175.32z"/>
											</g>
											<g>
												<rect x="764.6" y="161.65" className="navas46" width="15.37" height="9.48" />
												<rect x="765.08" y="162.13" className="navas47" width="14.42" height="8.53" />
												<polygon className="navas48" points="776.12,157.11 768.45,157.11 764.6,161.65 779.97,161.65 					" />
												<polygon className="navas49" points="775.89,166.11 768.69,166.11 765.08,170.66 779.5,170.66 					" />
												<polygon className="navas50" points="779.49,162.13 765.08,162.13 768.69,166.11 775.89,166.11 					" />
												<path className="navas51" d="M770.29,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C769.64,166.55,770.37,167.29,770.29,168.17z"/>
												<path className="navas51" d="M774.1,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C773.45,166.55,774.18,167.29,774.1,168.17z"/>
												<path className="navas51" d="M777.91,168.17c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C777.25,166.55,777.99,167.29,777.91,168.17z"/>
												<path className="navas51" d="M770.29,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C769.64,162.96,770.37,163.7,770.29,164.58z"/>
												<path className="navas51" d="M774.1,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C773.45,162.96,774.18,163.7,774.1,164.58z"/>
												<path className="navas51" d="M777.91,164.58c-0.08,0.88-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C777.25,162.96,777.99,163.7,777.91,164.58z"/>
											</g>
										</g>
										<g>
											<g>
												<rect x="732.05" y="150.9" className="navas46" width="15.37" height="9.48" />
												<rect x="732.53" y="151.38" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="743.57,146.36 735.9,146.36 732.05,150.9 747.42,150.9 					" />
												<polygon className="navas49" points="743.34,155.36 736.14,155.36 732.53,159.91 746.95,159.91 					" />
												<polygon className="navas50" points="746.95,151.38 732.53,151.38 736.14,155.36 743.34,155.36 					" />
												<path className="navas51" d="M737.74,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C737.09,155.8,737.82,156.54,737.74,157.42z"/>
												<path className="navas51" d="M741.55,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C740.9,155.8,741.63,156.54,741.55,157.42z"/>
												<path className="navas51" d="M745.36,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C744.71,155.8,745.44,156.54,745.36,157.42z"/>
												<path className="navas51" d="M737.74,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C737.09,152.21,737.82,152.95,737.74,153.83z"/>
												<path className="navas51" d="M741.55,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C740.9,152.21,741.63,152.95,741.55,153.83z"/>
												<path className="navas51" d="M745.36,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C744.71,152.21,745.44,152.95,745.36,153.83z"/>
											</g>
											<g>
												<rect x="748.31" y="150.9" className="navas46" width="15.37" height="9.48" />
												<rect x="748.79" y="151.38" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="759.83,146.36 752.16,146.36 748.31,150.9 763.68,150.9 					" />
												<polygon className="navas49" points="759.59,155.36 752.4,155.36 748.78,159.91 763.2,159.91 					" />
												<polygon className="navas50" points="763.2,151.38 748.79,151.38 752.4,155.36 759.59,155.36 					" />
												<path className="navas51" d="M754,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C753.34,155.8,754.08,156.54,754,157.42z"/>
												<path className="navas51" d="M757.81,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C757.15,155.8,757.89,156.54,757.81,157.42z"/>
												<path className="navas51" d="M761.62,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C760.96,155.8,761.69,156.54,761.62,157.42z"/>
												<path className="navas51" d="M754,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C753.34,152.21,754.08,152.95,754,153.83z"/>
												<path className="navas51" d="M757.81,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C757.15,152.21,757.89,152.95,757.81,153.83z"/>
												<path className="navas51" d="M761.62,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C760.96,152.21,761.69,152.95,761.62,153.83z"/>
											</g>
											<g>
												<rect x="732.05" y="140.16" className="navas46" width="15.37" height="9.48" />
												<rect x="732.53" y="140.63" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="743.57,135.61 735.9,135.61 732.05,140.16 747.42,140.16 					" />
												<polygon className="navas49" points="743.34,144.62 736.14,144.62 732.53,149.17 746.95,149.17 					" />
												<polygon className="navas50" points="746.95,140.63 732.53,140.63 736.14,144.62 743.34,144.62 					" />
												<path className="navas51" d="M737.74,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C737.09,145.05,737.82,145.8,737.74,146.67z"/>
												<path className="navas51" d="M741.55,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C740.9,145.05,741.63,145.8,741.55,146.67z"/>
												<path className="navas51" d="M745.36,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C744.71,145.05,745.44,145.8,745.36,146.67z"/>
												<path className="navas51" d="M737.74,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C737.09,141.47,737.82,142.21,737.74,143.08z"/>
												<path className="navas51" d="M741.55,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C740.9,141.47,741.63,142.21,741.55,143.08z"/>
												<path className="navas51" d="M745.36,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C744.71,141.47,745.44,142.21,745.36,143.08z"/>
											</g>
											<g>
												<rect x="716.08" y="150.9" className="navas46" width="15.37" height="9.48" />
												<rect x="716.56" y="151.38" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="727.6,146.36 719.93,146.36 716.08,150.9 731.45,150.9 					" />
												<polygon className="navas49" points="727.36,155.36 720.17,155.36 716.55,159.91 730.97,159.91 					" />
												<polygon className="navas50" points="730.97,151.38 716.56,151.38 720.17,155.36 727.36,155.36 					" />
												<path className="navas51" d="M721.77,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C721.11,155.8,721.85,156.54,721.77,157.42z"/>
												<path className="navas51" d="M725.58,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C724.92,155.8,725.66,156.54,725.58,157.42z"/>
												<path className="navas51" d="M729.39,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C728.73,155.8,729.47,156.54,729.39,157.42z"/>
												<path className="navas51" d="M721.77,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C721.11,152.21,721.85,152.95,721.77,153.83z"/>
												<path className="navas51" d="M725.58,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C724.92,152.21,725.66,152.95,725.58,153.83z"/>
												<path className="navas51" d="M729.39,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C728.73,152.21,729.47,152.95,729.39,153.83z"/>
											</g>
											<g>
												<rect x="716.08" y="140.16" className="navas46" width="15.37" height="9.48" />
												<rect x="716.56" y="140.63" className="navas47" width="14.41" height="8.52" />
												<polygon className="navas48" points="727.6,135.61 719.93,135.61 716.08,140.16 731.45,140.16 					" />
												<polygon className="navas49" points="727.36,144.62 720.17,144.62 716.55,149.17 730.97,149.17 					" />
												<polygon className="navas50" points="730.97,140.63 716.56,140.63 720.17,144.62 727.36,144.62 					" />
												<path className="navas51" d="M721.77,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C721.11,145.05,721.85,145.8,721.77,146.67z"/>
												<path className="navas51" d="M725.58,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C724.92,145.05,725.66,145.8,725.58,146.67z"/>
												<path className="navas51" d="M729.39,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C728.73,145.05,729.47,145.8,729.39,146.67z"/>
												<path className="navas51" d="M721.77,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.72-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C721.11,141.47,721.85,142.21,721.77,143.08z"/>
												<path className="navas51" d="M725.58,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C724.92,141.47,725.66,142.21,725.58,143.08z"/>
												<path className="navas51" d="M729.39,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C728.73,141.47,729.47,142.21,729.39,143.08z"/>
											</g>
											<g>
												<rect x="748.31" y="140.16" className="navas46" width="15.37" height="9.48" />
												<rect x="748.79" y="140.63" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="759.83,135.61 752.16,135.61 748.31,140.16 763.68,140.16 					" />
												<polygon className="navas49" points="759.59,144.62 752.4,144.62 748.78,149.17 763.2,149.17 					" />
												<polygon className="navas50" points="763.2,140.63 748.79,140.63 752.4,144.62 759.59,144.62 					" />
												<path className="navas51" d="M754,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C753.34,145.05,754.08,145.8,754,146.67z"/>
												<path className="navas51" d="M757.81,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C757.15,145.05,757.89,145.8,757.81,146.67z"/>
												<path className="navas51" d="M761.62,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C760.96,145.05,761.69,145.8,761.62,146.67z"/>
												<path className="navas51" d="M754,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C753.34,141.47,754.08,142.21,754,143.08z"/>
												<path className="navas51" d="M757.81,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C757.15,141.47,757.89,142.21,757.81,143.08z"/>
												<path className="navas51" d="M761.62,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C760.96,141.47,761.69,142.21,761.62,143.08z"/>
											</g>
											<g>
												<rect x="764.6" y="150.9" className="navas46" width="15.37" height="9.48" />
												<rect x="765.08" y="151.38" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="776.12,146.36 768.45,146.36 764.6,150.9 779.97,150.9 					" />
												<polygon className="navas49" points="775.89,155.36 768.69,155.36 765.08,159.91 779.5,159.91 					" />
												<polygon className="navas50" points="779.49,151.38 765.08,151.38 768.69,155.36 775.89,155.36 					" />
												<path className="navas51" d="M770.29,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C769.64,155.8,770.37,156.54,770.29,157.42z"/>
												<path className="navas51" d="M774.1,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C773.45,155.8,774.18,156.54,774.1,157.42z"/>
												<path className="navas51" d="M777.91,157.42c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C777.25,155.8,777.99,156.54,777.91,157.42z"/>
												<path className="navas51" d="M770.29,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C769.64,152.21,770.37,152.95,770.29,153.83z"/>
												<path className="navas51" d="M774.1,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C773.45,152.21,774.18,152.95,774.1,153.83z"/>
												<path className="navas51" d="M777.91,153.83c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C777.25,152.21,777.99,152.95,777.91,153.83z"/>
											</g>
											<g>
												<rect x="764.6" y="140.16" className="navas46" width="15.37" height="9.48" />
												<rect x="765.08" y="140.63" className="navas47" width="14.42" height="8.52" />
												<polygon className="navas48" points="776.12,135.61 768.45,135.61 764.6,140.16 779.97,140.16 					" />
												<polygon className="navas49" points="775.89,144.62 768.69,144.62 765.08,149.17 779.5,149.17 					" />
												<polygon className="navas50" points="779.49,140.63 765.08,140.63 768.69,144.62 775.89,144.62 					" />
												<path className="navas51" d="M770.29,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C769.64,145.05,770.37,145.8,770.29,146.67z"/>
												<path className="navas51" d="M774.1,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C773.45,145.05,774.18,145.8,774.1,146.67z"/>
												<path className="navas51" d="M777.91,146.67c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.88,0.94-1.55,1.92-1.51C777.25,145.05,777.99,145.8,777.91,146.67z"/>
												<path className="navas51" d="M770.29,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C769.64,141.47,770.37,142.21,770.29,143.08z"/>
												<path className="navas51" d="M774.1,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.63-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C773.45,141.47,774.18,142.21,774.1,143.08z"/>
												<path className="navas51" d="M777.91,143.08c-0.08,0.87-0.94,1.55-1.92,1.51c-0.98-0.04-1.71-0.78-1.64-1.66
						c0.08-0.87,0.94-1.55,1.92-1.51C777.25,141.47,777.99,142.21,777.91,143.08z"/>
											</g>
										</g>
									</g>
								</g>
								<g>
									<g>
										<g>
											<g>
												<g>
													<polygon className="navas52" points="728.71,384.74 1046.8,568.2 1047.95,581.79 728.71,397.67 						" />
													<polygon className="navas53" points="728.71,384.74 1048.57,569.21 1048.57,560.63 736.16,380.44 						" />
												</g>
												<g>
													<polygon className="navas52" points="736.16,367.52 1049.1,548 1048.57,560.63 736.16,380.45 						" />
													<polygon className="navas53" points="736.16,367.51 1050.98,549.09 1051.04,540.53 743.6,363.21 						" />
												</g>
												<g>
													<polygon className="navas52" points="743.6,350.29 1056.01,530.47 1054.07,542.28 743.6,363.22 						" />
													<polygon className="navas54" points="751.05,345.99 758.49,341.69 1054.94,512.69 1056.01,525.5 1054.57,529.64 743.6,350.28 						
							"/>
												</g>
											</g>
										</g>
										<g>
											<g>
												<g>
													<polygon className="navas52" points="758.49,328.76 1054.94,499.76 1054.94,512.69 758.49,341.69 						" />
													<polygon className="navas53" points="758.49,328.76 1054.94,499.76 1052.29,489.64 765.94,324.46 						" />
												</g>
												<g>
													<polygon className="navas52" points="765.94,311.53 1056.01,478.67 1052.29,489.64 765.94,324.46 						" />
													<polygon className="navas53" points="765.94,311.53 1056.01,478.67 1056.01,470.27 773.38,307.23 						" />
												</g>
												<g>
													<polygon className="navas52" points="773.38,294.3 1056.48,457.61 1056.01,470.27 773.38,307.23 						" />
													<polygon className="navas54" points="773.38,294.3 1052.29,455.2 1059.73,450.9 780.83,290 						" />
												</g>
											</g>
										</g>
									</g>
									<polygon className="navas55" points="1059.74,522.39 1052.29,522.39 1052.29,453.6 1059.74,450.9 		" />

									<rect x="1044.85" y="468.13" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 2097.1384 994.8551)" className="navas56" width="7.45" height="58.6" />

									<rect x="1037.4" y="485.4" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 2082.2441 1029.3909)" className="navas56" width="7.45" height="58.6" />

									<rect x="1015.06" y="523.8" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 2037.5746 1074.3922)" className="navas56" width="7.45" height="26.79" />

									<rect x="1022.51" y="501.99" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 2059.9099 1054.615)" className="navas56" width="14.89" height="50.64" />
									<g>
										<g>
											<g>
												<polygon className="navas57" points="1015.07,574.2 753.86,724.06 746.42,719.76 1007.62,569.9 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas57" points="1022.51,565.56 761.31,715.42 753.86,711.12 1015.07,561.26 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas57" points="1029.96,556.93 768.75,706.79 761.31,702.49 1022.51,552.63 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas57" points="1037.4,548.29 776.2,698.15 768.75,693.85 1029.96,543.99 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas58" points="1052.29,531.03 791.09,680.88 791.09,693.81 1052.29,543.96 					" />
												<polygon className="navas57" points="1052.29,531.02 791.09,680.88 783.64,676.58 1044.84,526.73 					" />
											</g>
										</g>
										<polygon className="navas59" points="1059.73,522.39 798.53,672.25 791.09,667.95 1052.29,518.09 			" />
										<polygon className="navas57" points="783.64,689.52 783.64,702.45 776.2,698.15 			" />
										<polygon className="navas60" points="798.53,672.25 798.53,762.76 746.42,732.69 746.42,719.76 753.86,724.06 753.86,711.12 
				761.31,715.42 761.31,702.49 768.75,706.79 768.75,693.85 783.64,702.45 783.64,676.58 791.09,680.88 791.09,667.95 			"/>
										<polygon className="navas61" points="798.53,674.41 798.53,672.25 1059.74,522.39 1059.74,535.32 1059.74,535.32 1059.74,612.9 
				798.53,762.76 798.53,674.42 			"/>
									</g>
								</g>
								<g>
									<g>
										<polygon className="navas62" points="873.98,401.09 873.98,422.66 854.36,411.31 854.36,389.74 			" />
										<polygon className="navas63" points="873.98,401.09 890.96,383.45 890.96,398.08 885.1,403.33 885.12,416.24 873.98,422.66 			" />
										<polygon className="navas64" points="890.96,383.45 871.34,372.09 854.36,389.74 873.98,401.09 			" />
									</g>
									<polygon className="navas54" points="870.51,420.66 857.83,413.31 857.83,395.75 870.51,403.09 		" />
									<polygon className="navas65" points="870.51,403.09 870.51,405.97 857.83,413.31 857.83,395.75 		" />
								</g>
								<g>
									<g>
										<polygon className="navas62" points="964.59,452.96 964.59,474.53 944.97,463.17 944.97,441.6 			" />
										<polygon className="navas63" points="964.59,452.96 981.57,435.31 981.57,449.95 975.71,455.19 975.73,468.1 964.59,474.53 			" />
										<polygon className="navas64" points="981.57,435.31 961.95,423.96 944.97,441.6 964.59,452.96 			" />
									</g>
									<polygon className="navas54" points="961.12,472.52 948.44,465.18 948.44,447.61 961.12,454.95 		" />
									<polygon className="navas65" points="961.12,454.95 961.12,457.84 948.44,465.18 948.44,447.61 		" />
								</g>
								<polygon className="navas18" points="1052.29,455.2 1044.85,463.83 1033.85,465.9 1033.27,478.67 1020.5,479.89 1020.49,492.66 
		994.79,495.16 994.7,508.05 968.97,501.99 968.01,514.17 944.16,508.55 944.16,521.93 954.41,554.52 696.95,704.1 746.42,732.69 
		746.42,719.76 754.09,715.35 753.86,711.12 761.31,706.85 761.31,702.49 768.86,698.15 768.75,693.85 783.64,685.31 783.64,676.58 
		791.09,672.31 791.09,667.95 974.49,562.73 1052.29,518.09 	"/>
								<polygon className="navas18" points="854.36,411.31 839.61,403.05 850.95,395.02 853.31,383.45 861.98,379.87 871.34,372.09 
		854.36,389.74 	"/>
								<polygon className="navas18" points="944.97,463.17 930.22,454.92 941.56,446.89 943.92,435.31 952.59,431.73 961.95,423.96 944.97,441.6 
			"/>
							</g>
							<polygon className="navas66" points="981.72,357.91 978.08,359.91 978.08,393.03 981.72,391.03 " />
							<polygon className="navas67" points="594.09,392.35 855.36,543.91 459.89,772.75 196.78,621.74 " />
							<g>
								<polygon className="navas8" points="864.17,535.27 594.09,380.95 594.09,385.67 864.17,540 	" />
								<polygon className="navas9" points="864.17,535.27 664.87,650.34 664.87,655.07 864.17,540 	" />
								<polygon className="navas9" points="594.09,380.95 394.79,496.01 394.79,500.74 594.09,385.67 	" />
								<polygon className="navas8" points="664.87,650.34 394.79,496.01 394.79,500.74 664.87,655.07 	" />
							</g>
							<g>
								<polygon className="navas9" points="469.78,455.44 269.02,567.94 268.96,572.66 469.72,460.17 	" />
								<polygon className="navas8" points="537.08,725.72 269.02,567.94 268.96,572.66 537.02,730.44 	" />
							</g>
							<polygon className="none" points="591.09,377.95 391.79,493.01 664.87,650.34 868.17,537.27 827.5,513.23 685.83,594.18 501.89,488.32 
	640.56,404.69 "/>
							<g>
								<g className="">
									<polygon className="navas8" points="825.84,510.91 636.59,402.76 636.59,406.08 825.84,514.22 		" />
									<polygon className="navas69" points="825.84,510.91 686.18,591.54 686.18,594.86 825.84,514.22 		" />
									<polygon className="navas9" points="636.59,402.76 496.92,483.4 496.92,486.71 636.59,406.08 		" />
									<polygon className="navas69" points="686.18,591.54 496.92,483.4 496.92,486.71 681.46,592.16 686.18,594.86 		" />
								</g>
								<polygon className="none" points="496.92,483.4 636.59,402.76 825.84,510.91 686.18,591.54 	" />
							</g>
							<g>
								<g>
									<g>
										<polygon className="navas71" points="682.6,450.62 758.08,492.09 754.42,423.29 680.46,383.89 			" />
										<polygon className="navas72" points="680.47,383.89 754.42,423.29 755.78,422.53 681.8,383.14 			" />
										<polygon className="navas73" points="759.46,491.3 755.77,422.53 754.42,423.29 758.08,492.09 			" />
									</g>
									<g>
										<polygon className="navas67" points="695.13,438.21 743.94,464.79 741.75,420.48 693.58,394.77 			" />
										<polygon className="navas74" points="693.58,394.77 741.75,420.48 742.63,419.99 694.45,394.28 			" />
										<polygon className="navas72" points="744.83,464.29 742.63,419.99 741.75,420.48 743.94,464.79 			" />
									</g>
									<g>
										<g>
											<path className="navas75" d="M745.47,418.94c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.39,0.01
					c0.28,0.15,0.52,0.52,0.54,0.82c0.01,0.14-0.03,0.23-0.11,0.29l0,0l-1.06,1.12l-0.81-1.12L745.47,418.94z"/>
											<path className="navas72" d="M744.35,420.3c0.02,0.3,0.26,0.67,0.54,0.82c0.28,0.15,0.5,0.03,0.48-0.27c-0.02-0.3-0.26-0.67-0.54-0.82
					C744.55,419.88,744.34,420,744.35,420.3z"/>
											<path className="navas76" d="M744.45,420.35c0.01,0.24,0.21,0.54,0.43,0.66c0.23,0.12,0.4,0.02,0.39-0.22
					c-0.01-0.24-0.21-0.54-0.43-0.66C744.61,420.01,744.44,420.11,744.45,420.35z"/>
										</g>
										<g>
											<path className="navas75" d="M738.95,415.45c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.39,0.01
					c0.28,0.15,0.52,0.51,0.54,0.81c0.01,0.14-0.03,0.23-0.11,0.29l0,0l-1.06,1.11l-0.81-1.12L738.95,415.45z"/>
											<path className="navas72" d="M737.83,416.8c0.01,0.3,0.25,0.67,0.54,0.82c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.67-0.54-0.82
					C738.03,416.38,737.81,416.5,737.83,416.8z"/>
											<path className="navas76" d="M737.93,416.86c0.01,0.24,0.2,0.53,0.43,0.66c0.23,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.43-0.66
					C738.09,416.52,737.92,416.62,737.93,416.86z"/>
										</g>
										<g>
											<path className="navas75" d="M732.44,411.9c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.39,0.01
					c0.28,0.15,0.52,0.51,0.53,0.81c0.01,0.13-0.03,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.12L732.44,411.9z"/>
											<path className="navas72" d="M731.32,413.26c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.53-0.81
					C731.52,412.84,731.31,412.96,731.32,413.26z"/>
											<path className="navas76" d="M731.42,413.31c0.01,0.24,0.2,0.53,0.43,0.65c0.23,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.43-0.65
					C731.58,412.97,731.41,413.07,731.42,413.31z"/>
										</g>
										<g>
											<path className="navas75" d="M725.96,408.42c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.52,0.51,0.53,0.81c0.01,0.13-0.03,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.11L725.96,408.42z"/>
											<path className="navas72" d="M724.84,409.77c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.53-0.81
					C725.04,409.35,724.83,409.48,724.84,409.77z"/>
											<path className="navas76" d="M724.94,409.83c0.01,0.24,0.2,0.53,0.43,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.43-0.65
					C725.1,409.49,724.93,409.59,724.94,409.83z"/>
										</g>
										<g>
											<path className="navas75" d="M719.5,405.05c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.52,0.51,0.53,0.81c0.01,0.13-0.03,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.11L719.5,405.05z"/>
											<path className="navas72" d="M718.38,406.4c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.53-0.81
					C718.59,405.98,718.37,406.1,718.38,406.4z"/>
											<path className="navas76" d="M718.48,406.45c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C718.64,406.11,718.47,406.21,718.48,406.45z"/>
										</g>
										<g>
											<path className="navas75" d="M713.06,401.6c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.53,0.81c0.01,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.1l-0.79-1.11L713.06,401.6z"/>
											<path className="navas72" d="M711.94,402.94c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.25-0.66-0.53-0.81C712.15,402.52,711.93,402.64,711.94,402.94z"/>
											<path className="navas76" d="M712.04,402.99c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C712.2,402.66,712.03,402.75,712.04,402.99z"/>
										</g>
										<g>
											<path className="navas75" d="M706.64,398.21c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.8c0.01,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.79-1.1L706.64,398.21z"/>
											<path className="navas72" d="M705.53,399.55c0.01,0.3,0.25,0.66,0.52,0.8c0.28,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.52-0.8
					C705.73,399.13,705.51,399.25,705.53,399.55z"/>
											<path className="navas76" d="M705.62,399.6c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C705.79,399.27,705.62,399.36,705.62,399.6z"/>
										</g>
										<g>
											<path className="navas75" d="M700.25,394.8c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.8c0.01,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.1L700.25,394.8z"/>
											<path className="navas72" d="M699.13,396.14c0.01,0.3,0.24,0.65,0.52,0.8c0.28,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.24-0.65-0.52-0.8
					C699.33,395.72,699.12,395.84,699.13,396.14z"/>
											<path className="navas76" d="M699.23,396.19c0.01,0.24,0.2,0.53,0.42,0.64c0.22,0.12,0.39,0.02,0.39-0.22
					c-0.01-0.24-0.2-0.53-0.42-0.64C699.39,395.86,699.22,395.95,699.23,396.19z"/>
										</g>
										<g>
											<path className="navas75" d="M693.87,391.4c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.5,0.52,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.1L693.87,391.4z"/>
											<path className="navas72" d="M692.75,392.73c0.01,0.29,0.24,0.65,0.52,0.8c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.24-0.65-0.52-0.8C692.96,392.32,692.74,392.44,692.75,392.73z"/>
											<path className="navas76" d="M692.85,392.79c0.01,0.24,0.19,0.52,0.42,0.64c0.22,0.12,0.39,0.02,0.38-0.22
					c-0.01-0.24-0.19-0.52-0.42-0.64C693.01,392.45,692.84,392.55,692.85,392.79z"/>
										</g>
										<g>
											<path className="navas75" d="M687.51,387.95c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.07,0.38,0.01
					c0.27,0.15,0.5,0.5,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.78-1.1L687.51,387.95z"/>
											<path className="navas72" d="M686.39,389.28c0.01,0.29,0.24,0.65,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.24-0.65-0.51-0.8C686.6,388.87,686.38,388.99,686.39,389.28z"/>
											<path className="navas76" d="M686.49,389.33c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.21
					c-0.01-0.24-0.19-0.52-0.41-0.64S686.48,389.1,686.49,389.33z"/>
										</g>
									</g>
									<g>
										<g>
											<polygon className="navas77" points="704.74,510.17 705.11,509.96 704.74,500.2 704.38,500.4 				" />
											<polygon className="navas77" points="693.98,504.13 694.35,503.92 694.01,494.2 693.65,494.41 				" />
											<polygon className="navas77" points="683.28,498.12 683.65,497.91 683.34,488.24 682.98,488.44 				" />
											<polygon className="navas77" points="672.64,492.14 673,491.94 672.72,482.3 672.36,482.51 				" />
											<polygon className="navas77" points="662.05,486.2 662.41,486 662.17,476.4 661.8,476.61 				" />
											<polygon className="navas77" points="651.52,480.29 651.88,480.09 651.66,470.53 651.3,470.74 				" />
											<polygon className="navas77" points="641.05,474.41 641.41,474.21 641.22,464.7 640.86,464.9 				" />
										</g>
										<g>
											<polygon className="navas78" points="725.53,510.14 725.92,510.36 725.49,500.57 725.11,500.36 				" />
											<polygon className="navas78" points="735.87,504.27 736.26,504.48 735.8,494.72 735.42,494.51 				" />
											<polygon className="navas78" points="746.2,498.41 746.58,498.62 746.1,488.88 745.71,488.67 				" />
											<polygon className="navas78" points="756.51,492.55 756.89,492.76 756.38,483.04 755.99,482.83 				" />
										</g>
										<g>
											<polygon className="navas78" points="704.36,509.95 704.74,510.17 704.38,500.4 704,500.19 				" />
											<polygon className="navas78" points="715.18,516.03 715.56,516.24 715.16,506.43 714.78,506.22 				" />
											<polygon className="navas78" points="715.1,514.18 715.36,514.03 704.38,500.4 704.12,500.55 				" />
											<polygon className="navas78" points="704.3,508.12 704.55,507.97 693.65,494.41 693.39,494.55 				" />
											<polygon className="navas78" points="693.54,502.09 693.8,501.94 682.98,488.44 682.72,488.59 				" />
											<polygon className="navas78" points="682.85,496.09 683.1,495.94 672.36,482.51 672.1,482.65 				" />
											<polygon className="navas78" points="672.22,490.12 672.47,489.98 661.81,476.61 661.55,476.75 				" />
											<polygon className="navas78" points="661.63,484.18 661.89,484.04 651.3,470.74 651.05,470.88 				" />
											<polygon className="navas78" points="651.11,478.29 651.37,478.14 640.86,464.9 640.61,465.05 				" />
											<polygon className="navas78" points="715.51,514.82 715.49,514.4 640.64,472.41 640.65,472.82 				" />
											<polygon className="navas78" points="693.6,503.91 693.98,504.13 693.65,494.41 693.27,494.19 				" />
											<polygon className="navas78" points="682.9,497.91 683.28,498.12 682.98,488.44 682.6,488.23 				" />
											<polygon className="navas78" points="672.26,491.93 672.64,492.14 672.36,482.51 671.99,482.3 				" />
											<polygon className="navas78" points="661.68,485.99 662.05,486.2 661.8,476.61 661.43,476.4 				" />
											<polygon className="navas78" points="651.15,480.08 651.52,480.29 651.3,470.74 650.93,470.53 				" />
											<polygon className="navas78" points="640.68,474.2 641.05,474.41 640.86,464.9 640.49,464.69 				" />
										</g>
										<g>
											<polygon className="navas77" points="756.8,490.93 757.04,490.49 746.46,488.67 746.22,489.11 				" />
											<polygon className="navas77" points="746.5,496.78 746.74,496.34 736.17,494.51 735.93,494.96 				" />
											<polygon className="navas77" points="736.17,502.65 736.41,502.2 725.85,500.37 725.61,500.81 				" />
											<polygon className="navas77" points="725.84,508.51 726.09,508.07 715.53,506.22 715.29,506.67 				" />
											<polygon className="navas77" points="757.18,491.14 757.16,490.72 715.49,514.4 715.51,514.82 				" />
											<polygon className="navas77" points="756.89,492.76 757.26,492.55 756.74,482.84 756.38,483.04 				" />
											<polygon className="navas77" points="746.58,498.62 746.95,498.41 746.46,488.67 746.1,488.88 				" />
											<polygon className="navas77" points="736.26,504.48 736.62,504.28 736.16,494.52 735.8,494.72 				" />
											<polygon className="navas77" points="725.92,510.36 726.28,510.15 725.85,500.37 725.49,500.57 				" />
											<polygon className="navas77" points="715.56,516.24 715.93,516.03 715.53,506.23 715.16,506.43 				" />
										</g>
									</g>
									<g>
										<g>
											<polygon className="navas72" points="667.05,450.18 675.36,454.76 679.62,452.36 683.41,450.23 675.09,445.66 				" />
											<polygon className="navas73" points="675.36,454.76 679.62,452.36 683.41,450.23 683.43,450.83 679.64,452.96 675.38,455.36 				" />
											<polygon className="navas71" points="675.36,454.76 670.96,452.33 667.05,450.18 667.07,450.78 670.97,452.93 675.38,455.36 				" />
										</g>
										<g>
											<path className="navas77" d="M669.21,450.19l5.91-3.32l-2.4-80.25l-5.78,3.22L669.21,450.19z M669.02,429.19l-0.08-2.77l4.6,0.24
					L669.02,429.19z M673.55,427.1l-4.44,5.31l-0.08-2.78L673.55,427.1z M668.83,422.47l-0.08-2.76l4.59,0.23L668.83,422.47z
					 M673.35,420.38l-4.43,5.29l-0.08-2.77L673.35,420.38z M668.64,415.77l-0.08-2.75l4.58,0.23L668.64,415.77z M673.15,413.69
					l-4.42,5.28l-0.08-2.76L673.15,413.69z M668.45,409.1l-0.08-2.74l4.57,0.23L668.45,409.1z M672.95,407.02l-4.41,5.26l-0.08-2.74
					L672.95,407.02z M668.26,402.45l-0.08-2.73l4.56,0.22L668.26,402.45z M672.76,400.38l-4.41,5.24l-0.08-2.73L672.76,400.38z
					 M668.08,395.84l-0.08-2.72l4.55,0.22L668.08,395.84z M672.56,393.77l-4.4,5.22l-0.08-2.72L672.56,393.77z M667.89,389.24
					l-0.08-2.71l4.54,0.22L667.89,389.24z M672.37,387.18l-4.39,5.21l-0.08-2.71L672.37,387.18z M667.7,382.68l-0.08-2.7l4.53,0.21
					L667.7,382.68z M672.17,380.62l-4.38,5.19l-0.08-2.7L672.17,380.62z M667.52,376.13l-0.08-2.69l4.52,0.21L667.52,376.13z
					 M671.98,374.08l-4.37,5.17l-0.08-2.69L671.98,374.08z M667.64,372.97l4.71-5.57l0.17,5.79L667.64,372.97z M672.55,373.91
					l0.17,5.81l-4.89-0.23L672.55,373.91z M672.74,380.45l0.17,5.83l-4.9-0.23L672.74,380.45z M672.94,387.01l0.17,5.86l-4.91-0.24
					L672.94,387.01z M673.13,393.6l0.17,5.88l-4.92-0.24L673.13,393.6z M673.33,400.21l0.18,5.9l-4.93-0.24L673.33,400.21z
					 M673.53,406.85l0.18,5.93l-4.94-0.25L673.53,406.85z M673.73,413.52l0.18,5.95l-4.95-0.25L673.73,413.52z M673.93,420.21
					l0.18,5.97l-4.96-0.26L673.93,420.21z M674.13,426.93l0.18,6l-4.97-0.26L674.13,426.93z M673.73,433.4l-4.53,2.54l-0.08-2.78
					L673.73,433.4z M669.49,445.96l-0.08-2.8l4.54-2.55L669.49,445.96z M674.53,440.44l0.18,6.04l-4.99-0.27L674.53,440.44z
					 M669.4,442.71l-0.08-2.79l4.61,0.25L669.4,442.71z M669.52,439.42l4.8-5.75l0.18,6.02L669.52,439.42z M669.3,439.17l-0.08-2.79
					l4.53-2.54L669.3,439.17z M667.35,370.04l4.44-2.47l-4.36,5.15L667.35,370.04z M669.59,449.52l-0.08-2.8l4.62,0.25
					L669.59,449.52z"/>
											<path className="navas79" d="M675.12,446.86l6.12,3.36l-2.54-80.45l-5.97-3.16L675.12,446.86z M674.91,426.33l-0.08-2.77l4.76,5.31
					L674.91,426.33z M679.59,429.32l-4.59,0.23l-0.08-2.77L679.59,429.32z M674.71,419.62l-0.08-2.76l4.75,5.29L674.71,419.62z
					 M679.38,422.59l-4.58,0.23l-0.08-2.76L679.38,422.59z M674.51,412.93l-0.08-2.75l4.74,5.27L674.51,412.93z M679.17,415.89
					l-4.57,0.23l-0.08-2.75L679.17,415.89z M674.31,406.27l-0.08-2.74l4.73,5.24L674.31,406.27z M678.96,409.21l-4.56,0.24
					l-0.08-2.74L678.96,409.21z M674.11,399.63l-0.08-2.73l4.72,5.22L674.11,399.63z M678.76,402.56l-4.55,0.24l-0.08-2.73
					L678.76,402.56z M673.91,393.02l-0.08-2.72l4.71,5.2L673.91,393.02z M678.55,395.93l-4.55,0.24l-0.08-2.72L678.55,395.93z
					 M673.71,386.43l-0.08-2.7l4.7,5.17L673.71,386.43z M678.34,389.33l-4.54,0.24l-0.08-2.71L678.34,389.33z M673.51,379.87
					l-0.08-2.69l4.69,5.15L673.51,379.87z M678.14,382.76l-4.53,0.24l-0.08-2.7L678.14,382.76z M673.32,373.34l-0.08-2.68l4.68,5.13
					L673.32,373.34z M677.93,376.21l-4.52,0.25l-0.08-2.69L677.93,376.21z M673.44,370.41l4.87-0.27l0.18,5.8L673.44,370.41z
					 M678.52,376.67l0.18,5.82l-5.06-5.56L678.52,376.67z M678.73,383.22l0.18,5.85l-5.07-5.58L678.73,383.22z M678.93,389.79
					l0.18,5.87l-5.08-5.61L678.93,389.79z M679.14,396.4l0.19,5.89l-5.09-5.63L679.14,396.4z M679.35,403.02l0.19,5.92l-5.1-5.66
					L679.35,403.02z M679.56,409.68l0.19,5.94l-5.12-5.68L679.56,409.68z M679.77,416.36l0.19,5.96l-5.13-5.71L679.77,416.36z
					 M679.98,423.06l0.19,5.99l-5.14-5.74L679.98,423.06z M680.19,429.8l0.19,6.01l-5.15-5.76L680.19,429.8z M679.79,435.63
					l-4.68-2.56l-0.08-2.78L679.79,435.63z M675.41,443.09l-0.08-2.8l4.69,2.57L675.41,443.09z M680.62,443.34l0.19,6.06l-5.17-5.81
					L680.62,443.34z M675.31,439.84l-0.08-2.79l4.78,5.36L675.31,439.84z M675.44,436.8l4.97-0.25l0.19,6.03L675.44,436.8z
					 M675.21,436.3l-0.08-2.78l4.68,2.56L675.21,436.3z M673.14,367.25l4.59,2.43l-4.51,0.25L673.14,367.25z M675.52,446.64
					l-0.08-2.8l4.79,5.38L675.52,446.64z"/>
											<path className="navas77" d="M675.32,453.56l5.92-3.33l-2.54-80.45l-5.78,3.22L675.32,453.56z M675.09,432.51l-0.08-2.78l4.61,0.24
					L675.09,432.51z M679.63,430.41l-4.44,5.32l-0.08-2.78L679.63,430.41z M674.89,425.77l-0.08-2.77l4.6,0.24L674.89,425.77z
					 M679.42,423.68l-4.43,5.3l-0.08-2.77L679.42,423.68z M674.69,419.05l-0.08-2.76l4.59,0.23L674.69,419.05z M679.21,416.97
					l-4.42,5.29l-0.08-2.76L679.21,416.97z M674.49,412.37l-0.08-2.75l4.58,0.23L674.49,412.37z M679,410.29l-4.41,5.27l-0.08-2.75
					L679,410.29z M674.29,405.7l-0.08-2.74l4.57,0.23L674.29,405.7z M678.79,403.63l-4.41,5.25l-0.08-2.74L678.79,403.63z
					 M674.09,399.07l-0.08-2.73l4.56,0.22L674.09,399.07z M678.58,397l-4.4,5.23l-0.08-2.73L678.58,397z M673.89,392.46l-0.08-2.71
					l4.55,0.22L673.89,392.46z M678.38,390.4l-4.39,5.22l-0.08-2.72L678.38,390.4z M673.69,385.88l-0.08-2.7l4.54,0.21
					L673.69,385.88z M678.17,383.82l-4.38,5.2l-0.08-2.71L678.17,383.82z M673.5,379.32l-0.08-2.69l4.53,0.21L673.5,379.32z
					 M677.96,377.26l-4.37,5.18l-0.08-2.7L677.96,377.26z M673.62,376.14l4.71-5.58l0.18,5.8L673.62,376.14z M678.54,377.09
					l0.18,5.83l-4.9-0.23L678.54,377.09z M678.74,383.65l0.18,5.85l-4.91-0.23L678.74,383.65z M678.95,390.23l0.18,5.87l-4.92-0.24
					L678.95,390.23z M679.16,396.83l0.19,5.89l-4.93-0.24L679.16,396.83z M679.37,403.46l0.19,5.92l-4.94-0.25L679.37,403.46z
					 M679.57,410.12l0.19,5.94l-4.95-0.25L679.57,410.12z M679.79,416.8l0.19,5.96l-4.96-0.26L679.79,416.8z M680,423.51l0.19,5.99
					l-4.97-0.26L680,423.51z M680.21,430.24l0.19,6.01l-4.98-0.26L680.21,430.24z M679.83,436.73l-4.53,2.55l-0.08-2.79
					L679.83,436.73z M675.6,449.32l-0.08-2.81l4.54-2.55L675.6,449.32z M680.64,443.79l0.19,6.06l-5-0.27L680.64,443.79z
					 M675.5,446.06l-0.08-2.8l4.62,0.25L675.5,446.06z M675.62,442.77l4.8-5.77l0.19,6.03L675.62,442.77z M675.39,442.51l-0.08-2.8
					l4.53-2.55L675.39,442.51z M673.32,373.21l4.45-2.48l-4.36,5.17L673.32,373.21z M675.7,452.88l-0.08-2.81l4.63,0.25
					L675.7,452.88z"/>
											<path className="navas78" d="M669.21,450.19l6.11,3.37l-2.4-80.56l-5.97-3.17L669.21,450.19z M669.6,449.96l-0.08-2.81l4.78,5.39
					L669.6,449.96z M669.41,443.16l-0.08-2.79l4.77,5.37L669.41,443.16z M674.11,446.18l-4.61,0.22l-0.08-2.8L674.11,446.18z
					 M669.22,436.38l-0.08-2.78l4.76,5.35L669.22,436.38z M673.91,439.39l-4.6,0.23l-0.08-2.79L673.91,439.39z M669.03,429.63
					l-0.08-2.77l4.75,5.32L669.03,429.63z M673.71,432.62l-4.59,0.23l-0.08-2.78L673.71,432.62z M668.84,422.91l-0.08-2.76l4.74,5.3
					L668.84,422.91z M673.51,425.88l-4.58,0.23l-0.08-2.77L673.51,425.88z M668.65,416.21l-0.08-2.75l4.73,5.27L668.65,416.21z
					 M673.31,419.17l-4.57,0.23l-0.08-2.76L673.31,419.17z M668.46,409.54l-0.08-2.74l4.72,5.25L668.46,409.54z M673.11,412.48
					l-4.56,0.23l-0.08-2.75L673.11,412.48z M668.27,402.89l-0.08-2.73l4.71,5.23L668.27,402.89z M672.92,405.82l-4.55,0.24
					l-0.08-2.73L672.92,405.82z M668.09,396.27l-0.08-2.72l4.7,5.2L668.09,396.27z M672.72,399.19l-4.55,0.24l-0.08-2.72
					L672.72,399.19z M667.9,389.67l-0.08-2.71l4.69,5.18L667.9,389.67z M672.53,392.58l-4.54,0.24l-0.08-2.71L672.53,392.58z
					 M667.72,383.11l-0.08-2.7l4.68,5.16L667.72,383.11z M672.33,386l-4.53,0.24l-0.08-2.7L672.33,386z M667.53,376.56l-0.08-2.69
					l4.67,5.14L667.53,376.56z M672.14,379.44l-4.52,0.24l-0.08-2.69L672.14,379.44z M667.66,373.63l4.87-0.27l0.17,5.81
					L667.66,373.63z M672.73,379.9l0.17,5.83l-5.05-5.57L672.73,379.9z M672.92,386.46l0.17,5.86l-5.06-5.59L672.92,386.46z
					 M673.12,393.04l0.17,5.88l-5.07-5.62L673.12,393.04z M673.31,399.65l0.18,5.9l-5.08-5.64L673.31,399.65z M673.51,406.29
					l0.18,5.92l-5.09-5.67L673.51,406.29z M673.71,412.95l0.18,5.95l-5.1-5.69L673.71,412.95z M673.91,419.64l0.18,5.97l-5.12-5.72
					L673.91,419.64z M674.11,426.36l0.18,5.99l-5.13-5.75L674.11,426.36z M674.31,433.1l0.18,6.02l-5.14-5.77L674.31,433.1z
					 M674.51,439.87l0.18,6.04l-5.15-5.8L674.51,439.87z M674.71,446.66l0.18,6.07l-5.16-5.82L674.71,446.66z M667.36,370.47
					l4.59,2.44l-4.51,0.25L667.36,370.47z"/>
										</g>
									</g>
									<g>
										<g>
											<polygon className="navas72" points="624.31,474.2 632.56,478.85 636.84,476.44 640.65,474.29 632.4,469.66 				" />
											<polygon className="navas73" points="632.56,478.85 636.84,476.44 640.65,474.29 640.66,474.9 636.85,477.04 632.57,479.45 				" />
											<polygon className="navas71" points="632.56,478.85 628.19,476.39 624.31,474.2 624.32,474.81 628.2,476.99 632.57,479.45 				" />
										</g>
										<g>
											<path className="navas77" d="M626.47,474.22l5.95-3.34l-1.41-81.02l-5.81,3.23L626.47,474.22z M626.54,453.01l-0.04-2.8l4.59,0.25
					L626.54,453.01z M631.09,450.91l-4.5,5.35l-0.04-2.8L631.09,450.91z M626.43,446.23l-0.04-2.79l4.58,0.25L626.43,446.23z
					 M630.97,444.13l-4.49,5.33l-0.04-2.79L630.97,444.13z M626.32,439.47l-0.04-2.78l4.57,0.24L626.32,439.47z M630.86,437.37
					l-4.48,5.32l-0.04-2.78L630.86,437.37z M626.22,432.73l-0.04-2.77l4.56,0.24L626.22,432.73z M630.74,430.64l-4.47,5.3
					l-0.04-2.77L630.74,430.64z M626.11,426.02l-0.04-2.76l4.55,0.24L626.11,426.02z M630.63,423.94l-4.46,5.28l-0.04-2.76
					L630.63,423.94z M626.01,419.34l-0.04-2.74l4.54,0.23L626.01,419.34z M630.51,417.26l-4.46,5.26l-0.04-2.75L630.51,417.26z
					 M625.9,412.68l-0.04-2.73l4.53,0.23L625.9,412.68z M630.4,410.61l-4.45,5.25l-0.04-2.74L630.4,410.61z M625.8,406.05
					l-0.04-2.72l4.52,0.22L625.8,406.05z M630.29,403.99l-4.44,5.23l-0.04-2.73L630.29,403.99z M625.69,399.45l-0.04-2.71l4.52,0.22
					L625.69,399.45z M630.17,397.39l-4.43,5.21l-0.04-2.72L630.17,397.39z M625.86,396.25l4.77-5.61l0.1,5.85L625.86,396.25z
					 M630.74,397.22l0.1,5.87l-4.88-0.24L630.74,397.22z M630.86,403.82l0.1,5.89l-4.89-0.25L630.86,403.82z M630.97,410.44
					l0.1,5.91l-4.9-0.25L630.97,410.44z M631.09,417.09l0.1,5.94l-4.91-0.25L631.09,417.09z M631.2,423.77l0.1,5.96l-4.92-0.26
					L631.2,423.77z M631.32,430.48l0.1,5.98l-4.93-0.26L631.32,430.48z M631.43,437.2l0.1,6.01l-4.94-0.27L631.43,437.2z
					 M631.55,443.96l0.1,6.03l-4.95-0.27L631.55,443.96z M631.67,450.74l0.1,6.05l-4.96-0.28L631.67,450.74z M631.2,457.27
					l-4.55,2.55l-0.04-2.81L631.2,457.27z M626.81,469.95l-0.04-2.83l4.56-2.56L626.81,469.95z M631.9,464.39l0.11,6.1l-4.98-0.28
					L631.9,464.39z M626.75,466.67l-0.04-2.82l4.6,0.26L626.75,466.67z M626.92,463.35l4.87-5.8l0.1,6.08L626.92,463.35z
					 M626.7,463.09l-0.04-2.82l4.55-2.55L626.7,463.09z M625.6,393.3l4.46-2.49l-4.42,5.19L625.6,393.3z M626.86,473.54l-0.04-2.83
					l4.61,0.26L626.86,473.54z"/>
											<path className="navas79" d="M632.42,470.87l6.07,3.41l-1.55-81.23l-5.93-3.21L632.42,470.87z M632.45,450.15l-0.05-2.8l4.68,5.37
					L632.45,450.15z M637.1,453.17l-4.59,0.22l-0.05-2.8L637.1,453.17z M632.34,443.37l-0.05-2.78l4.67,5.35L632.34,443.37z
					 M636.97,446.38l-4.58,0.22l-0.05-2.79L636.97,446.38z M632.22,436.61l-0.05-2.77l4.67,5.33L632.22,436.61z M636.84,439.61
					l-4.57,0.23l-0.05-2.78L636.84,439.61z M632.1,429.88l-0.05-2.76l4.66,5.3L632.1,429.88z M636.72,432.87l-4.56,0.23l-0.05-2.77
					L636.72,432.87z M631.98,423.18l-0.05-2.75l4.65,5.28L631.98,423.18z M636.59,426.15l-4.55,0.23l-0.05-2.76L636.59,426.15z
					 M631.87,416.51l-0.05-2.74l4.64,5.26L631.87,416.51z M636.46,419.46l-4.54,0.23l-0.05-2.75L636.46,419.46z M631.75,409.86
					l-0.05-2.73l4.63,5.23L631.75,409.86z M636.34,412.8l-4.53,0.23l-0.05-2.74L636.34,412.8z M631.63,403.23l-0.05-2.72l4.62,5.21
					L631.63,403.23z M636.21,406.16l-4.52,0.24l-0.05-2.73L636.21,406.16z M631.52,396.64l-0.05-2.71l4.61,5.19L631.52,396.64z
					 M636.09,399.55l-4.52,0.24l-0.05-2.71L636.09,399.55z M631.68,393.68l4.87-0.26l0.11,5.86L631.68,393.68z M636.67,400.01
					l0.11,5.88l-4.99-5.62L636.67,400.01z M636.8,406.62l0.11,5.9l-5-5.65L636.8,406.62z M636.92,413.26l0.11,5.93l-5.01-5.68
					L636.92,413.26z M637.05,419.93l0.11,5.95l-5.02-5.7L637.05,419.93z M637.18,426.62l0.11,5.97l-5.03-5.73L637.18,426.62z
					 M637.31,433.34l0.11,6l-5.04-5.75L637.31,433.34z M637.43,440.09l0.11,6.02l-5.05-5.78L637.43,440.09z M637.56,446.86
					l0.11,6.04l-5.06-5.8L637.56,446.86z M637.69,453.65l0.12,6.07l-5.07-5.83L637.69,453.65z M637.22,459.55l-4.64-2.59l-0.05-2.81
					L637.22,459.55z M632.75,467.06l-0.05-2.82l4.65,2.61L632.75,467.06z M637.95,467.33l0.12,6.12l-5.09-5.88L637.95,467.33z
					 M632.69,463.79l-0.05-2.82l4.7,5.42L632.69,463.79z M632.86,460.71l4.96-0.24l0.12,6.09L632.86,460.71z M632.63,460.21
					l-0.05-2.81l4.65,2.59L632.63,460.21z M631.41,390.49l4.55,2.46l-4.51,0.24L631.41,390.49z M632.81,470.65l-0.05-2.83l4.71,5.45
					L632.81,470.65z"/>
											<path className="navas77" d="M632.53,477.63l5.95-3.35l-1.55-81.23l-5.81,3.24L632.53,477.63z M632.56,456.38l-0.05-2.81l4.6,0.25
					L632.56,456.38z M637.12,454.27l-4.5,5.36l-0.05-2.81L637.12,454.27z M632.45,449.57l-0.05-2.79l4.59,0.25L632.45,449.57z
					 M636.99,447.47l-4.49,5.35l-0.05-2.8L636.99,447.47z M632.33,442.79l-0.05-2.78l4.58,0.25L632.33,442.79z M636.87,440.7
					l-4.48,5.33l-0.05-2.79L636.87,440.7z M632.21,436.04l-0.05-2.77l4.57,0.24L632.21,436.04z M636.74,433.95l-4.47,5.31
					l-0.05-2.78L636.74,433.95z M632.09,429.32l-0.05-2.76l4.56,0.24L632.09,429.32z M636.61,427.23l-4.46,5.29l-0.05-2.77
					L636.61,427.23z M631.97,422.62l-0.05-2.75l4.55,0.23L631.97,422.62z M636.49,420.54l-4.46,5.27l-0.05-2.76L636.49,420.54z
					 M631.86,415.94l-0.05-2.74l4.54,0.23L631.86,415.94z M636.36,413.87l-4.45,5.26l-0.05-2.75L636.36,413.87z M631.74,409.3
					l-0.05-2.73l4.53,0.23L631.74,409.3z M636.23,407.23l-4.44,5.24l-0.05-2.74L636.23,407.23z M631.62,402.68l-0.05-2.72l4.52,0.22
					L631.62,402.68z M636.11,400.61l-4.43,5.22l-0.05-2.72L636.11,400.61z M631.78,399.47l4.77-5.62l0.11,5.86L631.78,399.47z
					 M636.68,400.44l0.11,5.88l-4.89-0.24L636.68,400.44z M636.81,407.06l0.11,5.91l-4.9-0.25L636.81,407.06z M636.93,413.7
					l0.11,5.93l-4.91-0.25L636.93,413.7z M637.06,420.37l0.11,5.95l-4.92-0.26L637.06,420.37z M637.19,427.06l0.11,5.98l-4.93-0.26
					L637.19,427.06z M637.32,433.78l0.11,6l-4.94-0.26L637.32,433.78z M637.44,440.53l0.11,6.02l-4.95-0.27L637.44,440.53z
					 M637.57,447.3l0.11,6.05l-4.96-0.27L637.57,447.3z M637.7,454.1l0.12,6.07l-4.97-0.28L637.7,454.1z M637.24,460.65l-4.56,2.56
					l-0.05-2.82L637.24,460.65z M632.86,473.35l-0.05-2.83l4.57-2.57L632.86,473.35z M637.96,467.78l0.12,6.12l-4.99-0.29
					L637.96,467.78z M632.8,470.07l-0.05-2.83l4.61,0.26L632.8,470.07z M632.96,466.74l4.87-5.81l0.12,6.09L632.96,466.74z
					 M632.74,466.48l-0.05-2.82l4.56-2.56L632.74,466.48z M631.52,396.51l4.47-2.49l-4.42,5.2L631.52,396.51z M632.92,476.95
					l-0.05-2.84l4.62,0.27L632.92,476.95z"/>
											<path className="navas78" d="M626.47,474.22l6.06,3.42l-1.41-81.33l-5.92-3.21L626.47,474.22z M626.87,473.99l-0.04-2.83l4.7,5.46
					L626.87,473.99z M626.76,467.12l-0.04-2.82l4.69,5.43L626.76,467.12z M631.42,470.18l-4.6,0.22l-0.04-2.83L631.42,470.18z
					 M626.65,460.28l-0.04-2.81l4.68,5.41L626.65,460.28z M631.3,463.32l-4.6,0.22l-0.04-2.82L631.3,463.32z M626.54,453.46
					l-0.04-2.8l4.67,5.38L626.54,453.46z M631.18,456.49l-4.59,0.22l-0.04-2.8L631.18,456.49z M626.44,446.67l-0.04-2.79l4.66,5.36
					L626.44,446.67z M631.07,449.69l-4.58,0.22l-0.04-2.79L631.07,449.69z M626.33,439.91l-0.04-2.78l4.66,5.34L626.33,439.91z
					 M630.95,442.91l-4.57,0.22l-0.04-2.78L630.95,442.91z M626.22,433.17l-0.04-2.77l4.65,5.31L626.22,433.17z M630.83,436.16
					l-4.56,0.23l-0.04-2.77L630.83,436.16z M626.12,426.46l-0.04-2.76l4.64,5.29L626.12,426.46z M630.72,429.43l-4.55,0.23
					l-0.04-2.76L630.72,429.43z M626.01,419.78l-0.04-2.75l4.63,5.26L626.01,419.78z M630.61,422.74l-4.54,0.23l-0.04-2.75
					L630.61,422.74z M625.91,413.12l-0.04-2.73l4.62,5.24L625.91,413.12z M630.49,416.06l-4.53,0.23l-0.04-2.74L630.49,416.06z
					 M625.8,406.49l-0.04-2.72l4.61,5.22L625.8,406.49z M630.38,409.42l-4.52,0.23l-0.04-2.73L630.38,409.42z M625.7,399.88
					l-0.04-2.71l4.6,5.19L625.7,399.88z M630.26,402.79l-4.52,0.24l-0.04-2.72L630.26,402.79z M625.87,396.92l4.87-0.26l0.1,5.87
					L625.87,396.92z M630.85,403.26l0.1,5.89l-4.98-5.63L630.85,403.26z M630.96,409.88l0.1,5.91l-4.99-5.66L630.96,409.88z
					 M631.08,416.53l0.1,5.93l-5-5.68L631.08,416.53z M631.19,423.21l0.1,5.96l-5.01-5.71L631.19,423.21z M631.31,429.91l0.1,5.98
					l-5.02-5.74L631.31,429.91z M631.42,436.63l0.1,6l-5.03-5.76L631.42,436.63z M631.54,443.39l0.1,6.03l-5.04-5.79L631.54,443.39z
					 M631.66,450.17l0.1,6.05l-5.05-5.81L631.66,450.17z M631.77,456.98l0.1,6.08l-5.06-5.84L631.77,456.98z M631.89,463.81
					l0.11,6.1l-5.07-5.87L631.89,463.81z M632.01,470.67l0.11,6.12l-5.08-5.89L632.01,470.67z M625.6,393.73l4.55,2.47l-4.51,0.24
					L625.6,393.73z"/>
										</g>
									</g>
									<g>
										<polygon className="navas74" points="640.4,459.85 714.96,501.44 757.3,477.42 682.14,436.4 			" />
										<g>
											<polygon className="navas75" points="703.81,495.22 704.19,495.43 746.44,471.5 746.06,471.29 				" />
											<polygon className="navas75" points="693.1,489.24 693.48,489.46 735.65,465.6 735.26,465.39 				" />
											<polygon className="navas75" points="682.44,483.3 682.82,483.51 724.91,459.74 724.53,459.53 				" />
											<polygon className="navas75" points="671.85,477.39 672.22,477.6 714.22,453.91 713.85,453.7 				" />
											<polygon className="navas75" points="661.31,471.51 661.68,471.72 703.6,448.11 703.22,447.9 				" />
											<polygon className="navas75" points="650.82,465.67 651.19,465.87 693.03,442.34 692.66,442.13 				" />
										</g>
										<polygon className="navas72" points="715.16,506.43 714.96,501.44 757.3,477.43 757.56,482.37 			" />
										<polygon className="navas75" points="714.96,501.44 715.16,506.43 640.49,464.69 640.39,459.85 			" />
									</g>
									<g>
										<polygon className="navas80" points="651.81,466.22 678.56,466.35 685.03,462.7 676.17,458.16 649.55,458.05 			" />
										<polygon className="navas80" points="751.97,480.45 748.13,480.43 745.58,472.11 747.59,472.12 757.3,477.42 			" />
										<polygon className="navas80" points="686.63,446.76 684.29,438.66 686.3,438.67 701.21,446.81 			" />
										<polygon className="navas80" points="688.33,458.85 715.73,473.94 731.12,465.23 703.64,450.22 			" />
										<path className="navas80" d="M675.55,448.9c-0.14-0.14-0.29-0.33-0.44-0.58c0,0,0.18,0.03-0.03-0.05c-0.01-0.02,0.21,0.08,0.21,0.08
				c-0.03-0.07,0.16-0.05,0.14-0.11l0.06-0.23c-0.11-0.51-0.38-0.84,0.14-0.88c0.38-0.03,1.3,0.13,2.01,0.28
				c0.48,0.1,1.01,0.09,1.39-0.04c0.15-0.05,0.33-0.09,0.54-0.09c0.17-0.01,0.42,0,0.56,0.05c0.01,0,0.01,0,0.01,0
				c0.02,0.01,0.41,0.15,0.43,0.16c0.04,0.02,0.06,0.04,0.05,0.07c-0.03,0.17-0.7,0.07-0.72,0.3l0.59-0.02l0.04,0l0,0l1.31-0.04l0,0
				l0.02,0l3.53-0.1l2.02-0.06c0.52-0.18,0.46-0.21,0.46-0.21s1.23,0.01,1.55-0.01c-0.12-0.18,0.51-0.22,0.69-0.08
				c0.14,0.11,0.11,0.24-0.22,0.36c-0.07,0.03-0.2,0.06-0.36,0.09l0.04,0.03c0.04,0,0.08,0.02,0.1,0.03l0,0
				c0.03,0.03,0.01,0.06-0.04,0.07c-0.06,0.01-0.12,0-0.16-0.03l0,0c-0.02-0.02-0.02-0.04,0-0.05l-0.03-0.03
				c-0.11,0.02-0.24,0.05-0.37,0.07l0.03,0.02c0.04,0,0.08,0.02,0.1,0.03l0,0c0.03,0.03,0.01,0.06-0.04,0.07
				c-0.06,0.01-0.12,0-0.16-0.03l0,0c-0.02-0.02-0.02-0.04,0-0.05l-0.03-0.02c-0.12,0.02-0.23,0.04-0.34,0.06l0.03,0.02
				c0.04,0,0.08,0.02,0.1,0.03l0,0c0.03,0.03,0.01,0.06-0.04,0.07c-0.06,0.01-0.12,0-0.15-0.03l0,0c-0.02-0.02-0.02-0.04,0-0.05
				l-0.03-0.02c-0.13,0.02-0.25,0.04-0.34,0.06l0.03,0.03c0.04,0,0.08,0.02,0.1,0.03l0,0c0.03,0.03,0.01,0.06-0.04,0.07
				s-0.12,0-0.15-0.03l0,0c-0.02-0.02-0.02-0.04,0-0.05l-0.03-0.03c-0.07,0.01-0.12,0.02-0.12,0.02l-0.15-0.06l-2.3,0.09
				c0,0-0.01,0-0.01,0l0,0l-0.01,0c0,0-0.01,0-0.01,0l-4.63,0.53c0,0,0.01,0.01,0.01,0.01c0.01,0.02,0.02,0.03,0.04,0.05
				c0.33,0.06,0.73,0.07,0.85,0.11c0,0,0,0,0,0c0.02,0,0.4,0.14,0.4,0.15c0.04,0.02,0.01,0.06-0.12,0.11
				c-0.92,0.37-1.69-0.06-2.19-0.07c-0.44-0.01-0.86,0.04-1.21,0.14c-0.39,0.11-0.92,0.25-1.32,0.28l0.01,0c0.01,0,0.01,0,0.02,0.01
				l0,0l0,0c0.04,0.02,0.08,0.04,0.1,0.06c0.05,0.06,0,0.12-0.1,0.13c-0.05,0.01-0.11,0-0.16-0.02l0,0L675.55,448.9z"/>
										<path className="navas80" d="M726.76,478.74c-0.01-0.02,0.19,0.07,0.19,0.07c-0.03-0.06,0.14-0.04,0.12-0.1l0.05-0.2
				c-0.1-0.45-0.34-0.74,0.11-0.78c0.34-0.03,1.14,0.12,1.76,0.25c0.43,0.09,0.88,0.08,1.22-0.03c0.13-0.04,0.28-0.07,0.47-0.08
				c0.15,0,0.37,0,0.49,0.04c0,0,0.01,0,0.01,0c0.02,0.01,0.36,0.13,0.37,0.14c0.03,0.02,0.05,0.04,0.05,0.06
				c-0.02,0.15-0.61,0.06-0.63,0.26l0.51-0.01l0.03,0l1.15-0.03l0.02,0l1.3-0.03c0.03-0.04,0.06-0.09,0.09-0.13l0.26-0.3
				c0.58-0.58,1.2-0.69,1.6-0.73c0.57-0.06,1.27,0.55,1.46,0.52c0.2-0.02,0.74-0.26,1.28-0.28c0.14,0,0.25,0.04,0.33,0.11
				c0,0,0,0,0.01,0c0,0,0.01,0.01,0.03,0.03c0.01,0.02,0.03,0.04,0.04,0.06c0.06,0.09,0.16,0.23,0.24,0.34
				c0.12-0.07,0.45-0.07,0.58,0.03c0.12,0.09,0.1,0.19-0.13,0.29l0.26,0l0.05,0l0.62-0.01l0.02,0l0.74-0.01l0.02,0l-2.06,0.92
				c0,0,0,0.01-0.01,0.01c-0.01,0.03-0.02,0.05-0.04,0.08l-0.01,0c-0.35,0.61-0.94,1.14-1.44,1.17c-0.54,0.03-0.87-0.17-1.05-0.18
				c-0.18-0.01-1.51,0.69-2.05,0.68c-0.29-0.01-0.66-0.04-0.85-0.3c0-0.01-0.06-0.09-0.14-0.2c-0.04,0-0.37-1.02-0.37-1.02
				c0.03-0.15,0.08-0.32,0.16-0.52l-1.84,0.21c0,0,0.01,0.01,0.01,0.01c0.01,0.02,0.02,0.03,0.03,0.04c0.29,0.05,0.64,0.06,0.74,0.1
				c0,0,0,0,0,0c0.01,0,0.35,0.13,0.36,0.13c0.04,0.02,0.01,0.05-0.11,0.1c-0.81,0.32-1.48-0.06-1.92-0.07
				c-0.39-0.01-0.75,0.03-1.06,0.12c-0.34,0.1-0.8,0.22-1.15,0.25l0.01,0c0.01,0,0.01,0,0.02,0.01l0,0l0,0
				c0.04,0.01,0.07,0.03,0.09,0.06c0.04,0.05,0,0.1-0.09,0.11c-0.05,0.01-0.1,0-0.14-0.02l0,0l-1.43-0.65
				c-0.13-0.13-0.26-0.29-0.39-0.51C726.79,478.79,726.95,478.81,726.76,478.74z"/>
										<path className="navas80" d="M696.51,481.12c0.02,0.63,1.14,1.15,2.51,1.16c1.36,0.01,2.45-0.5,2.42-1.13
				c-0.02-0.63-1.15-1.15-2.51-1.16C697.57,479.99,696.49,480.49,696.51,481.12z"/>
										<path className="navas80" d="M684.09,474.27c0.02,0.63,1.14,1.14,2.49,1.15c1.36,0.01,2.44-0.49,2.42-1.12
				c-0.02-0.63-1.14-1.14-2.49-1.15C685.15,473.14,684.07,473.64,684.09,474.27z"/>
										<path className="navas80" d="M681.5,453.33c0.04,1.15,2.09,2.09,4.59,2.1c2.5,0.01,4.5-0.92,4.46-2.07c-0.04-1.15-2.1-2.09-4.59-2.1
				C683.46,451.26,681.47,452.18,681.5,453.33z"/>
									</g>
									<g>
										<polygon className="navas81" points="685.66,457.1 713.01,472.16 728.4,463.47 700.96,448.48 			" />
										<polygon className="navas80" points="693.14,455.52 710.93,465.3 720.93,459.65 703.1,449.91 			" />
										<polygon className="navas72" points="713.09,473.96 713.01,472.16 728.4,463.47 728.48,465.26 			" />
										<polygon className="navas75" points="713.01,472.16 713.09,473.96 685.71,458.87 685.65,457.1 			" />
									</g>
									<g>
										<g>
											<g>
												<g>
													<path className="navas82" d="M709.73,455.28c0.04-0.13,0.15-0.25,0.32-0.35c0.24-0.13,0.55-0.2,0.86-0.2l0.05,1.37
							c-0.32,0-0.63-0.07-0.88-0.2c-0.25-0.13-0.37-0.31-0.38-0.48h0l0,0v0l0-0.08L709.73,455.28z"/>
													<path className="navas83" d="M711.81,454.94c0.19,0.1,0.3,0.23,0.35,0.36l0.02,0.05l0,0.08h0c0.01,0.17-0.11,0.35-0.34,0.48
							c-0.24,0.13-0.55,0.2-0.87,0.2l-0.05-1.37C711.24,454.73,711.56,454.8,711.81,454.94z"/>
													<path className="navas82" d="M711.8,454.86c0.49,0.27,0.51,0.7,0.04,0.97c-0.24,0.13-0.55,0.2-0.86,0.2l-0.04-0.97L711.8,454.86z" />
													<path className="navas77" d="M711.8,454.86l-0.86,0.2l-0.88-0.21C710.53,454.59,711.31,454.59,711.8,454.86z" />
													<path className="navas79" d="M710.06,454.85l0.88,0.21l0.04,0.97c-0.32,0-0.63-0.07-0.88-0.2
							C709.6,455.55,709.59,455.12,710.06,454.85z"/>
												</g>
												<g>
													<path className="navas82" d="M710.8,451.65l0.14,3.54c-0.05,0-0.09-0.01-0.13-0.03c-0.04-0.02-0.06-0.05-0.06-0.07l-0.14-3.44
							L710.8,451.65z"/>
													<path className="navas83" d="M710.98,451.65l0.14,3.44l0,0c0,0.03-0.02,0.05-0.05,0.07c-0.04,0.02-0.08,0.03-0.13,0.03l-0.14-3.54
							L710.98,451.65z"/>
												</g>
												<g>
													<path className="navas84" d="M712,450.8c0.29,0.16,0.25,0.36,0.25,0.56c0.01,0.21-0.13,0.42-0.41,0.57
							c-0.56,0.32-1.49,0.31-2.07-0.01c-0.29-0.16-0.44-0.37-0.45-0.58c-0.01-0.21-0.07-0.43,0.21-0.58
							C710.09,450.46,711.42,450.48,712,450.8z"/>
													<path className="navas85" d="M711.99,450.57c0.29,0.16,0.25,0.36,0.25,0.56c0.01,0.21-0.13,0.42-0.41,0.57
							c-0.56,0.32-1.49,0.31-2.07-0.01c-0.29-0.16-0.44-0.37-0.45-0.58c-0.01-0.21-0.07-0.43,0.21-0.58
							C710.08,450.23,711.41,450.25,711.99,450.57z"/>
													<path className="navas86" d="M711.78,450.33c0.59,0.32,0.61,0.83,0.05,1.15c-0.56,0.32-1.49,0.31-2.07-0.01
							c-0.59-0.32-0.61-0.83-0.05-1.15C710.27,450.01,711.2,450.01,711.78,450.33z"/>
												</g>
											</g>
											<g>
												<path className="navas87" d="M710,443.02c0.01,0.03-0.02,0.07-0.08,0.09c-0.03,0.01-0.05,0.01-0.07,0.01l-2.57,1.33l-0.12-0.17
						l2.64-1.23c0.01-0.02,0.04-0.04,0.07-0.05C709.93,442.99,709.99,442.99,710,443.02z"/>
												<path className="navas88" d="M707.12,444.75l-0.18-0.34l0.07-0.34l0.62-0.25l0.32,0.27l-0.21,0.44l0.05,1.85
						c0.45-0.39,1.78-0.93,1.78-0.93s0.73,0.78-0.07,1.22c-0.8,0.44-1.74,0.97-2.33,0.76c-0.19-0.07-0.21-0.29-0.25-0.48
						C706.78,446.33,707.12,444.75,707.12,444.75z"/>
												<path className="navas84" d="M706.85,455.49c0.2-0.19,1.21-0.39,1.21-0.39c0.06,0.13,0.12,0.28,0.1,0.43
						c0.03,0.03,0.03,0.07,0.01,0.12c-0.12,0.31-0.58,0.33-0.71,0.36s-0.18,0.09-0.35,0.18c-0.17,0.09-0.4,0.12-0.54,0.09
						c-0.14-0.02-0.18-0.14-0.17-0.17l0,0C706.34,455.95,706.62,455.7,706.85,455.49z"/>
												<path className="navas84" d="M708.39,456.23c0.2-0.19,1.21-0.39,1.21-0.39c0.06,0.13,0.12,0.28,0.1,0.43
						c0.03,0.03,0.03,0.07,0.01,0.12c-0.12,0.31-0.59,0.33-0.71,0.36c-0.12,0.02-0.18,0.09-0.35,0.18c-0.17,0.09-0.4,0.12-0.54,0.09
						c-0.14-0.02-0.18-0.14-0.17-0.17l0,0C707.88,456.69,708.16,456.45,708.39,456.23z"/>
												<path className="navas89" d="M710.28,448.93l0.81,0.06l-0.37,2l-2.56,1.79l-0.08,2.09c0.01,0.28-0.16,0.53-0.44,0.63l-0.07,0.02
						l-0.08,0.03c-0.22,0.07-0.45-0.08-0.47-0.3l-0.15-2.5c-0.03-0.49,0.17-0.96,0.55-1.27l2.18-1.59L710.28,448.93z"/>
												<path className="navas83" d="M709.74,448.61c0.2-0.09,1.58,0.44,1.95,1.12l0.18-0.08l0.74-0.04c0,0,0.23,1.33-0.28,2.26
						c-0.34,0.63-1.32,0.97-2.67,1.52c0.03,0.74,0.01,2.2,0.01,2.2c0.01,0.28-0.16,0.53-0.44,0.63l-0.07,0.02l-0.08,0.03
						c-0.22,0.07-0.45-0.08-0.47-0.3l-0.32-3.01c-0.03-0.24,0.07-0.48,0.27-0.63c0.47-0.37,1.72-1.19,1.85-1.3
						c0.36-0.29,0.13-0.62,0.11-1.07C710.49,449.24,709.5,448.72,709.74,448.61z"/>
												<g>
													<path className="navas88" d="M710.24,444.94c0.04,0.17,0.06,0.34,0.08,0.46c-0.16,0.07-0.22,0.23-0.22,0.23s-0.26,1.13,0,1.2
							c0.35,0.1,1.48-0.87,1.39-0.98c-0.29-0.36,0.02-1.31,0.02-1.31L710.24,444.94z"/>
													<path className="navas90" d="M711.42,445.72c-0.13,0.28-1.11,0.81-1.24,1.03c-0.05-0.93,0.04-1.26,0.14-1.35
							c-0.26-0.06-0.48-0.07-0.6-0.02c-0.16,0.08-0.36,0.18-0.43,0.31l0,0c-0.1,0.12,0.13,1.25,0.16,1.8
							c0.03,0.53-0.11,2.89,0.05,2.98c0.36,0.19,1.35,0.77,2.09,1.02c0.33,0.11,0.68,0,0.91-0.12c0.14-0.07,0.15-0.5,0.17-0.66
							c0.08-0.55,0.36-2.94-0.08-4.24C712.47,446.09,711.47,445.73,711.42,445.72z"/>
													<path className="navas91" d="M710.28,445.17c0.01,0.07-0.12,0.66-0.11,0.72c0.25,0.07,1.14-0.35,1.21-0.72
							c0.04-0.32,0.13-0.62,0.13-0.62l-1.27,0.39c0.01,0.07,0.03,0.14,0.04,0.21C710.28,445.15,710.28,445.16,710.28,445.17z"/>
													<path className="navas88" d="M710.63,443.38c-0.41,0.04-0.91,0.08-1.21,0.78c-0.03,0.07,0,0.23,0.03,0.41
							c0.01,0.06,0.09,0.15,0.09,0.21c0,0.01,0,0.02,0,0.03c-0.1,0.31,0.32,0.95,0.44,0.99c0.29,0.09,1.56-0.35,1.52-1.25
							C711.47,443.94,711.04,443.34,710.63,443.38z"/>
												</g>
												<path className="navas84" d="M709.41,444.26c0,0,0.9,0.41,0.68,1.83c0,0,0.64-0.34,0.68-1.1c0,0,0.43,0.34,0.36,0.91
						c0,0,0.37-0.8,0.34-1.01c0,0,0.17,0.49,0.1,0.89c0,0,0.39-1.29-0.01-2.11C711.15,442.84,709.39,443.04,709.41,444.26z"/>
												<path className="navas88" d="M712.48,446.23c0.63,0.45,0.99,2.85,0.99,2.85l-0.03,0.52c0,0-1.2,1.86-1.95,2.09l-0.08-0.64l1.14-1.8
						c0,0-0.63-1.11-0.81-1.93C711.55,446.48,712.08,445.94,712.48,446.23z"/>
												<path className="navas87" d="M710.06,448.65c0.03-0.01,0.07,0.04,0.09,0.1c0.01,0.03,0.01,0.05,0.01,0.07l1.11,2.7l-0.18,0.08
						l-0.99-2.75c-0.02-0.02-0.04-0.04-0.05-0.08C710.02,448.71,710.03,448.66,710.06,448.65z"/>
												<polygon className="navas88" points="711.41,451.04 711.17,450.89 710.72,451.07 710.93,451.79 711.34,451.89 711.49,451.68 					" />
											</g>
										</g>
										<g>
											<g>
												<g>
													<path className="navas79" d="M704.95,455.32c0.05,0,0.09-0.03,0.1-0.08c0.01-0.05-0.03-0.1-0.08-0.12l-1.98-0.43l-0.25-6.55
							c0-0.05-0.05-0.1-0.1-0.1c-0.06,0-0.1,0.04-0.1,0.1l0.25,6.71l2.14,0.46C704.94,455.32,704.95,455.32,704.95,455.32z"/>
												</g>
												<g>
													<path className="navas79" d="M700.88,455.31c0.01,0,0.01,0,0.02,0l2.02-0.43c0.05-0.01,0.09-0.06,0.07-0.12
							c-0.01-0.05-0.07-0.09-0.12-0.07l-2.02,0.43c-0.05,0.01-0.09,0.06-0.07,0.12C700.79,455.28,700.83,455.31,700.88,455.31z"/>
												</g>
												<g>
													<path className="navas79" d="M702.96,456.41c0.06,0,0.1-0.04,0.1-0.1l-0.06-1.54c0-0.05-0.05-0.1-0.1-0.1s-0.1,0.04-0.1,0.1
							l0.06,1.54C702.85,456.37,702.9,456.41,702.96,456.41z"/>
												</g>
											</g>
											<path className="navas92" d="M701,446.23c-0.85,0.48-0.82,1.26,0.07,1.74c0.89,0.48,2.29,0.49,3.14,0.01c0.85-0.48,0.82-1.26-0.07-1.74
					C703.26,445.76,701.85,445.76,701,446.23z"/>
											<path className="navas93" d="M702.46,447.03c-0.08,0.04-0.08,0.12,0.01,0.16c0.08,0.04,0.21,0.05,0.29,0c0.08-0.04,0.08-0.12-0.01-0.16
					C702.66,446.99,702.53,446.98,702.46,447.03z"/>
											<g>
												<path className="navas79" d="M702.61,447.15c0.06,0,0.1-0.04,0.1-0.1l-0.02-0.51c0-0.05-0.05-0.1-0.1-0.1c-0.06,0-0.1,0.04-0.1,0.1
						l0.02,0.51C702.5,447.11,702.55,447.15,702.61,447.15z"/>
											</g>
										</g>
										<g>
											<path className="navas84" d="M704.92,450.88l-0.05-1.23l3.84,0.01l0.05,1.23c0.01,0.27-0.17,0.54-0.53,0.75
					c-0.73,0.41-1.95,0.41-2.71-0.01C705.13,451.42,704.93,451.15,704.92,450.88z"/>
											<path className="navas84" d="M705.4,448.89c-0.73,0.41-0.71,1.09,0.06,1.5c0.77,0.42,1.98,0.42,2.71,0.01c0.73-0.41,0.71-1.09-0.06-1.5
					C707.35,448.48,706.14,448.48,705.4,448.89z"/>
											<path className="navas94" d="M705.5,448.95c-0.68,0.38-0.66,1.01,0.05,1.4c0.71,0.39,1.84,0.39,2.52,0.01c0.68-0.38,0.66-1.01-0.06-1.4
					C707.31,448.57,706.18,448.56,705.5,448.95z"/>
											<g>
												<path className="navas81" d="M708.26,451.64c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.23c0-0.02-0.02-0.04-0.04-0.04
						c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.23C708.22,451.63,708.24,451.64,708.26,451.64z"/>
											</g>
											<g>
												<path className="navas81" d="M707.27,451.99c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.23c0-0.02-0.02-0.04-0.04-0.04
						c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.23C707.23,451.97,707.25,451.99,707.27,451.99z"/>
											</g>
											<g>
												<path className="navas81" d="M706,451.85c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.23c0-0.02-0.02-0.04-0.04-0.04
						c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.23C705.96,451.83,705.98,451.85,706,451.85z"/>
											</g>
											<g>
												<path className="navas81" d="M705.12,451.36c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.23c0-0.02-0.02-0.04-0.04-0.04
						c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.23C705.08,451.34,705.09,451.36,705.12,451.36z"/>
											</g>
											<path className="navas81" d="M705.5,451.47c0.77,0.42,1.98,0.42,2.71,0.01c0.37-0.21,0.54-0.48,0.53-0.75l0.01,0.16
					c0.01,0.27-0.17,0.54-0.53,0.75c-0.73,0.41-1.95,0.41-2.71-0.01c-0.38-0.21-0.58-0.48-0.59-0.75l-0.01-0.16
					C704.92,450.98,705.12,451.26,705.5,451.47z"/>
											<path className="navas81" d="M705.46,450.4c0.77,0.42,1.98,0.42,2.71,0.01c0.37-0.21,0.54-0.48,0.53-0.75l0.01,0.16
					c0.01,0.27-0.17,0.54-0.53,0.75c-0.73,0.41-1.95,0.41-2.71-0.01c-0.38-0.21-0.58-0.48-0.59-0.75l-0.01-0.16
					C704.88,449.92,705.08,450.19,705.46,450.4z"/>
										</g>
										<g>
											<g>
												<g>
													<path className="navas79" d="M713.84,457.97c0.04,0,0.07-0.02,0.07-0.06c0.01-0.04-0.02-0.08-0.06-0.09l-1.5-0.33l-0.12-2.89
							c0-0.04-0.04-0.07-0.08-0.07s-0.08,0.03-0.07,0.07l0.12,3.01l1.62,0.35C713.83,457.97,713.83,457.97,713.84,457.97z"/>
												</g>
												<g>
													<path className="navas79" d="M710.75,457.96c0.01,0,0.01,0,0.02,0l1.53-0.33c0.04-0.01,0.07-0.05,0.05-0.09
							c-0.01-0.04-0.05-0.06-0.09-0.06l-1.53,0.33c-0.04,0.01-0.07,0.05-0.05,0.09C710.69,457.93,710.72,457.96,710.75,457.96z"/>
												</g>
												<g>
													<path className="navas79" d="M712.33,458.79c0.04,0,0.08-0.03,0.07-0.07l-0.05-1.16c0-0.04-0.04-0.07-0.08-0.07
							c-0.04,0-0.08,0.03-0.07,0.07l0.05,1.16C712.25,458.76,712.29,458.79,712.33,458.79z"/>
												</g>
											</g>
											<g>
												<path className="navas84" d="M710.41,454.39l-0.05-1.16l3.62,0.01l0.05,1.17c0.01,0.26-0.16,0.51-0.5,0.71
						c-0.69,0.39-1.84,0.39-2.56-0.01C710.61,454.91,710.42,454.65,710.41,454.39z"/>
												<path className="navas84" d="M710.87,452.52c-0.69,0.39-0.67,1.03,0.06,1.42c0.72,0.4,1.87,0.4,2.56,0.01
						c0.69-0.39,0.67-1.03-0.06-1.42C712.7,452.13,711.56,452.13,710.87,452.52z"/>
												<path className="navas81" d="M710.96,454.95c0.72,0.4,1.87,0.4,2.56,0.01c0.35-0.2,0.51-0.45,0.5-0.71l0.01,0.16
						c0.01,0.26-0.16,0.51-0.5,0.71c-0.69,0.39-1.84,0.39-2.56-0.01c-0.36-0.2-0.55-0.46-0.56-0.71l-0.01-0.15
						C710.41,454.49,710.6,454.75,710.96,454.95z"/>
												<path className="navas81" d="M710.92,453.94c0.72,0.4,1.87,0.4,2.56,0.01c0.35-0.2,0.51-0.45,0.5-0.71l0.01,0.15
						c0.01,0.26-0.16,0.51-0.5,0.71c-0.69,0.39-1.84,0.39-2.56-0.01c-0.36-0.2-0.55-0.46-0.56-0.71l-0.01-0.15
						C710.37,453.48,710.56,453.74,710.92,453.94z"/>
												<path className="navas94" d="M710.96,452.57c-0.64,0.36-0.62,0.95,0.05,1.32c0.67,0.37,1.74,0.37,2.38,0.01
						c0.64-0.36,0.62-0.95-0.05-1.32C712.67,452.21,711.6,452.21,710.96,452.57z"/>
												<g>
													<path className="navas81" d="M713.57,455.12c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.17c0-0.02-0.02-0.04-0.04-0.04
							c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.17C713.53,455.1,713.55,455.12,713.57,455.12z"/>
												</g>
												<g>
													<path className="navas81" d="M712.63,455.35c0.02,0,0.04-0.02,0.04-0.04l-0.04-1.07c0-0.02-0.02-0.04-0.04-0.04
							c-0.02,0-0.04,0.02-0.04,0.04l0.04,1.07C712.59,455.33,712.61,455.35,712.63,455.35z"/>
												</g>
												<g>
													<path className="navas81" d="M711.44,455.31c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.17c0-0.02-0.02-0.04-0.04-0.04
							c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.17C711.4,455.3,711.42,455.31,711.44,455.31z"/>
												</g>
												<g>
													<path className="navas81" d="M710.6,454.85c0.02,0,0.04-0.02,0.04-0.04l-0.05-1.17c0-0.02-0.02-0.04-0.04-0.04
							c-0.02,0-0.04,0.02-0.04,0.04l0.05,1.17C710.56,454.83,710.58,454.85,710.6,454.85z"/>
												</g>
											</g>
										</g>
										<g>
											<path className="navas83" d="M703.41,452.92l0.24-2.42l3.95,0.51l-0.23,2.42c-0.03,0.28-0.25,0.53-0.65,0.7
					c-0.81,0.33-2.06,0.17-2.79-0.36C703.55,453.5,703.38,453.19,703.41,452.92z"/>
											<path className="navas83" d="M704.3,449.8c-0.81,0.33-0.88,1.02-0.15,1.54c0.73,0.52,1.98,0.69,2.79,0.36
					c0.81-0.33,0.88-1.02,0.15-1.54C706.36,449.63,705.11,449.47,704.3,449.8z"/>
											<path className="navas81" d="M703.93,453.55c0.73,0.53,1.98,0.69,2.79,0.36c0.41-0.16,0.63-0.42,0.65-0.7l-0.02,0.21
					c-0.03,0.28-0.25,0.53-0.65,0.7c-0.81,0.33-2.06,0.17-2.79-0.36c-0.36-0.26-0.53-0.57-0.5-0.85l0.02-0.21
					C703.4,452.98,703.57,453.28,703.93,453.55z"/>
											<path className="navas81" d="M704.15,451.34c0.73,0.52,1.98,0.69,2.79,0.36c0.41-0.16,0.63-0.42,0.65-0.7l-0.02,0.21
					c-0.03,0.28-0.25,0.53-0.65,0.7c-0.81,0.33-2.06,0.17-2.79-0.36c-0.36-0.26-0.53-0.57-0.5-0.84l0.02-0.21
					C703.62,450.77,703.78,451.07,704.15,451.34z"/>
											<path className="navas94" d="M704.39,449.86c-0.76,0.3-0.82,0.94-0.14,1.43c0.68,0.49,1.84,0.64,2.6,0.33c0.76-0.3,0.82-0.95,0.14-1.43
					C706.31,449.71,705.15,449.56,704.39,449.86z"/>
											<g>
												<path className="navas81" d="M706.75,454.13c0.02,0,0.04-0.01,0.04-0.03l0.24-2.42c0-0.02-0.01-0.04-0.04-0.04
						c-0.02,0-0.04,0.01-0.05,0.03l-0.24,2.42C706.7,454.11,706.72,454.13,706.75,454.13C706.75,454.13,706.75,454.13,706.75,454.13
						z"/>
											</g>
											<g>
												<path className="navas81" d="M705.68,454.35c0.02,0,0.04-0.01,0.04-0.03l0.24-2.43c0-0.02-0.01-0.04-0.04-0.04
						c-0.02,0-0.04,0.01-0.05,0.03l-0.24,2.43C705.64,454.33,705.65,454.35,705.68,454.35
						C705.68,454.35,705.68,454.35,705.68,454.35z"/>
											</g>
											<g>
												<path className="navas81" d="M704.39,454.05c0.02,0,0.04-0.01,0.04-0.03l0.24-2.42c0-0.02-0.01-0.04-0.04-0.04
						c-0.02,0-0.04,0.01-0.05,0.03l-0.24,2.42C704.35,454.03,704.37,454.05,704.39,454.05
						C704.39,454.05,704.39,454.05,704.39,454.05z"/>
											</g>
											<g>
												<path className="navas81" d="M703.55,453.43c0.02,0,0.04-0.01,0.04-0.03l0.24-2.42c0-0.02-0.01-0.04-0.04-0.04
						c-0.02,0-0.04,0.01-0.05,0.03l-0.24,2.42C703.51,453.41,703.52,453.43,703.55,453.43
						C703.55,453.43,703.55,453.43,703.55,453.43z"/>
											</g>
										</g>
										<g>
											<g>
												<g>
													<path className="navas79" d="M710.97,459.43c0.05,0,0.09-0.03,0.1-0.08c0.01-0.05-0.03-0.11-0.08-0.12L709,458.8l-0.15-3.83
							c0-0.05-0.05-0.1-0.1-0.1s-0.1,0.04-0.1,0.1l0.16,3.98l2.14,0.47C710.95,459.43,710.96,459.43,710.97,459.43z"/>
												</g>
												<g>
													<path className="navas79" d="M706.88,459.41c0.01,0,0.01,0,0.02,0l2.03-0.43c0.05-0.01,0.09-0.06,0.07-0.12
							c-0.01-0.05-0.07-0.09-0.12-0.07l-2.03,0.43c-0.05,0.01-0.09,0.06-0.07,0.12C706.79,459.38,706.83,459.41,706.88,459.41z"/>
												</g>
												<g>
													<path className="navas79" d="M708.97,460.52c0.06,0,0.1-0.04,0.1-0.1l-0.06-1.54c0-0.05-0.05-0.1-0.11-0.1c-0.06,0-0.1,0.04-0.1,0.1
							l0.06,1.54C708.86,460.48,708.91,460.52,708.97,460.52z"/>
												</g>
											</g>
											<g>
												<path className="navas83" d="M707.25,454.8l-0.27-2.44l3.95-0.25l0.27,2.44c0.03,0.28-0.13,0.58-0.49,0.81
						c-0.72,0.48-1.98,0.56-2.79,0.18C707.51,455.35,707.28,455.08,707.25,454.8z"/>
												<path className="navas83" d="M707.47,451.54c-0.72,0.48-0.65,1.17,0.17,1.55c0.82,0.38,2.07,0.3,2.79-0.18
						c0.72-0.48,0.65-1.17-0.17-1.55C709.44,450.99,708.2,451.07,707.47,451.54z"/>
												<path className="navas81" d="M707.89,455.32c0.82,0.38,2.07,0.3,2.79-0.18c0.36-0.24,0.52-0.53,0.49-0.81l0.02,0.22
						c0.03,0.28-0.13,0.58-0.49,0.81c-0.72,0.48-1.98,0.56-2.79,0.18c-0.41-0.19-0.63-0.46-0.66-0.74l-0.02-0.22
						C707.26,454.86,707.48,455.13,707.89,455.32z"/>
												<path className="navas81" d="M707.64,453.1c0.82,0.38,2.07,0.3,2.79-0.18c0.36-0.24,0.52-0.53,0.49-0.81l0.02,0.22
						c0.03,0.28-0.13,0.57-0.49,0.81c-0.72,0.48-1.97,0.56-2.79,0.18c-0.41-0.19-0.63-0.46-0.66-0.74l-0.02-0.21
						C707.01,452.64,707.24,452.91,707.64,453.1z"/>
												<path className="navas94" d="M707.58,451.59c-0.67,0.44-0.6,1.09,0.16,1.44c0.76,0.35,1.92,0.28,2.6-0.16
						c0.67-0.44,0.6-1.09-0.16-1.44C709.41,451.07,708.25,451.15,707.58,451.59z"/>
												<g>
													<path className="navas81" d="M710.75,455.37C710.75,455.37,710.75,455.37,710.75,455.37c0.03,0,0.04-0.02,0.04-0.04l-0.27-2.44
							c0-0.02-0.03-0.04-0.05-0.04c-0.02,0-0.04,0.02-0.04,0.04l0.27,2.44C710.71,455.35,710.72,455.37,710.75,455.37z"/>
												</g>
												<g>
													<path className="navas81" d="M709.75,455.79C709.75,455.79,709.75,455.79,709.75,455.79c0.03,0,0.04-0.02,0.04-0.04l-0.27-2.44
							c0-0.02-0.02-0.03-0.05-0.04c-0.02,0-0.04,0.02-0.04,0.04l0.27,2.44C709.71,455.77,709.73,455.79,709.75,455.79z"/>
												</g>
												<g>
													<path className="navas81" d="M708.44,455.74C708.44,455.74,708.44,455.74,708.44,455.74c0.03,0,0.04-0.02,0.04-0.04l-0.27-2.44
							c0-0.02-0.02-0.03-0.05-0.04c-0.02,0-0.04,0.02-0.04,0.04l0.27,2.44C708.4,455.72,708.42,455.74,708.44,455.74z"/>
												</g>
												<g>
													<path className="navas81" d="M707.49,455.29C707.49,455.29,707.49,455.29,707.49,455.29c0.03,0,0.04-0.02,0.04-0.04l-0.27-2.44
							c0-0.02-0.02-0.04-0.05-0.04c-0.02,0-0.04,0.02-0.04,0.04l0.27,2.44C707.45,455.27,707.47,455.29,707.49,455.29z"/>
												</g>
											</g>
										</g>
										<g>
											<g>
												<path className="navas79" d="M706.07,462.49c0,0,0.01,0,0.01,0c0.06-0.01,0.09-0.05,0.08-0.11l-0.4-2.43l-3.65-1.99l-1.09,1.66
						c-0.03,0.04-0.01,0.11,0.03,0.14c0.05,0.03,0.11,0.02,0.14-0.03l0.99-1.51l3.39,1.85l0.38,2.34
						C705.97,462.45,706.02,462.49,706.07,462.49z"/>
											</g>
											<g>
												<path className="navas79" d="M707.74,461.52c0,0,0.01,0,0.01,0c0.06-0.01,0.09-0.05,0.08-0.11l-0.4-2.43l-3.65-1.98l-1.09,1.66
						c-0.03,0.04-0.01,0.11,0.03,0.14c0.05,0.03,0.11,0.02,0.14-0.03l0.99-1.51l3.39,1.84l0.38,2.34
						C707.64,461.48,707.69,461.52,707.74,461.52z"/>
											</g>
											<g>
												<path className="navas89" d="M703.38,455.65c0.06,1.48,1.2,3.28,2.56,4.02c0.64,0.35-0.74,1.52-0.32,1.32c0.02-0.01,2-1.13,2.01-1.14
						c0.44-0.24,0.69-0.76,0.66-1.51c-0.06-1.48-1.21-3.28-2.56-4.02c-0.71-0.39-1.33-0.41-1.76-0.14c-0.02,0.01-1.93,1.08-1.95,1.1
						C701.68,455.55,703.36,454.99,703.38,455.65z"/>
												<path className="navas83" d="M701.38,456.79c0.06,1.48,1.2,3.28,2.56,4.03c1.36,0.75,2.42,0.15,2.36-1.33
						c-0.06-1.48-1.2-3.28-2.56-4.02C702.37,454.72,701.32,455.31,701.38,456.79z"/>
												<path className="navas94" d="M701.54,456.88c0.05,1.38,1.12,3.06,2.39,3.76c1.27,0.7,2.25,0.14,2.2-1.24
						c-0.05-1.38-1.12-3.06-2.39-3.75C702.47,454.95,701.49,455.5,701.54,456.88z"/>
												<path className="navas81" d="M703.89,459.7c0.01,0.33,0.27,0.73,0.57,0.89c0.3,0.17,0.54,0.03,0.52-0.3
						c-0.01-0.33-0.27-0.73-0.57-0.89S703.88,459.37,703.89,459.7z"/>
												<g>
													<path className="navas81" d="M703.51,455.51c0.01,0,0.02,0,0.03-0.01l2.2-1.25c0.02-0.01,0.03-0.04,0.02-0.07
							c-0.02-0.02-0.05-0.03-0.07-0.02l-2.2,1.25c-0.02,0.01-0.03,0.04-0.02,0.07C703.48,455.5,703.49,455.51,703.51,455.51z"/>
												</g>
												<g>
													<path className="navas81" d="M704.96,456.75c0.01,0,0.02,0,0.03-0.01l2.2-1.25c0.02-0.01,0.03-0.04,0.02-0.07
							c-0.02-0.02-0.05-0.03-0.07-0.02l-2.2,1.25c-0.02,0.01-0.03,0.04-0.02,0.07C704.92,456.74,704.94,456.75,704.96,456.75z"/>
												</g>
												<g>
													<path className="navas81" d="M706.01,458.61c0.01,0,0.02,0,0.03-0.01l2.21-1.25c0.02-0.01,0.03-0.04,0.02-0.07
							c-0.01-0.02-0.05-0.03-0.07-0.02l-2.21,1.25c-0.02,0.01-0.03,0.04-0.02,0.07C705.98,458.61,705.99,458.61,706.01,458.61z"/>
												</g>
												<g>
													<path className="navas81" d="M706.05,460.49c0.01,0,0.02,0,0.03-0.01l2.21-1.26c0.02-0.01,0.03-0.04,0.02-0.07
							c-0.02-0.02-0.05-0.03-0.07-0.02l-2.21,1.26c-0.02,0.01-0.03,0.04-0.02,0.07C706.01,460.48,706.03,460.49,706.05,460.49z"/>
												</g>
												<g>
													<path className="navas81" d="M702.06,455.31c0.01,0,0.02,0,0.03-0.01l2.2-1.25c0.02-0.01,0.03-0.04,0.02-0.07
							c-0.01-0.02-0.05-0.03-0.07-0.02l-2.2,1.25c-0.02,0.01-0.03,0.04-0.02,0.07C702.02,455.3,702.04,455.31,702.06,455.31z"/>
												</g>
											</g>
										</g>
										<g>
											<g>
												<g>
													<path className="navas79" d="M717.13,459.7c0.05,0,0.09-0.03,0.1-0.08c0.01-0.05-0.03-0.11-0.08-0.12l-1.98-0.43l-0.27-6.57
							c0-0.05-0.05-0.1-0.11-0.1c-0.06,0-0.1,0.04-0.1,0.1l0.28,6.73l2.14,0.47C717.12,459.7,717.12,459.7,717.13,459.7z"/>
												</g>
												<g>
													<path className="navas79" d="M713.04,459.68c0.01,0,0.01,0,0.02,0l2.03-0.43c0.05-0.01,0.09-0.06,0.07-0.12
							c-0.01-0.05-0.07-0.09-0.12-0.07l-2.03,0.43c-0.05,0.01-0.09,0.06-0.07,0.12C712.95,459.65,712.99,459.68,713.04,459.68z"/>
												</g>
												<g>
													<path className="navas79" d="M715.13,460.79c0.06,0,0.1-0.04,0.1-0.1l-0.06-1.54c0-0.05-0.05-0.1-0.11-0.1c-0.06,0-0.1,0.04-0.1,0.1
							l0.06,1.54C715.03,460.75,715.07,460.79,715.13,460.79z"/>
												</g>
											</g>
											<path className="navas92" d="M713.13,450.58c-0.85,0.48-0.82,1.26,0.07,1.75c0.89,0.49,2.3,0.49,3.16,0.01
					c0.85-0.48,0.82-1.26-0.07-1.75C715.39,450.1,713.98,450.1,713.13,450.58z"/>
											<path className="navas93" d="M714.59,451.37c-0.08,0.04-0.08,0.12,0.01,0.16c0.08,0.04,0.21,0.05,0.29,0c0.08-0.04,0.08-0.12-0.01-0.16
					C714.8,451.33,714.67,451.33,714.59,451.37z"/>
											<g>
												<path className="navas79" d="M714.75,451.49c0.06,0,0.1-0.04,0.1-0.1l-0.02-0.52c0-0.05-0.05-0.1-0.11-0.1s-0.1,0.04-0.1,0.1
						l0.02,0.52C714.64,451.45,714.69,451.49,714.75,451.49z"/>
											</g>
										</g>
									</g>
									<g>
										<g>
											<g>
												<g className="navas95">
													<polygon className="navas81" points="710.02,486.28 710.22,485.85 699.11,480.65 698.91,481.08 						" />
												</g>
												<g className="navas96">
													<polygon className="navas97" points="709.8,486.4 710,485.96 699.14,480.88 698.94,481.31 						" />
												</g>
												<g className="navas98">
													<polygon className="navas99" points="709.57,486.51 709.78,486.08 699.18,481.11 698.98,481.54 						" />
												</g>
												<g className="navas100">
													<polygon className="navas101" points="709.35,486.63 709.55,486.19 699.22,481.34 699.02,481.77 						" />
												</g>
												<g className="navas102">
													<polygon className="navas103" points="709.13,486.74 709.33,486.31 699.26,481.58 699.05,482.01 						" />
												</g>
												<g className="navas104">
													<polygon className="navas105" points="708.9,486.86 709.11,486.42 699.29,481.81 699.09,482.24 						" />
												</g>
												<g className="navas106">
													<polygon className="navas107" points="708.68,486.97 708.88,486.54 699.33,482.04 699.13,482.47 						" />
												</g>
												<g className="navas108">
													<polygon className="navas109" points="708.46,487.09 708.66,486.65 699.37,482.27 699.17,482.71 						" />
												</g>
												<g className="navas110">
													<polygon className="navas111" points="708.24,487.2 708.44,486.77 699.41,482.51 699.2,482.94 						" />
												</g>
												<g className="navas112">
													<polygon className="navas113" points="708.01,487.32 708.21,486.88 699.44,482.74 699.24,483.17 						" />
												</g>
												<g className="navas114">
													<polygon className="navas115" points="707.79,487.43 707.99,487 699.48,482.97 699.28,483.4 						" />
												</g>
												<g className="navas116">
													<polygon className="navas117" points="707.56,487.55 707.77,487.11 699.52,483.2 699.32,483.64 						" />
												</g>
												<g className="navas118">
													<polygon className="navas119" points="707.34,487.66 707.54,487.23 699.56,483.44 699.35,483.87 						" />
												</g>
												<g className="navas120">
													<polygon className="navas121" points="707.12,487.78 707.32,487.34 699.59,483.67 699.39,484.1 						" />
												</g>
												<g className="navas122">
													<polygon className="navas123" points="706.9,487.89 707.1,487.46 699.63,483.9 699.43,484.33 						" />
												</g>
												<g className="navas124">
													<polygon className="navas125" points="706.67,488 706.88,487.57 699.67,484.13 699.47,484.57 						" />
												</g>
												<g className="navas126">
													<polygon className="navas127" points="706.45,488.12 706.65,487.69 699.71,484.37 699.5,484.8 						" />
												</g>
												<g className="navas128">
													<polygon className="navas129" points="706.22,488.23 706.43,487.8 699.74,484.6 699.54,485.03 						" />
												</g>
												<g className="navas130">
													<polygon className="navas131" points="706,488.35 706.21,487.92 699.78,484.83 699.58,485.27 						" />
												</g>
												<g className="navas132">
													<polygon className="navas133" points="705.78,488.46 705.98,488.03 699.82,485.07 699.61,485.5 						" />
												</g>
												<g className="navas134">
													<polygon className="navas135" points="705.55,488.58 705.76,488.15 699.86,485.3 699.65,485.73 						" />
												</g>
												<g className="navas136">
													<polygon className="navas137" points="705.33,488.69 705.54,488.26 699.9,485.53 699.69,485.96 						" />
												</g>
												<g className="navas138">
													<polygon className="navas139" points="705.11,488.81 705.31,488.38 699.93,485.77 699.73,486.2 						" />
												</g>
												<g className="navas140">
													<polygon className="navas141" points="704.88,488.92 705.09,488.49 699.97,486 699.76,486.43 						" />
												</g>
												<g className="navas142">
													<polygon className="navas143" points="704.66,489.04 704.87,488.61 700.01,486.23 699.8,486.66 						" />
												</g>
												<g className="navas144">
													<polygon className="navas145" points="704.44,489.15 704.65,488.72 700.05,486.46 699.84,486.9 						" />
												</g>
												<g className="navas146">
													<polygon className="navas147" points="704.21,489.27 704.42,488.84 700.08,486.7 699.87,487.13 						" />
												</g>
												<g className="navas148">
													<polygon className="navas149" points="703.99,489.38 704.2,488.95 700.12,486.93 699.91,487.36 						" />
												</g>
												<g className="navas150">
													<polygon className="navas151" points="703.77,489.49 703.98,489.07 700.16,487.17 699.95,487.59 						" />
												</g>
												<g className="navas152">
													<polygon className="navas153" points="703.54,489.61 703.75,489.18 700.2,487.4 699.99,487.83 						" />
												</g>
												<g className="navas154">
													<polygon className="navas155" points="703.32,489.72 703.53,489.3 700.24,487.63 700.02,488.06 						" />
												</g>
												<g className="navas156">
													<polygon className="navas157" points="703.09,489.84 703.31,489.41 700.28,487.87 700.06,488.29 						" />
												</g>
												<g className="navas158">

													<rect x="701.35" y="487.47" transform="matrix(0.4557 -0.8901 0.8901 0.4557 -53.4253 890.6812)" className="navas159" width="0.48" height="3.12" />
												</g>
												<g className="navas160">

													<rect x="701.26" y="487.78" transform="matrix(0.4606 -0.8876 0.8876 0.4606 -55.838 886.5142)" className="navas161" width="0.48" height="2.83" />
												</g>
												<g className="navas162">

													<rect x="701.17" y="488.1" transform="matrix(0.4664 -0.8846 0.8846 0.4664 -58.6191 881.5727)" className="navas163" width="0.48" height="2.55" />
												</g>
												<g className="navas164">

													<rect x="701.07" y="488.42" transform="matrix(0.4737 -0.8807 0.8807 0.4737 -62.0477 875.2664)" className="navas165" width="0.48" height="2.26" />
												</g>
												<g>

													<rect x="700.98" y="488.74" transform="matrix(0.4827 -0.8758 0.8758 0.4827 -66.1325 867.4899)" className="navas76" width="0.48" height="1.98" />
												</g>
											</g>
											<g>
												<g className="navas95">

													<rect x="682.57" y="465.25" transform="matrix(0.424 -0.9056 0.9056 0.424 -33.5882 889.8371)" className="navas81" width="0.48" height="12.14" />
												</g>
												<g className="navas96">

													<rect x="682.48" y="465.57" transform="matrix(0.4241 -0.9056 0.9056 0.4241 -33.8117 889.828)" className="navas97" width="0.48" height="11.86" />
												</g>
												<g className="navas98">

													<rect x="682.38" y="465.88" transform="matrix(0.4241 -0.9056 0.9056 0.4241 -34.0351 889.819)" className="navas99" width="0.48" height="11.58" />
												</g>
												<g className="navas100">

													<rect x="682.29" y="466.2" transform="matrix(0.425 -0.9052 0.9052 0.425 -34.6532 889.1326)" className="navas101" width="0.48" height="11.29" />
												</g>
												<g className="navas102">

													<rect x="682.2" y="466.51" transform="matrix(0.4259 -0.9048 0.9048 0.4259 -35.2594 888.4642)" className="navas103" width="0.47" height="11.01" />
												</g>
												<g className="navas104">

													<rect x="682.1" y="466.82" transform="matrix(0.4259 -0.9048 0.9048 0.4259 -35.4826 888.4548)" className="navas105" width="0.47" height="10.73" />
												</g>
												<g className="navas106">
													<polygon className="navas107" points="686.87,474.8 687.07,474.37 677.62,469.92 677.42,470.35 						" />
												</g>
												<g className="navas108">

													<rect x="681.92" y="467.45" transform="matrix(0.4268 -0.9043 0.9043 0.4268 -36.3187 887.7616)" className="navas109" width="0.48" height="10.16" />
												</g>
												<g className="navas110">

													<rect x="681.82" y="467.76" transform="matrix(0.4268 -0.9044 0.9044 0.4268 -36.5223 887.7857)" className="navas111" width="0.48" height="9.88" />
												</g>
												<g className="navas112">

													<rect x="681.73" y="468.08" transform="matrix(0.4276 -0.904 0.904 0.4276 -37.1189 887.1285)" className="navas113" width="0.48" height="9.6" />
												</g>
												<g className="navas114">

													<rect x="681.64" y="468.39" transform="matrix(0.4277 -0.9039 0.9039 0.4277 -37.3806 887.0515)" className="navas115" width="0.48" height="9.31" />
												</g>
												<g className="navas116">

													<rect x="681.54" y="468.7" transform="matrix(0.4285 -0.9035 0.9035 0.4285 -37.9541 886.4313)" className="navas117" width="0.48" height="9.03" />
												</g>
												<g className="navas118">

													<rect x="681.45" y="469.02" transform="matrix(0.4286 -0.9035 0.9035 0.4286 -38.1765 886.4221)" className="navas119" width="0.48" height="8.75" />
												</g>
												<g className="navas120">
													<polygon className="navas121" points="685.32,475.6 685.52,475.17 677.87,471.53 677.67,471.96 						" />
												</g>
												<g className="navas122">

													<rect x="681.26" y="469.65" transform="matrix(0.4303 -0.9027 0.9027 0.4303 -39.3723 885.0905)" className="navas123" width="0.48" height="8.18" />
												</g>
												<g className="navas124">

													<rect x="681.17" y="469.96" transform="matrix(0.4312 -0.9023 0.9023 0.4312 -39.9817 884.4014)" className="navas125" width="0.48" height="7.9" />
												</g>
												<g className="navas126">
													<polygon className="navas127" points="684.65,475.94 684.85,475.51 677.98,472.23 677.78,472.65 						" />
												</g>
												<g className="navas128">

													<rect x="680.98" y="470.59" transform="matrix(0.4321 -0.9018 0.9018 0.4321 -40.8111 883.7027)" className="navas129" width="0.48" height="7.33" />
												</g>
												<g className="navas130">

													<rect x="680.89" y="470.9" transform="matrix(0.4329 -0.9015 0.9015 0.4329 -41.3789 883.0818)" className="navas131" width="0.48" height="7.05" />
												</g>
												<g className="navas132">
													<polygon className="navas133" points="683.98,476.28 684.19,475.85 678.09,472.92 677.88,473.35 						" />
												</g>
												<g className="navas134">
													<polygon className="navas135" points="683.76,476.39 683.97,475.96 678.13,473.15 677.92,473.58 						" />
												</g>
												<g className="navas136">
													<polygon className="navas137" points="683.54,476.51 683.74,476.08 678.16,473.38 677.95,473.81 						" />
												</g>
												<g className="navas138">
													<polygon className="navas139" points="683.31,476.62 683.52,476.19 678.2,473.61 677.99,474.04 						" />
												</g>
												<g className="navas140">
													<polygon className="navas141" points="683.09,476.73 683.3,476.31 678.23,473.84 678.02,474.27 						" />
												</g>
												<g className="navas142">
													<polygon className="navas143" points="682.87,476.85 683.08,476.42 678.27,474.07 678.06,474.5 						" />
												</g>
												<g className="navas144">
													<polygon className="navas145" points="682.65,476.96 682.86,476.53 678.31,474.31 678.09,474.73 						" />
												</g>
												<g className="navas146">
													<polygon className="navas147" points="682.42,477.08 682.63,476.65 678.34,474.54 678.13,474.96 						" />
												</g>
												<g className="navas148">
													<polygon className="navas149" points="682.2,477.19 682.41,476.76 678.38,474.77 678.17,475.19 						" />
												</g>
												<g className="navas150">
													<polygon className="navas151" points="681.98,477.3 682.19,476.88 678.41,475 678.2,475.42 						" />
												</g>
												<g className="navas152">
													<polygon className="navas153" points="681.75,477.42 681.97,476.99 678.45,475.23 678.24,475.66 						" />
												</g>
												<g className="navas154">
													<polygon className="navas155" points="681.53,477.53 681.75,477.11 678.49,475.46 678.27,475.89 						" />
												</g>
												<g className="navas156">
													<polygon className="navas157" points="681.31,477.64 681.53,477.22 678.52,475.69 678.31,476.12 						" />
												</g>
												<g className="navas158">
													<polygon className="navas159" points="681.09,477.76 681.3,477.34 678.56,475.93 678.34,476.35 						" />
												</g>
												<g className="navas160">
													<polygon className="navas161" points="680.86,477.87 681.08,477.45 678.6,476.16 678.38,476.58 						" />
												</g>
												<g className="navas162">
													<polygon className="navas163" points="680.64,477.98 680.86,477.56 678.63,476.39 678.41,476.81 						" />
												</g>
												<g className="navas164">
													<polygon className="navas165" points="680.41,478.1 680.64,477.68 678.67,476.62 678.44,477.04 						" />
												</g>
												<g>
													<polygon className="navas76" points="680.19,478.21 680.42,477.79 678.71,476.85 678.48,477.27 						" />
												</g>
											</g>
											<g>
												<g className="navas95">
													<polygon className="navas81" points="667.08,462.33 667.28,461.9 656.39,456.81 656.19,457.24 						" />
												</g>
												<g className="navas96">
													<polygon className="navas97" points="666.86,462.44 667.06,462.01 656.43,457.04 656.23,457.47 						" />
												</g>
												<g className="navas98">
													<polygon className="navas99" points="666.64,462.55 666.84,462.13 656.46,457.27 656.26,457.69 						" />
												</g>
												<g className="navas100">
													<polygon className="navas101" points="666.41,462.67 666.62,462.24 656.5,457.5 656.29,457.92 						" />
												</g>
												<g className="navas102">
													<polygon className="navas103" points="666.19,462.78 666.4,462.35 656.53,457.72 656.33,458.15 						" />
												</g>
												<g className="navas104">
													<polygon className="navas105" points="665.97,462.89 666.18,462.47 656.57,457.95 656.36,458.38 						" />
												</g>
												<g className="navas106">
													<polygon className="navas107" points="665.75,463.01 665.96,462.58 656.6,458.18 656.4,458.61 						" />
												</g>
												<g className="navas108">
													<polygon className="navas109" points="665.53,463.12 665.73,462.69 656.63,458.41 656.43,458.84 						" />
												</g>
												<g className="navas110">
													<polygon className="navas111" points="665.31,463.23 665.51,462.81 656.67,458.64 656.46,459.06 						" />
												</g>
												<g className="navas112">
													<polygon className="navas113" points="665.09,463.35 665.29,462.92 656.7,458.87 656.5,459.29 						" />
												</g>
												<g className="navas114">
													<polygon className="navas115" points="664.87,463.46 665.07,463.03 656.74,459.09 656.53,459.52 						" />
												</g>
												<g className="navas116">
													<polygon className="navas117" points="664.64,463.57 664.85,463.15 656.77,459.32 656.57,459.75 						" />
												</g>
												<g className="navas118">
													<polygon className="navas119" points="664.42,463.69 664.63,463.26 656.8,459.55 656.6,459.98 						" />
												</g>
												<g className="navas120">
													<polygon className="navas121" points="664.2,463.8 664.41,463.37 656.84,459.78 656.63,460.21 						" />
												</g>
												<g className="navas122">
													<polygon className="navas123" points="663.98,463.91 664.19,463.49 656.87,460.01 656.67,460.43 						" />
												</g>
												<g className="navas124">
													<polygon className="navas125" points="663.76,464.02 663.97,463.6 656.91,460.24 656.7,460.66 						" />
												</g>
												<g className="navas126">
													<polygon className="navas127" points="663.54,464.14 663.74,463.71 656.94,460.47 656.73,460.89 						" />
												</g>
												<g className="navas128">
													<polygon className="navas129" points="663.32,464.25 663.52,463.83 656.98,460.7 656.77,461.12 						" />
												</g>
												<g className="navas130">
													<polygon className="navas131" points="663.09,464.36 663.3,463.94 657.01,460.92 656.8,461.35 						" />
												</g>
												<g className="navas132">
													<polygon className="navas133" points="662.87,464.48 663.08,464.05 657.04,461.15 656.84,461.58 						" />
												</g>
												<g className="navas134">
													<polygon className="navas135" points="662.65,464.59 662.86,464.17 657.08,461.38 656.87,461.81 						" />
												</g>
												<g className="navas136">
													<polygon className="navas137" points="662.43,464.7 662.64,464.28 657.11,461.61 656.9,462.04 						" />
												</g>
												<g className="navas138">
													<polygon className="navas139" points="662.21,464.82 662.42,464.39 657.15,461.84 656.94,462.26 						" />
												</g>
												<g className="navas140">
													<polygon className="navas141" points="661.99,464.93 662.2,464.51 657.18,462.07 656.97,462.49 						" />
												</g>
												<g className="navas142">
													<polygon className="navas143" points="661.77,465.04 661.98,464.62 657.22,462.3 657.01,462.72 						" />
												</g>
												<g className="navas144">
													<polygon className="navas145" points="661.54,465.16 661.76,464.73 657.25,462.53 657.04,462.95 						" />
												</g>
												<g className="navas146">
													<polygon className="navas147" points="661.32,465.27 661.53,464.85 657.29,462.76 657.07,463.18 						" />
												</g>
												<g className="navas148">
													<polygon className="navas149" points="661.1,465.38 661.31,464.96 657.32,462.99 657.11,463.41 						" />
												</g>
												<g className="navas150">
													<polygon className="navas151" points="660.88,465.5 661.09,465.07 657.35,463.22 657.14,463.64 						" />
												</g>
												<g className="navas152">
													<polygon className="navas153" points="660.66,465.61 660.87,465.19 657.39,463.44 657.17,463.87 						" />
												</g>
												<g className="navas154">
													<polygon className="navas155" points="660.43,465.72 660.65,465.3 657.42,463.67 657.21,464.09 						" />
												</g>
												<g className="navas156">
													<polygon className="navas157" points="660.21,465.83 660.43,465.41 657.46,463.9 657.24,464.32 						" />
												</g>
												<g className="navas158">
													<polygon className="navas159" points="659.99,465.95 660.21,465.53 657.49,464.13 657.27,464.55 						" />
												</g>
												<g className="navas160">
													<polygon className="navas161" points="659.77,466.06 659.99,465.64 657.53,464.36 657.31,464.78 						" />
												</g>
												<g className="navas162">
													<polygon className="navas163" points="659.54,466.17 659.77,465.76 657.57,464.59 657.34,465.01 						" />
												</g>
												<g className="navas164">
													<polygon className="navas165" points="659.32,466.28 659.55,465.87 657.6,464.82 657.37,465.24 						" />
												</g>
												<g>
													<polygon className="navas76" points="659.1,466.4 659.33,465.98 657.64,465.05 657.4,465.47 						" />
												</g>
											</g>
										</g>
										<g>
											<path className="navas75" d="M700.42,488.61c0.02-0.02,0.04-0.05,0.06-0.07l0-0.01l0,0c0.18-0.15,0.47-0.16,0.8,0.03
					c0.58,0.32,1.07,1.1,1.09,1.73c0.01,0.29-0.08,0.49-0.23,0.61l0,0l-2.23,1.83l-1.62-1.87L700.42,488.61z"/>
											<polygon className="navas71" points="699.87,490.64 697.83,489.5 697.92,491.93 699.96,493.07 				" />
											<polygon className="navas73" points="699.87,490.64 701.82,489.53 701.91,491.96 699.96,493.07 				" />
											<polygon className="navas72" points="699.79,488.4 701.82,489.53 699.87,490.64 697.83,489.5 				" />
										</g>
										<g>
											<path className="navas75" d="M657.61,464.77c0.02-0.02,0.04-0.05,0.06-0.06l0-0.01l0,0c0.18-0.15,0.46-0.16,0.79,0.02
					c0.57,0.31,1.04,1.08,1.05,1.7c0.01,0.28-0.08,0.49-0.23,0.6l0,0l-2.22,1.8l-1.58-1.84L657.61,464.77z"/>
											<polygon className="navas71" points="657.04,466.76 655.05,465.66 655.11,468.04 657.1,469.15 				" />
											<polygon className="navas73" points="657.04,466.76 658.98,465.67 659.04,468.06 657.1,469.15 				" />
											<polygon className="navas72" points="656.99,464.57 658.98,465.67 657.04,466.76 655.05,465.66 				" />
										</g>
										<g>
											<path className="navas75" d="M678.66,476.47c0.02-0.02,0.04-0.05,0.06-0.07l0-0.01l0,0c0.18-0.15,0.47-0.16,0.79,0.02
					c0.57,0.32,1.05,1.09,1.07,1.72c0.01,0.28-0.08,0.49-0.23,0.6l0,0l-2.23,1.82l-1.6-1.85L678.66,476.47z"/>
											<polygon className="navas71" points="678.1,478.48 676.09,477.36 676.17,479.77 678.18,480.89 				" />
											<polygon className="navas73" points="678.1,478.48 680.05,477.38 680.12,479.79 678.18,480.89 				" />
											<polygon className="navas72" points="678.04,476.26 680.05,477.38 678.1,478.48 676.09,477.36 				" />
										</g>
										<g>
											<g>
												<path className="navas73" d="M681.42,482.74c0,0,4.36-2.46,5.2-2.94c-0.75-2.93-3.99-1.82-3.99-1.82l-1.29,2.17L681.42,482.74z" />
											</g>
											<g>
												<path className="navas73" d="M687.19,485.95c0,0,4.36-2.47,5.21-2.94c-0.76-2.94-4-1.83-4-1.83l-1.29,2.17L687.19,485.95z" />
											</g>
											<g className="navas166">
												<path className="navas71" d="M687.56,485.49c0,0,3.74-2.11,4.46-2.52c-0.65-2.52-3.43-1.57-3.43-1.57l-1.1,1.86L687.56,485.49z" />
											</g>
											<polygon className="navas71" points="681.42,482.74 687.19,485.95 687.11,483.35 681.34,480.15 				" />
											<polygon className="navas75" points="688.39,481.18 682.63,477.98 681.34,480.15 687.11,483.35 				" />
											<path className="navas167" d="M691.38,481.43l-5.94-3.31c0,0-1-0.7-2.81-0.14l5.76,3.2C688.39,481.18,690.05,480.58,691.38,481.43z" />
										</g>
										<g>
											<g>
												<path className="navas73" d="M688.92,486.89c0,0,4.37-2.47,5.21-2.94c-0.76-2.94-4.01-1.83-4.01-1.83l-1.29,2.17L688.92,486.89z" />
											</g>
											<g>
												<path className="navas73" d="M694.71,490.11c0,0,4.37-2.47,5.21-2.95c-0.77-2.95-4.02-1.84-4.02-1.84l-1.29,2.18L694.71,490.11z" />
											</g>
											<g className="navas166">
												<path className="navas71" d="M695.07,489.65c0,0,3.75-2.12,4.47-2.53c-0.66-2.53-3.45-1.58-3.45-1.58l-1.1,1.87L695.07,489.65z" />
											</g>
											<polygon className="navas71" points="688.92,486.89 694.71,490.11 694.62,487.5 688.83,484.29 				" />
											<polygon className="navas75" points="695.91,485.32 690.12,482.11 688.83,484.29 694.62,487.5 				" />
											<path className="navas167" d="M698.9,485.58l-5.97-3.32c0,0-1.01-0.7-2.81-0.15l5.78,3.21C695.91,485.32,697.56,484.73,698.9,485.58z"
											/>
										</g>
										<g>
											<g>
												<path className="navas73" d="M660.21,470.92c0,0,4.34-2.45,5.18-2.92c-0.73-2.9-3.95-1.8-3.95-1.8l-1.29,2.15L660.21,470.92z" />
											</g>
											<g>
												<path className="navas73" d="M665.92,474.09c0,0,4.35-2.45,5.19-2.92c-0.74-2.91-3.96-1.81-3.96-1.81l-1.29,2.15L665.92,474.09z" />
											</g>
											<g className="navas166">
												<path className="navas71" d="M666.28,473.64c0,0,3.73-2.1,4.45-2.51c-0.63-2.49-3.4-1.55-3.4-1.55l-1.11,1.85L666.28,473.64z" />
											</g>
											<polygon className="navas71" points="660.21,470.92 665.92,474.09 665.85,471.52 660.15,468.35 				" />
											<polygon className="navas75" points="667.14,469.36 661.44,466.2 660.15,468.35 665.85,471.52 				" />
											<path className="navas167" d="M670.1,469.61l-5.88-3.27c0,0-0.99-0.69-2.78-0.14l5.7,3.16C667.14,469.36,668.79,468.77,670.1,469.61z"
											/>
										</g>
										<g>
											<g>
												<path className="navas73" d="M667.63,475.02c0,0,4.35-2.45,5.19-2.92c-0.74-2.91-3.97-1.81-3.97-1.81l-1.29,2.16L667.63,475.02z" />
											</g>
											<g>
												<path className="navas73" d="M673.36,478.21c0,0,4.35-2.46,5.19-2.93c-0.75-2.92-3.98-1.82-3.98-1.82l-1.29,2.16L673.36,478.21z" />
											</g>
											<g className="navas166">
												<path className="navas71" d="M673.72,477.75c0,0,3.73-2.11,4.45-2.51c-0.64-2.5-3.41-1.56-3.41-1.56l-1.11,1.85L673.72,477.75z" />
											</g>
											<polygon className="navas71" points="667.63,475.02 673.36,478.21 673.28,475.62 667.56,472.44 				" />
											<polygon className="navas75" points="674.57,473.46 668.85,470.29 667.56,472.44 673.28,475.62 				" />
											<path className="navas167" d="M677.54,473.71l-5.9-3.28c0,0-0.99-0.7-2.79-0.14l5.72,3.17C674.57,473.46,676.22,472.87,677.54,473.71z"
											/>
										</g>
									</g>
									<g>
										<g>
											<g>
												<polygon className="navas72" points="702.62,479.95 712.3,485.31 719.49,481.24 709.81,475.89 					" />
											</g>
											<g>
												<polygon className="navas73" points="712.9,500.26 720.12,496.16 719.49,481.24 712.3,485.31 					" />
												<polygon className="navas71" points="713.64,488.28 718.45,485.55 718.4,484.39 713.59,487.11 					" />
											</g>
											<g>
												<polygon className="navas71" points="703.18,494.84 712.9,500.26 712.3,485.31 702.62,479.95 					" />
												<g>
													<path className="navas72" d="M704.97,485.13c0.06,1.6,1.29,3.55,2.75,4.36c1.46,0.81,2.59,0.17,2.53-1.43
							c-0.06-1.6-1.3-3.55-2.75-4.36C706.04,482.89,704.91,483.53,704.97,485.13z"/>
													<path className="navas168" d="M705.13,485.21c0.06,1.5,1.22,3.34,2.59,4.1c1.37,0.76,2.44,0.16,2.38-1.35
							c-0.06-1.51-1.22-3.34-2.59-4.1C706.13,483.11,705.07,483.71,705.13,485.21z"/>
													<path className="navas73" d="M706.73,486.1c0.02,0.53,0.43,1.18,0.92,1.45c0.49,0.27,0.86,0.06,0.84-0.48
							c-0.02-0.53-0.43-1.18-0.92-1.45C707.08,485.36,706.71,485.57,706.73,486.1z"/>
													<path className="navas71" d="M706.87,486.18c0.02,0.45,0.36,1,0.77,1.23c0.41,0.23,0.73,0.05,0.71-0.4c-0.02-0.45-0.36-1-0.77-1.23
							C707.17,485.55,706.85,485.73,706.87,486.18z"/>
												</g>
												<g>
													<path className="navas72" d="M705.23,491.93c0.06,1.6,1.3,3.57,2.76,4.38c1.46,0.82,2.6,0.17,2.53-1.44
							c-0.06-1.61-1.3-3.57-2.76-4.38C706.3,489.68,705.17,490.32,705.23,491.93z"/>
													<path className="navas168" d="M705.38,492.01c0.06,1.51,1.22,3.35,2.59,4.12c1.38,0.77,2.44,0.16,2.38-1.35
							c-0.06-1.51-1.22-3.35-2.6-4.12C706.39,489.9,705.33,490.51,705.38,492.01z"/>
													<path className="navas73" d="M706.99,492.91c0.02,0.53,0.43,1.19,0.92,1.46c0.49,0.27,0.86,0.06,0.84-0.48
							c-0.02-0.53-0.43-1.19-0.92-1.46C707.35,492.16,706.97,492.37,706.99,492.91z"/>
													<path className="navas71" d="M707.13,492.98c0.02,0.45,0.36,1,0.77,1.23c0.41,0.23,0.73,0.05,0.71-0.4c-0.02-0.45-0.36-1-0.78-1.23
							C707.43,492.35,707.11,492.53,707.13,492.98z"/>
													<path className="navas72" d="M703.78,487.87c0.02,0.53,0.43,1.18,0.91,1.45c0.49,0.27,0.86,0.06,0.84-0.48
							c-0.02-0.53-0.43-1.18-0.92-1.45C704.13,487.12,703.76,487.33,703.78,487.87z"/>
													<path className="navas73" d="M703.91,487.94c0.02,0.45,0.36,1,0.77,1.23c0.41,0.23,0.73,0.05,0.71-0.4c-0.02-0.45-0.36-1-0.77-1.23
							C704.21,487.31,703.9,487.49,703.91,487.94z"/>
													<path className="navas72" d="M710.12,491.39c0.02,0.53,0.43,1.19,0.92,1.46c0.49,0.27,0.86,0.06,0.84-0.48
							c-0.02-0.53-0.43-1.19-0.92-1.46C710.47,490.64,710.1,490.86,710.12,491.39z"/>
													<path className="navas73" d="M710.26,491.47c0.02,0.45,0.37,1,0.78,1.23c0.41,0.23,0.73,0.05,0.71-0.4c-0.02-0.45-0.37-1-0.78-1.23
							C710.56,490.84,710.24,491.02,710.26,491.47z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="712.3,485.31 712.33,486.08 711.7,484.98 					" />
												<polygon className="navas77" points="712.3,485.31 712.33,486.08 712.87,484.99 					" />
												<polygon className="navas169" points="711.7,484.98 712.87,484.99 712.3,485.31 					" />
												<polygon className="navas77" points="719.49,481.24 719.53,482.16 719.08,481.47 					" />
												<polygon className="navas77" points="712.9,500.26 712.86,499.4 713.47,499.94 					" />
												<polygon className="navas77" points="720.12,496.16 719.71,496.4 720.09,495.3 					" />
												<polygon className="navas78" points="703.18,494.84 703.15,493.98 703.67,495.12 					" />
												<polygon className="navas78" points="712.86,499.4 712.9,500.26 712.37,500 					" />
												<polygon className="navas78" points="702.62,479.95 703.2,480.28 702.66,480.97 					" />
												<polygon className="navas169" points="719.08,481.47 718.79,480.85 719.49,481.24 					" />
												<polygon className="navas169" points="703.2,480.28 703.17,479.64 702.62,479.95 					" />
												<polygon className="navas169" points="709.81,475.89 710.38,476.2 709.26,476.2 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="702.06,465.04 711.69,470.34 718.86,466.29 709.22,461 					" />
											</g>
											<g>
												<polygon className="navas73" points="712.29,485.16 719.49,481.09 718.86,466.29 711.69,470.34 					" />
												<polygon className="navas71" points="713.03,473.28 717.82,470.57 717.77,469.41 712.99,472.12 					" />
											</g>
											<g>
												<polygon className="navas71" points="702.62,479.8 712.29,485.16 711.69,470.34 702.06,465.04 					" />
												<g>
													<path className="navas72" d="M704.4,470.17c0.06,1.58,1.29,3.52,2.74,4.32c1.45,0.8,2.58,0.16,2.52-1.42
							c-0.06-1.59-1.29-3.52-2.74-4.32C705.46,467.95,704.34,468.58,704.4,470.17z"/>
													<path className="navas168" d="M704.55,470.25c0.06,1.49,1.21,3.31,2.58,4.07c1.37,0.75,2.43,0.15,2.37-1.34
							c-0.06-1.49-1.21-3.31-2.58-4.06C705.56,468.17,704.5,468.76,704.55,470.25z"/>
													<path className="navas73" d="M706.15,471.13c0.02,0.53,0.43,1.17,0.91,1.44c0.48,0.27,0.86,0.05,0.84-0.47
							c-0.02-0.53-0.43-1.17-0.91-1.44C706.51,470.39,706.13,470.61,706.15,471.13z"/>
													<path className="navas71" d="M706.29,471.21c0.02,0.45,0.36,0.99,0.77,1.21c0.41,0.23,0.72,0.05,0.71-0.4
							c-0.02-0.45-0.36-0.99-0.77-1.21C706.59,470.58,706.27,470.76,706.29,471.21z"/>
												</g>
												<g>
													<path className="navas72" d="M704.66,476.91c0.06,1.59,1.29,3.54,2.74,4.34c1.46,0.81,2.59,0.17,2.52-1.43
							c-0.06-1.59-1.29-3.54-2.75-4.34C705.72,474.68,704.59,475.32,704.66,476.91z"/>
													<path className="navas168" d="M704.81,476.99c0.06,1.5,1.21,3.32,2.58,4.08c1.37,0.76,2.43,0.16,2.37-1.34
							c-0.06-1.5-1.22-3.32-2.58-4.08C705.82,474.9,704.75,475.5,704.81,476.99z"/>
													<path className="navas73" d="M706.41,477.88c0.02,0.53,0.43,1.18,0.91,1.44c0.48,0.27,0.86,0.06,0.84-0.47
							c-0.02-0.53-0.43-1.18-0.91-1.44C706.77,477.14,706.39,477.35,706.41,477.88z"/>
													<path className="navas71" d="M706.55,477.95c0.02,0.45,0.36,0.99,0.77,1.22c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.36-0.99-0.77-1.22C706.85,477.33,706.53,477.51,706.55,477.95z"/>
													<path className="navas72" d="M703.21,472.89c0.02,0.53,0.43,1.17,0.91,1.44c0.48,0.27,0.86,0.05,0.84-0.47
							c-0.02-0.53-0.43-1.17-0.91-1.44C703.57,472.15,703.19,472.36,703.21,472.89z"/>
													<path className="navas73" d="M703.35,472.96c0.02,0.45,0.36,0.99,0.77,1.22c0.41,0.23,0.72,0.05,0.71-0.4
							c-0.02-0.45-0.36-0.99-0.77-1.21C703.65,472.34,703.33,472.52,703.35,472.96z"/>
													<path className="navas72" d="M709.53,476.37c0.02,0.53,0.43,1.18,0.92,1.44c0.48,0.27,0.86,0.06,0.84-0.47
							c-0.02-0.53-0.43-1.18-0.92-1.44C709.88,475.63,709.5,475.84,709.53,476.37z"/>
													<path className="navas73" d="M709.66,476.45c0.02,0.45,0.36,0.99,0.77,1.22c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.36-0.99-0.77-1.22C709.96,475.82,709.64,476,709.66,476.45z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="711.69,470.34 711.73,471.1 711.1,470.01 					" />
												<polygon className="navas77" points="711.69,470.34 711.73,471.1 712.26,470.02 					" />
												<polygon className="navas169" points="711.1,470.01 712.26,470.02 711.69,470.34 					" />
												<polygon className="navas77" points="718.86,466.29 718.9,467.2 718.45,466.52 					" />
												<polygon className="navas77" points="712.29,485.16 712.26,484.3 712.86,484.84 					" />
												<polygon className="navas77" points="719.49,481.09 719.07,481.33 719.45,480.23 					" />
												<polygon className="navas78" points="702.62,479.8 702.58,478.95 703.19,480.14 					" />
												<polygon className="navas78" points="712.26,484.3 712.29,485.16 711.69,484.83 					" />
												<polygon className="navas78" points="702.06,465.04 702.64,465.37 702.1,466.05 					" />
												<polygon className="navas169" points="718.45,466.52 718.16,465.91 718.86,466.29 					" />
												<polygon className="navas169" points="702.64,465.37 702.61,464.73 702.06,465.04 					" />
												<polygon className="navas169" points="709.22,461 709.78,461.31 708.67,461.31 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="642.09,446.44 651.47,451.64 658.59,447.64 649.2,442.46 					" />
											</g>
											<g>
												<polygon className="navas73" points="651.81,466.22 658.95,462.2 658.59,447.64 651.47,451.64 					" />
												<polygon className="navas71" points="652.74,454.53 657.49,451.86 657.47,450.72 652.71,453.39 					" />
											</g>
											<g>
												<polygon className="navas71" points="642.39,460.97 651.81,466.22 651.47,451.64 642.09,446.44 					" />
												<g>
													<path className="navas72" d="M644.3,451.48c0.03,1.56,1.21,3.46,2.62,4.25c1.42,0.79,2.54,0.16,2.5-1.4
							c-0.03-1.56-1.21-3.46-2.62-4.24C645.39,449.3,644.27,449.93,644.3,451.48z"/>
													<path className="navas168" d="M644.46,451.57c0.03,1.47,1.13,3.25,2.46,3.99c1.33,0.74,2.38,0.15,2.35-1.32
							c-0.03-1.47-1.14-3.25-2.47-3.99C645.48,449.51,644.42,450.1,644.46,451.57z"/>
													<path className="navas73" d="M646.01,452.43c0.01,0.52,0.4,1.15,0.87,1.41c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.01-0.52-0.4-1.15-0.87-1.41C646.37,451.7,646,451.91,646.01,452.43z"/>
													<path className="navas71" d="M646.14,452.51c0.01,0.44,0.34,0.97,0.74,1.19s0.71,0.04,0.7-0.39c-0.01-0.44-0.34-0.97-0.74-1.19
							C646.45,451.89,646.13,452.07,646.14,452.51z"/>
												</g>
												<g>
													<path className="navas72" d="M644.44,458.12c0.03,1.57,1.21,3.48,2.63,4.27c1.42,0.79,2.54,0.16,2.51-1.41
							c-0.04-1.57-1.21-3.48-2.63-4.26C645.53,455.92,644.41,456.55,644.44,458.12z"/>
													<path className="navas168" d="M644.59,458.2c0.03,1.47,1.14,3.27,2.47,4.01c1.33,0.74,2.39,0.15,2.36-1.32
							c-0.03-1.47-1.14-3.27-2.47-4.01C645.62,456.14,644.56,456.73,644.59,458.2z"/>
													<path className="navas73" d="M646.15,459.07c0.01,0.52,0.4,1.16,0.87,1.42s0.84,0.05,0.83-0.47c-0.01-0.52-0.4-1.16-0.87-1.42
							C646.51,458.34,646.14,458.55,646.15,459.07z"/>
													<path className="navas71" d="M646.29,459.14c0.01,0.44,0.34,0.98,0.74,1.2c0.4,0.22,0.71,0.04,0.7-0.4c-0.01-0.44-0.34-0.98-0.74-1.2
							C646.59,458.52,646.28,458.7,646.29,459.14z"/>
													<path className="navas72" d="M643.09,454.16c0.01,0.52,0.4,1.15,0.87,1.41c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.01-0.52-0.4-1.15-0.87-1.41C643.45,453.43,643.08,453.64,643.09,454.16z"/>
													<path className="navas73" d="M643.22,454.24c0.01,0.44,0.34,0.97,0.74,1.19c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.44-0.34-0.97-0.74-1.19C643.53,453.62,643.21,453.8,643.22,454.24z"/>
													<path className="navas72" d="M649.24,457.58c0.01,0.52,0.4,1.16,0.88,1.42c0.47,0.26,0.85,0.05,0.83-0.47
							c-0.01-0.52-0.4-1.16-0.88-1.42C649.6,456.85,649.23,457.06,649.24,457.58z"/>
													<path className="navas73" d="M649.37,457.65c0.01,0.44,0.34,0.98,0.74,1.2c0.4,0.22,0.71,0.04,0.7-0.4c-0.01-0.44-0.34-0.98-0.74-1.2
							C649.68,457.04,649.36,457.21,649.37,457.65z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="651.47,451.64 651.49,452.39 650.9,451.32 					" />
												<polygon className="navas77" points="651.47,451.64 651.49,452.39 652.04,451.32 					" />
												<polygon className="navas169" points="650.9,451.32 652.04,451.32 651.47,451.64 					" />
												<polygon className="navas77" points="658.59,447.64 658.61,448.54 658.18,447.88 					" />
												<polygon className="navas77" points="651.81,466.22 651.79,465.38 652.37,465.9 					" />
												<polygon className="navas77" points="658.95,462.2 658.54,462.43 658.93,461.36 					" />
												<polygon className="navas78" points="642.39,460.97 642.37,460.13 642.87,461.23 					" />
												<polygon className="navas78" points="651.79,465.38 651.81,466.22 651.3,465.96 					" />
												<polygon className="navas78" points="642.09,446.44 642.65,446.77 642.11,447.44 					" />
												<polygon className="navas169" points="658.18,447.88 657.91,447.27 658.59,447.64 					" />
												<polygon className="navas169" points="642.65,446.77 642.64,446.14 642.09,446.44 					" />
												<polygon className="navas169" points="649.2,442.46 649.75,442.76 648.66,442.76 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="641.8,431.9 651.14,437.04 658.22,433.07 648.87,427.94 					" />
											</g>
											<g>
												<polygon className="navas73" points="651.47,451.5 658.59,447.5 658.22,433.07 651.14,437.04 					" />
												<polygon className="navas71" points="652.4,439.9 657.13,437.25 657.11,436.12 652.37,438.77 					" />
											</g>
											<g>
												<polygon className="navas71" points="642.09,446.3 651.47,451.5 651.14,437.04 641.8,431.9 					" />
												<g>
													<path className="navas72" d="M644,436.89c0.03,1.55,1.2,3.43,2.61,4.21c1.41,0.78,2.53,0.15,2.49-1.4c-0.03-1.55-1.2-3.43-2.61-4.21
							C645.08,434.73,643.97,435.35,644,436.89z"/>
													<path className="navas168" d="M644.15,436.98c0.03,1.45,1.13,3.23,2.45,3.96c1.33,0.73,2.37,0.14,2.34-1.31
							c-0.03-1.46-1.13-3.23-2.46-3.95C645.17,434.94,644.12,435.53,644.15,436.98z"/>
													<path className="navas73" d="M645.7,437.83c0.01,0.51,0.4,1.14,0.87,1.4c0.47,0.26,0.84,0.05,0.83-0.46c-0.01-0.51-0.4-1.14-0.87-1.4
							C646.06,437.11,645.69,437.32,645.7,437.83z"/>
													<path className="navas71" d="M645.83,437.9c0.01,0.43,0.34,0.96,0.73,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.34-0.96-0.73-1.18C646.13,437.29,645.82,437.47,645.83,437.9z"/>
												</g>
												<g>
													<path className="navas72" d="M644.14,443.47c0.03,1.55,1.2,3.44,2.61,4.23c1.41,0.78,2.53,0.15,2.5-1.4
							c-0.03-1.55-1.21-3.44-2.62-4.22C645.22,441.29,644.1,441.92,644.14,443.47z"/>
													<path className="navas168" d="M644.29,443.55c0.03,1.46,1.13,3.24,2.46,3.97c1.33,0.74,2.38,0.15,2.35-1.32
							c-0.03-1.46-1.13-3.24-2.46-3.97C645.31,441.51,644.26,442.1,644.29,443.55z"/>
													<path className="navas73" d="M645.84,444.41c0.01,0.52,0.4,1.15,0.87,1.41c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.01-0.52-0.4-1.15-0.87-1.41C646.2,443.69,645.83,443.89,645.84,444.41z"/>
													<path className="navas71" d="M645.97,444.48c0.01,0.44,0.34,0.97,0.73,1.19c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.44-0.34-0.97-0.73-1.19C646.28,443.87,645.96,444.05,645.97,444.48z"/>
													<path className="navas72" d="M642.79,439.55c0.01,0.51,0.4,1.14,0.87,1.4c0.47,0.26,0.84,0.05,0.83-0.46
							c-0.01-0.52-0.4-1.14-0.87-1.4C643.15,438.83,642.78,439.04,642.79,439.55z"/>
													<path className="navas73" d="M642.92,439.62c0.01,0.43,0.34,0.96,0.73,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.34-0.96-0.73-1.18C643.23,439.01,642.91,439.19,642.92,439.62z"/>
													<path className="navas72" d="M648.91,442.93c0.01,0.52,0.4,1.15,0.87,1.4c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.01-0.52-0.4-1.15-0.87-1.4C649.27,442.21,648.9,442.42,648.91,442.93z"/>
													<path className="navas73" d="M649.05,443c0.01,0.44,0.34,0.97,0.74,1.19c0.4,0.22,0.71,0.04,0.7-0.39c-0.01-0.44-0.34-0.97-0.74-1.19
							C649.35,442.39,649.04,442.57,649.05,443z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="651.14,437.04 651.16,437.79 650.56,436.72 					" />
												<polygon className="navas77" points="651.14,437.04 651.16,437.79 651.7,436.72 					" />
												<polygon className="navas169" points="650.56,436.72 651.7,436.72 651.14,437.04 					" />
												<polygon className="navas77" points="658.22,433.07 658.25,433.96 657.81,433.3 					" />
												<polygon className="navas77" points="651.47,451.5 651.45,450.66 652.03,451.18 					" />
												<polygon className="navas77" points="658.59,447.5 658.17,447.73 658.57,446.66 					" />
												<polygon className="navas78" points="642.09,446.3 642.07,445.47 642.65,446.62 					" />
												<polygon className="navas78" points="651.45,450.66 651.47,451.5 650.89,451.18 					" />
												<polygon className="navas78" points="641.8,431.9 642.35,432.22 641.82,432.88 					" />
												<polygon className="navas169" points="657.81,433.3 657.55,432.7 658.22,433.07 					" />
												<polygon className="navas169" points="642.35,432.22 642.34,431.59 641.8,431.9 					" />
												<polygon className="navas169" points="648.87,427.94 649.42,428.24 648.33,428.24 					" />
											</g>
										</g>
									</g>
									<g>
										<g>
											<g>
												<polygon className="navas72" points="737.64,460.29 747.38,465.59 754.54,461.54 744.79,456.25 					" />
											</g>
											<g>
												<polygon className="navas73" points="748.13,480.43 755.32,476.35 754.54,461.54 747.38,465.59 					" />
												<polygon className="navas71" points="748.75,468.53 753.54,465.82 753.48,464.66 748.69,467.37 					" />
											</g>
											<g>
												<polygon className="navas71" points="738.35,475.07 748.13,480.43 747.38,465.59 737.64,460.29 					" />
												<g>
													<path className="navas72" d="M740.04,465.42c0.08,1.59,1.33,3.52,2.8,4.32c1.47,0.8,2.6,0.16,2.52-1.43
							c-0.08-1.59-1.33-3.52-2.8-4.32C741.09,463.2,739.96,463.84,740.04,465.42z"/>
													<path className="navas168" d="M740.2,465.51c0.07,1.49,1.25,3.31,2.63,4.07c1.38,0.75,2.44,0.15,2.37-1.34
							c-0.07-1.49-1.25-3.31-2.63-4.06C741.18,463.42,740.13,464.02,740.2,465.51z"/>
													<path className="navas73" d="M741.81,466.39c0.03,0.53,0.44,1.17,0.93,1.44c0.49,0.27,0.86,0.05,0.84-0.47
							c-0.03-0.53-0.44-1.17-0.93-1.44C742.16,465.65,741.79,465.86,741.81,466.39z"/>
													<path className="navas71" d="M741.95,466.46c0.02,0.45,0.37,0.99,0.79,1.21c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.37-0.99-0.79-1.21C742.24,465.84,741.93,466.02,741.95,466.46z"/>
												</g>
												<g>
													<path className="navas72" d="M740.37,472.17c0.08,1.59,1.33,3.54,2.8,4.34c1.47,0.81,2.6,0.17,2.52-1.43
							c-0.08-1.59-1.34-3.54-2.81-4.34C741.42,469.94,740.29,470.58,740.37,472.17z"/>
													<path className="navas168" d="M740.52,472.26c0.07,1.5,1.25,3.33,2.64,4.08c1.39,0.76,2.45,0.16,2.37-1.34
							c-0.07-1.5-1.26-3.33-2.64-4.08C741.51,470.16,740.45,470.76,740.52,472.26z"/>
													<path className="navas73" d="M742.14,473.14c0.03,0.53,0.44,1.18,0.93,1.44c0.49,0.27,0.87,0.05,0.84-0.48
							c-0.03-0.53-0.44-1.18-0.93-1.44C742.49,472.4,742.12,472.61,742.14,473.14z"/>
													<path className="navas71" d="M742.28,473.22c0.02,0.45,0.37,0.99,0.79,1.22c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.38-0.99-0.79-1.22C742.57,472.59,742.26,472.77,742.28,473.22z"/>
													<path className="navas72" d="M738.87,468.14c0.03,0.53,0.44,1.17,0.93,1.44c0.49,0.27,0.86,0.05,0.84-0.47
							c-0.03-0.53-0.44-1.17-0.93-1.44C739.22,467.4,738.85,467.62,738.87,468.14z"/>
													<path className="navas73" d="M739.01,468.22c0.02,0.45,0.37,0.99,0.79,1.22c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.37-0.99-0.79-1.22C739.31,467.59,738.99,467.77,739.01,468.22z"/>
													<path className="navas72" d="M745.26,471.63c0.03,0.53,0.44,1.18,0.93,1.44c0.49,0.27,0.87,0.05,0.84-0.48
							c-0.03-0.53-0.45-1.18-0.94-1.44C745.61,470.89,745.23,471.1,745.26,471.63z"/>
													<path className="navas73" d="M745.4,471.71c0.02,0.45,0.38,0.99,0.79,1.22c0.41,0.23,0.73,0.05,0.71-0.4
							c-0.02-0.45-0.38-0.99-0.79-1.22C745.69,471.08,745.37,471.26,745.4,471.71z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="747.38,465.59 747.42,466.36 746.78,465.26 					" />
												<polygon className="navas77" points="747.38,465.59 747.42,466.36 747.94,465.27 					" />
												<polygon className="navas169" points="746.78,465.26 747.94,465.27 747.38,465.59 					" />
												<polygon className="navas77" points="754.54,461.54 754.59,462.45 754.13,461.77 					" />
												<polygon className="navas77" points="748.13,480.43 748.08,479.57 748.7,480.1 					" />
												<polygon className="navas77" points="755.32,476.35 754.9,476.58 755.28,475.49 					" />
												<polygon className="navas78" points="738.35,475.07 738.3,474.21 738.84,475.34 					" />
												<polygon className="navas78" points="748.08,479.57 748.13,480.43 747.6,480.16 					" />
												<polygon className="navas78" points="737.64,460.29 738.22,460.62 737.69,461.3 					" />
												<polygon className="navas169" points="754.13,461.77 753.84,461.15 754.54,461.54 					" />
												<polygon className="navas169" points="738.22,460.62 738.19,459.98 737.64,460.29 					" />
												<polygon className="navas169" points="744.79,456.25 745.36,456.56 744.25,456.55 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="736.93,445.49 746.63,450.74 753.76,446.71 744.05,441.48 					" />
											</g>
											<g>
												<polygon className="navas73" points="747.37,465.44 754.53,461.39 753.76,446.71 746.63,450.74 					" />
												<polygon className="navas71" points="748,453.65 752.76,450.96 752.7,449.81 747.94,452.5 					" />
											</g>
											<g>
												<polygon className="navas71" points="737.63,460.15 747.37,465.44 746.63,450.74 736.93,445.5 					" />
												<g>
													<path className="navas72" d="M739.32,450.58c0.08,1.57,1.32,3.49,2.78,4.28c1.46,0.79,2.59,0.16,2.51-1.42
							c-0.08-1.57-1.33-3.49-2.79-4.28C740.37,448.38,739.25,449.01,739.32,450.58z"/>
													<path className="navas168" d="M739.48,450.67c0.07,1.48,1.24,3.28,2.62,4.03c1.38,0.75,2.43,0.15,2.36-1.33
							c-0.07-1.48-1.25-3.28-2.62-4.03C740.46,448.59,739.41,449.19,739.48,450.67z"/>
													<path className="navas73" d="M741.09,451.54c0.03,0.52,0.44,1.16,0.93,1.43c0.49,0.26,0.86,0.05,0.83-0.47
							c-0.03-0.52-0.44-1.16-0.93-1.42C741.43,450.8,741.06,451.01,741.09,451.54z"/>
													<path className="navas71" d="M741.22,451.61c0.02,0.44,0.37,0.98,0.78,1.2c0.41,0.22,0.73,0.04,0.7-0.4
							c-0.02-0.44-0.37-0.98-0.78-1.2C741.52,450.99,741.2,451.17,741.22,451.61z"/>
												</g>
												<g>
													<path className="navas72" d="M739.65,457.27c0.08,1.58,1.33,3.51,2.79,4.3c1.47,0.8,2.59,0.16,2.51-1.42
							c-0.08-1.58-1.33-3.51-2.79-4.3C740.69,455.06,739.57,455.69,739.65,457.27z"/>
													<path className="navas168" d="M739.8,457.35c0.07,1.48,1.25,3.3,2.62,4.05c1.38,0.75,2.44,0.15,2.36-1.34
							c-0.07-1.49-1.25-3.3-2.63-4.04C740.79,455.27,739.73,455.87,739.8,457.35z"/>
													<path className="navas73" d="M741.41,458.23c0.03,0.53,0.44,1.17,0.93,1.43c0.49,0.26,0.86,0.05,0.84-0.47
							c-0.03-0.53-0.44-1.17-0.93-1.43C741.76,457.49,741.39,457.7,741.41,458.23z"/>
													<path className="navas71" d="M741.55,458.3c0.02,0.44,0.37,0.98,0.78,1.21c0.41,0.22,0.73,0.05,0.71-0.4
							c-0.02-0.44-0.37-0.98-0.78-1.21C741.84,457.68,741.53,457.86,741.55,458.3z"/>
													<path className="navas72" d="M738.16,453.28c0.03,0.52,0.44,1.16,0.93,1.43c0.49,0.26,0.86,0.05,0.83-0.47
							c-0.03-0.52-0.44-1.16-0.93-1.43C738.51,452.55,738.14,452.76,738.16,453.28z"/>
													<path className="navas73" d="M738.3,453.36c0.02,0.44,0.37,0.98,0.78,1.2c0.41,0.22,0.73,0.04,0.7-0.4c-0.02-0.44-0.37-0.98-0.78-1.2
							C738.59,452.74,738.28,452.91,738.3,453.36z"/>
													<path className="navas72" d="M744.52,456.73c0.03,0.53,0.44,1.17,0.93,1.43c0.49,0.26,0.86,0.05,0.84-0.47
							c-0.03-0.53-0.44-1.17-0.93-1.43C744.86,455.99,744.49,456.2,744.52,456.73z"/>
													<path className="navas73" d="M744.65,456.8c0.02,0.44,0.37,0.98,0.79,1.21c0.41,0.22,0.73,0.04,0.71-0.4
							c-0.02-0.44-0.37-0.98-0.79-1.21C744.95,456.18,744.63,456.36,744.65,456.8z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="746.63,450.74 746.67,451.5 746.03,450.41 					" />
												<polygon className="navas77" points="746.63,450.74 746.67,451.5 747.19,450.42 					" />
												<polygon className="navas169" points="746.03,450.41 747.19,450.42 746.63,450.74 					" />
												<polygon className="navas77" points="753.76,446.71 753.81,447.61 753.35,446.94 					" />
												<polygon className="navas77" points="747.37,465.44 747.33,464.59 747.94,465.12 					" />
												<polygon className="navas77" points="754.53,461.39 754.12,461.63 754.49,460.54 					" />
												<polygon className="navas78" points="737.63,460.15 737.59,459.3 738.21,460.48 					" />
												<polygon className="navas78" points="747.33,464.59 747.37,465.44 746.77,465.12 					" />
												<polygon className="navas78" points="736.93,445.5 737.51,445.82 736.98,446.5 					" />
												<polygon className="navas169" points="753.35,446.94 753.06,446.33 753.76,446.71 					" />
												<polygon className="navas169" points="737.51,445.82 737.48,445.19 736.93,445.5 					" />
												<polygon className="navas169" points="744.05,441.48 744.63,441.78 743.51,441.78 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="676.71,427.16 686.15,432.3 693.24,428.32 683.78,423.19 					" />
											</g>
											<g>
												<polygon className="navas73" points="686.63,446.76 693.75,442.76 693.24,428.32 686.15,432.3 					" />
												<polygon className="navas71" points="687.45,435.16 692.18,432.5 692.14,431.37 687.41,434.03 					" />
											</g>
											<g>
												<polygon className="navas71" points="677.15,441.57 686.63,446.76 686.15,432.3 676.71,427.16 					" />
												<g>
													<path className="navas72" d="M678.97,432.16c0.05,1.55,1.24,3.43,2.67,4.21c1.43,0.78,2.54,0.15,2.49-1.4
							c-0.05-1.55-1.25-3.43-2.67-4.21C680.04,429.99,678.93,430.61,678.97,432.16z"/>
													<path className="navas168" d="M679.13,432.24c0.05,1.45,1.17,3.23,2.51,3.96c1.34,0.73,2.39,0.14,2.34-1.32
							c-0.05-1.46-1.17-3.23-2.51-3.96C680.13,430.2,679.08,430.79,679.13,432.24z"/>
													<path className="navas73" d="M680.69,433.09c0.02,0.51,0.41,1.14,0.89,1.4c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.02-0.52-0.41-1.14-0.89-1.4C681.05,432.37,680.68,432.58,680.69,433.09z"/>
													<path className="navas71" d="M680.83,433.17c0.01,0.43,0.35,0.96,0.75,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.35-0.96-0.75-1.18C681.12,432.55,680.81,432.73,680.83,433.17z"/>
												</g>
												<g>
													<path className="navas72" d="M679.18,438.73c0.05,1.55,1.24,3.45,2.67,4.23c1.43,0.78,2.55,0.15,2.49-1.4
							c-0.05-1.55-1.25-3.45-2.67-4.22C680.24,436.56,679.13,437.18,679.18,438.73z"/>
													<path className="navas168" d="M679.33,438.82c0.05,1.46,1.17,3.24,2.51,3.98c1.34,0.74,2.39,0.14,2.35-1.32
							c-0.05-1.46-1.17-3.24-2.51-3.97C680.33,436.77,679.29,437.36,679.33,438.82z"/>
													<path className="navas73" d="M680.9,439.68c0.02,0.52,0.41,1.15,0.89,1.41c0.47,0.26,0.85,0.05,0.83-0.47
							c-0.02-0.52-0.41-1.15-0.89-1.41C681.25,438.95,680.88,439.16,680.9,439.68z"/>
													<path className="navas71" d="M681.03,439.75c0.01,0.44,0.35,0.97,0.75,1.19c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.44-0.35-0.97-0.75-1.19C681.33,439.14,681.02,439.31,681.03,439.75z"/>
													<path className="navas72" d="M677.79,434.81c0.02,0.52,0.41,1.14,0.89,1.4c0.47,0.26,0.84,0.05,0.83-0.47
							c-0.02-0.52-0.41-1.14-0.89-1.4C678.14,434.09,677.77,434.3,677.79,434.81z"/>
													<path className="navas73" d="M677.92,434.89c0.01,0.44,0.35,0.96,0.75,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.44-0.35-0.96-0.75-1.18C678.22,434.28,677.91,434.45,677.92,434.89z"/>
													<path className="navas72" d="M683.98,438.19c0.02,0.52,0.42,1.15,0.89,1.41c0.48,0.26,0.85,0.05,0.83-0.47
							c-0.02-0.52-0.42-1.15-0.89-1.41C684.33,437.47,683.96,437.68,683.98,438.19z"/>
													<path className="navas73" d="M684.11,438.27c0.01,0.44,0.35,0.97,0.75,1.19c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.44-0.35-0.97-0.75-1.19C684.41,437.65,684.1,437.83,684.11,438.27z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="686.15,432.3 686.18,433.04 685.57,431.98 					" />
												<polygon className="navas77" points="686.15,432.3 686.18,433.04 686.71,431.98 					" />
												<polygon className="navas169" points="685.57,431.98 686.71,431.98 686.15,432.3 					" />
												<polygon className="navas77" points="693.24,428.32 693.27,429.21 692.83,428.55 					" />
												<polygon className="navas77" points="686.63,446.76 686.61,445.93 687.2,446.45 					" />
												<polygon className="navas77" points="693.75,442.76 693.33,442.99 693.72,441.92 					" />
												<polygon className="navas78" points="677.15,441.57 677.13,440.74 677.63,441.83 					" />
												<polygon className="navas78" points="686.61,445.93 686.63,446.76 686.12,446.51 					" />
												<polygon className="navas78" points="676.71,427.16 677.27,427.48 676.74,428.14 					" />
												<polygon className="navas169" points="692.83,428.55 692.55,427.95 693.24,428.32 					" />
												<polygon className="navas169" points="677.27,427.48 677.25,426.85 676.71,427.16 					" />
												<polygon className="navas169" points="683.78,423.19 684.34,423.49 683.25,423.49 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="676.27,412.72 685.67,417.81 692.73,413.85 683.31,408.78 					" />
											</g>
											<g>
												<polygon className="navas73" points="686.15,432.15 693.23,428.18 692.73,413.85 685.67,417.81 					" />
												<polygon className="navas71" points="686.96,420.65 691.68,418 691.64,416.88 686.93,419.53 					" />
											</g>
											<g>
												<polygon className="navas71" points="676.71,427.01 686.15,432.15 685.67,417.81 676.27,412.72 					" />
												<g>
													<path className="navas72" d="M678.52,417.68c0.05,1.53,1.24,3.4,2.65,4.17c1.42,0.77,2.53,0.15,2.48-1.39
							c-0.05-1.54-1.24-3.4-2.66-4.17C679.58,415.52,678.48,416.15,678.52,417.68z"/>
													<path className="navas168" d="M678.68,417.76c0.04,1.44,1.16,3.2,2.5,3.92c1.33,0.72,2.38,0.14,2.33-1.31
							c-0.05-1.44-1.17-3.2-2.5-3.92C679.67,415.74,678.63,416.32,678.68,417.76z"/>
													<path className="navas73" d="M680.23,418.61c0.02,0.51,0.41,1.13,0.88,1.39s0.84,0.05,0.82-0.46c-0.02-0.51-0.41-1.13-0.88-1.39
							C680.59,417.89,680.22,418.09,680.23,418.61z"/>
													<path className="navas71" d="M680.37,418.68c0.01,0.43,0.35,0.96,0.75,1.17c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.35-0.96-0.75-1.17C680.67,418.07,680.35,418.25,680.37,418.68z"/>
												</g>
												<g>
													<path className="navas72" d="M678.73,424.2c0.05,1.54,1.24,3.42,2.66,4.19c1.42,0.77,2.53,0.15,2.48-1.39
							c-0.05-1.54-1.24-3.42-2.66-4.19C679.79,422.04,678.68,422.66,678.73,424.2z"/>
													<path className="navas168" d="M678.88,424.29c0.05,1.45,1.16,3.21,2.5,3.94c1.34,0.73,2.38,0.14,2.34-1.31
							c-0.05-1.45-1.17-3.21-2.5-3.94C679.88,422.25,678.83,422.84,678.88,424.29z"/>
													<path className="navas73" d="M680.44,425.13c0.02,0.51,0.41,1.14,0.89,1.39c0.47,0.26,0.84,0.05,0.83-0.46
							c-0.02-0.51-0.41-1.14-0.89-1.39C680.79,424.41,680.42,424.62,680.44,425.13z"/>
													<path className="navas71" d="M680.57,425.21c0.01,0.43,0.35,0.96,0.75,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.35-0.96-0.75-1.18C680.87,424.6,680.56,424.77,680.57,425.21z"/>
													<path className="navas72" d="M677.34,420.32c0.02,0.51,0.41,1.13,0.88,1.39c0.47,0.26,0.84,0.05,0.83-0.46
							c-0.02-0.51-0.41-1.13-0.88-1.39C677.69,419.6,677.33,419.81,677.34,420.32z"/>
													<path className="navas73" d="M677.47,420.39c0.01,0.43,0.35,0.96,0.74,1.17c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.35-0.96-0.74-1.17C677.77,419.78,677.46,419.96,677.47,420.39z"/>
													<path className="navas72" d="M683.5,423.66c0.02,0.51,0.41,1.14,0.89,1.39c0.47,0.26,0.84,0.05,0.83-0.46
							c-0.02-0.51-0.41-1.14-0.89-1.39C683.86,422.94,683.49,423.15,683.5,423.66z"/>
													<path className="navas73" d="M683.64,423.73c0.01,0.43,0.35,0.96,0.75,1.18c0.4,0.22,0.71,0.04,0.7-0.39
							c-0.01-0.43-0.35-0.96-0.75-1.18C683.93,423.12,683.62,423.3,683.64,423.73z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="685.67,417.81 685.7,418.55 685.09,417.5 					" />
												<polygon className="navas77" points="685.67,417.81 685.7,418.55 686.23,417.5 					" />
												<polygon className="navas169" points="685.09,417.5 686.23,417.5 685.67,417.81 					" />
												<polygon className="navas77" points="692.73,413.85 692.76,414.74 692.32,414.08 					" />
												<polygon className="navas77" points="686.15,432.15 686.12,431.32 686.71,431.84 					" />
												<polygon className="navas77" points="693.23,428.18 692.82,428.41 693.2,427.35 					" />
												<polygon className="navas78" points="676.71,427.01 676.68,426.19 677.27,427.34 					" />
												<polygon className="navas78" points="686.12,431.32 686.15,432.15 685.57,431.84 					" />
												<polygon className="navas78" points="676.27,412.72 676.83,413.04 676.3,413.7 					" />
												<polygon className="navas169" points="692.32,414.08 692.05,413.49 692.73,413.85 					" />
												<polygon className="navas169" points="676.83,413.04 676.81,412.42 676.27,412.72 					" />
												<polygon className="navas169" points="683.31,408.78 683.87,409.08 682.78,409.08 					" />
											</g>
										</g>
									</g>
									<g>
										<g>
											<g>
												<path className="navas73" d="M727.89,478.06c0,0,0.01,0,0.01-0.01l0,0v0c0.02-0.01,0.06-0.01,0.1,0.01c0.08,0.04,0.15,0.15,0.15,0.24
						c0,0.05-0.01,0.08-0.04,0.09l0,0l-1.17,0.66l-0.21-0.34L727.89,478.06z"/>
												<path className="navas71" d="M726.7,478.8c0,0.09,0.07,0.2,0.15,0.24s0.14,0.01,0.14-0.08c0-0.09-0.07-0.2-0.15-0.24
						C726.76,478.68,726.7,478.71,726.7,478.8z"/>
											</g>
											<g>
												<path className="navas73" d="M729.59,479.02c0,0,0.01,0,0.01-0.01l0,0l0,0c0.02-0.01,0.06-0.01,0.1,0.01
						c0.08,0.04,0.15,0.15,0.15,0.24c0,0.05-0.01,0.08-0.04,0.09l0,0l-1.17,0.66l-0.21-0.35L729.59,479.02z"/>
												<path className="navas71" d="M728.4,479.76c0,0.09,0.07,0.2,0.15,0.24c0.08,0.04,0.14,0.01,0.14-0.08c0-0.09-0.07-0.2-0.15-0.24
						C728.46,479.64,728.39,479.67,728.4,479.76z"/>
											</g>
											<g>
												<path className="navas73" d="M728.69,478.66c0,0,0,0.01,0,0.01l0,0h0c0,0.03,0.02,0.05,0.06,0.07c0.08,0.04,0.21,0.05,0.29,0
						c0.04-0.02,0.06-0.05,0.06-0.08h0l-0.32-7.16l-0.4,0.01L728.69,478.66z"/>
												<path className="navas71" d="M728.43,471.44c0.08-0.04,0.21-0.04,0.29,0c0.08,0.04,0.08,0.12,0.01,0.16c-0.08,0.04-0.21,0.04-0.29,0
						C728.35,471.55,728.35,471.48,728.43,471.44z"/>
											</g>
										</g>
										<g>
											<path className="navas170" d="M728.5,471.52l0.18-0.08c0,0-0.18-1.15-0.28-1.45c-0.11-0.3-0.24-0.45-0.37-0.48
					c-0.16-0.04-0.16,0.35,0.04,0.47c-0.01,0.2-0.09,0.87-0.09,0.87s0.05,0,0.2,0.47C728.34,471.79,728.5,471.52,728.5,471.52z"/>
											<path className="navas89" d="M727.37,476.33c0.17-0.22,0.2-0.6,0.06-1.03c-0.05-0.16-0.09-0.34-0.08-0.5c0.01-0.13-0.18-0.2-0.11-0.25
					c0.01-0.01,0.23-0.1,0.25-0.1c0.03,0,0.06,0.01,0.1,0.05c0.31,0.31-0.13,0.8,0.81,1.17l0.1-0.07c0.26,0.19,0.11-0.16,0.61,0.13
					c0.35,0.2,0.18-0.35,0.28-0.43c0.01-0.01,0.23-0.1,0.23-0.1c0.04,0,0.08,0.06,0.14,0.23c0.42,1.12-0.21,1.12-0.26,1.47
					c-0.04,0.3-0.01,0.67,0.1,1.04c0.14,0.47,0.31,1.12,0.28,1.41c-0.02,0.2-0.06,0.35-0.18,0.41c-0.01,0.01-0.21,0.1-0.23,0.1
					c-0.19,0.04-0.37-0.17-1.06-0.58c0,0-0.05-0.03-0.08-0.05c-0.02-0.02-0.08-0.05-0.08-0.05c-1.28-0.88-1.41-1.26-1.43-1.78
					C726.82,477.09,727.12,476.65,727.37,476.33z"/>
											<path className="navas83" d="M727.15,476.43c0.17-0.22,0.2-0.6,0.06-1.03c-0.05-0.16-0.09-0.34-0.08-0.5c0.01-0.19,0.07-0.47,0.24-0.29
					c0.31,0.31-0.13,0.8,0.81,1.17l0.1-0.07c0.26,0.19,0.11-0.16,0.61,0.13c0.48,0.28,0.38-1.04,0.66-0.3
					c0.42,1.12-0.21,1.12-0.26,1.47c-0.04,0.3-0.01,0.67,0.1,1.04c0.14,0.47,0.31,1.12,0.28,1.41c-0.05,0.48-0.2,0.68-1.48-0.08
					c0,0-0.05-0.03-0.08-0.05c-0.02-0.02-0.08-0.05-0.08-0.05c-1.28-0.88-1.41-1.26-1.43-1.78
					C726.6,477.19,726.89,476.75,727.15,476.43z"/>
											<path className="navas67" d="M728.82,475.96c0.12,0.1-0.03,0.2-0.06,0.47c-0.03,0.27,0.24,1.08,0.16,1.53
					c-0.08,0.45-0.93-0.44-1.15-0.54c-0.22-0.1-0.69,0.16-0.83,0c-0.14-0.16-0.11-0.58,0.29-0.95c0.4-0.38-0.1-1.22-0.05-1.59
					c0.04-0.28,0.13-0.25,0.18-0.19c0.05,0.07,0.01,0.47,0.2,0.72c0.04,0.06,0.36,0.4,0.66,0.51
					C728.51,476.03,728.73,475.88,728.82,475.96z"/>
											<polygon className="navas82" points="727.77,477.6 728.57,478.12 728.58,477.83 727.77,477.31 				" />
											<g>
												<g>
													<polygon className="navas83" points="728.34,470.02 728.51,470.07 728.5,470 728.33,469.94 						" />
													<g>
														<path className="navas82" d="M728.52,470.11L728.52,470.11c0.04,0.01,0.06-0.01,0.05-0.05l0,0c-0.01-0.04-0.04-0.08-0.07-0.09l0,0
								c-0.03-0.01-0.05,0.01-0.04,0.05l0,0C728.46,470.06,728.49,470.1,728.52,470.11z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="728.4,470.34 728.57,470.4 728.56,470.33 728.39,470.27 						" />
													<g>
														<path className="navas82" d="M728.58,470.44L728.58,470.44c0.04,0.01,0.06-0.01,0.05-0.05l0,0c-0.01-0.04-0.04-0.08-0.07-0.09l0,0
								c-0.03-0.01-0.05,0.01-0.04,0.05l0,0C728.52,470.39,728.55,470.43,728.58,470.44z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="728.46,470.67 728.63,470.73 728.61,470.65 728.45,470.6 						" />
													<g>
														<path className="navas82" d="M728.64,470.76L728.64,470.76c0.04,0.01,0.06-0.01,0.05-0.05l0,0c-0.01-0.04-0.04-0.08-0.07-0.09l0,0
								c-0.03-0.01-0.05,0.01-0.04,0.05l0,0C728.57,470.71,728.61,470.75,728.64,470.76z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="728.52,471 728.69,471.05 728.67,470.98 728.51,470.92 						" />
													<g>
														<path className="navas82" d="M728.7,471.09L728.7,471.09c0.04,0.01,0.06-0.01,0.05-0.05l0,0c-0.01-0.04-0.04-0.08-0.07-0.09l0,0
								c-0.03-0.01-0.05,0.01-0.04,0.05l0,0C728.63,471.04,728.66,471.08,728.7,471.09z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="728.58,471.32 728.74,471.38 728.73,471.3 728.56,471.25 						" />
													<g>
														<path className="navas82" d="M728.75,471.42L728.75,471.42c0.04,0.01,0.06-0.01,0.05-0.05l0,0c-0.01-0.04-0.04-0.08-0.07-0.09l0,0
								c-0.03-0.01-0.05,0.01-0.04,0.05l0,0C728.69,471.36,728.72,471.41,728.75,471.42z"/>
													</g>
												</g>
											</g>
											<g>
												<polygon className="navas82" points="728.18,471.32 728.27,471.38 728.41,471.46 728.5,471.52 728.49,476.41 728.27,476.27 
						728.14,476.18 727.93,476.05 					"/>
												<polygon className="navas83" points="728.49,474.91 728,474.6 728.01,474.54 728.49,474.85 					" />
												<polygon className="navas83" points="728.49,475.77 727.96,475.43 727.96,475.37 728.49,475.71 					" />
												<polygon className="navas83" points="728.49,473.99 728.05,473.71 728.06,473.65 728.49,473.93 					" />
												<polygon className="navas83" points="728.49,473.22 728.09,472.97 728.1,472.91 728.49,473.16 					" />
												<polygon className="navas83" points="728.5,472.39 728.14,472.16 728.14,472.1 728.5,472.33 					" />
											</g>
											<g>
												<polygon className="navas171" points="728.41,477.86 728.46,471.49 728.63,471.31 728.61,471.3 728.43,471.48 728.43,471.49 
						728.39,477.86 					"/>
											</g>
											<g>
												<polygon className="navas171" points="728.3,477.79 728.41,471.46 728.58,471 728.56,470.99 728.38,471.45 728.27,477.79 					" />
											</g>
											<g>
												<polygon className="navas171" points="727.94,477.56 728.26,471.36 728.41,470.01 728.38,470 728.24,471.36 727.91,477.56 					" />
											</g>
											<g>
												<polygon className="navas171" points="728.05,477.63 728.3,471.39 728.47,470.33 728.44,470.33 728.28,471.39 728.03,477.63 					" />
											</g>
											<g>
												<polygon className="navas171" points="728.17,477.71 728.35,471.42 728.53,470.66 728.5,470.65 728.33,471.42 728.15,477.71 					" />
											</g>
										</g>
									</g>
									<g>
										<path className="navas77" d="M678.7,369.78l0.2,6.4l75.12,39.89l-0.35-6.6L678.7,369.78z M697.5,380.15l2.54,1.34l-2.35,3.61
				L697.5,380.15z M697.28,384.9l-2.72-6.3l2.53,1.34L697.28,384.9z M703.66,383.42l2.54,1.35l-2.35,3.62L703.66,383.42z
				 M703.45,388.17l-2.73-6.31l2.54,1.35L703.45,388.17z M709.85,386.7l2.55,1.35l-2.35,3.63L709.85,386.7z M709.64,391.46
				l-2.75-6.33l2.55,1.35L709.64,391.46z M716.05,389.98l2.56,1.36l-2.35,3.64L716.05,389.98z M715.86,394.76l-2.77-6.35l2.56,1.35
				L715.86,394.76z M722.28,393.28l2.57,1.36l-2.35,3.65L722.28,393.28z M722.09,398.07l-2.79-6.36l2.57,1.36L722.09,398.07z
				 M728.52,396.58l2.58,1.36l-2.35,3.66L728.52,396.58z M728.34,401.39l-2.8-6.38l2.57,1.36L728.34,401.39z M734.79,399.9
				l2.59,1.37l-2.34,3.66L734.79,399.9z M734.61,404.72l-2.82-6.4l2.58,1.37L734.61,404.72z M741.07,403.23l2.59,1.37l-2.34,3.67
				L741.07,403.23z M740.91,408.06l-2.84-6.42l2.59,1.37L740.91,408.06z M747.37,406.57l2.6,1.38l-2.34,3.68L747.37,406.57z
				 M747.22,411.41l-2.86-6.43l2.6,1.38L747.22,411.41z M750.34,408.37l3.1,6.97l-5.63-2.99L750.34,408.37z M747.11,411.97
				l-5.61-2.98l2.53-3.97L747.11,411.97z M740.8,408.62l-5.6-2.97l2.53-3.96L740.8,408.62z M734.5,405.28l-5.58-2.96l2.53-3.95
				L734.5,405.28z M728.23,401.95l-5.56-2.95l2.54-3.94L728.23,401.95z M721.98,398.63l-5.54-2.94l2.54-3.93L721.98,398.63z
				 M715.74,395.32l-5.53-2.93l2.54-3.92L715.74,395.32z M709.53,392.02l-5.51-2.93l2.54-3.91L709.53,392.02z M703.34,388.73
				l-5.49-2.92l2.54-3.9L703.34,388.73z M697.16,385.45l-5.48-2.91l2.54-3.89L697.16,385.45z M691.52,381.84l-0.17-4.94l2.53,1.34
				L691.52,381.84z M682.3,372.11l2.52,1.33l0.16,4.93L682.3,372.11z M684.87,378.93l-5.44-2.89l2.55-3.88L684.87,378.93z
				 M685.22,373.65l2.52,1.34l-2.36,3.6L685.22,373.65z M688.09,375.4l2.91,6.78l-5.46-2.9L688.09,375.4z M688.42,375.35l2.53,1.34
				l0.17,4.94L688.42,375.35z M753.28,409.7l0.27,5.07l-2.87-6.45L753.28,409.7z M679.11,370.42l2.51,1.33l-2.36,3.59L679.11,370.42
				z"/>
										<path className="navas79" d="M678.9,376.18l-5.79,3.23l75.04,39.97l5.88-3.31L678.9,376.18z M697.33,386.39l2.54,1.35l-7.01,1.15
				L697.33,386.39z M692.46,388.67l1.93-3.85l2.54,1.35L692.46,388.67z M703.51,389.67l2.55,1.35l-7.02,1.15L703.51,389.67z
				 M698.63,391.96l1.93-3.85l2.55,1.35L698.63,391.96z M709.71,392.96l2.56,1.36l-7.04,1.15L709.71,392.96z M704.82,395.26
				l1.92-3.86l2.55,1.36L704.82,395.26z M715.92,396.27l2.57,1.36l-7.05,1.15L715.92,396.27z M711.03,398.56l1.92-3.87l2.56,1.36
				L711.03,398.56z M722.16,399.58l2.57,1.37l-7.06,1.15L722.16,399.58z M717.26,401.88l1.92-3.88l2.57,1.37L717.26,401.88z
				 M728.41,402.9l2.58,1.37l-7.08,1.15L728.41,402.9z M723.51,405.2l1.92-3.89l2.58,1.37L723.51,405.2z M734.69,406.23l2.59,1.38
				l-7.09,1.15L734.69,406.23z M729.78,408.54l1.91-3.9l2.59,1.37L729.78,408.54z M740.98,409.58l2.6,1.38l-7.1,1.15L740.98,409.58z
				 M736.06,411.89l1.91-3.91l2.59,1.38L736.06,411.89z M747.3,412.93l2.61,1.38l-7.12,1.15L747.3,412.93z M742.37,415.25l1.91-3.92
				l2.6,1.38L742.37,415.25z M750.04,414.62l-2.06,4.24l-5.63-3L750.04,414.62z M741.66,415.49l-5.61-2.99l7.67-1.24L741.66,415.49z
				 M735.35,412.14l-5.59-2.98l7.66-1.24L735.35,412.14z M729.06,408.79l-5.57-2.97l7.64-1.24L729.06,408.79z M722.8,405.45
				l-5.56-2.96l7.63-1.24L722.8,405.45z M716.55,402.12l-5.54-2.95l7.61-1.24L716.55,402.12z M710.32,398.81l-5.52-2.94l7.6-1.24
				L710.32,398.81z M704.11,395.5l-5.51-2.93l7.58-1.24L704.11,395.5z M697.92,392.2l-5.49-2.92l7.57-1.24L697.92,392.2z
				 M691.75,388.92l-5.47-2.91l7.56-1.24L691.75,388.92z M686.71,385.61l4.46-2.49l2.53,1.35L686.71,385.61z M682.11,378.31
				l2.52,1.34l-4.46,2.49L682.11,378.31z M679.47,382.38l-5.44-2.9l7.53-1.24L679.47,382.38z M685.03,379.86l2.53,1.34l-6.98,1.15
				L685.03,379.86z M687.69,381.5l-2.09,4.14l-5.45-2.9L687.69,381.5z M688.24,381.56l2.53,1.34l-4.46,2.49L688.24,381.56z
				 M753.21,416.08l-4.51,2.54l1.9-3.93L753.21,416.08z M678.91,376.61l2.52,1.34l-6.97,1.15L678.91,376.61z"/>
										<path className="navas78" d="M672.91,373l0.19,6.41l75.04,39.97l-0.34-6.61L672.91,373z M691.69,383.4l2.53,1.35l-2.36,3.62
				L691.69,383.4z M691.46,388.15l-2.71-6.31l2.53,1.34L691.46,388.15z M697.85,386.67l2.54,1.35l-2.36,3.63L697.85,386.67z
				 M697.63,391.43l-2.72-6.32l2.54,1.35L697.63,391.43z M704.03,389.95l2.55,1.35l-2.36,3.63L704.03,389.95z M703.82,394.72
				l-2.74-6.34l2.55,1.35L703.82,394.72z M710.23,393.24l2.56,1.36l-2.36,3.64L710.23,393.24z M710.02,398.03l-2.76-6.36l2.55,1.36
				L710.02,398.03z M716.45,396.55l2.57,1.36l-2.35,3.65L716.45,396.55z M716.25,401.34l-2.77-6.37l2.56,1.36L716.25,401.34z
				 M722.68,399.86l2.57,1.37l-2.35,3.66L722.68,399.86z M722.5,404.67l-2.79-6.39l2.57,1.37L722.5,404.67z M728.94,403.18
				l2.58,1.37l-2.35,3.67L728.94,403.18z M728.76,408l-2.81-6.41l2.58,1.37L728.76,408z M735.22,406.52l2.59,1.38l-2.35,3.68
				L735.22,406.52z M735.05,411.35l-2.83-6.43l2.59,1.37L735.05,411.35z M741.51,409.86l2.6,1.38l-2.35,3.69L741.51,409.86z
				 M741.35,414.71l-2.85-6.44l2.59,1.38L741.35,414.71z M744.48,411.67l3.09,6.98l-5.63-3L744.48,411.67z M741.24,415.27
				l-5.61-2.99l2.54-3.97L741.24,415.27z M734.94,411.92l-5.59-2.98l2.54-3.96L734.94,411.92z M728.65,408.57l-5.57-2.97l2.54-3.95
				L728.65,408.57z M722.38,405.23l-5.56-2.96l2.54-3.94L722.38,405.23z M716.14,401.91l-5.54-2.95l2.54-3.93L716.14,401.91z
				 M709.91,398.59l-5.52-2.94l2.54-3.93L709.91,398.59z M703.7,395.28l-5.5-2.93l2.55-3.92L703.7,395.28z M697.52,391.99
				l-5.49-2.92l2.55-3.91L697.52,391.99z M691.35,388.7l-5.47-2.91l2.55-3.9L691.35,388.7z M685.72,385.09l-0.17-4.95l2.53,1.34
				L685.72,385.09z M676.51,375.33l2.52,1.34l0.16,4.94L676.51,375.33z M679.07,382.16l-5.44-2.89l2.55-3.88L679.07,382.16z
				 M679.43,376.88l2.52,1.34l-2.36,3.6L679.43,376.88z M682.3,378.64l2.9,6.79l-5.45-2.9L682.3,378.64z M682.63,378.58l2.52,1.34
				l0.17,4.95L682.63,378.58z M747.42,412.99l0.26,5.08l-2.86-6.46L747.42,412.99z M673.33,373.64l2.51,1.33l-2.36,3.59
				L673.33,373.64z"/>
										<path className="navas169" d="M678.7,369.78l-5.78,3.22l74.89,39.77l5.86-3.3L678.7,369.78z M678.71,370.2l2.51,1.33l-6.96,1.15
				L678.71,370.2z M684.82,373.44l2.52,1.34l-6.97,1.15L684.82,373.44z M679.97,375.71l1.93-3.81l2.52,1.33L679.97,375.71z
				 M690.95,376.68l2.53,1.34l-6.98,1.15L690.95,376.68z M686.09,378.96l1.93-3.82l2.53,1.34L686.09,378.96z M697.09,379.94
				l2.54,1.34l-7,1.15L697.09,379.94z M692.23,382.22l1.93-3.83l2.53,1.34L692.23,382.22z M703.26,383.2l2.54,1.35l-7.01,1.15
				L703.26,383.2z M698.39,385.49l1.92-3.84l2.54,1.35L698.39,385.49z M709.44,386.48l2.55,1.35l-7.02,1.15L709.44,386.48z
				 M704.57,388.77l1.92-3.85l2.55,1.35L704.57,388.77z M715.65,389.77l2.56,1.36l-7.04,1.15L715.65,389.77z M710.76,392.05
				l1.92-3.86l2.56,1.35L710.76,392.05z M721.87,393.06l2.57,1.36l-7.05,1.15L721.87,393.06z M716.98,395.35l1.92-3.87l2.56,1.36
				L716.98,395.35z M728.11,396.37l2.58,1.36l-7.06,1.15L728.11,396.37z M723.22,398.66l1.91-3.88l2.57,1.36L723.22,398.66z
				 M734.37,399.68l2.58,1.37l-7.08,1.15L734.37,399.68z M729.47,401.99l1.91-3.89l2.58,1.37L729.47,401.99z M740.66,403.01
				l2.59,1.37l-7.09,1.15L740.66,403.01z M735.75,405.32l1.91-3.9l2.59,1.37L735.75,405.32z M746.96,406.35l2.6,1.38l-7.1,1.15
				L746.96,406.35z M742.04,408.66l1.9-3.91l2.6,1.38L742.04,408.66z M749.7,408.03l-2.05,4.23l-5.62-2.98L749.7,408.03z
				 M741.33,408.9l-5.6-2.97l7.65-1.24L741.33,408.9z M735.04,405.56l-5.58-2.96l7.64-1.24L735.04,405.56z M728.76,402.23
				l-5.56-2.95l7.63-1.24L728.76,402.23z M722.51,398.91l-5.55-2.94l7.61-1.24L722.51,398.91z M716.27,395.6l-5.53-2.94l7.6-1.24
				L716.27,395.6z M710.06,392.3l-5.51-2.93l7.58-1.24L710.06,392.3z M703.86,389.01l-5.49-2.92l7.57-1.24L703.86,389.01z
				 M697.68,385.73l-5.48-2.91l7.55-1.24L697.68,385.73z M691.52,382.46l-5.46-2.9l7.54-1.24L691.52,382.46z M685.39,379.2
				l-5.44-2.89l7.53-1.24L685.39,379.2z M679.27,375.95l-5.43-2.88l7.51-1.24L679.27,375.95z M752.86,409.48l-4.51,2.54l1.9-3.91
				L752.86,409.48z"/>
									</g>
									<g>
										<g>
											<g>
												<path className="navas73" d="M676.08,447.71c0,0,0.01,0,0.01-0.01l0,0l0,0c0.02-0.01,0.06-0.01,0.09,0.01
						c0.08,0.04,0.14,0.15,0.15,0.23c0,0.04-0.01,0.08-0.04,0.09l0,0l-1.15,0.65l-0.2-0.34L676.08,447.71z"/>
												<path className="navas71" d="M674.9,448.44c0,0.09,0.07,0.19,0.15,0.23c0.08,0.04,0.14,0.01,0.14-0.08c0-0.09-0.07-0.19-0.15-0.23
						C674.96,448.32,674.89,448.36,674.9,448.44z"/>
											</g>
											<g>
												<path className="navas73" d="M677.73,448.64c0,0,0.01,0,0.01-0.01l0,0l0,0c0.02-0.01,0.06-0.01,0.09,0.01
						c0.08,0.04,0.15,0.15,0.15,0.23c0,0.04-0.01,0.08-0.04,0.09l0,0l-1.15,0.65l-0.2-0.34L677.73,448.64z"/>
												<path className="navas71" d="M676.55,449.38c0,0.09,0.07,0.19,0.15,0.24c0.08,0.04,0.14,0.01,0.14-0.08c0-0.09-0.07-0.19-0.15-0.24
						C676.61,449.26,676.54,449.29,676.55,449.38z"/>
											</g>
											<g>
												<path className="navas73" d="M676.85,448.29c0,0,0,0.01,0,0.01l0,0l0,0c0,0.03,0.02,0.05,0.06,0.07c0.08,0.04,0.2,0.04,0.28,0
						c0.04-0.02,0.06-0.05,0.06-0.08h0l-0.21-7l-0.4,0.01L676.85,448.29z"/>
												<path className="navas71" d="M676.7,441.23c0.08-0.04,0.2-0.04,0.28,0s0.08,0.11,0,0.16c-0.08,0.04-0.2,0.04-0.28,0
						C676.62,441.35,676.62,441.28,676.7,441.23z"/>
											</g>
										</g>
										<g>
											<path className="navas170" d="M677.05,439.65l0.23-0.09c0,0-0.13-1.43-0.24-1.8c-0.11-0.37-0.27-0.56-0.42-0.6
					c-0.2-0.06-0.22,0.43,0.02,0.57c-0.02,0.24-0.18,1.07-0.18,1.07s0.06,0.01,0.21,0.59C676.83,439.98,677.05,439.65,677.05,439.65
					z"/>
											<path className="navas172" d="M675.42,445.7c0.18-0.21,0.23-0.58,0.12-1c-0.04-0.16-0.07-0.33-0.05-0.49c0.01-0.12-0.16-0.2-0.09-0.24
					c0.01-0.01,0.24-0.09,0.25-0.09c0.03,0,0.06,0.02,0.1,0.06c0.28,0.32-0.18,0.77,0.73,1.17l0.11-0.07
					c0.25,0.19,0.12-0.15,0.59,0.15c0.33,0.21,0.2-0.33,0.3-0.41c0.01-0.01,0.23-0.09,0.24-0.09c0.03,0,0.07,0.07,0.13,0.23
					c0.35,1.11-0.28,1.09-0.35,1.42c-0.06,0.29-0.05,0.65,0.04,1.02c0.11,0.47,0.23,1.1,0.19,1.39c-0.03,0.19-0.08,0.34-0.21,0.39
					c-0.01,0.01-0.22,0.08-0.23,0.09c-0.19,0.03-0.35-0.18-1.01-0.61c0,0-0.05-0.03-0.07-0.05c-0.02-0.02-0.07-0.05-0.07-0.05
					c-1.2-0.91-1.31-1.29-1.29-1.8C674.84,446.43,675.16,446.01,675.42,445.7z"/>
											<path className="navas173" d="M675.2,445.79c0.18-0.21,0.23-0.58,0.12-1c-0.04-0.16-0.07-0.33-0.05-0.49c0.02-0.19,0.1-0.45,0.25-0.28
					c0.28,0.32-0.18,0.77,0.73,1.17l0.11-0.07c0.25,0.19,0.12-0.15,0.59,0.15c0.46,0.29,0.43-1,0.67-0.27
					c0.35,1.11-0.28,1.09-0.35,1.42c-0.06,0.29-0.05,0.65,0.04,1.02c0.11,0.47,0.23,1.1,0.19,1.39c-0.07,0.47-0.23,0.66-1.45-0.13
					c0,0-0.05-0.03-0.07-0.05c-0.02-0.02-0.07-0.05-0.07-0.05c-1.2-0.91-1.31-1.29-1.29-1.8
					C674.62,446.51,674.93,446.09,675.2,445.79z"/>
											<path className="navas67" d="M676.87,445.4c0.11,0.11-0.05,0.19-0.09,0.46c-0.04,0.27,0.17,1.06,0.06,1.5
					c-0.11,0.44-0.89-0.47-1.09-0.57c-0.21-0.1-0.68,0.12-0.82-0.03c-0.13-0.16-0.08-0.57,0.34-0.92c0.42-0.35-0.03-1.19,0.05-1.55
					c0.06-0.27,0.14-0.24,0.18-0.17c0.04,0.07-0.02,0.45,0.15,0.71c0.04,0.06,0.33,0.41,0.61,0.52S676.78,445.32,676.87,445.4z"/>
											<polygon className="navas82" points="675.67,447.09 676.63,447.77 676.66,447.42 675.71,446.74 				" />
											<g>
												<g>
													<polygon className="navas83" points="677.02,438.17 677.22,438.25 677.21,438.16 677.01,438.08 						" />
													<g>
														<path className="navas82" d="M677.23,438.3L677.23,438.3c0.04,0.02,0.07-0.01,0.07-0.06l0,0c-0.01-0.05-0.04-0.1-0.08-0.12l-0.01,0
								c-0.04-0.01-0.07,0.01-0.06,0.06l0,0C677.16,438.23,677.19,438.29,677.23,438.3z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="677.07,438.6 677.27,438.68 677.26,438.59 677.06,438.51 						" />
													<g>
														<path className="navas82" d="M677.28,438.73L677.28,438.73c0.04,0.02,0.07-0.01,0.07-0.06l0,0c-0.01-0.05-0.04-0.1-0.08-0.12
								l-0.01,0c-0.04-0.01-0.07,0.01-0.06,0.06l0,0C677.21,438.66,677.24,438.72,677.28,438.73z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="677.11,439.01 677.32,439.09 677.31,439 677.1,438.92 						" />
													<g>
														<path className="navas82" d="M677.33,439.13L677.33,439.13c0.04,0.02,0.07-0.01,0.07-0.06l0,0c-0.01-0.05-0.04-0.1-0.08-0.12
								l-0.01,0c-0.04-0.01-0.07,0.01-0.06,0.06l0,0C677.25,439.07,677.29,439.12,677.33,439.13z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="677.16,439.41 677.36,439.49 677.35,439.4 677.15,439.32 						" />
													<g>
														<path className="navas82" d="M677.37,439.54L677.37,439.54c0.04,0.02,0.07-0.01,0.07-0.06l0,0c-0.01-0.05-0.04-0.1-0.08-0.12
								l-0.01,0c-0.04-0.01-0.07,0.01-0.06,0.06l0,0C677.3,439.47,677.34,439.52,677.37,439.54z"/>
													</g>
												</g>
											</g>
											<g>
												<polygon className="navas82" points="676.67,439.39 676.78,439.47 676.94,439.58 677.05,439.65 676.66,445.66 676.4,445.48 
						676.25,445.37 675.99,445.19 					"/>
												<polygon className="navas83" points="676.78,443.82 676.2,443.41 676.21,443.34 676.78,443.74 					" />
												<polygon className="navas83" points="676.71,444.88 676.08,444.44 676.09,444.36 676.72,444.8 					" />
												<polygon className="navas83" points="676.85,442.69 676.33,442.33 676.34,442.25 676.86,442.62 					" />
												<polygon className="navas83" points="676.91,441.74 676.44,441.41 676.45,441.34 676.92,441.67 					" />
												<polygon className="navas83" points="676.98,440.72 676.55,440.42 676.56,440.35 676.98,440.64 					" />
											</g>
											<g>
												<polygon className="navas171" points="676.46,447.45 677,439.62 677.22,439.41 677.2,439.38 676.97,439.6 676.97,439.61 
						676.42,447.45 					"/>
											</g>
											<g>
												<polygon className="navas171" points="676.25,447.29 676.94,439.57 677.2,439.01 677.17,439 676.91,439.57 676.22,447.28 					" />
											</g>
											<g>
												<polygon className="navas171" points="675.89,447.05 676.77,439.45 677.1,438.17 677.07,438.16 676.74,439.44 675.86,447.05 					" />
											</g>
											<g>
												<polygon className="navas171" points="676.07,447.17 676.88,439.53 677.15,438.59 677.12,438.59 676.85,439.52 676.04,447.16 					" />
											</g>
										</g>
									</g>
									<g>
										<g>
											<g>
												<path className="navas73" d="M733.97,479.25c0,0,0.01,0,0.01-0.01l0,0l0,0c0.02-0.01,0.06-0.01,0.1,0.01
						c0.08,0.04,0.15,0.15,0.15,0.24c0,0.05-0.01,0.08-0.04,0.09l0,0l-1.17,0.66l-0.21-0.35L733.97,479.25z"/>
												<path className="navas71" d="M732.78,479.99c0,0.09,0.07,0.2,0.15,0.24c0.08,0.04,0.14,0.01,0.14-0.08c0-0.09-0.07-0.2-0.15-0.24
						C732.84,479.87,732.78,479.91,732.78,479.99z"/>
											</g>
											<g>
												<path className="navas73" d="M735.67,480.21c0,0,0.01,0,0.01-0.01l0,0l0,0c0.02-0.01,0.06-0.01,0.1,0.01
						c0.08,0.04,0.15,0.15,0.15,0.24c0,0.05-0.01,0.08-0.04,0.09l0,0l-1.17,0.66l-0.21-0.35L735.67,480.21z"/>
												<path className="navas71" d="M734.48,480.96c0,0.09,0.07,0.2,0.15,0.24c0.08,0.04,0.14,0.01,0.14-0.08c0-0.09-0.07-0.2-0.15-0.24
						C734.54,480.83,734.47,480.87,734.48,480.96z"/>
											</g>
											<g>
												<path className="navas73" d="M734.77,479.85c0,0,0,0.01,0,0.01l0,0h0c0,0.03,0.02,0.05,0.06,0.07c0.08,0.04,0.21,0.05,0.29,0
						c0.04-0.02,0.06-0.05,0.06-0.08h0l-0.33-7.16l-0.4,0.01L734.77,479.85z"/>
												<path className="navas71" d="M734.5,472.62c0.08-0.04,0.21-0.04,0.29,0c0.08,0.04,0.08,0.12,0.01,0.16c-0.08,0.04-0.21,0.04-0.29,0
						C734.42,472.73,734.42,472.66,734.5,472.62z"/>
											</g>
										</g>
										<g>
											<g>
												<path className="navas174" d="M733.96,476.33c-0.01-0.19-0.23-0.76-0.22-1.27c0-0.14-0.61,0.06-0.53,0c0.01-0.01,0.68-0.32,0.69-0.33
						c0.2-0.12,0.57-0.06,0.97,0.16l0-0.01c0.03,0.02,0.05,0.03,0.08,0.05c0.03,0.01,0.05,0.03,0.08,0.05l0,0.01
						c0.61,0.43,1.12,1.09,1.12,1.57c0,0.52-0.23,0.81-0.24,0.98c-0.02,0.17,0.63,1.56,0.59,2.07c-0.02,0.27-0.08,0.63-0.35,0.77
						c-0.02,0.01-0.66,0.31-0.68,0.32c-0.22,0.07,0.05-0.28-0.48-0.58c0,0-0.05-0.03-0.08-0.05c-0.03-0.02-0.08-0.05-0.08-0.05
						c-1.32-0.88-1.46-1.83-1.49-2.37C733.31,477.09,733.97,476.52,733.96,476.33z"/>
												<path className="navas175" d="M733.29,476.63c-0.01-0.19-0.23-0.76-0.22-1.27c0.01-0.47,0.53-0.5,1.14-0.17l0-0.01
						c0.03,0.02,0.05,0.03,0.08,0.05c0.03,0.01,0.05,0.03,0.08,0.05l0,0.01c0.61,0.43,1.12,1.09,1.12,1.57
						c0,0.52-0.23,0.81-0.24,0.98c-0.02,0.17,0.63,1.56,0.59,2.07c-0.04,0.49-0.2,1.26-1.52,0.5c0,0-0.05-0.03-0.08-0.05
						c-0.03-0.02-0.08-0.05-0.08-0.05c-1.32-0.88-1.46-1.83-1.48-2.37C732.64,477.4,733.31,476.83,733.29,476.63z"/>
												<path className="navas170" d="M733.59,476.39c-0.01,0.43,0.3,0.96,0.68,1.2c0.38,0.24,0.69,0.08,0.7-0.34c0.01-0.43-0.3-0.96-0.68-1.2
						C733.9,475.81,733.59,475.96,733.59,476.39z M733.74,476.48c0-0.33,0.25-0.45,0.54-0.27c0.3,0.18,0.53,0.6,0.53,0.93
						c0,0.33-0.25,0.45-0.54,0.27C733.97,477.23,733.74,476.81,733.74,476.48z"/>
												<path className="navas83" d="M733.77,476.5c0,0.31,0.22,0.7,0.5,0.87c0.28,0.17,0.51,0.06,0.51-0.25c0-0.31-0.22-0.7-0.5-0.87
						C734,476.08,733.78,476.19,733.77,476.5z"/>
											</g>
											<polygon className="navas82" points="733.53,478.41 734.97,479.3 734.97,479 733.54,478.11 				" />
											<g>
												<g>
													<polygon className="navas83" points="733.95,470.92 734.73,471.4 734.73,471.34 733.95,470.85 						" />
													<g>
														<path className="navas82" d="M734.74,471.44L734.74,471.44c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C734.68,471.37,734.7,471.42,734.74,471.44z"/>
														<path className="navas82" d="M733.94,470.95L733.94,470.95c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C733.88,470.88,733.91,470.93,733.94,470.95z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="733.95,471.23 734.73,471.71 734.73,471.64 733.95,471.16 						" />
													<g>
														<path className="navas82" d="M734.73,471.75L734.73,471.75c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C734.67,471.68,734.7,471.73,734.73,471.75z"/>
														<path className="navas82" d="M733.94,471.26L733.94,471.26c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C733.88,471.19,733.91,471.24,733.94,471.26z"/>
													</g>
												</g>
												<g>
													<polygon className="navas83" points="733.95,471.54 734.73,472.02 734.73,471.95 733.95,471.47 						" />
													<g>
														<path className="navas82" d="M734.73,472.06L734.73,472.06c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C734.67,471.99,734.7,472.04,734.73,472.06z"/>
														<path className="navas82" d="M733.94,471.57L733.94,471.57c0.04,0.02,0.07,0.01,0.07-0.03l0,0c0-0.04-0.03-0.09-0.06-0.11l-0.01,0
								c-0.03-0.02-0.06-0.01-0.06,0.03l0,0C733.88,471.5,733.9,471.54,733.94,471.57z"/>
													</g>
												</g>
												<path className="navas170" d="M734.03,470.8l-0.01,0.96l0.12,0.38l0.37,0.23l0.13-0.22l0.01-0.96l-0.03-0.22
						c-0.02-0.1-0.11-0.21-0.18-0.21l-0.09,0l-0.09-0.11c-0.07-0.09-0.17-0.1-0.19-0.02L734.03,470.8z M734.42,471.07
						c0-0.04,0.03-0.05,0.06-0.03c0.03,0.02,0.06,0.07,0.06,0.1l-0.01,0.81c0,0.04-0.03,0.05-0.06,0.03s-0.06-0.07-0.06-0.1
						L734.42,471.07z M734.15,470.91c0-0.04,0.03-0.05,0.06-0.03c0.03,0.02,0.06,0.07,0.06,0.1l-0.01,0.81
						c0,0.04-0.03,0.05-0.06,0.03c-0.03-0.02-0.06-0.07-0.06-0.1L734.15,470.91z"/>
											</g>
											<g>
												<polygon className="navas82" points="734.15,472.14 734.25,472.21 734.41,472.3 734.52,472.37 734.61,476.63 734.36,476.48 
						734.2,476.38 733.95,476.22 					"/>
												<polygon className="navas83" points="734.58,475.33 734.01,474.97 734.01,474.92 734.58,475.27 					" />
												<polygon className="navas83" points="734.6,476.08 733.97,475.69 733.98,475.64 734.6,476.03 					" />
												<polygon className="navas83" points="734.56,474.53 734.05,474.21 734.05,474.16 734.56,474.47 					" />
												<polygon className="navas83" points="734.55,473.85 734.08,473.56 734.08,473.51 734.55,473.8 					" />
												<polygon className="navas83" points="734.53,473.13 734.11,472.86 734.11,472.81 734.53,473.07 					" />
											</g>
											<g>
												<g>
													<polygon className="navas171" points="734.56,478.89 734.47,472.33 734.53,471.23 734.5,471.23 734.45,472.33 734.53,478.89 						
							"/>
												</g>
												<g>
													<polygon className="navas171" points="734.45,478.82 734.43,472.31 734.45,471.5 734.43,471.49 734.41,472.31 734.42,478.82 						
							"/>
												</g>
												<g>
													<polygon className="navas171" points="734.34,478.75 734.38,472.28 734.47,471.82 734.44,471.81 734.35,472.27 734.31,478.75 						
							"/>
												</g>
												<g>
													<polygon className="navas171" points="733.97,478.53 734.23,472.18 734.18,471.02 734.16,471.02 734.2,472.18 733.95,478.53 						
							"/>
												</g>
												<g>
													<polygon className="navas171" points="734.08,478.59 734.27,472.21 734.25,471.37 734.23,471.37 734.24,472.21 734.06,478.59 						
							"/>
												</g>
												<g>
													<polygon className="navas171" points="734.2,478.67 734.32,472.24 734.23,471.66 734.2,471.67 734.3,472.24 734.18,478.67 						" />
												</g>
											</g>
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="739.05,421.67 739.28,421.26 734.05,418.47 733.82,418.88 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="739.04,421.62 739.27,421.21 734.09,418.45 733.87,418.86 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="739.04,421.57 739.26,421.17 734.14,418.43 733.91,418.84 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="739.03,421.53 739.26,421.12 734.19,418.41 733.96,418.82 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="739.02,421.48 739.25,421.08 734.23,418.39 734,418.8 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="739.02,421.43 739.24,421.03 734.28,418.37 734.05,418.78 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="739.01,421.39 739.24,420.98 734.32,418.36 734.1,418.76 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="739,421.34 739.23,420.94 734.37,418.34 734.14,418.74 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="738.99,421.29 739.22,420.89 734.42,418.32 734.19,418.72 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="738.99,421.25 739.21,420.84 734.46,418.3 734.23,418.7 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="738.98,421.2 739.21,420.8 734.51,418.28 734.28,418.68 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="738.97,421.15 739.2,420.75 734.55,418.26 734.33,418.66 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="738.97,421.11 739.19,420.7 734.6,418.24 734.37,418.64 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="738.96,421.06 739.19,420.66 734.65,418.22 734.42,418.63 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="738.95,421.01 739.18,420.61 734.69,418.2 734.46,418.61 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="738.95,420.97 739.17,420.56 734.74,418.18 734.51,418.59 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="738.94,420.92 739.17,420.52 734.78,418.16 734.56,418.57 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="738.93,420.87 739.16,420.47 734.83,418.14 734.6,418.55 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="738.93,420.83 739.15,420.42 734.88,418.13 734.65,418.53 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="738.92,420.78 739.15,420.38 734.92,418.11 734.69,418.51 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="738.91,420.73 739.14,420.33 734.97,418.09 734.74,418.49 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="738.91,420.69 739.13,420.28 735.01,418.07 734.79,418.47 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="738.9,420.64 739.13,420.24 735.06,418.05 734.83,418.45 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="738.89,420.59 739.12,420.19 735.11,418.03 734.88,418.43 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="738.89,420.55 739.11,420.14 735.15,418.01 734.92,418.41 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="738.88,420.5 739.11,420.1 735.2,417.99 734.97,418.4 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="738.87,420.46 739.1,420.05 735.24,417.97 735.02,418.38 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="738.86,420.41 739.09,420 735.29,417.95 735.06,418.36 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="738.86,420.36 739.09,419.96 735.34,417.93 735.11,418.34 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="738.85,420.32 739.08,419.91 735.38,417.92 735.15,418.32 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="738.84,420.27 739.07,419.87 735.43,417.9 735.2,418.3 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="738.84,420.22 739.07,419.82 735.47,417.88 735.24,418.28 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="738.83,420.18 739.06,419.77 735.52,417.86 735.29,418.26 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="738.82,420.13 739.05,419.73 735.57,417.84 735.34,418.24 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="738.82,420.08 739.05,419.68 735.61,417.82 735.38,418.22 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="738.81,420.04 739.04,419.63 735.66,417.8 735.43,418.2 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="738.8,419.99 739.03,419.59 735.7,417.78 735.47,418.18 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="738.8,419.94 739.03,419.54 735.75,417.76 735.52,418.16 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="738.79,419.9 739.02,419.49 735.8,417.74 735.57,418.15 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="738.78,419.85 739.01,419.45 735.84,417.72 735.61,418.13 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="738.78,419.8 739.01,419.4 735.89,417.7 735.66,418.11 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="738.77,419.76 739,419.35 735.93,417.69 735.7,418.09 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="738.76,419.71 738.99,419.31 735.98,417.67 735.75,418.07 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="738.75,419.66 738.99,419.26 736.03,417.65 735.8,418.05 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="738.75,419.62 738.98,419.21 736.07,417.63 735.84,418.03 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="738.74,419.57 738.97,419.17 736.12,417.61 735.89,418.01 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="738.73,419.52 738.97,419.12 736.16,417.59 735.93,417.99 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="738.73,419.48 738.96,419.07 736.21,417.57 735.98,417.97 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="738.72,419.43 738.95,419.03 736.26,417.55 736.03,417.95 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="738.71,419.38 738.95,418.98 736.3,417.53 736.07,417.93 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="738.71,419.34 738.94,418.94 736.35,417.51 736.12,417.91 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="738.7,419.29 738.93,418.89 736.4,417.49 736.16,417.9 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="738.69,419.24 738.93,418.84 736.44,417.48 736.21,417.88 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="738.69,419.2 738.92,418.8 736.49,417.46 736.25,417.86 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="738.68,419.15 738.91,418.75 736.53,417.44 736.3,417.84 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="738.67,419.1 738.91,418.7 736.58,417.42 736.35,417.82 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="738.67,419.06 738.9,418.66 736.63,417.4 736.39,417.8 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="738.66,419.01 738.89,418.61 736.67,417.38 736.44,417.78 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="738.65,418.96 738.89,418.56 736.72,417.36 736.48,417.76 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="738.64,418.92 738.88,418.52 736.76,417.34 736.53,417.74 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="738.64,418.87 738.87,418.47 736.81,417.32 736.57,417.72 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="738.63,418.82 738.87,418.42 736.86,417.3 736.62,417.7 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="738.62,418.78 738.86,418.38 736.9,417.28 736.67,417.68 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="738.62,418.73 738.85,418.33 736.95,417.27 736.71,417.66 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="738.61,418.68 738.85,418.29 736.99,417.25 736.76,417.65 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="738.6,418.64 738.84,418.24 737.04,417.23 736.8,417.63 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="738.6,418.59 738.83,418.19 737.09,417.21 736.85,417.61 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="738.59,418.54 738.83,418.15 737.13,417.19 736.9,417.59 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="738.58,418.5 738.82,418.1 737.18,417.17 736.94,417.57 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="738.57,418.45 738.81,418.05 737.23,417.15 736.99,417.55 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="738.57,418.4 738.81,418.01 737.27,417.13 737.03,417.53 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="738.56,418.36 738.8,417.96 737.32,417.11 737.08,417.51 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="738.55,418.31 738.79,417.91 737.36,417.09 737.12,417.49 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="738.55,418.26 738.79,417.87 737.41,417.08 737.17,417.47 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="738.54,418.22 738.78,417.82 737.46,417.06 737.21,417.45 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="738.53,418.17 738.77,417.78 737.5,417.04 737.26,417.43 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="738.52,418.12 738.77,417.73 737.55,417.02 737.31,417.41 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="738.52,418.08 738.76,417.68 737.6,417 737.35,417.39 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="738.51,418.03 738.76,417.64 737.64,416.98 737.4,417.37 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="738.5,417.98 738.75,417.59 737.69,416.96 737.44,417.35 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="738.49,417.94 738.74,417.55 737.74,416.94 737.49,417.33 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="738.49,417.89 738.74,417.5 737.78,416.92 737.53,417.32 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="738.48,417.84 738.73,417.45 737.83,416.91 737.58,417.3 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="738.47,417.8 738.73,417.41 737.88,416.89 737.62,417.28 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="738.46,417.75 738.72,417.36 737.92,416.87 737.67,417.26 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="738.46,417.7 738.71,417.32 737.97,416.85 737.71,417.24 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="738.45,417.65 738.71,417.27 738.02,416.83 737.76,417.22 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="738.44,417.61 738.7,417.22 738.07,416.81 737.8,417.2 					" />
											</g>
											<g>
												<polygon className="navas76" points="738.43,417.56 738.7,417.18 738.11,416.8 737.85,417.18 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="687.53,393.94 687.76,393.54 682.66,390.83 682.43,391.22 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="687.52,393.9 687.75,393.5 682.71,390.81 682.48,391.2 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="687.52,393.85 687.74,393.45 682.75,390.79 682.52,391.18 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="687.51,393.81 687.74,393.41 682.8,390.77 682.57,391.17 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="687.5,393.76 687.73,393.36 682.84,390.75 682.62,391.15 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="687.5,393.71 687.73,393.32 682.89,390.73 682.66,391.13 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="687.49,393.67 687.72,393.27 682.93,390.71 682.71,391.11 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="687.49,393.62 687.71,393.23 682.98,390.69 682.75,391.09 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="687.48,393.58 687.71,393.18 683.03,390.68 682.8,391.07 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="687.47,393.53 687.7,393.13 683.07,390.66 682.84,391.05 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="687.47,393.49 687.7,393.09 683.12,390.64 682.89,391.03 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="687.46,393.44 687.69,393.04 683.16,390.62 682.93,391.01 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="687.46,393.39 687.68,393 683.21,390.6 682.98,391 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="687.45,393.35 687.68,392.95 683.25,390.58 683.02,390.98 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="687.44,393.3 687.67,392.91 683.3,390.56 683.07,390.96 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="687.44,393.26 687.67,392.86 683.34,390.54 683.11,390.94 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="687.43,393.21 687.66,392.82 683.39,390.52 683.16,390.92 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="687.43,393.17 687.65,392.77 683.44,390.5 683.21,390.9 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="687.42,393.12 687.65,392.72 683.48,390.49 683.25,390.88 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="687.41,393.08 687.64,392.68 683.53,390.47 683.3,390.86 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="687.41,393.03 687.64,392.63 683.57,390.45 683.34,390.84 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="687.4,392.98 687.63,392.59 683.62,390.43 683.39,390.83 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="687.4,392.94 687.63,392.54 683.66,390.41 683.43,390.81 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="687.39,392.89 687.62,392.5 683.71,390.39 683.48,390.79 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="687.38,392.85 687.61,392.45 683.75,390.37 683.52,390.77 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="687.38,392.8 687.61,392.41 683.8,390.35 683.57,390.75 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="687.37,392.76 687.6,392.36 683.84,390.34 683.61,390.73 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="687.37,392.71 687.6,392.31 683.89,390.32 683.66,390.71 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="687.36,392.67 687.59,392.27 683.94,390.3 683.7,390.69 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="687.35,392.62 687.58,392.22 683.98,390.28 683.75,390.67 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="687.35,392.57 687.58,392.18 684.03,390.26 683.8,390.66 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="687.34,392.53 687.57,392.13 684.07,390.24 683.84,390.64 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="687.33,392.48 687.57,392.09 684.12,390.22 683.89,390.62 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="687.33,392.44 687.56,392.04 684.16,390.2 683.93,390.6 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="687.32,392.39 687.55,392 684.21,390.18 683.98,390.58 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="687.32,392.35 687.55,391.95 684.25,390.17 684.02,390.56 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="687.31,392.3 687.54,391.91 684.3,390.15 684.07,390.54 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="687.3,392.25 687.54,391.86 684.34,390.13 684.11,390.52 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="687.3,392.21 687.53,391.81 684.39,390.11 684.16,390.5 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="687.29,392.16 687.52,391.77 684.44,390.09 684.2,390.48 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="687.29,392.12 687.52,391.72 684.48,390.07 684.25,390.47 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="687.28,392.07 687.51,391.68 684.53,390.05 684.29,390.45 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="687.27,392.03 687.51,391.63 684.57,390.03 684.34,390.43 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="687.27,391.98 687.5,391.59 684.62,390.01 684.39,390.41 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="687.26,391.94 687.49,391.54 684.66,390 684.43,390.39 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="687.26,391.89 687.49,391.5 684.71,389.98 684.48,390.37 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="687.25,391.84 687.48,391.45 684.75,389.96 684.52,390.35 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="687.24,391.8 687.48,391.4 684.8,389.94 684.57,390.33 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="687.24,391.75 687.47,391.36 684.85,389.92 684.61,390.31 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="687.23,391.71 687.47,391.31 684.89,389.9 684.66,390.3 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="687.23,391.66 687.46,391.27 684.94,389.88 684.7,390.28 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="687.22,391.62 687.45,391.22 684.98,389.86 684.75,390.26 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="687.21,391.57 687.45,391.18 685.03,389.85 684.79,390.24 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="687.21,391.53 687.44,391.13 685.07,389.83 684.84,390.22 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="687.2,391.48 687.44,391.09 685.12,389.81 684.88,390.2 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="687.19,391.43 687.43,391.04 685.16,389.79 684.93,390.18 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="687.19,391.39 687.42,391 685.21,389.77 684.97,390.16 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="687.18,391.34 687.42,390.95 685.26,389.75 685.02,390.14 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="687.18,391.3 687.41,390.9 685.3,389.73 685.06,390.12 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="687.17,391.25 687.41,390.86 685.35,389.71 685.11,390.11 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="687.16,391.21 687.4,390.81 685.39,389.69 685.16,390.09 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="687.16,391.16 687.39,390.77 685.44,389.68 685.2,390.07 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="687.15,391.11 687.39,390.72 685.48,389.66 685.25,390.05 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="687.15,391.07 687.38,390.68 685.53,389.64 685.29,390.03 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="687.14,391.02 687.38,390.63 685.57,389.62 685.34,390.01 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="687.13,390.98 687.37,390.59 685.62,389.6 685.38,389.99 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="687.13,390.93 687.37,390.54 685.67,389.58 685.43,389.97 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="687.12,390.89 687.36,390.5 685.71,389.56 685.47,389.95 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="687.11,390.84 687.35,390.45 685.76,389.54 685.52,389.93 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="687.11,390.8 687.35,390.41 685.8,389.53 685.56,389.92 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="687.1,390.75 687.34,390.36 685.85,389.51 685.61,389.9 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="687.1,390.7 687.34,390.31 685.89,389.49 685.65,389.88 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="687.09,390.66 687.33,390.27 685.94,389.47 685.7,389.86 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="687.08,390.61 687.33,390.22 685.99,389.45 685.74,389.84 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="687.08,390.57 687.32,390.18 686.03,389.43 685.79,389.82 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="687.07,390.52 687.32,390.13 686.08,389.41 685.83,389.8 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="687.06,390.47 687.31,390.09 686.12,389.4 685.88,389.78 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="687.06,390.43 687.3,390.04 686.17,389.38 685.92,389.76 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="687.05,390.38 687.3,390 686.22,389.36 685.97,389.74 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="687.04,390.34 687.29,389.95 686.26,389.34 686.01,389.72 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="687.04,390.29 687.29,389.91 686.31,389.32 686.06,389.7 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="687.03,390.25 687.28,389.86 686.35,389.3 686.1,389.69 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="687.02,390.2 687.28,389.82 686.4,389.28 686.15,389.67 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="687.02,390.15 687.27,389.77 686.45,389.27 686.19,389.65 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="687.01,390.11 687.27,389.73 686.49,389.25 686.24,389.63 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="687,390.06 687.26,389.68 686.54,389.23 686.28,389.61 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="687,390.02 687.26,389.64 686.59,389.21 686.32,389.59 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="686.99,389.97 687.25,389.59 686.63,389.19 686.37,389.57 					" />
											</g>
											<g>
												<polygon className="navas76" points="686.98,389.92 687.25,389.55 686.68,389.18 686.41,389.55 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="693.92,397.46 694.15,397.06 689.04,394.33 688.81,394.73 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="693.91,397.42 694.14,397.02 689.08,394.32 688.85,394.71 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="693.91,397.37 694.14,396.97 689.13,394.3 688.9,394.69 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="693.9,397.32 694.13,396.93 689.17,394.28 688.94,394.68 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="693.89,397.28 694.12,396.88 689.22,394.26 688.99,394.66 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="693.89,397.23 694.12,396.83 689.26,394.24 689.04,394.64 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="693.88,397.19 694.11,396.79 689.31,394.22 689.08,394.62 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="693.88,397.14 694.1,396.74 689.36,394.2 689.13,394.6 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="693.87,397.1 694.1,396.7 689.4,394.18 689.17,394.58 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="693.86,397.05 694.09,396.65 689.45,394.16 689.22,394.56 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="693.86,397 694.09,396.61 689.49,394.15 689.26,394.54 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="693.85,396.96 694.08,396.56 689.54,394.13 689.31,394.52 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="693.85,396.91 694.07,396.51 689.58,394.11 689.35,394.51 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="693.84,396.87 694.07,396.47 689.63,394.09 689.4,394.49 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="693.83,396.82 694.06,396.42 689.67,394.07 689.44,394.47 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="693.83,396.78 694.06,396.38 689.72,394.05 689.49,394.45 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="693.82,396.73 694.05,396.33 689.76,394.03 689.54,394.43 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="693.81,396.68 694.04,396.29 689.81,394.01 689.58,394.41 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="693.81,396.64 694.04,396.24 689.86,393.99 689.63,394.39 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="693.8,396.59 694.03,396.2 689.9,393.98 689.67,394.37 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="693.8,396.55 694.03,396.15 689.95,393.96 689.72,394.35 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="693.79,396.5 694.02,396.1 689.99,393.94 689.76,394.33 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="693.78,396.46 694.01,396.06 690.04,393.92 689.81,394.32 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="693.78,396.41 694.01,396.01 690.08,393.9 689.85,394.3 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="693.77,396.36 694,395.97 690.13,393.88 689.9,394.28 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="693.77,396.32 694,395.92 690.17,393.86 689.94,394.26 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="693.76,396.27 693.99,395.88 690.22,393.84 689.99,394.24 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="693.75,396.23 693.98,395.83 690.27,393.82 690.04,394.22 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="693.75,396.18 693.98,395.78 690.31,393.81 690.08,394.2 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="693.74,396.14 693.97,395.74 690.36,393.79 690.13,394.18 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="693.74,396.09 693.97,395.69 690.4,393.77 690.17,394.16 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="693.73,396.04 693.96,395.65 690.45,393.75 690.22,394.14 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="693.72,396 693.95,395.6 690.49,393.73 690.26,394.13 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="693.72,395.95 693.95,395.56 690.54,393.71 690.31,394.11 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="693.71,395.91 693.94,395.51 690.58,393.69 690.35,394.09 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="693.7,395.86 693.94,395.46 690.63,393.67 690.4,394.07 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="693.7,395.81 693.93,395.42 690.68,393.65 690.44,394.05 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="693.69,395.77 693.92,395.37 690.72,393.64 690.49,394.03 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="693.69,395.72 693.92,395.33 690.77,393.62 690.54,394.01 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="693.68,395.68 693.91,395.28 690.81,393.6 690.58,393.99 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="693.67,395.63 693.91,395.24 690.86,393.58 690.63,393.97 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="693.67,395.59 693.9,395.19 690.9,393.56 690.67,393.96 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="693.66,395.54 693.89,395.15 690.95,393.54 690.72,393.94 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="693.66,395.5 693.89,395.1 690.99,393.52 690.76,393.92 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="693.65,395.45 693.88,395.05 691.04,393.5 690.81,393.9 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="693.64,395.4 693.88,395.01 691.09,393.48 690.85,393.88 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="693.64,395.36 693.87,394.96 691.13,393.47 690.9,393.86 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="693.63,395.31 693.86,394.92 691.18,393.45 690.94,393.84 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="693.62,395.27 693.86,394.87 691.22,393.43 690.99,393.82 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="693.62,395.22 693.85,394.83 691.27,393.41 691.03,393.8 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="693.61,395.17 693.85,394.78 691.31,393.39 691.08,393.78 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="693.61,395.13 693.84,394.73 691.36,393.37 691.13,393.77 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="693.6,395.08 693.83,394.69 691.41,393.35 691.17,393.75 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="693.59,395.04 693.83,394.64 691.45,393.33 691.22,393.73 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="693.59,394.99 693.82,394.6 691.5,393.31 691.26,393.71 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="693.58,394.95 693.82,394.55 691.54,393.3 691.31,393.69 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="693.57,394.9 693.81,394.51 691.59,393.28 691.35,393.67 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="693.57,394.85 693.8,394.46 691.63,393.26 691.4,393.65 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="693.56,394.81 693.8,394.42 691.68,393.24 691.44,393.63 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="693.56,394.76 693.79,394.37 691.72,393.22 691.49,393.61 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="693.55,394.72 693.79,394.32 691.77,393.2 691.53,393.59 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="693.54,394.67 693.78,394.28 691.82,393.18 691.58,393.58 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="693.54,394.63 693.77,394.23 691.86,393.16 691.62,393.56 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="693.53,394.58 693.77,394.19 691.91,393.15 691.67,393.54 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="693.52,394.53 693.76,394.14 691.95,393.13 691.72,393.52 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="693.52,394.49 693.76,394.1 692,393.11 691.76,393.5 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="693.51,394.44 693.75,394.05 692.04,393.09 691.81,393.48 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="693.51,394.4 693.74,394.01 692.09,393.07 691.85,393.46 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="693.5,394.35 693.74,393.96 692.14,393.05 691.9,393.44 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="693.49,394.31 693.73,393.91 692.18,393.03 691.94,393.42 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="693.49,394.26 693.73,393.87 692.23,393.01 691.99,393.4 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="693.48,394.21 693.72,393.82 692.27,392.99 692.03,393.38 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="693.47,394.17 693.72,393.78 692.32,392.98 692.08,393.37 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="693.47,394.12 693.71,393.73 692.37,392.96 692.12,393.35 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="693.46,394.08 693.7,393.69 692.41,392.94 692.17,393.33 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="693.45,394.03 693.7,393.64 692.46,392.92 692.21,393.31 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="693.45,393.98 693.69,393.6 692.5,392.9 692.26,393.29 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="693.44,393.94 693.69,393.55 692.55,392.88 692.3,393.27 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="693.43,393.89 693.68,393.51 692.59,392.86 692.35,393.25 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="693.43,393.85 693.68,393.46 692.64,392.85 692.39,393.23 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="693.42,393.8 693.67,393.42 692.69,392.83 692.44,393.21 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="693.41,393.75 693.67,393.37 692.73,392.81 692.48,393.19 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="693.41,393.71 693.66,393.33 692.78,392.79 692.53,393.17 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="693.4,393.66 693.65,393.28 692.83,392.77 692.57,393.15 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="693.39,393.62 693.65,393.24 692.87,392.75 692.62,393.13 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="693.39,393.57 693.65,393.19 692.92,392.73 692.66,393.11 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="693.38,393.52 693.64,393.15 692.97,392.72 692.7,393.09 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="693.37,393.48 693.64,393.1 693.01,392.7 692.75,393.07 					" />
											</g>
											<g>
												<polygon className="navas76" points="693.36,393.43 693.63,393.06 693.06,392.68 692.79,393.05 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="700.34,400.89 700.57,400.49 695.44,397.75 695.21,398.15 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="700.33,400.84 700.56,400.44 695.48,397.73 695.26,398.13 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="700.33,400.8 700.55,400.4 695.53,397.72 695.3,398.11 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="700.32,400.75 700.55,400.35 695.58,397.7 695.35,398.1 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="700.31,400.71 700.54,400.31 695.62,397.68 695.39,398.08 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="700.31,400.66 700.53,400.26 695.67,397.66 695.44,398.06 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="700.3,400.62 700.53,400.22 695.71,397.64 695.48,398.04 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="700.29,400.57 700.52,400.17 695.76,397.62 695.53,398.02 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="700.29,400.52 700.52,400.12 695.8,397.6 695.57,398 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="700.28,400.48 700.51,400.08 695.85,397.58 695.62,397.98 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="700.28,400.43 700.5,400.03 695.89,397.56 695.67,397.96 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="700.27,400.39 700.5,399.99 695.94,397.55 695.71,397.94 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="700.26,400.34 700.49,399.94 695.99,397.53 695.76,397.92 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="700.26,400.29 700.49,399.9 696.03,397.51 695.8,397.91 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="700.25,400.25 700.48,399.85 696.08,397.49 695.85,397.89 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="700.24,400.2 700.47,399.8 696.12,397.47 695.89,397.87 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="700.24,400.16 700.47,399.76 696.17,397.45 695.94,397.85 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="700.23,400.11 700.46,399.71 696.21,397.43 695.98,397.83 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="700.23,400.06 700.45,399.67 696.26,397.41 696.03,397.81 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="700.22,400.02 700.45,399.62 696.3,397.39 696.08,397.79 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="700.21,399.97 700.44,399.57 696.35,397.38 696.12,397.77 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="700.21,399.93 700.44,399.53 696.4,397.36 696.17,397.75 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="700.2,399.88 700.43,399.48 696.44,397.34 696.21,397.73 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="700.19,399.84 700.42,399.44 696.49,397.32 696.26,397.72 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="700.19,399.79 700.42,399.39 696.53,397.3 696.3,397.7 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="700.18,399.74 700.41,399.35 696.58,397.28 696.35,397.68 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="700.18,399.7 700.41,399.3 696.62,397.26 696.39,397.66 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="700.17,399.65 700.4,399.25 696.67,397.24 696.44,397.64 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="700.16,399.61 700.39,399.21 696.72,397.22 696.49,397.62 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="700.16,399.56 700.39,399.16 696.76,397.2 696.53,397.6 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="700.15,399.51 700.38,399.12 696.81,397.19 696.58,397.58 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="700.14,399.47 700.38,399.07 696.85,397.17 696.62,397.56 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="700.14,399.42 700.37,399.03 696.9,397.15 696.67,397.54 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="700.13,399.38 700.36,398.98 696.94,397.13 696.71,397.53 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="700.13,399.33 700.36,398.93 696.99,397.11 696.76,397.51 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="700.12,399.29 700.35,398.89 697.03,397.09 696.8,397.49 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="700.11,399.24 700.34,398.84 697.08,397.07 696.85,397.47 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="700.11,399.19 700.34,398.8 697.13,397.05 696.9,397.45 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="700.1,399.15 700.33,398.75 697.17,397.03 696.94,397.43 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="700.09,399.1 700.33,398.7 697.22,397.02 696.99,397.41 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="700.09,399.06 700.32,398.66 697.26,397 697.03,397.39 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="700.08,399.01 700.31,398.61 697.31,396.98 697.08,397.37 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="700.08,398.96 700.31,398.57 697.35,396.96 697.12,397.35 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="700.07,398.92 700.3,398.52 697.4,396.94 697.17,397.34 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="700.06,398.87 700.3,398.48 697.45,396.92 697.21,397.32 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="700.06,398.83 700.29,398.43 697.49,396.9 697.26,397.3 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="700.05,398.78 700.28,398.38 697.54,396.88 697.3,397.28 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="700.04,398.74 700.28,398.34 697.58,396.86 697.35,397.26 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="700.04,398.69 700.27,398.29 697.63,396.85 697.4,397.24 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="700.03,398.64 700.27,398.25 697.67,396.83 697.44,397.22 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="700.03,398.6 700.26,398.2 697.72,396.81 697.49,397.2 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="700.02,398.55 700.25,398.16 697.77,396.79 697.53,397.18 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="700.01,398.51 700.25,398.11 697.81,396.77 697.58,397.16 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="700.01,398.46 700.24,398.06 697.86,396.75 697.62,397.15 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="700,398.41 700.23,398.02 697.9,396.73 697.67,397.13 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="699.99,398.37 700.23,397.97 697.95,396.71 697.71,397.11 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="699.99,398.32 700.22,397.93 697.99,396.69 697.76,397.09 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="699.98,398.28 700.22,397.88 698.04,396.68 697.8,397.07 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="699.98,398.23 700.21,397.84 698.09,396.66 697.85,397.05 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="699.97,398.19 700.2,397.79 698.13,396.64 697.89,397.03 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="699.96,398.14 700.2,397.74 698.18,396.62 697.94,397.01 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="699.96,398.09 700.19,397.7 698.22,396.6 697.99,396.99 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="699.95,398.05 700.19,397.65 698.27,396.58 698.03,396.97 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="699.94,398 700.18,397.61 698.31,396.56 698.08,396.96 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="699.94,397.96 700.17,397.56 698.36,396.54 698.12,396.94 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="699.93,397.91 700.17,397.52 698.41,396.52 698.17,396.92 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="699.92,397.86 700.16,397.47 698.45,396.51 698.21,396.9 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="699.92,397.82 700.16,397.43 698.5,396.49 698.26,396.88 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="699.91,397.77 700.15,397.38 698.54,396.47 698.3,396.86 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="699.9,397.73 700.14,397.33 698.59,396.45 698.35,396.84 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="699.9,397.68 700.14,397.29 698.63,396.43 698.39,396.82 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="699.89,397.63 700.13,397.24 698.68,396.41 698.44,396.8 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="699.89,397.59 700.13,397.2 698.73,396.39 698.48,396.78 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="699.88,397.54 700.12,397.15 698.77,396.37 698.53,396.76 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="699.87,397.5 700.12,397.11 698.82,396.36 698.57,396.74 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="699.87,397.45 700.11,397.06 698.86,396.34 698.62,396.73 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="699.86,397.4 700.1,397.02 698.91,396.32 698.66,396.71 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="699.85,397.36 700.1,396.97 698.96,396.3 698.71,396.69 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="699.85,397.31 700.09,396.92 699,396.28 698.75,396.67 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="699.84,397.27 700.09,396.88 699.05,396.26 698.8,396.65 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="699.83,397.22 700.08,396.83 699.09,396.24 698.84,396.63 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="699.83,397.17 700.08,396.79 699.14,396.22 698.89,396.61 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="699.82,397.13 700.07,396.74 699.19,396.21 698.93,396.59 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="699.81,397.08 700.07,396.7 699.23,396.19 698.98,396.57 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="699.8,397.03 700.06,396.65 699.28,396.17 699.02,396.55 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="699.8,396.99 700.06,396.61 699.33,396.15 699.07,396.53 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="699.79,396.94 700.05,396.56 699.37,396.13 699.11,396.51 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="699.78,396.9 700.05,396.52 699.42,396.12 699.16,396.49 					" />
											</g>
											<g>
												<polygon className="navas76" points="699.77,396.85 700.04,396.47 699.47,396.1 699.2,396.47 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="706.69,404.3 706.92,403.9 701.77,401.16 701.54,401.56 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="706.68,404.26 706.91,403.86 701.82,401.14 701.59,401.54 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="706.68,404.21 706.9,403.81 701.86,401.12 701.64,401.52 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="706.67,404.17 706.9,403.77 701.91,401.1 701.68,401.5 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="706.66,404.12 706.89,403.72 701.95,401.08 701.73,401.48 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="706.66,404.07 706.88,403.67 702,401.06 701.77,401.46 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="706.65,404.03 706.88,403.63 702.05,401.04 701.82,401.44 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="706.64,403.98 706.87,403.58 702.09,401.03 701.86,401.42 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="706.64,403.94 706.87,403.54 702.14,401.01 701.91,401.41 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="706.63,403.89 706.86,403.49 702.18,400.99 701.95,401.39 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="706.62,403.84 706.85,403.44 702.23,400.97 702,401.37 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="706.62,403.8 706.85,403.4 702.27,400.95 702.05,401.35 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="706.61,403.75 706.84,403.35 702.32,400.93 702.09,401.33 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="706.61,403.71 706.83,403.31 702.37,400.91 702.14,401.31 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="706.6,403.66 706.83,403.26 702.41,400.89 702.18,401.29 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="706.59,403.61 706.82,403.22 702.46,400.87 702.23,401.27 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="706.59,403.57 706.82,403.17 702.5,400.85 702.27,401.25 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="706.58,403.52 706.81,403.12 702.55,400.84 702.32,401.23 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="706.57,403.48 706.8,403.08 702.59,400.82 702.36,401.22 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="706.57,403.43 706.8,403.03 702.64,400.8 702.41,401.2 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="706.56,403.38 706.79,402.99 702.68,400.78 702.46,401.18 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="706.55,403.34 706.78,402.94 702.73,400.76 702.5,401.16 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="706.55,403.29 706.78,402.89 702.78,400.74 702.55,401.14 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="706.54,403.25 706.77,402.85 702.82,400.72 702.59,401.12 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="706.54,403.2 706.77,402.8 702.87,400.7 702.64,401.1 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="706.53,403.16 706.76,402.76 702.91,400.68 702.68,401.08 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="706.52,403.11 706.75,402.71 702.96,400.66 702.73,401.06 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="706.52,403.06 706.75,402.66 703,400.65 702.77,401.04 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="706.51,403.02 706.74,402.62 703.05,400.63 702.82,401.03 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="706.5,402.97 706.73,402.57 703.1,400.61 702.87,401.01 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="706.5,402.93 706.73,402.53 703.14,400.59 702.91,400.99 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="706.49,402.88 706.72,402.48 703.19,400.57 702.96,400.97 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="706.49,402.83 706.72,402.43 703.23,400.55 703,400.95 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="706.48,402.79 706.71,402.39 703.28,400.53 703.05,400.93 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="706.47,402.74 706.7,402.34 703.32,400.51 703.09,400.91 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="706.47,402.7 706.7,402.3 703.37,400.49 703.14,400.89 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="706.46,402.65 706.69,402.25 703.42,400.48 703.19,400.87 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="706.45,402.6 706.68,402.21 703.46,400.46 703.23,400.85 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="706.45,402.56 706.68,402.16 703.51,400.44 703.28,400.84 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="706.44,402.51 706.67,402.11 703.55,400.42 703.32,400.82 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="706.43,402.47 706.67,402.07 703.6,400.4 703.37,400.8 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="706.43,402.42 706.66,402.02 703.64,400.38 703.41,400.78 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="706.42,402.37 706.65,401.98 703.69,400.36 703.46,400.76 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="706.42,402.33 706.65,401.93 703.74,400.34 703.5,400.74 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="706.41,402.28 706.64,401.88 703.78,400.32 703.55,400.72 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="706.4,402.24 706.63,401.84 703.83,400.3 703.6,400.7 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="706.4,402.19 706.63,401.79 703.87,400.29 703.64,400.68 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="706.39,402.14 706.62,401.75 703.92,400.27 703.69,400.66 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="706.38,402.1 706.62,401.7 703.96,400.25 703.73,400.64 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="706.38,402.05 706.61,401.65 704.01,400.23 703.78,400.63 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="706.37,402.01 706.6,401.61 704.06,400.21 703.82,400.61 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="706.36,401.96 706.6,401.56 704.1,400.19 703.87,400.59 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="706.36,401.91 706.59,401.52 704.15,400.17 703.91,400.57 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="706.35,401.87 706.59,401.47 704.19,400.15 703.96,400.55 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="706.35,401.82 706.58,401.43 704.24,400.13 704,400.53 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="706.34,401.78 706.57,401.38 704.28,400.12 704.05,400.51 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="706.33,401.73 706.57,401.33 704.33,400.1 704.1,400.49 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="706.33,401.68 706.56,401.29 704.38,400.08 704.14,400.47 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="706.32,401.64 706.55,401.24 704.42,400.06 704.19,400.45 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="706.31,401.59 706.55,401.2 704.47,400.04 704.23,400.43 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="706.31,401.55 706.54,401.15 704.51,400.02 704.28,400.42 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="706.3,401.5 706.54,401.11 704.56,400 704.32,400.4 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="706.29,401.45 706.53,401.06 704.6,399.98 704.37,400.38 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="706.29,401.41 706.52,401.01 704.65,399.96 704.41,400.36 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="706.28,401.36 706.52,400.97 704.7,399.95 704.46,400.34 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="706.27,401.32 706.51,400.92 704.74,399.93 704.5,400.32 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="706.27,401.27 706.51,400.88 704.79,399.91 704.55,400.3 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="706.26,401.22 706.5,400.83 704.83,399.89 704.6,400.28 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="706.25,401.18 706.49,400.78 704.88,399.87 704.64,400.26 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="706.25,401.13 706.49,400.74 704.93,399.85 704.69,400.24 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="706.24,401.09 706.48,400.69 704.97,399.83 704.73,400.22 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="706.23,401.04 706.48,400.65 705.02,399.81 704.78,400.21 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="706.23,400.99 706.47,400.6 705.06,399.79 704.82,400.19 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="706.22,400.95 706.46,400.56 705.11,399.78 704.87,400.17 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="706.21,400.9 706.46,400.51 705.16,399.76 704.91,400.15 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="706.21,400.86 706.45,400.47 705.2,399.74 704.96,400.13 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="706.2,400.81 706.45,400.42 705.25,399.72 705,400.11 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="706.19,400.76 706.44,400.37 705.29,399.7 705.05,400.09 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="706.19,400.72 706.43,400.33 705.34,399.68 705.09,400.07 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="706.18,400.67 706.43,400.28 705.39,399.66 705.14,400.05 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="706.17,400.62 706.42,400.24 705.43,399.64 705.18,400.03 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="706.17,400.58 706.42,400.19 705.48,399.63 705.23,400.01 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="706.16,400.53 706.41,400.15 705.53,399.61 705.27,399.99 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="706.15,400.49 706.41,400.1 705.57,399.59 705.32,399.97 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="706.15,400.44 706.4,400.06 705.62,399.57 705.36,399.95 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="706.14,400.39 706.4,400.01 705.67,399.55 705.41,399.93 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="706.13,400.35 706.39,399.97 705.71,399.53 705.45,399.91 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="706.12,400.3 706.39,399.92 705.76,399.52 705.5,399.89 					" />
											</g>
											<g>
												<polygon className="navas76" points="706.11,400.25 706.38,399.88 705.81,399.5 705.54,399.87 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="713.16,407.73 713.39,407.33 708.23,404.58 708,404.98 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="713.16,407.69 713.39,407.29 708.28,404.56 708.05,404.96 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="713.15,407.64 713.38,407.24 708.32,404.54 708.09,404.94 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="713.14,407.6 713.37,407.19 708.37,404.52 708.14,404.92 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="713.14,407.55 713.37,407.15 708.41,404.5 708.19,404.9 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="713.13,407.5 713.36,407.1 708.46,404.48 708.23,404.88 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="713.13,407.46 713.35,407.06 708.51,404.46 708.28,404.86 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="713.12,407.41 713.35,407.01 708.55,404.44 708.32,404.85 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="713.11,407.36 713.34,406.96 708.6,404.43 708.37,404.83 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="713.11,407.32 713.33,406.92 708.64,404.41 708.41,404.81 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="713.1,407.27 713.33,406.87 708.69,404.39 708.46,404.79 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="713.09,407.23 713.32,406.83 708.73,404.37 708.51,404.77 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="713.09,407.18 713.32,406.78 708.78,404.35 708.55,404.75 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="713.08,407.13 713.31,406.73 708.83,404.33 708.6,404.73 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="713.07,407.09 713.3,406.69 708.87,404.31 708.64,404.71 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="713.07,407.04 713.3,406.64 708.92,404.29 708.69,404.69 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="713.06,407 713.29,406.6 708.96,404.27 708.73,404.67 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="713.05,406.95 713.28,406.55 709.01,404.25 708.78,404.65 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="713.05,406.9 713.28,406.5 709.05,404.24 708.83,404.64 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="713.04,406.86 713.27,406.46 709.1,404.22 708.87,404.62 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="713.04,406.81 713.26,406.41 709.15,404.2 708.92,404.6 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="713.03,406.77 713.26,406.37 709.19,404.18 708.96,404.58 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="713.02,406.72 713.25,406.32 709.24,404.16 709.01,404.56 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="713.02,406.67 713.25,406.27 709.28,404.14 709.05,404.54 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="713.01,406.63 713.24,406.23 709.33,404.12 709.1,404.52 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="713,406.58 713.23,406.18 709.37,404.1 709.14,404.5 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="713,406.54 713.23,406.14 709.42,404.08 709.19,404.48 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="712.99,406.49 713.22,406.09 709.47,404.06 709.24,404.46 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="712.98,406.44 713.21,406.04 709.51,404.05 709.28,404.44 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="712.98,406.4 713.21,406 709.56,404.03 709.33,404.43 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="712.97,406.35 713.2,405.95 709.6,404.01 709.37,404.41 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="712.96,406.3 713.19,405.91 709.65,403.99 709.42,404.39 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="712.96,406.26 713.19,405.86 709.69,403.97 709.46,404.37 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="712.95,406.21 713.18,405.81 709.74,403.95 709.51,404.35 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="712.95,406.17 713.18,405.77 709.79,403.93 709.56,404.33 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="712.94,406.12 713.17,405.72 709.83,403.91 709.6,404.31 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="712.93,406.07 713.16,405.68 709.88,403.89 709.65,404.29 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="712.93,406.03 713.16,405.63 709.92,403.87 709.69,404.27 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="712.92,405.98 713.15,405.58 709.97,403.86 709.74,404.25 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="712.91,405.94 713.14,405.54 710.01,403.84 709.78,404.24 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="712.91,405.89 713.14,405.49 710.06,403.82 709.83,404.22 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="712.9,405.84 713.13,405.45 710.11,403.8 709.88,404.2 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="712.89,405.8 713.12,405.4 710.15,403.78 709.92,404.18 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="712.89,405.75 713.12,405.35 710.2,403.76 709.97,404.16 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="712.88,405.71 713.11,405.31 710.24,403.74 710.01,404.14 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="712.87,405.66 713.11,405.26 710.29,403.72 710.06,404.12 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="712.87,405.61 713.1,405.22 710.34,403.7 710.1,404.1 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="712.86,405.57 713.09,405.17 710.38,403.68 710.15,404.08 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="712.85,405.52 713.09,405.12 710.43,403.67 710.19,404.06 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="712.85,405.48 713.08,405.08 710.47,403.65 710.24,404.04 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="712.84,405.43 713.07,405.03 710.52,403.63 710.29,404.03 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="712.84,405.38 713.07,404.99 710.56,403.61 710.33,404.01 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="712.83,405.34 713.06,404.94 710.61,403.59 710.38,403.99 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="712.82,405.29 713.06,404.89 710.66,403.57 710.42,403.97 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="712.82,405.24 713.05,404.85 710.7,403.55 710.47,403.95 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="712.81,405.2 713.04,404.8 710.75,403.53 710.51,403.93 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="712.8,405.15 713.04,404.76 710.79,403.51 710.56,403.91 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="712.8,405.11 713.03,404.71 710.84,403.5 710.6,403.89 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="712.79,405.06 713.02,404.66 710.89,403.48 710.65,403.87 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="712.78,405.01 713.02,404.62 710.93,403.46 710.7,403.85 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="712.78,404.97 713.01,404.57 710.98,403.44 710.74,403.83 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="712.77,404.92 713.01,404.53 711.02,403.42 710.79,403.81 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="712.76,404.88 713,404.48 711.07,403.4 710.83,403.8 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="712.76,404.83 712.99,404.43 711.11,403.38 710.88,403.78 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="712.75,404.78 712.99,404.39 711.16,403.36 710.92,403.76 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="712.74,404.74 712.98,404.34 711.21,403.34 710.97,403.74 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="712.74,404.69 712.98,404.3 711.25,403.32 711.01,403.72 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="712.73,404.65 712.97,404.25 711.3,403.31 711.06,403.7 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="712.72,404.6 712.96,404.2 711.34,403.29 711.1,403.68 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="712.72,404.55 712.96,404.16 711.39,403.27 711.15,403.66 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="712.71,404.51 712.95,404.11 711.44,403.25 711.2,403.64 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="712.7,404.46 712.94,404.07 711.48,403.23 711.24,403.62 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="712.7,404.41 712.94,404.02 711.53,403.21 711.29,403.6 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="712.69,404.37 712.93,403.98 711.57,403.19 711.33,403.58 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="712.68,404.32 712.93,403.93 711.62,403.17 711.38,403.57 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="712.68,404.28 712.92,403.88 711.67,403.16 711.42,403.55 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="712.67,404.23 712.91,403.84 711.71,403.14 711.47,403.53 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="712.66,404.18 712.91,403.79 711.76,403.12 711.51,403.51 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="712.66,404.14 712.9,403.75 711.8,403.1 711.56,403.49 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="712.65,404.09 712.9,403.7 711.85,403.08 711.6,403.47 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="712.64,404.04 712.89,403.66 711.9,403.06 711.65,403.45 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="712.63,404 712.89,403.61 711.94,403.04 711.69,403.43 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="712.63,403.95 712.88,403.57 711.99,403.02 711.74,403.41 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="712.62,403.9 712.87,403.52 712.04,403.01 711.78,403.39 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="712.61,403.86 712.87,403.47 712.08,402.99 711.83,403.37 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="712.61,403.81 712.86,403.43 712.13,402.97 711.87,403.35 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="712.6,403.76 712.86,403.38 712.18,402.95 711.92,403.33 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="712.59,403.72 712.85,403.34 712.22,402.93 711.96,403.31 					" />
											</g>
											<g>
												<polygon className="navas76" points="712.58,403.67 712.85,403.29 712.27,402.92 712,403.29 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="719.62,411.19 719.84,410.79 714.67,408.03 714.44,408.43 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="719.61,411.15 719.84,410.75 714.71,408.01 714.48,408.41 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="719.6,411.1 719.83,410.7 714.76,407.99 714.53,408.39 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="719.6,411.06 719.82,410.65 714.8,407.97 714.58,408.37 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="719.59,411.01 719.82,410.61 714.85,407.95 714.62,408.35 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="719.58,410.96 719.81,410.56 714.9,407.93 714.67,408.33 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="719.58,410.92 719.8,410.51 714.94,407.91 714.71,408.31 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="719.57,410.87 719.8,410.47 714.99,407.89 714.76,408.3 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="719.56,410.82 719.79,410.42 715.03,407.88 714.8,408.28 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="719.56,410.78 719.79,410.38 715.08,407.86 714.85,408.26 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="719.55,410.73 719.78,410.33 715.12,407.84 714.9,408.24 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="719.54,410.69 719.77,410.28 715.17,407.82 714.94,408.22 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="719.54,410.64 719.77,410.24 715.22,407.8 714.99,408.2 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="719.53,410.59 719.76,410.19 715.26,407.78 715.03,408.18 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="719.53,410.55 719.75,410.14 715.31,407.76 715.08,408.16 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="719.52,410.5 719.75,410.1 715.35,407.74 715.13,408.14 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="719.51,410.45 719.74,410.05 715.4,407.72 715.17,408.12 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="719.51,410.41 719.73,410.01 715.44,407.7 715.22,408.1 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="719.5,410.36 719.73,409.96 715.49,407.68 715.26,408.09 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="719.49,410.32 719.72,409.91 715.54,407.67 715.31,408.07 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="719.49,410.27 719.71,409.87 715.58,407.65 715.35,408.05 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="719.48,410.22 719.71,409.82 715.63,407.63 715.4,408.03 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="719.47,410.18 719.7,409.78 715.67,407.61 715.45,408.01 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="719.47,410.13 719.7,409.73 715.72,407.59 715.49,407.99 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="719.46,410.08 719.69,409.68 715.77,407.57 715.54,407.97 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="719.45,410.04 719.68,409.64 715.81,407.55 715.58,407.95 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="719.45,409.99 719.68,409.59 715.86,407.53 715.63,407.93 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="719.44,409.95 719.67,409.54 715.9,407.51 715.67,407.91 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="719.43,409.9 719.66,409.5 715.95,407.49 715.72,407.89 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="719.43,409.85 719.66,409.45 715.99,407.48 715.77,407.88 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="719.42,409.81 719.65,409.41 716.04,407.46 715.81,407.86 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="719.41,409.76 719.64,409.36 716.09,407.44 715.86,407.84 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="719.41,409.71 719.64,409.31 716.13,407.42 715.9,407.82 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="719.4,409.67 719.63,409.27 716.18,407.4 715.95,407.8 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="719.39,409.62 719.62,409.22 716.22,407.38 715.99,407.78 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="719.39,409.58 719.62,409.18 716.27,407.36 716.04,407.76 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="719.38,409.53 719.61,409.13 716.32,407.34 716.09,407.74 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="719.38,409.48 719.61,409.08 716.36,407.32 716.13,407.72 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="719.37,409.44 719.6,409.04 716.41,407.3 716.18,407.7 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="719.36,409.39 719.59,408.99 716.45,407.29 716.22,407.68 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="719.36,409.35 719.59,408.95 716.5,407.27 716.27,407.67 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="719.35,409.3 719.58,408.9 716.54,407.25 716.31,407.65 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="719.34,409.25 719.57,408.85 716.59,407.23 716.36,407.63 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="719.34,409.21 719.57,408.81 716.64,407.21 716.4,407.61 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="719.33,409.16 719.56,408.76 716.68,407.19 716.45,407.59 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="719.32,409.11 719.55,408.71 716.73,407.17 716.5,407.57 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="719.32,409.07 719.55,408.67 716.77,407.15 716.54,407.55 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="719.31,409.02 719.54,408.62 716.82,407.13 716.59,407.53 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="719.3,408.98 719.53,408.58 716.87,407.11 716.63,407.51 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="719.3,408.93 719.53,408.53 716.91,407.1 716.68,407.49 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="719.29,408.88 719.52,408.48 716.96,407.08 716.72,407.47 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="719.28,408.84 719.52,408.44 717,407.06 716.77,407.46 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="719.28,408.79 719.51,408.39 717.05,407.04 716.82,407.44 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="719.27,408.74 719.5,408.35 717.09,407.02 716.86,407.42 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="719.26,408.7 719.5,408.3 717.14,407 716.91,407.4 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="719.26,408.65 719.49,408.25 717.19,406.98 716.95,407.38 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="719.25,408.61 719.48,408.21 717.23,406.96 717,407.36 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="719.24,408.56 719.48,408.16 717.28,406.94 717.04,407.34 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="719.24,408.51 719.47,408.12 717.32,406.92 717.09,407.32 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="719.23,408.47 719.46,408.07 717.37,406.91 717.14,407.3 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="719.22,408.42 719.46,408.02 717.42,406.89 717.18,407.28 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="719.22,408.37 719.45,407.98 717.46,406.87 717.23,407.26 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="719.21,408.33 719.45,407.93 717.51,406.85 717.27,407.24 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="719.2,408.28 719.44,407.89 717.55,406.83 717.32,407.23 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="719.2,408.24 719.43,407.84 717.6,406.81 717.36,407.21 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="719.19,408.19 719.43,407.79 717.65,406.79 717.41,407.19 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="719.18,408.14 719.42,407.75 717.69,406.77 717.45,407.17 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="719.18,408.1 719.41,407.7 717.74,406.75 717.5,407.15 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="719.17,408.05 719.41,407.66 717.78,406.73 717.55,407.13 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="719.16,408 719.4,407.61 717.83,406.72 717.59,407.11 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="719.16,407.96 719.4,407.56 717.88,406.7 717.64,407.09 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="719.15,407.91 719.39,407.52 717.92,406.68 717.68,407.07 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="719.14,407.87 719.38,407.47 717.97,406.66 717.73,407.05 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="719.14,407.82 719.38,407.43 718.01,406.64 717.77,407.03 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="719.13,407.77 719.37,407.38 718.06,406.62 717.82,407.01 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="719.12,407.73 719.37,407.33 718.11,406.6 717.86,406.99 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="719.11,407.68 719.36,407.29 718.15,406.58 717.91,406.98 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="719.11,407.63 719.35,407.24 718.2,406.56 717.95,406.96 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="719.1,407.59 719.35,407.2 718.25,406.55 718,406.94 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="719.09,407.54 719.34,407.15 718.29,406.53 718.04,406.92 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="719.09,407.49 719.34,407.11 718.34,406.51 718.09,406.9 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="719.08,407.45 719.33,407.06 718.38,406.49 718.13,406.88 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="719.07,407.4 719.32,407.01 718.43,406.47 718.18,406.86 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="719.06,407.35 719.32,406.97 718.48,406.45 718.22,406.84 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="719.06,407.31 719.31,406.92 718.53,406.43 718.27,406.82 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="719.05,407.26 719.31,406.88 718.57,406.42 718.31,406.8 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="719.04,407.21 719.3,406.83 718.62,406.4 718.36,406.78 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="719.03,407.17 719.3,406.79 718.67,406.38 718.4,406.76 					" />
											</g>
											<g>
												<polygon className="navas76" points="719.03,407.12 719.29,406.74 718.71,406.36 718.45,406.74 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="726.08,414.57 726.3,414.17 721.11,411.39 720.88,411.8 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="726.07,414.52 726.3,414.12 721.16,411.38 720.93,411.78 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="726.06,414.48 726.29,414.07 721.2,411.36 720.97,411.76 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="726.06,414.43 726.28,414.03 721.25,411.34 721.02,411.74 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="726.05,414.39 726.28,413.98 721.29,411.32 721.07,411.72 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="726.04,414.34 726.27,413.94 721.34,411.3 721.11,411.7 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="726.04,414.29 726.26,413.89 721.38,411.28 721.16,411.68 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="726.03,414.25 726.26,413.84 721.43,411.26 721.2,411.66 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="726.02,414.2 726.25,413.8 721.48,411.24 721.25,411.64 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="726.02,414.15 726.24,413.75 721.52,411.22 721.29,411.63 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="726.01,414.11 726.24,413.7 721.57,411.2 721.34,411.61 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="726,414.06 726.23,413.66 721.61,411.18 721.39,411.59 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="726,414.01 726.22,413.61 721.66,411.17 721.43,411.57 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="725.99,413.97 726.22,413.57 721.71,411.15 721.48,411.55 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="725.98,413.92 726.21,413.52 721.75,411.13 721.52,411.53 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="725.98,413.88 726.21,413.47 721.8,411.11 721.57,411.51 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="725.97,413.83 726.2,413.43 721.84,411.09 721.62,411.49 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="725.96,413.78 726.19,413.38 721.89,411.07 721.66,411.47 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="725.96,413.74 726.19,413.33 721.94,411.05 721.71,411.45 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="725.95,413.69 726.18,413.29 721.98,411.03 721.75,411.43 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="725.94,413.64 726.17,413.24 722.03,411.01 721.8,411.41 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="725.94,413.6 726.17,413.19 722.07,410.99 721.84,411.4 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="725.93,413.55 726.16,413.15 722.12,410.98 721.89,411.38 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="725.92,413.5 726.15,413.1 722.16,410.96 721.94,411.36 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="725.92,413.46 726.15,413.06 722.21,410.94 721.98,411.34 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="725.91,413.41 726.14,413.01 722.26,410.92 722.03,411.32 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="725.9,413.37 726.13,412.96 722.3,410.9 722.07,411.3 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="725.9,413.32 726.13,412.92 722.35,410.88 722.12,411.28 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="725.89,413.27 726.12,412.87 722.39,410.86 722.16,411.26 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="725.88,413.23 726.11,412.82 722.44,410.84 722.21,411.24 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="725.88,413.18 726.11,412.78 722.49,410.82 722.26,411.22 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="725.87,413.13 726.1,412.73 722.53,410.8 722.3,411.2 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="725.86,413.09 726.09,412.69 722.58,410.78 722.35,411.19 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="725.86,413.04 726.09,412.64 722.62,410.77 722.39,411.17 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="725.85,413 726.08,412.59 722.67,410.75 722.44,411.15 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="725.84,412.95 726.07,412.55 722.72,410.73 722.49,411.13 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="725.84,412.9 726.07,412.5 722.76,410.71 722.53,411.11 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="725.83,412.86 726.06,412.45 722.81,410.69 722.58,411.09 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="725.82,412.81 726.05,412.41 722.85,410.67 722.62,411.07 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="725.82,412.76 726.05,412.36 722.9,410.65 722.67,411.05 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="725.81,412.72 726.04,412.32 722.94,410.63 722.71,411.03 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="725.8,412.67 726.04,412.27 722.99,410.61 722.76,411.01 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="725.8,412.62 726.03,412.22 723.04,410.59 722.81,410.99 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="725.79,412.58 726.02,412.18 723.08,410.57 722.85,410.97 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="725.78,412.53 726.02,412.13 723.13,410.56 722.9,410.96 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="725.78,412.49 726.01,412.08 723.17,410.54 722.94,410.94 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="725.77,412.44 726,412.04 723.22,410.52 722.99,410.92 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="725.76,412.39 726,411.99 723.27,410.5 723.03,410.9 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="725.76,412.35 725.99,411.95 723.31,410.48 723.08,410.88 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="725.75,412.3 725.98,411.9 723.36,410.46 723.13,410.86 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="725.74,412.25 725.98,411.85 723.4,410.44 723.17,410.84 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="725.74,412.21 725.97,411.81 723.45,410.42 723.22,410.82 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="725.73,412.16 725.96,411.76 723.5,410.4 723.26,410.8 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="725.72,412.11 725.96,411.72 723.54,410.38 723.31,410.78 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="725.72,412.07 725.95,411.67 723.59,410.37 723.35,410.76 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="725.71,412.02 725.94,411.62 723.63,410.35 723.4,410.74 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="725.7,411.98 725.94,411.58 723.68,410.33 723.45,410.73 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="725.7,411.93 725.93,411.53 723.73,410.31 723.49,410.71 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="725.69,411.88 725.93,411.48 723.77,410.29 723.54,410.69 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="725.68,411.84 725.92,411.44 723.82,410.27 723.58,410.67 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="725.68,411.79 725.91,411.39 723.86,410.25 723.63,410.65 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="725.67,411.74 725.91,411.35 723.91,410.23 723.67,410.63 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="725.66,411.7 725.9,411.3 723.96,410.21 723.72,410.61 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="725.66,411.65 725.89,411.25 724,410.19 723.77,410.59 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="725.65,411.6 725.89,411.21 724.05,410.18 723.81,410.57 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="725.64,411.56 725.88,411.16 724.09,410.16 723.86,410.55 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="725.64,411.51 725.87,411.12 724.14,410.14 723.9,410.53 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="725.63,411.47 725.87,411.07 724.19,410.12 723.95,410.51 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="725.62,411.42 725.86,411.02 724.23,410.1 723.99,410.5 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="725.62,411.37 725.85,410.98 724.28,410.08 724.04,410.48 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="725.61,411.33 725.85,410.93 724.32,410.06 724.08,410.46 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="725.6,411.28 725.84,410.89 724.37,410.04 724.13,410.44 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="725.6,411.23 725.84,410.84 724.42,410.02 724.18,410.42 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="725.59,411.19 725.83,410.79 724.46,410 724.22,410.4 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="725.58,411.14 725.82,410.75 724.51,409.99 724.27,410.38 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="725.57,411.09 725.82,410.7 724.56,409.97 724.31,410.36 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="725.57,411.05 725.81,410.65 724.6,409.95 724.36,410.34 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="725.56,411 725.81,410.61 724.65,409.93 724.4,410.32 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="725.55,410.95 725.8,410.56 724.69,409.91 724.45,410.3 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="725.55,410.91 725.79,410.52 724.74,409.89 724.49,410.28 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="725.54,410.86 725.79,410.47 724.79,409.87 724.54,410.26 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="725.53,410.81 725.78,410.43 724.83,409.85 724.58,410.24 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="725.52,410.77 725.78,410.38 724.88,409.84 724.63,410.22 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="725.52,410.72 725.77,410.33 724.93,409.82 724.67,410.2 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="725.51,410.67 725.76,410.29 724.97,409.8 724.72,410.18 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="725.5,410.63 725.76,410.24 725.02,409.78 724.76,410.16 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="725.49,410.58 725.75,410.2 725.07,409.76 724.81,410.14 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="725.49,410.53 725.75,410.15 725.12,409.74 724.85,410.12 					" />
											</g>
											<g>
												<polygon className="navas76" points="725.48,410.49 725.74,410.11 725.16,409.73 724.9,410.1 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="732.59,418.05 732.81,417.65 727.6,414.87 727.38,415.27 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="732.58,418.01 732.81,417.6 727.65,414.85 727.42,415.25 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="732.57,417.96 732.8,417.55 727.7,414.83 727.47,415.23 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="732.57,417.91 732.79,417.51 727.74,414.81 727.51,415.21 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="732.56,417.87 732.79,417.46 727.79,414.79 727.56,415.19 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="732.55,417.82 732.78,417.42 727.83,414.77 727.61,415.17 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="732.55,417.77 732.77,417.37 727.88,414.75 727.65,415.15 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="732.54,417.73 732.77,417.32 727.93,414.73 727.7,415.14 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="732.53,417.68 732.76,417.28 727.97,414.71 727.74,415.12 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="732.53,417.63 732.75,417.23 728.02,414.69 727.79,415.1 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="732.52,417.59 732.75,417.18 728.06,414.68 727.84,415.08 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="732.51,417.54 732.74,417.14 728.11,414.66 727.88,415.06 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="732.51,417.49 732.73,417.09 728.15,414.64 727.93,415.04 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="732.5,417.45 732.73,417.04 728.2,414.62 727.97,415.02 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="732.49,417.4 732.72,417 728.25,414.6 728.02,415 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="732.49,417.35 732.72,416.95 728.29,414.58 728.07,414.98 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="732.48,417.31 732.71,416.9 728.34,414.56 728.11,414.96 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="732.47,417.26 732.7,416.86 728.38,414.54 728.16,414.94 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="732.47,417.22 732.69,416.81 728.43,414.52 728.2,414.92 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="732.46,417.17 732.69,416.77 728.48,414.5 728.25,414.91 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="732.45,417.12 732.68,416.72 728.52,414.48 728.29,414.89 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="732.45,417.08 732.68,416.67 728.57,414.46 728.34,414.87 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="732.44,417.03 732.67,416.63 728.61,414.45 728.39,414.85 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="732.43,416.98 732.66,416.58 728.66,414.43 728.43,414.83 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="732.43,416.94 732.65,416.53 728.71,414.41 728.48,414.81 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="732.42,416.89 732.65,416.49 728.75,414.39 728.52,414.79 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="732.41,416.84 732.64,416.44 728.8,414.37 728.57,414.77 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="732.41,416.8 732.64,416.39 728.84,414.35 728.62,414.75 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="732.4,416.75 732.63,416.35 728.89,414.33 728.66,414.73 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="732.39,416.7 732.62,416.3 728.94,414.31 728.71,414.71 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="732.39,416.66 732.62,416.26 728.98,414.29 728.75,414.69 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="732.38,416.61 732.61,416.21 729.03,414.27 728.8,414.68 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="732.37,416.56 732.6,416.16 729.07,414.25 728.84,414.66 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="732.37,416.52 732.6,416.12 729.12,414.24 728.89,414.64 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="732.36,416.47 732.59,416.07 729.17,414.22 728.94,414.62 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="732.35,416.43 732.58,416.02 729.21,414.2 728.98,414.6 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="732.35,416.38 732.58,415.98 729.26,414.18 729.03,414.58 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="732.34,416.33 732.57,415.93 729.3,414.16 729.07,414.56 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="732.33,416.29 732.56,415.88 729.35,414.14 729.12,414.54 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="732.33,416.24 732.56,415.84 729.4,414.12 729.17,414.52 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="732.32,416.19 732.55,415.79 729.44,414.1 729.21,414.5 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="732.31,416.15 732.54,415.75 729.49,414.08 729.26,414.48 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="732.31,416.1 732.54,415.7 729.53,414.06 729.3,414.46 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="732.3,416.05 732.53,415.65 729.58,414.04 729.35,414.45 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="732.29,416.01 732.52,415.61 729.63,414.03 729.39,414.43 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="732.28,415.96 732.52,415.56 729.67,414.01 729.44,414.41 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="732.28,415.91 732.51,415.51 729.72,413.99 729.49,414.39 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="732.27,415.87 732.5,415.47 729.76,413.97 729.53,414.37 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="732.26,415.82 732.5,415.42 729.81,413.95 729.58,414.35 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="732.26,415.78 732.49,415.37 729.86,413.93 729.62,414.33 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="732.25,415.73 732.48,415.33 729.9,413.91 729.67,414.31 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="732.24,415.68 732.48,415.28 729.95,413.89 729.71,414.29 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="732.24,415.64 732.47,415.24 729.99,413.87 729.76,414.27 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="732.23,415.59 732.46,415.19 730.04,413.85 729.81,414.25 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="732.22,415.54 732.46,415.14 730.09,413.83 729.85,414.23 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="732.22,415.5 732.45,415.1 730.13,413.82 729.9,414.22 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="732.21,415.45 732.44,415.05 730.18,413.8 729.94,414.2 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="732.2,415.4 732.44,415 730.22,413.78 729.99,414.18 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="732.2,415.36 732.43,414.96 730.27,413.76 730.04,414.16 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="732.19,415.31 732.42,414.91 730.32,413.74 730.08,414.14 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="732.18,415.26 732.42,414.87 730.36,413.72 730.13,414.12 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="732.18,415.22 732.41,414.82 730.41,413.7 730.17,414.1 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="732.17,415.17 732.4,414.77 730.45,413.68 730.22,414.08 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="732.16,415.12 732.4,414.73 730.5,413.66 730.26,414.06 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="732.16,415.08 732.39,414.68 730.55,413.64 730.31,414.04 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="732.15,415.03 732.39,414.63 730.59,413.63 730.36,414.02 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="732.14,414.99 732.38,414.59 730.64,413.61 730.4,414 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="732.13,414.94 732.37,414.54 730.68,413.59 730.45,413.98 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="732.13,414.89 732.37,414.5 730.73,413.57 730.49,413.97 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="732.12,414.85 732.36,414.45 730.78,413.55 730.54,413.95 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="732.11,414.8 732.35,414.4 730.82,413.53 730.58,413.93 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="732.11,414.75 732.35,414.36 730.87,413.51 730.63,413.91 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="732.1,414.71 732.34,414.31 730.92,413.49 730.67,413.89 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="732.09,414.66 732.33,414.26 730.96,413.47 730.72,413.87 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="732.09,414.61 732.33,414.22 731.01,413.45 730.77,413.85 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="732.08,414.57 732.32,414.17 731.05,413.44 730.81,413.83 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="732.07,414.52 732.32,414.13 731.1,413.42 730.86,413.81 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="732.06,414.47 732.31,414.08 731.15,413.4 730.9,413.79 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="732.06,414.43 732.3,414.03 731.19,413.38 730.95,413.77 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="732.05,414.38 732.3,413.99 731.24,413.36 730.99,413.75 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="732.04,414.33 732.29,413.94 731.29,413.34 731.04,413.73 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="732.03,414.29 732.28,413.9 731.33,413.32 731.08,413.71 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="732.03,414.24 732.28,413.85 731.38,413.3 731.13,413.69 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="732.02,414.19 732.27,413.8 731.43,413.29 731.17,413.67 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="732.01,414.15 732.27,413.76 731.47,413.27 731.22,413.65 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="732,414.1 732.26,413.71 731.52,413.25 731.26,413.63 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="732,414.05 732.26,413.67 731.57,413.23 731.31,413.61 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="731.99,414 732.25,413.62 731.62,413.21 731.35,413.59 					" />
											</g>
											<g>
												<polygon className="navas76" points="731.98,413.96 732.25,413.58 731.66,413.19 731.4,413.57 					" />
											</g>
										</g>
									</g>
									<g>
										<path className="navas79" d="M643.01,402.75l41.89-23.38l-6-3.19l-41.84,23.34L643.01,402.75z M638,399.43l5.28-2.94l2.31,4.15
				L638,399.43z M675.77,384.03l-2.17-3.82l4.61,2.46L675.77,384.03z M672.88,379.98l2.35,4.12l-7.6-1.19L672.88,379.98z
				 M666.96,383.27l2.34,4.13l-7.6-1.19L666.96,383.27z M661.05,386.57l2.33,4.13l-7.59-1.2L661.05,386.57z M655.13,389.87
				l2.32,4.14l-7.59-1.2L655.13,389.87z M649.21,393.18l2.31,4.14l-7.59-1.2L649.21,393.18z M675.11,384.39l-2.44,1.36l-4.6-2.46
				L675.11,384.39z M669.85,387.33l-2.17-3.82l4.6,2.46L669.85,387.33z M669.19,387.7l-2.44,1.36l-4.6-2.46L669.19,387.7z
				 M663.93,390.64l-2.16-3.83l4.6,2.47L663.93,390.64z M663.27,391l-2.44,1.36l-4.59-2.47L663.27,391z M658,393.95l-2.15-3.83
				l4.59,2.47L658,393.95z M657.34,394.31l-2.44,1.36l-4.59-2.47L657.34,394.31z M652.07,397.26l-2.15-3.84l4.59,2.47L652.07,397.26
				z M651.41,397.62l-2.44,1.36l-4.58-2.48L651.41,397.62z M646.13,400.57l-2.14-3.84l4.58,2.48L646.13,400.57z M678.78,376.68
				l2.35,4.11l-7.61-1.18L678.78,376.68z M681.03,381.09l-2.44,1.36l-4.61-2.46L681.03,381.09z M643,402.32l-4.62-2.51l7.09,1.13
				L643,402.32z M684.11,379.37l-2.43,1.36l-2.18-3.81L684.11,379.37z"/>
										<path className="navas77" d="M636.93,393.06l0.12,6.46l41.84-23.34l-0.2-6.4L636.93,393.06z M637.49,393.18l5.27-2.94l-2.53,6.83
				L637.49,393.18z M643.39,395.55l-0.1-4.96l2.55,3.6L643.39,395.55z M670.16,380.62l2.29-6.28l0.15,4.93L670.16,380.62z
				 M648.67,386.95l-2.51,6.82l-2.75-3.88L648.67,386.95z M654.58,383.65l-2.5,6.81l-2.76-3.88L654.58,383.65z M660.49,380.36
				l-2.49,6.8l-2.76-3.87L660.49,380.36z M666.4,377.07l-2.48,6.79l-2.77-3.87L666.4,377.07z M672.3,373.78l-2.47,6.78l-2.78-3.86
				L672.3,373.78z M669.51,380.98l-2.43,1.36l-0.14-4.93L669.51,380.98z M664.25,383.91l2.3-6.29l0.14,4.93L664.25,383.91z
				 M663.6,384.28l-2.44,1.36l-0.13-4.94L663.6,384.28z M658.34,387.21l2.31-6.3l0.13,4.94L658.34,387.21z M657.68,387.58
				l-2.44,1.36l-0.12-4.95L657.68,387.58z M652.42,390.51l2.32-6.31l0.12,4.95L652.42,390.51z M651.76,390.88l-2.44,1.36l-0.11-4.95
				L651.76,390.88z M646.49,393.82l2.33-6.32l0.11,4.95L646.49,393.82z M678.19,370.49l-2.46,6.78l-2.79-3.85L678.19,370.49z
				 M675.42,377.69l-2.43,1.36l-0.15-4.93L675.42,377.69z M640.56,397.13l2.34-6.32l0.1,4.96L640.56,397.13z M678.5,375.97
				l-2.43,1.36l2.28-6.28L678.5,375.97z M637.44,398.87l-0.1-5.01l2.56,3.64L637.44,398.87z"/>
										<path className="navas169" d="M636.93,393.06l5.94,3.22l41.81-23.32l-5.99-3.17L636.93,393.06z M637.88,392.97l5.27-2.94l2.3,4.13
				L637.88,392.97z M648.82,392.52l-4.57-2.47l7.01,1.11L648.82,392.52z M675.57,377.6l-2.17-3.8l4.6,2.44L675.57,377.6z
				 M649.06,386.73l2.31,4.13l-7.57-1.19L649.06,386.73z M654.97,383.44l2.32,4.12l-7.58-1.19L654.97,383.44z M660.88,380.14
				l2.33,4.11l-7.58-1.19L660.88,380.14z M666.79,376.85l2.33,4.11l-7.58-1.18L666.79,376.85z M672.68,373.56l2.34,4.1l-7.59-1.18
				L672.68,373.56z M674.92,377.96l-2.43,1.36l-4.6-2.45L674.92,377.96z M669.66,380.9l-2.16-3.81l4.6,2.45L669.66,380.9z
				 M669.01,381.26l-2.43,1.36l-4.59-2.45L669.01,381.26z M663.75,384.19l-2.15-3.81l4.59,2.45L663.75,384.19z M663.1,384.56
				l-2.44,1.36l-4.59-2.46L663.1,384.56z M657.84,387.49l-2.15-3.82l4.58,2.46L657.84,387.49z M657.18,387.86l-2.44,1.36l-4.58-2.46
				L657.18,387.86z M651.91,390.79l-2.14-3.82l4.58,2.46L651.91,390.79z M678.58,370.28l2.35,4.1l-7.59-1.17L678.58,370.28z
				 M680.82,374.67l-2.43,1.36l-4.6-2.44L680.82,374.67z M645.99,394.1l-2.13-3.83l4.57,2.47L645.99,394.1z M683.9,372.95
				l-2.43,1.36l-2.18-3.79L683.9,372.95z M642.87,395.84l-4.61-2.49l7.07,1.12L642.87,395.84z"/>
										<path className="navas77" d="M642.88,396.27l0.14,6.48l41.89-23.38l-0.21-6.42L642.88,396.27z M643.43,396.4l5.27-2.94l-2.52,6.84
				L643.43,396.4z M649.36,398.77l-0.11-4.97l2.56,3.61L649.36,398.77z M676.15,383.81l2.28-6.3l0.16,4.94L676.15,383.81z
				 M654.63,390.15l-2.51,6.83l-2.76-3.89L654.63,390.15z M660.55,386.85l-2.5,6.83l-2.77-3.89L660.55,386.85z M666.47,383.55
				l-2.48,6.82l-2.78-3.88L666.47,383.55z M672.38,380.26l-2.47,6.81l-2.78-3.88L672.38,380.26z M678.28,376.96l-2.46,6.8
				l-2.79-3.87L678.28,376.96z M675.5,384.18l-2.44,1.36l-0.15-4.95L675.5,384.18z M670.24,387.12l2.29-6.31l0.15,4.95
				L670.24,387.12z M669.58,387.48l-2.44,1.36l-0.14-4.95L669.58,387.48z M664.31,390.42l2.3-6.31l0.14,4.95L664.31,390.42z
				 M663.66,390.79l-2.44,1.36l-0.13-4.96L663.66,390.79z M658.39,393.73l2.31-6.32l0.13,4.96L658.39,393.73z M657.73,394.1
				l-2.44,1.36l-0.12-4.97L657.73,394.1z M652.46,397.04l2.32-6.33l0.12,4.97L652.46,397.04z M684.18,373.67l-2.45,6.79l-2.8-3.86
				L684.18,373.67z M681.41,380.88l-2.44,1.36l-0.16-4.94L681.41,380.88z M646.52,400.35l2.33-6.34l0.11,4.97L646.52,400.35z
				 M684.5,379.15l-2.43,1.36l2.27-6.29L684.5,379.15z M643.39,402.1l-0.11-5.02l2.57,3.65L643.39,402.1z"/>
									</g>
									<g>
										<polygon className="navas77" points="664.33,384.27 664.37,385.76 669.24,383.04 669.2,381.55 			" />
										<polygon className="navas78" points="731.9,415.02 731.97,416.55 669.24,383.04 669.2,381.55 			" />
										<polygon className="navas79" points="727.04,419.32 731.97,416.55 669.24,383.04 664.37,385.76 			" />
										<path className="navas169" d="M669.13,381.51l-4.87,2.72l62.71,33.56l4.93-2.77L669.13,381.51z M669.14,381.88l2.11,1.13l-5.85,0.96
				L669.14,381.88z M674.27,384.61l2.12,1.13l-5.86,0.96L674.27,384.61z M670.18,386.52l1.63-3.22l2.11,1.13L670.18,386.52z
				 M679.41,387.36l2.12,1.13l-5.87,0.96L679.41,387.36z M675.32,389.27l1.63-3.23l2.12,1.13L675.32,389.27z M684.56,390.11
				l2.13,1.14l-5.88,0.96L684.56,390.11z M680.47,392.03l1.63-3.23l2.12,1.13L680.47,392.03z M689.73,392.87l2.13,1.14l-5.89,0.96
				L689.73,392.87z M685.63,394.79l1.63-3.24l2.13,1.14L685.63,394.79z M694.91,395.64l2.14,1.14l-5.9,0.96L694.91,395.64z
				 M690.81,397.56l1.63-3.24l2.14,1.14L690.81,397.56z M700.11,398.41l2.14,1.14l-5.91,0.96L700.11,398.41z M696,400.33l1.62-3.25
				l2.14,1.14L696,400.33z M705.32,401.19l2.15,1.15l-5.92,0.96L705.32,401.19z M701.21,403.12l1.62-3.26l2.15,1.15L701.21,403.12z
				 M710.54,403.98l2.15,1.15l-5.93,0.96L710.54,403.98z M706.42,405.91l1.62-3.26l2.15,1.15L706.42,405.91z M715.78,406.77
				l2.16,1.15l-5.94,0.97L715.78,406.77z M711.66,408.71l1.62-3.27l2.16,1.15L711.66,408.71z M721.03,409.58l2.17,1.16l-5.95,0.97
				L721.03,409.58z M716.9,411.51l1.62-3.28l2.16,1.15L716.9,411.51z M726.29,412.39l2.17,1.16l-5.96,0.97L726.29,412.39z
				 M722.16,414.33l1.61-3.28l2.17,1.16L722.16,414.33z M728.58,413.8l-1.74,3.55l-4.69-2.51L728.58,413.8z M721.56,414.53
				l-4.68-2.5l6.42-1.04L721.56,414.53z M716.3,411.72l-4.67-2.5l6.41-1.04L716.3,411.72z M711.06,408.91l-4.65-2.49l6.4-1.04
				L711.06,408.91z M705.83,406.11l-4.64-2.48l6.39-1.04L705.83,406.11z M700.61,403.32l-4.63-2.48l6.38-1.04L700.61,403.32z
				 M695.41,400.54l-4.62-2.47l6.37-1.04L695.41,400.54z M690.22,397.76l-4.6-2.46l6.36-1.04L690.22,397.76z M685.04,394.99
				l-4.59-2.46l6.35-1.04L685.04,394.99z M679.88,392.23l-4.58-2.45l6.34-1.04L679.88,392.23z M674.73,389.48l-4.57-2.44l6.33-1.04
				L674.73,389.48z M669.59,386.73l-4.56-2.44l6.32-1.04L669.59,386.73z M731.22,415.02l-3.79,2.13l1.61-3.29L731.22,415.02z"/>
										<polygon className="navas78" points="726.97,417.79 727.04,419.32 664.37,385.76 664.33,384.27 			" />
										<polygon className="navas77" points="726.97,417.79 727.04,419.32 731.97,416.55 731.9,415.02 			" />
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="723.83,422.69 724.05,422.28 718.85,419.49 718.62,419.9 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="723.82,422.64 724.05,422.24 718.9,419.47 718.67,419.88 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="723.81,422.59 724.04,422.19 718.94,419.46 718.72,419.86 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="723.81,422.55 724.03,422.14 718.99,419.44 718.76,419.84 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="723.8,422.5 724.03,422.1 719.04,419.42 718.81,419.82 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="723.79,422.45 724.02,422.05 719.08,419.4 718.85,419.8 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="723.79,422.41 724.01,422 719.13,419.38 718.9,419.78 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="723.78,422.36 724.01,421.96 719.17,419.36 718.95,419.76 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="723.77,422.32 724,421.91 719.22,419.34 718.99,419.74 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="723.77,422.27 723.99,421.86 719.27,419.32 719.04,419.73 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="723.76,422.22 723.99,421.82 719.31,419.3 719.08,419.71 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="723.75,422.18 723.98,421.77 719.36,419.28 719.13,419.69 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="723.75,422.13 723.98,421.72 719.4,419.26 719.17,419.67 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="723.74,422.08 723.97,421.68 719.45,419.25 719.22,419.65 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="723.73,422.04 723.96,421.63 719.5,419.23 719.27,419.63 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="723.73,421.99 723.96,421.59 719.54,419.21 719.31,419.61 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="723.72,421.94 723.95,421.54 719.59,419.19 719.36,419.59 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="723.71,421.9 723.94,421.49 719.63,419.17 719.4,419.57 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="723.71,421.85 723.94,421.45 719.68,419.15 719.45,419.55 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="723.7,421.8 723.93,421.4 719.73,419.13 719.5,419.53 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="723.69,421.76 723.92,421.35 719.77,419.11 719.54,419.51 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="723.69,421.71 723.92,421.31 719.82,419.09 719.59,419.5 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="723.68,421.66 723.91,421.26 719.86,419.07 719.63,419.48 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="723.67,421.62 723.9,421.21 719.91,419.05 719.68,419.46 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="723.67,421.57 723.9,421.17 719.95,419.03 719.73,419.44 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="723.66,421.52 723.89,421.12 720,419.02 719.77,419.42 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="723.65,421.48 723.88,421.07 720.05,419 719.82,419.4 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="723.65,421.43 723.88,421.03 720.09,418.98 719.86,419.38 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="723.64,421.38 723.87,420.98 720.14,418.96 719.91,419.36 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="723.63,421.34 723.86,420.93 720.18,418.94 719.96,419.34 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="723.63,421.29 723.86,420.89 720.23,418.92 720,419.32 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="723.62,421.24 723.85,420.84 720.28,418.9 720.05,419.3 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="723.61,421.2 723.84,420.79 720.32,418.88 720.09,419.28 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="723.61,421.15 723.84,420.75 720.37,418.86 720.14,419.27 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="723.6,421.1 723.83,420.7 720.41,418.84 720.18,419.25 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="723.59,421.06 723.83,420.66 720.46,418.82 720.23,419.23 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="723.59,421.01 723.82,420.61 720.51,418.81 720.28,419.21 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="723.58,420.97 723.81,420.56 720.55,418.79 720.32,419.19 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="723.57,420.92 723.81,420.52 720.6,418.77 720.37,419.17 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="723.57,420.87 723.8,420.47 720.64,418.75 720.41,419.15 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="723.56,420.83 723.79,420.42 720.69,418.73 720.46,419.13 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="723.55,420.78 723.79,420.38 720.74,418.71 720.51,419.11 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="723.55,420.73 723.78,420.33 720.78,418.69 720.55,419.09 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="723.54,420.69 723.77,420.28 720.83,418.67 720.6,419.07 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="723.53,420.64 723.77,420.24 720.87,418.65 720.64,419.05 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="723.53,420.59 723.76,420.19 720.92,418.63 720.69,419.04 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="723.52,420.55 723.75,420.14 720.97,418.61 720.73,419.02 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="723.51,420.5 723.75,420.1 721.01,418.6 720.78,419 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="723.51,420.45 723.74,420.05 721.06,418.58 720.83,418.98 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="723.5,420.41 723.73,420.01 721.11,418.56 720.87,418.96 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="723.49,420.36 723.73,419.96 721.15,418.54 720.92,418.94 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="723.49,420.31 723.72,419.91 721.2,418.52 720.96,418.92 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="723.48,420.27 723.71,419.87 721.24,418.5 721.01,418.9 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="723.47,420.22 723.71,419.82 721.29,418.48 721.05,418.88 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="723.47,420.17 723.7,419.77 721.34,418.46 721.1,418.86 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="723.46,420.13 723.7,419.73 721.38,418.44 721.15,418.84 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="723.45,420.08 723.69,419.68 721.43,418.42 721.19,418.82 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="723.45,420.03 723.68,419.63 721.47,418.4 721.24,418.8 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="723.44,419.99 723.68,419.59 721.52,418.39 721.28,418.79 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="723.43,419.94 723.67,419.54 721.57,418.37 721.33,418.77 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="723.43,419.89 723.66,419.5 721.61,418.35 721.38,418.75 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="723.42,419.85 723.66,419.45 721.66,418.33 721.42,418.73 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="723.41,419.8 723.65,419.4 721.7,418.31 721.47,418.71 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="723.41,419.75 723.64,419.36 721.75,418.29 721.51,418.69 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="723.4,419.71 723.64,419.31 721.8,418.27 721.56,418.67 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="723.39,419.66 723.63,419.26 721.84,418.25 721.6,418.65 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="723.39,419.62 723.63,419.22 721.89,418.23 721.65,418.63 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="723.38,419.57 723.62,419.17 721.93,418.21 721.7,418.61 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="723.37,419.52 723.61,419.12 721.98,418.2 721.74,418.59 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="723.37,419.48 723.61,419.08 722.03,418.18 721.79,418.57 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="723.36,419.43 723.6,419.03 722.07,418.16 721.83,418.55 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="723.35,419.38 723.59,418.99 722.12,418.14 721.88,418.53 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="723.35,419.34 723.59,418.94 722.17,418.12 721.92,418.52 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="723.34,419.29 723.58,418.89 722.21,418.1 721.97,418.5 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="723.33,419.24 723.58,418.85 722.26,418.08 722.02,418.48 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="723.32,419.2 723.57,418.8 722.3,418.06 722.06,418.46 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="723.32,419.15 723.56,418.75 722.35,418.04 722.11,418.44 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="723.31,419.1 723.56,418.71 722.4,418.02 722.15,418.42 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="723.3,419.05 723.55,418.66 722.44,418.01 722.2,418.4 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="723.3,419.01 723.55,418.62 722.49,417.99 722.24,418.38 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="723.29,418.96 723.54,418.57 722.54,417.97 722.29,418.36 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="723.28,418.91 723.53,418.52 722.58,417.95 722.33,418.34 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="723.27,418.87 723.53,418.48 722.63,417.93 722.38,418.32 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="723.27,418.82 723.52,418.43 722.68,417.91 722.42,418.3 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="723.26,418.77 723.52,418.39 722.72,417.89 722.47,418.28 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="723.25,418.73 723.51,418.34 722.77,417.88 722.51,418.26 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="723.24,418.68 723.51,418.3 722.82,417.86 722.56,418.24 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="723.24,418.63 723.5,418.25 722.87,417.84 722.6,418.22 					" />
											</g>
											<g>
												<polygon className="navas76" points="723.23,418.58 723.5,418.2 722.91,417.82 722.65,418.2 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="717.37,419.25 717.6,418.84 712.42,416.06 712.19,416.47 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="717.37,419.2 717.6,418.8 712.46,416.04 712.23,416.45 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="717.36,419.15 717.59,418.75 712.51,416.03 712.28,416.43 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="717.35,419.11 717.58,418.7 712.55,416.01 712.33,416.41 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="717.35,419.06 717.58,418.66 712.6,415.99 712.37,416.39 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="717.34,419.02 717.57,418.61 712.65,415.97 712.42,416.37 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="717.34,418.97 717.56,418.57 712.69,415.95 712.46,416.35 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="717.33,418.92 717.56,418.52 712.74,415.93 712.51,416.33 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="717.32,418.88 717.55,418.47 712.78,415.91 712.56,416.31 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="717.32,418.83 717.54,418.43 712.83,415.89 712.6,416.29 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="717.31,418.78 717.54,418.38 712.88,415.87 712.65,416.28 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="717.3,418.74 717.53,418.33 712.92,415.85 712.69,416.26 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="717.3,418.69 717.52,418.29 712.97,415.83 712.74,416.24 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="717.29,418.64 717.52,418.24 713.01,415.82 712.78,416.22 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="717.28,418.6 717.51,418.19 713.06,415.8 712.83,416.2 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="717.28,418.55 717.51,418.15 713.11,415.78 712.88,416.18 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="717.27,418.5 717.5,418.1 713.15,415.76 712.92,416.16 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="717.26,418.46 717.49,418.05 713.2,415.74 712.97,416.14 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="717.26,418.41 717.49,418.01 713.24,415.72 713.01,416.12 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="717.25,418.37 717.48,417.96 713.29,415.7 713.06,416.1 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="717.24,418.32 717.47,417.92 713.33,415.68 713.11,416.08 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="717.24,418.27 717.47,417.87 713.38,415.66 713.15,416.06 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="717.23,418.23 717.46,417.82 713.43,415.64 713.2,416.05 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="717.22,418.18 717.45,417.78 713.47,415.62 713.24,416.03 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="717.22,418.13 717.45,417.73 713.52,415.61 713.29,416.01 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="717.21,418.09 717.44,417.68 713.56,415.59 713.33,415.99 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="717.2,418.04 717.43,417.64 713.61,415.57 713.38,415.97 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="717.2,417.99 717.43,417.59 713.66,415.55 713.43,415.95 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="717.19,417.95 717.42,417.55 713.7,415.53 713.47,415.93 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="717.19,417.9 717.42,417.5 713.75,415.51 713.52,415.91 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="717.18,417.85 717.41,417.45 713.79,415.49 713.56,415.89 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="717.17,417.81 717.4,417.41 713.84,415.47 713.61,415.87 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="717.17,417.76 717.4,417.36 713.89,415.45 713.66,415.85 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="717.16,417.72 717.39,417.31 713.93,415.43 713.7,415.84 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="717.15,417.67 717.38,417.27 713.98,415.41 713.75,415.82 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="717.15,417.62 717.38,417.22 714.02,415.4 713.79,415.8 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="717.14,417.58 717.37,417.17 714.07,415.38 713.84,415.78 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="717.13,417.53 717.36,417.13 714.12,415.36 713.88,415.76 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="717.13,417.48 717.36,417.08 714.16,415.34 713.93,415.74 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="717.12,417.44 717.35,417.04 714.21,415.32 713.98,415.72 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="717.11,417.39 717.35,416.99 714.25,415.3 714.02,415.7 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="717.11,417.34 717.34,416.94 714.3,415.28 714.07,415.68 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="717.1,417.3 717.33,416.9 714.35,415.26 714.11,415.66 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="717.09,417.25 717.33,416.85 714.39,415.24 714.16,415.64 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="717.09,417.2 717.32,416.8 714.44,415.22 714.2,415.62 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="717.08,417.16 717.31,416.76 714.48,415.2 714.25,415.61 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="717.07,417.11 717.31,416.71 714.53,415.19 714.3,415.59 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="717.07,417.07 717.3,416.66 714.58,415.17 714.34,415.57 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="717.06,417.02 717.29,416.62 714.62,415.15 714.39,415.55 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="717.05,416.97 717.29,416.57 714.67,415.13 714.43,415.53 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="717.05,416.93 717.28,416.53 714.71,415.11 714.48,415.51 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="717.04,416.88 717.28,416.48 714.76,415.09 714.52,415.49 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="717.03,416.83 717.27,416.43 714.8,415.07 714.57,415.47 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="717.03,416.79 717.26,416.39 714.85,415.05 714.62,415.45 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="717.02,416.74 717.26,416.34 714.9,415.03 714.66,415.43 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="717.01,416.69 717.25,416.29 714.94,415.01 714.71,415.41 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="717.01,416.65 717.24,416.25 714.99,415 714.75,415.39 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="717,416.6 717.24,416.2 715.03,414.98 714.8,415.38 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="717,416.55 717.23,416.16 715.08,414.96 714.85,415.36 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="716.99,416.51 717.22,416.11 715.13,414.94 714.89,415.34 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="716.98,416.46 717.22,416.06 715.17,414.92 714.94,415.32 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="716.98,416.42 717.21,416.02 715.22,414.9 714.98,415.3 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="716.97,416.37 717.21,415.97 715.26,414.88 715.03,415.28 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="716.96,416.32 717.2,415.92 715.31,414.86 715.07,415.26 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="716.96,416.28 717.19,415.88 715.36,414.84 715.12,415.24 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="716.95,416.23 717.19,415.83 715.4,414.82 715.16,415.22 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="716.94,416.18 717.18,415.79 715.45,414.81 715.21,415.2 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="716.93,416.14 717.17,415.74 715.5,414.79 715.26,415.18 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="716.93,416.09 717.17,415.69 715.54,414.77 715.3,415.16 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="716.92,416.04 717.16,415.65 715.59,414.75 715.35,415.14 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="716.91,416 717.16,415.6 715.63,414.73 715.39,415.13 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="716.91,415.95 717.15,415.56 715.68,414.71 715.44,415.11 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="716.9,415.9 717.14,415.51 715.73,414.69 715.48,415.09 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="716.89,415.86 717.14,415.46 715.77,414.67 715.53,415.07 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="716.89,415.81 717.13,415.42 715.82,414.65 715.57,415.05 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="716.88,415.76 717.13,415.37 715.86,414.63 715.62,415.03 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="716.87,415.72 717.12,415.32 715.91,414.62 715.67,415.01 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="716.87,415.67 717.11,415.28 715.96,414.6 715.71,414.99 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="716.86,415.62 717.11,415.23 716,414.58 715.76,414.97 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="716.85,415.58 717.1,415.19 716.05,414.56 715.8,414.95 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="716.85,415.53 717.1,415.14 716.1,414.54 715.85,414.93 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="716.84,415.48 717.09,415.09 716.14,414.52 715.89,414.91 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="716.83,415.44 717.08,415.05 716.19,414.5 715.94,414.89 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="716.82,415.39 717.08,415 716.24,414.49 715.98,414.87 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="716.82,415.34 717.07,414.96 716.28,414.47 716.03,414.85 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="716.81,415.3 717.07,414.91 716.33,414.45 716.07,414.83 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="716.8,415.25 717.06,414.87 716.38,414.43 716.12,414.81 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="716.79,415.2 717.06,414.82 716.43,414.41 716.16,414.79 					" />
											</g>
											<g>
												<polygon className="navas76" points="716.78,415.15 717.05,414.78 716.47,414.39 716.2,414.77 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="710.96,415.7 711.19,415.3 706.02,412.53 705.79,412.93 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="710.96,415.66 711.18,415.25 706.07,412.51 705.84,412.91 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="710.95,415.61 711.18,415.21 706.11,412.49 705.88,412.89 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="710.94,415.56 711.17,415.16 706.16,412.47 705.93,412.88 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="710.94,415.52 711.16,415.12 706.2,412.45 705.98,412.86 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="710.93,415.47 711.16,415.07 706.25,412.43 706.02,412.84 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="710.92,415.43 711.15,415.02 706.3,412.42 706.07,412.82 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="710.92,415.38 711.15,414.98 706.34,412.4 706.11,412.8 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="710.91,415.33 711.14,414.93 706.39,412.38 706.16,412.78 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="710.9,415.29 711.13,414.88 706.43,412.36 706.2,412.76 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="710.9,415.24 711.13,414.84 706.48,412.34 706.25,412.74 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="710.89,415.19 711.12,414.79 706.53,412.32 706.3,412.72 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="710.88,415.15 711.11,414.75 706.57,412.3 706.34,412.7 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="710.88,415.1 711.11,414.7 706.62,412.28 706.39,412.68 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="710.87,415.06 711.1,414.65 706.66,412.26 706.43,412.67 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="710.87,415.01 711.09,414.61 706.71,412.24 706.48,412.65 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="710.86,414.96 711.09,414.56 706.75,412.23 706.53,412.63 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="710.85,414.92 711.08,414.51 706.8,412.21 706.57,412.61 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="710.85,414.87 711.08,414.47 706.85,412.19 706.62,412.59 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="710.84,414.82 711.07,414.42 706.89,412.17 706.66,412.57 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="710.83,414.78 711.06,414.38 706.94,412.15 706.71,412.55 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="710.83,414.73 711.06,414.33 706.98,412.13 706.75,412.53 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="710.82,414.69 711.05,414.28 707.03,412.11 706.8,412.51 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="710.81,414.64 711.04,414.24 707.08,412.09 706.85,412.49 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="710.81,414.59 711.04,414.19 707.12,412.07 706.89,412.47 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="710.8,414.55 711.03,414.14 707.17,412.05 706.94,412.46 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="710.79,414.5 711.03,414.1 707.21,412.03 706.98,412.44 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="710.79,414.45 711.02,414.05 707.26,412.02 707.03,412.42 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="710.78,414.41 711.01,414.01 707.3,412 707.07,412.4 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="710.78,414.36 711.01,413.96 707.35,411.98 707.12,412.38 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="710.77,414.31 711,413.91 707.4,411.96 707.17,412.36 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="710.76,414.27 710.99,413.87 707.44,411.94 707.21,412.34 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="710.76,414.22 710.99,413.82 707.49,411.92 707.26,412.32 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="710.75,414.18 710.98,413.77 707.53,411.9 707.3,412.3 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="710.74,414.13 710.97,413.73 707.58,411.88 707.35,412.28 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="710.74,414.08 710.97,413.68 707.63,411.86 707.39,412.26 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="710.73,414.04 710.96,413.64 707.67,411.84 707.44,412.24 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="710.72,413.99 710.96,413.59 707.72,411.83 707.49,412.23 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="710.72,413.94 710.95,413.54 707.76,411.81 707.53,412.21 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="710.71,413.9 710.94,413.5 707.81,411.79 707.58,412.19 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="710.7,413.85 710.94,413.45 707.85,411.77 707.62,412.17 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="710.7,413.81 710.93,413.41 707.9,411.75 707.67,412.15 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="710.69,413.76 710.92,413.36 707.95,411.73 707.71,412.13 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="710.69,413.71 710.92,413.31 707.99,411.71 707.76,412.11 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="710.68,413.67 710.91,413.27 708.04,411.69 707.81,412.09 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="710.67,413.62 710.91,413.22 708.08,411.67 707.85,412.07 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="710.67,413.57 710.9,413.17 708.13,411.65 707.9,412.05 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="710.66,413.53 710.89,413.13 708.18,411.64 707.94,412.03 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="710.65,413.48 710.89,413.08 708.22,411.62 707.99,412.02 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="710.65,413.44 710.88,413.04 708.27,411.6 708.03,412 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="710.64,413.39 710.87,412.99 708.31,411.58 708.08,411.98 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="710.63,413.34 710.87,412.94 708.36,411.56 708.13,411.96 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="710.63,413.3 710.86,412.9 708.41,411.54 708.17,411.94 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="710.62,413.25 710.86,412.85 708.45,411.52 708.22,411.92 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="710.61,413.2 710.85,412.81 708.5,411.5 708.26,411.9 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="710.61,413.16 710.84,412.76 708.54,411.48 708.31,411.88 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="710.6,413.11 710.84,412.71 708.59,411.46 708.35,411.86 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="710.59,413.06 710.83,412.67 708.64,411.44 708.4,411.84 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="710.59,413.02 710.82,412.62 708.68,411.43 708.45,411.82 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="710.58,412.97 710.82,412.57 708.73,411.41 708.49,411.8 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="710.58,412.93 710.81,412.53 708.77,411.39 708.54,411.79 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="710.57,412.88 710.81,412.48 708.82,411.37 708.58,411.77 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="710.56,412.83 710.8,412.44 708.86,411.35 708.63,411.75 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="710.56,412.79 710.79,412.39 708.91,411.33 708.67,411.73 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="710.55,412.74 710.79,412.34 708.96,411.31 708.72,411.71 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="710.54,412.69 710.78,412.3 709,411.29 708.76,411.69 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="710.54,412.65 710.77,412.25 709.05,411.27 708.81,411.67 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="710.53,412.6 710.77,412.21 709.09,411.26 708.86,411.65 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="710.52,412.55 710.76,412.16 709.14,411.24 708.9,411.63 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="710.52,412.51 710.76,412.11 709.19,411.22 708.95,411.61 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="710.51,412.46 710.75,412.07 709.23,411.2 708.99,411.59 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="710.5,412.42 710.74,412.02 709.28,411.18 709.04,411.57 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="710.5,412.37 710.74,411.98 709.33,411.16 709.08,411.55 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="710.49,412.32 710.73,411.93 709.37,411.14 709.13,411.54 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="710.48,412.28 710.73,411.88 709.42,411.12 709.17,411.52 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="710.48,412.23 710.72,411.84 709.46,411.1 709.22,411.5 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="710.47,412.18 710.71,411.79 709.51,411.09 709.26,411.48 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="710.46,412.14 710.71,411.75 709.56,411.07 709.31,411.46 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="710.45,412.09 710.7,411.7 709.6,411.05 709.36,411.44 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="710.45,412.04 710.7,411.65 709.65,411.03 709.4,411.42 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="710.44,412 710.69,411.61 709.7,411.01 709.45,411.4 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="710.43,411.95 710.69,411.56 709.74,410.99 709.49,411.38 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="710.43,411.9 710.68,411.52 709.79,410.97 709.54,411.36 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="710.42,411.86 710.67,411.47 709.84,410.95 709.58,411.34 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="710.41,411.81 710.67,411.43 709.88,410.94 709.63,411.32 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="710.4,411.76 710.66,411.38 709.93,410.92 709.67,411.3 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="710.4,411.72 710.66,411.33 709.98,410.9 709.71,411.28 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="710.39,411.67 710.65,411.29 710.02,410.88 709.76,411.26 					" />
											</g>
											<g>
												<polygon className="navas76" points="710.38,411.62 710.65,411.24 710.07,410.86 709.8,411.24 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="704.44,412.24 704.67,411.84 699.52,409.08 699.29,409.48 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="704.44,412.2 704.67,411.79 699.57,409.06 699.34,409.46 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="704.43,412.15 704.66,411.75 699.61,409.04 699.38,409.44 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="704.42,412.1 704.65,411.7 699.66,409.02 699.43,409.42 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="704.42,412.06 704.65,411.65 699.7,409 699.47,409.4 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="704.41,412.01 704.64,411.61 699.75,408.98 699.52,409.38 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="704.41,411.96 704.63,411.56 699.79,408.96 699.57,409.36 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="704.4,411.92 704.63,411.52 699.84,408.94 699.61,409.35 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="704.39,411.87 704.62,411.47 699.89,408.93 699.66,409.33 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="704.39,411.83 704.62,411.42 699.93,408.91 699.7,409.31 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="704.38,411.78 704.61,411.38 699.98,408.89 699.75,409.29 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="704.37,411.73 704.6,411.33 700.02,408.87 699.79,409.27 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="704.37,411.69 704.6,411.29 700.07,408.85 699.84,409.25 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="704.36,411.64 704.59,411.24 700.11,408.83 699.89,409.23 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="704.35,411.59 704.58,411.19 700.16,408.81 699.93,409.21 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="704.35,411.55 704.58,411.15 700.21,408.79 699.98,409.19 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="704.34,411.5 704.57,411.1 700.25,408.77 700.02,409.17 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="704.34,411.46 704.57,411.05 700.3,408.75 700.07,409.15 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="704.33,411.41 704.56,411.01 700.34,408.74 700.11,409.14 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="704.32,411.36 704.55,410.96 700.39,408.72 700.16,409.12 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="704.32,411.32 704.55,410.92 700.44,408.7 700.21,409.1 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="704.31,411.27 704.54,410.87 700.48,408.68 700.25,409.08 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="704.3,411.23 704.53,410.82 700.53,408.66 700.3,409.06 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="704.3,411.18 704.53,410.78 700.57,408.64 700.34,409.04 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="704.29,411.13 704.52,410.73 700.62,408.62 700.39,409.02 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="704.29,411.09 704.52,410.69 700.66,408.6 700.43,409 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="704.28,411.04 704.51,410.64 700.71,408.58 700.48,408.98 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="704.27,410.99 704.5,410.59 700.76,408.56 700.53,408.96 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="704.27,410.95 704.5,410.55 700.8,408.54 700.57,408.94 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="704.26,410.9 704.49,410.5 700.85,408.53 700.62,408.93 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="704.25,410.86 704.48,410.46 700.89,408.51 700.66,408.91 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="704.25,410.81 704.48,410.41 700.94,408.49 700.71,408.89 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="704.24,410.76 704.47,410.36 700.98,408.47 700.75,408.87 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="704.23,410.72 704.47,410.32 701.03,408.45 700.8,408.85 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="704.23,410.67 704.46,410.27 701.08,408.43 700.84,408.83 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="704.22,410.62 704.45,410.23 701.12,408.41 700.89,408.81 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="704.22,410.58 704.45,410.18 701.17,408.39 700.94,408.79 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="704.21,410.53 704.44,410.13 701.21,408.37 700.98,408.77 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="704.2,410.49 704.43,410.09 701.26,408.35 701.03,408.75 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="704.2,410.44 704.43,410.04 701.3,408.34 701.07,408.73 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="704.19,410.39 704.42,409.99 701.35,408.32 701.12,408.72 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="704.18,410.35 704.42,409.95 701.4,408.3 701.16,408.7 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="704.18,410.3 704.41,409.9 701.44,408.28 701.21,408.68 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="704.17,410.26 704.4,409.86 701.49,408.26 701.26,408.66 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="704.16,410.21 704.4,409.81 701.53,408.24 701.3,408.64 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="704.16,410.16 704.39,409.76 701.58,408.22 701.35,408.62 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="704.15,410.12 704.39,409.72 701.63,408.2 701.39,408.6 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="704.15,410.07 704.38,409.67 701.67,408.18 701.44,408.58 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="704.14,410.02 704.37,409.63 701.72,408.16 701.48,408.56 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="704.13,409.98 704.37,409.58 701.76,408.15 701.53,408.54 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="704.13,409.93 704.36,409.53 701.81,408.13 701.58,408.52 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="704.12,409.89 704.35,409.49 701.85,408.11 701.62,408.51 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="704.11,409.84 704.35,409.44 701.9,408.09 701.67,408.49 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="704.11,409.79 704.34,409.4 701.95,408.07 701.71,408.47 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="704.1,409.75 704.34,409.35 701.99,408.05 701.76,408.45 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="704.09,409.7 704.33,409.3 702.04,408.03 701.8,408.43 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="704.09,409.66 704.32,409.26 702.08,408.01 701.85,408.41 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="704.08,409.61 704.32,409.21 702.13,407.99 701.89,408.39 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="704.08,409.56 704.31,409.17 702.18,407.98 701.94,408.37 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="704.07,409.52 704.31,409.12 702.22,407.96 701.99,408.35 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="704.06,409.47 704.3,409.07 702.27,407.94 702.03,408.33 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="704.06,409.42 704.29,409.03 702.31,407.92 702.08,408.31 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="704.05,409.38 704.29,408.98 702.36,407.9 702.12,408.3 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="704.04,409.33 704.28,408.94 702.41,407.88 702.17,408.28 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="704.04,409.29 704.28,408.89 702.45,407.86 702.21,408.26 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="704.03,409.24 704.27,408.84 702.5,407.84 702.26,408.24 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="704.02,409.19 704.26,408.8 702.54,407.82 702.3,408.22 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="704.02,409.15 704.26,408.75 702.59,407.8 702.35,408.2 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="704.01,409.1 704.25,408.71 702.64,407.79 702.4,408.18 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="704,409.05 704.24,408.66 702.68,407.77 702.44,408.16 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="704,409.01 704.24,408.61 702.73,407.75 702.49,408.14 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="703.99,408.96 704.23,408.57 702.77,407.73 702.53,408.12 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="703.98,408.92 704.23,408.52 702.82,407.71 702.58,408.1 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="703.98,408.87 704.22,408.48 702.87,407.69 702.62,408.08 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="703.97,408.82 704.22,408.43 702.91,407.67 702.67,408.06 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="703.96,408.78 704.21,408.39 702.96,407.65 702.71,408.05 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="703.96,408.73 704.2,408.34 703,407.64 702.76,408.03 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="703.95,408.68 704.2,408.29 703.05,407.62 702.8,408.01 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="703.94,408.64 704.19,408.25 703.1,407.6 702.85,407.99 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="703.94,408.59 704.19,408.2 703.14,407.58 702.89,407.97 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="703.93,408.54 704.18,408.16 703.19,407.56 702.94,407.95 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="703.92,408.5 704.18,408.11 703.24,407.54 702.98,407.93 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="703.92,408.45 704.17,408.06 703.28,407.52 703.03,407.91 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="703.91,408.4 704.16,408.02 703.33,407.5 703.07,407.89 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="703.9,408.36 704.16,407.97 703.38,407.49 703.12,407.87 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="703.89,408.31 704.15,407.93 703.42,407.47 703.16,407.85 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="703.89,408.26 704.15,407.88 703.47,407.45 703.21,407.83 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="703.88,408.22 704.14,407.84 703.52,407.43 703.25,407.81 					" />
											</g>
											<g>
												<polygon className="navas76" points="703.87,408.17 704.14,407.79 703.56,407.41 703.3,407.79 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="698.05,408.8 698.28,408.4 693.15,405.64 692.92,406.04 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="698.05,408.75 698.28,408.35 693.19,405.62 692.96,406.02 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="698.04,408.7 698.27,408.3 693.24,405.6 693.01,406 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="698.04,408.66 698.26,408.26 693.29,405.59 693.06,405.99 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="698.03,408.61 698.26,408.21 693.33,405.57 693.1,405.97 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="698.02,408.57 698.25,408.17 693.38,405.55 693.15,405.95 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="698.02,408.52 698.25,408.12 693.42,405.53 693.19,405.93 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="698.01,408.47 698.24,408.07 693.47,405.51 693.24,405.91 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="698,408.43 698.23,408.03 693.51,405.49 693.28,405.89 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="698,408.38 698.23,407.98 693.56,405.47 693.33,405.87 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="697.99,408.34 698.22,407.94 693.6,405.45 693.38,405.85 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="697.99,408.29 698.22,407.89 693.65,405.43 693.42,405.83 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="697.98,408.24 698.21,407.84 693.7,405.41 693.47,405.81 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="697.97,408.2 698.2,407.8 693.74,405.4 693.51,405.8 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="697.97,408.15 698.2,407.75 693.79,405.38 693.56,405.78 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="697.96,408.11 698.19,407.71 693.83,405.36 693.6,405.76 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="697.96,408.06 698.18,407.66 693.88,405.34 693.65,405.74 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="697.95,408.01 698.18,407.61 693.92,405.32 693.7,405.72 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="697.94,407.97 698.17,407.57 693.97,405.3 693.74,405.7 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="697.94,407.92 698.17,407.52 694.02,405.28 693.79,405.68 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="697.93,407.88 698.16,407.48 694.06,405.26 693.83,405.66 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="697.92,407.83 698.15,407.43 694.11,405.24 693.88,405.64 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="697.92,407.78 698.15,407.38 694.15,405.22 693.92,405.62 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="697.91,407.74 698.14,407.34 694.2,405.21 693.97,405.61 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="697.91,407.69 698.14,407.29 694.24,405.19 694.01,405.59 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="697.9,407.64 698.13,407.25 694.29,405.17 694.06,405.57 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="697.89,407.6 698.12,407.2 694.34,405.15 694.11,405.55 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="697.89,407.55 698.12,407.15 694.38,405.13 694.15,405.53 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="697.88,407.51 698.11,407.11 694.43,405.11 694.2,405.51 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="697.87,407.46 698.1,407.06 694.47,405.09 694.24,405.49 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="697.87,407.41 698.1,407.02 694.52,405.07 694.29,405.47 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="697.86,407.37 698.09,406.97 694.56,405.05 694.33,405.45 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="697.86,407.32 698.09,406.92 694.61,405.04 694.38,405.43 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="697.85,407.28 698.08,406.88 694.66,405.02 694.42,405.41 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="697.84,407.23 698.07,406.83 694.7,405 694.47,405.4 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="697.84,407.18 698.07,406.79 694.75,404.98 694.52,405.38 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="697.83,407.14 698.06,406.74 694.79,404.96 694.56,405.36 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="697.82,407.09 698.06,406.69 694.84,404.94 694.61,405.34 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="697.82,407.05 698.05,406.65 694.88,404.92 694.65,405.32 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="697.81,407 698.04,406.6 694.93,404.9 694.7,405.3 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="697.81,406.95 698.04,406.56 694.98,404.88 694.74,405.28 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="697.8,406.91 698.03,406.51 695.02,404.86 694.79,405.26 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="697.79,406.86 698.03,406.46 695.07,404.85 694.84,405.24 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="697.79,406.82 698.02,406.42 695.11,404.83 694.88,405.22 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="697.78,406.77 698.01,406.37 695.16,404.81 694.93,405.21 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="697.77,406.72 698.01,406.33 695.2,404.79 694.97,405.19 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="697.77,406.68 698,406.28 695.25,404.77 695.02,405.17 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="697.76,406.63 698,406.23 695.3,404.75 695.06,405.15 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="697.76,406.59 697.99,406.19 695.34,404.73 695.11,405.13 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="697.75,406.54 697.98,406.14 695.39,404.71 695.15,405.11 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="697.74,406.49 697.98,406.1 695.43,404.69 695.2,405.09 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="697.74,406.45 697.97,406.05 695.48,404.67 695.25,405.07 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="697.73,406.4 697.96,406 695.53,404.66 695.29,405.05 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="697.72,406.36 697.96,405.96 695.57,404.64 695.34,405.03 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="697.72,406.31 697.95,405.91 695.62,404.62 695.38,405.01 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="697.71,406.26 697.95,405.87 695.66,404.6 695.43,405 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="697.71,406.22 697.94,405.82 695.71,404.58 695.47,404.98 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="697.7,406.17 697.93,405.77 695.75,404.56 695.52,404.96 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="697.69,406.13 697.93,405.73 695.8,404.54 695.56,404.94 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="697.69,406.08 697.92,405.68 695.85,404.52 695.61,404.92 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="697.68,406.03 697.92,405.64 695.89,404.5 695.65,404.9 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="697.67,405.99 697.91,405.59 695.94,404.49 695.7,404.88 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="697.67,405.94 697.9,405.55 695.98,404.47 695.75,404.86 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="697.66,405.89 697.9,405.5 696.03,404.45 695.79,404.84 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="697.65,405.85 697.89,405.45 696.07,404.43 695.84,404.82 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="697.65,405.8 697.89,405.41 696.12,404.41 695.88,404.8 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="697.64,405.76 697.88,405.36 696.17,404.39 695.93,404.79 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="697.64,405.71 697.88,405.32 696.21,404.37 695.97,404.77 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="697.63,405.66 697.87,405.27 696.26,404.35 696.02,404.75 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="697.62,405.62 697.86,405.22 696.3,404.33 696.06,404.73 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="697.62,405.57 697.86,405.18 696.35,404.32 696.11,404.71 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="697.61,405.53 697.85,405.13 696.4,404.3 696.15,404.69 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="697.6,405.48 697.85,405.09 696.44,404.28 696.2,404.67 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="697.6,405.43 697.84,405.04 696.49,404.26 696.24,404.65 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="697.59,405.39 697.83,405 696.53,404.24 696.29,404.63 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="697.58,405.34 697.83,404.95 696.58,404.22 696.34,404.61 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="697.58,405.29 697.82,404.9 696.63,404.2 696.38,404.59 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="697.57,405.25 697.82,404.86 696.67,404.18 696.43,404.57 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="697.56,405.2 697.81,404.81 696.72,404.17 696.47,404.55 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="697.56,405.16 697.81,404.77 696.77,404.15 696.52,404.54 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="697.55,405.11 697.8,404.72 696.81,404.13 696.56,404.52 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="697.54,405.06 697.79,404.68 696.86,404.11 696.61,404.5 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="697.54,405.02 697.79,404.63 696.9,404.09 696.65,404.48 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="697.53,404.97 697.78,404.59 696.95,404.07 696.7,404.46 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="697.52,404.92 697.78,404.54 697,404.05 696.74,404.44 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="697.51,404.88 697.77,404.5 697.04,404.04 696.78,404.42 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="697.51,404.83 697.77,404.45 697.09,404.02 696.83,404.4 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="697.5,404.78 697.76,404.41 697.14,404 696.87,404.38 					" />
											</g>
											<g>
												<polygon className="navas76" points="697.49,404.74 697.76,404.36 697.19,403.98 696.92,404.36 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas72" points="691.69,405.36 691.92,404.96 686.8,402.22 686.57,402.62 					" />
											</g>
											<g className="navas176">
												<polygon className="navas335" points="691.68,405.32 691.91,404.92 686.84,402.2 686.61,402.6 					" />
											</g>
											<g className="navas177">
												<polygon className="navas336" points="691.67,405.27 691.9,404.87 686.89,402.18 686.66,402.58 					" />
											</g>
											<g className="navas179">
												<polygon className="navas337" points="691.67,405.22 691.9,404.82 686.93,402.16 686.71,402.56 					" />
											</g>
											<g className="navas181">
												<polygon className="navas338" points="691.66,405.18 691.89,404.78 686.98,402.14 686.75,402.54 					" />
											</g>
											<g className="navas183">
												<polygon className="navas339" points="691.66,405.13 691.89,404.73 687.03,402.12 686.8,402.52 					" />
											</g>
											<g className="navas185">
												<polygon className="navas340" points="691.65,405.09 691.88,404.69 687.07,402.1 686.84,402.5 					" />
											</g>
											<g className="navas187">
												<polygon className="navas341" points="691.64,405.04 691.87,404.64 687.12,402.08 686.89,402.48 					" />
											</g>
											<g className="navas189">
												<polygon className="navas342" points="691.64,404.99 691.87,404.59 687.16,402.07 686.93,402.46 					" />
											</g>
											<g className="navas191">
												<polygon className="navas343" points="691.63,404.95 691.86,404.55 687.21,402.05 686.98,402.45 					" />
											</g>
											<g className="navas193">
												<polygon className="navas344" points="691.63,404.9 691.86,404.5 687.25,402.03 687.02,402.43 					" />
											</g>
											<g className="navas195">
												<polygon className="navas345" points="691.62,404.86 691.85,404.46 687.3,402.01 687.07,402.41 					" />
											</g>
											<g className="navas197">
												<polygon className="navas346" points="691.61,404.81 691.84,404.41 687.34,401.99 687.12,402.39 					" />
											</g>
											<g className="navas199">
												<polygon className="navas347" points="691.61,404.76 691.84,404.36 687.39,401.97 687.16,402.37 					" />
											</g>
											<g className="navas201">
												<polygon className="navas348" points="691.6,404.72 691.83,404.32 687.44,401.95 687.21,402.35 					" />
											</g>
											<g className="navas203">
												<polygon className="navas349" points="691.6,404.67 691.83,404.27 687.48,401.93 687.25,402.33 					" />
											</g>
											<g className="navas204">
												<polygon className="navas350" points="691.59,404.63 691.82,404.23 687.53,401.91 687.3,402.31 					" />
											</g>
											<g className="navas206">
												<polygon className="navas351" points="691.58,404.58 691.81,404.18 687.57,401.89 687.34,402.29 					" />
											</g>
											<g className="navas208">
												<polygon className="navas352" points="691.58,404.53 691.81,404.14 687.62,401.88 687.39,402.27 					" />
											</g>
											<g className="navas209">
												<polygon className="navas353" points="691.57,404.49 691.8,404.09 687.66,401.86 687.43,402.26 					" />
											</g>
											<g className="navas211">
												<polygon className="navas354" points="691.56,404.44 691.79,404.04 687.71,401.84 687.48,402.24 					" />
											</g>
											<g className="navas213">
												<polygon className="navas355" points="691.56,404.4 691.79,404 687.76,401.82 687.53,402.22 					" />
											</g>
											<g className="navas112">
												<polygon className="navas356" points="691.55,404.35 691.78,403.95 687.8,401.8 687.57,402.2 					" />
											</g>
											<g className="navas216">
												<polygon className="navas357" points="691.55,404.3 691.78,403.91 687.85,401.78 687.62,402.18 					" />
											</g>
											<g className="navas218">
												<polygon className="navas358" points="691.54,404.26 691.77,403.86 687.89,401.76 687.66,402.16 					" />
											</g>
											<g className="navas220">
												<polygon className="navas359" points="691.53,404.21 691.76,403.81 687.94,401.74 687.71,402.14 					" />
											</g>
											<g className="navas221">
												<polygon className="navas360" points="691.53,404.17 691.76,403.77 687.98,401.72 687.75,402.12 					" />
											</g>
											<g className="navas223">
												<polygon className="navas361" points="691.52,404.12 691.75,403.72 688.03,401.71 687.8,402.1 					" />
											</g>
											<g className="navas225">
												<polygon className="navas362" points="691.52,404.07 691.75,403.68 688.07,401.69 687.84,402.08 					" />
											</g>
											<g className="navas227">
												<polygon className="navas363" points="691.51,404.03 691.74,403.63 688.12,401.67 687.89,402.07 					" />
											</g>
											<g className="navas229">
												<polygon className="navas364" points="691.5,403.98 691.73,403.58 688.17,401.65 687.94,402.05 					" />
											</g>
											<g className="navas231">
												<polygon className="navas365" points="691.5,403.94 691.73,403.54 688.21,401.63 687.98,402.03 					" />
											</g>
											<g className="navas233">
												<polygon className="navas366" points="691.49,403.89 691.72,403.49 688.26,401.61 688.03,402.01 					" />
											</g>
											<g className="navas235">
												<polygon className="navas367" points="691.49,403.85 691.72,403.45 688.3,401.59 688.07,401.99 					" />
											</g>
											<g className="navas237">
												<polygon className="navas368" points="691.48,403.8 691.71,403.4 688.35,401.57 688.12,401.97 					" />
											</g>
											<g className="navas239">
												<polygon className="navas369" points="691.47,403.75 691.7,403.36 688.39,401.55 688.16,401.95 					" />
											</g>
											<g className="navas241">
												<polygon className="navas370" points="691.47,403.71 691.7,403.31 688.44,401.54 688.21,401.93 					" />
											</g>
											<g className="navas243">
												<polygon className="navas371" points="691.46,403.66 691.69,403.26 688.49,401.52 688.25,401.91 					" />
											</g>
											<g className="navas244">
												<polygon className="navas372" points="691.45,403.62 691.69,403.22 688.53,401.5 688.3,401.89 					" />
											</g>
											<g className="navas246">
												<polygon className="navas373" points="691.45,403.57 691.68,403.17 688.58,401.48 688.34,401.88 					" />
											</g>
											<g className="navas248">
												<polygon className="navas374" points="691.44,403.52 691.67,403.13 688.62,401.46 688.39,401.86 					" />
											</g>
											<g className="navas250">
												<polygon className="navas375" points="691.44,403.48 691.67,403.08 688.67,401.44 688.44,401.84 					" />
											</g>
											<g className="navas252">
												<polygon className="navas376" points="691.43,403.43 691.66,403.03 688.71,401.42 688.48,401.82 					" />
											</g>
											<g className="navas254">
												<polygon className="navas377" points="691.42,403.39 691.66,402.99 688.76,401.4 688.53,401.8 					" />
											</g>
											<g className="navas130">
												<polygon className="navas378" points="691.42,403.34 691.65,402.94 688.81,401.38 688.57,401.78 					" />
											</g>
											<g className="navas256">
												<polygon className="navas379" points="691.41,403.29 691.64,402.9 688.85,401.36 688.62,401.76 					" />
											</g>
											<g className="navas258">
												<polygon className="navas380" points="691.41,403.25 691.64,402.85 688.9,401.35 688.66,401.74 					" />
											</g>
											<g className="navas260">
												<polygon className="navas381" points="691.4,403.2 691.63,402.81 688.94,401.33 688.71,401.72 					" />
											</g>
											<g className="navas262">
												<polygon className="navas382" points="691.39,403.16 691.63,402.76 688.99,401.31 688.75,401.7 					" />
											</g>
											<g className="navas264">
												<polygon className="navas383" points="691.39,403.11 691.62,402.71 689.03,401.29 688.8,401.69 					" />
											</g>
											<g className="navas266">
												<polygon className="navas384" points="691.38,403.06 691.61,402.67 689.08,401.27 688.85,401.67 					" />
											</g>
											<g className="navas268">
												<polygon className="navas385" points="691.37,403.02 691.61,402.62 689.13,401.25 688.89,401.65 					" />
											</g>
											<g className="navas270">
												<polygon className="navas386" points="691.37,402.97 691.6,402.58 689.17,401.23 688.94,401.63 					" />
											</g>
											<g className="navas272">
												<polygon className="navas387" points="691.36,402.93 691.6,402.53 689.22,401.21 688.98,401.61 					" />
											</g>
											<g className="navas274">
												<polygon className="navas388" points="691.36,402.88 691.59,402.48 689.26,401.19 689.03,401.59 					" />
											</g>
											<g className="navas276">
												<polygon className="navas389" points="691.35,402.83 691.59,402.44 689.31,401.18 689.07,401.57 					" />
											</g>
											<g className="navas278">
												<polygon className="navas390" points="691.34,402.79 691.58,402.39 689.35,401.16 689.12,401.55 					" />
											</g>
											<g className="navas280">
												<polygon className="navas391" points="691.34,402.74 691.57,402.35 689.4,401.14 689.16,401.53 					" />
											</g>
											<g className="navas281">
												<polygon className="navas392" points="691.33,402.7 691.57,402.3 689.45,401.12 689.21,401.51 					" />
											</g>
											<g className="navas283">
												<polygon className="navas393" points="691.32,402.65 691.56,402.26 689.49,401.1 689.25,401.49 					" />
											</g>
											<g className="navas285">
												<polygon className="navas394" points="691.32,402.61 691.56,402.21 689.54,401.08 689.3,401.48 					" />
											</g>
											<g className="navas287">
												<polygon className="navas395" points="691.31,402.56 691.55,402.16 689.58,401.06 689.35,401.46 					" />
											</g>
											<g className="navas289">
												<polygon className="navas396" points="691.31,402.51 691.54,402.12 689.63,401.04 689.39,401.44 					" />
											</g>
											<g className="navas291">
												<polygon className="navas397" points="691.3,402.47 691.54,402.07 689.67,401.02 689.44,401.42 					" />
											</g>
											<g className="navas292">
												<polygon className="navas398" points="691.29,402.42 691.53,402.03 689.72,401.01 689.48,401.4 					" />
											</g>
											<g className="navas294">
												<polygon className="navas399" points="691.29,402.38 691.53,401.98 689.77,400.99 689.53,401.38 					" />
											</g>
											<g className="navas148">
												<polygon className="navas400" points="691.28,402.33 691.52,401.94 689.81,400.97 689.57,401.36 					" />
											</g>
											<g className="navas297">
												<polygon className="navas401" points="691.27,402.28 691.51,401.89 689.86,400.95 689.62,401.34 					" />
											</g>
											<g className="navas299">
												<polygon className="navas402" points="691.27,402.24 691.51,401.84 689.9,400.93 689.66,401.32 					" />
											</g>
											<g className="navas300">
												<polygon className="navas403" points="691.26,402.19 691.5,401.8 689.95,400.91 689.71,401.3 					" />
											</g>
											<g className="navas302">
												<polygon className="navas404" points="691.26,402.15 691.5,401.75 690,400.89 689.75,401.28 					" />
											</g>
											<g className="navas304">
												<polygon className="navas405" points="691.25,402.1 691.49,401.71 690.04,400.87 689.8,401.27 					" />
											</g>
											<g className="navas306">
												<polygon className="navas406" points="691.24,402.05 691.49,401.66 690.09,400.86 689.84,401.25 					" />
											</g>
											<g className="navas308">
												<polygon className="navas407" points="691.24,402.01 691.48,401.62 690.13,400.84 689.89,401.23 					" />
											</g>
											<g className="navas310">
												<polygon className="navas408" points="691.23,401.96 691.47,401.57 690.18,400.82 689.93,401.21 					" />
											</g>
											<g className="navas311">
												<polygon className="navas409" points="691.22,401.91 691.47,401.53 690.23,400.8 689.98,401.19 					" />
											</g>
											<g className="navas313">
												<polygon className="navas410" points="691.22,401.87 691.46,401.48 690.27,400.78 690.02,401.17 					" />
											</g>
											<g className="navas315">
												<polygon className="navas411" points="691.21,401.82 691.46,401.43 690.32,400.76 690.07,401.15 					" />
											</g>
											<g className="navas317">
												<polygon className="navas412" points="691.2,401.78 691.45,401.39 690.36,400.74 690.11,401.13 					" />
											</g>
											<g className="navas319">
												<polygon className="navas413" points="691.2,401.73 691.45,401.34 690.41,400.72 690.16,401.11 					" />
											</g>
											<g className="navas321">
												<polygon className="navas414" points="691.19,401.68 691.44,401.3 690.46,400.71 690.21,401.09 					" />
											</g>
											<g className="navas323">
												<polygon className="navas415" points="691.18,401.64 691.44,401.25 690.5,400.69 690.25,401.07 					" />
											</g>
											<g className="navas324">
												<polygon className="navas416" points="691.18,401.59 691.43,401.21 690.55,400.67 690.29,401.05 					" />
											</g>
											<g className="navas326">
												<polygon className="navas417" points="691.17,401.55 691.43,401.16 690.59,400.65 690.34,401.03 					" />
											</g>
											<g className="navas328">
												<polygon className="navas418" points="691.16,401.5 691.42,401.12 690.64,400.63 690.38,401.01 					" />
											</g>
											<g className="navas330">
												<polygon className="navas419" points="691.16,401.45 691.42,401.07 690.69,400.61 690.43,400.99 					" />
											</g>
											<g className="navas331">
												<polygon className="navas420" points="691.15,401.41 691.41,401.03 690.74,400.6 690.47,400.97 					" />
											</g>
											<g className="navas333">
												<polygon className="navas421" points="691.14,401.36 691.41,400.98 690.78,400.58 690.52,400.95 					" />
											</g>
											<g>
												<polygon className="navas76" points="691.13,401.31 691.4,400.94 690.83,400.56 690.56,400.93 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas72" points="685.29,401.9 685.52,401.5 680.42,398.76 680.19,399.16 					" />
											</g>
											<g className="navas176">
												<polygon className="navas335" points="685.28,401.85 685.51,401.45 680.46,398.74 680.23,399.14 					" />
											</g>
											<g className="navas177">
												<polygon className="navas336" points="685.28,401.81 685.51,401.41 680.51,398.73 680.28,399.12 					" />
											</g>
											<g className="navas179">
												<polygon className="navas337" points="685.27,401.76 685.5,401.36 680.55,398.71 680.32,399.1 					" />
											</g>
											<g className="navas181">
												<polygon className="navas338" points="685.26,401.71 685.49,401.32 680.6,398.69 680.37,399.09 					" />
											</g>
											<g className="navas183">
												<polygon className="navas339" points="685.26,401.67 685.49,401.27 680.64,398.67 680.41,399.07 					" />
											</g>
											<g className="navas185">
												<polygon className="navas340" points="685.25,401.62 685.48,401.22 680.69,398.65 680.46,399.05 					" />
											</g>
											<g className="navas187">
												<polygon className="navas341" points="685.25,401.58 685.48,401.18 680.73,398.63 680.51,399.03 					" />
											</g>
											<g className="navas189">
												<polygon className="navas342" points="685.24,401.53 685.47,401.13 680.78,398.61 680.55,399.01 					" />
											</g>
											<g className="navas191">
												<polygon className="navas343" points="685.23,401.48 685.46,401.09 680.83,398.59 680.6,398.99 					" />
											</g>
											<g className="navas193">
												<polygon className="navas344" points="685.23,401.44 685.46,401.04 680.87,398.57 680.64,398.97 					" />
											</g>
											<g className="navas195">
												<polygon className="navas345" points="685.22,401.39 685.45,400.99 680.92,398.56 680.69,398.95 					" />
											</g>
											<g className="navas197">
												<polygon className="navas346" points="685.22,401.35 685.45,400.95 680.96,398.54 680.73,398.93 					" />
											</g>
											<g className="navas199">
												<polygon className="navas347" points="685.21,401.3 685.44,400.9 681.01,398.52 680.78,398.92 					" />
											</g>
											<g className="navas201">
												<polygon className="navas348" points="685.2,401.26 685.43,400.86 681.05,398.5 680.82,398.9 					" />
											</g>
											<g className="navas203">
												<polygon className="navas349" points="685.2,401.21 685.43,400.81 681.1,398.48 680.87,398.88 					" />
											</g>
											<g className="navas204">
												<polygon className="navas350" points="685.19,401.16 685.42,400.77 681.15,398.46 680.91,398.86 					" />
											</g>
											<g className="navas206">
												<polygon className="navas351" points="685.19,401.12 685.42,400.72 681.19,398.44 680.96,398.84 					" />
											</g>
											<g className="navas208">
												<polygon className="navas352" points="685.18,401.07 685.41,400.67 681.24,398.42 681.01,398.82 					" />
											</g>
											<g className="navas209">
												<polygon className="navas353" points="685.17,401.03 685.4,400.63 681.28,398.4 681.05,398.8 					" />
											</g>
											<g className="navas211">
												<polygon className="navas354" points="685.17,400.98 685.4,400.58 681.33,398.39 681.1,398.78 					" />
											</g>
											<g className="navas213">
												<polygon className="navas355" points="685.16,400.94 685.39,400.54 681.37,398.37 681.14,398.76 					" />
											</g>
											<g className="navas112">
												<polygon className="navas356" points="685.16,400.89 685.39,400.49 681.42,398.35 681.19,398.74 					" />
											</g>
											<g className="navas216">
												<polygon className="navas357" points="685.15,400.84 685.38,400.45 681.46,398.33 681.23,398.73 					" />
											</g>
											<g className="navas218">
												<polygon className="navas358" points="685.14,400.8 685.38,400.4 681.51,398.31 681.28,398.71 					" />
											</g>
											<g className="navas220">
												<polygon className="navas359" points="685.14,400.75 685.37,400.35 681.55,398.29 681.32,398.69 					" />
											</g>
											<g className="navas221">
												<polygon className="navas360" points="685.13,400.71 685.36,400.31 681.6,398.27 681.37,398.67 					" />
											</g>
											<g className="navas223">
												<polygon className="navas361" points="685.13,400.66 685.36,400.26 681.65,398.25 681.42,398.65 					" />
											</g>
											<g className="navas225">
												<polygon className="navas362" points="685.12,400.61 685.35,400.22 681.69,398.23 681.46,398.63 					" />
											</g>
											<g className="navas227">
												<polygon className="navas363" points="685.11,400.57 685.35,400.17 681.74,398.21 681.51,398.61 					" />
											</g>
											<g className="navas229">
												<polygon className="navas364" points="685.11,400.52 685.34,400.13 681.78,398.2 681.55,398.59 					" />
											</g>
											<g className="navas231">
												<polygon className="navas365" points="685.1,400.48 685.33,400.08 681.83,398.18 681.6,398.57 					" />
											</g>
											<g className="navas233">
												<polygon className="navas366" points="685.1,400.43 685.33,400.03 681.87,398.16 681.64,398.55 					" />
											</g>
											<g className="navas235">
												<polygon className="navas367" points="685.09,400.39 685.32,399.99 681.92,398.14 681.69,398.54 					" />
											</g>
											<g className="navas237">
												<polygon className="navas368" points="685.08,400.34 685.32,399.94 681.97,398.12 681.73,398.52 					" />
											</g>
											<g className="navas239">
												<polygon className="navas369" points="685.08,400.29 685.31,399.9 682.01,398.1 681.78,398.5 					" />
											</g>
											<g className="navas241">
												<polygon className="navas370" points="685.07,400.25 685.3,399.85 682.06,398.08 681.82,398.48 					" />
											</g>
											<g className="navas243">
												<polygon className="navas371" points="685.07,400.2 685.3,399.81 682.1,398.06 681.87,398.46 					" />
											</g>
											<g className="navas244">
												<polygon className="navas372" points="685.06,400.16 685.29,399.76 682.15,398.04 681.92,398.44 					" />
											</g>
											<g className="navas246">
												<polygon className="navas373" points="685.05,400.11 685.29,399.71 682.19,398.03 681.96,398.42 					" />
											</g>
											<g className="navas248">
												<polygon className="navas374" points="685.05,400.06 685.28,399.67 682.24,398.01 682.01,398.4 					" />
											</g>
											<g className="navas250">
												<polygon className="navas375" points="685.04,400.02 685.27,399.62 682.28,397.99 682.05,398.38 					" />
											</g>
											<g className="navas252">
												<polygon className="navas376" points="685.04,399.97 685.27,399.58 682.33,397.97 682.1,398.36 					" />
											</g>
											<g className="navas254">
												<polygon className="navas377" points="685.03,399.93 685.26,399.53 682.38,397.95 682.14,398.35 					" />
											</g>
											<g className="navas130">
												<polygon className="navas378" points="685.02,399.88 685.26,399.49 682.42,397.93 682.19,398.33 					" />
											</g>
											<g className="navas256">
												<polygon className="navas379" points="685.02,399.84 685.25,399.44 682.47,397.91 682.23,398.31 					" />
											</g>
											<g className="navas258">
												<polygon className="navas380" points="685.01,399.79 685.25,399.39 682.51,397.89 682.28,398.29 					" />
											</g>
											<g className="navas260">
												<polygon className="navas381" points="685.01,399.74 685.24,399.35 682.56,397.87 682.32,398.27 					" />
											</g>
											<g className="navas262">
												<polygon className="navas382" points="685,399.7 685.23,399.3 682.6,397.86 682.37,398.25 					" />
											</g>
											<g className="navas264">
												<polygon className="navas383" points="684.99,399.65 685.23,399.26 682.65,397.84 682.41,398.23 					" />
											</g>
											<g className="navas266">
												<polygon className="navas384" points="684.99,399.61 685.22,399.21 682.7,397.82 682.46,398.21 					" />
											</g>
											<g className="navas268">
												<polygon className="navas385" points="684.98,399.56 685.22,399.17 682.74,397.8 682.51,398.19 					" />
											</g>
											<g className="navas270">
												<polygon className="navas386" points="684.98,399.52 685.21,399.12 682.79,397.78 682.55,398.17 					" />
											</g>
											<g className="navas272">
												<polygon className="navas387" points="684.97,399.47 685.2,399.07 682.83,397.76 682.6,398.16 					" />
											</g>
											<g className="navas274">
												<polygon className="navas388" points="684.96,399.42 685.2,399.03 682.88,397.74 682.64,398.14 					" />
											</g>
											<g className="navas276">
												<polygon className="navas389" points="684.96,399.38 685.19,398.98 682.92,397.72 682.69,398.12 					" />
											</g>
											<g className="navas278">
												<polygon className="navas390" points="684.95,399.33 685.19,398.94 682.97,397.7 682.73,398.1 					" />
											</g>
											<g className="navas280">
												<polygon className="navas391" points="684.94,399.29 685.18,398.89 683.01,397.69 682.78,398.08 					" />
											</g>
											<g className="navas281">
												<polygon className="navas392" points="684.94,399.24 685.18,398.85 683.06,397.67 682.82,398.06 					" />
											</g>
											<g className="navas283">
												<polygon className="navas393" points="684.93,399.19 685.17,398.8 683.11,397.65 682.87,398.04 					" />
											</g>
											<g className="navas285">
												<polygon className="navas394" points="684.93,399.15 685.16,398.75 683.15,397.63 682.91,398.02 					" />
											</g>
											<g className="navas287">
												<polygon className="navas395" points="684.92,399.1 685.16,398.71 683.2,397.61 682.96,398 					" />
											</g>
											<g className="navas289">
												<polygon className="navas396" points="684.91,399.06 685.15,398.66 683.24,397.59 683.01,397.98 					" />
											</g>
											<g className="navas291">
												<polygon className="navas397" points="684.91,399.01 685.15,398.62 683.29,397.57 683.05,397.97 					" />
											</g>
											<g className="navas292">
												<polygon className="navas398" points="684.9,398.97 685.14,398.57 683.33,397.55 683.1,397.95 					" />
											</g>
											<g className="navas294">
												<polygon className="navas399" points="684.9,398.92 685.13,398.53 683.38,397.54 683.14,397.93 					" />
											</g>
											<g className="navas148">
												<polygon className="navas400" points="684.89,398.87 685.13,398.48 683.43,397.52 683.19,397.91 					" />
											</g>
											<g className="navas297">
												<polygon className="navas401" points="684.88,398.83 685.12,398.44 683.47,397.5 683.23,397.89 					" />
											</g>
											<g className="navas299">
												<polygon className="navas402" points="684.88,398.78 685.12,398.39 683.52,397.48 683.28,397.87 					" />
											</g>
											<g className="navas300">
												<polygon className="navas403" points="684.87,398.74 685.11,398.34 683.56,397.46 683.32,397.85 					" />
											</g>
											<g className="navas302">
												<polygon className="navas404" points="684.86,398.69 685.11,398.3 683.61,397.44 683.37,397.83 					" />
											</g>
											<g className="navas304">
												<polygon className="navas405" points="684.86,398.64 685.1,398.25 683.65,397.42 683.41,397.81 					" />
											</g>
											<g className="navas306">
												<polygon className="navas406" points="684.85,398.6 685.09,398.21 683.7,397.4 683.46,397.79 					" />
											</g>
											<g className="navas308">
												<polygon className="navas407" points="684.85,398.55 685.09,398.16 683.75,397.38 683.5,397.77 					" />
											</g>
											<g className="navas310">
												<polygon className="navas408" points="684.84,398.51 685.08,398.12 683.79,397.37 683.55,397.76 					" />
											</g>
											<g className="navas311">
												<polygon className="navas409" points="684.83,398.46 685.08,398.07 683.84,397.35 683.59,397.74 					" />
											</g>
											<g className="navas313">
												<polygon className="navas410" points="684.83,398.41 685.07,398.03 683.88,397.33 683.64,397.72 					" />
											</g>
											<g className="navas315">
												<polygon className="navas411" points="684.82,398.37 685.07,397.98 683.93,397.31 683.68,397.7 					" />
											</g>
											<g className="navas317">
												<polygon className="navas412" points="684.81,398.32 685.06,397.94 683.98,397.29 683.73,397.68 					" />
											</g>
											<g className="navas319">
												<polygon className="navas413" points="684.81,398.28 685.06,397.89 684.02,397.27 683.77,397.66 					" />
											</g>
											<g className="navas321">
												<polygon className="navas414" points="684.8,398.23 685.05,397.84 684.07,397.25 683.82,397.64 					" />
											</g>
											<g className="navas323">
												<polygon className="navas415" points="684.79,398.18 685.05,397.8 684.11,397.24 683.86,397.62 					" />
											</g>
											<g className="navas324">
												<polygon className="navas416" points="684.79,398.14 685.04,397.75 684.16,397.22 683.91,397.6 					" />
											</g>
											<g className="navas326">
												<polygon className="navas417" points="684.78,398.09 685.04,397.71 684.21,397.2 683.95,397.58 					" />
											</g>
											<g className="navas328">
												<polygon className="navas418" points="684.77,398.05 685.03,397.66 684.25,397.18 684,397.56 					" />
											</g>
											<g className="navas330">
												<polygon className="navas419" points="684.77,398 685.03,397.62 684.3,397.16 684.04,397.54 					" />
											</g>
											<g className="navas331">
												<polygon className="navas420" points="684.76,397.95 685.02,397.57 684.35,397.14 684.09,397.52 					" />
											</g>
											<g className="navas333">
												<polygon className="navas421" points="684.75,397.91 685.02,397.53 684.39,397.13 684.13,397.5 					" />
											</g>
											<g>
												<polygon className="navas76" points="684.74,397.86 685.01,397.48 684.44,397.11 684.17,397.48 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="678.94,398.56 679.17,398.16 674.09,395.43 673.86,395.83 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="678.94,398.51 679.17,398.11 674.13,395.41 673.9,395.81 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="678.93,398.47 679.16,398.07 674.18,395.4 673.95,395.79 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="678.93,398.42 679.16,398.02 674.22,395.38 674,395.77 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="678.92,398.38 679.15,397.98 674.27,395.36 674.04,395.76 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="678.92,398.33 679.14,397.93 674.32,395.34 674.09,395.74 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="678.91,398.28 679.14,397.89 674.36,395.32 674.13,395.72 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="678.9,398.24 679.13,397.84 674.41,395.3 674.18,395.7 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="678.9,398.19 679.13,397.79 674.45,395.28 674.22,395.68 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="678.89,398.15 679.12,397.75 674.5,395.26 674.27,395.66 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="678.89,398.1 679.12,397.7 674.54,395.24 674.31,395.64 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="678.88,398.06 679.11,397.66 674.59,395.23 674.36,395.62 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="678.87,398.01 679.1,397.61 674.63,395.21 674.4,395.6 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="678.87,397.96 679.1,397.57 674.68,395.19 674.45,395.58 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="678.86,397.92 679.09,397.52 674.73,395.17 674.5,395.57 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="678.86,397.87 679.09,397.47 674.77,395.15 674.54,395.55 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="678.85,397.83 679.08,397.43 674.82,395.13 674.59,395.53 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="678.84,397.78 679.07,397.38 674.86,395.11 674.63,395.51 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="678.84,397.74 679.07,397.34 674.91,395.09 674.68,395.49 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="678.83,397.69 679.06,397.29 674.95,395.07 674.72,395.47 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="678.83,397.64 679.06,397.25 675,395.06 674.77,395.45 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="678.82,397.6 679.05,397.2 675.04,395.04 674.81,395.43 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="678.81,397.55 679.05,397.16 675.09,395.02 674.86,395.41 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="678.81,397.51 679.04,397.11 675.13,395 674.9,395.4 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="678.8,397.46 679.03,397.06 675.18,394.98 674.95,395.38 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="678.8,397.42 679.03,397.02 675.23,394.96 674.99,395.36 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="678.79,397.37 679.02,396.97 675.27,394.94 675.04,395.34 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="678.79,397.32 679.02,396.93 675.32,394.92 675.09,395.32 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="678.78,397.28 679.01,396.88 675.36,394.9 675.13,395.3 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="678.77,397.23 679,396.84 675.41,394.89 675.18,395.28 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="678.77,397.19 679,396.79 675.45,394.87 675.22,395.26 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="678.76,397.14 678.99,396.75 675.5,394.85 675.27,395.24 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="678.76,397.1 678.99,396.7 675.54,394.83 675.31,395.23 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="678.75,397.05 678.98,396.65 675.59,394.81 675.36,395.21 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="678.74,397 678.98,396.61 675.64,394.79 675.4,395.19 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="678.74,396.96 678.97,396.56 675.68,394.77 675.45,395.17 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="678.73,396.91 678.96,396.52 675.73,394.75 675.49,395.15 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="678.73,396.87 678.96,396.47 675.77,394.73 675.54,395.13 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="678.72,396.82 678.95,396.43 675.82,394.72 675.59,395.11 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="678.71,396.78 678.95,396.38 675.86,394.7 675.63,395.09 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="678.71,396.73 678.94,396.33 675.91,394.68 675.68,395.07 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="678.7,396.68 678.94,396.29 675.95,394.66 675.72,395.05 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="678.7,396.64 678.93,396.24 676,394.64 675.77,395.04 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="678.69,396.59 678.92,396.2 676.05,394.62 675.81,395.02 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="678.68,396.55 678.92,396.15 676.09,394.6 675.86,395 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="678.68,396.5 678.91,396.11 676.14,394.58 675.9,394.98 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="678.67,396.46 678.91,396.06 676.18,394.57 675.95,394.96 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="678.67,396.41 678.9,396.02 676.23,394.55 675.99,394.94 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="678.66,396.36 678.89,395.97 676.27,394.53 676.04,394.92 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="678.65,396.32 678.89,395.92 676.32,394.51 676.08,394.9 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="678.65,396.27 678.88,395.88 676.36,394.49 676.13,394.88 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="678.64,396.23 678.88,395.83 676.41,394.47 676.17,394.86 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="678.64,396.18 678.87,395.79 676.46,394.45 676.22,394.85 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="678.63,396.14 678.87,395.74 676.5,394.43 676.27,394.83 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="678.62,396.09 678.86,395.7 676.55,394.41 676.31,394.81 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="678.62,396.04 678.85,395.65 676.59,394.4 676.36,394.79 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="678.61,396 678.85,395.61 676.64,394.38 676.4,394.77 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="678.61,395.95 678.84,395.56 676.68,394.36 676.45,394.75 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="678.6,395.91 678.84,395.51 676.73,394.34 676.49,394.73 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="678.59,395.86 678.83,395.47 676.77,394.32 676.54,394.71 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="678.59,395.82 678.83,395.42 676.82,394.3 676.58,394.69 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="678.58,395.77 678.82,395.38 676.87,394.28 676.63,394.67 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="678.58,395.73 678.81,395.33 676.91,394.26 676.67,394.66 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="678.57,395.68 678.81,395.29 676.96,394.25 676.72,394.64 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="678.56,395.63 678.8,395.24 677,394.23 676.76,394.62 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="678.56,395.59 678.8,395.2 677.05,394.21 676.81,394.6 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="678.55,395.54 678.79,395.15 677.09,394.19 676.85,394.58 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="678.55,395.5 678.79,395.11 677.14,394.17 676.9,394.56 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="678.54,395.45 678.78,395.06 677.19,394.15 676.94,394.54 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="678.53,395.4 678.77,395.01 677.23,394.13 676.99,394.52 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="678.53,395.36 678.77,394.97 677.28,394.11 677.04,394.5 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="678.52,395.31 678.76,394.92 677.32,394.09 677.08,394.48 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="678.51,395.27 678.76,394.88 677.37,394.08 677.13,394.47 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="678.51,395.22 678.75,394.83 677.41,394.06 677.17,394.45 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="678.5,395.18 678.75,394.79 677.46,394.04 677.22,394.43 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="678.5,395.13 678.74,394.74 677.51,394.02 677.26,394.41 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="678.49,395.08 678.74,394.7 677.55,394 677.31,394.39 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="678.48,395.04 678.73,394.65 677.6,393.98 677.35,394.37 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="678.48,394.99 678.73,394.61 677.64,393.96 677.4,394.35 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="678.47,394.95 678.72,394.56 677.69,393.95 677.44,394.33 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="678.46,394.9 678.71,394.52 677.74,393.93 677.49,394.31 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="678.46,394.85 678.71,394.47 677.78,393.91 677.53,394.29 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="678.45,394.81 678.7,394.43 677.83,393.89 677.57,394.27 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="678.44,394.76 678.7,394.38 677.87,393.87 677.62,394.25 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="678.44,394.72 678.69,394.34 677.92,393.85 677.66,394.23 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="678.43,394.67 678.69,394.29 677.97,393.84 677.71,394.21 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="678.42,394.62 678.69,394.25 678.01,393.82 677.75,394.19 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="678.42,394.58 678.68,394.2 678.06,393.8 677.8,394.18 					" />
											</g>
											<g>
												<polygon className="navas76" points="678.41,394.53 678.68,394.16 678.11,393.78 677.84,394.16 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="672.62,395.13 672.85,394.73 667.78,392.02 667.55,392.41 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="672.61,395.09 672.84,394.69 667.82,392 667.59,392.39 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="672.61,395.04 672.84,394.64 667.87,391.98 667.64,392.38 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="672.6,395 672.83,394.6 667.91,391.96 667.68,392.36 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="672.59,394.95 672.82,394.55 667.96,391.94 667.73,392.34 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="672.59,394.9 672.82,394.51 668.01,391.92 667.78,392.32 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="672.58,394.86 672.81,394.46 668.05,391.9 667.82,392.3 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="672.58,394.81 672.81,394.42 668.1,391.89 667.87,392.28 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="672.57,394.77 672.8,394.37 668.14,391.87 667.91,392.26 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="672.57,394.72 672.8,394.33 668.19,391.85 667.96,392.24 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="672.56,394.68 672.79,394.28 668.23,391.83 668,392.22 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="672.55,394.63 672.78,394.23 668.28,391.81 668.05,392.21 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="672.55,394.58 672.78,394.19 668.32,391.79 668.09,392.19 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="672.54,394.54 672.77,394.14 668.37,391.77 668.14,392.17 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="672.54,394.49 672.77,394.1 668.41,391.75 668.18,392.15 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="672.53,394.45 672.76,394.05 668.46,391.73 668.23,392.13 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="672.53,394.4 672.76,394.01 668.51,391.72 668.27,392.11 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="672.52,394.36 672.75,393.96 668.55,391.7 668.32,392.09 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="672.51,394.31 672.74,393.92 668.6,391.68 668.37,392.07 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="672.51,394.27 672.74,393.87 668.64,391.66 668.41,392.05 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="672.5,394.22 672.73,393.82 668.69,391.64 668.46,392.04 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="672.5,394.17 672.73,393.78 668.73,391.62 668.5,392.02 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="672.49,394.13 672.72,393.73 668.78,391.6 668.55,392 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="672.48,394.08 672.72,393.69 668.82,391.58 668.59,391.98 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="672.48,394.04 672.71,393.64 668.87,391.56 668.64,391.96 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="672.47,393.99 672.7,393.6 668.91,391.55 668.68,391.94 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="672.47,393.95 672.7,393.55 668.96,391.53 668.73,391.92 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="672.46,393.9 672.69,393.51 669.01,391.51 668.77,391.9 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="672.46,393.86 672.69,393.46 669.05,391.49 668.82,391.88 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="672.45,393.81 672.68,393.41 669.1,391.47 668.86,391.87 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="672.44,393.76 672.68,393.37 669.14,391.45 668.91,391.85 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="672.44,393.72 672.67,393.32 669.19,391.43 668.96,391.83 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="672.43,393.67 672.66,393.28 669.23,391.41 669,391.81 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="672.43,393.63 672.66,393.23 669.28,391.4 669.05,391.79 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="672.42,393.58 672.65,393.19 669.32,391.38 669.09,391.77 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="672.41,393.54 672.65,393.14 669.37,391.36 669.14,391.75 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="672.41,393.49 672.64,393.1 669.41,391.34 669.18,391.73 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="672.4,393.45 672.64,393.05 669.46,391.32 669.23,391.71 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="672.4,393.4 672.63,393.01 669.5,391.3 669.27,391.7 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="672.39,393.35 672.62,392.96 669.55,391.28 669.32,391.68 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="672.39,393.31 672.62,392.91 669.6,391.26 669.36,391.66 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="672.38,393.26 672.61,392.87 669.64,391.24 669.41,391.64 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="672.37,393.22 672.61,392.82 669.69,391.23 669.45,391.62 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="672.37,393.17 672.6,392.78 669.73,391.21 669.5,391.6 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="672.36,393.13 672.6,392.73 669.78,391.19 669.54,391.58 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="672.36,393.08 672.59,392.69 669.82,391.17 669.59,391.56 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="672.35,393.04 672.58,392.64 669.87,391.15 669.63,391.54 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="672.34,392.99 672.58,392.6 669.91,391.13 669.68,391.53 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="672.34,392.94 672.57,392.55 669.96,391.11 669.73,391.51 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="672.33,392.9 672.57,392.51 670.01,391.09 669.77,391.49 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="672.33,392.85 672.56,392.46 670.05,391.08 669.82,391.47 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="672.32,392.81 672.56,392.41 670.1,391.06 669.86,391.45 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="672.31,392.76 672.55,392.37 670.14,391.04 669.91,391.43 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="672.31,392.72 672.54,392.32 670.19,391.02 669.95,391.41 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="672.3,392.67 672.54,392.28 670.23,391 670,391.39 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="672.3,392.63 672.53,392.23 670.28,390.98 670.04,391.37 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="672.29,392.58 672.53,392.19 670.32,390.96 670.09,391.35 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="672.29,392.53 672.52,392.14 670.37,390.94 670.13,391.34 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="672.28,392.49 672.52,392.1 670.41,390.92 670.18,391.32 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="672.27,392.44 672.51,392.05 670.46,390.91 670.22,391.3 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="672.27,392.4 672.5,392.01 670.51,390.89 670.27,391.28 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="672.26,392.35 672.5,391.96 670.55,390.87 670.31,391.26 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="672.26,392.31 672.49,391.92 670.6,390.85 670.36,391.24 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="672.25,392.26 672.49,391.87 670.64,390.83 670.4,391.22 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="672.24,392.22 672.48,391.82 670.69,390.81 670.45,391.2 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="672.24,392.17 672.48,391.78 670.73,390.79 670.49,391.18 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="672.23,392.12 672.47,391.73 670.78,390.77 670.54,391.16 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="672.23,392.08 672.47,391.69 670.83,390.76 670.59,391.15 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="672.22,392.03 672.46,391.64 670.87,390.74 670.63,391.13 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="672.21,391.99 672.46,391.6 670.92,390.72 670.67,391.11 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="672.21,391.94 672.45,391.55 670.96,390.7 670.72,391.09 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="672.2,391.9 672.44,391.51 671.01,390.68 670.76,391.07 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="672.2,391.85 672.44,391.46 671.05,390.66 670.81,391.05 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="672.19,391.8 672.43,391.42 671.1,390.64 670.86,391.03 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="672.18,391.76 672.43,391.37 671.15,390.63 670.9,391.01 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="672.18,391.71 672.42,391.33 671.19,390.61 670.94,390.99 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="672.17,391.67 672.42,391.28 671.24,390.59 670.99,390.97 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="672.16,391.62 672.41,391.24 671.28,390.57 671.04,390.96 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="672.16,391.58 672.41,391.19 671.33,390.55 671.08,390.94 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="672.15,391.53 672.4,391.15 671.37,390.53 671.12,390.92 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="672.14,391.48 672.4,391.1 671.42,390.51 671.17,390.9 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="672.14,391.44 672.39,391.06 671.47,390.5 671.21,390.88 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="672.13,391.39 672.39,391.01 671.51,390.48 671.26,390.86 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="672.13,391.35 672.38,390.97 671.56,390.46 671.3,390.84 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="672.12,391.3 672.38,390.92 671.61,390.44 671.35,390.82 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="672.11,391.25 672.37,390.88 671.65,390.42 671.39,390.8 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="672.1,391.21 672.37,390.83 671.7,390.4 671.44,390.78 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="672.1,391.16 672.36,390.79 671.75,390.39 671.48,390.76 					" />
											</g>
											<g>
												<polygon className="navas76" points="672.09,391.11 672.36,390.74 671.79,390.37 671.52,390.74 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="666.24,391.68 666.47,391.28 661.42,388.58 661.19,388.97 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="666.23,391.64 666.46,391.24 661.46,388.56 661.23,388.95 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="666.23,391.59 666.46,391.19 661.51,388.54 661.28,388.93 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="666.22,391.54 666.45,391.15 661.55,388.52 661.32,388.91 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="666.22,391.5 666.45,391.1 661.6,388.5 661.37,388.9 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="666.21,391.45 666.44,391.06 661.64,388.48 661.41,388.88 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="666.21,391.41 666.43,391.01 661.69,388.46 661.46,388.86 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="666.2,391.36 666.43,390.97 661.73,388.44 661.5,388.84 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="666.19,391.32 666.42,390.92 661.78,388.43 661.55,388.82 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="666.19,391.27 666.42,390.88 661.82,388.41 661.59,388.8 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="666.18,391.23 666.41,390.83 661.87,388.39 661.64,388.78 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="666.18,391.18 666.41,390.79 661.92,388.37 661.68,388.76 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="666.17,391.14 666.4,390.74 661.96,388.35 661.73,388.75 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="666.16,391.09 666.4,390.69 662.01,388.33 661.78,388.73 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="666.16,391.04 666.39,390.65 662.05,388.31 661.82,388.71 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="666.15,391 666.38,390.6 662.1,388.29 661.87,388.69 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="666.15,390.95 666.38,390.56 662.14,388.27 661.91,388.67 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="666.14,390.91 666.37,390.51 662.19,388.26 661.96,388.65 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="666.14,390.86 666.37,390.47 662.23,388.24 662,388.63 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="666.13,390.82 666.36,390.42 662.28,388.22 662.05,388.61 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="666.12,390.77 666.36,390.38 662.32,388.2 662.09,388.59 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="666.12,390.73 666.35,390.33 662.37,388.18 662.14,388.58 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="666.11,390.68 666.34,390.29 662.41,388.16 662.18,388.56 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="666.11,390.64 666.34,390.24 662.46,388.14 662.23,388.54 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="666.1,390.59 666.33,390.2 662.5,388.12 662.27,388.52 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="666.1,390.54 666.33,390.15 662.55,388.11 662.32,388.5 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="666.09,390.5 666.32,390.1 662.6,388.09 662.36,388.48 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="666.08,390.45 666.32,390.06 662.64,388.07 662.41,388.46 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="666.08,390.41 666.31,390.01 662.69,388.05 662.45,388.44 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="666.07,390.36 666.31,389.97 662.73,388.03 662.5,388.42 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="666.07,390.32 666.3,389.92 662.78,388.01 662.55,388.41 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="666.06,390.27 666.29,389.88 662.82,387.99 662.59,388.39 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="666.06,390.23 666.29,389.83 662.87,387.97 662.64,388.37 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="666.05,390.18 666.28,389.79 662.91,387.96 662.68,388.35 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="666.04,390.14 666.28,389.74 662.96,387.94 662.73,388.33 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="666.04,390.09 666.27,389.7 663,387.92 662.77,388.31 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="666.03,390.04 666.27,389.65 663.05,387.9 662.82,388.29 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="666.03,390 666.26,389.61 663.09,387.88 662.86,388.27 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="666.02,389.95 666.25,389.56 663.14,387.86 662.91,388.25 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="666.02,389.91 666.25,389.51 663.19,387.84 662.95,388.24 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="666.01,389.86 666.24,389.47 663.23,387.82 663,388.22 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="666,389.82 666.24,389.42 663.28,387.8 663.04,388.2 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="666,389.77 666.23,389.38 663.32,387.79 663.09,388.18 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="665.99,389.73 666.23,389.33 663.37,387.77 663.13,388.16 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="665.99,389.68 666.22,389.29 663.41,387.75 663.18,388.14 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="665.98,389.64 666.22,389.24 663.46,387.73 663.22,388.12 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="665.98,389.59 666.21,389.2 663.5,387.71 663.27,388.1 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="665.97,389.54 666.2,389.15 663.55,387.69 663.31,388.08 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="665.96,389.5 666.2,389.11 663.59,387.67 663.36,388.07 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="665.96,389.45 666.19,389.06 663.64,387.65 663.4,388.05 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="665.95,389.41 666.19,389.02 663.69,387.64 663.45,388.03 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="665.95,389.36 666.18,388.97 663.73,387.62 663.5,388.01 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="665.94,389.32 666.18,388.93 663.78,387.6 663.54,387.99 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="665.94,389.27 666.17,388.88 663.82,387.58 663.59,387.97 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="665.93,389.23 666.17,388.83 663.87,387.56 663.63,387.95 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="665.92,389.18 666.16,388.79 663.91,387.54 663.68,387.93 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="665.92,389.14 666.15,388.74 663.96,387.52 663.72,387.91 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="665.91,389.09 666.15,388.7 664,387.5 663.77,387.9 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="665.91,389.04 666.14,388.65 664.05,387.49 663.81,387.88 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="665.9,389 666.14,388.61 664.09,387.47 663.86,387.86 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="665.89,388.95 666.13,388.56 664.14,387.45 663.9,387.84 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="665.89,388.91 666.13,388.52 664.19,387.43 663.95,387.82 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="665.88,388.86 666.12,388.47 664.23,387.41 663.99,387.8 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="665.88,388.82 666.12,388.43 664.28,387.39 664.04,387.78 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="665.87,388.77 666.11,388.38 664.32,387.37 664.08,387.76 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="665.87,388.73 666.1,388.34 664.37,387.35 664.13,387.74 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="665.86,388.68 666.1,388.29 664.41,387.34 664.17,387.73 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="665.85,388.64 666.09,388.25 664.46,387.32 664.22,387.71 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="665.85,388.59 666.09,388.2 664.5,387.3 664.26,387.69 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="665.84,388.54 666.08,388.16 664.55,387.28 664.31,387.67 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="665.84,388.5 666.08,388.11 664.6,387.26 664.35,387.65 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="665.83,388.45 666.07,388.07 664.64,387.24 664.4,387.63 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="665.82,388.41 666.07,388.02 664.69,387.22 664.44,387.61 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="665.82,388.36 666.06,387.98 664.73,387.21 664.49,387.59 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="665.81,388.32 666.06,387.93 664.78,387.19 664.53,387.57 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="665.81,388.27 666.05,387.89 664.82,387.17 664.58,387.55 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="665.8,388.23 666.05,387.84 664.87,387.15 664.62,387.53 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="665.79,388.18 666.04,387.79 664.91,387.13 664.67,387.52 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="665.79,388.13 666.04,387.75 664.96,387.11 664.71,387.5 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="665.78,388.09 666.03,387.7 665.01,387.09 664.76,387.48 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="665.77,388.04 666.03,387.66 665.05,387.08 664.8,387.46 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="665.77,388 666.02,387.61 665.1,387.06 664.85,387.44 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="665.76,387.95 666.02,387.57 665.14,387.04 664.89,387.42 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="665.75,387.91 666.01,387.53 665.19,387.02 664.94,387.4 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="665.75,387.86 666.01,387.48 665.24,387 664.98,387.38 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="665.74,387.81 666,387.44 665.28,386.98 665.02,387.36 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="665.73,387.77 666,387.39 665.33,386.97 665.07,387.34 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="665.73,387.72 665.99,387.35 665.38,386.95 665.11,387.32 					" />
											</g>
											<g>
												<polygon className="navas76" points="665.72,387.67 665.99,387.3 665.42,386.93 665.16,387.3 					" />
											</g>
										</g>
									</g>
									<g>
										<g>
											<path className="navas75" d="M723.75,416.56c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.39,0.01
					c0.28,0.15,0.52,0.51,0.53,0.81c0.01,0.13-0.03,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.12L723.75,416.56z"/>
											<path className="navas72" d="M722.63,417.92c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.53-0.81
					C722.84,417.5,722.62,417.62,722.63,417.92z"/>
											<path className="navas76" d="M722.73,417.97c0.01,0.24,0.2,0.53,0.43,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.43-0.65
					C722.9,417.63,722.72,417.73,722.73,417.97z"/>
										</g>
										<g>
											<path className="navas75" d="M717.28,413.09c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.52,0.51,0.53,0.81c0.01,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.12L717.28,413.09z"/>
											<path className="navas72" d="M716.16,414.44c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.53-0.81
					C716.37,414.02,716.15,414.14,716.16,414.44z"/>
											<path className="navas76" d="M716.26,414.49c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C716.42,414.15,716.25,414.25,716.26,414.49z"/>
										</g>
										<g>
											<path className="navas75" d="M710.83,409.56c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.53,0.81c0.01,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.79-1.11L710.83,409.56z"/>
											<path className="navas72" d="M709.71,410.91c0.01,0.3,0.25,0.66,0.53,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.25-0.66-0.53-0.81C709.91,410.49,709.7,410.61,709.71,410.91z"/>
											<path className="navas76" d="M709.81,410.96c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C709.97,410.62,709.8,410.72,709.81,410.96z"/>
										</g>
										<g>
											<path className="navas75" d="M704.4,406.09c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.81c0.01,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.1l-0.79-1.11L704.4,406.09z"/>
											<path className="navas72" d="M703.28,407.44c0.01,0.3,0.25,0.66,0.52,0.81s0.49,0.03,0.48-0.27c-0.01-0.3-0.25-0.66-0.52-0.81
					C703.48,407.02,703.27,407.14,703.28,407.44z"/>
											<path className="navas76" d="M703.38,407.49c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C703.54,407.15,703.37,407.25,703.38,407.49z"/>
										</g>
										<g>
											<path className="navas75" d="M698,402.73c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.8c0.01,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.11L698,402.73z"/>
											<path className="navas72" d="M696.88,404.07c0.01,0.3,0.24,0.66,0.52,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.24-0.66-0.52-0.81C697.08,403.66,696.87,403.78,696.88,404.07z"/>
											<path className="navas76" d="M696.97,404.13c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22s-0.2-0.53-0.42-0.65
					C697.14,403.79,696.97,403.89,696.97,404.13z"/>
										</g>
										<g>
											<path className="navas75" d="M691.61,399.29c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.1L691.61,399.29z"/>
											<path className="navas72" d="M690.49,400.63c0.01,0.3,0.24,0.66,0.52,0.8c0.28,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.24-0.66-0.52-0.8
					C690.69,400.21,690.48,400.33,690.49,400.63z"/>
											<path className="navas76" d="M690.59,400.68c0.01,0.24,0.19,0.53,0.42,0.65c0.22,0.12,0.39,0.02,0.39-0.22
					c-0.01-0.24-0.19-0.53-0.42-0.65S690.58,400.44,690.59,400.68z"/>
										</g>
										<g>
											<path className="navas75" d="M685.25,395.91c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.27,0.15,0.51,0.51,0.52,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.1L685.25,395.91z"/>
											<path className="navas72" d="M684.12,397.25c0.01,0.3,0.24,0.65,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.24-0.65-0.52-0.8
					C684.33,396.83,684.11,396.95,684.12,397.25z"/>
											<path className="navas76" d="M684.22,397.3c0.01,0.24,0.19,0.53,0.41,0.64c0.22,0.12,0.39,0.02,0.39-0.22s-0.19-0.53-0.41-0.64
					C684.39,396.97,684.21,397.06,684.22,397.3z"/>
										</g>
										<g>
											<path className="navas75" d="M678.9,392.52c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.27,0.15,0.5,0.5,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.77-1.1L678.9,392.52z"/>
											<path className="navas72" d="M677.78,393.85c0.01,0.29,0.24,0.65,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.24-0.65-0.51-0.8C677.98,393.44,677.77,393.56,677.78,393.85z"/>
											<path className="navas76" d="M677.88,393.9c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.22
					c-0.01-0.24-0.19-0.52-0.41-0.64C678.04,393.57,677.87,393.67,677.88,393.9z"/>
										</g>
										<g>
											<path className="navas75" d="M672.57,389.13c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.07,0.38,0.01
					c0.27,0.15,0.5,0.5,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.77-1.09L672.57,389.13z"/>
											<path className="navas72" d="M671.45,390.46c0.01,0.29,0.24,0.65,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.24-0.65-0.51-0.8C671.66,390.05,671.44,390.17,671.45,390.46z"/>
											<path className="navas76" d="M671.55,390.51c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.21s-0.19-0.52-0.41-0.64
					C671.72,390.18,671.54,390.28,671.55,390.51z"/>
										</g>
										<g>
											<path className="navas75" d="M666.27,385.69c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.07,0.38,0.01
					c0.27,0.15,0.5,0.5,0.51,0.79c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.77-1.09L666.27,385.69z"/>
											<path className="navas72" d="M665.15,387.02c0.01,0.29,0.24,0.65,0.51,0.79c0.27,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.24-0.65-0.51-0.79C665.35,386.61,665.14,386.73,665.15,387.02z"/>
											<path className="navas76" d="M665.24,387.07c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.21
					c-0.01-0.24-0.19-0.52-0.41-0.64C665.41,386.74,665.24,386.84,665.24,387.07z"/>
										</g>
									</g>
									<g>
										<polygon className="navas77" points="652.6,390.79 652.64,392.28 657.52,389.56 657.48,388.06 			" />
										<polygon className="navas78" points="720.04,421.66 720.11,423.19 657.52,389.56 657.48,388.06 			" />
										<polygon className="navas79" points="715.17,425.97 720.11,423.19 657.52,389.56 652.64,392.28 			" />
										<path className="navas169" d="M657.41,388.03l-4.88,2.72l62.57,33.69l4.94-2.77L657.41,388.03z M657.42,388.39l2.11,1.13l-5.85,0.96
				L657.42,388.39z M662.54,391.14l2.11,1.13l-5.86,0.96L662.54,391.14z M658.45,393.05l1.64-3.23l2.11,1.13L658.45,393.05z
				 M667.67,393.89l2.12,1.14l-5.87,0.96L667.67,393.89z M663.57,395.81l1.64-3.23l2.11,1.14L663.57,395.81z M672.81,396.65
				l2.12,1.14l-5.88,0.96L672.81,396.65z M668.71,398.57l1.64-3.24l2.12,1.14L668.71,398.57z M677.97,399.42l2.13,1.14l-5.89,0.96
				L677.97,399.42z M673.86,401.35l1.64-3.25l2.12,1.14L673.86,401.35z M683.14,402.2l2.13,1.15l-5.9,0.96L683.14,402.2z
				 M679.03,404.13l1.64-3.25l2.13,1.14L679.03,404.13z M688.32,404.99l2.14,1.15l-5.91,0.96L688.32,404.99z M684.21,406.91
				l1.63-3.26l2.14,1.15L684.21,406.91z M693.52,407.78l2.14,1.15l-5.92,0.96L693.52,407.78z M689.4,409.71l1.63-3.27l2.14,1.15
				L689.4,409.71z M698.73,410.58l2.15,1.15l-5.93,0.96L698.73,410.58z M694.61,412.51l1.63-3.27l2.15,1.15L694.61,412.51z
				 M703.95,413.38l2.16,1.16l-5.94,0.96L703.95,413.38z M699.83,415.32l1.63-3.28l2.15,1.16L699.83,415.32z M709.19,416.2
				l2.16,1.16l-5.95,0.96L709.19,416.2z M705.06,418.14l1.63-3.28l2.16,1.16L705.06,418.14z M714.44,419.02l2.17,1.16l-5.96,0.96
				L714.44,419.02z M710.31,420.96l1.62-3.29l2.16,1.16L710.31,420.96z M716.72,420.44l-1.75,3.56l-4.68-2.52L716.72,420.44z
				 M709.71,421.17l-4.67-2.51l6.42-1.04L709.71,421.17z M704.46,418.34l-4.65-2.51l6.41-1.04L704.46,418.34z M699.23,415.53
				l-4.64-2.5l6.4-1.04L699.23,415.53z M694.01,412.72l-4.63-2.49l6.39-1.04L694.01,412.72z M688.8,409.91l-4.62-2.49l6.38-1.04
				L688.8,409.91z M683.61,407.12l-4.61-2.48l6.37-1.04L683.61,407.12z M678.43,404.33l-4.59-2.47l6.36-1.04L678.43,404.33z
				 M673.27,401.55l-4.58-2.47l6.35-1.04L673.27,401.55z M668.12,398.78l-4.57-2.46l6.34-1.04L668.12,398.78z M662.98,396.01
				l-4.56-2.45l6.33-1.04L662.98,396.01z M657.86,393.25l-4.55-2.45l6.32-1.04L657.86,393.25z M719.36,421.66l-3.79,2.13l1.62-3.3
				L719.36,421.66z"/>
										<polygon className="navas78" points="715.1,424.43 715.17,425.97 652.64,392.28 652.6,390.79 			" />
										<polygon className="navas77" points="715.1,424.43 715.17,425.97 720.11,423.19 720.04,421.66 			" />
									</g>
									<g>
										<g>
											<path className="navas75" d="M711.96,423.23c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.52,0.52,0.53,0.82c0.01,0.14-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.8-1.12L711.96,423.23z"/>
											<path className="navas72" d="M710.83,424.58c0.01,0.3,0.25,0.67,0.53,0.82c0.28,0.15,0.5,0.03,0.48-0.27c-0.01-0.3-0.25-0.67-0.53-0.82
					C711.04,424.16,710.82,424.28,710.83,424.58z"/>
											<path className="navas76" d="M710.93,424.64c0.01,0.24,0.2,0.54,0.42,0.66c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.54-0.42-0.66
					S710.92,424.4,710.93,424.64z"/>
										</g>
										<g>
											<path className="navas75" d="M705.5,419.73c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.53,0.81c0.01,0.14-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.79-1.12L705.5,419.73z"/>
											<path className="navas72" d="M704.38,421.09c0.01,0.3,0.25,0.66,0.53,0.82c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.25-0.66-0.53-0.81C704.58,420.67,704.36,420.79,704.38,421.09z"/>
											<path className="navas76" d="M704.47,421.14c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					S704.46,420.9,704.47,421.14z"/>
										</g>
										<g>
											<path className="navas75" d="M699.06,416.19c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.23-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.81c0.01,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.79-1.12L699.06,416.19z"/>
											<path className="navas72" d="M697.94,417.54c0.01,0.3,0.24,0.66,0.52,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.25-0.66-0.52-0.81C698.14,417.12,697.93,417.24,697.94,417.54z"/>
											<path className="navas76" d="M698.04,417.6c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C698.2,417.26,698.03,417.36,698.04,417.6z"/>
										</g>
										<g>
											<path className="navas75" d="M692.65,412.71c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.81c0,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.11l-0.78-1.11L692.65,412.71z"/>
											<path className="navas72" d="M691.52,414.06c0.01,0.3,0.24,0.66,0.52,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.24-0.66-0.52-0.81C691.73,413.64,691.51,413.76,691.52,414.06z"/>
											<path className="navas76" d="M691.62,414.11c0.01,0.24,0.2,0.53,0.42,0.65c0.22,0.12,0.4,0.02,0.39-0.22c-0.01-0.24-0.2-0.53-0.42-0.65
					C691.79,413.78,691.61,413.87,691.62,414.11z"/>
										</g>
										<g>
											<path className="navas75" d="M686.26,409.34c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.28,0.15,0.51,0.51,0.52,0.81c0,0.13-0.04,0.23-0.11,0.29l0,0l-1.06,1.1l-0.78-1.11L686.26,409.34z"/>
											<path className="navas72" d="M685.13,410.68c0.01,0.3,0.24,0.66,0.52,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.24-0.66-0.52-0.81C685.34,410.27,685.12,410.39,685.13,410.68z"/>
											<path className="navas76" d="M685.23,410.74c0.01,0.24,0.19,0.53,0.42,0.65c0.22,0.12,0.39,0.02,0.39-0.22
					c-0.01-0.24-0.19-0.53-0.42-0.65C685.4,410.4,685.22,410.5,685.23,410.74z"/>
										</g>
										<g>
											<path className="navas75" d="M679.88,405.88c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.27,0.15,0.51,0.51,0.51,0.81c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.78-1.11L679.88,405.88z"/>
											<path className="navas72" d="M678.76,407.23c0.01,0.3,0.24,0.66,0.51,0.81c0.28,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.3-0.24-0.66-0.51-0.81C678.96,406.81,678.75,406.93,678.76,407.23z"/>
											<path className="navas76" d="M678.86,407.28c0.01,0.24,0.19,0.53,0.41,0.65c0.22,0.12,0.39,0.02,0.39-0.22
					c-0.01-0.24-0.19-0.53-0.41-0.65S678.85,407.04,678.86,407.28z"/>
										</g>
										<g>
											<path className="navas75" d="M673.53,402.49c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.27,0.15,0.5,0.51,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.77-1.1L673.53,402.49z"/>
											<path className="navas72" d="M672.41,403.83c0.01,0.3,0.24,0.66,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27c-0.01-0.3-0.24-0.66-0.51-0.8
					C672.61,403.42,672.4,403.54,672.41,403.83z"/>
											<path className="navas76" d="M672.51,403.88c0.01,0.24,0.19,0.53,0.41,0.65c0.22,0.12,0.39,0.02,0.39-0.22s-0.19-0.53-0.41-0.65
					C672.67,403.55,672.5,403.65,672.51,403.88z"/>
										</g>
										<g>
											<path className="navas75" d="M667.2,399.09c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.08,0.38,0.01
					c0.27,0.15,0.5,0.51,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.1l-0.77-1.1L667.2,399.09z"/>
											<path className="navas72" d="M666.08,400.42c0.01,0.3,0.24,0.65,0.51,0.8s0.49,0.03,0.48-0.27c-0.01-0.3-0.24-0.65-0.51-0.8
					C666.28,400.01,666.07,400.13,666.08,400.42z"/>
											<path className="navas76" d="M666.17,400.47c0.01,0.24,0.19,0.53,0.41,0.64c0.22,0.12,0.39,0.02,0.39-0.22
					c-0.01-0.24-0.19-0.53-0.41-0.64S666.17,400.24,666.17,400.47z"/>
										</g>
										<g>
											<path className="navas75" d="M660.89,395.69c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.07,0.38,0.01
					c0.27,0.15,0.5,0.5,0.51,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.77-1.1L660.89,395.69z"/>
											<path className="navas72" d="M659.77,397.02c0.01,0.29,0.23,0.65,0.51,0.8c0.27,0.15,0.49,0.03,0.48-0.27
					c-0.01-0.29-0.23-0.65-0.51-0.8C659.97,396.6,659.76,396.72,659.77,397.02z"/>
											<path className="navas76" d="M659.86,397.07c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.21
					c-0.01-0.24-0.19-0.52-0.41-0.64C660.03,396.74,659.86,396.83,659.86,397.07z"/>
										</g>
										<g>
											<path className="navas75" d="M654.6,392.24c0.01-0.01,0.02-0.02,0.03-0.03l0,0l0,0c0.09-0.07,0.22-0.07,0.38,0.01
					c0.27,0.15,0.5,0.5,0.5,0.8c0,0.13-0.04,0.23-0.11,0.28l0,0l-1.06,1.09l-0.76-1.09L654.6,392.24z"/>
											<path className="navas72" d="M653.47,393.57c0.01,0.29,0.23,0.65,0.5,0.8c0.27,0.15,0.49,0.03,0.48-0.27c-0.01-0.29-0.23-0.65-0.5-0.8
					C653.68,393.15,653.47,393.27,653.47,393.57z"/>
											<path className="navas76" d="M653.57,393.62c0.01,0.24,0.19,0.52,0.41,0.64c0.22,0.12,0.39,0.02,0.38-0.21
					c-0.01-0.24-0.19-0.52-0.41-0.64C653.74,393.29,653.56,393.38,653.57,393.62z"/>
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="711.99,429.24 712.22,428.84 707.03,426.04 706.8,426.44 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="711.99,429.19 712.22,428.79 707.08,426.02 706.85,426.42 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="711.98,429.15 712.21,428.74 707.12,426 706.9,426.4 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="711.97,429.1 712.2,428.7 707.17,425.98 706.94,426.38 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="711.97,429.05 712.2,428.65 707.22,425.96 706.99,426.36 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="711.96,429.01 712.19,428.6 707.26,425.94 707.03,426.35 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="711.96,428.96 712.18,428.56 707.31,425.92 707.08,426.33 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="711.95,428.91 712.18,428.51 707.35,425.9 707.13,426.31 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="711.94,428.87 712.17,428.46 707.4,425.88 707.17,426.29 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="711.94,428.82 712.17,428.42 707.45,425.86 707.22,426.27 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="711.93,428.77 712.16,428.37 707.49,425.84 707.26,426.25 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="711.92,428.73 712.15,428.32 707.54,425.83 707.31,426.23 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="711.92,428.68 712.15,428.28 707.58,425.81 707.35,426.21 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="711.91,428.63 712.14,428.23 707.63,425.79 707.4,426.19 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="711.9,428.59 712.13,428.18 707.68,425.77 707.45,426.17 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="711.9,428.54 712.13,428.14 707.72,425.75 707.49,426.15 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="711.89,428.49 712.12,428.09 707.77,425.73 707.54,426.13 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="711.88,428.45 712.11,428.04 707.81,425.71 707.58,426.11 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="711.88,428.4 712.11,428 707.86,425.69 707.63,426.1 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="711.87,428.35 712.1,427.95 707.91,425.67 707.68,426.08 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="711.87,428.31 712.1,427.9 707.95,425.65 707.72,426.06 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="711.86,428.26 712.09,427.86 708,425.63 707.77,426.04 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="711.85,428.21 712.08,427.81 708.04,425.61 707.81,426.02 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="711.85,428.17 712.08,427.76 708.09,425.6 707.86,426 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="711.84,428.12 712.07,427.72 708.14,425.58 707.91,425.98 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="711.83,428.07 712.06,427.67 708.18,425.56 707.95,425.96 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="711.83,428.03 712.06,427.62 708.23,425.54 708,425.94 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="711.82,427.98 712.05,427.58 708.27,425.52 708.04,425.92 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="711.81,427.93 712.04,427.53 708.32,425.5 708.09,425.9 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="711.81,427.89 712.04,427.48 708.37,425.48 708.14,425.88 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="711.8,427.84 712.03,427.44 708.41,425.46 708.18,425.87 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="711.79,427.79 712.03,427.39 708.46,425.44 708.23,425.85 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="711.79,427.75 712.02,427.34 708.51,425.42 708.27,425.83 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="711.78,427.7 712.01,427.3 708.55,425.4 708.32,425.81 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="711.77,427.65 712.01,427.25 708.6,425.38 708.37,425.79 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="711.77,427.61 712,427.2 708.64,425.37 708.41,425.77 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="711.76,427.56 711.99,427.16 708.69,425.35 708.46,425.75 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="711.76,427.51 711.99,427.11 708.74,425.33 708.5,425.73 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="711.75,427.47 711.98,427.06 708.78,425.31 708.55,425.71 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="711.74,427.42 711.97,427.02 708.83,425.29 708.59,425.69 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="711.74,427.37 711.97,426.97 708.87,425.27 708.64,425.67 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="711.73,427.33 711.96,426.92 708.92,425.25 708.69,425.65 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="711.72,427.28 711.96,426.88 708.97,425.23 708.73,425.63 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="711.72,427.23 711.95,426.83 709.01,425.21 708.78,425.62 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="711.71,427.19 711.94,426.78 709.06,425.19 708.82,425.6 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="711.7,427.14 711.94,426.74 709.1,425.17 708.87,425.58 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="711.7,427.09 711.93,426.69 709.15,425.16 708.92,425.56 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="711.69,427.05 711.92,426.64 709.2,425.14 708.96,425.54 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="711.68,427 711.92,426.6 709.24,425.12 709.01,425.52 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="711.68,426.95 711.91,426.55 709.29,425.1 709.05,425.5 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="711.67,426.91 711.91,426.51 709.33,425.08 709.1,425.48 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="711.66,426.86 711.9,426.46 709.38,425.06 709.15,425.46 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="711.66,426.81 711.89,426.41 709.43,425.04 709.19,425.44 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="711.65,426.77 711.89,426.37 709.47,425.02 709.24,425.42 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="711.64,426.72 711.88,426.32 709.52,425 709.28,425.4 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="711.64,426.67 711.87,426.27 709.56,424.98 709.33,425.38 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="711.63,426.63 711.87,426.23 709.61,424.96 709.37,425.37 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="711.62,426.58 711.86,426.18 709.66,424.95 709.42,425.35 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="711.62,426.53 711.85,426.13 709.7,424.93 709.47,425.33 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="711.61,426.49 711.85,426.09 709.75,424.91 709.51,425.31 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="711.61,426.44 711.84,426.04 709.8,424.89 709.56,425.29 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="711.6,426.39 711.84,425.99 709.84,424.87 709.6,425.27 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="711.59,426.35 711.83,425.95 709.89,424.85 709.65,425.25 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="711.59,426.3 711.82,425.9 709.93,424.83 709.7,425.23 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="711.58,426.25 711.82,425.85 709.98,424.81 709.74,425.21 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="711.57,426.21 711.81,425.81 710.03,424.79 709.79,425.19 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="711.57,426.16 711.81,425.76 710.07,424.77 709.83,425.17 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="711.56,426.11 711.8,425.72 710.12,424.75 709.88,425.15 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="711.55,426.07 711.79,425.67 710.16,424.74 709.92,425.13 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="711.55,426.02 711.79,425.62 710.21,424.72 709.97,425.11 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="711.54,425.97 711.78,425.58 710.26,424.7 710.02,425.1 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="711.53,425.93 711.77,425.53 710.3,424.68 710.06,425.08 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="711.53,425.88 711.77,425.48 710.35,424.66 710.11,425.06 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="711.52,425.83 711.76,425.44 710.4,424.64 710.15,425.04 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="711.51,425.79 711.76,425.39 710.44,424.62 710.2,425.02 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="711.5,425.74 711.75,425.34 710.49,424.6 710.24,425 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="711.5,425.69 711.74,425.3 710.54,424.58 710.29,424.98 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="711.49,425.65 711.74,425.25 710.58,424.57 710.33,424.96 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="711.48,425.6 711.73,425.21 710.63,424.55 710.38,424.94 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="711.48,425.55 711.73,425.16 710.67,424.53 710.42,424.92 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="711.47,425.5 711.72,425.11 710.72,424.51 710.47,424.9 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="711.46,425.46 711.72,425.07 710.77,424.49 710.52,424.88 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="711.46,425.41 711.71,425.02 710.82,424.47 710.56,424.86 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="711.45,425.36 711.7,424.97 710.86,424.45 710.61,424.84 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="711.44,425.32 711.7,424.93 710.91,424.43 710.65,424.82 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="711.43,425.27 711.69,424.88 710.96,424.42 710.7,424.8 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="711.43,425.22 711.69,424.84 711,424.4 710.74,424.78 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="711.42,425.17 711.68,424.79 711.05,424.38 710.78,424.76 					" />
											</g>
											<g>
												<polygon className="navas76" points="711.41,425.13 711.68,424.75 711.1,424.36 710.83,424.74 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="705.58,425.83 705.8,425.42 700.63,422.63 700.4,423.03 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="705.57,425.78 705.8,425.37 700.68,422.61 700.45,423.02 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="705.56,425.73 705.79,425.33 700.72,422.59 700.49,423 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="705.56,425.69 705.79,425.28 700.77,422.57 700.54,422.98 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="705.55,425.64 705.78,425.24 700.81,422.55 700.59,422.96 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="705.54,425.59 705.77,425.19 700.86,422.54 700.63,422.94 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="705.54,425.55 705.77,425.14 700.91,422.52 700.68,422.92 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="705.53,425.5 705.76,425.1 700.95,422.5 700.72,422.9 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="705.53,425.45 705.75,425.05 701,422.48 700.77,422.88 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="705.52,425.41 705.75,425 701.04,422.46 700.81,422.86 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="705.51,425.36 705.74,424.96 701.09,422.44 700.86,422.84 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="705.51,425.31 705.74,424.91 701.14,422.42 700.91,422.82 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="705.5,425.27 705.73,424.86 701.18,422.4 700.95,422.8 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="705.49,425.22 705.72,424.82 701.23,422.38 701,422.79 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="705.49,425.17 705.72,424.77 701.27,422.36 701.04,422.77 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="705.48,425.13 705.71,424.72 701.32,422.34 701.09,422.75 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="705.47,425.08 705.7,424.68 701.37,422.33 701.14,422.73 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="705.47,425.03 705.7,424.63 701.41,422.31 701.18,422.71 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="705.46,424.99 705.69,424.58 701.46,422.29 701.23,422.69 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="705.46,424.94 705.69,424.54 701.5,422.27 701.27,422.67 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="705.45,424.89 705.68,424.49 701.55,422.25 701.32,422.65 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="705.44,424.85 705.67,424.44 701.6,422.23 701.37,422.63 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="705.44,424.8 705.67,424.4 701.64,422.21 701.41,422.61 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="705.43,424.76 705.66,424.35 701.69,422.19 701.46,422.59 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="705.42,424.71 705.65,424.31 701.73,422.17 701.5,422.58 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="705.42,424.66 705.65,424.26 701.78,422.15 701.55,422.56 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="705.41,424.62 705.64,424.21 701.83,422.13 701.59,422.54 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="705.4,424.57 705.64,424.17 701.87,422.11 701.64,422.52 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="705.4,424.52 705.63,424.12 701.92,422.1 701.69,422.5 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="705.39,424.48 705.62,424.07 701.96,422.08 701.73,422.48 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="705.39,424.43 705.62,424.03 702.01,422.06 701.78,422.46 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="705.38,424.38 705.61,423.98 702.06,422.04 701.82,422.44 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="705.37,424.34 705.6,423.93 702.1,422.02 701.87,422.42 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="705.37,424.29 705.6,423.89 702.15,422 701.92,422.4 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="705.36,424.24 705.59,423.84 702.19,421.98 701.96,422.38 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="705.35,424.2 705.59,423.79 702.24,421.96 702.01,422.36 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="705.35,424.15 705.58,423.75 702.29,421.94 702.05,422.34 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="705.34,424.1 705.57,423.7 702.33,421.92 702.1,422.33 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="705.33,424.06 705.57,423.65 702.38,421.9 702.14,422.31 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="705.33,424.01 705.56,423.61 702.42,421.89 702.19,422.29 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="705.32,423.96 705.55,423.56 702.47,421.87 702.24,422.27 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="705.32,423.92 705.55,423.52 702.52,421.85 702.28,422.25 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="705.31,423.87 705.54,423.47 702.56,421.83 702.33,422.23 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="705.3,423.82 705.54,423.42 702.61,421.81 702.37,422.21 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="705.3,423.78 705.53,423.38 702.65,421.79 702.42,422.19 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="705.29,423.73 705.52,423.33 702.7,421.77 702.47,422.17 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="705.28,423.68 705.52,423.28 702.75,421.75 702.51,422.15 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="705.28,423.64 705.51,423.24 702.79,421.73 702.56,422.13 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="705.27,423.59 705.5,423.19 702.84,421.71 702.6,422.11 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="705.26,423.55 705.5,423.14 702.88,421.69 702.65,422.1 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="705.26,423.5 705.49,423.1 702.93,421.68 702.69,422.08 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="705.25,423.45 705.49,423.05 702.98,421.66 702.74,422.06 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="705.24,423.41 705.48,423 703.02,421.64 702.79,422.04 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="705.24,423.36 705.47,422.96 703.07,421.62 702.83,422.02 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="705.23,423.31 705.47,422.91 703.11,421.6 702.88,422 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="705.23,423.27 705.46,422.87 703.16,421.58 702.92,421.98 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="705.22,423.22 705.45,422.82 703.21,421.56 702.97,421.96 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="705.21,423.17 705.45,422.77 703.25,421.54 703.02,421.94 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="705.21,423.13 705.44,422.73 703.3,421.52 703.06,421.92 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="705.2,423.08 705.44,422.68 703.34,421.5 703.11,421.9 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="705.19,423.03 705.43,422.63 703.39,421.49 703.15,421.88 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="705.19,422.99 705.42,422.59 703.44,421.47 703.2,421.87 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="705.18,422.94 705.42,422.54 703.48,421.45 703.24,421.85 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="705.17,422.89 705.41,422.49 703.53,421.43 703.29,421.83 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="705.17,422.85 705.41,422.45 703.57,421.41 703.34,421.81 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="705.16,422.8 705.4,422.4 703.62,421.39 703.38,421.79 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="705.15,422.75 705.39,422.36 703.67,421.37 703.43,421.77 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="705.15,422.71 705.39,422.31 703.71,421.35 703.47,421.75 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="705.14,422.66 705.38,422.26 703.76,421.33 703.52,421.73 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="705.13,422.61 705.38,422.22 703.8,421.31 703.56,421.71 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="705.13,422.57 705.37,422.17 703.85,421.3 703.61,421.69 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="705.12,422.52 705.36,422.12 703.9,421.28 703.65,421.67 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="705.11,422.47 705.36,422.08 703.94,421.26 703.7,421.65 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="705.11,422.43 705.35,422.03 703.99,421.24 703.75,421.63 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="705.1,422.38 705.35,421.99 704.04,421.22 703.79,421.61 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="705.09,422.33 705.34,421.94 704.08,421.2 703.84,421.59 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="705.09,422.29 705.33,421.89 704.13,421.18 703.88,421.58 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="705.08,422.24 705.33,421.85 704.18,421.16 703.93,421.56 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="705.07,422.19 705.32,421.8 704.22,421.14 703.97,421.54 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="705.07,422.15 705.32,421.75 704.27,421.13 704.02,421.52 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="705.06,422.1 705.31,421.71 704.31,421.11 704.06,421.5 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="705.05,422.05 705.31,421.66 704.36,421.09 704.11,421.48 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="705.05,422.01 705.3,421.62 704.41,421.07 704.15,421.46 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="705.04,421.96 705.29,421.57 704.46,421.05 704.2,421.44 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="705.03,421.91 705.29,421.52 704.5,421.03 704.24,421.42 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="705.02,421.86 705.28,421.48 704.55,421.01 704.29,421.4 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="705.02,421.82 705.28,421.43 704.6,421 704.33,421.38 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="705.01,421.77 705.27,421.39 704.64,420.98 704.38,421.36 					" />
											</g>
											<g>
												<polygon className="navas76" points="705,421.72 705.27,421.34 704.69,420.96 704.42,421.34 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="699.09,422.2 699.32,421.79 694.16,419.01 693.93,419.42 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="699.08,422.15 699.31,421.75 694.21,418.99 693.98,419.4 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="699.08,422.1 699.3,421.7 694.25,418.97 694.02,419.38 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="699.07,422.06 699.3,421.65 694.3,418.96 694.07,419.36 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="699.06,422.01 699.29,421.61 694.34,418.94 694.11,419.34 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="699.06,421.97 699.29,421.56 694.39,418.92 694.16,419.32 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="699.05,421.92 699.28,421.52 694.44,418.9 694.21,419.3 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="699.04,421.87 699.27,421.47 694.48,418.88 694.25,419.28 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="699.04,421.83 699.27,421.42 694.53,418.86 694.3,419.26 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="699.03,421.78 699.26,421.38 694.57,418.84 694.34,419.24 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="699.03,421.73 699.26,421.33 694.62,418.82 694.39,419.22 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="699.02,421.69 699.25,421.28 694.66,418.8 694.43,419.21 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="699.01,421.64 699.24,421.24 694.71,418.78 694.48,419.19 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="699.01,421.59 699.24,421.19 694.76,418.76 694.53,419.17 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="699,421.55 699.23,421.14 694.8,418.75 694.57,419.15 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="698.99,421.5 699.22,421.1 694.85,418.73 694.62,419.13 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="698.99,421.45 699.22,421.05 694.89,418.71 694.66,419.11 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="698.98,421.41 699.21,421.01 694.94,418.69 694.71,419.09 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="698.98,421.36 699.21,420.96 694.99,418.67 694.76,419.07 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="698.97,421.32 699.2,420.91 695.03,418.65 694.8,419.05 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="698.96,421.27 699.19,420.87 695.08,418.63 694.85,419.03 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="698.96,421.22 699.19,420.82 695.12,418.61 694.89,419.01 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="698.95,421.18 699.18,420.77 695.17,418.59 694.94,419 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="698.94,421.13 699.18,420.73 695.22,418.57 694.98,418.98 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="698.94,421.08 699.17,420.68 695.26,418.55 695.03,418.96 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="698.93,421.04 699.16,420.63 695.31,418.54 695.08,418.94 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="698.93,420.99 699.16,420.59 695.35,418.52 695.12,418.92 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="698.92,420.94 699.15,420.54 695.4,418.5 695.17,418.9 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="698.91,420.9 699.14,420.5 695.45,418.48 695.21,418.88 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="698.91,420.85 699.14,420.45 695.49,418.46 695.26,418.86 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="698.9,420.8 699.13,420.4 695.54,418.44 695.3,418.84 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="698.89,420.76 699.13,420.36 695.58,418.42 695.35,418.82 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="698.89,420.71 699.12,420.31 695.63,418.4 695.4,418.8 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="698.88,420.67 699.11,420.26 695.67,418.38 695.44,418.78 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="698.88,420.62 699.11,420.22 695.72,418.36 695.49,418.77 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="698.87,420.57 699.1,420.17 695.77,418.35 695.53,418.75 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="698.86,420.53 699.09,420.12 695.81,418.33 695.58,418.73 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="698.86,420.48 699.09,420.08 695.86,418.31 695.63,418.71 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="698.85,420.43 699.08,420.03 695.9,418.29 695.67,418.69 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="698.84,420.39 699.08,419.99 695.95,418.27 695.72,418.67 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="698.84,420.34 699.07,419.94 696,418.25 695.76,418.65 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="698.83,420.29 699.06,419.89 696.04,418.23 695.81,418.63 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="698.82,420.25 699.06,419.85 696.09,418.21 695.85,418.61 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="698.82,420.2 699.05,419.8 696.13,418.19 695.9,418.59 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="698.81,420.15 699.05,419.75 696.18,418.17 695.95,418.57 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="698.81,420.11 699.04,419.71 696.23,418.15 695.99,418.56 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="698.8,420.06 699.03,419.66 696.27,418.14 696.04,418.54 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="698.79,420.02 699.03,419.62 696.32,418.12 696.08,418.52 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="698.79,419.97 699.02,419.57 696.36,418.1 696.13,418.5 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="698.78,419.92 699.02,419.52 696.41,418.08 696.17,418.48 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="698.77,419.88 699.01,419.48 696.46,418.06 696.22,418.46 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="698.77,419.83 699,419.43 696.5,418.04 696.27,418.44 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="698.76,419.78 699,419.38 696.55,418.02 696.31,418.42 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="698.76,419.74 698.99,419.34 696.59,418 696.36,418.4 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="698.75,419.69 698.98,419.29 696.64,417.98 696.4,418.38 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="698.74,419.64 698.98,419.24 696.68,417.96 696.45,418.36 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="698.74,419.6 698.97,419.2 696.73,417.95 696.49,418.34 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="698.73,419.55 698.97,419.15 696.78,417.93 696.54,418.32 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="698.72,419.51 698.96,419.11 696.82,417.91 696.59,418.31 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="698.72,419.46 698.95,419.06 696.87,417.89 696.63,418.29 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="698.71,419.41 698.95,419.01 696.91,417.87 696.68,418.27 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="698.7,419.37 698.94,418.97 696.96,417.85 696.72,418.25 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="698.7,419.32 698.94,418.92 697.01,417.83 696.77,418.23 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="698.69,419.27 698.93,418.87 697.05,417.81 696.81,418.21 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="698.69,419.23 698.92,418.83 697.1,417.79 696.86,418.19 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="698.68,419.18 698.92,418.78 697.14,417.77 696.91,418.17 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="698.67,419.13 698.91,418.74 697.19,417.76 696.95,418.15 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="698.67,419.09 698.91,418.69 697.24,417.74 697,418.13 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="698.66,419.04 698.9,418.64 697.28,417.72 697.04,418.11 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="698.65,418.99 698.89,418.6 697.33,417.7 697.09,418.09 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="698.65,418.95 698.89,418.55 697.38,417.68 697.13,418.07 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="698.64,418.9 698.88,418.51 697.42,417.66 697.18,418.06 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="698.63,418.85 698.88,418.46 697.47,417.64 697.22,418.04 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="698.63,418.81 698.87,418.41 697.51,417.62 697.27,418.02 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="698.62,418.76 698.87,418.37 697.56,417.6 697.32,418 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="698.61,418.71 698.86,418.32 697.61,417.59 697.36,417.98 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="698.61,418.67 698.85,418.27 697.65,417.57 697.41,417.96 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="698.6,418.62 698.85,418.23 697.7,417.55 697.45,417.94 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="698.59,418.57 698.84,418.18 697.75,417.53 697.5,417.92 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="698.59,418.53 698.84,418.14 697.79,417.51 697.54,417.9 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="698.58,418.48 698.83,418.09 697.84,417.49 697.59,417.88 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="698.57,418.43 698.83,418.05 697.88,417.47 697.63,417.86 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="698.57,418.39 698.82,418 697.93,417.45 697.68,417.84 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="698.56,418.34 698.82,417.95 697.98,417.44 697.72,417.82 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="698.55,418.29 698.81,417.91 698.03,417.42 697.77,417.8 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="698.54,418.25 698.8,417.86 698.07,417.4 697.81,417.78 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="698.54,418.2 698.8,417.82 698.12,417.38 697.86,417.76 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="698.53,418.15 698.8,417.77 698.17,417.36 697.9,417.74 					" />
											</g>
											<g>
												<polygon className="navas76" points="698.52,418.1 698.79,417.73 698.21,417.34 697.94,417.72 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas72" points="692.66,418.73 692.89,418.33 687.75,415.56 687.52,415.96 					" />
											</g>
											<g className="navas176">
												<polygon className="navas335" points="692.66,418.69 692.89,418.29 687.8,415.54 687.57,415.94 					" />
											</g>
											<g className="navas177">
												<polygon className="navas336" points="692.65,418.64 692.88,418.24 687.84,415.52 687.61,415.92 					" />
											</g>
											<g className="navas179">
												<polygon className="navas337" points="692.64,418.6 692.87,418.19 687.89,415.5 687.66,415.9 					" />
											</g>
											<g className="navas181">
												<polygon className="navas338" points="692.64,418.55 692.87,418.15 687.94,415.48 687.71,415.89 					" />
											</g>
											<g className="navas183">
												<polygon className="navas339" points="692.63,418.5 692.86,418.1 687.98,415.46 687.75,415.87 					" />
											</g>
											<g className="navas185">
												<polygon className="navas340" points="692.63,418.46 692.86,418.05 688.03,415.45 687.8,415.85 					" />
											</g>
											<g className="navas187">
												<polygon className="navas341" points="692.62,418.41 692.85,418.01 688.07,415.43 687.84,415.83 					" />
											</g>
											<g className="navas189">
												<polygon className="navas342" points="692.61,418.36 692.84,417.96 688.12,415.41 687.89,415.81 					" />
											</g>
											<g className="navas191">
												<polygon className="navas343" points="692.61,418.32 692.84,417.92 688.16,415.39 687.93,415.79 					" />
											</g>
											<g className="navas193">
												<polygon className="navas344" points="692.6,418.27 692.83,417.87 688.21,415.37 687.98,415.77 					" />
											</g>
											<g className="navas195">
												<polygon className="navas345" points="692.6,418.23 692.83,417.82 688.26,415.35 688.03,415.75 					" />
											</g>
											<g className="navas197">
												<polygon className="navas346" points="692.59,418.18 692.82,417.78 688.3,415.33 688.07,415.73 					" />
											</g>
											<g className="navas199">
												<polygon className="navas347" points="692.58,418.13 692.81,417.73 688.35,415.31 688.12,415.71 					" />
											</g>
											<g className="navas201">
												<polygon className="navas348" points="692.58,418.09 692.81,417.68 688.39,415.29 688.16,415.69 					" />
											</g>
											<g className="navas203">
												<polygon className="navas349" points="692.57,418.04 692.8,417.64 688.44,415.27 688.21,415.68 					" />
											</g>
											<g className="navas204">
												<polygon className="navas350" points="692.56,417.99 692.8,417.59 688.49,415.26 688.25,415.66 					" />
											</g>
											<g className="navas206">
												<polygon className="navas351" points="692.56,417.95 692.79,417.55 688.53,415.24 688.3,415.64 					" />
											</g>
											<g className="navas208">
												<polygon className="navas352" points="692.55,417.9 692.78,417.5 688.58,415.22 688.35,415.62 					" />
											</g>
											<g className="navas209">
												<polygon className="navas353" points="692.55,417.85 692.78,417.45 688.62,415.2 688.39,415.6 					" />
											</g>
											<g className="navas211">
												<polygon className="navas354" points="692.54,417.81 692.77,417.41 688.67,415.18 688.44,415.58 					" />
											</g>
											<g className="navas213">
												<polygon className="navas355" points="692.53,417.76 692.77,417.36 688.71,415.16 688.48,415.56 					" />
											</g>
											<g className="navas112">
												<polygon className="navas356" points="692.53,417.72 692.76,417.31 688.76,415.14 688.53,415.54 					" />
											</g>
											<g className="navas216">
												<polygon className="navas357" points="692.52,417.67 692.75,417.27 688.81,415.12 688.57,415.52 					" />
											</g>
											<g className="navas218">
												<polygon className="navas358" points="692.52,417.62 692.75,417.22 688.85,415.1 688.62,415.5 					" />
											</g>
											<g className="navas220">
												<polygon className="navas359" points="692.51,417.58 692.74,417.18 688.9,415.08 688.67,415.48 					" />
											</g>
											<g className="navas221">
												<polygon className="navas360" points="692.5,417.53 692.73,417.13 688.94,415.06 688.71,415.47 					" />
											</g>
											<g className="navas223">
												<polygon className="navas361" points="692.5,417.48 692.73,417.08 688.99,415.05 688.76,415.45 					" />
											</g>
											<g className="navas225">
												<polygon className="navas362" points="692.49,417.44 692.72,417.04 689.04,415.03 688.8,415.43 					" />
											</g>
											<g className="navas227">
												<polygon className="navas363" points="692.48,417.39 692.72,416.99 689.08,415.01 688.85,415.41 					" />
											</g>
											<g className="navas229">
												<polygon className="navas364" points="692.48,417.35 692.71,416.94 689.13,414.99 688.89,415.39 					" />
											</g>
											<g className="navas231">
												<polygon className="navas365" points="692.47,417.3 692.7,416.9 689.17,414.97 688.94,415.37 					" />
											</g>
											<g className="navas233">
												<polygon className="navas366" points="692.47,417.25 692.7,416.85 689.22,414.95 688.99,415.35 					" />
											</g>
											<g className="navas235">
												<polygon className="navas367" points="692.46,417.21 692.69,416.81 689.26,414.93 689.03,415.33 					" />
											</g>
											<g className="navas237">
												<polygon className="navas368" points="692.45,417.16 692.69,416.76 689.31,414.91 689.08,415.31 					" />
											</g>
											<g className="navas239">
												<polygon className="navas369" points="692.45,417.11 692.68,416.71 689.36,414.89 689.12,415.29 					" />
											</g>
											<g className="navas241">
												<polygon className="navas370" points="692.44,417.07 692.67,416.67 689.4,414.87 689.17,415.27 					" />
											</g>
											<g className="navas243">
												<polygon className="navas371" points="692.44,417.02 692.67,416.62 689.45,414.86 689.21,415.26 					" />
											</g>
											<g className="navas244">
												<polygon className="navas372" points="692.43,416.98 692.66,416.57 689.49,414.84 689.26,415.24 					" />
											</g>
											<g className="navas246">
												<polygon className="navas373" points="692.42,416.93 692.66,416.53 689.54,414.82 689.31,415.22 					" />
											</g>
											<g className="navas248">
												<polygon className="navas374" points="692.42,416.88 692.65,416.48 689.59,414.8 689.35,415.2 					" />
											</g>
											<g className="navas250">
												<polygon className="navas375" points="692.41,416.84 692.64,416.44 689.63,414.78 689.4,415.18 					" />
											</g>
											<g className="navas252">
												<polygon className="navas376" points="692.4,416.79 692.64,416.39 689.68,414.76 689.44,415.16 					" />
											</g>
											<g className="navas254">
												<polygon className="navas377" points="692.4,416.74 692.63,416.34 689.72,414.74 689.49,415.14 					" />
											</g>
											<g className="navas130">
												<polygon className="navas378" points="692.39,416.7 692.63,416.3 689.77,414.72 689.53,415.12 					" />
											</g>
											<g className="navas256">
												<polygon className="navas379" points="692.39,416.65 692.62,416.25 689.81,414.7 689.58,415.1 					" />
											</g>
											<g className="navas258">
												<polygon className="navas380" points="692.38,416.6 692.61,416.21 689.86,414.68 689.63,415.08 					" />
											</g>
											<g className="navas260">
												<polygon className="navas381" points="692.37,416.56 692.61,416.16 689.91,414.67 689.67,415.06 					" />
											</g>
											<g className="navas262">
												<polygon className="navas382" points="692.37,416.51 692.6,416.11 689.95,414.65 689.72,415.05 					" />
											</g>
											<g className="navas264">
												<polygon className="navas383" points="692.36,416.47 692.6,416.07 690,414.63 689.76,415.03 					" />
											</g>
											<g className="navas266">
												<polygon className="navas384" points="692.35,416.42 692.59,416.02 690.04,414.61 689.81,415.01 					" />
											</g>
											<g className="navas268">
												<polygon className="navas385" points="692.35,416.37 692.58,415.97 690.09,414.59 689.85,414.99 					" />
											</g>
											<g className="navas270">
												<polygon className="navas386" points="692.34,416.33 692.58,415.93 690.14,414.57 689.9,414.97 					" />
											</g>
											<g className="navas272">
												<polygon className="navas387" points="692.34,416.28 692.57,415.88 690.18,414.55 689.95,414.95 					" />
											</g>
											<g className="navas274">
												<polygon className="navas388" points="692.33,416.23 692.57,415.84 690.23,414.53 689.99,414.93 					" />
											</g>
											<g className="navas276">
												<polygon className="navas389" points="692.32,416.19 692.56,415.79 690.27,414.51 690.04,414.91 					" />
											</g>
											<g className="navas278">
												<polygon className="navas390" points="692.32,416.14 692.55,415.74 690.32,414.49 690.08,414.89 					" />
											</g>
											<g className="navas280">
												<polygon className="navas391" points="692.31,416.1 692.55,415.7 690.37,414.48 690.13,414.87 					" />
											</g>
											<g className="navas281">
												<polygon className="navas392" points="692.3,416.05 692.54,415.65 690.41,414.46 690.17,414.85 					" />
											</g>
											<g className="navas283">
												<polygon className="navas393" points="692.3,416 692.54,415.61 690.46,414.44 690.22,414.83 					" />
											</g>
											<g className="navas285">
												<polygon className="navas394" points="692.29,415.96 692.53,415.56 690.5,414.42 690.27,414.82 					" />
											</g>
											<g className="navas287">
												<polygon className="navas395" points="692.29,415.91 692.52,415.51 690.55,414.4 690.31,414.8 					" />
											</g>
											<g className="navas289">
												<polygon className="navas396" points="692.28,415.86 692.52,415.47 690.59,414.38 690.36,414.78 					" />
											</g>
											<g className="navas291">
												<polygon className="navas397" points="692.27,415.82 692.51,415.42 690.64,414.36 690.4,414.76 					" />
											</g>
											<g className="navas292">
												<polygon className="navas398" points="692.27,415.77 692.51,415.37 690.69,414.34 690.45,414.74 					" />
											</g>
											<g className="navas294">
												<polygon className="navas399" points="692.26,415.72 692.5,415.33 690.73,414.32 690.49,414.72 					" />
											</g>
											<g className="navas148">
												<polygon className="navas400" points="692.25,415.68 692.49,415.28 690.78,414.3 690.54,414.7 					" />
											</g>
											<g className="navas297">
												<polygon className="navas401" points="692.25,415.63 692.49,415.24 690.82,414.29 690.58,414.68 					" />
											</g>
											<g className="navas299">
												<polygon className="navas402" points="692.24,415.59 692.48,415.19 690.87,414.27 690.63,414.66 					" />
											</g>
											<g className="navas300">
												<polygon className="navas403" points="692.24,415.54 692.48,415.14 690.92,414.25 690.68,414.64 					" />
											</g>
											<g className="navas302">
												<polygon className="navas404" points="692.23,415.49 692.47,415.1 690.96,414.23 690.72,414.62 					" />
											</g>
											<g className="navas304">
												<polygon className="navas405" points="692.22,415.45 692.47,415.05 691.01,414.21 690.77,414.6 					" />
											</g>
											<g className="navas306">
												<polygon className="navas406" points="692.22,415.4 692.46,415.01 691.06,414.19 690.81,414.58 					" />
											</g>
											<g className="navas308">
												<polygon className="navas407" points="692.21,415.35 692.45,414.96 691.1,414.17 690.86,414.57 					" />
											</g>
											<g className="navas310">
												<polygon className="navas408" points="692.2,415.31 692.45,414.91 691.15,414.15 690.9,414.55 					" />
											</g>
											<g className="navas311">
												<polygon className="navas409" points="692.2,415.26 692.44,414.87 691.19,414.13 690.95,414.53 					" />
											</g>
											<g className="navas313">
												<polygon className="navas410" points="692.19,415.21 692.44,414.82 691.24,414.12 690.99,414.51 					" />
											</g>
											<g className="navas315">
												<polygon className="navas411" points="692.18,415.17 692.43,414.78 691.29,414.1 691.04,414.49 					" />
											</g>
											<g className="navas317">
												<polygon className="navas412" points="692.18,415.12 692.43,414.73 691.33,414.08 691.08,414.47 					" />
											</g>
											<g className="navas319">
												<polygon className="navas413" points="692.17,415.08 692.42,414.68 691.38,414.06 691.13,414.45 					" />
											</g>
											<g className="navas321">
												<polygon className="navas414" points="692.16,415.03 692.41,414.64 691.43,414.04 691.17,414.43 					" />
											</g>
											<g className="navas323">
												<polygon className="navas415" points="692.16,414.98 692.41,414.59 691.47,414.02 691.22,414.41 					" />
											</g>
											<g className="navas324">
												<polygon className="navas416" points="692.15,414.93 692.4,414.55 691.52,414 691.26,414.39 					" />
											</g>
											<g className="navas326">
												<polygon className="navas417" points="692.14,414.89 692.4,414.5 691.56,413.99 691.31,414.37 					" />
											</g>
											<g className="navas328">
												<polygon className="navas418" points="692.14,414.84 692.39,414.46 691.61,413.97 691.35,414.35 					" />
											</g>
											<g className="navas330">
												<polygon className="navas419" points="692.13,414.79 692.39,414.41 691.66,413.95 691.4,414.33 					" />
											</g>
											<g className="navas331">
												<polygon className="navas420" points="692.12,414.75 692.38,414.37 691.71,413.93 691.44,414.31 					" />
											</g>
											<g className="navas333">
												<polygon className="navas421" points="692.11,414.7 692.38,414.32 691.75,413.91 691.49,414.29 					" />
											</g>
											<g>
												<polygon className="navas76" points="692.11,414.65 692.38,414.28 691.8,413.89 691.53,414.27 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas72" points="686.29,415.42 686.52,415.02 681.4,412.25 681.17,412.65 					" />
											</g>
											<g className="navas176">
												<polygon className="navas335" points="686.29,415.37 686.52,414.97 681.44,412.23 681.21,412.64 					" />
											</g>
											<g className="navas177">
												<polygon className="navas336" points="686.28,415.33 686.51,414.92 681.49,412.22 681.26,412.62 					" />
											</g>
											<g className="navas179">
												<polygon className="navas337" points="686.27,415.28 686.5,414.88 681.54,412.2 681.31,412.6 					" />
											</g>
											<g className="navas181">
												<polygon className="navas338" points="686.27,415.23 686.5,414.83 681.58,412.18 681.35,412.58 					" />
											</g>
											<g className="navas183">
												<polygon className="navas339" points="686.26,415.19 686.49,414.79 681.63,412.16 681.4,412.56 					" />
											</g>
											<g className="navas185">
												<polygon className="navas340" points="686.26,415.14 686.49,414.74 681.67,412.14 681.44,412.54 					" />
											</g>
											<g className="navas187">
												<polygon className="navas341" points="686.25,415.1 686.48,414.69 681.72,412.12 681.49,412.52 					" />
											</g>
											<g className="navas189">
												<polygon className="navas342" points="686.24,415.05 686.47,414.65 681.76,412.1 681.53,412.5 					" />
											</g>
											<g className="navas191">
												<polygon className="navas343" points="686.24,415 686.47,414.6 681.81,412.08 681.58,412.48 					" />
											</g>
											<g className="navas193">
												<polygon className="navas344" points="686.23,414.96 686.46,414.56 681.86,412.06 681.62,412.46 					" />
											</g>
											<g className="navas195">
												<polygon className="navas345" points="686.23,414.91 686.46,414.51 681.9,412.04 681.67,412.44 					" />
											</g>
											<g className="navas197">
												<polygon className="navas346" points="686.22,414.86 686.45,414.46 681.95,412.03 681.72,412.43 					" />
											</g>
											<g className="navas199">
												<polygon className="navas347" points="686.21,414.82 686.44,414.42 681.99,412.01 681.76,412.41 					" />
											</g>
											<g className="navas201">
												<polygon className="navas348" points="686.21,414.77 686.44,414.37 682.04,411.99 681.81,412.39 					" />
											</g>
											<g className="navas203">
												<polygon className="navas349" points="686.2,414.73 686.43,414.32 682.08,411.97 681.85,412.37 					" />
											</g>
											<g className="navas204">
												<polygon className="navas350" points="686.2,414.68 686.43,414.28 682.13,411.95 681.9,412.35 					" />
											</g>
											<g className="navas206">
												<polygon className="navas351" points="686.19,414.63 686.42,414.23 682.18,411.93 681.94,412.33 					" />
											</g>
											<g className="navas208">
												<polygon className="navas352" points="686.18,414.59 686.41,414.19 682.22,411.91 681.99,412.31 					" />
											</g>
											<g className="navas209">
												<polygon className="navas353" points="686.18,414.54 686.41,414.14 682.27,411.89 682.04,412.29 					" />
											</g>
											<g className="navas211">
												<polygon className="navas354" points="686.17,414.49 686.4,414.09 682.31,411.87 682.08,412.27 					" />
											</g>
											<g className="navas213">
												<polygon className="navas355" points="686.16,414.45 686.4,414.05 682.36,411.85 682.13,412.25 					" />
											</g>
											<g className="navas112">
												<polygon className="navas356" points="686.16,414.4 686.39,414 682.4,411.83 682.17,412.24 					" />
											</g>
											<g className="navas216">
												<polygon className="navas357" points="686.15,414.36 686.38,413.96 682.45,411.82 682.22,412.22 					" />
											</g>
											<g className="navas218">
												<polygon className="navas358" points="686.15,414.31 686.38,413.91 682.5,411.8 682.26,412.2 					" />
											</g>
											<g className="navas220">
												<polygon className="navas359" points="686.14,414.26 686.37,413.86 682.54,411.78 682.31,412.18 					" />
											</g>
											<g className="navas221">
												<polygon className="navas360" points="686.13,414.22 686.37,413.82 682.59,411.76 682.36,412.16 					" />
											</g>
											<g className="navas223">
												<polygon className="navas361" points="686.13,414.17 686.36,413.77 682.63,411.74 682.4,412.14 					" />
											</g>
											<g className="navas225">
												<polygon className="navas362" points="686.12,414.13 686.35,413.73 682.68,411.72 682.45,412.12 					" />
											</g>
											<g className="navas227">
												<polygon className="navas363" points="686.12,414.08 686.35,413.68 682.72,411.7 682.49,412.1 					" />
											</g>
											<g className="navas229">
												<polygon className="navas364" points="686.11,414.03 686.34,413.63 682.77,411.68 682.54,412.08 					" />
											</g>
											<g className="navas231">
												<polygon className="navas365" points="686.1,413.99 686.34,413.59 682.82,411.66 682.58,412.06 					" />
											</g>
											<g className="navas233">
												<polygon className="navas366" points="686.1,413.94 686.33,413.54 682.86,411.64 682.63,412.04 					" />
											</g>
											<g className="navas235">
												<polygon className="navas367" points="686.09,413.89 686.32,413.49 682.91,411.63 682.68,412.03 					" />
											</g>
											<g className="navas237">
												<polygon className="navas368" points="686.09,413.85 686.32,413.45 682.95,411.61 682.72,412.01 					" />
											</g>
											<g className="navas239">
												<polygon className="navas369" points="686.08,413.8 686.31,413.4 683,411.59 682.77,411.99 					" />
											</g>
											<g className="navas241">
												<polygon className="navas370" points="686.07,413.76 686.31,413.36 683.05,411.57 682.81,411.97 					" />
											</g>
											<g className="navas243">
												<polygon className="navas371" points="686.07,413.71 686.3,413.31 683.09,411.55 682.86,411.95 					" />
											</g>
											<g className="navas244">
												<polygon className="navas372" points="686.06,413.66 686.29,413.26 683.14,411.53 682.9,411.93 					" />
											</g>
											<g className="navas246">
												<polygon className="navas373" points="686.06,413.62 686.29,413.22 683.18,411.51 682.95,411.91 					" />
											</g>
											<g className="navas248">
												<polygon className="navas374" points="686.05,413.57 686.28,413.17 683.23,411.49 682.99,411.89 					" />
											</g>
											<g className="navas250">
												<polygon className="navas375" points="686.04,413.53 686.28,413.13 683.27,411.47 683.04,411.87 					" />
											</g>
											<g className="navas252">
												<polygon className="navas376" points="686.04,413.48 686.27,413.08 683.32,411.46 683.09,411.85 					" />
											</g>
											<g className="navas254">
												<polygon className="navas377" points="686.03,413.43 686.27,413.03 683.37,411.44 683.13,411.83 					" />
											</g>
											<g className="navas130">
												<polygon className="navas378" points="686.03,413.39 686.26,412.99 683.41,411.42 683.18,411.82 					" />
											</g>
											<g className="navas256">
												<polygon className="navas379" points="686.02,413.34 686.25,412.94 683.46,411.4 683.22,411.8 					" />
											</g>
											<g className="navas258">
												<polygon className="navas380" points="686.01,413.29 686.25,412.9 683.5,411.38 683.27,411.78 					" />
											</g>
											<g className="navas260">
												<polygon className="navas381" points="686.01,413.25 686.24,412.85 683.55,411.36 683.31,411.76 					" />
											</g>
											<g className="navas262">
												<polygon className="navas382" points="686,413.2 686.24,412.8 683.59,411.34 683.36,411.74 					" />
											</g>
											<g className="navas264">
												<polygon className="navas383" points="685.99,413.16 686.23,412.76 683.64,411.32 683.41,411.72 					" />
											</g>
											<g className="navas266">
												<polygon className="navas384" points="685.99,413.11 686.22,412.71 683.69,411.3 683.45,411.7 					" />
											</g>
											<g className="navas268">
												<polygon className="navas385" points="685.98,413.06 686.22,412.67 683.73,411.28 683.5,411.68 					" />
											</g>
											<g className="navas270">
												<polygon className="navas386" points="685.98,413.02 686.21,412.62 683.78,411.27 683.54,411.66 					" />
											</g>
											<g className="navas272">
												<polygon className="navas387" points="685.97,412.97 686.21,412.57 683.82,411.25 683.59,411.64 					" />
											</g>
											<g className="navas274">
												<polygon className="navas388" points="685.96,412.92 686.2,412.53 683.87,411.23 683.63,411.62 					" />
											</g>
											<g className="navas276">
												<polygon className="navas389" points="685.96,412.88 686.19,412.48 683.92,411.21 683.68,411.61 					" />
											</g>
											<g className="navas278">
												<polygon className="navas390" points="685.95,412.83 686.19,412.44 683.96,411.19 683.72,411.59 					" />
											</g>
											<g className="navas280">
												<polygon className="navas391" points="685.95,412.79 686.18,412.39 684.01,411.17 683.77,411.57 					" />
											</g>
											<g className="navas281">
												<polygon className="navas392" points="685.94,412.74 686.18,412.34 684.05,411.15 683.82,411.55 					" />
											</g>
											<g className="navas283">
												<polygon className="navas393" points="685.93,412.69 686.17,412.3 684.1,411.13 683.86,411.53 					" />
											</g>
											<g className="navas285">
												<polygon className="navas394" points="685.93,412.65 686.16,412.25 684.14,411.11 683.91,411.51 					" />
											</g>
											<g className="navas287">
												<polygon className="navas395" points="685.92,412.6 686.16,412.21 684.19,411.09 683.95,411.49 					" />
											</g>
											<g className="navas289">
												<polygon className="navas396" points="685.91,412.56 686.15,412.16 684.24,411.08 684,411.47 					" />
											</g>
											<g className="navas291">
												<polygon className="navas397" points="685.91,412.51 686.15,412.11 684.28,411.06 684.04,411.45 					" />
											</g>
											<g className="navas292">
												<polygon className="navas398" points="685.9,412.46 686.14,412.07 684.33,411.04 684.09,411.43 					" />
											</g>
											<g className="navas294">
												<polygon className="navas399" points="685.9,412.42 686.14,412.02 684.37,411.02 684.13,411.41 					" />
											</g>
											<g className="navas148">
												<polygon className="navas400" points="685.89,412.37 686.13,411.98 684.42,411 684.18,411.4 					" />
											</g>
											<g className="navas297">
												<polygon className="navas401" points="685.88,412.32 686.12,411.93 684.47,410.98 684.22,411.38 					" />
											</g>
											<g className="navas299">
												<polygon className="navas402" points="685.88,412.28 686.12,411.88 684.51,410.96 684.27,411.36 					" />
											</g>
											<g className="navas300">
												<polygon className="navas403" points="685.87,412.23 686.11,411.84 684.56,410.94 684.32,411.34 					" />
											</g>
											<g className="navas302">
												<polygon className="navas404" points="685.86,412.19 686.11,411.79 684.6,410.92 684.36,411.32 					" />
											</g>
											<g className="navas304">
												<polygon className="navas405" points="685.86,412.14 686.1,411.75 684.65,410.91 684.41,411.3 					" />
											</g>
											<g className="navas306">
												<polygon className="navas406" points="685.85,412.09 686.1,411.7 684.7,410.89 684.45,411.28 					" />
											</g>
											<g className="navas308">
												<polygon className="navas407" points="685.85,412.05 686.09,411.65 684.74,410.87 684.5,411.26 					" />
											</g>
											<g className="navas310">
												<polygon className="navas408" points="685.84,412 686.08,411.61 684.79,410.85 684.54,411.24 					" />
											</g>
											<g className="navas311">
												<polygon className="navas409" points="685.83,411.95 686.08,411.56 684.83,410.83 684.59,411.22 					" />
											</g>
											<g className="navas313">
												<polygon className="navas410" points="685.83,411.91 686.07,411.52 684.88,410.81 684.63,411.2 					" />
											</g>
											<g className="navas315">
												<polygon className="navas411" points="685.82,411.86 686.07,411.47 684.93,410.79 684.68,411.18 					" />
											</g>
											<g className="navas317">
												<polygon className="navas412" points="685.81,411.81 686.06,411.42 684.97,410.77 684.72,411.16 					" />
											</g>
											<g className="navas319">
												<polygon className="navas413" points="685.81,411.77 686.06,411.38 685.02,410.76 684.77,411.14 					" />
											</g>
											<g className="navas321">
												<polygon className="navas414" points="685.8,411.72 686.05,411.33 685.07,410.74 684.81,411.13 					" />
											</g>
											<g className="navas323">
												<polygon className="navas415" points="685.79,411.68 686.05,411.29 685.11,410.72 684.86,411.11 					" />
											</g>
											<g className="navas324">
												<polygon className="navas416" points="685.79,411.63 686.04,411.24 685.16,410.7 684.9,411.09 					" />
											</g>
											<g className="navas326">
												<polygon className="navas417" points="685.78,411.58 686.04,411.2 685.2,410.68 684.95,411.07 					" />
											</g>
											<g className="navas328">
												<polygon className="navas418" points="685.77,411.54 686.03,411.15 685.25,410.66 684.99,411.05 					" />
											</g>
											<g className="navas330">
												<polygon className="navas419" points="685.77,411.49 686.03,411.11 685.3,410.64 685.04,411.03 					" />
											</g>
											<g className="navas331">
												<polygon className="navas420" points="685.76,411.44 686.02,411.06 685.35,410.63 685.08,411.01 					" />
											</g>
											<g className="navas333">
												<polygon className="navas421" points="685.75,411.39 686.02,411.02 685.39,410.61 685.13,410.99 					" />
											</g>
											<g>
												<polygon className="navas76" points="685.74,411.35 686.01,410.97 685.44,410.59 685.17,410.97 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="679.91,411.92 680.14,411.52 675.03,408.76 674.8,409.16 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="679.9,411.87 680.13,411.47 675.08,408.74 674.85,409.14 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="679.9,411.83 680.13,411.43 675.12,408.73 674.89,409.13 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="679.89,411.78 680.12,411.38 675.17,408.71 674.94,409.11 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="679.89,411.73 680.12,411.33 675.21,408.69 674.98,409.09 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="679.88,411.69 680.11,411.29 675.26,408.67 675.03,409.07 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="679.87,411.64 680.1,411.24 675.31,408.65 675.08,409.05 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="679.87,411.6 680.1,411.2 675.35,408.63 675.12,409.03 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="679.86,411.55 680.09,411.15 675.4,408.61 675.17,409.01 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="679.86,411.5 680.09,411.1 675.44,408.59 675.21,408.99 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="679.85,411.46 680.08,411.06 675.49,408.57 675.26,408.97 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="679.84,411.41 680.07,411.01 675.53,408.56 675.3,408.95 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="679.84,411.37 680.07,410.97 675.58,408.54 675.35,408.94 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="679.83,411.32 680.06,410.92 675.63,408.52 675.39,408.92 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="679.83,411.27 680.06,410.87 675.67,408.5 675.44,408.9 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="679.82,411.23 680.05,410.83 675.72,408.48 675.49,408.88 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="679.81,411.18 680.05,410.78 675.76,408.46 675.53,408.86 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="679.81,411.14 680.04,410.74 675.81,408.44 675.58,408.84 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="679.8,411.09 680.03,410.69 675.85,408.42 675.62,408.82 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="679.8,411.04 680.03,410.64 675.9,408.4 675.67,408.8 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="679.79,411 680.02,410.6 675.95,408.38 675.71,408.78 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="679.78,410.95 680.02,410.55 675.99,408.37 675.76,408.76 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="679.78,410.91 680.01,410.51 676.04,408.35 675.81,408.75 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="679.77,410.86 680,410.46 676.08,408.33 675.85,408.73 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="679.77,410.81 680,410.41 676.13,408.31 675.9,408.71 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="679.76,410.77 679.99,410.37 676.17,408.29 675.94,408.69 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="679.75,410.72 679.99,410.32 676.22,408.27 675.99,408.67 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="679.75,410.68 679.98,410.28 676.27,408.25 676.03,408.65 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="679.74,410.63 679.97,410.23 676.31,408.23 676.08,408.63 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="679.74,410.58 679.97,410.18 676.36,408.21 676.12,408.61 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="679.73,410.54 679.96,410.14 676.4,408.19 676.17,408.59 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="679.72,410.49 679.96,410.09 676.45,408.18 676.22,408.57 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="679.72,410.45 679.95,410.05 676.49,408.16 676.26,408.56 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="679.71,410.4 679.95,410 676.54,408.14 676.31,408.54 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="679.71,410.35 679.94,409.95 676.59,408.12 676.35,408.52 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="679.7,410.31 679.93,409.91 676.63,408.1 676.4,408.5 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="679.69,410.26 679.93,409.86 676.68,408.08 676.44,408.48 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="679.69,410.21 679.92,409.82 676.72,408.06 676.49,408.46 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="679.68,410.17 679.92,409.77 676.77,408.04 676.53,408.44 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="679.68,410.12 679.91,409.72 676.81,408.02 676.58,408.42 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="679.67,410.08 679.9,409.68 676.86,408 676.63,408.4 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="679.66,410.03 679.9,409.63 676.91,407.99 676.67,408.38 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="679.66,409.98 679.89,409.59 676.95,407.97 676.72,408.36 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="679.65,409.94 679.89,409.54 677,407.95 676.76,408.35 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="679.65,409.89 679.88,409.49 677.04,407.93 676.81,408.33 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="679.64,409.85 679.88,409.45 677.09,407.91 676.85,408.31 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="679.63,409.8 679.87,409.4 677.13,407.89 676.9,408.29 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="679.63,409.75 679.86,409.36 677.18,407.87 676.94,408.27 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="679.62,409.71 679.86,409.31 677.23,407.85 676.99,408.25 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="679.62,409.66 679.85,409.26 677.27,407.83 677.04,408.23 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="679.61,409.62 679.85,409.22 677.32,407.82 677.08,408.21 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="679.6,409.57 679.84,409.17 677.36,407.8 677.13,408.19 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="679.6,409.52 679.83,409.13 677.41,407.78 677.17,408.17 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="679.59,409.48 679.83,409.08 677.45,407.76 677.22,408.16 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="679.59,409.43 679.82,409.04 677.5,407.74 677.26,408.14 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="679.58,409.39 679.82,408.99 677.55,407.72 677.31,408.12 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="679.57,409.34 679.81,408.94 677.59,407.7 677.35,408.1 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="679.57,409.29 679.81,408.9 677.64,407.68 677.4,408.08 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="679.56,409.25 679.8,408.85 677.68,407.66 677.45,408.06 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="679.56,409.2 679.79,408.81 677.73,407.65 677.49,408.04 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="679.55,409.16 679.79,408.76 677.77,407.63 677.54,408.02 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="679.54,409.11 679.78,408.71 677.82,407.61 677.58,408 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="679.54,409.06 679.78,408.67 677.87,407.59 677.63,407.98 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="679.53,409.02 679.77,408.62 677.91,407.57 677.67,407.96 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="679.53,408.97 679.77,408.58 677.96,407.55 677.72,407.95 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="679.52,408.93 679.76,408.53 678,407.53 677.76,407.93 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="679.51,408.88 679.75,408.48 678.05,407.51 677.81,407.91 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="679.51,408.83 679.75,408.44 678.1,407.49 677.85,407.89 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="679.5,408.79 679.74,408.39 678.14,407.48 677.9,407.87 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="679.49,408.74 679.74,408.35 678.19,407.46 677.94,407.85 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="679.49,408.69 679.73,408.3 678.23,407.44 677.99,407.83 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="679.48,408.65 679.73,408.26 678.28,407.42 678.04,407.81 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="679.48,408.6 679.72,408.21 678.32,407.4 678.08,407.79 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="679.47,408.56 679.71,408.16 678.37,407.38 678.13,407.77 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="679.46,408.51 679.71,408.12 678.42,407.36 678.17,407.75 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="679.46,408.46 679.7,408.07 678.46,407.34 678.22,407.73 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="679.45,408.42 679.7,408.03 678.51,407.33 678.26,407.72 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="679.44,408.37 679.69,407.98 678.56,407.31 678.31,407.7 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="679.44,408.32 679.69,407.94 678.6,407.29 678.35,407.68 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="679.43,408.28 679.68,407.89 678.65,407.27 678.4,407.66 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="679.43,408.23 679.68,407.84 678.69,407.25 678.44,407.64 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="679.42,408.19 679.67,407.8 678.74,407.23 678.49,407.62 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="679.41,408.14 679.67,407.75 678.79,407.21 678.53,407.6 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="679.41,408.09 679.66,407.71 678.83,407.19 678.58,407.58 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="679.4,408.05 679.66,407.66 678.88,407.18 678.62,407.56 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="679.39,408 679.65,407.62 678.93,407.16 678.67,407.54 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="679.38,407.95 679.65,407.57 678.97,407.14 678.71,407.52 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="679.38,407.91 679.64,407.53 679.02,407.12 678.75,407.5 					" />
											</g>
											<g>
												<polygon className="navas76" points="679.37,407.86 679.64,407.48 679.07,407.1 678.8,407.48 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="673.52,408.56 673.75,408.16 668.66,405.42 668.43,405.81 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="673.52,408.51 673.75,408.11 668.71,405.4 668.48,405.8 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="673.51,408.47 673.74,408.07 668.75,405.38 668.52,405.78 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="673.5,408.42 673.73,408.02 668.8,405.36 668.57,405.76 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="673.5,408.38 673.73,407.98 668.84,405.34 668.61,405.74 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="673.49,408.33 673.72,407.93 668.89,405.32 668.66,405.72 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="673.49,408.28 673.72,407.89 668.93,405.3 668.7,405.7 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="673.48,408.24 673.71,407.84 668.98,405.28 668.75,405.68 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="673.47,408.19 673.71,407.79 669.03,405.26 668.8,405.66 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="673.47,408.15 673.7,407.75 669.07,405.24 668.84,405.64 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="673.46,408.1 673.69,407.7 669.12,405.23 668.89,405.62 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="673.46,408.06 673.69,407.66 669.16,405.21 668.93,405.61 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="673.45,408.01 673.68,407.61 669.21,405.19 668.98,405.59 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="673.45,407.96 673.68,407.56 669.25,405.17 669.02,405.57 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="673.44,407.92 673.67,407.52 669.3,405.15 669.07,405.55 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="673.43,407.87 673.67,407.47 669.35,405.13 669.11,405.53 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="673.43,407.83 673.66,407.43 669.39,405.11 669.16,405.51 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="673.42,407.78 673.65,407.38 669.44,405.09 669.21,405.49 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="673.42,407.73 673.65,407.33 669.48,405.07 669.25,405.47 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="673.41,407.69 673.64,407.29 669.53,405.06 669.3,405.45 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="673.4,407.64 673.64,407.24 669.57,405.04 669.34,405.43 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="673.4,407.6 673.63,407.2 669.62,405.02 669.39,405.42 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="673.39,407.55 673.62,407.15 669.66,405 669.43,405.4 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="673.39,407.5 673.62,407.11 669.71,404.98 669.48,405.38 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="673.38,407.46 673.61,407.06 669.76,404.96 669.52,405.36 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="673.38,407.41 673.61,407.01 669.8,404.94 669.57,405.34 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="673.37,407.37 673.6,406.97 669.85,404.92 669.61,405.32 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="673.36,407.32 673.6,406.92 669.89,404.9 669.66,405.3 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="673.36,407.27 673.59,406.88 669.94,404.88 669.71,405.28 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="673.35,407.23 673.58,406.83 669.98,404.87 669.75,405.26 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="673.35,407.18 673.58,406.78 670.03,404.85 669.8,405.24 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="673.34,407.14 673.57,406.74 670.07,404.83 669.84,405.23 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="673.33,407.09 673.57,406.69 670.12,404.81 669.89,405.21 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="673.33,407.04 673.56,406.65 670.17,404.79 669.93,405.19 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="673.32,407 673.56,406.6 670.21,404.77 669.98,405.17 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="673.32,406.95 673.55,406.55 670.26,404.75 670.02,405.15 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="673.31,406.91 673.54,406.51 670.3,404.73 670.07,405.13 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="673.3,406.86 673.54,406.46 670.35,404.71 670.12,405.11 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="673.3,406.81 673.53,406.42 670.39,404.7 670.16,405.09 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="673.29,406.77 673.53,406.37 670.44,404.68 670.21,405.07 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="673.29,406.72 673.52,406.33 670.49,404.66 670.25,405.05 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="673.28,406.68 673.52,406.28 670.53,404.64 670.3,405.04 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="673.28,406.63 673.51,406.23 670.58,404.62 670.34,405.02 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="673.27,406.59 673.5,406.19 670.62,404.6 670.39,405 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="673.26,406.54 673.5,406.14 670.67,404.58 670.43,404.98 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="673.26,406.49 673.49,406.1 670.71,404.56 670.48,404.96 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="673.25,406.45 673.49,406.05 670.76,404.54 670.52,404.94 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="673.25,406.4 673.48,406 670.81,404.53 670.57,404.92 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="673.24,406.36 673.48,405.96 670.85,404.51 670.62,404.9 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="673.23,406.31 673.47,405.91 670.9,404.49 670.66,404.88 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="673.23,406.26 673.46,405.87 670.94,404.47 670.71,404.86 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="673.22,406.22 673.46,405.82 670.99,404.45 670.75,404.85 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="673.22,406.17 673.45,405.78 671.03,404.43 670.8,404.83 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="673.21,406.13 673.45,405.73 671.08,404.41 670.84,404.81 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="673.2,406.08 673.44,405.68 671.13,404.39 670.89,404.79 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="673.2,406.03 673.44,405.64 671.17,404.37 670.93,404.77 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="673.19,405.99 673.43,405.59 671.22,404.36 670.98,404.75 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="673.19,405.94 673.42,405.55 671.26,404.34 671.03,404.73 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="673.18,405.9 673.42,405.5 671.31,404.32 671.07,404.71 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="673.17,405.85 673.41,405.46 671.35,404.3 671.12,404.69 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="673.17,405.8 673.41,405.41 671.4,404.28 671.16,404.67 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="673.16,405.76 673.4,405.36 671.45,404.26 671.21,404.65 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="673.16,405.71 673.4,405.32 671.49,404.24 671.25,404.64 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="673.15,405.67 673.39,405.27 671.54,404.22 671.3,404.62 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="673.14,405.62 673.38,405.23 671.58,404.2 671.34,404.6 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="673.14,405.57 673.38,405.18 671.63,404.19 671.39,404.58 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="673.13,405.53 673.37,405.14 671.67,404.17 671.43,404.56 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="673.13,405.48 673.37,405.09 671.72,404.15 671.48,404.54 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="673.12,405.44 673.36,405.04 671.77,404.13 671.52,404.52 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="673.11,405.39 673.36,405 671.81,404.11 671.57,404.5 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="673.11,405.34 673.35,404.95 671.86,404.09 671.61,404.48 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="673.1,405.3 673.35,404.91 671.9,404.07 671.66,404.46 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="673.1,405.25 673.34,404.86 671.95,404.05 671.71,404.44 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="673.09,405.21 673.33,404.82 671.99,404.03 671.75,404.43 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="673.08,405.16 673.33,404.77 672.04,404.02 671.8,404.41 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="673.08,405.11 673.32,404.72 672.09,404 671.84,404.39 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="673.07,405.07 673.32,404.68 672.13,403.98 671.89,404.37 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="673.06,405.02 673.31,404.63 672.18,403.96 671.93,404.35 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="673.06,404.98 673.31,404.59 672.23,403.94 671.98,404.33 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="673.05,404.93 673.3,404.54 672.27,403.92 672.02,404.31 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="673.05,404.88 673.3,404.5 672.32,403.9 672.07,404.29 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="673.04,404.84 673.29,404.45 672.36,403.89 672.11,404.27 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="673.03,404.79 673.29,404.41 672.41,403.87 672.16,404.25 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="673.03,404.74 673.28,404.36 672.46,403.85 672.2,404.23 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="673.02,404.7 673.28,404.32 672.5,403.83 672.24,404.21 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="673.01,404.65 673.27,404.27 672.55,403.81 672.29,404.19 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="673,404.6 673.27,404.23 672.6,403.79 672.33,404.17 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="673,404.56 673.26,404.18 672.64,403.78 672.38,404.15 					" />
											</g>
											<g>
												<polygon className="navas76" points="672.99,404.51 673.26,404.14 672.69,403.76 672.42,404.13 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="667.28,405.18 667.51,404.78 662.43,402.04 662.2,402.44 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="667.27,405.13 667.5,404.73 662.48,402.02 662.25,402.42 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="667.26,405.09 667.5,404.69 662.52,402.01 662.29,402.4 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="667.26,405.04 667.49,404.64 662.57,401.99 662.34,402.38 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="667.25,405 667.48,404.6 662.61,401.97 662.38,402.37 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="667.25,404.95 667.48,404.55 662.66,401.95 662.43,402.35 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="667.24,404.9 667.47,404.51 662.71,401.93 662.47,402.33 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="667.24,404.86 667.47,404.46 662.75,401.91 662.52,402.31 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="667.23,404.81 667.46,404.41 662.8,401.89 662.57,402.29 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="667.22,404.77 667.46,404.37 662.84,401.87 662.61,402.27 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="667.22,404.72 667.45,404.32 662.89,401.85 662.66,402.25 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="667.21,404.67 667.44,404.28 662.93,401.84 662.7,402.23 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="667.21,404.63 667.44,404.23 662.98,401.82 662.75,402.21 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="667.2,404.58 667.43,404.18 663.02,401.8 662.79,402.19 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="667.2,404.54 667.43,404.14 663.07,401.78 662.84,402.18 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="667.19,404.49 667.42,404.09 663.12,401.76 662.88,402.16 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="667.18,404.45 667.42,404.05 663.16,401.74 662.93,402.14 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="667.18,404.4 667.41,404 663.21,401.72 662.98,402.12 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="667.17,404.35 667.4,403.96 663.25,401.7 663.02,402.1 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="667.17,404.31 667.4,403.91 663.3,401.68 663.07,402.08 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="667.16,404.26 667.39,403.86 663.34,401.66 663.11,402.06 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="667.16,404.22 667.39,403.82 663.39,401.65 663.16,402.04 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="667.15,404.17 667.38,403.77 663.43,401.63 663.2,402.02 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="667.14,404.12 667.38,403.73 663.48,401.61 663.25,402.01 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="667.14,404.08 667.37,403.68 663.53,401.59 663.29,401.99 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="667.13,404.03 667.36,403.64 663.57,401.57 663.34,401.97 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="667.13,403.99 667.36,403.59 663.62,401.55 663.38,401.95 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="667.12,403.94 667.35,403.54 663.66,401.53 663.43,401.93 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="667.12,403.9 667.35,403.5 663.71,401.51 663.47,401.91 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="667.11,403.85 667.34,403.45 663.75,401.49 663.52,401.89 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="667.1,403.8 667.34,403.41 663.8,401.48 663.57,401.87 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="667.1,403.76 667.33,403.36 663.84,401.46 663.61,401.85 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="667.09,403.71 667.33,403.32 663.89,401.44 663.66,401.83 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="667.09,403.67 667.32,403.27 663.94,401.42 663.7,401.82 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="667.08,403.62 667.31,403.22 663.98,401.4 663.75,401.8 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="667.07,403.58 667.31,403.18 664.03,401.38 663.79,401.78 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="667.07,403.53 667.3,403.13 664.07,401.36 663.84,401.76 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="667.06,403.48 667.3,403.09 664.12,401.34 663.88,401.74 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="667.06,403.44 667.29,403.04 664.16,401.32 663.93,401.72 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="667.05,403.39 667.29,403 664.21,401.31 663.97,401.7 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="667.05,403.35 667.28,402.95 664.25,401.29 664.02,401.68 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="667.04,403.3 667.27,402.9 664.3,401.27 664.07,401.66 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="667.03,403.25 667.27,402.86 664.35,401.25 664.11,401.64 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="667.03,403.21 667.26,402.81 664.39,401.23 664.16,401.63 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="667.02,403.16 667.26,402.77 664.44,401.21 664.2,401.61 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="667.02,403.12 667.25,402.72 664.48,401.19 664.25,401.59 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="667.01,403.07 667.25,402.68 664.53,401.17 664.29,401.57 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="667.01,403.03 667.24,402.63 664.57,401.15 664.34,401.55 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="667,402.98 667.23,402.58 664.62,401.14 664.38,401.53 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="666.99,402.93 667.23,402.54 664.66,401.12 664.43,401.51 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="666.99,402.89 667.22,402.49 664.71,401.1 664.47,401.49 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="666.98,402.84 667.22,402.45 664.76,401.08 664.52,401.47 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="666.98,402.8 667.21,402.4 664.8,401.06 664.57,401.46 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="666.97,402.75 667.21,402.36 664.85,401.04 664.61,401.44 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="666.96,402.7 667.2,402.31 664.89,401.02 664.66,401.42 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="666.96,402.66 667.2,402.26 664.94,401 664.7,401.4 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="666.95,402.61 667.19,402.22 664.98,400.98 664.75,401.38 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="666.95,402.57 667.18,402.17 665.03,400.97 664.79,401.36 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="666.94,402.52 667.18,402.13 665.08,400.95 664.84,401.34 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="666.94,402.48 667.17,402.08 665.12,400.93 664.88,401.32 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="666.93,402.43 667.17,402.04 665.17,400.91 664.93,401.3 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="666.92,402.38 667.16,401.99 665.21,400.89 664.97,401.28 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="666.92,402.34 667.16,401.94 665.26,400.87 665.02,401.26 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="666.91,402.29 667.15,401.9 665.3,400.85 665.06,401.25 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="666.91,402.25 667.15,401.85 665.35,400.83 665.11,401.23 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="666.9,402.2 667.14,401.81 665.39,400.82 665.15,401.21 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="666.89,402.15 667.13,401.76 665.44,400.8 665.2,401.19 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="666.89,402.11 667.13,401.72 665.49,400.78 665.25,401.17 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="666.88,402.06 667.12,401.67 665.53,400.76 665.29,401.15 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="666.88,402.02 667.12,401.63 665.58,400.74 665.34,401.13 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="666.87,401.97 667.11,401.58 665.62,400.72 665.38,401.11 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="666.86,401.93 667.11,401.53 665.67,400.7 665.43,401.09 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="666.86,401.88 667.1,401.49 665.72,400.68 665.47,401.07 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="666.85,401.83 667.1,401.44 665.76,400.67 665.52,401.05 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="666.85,401.79 667.09,401.4 665.81,400.65 665.56,401.04 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="666.84,401.74 667.09,401.35 665.85,400.63 665.61,401.02 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="666.83,401.7 667.08,401.31 665.9,400.61 665.65,401 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="666.83,401.65 667.08,401.26 665.95,400.59 665.7,400.98 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="666.82,401.6 667.07,401.22 665.99,400.57 665.74,400.96 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="666.81,401.56 667.07,401.17 666.04,400.55 665.79,400.94 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="666.81,401.51 667.06,401.13 666.08,400.54 665.83,400.92 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="666.8,401.46 667.06,401.08 666.13,400.52 665.88,400.9 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="666.79,401.42 667.05,401.03 666.18,400.5 665.92,400.88 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="666.79,401.37 667.05,400.99 666.22,400.48 665.97,400.86 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="666.78,401.33 667.04,400.94 666.27,400.46 666.01,400.84 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="666.77,401.28 667.04,400.9 666.32,400.44 666.05,400.82 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="666.77,401.23 667.03,400.85 666.36,400.42 666.1,400.8 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="666.76,401.19 667.03,400.81 666.41,400.41 666.14,400.78 					" />
											</g>
											<g>
												<polygon className="navas76" points="666.75,401.14 667.02,400.77 666.46,400.39 666.19,400.76 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="660.87,401.65 661.1,401.25 656.04,398.53 655.81,398.92 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="660.87,401.61 661.1,401.21 656.09,398.51 655.86,398.9 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="660.86,401.56 661.09,401.16 656.13,398.49 655.9,398.88 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="660.85,401.51 661.08,401.12 656.18,398.47 655.95,398.87 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="660.85,401.47 661.08,401.07 656.23,398.45 655.99,398.85 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="660.84,401.42 661.07,401.03 656.27,398.43 656.04,398.83 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="660.84,401.38 661.07,400.98 656.32,398.41 656.09,398.81 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="660.83,401.33 661.06,400.93 656.36,398.39 656.13,398.79 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="660.83,401.29 661.06,400.89 656.41,398.37 656.18,398.77 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="660.82,401.24 661.05,400.84 656.45,398.36 656.22,398.75 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="660.81,401.19 661.05,400.8 656.5,398.34 656.27,398.73 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="660.81,401.15 661.04,400.75 656.54,398.32 656.31,398.71 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="660.8,401.1 661.03,400.71 656.59,398.3 656.36,398.7 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="660.8,401.06 661.03,400.66 656.63,398.28 656.4,398.68 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="660.79,401.01 661.02,400.61 656.68,398.26 656.45,398.66 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="660.79,400.97 661.02,400.57 656.73,398.24 656.49,398.64 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="660.78,400.92 661.01,400.52 656.77,398.22 656.54,398.62 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="660.77,400.87 661.01,400.48 656.82,398.2 656.58,398.6 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="660.77,400.83 661,400.43 656.86,398.19 656.63,398.58 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="660.76,400.78 661,400.39 656.91,398.17 656.68,398.56 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="660.76,400.74 660.99,400.34 656.95,398.15 656.72,398.54 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="660.75,400.69 660.98,400.29 657,398.13 656.77,398.53 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="660.75,400.65 660.98,400.25 657.04,398.11 656.81,398.51 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="660.74,400.6 660.97,400.2 657.09,398.09 656.86,398.49 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="660.73,400.55 660.97,400.16 657.13,398.07 656.9,398.47 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="660.73,400.51 660.96,400.11 657.18,398.05 656.95,398.45 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="660.72,400.46 660.96,400.07 657.23,398.03 656.99,398.43 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="660.72,400.42 660.95,400.02 657.27,398.02 657.04,398.41 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="660.71,400.37 660.94,399.98 657.32,398 657.08,398.39 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="660.71,400.33 660.94,399.93 657.36,397.98 657.13,398.37 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="660.7,400.28 660.93,399.88 657.41,397.96 657.17,398.36 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="660.7,400.23 660.93,399.84 657.45,397.94 657.22,398.34 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="660.69,400.19 660.92,399.79 657.5,397.92 657.27,398.32 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="660.68,400.14 660.92,399.75 657.54,397.9 657.31,398.3 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="660.68,400.1 660.91,399.7 657.59,397.88 657.36,398.28 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="660.67,400.05 660.91,399.66 657.64,397.87 657.4,398.26 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="660.67,400.01 660.9,399.61 657.68,397.85 657.45,398.24 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="660.66,399.96 660.89,399.57 657.73,397.83 657.49,398.22 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="660.66,399.92 660.89,399.52 657.77,397.81 657.54,398.2 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="660.65,399.87 660.88,399.47 657.82,397.79 657.58,398.18 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="660.64,399.82 660.88,399.43 657.86,397.77 657.63,398.17 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="660.64,399.78 660.87,399.38 657.91,397.75 657.67,398.15 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="660.63,399.73 660.87,399.34 657.95,397.73 657.72,398.13 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="660.63,399.69 660.86,399.29 658,397.71 657.76,398.11 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="660.62,399.64 660.86,399.25 658.04,397.7 657.81,398.09 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="660.62,399.6 660.85,399.2 658.09,397.68 657.86,398.07 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="660.61,399.55 660.85,399.15 658.14,397.66 657.9,398.05 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="660.6,399.5 660.84,399.11 658.18,397.64 657.95,398.03 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="660.6,399.46 660.83,399.06 658.23,397.62 657.99,398.01 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="660.59,399.41 660.83,399.02 658.27,397.6 658.04,398 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="660.59,399.37 660.82,398.97 658.32,397.58 658.08,397.98 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="660.58,399.32 660.82,398.93 658.36,397.56 658.13,397.96 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="660.58,399.28 660.81,398.88 658.41,397.54 658.17,397.94 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="660.57,399.23 660.81,398.84 658.45,397.53 658.22,397.92 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="660.56,399.18 660.8,398.79 658.5,397.51 658.26,397.9 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="660.56,399.14 660.8,398.74 658.55,397.49 658.31,397.88 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="660.55,399.09 660.79,398.7 658.59,397.47 658.35,397.86 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="660.55,399.05 660.78,398.65 658.64,397.45 658.4,397.84 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="660.54,399 660.78,398.61 658.68,397.43 658.44,397.82 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="660.54,398.96 660.77,398.56 658.73,397.41 658.49,397.81 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="660.53,398.91 660.77,398.52 658.77,397.39 658.54,397.79 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="660.52,398.86 660.76,398.47 658.82,397.38 658.58,397.77 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="660.52,398.82 660.76,398.43 658.86,397.36 658.63,397.75 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="660.51,398.77 660.75,398.38 658.91,397.34 658.67,397.73 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="660.51,398.73 660.75,398.33 658.96,397.32 658.72,397.71 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="660.5,398.68 660.74,398.29 659,397.3 658.76,397.69 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="660.49,398.64 660.74,398.24 659.05,397.28 658.81,397.67 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="660.49,398.59 660.73,398.2 659.09,397.26 658.85,397.65 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="660.48,398.54 660.73,398.15 659.14,397.24 658.9,397.63 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="660.48,398.5 660.72,398.11 659.18,397.23 658.94,397.62 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="660.47,398.45 660.71,398.06 659.23,397.21 658.99,397.6 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="660.47,398.41 660.71,398.02 659.28,397.19 659.03,397.58 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="660.46,398.36 660.7,397.97 659.32,397.17 659.08,397.56 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="660.45,398.31 660.7,397.93 659.37,397.15 659.12,397.54 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="660.45,398.27 660.69,397.88 659.41,397.13 659.17,397.52 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="660.44,398.22 660.69,397.84 659.46,397.11 659.21,397.5 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="660.43,398.18 660.68,397.79 659.51,397.09 659.26,397.48 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="660.43,398.13 660.68,397.74 659.55,397.08 659.3,397.46 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="660.42,398.09 660.67,397.7 659.6,397.06 659.35,397.44 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="660.42,398.04 660.67,397.65 659.64,397.04 659.39,397.42 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="660.41,397.99 660.66,397.61 659.69,397.02 659.44,397.4 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="660.4,397.95 660.66,397.56 659.74,397 659.48,397.39 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="660.4,397.9 660.65,397.52 659.78,396.98 659.53,397.37 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="660.39,397.86 660.65,397.47 659.83,396.97 659.57,397.35 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="660.38,397.81 660.64,397.43 659.87,396.95 659.62,397.33 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="660.38,397.76 660.64,397.38 659.92,396.93 659.66,397.31 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="660.37,397.72 660.63,397.34 659.97,396.91 659.7,397.29 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="660.36,397.67 660.63,397.29 660.01,396.89 659.75,397.27 					" />
											</g>
											<g>
												<polygon className="navas76" points="660.36,397.62 660.63,397.25 660.06,396.87 659.79,397.25 					" />
											</g>
										</g>
										<g>
											<g className="navas95">
												<polygon className="navas67" points="654.61,398.32 654.85,397.92 649.8,395.2 649.57,395.6 					" />
											</g>
											<g className="navas176">
												<polygon className="navas67" points="654.61,398.27 654.84,397.88 649.85,395.18 649.62,395.58 					" />
											</g>
											<g className="navas177">
												<polygon className="navas178" points="654.6,398.23 654.83,397.83 649.89,395.16 649.66,395.56 					" />
											</g>
											<g className="navas179">
												<polygon className="navas180" points="654.6,398.18 654.83,397.79 649.94,395.15 649.71,395.54 					" />
											</g>
											<g className="navas181">
												<polygon className="navas182" points="654.59,398.14 654.82,397.74 649.99,395.13 649.75,395.52 					" />
											</g>
											<g className="navas183">
												<polygon className="navas184" points="654.59,398.09 654.82,397.69 650.03,395.11 649.8,395.5 					" />
											</g>
											<g className="navas185">
												<polygon className="navas186" points="654.58,398.05 654.81,397.65 650.08,395.09 649.84,395.49 					" />
											</g>
											<g className="navas187">
												<polygon className="navas188" points="654.58,398 654.81,397.6 650.12,395.07 649.89,395.47 					" />
											</g>
											<g className="navas189">
												<polygon className="navas190" points="654.57,397.95 654.8,397.56 650.17,395.05 649.94,395.45 					" />
											</g>
											<g className="navas191">
												<polygon className="navas192" points="654.57,397.91 654.8,397.51 650.21,395.03 649.98,395.43 					" />
											</g>
											<g className="navas193">
												<polygon className="navas194" points="654.56,397.86 654.79,397.47 650.26,395.01 650.03,395.41 					" />
											</g>
											<g className="navas195">
												<polygon className="navas196" points="654.55,397.82 654.79,397.42 650.3,395 650.07,395.39 					" />
											</g>
											<g className="navas197">
												<polygon className="navas198" points="654.55,397.77 654.78,397.38 650.35,394.98 650.12,395.37 					" />
											</g>
											<g className="navas199">
												<polygon className="navas200" points="654.54,397.73 654.77,397.33 650.39,394.96 650.16,395.35 					" />
											</g>
											<g className="navas201">
												<polygon className="navas202" points="654.54,397.68 654.77,397.28 650.44,394.94 650.21,395.33 					" />
											</g>
											<g className="navas203">
												<polygon className="navas202" points="654.53,397.63 654.76,397.24 650.49,394.92 650.25,395.32 					" />
											</g>
											<g className="navas204">
												<polygon className="navas205" points="654.53,397.59 654.76,397.19 650.53,394.9 650.3,395.3 					" />
											</g>
											<g className="navas206">
												<polygon className="navas207" points="654.52,397.54 654.75,397.15 650.58,394.88 650.34,395.28 					" />
											</g>
											<g className="navas208">
												<polygon className="navas207" points="654.51,397.5 654.75,397.1 650.62,394.86 650.39,395.26 					" />
											</g>
											<g className="navas209">
												<polygon className="navas210" points="654.51,397.45 654.74,397.06 650.67,394.84 650.43,395.24 					" />
											</g>
											<g className="navas211">
												<polygon className="navas212" points="654.5,397.41 654.74,397.01 650.71,394.83 650.48,395.22 					" />
											</g>
											<g className="navas213">
												<polygon className="navas214" points="654.5,397.36 654.73,396.97 650.76,394.81 650.53,395.2 					" />
											</g>
											<g className="navas112">
												<polygon className="navas215" points="654.49,397.32 654.72,396.92 650.8,394.79 650.57,395.18 					" />
											</g>
											<g className="navas216">
												<polygon className="navas217" points="654.49,397.27 654.72,396.87 650.85,394.77 650.62,395.16 					" />
											</g>
											<g className="navas218">
												<polygon className="navas219" points="654.48,397.22 654.71,396.83 650.89,394.75 650.66,395.15 					" />
											</g>
											<g className="navas220">
												<polygon className="navas219" points="654.48,397.18 654.71,396.78 650.94,394.73 650.71,395.13 					" />
											</g>
											<g className="navas221">
												<polygon className="navas222" points="654.47,397.13 654.7,396.74 650.98,394.71 650.75,395.11 					" />
											</g>
											<g className="navas223">
												<polygon className="navas224" points="654.46,397.09 654.7,396.69 651.03,394.69 650.8,395.09 					" />
											</g>
											<g className="navas225">
												<polygon className="navas226" points="654.46,397.04 654.69,396.65 651.08,394.67 650.84,395.07 					" />
											</g>
											<g className="navas227">
												<polygon className="navas228" points="654.45,397 654.69,396.6 651.12,394.66 650.89,395.05 					" />
											</g>
											<g className="navas229">
												<polygon className="navas230" points="654.45,396.95 654.68,396.56 651.17,394.64 650.93,395.03 					" />
											</g>
											<g className="navas231">
												<polygon className="navas232" points="654.44,396.91 654.68,396.51 651.21,394.62 650.98,395.01 					" />
											</g>
											<g className="navas233">
												<polygon className="navas234" points="654.44,396.86 654.67,396.46 651.26,394.6 651.02,394.99 					" />
											</g>
											<g className="navas235">
												<polygon className="navas236" points="654.43,396.81 654.66,396.42 651.3,394.58 651.07,394.98 					" />
											</g>
											<g className="navas237">
												<polygon className="navas238" points="654.43,396.77 654.66,396.37 651.35,394.56 651.11,394.96 					" />
											</g>
											<g className="navas239">
												<polygon className="navas240" points="654.42,396.72 654.65,396.33 651.39,394.54 651.16,394.94 					" />
											</g>
											<g className="navas241">
												<polygon className="navas242" points="654.41,396.68 654.65,396.28 651.44,394.52 651.2,394.92 					" />
											</g>
											<g className="navas243">
												<polygon className="navas242" points="654.41,396.63 654.64,396.24 651.48,394.51 651.25,394.9 					" />
											</g>
											<g className="navas244">
												<polygon className="navas245" points="654.4,396.59 654.64,396.19 651.53,394.49 651.3,394.88 					" />
											</g>
											<g className="navas246">
												<polygon className="navas247" points="654.4,396.54 654.63,396.15 651.57,394.47 651.34,394.86 					" />
											</g>
											<g className="navas248">
												<polygon className="navas249" points="654.39,396.5 654.63,396.1 651.62,394.45 651.39,394.84 					" />
											</g>
											<g className="navas250">
												<polygon className="navas251" points="654.39,396.45 654.62,396.06 651.67,394.43 651.43,394.82 					" />
											</g>
											<g className="navas252">
												<polygon className="navas253" points="654.38,396.4 654.62,396.01 651.71,394.41 651.48,394.81 					" />
											</g>
											<g className="navas254">
												<polygon className="navas253" points="654.38,396.36 654.61,395.96 651.76,394.39 651.52,394.79 					" />
											</g>
											<g className="navas130">
												<polygon className="navas255" points="654.37,396.31 654.6,395.92 651.8,394.37 651.57,394.77 					" />
											</g>
											<g className="navas256">
												<polygon className="navas257" points="654.36,396.27 654.6,395.87 651.85,394.35 651.61,394.75 					" />
											</g>
											<g className="navas258">
												<polygon className="navas259" points="654.36,396.22 654.59,395.83 651.89,394.34 651.66,394.73 					" />
											</g>
											<g className="navas260">
												<polygon className="navas261" points="654.35,396.18 654.59,395.78 651.94,394.32 651.7,394.71 					" />
											</g>
											<g className="navas262">
												<polygon className="navas263" points="654.35,396.13 654.58,395.74 651.98,394.3 651.75,394.69 					" />
											</g>
											<g className="navas264">
												<polygon className="navas265" points="654.34,396.09 654.58,395.69 652.03,394.28 651.79,394.67 					" />
											</g>
											<g className="navas266">
												<polygon className="navas267" points="654.34,396.04 654.57,395.65 652.08,394.26 651.84,394.65 					" />
											</g>
											<g className="navas268">
												<polygon className="navas269" points="654.33,395.99 654.57,395.6 652.12,394.24 651.88,394.63 					" />
											</g>
											<g className="navas270">
												<polygon className="navas271" points="654.32,395.95 654.56,395.56 652.17,394.22 651.93,394.62 					" />
											</g>
											<g className="navas272">
												<polygon className="navas273" points="654.32,395.9 654.56,395.51 652.21,394.2 651.97,394.6 					" />
											</g>
											<g className="navas274">
												<polygon className="navas275" points="654.31,395.86 654.55,395.46 652.26,394.19 652.02,394.58 					" />
											</g>
											<g className="navas276">
												<polygon className="navas277" points="654.31,395.81 654.55,395.42 652.3,394.17 652.07,394.56 					" />
											</g>
											<g className="navas278">
												<polygon className="navas279" points="654.3,395.77 654.54,395.37 652.35,394.15 652.11,394.54 					" />
											</g>
											<g className="navas280">
												<polygon className="navas279" points="654.3,395.72 654.53,395.33 652.39,394.13 652.16,394.52 					" />
											</g>
											<g className="navas281">
												<polygon className="navas282" points="654.29,395.68 654.53,395.28 652.44,394.11 652.2,394.5 					" />
											</g>
											<g className="navas283">
												<polygon className="navas284" points="654.28,395.63 654.52,395.24 652.48,394.09 652.25,394.48 					" />
											</g>
											<g className="navas285">
												<polygon className="navas286" points="654.28,395.58 654.52,395.19 652.53,394.07 652.29,394.46 					" />
											</g>
											<g className="navas287">
												<polygon className="navas288" points="654.27,395.54 654.51,395.15 652.58,394.05 652.34,394.45 					" />
											</g>
											<g className="navas289">
												<polygon className="navas290" points="654.27,395.49 654.51,395.1 652.62,394.04 652.38,394.43 					" />
											</g>
											<g className="navas291">
												<polygon className="navas290" points="654.26,395.45 654.5,395.06 652.67,394.02 652.43,394.41 					" />
											</g>
											<g className="navas292">
												<polygon className="navas293" points="654.26,395.4 654.5,395.01 652.71,394 652.47,394.39 					" />
											</g>
											<g className="navas294">
												<polygon className="navas295" points="654.25,395.36 654.49,394.97 652.76,393.98 652.52,394.37 					" />
											</g>
											<g className="navas148">
												<polygon className="navas296" points="654.24,395.31 654.49,394.92 652.8,393.96 652.56,394.35 					" />
											</g>
											<g className="navas297">
												<polygon className="navas298" points="654.24,395.26 654.48,394.87 652.85,393.94 652.61,394.33 					" />
											</g>
											<g className="navas299">
												<polygon className="navas298" points="654.23,395.22 654.48,394.83 652.89,393.92 652.65,394.31 					" />
											</g>
											<g className="navas300">
												<polygon className="navas301" points="654.23,395.17 654.47,394.78 652.94,393.9 652.7,394.29 					" />
											</g>
											<g className="navas302">
												<polygon className="navas303" points="654.22,395.13 654.47,394.74 652.99,393.89 652.74,394.27 					" />
											</g>
											<g className="navas304">
												<polygon className="navas305" points="654.22,395.08 654.46,394.69 653.03,393.87 652.79,394.26 					" />
											</g>
											<g className="navas306">
												<polygon className="navas307" points="654.21,395.04 654.46,394.65 653.08,393.85 652.83,394.24 					" />
											</g>
											<g className="navas308">
												<polygon className="navas309" points="654.2,394.99 654.45,394.6 653.12,393.83 652.88,394.22 					" />
											</g>
											<g className="navas310">
												<polygon className="navas309" points="654.2,394.94 654.44,394.56 653.17,393.81 652.92,394.2 					" />
											</g>
											<g className="navas311">
												<polygon className="navas312" points="654.19,394.9 654.44,394.51 653.22,393.79 652.97,394.18 					" />
											</g>
											<g className="navas313">
												<polygon className="navas314" points="654.19,394.85 654.43,394.47 653.26,393.77 653.01,394.16 					" />
											</g>
											<g className="navas315">
												<polygon className="navas316" points="654.18,394.81 654.43,394.42 653.31,393.76 653.06,394.14 					" />
											</g>
											<g className="navas317">
												<polygon className="navas318" points="654.17,394.76 654.42,394.38 653.35,393.74 653.1,394.12 					" />
											</g>
											<g className="navas319">
												<polygon className="navas320" points="654.17,394.72 654.42,394.33 653.4,393.72 653.15,394.1 					" />
											</g>
											<g className="navas321">
												<polygon className="navas322" points="654.16,394.67 654.41,394.29 653.44,393.7 653.19,394.08 					" />
											</g>
											<g className="navas323">
												<polygon className="navas322" points="654.16,394.62 654.41,394.24 653.49,393.68 653.24,394.06 					" />
											</g>
											<g className="navas324">
												<polygon className="navas325" points="654.15,394.58 654.41,394.2 653.54,393.66 653.28,394.04 					" />
											</g>
											<g className="navas326">
												<polygon className="navas327" points="654.14,394.53 654.4,394.15 653.58,393.64 653.33,394.03 					" />
											</g>
											<g className="navas328">
												<polygon className="navas329" points="654.14,394.49 654.4,394.11 653.63,393.63 653.37,394.01 					" />
											</g>
											<g className="navas330">
												<polygon className="navas329" points="654.13,394.44 654.39,394.06 653.68,393.61 653.41,393.99 					" />
											</g>
											<g className="navas331">
												<polygon className="navas332" points="654.12,394.39 654.39,394.02 653.72,393.59 653.46,393.97 					" />
											</g>
											<g className="navas333">
												<polygon className="navas334" points="654.12,394.35 654.38,393.97 653.77,393.57 653.5,393.95 					" />
											</g>
											<g>
												<polygon className="navas76" points="654.11,394.3 654.38,393.93 653.82,393.55 653.55,393.93 					" />
											</g>
										</g>
									</g>
									<g>
										<path className="navas79" d="M711.59,439.97l42.44-23.9l-6.22-3.3l-42.39,23.85L711.59,439.97z M706.39,436.54l5.35-3.01l2.45,4.28
				L706.39,436.54z M744.76,420.84l-2.3-3.93l4.77,2.54L744.76,420.84z M741.71,416.66l2.49,4.24l-7.81-1.25L741.71,416.66z
				 M735.73,420.03l2.48,4.25l-7.81-1.25L735.73,420.03z M729.73,423.4l2.47,4.26l-7.8-1.26L729.73,423.4z M723.74,426.77l2.46,4.26
				l-7.8-1.26L723.74,426.77z M717.74,430.15l2.46,4.27l-7.8-1.27L717.74,430.15z M744.09,421.21l-2.47,1.39l-4.77-2.55
				L744.09,421.21z M738.76,424.21l-2.3-3.94l4.77,2.55L738.76,424.21z M738.1,424.59l-2.47,1.39l-4.76-2.55L738.1,424.59z
				 M732.76,427.59l-2.29-3.94l4.76,2.55L732.76,427.59z M732.1,427.96l-2.47,1.39l-4.76-2.56L732.1,427.96z M726.76,430.97
				l-2.28-3.95l4.76,2.56L726.76,430.97z M726.09,431.35l-2.47,1.39l-4.75-2.56L726.09,431.35z M720.75,434.36l-2.28-3.96l4.75,2.56
				L720.75,434.36z M720.08,434.73l-2.48,1.39l-4.75-2.57L720.08,434.73z M714.74,437.74l-2.27-3.96l4.75,2.57L714.74,437.74z
				 M747.7,413.29l2.49,4.24l-7.82-1.24L747.7,413.29z M750.09,417.84l-2.47,1.39l-4.77-2.54L750.09,417.84z M711.57,439.52
				l-4.78-2.6l7.28,1.19L711.57,439.52z M753.21,416.07l-2.47,1.39l-2.31-3.93L753.21,416.07z"/>
										<path className="navas77" d="M705.16,429.98l0.26,6.65l42.39-23.85l-0.34-6.58L705.16,429.98z M705.73,430.11l5.34-3l-2.45,7.01
				L705.73,430.11z M711.83,432.56l-0.21-5.1l2.68,3.71L711.83,432.56z M738.95,417.31l2.21-6.45l0.25,5.07L738.95,417.31z
				 M717.06,423.74l-2.44,7l-2.89-4.01L717.06,423.74z M723.05,420.37l-2.42,6.99l-2.9-4L723.05,420.37z M729.04,417.01l-2.41,6.99
				l-2.91-3.99L729.04,417.01z M735.02,413.64l-2.4,6.98l-2.92-3.99L735.02,413.64z M740.99,410.28l-2.39,6.97l-2.92-3.98
				L740.99,410.28z M738.28,417.68l-2.47,1.39l-0.24-5.07L738.28,417.68z M732.96,420.68l2.22-6.46l0.24,5.08L732.96,420.68z
				 M732.3,421.05l-2.47,1.39l-0.23-5.08L732.3,421.05z M726.97,424.05l2.23-6.47l0.23,5.08L726.97,424.05z M726.3,424.42
				l-2.47,1.39l-0.23-5.09L726.3,424.42z M720.97,427.42l2.25-6.48l0.22,5.09L720.97,427.42z M720.31,427.79l-2.47,1.39l-0.22-5.1
				L720.31,427.79z M714.97,430.8l2.26-6.49l0.22,5.1L714.97,430.8z M746.97,406.93l-2.38,6.96l-2.93-3.97L746.97,406.93z
				 M744.27,414.31l-2.46,1.39l-0.25-5.07L744.27,414.31z M708.96,434.18l2.27-6.5l0.21,5.1L708.96,434.18z M747.39,412.55
				l-2.46,1.39l2.2-6.45L747.39,412.55z M705.8,435.96l-0.2-5.16l2.7,3.75L705.8,435.96z"/>
										<path className="navas169" d="M705.16,429.98l6.15,3.33l42.35-23.83l-6.2-3.28L705.16,429.98z M706.13,429.89l5.34-3l2.44,4.26
				L706.13,429.89z M717.33,429.47l-4.74-2.55l7.21,1.16L717.33,429.47z M744.42,414.22l-2.3-3.92l4.76,2.53L744.42,414.22z
				 M717.46,423.52l2.45,4.25l-7.78-1.26L717.46,423.52z M723.45,420.15l2.46,4.25l-7.79-1.25L723.45,420.15z M729.43,416.79
				l2.47,4.24l-7.79-1.25L729.43,416.79z M735.41,413.42l2.47,4.23l-7.79-1.24L735.41,413.42z M741.39,410.06l2.48,4.23l-7.8-1.24
				L741.39,410.06z M743.76,414.6l-2.46,1.39l-4.76-2.53L743.76,414.6z M738.44,417.59l-2.29-3.92l4.76,2.53L738.44,417.59z
				 M737.78,417.96l-2.47,1.39l-4.75-2.54L737.78,417.96z M732.45,420.96l-2.29-3.93l4.75,2.54L732.45,420.96z M731.79,421.33
				l-2.47,1.39l-4.75-2.54L731.79,421.33z M726.46,424.33l-2.28-3.93l4.75,2.54L726.46,424.33z M725.8,424.71l-2.47,1.39l-4.74-2.55
				L725.8,424.71z M720.46,427.71l-2.27-3.94l4.74,2.55L720.46,427.71z M747.36,406.71l2.49,4.22l-7.8-1.23L747.36,406.71z
				 M749.74,411.23l-2.46,1.39l-4.76-2.53L749.74,411.23z M714.46,431.08l-2.26-3.95l4.74,2.55L714.46,431.08z M752.86,409.48
				l-2.46,1.38l-2.31-3.91L752.86,409.48z M711.3,432.86l-4.77-2.58l7.27,1.18L711.3,432.86z"/>
										<path className="navas77" d="M711.32,433.31l0.27,6.66l42.44-23.9l-0.35-6.6L711.32,433.31z M711.89,433.44l5.34-3.01l-2.44,7.03
				L711.89,433.44z M718,435.9l-0.22-5.12l2.69,3.72L718,435.9z M745.15,420.62l2.21-6.47l0.26,5.08L745.15,420.62z M723.23,427.06
				l-2.43,7.02l-2.91-4.02L723.23,427.06z M729.23,423.68l-2.42,7.01l-2.92-4.01L729.23,423.68z M735.22,420.31l-2.41,7l-2.92-4
				L735.22,420.31z M741.21,416.94l-2.39,6.99l-2.93-4L741.21,416.94z M747.19,413.58l-2.38,6.98l-2.94-3.99L747.19,413.58z
				 M744.49,420.99l-2.47,1.39l-0.25-5.09L744.49,420.99z M739.16,423.99l2.22-6.48l0.25,5.09L739.16,423.99z M738.49,424.36
				l-2.47,1.39l-0.24-5.09L738.49,424.36z M733.16,427.37l2.23-6.49l0.24,5.09L733.16,427.37z M732.49,427.74l-2.47,1.39l-0.23-5.1
				L732.49,427.74z M727.15,430.75l2.24-6.49l0.23,5.1L727.15,430.75z M726.49,431.12l-2.47,1.39l-0.23-5.11L726.49,431.12z
				 M721.15,434.13l2.25-6.5l0.23,5.11L721.15,434.13z M753.17,410.21l-2.37,6.98l-2.95-3.98L753.17,410.21z M750.48,417.62
				l-2.47,1.39l-0.26-5.08L750.48,417.62z M715.13,437.52l2.26-6.51l0.22,5.12L715.13,437.52z M753.61,415.85l-2.47,1.39l2.2-6.46
				L753.61,415.85z M711.97,439.3l-0.21-5.17l2.71,3.76L711.97,439.3z"/>
									</g>
									<g>
										<path className="navas77" d="M636.93,393.06l0.12,6.46l74.53,40.45l-0.27-6.66L636.93,393.06z M655.58,403.58l2.52,1.36l-2.39,3.64
				L655.58,403.58z M655.3,408.36l-2.64-6.36l2.51,1.36L655.3,408.36z M661.7,406.89l2.52,1.37l-2.39,3.65L661.7,406.89z
				 M661.43,411.69l-2.65-6.38l2.52,1.36L661.43,411.69z M667.83,410.21l2.53,1.37l-2.39,3.66L667.83,410.21z M667.57,415.02
				l-2.67-6.4l2.53,1.37L667.57,415.02z M673.99,413.54l2.54,1.38l-2.39,3.67L673.99,413.54z M673.73,418.36l-2.69-6.42l2.54,1.37
				L673.73,418.36z M680.17,416.88l2.55,1.38l-2.39,3.68L680.17,416.88z M679.92,421.72l-2.7-6.43l2.55,1.38L679.92,421.72z
				 M686.36,420.24l2.56,1.38l-2.39,3.68L686.36,420.24z M686.12,425.08l-2.72-6.45l2.55,1.38L686.12,425.08z M692.58,423.6
				l2.56,1.39l-2.39,3.69L692.58,423.6z M692.34,428.46l-2.74-6.47l2.56,1.39L692.34,428.46z M698.81,426.97l2.57,1.39l-2.38,3.7
				L698.81,426.97z M698.59,431.84l-2.76-6.48l2.57,1.39L698.59,431.84z M705.06,430.36l2.58,1.4l-2.38,3.71L705.06,430.36z
				 M704.85,435.24l-2.77-6.5l2.58,1.39L704.85,435.24z M708,432.18l3.01,7.04l-5.59-3.03L708,432.18z M704.73,435.81l-5.57-3.02
				l2.58-4L704.73,435.81z M698.47,432.42l-5.55-3.01l2.58-3.99L698.47,432.42z M692.23,429.03l-5.54-3l2.58-3.98L692.23,429.03z
				 M686,425.65l-5.52-2.99l2.58-3.97L686,425.65z M679.8,422.29l-5.5-2.98l2.58-3.96L679.8,422.29z M673.62,418.93l-5.48-2.98
				l2.58-3.95L673.62,418.93z M667.45,415.58l-5.47-2.97l2.58-3.94L667.45,415.58z M661.3,412.25l-5.45-2.96l2.59-3.93L661.3,412.25
				z M655.18,408.92l-5.43-2.95l2.59-3.93L655.18,408.92z M649.59,405.27l-0.11-4.99l2.51,1.36L649.59,405.27z M640.5,395.42
				l2.5,1.35l0.1,4.98L640.5,395.42z M642.98,402.31l-5.4-2.93l2.59-3.91L642.98,402.31z M643.4,396.98l2.5,1.35l-2.4,3.63
				L643.4,396.98z M646.24,398.76l2.83,6.85l-5.42-2.94L646.24,398.76z M646.57,398.7l2.51,1.36l0.11,4.99L646.57,398.7z
				 M710.92,433.53l0.21,5.12l-2.79-6.52L710.92,433.53z M637.34,393.7l2.49,1.35l-2.4,3.62L637.34,393.7z"/>
										<path className="navas79" d="M637.06,399.52l-5.83,3.25l74.45,40.53l5.91-3.33L637.06,399.52z M655.34,409.87l2.52,1.37l-7.01,1.14
				L655.34,409.87z M650.44,412.16l1.97-3.88l2.52,1.37L650.44,412.16z M661.47,413.2l2.53,1.37l-7.03,1.14L661.47,413.2z
				 M656.57,415.5l1.97-3.89l2.53,1.37L656.57,415.5z M667.61,416.54l2.54,1.38l-7.04,1.14L667.61,416.54z M662.71,418.84l1.97-3.9
				l2.53,1.38L662.71,418.84z M673.78,419.88l2.55,1.38l-7.05,1.14L673.78,419.88z M668.87,422.19l1.97-3.91l2.54,1.38
				L668.87,422.19z M679.97,423.24l2.55,1.39l-7.07,1.15L679.97,423.24z M675.05,425.55l1.96-3.92l2.55,1.38L675.05,425.55z
				 M686.17,426.61l2.56,1.39l-7.08,1.15L686.17,426.61z M681.25,428.93l1.96-3.92l2.56,1.39L681.25,428.93z M692.4,429.99
				l2.57,1.39l-7.09,1.15L692.4,429.99z M687.47,432.31l1.96-3.93l2.57,1.39L687.47,432.31z M698.64,433.38l2.58,1.4l-7.11,1.15
				L698.64,433.38z M693.7,435.7l1.96-3.94l2.57,1.4L693.7,435.7z M704.91,436.78l2.59,1.4l-7.12,1.15L704.91,436.78z
				 M699.96,439.11l1.95-3.95l2.58,1.4L699.96,439.11z M707.63,438.5l-2.11,4.28l-5.58-3.04L707.63,438.5z M699.24,439.36
				l-5.57-3.03l7.67-1.24L699.24,439.36z M692.99,435.95l-5.55-3.02l7.66-1.24L692.99,435.95z M686.75,432.56l-5.53-3.01l7.65-1.24
				L686.75,432.56z M680.53,429.17l-5.51-3l7.63-1.24L680.53,429.17z M674.33,425.8l-5.5-2.99l7.62-1.24L674.33,425.8z
				 M668.16,422.44l-5.48-2.98l7.6-1.24L668.16,422.44z M662,419.08l-5.46-2.97l7.59-1.23L662,419.08z M655.86,415.74l-5.44-2.96
				l7.57-1.23L655.86,415.74z M649.74,412.41l-5.43-2.95l7.56-1.23L649.74,412.41z M644.74,409.06l4.49-2.51l2.51,1.36
				L644.74,409.06z M640.24,401.67l2.5,1.36l-4.48,2.5L640.24,401.67z M637.55,405.78l-5.39-2.94l7.53-1.23L637.55,405.78z
				 M643.14,403.25l2.51,1.36l-6.99,1.14L643.14,403.25z M645.77,404.91l-2.14,4.18l-5.41-2.94L645.77,404.91z M646.32,404.97
				l2.51,1.36l-4.49,2.51L646.32,404.97z M710.78,439.97l-4.54,2.56l1.95-3.96L710.78,439.97z M637.07,399.95l2.5,1.36l-6.98,1.14
				L637.07,399.95z"/>
										<path className="navas78" d="M631.12,396.3l0.11,6.47l74.45,40.53l-0.26-6.67L631.12,396.3z M649.74,406.84l2.51,1.37l-2.4,3.65
				L649.74,406.84z M649.46,411.63l-2.62-6.37l2.51,1.36L649.46,411.63z M655.85,410.15l2.52,1.37l-2.4,3.66L655.85,410.15z
				 M655.58,414.96l-2.64-6.39l2.52,1.37L655.58,414.96z M661.98,413.48l2.53,1.37l-2.4,3.66L661.98,413.48z M661.71,418.3
				l-2.66-6.41l2.53,1.37L661.71,418.3z M668.13,416.82l2.54,1.38l-2.4,3.67L668.13,416.82z M667.87,421.65l-2.68-6.42l2.53,1.38
				L667.87,421.65z M674.3,420.17l2.55,1.38l-2.39,3.68L674.3,420.17z M674.05,425.01l-2.69-6.44l2.54,1.38L674.05,425.01z
				 M680.49,423.53l2.55,1.39l-2.39,3.69L680.49,423.53z M680.24,428.38l-2.71-6.46l2.55,1.38L680.24,428.38z M686.7,426.9
				l2.56,1.39l-2.39,3.7L686.7,426.9z M686.46,431.76l-2.73-6.48l2.56,1.39L686.46,431.76z M692.93,430.28l2.57,1.4l-2.39,3.71
				L692.93,430.28z M692.7,435.16l-2.75-6.49l2.57,1.39L692.7,435.16z M699.17,433.67l2.58,1.4l-2.39,3.72L699.17,433.67z
				 M698.95,438.56l-2.76-6.51l2.57,1.4L698.95,438.56z M702.11,435.5l3,7.05l-5.58-3.04L702.11,435.5z M698.83,439.13l-5.56-3.03
				l2.58-4L698.83,439.13z M692.58,435.73l-5.55-3.02l2.58-3.99L692.58,435.73z M686.34,432.33l-5.53-3.01l2.58-3.98L686.34,432.33z
				 M680.12,428.95l-5.51-3l2.59-3.98L680.12,428.95z M673.93,425.58l-5.49-2.99l2.59-3.97L673.93,425.58z M667.75,422.22
				l-5.48-2.98l2.59-3.96L667.75,422.22z M661.59,418.86l-5.46-2.97l2.59-3.95L661.59,418.86z M655.45,415.52l-5.44-2.96l2.59-3.94
				L655.45,415.52z M649.33,412.19l-5.43-2.95l2.59-3.93L649.33,412.19z M643.76,408.53l-0.11-5l2.51,1.36L643.76,408.53z
				 M634.69,398.66l2.5,1.35l0.1,4.99L634.69,398.66z M637.15,405.56l-5.39-2.94l2.6-3.91L637.15,405.56z M637.58,400.23l2.5,1.36
				l-2.4,3.63L637.58,400.23z M640.42,402.01l2.81,6.86l-5.41-2.94L640.42,402.01z M640.75,401.95l2.5,1.36l0.1,5L640.75,401.95z
				 M705.03,436.85l0.2,5.13l-2.78-6.53L705.03,436.85z M631.52,396.95l2.49,1.35l-2.4,3.62L631.52,396.95z"/>
										<path className="navas169" d="M636.93,393.06l-5.81,3.24l74.3,40.33l5.9-3.32L636.93,393.06z M636.94,393.49l2.49,1.35l-6.96,1.14
				L636.94,393.49z M643,396.77l2.5,1.35l-6.97,1.14L643,396.77z M638.13,399.05l1.98-3.85l2.5,1.35L638.13,399.05z M649.08,400.06
				l2.51,1.36l-6.99,1.14L649.08,400.06z M644.2,402.34l1.97-3.86l2.51,1.36L644.2,402.34z M655.18,403.36l2.52,1.36l-7,1.14
				L655.18,403.36z M650.29,405.65l1.97-3.86l2.51,1.36L650.29,405.65z M661.3,406.67l2.52,1.37l-7.01,1.14L661.3,406.67z
				 M656.4,408.96l1.97-3.87l2.52,1.36L656.4,408.96z M667.43,409.99l2.53,1.37l-7.03,1.14L667.43,409.99z M662.53,412.29l1.97-3.88
				l2.53,1.37L662.53,412.29z M673.59,413.32l2.54,1.37l-7.04,1.14L673.59,413.32z M668.68,415.62l1.96-3.89l2.54,1.37
				L668.68,415.62z M679.76,416.66l2.55,1.38l-7.05,1.15L679.76,416.66z M674.85,418.97l1.96-3.9l2.54,1.38L674.85,418.97z
				 M685.95,420.01l2.56,1.38l-7.07,1.15L685.95,420.01z M681.04,422.32l1.96-3.91l2.55,1.38L681.04,422.32z M692.17,423.38
				l2.56,1.39l-7.08,1.15L692.17,423.38z M687.24,425.69l1.95-3.92l2.56,1.39L687.24,425.69z M698.4,426.75l2.57,1.39l-7.09,1.15
				L698.4,426.75z M693.47,429.07l1.95-3.93l2.57,1.39L693.47,429.07z M704.65,430.13l2.58,1.4l-7.11,1.15L704.65,430.13z
				 M699.71,432.46l1.95-3.94l2.58,1.39L699.71,432.46z M707.37,431.84l-2.1,4.26l-5.57-3.02L707.37,431.84z M699,432.7l-5.55-3.01
				l7.66-1.24L699,432.7z M692.75,429.31l-5.54-3l7.65-1.24L692.75,429.31z M686.53,425.94l-5.52-3l7.63-1.24L686.53,425.94z
				 M680.32,422.57l-5.5-2.99l7.62-1.24L680.32,422.57z M674.14,419.21l-5.48-2.98l7.6-1.24L674.14,419.21z M667.97,415.87
				l-5.47-2.97l7.59-1.24L667.97,415.87z M661.82,412.53l-5.45-2.96l7.57-1.23L661.82,412.53z M655.7,409.2l-5.43-2.95l7.56-1.23
				L655.7,409.2z M649.59,405.89l-5.42-2.94l7.55-1.23L649.59,405.89z M643.5,402.58l-5.4-2.93l7.53-1.23L643.5,402.58z
				 M637.43,399.29l-5.38-2.92l7.52-1.23L637.43,399.29z M710.51,433.31l-4.53,2.55l1.95-3.95L710.51,433.31z"/>
									</g>
									<g>
										<g>
											<polygon className="navas72" points="749.86,495.85 758.52,500.63 762.85,498.17 766.69,495.98 758.02,491.21 				" />
											<polygon className="navas73" points="758.52,500.63 762.85,498.17 766.69,495.98 766.73,496.6 762.88,498.79 758.55,501.25 				" />
											<polygon className="navas71" points="758.52,500.63 753.93,498.1 749.86,495.85 749.89,496.47 753.96,498.71 758.55,501.25 				" />
										</g>
										<g>
											<path className="navas77" d="M752.08,495.87l6.01-3.41l-4.41-82.98l-5.86,3.3L752.08,495.87z M751.38,474.15l-0.15-2.87l4.74,0.27
					L751.38,474.15z M755.99,472.01l-4.44,5.47l-0.15-2.87L755.99,472.01z M751.02,467.19l-0.15-2.86l4.73,0.26L751.02,467.19z
					 M755.62,465.06l-4.43,5.45l-0.15-2.86L755.62,465.06z M750.66,460.27l-0.15-2.84l4.72,0.26L750.66,460.27z M755.25,458.14
					l-4.42,5.44l-0.15-2.85L755.25,458.14z M750.3,453.37l-0.15-2.83l4.71,0.25L750.3,453.37z M754.89,451.25l-4.41,5.42l-0.15-2.84
					L754.89,451.25z M749.95,446.5l-0.15-2.82l4.7,0.25L749.95,446.5z M754.53,444.38l-4.41,5.4l-0.15-2.83L754.53,444.38z
					 M749.6,439.66l-0.14-2.81l4.69,0.25L749.6,439.66z M754.16,437.54l-4.4,5.38l-0.15-2.82L754.16,437.54z M749.25,432.84
					l-0.14-2.8l4.68,0.24L749.25,432.84z M753.8,430.73l-4.39,5.36l-0.14-2.8L753.8,430.73z M748.9,426.05l-0.14-2.79l4.67,0.24
					L748.9,426.05z M753.44,423.95l-4.38,5.34l-0.14-2.79L753.44,423.95z M748.55,419.29l-0.14-2.78l4.66,0.23L748.55,419.29z
					 M753.09,417.19l-4.37,5.33l-0.14-2.78L753.09,417.19z M748.6,416.02l4.71-5.73l0.32,5.98L748.6,416.02z M753.67,417.02
					l0.32,6.01l-5.04-0.26L753.67,417.02z M754.03,423.78l0.32,6.03l-5.05-0.26L754.03,423.78z M754.39,430.56l0.32,6.06l-5.06-0.27
					L754.39,430.56z M754.75,437.37l0.32,6.08l-5.07-0.27L754.75,437.37z M755.11,444.21l0.32,6.1l-5.08-0.27L755.11,444.21z
					 M755.48,451.07l0.33,6.13l-5.09-0.28L755.48,451.07z M755.84,457.96l0.33,6.15l-5.1-0.28L755.84,457.96z M756.21,464.88
					l0.33,6.18l-5.11-0.29L756.21,464.88z M756.58,471.83l0.33,6.2l-5.12-0.29L756.58,471.83z M756.33,478.52l-4.6,2.61l-0.15-2.88
					L756.33,478.52z M752.27,491.49l-0.15-2.9l4.61-2.61L752.27,491.49z M757.32,485.81l0.33,6.25l-5.14-0.3L757.32,485.81z
					 M752.1,488.14l-0.15-2.89l4.75,0.28L752.1,488.14z M752.14,484.74l4.8-5.93l0.33,6.23L752.14,484.74z M751.91,484.47
					l-0.15-2.88l4.6-2.61L751.91,484.47z M748.22,413l4.51-2.54l-4.36,5.31L748.22,413z M752.46,495.18l-0.15-2.9l4.76,0.28
					L752.46,495.18z"/>
											<path className="navas79" d="M758.08,492.45l6.38,3.51l-4.57-83.19l-6.22-3.29L758.08,492.45z M757.37,471.22l-0.15-2.86l5.02,5.52
					L757.37,471.22z M762.26,474.33l-4.72,0.22l-0.15-2.87L762.26,474.33z M757,464.28l-0.15-2.85l5.01,5.49L757,464.28z
					 M761.88,467.37l-4.71,0.22l-0.15-2.86L761.88,467.37z M756.63,457.36l-0.15-2.84l5,5.46L756.63,457.36z M761.5,460.44
					l-4.7,0.22l-0.15-2.85L761.5,460.44z M756.26,450.47l-0.15-2.83l4.99,5.44L756.26,450.47z M761.13,453.53l-4.69,0.22l-0.15-2.84
					L761.13,453.53z M755.9,443.61l-0.15-2.82l4.98,5.42L755.9,443.61z M760.75,446.65l-4.68,0.23l-0.15-2.82L760.75,446.65z
					 M755.53,436.77l-0.15-2.81l4.97,5.39L755.53,436.77z M760.38,439.8l-4.67,0.23l-0.15-2.81L760.38,439.8z M755.17,429.96
					l-0.15-2.8l4.96,5.37L755.17,429.96z M760,432.98l-4.66,0.23l-0.15-2.8L760,432.98z M754.81,423.18l-0.15-2.79l4.95,5.34
					L754.81,423.18z M759.63,426.18l-4.65,0.23l-0.15-2.79L759.63,426.18z M754.45,416.42l-0.15-2.77l4.94,5.32L754.45,416.42z
					 M759.26,419.41l-4.64,0.23l-0.15-2.78L759.26,419.41z M754.51,413.4l5-0.26l0.33,6L754.51,413.4z M759.88,419.89l0.33,6.02
					l-5.34-5.77L759.88,419.89z M760.25,426.66l0.33,6.05l-5.36-5.79L760.25,426.66z M760.62,433.46l0.33,6.07l-5.37-5.82
					L760.62,433.46z M761,440.29l0.33,6.09l-5.38-5.85L761,440.29z M761.37,447.14l0.34,6.12l-5.39-5.87L761.37,447.14z
					 M761.75,454.02l0.34,6.14l-5.4-5.9L761.75,454.02z M762.13,460.93l0.34,6.17l-5.41-5.93L762.13,460.93z M762.51,467.86
					l0.34,6.19l-5.43-5.96L762.51,467.86z M762.89,474.83l0.34,6.22l-5.44-5.98L762.89,474.83z M762.62,480.86l-4.88-2.67
					l-0.15-2.88L762.62,480.86z M758.29,488.55l-0.15-2.89l4.89,2.68L758.29,488.55z M763.66,488.84l0.34,6.27l-5.46-6.04
					L763.66,488.84z M758.11,485.2l-0.15-2.89l5.05,5.57L758.11,485.2z M758.17,482.05l5.11-0.23l0.34,6.24L758.17,482.05z
					 M757.92,481.54l-0.15-2.88l4.88,2.67L757.92,481.54z M754.11,410.14l4.78,2.53l-4.63,0.24L754.11,410.14z M758.49,492.23
					l-0.15-2.9l5.06,5.59L758.49,492.23z"/>
											<path className="navas77" d="M758.45,499.38l6.01-3.42l-4.57-83.19l-5.87,3.31L758.45,499.38z M757.71,477.6l-0.15-2.87l4.75,0.27
					L757.71,477.6z M762.33,475.46l-4.44,5.48l-0.15-2.88L762.33,475.46z M757.34,470.63l-0.15-2.86l4.74,0.26L757.34,470.63z
					 M761.95,468.49l-4.43,5.47l-0.15-2.87L761.95,468.49z M756.97,463.69l-0.15-2.85l4.73,0.26L756.97,463.69z M761.57,461.56
					l-4.42,5.45l-0.15-2.86L761.57,461.56z M756.6,456.78l-0.15-2.84l4.72,0.26L756.6,456.78z M761.19,454.65l-4.41,5.43l-0.15-2.85
					L761.19,454.65z M756.23,449.89l-0.15-2.83l4.71,0.25L756.23,449.89z M760.81,447.76l-4.41,5.41l-0.15-2.83L760.81,447.76z
					 M755.86,443.03l-0.15-2.82l4.7,0.25L755.86,443.03z M760.44,440.91l-4.4,5.39l-0.15-2.82L760.44,440.91z M755.5,436.19
					l-0.15-2.81l4.69,0.24L755.5,436.19z M760.06,434.08l-4.39,5.37l-0.15-2.81L760.06,434.08z M755.14,429.39l-0.15-2.8l4.68,0.24
					L755.14,429.39z M759.69,427.28l-4.38,5.36l-0.15-2.8L759.69,427.28z M754.78,422.61l-0.15-2.78l4.67,0.24L754.78,422.61z
					 M759.32,420.5l-4.37,5.34l-0.15-2.79L759.32,420.5z M754.82,419.33l4.71-5.74l0.33,6L754.82,419.33z M759.9,420.33l0.33,6.02
					l-5.05-0.26L759.9,420.33z M760.28,427.11l0.33,6.05l-5.06-0.26L760.28,427.11z M760.65,433.91l0.33,6.07l-5.07-0.27
					L760.65,433.91z M761.02,440.73l0.33,6.09l-5.08-0.27L761.02,440.73z M761.4,447.59l0.34,6.12l-5.09-0.28L761.4,447.59z
					 M761.78,454.47l0.34,6.14l-5.1-0.28L761.78,454.47z M762.16,461.38l0.34,6.17l-5.11-0.29L762.16,461.38z M762.54,468.32
					l0.34,6.19l-5.12-0.29L762.54,468.32z M762.92,475.28l0.34,6.22l-5.13-0.3L762.92,475.28z M762.68,481.99l-4.6,2.61l-0.15-2.89
					L762.68,481.99z M758.63,495l-0.15-2.9l4.61-2.62L758.63,495z M763.69,489.3l0.34,6.27l-5.16-0.3L763.69,489.3z M758.46,491.63
					l-0.15-2.9l4.77,0.28L758.46,491.63z M758.5,488.22l4.8-5.94l0.34,6.24L758.5,488.22z M758.26,487.96l-0.15-2.89l4.6-2.61
					L758.26,487.96z M754.44,416.3l4.51-2.54l-4.36,5.32L754.44,416.3z M758.83,498.69l-0.16-2.91l4.78,0.28L758.83,498.69z"/>
											<path className="navas78" d="M752.08,495.87l6.37,3.51l-4.43-83.3l-6.22-3.3L752.08,495.87z M752.48,495.64l-0.15-2.9l5.05,5.6
					L752.48,495.64z M752.12,488.6l-0.15-2.89l5.04,5.57L752.12,488.6z M757.03,491.75l-4.74,0.21l-0.15-2.9L757.03,491.75z
					 M751.76,481.59l-0.15-2.88l5.02,5.55L751.76,481.59z M756.66,484.72l-4.73,0.21l-0.15-2.88L756.66,484.72z M751.4,474.61
					l-0.15-2.87l5.01,5.52L751.4,474.61z M756.29,477.72l-4.72,0.22l-0.15-2.87L756.29,477.72z M751.04,467.65l-0.15-2.86l5,5.5
					L751.04,467.65z M755.92,470.75l-4.71,0.22l-0.15-2.86L755.92,470.75z M750.68,460.72l-0.15-2.84l4.99,5.47L750.68,460.72z
					 M755.55,463.81l-4.7,0.22l-0.15-2.85L755.55,463.81z M750.33,453.82l-0.15-2.83l4.98,5.45L750.33,453.82z M755.19,456.89
					l-4.69,0.22l-0.15-2.84L755.19,456.89z M749.97,446.95l-0.15-2.82l4.97,5.42L749.97,446.95z M754.82,450.01l-4.68,0.22
					L750,447.4L754.82,450.01z M749.62,440.11l-0.14-2.81l4.96,5.4L749.62,440.11z M754.46,443.14l-4.67,0.23l-0.15-2.82
					L754.46,443.14z M749.27,433.29l-0.14-2.8l4.95,5.38L749.27,433.29z M754.1,436.31l-4.66,0.23l-0.14-2.81L754.1,436.31z
					 M748.92,426.5l-0.14-2.79l4.94,5.35L748.92,426.5z M753.74,429.51l-4.65,0.23l-0.14-2.79L753.74,429.51z M748.57,419.73
					l-0.14-2.78l4.93,5.33L748.57,419.73z M753.38,422.73l-4.64,0.23l-0.14-2.78L753.38,422.73z M748.63,416.7l5-0.25l0.32,6.01
					L748.63,416.7z M754,423.2l0.32,6.03l-5.33-5.78L754,423.2z M754.36,429.98l0.32,6.05l-5.35-5.8L754.36,429.98z M754.72,436.79
					l0.32,6.08l-5.36-5.83L754.72,436.79z M755.08,443.63l0.32,6.1l-5.37-5.86L755.08,443.63z M755.44,450.49l0.32,6.13l-5.38-5.88
					L755.44,450.49z M755.81,457.38l0.33,6.15l-5.39-5.91L755.81,457.38z M756.18,464.3l0.33,6.17l-5.4-5.94L756.18,464.3z
					 M756.54,471.24l0.33,6.2l-5.41-5.96L756.54,471.24z M756.91,478.22l0.33,6.22l-5.43-5.99L756.91,478.22z M757.29,485.22
					l0.33,6.25l-5.44-6.02L757.29,485.22z M757.66,492.25l0.33,6.28l-5.45-6.05L757.66,492.25z M748.25,413.44l4.78,2.54l-4.63,0.24
					L748.25,413.44z"/>
										</g>
									</g>
									<g>
										<g>
											<polygon className="navas72" points="706.45,520.51 715.05,525.35 719.4,522.88 723.27,520.68 714.66,515.85 				" />
											<polygon className="navas73" points="715.05,525.35 719.4,522.88 723.27,520.68 723.29,521.3 719.43,523.5 715.07,525.98 				" />
											<polygon className="navas71" points="715.05,525.35 710.49,522.79 706.45,520.51 706.48,521.13 710.52,523.41 715.07,525.98 				" />
										</g>
										<g>
											<path className="navas77" d="M708.67,520.53l6.04-3.43l-3.39-83.79l-5.9,3.32L708.67,520.53z M708.23,498.6l-0.11-2.9l4.73,0.28
					L708.23,498.6z M712.87,496.45l-4.5,5.52l-0.11-2.9L712.87,496.45z M707.96,491.58l-0.11-2.88l4.72,0.28L707.96,491.58z
					 M712.58,489.43l-4.49,5.5l-0.11-2.89L712.58,489.43z M707.69,484.59l-0.11-2.87l4.71,0.27L707.69,484.59z M712.3,482.44
					l-4.48,5.48l-0.11-2.88L712.3,482.44z M707.42,477.62l-0.11-2.86l4.7,0.27L707.42,477.62z M712.02,475.48l-4.48,5.46l-0.11-2.87
					L712.02,475.48z M707.15,470.68l-0.11-2.85l4.69,0.26L707.15,470.68z M711.74,468.55l-4.47,5.44l-0.11-2.85L711.74,468.55z
					 M706.88,463.77l-0.11-2.84l4.68,0.26L706.88,463.77z M711.47,461.65l-4.46,5.42l-0.11-2.84L711.47,461.65z M706.61,456.89
					l-0.11-2.83l4.67,0.26L706.61,456.89z M711.19,454.77l-4.45,5.4l-0.11-2.83L711.19,454.77z M706.35,450.03l-0.11-2.82l4.66,0.25
					L706.35,450.03z M710.91,447.92l-4.44,5.39l-0.11-2.82L710.91,447.92z M706.08,443.2l-0.11-2.8l4.65,0.25L706.08,443.2z
					 M710.64,441.1l-4.43,5.37l-0.11-2.81L710.64,441.1z M706.17,439.9l4.78-5.78l0.24,6.04L706.17,439.9z M711.22,440.92l0.25,6.07
					l-5.03-0.27L711.22,440.92z M711.5,447.75l0.25,6.09l-5.04-0.28L711.5,447.75z M711.78,454.6l0.25,6.11l-5.05-0.28L711.78,454.6
					z M712.05,461.47l0.25,6.14l-5.06-0.28L712.05,461.47z M712.33,468.38l0.25,6.16l-5.07-0.29L712.33,468.38z M712.61,475.31
					l0.25,6.19l-5.08-0.29L712.61,475.31z M712.89,482.27l0.25,6.21l-5.09-0.3L712.89,482.27z M713.17,489.26l0.25,6.24l-5.1-0.3
					L713.17,489.26z M713.46,496.27l0.25,6.26l-5.11-0.31L713.46,496.27z M713.13,503.03l-4.62,2.62l-0.11-2.91L713.13,503.03z
					 M708.92,516.12l-0.11-2.92l4.63-2.63L708.92,516.12z M714.03,510.39l0.26,6.31l-5.13-0.32L714.03,510.39z M708.78,512.73
					l-0.11-2.92l4.75,0.29L708.78,512.73z M708.87,509.29l4.87-5.98l0.25,6.29L708.87,509.29z M708.64,509.03l-0.11-2.91l4.62-2.62
					L708.64,509.03z M705.83,436.85l4.53-2.55l-4.42,5.35L705.83,436.85z M709.06,519.84l-0.11-2.93l4.75,0.29L709.06,519.84z"/>
											<path className="navas79" d="M714.71,517.1l6.33,3.56l-3.55-84.01l-6.17-3.34L714.71,517.1z M714.25,495.66l-0.12-2.89l4.95,5.58
					L714.25,495.66z M719.11,498.81l-4.72,0.21l-0.12-2.9L719.11,498.81z M713.97,488.65l-0.12-2.88l4.94,5.55L713.97,488.65z
					 M718.81,491.78l-4.71,0.21l-0.12-2.89L718.81,491.78z M713.69,481.66l-0.12-2.87l4.93,5.53L713.69,481.66z M718.52,484.78
					l-4.7,0.21l-0.12-2.87L718.52,484.78z M713.4,474.7l-0.12-2.86l4.92,5.5L713.4,474.7z M718.22,477.81l-4.69,0.21l-0.12-2.86
					L718.22,477.81z M713.12,467.77l-0.12-2.85l4.91,5.48L713.12,467.77z M717.93,470.86l-4.68,0.22l-0.12-2.85L717.93,470.86z
					 M712.84,460.87l-0.12-2.83l4.9,5.46L712.84,460.87z M717.64,463.94l-4.67,0.22l-0.12-2.84L717.64,463.94z M712.56,453.99
					l-0.11-2.82l4.89,5.43L712.56,453.99z M717.35,457.05l-4.66,0.22l-0.11-2.83L717.35,457.05z M712.28,447.15l-0.11-2.81
					l4.88,5.41L712.28,447.15z M717.07,450.19l-4.65,0.22l-0.11-2.82L717.07,450.19z M712.01,440.33l-0.11-2.8l4.87,5.38
					L712.01,440.33z M716.78,443.35l-4.64,0.23l-0.11-2.81L716.78,443.35z M712.1,437.27l5-0.25l0.26,6.06L712.1,437.27z
					 M717.39,443.84l0.26,6.08l-5.27-5.84L717.39,443.84z M717.68,450.67l0.26,6.1l-5.28-5.86L717.68,450.67z M717.97,457.54
					l0.26,6.13l-5.29-5.89L717.97,457.54z M718.26,464.43l0.26,6.15l-5.3-5.92L718.26,464.43z M718.55,471.35l0.26,6.18l-5.31-5.94
					L718.55,471.35z M718.84,478.3l0.26,6.2l-5.32-5.97L718.84,478.3z M719.14,485.28l0.26,6.23l-5.33-6L719.14,485.28z
					 M719.43,492.28l0.26,6.25l-5.35-6.03L719.43,492.28z M719.73,499.31l0.26,6.28l-5.36-6.05L719.73,499.31z M719.38,505.41
					l-4.84-2.7l-0.12-2.9L719.38,505.41z M714.96,513.16l-0.12-2.92l4.85,2.72L714.96,513.16z M720.32,513.46l0.27,6.33l-5.38-6.11
					L720.32,513.46z M714.83,509.77l-0.12-2.92l4.97,5.63L714.83,509.77z M714.92,506.59l5.1-0.22l0.27,6.3L714.92,506.59z
					 M714.68,506.08l-0.12-2.91l4.84,2.7L714.68,506.08z M711.75,433.98l4.74,2.57l-4.63,0.23L711.75,433.98z M715.11,516.87
					l-0.12-2.93l4.98,5.66L715.11,516.87z"/>
											<path className="navas77" d="M715,524.09l6.05-3.44l-3.55-84.01l-5.9,3.32L715,524.09z M714.52,502.11l-0.12-2.9l4.74,0.28
					L714.52,502.11z M719.15,499.95l-4.5,5.53l-0.12-2.91L719.15,499.95z M714.23,495.07l-0.12-2.89l4.73,0.28L714.23,495.07z
					 M718.86,492.91l-4.49,5.51l-0.12-2.9L718.86,492.91z M713.95,488.05l-0.12-2.88l4.72,0.27L713.95,488.05z M718.57,485.91
					l-4.48,5.49l-0.12-2.88L718.57,485.91z M713.66,481.07l-0.12-2.87l4.71,0.27L713.66,481.07z M718.27,478.93l-4.48,5.47
					l-0.12-2.87L718.27,478.93z M713.38,474.12l-0.12-2.86l4.7,0.27L713.38,474.12z M717.98,471.98l-4.47,5.45l-0.12-2.86
					L717.98,471.98z M713.1,467.19l-0.12-2.85l4.69,0.26L713.1,467.19z M717.69,465.06l-4.46,5.43l-0.12-2.85L717.69,465.06z
					 M712.82,460.29l-0.12-2.83l4.68,0.26L712.82,460.29z M717.4,458.16l-4.45,5.42l-0.12-2.84L717.4,458.16z M712.54,453.41
					l-0.11-2.82l4.67,0.25L712.54,453.41z M717.11,451.3l-4.44,5.4l-0.11-2.83L717.11,451.3z M712.26,446.57l-0.11-2.81l4.66,0.25
					L712.26,446.57z M716.83,444.46l-4.43,5.38l-0.11-2.82L716.83,444.46z M712.35,443.26l4.78-5.79l0.26,6.06L712.35,443.26z
					 M717.41,444.28l0.26,6.08l-5.04-0.27L717.41,444.28z M717.7,451.12l0.26,6.11l-5.05-0.28L717.7,451.12z M717.99,457.99
					l0.26,6.13l-5.06-0.28L717.99,457.99z M718.28,464.89l0.26,6.15l-5.07-0.29L718.28,464.89z M718.57,471.81l0.26,6.18l-5.08-0.29
					L718.57,471.81z M718.86,478.76l0.26,6.2l-5.09-0.3L718.86,478.76z M719.16,485.74l0.26,6.23l-5.1-0.3L719.16,485.74z
					 M719.45,492.74l0.26,6.25l-5.11-0.31L719.45,492.74z M719.75,499.78l0.26,6.28l-5.12-0.31L719.75,499.78z M719.43,506.55
					l-4.63,2.63l-0.12-2.91L719.43,506.55z M715.23,519.67l-0.12-2.93l4.64-2.63L715.23,519.67z M720.34,513.93l0.27,6.33
					l-5.15-0.32L720.34,513.93z M715.09,516.27l-0.12-2.93l4.76,0.29L715.09,516.27z M715.18,512.83l4.87-5.99l0.27,6.3
					L715.18,512.83z M714.94,512.56l-0.12-2.92l4.63-2.63L714.94,512.56z M712,440.2l4.54-2.56l-4.42,5.36L712,440.2z M715.38,523.4
					l-0.12-2.94l4.77,0.3L715.38,523.4z"/>
											<path className="navas78" d="M708.67,520.53l6.32,3.56l-3.41-84.12l-6.17-3.35L708.67,520.53z M709.08,520.3l-0.11-2.93l4.97,5.67
					L709.08,520.3z M708.8,513.19l-0.11-2.92l4.96,5.64L708.8,513.19z M713.67,516.38l-4.73,0.2l-0.11-2.92L713.67,516.38z
					 M708.52,506.11l-0.11-2.91l4.95,5.62L708.52,506.11z M713.38,509.29l-4.72,0.2l-0.11-2.91L713.38,509.29z M708.25,499.06
					l-0.11-2.9l4.94,5.59L708.25,499.06z M713.1,502.22l-4.71,0.21l-0.11-2.9L713.1,502.22z M707.98,492.04l-0.11-2.88l4.93,5.56
					L707.98,492.04z M712.81,495.18l-4.71,0.21L708,492.5L712.81,495.18z M707.71,485.04l-0.11-2.87l4.92,5.54L707.71,485.04z
					 M712.53,488.17l-4.7,0.21l-0.11-2.88L712.53,488.17z M707.44,478.08l-0.11-2.86l4.91,5.51L707.44,478.08z M712.25,481.19
					l-4.69,0.21l-0.11-2.87L712.25,481.19z M707.17,471.14l-0.11-2.85l4.9,5.49L707.17,471.14z M711.97,474.23l-4.68,0.22
					l-0.11-2.86L711.97,474.23z M706.9,464.22l-0.11-2.84l4.89,5.46L706.9,464.22z M711.69,467.3l-4.67,0.22l-0.11-2.84
					L711.69,467.3z M706.63,457.34l-0.11-2.83l4.88,5.44L706.63,457.34z M711.42,460.4l-4.66,0.22l-0.11-2.83L711.42,460.4z
					 M706.36,450.48l-0.11-2.82l4.87,5.41L706.36,450.48z M711.14,453.53l-4.65,0.22l-0.11-2.82L711.14,453.53z M706.1,443.65
					l-0.11-2.81l4.86,5.39L706.1,443.65z M710.86,446.69l-4.64,0.22l-0.11-2.81L710.86,446.69z M706.2,440.59l5-0.24l0.24,6.06
					L706.2,440.59z M711.47,447.17l0.25,6.09l-5.26-5.85L711.47,447.17z M711.75,454.02l0.25,6.11l-5.27-5.87L711.75,454.02z
					 M712.03,460.89l0.25,6.14l-5.28-5.9L712.03,460.89z M712.31,467.79l0.25,6.16l-5.29-5.93L712.31,467.79z M712.59,474.72
					l0.25,6.19l-5.3-5.95L712.59,474.72z M712.87,481.68l0.25,6.21l-5.31-5.98L712.87,481.68z M713.15,488.67l0.25,6.24l-5.32-6.01
					L713.15,488.67z M713.43,495.68l0.25,6.26l-5.33-6.04L713.43,495.68z M713.72,502.72l0.25,6.29l-5.35-6.06L713.72,502.72z
					 M714,509.79l0.25,6.31l-5.36-6.09L714,509.79z M714.29,516.89l0.26,6.34l-5.37-6.12L714.29,516.89z M705.85,437.29l4.74,2.57
					l-4.63,0.23L705.85,437.29z"/>
										</g>
									</g>
									<g>
										<g>
											<polygon className="navas78" points="755.34,500.69 755.8,500.94 750.8,493.18 750.34,492.93 				" />
											<polygon className="navas77" points="756.23,500.7 755.8,500.94 750.8,493.18 751.23,492.93 				" />
											<polygon className="navas169" points="750.34,492.93 750.77,492.68 751.23,492.93 750.8,493.18 				" />
										</g>
										<g>
											<polygon className="navas169" points="746.63,504.29 749.38,505.82 751.59,504.56 757.16,501.38 754.41,499.86 				" />
											<polygon className="navas77" points="749.38,505.82 751.59,504.56 757.16,501.38 757.18,501.7 751.61,504.88 749.39,506.13 				" />
											<polygon className="navas78" points="749.38,505.82 747.04,504.52 746.63,504.29 746.65,504.61 747.05,504.84 749.39,506.13 				" />
										</g>
										<g>
											<polygon className="navas78" points="750.34,492.93 750.8,493.18 745.82,485.46 745.36,485.21 				" />
											<polygon className="navas77" points="751.23,492.93 750.8,493.18 745.82,485.46 746.25,485.21 				" />
											<polygon className="navas169" points="745.36,485.21 745.79,484.96 746.25,485.21 745.82,485.46 				" />
										</g>
										<g>
											<polygon className="navas169" points="736.71,489.11 739.44,490.61 741.64,489.37 747.19,486.21 744.46,484.71 				" />
											<polygon className="navas77" points="739.44,490.61 741.64,489.37 747.19,486.21 747.2,486.53 741.66,489.68 739.45,490.93 				" />
											<polygon className="navas78" points="739.44,490.61 737.12,489.33 736.71,489.11 736.73,489.42 737.13,489.65 739.45,490.93 				" />
										</g>
										<g>
											<polygon className="navas169" points="744.58,501.24 747.33,502.76 749.54,501.51 755.1,498.34 752.36,496.82 				" />
											<polygon className="navas77" points="747.33,502.76 749.54,501.51 755.1,498.34 755.12,498.65 749.55,501.82 747.34,503.08 				" />
											<polygon className="navas78" points="747.33,502.76 744.99,501.47 744.58,501.24 744.6,501.56 745.01,501.79 747.34,503.08 				" />
										</g>
										<g>
											<polygon className="navas169" points="742.62,498.2 745.36,499.72 747.57,498.46 753.13,495.3 750.39,493.78 				" />
											<polygon className="navas77" points="745.36,499.72 747.57,498.46 753.13,495.3 753.15,495.61 747.59,498.78 745.38,500.03 				" />
											<polygon className="navas78" points="745.36,499.72 743.03,498.43 742.62,498.2 742.64,498.51 743.05,498.74 745.38,500.03 				" />
										</g>
										<g>
											<polygon className="navas169" points="740.68,495.16 743.41,496.68 745.62,495.42 751.17,492.26 748.44,490.75 				" />
											<polygon className="navas77" points="743.41,496.68 745.62,495.42 751.17,492.26 751.19,492.58 745.63,495.74 743.43,496.99 				" />
											<polygon className="navas78" points="743.41,496.68 741.08,495.39 740.68,495.16 740.69,495.48 741.1,495.7 743.43,496.99 				" />
										</g>
										<g>
											<polygon className="navas169" points="738.73,492.13 741.46,493.64 743.66,492.39 749.22,489.23 746.48,487.73 				" />
											<polygon className="navas77" points="741.46,493.64 743.66,492.39 749.22,489.23 749.23,489.55 743.68,492.71 741.48,493.96 				" />
											<polygon className="navas78" points="741.46,493.64 739.13,492.36 738.73,492.13 738.75,492.44 739.15,492.67 741.48,493.96 				" />
										</g>
										<g>
											<polygon className="navas78" points="747.13,505.37 747.59,505.62 742.6,497.84 742.15,497.59 				" />
											<polygon className="navas77" points="748.02,505.38 747.59,505.62 742.6,497.84 743.03,497.6 				" />
											<polygon className="navas169" points="742.15,497.59 742.58,497.34 743.03,497.6 742.6,497.84 				" />
										</g>
										<g>
											<polygon className="navas78" points="742.15,497.59 742.6,497.84 737.64,490.1 737.19,489.85 				" />
											<polygon className="navas77" points="743.03,497.6 742.6,497.84 737.64,490.1 738.07,489.86 				" />
											<polygon className="navas169" points="737.19,489.85 737.62,489.61 738.07,489.86 737.64,490.1 				" />
										</g>
									</g>
									<g>
										<g>
											<g>
												<polygon className="navas72" points="703.44,508.32 716.88,515.88 726.88,510.19 713.42,502.65 					" />
											</g>
											<g>
												<polygon className="navas73" points="717.72,536.85 727.76,531.13 726.88,510.19 716.88,515.88 					" />
												<polygon className="navas71" points="718.75,520.04 725.43,516.24 725.36,514.61 718.69,518.4 					" />
											</g>
											<g>
												<polygon className="navas71" points="704.22,529.21 717.72,536.85 716.88,515.88 703.44,508.32 					" />
												<g>
													<path className="navas72" d="M706.7,515.59c0.08,2.24,1.8,4.99,3.82,6.13c2.03,1.14,3.6,0.25,3.52-2c-0.09-2.25-1.8-4.99-3.83-6.13
							C708.19,512.45,706.61,513.35,706.7,515.59z"/>
													<path className="navas168" d="M706.92,515.71c0.08,2.11,1.69,4.69,3.6,5.77c1.91,1.08,3.39,0.23,3.31-1.88
							c-0.08-2.11-1.7-4.69-3.6-5.76C708.32,512.76,706.84,513.6,706.92,515.71z"/>
													<path className="navas73" d="M709.15,516.96c0.03,0.75,0.6,1.66,1.27,2.04c0.67,0.38,1.2,0.08,1.17-0.66
							c-0.03-0.75-0.6-1.66-1.27-2.04C709.64,515.92,709.12,516.22,709.15,516.96z"/>
													<path className="navas71" d="M709.34,517.07c0.02,0.63,0.51,1.4,1.07,1.72c0.57,0.32,1.01,0.07,0.99-0.56
							c-0.02-0.63-0.51-1.4-1.08-1.72C709.75,516.19,709.31,516.44,709.34,517.07z"/>
												</g>
												<g>
													<path className="navas72" d="M707.06,525.12c0.09,2.25,1.8,5.01,3.83,6.16c2.03,1.15,3.61,0.25,3.52-2
							c-0.09-2.25-1.81-5.01-3.84-6.15C708.55,521.98,706.98,522.87,707.06,525.12z"/>
													<path className="navas168" d="M707.28,525.25c0.08,2.12,1.69,4.71,3.6,5.79c1.91,1.08,3.4,0.24,3.31-1.88
							c-0.08-2.12-1.7-4.71-3.61-5.79C708.68,522.29,707.2,523.13,707.28,525.25z"/>
													<path className="navas73" d="M709.51,526.51c0.03,0.75,0.6,1.67,1.28,2.05c0.68,0.38,1.2,0.08,1.17-0.67
							c-0.03-0.75-0.6-1.67-1.28-2.05C710.01,525.46,709.48,525.76,709.51,526.51z"/>
													<path className="navas71" d="M709.7,526.62c0.02,0.63,0.51,1.41,1.08,1.73c0.57,0.32,1.01,0.07,0.99-0.56
							c-0.02-0.63-0.51-1.41-1.08-1.73C710.12,525.73,709.68,525.98,709.7,526.62z"/>
													<path className="navas72" d="M705.04,519.43c0.03,0.75,0.6,1.66,1.27,2.04c0.67,0.38,1.2,0.08,1.17-0.66
							c-0.03-0.75-0.6-1.66-1.27-2.04C705.54,518.38,705.02,518.68,705.04,519.43z"/>
													<path className="navas73" d="M705.23,519.53c0.02,0.63,0.5,1.4,1.07,1.72c0.57,0.32,1.01,0.07,0.99-0.56
							c-0.02-0.63-0.5-1.4-1.07-1.72C705.65,518.65,705.21,518.9,705.23,519.53z"/>
													<path className="navas72" d="M713.86,524.4c0.03,0.75,0.6,1.67,1.28,2.05c0.68,0.38,1.2,0.08,1.17-0.67
							c-0.03-0.75-0.6-1.67-1.28-2.05C714.35,523.35,713.83,523.65,713.86,524.4z"/>
													<path className="navas73" d="M714.05,524.5c0.02,0.63,0.51,1.41,1.08,1.73c0.57,0.32,1.01,0.07,0.99-0.56
							c-0.03-0.63-0.51-1.41-1.08-1.73C714.46,523.62,714.02,523.87,714.05,524.5z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="716.88,515.88 716.93,516.96 716.05,515.41 					" />
												<polygon className="navas77" points="716.88,515.88 716.93,516.96 717.67,515.43 					" />
												<polygon className="navas169" points="716.05,515.41 717.67,515.43 716.88,515.88 					" />
												<polygon className="navas77" points="726.88,510.19 726.94,511.48 726.3,510.52 					" />
												<polygon className="navas77" points="717.72,536.85 717.67,535.64 718.52,536.4 					" />
												<polygon className="navas77" points="727.76,531.13 727.18,531.46 727.71,529.92 					" />
												<polygon className="navas78" points="704.22,529.21 704.17,528 704.9,529.59 					" />
												<polygon className="navas78" points="717.67,535.64 717.72,536.85 716.99,536.47 					" />
												<polygon className="navas78" points="703.44,508.32 704.24,508.79 703.49,509.75 					" />
												<polygon className="navas169" points="726.3,510.52 725.91,509.65 726.88,510.19 					" />
												<polygon className="navas169" points="704.24,508.79 704.2,507.88 703.44,508.32 					" />
												<polygon className="navas169" points="713.42,502.65 714.21,503.1 712.66,503.08 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="702.66,487.4 716.04,494.88 726,489.23 712.6,481.77 					" />
											</g>
											<g>
												<polygon className="navas73" points="716.87,515.67 726.87,509.99 726,489.23 716.04,494.88 					" />
												<polygon className="navas71" points="717.9,499.01 724.56,495.23 724.49,493.61 717.84,497.38 					" />
											</g>
											<g>
												<polygon className="navas71" points="703.43,508.11 716.87,515.67 716.04,494.88 702.66,487.4 					" />
												<g>
													<path className="navas72" d="M705.9,494.61c0.08,2.22,1.79,4.94,3.81,6.07c2.02,1.13,3.59,0.24,3.5-1.99
							c-0.09-2.23-1.79-4.94-3.81-6.07C707.38,491.5,705.82,492.38,705.9,494.61z"/>
													<path className="navas168" d="M706.12,494.73c0.08,2.09,1.68,4.65,3.58,5.71c1.9,1.06,3.37,0.23,3.29-1.87
							c-0.08-2.09-1.69-4.65-3.58-5.71C707.51,491.8,706.04,492.64,706.12,494.73z"/>
													<path className="navas73" d="M708.34,495.97c0.03,0.74,0.6,1.64,1.27,2.02c0.67,0.38,1.19,0.08,1.16-0.66
							c-0.03-0.74-0.6-1.64-1.27-2.02C708.83,494.93,708.31,495.23,708.34,495.97z"/>
													<path className="navas71" d="M708.53,496.07c0.02,0.62,0.5,1.39,1.07,1.71c0.57,0.32,1.01,0.07,0.98-0.56
							c-0.02-0.62-0.5-1.39-1.07-1.71C708.94,495.2,708.51,495.45,708.53,496.07z"/>
												</g>
												<g>
													<path className="navas72" d="M706.26,504.06c0.08,2.23,1.79,4.96,3.81,6.1c2.02,1.14,3.6,0.25,3.51-1.99
							c-0.09-2.23-1.8-4.96-3.82-6.1C707.75,500.94,706.18,501.83,706.26,504.06z"/>
													<path className="navas168" d="M706.48,504.18c0.08,2.1,1.69,4.67,3.59,5.74c1.9,1.07,3.38,0.23,3.3-1.87
							c-0.08-2.1-1.69-4.67-3.59-5.73C707.87,501.25,706.4,502.09,706.48,504.18z"/>
													<path className="navas73" d="M708.7,505.43c0.03,0.74,0.6,1.65,1.27,2.03c0.67,0.38,1.2,0.08,1.17-0.66
							c-0.03-0.74-0.6-1.65-1.27-2.03C709.2,504.39,708.67,504.69,708.7,505.43z"/>
													<path className="navas71" d="M708.89,505.54c0.02,0.63,0.5,1.39,1.07,1.71c0.57,0.32,1.01,0.07,0.98-0.56
							c-0.02-0.63-0.5-1.39-1.07-1.71C709.31,504.66,708.87,504.91,708.89,505.54z"/>
													<path className="navas72" d="M704.26,498.41c0.03,0.74,0.59,1.65,1.27,2.02c0.67,0.38,1.19,0.08,1.16-0.66
							c-0.03-0.74-0.6-1.65-1.27-2.02C704.75,497.38,704.23,497.67,704.26,498.41z"/>
													<path className="navas73" d="M704.45,498.52c0.02,0.63,0.5,1.39,1.07,1.71c0.57,0.32,1.01,0.07,0.98-0.56
							c-0.02-0.63-0.5-1.39-1.07-1.71C704.86,497.65,704.42,497.9,704.45,498.52z"/>
													<path className="navas72" d="M713.03,503.33c0.03,0.74,0.6,1.65,1.27,2.03c0.67,0.38,1.2,0.08,1.17-0.66
							c-0.03-0.74-0.6-1.65-1.27-2.03C713.52,502.29,713,502.59,713.03,503.33z"/>
													<path className="navas73" d="M713.22,503.44c0.02,0.63,0.51,1.39,1.07,1.71c0.57,0.32,1.01,0.07,0.98-0.56
							c-0.02-0.63-0.51-1.39-1.07-1.71C713.63,502.56,713.19,502.81,713.22,503.44z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="716.04,494.88 716.09,495.95 715.22,494.42 					" />
												<polygon className="navas77" points="716.04,494.88 716.09,495.95 716.83,494.43 					" />
												<polygon className="navas169" points="715.22,494.42 716.83,494.43 716.04,494.88 					" />
												<polygon className="navas77" points="726,489.23 726.05,490.51 725.42,489.56 					" />
												<polygon className="navas77" points="716.87,515.67 716.83,514.47 717.67,515.22 					" />
												<polygon className="navas77" points="726.87,509.99 726.29,510.32 726.82,508.78 					" />
												<polygon className="navas78" points="703.43,508.11 703.39,506.92 704.23,508.58 					" />
												<polygon className="navas78" points="716.83,514.47 716.87,515.67 716.05,515.2 					" />
												<polygon className="navas78" points="702.66,487.4 703.45,487.87 702.71,488.82 					" />
												<polygon className="navas169" points="725.42,489.56 725.03,488.69 726,489.23 					" />
												<polygon className="navas169" points="703.45,487.87 703.42,486.97 702.66,487.4 					" />
												<polygon className="navas169" points="712.6,481.77 713.39,482.21 711.84,482.2 					" />
											</g>
										</g>
									</g>
									<g>
										<g>
											<g>
												<polygon className="navas72" points="608.33,453.33 621.16,460.55 630.99,455.03 618.14,447.83 					" />
											</g>
											<g>
												<polygon className="navas73" points="621.45,480.73 631.32,475.18 630.99,455.03 621.16,460.55 					" />
												<polygon className="navas71" points="622.87,464.55 629.43,460.86 629.41,459.28 622.84,462.97 					" />
											</g>
											<g>
												<polygon className="navas71" points="608.56,473.44 621.45,480.73 621.16,460.55 608.33,453.33 					" />
												<g>
													<path className="navas72" d="M611.31,460.32c0.03,2.16,1.61,4.79,3.55,5.88c1.94,1.09,3.48,0.22,3.45-1.94
							c-0.03-2.16-1.62-4.79-3.55-5.88C612.83,457.29,611.28,458.16,611.31,460.32z"/>
													<path className="navas168" d="M611.52,460.43c0.02,2.03,1.52,4.51,3.34,5.53c1.82,1.03,3.28,0.21,3.25-1.82
							c-0.03-2.03-1.52-4.51-3.34-5.53C612.94,457.59,611.49,458.41,611.52,460.43z"/>
													<path className="navas73" d="M613.64,461.63c0.01,0.72,0.54,1.6,1.18,1.96c0.64,0.36,1.16,0.07,1.15-0.65
							c-0.01-0.72-0.54-1.6-1.18-1.96C614.15,460.62,613.63,460.91,613.64,461.63z"/>
													<path className="navas71" d="M613.82,461.73c0.01,0.61,0.45,1.35,1,1.65c0.54,0.31,0.98,0.06,0.97-0.54c-0.01-0.61-0.45-1.35-1-1.65
							C614.25,460.88,613.82,461.13,613.82,461.73z"/>
												</g>
												<g>
													<path className="navas72" d="M611.42,469.5c0.03,2.17,1.62,4.81,3.56,5.91c1.94,1.1,3.49,0.23,3.46-1.95
							c-0.03-2.17-1.62-4.81-3.56-5.91C612.94,466.46,611.39,467.33,611.42,469.5z"/>
													<path className="navas168" d="M611.63,469.61c0.02,2.04,1.52,4.53,3.35,5.56c1.82,1.03,3.28,0.21,3.25-1.83
							c-0.03-2.04-1.53-4.53-3.35-5.55C613.06,466.76,611.6,467.58,611.63,469.61z"/>
													<path className="navas73" d="M613.76,470.82c0.01,0.72,0.54,1.6,1.18,1.97c0.65,0.36,1.16,0.07,1.15-0.65
							c-0.01-0.72-0.54-1.6-1.18-1.97C614.26,469.81,613.75,470.1,613.76,470.82z"/>
													<path className="navas71" d="M613.94,470.92c0.01,0.61,0.46,1.35,1,1.66c0.54,0.31,0.98,0.06,0.97-0.55c-0.01-0.61-0.46-1.35-1-1.66
							C614.37,470.07,613.93,470.31,613.94,470.92z"/>
													<path className="navas72" d="M609.61,464.02c0.01,0.72,0.54,1.6,1.18,1.96c0.64,0.36,1.16,0.07,1.15-0.65
							c-0.01-0.72-0.54-1.6-1.18-1.96C610.11,463.01,609.6,463.3,609.61,464.02z"/>
													<path className="navas73" d="M609.79,464.12c0.01,0.61,0.45,1.35,1,1.65c0.54,0.31,0.98,0.06,0.97-0.54c-0.01-0.61-0.45-1.35-1-1.65
							C610.22,463.27,609.78,463.52,609.79,464.12z"/>
													<path className="navas72" d="M618.02,468.76c0.01,0.72,0.54,1.6,1.19,1.96c0.65,0.36,1.16,0.07,1.15-0.65
							c-0.01-0.72-0.54-1.6-1.19-1.96C618.52,467.75,618.01,468.04,618.02,468.76z"/>
													<path className="navas73" d="M618.2,468.87c0.01,0.61,0.46,1.35,1,1.66c0.55,0.31,0.98,0.06,0.97-0.55c-0.01-0.61-0.46-1.35-1-1.66
							C618.63,468.01,618.19,468.26,618.2,468.87z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="621.16,460.55 621.18,461.59 620.37,460.1 					" />
												<polygon className="navas77" points="621.16,460.55 621.18,461.59 621.94,460.11 					" />
												<polygon className="navas169" points="620.37,460.1 621.94,460.11 621.16,460.55 					" />
												<polygon className="navas77" points="630.99,455.03 631.01,456.27 630.42,455.35 					" />
												<polygon className="navas77" points="621.45,480.73 621.43,479.56 622.23,480.29 					" />
												<polygon className="navas77" points="631.32,475.18 630.74,475.5 631.3,474.01 					" />
												<polygon className="navas78" points="608.56,473.44 608.55,472.28 609.21,473.81 					" />
												<polygon className="navas78" points="621.43,479.56 621.45,480.73 620.75,480.37 					" />
												<polygon className="navas78" points="608.33,453.33 609.09,453.78 608.35,454.71 					" />
												<polygon className="navas169" points="630.42,455.35 630.06,454.51 630.99,455.03 					" />
												<polygon className="navas169" points="609.09,453.78 609.08,452.91 608.33,453.33 					" />
												<polygon className="navas169" points="618.14,447.83 618.9,448.25 617.4,448.25 					" />
											</g>
										</g>
										<g>
											<g>
												<polygon className="navas72" points="608.1,433.2 620.88,440.33 630.66,434.85 617.87,427.73 					" />
											</g>
											<g>
												<polygon className="navas73" points="621.16,460.35 630.99,454.83 630.66,434.85 620.88,440.33 					" />
												<polygon className="navas71" points="622.57,444.3 629.11,440.63 629.09,439.07 622.55,442.73 					" />
											</g>
											<g>
												<polygon className="navas71" points="608.33,453.13 621.16,460.35 620.88,440.33 608.1,433.2 					" />
												<g>
													<path className="navas72" d="M611.06,440.12c0.03,2.14,1.61,4.75,3.53,5.83c1.93,1.08,3.47,0.22,3.44-1.93
							c-0.03-2.14-1.61-4.75-3.54-5.83C612.58,437.12,611.04,437.98,611.06,440.12z"/>
													<path className="navas168" d="M611.27,440.23c0.02,2.01,1.51,4.47,3.32,5.48c1.81,1.02,3.26,0.2,3.23-1.81
							c-0.03-2.02-1.52-4.47-3.33-5.48C612.69,437.41,611.25,438.22,611.27,440.23z"/>
													<path className="navas73" d="M613.39,441.42c0.01,0.71,0.54,1.58,1.18,1.94c0.64,0.36,1.15,0.07,1.14-0.64
							c-0.01-0.71-0.54-1.58-1.18-1.94C613.89,440.42,613.38,440.71,613.39,441.42z"/>
													<path className="navas71" d="M613.57,441.52c0.01,0.6,0.45,1.33,0.99,1.64c0.54,0.3,0.97,0.06,0.97-0.54
							c-0.01-0.6-0.45-1.33-0.99-1.64C613.99,440.68,613.56,440.92,613.57,441.52z"/>
												</g>
												<g>
													<path className="navas72" d="M611.17,449.22c0.03,2.15,1.61,4.77,3.54,5.85c1.93,1.09,3.48,0.22,3.45-1.93
							c-0.03-2.15-1.62-4.77-3.55-5.85C612.69,446.21,611.15,447.07,611.17,449.22z"/>
													<path className="navas168" d="M611.38,449.34c0.02,2.02,1.52,4.49,3.33,5.51c1.82,1.02,3.27,0.21,3.24-1.82
							c-0.03-2.02-1.52-4.49-3.33-5.5C612.81,446.51,611.36,447.32,611.38,449.34z"/>
													<path className="navas73" d="M613.5,450.53c0.01,0.72,0.54,1.59,1.18,1.95c0.64,0.36,1.16,0.07,1.15-0.64
							c-0.01-0.72-0.54-1.59-1.18-1.95C614.01,449.52,613.49,449.81,613.5,450.53z"/>
													<path className="navas71" d="M613.68,450.63c0.01,0.6,0.45,1.34,1,1.64c0.54,0.3,0.98,0.06,0.97-0.54c-0.01-0.6-0.45-1.34-1-1.64
							C614.11,449.78,613.68,450.03,613.68,450.63z"/>
													<path className="navas72" d="M609.37,443.79c0.01,0.71,0.53,1.58,1.17,1.94c0.64,0.36,1.15,0.07,1.14-0.64
							c-0.01-0.71-0.53-1.58-1.18-1.94C609.88,442.79,609.36,443.08,609.37,443.79z"/>
													<path className="navas73" d="M609.55,443.89c0.01,0.6,0.45,1.34,0.99,1.64c0.54,0.3,0.97,0.06,0.97-0.54
							c-0.01-0.6-0.45-1.34-0.99-1.64C609.98,443.05,609.55,443.29,609.55,443.89z"/>
													<path className="navas72" d="M617.75,448.49c0.01,0.71,0.54,1.59,1.18,1.95c0.64,0.36,1.16,0.07,1.15-0.64
							c-0.01-0.72-0.54-1.59-1.18-1.95C618.25,447.48,617.74,447.77,617.75,448.49z"/>
													<path className="navas73" d="M617.93,448.59c0.01,0.6,0.45,1.34,1,1.64c0.54,0.3,0.98,0.06,0.97-0.54c-0.01-0.6-0.46-1.34-1-1.64
							C618.35,447.74,617.92,447.98,617.93,448.59z"/>
												</g>
											</g>
											<g>
												<polygon className="navas78" points="620.88,440.33 620.89,441.37 620.09,439.89 					" />
												<polygon className="navas77" points="620.88,440.33 620.89,441.37 621.65,439.9 					" />
												<polygon className="navas169" points="620.09,439.89 621.65,439.9 620.88,440.33 					" />
												<polygon className="navas77" points="630.66,434.85 630.68,436.08 630.09,435.17 					" />
												<polygon className="navas77" points="621.16,460.35 621.14,459.19 621.94,459.91 					" />
												<polygon className="navas77" points="630.99,454.83 630.42,455.15 630.97,453.67 					" />
												<polygon className="navas78" points="608.33,453.13 608.32,451.98 609.09,453.58 					" />
												<polygon className="navas78" points="621.14,459.19 621.16,460.35 620.37,459.9 					" />
												<polygon className="navas78" points="608.1,433.2 608.86,433.64 608.12,434.56 					" />
												<polygon className="navas169" points="630.09,435.17 629.74,434.33 630.66,434.85 					" />
												<polygon className="navas169" points="608.86,433.64 608.85,432.78 608.1,433.2 					" />
												<polygon className="navas169" points="617.87,427.73 618.62,428.15 617.13,428.14 					" />
											</g>
										</g>
									</g>
								</g>
								<g>
									<g>
										<polygon className="navas88" points="681.62,441.43 681.53,440.99 681.89,440.78 682.22,440.81 682.32,441.17 682.18,441.41 			" />
										<path className="navas173" d="M684.07,441.03c-0.62,0.26-1.64,2.23-1.64,2.23l-0.24-1.85l-0.58,0.1c0,0-0.18,2.24,0.21,2.7
				c0.39,0.46,2.58-0.84,2.58-0.84l-0.36-2.26L684.07,441.03z"/>
										<path className="navas71" d="M682.23,454.21c0.03-0.17,0.27-0.4,0.49-0.59c0.47-0.4,0.98-0.38,1.09-0.37c0.12-0.03,0.21-0.04,0.21-0.04
				c0.06,0.14,0.13,0.31,0.1,0.46c0.03,0.03,0.04,0.08,0.01,0.13c-0.13,0.33-0.63,0.36-0.76,0.38c-0.13,0.03-0.19,0.09-0.37,0.2
				c-0.18,0.1-0.43,0.12-0.58,0.1c-0.15-0.02-0.19-0.14-0.19-0.18l0,0C682.22,454.27,682.22,454.24,682.23,454.21z"/>
										<path className="navas71" d="M688.53,453.18c-0.1-0.57,0.14-0.95,0.19-1.03c0.03-0.12,0.06-0.19,0.06-0.19
				c0.15,0.02,0.33,0.06,0.46,0.16c0.04,0,0.09,0.01,0.13,0.06c0.23,0.28,0.02,0.71-0.02,0.84c-0.04,0.12-0.01,0.21,0,0.42
				c0.01,0.2-0.09,0.43-0.19,0.54c-0.09,0.11-0.22,0.08-0.25,0.06v0c-0.03-0.01-0.05-0.02-0.07-0.04c-0.14-0.12-0.23-0.44-0.3-0.73
				c0,0,0,0,0,0C688.54,453.23,688.53,453.21,688.53,453.18z"/>
										<path className="navas422" d="M683.25,445.74l1.6,0.87c0,0-1.25,2.48-1.52,3.11c0,0.07,0.7,3.28,0.7,3.28c0.05,0.65-1.07,0.61-1.09,0.39
				l-1.08-3.31c-0.12-0.36-0.12-0.75-0.01-1.1l0.83-3.21L683.25,445.74z"/>
										<path className="navas94" d="M684.91,446.45l0.94,0.13c0,0,0.48,2.23,0.96,3.42c0.03,0.08,2.23,2.08,2.23,2.08
				c0.24,0.37,0.03,0.8-0.49,0.81l-3.11-2.08c-0.21-0.14-0.38-0.34-0.48-0.57l-1.72-4.01L684.91,446.45z"/>
										<path className="navas88" d="M684.76,440.65c-0.01,0.18-0.03,0.35-0.04,0.47c-0.18,0.03-0.28,0.18-0.28,0.18s-0.53,0.67-0.28,0.8
				c0.32,0.18,1.55-0.09,1.49-0.22c-0.07-0.14,0.09-0.31,0.24-0.5c0.06-0.08,0.12-0.18,0.17-0.26c0.19-0.28,0.37-0.55,0.37-0.55
				L684.76,440.65z"/>
										<path className="navas91" d="M684.74,440.88C684.74,440.88,684.74,440.88,684.74,440.88c-0.01,0.07-0.01,0.13-0.02,0.19
				c0.23,0.13,0.99,0.24,1.26,0.15c0.02-0.03,0.05-0.06,0.07-0.1c0.19-0.28,0.37-0.55,0.37-0.55l-1.67,0.07
				c0,0.07-0.01,0.15-0.02,0.21C684.74,440.87,684.74,440.88,684.74,440.88z"/>
										<path className="navas90" d="M686.77,444.36c0.63-1.83-0.07-2.08-0.36-2.32c-0.28-0.23-0.62-0.48-0.54-0.66l0-0.01
				c-0.41,0.05-1.15-0.35-1.15-0.35l-0.01,0.1c-0.25-0.12-0.46-0.18-0.59-0.16c-0.18,0.04-0.41,0.09-0.51,0.2c0,0,0,0,0,0
				c-0.13,0.09-0.47,1.19-0.58,1.74c-0.11,0.53-0.33,1.45-0.44,2.78c-0.01,0.17,0.13,0.28,0.27,0.4c0.31,0.28,0.87,0.8,1.58,1.15
				c0.68,0.34,1.45-0.12,1.51-0.26C686.24,446.29,686.59,444.9,686.77,444.36z"/>
										<path className="navas88" d="M686.18,439.15c-0.4-0.14-0.88-0.26-1.49,0.24c-0.07,0.05-0.12,0.14-0.18,0.32
				c-0.02,0.06,0.01,0.17-0.02,0.23c0,0.01-0.01,0.02-0.01,0.03c-0.24,0.24-0.16,0.99-0.06,1.08c0.23,0.21,1.63,0.36,2.01-0.46
				C686.7,440.02,686.59,439.3,686.18,439.15z"/>
										<path className="navas71" d="M685.26,439.52c0.32,0.27,0.3,0.57,0.32,0.86c0.57-0.63,0.39,0.66,0.78,0.38c0.39-0.27,0.79-1.42,0-1.79
				C685.85,438.73,685.26,439.52,685.26,439.52z"/>
										<path className="navas72" d="M684.5,438.94c-0.04,0.23,0.39,0.92,1.08,0.83s0.95-0.26,1-0.37c0.09-0.21-0.23-1.01-1.29-0.55
				C684.78,439.06,684.6,439.02,684.5,438.94z"/>
										<g>
											<g>
												<path className="navas175" d="M681.33,441.77l0.94-0.17l0.03-0.1l-0.94,0.17c-0.07,0.01-0.12,0.01-0.15,0
						c-0.02-0.01-0.03-0.02-0.02-0.03c0.01-0.02,0.08-0.08,0.23-0.11l0.9-0.16l0.03-0.1l-0.9,0.16c-0.21,0.04-0.34,0.14-0.37,0.22
						c-0.02,0.05,0,0.08,0.05,0.1C681.18,441.78,681.25,441.78,681.33,441.77z"/>
												<path className="navas423" d="M684.53,440.65c-0.02,0.05,0,0.13,0.04,0.18c0.04,0.04,0.09,0.04,0.11-0.02c0.02-0.05,0-0.13-0.04-0.18
						C684.59,440.59,684.54,440.6,684.53,440.65z"/>
											</g>
											<g>
												<path className="navas424" d="M684.47,440.82l0.13-0.03c0,0,0.03-0.02,0.02-0.07c-0.01-0.05-0.04-0.05-0.04-0.05l-0.14,0.02
						L684.47,440.82z"/>
												<path className="navas424" d="M684.43,440.71c-0.01,0.03,0,0.07,0.02,0.09c0.02,0.02,0.04,0.02,0.05-0.01c0.01-0.03,0-0.07-0.02-0.09
						S684.44,440.69,684.43,440.71z"/>
											</g>
											<g>
												<path className="navas175" d="M684.36,440.82l0.1-0.02c0,0,0.02-0.02,0.02-0.05c-0.01-0.04-0.03-0.04-0.03-0.04l-0.11,0.02
						L684.36,440.82z"/>
												<path className="navas175" d="M684.32,440.74c-0.01,0.02,0,0.05,0.02,0.07c0.02,0.02,0.03,0.01,0.04-0.01c0.01-0.02,0-0.05-0.02-0.07
						S684.33,440.72,684.32,440.74z"/>
											</g>
											<g>
												<path className="navas424" d="M684.24,440.85l0.13-0.03c0,0,0.03-0.02,0.02-0.07c-0.01-0.05-0.04-0.05-0.04-0.05l-0.14,0.02
						L684.24,440.85z"/>
												<path className="navas424" d="M684.19,440.75c-0.01,0.03,0,0.07,0.02,0.09c0.02,0.02,0.04,0.02,0.05-0.01c0.01-0.03,0-0.07-0.02-0.09
						C684.22,440.72,684.2,440.72,684.19,440.75z"/>
											</g>
											<path className="navas423" d="M680.85,441.64c0.05-0.16,0.25-0.34,0.53-0.39l2.55-0.45c-0.04-0.03-0.1-0.04-0.19-0.02l-2.6,0.46
					c-0.39,0.07-0.37,0.26-0.62,0.68l-0.5-0.04l0.26-1.14c0.13,0.1,0.49,0.49,0.88,0.42l2.6-0.46c0.15-0.03,0.24,0.01,0.29,0.08
					l0.16-0.03c0,0,0.02,0.01,0.02,0.03c0.01,0.03,0,0.04,0,0.04l-0.15,0.03c0.01,0.05,0,0.11-0.02,0.17
					c-0.03,0.1-0.1,0.19-0.19,0.27c-0.1,0.09-0.23,0.15-0.37,0.17l-2.34,0.41C680.87,441.93,680.8,441.79,680.85,441.64z
					 M681.35,441.34c-0.23,0.04-0.38,0.18-0.42,0.29c-0.04,0.11,0.03,0.21,0.26,0.17l2.34-0.41c0.11-0.02,0.21-0.07,0.29-0.13
					c0.07-0.06,0.12-0.13,0.15-0.21c0.02-0.06,0.02-0.12,0-0.17L681.35,441.34z"/>
											<g>
												<path className="navas424" d="M682.83,441.66l0.53-0.09c0.06-0.01,0.11-0.04,0.16-0.08c0.04-0.04,0.07-0.08,0.08-0.13
						c0.03-0.09,0-0.18-0.12-0.16l-0.51,0.09l-0.03,0.08l0.51-0.09c0.07-0.01,0.08,0.05,0.06,0.09c-0.01,0.03-0.03,0.05-0.05,0.07
						c-0.02,0.02-0.05,0.03-0.08,0.04l-0.53,0.09L682.83,441.66z"/>
											</g>
											<g>
												<polygon className="navas175" points="683.04,440.84 683.09,440.83 683.12,440.73 683.08,440.73 					" />
												<polygon className="navas424" points="682.68,441.74 682.85,441.71 683.17,440.78 682.99,440.81 					" />
											</g>
											<g>
												<polygon className="navas175" points="682.77,440.89 682.81,440.88 682.85,440.77 682.81,440.78 					" />
												<polygon className="navas424" points="682.41,441.79 682.58,441.76 682.9,440.83 682.72,440.86 					" />
											</g>
											<g>
												<polygon className="navas175" points="682.49,440.94 682.53,440.93 682.57,440.82 682.53,440.83 					" />
												<polygon className="navas424" points="682.12,441.84 682.3,441.81 682.61,440.88 682.44,440.91 					" />
											</g>
											<path className="navas423" d="M679.82,440.92c-0.1,0.29,0,0.72,0.21,0.95c0.22,0.24,0.47,0.19,0.57-0.1c0.1-0.29,0-0.72-0.21-0.95
					C680.17,440.59,679.91,440.63,679.82,440.92z"/>
											<path className="navas175" d="M679.85,440.96c-0.09,0.26,0,0.65,0.19,0.87s0.43,0.17,0.52-0.09c0.09-0.26,0-0.65-0.19-0.87
					C680.17,440.66,679.94,440.7,679.85,440.96z"/>
											<path className="navas424" d="M682.5,440.75c-0.04,0.01-0.05,0.04-0.02,0.07c0.03,0.03,0.09,0.05,0.13,0.04
					c0.04-0.01,0.05-0.04,0.02-0.07S682.54,440.74,682.5,440.75z"/>
											<path className="navas424" d="M682.78,440.71c-0.04,0.01-0.05,0.04-0.02,0.07s0.09,0.05,0.13,0.04c0.04-0.01,0.05-0.04,0.02-0.07
					C682.88,440.72,682.82,440.7,682.78,440.71z"/>
											<path className="navas424" d="M683.05,440.66c-0.04,0.01-0.05,0.04-0.02,0.07c0.03,0.03,0.09,0.05,0.13,0.04
					c0.04-0.01,0.05-0.04,0.02-0.07C683.15,440.68,683.1,440.66,683.05,440.66z"/>
										</g>
										<path className="navas173" d="M686.83,442.41c0.4,0.44,0.3,1.11,0.08,1.27c-0.37,0.28-2.04,1.08-2.76,0.7
				c-0.71-0.37-1.48-2.77-1.48-2.77l0.51-0.2l1.24,1.87C684.43,443.28,686.43,441.96,686.83,442.41z"/>
										<polygon className="navas88" points="683.13,441.43 683.4,441.08 683.34,440.99 683.14,441.15 682.92,440.71 682.8,440.6 682.29,440.72 
				682.12,440.94 682.23,441.01 682.5,441.14 682.67,441.61 			"/>
									</g>
									<g>
										<g>
											<path className="navas88" d="M683.88,457.25c-0.1-0.29-0.06-0.46-0.01-0.6c0.05-0.14,0.15-0.3,0.19-0.32c0.04-0.02-0.03-0.12-0.11-0.06
					c-0.07,0.07-0.14,0.25-0.18,0.22s-0.22-0.71-0.32-0.73c-0.1-0.01,0.07,0.34,0.08,0.48c0,0-0.25-0.11-0.32,0.07
					c-0.07,0.18,0.22,1.04,0.26,1.08C683.5,457.44,683.85,457.44,683.88,457.25z"/>
											<path className="navas88" d="M685.3,462.16c0.15-0.1,0.37-0.35,0.09-0.92c-0.27-0.57-1.48-3.81-1.51-3.99
					c-0.06-0.32-0.56-0.25-0.42,0.15c0.06,0.16,0.65,3.25,1.26,4.63C684.9,462.23,685.1,462.3,685.3,462.16z"/>
											<g>
												<path className="navas425" d="M687.88,473.94c0.11,0.07,0.25,0.44,0.04,0.61c-0.22,0.17-0.38,0.14-0.6,0.21
						c-0.22,0.07-0.42,0.33-0.7,0.14c-0.21-0.13,0.14-0.26,0.38-0.49C687.17,474.23,687.88,473.94,687.88,473.94z"/>
												<path className="navas84" d="M686.94,474.38c-0.26,0.18-0.48,0.34-0.36,0.48c0.28,0.15,0.6-0.17,0.81-0.24
						c0.22-0.07,0.32-0.12,0.49-0.32c0.13-0.15,0.03-0.31-0.04-0.32C687.6,473.94,687.51,473.99,686.94,474.38z"/>
											</g>
											<g>
												<path className="navas425" d="M686.17,473.59c0.12,0.08,0.28,0.51,0.04,0.7c-0.25,0.2-0.44,0.16-0.69,0.24
						c-0.25,0.08-0.48,0.37-0.81,0.16c-0.24-0.15,0.16-0.29,0.44-0.56C685.35,473.93,686.17,473.59,686.17,473.59z"/>
												<path className="navas84" d="M685.08,474.1c-0.3,0.2-0.56,0.39-0.41,0.55c0.33,0.17,0.69-0.19,0.93-0.27
						c0.25-0.08,0.36-0.14,0.57-0.37c0.15-0.17,0.04-0.36-0.05-0.37C685.84,473.59,685.74,473.65,685.08,474.1z"/>
											</g>
											<path className="navas170" d="M684.58,463.47l0.57,0.69c0.32-0.26,0.98-3.06-0.11-2.83L684.58,463.47z" />
											<path className="navas89" d="M684.87,465.92c0,0-0.87,3.07-0.99,4.17c-0.01,0.11-0.04,0.25,0.02,0.38c0.54,1.23,1.67,3.31,1.67,3.31
					s0.15,0.07,0.38,0c0.22-0.07,0.22-0.19,0.22-0.19s-0.94-2.95-1.21-3.27c0,0,0.81-1.63,1.02-2.56c0.21-0.92,0.17-1.49,0.17-1.49
					L684.87,465.92z"/>
											<path className="navas83" d="M685.87,467.04c0,0-0.15,2.31-0.27,3.42c-0.01,0.11-0.04,0.25,0.02,0.38c0.54,1.23,1.67,3.31,1.67,3.31
					s0.15,0.07,0.38,0c0.22-0.07,0.22-0.19,0.22-0.19s-0.94-2.95-1.21-3.27c0,0,0.65-1.93,0.86-2.85c0.21-0.92-0.2-2.02-0.2-2.02
					s-2.31-0.46-2.47,0.11C684.72,466.43,685.87,467.04,685.87,467.04z"/>
											<path className="navas426" d="M687.21,465.41c-0.19-0.42,0.25-1.7,0.35-2.05c0.05-0.19,0.43-0.32,0.31-0.62
					c-0.56-0.58-0.64-0.7-1.2-0.98c-0.51-0.25-0.92-0.42-1.21-0.45c-0.4-0.05-0.61,0.11-0.72,0.35c-0.15,0.34-0.07,0.59-0.23,1.12
					c-0.16,0.52,0.05,0.81,0.24,0.94c0,0.04,0.37,1.36,0.13,2.17c0,0.01,0,0.02-0.01,0.03c0,0,0,0,0,0
					C684.84,466.42,688.04,467.28,687.21,465.41z"/>
											<path className="navas88" d="M687.76,467.5c-0.04,0.06-0.27,0.25-0.2,0.29c0.07,0.04,0.17-0.06,0.3-0.13c0.13-0.07,0.23-0.29,0.28-0.47
					c0.04-0.18,0.01-0.27,0-0.34c0,0-0.25-0.28-0.25-0.09c0,0.08-0.12,0.22-0.17,0.32c-0.08,0.16-0.16,0.3-0.11,0.32
					c0.08,0.02,0.14-0.11,0.2-0.13c0.01,0,0.01,0,0.02,0C687.9,467.28,687.8,467.44,687.76,467.5z"/>
											<path className="navas427" d="M686.04,464.24c-0.29-0.11-0.41-0.4-0.77-0.37c-0.35,0.03-0.53-0.16-0.53-0.16c0,0.01,0.02,0.1,0.05,0.23
					c0.2,0.09,0.43,0.11,0.6,0.13c0.11,0.01,0.24,0.04,0.33,0.1c0.7,0.46,1.08,0.08,1.08,0.08
					C686.66,464.29,686.33,464.36,686.04,464.24z"/>
											<path className="navas88" d="M686.44,461.66c0,0-0.32,1.11-0.94,0.97c-0.84-0.19-0.05-1.33-0.05-1.33l0.49,0.02L686.44,461.66z" />
											<path className="navas71" d="M684.76,459.33c-0.51,3.37,0.7,1.97,0.7,1.97l0.8-2.07l-1.18-0.04L684.76,459.33z" />
											<path className="navas88" d="M685.41,460.87c0.03,0.15,0.03,0.33,0.04,0.44c0.15,0.24,1.06,0.43,0.99,0.34
					c-0.24-0.32,0.07-1.08,0.07-1.08L685.41,460.87z"/>
											<path className="navas91" d="M685.44,461.07c0.01,0.06,0.01,0.11,0.02,0.16c0.22,0.07,0.73,0,0.92-0.13c0.04-0.28,0.14-0.53,0.14-0.53
					l-1.11,0.31c0.01,0.06,0.02,0.12,0.03,0.18C685.44,461.05,685.44,461.06,685.44,461.07z"/>
											<path className="navas88" d="M686.32,458.87c-0.43-0.08-0.92-0.12-1.44,0.49c-0.05,0.06-0.09,0.16-0.12,0.35
					c-0.01,0.06,0.04,0.17,0.02,0.24c0,0.01,0,0.02-0.01,0.03c-0.2,0.28,0.02,1.03,0.13,1.11c0.26,0.18,1.68,0.09,1.92-0.8
					C687,459.66,686.75,458.95,686.32,458.87z"/>
											<path className="navas71" d="M686.88,459.7c-0.02-0.64-0.3-0.93-0.58-1.02l0,0c0,0-0.01,0-0.01,0c-0.03-0.01-0.07-0.02-0.1-0.02
					c-1.12-0.26-1.5,0.67-1.44,0.81c0.18-0.14,0.15-0.04,0.44-0.1c0.34,0.32,0.84,0.16,0.83,1.45
					C686.03,461.27,687.01,463.54,686.88,459.7z"/>
											<path className="navas88" d="M687.19,462.18c-0.18,0.02-0.38,0.07-0.37,0.7c0.02,0.62,1.49,1.66,1.49,1.95c0,0.29-0.33,1.64-0.42,1.94
					c-0.05,0.19,0.19,0.5,0.26,0.28c0.23-0.7,0.81-1.46,0.88-2.1C689.1,464.32,687.83,462.12,687.19,462.18z"/>
										</g>
										<g>
											<g>
												<path className="navas71" d="M684.34,475.34c0.04,0,0.08-0.03,0.09-0.07c0.01-0.05-0.02-0.1-0.08-0.11l-2.41-0.53l-0.28-8.96
						c0-0.05-0.05-0.09-0.1-0.09c-0.05,0-0.09,0.04-0.09,0.09l0.29,9.11l2.56,0.57C684.32,475.34,684.33,475.34,684.34,475.34z"/>
											</g>
											<g>
												<path className="navas71" d="M679.39,475.31c0.01,0,0.01,0,0.02,0l2.45-0.52c0.05-0.01,0.08-0.06,0.07-0.11
						c-0.01-0.05-0.06-0.08-0.12-0.07l-2.45,0.52c-0.05,0.01-0.08,0.06-0.07,0.11C679.31,475.28,679.35,475.31,679.39,475.31z"/>
											</g>
											<g>
												<path className="navas71" d="M681.91,476.66c0.05,0,0.09-0.04,0.09-0.09l-0.06-1.88c0-0.05-0.05-0.09-0.1-0.09
						c-0.05,0-0.09,0.04-0.09,0.09l0.06,1.88C681.81,476.62,681.85,476.66,681.91,476.66z"/>
											</g>
											<g>
												<path className="navas71" d="M681.3,466.96c0.03,0,0.07-0.02,0.08-0.05l2.92-5.4c0.02-0.04,0.01-0.1-0.04-0.13
						c-0.05-0.02-0.11-0.01-0.13,0.04l-2.92,5.4c-0.02,0.04-0.01,0.1,0.04,0.13C681.26,466.95,681.28,466.96,681.3,466.96z"/>
											</g>
											<path className="navas71" d="M683.73,461.44c0,0-0.04,0.06,0,0.14c0.04,0.09,0.17,0.15,0.17,0.15l0.98-0.6l-0.29-0.37L683.73,461.44z"
											/>
											<path className="navas72" d="M684.58,460.69c-0.13,0.09-0.15,0.27-0.05,0.4s0.29,0.15,0.41,0.06s0.15-0.27,0.05-0.4
					C684.89,460.62,684.71,460.6,684.58,460.69z"/>
										</g>
									</g>
									<g>
										<path className="navas84" d="M668.01,457.27c0,0-0.93-0.52-0.23-3.18c0.7-2.66,1.5-4.21,1.5-4.21l0.47,0.53c0,0-1.34,2.48-1.67,4.44
				c-0.33,1.95-0.11,1.9-0.11,1.9L668.01,457.27z"/>
										<path className="navas88" d="M671.3,449.32c0.11-0.19,0.23-0.24,0.81,0.1c0.58,0.55,0.75,1.86,1.03,2.11c0.28,0.25,2.24,1.53,2.41,1.69
				c0.17,0.16,0.03,0.24-0.2,0.36c-0.65-0.31-2.27-1-2.94-1.48C671.96,451.76,670.91,449.99,671.3,449.32z"/>
										<path className="navas94" d="M671.66,451.39c-0.51-0.67-1.03-1.62-0.83-2c0.09-0.16,0.94-0.51,1.38-0.02c0.38,0.42,0.63,1.21,0.76,1.75
				L671.66,451.39z"/>
										<path className="navas88" d="M671.28,448.52c-0.03,0.19-0.04,0.37-0.05,0.51c0.18,0.07,0.25,0.26,0.25,0.26s0.41,0.84,0.13,0.92
				c-0.37,0.11-1.73-0.56-1.64-0.68c0.29-0.39-0.13-1.44-0.13-1.44L671.28,448.52z"/>
										<path className="navas91" d="M671.25,448.77c-0.01,0.07-0.01,0.14-0.02,0.21c-0.27,0.07-0.93-0.04-1.19-0.21
				c-0.06-0.36-0.19-0.68-0.19-0.68l1.43,0.44c-0.01,0.08-0.02,0.16-0.03,0.23C671.25,448.76,671.25,448.76,671.25,448.77z"/>
										<path className="navas88" d="M670.16,446.47c0.45-0.07,0.97-0.09,1.54,0.57c0.06,0.07,0.1,0.18,0.13,0.37c0.01,0.06-0.04,0.18-0.02,0.25
				c0,0.01,0,0.02,0.01,0.03c0.22,0.3,0.01,1.09-0.11,1.17c-0.27,0.18-1.78,0.04-2.06-0.92
				C669.47,447.28,669.71,446.53,670.16,446.47z"/>
										<path className="navas71" d="M671.2,462.62c-0.04-0.16,0.02-0.34,0.08-0.49c0,0,0.09,0.02,0.22,0.05c0.11-0.01,0.61-0.02,1.12,0.36
				c0.03,0.02,0.05,0.03,0.07,0.05l0,0c0.25,0.21,0.53,0.46,0.57,0.65c0,0.01,0,0.02,0,0.03c0,0.02,0,0.03-0.01,0.04l0,0
				c0.01,0.04-0.03,0.17-0.19,0.2c-0.16,0.02-0.43,0-0.63-0.11c-0.2-0.11-0.27-0.19-0.41-0.21s-0.68-0.07-0.84-0.42
				C671.17,462.71,671.18,462.66,671.2,462.62z"/>
										<path className="navas71" d="M665.49,460.98c0.04-0.05,0.09-0.07,0.13-0.06c0.13-0.11,0.32-0.15,0.48-0.17c0,0,0.03,0.08,0.08,0.21
				c0.06,0.08,0.34,0.49,0.27,1.11c0,0.03,0,0.06-0.01,0.08c-0.05,0.31-0.13,0.66-0.28,0.78c-0.01,0.01-0.02,0.01-0.03,0.02
				c-0.01,0.01-0.03,0.01-0.04,0.02l0,0c-0.03,0.03-0.17,0.06-0.27-0.06c-0.11-0.12-0.23-0.36-0.23-0.58
				c-0.01-0.22,0.02-0.31-0.03-0.45C665.51,461.75,665.25,461.28,665.49,460.98z"/>
										<path className="navas90" d="M671.62,454.11l-1.66,0.93c0,0,1.5,2.68,1.83,3.36c0,0.07-0.53,3.52-0.53,3.52
				c-0.01,0.69,1.19,0.67,1.19,0.43l0.94-3.55c0.1-0.39,0.08-0.8-0.06-1.18l-0.93-2.5L671.62,454.11z"/>
										<path className="navas173" d="M669.88,454.86l-1,0.13c0,0-0.37,2.39-0.81,3.66c-0.03,0.09-2.25,2.21-2.25,2.21
				c-0.23,0.4,0.02,0.86,0.58,0.87l3.19-2.21c0.22-0.15,0.38-0.36,0.47-0.61l1.33-3.63L669.88,454.86z"/>
										<path className="navas422" d="M668.86,450.09c0.19-0.21,0.89-0.62,1.13-0.7c0.17,0.31,0.93,0.66,1.39,0.54
				c0.46-0.13-0.04-0.79-0.16-0.89c0.29-0.06,0.47-0.06,0.59,0c0,0,0,0,0.01,0c0.28,0.13,0.46,0.39,0.52,0.68
				c0.08,0.43,0.22,1.22,0.22,1.64c0,0.58,0.04,2.41,0.13,3.88c-0.02,0.18-1.56,0.54-2.34,0.8c-0.36,0.12-1.7-0.55-1.74-0.73
				C668.45,454.51,668.81,450.14,668.86,450.09z"/>
										<path className="navas94" d="M669.89,449.42c0.05-0.02,0.11-0.03,0.16-0.05c0.17,0.31,0.79,0.58,1.24,0.45
				c0.46-0.13,0.05-0.68-0.07-0.79c0.07-0.01,0.13-0.02,0.19-0.03c0.13,0.17,0.27,0.44,0.23,0.66c-0.03,0.15-0.14,0.25-0.3,0.3
				c-0.09,0.03-0.19,0.04-0.29,0.04C670.59,449.99,670.07,449.71,669.89,449.42z"/>
										<path className="navas84" d="M671.78,449c0,0,0.76,1.37,0.56,4.73l-0.42-0.43c0,0,0.16-3.41-0.58-4.3
				C671.34,448.99,671.6,448.92,671.78,449z"/>
										<g>
											<path className="navas89" d="M676.15,453.1l0.12-0.26c0,0,1.18-0.32,1.48-0.33c0.29-0.01,0.43,0.09,0.43,0.22
					c0.01,0.18-0.41,0.35-0.48,0.16c-0.21,0.1-0.94,0.51-0.94,0.51s0.01-0.05-0.46-0.03C675.84,453.41,676.15,453.1,676.15,453.1z"
											/>
											<path className="navas83" d="M670.57,456.57c0.26-0.31,0.68-0.52,1.1-0.54c0.16-0.01,0.33,0.15,0.5,0.07c0.17-0.08,0.55-0.06,0.54-0.18
					c0-0.01-0.14-0.39-0.14-0.4c-0.01-0.02-0.02-0.03-0.03-0.04c-0.27-0.23-0.87,0.52-1.07-0.44l0.1-0.16
					c-0.15-0.23,0.19-0.2-0.02-0.67c-0.15-0.35,0.76-0.33,0.8-0.48c0-0.01-0.14-0.39-0.15-0.4c-0.02-0.03-0.08-0.04-0.21-0.04
					c-1.09,0-1.23,0.77-1.6,0.99c-0.33,0.19-0.7,0.31-1.08,0.35c-0.47,0.05-1.11,0.14-1.43,0.31c-0.51,0.27-0.76,0.59-0.22,1.78
					c0,0,0.02,0.01,0.04,0.03c0.01,0.02,0.04,0.07,0.04,0.07c0.67,1.14,1.05,1.12,1.59,0.9
					C669.65,457.57,670.18,457.02,670.57,456.57z"/>
											<path className="navas89" d="M670.71,456.96c0.26-0.31,0.68-0.52,1.1-0.54c0.16-0.01,0.34-0.05,0.51-0.13c0.2-0.1,0.51-0.3,0.36-0.42
					c-0.27-0.23-0.87,0.52-1.07-0.44l0.1-0.16c-0.15-0.23,0.19-0.2-0.02-0.67c-0.2-0.45,1.17-0.93,0.45-0.93
					c-1.09,0-1.23,0.77-1.6,0.99c-0.33,0.19-0.7,0.31-1.08,0.35c-0.47,0.05-1.11,0.14-1.43,0.31c-0.51,0.27-0.76,0.55-0.22,1.74
					c0,0,0.02,0.05,0.03,0.07c0.01,0.02,0.04,0.07,0.04,0.07c0.67,1.14,1.05,1.12,1.59,0.9
					C669.8,457.97,670.32,457.41,670.71,456.96z"/>
											<path className="navas67" d="M671.54,454.74c-0.09-0.1-0.22,0.13-0.51,0.29c-0.29,0.16-1.09,0.21-1.58,0.51
					c-0.49,0.3,0.28,0.91,0.34,1.13c0.06,0.22-0.3,0.9-0.17,1c0.14,0.1,0.58-0.13,1.06-0.78c0.48-0.66,1.26-0.43,1.66-0.67
					c0.31-0.18,0.29-0.27,0.23-0.3c-0.06-0.03-0.49,0.2-0.72,0.09c-0.05-0.02-0.35-0.25-0.4-0.56
					C671.4,455.15,671.6,454.81,671.54,454.74z"/>
											<polygon className="navas82" points="669.6,456.76 669.22,456.02 669.52,455.88 669.9,456.61 				" />
											<g>
												<g>
													<polygon className="navas77" points="677.71,452.59 677.68,452.42 677.76,452.4 677.79,452.57 						" />
													<g>
														<path className="navas82" d="M677.65,452.42L677.65,452.42c-0.01-0.04,0.02-0.07,0.07-0.08l0,0c0.04-0.01,0.08,0.01,0.08,0.04
								l0,0.01c0.01,0.03-0.02,0.07-0.07,0.08l0,0C677.69,452.47,677.65,452.45,677.65,452.42z"/>
													</g>
												</g>
												<g>
													<polygon className="navas77" points="677.38,452.67 677.35,452.5 677.43,452.48 677.45,452.65 						" />
													<g>
														<path className="navas82" d="M677.31,452.5L677.31,452.5c-0.01-0.04,0.02-0.07,0.07-0.08l0,0c0.04-0.01,0.08,0.01,0.08,0.04l0,0.01
								c0.01,0.03-0.02,0.07-0.07,0.08l0,0C677.36,452.55,677.32,452.53,677.31,452.5z"/>
													</g>
												</g>
												<g>
													<polygon className="navas77" points="677.04,452.75 677.02,452.58 677.09,452.56 677.12,452.73 						" />
													<g>
														<path className="navas82" d="M676.98,452.58L676.98,452.58c-0.01-0.04,0.02-0.07,0.07-0.08l0,0c0.04-0.01,0.08,0.01,0.08,0.04
								l0,0.01c0.01,0.03-0.02,0.07-0.07,0.08l0,0C677.02,452.63,676.98,452.61,676.98,452.58z"/>
													</g>
												</g>
												<g>
													<polygon className="navas77" points="676.71,452.83 676.68,452.65 676.76,452.64 676.79,452.81 						" />
													<g>
														<path className="navas82" d="M676.65,452.66L676.65,452.66c-0.01-0.04,0.02-0.07,0.07-0.08l0,0c0.04-0.01,0.08,0.01,0.08,0.04
								l0,0.01c0.01,0.03-0.02,0.07-0.07,0.08l0,0C676.69,452.71,676.65,452.69,676.65,452.66z"/>
													</g>
												</g>
												<g>
													<polygon className="navas77" points="676.38,452.91 676.35,452.73 676.43,452.72 676.45,452.89 						" />
													<g>
														<path className="navas82" d="M676.31,452.74L676.31,452.74c-0.01-0.04,0.02-0.07,0.07-0.08l0,0c0.04-0.01,0.08,0.01,0.08,0.04
								l0,0.01c0.01,0.03-0.02,0.07-0.07,0.08l0,0C676.36,452.79,676.32,452.77,676.31,452.74z"/>
													</g>
												</g>
											</g>
											<g>
												<polygon className="navas82" points="676.3,453.38 676.26,453.3 676.2,453.18 676.15,453.1 671,455.34 671.1,455.54 671.17,455.66 
						671.27,455.85 					"/>
												<polygon className="navas77" points="672.58,454.65 672.81,455.1 672.87,455.07 672.64,454.63 					" />
												<polygon className="navas77" points="671.67,455.05 671.92,455.53 671.98,455.5 671.73,455.02 					" />
												<polygon className="navas77" points="673.54,454.23 673.75,454.63 673.82,454.6 673.61,454.21 					" />
												<polygon className="navas77" points="674.36,453.88 674.55,454.24 674.61,454.21 674.42,453.85 					" />
												<polygon className="navas77" points="675.24,453.49 675.41,453.82 675.47,453.79 675.3,453.47 					" />
											</g>
											<g>
												<polygon className="navas423" points="669.45,456.12 676.19,453.15 676.19,453.15 676.41,452.86 676.39,452.85 676.17,453.13 
						669.44,456.1 					"/>
											</g>
											<g>
												<polygon className="navas423" points="669.51,456.23 676.21,453.2 676.74,452.77 676.72,452.75 676.2,453.18 669.5,456.21 					" />
											</g>
											<g>
												<polygon className="navas423" points="669.68,456.56 676.28,453.33 677.74,452.53 677.73,452.51 676.26,453.31 669.67,456.53 					" />
											</g>
											<g>
												<polygon className="navas423" points="669.63,456.45 676.26,453.3 677.41,452.61 677.4,452.59 676.25,453.28 669.61,456.43 					" />
											</g>
											<g>
												<polygon className="navas423" points="669.57,456.34 676.23,453.25 677.08,452.69 677.06,452.67 676.22,453.23 669.56,456.32 					" />
											</g>
										</g>
										<polygon className="navas88" points="669.97,455.41 669.73,455.77 669.89,456.26 670.64,456.25 670.7,455.89 670.46,455.44 			" />
										<path className="navas88" d="M669.34,450.26c0.2-0.09,0.34-0.07,0.62,0.52c0.16,0.76-0.48,1.91-0.4,2.27c0.08,0.36,0.86,2.17,0.9,2.39
				c0.04,0.22-0.31,0.18-0.57,0.14c-0.36-0.61-1.02-1.72-1.28-2.48C668.43,452.59,668.6,450.59,669.34,450.26z"/>
										<path className="navas94" d="M668.4,452.12c-0.03-0.82,0.1-1.87,0.5-2.06c0.17-0.08,1.09,0.11,1.17,0.75c0.07,0.55-0.19,1.32-0.41,1.83
				L668.4,452.12z"/>
										<polygon className="navas88" points="675.48,453.25 675.7,453.14 675.92,453.2 675.53,453.37 			" />
										<polygon className="navas88" points="676.06,453.31 676.24,453.36 676.05,453.63 675.63,453.79 675.5,453.75 675.72,453.49 			" />
										<path className="navas72" d="M669.79,446.57L669.79,446.57c0,0,0.19-0.4,0.19-0.55l0.07,0.15c0,0,0.15-0.18,0.17-0.34
				c0,0,0.15,0.27,0.17,0.3c0,0,0.25-0.33,0.23-0.42c0,0,0.04,0.45,0.1,0.46c0,0,0.23-0.21,0.22-0.32c0,0,0.01,0.27,0.06,0.31
				c0,0,0.21-0.17,0.21-0.23c0,0,0.01,0.4,0.07,0.42c0.06,0.03,0.25-0.2,0.25-0.2c0.07,0.26,0.11,0.59,0.14,0.91
				c-0.13,0.25-0.58,0.33-0.99,0.19c-0.71-0.24-0.91-0.29-0.94-0.42C669.71,446.75,669.74,446.66,669.79,446.57z"/>
									</g>
								</g>
								<g>
									<g>
										<g>
											<g className="navas95">

												<rect x="705.08" y="465" transform="matrix(0.4689 -0.8833 0.8833 0.4689 -46.5619 876.4555)" className="navas81" width="0.87" height="23.89" />
											</g>
											<g className="navas428">

												<rect x="704.98" y="465.47" transform="matrix(0.4693 -0.883 0.883 0.4693 -47.1438 876.1965)" className="navas429" width="0.87" height="23.69" />
											</g>
											<g className="navas430">

												<rect x="704.87" y="465.95" transform="matrix(0.4693 -0.883 0.883 0.4693 -47.5327 876.3006)" className="navas431" width="0.87" height="23.49" />
											</g>
											<g className="navas432">

												<rect x="704.77" y="466.42" transform="matrix(0.4693 -0.883 0.883 0.4693 -47.9217 876.4048)" className="navas97" width="0.87" height="23.3" />
											</g>
											<g className="navas433">

												<rect x="704.66" y="466.9" transform="matrix(0.4693 -0.883 0.883 0.4693 -48.3107 876.5092)" className="navas434" width="0.87" height="23.1" />
											</g>
											<g className="navas435">

												<rect x="704.56" y="467.38" transform="matrix(0.4693 -0.883 0.883 0.4693 -48.7 876.6135)" className="navas436" width="0.87" height="22.9" />
											</g>
											<g className="navas437">

												<rect x="704.45" y="467.85" transform="matrix(0.4694 -0.883 0.883 0.4694 -49.1094 876.68)" className="navas99" width="0.87" height="22.7" />
											</g>
											<g className="navas438">

												<rect x="704.35" y="468.33" transform="matrix(0.4693 -0.883 0.883 0.4693 -49.4785 876.8222)" className="navas439" width="0.87" height="22.5" />
											</g>
											<g className="navas440">

												<rect x="704.24" y="468.8" transform="matrix(0.4694 -0.883 0.883 0.4694 -49.888 876.8885)" className="navas441" width="0.87" height="22.3" />
											</g>
											<g className="navas442">

												<rect x="704.13" y="469.28" transform="matrix(0.4694 -0.883 0.883 0.4694 -50.2576 877.0311)" className="navas101" width="0.87" height="22.11" />
											</g>
											<g className="navas443">

												<rect x="704.03" y="469.75" transform="matrix(0.4694 -0.883 0.883 0.4694 -50.6662 877.0991)" className="navas444" width="0.87" height="21.91" />
											</g>
											<g className="navas445">

												<rect x="703.92" y="470.23" transform="matrix(0.4694 -0.883 0.883 0.4694 -51.0367 877.2399)" className="navas444" width="0.87" height="21.71" />
											</g>
											<g className="navas446">

												<rect x="703.82" y="470.7" transform="matrix(0.4694 -0.883 0.883 0.4694 -51.4465 877.3063)" className="navas447" width="0.87" height="21.51" />
											</g>
											<g className="navas448">

												<rect x="703.71" y="471.18" transform="matrix(0.4694 -0.883 0.883 0.4694 -51.8162 877.4489)" className="navas447" width="0.87" height="21.31" />
											</g>
											<g className="navas449">

												<rect x="703.61" y="471.66" transform="matrix(0.4694 -0.883 0.883 0.4694 -52.2271 877.5135)" className="navas105" width="0.87" height="21.11" />
											</g>
											<g className="navas450">

												<rect x="703.5" y="472.13" transform="matrix(0.4694 -0.883 0.883 0.4694 -52.5958 877.6578)" className="navas451" width="0.87" height="20.91" />
											</g>
											<g className="navas452">

												<rect x="703.4" y="472.61" transform="matrix(0.4694 -0.883 0.883 0.4694 -53.0059 877.7243)" className="navas451" width="0.88" height="20.72" />
											</g>
											<g className="navas453">

												<rect x="703.29" y="473.09" transform="matrix(0.4694 -0.883 0.883 0.4694 -53.3762 877.8672)" className="navas107" width="0.88" height="20.52" />
											</g>
											<g className="navas454">

												<rect x="703.19" y="473.56" transform="matrix(0.4694 -0.883 0.883 0.4694 -53.7861 877.9335)" className="navas455" width="0.88" height="20.32" />
											</g>
											<g className="navas456">

												<rect x="703.08" y="474.04" transform="matrix(0.4694 -0.883 0.883 0.4694 -54.1445 878.0992)" className="navas457" width="0.88" height="20.12" />
											</g>
											<g className="navas458">

												<rect x="702.97" y="474.52" transform="matrix(0.4694 -0.883 0.883 0.4694 -54.5468 878.181)" className="navas109" width="0.88" height="19.92" />
											</g>
											<g className="navas459">

												<rect x="702.87" y="474.99" transform="matrix(0.4694 -0.883 0.883 0.4694 -54.9371 878.2856)" className="navas111" width="0.88" height="19.72" />
											</g>
											<g className="navas460">
												<polygon className="navas111" points="711.61,490.21 712.02,489.43 694.8,480.25 694.38,481.02 					" />
											</g>
											<g className="navas461">
												<polygon className="navas462" points="711.42,490.54 711.83,489.77 694.78,480.68 694.36,481.45 					" />
											</g>
											<g className="navas463">
												<polygon className="navas464" points="711.22,490.87 711.63,490.1 694.76,481.1 694.35,481.87 					" />
											</g>
											<g className="navas465">

												<rect x="702.45" y="476.9" transform="matrix(0.4699 -0.8827 0.8827 0.4699 -56.7074 878.3018)" className="navas466" width="0.88" height="18.92" />
											</g>
											<g className="navas467">

												<rect x="702.34" y="477.38" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -57.3064 878.0017)" className="navas113" width="0.88" height="18.72" />
											</g>
											<g className="navas468">

												<rect x="702.24" y="477.86" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -57.6968 878.1063)" className="navas469" width="0.88" height="18.53" />
											</g>
											<g className="navas470">

												<rect x="702.13" y="478.33" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -58.0756 878.234)" className="navas115" width="0.88" height="18.33" />
											</g>
											<g className="navas471">

												<rect x="702.02" y="478.81" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -58.478 878.3154)" className="navas472" width="0.88" height="18.13" />
											</g>
											<g className="navas473">

												<rect x="701.92" y="479.29" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -58.8689 878.4202)" className="navas117" width="0.88" height="17.93" />
											</g>
											<g className="navas474">
												<polygon className="navas117" points="709.86,493.2 710.28,492.42 694.64,484.07 694.23,484.84 					" />
											</g>
											<g className="navas475">
												<polygon className="navas117" points="709.67,493.53 710.08,492.75 694.62,484.49 694.21,485.26 					" />
											</g>
											<g className="navas476">
												<polygon className="navas477" points="709.47,493.86 709.89,493.08 694.61,484.92 694.19,485.69 					" />
											</g>
											<g className="navas478">
												<polygon className="navas119" points="709.28,494.19 709.69,493.42 694.59,485.34 694.18,486.11 					" />
											</g>
											<g className="navas479">
												<polygon className="navas480" points="709.09,494.52 709.5,493.75 694.57,485.76 694.16,486.54 					" />
											</g>
											<g className="navas481">
												<polygon className="navas121" points="708.89,494.86 709.31,494.08 694.56,486.19 694.14,486.96 					" />
											</g>
											<g className="navas482">
												<polygon className="navas483" points="708.7,495.19 709.11,494.41 694.54,486.61 694.12,487.39 					" />
											</g>
											<g className="navas484">
												<polygon className="navas483" points="708.5,495.52 708.92,494.75 694.52,487.04 694.11,487.81 					" />
											</g>
											<g className="navas485">
												<polygon className="navas486" points="708.31,495.85 708.72,495.08 694.5,487.46 694.09,488.24 					" />
											</g>
											<g className="navas487">

												<rect x="700.86" y="484.07" transform="matrix(0.4704 -0.8825 0.8825 0.4704 -62.7689 879.4893)" className="navas488" width="0.88" height="15.93" />
											</g>
											<g className="navas489">

												<rect x="700.76" y="484.55" transform="matrix(0.4703 -0.8825 0.8825 0.4703 -63.141 879.6329)" className="navas490" width="0.88" height="15.73" />
											</g>
											<g className="navas491">
												<polygon className="navas490" points="707.73,496.85 708.14,496.07 694.45,488.74 694.04,489.51 					" />
											</g>
											<g className="navas492">

												<rect x="700.54" y="485.51" transform="matrix(0.4708 -0.8823 0.8823 0.4708 -64.1189 879.4573)" className="navas493" width="0.88" height="15.33" />
											</g>
											<g className="navas494">

												<rect x="700.44" y="485.99" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -64.53 879.5237)" className="navas493" width="0.88" height="15.13" />
											</g>
											<g className="navas495">

												<rect x="700.33" y="486.47" transform="matrix(0.4708 -0.8823 0.8823 0.4708 -64.9033 879.6653)" className="navas127" width="0.88" height="14.93" />
											</g>
											<g className="navas496">

												<rect x="700.23" y="486.95" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -65.3135 879.7335)" className="navas497" width="0.88" height="14.73" />
											</g>
											<g className="navas498">

												<rect x="700.12" y="487.43" transform="matrix(0.4708 -0.8823 0.8823 0.4708 -65.6858 879.8771)" className="navas129" width="0.88" height="14.53" />
											</g>
											<g className="navas499">

												<rect x="700.01" y="487.9" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -66.0962 879.9455)" className="navas129" width="0.88" height="14.33" />
											</g>
											<g className="navas500">

												<rect x="699.91" y="488.38" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -66.4805 880.0657)" className="navas501" width="0.88" height="14.13" />
											</g>
											<g className="navas502">

												<rect x="699.8" y="488.86" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -66.8812 880.1536)" className="navas131" width="0.88" height="13.93" />
											</g>
											<g className="navas503">

												<rect x="699.7" y="489.34" transform="matrix(0.4708 -0.8822 0.8822 0.4708 -67.2645 880.2756)" className="navas131" width="0.88" height="13.73" />
											</g>
											<g className="navas504">

												<rect x="699.59" y="489.82" transform="matrix(0.4709 -0.8822 0.8822 0.4709 -67.6761 880.3421)" className="navas505" width="0.88" height="13.53" />
											</g>
											<g className="navas506">

												<rect x="699.48" y="490.3" transform="matrix(0.4712 -0.882 0.882 0.4712 -68.2313 880.121)" className="navas507" width="0.88" height="13.33" />
											</g>
											<g className="navas508">

												<rect x="699.38" y="490.78" transform="matrix(0.4713 -0.882 0.882 0.4713 -68.6435 880.1855)" className="navas133" width="0.88" height="13.13" />
											</g>
											<g className="navas509">

												<rect x="699.27" y="491.26" transform="matrix(0.4713 -0.882 0.882 0.4713 -69.0262 880.3096)" className="navas510" width="0.88" height="12.93" />
											</g>
											<g className="navas511">

												<rect x="699.17" y="491.74" transform="matrix(0.4713 -0.882 0.882 0.4713 -69.4272 880.3976)" className="navas135" width="0.88" height="12.72" />
											</g>
											<g className="navas512">

												<rect x="699.06" y="492.22" transform="matrix(0.4712 -0.882 0.882 0.4712 -69.7994 880.5432)" className="navas513" width="0.88" height="12.52" />
											</g>
											<g className="navas514">
												<polygon className="navas135" points="704.61,502.18 705.03,501.4 694.18,495.56 693.76,496.33 					" />
											</g>
											<g className="navas515">
												<polygon className="navas137" points="704.41,502.51 704.83,501.73 694.16,495.98 693.74,496.76 					" />
											</g>
											<g className="navas516">
												<polygon className="navas137" points="704.22,502.85 704.64,502.07 694.14,496.41 693.73,497.18 					" />
											</g>
											<g className="navas517">
												<polygon className="navas518" points="704.02,503.18 704.44,502.4 694.13,496.84 693.71,497.61 					" />
											</g>
											<g className="navas519">
												<polygon className="navas520" points="703.83,503.51 704.25,502.73 694.11,497.26 693.69,498.04 					" />
											</g>
											<g className="navas521">
												<polygon className="navas522" points="703.63,503.85 704.05,503.07 694.09,497.69 693.68,498.47 					" />
											</g>
											<g className="navas523">
												<polygon className="navas524" points="703.44,504.18 703.86,503.4 694.08,498.12 693.66,498.89 					" />
											</g>
											<g className="navas525">
												<polygon className="navas526" points="703.24,504.51 703.66,503.73 694.06,498.55 693.64,499.32 					" />
											</g>
											<g className="navas527">
												<polygon className="navas528" points="703.05,504.85 703.47,504.07 694.04,498.97 693.62,499.75 					" />
											</g>
											<g className="navas529">
												<polygon className="navas143" points="702.85,505.18 703.27,504.4 694.02,499.4 693.61,500.18 					" />
											</g>
											<g className="navas530">
												<polygon className="navas531" points="702.66,505.52 703.08,504.74 694.01,499.83 693.59,500.61 					" />
											</g>
											<g className="navas532">
												<polygon className="navas533" points="702.46,505.85 702.88,505.07 693.99,500.26 693.57,501.03 					" />
											</g>
											<g className="navas534">
												<polygon className="navas145" points="702.27,506.18 702.69,505.4 693.97,500.69 693.55,501.46 					" />
											</g>
											<g className="navas535">
												<polygon className="navas145" points="702.07,506.52 702.49,505.74 693.95,501.11 693.54,501.89 					" />
											</g>
											<g className="navas536">
												<polygon className="navas537" points="701.88,506.85 702.3,506.07 693.94,501.54 693.52,502.32 					" />
											</g>
											<g className="navas538">
												<polygon className="navas147" points="701.68,507.19 702.1,506.41 693.92,501.97 693.5,502.75 					" />
											</g>
											<g className="navas539">
												<polygon className="navas540" points="701.49,507.52 701.91,506.74 693.9,502.4 693.48,503.18 					" />
											</g>
											<g className="navas541">
												<polygon className="navas542" points="701.29,507.85 701.71,507.07 693.89,502.83 693.47,503.6 					" />
											</g>
											<g className="navas543">
												<polygon className="navas149" points="701.1,508.19 701.51,507.41 693.87,503.26 693.45,504.03 					" />
											</g>
											<g className="navas544">
												<polygon className="navas545" points="700.9,508.52 701.32,507.74 693.85,503.68 693.43,504.46 					" />
											</g>
											<g className="navas546">
												<polygon className="navas547" points="700.7,508.86 701.12,508.08 693.83,504.11 693.41,504.89 					" />
											</g>
											<g className="navas548">
												<polygon className="navas549" points="700.51,509.19 700.93,508.41 693.82,504.54 693.4,505.32 					" />
											</g>
											<g className="navas550">
												<polygon className="navas549" points="700.31,509.53 700.73,508.75 693.8,504.97 693.38,505.75 					" />
											</g>
											<g className="navas551">
												<polygon className="navas153" points="700.12,509.86 700.54,509.08 693.78,505.4 693.36,506.18 					" />
											</g>
											<g className="navas552">
												<polygon className="navas153" points="699.92,510.19 700.34,509.42 693.77,505.83 693.34,506.61 					" />
											</g>
											<g className="navas553">
												<polygon className="navas554" points="699.73,510.53 700.15,509.75 693.75,506.26 693.33,507.04 					" />
											</g>
											<g className="navas555">
												<polygon className="navas155" points="699.53,510.86 699.95,510.08 693.73,506.69 693.31,507.47 					" />
											</g>
											<g className="navas556">
												<polygon className="navas557" points="699.33,511.2 699.76,510.42 693.71,507.12 693.29,507.9 					" />
											</g>
											<g className="navas558">
												<polygon className="navas155" points="699.14,511.53 699.56,510.75 693.7,507.55 693.27,508.33 					" />
											</g>
											<g className="navas559">
												<polygon className="navas157" points="698.94,511.87 699.36,511.09 693.68,507.98 693.26,508.76 					" />
											</g>
											<g className="navas560">
												<polygon className="navas561" points="698.75,512.2 699.17,511.42 693.66,508.41 693.24,509.19 					" />
											</g>
											<g className="navas562">
												<polygon className="navas561" points="698.55,512.54 698.97,511.76 693.64,508.84 693.22,509.62 					" />
											</g>
											<g className="navas563">
												<polygon className="navas159" points="698.36,512.87 698.78,512.09 693.63,509.27 693.2,510.05 					" />
											</g>
											<g className="navas564">
												<polygon className="navas159" points="698.16,513.21 698.58,512.43 693.61,509.7 693.19,510.48 					" />
											</g>
											<g className="navas565">
												<polygon className="navas566" points="697.96,513.54 698.39,512.76 693.59,510.13 693.17,510.91 					" />
											</g>
											<g className="navas567">
												<polygon className="navas568" points="697.77,513.88 698.19,513.1 693.58,510.56 693.15,511.34 					" />
											</g>
											<g className="navas569">
												<polygon className="navas570" points="697.57,514.21 697.99,513.43 693.56,510.99 693.13,511.77 					" />
											</g>
											<g className="navas571">
												<polygon className="navas163" points="697.37,514.55 697.8,513.77 693.54,511.42 693.12,512.2 					" />
											</g>
											<g className="navas572">
												<polygon className="navas163" points="697.18,514.88 697.6,514.1 693.52,511.85 693.1,512.63 					" />
											</g>
											<g className="navas573">
												<polygon className="navas574" points="696.98,515.22 697.41,514.44 693.51,512.28 693.08,513.06 					" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="696.79,515.55 697.21,514.77 693.49,512.71 693.06,513.49 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="696.59,515.89 697.02,515.11 693.47,513.14 693.05,513.92 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="696.39,516.22 696.82,515.45 693.46,513.58 693.03,514.35 					" />
											</g>
											<g>
												<polygon className="navas76" points="696.2,516.56 696.62,515.78 693.44,514.01 693.01,514.78 					" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M693.34,513.22c0.04-0.04,0.07-0.09,0.11-0.12l0.01-0.01l0,0c0.34-0.28,0.86-0.29,1.47,0.05
					c1.06,0.6,1.96,2.04,2,3.23c0.02,0.53-0.14,0.92-0.42,1.13l0,0l-4.12,3.39l-2.98-3.49L693.34,513.22z"/>
											<polygon className="navas71" points="692.32,516.98 688.58,514.86 688.73,519.38 692.48,521.5 				" />
											<polygon className="navas73" points="692.32,516.98 695.92,514.93 696.08,519.45 692.48,521.5 				" />
											<polygon className="navas72" points="692.18,512.82 695.92,514.93 692.32,516.98 688.58,514.86 				" />
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas81" points="723.79,433.15 755.89,422.44 755.55,421.63 723.45,432.33 					" />
											</g>
											<g className="navas428">
												<polygon className="navas429" points="723.91,433.91 755.73,423.29 755.39,422.48 723.58,433.1 					" />
											</g>
											<g className="navas430">
												<polygon className="navas431" points="724.03,434.67 755.57,424.15 755.23,423.33 723.7,433.86 					" />
											</g>
											<g className="navas432">
												<polygon className="navas97" points="724.15,435.44 755.41,425 755.07,424.19 723.82,434.62 					" />
											</g>
											<g className="navas433">
												<polygon className="navas434" points="724.27,436.2 755.25,425.85 754.91,425.04 723.94,435.39 					" />
											</g>
											<g className="navas435">
												<polygon className="navas436" points="724.39,436.97 755.09,426.7 754.75,425.89 724.06,436.15 					" />
											</g>
											<g className="navas437">
												<polygon className="navas99" points="724.51,437.73 754.93,427.56 754.59,426.74 724.18,436.92 					" />
											</g>
											<g className="navas438">
												<polygon className="navas439" points="724.63,438.5 754.77,428.41 754.43,427.59 724.3,437.68 					" />
											</g>
											<g className="navas440">
												<polygon className="navas441" points="724.75,439.27 754.61,429.26 754.27,428.45 724.42,438.45 					" />
											</g>
											<g className="navas442">
												<polygon className="navas101" points="724.87,440.03 754.45,430.12 754.11,429.3 724.54,439.22 					" />
											</g>
											<g className="navas443">
												<polygon className="navas444" points="724.99,440.8 754.29,430.97 753.95,430.16 724.66,439.98 					" />
											</g>
											<g className="navas445">
												<polygon className="navas444" points="725.12,441.57 754.13,431.83 753.78,431.01 724.78,440.75 					" />
											</g>
											<g className="navas446">
												<polygon className="navas447" points="725.24,442.34 753.97,432.68 753.62,431.86 724.9,441.52 					" />
											</g>
											<g className="navas448">
												<polygon className="navas447" points="725.36,443.1 753.8,433.54 753.46,432.72 725.02,442.28 					" />
											</g>
											<g className="navas449">
												<polygon className="navas105" points="725.48,443.87 753.64,434.39 753.3,433.58 725.15,443.05 					" />
											</g>
											<g className="navas450">
												<polygon className="navas451" points="725.6,444.64 753.48,435.25 753.14,434.43 725.27,443.82 					" />
											</g>
											<g className="navas452">
												<polygon className="navas451" points="725.72,445.41 753.32,436.11 752.98,435.29 725.39,444.59 					" />
											</g>
											<g className="navas453">
												<polygon className="navas107" points="725.84,446.18 753.16,436.96 752.82,436.15 725.51,445.36 					" />
											</g>
											<g className="navas454">
												<polygon className="navas455" points="725.97,446.95 753,437.82 752.65,437 725.63,446.13 					" />
											</g>
											<g className="navas456">
												<polygon className="navas457" points="726.09,447.72 752.84,438.68 752.49,437.86 725.75,446.9 					" />
											</g>
											<g className="navas458">
												<polygon className="navas109" points="726.21,448.49 752.67,439.54 752.33,438.72 725.87,447.67 					" />
											</g>
											<g className="navas459">
												<polygon className="navas111" points="726.33,449.26 752.51,440.4 752.17,439.58 725.99,448.44 					" />
											</g>
											<g className="navas460">
												<polygon className="navas111" points="726.45,450.03 752.35,441.25 752.01,440.44 726.12,449.21 					" />
											</g>
											<g className="navas461">
												<polygon className="navas462" points="726.58,450.8 752.19,442.11 751.84,441.29 726.24,449.98 					" />
											</g>
											<g className="navas463">
												<polygon className="navas464" points="726.7,451.58 752.03,442.97 751.68,442.15 726.36,450.75 					" />
											</g>
											<g className="navas465">
												<polygon className="navas466" points="726.82,452.35 751.86,443.83 751.52,443.01 726.48,451.53 					" />
											</g>
											<g className="navas467">
												<polygon className="navas113" points="726.94,453.12 751.7,444.7 751.36,443.87 726.6,452.3 					" />
											</g>
											<g className="navas468">
												<polygon className="navas469" points="727.06,453.89 751.54,445.56 751.19,444.73 726.72,453.07 					" />
											</g>
											<g className="navas470">
												<polygon className="navas115" points="727.19,454.67 751.38,446.42 751.03,445.6 726.85,453.84 					" />
											</g>
											<g className="navas471">
												<polygon className="navas472" points="727.31,455.44 751.22,447.28 750.87,446.46 726.97,454.62 					" />
											</g>
											<g className="navas473">
												<polygon className="navas117" points="727.43,456.22 751.05,448.14 750.71,447.32 727.09,455.39 					" />
											</g>
											<g className="navas474">
												<polygon className="navas117" points="727.55,456.99 750.89,449 750.54,448.18 727.21,456.17 					" />
											</g>
											<g className="navas475">
												<polygon className="navas117" points="727.68,457.76 750.73,449.87 750.38,449.04 727.33,456.94 					" />
											</g>
											<g className="navas476">
												<polygon className="navas477" points="727.8,458.54 750.57,450.73 750.22,449.91 727.46,457.72 					" />
											</g>
											<g className="navas478">
												<polygon className="navas119" points="727.92,459.32 750.4,451.59 750.05,450.77 727.58,458.49 					" />
											</g>
											<g className="navas479">
												<polygon className="navas480" points="728.04,460.09 750.24,452.46 749.89,451.64 727.7,459.27 					" />
											</g>
											<g className="navas481">
												<polygon className="navas121" points="728.17,460.87 750.08,453.32 749.73,452.5 727.82,460.04 					" />
											</g>
											<g className="navas482">
												<polygon className="navas483" points="728.29,461.64 749.91,454.19 749.57,453.36 727.95,460.82 					" />
											</g>
											<g className="navas484">
												<polygon className="navas483" points="728.41,462.42 749.75,455.05 749.4,454.23 728.07,461.6 					" />
											</g>
											<g className="navas485">
												<polygon className="navas486" points="728.54,463.2 749.59,455.92 749.24,455.1 728.19,462.37 					" />
											</g>
											<g className="navas487">
												<polygon className="navas488" points="728.66,463.98 749.43,456.79 749.08,455.96 728.31,463.15 					" />
											</g>
											<g className="navas489">
												<polygon className="navas490" points="728.78,464.75 749.26,457.65 748.91,456.83 728.44,463.93 					" />
											</g>
											<g className="navas491">
												<polygon className="navas490" points="728.9,465.53 749.1,458.52 748.75,457.69 728.56,464.71 					" />
											</g>
											<g className="navas492">
												<polygon className="navas493" points="729.03,466.31 748.94,459.39 748.58,458.56 728.68,465.48 					" />
											</g>
											<g className="navas494">
												<polygon className="navas493" points="729.15,467.09 748.77,460.26 748.42,459.43 728.8,466.26 					" />
											</g>
											<g className="navas495">
												<polygon className="navas127" points="729.27,467.87 748.61,461.12 748.26,460.3 728.93,467.04 					" />
											</g>
											<g className="navas496">
												<polygon className="navas497" points="729.4,468.65 748.45,461.99 748.09,461.17 729.05,467.82 					" />
											</g>
											<g className="navas498">
												<polygon className="navas129" points="729.52,469.43 748.28,462.86 747.93,462.03 729.17,468.6 					" />
											</g>
											<g className="navas499">
												<polygon className="navas129" points="729.64,470.21 748.12,463.73 747.76,462.9 729.29,469.38 					" />
											</g>
											<g className="navas500">
												<polygon className="navas501" points="729.77,470.99 747.96,464.6 747.6,463.77 729.42,470.16 					" />
											</g>
											<g className="navas502">
												<polygon className="navas131" points="729.89,471.77 747.79,465.47 747.44,464.64 729.54,470.94 					" />
											</g>
											<g className="navas503">
												<polygon className="navas131" points="730.01,472.56 747.63,466.34 747.27,465.51 729.66,471.73 					" />
											</g>
											<g className="navas504">
												<polygon className="navas505" points="730.14,473.34 747.46,467.21 747.11,466.38 729.79,472.51 					" />
											</g>
											<g className="navas506">
												<polygon className="navas507" points="730.26,474.12 747.3,468.08 746.94,467.26 729.91,473.29 					" />
											</g>
											<g className="navas508">
												<polygon className="navas133" points="730.39,474.9 747.14,468.95 746.78,468.13 730.03,474.07 					" />
											</g>
											<g className="navas509">
												<polygon className="navas510" points="730.51,475.69 746.97,469.83 746.61,469 730.16,474.86 					" />
											</g>
											<g className="navas511">
												<polygon className="navas135" points="730.63,476.47 746.81,470.7 746.45,469.87 730.28,475.64 					" />
											</g>
											<g className="navas512">
												<polygon className="navas513" points="730.76,477.25 746.64,471.57 746.28,470.74 730.4,476.42 					" />
											</g>
											<g className="navas514">
												<polygon className="navas135" points="730.88,478.04 746.48,472.45 746.12,471.62 730.53,477.21 					" />
											</g>
											<g className="navas515">
												<polygon className="navas137" points="731.01,478.82 746.31,473.32 745.95,472.49 730.65,477.99 					" />
											</g>
											<g className="navas516">
												<polygon className="navas137" points="731.13,479.61 746.15,474.19 745.79,473.36 730.77,478.78 					" />
											</g>
											<g className="navas517">
												<polygon className="navas518" points="731.26,480.39 745.99,475.07 745.62,474.24 730.9,479.56 					" />
											</g>
											<g className="navas519">
												<polygon className="navas520" points="731.38,481.18 745.82,475.94 745.46,475.11 731.02,480.35 					" />
											</g>
											<g className="navas521">
												<polygon className="navas522" points="731.5,481.96 745.66,476.82 745.29,475.99 731.14,481.13 					" />
											</g>
											<g className="navas523">
												<polygon className="navas524" points="731.63,482.75 745.49,477.7 745.13,476.87 731.27,481.92 					" />
											</g>
											<g className="navas525">
												<polygon className="navas526" points="731.75,483.54 745.33,478.57 744.96,477.74 731.39,482.71 					" />
											</g>
											<g className="navas527">
												<polygon className="navas528" points="731.88,484.32 745.16,479.45 744.79,478.62 731.51,483.49 					" />
											</g>
											<g className="navas529">
												<polygon className="navas143" points="732,485.11 745,480.32 744.63,479.49 731.64,484.28 					" />
											</g>
											<g className="navas530">
												<polygon className="navas531" points="732.13,485.9 744.83,481.2 744.46,480.37 731.76,485.07 					" />
											</g>
											<g className="navas532">
												<polygon className="navas533" points="732.25,486.69 744.67,482.08 744.3,481.25 731.89,485.86 					" />
											</g>
											<g className="navas534">
												<polygon className="navas145" points="732.38,487.48 744.5,482.96 744.13,482.13 732.01,486.64 					" />
											</g>
											<g className="navas535">
												<polygon className="navas145" points="732.5,488.27 744.34,483.84 743.96,483.01 732.13,487.43 					" />
											</g>
											<g className="navas536">
												<polygon className="navas537" points="732.63,489.05 744.17,484.72 743.8,483.89 732.26,488.22 					" />
											</g>
											<g className="navas538">
												<polygon className="navas147" points="732.75,489.84 744.01,485.6 743.63,484.76 732.38,489.01 					" />
											</g>
											<g className="navas539">
												<polygon className="navas540" points="732.88,490.63 743.84,486.48 743.47,485.64 732.51,489.8 					" />
											</g>
											<g className="navas541">
												<polygon className="navas542" points="733,491.42 743.68,487.36 743.3,486.52 732.63,490.59 					" />
											</g>
											<g className="navas543">
												<polygon className="navas149" points="733.13,492.22 743.51,488.24 743.13,487.41 732.75,491.38 					" />
											</g>
											<g className="navas544">
												<polygon className="navas545" points="733.26,493.01 743.35,489.12 742.97,488.29 732.88,492.17 					" />
											</g>
											<g className="navas546">
												<polygon className="navas547" points="733.38,493.8 743.18,490 742.8,489.17 733,492.97 					" />
											</g>
											<g className="navas548">
												<polygon className="navas549" points="733.51,494.59 743.02,490.88 742.63,490.05 733.13,493.76 					" />
											</g>
											<g className="navas550">
												<polygon className="navas549" points="733.63,495.38 742.85,491.76 742.46,490.93 733.25,494.55 					" />
											</g>
											<g className="navas551">
												<polygon className="navas153" points="733.76,496.17 742.68,492.64 742.3,491.82 733.37,495.34 					" />
											</g>
											<g className="navas552">
												<polygon className="navas153" points="733.89,496.97 742.52,493.53 742.13,492.7 733.5,496.14 					" />
											</g>
											<g className="navas553">
												<polygon className="navas554" points="734.01,497.76 742.35,494.41 741.96,493.58 733.62,496.93 					" />
											</g>
											<g className="navas555">
												<polygon className="navas155" points="734.14,498.55 742.19,495.29 741.79,494.47 733.75,497.72 					" />
											</g>
											<g className="navas556">
												<polygon className="navas557" points="734.27,499.35 742.02,496.18 741.63,495.35 733.87,498.52 					" />
											</g>
											<g className="navas558">
												<polygon className="navas155" points="734.39,500.14 741.86,497.06 741.46,496.24 733.99,499.31 					" />
											</g>
											<g className="navas559">
												<polygon className="navas157" points="734.52,500.94 741.69,497.95 741.29,497.12 734.12,500.11 					" />
											</g>
											<g className="navas560">
												<polygon className="navas561" points="734.65,501.73 741.53,498.83 741.12,498.01 734.24,500.9 					" />
											</g>
											<g className="navas562">
												<polygon className="navas561" points="734.77,502.53 741.36,499.72 740.95,498.89 734.37,501.7 					" />
											</g>
											<g className="navas563">
												<polygon className="navas159" points="734.9,503.32 741.2,500.6 740.78,499.78 734.49,502.5 					" />
											</g>
											<g className="navas564">
												<polygon className="navas159" points="735.03,504.12 741.03,501.49 740.61,500.67 734.61,503.29 					" />
											</g>
											<g className="navas565">
												<polygon className="navas566" points="735.16,504.91 740.87,502.38 740.44,501.56 734.74,504.09 					" />
											</g>
											<g className="navas567">
												<polygon className="navas568" points="735.29,505.71 740.7,503.26 740.27,502.45 734.86,504.89 					" />
											</g>
											<g className="navas569">
												<polygon className="navas570" points="735.41,506.5 740.54,504.15 740.1,503.33 734.98,505.69 					" />
											</g>
											<g className="navas571">
												<polygon className="navas163" points="735.54,507.3 740.37,505.04 739.93,504.22 735.11,506.49 					" />
											</g>
											<g className="navas572">
												<polygon className="navas163" points="735.67,508.1 740.21,505.93 739.76,505.11 735.23,507.29 					" />
											</g>
											<g className="navas573">
												<polygon className="navas574" points="735.8,508.9 740.04,506.81 739.59,506.01 735.35,508.09 					" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="735.93,509.69 739.88,507.7 739.42,506.9 735.47,508.89 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="736.06,510.49 739.72,508.59 739.25,507.79 735.59,509.69 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="736.2,511.29 739.56,509.48 739.07,508.68 735.71,510.49 					" />
											</g>
											<g>
												<polygon className="navas76" points="736.33,512.08 739.39,510.36 738.9,509.58 735.83,511.3 					" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M738.93,508.79c-0.04-0.05-0.08-0.09-0.13-0.12l-0.01-0.01l0,0c-0.36-0.29-0.9-0.31-1.48,0.02
					c-1.02,0.58-1.81,2.01-1.75,3.19c0.02,0.53,0.22,0.92,0.51,1.14l0,0l4.44,3.48l2.72-3.44L738.93,508.79z"/>
											<polygon className="navas73" points="740.27,512.58 743.87,510.53 744.09,515.05 740.48,517.1 				" />
											<polygon className="navas71" points="740.27,512.58 736.47,510.46 736.68,514.98 740.48,517.1 				" />
											<polygon className="navas72" points="740.07,508.41 736.47,510.46 740.27,512.58 743.87,510.53 				" />
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas81" points="676.58,460.78 676.99,460.01 661.75,452.1 661.34,452.86 					" />
											</g>
											<g className="navas428">
												<polygon className="navas429" points="676.18,460.99 676.58,460.23 661.47,452.37 661.06,453.13 					" />
											</g>
											<g className="navas430">
												<polygon className="navas431" points="675.78,461.21 676.18,460.44 661.19,452.65 660.78,453.41 					" />
											</g>
											<g className="navas432">
												<polygon className="navas97" points="675.37,461.42 675.78,460.66 660.91,452.92 660.5,453.68 					" />
											</g>
											<g className="navas433">
												<polygon className="navas434" points="674.97,461.64 675.38,460.87 660.63,453.2 660.22,453.96 					" />
											</g>
											<g className="navas435">
												<polygon className="navas436" points="674.57,461.85 674.98,461.09 660.34,453.47 659.94,454.23 					" />
											</g>
											<g className="navas437">
												<polygon className="navas99" points="674.17,462.06 674.57,461.3 660.06,453.75 659.65,454.51 					" />
											</g>
											<g className="navas438">
												<polygon className="navas439" points="673.77,462.28 674.17,461.51 659.78,454.02 659.37,454.78 					" />
											</g>
											<g className="navas440">
												<polygon className="navas441" points="673.36,462.49 673.77,461.73 659.5,454.3 659.09,455.06 					" />
											</g>
											<g className="navas442">
												<polygon className="navas101" points="672.96,462.71 673.37,461.94 659.22,454.57 658.81,455.34 					" />
											</g>
											<g className="navas443">
												<polygon className="navas444" points="672.56,462.92 672.97,462.16 658.94,454.85 658.53,455.61 					" />
											</g>
											<g className="navas445">
												<polygon className="navas444" points="672.16,463.14 672.56,462.37 658.66,455.12 658.25,455.89 					" />
											</g>
											<g className="navas446">
												<polygon className="navas447" points="671.75,463.35 672.16,462.59 658.37,455.4 657.97,456.16 					" />
											</g>
											<g className="navas448">
												<polygon className="navas447" points="671.35,463.57 671.76,462.8 658.09,455.68 657.68,456.44 					" />
											</g>
											<g className="navas449">
												<polygon className="navas105" points="670.95,463.78 671.36,463.02 657.81,455.95 657.4,456.71 					" />
											</g>
											<g className="navas450">
												<polygon className="navas451" points="670.55,464 670.96,463.23 657.53,456.23 657.12,456.99 					" />
											</g>
											<g className="navas452">
												<polygon className="navas451" points="670.15,464.21 670.55,463.45 657.25,456.5 656.84,457.26 					" />
											</g>
											<g className="navas453">
												<polygon className="navas107" points="669.74,464.43 670.15,463.66 656.97,456.78 656.56,457.54 					" />
											</g>
											<g className="navas454">
												<polygon className="navas455" points="669.34,464.64 669.75,463.88 656.69,457.05 656.28,457.81 					" />
											</g>
											<g className="navas456">
												<polygon className="navas457" points="668.94,464.86 669.35,464.09 656.4,457.33 655.99,458.09 					" />
											</g>
											<g className="navas458">
												<polygon className="navas109" points="668.54,465.07 668.94,464.31 656.12,457.6 655.71,458.36 					" />
											</g>
											<g className="navas459">
												<polygon className="navas111" points="668.13,465.28 668.54,464.52 655.84,457.88 655.43,458.64 					" />
											</g>
											<g className="navas460">
												<polygon className="navas111" points="667.73,465.5 668.14,464.73 655.56,458.15 655.15,458.91 					" />
											</g>
											<g className="navas461">
												<polygon className="navas462" points="667.33,465.71 667.74,464.95 655.28,458.43 654.87,459.19 					" />
											</g>
											<g className="navas463">
												<polygon className="navas464" points="666.93,465.93 667.34,465.16 655,458.7 654.58,459.47 					" />
											</g>
											<g className="navas465">
												<polygon className="navas466" points="666.52,466.14 666.93,465.38 654.71,458.98 654.3,459.74 					" />
											</g>
											<g className="navas467">
												<polygon className="navas113" points="666.12,466.36 666.53,465.59 654.43,459.26 654.02,460.02 					" />
											</g>
											<g className="navas468">
												<polygon className="navas469" points="665.72,466.57 666.13,465.81 654.15,459.53 653.74,460.29 					" />
											</g>
											<g className="navas470">
												<polygon className="navas115" points="665.32,466.79 665.73,466.02 653.87,459.81 653.46,460.57 					" />
											</g>
											<g className="navas471">
												<polygon className="navas472" points="664.91,467 665.32,466.24 653.59,460.08 653.17,460.84 					" />
											</g>
											<g className="navas473">
												<polygon className="navas117" points="664.51,467.22 664.92,466.45 653.3,460.36 652.89,461.12 					" />
											</g>
											<g className="navas474">
												<polygon className="navas117" points="664.11,467.43 664.52,466.67 653.02,460.63 652.61,461.4 					" />
											</g>
											<g className="navas475">
												<polygon className="navas117" points="663.71,467.65 664.12,466.88 652.74,460.91 652.33,461.67 					" />
											</g>
											<g className="navas476">
												<polygon className="navas477" points="663.3,467.86 663.71,467.1 652.46,461.19 652.05,461.95 					" />
											</g>
											<g className="navas478">
												<polygon className="navas119" points="662.9,468.08 663.31,467.31 652.18,461.46 651.76,462.22 					" />
											</g>
											<g className="navas479">
												<polygon className="navas480" points="662.5,468.29 662.91,467.53 651.89,461.74 651.48,462.5 					" />
											</g>
											<g className="navas481">
												<polygon className="navas121" points="662.09,468.51 662.51,467.74 651.61,462.01 651.2,462.78 					" />
											</g>
											<g className="navas482">
												<polygon className="navas483" points="661.69,468.72 662.1,467.96 651.33,462.29 650.92,463.05 					" />
											</g>
											<g className="navas484">
												<polygon className="navas483" points="661.29,468.94 661.7,468.17 651.05,462.56 650.63,463.33 					" />
											</g>
											<g className="navas485">
												<polygon className="navas486" points="660.89,469.15 661.3,468.39 650.77,462.84 650.35,463.6 					" />
											</g>
											<g className="navas487">
												<polygon className="navas488" points="660.48,469.37 660.9,468.6 650.48,463.12 650.07,463.88 					" />
											</g>
											<g className="navas489">
												<polygon className="navas490" points="660.08,469.58 660.49,468.82 650.2,463.39 649.79,464.16 					" />
											</g>
											<g className="navas491">
												<polygon className="navas490" points="659.68,469.8 660.09,469.03 649.92,463.67 649.51,464.43 					" />
											</g>
											<g className="navas492">
												<polygon className="navas493" points="659.28,470.01 659.69,469.25 649.64,463.95 649.22,464.71 					" />
											</g>
											<g className="navas494">
												<polygon className="navas493" points="658.87,470.23 659.28,469.46 649.35,464.22 648.94,464.98 					" />
											</g>
											<g className="navas495">
												<polygon className="navas127" points="658.47,470.44 658.88,469.68 649.07,464.5 648.66,465.26 					" />
											</g>
											<g className="navas496">
												<polygon className="navas497" points="658.07,470.66 658.48,469.89 648.79,464.77 648.38,465.54 					" />
											</g>
											<g className="navas498">
												<polygon className="navas129" points="657.66,470.87 658.08,470.11 648.51,465.05 648.09,465.81 					" />
											</g>
											<g className="navas499">
												<polygon className="navas129" points="657.26,471.09 657.67,470.32 648.22,465.33 647.81,466.09 					" />
											</g>
											<g className="navas500">
												<polygon className="navas501" points="656.86,471.3 657.27,470.54 647.94,465.6 647.53,466.37 					" />
											</g>
											<g className="navas502">
												<polygon className="navas131" points="656.45,471.52 656.87,470.75 647.66,465.88 647.24,466.64 					" />
											</g>
											<g className="navas503">
												<polygon className="navas131" points="656.05,471.73 656.47,470.97 647.38,466.15 646.96,466.92 					" />
											</g>
											<g className="navas504">
												<polygon className="navas505" points="655.65,471.95 656.06,471.18 647.09,466.43 646.68,467.19 					" />
											</g>
											<g className="navas506">
												<polygon className="navas507" points="655.25,472.16 655.66,471.4 646.81,466.71 646.4,467.47 					" />
											</g>
											<g className="navas508">
												<polygon className="navas133" points="654.84,472.38 655.26,471.61 646.53,466.98 646.11,467.75 					" />
											</g>
											<g className="navas509">
												<polygon className="navas510" points="654.44,472.59 654.85,471.83 646.25,467.26 645.83,468.02 					" />
											</g>
											<g className="navas511">
												<polygon className="navas135" points="654.04,472.81 654.45,472.04 645.96,467.54 645.55,468.3 					" />
											</g>
											<g className="navas512">
												<polygon className="navas513" points="653.63,473.02 654.05,472.26 645.68,467.81 645.27,468.58 					" />
											</g>
											<g className="navas514">
												<polygon className="navas135" points="653.23,473.24 653.65,472.47 645.4,468.09 644.98,468.85 					" />
											</g>
											<g className="navas515">
												<polygon className="navas137" points="652.83,473.45 653.24,472.69 645.11,468.37 644.7,469.13 					" />
											</g>
											<g className="navas516">
												<polygon className="navas137" points="652.42,473.67 652.84,472.9 644.83,468.64 644.42,469.41 					" />
											</g>
											<g className="navas517">
												<polygon className="navas518" points="652.02,473.88 652.44,473.12 644.55,468.92 644.13,469.68 					" />
											</g>
											<g className="navas519">
												<polygon className="navas520" points="651.62,474.1 652.03,473.33 644.27,469.2 643.85,469.96 					" />
											</g>
											<g className="navas521">
												<polygon className="navas522" points="651.21,474.31 651.63,473.55 643.98,469.47 643.57,470.24 					" />
											</g>
											<g className="navas523">
												<polygon className="navas524" points="650.81,474.53 651.23,473.76 643.7,469.75 643.28,470.51 					" />
											</g>
											<g className="navas525">
												<polygon className="navas526" points="650.41,474.74 650.82,473.98 643.42,470.03 643,470.79 					" />
											</g>
											<g className="navas527">
												<polygon className="navas528" points="650,474.96 650.42,474.19 643.13,470.3 642.72,471.07 					" />
											</g>
											<g className="navas529">
												<polygon className="navas143" points="649.6,475.17 650.02,474.41 642.85,470.58 642.43,471.34 					" />
											</g>
											<g className="navas530">
												<polygon className="navas531" points="649.2,475.39 649.61,474.62 642.57,470.86 642.15,471.62 					" />
											</g>
											<g className="navas532">
												<polygon className="navas533" points="648.79,475.6 649.21,474.84 642.29,471.13 641.87,471.9 					" />
											</g>
											<g className="navas534">
												<polygon className="navas145" points="648.39,475.82 648.81,475.05 642,471.41 641.58,472.17 					" />
											</g>
											<g className="navas535">
												<polygon className="navas145" points="647.99,476.03 648.41,475.27 641.72,471.69 641.3,472.45 					" />
											</g>
											<g className="navas536">
												<polygon className="navas537" points="647.58,476.25 648,475.48 641.44,471.96 641.02,472.73 					" />
											</g>
											<g className="navas538">
												<polygon className="navas147" points="647.18,476.46 647.6,475.7 641.15,472.24 640.73,473 					" />
											</g>
											<g className="navas539">
												<polygon className="navas540" points="646.78,476.68 647.2,475.91 640.87,472.52 640.45,473.28 					" />
											</g>
											<g className="navas541">
												<polygon className="navas542" points="646.37,476.89 646.79,476.13 640.59,472.8 640.17,473.56 					" />
											</g>
											<g className="navas543">
												<polygon className="navas149" points="645.97,477.11 646.39,476.34 640.3,473.07 639.88,473.84 					" />
											</g>
											<g className="navas544">
												<polygon className="navas545" points="645.57,477.32 645.99,476.56 640.02,473.35 639.6,474.11 					" />
											</g>
											<g className="navas546">
												<polygon className="navas547" points="645.16,477.54 645.58,476.77 639.74,473.63 639.32,474.39 					" />
											</g>
											<g className="navas548">
												<polygon className="navas549" points="644.76,477.75 645.18,476.99 639.45,473.9 639.03,474.67 					" />
											</g>
											<g className="navas550">
												<polygon className="navas549" points="644.36,477.97 644.78,477.21 639.17,474.18 638.75,474.94 					" />
											</g>
											<g className="navas551">
												<polygon className="navas153" points="643.95,478.19 644.37,477.42 638.89,474.46 638.47,475.22 					" />
											</g>
											<g className="navas552">
												<polygon className="navas153" points="643.55,478.4 643.97,477.64 638.6,474.74 638.18,475.5 					" />
											</g>
											<g className="navas553">
												<polygon className="navas554" points="643.15,478.62 643.57,477.85 638.32,475.01 637.9,475.78 					" />
											</g>
											<g className="navas555">
												<polygon className="navas155" points="642.74,478.83 643.16,478.07 638.04,475.29 637.61,476.05 					" />
											</g>
											<g className="navas556">
												<polygon className="navas557" points="642.34,479.05 642.76,478.28 637.75,475.57 637.33,476.33 					" />
											</g>
											<g className="navas558">
												<polygon className="navas155" points="641.93,479.26 642.36,478.5 637.47,475.85 637.05,476.61 					" />
											</g>
											<g className="navas559">
												<polygon className="navas157" points="641.53,479.48 641.95,478.71 637.19,476.12 636.76,476.88 					" />
											</g>
											<g className="navas560">
												<polygon className="navas561" points="641.13,479.69 641.55,478.93 636.9,476.4 636.48,477.16 					" />
											</g>
											<g className="navas562">
												<polygon className="navas561" points="640.72,479.91 641.15,479.14 636.62,476.68 636.2,477.44 					" />
											</g>
											<g className="navas563">
												<polygon className="navas159" points="640.32,480.12 640.74,479.36 636.34,476.95 635.91,477.72 					" />
											</g>
											<g className="navas564">
												<polygon className="navas159" points="639.91,480.34 640.34,479.57 636.05,477.23 635.63,477.99 					" />
											</g>
											<g className="navas565">
												<polygon className="navas566" points="639.51,480.55 639.94,479.79 635.77,477.51 635.34,478.27 					" />
											</g>
											<g className="navas567">
												<polygon className="navas568" points="639.11,480.77 639.53,480.01 635.49,477.79 635.06,478.55 					" />
											</g>
											<g className="navas569">
												<polygon className="navas570" points="638.7,480.98 639.13,480.22 635.2,478.07 634.77,478.83 					" />
											</g>
											<g className="navas571">
												<polygon className="navas163" points="638.3,481.2 638.73,480.44 634.92,478.34 634.49,479.1 					" />
											</g>
											<g className="navas572">
												<polygon className="navas163" points="637.89,481.41 638.32,480.65 634.63,478.62 634.21,479.38 					" />
											</g>
											<g className="navas573">
												<polygon className="navas574" points="637.49,481.63 637.92,480.87 634.35,478.9 633.92,479.66 					" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="637.09,481.85 637.52,481.08 634.07,479.18 633.64,479.94 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="636.68,482.06 637.11,481.3 633.78,479.45 633.35,480.21 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="636.28,482.28 636.71,481.51 633.5,479.73 633.07,480.49 					" />
											</g>
											<g>
												<polygon className="navas76" points="635.87,482.49 636.31,481.73 633.22,480.01 632.78,480.77 					" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M633.13,479.24c0.04-0.04,0.07-0.08,0.11-0.12l0.01-0.01l0,0c0.33-0.28,0.85-0.29,1.44,0.04
					c1.03,0.58,1.89,1.99,1.91,3.14c0.01,0.52-0.15,0.9-0.43,1.1l0,0l-4.09,3.32l-2.86-3.39L633.13,479.24z"/>
											<polygon className="navas71" points="632.07,482.91 628.45,480.86 628.52,485.26 632.15,487.32 				" />
											<polygon className="navas73" points="632.07,482.91 635.63,480.91 635.72,485.31 632.15,487.32 				" />
											<polygon className="navas72" points="632,478.86 635.63,480.91 632.07,482.91 628.45,480.86 				" />
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas81" points="686.66,432.12 687.07,431.38 654.44,414.66 654.04,415.39 					" />
											</g>
											<g className="navas428">
												<polygon className="navas429" points="685.87,432.55 686.28,431.81 653.95,415.24 653.54,415.97 					" />
											</g>
											<g className="navas430">
												<polygon className="navas431" points="685.09,432.98 685.49,432.24 653.46,415.81 653.05,416.54 					" />
											</g>
											<g className="navas432">
												<polygon className="navas97" points="684.3,433.41 684.7,432.67 652.97,416.38 652.56,417.11 					" />
											</g>
											<g className="navas433">
												<polygon className="navas434" points="683.51,433.83 683.92,433.09 652.47,416.95 652.07,417.68 					" />
											</g>
											<g className="navas435">
												<polygon className="navas436" points="682.73,434.26 683.13,433.52 651.98,417.52 651.57,418.25 					" />
											</g>
											<g className="navas437">
												<polygon className="navas99" points="681.94,434.69 682.34,433.95 651.49,418.1 651.08,418.83 					" />
											</g>
											<g className="navas438">
												<polygon className="navas439" points="681.15,435.12 681.55,434.38 651,418.67 650.59,419.4 					" />
											</g>
											<g className="navas440">
												<polygon className="navas441" points="680.36,435.54 680.77,434.8 650.5,419.24 650.1,419.97 					" />
											</g>
											<g className="navas442">
												<polygon className="navas101" points="679.57,435.97 679.98,435.23 650.01,419.81 649.6,420.55 					" />
											</g>
											<g className="navas443">
												<polygon className="navas444" points="678.79,436.4 679.19,435.66 649.52,420.39 649.11,421.12 					" />
											</g>
											<g className="navas445">
												<polygon className="navas444" points="678,436.83 678.4,436.09 649.02,420.96 648.62,421.69 					" />
											</g>
											<g className="navas446">
												<polygon className="navas447" points="677.21,437.26 677.62,436.52 648.53,421.53 648.12,422.26 					" />
											</g>
											<g className="navas448">
												<polygon className="navas447" points="676.42,437.68 676.83,436.94 648.04,422.11 647.63,422.84 					" />
											</g>
											<g className="navas449">
												<polygon className="navas105" points="675.63,438.11 676.04,437.37 647.54,422.68 647.14,423.41 					" />
											</g>
											<g className="navas450">
												<polygon className="navas451" points="674.85,438.54 675.25,437.8 647.05,423.25 646.64,423.99 					" />
											</g>
											<g className="navas452">
												<polygon className="navas451" points="674.06,438.97 674.46,438.23 646.56,423.83 646.15,424.56 					" />
											</g>
											<g className="navas453">
												<polygon className="navas107" points="673.27,439.4 673.67,438.66 646.06,424.4 645.65,425.13 					" />
											</g>
											<g className="navas454">
												<polygon className="navas455" points="672.48,439.82 672.89,439.08 645.57,424.97 645.16,425.71 					" />
											</g>
											<g className="navas456">
												<polygon className="navas457" points="671.69,440.25 672.1,439.51 645.07,425.55 644.66,426.28 					" />
											</g>
											<g className="navas458">
												<polygon className="navas109" points="670.9,440.68 671.31,439.94 644.58,426.12 644.17,426.86 					" />
											</g>
											<g className="navas459">
												<polygon className="navas111" points="670.11,441.11 670.52,440.37 644.08,426.7 643.68,427.43 					" />
											</g>
											<g className="navas460">
												<polygon className="navas111" points="669.33,441.54 669.73,440.8 643.59,427.27 643.18,428 					" />
											</g>
											<g className="navas461">
												<polygon className="navas462" points="668.54,441.97 668.94,441.23 643.1,427.85 642.69,428.58 					" />
											</g>
											<g className="navas463">
												<polygon className="navas464" points="667.75,442.39 668.15,441.65 642.6,428.42 642.19,429.15 					" />
											</g>
											<g className="navas465">
												<polygon className="navas466" points="666.96,442.82 667.37,442.08 642.11,429 641.7,429.73 					" />
											</g>
											<g className="navas467">
												<polygon className="navas113" points="666.17,443.25 666.58,442.51 641.61,429.57 641.2,430.3 					" />
											</g>
											<g className="navas468">
												<polygon className="navas469" points="665.38,443.68 665.79,442.94 641.12,430.15 640.71,430.88 					" />
											</g>
											<g className="navas470">
												<polygon className="navas115" points="664.59,444.11 665,443.37 640.62,430.72 640.21,431.46 					" />
											</g>
											<g className="navas471">
												<polygon className="navas472" points="663.8,444.54 664.21,443.8 640.13,431.3 639.72,432.03 					" />
											</g>
											<g className="navas473">
												<polygon className="navas117" points="663.01,444.97 663.42,444.22 639.63,431.87 639.22,432.61 					" />
											</g>
											<g className="navas474">
												<polygon className="navas117" points="662.22,445.4 662.63,444.65 639.13,432.45 638.72,433.18 					" />
											</g>
											<g className="navas475">
												<polygon className="navas117" points="661.43,445.82 661.84,445.08 638.64,433.02 638.23,433.76 					" />
											</g>
											<g className="navas476">
												<polygon className="navas477" points="660.64,446.25 661.05,445.51 638.14,433.6 637.73,434.33 					" />
											</g>
											<g className="navas478">
												<polygon className="navas119" points="659.85,446.68 660.26,445.94 637.65,434.18 637.24,434.91 					" />
											</g>
											<g className="navas479">
												<polygon className="navas480" points="659.06,447.11 659.47,446.37 637.15,434.75 636.74,435.49 					" />
											</g>
											<g className="navas481">
												<polygon className="navas121" points="658.27,447.54 658.68,446.8 636.66,435.33 636.24,436.06 					" />
											</g>
											<g className="navas482">
												<polygon className="navas483" points="657.48,447.97 657.89,447.23 636.16,435.9 635.75,436.64 					" />
											</g>
											<g className="navas484">
												<polygon className="navas483" points="656.69,448.4 657.1,447.65 635.66,436.48 635.25,437.22 					" />
											</g>
											<g className="navas485">
												<polygon className="navas486" points="655.9,448.83 656.31,448.08 635.17,437.06 634.75,437.79 					" />
											</g>
											<g className="navas487">
												<polygon className="navas488" points="655.11,449.26 655.52,448.51 634.67,437.63 634.26,438.37 					" />
											</g>
											<g className="navas489">
												<polygon className="navas490" points="654.32,449.68 654.73,448.94 634.17,438.21 633.76,438.95 					" />
											</g>
											<g className="navas491">
												<polygon className="navas490" points="653.53,450.11 653.94,449.37 633.68,438.79 633.26,439.53 					" />
											</g>
											<g className="navas492">
												<polygon className="navas493" points="652.74,450.54 653.15,449.8 633.18,439.37 632.77,440.1 					" />
											</g>
											<g className="navas494">
												<polygon className="navas493" points="651.95,450.97 652.36,450.23 632.68,439.94 632.27,440.68 					" />
											</g>
											<g className="navas495">
												<polygon className="navas127" points="651.16,451.4 651.57,450.66 632.18,440.52 631.77,441.26 					" />
											</g>
											<g className="navas496">
												<polygon className="navas497" points="650.37,451.83 650.78,451.09 631.69,441.1 631.27,441.84 					" />
											</g>
											<g className="navas498">
												<polygon className="navas129" points="649.58,452.26 649.99,451.52 631.19,441.68 630.78,442.42 					" />
											</g>
											<g className="navas499">
												<polygon className="navas129" points="648.79,452.69 649.2,451.95 630.69,442.25 630.28,442.99 					" />
											</g>
											<g className="navas500">
												<polygon className="navas501" points="648,453.12 648.41,452.38 630.19,442.83 629.78,443.57 					" />
											</g>
											<g className="navas502">
												<polygon className="navas131" points="647.21,453.55 647.62,452.81 629.7,443.41 629.28,444.15 					" />
											</g>
											<g className="navas503">
												<polygon className="navas131" points="646.42,453.98 646.83,453.23 629.2,443.99 628.79,444.73 					" />
											</g>
											<g className="navas504">
												<polygon className="navas505" points="645.63,454.41 646.04,453.66 628.7,444.57 628.29,445.31 					" />
											</g>
											<g className="navas506">
												<polygon className="navas507" points="644.83,454.84 645.25,454.09 628.2,445.15 627.79,445.89 					" />
											</g>
											<g className="navas508">
												<polygon className="navas133" points="644.04,455.27 644.46,454.52 627.7,445.73 627.29,446.47 					" />
											</g>
											<g className="navas509">
												<polygon className="navas510" points="643.25,455.7 643.67,454.95 627.21,446.3 626.79,447.04 					" />
											</g>
											<g className="navas511">
												<polygon className="navas135" points="642.46,456.13 642.87,455.38 626.71,446.88 626.29,447.62 					" />
											</g>
											<g className="navas512">
												<polygon className="navas513" points="641.67,456.56 642.08,455.81 626.21,447.46 625.79,448.2 					" />
											</g>
											<g className="navas514">
												<polygon className="navas135" points="640.88,456.99 641.29,456.24 625.71,448.04 625.3,448.78 					" />
											</g>
											<g className="navas515">
												<polygon className="navas137" points="640.09,457.42 640.5,456.67 625.21,448.62 624.8,449.36 					" />
											</g>
											<g className="navas516">
												<polygon className="navas137" points="639.29,457.85 639.71,457.1 624.71,449.2 624.3,449.94 					" />
											</g>
											<g className="navas517">
												<polygon className="navas518" points="638.5,458.28 638.92,457.53 624.21,449.78 623.8,450.52 					" />
											</g>
											<g className="navas519">
												<polygon className="navas520" points="637.71,458.71 638.13,457.96 623.71,450.36 623.3,451.1 					" />
											</g>
											<g className="navas521">
												<polygon className="navas522" points="636.92,459.14 637.33,458.39 623.22,450.94 622.8,451.68 					" />
											</g>
											<g className="navas523">
												<polygon className="navas524" points="636.13,459.57 636.54,458.82 622.72,451.52 622.3,452.26 					" />
											</g>
											<g className="navas525">
												<polygon className="navas526" points="635.34,460 635.75,459.25 622.22,452.1 621.8,452.84 					" />
											</g>
											<g className="navas527">
												<polygon className="navas528" points="634.54,460.43 634.96,459.68 621.72,452.68 621.3,453.42 					" />
											</g>
											<g className="navas529">
												<polygon className="navas143" points="633.75,460.86 634.17,460.11 621.22,453.26 620.8,454.01 					" />
											</g>
											<g className="navas530">
												<polygon className="navas531" points="632.96,461.29 633.37,460.54 620.72,453.84 620.3,454.59 					" />
											</g>
											<g className="navas532">
												<polygon className="navas533" points="632.17,461.72 632.58,460.97 620.22,454.43 619.8,455.17 					" />
											</g>
											<g className="navas534">
												<polygon className="navas145" points="631.37,462.15 631.79,461.4 619.72,455.01 619.3,455.75 					" />
											</g>
											<g className="navas535">
												<polygon className="navas145" points="630.58,462.58 631,461.83 619.22,455.59 618.8,456.33 					" />
											</g>
											<g className="navas536">
												<polygon className="navas537" points="629.79,463.01 630.2,462.26 618.72,456.17 618.3,456.91 					" />
											</g>
											<g className="navas538">
												<polygon className="navas147" points="629,463.44 629.41,462.69 618.21,456.75 617.8,457.49 					" />
											</g>
											<g className="navas539">
												<polygon className="navas540" points="628.2,463.87 628.62,463.12 617.71,457.33 617.3,458.07 					" />
											</g>
											<g className="navas541">
												<polygon className="navas542" points="627.41,464.3 627.83,463.55 617.21,457.91 616.8,458.66 					" />
											</g>
											<g className="navas543">
												<polygon className="navas149" points="626.62,464.73 627.04,463.98 616.71,458.5 616.29,459.24 					" />
											</g>
											<g className="navas544">
												<polygon className="navas545" points="625.82,465.16 626.24,464.41 616.21,459.08 615.79,459.82 					" />
											</g>
											<g className="navas546">
												<polygon className="navas547" points="625.03,465.59 625.45,464.85 615.71,459.66 615.29,460.4 					" />
											</g>
											<g className="navas548">
												<polygon className="navas549" points="624.24,466.02 624.66,465.28 615.21,460.24 614.79,460.99 					" />
											</g>
											<g className="navas550">
												<polygon className="navas549" points="623.45,466.45 623.86,465.71 614.71,460.83 614.29,461.57 					" />
											</g>
											<g className="navas551">
												<polygon className="navas153" points="622.65,466.88 623.07,466.14 614.21,461.41 613.79,462.15 					" />
											</g>
											<g className="navas552">
												<polygon className="navas153" points="621.86,467.31 622.28,466.57 613.7,461.99 613.29,462.73 					" />
											</g>
											<g className="navas553">
												<polygon className="navas554" points="621.07,467.75 621.48,467 613.2,462.57 612.78,463.32 					" />
											</g>
											<g className="navas555">
												<polygon className="navas155" points="620.27,468.18 620.69,467.43 612.7,463.16 612.28,463.9 					" />
											</g>
											<g className="navas556">
												<polygon className="navas557" points="619.48,468.61 619.9,467.86 612.2,463.74 611.78,464.48 					" />
											</g>
											<g className="navas558">
												<polygon className="navas155" points="618.68,469.04 619.11,468.29 611.7,464.32 611.28,465.07 					" />
											</g>
											<g className="navas559">
												<polygon className="navas157" points="617.89,469.47 618.31,468.72 611.2,464.91 610.77,465.65 					" />
											</g>
											<g className="navas560">
												<polygon className="navas561" points="617.1,469.9 617.52,469.15 610.69,465.49 610.27,466.23 					" />
											</g>
											<g className="navas562">
												<polygon className="navas561" points="616.3,470.33 616.72,469.58 610.19,466.07 609.77,466.82 					" />
											</g>
											<g className="navas563">
												<polygon className="navas159" points="615.51,470.76 615.93,470.02 609.69,466.66 609.27,467.4 					" />
											</g>
											<g className="navas564">
												<polygon className="navas159" points="614.72,471.19 615.14,470.45 609.19,467.24 608.76,467.99 					" />
											</g>
											<g className="navas565">
												<polygon className="navas566" points="613.92,471.62 614.34,470.88 608.68,467.83 608.26,468.57 					" />
											</g>
											<g className="navas567">
												<polygon className="navas568" points="613.13,472.06 613.55,471.31 608.18,468.41 607.76,469.16 					" />
											</g>
											<g className="navas569">
												<polygon className="navas570" points="612.33,472.49 612.76,471.74 607.68,469 607.25,469.74 					" />
											</g>
											<g className="navas571">
												<polygon className="navas163" points="611.54,472.92 611.96,472.17 607.17,469.58 606.75,470.32 					" />
											</g>
											<g className="navas572">
												<polygon className="navas163" points="610.74,473.35 611.17,472.6 606.67,470.16 606.25,470.91 					" />
											</g>
											<g className="navas573">
												<polygon className="navas574" points="609.95,473.78 610.37,473.03 606.17,470.75 605.74,471.49 					" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="609.15,474.21 609.58,473.47 605.66,471.33 605.24,472.08 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="608.36,474.64 608.79,473.9 605.16,471.92 604.73,472.66 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="607.56,475.07 607.99,474.33 604.66,472.51 604.23,473.25 					" />
											</g>
											<g>
												<polygon className="navas76" points="606.77,475.51 607.2,474.76 604.15,473.09 603.73,473.83 					" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M604.08,472.34c0.03-0.04,0.07-0.08,0.11-0.12l0.01-0.01l0,0c0.33-0.27,0.84-0.28,1.42,0.04
					c1.02,0.56,1.85,1.94,1.87,3.06c0.01,0.51-0.15,0.88-0.42,1.08l0,0l-4.05,3.26l-2.81-3.31L604.08,472.34z"/>
											<polygon className="navas71" points="603.02,475.93 599.44,473.94 599.5,478.24 603.08,480.24 				" />
											<polygon className="navas73" points="603.02,475.93 606.54,473.96 606.6,478.26 603.08,480.24 				" />
											<polygon className="navas72" points="602.96,471.97 606.54,473.96 603.02,475.93 599.44,473.94 				" />
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas81" points="742.76,461.08 742.78,460.23 697.01,457.09 696.98,457.93 					" />
											</g>
											<g className="navas428">
												<polygon className="navas429" points="742.54,461.81 742.57,460.96 697.21,457.82 697.18,458.67 					" />
											</g>
											<g className="navas430">
												<polygon className="navas431" points="742.33,462.54 742.35,461.68 697.41,458.56 697.38,459.41 					" />
											</g>
											<g className="navas432">
												<polygon className="navas97" points="742.11,463.27 742.14,462.41 697.61,459.3 697.57,460.15 					" />
											</g>
											<g className="navas433">
												<polygon className="navas434" points="741.9,464 741.92,463.14 697.81,460.04 697.77,460.89 					" />
											</g>
											<g className="navas435">
												<polygon className="navas436" points="741.68,464.73 741.71,463.87 698.01,460.78 697.97,461.63 					" />
											</g>
											<g className="navas437">
												<polygon className="navas99" points="741.47,465.46 741.49,464.6 698.2,461.52 698.17,462.37 					" />
											</g>
											<g className="navas438">
												<polygon className="navas439" points="741.25,466.19 741.28,465.33 698.4,462.26 698.37,463.11 					" />
											</g>
											<g className="navas440">
												<polygon className="navas441" points="741.04,466.92 741.06,466.06 698.6,463.01 698.57,463.86 					" />
											</g>
											<g className="navas442">
												<polygon className="navas101" points="740.82,467.65 740.85,466.79 698.8,463.75 698.76,464.6 					" />
											</g>
											<g className="navas443">
												<polygon className="navas444" points="740.61,468.38 740.63,467.53 699,464.49 698.96,465.34 					" />
											</g>
											<g className="navas445">
												<polygon className="navas444" points="740.39,469.11 740.42,468.26 699.2,465.23 699.16,466.08 					" />
											</g>
											<g className="navas446">
												<polygon className="navas447" points="740.17,469.85 740.2,468.99 699.4,465.97 699.36,466.83 					" />
											</g>
											<g className="navas448">
												<polygon className="navas447" points="739.96,470.58 739.99,469.72 699.6,466.72 699.56,467.57 					" />
											</g>
											<g className="navas449">
												<polygon className="navas105" points="739.74,471.31 739.77,470.45 699.8,467.46 699.76,468.31 					" />
											</g>
											<g className="navas450">
												<polygon className="navas451" points="739.53,472.04 739.56,471.18 700,468.2 699.96,469.06 					" />
											</g>
											<g className="navas452">
												<polygon className="navas451" points="739.31,472.78 739.34,471.92 700.2,468.95 700.16,469.8 					" />
											</g>
											<g className="navas453">
												<polygon className="navas107" points="739.09,473.51 739.12,472.65 700.4,469.69 700.36,470.55 					" />
											</g>
											<g className="navas454">
												<polygon className="navas455" points="738.88,474.24 738.91,473.38 700.6,470.44 700.56,471.29 					" />
											</g>
											<g className="navas456">
												<polygon className="navas457" points="738.66,474.98 738.69,474.12 700.8,471.18 700.75,472.04 					" />
											</g>
											<g className="navas458">
												<polygon className="navas109" points="738.44,475.71 738.48,474.85 701,471.93 700.95,472.78 					" />
											</g>
											<g className="navas459">
												<polygon className="navas111" points="738.23,476.45 738.26,475.58 701.2,472.67 701.15,473.53 					" />
											</g>
											<g className="navas460">
												<polygon className="navas111" points="738.01,477.18 738.04,476.32 701.4,473.42 701.35,474.27 					" />
											</g>
											<g className="navas461">
												<polygon className="navas462" points="737.79,477.91 737.83,477.05 701.6,474.16 701.55,475.02 					" />
											</g>
											<g className="navas463">
												<polygon className="navas464" points="737.58,478.65 737.61,477.79 701.8,474.91 701.75,475.77 					" />
											</g>
											<g className="navas465">
												<polygon className="navas466" points="737.36,479.39 737.39,478.52 702,475.66 701.95,476.51 					" />
											</g>
											<g className="navas467">
												<polygon className="navas113" points="737.14,480.12 737.18,479.26 702.2,476.4 702.15,477.26 					" />
											</g>
											<g className="navas468">
												<polygon className="navas469" points="736.93,480.86 736.96,479.99 702.4,477.15 702.35,478.01 					" />
											</g>
											<g className="navas470">
												<polygon className="navas115" points="736.71,481.59 736.74,480.73 702.6,477.9 702.55,478.76 					" />
											</g>
											<g className="navas471">
												<polygon className="navas472" points="736.49,482.33 736.53,481.47 702.8,478.65 702.75,479.51 					" />
											</g>
											<g className="navas473">
												<polygon className="navas117" points="736.27,483.07 736.31,482.2 703,479.4 702.95,480.26 					" />
											</g>
											<g className="navas474">
												<polygon className="navas117" points="736.06,483.8 736.09,482.94 703.2,480.15 703.16,481.01 					" />
											</g>
											<g className="navas475">
												<polygon className="navas117" points="735.84,484.54 735.88,483.68 703.4,480.9 703.36,481.76 					" />
											</g>
											<g className="navas476">
												<polygon className="navas477" points="735.62,485.28 735.66,484.42 703.6,481.65 703.56,482.51 					" />
											</g>
											<g className="navas478">
												<polygon className="navas119" points="735.4,486.02 735.44,485.15 703.81,482.4 703.76,483.26 					" />
											</g>
											<g className="navas479">
												<polygon className="navas480" points="735.18,486.76 735.23,485.89 704.01,483.15 703.96,484.01 					" />
											</g>
											<g className="navas481">
												<polygon className="navas121" points="734.97,487.49 735.01,486.63 704.21,483.9 704.16,484.76 					" />
											</g>
											<g className="navas482">
												<polygon className="navas483" points="734.75,488.23 734.79,487.37 704.41,484.65 704.36,485.51 					" />
											</g>
											<g className="navas484">
												<polygon className="navas483" points="734.53,488.97 734.57,488.11 704.61,485.4 704.56,486.26 					" />
											</g>
											<g className="navas485">
												<polygon className="navas486" points="734.31,489.71 734.36,488.85 704.81,486.15 704.76,487.01 					" />
											</g>
											<g className="navas487">
												<polygon className="navas488" points="734.09,490.45 734.14,489.58 705.02,486.91 704.96,487.77 					" />
											</g>
											<g className="navas489">
												<polygon className="navas490" points="733.87,491.19 733.92,490.32 705.22,487.66 705.17,488.52 					" />
											</g>
											<g className="navas491">
												<polygon className="navas490" points="733.66,491.93 733.7,491.06 705.42,488.41 705.37,489.27 					" />
											</g>
											<g className="navas492">
												<polygon className="navas493" points="733.44,492.67 733.49,491.8 705.62,489.16 705.57,490.03 					" />
											</g>
											<g className="navas494">
												<polygon className="navas493" points="733.22,493.41 733.27,492.55 705.83,489.92 705.77,490.78 					" />
											</g>
											<g className="navas495">
												<polygon className="navas127" points="733,494.15 733.05,493.29 706.03,490.67 705.97,491.54 					" />
											</g>
											<g className="navas496">
												<polygon className="navas497" points="732.78,494.89 732.83,494.03 706.23,491.43 706.17,492.29 					" />
											</g>
											<g className="navas498">
												<polygon className="navas129" points="732.56,495.64 732.61,494.77 706.43,492.18 706.38,493.05 					" />
											</g>
											<g className="navas499">
												<polygon className="navas129" points="732.34,496.38 732.4,495.51 706.64,492.94 706.58,493.8 					" />
											</g>
											<g className="navas500">
												<polygon className="navas501" points="732.12,497.12 732.18,496.25 706.84,493.69 706.78,494.56 					" />
											</g>
											<g className="navas502">
												<polygon className="navas131" points="731.9,497.86 731.96,496.99 707.04,494.45 706.98,495.31 					" />
											</g>
											<g className="navas503">
												<polygon className="navas131" points="731.68,498.61 731.74,497.74 707.25,495.2 707.18,496.07 					" />
											</g>
											<g className="navas504">
												<polygon className="navas505" points="731.47,499.35 731.52,498.48 707.45,495.96 707.39,496.83 					" />
											</g>
											<g className="navas506">
												<polygon className="navas507" points="731.25,500.09 731.3,499.22 707.65,496.72 707.59,497.58 					" />
											</g>
											<g className="navas508">
												<polygon className="navas133" points="731.03,500.84 731.08,499.97 707.86,497.48 707.79,498.34 					" />
											</g>
											<g className="navas509">
												<polygon className="navas510" points="730.81,501.58 730.87,500.71 708.06,498.23 707.99,499.1 					" />
											</g>
											<g className="navas511">
												<polygon className="navas135" points="730.59,502.32 730.65,501.45 708.26,498.99 708.2,499.86 					" />
											</g>
											<g className="navas512">
												<polygon className="navas513" points="730.37,503.07 730.43,502.2 708.47,499.75 708.4,500.62 					" />
											</g>
											<g className="navas514">
												<polygon className="navas135" points="730.15,503.81 730.21,502.94 708.67,500.51 708.6,501.38 					" />
											</g>
											<g className="navas515">
												<polygon className="navas137" points="729.93,504.56 729.99,503.69 708.88,501.27 708.8,502.13 					" />
											</g>
											<g className="navas516">
												<polygon className="navas137" points="729.71,505.3 729.77,504.43 709.08,502.03 709.01,502.89 					" />
											</g>
											<g className="navas517">
												<polygon className="navas518" points="729.48,506.05 729.55,505.18 709.28,502.79 709.21,503.65 					" />
											</g>
											<g className="navas519">
												<polygon className="navas520" points="729.26,506.79 729.33,505.92 709.49,503.55 709.41,504.41 					" />
											</g>
											<g className="navas521">
												<polygon className="navas522" points="729.04,507.54 729.12,506.67 709.69,504.31 709.62,505.18 					" />
											</g>
											<g className="navas523">
												<polygon className="navas524" points="728.82,508.29 728.9,507.42 709.9,505.07 709.82,505.94 					" />
											</g>
											<g className="navas525">
												<polygon className="navas526" points="728.6,509.03 728.68,508.16 710.1,505.83 710.02,506.7 					" />
											</g>
											<g className="navas527">
												<polygon className="navas528" points="728.38,509.78 728.46,508.91 710.31,506.59 710.23,507.46 					" />
											</g>
											<g className="navas529">
												<polygon className="navas143" points="728.16,510.53 728.24,509.66 710.51,507.35 710.43,508.22 					" />
											</g>
											<g className="navas530">
												<polygon className="navas531" points="727.94,511.28 728.02,510.4 710.72,508.12 710.63,508.98 					" />
											</g>
											<g className="navas532">
												<polygon className="navas533" points="727.72,512.02 727.8,511.15 710.92,508.88 710.84,509.75 					" />
											</g>
											<g className="navas534">
												<polygon className="navas145" points="727.49,512.77 727.58,511.9 711.13,509.64 711.04,510.51 					" />
											</g>
											<g className="navas535">
												<polygon className="navas145" points="727.27,513.52 727.36,512.65 711.34,510.4 711.24,511.27 					" />
											</g>
											<g className="navas536">
												<polygon className="navas537" points="727.05,514.27 727.14,513.4 711.54,511.17 711.45,512.04 					" />
											</g>
											<g className="navas538">
												<polygon className="navas147" points="726.83,515.02 726.92,514.14 711.75,511.93 711.65,512.8 					" />
											</g>
											<g className="navas539">
												<polygon className="navas540" points="726.61,515.77 726.7,514.89 711.95,512.7 711.85,513.57 					" />
											</g>
											<g className="navas541">
												<polygon className="navas542" points="726.38,516.51 726.48,515.64 712.16,513.46 712.06,514.33 					" />
											</g>
											<g className="navas543">
												<polygon className="navas149" points="726.16,517.26 726.26,516.39 712.37,514.23 712.26,515.1 					" />
											</g>
											<g className="navas544">
												<polygon className="navas545" points="725.94,518.01 726.05,517.14 712.57,514.99 712.46,515.86 					" />
											</g>
											<g className="navas546">
												<polygon className="navas547" points="725.72,518.76 725.83,517.89 712.78,515.76 712.67,516.63 					" />
											</g>
											<g className="navas548">
												<polygon className="navas549" points="725.49,519.52 725.61,518.64 712.99,516.53 712.87,517.4 					" />
											</g>
											<g className="navas550">
												<polygon className="navas549" points="725.27,520.27 725.39,519.4 713.2,517.29 713.07,518.16 					" />
											</g>
											<g className="navas551">
												<polygon className="navas153" points="725.04,521.02 725.17,520.15 713.4,518.06 713.28,518.93 					" />
											</g>
											<g className="navas552">
												<polygon className="navas153" points="724.82,521.77 724.95,520.9 713.61,518.83 713.48,519.7 					" />
											</g>
											<g className="navas553">
												<polygon className="navas554" points="724.6,522.52 724.73,521.65 713.82,519.6 713.68,520.46 					" />
											</g>
											<g className="navas555">
												<polygon className="navas155" points="724.37,523.27 724.51,522.4 714.03,520.37 713.89,521.23 					" />
											</g>
											<g className="navas556">
												<polygon className="navas557" points="724.15,524.02 724.29,523.16 714.24,521.13 714.09,522 					" />
											</g>
											<g className="navas558">
												<polygon className="navas155" points="723.92,524.78 724.07,523.91 714.45,521.9 714.29,522.77 					" />
											</g>
											<g className="navas559">
												<polygon className="navas157" points="723.7,525.53 723.86,524.66 714.66,522.67 714.5,523.54 					" />
											</g>
											<g className="navas560">
												<polygon className="navas561" points="723.47,526.28 723.64,525.42 714.87,523.44 714.7,524.31 					" />
											</g>
											<g className="navas562">
												<polygon className="navas561" points="723.24,527.03 723.42,526.17 715.08,524.22 714.9,525.08 					" />
											</g>
											<g className="navas563">
												<polygon className="navas159" points="723.02,527.79 723.2,526.93 715.29,524.99 715.1,525.85 					" />
											</g>
											<g className="navas564">
												<polygon className="navas159" points="722.79,528.54 722.99,527.68 715.5,525.76 715.3,526.61 					" />
											</g>
											<g className="navas565">
												<polygon className="navas566" points="722.56,529.29 722.77,528.44 715.71,526.53 715.5,527.38 					" />
											</g>
											<g className="navas567">
												<polygon className="navas568" points="722.33,530.04 722.55,529.19 715.93,527.3 715.7,528.15 					" />
											</g>
											<g className="navas569">
												<polygon className="navas570" points="722.1,530.8 722.34,529.95 716.14,528.08 715.9,528.92 					" />
											</g>
											<g className="navas571">
												<polygon className="navas163" points="721.87,531.55 722.12,530.71 716.35,528.85 716.1,529.69 					" />
											</g>
											<g className="navas572">
												<polygon className="navas163" points="721.64,532.3 721.91,531.47 716.57,529.63 716.3,530.46 					" />
											</g>
											<g className="navas573">
												<polygon className="navas574" points="721.41,533.05 721.7,532.22 716.79,530.4 716.5,531.23 					" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="721.17,533.81 721.49,532.99 717.01,531.18 716.69,532 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="720.93,534.56 721.28,533.75 717.23,531.96 716.88,532.77 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="720.69,535.31 721.07,534.51 717.46,532.74 717.07,533.54 					" />
											</g>
											<g>

												<rect x="718.63" y="532.97" transform="matrix(0.4804 -0.8771 0.8771 0.4804 -95.4018 908.553)" className="navas76" width="0.88" height="3.64" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M717.58,532.75c0.03-0.04,0.07-0.08,0.11-0.12l0.01-0.01l0,0c0.33-0.28,0.86-0.29,1.47,0.05
					c1.07,0.59,1.97,2.02,2.02,3.19c0.02,0.53-0.13,0.91-0.41,1.12l0,0l-4.1,3.37l-3-3.45L717.58,532.75z"/>
											<polygon className="navas71" points="716.59,536.47 712.84,534.39 713.02,538.85 716.77,540.95 				" />
											<polygon className="navas73" points="716.59,536.47 720.17,534.44 720.35,538.91 716.76,540.95 				" />
											<polygon className="navas72" points="716.42,532.36 720.17,534.44 716.59,536.47 712.84,534.39 				" />
										</g>
									</g>
									<g>
										<g>
											<g className="navas95">
												<polygon className="navas81" points="702.18,463.95 702.55,463.16 682.41,453.82 682.05,454.6 					" />
											</g>
											<g className="navas428">
												<polygon className="navas429" points="701.8,464.28 702.17,463.49 682.2,454.22 681.83,455 					" />
											</g>
											<g className="navas430">
												<polygon className="navas431" points="701.42,464.61 701.79,463.82 681.99,454.63 681.62,455.41 					" />
											</g>
											<g className="navas432">
												<polygon className="navas97" points="701.04,464.94 701.41,464.15 681.78,455.03 681.41,455.81 					" />
											</g>
											<g className="navas433">
												<polygon className="navas434" points="700.67,465.27 701.03,464.48 681.57,455.43 681.2,456.21 					" />
											</g>
											<g className="navas435">
												<polygon className="navas436" points="700.29,465.6 700.65,464.81 681.36,455.83 680.99,456.62 					" />
											</g>
											<g className="navas437">

												<rect x="690.09" y="450.53" transform="matrix(0.423 -0.9061 0.9061 0.423 -19.3498 891.7737)" className="navas99" width="0.87" height="21.1" />
											</g>
											<g className="navas438">
												<polygon className="navas439" points="699.53,466.25 699.89,465.47 680.93,456.64 680.56,457.42 					" />
											</g>
											<g className="navas440">
												<polygon className="navas441" points="699.15,466.58 699.51,465.8 680.72,457.04 680.35,457.82 					" />
											</g>
											<g className="navas442">
												<polygon className="navas101" points="698.77,466.91 699.13,466.13 680.51,457.45 680.14,458.23 					" />
											</g>
											<g className="navas443">
												<polygon className="navas444" points="698.39,467.24 698.75,466.46 680.3,457.85 679.93,458.63 					" />
											</g>
											<g className="navas445">
												<polygon className="navas444" points="698.01,467.57 698.37,466.79 680.09,458.25 679.72,459.03 					" />
											</g>
											<g className="navas446">
												<polygon className="navas447" points="697.63,467.9 697.99,467.12 679.88,458.66 679.51,459.44 					" />
											</g>
											<g className="navas448">
												<polygon className="navas447" points="697.24,468.23 697.61,467.44 679.66,459.06 679.29,459.84 					" />
											</g>
											<g className="navas449">
												<polygon className="navas105" points="696.86,468.56 697.23,467.77 679.45,459.46 679.08,460.24 					" />
											</g>
											<g className="navas450">

												<rect x="687.43" y="454.65" transform="matrix(0.4247 -0.9053 0.9053 0.4247 -24.6783 889.9188)" className="navas451" width="0.87" height="19.45" />
											</g>
											<g className="navas452">
												<polygon className="navas451" points="696.1,469.22 696.47,468.43 679.03,460.27 678.66,461.05 					" />
											</g>
											<g className="navas453">
												<polygon className="navas107" points="695.72,469.55 696.09,468.76 678.82,460.67 678.44,461.45 					" />
											</g>
											<g className="navas454">

												<rect x="686.54" y="456.03" transform="matrix(0.4252 -0.9051 0.9051 0.4252 -26.4502 889.3018)" className="navas455" width="0.87" height="18.9" />
											</g>
											<g className="navas456">

												<rect x="686.24" y="456.49" transform="matrix(0.4253 -0.9051 0.9051 0.4253 -26.9818 889.1948)" className="navas457" width="0.87" height="18.71" />
											</g>
											<g className="navas458">

												<rect x="685.95" y="456.95" transform="matrix(0.4258 -0.9048 0.9048 0.4258 -27.7105 888.7548)" className="navas109" width="0.87" height="18.53" />
											</g>
											<g className="navas459">

												<rect x="685.65" y="457.41" transform="matrix(0.4258 -0.9048 0.9048 0.4258 -28.2313 888.6663)" className="navas111" width="0.87" height="18.34" />
											</g>
											<g className="navas460">

												<rect x="685.35" y="457.86" transform="matrix(0.4259 -0.9048 0.9048 0.4259 -28.7519 888.5771)" className="navas111" width="0.87" height="18.16" />
											</g>
											<g className="navas461">

												<rect x="685.06" y="458.32" transform="matrix(0.4259 -0.9048 0.9048 0.4259 -29.2729 888.4879)" className="navas462" width="0.87" height="17.98" />
											</g>
											<g className="navas463">

												<rect x="684.76" y="458.78" transform="matrix(0.4264 -0.9045 0.9045 0.4264 -30.0212 888.0115)" className="navas464" width="0.87" height="17.79" />
											</g>
											<g className="navas465">

												<rect x="684.46" y="459.24" transform="matrix(0.4265 -0.9045 0.9045 0.4265 -30.5316 887.9405)" className="navas466" width="0.87" height="17.61" />
											</g>
											<g className="navas467">

												<rect x="684.17" y="459.7" transform="matrix(0.427 -0.9043 0.9043 0.427 -31.2638 887.4902)" className="navas113" width="0.87" height="17.42" />
											</g>
											<g className="navas468">

												<rect x="683.87" y="460.16" transform="matrix(0.427 -0.9043 0.9043 0.427 -31.7841 887.4008)" className="navas469" width="0.87" height="17.24" />
											</g>
											<g className="navas470">

												<rect x="683.57" y="460.62" transform="matrix(0.4275 -0.904 0.904 0.4275 -32.5098 886.9599)" className="navas115" width="0.87" height="17.06" />
											</g>
											<g className="navas471">

												<rect x="683.28" y="461.08" transform="matrix(0.4275 -0.904 0.904 0.4275 -33.0408 886.8527)" className="navas472" width="0.87" height="16.87" />
											</g>
											<g className="navas473">

												<rect x="682.98" y="461.54" transform="matrix(0.4276 -0.904 0.904 0.4276 -33.5608 886.7632)" className="navas117" width="0.87" height="16.69" />
											</g>
											<g className="navas474">

												<rect x="682.68" y="462" transform="matrix(0.4281 -0.9037 0.9037 0.4281 -34.2958 886.304)" className="navas117" width="0.87" height="16.51" />
											</g>
											<g className="navas475">

												<rect x="682.39" y="462.46" transform="matrix(0.4281 -0.9038 0.9038 0.4281 -34.785 886.2673)" className="navas117" width="0.87" height="16.32" />
											</g>
											<g className="navas476">

												<rect x="682.09" y="462.92" transform="matrix(0.4282 -0.9037 0.9037 0.4282 -35.3361 886.125)" className="navas477" width="0.87" height="16.14" />
											</g>
											<g className="navas478">

												<rect x="681.79" y="463.38" transform="matrix(0.4286 -0.9035 0.9035 0.4286 -36.0483 885.7028)" className="navas119" width="0.87" height="15.95" />
											</g>
											<g className="navas479">

												<rect x="681.5" y="463.83" transform="matrix(0.4287 -0.9035 0.9035 0.4287 -36.5681 885.613)" className="navas480" width="0.87" height="15.77" />
											</g>
											<g className="navas481">

												<rect x="681.2" y="464.29" transform="matrix(0.4287 -0.9035 0.9035 0.4287 -37.0791 885.5396)" className="navas121" width="0.87" height="15.59" />
											</g>
											<g className="navas482">

												<rect x="680.9" y="464.75" transform="matrix(0.4292 -0.9032 0.9032 0.4292 -37.8209 885.0637)" className="navas483" width="0.87" height="15.4" />
											</g>
											<g className="navas484">

												<rect x="680.6" y="465.21" transform="matrix(0.4297 -0.903 0.903 0.4297 -38.54 884.6255)" className="navas483" width="0.87" height="15.22" />
											</g>
											<g className="navas485">

												<rect x="680.31" y="465.67" transform="matrix(0.4302 -0.9027 0.9027 0.4302 -39.2815 884.1472)" className="navas486" width="0.87" height="15.03" />
											</g>
											<g className="navas487">

												<rect x="680.01" y="466.13" transform="matrix(0.4302 -0.9027 0.9027 0.4302 -39.7905 884.0754)" className="navas488" width="0.87" height="14.85" />
											</g>
											<g className="navas489">

												<rect x="679.71" y="466.59" transform="matrix(0.4303 -0.9027 0.9027 0.4303 -40.3087 883.9878)" className="navas490" width="0.87" height="14.66" />
											</g>
											<g className="navas491">

												<rect x="679.42" y="467.05" transform="matrix(0.4308 -0.9025 0.9025 0.4308 -41.04 883.5249)" className="navas490" width="0.87" height="14.48" />
											</g>
											<g className="navas492">

												<rect x="679.12" y="467.51" transform="matrix(0.4308 -0.9024 0.9024 0.4308 -41.568 883.4189)" className="navas493" width="0.87" height="14.3" />
											</g>
											<g className="navas494">

												<rect x="678.82" y="467.98" transform="matrix(0.4313 -0.9022 0.9022 0.4313 -42.2645 883.0159)" className="navas493" width="0.87" height="14.11" />
											</g>
											<g className="navas495">

												<rect x="678.52" y="468.44" transform="matrix(0.4313 -0.9022 0.9022 0.4313 -42.7837 882.9257)" className="navas127" width="0.87" height="13.93" />
											</g>
											<g className="navas496">

												<rect x="678.23" y="468.9" transform="matrix(0.4318 -0.902 0.902 0.4318 -43.5115 882.4647)" className="navas497" width="0.87" height="13.74" />
											</g>
											<g className="navas498">

												<rect x="677.93" y="469.36" transform="matrix(0.4319 -0.9019 0.9019 0.4319 -44.0407 882.3561)" className="navas129" width="0.87" height="13.56" />
											</g>
											<g className="navas499">

												<rect x="677.63" y="469.82" transform="matrix(0.4328 -0.9015 0.9015 0.4328 -44.9633 881.546)" className="navas129" width="0.87" height="13.38" />
											</g>
											<g className="navas500">

												<rect x="677.33" y="470.28" transform="matrix(0.4328 -0.9015 0.9015 0.4328 -45.461 881.4927)" className="navas501" width="0.87" height="13.19" />
											</g>
											<g className="navas502">

												<rect x="677.04" y="470.74" transform="matrix(0.4329 -0.9015 0.9015 0.4329 -46.0028 881.3607)" className="navas131" width="0.87" height="13.01" />
											</g>
											<g className="navas503">

												<rect x="676.74" y="471.2" transform="matrix(0.4333 -0.9012 0.9012 0.4333 -46.6959 880.9568)" className="navas131" width="0.87" height="12.82" />
											</g>
											<g className="navas504">

												<rect x="676.44" y="471.66" transform="matrix(0.4338 -0.901 0.901 0.4338 -47.4296 880.479)" className="navas505" width="0.87" height="12.64" />
											</g>
											<g className="navas506">

												<rect x="676.14" y="472.12" transform="matrix(0.4339 -0.901 0.901 0.4339 -47.9489 880.3862)" className="navas507" width="0.87" height="12.45" />
											</g>
											<g className="navas508">

												<rect x="675.84" y="472.58" transform="matrix(0.4344 -0.9007 0.9007 0.4344 -48.6712 879.9263)" className="navas133" width="0.87" height="12.27" />
											</g>
											<g className="navas509">

												<rect x="675.55" y="473.04" transform="matrix(0.4348 -0.9005 0.9005 0.4348 -49.3847 879.4821)" className="navas510" width="0.87" height="12.08" />
											</g>
											<g className="navas511">

												<rect x="675.25" y="473.5" transform="matrix(0.4353 -0.9003 0.9003 0.4353 -50.1069 879.0195)" className="navas135" width="0.87" height="11.9" />
											</g>
											<g className="navas512">

												<rect x="674.95" y="473.97" transform="matrix(0.4358 -0.9 0.9 0.4358 -50.8272 878.5593)" className="navas513" width="0.87" height="11.72" />
											</g>
											<g className="navas514">

												<rect x="674.65" y="474.43" transform="matrix(0.4359 -0.9 0.9 0.4359 -51.3558 878.4476)" className="navas135" width="0.87" height="11.53" />
											</g>
											<g className="navas515">

												<rect x="674.36" y="474.89" transform="matrix(0.4364 -0.8998 0.8998 0.4364 -52.065 878.0057)" className="navas137" width="0.87" height="11.35" />
											</g>
											<g className="navas516">

												<rect x="674.06" y="475.35" transform="matrix(0.4368 -0.8995 0.8995 0.4368 -52.7659 877.5778)" className="navas137" width="0.87" height="11.16" />
											</g>
											<g className="navas517">

												<rect x="673.76" y="475.81" transform="matrix(0.4373 -0.8993 0.8993 0.4373 -53.4853 877.1143)" className="navas518" width="0.87" height="10.98" />
											</g>
											<g className="navas519">

												<rect x="673.46" y="476.27" transform="matrix(0.438 -0.899 0.899 0.438 -54.2848 876.502)" className="navas520" width="0.87" height="10.79" />
											</g>
											<g className="navas521">

												<rect x="673.16" y="476.73" transform="matrix(0.4383 -0.8988 0.8988 0.4383 -54.9017 876.2246)" className="navas522" width="0.87" height="10.61" />
											</g>
											<g className="navas523">

												<rect x="672.86" y="477.2" transform="matrix(0.4383 -0.8988 0.8988 0.4383 -55.4176 876.1334)" className="navas524" width="0.87" height="10.42" />
											</g>
											<g className="navas525">

												<rect x="672.57" y="477.66" transform="matrix(0.4393 -0.8984 0.8984 0.4393 -56.3349 875.2975)" className="navas526" width="0.87" height="10.24" />
											</g>
											<g className="navas527">

												<rect x="672.27" y="478.12" transform="matrix(0.4398 -0.8981 0.8981 0.4398 -57.0422 874.8499)" className="navas528" width="0.87" height="10.05" />
											</g>
											<g className="navas529">

												<rect x="671.97" y="478.58" transform="matrix(0.4407 -0.8977 0.8977 0.4407 -57.9561 874.0135)" className="navas143" width="0.87" height="9.87" />
											</g>
											<g className="navas530">

												<rect x="671.67" y="479.04" transform="matrix(0.4408 -0.8976 0.8976 0.4408 -58.4812 873.9028)" className="navas531" width="0.87" height="9.69" />
											</g>
											<g className="navas532">

												<rect x="671.37" y="479.5" transform="matrix(0.4408 -0.8976 0.8976 0.4408 -58.9963 873.811)" className="navas533" width="0.88" height="9.5" />
											</g>
											<g className="navas534">

												<rect x="671.07" y="479.97" transform="matrix(0.4422 -0.8969 0.8969 0.4422 -60.0977 872.6155)" className="navas145" width="0.87" height="9.32" />
											</g>
											<g className="navas535">

												<rect x="670.78" y="480.43" transform="matrix(0.4431 -0.8965 0.8965 0.4431 -60.9668 871.8528)" className="navas145" width="0.88" height="9.13" />
											</g>
											<g className="navas536">

												<rect x="670.48" y="480.89" transform="matrix(0.4431 -0.8965 0.8965 0.4431 -61.4806 871.7605)" className="navas537" width="0.88" height="8.95" />
											</g>
											<g className="navas538">

												<rect x="670.18" y="481.35" transform="matrix(0.444 -0.896 0.896 0.444 -62.3768 870.9419)" className="navas147" width="0.88" height="8.76" />
											</g>
											<g className="navas539">

												<rect x="669.88" y="481.82" transform="matrix(0.4445 -0.8958 0.8958 0.4445 -63.0995 870.451)" className="navas540" width="0.88" height="8.58" />
											</g>
											<g className="navas541">

												<rect x="669.58" y="482.28" transform="matrix(0.4455 -0.8953 0.8953 0.4455 -64.0025 869.6125)" className="navas542" width="0.88" height="8.39" />
											</g>
											<g className="navas543">

												<rect x="669.28" y="482.74" transform="matrix(0.4455 -0.8953 0.8953 0.4455 -64.5053 869.539)" className="navas149" width="0.88" height="8.21" />
											</g>
											<g className="navas544">

												<rect x="668.98" y="483.2" transform="matrix(0.4469 -0.8946 0.8946 0.4469 -65.6044 868.3184)" className="navas545" width="0.88" height="8.02" />
											</g>
											<g className="navas546">

												<rect x="668.68" y="483.67" transform="matrix(0.4478 -0.8941 0.8941 0.4478 -66.4636 867.5537)" className="navas547" width="0.88" height="7.84" />
											</g>
											<g className="navas548">

												<rect x="668.39" y="484.13" transform="matrix(0.4487 -0.8937 0.8937 0.4487 -67.3496 866.7341)" className="navas549" width="0.88" height="7.65" />
											</g>
											<g className="navas550">

												<rect x="668.09" y="484.59" transform="matrix(0.4492 -0.8934 0.8934 0.4492 -68.0583 866.2559)" className="navas549" width="0.88" height="7.47" />
											</g>
											<g className="navas551">

												<rect x="667.79" y="485.05" transform="matrix(0.4502 -0.8929 0.8929 0.4502 -68.9612 865.3973)" className="navas153" width="0.88" height="7.28" />
											</g>
											<g className="navas552">

												<rect x="667.49" y="485.52" transform="matrix(0.4515 -0.8922 0.8922 0.4515 -70.0392 864.1895)" className="navas153" width="0.88" height="7.1" />
											</g>
											<g className="navas553">

												<rect x="667.19" y="485.98" transform="matrix(0.4524 -0.8918 0.8918 0.4524 -70.9083 863.3865)" className="navas554" width="0.88" height="6.91" />
											</g>
											<g className="navas555">

												<rect x="666.89" y="486.44" transform="matrix(0.4538 -0.8911 0.8911 0.4538 -71.9721 862.1941)" className="navas155" width="0.88" height="6.73" />
											</g>
											<g className="navas556">

												<rect x="666.59" y="486.91" transform="matrix(0.4547 -0.8906 0.8906 0.4547 -72.8463 861.3729)" className="navas557" width="0.88" height="6.54" />
											</g>
											<g className="navas558">

												<rect x="666.29" y="487.37" transform="matrix(0.4561 -0.8899 0.8899 0.4561 -73.9236 860.1399)" className="navas155" width="0.88" height="6.36" />
											</g>
											<g className="navas559">

												<rect x="665.99" y="487.83" transform="matrix(0.457 -0.8895 0.8895 0.457 -74.7842 859.3359)" className="navas157" width="0.88" height="6.17" />
											</g>
											<g className="navas560">

												<rect x="665.69" y="488.29" transform="matrix(0.4583 -0.8888 0.8888 0.4583 -75.8265 858.1602)" className="navas561" width="0.88" height="5.99" />
											</g>
											<g className="navas562">

												<rect x="665.39" y="488.76" transform="matrix(0.4593 -0.8883 0.8883 0.4593 -76.7111 857.2988)" className="navas561" width="0.88" height="5.8" />
											</g>
											<g className="navas563">

												<rect x="665.1" y="489.22" transform="matrix(0.4615 -0.8871 0.8871 0.4615 -78.1158 855.37)" className="navas159" width="0.88" height="5.62" />
											</g>
											<g className="navas564">

												<rect x="664.8" y="489.68" transform="matrix(0.4629 -0.8864 0.8864 0.4629 -79.1779 854.129)" className="navas159" width="0.88" height="5.44" />
											</g>
											<g className="navas565">

												<rect x="664.5" y="490.15" transform="matrix(0.4651 -0.8852 0.8852 0.4651 -80.5723 852.193)" className="navas566" width="0.88" height="5.25" />
											</g>
											<g className="navas567">

												<rect x="664.2" y="490.61" transform="matrix(0.4665 -0.8845 0.8845 0.4665 -81.6095 850.9846)" className="navas568" width="0.88" height="5.06" />
											</g>
											<g className="navas569">

												<rect x="663.9" y="491.07" transform="matrix(0.4687 -0.8833 0.8833 0.4687 -83.0002 849.0258)" className="navas570" width="0.88" height="4.88" />
											</g>
											<g className="navas571">

												<rect x="663.6" y="491.54" transform="matrix(0.471 -0.8821 0.8821 0.471 -84.3919 847.0474)" className="navas163" width="0.88" height="4.7" />
											</g>
											<g className="navas572">

												<rect x="663.3" y="492" transform="matrix(0.4732 -0.8809 0.8809 0.4732 -85.7683 845.0836)" className="navas163" width="0.88" height="4.51" />
											</g>
											<g className="navas573">

												<rect x="663" y="492.47" transform="matrix(0.4754 -0.8798 0.8798 0.4754 -87.1114 843.173)" className="navas574" width="0.88" height="4.33" />
											</g>
											<g className="navas575">
												<polygon className="navas165" points="664.75,496.37 665.17,495.6 661.53,493.63 661.11,494.4 					" />
											</g>
											<g className="navas576">
												<polygon className="navas165" points="664.36,496.71 664.79,495.94 661.32,494.04 660.89,494.81 					" />
											</g>
											<g className="navas577">
												<polygon className="navas578" points="663.98,497.04 664.4,496.27 661.1,494.45 660.68,495.22 					" />
											</g>
											<g>
												<polygon className="navas76" points="663.59,497.37 664.02,496.6 660.89,494.86 660.46,495.63 					" />
											</g>
										</g>
										<g>
											<path className="navas75" d="M660.8,494.08c0.04-0.04,0.07-0.08,0.11-0.12l0.01-0.01l0,0c0.34-0.28,0.86-0.29,1.45,0.05
					c1.05,0.59,1.92,2.01,1.95,3.18c0.01,0.52-0.15,0.91-0.42,1.11l0,0l-4.11,3.35l-2.92-3.44L660.8,494.08z"/>
											<polygon className="navas71" points="659.76,497.79 656.08,495.71 656.19,500.16 659.87,502.25 				" />
											<polygon className="navas73" points="659.76,497.79 663.34,495.77 663.45,500.22 659.87,502.25 				" />
											<polygon className="navas72" points="659.66,493.69 663.34,495.77 659.76,497.79 656.08,495.71 				" />
										</g>
									</g>
								</g>
							</g>
							<polygon className="none" points="664.87,655.07 390.55,498.02 269.02,567.94 538.36,726.3 " />
							<polygon className="none" points="268.96,572.66 192.61,618.43 459.89,772.75 537.02,730.44 " />
							<polygon className="navas8" points="664.87,650.34 664.87,655.07 390.55,498.02 391.79,493.01 " />
							<g>
								<path className="navas67" d="M398.92,556.42v19.88l-6.08-3.76v-19.88l-4.34-2.68v-6.26l14.75,9.12v6.26L398.92,556.42z" />
								<path className="navas67" d="M423.69,591.62l-7.11-4.4l-3.05-11.89l-2.02-1.25v10l-6.42-3.97v-26.14l10.92,6.76
		c2.41,1.49,4.28,3.35,5.61,5.59c1.33,2.24,2,4.51,2,6.82c0,1.51-0.25,2.69-0.74,3.54c-0.49,0.85-1.48,1.26-2.97,1.22L423.69,591.62
		z M411.49,568.49l2.74,1.7c0.81,0.5,1.46,0.69,1.95,0.57c0.49-0.12,0.74-0.59,0.74-1.4c0-1.67-0.82-3.02-2.47-4.03l-2.96-1.83
		V568.49z"/>
								<path className="navas67" d="M433.14,571.32v26.14l-6.42-3.97v-26.14L433.14,571.32z" />
								<path className="navas67" d="M436.78,599.72v-26.14l10.62,6.57c2.21,1.36,3.81,3.06,4.82,5.07c1.01,2.02,1.52,3.92,1.52,5.71
		c0,1.3-0.29,2.3-0.88,2.99c-0.59,0.69-1.46,0.87-2.63,0.55c2.71,2.49,4.06,5.36,4.06,8.6c0,1.94-0.48,3.38-1.43,4.31
		c-0.95,0.94-2.99,0.44-6.12-1.5L436.78,599.72z M442.7,587.25l2.97,1.84c0.75,0.46,1.27,0.55,1.58,0.27
		c0.31-0.28,0.46-0.69,0.46-1.23c0-1.46-0.72-2.63-2.14-3.51l-2.86-1.77V587.25z M442.7,597.55l3.12,1.93
		c0.78,0.48,1.35,0.59,1.71,0.34c0.36-0.26,0.54-0.68,0.54-1.28c0-0.6-0.18-1.26-0.53-1.98c-0.35-0.72-1-1.37-1.94-1.95l-2.91-1.8
		V597.55z"/>
								<path className="navas67" d="M473.9,596.53v17.31c0,3.28-0.78,5.16-2.34,5.63c-1.56,0.47-3.59-0.06-6.09-1.61c-2.63-1.63-4.75-3.63-6.35-6
		s-2.4-5.11-2.4-8.22v-17.73l6.53,4.04v16.8c0,1.25,0.21,2.29,0.63,3.13c0.42,0.84,1.1,1.54,2.02,2.11c0.77,0.48,1.41,0.66,1.9,0.55
		c0.49-0.11,0.79-0.4,0.89-0.86c0.1-0.46,0.15-1.46,0.15-2.97v-15.3L473.9,596.53z"/>
								<path className="navas67" d="M495.2,635.86l-5.22-3.23l-5.73-15.09c-0.73-1.94-1.48-4.19-2.22-6.77c0.34,1.89,0.51,3.43,0.51,4.6v12.66
		l-5.21-3.22v-26.14l6.07,3.75l4.87,12.59c0.97,2.5,1.71,4.63,2.21,6.38c-0.33-2.44-0.49-4.82-0.49-7.16v-7.74l5.22,3.23V635.86z"/>
								<path className="navas67" d="M510.38,645.24l-1.18-5.88l-5.6-3.46l-1.26,4.37l-5.21-3.22l6.45-22.15l6.79,4.2l6.56,30.2L510.38,645.24z
		 M504.69,630.86l3.38,2.09l-1.69-8.63L504.69,630.86z"/>
							</g>
							<g>
								<path className="navas67" d="M289.48,623.66v14.65l-3.32-2.02c-0.27-1.25-0.57-2.34-0.89-3.28c-1.37,1.26-3.4,1.07-6.08-0.57
		c-2.85-1.74-5.19-4.34-7.02-7.81s-2.75-7.22-2.75-11.24c0-3.91,0.89-6.65,2.66-8.23c1.77-1.58,4.41-1.3,7.92,0.83
		c2.63,1.6,4.75,3.69,6.36,6.25c1.61,2.56,2.65,5.44,3.12,8.64l-6.57-3.24c-0.32-2.92-1.33-4.89-3.02-5.92
		c-2.22-1.35-3.33,0.47-3.33,5.48c0,3.03,0.36,5.24,1.07,6.64s1.57,2.41,2.59,3.02c0.82,0.5,1.52,0.63,2.09,0.4
		c0.58-0.24,0.87-0.86,0.88-1.88l-3.66-2.23v-5.55L289.48,623.66z"/>
								<path className="navas67" d="M309.67,644.37v6.24l-16.61-10.13v-26.14l16.61,10.13v6.03l-9.96-6.07v3.79l8.06,4.91v5.8l-8.06-4.91v4.27
		L309.67,644.37z"/>
								<path className="navas67" d="M331.23,663.76l-5.52-3.36l-6.05-15.24c-0.78-1.95-1.56-4.23-2.35-6.83c0.36,1.9,0.53,3.44,0.53,4.62v12.66
		l-5.5-3.35v-26.14l6.41,3.91l5.14,12.71c1.02,2.53,1.8,4.67,2.33,6.44c-0.35-2.44-0.52-4.84-0.52-7.17v-7.74l5.52,3.36V663.76z"/>
								<path className="navas67" d="M351.69,669.99v6.24l-16.61-10.13v-26.14l16.61,10.13v6.03l-9.96-6.07v3.79l8.05,4.91v5.8l-8.05-4.91v4.27
		L351.69,669.99z"/>
								<path className="navas67" d="M374.03,689.85l-7.51-4.58l-3.22-11.96l-2.14-1.3v10l-6.78-4.13v-26.14l11.53,7.03
		c2.54,1.55,4.52,3.46,5.93,5.73c1.41,2.27,2.11,4.56,2.11,6.87c0,1.51-0.26,2.68-0.78,3.52c-0.52,0.84-1.56,1.22-3.14,1.14
		L374.03,689.85z M361.15,666.41l2.9,1.77c0.85,0.52,1.54,0.73,2.05,0.62c0.52-0.11,0.78-0.57,0.78-1.38c0-1.67-0.87-3.04-2.6-4.1
		l-3.12-1.9V666.41z"/>
								<path className="navas67" d="M389.41,699.23l-1.25-5.91l-5.91-3.61l-1.33,4.34l-5.5-3.35l6.82-21.99l7.17,4.37l6.92,30.36L389.41,699.23z
		 M383.4,684.7l3.57,2.18l-1.79-8.67L383.4,684.7z"/>
								<path className="navas67" d="M413.83,707.7v6.42l-15.48-9.44v-26.14l6.78,4.13v19.73L413.83,707.7z" />
							</g>
							<g>
								<path className="navas67" d="M553.13,539.2l-6.59,22.28l-6.64-3.89l-6.89-30.18l6.87,4.02l3.36,16.22c0.23,0.98,0.43,1.93,0.61,2.85
		l3.92-14.44L553.13,539.2z"/>
								<path className="navas67" d="M561.6,544.16v26.14l-6.52-3.82v-26.14L561.6,544.16z" />
								<path className="navas67" d="M571.91,566.85v9.5l-6.61-3.87v-26.14l9.07,5.31c2.26,1.32,3.98,2.65,5.16,3.98c1.18,1.33,2.11,2.85,2.8,4.57
		c0.69,1.72,1.03,3.4,1.03,5.03c0,2.49-0.71,4.09-2.12,4.79c-1.41,0.71-3.29,0.37-5.65-1.01L571.91,566.85z M571.82,561.18
		l2.18,1.28c1.92,1.12,2.88,0.82,2.88-0.92c0-1.63-0.89-2.97-2.66-4.01l-2.4-1.4V561.18z"/>
							</g>
							<g>
								<path className="navas67" d="M541.28,422.65l-4.17,14.09l-4.2-2.46l-4.36-19.08l4.34,2.54l2.12,10.25c0.14,0.62,0.27,1.22,0.39,1.8
		l2.48-9.13L541.28,422.65z"/>
								<path className="navas67" d="M546.63,425.79v16.53l-4.12-2.41v-16.53L546.63,425.79z" />
								<path className="navas67" d="M553.15,440.13v6.01l-4.18-2.45v-16.53l5.73,3.36c1.43,0.84,2.52,1.68,3.26,2.52
		c0.74,0.84,1.33,1.8,1.77,2.89c0.44,1.09,0.65,2.15,0.65,3.18c0,1.57-0.45,2.58-1.34,3.03c-0.89,0.45-2.08,0.23-3.57-0.64
		L553.15,440.13z M553.09,436.54l1.38,0.81c1.21,0.71,1.82,0.52,1.82-0.58c0-1.03-0.56-1.88-1.68-2.53l-1.51-0.89V436.54z"/>
							</g>
							<g>
								<path className="navas67" d="M738.09,572.09l-4.17,14.09l-4.2-2.46l-4.36-19.08l4.34,2.54l2.12,10.25c0.14,0.62,0.27,1.22,0.39,1.8
		l2.48-9.13L738.09,572.09z"/>
								<path className="navas67" d="M743.45,575.23v16.53l-4.12-2.41v-16.53L743.45,575.23z" />
								<path className="navas67" d="M749.97,589.57v6.01l-4.18-2.45V576.6l5.73,3.36c1.43,0.84,2.52,1.68,3.26,2.52c0.74,0.84,1.33,1.8,1.77,2.89
		c0.44,1.09,0.65,2.15,0.65,3.18c0,1.57-0.45,2.58-1.34,3.03c-0.89,0.45-2.08,0.23-3.57-0.64L749.97,589.57z M749.91,585.99
		l1.38,0.81c1.21,0.71,1.82,0.52,1.82-0.58c0-1.03-0.56-1.88-1.68-2.53l-1.51-0.89V585.99z"/>
							</g>
							<g>
								<path className="navas69" d="M574.85,485.31v8.15l-1.62-0.98c-0.13-0.68-0.28-1.28-0.44-1.79c-0.67,0.76-1.66,0.74-2.97-0.05
		c-1.39-0.84-2.54-2.19-3.43-4.04c-0.9-1.85-1.34-3.9-1.34-6.14c0-2.17,0.43-3.74,1.3-4.7c0.87-0.96,2.16-0.92,3.87,0.12
		c1.29,0.78,2.32,1.84,3.11,3.2c0.79,1.36,1.29,2.91,1.53,4.67l-3.21-1.52c-0.16-1.61-0.65-2.66-1.48-3.16
		c-1.09-0.66-1.63,0.41-1.63,3.19c0,1.68,0.17,2.9,0.52,3.65c0.35,0.75,0.77,1.27,1.27,1.57c0.4,0.24,0.74,0.29,1.02,0.13
		c0.28-0.16,0.43-0.52,0.43-1.08l-1.79-1.08v-3.09L574.85,485.31z"/>
								<path className="navas69" d="M581.26,497.57c-1.52-0.92-2.76-2.34-3.71-4.28c-0.96-1.94-1.44-4.04-1.44-6.31c0-2.17,0.46-3.69,1.37-4.56
		c0.91-0.86,2.18-0.81,3.81,0.18c1.5,0.91,2.73,2.32,3.67,4.22c0.95,1.91,1.42,3.98,1.42,6.21c0,2.31-0.48,3.87-1.43,4.69
		C584,498.53,582.77,498.48,581.26,497.57z M581.25,494.25c0.56,0.34,0.96,0.25,1.21-0.26c0.24-0.51,0.37-1.64,0.37-3.39
		c0-2.53-0.5-4.1-1.51-4.71c-1.09-0.66-1.63,0.46-1.63,3.34C579.68,491.95,580.2,493.62,581.25,494.25z"/>
								<path className="navas69" d="M595.36,502.29v3.57l-7.57-4.58v-14.55l3.31,2v10.98L595.36,502.29z" />
								<path className="navas69" d="M596.51,506.56v-14.55l4.18,2.52c1.81,1.1,3.17,2.64,4.07,4.64c0.9,1.99,1.35,3.94,1.35,5.85
		c0,2.17-0.48,3.65-1.45,4.42c-0.97,0.78-2.22,0.7-3.77-0.24L596.51,506.56z M599.82,505.22l0.86,0.52
		c0.55,0.33,1.01,0.25,1.39-0.24c0.38-0.49,0.57-1.35,0.57-2.59c0-1.06-0.17-2.07-0.5-3.04c-0.34-0.97-0.82-1.65-1.45-2.03
		l-0.86-0.52V505.22z"/>
								<path className="navas69" d="M615.63,514.65v3.47l-8.12-4.91v-14.55l8.12,4.91v3.36l-4.87-2.95v2.11l3.94,2.38v3.23l-3.94-2.38v2.38
		L615.63,514.65z"/>
								<path className="navas69" d="M626.18,524.5l-2.7-1.63l-2.96-8.22c-0.38-1.05-0.76-2.29-1.15-3.7c0.17,1.04,0.26,1.89,0.26,2.55v7.04
		l-2.69-1.63v-14.55l3.13,1.89l2.52,6.85c0.5,1.36,0.88,2.52,1.14,3.48c-0.17-1.35-0.25-2.67-0.25-3.97v-4.31l2.7,1.63V524.5z"/>
								<path className="navas69" d="M632.11,528.09v-14.55l5.48,3.31c1.14,0.69,1.97,1.58,2.49,2.67c0.52,1.09,0.78,2.13,0.78,3.13
		c0,0.72-0.15,1.29-0.45,1.69c-0.3,0.4-0.76,0.53-1.36,0.39c1.4,1.3,2.1,2.85,2.1,4.66c0,1.08-0.25,1.9-0.74,2.45
		c-0.49,0.55-1.55,0.34-3.16-0.64L632.11,528.09z M635.16,520.96l1.53,0.93c0.38,0.23,0.66,0.27,0.81,0.1
		c0.16-0.17,0.24-0.4,0.24-0.7c0-0.81-0.37-1.44-1.11-1.88l-1.48-0.89V520.96z M635.16,526.69l1.61,0.98
		c0.4,0.24,0.69,0.29,0.88,0.13c0.19-0.15,0.28-0.4,0.28-0.73c0-0.33-0.09-0.7-0.27-1.09c-0.18-0.39-0.52-0.73-1-1.03l-1.5-0.91
		V526.69z"/>
								<path className="navas69" d="M647.18,537.42c-1.52-0.92-2.76-2.34-3.71-4.28c-0.96-1.94-1.44-4.04-1.44-6.31c0-2.17,0.46-3.69,1.37-4.56
		c0.91-0.86,2.18-0.81,3.81,0.18c1.5,0.91,2.73,2.32,3.67,4.22c0.95,1.91,1.42,3.98,1.42,6.21c0,2.31-0.48,3.87-1.43,4.69
		C649.92,538.38,648.69,538.34,647.18,537.42z M647.17,534.11c0.56,0.34,0.96,0.25,1.21-0.26c0.25-0.51,0.37-1.64,0.37-3.39
		c0-2.53-0.5-4.1-1.51-4.71c-1.09-0.66-1.63,0.46-1.63,3.34C645.6,531.81,646.12,533.48,647.17,534.11z"/>
								<path className="navas69" d="M662.61,531.98l-3.14,4.85l3.64,10l-3.86-2.33l-1.99-5.79l-2.01,3.36l-3.03-1.83l3.48-5.41l-3.33-9.05
		l3.87,2.34l1.67,4.93l1.74-2.86L662.61,531.98z"/>
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