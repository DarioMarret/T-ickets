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
							viewBox="0 0 1089.95 1080">
<g>
	<g>
		<polygon className="palma0" points="418.97,269.49 81.73,467.74 646.34,832.53 1035.81,588.59 		"/>
		<g>
			<path className="palma1" d="M691.98,841.02l37.3-21.54l3.21-1.85l145.39-83.94l3.21-1.85l36.7-21.19c24.96-14.41,25.52-37.65,1.73-52.4
				c-0.47-0.31-0.9-0.64-1.4-0.93l-1.2-0.7l-150.3-87.34l-5.38-3.13l-37.09-21.56l-2.82-1.64l-25.93-15.07l-5.38-3.13l-25.89-15.05
				l-2.82-1.64l-39.12-22.74l-5.38-3.13l-149.31-86.77l-0.16-0.1c-0.86-0.5-1.8-0.93-2.66-1.39c-25.47-13.25-64.78-12.81-89.41,1.41
				l-37.33,21.56l-3.21,1.86l-144.09,83.19l-3.21,1.86l-37.97,21.92c-9.06,5.23-14.88,11.62-17.52,18.34l-6.28-3.62
				c3.36-6.54,9.49-12.7,18.42-17.86l112.91-65.19l112.91-65.19c28.47-16.44,74.62-16.44,102.87-0.02l450.8,261.98
				c28.25,16.42,28.1,43.15-0.37,59.59l-112.91,65.19l-112.91,65.19c-7.87,4.54-17.11,7.78-26.93,9.81l-6.05-3.48
				C674.48,848.77,684,845.63,691.98,841.02z"/>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma3" points="1084.25,612.5 1083.89,601.57 844.12,474.06 844.15,485.86 1074.1,618.83 					"/>
				</g>
				<g>
					<polygon className="palma4" points="854.37,468.15 844.12,474.06 1074.1,607.25 1083.89,601.57 					"/>
				</g>
			</g>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma4" points="3.68,469.14 3.68,458.01 243.44,330.5 243.41,342.29 13.32,475.36 					"/>
				</g>
				<g>
					<polygon className="palma5" points="233.2,324.58 243.44,330.5 13.47,463.68 3.68,458.01 					"/>
				</g>
			</g>
		</g>
		<g>
			<polygon className="palma6" points="45.79,404.36 46.07,502.6 419.02,287.27 416.18,201.68 			"/>
		</g>
		<g>
			<polygon className="palma7" points="416.18,201.68 419.02,287.27 1041.93,649.27 1041.65,551.02 			"/>
		</g>
		<g>
			<polygon className="palma7" points="23.58,404.36 23.86,502.6 668.9,877.46 668.62,779.21 			"/>
		</g>
		<g>
			<path className="palma8" d="M1063.89,551.01L668.62,779.21L23.58,404.36L416.28,188.8L1063.89,551.01z M668.69,766.35l372.95-215.33
				L416.18,201.68L45.79,404.36L668.69,766.35L668.69,766.35z"/>
		</g>
		<path className="palma6" d="M50.51,397.97c43.81-99.73,100.54-184.54,162.66-220.4l0.01-0.01c62.13-35.86,119.14-16.72,163.38,32.16
			l0.01,4.31l-90.9,52.48l-18.73,10.81l-78.38,45.25l-22.79,13.16l0,0L50.52,402.27L50.51,397.97z"/>
		<g>
			<polygon className="palma1" points="608.41,750.19 653.31,776.11 653.28,789.03 608.37,763.11 			"/>
			<polygon className="palma9" points="608.37,763.11 653.28,789.03 653.26,791.19 608.37,765.27 			"/>
			<polygon className="palma1" points="608.35,771.76 608.37,765.27 653.26,791.19 653.25,797.62 653.23,804.1 608.33,778.18 			"/>
			<polygon className="palma9" points="608.33,778.18 653.23,804.1 653.22,806.26 608.32,780.34 			"/>
			<polygon className="palma1" points="608.32,780.34 653.22,806.26 653.19,819.18 608.29,793.26 			"/>
		</g>
		<g>
			<polygon className="palma1" points="636.65,820.28 658.44,832.85 658.4,845.74 636.62,833.16 			"/>
			<polygon className="palma9" points="636.62,834.25 636.62,833.16 658.4,845.74 658.4,846.82 658.4,847.93 636.61,835.35 			"/>
			<polygon className="palma1" points="636.61,835.35 658.4,847.93 658.36,860.81 636.58,848.23 			"/>
		</g>
		<g>
			<polygon className="palma1" points="613.49,806.94 634.95,819.33 634.91,832.21 613.46,819.82 			"/>
			<polygon className="palma9" points="613.46,820.93 613.46,819.82 634.91,832.21 634.9,833.31 634.9,834.4 613.45,822.02 			"/>
			<polygon className="palma1" points="613.45,822.02 634.9,834.4 634.87,847.28 613.42,834.9 			"/>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="559.87,722.37 604.77,748.29 604.73,761.2 559.83,735.28 				"/>
				<polygon className="palma9" points="559.83,735.28 604.73,761.2 604.72,763.36 559.82,737.44 				"/>
				<polygon className="palma1" points="559.81,743.93 559.82,737.44 604.72,763.36 604.7,769.8 604.69,776.28 559.79,750.36 				"/>
				<polygon className="palma9" points="559.79,750.36 604.69,776.28 604.68,778.44 559.78,752.52 				"/>
				<polygon className="palma1" points="559.78,752.52 604.68,778.44 604.64,791.35 559.74,765.43 				"/>
			</g>
			<g>
				<polygon className="palma1" points="582.98,789.61 604.77,802.19 604.73,815.07 582.95,802.5 				"/>
				<polygon className="palma9" points="582.95,803.58 582.95,802.5 604.73,815.07 604.73,816.15 604.72,817.27 582.94,804.69 				"/>
				<polygon className="palma1" points="582.94,804.69 604.72,817.27 604.69,830.15 582.9,817.57 				"/>
			</g>
			<g>
				<polygon className="palma1" points="559.82,776.28 581.27,788.66 581.24,801.55 559.79,789.16 				"/>
				<polygon className="palma9" points="559.79,790.27 559.79,789.16 581.24,801.55 581.24,802.65 581.23,803.74 559.78,791.35 				"/>
				<polygon className="palma1" points="559.78,791.35 581.23,803.74 581.2,816.62 559.74,804.23 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="462.52,666.36 507.42,692.29 507.38,705.2 462.48,679.28 				"/>
				<polygon className="palma9" points="462.48,679.28 507.38,705.2 507.38,707.36 462.47,681.44 				"/>
				<polygon className="palma1" points="462.46,687.93 462.47,681.44 507.38,707.36 507.36,713.8 507.34,720.28 462.44,694.36 				"/>
				<polygon className="palma9" points="462.44,694.36 507.34,720.28 507.34,722.44 462.43,696.51 				"/>
				<polygon className="palma1" points="462.43,696.51 507.34,722.44 507.29,735.35 462.4,709.43 				"/>
			</g>
			<g>
				<polygon className="palma1" points="485.63,733.61 507.42,746.19 507.38,759.07 485.6,746.5 				"/>
				<polygon className="palma9" points="485.6,747.58 485.6,746.5 507.38,759.07 507.38,760.15 507.38,761.27 485.59,748.69 				"/>
				<polygon className="palma1" points="485.59,748.69 507.38,761.27 507.34,774.15 485.56,761.57 				"/>
			</g>
			<g>
				<polygon className="palma1" points="462.47,720.28 483.93,732.66 483.89,745.54 462.44,733.16 				"/>
				<polygon className="palma9" points="462.44,734.27 462.44,733.16 483.89,745.54 483.88,746.65 483.88,747.74 462.43,735.35 				"/>
				<polygon className="palma1" points="462.43,735.35 483.88,747.74 483.85,760.62 462.4,748.23 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="511.15,694.37 556.05,720.29 556.01,733.2 511.11,707.28 				"/>
				<polygon className="palma9" points="511.11,707.28 556.01,733.2 556.01,735.36 511.11,709.44 				"/>
				<polygon className="palma1" points="511.09,715.93 511.11,709.44 556.01,735.36 555.99,741.8 555.97,748.28 511.07,722.36 				"/>
				<polygon className="palma9" points="511.07,722.36 555.97,748.28 555.97,750.44 511.07,724.52 				"/>
				<polygon className="palma1" points="511.07,724.52 555.97,750.44 555.93,763.35 511.03,737.43 				"/>
			</g>
			<g>
				<polygon className="palma1" points="534.27,761.61 556.05,774.19 556.01,787.07 534.23,774.5 				"/>
				<polygon className="palma9" points="534.23,775.59 534.23,774.5 556.01,787.07 556.01,788.15 556.01,789.27 534.23,776.69 				"/>
				<polygon className="palma1" points="534.23,776.69 556.01,789.27 555.97,802.15 534.19,789.57 				"/>
			</g>
			<g>
				<polygon className="palma1" points="511.11,748.28 532.56,760.66 532.52,773.54 511.07,761.16 				"/>
				<polygon className="palma9" points="511.07,762.27 511.07,761.16 532.52,773.54 532.52,774.65 532.52,775.74 511.07,763.35 				"/>
				<polygon className="palma1" points="511.07,763.35 532.52,775.74 532.48,788.62 511.03,776.23 				"/>
			</g>
		</g>
		<g>
			<polygon className="palma1" points="393.97,628.36 438.87,654.28 438.83,667.2 393.93,641.27 			"/>
			<polygon className="palma9" points="393.93,641.27 438.83,667.2 438.82,669.35 393.93,643.43 			"/>
			<polygon className="palma1" points="393.91,649.92 393.93,643.43 438.82,669.35 438.81,675.79 438.79,682.27 393.89,656.35 			"/>
			<polygon className="palma9" points="393.89,656.35 438.79,682.27 438.78,684.43 393.88,658.51 			"/>
			<polygon className="palma1" points="393.88,658.51 438.78,684.43 438.75,697.35 393.84,671.42 			"/>
		</g>
		<g>
			<polygon className="palma1" points="422.21,698.45 444,711.02 443.96,723.9 422.18,711.33 			"/>
			<polygon className="palma9" points="422.18,712.41 422.18,711.33 443.96,723.9 443.96,724.99 443.96,726.1 422.17,713.52 			"/>
			<polygon className="palma1" points="422.17,713.52 443.96,726.1 443.92,738.97 422.14,726.4 			"/>
		</g>
		<g>
			<polygon className="palma1" points="399.05,685.11 420.5,697.49 420.47,710.37 399.02,697.99 			"/>
			<polygon className="palma9" points="399.02,699.1 399.02,697.99 420.47,710.37 420.46,711.48 420.46,712.57 399.01,700.18 			"/>
			<polygon className="palma1" points="399.01,700.18 420.46,712.57 420.43,725.45 398.98,713.06 			"/>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="345.43,600.53 390.32,626.46 390.29,639.37 345.38,613.45 				"/>
				<polygon className="palma9" points="345.38,613.45 390.29,639.37 390.28,641.53 345.38,615.61 				"/>
				<polygon className="palma1" points="345.36,622.1 345.38,615.61 390.28,641.53 390.26,647.96 390.25,654.45 345.34,628.52 				"/>
				<polygon className="palma9" points="345.34,628.52 390.25,654.45 390.24,656.61 345.34,630.68 				"/>
				<polygon className="palma1" points="345.34,630.68 390.24,656.61 390.2,669.52 345.3,643.6 				"/>
			</g>
			<g>
				<polygon className="palma1" points="368.54,667.78 390.32,680.36 390.29,693.24 368.5,680.66 				"/>
				<polygon className="palma9" points="368.5,681.75 368.5,680.66 390.29,693.24 390.29,694.32 390.28,695.43 368.5,682.86 				"/>
				<polygon className="palma1" points="368.5,682.86 390.28,695.43 390.25,708.31 368.46,695.74 				"/>
			</g>
			<g>
				<polygon className="palma1" points="345.38,654.45 366.83,666.83 366.8,679.71 345.34,667.33 				"/>
				<polygon className="palma9" points="345.34,668.44 345.34,667.33 366.8,679.71 366.8,680.81 366.79,681.9 345.34,669.52 				"/>
				<polygon className="palma1" points="345.34,669.52 366.79,681.9 366.75,694.78 345.3,682.4 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="248.08,544.53 292.98,570.45 292.94,583.37 248.04,557.45 				"/>
				<polygon className="palma9" points="248.04,557.45 292.94,583.37 292.93,585.53 248.03,559.61 				"/>
				<polygon className="palma1" points="248.02,566.1 248.03,559.61 292.93,585.53 292.91,591.96 292.9,598.44 248,572.52 				"/>
				<polygon className="palma9" points="248,572.52 292.9,598.44 292.89,600.6 247.99,574.68 				"/>
				<polygon className="palma1" points="247.99,574.68 292.89,600.6 292.85,613.52 247.96,587.6 				"/>
			</g>
			<g>
				<polygon className="palma1" points="271.19,611.78 292.98,624.36 292.94,637.24 271.16,624.66 				"/>
				<polygon className="palma9" points="271.16,625.75 271.16,624.66 292.94,637.24 292.93,638.32 292.93,639.43 271.15,626.85 				"/>
				<polygon className="palma1" points="271.15,626.85 292.93,639.43 292.9,652.31 271.12,639.73 				"/>
			</g>
			<g>
				<polygon className="palma1" points="248.03,598.44 269.48,610.83 269.45,623.71 248,611.33 				"/>
				<polygon className="palma9" points="248,612.43 248,611.33 269.45,623.71 269.44,624.81 269.44,625.9 247.99,613.52 				"/>
				<polygon className="palma1" points="247.99,613.52 269.44,625.9 269.41,638.78 247.96,626.4 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="296.71,572.53 341.61,598.45 341.57,611.37 296.67,585.45 				"/>
				<polygon className="palma9" points="296.67,585.45 341.57,611.37 341.57,613.53 296.67,587.61 				"/>
				<polygon className="palma1" points="296.65,594.09 296.67,587.61 341.57,613.53 341.55,619.96 341.53,626.45 296.63,600.52 				"/>
				<polygon className="palma9" points="296.63,600.52 341.53,626.45 341.53,628.6 296.62,602.68 				"/>
				<polygon className="palma1" points="296.62,602.68 341.53,628.6 341.49,641.52 296.59,615.6 				"/>
			</g>
			<g>
				<polygon className="palma1" points="319.83,639.78 341.61,652.36 341.57,665.24 319.79,652.66 				"/>
				<polygon className="palma9" points="319.79,653.75 319.79,652.66 341.57,665.24 341.57,666.32 341.57,667.43 319.78,654.86 				"/>
				<polygon className="palma1" points="319.78,654.86 341.57,667.43 341.53,680.31 319.75,667.74 				"/>
			</g>
			<g>
				<polygon className="palma1" points="296.67,626.45 318.12,638.83 318.08,651.71 296.63,639.33 				"/>
				<polygon className="palma9" points="296.63,640.44 296.63,639.33 318.08,651.71 318.08,652.81 318.08,653.9 296.62,641.52 				"/>
				<polygon className="palma1" points="296.62,641.52 318.08,653.9 318.04,666.79 296.59,654.4 				"/>
			</g>
		</g>
		<g>
			<polygon className="palma1" points="182.77,504.14 227.68,530.06 227.64,542.97 182.74,517.05 			"/>
			<polygon className="palma9" points="182.74,517.05 227.64,542.97 227.64,545.13 182.73,519.21 			"/>
			<polygon className="palma1" points="182.72,525.7 182.73,519.21 227.64,545.13 227.62,551.57 227.6,558.05 182.7,532.12 			"/>
			<polygon className="palma9" points="182.7,532.12 227.6,558.05 227.59,560.21 182.69,534.28 			"/>
			<polygon className="palma1" points="182.69,534.28 227.59,560.21 227.55,573.12 182.66,547.2 			"/>
		</g>
		<g>
			<polygon className="palma1" points="211.03,574.22 232.81,586.8 232.77,599.68 210.99,587.1 			"/>
			<polygon className="palma9" points="210.99,588.19 210.99,587.1 232.77,599.68 232.77,600.76 232.76,601.87 210.98,589.3 			"/>
			<polygon className="palma1" points="210.98,589.3 232.76,601.87 232.73,614.75 210.94,602.18 			"/>
		</g>
		<g>
			<polygon className="palma1" points="187.87,560.89 209.32,573.27 209.28,586.15 187.83,573.77 			"/>
			<polygon className="palma9" points="187.83,574.88 187.83,573.77 209.28,586.15 209.28,587.25 209.27,588.34 187.82,575.96 			"/>
			<polygon className="palma1" points="187.82,575.96 209.27,588.34 209.24,601.22 187.78,588.84 			"/>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="134.23,476.31 179.14,502.23 179.1,515.15 134.2,489.23 				"/>
				<polygon className="palma9" points="134.2,489.23 179.1,515.15 179.09,517.31 134.19,491.38 				"/>
				<polygon className="palma1" points="134.17,497.87 134.19,491.38 179.09,517.31 179.08,523.74 179.05,530.22 134.16,504.3 				"/>
				<polygon className="palma9" points="134.16,504.3 179.05,530.22 179.05,532.38 134.15,506.46 				"/>
				<polygon className="palma1" points="134.15,506.46 179.05,532.38 179.01,545.3 134.11,519.37 				"/>
			</g>
			<g>
				<polygon className="palma1" points="157.35,543.56 179.14,556.13 179.1,569.02 157.31,556.44 				"/>
				<polygon className="palma9" points="157.31,557.53 157.31,556.44 179.1,569.02 179.1,570.1 179.09,571.21 157.31,558.63 				"/>
				<polygon className="palma1" points="157.31,558.63 179.09,571.21 179.05,584.09 157.27,571.51 				"/>
			</g>
			<g>
				<polygon className="palma1" points="134.19,530.22 155.64,542.61 155.61,555.49 134.16,543.1 				"/>
				<polygon className="palma9" points="134.15,544.21 134.16,543.1 155.61,555.49 155.6,556.59 155.6,557.68 134.15,545.3 				"/>
				<polygon className="palma1" points="134.15,545.3 155.6,557.68 155.56,570.56 134.11,558.18 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="36.89,420.31 81.79,446.23 81.75,459.15 36.85,433.23 				"/>
				<polygon className="palma9" points="36.85,433.23 81.75,459.15 81.74,461.31 36.85,435.38 				"/>
				<polygon className="palma1" points="36.83,441.87 36.85,435.38 81.74,461.31 81.73,467.74 81.71,474.22 36.81,448.3 				"/>
				<polygon className="palma9" points="36.81,448.3 81.71,474.22 81.7,476.38 36.8,450.46 				"/>
				<polygon className="palma1" points="36.8,450.46 81.7,476.38 81.67,489.3 36.76,463.37 				"/>
			</g>
			<g>
				<polygon className="palma1" points="60.01,487.56 81.79,500.13 81.75,513.02 59.96,500.44 				"/>
				<polygon className="palma9" points="59.96,501.53 59.96,500.44 81.75,513.02 81.75,514.1 81.74,515.21 59.96,502.63 				"/>
				<polygon className="palma1" points="59.96,502.63 81.74,515.21 81.71,528.09 59.92,515.51 				"/>
			</g>
			<g>
				<polygon className="palma1" points="36.85,474.22 58.3,486.61 58.26,499.49 36.81,487.1 				"/>
				<polygon className="palma9" points="36.81,488.21 36.81,487.1 58.26,499.49 58.26,500.59 58.25,501.68 36.8,489.3 				"/>
				<polygon className="palma1" points="36.8,489.3 58.25,501.68 58.21,514.56 36.76,502.18 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="85.52,448.31 130.42,474.23 130.38,487.15 85.48,461.23 				"/>
				<polygon className="palma9" points="85.48,461.23 130.38,487.15 130.38,489.31 85.48,463.38 				"/>
				<polygon className="palma1" points="85.46,469.87 85.48,463.38 130.38,489.31 130.36,495.74 130.34,502.22 85.44,476.3 				"/>
				<polygon className="palma9" points="85.44,476.3 130.34,502.22 130.33,504.38 85.43,478.46 				"/>
				<polygon className="palma1" points="85.43,478.46 130.33,504.38 130.3,517.3 85.4,491.37 				"/>
			</g>
			<g>
				<polygon className="palma1" points="108.64,515.56 130.42,528.13 130.38,541.02 108.6,528.44 				"/>
				<polygon className="palma9" points="108.6,529.53 108.6,528.44 130.38,541.02 130.38,542.1 130.38,543.21 108.59,530.63 				"/>
				<polygon className="palma1" points="108.59,530.63 130.38,543.21 130.34,556.09 108.56,543.51 				"/>
			</g>
			<g>
				<polygon className="palma1" points="85.48,502.22 106.93,514.61 106.89,527.49 85.44,515.1 				"/>
				<polygon className="palma9" points="85.44,516.21 85.44,515.1 106.89,527.49 106.89,528.59 106.88,529.68 85.43,517.3 				"/>
				<polygon className="palma1" points="85.43,517.3 106.88,529.68 106.85,542.56 85.4,530.18 				"/>
			</g>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma4" points="232.71,591.21 13.29,463.57 13.32,475.36 232.74,603 					"/>
				</g>
				<g>
					<polygon className="palma5" points="242.96,585.29 23.53,457.65 13.29,463.57 232.71,591.21 					"/>
				</g>
				<g>
					<polygon className="palma10" points="232.71,591.21 232.74,603 242.99,597.08 242.96,585.29 					"/>
				</g>
			</g>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma4" points="445.33,713.76 222.64,586.3 222.38,597.78 445.65,725.91 					"/>
				</g>
				<g>
					<polygon className="palma5" points="455.73,707.69 233.03,580.56 222.64,586.3 445.33,713.76 					"/>
				</g>
				<g>
					<polygon className="palma10" points="445.33,713.76 445.65,725.91 456.07,719.81 455.73,707.69 					"/>
				</g>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="278.53,231.28 263.69,239.85 263.71,248.08 278.55,239.51 				"/>
				<polygon className="palma1" points="279.41,265.79 294.22,257.24 294.2,249.17 279.39,257.72 				"/>
				<polygon className="palma1" points="278.58,249.23 263.74,257.8 263.74,257.7 263.76,265.87 278.6,257.3 				"/>
				<polygon className="palma1" points="278.55,240.42 263.72,248.98 263.71,248.33 263.74,256.89 278.58,248.33 				"/>
				<polygon className="palma1" points="294.14,230.51 294.12,222.28 279.31,230.82 279.34,239.06 				"/>
				<polygon className="palma1" points="279.39,256.85 294.19,248.3 294.17,240.23 279.36,248.78 				"/>
				<polygon className="palma1" points="278.62,266.25 278.6,258.17 263.77,266.74 263.79,274.81 278.64,266.23 				"/>
				<polygon className="palma1" points="279.36,247.87 294.17,239.32 294.15,231.41 279.34,239.96 				"/>
				<polygon className="palma8" points="278.58,249.23 278.58,248.33 263.74,256.89 263.74,257.7 263.74,257.8 				"/>
				<polygon className="palma8" points="279.36,248.78 294.17,240.23 294.17,239.32 279.36,247.87 				"/>
				<polygon className="palma8" points="279.34,239.06 279.31,230.82 279.14,230.93 278.53,231.28 278.55,239.51 				"/>
				<polygon className="palma8" points="278.6,258.17 278.62,266.25 278.64,266.23 279.41,265.79 279.39,257.72 				"/>
				<polygon className="palma8" points="279.36,247.87 279.34,239.96 278.55,240.42 278.58,248.33 278.58,249.23 278.6,257.3 
					279.39,256.85 279.36,248.78 				"/>
				<polygon className="palma8" points="278.55,240.42 279.34,239.96 294.15,231.41 294.14,230.51 279.34,239.06 278.55,239.51 
					263.71,248.08 263.71,248.33 263.72,248.98 				"/>
				<polygon className="palma8" points="279.39,257.72 294.2,249.17 294.19,248.3 279.39,256.85 278.6,257.3 263.76,265.87 263.77,266.74 
					278.6,258.17 				"/>
			</g>
			<polygon className="palma3" points="294.22,257.24 294.2,249.17 263.77,266.74 263.79,274.81 			"/>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="168.29,294.3 153.45,302.86 153.47,311.1 168.31,302.53 				"/>
				<polygon className="palma1" points="169.17,328.81 183.98,320.26 183.96,312.19 169.15,320.74 				"/>
				<polygon className="palma1" points="168.34,312.25 153.5,320.82 153.5,320.72 153.53,328.89 168.36,320.32 				"/>
				<polygon className="palma1" points="168.31,303.44 153.48,312 153.47,311.34 153.5,319.91 168.33,311.35 				"/>
				<polygon className="palma1" points="183.91,293.53 183.88,285.3 169.07,293.84 169.1,302.08 				"/>
				<polygon className="palma1" points="169.15,319.87 183.96,311.32 183.93,303.25 169.12,311.8 				"/>
				<polygon className="palma1" points="168.39,329.26 168.36,321.19 153.53,329.76 153.55,337.83 168.41,329.25 				"/>
				<polygon className="palma1" points="169.12,310.89 183.93,302.34 183.91,294.43 169.1,302.98 				"/>
				<polygon className="palma8" points="168.34,312.25 168.33,311.35 153.5,319.91 153.5,320.72 153.5,320.82 				"/>
				<polygon className="palma8" points="169.12,311.8 183.93,303.25 183.93,302.34 169.12,310.89 				"/>
				<polygon className="palma8" points="169.1,302.08 169.07,293.84 168.9,293.95 168.29,294.3 168.31,302.53 				"/>
				<polygon className="palma8" points="168.36,321.19 168.39,329.26 168.41,329.25 169.17,328.81 169.15,320.74 				"/>
				<polygon className="palma8" points="169.12,310.89 169.1,302.98 168.31,303.44 168.33,311.35 168.34,312.25 168.36,320.32 
					169.15,319.87 169.12,311.8 				"/>
				<polygon className="palma8" points="168.31,303.44 169.1,302.98 183.91,294.43 183.91,293.53 169.1,302.08 168.31,302.53 153.47,311.1 
					153.47,311.34 153.48,312 				"/>
				<polygon className="palma8" points="169.15,320.74 183.96,312.19 183.96,311.32 169.15,319.87 168.36,320.32 153.53,328.89 
					153.53,329.76 168.36,321.19 				"/>
			</g>
			<polygon className="palma3" points="183.98,320.26 183.96,312.19 153.53,329.76 153.55,337.83 			"/>
		</g>
		<polygon className="palma1" points="133.64,332.17 148.47,323.61 148.52,340.66 133.69,349.22 		"/>
		<polygon className="palma1" points="215.32,284.29 230.15,275.72 230.21,292.77 215.37,301.33 		"/>
		<polygon className="palma1" points="215.32,265.87 230.15,257.3 230.21,274.35 215.37,282.92 		"/>
		<polygon className="palma1" points="299.62,236.7 314.46,228.13 314.51,245.18 299.67,253.75 		"/>
		<polygon className="palma11" points="402.4,363.51 402.34,343.79 437.57,343.8 437.63,363.51 		"/>
		<polygon className="palma3" points="189.93,488.38 173.09,478.52 402.34,343.79 402.4,363.51 		"/>
		<polygon className="palma12" points="941.97,657.01 942.03,676.73 796.37,762.61 784.14,749.62 		"/>
		<polygon className="palma7" points="343.85,268.22 418.74,220.9 494.24,268.56 		"/>
		<polygon className="palma8" points="400.69,341.46 439.25,341.46 440.4,342.14 437.57,343.8 402.34,343.79 173.09,478.52 170.25,476.86 
					"/>
		<g>
			<polygon className="palma13" points="695.1,446.7 701.65,444.61 702.17,437.99 699.59,436.48 699.32,440.8 			"/>
			<g>
				<g>
					<g>
						<g className="palma2">
							<g>
								<polygon className="palma14" points="693.5,452.91 694.77,445.41 686,448.58 								"/>
							</g>
							<g>
								<polygon className="palma15" points="686,448.58 694.77,445.79 694.93,439.22 691.13,432.75 687.44,434.9 								"/>
							</g>
							<g>
								<polygon className="palma14" points="695.1,446.7 699.32,440.8 699.59,436.48 695.91,438.63 								"/>
							</g>
							<g>
								<polygon className="palma16" points="695.91,438.63 699.59,436.48 690.13,431.02 686.43,433.16 								"/>
							</g>
							<g>
								<path className="palma6" d="M694.46,454.62l-9.47-5.47l1.44-15.99l9.47,5.47L694.46,454.62z M686,448.58l7.5,4.33l1.43-13.69
									l-7.49-4.33L686,448.58L686,448.58z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
		<g>
			<polygon className="palma13" points="621.76,404.09 628.32,402 628.84,395.38 626.26,393.88 625.99,398.19 			"/>
			<g>
				<g>
					<g>
						<g className="palma2">
							<g>
								<polygon className="palma14" points="620.16,410.3 621.44,402.8 612.67,405.97 								"/>
							</g>
							<g>
								<polygon className="palma15" points="612.67,405.97 621.44,403.18 621.6,396.61 617.8,390.14 614.1,392.29 								"/>
							</g>
							<g>
								<polygon className="palma14" points="621.76,404.09 625.99,398.19 626.26,393.88 622.57,396.02 								"/>
							</g>
							<g>
								<polygon className="palma16" points="622.57,396.02 626.26,393.88 616.8,388.41 613.1,390.55 								"/>
							</g>
							<g>
								<path className="palma6" d="M621.13,412.02l-9.47-5.47l1.44-15.99l9.47,5.47L621.13,412.02z M612.67,405.97l7.49,4.33l1.44-13.69
									l-7.49-4.33L612.67,405.97L612.67,405.97z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
		<g>
			<g>
				<g>
					<g>
						<g className="palma2">
							<g>
								<polygon className="palma14" points="319.43,350.43 318.15,342.93 326.92,346.1 								"/>
							</g>
							<g>
								<polygon className="palma15" points="326.92,346.1 318.15,343.3 317.98,336.74 321.79,330.27 325.48,332.41 								"/>
							</g>
							<g>
								<polygon className="palma14" points="317.82,344.21 313.6,338.32 313.32,334 317.01,336.15 								"/>
							</g>
							<g>
								<polygon className="palma16" points="317.01,336.15 313.32,334 322.79,328.54 326.48,330.68 								"/>
							</g>
							<g>
								<path className="palma6" d="M317.01,336.15l9.47-5.47l1.45,15.99l-9.47,5.47L317.01,336.15z M326.92,346.1l-1.44-13.69l-7.5,4.33
									l1.44,13.69L326.92,346.1L326.92,346.1z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
		<g>
			<g>
				<g>
					<g>
						<g className="palma2">
							<g>
								<polygon className="palma14" points="199.94,420 198.67,412.5 207.43,415.67 								"/>
							</g>
							<g>
								<polygon className="palma15" points="207.43,415.67 198.67,412.88 198.51,406.31 202.31,399.84 206,401.99 								"/>
							</g>
							<g>
								<polygon className="palma14" points="198.34,413.79 194.12,407.89 193.84,403.57 197.53,405.72 								"/>
							</g>
							<g>
								<polygon className="palma16" points="197.53,405.72 193.84,403.57 203.3,398.11 207,400.25 								"/>
							</g>
							<g>
								<path className="palma6" d="M197.53,405.72l9.47-5.46l1.44,15.99l-9.47,5.47L197.53,405.72z M207.43,415.67L206,401.99l-7.5,4.33
									l1.44,13.69L207.43,415.67L207.43,415.67z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
		<g>
			<polygon className="palma7" points="733.79,536.13 733.74,516.41 938.06,635.64 937.95,655.26 			"/>
			<polygon className="palma8" points="733.74,516.41 736.57,514.75 844.87,577.98 843.05,580.24 			"/>
		</g>
		<g>
			<polygon className="palma7" points="546.44,426.63 546.38,406.91 750.7,526.13 750.6,545.76 			"/>
			<polygon className="palma8" points="546.38,406.91 549.22,405.25 657.52,468.48 655.7,470.74 			"/>
		</g>
		<g>
			<polygon className="palma17" points="704.03,495.26 701.09,496.79 700.98,516.41 703.59,515.4 			"/>
		</g>
		<g>
			<polygon className="palma13" points="805.21,510.66 811.77,508.57 812.29,501.95 809.72,500.45 809.43,504.76 			"/>
			<g>
				<g>
					<g>
						<g className="palma2">
							<g>
								<polygon className="palma14" points="803.61,516.87 804.88,509.37 796.11,512.55 								"/>
							</g>
							<g>
								<polygon className="palma15" points="796.11,512.55 804.88,509.75 805.05,503.19 801.25,496.71 797.55,498.86 								"/>
							</g>
							<g>
								<polygon className="palma14" points="805.21,510.66 809.43,504.76 809.72,500.45 806.02,502.59 								"/>
							</g>
							<g>
								<polygon className="palma16" points="806.02,502.59 809.72,500.45 800.24,494.98 796.55,497.13 								"/>
							</g>
							<g>
								<path className="palma6" d="M804.58,518.59l-9.47-5.47l1.44-16l9.47,5.47L804.58,518.59z M796.11,512.55l7.5,4.33l1.44-13.69
									l-7.5-4.33L796.11,512.55L796.11,512.55z"/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
		<polygon className="palma5" points="668.62,779.21 668.9,877.46 1064.17,649.25 1063.89,551.01 		"/>
		<g>
			<g>
				<polygon className="palma1" points="728.48,750.21 683.58,776.13 683.62,789.05 728.52,763.12 				"/>
				<polygon className="palma9" points="728.52,763.12 683.62,789.05 683.62,791.2 728.52,765.28 				"/>
				<polygon className="palma1" points="728.54,771.77 728.52,765.28 683.62,791.2 683.64,797.64 683.66,804.12 728.56,778.2 				"/>
				<polygon className="palma9" points="728.56,778.2 683.66,804.12 683.67,806.28 728.57,780.36 				"/>
				<polygon className="palma1" points="728.57,780.36 683.67,806.28 683.7,819.19 728.6,793.27 				"/>
			</g>
			<g>
				<polygon className="palma1" points="705.36,817.46 683.58,830.03 683.62,842.91 705.4,830.34 				"/>
				<polygon className="palma9" points="705.4,831.43 705.4,830.34 683.62,842.91 683.62,843.99 683.62,845.11 705.41,832.53 				"/>
				<polygon className="palma1" points="705.41,832.53 683.62,845.11 683.66,857.99 705.44,845.41 				"/>
			</g>
			<g>
				<polygon className="palma1" points="728.52,804.12 707.07,816.5 707.11,829.39 728.56,817 				"/>
				<polygon className="palma9" points="728.56,818.11 728.56,817 707.11,829.39 707.11,830.49 707.12,831.58 728.57,819.19 				"/>
				<polygon className="palma1" points="728.57,819.19 707.12,831.58 707.15,844.46 728.6,832.07 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="777.2,722.21 732.29,748.13 732.33,761.05 777.23,735.12 				"/>
				<polygon className="palma9" points="777.23,735.12 732.33,761.05 732.34,763.2 777.24,737.28 				"/>
				<polygon className="palma1" points="777.26,743.77 777.24,737.28 732.34,763.2 732.35,769.64 732.38,776.12 777.27,750.2 				"/>
				<polygon className="palma9" points="777.27,750.2 732.38,776.12 732.38,778.28 777.28,752.36 				"/>
				<polygon className="palma1" points="777.28,752.36 732.38,778.28 732.42,791.19 777.32,765.27 				"/>
			</g>
			<g>
				<polygon className="palma1" points="754.08,789.46 732.29,802.03 732.33,814.91 754.12,802.34 				"/>
				<polygon className="palma9" points="754.12,803.43 754.12,802.34 732.33,814.91 732.33,815.99 732.34,817.11 754.12,804.53 				"/>
				<polygon className="palma1" points="754.12,804.53 732.34,817.11 732.38,829.99 754.16,817.41 				"/>
			</g>
			<g>
				<polygon className="palma1" points="777.24,776.12 755.79,788.5 755.83,801.38 777.27,789 				"/>
				<polygon className="palma9" points="777.28,790.11 777.27,789 755.83,801.38 755.83,802.49 755.83,803.58 777.28,791.19 				"/>
				<polygon className="palma1" points="777.28,791.19 755.83,803.58 755.87,816.46 777.32,804.07 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="1004.37,593.68 959.47,619.6 959.51,632.52 1004.41,606.59 				"/>
				<polygon className="palma9" points="1004.41,606.59 959.51,632.52 959.52,634.67 1004.41,608.75 				"/>
				<polygon className="palma1" points="1004.44,615.24 1004.41,608.75 959.52,634.67 959.53,641.11 959.55,647.59 1004.45,621.67 				"/>
				<polygon className="palma9" points="1004.45,621.67 959.55,647.59 959.56,649.75 1004.46,623.83 				"/>
				<polygon className="palma1" points="1004.46,623.83 959.56,649.75 959.59,662.67 1004.5,636.74 				"/>
			</g>
			<g>
				<polygon className="palma1" points="981.25,660.93 959.47,673.5 959.51,686.39 981.3,673.81 				"/>
				<polygon className="palma1" points="981.3,673.81 981.3,674.9 981.3,676 981.34,688.88 959.55,701.46 959.52,688.58 959.51,687.47 
					959.51,686.39 				"/>
			</g>
			<g>
				<polygon className="palma1" points="1004.41,647.59 982.97,659.98 983,672.86 1004.45,660.47 				"/>
				<polygon className="palma1" points="1004.45,660.47 1004.46,661.58 1004.46,662.67 1004.5,675.54 983.05,687.93 983.01,675.05 
					983.01,673.96 983,672.86 				"/>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma1" points="1053.09,565.68 1008.19,591.6 1008.23,604.52 1053.12,578.59 				"/>
				<polygon className="palma9" points="1053.12,578.59 1008.23,604.52 1008.23,606.67 1053.13,580.75 				"/>
				<polygon className="palma1" points="1053.15,587.24 1053.13,580.75 1008.23,606.67 1008.25,613.11 1008.27,619.59 1053.16,593.67 				
					"/>
				<polygon className="palma9" points="1053.16,593.67 1008.27,619.59 1008.27,621.75 1053.18,595.83 				"/>
				<polygon className="palma1" points="1053.18,595.83 1008.27,621.75 1008.31,634.66 1053.21,608.74 				"/>
			</g>
			<g>
				<polygon className="palma1" points="1029.97,632.93 1008.19,645.5 1008.23,658.38 1030.01,645.81 				"/>
				<polygon className="palma1" points="1030.01,645.81 1030.01,646.9 1030.02,648 1030.05,660.88 1008.27,673.46 1008.23,660.58 
					1008.23,659.47 1008.23,658.38 				"/>
			</g>
			<g>
				<polygon className="palma1" points="1053.13,619.59 1031.68,631.98 1031.72,644.86 1053.16,632.47 				"/>
				<polygon className="palma1" points="1053.16,632.47 1053.17,633.58 1053.18,634.66 1053.21,647.54 1031.76,659.93 1031.72,647.05 
					1031.72,645.96 1031.72,644.86 				"/>
			</g>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma18" points="668.9,842.81 1074.14,607.04 1074.1,618.83 668.83,854.82 					"/>
				</g>
				<g>
					<polygon className="palma4" points="668.59,831.34 1063.89,601.12 1074.14,607.04 690.72,830.15 					"/>
				</g>
			</g>
		</g>
		<g>
			<g className="palma2">
				<g>
					<polygon className="palma4" points="668.9,842.81 438.92,709.62 438.95,721.42 668.83,854.82 					"/>
				</g>
				<g>
					<polygon className="palma5" points="668.59,831.34 449.17,703.71 438.92,709.62 668.9,842.81 690.72,830.15 					"/>
				</g>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma7" points="437.47,363.29 437.42,343.57 516.71,388.64 516.61,408.26 				"/>
				<polygon className="palma8" points="437.57,343.8 440.4,342.14 519.81,387.33 516.86,388.86 				"/>
			</g>
			<polygon className="palma17" points="519.65,387.11 516.71,388.64 516.61,408.26 519.21,407.25 			"/>
		</g>
		<polygon className="palma13" points="537.16,425.14 547.55,424.56 547.26,417.47 548.5,416.17 548.5,407.34 551.33,405.68 552.81,406.55 
			557.91,402.8 558.1,396.02 563.59,392.21 563.88,385.49 569.12,381.57 570.49,375.47 575.81,371.6 571.65,369.38 545.61,385.22 
			536.35,414.12 		"/>
		<polygon className="palma13" points="722.6,532.64 732.99,532.05 732.7,524.96 733.94,523.66 733.94,514.84 736.78,513.18 738.25,514.05 
			743.35,510.3 743.55,503.52 749.03,499.71 749.32,492.98 754.56,489.07 755.93,482.97 761.25,479.1 757.09,476.87 731.04,492.72 
			721.79,521.62 		"/>
		<g>
			<g>
				<g>
					<g className="palma2">
						<g>
							<polygon className="palma14" points="518.3,412.5 542.93,405.03 561.48,375.89 543.27,365.67 518.3,406.16 							"/>
						</g>
						<g>
							<polygon className="palma16" points="535.73,422.61 541.2,419.43 548.94,395.06 518.3,412.5 							"/>
						</g>
						<g>
							<polygon className="palma14" points="537.16,425.14 542.62,421.97 543.06,415.22 547.52,410.85 547.79,404.48 553.23,400.28 
								553.85,394 559.38,389.97 559.82,383.52 564.83,379.27 566.57,373.5 571.65,369.38 562.92,375.01 537.17,417.14 							"/>
						</g>
						<g>
							<polygon className="palma16" points="562.92,375.01 571.65,369.38 551.76,357.79 542.57,363.22 							"/>
						</g>
					</g>
				</g>
			</g>
			<g>
				<polygon className="palma6" points="560.66,375.41 543.27,365.67 518.31,406.16 516.83,405.3 542.57,363.22 562.92,375.01 
					537.18,417.14 535.75,416.31 				"/>
				<polygon className="palma6" points="518.31,406.16 518.3,412.5 535.73,422.61 535.75,416.31 537.18,417.14 537.16,425.14 516.8,413.35 
					516.83,405.3 				"/>
			</g>
		</g>
		<g>
			<g>
				<g>
					<g className="palma2">
						<g>
							<polygon className="palma14" points="703.64,520 728.28,512.53 746.83,483.39 728.61,473.17 703.65,513.66 							"/>
						</g>
						<g>
							<polygon className="palma16" points="721.08,530.1 726.54,526.93 734.29,502.56 703.64,520 							"/>
						</g>
						<g>
							<polygon className="palma14" points="722.51,532.64 727.97,529.47 728.41,522.72 732.87,518.35 733.14,511.98 738.57,507.77 
								739.2,501.5 744.73,497.46 745.17,491.02 750.18,486.77 751.92,481 756.99,476.87 748.27,482.51 722.52,524.64 							"/>
						</g>
						<g>
							<polygon className="palma16" points="748.27,482.51 756.99,476.87 737.11,465.29 727.91,470.71 							"/>
						</g>
					</g>
				</g>
			</g>
			<g>
				<polygon className="palma6" points="746.01,482.91 728.61,473.17 703.66,513.66 702.17,512.79 727.91,470.71 748.27,482.51 
					722.53,524.64 721.1,523.81 				"/>
				<polygon className="palma6" points="703.66,513.66 703.64,520 721.08,530.1 721.1,523.81 722.53,524.64 722.51,532.64 702.15,520.84 
					702.17,512.79 				"/>
			</g>
		</g>
		<path className="palma13" d="M1064.17,649.25L797.78,802.77l-8.57,5.22c-28.86-5.77-55.35-23.15-78.36-48.59l-0.02-4.31l90.9-52.48
			l24.36-14.06l95.58-55.18l96.49-55.71l18.76-10.84l26.97-15.82v38.94l19.99,11.62l0.36,10.93l-20.36,12.28L1064.17,649.25z"/>
		<g>
			<g>
				<g className="palma2">
					<g>
						<polygon className="palma19" points="797.6,733.88 797.78,802.77 838.24,826.31 838.06,757.42 						"/>
					</g>
					<g>
						<polygon className="palma20" points="838.06,757.42 838.24,826.31 985.91,739.91 985.73,672.17 						"/>
					</g>
					<g>
						<polygon className="palma21" points="797.6,733.88 838.06,757.42 985.73,672.17 945.27,648.62 						"/>
					</g>
				</g>
			</g>
			<g>
				<polygon className="palma1" points="966.75,686.43 951.91,694.99 951.93,703.23 966.77,694.66 				"/>
				<polygon className="palma1" points="967.63,720.94 982.44,712.39 982.42,704.32 967.61,712.87 				"/>
				<polygon className="palma1" points="966.8,704.38 951.96,712.95 951.96,712.85 951.98,721.02 966.82,712.45 				"/>
				<polygon className="palma1" points="966.77,695.57 951.93,704.13 951.93,703.47 951.96,712.04 966.79,703.48 				"/>
				<polygon className="palma1" points="982.36,685.66 982.34,677.43 967.53,685.97 967.56,694.21 				"/>
				<polygon className="palma1" points="967.61,712 982.41,703.45 982.39,695.38 967.58,703.93 				"/>
				<polygon className="palma1" points="966.84,721.4 966.82,713.32 951.98,721.89 952.01,729.96 966.87,721.38 				"/>
				<polygon className="palma1" points="967.58,703.02 982.39,694.47 982.36,686.56 967.56,695.11 				"/>
				<polygon className="palma8" points="966.8,704.38 966.79,703.48 951.96,712.04 951.96,712.85 951.96,712.95 				"/>
				<polygon className="palma8" points="967.58,703.93 982.39,695.38 982.39,694.47 967.58,703.02 				"/>
				<polygon className="palma8" points="967.56,694.21 967.53,685.97 967.36,686.08 966.75,686.43 966.77,694.66 				"/>
				<polygon className="palma8" points="966.82,713.32 966.84,721.4 966.87,721.38 967.63,720.94 967.61,712.87 				"/>
				<polygon className="palma8" points="967.58,703.02 967.56,695.11 966.77,695.57 966.79,703.48 966.8,704.38 966.82,712.45 967.61,712 
					967.58,703.93 				"/>
				<polygon className="palma8" points="966.77,695.57 967.56,695.11 982.36,686.56 982.36,685.66 967.56,694.21 966.77,694.66 
					951.93,703.23 951.93,703.47 951.93,704.13 				"/>
				<polygon className="palma8" points="967.61,712.87 982.42,704.32 982.41,703.45 967.61,712 966.82,712.45 951.98,721.02 951.98,721.89 
					966.82,713.32 				"/>
			</g>
			<g>
				<polygon className="palma1" points="863.55,746.08 848.72,754.64 848.74,762.88 863.57,754.31 				"/>
				<polygon className="palma1" points="864.44,780.59 879.25,772.04 879.22,763.97 864.42,772.52 				"/>
				<polygon className="palma1" points="863.6,764.03 848.77,772.6 848.77,772.5 848.79,780.67 863.62,772.1 				"/>
				<polygon className="palma1" points="863.58,755.22 848.74,763.78 848.74,763.12 848.76,771.69 863.6,763.13 				"/>
				<polygon className="palma1" points="879.17,745.31 879.14,737.08 864.34,745.63 864.36,753.86 				"/>
				<polygon className="palma1" points="864.41,771.65 879.22,763.1 879.19,755.03 864.39,763.58 				"/>
				<polygon className="palma1" points="863.65,781.05 863.63,772.97 848.79,781.54 848.81,789.61 863.67,781.03 				"/>
				<polygon className="palma1" points="864.39,762.67 879.19,754.12 879.17,746.21 864.37,754.76 				"/>
				<polygon className="palma8" points="863.6,764.03 863.6,763.13 848.76,771.69 848.77,772.5 848.77,772.6 				"/>
				<polygon className="palma8" points="864.39,763.58 879.19,755.03 879.19,754.12 864.39,762.67 				"/>
				<polygon className="palma8" points="864.36,753.86 864.34,745.63 864.16,745.73 863.55,746.08 863.57,754.31 				"/>
				<polygon className="palma8" points="863.63,772.97 863.65,781.05 863.67,781.03 864.44,780.59 864.42,772.52 				"/>
				<polygon className="palma8" points="864.39,762.67 864.37,754.76 863.58,755.22 863.6,763.13 863.6,764.03 863.62,772.1 864.41,771.65 
					864.39,763.58 				"/>
				<polygon className="palma8" points="863.58,755.22 864.37,754.76 879.17,746.21 879.17,745.31 864.36,753.86 863.57,754.31 
					848.74,762.88 848.74,763.12 848.74,763.78 				"/>
				<polygon className="palma8" points="864.42,772.52 879.22,763.97 879.22,763.1 864.41,771.65 863.62,772.1 848.79,780.67 
					848.79,781.54 863.63,772.97 				"/>
			</g>
			<polygon className="palma8" points="951.91,694.99 879.14,737.08 879.25,772.04 952.01,729.96 			"/>
			<g>
				<polygon className="palma1" points="932.69,706.08 917.85,714.64 917.87,722.88 932.71,714.31 				"/>
				<polygon className="palma1" points="933.57,740.59 948.38,732.04 948.36,723.97 933.55,732.52 				"/>
				<polygon className="palma1" points="932.74,724.03 917.9,732.6 917.9,732.5 917.93,740.67 932.76,732.1 				"/>
				<polygon className="palma1" points="932.71,715.21 917.88,723.78 917.87,723.12 917.9,731.69 932.73,723.13 				"/>
				<polygon className="palma1" points="948.31,705.31 948.28,697.08 933.47,705.62 933.5,713.86 				"/>
				<polygon className="palma1" points="933.55,731.65 948.36,723.1 948.33,715.03 933.52,723.58 				"/>
				<polygon className="palma1" points="932.79,741.05 932.76,732.97 917.93,741.54 917.95,749.61 932.81,741.03 				"/>
				<polygon className="palma1" points="933.52,722.67 948.33,714.12 948.31,706.21 933.5,714.76 				"/>
				<polygon className="palma8" points="932.74,724.03 932.73,723.13 917.9,731.69 917.9,732.5 917.9,732.6 				"/>
				<polygon className="palma8" points="933.52,723.58 948.33,715.03 948.33,714.12 933.52,722.67 				"/>
				<polygon className="palma8" points="933.5,713.86 933.47,705.62 933.3,705.73 932.69,706.08 932.71,714.31 				"/>
				<polygon className="palma8" points="932.76,732.97 932.79,741.05 932.81,741.03 933.57,740.59 933.55,732.52 				"/>
				<polygon className="palma8" points="933.52,722.67 933.5,714.76 932.71,715.21 932.73,723.13 932.74,724.03 932.76,732.1 
					933.55,731.65 933.52,723.58 				"/>
				<polygon className="palma8" points="932.71,715.21 933.5,714.76 948.31,706.21 948.31,705.31 933.5,713.86 932.71,714.31 
					917.87,722.88 917.87,723.12 917.88,723.78 				"/>
				<polygon className="palma8" points="933.55,732.52 948.36,723.97 948.36,723.1 933.55,731.65 932.76,732.1 917.93,740.67 
					917.93,741.54 932.76,732.97 				"/>
			</g>
			<g>
				<polygon className="palma1" points="897.61,726.43 882.78,734.99 882.8,743.23 897.63,734.66 				"/>
				<polygon className="palma1" points="898.5,760.94 913.31,752.39 913.28,744.32 898.48,752.87 				"/>
				<polygon className="palma1" points="897.66,744.38 882.83,752.95 882.83,752.85 882.85,761.02 897.68,752.45 				"/>
				<polygon className="palma1" points="897.64,735.57 882.8,744.13 882.8,743.47 882.82,752.04 897.66,743.48 				"/>
				<polygon className="palma1" points="913.23,725.66 913.2,717.43 898.4,725.98 898.42,734.21 				"/>
				<polygon className="palma1" points="898.47,752 913.28,743.45 913.25,735.38 898.45,743.93 				"/>
				<polygon className="palma1" points="897.71,761.4 897.69,753.32 882.85,761.89 882.87,769.96 897.73,761.38 				"/>
				<polygon className="palma1" points="898.44,743.02 913.25,734.47 913.23,726.56 898.42,735.11 				"/>
				<polygon className="palma8" points="897.66,744.38 897.66,743.48 882.82,752.04 882.83,752.85 882.83,752.95 				"/>
				<polygon className="palma8" points="898.45,743.93 913.25,735.38 913.25,734.47 898.44,743.02 				"/>
				<polygon className="palma8" points="898.42,734.21 898.4,725.98 898.22,726.08 897.61,726.43 897.63,734.66 				"/>
				<polygon className="palma8" points="897.69,753.32 897.71,761.4 897.73,761.38 898.5,760.94 898.48,752.87 				"/>
				<polygon className="palma8" points="898.44,743.02 898.42,735.11 897.64,735.57 897.66,743.48 897.66,744.38 897.68,752.45 898.47,752 
					898.45,743.93 				"/>
				<polygon className="palma8" points="897.64,735.57 898.42,735.11 913.23,726.56 913.23,725.66 898.42,734.21 897.63,734.66 
					882.8,743.23 882.8,743.47 882.8,744.13 				"/>
				<polygon className="palma8" points="898.48,752.87 913.28,744.32 913.28,743.45 898.47,752 897.68,752.45 882.85,761.02 882.85,761.89 
					897.69,753.32 				"/>
			</g>
			<g>
				<polygon className="palma8" points="838.29,757.13 838.3,752.95 797.62,727.73 797.61,731.91 797.64,731.93 797.61,731.95 
					797.6,735.64 838.28,760.86 838.29,757.17 838.3,757.13 				"/>
				<polygon className="palma22" points="843,750.13 838.3,752.95 838.29,757.13 838.3,757.13 838.39,757.08 838.29,757.17 838.28,760.86 
					842.98,758.05 842.98,754.32 842.99,754.32 				"/>
				<polygon className="palma23" points="838.3,752.95 843,750.13 802.32,724.91 797.62,727.73 838.3,752.95 				"/>
			</g>
			<g>
				<polygon className="palma24" points="991.36,674.15 991.38,669.96 945.34,641.93 945.33,646.11 945.36,646.13 945.33,646.15 
					945.32,649.84 991.35,677.88 991.36,674.19 991.37,674.14 				"/>
				<polygon className="palma24" points="996.07,667.15 991.38,669.96 991.36,674.15 991.37,674.14 991.46,674.09 991.36,674.19 
					991.35,677.88 996.04,675.06 996.05,671.34 996.05,671.34 				"/>
				<polygon className="palma23" points="991.38,669.96 996.07,667.15 950.04,639.11 945.34,641.93 991.38,669.96 				"/>
			</g>
			<g>
				<polygon className="palma24" points="843.02,759.78 843,755.59 993.26,668.78 993.28,672.96 993.24,672.98 993.28,673 993.29,676.69 
					843.02,763.51 843.02,759.82 843,759.77 				"/>
				<polygon className="palma8" points="838.3,752.78 843,755.59 843.02,759.78 843,759.77 842.92,759.72 843.02,759.82 843.02,763.51 
					838.33,760.69 838.32,756.97 838.32,756.96 				"/>
				<polygon className="palma23" points="843,755.59 838.3,752.78 988.57,665.96 993.26,668.78 843,755.59 				"/>
			</g>
			<polygon className="palma4" points="797.6,756.21 808.15,761.81 797.81,767.83 748.91,796.29 739.72,789.92 			"/>
			<polygon className="palma18" points="808.15,761.81 808.15,772.97 754.12,805.16 748.91,796.29 			"/>
		</g>
		<polygon className="palma13" points="668.83,854.82 763.88,799.42 768.32,801.66 668.9,859.51 		"/>
		<polygon className="palma13" points="668.9,854.74 487.9,750.02 487.86,753.88 668.83,859.43 		"/>
		<polygon className="palma13" points="204.87,586.08 23.87,481.36 23.82,485.22 204.8,590.77 		"/>
		<polygon className="palma13" points="985.91,680.95 843.02,763.51 838.28,760.86 838.26,787.28 842.95,784.47 850.05,788.9 985.91,710.5 
					"/>
		<g>
			<path className="palma25" d="M873.53,530.2L873.53,530.2c62.13-35.87,119.15-16.73,163.38,32.16l0.02,4.31l-90.9,52.48l0,0l72.16-41.66
				l-0.01-3.81c-39.16-43.27-89.62-53.91-144.59-22.18c-55,31.75-105.24,100.53-143.99,188.79l0.01,3.8l-18.76,10.84l-0.02-4.3
				C754.69,650.88,811.37,566.09,873.53,530.2z"/>
			<path className="palma6" d="M873.6,551.5c54.97-31.74,105.43-21.09,144.59,22.18l0.01,3.81l-72.16,41.66l-0.01-1.88
				c-19.56-21.67-44.78-26.98-72.28-11.1c-27.5,15.88-52.6,50.24-72.01,94.41l0.01,1.88l24.36-14.06l0,0l-96.49,55.7l-0.01-3.8
				C768.36,652.03,818.6,583.25,873.6,551.5z"/>
			<path className="palma1" d="M921.68,631.94c-9.36-10.31-20.65-15.02-33.05-12.91l-0.03-9.2l-29.81,17.21l0.02,9.26
				c-12.32,12.18-23.5,29.84-32.73,50.82l0.01,1.27l-24.36,14.06l-0.01-1.88c19.41-44.17,44.51-78.53,72.01-94.41
				c27.5-15.88,52.72-10.56,72.28,11.1l0.01,1.88l0,0l-24.35,14.06L921.68,631.94z"/>
			<path className="palma25" d="M826.09,687.12c9.23-20.98,20.41-38.64,32.73-50.82l0.01,1.55c2.89,1.68,4.53,2.58,7.45,4.24l14.95-8.63
				c2.9-5.02,4.5-7.8,7.4-12.82l-0.01-1.6c12.39-2.11,23.69,2.6,33.05,12.91l0,1.27l-95.58,55.18l0,0L826.09,687.12z"/>
			<path className="palma1" d="M888.6,609.83l0.03,9.2l0.01,1.6c-2.9,5.03-4.5,7.8-7.4,12.82l-14.95,8.63c-2.92-1.66-4.56-2.56-7.45-4.24
				l-0.01-1.55l-0.02-9.26L888.6,609.83z"/>
		</g>
	</g>
	<line className="palma26" x1="158.18" y1="507.7" x2="424.3" y2="347.96"/>
	<polygon className="palma26" points="437.47,363.29 402.4,363.51 189.93,488.38 542.33,692.98 761,552.01 	"/>
	<path className="palma26" d="M761,552.01L542.33,692.98l126.36,73.37l47.25-27.15l22.43-45.88c38.53-73.42,74.23-111.2,74.23-111.2
		L761,552.01z"/>
	<polygon className="" points="368.5,383.43 781.33,622.1 812.6,582.12 437.47,363.29 402.4,363.51 	"/>
	<g>
		<polygon className="palma28" points="425.37,444.07 437.43,436.77 429.1,432.22 423.22,435.78 338.76,397.43 233.88,461.37 
			314.52,505.45 325.04,505.2 337.1,497.9 328.8,493.28 417.07,439.54 		"/>
		<g>
			<g>
				<polygon className="palma29" points="355.71,408.68 274.34,458.23 272.47,378.13 353.84,328.58 				"/>
				<polygon className="palma30" points="353.84,328.58 272.47,378.13 270.88,377.26 352.25,327.71 				"/>
				<polygon className="palma31" points="272.75,457.35 270.88,377.26 272.47,378.13 274.34,458.23 				"/>
			</g>
			<g>
				<polygon className="palma26" points="340.68,394.34 287.75,426.57 286.53,374.47 339.46,342.24 				"/>
				<polygon className="palma32" points="339.46,342.24 286.53,374.47 285.5,373.9 338.43,341.67 				"/>
				<polygon className="palma30" points="286.71,426 285.5,373.9 286.53,374.47 287.75,426.57 				"/>
			</g>
			<g>
				<g>
					<path className="palma20" d="M282.19,372.73c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L282.19,372.73z"/>
					<path className="palma30" d="M283.57,374.32c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C283.31,373.82,283.57,373.96,283.57,374.32z"/>
					<path className="palma33" d="M283.46,374.38c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C283.25,373.98,283.46,374.1,283.46,374.38z"/>
				</g>
				<g>
					<path className="palma20" d="M289.28,368.39c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L289.28,368.39z"/>
					<path className="palma30" d="M290.66,369.98c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C290.4,369.48,290.65,369.62,290.66,369.98z"/>
					<path className="palma33" d="M290.55,370.05c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C290.34,369.65,290.55,369.76,290.55,370.05z"/>
				</g>
				<g>
					<path className="palma20" d="M296.37,363.98c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L296.37,363.98z"/>
					<path className="palma30" d="M297.75,365.57c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C297.48,365.08,297.74,365.22,297.75,365.57z"/>
					<path className="palma33" d="M297.64,365.64c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C297.43,365.24,297.63,365.35,297.64,365.64z"/>
				</g>
				<g>
					<path className="palma20" d="M303.45,359.64c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L303.45,359.64z"/>
					<path className="palma30" d="M304.83,361.23c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C304.57,360.73,304.82,360.87,304.83,361.23z"/>
					<path className="palma33" d="M304.72,361.29c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C304.51,360.89,304.72,361,304.72,361.29z"/>
				</g>
				<g>
					<path className="palma20" d="M310.54,355.41c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L310.54,355.41z"/>
					<path className="palma30" d="M311.92,356.99c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C311.66,356.5,311.91,356.64,311.92,356.99z"/>
					
						<ellipse transform="matrix(0.4797 -0.8774 0.8774 0.4797 -151.5282 459.1329)" className="palma33" cx="311.37" cy="357.33" rx="0.64" ry="0.37"/>
				</g>
				<g>
					<path className="palma20" d="M317.63,351.06c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L317.63,351.06z"/>
					<path className="palma30" d="M319.01,352.65c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C318.75,352.15,319,352.29,319.01,352.65z"/>
					<path className="palma33" d="M318.9,352.72c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C318.69,352.32,318.89,352.43,318.9,352.72z"/>
				</g>
				<g>
					<path className="palma20" d="M324.72,346.78c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L324.72,346.78z"/>
					<path className="palma30" d="M326.1,348.37c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C325.83,347.87,326.09,348.01,326.1,348.37z"/>
					<path className="palma33" d="M325.99,348.44c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C325.78,348.04,325.98,348.15,325.99,348.44z"/>
				</g>
				<g>
					<path className="palma20" d="M331.81,342.47c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L331.81,342.47z"/>
					<path className="palma30" d="M333.18,344.06c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C332.92,343.56,333.18,343.7,333.18,344.06z"/>
					<path className="palma33" d="M333.08,344.13c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C332.86,343.73,333.07,343.84,333.08,344.13z"/>
				</g>
				<g>
					<path className="palma20" d="M338.89,338.15c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L338.89,338.15z"/>
					<path className="palma30" d="M340.27,339.74c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C340.01,339.24,340.26,339.38,340.27,339.74z"/>
					<path className="palma33" d="M340.16,339.81c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C339.95,339.41,340.16,339.52,340.16,339.81z"/>
				</g>
				<g>
					<path className="palma20" d="M345.98,333.76c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L345.98,333.76z"/>
					<path className="palma30" d="M347.36,335.35c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C347.09,334.85,347.35,334.99,347.36,335.35z"/>
					
						<ellipse transform="matrix(0.4797 -0.8774 0.8774 0.4797 -114.0994 478.9641)" className="palma33" cx="346.8" cy="335.69" rx="0.64" ry="0.37"/>
				</g>
			</g>
			<g>
				<g>
					<polygon className="palma34" points="334.8,477.91 334.38,477.68 334.12,466.56 334.54,466.79 					"/>
					<polygon className="palma34" points="346.37,470.87 345.95,470.64 345.69,459.52 346.11,459.75 					"/>
					<polygon className="palma34" points="357.93,463.83 357.51,463.6 357.25,452.48 357.68,452.71 					"/>
					<polygon className="palma34" points="369.5,456.78 369.08,456.55 368.82,445.44 369.24,445.67 					"/>
					<polygon className="palma34" points="381.07,449.74 380.65,449.51 380.39,438.39 380.81,438.62 					"/>
					<polygon className="palma34" points="392.63,442.7 392.21,442.47 391.95,431.35 392.37,431.58 					"/>
					<polygon className="palma34" points="404.2,435.66 403.78,435.43 403.52,424.31 403.94,424.54 					"/>
				</g>
				<g>
					<polygon className="palma35" points="311.76,478.21 311.35,478.46 311.09,467.34 311.5,467.09 					"/>
					<polygon className="palma35" points="299.88,471.71 299.47,471.96 299.21,460.84 299.62,460.6 					"/>
					<polygon className="palma35" points="288,465.22 287.59,465.47 287.33,454.35 287.74,454.1 					"/>
					<polygon className="palma35" points="276.12,458.72 275.71,458.97 275.45,447.85 275.86,447.6 					"/>
				</g>
				<g>
					<polygon className="palma35" points="335.21,477.66 334.8,477.91 334.54,466.79 334.95,466.54 					"/>
					<polygon className="palma35" points="323.64,484.7 323.24,484.95 322.98,473.84 323.39,473.59 					"/>
					<polygon className="palma35" points="323.6,482.62 323.3,482.45 334.54,466.79 334.84,466.96 					"/>
					<polygon className="palma35" points="335.16,475.58 334.86,475.41 346.11,459.75 346.4,459.92 					"/>
					<polygon className="palma35" points="346.73,468.53 346.43,468.37 357.67,452.71 357.97,452.87 					"/>
					<polygon className="palma35" points="358.3,461.49 358,461.33 369.24,445.67 369.54,445.83 					"/>
					<polygon className="palma35" points="369.86,454.45 369.56,454.29 380.8,438.63 381.1,438.79 					"/>
					<polygon className="palma35" points="381.43,447.4 381.13,447.24 392.38,431.58 392.67,431.74 					"/>
					<polygon className="palma35" points="392.99,440.37 392.69,440.2 403.94,424.54 404.23,424.7 					"/>
					<polygon className="palma35" points="323.2,483.35 323.19,482.87 404.56,433.32 404.57,433.8 					"/>
					<polygon className="palma35" points="346.78,470.62 346.37,470.87 346.11,459.75 346.52,459.5 					"/>
					<polygon className="palma35" points="358.34,463.58 357.93,463.83 357.67,452.71 358.08,452.46 					"/>
					<polygon className="palma35" points="369.91,456.54 369.5,456.78 369.24,445.67 369.65,445.42 					"/>
					<polygon className="palma35" points="381.48,449.49 381.07,449.74 380.81,438.62 381.22,438.37 					"/>
					<polygon className="palma35" points="393.04,442.45 392.63,442.7 392.37,431.58 392.78,431.33 					"/>
					<polygon className="palma35" points="404.61,435.41 404.2,435.66 403.94,424.54 404.35,424.29 					"/>
				</g>
				<g>
					<polygon className="palma34" points="275.66,456.88 275.35,456.38 286.91,454.12 287.21,454.62 					"/>
					<polygon className="palma34" points="287.53,463.38 287.23,462.88 298.78,460.61 299.09,461.11 					"/>
					<polygon className="palma34" points="299.42,469.88 299.12,469.37 310.67,467.11 310.98,467.61 					"/>
					<polygon className="palma34" points="311.3,476.37 310.99,475.87 322.55,473.6 322.86,474.1 					"/>
					<polygon className="palma34" points="275.25,457.13 275.24,456.65 323.19,482.87 323.2,483.35 					"/>
					<polygon className="palma34" points="275.71,458.97 275.29,458.74 275.03,447.62 275.45,447.85 					"/>
					<polygon className="palma34" points="287.59,465.47 287.17,465.24 286.91,454.12 287.33,454.35 					"/>
					<polygon className="palma34" points="299.47,471.96 299.05,471.73 298.79,460.61 299.21,460.84 					"/>
					<polygon className="palma34" points="311.35,478.46 310.93,478.23 310.67,467.11 311.09,467.34 					"/>
					<polygon className="palma34" points="323.24,484.95 322.81,484.72 322.56,473.61 322.98,473.84 					"/>
				</g>
			</g>
			<g>
				<g>
					<polygon className="palma30" points="373.34,407.81 364.18,413.39 359.2,410.67 354.77,408.25 363.93,402.67 					"/>
					<polygon className="palma31" points="364.18,413.39 359.2,410.67 354.77,408.25 354.79,408.95 359.22,411.37 364.2,414.09 					"/>
					<polygon className="palma29" points="364.18,413.39 369.03,410.44 373.34,407.81 373.36,408.52 369.05,411.14 364.2,414.09 					"/>
				</g>
				<g>
					<path className="palma34" d="M368.62,310.88l-6.92-3.78l2.26,96.99l6.92,3.78L368.62,310.88z M364.53,380.07l5.24-0.4l0.08,3.31
						L364.53,380.07z M369.86,383.5l0.08,3.31l-5.4-6.22L369.86,383.5z M364.34,372.03l5.24-0.4l0.08,3.31L364.34,372.03z
						 M369.67,375.46l0.08,3.31l-5.4-6.22L369.67,375.46z M364.15,363.99l5.24-0.4l0.08,3.31L364.15,363.99z M369.49,367.43
						l0.08,3.31l-5.4-6.22L369.49,367.43z M363.97,355.95l5.24-0.4l0.08,3.31L363.97,355.95z M369.3,359.39l0.08,3.31l-5.4-6.22
						L369.3,359.39z M363.78,347.91l5.24-0.4l0.08,3.31L363.78,347.91z M369.11,351.35l0.08,3.31l-5.4-6.22L369.11,351.35z
						 M363.59,339.87l5.24-0.4l0.08,3.31L363.59,339.87z M368.92,343.31l0.08,3.31l-5.4-6.22L368.92,343.31z M363.4,331.84l5.24-0.4
						l0.08,3.31L363.4,331.84z M368.74,335.27l0.08,3.31l-5.4-6.22L368.74,335.27z M363.22,323.8l5.24-0.4l0.08,3.31L363.22,323.8z
						 M368.55,327.23l0.08,3.31l-5.4-6.22L368.55,327.23z M363.03,315.76l5.24-0.4l0.08,3.31L363.03,315.76z M368.36,319.19
						l0.08,3.31l-5.4-6.22L368.36,319.19z M362.35,315.21l-0.17-7.15l5.83,6.71L362.35,315.21z M368.2,322.81l-5.66,0.43l-0.17-7.15
						L368.2,322.81z M368.38,330.85l-5.66,0.43l-0.17-7.15L368.38,330.85z M368.57,338.89l-5.66,0.43l-0.17-7.15L368.57,338.89z
						 M368.76,346.93l-5.66,0.43l-0.17-7.15L368.76,346.93z M368.95,354.97l-5.66,0.43l-0.17-7.15L368.95,354.97z M369.13,363
						l-5.66,0.43l-0.17-7.15L369.13,363z M369.32,371.04l-5.66,0.43l-0.17-7.15L369.32,371.04z M369.51,379.08l-5.66,0.43
						l-0.17-7.15L369.51,379.08z M369.7,387.12l-5.66,0.43l-0.17-7.15L369.7,387.12z M369.96,387.7l0.08,3.31l-5.32-2.91
						L369.96,387.7z M364.92,396.67l5.32,2.91l0.08,3.31L364.92,396.67z M370.07,403.2l-5.66,0.43l-0.17-7.15L370.07,403.2z
						 M364.9,396.14l5.24-0.4l0.08,3.31L364.9,396.14z M364.22,395.59l-0.17-7.15l5.83,6.71L364.22,395.59z M364.73,388.63
						l5.32,2.91l0.08,3.31L364.73,388.63z M368.25,314.47l-5.4-6.22l5.32,2.91L368.25,314.47z M365.09,404.18l5.24-0.4l0.08,3.31
						L365.09,404.18z"/>
					<path className="palma36" d="M361.7,307.1l-6.74,4.1l2.26,96.99l6.74-4.1L361.7,307.1z M357.76,382.87l5.1-6.46l0.08,3.31
						L357.76,382.87z M362.95,380.25l0.08,3.31l-5.26-0.16L362.95,380.25z M357.57,374.83l5.1-6.46l0.08,3.31L357.57,374.83z
						 M362.77,372.21l0.08,3.31l-5.26-0.16L362.77,372.21z M357.39,366.79l5.1-6.46l0.08,3.31L357.39,366.79z M362.58,364.17
						l0.08,3.31l-5.26-0.16L362.58,364.17z M357.2,358.76l5.1-6.46l0.08,3.31L357.2,358.76z M362.39,356.13l0.08,3.31l-5.26-0.16
						L362.39,356.13z M357.01,350.72l5.1-6.46l0.08,3.31L357.01,350.72z M362.2,348.09l0.08,3.31l-5.26-0.16L362.2,348.09z
						 M356.82,342.68l5.1-6.46l0.08,3.31L356.82,342.68z M362.01,340.05l0.08,3.31l-5.26-0.16L362.01,340.05z M356.64,334.64
						l5.1-6.46l0.08,3.31L356.64,334.64z M361.83,332.02l0.08,3.31l-5.26-0.16L361.83,332.02z M356.45,326.6l5.1-6.46l0.08,3.31
						L356.45,326.6z M361.64,323.98l0.08,3.31l-5.26-0.16L361.64,323.98z M356.26,318.56l5.1-6.46l0.08,3.31L356.26,318.56z
						 M361.45,315.94l0.08,3.31l-5.26-0.16L361.45,315.94z M355.6,318.78l-0.17-7.15l5.67,0.17L355.6,318.78z M361.29,319.84
						l-5.51,6.98l-0.17-7.15L361.29,319.84z M361.48,327.88l-5.51,6.98l-0.17-7.15L361.48,327.88z M361.67,335.92l-5.51,6.98
						l-0.17-7.15L361.67,335.92z M361.86,343.96l-5.51,6.98l-0.17-7.15L361.86,343.96z M362.04,352l-5.51,6.98l-0.17-7.15
						L362.04,352z M362.23,360.04l-5.51,6.98l-0.17-7.15L362.23,360.04z M362.42,368.07l-5.51,6.98l-0.17-7.15L362.42,368.07z
						 M362.61,376.11l-5.51,6.98l-0.17-7.15L362.61,376.11z M362.8,384.15l-5.51,6.98l-0.17-7.15L362.8,384.15z M363.05,384.45
						l0.08,3.31l-5.18,3.15L363.05,384.45z M358.15,399.48l5.18-3.15l0.08,3.31L358.15,399.48z M363.17,400.23l-5.51,6.98
						l-0.17-7.15L363.17,400.23z M358.14,398.95l5.1-6.46l0.08,3.31L358.14,398.95z M357.48,399.17l-0.17-7.15l5.67,0.17
						L357.48,399.17z M357.96,391.44l5.18-3.15l0.08,3.31L357.96,391.44z M361.34,311.21l-5.26-0.16l5.18-3.15L361.34,311.21z
						 M358.33,406.99l5.1-6.46l0.08,3.31L358.33,406.99z"/>
					<path className="palma34" d="M361.89,314.98l-6.92-3.78l2.26,96.99l6.92,3.78L361.89,314.98z M357.79,384.17l5.24-0.4l0.08,3.31
						L357.79,384.17z M363.12,387.6l0.08,3.31l-5.4-6.22L363.12,387.6z M357.6,376.13l5.24-0.4l0.08,3.31L357.6,376.13z
						 M362.94,379.57l0.08,3.31l-5.4-6.22L362.94,379.57z M357.42,368.09l5.24-0.4l0.08,3.31L357.42,368.09z M362.75,371.53
						l0.08,3.31l-5.4-6.22L362.75,371.53z M357.23,360.05l5.24-0.4l0.08,3.31L357.23,360.05z M362.56,363.49l0.08,3.31l-5.4-6.22
						L362.56,363.49z M357.04,352.02l5.24-0.4l0.08,3.31L357.04,352.02z M362.37,355.45l0.08,3.31l-5.4-6.22L362.37,355.45z
						 M356.85,343.98l5.24-0.4l0.08,3.31L356.85,343.98z M362.19,347.41l0.08,3.31l-5.4-6.22L362.19,347.41z M356.67,335.94
						l5.24-0.4l0.08,3.31L356.67,335.94z M362,339.37l0.08,3.31l-5.4-6.22L362,339.37z M356.48,327.9l5.24-0.4l0.08,3.31
						L356.48,327.9z M361.81,331.34l0.08,3.31l-5.4-6.22L361.81,331.34z M356.29,319.86l5.24-0.4l0.08,3.31L356.29,319.86z
						 M361.62,323.3l0.08,3.31l-5.4-6.22L361.62,323.3z M355.61,319.31l-0.17-7.15l5.83,6.71L355.61,319.31z M361.46,326.92
						l-5.66,0.43l-0.17-7.15L361.46,326.92z M361.65,334.95l-5.66,0.43l-0.17-7.15L361.65,334.95z M361.83,342.99l-5.66,0.43
						l-0.17-7.15L361.83,342.99z M362.02,351.03l-5.66,0.43l-0.17-7.15L362.02,351.03z M362.21,359.07l-5.66,0.43l-0.17-7.15
						L362.21,359.07z M362.4,367.11l-5.66,0.43l-0.17-7.15L362.4,367.11z M362.58,375.15l-5.66,0.43l-0.17-7.15L362.58,375.15z
						 M362.77,383.18l-5.66,0.43l-0.17-7.15L362.77,383.18z M362.96,391.22l-5.66,0.43l-0.17-7.15L362.96,391.22z M363.22,391.8
						l0.08,3.31l-5.32-2.91L363.22,391.8z M358.18,400.77l5.32,2.91l0.08,3.31L358.18,400.77z M363.33,407.3l-5.66,0.43l-0.17-7.15
						L363.33,407.3z M358.17,400.25l5.24-0.4l0.08,3.31L358.17,400.25z M357.49,399.7l-0.17-7.15l5.83,6.71L357.49,399.7z
						 M357.99,392.73l5.32,2.91l0.08,3.31L357.99,392.73z M361.51,318.57l-5.4-6.22l5.32,2.91L361.51,318.57z M358.35,408.28
						l5.24-0.4l0.08,3.31L358.35,408.28z"/>
					<path className="palma35" d="M368.62,310.88l-6.74,4.1l2.26,96.99l6.74-4.1L368.62,310.88z M365.25,410.77l5.1-6.46l0.08,3.31
						L365.25,410.77z M365.06,402.73l5.1-6.46l0.08,3.31L365.06,402.73z M370.25,400.11l0.08,3.31l-5.26-0.16L370.25,400.11z
						 M364.87,394.69l5.1-6.46l0.08,3.31L364.87,394.69z M370.06,392.07l0.08,3.31l-5.26-0.16L370.06,392.07z M364.68,386.66
						l5.1-6.46l0.08,3.31L364.68,386.66z M369.88,384.03l0.08,3.31l-5.26-0.16L369.88,384.03z M364.5,378.62l5.1-6.46l0.08,3.31
						L364.5,378.62z M369.69,375.99l0.08,3.31l-5.26-0.16L369.69,375.99z M364.31,370.58l5.1-6.46l0.08,3.31L364.31,370.58z
						 M369.5,367.95l0.08,3.31l-5.26-0.16L369.5,367.95z M364.12,362.54l5.1-6.46l0.08,3.31L364.12,362.54z M369.31,359.91
						l0.08,3.31l-5.26-0.16L369.31,359.91z M363.93,354.5l5.1-6.46l0.08,3.31L363.93,354.5z M369.12,351.88l0.08,3.31l-5.26-0.16
						L369.12,351.88z M363.75,346.46l5.1-6.46l0.08,3.31L363.75,346.46z M368.94,343.84l0.08,3.31l-5.26-0.16L368.94,343.84z
						 M363.56,338.42l5.1-6.46l0.08,3.31L363.56,338.42z M368.75,335.8l0.08,3.31l-5.26-0.16L368.75,335.8z M363.37,330.39l5.1-6.46
						l0.08,3.31L363.37,330.39z M368.56,327.76l0.08,3.31l-5.26-0.16L368.56,327.76z M363.18,322.35l5.1-6.46l0.08,3.31
						L363.18,322.35z M368.37,319.72l0.08,3.31l-5.26-0.16L368.37,319.72z M362.52,322.57l-0.17-7.15l5.67,0.17L362.52,322.57z
						 M368.22,323.63l-5.51,6.98l-0.17-7.15L368.22,323.63z M368.4,331.67l-5.51,6.98l-0.17-7.15L368.4,331.67z M368.59,339.7
						l-5.51,6.98l-0.17-7.15L368.59,339.7z M368.78,347.74l-5.51,6.98l-0.17-7.15L368.78,347.74z M368.97,355.78l-5.51,6.98
						l-0.17-7.15L368.97,355.78z M369.15,363.82l-5.51,6.98l-0.17-7.15L369.15,363.82z M369.34,371.86l-5.51,6.98l-0.17-7.15
						L369.34,371.86z M369.53,379.9l-5.51,6.98l-0.17-7.15L369.53,379.9z M369.72,387.93l-5.51,6.98l-0.17-7.15L369.72,387.93z
						 M369.91,395.97l-5.51,6.98l-0.17-7.15L369.91,395.97z M370.09,404.01l-5.51,6.98l-0.17-7.15L370.09,404.01z M368.26,314.99
						l-5.26-0.16l5.18-3.15L368.26,314.99z"/>
				</g>
			</g>
			<g>
				<g>
					<polygon className="palma30" points="423.22,435.08 414.06,440.66 409.08,437.94 404.65,435.51 413.81,429.94 					"/>
					<polygon className="palma31" points="414.06,440.66 409.08,437.94 404.65,435.51 404.66,436.22 409.09,438.64 414.07,441.36 					"/>
					<polygon className="palma29" points="414.06,440.66 418.9,437.71 423.22,435.08 423.23,435.79 418.92,438.41 414.07,441.36 					"/>
				</g>
				<g>
					<path className="palma34" d="M418.5,338.15l-6.92-3.78l2.26,96.99l6.92,3.78L418.5,338.15z M414.4,407.33l5.24-0.4l0.08,3.31
						L414.4,407.33z M419.74,410.77l0.08,3.31l-5.4-6.22L419.74,410.77z M414.22,399.3l5.24-0.4l0.08,3.31L414.22,399.3z
						 M419.55,402.73l0.08,3.31l-5.4-6.22L419.55,402.73z M414.03,391.26l5.24-0.4l0.08,3.31L414.03,391.26z M419.36,394.69
						l0.08,3.31l-5.4-6.22L419.36,394.69z M413.84,383.22l5.24-0.4l0.08,3.31L413.84,383.22z M419.17,386.65l0.08,3.31l-5.4-6.22
						L419.17,386.65z M413.65,375.18l5.24-0.4l0.08,3.31L413.65,375.18z M418.99,378.62l0.08,3.31l-5.4-6.22L418.99,378.62z
						 M413.47,367.14l5.24-0.4l0.08,3.31L413.47,367.14z M418.8,370.58l0.08,3.31l-5.4-6.22L418.8,370.58z M413.28,359.1l5.24-0.4
						l0.08,3.31L413.28,359.1z M418.61,362.54l0.08,3.31l-5.4-6.22L418.61,362.54z M413.09,351.07l5.24-0.4l0.08,3.31L413.09,351.07
						z M418.42,354.5l0.08,3.31l-5.4-6.22L418.42,354.5z M412.9,343.03l5.24-0.4l0.08,3.31L412.9,343.03z M418.24,346.46l0.08,3.31
						l-5.4-6.22L418.24,346.46z M412.22,342.48l-0.17-7.15l5.83,6.71L412.22,342.48z M418.07,350.08l-5.66,0.43l-0.17-7.15
						L418.07,350.08z M418.26,358.12l-5.66,0.43l-0.17-7.15L418.26,358.12z M418.45,366.16l-5.66,0.43l-0.17-7.15L418.45,366.16z
						 M418.63,374.2l-5.66,0.43l-0.17-7.15L418.63,374.2z M418.82,382.23l-5.66,0.43l-0.17-7.15L418.82,382.23z M419.01,390.27
						l-5.66,0.43l-0.17-7.15L419.01,390.27z M419.2,398.31l-5.66,0.43l-0.17-7.15L419.2,398.31z M419.38,406.35l-5.66,0.43
						l-0.17-7.15L419.38,406.35z M419.57,414.39l-5.66,0.43l-0.17-7.15L419.57,414.39z M419.83,414.97l0.08,3.31l-5.32-2.91
						L419.83,414.97z M414.79,423.94l5.32,2.91l0.08,3.31L414.79,423.94z M419.95,430.46l-5.66,0.43l-0.17-7.15L419.95,430.46z
						 M414.78,423.41l5.24-0.4l0.08,3.31L414.78,423.41z M414.1,422.86l-0.17-7.15l5.83,6.71L414.1,422.86z M414.6,415.9l5.32,2.91
						l0.08,3.31L414.6,415.9z M418.13,341.73l-5.4-6.22l5.32,2.91L418.13,341.73z M414.97,431.45l5.24-0.4l0.08,3.31L414.97,431.45z
						"/>
					<path className="palma36" d="M411.58,334.37l-6.74,4.1l2.26,96.99l6.74-4.1L411.58,334.37z M407.64,410.14l5.1-6.46l0.08,3.31
						L407.64,410.14z M412.83,407.51l0.08,3.31l-5.26-0.16L412.83,407.51z M407.45,402.1l5.1-6.46l0.08,3.31L407.45,402.1z
						 M412.64,399.48l0.08,3.31l-5.26-0.16L412.64,399.48z M407.26,394.06l5.1-6.46l0.08,3.31L407.26,394.06z M412.45,391.44
						l0.08,3.31l-5.26-0.16L412.45,391.44z M407.07,386.02l5.1-6.46l0.08,3.31L407.07,386.02z M412.26,383.4l0.08,3.31l-5.26-0.16
						L412.26,383.4z M406.89,377.99l5.1-6.46l0.08,3.31L406.89,377.99z M412.08,375.36l0.08,3.31l-5.26-0.16L412.08,375.36z
						 M406.7,369.95l5.1-6.46l0.08,3.31L406.7,369.95z M411.89,367.32l0.08,3.31l-5.26-0.16L411.89,367.32z M406.51,361.91l5.1-6.46
						l0.08,3.31L406.51,361.91z M411.7,359.28l0.08,3.31l-5.26-0.16L411.7,359.28z M406.32,353.87l5.1-6.46l0.08,3.31L406.32,353.87
						z M411.51,351.25l0.08,3.31l-5.26-0.16L411.51,351.25z M406.14,345.83l5.1-6.46l0.08,3.31L406.14,345.83z M411.33,343.21
						l0.08,3.31l-5.26-0.16L411.33,343.21z M405.47,346.05l-0.17-7.15l5.67,0.17L405.47,346.05z M411.17,347.11l-5.51,6.98
						l-0.17-7.15L411.17,347.11z M411.36,355.15l-5.51,6.98l-0.17-7.15L411.36,355.15z M411.54,363.19l-5.51,6.98l-0.17-7.15
						L411.54,363.19z M411.73,371.23l-5.51,6.98l-0.17-7.15L411.73,371.23z M411.92,379.26l-5.51,6.98l-0.17-7.15L411.92,379.26z
						 M412.11,387.3l-5.51,6.98l-0.17-7.15L412.11,387.3z M412.29,395.34l-5.51,6.98l-0.17-7.15L412.29,395.34z M412.48,403.38
						l-5.51,6.98l-0.17-7.15L412.48,403.38z M412.67,411.42l-5.51,6.98l-0.17-7.15L412.67,411.42z M412.93,411.71l0.08,3.31
						l-5.18,3.15L412.93,411.71z M408.02,426.74l5.18-3.15l0.08,3.31L408.02,426.74z M413.05,427.5l-5.51,6.98l-0.17-7.15
						L413.05,427.5z M408.01,426.22l5.1-6.46l0.08,3.31L408.01,426.22z M407.35,426.44l-0.17-7.15l5.67,0.17L407.35,426.44z
						 M407.84,418.71l5.18-3.15l0.08,3.31L407.84,418.71z M411.22,338.48l-5.26-0.16l5.18-3.15L411.22,338.48z M408.2,434.25
						l5.1-6.46l0.08,3.31L408.2,434.25z"/>
					<path className="palma34" d="M411.76,342.25l-6.92-3.78l2.26,96.99l6.92,3.78L411.76,342.25z M407.67,411.44l5.24-0.4l0.08,3.31
						L407.67,411.44z M413,414.87l0.08,3.31l-5.4-6.22L413,414.87z M407.48,403.4l5.24-0.4l0.08,3.31L407.48,403.4z M412.81,406.83
						l0.08,3.31l-5.4-6.22L412.81,406.83z M407.29,395.36l5.24-0.4l0.08,3.31L407.29,395.36z M412.62,398.8l0.08,3.31l-5.4-6.22
						L412.62,398.8z M407.1,387.32l5.24-0.4l0.08,3.31L407.1,387.32z M412.44,390.76l0.08,3.31l-5.4-6.22L412.44,390.76z
						 M406.92,379.28l5.24-0.4l0.08,3.31L406.92,379.28z M412.25,382.72l0.08,3.31l-5.4-6.22L412.25,382.72z M406.73,371.24
						l5.24-0.4l0.08,3.31L406.73,371.24z M412.06,374.68l0.08,3.31l-5.4-6.22L412.06,374.68z M406.54,363.21l5.24-0.4l0.08,3.31
						L406.54,363.21z M411.87,366.64l0.08,3.31l-5.4-6.22L411.87,366.64z M406.35,355.17l5.24-0.4l0.08,3.31L406.35,355.17z
						 M411.68,358.6l0.08,3.31l-5.4-6.22L411.68,358.6z M406.17,347.13l5.24-0.4l0.08,3.31L406.17,347.13z M411.5,350.57l0.08,3.31
						l-5.4-6.22L411.5,350.57z M405.49,346.58l-0.17-7.15l5.83,6.71L405.49,346.58z M411.33,354.18l-5.66,0.43l-0.17-7.15
						L411.33,354.18z M411.52,362.22l-5.66,0.43l-0.17-7.15L411.52,362.22z M411.71,370.26l-5.66,0.43l-0.17-7.15L411.71,370.26z
						 M411.9,378.3l-5.66,0.43l-0.17-7.15L411.9,378.3z M412.08,386.34l-5.66,0.43l-0.17-7.15L412.08,386.34z M412.27,394.38
						l-5.66,0.43l-0.17-7.15L412.27,394.38z M412.46,402.41l-5.66,0.43l-0.17-7.15L412.46,402.41z M412.65,410.45l-5.66,0.43
						l-0.17-7.15L412.65,410.45z M412.83,418.49l-5.66,0.43l-0.17-7.15L412.83,418.49z M413.1,419.07l0.08,3.31l-5.32-2.91
						L413.1,419.07z M408.05,428.04l5.32,2.91l0.08,3.31L408.05,428.04z M413.21,434.57l-5.66,0.43l-0.17-7.15L413.21,434.57z
						 M408.04,427.51l5.24-0.4l0.08,3.31L408.04,427.51z M407.36,426.96l-0.17-7.15l5.83,6.71L407.36,426.96z M407.87,420l5.32,2.91
						l0.08,3.31L407.87,420z M411.39,345.84l-5.4-6.22l5.32,2.91L411.39,345.84z M408.23,435.55l5.24-0.4l0.08,3.31L408.23,435.55z"
						/>
					<path className="palma35" d="M418.5,338.15l-6.74,4.1l2.26,96.99l6.74-4.1L418.5,338.15z M415.12,438.04l5.1-6.46l0.08,3.31
						L415.12,438.04z M414.93,430l5.1-6.46l0.08,3.31L414.93,430z M420.12,427.37l0.08,3.31l-5.26-0.16L420.12,427.37z
						 M414.75,421.96l5.1-6.46l0.08,3.31L414.75,421.96z M419.94,419.34l0.08,3.31l-5.26-0.16L419.94,419.34z M414.56,413.92
						l5.1-6.46l0.08,3.31L414.56,413.92z M419.75,411.3l0.08,3.31l-5.26-0.16L419.75,411.3z M414.37,405.88l5.1-6.46l0.08,3.31
						L414.37,405.88z M419.56,403.26l0.08,3.31l-5.26-0.16L419.56,403.26z M414.18,397.85l5.1-6.46l0.08,3.31L414.18,397.85z
						 M419.37,395.22l0.08,3.31l-5.26-0.16L419.37,395.22z M414,389.81l5.1-6.46l0.08,3.31L414,389.81z M419.19,387.18l0.08,3.31
						l-5.26-0.16L419.19,387.18z M413.81,381.77l5.1-6.46l0.08,3.31L413.81,381.77z M419,379.14l0.08,3.31l-5.26-0.16L419,379.14z
						 M413.62,373.73l5.1-6.46l0.08,3.31L413.62,373.73z M418.81,371.11l0.08,3.31l-5.26-0.16L418.81,371.11z M413.43,365.69
						l5.1-6.46l0.08,3.31L413.43,365.69z M418.62,363.07l0.08,3.31l-5.26-0.16L418.62,363.07z M413.24,357.65l5.1-6.46l0.08,3.31
						L413.24,357.65z M418.44,355.03l0.08,3.31l-5.26-0.16L418.44,355.03z M413.06,349.62l5.1-6.46l0.08,3.31L413.06,349.62z
						 M418.25,346.99l0.08,3.31l-5.26-0.16L418.25,346.99z M412.4,349.84l-0.17-7.15l5.67,0.17L412.4,349.84z M418.09,350.89
						l-5.51,6.98l-0.17-7.15L418.09,350.89z M418.28,358.93l-5.51,6.98l-0.17-7.15L418.28,358.93z M418.47,366.97l-5.51,6.98
						l-0.17-7.15L418.47,366.97z M418.65,375.01l-5.51,6.98l-0.17-7.15L418.65,375.01z M418.84,383.05l-5.51,6.98l-0.17-7.15
						L418.84,383.05z M419.03,391.09l-5.51,6.98l-0.17-7.15L419.03,391.09z M419.22,399.13l-5.51,6.98l-0.17-7.15L419.22,399.13z
						 M419.4,407.16l-5.51,6.98l-0.17-7.15L419.4,407.16z M419.59,415.2l-5.51,6.98l-0.17-7.15L419.59,415.2z M419.78,423.24
						l-5.51,6.98l-0.17-7.15L419.78,423.24z M419.97,431.28l-5.51,6.98l-0.17-7.15L419.97,431.28z M418.14,342.26l-5.26-0.16
						l5.18-3.15L418.14,342.26z"/>
				</g>
			</g>
			<g>
				<polygon className="palma32" points="404.22,418.6 322.84,468.15 273.95,441.42 355.32,391.87 				"/>
				<g>
					<polygon className="palma20" points="334.82,460.86 334.41,461.11 285.51,434.38 285.92,434.13 					"/>
					<polygon className="palma20" points="346.39,453.82 345.98,454.07 297.08,427.33 297.49,427.09 					"/>
					<polygon className="palma20" points="357.95,446.77 357.54,447.02 308.64,420.29 309.05,420.04 					"/>
					<polygon className="palma20" points="369.52,439.73 369.11,439.98 320.21,413.25 320.62,413 					"/>
					<polygon className="palma20" points="381.08,432.69 380.67,432.94 331.78,406.21 332.19,405.96 					"/>
					<polygon className="palma20" points="392.65,425.65 392.24,425.9 343.34,399.16 343.75,398.91 					"/>
				</g>
				<polygon className="palma30" points="322.98,473.84 322.84,468.15 273.94,441.42 274.08,447.11 				"/>
				<polygon className="palma20" points="322.84,468.15 322.98,473.84 404.35,424.29 404.22,418.61 				"/>
			</g>
			<g>
				<polygon className="palma28" points="391.56,426.32 361.27,427.02 353.73,422.89 363.47,417.39 393.7,416.69 				"/>
				<polygon className="palma28" points="280.12,444.79 284.38,444.7 286.52,435.07 284.29,435.12 273.95,441.42 				"/>
				<polygon className="palma28" points="350.89,404.24 353.03,394.61 350.74,394.66 334.38,404.62 				"/>
				<polygon className="palma28" points="349.76,418.46 320,436.59 302.11,426.81 331.87,408.69 				"/>
				<path className="palma28" d="M363.6,406.5c0.15-0.17,0.31-0.4,0.47-0.7c0,0-0.2,0.04,0.03-0.06c0.01-0.02-0.24,0.1-0.24,0.1
					c0.03-0.09-0.19-0.05-0.17-0.13l-0.08-0.27c0.09-0.61,0.38-1-0.21-1.04c-0.44-0.03-1.47,0.19-2.26,0.38
					c-0.54,0.13-1.14,0.13-1.58-0.01c-0.17-0.05-0.37-0.09-0.62-0.1c-0.2,0-0.48,0.01-0.63,0.07c-0.01,0-0.01,0-0.02,0
					c-0.02,0.01-0.46,0.19-0.47,0.2c-0.04,0.02-0.06,0.05-0.06,0.09c0.04,0.21,0.79,0.06,0.84,0.33l-0.67-0.01l-0.04,0l0,0
					l-1.49-0.01l0,0l-0.02,0l-4.01-0.03l-2.3-0.02c-0.6-0.19-0.53-0.24-0.53-0.24s-1.39,0.04-1.76,0.03
					c0.12-0.21-0.59-0.25-0.79-0.08c-0.15,0.13-0.11,0.28,0.27,0.42c0.08,0.03,0.23,0.06,0.41,0.1l-0.04,0.04
					c-0.04,0.01-0.09,0.02-0.11,0.04l-0.01,0.01c-0.03,0.03-0.01,0.07,0.06,0.08c0.06,0.01,0.14-0.01,0.17-0.04l0.01-0.01
					c0.02-0.02,0.02-0.04-0.01-0.06l0.04-0.04c0.13,0.02,0.27,0.05,0.42,0.08l-0.03,0.03c-0.04,0.01-0.09,0.02-0.11,0.04l-0.01,0.01
					c-0.03,0.03-0.01,0.07,0.06,0.08c0.06,0.01,0.14-0.01,0.17-0.04l0.01-0.01c0.02-0.02,0.02-0.04-0.01-0.06l0.03-0.03
					c0.13,0.02,0.27,0.04,0.39,0.06l-0.03,0.03c-0.04,0.01-0.09,0.02-0.11,0.04l-0.01,0.01c-0.03,0.03-0.01,0.07,0.06,0.08
					c0.06,0.01,0.14-0.01,0.17-0.04l0.01-0.01c0.02-0.02,0.02-0.04-0.01-0.06l0.03-0.03c0.15,0.02,0.29,0.04,0.39,0.06l-0.03,0.03
					c-0.04,0.01-0.09,0.02-0.11,0.04l-0.01,0.01c-0.03,0.03-0.01,0.07,0.06,0.08c0.06,0.01,0.14-0.01,0.17-0.04l0.01-0.01
					c0.02-0.02,0.02-0.04-0.01-0.06l0.03-0.04c0.09,0.01,0.14,0.02,0.14,0.02l0.17-0.07l2.61,0.05c0,0,0.01,0,0.01,0.01l0,0l0.01,0
					c0,0,0.01,0,0.01,0l5.29,0.52c0,0.01-0.01,0.01-0.01,0.02c-0.01,0.02-0.03,0.04-0.04,0.06c-0.37,0.08-0.83,0.09-0.96,0.15
					c0,0,0,0,0,0c-0.02,0.01-0.44,0.18-0.45,0.19c-0.04,0.03-0.01,0.07,0.15,0.13c1.07,0.41,1.92-0.11,2.48-0.13
					c0.5-0.02,0.98,0.03,1.38,0.14c0.45,0.13,1.06,0.28,1.52,0.3l-0.01,0c-0.01,0-0.01,0-0.02,0.01l0,0l0,0
					c-0.05,0.02-0.09,0.05-0.11,0.08c-0.05,0.07,0.01,0.14,0.12,0.15c0.06,0.01,0.13,0,0.18-0.02l0,0L363.6,406.5z"/>
				<path className="palma28" d="M308.03,442.35c0.01-0.02-0.2,0.09-0.2,0.09c0.03-0.07-0.16-0.04-0.14-0.11l-0.07-0.23
					c0.08-0.52,0.33-0.86-0.18-0.89c-0.38-0.02-1.26,0.16-1.95,0.32c-0.47,0.11-0.98,0.11-1.36-0.01c-0.14-0.05-0.32-0.08-0.53-0.08
					c-0.17,0-0.41,0.01-0.54,0.06c0,0-0.01,0-0.01,0c-0.02,0.01-0.39,0.16-0.41,0.17c-0.04,0.02-0.05,0.04-0.05,0.07
					c0.04,0.18,0.68,0.05,0.72,0.29l-0.57,0l-0.04,0l-1.28-0.01l-0.02,0l-1.45-0.01c-0.04-0.05-0.08-0.1-0.11-0.15l-0.31-0.34
					c-0.69-0.65-1.39-0.77-1.84-0.81c-0.64-0.06-1.37,0.65-1.59,0.63c-0.22-0.02-0.85-0.29-1.44-0.3c-0.16,0-0.28,0.05-0.36,0.13
					c0,0-0.01,0-0.01,0c0,0-0.01,0.02-0.03,0.04c-0.02,0.02-0.03,0.04-0.04,0.07c-0.06,0.1-0.16,0.27-0.24,0.4
					c-0.13-0.08-0.51-0.07-0.64,0.04c-0.12,0.1-0.09,0.23,0.17,0.33l-0.29,0l-0.06,0l-0.69,0l-0.03,0l-0.82,0l-0.02,0l2.36,1.02
					c0,0,0,0.01,0.01,0.01c0.01,0.03,0.03,0.06,0.05,0.09l0.01,0c0.43,0.7,1.14,1.29,1.7,1.31c0.6,0.02,0.96-0.22,1.16-0.23
					c0.2-0.01,1.74,0.77,2.33,0.74c0.32-0.01,0.74-0.06,0.92-0.36c0-0.01,0.06-0.11,0.14-0.23c0.04,0,0.33-1.18,0.33-1.18
					c-0.04-0.17-0.11-0.37-0.22-0.6l2.06,0.2c0,0-0.01,0.01-0.01,0.01c-0.01,0.02-0.02,0.03-0.04,0.05
					c-0.32,0.07-0.71,0.08-0.82,0.13c0,0,0,0,0,0c-0.02,0.01-0.38,0.15-0.39,0.16c-0.04,0.02-0.01,0.06,0.13,0.11
					c0.92,0.35,1.65-0.1,2.13-0.11c0.43-0.02,0.84,0.03,1.19,0.12c0.38,0.11,0.91,0.24,1.31,0.26l-0.01,0c-0.01,0-0.01,0-0.02,0.01
					l0,0l0,0c-0.04,0.02-0.08,0.04-0.1,0.07c-0.04,0.06,0.01,0.12,0.11,0.13c0.05,0.01,0.11,0,0.16-0.02l0,0l1.55-0.77
					c0.13-0.15,0.26-0.34,0.4-0.6C308,442.4,307.82,442.44,308.03,442.35z"/>
				<path className="palma28" d="M342.02,444.52c0.02,0.73-1.21,1.35-2.73,1.38c-1.52,0.04-2.77-0.53-2.79-1.25
					c-0.02-0.73,1.21-1.35,2.73-1.38S342.01,443.79,342.02,444.52z"/>
				<path className="palma28" d="M355.53,436.35c0.02,0.73-1.21,1.35-2.73,1.38s-2.77-0.53-2.79-1.25c-0.02-0.73,1.21-1.35,2.73-1.38
					C354.27,435.06,355.52,435.62,355.53,436.35z"/>
				<path className="palma28" d="M357.13,411.85c0.03,1.35-2.24,2.5-5.06,2.56c-2.83,0.07-5.15-0.98-5.18-2.33s2.24-2.5,5.06-2.56
					C354.78,409.45,357.09,410.49,357.13,411.85z"/>
			</g>
			<g>
				<polygon className="palma37" points="352.67,416.36 322.9,434.48 305.02,424.7 334.78,406.58 				"/>
				<polygon className="palma28" points="344.11,414.67 324.74,426.47 313.1,420.1 332.47,408.31 				"/>
				<polygon className="palma30" points="322.95,436.56 322.9,434.48 305.02,424.7 305.07,426.78 				"/>
				<polygon className="palma20" points="322.9,434.48 322.95,436.56 352.72,418.44 352.67,416.36 				"/>
			</g>
			<g>
				<g>
					<g>
						<g>
							<path className="palma38" d="M325.37,414.76c-0.05-0.15-0.18-0.29-0.39-0.41c-0.27-0.15-0.63-0.22-0.99-0.21l0.04,1.6
								c0.36-0.01,0.71-0.1,0.98-0.26c0.27-0.16,0.4-0.37,0.39-0.57l0,0l0,0v0l0-0.09L325.37,414.76z"/>
							<path className="palma39" d="M323.01,414.4c-0.2,0.12-0.32,0.27-0.37,0.42l-0.02,0.06l0,0.1h0c0.01,0.2,0.15,0.41,0.42,0.56
								c0.28,0.15,0.63,0.22,0.99,0.21l-0.04-1.6C323.63,414.15,323.28,414.24,323.01,414.4z"/>
							<path className="palma38" d="M323.01,414.31c-0.54,0.33-0.52,0.83,0.03,1.13c0.27,0.15,0.63,0.22,0.99,0.21l-0.03-1.13
								L323.01,414.31z"/>
							<path className="palma34" d="M323.01,414.31l0.99,0.21l0.98-0.26C324.42,413.96,323.54,413.98,323.01,414.31z"/>
							<path className="palma36" d="M324.97,414.26l-0.98,0.26l0.03,1.13c0.36-0.01,0.71-0.09,0.98-0.26
								C325.53,415.07,325.52,414.56,324.97,414.26z"/>
						</g>
						<g>
							<path className="palma38" d="M323.9,410.52l0.1,4.15c0.05,0,0.11-0.01,0.15-0.04c0.04-0.02,0.06-0.06,0.06-0.09l-0.09-4.03
								L323.9,410.52z"/>
							<path className="palma39" d="M323.69,410.53l0.09,4.03l0,0c0,0.03,0.02,0.06,0.06,0.08c0.04,0.02,0.09,0.03,0.15,0.03l-0.1-4.15
								L323.69,410.53z"/>
						</g>
						<g>
							<path className="palma40" d="M322.49,409.56c-0.32,0.19-0.25,0.42-0.25,0.67c0.01,0.24,0.17,0.48,0.5,0.66
								c0.65,0.36,1.7,0.33,2.34-0.05c0.32-0.19,0.47-0.44,0.47-0.69c-0.01-0.24,0.05-0.5-0.28-0.68
								C324.62,409.11,323.12,409.17,322.49,409.56z"/>
							<path className="palma41" d="M322.48,409.29c-0.32,0.19-0.25,0.42-0.25,0.67c0.01,0.24,0.17,0.48,0.5,0.66
								c0.65,0.36,1.7,0.33,2.34-0.05c0.32-0.19,0.47-0.44,0.47-0.69c-0.01-0.24,0.05-0.5-0.28-0.68
								C324.61,408.84,323.12,408.9,322.48,409.29z"/>
							<path className="palma42" d="M322.7,409c-0.64,0.39-0.62,0.99,0.03,1.35c0.65,0.36,1.7,0.33,2.34-0.05
								c0.64-0.39,0.62-0.99-0.03-1.35C324.38,408.59,323.33,408.62,322.7,409z"/>
						</g>
					</g>
					<g>
						<path className="palma43" d="M324.17,400.37c-0.01,0.03,0.03,0.08,0.1,0.11c0.03,0.01,0.06,0.02,0.08,0.02l3,1.51l0.12-0.2
							l-3.08-1.39c-0.02-0.02-0.05-0.05-0.09-0.06C324.25,400.33,324.19,400.33,324.17,400.37z"/>
						<path className="palma44" d="M327.55,402.33l0.18-0.4l-0.1-0.39l-0.72-0.28l-0.34,0.32l0.27,0.51l0.07,2.18
							c-0.54-0.45-2.08-1.05-2.08-1.05s-0.76,0.93,0.17,1.43c0.94,0.5,2.03,1.11,2.69,0.84c0.21-0.08,0.22-0.35,0.25-0.57
							C328.05,404.19,327.55,402.33,327.55,402.33z"/>
						<path className="palma40" d="M328.63,414.93c-0.24-0.22-1.39-0.43-1.39-0.43c-0.06,0.15-0.12,0.34-0.08,0.5
							c-0.03,0.04-0.03,0.08-0.01,0.15c0.15,0.36,0.68,0.38,0.82,0.4c0.14,0.03,0.21,0.1,0.4,0.21c0.19,0.11,0.46,0.13,0.62,0.1
							c0.16-0.03,0.19-0.16,0.18-0.2l0,0C329.23,415.47,328.9,415.18,328.63,414.93z"/>
						<path className="palma40" d="M326.95,415.83c-0.24-0.22-1.39-0.43-1.39-0.43c-0.06,0.15-0.12,0.34-0.08,0.5
							c-0.03,0.04-0.03,0.08-0.01,0.15c0.15,0.36,0.68,0.38,0.82,0.4c0.14,0.03,0.21,0.1,0.4,0.21c0.19,0.11,0.46,0.13,0.62,0.1
							c0.16-0.03,0.19-0.16,0.18-0.2l0,0C327.55,416.37,327.22,416.09,326.95,415.83z"/>
						<path className="palma45" d="M324.29,407.33l-0.91,0.08l0.56,2.34l3.01,2.04l0.24,2.45c0.01,0.33,0.22,0.62,0.54,0.72l0.08,0.03
							l0.1,0.03c0.25,0.08,0.5-0.1,0.5-0.36l-0.01-2.93c0-0.57-0.26-1.12-0.71-1.48l-2.58-1.81L324.29,407.33z"/>
						<path className="palma39" d="M324.88,406.94c-0.24-0.11-1.75,0.55-2.12,1.36l-0.21-0.09l-0.84-0.03c0,0-0.16,1.56,0.48,2.64
							c0.43,0.73,1.56,1.11,3.12,1.72c0.02,0.87,0.14,2.58,0.14,2.58c0.01,0.33,0.22,0.62,0.54,0.72l0.08,0.03l0.1,0.03
							c0.25,0.08,0.5-0.1,0.5-0.36l0.14-3.53c0.01-0.29-0.12-0.56-0.35-0.73c-0.56-0.42-2.02-1.36-2.17-1.48
							c-0.42-0.33-0.19-0.73-0.2-1.25C324.08,407.69,325.15,407.06,324.88,406.94z"/>
						<g>
							<path className="palma44" d="M324.05,402.63c-0.03,0.2-0.05,0.4-0.06,0.55c0.19,0.07,0.26,0.27,0.26,0.27s0.38,1.32,0.09,1.41
								c-0.39,0.12-1.73-0.99-1.64-1.12c0.3-0.43-0.12-1.54-0.12-1.54L324.05,402.63z"/>
							<path className="palma46" d="M322.78,403.57c0.17,0.33,1.31,0.93,1.47,1.19c-0.01-1.09-0.14-1.48-0.26-1.58
								c0.29-0.07,0.54-0.1,0.67-0.04c0.19,0.09,0.42,0.2,0.5,0.35l0,0c0.12,0.14-0.06,1.48-0.05,2.12c0,0.62,0.33,3.4,0.16,3.5
								c-0.4,0.24-1.47,0.94-2.28,1.24c-0.37,0.14-0.77,0.01-1.04-0.12c-0.17-0.08-0.2-0.58-0.24-0.77
								c-0.13-0.65-0.62-3.44-0.22-4.98C321.61,404.03,322.72,403.6,322.78,403.57z"/>
							<path className="palma47" d="M324.01,402.9c-0.01,0.08,0.18,0.78,0.18,0.84c-0.28,0.09-1.32-0.39-1.42-0.82
								c-0.06-0.38-0.2-0.72-0.2-0.72l1.47,0.43c-0.01,0.08-0.02,0.17-0.03,0.24C324.02,402.88,324.01,402.89,324.01,402.9z"/>
							<path className="palma44" d="M323.5,400.8c0.47,0.04,1.03,0.07,1.42,0.89c0.04,0.09,0.02,0.27,0,0.48
								c-0.01,0.07-0.09,0.18-0.09,0.25c0,0.01,0,0.02,0,0.03c0.13,0.36-0.29,1.13-0.43,1.18c-0.32,0.12-1.79-0.38-1.8-1.43
								C322.58,401.48,323.03,400.77,323.5,400.8z"/>
						</g>
						<path className="palma40" d="M324.94,401.81c0,0-0.98,0.5-0.63,2.17c0,0-0.74-0.38-0.85-1.28c0,0-0.46,0.41-0.34,1.07
							c0,0-0.47-0.93-0.45-1.18c0,0-0.16,0.58-0.04,1.04c0,0-0.54-1.51-0.15-2.49C322.87,400.18,324.86,400.38,324.94,401.81z"/>
						<path className="palma44" d="M321.61,404.2c-0.67,0.54-0.91,3.37-0.91,3.37l0.07,0.61c0,0,1.49,2.15,2.36,2.4l0.05-0.76l-1.42-2.08
							c0,0,0.63-1.32,0.78-2.29C322.67,404.48,322.05,403.85,321.61,404.2z"/>
						<path className="palma43" d="M324.52,406.99c-0.04-0.01-0.08,0.04-0.09,0.11c-0.01,0.03-0.01,0.06,0,0.09l-1.05,3.19l0.21,0.09
							l0.92-3.25c0.02-0.02,0.04-0.05,0.05-0.09C324.57,407.06,324.55,407,324.52,406.99z"/>
						<polygon className="palma44" points="323.17,409.82 323.43,409.64 323.95,409.85 323.77,410.7 323.31,410.82 323.12,410.58 						"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path className="palma36" d="M330.76,414.7c-0.05,0-0.1-0.03-0.11-0.09c-0.02-0.06,0.02-0.12,0.08-0.14l2.2-0.55l-0.18-7.69
								c0-0.06,0.05-0.12,0.11-0.12c0.06,0,0.12,0.05,0.12,0.11l0.18,7.88l-2.38,0.59C330.77,414.7,330.76,414.7,330.76,414.7z"/>
						</g>
						<g>
							<path className="palma36" d="M335.35,414.6c-0.01,0-0.02,0-0.03,0l-2.31-0.46c-0.06-0.01-0.1-0.07-0.09-0.13
								c0.01-0.06,0.07-0.1,0.13-0.09l2.31,0.46c0.06,0.01,0.1,0.07,0.09,0.13C335.45,414.56,335.41,414.59,335.35,414.6z"/>
						</g>
						<g>
							<path className="palma36" d="M333.08,415.93c-0.06,0-0.12-0.05-0.12-0.11l-0.04-1.8c0-0.06,0.05-0.12,0.11-0.12s0.12,0.05,0.12,0.11
								l0.04,1.8C333.2,415.88,333.15,415.93,333.08,415.93z"/>
						</g>
					</g>
					<path className="palma48" d="M334.58,403.94c0.99,0.54,1.02,1.46,0.05,2.05c-0.97,0.59-2.56,0.63-3.55,0.08
						c-0.99-0.54-1.02-1.46-0.05-2.05C332,403.44,333.59,403.4,334.58,403.94z"/>
					<path className="palma49" d="M332.99,404.91c0.09,0.05,0.09,0.14,0,0.19s-0.24,0.06-0.33,0.01c-0.09-0.05-0.09-0.14,0-0.19
						C332.75,404.87,332.9,404.86,332.99,404.91z"/>
					<g>
						<path className="palma36" d="M332.83,405.06c-0.06,0-0.12-0.05-0.12-0.11l-0.01-0.61c0-0.06,0.05-0.12,0.11-0.12
							c0.06,0,0.12,0.05,0.12,0.11l0.01,0.61C332.94,405,332.89,405.06,332.83,405.06z"/>
					</g>
				</g>
				<g>
					<path className="palma40" d="M330.48,409.49l-0.03-1.45l-4.33,0.1l0.03,1.45c0.01,0.32,0.23,0.63,0.65,0.87
						c0.86,0.47,2.23,0.44,3.06-0.07C330.28,410.13,330.49,409.81,330.48,409.49z"/>
					<path className="palma40" d="M329.79,407.17c0.86,0.47,0.88,1.26,0.04,1.77c-0.83,0.51-2.2,0.54-3.06,0.07
						c-0.86-0.47-0.88-1.26-0.04-1.77S328.94,406.7,329.79,407.17z"/>
					<path className="palma50" d="M329.69,407.24c0.8,0.44,0.81,1.17,0.04,1.64c-0.78,0.47-2.05,0.5-2.85,0.07
						c-0.8-0.44-0.81-1.17-0.04-1.64C327.62,406.83,328.89,406.8,329.69,407.24z"/>
					<g>
						<path className="palma37" d="M326.76,410.46c-0.03,0-0.05-0.02-0.05-0.04l-0.03-1.45c0-0.02,0.02-0.05,0.04-0.05
							c0.03,0,0.05,0.02,0.05,0.04l0.03,1.45C326.81,410.44,326.79,410.46,326.76,410.46z"/>
					</g>
					<g>
						<path className="palma37" d="M327.9,410.84c-0.03,0-0.05-0.02-0.05-0.04l-0.03-1.45c0-0.03,0.02-0.05,0.04-0.05s0.05,0.02,0.05,0.04
							l0.03,1.45C327.95,410.82,327.93,410.84,327.9,410.84z"/>
					</g>
					<g>
						<path className="palma37" d="M329.33,410.66c-0.02,0-0.05-0.02-0.05-0.04l-0.03-1.45c0-0.02,0.02-0.05,0.04-0.05
							c0.02,0,0.05,0.02,0.05,0.04l0.03,1.45C329.37,410.64,329.35,410.66,329.33,410.66z"/>
					</g>
					<g>
						<path className="palma37" d="M330.29,410.06c-0.03,0-0.05-0.02-0.05-0.04l-0.03-1.45c0-0.03,0.02-0.05,0.04-0.05
							c0.03,0,0.05,0.02,0.05,0.04l0.03,1.45C330.34,410.04,330.32,410.06,330.29,410.06z"/>
					</g>
					<path className="palma37" d="M329.86,410.19c-0.83,0.51-2.2,0.54-3.06,0.07c-0.43-0.23-0.65-0.55-0.65-0.87l0,0.19
						c0.01,0.32,0.23,0.63,0.65,0.87c0.86,0.47,2.23,0.44,3.06-0.07c0.42-0.25,0.62-0.58,0.61-0.9l0-0.19
						C330.48,409.62,330.28,409.94,329.86,410.19z"/>
					<path className="palma37" d="M329.83,408.94c-0.83,0.51-2.2,0.54-3.06,0.07c-0.43-0.23-0.65-0.55-0.65-0.87l0,0.19
						c0.01,0.32,0.23,0.63,0.65,0.87c0.86,0.47,2.23,0.44,3.06-0.07c0.42-0.25,0.62-0.58,0.61-0.9l0-0.19
						C330.45,408.36,330.25,408.68,329.83,408.94z"/>
				</g>
				<g>
					<g>
						<g>
							<path className="palma36" d="M320.94,417.99c-0.04,0-0.08-0.03-0.09-0.07c-0.01-0.05,0.02-0.09,0.06-0.1l1.66-0.41l-0.08-3.38
								c0-0.05,0.04-0.09,0.08-0.09c0.05,0,0.09,0.04,0.09,0.08l0.08,3.52l-1.79,0.45C320.95,417.99,320.95,417.99,320.94,417.99z"
								/>
						</g>
						<g>
							<path className="palma36" d="M324.41,417.91c-0.01,0-0.01,0-0.02,0l-1.74-0.35c-0.05-0.01-0.08-0.05-0.07-0.1
								c0.01-0.05,0.05-0.08,0.1-0.07l1.74,0.35c0.05,0.01,0.08,0.05,0.07,0.1C324.49,417.88,324.45,417.91,324.41,417.91z"/>
						</g>
						<g>
							<path className="palma36" d="M322.7,418.92c-0.05,0-0.09-0.04-0.09-0.08l-0.03-1.36c0-0.05,0.04-0.09,0.08-0.09
								c0.05,0,0.09,0.04,0.09,0.08l0.03,1.36C322.78,418.88,322.75,418.92,322.7,418.92z"/>
						</g>
					</g>
					<g>
						<path className="palma40" d="M324.54,413.73l-0.03-1.36l-4.08,0.1l0.03,1.37c0.01,0.3,0.21,0.6,0.62,0.82
							c0.81,0.44,2.1,0.41,2.89-0.07C324.35,414.34,324.55,414.03,324.54,413.73z"/>
						<path className="palma40" d="M323.89,411.55c0.81,0.44,0.82,1.19,0.04,1.67c-0.79,0.48-2.08,0.51-2.89,0.07
							c-0.81-0.44-0.82-1.19-0.04-1.67C321.79,411.14,323.08,411.11,323.89,411.55z"/>
						<path className="palma37" d="M323.96,414.4c-0.79,0.48-2.08,0.51-2.89,0.07c-0.4-0.22-0.61-0.52-0.62-0.82l0,0.18
							c0.01,0.3,0.21,0.6,0.62,0.82c0.81,0.44,2.1,0.41,2.89-0.07c0.39-0.24,0.59-0.55,0.58-0.85l0-0.18
							C324.54,413.85,324.35,414.16,323.96,414.4z"/>
						<path className="palma37" d="M323.93,413.21c-0.79,0.48-2.08,0.51-2.89,0.07c-0.4-0.22-0.61-0.52-0.62-0.82l0,0.18
							c0.01,0.3,0.21,0.6,0.62,0.82c0.81,0.44,2.1,0.41,2.89-0.07c0.39-0.24,0.59-0.55,0.58-0.85l0-0.18
							C324.51,412.67,324.32,412.97,323.93,413.21z"/>
						<path className="palma50" d="M323.79,411.61c0.75,0.41,0.77,1.1,0.04,1.55c-0.73,0.45-1.93,0.47-2.68,0.06
							c-0.75-0.41-0.77-1.1-0.04-1.55C321.84,411.23,323.04,411.2,323.79,411.61z"/>
						<g>
							<path className="palma37" d="M321.04,414.65c-0.02,0-0.04-0.02-0.04-0.04l-0.03-1.37c0-0.02,0.02-0.04,0.04-0.04
								c0.02,0,0.04,0.02,0.04,0.04l0.03,1.37C321.08,414.63,321.06,414.65,321.04,414.65z"/>
						</g>
						<g>
							<path className="palma37" d="M322.11,414.9c-0.02,0-0.04-0.02-0.04-0.04l-0.03-1.26c0-0.02,0.02-0.04,0.04-0.04
								c0.02,0,0.04,0.02,0.04,0.04l0.03,1.26C322.15,414.88,322.13,414.9,322.11,414.9z"/>
						</g>
						<g>
							<path className="palma37" d="M323.45,414.83c-0.02,0-0.04-0.02-0.04-0.04l-0.03-1.37c0-0.02,0.02-0.04,0.04-0.04
								s0.04,0.02,0.04,0.04l0.03,1.37C323.49,414.81,323.47,414.83,323.45,414.83z"/>
						</g>
						<g>
							<path className="palma37" d="M324.36,414.27c-0.02,0-0.04-0.02-0.04-0.04l-0.03-1.37c0-0.02,0.02-0.04,0.04-0.04
								s0.04,0.02,0.04,0.04l0.03,1.37C324.4,414.25,324.38,414.27,324.36,414.27z"/>
						</g>
					</g>
				</g>
				<g>
					<path className="palma39" d="M332.33,411.85l-0.44-2.84l-4.42,0.68l0.44,2.84c0.05,0.33,0.32,0.62,0.79,0.8
						c0.94,0.37,2.34,0.15,3.13-0.48C332.21,412.53,332.38,412.17,332.33,411.85z"/>
					<path className="palma39" d="M331.1,408.21c0.94,0.37,1.07,1.17,0.28,1.8c-0.79,0.63-2.19,0.85-3.13,0.48
						c-0.94-0.37-1.07-1.17-0.28-1.81C328.76,408.06,330.16,407.84,331.1,408.21z"/>
					<path className="palma37" d="M331.78,412.6c-0.79,0.63-2.19,0.85-3.13,0.48c-0.47-0.18-0.74-0.48-0.79-0.8l0.04,0.25
						c0.05,0.33,0.32,0.62,0.79,0.8c0.94,0.37,2.34,0.15,3.13-0.48c0.39-0.32,0.56-0.68,0.51-1l-0.04-0.25
						C332.34,411.92,332.18,412.28,331.78,412.6z"/>
					<path className="palma37" d="M331.38,410.01c-0.79,0.63-2.19,0.85-3.13,0.48c-0.47-0.18-0.74-0.48-0.79-0.8l0.04,0.25
						c0.05,0.33,0.32,0.62,0.79,0.8c0.94,0.37,2.34,0.15,3.13-0.48c0.39-0.32,0.56-0.68,0.51-1l-0.04-0.25
						C331.94,409.34,331.78,409.7,331.38,410.01z"/>
					<path className="palma50" d="M331,408.29c0.87,0.34,0.99,1.09,0.26,1.68c-0.73,0.59-2.03,0.79-2.91,0.45
						c-0.87-0.34-0.99-1.09-0.26-1.68C328.83,408.15,330.13,407.95,331,408.29z"/>
					<g>
						<path className="palma37" d="M328.65,413.34c-0.02,0-0.04-0.02-0.05-0.04l-0.44-2.84c0-0.03,0.01-0.05,0.04-0.05
							c0.02,0,0.05,0.01,0.05,0.04l0.44,2.84C328.7,413.32,328.68,413.34,328.65,413.34C328.65,413.34,328.65,413.34,328.65,413.34z
							"/>
					</g>
					<g>
						<path className="palma37" d="M329.87,413.58c-0.02,0-0.04-0.02-0.05-0.04l-0.44-2.84c0-0.03,0.01-0.05,0.04-0.05
							c0.02,0,0.05,0.01,0.05,0.04l0.44,2.84C329.92,413.55,329.9,413.58,329.87,413.58C329.87,413.58,329.87,413.58,329.87,413.58z
							"/>
					</g>
					<g>
						<path className="palma37" d="M331.3,413.2c-0.02,0-0.04-0.02-0.05-0.04l-0.44-2.84c0-0.03,0.01-0.05,0.04-0.05
							c0.02,0,0.05,0.01,0.05,0.04l0.44,2.84C331.35,413.17,331.33,413.19,331.3,413.2C331.3,413.2,331.3,413.2,331.3,413.2z"/>
					</g>
					<g>
						<path className="palma37" d="M332.21,412.46c-0.02,0-0.04-0.02-0.05-0.04l-0.44-2.84c0-0.03,0.01-0.05,0.04-0.05
							c0.02-0.01,0.05,0.01,0.05,0.04l0.44,2.84C332.25,412.43,332.24,412.45,332.21,412.46
							C332.21,412.46,332.21,412.46,332.21,412.46z"/>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path className="palma36" d="M324.28,419.63c-0.05,0-0.1-0.03-0.11-0.09c-0.02-0.06,0.02-0.12,0.08-0.14l2.2-0.55l-0.1-4.48
								c0-0.06,0.05-0.12,0.11-0.12c0.06,0,0.12,0.05,0.12,0.11l0.11,4.66l-2.38,0.59C324.29,419.63,324.29,419.63,324.28,419.63z"
								/>
						</g>
						<g>
							<path className="palma36" d="M328.87,419.52c-0.01,0-0.02,0-0.03,0l-2.31-0.46c-0.06-0.01-0.1-0.07-0.09-0.13
								c0.01-0.06,0.07-0.1,0.13-0.09l2.31,0.46c0.06,0.01,0.1,0.07,0.09,0.13C328.97,419.49,328.93,419.52,328.87,419.52z"/>
						</g>
						<g>
							<path className="palma36" d="M326.61,420.86c-0.06,0-0.12-0.05-0.12-0.11l-0.04-1.8c0-0.06,0.05-0.12,0.11-0.12s0.12,0.05,0.12,0.11
								l0.04,1.8C326.72,420.81,326.67,420.86,326.61,420.86z"/>
						</g>
					</g>
					<g>
						<path className="palma39" d="M328.13,414.14l0.13-2.87l-4.47-0.2l-0.13,2.87c-0.02,0.33,0.19,0.67,0.61,0.94
							c0.85,0.54,2.26,0.61,3.16,0.14C327.88,414.79,328.11,414.47,328.13,414.14z"/>
						<path className="palma39" d="M327.65,410.33c0.85,0.54,0.81,1.36-0.08,1.82c-0.9,0.46-2.31,0.4-3.16-0.14
							c-0.85-0.54-0.81-1.36,0.08-1.82C325.38,409.72,326.8,409.78,327.65,410.33z"/>
						<path className="palma37" d="M327.45,414.77c-0.9,0.46-2.31,0.4-3.16-0.14c-0.42-0.27-0.63-0.61-0.61-0.94l-0.01,0.25
							c-0.02,0.33,0.19,0.67,0.61,0.94c0.85,0.54,2.26,0.61,3.16,0.14c0.45-0.23,0.68-0.55,0.7-0.88l0.01-0.25
							C328.13,414.22,327.89,414.54,327.45,414.77z"/>
						<path className="palma37" d="M327.56,412.15c-0.9,0.46-2.31,0.4-3.16-0.14c-0.42-0.27-0.63-0.61-0.61-0.94l-0.01,0.25
							c-0.02,0.33,0.19,0.67,0.61,0.94c0.85,0.54,2.26,0.61,3.16,0.14c0.45-0.23,0.68-0.55,0.7-0.88l0.01-0.25
							C328.24,411.6,328.01,411.92,327.56,412.15z"/>
						<path className="palma50" d="M327.53,410.39c0.79,0.51,0.76,1.26-0.08,1.7c-0.83,0.43-2.15,0.37-2.94-0.13
							c-0.79-0.51-0.76-1.26,0.08-1.7C325.43,409.82,326.74,409.88,327.53,410.39z"/>
						<g>
							<path className="palma37" d="M324.23,414.88C324.23,414.88,324.23,414.88,324.23,414.88c-0.03,0-0.05-0.02-0.05-0.05l0.13-2.87
								c0-0.03,0.03-0.05,0.05-0.04c0.03,0,0.05,0.02,0.04,0.05l-0.13,2.87C324.28,414.86,324.26,414.88,324.23,414.88z"/>
						</g>
						<g>
							<path className="palma37" d="M325.38,415.35C325.38,415.35,325.38,415.35,325.38,415.35c-0.03,0-0.05-0.02-0.05-0.05l0.13-2.87
								c0-0.03,0.03-0.04,0.05-0.04c0.03,0,0.05,0.02,0.04,0.05l-0.13,2.87C325.43,415.33,325.41,415.35,325.38,415.35z"/>
						</g>
						<g>
							<path className="palma37" d="M326.86,415.26C326.86,415.26,326.86,415.26,326.86,415.26c-0.03,0-0.05-0.02-0.05-0.05l0.13-2.87
								c0-0.03,0.02-0.04,0.05-0.04c0.03,0,0.05,0.02,0.04,0.05l-0.13,2.87C326.9,415.24,326.88,415.26,326.86,415.26z"/>
						</g>
						<g>
							<path className="palma37" d="M327.9,414.71C327.89,414.71,327.89,414.71,327.9,414.71c-0.03,0-0.05-0.02-0.05-0.05l0.13-2.87
								c0-0.03,0.02-0.04,0.05-0.04c0.03,0,0.05,0.02,0.04,0.05l-0.13,2.87C327.94,414.69,327.92,414.71,327.9,414.71z"/>
						</g>
					</g>
				</g>
				<g>
					<g>
						<path className="palma36" d="M330.01,423.1c0,0-0.01,0-0.01,0c-0.06-0.01-0.11-0.06-0.1-0.12l0.27-2.85l3.97-2.4l1.34,1.92
							c0.04,0.05,0.02,0.12-0.03,0.16c-0.05,0.04-0.12,0.02-0.16-0.03l-1.22-1.75l-3.69,2.23l-0.26,2.73
							C330.11,423.05,330.07,423.1,330.01,423.1z"/>
					</g>
					<g>
						<path className="palma36" d="M328.06,422c0,0-0.01,0-0.01,0c-0.06-0.01-0.11-0.06-0.1-0.12l0.27-2.85l3.97-2.4l1.34,1.92
							c0.04,0.05,0.02,0.12-0.03,0.16c-0.05,0.04-0.12,0.02-0.16-0.03l-1.22-1.75l-3.69,2.23l-0.26,2.73
							C328.16,421.96,328.12,422,328.06,422z"/>
					</g>
					<g>
						<path className="palma45" d="M332.55,415.06c0.04,1.73-1.12,3.86-2.6,4.76c-0.7,0.43,0.94,1.76,0.45,1.53
							c-0.02-0.01-2.33-1.28-2.35-1.29c-0.51-0.27-0.83-0.87-0.86-1.75c-0.04-1.73,1.12-3.86,2.6-4.76c0.77-0.47,1.47-0.51,1.97-0.2
							c0.02,0.02,2.25,1.23,2.27,1.24C334.47,414.9,332.53,414.27,332.55,415.06z"/>
						<path className="palma39" d="M334.89,416.34c0.04,1.73-1.12,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
							c-0.04-1.73,1.12-3.86,2.6-4.76C333.62,413.94,334.85,414.61,334.89,416.34z"/>
						<path className="palma50" d="M334.71,416.45c0.04,1.61-1.05,3.6-2.43,4.44c-1.38,0.84-2.53,0.21-2.56-1.4
							c-0.04-1.61,1.05-3.6,2.43-4.44C333.53,414.21,334.68,414.84,334.71,416.45z"/>
						<path className="palma37" d="M332.26,419.8c0.01,0.38-0.25,0.86-0.58,1.06c-0.33,0.2-0.6,0.05-0.61-0.33s0.25-0.86,0.58-1.06
							S332.25,419.41,332.26,419.8z"/>
						<g>
							<path className="palma37" d="M332.4,414.89c-0.01,0-0.02,0-0.03-0.01l-2.57-1.42c-0.03-0.02-0.04-0.05-0.02-0.08
								c0.02-0.03,0.05-0.04,0.08-0.02l2.57,1.42c0.03,0.02,0.04,0.05,0.02,0.08C332.43,414.88,332.42,414.89,332.4,414.89z"/>
						</g>
						<g>
							<path className="palma37" d="M330.85,416.37c-0.01,0-0.02,0-0.03-0.01l-2.57-1.42c-0.03-0.02-0.04-0.05-0.02-0.08
								c0.02-0.03,0.05-0.04,0.08-0.02l2.57,1.42c0.03,0.02,0.04,0.05,0.02,0.08C330.89,416.36,330.87,416.37,330.85,416.37z"/>
						</g>
						<g>
							<path className="palma37" d="M329.8,418.57c-0.01,0-0.02,0-0.03-0.01l-2.57-1.42c-0.03-0.02-0.04-0.05-0.02-0.08
								c0.02-0.03,0.05-0.04,0.08-0.02l2.57,1.42c0.03,0.02,0.04,0.05,0.02,0.08C329.84,418.56,329.82,418.57,329.8,418.57z"/>
						</g>
						<g>
							<path className="palma37" d="M329.89,420.77c-0.01,0-0.02,0-0.03-0.01l-2.57-1.42c-0.03-0.02-0.04-0.05-0.02-0.08
								c0.02-0.03,0.05-0.04,0.08-0.02l2.57,1.42c0.03,0.02,0.04,0.05,0.02,0.08C329.93,420.76,329.91,420.77,329.89,420.77z"/>
						</g>
						<g>
							<path className="palma37" d="M334.02,414.62c-0.01,0-0.02,0-0.03-0.01l-2.57-1.42c-0.03-0.02-0.04-0.05-0.02-0.08
								c0.02-0.03,0.05-0.04,0.08-0.02l2.57,1.42c0.03,0.02,0.04,0.05,0.02,0.08C334.06,414.61,334.04,414.62,334.02,414.62z"/>
						</g>
					</g>
				</g>
				<g>
					<g>
						<g>
							<path className="palma36" d="M317.37,420.08c-0.05,0-0.1-0.03-0.11-0.09c-0.02-0.06,0.02-0.12,0.08-0.14l2.2-0.55l-0.18-7.69
								c0-0.06,0.05-0.12,0.11-0.12c0.06,0,0.12,0.05,0.12,0.11l0.18,7.88l-2.38,0.59C317.39,420.08,317.38,420.08,317.37,420.08z"
								/>
						</g>
						<g>
							<path className="palma36" d="M321.97,419.97c-0.01,0-0.02,0-0.03,0l-2.31-0.46c-0.06-0.01-0.1-0.07-0.09-0.13
								c0.01-0.06,0.07-0.1,0.13-0.09l2.31,0.46c0.06,0.01,0.1,0.07,0.09,0.13C322.07,419.93,322.02,419.97,321.97,419.97z"/>
						</g>
						<g>
							<path className="palma36" d="M319.7,421.31c-0.06,0-0.12-0.05-0.12-0.11l-0.04-1.8c0-0.06,0.05-0.12,0.11-0.12
								c0.06,0,0.12,0.05,0.12,0.11l0.04,1.8C319.81,421.26,319.76,421.31,319.7,421.31z"/>
						</g>
					</g>
					<path className="palma48" d="M321.2,409.32c0.99,0.54,1.02,1.46,0.05,2.05c-0.97,0.59-2.56,0.63-3.55,0.08
						c-0.99-0.54-1.02-1.46-0.05-2.05C318.61,408.81,320.2,408.78,321.2,409.32z"/>
					<path className="palma49" d="M319.61,410.29c0.09,0.05,0.09,0.14,0,0.19c-0.09,0.05-0.24,0.06-0.33,0.01c-0.09-0.05-0.09-0.14,0-0.19
						C319.37,410.24,319.51,410.24,319.61,410.29z"/>
					<g>
						<path className="palma36" d="M319.44,410.43c-0.06,0-0.12-0.05-0.12-0.11l-0.01-0.61c0-0.06,0.05-0.12,0.11-0.12
							c0.06,0,0.12,0.05,0.12,0.11l0.01,0.61C319.56,410.38,319.51,410.43,319.44,410.43z"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<g className="palma51">
							
								<rect x="326.38" y="447.09" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -167.6465 201.7587)" className="palma37" width="13.57" height="0.56"/>
						</g>
						<g className="palma52">
							
								<rect x="326.66" y="447.29" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -167.7255 201.8357)" className="palma53" width="13.26" height="0.56"/>
						</g>
						<g className="palma54">
							
								<rect x="326.93" y="447.49" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -167.8034 201.9104)" className="palma55" width="12.94" height="0.56"/>
						</g>
						<g className="palma56">
							
								<rect x="327.21" y="447.69" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -168.3168 202.8749)" className="palma57" width="12.62" height="0.56"/>
						</g>
						<g className="palma58">
							
								<rect x="327.48" y="447.89" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -168.3841 202.928)" className="palma59" width="12.31" height="0.56"/>
						</g>
						<g className="palma60">
							
								<rect x="327.75" y="448.08" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -168.4729 203.0251)" className="palma61" width="11.99" height="0.56"/>
						</g>
						<g className="palma62">
							
								<rect x="328.03" y="448.28" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -168.7716 203.5521)" className="palma63" width="11.67" height="0.56"/>
						</g>
						<g className="palma64">
							
								<rect x="328.3" y="448.48" transform="matrix(0.8883 -0.4593 0.4593 0.8883 -168.8171 203.5602)" className="palma65" width="11.36" height="0.56"/>
						</g>
						<g className="palma66">
							
								<rect x="328.58" y="448.68" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -168.9281 203.7027)" className="palma67" width="11.04" height="0.56"/>
						</g>
						<g className="palma68">
							
								<rect x="328.85" y="448.88" transform="matrix(0.8878 -0.4601 0.4601 0.8878 -169.1937 204.163)" className="palma69" width="10.72" height="0.56"/>
						</g>
						<g className="palma70">
							
								<rect x="329.12" y="449.08" transform="matrix(0.8878 -0.4603 0.4603 0.8878 -169.3059 204.3079)" className="palma71" width="10.41" height="0.56"/>
						</g>
						<g className="palma72">
							
								<rect x="329.4" y="449.27" transform="matrix(0.8874 -0.461 0.461 0.8874 -169.5822 204.7906)" className="palma73" width="10.09" height="0.56"/>
						</g>
						<g className="palma74">
							
								<rect x="329.67" y="449.47" transform="matrix(0.8874 -0.461 0.461 0.8874 -169.6708 204.8871)" className="palma75" width="9.77" height="0.56"/>
						</g>
						<g className="palma76">
							
								<rect x="329.94" y="449.67" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -170.1625 205.8154)" className="palma77" width="9.46" height="0.56"/>
						</g>
						<g className="palma78">
							
								<rect x="330.22" y="449.87" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -170.2412 205.8914)" className="palma79" width="9.14" height="0.56"/>
						</g>
						<g className="palma80">
							
								<rect x="330.49" y="450.07" transform="matrix(0.8862 -0.4633 0.4633 0.8862 -170.5388 206.4208)" className="palma81" width="8.82" height="0.56"/>
						</g>
						<g className="palma82">
							
								<rect x="330.77" y="450.27" transform="matrix(0.8858 -0.464 0.464 0.8858 -170.8144 206.9051)" className="palma83" width="8.51" height="0.56"/>
						</g>
						<g className="palma84">
							
								<rect x="331.04" y="450.46" transform="matrix(0.8858 -0.4641 0.4641 0.8858 -170.9151 207.0267)" className="palma85" width="8.19" height="0.56"/>
						</g>
						<g className="palma86">
							
								<rect x="331.31" y="450.66" transform="matrix(0.8854 -0.4648 0.4648 0.8854 -171.1893 207.5091)" className="palma87" width="7.88" height="0.56"/>
						</g>
						<g className="palma88">
							
								<rect x="331.59" y="450.86" transform="matrix(0.8845 -0.4664 0.4664 0.8845 -171.7144 208.5156)" className="palma89" width="7.56" height="0.56"/>
						</g>
						<g className="palma90">
							
								<rect x="331.86" y="451.06" transform="matrix(0.8842 -0.4672 0.4672 0.8842 -171.9996 209.0239)" className="palma91" width="7.24" height="0.56"/>
						</g>
						<g className="palma92">
							
								<rect x="332.14" y="451.26" transform="matrix(0.8838 -0.4679 0.4679 0.8838 -172.2632 209.4871)" className="palma93" width="6.93" height="0.56"/>
						</g>
						<g className="palma94">
							
								<rect x="332.41" y="451.46" transform="matrix(0.8833 -0.4688 0.4688 0.8833 -172.5912 210.0867)" className="palma95" width="6.61" height="0.56"/>
						</g>
						<g className="palma96">
							
								<rect x="332.68" y="451.65" transform="matrix(0.8825 -0.4702 0.4702 0.8825 -173.0718 211.0093)" className="palma97" width="6.29" height="0.56"/>
						</g>
						<g className="palma98">
							
								<rect x="332.96" y="451.85" transform="matrix(0.8817 -0.4718 0.4718 0.8817 -173.5802 211.9944)" className="palma99" width="5.98" height="0.56"/>
						</g>
						<g className="palma100">
							
								<rect x="333.23" y="452.05" transform="matrix(0.8813 -0.4726 0.4726 0.8813 -173.8851 212.5502)" className="palma101" width="5.66" height="0.56"/>
						</g>
						<g className="palma102">
							
								<rect x="333.51" y="452.25" transform="matrix(0.88 -0.4749 0.4749 0.88 -174.5761 213.9322)" className="palma103" width="5.34" height="0.56"/>
						</g>
						<g className="palma104">
							
								<rect x="333.78" y="452.45" transform="matrix(0.8792 -0.4765 0.4765 0.8792 -175.0797 214.9189)" className="palma105" width="5.03" height="0.56"/>
						</g>
						<g className="palma106">
							
								<rect x="334.05" y="452.65" transform="matrix(0.878 -0.4787 0.4787 0.878 -175.7682 216.3094)" className="palma107" width="4.71" height="0.56"/>
						</g>
						<g className="palma108">
							
								<rect x="334.33" y="452.84" transform="matrix(0.8771 -0.4803 0.4803 0.8771 -176.2797 217.3232)" className="palma109" width="4.39" height="0.56"/>
						</g>
						<g className="palma110">
							
								<rect x="334.6" y="453.04" transform="matrix(0.8754 -0.4833 0.4833 0.8754 -177.1712 219.1733)" className="palma111" width="4.08" height="0.56"/>
						</g>
						<g className="palma112">
							
								<rect x="334.87" y="453.24" transform="matrix(0.8738 -0.4863 0.4863 0.8738 -178.0578 221.0288)" className="palma113" width="3.76" height="0.56"/>
						</g>
						<g className="palma114">
							
								<rect x="335.15" y="453.44" transform="matrix(0.8716 -0.4902 0.4902 0.8716 -179.1542 223.3694)" className="palma115" width="3.44" height="0.56"/>
						</g>
						<g className="palma116">
							
								<rect x="335.42" y="453.64" transform="matrix(0.8691 -0.4947 0.4947 0.8691 -180.4315 226.1468)" className="palma117" width="3.13" height="0.56"/>
						</g>
						<g className="palma118">
							
								<rect x="335.7" y="453.84" transform="matrix(0.866 -0.5001 0.5001 0.866 -181.91 229.4262)" className="palma119" width="2.81" height="0.56"/>
						</g>
						<g className="palma120">
							
								<rect x="335.97" y="454.04" transform="matrix(0.862 -0.5068 0.5068 0.862 -183.7407 233.5892)" className="palma121" width="2.5" height="0.56"/>
						</g>
						<g>
							
								<rect x="336.24" y="454.23" transform="matrix(0.8571 -0.5151 0.5151 0.8571 -185.9273 238.7029)" className="palma33" width="2.18" height="0.56"/>
						</g>
					</g>
					<g>
						<g className="palma51">
							
								<rect x="350.01" y="432.62" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -158.4208 210.9602)" className="palma37" width="13.57" height="0.56"/>
						</g>
						<g className="palma52">
							
								<rect x="350.28" y="432.82" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -158.4987 211.035)" className="palma53" width="13.26" height="0.56"/>
						</g>
						<g className="palma54">
							
								<rect x="350.56" y="433.02" transform="matrix(0.8894 -0.4571 0.4571 0.8894 -158.5766 211.1097)" className="palma55" width="12.94" height="0.56"/>
						</g>
						<g className="palma56">
							
								<rect x="350.83" y="433.22" transform="matrix(0.889 -0.4579 0.4579 0.889 -158.8541 211.6483)" className="palma57" width="12.62" height="0.56"/>
						</g>
						<g className="palma58">
							
								<rect x="351.11" y="433.42" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -159.1261 212.1748)" className="palma59" width="12.31" height="0.56"/>
						</g>
						<g className="palma60">
							
								<rect x="351.38" y="433.61" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -159.2042 212.25)" className="palma61" width="11.99" height="0.56"/>
						</g>
						<g className="palma62">
							
								<rect x="351.65" y="433.81" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -159.4814 212.7898)" className="palma63" width="11.67" height="0.56"/>
						</g>
						<g className="palma64">
							
								<rect x="351.93" y="434.01" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -159.5584 212.8625)" className="palma65" width="11.36" height="0.56"/>
						</g>
						<g className="palma66">
							
								<rect x="352.2" y="434.21" transform="matrix(0.8882 -0.4594 0.4594 0.8882 -159.627 212.915)" className="palma67" width="11.04" height="0.56"/>
						</g>
						<g className="palma68">
							
								<rect x="352.48" y="434.41" transform="matrix(0.8878 -0.4602 0.4602 0.8878 -159.8952 213.4344)" className="palma69" width="10.72" height="0.56"/>
						</g>
						<g className="palma70">
							
								<rect x="352.75" y="434.61" transform="matrix(0.8878 -0.4603 0.4603 0.8878 -159.9934 213.5563)" className="palma71" width="10.41" height="0.56"/>
						</g>
						<g className="palma72">
							
								<rect x="353.02" y="434.8" transform="matrix(0.8874 -0.461 0.461 0.8874 -160.2504 214.0506)" className="palma73" width="10.09" height="0.56"/>
						</g>
						<g className="palma74">
							
								<rect x="353.3" y="435" transform="matrix(0.8874 -0.461 0.461 0.8874 -160.3289 214.1261)" className="palma75" width="9.77" height="0.56"/>
						</g>
						<g className="palma76">
							
								<rect x="353.57" y="435.2" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -160.7905 215.1024)" className="palma77" width="9.46" height="0.56"/>
						</g>
						<g className="palma78">
							
								<rect x="353.85" y="435.4" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -160.8692 215.1783)" className="palma79" width="9.14" height="0.56"/>
						</g>
						<g className="palma80">
							
								<rect x="354.12" y="435.6" transform="matrix(0.8862 -0.4633 0.4633 0.8862 -161.1457 215.7206)" className="palma81" width="8.82" height="0.56"/>
						</g>
						<g className="palma82">
							
								<rect x="354.39" y="435.8" transform="matrix(0.8858 -0.464 0.464 0.8858 -161.402 216.2163)" className="palma83" width="8.51" height="0.56"/>
						</g>
						<g className="palma84">
							
								<rect x="354.67" y="435.99" transform="matrix(0.8858 -0.4641 0.4641 0.8858 -161.5005 216.3392)" className="palma85" width="8.19" height="0.56"/>
						</g>
						<g className="palma86">
							
								<rect x="354.94" y="436.19" transform="matrix(0.8854 -0.4648 0.4648 0.8854 -161.7566 216.8352)" className="palma87" width="7.87" height="0.56"/>
						</g>
						<g className="palma88">
							
								<rect x="355.21" y="436.39" transform="matrix(0.8845 -0.4665 0.4665 0.8845 -162.2468 217.8887)" className="palma89" width="7.56" height="0.56"/>
						</g>
						<g className="palma90">
							
								<rect x="355.49" y="436.59" transform="matrix(0.8842 -0.4672 0.4672 0.8842 -162.4925 218.3625)" className="palma91" width="7.24" height="0.56"/>
						</g>
						<g className="palma92">
							
								<rect x="355.76" y="436.79" transform="matrix(0.8838 -0.4679 0.4679 0.8838 -162.7586 218.886)" className="palma93" width="6.93" height="0.56"/>
						</g>
						<g className="palma94">
							
								<rect x="356.04" y="436.99" transform="matrix(0.8833 -0.4688 0.4688 0.8833 -163.0512 219.4738)" className="palma95" width="6.61" height="0.56"/>
						</g>
						<g className="palma96">
							
								<rect x="356.31" y="437.18" transform="matrix(0.8825 -0.4703 0.4703 0.8825 -163.5008 220.441)" className="palma97" width="6.29" height="0.56"/>
						</g>
						<g className="palma98">
							
								<rect x="356.58" y="437.38" transform="matrix(0.8817 -0.4717 0.4717 0.8817 -163.9374 221.3803)" className="palma99" width="5.98" height="0.56"/>
						</g>
						<g className="palma100">
							
								<rect x="356.86" y="437.58" transform="matrix(0.8813 -0.4726 0.4726 0.8813 -164.2305 221.9752)" className="palma101" width="5.66" height="0.56"/>
						</g>
						<g className="palma102">
							
								<rect x="357.13" y="437.78" transform="matrix(0.8801 -0.4749 0.4749 0.8801 -164.8606 223.3926)" className="palma103" width="5.34" height="0.56"/>
						</g>
						<g className="palma104">
							
								<rect x="357.41" y="437.98" transform="matrix(0.8792 -0.4764 0.4764 0.8792 -165.3133 224.3835)" className="palma105" width="5.03" height="0.56"/>
						</g>
						<g className="palma106">
							
								<rect x="357.68" y="438.18" transform="matrix(0.878 -0.4787 0.4787 0.878 -165.9583 225.8538)" className="palma107" width="4.71" height="0.56"/>
						</g>
						<g className="palma108">
							
								<rect x="357.95" y="438.37" transform="matrix(0.8771 -0.4803 0.4803 0.8771 -166.4162 226.8686)" className="palma109" width="4.39" height="0.56"/>
						</g>
						<g className="palma110">
							
								<rect x="358.23" y="438.57" transform="matrix(0.8755 -0.4833 0.4833 0.8755 -167.2247 228.7658)" className="palma111" width="4.08" height="0.56"/>
						</g>
						<g className="palma112">
							
								<rect x="358.5" y="438.77" transform="matrix(0.8737 -0.4864 0.4864 0.8737 -168.0464 230.7145)" className="palma113" width="3.76" height="0.56"/>
						</g>
						<g className="palma114">
							
								<rect x="358.77" y="438.97" transform="matrix(0.8716 -0.4902 0.4902 0.8716 -169.0284 233.0928)" className="palma115" width="3.44" height="0.56"/>
						</g>
						<g className="palma116">
							
								<rect x="359.05" y="439.17" transform="matrix(0.869 -0.4948 0.4948 0.869 -170.189 235.9655)" className="palma117" width="3.13" height="0.56"/>
						</g>
						<g className="palma118">
							
								<rect x="359.32" y="439.37" transform="matrix(0.866 -0.5001 0.5001 0.866 -171.5174 239.3272)" className="palma119" width="2.81" height="0.56"/>
						</g>
						<g className="palma120">
							
								<rect x="359.6" y="439.56" transform="matrix(0.862 -0.5069 0.5069 0.862 -173.1567 243.5937)" className="palma121" width="2.5" height="0.56"/>
						</g>
						<g>
							
								<rect x="359.87" y="439.76" transform="matrix(0.8571 -0.5151 0.5151 0.8571 -175.0986 248.8081)" className="palma33" width="2.18" height="0.56"/>
						</g>
					</g>
					<g>
						<g className="palma51">
							
								<rect x="373.14" y="418.45" transform="matrix(0.8897 -0.4566 0.4566 0.8897 -149.2686 219.6532)" className="palma37" width="13.57" height="0.56"/>
						</g>
						<g className="palma52">
							
								<rect x="373.42" y="418.65" transform="matrix(0.8896 -0.4567 0.4567 0.8896 -149.3719 219.7955)" className="palma53" width="13.26" height="0.56"/>
						</g>
						<g className="palma54">
							
								<rect x="373.69" y="418.85" transform="matrix(0.8889 -0.4581 0.4581 0.8889 -149.7655 220.7112)" className="palma55" width="12.94" height="0.56"/>
						</g>
						<g className="palma56">
							
								<rect x="373.96" y="419.05" transform="matrix(0.889 -0.4579 0.4579 0.889 -149.8 220.6704)" className="palma57" width="12.62" height="0.56"/>
						</g>
						<g className="palma58">
							
								<rect x="374.24" y="419.25" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -150.0504 221.206)" className="palma59" width="12.31" height="0.56"/>
						</g>
						<g className="palma60">
							
								<rect x="374.51" y="419.44" transform="matrix(0.8886 -0.4587 0.4587 0.8886 -150.1286 221.2811)" className="palma61" width="11.99" height="0.56"/>
						</g>
						<g className="palma62">
							
								<rect x="374.78" y="419.64" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -150.198 221.333)" className="palma63" width="11.67" height="0.56"/>
						</g>
						<g className="palma64">
							
								<rect x="375.06" y="419.84" transform="matrix(0.8878 -0.4603 0.4603 0.8878 -150.6412 222.3864)" className="palma65" width="11.36" height="0.56"/>
						</g>
						<g className="palma66">
							
								<rect x="375.33" y="420.04" transform="matrix(0.8878 -0.4601 0.4601 0.8878 -150.693 222.3908)" className="palma67" width="11.04" height="0.56"/>
						</g>
						<g className="palma68">
							
								<rect x="375.61" y="420.24" transform="matrix(0.8878 -0.4603 0.4603 0.8878 -150.7978 222.5372)" className="palma69" width="10.72" height="0.56"/>
						</g>
						<g className="palma70">
							
								<rect x="375.88" y="420.44" transform="matrix(0.8878 -0.4602 0.4602 0.8878 -150.8583 222.5649)" className="palma71" width="10.41" height="0.56"/>
						</g>
						<g className="palma72">
							
								<rect x="376.15" y="420.64" transform="matrix(0.8878 -0.4602 0.4602 0.8878 -150.9457 222.6649)" className="palma73" width="10.09" height="0.56"/>
						</g>
						<g className="palma74">
							
								<rect x="376.43" y="420.83" transform="matrix(0.887 -0.4618 0.4618 0.887 -151.369 223.6684)" className="palma75" width="9.77" height="0.56"/>
						</g>
						<g className="palma76">
							
								<rect x="376.7" y="421.03" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -151.6142 224.1943)" className="palma77" width="9.46" height="0.56"/>
						</g>
						<g className="palma78">
							
								<rect x="376.98" y="421.23" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -151.6928 224.2702)" className="palma79" width="9.14" height="0.56"/>
						</g>
						<g className="palma80">
							
								<rect x="377.25" y="421.43" transform="matrix(0.8858 -0.464 0.464 0.8858 -152.107 225.2557)" className="palma81" width="8.82" height="0.56"/>
						</g>
						<g className="palma82">
							
								<rect x="377.52" y="421.63" transform="matrix(0.8858 -0.4641 0.4641 0.8858 -152.2035 225.3799)" className="palma83" width="8.51" height="0.56"/>
						</g>
						<g className="palma84">
							
								<rect x="377.8" y="421.83" transform="matrix(0.8858 -0.464 0.464 0.8858 -152.2648 225.4082)" className="palma85" width="8.19" height="0.56"/>
						</g>
						<g className="palma86">
							
								<rect x="378.07" y="422.02" transform="matrix(0.885 -0.4656 0.4656 0.885 -152.6953 226.442)" className="palma87" width="7.88" height="0.56"/>
						</g>
						<g className="palma88">
							
								<rect x="378.35" y="422.22" transform="matrix(0.8846 -0.4664 0.4664 0.8846 -152.9486 226.9949)" className="palma89" width="7.56" height="0.56"/>
						</g>
						<g className="palma90">
							
								<rect x="378.62" y="422.42" transform="matrix(0.8845 -0.4664 0.4664 0.8845 -153.0366 227.0958)" className="palma91" width="7.24" height="0.56"/>
						</g>
						<g className="palma92">
							
								<rect x="378.89" y="422.62" transform="matrix(0.8837 -0.468 0.468 0.8837 -153.4566 228.1074)" className="palma93" width="6.93" height="0.56"/>
						</g>
						<g className="palma94">
							
								<rect x="379.17" y="422.82" transform="matrix(0.8829 -0.4695 0.4695 0.8829 -153.866 229.095)" className="palma95" width="6.61" height="0.56"/>
						</g>
						<g className="palma96">
							
								<rect x="379.44" y="423.02" transform="matrix(0.8825 -0.4702 0.4702 0.8825 -154.1111 229.6303)" className="palma97" width="6.29" height="0.56"/>
						</g>
						<g className="palma98">
							
								<rect x="379.71" y="423.21" transform="matrix(0.8817 -0.4719 0.4719 0.8817 -154.5448 230.6916)" className="palma99" width="5.98" height="0.56"/>
						</g>
						<g className="palma100">
							
								<rect x="379.99" y="423.41" transform="matrix(0.8809 -0.4733 0.4733 0.8809 -154.942 231.6559)" className="palma101" width="5.66" height="0.56"/>
						</g>
						<g className="palma102">
							
								<rect x="380.26" y="423.61" transform="matrix(0.8805 -0.4741 0.4741 0.8805 -155.1873 232.1973)" className="palma103" width="5.34" height="0.56"/>
						</g>
						<g className="palma104">
							
								<rect x="380.54" y="423.81" transform="matrix(0.8796 -0.4757 0.4757 0.8796 -155.6185 233.2635)" className="palma105" width="5.03" height="0.56"/>
						</g>
						<g className="palma106">
							
								<rect x="380.81" y="424.01" transform="matrix(0.8784 -0.478 0.478 0.8784 -156.1931 234.7426)" className="palma107" width="4.71" height="0.56"/>
						</g>
						<g className="palma108">
							
								<rect x="381.08" y="424.21" transform="matrix(0.8767 -0.481 0.481 0.8767 -156.9358 236.7158)" className="palma109" width="4.39" height="0.56"/>
						</g>
						<g className="palma110">
							
								<rect x="381.36" y="424.4" transform="matrix(0.8755 -0.4833 0.4833 0.8755 -157.4974 238.1836)" className="palma111" width="4.08" height="0.56"/>
						</g>
						<g className="palma112">
							
								<rect x="381.63" y="424.6" transform="matrix(0.8733 -0.4872 0.4872 0.8733 -158.3999 240.6618)" className="palma113" width="3.76" height="0.56"/>
						</g>
						<g className="palma114">
							
								<rect x="381.91" y="424.8" transform="matrix(0.872 -0.4895 0.4895 0.872 -158.9686 242.1806)" className="palma115" width="3.44" height="0.56"/>
						</g>
						<g className="palma116">
							
								<rect x="382.18" y="425" transform="matrix(0.869 -0.4948 0.4948 0.869 -160.1506 245.5575)" className="palma117" width="3.13" height="0.56"/>
						</g>
						<g className="palma118">
							<polygon className="palma119" points="382.78,426.42 382.5,425.94 384.94,424.53 385.22,425.01 							"/>
						</g>
						<g className="palma120">
							
								<rect x="382.73" y="425.4" transform="matrix(0.862 -0.5069 0.5069 0.862 -162.7843 253.3667)" className="palma121" width="2.5" height="0.56"/>
						</g>
						<g>
							
								<rect x="383" y="425.59" transform="matrix(0.8576 -0.5144 0.5144 0.8576 -164.3495 258.2219)" className="palma33" width="2.18" height="0.56"/>
						</g>
					</g>
				</g>
				<g>
					<path className="palma20" d="M338.15,453.22c-0.02-0.03-0.05-0.05-0.07-0.07l-0.01-0.01l0,0c-0.21-0.17-0.54-0.17-0.89,0.04
						c-0.62,0.38-1.12,1.28-1.1,2.01c0.01,0.33,0.12,0.57,0.29,0.69l0,0l2.62,2.06l1.69-2.18L338.15,453.22z"/>
					<polygon className="palma29" points="338.91,455.54 341.1,454.2 341.17,456.99 338.97,458.33 					"/>
					<polygon className="palma31" points="338.91,455.54 336.65,454.3 336.71,457.1 338.97,458.33 					"/>
					<polygon className="palma30" points="338.85,452.97 336.65,454.3 338.91,455.54 341.1,454.2 					"/>
				</g>
				<g>
					<path className="palma20" d="M384.9,424.74c-0.02-0.03-0.05-0.05-0.07-0.07l-0.01-0.01l0,0c-0.21-0.17-0.54-0.17-0.89,0.04
						c-0.62,0.38-1.12,1.28-1.1,2.01c0.01,0.33,0.12,0.57,0.29,0.69l0,0l2.62,2.06l1.69-2.18L384.9,424.74z"/>
					<polygon className="palma29" points="385.65,427.06 387.85,425.72 387.91,428.51 385.72,429.85 					"/>
					<polygon className="palma31" points="385.65,427.06 383.39,425.83 383.46,428.62 385.72,429.85 					"/>
					<polygon className="palma30" points="385.59,424.49 383.39,425.83 385.65,427.06 387.85,425.72 					"/>
				</g>
				<g>
					<path className="palma20" d="M361.78,438.79c-0.02-0.03-0.05-0.05-0.07-0.07l-0.01-0.01l0,0c-0.21-0.17-0.54-0.17-0.89,0.04
						c-0.62,0.38-1.12,1.28-1.1,2.01c0.01,0.33,0.12,0.57,0.29,0.69l0,0l2.62,2.06l1.69-2.18L361.78,438.79z"/>
					<polygon className="palma29" points="362.53,441.11 364.73,439.78 364.79,442.57 362.6,443.9 					"/>
					<polygon className="palma31" points="362.53,441.11 360.28,439.88 360.34,442.67 362.6,443.9 					"/>
					<polygon className="palma30" points="362.47,438.54 360.28,439.88 362.53,441.11 364.73,439.78 					"/>
				</g>
				<g>
					<g>
						<path className="palma31" d="M359.06,446.11c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L359.06,446.11z"/>
					</g>
					<g>
						<path className="palma31" d="M352.79,449.92c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L352.79,449.92z"/>
					</g>
					<g className="palma122">
						<path className="palma29" d="M352.35,449.4c0,0-4.33-2.37-5.17-2.83c0.57-2.92,3.75-1.88,3.75-1.88l1.36,2.13L352.35,449.4z"/>
					</g>
					<polygon className="palma29" points="359.06,446.11 352.79,449.92 352.72,446.92 358.99,443.11 					"/>
					<polygon className="palma20" points="351.13,444.43 357.41,440.62 358.99,443.11 352.72,446.92 					"/>
					<path className="palma123" d="M347.8,444.78l6.46-3.94c0,0,1.08-0.83,3.15-0.22l-6.27,3.81C351.13,444.43,349.23,443.78,347.8,444.78z
						"/>
				</g>
				<g>
					<g>
						<path className="palma31" d="M350.91,451.03c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L350.91,451.03z"/>
					</g>
					<g>
						<path className="palma31" d="M344.64,454.84c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L344.64,454.84z"/>
					</g>
					<g className="palma122">
						<path className="palma29" d="M344.2,454.32c0,0-4.33-2.37-5.17-2.83c0.57-2.92,3.75-1.88,3.75-1.88l1.36,2.13L344.2,454.32z"/>
					</g>
					<polygon className="palma29" points="350.91,451.03 344.64,454.84 344.57,451.84 350.84,448.03 					"/>
					<polygon className="palma20" points="342.98,449.35 349.25,445.55 350.84,448.03 344.57,451.84 					"/>
					<path className="palma123" d="M339.64,449.7l6.46-3.94c0,0,1.08-0.83,3.15-0.22l-6.27,3.81C342.98,449.35,341.08,448.7,339.64,449.7z"
						/>
				</g>
				<g>
					<g>
						<path className="palma31" d="M382.29,431.98c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L382.29,431.98z"/>
					</g>
					<g>
						<path className="palma31" d="M376.02,435.78c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L376.02,435.78z"/>
					</g>
					<g className="palma122">
						<path className="palma29" d="M375.58,435.27c0,0-4.33-2.37-5.17-2.83c0.57-2.92,3.75-1.88,3.75-1.88l1.36,2.13L375.58,435.27z"/>
					</g>
					<polygon className="palma29" points="382.29,431.98 376.02,435.78 375.95,432.78 382.22,428.98 					"/>
					<polygon className="palma20" points="374.36,430.3 380.63,426.49 382.22,428.98 375.95,432.78 					"/>
					<path className="palma123" d="M371.02,430.65l6.46-3.94c0,0,1.08-0.83,3.15-0.22l-6.27,3.81C374.36,430.3,372.46,429.65,371.02,430.65
						z"/>
				</g>
				<g>
					<g>
						<path className="palma31" d="M374.14,436.9c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L374.14,436.9z"/>
					</g>
					<g>
						<path className="palma31" d="M367.86,440.71c0,0-5.05-2.76-6.03-3.3c0.66-3.4,4.37-2.19,4.37-2.19l1.59,2.48L367.86,440.71z"/>
					</g>
					<g className="palma122">
						<path className="palma29" d="M367.43,440.19c0,0-4.33-2.37-5.17-2.83c0.57-2.92,3.75-1.88,3.75-1.88l1.36,2.13L367.43,440.19z"/>
					</g>
					<polygon className="palma29" points="374.14,436.9 367.86,440.71 367.79,437.71 374.07,433.9 					"/>
					<polygon className="palma20" points="366.21,435.22 372.48,431.41 374.07,433.9 367.79,437.71 					"/>
					<path className="palma123" d="M362.87,435.57l6.46-3.94c0,0,1.08-0.83,3.15-0.22l-6.27,3.81
						C366.21,435.22,364.31,434.57,362.87,435.57z"/>
				</g>
			</g>
			<g>
				<g>
					<g>
						<polygon className="palma30" points="335.09,443.28 324.65,449.64 316.32,445.09 326.76,438.73 						"/>
					</g>
					<g>
						<polygon className="palma31" points="325.05,466.77 316.72,462.22 316.32,445.09 324.65,449.64 						"/>
						<polygon className="palma29" points="323.36,453.07 317.8,450.03 317.77,448.69 323.33,451.73 						"/>
					</g>
					<g>
						<polygon className="palma29" points="335.49,460.42 325.05,466.77 324.65,449.64 335.09,443.28 						"/>
						<g>
							<path className="palma30" d="M332.83,449.3c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C331.47,446.74,332.78,447.46,332.83,449.3z"/>
							<path className="palma124" d="M332.66,449.4c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C331.39,446.99,332.62,447.67,332.66,449.4z"/>
							<path className="palma31" d="M330.93,450.45c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C330.48,449.6,330.91,449.84,330.93,450.45z"/>
							<path className="palma29" d="M330.78,450.54c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C330.4,449.82,330.77,450.03,330.78,450.54z"/>
						</g>
						<g>
							<path className="palma30" d="M333.01,457.11c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C331.66,454.56,332.97,455.27,333.01,457.11z"/>
							<path className="palma124" d="M332.84,457.21c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C331.57,454.81,332.8,455.48,332.84,457.21z"/>
							<path className="palma31" d="M331.11,458.27c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C330.66,457.42,331.1,457.66,331.11,458.27z"/>
							<path className="palma29" d="M330.96,458.36c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C330.58,457.64,330.95,457.84,330.96,458.36z"/>
							<path className="palma30" d="M334.35,452.43c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C333.9,451.58,334.33,451.81,334.35,452.43z"/>
							<path className="palma31" d="M334.2,452.52c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C333.82,451.8,334.19,452,334.2,452.52z"/>
							<path className="palma30" d="M327.52,456.59c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C327.07,455.74,327.5,455.97,327.52,456.59z"/>
							<path className="palma31" d="M327.37,456.68c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C326.99,455.96,327.36,456.16,327.37,456.68z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="324.65,449.64 324.67,450.53 325.29,449.25 						"/>
						<polygon className="palma34" points="324.65,449.64 324.67,450.53 323.99,449.28 						"/>
						<polygon className="palma125" points="325.29,449.25 323.99,449.28 324.65,449.64 						"/>
						<polygon className="palma34" points="316.32,445.09 316.35,446.15 316.8,445.35 						"/>
						<polygon className="palma34" points="325.05,466.77 325.03,465.79 324.39,466.41 						"/>
						<polygon className="palma34" points="316.72,462.22 317.2,462.49 316.7,461.23 						"/>
						<polygon className="palma35" points="335.49,460.42 335.47,459.43 334.96,460.74 						"/>
						<polygon className="palma35" points="325.03,465.79 325.05,466.77 325.61,466.46 						"/>
						<polygon className="palma35" points="335.09,443.28 334.47,443.68 335.12,444.46 						"/>
						<polygon className="palma125" points="316.8,445.35 317.08,444.63 316.32,445.09 						"/>
						<polygon className="palma125" points="334.47,443.68 334.46,442.93 335.09,443.28 						"/>
						<polygon className="palma125" points="326.76,438.73 326.15,439.1 327.4,439.07 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="334.69,425.98 324.25,432.34 315.92,427.78 326.36,421.43 						"/>
					</g>
					<g>
						<polygon className="palma31" points="324.65,449.47 316.32,444.92 315.92,427.78 324.25,432.34 						"/>
						<polygon className="palma29" points="322.96,435.77 317.4,432.73 317.37,431.39 322.93,434.43 						"/>
					</g>
					<g>
						<polygon className="palma29" points="335.09,443.11 324.65,449.47 324.25,432.34 334.69,425.98 						"/>
						<g>
							<path className="palma30" d="M332.42,431.99c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C331.07,429.44,332.38,430.15,332.42,431.99z"/>
							<path className="palma124" d="M332.25,432.1c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C330.98,429.69,332.21,430.37,332.25,432.1z"/>
							<path className="palma31" d="M330.52,433.15c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C330.07,432.3,330.51,432.54,330.52,433.15z"/>
							<path className="palma29" d="M330.38,433.24c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C330,432.52,330.36,432.72,330.38,433.24z"/>
						</g>
						<g>
							<path className="palma30" d="M332.61,439.81c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C331.25,437.25,332.56,437.97,332.61,439.81z"/>
							<path className="palma124" d="M332.44,439.91c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C331.16,437.51,332.4,438.18,332.44,439.91z"/>
							<path className="palma31" d="M330.71,440.97c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C330.26,440.11,330.69,440.35,330.71,440.97z"/>
							<path className="palma29" d="M330.56,441.06c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C330.18,440.34,330.55,440.54,330.56,441.06z"/>
							<path className="palma30" d="M333.94,435.12c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C333.49,434.27,333.93,434.51,333.94,435.12z"/>
							<path className="palma31" d="M333.8,435.21c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C333.42,434.5,333.78,434.7,333.8,435.21z"/>
							<path className="palma30" d="M327.11,439.28c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C326.66,438.43,327.1,438.67,327.11,439.28z"/>
							<path className="palma31" d="M326.96,439.37c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C326.58,438.66,326.95,438.86,326.96,439.37z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="324.25,432.34 324.27,433.23 324.89,431.95 						"/>
						<polygon className="palma34" points="324.25,432.34 324.27,433.23 323.59,431.98 						"/>
						<polygon className="palma125" points="324.89,431.95 323.59,431.98 324.25,432.34 						"/>
						<polygon className="palma34" points="315.92,427.78 315.94,428.84 316.4,428.05 						"/>
						<polygon className="palma34" points="324.65,449.47 324.63,448.49 323.99,449.11 						"/>
						<polygon className="palma34" points="316.32,444.92 316.8,445.18 316.29,443.93 						"/>
						<polygon className="palma35" points="335.09,443.11 335.07,442.13 334.47,443.51 						"/>
						<polygon className="palma35" points="324.63,448.49 324.65,449.47 325.29,449.08 						"/>
						<polygon className="palma35" points="334.69,425.98 334.07,426.38 334.72,427.16 						"/>
						<polygon className="palma125" points="316.4,428.05 316.67,427.33 315.92,427.78 						"/>
						<polygon className="palma125" points="334.07,426.38 334.05,425.63 334.69,425.98 						"/>
						<polygon className="palma125" points="326.36,421.43 325.74,421.8 326.99,421.77 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="401.6,402.82 391.16,409.18 382.83,404.63 393.27,398.27 						"/>
					</g>
					<g>
						<polygon className="palma31" points="391.56,426.32 383.23,421.76 382.83,404.63 391.16,409.18 						"/>
						<polygon className="palma29" points="389.87,412.62 384.31,409.58 384.28,408.23 389.84,411.27 						"/>
					</g>
					<g>
						<polygon className="palma29" points="402,419.96 391.56,426.32 391.16,409.18 401.6,402.82 						"/>
						<g>
							<path className="palma30" d="M399.33,408.84c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C397.98,406.28,399.29,407,399.33,408.84z"/>
							<path className="palma124" d="M399.16,408.94c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C397.89,406.54,399.12,407.21,399.16,408.94z"/>
							<path className="palma31" d="M397.43,409.99c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C396.98,409.14,397.42,409.38,397.43,409.99z"/>
							<path className="palma29" d="M397.29,410.08c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C396.91,409.37,397.27,409.57,397.29,410.08z"/>
						</g>
						<g>
							<path className="palma30" d="M399.52,416.65c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C398.16,414.1,399.47,414.81,399.52,416.65z"/>
							<path className="palma124" d="M399.35,416.76c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C398.07,414.35,399.31,415.02,399.35,416.76z"/>
							<path className="palma31" d="M397.62,417.81c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C397.17,416.96,397.6,417.2,397.62,417.81z"/>
							<path className="palma29" d="M397.47,417.9c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C397.09,417.18,397.46,417.38,397.47,417.9z"/>
							<path className="palma30" d="M400.85,411.97c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C400.4,411.12,400.84,411.36,400.85,411.97z"/>
							<path className="palma31" d="M400.71,412.06c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C400.33,411.34,400.7,411.54,400.71,412.06z"/>
							<path className="palma30" d="M394.02,416.13c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C393.57,415.28,394.01,415.51,394.02,416.13z"/>
							<path className="palma31" d="M393.88,416.22c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C393.5,415.5,393.86,415.7,393.88,416.22z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="391.16,409.18 391.18,410.07 391.8,408.79 						"/>
						<polygon className="palma34" points="391.16,409.18 391.18,410.07 390.5,408.82 						"/>
						<polygon className="palma125" points="391.8,408.79 390.5,408.82 391.16,409.18 						"/>
						<polygon className="palma34" points="382.83,404.63 382.85,405.69 383.31,404.89 						"/>
						<polygon className="palma34" points="391.56,426.32 391.54,425.33 390.9,425.96 						"/>
						<polygon className="palma34" points="383.23,421.76 383.71,422.03 383.2,420.77 						"/>
						<polygon className="palma35" points="402,419.96 401.98,418.97 401.47,420.28 						"/>
						<polygon className="palma35" points="391.54,425.33 391.56,426.32 392.12,426 						"/>
						<polygon className="palma35" points="401.6,402.82 400.98,403.22 401.63,404 						"/>
						<polygon className="palma125" points="383.31,404.89 383.58,404.17 382.83,404.63 						"/>
						<polygon className="palma125" points="400.98,403.22 400.96,402.48 401.6,402.82 						"/>
						<polygon className="palma125" points="393.27,398.27 392.65,398.65 393.9,398.62 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="401.2,385.52 390.76,391.88 382.42,387.33 392.87,380.97 						"/>
					</g>
					<g>
						<polygon className="palma31" points="391.15,409.01 382.82,404.46 382.42,387.33 390.76,391.88 						"/>
						<polygon className="palma29" points="389.47,395.31 383.91,392.27 383.88,390.93 389.44,393.97 						"/>
					</g>
					<g>
						<polygon className="palma29" points="401.6,402.66 391.16,409.01 390.76,391.88 401.2,385.52 						"/>
						<g>
							<path className="palma30" d="M398.93,391.53c0.04,1.84-1.2,4.11-2.77,5.07s-2.88,0.24-2.92-1.6c-0.04-1.84,1.2-4.11,2.77-5.07
								C397.58,388.98,398.89,389.69,398.93,391.53z"/>
							<path className="palma124" d="M398.76,391.64c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C397.49,389.23,398.72,389.91,398.76,391.64z"/>
							<path className="palma31" d="M397.03,392.69c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C396.58,391.84,397.02,392.08,397.03,392.69z"/>
							<path className="palma29" d="M396.88,392.78c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C396.5,392.06,396.87,392.26,396.88,392.78z"/>
						</g>
						<g>
							<path className="palma30" d="M399.11,399.35c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C397.76,396.79,399.07,397.51,399.11,399.35z"/>
							<path className="palma124" d="M398.94,399.45c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C397.67,397.05,398.9,397.72,398.94,399.45z"/>
							<path className="palma31" d="M397.21,400.51c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C396.76,399.66,397.2,399.89,397.21,400.51z"/>
							<path className="palma29" d="M397.07,400.6c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C396.69,399.88,397.05,400.08,397.07,400.6z"/>
							<path className="palma30" d="M400.45,394.67c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C400,393.81,400.44,394.05,400.45,394.67z"/>
							<path className="palma31" d="M400.3,394.76c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C399.92,394.04,400.29,394.24,400.3,394.76z"/>
							<path className="palma30" d="M393.62,398.82c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C393.17,397.97,393.6,398.21,393.62,398.82z"/>
							<path className="palma31" d="M393.47,398.91c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C393.09,398.2,393.46,398.4,393.47,398.91z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="390.76,391.88 390.78,392.77 391.4,391.49 						"/>
						<polygon className="palma34" points="390.76,391.88 390.78,392.77 390.1,391.52 						"/>
						<polygon className="palma125" points="391.4,391.49 390.1,391.52 390.76,391.88 						"/>
						<polygon className="palma34" points="382.42,387.33 382.45,388.39 382.91,387.59 						"/>
						<polygon className="palma34" points="391.16,409.01 391.13,408.03 390.5,408.65 						"/>
						<polygon className="palma34" points="382.82,404.46 383.31,404.72 382.8,403.47 						"/>
						<polygon className="palma35" points="401.6,402.66 401.57,401.67 400.98,403.05 						"/>
						<polygon className="palma35" points="391.13,408.03 391.16,409.01 391.8,408.62 						"/>
						<polygon className="palma35" points="401.2,385.52 400.58,385.92 401.22,386.7 						"/>
						<polygon className="palma125" points="382.91,387.59 383.18,386.87 382.42,387.33 						"/>
						<polygon className="palma125" points="400.58,385.92 400.56,385.17 401.2,385.52 						"/>
						<polygon className="palma125" points="392.87,380.97 392.25,381.34 393.5,381.31 						"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<polygon className="palma30" points="294.42,421.2 283.98,427.56 275.65,423.01 286.09,416.65 						"/>
					</g>
					<g>
						<polygon className="palma31" points="284.38,444.7 276.05,440.14 275.65,423.01 283.98,427.56 						"/>
						<polygon className="palma29" points="282.69,431 277.13,427.96 277.1,426.61 282.66,429.65 						"/>
					</g>
					<g>
						<polygon className="palma29" points="294.82,438.34 284.38,444.7 283.98,427.56 294.42,421.2 						"/>
						<g>
							<path className="palma30" d="M292.16,427.22c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C290.8,424.66,292.11,425.38,292.16,427.22z"/>
							<path className="palma124" d="M291.99,427.32c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C290.71,424.92,291.95,425.59,291.99,427.32z"/>
							<path className="palma31" d="M290.26,428.37c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C289.81,427.52,290.24,427.76,290.26,428.37z"/>
							<path className="palma29" d="M290.11,428.46c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C289.73,427.74,290.1,427.95,290.11,428.46z"/>
						</g>
						<g>
							<path className="palma30" d="M292.34,435.03c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C290.99,432.48,292.29,433.19,292.34,435.03z"/>
							<path className="palma124" d="M292.17,435.13c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C290.9,432.73,292.13,433.4,292.17,435.13z"/>
							<path className="palma31" d="M290.44,436.19c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C289.99,435.34,290.42,435.58,290.44,436.19z"/>
							<path className="palma29" d="M290.29,436.28c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C289.91,435.56,290.28,435.76,290.29,436.28z"/>
							<path className="palma30" d="M293.68,430.35c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C293.23,429.5,293.66,429.73,293.68,430.35z"/>
							<path className="palma31" d="M293.53,430.44c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C293.15,429.72,293.52,429.92,293.53,430.44z"/>
							<path className="palma30" d="M286.84,434.51c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C286.39,433.66,286.83,433.89,286.84,434.51z"/>
							<path className="palma31" d="M286.7,434.6c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C286.32,433.88,286.69,434.08,286.7,434.6z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="283.98,427.56 284,428.45 284.62,427.17 						"/>
						<polygon className="palma34" points="283.98,427.56 284,428.45 283.32,427.2 						"/>
						<polygon className="palma125" points="284.62,427.17 283.32,427.2 283.98,427.56 						"/>
						<polygon className="palma34" points="275.65,423.01 275.67,424.07 276.13,423.27 						"/>
						<polygon className="palma34" points="284.38,444.7 284.36,443.71 283.72,444.34 						"/>
						<polygon className="palma34" points="276.05,440.14 276.53,440.41 276.03,439.15 						"/>
						<polygon className="palma35" points="294.82,438.34 294.8,437.35 294.29,438.66 						"/>
						<polygon className="palma35" points="284.36,443.71 284.38,444.7 284.94,444.38 						"/>
						<polygon className="palma35" points="294.42,421.2 293.8,421.6 294.45,422.38 						"/>
						<polygon className="palma125" points="276.13,423.27 276.4,422.55 275.65,423.01 						"/>
						<polygon className="palma125" points="293.8,421.6 293.78,420.85 294.42,421.2 						"/>
						<polygon className="palma125" points="286.09,416.65 285.48,417.02 286.72,417 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="294.02,403.9 283.58,410.26 275.25,405.71 285.69,399.35 						"/>
					</g>
					<g>
						<polygon className="palma31" points="283.98,427.39 275.65,422.84 275.25,405.71 283.58,410.26 						"/>
						<polygon className="palma29" points="282.29,413.69 276.73,410.65 276.7,409.31 282.26,412.35 						"/>
					</g>
					<g>
						<polygon className="palma29" points="294.42,421.04 283.98,427.39 283.58,410.26 294.02,403.9 						"/>
						<g>
							<path className="palma30" d="M291.75,409.91c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C290.4,407.36,291.71,408.07,291.75,409.91z"/>
							<path className="palma124" d="M291.58,410.02c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C290.31,407.61,291.54,408.29,291.58,410.02z"/>
							<path className="palma31" d="M289.85,411.07c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C289.4,410.22,289.84,410.46,289.85,411.07z"/>
							<path className="palma29" d="M289.7,411.16c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C289.32,410.44,289.69,410.64,289.7,411.16z"/>
						</g>
						<g>
							<path className="palma30" d="M291.93,417.73c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C290.58,415.17,291.89,415.89,291.93,417.73z"/>
							<path className="palma124" d="M291.76,417.83c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C290.49,415.43,291.72,416.1,291.76,417.83z"/>
							<path className="palma31" d="M290.03,418.89c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C289.58,418.04,290.02,418.27,290.03,418.89z"/>
							<path className="palma29" d="M289.89,418.98c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C289.51,418.26,289.87,418.46,289.89,418.98z"/>
							<path className="palma30" d="M293.27,413.04c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C292.82,412.19,293.26,412.43,293.27,413.04z"/>
							<path className="palma31" d="M293.12,413.13c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C292.74,412.42,293.11,412.62,293.12,413.13z"/>
							<path className="palma30" d="M286.44,417.2c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C285.99,416.35,286.43,416.59,286.44,417.2z"/>
							<path className="palma31" d="M286.29,417.29c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C285.91,416.58,286.28,416.78,286.29,417.29z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="283.58,410.26 283.6,411.15 284.22,409.87 						"/>
						<polygon className="palma34" points="283.58,410.26 283.6,411.15 282.92,409.9 						"/>
						<polygon className="palma125" points="284.22,409.87 282.92,409.9 283.58,410.26 						"/>
						<polygon className="palma34" points="275.25,405.71 275.27,406.77 275.73,405.97 						"/>
						<polygon className="palma34" points="283.98,427.39 283.95,426.41 283.32,427.03 						"/>
						<polygon className="palma34" points="275.65,422.84 276.13,423.1 275.62,421.85 						"/>
						<polygon className="palma35" points="294.42,421.04 294.4,420.05 293.8,421.43 						"/>
						<polygon className="palma35" points="283.95,426.41 283.98,427.39 284.62,427 						"/>
						<polygon className="palma35" points="294.02,403.9 293.4,404.3 294.05,405.08 						"/>
						<polygon className="palma125" points="275.73,405.97 276,405.25 275.25,405.71 						"/>
						<polygon className="palma125" points="293.4,404.3 293.38,403.55 294.02,403.9 						"/>
						<polygon className="palma125" points="285.69,399.35 285.07,399.72 286.32,399.69 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="360.93,380.75 350.49,387.1 342.16,382.55 352.6,376.19 						"/>
					</g>
					<g>
						<polygon className="palma31" points="350.89,404.24 342.56,399.68 342.16,382.55 350.49,387.1 						"/>
						<polygon className="palma29" points="349.2,390.54 343.64,387.5 343.61,386.15 349.17,389.19 						"/>
					</g>
					<g>
						<polygon className="palma29" points="361.33,397.88 350.89,404.24 350.49,387.1 360.93,380.75 						"/>
						<g>
							<path className="palma30" d="M358.66,386.76c0.04,1.84-1.2,4.11-2.77,5.07s-2.88,0.24-2.92-1.6c-0.04-1.84,1.2-4.11,2.77-5.07
								C357.31,384.2,358.62,384.92,358.66,386.76z"/>
							<path className="palma124" d="M358.49,386.86c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C357.22,384.46,358.45,385.13,358.49,386.86z"/>
							<path className="palma31" d="M356.76,387.91c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C356.31,387.06,356.75,387.3,356.76,387.91z"/>
							<path className="palma29" d="M356.62,388c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C356.24,387.29,356.6,387.49,356.62,388z"/>
						</g>
						<g>
							<path className="palma30" d="M358.84,394.57c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C357.49,392.02,358.8,392.73,358.84,394.57z"/>
							<path className="palma124" d="M358.68,394.68c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C357.4,392.27,358.63,392.95,358.68,394.68z"/>
							<path className="palma31" d="M356.95,395.73c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C356.5,394.88,356.93,395.12,356.95,395.73z"/>
							<path className="palma29" d="M356.8,395.82c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C356.42,395.1,356.79,395.3,356.8,395.82z"/>
							<path className="palma30" d="M360.18,389.89c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C359.73,389.04,360.17,389.28,360.18,389.89z"/>
							<path className="palma31" d="M360.04,389.98c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C359.66,389.26,360.02,389.46,360.04,389.98z"/>
							<path className="palma30" d="M353.35,394.05c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C352.9,393.2,353.34,393.44,353.35,394.05z"/>
							<path className="palma31" d="M353.2,394.14c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C352.82,393.42,353.19,393.62,353.2,394.14z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="350.49,387.1 350.51,387.99 351.13,386.71 						"/>
						<polygon className="palma34" points="350.49,387.1 350.51,387.99 349.83,386.74 						"/>
						<polygon className="palma125" points="351.13,386.71 349.83,386.74 350.49,387.1 						"/>
						<polygon className="palma34" points="342.16,382.55 342.18,383.61 342.64,382.81 						"/>
						<polygon className="palma34" points="350.89,404.24 350.86,403.25 350.23,403.88 						"/>
						<polygon className="palma34" points="342.56,399.68 343.04,399.95 342.53,398.69 						"/>
						<polygon className="palma35" points="361.33,397.88 361.31,396.89 360.8,398.2 						"/>
						<polygon className="palma35" points="350.86,403.25 350.89,404.24 351.45,403.93 						"/>
						<polygon className="palma35" points="360.93,380.75 360.31,381.14 360.96,381.92 						"/>
						<polygon className="palma125" points="342.64,382.81 342.91,382.09 342.16,382.55 						"/>
						<polygon className="palma125" points="360.31,381.14 360.29,380.4 360.93,380.75 						"/>
						<polygon className="palma125" points="352.6,376.19 351.98,376.57 353.23,376.54 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="360.53,363.44 350.08,369.8 341.75,365.25 352.19,358.89 						"/>
					</g>
					<g>
						<polygon className="palma31" points="350.48,386.93 342.15,382.38 341.75,365.25 350.08,369.8 						"/>
						<polygon className="palma29" points="348.8,373.23 343.24,370.19 343.2,368.85 348.77,371.89 						"/>
					</g>
					<g>
						<polygon className="palma29" points="360.93,380.58 350.48,386.93 350.08,369.8 360.53,363.44 						"/>
						<g>
							<path className="palma30" d="M358.26,369.45c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C356.91,366.9,358.22,367.61,358.26,369.45z"/>
							<path className="palma124" d="M358.09,369.56c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C356.82,367.15,358.05,367.83,358.09,369.56z"/>
							<path className="palma31" d="M356.36,370.61c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C355.91,369.76,356.34,370,356.36,370.61z"/>
							<path className="palma29" d="M356.21,370.7c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C355.83,369.98,356.2,370.18,356.21,370.7z"/>
						</g>
						<g>
							<path className="palma30" d="M358.44,377.27c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C357.09,374.71,358.4,375.43,358.44,377.27z"/>
							<path className="palma124" d="M358.27,377.37c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C357,374.97,358.23,375.64,358.27,377.37z"/>
							<path className="palma31" d="M356.54,378.43c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C356.09,377.58,356.53,377.81,356.54,378.43z"/>
							<path className="palma29" d="M356.39,378.52c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C356.01,377.8,356.38,378,356.39,378.52z"/>
							<path className="palma30" d="M359.78,372.59c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C359.33,371.74,359.77,371.97,359.78,372.59z"/>
							<path className="palma31" d="M359.63,372.68c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C359.25,371.96,359.62,372.16,359.63,372.68z"/>
							<path className="palma30" d="M352.95,376.75c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C352.5,375.89,352.93,376.13,352.95,376.75z"/>
							<path className="palma31" d="M352.8,376.84c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C352.42,376.12,352.79,376.32,352.8,376.84z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="350.08,369.8 350.1,370.69 350.73,369.41 						"/>
						<polygon className="palma34" points="350.08,369.8 350.1,370.69 349.43,369.44 						"/>
						<polygon className="palma125" points="350.73,369.41 349.43,369.44 350.08,369.8 						"/>
						<polygon className="palma34" points="341.75,365.25 341.78,366.31 342.24,365.51 						"/>
						<polygon className="palma34" points="350.48,386.93 350.46,385.95 349.83,386.57 						"/>
						<polygon className="palma34" points="342.15,382.38 342.64,382.64 342.13,381.39 						"/>
						<polygon className="palma35" points="360.93,380.58 360.9,379.59 360.3,380.97 						"/>
						<polygon className="palma35" points="350.46,385.95 350.48,386.93 351.13,386.54 						"/>
						<polygon className="palma35" points="360.53,363.44 359.9,363.84 360.55,364.62 						"/>
						<polygon className="palma125" points="342.24,365.51 342.51,364.79 341.75,365.25 						"/>
						<polygon className="palma125" points="359.9,363.84 359.89,363.09 360.53,363.44 						"/>
						<polygon className="palma125" points="352.19,358.89 351.58,359.26 352.83,359.23 						"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<path className="palma31" d="M306.71,441.58c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L306.71,441.58z"/>
						<path className="palma29" d="M308.09,442.42c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C308.02,442.28,308.09,442.32,308.09,442.42z"/>
					</g>
					<g>
						<path className="palma31" d="M304.89,442.72c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L304.89,442.72z"/>
						<path className="palma29" d="M306.28,443.56c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C306.2,443.42,306.28,443.46,306.28,443.56z"/>
					</g>
					<g>
						<path className="palma31" d="M305.87,442.29c0,0,0,0.01,0,0.01l0,0h0c0,0.03-0.02,0.06-0.06,0.09c-0.09,0.05-0.23,0.06-0.32,0.01
							c-0.05-0.03-0.07-0.06-0.07-0.09h0l-0.2-8.27l0.45,0L305.87,442.29z"/>
						<path className="palma29" d="M305.6,433.95c-0.09-0.05-0.23-0.04-0.32,0.01c-0.09,0.05-0.08,0.14,0,0.18
							c0.09,0.05,0.23,0.04,0.32-0.01C305.69,434.08,305.69,433.99,305.6,433.95z"/>
					</g>
				</g>
				<g>
					<path className="palma126" d="M305.53,434.05l-0.21-0.09c0,0,0.11-1.34,0.2-1.69c0.1-0.35,0.24-0.52,0.38-0.56
						c0.18-0.05,0.2,0.41-0.01,0.54c0.02,0.23,0.17,1.01,0.17,1.01s-0.05,0-0.19,0.55C305.73,434.35,305.53,434.05,305.53,434.05z"
						/>
					<path className="palma45" d="M307.16,439.58c-0.21-0.25-0.27-0.69-0.15-1.19c0.05-0.19,0.07-0.39,0.05-0.58
						c-0.02-0.15,0.18-0.23,0.1-0.29c-0.01-0.01-0.27-0.11-0.28-0.11c-0.03,0-0.07,0.02-0.11,0.06c-0.32,0.37,0.21,0.92-0.82,1.37
						l-0.12-0.08c-0.28,0.22-0.14-0.18-0.67,0.17c-0.38,0.24-0.23-0.4-0.35-0.49c-0.01-0.01-0.26-0.11-0.27-0.11
						c-0.04,0-0.08,0.08-0.14,0.27c-0.39,1.3,0.32,1.29,0.41,1.69c0.07,0.35,0.06,0.77-0.03,1.2c-0.12,0.55-0.26,1.29-0.2,1.63
						c0.04,0.23,0.09,0.4,0.24,0.46c0.02,0.01,0.25,0.11,0.26,0.11c0.22,0.05,0.4-0.2,1.14-0.69c0,0,0.05-0.03,0.08-0.05
						c0.03-0.02,0.08-0.06,0.08-0.06c1.36-1.04,1.48-1.48,1.46-2.08C307.83,440.45,307.47,439.95,307.16,439.58z"/>
					<path className="palma39" d="M307.42,439.69c-0.21-0.25-0.27-0.69-0.15-1.19c0.05-0.19,0.07-0.39,0.05-0.58
						c-0.02-0.22-0.12-0.54-0.29-0.34c-0.32,0.37,0.21,0.92-0.82,1.37l-0.12-0.08c-0.28,0.22-0.14-0.18-0.67,0.17
						c-0.52,0.33-0.5-1.2-0.76-0.33c-0.39,1.3,0.32,1.29,0.41,1.69c0.07,0.35,0.06,0.77-0.03,1.2c-0.12,0.55-0.26,1.29-0.2,1.63
						c0.09,0.55,0.27,0.78,1.64-0.12c0,0,0.05-0.03,0.08-0.05c0.03-0.02,0.08-0.06,0.08-0.06c1.36-1.04,1.48-1.48,1.46-2.08
						C308.09,440.56,307.72,440.05,307.42,439.69z"/>
					<path className="palma26" d="M305.51,439.18c-0.13,0.12,0.05,0.23,0.11,0.54c0.05,0.31-0.18,1.25-0.06,1.77
						c0.13,0.52,1-0.53,1.24-0.64c0.24-0.12,0.78,0.17,0.93-0.02c0.15-0.18,0.08-0.67-0.4-1.09c-0.48-0.43,0.02-1.41-0.07-1.83
						c-0.07-0.33-0.16-0.29-0.21-0.21c-0.05,0.08,0.03,0.54-0.16,0.84c-0.04,0.06-0.37,0.47-0.69,0.6
						C305.87,439.26,305.61,439.09,305.51,439.18z"/>
					<polygon className="palma38" points="306.82,441.06 305.96,441.66 305.93,441.33 306.78,440.73 					"/>
					<g>
						<g>
							<polygon className="palma39" points="305.59,432.3 305.4,432.37 305.41,432.29 305.59,432.22 							"/>
							<g>
								<path className="palma38" d="M305.39,432.42L305.39,432.42c-0.04,0.02-0.06-0.01-0.06-0.06l0,0c0-0.05,0.04-0.1,0.07-0.11l0.01,0
									c0.03-0.01,0.06,0.01,0.05,0.06l0,0C305.46,432.35,305.43,432.4,305.39,432.42z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="305.55,432.68 305.36,432.75 305.37,432.66 305.55,432.6 							"/>
							<g>
								<path className="palma38" d="M305.35,432.79L305.35,432.79c-0.04,0.02-0.06-0.01-0.06-0.06l0,0c0-0.05,0.04-0.1,0.07-0.11l0.01,0
									c0.03-0.01,0.06,0.01,0.05,0.06l0,0C305.42,432.73,305.39,432.78,305.35,432.79z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="305.51,433.06 305.32,433.13 305.33,433.04 305.52,432.97 							"/>
							<g>
								<path className="palma38" d="M305.32,433.17L305.32,433.17c-0.04,0.02-0.06-0.01-0.06-0.06l0,0c0-0.05,0.04-0.1,0.07-0.11l0.01,0
									c0.03-0.01,0.06,0.01,0.05,0.06l0,0C305.38,433.11,305.35,433.16,305.32,433.17z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="305.47,433.44 305.28,433.51 305.29,433.42 305.48,433.35 							"/>
							<g>
								<path className="palma38" d="M305.28,433.55L305.28,433.55c-0.04,0.02-0.06-0.01-0.06-0.06l0,0c0-0.05,0.04-0.1,0.07-0.11l0.01,0
									c0.03-0.01,0.06,0.01,0.05,0.06l0,0C305.34,433.49,305.31,433.54,305.28,433.55z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="305.43,433.82 305.24,433.89 305.25,433.8 305.44,433.73 							"/>
							<g>
								<path className="palma38" d="M305.24,433.93L305.24,433.93c-0.04,0.02-0.06-0.01-0.06-0.06l0,0c0-0.05,0.04-0.1,0.07-0.11l0.01,0
									c0.03-0.01,0.06,0.01,0.05,0.06l0,0C305.3,433.87,305.27,433.92,305.24,433.93z"/>
							</g>
						</g>
					</g>
					<g>
						<polygon className="palma38" points="305.87,433.81 305.77,433.88 305.63,433.98 305.53,434.05 305.92,439.69 306.15,439.53 
							306.29,439.43 306.52,439.27 						"/>
						<polygon className="palma39" points="305.8,437.96 306.32,437.6 306.31,437.53 305.8,437.89 						"/>
						<polygon className="palma39" points="305.87,438.96 306.43,438.56 306.43,438.49 305.86,438.89 						"/>
						<polygon className="palma39" points="305.73,436.91 306.2,436.57 306.19,436.5 305.72,436.83 						"/>
						<polygon className="palma39" points="305.67,436.01 306.09,435.71 306.09,435.64 305.66,435.94 						"/>
						<polygon className="palma39" points="305.6,435.05 305.98,434.78 305.97,434.71 305.59,434.98 						"/>
					</g>
					<g>
						<polygon className="palma127" points="306.11,441.37 305.57,434.01 305.37,433.81 305.39,433.79 305.6,434 305.6,434.01 
							306.14,441.37 						"/>
					</g>
					<g>
						<polygon className="palma127" points="306.24,441.28 305.63,433.97 305.39,433.44 305.42,433.43 305.66,433.97 306.26,441.28 						
							"/>
					</g>
					<g>
						<polygon className="palma127" points="306.62,441.01 305.78,433.86 305.51,432.29 305.54,432.29 305.81,433.86 306.65,441.01 						
							"/>
					</g>
					<g>
						<polygon className="palma127" points="306.5,441.1 305.74,433.89 305.47,432.67 305.5,432.66 305.77,433.89 306.53,441.1 						"/>
					</g>
					<g>
						<polygon className="palma127" points="306.37,441.19 305.68,433.93 305.43,433.05 305.46,433.04 305.71,433.92 306.4,441.19 						
							"/>
					</g>
				</g>
			</g>
			<g>
				<path className="palma34" d="M272.1,361.66l0.18,7.89l82.86-50.45l-0.18-7.89L272.1,361.66z M334.07,330.61l-2.97-4.34l2.83-1.72
					L334.07,330.61z M334.37,324.27l2.83-1.72l-2.69,7.78L334.37,324.27z M327.2,334.79l-2.97-4.34l2.83-1.72L327.2,334.79z
					 M327.51,328.46l2.83-1.72l-2.69,7.78L327.51,328.46z M320.33,338.97l-2.97-4.34l2.83-1.72L320.33,338.97z M320.64,332.64
					l2.83-1.72l-2.69,7.78L320.64,332.64z M313.46,343.16l-2.97-4.34l2.83-1.72L313.46,343.16z M313.77,336.82l2.83-1.72l-2.69,7.78
					L313.77,336.82z M306.59,347.34l-2.97-4.34l2.83-1.72L306.59,347.34z M306.9,341l2.83-1.72l-2.69,7.78L306.9,341z
					 M299.73,351.52l-2.97-4.34l2.83-1.72L299.73,351.52z M300.04,345.18l2.83-1.72l-2.69,7.78L300.04,345.18z M292.86,355.7
					l-2.97-4.34l2.83-1.72L292.86,355.7z M293.17,349.36l2.83-1.72l-2.69,7.78L293.17,349.36z M285.99,359.88l-2.97-4.34l2.83-1.72
					L285.99,359.88z M286.3,353.55l2.83-1.72l-2.69,7.78L286.3,353.55z M279.12,364.06l-2.97-4.34l2.83-1.72L279.12,364.06z
					 M279.43,357.73l2.83-1.72l-2.69,7.78L279.43,357.73z M278.99,364.93l-6.11,3.72l2.9-8.4L278.99,364.93z M282.65,356.06
					l3.21,4.69l-6.11,3.72L282.65,356.06z M289.52,351.88l3.21,4.69l-6.11,3.72L289.52,351.88z M296.38,347.7l3.21,4.69l-6.11,3.72
					L296.38,347.7z M303.25,343.52l3.21,4.69l-6.11,3.72L303.25,343.52z M310.12,339.33l3.21,4.69l-6.11,3.72L310.12,339.33z
					 M316.99,335.15l3.21,4.69l-6.11,3.72L316.99,335.15z M323.85,330.97l3.21,4.69l-6.11,3.72L323.85,330.97z M330.72,326.79
					l3.21,4.69l-6.11,3.72L330.72,326.79z M337.59,322.61l3.21,4.69l-6.11,3.72L337.59,322.61z M337.96,322.09l2.83-1.72l0.14,6.06
					L337.96,322.09z M348.25,321.97l-0.14-6.06l2.83-1.72L348.25,321.97z M351.33,314.24l3.21,4.69l-6.11,3.72L351.33,314.24z
					 M347.8,322.25l-2.97-4.34l2.83-1.72L347.8,322.25z M347.66,323.11l-6.11,3.72l2.9-8.4L347.66,323.11z M341.38,326.15
					l-0.14-6.06l2.83-1.72L341.38,326.15z M275.39,360.19l-2.69,7.78l-0.14-6.06L275.39,360.19z M354.67,318.07l-2.97-4.34
					l2.83-1.72L354.67,318.07z"/>
				<path className="palma36" d="M272.29,369.54l6.92,3.78l82.86-50.45l-6.92-3.78L272.29,369.54z M339.88,335.07l-8.15-1.19l2.83-1.72
					L339.88,335.07z M335.01,331.89l2.83-1.72l2.49,4.63L335.01,331.89z M333.01,339.25l-8.15-1.19l2.83-1.72L333.01,339.25z
					 M328.14,336.07l2.83-1.72l2.49,4.63L328.14,336.07z M326.14,343.43l-8.15-1.19l2.83-1.72L326.14,343.43z M321.27,340.25
					l2.83-1.72l2.49,4.63L321.27,340.25z M319.27,347.61l-8.15-1.19l2.83-1.72L319.27,347.61z M314.41,344.43l2.83-1.72l2.49,4.63
					L314.41,344.43z M312.41,351.79l-8.15-1.19l2.83-1.72L312.41,351.79z M307.54,348.61l2.83-1.72l2.49,4.63L307.54,348.61z
					 M305.54,355.98l-8.15-1.19l2.83-1.72L305.54,355.98z M300.67,352.79l2.83-1.72l2.49,4.63L300.67,352.79z M298.67,360.16
					l-8.15-1.19l2.83-1.72L298.67,360.16z M293.8,356.98l2.83-1.72l2.49,4.63L293.8,356.98z M291.8,364.34l-8.15-1.19l2.83-1.72
					L291.8,364.34z M286.93,361.16l2.83-1.72l2.49,4.63L286.93,361.16z M284.94,368.52l-8.15-1.19l2.83-1.72L284.94,368.52z
					 M280.07,365.34l2.83-1.72l2.49,4.63L280.07,365.34z M285.46,368.98l-6.11,3.72l-2.69-5L285.46,368.98z M283.53,363.52l8.8,1.28
					l-6.11,3.72L283.53,363.52z M290.39,359.34l8.8,1.28l-6.11,3.72L290.39,359.34z M297.26,355.16l8.8,1.28l-6.11,3.72
					L297.26,355.16z M304.13,350.98l8.8,1.28l-6.11,3.72L304.13,350.98z M311,346.8l8.8,1.28l-6.11,3.72L311,346.8z M317.87,342.61
					l8.8,1.28l-6.11,3.72L317.87,342.61z M324.73,338.43l8.8,1.28l-6.11,3.72L324.73,338.43z M331.6,334.25l8.8,1.28l-6.11,3.72
					L331.6,334.25z M338.47,330.07l8.8,1.28l-6.11,3.72L338.47,330.07z M338.6,329.7l2.83-1.72l5.32,2.91L338.6,329.7z
					 M354.06,326.43l-5.32-2.91l2.83-1.72L354.06,326.43z M352.2,321.71l8.8,1.28l-6.11,3.72L352.2,321.71z M353.61,326.7
					l-8.15-1.19l2.83-1.72L353.61,326.7z M354.13,327.17l-6.11,3.72l-2.69-5L354.13,327.17z M347.2,330.61l-5.32-2.91l2.83-1.72
					L347.2,330.61z M276.03,367.8l2.49,4.63l-5.32-2.91L276.03,367.8z M360.48,322.52l-8.15-1.19l2.83-1.72L360.48,322.52z"/>
				<path className="palma35" d="M279.02,365.44l0.18,7.89l82.86-50.45l-0.18-7.89L279.02,365.44z M340.99,334.39l-2.97-4.34l2.83-1.72
					L340.99,334.39z M341.3,328.06l2.83-1.72l-2.69,7.78L341.3,328.06z M334.12,338.58l-2.97-4.34l2.83-1.72L334.12,338.58z
					 M334.43,332.24l2.83-1.72l-2.69,7.78L334.43,332.24z M327.25,342.76l-2.97-4.34l2.83-1.72L327.25,342.76z M327.56,336.42
					l2.83-1.72l-2.69,7.78L327.56,336.42z M320.38,346.94l-2.97-4.34l2.83-1.72L320.38,346.94z M320.69,340.6l2.83-1.72l-2.69,7.78
					L320.69,340.6z M313.52,351.12l-2.97-4.34l2.83-1.72L313.52,351.12z M313.83,344.78l2.83-1.72l-2.69,7.78L313.83,344.78z
					 M306.65,355.3l-2.97-4.34l2.83-1.72L306.65,355.3z M306.96,348.97l2.83-1.72l-2.69,7.78L306.96,348.97z M299.78,359.48
					l-2.97-4.34l2.83-1.72L299.78,359.48z M300.09,353.15l2.83-1.72l-2.69,7.78L300.09,353.15z M292.91,363.67l-2.97-4.34l2.83-1.72
					L292.91,363.67z M293.22,357.33l2.83-1.72l-2.69,7.78L293.22,357.33z M286.04,367.85l-2.97-4.34l2.83-1.72L286.04,367.85z
					 M286.35,361.51l2.83-1.72l-2.69,7.78L286.35,361.51z M285.91,368.71l-6.11,3.72l2.9-8.4L285.91,368.71z M289.57,359.84
					l3.21,4.69l-6.11,3.72L289.57,359.84z M296.44,355.66l3.21,4.69l-6.11,3.72L296.44,355.66z M303.3,351.48l3.21,4.69l-6.11,3.72
					L303.3,351.48z M310.17,347.3l3.21,4.69l-6.11,3.72L310.17,347.3z M317.04,343.12l3.21,4.69l-6.11,3.72L317.04,343.12z
					 M323.91,338.94l3.21,4.69l-6.11,3.72L323.91,338.94z M330.78,334.75l3.21,4.69l-6.11,3.72L330.78,334.75z M337.64,330.57
					l3.21,4.69l-6.11,3.72L337.64,330.57z M344.51,326.39l3.21,4.69l-6.11,3.72L344.51,326.39z M344.88,325.87l2.83-1.72l0.14,6.06
					L344.88,325.87z M355.17,325.76l-0.14-6.06l2.83-1.72L355.17,325.76z M358.25,318.03l3.21,4.69l-6.11,3.72L358.25,318.03z
					 M354.72,326.03l-2.97-4.34l2.83-1.72L354.72,326.03z M354.59,326.9l-6.11,3.72l2.9-8.4L354.59,326.9z M348.31,329.94
					l-0.14-6.06l2.83-1.72L348.31,329.94z M282.31,363.97l-2.69,7.78l-0.14-6.06L282.31,363.97z M361.59,321.85l-2.97-4.34
					l2.83-1.72L361.59,321.85z"/>
				<path className="palma125" d="M272.1,361.66l6.92,3.78l82.86-50.45l-6.92-3.78L272.1,361.66z M360.3,314.64l-8.15-1.19l2.83-1.72
					L360.3,314.64z M353.43,318.82l-8.15-1.19l2.83-1.72L353.43,318.82z M348.56,315.64l2.83-1.72l2.49,4.63L348.56,315.64z
					 M346.56,323l-8.15-1.19l2.83-1.72L346.56,323z M341.69,319.82l2.83-1.72l2.49,4.63L341.69,319.82z M339.69,327.18l-8.15-1.19
					l2.83-1.72L339.69,327.18z M334.82,324l2.83-1.72l2.49,4.63L334.82,324z M332.83,331.36l-8.15-1.19l2.83-1.72L332.83,331.36z
					 M327.96,328.18l2.83-1.72l2.49,4.63L327.96,328.18z M325.96,335.54l-8.15-1.19l2.83-1.72L325.96,335.54z M321.09,332.36
					l2.83-1.72l2.49,4.63L321.09,332.36z M319.09,339.73l-8.15-1.19l2.83-1.72L319.09,339.73z M314.22,336.54l2.83-1.72l2.49,4.63
					L314.22,336.54z M312.22,343.91l-8.15-1.19l2.83-1.72L312.22,343.91z M307.35,340.73l2.83-1.72l2.49,4.63L307.35,340.73z
					 M305.36,348.09l-8.15-1.19l2.83-1.72L305.36,348.09z M300.49,344.91l2.83-1.72l2.49,4.63L300.49,344.91z M298.49,352.27
					l-8.15-1.19l2.83-1.72L298.49,352.27z M293.62,349.09l2.83-1.72l2.49,4.63L293.62,349.09z M291.62,356.45l-8.15-1.19l2.83-1.72
					L291.62,356.45z M286.75,353.27l2.83-1.72l2.49,4.63L286.75,353.27z M284.75,360.63l-8.15-1.19l2.83-1.72L284.75,360.63z
					 M279.88,357.45l2.83-1.72l2.49,4.63L279.88,357.45z M285.27,361.1l-6.11,3.72l-2.69-5L285.27,361.1z M283.34,355.64l8.8,1.28
					l-6.11,3.72L283.34,355.64z M290.21,351.45l8.8,1.28l-6.11,3.72L290.21,351.45z M297.08,347.27l8.8,1.28l-6.11,3.72
					L297.08,347.27z M303.95,343.09l8.8,1.28l-6.11,3.72L303.95,343.09z M310.81,338.91l8.8,1.28l-6.11,3.72L310.81,338.91z
					 M317.68,334.73l8.8,1.28l-6.11,3.72L317.68,334.73z M324.55,330.55l8.8,1.28l-6.11,3.72L324.55,330.55z M331.42,326.36
					l8.8,1.28l-6.11,3.72L331.42,326.36z M338.28,322.18l8.8,1.28l-6.11,3.72L338.28,322.18z M345.15,318l8.8,1.28l-6.11,3.72
					L345.15,318z M352.02,313.82l8.8,1.28l-6.11,3.72L352.02,313.82z M275.84,359.91l2.49,4.63l-5.32-2.91L275.84,359.91z"/>
			</g>
			<g>
				<g>
					<g>
						<path className="palma31" d="M362.93,405.11c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L362.93,405.11z"/>
						<path className="palma29" d="M364.32,405.95c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C364.24,405.8,364.31,405.84,364.32,405.95z"/>
					</g>
					<g>
						<path className="palma31" d="M361.12,406.25c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L361.12,406.25z"/>
						<path className="palma29" d="M362.5,407.09c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C362.43,406.94,362.5,406.98,362.5,407.09z"/>
					</g>
					<g>
						<path className="palma31" d="M362.09,405.82c0,0,0,0.01,0,0.01l0,0l0,0c0,0.03-0.02,0.06-0.06,0.09c-0.09,0.05-0.23,0.06-0.32,0.01
							c-0.05-0.03-0.07-0.06-0.07-0.09h0l-0.2-8.27l0.45,0L362.09,405.82z"/>
						<path className="palma29" d="M361.82,397.47c-0.09-0.05-0.23-0.04-0.32,0.01c-0.09,0.05-0.08,0.14,0,0.18
							c0.09,0.05,0.23,0.04,0.32-0.01C361.91,397.6,361.91,397.52,361.82,397.47z"/>
					</g>
				</g>
				<g>
					<path className="palma126" d="M361.33,395.61l-0.27-0.1c0,0,0.06-1.7,0.16-2.14c0.1-0.44,0.27-0.67,0.44-0.73
						c0.22-0.07,0.28,0.5,0.02,0.68c0.04,0.28,0.27,1.26,0.27,1.26s-0.06,0.01-0.21,0.7C361.59,395.99,361.33,395.61,361.33,395.61z
						"/>
					<path className="palma128" d="M363.55,402.73c-0.22-0.24-0.3-0.68-0.2-1.18c0.04-0.19,0.06-0.4,0.03-0.58
						c-0.02-0.15,0.17-0.24,0.09-0.29c-0.01-0.01-0.27-0.1-0.29-0.1c-0.03,0-0.07,0.02-0.11,0.07c-0.3,0.38,0.25,0.91-0.75,1.4
						l-0.13-0.08c-0.27,0.24-0.14-0.17-0.66,0.2c-0.36,0.26-0.25-0.39-0.37-0.47c-0.01-0.01-0.26-0.1-0.27-0.1
						c-0.04,0-0.08,0.08-0.13,0.27c-0.33,1.32,0.38,1.28,0.48,1.67c0.09,0.35,0.1,0.76,0.02,1.2c-0.09,0.55-0.2,1.3-0.13,1.64
						c0.05,0.23,0.11,0.4,0.26,0.45c0.02,0.01,0.25,0.09,0.27,0.1c0.22,0.04,0.39-0.22,1.11-0.74c0,0,0.05-0.04,0.08-0.06
						c0.03-0.02,0.08-0.06,0.08-0.06c1.31-1.1,1.41-1.55,1.36-2.15C364.26,403.57,363.87,403.08,363.55,402.73z"/>
					<path className="palma129" d="M363.81,402.82c-0.22-0.24-0.3-0.68-0.2-1.18c0.04-0.19,0.06-0.4,0.03-0.58
						c-0.03-0.22-0.14-0.53-0.31-0.32c-0.3,0.38,0.25,0.91-0.75,1.4l-0.13-0.08c-0.27,0.24-0.14-0.17-0.66,0.2
						c-0.5,0.36-0.55-1.17-0.77-0.3c-0.33,1.32,0.38,1.28,0.48,1.67c0.09,0.35,0.1,0.76,0.02,1.2c-0.09,0.55-0.2,1.3-0.13,1.64
						c0.11,0.55,0.31,0.77,1.63-0.19c0,0,0.05-0.04,0.08-0.06c0.03-0.02,0.08-0.06,0.08-0.06c1.31-1.1,1.41-1.55,1.36-2.15
						C364.52,403.66,364.13,403.17,363.81,402.82z"/>
					<path className="palma26" d="M361.89,402.4c-0.12,0.13,0.06,0.23,0.13,0.54c0.07,0.31-0.13,1.26,0.02,1.77
						c0.15,0.51,0.98-0.57,1.21-0.7c0.23-0.13,0.79,0.13,0.93-0.06c0.14-0.19,0.05-0.67-0.44-1.07c-0.5-0.4-0.04-1.41-0.15-1.83
						c-0.08-0.32-0.18-0.28-0.22-0.2c-0.04,0.08,0.05,0.54-0.13,0.84c-0.04,0.07-0.35,0.49-0.67,0.63
						C362.25,402.47,361.98,402.3,361.89,402.4z"/>
					<polygon className="palma38" points="363.35,404.37 362.3,405.19 362.25,404.77 363.29,403.96 					"/>
					<g>
						<g>
							<polygon className="palma39" points="361.27,393.86 361.04,393.95 361.05,393.85 361.27,393.75 							"/>
							<g>
								<path className="palma38" d="M361.03,394.01L361.03,394.01c-0.05,0.02-0.08-0.01-0.08-0.07l0,0c0-0.06,0.04-0.12,0.08-0.14l0.01,0
									c0.04-0.02,0.07,0.02,0.07,0.08l0,0C361.11,393.93,361.07,393.99,361.03,394.01z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="361.24,394.37 361.01,394.47 361.02,394.36 361.25,394.26 							"/>
							<g>
								<path className="palma38" d="M361,394.52L361,394.52c-0.05,0.02-0.08-0.01-0.08-0.07l0,0c0-0.06,0.04-0.12,0.08-0.14l0.01,0
									c0.04-0.02,0.07,0.02,0.07,0.08l0,0C361.09,394.44,361.05,394.5,361,394.52z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="361.21,394.85 360.98,394.95 360.99,394.84 361.22,394.74 							"/>
							<g>
								<path className="palma38" d="M360.98,395L360.98,395c-0.05,0.02-0.08-0.01-0.08-0.07l0,0c0-0.06,0.04-0.12,0.08-0.14l0.01,0
									c0.04-0.02,0.07,0.02,0.07,0.08l0,0C361.06,394.92,361.02,394.98,360.98,395z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="361.18,395.33 360.96,395.43 360.96,395.32 361.19,395.22 							"/>
							<g>
								<path className="palma38" d="M360.95,395.48L360.95,395.48c-0.05,0.02-0.08-0.01-0.08-0.07l0,0c0-0.06,0.04-0.12,0.08-0.14l0.01,0
									c0.04-0.02,0.07,0.02,0.07,0.08l0,0C361.03,395.4,360.99,395.46,360.95,395.48z"/>
							</g>
						</g>
					</g>
					<g>
						<polygon className="palma38" points="361.74,395.29 361.62,395.38 361.45,395.52 361.33,395.61 362.14,402.7 362.42,402.49 
							362.59,402.35 362.87,402.13 						"/>
						<polygon className="palma39" points="361.89,400.53 362.52,400.04 362.51,399.95 361.88,400.44 						"/>
						<polygon className="palma39" points="362.04,401.78 362.73,401.25 362.71,401.16 362.03,401.69 						"/>
						<polygon className="palma39" points="361.74,399.2 362.31,398.76 362.3,398.67 361.73,399.11 						"/>
						<polygon className="palma39" points="361.61,398.08 362.13,397.68 362.12,397.59 361.6,397.99 						"/>
						<polygon className="palma39" points="361.47,396.87 361.94,396.51 361.92,396.42 361.46,396.78 						"/>
					</g>
					<g>
						<polygon className="palma127" points="362.49,404.81 361.38,395.57 361.11,395.32 361.14,395.3 361.41,395.55 361.41,395.56 
							362.52,404.81 						"/>
					</g>
					<g>
						<polygon className="palma127" points="362.71,404.61 361.44,395.51 361.12,394.85 361.15,394.84 361.48,395.5 362.74,404.61 						
							"/>
					</g>
					<g>
						<polygon className="palma127" points="363.1,404.33 361.63,395.36 361.17,393.85 361.2,393.84 361.67,395.35 363.14,404.32 						"/>
					</g>
					<g>
						<polygon className="palma127" points="362.91,404.47 361.51,395.45 361.15,394.36 361.18,394.35 361.55,395.45 362.94,404.46 						
							"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<path className="palma31" d="M300.03,443.07c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L300.03,443.07z"/>
						<path className="palma29" d="M301.41,443.91c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C301.34,443.77,301.41,443.81,301.41,443.91z"/>
					</g>
					<g>
						<path className="palma31" d="M298.21,444.21c0,0-0.01,0-0.01-0.01l0,0l0,0c-0.03-0.01-0.07-0.01-0.11,0.02
							c-0.09,0.05-0.16,0.18-0.15,0.28c0,0.05,0.02,0.09,0.05,0.1l0,0l1.35,0.74l0.2-0.4L298.21,444.21z"/>
						<path className="palma29" d="M299.6,445.05c0,0.1-0.07,0.23-0.15,0.28c-0.09,0.05-0.16,0.01-0.16-0.09c0-0.1,0.07-0.23,0.15-0.28
							C299.52,444.91,299.59,444.95,299.6,445.05z"/>
					</g>
					<g>
						<path className="palma31" d="M299.19,443.78c0,0,0,0.01,0,0.01l0,0h0c0,0.03-0.02,0.06-0.06,0.09c-0.09,0.05-0.23,0.06-0.32,0.01
							c-0.05-0.03-0.07-0.06-0.07-0.09h0l-0.2-8.27l0.45,0L299.19,443.78z"/>
						<path className="palma29" d="M298.92,435.44c-0.09-0.05-0.23-0.04-0.32,0.01c-0.09,0.05-0.08,0.14,0,0.18
							c0.09,0.05,0.23,0.04,0.32-0.01C299.01,435.57,299.01,435.48,298.92,435.44z"/>
					</g>
				</g>
				<g>
					<g>
						<path className="palma130" d="M299.81,439.71c0-0.22,0.2-0.88,0.14-1.47c-0.01-0.16,0.68,0.06,0.59-0.01
							c-0.01-0.01-0.78-0.36-0.8-0.36c-0.23-0.14-0.64-0.06-1.07,0.2l0-0.01c-0.03,0.02-0.06,0.04-0.08,0.06
							c-0.03,0.02-0.06,0.04-0.08,0.06l0,0.01c-0.65,0.51-1.16,1.27-1.12,1.83c0.04,0.6,0.32,0.93,0.35,1.13
							c0.03,0.2-0.57,1.81-0.49,2.4c0.05,0.31,0.14,0.73,0.45,0.88c0.02,0.01,0.76,0.34,0.79,0.35c0.25,0.08-0.08-0.32,0.49-0.68
							c0,0,0.06-0.03,0.08-0.05c0.03-0.02,0.08-0.06,0.08-0.06c1.4-1.04,1.48-2.14,1.47-2.76
							C300.6,440.58,299.81,439.93,299.81,439.71z"/>
						<path className="palma131" d="M300.58,440.05c0-0.22,0.2-0.88,0.14-1.47c-0.05-0.55-0.63-0.56-1.28-0.17l0-0.01
							c-0.03,0.02-0.06,0.04-0.08,0.06c-0.03,0.02-0.06,0.04-0.08,0.06l0,0.01c-0.65,0.51-1.16,1.27-1.12,1.83
							c0.04,0.6,0.32,0.93,0.35,1.13c0.03,0.2-0.57,1.81-0.49,2.4c0.08,0.57,0.32,1.45,1.73,0.55c0,0,0.06-0.03,0.08-0.05
							c0.03-0.02,0.08-0.06,0.08-0.06c1.4-1.04,1.48-2.14,1.47-2.76C301.36,440.92,300.58,440.27,300.58,440.05z"/>
						<path className="palma126" d="M299.43,439.39c-0.41,0.28-0.7,0.9-0.66,1.39c0.04,0.49,0.4,0.66,0.8,0.38c0.41-0.28,0.7-0.9,0.66-1.39
							C300.19,439.28,299.83,439.11,299.43,439.39z M299.55,440.96c-0.32,0.22-0.6,0.08-0.63-0.3c-0.03-0.38,0.2-0.87,0.52-1.08
							c0.32-0.22,0.6-0.08,0.63,0.3C300.1,440.26,299.87,440.75,299.55,440.96z"/>
						<path className="palma39" d="M300.03,439.9c0.03,0.36-0.19,0.81-0.48,1.02c-0.3,0.2-0.56,0.08-0.59-0.28
							c-0.03-0.36,0.19-0.81,0.48-1.02C299.74,439.42,300,439.55,300.03,439.9z"/>
					</g>
					<polygon className="palma38" points="300.45,442.1 298.92,443.15 298.9,442.81 300.42,441.76 					"/>
					<g>
						<g>
							<polygon className="palma39" points="299.39,433.46 298.56,434.04 298.55,433.96 299.38,433.38 							"/>
							<g>
								<path className="palma38" d="M298.56,434.08L298.56,434.08c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C298.62,434,298.59,434.05,298.56,434.08z"/>
								<path className="palma38" d="M299.4,433.49L299.4,433.49c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C299.47,433.41,299.44,433.47,299.4,433.49z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="299.42,433.82 298.59,434.39 298.58,434.31 299.41,433.74 							"/>
							<g>
								<path className="palma38" d="M298.59,434.43L298.59,434.43c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C298.65,434.35,298.62,434.41,298.59,434.43z"/>
								<path className="palma38" d="M299.43,433.85L299.43,433.85c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C299.49,433.77,299.47,433.83,299.43,433.85z"/>
							</g>
						</g>
						<g>
							<polygon className="palma39" points="299.45,434.17 298.62,434.75 298.61,434.67 299.44,434.1 							"/>
							<g>
								<path className="palma38" d="M298.61,434.79L298.61,434.79c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C298.68,434.71,298.65,434.77,298.61,434.79z"/>
								<path className="palma38" d="M299.46,434.21L299.46,434.21c-0.04,0.03-0.07,0.01-0.08-0.03l0,0c0-0.04,0.02-0.1,0.06-0.12l0.01,0
									c0.04-0.02,0.07-0.01,0.07,0.03l0,0C299.52,434.13,299.5,434.18,299.46,434.21z"/>
							</g>
						</g>
						<path className="palma126" d="M299.23,433.13c-0.03-0.09-0.13-0.08-0.2,0.03l-0.09,0.13l-0.1,0c-0.08,0-0.18,0.12-0.19,0.24
							l-0.02,0.25l0.09,1.11l0.16,0.26l0.39-0.27l0.11-0.44l-0.09-1.11L299.23,433.13z M298.96,434.59c0,0.04-0.02,0.1-0.06,0.12
							c-0.03,0.02-0.07,0.01-0.07-0.03l-0.08-0.94c0-0.04,0.02-0.1,0.06-0.12c0.04-0.02,0.07-0.01,0.07,0.03L298.96,434.59z
							 M299.25,434.39c0,0.04-0.02,0.1-0.06,0.12c-0.04,0.02-0.07,0.01-0.07-0.03l-0.08-0.94c0-0.04,0.02-0.1,0.06-0.12
							c0.03-0.02,0.07-0.01,0.07,0.03L299.25,434.39z"/>
					</g>
					<g>
						<polygon className="palma38" points="299.27,434.88 299.16,434.95 298.99,435.07 298.88,435.15 299.11,440.07 299.38,439.89 
							299.54,439.77 299.81,439.59 						"/>
						<polygon className="palma39" points="299.04,438.56 299.65,438.15 299.64,438.09 299.04,438.5 						"/>
						<polygon className="palma39" points="299.08,439.43 299.74,438.98 299.74,438.92 299.08,439.37 						"/>
						<polygon className="palma39" points="299,437.64 299.55,437.26 299.54,437.2 298.99,437.58 						"/>
						<polygon className="palma39" points="298.96,436.86 299.46,436.52 299.45,436.46 298.96,436.8 						"/>
						<polygon className="palma39" points="298.92,436.02 299.37,435.71 299.36,435.65 298.92,435.96 						"/>
					</g>
					<g>
						<g>
							<polygon className="palma127" points="299.35,442.67 298.92,435.11 298.77,433.84 298.8,433.83 298.95,435.1 299.38,442.67 							
								"/>
						</g>
						<g>
							<polygon className="palma127" points="299.46,442.59 298.97,435.08 298.88,434.14 298.91,434.13 299,435.07 299.49,442.59 							
								"/>
						</g>
						<g>
							<polygon className="palma127" points="299.58,442.51 299.02,435.04 298.89,434.51 298.91,434.5 299.05,435.03 299.61,442.51 							
								"/>
						</g>
						<g>
							<polygon className="palma127" points="299.97,442.24 299.18,434.93 299.14,433.58 299.17,433.58 299.21,434.93 300,442.24 							
								"/>
						</g>
						<g>
							<polygon className="palma127" points="299.85,442.32 299.14,434.96 299.09,433.99 299.12,433.99 299.17,434.95 299.88,442.32 
															"/>
						</g>
						<g>
							<polygon className="palma127" points="299.72,442.41 299.08,435 299.14,434.33 299.17,434.33 299.11,435 299.75,442.41 							"/>
						</g>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="289.05" y="373.56" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.7541 206.5479)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="289.06" y="373.52" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.7376 206.5294)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="289.07" y="373.48" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.7212 206.5108)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="289.08" y="373.44" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.7047 206.4923)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="289.09" y="373.4" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.6883 206.4737)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="289.09" y="373.37" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.6719 206.455)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="289.1" y="373.33" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.6554 206.4365)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="289.11" y="373.29" transform="matrix(0.854 -0.5204 0.5204 0.854 -151.7108 206.6088)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="289.12" y="373.25" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.8504 207.0059)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="289.13" y="373.21" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.834 206.9873)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="289.14" y="373.17" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -151.8031 206.9302)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="289.14" y="373.13" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.801 206.9499)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="289.15" y="373.1" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.7846 206.9313)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="289.16" y="373.06" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.768 206.9127)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="289.17" y="373.02" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -151.8008 207.0255)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="289.18" y="372.98" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -151.8562 207.1987)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="289.19" y="372.94" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -151.8401 207.1812)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="289.19" y="372.9" transform="matrix(0.853 -0.5219 0.5219 0.853 -151.8459 207.222)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="289.2" y="372.86" transform="matrix(0.853 -0.5219 0.5219 0.853 -151.8295 207.2034)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="289.21" y="372.83" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -151.8819 207.3692)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="289.22" y="372.79" transform="matrix(0.8523 -0.523 0.523 0.8523 -152.0085 207.7343)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="289.23" y="372.75" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -152.0062 207.7539)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="289.24" y="372.71" transform="matrix(0.8523 -0.523 0.523 0.8523 -151.9814 207.7128)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="289.25" y="372.67" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.9502 207.6546)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="289.25" y="372.63" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.9341 207.6371)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="289.26" y="372.59" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.9176 207.6183)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="289.27" y="372.56" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -152.0437 207.983)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="289.28" y="372.52" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -152.0414 208.0025)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="289.29" y="372.48" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -152.1019 208.1914)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="289.3" y="372.44" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -152.0853 208.1726)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="289.3" y="372.4" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -152.2024 208.5146)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="289.31" y="372.36" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -152.1859 208.4959)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="289.32" y="372.32" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -152.1689 208.4759)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="289.33" y="372.29" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -152.1528 208.4582)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="289.34" y="372.25" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -152.2776 208.8222)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="289.35" y="372.21" transform="matrix(0.8505 -0.526 0.526 0.8505 -152.3437 209.0278)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="289.36" y="372.17" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -152.3134 208.9718)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="289.36" y="372.13" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -152.2964 208.9518)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="289.37" y="372.09" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -152.4206 209.3156)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="289.38" y="372.05" transform="matrix(0.85 -0.5267 0.5267 0.85 -152.4177 209.3338)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="289.39" y="372.01" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -152.3874 209.2778)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="289.4" y="371.98" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.5936 209.8665)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="289.41" y="371.94" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.577 209.8476)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="289.42" y="371.9" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.5602 209.8286)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="289.42" y="371.86" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -152.6689 210.1525)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="289.43" y="371.82" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -152.6671 210.1741)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="289.44" y="371.78" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -152.7241 210.3572)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="289.45" y="371.74" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -152.8464 210.7203)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="289.46" y="371.71" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -152.8158 210.6631)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="289.47" y="371.67" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -152.9377 211.0258)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="289.47" y="371.63" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -153.0032 211.2335)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="289.48" y="371.59" transform="matrix(0.847 -0.5316 0.5316 0.847 -153.1381 211.6343)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="289.49" y="371.55" transform="matrix(0.847 -0.5315 0.5315 0.847 -153.1158 211.5997)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="289.5" y="371.51" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -153.3098 212.1658)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="289.51" y="371.47" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -153.2939 212.149)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="289.52" y="371.44" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -153.4135 212.5099)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="289.52" y="371.4" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -153.4648 212.6808)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="289.53" y="371.36" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -153.5843 213.0429)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="289.54" y="371.32" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -153.5811 213.0618)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="289.55" y="371.28" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -153.7679 213.6145)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="289.56" y="371.24" transform="matrix(0.844 -0.5363 0.5363 0.844 -153.8858 213.9749)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="289.57" y="371.2" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -154.0771 214.5444)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="289.58" y="371.17" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -154.0603 214.525)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="289.58" y="371.13" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -154.2452 215.0789)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="289.59" y="371.09" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -154.3618 215.4399)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="289.6" y="371.05" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -154.5592 216.0335)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="289.61" y="371.01" transform="matrix(0.841 -0.5411 0.5411 0.841 -154.661 216.3547)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="289.62" y="370.97" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -154.8621 216.9635)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="289.63" y="370.93" transform="matrix(0.8397 -0.543 0.543 0.8397 -154.9761 217.3224)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="289.63" y="370.89" transform="matrix(0.839 -0.5441 0.5441 0.839 -155.1572 217.8778)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="289.64" y="370.86" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -155.3507 218.4716)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="289.65" y="370.82" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -155.6726 219.4452)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="289.66" y="370.78" transform="matrix(0.8364 -0.5481 0.5481 0.8364 -155.8431 219.9787)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="289.67" y="370.74" transform="matrix(0.8352 -0.55 0.55 0.8352 -156.1614 220.953)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="289.68" y="370.7" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -156.3506 221.549)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="289.69" y="370.66" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -156.6524 222.4861)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="289.69" y="370.62" transform="matrix(0.832 -0.5547 0.5547 0.832 -156.9565 223.4372)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="289.7" y="370.59" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -157.2534 224.3733)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="289.71" y="370.55" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -157.6393 225.5913)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="289.72" y="370.51" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -158.0528 226.9067)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="289.73" y="370.47" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -158.4238 228.1023)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="289.74" y="370.43" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -158.9059 229.663)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="289.74" y="370.39" transform="matrix(0.8216 -0.57 0.57 0.8216 -159.4987 231.6012)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="289.75" y="370.35" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -159.9604 233.1399)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="289.76" y="370.32" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -160.6048 235.3055)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="289.77" y="370.28" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -161.3485 237.8483)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="289.78" y="370.24" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -162.2647 241.0476)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="289.79" y="370.2" transform="matrix(0.8053 -0.5928 0.5928 0.8053 -163.1331 244.1646)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="289.79" y="370.16" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -164.1739 248.006)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="345.74" y="338.81" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.4183 230.9554)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="345.74" y="338.77" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.4019 230.9368)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="345.75" y="338.73" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3854 230.9181)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="345.76" y="338.69" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.369 230.8996)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="345.77" y="338.65" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3525 230.881)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="345.78" y="338.62" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3361 230.8625)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="345.79" y="338.58" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3196 230.8439)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="345.79" y="338.54" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3032 230.8252)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="345.8" y="338.5" transform="matrix(0.8535 -0.521 0.521 0.8535 -125.4192 231.3898)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="345.81" y="338.46" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -125.4119 231.4122)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="345.82" y="338.42" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -125.3954 231.3936)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="345.83" y="338.38" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -125.3843 231.3988)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="345.84" y="338.35" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -125.3679 231.3801)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="345.85" y="338.31" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -125.3422 231.3204)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="345.85" y="338.27" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -125.3813 231.548)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="345.86" y="338.23" transform="matrix(0.853 -0.5219 0.5219 0.853 -125.4111 231.7343)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="345.87" y="338.19" transform="matrix(0.853 -0.5218 0.5218 0.853 -125.3892 231.6919)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="345.88" y="338.15" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -125.364 231.6345)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="345.89" y="338.11" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -125.347 231.6135)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="345.9" y="338.08" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -125.384 231.8328)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="345.9" y="338.04" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -125.3767 231.8551)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="345.91" y="338" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -125.4574 232.2701)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="345.92" y="337.96" transform="matrix(0.8523 -0.523 0.523 0.8523 -125.4317 232.2104)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="345.93" y="337.92" transform="matrix(0.8523 -0.523 0.523 0.8523 -125.4152 232.1917)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="345.94" y="337.88" transform="matrix(0.8523 -0.523 0.523 0.8523 -125.3987 232.1729)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="345.95" y="337.84" transform="matrix(0.8523 -0.523 0.523 0.8523 -125.386 232.1713)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="345.96" y="337.8" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.4517 232.521)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="345.96" y="337.77" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.4352 232.5022)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="345.97" y="337.73" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -125.4718 232.7223)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="345.98" y="337.69" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -125.4547 232.7011)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="345.99" y="337.65" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -125.5204 233.0529)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="346" y="337.61" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -125.5123 233.0727)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="346.01" y="337.57" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -125.5015 233.0801)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="346.01" y="337.53" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -125.4849 233.0613)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="346.02" y="337.5" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -125.5443 233.3864)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="346.03" y="337.46" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -125.581 233.6095)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="346.04" y="337.42" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -125.5639 233.5883)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="346.05" y="337.38" transform="matrix(0.8505 -0.526 0.526 0.8505 -125.5563 233.6102)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="346.06" y="337.34" transform="matrix(0.85 -0.5267 0.5267 0.85 -125.6293 233.9998)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="346.07" y="337.3" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -125.6037 233.9401)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="346.07" y="337.26" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -125.5871 233.9212)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="346.08" y="337.23" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.7066 234.5267)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="346.09" y="337.19" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.69 234.5077)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="346.1" y="337.15" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.6734 234.4888)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="346.11" y="337.11" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -125.7504 234.9018)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="346.12" y="337.07" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -125.7332 234.8805)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="346.12" y="337.03" transform="matrix(0.8486 -0.529 0.529 0.8486 -125.7692 235.1049)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="346.13" y="336.99" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -125.8316 235.4527)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="346.14" y="336.96" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -125.8149 235.4337)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="346.15" y="336.92" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -125.8891 235.8386)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="346.16" y="336.88" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -125.9241 236.0614)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="346.17" y="336.84" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -125.9854 236.4087)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="346.17" y="336.8" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -125.9687 236.3895)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="346.18" y="336.76" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -126.0901 237.0223)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="346.19" y="336.72" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -126.0728 237.0007)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="346.2" y="336.68" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -126.1336 237.3499)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="346.21" y="336.65" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -126.1709 237.588)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="346.22" y="336.61" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -126.2443 237.9995)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="346.23" y="336.57" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -126.3036 238.3457)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="346.23" y="336.53" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -126.3371 238.5684)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="346.24" y="336.49" transform="matrix(0.844 -0.5364 0.5364 0.844 -126.4047 238.9574)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="346.25" y="336.45" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -126.5217 239.5889)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="346.26" y="336.41" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -126.4965 239.5288)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="346.27" y="336.38" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -126.6077 240.1361)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="346.28" y="336.34" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -126.6813 240.5624)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="346.28" y="336.3" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -126.7878 241.1541)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="346.29" y="336.26" transform="matrix(0.8409 -0.5412 0.5412 0.8409 -126.8526 241.5417)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="346.3" y="336.22" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -126.9654 242.1718)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="346.31" y="336.18" transform="matrix(0.8398 -0.543 0.543 0.8398 -127.0212 242.5183)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="346.32" y="336.14" transform="matrix(0.839 -0.5441 0.5441 0.839 -127.1275 243.1239)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="346.33" y="336.11" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -127.2384 243.7571)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="346.34" y="336.07" transform="matrix(0.8371 -0.547 0.547 0.8371 -127.4187 244.754)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="346.34" y="336.03" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -127.5273 245.388)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="346.35" y="335.99" transform="matrix(0.8352 -0.55 0.55 0.8352 -127.7067 246.4003)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="346.36" y="335.95" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -127.8054 246.9948)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="346.37" y="335.91" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -127.9857 248.0323)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="346.38" y="335.87" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -128.1561 249.0295)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="346.39" y="335.84" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -128.3314 250.0665)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="346.39" y="335.8" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -128.5382 251.2941)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="346.4" y="335.76" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -128.7785 252.7316)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="346.41" y="335.72" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -128.9896 254.0271)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="346.42" y="335.68" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -129.2535 255.6576)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="346.43" y="335.64" transform="matrix(0.8217 -0.57 0.57 0.8217 -129.5771 257.6866)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="346.44" y="335.6" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -129.8743 259.6083)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="346.44" y="335.56" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -130.2414 262.0337)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="346.45" y="335.53" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -130.5802 264.3556)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="346.46" y="335.49" transform="matrix(0.81 -0.5864 0.5864 0.81 -130.9898 267.2514)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="346.47" y="335.45" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -131.5009 271.0272)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="346.48" y="335.41" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -132.0082 275.0168)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="338.63" y="343.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.7721 227.91)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="338.64" y="343.23" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -128.7499 227.8678)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="338.65" y="343.19" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.7393 227.8727)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="338.65" y="343.15" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.7228 227.8542)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="338.66" y="343.11" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.7064 227.8356)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="338.67" y="343.07" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6898 227.817)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="338.68" y="343.03" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6734 227.7985)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="338.69" y="343" transform="matrix(0.8537 -0.5207 0.5207 0.8537 -128.7568 228.1871)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="338.7" y="342.96" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -128.788 228.3634)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="338.7" y="342.92" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -128.7757 228.3619)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="338.71" y="342.88" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -128.7592 228.3433)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="338.72" y="342.84" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -128.7427 228.3247)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="338.73" y="342.8" transform="matrix(0.8535 -0.521 0.521 0.8535 -128.7163 228.2653)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="338.74" y="342.76" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -128.7056 228.2702)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="338.75" y="342.72" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -128.699 228.2922)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="338.76" y="342.69" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.7816 228.6806)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="338.76" y="342.65" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.7651 228.6619)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="338.77" y="342.61" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -128.7393 228.6047)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="338.78" y="342.57" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -128.7166 228.5603)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="338.79" y="342.53" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -128.7673 228.8183)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="338.8" y="342.49" transform="matrix(0.8523 -0.523 0.523 0.8523 -128.8491 229.2063)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="338.81" y="342.45" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -128.8227 229.147)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="338.81" y="342.42" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -128.8062 229.1282)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="338.82" y="342.38" transform="matrix(0.8523 -0.523 0.523 0.8523 -128.7954 229.1331)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="338.83" y="342.34" transform="matrix(0.8523 -0.523 0.523 0.8523 -128.7789 229.1144)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="338.84" y="342.3" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -128.7722 229.1363)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="338.85" y="342.26" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.8437 229.4832)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="338.86" y="342.22" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.8272 229.4644)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="338.87" y="342.18" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.8618 229.6588)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="338.87" y="342.15" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.8448 229.6378)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="338.88" y="342.11" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -128.9163 229.9866)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="338.89" y="342.07" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -128.9089 230.0062)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="338.9" y="342.03" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -128.8929 229.9895)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="338.91" y="341.99" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -128.8763 229.9707)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="338.92" y="341.95" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -128.9525 230.3407)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="338.92" y="341.91" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -128.9872 230.5379)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="338.93" y="341.88" transform="matrix(0.8505 -0.526 0.526 0.8505 -128.9797 230.5574)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="338.94" y="341.84" transform="matrix(0.8505 -0.526 0.526 0.8505 -128.9632 230.5385)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="338.95" y="341.8" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -129.033 230.8844)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="338.96" y="341.76" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -129.0164 230.8655)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="338.97" y="341.72" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -128.9999 230.8466)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="338.98" y="341.68" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -129.135 231.4712)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="338.98" y="341.64" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -129.1279 231.4926)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="338.99" y="341.61" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -129.096 231.4093)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="339" y="341.57" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -129.1743 231.7951)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="339.01" y="341.53" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -129.1572 231.774)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="339.02" y="341.49" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -129.197 231.9962)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="339.03" y="341.45" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -129.2708 232.3652)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="339.03" y="341.41" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -129.2635 232.3866)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="339.04" y="341.37" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -129.3406 232.7718)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="339.05" y="341.33" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -129.3701 232.9523)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="339.06" y="341.3" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -129.4411 233.3132)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="339.07" y="341.26" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -129.4244 233.294)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="339.08" y="341.22" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -129.5561 233.9216)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="339.09" y="341.18" transform="matrix(0.8464 -0.5326 0.5326 0.8464 -129.5296 233.8599)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="339.09" y="341.14" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -129.6147 234.2868)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="339.1" y="341.1" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -129.6525 234.507)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="339.11" y="341.06" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -129.7272 234.8909)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="339.12" y="341.03" transform="matrix(0.8448 -0.5351 0.5351 0.8448 -129.7868 235.2101)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="339.13" y="340.99" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -129.8242 235.4311)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="339.14" y="340.95" transform="matrix(0.844 -0.5363 0.5363 0.844 -129.8983 235.8168)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="339.14" y="340.91" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -130.0168 236.403)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="339.15" y="340.87" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -130.0054 236.4078)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="339.16" y="340.83" transform="matrix(0.8425 -0.5387 0.5387 0.8425 -130.1409 237.075)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="339.17" y="340.79" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -130.2074 237.4334)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="339.18" y="340.76" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -130.3237 238.0204)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="339.19" y="340.72" transform="matrix(0.8409 -0.5412 0.5412 0.8409 -130.3949 238.4048)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="339.2" y="340.68" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -130.5181 239.0302)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="339.2" y="340.64" transform="matrix(0.8398 -0.543 0.543 0.8398 -130.5797 239.3737)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="339.21" y="340.6" transform="matrix(0.839 -0.5441 0.5441 0.839 -130.7014 239.9995)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="339.22" y="340.56" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -130.8175 240.6032)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="339.23" y="340.52" transform="matrix(0.8371 -0.547 0.547 0.8371 -131.0141 241.5926)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="339.24" y="340.49" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -131.1332 242.2218)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="339.25" y="340.45" transform="matrix(0.8352 -0.55 0.55 0.8352 -131.3344 243.2514)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="339.25" y="340.41" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -131.4378 243.8164)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="339.26" y="340.37" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -131.635 244.8462)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="339.27" y="340.33" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -131.8218 245.836)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="339.28" y="340.29" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -132.0142 246.8654)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="339.29" y="340.25" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -132.2411 248.0841)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="339.3" y="340.21" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -132.5049 249.5111)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="339.3" y="340.18" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -132.7248 250.7319)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="339.31" y="340.14" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -133.0277 252.4162)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="339.32" y="340.1" transform="matrix(0.8217 -0.57 0.57 0.8217 -133.3844 254.431)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="339.33" y="340.06" transform="matrix(0.8193 -0.5734 0.5734 0.8193 -133.7201 256.3787)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="339.34" y="340.02" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -134.0568 258.3812)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="339.35" y="339.98" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -134.4969 261.0542)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="339.35" y="339.94" transform="matrix(0.81 -0.5864 0.5864 0.81 -134.9539 263.9306)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="339.36" y="339.91" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -135.5269 267.6819)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="339.37" y="339.87" transform="matrix(0.8 -0.6 0.6 0.8 -136.1354 271.8946)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="331.51" y="347.6" transform="matrix(0.8542 -0.52 0.52 0.8542 -132.0643 224.839)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="331.52" y="347.56" transform="matrix(0.8542 -0.52 0.52 0.8542 -132.0479 224.8203)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="331.52" y="347.52" transform="matrix(0.8542 -0.52 0.52 0.8542 -132.0315 224.8017)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="331.53" y="347.48" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -132.0089 224.7598)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="331.54" y="347.45" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.9986 224.7646)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="331.55" y="347.41" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.9821 224.7461)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="331.56" y="347.37" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.9657 224.7274)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="331.57" y="347.33" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.9492 224.7088)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="331.57" y="347.29" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -132.0901 225.2895)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="331.58" y="347.25" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -132.0837 225.3092)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="331.59" y="347.21" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -132.0672 225.2906)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="331.6" y="347.17" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -132.0508 225.2719)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="331.61" y="347.14" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -132.0282 225.2299)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="331.62" y="347.1" transform="matrix(0.8535 -0.521 0.521 0.8535 -132.0007 225.1689)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="331.63" y="347.06" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -132.0542 225.4179)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="331.63" y="347.02" transform="matrix(0.853 -0.5219 0.5219 0.853 -132.0904 225.601)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="331.64" y="346.98" transform="matrix(0.853 -0.5219 0.5219 0.853 -132.0738 225.5823)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="331.65" y="346.94" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -132.0474 225.5253)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="331.66" y="346.9" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -132.0303 225.5046)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="331.67" y="346.87" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -132.0854 225.7605)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="331.68" y="346.83" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -132.0628 225.7184)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="331.68" y="346.79" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -132.1406 226.0627)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="331.69" y="346.75" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -132.1236 226.0419)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="331.7" y="346.71" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -132.1076 226.0252)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="331.71" y="346.67" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -132.0916 226.0086)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="331.72" y="346.63" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -132.0911 226.0516)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="331.73" y="346.6" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -132.1689 226.3974)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="331.74" y="346.56" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -132.1519 226.3766)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="331.74" y="346.52" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -132.1899 226.5693)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="331.75" y="346.48" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -132.1734 226.5506)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="331.76" y="346.44" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -132.2501 226.8942)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="331.77" y="346.4" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -132.2438 226.9156)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="331.78" y="346.36" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -132.2272 226.8968)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="331.79" y="346.33" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -132.2112 226.8801)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="331.79" y="346.29" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -132.2972 227.2614)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="331.8" y="346.25" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -132.3307 227.4382)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="331.81" y="346.21" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.3184 227.4359)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="331.82" y="346.17" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.3078 227.4406)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="331.83" y="346.13" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -132.3829 227.7816)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="331.84" y="346.09" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -132.3668 227.7647)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="331.85" y="346.06" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -132.3502 227.7458)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="331.85" y="346.02" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -132.4955 228.3651)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="331.86" y="345.98" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -132.4895 228.3884)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="331.87" y="345.94" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -132.4622 228.3273)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="331.88" y="345.9" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -132.5474 228.7119)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="331.89" y="345.86" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -132.5297 228.6887)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="331.9" y="345.82" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -132.5674 228.8853)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="331.9" y="345.78" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -132.6413 229.2274)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="331.91" y="345.75" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -132.6347 229.2485)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="331.92" y="345.71" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -132.7242 229.6542)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="331.93" y="345.67" transform="matrix(0.8474 -0.5309 0.5309 0.8474 -132.7668 229.8732)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="331.94" y="345.63" transform="matrix(0.847 -0.5315 0.5315 0.847 -132.8398 230.2148)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="331.95" y="345.59" transform="matrix(0.847 -0.5315 0.5315 0.847 -132.8226 230.1937)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="331.96" y="345.55" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -132.9586 230.7922)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="331.96" y="345.51" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -132.9418 230.773)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="331.97" y="345.48" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -133.0236 231.1541)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="331.98" y="345.44" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -133.0656 231.3744)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="331.99" y="345.4" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -133.1468 231.7554)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="332" y="345.36" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -133.2178 232.096)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="332.01" y="345.32" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -133.2536 232.2932)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="332.01" y="345.28" transform="matrix(0.844 -0.5363 0.5363 0.844 -133.3336 232.6736)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="332.02" y="345.24" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -133.4713 233.2948)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="332.03" y="345.21" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -133.4448 233.2354)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="332.04" y="345.17" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -133.5913 233.8973)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="332.05" y="345.13" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -133.67 234.2789)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="332.06" y="345.09" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -133.7897 234.8349)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="332.07" y="345.05" transform="matrix(0.841 -0.5411 0.5411 0.841 -133.8665 235.2119)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="332.07" y="345.01" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -134.001 235.8364)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="332.08" y="344.97" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -134.0735 236.1995)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="332.09" y="344.94" transform="matrix(0.839 -0.5441 0.5441 0.839 -134.2061 236.8225)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="332.1" y="344.9" transform="matrix(0.8383 -0.5453 0.5453 0.8383 -134.3378 237.446)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="332.11" y="344.86" transform="matrix(0.8371 -0.547 0.547 0.8371 -134.5443 238.4009)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="332.12" y="344.82" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -134.6743 239.0272)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="332.12" y="344.78" transform="matrix(0.8352 -0.55 0.55 0.8352 -134.8922 240.0489)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="332.13" y="344.74" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -135.005 240.6096)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="332.14" y="344.7" transform="matrix(0.8333 -0.5529 0.5529 0.8333 -135.2135 241.6065)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="332.15" y="344.67" transform="matrix(0.8321 -0.5546 0.5546 0.8321 -135.4161 242.5865)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="332.16" y="344.63" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -135.6257 243.6101)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="332.17" y="344.59" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -135.8779 244.8447)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="332.17" y="344.55" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -136.1649 246.2612)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="332.18" y="344.51" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -136.4048 247.4729)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="332.19" y="344.47" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -136.7348 249.1428)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="332.2" y="344.43" transform="matrix(0.8217 -0.57 0.57 0.8217 -137.1247 251.145)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="332.21" y="344.39" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -137.4337 252.779)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="332.22" y="344.36" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -137.8609 255.065)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="332.22" y="344.32" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -138.34 257.6948)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="332.23" y="344.28" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -138.9225 260.9927)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="332.24" y="344.24" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -139.4833 264.3057)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="332.25" y="344.2" transform="matrix(0.8003 -0.5995 0.5995 0.8003 -140.1161 268.2139)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="324.49" y="351.9" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.3243 221.8154)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="324.5" y="351.86" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.3079 221.7969)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="324.5" y="351.82" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.2914 221.7783)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="324.51" y="351.78" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.275 221.7596)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="324.52" y="351.75" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.2585 221.7411)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="324.53" y="351.71" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.2421 221.7225)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="324.54" y="351.67" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.2256 221.7039)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="324.55" y="351.63" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.2092 221.6854)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="324.55" y="351.59" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -135.3702 222.2992)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="324.56" y="351.55" transform="matrix(0.8535 -0.521 0.521 0.8535 -135.3354 222.2154)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="324.57" y="351.51" transform="matrix(0.8535 -0.521 0.521 0.8535 -135.3195 222.1987)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="324.58" y="351.48" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -135.3142 222.2201)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="324.59" y="351.44" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -135.3043 222.2247)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="324.6" y="351.4" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -135.2878 222.2061)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="324.61" y="351.36" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -135.3161 222.3476)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="324.61" y="351.32" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -135.3555 222.5291)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="324.62" y="351.28" transform="matrix(0.853 -0.5219 0.5219 0.853 -135.3502 222.5505)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="324.63" y="351.24" transform="matrix(0.853 -0.5219 0.5219 0.853 -135.3336 222.5318)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="324.64" y="351.2" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -135.306 222.4731)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="324.65" y="351.17" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -135.3477 222.6635)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="324.66" y="351.13" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -135.3313 222.6448)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="324.66" y="351.09" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.437 223.0662)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="324.67" y="351.05" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.4205 223.0475)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="324.68" y="351.01" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.3994 223.012)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="324.69" y="350.97" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.3828 222.9933)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="324.7" y="350.93" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.3658 222.9727)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="324.71" y="350.9" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -135.4604 223.3555)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="324.71" y="350.86" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -135.4369 223.3116)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="324.72" y="350.82" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -135.4852 223.5278)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="324.73" y="350.78" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -135.4687 223.509)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="324.74" y="350.74" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.5621 223.8897)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="324.75" y="350.7" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.5456 223.8709)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="324.76" y="350.66" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.5289 223.852)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="324.77" y="350.63" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.5124 223.8332)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="324.77" y="350.59" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -135.6117 224.2368)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="324.78" y="350.55" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -135.6418 224.3886)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="324.79" y="350.51" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -135.6252 224.3697)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="324.8" y="350.47" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -135.6086 224.3509)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="324.81" y="350.43" transform="matrix(0.85 -0.5267 0.5267 0.85 -135.7117 224.7708)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="324.82" y="350.39" transform="matrix(0.85 -0.5267 0.5267 0.85 -135.6951 224.7518)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="324.82" y="350.36" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -135.6681 224.6949)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="324.83" y="350.32" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -135.8224 225.3055)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="324.84" y="350.28" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -135.8063 225.2884)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="324.85" y="350.24" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -135.7833 225.246)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="324.86" y="350.2" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -135.8744 225.6252)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="324.87" y="350.16" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -135.8642 225.6298)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="324.88" y="350.12" transform="matrix(0.8486 -0.529 0.529 0.8486 -135.911 225.8462)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="324.88" y="350.09" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -136.0013 226.2253)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="324.89" y="350.05" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -135.9734 226.1646)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="324.9" y="350.01" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -136.0638 226.5452)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="324.91" y="349.97" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -136.1141 226.7767)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="324.92" y="349.93" transform="matrix(0.847 -0.5316 0.5316 0.847 -136.2038 227.1571)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="324.93" y="349.89" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -136.1765 227.0983)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="324.93" y="349.85" transform="matrix(0.8466 -0.5323 0.5323 0.8466 -136.2755 227.5147)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="324.94" y="349.82" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -136.3113 227.6942)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="324.95" y="349.78" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -136.3889 228.0325)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="324.96" y="349.74" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -136.4349 228.2511)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="324.97" y="349.7" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -136.5265 228.6448)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="324.98" y="349.66" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -136.5102 228.6274)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="324.99" y="349.62" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -136.6487 229.2018)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="324.99" y="349.58" transform="matrix(0.844 -0.5363 0.5363 0.844 -136.735 229.5791)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="325" y="349.54" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -136.8829 230.1955)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="325.01" y="349.51" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -136.8717 230.1982)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="325.02" y="349.47" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -137.009 230.7774)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="325.03" y="349.43" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -137.0875 231.1298)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="325.04" y="349.39" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -137.2331 231.7471)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="325.04" y="349.35" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -137.3167 232.1232)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="325.05" y="349.31" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -137.4609 232.7409)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="325.06" y="349.27" transform="matrix(0.8397 -0.543 0.543 0.8397 -137.5433 233.1164)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="325.07" y="349.24" transform="matrix(0.839 -0.5441 0.5441 0.839 -137.6762 233.6948)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="325.08" y="349.2" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -137.812 234.289)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="325.09" y="349.16" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -138.0508 235.3044)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="325.1" y="349.12" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -138.1803 235.8825)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="325.1" y="349.08" transform="matrix(0.8351 -0.55 0.55 0.8351 -138.4153 236.8983)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="325.11" y="349.04" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -138.5369 237.4527)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="325.12" y="349" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -138.7676 238.4668)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="325.13" y="348.97" transform="matrix(0.832 -0.5548 0.5548 0.832 -138.9958 239.4809)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="325.14" y="348.93" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -139.2127 240.4575)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="325.15" y="348.89" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -139.4877 241.6953)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="325.15" y="348.85" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -139.7887 243.062)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="325.16" y="348.81" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -140.0571 244.3039)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="325.17" y="348.77" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -140.4058 245.9246)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="325.18" y="348.73" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -140.8272 247.9086)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="325.19" y="348.7" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -141.1631 249.5329)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="325.2" y="348.66" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -141.6225 251.7787)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="325.2" y="348.62" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -142.2023 254.6776)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="325.21" y="348.58" transform="matrix(0.8099 -0.5865 0.5865 0.8099 -142.7123 257.3162)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="325.22" y="348.54" transform="matrix(0.8057 -0.5923 0.5923 0.8057 -143.3349 260.6351)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="325.23" y="348.5" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -144.1026 264.8998)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="317.35" y="356.21" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.606 218.7305)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="317.35" y="356.17" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.5896 218.7119)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="317.36" y="356.13" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.573 218.6933)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="317.37" y="356.09" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.5566 218.6748)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="317.38" y="356.05" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.5401 218.6562)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="317.39" y="356.02" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -138.5168 218.6146)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="317.4" y="355.98" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -138.5004 218.596)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="317.4" y="355.94" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.4908 218.6004)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="317.41" y="355.9" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -138.6619 219.209)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="317.42" y="355.86" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -138.6454 219.1904)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="317.43" y="355.82" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.6176 219.1338)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="317.44" y="355.78" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.6007 219.1134)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="317.45" y="355.75" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -138.5961 219.1345)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="317.46" y="355.71" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -138.5796 219.1159)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="317.46" y="355.67" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -138.6036 219.2331)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="317.47" y="355.63" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -138.6462 219.4129)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="317.48" y="355.59" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -138.6297 219.3942)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="317.49" y="355.55" transform="matrix(0.853 -0.5219 0.5219 0.853 -138.6318 219.4382)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="317.5" y="355.51" transform="matrix(0.853 -0.5219 0.5219 0.853 -138.6153 219.4196)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="317.51" y="355.48" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -138.6559 219.5934)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="317.51" y="355.44" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -138.6389 219.573)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="317.52" y="355.4" transform="matrix(0.8523 -0.523 0.523 0.8523 -138.74 219.9511)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="317.53" y="355.36" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -138.7352 219.972)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="317.54" y="355.32" transform="matrix(0.8523 -0.523 0.523 0.8523 -138.7119 219.9302)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="317.55" y="355.28" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -138.6836 219.8718)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="317.56" y="355.24" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -138.6671 219.8531)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="317.57" y="355.2" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -138.7676 220.2307)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="317.57" y="355.17" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -138.7628 220.2516)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="317.58" y="355.13" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -138.8026 220.4243)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="317.59" y="355.09" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -138.7929 220.4287)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="317.6" y="355.05" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -138.8927 220.8061)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="317.61" y="355.01" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.8688 220.7623)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="317.62" y="354.97" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.8411 220.7057)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="317.62" y="354.93" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.8357 220.7247)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="317.63" y="354.9" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -138.9355 221.1034)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="317.64" y="354.86" transform="matrix(0.8505 -0.526 0.526 0.8505 -138.9872 221.3183)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="317.65" y="354.82" transform="matrix(0.8505 -0.526 0.526 0.8505 -138.9701 221.2976)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="317.66" y="354.78" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -138.942 221.2392)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="317.67" y="354.74" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -139.0406 221.616)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="317.68" y="354.7" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -139.0287 221.6133)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="317.68" y="354.66" transform="matrix(0.85 -0.5267 0.5267 0.85 -139.0188 221.6176)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="317.69" y="354.63" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -139.1728 222.1872)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="317.7" y="354.59" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -139.1562 222.1683)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="317.71" y="354.55" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -139.1396 222.1493)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="317.72" y="354.51" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -139.2375 222.5271)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="317.73" y="354.47" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -139.2204 222.5064)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="317.73" y="354.43" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -139.2643 222.6975)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="317.74" y="354.39" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -139.361 223.0733)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="317.75" y="354.36" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -139.3443 223.0543)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="317.76" y="354.32" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -139.4293 223.3904)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="317.77" y="354.28" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -139.4796 223.6055)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="317.78" y="354.24" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -139.5753 223.9808)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="317.79" y="354.2" transform="matrix(0.847 -0.5316 0.5316 0.847 -139.5697 224.0011)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="317.79" y="354.16" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -139.7203 224.5719)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="317.8" y="354.12" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -139.7036 224.5527)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="317.81" y="354.08" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -139.798 224.9274)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="317.82" y="354.05" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -139.8478 225.144)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="317.83" y="354.01" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -139.9306 225.4793)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="317.84" y="353.97" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -140.024 225.8535)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="317.84" y="353.93" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -140.0843 226.1104)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="317.85" y="353.89" transform="matrix(0.844 -0.5364 0.5364 0.844 -140.1661 226.4451)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="317.86" y="353.85" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -140.3171 227.0309)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="317.87" y="353.81" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -140.3007 227.0132)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="317.88" y="353.78" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -140.4471 227.5857)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="317.89" y="353.74" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -140.5382 227.9591)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="317.9" y="353.7" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -140.6941 228.5714)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="317.9" y="353.66" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -140.7836 228.9424)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="317.91" y="353.62" transform="matrix(0.8403 -0.5422 0.5422 0.8403 -140.9215 229.4936)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="317.92" y="353.58" transform="matrix(0.8397 -0.543 0.543 0.8397 -141.0214 229.9068)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="317.93" y="353.54" transform="matrix(0.839 -0.5441 0.5441 0.839 -141.174 230.5181)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="317.94" y="353.51" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -141.3157 231.0924)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="317.95" y="353.47" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -141.5707 232.0978)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="317.95" y="353.43" transform="matrix(0.8364 -0.5481 0.5481 0.8364 -141.7046 232.6504)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="317.96" y="353.39" transform="matrix(0.8352 -0.55 0.55 0.8352 -141.9549 233.6528)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="317.97" y="353.35" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -142.1032 234.2699)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="317.98" y="353.31" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -142.3406 235.237)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="317.99" y="353.27" transform="matrix(0.832 -0.5548 0.5548 0.832 -142.5856 236.2431)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="318" y="353.24" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -142.812 237.1854)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="318" y="353.2" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -143.1143 238.4403)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="318.01" y="353.16" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -143.4377 239.7967)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="318.02" y="353.12" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -143.7266 241.0292)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="318.03" y="353.08" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -144.0928 242.5989)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="318.04" y="353.04" transform="matrix(0.8216 -0.57 0.57 0.8216 -144.5626 244.6343)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="318.05" y="353" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -144.9189 246.2192)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="318.05" y="352.97" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -145.4157 248.4504)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="318.06" y="352.93" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -145.9855 251.0654)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="318.07" y="352.89" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -146.6839 254.3578)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="318.08" y="352.85" transform="matrix(0.8053 -0.5928 0.5928 0.8053 -147.3386 257.5576)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="318.09" y="352.81" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -148.1177 261.5072)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="310.26" y="360.54" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.8915 215.676)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="310.27" y="360.5" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -141.8677 215.6346)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="310.27" y="360.46" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.8586 215.6389)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="310.28" y="360.42" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.8421 215.6203)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="310.29" y="360.38" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.8257 215.6016)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="310.3" y="360.35" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.8092 215.5831)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="310.31" y="360.31" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.7928 215.5645)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="310.32" y="360.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.7764 215.546)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="310.32" y="360.23" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.9575 216.1494)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="310.33" y="360.19" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -141.9338 216.1078)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="310.34" y="360.15" transform="matrix(0.8535 -0.521 0.521 0.8535 -141.9048 216.0498)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="310.35" y="360.11" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -141.9008 216.0706)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="310.36" y="360.08" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -141.8844 216.052)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="310.37" y="360.04" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.8752 216.0562)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="310.38" y="360" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -141.9709 216.392)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="310.38" y="359.96" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -141.9544 216.3732)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="310.39" y="359.92" transform="matrix(0.853 -0.5219 0.5219 0.853 -141.9503 216.3939)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="310.4" y="359.88" transform="matrix(0.853 -0.5219 0.5219 0.853 -141.9338 216.3753)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="310.41" y="359.84" transform="matrix(0.853 -0.5218 0.5218 0.853 -141.9101 216.3338)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="310.42" y="359.81" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -141.9533 216.5042)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="310.43" y="359.77" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -141.9368 216.4855)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="310.43" y="359.73" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -142.0443 216.8603)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="310.44" y="359.69" transform="matrix(0.8523 -0.523 0.523 0.8523 -142.0402 216.881)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="310.45" y="359.65" transform="matrix(0.8523 -0.523 0.523 0.8523 -142.0184 216.8458)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="310.46" y="359.61" transform="matrix(0.8523 -0.523 0.523 0.8523 -142.0025 216.8287)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="310.47" y="359.57" transform="matrix(0.8523 -0.523 0.523 0.8523 -141.9854 216.8084)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="310.48" y="359.54" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -142.0923 217.1827)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="310.49" y="359.5" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -142.0809 217.1803)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="310.49" y="359.46" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -142.1239 217.3515)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="310.5" y="359.42" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -142.1073 217.3327)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="310.51" y="359.38" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -142.2135 217.7069)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="310.52" y="359.34" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -142.1974 217.6896)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="310.53" y="359.3" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -142.1681 217.63)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="310.54" y="359.26" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -142.1638 217.6504)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="310.54" y="359.23" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -142.2766 218.047)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="310.55" y="359.19" transform="matrix(0.8505 -0.526 0.526 0.8505 -142.3244 218.2354)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="310.56" y="359.15" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -142.2952 218.1756)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="310.57" y="359.11" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -142.2791 218.1583)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="310.58" y="359.07" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -142.384 218.5318)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="310.59" y="359.03" transform="matrix(0.85 -0.5267 0.5267 0.85 -142.3796 218.5521)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="310.6" y="358.99" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -142.3509 218.494)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="310.6" y="358.96" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -142.5265 219.098)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="310.61" y="358.92" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -142.5104 219.0807)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="310.62" y="358.88" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -142.4857 219.0354)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="310.63" y="358.84" transform="matrix(0.849 -0.5284 0.5284 0.849 -142.578 219.3706)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="310.64" y="358.8" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -142.5729 219.3892)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="310.65" y="358.76" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -142.6276 219.6033)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="310.65" y="358.72" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -142.738 219.9993)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="310.66" y="358.69" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -142.7213 219.9802)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="310.67" y="358.65" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -142.8121 220.3133)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="310.68" y="358.61" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -142.8585 220.5018)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="310.69" y="358.57" transform="matrix(0.847 -0.5316 0.5316 0.847 -142.9729 220.9147)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="310.7" y="358.53" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -142.9438 220.8549)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="310.71" y="358.49" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -143.1163 221.4616)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="310.71" y="358.45" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -143.0995 221.4422)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="310.72" y="358.42" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -143.2004 221.8139)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="310.73" y="358.38" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -143.2422 221.9895)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="310.74" y="358.34" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -143.3425 222.3611)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="310.75" y="358.3" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -143.447 222.7478)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="310.76" y="358.26" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -143.4997 222.9616)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="310.76" y="358.22" transform="matrix(0.844 -0.5364 0.5364 0.844 -143.5947 223.3186)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="310.77" y="358.18" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -143.756 223.9014)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="310.78" y="358.15" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -143.7461 223.9056)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="310.79" y="358.11" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -143.9021 224.4735)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="310.8" y="358.07" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -143.9931 224.8216)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="310.81" y="358.03" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -144.1588 225.4272)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="310.81" y="357.99" transform="matrix(0.841 -0.5411 0.5411 0.841 -144.2443 225.7597)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="310.82" y="357.95" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -144.4199 226.4047)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="310.83" y="357.91" transform="matrix(0.8397 -0.543 0.543 0.8397 -144.5151 226.774)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="310.84" y="357.87" transform="matrix(0.839 -0.5441 0.5441 0.839 -144.6604 227.3192)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="310.85" y="357.84" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -144.823 227.9277)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="310.86" y="357.8" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -145.0948 228.9252)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="310.87" y="357.76" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -145.2442 229.496)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="310.87" y="357.72" transform="matrix(0.8352 -0.55 0.55 0.8352 -145.5122 230.494)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="310.88" y="357.68" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -145.6637 231.0801)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="310.89" y="357.64" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -145.9171 232.0397)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="310.9" y="357.6" transform="matrix(0.832 -0.5548 0.5548 0.832 -146.1788 233.038)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="310.91" y="357.57" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -146.4276 233.9977)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="310.92" y="357.53" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -146.744 235.2184)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="310.92" y="357.49" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -147.09 236.5645)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="310.93" y="357.45" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -147.406 237.8127)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="310.94" y="357.41" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -147.7853 239.3206)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="310.95" y="357.37" transform="matrix(0.8217 -0.57 0.57 0.8217 -148.2889 241.3408)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="310.96" y="357.33" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -148.6779 242.9395)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="310.97" y="357.3" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -149.3044 245.5351)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="310.97" y="357.26" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -149.8866 248.0106)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="310.98" y="357.22" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -150.5715 250.9926)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="310.99" y="357.18" transform="matrix(0.8057 -0.5923 0.5923 0.8057 -151.2158 253.8855)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="311" y="357.14" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -152.125 258.0962)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="303.18" y="364.76" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.117 212.609)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="303.18" y="364.72" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.1005 212.5904)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="303.19" y="364.68" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -145.0764 212.5493)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="303.2" y="364.64" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.0676 212.5533)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="303.21" y="364.6" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.0511 212.5347)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="303.22" y="364.56" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.0347 212.5161)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="303.23" y="364.52" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.0182 212.4975)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="303.24" y="364.49" transform="matrix(0.8542 -0.52 0.52 0.8542 -145.0018 212.479)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="303.24" y="364.45" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -145.193 213.0771)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="303.25" y="364.41" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -145.1764 213.0585)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="303.26" y="364.37" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -145.16 213.0398)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="303.27" y="364.33" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -145.1359 212.9986)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="303.28" y="364.29" transform="matrix(0.8535 -0.521 0.521 0.8535 -145.1064 212.9409)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="303.29" y="364.25" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -145.1106 212.984)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="303.29" y="364.22" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -145.1596 213.1607)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="303.3" y="364.18" transform="matrix(0.853 -0.5219 0.5219 0.853 -145.2086 213.337)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="303.31" y="364.14" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -145.1785 213.2779)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="303.32" y="364.1" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -145.1625 213.2607)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="303.33" y="364.06" transform="matrix(0.853 -0.5219 0.5219 0.853 -145.159 213.2811)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="303.34" y="364.02" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -145.2107 213.4663)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="303.35" y="363.98" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -145.3115 213.7988)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="303.35" y="363.95" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -145.295 213.78)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="303.36" y="363.91" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -145.2785 213.7613)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="303.37" y="363.87" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -145.2615 213.7412)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="303.38" y="363.83" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -145.266 213.7856)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="303.39" y="363.79" transform="matrix(0.8523 -0.523 0.523 0.8523 -145.2365 213.7279)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="303.4" y="363.75" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -145.3497 214.0989)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="303.4" y="363.71" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -145.3336 214.0816)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="303.41" y="363.68" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -145.3845 214.266)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="303.42" y="363.64" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -145.368 214.2473)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="303.43" y="363.6" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.4805 214.6181)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="303.44" y="363.56" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.464 214.5993)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="303.45" y="363.52" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.4473 214.5804)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="303.46" y="363.48" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.4308 214.5616)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="303.46" y="363.44" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -145.53 214.8931)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="303.47" y="363.4" transform="matrix(0.8505 -0.526 0.526 0.8505 -145.6014 215.1413)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="303.48" y="363.37" transform="matrix(0.8505 -0.526 0.526 0.8505 -145.5853 215.1239)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="303.49" y="363.33" transform="matrix(0.8505 -0.526 0.526 0.8505 -145.5683 215.1036)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="303.5" y="363.29" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -145.6668 215.4349)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="303.51" y="363.25" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -145.6497 215.4145)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="303.51" y="363.21" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -145.6335 215.397)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="303.52" y="363.17" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -145.8314 216.0333)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="303.53" y="363.13" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -145.8026 215.9769)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="303.54" y="363.1" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -145.7859 215.9579)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="303.55" y="363.06" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -145.8961 216.3276)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="303.56" y="363.02" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -145.8725 216.2871)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="303.57" y="362.98" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -145.9301 216.4962)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="303.57" y="362.94" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -146.04 216.8671)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="303.58" y="362.9" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -146.0298 216.8681)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="303.59" y="362.86" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -146.1393 217.2386)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="303.6" y="362.83" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -146.1845 217.4112)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="303.61" y="362.79" transform="matrix(0.847 -0.5315 0.5315 0.847 -146.2928 217.7802)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="303.62" y="362.75" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -146.2687 217.738)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="303.62" y="362.71" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -146.4507 218.3379)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="303.63" y="362.67" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -146.434 218.3187)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="303.64" y="362.63" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -146.5411 218.687)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="303.65" y="362.59" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -146.5985 218.8999)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="303.66" y="362.56" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -146.6927 219.2294)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="303.67" y="362.52" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -146.7993 219.5988)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="303.68" y="362.48" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -146.8484 219.7877)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="303.68" y="362.44" transform="matrix(0.844 -0.5363 0.5363 0.844 -146.9534 220.1539)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="303.69" y="362.4" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -147.1202 220.7179)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="303.7" y="362.36" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -147.1149 220.7357)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="303.71" y="362.32" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -147.293 221.3389)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="303.72" y="362.28" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -147.3847 221.6674)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="303.73" y="362.25" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -147.5537 222.2458)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="303.73" y="362.21" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -147.6636 222.6361)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="303.74" y="362.17" transform="matrix(0.8402 -0.5422 0.5422 0.8402 -147.8267 223.2001)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="303.75" y="362.13" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -147.9283 223.5663)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="303.76" y="362.09" transform="matrix(0.839 -0.5441 0.5441 0.839 -148.1018 224.1694)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="303.77" y="362.05" transform="matrix(0.8383 -0.5451 0.5451 0.8383 -148.2555 224.7106)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="303.78" y="362.01" transform="matrix(0.8371 -0.547 0.547 0.8371 -148.5443 225.7014)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="303.78" y="361.98" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -148.7145 226.3046)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="303.79" y="361.94" transform="matrix(0.8352 -0.55 0.55 0.8352 -148.988 227.2575)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="303.8" y="361.9" transform="matrix(0.8344 -0.5512 0.5512 0.8344 -149.1674 227.9001)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="303.81" y="361.86" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -149.4301 228.8293)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="303.82" y="361.82" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -149.6968 229.7799)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="303.83" y="361.78" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -149.9722 230.7689)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="303.84" y="361.74" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -150.2983 231.9432)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="303.84" y="361.71" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -150.6705 233.2926)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="303.85" y="361.67" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -150.9965 234.4927)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="303.86" y="361.63" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -151.4356 236.1153)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="303.87" y="361.59" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -151.9547 238.0556)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="303.88" y="361.55" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -152.3706 239.6438)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="303.89" y="361.51" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -152.9472 241.8663)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="303.89" y="361.47" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -153.6625 244.6763)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="303.9" y="361.44" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -154.4034 247.6644)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="303.91" y="361.4" transform="matrix(0.8058 -0.5922 0.5922 0.8058 -155.08 250.4732)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="303.92" y="361.36" transform="matrix(0.8003 -0.5995 0.5995 0.8003 -156.0588 254.6536)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="296.07" y="369.09" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.4049 209.5444)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="296.08" y="369.05" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -148.3805 209.5034)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="296.09" y="369.01" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.372 209.5073)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="296.09" y="368.97" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.3556 209.4886)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="296.1" y="368.93" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.3392 209.47)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="296.11" y="368.89" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.3227 209.4515)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="296.12" y="368.85" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.3063 209.4329)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="296.13" y="368.82" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2898 209.4144)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="296.14" y="368.78" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.4774 209.9684)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="296.14" y="368.74" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -148.4746 209.9886)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="296.15" y="368.7" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.4501 209.9475)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="296.16" y="368.66" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.4336 209.9289)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="296.17" y="368.62" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.4172 209.9103)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="296.18" y="368.58" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.3954 209.8767)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="296.19" y="368.55" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -148.461 210.0891)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="296.19" y="368.51" transform="matrix(0.853 -0.5219 0.5219 0.853 -148.5131 210.2639)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="296.2" y="368.47" transform="matrix(0.853 -0.5219 0.5219 0.853 -148.4966 210.2453)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="296.21" y="368.43" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -148.4664 210.1879)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="296.22" y="368.39" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -148.4499 210.1692)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="296.23" y="368.35" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -148.5186 210.3914)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="296.24" y="368.31" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -148.5022 210.3727)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="296.25" y="368.28" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -148.6086 210.7023)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="296.25" y="368.24" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -148.5921 210.6835)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="296.26" y="368.2" transform="matrix(0.8523 -0.523 0.523 0.8523 -148.5836 210.6873)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="296.27" y="368.16" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -148.5807 210.7073)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="296.28" y="368.12" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -148.5641 210.6885)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="296.29" y="368.08" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -148.6701 211.0176)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="296.3" y="368.04" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -148.6531 210.9976)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="296.3" y="368.01" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -148.7083 211.183)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="296.31" y="367.97" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -148.6918 211.1642)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="296.32" y="367.93" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.8107 211.5318)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="296.33" y="367.89" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.7946 211.5143)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="296.34" y="367.85" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.7775 211.4942)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="296.35" y="367.81" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.761 211.4753)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="296.36" y="367.77" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -148.8738 211.8265)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="296.36" y="367.73" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -148.9283 212.0113)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="296.37" y="367.7" transform="matrix(0.8505 -0.526 0.526 0.8505 -148.9252 212.031)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="296.38" y="367.66" transform="matrix(0.8505 -0.526 0.526 0.8505 -148.9086 212.0122)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="296.39" y="367.62" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -149.0129 212.3405)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="296.4" y="367.58" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -148.9962 212.3216)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="296.41" y="367.54" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -148.9801 212.304)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="296.42" y="367.5" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -149.175 212.8951)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="296.42" y="367.46" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -149.1722 212.916)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="296.43" y="367.43" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -149.1418 212.8571)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="296.44" y="367.39" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -149.2509 213.202)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="296.45" y="367.35" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -149.2343 213.1831)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="296.46" y="367.31" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -149.2962 213.3918)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="296.47" y="367.27" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -149.4066 213.7423)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="296.47" y="367.23" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -149.4032 213.7617)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="296.48" y="367.19" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -149.5185 214.1275)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="296.49" y="367.16" transform="matrix(0.8474 -0.5309 0.5309 0.8474 -149.5796 214.3358)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="296.5" y="367.12" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -149.6738 214.6415)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="296.51" y="367.08" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -149.6571 214.6224)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="296.52" y="367.04" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -149.8494 215.2171)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="296.52" y="367" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -149.8326 215.1979)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="296.53" y="366.96" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -149.9462 215.5631)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="296.54" y="366.92" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -150.0072 215.7741)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="296.55" y="366.89" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -150.1203 216.1392)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="296.56" y="366.85" transform="matrix(0.8448 -0.5351 0.5351 0.8448 -150.2121 216.4423)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="296.57" y="366.81" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -150.2729 216.654)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="296.58" y="366.77" transform="matrix(0.844 -0.5363 0.5363 0.844 -150.3847 217.0186)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="296.58" y="366.73" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -150.5607 217.5765)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="296.59" y="366.69" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -150.5565 217.5954)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="296.6" y="366.65" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -150.7444 218.1921)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="296.61" y="366.61" transform="matrix(0.8421 -0.5394 0.5394 0.8421 -150.8618 218.578)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="296.62" y="366.58" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -151.0284 219.1149)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="296.63" y="366.54" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -151.1374 219.4784)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="296.63" y="366.5" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -151.3226 220.0761)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="296.64" y="366.46" transform="matrix(0.8395 -0.5434 0.5434 0.8395 -151.4947 220.636)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="296.65" y="366.42" transform="matrix(0.839 -0.5441 0.5441 0.839 -151.602 220.9989)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="296.66" y="366.38" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -151.7774 221.5739)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="296.67" y="366.34" transform="matrix(0.8371 -0.547 0.547 0.8371 -152.0701 222.5171)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="296.68" y="366.31" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -152.2511 223.1168)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="296.69" y="366.27" transform="matrix(0.8352 -0.5499 0.5499 0.8352 -152.5402 224.0606)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="296.69" y="366.23" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -152.7191 224.6613)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="296.7" y="366.19" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -153.0091 225.6198)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="296.71" y="366.15" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -153.2923 226.5643)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="296.72" y="366.11" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -153.5854 227.5483)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="296.73" y="366.07" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -153.9305 228.7106)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="296.74" y="366.04" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -154.3328 230.0741)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="296.74" y="366" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -154.6718 231.2405)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="296.75" y="365.96" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -155.1383 232.8507)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="296.76" y="365.92" transform="matrix(0.8217 -0.57 0.57 0.8217 -155.6905 234.778)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="296.77" y="365.88" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -156.2046 236.604)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="296.78" y="365.84" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -156.7397 238.5337)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="296.79" y="365.8" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -157.5098 241.3501)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="296.79" y="365.77" transform="matrix(0.81 -0.5864 0.5864 0.81 -158.1834 243.8773)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="296.8" y="365.73" transform="matrix(0.8058 -0.5922 0.5922 0.8058 -159.0246 247.1048)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="296.81" y="365.69" transform="matrix(0.8003 -0.5995 0.5995 0.8003 -160.074 251.2565)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
			</g>
			<g>
				<path className="palma36" d="M405.02,346.35l-49.87-27.27l-6.74,4.1l49.87,27.27L405.02,346.35z M395.2,347.96l2.45-5.12l6.27,3.43
					L395.2,347.96z M356.38,327.02l5.18-3.15l-2.27,4.74L356.38,327.02z M368.65,326.99l-8.73,1.69l2.45-5.12L368.65,326.99z
					 M375.7,330.85l-8.73,1.69l2.45-5.12L375.7,330.85z M382.76,334.7l-8.73,1.69l2.45-5.12L382.76,334.7z M389.81,338.56
					l-8.73,1.69l2.45-5.12L389.81,338.56z M396.87,342.42l-8.73,1.69l2.45-5.12L396.87,342.42z M368.15,327.47l-5.18,3.15
					l-2.91-1.59L368.15,327.47z M363.43,330.88l5.18-3.15l-2.27,4.74L363.43,330.88z M375.21,331.33l-5.18,3.15l-2.91-1.59
					L375.21,331.33z M370.49,334.74l5.18-3.15l-2.27,4.74L370.49,334.74z M382.26,335.19l-5.18,3.15l-2.91-1.59L382.26,335.19z
					 M377.54,338.6l5.18-3.15l-2.27,4.74L377.54,338.6z M389.31,339.05l-5.18,3.15l-2.91-1.59L389.31,339.05z M384.6,342.45
					l5.18-3.15l-2.27,4.74L384.6,342.45z M396.37,342.9l-5.18,3.15l-2.91-1.59L396.37,342.9z M391.65,346.31l5.18-3.15l-2.27,4.74
					L391.65,346.31z M361.59,323.13l-8.73,1.69l2.45-5.12L361.59,323.13z M361.09,323.62l-5.18,3.15l-2.91-1.59L361.09,323.62z
					 M395.34,348.33l8.16-1.58l-5.22,3.18L395.34,348.33z M354.5,320.01l-2.27,4.74l-2.91-1.59L354.5,320.01z"/>
				<path className="palma34" d="M354.96,311.2l0.18,7.89l49.87,27.27l-0.18-7.89L354.96,311.2z M401.22,343.47l-3.29-8.26l6.27,3.43
					L401.22,343.47z M394.56,340.11l2.76-4.47l0.14,6.06L394.56,340.11z M362.65,322.67l-0.14-6.06l3.05,7.65L362.65,322.67z
					 M397.15,334.78l-2.98,4.83l-3.29-8.26L397.15,334.78z M390.09,330.93l-2.98,4.83l-3.29-8.26L390.09,330.93z M383.04,327.07
					l-2.98,4.83l-3.29-8.26L383.04,327.07z M375.98,323.21l-2.98,4.83l-3.29-8.26L375.98,323.21z M368.93,319.36l-2.98,4.83
					l-3.29-8.26L368.93,319.36z M369.1,320.21l0.14,6.06l-2.91-1.59L369.1,320.21z M369.71,326.53l-0.14-6.06l3.05,7.65
					L369.71,326.53z M376.16,324.07l0.14,6.06l-2.91-1.59L376.16,324.07z M376.76,330.38l-0.14-6.06l3.05,7.65L376.76,330.38z
					 M383.22,327.93l0.14,6.06l-2.91-1.59L383.22,327.93z M383.82,334.24l-0.14-6.06l3.05,7.65L383.82,334.24z M390.27,331.78
					l0.14,6.06l-2.91-1.59L390.27,331.78z M390.87,338.1l-0.14-6.06l3.05,7.65L390.87,338.1z M361.87,315.5l-2.98,4.83l-3.29-8.26
					L361.87,315.5z M362.05,316.35l0.14,6.06l-2.91-1.59L362.05,316.35z M397.93,341.95l-0.14-6.06l3.05,7.65L397.93,341.95z
					 M355.46,312.75l3.05,7.65l-2.91-1.59L355.46,312.75z M401.62,343.97l2.79-4.51l0.14,6.12L401.62,343.97z"/>
				<path className="palma125" d="M354.96,311.2l-6.74,4.1l49.87,27.27l6.74-4.1L354.96,311.2z M395.01,340.08l2.45-5.12l6.27,3.43
					L395.01,340.08z M388.1,336.58l8.08-1.56l-5.18,3.15L388.1,336.58z M356.2,319.14l5.18-3.15l-2.27,4.74L356.2,319.14z
					 M396.68,334.53l-8.73,1.69l2.45-5.12L396.68,334.53z M389.63,330.67l-8.73,1.69l2.45-5.12L389.63,330.67z M382.57,326.82
					l-8.73,1.69l2.45-5.12L382.57,326.82z M375.52,322.96l-8.73,1.69l2.45-5.12L375.52,322.96z M368.46,319.1l-8.73,1.69l2.45-5.12
					L368.46,319.1z M367.97,319.59l-5.18,3.15l-2.91-1.59L367.97,319.59z M363.25,323l5.18-3.15l-2.27,4.74L363.25,323z
					 M375.02,323.45l-5.18,3.15l-2.91-1.59L375.02,323.45z M370.31,326.85l5.18-3.15l-2.27,4.74L370.31,326.85z M382.08,327.3
					l-5.18,3.15l-2.91-1.59L382.08,327.3z M377.36,330.71l5.18-3.15l-2.27,4.74L377.36,330.71z M389.13,331.16l-5.18,3.15
					l-2.91-1.59L389.13,331.16z M384.42,334.57l5.18-3.15l-2.27,4.74L384.42,334.57z M361.41,315.25l-8.73,1.69l2.45-5.12
					L361.41,315.25z M360.91,315.73l-5.18,3.15l-2.91-1.59L360.91,315.73z M391.47,338.42l5.18-3.15l-2.27,4.74L391.47,338.42z
					 M354.32,312.13l-2.27,4.74l-2.91-1.59L354.32,312.13z M395.16,340.44l8.16-1.58l-5.22,3.18L395.16,340.44z"/>
				<path className="palma34" d="M348.23,315.3l0.18,7.89l49.87,27.27l-0.18-7.89L348.23,315.3z M394.48,347.57l-3.29-8.26l6.27,3.43
					L394.48,347.57z M387.82,344.22l2.76-4.47l0.14,6.06L387.82,344.22z M355.92,326.77l-0.14-6.06l3.05,7.65L355.92,326.77z
					 M390.41,338.89l-2.98,4.83l-3.29-8.26L390.41,338.89z M383.36,335.03l-2.98,4.83l-3.29-8.26L383.36,335.03z M376.3,331.17
					l-2.98,4.83l-3.29-8.26L376.3,331.17z M369.24,327.32l-2.98,4.83l-3.29-8.26L369.24,327.32z M362.19,323.46l-2.98,4.83
					l-3.29-8.26L362.19,323.46z M362.37,324.31l0.14,6.06l-2.91-1.59L362.37,324.31z M362.97,330.63l-0.14-6.06l3.05,7.65
					L362.97,330.63z M369.42,328.17l0.14,6.06l-2.91-1.59L369.42,328.17z M370.03,334.49l-0.14-6.06l3.05,7.65L370.03,334.49z
					 M376.48,332.03l0.14,6.06l-2.91-1.59L376.48,332.03z M377.08,338.34l-0.14-6.06l3.05,7.65L377.08,338.34z M383.53,335.89
					l0.14,6.06l-2.91-1.59L383.53,335.89z M384.14,342.2l-0.14-6.06l3.05,7.65L384.14,342.2z M355.13,319.6l-2.98,4.83l-3.29-8.26
					L355.13,319.6z M355.31,320.46l0.14,6.06l-2.91-1.59L355.31,320.46z M391.19,346.06l-0.14-6.06l3.05,7.65L391.19,346.06z
					 M348.72,316.85l3.05,7.65l-2.91-1.59L348.72,316.85z M394.88,348.07l2.79-4.51l0.14,6.12L394.88,348.07z"/>
			</g>
			<g>
				<polygon className="palma34" points="372.55,328.55 372.59,330.38 366.78,327.2 366.74,325.38 				"/>
				<polygon className="palma35" points="297.23,367.69 297.28,369.52 366.78,327.2 366.74,325.38 				"/>
				<polygon className="palma36" points="303.09,372.7 297.28,369.52 366.78,327.2 372.59,330.38 				"/>
				<path className="palma125" d="M297.23,367.69l5.81,3.18l69.58-42.37l-5.81-3.18L297.23,367.69z M371.29,328.21l-6.84-1l2.37-1.45
					L371.29,328.21z M365.52,331.72l-6.84-1l2.37-1.45L365.52,331.72z M361.43,329.05l2.37-1.45l2.09,3.89L361.43,329.05z
					 M359.76,335.24l-6.84-1l2.37-1.45L359.76,335.24z M355.67,332.56l2.37-1.45l2.09,3.89L355.67,332.56z M353.99,338.75l-6.84-1
					l2.37-1.45L353.99,338.75z M349.9,336.07l2.37-1.45l2.09,3.89L349.9,336.07z M348.22,342.26l-6.84-1l2.37-1.45L348.22,342.26z
					 M344.13,339.59l2.37-1.45l2.09,3.89L344.13,339.59z M342.46,345.77l-6.84-1l2.37-1.45L342.46,345.77z M338.37,343.1l2.37-1.45
					l2.09,3.89L338.37,343.1z M336.69,349.28l-6.84-1l2.37-1.45L336.69,349.28z M332.6,346.61l2.37-1.45l2.09,3.89L332.6,346.61z
					 M330.92,352.79l-6.84-1l2.37-1.45L330.92,352.79z M326.83,350.12l2.37-1.45l2.09,3.89L326.83,350.12z M325.16,356.3l-6.84-1
					l2.37-1.45L325.16,356.3z M321.07,353.63l2.37-1.45l2.09,3.89L321.07,353.63z M319.39,359.81l-6.84-1l2.37-1.45L319.39,359.81z
					 M315.3,357.14l2.37-1.45l2.09,3.89L315.3,357.14z M313.62,363.33l-6.84-1l2.37-1.45L313.62,363.33z M309.53,360.65l2.37-1.45
					l2.09,3.89L309.53,360.65z M307.86,366.84l-6.84-1l2.37-1.45L307.86,366.84z M303.77,364.16l2.37-1.45l2.09,3.89L303.77,364.16z
					 M308.29,367.23l-5.13,3.12l-2.26-4.2L308.29,367.23z M306.67,362.64l7.39,1.08l-5.13,3.12L306.67,362.64z M312.44,359.13
					l7.39,1.08l-5.13,3.12L312.44,359.13z M318.21,355.62l7.39,1.08l-5.13,3.12L318.21,355.62z M323.97,352.11l7.39,1.08l-5.13,3.12
					L323.97,352.11z M329.74,348.59l7.39,1.08l-5.13,3.12L329.74,348.59z M335.51,345.08l7.39,1.08l-5.13,3.12L335.51,345.08z
					 M341.27,341.57l7.39,1.08l-5.13,3.12L341.27,341.57z M347.04,338.06l7.39,1.08l-5.13,3.12L347.04,338.06z M352.81,334.55
					l7.39,1.08l-5.13,3.12L352.81,334.55z M358.57,331.04l7.39,1.08l-5.13,3.12L358.57,331.04z M364.34,327.53l7.39,1.08l-5.13,3.12
					L364.34,327.53z M300.38,366.23l2.09,3.89l-4.47-2.44L300.38,366.23z"/>
				<polygon className="palma35" points="303.05,370.87 303.09,372.7 372.59,330.38 372.55,328.55 				"/>
				<polygon className="palma34" points="303.05,370.87 303.09,372.7 297.28,369.52 297.23,367.69 				"/>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="306.37" y="374.38" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.6564 215.6718)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="306.38" y="374.34" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.6399 215.6532)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="306.38" y="374.3" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.6235 215.6347)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="306.39" y="374.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.6071 215.6161)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="306.4" y="374.23" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.5907 215.5974)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="306.41" y="374.19" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.5742 215.5789)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="306.42" y="374.15" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -149.5498 215.5374)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="306.43" y="374.11" transform="matrix(0.8542 -0.52 0.52 0.8542 -149.5413 215.5418)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="306.43" y="374.07" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -149.7334 216.1275)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="306.44" y="374.03" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -149.7249 216.1318)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="306.45" y="374" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -149.6947 216.0734)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="306.46" y="373.96" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -149.6919 216.0945)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="306.47" y="373.92" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -149.6755 216.0759)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="306.48" y="373.88" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -149.6591 216.0573)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="306.49" y="373.84" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -149.7576 216.3731)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="306.49" y="373.8" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -149.7406 216.3528)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="306.5" y="373.76" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -149.7246 216.3357)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="306.51" y="373.72" transform="matrix(0.853 -0.5218 0.5218 0.853 -149.7217 216.3568)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="306.52" y="373.69" transform="matrix(0.853 -0.5219 0.5219 0.853 -149.7131 216.3611)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="306.53" y="373.65" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -149.7627 216.5347)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="306.54" y="373.61" transform="matrix(0.8523 -0.523 0.523 0.8523 -149.8816 216.9115)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="306.54" y="373.57" transform="matrix(0.8523 -0.523 0.523 0.8523 -149.8651 216.8927)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="306.55" y="373.53" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -149.8621 216.9137)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="306.56" y="373.49" transform="matrix(0.8523 -0.523 0.523 0.8523 -149.832 216.8553)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="306.57" y="373.45" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -149.8076 216.8135)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="306.58" y="373.42" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -149.7911 216.7948)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="306.59" y="373.38" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -149.9105 217.174)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="306.6" y="373.34" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -149.8934 217.1537)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="306.6" y="373.3" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -149.9556 217.3662)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="306.61" y="373.26" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -149.9391 217.3474)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="306.62" y="373.22" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -150.0651 217.7482)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="306.63" y="373.18" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -150.048 217.7278)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="306.64" y="373.15" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -150.0106 217.6477)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="306.65" y="373.11" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -150.007 217.667)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="306.65" y="373.07" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -150.1251 218.0455)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="306.66" y="373.03" transform="matrix(0.8505 -0.526 0.526 0.8505 -150.1876 218.2604)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="306.67" y="372.99" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -150.1571 218.2004)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="306.68" y="372.95" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -150.1411 218.1831)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="306.69" y="372.91" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -150.257 218.5569)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="306.7" y="372.88" transform="matrix(0.85 -0.5267 0.5267 0.85 -150.2542 218.579)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="306.71" y="372.84" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -150.2297 218.5369)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="306.71" y="372.8" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -150.411 219.1068)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="306.72" y="372.76" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -150.4021 219.1112)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="306.73" y="372.72" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -150.3855 219.0922)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="306.74" y="372.68" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -150.4881 219.4289)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="306.75" y="372.64" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -150.4846 219.4495)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="306.76" y="372.61" transform="matrix(0.8486 -0.529 0.529 0.8486 -150.546 219.6641)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="306.76" y="372.57" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -150.6532 220.0169)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="306.77" y="372.53" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -150.6366 219.9978)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="306.78" y="372.49" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -150.738 220.334)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="306.79" y="372.45" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -150.7991 220.5494)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="306.8" y="372.41" transform="matrix(0.847 -0.5316 0.5316 0.847 -150.926 220.9645)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="306.81" y="372.37" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -150.8963 220.906)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="306.82" y="372.33" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -151.0871 221.5167)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="306.82" y="372.3" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -151.0699 221.4958)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="306.83" y="372.26" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -151.1831 221.8725)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="306.84" y="372.22" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -151.2307 222.0499)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="306.85" y="372.18" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -151.3429 222.4249)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="306.86" y="372.14" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -151.4673 222.839)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="306.87" y="372.1" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -151.5276 223.0565)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="306.87" y="372.06" transform="matrix(0.844 -0.5364 0.5364 0.844 -151.6258 223.3916)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="306.88" y="372.03" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -151.8047 223.9784)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="306.89" y="371.99" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -151.7884 223.9605)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="306.9" y="371.95" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -151.9622 224.5337)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="306.91" y="371.91" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -152.0714 224.9075)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="306.92" y="371.87" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -152.2565 225.5205)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="306.92" y="371.83" transform="matrix(0.841 -0.5411 0.5411 0.841 -152.3516 225.8531)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="306.93" y="371.79" transform="matrix(0.8402 -0.5422 0.5422 0.8402 -152.5358 226.4681)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="306.94" y="371.76" transform="matrix(0.8397 -0.543 0.543 0.8397 -152.648 226.8577)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="306.95" y="371.72" transform="matrix(0.839 -0.5441 0.5441 0.839 -152.8174 227.4308)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="306.96" y="371.68" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -152.9994 228.0467)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="306.97" y="371.64" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -153.3012 229.0522)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="306.98" y="371.6" transform="matrix(0.8364 -0.5481 0.5481 0.8364 -153.4613 229.6057)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="306.98" y="371.56" transform="matrix(0.8352 -0.55 0.55 0.8352 -153.7589 230.6102)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="306.99" y="371.52" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -153.9365 231.2282)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="307" y="371.49" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -154.2193 232.1973)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="307.01" y="371.45" transform="matrix(0.832 -0.5548 0.5548 0.832 -154.5115 233.2054)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="307.02" y="371.41" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -154.7821 234.1498)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="307.03" y="371.37" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -155.1429 235.4075)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="307.03" y="371.33" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -155.5295 236.767)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="307.04" y="371.29" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -155.876 238.0026)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="307.05" y="371.25" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -156.3146 239.575)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="307.06" y="371.21" transform="matrix(0.8216 -0.57 0.57 0.8216 -156.879 241.6176)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="307.07" y="371.18" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -157.3016 243.1816)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="307.08" y="371.14" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -158.0123 245.8301)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="307.08" y="371.1" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -158.6677 248.3319)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="307.09" y="371.06" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -159.4477 251.374)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="307.1" y="371.02" transform="matrix(0.8058 -0.5922 0.5922 0.8058 -160.1531 254.2039)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="307.11" y="370.98" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -161.208 258.5537)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="313.42" y="370.11" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.4078 218.7188)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="313.43" y="370.07" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.3914 218.7002)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="313.44" y="370.04" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.375 218.6815)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="313.45" y="370" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.3585 218.663)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="313.46" y="369.96" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.342 218.6444)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="313.47" y="369.92" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.3255 218.6259)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="313.47" y="369.88" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.3091 218.6073)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="313.48" y="369.84" transform="matrix(0.8542 -0.52 0.52 0.8542 -146.2927 218.5886)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="313.49" y="369.8" transform="matrix(0.8535 -0.521 0.521 0.8535 -146.4622 219.1393)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="313.5" y="369.77" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -146.4664 219.1839)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="313.51" y="369.73" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -146.4499 219.1653)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="313.52" y="369.69" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -146.4334 219.1467)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="313.53" y="369.65" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -146.4033 219.0863)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="313.53" y="369.61" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -146.3874 219.0693)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="313.54" y="369.57" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -146.384 219.0907)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="313.55" y="369.53" transform="matrix(0.853 -0.5219 0.5219 0.853 -146.4977 219.4725)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="313.56" y="369.49" transform="matrix(0.853 -0.5218 0.5218 0.853 -146.4737 219.4307)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="313.57" y="369.46" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -146.4442 219.3719)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="313.58" y="369.42" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -146.4277 219.3532)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="313.58" y="369.38" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -146.4996 219.6069)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="313.59" y="369.34" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -146.6202 220.0117)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="313.6" y="369.3" transform="matrix(0.8523 -0.523 0.523 0.8523 -146.5907 219.953)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="313.61" y="369.26" transform="matrix(0.8523 -0.523 0.523 0.8523 -146.5742 219.9343)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="313.62" y="369.22" transform="matrix(0.8523 -0.523 0.523 0.8523 -146.5583 219.9173)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="313.63" y="369.19" transform="matrix(0.8523 -0.523 0.523 0.8523 -146.5412 219.8968)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="313.64" y="369.15" transform="matrix(0.8523 -0.523 0.523 0.8523 -146.5301 219.8948)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="313.64" y="369.11" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -146.6297 220.2359)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="313.65" y="369.07" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -146.6131 220.217)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="313.66" y="369.03" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -146.6716 220.4314)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="313.67" y="368.99" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -146.6551 220.4126)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="313.68" y="368.95" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -146.7542 220.7535)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="313.69" y="368.92" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -146.7579 220.798)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="313.69" y="368.88" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -146.7413 220.7792)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="313.7" y="368.84" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -146.7173 220.737)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="313.71" y="368.8" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -146.8158 221.0775)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="313.72" y="368.76" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -146.8739 221.2926)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="313.73" y="368.72" transform="matrix(0.8505 -0.526 0.526 0.8505 -146.8701 221.3136)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="313.74" y="368.68" transform="matrix(0.8505 -0.526 0.526 0.8505 -146.853 221.293)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="313.75" y="368.65" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -146.9514 221.635)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="313.75" y="368.61" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -146.9348 221.6161)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="313.76" y="368.57" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -146.9182 221.5972)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="313.77" y="368.53" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -147.0953 222.1883)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="313.78" y="368.49" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -147.0913 222.2091)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="313.79" y="368.45" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -147.07 222.1755)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="313.8" y="368.41" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -147.1783 222.5517)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="313.8" y="368.38" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -147.1622 222.5345)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="313.81" y="368.34" transform="matrix(0.8486 -0.529 0.529 0.8486 -147.2198 222.7509)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="313.82" y="368.3" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -147.316 223.0904)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="313.83" y="368.26" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -147.3119 223.1112)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="313.84" y="368.22" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -147.4126 223.4666)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="313.85" y="368.18" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -147.4574 223.6441)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="313.85" y="368.14" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -147.565 224.0229)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="313.86" y="368.1" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -147.5484 224.0037)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="313.87" y="368.07" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -147.7291 224.6194)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="313.88" y="368.03" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -147.7124 224.6003)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="313.89" y="367.99" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -147.8188 224.9786)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="313.9" y="367.95" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -147.8682 225.1735)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="313.91" y="367.91" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -147.9813 225.5753)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="313.91" y="367.87" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -148.0738 225.9117)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="313.92" y="367.83" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -148.1308 226.133)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="313.93" y="367.8" transform="matrix(0.844 -0.5364 0.5364 0.844 -148.2354 226.5107)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="313.94" y="367.76" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -148.4004 227.0881)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="313.95" y="367.72" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -148.3957 227.1082)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="313.96" y="367.68" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -148.5652 227.7035)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="313.96" y="367.64" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -148.6675 228.0788)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="313.97" y="367.6" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -148.8299 228.6555)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="313.98" y="367.56" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -148.9321 229.0337)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="313.99" y="367.53" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -149.1056 229.6521)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="314" y="367.49" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -149.1945 229.9884)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="314.01" y="367.45" transform="matrix(0.839 -0.5441 0.5441 0.839 -149.3593 230.583)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="314.02" y="367.41" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -149.5306 231.2024)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="314.02" y="367.37" transform="matrix(0.8371 -0.547 0.547 0.8371 -149.8048 232.178)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="314.03" y="367.33" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -149.9739 232.7983)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="314.04" y="367.29" transform="matrix(0.8352 -0.5499 0.5499 0.8352 -150.2374 233.7497)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="314.05" y="367.26" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -150.4043 234.3711)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="314.06" y="367.22" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -150.6824 235.3872)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="314.07" y="367.18" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -150.9469 236.3638)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="314.07" y="367.14" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -151.2131 237.3548)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="314.08" y="367.1" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -151.5424 238.5829)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="314.09" y="367.06" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -151.9176 239.992)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="314.1" y="367.02" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -152.2394 241.2214)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="314.11" y="366.99" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -152.6672 242.8617)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="314.12" y="366.95" transform="matrix(0.8217 -0.57 0.57 0.8217 -153.1806 244.8528)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="314.12" y="366.91" transform="matrix(0.8193 -0.5734 0.5734 0.8193 -153.6678 246.7784)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="314.13" y="366.87" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -154.1536 248.7326)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="314.14" y="366.83" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -154.8076 251.4033)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="314.15" y="366.79" transform="matrix(0.8099 -0.5866 0.5866 0.8099 -155.5033 254.316)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="314.16" y="366.75" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -156.3514 257.9679)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="314.17" y="366.71" transform="matrix(0.8 -0.6001 0.6001 0.8 -157.2913 262.1685)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="320.45" y="365.71" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0926 221.7305)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="320.46" y="365.67" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0762 221.712)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="320.47" y="365.63" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0597 221.6934)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="320.48" y="365.59" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0433 221.6747)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="320.48" y="365.55" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0268 221.6561)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="320.49" y="365.51" transform="matrix(0.8542 -0.52 0.52 0.8542 -143.0103 221.6376)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="320.5" y="365.48" transform="matrix(0.8542 -0.52 0.52 0.8542 -142.9939 221.619)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="320.51" y="365.44" transform="matrix(0.8542 -0.52 0.52 0.8542 -142.9774 221.6005)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="320.52" y="365.4" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -143.1503 222.196)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="320.53" y="365.36" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -143.1339 222.1774)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="320.54" y="365.32" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -143.1174 222.1588)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="320.54" y="365.28" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -143.0957 222.1232)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="320.55" y="365.24" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -143.0915 222.1449)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="320.56" y="365.21" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -143.0751 222.1263)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="320.57" y="365.17" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -143.1212 222.3113)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="320.58" y="365.13" transform="matrix(0.853 -0.5219 0.5219 0.853 -143.166 222.4926)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="320.59" y="365.09" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -143.1371 222.4336)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="320.59" y="365.05" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -143.1206 222.4149)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="320.6" y="365.01" transform="matrix(0.853 -0.5218 0.5218 0.853 -143.1093 222.4131)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="320.61" y="364.97" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -143.1645 222.6287)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="320.62" y="364.94" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -143.2589 222.973)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="320.63" y="364.9" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -143.2418 222.9525)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="320.64" y="364.86" transform="matrix(0.8523 -0.523 0.523 0.8523 -143.233 222.9591)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="320.65" y="364.82" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -143.2287 222.9806)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="320.65" y="364.78" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -143.2122 222.9619)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="320.66" y="364.74" transform="matrix(0.8523 -0.523 0.523 0.8523 -143.1834 222.9028)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="320.67" y="364.7" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -143.2824 223.2636)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="320.68" y="364.67" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -143.2658 223.2448)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="320.69" y="364.63" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -143.32 223.4592)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="320.7" y="364.59" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -143.304 223.4423)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="320.7" y="364.55" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -143.4089 223.8245)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="320.71" y="364.51" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -143.3929 223.8074)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="320.72" y="364.47" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -143.384 223.814)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="320.73" y="364.43" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -143.3548 223.7531)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="320.74" y="364.39" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -143.4531 224.1149)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="320.75" y="364.36" transform="matrix(0.8505 -0.526 0.526 0.8505 -143.519 224.3703)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="320.76" y="364.32" transform="matrix(0.8505 -0.526 0.526 0.8505 -143.5024 224.3514)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="320.76" y="364.28" transform="matrix(0.8505 -0.526 0.526 0.8505 -143.4858 224.3326)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="320.77" y="364.24" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -143.5779 224.6756)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="320.78" y="364.2" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -143.5613 224.6567)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="320.79" y="364.16" transform="matrix(0.85 -0.5267 0.5267 0.85 -143.5568 224.678)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="320.8" y="364.12" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -143.7121 225.2338)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="320.81" y="364.09" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -143.6954 225.2148)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="320.81" y="364.05" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -143.6788 225.1958)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="320.82" y="364.01" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -143.7888 225.6022)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="320.83" y="363.97" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -143.7721 225.5832)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="320.84" y="363.93" transform="matrix(0.8486 -0.529 0.529 0.8486 -143.8254 225.7997)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="320.85" y="363.89" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -143.9283 226.184)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="320.86" y="363.85" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -143.9116 226.1649)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="320.87" y="363.82" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -144.0016 226.5069)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="320.87" y="363.78" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -144.048 226.7022)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="320.88" y="363.74" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -144.1491 227.0842)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="320.89" y="363.7" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -144.1325 227.0651)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="320.9" y="363.66" transform="matrix(0.8464 -0.5326 0.5326 0.8464 -144.2913 227.6456)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="320.91" y="363.62" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -144.2868 227.6683)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="320.92" y="363.58" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -144.3863 228.0479)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="320.92" y="363.55" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -144.4322 228.2445)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="320.93" y="363.51" transform="matrix(0.8452 -0.5344 0.5344 0.8452 -144.5199 228.5856)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="320.94" y="363.47" transform="matrix(0.8448 -0.5351 0.5351 0.8448 -144.6189 228.9664)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="320.95" y="363.43" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -144.6714 229.1878)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="320.96" y="363.39" transform="matrix(0.844 -0.5364 0.5364 0.844 -144.7766 229.5926)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="320.97" y="363.35" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -144.9434 230.2146)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="320.98" y="363.31" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -144.9265 230.1952)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="320.98" y="363.28" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -145.0862 230.7952)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="320.99" y="363.24" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -145.1708 231.1334)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="321" y="363.2" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -145.3358 231.7581)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="321.01" y="363.16" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -145.4306 232.1358)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="321.02" y="363.12" transform="matrix(0.8402 -0.5422 0.5422 0.8402 -145.5826 232.7192)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="321.03" y="363.08" transform="matrix(0.8395 -0.5434 0.5434 0.8395 -145.745 233.343)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="321.03" y="363.04" transform="matrix(0.839 -0.5441 0.5441 0.839 -145.8318 233.6973)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="321.04" y="363.01" transform="matrix(0.8383 -0.5451 0.5451 0.8383 -145.9812 234.2799)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="321.05" y="362.97" transform="matrix(0.8371 -0.547 0.547 0.8371 -146.2508 235.3045)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="321.06" y="362.93" transform="matrix(0.8363 -0.5482 0.5482 0.8363 -146.4198 235.9677)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="321.07" y="362.89" transform="matrix(0.8352 -0.55 0.55 0.8352 -146.6746 236.9529)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="321.08" y="362.85" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -146.8243 237.5542)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="321.08" y="362.81" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -147.0751 238.5381)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="321.09" y="362.77" transform="matrix(0.832 -0.5548 0.5548 0.832 -147.3338 239.5617)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="321.1" y="362.73" transform="matrix(0.8308 -0.5566 0.5566 0.8308 -147.59 240.5853)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="321.11" y="362.7" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -147.8924 241.797)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="321.12" y="362.66" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -148.2341 243.177)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="321.13" y="362.62" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -148.536 244.4169)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="321.14" y="362.58" transform="matrix(0.8242 -0.5664 0.5664 0.8242 -148.93 246.0415)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="321.14" y="362.54" transform="matrix(0.8217 -0.57 0.57 0.8217 -149.4169 248.0726)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="321.15" y="362.5" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -149.863 249.9723)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="321.16" y="362.46" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -150.3351 252.0186)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="321.17" y="362.43" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -150.936 254.6684)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="321.18" y="362.39" transform="matrix(0.8099 -0.5865 0.5865 0.8099 -151.5779 257.5737)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="321.19" y="362.35" transform="matrix(0.8058 -0.5922 0.5922 0.8058 -152.2886 260.8885)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="321.19" y="362.31" transform="matrix(0.7999 -0.6001 0.6001 0.7999 -153.2447 265.5151)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="327.63" y="361.38" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.7969 224.8318)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="327.64" y="361.34" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.7805 224.8132)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="327.64" y="361.31" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.7641 224.7946)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="327.65" y="361.27" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -139.7408 224.7525)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="327.66" y="361.23" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.7311 224.7574)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="327.67" y="361.19" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.7146 224.7389)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="327.68" y="361.15" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.6982 224.7203)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="327.69" y="361.11" transform="matrix(0.8542 -0.52 0.52 0.8542 -139.6818 224.7016)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="327.7" y="361.07" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -139.8517 225.3259)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="327.7" y="361.04" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -139.8352 225.3073)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="327.71" y="361" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -139.8187 225.2887)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="327.72" y="360.96" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -139.7954 225.2466)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="327.73" y="360.92" transform="matrix(0.8535 -0.521 0.521 0.8535 -139.7671 225.1871)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="327.74" y="360.88" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -139.7624 225.2092)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="327.75" y="360.84" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -139.746 225.1905)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="327.76" y="360.8" transform="matrix(0.853 -0.5219 0.5219 0.853 -139.8537 225.6025)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="327.76" y="360.76" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -139.8255 225.5432)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="327.77" y="360.73" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -139.8084 225.5225)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="327.78" y="360.69" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -139.7925 225.5057)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="327.79" y="360.65" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -139.8557 225.7639)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="327.8" y="360.61" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -139.9374 226.0877)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="327.81" y="360.57" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -139.9215 226.071)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="327.81" y="360.53" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -139.9044 226.0502)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="327.82" y="360.49" transform="matrix(0.8523 -0.523 0.523 0.8523 -139.8995 226.0722)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="327.83" y="360.46" transform="matrix(0.8523 -0.523 0.523 0.8523 -139.883 226.0534)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="327.84" y="360.42" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -139.8549 225.9941)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="327.85" y="360.38" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -139.9613 226.4053)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="327.86" y="360.34" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -139.9447 226.3864)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="327.87" y="360.3" transform="matrix(0.8516 -0.5242 0.5242 0.8516 -139.9963 226.6067)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="327.87" y="360.26" transform="matrix(0.8516 -0.5242 0.5242 0.8516 -139.984 226.6028)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="327.88" y="360.22" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -140.0715 226.9495)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="327.89" y="360.19" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -140.0549 226.9307)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="327.9" y="360.15" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -140.0383 226.9118)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="327.91" y="360.11" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -140.0218 226.8931)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="327.92" y="360.07" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -140.1087 227.2393)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="327.92" y="360.03" transform="matrix(0.8505 -0.526 0.526 0.8505 -140.1702 227.4968)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="327.93" y="359.99" transform="matrix(0.8505 -0.526 0.526 0.8505 -140.1542 227.4799)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="327.94" y="359.95" transform="matrix(0.8505 -0.526 0.526 0.8505 -140.1309 227.4372)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="327.95" y="359.92" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -140.2239 227.8071)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="327.96" y="359.88" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -140.2073 227.7882)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="327.97" y="359.84" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -140.1907 227.7692)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="327.97" y="359.8" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -140.3662 228.4346)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="327.98" y="359.76" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -140.3382 228.3751)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="327.99" y="359.72" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -140.3216 228.3561)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="328" y="359.68" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -140.4181 228.7421)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="328.01" y="359.64" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -140.3948 228.6993)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="328.02" y="359.61" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -140.4336 228.879)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="328.03" y="359.57" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -140.5407 229.3051)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="328.03" y="359.53" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -140.5241 229.2861)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="328.04" y="359.49" transform="matrix(0.8477 -0.5304 0.5304 0.8477 -140.6194 229.6715)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="328.05" y="359.45" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -140.6579 229.8521)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="328.06" y="359.41" transform="matrix(0.847 -0.5315 0.5315 0.847 -140.7592 230.2613)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="328.07" y="359.37" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -140.736 230.2181)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="328.08" y="359.34" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -140.8962 230.844)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="328.08" y="359.3" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -140.8795 230.8248)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="328.09" y="359.26" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -140.9731 231.2094)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="328.1" y="359.22" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -141.0221 231.432)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="328.11" y="359.18" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -141.1041 231.7759)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="328.12" y="359.14" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -141.1965 232.16)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="328.13" y="359.1" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -141.2387 232.3591)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="328.14" y="359.07" transform="matrix(0.844 -0.5363 0.5363 0.844 -141.3305 232.743)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="328.14" y="359.03" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -141.4875 233.372)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="328.15" y="358.99" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -141.4702 233.3505)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="328.16" y="358.95" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -141.6254 233.9761)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="328.17" y="358.91" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -141.7053 234.321)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="328.18" y="358.87" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -141.853 234.9245)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="328.19" y="358.83" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -141.9483 235.3316)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="328.19" y="358.8" transform="matrix(0.8403 -0.5422 0.5422 0.8403 -142.0842 235.8951)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="328.2" y="358.76" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -142.1785 236.3018)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="328.21" y="358.72" transform="matrix(0.839 -0.5441 0.5441 0.839 -142.3298 236.9306)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="328.22" y="358.68" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -142.47 237.5198)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="328.23" y="358.64" transform="matrix(0.8371 -0.547 0.547 0.8371 -142.7159 238.526)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="328.24" y="358.6" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -142.868 239.1713)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="328.24" y="358.56" transform="matrix(0.8352 -0.5499 0.5499 0.8352 -143.0956 240.1204)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="328.25" y="358.53" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -143.2427 240.7554)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="328.26" y="358.49" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -143.4867 241.7851)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="328.27" y="358.45" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -143.7188 242.7768)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="328.28" y="358.41" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -143.9521 243.7829)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="328.29" y="358.37" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -144.2408 245.0294)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="328.3" y="358.33" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -144.5633 246.434)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="328.3" y="358.29" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -144.8449 247.6833)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="328.31" y="358.25" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -145.2242 249.3718)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="328.32" y="358.22" transform="matrix(0.8217 -0.57 0.57 0.8217 -145.6719 251.3919)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="328.33" y="358.18" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -146.0868 253.3055)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="328.34" y="358.14" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -146.5172 255.3291)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="328.35" y="358.1" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -147.0771 258.0086)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="328.35" y="358.06" transform="matrix(0.8099 -0.5866 0.5866 0.8099 -147.682 260.9862)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="328.36" y="358.02" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -148.41 264.6895)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="328.37" y="357.98" transform="matrix(0.8 -0.6 0.6 0.8 -149.206 268.9178)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="334.68" y="357.07" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.5251 227.8702)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="334.69" y="357.03" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.5086 227.8516)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="334.7" y="356.99" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -136.4857 227.8093)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="334.71" y="356.95" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.4757 227.8145)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="334.72" y="356.91" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.4593 227.7959)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="334.72" y="356.88" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.4429 227.7774)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="334.73" y="356.84" transform="matrix(0.8542 -0.52 0.52 0.8542 -136.4264 227.7587)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="334.74" y="356.8" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -136.4659 227.9454)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="334.75" y="356.76" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -136.5697 228.3696)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="334.76" y="356.72" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -136.5421 228.31)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="334.77" y="356.68" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -136.5303 228.3086)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="334.77" y="356.64" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -136.5139 228.2899)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="334.78" y="356.61" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -136.4974 228.2713)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="334.79" y="356.57" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -136.4809 228.2526)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="334.8" y="356.53" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -136.5153 228.422)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="334.81" y="356.49" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -136.5543 228.6084)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="334.82" y="356.45" transform="matrix(0.853 -0.5219 0.5219 0.853 -136.5489 228.6307)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="334.83" y="356.41" transform="matrix(0.853 -0.5219 0.5219 0.853 -136.5325 228.612)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="334.83" y="356.37" transform="matrix(0.853 -0.5219 0.5219 0.853 -136.516 228.5933)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="334.84" y="356.34" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -136.5462 228.7479)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="334.85" y="356.3" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -136.5297 228.7292)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="334.86" y="356.26" transform="matrix(0.8523 -0.523 0.523 0.8523 -136.6346 229.1614)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="334.87" y="356.22" transform="matrix(0.8523 -0.523 0.523 0.8523 -136.6181 229.1427)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="334.88" y="356.18" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -136.5905 229.083)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="334.88" y="356.14" transform="matrix(0.8523 -0.523 0.523 0.8523 -136.5804 229.0881)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="334.89" y="356.1" transform="matrix(0.8523 -0.523 0.523 0.8523 -136.5639 229.0694)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="334.9" y="356.06" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -136.6566 229.4581)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="334.91" y="356.03" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -136.6407 229.4414)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="334.92" y="355.99" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -136.6811 229.6355)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="334.93" y="355.95" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -136.6651 229.6189)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="334.94" y="355.91" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -136.7582 230.0115)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="334.94" y="355.87" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -136.7302 229.9496)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="334.95" y="355.83" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -136.7245 229.9717)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="334.96" y="355.79" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -136.708 229.9529)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="334.97" y="355.76" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -136.8 230.3429)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="334.98" y="355.72" transform="matrix(0.8505 -0.526 0.526 0.8505 -136.847 230.5638)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="334.99" y="355.68" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -136.8195 230.504)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="334.99" y="355.64" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -136.8029 230.4851)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="335" y="355.6" transform="matrix(0.85 -0.5267 0.5267 0.85 -136.905 230.9158)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="335.01" y="355.56" transform="matrix(0.85 -0.5267 0.5267 0.85 -136.8885 230.8969)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="335.02" y="355.52" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -136.8612 230.8372)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="335.03" y="355.49" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -137.0152 231.467)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="335.04" y="355.45" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -136.998 231.446)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="335.05" y="355.41" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -136.9819 231.4292)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="335.05" y="355.37" transform="matrix(0.849 -0.5284 0.5284 0.849 -137.0551 231.7534)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="335.06" y="355.33" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -137.0491 231.7752)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="335.07" y="355.29" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -137.0954 231.9973)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="335.08" y="355.25" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -137.1849 232.3862)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="335.09" y="355.21" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -137.1639 232.3506)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="335.1" y="355.18" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -137.2524 232.737)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="335.1" y="355.14" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -137.2989 232.9621)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="335.11" y="355.1" transform="matrix(0.847 -0.5316 0.5316 0.847 -137.3914 233.3669)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="335.12" y="355.06" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -137.3643 233.3071)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="335.13" y="355.02" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -137.5144 233.938)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="335.14" y="354.98" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -137.4976 233.9188)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="335.15" y="354.94" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -137.5848 234.3065)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="335.15" y="354.91" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -137.6198 234.4902)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="335.16" y="354.87" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -137.7064 234.8778)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="335.17" y="354.83" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -137.6999 234.8992)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="335.18" y="354.79" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -137.8311 235.4658)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="335.19" y="354.75" transform="matrix(0.844 -0.5363 0.5363 0.844 -137.9166 235.8528)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="335.2" y="354.71" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -138.0635 236.4868)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="335.21" y="354.67" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -138.0462 236.4653)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="335.21" y="354.64" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -138.1821 237.0594)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="335.22" y="354.6" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -138.2713 237.4682)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="335.23" y="354.56" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -138.4092 238.0766)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="335.24" y="354.52" transform="matrix(0.841 -0.5411 0.5411 0.841 -138.4818 238.4216)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="335.25" y="354.48" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -138.6343 239.0954)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="335.26" y="354.44" transform="matrix(0.8397 -0.543 0.543 0.8397 -138.7157 239.4806)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="335.26" y="354.4" transform="matrix(0.839 -0.5441 0.5441 0.839 -138.847 240.0738)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="335.27" y="354.37" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -138.9812 240.6831)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="335.28" y="354.33" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -139.2168 241.7219)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="335.29" y="354.29" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -139.3453 242.3165)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="335.3" y="354.25" transform="matrix(0.8352 -0.55 0.55 0.8352 -139.577 243.3557)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="335.31" y="354.21" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -139.7032 243.9514)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="335.32" y="354.17" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -139.9251 244.9655)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="335.32" y="354.13" transform="matrix(0.832 -0.5548 0.5548 0.832 -140.1508 246.0069)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="335.33" y="354.1" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -140.3639 247.0038)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="335.34" y="354.06" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -140.6361 248.2763)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="335.35" y="354.02" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -140.9266 249.6489)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="335.36" y="353.98" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -141.1967 250.9475)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="335.37" y="353.94" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -141.5401 252.608)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="335.37" y="353.9" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -141.947 254.6027)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="335.38" y="353.86" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -142.3394 256.5697)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="335.39" y="353.82" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -142.7368 258.6056)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="335.4" y="353.79" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -143.2539 261.3055)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="335.41" y="353.75" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -143.8793 264.6707)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="335.42" y="353.71" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -144.486 268.0705)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="335.42" y="353.67" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -145.166 272.0466)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="341.73" y="352.75" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.2523 230.9079)" className="palma30" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="341.74" y="352.71" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.2359 230.8894)" className="palma303" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="341.75" y="352.68" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.2195 230.8708)" className="palma304" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="341.76" y="352.64" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.203 230.8523)" className="palma305" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="341.77" y="352.6" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.1866 230.8337)" className="palma306" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="341.78" y="352.56" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.1702 230.815)" className="palma307" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="341.78" y="352.52" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.1537 230.7965)" className="palma308" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="341.79" y="352.48" transform="matrix(0.8542 -0.52 0.52 0.8542 -133.1373 230.778)" className="palma309" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="341.8" y="352.44" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -133.2809 231.3886)" className="palma310" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="341.81" y="352.4" transform="matrix(0.8535 -0.521 0.521 0.8535 -133.2539 231.3286)" className="palma311" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="341.82" y="352.37" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -133.254 231.3752)" className="palma312" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="341.83" y="352.33" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -133.2375 231.3566)" className="palma313" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="341.84" y="352.29" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -133.2211 231.338)" className="palma314" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="341.84" y="352.25" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -133.2046 231.3194)" className="palma315" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="341.85" y="352.21" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -133.2301 231.4662)" className="palma316" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="341.86" y="352.17" transform="matrix(0.853 -0.5219 0.5219 0.853 -133.2763 231.6955)" className="palma317" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="341.87" y="352.13" transform="matrix(0.853 -0.5218 0.5218 0.853 -133.2538 231.6528)" className="palma318" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="341.88" y="352.1" transform="matrix(0.853 -0.5218 0.5218 0.853 -133.2373 231.6342)" className="palma319" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="341.89" y="352.06" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -133.2103 231.5742)" className="palma320" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="341.89" y="352.02" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -133.2544 231.7955)" className="palma321" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="341.9" y="351.98" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -133.3419 232.19)" className="palma322" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="341.91" y="351.94" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -133.3418 232.2366)" className="palma323" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="341.92" y="351.9" transform="matrix(0.8523 -0.523 0.523 0.8523 -133.3149 232.1766)" className="palma324" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="341.93" y="351.86" transform="matrix(0.8523 -0.523 0.523 0.8523 -133.2983 232.1578)" className="palma325" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="341.94" y="351.83" transform="matrix(0.8523 -0.523 0.523 0.8523 -133.2818 232.1391)" className="palma326" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="341.95" y="351.79" transform="matrix(0.8523 -0.523 0.523 0.8523 -133.2697 232.1377)" className="palma327" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="341.95" y="351.75" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -133.3463 232.4904)" className="palma328" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="341.96" y="351.71" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -133.3298 232.4716)" className="palma329" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="341.97" y="351.67" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -133.3728 232.6913)" className="palma330" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="341.98" y="351.63" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -133.3568 232.6748)" className="palma331" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="341.99" y="351.59" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -133.4436 233.0708)" className="palma332" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="342" y="351.56" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -133.4264 233.0497)" className="palma333" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="342" y="351.52" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -133.4165 233.0572)" className="palma334" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="342.01" y="351.48" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -133.3993 233.0362)" className="palma335" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="342.02" y="351.44" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -133.479 233.4053)" className="palma336" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="342.03" y="351.4" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -133.512 233.5868)" className="palma337" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="342.04" y="351.36" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -133.4955 233.568)" className="palma338" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="342.05" y="351.32" transform="matrix(0.8505 -0.526 0.526 0.8505 -133.4885 233.5881)" className="palma339" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="342.06" y="351.28" transform="matrix(0.85 -0.5267 0.5267 0.85 -133.574 233.9833)" className="palma340" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="342.06" y="351.25" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -133.5473 233.9232)" className="palma341" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="342.07" y="351.21" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -133.5307 233.9043)" className="palma342" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="342.08" y="351.17" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -133.6686 234.515)" className="palma343" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="342.09" y="351.13" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -133.6514 234.4938)" className="palma344" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="342.1" y="351.09" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -133.6454 234.5182)" className="palma345" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="342.11" y="351.05" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -133.7251 234.8937)" className="palma346" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="342.11" y="351.01" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -133.7085 234.8747)" className="palma347" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="342.12" y="350.98" transform="matrix(0.8486 -0.529 0.529 0.8486 -133.7509 235.0988)" className="palma348" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="342.13" y="350.94" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -133.8242 235.4498)" className="palma349" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="342.14" y="350.9" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -133.8075 235.4308)" className="palma350" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="342.15" y="350.86" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -133.8843 235.7981)" className="palma351" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="342.16" y="350.82" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -133.9363 236.064)" className="palma352" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="342.17" y="350.78" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -134.0085 236.4145)" className="palma353" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="342.17" y="350.74" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -133.9917 236.3954)" className="palma354" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="342.18" y="350.71" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -134.1316 237.0313)" className="palma355" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="342.19" y="350.67" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -134.1149 237.012)" className="palma356" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="342.2" y="350.63" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -134.186 237.3619)" className="palma357" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="342.21" y="350.59" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -134.2314 237.6046)" className="palma358" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="342.22" y="350.55" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -134.3116 237.9953)" className="palma359" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="342.22" y="350.51" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -134.387 238.367)" className="palma360" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="342.23" y="350.47" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -134.4286 238.5964)" className="palma361" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="342.24" y="350.44" transform="matrix(0.844 -0.5364 0.5364 0.844 -134.5077 238.9865)" className="palma362" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="342.25" y="350.4" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -134.6443 239.6258)" className="palma363" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="342.26" y="350.36" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -134.6174 239.5632)" className="palma364" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="342.27" y="350.32" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -134.7475 240.1783)" className="palma365" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="342.27" y="350.28" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -134.8337 240.6063)" className="palma366" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="342.28" y="350.24" transform="matrix(0.8413 -0.5405 0.5405 0.8413 -134.9675 241.244)" className="palma367" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="342.29" y="350.2" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -135.0343 241.592)" className="palma368" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="342.3" y="350.17" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -135.1666 242.2302)" className="palma369" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="342.31" y="350.13" transform="matrix(0.8397 -0.543 0.543 0.8397 -135.2416 242.6184)" className="palma370" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="342.32" y="350.09" transform="matrix(0.839 -0.5441 0.5441 0.839 -135.3577 243.1912)" className="palma371" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="342.33" y="350.05" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -135.4877 243.8302)" className="palma372" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="342.33" y="350.01" transform="matrix(0.8371 -0.547 0.547 0.8371 -135.6977 244.8362)" className="palma373" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="342.34" y="349.97" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -135.8255 245.4762)" className="palma374" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="342.35" y="349.93" transform="matrix(0.8352 -0.55 0.55 0.8352 -136.0349 246.4978)" className="palma375" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="342.36" y="349.9" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -136.1516 247.098)" className="palma376" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="342.37" y="349.86" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -136.3627 248.1451)" className="palma377" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="342.38" y="349.82" transform="matrix(0.832 -0.5548 0.5548 0.832 -136.5711 249.1921)" className="palma378" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="342.38" y="349.78" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -136.7687 250.1986)" className="palma379" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="342.39" y="349.74" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -137.0205 251.4805)" className="palma380" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="342.4" y="349.7" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -137.2942 252.8891)" className="palma381" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="342.41" y="349.66" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -137.5434 254.1971)" className="palma382" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="342.42" y="349.62" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -137.8552 255.8435)" className="palma383" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="342.43" y="349.59" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -138.2302 257.8523)" className="palma384" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="342.43" y="349.55" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -138.5411 259.5665)" className="palma385" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="342.44" y="349.51" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -138.9557 261.8831)" className="palma386" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="342.45" y="349.47" transform="matrix(0.8132 -0.5819 0.5819 0.8132 -139.4823 264.9)" className="palma387" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="342.46" y="349.43" transform="matrix(0.8095 -0.5871 0.5871 0.8095 -139.9945 267.9495)" className="palma388" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="342.47" y="349.39" transform="matrix(0.8057 -0.5923 0.5923 0.8057 -140.4892 271.0156)" className="palma389" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="342.48" y="349.35" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -141.1739 275.4415)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="348.84" y="348.39" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.9458 233.9678)" className="palma30" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="348.85" y="348.35" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.9293 233.9492)" className="palma303" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="348.86" y="348.31" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -129.9072 233.9066)" className="palma304" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="348.87" y="348.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.8964 233.9121)" className="palma305" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="348.88" y="348.23" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.8799 233.8936)" className="palma306" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="348.88" y="348.19" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.8635 233.8748)" className="palma307" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="348.89" y="348.16" transform="matrix(0.8542 -0.52 0.52 0.8542 -129.847 233.8563)" className="palma308" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="348.9" y="348.12" transform="matrix(0.8537 -0.5207 0.5207 0.8537 -129.9296 234.2549)" className="palma309" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="348.91" y="348.08" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -129.9702 234.4776)" className="palma310" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="348.92" y="348.04" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -129.9439 234.4173)" className="palma311" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="348.93" y="348" transform="matrix(0.8535 -0.521 0.521 0.8535 -129.9212 234.3719)" className="palma312" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="348.94" y="347.96" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -129.9151 234.3975)" className="palma313" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="348.94" y="347.92" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -129.8986 234.3788)" className="palma314" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="348.95" y="347.88" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -129.8821 234.3602)" className="palma315" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="348.96" y="347.85" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -129.8621 234.3265)" className="palma316" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="348.97" y="347.81" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -129.9433 234.7222)" className="palma317" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="348.98" y="347.77" transform="matrix(0.853 -0.5219 0.5219 0.853 -129.9366 234.7451)" className="palma318" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="348.99" y="347.73" transform="matrix(0.853 -0.5219 0.5219 0.853 -129.9201 234.7265)" className="palma319" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="348.99" y="347.69" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -129.8938 234.6662)" className="palma320" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="349" y="347.65" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -129.9285 234.8652)" className="palma321" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="349.01" y="347.61" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -130.0096 235.263)" className="palma322" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="349.02" y="347.58" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -129.9937 235.2466)" className="palma323" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="349.03" y="347.54" transform="matrix(0.8523 -0.523 0.523 0.8523 -129.9863 235.2671)" className="palma324" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="349.04" y="347.5" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -129.96 235.2068)" className="palma325" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="349.05" y="347.46" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -129.9435 235.1881)" className="palma326" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="349.05" y="347.42" transform="matrix(0.8523 -0.523 0.523 0.8523 -129.9327 235.1935)" className="palma327" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="349.06" y="347.38" transform="matrix(0.8518 -0.5238 0.5238 0.8518 -130.0228 235.6324)" className="palma328" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="349.07" y="347.34" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -129.9966 235.572)" className="palma329" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="349.08" y="347.31" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -130.0302 235.7692)" className="palma330" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="349.09" y="347.27" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -130.0142 235.7529)" className="palma331" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="349.1" y="347.23" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -130.0947 236.1523)" className="palma332" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="349.1" y="347.19" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -130.0679 236.0895)" className="palma333" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="349.11" y="347.15" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -130.0616 236.1147)" className="palma334" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="349.12" y="347.11" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -130.0444 236.0934)" className="palma335" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="349.13" y="347.07" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -130.1237 236.49)" className="palma336" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="349.14" y="347.04" transform="matrix(0.8505 -0.526 0.526 0.8505 -130.1631 236.7145)" className="palma337" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="349.15" y="347" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -130.1369 236.6541)" className="palma338" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="349.16" y="346.96" transform="matrix(0.8505 -0.526 0.526 0.8505 -130.1293 236.6744)" className="palma339" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="349.16" y="346.92" transform="matrix(0.85 -0.5267 0.5267 0.85 -130.2084 237.073)" className="palma340" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="349.17" y="346.88" transform="matrix(0.85 -0.5267 0.5267 0.85 -130.1918 237.0541)" className="palma341" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="349.18" y="346.84" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -130.1657 236.9937)" className="palma342" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="349.19" y="346.8" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -130.2995 237.6339)" className="palma343" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="349.2" y="346.77" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -130.2822 237.6125)" className="palma344" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="349.21" y="346.73" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -130.2662 237.5959)" className="palma345" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="349.21" y="346.69" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -130.338 237.967)" className="palma346" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="349.22" y="346.65" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -130.3214 237.948)" className="palma347" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="349.23" y="346.61" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -130.3601 238.1739)" className="palma348" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="349.24" y="346.57" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -130.4368 238.5692)" className="palma349" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="349.25" y="346.53" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -130.4164 238.5333)" className="palma350" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="349.26" y="346.49" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -130.4926 238.9282)" className="palma351" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="349.27" y="346.46" transform="matrix(0.8474 -0.5309 0.5309 0.8474 -130.5401 239.1963)" className="palma352" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="349.27" y="346.42" transform="matrix(0.847 -0.5316 0.5316 0.847 -130.6156 239.591)" className="palma353" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="349.28" y="346.38" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -130.5843 239.506)" className="palma354" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="349.29" y="346.34" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -130.714 240.147)" className="palma355" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="349.3" y="346.3" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -130.6973 240.1277)" className="palma356" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="349.31" y="346.26" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -130.7717 240.5217)" className="palma357" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="349.32" y="346.22" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -130.8003 240.7086)" className="palma358" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="349.32" y="346.19" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -130.883 241.1438)" className="palma359" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="349.33" y="346.15" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -130.9558 241.5348)" className="palma360" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="349.34" y="346.11" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -130.9791 241.7002)" className="palma361" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="349.35" y="346.07" transform="matrix(0.844 -0.5363 0.5363 0.844 -131.0518 242.0933)" className="palma362" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="349.36" y="346.03" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -131.1782 242.7378)" className="palma363" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="349.37" y="345.99" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -131.1608 242.716)" className="palma364" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="349.38" y="345.95" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -131.2775 243.3197)" className="palma365" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="349.38" y="345.92" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -131.3533 243.7348)" className="palma366" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="349.39" y="345.88" transform="matrix(0.8413 -0.5405 0.5405 0.8413 -131.4795 244.3913)" className="palma367" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="349.4" y="345.84" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -131.5412 244.7444)" className="palma368" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="349.41" y="345.8" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -131.6631 245.3876)" className="palma369" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="349.42" y="345.76" transform="matrix(0.8397 -0.543 0.543 0.8397 -131.7318 245.7789)" className="palma370" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="349.43" y="345.72" transform="matrix(0.839 -0.5441 0.5441 0.839 -131.8437 246.3814)" className="palma371" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="349.43" y="345.68" transform="matrix(0.8383 -0.5453 0.5453 0.8383 -131.9633 247.0254)" className="palma372" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="349.44" y="345.65" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -132.1603 248.0547)" className="palma373" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="349.45" y="345.61" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -132.2693 248.6586)" className="palma374" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="349.46" y="345.57" transform="matrix(0.8352 -0.55 0.55 0.8352 -132.4674 249.7135)" className="palma375" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="349.47" y="345.53" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -132.5743 250.3183)" className="palma376" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="349.48" y="345.49" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -132.7635 251.3477)" className="palma377" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="349.48" y="345.45" transform="matrix(0.832 -0.5548 0.5548 0.832 -132.9556 252.4049)" className="palma378" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="349.49" y="345.41" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -133.1365 253.4164)" className="palma379" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="349.5" y="345.38" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -133.3678 254.7079)" className="palma380" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="349.51" y="345.34" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -133.614 256.1003)" className="palma381" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="349.52" y="345.3" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -133.8422 257.4177)" className="palma382" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="349.53" y="345.26" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -134.1322 259.1021)" className="palma383" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="349.54" y="345.22" transform="matrix(0.8217 -0.57 0.57 0.8217 -134.4821 261.1656)" className="palma384" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="349.54" y="345.18" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -134.7584 262.8513)" className="palma385" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="349.55" y="345.14" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -135.1404 265.2112)" className="palma386" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="349.56" y="345.1" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -135.5662 267.921)" className="palma387" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="349.57" y="345.07" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -136.0834 271.3314)" className="palma388" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="349.58" y="345.03" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -136.5807 274.7764)" className="palma389" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="349.59" y="344.99" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -137.1323 278.804)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="355.92" y="344.16" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.7155 237.0315)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="355.93" y="344.12" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.699 237.013)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="355.94" y="344.08" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.6826 236.9944)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="355.95" y="344.04" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.6661 236.9759)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="355.95" y="344.01" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.6497 236.9573)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="355.96" y="343.97" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.6333 236.9386)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="355.97" y="343.93" transform="matrix(0.8542 -0.52 0.52 0.8542 -126.6168 236.9202)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="355.98" y="343.89" transform="matrix(0.8537 -0.5207 0.5207 0.8537 -126.693 237.3219)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="355.99" y="343.85" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -126.73 237.5466)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="356" y="343.81" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -126.7043 237.4859)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="356" y="343.77" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -126.6971 237.5092)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="356.01" y="343.73" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -126.6806 237.4907)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="356.02" y="343.7" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -126.6641 237.472)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="356.03" y="343.66" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -126.6422 237.429)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="356.04" y="343.62" transform="matrix(0.8535 -0.521 0.521 0.8535 -126.6171 237.3709)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="356.05" y="343.58" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -126.6921 237.7697)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="356.06" y="343.54" transform="matrix(0.853 -0.5218 0.5218 0.853 -126.6847 237.7932)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="356.06" y="343.5" transform="matrix(0.853 -0.5219 0.5219 0.853 -126.6736 237.7988)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="356.07" y="343.46" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -126.648 237.7382)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="356.08" y="343.43" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -126.6846 237.9632)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="356.09" y="343.39" transform="matrix(0.8523 -0.523 0.523 0.8523 -126.7594 238.3643)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="356.1" y="343.35" transform="matrix(0.8523 -0.523 0.523 0.8523 -126.7466 238.3632)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="356.11" y="343.31" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -126.721 238.3025)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="356.11" y="343.27" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -126.7045 238.2838)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="356.12" y="343.23" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -126.688 238.265)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="356.13" y="343.19" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -126.6715 238.2463)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="356.14" y="343.16" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -126.7547 238.6888)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="356.15" y="343.12" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -126.7344 238.6525)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="356.16" y="343.08" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -126.7706 238.8785)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="356.17" y="343.04" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -126.7488 238.8351)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="356.17" y="343" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -126.8228 239.2379)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="356.18" y="342.96" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -126.7967 239.1747)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="356.19" y="342.92" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -126.7891 239.1978)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="356.2" y="342.89" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -126.7726 239.179)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="356.21" y="342.85" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -126.8455 239.5787)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="356.22" y="342.81" transform="matrix(0.8505 -0.526 0.526 0.8505 -126.8813 239.8052)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="356.22" y="342.77" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -126.8557 239.7445)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="356.23" y="342.73" transform="matrix(0.8505 -0.526 0.526 0.8505 -126.8475 239.7649)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="356.24" y="342.69" transform="matrix(0.85 -0.5267 0.5267 0.85 -126.9202 240.1671)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="356.25" y="342.65" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -126.8948 240.1064)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="356.26" y="342.61" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -126.8783 240.0873)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="356.27" y="342.58" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -127.0019 240.7327)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="356.28" y="342.54" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -126.9848 240.7111)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="356.28" y="342.5" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -126.9775 240.7366)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="356.29" y="342.46" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -127.0391 241.091)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="356.3" y="342.42" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -127.023 241.0745)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="356.31" y="342.38" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -127.0529 241.2777)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="356.32" y="342.34" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -127.1233 241.6762)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="356.33" y="342.31" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -127.0979 241.6155)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="356.33" y="342.27" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -127.1674 242.0111)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="356.34" y="342.23" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -127.2117 242.2866)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="356.35" y="342.19" transform="matrix(0.847 -0.5316 0.5316 0.847 -127.2854 242.7067)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="356.36" y="342.15" transform="matrix(0.847 -0.5315 0.5315 0.847 -127.2601 242.6458)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="356.37" y="342.11" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -127.3747 243.2672)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="356.38" y="342.07" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -127.3579 243.248)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="356.39" y="342.04" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -127.4176 243.6036)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="356.39" y="342" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -127.4515 243.8337)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="356.4" y="341.96" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -127.5274 244.2723)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="356.41" y="341.92" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -127.5106 244.2531)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="356.42" y="341.88" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -127.6193 244.8583)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="356.43" y="341.84" transform="matrix(0.844 -0.5364 0.5364 0.844 -127.6857 245.2548)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="356.44" y="341.8" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -127.7965 245.8769)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="356.44" y="341.77" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -127.7796 245.8573)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="356.45" y="341.73" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -127.8868 246.466)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="356.46" y="341.69" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -127.9509 246.8591)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="356.47" y="341.65" transform="matrix(0.8413 -0.5405 0.5405 0.8413 -128.0718 247.5459)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="356.48" y="341.61" transform="matrix(0.841 -0.5411 0.5411 0.841 -128.1227 247.8767)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="356.49" y="341.57" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -128.2346 248.5247)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="356.49" y="341.53" transform="matrix(0.8397 -0.543 0.543 0.8397 -128.297 248.9191)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="356.5" y="341.5" transform="matrix(0.839 -0.5441 0.5441 0.839 -128.3994 249.5262)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="356.51" y="341.46" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -128.5089 250.1752)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="356.52" y="341.42" transform="matrix(0.8371 -0.547 0.547 0.8371 -128.6868 251.1967)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="356.53" y="341.38" transform="matrix(0.8364 -0.5481 0.5481 0.8364 -128.7892 251.8208)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="356.54" y="341.34" transform="matrix(0.8352 -0.55 0.55 0.8352 -128.971 252.8836)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="356.55" y="341.3" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -129.0681 253.4929)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="356.55" y="341.26" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -129.2458 254.5559)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="356.56" y="341.22" transform="matrix(0.832 -0.5547 0.5547 0.832 -129.4168 255.5952)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="356.57" y="341.19" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -129.5818 256.614)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="356.58" y="341.15" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -129.7974 257.9412)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="356.59" y="341.11" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -130.0263 259.3702)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="356.6" y="341.07" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -130.2294 260.6708)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="356.6" y="341.03" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -130.493 262.3675)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="356.61" y="340.99" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -130.8084 264.4318)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="356.62" y="340.95" transform="matrix(0.8194 -0.5732 0.5732 0.8194 -131.0974 266.3842)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="356.63" y="340.92" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -131.4015 268.4923)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="356.64" y="340.88" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -131.7889 271.2482)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="356.65" y="340.84" transform="matrix(0.8099 -0.5866 0.5866 0.8099 -132.2019 274.3091)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="356.65" y="340.8" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -132.6922 278.1215)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="356.66" y="340.76" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -133.1875 282.232)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="362.99" y="339.81" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.4242 240.0766)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="363" y="339.78" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.4078 240.058)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="363.01" y="339.74" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.3913 240.0395)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="363.02" y="339.7" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.3749 240.0209)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="363.03" y="339.66" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.3584 240.0023)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="363.04" y="339.62" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.342 239.9836)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="363.05" y="339.58" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -123.3205 239.9406)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="363.05" y="339.54" transform="matrix(0.8542 -0.52 0.52 0.8542 -123.3091 239.9465)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="363.06" y="339.51" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -123.3426 240.1729)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="363.07" y="339.47" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -123.3261 240.1543)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="363.08" y="339.43" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -123.3097 240.1356)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="363.09" y="339.39" transform="matrix(0.853 -0.5219 0.5219 0.853 -123.4648 240.9643)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="363.1" y="339.35" transform="matrix(0.853 -0.5219 0.5219 0.853 -123.4483 240.9456)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="363.1" y="339.31" transform="matrix(0.853 -0.5219 0.5219 0.853 -123.4318 240.927)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="363.11" y="339.27" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -123.4023 240.8442)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="363.12" y="339.23" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -123.3853 240.8227)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="363.13" y="339.2" transform="matrix(0.853 -0.5218 0.5218 0.853 -123.3773 240.8463)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="363.14" y="339.16" transform="matrix(0.853 -0.5218 0.5218 0.853 -123.3609 240.8277)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="363.15" y="339.12" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -123.3409 240.7913)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="363.16" y="339.08" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -123.3732 241.0155)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="363.16" y="339.04" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -123.3572 240.9996)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="363.17" y="339" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -123.3492 241.0233)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="363.18" y="338.96" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -123.3278 240.9799)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="363.19" y="338.93" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -123.4725 241.7672)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="363.2" y="338.89" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -123.4554 241.7458)" className="palma178" width="5.05" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="363.21" y="338.85" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -123.4389 241.7271)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="363.21" y="338.81" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -123.4224 241.7083)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="363.22" y="338.77" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -123.4059 241.6894)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="363.23" y="338.73" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -123.4377 241.9144)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="363.24" y="338.69" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -123.4267 241.923)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="363.25" y="338.66" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -123.4101 241.9043)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="363.26" y="338.62" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -123.3887 241.8609)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="363.27" y="338.58" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -123.5394 242.6888)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="363.27" y="338.54" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -123.5223 242.6672)" className="palma196" width="4.46" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="363.28" y="338.5" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -123.5057 242.6484)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="363.29" y="338.46" transform="matrix(0.8505 -0.526 0.526 0.8505 -123.5376 242.8769)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="363.3" y="338.42" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -123.5128 242.8158)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="363.31" y="338.39" transform="matrix(0.8505 -0.526 0.526 0.8505 -123.504 242.8363)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="363.32" y="338.35" transform="matrix(0.8505 -0.526 0.526 0.8505 -123.4879 242.8202)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="363.32" y="338.31" transform="matrix(0.8505 -0.526 0.526 0.8505 -123.4713 242.8013)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="363.33" y="338.27" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -123.6109 243.5831)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="363.34" y="338.23" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -123.643 243.8151)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="363.35" y="338.19" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -123.6253 243.7905)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="363.36" y="338.15" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -123.6091 243.7744)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="363.37" y="338.12" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -123.5925 243.7553)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						<polygon className="palma219" points="363.8,339.56 363.5,339.08 366.61,337.15 366.9,337.63 						"/>
					</g>
					<g className="palma220">
						
							<rect x="363.38" y="338.04" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -123.7691 244.808)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="363.39" y="338" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -123.7477 244.7639)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="363.4" y="337.96" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -123.7229 244.7029)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="363.41" y="337.92" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -123.7143 244.7258)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="363.42" y="337.88" transform="matrix(0.8479 -0.5301 0.5301 0.8479 -123.7458 244.9589)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="363.43" y="337.84" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -123.8796 245.7331)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="363.43" y="337.81" transform="matrix(0.847 -0.5315 0.5315 0.847 -123.8682 245.7415)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="363.44" y="337.77" transform="matrix(0.8468 -0.5319 0.5319 0.8468 -123.8939 245.9478)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="363.45" y="337.73" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -124.0346 246.7682)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="363.46" y="337.69" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -124.0179 246.749)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="363.47" y="337.65" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -124.0479 246.981)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="363.48" y="337.61" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -124.0312 246.9616)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="363.49" y="337.57" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -124.1617 247.7391)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="363.49" y="337.54" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -124.1913 247.9718)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="363.5" y="337.5" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -124.1745 247.9526)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="363.51" y="337.46" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -124.3521 248.9982)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="363.52" y="337.42" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -124.3354 248.9787)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="363.53" y="337.38" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -124.508 250.0106)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="363.54" y="337.34" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -124.4906 249.9882)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="363.54" y="337.3" transform="matrix(0.8418 -0.5398 0.5398 0.8418 -124.5261 250.2623)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="363.55" y="337.27" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -124.6507 251.0392)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="363.56" y="337.23" transform="matrix(0.8407 -0.5415 0.5415 0.8407 -124.6744 251.2492)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="363.57" y="337.19" transform="matrix(0.8397 -0.543 0.543 0.8397 -124.8037 252.0642)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="363.58" y="337.15" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -124.9685 253.0924)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="363.59" y="337.11" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -124.9951 253.3272)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="363.59" y="337.07" transform="matrix(0.8371 -0.547 0.547 0.8371 -125.1575 254.3588)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="363.6" y="337.03" transform="matrix(0.8369 -0.5474 0.5474 0.8369 -125.1799 254.5714)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="363.61" y="337" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -125.3458 255.6428)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="363.62" y="336.96" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -125.5025 256.6721)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="363.63" y="336.92" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -125.6629 257.7404)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="363.64" y="336.88" transform="matrix(0.832 -0.5547 0.5547 0.832 -125.818 258.7899)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="363.65" y="336.84" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -125.9669 259.8159)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="363.65" y="336.8" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -126.1611 261.1503)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="363.66" y="336.76" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -126.3052 262.1794)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="363.67" y="336.72" transform="matrix(0.8257 -0.5641 0.5641 0.8257 -126.6051 264.2698)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="363.68" y="336.69" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -126.7874 265.6103)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="363.69" y="336.65" transform="matrix(0.8216 -0.57 0.57 0.8216 -127.0761 267.73)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="363.7" y="336.61" transform="matrix(0.8192 -0.5735 0.5735 0.8192 -127.3476 269.7942)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="363.7" y="336.57" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -127.6532 272.1853)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="363.71" y="336.53" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -127.9434 274.5518)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="363.72" y="336.49" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -128.3563 278.0354)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="363.73" y="336.45" transform="matrix(0.805 -0.5933 0.5933 0.805 -128.7657 281.7151)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="363.74" y="336.42" transform="matrix(0.8007 -0.599 0.599 0.8007 -129.1268 285.2048)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="370.15" y="335.42" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.097 243.1574)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="370.16" y="335.38" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.0805 243.1389)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="370.17" y="335.34" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.0641 243.1203)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="370.18" y="335.31" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.0476 243.1018)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="370.19" y="335.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.0312 243.0832)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="370.19" y="335.23" transform="matrix(0.8542 -0.52 0.52 0.8542 -120.0148 243.0645)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="370.2" y="335.19" transform="matrix(0.8542 -0.52 0.52 0.8542 -119.9984 243.046)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="370.21" y="335.15" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -119.9772 243.0028)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="370.22" y="335.11" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -120.007 243.231)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="370.23" y="335.07" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -119.9905 243.2124)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="370.24" y="335.04" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -119.9786 243.2185)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="370.24" y="335" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -120.113 244.011)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="370.25" y="334.96" transform="matrix(0.853 -0.5219 0.5219 0.853 -120.1044 244.035)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="370.26" y="334.92" transform="matrix(0.853 -0.5219 0.5219 0.853 -120.0879 244.0164)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="370.27" y="334.88" transform="matrix(0.853 -0.5219 0.5219 0.853 -120.0713 243.9977)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="370.28" y="334.84" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -120.0424 243.9117)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="370.29" y="334.8" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -120.0265 243.8958)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="370.29" y="334.77" transform="matrix(0.853 -0.5218 0.5218 0.853 -120.0174 243.9169)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="370.3" y="334.73" transform="matrix(0.853 -0.5218 0.5218 0.853 -120.0009 243.8983)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="370.31" y="334.69" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -120.03 244.1272)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="370.32" y="334.65" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -120.0102 244.0906)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="370.33" y="334.61" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -119.9932 244.0689)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="370.34" y="334.57" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -119.9851 244.0958)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="370.35" y="334.53" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -120.1169 244.8867)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="370.35" y="334.5" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -120.1004 244.868)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="370.36" y="334.46" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -120.0798 244.8273)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="370.37" y="334.42" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -120.0629 244.8056)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="370.38" y="334.38" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -120.0463 244.7868)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="370.39" y="334.34" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -120.075 245.0164)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="370.4" y="334.3" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -120.0584 244.9977)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="370.41" y="334.26" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -120.0413 244.976)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="370.41" y="334.23" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -120.0298 244.9849)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="370.42" y="334.19" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -120.1594 245.7744)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="370.43" y="334.15" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -120.1384 245.7306)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="370.44" y="334.11" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -120.1299 245.7572)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="370.45" y="334.07" transform="matrix(0.8505 -0.526 0.526 0.8505 -120.1576 245.9846)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="370.46" y="334.03" transform="matrix(0.8505 -0.526 0.526 0.8505 -120.141 245.9656)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="370.46" y="333.99" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -120.1167 245.9044)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="370.47" y="333.96" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -120.1002 245.8854)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="370.48" y="333.92" transform="matrix(0.8505 -0.526 0.526 0.8505 -120.0907 245.9062)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="370.49" y="333.88" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -120.2186 246.697)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="370.5" y="333.84" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -120.2419 246.903)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="370.51" y="333.8" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -120.2252 246.8842)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="370.51" y="333.76" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -120.2135 246.893)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="370.52" y="333.72" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -120.1959 246.8683)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="370.53" y="333.68" transform="matrix(0.8485 -0.5292 0.5292 0.8485 -120.3215 247.6578)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="370.54" y="333.65" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -120.3561 247.932)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="370.55" y="333.61" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -120.3394 247.9131)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="370.56" y="333.57" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -120.3228 247.894)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="370.57" y="333.53" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -120.2944 247.8075)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="370.57" y="333.49" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -120.4682 248.8869)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="370.58" y="333.45" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -120.4515 248.8677)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="370.59" y="333.41" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -120.4347 248.8487)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="370.6" y="333.38" transform="matrix(0.8468 -0.5319 0.5319 0.8468 -120.4609 249.0787)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="370.61" y="333.34" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -120.5891 249.9086)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="370.62" y="333.3" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -120.5724 249.8893)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="370.62" y="333.26" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -120.5943 250.0977)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="370.63" y="333.22" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -120.5817 250.104)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="370.64" y="333.18" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -120.6997 250.8843)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="370.65" y="333.14" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -120.7329 251.1643)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="370.66" y="333.11" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -120.7091 251.1026)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="370.67" y="333.07" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -120.8745 252.1818)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="370.68" y="333.03" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -120.8534 252.137)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="370.68" y="332.99" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -121.0094 253.1737)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="370.69" y="332.95" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -120.9924 253.1544)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="370.7" y="332.91" transform="matrix(0.8418 -0.5397 0.5397 0.8418 -121.0176 253.3938)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="370.71" y="332.87" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -121.1358 254.2132)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="370.72" y="332.84" transform="matrix(0.8406 -0.5416 0.5416 0.8406 -121.1594 254.448)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="370.73" y="332.8" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -121.2697 255.2299)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="370.73" y="332.76" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -121.4212 256.2852)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="370.74" y="332.72" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -121.444 256.5214)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="370.75" y="332.68" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -121.5961 257.6)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="370.76" y="332.64" transform="matrix(0.8359 -0.5489 0.5489 0.8359 -121.7388 258.6338)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="370.77" y="332.6" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -121.7575 258.8517)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="370.78" y="332.57" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -121.9039 259.9308)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="370.78" y="332.53" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -122.0417 260.9675)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="370.79" y="332.49" transform="matrix(0.832 -0.5548 0.5548 0.832 -122.1831 262.0459)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="370.8" y="332.45" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -122.3156 263.0794)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="370.81" y="332.41" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -122.4855 264.3996)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="370.82" y="332.37" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -122.6131 265.4364)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="370.83" y="332.33" transform="matrix(0.8257 -0.5642 0.5642 0.8257 -122.8841 267.5709)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="370.84" y="332.29" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -123.0359 268.8501)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="370.84" y="332.26" transform="matrix(0.8216 -0.57 0.57 0.8216 -123.2965 271.026)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="370.85" y="332.22" transform="matrix(0.8189 -0.5739 0.5739 0.8189 -123.5682 273.3786)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="370.86" y="332.18" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -123.8031 275.512)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="370.87" y="332.14" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -124.0589 277.9219)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="370.88" y="332.1" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -124.4109 281.3755)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="370.89" y="332.06" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -124.7398 284.8456)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="370.89" y="332.02" transform="matrix(0.8007 -0.599 0.599 0.8007 -125.0702 288.6164)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<path className="palma20" d="M306.6,369.32c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L306.6,369.32z"/>
					<path className="palma30" d="M307.98,370.91c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C307.72,370.41,307.97,370.55,307.98,370.91z"/>
					<path className="palma33" d="M307.87,370.98c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C307.66,370.58,307.86,370.69,307.87,370.98z"/>
				</g>
				<g>
					<path className="palma20" d="M313.69,364.99c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L313.69,364.99z"/>
					<path className="palma30" d="M315.07,366.58c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C314.8,366.08,315.06,366.22,315.07,366.58z"/>
					<path className="palma33" d="M314.96,366.64c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25s0.19-0.64,0.43-0.79
						C314.75,366.24,314.95,366.36,314.96,366.64z"/>
				</g>
				<g>
					<path className="palma20" d="M320.77,360.58c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L320.77,360.58z"/>
					<path className="palma30" d="M322.15,362.17c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C321.89,361.67,322.14,361.81,322.15,362.17z"/>
					<path className="palma33" d="M322.04,362.24c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C321.83,361.84,322.04,361.95,322.04,362.24z"/>
				</g>
				<g>
					<path className="palma20" d="M327.86,356.23c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L327.86,356.23z"/>
					<path className="palma30" d="M329.24,357.82c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C328.97,357.32,329.23,357.46,329.24,357.82z"/>
					
						<ellipse transform="matrix(0.4797 -0.8774 0.8774 0.4797 -143.2447 474.7573)" className="palma33" cx="328.68" cy="358.16" rx="0.64" ry="0.37"/>
				</g>
				<g>
					<path className="palma20" d="M334.95,352c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L334.95,352z"/>
					<path className="palma30" d="M336.33,353.59c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C336.06,353.09,336.32,353.23,336.33,353.59z"/>
					<path className="palma33" d="M336.22,353.66c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C336.01,353.26,336.21,353.37,336.22,353.66z"/>
				</g>
				<g>
					<path className="palma20" d="M342.04,347.66c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L342.04,347.66z"/>
					<path className="palma30" d="M343.41,349.25c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C343.15,348.75,343.41,348.89,343.41,349.25z"/>
					<path className="palma33" d="M343.31,349.31c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C343.09,348.91,343.3,349.03,343.31,349.31z"/>
				</g>
				<g>
					<path className="palma20" d="M349.12,343.38c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L349.12,343.38z"/>
					<path className="palma30" d="M350.5,344.97c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C350.24,344.47,350.49,344.61,350.5,344.97z"/>
					
						<ellipse transform="matrix(0.4797 -0.8774 0.8774 0.4797 -120.9014 486.7273)" className="palma33" cx="349.95" cy="345.31" rx="0.64" ry="0.37"/>
				</g>
				<g>
					<path className="palma20" d="M356.21,339.07c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L356.21,339.07z"/>
					<path className="palma30" d="M357.59,340.65c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C357.33,340.16,357.58,340.3,357.59,340.65z"/>
					<path className="palma33" d="M357.48,340.72c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C357.27,340.32,357.47,340.43,357.48,340.72z"/>
				</g>
				<g>
					<path className="palma20" d="M363.3,334.75c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L363.3,334.75z"/>
					<path className="palma30" d="M364.68,336.34c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C364.41,335.84,364.67,335.98,364.68,336.34z"/>
					<path className="palma33" d="M364.57,336.4c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C364.36,336,364.56,336.12,364.57,336.4z"/>
				</g>
				<g>
					<path className="palma20" d="M370.38,330.36c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L370.38,330.36z"/>
					<path className="palma30" d="M371.76,331.95c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C371.5,331.45,371.75,331.59,371.76,331.95z"/>
					<path className="palma33" d="M371.65,332.01c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C371.44,331.61,371.65,331.73,371.65,332.01z"/>
				</g>
			</g>
			<g>
				<polygon className="palma34" points="386.53,336.16 386.57,337.99 380.76,334.82 380.71,332.99 				"/>
				<polygon className="palma35" points="311.21,375.31 311.25,377.13 380.76,334.82 380.71,332.99 				"/>
				<polygon className="palma36" points="317.07,380.31 311.25,377.13 380.76,334.82 386.57,337.99 				"/>
				<path className="palma125" d="M311.21,375.31l5.81,3.18l69.58-42.37l-5.81-3.18L311.21,375.31z M385.27,335.82l-6.84-1l2.37-1.45
					L385.27,335.82z M379.5,339.34l-6.84-1l2.37-1.45L379.5,339.34z M375.41,336.66l2.37-1.45l2.09,3.89L375.41,336.66z
					 M373.73,342.85l-6.84-1l2.37-1.45L373.73,342.85z M369.64,340.18l2.37-1.45l2.09,3.89L369.64,340.18z M367.97,346.36l-6.84-1
					l2.37-1.45L367.97,346.36z M363.88,343.69l2.37-1.45l2.09,3.89L363.88,343.69z M362.2,349.87l-6.84-1l2.37-1.45L362.2,349.87z
					 M358.11,347.2l2.37-1.45l2.09,3.89L358.11,347.2z M356.43,353.38l-6.84-1l2.37-1.45L356.43,353.38z M352.34,350.71l2.37-1.45
					l2.09,3.89L352.34,350.71z M350.67,356.89l-6.84-1l2.37-1.45L350.67,356.89z M346.58,354.22l2.37-1.45l2.09,3.89L346.58,354.22z
					 M344.9,360.4l-6.84-1l2.37-1.45L344.9,360.4z M340.81,357.73l2.37-1.45l2.09,3.89L340.81,357.73z M339.13,363.92l-6.84-1
					l2.37-1.45L339.13,363.92z M335.04,361.24l2.37-1.45l2.09,3.89L335.04,361.24z M333.37,367.43l-6.84-1l2.37-1.45L333.37,367.43z
					 M329.28,364.75l2.37-1.45l2.09,3.89L329.28,364.75z M327.6,370.94l-6.84-1l2.37-1.45L327.6,370.94z M323.51,368.27l2.37-1.45
					l2.09,3.89L323.51,368.27z M321.83,374.45l-6.84-1l2.37-1.45L321.83,374.45z M317.74,371.78l2.37-1.45l2.09,3.89L317.74,371.78z
					 M322.27,374.84l-5.13,3.12l-2.26-4.2L322.27,374.84z M320.65,370.25l7.39,1.08l-5.13,3.12L320.65,370.25z M326.42,366.74
					l7.39,1.08l-5.13,3.12L326.42,366.74z M332.18,363.23l7.39,1.08l-5.13,3.12L332.18,363.23z M337.95,359.72l7.39,1.08l-5.13,3.12
					L337.95,359.72z M343.72,356.21l7.39,1.08l-5.13,3.12L343.72,356.21z M349.48,352.7l7.39,1.08l-5.13,3.12L349.48,352.7z
					 M355.25,349.18l7.39,1.08l-5.13,3.12L355.25,349.18z M361.02,345.67l7.39,1.08l-5.13,3.12L361.02,345.67z M366.78,342.16
					l7.39,1.08l-5.13,3.12L366.78,342.16z M372.55,338.65l7.39,1.08l-5.13,3.12L372.55,338.65z M378.32,335.14l7.39,1.08l-5.13,3.12
					L378.32,335.14z M314.35,373.84l2.09,3.89l-4.47-2.44L314.35,373.84z"/>
				<polygon className="palma35" points="317.02,378.48 317.07,380.31 386.57,337.99 386.53,336.16 				"/>
				<polygon className="palma34" points="317.02,378.48 317.07,380.31 311.25,377.13 311.21,375.31 				"/>
			</g>
			<g>
				<g>
					<path className="palma20" d="M320.51,376.96c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L320.51,376.96z"/>
					<path className="palma30" d="M321.89,378.55c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C321.62,378.05,321.88,378.19,321.89,378.55z"/>
					<path className="palma33" d="M321.78,378.62c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C321.56,378.22,321.77,378.33,321.78,378.62z"/>
				</g>
				<g>
					<path className="palma20" d="M327.59,372.63c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L327.59,372.63z"/>
					<path className="palma30" d="M328.97,374.22c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C328.71,373.72,328.96,373.86,328.97,374.22z"/>
					<path className="palma33" d="M328.86,374.28c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C328.65,373.88,328.86,374,328.86,374.28z"/>
				</g>
				<g>
					<path className="palma20" d="M334.68,368.22c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L334.68,368.22z"/>
					<path className="palma30" d="M336.06,369.81c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C335.79,369.31,336.05,369.45,336.06,369.81z"/>
					<path className="palma33" d="M335.95,369.87c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C335.74,369.47,335.94,369.59,335.95,369.87z"/>
				</g>
				<g>
					<path className="palma20" d="M341.77,363.87c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L341.77,363.87z"/>
					<path className="palma30" d="M343.14,365.46c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C342.88,364.96,343.14,365.1,343.14,365.46z"/>
					<path className="palma33" d="M343.04,365.53c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C342.82,365.13,343.03,365.24,343.04,365.53z"/>
				</g>
				<g>
					<path className="palma20" d="M348.85,359.64c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L348.85,359.64z"/>
					<path className="palma30" d="M350.23,361.23c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C349.97,360.73,350.23,360.87,350.23,361.23z"/>
					<path className="palma33" d="M350.12,361.3c0.01,0.29-0.19,0.64-0.43,0.79s-0.45,0.04-0.46-0.25c-0.01-0.29,0.19-0.64,0.43-0.79
						C349.91,360.9,350.12,361.01,350.12,361.3z"/>
				</g>
				<g>
					<path className="palma20" d="M355.94,355.3c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L355.94,355.3z"/>
					<path className="palma30" d="M357.32,356.89c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C357.06,356.39,357.31,356.53,357.32,356.89z"/>
					<path className="palma33" d="M357.21,356.95c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C357,356.55,357.2,356.66,357.21,356.95z"/>
				</g>
				<g>
					<path className="palma20" d="M363.03,351.02c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L363.03,351.02z"/>
					<path className="palma30" d="M364.41,352.61c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C364.15,352.11,364.4,352.25,364.41,352.61z"/>
					<path className="palma33" d="M364.3,352.67c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C364.09,352.27,364.29,352.39,364.3,352.67z"/>
				</g>
				<g>
					<path className="palma20" d="M370.12,346.7c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L370.12,346.7z"/>
					<path className="palma30" d="M371.5,348.29c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C371.23,347.8,371.49,347.94,371.5,348.29z"/>
					<path className="palma33" d="M371.39,348.36c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C371.18,347.96,371.38,348.07,371.39,348.36z"/>
				</g>
				<g>
					<path className="palma20" d="M377.2,342.39c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.08-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L377.2,342.39z"/>
					<path className="palma30" d="M378.58,343.98c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C378.32,343.48,378.58,343.62,378.58,343.98z"/>
					<path className="palma33" d="M378.47,344.04c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C378.26,343.64,378.47,343.75,378.47,344.04z"/>
				</g>
				<g>
					<path className="palma20" d="M384.29,338c-0.01-0.01-0.02-0.03-0.04-0.04l0,0l0,0c-0.11-0.09-0.26-0.08-0.44,0.02
						c-0.31,0.19-0.55,0.63-0.54,0.99c0,0.16,0.06,0.28,0.14,0.34l0,0l1.29,1.3l0.82-1.36L384.29,338z"/>
					<path className="palma30" d="M385.67,339.59c0.01,0.36-0.23,0.8-0.54,0.99c-0.31,0.19-0.56,0.05-0.57-0.31
						c-0.01-0.36,0.23-0.8,0.54-0.99C385.41,339.09,385.66,339.23,385.67,339.59z"/>
					<path className="palma33" d="M385.56,339.65c0.01,0.29-0.19,0.64-0.43,0.79c-0.25,0.15-0.45,0.04-0.46-0.25
						c-0.01-0.29,0.19-0.64,0.43-0.79C385.35,339.25,385.55,339.36,385.56,339.65z"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="320.28" y="381.87" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.5225 223.9989)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="320.29" y="381.83" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.5061 223.9802)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="320.3" y="381.79" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.4895 223.9617)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="320.31" y="381.76" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.4731 223.9431)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="320.31" y="381.72" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.4566 223.9246)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="320.32" y="381.68" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -151.4323 223.8823)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="320.33" y="381.64" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.4238 223.8873)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="320.34" y="381.6" transform="matrix(0.8542 -0.52 0.52 0.8542 -151.4073 223.8688)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="320.35" y="381.56" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.6063 224.4991)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="320.36" y="381.52" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.5897 224.4805)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="320.37" y="381.49" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -151.5596 224.4207)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="320.37" y="381.45" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -151.5433 224.402)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="320.38" y="381.41" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -151.5404 224.4245)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="320.39" y="381.37" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -151.516 224.3821)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="320.4" y="381.33" transform="matrix(0.8533 -0.5215 0.5215 0.8533 -151.5675 224.569)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="320.41" y="381.29" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -151.6054 224.7146)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="320.42" y="381.25" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -151.5967 224.7197)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="320.42" y="381.22" transform="matrix(0.853 -0.5219 0.5219 0.853 -151.5938 224.742)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="320.43" y="381.18" transform="matrix(0.853 -0.5219 0.5219 0.853 -151.5773 224.7233)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="320.44" y="381.14" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -151.6394 224.9431)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="320.45" y="381.1" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -151.6093 224.8833)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="320.46" y="381.06" transform="matrix(0.8523 -0.523 0.523 0.8523 -151.728 225.2752)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="320.47" y="381.02" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.7037 225.2326)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="320.47" y="380.98" transform="matrix(0.8523 -0.523 0.523 0.8523 -151.7007 225.2549)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="320.48" y="380.94" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.6706 225.1952)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="320.49" y="380.91" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -151.6541 225.1765)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="320.5" y="380.87" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -151.7716 225.5659)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="320.51" y="380.83" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -151.7635 225.573)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="320.52" y="380.79" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -151.8247 225.7915)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="320.53" y="380.75" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -151.8087 225.7746)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="320.53" y="380.71" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -151.9188 226.1437)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="320.54" y="380.67" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -151.9017 226.123)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="320.55" y="380.64" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -151.8717 226.0632)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="320.56" y="380.6" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -151.8551 226.0444)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="320.57" y="380.56" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -151.9854 226.4761)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="320.58" y="380.52" transform="matrix(0.8505 -0.526 0.526 0.8505 -152.0468 226.6973)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="320.58" y="380.48" transform="matrix(0.8505 -0.526 0.526 0.8505 -152.0302 226.6784)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="320.59" y="380.44" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -152.0003 226.6186)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="320.6" y="380.4" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -152.1164 227.0092)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="320.61" y="380.37" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -152.0998 226.9902)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="320.62" y="380.33" transform="matrix(0.85 -0.5267 0.5267 0.85 -152.0964 227.0122)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="320.63" y="380.29" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.2764 227.6023)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="320.64" y="380.25" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.2592 227.5816)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="320.64" y="380.21" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -152.2431 227.5645)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="320.65" y="380.17" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -152.358 227.9543)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="320.66" y="380.13" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -152.3283 227.8945)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="320.67" y="380.1" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -152.3946 228.1338)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="320.68" y="380.06" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -152.5087 228.5235)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="320.69" y="380.02" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -152.4926 228.5063)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="320.69" y="379.98" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -152.5921 228.8511)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="320.7" y="379.94" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -152.6532 229.0764)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="320.71" y="379.9" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -152.7662 229.4655)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="320.72" y="379.86" transform="matrix(0.847 -0.5316 0.5316 0.847 -152.7702 229.5115)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="320.73" y="379.83" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -152.9466 230.1031)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="320.74" y="379.79" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -152.9222 230.0595)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="320.75" y="379.75" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -153.0339 230.4481)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="320.75" y="379.71" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -153.094 230.673)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="320.76" y="379.67" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -153.1924 231.0208)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="320.77" y="379.63" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -153.303 231.4089)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="320.78" y="379.59" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -153.376 231.6774)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="320.79" y="379.55" transform="matrix(0.844 -0.5364 0.5364 0.844 -153.4727 232.0228)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="320.8" y="379.52" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -153.6513 232.6336)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="320.8" y="379.48" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -153.6338 232.6123)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="320.81" y="379.44" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -153.8187 233.2465)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="320.82" y="379.4" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -153.9143 233.5932)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="320.83" y="379.36" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -154.0977 234.2279)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="320.84" y="379.32" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -154.2048 234.6146)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="320.85" y="379.28" transform="matrix(0.8403 -0.5422 0.5422 0.8403 -154.3669 235.1842)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="320.86" y="379.25" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -154.4723 235.5687)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="320.86" y="379.21" transform="matrix(0.839 -0.5441 0.5441 0.839 -154.6655 236.2467)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="320.87" y="379.17" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -154.833 236.8422)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="320.88" y="379.13" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -155.1323 237.8843)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="320.89" y="379.09" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -155.3023 238.4962)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="320.9" y="379.05" transform="matrix(0.8352 -0.55 0.55 0.8352 -155.5858 239.4983)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="320.91" y="379.01" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -155.7609 240.1365)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="320.91" y="378.98" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -156.0406 241.1393)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="320.92" y="378.94" transform="matrix(0.832 -0.5547 0.5547 0.832 -156.3227 242.1587)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="320.93" y="378.9" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -156.597 243.1595)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="320.94" y="378.86" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -156.9542 244.4626)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="320.95" y="378.82" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -157.3244 245.8269)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="320.96" y="378.78" transform="matrix(0.8262 -0.5634 0.5634 0.8262 -157.667 247.107)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="320.96" y="378.74" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -158.1108 248.7733)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="320.97" y="378.71" transform="matrix(0.8216 -0.57 0.57 0.8216 -158.6675 250.886)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="320.98" y="378.67" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -159.0905 252.5282)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="320.99" y="378.63" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -159.691 254.8809)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="321" y="378.59" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -160.3601 257.5558)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="321.01" y="378.55" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -161.1939 260.9685)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="321.01" y="378.51" transform="matrix(0.8053 -0.5928 0.5928 0.8053 -161.9812 264.2947)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="321.02" y="378.47" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -162.9206 268.3931)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="327.32" y="377.65" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.3006 227.0426)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="327.33" y="377.61" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2842 227.024)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="327.33" y="377.57" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2677 227.0054)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="327.34" y="377.53" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2512 226.9868)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="327.35" y="377.49" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2348 226.9682)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="327.36" y="377.46" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2183 226.9497)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="327.37" y="377.42" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.2019 226.9311)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="327.38" y="377.38" transform="matrix(0.8542 -0.52 0.52 0.8542 -148.1854 226.9126)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="327.39" y="377.34" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -148.3745 227.5479)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="327.39" y="377.3" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.3505 227.5053)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="327.4" y="377.26" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.334 227.4867)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="327.41" y="377.22" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -148.3114 227.4487)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="327.42" y="377.19" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -148.3086 227.4735)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="327.43" y="377.15" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -148.2921 227.4548)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="327.44" y="377.11" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -148.2757 227.4361)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="327.44" y="377.07" transform="matrix(0.853 -0.5219 0.5219 0.853 -148.3887 227.8316)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="327.45" y="377.03" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -148.3593 227.7716)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="327.46" y="376.99" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -148.3428 227.7529)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="327.47" y="376.95" transform="matrix(0.853 -0.5218 0.5218 0.853 -148.3317 227.7516)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="327.48" y="376.92" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -148.3902 227.9731)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="327.49" y="376.88" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -148.3737 227.9545)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="327.5" y="376.84" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -148.4732 228.3082)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="327.5" y="376.8" transform="matrix(0.8523 -0.523 0.523 0.8523 -148.4648 228.3156)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="327.51" y="376.76" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -148.4605 228.3362)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="327.52" y="376.72" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -148.444 228.3174)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="327.53" y="376.68" transform="matrix(0.8523 -0.523 0.523 0.8523 -148.4146 228.2574)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="327.54" y="376.65" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -148.5188 228.628)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="327.55" y="376.61" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -148.5023 228.6092)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="327.55" y="376.57" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -148.5604 228.8315)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="327.56" y="376.53" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -148.5433 228.8107)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="327.57" y="376.49" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.655 229.2071)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="327.58" y="376.45" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.6384 229.1884)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="327.59" y="376.41" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -148.6293 229.1937)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="327.6" y="376.38" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -148.6006 229.1356)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="327.61" y="376.34" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -148.7025 229.5014)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="327.61" y="376.3" transform="matrix(0.8505 -0.526 0.526 0.8505 -148.7735 229.7678)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="327.62" y="376.26" transform="matrix(0.8505 -0.526 0.526 0.8505 -148.7563 229.7469)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="327.63" y="376.22" transform="matrix(0.8505 -0.526 0.526 0.8505 -148.7403 229.7301)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="327.64" y="376.18" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -148.8375 230.0825)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="327.65" y="376.14" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -148.8209 230.0636)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="327.66" y="376.1" transform="matrix(0.85 -0.5267 0.5267 0.85 -148.8169 230.086)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="327.66" y="376.07" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -149.0001 230.7221)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="327.67" y="376.03" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -148.9715 230.664)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="327.68" y="375.99" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -148.9469 230.6187)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="327.69" y="375.95" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -149.0629 231.0361)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="327.7" y="375.91" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -149.0462 231.0172)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="327.71" y="375.87" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -149.0909 231.2004)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="327.72" y="375.83" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -149.2113 231.6346)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="327.72" y="375.8" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -149.1946 231.6155)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="327.73" y="375.76" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -149.2895 231.9669)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="327.74" y="375.72" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -149.339 232.1679)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="327.75" y="375.68" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -149.4463 232.5623)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="327.76" y="375.64" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -149.429 232.5411)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="327.77" y="375.6" transform="matrix(0.8464 -0.5326 0.5326 0.8464 -149.5961 233.1373)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="327.77" y="375.56" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -149.5916 233.1592)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="327.78" y="375.53" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -149.6972 233.5511)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="327.79" y="375.49" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -149.7461 233.7533)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="327.8" y="375.45" transform="matrix(0.8452 -0.5344 0.5344 0.8452 -149.8388 234.1038)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="327.81" y="375.41" transform="matrix(0.8448 -0.5351 0.5351 0.8448 -149.9433 234.495)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="327.82" y="375.37" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -149.9991 234.7227)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="327.83" y="375.33" transform="matrix(0.844 -0.5364 0.5364 0.844 -150.1107 235.1406)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="327.83" y="375.29" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -150.2857 235.7774)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="327.84" y="375.26" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -150.2694 235.76)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="327.85" y="375.22" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -150.4363 236.3722)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="327.86" y="375.18" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -150.5268 236.7237)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="327.87" y="375.14" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -150.6996 237.3614)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="327.88" y="375.1" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -150.8004 237.7514)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="327.88" y="375.06" transform="matrix(0.8402 -0.5422 0.5422 0.8402 -150.9605 238.3506)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="327.89" y="375.02" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -151.0602 238.7399)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="327.9" y="374.98" transform="matrix(0.839 -0.5441 0.5441 0.839 -151.2228 239.3533)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="327.91" y="374.95" transform="matrix(0.8383 -0.5451 0.5451 0.8383 -151.3814 239.9556)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="327.92" y="374.91" transform="matrix(0.8371 -0.547 0.547 0.8371 -151.6644 241.0057)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="327.93" y="374.87" transform="matrix(0.8363 -0.5482 0.5482 0.8363 -151.843 241.6887)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="327.94" y="374.83" transform="matrix(0.8352 -0.55 0.55 0.8352 -152.1106 242.6984)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="327.94" y="374.79" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -152.2686 243.3159)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="327.95" y="374.75" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -152.5324 244.3262)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="327.96" y="374.71" transform="matrix(0.832 -0.5548 0.5548 0.832 -152.8043 245.3753)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="327.97" y="374.68" transform="matrix(0.8308 -0.5566 0.5566 0.8308 -153.0747 246.4284)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="327.98" y="374.64" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -153.3929 247.6725)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="327.99" y="374.6" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -153.7527 249.0893)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="327.99" y="374.56" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -154.0708 250.3626)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="328" y="374.52" transform="matrix(0.8242 -0.5664 0.5664 0.8242 -154.4861 252.0326)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="328.01" y="374.48" transform="matrix(0.8217 -0.57 0.57 0.8217 -154.9984 254.1159)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="328.02" y="374.44" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -155.4684 256.0663)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="328.03" y="374.41" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -155.9661 258.1674)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="328.04" y="374.37" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -156.5995 260.8879)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="328.04" y="374.33" transform="matrix(0.8099 -0.5865 0.5865 0.8099 -157.2764 263.8708)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="328.05" y="374.29" transform="matrix(0.8058 -0.5922 0.5922 0.8058 -158.0265 267.2743)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="328.06" y="374.25" transform="matrix(0.7999 -0.6001 0.6001 0.7999 -159.0366 272.0248)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="334.44" y="373.16" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.9256 230.0923)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="334.45" y="373.12" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.9091 230.0737)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="334.46" y="373.08" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8927 230.055)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="334.47" y="373.04" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8762 230.0365)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="334.48" y="373" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8597 230.0179)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="334.49" y="372.96" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8433 229.9994)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="334.49" y="372.93" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8268 229.9808)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="334.5" y="372.89" transform="matrix(0.8542 -0.52 0.52 0.8542 -144.8104 229.9621)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="334.51" y="372.85" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -144.982 230.5786)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="334.52" y="372.81" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -144.9655 230.5599)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="334.53" y="372.77" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -144.949 230.5413)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="334.54" y="372.73" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -144.9274 230.5052)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="334.54" y="372.69" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -144.9233 230.5282)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="334.55" y="372.65" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -144.9068 230.5096)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="334.56" y="372.62" transform="matrix(0.8532 -0.5215 0.5215 0.8532 -144.9525 230.7018)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="334.57" y="372.58" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -144.9846 230.8479)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="334.58" y="372.54" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -144.9681 230.8293)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="334.59" y="372.5" transform="matrix(0.853 -0.5218 0.5218 0.853 -144.9567 230.828)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="334.59" y="372.46" transform="matrix(0.853 -0.5218 0.5218 0.853 -144.9402 230.8093)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="334.6" y="372.42" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -144.9949 231.0328)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="334.61" y="372.38" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -144.9661 230.9724)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="334.62" y="372.35" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -145.0713 231.3687)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="334.63" y="372.31" transform="matrix(0.8523 -0.523 0.523 0.8523 -145.0626 231.3763)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="334.64" y="372.27" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -145.0583 231.3993)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="334.65" y="372.23" transform="matrix(0.8523 -0.5231 0.5231 0.8523 -145.0418 231.3806)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="334.65" y="372.19" transform="matrix(0.8523 -0.523 0.523 0.8523 -145.013 231.3202)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="334.66" y="372.15" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -145.1112 231.6938)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="334.67" y="372.11" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -145.0947 231.675)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="334.68" y="372.08" transform="matrix(0.8516 -0.5242 0.5242 0.8516 -145.1611 231.9409)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="334.69" y="372.04" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -145.1324 231.8804)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="334.7" y="372" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.2369 232.278)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="334.71" y="371.96" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.2204 232.2593)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="334.71" y="371.92" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.2044 232.2425)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="334.72" y="371.88" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -145.1822 232.2043)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="334.73" y="371.84" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -145.2792 232.5771)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="334.74" y="371.81" transform="matrix(0.8505 -0.526 0.526 0.8505 -145.3451 232.8437)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="334.75" y="371.77" transform="matrix(0.8505 -0.526 0.526 0.8505 -145.3285 232.8249)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="334.76" y="371.73" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -145.3 232.7644)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="334.76" y="371.69" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -145.4033 233.1613)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="334.77" y="371.65" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -145.3866 233.1425)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="334.78" y="371.61" transform="matrix(0.85 -0.5267 0.5267 0.85 -145.382 233.1651)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="334.79" y="371.57" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -145.5429 233.7648)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="334.8" y="371.53" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -145.5193 233.7213)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="334.81" y="371.5" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -145.5026 233.7023)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="334.82" y="371.46" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -145.6047 234.0986)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="334.82" y="371.42" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -145.5951 234.1042)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="334.83" y="371.38" transform="matrix(0.8486 -0.529 0.529 0.8486 -145.6484 234.3306)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="334.84" y="371.34" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -145.7497 234.7266)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="334.85" y="371.3" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -145.733 234.7076)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="334.86" y="371.26" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -145.8221 235.0618)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="334.87" y="371.23" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -145.8681 235.2645)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="334.87" y="371.19" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -145.9677 235.6578)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="334.88" y="371.15" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -145.9522 235.6429)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="334.89" y="371.11" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -146.12 236.281)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="334.9" y="371.07" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -146.1044 236.2661)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="334.91" y="371.03" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -146.2027 236.6589)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="334.92" y="370.99" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -146.2483 236.8628)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="334.92" y="370.96" transform="matrix(0.8452 -0.5344 0.5344 0.8452 -146.3351 237.216)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="334.93" y="370.92" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -146.4399 237.6353)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="334.94" y="370.88" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -146.4918 237.8649)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="334.95" y="370.84" transform="matrix(0.844 -0.5364 0.5364 0.844 -146.589 238.2592)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="334.96" y="370.8" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -146.7541 238.9029)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="334.97" y="370.76" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -146.7372 238.8833)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="334.98" y="370.72" transform="matrix(0.8425 -0.5386 0.5386 0.8425 -146.8947 239.5025)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="334.98" y="370.69" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -146.9788 239.8547)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="334.99" y="370.65" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -147.1422 240.5015)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="335" y="370.61" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -147.2358 240.8923)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="335.01" y="370.57" transform="matrix(0.8402 -0.5422 0.5422 0.8402 -147.3868 241.4981)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="335.02" y="370.53" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -147.4793 241.8885)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="335.03" y="370.49" transform="matrix(0.839 -0.5441 0.5441 0.839 -147.6324 242.5086)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="335.03" y="370.45" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -147.7914 243.1545)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="335.04" y="370.42" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -148.0572 244.2124)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="335.05" y="370.38" transform="matrix(0.8363 -0.5482 0.5482 0.8363 -148.2134 244.8572)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="335.06" y="370.34" transform="matrix(0.8352 -0.55 0.55 0.8352 -148.4651 245.8766)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="335.07" y="370.3" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -148.6129 246.4987)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="335.08" y="370.26" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -148.8603 247.5165)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="335.09" y="370.22" transform="matrix(0.832 -0.5548 0.5548 0.832 -149.1156 248.5752)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="335.09" y="370.18" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -149.3581 249.5928)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="335.1" y="370.14" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -149.6563 250.846)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="335.11" y="370.11" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -150.0031 252.3138)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="335.12" y="370.07" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -150.3005 253.5961)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="335.13" y="370.03" transform="matrix(0.8242 -0.5664 0.5664 0.8242 -150.6884 255.2758)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="335.14" y="369.99" transform="matrix(0.8217 -0.57 0.57 0.8217 -151.1674 257.3755)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="335.14" y="369.95" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -151.6058 259.3393)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="335.15" y="369.91" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -152.0604 261.4141)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="335.16" y="369.87" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -152.6587 264.1932)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="335.17" y="369.84" transform="matrix(0.8099 -0.5865 0.5865 0.8099 -153.2873 267.1958)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="335.18" y="369.8" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -154.064 271.0241)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="335.19" y="369.76" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -154.8603 275.1165)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="341.53" y="368.85" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.6521 233.1495)" className="palma30" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="341.54" y="368.81" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.6357 233.1309)" className="palma303" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="341.55" y="368.77" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.6192 233.1124)" className="palma304" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="341.56" y="368.73" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.6028 233.0938)" className="palma305" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="341.56" y="368.69" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.5863 233.0751)" className="palma306" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="341.57" y="368.66" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.5698 233.0566)" className="palma307" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="341.58" y="368.62" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -141.5466 233.0137)" className="palma308" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="341.59" y="368.58" transform="matrix(0.8542 -0.52 0.52 0.8542 -141.5369 233.0195)" className="palma309" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="341.6" y="368.54" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -141.6988 233.6409)" className="palma310" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="341.61" y="368.5" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.6892 233.6466)" className="palma311" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="341.61" y="368.46" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -141.661 233.5859)" className="palma312" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="341.62" y="368.42" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.6562 233.6093)" className="palma313" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="341.63" y="368.39" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.6397 233.5907)" className="palma314" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="341.64" y="368.35" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -141.6232 233.5721)" className="palma315" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="341.65" y="368.31" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -141.7044 233.9053)" className="palma316" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="341.66" y="368.27" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -141.6885 233.8889)" className="palma317" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="341.67" y="368.23" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -141.6727 233.8726)" className="palma318" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="341.67" y="368.19" transform="matrix(0.853 -0.5218 0.5218 0.853 -141.6672 233.8937)" className="palma319" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="341.68" y="368.15" transform="matrix(0.853 -0.5219 0.5219 0.853 -141.6574 233.8994)" className="palma320" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="341.69" y="368.12" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -141.6967 234.0827)" className="palma321" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="341.7" y="368.08" transform="matrix(0.8523 -0.523 0.523 0.8523 -141.7963 234.4845)" className="palma322" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="341.71" y="368.04" transform="matrix(0.8523 -0.523 0.523 0.8523 -141.7798 234.4657)" className="palma323" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="341.72" y="368" transform="matrix(0.8523 -0.523 0.523 0.8523 -141.7681 234.4646)" className="palma324" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="341.72" y="367.96" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -141.7394 234.4015)" className="palma325" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="341.73" y="367.92" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -141.7235 234.3851)" className="palma326" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="341.74" y="367.88" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -141.707 234.3664)" className="palma327" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="341.75" y="367.84" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -141.8058 234.7674)" className="palma328" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="341.76" y="367.81" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -141.7893 234.7487)" className="palma329" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="341.77" y="367.77" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -141.8398 234.9748)" className="palma330" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="341.78" y="367.73" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -141.8233 234.956)" className="palma331" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="341.78" y="367.69" transform="matrix(0.8512 -0.5249 0.5249 0.8512 -141.9281 235.3815)" className="palma332" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="341.79" y="367.65" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -141.905 235.3382)" className="palma333" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="341.8" y="367.61" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -141.877 235.2774)" className="palma334" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="341.81" y="367.57" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -141.8718 235.3005)" className="palma335" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="341.82" y="367.54" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -141.9694 235.7008)" className="palma336" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="341.83" y="367.5" transform="matrix(0.8505 -0.526 0.526 0.8505 -142.0195 235.9278)" className="palma337" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="341.83" y="367.46" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -141.9922 235.8693)" className="palma338" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="341.84" y="367.42" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -141.9744 235.8458)" className="palma339" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="341.85" y="367.38" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -142.0719 236.2483)" className="palma340" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="341.86" y="367.34" transform="matrix(0.85 -0.5267 0.5267 0.85 -142.0661 236.2689)" className="palma341" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="341.87" y="367.3" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -142.0434 236.2278)" className="palma342" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="341.88" y="367.27" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -142.1949 236.8322)" className="palma343" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="341.89" y="367.23" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -142.1848 236.838)" className="palma344" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="341.89" y="367.19" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -142.1689 236.8213)" className="palma345" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="341.9" y="367.15" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -142.2633 237.2161)" className="palma346" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="341.91" y="367.11" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -142.2479 237.2018)" className="palma347" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="341.92" y="367.07" transform="matrix(0.8486 -0.529 0.529 0.8486 -142.2968 237.4278)" className="palma348" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="341.93" y="367.03" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -142.3852 237.8024)" className="palma349" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="341.94" y="367" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -142.3685 237.7833)" className="palma350" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="341.94" y="366.96" transform="matrix(0.8478 -0.5303 0.5303 0.8478 -142.4518 238.1403)" className="palma351" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="341.95" y="366.92" transform="matrix(0.8475 -0.5308 0.5308 0.8475 -142.501 238.3694)" className="palma352" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="341.96" y="366.88" transform="matrix(0.847 -0.5316 0.5316 0.847 -142.6059 238.8099)" className="palma353" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="341.97" y="366.84" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -142.5781 238.749)" className="palma354" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="341.98" y="366.8" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -142.7364 239.3942)" className="palma355" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="341.99" y="366.76" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -142.7202 239.3772)" className="palma356" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="342" y="366.73" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -142.8129 239.7753)" className="palma357" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="342" y="366.69" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -142.8505 239.9642)" className="palma358" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="342.01" y="366.65" transform="matrix(0.8452 -0.5345 0.5345 0.8452 -142.9424 240.3622)" className="palma359" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="342.02" y="366.61" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -143.0447 240.8015)" className="palma360" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="342.03" y="366.57" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -143.0929 241.0328)" className="palma361" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="342.04" y="366.53" transform="matrix(0.844 -0.5363 0.5363 0.844 -143.1723 241.3862)" className="palma362" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="342.05" y="366.49" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -143.3213 242.0121)" className="palma363" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="342.05" y="366.46" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -143.3045 241.9927)" className="palma364" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="342.06" y="366.42" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -143.4479 242.6002)" className="palma365" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="342.07" y="366.38" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -143.5369 242.9968)" className="palma366" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="342.08" y="366.34" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -143.6889 243.6441)" className="palma367" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="342.09" y="366.3" transform="matrix(0.841 -0.5411 0.5411 0.841 -143.7669 244.0009)" className="palma368" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="342.1" y="366.26" transform="matrix(0.8403 -0.5422 0.5422 0.8403 -143.9122 244.6278)" className="palma369" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="342.11" y="366.22" transform="matrix(0.8397 -0.543 0.543 0.8397 -144.0087 245.0625)" className="palma370" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="342.11" y="366.18" transform="matrix(0.839 -0.5441 0.5441 0.839 -144.148 245.6713)" className="palma371" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="342.12" y="366.15" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -144.2968 246.3221)" className="palma372" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="342.13" y="366.11" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -144.546 247.3881)" className="palma373" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="342.14" y="366.07" transform="matrix(0.8364 -0.5481 0.5481 0.8364 -144.676 247.9727)" className="palma374" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="342.15" y="366.03" transform="matrix(0.8352 -0.55 0.55 0.8352 -144.9212 249.039)" className="palma375" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="342.16" y="365.99" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -145.0653 249.6917)" className="palma376" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="342.16" y="365.95" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -145.2966 250.717)" className="palma377" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="342.17" y="365.91" transform="matrix(0.832 -0.5548 0.5548 0.832 -145.5353 251.7834)" className="palma378" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="342.18" y="365.88" transform="matrix(0.8309 -0.5565 0.5565 0.8309 -145.7551 252.7802)" className="palma379" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="342.19" y="365.84" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -146.0496 254.1123)" className="palma380" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="342.2" y="365.8" transform="matrix(0.8276 -0.5613 0.5613 0.8276 -146.3638 255.5493)" className="palma381" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="342.21" y="365.76" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -146.6441 256.8553)" className="palma382" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="342.21" y="365.72" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -146.9992 258.5182)" className="palma383" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="342.22" y="365.68" transform="matrix(0.8216 -0.57 0.57 0.8216 -147.4542 260.6739)" className="palma384" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="342.23" y="365.64" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -147.7928 262.3255)" className="palma385" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="342.24" y="365.61" transform="matrix(0.8169 -0.5768 0.5768 0.8169 -148.2777 264.7134)" className="palma386" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="342.25" y="365.57" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -148.8324 267.5115)" className="palma387" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="342.26" y="365.53" transform="matrix(0.8099 -0.5866 0.5866 0.8099 -149.4191 270.562)" className="palma388" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="342.26" y="365.49" transform="matrix(0.8053 -0.5928 0.5928 0.8053 -150.1246 274.3571)" className="palma389" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="342.27" y="365.45" transform="matrix(0.8003 -0.5997 0.5997 0.8003 -150.867 278.5347)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="348.59" y="364.7" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.4677 236.2158)" className="palma30" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="348.6" y="364.67" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.4513 236.1971)" className="palma303" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="348.61" y="364.63" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -138.4285 236.1541)" className="palma304" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="348.61" y="364.59" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.4184 236.16)" className="palma305" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="348.62" y="364.55" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.402 236.1415)" className="palma306" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="348.63" y="364.51" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.3856 236.1229)" className="palma307" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="348.64" y="364.47" transform="matrix(0.8542 -0.52 0.52 0.8542 -138.3691 236.1042)" className="palma308" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="348.65" y="364.43" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -138.4083 236.2978)" className="palma309" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="348.66" y="364.4" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -138.5115 236.7368)" className="palma310" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="348.67" y="364.36" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.4833 236.6733)" className="palma311" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="348.67" y="364.32" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.4721 236.675)" className="palma312" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="348.68" y="364.28" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.4556 236.6564)" className="palma313" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="348.69" y="364.24" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.4392 236.6377)" className="palma314" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="348.7" y="364.2" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -138.4227 236.6191)" className="palma315" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="348.71" y="364.16" transform="matrix(0.8533 -0.5214 0.5214 0.8533 -138.4568 236.7946)" className="palma316" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="348.72" y="364.13" transform="matrix(0.853 -0.5219 0.5219 0.853 -138.5065 237.0303)" className="palma317" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="348.72" y="364.09" transform="matrix(0.853 -0.5219 0.5219 0.853 -138.4901 237.0116)" className="palma318" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="348.73" y="364.05" transform="matrix(0.853 -0.5219 0.5219 0.853 -138.4736 236.9929)" className="palma319" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="348.74" y="364.01" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -138.4454 236.9294)" className="palma320" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="348.75" y="363.97" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -138.487 237.1346)" className="palma321" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="348.76" y="363.93" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -138.4816 237.1583)" className="palma322" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="348.77" y="363.89" transform="matrix(0.8523 -0.523 0.523 0.8523 -138.5747 237.5632)" className="palma323" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="348.78" y="363.86" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -138.5472 237.5022)" className="palma324" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="348.78" y="363.82" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -138.5307 237.4834)" className="palma325" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="348.79" y="363.78" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -138.5142 237.4647)" className="palma326" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="348.8" y="363.74" transform="matrix(0.8523 -0.523 0.523 0.8523 -138.5034 237.4682)" className="palma327" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="348.81" y="363.7" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -138.5966 237.8751)" className="palma328" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="348.82" y="363.66" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -138.5795 237.8539)" className="palma329" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="348.83" y="363.62" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -138.6208 238.0597)" className="palma330" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="348.83" y="363.59" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -138.6048 238.0434)" className="palma331" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="348.84" y="363.55" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.6961 238.4452)" className="palma332" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="348.85" y="363.51" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.6693 238.3865)" className="palma333" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="348.86" y="363.47" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.6629 238.4075)" className="palma334" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="348.87" y="363.43" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -138.6464 238.3887)" className="palma335" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="348.88" y="363.39" transform="matrix(0.8508 -0.5256 0.5256 0.8508 -138.7371 238.7899)" className="palma336" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="348.89" y="363.35" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -138.7735 238.979)" className="palma337" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="348.89" y="363.31" transform="matrix(0.8506 -0.5259 0.5259 0.8506 -138.7505 238.9353)" className="palma338" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="348.9" y="363.28" transform="matrix(0.8505 -0.526 0.526 0.8505 -138.751 238.9835)" className="palma339" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="348.91" y="363.24" transform="matrix(0.85 -0.5267 0.5267 0.85 -138.8417 239.387)" className="palma340" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="348.92" y="363.2" transform="matrix(0.85 -0.5267 0.5267 0.85 -138.8251 239.368)" className="palma341" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="348.93" y="363.16" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -138.7978 239.3069)" className="palma342" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="348.94" y="363.12" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -138.9507 239.9585)" className="palma343" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="348.94" y="363.08" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -138.9341 239.9395)" className="palma344" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="348.95" y="363.04" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -138.9274 239.9603)" className="palma345" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="348.96" y="363.01" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -139.0005 240.2985)" className="palma346" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="348.97" y="362.97" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -138.9839 240.2795)" className="palma347" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="348.98" y="362.93" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -139.0298 240.5096)" className="palma348" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="348.99" y="362.89" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -139.108 240.8701)" className="palma349" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="349" y="362.85" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -139.0907 240.8486)" className="palma350" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="349" y="362.81" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -139.1858 241.2782)" className="palma351" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="349.01" y="362.77" transform="matrix(0.8474 -0.5309 0.5309 0.8474 -139.2418 241.5514)" className="palma352" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="349.02" y="362.74" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -139.3133 241.8886)" className="palma353" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="349.03" y="362.7" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -139.2959 241.867)" className="palma354" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="349.04" y="362.66" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -139.4447 242.5197)" className="palma355" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="349.05" y="362.62" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -139.428 242.5005)" className="palma356" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="349.05" y="362.58" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -139.5041 242.8598)" className="palma357" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="349.06" y="362.54" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -139.549 243.0922)" className="palma358" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="349.07" y="362.5" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -139.6443 243.533)" className="palma359" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="349.08" y="362.47" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -139.6287 243.5186)" className="palma360" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="349.09" y="362.43" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -139.7581 244.1023)" className="palma361" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="349.1" y="362.39" transform="matrix(0.844 -0.5363 0.5363 0.844 -139.8427 244.5029)" className="palma362" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="349.11" y="362.35" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -139.9877 245.1566)" className="palma363" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="349.11" y="362.31" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -139.9709 245.1372)" className="palma364" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="349.12" y="362.27" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -140.1049 245.7495)" className="palma365" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="349.13" y="362.23" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -140.1937 246.1748)" className="palma366" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="349.14" y="362.2" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -140.3302 246.804)" className="palma367" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="349.15" y="362.16" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -140.4119 247.2032)" className="palma368" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="349.16" y="362.12" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -140.5528 247.8582)" className="palma369" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="349.16" y="362.08" transform="matrix(0.8397 -0.543 0.543 0.8397 -140.6333 248.2569)" className="palma370" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="349.17" y="362.04" transform="matrix(0.839 -0.5441 0.5441 0.839 -140.7631 248.8705)" className="palma371" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="349.18" y="362" transform="matrix(0.8383 -0.5453 0.5453 0.8383 -140.9017 249.5266)" className="palma372" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="349.19" y="361.96" transform="matrix(0.8371 -0.547 0.547 0.8371 -141.1192 250.533)" className="palma373" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="349.2" y="361.92" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -141.2556 251.1898)" className="palma374" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="349.21" y="361.89" transform="matrix(0.8352 -0.55 0.55 0.8352 -141.4845 252.2643)" className="palma375" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="349.21" y="361.85" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -141.6085 252.878)" className="palma376" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="349.22" y="361.81" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -141.828 253.9289)" className="palma377" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="349.23" y="361.77" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -142.0412 254.9618)" className="palma378" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="349.24" y="361.73" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -142.2615 256.0386)" className="palma379" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="349.25" y="361.69" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -142.5289 257.3493)" className="palma380" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="349.26" y="361.65" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -142.8155 258.7704)" className="palma381" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="349.27" y="361.62" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -143.0815 260.1125)" className="palma382" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="349.27" y="361.58" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -143.4194 261.8287)" className="palma383" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="349.28" y="361.54" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -143.8189 263.8876)" className="palma384" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="349.29" y="361.5" transform="matrix(0.8193 -0.5733 0.5733 0.8193 -144.2053 265.925)" className="palma385" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="349.3" y="361.46" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -144.5999 268.0538)" className="palma386" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="349.31" y="361.42" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -145.1014 270.8158)" className="palma387" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="349.32" y="361.38" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -145.7114 274.2817)" className="palma388" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="349.32" y="361.35" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -146.3054 277.8042)" className="palma389" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="349.33" y="361.31" transform="matrix(0.8003 -0.5995 0.5995 0.8003 -146.9608 281.8707)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="355.67" y="360.33" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.1583 239.2605)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="355.68" y="360.29" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.1419 239.2418)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="355.69" y="360.25" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.1254 239.2233)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="355.7" y="360.21" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -135.1029 239.18)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="355.71" y="360.17" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.0926 239.1861)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="355.71" y="360.13" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.076 239.1675)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="355.72" y="360.09" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.0596 239.1489)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="355.73" y="360.06" transform="matrix(0.8542 -0.52 0.52 0.8542 -135.0432 239.1304)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="355.74" y="360.02" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -135.1919 239.7867)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="355.75" y="359.98" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -135.165 239.7252)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="355.76" y="359.94" transform="matrix(0.8535 -0.5212 0.5212 0.8535 -135.159 239.7493)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="355.77" y="359.9" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -135.1365 239.7059)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="355.77" y="359.86" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -135.1199 239.6874)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="355.78" y="359.82" transform="matrix(0.8535 -0.5211 0.5211 0.8535 -135.1034 239.6687)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="355.79" y="359.79" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -135.1799 240.0319)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="355.8" y="359.75" transform="matrix(0.853 -0.5219 0.5219 0.853 -135.1804 240.0834)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="355.81" y="359.71" transform="matrix(0.853 -0.5219 0.5219 0.853 -135.164 240.0646)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="355.82" y="359.67" transform="matrix(0.853 -0.5219 0.5219 0.853 -135.1475 240.046)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="355.82" y="359.63" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -135.1207 239.9846)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="355.83" y="359.59" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -135.1584 240.189)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="355.84" y="359.55" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -135.2451 240.5973)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="355.85" y="359.52" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.2389 240.6212)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="355.86" y="359.48" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.2223 240.6026)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="355.87" y="359.44" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -135.1949 240.5385)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="355.88" y="359.4" transform="matrix(0.8524 -0.5229 0.5229 0.8524 -135.179 240.5223)" className="palma178" width="5.05" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="355.88" y="359.36" transform="matrix(0.8523 -0.523 0.523 0.8523 -135.1685 240.5285)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="355.89" y="359.32" transform="matrix(0.8518 -0.5238 0.5238 0.8518 -135.2649 240.9788)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="355.9" y="359.28" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -135.2388 240.9201)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="355.91" y="359.25" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -135.2813 241.1474)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="355.92" y="359.21" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -135.2588 241.1038)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="355.93" y="359.17" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.3443 241.5111)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="355.93" y="359.13" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.3176 241.4497)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="355.94" y="359.09" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.3106 241.4709)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="355.95" y="359.05" transform="matrix(0.8512 -0.5248 0.5248 0.8512 -135.2947 241.4547)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="355.96" y="359.01" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -135.3796 241.8616)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="355.97" y="358.98" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -135.4122 242.0497)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="355.98" y="358.94" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -135.3962 242.0335)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="355.99" y="358.9" transform="matrix(0.8505 -0.526 0.526 0.8505 -135.3891 242.0546)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="355.99" y="358.86" transform="matrix(0.85 -0.5267 0.5267 0.85 -135.4733 242.4612)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="356" y="358.82" transform="matrix(0.85 -0.5267 0.5267 0.85 -135.4561 242.4397)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="356.01" y="358.78" transform="matrix(0.8501 -0.5267 0.5267 0.8501 -135.4301 242.3809)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="356.02" y="358.74" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -135.5728 243.0376)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="356.03" y="358.71" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -135.5561 243.0187)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="356.04" y="358.67" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -135.5494 243.0422)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="356.04" y="358.63" transform="matrix(0.8489 -0.5286 0.5286 0.8489 -135.6225 243.4056)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="356.05" y="358.59" transform="matrix(0.8489 -0.5285 0.5285 0.8489 -135.6006 243.3641)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="356.06" y="358.55" transform="matrix(0.8487 -0.5289 0.5289 0.8487 -135.642 243.5936)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="356.07" y="358.51" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -135.7243 243.9994)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="356.08" y="358.47" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -135.6978 243.9379)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="356.09" y="358.43" transform="matrix(0.8478 -0.5304 0.5304 0.8478 -135.7855 244.3683)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="356.1" y="358.4" transform="matrix(0.8474 -0.5309 0.5309 0.8474 -135.8368 244.6437)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="356.1" y="358.36" transform="matrix(0.847 -0.5315 0.5315 0.847 -135.9082 245.0064)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="356.11" y="358.32" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -135.8857 244.9621)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="356.12" y="358.28" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -136.0237 245.6171)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="356.13" y="358.24" transform="matrix(0.8463 -0.5327 0.5327 0.8463 -136.0081 245.6032)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="356.14" y="358.2" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -136.0779 245.9626)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="356.15" y="358.16" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -136.1189 246.197)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="356.15" y="358.13" transform="matrix(0.8451 -0.5345 0.5345 0.8451 -136.2078 246.6437)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="356.16" y="358.09" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -136.2865 247.0475)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="356.17" y="358.05" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -136.3118 247.215)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="356.18" y="358.01" transform="matrix(0.844 -0.5363 0.5363 0.844 -136.3894 247.616)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="356.19" y="357.97" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -136.5246 248.2774)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="356.2" y="357.93" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -136.5077 248.258)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="356.21" y="357.89" transform="matrix(0.8426 -0.5386 0.5386 0.8426 -136.6322 248.875)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="356.21" y="357.86" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -136.7085 249.2779)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="356.22" y="357.82" transform="matrix(0.8414 -0.5404 0.5404 0.8414 -136.8351 249.9117)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="356.23" y="357.78" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -136.9159 250.3397)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="356.24" y="357.74" transform="matrix(0.8402 -0.5423 0.5423 0.8402 -137.0471 251.0023)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="356.25" y="357.7" transform="matrix(0.8397 -0.543 0.543 0.8397 -137.1206 251.4014)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="356.26" y="357.66" transform="matrix(0.839 -0.5441 0.5441 0.839 -137.2407 252.0197)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="356.26" y="357.62" transform="matrix(0.8383 -0.5453 0.5453 0.8383 -137.369 252.6805)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="356.27" y="357.59" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -137.5796 253.7364)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="356.28" y="357.55" transform="matrix(0.8364 -0.5482 0.5482 0.8364 -137.6967 254.3561)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="356.29" y="357.51" transform="matrix(0.8352 -0.55 0.55 0.8352 -137.9032 255.4121)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="356.3" y="357.47" transform="matrix(0.8344 -0.5511 0.5511 0.8344 -138.0236 256.0591)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="356.31" y="357.43" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -138.2262 257.1151)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="356.31" y="357.39" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -138.4232 258.1555)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="356.32" y="357.35" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -138.6255 259.2349)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="356.33" y="357.32" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -138.8734 260.56)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="356.34" y="357.28" transform="matrix(0.8277 -0.5612 0.5612 0.8277 -139.1378 261.991)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="356.35" y="357.24" transform="matrix(0.8261 -0.5635 0.5635 0.8261 -139.3828 263.3425)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="356.36" y="357.2" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -139.6938 265.0706)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="356.36" y="357.16" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -140.0617 267.146)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="356.37" y="357.12" transform="matrix(0.8197 -0.5728 0.5728 0.8197 -140.3663 268.917)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="356.38" y="357.08" transform="matrix(0.8168 -0.5769 0.5769 0.8168 -140.777 271.3379)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="356.39" y="357.04" transform="matrix(0.8133 -0.5819 0.5819 0.8133 -141.2818 274.3957)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="356.4" y="357.01" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -141.7912 277.6065)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="356.41" y="356.97" transform="matrix(0.8052 -0.5929 0.5929 0.8052 -142.3304 281.1539)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="356.41" y="356.93" transform="matrix(0.8003 -0.5996 0.5996 0.8003 -142.9276 285.2838)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="362.79" y="356.1" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -131.9187 242.3222)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="362.8" y="356.07" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.908 242.3286)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="362.81" y="356.03" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.8915 242.31)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="362.82" y="355.99" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.875 242.2915)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="362.83" y="355.95" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.8586 242.2728)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="362.84" y="355.91" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.8421 242.2542)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="362.84" y="355.87" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.8257 242.2357)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="362.85" y="355.83" transform="matrix(0.8542 -0.52 0.52 0.8542 -131.8093 242.2171)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="362.86" y="355.8" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -131.8441 242.4227)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="362.87" y="355.76" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -131.8276 242.4041)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="362.88" y="355.72" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -131.8112 242.3854)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="362.89" y="355.68" transform="matrix(0.853 -0.5219 0.5219 0.853 -131.9962 243.2534)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="362.89" y="355.64" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -131.9699 243.1917)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="362.9" y="355.6" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -131.9534 243.173)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="362.91" y="355.56" transform="matrix(0.853 -0.5219 0.5219 0.853 -131.9467 243.1974)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="362.92" y="355.53" transform="matrix(0.853 -0.5219 0.5219 0.853 -131.9302 243.1786)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="362.93" y="355.49" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -131.904 243.117)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="362.94" y="355.45" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -131.8875 243.0983)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="362.94" y="355.41" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -131.8654 243.0548)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="362.95" y="355.37" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -131.9151 243.3289)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="362.96" y="355.33" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -131.8986 243.3101)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="362.97" y="355.29" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -131.8724 243.2484)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="362.98" y="355.26" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -131.8615 243.2547)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="362.99" y="355.22" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -132.0383 244.0962)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="363" y="355.18" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -132.0218 244.0774)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="363" y="355.14" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -132.0053 244.0585)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="363.01" y="355.1" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -131.9831 244.0148)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="363.02" y="355.06" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -131.9665 243.996)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="363.03" y="355.02" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -132.0066 244.2307)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="363.04" y="354.98" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -131.9895 244.2092)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="363.05" y="354.95" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -131.973 244.1903)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="363.06" y="354.91" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -131.9565 244.1717)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="363.06" y="354.87" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -132.1308 245.0114)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="363.07" y="354.83" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -132.1192 245.0149)" className="palma196" width="4.46" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="363.08" y="354.79" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -132.0937 244.9559)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="363.09" y="354.75" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.1366 245.2062)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="363.1" y="354.71" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.12 245.1875)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="363.11" y="354.68" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.104 245.1713)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="363.11" y="354.64" transform="matrix(0.8505 -0.526 0.526 0.8505 -132.0868 245.1497)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="363.12" y="354.6" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -132.0608 245.088)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="363.13" y="354.56" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -132.2327 245.9262)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="363.14" y="354.52" transform="matrix(0.8493 -0.5278 0.5278 0.8493 -132.2719 246.1626)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="363.15" y="354.48" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -132.2486 246.1127)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="363.16" y="354.44" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -132.2325 246.0966)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="363.16" y="354.41" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -132.2159 246.0777)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="363.17" y="354.37" transform="matrix(0.8484 -0.5293 0.5293 0.8484 -132.3909 246.9399)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="363.18" y="354.33" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -132.4198 247.1316)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="363.19" y="354.29" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -132.4124 247.1552)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="363.2" y="354.25" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -132.3957 247.1362)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="363.21" y="354.21" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -132.379 247.1171)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="363.22" y="354.17" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -132.5865 248.1416)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="363.22" y="354.13" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -132.5692 248.1199)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="363.23" y="354.1" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -132.5526 248.1007)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="363.24" y="354.06" transform="matrix(0.8467 -0.532 0.532 0.8467 -132.5992 248.3791)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="363.25" y="354.02" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -132.7547 249.1713)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="363.26" y="353.98" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -132.738 249.1519)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="363.27" y="353.94" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -132.7745 249.3857)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="363.27" y="353.9" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -132.753 249.3435)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="363.28" y="353.86" transform="matrix(0.8448 -0.5351 0.5351 0.8448 -132.9062 250.1348)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="363.29" y="353.83" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -132.9435 250.3746)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="363.3" y="353.79" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -132.9315 250.3781)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="363.31" y="353.75" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -133.1446 251.4684)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="363.32" y="353.71" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -133.1278 251.4489)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="363.33" y="353.67" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -133.3329 252.5133)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="363.33" y="353.63" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -133.3074 252.4511)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="363.34" y="353.59" transform="matrix(0.8419 -0.5397 0.5397 0.8419 -133.3431 252.6902)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="363.35" y="353.56" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -133.4983 253.5213)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="363.36" y="353.52" transform="matrix(0.8406 -0.5416 0.5416 0.8406 -133.5336 253.7614)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="363.37" y="353.48" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -133.678 254.5488)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="363.38" y="353.44" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -133.8755 255.612)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="363.38" y="353.4" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -133.91 255.8537)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="363.39" y="353.36" transform="matrix(0.8371 -0.547 0.547 0.8371 -134.1013 256.9016)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="363.4" y="353.32" transform="matrix(0.8368 -0.5475 0.5475 0.8368 -134.144 257.1898)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="363.41" y="353.29" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -134.3317 258.2357)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="363.42" y="353.25" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -134.5127 259.2574)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="363.43" y="353.21" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -134.7036 260.3452)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="363.44" y="353.17" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -134.8857 261.3987)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="363.44" y="353.13" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -135.0714 262.4859)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="363.45" y="353.09" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -135.2909 263.7761)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="363.46" y="353.05" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -135.4716 264.8664)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="363.47" y="353.02" transform="matrix(0.8257 -0.5642 0.5642 0.8257 -135.8356 267.028)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="363.48" y="352.98" transform="matrix(0.8242 -0.5664 0.5664 0.8242 -136.0452 268.3337)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="363.49" y="352.94" transform="matrix(0.8217 -0.57 0.57 0.8217 -136.393 270.4927)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="363.49" y="352.9" transform="matrix(0.8192 -0.5735 0.5735 0.8192 -136.7307 272.6511)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="363.5" y="352.86" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -137.0981 275.0624)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="363.51" y="352.82" transform="matrix(0.8132 -0.5819 0.5819 0.8132 -137.4997 277.7813)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="363.52" y="352.78" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -137.9568 280.9929)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="363.53" y="352.74" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -138.4342 284.5097)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="363.54" y="352.71" transform="matrix(0.8008 -0.599 0.599 0.8008 -138.9212 288.3007)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="369.77" y="351.84" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6916 245.3543)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="369.78" y="351.81" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6752 245.3356)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="369.79" y="351.77" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6588 245.317)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="369.8" y="351.73" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -128.637 245.2734)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="369.8" y="351.69" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -128.6205 245.2548)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="369.81" y="351.65" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.6094 245.2614)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="369.82" y="351.61" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.593 245.2426)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="369.83" y="351.57" transform="matrix(0.8542 -0.52 0.52 0.8542 -128.5765 245.2241)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="369.84" y="351.54" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -128.6133 245.4564)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="369.85" y="351.5" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -128.5969 245.4379)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="369.86" y="351.46" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -128.5804 245.4193)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="369.86" y="351.42" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.7472 246.2689)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="369.87" y="351.38" transform="matrix(0.853 -0.5218 0.5218 0.853 -128.7255 246.2249)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="369.88" y="351.34" transform="matrix(0.853 -0.5218 0.5218 0.853 -128.7089 246.2063)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="369.89" y="351.3" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -128.6833 246.1442)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="369.9" y="351.26" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -128.6721 246.1508)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="369.91" y="351.23" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.6647 246.1755)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="369.91" y="351.19" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.6483 246.1567)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="369.92" y="351.15" transform="matrix(0.853 -0.5219 0.5219 0.853 -128.6318 246.1381)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="369.93" y="351.11" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -128.659 246.3278)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="369.94" y="351.07" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -128.6379 246.2869)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="369.95" y="351.03" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -128.6298 246.3086)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="369.96" y="350.99" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -128.6133 246.2898)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="369.96" y="350.96" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.7685 247.0942)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="369.97" y="350.92" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.752 247.0755)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="369.98" y="350.88" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.7348 247.0538)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="369.99" y="350.84" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -128.7241 247.0633)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="370" y="350.8" transform="matrix(0.8518 -0.5238 0.5238 0.8518 -128.7166 247.0877)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="370.01" y="350.76" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.7382 247.2529)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="370.02" y="350.72" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.7223 247.2371)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="370.02" y="350.69" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.7051 247.2154)" className="palma190" width="4.66" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="370.03" y="350.65" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -128.6885 247.1967)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="370.04" y="350.61" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -128.8414 247.9995)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="370.05" y="350.57" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -128.8337 248.024)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="370.06" y="350.53" transform="matrix(0.8508 -0.5256 0.5256 0.8508 -128.8166 248.0021)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="370.07" y="350.49" transform="matrix(0.8505 -0.526 0.526 0.8505 -128.8525 248.2397)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="370.08" y="350.45" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -128.827 248.1776)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="370.08" y="350.42" transform="matrix(0.8506 -0.5259 0.5259 0.8506 -128.8053 248.1332)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="370.09" y="350.38" transform="matrix(0.8505 -0.526 0.526 0.8505 -128.8032 248.186)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="370.1" y="350.34" transform="matrix(0.8496 -0.5275 0.5275 0.8496 -128.962 249.0277)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="370.11" y="350.3" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -128.9366 248.9657)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="370.12" y="350.26" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -128.9715 249.201)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="370.13" y="350.22" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -128.9549 249.182)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="370.13" y="350.18" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -128.9382 249.1631)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="370.14" y="350.15" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -128.9303 249.1872)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						<polygon className="palma219" points="370.57,351.59 370.28,351.11 373.38,349.18 373.68,349.66 						"/>
					</g>
					<g className="palma220">
						
							<rect x="370.16" y="350.07" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -129.1078 250.1981)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="370.17" y="350.03" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -129.0918 250.1819)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="370.18" y="349.99" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -129.0652 250.1141)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="370.18" y="349.95" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -129.0492 250.0978)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="370.19" y="349.91" transform="matrix(0.847 -0.5315 0.5315 0.847 -129.2596 251.2217)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="370.2" y="349.87" transform="matrix(0.847 -0.5316 0.5316 0.847 -129.2514 251.2456)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="370.21" y="349.84" transform="matrix(0.847 -0.5316 0.5316 0.847 -129.2296 251.2007)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="370.22" y="349.8" transform="matrix(0.8468 -0.5319 0.5319 0.8468 -129.2549 251.3952)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="370.23" y="349.76" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -129.407 252.2364)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="370.24" y="349.72" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -129.3818 252.1743)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="370.24" y="349.68" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -129.4152 252.4124)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="370.25" y="349.64" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -129.3985 252.3931)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="370.26" y="349.6" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -129.5564 253.2763)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="370.27" y="349.57" transform="matrix(0.8444 -0.5357 0.5357 0.8444 -129.5844 253.4893)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="370.28" y="349.53" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -129.5598 253.4301)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="370.29" y="349.49" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -129.7561 254.5253)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="370.29" y="349.45" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -129.7388 254.5028)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="370.3" y="349.41" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -129.9253 255.561)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="370.31" y="349.37" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -129.9084 255.5413)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="370.32" y="349.33" transform="matrix(0.8418 -0.5397 0.5397 0.8418 -129.9435 255.7994)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="370.33" y="349.3" transform="matrix(0.841 -0.541 0.541 0.841 -130.0701 256.5506)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="370.34" y="349.26" transform="matrix(0.8407 -0.5415 0.5415 0.8407 -130.1096 256.8352)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="370.35" y="349.22" transform="matrix(0.8397 -0.543 0.543 0.8397 -130.2547 257.6973)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="370.35" y="349.18" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -130.4332 258.7518)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="370.36" y="349.14" transform="matrix(0.8383 -0.5453 0.5453 0.8383 -130.4637 258.9957)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="370.37" y="349.1" transform="matrix(0.8371 -0.547 0.547 0.8371 -130.6374 260.0407)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="370.38" y="349.06" transform="matrix(0.8368 -0.5475 0.5475 0.8368 -130.6674 260.2856)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="370.39" y="349.03" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -130.8452 261.3712)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="370.4" y="348.99" transform="matrix(0.8344 -0.5512 0.5512 0.8344 -131.0221 262.4666)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="370.4" y="348.95" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -131.185 263.4956)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="370.41" y="348.91" transform="matrix(0.832 -0.5547 0.5547 0.832 -131.3528 264.5664)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="370.42" y="348.87" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -131.5159 265.6245)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="370.43" y="348.83" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -131.7269 266.99)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="370.44" y="348.79" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -131.8841 268.0455)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="370.45" y="348.75" transform="matrix(0.8256 -0.5642 0.5642 0.8256 -132.2175 270.234)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="370.45" y="348.72" transform="matrix(0.8242 -0.5663 0.5663 0.8242 -132.4036 271.5246)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="370.46" y="348.68" transform="matrix(0.8217 -0.57 0.57 0.8217 -132.7243 273.7349)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="370.47" y="348.64" transform="matrix(0.8192 -0.5735 0.5735 0.8192 -133.0257 275.8826)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="370.48" y="348.6" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -133.3604 278.3351)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="370.49" y="348.56" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -133.6755 280.7369)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="370.5" y="348.52" transform="matrix(0.8094 -0.5872 0.5872 0.8094 -134.1297 284.3096)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="370.5" y="348.48" transform="matrix(0.8049 -0.5933 0.5933 0.8049 -134.5863 288.1197)" className="palma302" width="0.85" height="0.56"/>
					</g>
					<g>
						
							<rect x="370.51" y="348.45" transform="matrix(0.8008 -0.599 0.599 0.8008 -134.9792 291.6284)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="376.95" y="347.39" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.3285 248.4363)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="376.96" y="347.35" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.312 248.4178)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="376.96" y="347.31" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.2957 248.3992)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="376.97" y="347.27" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.2792 248.3807)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="376.98" y="347.23" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.2628 248.3621)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="376.99" y="347.2" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -125.2414 248.3182)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="377" y="347.16" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.2299 248.3249)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="377.01" y="347.12" transform="matrix(0.8542 -0.52 0.52 0.8542 -125.2134 248.3063)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="377.02" y="347.08" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -125.2464 248.5405)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="377.02" y="347.04" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -125.2299 248.522)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="377.03" y="347" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -125.2135 248.5033)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="377.04" y="346.96" transform="matrix(0.853 -0.5219 0.5219 0.853 -125.3673 249.3594)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="377.05" y="346.93" transform="matrix(0.853 -0.5219 0.5219 0.853 -125.3508 249.3408)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="377.06" y="346.89" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -125.3264 249.2815)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="377.07" y="346.85" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -125.3045 249.2345)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="377.07" y="346.81" transform="matrix(0.853 -0.5218 0.5218 0.853 -125.2964 249.2595)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="377.08" y="346.77" transform="matrix(0.853 -0.5218 0.5218 0.853 -125.2799 249.2407)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="377.09" y="346.73" transform="matrix(0.853 -0.5219 0.5219 0.853 -125.2683 249.2474)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="377.1" y="346.69" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -125.2428 249.182)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="377.11" y="346.66" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -125.2759 249.42)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="377.12" y="346.62" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -125.2678 249.4451)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="377.12" y="346.58" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -125.2514 249.4263)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="377.13" y="346.54" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -125.2349 249.4076)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="377.14" y="346.5" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.3727 250.1928)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="377.15" y="346.46" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.3562 250.1741)" className="palma178" width="5.06" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="377.16" y="346.42" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.3397 250.1554)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="377.17" y="346.39" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.3232 250.1365)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="377.18" y="346.35" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -125.315 250.1614)" className="palma184" width="4.86" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="377.18" y="346.31" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -125.3387 250.3535)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="377.19" y="346.27" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -125.327 250.3602)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="377.2" y="346.23" transform="matrix(0.8516 -0.5241 0.5241 0.8516 -125.3104 250.3414)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="377.21" y="346.19" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -125.289 250.2971)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="377.22" y="346.15" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -125.4376 251.1499)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="377.23" y="346.11" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -125.4211 251.1309)" className="palma196" width="4.45" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="377.23" y="346.08" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -125.4045 251.1121)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="377.24" y="346.04" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -125.4278 251.305)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="377.25" y="346" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -125.4113 251.2861)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="377.26" y="345.96" transform="matrix(0.8505 -0.526 0.526 0.8505 -125.4029 251.3109)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="377.27" y="345.92" transform="matrix(0.8505 -0.526 0.526 0.8505 -125.3863 251.2919)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="377.28" y="345.88" transform="matrix(0.8505 -0.526 0.526 0.8505 -125.3649 251.2475)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="377.29" y="345.84" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -125.5083 252.0838)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="377.29" y="345.81" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.5383 252.3148)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="377.3" y="345.77" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.5222 252.2991)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="377.31" y="345.73" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -125.5056 252.28)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="377.32" y="345.69" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -125.497 252.3046)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						<polygon className="palma219" points="377.75,347.13 377.46,346.66 380.56,344.73 380.85,345.2 						"/>
					</g>
					<g className="palma220">
						
							<rect x="377.34" y="345.61" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -125.6633 253.3489)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="377.34" y="345.57" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -125.642 253.3043)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="377.35" y="345.54" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -125.6174 253.2417)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="377.36" y="345.5" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -125.6013 253.2258)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="377.37" y="345.46" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -125.7891 254.3291)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="377.38" y="345.42" transform="matrix(0.847 -0.5316 0.5316 0.847 -125.7803 254.3533)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="377.39" y="345.38" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -125.7557 254.2909)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="377.4" y="345.34" transform="matrix(0.8468 -0.5319 0.5319 0.8468 -125.7856 254.53)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="377.4" y="345.3" transform="matrix(0.8459 -0.5334 0.5334 0.8459 -125.9245 255.3779)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="377.41" y="345.27" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -125.8995 255.3121)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="377.42" y="345.23" transform="matrix(0.8456 -0.5337 0.5337 0.8456 -125.9296 255.5552)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="377.43" y="345.19" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -125.9205 255.5794)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="377.44" y="345.15" transform="matrix(0.8447 -0.5353 0.5353 0.8447 -126.0577 256.4288)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="377.45" y="345.11" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -126.0786 256.6236)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="377.45" y="345.07" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -126.0618 256.6041)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="377.46" y="345.03" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -126.237 257.6842)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="377.47" y="345" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -126.2201 257.665)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="377.48" y="344.96" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -126.3898 258.7278)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="377.49" y="344.92" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -126.3729 258.7084)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="377.5" y="344.88" transform="matrix(0.8418 -0.5398 0.5398 0.8418 -126.4083 258.9945)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="377.51" y="344.84" transform="matrix(0.841 -0.5411 0.5411 0.841 -126.5233 259.7513)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="377.51" y="344.8" transform="matrix(0.8407 -0.5415 0.5415 0.8407 -126.5535 260.0121)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="377.52" y="344.76" transform="matrix(0.8397 -0.543 0.543 0.8397 -126.6809 260.8539)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="377.53" y="344.72" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -126.8425 261.9132)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="377.54" y="344.69" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -126.8696 262.1617)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="377.55" y="344.65" transform="matrix(0.8371 -0.5471 0.5471 0.8371 -127.0362 263.2706)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="377.56" y="344.61" transform="matrix(0.8359 -0.5488 0.5488 0.8359 -127.188 264.3036)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="377.56" y="344.57" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -127.2135 264.5513)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="377.57" y="344.53" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -127.3667 265.6118)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="377.58" y="344.49" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -127.5255 266.7238)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="377.59" y="344.45" transform="matrix(0.832 -0.5548 0.5548 0.832 -127.6801 267.8264)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="377.6" y="344.42" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -127.8222 268.8619)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="377.61" y="344.38" transform="matrix(0.8293 -0.5588 0.5588 0.8293 -128.0124 270.2397)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="377.61" y="344.34" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -128.1531 271.3029)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="377.62" y="344.3" transform="matrix(0.8256 -0.5642 0.5642 0.8256 -128.4527 273.5062)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="377.63" y="344.26" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -128.6241 274.8455)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="377.64" y="344.22" transform="matrix(0.8216 -0.57 0.57 0.8216 -128.9055 277.034)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="377.65" y="344.18" transform="matrix(0.8192 -0.5735 0.5735 0.8192 -129.1736 279.1961)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="377.66" y="344.15" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -129.466 281.6337)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="377.66" y="344.11" transform="matrix(0.8136 -0.5814 0.5814 0.8136 -129.7466 284.0733)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="377.67" y="344.07" transform="matrix(0.8095 -0.5872 0.5872 0.8095 -130.1412 287.6331)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="377.68" y="344.03" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -130.5126 291.2171)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="377.69" y="343.99" transform="matrix(0.8007 -0.599 0.599 0.8007 -130.8842 295.0717)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
				<g>
					<g className="palma51">
						
							<rect x="383.99" y="343.16" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.1034 251.4796)" className="palma26" width="6.66" height="0.56"/>
					</g>
					<g className="palma132">
						
							<rect x="383.99" y="343.12" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.0869 251.461)" className="palma133" width="6.59" height="0.56"/>
					</g>
					<g className="palma134">
						
							<rect x="384" y="343.08" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.0705 251.4425)" className="palma135" width="6.52" height="0.56"/>
					</g>
					<g className="palma136">
						
							<rect x="384.01" y="343.04" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.054 251.4239)" className="palma137" width="6.46" height="0.56"/>
					</g>
					<g className="palma138">
						
							<rect x="384.02" y="343.01" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.0375 251.4052)" className="palma139" width="6.39" height="0.56"/>
					</g>
					<g className="palma140">
						
							<rect x="384.03" y="342.97" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.0211 251.3867)" className="palma141" width="6.32" height="0.56"/>
					</g>
					<g className="palma142">
						
							<rect x="384.04" y="342.93" transform="matrix(0.8542 -0.52 0.52 0.8542 -122.0046 251.3681)" className="palma143" width="6.26" height="0.56"/>
					</g>
					<g className="palma144">
						
							<rect x="384.05" y="342.89" transform="matrix(0.8542 -0.5199 0.5199 0.8542 -121.9836 251.3241)" className="palma145" width="6.19" height="0.56"/>
					</g>
					<g className="palma146">
						
							<rect x="384.05" y="342.85" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -122.013 251.5602)" className="palma147" width="6.12" height="0.56"/>
					</g>
					<g className="palma148">
						
							<rect x="384.06" y="342.81" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -122.0013 251.567)" className="palma149" width="6.06" height="0.56"/>
					</g>
					<g className="palma150">
						
							<rect x="384.07" y="342.77" transform="matrix(0.8539 -0.5204 0.5204 0.8539 -121.9848 251.5484)" className="palma151" width="5.99" height="0.56"/>
					</g>
					<g className="palma152">
						
							<rect x="384.08" y="342.74" transform="matrix(0.853 -0.5219 0.5219 0.853 -122.1259 252.4111)" className="palma153" width="5.92" height="0.56"/>
					</g>
					<g className="palma154">
						
							<rect x="384.09" y="342.7" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -122.101 252.3452)" className="palma155" width="5.86" height="0.56"/>
					</g>
					<g className="palma156">
						
							<rect x="384.1" y="342.66" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -122.085 252.3298)" className="palma157" width="5.79" height="0.56"/>
					</g>
					<g className="palma158">
						
							<rect x="384.1" y="342.62" transform="matrix(0.853 -0.5219 0.5219 0.853 -122.0764 252.3552)" className="palma159" width="5.72" height="0.56"/>
					</g>
					<g className="palma160">
						
							<rect x="384.11" y="342.58" transform="matrix(0.853 -0.5219 0.5219 0.853 -122.0599 252.3364)" className="palma161" width="5.66" height="0.56"/>
					</g>
					<g className="palma162">
						
							<rect x="384.12" y="342.54" transform="matrix(0.853 -0.5218 0.5218 0.853 -122.0389 252.2923)" className="palma163" width="5.59" height="0.56"/>
					</g>
					<g className="palma164">
						
							<rect x="384.13" y="342.5" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -122.0145 252.2296)" className="palma165" width="5.52" height="0.56"/>
					</g>
					<g className="palma166">
						
							<rect x="384.14" y="342.47" transform="matrix(0.8531 -0.5218 0.5218 0.8531 -121.9981 252.211)" className="palma167" width="5.46" height="0.56"/>
					</g>
					<g className="palma168">
						
							<rect x="384.15" y="342.43" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -122.0347 252.4918)" className="palma169" width="5.39" height="0.56"/>
					</g>
					<g className="palma170">
						
							<rect x="384.15" y="342.39" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -122.0228 252.4986)" className="palma171" width="5.32" height="0.56"/>
					</g>
					<g className="palma172">
						
							<rect x="384.16" y="342.35" transform="matrix(0.8528 -0.5223 0.5223 0.8528 -122.0063 252.4799)" className="palma173" width="5.26" height="0.56"/>
					</g>
					<g className="palma68">
						
							<rect x="384.17" y="342.31" transform="matrix(0.8528 -0.5222 0.5222 0.8528 -121.982 252.4172)" className="palma174" width="5.19" height="0.56"/>
					</g>
					<g className="palma175">
						
							<rect x="384.18" y="342.27" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -122.1206 253.2782)" className="palma176" width="5.12" height="0.56"/>
					</g>
					<g className="palma177">
						
							<rect x="384.19" y="342.23" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -122.0996 253.2338)" className="palma178" width="5.05" height="0.56"/>
					</g>
					<g className="palma179">
						
							<rect x="384.2" y="342.2" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -122.0831 253.2149)" className="palma180" width="4.99" height="0.56"/>
					</g>
					<g className="palma181">
						
							<rect x="384.21" y="342.16" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -122.0742 253.2401)" className="palma182" width="4.92" height="0.56"/>
					</g>
					<g className="palma183">
						
							<rect x="384.21" y="342.12" transform="matrix(0.8519 -0.5237 0.5237 0.8519 -122.0499 253.1775)" className="palma184" width="4.85" height="0.56"/>
					</g>
					<g className="palma185">
						
							<rect x="384.22" y="342.08" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -122.0783 253.415)" className="palma186" width="4.79" height="0.56"/>
					</g>
					<g className="palma187">
						
							<rect x="384.23" y="342.04" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -122.0617 253.3963)" className="palma188" width="4.72" height="0.56"/>
					</g>
					<g className="palma189">
						
							<rect x="384.24" y="342" transform="matrix(0.8517 -0.5241 0.5241 0.8517 -122.0458 253.3807)" className="palma190" width="4.65" height="0.56"/>
					</g>
					<g className="palma191">
						
							<rect x="384.25" y="341.96" transform="matrix(0.8516 -0.5242 0.5242 0.8516 -122.0409 253.4282)" className="palma192" width="4.59" height="0.56"/>
					</g>
					<g className="palma193">
						
							<rect x="384.26" y="341.92" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -122.1648 254.2179)" className="palma194" width="4.52" height="0.56"/>
					</g>
					<g className="palma195">
						
							<rect x="384.26" y="341.89" transform="matrix(0.8507 -0.5256 0.5256 0.8507 -122.1482 254.1991)" className="palma196" width="4.46" height="0.56"/>
					</g>
					<g className="palma197">
						
							<rect x="384.27" y="341.85" transform="matrix(0.8508 -0.5255 0.5255 0.8508 -122.1246 254.1396)" className="palma198" width="4.39" height="0.56"/>
					</g>
					<g className="palma199">
						
							<rect x="384.28" y="341.81" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -122.1513 254.3713)" className="palma200" width="4.32" height="0.56"/>
					</g>
					<g className="palma201">
						
							<rect x="384.29" y="341.77" transform="matrix(0.8505 -0.526 0.526 0.8505 -122.1428 254.3997)" className="palma202" width="4.25" height="0.56"/>
					</g>
					<g className="palma203">
						
							<rect x="384.3" y="341.73" transform="matrix(0.8505 -0.526 0.526 0.8505 -122.1263 254.3808)" className="palma204" width="4.19" height="0.56"/>
					</g>
					<g className="palma205">
						
							<rect x="384.31" y="341.69" transform="matrix(0.8505 -0.526 0.526 0.8505 -122.1097 254.3619)" className="palma206" width="4.12" height="0.56"/>
					</g>
					<g className="palma207">
						
							<rect x="384.32" y="341.65" transform="matrix(0.8505 -0.5259 0.5259 0.8505 -122.0855 254.2992)" className="palma208" width="4.05" height="0.56"/>
					</g>
					<g className="palma209">
						
							<rect x="384.32" y="341.62" transform="matrix(0.8496 -0.5274 0.5274 0.8496 -122.2193 255.1568)" className="palma210" width="3.99" height="0.56"/>
					</g>
					<g className="palma211">
						
							<rect x="384.33" y="341.58" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -122.2421 255.3702)" className="palma212" width="3.92" height="0.56"/>
					</g>
					<g className="palma213">
						
							<rect x="384.34" y="341.54" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -122.2299 255.377)" className="palma214" width="3.85" height="0.56"/>
					</g>
					<g className="palma215">
						
							<rect x="384.35" y="341.5" transform="matrix(0.8493 -0.5279 0.5279 0.8493 -122.2207 255.4019)" className="palma216" width="3.79" height="0.56"/>
					</g>
					<g className="palma86">
						
							<rect x="384.36" y="341.46" transform="matrix(0.8494 -0.5278 0.5278 0.8494 -122.1961 255.3359)" className="palma217" width="3.72" height="0.56"/>
					</g>
					<g className="palma218">
						
							<rect x="384.37" y="341.42" transform="matrix(0.8484 -0.5293 0.5293 0.8484 -122.328 256.1953)" className="palma219" width="3.65" height="0.56"/>
					</g>
					<g className="palma220">
						
							<rect x="384.37" y="341.38" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -122.3548 256.4354)" className="palma221" width="3.59" height="0.56"/>
					</g>
					<g className="palma222">
						
							<rect x="384.38" y="341.35" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -122.3308 256.3725)" className="palma223" width="3.52" height="0.56"/>
					</g>
					<g className="palma224">
						
							<rect x="384.39" y="341.31" transform="matrix(0.8482 -0.5296 0.5296 0.8482 -122.3098 256.3276)" className="palma225" width="3.45" height="0.56"/>
					</g>
					<g className="palma226">
						
							<rect x="384.4" y="341.27" transform="matrix(0.8482 -0.5297 0.5297 0.8482 -122.3004 256.3523)" className="palma227" width="3.39" height="0.56"/>
					</g>
					<g className="palma228">
						
							<rect x="384.41" y="341.23" transform="matrix(0.847 -0.5316 0.5316 0.847 -122.4724 257.4669)" className="palma229" width="3.32" height="0.56"/>
					</g>
					<g className="palma230">
						
							<rect x="384.42" y="341.19" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -122.4484 257.4042)" className="palma231" width="3.25" height="0.56"/>
					</g>
					<g className="palma232">
						
							<rect x="384.43" y="341.15" transform="matrix(0.8471 -0.5315 0.5315 0.8471 -122.4323 257.3882)" className="palma233" width="3.19" height="0.56"/>
					</g>
					<g className="palma234">
						
							<rect x="384.43" y="341.11" transform="matrix(0.8468 -0.5319 0.5319 0.8468 -122.4579 257.6263)" className="palma235" width="3.12" height="0.56"/>
					</g>
					<g className="palma236">
						
							<rect x="384.44" y="341.08" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -122.5773 258.4366)" className="palma237" width="3.05" height="0.56"/>
					</g>
					<g className="palma238">
						
							<rect x="384.45" y="341.04" transform="matrix(0.8459 -0.5333 0.5333 0.8459 -122.5605 258.4172)" className="palma239" width="2.99" height="0.56"/>
					</g>
					<g className="palma240">
						
							<rect x="384.46" y="341" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -122.5933 258.703)" className="palma241" width="2.92" height="0.56"/>
					</g>
					<g className="palma242">
						
							<rect x="384.47" y="340.96" transform="matrix(0.8456 -0.5338 0.5338 0.8456 -122.5765 258.6837)" className="palma243" width="2.85" height="0.56"/>
					</g>
					<g className="palma244">
						
							<rect x="384.48" y="340.92" transform="matrix(0.8447 -0.5352 0.5352 0.8447 -122.693 259.4897)" className="palma245" width="2.79" height="0.56"/>
					</g>
					<g className="palma246">
						
							<rect x="384.48" y="340.88" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -122.7188 259.7357)" className="palma247" width="2.72" height="0.56"/>
					</g>
					<g className="palma248">
						
							<rect x="384.49" y="340.84" transform="matrix(0.8445 -0.5356 0.5356 0.8445 -122.702 259.7162)" className="palma249" width="2.65" height="0.56"/>
					</g>
					<g className="palma250">
						
							<rect x="384.5" y="340.81" transform="matrix(0.8433 -0.5375 0.5375 0.8433 -122.8659 260.8342)" className="palma251" width="2.59" height="0.56"/>
					</g>
					<g className="palma252">
						
							<rect x="384.51" y="340.77" transform="matrix(0.8433 -0.5374 0.5374 0.8433 -122.8375 260.7416)" className="palma253" width="2.52" height="0.56"/>
					</g>
					<g className="palma254">
						
							<rect x="384.52" y="340.73" transform="matrix(0.8424 -0.5388 0.5388 0.8424 -122.9566 261.5887)" className="palma255" width="2.45" height="0.56"/>
					</g>
					<g className="palma256">
						
							<rect x="384.53" y="340.69" transform="matrix(0.8421 -0.5393 0.5393 0.8421 -122.9881 261.8798)" className="palma257" width="2.39" height="0.56"/>
					</g>
					<g className="palma258">
						
							<rect x="384.53" y="340.65" transform="matrix(0.8418 -0.5398 0.5398 0.8418 -123.0124 262.1247)" className="palma259" width="2.32" height="0.56"/>
					</g>
					<g className="palma104">
						
							<rect x="384.54" y="340.61" transform="matrix(0.8409 -0.5411 0.5411 0.8409 -123.1226 262.9308)" className="palma260" width="2.25" height="0.56"/>
					</g>
					<g className="palma261">
						
							<rect x="384.55" y="340.57" transform="matrix(0.8406 -0.5416 0.5416 0.8406 -123.1463 263.1765)" className="palma262" width="2.19" height="0.56"/>
					</g>
					<g className="palma263">
						
							<rect x="384.56" y="340.53" transform="matrix(0.8398 -0.5429 0.5429 0.8398 -123.2504 263.9547)" className="palma264" width="2.12" height="0.56"/>
					</g>
					<g className="palma265">
						
							<rect x="384.57" y="340.5" transform="matrix(0.8386 -0.5448 0.5448 0.8386 -123.4033 265.0679)" className="palma266" width="2.05" height="0.56"/>
					</g>
					<g className="palma267">
						
							<rect x="384.58" y="340.46" transform="matrix(0.8383 -0.5452 0.5452 0.8383 -123.426 265.3153)" className="palma268" width="1.99" height="0.56"/>
					</g>
					<g className="palma269">
						
							<rect x="384.59" y="340.42" transform="matrix(0.8371 -0.547 0.547 0.8371 -123.5693 266.386)" className="palma270" width="1.92" height="0.56"/>
					</g>
					<g className="palma271">
						
							<rect x="384.59" y="340.38" transform="matrix(0.8359 -0.5489 0.5489 0.8359 -123.7163 267.4996)" className="palma272" width="1.85" height="0.56"/>
					</g>
					<g className="palma273">
						
							<rect x="384.6" y="340.34" transform="matrix(0.8356 -0.5493 0.5493 0.8356 -123.7339 267.7224)" className="palma274" width="1.79" height="0.56"/>
					</g>
					<g className="palma275">
						
							<rect x="384.61" y="340.3" transform="matrix(0.8345 -0.5511 0.5511 0.8345 -123.8718 268.7933)" className="palma276" width="1.72" height="0.56"/>
					</g>
					<g className="palma277">
						
							<rect x="384.62" y="340.26" transform="matrix(0.8332 -0.5529 0.5529 0.8332 -124.0132 269.9071)" className="palma278" width="1.65" height="0.56"/>
					</g>
					<g className="palma279">
						
							<rect x="384.63" y="340.23" transform="matrix(0.8321 -0.5547 0.5547 0.8321 -124.1461 270.9777)" className="palma280" width="1.59" height="0.56"/>
					</g>
					<g className="palma281">
						
							<rect x="384.64" y="340.19" transform="matrix(0.8308 -0.5565 0.5565 0.8308 -124.2785 272.0634)" className="palma282" width="1.52" height="0.56"/>
					</g>
					<g className="palma283">
						
							<rect x="384.64" y="340.15" transform="matrix(0.8294 -0.5587 0.5587 0.8294 -124.4425 273.4082)" className="palma284" width="1.45" height="0.56"/>
					</g>
					<g className="palma285">
						
							<rect x="384.65" y="340.11" transform="matrix(0.8281 -0.5606 0.5606 0.8281 -124.5729 274.5215)" className="palma286" width="1.39" height="0.56"/>
					</g>
					<g className="palma287">
						
							<rect x="384.66" y="340.07" transform="matrix(0.8257 -0.5642 0.5642 0.8257 -124.8378 276.725)" className="palma288" width="1.32" height="0.56"/>
					</g>
					<g className="palma289">
						
							<rect x="384.67" y="340.03" transform="matrix(0.8241 -0.5664 0.5664 0.8241 -124.9911 278.0884)" className="palma290" width="1.25" height="0.56"/>
					</g>
					<g className="palma291">
						
							<rect x="384.68" y="339.99" transform="matrix(0.8217 -0.5699 0.5699 0.8217 -125.2348 280.2489)" className="palma292" width="1.19" height="0.56"/>
					</g>
					<g className="palma293">
						
							<rect x="384.69" y="339.96" transform="matrix(0.8192 -0.5735 0.5735 0.8192 -125.4749 282.4622)" className="palma294" width="1.12" height="0.56"/>
					</g>
					<g className="palma295">
						
							<rect x="384.69" y="339.92" transform="matrix(0.8164 -0.5775 0.5775 0.8164 -125.7318 284.9218)" className="palma296" width="1.05" height="0.56"/>
					</g>
					<g className="palma297">
						
							<rect x="384.7" y="339.88" transform="matrix(0.8136 -0.5815 0.5815 0.8136 -125.9792 287.4093)" className="palma298" width="0.99" height="0.56"/>
					</g>
					<g className="palma299">
						
							<rect x="384.71" y="339.84" transform="matrix(0.8095 -0.5871 0.5871 0.8095 -126.3145 290.9312)" className="palma300" width="0.92" height="0.56"/>
					</g>
					<g className="palma301">
						
							<rect x="384.72" y="339.8" transform="matrix(0.8053 -0.5929 0.5929 0.8053 -126.6351 294.5666)" className="palma302" width="0.86" height="0.56"/>
					</g>
					<g>
						
							<rect x="384.73" y="339.76" transform="matrix(0.8007 -0.599 0.599 0.8007 -126.9488 298.4454)" className="palma33" width="0.79" height="0.56"/>
					</g>
				</g>
			</g>
			<g>
				<path className="palma36" d="M328.9,392.71l-49.87-27.27l-6.74,4.1l49.87,27.27L328.9,392.71z M319.07,394.32l2.45-5.12l6.27,3.43
					L319.07,394.32z M280.25,373.38l5.18-3.15l-2.27,4.74L280.25,373.38z M292.52,373.34l-8.73,1.69l2.45-5.12L292.52,373.34z
					 M299.58,377.2l-8.73,1.69l2.45-5.12L299.58,377.2z M306.63,381.06l-8.73,1.69l2.45-5.12L306.63,381.06z M313.69,384.91
					l-8.73,1.69l2.45-5.12L313.69,384.91z M320.74,388.77l-8.73,1.69l2.45-5.12L320.74,388.77z M292.02,373.83l-5.18,3.15
					l-2.91-1.59L292.02,373.83z M287.31,377.23l5.18-3.15l-2.27,4.74L287.31,377.23z M299.08,377.69l-5.18,3.15l-2.91-1.59
					L299.08,377.69z M294.36,381.09l5.18-3.15l-2.27,4.74L294.36,381.09z M306.13,381.54l-5.18,3.15l-2.91-1.59L306.13,381.54z
					 M301.42,384.95l5.18-3.15l-2.27,4.74L301.42,384.95z M313.19,385.4l-5.18,3.15l-2.91-1.59L313.19,385.4z M308.47,388.81
					l5.18-3.15l-2.27,4.74L308.47,388.81z M320.24,389.26l-5.18,3.15l-2.91-1.59L320.24,389.26z M315.53,392.66l5.18-3.15
					l-2.27,4.74L315.53,392.66z M285.47,369.48l-8.73,1.69l2.45-5.12L285.47,369.48z M284.97,369.97l-5.18,3.15l-2.91-1.59
					L284.97,369.97z M319.22,394.68l8.16-1.58l-5.22,3.18L319.22,394.68z M278.38,366.37l-2.27,4.74l-2.91-1.59L278.38,366.37z"/>
				<path className="palma34" d="M278.84,357.55l0.18,7.89l49.87,27.27l-0.18-7.89L278.84,357.55z M325.09,389.82l-3.29-8.26l6.27,3.43
					L325.09,389.82z M318.44,386.47l2.76-4.47l0.14,6.06L318.44,386.47z M286.53,369.02l-0.14-6.06l3.05,7.65L286.53,369.02z
					 M321.02,381.14l-2.98,4.83l-3.29-8.26L321.02,381.14z M313.97,377.28l-2.98,4.83l-3.29-8.26L313.97,377.28z M306.91,373.42
					l-2.98,4.83l-3.29-8.26L306.91,373.42z M299.86,369.57l-2.98,4.83l-3.29-8.26L299.86,369.57z M292.8,365.71l-2.98,4.83
					l-3.29-8.26L292.8,365.71z M292.98,366.57l0.14,6.06l-2.91-1.59L292.98,366.57z M293.58,372.88l-0.14-6.06l3.05,7.65
					L293.58,372.88z M300.03,370.42l0.14,6.06l-2.91-1.59L300.03,370.42z M300.64,376.74l-0.14-6.06l3.05,7.65L300.64,376.74z
					 M307.09,374.28l0.14,6.06l-2.91-1.59L307.09,374.28z M307.69,380.59l-0.14-6.06l3.05,7.65L307.69,380.59z M314.14,378.14
					l0.14,6.06l-2.91-1.59L314.14,378.14z M314.75,384.45l-0.14-6.06l3.05,7.65L314.75,384.45z M285.75,361.85l-2.98,4.83
					l-3.29-8.26L285.75,361.85z M285.92,362.71l0.14,6.06l-2.91-1.59L285.92,362.71z M321.8,388.31l-0.14-6.06l3.05,7.65
					L321.8,388.31z M279.33,359.1l3.05,7.65l-2.91-1.59L279.33,359.1z M325.49,390.32l2.79-4.51l0.14,6.12L325.49,390.32z"/>
				<path className="palma125" d="M278.84,357.55l-6.74,4.1l49.87,27.27l6.74-4.1L278.84,357.55z M318.89,386.43l2.45-5.12l6.27,3.43
					L318.89,386.43z M311.98,382.94l8.08-1.56l-5.18,3.15L311.98,382.94z M280.07,365.49l5.18-3.15l-2.27,4.74L280.07,365.49z
					 M320.56,380.88l-8.73,1.69l2.45-5.12L320.56,380.88z M313.5,377.03l-8.73,1.69l2.45-5.12L313.5,377.03z M306.45,373.17
					l-8.73,1.69l2.45-5.12L306.45,373.17z M299.39,369.31l-8.73,1.69l2.45-5.12L299.39,369.31z M292.34,365.46l-8.73,1.69l2.45-5.12
					L292.34,365.46z M291.84,365.94l-5.18,3.15l-2.91-1.59L291.84,365.94z M287.13,369.35l5.18-3.15l-2.27,4.74L287.13,369.35z
					 M298.9,369.8l-5.18,3.15l-2.91-1.59L298.9,369.8z M294.18,373.21l5.18-3.15l-2.27,4.74L294.18,373.21z M305.95,373.66
					l-5.18,3.15l-2.91-1.59L305.95,373.66z M301.24,377.06l5.18-3.15l-2.27,4.74L301.24,377.06z M313.01,377.51l-5.18,3.15
					l-2.91-1.59L313.01,377.51z M308.29,380.92l5.18-3.15l-2.27,4.74L308.29,380.92z M285.28,361.6l-8.73,1.69l2.45-5.12
					L285.28,361.6z M284.79,362.09l-5.18,3.15l-2.91-1.59L284.79,362.09z M315.35,384.78l5.18-3.15l-2.27,4.74L315.35,384.78z
					 M278.19,358.48l-2.27,4.74l-2.91-1.59L278.19,358.48z M319.03,386.79l8.16-1.58l-5.22,3.18L319.03,386.79z"/>
				<path className="palma34" d="M272.1,361.66l0.18,7.89l49.87,27.27l-0.18-7.89L272.1,361.66z M318.36,393.93l-3.29-8.26l6.27,3.43
					L318.36,393.93z M311.7,390.57l2.76-4.47l0.14,6.06L311.7,390.57z M279.79,373.13l-0.14-6.06l3.05,7.65L279.79,373.13z
					 M314.28,385.24l-2.98,4.83l-3.29-8.26L314.28,385.24z M307.23,381.38l-2.98,4.83l-3.29-8.26L307.23,381.38z M300.17,377.53
					l-2.98,4.83l-3.29-8.26L300.17,377.53z M293.12,373.67l-2.98,4.83l-3.29-8.26L293.12,373.67z M286.06,369.81l-2.98,4.83
					l-3.29-8.26L286.06,369.81z M286.24,370.67l0.14,6.06l-2.91-1.59L286.24,370.67z M286.85,376.98l-0.14-6.06l3.05,7.65
					L286.85,376.98z M293.3,374.53l0.14,6.06l-2.91-1.59L293.3,374.53z M293.9,380.84l-0.14-6.06l3.05,7.65L293.9,380.84z
					 M300.35,378.38l0.14,6.06l-2.91-1.59L300.35,378.38z M300.96,384.7l-0.14-6.06l3.05,7.65L300.96,384.7z M307.41,382.24
					l0.14,6.06l-2.91-1.59L307.41,382.24z M308.01,388.55l-0.14-6.06l3.05,7.65L308.01,388.55z M279.01,365.95l-2.98,4.83
					l-3.29-8.26L279.01,365.95z M279.19,366.81l0.14,6.06l-2.91-1.59L279.19,366.81z M315.07,392.41l-0.14-6.06l3.05,7.65
					L315.07,392.41z M272.59,363.21l3.05,7.65l-2.91-1.59L272.59,363.21z M318.75,394.43l2.79-4.51l0.14,6.12L318.75,394.43z"/>
			</g>
			<g>
				<path className="palma34" d="M321.98,388.92l0.18,7.89l82.86-50.45l-0.18-7.89L321.98,388.92z M383.94,357.88l-2.97-4.34l2.83-1.72
					L383.94,357.88z M384.25,351.54l2.83-1.72l-2.69,7.78L384.25,351.54z M377.07,362.06l-2.97-4.34l2.83-1.72L377.07,362.06z
					 M377.38,355.72l2.83-1.72l-2.69,7.78L377.38,355.72z M370.2,366.24l-2.97-4.34l2.83-1.72L370.2,366.24z M370.51,359.91
					l2.83-1.72l-2.69,7.78L370.51,359.91z M363.34,370.42l-2.97-4.34l2.83-1.72L363.34,370.42z M363.65,364.09l2.83-1.72l-2.69,7.78
					L363.65,364.09z M356.47,374.6l-2.97-4.34l2.83-1.72L356.47,374.6z M356.78,368.27l2.83-1.72l-2.69,7.78L356.78,368.27z
					 M349.6,378.79l-2.97-4.34l2.83-1.72L349.6,378.79z M349.91,372.45l2.83-1.72l-2.69,7.78L349.91,372.45z M342.73,382.97
					l-2.97-4.34l2.83-1.72L342.73,382.97z M343.04,376.63l2.83-1.72l-2.69,7.78L343.04,376.63z M335.86,387.15l-2.97-4.34l2.83-1.72
					L335.86,387.15z M336.17,380.81l2.83-1.72l-2.69,7.78L336.17,380.81z M329,391.33l-2.97-4.34l2.83-1.72L329,391.33z
					 M329.31,384.99l2.83-1.72l-2.69,7.78L329.31,384.99z M328.86,392.19l-6.11,3.72l2.9-8.4L328.86,392.19z M332.52,383.33
					l3.21,4.69l-6.11,3.72L332.52,383.33z M339.39,379.15l3.21,4.69l-6.11,3.72L339.39,379.15z M346.26,374.96l3.21,4.69l-6.11,3.72
					L346.26,374.96z M353.13,370.78l3.21,4.69l-6.11,3.72L353.13,370.78z M359.99,366.6l3.21,4.69l-6.11,3.72L359.99,366.6z
					 M366.86,362.42l3.21,4.69l-6.11,3.72L366.86,362.42z M373.73,358.24l3.21,4.69l-6.11,3.72L373.73,358.24z M380.6,354.06
					l3.21,4.69l-6.11,3.72L380.6,354.06z M387.46,349.88l3.21,4.69l-6.11,3.72L387.46,349.88z M387.84,349.36l2.83-1.72l0.14,6.06
					L387.84,349.36z M398.13,349.24l-0.14-6.06l2.83-1.72L398.13,349.24z M401.2,341.51l3.21,4.69l-6.11,3.72L401.2,341.51z
					 M397.67,349.52l-2.97-4.34l2.83-1.72L397.67,349.52z M397.54,350.38l-6.11,3.72l2.9-8.4L397.54,350.38z M391.26,353.42
					l-0.14-6.06l2.83-1.72L391.26,353.42z M325.27,387.45l-2.69,7.78l-0.14-6.06L325.27,387.45z M404.54,345.33l-2.97-4.34
					l2.83-1.72L404.54,345.33z"/>
				<path className="palma36" d="M322.16,396.81l6.92,3.78l82.86-50.45l-6.92-3.78L322.16,396.81z M389.75,362.34l-8.15-1.19l2.83-1.72
					L389.75,362.34z M384.88,359.15l2.83-1.72l2.49,4.63L384.88,359.15z M382.88,366.52l-8.15-1.19l2.83-1.72L382.88,366.52z
					 M378.02,363.34l2.83-1.72l2.49,4.63L378.02,363.34z M376.02,370.7l-8.15-1.19l2.83-1.72L376.02,370.7z M371.15,367.52
					l2.83-1.72l2.49,4.63L371.15,367.52z M369.15,374.88L361,373.7l2.83-1.72L369.15,374.88z M364.28,371.7l2.83-1.72l2.49,4.63
					L364.28,371.7z M362.28,379.06l-8.15-1.19l2.83-1.72L362.28,379.06z M357.41,375.88l2.83-1.72l2.49,4.63L357.41,375.88z
					 M355.41,383.24l-8.15-1.19l2.83-1.72L355.41,383.24z M350.54,380.06l2.83-1.72l2.49,4.63L350.54,380.06z M348.55,387.43
					l-8.15-1.19l2.83-1.72L348.55,387.43z M343.68,384.24l2.83-1.72l2.49,4.63L343.68,384.24z M341.68,391.61l-8.15-1.19l2.83-1.72
					L341.68,391.61z M336.81,388.43l2.83-1.72l2.49,4.63L336.81,388.43z M334.81,395.79l-8.15-1.19l2.83-1.72L334.81,395.79z
					 M329.94,392.61l2.83-1.72l2.49,4.63L329.94,392.61z M335.33,396.25l-6.11,3.72l-2.69-5L335.33,396.25z M333.4,390.79l8.8,1.28
					l-6.11,3.72L333.4,390.79z M340.27,386.61l8.8,1.28l-6.11,3.72L340.27,386.61z M347.14,382.43l8.8,1.28l-6.11,3.72
					L347.14,382.43z M354,378.25l8.8,1.28l-6.11,3.72L354,378.25z M360.87,374.06l8.8,1.28l-6.11,3.72L360.87,374.06z
					 M367.74,369.88l8.8,1.28l-6.11,3.72L367.74,369.88z M374.61,365.7l8.8,1.28l-6.11,3.72L374.61,365.7z M381.48,361.52l8.8,1.28
					l-6.11,3.72L381.48,361.52z M388.34,357.34l8.8,1.28l-6.11,3.72L388.34,357.34z M388.47,356.97l2.83-1.72l5.32,2.91
					L388.47,356.97z M403.94,353.7l-5.32-2.91l2.83-1.72L403.94,353.7z M402.08,348.97l8.8,1.28l-6.11,3.72L402.08,348.97z
					 M403.49,353.97l-8.15-1.19l2.83-1.72L403.49,353.97z M404.01,354.44l-6.11,3.72l-2.69-5L404.01,354.44z M397.07,357.88
					l-5.32-2.91l2.83-1.72L397.07,357.88z M325.9,395.07l2.49,4.63l-5.32-2.91L325.9,395.07z M410.35,349.79l-8.15-1.19l2.83-1.72
					L410.35,349.79z"/>
				<path className="palma35" d="M328.9,392.71l0.18,7.89l82.86-50.45l-0.18-7.89L328.9,392.71z M390.86,361.66l-2.97-4.34l2.83-1.72
					L390.86,361.66z M391.17,355.33l2.83-1.72l-2.69,7.78L391.17,355.33z M383.99,365.84l-2.97-4.34l2.83-1.72L383.99,365.84z
					 M384.3,359.51l2.83-1.72l-2.69,7.78L384.3,359.51z M377.13,370.03l-2.97-4.34l2.83-1.72L377.13,370.03z M377.44,363.69
					l2.83-1.72l-2.69,7.78L377.44,363.69z M370.26,374.21l-2.97-4.34l2.83-1.72L370.26,374.21z M370.57,367.87l2.83-1.72l-2.69,7.78
					L370.57,367.87z M363.39,378.39l-2.97-4.34l2.83-1.72L363.39,378.39z M363.7,372.05l2.83-1.72l-2.69,7.78L363.7,372.05z
					 M356.52,382.57l-2.97-4.34l2.83-1.72L356.52,382.57z M356.83,376.23l2.83-1.72l-2.69,7.78L356.83,376.23z M349.65,386.75
					l-2.97-4.34l2.83-1.72L349.65,386.75z M349.96,380.42l2.83-1.72l-2.69,7.78L349.96,380.42z M342.79,390.93l-2.97-4.34l2.83-1.72
					L342.79,390.93z M343.1,384.6l2.83-1.72l-2.69,7.78L343.1,384.6z M335.92,395.11l-2.97-4.34l2.83-1.72L335.92,395.11z
					 M336.23,388.78l2.83-1.72l-2.69,7.78L336.23,388.78z M335.78,395.98l-6.11,3.72l2.9-8.4L335.78,395.98z M339.44,387.11
					l3.21,4.69l-6.11,3.72L339.44,387.11z M346.31,382.93l3.21,4.69l-6.11,3.72L346.31,382.93z M353.18,378.75l3.21,4.69l-6.11,3.72
					L353.18,378.75z M360.05,374.57l3.21,4.69l-6.11,3.72L360.05,374.57z M366.91,370.39l3.21,4.69l-6.11,3.72L366.91,370.39z
					 M373.78,366.2l3.21,4.69l-6.11,3.72L373.78,366.2z M380.65,362.02l3.21,4.69l-6.11,3.72L380.65,362.02z M387.52,357.84
					l3.21,4.69l-6.11,3.72L387.52,357.84z M394.39,353.66l3.21,4.69l-6.11,3.72L394.39,353.66z M394.76,353.14l2.83-1.72l0.14,6.06
					L394.76,353.14z M405.05,353.02l-0.14-6.06l2.83-1.72L405.05,353.02z M408.12,345.3l3.21,4.69l-6.11,3.72L408.12,345.3z
					 M404.6,353.3l-2.97-4.34l2.83-1.72L404.6,353.3z M404.46,354.16l-6.11,3.72l2.9-8.4L404.46,354.16z M398.18,357.21l-0.14-6.06
					l2.83-1.72L398.18,357.21z M332.19,391.24l-2.69,7.78l-0.14-6.06L332.19,391.24z M411.46,349.12l-2.97-4.34l2.83-1.72
					L411.46,349.12z"/>
				<path className="palma125" d="M321.98,388.92l6.92,3.78l82.86-50.45l-6.92-3.78L321.98,388.92z M410.17,341.9l-8.15-1.19l2.83-1.72
					L410.17,341.9z M403.3,346.09l-8.15-1.19l2.83-1.72L403.3,346.09z M398.43,342.9l2.83-1.72l2.49,4.63L398.43,342.9z
					 M396.44,350.27l-8.15-1.19l2.83-1.72L396.44,350.27z M391.57,347.09l2.83-1.72l2.49,4.63L391.57,347.09z M389.57,354.45
					l-8.15-1.19l2.83-1.72L389.57,354.45z M384.7,351.27l2.83-1.72l2.49,4.63L384.7,351.27z M382.7,358.63l-8.15-1.19l2.83-1.72
					L382.7,358.63z M377.83,355.45l2.83-1.72l2.49,4.63L377.83,355.45z M375.83,362.81l-8.15-1.19l2.83-1.72L375.83,362.81z
					 M370.96,359.63l2.83-1.72l2.49,4.63L370.96,359.63z M368.96,366.99l-8.15-1.19l2.83-1.72L368.96,366.99z M364.1,363.81
					l2.83-1.72l2.49,4.63L364.1,363.81z M362.1,371.18l-8.15-1.19l2.83-1.72L362.1,371.18z M357.23,367.99l2.83-1.72l2.49,4.63
					L357.23,367.99z M355.23,375.36l-8.15-1.19l2.83-1.72L355.23,375.36z M350.36,372.18l2.83-1.72l2.49,4.63L350.36,372.18z
					 M348.36,379.54l-8.15-1.19l2.83-1.72L348.36,379.54z M343.49,376.36l2.83-1.72l2.49,4.63L343.49,376.36z M341.49,383.72
					l-8.15-1.19l2.83-1.72L341.49,383.72z M336.63,380.54l2.83-1.72l2.49,4.63L336.63,380.54z M334.63,387.9l-8.15-1.19l2.83-1.72
					L334.63,387.9z M329.76,384.72l2.83-1.72l2.49,4.63L329.76,384.72z M335.15,388.37l-6.11,3.72l-2.69-5L335.15,388.37z
					 M333.22,382.9l8.8,1.28l-6.11,3.72L333.22,382.9z M340.09,378.72l8.8,1.28l-6.11,3.72L340.09,378.72z M346.95,374.54l8.8,1.28
					l-6.11,3.72L346.95,374.54z M353.82,370.36l8.8,1.28l-6.11,3.72L353.82,370.36z M360.69,366.18l8.8,1.28l-6.11,3.72
					L360.69,366.18z M367.56,362l8.8,1.28l-6.11,3.72L367.56,362z M374.42,357.81l8.8,1.28l-6.11,3.72L374.42,357.81z
					 M381.29,353.63l8.8,1.28l-6.11,3.72L381.29,353.63z M388.16,349.45l8.8,1.28l-6.11,3.72L388.16,349.45z M395.03,345.27
					l8.8,1.28l-6.11,3.72L395.03,345.27z M401.89,341.09l8.8,1.28l-6.11,3.72L401.89,341.09z M325.72,387.18l2.49,4.63l-5.32-2.91
					L325.72,387.18z"/>
			</g>
			<g>
				<g>
					<polygon className="palma30" points="283.74,462.37 274.58,467.95 269.6,465.23 265.17,462.81 274.33,457.23 					"/>
					<polygon className="palma31" points="274.58,467.95 269.6,465.23 265.17,462.81 265.19,463.51 269.62,465.93 274.6,468.65 					"/>
					<polygon className="palma29" points="274.58,467.95 279.43,465 283.74,462.37 283.76,463.08 279.45,465.7 274.6,468.65 					"/>
				</g>
				<g>
					<path className="palma34" d="M279.02,365.44l-6.92-3.78l2.26,96.99l6.92,3.78L279.02,365.44z M274.93,434.62l5.24-0.4l0.08,3.31
						L274.93,434.62z M280.26,438.06l0.08,3.31l-5.4-6.22L280.26,438.06z M274.74,426.59l5.24-0.4l0.08,3.31L274.74,426.59z
						 M280.07,430.02l0.08,3.31l-5.4-6.22L280.07,430.02z M274.55,418.55l5.24-0.4l0.08,3.31L274.55,418.55z M279.88,421.98
						l0.08,3.31l-5.4-6.22L279.88,421.98z M274.37,410.51l5.24-0.4l0.08,3.31L274.37,410.51z M279.7,413.95l0.08,3.31l-5.4-6.22
						L279.7,413.95z M274.18,402.47l5.24-0.4l0.08,3.31L274.18,402.47z M279.51,405.91l0.08,3.31l-5.4-6.22L279.51,405.91z
						 M273.99,394.43l5.24-0.4l0.08,3.31L273.99,394.43z M279.32,397.87l0.08,3.31l-5.4-6.22L279.32,397.87z M273.8,386.39l5.24-0.4
						l0.08,3.31L273.8,386.39z M279.13,389.83l0.08,3.31l-5.4-6.22L279.13,389.83z M273.62,378.36l5.24-0.4l0.08,3.31L273.62,378.36
						z M278.95,381.79l0.08,3.31l-5.4-6.22L278.95,381.79z M273.43,370.32l5.24-0.4l0.08,3.31L273.43,370.32z M278.76,373.75
						l0.08,3.31l-5.4-6.22L278.76,373.75z M272.75,369.77l-0.17-7.15l5.83,6.71L272.75,369.77z M278.6,377.37l-5.66,0.43l-0.17-7.15
						L278.6,377.37z M278.78,385.41l-5.66,0.43l-0.17-7.15L278.78,385.41z M278.97,393.45l-5.66,0.43l-0.17-7.15L278.97,393.45z
						 M279.16,401.49l-5.66,0.43l-0.17-7.15L279.16,401.49z M279.35,409.52l-5.66,0.43l-0.17-7.15L279.35,409.52z M279.53,417.56
						l-5.66,0.43l-0.17-7.15L279.53,417.56z M279.72,425.6l-5.66,0.43l-0.17-7.15L279.72,425.6z M279.91,433.64l-5.66,0.43
						l-0.17-7.15L279.91,433.64z M280.1,441.68l-5.66,0.43l-0.17-7.15L280.1,441.68z M280.36,442.26l0.08,3.31l-5.32-2.91
						L280.36,442.26z M275.31,451.23l5.32,2.91l0.08,3.31L275.31,451.23z M280.47,457.76l-5.66,0.43l-0.17-7.15L280.47,457.76z
						 M275.3,450.7l5.24-0.4l0.08,3.31L275.3,450.7z M274.62,450.15l-0.17-7.15l5.83,6.71L274.62,450.15z M275.13,443.19l5.32,2.91
						l0.08,3.31L275.13,443.19z M278.65,369.03l-5.4-6.22l5.32,2.91L278.65,369.03z M275.49,458.74l5.24-0.4l0.08,3.31
						L275.49,458.74z"/>
					<path className="palma36" d="M272.1,361.66l-6.74,4.1l2.26,96.99l6.74-4.1L272.1,361.66z M268.16,437.43l5.1-6.46l0.08,3.31
						L268.16,437.43z M273.35,434.8l0.08,3.31l-5.26-0.16L273.35,434.8z M267.97,429.39l5.1-6.46l0.08,3.31L267.97,429.39z
						 M273.16,426.77l0.08,3.31l-5.26-0.16L273.16,426.77z M267.79,421.35l5.1-6.46l0.08,3.31L267.79,421.35z M272.98,418.73
						l0.08,3.31l-5.26-0.16L272.98,418.73z M267.6,413.31l5.1-6.46l0.08,3.31L267.6,413.31z M272.79,410.69l0.08,3.31l-5.26-0.16
						L272.79,410.69z M267.41,405.28l5.1-6.46l0.08,3.31L267.41,405.28z M272.6,402.65l0.08,3.31l-5.26-0.16L272.6,402.65z
						 M267.22,397.24l5.1-6.46l0.08,3.31L267.22,397.24z M272.41,394.61l0.08,3.31l-5.26-0.16L272.41,394.61z M267.04,389.2
						l5.1-6.46l0.08,3.31L267.04,389.2z M272.23,386.57l0.08,3.31l-5.26-0.16L272.23,386.57z M266.85,381.16l5.1-6.46l0.08,3.31
						L266.85,381.16z M272.04,378.54l0.08,3.31l-5.26-0.16L272.04,378.54z M266.66,373.12l5.1-6.46l0.08,3.31L266.66,373.12z
						 M271.85,370.5l0.08,3.31l-5.26-0.16L271.85,370.5z M266,373.34l-0.17-7.15l5.67,0.17L266,373.34z M271.69,374.4l-5.51,6.98
						l-0.17-7.15L271.69,374.4z M271.88,382.44l-5.51,6.98l-0.17-7.15L271.88,382.44z M272.07,390.48l-5.51,6.98l-0.17-7.15
						L272.07,390.48z M272.26,398.52l-5.51,6.98l-0.17-7.15L272.26,398.52z M272.44,406.56l-5.51,6.98l-0.17-7.15L272.44,406.56z
						 M272.63,414.59l-5.51,6.98l-0.17-7.15L272.63,414.59z M272.82,422.63l-5.51,6.98l-0.17-7.15L272.82,422.63z M273.01,430.67
						l-5.51,6.98l-0.17-7.15L273.01,430.67z M273.19,438.71l-5.51,6.98l-0.17-7.15L273.19,438.71z M273.45,439l0.08,3.31l-5.18,3.15
						L273.45,439z M268.55,454.03l5.18-3.15l0.08,3.31L268.55,454.03z M273.57,454.79l-5.51,6.98l-0.17-7.15L273.57,454.79z
						 M268.54,453.51l5.1-6.46l0.08,3.31L268.54,453.51z M267.87,453.73l-0.17-7.15l5.67,0.17L267.87,453.73z M268.36,446l5.18-3.15
						l0.08,3.31L268.36,446z M271.74,365.77l-5.26-0.16l5.18-3.15L271.74,365.77z M268.72,461.54l5.1-6.46l0.08,3.31L268.72,461.54z
						"/>
					<path className="palma34" d="M272.29,369.54l-6.92-3.78l2.26,96.99l6.92,3.78L272.29,369.54z M268.19,438.73l5.24-0.4l0.08,3.31
						L268.19,438.73z M273.52,442.16l0.08,3.31l-5.4-6.22L273.52,442.16z M268,430.69l5.24-0.4l0.08,3.31L268,430.69z
						 M273.33,434.12l0.08,3.31l-5.4-6.22L273.33,434.12z M267.81,422.65l5.24-0.4l0.08,3.31L267.81,422.65z M273.15,426.09
						l0.08,3.31l-5.4-6.22L273.15,426.09z M267.63,414.61l5.24-0.4l0.08,3.31L267.63,414.61z M272.96,418.05l0.08,3.31l-5.4-6.22
						L272.96,418.05z M267.44,406.57l5.24-0.4l0.08,3.31L267.44,406.57z M272.77,410.01l0.08,3.31l-5.4-6.22L272.77,410.01z
						 M267.25,398.54l5.24-0.4l0.08,3.31L267.25,398.54z M272.58,401.97l0.08,3.31l-5.4-6.22L272.58,401.97z M267.06,390.5l5.24-0.4
						l0.08,3.31L267.06,390.5z M272.4,393.93l0.08,3.31l-5.4-6.22L272.4,393.93z M266.88,382.46l5.24-0.4l0.08,3.31L266.88,382.46z
						 M272.21,385.89l0.08,3.31l-5.4-6.22L272.21,385.89z M266.69,374.42l5.24-0.4l0.08,3.31L266.69,374.42z M272.02,377.86
						l0.08,3.31l-5.4-6.22L272.02,377.86z M266.01,373.87l-0.17-7.15l5.83,6.71L266.01,373.87z M271.86,381.47l-5.66,0.43
						l-0.17-7.15L271.86,381.47z M272.05,389.51l-5.66,0.43l-0.17-7.15L272.05,389.51z M272.23,397.55l-5.66,0.43l-0.17-7.15
						L272.23,397.55z M272.42,405.59l-5.66,0.43l-0.17-7.15L272.42,405.59z M272.61,413.63l-5.66,0.43l-0.17-7.15L272.61,413.63z
						 M272.8,421.67l-5.66,0.43l-0.17-7.15L272.8,421.67z M272.98,429.7l-5.66,0.43l-0.17-7.15L272.98,429.7z M273.17,437.74
						l-5.66,0.43l-0.17-7.15L273.17,437.74z M273.36,445.78l-5.66,0.43l-0.17-7.15L273.36,445.78z M273.62,446.36l0.08,3.31
						l-5.32-2.91L273.62,446.36z M268.58,455.33l5.32,2.91l0.08,3.31L268.58,455.33z M273.73,461.86l-5.66,0.43l-0.17-7.15
						L273.73,461.86z M268.56,454.8l5.24-0.4l0.08,3.31L268.56,454.8z M267.88,454.25l-0.17-7.15l5.83,6.71L267.88,454.25z
						 M268.39,447.29l5.32,2.91l0.08,3.31L268.39,447.29z M271.91,373.13l-5.4-6.22l5.32,2.91L271.91,373.13z M268.75,462.84
						l5.24-0.4l0.08,3.31L268.75,462.84z"/>
					<path className="palma35" d="M279.02,365.44l-6.74,4.1l2.26,96.99l6.74-4.1L279.02,365.44z M275.65,465.33l5.1-6.46l0.08,3.31
						L275.65,465.33z M275.46,457.29l5.1-6.46l0.08,3.31L275.46,457.29z M280.65,454.67l0.08,3.31l-5.26-0.16L280.65,454.67z
						 M275.27,449.25l5.1-6.46l0.08,3.31L275.27,449.25z M280.46,446.63l0.08,3.31l-5.26-0.16L280.46,446.63z M275.08,441.21
						l5.1-6.46l0.08,3.31L275.08,441.21z M280.27,438.59l0.08,3.31l-5.26-0.16L280.27,438.59z M274.9,433.17l5.1-6.46l0.08,3.31
						L274.9,433.17z M280.09,430.55l0.08,3.31l-5.26-0.16L280.09,430.55z M274.71,425.14l5.1-6.46l0.08,3.31L274.71,425.14z
						 M279.9,422.51l0.08,3.31l-5.26-0.16L279.9,422.51z M274.52,417.1l5.1-6.46l0.08,3.31L274.52,417.1z M279.71,414.47l0.08,3.31
						l-5.26-0.16L279.71,414.47z M274.33,409.06l5.1-6.46l0.08,3.31L274.33,409.06z M279.52,406.43l0.08,3.31l-5.26-0.16
						L279.52,406.43z M274.14,401.02l5.1-6.46l0.08,3.31L274.14,401.02z M279.34,398.4l0.08,3.31l-5.26-0.16L279.34,398.4z
						 M273.96,392.98l5.1-6.46l0.08,3.31L273.96,392.98z M279.15,390.36l0.08,3.31l-5.26-0.16L279.15,390.36z M273.77,384.94
						l5.1-6.46l0.08,3.31L273.77,384.94z M278.96,382.32l0.08,3.31l-5.26-0.16L278.96,382.32z M273.58,376.91l5.1-6.46l0.08,3.31
						L273.58,376.91z M278.77,374.28l0.08,3.31l-5.26-0.16L278.77,374.28z M272.92,377.13l-0.17-7.15l5.67,0.17L272.92,377.13z
						 M278.62,378.19l-5.51,6.98l-0.17-7.15L278.62,378.19z M278.8,386.22l-5.51,6.98l-0.17-7.15L278.8,386.22z M278.99,394.26
						l-5.51,6.98l-0.17-7.15L278.99,394.26z M279.18,402.3l-5.51,6.98l-0.17-7.15L279.18,402.3z M279.37,410.34l-5.51,6.98
						l-0.17-7.15L279.37,410.34z M279.55,418.38l-5.51,6.98l-0.17-7.15L279.55,418.38z M279.74,426.42l-5.51,6.98l-0.17-7.15
						L279.74,426.42z M279.93,434.45l-5.51,6.98l-0.17-7.15L279.93,434.45z M280.12,442.49l-5.51,6.98l-0.17-7.15L280.12,442.49z
						 M280.3,450.53l-5.51,6.98l-0.17-7.15L280.3,450.53z M280.49,458.57l-5.51,6.98l-0.17-7.15L280.49,458.57z M278.66,369.55
						l-5.26-0.16l5.18-3.15L278.66,369.55z"/>
				</g>
			</g>
			<g>
				<g>
					<polygon className="palma30" points="333.61,489.64 324.46,495.22 319.47,492.49 315.05,490.07 324.21,484.5 					"/>
					<polygon className="palma31" points="324.46,495.22 319.47,492.49 315.05,490.07 315.06,490.78 319.49,493.2 324.47,495.92 					"/>
					<polygon className="palma29" points="324.46,495.22 329.3,492.27 333.61,489.64 333.63,490.34 329.32,492.97 324.47,495.92 					"/>
				</g>
				<g>
					<path className="palma34" d="M328.9,392.71l-6.92-3.78l2.26,96.99l6.92,3.78L328.9,392.71z M324.8,461.89l5.24-0.4l0.08,3.31
						L324.8,461.89z M330.13,465.33l0.08,3.31l-5.4-6.22L330.13,465.33z M324.61,453.85l5.24-0.4l0.08,3.31L324.61,453.85z
						 M329.95,457.29l0.08,3.31l-5.4-6.22L329.95,457.29z M324.43,445.82l5.24-0.4l0.08,3.31L324.43,445.82z M329.76,449.25
						l0.08,3.31l-5.4-6.22L329.76,449.25z M324.24,437.78l5.24-0.4l0.08,3.31L324.24,437.78z M329.57,441.21l0.08,3.31l-5.4-6.22
						L329.57,441.21z M324.05,429.74l5.24-0.4l0.08,3.31L324.05,429.74z M329.38,433.17l0.08,3.31l-5.4-6.22L329.38,433.17z
						 M323.86,421.7l5.24-0.4l0.08,3.31L323.86,421.7z M329.2,425.14l0.08,3.31l-5.4-6.22L329.2,425.14z M323.68,413.66l5.24-0.4
						l0.08,3.31L323.68,413.66z M329.01,417.1l0.08,3.31l-5.4-6.22L329.01,417.1z M323.49,405.62l5.24-0.4l0.08,3.31L323.49,405.62z
						 M328.82,409.06l0.08,3.31l-5.4-6.22L328.82,409.06z M323.3,397.59l5.24-0.4l0.08,3.31L323.3,397.59z M328.63,401.02l0.08,3.31
						l-5.4-6.22L328.63,401.02z M322.62,397.04l-0.17-7.15l5.83,6.71L322.62,397.04z M328.47,404.64l-5.66,0.43l-0.17-7.15
						L328.47,404.64z M328.66,412.68l-5.66,0.43l-0.17-7.15L328.66,412.68z M328.85,420.72l-5.66,0.43l-0.17-7.15L328.85,420.72z
						 M329.03,428.75l-5.66,0.43l-0.17-7.15L329.03,428.75z M329.22,436.79l-5.66,0.43l-0.17-7.15L329.22,436.79z M329.41,444.83
						l-5.66,0.43l-0.17-7.15L329.41,444.83z M329.6,452.87l-5.66,0.43l-0.17-7.15L329.6,452.87z M329.78,460.91l-5.66,0.43
						l-0.17-7.15L329.78,460.91z M329.97,468.95l-5.66,0.43l-0.17-7.15L329.97,468.95z M330.23,469.53l0.08,3.31l-5.32-2.91
						L330.23,469.53z M325.19,478.5l5.32,2.91l0.08,3.31L325.19,478.5z M330.35,485.02l-5.66,0.43l-0.17-7.15L330.35,485.02z
						 M325.18,477.97l5.24-0.4l0.08,3.31L325.18,477.97z M324.5,477.42l-0.17-7.15l5.83,6.71L324.5,477.42z M325,470.46l5.32,2.91
						l0.08,3.31L325,470.46z M328.52,396.29l-5.4-6.22l5.32,2.91L328.52,396.29z M325.36,486.01l5.24-0.4l0.08,3.31L325.36,486.01z"
						/>
					<path className="palma36" d="M321.98,388.92l-6.74,4.1l2.26,96.99l6.74-4.1L321.98,388.92z M318.04,464.7l5.1-6.46l0.08,3.31
						L318.04,464.7z M323.23,462.07l0.08,3.31l-5.26-0.16L323.23,462.07z M317.85,456.66l5.1-6.46l0.08,3.31L317.85,456.66z
						 M323.04,454.03l0.08,3.31l-5.26-0.16L323.04,454.03z M317.66,448.62l5.1-6.46l0.08,3.31L317.66,448.62z M322.85,446l0.08,3.31
						l-5.26-0.16L322.85,446z M317.47,440.58l5.1-6.46l0.08,3.31L317.47,440.58z M322.66,437.96l0.08,3.31l-5.26-0.16L322.66,437.96
						z M317.28,432.54l5.1-6.46l0.08,3.31L317.28,432.54z M322.48,429.92l0.08,3.31l-5.26-0.16L322.48,429.92z M317.1,424.51
						l5.1-6.46l0.08,3.31L317.1,424.51z M322.29,421.88l0.08,3.31l-5.26-0.16L322.29,421.88z M316.91,416.47l5.1-6.46l0.08,3.31
						L316.91,416.47z M322.1,413.84l0.08,3.31l-5.26-0.16L322.1,413.84z M316.72,408.43l5.1-6.46l0.08,3.31L316.72,408.43z
						 M321.91,405.8l0.08,3.31l-5.26-0.16L321.91,405.8z M316.53,400.39l5.1-6.46l0.08,3.31L316.53,400.39z M321.72,397.77
						l0.08,3.31l-5.26-0.16L321.72,397.77z M315.87,400.61l-0.17-7.15l5.67,0.17L315.87,400.61z M321.57,401.67l-5.51,6.98
						l-0.17-7.15L321.57,401.67z M321.75,409.71l-5.51,6.98l-0.17-7.15L321.75,409.71z M321.94,417.75l-5.51,6.98l-0.17-7.15
						L321.94,417.75z M322.13,425.78l-5.51,6.98l-0.17-7.15L322.13,425.78z M322.32,433.82l-5.51,6.98l-0.17-7.15L322.32,433.82z
						 M322.51,441.86l-5.51,6.98l-0.17-7.15L322.51,441.86z M322.69,449.9l-5.51,6.98l-0.17-7.15L322.69,449.9z M322.88,457.94
						l-5.51,6.98l-0.17-7.15L322.88,457.94z M323.07,465.98l-5.51,6.98l-0.17-7.15L323.07,465.98z M323.32,466.27l0.08,3.31
						l-5.18,3.15L323.32,466.27z M318.42,481.3l5.18-3.15l0.08,3.31L318.42,481.3z M323.44,482.05l-5.51,6.98l-0.17-7.15
						L323.44,482.05z M318.41,480.77l5.1-6.46l0.08,3.31L318.41,480.77z M317.75,480.99l-0.17-7.15l5.67,0.17L317.75,480.99z
						 M318.24,473.26l5.18-3.15l0.08,3.31L318.24,473.26z M321.61,393.04l-5.26-0.16l5.18-3.15L321.61,393.04z M318.6,488.81
						l5.1-6.46l0.08,3.31L318.6,488.81z"/>
					<path className="palma34" d="M322.16,396.81l-6.92-3.78l2.26,96.99l6.92,3.78L322.16,396.81z M318.06,466l5.24-0.4l0.08,3.31
						L318.06,466z M323.4,469.43l0.08,3.31l-5.4-6.22L323.4,469.43z M317.88,457.96l5.24-0.4l0.08,3.31L317.88,457.96z
						 M323.21,461.39l0.08,3.31l-5.4-6.22L323.21,461.39z M317.69,449.92l5.24-0.4l0.08,3.31L317.69,449.92z M323.02,453.35
						l0.08,3.31l-5.4-6.22L323.02,453.35z M317.5,441.88l5.24-0.4l0.08,3.31L317.5,441.88z M322.83,445.32l0.08,3.31l-5.4-6.22
						L322.83,445.32z M317.31,433.84l5.24-0.4l0.08,3.31L317.31,433.84z M322.65,437.28l0.08,3.31l-5.4-6.22L322.65,437.28z
						 M317.13,425.8l5.24-0.4l0.08,3.31L317.13,425.8z M322.46,429.24l0.08,3.31l-5.4-6.22L322.46,429.24z M316.94,417.76l5.24-0.4
						l0.08,3.31L316.94,417.76z M322.27,421.2l0.08,3.31l-5.4-6.22L322.27,421.2z M316.75,409.73l5.24-0.4l0.08,3.31L316.75,409.73z
						 M322.08,413.16l0.08,3.31l-5.4-6.22L322.08,413.16z M316.56,401.69l5.24-0.4l0.08,3.31L316.56,401.69z M321.9,405.12
						l0.08,3.31l-5.4-6.22L321.9,405.12z M315.88,401.14l-0.17-7.15l5.83,6.71L315.88,401.14z M321.73,408.74l-5.66,0.43l-0.17-7.15
						L321.73,408.74z M321.92,416.78l-5.66,0.43l-0.17-7.15L321.92,416.78z M322.11,424.82l-5.66,0.43l-0.17-7.15L322.11,424.82z
						 M322.29,432.86l-5.66,0.43l-0.17-7.15L322.29,432.86z M322.48,440.9l-5.66,0.43l-0.17-7.15L322.48,440.9z M322.67,448.93
						l-5.66,0.43l-0.17-7.15L322.67,448.93z M322.86,456.97l-5.66,0.43l-0.17-7.15L322.86,456.97z M323.04,465.01l-5.66,0.43
						l-0.17-7.15L323.04,465.01z M323.23,473.05l-5.66,0.43l-0.17-7.15L323.23,473.05z M323.49,473.63l0.08,3.31l-5.32-2.91
						L323.49,473.63z M318.45,482.6l5.32,2.91l0.08,3.31L318.45,482.6z M323.61,489.13l-5.66,0.43l-0.17-7.15L323.61,489.13z
						 M318.44,482.07l5.24-0.4l0.08,3.31L318.44,482.07z M317.76,481.52l-0.17-7.15l5.83,6.71L317.76,481.52z M318.26,474.56
						l5.32,2.91l0.08,3.31L318.26,474.56z M321.79,400.4l-5.4-6.22l5.32,2.91L321.79,400.4z M318.63,490.11l5.24-0.4l0.08,3.31
						L318.63,490.11z"/>
					<path className="palma35" d="M328.9,392.71l-6.74,4.1l2.26,96.99l6.74-4.1L328.9,392.71z M325.52,492.6l5.1-6.46l0.08,3.31
						L325.52,492.6z M325.33,484.56l5.1-6.46l0.08,3.31L325.33,484.56z M330.52,481.93l0.08,3.31l-5.26-0.16L330.52,481.93z
						 M325.15,476.52l5.1-6.46l0.08,3.31L325.15,476.52z M330.34,473.89l0.08,3.31l-5.26-0.16L330.34,473.89z M324.96,468.48
						l5.1-6.46l0.08,3.31L324.96,468.48z M330.15,465.86l0.08,3.31l-5.26-0.16L330.15,465.86z M324.77,460.44l5.1-6.46l0.08,3.31
						L324.77,460.44z M329.96,457.82l0.08,3.31l-5.26-0.16L329.96,457.82z M324.58,452.4l5.1-6.46l0.08,3.31L324.58,452.4z
						 M329.77,449.78l0.08,3.31l-5.26-0.16L329.77,449.78z M324.39,444.37l5.1-6.46l0.08,3.31L324.39,444.37z M329.59,441.74
						l0.08,3.31l-5.26-0.16L329.59,441.74z M324.21,436.33l5.1-6.46l0.08,3.31L324.21,436.33z M329.4,433.7l0.08,3.31l-5.26-0.16
						L329.4,433.7z M324.02,428.29l5.1-6.46l0.08,3.31L324.02,428.29z M329.21,425.66l0.08,3.31l-5.26-0.16L329.21,425.66z
						 M323.83,420.25l5.1-6.46l0.08,3.31L323.83,420.25z M329.02,417.63l0.08,3.31l-5.26-0.16L329.02,417.63z M323.64,412.21
						l5.1-6.46l0.08,3.31L323.64,412.21z M328.83,409.59l0.08,3.31l-5.26-0.16L328.83,409.59z M323.46,404.17l5.1-6.46l0.08,3.31
						L323.46,404.17z M328.65,401.55l0.08,3.31l-5.26-0.16L328.65,401.55z M322.79,404.39l-0.17-7.15l5.67,0.17L322.79,404.39z
						 M328.49,405.45l-5.51,6.98l-0.17-7.15L328.49,405.45z M328.68,413.49l-5.51,6.98l-0.17-7.15L328.68,413.49z M328.86,421.53
						l-5.51,6.98l-0.17-7.15L328.86,421.53z M329.05,429.57l-5.51,6.98l-0.17-7.15L329.05,429.57z M329.24,437.61l-5.51,6.98
						l-0.17-7.15L329.24,437.61z M329.43,445.65l-5.51,6.98l-0.17-7.15L329.43,445.65z M329.62,453.68l-5.51,6.98l-0.17-7.15
						L329.62,453.68z M329.8,461.72l-5.51,6.98l-0.17-7.15L329.8,461.72z M329.99,469.76l-5.51,6.98l-0.17-7.15L329.99,469.76z
						 M330.18,477.8l-5.51,6.98l-0.17-7.15L330.18,477.8z M330.37,485.84l-5.51,6.98l-0.17-7.15L330.37,485.84z M328.54,396.82
						l-5.26-0.16l5.18-3.15L328.54,396.82z"/>
				</g>
			</g>
			<g>
				<g>
					<polygon className="palma35" points="278.09,467.97 277.6,468.26 282.48,459.34 282.97,459.05 					"/>
					<polygon className="palma34" points="277.11,467.99 277.6,468.26 282.48,459.34 281.98,459.07 					"/>
					<polygon className="palma125" points="282.97,459.05 282.47,458.78 281.98,459.07 282.48,459.34 					"/>
				</g>
				<g>
					<polygon className="palma125" points="288,471.91 285.09,473.68 282.55,472.3 276.14,468.79 279.05,467.01 					"/>
					<polygon className="palma34" points="285.09,473.68 282.55,472.3 276.14,468.79 276.15,469.14 282.56,472.65 285.1,474.04 					"/>
					<polygon className="palma35" points="285.09,473.68 287.57,472.18 288,471.91 288,472.27 287.57,472.54 285.1,474.04 					"/>
				</g>
				<g>
					<polygon className="palma35" points="282.97,459.05 282.48,459.34 287.36,450.43 287.84,450.13 					"/>
					<polygon className="palma34" points="281.98,459.07 282.48,459.34 287.36,450.43 286.86,450.15 					"/>
					<polygon className="palma125" points="287.84,450.13 287.34,449.86 286.86,450.15 287.36,450.43 					"/>
				</g>
				<g>
					<polygon className="palma125" points="297.76,454.44 294.85,456.22 292.31,454.83 285.9,451.32 288.81,449.54 					"/>
					<polygon className="palma34" points="294.85,456.22 292.31,454.83 285.9,451.32 285.91,451.68 292.32,455.19 294.86,456.57 					"/>
					<polygon className="palma35" points="294.85,456.22 297.33,454.71 297.76,454.44 297.76,454.8 297.33,455.07 294.86,456.57 					"/>
				</g>
				<g>
					<polygon className="palma125" points="290.01,468.42 287.1,470.19 284.56,468.8 278.16,465.29 281.06,463.52 					"/>
					<polygon className="palma34" points="287.1,470.19 284.56,468.8 278.16,465.29 278.16,465.65 284.57,469.16 287.11,470.55 					"/>
					<polygon className="palma35" points="287.1,470.19 289.58,468.68 290.01,468.42 290.02,468.77 289.59,469.04 287.11,470.55 					"/>
				</g>
				<g>
					<polygon className="palma125" points="291.93,464.92 289.02,466.7 286.48,465.31 280.08,461.8 282.98,460.02 					"/>
					<polygon className="palma34" points="289.02,466.7 286.48,465.31 280.08,461.8 280.08,462.16 286.49,465.67 289.03,467.06 					"/>
					<polygon className="palma35" points="289.02,466.7 291.5,465.19 291.93,464.92 291.94,465.28 291.51,465.55 289.03,467.06 					"/>
				</g>
				<g>
					<polygon className="palma125" points="293.84,461.43 290.94,463.2 288.39,461.81 281.99,458.3 284.89,456.53 					"/>
					<polygon className="palma34" points="290.94,463.2 288.39,461.81 281.99,458.3 281.99,458.66 288.4,462.17 290.94,463.56 					"/>
					<polygon className="palma35" points="290.94,463.2 293.41,461.7 293.84,461.43 293.85,461.79 293.42,462.06 290.94,463.56 					"/>
				</g>
				<g>
					<polygon className="palma125" points="295.76,457.94 292.85,459.71 290.31,458.32 283.9,454.81 286.81,453.04 					"/>
					<polygon className="palma34" points="292.85,459.71 290.31,458.32 283.9,454.81 283.91,455.17 290.32,458.68 292.86,460.07 					"/>
					<polygon className="palma35" points="292.85,459.71 295.33,458.2 295.76,457.94 295.77,458.3 295.34,458.56 292.86,460.07 					"/>
				</g>
				<g>
					<polygon className="palma35" points="287.54,473.14 287.05,473.44 291.93,464.52 292.41,464.22 					"/>
					<polygon className="palma34" points="286.55,473.16 287.05,473.44 291.93,464.52 291.43,464.24 					"/>
					<polygon className="palma125" points="292.41,464.22 291.91,463.95 291.43,464.24 291.93,464.52 					"/>
				</g>
				<g>
					<polygon className="palma35" points="292.41,464.22 291.93,464.52 296.8,455.6 297.29,455.3 					"/>
					<polygon className="palma34" points="291.43,464.24 291.93,464.52 296.8,455.6 296.3,455.32 					"/>
					<polygon className="palma125" points="297.29,455.3 296.79,455.03 296.3,455.32 296.8,455.6 					"/>
				</g>
			</g>
			<g>
				<g>
					<g>
						<polygon className="palma30" points="336.7,480.77 326.26,487.13 317.93,482.57 328.37,476.21 						"/>
					</g>
					<g>
						<polygon className="palma31" points="326.66,504.26 318.32,499.7 317.93,482.57 326.26,487.13 						"/>
						<polygon className="palma29" points="324.97,490.56 319.41,487.52 319.38,486.18 324.94,489.22 						"/>
					</g>
					<g>
						<polygon className="palma29" points="337.1,497.9 326.66,504.26 326.26,487.13 336.7,480.77 						"/>
						<g>
							<path className="palma30" d="M334.43,486.78c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C333.08,484.22,334.39,484.94,334.43,486.78z"/>
							<path className="palma124" d="M334.26,486.88c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C332.99,484.48,334.22,485.15,334.26,486.88z"/>
							<path className="palma31" d="M332.53,487.94c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C332.08,487.09,332.52,487.32,332.53,487.94z"/>
							<path className="palma29" d="M332.38,488.03c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C332,487.31,332.37,487.51,332.38,488.03z"/>
						</g>
						<g>
							<path className="palma30" d="M334.61,494.6c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C333.26,492.04,334.57,492.76,334.61,494.6z"/>
							<path className="palma124" d="M334.44,494.7c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C333.17,492.29,334.4,492.97,334.44,494.7z"/>
							<path className="palma31" d="M332.71,495.75c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C332.26,494.9,332.7,495.14,332.71,495.75z"/>
							<path className="palma29" d="M332.57,495.84c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C332.19,495.12,332.55,495.32,332.57,495.84z"/>
							<path className="palma30" d="M335.95,489.91c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C335.5,489.06,335.94,489.3,335.95,489.91z"/>
							<path className="palma31" d="M335.8,490c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C335.42,489.28,335.79,489.48,335.8,490z"/>
							<path className="palma30" d="M329.12,494.07c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C328.67,493.22,329.11,493.46,329.12,494.07z"/>
							<path className="palma31" d="M328.97,494.16c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C328.59,493.44,328.96,493.64,328.97,494.16z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="326.26,487.13 326.28,488.01 326.9,486.74 						"/>
						<polygon className="palma34" points="326.26,487.13 326.28,488.02 325.6,486.77 						"/>
						<polygon className="palma125" points="326.9,486.74 325.6,486.77 326.26,487.13 						"/>
						<polygon className="palma34" points="317.93,482.57 317.95,483.63 318.41,482.84 						"/>
						<polygon className="palma34" points="326.66,504.26 326.63,503.27 326,503.9 						"/>
						<polygon className="palma34" points="318.32,499.7 318.81,499.97 318.3,498.72 						"/>
						<polygon className="palma35" points="337.1,497.9 337.08,496.92 336.57,498.22 						"/>
						<polygon className="palma35" points="326.63,503.27 326.66,504.26 327.22,503.95 						"/>
						<polygon className="palma35" points="336.7,480.77 336.08,481.16 336.73,481.95 						"/>
						<polygon className="palma125" points="318.41,482.84 318.68,482.11 317.93,482.57 						"/>
						<polygon className="palma125" points="336.08,481.16 336.06,480.42 336.7,480.77 						"/>
						<polygon className="palma125" points="328.37,476.21 327.75,476.59 329,476.56 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="336.29,463.47 325.85,469.82 317.52,465.27 327.96,458.91 						"/>
					</g>
					<g>
						<polygon className="palma31" points="326.25,486.96 317.92,482.4 317.52,465.27 325.85,469.82 						"/>
						<polygon className="palma29" points="324.57,473.26 319,470.22 318.97,468.87 324.53,471.91 						"/>
					</g>
					<g>
						<polygon className="palma29" points="336.69,480.6 326.25,486.96 325.85,469.82 336.29,463.47 						"/>
						<g>
							<path className="palma30" d="M334.03,469.48c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C332.67,466.92,333.98,467.64,334.03,469.48z"/>
							<path className="palma124" d="M333.86,469.58c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C332.59,467.18,333.82,467.85,333.86,469.58z"/>
							<path className="palma31" d="M332.13,470.63c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C331.68,469.78,332.11,470.02,332.13,470.63z"/>
							<path className="palma29" d="M331.98,470.72c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C331.6,470.01,331.97,470.21,331.98,470.72z"/>
						</g>
						<g>
							<path className="palma30" d="M334.21,477.29c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C332.86,474.74,334.17,475.45,334.21,477.29z"/>
							<path className="palma124" d="M334.04,477.4c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C332.77,474.99,334,475.67,334.04,477.4z"/>
							<path className="palma31" d="M332.31,478.45c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C331.86,477.6,332.3,477.84,332.31,478.45z"/>
							<path className="palma29" d="M332.16,478.54c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C331.78,477.82,332.15,478.02,332.16,478.54z"/>
							<path className="palma30" d="M335.55,472.61c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C335.1,471.76,335.53,472,335.55,472.61z"/>
							<path className="palma31" d="M335.4,472.7c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C335.02,471.98,335.39,472.18,335.4,472.7z"/>
							<path className="palma30" d="M328.72,476.77c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C328.27,475.92,328.7,476.16,328.72,476.77z"/>
							<path className="palma31" d="M328.57,476.86c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C328.19,476.14,328.56,476.34,328.57,476.86z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="325.85,469.82 325.87,470.71 326.49,469.43 						"/>
						<polygon className="palma34" points="325.85,469.82 325.87,470.71 325.19,469.46 						"/>
						<polygon className="palma125" points="326.49,469.43 325.19,469.46 325.85,469.82 						"/>
						<polygon className="palma34" points="317.52,465.27 317.55,466.33 318.01,465.53 						"/>
						<polygon className="palma34" points="326.25,486.96 326.23,485.97 325.59,486.6 						"/>
						<polygon className="palma34" points="317.92,482.4 318.4,482.67 317.9,481.41 						"/>
						<polygon className="palma35" points="336.69,480.6 336.67,479.61 336.07,481 						"/>
						<polygon className="palma35" points="326.23,485.97 326.25,486.96 326.89,486.57 						"/>
						<polygon className="palma35" points="336.29,463.47 335.67,463.86 336.32,464.64 						"/>
						<polygon className="palma125" points="318.01,465.53 318.28,464.81 317.52,465.27 						"/>
						<polygon className="palma125" points="335.67,463.86 335.66,463.12 336.29,463.47 						"/>
						<polygon className="palma125" points="327.96,458.91 327.35,459.29 328.6,459.26 						"/>
					</g>
				</g>
			</g>
			<g>
				<g>
					<g>
						<polygon className="palma30" points="437.03,419.64 426.58,426 418.25,421.44 428.7,415.08 						"/>
					</g>
					<g>
						<polygon className="palma31" points="426.98,443.13 418.65,438.58 418.25,421.44 426.58,426 						"/>
						<polygon className="palma29" points="425.3,429.43 419.74,426.39 419.71,425.05 425.27,428.09 						"/>
					</g>
					<g>
						<polygon className="palma29" points="437.43,436.77 426.98,443.13 426.58,426 437.03,419.64 						"/>
						<g>
							<path className="palma30" d="M434.76,425.65c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C433.41,423.1,434.72,423.81,434.76,425.65z"/>
							<path className="palma124" d="M434.59,425.75c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C433.32,423.35,434.55,424.02,434.59,425.75z"/>
							<path className="palma31" d="M432.86,426.81c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C432.41,425.96,432.85,426.2,432.86,426.81z"/>
							<path className="palma29" d="M432.71,426.9c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C432.33,426.18,432.7,426.38,432.71,426.9z"/>
						</g>
						<g>
							<path className="palma30" d="M434.94,433.47c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C433.59,430.91,434.9,431.63,434.94,433.47z"/>
							<path className="palma124" d="M434.77,433.57c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C433.5,431.17,434.73,431.84,434.77,433.57z"/>
							<path className="palma31" d="M433.04,434.62c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C432.59,433.77,433.03,434.01,433.04,434.62z"/>
							<path className="palma29" d="M432.89,434.71c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C432.51,433.99,432.88,434.2,432.89,434.71z"/>
							<path className="palma30" d="M436.28,428.78c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C435.83,427.93,436.27,428.17,436.28,428.78z"/>
							<path className="palma31" d="M436.13,428.87c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C435.75,428.15,436.12,428.36,436.13,428.87z"/>
							<path className="palma30" d="M429.45,432.94c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C429,432.09,429.43,432.33,429.45,432.94z"/>
							<path className="palma31" d="M429.3,433.03c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C428.92,432.31,429.29,432.51,429.3,433.03z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="426.58,426 426.61,426.89 427.23,425.61 						"/>
						<polygon className="palma34" points="426.58,426 426.61,426.89 425.93,425.64 						"/>
						<polygon className="palma125" points="427.23,425.61 425.93,425.64 426.58,426 						"/>
						<polygon className="palma34" points="418.25,421.44 418.28,422.5 418.74,421.71 						"/>
						<polygon className="palma34" points="426.98,443.13 426.96,442.14 426.33,442.77 						"/>
						<polygon className="palma34" points="418.65,438.58 419.14,438.84 418.63,437.59 						"/>
						<polygon className="palma35" points="437.43,436.77 437.4,435.79 436.9,437.1 						"/>
						<polygon className="palma35" points="426.96,442.14 426.98,443.13 427.55,442.82 						"/>
						<polygon className="palma35" points="437.03,419.64 436.41,420.04 437.05,420.82 						"/>
						<polygon className="palma125" points="418.74,421.71 419.01,420.98 418.25,421.44 						"/>
						<polygon className="palma125" points="436.41,420.04 436.39,419.29 437.03,419.64 						"/>
						<polygon className="palma125" points="428.7,415.08 428.08,415.46 429.33,415.43 						"/>
					</g>
				</g>
				<g>
					<g>
						<polygon className="palma30" points="436.62,402.34 426.18,408.69 417.85,404.14 428.29,397.78 						"/>
					</g>
					<g>
						<polygon className="palma31" points="426.58,425.83 418.25,421.27 417.85,404.14 426.18,408.69 						"/>
						<polygon className="palma29" points="424.89,412.13 419.33,409.09 419.3,407.75 424.86,410.79 						"/>
					</g>
					<g>
						<polygon className="palma29" points="437.02,419.47 426.58,425.83 426.18,408.69 436.62,402.34 						"/>
						<g>
							<path className="palma30" d="M434.36,408.35c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C433,405.79,434.31,406.51,434.36,408.35z"/>
							<path className="palma124" d="M434.19,408.45c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5s1.13-3.86,2.6-4.76
								C432.91,406.05,434.15,406.72,434.19,408.45z"/>
							<path className="palma31" d="M432.46,409.51c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C432.01,408.65,432.44,408.89,432.46,409.51z"/>
							<path className="palma29" d="M432.31,409.6c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45s0.34-1.15,0.78-1.42
								C431.93,408.88,432.3,409.08,432.31,409.6z"/>
						</g>
						<g>
							<path className="palma30" d="M434.54,416.16c0.04,1.84-1.2,4.11-2.77,5.07c-1.57,0.96-2.88,0.24-2.92-1.6
								c-0.04-1.84,1.2-4.11,2.77-5.07C433.19,413.61,434.49,414.32,434.54,416.16z"/>
							<path className="palma124" d="M434.37,416.27c0.04,1.73-1.13,3.86-2.6,4.76c-1.48,0.9-2.71,0.23-2.75-1.5
								c-0.04-1.73,1.13-3.86,2.6-4.76C433.1,413.86,434.33,414.54,434.37,416.27z"/>
							<path className="palma31" d="M432.64,417.32c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53s0.4-1.37,0.92-1.69
								C432.19,416.47,432.62,416.71,432.64,417.32z"/>
							<path className="palma29" d="M432.49,417.41c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C432.11,416.69,432.48,416.89,432.49,417.41z"/>
							<path className="palma30" d="M435.88,411.48c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C435.43,410.63,435.86,410.87,435.88,411.48z"/>
							<path className="palma31" d="M435.73,411.57c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42S435.72,411.05,435.73,411.57z"/>
							<path className="palma30" d="M429.04,415.64c0.01,0.61-0.4,1.37-0.92,1.69c-0.52,0.32-0.96,0.08-0.97-0.53
								c-0.01-0.61,0.4-1.37,0.92-1.69C428.59,414.79,429.03,415.03,429.04,415.64z"/>
							<path className="palma31" d="M428.9,415.73c0.01,0.52-0.34,1.15-0.78,1.42c-0.44,0.27-0.81,0.07-0.82-0.45
								c-0.01-0.52,0.34-1.15,0.78-1.42C428.52,415.01,428.88,415.21,428.9,415.73z"/>
						</g>
					</g>
					<g>
						<polygon className="palma35" points="426.18,408.69 426.2,409.58 426.82,408.3 						"/>
						<polygon className="palma34" points="426.18,408.69 426.2,409.58 425.52,408.33 						"/>
						<polygon className="palma125" points="426.82,408.3 425.52,408.33 426.18,408.69 						"/>
						<polygon className="palma34" points="417.85,404.14 417.87,405.2 418.33,404.4 						"/>
						<polygon className="palma34" points="426.58,425.83 426.56,424.84 425.92,425.47 						"/>
						<polygon className="palma34" points="418.25,421.27 418.73,421.54 418.23,420.28 						"/>
						<polygon className="palma35" points="437.02,419.47 437,418.49 436.4,419.87 						"/>
						<polygon className="palma35" points="426.56,424.84 426.58,425.83 427.22,425.44 						"/>
						<polygon className="palma35" points="436.62,402.34 436,402.73 436.65,403.51 						"/>
						<polygon className="palma125" points="418.33,404.4 418.6,403.68 417.85,404.14 						"/>
						<polygon className="palma125" points="436,402.73 435.98,401.99 436.62,402.34 						"/>
						<polygon className="palma125" points="428.29,397.78 427.68,398.16 428.92,398.13 						"/>
					</g>
				</g>
			</g>
		</g>
		<g>
			<g>
				<polygon className="palma44" points="356.23,397.82 356.31,397.3 355.89,397.05 355.52,397.1 355.42,397.53 355.6,397.81 				"/>
				<path className="palma129" d="M353.43,397.4c0.72,0.29,2.01,2.6,2.01,2.6l0.16-2.2l0.67,0.11c0,0,0.34,2.65-0.07,3.2
					c-0.41,0.56-2.98-0.93-2.98-0.93l0.26-2.68L353.43,397.4z"/>
				<path className="palma29" d="M356.36,412.9c-0.04-0.2-0.33-0.47-0.59-0.68c-0.56-0.46-1.14-0.43-1.26-0.41
					c-0.14-0.03-0.24-0.05-0.24-0.05c-0.06,0.16-0.13,0.36-0.09,0.54c-0.03,0.04-0.04,0.09-0.01,0.16c0.16,0.38,0.74,0.41,0.88,0.43
					c0.15,0.03,0.23,0.11,0.44,0.22c0.21,0.11,0.5,0.14,0.67,0.11c0.17-0.03,0.21-0.17,0.2-0.22l0,0
					C356.37,412.96,356.37,412.93,356.36,412.9z"/>
				<path className="palma29" d="M349.16,411.82c0.08-0.67-0.22-1.11-0.29-1.2c-0.05-0.14-0.08-0.23-0.08-0.23
					c-0.17,0.03-0.38,0.07-0.51,0.2c-0.05,0-0.1,0.02-0.14,0.07c-0.25,0.34,0.02,0.84,0.07,0.98c0.05,0.14,0.02,0.25,0.03,0.49
					c0.01,0.24,0.13,0.5,0.25,0.63s0.25,0.09,0.29,0.06l0,0c0.03-0.01,0.06-0.03,0.08-0.05c0.15-0.14,0.23-0.52,0.29-0.86
					c0,0,0,0,0,0C349.16,411.89,349.16,411.86,349.16,411.82z"/>
				<path className="palma390" d="M354.66,402.95l-1.76,1.07c0,0,1.57,2.89,1.93,3.63c0,0.08-0.58,3.87-0.58,3.87
					c-0.01,0.76,1.25,0.7,1.26,0.43l1.02-3.91c0.11-0.43,0.09-0.88-0.06-1.3l-1.14-3.76L354.66,402.95z"/>
				<path className="palma50" d="M352.82,403.82l-1.06,0.17c0,0-0.4,2.63-0.87,4.05c-0.03,0.1-2.39,2.49-2.39,2.49
					c-0.25,0.44,0.02,0.94,0.61,0.93l3.39-2.51c0.23-0.17,0.41-0.41,0.5-0.68l1.69-4.77L352.82,403.82z"/>
				<path className="palma44" d="M352.62,396.97c0.02,0.21,0.05,0.41,0.08,0.56c0.2,0.03,0.33,0.2,0.33,0.2s0.64,0.77,0.37,0.94
					c-0.35,0.22-1.76-0.07-1.7-0.23c0.07-0.17-0.12-0.37-0.3-0.59c-0.08-0.09-0.15-0.21-0.21-0.3c-0.24-0.33-0.46-0.64-0.46-0.64
					L352.62,396.97z"/>
				<path className="palma47" d="M352.66,397.25C352.66,397.25,352.66,397.25,352.66,397.25c0.01,0.08,0.02,0.16,0.03,0.22
					c-0.26,0.15-1.11,0.31-1.43,0.2c-0.03-0.04-0.06-0.08-0.08-0.11c-0.24-0.33-0.46-0.64-0.46-0.64l1.9,0.05
					c0.01,0.09,0.02,0.17,0.03,0.25C352.66,397.23,352.66,397.24,352.66,397.25z"/>
				<path className="palma46" d="M350.57,401.41c-0.84-2.15-0.06-2.46,0.26-2.75c0.3-0.27,0.67-0.58,0.57-0.79l0-0.01
					c0.47,0.05,1.29-0.44,1.29-0.44l0.02,0.12c0.28-0.14,0.51-0.23,0.66-0.2c0.21,0.04,0.47,0.1,0.59,0.23c0,0,0,0,0,0
					c0.16,0.11,0.61,1.4,0.77,2.04c0.15,0.62,0.47,1.7,0.68,3.28c0.03,0.2-0.13,0.33-0.28,0.48c-0.34,0.33-0.94,0.96-1.72,1.39
					c-0.75,0.41-1.66-0.1-1.73-0.27C351.3,403.67,350.82,402.04,350.57,401.41z"/>
				<path className="palma44" d="M350.9,395.23c0.45-0.18,0.98-0.33,1.71,0.25c0.08,0.06,0.14,0.17,0.22,0.37c0.03,0.07,0,0.21,0.04,0.27
					c0.01,0.01,0.01,0.02,0.01,0.03c0.29,0.27,0.25,1.17,0.14,1.28c-0.24,0.26-1.82,0.47-2.32-0.5
					C350.37,396.28,350.46,395.42,350.9,395.23z"/>
				<path className="palma29" d="M351.98,395.65c-0.34,0.33-0.31,0.68-0.31,1.02c-0.69-0.74-0.4,0.78-0.86,0.47
					c-0.46-0.31-0.99-1.66-0.12-2.12C351.25,394.72,351.98,395.65,351.98,395.65z"/>
				<path className="palma30" d="M352.8,394.94c0.06,0.27-0.39,1.1-1.17,1.01s-1.1-0.28-1.16-0.42c-0.11-0.25,0.2-1.2,1.43-0.68
					C352.49,395.1,352.69,395.04,352.8,394.94z"/>
				<g>
					<g>
						<path className="palma131" d="M356.58,398.21l-1.08-0.17l-0.04-0.11l1.08,0.17c0.08,0.01,0.14,0.01,0.17,0
							c0.02-0.01,0.03-0.02,0.02-0.03c-0.01-0.02-0.1-0.09-0.27-0.12l-1.04-0.17l-0.04-0.11l1.04,0.17
							c0.24,0.04,0.39,0.16,0.43,0.25c0.02,0.05,0,0.1-0.05,0.12C356.76,398.23,356.68,398.23,356.58,398.21z"/>
						<path className="palma391" d="M352.89,396.97c0.02,0.06,0.01,0.16-0.03,0.21c-0.04,0.05-0.1,0.04-0.12-0.02
							c-0.02-0.06-0.01-0.16,0.03-0.21C352.81,396.9,352.86,396.9,352.89,396.97z"/>
					</g>
					<g>
						<path className="palma392" d="M352.96,397.16l-0.15-0.03c0,0-0.04-0.03-0.03-0.08c0.01-0.06,0.04-0.07,0.04-0.07l0.16,0.02
							L352.96,397.16z"/>
						<path className="palma392" d="M353,397.04c0.01,0.03,0,0.08-0.02,0.11c-0.02,0.03-0.05,0.02-0.06-0.01c-0.01-0.03,0-0.08,0.02-0.11
							C352.96,397.01,352.99,397.01,353,397.04z"/>
					</g>
					<g>
						<path className="palma131" d="M353.09,397.16l-0.12-0.02c0,0-0.03-0.02-0.02-0.06c0.01-0.04,0.03-0.05,0.03-0.05l0.12,0.02
							L353.09,397.16z"/>
						<path className="palma131" d="M353.13,397.07c0.01,0.02,0,0.06-0.01,0.08s-0.04,0.02-0.05-0.01c-0.01-0.02,0-0.06,0.01-0.08
							C353.09,397.04,353.12,397.04,353.13,397.07z"/>
					</g>
					<g>
						<path className="palma392" d="M353.23,397.2l-0.15-0.03c0,0-0.04-0.03-0.03-0.08c0.01-0.06,0.04-0.07,0.04-0.07l0.16,0.02
							L353.23,397.2z"/>
						<path className="palma392" d="M353.27,397.08c0.01,0.03,0,0.08-0.02,0.11c-0.02,0.03-0.05,0.02-0.06-0.01
							c-0.01-0.03,0-0.08,0.02-0.11C353.23,397.04,353.26,397.04,353.27,397.08z"/>
					</g>
					<path className="palma391" d="M356.78,398.34l-2.69-0.43c-0.16-0.02-0.3-0.09-0.43-0.19c-0.11-0.09-0.19-0.2-0.24-0.31
						c-0.03-0.07-0.04-0.14-0.03-0.2l-0.17-0.03c0,0-0.01-0.02-0.01-0.05c0-0.02,0.02-0.03,0.02-0.03l0.19,0.03
						c0.05-0.08,0.15-0.13,0.32-0.1l2.98,0.48c0.45,0.07,0.83-0.41,0.97-0.52l0.37,1.34l-0.56,0.06c-0.31-0.48-0.3-0.72-0.75-0.79
						l-2.98-0.48c-0.09-0.02-0.16,0-0.21,0.03l2.92,0.47c0.32,0.05,0.56,0.26,0.63,0.44C357.2,398.23,357.12,398.39,356.78,398.34z
						 M353.52,397.22c-0.02,0.06-0.01,0.13,0.01,0.2c0.03,0.09,0.1,0.18,0.18,0.24c0.1,0.08,0.21,0.13,0.34,0.15l2.69,0.43
						c0.27,0.04,0.34-0.08,0.29-0.21c-0.05-0.13-0.23-0.29-0.49-0.33L353.52,397.22z"/>
					<g>
						<path className="palma392" d="M354.88,398.13l-0.61-0.1c-0.07-0.01-0.13-0.04-0.18-0.09c-0.05-0.04-0.08-0.09-0.1-0.15
							c-0.04-0.11-0.01-0.21,0.13-0.19l0.58,0.09l0.04,0.1l-0.58-0.09c-0.08-0.01-0.09,0.06-0.07,0.11
							c0.01,0.03,0.03,0.06,0.06,0.08c0.03,0.02,0.06,0.04,0.09,0.04l0.61,0.1L354.88,398.13z"/>
					</g>
					<g>
						<polygon className="palma131" points="354.58,397.16 354.53,397.15 354.48,397.03 354.53,397.03 						"/>
						<polygon className="palma392" points="355.05,398.21 354.85,398.18 354.44,397.09 354.64,397.12 						"/>
					</g>
					<g>
						<polygon className="palma131" points="354.89,397.21 354.84,397.2 354.8,397.08 354.85,397.08 						"/>
						<polygon className="palma392" points="355.37,398.26 355.17,398.23 354.75,397.14 354.95,397.17 						"/>
					</g>
					<g>
						<polygon className="palma131" points="355.22,397.26 355.17,397.25 355.12,397.13 355.17,397.14 						"/>
						<polygon className="palma392" points="355.69,398.32 355.49,398.28 355.07,397.19 355.27,397.22 						"/>
					</g>
					<path className="palma391" d="M358.26,397.18c0.13,0.34,0.05,0.85-0.18,1.13c-0.23,0.28-0.52,0.24-0.65-0.1
						c-0.13-0.34-0.05-0.85,0.18-1.13C357.83,396.79,358.13,396.84,358.26,397.18z"/>
					<path className="palma131" d="M358.22,397.23c0.12,0.31,0.05,0.77-0.16,1.03c-0.21,0.26-0.48,0.22-0.59-0.09
						c-0.12-0.31-0.05-0.77,0.16-1.03C357.83,396.87,358.1,396.92,358.22,397.23z"/>
					<path className="palma392" d="M355.2,397.04c0.05,0.01,0.06,0.04,0.03,0.08s-0.09,0.06-0.14,0.05c-0.05-0.01-0.06-0.04-0.03-0.08
						S355.15,397.03,355.2,397.04z"/>
					<path className="palma392" d="M354.87,396.99c0.05,0.01,0.06,0.04,0.03,0.08c-0.03,0.04-0.09,0.06-0.14,0.05
						c-0.05-0.01-0.06-0.04-0.03-0.08C354.76,397.01,354.82,396.99,354.87,396.99z"/>
					<path className="palma392" d="M354.56,396.95c0.05,0.01,0.06,0.04,0.03,0.08c-0.03,0.04-0.09,0.06-0.14,0.05
						c-0.05-0.01-0.06-0.04-0.03-0.08C354.45,396.97,354.51,396.94,354.56,396.95z"/>
				</g>
				<path className="palma129" d="M350.38,399.1c-0.42,0.53-0.26,1.32-0.01,1.51c0.44,0.32,2.39,1.22,3.17,0.77
					c0.78-0.45,1.5-3.31,1.5-3.31l-0.6-0.23l-1.29,2.24C353.16,400.07,350.81,398.57,350.38,399.1z"/>
				<polygon className="palma44" points="354.52,397.86 354.2,397.45 354.25,397.34 354.49,397.53 354.71,397 354.84,396.87 355.43,396.99 
					355.64,397.25 355.52,397.34 355.22,397.49 355.05,398.06 				"/>
			</g>
			<g>
				<g>
					<path className="palma44" d="M354.68,416.49c0.09-0.34,0.04-0.54-0.03-0.7c-0.07-0.16-0.19-0.35-0.23-0.37
						c-0.05-0.02,0.03-0.15,0.12-0.07c0.09,0.08,0.17,0.29,0.22,0.26c0.05-0.03,0.2-0.84,0.32-0.86c0.11-0.02-0.06,0.39-0.06,0.56
						c0,0,0.28-0.13,0.37,0.08c0.1,0.21-0.19,1.23-0.23,1.27C355.12,416.71,354.73,416.72,354.68,416.49z"/>
					<path className="palma44" d="M353.39,422.27c-0.17-0.11-0.43-0.4-0.16-1.07c0.27-0.67,1.43-4.49,1.45-4.7
						c0.05-0.37,0.62-0.3,0.48,0.17c-0.06,0.18-0.53,3.82-1.12,5.44C353.84,422.35,353.63,422.43,353.39,422.27z"/>
					<g>
						<path className="palma393" d="M351.24,436.04c-0.11,0.09-0.25,0.52,0,0.7c0.26,0.19,0.44,0.15,0.69,0.23
							c0.25,0.08,0.49,0.37,0.8,0.15c0.22-0.16-0.18-0.29-0.46-0.56C352.06,436.37,351.24,436.04,351.24,436.04z"/>
						<path className="palma40" d="M352.33,436.54c0.3,0.2,0.57,0.38,0.44,0.55c-0.31,0.18-0.69-0.18-0.93-0.26
							c-0.25-0.08-0.36-0.14-0.58-0.36c-0.16-0.17-0.06-0.36,0.03-0.38C351.56,436.03,351.66,436.09,352.33,436.54z"/>
					</g>
					<g>
						<path className="palma393" d="M353.15,435.6c-0.13,0.1-0.29,0.59,0,0.81c0.3,0.22,0.51,0.17,0.79,0.26c0.29,0.09,0.56,0.43,0.92,0.17
							c0.26-0.18-0.2-0.34-0.53-0.64C354.09,435.98,353.15,435.6,353.15,435.6z"/>
						<path className="palma40" d="M354.4,436.18c0.35,0.23,0.65,0.44,0.5,0.63c-0.35,0.21-0.79-0.21-1.07-0.3
							c-0.29-0.09-0.42-0.16-0.66-0.42c-0.18-0.19-0.07-0.41,0.03-0.43C353.52,435.6,353.64,435.66,354.4,436.18z"/>
					</g>
					<path className="palma126" d="M354.3,423.79l-0.6,0.82c-0.38-0.3-1.3-3.55-0.06-3.31L354.3,423.79z"/>
					<path className="palma45" d="M354.12,426.65c0,0,1.18,3.56,1.38,4.84c0.02,0.13,0.06,0.29,0,0.44c-0.53,1.44-1.67,3.87-1.67,3.87
						s-0.16,0.09-0.42,0.01c-0.25-0.08-0.26-0.21-0.26-0.21s0.87-3.45,1.16-3.83c0,0-1.02-1.88-1.31-2.96
						c-0.29-1.07-0.29-1.73-0.29-1.73L354.12,426.65z"/>
					<path className="palma39" d="M353.06,427.98c0,0,0.32,2.69,0.52,3.97c0.02,0.13,0.06,0.29,0,0.44c-0.53,1.44-1.67,3.87-1.67,3.87
						s-0.16,0.09-0.42,0.01c-0.25-0.08-0.26-0.21-0.26-0.21s0.87-3.45,1.16-3.83c0,0-0.86-2.23-1.15-3.3
						c-0.29-1.07,0.1-2.36,0.1-2.36s2.57-0.59,2.79,0.08C354.32,427.25,353.06,427.98,353.06,427.98z"/>
					<path className="palma394" d="M351.45,426.1c0.19-0.5-0.39-1.97-0.53-2.39c-0.07-0.22-0.5-0.37-0.39-0.72
						c0.59-0.69,0.68-0.83,1.3-1.17c0.56-0.3,1.01-0.51,1.34-0.55c0.45-0.06,0.7,0.12,0.83,0.39c0.2,0.4,0.12,0.69,0.34,1.3
						c0.22,0.61-0.01,0.94-0.21,1.11c0,0.04-0.33,1.6-0.01,2.54c0,0.01,0.01,0.03,0.01,0.04c0,0,0,0,0,0
						C354.19,427.23,350.63,428.3,351.45,426.1z"/>
					<path className="palma44" d="M350.96,428.55c0.05,0.07,0.31,0.28,0.24,0.33c-0.08,0.05-0.2-0.06-0.34-0.14
						c-0.15-0.08-0.28-0.33-0.34-0.54c-0.06-0.21-0.03-0.31-0.03-0.39c0,0,0.26-0.33,0.27-0.11c0.01,0.09,0.15,0.25,0.22,0.37
						c0.1,0.18,0.2,0.35,0.14,0.37c-0.09,0.03-0.17-0.13-0.24-0.15c-0.01,0-0.02,0-0.02,0C350.79,428.3,350.92,428.48,350.96,428.55
						z"/>
					<path className="palma395" d="M352.69,424.72c0.32-0.14,0.44-0.48,0.84-0.45c0.4,0.03,0.59-0.2,0.59-0.2c0,0.01-0.02,0.11-0.05,0.27
						c-0.22,0.11-0.48,0.14-0.66,0.16c-0.12,0.02-0.27,0.05-0.37,0.12c-0.75,0.56-1.21,0.11-1.21,0.11
						C351.99,424.79,352.37,424.86,352.69,424.72z"/>
					<path className="palma44" d="M352.07,421.71c0,0,0.44,1.29,1.12,1.12c0.93-0.24-0.03-1.55-0.03-1.55l-0.56,0.03L352.07,421.71z"/>
					<path className="palma29" d="M353.83,418.95c0.8,3.93-0.66,2.32-0.66,2.32l-1.04-2.4l1.33-0.07L353.83,418.95z"/>
					<path className="palma44" d="M353.19,420.77c-0.02,0.18-0.02,0.38-0.02,0.51c-0.16,0.28-1.17,0.53-1.1,0.41
						c0.25-0.38-0.15-1.26-0.15-1.26L353.19,420.77z"/>
					<path className="palma47" d="M353.17,421c0,0.07-0.01,0.13-0.01,0.19c-0.24,0.08-0.82,0.01-1.05-0.14c-0.07-0.32-0.19-0.62-0.19-0.62
						l1.27,0.33c-0.01,0.07-0.01,0.14-0.02,0.21C353.17,420.98,353.17,420.99,353.17,421z"/>
					<path className="palma44" d="M352.03,418.44c0.48-0.1,1.03-0.16,1.66,0.55c0.07,0.07,0.11,0.19,0.15,0.41
						c0.01,0.07-0.04,0.21-0.01,0.28c0,0.01,0.01,0.02,0.01,0.03c0.24,0.32,0.04,1.21-0.08,1.3c-0.29,0.21-1.89,0.15-2.22-0.9
						C351.32,419.39,351.55,418.54,352.03,418.44z"/>
					<path className="palma29" d="M351.45,419.43c-0.02-0.75,0.28-1.09,0.59-1.2l0,0c0,0,0.01,0,0.01,0c0.04-0.01,0.07-0.02,0.11-0.03
						c1.25-0.33,1.74,0.75,1.67,0.92c-0.21-0.16-0.17-0.04-0.5-0.11c-0.36,0.39-0.94,0.2-0.84,1.71
						C352.52,421.25,351.55,423.92,351.45,419.43z"/>
					<path className="palma44" d="M351.26,422.34c0.2,0.02,0.44,0.08,0.46,0.8s-1.57,1.97-1.55,2.31c0.02,0.34,0.48,1.9,0.6,2.25
						c0.07,0.22-0.18,0.58-0.28,0.33c-0.3-0.82-1.01-1.69-1.13-2.43C349.25,424.87,350.53,422.28,351.26,422.34z"/>
				</g>
				<g>
					<g>
						<path className="palma29" d="M355.32,437.59c-0.05,0-0.1-0.03-0.11-0.08c-0.01-0.06,0.02-0.12,0.08-0.13l2.68-0.67l-0.24-10.44
							c0-0.06,0.05-0.11,0.11-0.11c0.06,0,0.11,0.05,0.11,0.11l0.25,10.61l-2.85,0.71C355.34,437.59,355.33,437.59,355.32,437.59z"
							/>
					</g>
					<g>
						<path className="palma29" d="M360.89,437.46c-0.01,0-0.02,0-0.02,0l-2.8-0.56c-0.06-0.01-0.1-0.07-0.08-0.13
							c0.01-0.06,0.07-0.1,0.13-0.08l2.8,0.56c0.06,0.01,0.1,0.07,0.08,0.13C360.98,437.43,360.93,437.46,360.89,437.46z"/>
					</g>
					<g>
						<path className="palma29" d="M358.14,439.08c-0.06,0-0.11-0.05-0.11-0.11l-0.05-2.18c0-0.06,0.05-0.11,0.11-0.11
							c0.06,0,0.11,0.05,0.11,0.11l0.05,2.18C358.25,439.03,358.2,439.08,358.14,439.08z"/>
					</g>
					<g>
						<path className="palma29" d="M358.22,427.79c-0.04,0-0.08-0.02-0.1-0.05l-3.64-6.24c-0.03-0.05-0.01-0.12,0.04-0.15
							c0.05-0.03,0.12-0.01,0.15,0.04l3.64,6.24c0.03,0.05,0.01,0.12-0.04,0.15C358.25,427.78,358.24,427.79,358.22,427.79z"/>
					</g>
					<path className="palma29" d="M355.12,421.4c0,0,0.05,0.07,0.01,0.16c-0.04,0.11-0.18,0.18-0.18,0.18l-1.14-0.68l0.31-0.44
						L355.12,421.4z"/>
					<path className="palma30" d="M354.12,420.54c0.15,0.11,0.19,0.31,0.08,0.46c-0.11,0.15-0.31,0.19-0.46,0.08
						c-0.15-0.11-0.19-0.31-0.08-0.46C353.76,420.47,353.97,420.43,354.12,420.54z"/>
				</g>
			</g>
			<g>
				<path className="palma40" d="M372.67,416.18c0,0,1.02-0.63,0.08-3.74c-0.95-3.11-1.95-4.93-1.95-4.93l-0.5,0.63
					c0,0,1.67,2.89,2.16,5.18s0.24,2.23,0.24,2.23L372.67,416.18z"/>
				<path className="palma44" d="M368.45,406.89c-0.13-0.22-0.27-0.28-0.91,0.13c-0.62,0.66-0.74,2.21-1.05,2.51
					c-0.3,0.3-2.45,1.85-2.63,2.04c-0.18,0.2-0.02,0.29,0.25,0.41c0.72-0.38,2.52-1.22,3.24-1.81
					C367.85,409.78,368.94,407.68,368.45,406.89z"/>
				<path className="palma50" d="M368.17,409.34c0.54-0.8,1.07-1.93,0.82-2.38c-0.11-0.19-1.09-0.58-1.57,0.01
					c-0.41,0.5-0.65,1.44-0.76,2.08L368.17,409.34z"/>
				<path className="palma44" d="M368.44,405.95c0.04,0.22,0.07,0.44,0.09,0.6c-0.2,0.09-0.27,0.31-0.27,0.31s-0.42,1-0.1,1.08
					c0.43,0.12,1.93-0.7,1.82-0.84c-0.35-0.46,0.06-1.71,0.06-1.71L368.44,405.95z"/>
				<path className="palma47" d="M368.48,406.25c0.01,0.09,0.02,0.17,0.03,0.24c0.32,0.08,1.06-0.06,1.34-0.28
					c0.05-0.42,0.18-0.81,0.18-0.81l-1.6,0.55c0.02,0.09,0.03,0.18,0.04,0.27C368.48,406.23,368.48,406.24,368.48,406.25z"/>
				<path className="palma44" d="M369.59,403.5c-0.51-0.07-1.11-0.08-1.72,0.71c-0.06,0.08-0.1,0.21-0.13,0.44
					c-0.01,0.08,0.05,0.22,0.03,0.3c0,0.01,0,0.02-0.01,0.04c-0.23,0.36,0.05,1.28,0.19,1.37c0.32,0.2,2.02,0,2.28-1.13
					C370.42,404.45,370.1,403.57,369.59,403.5z"/>
				<path className="palma29" d="M369.37,422.52c0.03-0.19-0.04-0.4-0.12-0.57c0,0-0.1,0.02-0.25,0.06c-0.12-0.01-0.69-0.01-1.25,0.44
					c-0.03,0.02-0.06,0.04-0.08,0.06l0,0c-0.27,0.25-0.58,0.55-0.6,0.77c0,0.01,0,0.03,0,0.04c0,0.02,0,0.03,0.01,0.05l0,0
					c-0.01,0.05,0.04,0.2,0.22,0.23c0.18,0.02,0.49-0.01,0.71-0.15c0.22-0.13,0.3-0.22,0.45-0.26c0.16-0.04,0.77-0.09,0.92-0.51
					C369.41,422.61,369.4,422.56,369.37,422.52z"/>
				<path className="palma29" d="M375.75,420.47c-0.05-0.06-0.1-0.08-0.15-0.07c-0.15-0.13-0.37-0.17-0.56-0.19c0,0-0.03,0.1-0.07,0.25
					c-0.07,0.1-0.36,0.59-0.25,1.3c0,0.04,0.01,0.07,0.01,0.1c0.08,0.36,0.19,0.78,0.36,0.91c0.01,0.01,0.02,0.01,0.03,0.02
					c0.02,0.01,0.03,0.01,0.05,0.02l0,0c0.04,0.03,0.19,0.07,0.31-0.08c0.11-0.14,0.24-0.43,0.23-0.68c0-0.26-0.04-0.37,0.01-0.52
					C375.77,421.37,376.03,420.82,375.75,420.47z"/>
				<path className="palma46" d="M368.39,412.54l1.94,1.05c0,0-1.54,3.17-1.88,3.98c0,0.09,0.82,4.11,0.82,4.11
					c0.05,0.81-1.31,0.81-1.32,0.52l-1.28-4.13c-0.14-0.45-0.14-0.94,0-1.39l0.91-2.96L368.39,412.54z"/>
				<path className="palma129" d="M370.4,413.39l1.14,0.13c0,0,0.56,2.8,1.13,4.28c0.04,0.1,2.68,2.55,2.68,2.55
					c0.29,0.46,0.02,1-0.61,1.03l-3.75-2.51c-0.26-0.17-0.45-0.42-0.57-0.7l-1.73-4.23L370.4,413.39z"/>
				<path className="palma390" d="M371.28,407.75c-0.22-0.24-1.05-0.7-1.33-0.8c-0.17,0.37-1.02,0.8-1.55,0.66c-0.52-0.14,0-0.93,0.13-1.05
					c-0.33-0.06-0.53-0.06-0.68,0.01c0,0,0,0-0.01,0c-0.3,0.16-0.5,0.47-0.55,0.81c-0.07,0.51-0.17,1.44-0.15,1.94
					c0.03,0.68,0.1,2.83,0.08,4.56c0.03,0.22,1.8,0.6,2.7,0.89c0.41,0.13,1.9-0.69,1.93-0.89
					C372.01,412.94,371.34,407.81,371.28,407.75z"/>
				<path className="palma50" d="M370.07,406.99c-0.06-0.02-0.12-0.04-0.18-0.06c-0.17,0.37-0.86,0.7-1.39,0.56
					c-0.52-0.14-0.1-0.8,0.03-0.93c-0.08-0.01-0.15-0.03-0.22-0.04c-0.13,0.2-0.28,0.53-0.22,0.78c0.04,0.17,0.17,0.29,0.36,0.34
					c0.11,0.03,0.22,0.04,0.33,0.04C369.31,407.67,369.88,407.33,370.07,406.99z"/>
				<path className="palma40" d="M367.89,406.53c0,0-0.78,1.63-0.36,5.58l0.45-0.51c0,0-0.39-4.01,0.4-5.08
					C368.39,406.51,368.09,406.43,367.89,406.53z"/>
				<g>
					<path className="palma45" d="M363.18,411.45l-0.15-0.3c0,0-1.36-0.35-1.7-0.35c-0.33,0-0.48,0.11-0.48,0.27c0,0.21,0.48,0.4,0.56,0.18
						c0.24,0.11,1.1,0.58,1.1,0.58s-0.01-0.06,0.52-0.04C363.55,411.81,363.18,411.45,363.18,411.45z"/>
					<path className="palma39" d="M369.72,415.41c-0.32-0.35-0.8-0.59-1.28-0.61c-0.18-0.01-0.37,0.19-0.57,0.09
						c-0.2-0.09-0.63-0.06-0.63-0.2c0-0.01,0.14-0.46,0.14-0.47c0.01-0.02,0.02-0.04,0.03-0.05c0.29-0.27,1.01,0.6,1.19-0.54
						l-0.12-0.18c0.15-0.27-0.22-0.24-0.02-0.78c0.15-0.41-0.89-0.37-0.94-0.55c0-0.01,0.14-0.47,0.14-0.48
						c0.02-0.03,0.09-0.05,0.24-0.06c1.24-0.02,1.44,0.88,1.87,1.12c0.39,0.22,0.82,0.35,1.24,0.39c0.54,0.04,1.27,0.14,1.64,0.33
						c0.6,0.31,0.9,0.67,0.35,2.09c0,0-0.03,0.01-0.04,0.03c-0.01,0.03-0.04,0.08-0.04,0.08c-0.69,1.35-1.12,1.34-1.75,1.1
						C370.82,416.57,370.19,415.93,369.72,415.41z"/>
					<path className="palma45" d="M369.58,415.88c-0.32-0.35-0.8-0.59-1.28-0.61c-0.18-0.01-0.39-0.05-0.59-0.14
						c-0.24-0.11-0.59-0.34-0.43-0.49c0.29-0.27,1.01,0.6,1.19-0.54l-0.12-0.18c0.15-0.27-0.22-0.24-0.02-0.78
						c0.2-0.54-1.39-1.07-0.56-1.08c1.24-0.02,1.44,0.88,1.87,1.12c0.39,0.22,0.82,0.35,1.24,0.39c0.54,0.05,1.27,0.14,1.64,0.33
						c0.6,0.31,0.89,0.62,0.35,2.04c0,0-0.02,0.06-0.03,0.08c-0.01,0.03-0.04,0.08-0.04,0.08c-0.69,1.35-1.12,1.34-1.75,1.1
						C370.68,417.04,370.05,416.39,369.58,415.88z"/>
					<path className="palma26" d="M368.51,413.28c0.09-0.12,0.25,0.15,0.6,0.33c0.34,0.18,1.25,0.22,1.83,0.56s-0.26,1.08-0.32,1.34
						c-0.05,0.26,0.4,1.05,0.25,1.17c-0.15,0.12-0.67-0.13-1.25-0.89c-0.58-0.76-1.46-0.48-1.93-0.75c-0.36-0.2-0.35-0.31-0.28-0.34
						c0.07-0.03,0.57,0.23,0.82,0.09c0.06-0.03,0.38-0.3,0.42-0.66C368.7,413.76,368.44,413.37,368.51,413.28z"/>
					<polygon className="palma38" points="370.84,415.61 371.22,414.74 370.87,414.58 370.48,415.45 					"/>
					<g>
						<g>
							<polygon className="palma34" points="361.38,410.89 361.4,410.69 361.31,410.67 361.29,410.87 							"/>
							<g>
								<path className="palma38" d="M361.44,410.69L361.44,410.69c0-0.05-0.03-0.09-0.08-0.1l0,0c-0.05-0.01-0.09,0.01-0.09,0.05l0,0.01
									c0,0.04,0.03,0.08,0.08,0.09l0,0C361.4,410.75,361.44,410.73,361.44,410.69z"/>
							</g>
						</g>
						<g>
							<polygon className="palma34" points="361.76,410.98 361.78,410.77 361.69,410.75 361.67,410.96 							"/>
							<g>
								<path className="palma38" d="M361.83,410.78L361.83,410.78c0-0.05-0.03-0.09-0.08-0.1l0,0c-0.05-0.01-0.09,0.01-0.09,0.05l0,0.01
									c0,0.04,0.03,0.08,0.08,0.09l0,0C361.78,410.84,361.82,410.82,361.83,410.78z"/>
							</g>
						</g>
						<g>
							<polygon className="palma34" points="362.14,411.07 362.16,410.86 362.08,410.84 362.06,411.05 							"/>
							<g>
								<path className="palma38" d="M362.21,410.86L362.21,410.86c0-0.05-0.03-0.09-0.08-0.1l0,0c-0.05-0.01-0.09,0.01-0.09,0.05l0,0.01
									c0,0.04,0.03,0.08,0.08,0.09l0,0C362.16,410.93,362.2,410.9,362.21,410.86z"/>
							</g>
						</g>
						<g>
							<polygon className="palma34" points="362.53,411.15 362.55,410.94 362.46,410.93 362.44,411.13 							"/>
							<g>
								<path className="palma38" d="M362.59,410.95L362.59,410.95c0-0.05-0.03-0.09-0.08-0.1l0,0c-0.05-0.01-0.09,0.01-0.09,0.05l0,0.01
									c0,0.04,0.03,0.08,0.08,0.09l0,0C362.55,411.01,362.59,410.99,362.59,410.95z"/>
							</g>
						</g>
						<g>
							<polygon className="palma34" points="362.91,411.24 362.93,411.03 362.84,411.01 362.82,411.22 							"/>
							<g>
								<path className="palma38" d="M362.97,411.04L362.97,411.04c0-0.05-0.03-0.09-0.08-0.1l0,0c-0.05-0.01-0.09,0.01-0.09,0.05l0,0.01
									c0,0.04,0.03,0.08,0.08,0.09l0,0C362.93,411.1,362.97,411.08,362.97,411.04z"/>
							</g>
						</g>
					</g>
					<g>
						<polygon className="palma38" points="363.03,411.79 363.07,411.69 363.13,411.55 363.18,411.45 369.16,413.98 369.06,414.21 
							368.99,414.35 368.89,414.58 						"/>
						<polygon className="palma34" points="367.33,413.2 367.09,413.73 367.02,413.69 367.25,413.17 						"/>
						<polygon className="palma34" points="368.38,413.65 368.13,414.22 368.05,414.19 368.31,413.62 						"/>
						<polygon className="palma34" points="366.21,412.73 366,413.21 365.92,413.17 366.13,412.7 						"/>
						<polygon className="palma34" points="365.26,412.33 365.07,412.76 364.99,412.73 365.19,412.3 						"/>
						<polygon className="palma34" points="364.24,411.9 364.07,412.29 363.99,412.25 364.16,411.87 						"/>
					</g>
					<g>
						<polygon className="palma391" points="370.96,414.86 363.14,411.52 363.14,411.52 362.87,411.18 362.89,411.16 363.16,411.5 
							370.97,414.83 						"/>
					</g>
					<g>
						<polygon className="palma391" points="370.91,414.98 363.12,411.58 362.5,411.08 362.51,411.06 363.13,411.55 370.92,414.96 						
							"/>
					</g>
					<g>
						<polygon className="palma391" points="370.73,415.37 363.05,411.73 361.34,410.83 361.36,410.8 363.06,411.71 370.74,415.35 						
							"/>
					</g>
					<g>
						<polygon className="palma391" points="370.79,415.25 363.07,411.69 361.72,410.91 361.74,410.88 363.08,411.67 370.8,415.22 						
							"/>
					</g>
					<g>
						<polygon className="palma391" points="370.84,415.12 363.1,411.63 362.1,411 362.12,410.97 363.11,411.61 370.86,415.09 						"/>
					</g>
				</g>
				<polygon className="palma44" points="370.33,414.04 370.62,414.45 370.47,415.03 369.62,415.03 369.53,414.61 369.78,414.09 				"/>
				<path className="palma44" d="M370.75,407.96c-0.24-0.1-0.39-0.08-0.67,0.63c-0.14,0.9,0.66,2.24,0.58,2.66
					c-0.07,0.42-0.85,2.57-0.88,2.83c-0.04,0.26,0.36,0.2,0.65,0.15c0.37-0.73,1.05-2.05,1.31-2.95
					C371.91,410.68,371.6,408.33,370.75,407.96z"/>
				<path className="palma50" d="M371.92,410.13c-0.02-0.96-0.23-2.2-0.69-2.42c-0.2-0.09-1.23,0.15-1.28,0.91
					c-0.04,0.65,0.29,1.55,0.57,2.14L371.92,410.13z"/>
				<polygon className="palma44" points="363.95,411.62 363.7,411.5 363.45,411.56 363.91,411.76 				"/>
				<polygon className="palma44" points="363.29,411.7 363.1,411.76 363.33,412.08 363.81,412.26 363.96,412.2 363.69,411.91 				"/>
				<path className="palma30" d="M370.01,403.62L370.01,403.62c0,0-0.24-0.46-0.24-0.65l-0.07,0.18c0,0-0.18-0.21-0.21-0.39
					c0,0-0.16,0.32-0.17,0.36c0,0-0.31-0.39-0.29-0.49c0,0-0.02,0.53-0.08,0.55c0,0-0.27-0.25-0.27-0.37c0,0,0.01,0.32-0.05,0.37
					c0,0-0.24-0.2-0.25-0.26c0,0,0.01,0.47-0.06,0.5c-0.07,0.03-0.29-0.23-0.29-0.23c-0.07,0.31-0.09,0.7-0.1,1.07
					c0.16,0.29,0.68,0.38,1.14,0.2c0.8-0.3,1.02-0.36,1.05-0.52C370.11,403.83,370.08,403.72,370.01,403.62z"/>
			</g>
		</g>
		<g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="318.43" y="439.34" transform="matrix(0.8638 -0.5038 0.5038 0.8638 -176.4305 226.9947)" className="palma37" width="26.48" height="1.02"/>
					</g>
					<g className="palma396">
						
							<rect x="318.69" y="439.77" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -176.7263 227.358)" className="palma397" width="26.26" height="1.02"/>
					</g>
					<g className="palma398">
						
							<rect x="318.94" y="440.21" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -176.9249 227.4894)" className="palma399" width="26.03" height="1.02"/>
					</g>
					<g className="palma400">
						
							<rect x="319.2" y="440.64" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -177.1234 227.6208)" className="palma53" width="25.81" height="1.02"/>
					</g>
					<g className="palma401">
						
							<rect x="319.45" y="441.07" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -177.322 227.7522)" className="palma402" width="25.59" height="1.02"/>
					</g>
					<g className="palma403">
						
							<rect x="319.71" y="441.5" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -177.5206 227.8836)" className="palma404" width="25.37" height="1.02"/>
					</g>
					<g className="palma405">
						
							<rect x="319.96" y="441.94" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -177.7296 228.0394)" className="palma55" width="25.14" height="1.02"/>
					</g>
					<g className="palma406">
						
							<rect x="320.21" y="442.37" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -177.9178 228.1464)" className="palma407" width="24.92" height="1.02"/>
					</g>
					<g className="palma408">
						
							<rect x="320.47" y="442.8" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -178.1267 228.3022)" className="palma409" width="24.7" height="1.02"/>
					</g>
					<g className="palma410">
						
							<rect x="320.72" y="443.24" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -178.3151 228.4093)" className="palma57" width="24.48" height="1.02"/>
					</g>
					<g className="palma411">
						
							<rect x="320.98" y="443.67" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -178.5235 228.564)" className="palma412" width="24.25" height="1.02"/>
					</g>
					<g className="palma413">
						
							<rect x="321.23" y="444.1" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -178.7122 228.6721)" className="palma412" width="24.03" height="1.02"/>
					</g>
					<g className="palma414">
						
							<rect x="321.49" y="444.53" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -178.9212 228.828)" className="palma415" width="23.81" height="1.02"/>
					</g>
					<g className="palma416">
						
							<rect x="321.74" y="444.97" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -179.1094 228.9349)" className="palma415" width="23.59" height="1.02"/>
					</g>
					<g className="palma417">
						
							<rect x="322" y="445.4" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -179.3189 229.092)" className="palma61" width="23.36" height="1.02"/>
					</g>
					<g className="palma418">
						
							<rect x="322.25" y="445.83" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -179.5065 229.1977)" className="palma419" width="23.14" height="1.02"/>
					</g>
					<g className="palma420">
						
							<rect x="322.51" y="446.26" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -179.7156 229.3537)" className="palma421" width="22.92" height="1.02"/>
					</g>
					<g className="palma422">
						
							<rect x="322.76" y="446.7" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -179.9039 229.4606)" className="palma63" width="22.69" height="1.02"/>
					</g>
					<g className="palma423">
						
							<rect x="323.02" y="447.13" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -180.1129 229.6165)" className="palma424" width="22.47" height="1.02"/>
					</g>
					<g className="palma425">
						
							<rect x="323.27" y="447.56" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -180.2947 229.7086)" className="palma426" width="22.25" height="1.02"/>
					</g>
					<g className="palma427">
						
							<rect x="323.53" y="448" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -180.4997 229.8548)" className="palma65" width="22.03" height="1.02"/>
					</g>
					<g className="palma428">
						
							<rect x="323.78" y="448.43" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -180.6982 229.9862)" className="palma429" width="21.8" height="1.02"/>
					</g>
					<g className="palma430">
						
							<rect x="324.04" y="448.86" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -180.8911 230.104)" className="palma429" width="21.58" height="1.02"/>
					</g>
					<g className="palma431">
						
							<rect x="324.29" y="449.29" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -181.0955 230.249)" className="palma432" width="21.36" height="1.02"/>
					</g>
					<g className="palma433">
						
							<rect x="324.55" y="449.73" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -181.2945 230.3816)" className="palma434" width="21.14" height="1.02"/>
					</g>
					<g className="palma435">
						
							<rect x="324.8" y="450.16" transform="matrix(0.8633 -0.5046 0.5046 0.8633 -181.6032 230.7714)" className="palma436" width="20.91" height="1.02"/>
					</g>
					<g className="palma437">
						
							<rect x="325.06" y="450.59" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -181.9129 231.1638)" className="palma69" width="20.69" height="1.02"/>
					</g>
					<g className="palma438">
						
							<rect x="325.31" y="451.03" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -182.1117 231.2955)" className="palma439" width="20.47" height="1.02"/>
					</g>
					<g className="palma440">
						
							<rect x="325.57" y="451.46" transform="matrix(0.8631 -0.505 0.505 0.8631 -182.3044 231.4124)" className="palma71" width="20.25" height="1.02"/>
					</g>
					<g className="palma441">
						
							<rect x="325.82" y="451.89" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -182.5096 231.5591)" className="palma442" width="20.02" height="1.02"/>
					</g>
					<g className="palma443">
						
							<rect x="326.08" y="452.32" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -182.7085 231.6909)" className="palma73" width="19.8" height="1.02"/>
					</g>
					<g className="palma444">
						
							<rect x="326.33" y="452.76" transform="matrix(0.8631 -0.505 0.505 0.8631 -182.9015 231.8089)" className="palma73" width="19.58" height="1.02"/>
					</g>
					<g className="palma445">
						
							<rect x="326.59" y="453.19" transform="matrix(0.8631 -0.505 0.505 0.8631 -183.1004 231.9406)" className="palma446" width="19.36" height="1.02"/>
					</g>
					<g className="palma447">
						
							<rect x="326.84" y="453.62" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -183.3052 232.0862)" className="palma448" width="19.13" height="1.02"/>
					</g>
					<g className="palma449">
						
							<rect x="327.1" y="454.05" transform="matrix(0.8631 -0.505 0.505 0.8631 -183.4988 232.2054)" className="palma75" width="18.91" height="1.02"/>
					</g>
					<g className="palma450">
						
							<rect x="327.35" y="454.49" transform="matrix(0.8631 -0.505 0.505 0.8631 -183.697 232.3359)" className="palma451" width="18.69" height="1.02"/>
					</g>
					<g className="palma452">
						
							<rect x="327.61" y="454.92" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -183.9019 232.4814)" className="palma453" width="18.46" height="1.02"/>
					</g>
					<g className="palma454">
						
							<rect x="327.86" y="455.35" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -184.1009 232.6132)" className="palma455" width="18.24" height="1.02"/>
					</g>
					<g className="palma456">
						
							<rect x="328.12" y="455.79" transform="matrix(0.8631 -0.505 0.505 0.8631 -184.2934 232.7299)" className="palma457" width="18.02" height="1.02"/>
					</g>
					<g className="palma458">
						
							<rect x="328.37" y="456.22" transform="matrix(0.8631 -0.505 0.505 0.8631 -184.4879 232.8517)" className="palma459" width="17.8" height="1.02"/>
					</g>
					<g className="palma460">
						
							<rect x="328.63" y="456.65" transform="matrix(0.8631 -0.505 0.505 0.8631 -184.6915 232.9946)" className="palma461" width="17.57" height="1.02"/>
					</g>
					<g className="palma462">
						
							<rect x="328.88" y="457.08" transform="matrix(0.8631 -0.505 0.505 0.8631 -184.8798 233.1014)" className="palma463" width="17.35" height="1.02"/>
					</g>
					<g className="palma464">
						
							<rect x="329.14" y="457.52" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -185.1968 233.5078)" className="palma463" width="17.13" height="1.02"/>
					</g>
					<g className="palma465">
						
							<rect x="329.39" y="457.95" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -185.3849 233.6147)" className="palma466" width="16.91" height="1.02"/>
					</g>
					<g className="palma467">
						
							<rect x="329.64" y="458.38" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -185.5947 233.7716)" className="palma468" width="16.68" height="1.02"/>
					</g>
					<g className="palma469">
						
							<rect x="329.9" y="458.81" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -185.7836 233.8798)" className="palma83" width="16.46" height="1.02"/>
					</g>
					<g className="palma470">
						
							<rect x="330.15" y="459.25" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -185.9928 234.0355)" className="palma471" width="16.24" height="1.02"/>
					</g>
					<g className="palma472">
						
							<rect x="330.41" y="459.68" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -186.181 234.1422)" className="palma85" width="16.02" height="1.02"/>
					</g>
					<g className="palma473">
						
							<rect x="330.66" y="460.11" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -186.3904 234.298)" className="palma474" width="15.79" height="1.02"/>
					</g>
					<g className="palma475">
						
							<rect x="330.92" y="460.55" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -186.5851 234.42)" className="palma476" width="15.57" height="1.02"/>
					</g>
					<g className="palma477">
						
							<rect x="331.17" y="460.98" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -186.7891 234.5631)" className="palma87" width="15.35" height="1.02"/>
					</g>
					<g className="palma478">
						
							<rect x="331.43" y="461.41" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -186.9831 234.6838)" className="palma87" width="15.13" height="1.02"/>
					</g>
					<g className="palma479">
						
							<rect x="331.68" y="461.84" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -187.1931 234.8409)" className="palma480" width="14.9" height="1.02"/>
					</g>
					<g className="palma481">
						
							<rect x="331.94" y="462.28" transform="matrix(0.8626 -0.5058 0.5058 0.8626 -187.484 235.1851)" className="palma482" width="14.68" height="1.02"/>
					</g>
					<g className="palma483">
						
							<rect x="332.19" y="462.71" transform="matrix(0.8626 -0.5059 0.5059 0.8626 -187.6945 235.3435)" className="palma89" width="14.46" height="1.02"/>
					</g>
					<g className="palma484">
						
							<rect x="332.45" y="463.14" transform="matrix(0.8626 -0.5058 0.5058 0.8626 -187.8883 235.4631)" className="palma485" width="14.24" height="1.02"/>
					</g>
					<g className="palma486">
						
							<rect x="332.7" y="463.57" transform="matrix(0.8626 -0.5059 0.5059 0.8626 -188.0924 235.6064)" className="palma91" width="14.01" height="1.02"/>
					</g>
					<g className="palma487">
						
							<rect x="332.96" y="464.01" transform="matrix(0.8626 -0.5058 0.5058 0.8626 -188.28 235.712)" className="palma488" width="13.79" height="1.02"/>
					</g>
					<g className="palma489">
						
							<rect x="333.21" y="464.44" transform="matrix(0.8626 -0.5058 0.5058 0.8626 -188.4859 235.8593)" className="palma490" width="13.57" height="1.02"/>
					</g>
					<g className="palma491">
						
							<rect x="333.47" y="464.87" transform="matrix(0.8626 -0.5059 0.5059 0.8626 -188.6899 236.0026)" className="palma93" width="13.34" height="1.02"/>
					</g>
					<g className="palma492">
						
							<rect x="333.72" y="465.31" transform="matrix(0.8626 -0.5058 0.5058 0.8626 -188.8781 236.1094)" className="palma93" width="13.12" height="1.02"/>
					</g>
					<g className="palma493">
						
							<rect x="333.98" y="465.74" transform="matrix(0.8624 -0.5063 0.5063 0.8624 -189.1931 236.5082)" className="palma494" width="12.9" height="1.02"/>
					</g>
					<g className="palma495">
						
							<rect x="334.23" y="466.17" transform="matrix(0.8624 -0.5062 0.5062 0.8624 -189.3862 236.6264)" className="palma496" width="12.68" height="1.02"/>
					</g>
					<g className="palma497">
						
							<rect x="334.49" y="466.6" transform="matrix(0.8624 -0.5062 0.5062 0.8624 -189.5855 236.7586)" className="palma498" width="12.45" height="1.02"/>
					</g>
					<g className="palma499">
						
							<rect x="334.74" y="467.04" transform="matrix(0.8624 -0.5063 0.5063 0.8624 -189.7916 236.9062)" className="palma500" width="12.23" height="1.02"/>
					</g>
					<g className="palma501">
						
							<rect x="335" y="467.47" transform="matrix(0.8624 -0.5062 0.5062 0.8624 -189.9841 237.0231)" className="palma502" width="12.01" height="1.02"/>
					</g>
					<g className="palma503">
						
							<rect x="335.25" y="467.9" transform="matrix(0.8621 -0.5067 0.5067 0.8621 -190.3062 237.4374)" className="palma504" width="11.79" height="1.02"/>
					</g>
					<g className="palma505">
						
							<rect x="335.51" y="468.33" transform="matrix(0.8621 -0.5067 0.5067 0.8621 -190.5051 237.5685)" className="palma99" width="11.56" height="1.02"/>
					</g>
					<g className="palma506">
						
							<rect x="335.76" y="468.77" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -190.8155 237.9561)" className="palma507" width="11.34" height="1.02"/>
					</g>
					<g className="palma508">
						
							<rect x="336.02" y="469.2" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -191.0152 238.0886)" className="palma509" width="11.12" height="1.02"/>
					</g>
					<g className="palma510">
						
							<rect x="336.27" y="469.63" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -191.2149 238.2212)" className="palma101" width="10.9" height="1.02"/>
					</g>
					<g className="palma511">
						
							<rect x="336.53" y="470.07" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -191.4144 238.3537)" className="palma101" width="10.67" height="1.02"/>
					</g>
					<g className="palma512">
						
							<rect x="336.78" y="470.5" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -191.614 238.4863)" className="palma513" width="10.45" height="1.02"/>
					</g>
					<g className="palma514">
						
							<rect x="337.04" y="470.93" transform="matrix(0.8617 -0.5075 0.5075 0.8617 -191.9136 238.8481)" className="palma103" width="10.23" height="1.02"/>
					</g>
					<g className="palma515">
						
							<rect x="337.29" y="471.36" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -192.125 239.0076)" className="palma516" width="10.01" height="1.02"/>
					</g>
					<g className="palma517">
						
							<rect x="337.55" y="471.8" transform="matrix(0.8617 -0.5075 0.5075 0.8617 -192.3124 239.1122)" className="palma518" width="9.78" height="1.02"/>
					</g>
					<g className="palma519">
						
							<rect x="337.8" y="472.23" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -192.5238 239.2718)" className="palma105" width="9.56" height="1.02"/>
					</g>
					<g className="palma520">
						
							<rect x="338.06" y="472.66" transform="matrix(0.8617 -0.5075 0.5075 0.8617 -192.7125 239.379)" className="palma521" width="9.34" height="1.02"/>
					</g>
					<g className="palma522">
						
							<rect x="338.31" y="473.09" transform="matrix(0.8614 -0.5079 0.5079 0.8614 -193.035 239.7927)" className="palma523" width="9.12" height="1.02"/>
					</g>
					<g className="palma524">
						
							<rect x="338.57" y="473.53" transform="matrix(0.8614 -0.5079 0.5079 0.8614 -193.2235 239.9)" className="palma525" width="8.89" height="1.02"/>
					</g>
					<g className="palma526">
						
							<rect x="338.82" y="473.96" transform="matrix(0.8614 -0.5079 0.5079 0.8614 -193.4284 240.0441)" className="palma525" width="8.67" height="1.02"/>
					</g>
					<g className="palma527">
						
							<rect x="339.08" y="474.39" transform="matrix(0.8609 -0.5087 0.5087 0.8609 -193.8539 240.6935)" className="palma109" width="8.45" height="1.02"/>
					</g>
					<g className="palma528">
						
							<rect x="339.33" y="474.83" transform="matrix(0.8609 -0.5088 0.5088 0.8609 -194.0715 240.8667)" className="palma529" width="8.22" height="1.02"/>
					</g>
					<g className="palma530">
						
							<rect x="339.59" y="475.26" transform="matrix(0.8609 -0.5087 0.5087 0.8609 -194.2542 240.96)" className="palma531" width="8" height="1.02"/>
					</g>
					<g className="palma532">
						
							<rect x="339.84" y="475.69" transform="matrix(0.8607 -0.5091 0.5091 0.8607 -194.567 241.351)" className="palma111" width="7.78" height="1.02"/>
					</g>
					<g className="palma533">
						
							<rect x="340.09" y="476.12" transform="matrix(0.8607 -0.5092 0.5092 0.8607 -194.7735 241.4987)" className="palma534" width="7.56" height="1.02"/>
					</g>
					<g className="palma535">
						
							<rect x="340.35" y="476.56" transform="matrix(0.8607 -0.5091 0.5091 0.8607 -194.9671 241.6164)" className="palma536" width="7.33" height="1.02"/>
					</g>
					<g className="palma537">
						
							<rect x="340.6" y="476.99" transform="matrix(0.8604 -0.5096 0.5096 0.8604 -195.2857 242.0209)" className="palma113" width="7.11" height="1.02"/>
					</g>
					<g className="palma538">
						
							<rect x="340.86" y="477.42" transform="matrix(0.8604 -0.5096 0.5096 0.8604 -195.4862 242.1545)" className="palma539" width="6.89" height="1.02"/>
					</g>
					<g className="palma540">
						
							<rect x="341.11" y="477.85" transform="matrix(0.8602 -0.51 0.51 0.8602 -195.7928 242.5307)" className="palma539" width="6.67" height="1.02"/>
					</g>
					<g className="palma541">
						
							<rect x="341.37" y="478.29" transform="matrix(0.8602 -0.51 0.51 0.8602 -195.9933 242.6645)" className="palma542" width="6.44" height="1.02"/>
					</g>
					<g className="palma543">
						
							<rect x="341.62" y="478.72" transform="matrix(0.8597 -0.5108 0.5108 0.8597 -196.4151 243.3048)" className="palma542" width="6.22" height="1.02"/>
					</g>
					<g className="palma544">
						
							<rect x="341.88" y="479.15" transform="matrix(0.8595 -0.5112 0.5112 0.8595 -196.7347 243.711)" className="palma545" width="6" height="1.02"/>
					</g>
					<g className="palma546">
						
							<rect x="342.13" y="479.59" transform="matrix(0.8595 -0.5112 0.5112 0.8595 -196.9351 243.8438)" className="palma547" width="5.78" height="1.02"/>
					</g>
					<g className="palma548">
						
							<rect x="342.39" y="480.02" transform="matrix(0.8592 -0.5116 0.5116 0.8592 -197.2486 244.2359)" className="palma549" width="5.55" height="1.02"/>
					</g>
					<g className="palma550">
						
							<rect x="342.64" y="480.45" transform="matrix(0.859 -0.512 0.512 0.859 -197.5629 244.6297)" className="palma119" width="5.33" height="1.02"/>
					</g>
					<g className="palma551">
						
							<rect x="342.9" y="480.88" transform="matrix(0.8587 -0.5125 0.5125 0.8587 -197.8916 245.0575)" className="palma552" width="5.11" height="1.02"/>
					</g>
					<g className="palma553">
						
							<rect x="343.15" y="481.32" transform="matrix(0.8585 -0.5129 0.5129 0.8585 -198.1986 245.4346)" className="palma554" width="4.89" height="1.02"/>
					</g>
					<g className="palma555">
						
							<rect x="343.41" y="481.75" transform="matrix(0.8582 -0.5133 0.5133 0.8582 -198.5077 245.8168)" className="palma121" width="4.66" height="1.02"/>
					</g>
					<g className="palma556">
						
							<rect x="343.66" y="482.18" transform="matrix(0.858 -0.5137 0.5137 0.858 -198.8219 246.2104)" className="palma557" width="4.44" height="1.02"/>
					</g>
					<g className="palma558">
						
							<rect x="343.92" y="482.62" transform="matrix(0.8572 -0.5149 0.5149 0.8572 -199.3692 247.1425)" className="palma559" width="4.22" height="1.02"/>
					</g>
					<g>
						
							<rect x="344.17" y="483.05" transform="matrix(0.857 -0.5153 0.5153 0.857 -199.6717 247.5096)" className="palma33" width="3.99" height="1.02"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M347.68,481.19c-0.04-0.05-0.09-0.1-0.14-0.14l-0.01-0.01l0,0c-0.39-0.32-0.98-0.32-1.63,0.08
						c-1.14,0.7-2.05,2.35-2.01,3.68c0.01,0.6,0.22,1.04,0.54,1.27l0,0l4.8,3.77l3.09-3.99L347.68,481.19z"/>
					<polygon className="palma29" points="349.05,485.44 353.07,482.99 353.19,488.1 349.17,490.55 					"/>
					<polygon className="palma31" points="349.05,485.44 344.92,483.18 345.04,488.29 349.17,490.55 					"/>
					<polygon className="palma30" points="348.94,480.73 344.92,483.18 349.05,485.44 353.07,482.99 					"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="288.94" y="363.13" transform="matrix(0.3047 -0.9524 0.9524 0.3047 -163.17 541.7061)" className="palma37" width="1.02" height="38.97"/>
					</g>
					<g className="palma396">
						
							<rect x="289.03" y="364.26" transform="matrix(0.3049 -0.9524 0.9524 0.3049 -164.049 542.3687)" className="palma397" width="1.02" height="38.63"/>
					</g>
					<g className="palma398">
						
							<rect x="289.12" y="365.39" transform="matrix(0.3051 -0.9523 0.9523 0.3051 -164.9274 543.0321)" className="palma399" width="1.02" height="38.28"/>
					</g>
					<g className="palma400">
						
							<rect x="289.21" y="366.52" transform="matrix(0.3053 -0.9523 0.9523 0.3053 -165.8064 543.6938)" className="palma53" width="1.02" height="37.93"/>
					</g>
					<g className="palma401">
						
							<rect x="289.3" y="367.65" transform="matrix(0.3055 -0.9522 0.9522 0.3055 -166.6868 544.3505)" className="palma402" width="1.02" height="37.58"/>
					</g>
					<g className="palma403">
						
							<rect x="289.39" y="368.78" transform="matrix(0.3057 -0.9521 0.9521 0.3057 -167.5675 545.0054)" className="palma404" width="1.02" height="37.24"/>
					</g>
					<g className="palma405">
						
							<rect x="289.48" y="369.91" transform="matrix(0.3059 -0.9521 0.9521 0.3059 -168.447 545.6634)" className="palma55" width="1.02" height="36.89"/>
					</g>
					<g className="palma406">
						
							<rect x="289.57" y="371.04" transform="matrix(0.3061 -0.952 0.952 0.3061 -169.3289 546.3136)" className="palma407" width="1.02" height="36.54"/>
					</g>
					<g className="palma408">
						
							<rect x="289.66" y="372.16" transform="matrix(0.3063 -0.9519 0.9519 0.3063 -170.2114 546.9609)" className="palma409" width="1.02" height="36.2"/>
					</g>
					<g className="palma410">
						
							<rect x="289.74" y="373.29" transform="matrix(0.3065 -0.9519 0.9519 0.3065 -171.0932 547.6094)" className="palma57" width="1.02" height="35.85"/>
					</g>
					<g className="palma411">
						
							<rect x="289.83" y="374.42" transform="matrix(0.3067 -0.9518 0.9518 0.3067 -171.9757 548.256)" className="palma412" width="1.02" height="35.5"/>
					</g>
					<g className="palma413">
						
							<rect x="289.92" y="375.55" transform="matrix(0.3069 -0.9517 0.9517 0.3069 -172.8599 548.8965)" className="palma412" width="1.02" height="35.16"/>
					</g>
					<g className="palma414">
						
							<rect x="290.01" y="376.68" transform="matrix(0.3071 -0.9517 0.9517 0.3071 -173.7442 549.5354)" className="palma415" width="1.02" height="34.81"/>
					</g>
					<g className="palma416">
						
							<rect x="290.1" y="377.81" transform="matrix(0.3073 -0.9516 0.9516 0.3073 -174.6269 550.1786)" className="palma415" width="1.02" height="34.46"/>
					</g>
					<g className="palma417">
						
							<rect x="290.19" y="378.94" transform="matrix(0.3076 -0.9515 0.9515 0.3076 -175.5132 550.8104)" className="palma61" width="1.02" height="34.12"/>
					</g>
					<g className="palma418">
						
							<rect x="290.28" y="380.07" transform="matrix(0.3078 -0.9514 0.9514 0.3078 -176.3996 551.4408)" className="palma419" width="1.02" height="33.77"/>
					</g>
					<g className="palma420">
						
							<rect x="290.37" y="381.2" transform="matrix(0.308 -0.9514 0.9514 0.308 -177.2846 552.0745)" className="palma421" width="1.02" height="33.42"/>
					</g>
					<g className="palma422">
						
							<rect x="290.46" y="382.33" transform="matrix(0.3083 -0.9513 0.9513 0.3083 -178.1727 552.6979)" className="palma63" width="1.02" height="33.07"/>
					</g>
					<g className="palma423">
						
							<rect x="290.55" y="383.46" transform="matrix(0.3085 -0.9512 0.9512 0.3085 -179.0614 553.3186)" className="palma424" width="1.02" height="32.73"/>
					</g>
					<g className="palma425">
						
							<rect x="290.64" y="384.59" transform="matrix(0.3088 -0.9511 0.9511 0.3088 -179.9508 553.9364)" className="palma426" width="1.02" height="32.38"/>
					</g>
					<g className="palma427">
						
							<rect x="290.73" y="385.72" transform="matrix(0.3091 -0.951 0.951 0.3091 -180.8384 554.5583)" className="palma65" width="1.02" height="32.03"/>
					</g>
					<g className="palma428">
						
							<rect x="290.82" y="386.85" transform="matrix(0.3093 -0.951 0.951 0.3093 -181.7293 555.1696)" className="palma429" width="1.02" height="31.69"/>
					</g>
					<g className="palma430">
						
							<rect x="290.91" y="387.98" transform="matrix(0.3096 -0.9509 0.9509 0.3096 -182.6197 555.7809)" className="palma429" width="1.02" height="31.34"/>
					</g>
					<g className="palma431">
						
							<rect x="290.99" y="389.11" transform="matrix(0.3099 -0.9508 0.9508 0.3099 -183.511 556.3887)" className="palma432" width="1.02" height="30.99"/>
					</g>
					<g className="palma433">
						
							<rect x="291.08" y="390.24" transform="matrix(0.3102 -0.9507 0.9507 0.3102 -184.4043 556.989)" className="palma434" width="1.02" height="30.65"/>
					</g>
					<g className="palma435">
						
							<rect x="291.17" y="391.37" transform="matrix(0.3104 -0.9506 0.9506 0.3104 -185.2984 557.5857)" className="palma436" width="1.02" height="30.3"/>
					</g>
					<g className="palma437">
						
							<rect x="291.26" y="392.5" transform="matrix(0.3107 -0.9505 0.9505 0.3107 -186.193 558.1799)" className="palma69" width="1.02" height="29.95"/>
					</g>
					<g className="palma438">
						
							<rect x="291.35" y="393.63" transform="matrix(0.311 -0.9504 0.9504 0.311 -187.0873 558.7733)" className="palma439" width="1.02" height="29.6"/>
					</g>
					<g className="palma440">
						
							<rect x="291.44" y="394.75" transform="matrix(0.3114 -0.9503 0.9503 0.3114 -187.984 559.3578)" className="palma71" width="1.02" height="29.26"/>
					</g>
					<g className="palma441">
						
							<rect x="291.53" y="395.88" transform="matrix(0.3117 -0.9502 0.9502 0.3117 -188.8818 559.9379)" className="palma442" width="1.02" height="28.91"/>
					</g>
					<g className="palma443">
						
							<rect x="291.62" y="397.01" transform="matrix(0.312 -0.9501 0.9501 0.312 -189.7795 560.5173)" className="palma73" width="1.02" height="28.56"/>
					</g>
					<g className="palma444">
						
							<rect x="291.71" y="398.14" transform="matrix(0.3123 -0.95 0.95 0.3123 -190.6782 561.0916)" className="palma73" width="1.02" height="28.22"/>
					</g>
					<g className="palma445">
						
							<rect x="291.8" y="399.27" transform="matrix(0.3127 -0.9499 0.9499 0.3127 -191.579 561.6578)" className="palma446" width="1.02" height="27.87"/>
					</g>
					<g className="palma447">
						
							<rect x="291.89" y="400.4" transform="matrix(0.313 -0.9497 0.9497 0.313 -192.4804 562.2214)" className="palma448" width="1.02" height="27.52"/>
					</g>
					<g className="palma449">
						
							<rect x="291.98" y="401.53" transform="matrix(0.3134 -0.9496 0.9496 0.3134 -193.3828 562.7789)" className="palma75" width="1.02" height="27.18"/>
					</g>
					<g className="palma450">
						
							<rect x="292.07" y="402.66" transform="matrix(0.3138 -0.9495 0.9495 0.3138 -194.2872 563.329)" className="palma451" width="1.02" height="26.83"/>
					</g>
					<g className="palma452">
						
							<rect x="292.16" y="403.79" transform="matrix(0.3142 -0.9494 0.9494 0.3142 -195.1948 563.867)" className="palma453" width="1.02" height="26.48"/>
					</g>
					<g className="palma454">
						
							<rect x="292.24" y="404.92" transform="matrix(0.3145 -0.9492 0.9492 0.3145 -196.0993 564.4139)" className="palma455" width="1.02" height="26.14"/>
					</g>
					<g className="palma456">
						
							<rect x="292.33" y="406.05" transform="matrix(0.3149 -0.9491 0.9491 0.3149 -197.0063 564.95)" className="palma457" width="1.02" height="25.79"/>
					</g>
					<g className="palma458">
						
							<rect x="292.42" y="407.18" transform="matrix(0.3153 -0.949 0.949 0.3153 -197.9148 565.4794)" className="palma459" width="1.02" height="25.44"/>
					</g>
					<g className="palma460">
						
							<rect x="292.51" y="408.31" transform="matrix(0.3158 -0.9488 0.9488 0.3158 -198.8277 565.9935)" className="palma461" width="1.02" height="25.09"/>
					</g>
					<g className="palma462">
						
							<rect x="292.6" y="409.44" transform="matrix(0.3162 -0.9487 0.9487 0.3162 -199.7395 566.5081)" className="palma463" width="1.02" height="24.75"/>
					</g>
					<g className="palma464">
						
							<rect x="292.69" y="410.57" transform="matrix(0.3166 -0.9485 0.9485 0.3166 -200.6525 567.0178)" className="palma463" width="1.02" height="24.4"/>
					</g>
					<g className="palma465">
						
							<rect x="292.78" y="411.7" transform="matrix(0.3171 -0.9484 0.9484 0.3171 -201.5657 567.5237)" className="palma466" width="1.02" height="24.05"/>
					</g>
					<g className="palma467">
						
							<rect x="292.87" y="412.83" transform="matrix(0.3176 -0.9482 0.9482 0.3176 -202.4834 568.012)" className="palma468" width="1.02" height="23.71"/>
					</g>
					<g className="palma469">
						
							<rect x="292.96" y="413.96" transform="matrix(0.3181 -0.9481 0.9481 0.3181 -203.4048 568.4861)" className="palma83" width="1.02" height="23.36"/>
					</g>
					<g className="palma470">
						
							<rect x="293.05" y="415.08" transform="matrix(0.3186 -0.9479 0.9479 0.3186 -204.3247 568.9621)" className="palma471" width="1.02" height="23.01"/>
					</g>
					<g className="palma472">
						
							<rect x="293.14" y="416.21" transform="matrix(0.3191 -0.9477 0.9477 0.3191 -205.2467 569.4291)" className="palma85" width="1.02" height="22.67"/>
					</g>
					<g className="palma473">
						
							<rect x="293.23" y="417.34" transform="matrix(0.3196 -0.9476 0.9476 0.3196 -206.1708 569.8874)" className="palma474" width="1.02" height="22.32"/>
					</g>
					<g className="palma475">
						
							<rect x="293.32" y="418.47" transform="matrix(0.3201 -0.9474 0.9474 0.3201 -207.0967 570.3351)" className="palma476" width="1.02" height="21.97"/>
					</g>
					<g className="palma477">
						
							<rect x="293.4" y="419.6" transform="matrix(0.3207 -0.9472 0.9472 0.3207 -208.0246 570.7728)" className="palma87" width="1.02" height="21.63"/>
					</g>
					<g className="palma478">
						
							<rect x="293.49" y="420.73" transform="matrix(0.3213 -0.947 0.947 0.3213 -208.9592 571.1849)" className="palma87" width="1.02" height="21.28"/>
					</g>
					<g className="palma479">
						
							<rect x="293.58" y="421.86" transform="matrix(0.3219 -0.9468 0.9468 0.3219 -209.8916 571.601)" className="palma480" width="1.02" height="20.93"/>
					</g>
					<g className="palma481">
						
							<rect x="293.67" y="422.99" transform="matrix(0.3225 -0.9466 0.9466 0.3225 -210.8306 571.9911)" className="palma482" width="1.02" height="20.59"/>
					</g>
					<g className="palma483">
						
							<rect x="293.76" y="424.12" transform="matrix(0.3232 -0.9463 0.9463 0.3232 -211.7684 572.3811)" className="palma89" width="1.02" height="20.24"/>
					</g>
					<g className="palma484">
						
							<rect x="293.85" y="425.25" transform="matrix(0.3238 -0.9461 0.9461 0.3238 -212.7055 572.7719)" className="palma485" width="1.02" height="19.89"/>
					</g>
					<g className="palma486">
						
							<rect x="293.94" y="426.38" transform="matrix(0.3245 -0.9459 0.9459 0.3245 -213.6527 573.1214)" className="palma91" width="1.02" height="19.55"/>
					</g>
					<g className="palma487">
						
							<rect x="294.03" y="427.51" transform="matrix(0.3252 -0.9456 0.9456 0.3252 -214.5991 573.4694)" className="palma488" width="1.02" height="19.2"/>
					</g>
					<g className="palma489">
						
							<rect x="294.12" y="428.64" transform="matrix(0.326 -0.9454 0.9454 0.326 -215.5477 573.8045)" className="palma490" width="1.02" height="18.85"/>
					</g>
					<g className="palma491">
						
							<rect x="294.21" y="429.77" transform="matrix(0.3268 -0.9451 0.9451 0.3268 -216.5044 574.1068)" className="palma93" width="1.02" height="18.51"/>
					</g>
					<g className="palma492">
						
							<rect x="294.3" y="430.9" transform="matrix(0.3276 -0.9448 0.9448 0.3276 -217.4609 574.404)" className="palma93" width="1.02" height="18.16"/>
					</g>
					<g className="palma493">
						
							<rect x="294.39" y="432.03" transform="matrix(0.3284 -0.9445 0.9445 0.3284 -218.421 574.6829)" className="palma494" width="1.02" height="17.81"/>
					</g>
					<g className="palma495">
						
							<rect x="294.48" y="433.16" transform="matrix(0.3292 -0.9442 0.9442 0.3292 -219.385 574.9446)" className="palma496" width="1.02" height="17.47"/>
					</g>
					<g className="palma497">
						
							<rect x="294.57" y="434.28" transform="matrix(0.3301 -0.9439 0.9439 0.3301 -220.3525 575.1848)" className="palma498" width="1.02" height="17.12"/>
					</g>
					<g className="palma499">
						
							<rect x="294.66" y="435.41" transform="matrix(0.331 -0.9436 0.9436 0.331 -221.3245 575.4025)" className="palma500" width="1.02" height="16.77"/>
					</g>
					<g className="palma501">
						
							<rect x="294.74" y="436.54" transform="matrix(0.332 -0.9433 0.9433 0.332 -222.3051 575.5811)" className="palma502" width="1.02" height="16.43"/>
					</g>
					<g className="palma503">
						
							<rect x="294.83" y="437.67" transform="matrix(0.3331 -0.9429 0.9429 0.3331 -223.2865 575.7493)" className="palma504" width="1.02" height="16.08"/>
					</g>
					<g className="palma505">
						
							<rect x="294.92" y="438.8" transform="matrix(0.3341 -0.9425 0.9425 0.3341 -224.2766 575.8771)" className="palma99" width="1.02" height="15.73"/>
					</g>
					<g className="palma506">
						
							<rect x="295.01" y="439.93" transform="matrix(0.3352 -0.9421 0.9421 0.3352 -225.2693 575.9857)" className="palma507" width="1.02" height="15.39"/>
					</g>
					<g className="palma508">
						
							<rect x="295.1" y="441.06" transform="matrix(0.3363 -0.9417 0.9417 0.3363 -226.2616 576.0894)" className="palma509" width="1.02" height="15.04"/>
					</g>
					<g className="palma510">
						
							<rect x="295.19" y="442.19" transform="matrix(0.3376 -0.9413 0.9413 0.3376 -227.2699 576.1196)" className="palma101" width="1.02" height="14.69"/>
					</g>
					<g className="palma511">
						
							<rect x="295.28" y="443.32" transform="matrix(0.3388 -0.9408 0.9408 0.3388 -228.2787 576.1378)" className="palma101" width="1.02" height="14.35"/>
					</g>
					<g className="palma512">
						
							<rect x="295.37" y="444.45" transform="matrix(0.3402 -0.9404 0.9404 0.3402 -229.2945 576.1167)" className="palma513" width="1.02" height="14"/>
					</g>
					<g className="palma514">
						
							<rect x="295.46" y="445.58" transform="matrix(0.3416 -0.9399 0.9399 0.3416 -230.3218 576.0379)" className="palma103" width="1.02" height="13.65"/>
					</g>
					<g className="palma515">
						
							<rect x="295.55" y="446.71" transform="matrix(0.343 -0.9393 0.9393 0.343 -231.3523 575.9324)" className="palma516" width="1.02" height="13.31"/>
					</g>
					<g className="palma517">
						
							<rect x="295.64" y="447.84" transform="matrix(0.3445 -0.9388 0.9388 0.3445 -232.3865 575.8004)" className="palma518" width="1.02" height="12.96"/>
					</g>
					<g className="palma519">
						
							<rect x="295.73" y="448.97" transform="matrix(0.3462 -0.9382 0.9382 0.3462 -233.4391 575.5751)" className="palma105" width="1.02" height="12.61"/>
					</g>
					<g className="palma520">
						
							<rect x="295.82" y="450.09" transform="matrix(0.3479 -0.9375 0.9375 0.3479 -234.4958 575.3142)" className="palma521" width="1.02" height="12.27"/>
					</g>
					<g className="palma522">
						
							<rect x="295.9" y="451.22" transform="matrix(0.3497 -0.9369 0.9369 0.3497 -235.5628 574.992)" className="palma523" width="1.02" height="11.92"/>
					</g>
					<g className="palma524">
						
							<rect x="295.99" y="452.35" transform="matrix(0.3517 -0.9361 0.9361 0.3517 -236.6447 574.5851)" className="palma525" width="1.02" height="11.57"/>
					</g>
					<g className="palma526">
						
							<rect x="296.08" y="453.48" transform="matrix(0.3537 -0.9354 0.9354 0.3537 -237.7327 574.1281)" className="palma525" width="1.02" height="11.23"/>
					</g>
					<g className="palma527">
						
							<rect x="296.17" y="454.61" transform="matrix(0.3559 -0.9345 0.9345 0.3559 -238.8387 573.5663)" className="palma109" width="1.02" height="10.88"/>
					</g>
					<g className="palma528">
						
							<rect x="296.26" y="455.74" transform="matrix(0.3582 -0.9337 0.9337 0.3582 -239.9469 572.9689)" className="palma529" width="1.02" height="10.54"/>
					</g>
					<g className="palma530">
						
							<rect x="296.35" y="456.87" transform="matrix(0.3606 -0.9327 0.9327 0.3606 -241.0741 572.2506)" className="palma531" width="1.02" height="10.19"/>
					</g>
					<g className="palma532">
						
							<rect x="296.44" y="458" transform="matrix(0.3633 -0.9317 0.9317 0.3633 -242.2223 571.399)" className="palma111" width="1.02" height="9.84"/>
					</g>
					<g className="palma533">
						
							<rect x="296.53" y="459.13" transform="matrix(0.3661 -0.9306 0.9306 0.3661 -243.3804 570.4586)" className="palma534" width="1.02" height="9.5"/>
					</g>
					<g className="palma535">
						
							<rect x="296.62" y="460.26" transform="matrix(0.3692 -0.9294 0.9294 0.3692 -244.5574 569.3805)" className="palma536" width="1.02" height="9.15"/>
					</g>
					<g className="palma537">
						
							<rect x="296.71" y="461.38" transform="matrix(0.3725 -0.928 0.928 0.3725 -245.7575 568.1344)" className="palma113" width="1.02" height="8.81"/>
					</g>
					<g className="palma538">
						
							<rect x="296.8" y="462.51" transform="matrix(0.376 -0.9266 0.9266 0.376 -246.9705 566.7603)" className="palma539" width="1.02" height="8.46"/>
					</g>
					<g className="palma540">
						
							<rect x="296.89" y="463.64" transform="matrix(0.3797 -0.9251 0.9251 0.3797 -248.2014 565.2244)" className="palma539" width="1.02" height="8.12"/>
					</g>
					<g className="palma541">
						
							<rect x="296.98" y="464.77" transform="matrix(0.3839 -0.9234 0.9234 0.3839 -249.4671 563.4137)" className="palma542" width="1.02" height="7.77"/>
					</g>
					<g className="palma543">
						
							<rect x="297.07" y="465.9" transform="matrix(0.3884 -0.9215 0.9215 0.3884 -250.751 561.4001)" className="palma542" width="1.02" height="7.43"/>
					</g>
					<g className="palma544">
						
							<rect x="297.15" y="467.03" transform="matrix(0.3935 -0.9193 0.9193 0.3935 -252.0674 559.0759)" className="palma545" width="1.02" height="7.08"/>
					</g>
					<g className="palma546">
						
							<rect x="297.24" y="468.16" transform="matrix(0.3989 -0.917 0.917 0.3989 -253.406 556.4674)" className="palma547" width="1.02" height="6.74"/>
					</g>
					<g className="palma548">
						
							<rect x="297.33" y="469.28" transform="matrix(0.4049 -0.9143 0.9143 0.4049 -254.7738 553.4897)" className="palma549" width="1.02" height="6.39"/>
					</g>
					<g className="palma550">
						
							<rect x="297.42" y="470.41" transform="matrix(0.4117 -0.9113 0.9113 0.4117 -256.177 550.0417)" className="palma119" width="1.02" height="6.05"/>
					</g>
					<g className="palma551">
						
							<rect x="297.51" y="471.54" transform="matrix(0.4191 -0.908 0.908 0.4191 -257.5971 546.1757)" className="palma552" width="1.02" height="5.7"/>
					</g>
					<g className="palma553">
						
							<rect x="297.6" y="472.67" transform="matrix(0.4275 -0.904 0.904 0.4275 -259.0514 541.653)" className="palma554" width="1.02" height="5.36"/>
					</g>
					<g className="palma555">
						
							<rect x="297.69" y="473.8" transform="matrix(0.437 -0.8994 0.8994 0.437 -260.5333 536.3561)" className="palma121" width="1.02" height="5.02"/>
					</g>
					<g className="palma556">
						
							<rect x="297.78" y="474.92" transform="matrix(0.4479 -0.8941 0.8941 0.4479 -262.0224 530.2194)" className="palma557" width="1.02" height="4.68"/>
					</g>
					<g className="palma558">
						
							<rect x="297.87" y="476.05" transform="matrix(0.4603 -0.8878 0.8878 0.4603 -263.508 522.9814)" className="palma559" width="1.02" height="4.34"/>
					</g>
					<g>
						
							<rect x="297.96" y="477.18" transform="matrix(0.4749 -0.8801 0.8801 0.4749 -264.9639 514.2983)" className="palma33" width="1.02" height="3.99"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M296.85,476.88c0.04-0.05,0.08-0.1,0.13-0.14l0.01-0.01l0,0c0.38-0.34,0.96-0.36,1.63,0
						c1.17,0.64,2.15,2.25,2.18,3.59c0.01,0.6-0.17,1.05-0.48,1.3l0,0l-4.62,3.99l-3.27-3.84L296.85,476.88z"/>
					<polygon className="palma31" points="295.68,481.19 291.54,478.93 291.66,484.04 295.8,486.3 					"/>
					<polygon className="palma29" points="295.68,481.19 299.7,478.74 299.82,483.85 295.8,486.3 					"/>
					<polygon className="palma30" points="295.57,476.48 299.7,478.74 295.68,481.19 291.54,478.93 					"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="361.63" y="414.7" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.2439 239.4294)" className="palma37" width="19.38" height="1.02"/>
					</g>
					<g className="palma396">
						
							<rect x="362.11" y="414.98" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.3298 239.6661)" className="palma397" width="19.23" height="1.02"/>
					</g>
					<g className="palma398">
						
							<rect x="362.59" y="415.26" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.4158 239.9028)" className="palma399" width="19.08" height="1.02"/>
					</g>
					<g className="palma400">
						
							<rect x="363.07" y="415.54" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.5102 240.165)" className="palma53" width="18.93" height="1.02"/>
					</g>
					<g className="palma401">
						
							<rect x="363.54" y="415.82" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.5967 240.4034)" className="palma402" width="18.77" height="1.02"/>
					</g>
					<g className="palma403">
						
							<rect x="364.02" y="416.1" transform="matrix(0.8677 -0.497 0.497 0.8677 -157.6863 240.6506)" className="palma404" width="18.62" height="1.02"/>
					</g>
					<g className="palma405">
						
							<rect x="364.5" y="416.38" transform="matrix(0.8678 -0.497 0.497 0.8678 -157.7643 240.8635)" className="palma55" width="18.47" height="1.02"/>
					</g>
					<g className="palma406">
						
							<rect x="364.98" y="416.66" transform="matrix(0.8677 -0.4971 0.4971 0.8677 -157.8732 241.1695)" className="palma407" width="18.32" height="1.02"/>
					</g>
					<g className="palma408">
						
							<rect x="365.46" y="416.94" transform="matrix(0.8677 -0.497 0.497 0.8677 -157.9447 241.3627)" className="palma409" width="18.16" height="1.02"/>
					</g>
					<g className="palma410">
						
							<rect x="365.93" y="417.22" transform="matrix(0.8677 -0.4971 0.4971 0.8677 -158.0536 241.6688)" className="palma57" width="18.01" height="1.02"/>
					</g>
					<g className="palma411">
						
							<rect x="366.41" y="417.5" transform="matrix(0.8677 -0.4971 0.4971 0.8677 -158.1351 241.8915)" className="palma412" width="17.86" height="1.02"/>
					</g>
					<g className="palma413">
						
							<rect x="366.89" y="417.78" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.2355 242.1723)" className="palma412" width="17.71" height="1.02"/>
					</g>
					<g className="palma414">
						
							<rect x="367.37" y="418.06" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.3216 242.4092)" className="palma415" width="17.55" height="1.02"/>
					</g>
					<g className="palma416">
						
							<rect x="367.85" y="418.34" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.4075 242.6461)" className="palma415" width="17.4" height="1.02"/>
					</g>
					<g className="palma417">
						
							<rect x="368.32" y="418.62" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.502 242.9087)" className="palma61" width="17.25" height="1.02"/>
					</g>
					<g className="palma418">
						
							<rect x="368.8" y="418.9" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.5927 243.1595)" className="palma419" width="17.1" height="1.02"/>
					</g>
					<g className="palma420">
						
							<rect x="369.28" y="419.18" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -158.6791 243.3981)" className="palma421" width="16.95" height="1.02"/>
					</g>
					<g className="palma422">
						
							<rect x="369.76" y="419.46" transform="matrix(0.8672 -0.498 0.498 0.8672 -158.9206 244.1087)" className="palma63" width="16.79" height="1.02"/>
					</g>
					<g className="palma423">
						
							<rect x="370.24" y="419.74" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.0065 244.3461)" className="palma424" width="16.64" height="1.02"/>
					</g>
					<g className="palma425">
						
							<rect x="370.72" y="420.02" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.0927 244.5835)" className="palma426" width="16.49" height="1.02"/>
					</g>
					<g className="palma427">
						
							<rect x="371.19" y="420.3" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.1786 244.8207)" className="palma65" width="16.34" height="1.02"/>
					</g>
					<g className="palma428">
						
							<rect x="371.67" y="420.58" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.2647 245.0581)" className="palma429" width="16.18" height="1.02"/>
					</g>
					<g className="palma430">
						
							<rect x="372.15" y="420.86" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.3507 245.2954)" className="palma429" width="16.03" height="1.02"/>
					</g>
					<g className="palma431">
						
							<rect x="372.63" y="421.14" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.4368 245.5328)" className="palma432" width="15.88" height="1.02"/>
					</g>
					<g className="palma433">
						
							<rect x="373.11" y="421.42" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.5227 245.7701)" className="palma434" width="15.73" height="1.02"/>
					</g>
					<g className="palma435">
						
							<rect x="373.58" y="421.7" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.6134 246.0214)" className="palma436" width="15.57" height="1.02"/>
					</g>
					<g className="palma437">
						
							<rect x="374.06" y="421.98" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.6949 246.2446)" className="palma69" width="15.42" height="1.02"/>
					</g>
					<g className="palma438">
						
							<rect x="374.54" y="422.26" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.7809 246.482)" className="palma439" width="15.27" height="1.02"/>
					</g>
					<g className="palma440">
						
							<rect x="375.02" y="422.54" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.867 246.7194)" className="palma71" width="15.12" height="1.02"/>
					</g>
					<g className="palma441">
						
							<rect x="375.5" y="422.82" transform="matrix(0.8672 -0.498 0.498 0.8672 -159.953 246.9567)" className="palma442" width="14.96" height="1.02"/>
					</g>
					<g className="palma443">
						
							<rect x="375.97" y="423.1" transform="matrix(0.8672 -0.498 0.498 0.8672 -160.0391 247.194)" className="palma73" width="14.81" height="1.02"/>
					</g>
					<g className="palma444">
						
							<rect x="376.45" y="423.38" transform="matrix(0.8672 -0.498 0.498 0.8672 -160.125 247.4313)" className="palma73" width="14.66" height="1.02"/>
					</g>
					<g className="palma445">
						
							<rect x="376.93" y="423.66" transform="matrix(0.8672 -0.498 0.498 0.8672 -160.2111 247.6687)" className="palma446" width="14.51" height="1.02"/>
					</g>
					<g className="palma447">
						
							<rect x="377.41" y="423.94" transform="matrix(0.8672 -0.498 0.498 0.8672 -160.2971 247.9059)" className="palma448" width="14.35" height="1.02"/>
					</g>
					<g className="palma449">
						
							<rect x="377.89" y="424.22" transform="matrix(0.8672 -0.498 0.498 0.8672 -160.3878 248.1575)" className="palma75" width="14.2" height="1.02"/>
					</g>
					<g className="palma450">
						
							<rect x="378.36" y="424.5" transform="matrix(0.8667 -0.4988 0.4988 0.8667 -160.6385 248.9039)" className="palma451" width="14.05" height="1.02"/>
					</g>
					<g className="palma452">
						
							<rect x="378.84" y="424.78" transform="matrix(0.8667 -0.4988 0.4988 0.8667 -160.7244 249.1417)" className="palma453" width="13.9" height="1.02"/>
					</g>
					<g className="palma454">
						
							<rect x="379.32" y="425.06" transform="matrix(0.8667 -0.4988 0.4988 0.8667 -160.8021 249.3534)" className="palma455" width="13.75" height="1.02"/>
					</g>
					<g className="palma456">
						
							<rect x="379.8" y="425.34" transform="matrix(0.8667 -0.4988 0.4988 0.8667 -160.8881 249.5912)" className="palma457" width="13.59" height="1.02"/>
					</g>
					<g className="palma458">
						
							<rect x="380.28" y="425.62" transform="matrix(0.8665 -0.4993 0.4993 0.8665 -161.0662 250.1154)" className="palma459" width="13.44" height="1.02"/>
					</g>
					<g className="palma460">
						
							<rect x="380.75" y="425.9" transform="matrix(0.8665 -0.4992 0.4992 0.8665 -161.1518 250.3513)" className="palma461" width="13.29" height="1.02"/>
					</g>
					<g className="palma462">
						
							<rect x="381.23" y="426.18" transform="matrix(0.8664 -0.4993 0.4993 0.8664 -161.2423 250.6032)" className="palma463" width="13.14" height="1.02"/>
					</g>
					<g className="palma464">
						
							<rect x="381.71" y="426.46" transform="matrix(0.8664 -0.4993 0.4993 0.8664 -161.333 250.8556)" className="palma463" width="12.98" height="1.02"/>
					</g>
					<g className="palma465">
						
							<rect x="382.19" y="426.74" transform="matrix(0.8665 -0.4992 0.4992 0.8665 -161.406 251.053)" className="palma466" width="12.83" height="1.02"/>
					</g>
					<g className="palma467">
						
							<rect x="382.67" y="427.02" transform="matrix(0.8665 -0.4992 0.4992 0.8665 -161.4921 251.291)" className="palma468" width="12.68" height="1.02"/>
					</g>
					<g className="palma469">
						
							<rect x="383.14" y="427.3" transform="matrix(0.8665 -0.4993 0.4993 0.8665 -161.5829 251.5434)" className="palma83" width="12.53" height="1.02"/>
					</g>
					<g className="palma470">
						
							<rect x="383.62" y="427.58" transform="matrix(0.8664 -0.4993 0.4993 0.8664 -161.6774 251.8079)" className="palma471" width="12.37" height="1.02"/>
					</g>
					<g className="palma472">
						
							<rect x="384.1" y="427.86" transform="matrix(0.8664 -0.4993 0.4993 0.8664 -161.7635 252.046)" className="palma85" width="12.22" height="1.02"/>
					</g>
					<g className="palma473">
						
							<rect x="384.58" y="428.14" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.01 252.7869)" className="palma474" width="12.07" height="1.02"/>
					</g>
					<g className="palma475">
						
							<rect x="385.06" y="428.42" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.0961 253.0255)" className="palma476" width="11.92" height="1.02"/>
					</g>
					<g className="palma477">
						
							<rect x="385.53" y="428.7" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.1776 253.2494)" className="palma87" width="11.76" height="1.02"/>
					</g>
					<g className="palma478">
						
							<rect x="386.01" y="428.98" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.2637 253.4879)" className="palma87" width="11.61" height="1.02"/>
					</g>
					<g className="palma479">
						
							<rect x="386.49" y="429.26" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.3539 253.739)" className="palma480" width="11.46" height="1.02"/>
					</g>
					<g className="palma481">
						
							<rect x="386.97" y="429.54" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.4399 253.9775)" className="palma482" width="11.31" height="1.02"/>
					</g>
					<g className="palma483">
						
							<rect x="387.45" y="429.82" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.5274 254.22)" className="palma89" width="11.16" height="1.02"/>
					</g>
					<g className="palma484">
						
							<rect x="387.92" y="430.1" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.6128 254.4562)" className="palma485" width="11" height="1.02"/>
					</g>
					<g className="palma486">
						
							<rect x="388.4" y="430.38" transform="matrix(0.866 -0.5001 0.5001 0.866 -162.6991 254.6948)" className="palma91" width="10.85" height="1.02"/>
					</g>
					<g className="palma487">
						
							<rect x="388.88" y="430.66" transform="matrix(0.8655 -0.5009 0.5009 0.8655 -162.9537 255.4667)" className="palma488" width="10.7" height="1.02"/>
					</g>
					<g className="palma489">
						
							<rect x="389.36" y="430.94" transform="matrix(0.8653 -0.5013 0.5013 0.8653 -163.119 255.9571)" className="palma490" width="10.55" height="1.02"/>
					</g>
					<g className="palma491">
						
							<rect x="389.84" y="431.22" transform="matrix(0.8653 -0.5013 0.5013 0.8653 -163.2051 256.1963)" className="palma93" width="10.39" height="1.02"/>
					</g>
					<g className="palma492">
						
							<rect x="390.31" y="431.5" transform="matrix(0.8653 -0.5013 0.5013 0.8653 -163.2914 256.4354)" className="palma93" width="10.24" height="1.02"/>
					</g>
					<g className="palma493">
						
							<rect x="390.79" y="431.78" transform="matrix(0.8652 -0.5013 0.5013 0.8652 -163.3861 256.7014)" className="palma494" width="10.09" height="1.02"/>
					</g>
					<g className="palma495">
						
							<rect x="391.27" y="432.06" transform="matrix(0.8652 -0.5013 0.5013 0.8652 -163.4721 256.9406)" className="palma496" width="9.94" height="1.02"/>
					</g>
					<g className="palma497">
						
							<rect x="391.75" y="432.34" transform="matrix(0.8652 -0.5014 0.5014 0.8652 -163.563 257.1945)" className="palma498" width="9.78" height="1.02"/>
					</g>
					<g className="palma499">
						
							<rect x="392.23" y="432.62" transform="matrix(0.8653 -0.5013 0.5013 0.8653 -163.64 257.4048)" className="palma500" width="9.63" height="1.02"/>
					</g>
					<g className="palma501">
						
							<rect x="392.71" y="432.9" transform="matrix(0.8648 -0.5022 0.5022 0.8648 -163.895 258.1831)" className="palma502" width="9.48" height="1.02"/>
					</g>
					<g className="palma503">
						
							<rect x="393.18" y="433.18" transform="matrix(0.8648 -0.5021 0.5021 0.8648 -163.9772 258.4101)" className="palma504" width="9.33" height="1.02"/>
					</g>
					<g className="palma505">
						
							<rect x="393.66" y="433.46" transform="matrix(0.8648 -0.5021 0.5021 0.8648 -164.0628 258.6477)" className="palma99" width="9.17" height="1.02"/>
					</g>
					<g className="palma506">
						
							<rect x="394.14" y="433.74" transform="matrix(0.8648 -0.5021 0.5021 0.8648 -164.1491 258.8874)" className="palma507" width="9.02" height="1.02"/>
					</g>
					<g className="palma508">
						
							<rect x="394.62" y="434.02" transform="matrix(0.8648 -0.5021 0.5021 0.8648 -164.2352 259.1271)" className="palma509" width="8.87" height="1.02"/>
					</g>
					<g className="palma510">
						
							<rect x="395.1" y="434.3" transform="matrix(0.8645 -0.5026 0.5026 0.8645 -164.4139 259.6635)" className="palma101" width="8.72" height="1.02"/>
					</g>
					<g className="palma511">
						
							<rect x="395.57" y="434.58" transform="matrix(0.864 -0.5034 0.5034 0.864 -164.6673 260.4432)" className="palma101" width="8.56" height="1.02"/>
					</g>
					<g className="palma512">
						
							<rect x="396.05" y="434.86" transform="matrix(0.864 -0.5034 0.5034 0.864 -164.7537 260.6837)" className="palma513" width="8.41" height="1.02"/>
					</g>
					<g className="palma514">
						
							<rect x="396.53" y="435.14" transform="matrix(0.8641 -0.5034 0.5034 0.8641 -164.8315 260.897)" className="palma103" width="8.26" height="1.02"/>
					</g>
					<g className="palma515">
						
							<rect x="397.01" y="435.42" transform="matrix(0.864 -0.5034 0.5034 0.864 -164.9263 261.1645)" className="palma516" width="8.11" height="1.02"/>
					</g>
					<g className="palma517">
						
							<rect x="397.49" y="435.7" transform="matrix(0.864 -0.5034 0.5034 0.864 -165.0125 261.4049)" className="palma518" width="7.96" height="1.02"/>
					</g>
					<g className="palma519">
						
							<rect x="397.96" y="435.98" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -165.265 262.1849)" className="palma105" width="7.8" height="1.02"/>
					</g>
					<g className="palma520">
						
							<rect x="398.44" y="436.26" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -165.3438 262.4008)" className="palma521" width="7.65" height="1.02"/>
					</g>
					<g className="palma522">
						
							<rect x="398.92" y="436.54" transform="matrix(0.8636 -0.5042 0.5042 0.8636 -165.43 262.6415)" className="palma523" width="7.5" height="1.02"/>
					</g>
					<g className="palma524">
						
							<rect x="399.4" y="436.82" transform="matrix(0.8633 -0.5046 0.5046 0.8633 -165.6046 263.1702)" className="palma525" width="7.35" height="1.02"/>
					</g>
					<g className="palma526">
						
							<rect x="399.88" y="437.1" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -165.8563 263.9529)" className="palma525" width="7.19" height="1.02"/>
					</g>
					<g className="palma527">
						
							<rect x="400.35" y="437.38" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -165.9428 264.1943)" className="palma109" width="7.04" height="1.02"/>
					</g>
					<g className="palma528">
						
							<rect x="400.83" y="437.66" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -166.0209 264.4087)" className="palma529" width="6.89" height="1.02"/>
					</g>
					<g className="palma530">
						
							<rect x="401.31" y="437.94" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -166.1156 264.6774)" className="palma531" width="6.74" height="1.02"/>
					</g>
					<g className="palma532">
						
							<rect x="401.79" y="438.22" transform="matrix(0.8624 -0.5063 0.5063 0.8624 -166.3675 265.4643)" className="palma111" width="6.58" height="1.02"/>
					</g>
					<g className="palma533">
						
							<rect x="402.27" y="438.5" transform="matrix(0.8621 -0.5067 0.5067 0.8621 -166.5376 265.9827)" className="palma534" width="6.43" height="1.02"/>
					</g>
					<g className="palma535">
						
							<rect x="402.74" y="438.78" transform="matrix(0.8621 -0.5067 0.5067 0.8621 -166.6242 266.2247)" className="palma536" width="6.28" height="1.02"/>
					</g>
					<g className="palma537">
						
							<rect x="403.22" y="439.06" transform="matrix(0.8617 -0.5075 0.5075 0.8617 -166.8701 266.9961)" className="palma113" width="6.13" height="1.02"/>
					</g>
					<g className="palma538">
						
							<rect x="403.7" y="439.34" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -166.9619 267.2564)" className="palma539" width="5.98" height="1.02"/>
					</g>
					<g className="palma540">
						
							<rect x="404.18" y="439.62" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -167.0484 267.4991)" className="palma539" width="5.82" height="1.02"/>
					</g>
					<g className="palma541">
						
							<rect x="404.66" y="439.9" transform="matrix(0.8609 -0.5088 0.5088 0.8609 -167.3826 268.5686)" className="palma542" width="5.67" height="1.02"/>
					</g>
					<g className="palma543">
						
							<rect x="405.13" y="440.18" transform="matrix(0.8609 -0.5088 0.5088 0.8609 -167.4691 268.8119)" className="palma542" width="5.52" height="1.02"/>
					</g>
					<g className="palma544">
						
							<rect x="405.61" y="440.46" transform="matrix(0.8604 -0.5096 0.5096 0.8604 -167.7198 269.6062)" className="palma545" width="5.37" height="1.02"/>
					</g>
					<g className="palma546">
						
							<rect x="406.09" y="440.74" transform="matrix(0.8604 -0.5095 0.5095 0.8604 -167.7982 269.8225)" className="palma547" width="5.21" height="1.02"/>
					</g>
					<g className="palma548">
						
							<rect x="406.57" y="441.02" transform="matrix(0.8597 -0.5108 0.5108 0.8597 -168.1339 270.9068)" className="palma549" width="5.06" height="1.02"/>
					</g>
					<g className="palma550">
						
							<rect x="407.05" y="441.3" transform="matrix(0.8597 -0.5108 0.5108 0.8597 -168.2286 271.1789)" className="palma119" width="4.91" height="1.02"/>
					</g>
					<g className="palma551">
						
							<rect x="407.52" y="441.58" transform="matrix(0.8592 -0.5116 0.5116 0.8592 -168.4692 271.9459)" className="palma552" width="4.76" height="1.02"/>
					</g>
					<g className="palma553">
						
							<rect x="408" y="441.86" transform="matrix(0.8585 -0.5128 0.5128 0.8585 -168.7952 273.007)" className="palma554" width="4.6" height="1.02"/>
					</g>
					<g className="palma555">
						
							<rect x="408.48" y="442.14" transform="matrix(0.8585 -0.5129 0.5129 0.8585 -168.8899 273.2802)" className="palma121" width="4.45" height="1.02"/>
					</g>
					<g className="palma556">
						
							<rect x="408.96" y="442.42" transform="matrix(0.858 -0.5136 0.5136 0.858 -169.1299 274.0518)" className="palma557" width="4.3" height="1.02"/>
					</g>
					<g className="palma558">
						
							<rect x="409.44" y="442.7" transform="matrix(0.8573 -0.5149 0.5149 0.8573 -169.4594 275.135)" className="palma559" width="4.15" height="1.02"/>
					</g>
					<g>
						
							<rect x="409.91" y="442.98" transform="matrix(0.8573 -0.5149 0.5149 0.8573 -169.5462 275.3816)" className="palma33" width="3.99" height="1.02"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M413.42,441.12c-0.04-0.05-0.09-0.1-0.14-0.14l-0.01-0.01l0,0c-0.39-0.32-0.98-0.32-1.63,0.08
						c-1.14,0.7-2.05,2.35-2.01,3.68c0.01,0.6,0.22,1.04,0.54,1.27l0,0l4.8,3.77l3.09-3.99L413.42,441.12z"/>
					<polygon className="palma29" points="414.79,445.37 418.82,442.92 418.94,448.03 414.91,450.48 					"/>
					<polygon className="palma31" points="414.79,445.37 410.66,443.11 410.78,448.22 414.91,450.48 					"/>
					<polygon className="palma30" points="414.68,440.66 410.66,443.11 414.79,445.37 418.82,442.92 					"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="325.52" y="338.45" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -123.7076 221.3529)" className="palma37" width="42.21" height="1.02"/>
					</g>
					<g className="palma396">
						
							<rect x="326.48" y="339.04" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -123.8999 221.8217)" className="palma397" width="41.84" height="1.02"/>
					</g>
					<g className="palma398">
						
							<rect x="327.43" y="339.63" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -124.0922 222.2904)" className="palma399" width="41.46" height="1.02"/>
					</g>
					<g className="palma400">
						
							<rect x="328.39" y="340.22" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -124.2842 222.758)" className="palma53" width="41.08" height="1.02"/>
					</g>
					<g className="palma401">
						
							<rect x="329.35" y="340.81" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -124.4767 223.2279)" className="palma402" width="40.7" height="1.02"/>
					</g>
					<g className="palma403">
						
							<rect x="330.31" y="341.4" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -124.669 223.6967)" className="palma404" width="40.32" height="1.02"/>
					</g>
					<g className="palma405">
						
							<rect x="331.27" y="341.99" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -124.8613 224.1654)" className="palma55" width="39.94" height="1.02"/>
					</g>
					<g className="palma406">
						
							<rect x="332.22" y="342.58" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -125.0505 224.6216)" className="palma407" width="39.57" height="1.02"/>
					</g>
					<g className="palma408">
						
							<rect x="333.18" y="343.17" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -125.2427 225.0903)" className="palma409" width="39.19" height="1.02"/>
					</g>
					<g className="palma410">
						
							<rect x="334.14" y="343.76" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -125.435 225.559)" className="palma57" width="38.81" height="1.02"/>
					</g>
					<g className="palma411">
						
							<rect x="335.1" y="344.34" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -125.627 226.0266)" className="palma412" width="38.43" height="1.02"/>
					</g>
					<g className="palma413">
						
							<rect x="336.06" y="344.93" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -125.8196 226.4965)" className="palma412" width="38.05" height="1.02"/>
					</g>
					<g className="palma414">
						
							<rect x="337.01" y="345.52" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.0118 226.9653)" className="palma415" width="37.67" height="1.02"/>
					</g>
					<g className="palma416">
						
							<rect x="337.97" y="346.11" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.2041 227.434)" className="palma415" width="37.29" height="1.02"/>
					</g>
					<g className="palma417">
						
							<rect x="338.93" y="346.7" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.3964 227.9029)" className="palma61" width="36.92" height="1.02"/>
					</g>
					<g className="palma418">
						
							<rect x="339.89" y="347.29" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.5918 228.3845)" className="palma419" width="36.54" height="1.02"/>
					</g>
					<g className="palma420">
						
							<rect x="340.85" y="347.88" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.7809 228.8403)" className="palma421" width="36.16" height="1.02"/>
					</g>
					<g className="palma422">
						
							<rect x="341.81" y="348.47" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -126.9763 229.3219)" className="palma63" width="35.78" height="1.02"/>
					</g>
					<g className="palma423">
						
							<rect x="342.76" y="349.06" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -127.1629 229.7674)" className="palma424" width="35.4" height="1.02"/>
					</g>
					<g className="palma425">
						
							<rect x="343.72" y="349.65" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -127.361 230.2595)" className="palma426" width="35.02" height="1.02"/>
					</g>
					<g className="palma427">
						
							<rect x="344.68" y="350.24" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -127.5532 230.7283)" className="palma65" width="34.65" height="1.02"/>
					</g>
					<g className="palma428">
						
							<rect x="345.64" y="350.83" transform="matrix(0.8632 -0.5048 0.5048 0.8632 -127.7458 231.1983)" className="palma429" width="34.27" height="1.02"/>
					</g>
					<g className="palma430">
						
							<rect x="346.6" y="351.42" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -127.9696 231.7958)" className="palma429" width="33.89" height="1.02"/>
					</g>
					<g className="palma431">
						
							<rect x="347.55" y="352" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -128.1619 232.2648)" className="palma432" width="33.51" height="1.02"/>
					</g>
					<g className="palma433">
						
							<rect x="348.51" y="352.59" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -128.3542 232.7338)" className="palma434" width="33.13" height="1.02"/>
					</g>
					<g className="palma435">
						
							<rect x="349.47" y="353.18" transform="matrix(0.8631 -0.5051 0.5051 0.8631 -128.5465 233.2028)" className="palma436" width="32.75" height="1.02"/>
					</g>
					<g className="palma437">
						
							<rect x="350.43" y="353.77" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -128.7906 233.8848)" className="palma69" width="32.38" height="1.02"/>
					</g>
					<g className="palma438">
						
							<rect x="351.39" y="354.36" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -128.9856 234.3648)" className="palma439" width="32" height="1.02"/>
					</g>
					<g className="palma440">
						
							<rect x="352.34" y="354.95" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -129.1753 234.8236)" className="palma71" width="31.62" height="1.02"/>
					</g>
					<g className="palma441">
						
							<rect x="353.3" y="355.54" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -129.3703 235.3037)" className="palma442" width="31.24" height="1.02"/>
					</g>
					<g className="palma443">
						
							<rect x="354.26" y="356.13" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -129.5627 235.7731)" className="palma73" width="30.86" height="1.02"/>
					</g>
					<g className="palma444">
						
							<rect x="355.22" y="356.72" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -129.7554 236.2441)" className="palma73" width="30.48" height="1.02"/>
					</g>
					<g className="palma445">
						
							<rect x="356.18" y="357.31" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -129.9473 236.712)" className="palma446" width="30.11" height="1.02"/>
					</g>
					<g className="palma447">
						
							<rect x="357.13" y="357.9" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -130.1397 237.1815)" className="palma448" width="29.73" height="1.02"/>
					</g>
					<g className="palma449">
						
							<rect x="358.09" y="358.49" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -130.3321 237.651)" className="palma75" width="29.35" height="1.02"/>
					</g>
					<g className="palma450">
						
							<rect x="359.05" y="359.08" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -130.5245 238.1204)" className="palma451" width="28.97" height="1.02"/>
					</g>
					<g className="palma452">
						
							<rect x="360.01" y="359.66" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -130.7169 238.5898)" className="palma453" width="28.59" height="1.02"/>
					</g>
					<g className="palma454">
						
							<rect x="360.97" y="360.25" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -130.9092 239.0592)" className="palma455" width="28.21" height="1.02"/>
					</g>
					<g className="palma456">
						
							<rect x="361.93" y="360.84" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -131.1016 239.5287)" className="palma457" width="27.83" height="1.02"/>
					</g>
					<g className="palma458">
						
							<rect x="362.88" y="361.43" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -131.2939 239.9982)" className="palma459" width="27.46" height="1.02"/>
					</g>
					<g className="palma460">
						
							<rect x="363.84" y="362.02" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -131.4863 240.4675)" className="palma461" width="27.08" height="1.02"/>
					</g>
					<g className="palma462">
						
							<rect x="364.8" y="362.61" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -131.6791 240.9386)" className="palma463" width="26.7" height="1.02"/>
					</g>
					<g className="palma464">
						
							<rect x="365.76" y="363.2" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -131.8711 241.4065)" className="palma463" width="26.32" height="1.02"/>
					</g>
					<g className="palma465">
						
							<rect x="366.72" y="363.79" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -132.0572 241.8499)" className="palma466" width="25.94" height="1.02"/>
					</g>
					<g className="palma467">
						
							<rect x="367.67" y="364.38" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -132.2561 242.3471)" className="palma468" width="25.56" height="1.02"/>
					</g>
					<g className="palma469">
						
							<rect x="368.63" y="364.97" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -132.4514 242.8284)" className="palma83" width="25.19" height="1.02"/>
					</g>
					<g className="palma470">
						
							<rect x="369.59" y="365.56" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -132.6434 243.2962)" className="palma471" width="24.81" height="1.02"/>
					</g>
					<g className="palma472">
						
							<rect x="370.55" y="366.15" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -132.8306 243.7445)" className="palma85" width="24.43" height="1.02"/>
					</g>
					<g className="palma473">
						
							<rect x="371.51" y="366.73" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -133.0285 244.2369)" className="palma474" width="24.05" height="1.02"/>
					</g>
					<g className="palma475">
						
							<rect x="372.46" y="367.32" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -133.215 244.6817)" className="palma476" width="23.67" height="1.02"/>
					</g>
					<g className="palma477">
						
							<rect x="373.42" y="367.91" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -133.4133 245.1758)" className="palma87" width="23.29" height="1.02"/>
					</g>
					<g className="palma478">
						
							<rect x="374.38" y="368.5" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -133.5997 245.6205)" className="palma87" width="22.92" height="1.02"/>
					</g>
					<g className="palma479">
						
							<rect x="375.34" y="369.09" transform="matrix(0.8628 -0.5055 0.5055 0.8628 -133.798 246.1148)" className="palma480" width="22.54" height="1.02"/>
					</g>
					<g className="palma481">
						
							<rect x="376.3" y="369.68" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -133.9812 246.5456)" className="palma482" width="22.16" height="1.02"/>
					</g>
					<g className="palma483">
						
							<rect x="377.25" y="370.27" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -134.1795 247.0398)" className="palma89" width="21.78" height="1.02"/>
					</g>
					<g className="palma484">
						
							<rect x="378.21" y="370.86" transform="matrix(0.8629 -0.5054 0.5054 0.8629 -134.3659 247.4843)" className="palma485" width="21.4" height="1.02"/>
					</g>
					<g className="palma486">
						
							<rect x="379.17" y="371.45" transform="matrix(0.8629 -0.5055 0.5055 0.8629 -134.5642 247.9788)" className="palma91" width="21.02" height="1.02"/>
					</g>
					<g className="palma487">
						
							<rect x="380.13" y="372.04" transform="matrix(0.8624 -0.5062 0.5062 0.8624 -134.8689 248.9245)" className="palma488" width="20.64" height="1.02"/>
					</g>
					<g className="palma489">
						
							<rect x="381.09" y="372.63" transform="matrix(0.8623 -0.5064 0.5064 0.8623 -135.0836 249.4897)" className="palma490" width="20.27" height="1.02"/>
					</g>
					<g className="palma491">
						
							<rect x="382.05" y="373.22" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -135.2866 250.0049)" className="palma93" width="19.89" height="1.02"/>
					</g>
					<g className="palma492">
						
							<rect x="383" y="373.81" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -135.485 250.5007)" className="palma93" width="19.51" height="1.02"/>
					</g>
					<g className="palma493">
						
							<rect x="383.96" y="374.39" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -135.6716 250.9461)" className="palma494" width="19.13" height="1.02"/>
					</g>
					<g className="palma495">
						
							<rect x="384.92" y="374.98" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -135.8701 251.442)" className="palma496" width="18.75" height="1.02"/>
					</g>
					<g className="palma497">
						
							<rect x="385.88" y="375.57" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -136.0562 251.8853)" className="palma498" width="18.37" height="1.02"/>
					</g>
					<g className="palma499">
						
							<rect x="386.84" y="376.16" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -136.2555 252.3852)" className="palma500" width="18" height="1.02"/>
					</g>
					<g className="palma501">
						
							<rect x="387.79" y="376.75" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -136.4417 252.8285)" className="palma502" width="17.62" height="1.02"/>
					</g>
					<g className="palma503">
						
							<rect x="388.75" y="377.34" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -136.6337 253.2972)" className="palma504" width="17.24" height="1.02"/>
					</g>
					<g className="palma505">
						
							<rect x="389.71" y="377.93" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -136.8271 253.7717)" className="palma99" width="16.86" height="1.02"/>
					</g>
					<g className="palma506">
						
							<rect x="390.67" y="378.52" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -137.0251 254.2658)" className="palma507" width="16.48" height="1.02"/>
					</g>
					<g className="palma508">
						
							<rect x="391.63" y="379.11" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -137.2117 254.7108)" className="palma509" width="16.1" height="1.02"/>
					</g>
					<g className="palma510">
						
							<rect x="392.58" y="379.7" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -137.4047 255.1834)" className="palma101" width="15.73" height="1.02"/>
					</g>
					<g className="palma511">
						
							<rect x="393.54" y="380.29" transform="matrix(0.8623 -0.5065 0.5065 0.8623 -137.5967 255.652)" className="palma101" width="15.35" height="1.02"/>
					</g>
					<g className="palma512">
						
							<rect x="394.5" y="380.88" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -137.7925 256.137)" className="palma513" width="14.97" height="1.02"/>
					</g>
					<g className="palma514">
						
							<rect x="395.46" y="381.46" transform="matrix(0.8622 -0.5065 0.5065 0.8622 -137.9851 256.6075)" className="palma103" width="14.59" height="1.02"/>
					</g>
					<g className="palma515">
						
							<rect x="396.42" y="382.05" transform="matrix(0.8619 -0.5071 0.5071 0.8619 -138.2673 257.466)" className="palma516" width="14.21" height="1.02"/>
					</g>
					<g className="palma517">
						
							<rect x="397.38" y="382.64" transform="matrix(0.8617 -0.5075 0.5075 0.8617 -138.5161 258.1817)" className="palma518" width="13.83" height="1.02"/>
					</g>
					<g className="palma519">
						
							<rect x="398.33" y="383.23" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -138.7121 258.6679)" className="palma105" width="13.45" height="1.02"/>
					</g>
					<g className="palma520">
						
							<rect x="399.29" y="383.82" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -138.9049 259.1396)" className="palma521" width="13.08" height="1.02"/>
					</g>
					<g className="palma522">
						
							<rect x="400.25" y="384.41" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -139.0975 259.6114)" className="palma523" width="12.7" height="1.02"/>
					</g>
					<g className="palma524">
						
							<rect x="401.21" y="385" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -139.2901 260.0831)" className="palma525" width="12.32" height="1.02"/>
					</g>
					<g className="palma526">
						
							<rect x="402.17" y="385.59" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -139.4827 260.5549)" className="palma525" width="11.94" height="1.02"/>
					</g>
					<g className="palma527">
						
							<rect x="403.12" y="386.18" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -139.6754 261.0267)" className="palma109" width="11.56" height="1.02"/>
					</g>
					<g className="palma528">
						
							<rect x="404.08" y="386.77" transform="matrix(0.8616 -0.5075 0.5075 0.8616 -139.8681 261.4984)" className="palma529" width="11.18" height="1.02"/>
					</g>
					<g className="palma530">
						
							<rect x="405.04" y="387.36" transform="matrix(0.8615 -0.5077 0.5077 0.8615 -140.0937 262.1144)" className="palma531" width="10.81" height="1.02"/>
					</g>
					<g className="palma532">
						
							<rect x="406" y="387.95" transform="matrix(0.861 -0.5085 0.5085 0.861 -140.4007 263.0882)" className="palma111" width="10.43" height="1.02"/>
					</g>
					<g className="palma533">
						
							<rect x="406.96" y="388.54" transform="matrix(0.861 -0.5085 0.5085 0.861 -140.5935 263.5611)" className="palma534" width="10.05" height="1.02"/>
					</g>
					<g className="palma535">
						
							<rect x="407.91" y="389.12" transform="matrix(0.861 -0.5085 0.5085 0.861 -140.7863 264.0338)" className="palma536" width="9.67" height="1.02"/>
					</g>
					<g className="palma537">
						
							<rect x="408.87" y="389.71" transform="matrix(0.861 -0.5085 0.5085 0.861 -140.979 264.5067)" className="palma113" width="9.29" height="1.02"/>
					</g>
					<g className="palma538">
						
							<rect x="409.83" y="390.3" transform="matrix(0.8609 -0.5088 0.5088 0.8609 -141.2053 265.1278)" className="palma539" width="8.91" height="1.02"/>
					</g>
					<g className="palma540">
						
							<rect x="410.79" y="390.89" transform="matrix(0.8604 -0.5096 0.5096 0.8604 -141.5177 266.1311)" className="palma539" width="8.54" height="1.02"/>
					</g>
					<g className="palma541">
						
							<rect x="411.75" y="391.48" transform="matrix(0.8605 -0.5095 0.5095 0.8605 -141.7013 266.5637)" className="palma542" width="8.16" height="1.02"/>
					</g>
					<g className="palma543">
						
							<rect x="412.7" y="392.07" transform="matrix(0.8604 -0.5096 0.5096 0.8604 -141.9036 267.0791)" className="palma542" width="7.78" height="1.02"/>
					</g>
					<g className="palma544">
						
							<rect x="413.66" y="392.66" transform="matrix(0.8603 -0.5098 0.5098 0.8603 -142.1268 267.6877)" className="palma545" width="7.4" height="1.02"/>
					</g>
					<g className="palma546">
						
							<rect x="414.62" y="393.25" transform="matrix(0.8598 -0.5106 0.5106 0.8598 -142.4395 268.6979)" className="palma547" width="7.02" height="1.02"/>
					</g>
					<g className="palma548">
						
							<rect x="415.58" y="393.84" transform="matrix(0.8598 -0.5107 0.5107 0.8598 -142.6429 269.2192)" className="palma549" width="6.64" height="1.02"/>
					</g>
					<g className="palma550">
						
							<rect x="416.54" y="394.43" transform="matrix(0.8597 -0.5108 0.5108 0.8597 -142.8586 269.7966)" className="palma119" width="6.26" height="1.02"/>
					</g>
					<g className="palma551">
						
							<rect x="417.5" y="395.02" transform="matrix(0.8592 -0.5116 0.5116 0.8592 -143.1652 270.7836)" className="palma552" width="5.89" height="1.02"/>
					</g>
					<g className="palma553">
						
							<rect x="418.45" y="395.61" transform="matrix(0.8591 -0.5118 0.5118 0.8591 -143.3908 271.4066)" className="palma554" width="5.51" height="1.02"/>
					</g>
					<g className="palma555">
						
							<rect x="419.41" y="396.2" transform="matrix(0.8585 -0.5129 0.5129 0.8585 -143.7365 272.5754)" className="palma121" width="5.13" height="1.02"/>
					</g>
					<g className="palma556">
						
							<rect x="420.37" y="396.78" transform="matrix(0.858 -0.5137 0.5137 0.858 -144.0421 273.567)" className="palma557" width="4.75" height="1.02"/>
					</g>
					<g className="palma558">
						
							<rect x="421.33" y="397.37" transform="matrix(0.8579 -0.5139 0.5139 0.8579 -144.2685 274.196)" className="palma559" width="4.37" height="1.02"/>
					</g>
					<g>
						
							<rect x="422.29" y="397.96" transform="matrix(0.8572 -0.5149 0.5149 0.8572 -144.6091 275.353)" className="palma33" width="3.99" height="1.02"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M425.79,396.11c-0.04-0.05-0.09-0.1-0.14-0.14l-0.01-0.01l0,0c-0.39-0.32-0.98-0.32-1.63,0.08
						c-1.14,0.7-2.05,2.35-2.01,3.68c0.01,0.6,0.22,1.04,0.54,1.27l0,0l4.8,3.77l3.09-3.99L425.79,396.11z"/>
					<polygon className="palma29" points="427.16,400.35 431.19,397.9 431.31,403.02 427.28,405.47 					"/>
					<polygon className="palma31" points="427.16,400.35 423.03,398.09 423.15,403.21 427.28,405.47 					"/>
					<polygon className="palma30" points="427.05,395.64 423.03,398.09 427.16,400.35 431.19,397.9 					"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="291.28" y="370.82" transform="matrix(0.9955 -0.0952 0.0952 0.9955 -33.9234 31.9076)" className="palma37" width="52.05" height="1.02"/>
					</g>
					<g className="palma396">
						
							<rect x="291.58" y="371.7" transform="matrix(0.9954 -0.0957 0.0957 0.9954 -34.1733 32.0899)" className="palma397" width="51.57" height="1.02"/>
					</g>
					<g className="palma398">
						
							<rect x="291.89" y="372.58" transform="matrix(0.9954 -0.0963 0.0963 0.9954 -34.4424 32.2915)" className="palma399" width="51.09" height="1.02"/>
					</g>
					<g className="palma400">
						
							<rect x="292.19" y="373.45" transform="matrix(0.9954 -0.0963 0.0963 0.9954 -34.5271 32.3023)" className="palma53" width="50.61" height="1.02"/>
					</g>
					<g className="palma401">
						
							<rect x="292.49" y="374.33" transform="matrix(0.9953 -0.0968 0.0968 0.9953 -34.7983 32.505)" className="palma402" width="50.13" height="1.02"/>
					</g>
					<g className="palma403">
						
							<rect x="292.79" y="375.2" transform="matrix(0.9953 -0.0968 0.0968 0.9953 -34.8641 32.4961)" className="palma404" width="49.65" height="1.02"/>
					</g>
					<g className="palma405">
						
							<rect x="293.1" y="376.08" transform="matrix(0.9953 -0.0973 0.0973 0.9953 -35.1359 32.6983)" className="palma55" width="49.17" height="1.02"/>
					</g>
					<g className="palma406">
						
							<rect x="293.4" y="376.96" transform="matrix(0.9952 -0.0979 0.0979 0.9952 -35.421 32.9138)" className="palma407" width="48.69" height="1.02"/>
					</g>
					<g className="palma408">
						
							<rect x="293.7" y="377.83" transform="matrix(0.9951 -0.0984 0.0984 0.9951 -35.6763 33.0981)" className="palma409" width="48.21" height="1.02"/>
					</g>
					<g className="palma410">
						
							<rect x="294.01" y="378.71" transform="matrix(0.9951 -0.0984 0.0984 0.9951 -35.7805 33.1272)" className="palma57" width="47.73" height="1.02"/>
					</g>
					<g className="palma411">
						
							<rect x="294.31" y="379.58" transform="matrix(0.9951 -0.099 0.099 0.9951 -36.0546 33.3297)" className="palma412" width="47.25" height="1.02"/>
					</g>
					<g className="palma413">
						
							<rect x="294.61" y="380.46" transform="matrix(0.995 -0.0995 0.0995 0.995 -36.3315 33.5345)" className="palma412" width="46.77" height="1.02"/>
					</g>
					<g className="palma414">
						
							<rect x="294.92" y="381.34" transform="matrix(0.995 -0.1 0.1 0.995 -36.5883 33.7182)" className="palma415" width="46.29" height="1.02"/>
					</g>
					<g className="palma416">
						
							<rect x="295.22" y="382.21" transform="matrix(0.995 -0.1 0.1 0.995 -36.6764 33.7298)" className="palma415" width="45.81" height="1.02"/>
					</g>
					<g className="palma417">
						
							<rect x="295.52" y="383.09" transform="matrix(0.9949 -0.1005 0.1005 0.9949 -36.9547 33.9344)" className="palma61" width="45.33" height="1.02"/>
					</g>
					<g className="palma418">
						
							<rect x="295.83" y="383.97" transform="matrix(0.9949 -0.1011 0.1011 0.9949 -37.2318 34.1372)" className="palma419" width="44.85" height="1.02"/>
					</g>
					<g className="palma420">
						
							<rect x="296.13" y="384.84" transform="matrix(0.9948 -0.1016 0.1016 0.9948 -37.4926 34.323)" className="palma421" width="44.37" height="1.02"/>
					</g>
					<g className="palma422">
						
							<rect x="296.43" y="385.72" transform="matrix(0.9948 -0.1021 0.1021 0.9948 -37.7721 34.5271)" className="palma63" width="43.89" height="1.02"/>
					</g>
					<g className="palma423">
						
							<rect x="296.74" y="386.59" transform="matrix(0.9948 -0.1021 0.1021 0.9948 -37.8612 34.5381)" className="palma424" width="43.41" height="1.02"/>
					</g>
					<g className="palma425">
						
							<rect x="297.04" y="387.47" transform="matrix(0.9947 -0.1026 0.1026 0.9947 -38.1426 34.7432)" className="palma426" width="42.93" height="1.02"/>
					</g>
					<g className="palma427">
						
							<rect x="297.34" y="388.35" transform="matrix(0.9947 -0.1032 0.1032 0.9947 -38.4249 34.9486)" className="palma65" width="42.45" height="1.02"/>
					</g>
					<g className="palma428">
						
							<rect x="297.65" y="389.22" transform="matrix(0.9946 -0.1037 0.1037 0.9946 -38.7094 35.1557)" className="palma429" width="41.97" height="1.02"/>
					</g>
					<g className="palma430">
						
							<rect x="297.95" y="390.1" transform="matrix(0.9945 -0.1043 0.1043 0.9945 -39.0012 35.3695)" className="palma429" width="41.5" height="1.02"/>
					</g>
					<g className="palma431">
						
							<rect x="298.25" y="390.97" transform="matrix(0.9945 -0.1048 0.1048 0.9945 -39.2729 35.5626)" className="palma432" width="41.02" height="1.02"/>
					</g>
					<g className="palma433">
						
							<rect x="298.56" y="391.85" transform="matrix(0.9944 -0.1053 0.1053 0.9944 -39.5585 35.769)" className="palma434" width="40.54" height="1.02"/>
					</g>
					<g className="palma435">
						
							<rect x="298.86" y="392.73" transform="matrix(0.9944 -0.1059 0.1059 0.9944 -39.8449 35.9758)" className="palma436" width="40.06" height="1.02"/>
					</g>
					<g className="palma437">
						
							<rect x="299.16" y="393.6" transform="matrix(0.9943 -0.1064 0.1064 0.9943 -40.1321 36.1827)" className="palma69" width="39.58" height="1.02"/>
					</g>
					<g className="palma438">
						
							<rect x="299.47" y="394.48" transform="matrix(0.9943 -0.1069 0.1069 0.9943 -40.4006 36.3704)" className="palma439" width="39.1" height="1.02"/>
					</g>
					<g className="palma440">
						
							<rect x="299.77" y="395.36" transform="matrix(0.9942 -0.1075 0.1075 0.9942 -40.6895 36.5779)" className="palma71" width="38.62" height="1.02"/>
					</g>
					<g className="palma441">
						
							<rect x="300.07" y="396.23" transform="matrix(0.9942 -0.108 0.108 0.9942 -40.9798 36.7863)" className="palma442" width="38.14" height="1.02"/>
					</g>
					<g className="palma443">
						
							<rect x="300.38" y="397.11" transform="matrix(0.994 -0.109 0.109 0.994 -41.446 37.1701)" className="palma73" width="37.66" height="1.02"/>
					</g>
					<g className="palma444">
						
							<rect x="300.68" y="397.98" transform="matrix(0.994 -0.1096 0.1096 0.994 -41.7376 37.3785)" className="palma73" width="37.18" height="1.02"/>
					</g>
					<g className="palma445">
						
							<rect x="300.98" y="398.86" transform="matrix(0.9939 -0.1101 0.1101 0.9939 -42.03 37.5872)" className="palma446" width="36.7" height="1.02"/>
					</g>
					<g className="palma447">
						
							<rect x="301.29" y="399.74" transform="matrix(0.9939 -0.1106 0.1106 0.9939 -42.3208 37.7938)" className="palma448" width="36.22" height="1.02"/>
					</g>
					<g className="palma449">
						
							<rect x="301.59" y="400.61" transform="matrix(0.9937 -0.1117 0.1117 0.9937 -42.8123 38.2001)" className="palma75" width="35.74" height="1.02"/>
					</g>
					<g className="palma450">
						
							<rect x="301.89" y="401.49" transform="matrix(0.9937 -0.1123 0.1123 0.9937 -43.1076 38.4098)" className="palma451" width="35.26" height="1.02"/>
					</g>
					<g className="palma452">
						
							<rect x="302.19" y="402.36" transform="matrix(0.9936 -0.1128 0.1128 0.9936 -43.4037 38.6198)" className="palma453" width="34.78" height="1.02"/>
					</g>
					<g className="palma454">
						
							<rect x="302.5" y="403.24" transform="matrix(0.9935 -0.1138 0.1138 0.9935 -43.8774 39.0061)" className="palma455" width="34.31" height="1.02"/>
					</g>
					<g className="palma456">
						
							<rect x="302.8" y="404.12" transform="matrix(0.9934 -0.1144 0.1144 0.9934 -44.1754 39.2168)" className="palma457" width="33.83" height="1.02"/>
					</g>
					<g className="palma458">
						
							<rect x="303.1" y="404.99" transform="matrix(0.9933 -0.1154 0.1154 0.9933 -44.6558 39.6086)" className="palma459" width="33.35" height="1.02"/>
					</g>
					<g className="palma460">
						
							<rect x="303.41" y="405.87" transform="matrix(0.9933 -0.1159 0.1159 0.9933 -44.955 39.8192)" className="palma461" width="32.87" height="1.02"/>
					</g>
					<g className="palma462">
						
							<rect x="303.71" y="406.75" transform="matrix(0.9931 -0.1171 0.1171 0.9931 -45.4741 40.2481)" className="palma463" width="32.39" height="1.02"/>
					</g>
					<g className="palma464">
						
							<rect x="304.01" y="407.62" transform="matrix(0.9931 -0.1175 0.1175 0.9931 -45.7561 40.4404)" className="palma463" width="31.91" height="1.02"/>
					</g>
					<g className="palma465">
						
							<rect x="304.32" y="408.5" transform="matrix(0.9929 -0.1186 0.1186 0.9929 -46.2591 40.8519)" className="palma466" width="31.43" height="1.02"/>
					</g>
					<g className="palma467">
						
							<rect x="304.62" y="409.37" transform="matrix(0.9928 -0.1197 0.1197 0.9928 -46.7642 41.2649)" className="palma468" width="30.95" height="1.02"/>
					</g>
					<g className="palma469">
						
							<rect x="304.92" y="410.25" transform="matrix(0.9928 -0.1202 0.1202 0.9928 -47.0466 41.4557)" className="palma83" width="30.47" height="1.02"/>
					</g>
					<g className="palma470">
						
							<rect x="305.23" y="411.13" transform="matrix(0.9926 -0.1213 0.1213 0.9926 -47.5534 41.869)" className="palma471" width="29.99" height="1.02"/>
					</g>
					<g className="palma472">
						
							<rect x="305.53" y="412" transform="matrix(0.9925 -0.1223 0.1223 0.9925 -48.0615 42.283)" className="palma85" width="29.51" height="1.02"/>
					</g>
					<g className="palma473">
						
							<rect x="305.83" y="412.88" transform="matrix(0.9924 -0.1234 0.1234 0.9924 -48.5732 42.7)" className="palma474" width="29.04" height="1.02"/>
					</g>
					<g className="palma475">
						
							<rect x="306.13" y="413.75" transform="matrix(0.9922 -0.1245 0.1245 0.9922 -49.0843 43.1158)" className="palma476" width="28.56" height="1.02"/>
					</g>
					<g className="palma477">
						
							<rect x="306.44" y="414.63" transform="matrix(0.9921 -0.1255 0.1255 0.9921 -49.5766 43.5121)" className="palma87" width="28.08" height="1.02"/>
					</g>
					<g className="palma478">
						
							<rect x="306.74" y="415.51" transform="matrix(0.992 -0.1266 0.1266 0.992 -50.0903 43.9293)" className="palma87" width="27.6" height="1.02"/>
					</g>
					<g className="palma479">
						
							<rect x="307.04" y="416.38" transform="matrix(0.9918 -0.1277 0.1277 0.9918 -50.6043 44.3461)" className="palma480" width="27.12" height="1.02"/>
					</g>
					<g className="palma481">
						
							<rect x="307.35" y="417.26" transform="matrix(0.9916 -0.1292 0.1292 0.9916 -51.3032 44.9466)" className="palma482" width="26.64" height="1.02"/>
					</g>
					<g className="palma483">
						
							<rect x="307.65" y="418.14" transform="matrix(0.9915 -0.1303 0.1303 0.9915 -51.8214 45.3664)" className="palma89" width="26.16" height="1.02"/>
					</g>
					<g className="palma484">
						
							<rect x="307.95" y="419.01" transform="matrix(0.9913 -0.1313 0.1313 0.9913 -52.3198 45.7659)" className="palma485" width="25.68" height="1.02"/>
					</g>
					<g className="palma486">
						
							<rect x="308.25" y="419.89" transform="matrix(0.9911 -0.133 0.133 0.9911 -53.0668 46.4131)" className="palma91" width="25.2" height="1.02"/>
					</g>
					<g className="palma487">
						
							<rect x="308.56" y="420.76" transform="matrix(0.9909 -0.1346 0.1346 0.9909 -53.7721 47.0185)" className="palma488" width="24.73" height="1.02"/>
					</g>
					<g className="palma489">
						
							<rect x="308.86" y="421.64" transform="matrix(0.9908 -0.1356 0.1356 0.9908 -54.2931 47.4388)" className="palma490" width="24.25" height="1.02"/>
					</g>
					<g className="palma491">
						
							<rect x="309.16" y="422.52" transform="matrix(0.9905 -0.1372 0.1372 0.9905 -55.0047 48.0496)" className="palma93" width="23.77" height="1.02"/>
					</g>
					<g className="palma492">
						
							<rect x="309.47" y="423.39" transform="matrix(0.9903 -0.1388 0.1388 0.9903 -55.735 48.679)" className="palma93" width="23.29" height="1.02"/>
					</g>
					<g className="palma493">
						
							<rect x="309.77" y="424.27" transform="matrix(0.9901 -0.1404 0.1404 0.9901 -56.4743 49.3172)" className="palma494" width="22.81" height="1.02"/>
					</g>
					<g className="palma495">
						
							<rect x="310.07" y="425.14" transform="matrix(0.9898 -0.1425 0.1425 0.9898 -57.3909 50.1338)" className="palma496" width="22.33" height="1.02"/>
					</g>
					<g className="palma497">
						
							<rect x="310.37" y="426.02" transform="matrix(0.9896 -0.1441 0.1441 0.9896 -58.1283 50.7699)" className="palma498" width="21.86" height="1.02"/>
					</g>
					<g className="palma499">
						
							<rect x="310.68" y="426.9" transform="matrix(0.9893 -0.1462 0.1462 0.9893 -59.0455 51.5878)" className="palma500" width="21.38" height="1.02"/>
					</g>
					<g className="palma501">
						
							<rect x="310.98" y="427.77" transform="matrix(0.989 -0.1479 0.1479 0.989 -59.8144 52.2557)" className="palma502" width="20.9" height="1.02"/>
					</g>
					<g className="palma503">
						
							<rect x="311.28" y="428.65" transform="matrix(0.9887 -0.15 0.15 0.9887 -60.7396 53.0824)" className="palma504" width="20.42" height="1.02"/>
					</g>
					<g className="palma505">
						
							<rect x="311.58" y="429.52" transform="matrix(0.9884 -0.1521 0.1521 0.9884 -61.6655 53.9104)" className="palma99" width="19.94" height="1.02"/>
					</g>
					<g className="palma506">
						
							<rect x="311.89" y="430.4" transform="matrix(0.988 -0.1542 0.1542 0.988 -62.593 54.7404)" className="palma507" width="19.47" height="1.02"/>
					</g>
					<g className="palma508">
						
							<rect x="312.19" y="431.28" transform="matrix(0.9876 -0.1569 0.1569 0.9876 -63.7773 55.8343)" className="palma509" width="18.99" height="1.02"/>
					</g>
					<g className="palma510">
						
							<rect x="312.49" y="432.15" transform="matrix(0.9872 -0.1596 0.1596 0.9872 -64.9117 56.8789)" className="palma101" width="18.51" height="1.02"/>
					</g>
					<g className="palma511">
						
							<rect x="312.79" y="433.03" transform="matrix(0.9868 -0.1622 0.1622 0.9868 -66.047 57.9264)" className="palma101" width="18.03" height="1.02"/>
					</g>
					<g className="palma512">
						
							<rect x="313.09" y="433.91" transform="matrix(0.9863 -0.1649 0.1649 0.9863 -67.2417 59.0371)" className="palma513" width="17.56" height="1.02"/>
					</g>
					<g className="palma514">
						
							<rect x="313.4" y="434.78" transform="matrix(0.9859 -0.1675 0.1675 0.9859 -68.3591 60.0699)" className="palma103" width="17.08" height="1.02"/>
					</g>
					<g className="palma515">
						
							<rect x="313.7" y="435.66" transform="matrix(0.9853 -0.1706 0.1706 0.9853 -69.7019 61.3397)" className="palma516" width="16.6" height="1.02"/>
					</g>
					<g className="palma517">
						
							<rect x="314" y="436.53" transform="matrix(0.9848 -0.1739 0.1739 0.9848 -71.0824 62.6529)" className="palma518" width="16.12" height="1.02"/>
					</g>
					<g className="palma519">
						
							<rect x="314.3" y="437.41" transform="matrix(0.9841 -0.1775 0.1775 0.9841 -72.6309 64.1474)" className="palma105" width="15.65" height="1.02"/>
					</g>
					<g className="palma520">
						
							<rect x="314.6" y="438.29" transform="matrix(0.9834 -0.1813 0.1813 0.9834 -74.2167 65.6873)" className="palma521" width="15.17" height="1.02"/>
					</g>
					<g className="palma522">
						
							<rect x="314.91" y="439.16" transform="matrix(0.9827 -0.1851 0.1851 0.9827 -75.8035 67.2348)" className="palma523" width="14.7" height="1.02"/>
					</g>
					<g className="palma524">
						
							<rect x="315.21" y="440.04" transform="matrix(0.9819 -0.1893 0.1893 0.9819 -77.55 68.9606)" className="palma525" width="14.22" height="1.02"/>
					</g>
					<g className="palma526">
						
							<rect x="315.51" y="440.91" transform="matrix(0.9811 -0.1936 0.1936 0.9811 -79.3425 70.7448)" className="palma525" width="13.74" height="1.02"/>
					</g>
					<g className="palma527">
						
							<rect x="315.81" y="441.79" transform="matrix(0.9801 -0.1984 0.1984 0.9801 -81.3319 72.7535)" className="palma109" width="13.27" height="1.02"/>
					</g>
					<g className="palma528">
						
							<rect x="316.11" y="442.67" transform="matrix(0.979 -0.2037 0.2037 0.979 -83.5202 74.9944)" className="palma529" width="12.79" height="1.02"/>
					</g>
					<g className="palma530">
						
							<rect x="316.41" y="443.54" transform="matrix(0.9779 -0.209 0.209 0.9779 -85.6873 77.2284)" className="palma531" width="12.32" height="1.02"/>
					</g>
					<g className="palma532">
						
							<rect x="316.71" y="444.42" transform="matrix(0.9765 -0.2154 0.2154 0.9765 -88.2583 79.9332)" className="palma111" width="11.84" height="1.02"/>
					</g>
					<g className="palma533">
						
							<rect x="317.01" y="445.3" transform="matrix(0.9751 -0.2217 0.2217 0.9751 -90.808 82.6398)" className="palma534" width="11.37" height="1.02"/>
					</g>
					<g className="palma535">
						
							<rect x="317.31" y="446.17" transform="matrix(0.9735 -0.2285 0.2285 0.9735 -93.5223 85.5622)" className="palma536" width="10.9" height="1.02"/>
					</g>
					<g className="palma537">
						
							<rect x="317.61" y="447.05" transform="matrix(0.9717 -0.2361 0.2361 0.9717 -96.5328 88.8615)" className="palma113" width="10.43" height="1.02"/>
					</g>
					<g className="palma538">
						
							<rect x="317.91" y="447.92" transform="matrix(0.9697 -0.2444 0.2444 0.9697 -99.7961 92.5017)" className="palma539" width="9.95" height="1.02"/>
					</g>
					<g className="palma540">
						
							<rect x="318.21" y="448.8" transform="matrix(0.9674 -0.2533 0.2533 0.9674 -103.2898 96.471)" className="palma539" width="9.48" height="1.02"/>
					</g>
					<g className="palma541">
						
							<rect x="318.51" y="449.68" transform="matrix(0.9646 -0.2636 0.2636 0.9646 -107.2391 101.0622)" className="palma542" width="9.01" height="1.02"/>
					</g>
					<g className="palma543">
						
							<rect x="318.81" y="450.55" transform="matrix(0.9616 -0.2745 0.2745 0.9616 -111.4242 106.0344)" className="palma542" width="8.54" height="1.02"/>
					</g>
					<g className="palma544">
						
							<rect x="319.11" y="451.43" transform="matrix(0.9579 -0.2869 0.2869 0.9579 -116.0931 111.7304)" className="palma545" width="8.07" height="1.02"/>
					</g>
					<g className="palma546">
						
							<rect x="319.4" y="452.3" transform="matrix(0.9538 -0.3005 0.3005 0.9538 -121.1468 118.0703)" className="palma547" width="7.61" height="1.02"/>
					</g>
					<g className="palma548">
						
							<rect x="319.7" y="453.18" transform="matrix(0.9486 -0.3166 0.3166 0.9486 -127.0139 125.6918)" className="palma549" width="7.14" height="1.02"/>
					</g>
					<g className="palma550">
						
							<rect x="319.99" y="454.06" transform="matrix(0.9426 -0.3339 0.3339 0.9426 -133.2371 134.0687)" className="palma119" width="6.68" height="1.02"/>
					</g>
					<g className="palma551">
						
							<rect x="320.29" y="454.93" transform="matrix(0.9353 -0.3539 0.3539 0.9353 -140.2597 143.936)" className="palma552" width="6.22" height="1.02"/>
					</g>
					<g className="palma553">
						
							<rect x="320.58" y="455.81" transform="matrix(0.9263 -0.3767 0.3767 0.9263 -148.0627 155.4537)" className="palma554" width="5.77" height="1.02"/>
					</g>
					<g className="palma555">
						
							<rect x="320.87" y="456.69" transform="matrix(0.915 -0.4036 0.4036 0.915 -156.9905 169.4431)" className="palma121" width="5.31" height="1.02"/>
					</g>
					<g className="palma556">
						
							<rect x="321.15" y="457.56" transform="matrix(0.9006 -0.4347 0.4347 0.9006 -166.9663 186.2342)" className="palma557" width="4.87" height="1.02"/>
					</g>
					<g className="palma558">
						
							<rect x="321.44" y="458.44" transform="matrix(0.8817 -0.4717 0.4717 0.8817 -178.23 206.9584)" className="palma559" width="4.43" height="1.02"/>
					</g>
					<g>
						
							<rect x="321.72" y="459.31" transform="matrix(0.857 -0.5153 0.5153 0.857 -190.6534 232.5468)" className="palma33" width="3.99" height="1.02"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M325.22,457.46c-0.04-0.05-0.09-0.1-0.14-0.14l-0.01-0.01l0,0c-0.39-0.32-0.98-0.32-1.63,0.08
						c-1.14,0.7-2.05,2.35-2.01,3.68c0.01,0.6,0.22,1.04,0.54,1.27l0,0l4.8,3.77l3.09-3.99L325.22,457.46z"/>
					<polygon className="palma29" points="326.59,461.71 330.62,459.25 330.74,464.37 326.71,466.82 					"/>
					<polygon className="palma31" points="326.59,461.71 322.46,459.45 322.58,464.56 326.71,466.82 					"/>
					<polygon className="palma30" points="326.48,456.99 322.46,459.45 326.59,461.71 330.62,459.25 					"/>
				</g>
			</g>
			<g>
				<g>
					<g className="palma51">
						
							<rect x="332.87" y="418.07" transform="matrix(0.8895 -0.4569 0.4569 0.8895 -153.1077 204.0323)" className="palma37" width="24.86" height="1.02"/>
					</g>
					<g className="palma396">
						
							<rect x="333.33" y="418.49" transform="matrix(0.8895 -0.457 0.457 0.8895 -153.2713 204.2668)" className="palma397" width="24.66" height="1.02"/>
					</g>
					<g className="palma398">
						
							<rect x="333.79" y="418.91" transform="matrix(0.8893 -0.4574 0.4574 0.8893 -153.5246 204.7094)" className="palma399" width="24.45" height="1.02"/>
					</g>
					<g className="palma400">
						
							<rect x="334.25" y="419.34" transform="matrix(0.8893 -0.4574 0.4574 0.8893 -153.6779 204.9197)" className="palma53" width="24.24" height="1.02"/>
					</g>
					<g className="palma401">
						
							<rect x="334.71" y="419.76" transform="matrix(0.8893 -0.4574 0.4574 0.8893 -153.826 205.118)" className="palma402" width="24.04" height="1.02"/>
					</g>
					<g className="palma403">
						
							<rect x="335.18" y="420.18" transform="matrix(0.8893 -0.4574 0.4574 0.8893 -153.9898 205.3528)" className="palma404" width="23.83" height="1.02"/>
					</g>
					<g className="palma405">
						
							<rect x="335.64" y="420.6" transform="matrix(0.8893 -0.4574 0.4574 0.8893 -154.1377 205.5504)" className="palma55" width="23.62" height="1.02"/>
					</g>
					<g className="palma406">
						
							<rect x="336.1" y="421.02" transform="matrix(0.8891 -0.4578 0.4578 0.8891 -154.3862 205.9824)" className="palma407" width="23.42" height="1.02"/>
					</g>
					<g className="palma408">
						
							<rect x="336.56" y="421.44" transform="matrix(0.8891 -0.4578 0.4578 0.8891 -154.5344 206.1808)" className="palma409" width="23.21" height="1.02"/>
					</g>
					<g className="palma410">
						
							<rect x="337.02" y="421.86" transform="matrix(0.8889 -0.4582 0.4582 0.8889 -154.7907 206.6314)" className="palma57" width="23" height="1.02"/>
					</g>
					<g className="palma411">
						
							<rect x="337.48" y="422.29" transform="matrix(0.8888 -0.4582 0.4582 0.8888 -154.9494 206.8542)" className="palma412" width="22.8" height="1.02"/>
					</g>
					<g className="palma413">
						
							<rect x="337.94" y="422.71" transform="matrix(0.8889 -0.4582 0.4582 0.8889 -155.0977 207.0527)" className="palma412" width="22.59" height="1.02"/>
					</g>
					<g className="palma414">
						
							<rect x="338.4" y="423.13" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -155.3573 207.5113)" className="palma415" width="22.38" height="1.02"/>
					</g>
					<g className="palma416">
						
							<rect x="338.86" y="423.55" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -155.5108 207.7222)" className="palma415" width="22.18" height="1.02"/>
					</g>
					<g className="palma417">
						
							<rect x="339.32" y="423.97" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -155.6645 207.9332)" className="palma61" width="21.97" height="1.02"/>
					</g>
					<g className="palma418">
						
							<rect x="339.78" y="424.39" transform="matrix(0.8886 -0.4586 0.4586 0.8886 -155.8232 208.1562)" className="palma419" width="21.76" height="1.02"/>
					</g>
					<g className="palma420">
						
							<rect x="340.24" y="424.82" transform="matrix(0.8884 -0.4591 0.4591 0.8884 -156.0779 208.6039)" className="palma421" width="21.56" height="1.02"/>
					</g>
					<g className="palma422">
						
							<rect x="340.71" y="425.24" transform="matrix(0.8884 -0.4591 0.4591 0.8884 -156.2315 208.815)" className="palma63" width="21.35" height="1.02"/>
					</g>
					<g className="palma423">
						
							<rect x="341.17" y="425.66" transform="matrix(0.8884 -0.4591 0.4591 0.8884 -156.3853 209.0262)" className="palma424" width="21.14" height="1.02"/>
					</g>
					<g className="palma425">
						
							<rect x="341.63" y="426.08" transform="matrix(0.8884 -0.4591 0.4591 0.8884 -156.5441 209.2495)" className="palma426" width="20.94" height="1.02"/>
					</g>
					<g className="palma427">
						
							<rect x="342.09" y="426.5" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -156.7992 209.6983)" className="palma65" width="20.73" height="1.02"/>
					</g>
					<g className="palma428">
						
							<rect x="342.55" y="426.92" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -156.9531 209.9097)" className="palma429" width="20.52" height="1.02"/>
					</g>
					<g className="palma430">
						
							<rect x="343.01" y="427.35" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -157.1068 210.1211)" className="palma429" width="20.32" height="1.02"/>
					</g>
					<g className="palma431">
						
							<rect x="343.47" y="427.77" transform="matrix(0.8882 -0.4595 0.4595 0.8882 -157.2605 210.3326)" className="palma432" width="20.11" height="1.02"/>
					</g>
					<g className="palma433">
						
							<rect x="343.93" y="428.19" transform="matrix(0.8879 -0.46 0.46 0.8879 -157.5263 210.807)" className="palma434" width="19.9" height="1.02"/>
					</g>
					<g className="palma435">
						
							<rect x="344.39" y="428.61" transform="matrix(0.888 -0.4599 0.4599 0.888 -157.6751 211.0065)" className="palma436" width="19.7" height="1.02"/>
					</g>
					<g className="palma437">
						
							<rect x="344.85" y="429.03" transform="matrix(0.8877 -0.4604 0.4604 0.8877 -157.9337 211.4639)" className="palma69" width="19.49" height="1.02"/>
					</g>
					<g className="palma438">
						
							<rect x="345.31" y="429.45" transform="matrix(0.8877 -0.4604 0.4604 0.8877 -158.0875 211.6758)" className="palma439" width="19.28" height="1.02"/>
					</g>
					<g className="palma440">
						
							<rect x="345.77" y="429.88" transform="matrix(0.8875 -0.4608 0.4608 0.8875 -158.3433 212.1273)" className="palma71" width="19.08" height="1.02"/>
					</g>
					<g className="palma441">
						
							<rect x="346.24" y="430.3" transform="matrix(0.8875 -0.4608 0.4608 0.8875 -158.5028 212.3519)" className="palma442" width="18.87" height="1.02"/>
					</g>
					<g className="palma443">
						
							<rect x="346.7" y="430.72" transform="matrix(0.8875 -0.4608 0.4608 0.8875 -158.6567 212.5639)" className="palma73" width="18.66" height="1.02"/>
					</g>
					<g className="palma444">
						
							<rect x="347.16" y="431.14" transform="matrix(0.8873 -0.4612 0.4612 0.8873 -158.9181 213.0287)" className="palma73" width="18.46" height="1.02"/>
					</g>
					<g className="palma445">
						
							<rect x="347.62" y="431.56" transform="matrix(0.8873 -0.4612 0.4612 0.8873 -159.0567 213.2049)" className="palma446" width="18.25" height="1.02"/>
					</g>
					<g className="palma447">
						
							<rect x="348.08" y="431.98" transform="matrix(0.8873 -0.4612 0.4612 0.8873 -159.2264 213.4536)" className="palma448" width="18.04" height="1.02"/>
					</g>
					<g className="palma449">
						
							<rect x="348.54" y="432.41" transform="matrix(0.8871 -0.4616 0.4616 0.8871 -159.4773 213.8939)" className="palma75" width="17.84" height="1.02"/>
					</g>
					<g className="palma450">
						
							<rect x="349" y="432.83" transform="matrix(0.8871 -0.4616 0.4616 0.8871 -159.6314 214.1065)" className="palma451" width="17.63" height="1.02"/>
					</g>
					<g className="palma452">
						
							<rect x="349.46" y="433.25" transform="matrix(0.8871 -0.4616 0.4616 0.8871 -159.7812 214.3082)" className="palma453" width="17.42" height="1.02"/>
					</g>
					<g className="palma454">
						
							<rect x="349.92" y="433.67" transform="matrix(0.8869 -0.4621 0.4621 0.8869 -160.0476 214.7859)" className="palma455" width="17.22" height="1.02"/>
					</g>
					<g className="palma456">
						
							<rect x="350.38" y="434.09" transform="matrix(0.8866 -0.4625 0.4625 0.8866 -160.303 215.238)" className="palma457" width="17.01" height="1.02"/>
					</g>
					<g className="palma458">
						
							<rect x="350.84" y="434.51" transform="matrix(0.8864 -0.4629 0.4629 0.8864 -160.5703 215.7182)" className="palma459" width="16.8" height="1.02"/>
					</g>
					<g className="palma460">
						
							<rect x="351.3" y="434.94" transform="matrix(0.8864 -0.4629 0.4629 0.8864 -160.7195 215.9191)" className="palma461" width="16.6" height="1.02"/>
					</g>
					<g className="palma462">
						
							<rect x="351.77" y="435.36" transform="matrix(0.8864 -0.4629 0.4629 0.8864 -160.8735 216.131)" className="palma463" width="16.39" height="1.02"/>
					</g>
					<g className="palma464">
						
							<rect x="352.23" y="435.78" transform="matrix(0.8862 -0.4633 0.4633 0.8862 -161.1363 216.6012)" className="palma463" width="16.18" height="1.02"/>
					</g>
					<g className="palma465">
						
							<rect x="352.69" y="436.2" transform="matrix(0.8862 -0.4633 0.4633 0.8862 -161.2956 216.8258)" className="palma466" width="15.97" height="1.02"/>
					</g>
					<g className="palma467">
						
							<rect x="353.15" y="436.62" transform="matrix(0.886 -0.4637 0.4637 0.886 -161.5413 217.2555)" className="palma468" width="15.77" height="1.02"/>
					</g>
					<g className="palma469">
						
							<rect x="353.61" y="437.04" transform="matrix(0.886 -0.4637 0.4637 0.886 -161.6961 217.4694)" className="palma83" width="15.56" height="1.02"/>
					</g>
					<g className="palma470">
						
							<rect x="354.07" y="437.46" transform="matrix(0.8858 -0.4641 0.4641 0.8858 -161.9584 217.9394)" className="palma471" width="15.36" height="1.02"/>
					</g>
					<g className="palma472">
						
							<rect x="354.53" y="437.89" transform="matrix(0.8857 -0.4642 0.4642 0.8857 -162.1186 218.1663)" className="palma85" width="15.15" height="1.02"/>
					</g>
					<g className="palma473">
						
							<rect x="354.99" y="438.31" transform="matrix(0.8853 -0.465 0.465 0.8853 -162.4826 218.8786)" className="palma474" width="14.94" height="1.02"/>
					</g>
					<g className="palma475">
						
							<rect x="355.45" y="438.73" transform="matrix(0.8853 -0.465 0.465 0.8853 -162.6269 219.0676)" className="palma476" width="14.73" height="1.02"/>
					</g>
					<g className="palma477">
						
							<rect x="355.91" y="439.15" transform="matrix(0.8853 -0.465 0.465 0.8853 -162.794 219.311)" className="palma87" width="14.53" height="1.02"/>
					</g>
					<g className="palma478">
						
							<rect x="356.37" y="439.57" transform="matrix(0.8851 -0.4654 0.4654 0.8851 -163.0401 219.743)" className="palma87" width="14.32" height="1.02"/>
					</g>
					<g className="palma479">
						
							<rect x="356.83" y="439.99" transform="matrix(0.8849 -0.4658 0.4658 0.8849 -163.3078 220.2267)" className="palma480" width="14.11" height="1.02"/>
					</g>
					<g className="palma481">
						
							<rect x="357.3" y="440.42" transform="matrix(0.8849 -0.4658 0.4658 0.8849 -163.4637 220.4434)" className="palma482" width="13.91" height="1.02"/>
					</g>
					<g className="palma483">
						
							<rect x="357.76" y="440.84" transform="matrix(0.8846 -0.4663 0.4663 0.8846 -163.7259 220.9151)" className="palma89" width="13.7" height="1.02"/>
					</g>
					<g className="palma484">
						
							<rect x="358.22" y="441.26" transform="matrix(0.8844 -0.4667 0.4667 0.8844 -163.984 221.3766)" className="palma485" width="13.5" height="1.02"/>
					</g>
					<g className="palma486">
						
							<rect x="358.68" y="441.68" transform="matrix(0.8842 -0.4671 0.4671 0.8842 -164.2471 221.8509)" className="palma91" width="13.29" height="1.02"/>
					</g>
					<g className="palma487">
						
							<rect x="359.14" y="442.1" transform="matrix(0.884 -0.4675 0.4675 0.884 -164.5097 222.3241)" className="palma488" width="13.08" height="1.02"/>
					</g>
					<g className="palma489">
						
							<rect x="359.6" y="442.52" transform="matrix(0.884 -0.4676 0.4676 0.884 -164.6714 222.5547)" className="palma490" width="12.87" height="1.02"/>
					</g>
					<g className="palma491">
						
							<rect x="360.06" y="442.95" transform="matrix(0.8837 -0.468 0.468 0.8837 -164.9287 223.0157)" className="palma93" width="12.67" height="1.02"/>
					</g>
					<g className="palma492">
						
							<rect x="360.52" y="443.37" transform="matrix(0.8835 -0.4684 0.4684 0.8835 -165.182 223.4673)" className="palma93" width="12.46" height="1.02"/>
					</g>
					<g className="palma493">
						
							<rect x="360.98" y="443.79" transform="matrix(0.8833 -0.4688 0.4688 0.8833 -165.4457 223.9441)" className="palma494" width="12.25" height="1.02"/>
					</g>
					<g className="palma495">
						
							<rect x="361.44" y="444.21" transform="matrix(0.883 -0.4694 0.4694 0.883 -165.7522 224.5253)" className="palma496" width="12.05" height="1.02"/>
					</g>
					<g className="palma497">
						
							<rect x="361.9" y="444.63" transform="matrix(0.8829 -0.4696 0.4696 0.8829 -165.9621 224.8727)" className="palma498" width="11.84" height="1.02"/>
					</g>
					<g className="palma499">
						
							<rect x="362.36" y="445.05" transform="matrix(0.8829 -0.4696 0.4696 0.8829 -166.1181 225.0899)" className="palma500" width="11.64" height="1.02"/>
					</g>
					<g className="palma501">
						
							<rect x="362.83" y="445.48" transform="matrix(0.8824 -0.4705 0.4705 0.8824 -166.4892 225.8289)" className="palma502" width="11.43" height="1.02"/>
					</g>
					<g className="palma503">
						
							<rect x="363.29" y="445.9" transform="matrix(0.8822 -0.4709 0.4709 0.8822 -166.7485 226.2967)" className="palma504" width="11.22" height="1.02"/>
					</g>
					<g className="palma505">
						
							<rect x="363.75" y="446.32" transform="matrix(0.8817 -0.4717 0.4717 0.8817 -167.1194 227.0374)" className="palma99" width="11.02" height="1.02"/>
					</g>
					<g className="palma506">
						
							<rect x="364.21" y="446.74" transform="matrix(0.8817 -0.4718 0.4718 0.8817 -167.2814 227.2692)" className="palma507" width="10.81" height="1.02"/>
					</g>
					<g className="palma508">
						
							<rect x="364.67" y="447.16" transform="matrix(0.8817 -0.4718 0.4718 0.8817 -167.438 227.4878)" className="palma509" width="10.6" height="1.02"/>
					</g>
					<g className="palma510">
						
							<rect x="365.13" y="447.58" transform="matrix(0.881 -0.473 0.473 0.881 -167.9121 228.4828)" className="palma101" width="10.4" height="1.02"/>
					</g>
					<g className="palma511">
						
							<rect x="365.59" y="448.01" transform="matrix(0.8806 -0.4738 0.4738 0.8806 -168.2615 229.1743)" className="palma101" width="10.19" height="1.02"/>
					</g>
					<g className="palma512">
						
							<rect x="366.05" y="448.43" transform="matrix(0.8806 -0.4738 0.4738 0.8806 -168.4185 229.394)" className="palma513" width="9.98" height="1.02"/>
					</g>
					<g className="palma514">
						
							<rect x="366.51" y="448.85" transform="matrix(0.8802 -0.4746 0.4746 0.8802 -168.7837 230.1259)" className="palma103" width="9.78" height="1.02"/>
					</g>
					<g className="palma515">
						
							<rect x="366.97" y="449.27" transform="matrix(0.8799 -0.4751 0.4751 0.8799 -169.0554 230.6275)" className="palma516" width="9.57" height="1.02"/>
					</g>
					<g className="palma517">
						
							<rect x="367.43" y="449.69" transform="matrix(0.8795 -0.476 0.476 0.8795 -169.4257 231.3746)" className="palma518" width="9.36" height="1.02"/>
					</g>
					<g className="palma519">
						
							<rect x="367.89" y="450.11" transform="matrix(0.8795 -0.4759 0.4759 0.8795 -169.5779 231.5822)" className="palma105" width="9.16" height="1.02"/>
					</g>
					<g className="palma520">
						
							<rect x="368.35" y="450.54" transform="matrix(0.8788 -0.4772 0.4772 0.8788 -170.0573 232.6009)" className="palma521" width="8.95" height="1.02"/>
					</g>
					<g className="palma522">
						
							<rect x="368.82" y="450.96" transform="matrix(0.8784 -0.478 0.478 0.8784 -170.406 233.2978)" className="palma523" width="8.74" height="1.02"/>
					</g>
					<g className="palma524">
						
							<rect x="369.28" y="451.38" transform="matrix(0.8779 -0.4788 0.4788 0.8779 -170.7703 234.0345)" className="palma525" width="8.54" height="1.02"/>
					</g>
					<g className="palma526">
						
							<rect x="369.74" y="451.8" transform="matrix(0.8777 -0.4793 0.4793 0.8777 -171.0374 234.5299)" className="palma525" width="8.33" height="1.02"/>
					</g>
					<g className="palma527">
						
							<rect x="370.2" y="452.22" transform="matrix(0.8772 -0.4801 0.4801 0.8772 -171.4126 235.2958)" className="palma109" width="8.12" height="1.02"/>
					</g>
					<g className="palma528">
						
							<rect x="370.66" y="452.64" transform="matrix(0.8765 -0.4814 0.4814 0.8765 -171.8855 236.3098)" className="palma529" width="7.92" height="1.02"/>
					</g>
					<g className="palma530">
						
							<rect x="371.12" y="453.07" transform="matrix(0.8761 -0.4822 0.4822 0.8761 -172.2438 237.0375)" className="palma531" width="7.71" height="1.02"/>
					</g>
					<g className="palma532">
						
							<rect x="371.58" y="453.49" transform="matrix(0.8754 -0.4835 0.4835 0.8754 -172.711 238.0427)" className="palma111" width="7.5" height="1.02"/>
					</g>
					<g className="palma533">
						
							<rect x="372.04" y="453.91" transform="matrix(0.8749 -0.4843 0.4843 0.8749 -173.0739 238.7852)" className="palma534" width="7.3" height="1.02"/>
					</g>
					<g className="palma535">
						
							<rect x="372.5" y="454.33" transform="matrix(0.8742 -0.4856 0.4856 0.8742 -173.5508 239.8211)" className="palma536" width="7.09" height="1.02"/>
					</g>
					<g className="palma537">
						
							<rect x="372.96" y="454.75" transform="matrix(0.8737 -0.4864 0.4864 0.8737 -173.9079 240.553)" className="palma113" width="6.88" height="1.02"/>
					</g>
					<g className="palma538">
						
							<rect x="373.42" y="455.17" transform="matrix(0.8731 -0.4876 0.4876 0.8731 -174.3677 241.5502)" className="palma539" width="6.68" height="1.02"/>
					</g>
					<g className="palma540">
						
							<rect x="373.88" y="455.59" transform="matrix(0.8726 -0.4885 0.4885 0.8726 -174.7401 242.3248)" className="palma539" width="6.47" height="1.02"/>
					</g>
					<g className="palma541">
						
							<rect x="374.35" y="456.02" transform="matrix(0.8714 -0.4905 0.4905 0.8714 -175.4053 243.8609)" className="palma542" width="6.26" height="1.02"/>
					</g>
					<g className="palma543">
						
							<rect x="374.81" y="456.44" transform="matrix(0.8707 -0.4918 0.4918 0.8707 -175.8799 244.9081)" className="palma542" width="6.06" height="1.02"/>
					</g>
					<g className="palma544">
						
							<rect x="375.27" y="456.86" transform="matrix(0.8695 -0.4939 0.4939 0.8695 -176.5426 246.4527)" className="palma545" width="5.85" height="1.02"/>
					</g>
					<g className="palma546">
						
							<rect x="375.73" y="457.28" transform="matrix(0.8688 -0.4951 0.4951 0.8688 -177.0058 247.4793)" className="palma547" width="5.64" height="1.02"/>
					</g>
					<g className="palma548">
						
							<rect x="376.19" y="457.7" transform="matrix(0.8676 -0.4972 0.4972 0.8676 -177.6698 249.043)" className="palma549" width="5.44" height="1.02"/>
					</g>
					<g className="palma550">
						
							<rect x="376.65" y="458.12" transform="matrix(0.8664 -0.4993 0.4993 0.8664 -178.3361 250.6226)" className="palma119" width="5.23" height="1.02"/>
					</g>
					<g className="palma551">
						
							<rect x="377.11" y="458.55" transform="matrix(0.8652 -0.5014 0.5014 0.8652 -178.9954 252.1935)" className="palma552" width="5.03" height="1.02"/>
					</g>
					<g className="palma553">
						
							<rect x="377.57" y="458.97" transform="matrix(0.8641 -0.5034 0.5034 0.8641 -179.6378 253.7281)" className="palma554" width="4.82" height="1.02"/>
					</g>
					<g className="palma555">
						
							<rect x="378.03" y="459.39" transform="matrix(0.8624 -0.5063 0.5063 0.8624 -180.4875 255.8409)" className="palma121" width="4.61" height="1.02"/>
					</g>
					<g className="palma556">
						
							<rect x="378.49" y="459.81" transform="matrix(0.8609 -0.5087 0.5087 0.8609 -181.2348 257.69)" className="palma557" width="4.41" height="1.02"/>
					</g>
					<g className="palma558">
						
							<rect x="378.95" y="460.23" transform="matrix(0.8592 -0.5116 0.5116 0.8592 -182.0745 259.812)" className="palma559" width="4.2" height="1.02"/>
					</g>
					<g>
						
							<rect x="379.41" y="460.65" transform="matrix(0.8573 -0.5149 0.5149 0.8573 -183.001 262.1997)" className="palma33" width="3.99" height="1.02"/>
					</g>
				</g>
				<g>
					<path className="palma20" d="M382.91,458.8c-0.04-0.05-0.09-0.1-0.14-0.14l-0.01-0.01l0,0c-0.39-0.32-0.98-0.32-1.63,0.08
						c-1.14,0.7-2.05,2.35-2.01,3.68c0.01,0.6,0.22,1.04,0.54,1.27l0,0l4.8,3.77l3.09-3.99L382.91,458.8z"/>
					<polygon className="palma29" points="384.29,463.05 388.31,460.6 388.43,465.71 384.41,468.16 					"/>
					<polygon className="palma31" points="384.29,463.05 380.16,460.79 380.28,465.9 384.41,468.16 					"/>
					<polygon className="palma30" points="384.18,458.34 380.16,460.79 384.29,463.05 388.31,460.6 					"/>
				</g>
			</g>
		</g>
	</g>
	<polygon className="" points="340.33,518.28 463.6,439.38 626.84,532.92 507.62,616.68 	"/>
	<path className="" d="M507.62,616.68l119.21-83.76l154.49,89.18c0,0-46.42,65.13-65.39,117.1L507.62,616.68z"/>
	<polygon className="" points="239.47,458.96 715.94,737.21 668.69,766.35 189.93,488.38 	"/>
	<g>
		<path className="palma26" d="M543.02,445.79c0.37-1.16,0.27-2.27-0.31-3.34c-0.58-1.07-1.6-2.04-3.07-2.91c-2.54-1.5-5.33-2.08-8.37-1.72
			c-3.05,0.36-5.83,1.6-8.36,3.73c-2.7,2.28-4,4.54-3.89,6.77c0.11,2.24,1.6,4.2,4.46,5.86c1.95,1.14,4.05,1.72,6.28,1.75
			c2.23,0.03,4.47-0.48,6.74-1.54l-10.04-5.88l5.23-4.43l17.09,10.05l-6.5,5.6c-2.34,1.17-4.96,2-7.87,2.48
			c-2.92,0.49-5.94,0.5-9.05,0.05c-3.12-0.45-6.05-1.48-8.8-3.07c-3.25-1.89-5.51-4.11-6.79-6.68c-1.27-2.57-1.48-5.22-0.62-7.97
			c0.86-2.74,2.74-5.33,5.66-7.77c2.91-2.43,6.2-4.18,9.87-5.24c3.66-1.06,7.36-1.38,11.09-0.95c3.72,0.42,7.17,1.58,10.34,3.46
			c3.83,2.28,6.22,4.9,7.2,7.86c0.97,2.97,0.42,5.95-1.65,8.97L543.02,445.79z"/>
		<path className="palma26" d="M567.67,455.35l-5.7,4.96l10.32,6.08l-5.28,4.64l-10.37-6.08l-6.26,5.45l11.79,6.87l-5.55,4.88l-19.72-11.44
			l28.56-24.68l19.23,11.44l-5.41,4.76L567.67,455.35z"/>
		<path className="palma26" d="M589.89,501.46l-7.63-4.43l4.37-22.78l-17.22,15.32l-7.74-4.49l27.95-24.69l7.55,4.49l-4.37,22.67
			l16.92-15.21l7.45,4.43L589.89,501.46z"/>
		<path className="palma26" d="M624.71,489.12l-5.42,4.96l9.92,5.84l-5.02,4.64l-9.96-5.84l-5.95,5.45l11.32,6.6l-5.27,4.88l-18.94-10.99
			l27.14-24.69l18.48,10.99l-5.15,4.76L624.71,489.12z"/>
		<path className="palma26" d="M634.71,527.47l3.73-13.07l-1.76-1.03l-10.05,9.41l-7.44-4.32l26.57-24.69l12.16,7.23
			c2.33,1.39,3.96,2.9,4.89,4.55c0.93,1.65,1.18,3.29,0.76,4.95c-0.42,1.65-1.39,3.2-2.92,4.65c-1.72,1.63-3.82,2.77-6.29,3.4
			c-2.48,0.63-5.1,0.58-7.86-0.16l-3.49,13.9L634.71,527.47z M641.23,509.11l4.53,2.66c1.34,0.79,2.62,1.11,3.86,0.96
			c1.24-0.15,2.37-0.71,3.41-1.69c0.99-0.93,1.43-1.86,1.34-2.79c-0.1-0.93-0.81-1.78-2.14-2.57l-4.5-2.66L641.23,509.11z"/>
		<path className="palma26" d="M670.43,541.15l-11.05-6.44l-6.38,3.38l-7.64-4.43l36.52-18.4l8.19,4.87L675.26,551l-7.6-4.41L670.43,541.15
			z M673.41,535.4l5.71-11.16l-12.97,6.91L673.41,535.4z"/>
		<path className="palma26" d="M690.36,552.32l9.24,5.39l-4.72,4.69l-16.41-9.52l25.17-24.68l6.96,4.14L690.36,552.32z"/>
	</g>
	<g>
		<path className="palma26" d="M373.81,557.55c0.37-1.16,0.27-2.27-0.31-3.34c-0.58-1.07-1.6-2.04-3.07-2.91c-2.54-1.5-5.33-2.08-8.37-1.72
			c-3.05,0.36-5.83,1.6-8.36,3.73c-2.7,2.28-4,4.54-3.89,6.77c0.11,2.24,1.6,4.2,4.46,5.86c1.95,1.14,4.05,1.72,6.28,1.75
			c2.23,0.03,4.47-0.48,6.74-1.54l-10.04-5.88l5.23-4.43l17.09,10.05l-6.5,5.6c-2.34,1.17-4.96,2-7.87,2.48
			c-2.92,0.49-5.94,0.5-9.05,0.05c-3.12-0.45-6.05-1.48-8.8-3.07c-3.25-1.89-5.51-4.11-6.79-6.68c-1.27-2.57-1.48-5.22-0.62-7.97
			c0.86-2.74,2.74-5.33,5.66-7.77c2.91-2.43,6.2-4.18,9.87-5.24c3.66-1.06,7.36-1.38,11.09-0.95c3.72,0.42,7.17,1.58,10.34,3.46
			c3.83,2.28,6.22,4.9,7.2,7.86c0.97,2.97,0.42,5.95-1.65,8.97L373.81,557.55z"/>
		<path className="palma26" d="M398.45,567.12l-5.7,4.96l10.32,6.08l-5.28,4.64l-10.37-6.08l-6.26,5.45l11.79,6.87l-5.55,4.88l-19.72-11.44
			l28.56-24.68l19.23,11.44l-5.41,4.76L398.45,567.12z"/>
		<path className="palma26" d="M420.67,613.23l-7.63-4.43l4.37-22.78l-17.22,15.32l-7.74-4.49l27.95-24.69l7.55,4.49l-4.37,22.67
			l16.92-15.21l7.45,4.43L420.67,613.23z"/>
		<path className="palma26" d="M455.5,600.88l-5.42,4.96l9.92,5.84l-5.02,4.64l-9.96-5.84l-5.95,5.45l11.32,6.6l-5.27,4.88l-18.94-10.99
			l27.14-24.69l18.48,10.99l-5.15,4.76L455.5,600.88z"/>
		<path className="palma26" d="M465.49,639.23l3.73-13.07l-1.76-1.03l-10.05,9.41l-7.44-4.32l26.57-24.69l12.16,7.23
			c2.33,1.39,3.96,2.9,4.89,4.55c0.93,1.65,1.18,3.29,0.76,4.95c-0.42,1.65-1.39,3.2-2.92,4.65c-1.72,1.63-3.82,2.77-6.29,3.4
			c-2.48,0.63-5.1,0.58-7.86-0.16l-3.49,13.9L465.49,639.23z M472.01,620.87l4.53,2.66c1.34,0.79,2.62,1.11,3.86,0.96
			c1.24-0.15,2.37-0.71,3.41-1.69c0.99-0.93,1.43-1.86,1.34-2.79c-0.1-0.93-0.81-1.78-2.14-2.57l-4.5-2.66L472.01,620.87z"/>
		<path className="palma26" d="M501.22,652.91l-11.05-6.44l-6.38,3.38l-7.64-4.43l36.52-18.4l8.19,4.87l-14.81,30.88l-7.6-4.41
			L501.22,652.91z M504.2,647.16l5.71-11.16l-12.97,6.91L504.2,647.16z"/>
		<path className="palma26" d="M521.15,664.08l9.24,5.39l-4.72,4.69l-16.41-9.52l25.17-24.68l6.96,4.14L521.15,664.08z"/>
	</g>
	<g>
		<path className="palma26" d="M439.38,493.8c0.59-0.91,0.72-1.78,0.39-2.62c-0.34-0.84-1.12-1.6-2.35-2.28c-2.13-1.18-4.7-1.64-7.7-1.35
			c-3.01,0.29-5.94,1.27-8.8,2.95c-3.05,1.79-4.74,3.57-5.07,5.33c-0.33,1.75,0.72,3.28,3.14,4.57c1.65,0.88,3.54,1.33,5.67,1.35
			c2.12,0.02,4.37-0.39,6.75-1.21l-8.44-4.56l5.9-3.48l14.29,7.82l-7.32,4.35c-2.46,0.91-5.12,1.56-7.99,1.94
			c-2.88,0.39-5.76,0.41-8.64,0.07c-2.89-0.34-5.5-1.12-7.83-2.35c-2.76-1.46-4.51-3.18-5.25-5.18c-0.74-2.01-0.44-4.09,0.91-6.25
			c1.35-2.16,3.68-4.21,6.98-6.15c3.29-1.93,6.82-3.32,10.59-4.16c3.75-0.84,7.39-1.09,10.91-0.75c3.5,0.34,6.58,1.25,9.23,2.75
			c3.2,1.8,4.94,3.86,5.25,6.19c0.31,2.32-0.84,4.65-3.44,7.01L439.38,493.8z"/>
		<path className="palma26" d="M436.1,515.09c-0.69-1.95-0.38-4.01,0.92-6.18c1.3-2.17,3.52-4.19,6.68-6.07c3.15-1.87,6.57-3.22,10.28-4.04
			c3.69-0.81,7.24-1.07,10.65-0.76c3.39,0.3,6.29,1.13,8.68,2.48c2.38,1.34,3.87,2.97,4.48,4.9c0.61,1.92,0.26,3.92-1.03,6.01
			c-1.29,2.09-3.46,4.05-6.5,5.89c-3.05,1.84-6.38,3.19-10,4.05c-3.63,0.86-7.15,1.17-10.55,0.93c-3.42-0.24-6.36-1.01-8.84-2.32
			C438.37,518.66,436.78,517.03,436.1,515.09z M455.46,516.88c2.92-0.34,5.74-1.34,8.49-2.99c2.77-1.67,4.37-3.33,4.81-5
			c0.43-1.67-0.37-3.07-2.4-4.2c-2.07-1.15-4.55-1.57-7.45-1.27c-2.91,0.31-5.79,1.31-8.63,3.01c-2.82,1.69-4.45,3.38-4.87,5.06
			c-0.42,1.69,0.43,3.1,2.55,4.23C450.03,516.84,452.53,517.22,455.46,516.88z"/>
		<path className="palma26" d="M470.01,528.38l7.95,4.24l-5.78,3.52l-14.2-7.49l31.04-18.77l5.96,3.35L470.01,528.38z"/>
		<path className="palma26" d="M518.9,528.86c0.59,1.78,0.27,3.63-0.96,5.56c-1.23,1.93-3.3,3.79-6.22,5.59c-2.9,1.79-5.98,3.1-9.26,3.95
			c-3.29,0.85-6.5,1.16-9.65,0.93c-3.16-0.23-6.01-1.02-8.54-2.36l-9.19-4.85l30.4-18.55l8.85,4.97
			C516.79,525.49,518.31,527.07,518.9,528.86z M497.7,539.79c2.73-0.27,5.46-1.25,8.21-2.94c2.74-1.69,4.28-3.33,4.6-4.93
			c0.32-1.6-0.6-3.01-2.77-4.21l-2.73-1.52l-17.54,10.73l2.79,1.49C492.49,539.6,494.97,540.06,497.7,539.79z"/>
		<path className="palma26" d="M529.39,539.28l-5.9,3.66l7.38,4.05l-5.45,3.39l-7.43-4.03l-6.44,3.99l8.47,4.52l-5.69,3.54l-14.24-7.52
			l29.47-18.22l13.72,7.71l-5.61,3.49L529.39,539.28z"/>
		<path className="palma26" d="M537.9,570.83l-5.35-2.83l8.61-15.87l-17.7,11.07l-5.51-2.91l28.81-17.97l5.31,2.98l-8.71,15.9l17.47-10.98
			l5.16,2.9L537.9,570.83z"/>
	</g>
	<g>
		<path className="palma26" d="M671.75,611.68l-54.53,22.92l-11.59-7.55l25.1-39.46l10.13,5.95l-19.94,29.65l40.04-17.84L671.75,611.68z"/>
		<path className="palma26" d="M686.6,620.4l-41.54,32.34l-9.9-6.45l40.9-32.08L686.6,620.4z"/>
		<path className="palma26" d="M706.3,660.7c-3.34,0.84-6.91,0.96-10.7,0.37c-3.77-0.59-7.48-2.03-11.12-4.32l-6.65-4.18l-15.16,11.64
			l-10.29-6.71l42.02-32.53l17.9,10.51c3.7,2.17,6.24,4.49,7.61,6.94c1.37,2.46,1.63,4.9,0.77,7.31c-0.86,2.41-2.69,4.67-5.48,6.78
			C712.62,658.46,709.65,659.86,706.3,660.7z M698.1,651.66c1.99-0.09,3.85-0.8,5.6-2.12c1.75-1.33,2.57-2.67,2.48-4.04
			c-0.09-1.36-1.2-2.68-3.33-3.95l-6-3.6l-10.77,8.27l5.9,3.63C694.08,651.15,696.12,651.75,698.1,651.66z"/>
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