

var arrayList = [];
var arrayFilas = [];
var localidad;
var valor = 0;
var totaldetalle = 0;
var detalle_de_compra = [];
var evento_seleccionado = "";
function toggleValueInArray(array, value) {
  var index = array.findIndex(obj => obj.silla == value.silla);
  //var index = array.indexOf(value);
  if (index == -1) {
    array.push(value);
  } else {
    do {
      array.splice(index, 1);
      index = array.indexOf(value);
    } while (index != -1);
  }
  console.log(arrayList)
}
function eliminafila(array, value) {
  var items = array;
  var i = items.length;
  while (i--) {
    if (value.indexOf(items[i].fila) != -1) {
      $('.' + items[i].silla).removeClass('btn-secondary')
      $('.' + items[i].silla).addClass('btn-success')
      items.splice(i, 1);
    }
  }
}
function modal() {
  $('#asientos').modal('show')
}
$(document).on('click', 'p.silla', function (event) {
  event.preventDefault();
  const fila = this.classList[1]
  if (!this.classList.contains('btn-danger') && !this.classList.contains('btn-warning')) {
    const dato = this.classList.contains('btn-success') ? "Seleccionar la silla ubicada en" : "quitar la seleccion de la silla ubicada en"
    Swal.fire({
      title: 'Desea ' + dato + ' ' + this.classList[0],
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',

    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.classList.contains('btn-danger') && !this.classList.contains('btn-warning') && !arrayList.includes(this.classList[0])) {
          toggleValueInArray(arrayList, { "fila": fila, "silla": this.classList[0] })
          this.classList.toggle('btn-secondary')
          this.classList.toggle('btn-success')
          Swal.fire({
            title: 'Desea continuar seleccionando otro asiento',
            icon: 'info',
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#3085d6',
            denyButtonText: `Terminar`,
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire({

                icon: 'success',
                title: 'Asiento seleccionado',
                showConfirmButton: false,
                timer: 1500
              })
            }
            if (res.isDenied) {
              $('#asientos').modal('hide')
              añadir()

            }
          })

        }
        else if (arrayList.includes(this.classList[0])) {
          toggleValueInArray(arrayList, { "fila": fila, "silla": this.classList[0] })
          this.classList.toggle('btn-success')
          this.classList.toggle('btn-secondary')
        }

      }
    })
  }
});
$(document).on('click', 'p.mesa', function (event) {
  event.preventDefault();
  //const form = new FormData(e.target)
  //const {ancho,alto,color,titel} = Object.fromEntries(form.entries())
  console.log(event)
  var mesa = this.classList[1];
  const fila = this.classList[1]
  console.log(fila)
  Swal.fire({
    title: 'Desea seleccionar los asientos de la mesa ubicada en ' + this.classList[0],
    showDenyButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3085d6',
  }).then((result) => {

    if (result.isConfirmed) {

      if (!$("." + silla).hasClass('btn-danger') && !$("." + silla).hasClass('btn-warning') && !$("." + silla).hasClass('btn-secondary')) {
        for (i = 1; i <= 10; i++) {
          var silla = this.classList[0] + '-s' + i;
          $("." + silla).addClass('btn-secondary')
          $("." + silla).removeClass('btn-success')

          this.classList.remove('btn-success')
          this.classList.add('btn-secondary')
          this.classList.remove('mesa')
          this.classList.add('ocupado-seleccion')
          toggleValueInArray(arrayList, { "fila": mesa, "silla": silla })
        }
        Swal.fire({
          title: 'Desea continuar seleccionando otros asientos',
          icon: 'info',
          showDenyButton: true,
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3085d6',
          denyButtonText: `Terminar`,
        }).then((res) => {
          if (res.isConfirmed) { }
          if (res.isDenied) {
            $('#asientos').modal('hide')
            Swal.fire({

              icon: 'success',
              title: 'Asiento agregados ',
              showConfirmButton: false,
              timer: 1500
            })
            añadir()

          }
        })


      }


    }
  })


});
$(document).on('click', 'p.ocupado-seleccion', function (event) {
  event.preventDefault();
  console.log(event)
  var mesa = this.classList[1];
  const fila = this.classList[1]
  console.log(fila)
  Swal.fire({
    title: 'Desea quitar los asientos seleccionados  de la mesa ubicada en ' + this.classList[0],
    showDenyButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3085d6',
  }).then((result) => {

    if (result.isConfirmed) {
      if (!$("." + silla).hasClass('btn-danger') && !$("." + silla).hasClass('btn-warning') && !$("." + silla).hasClass('btn-secondary')) {
        for (i = 1; i <= 10; i++) {
          var silla = this.classList[0] + '-s' + i;
          $("." + silla).removeClass('btn-secondary')
          $("." + silla).addClass('btn-success')
          this.classList.add('btn-success')
          this.classList.remove('btn-secondary')
          this.classList.add('mesa')
          this.classList.remove('ocupado-seleccion')
          toggleValueInArray(arrayList, { "fila": mesa, "silla": silla })
        }
        Swal.fire({
          icon: 'info',
          title: 'Desea continuar seleccionando otros asientos',
          showDenyButton: true,
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3085d6',
          denyButtonText: `Terminar`,
        }).then((res) => {
          if (res.isConfirmed) { }
          if (res.isDenied) {
            $('#asientos').modal('hide')
            añadir()

          }
        })

      }


    }
  })


});
$(document).on('click', 'button.añadirsillas', function (event) {
  totaldetalle = 0;
  console.log(arrayList)
  const specimens = arrayList.filter((index, i) => i == 0 ? true : arrayList[i - 1].fila != index.fila);
  const counterSpecimens = specimens.map(spec => {
    return { fila: spec.fila, silla: 0 };
  });
  counterSpecimens.map((countSpec, i) => {
    const actualSpecLength = arrayList.filter(number => number.fila === countSpec.fila).length;
    countSpec.silla = actualSpecLength;
  })
  const mySet1 = counterSpecimens
  const ids = mySet1.map(o => o.fila)
  const filtered = mySet1.filter(({ fila }, index) => !ids.includes(fila, index + 1))
  arrayFilas = filtered
  console.log(arrayFilas)
  arrayFilas.forEach(function (e) {
    if ($(".detalles-resumen tbody tr").hasClass(localidad + e.fila)) $("#" + localidad + e.fila + "").remove();
    //$(".detalles-resumen tbody tr.'"+localidad+e.fila+"'").remove();
    console.log({ 'localidad': localidad, 'valor': valor * e.silla, 'fila': e.fila, 'asientos': e.silla })
    var filas2 = "<tr id='" + localidad + e.fila + "' class='" + localidad + e.fila + "'><td class='localidad'style='font-size: 0.8em;'>" + localidad + "</td>"
    filas2 = filas2 + "<td class='fila'style='font-size: 0.8em;'>" + e.fila + "</td>"
    filas2 = filas2 + "<td class='asiento'style='font-size: 0.8em;'>" + e.silla + "</td>"
    filas2 = filas2 + "<td class='total'style='font-size: 0.8em;'>$" + valor * e.silla + "</td>"
    filas2 = filas2 + "<td ><button class='btn btn-primary badge text-bg-primary borrar'>ELIMINAR</button></td></tr>"

    $('.detalles-resumen>tbody').append(filas2)
  })

  document.querySelectorAll('.detalles-resumen tbody tr').forEach(function (e) {
    var valor = e.querySelector('.total').innerText.replace("$", "")
    totaldetalle += parseFloat(valor)

    const filas = $(".detalles-resumen tr").length;

    if (filas > 1)
      console.log(filas)
    $(".continuar").removeAttr("disabled");
    if (filas === 1)
      $(".continuar").attr("disabled", true);
  });
  $('.total-detalle').text("$" + totaldetalle)
})
function añadir() {
  totaldetalle = 0;
  console.log(arrayList)
  const specimens = arrayList.filter((index, i) => i == 0 ? true : arrayList[i - 1].fila != index.fila);
  const counterSpecimens = specimens.map(spec => {
    return { fila: spec.fila, silla: 0 };
  });
  counterSpecimens.map((countSpec, i) => {
    const actualSpecLength = arrayList.filter(number => number.fila === countSpec.fila).length;
    countSpec.silla = actualSpecLength;
  })
  const mySet1 = counterSpecimens
  const ids = mySet1.map(o => o.fila)
  const filtered = mySet1.filter(({ fila }, index) => !ids.includes(fila, index + 1))
  arrayFilas = filtered
  console.log(arrayFilas)
  arrayFilas.forEach(function (e) {
    if ($(".detalles-resumen tbody tr").hasClass(localidad + e.fila)) $("#" + localidad + e.fila + "").remove();
    //$(".detalles-resumen tbody tr.'"+localidad+e.fila+"'").remove();
    console.log({ 'localidad': localidad, 'valor': valor * e.silla, 'fila': e.fila, 'asientos': e.silla })
    var filas2 = "<tr id='" + localidad + e.fila + "' class='" + localidad + e.fila + "'><td class='localidad'style='font-size: 0.8em;'>" + localidad + "</td>"
    filas2 = filas2 + "<td class='fila'style='font-size: 0.8em;'>" + e.fila + "</td>"
    filas2 = filas2 + "<td class='asiento'style='font-size: 0.8em;'>" + e.silla + "</td>"
    filas2 = filas2 + "<td class='total'style='font-size: 0.8em;'>$" + valor * e.silla + "</td>"
    filas2 = filas2 + "<td ><button class='btn btn-primary badge text-bg-primary borrar'>ELIMINAR</button></td></tr>"

    $('.detalles-resumen>tbody').append(filas2)
  })

  document.querySelectorAll('.detalles-resumen tbody tr').forEach(function (e) {
    var valor = e.querySelector('.total').innerText.replace("$", "")
    totaldetalle += parseFloat(valor)

    const filas = $(".detalles-resumen tr").length;

    if (filas > 1)
      console.log(filas)
    $(".continuar").removeAttr("disabled");
    if (filas === 1)
      $(".continuar").attr("disabled", true);
  });
  $('.total-detalle').text("$" + totaldetalle)

}

$(document).on('click', '.borrar', function (event) {

  event.preventDefault();
  $(this).closest('tr').remove();
  var valor = $(this).parents("tr").find("td")[1].innerHTML;
  eliminafila(arrayList, valor)
  console.log(arrayList)
  let subtotal = 0;
  document.querySelectorAll('.detalles-resumen tbody tr').forEach(function (e) {
    var valor = e.querySelector('.total').innerText.replace("$", "")
    subtotal += parseFloat(valor)

  });
  $('.total-detalle').text("$" + subtotal)
  const filas = $(".detalles-resumen tr").length;
  console.log(filas)
  if (filas > 1) $(".continuar").removeAttr("disabled");
  if (filas === 1) $(".continuar").attr("disabled", true);
});
$(document).on('click', 'p.seleccion', function () {
  localidad = $(this).parents("tr").find("td p")[0].innerHTML;
  valor = $(this).parents("tr").find("td")[1].innerHTML.replace("$", "");

});
let subtotal = 0;
let comision = 0;
const opciones = () => {
  comision = 0;
  let evento = $('#evento').text()

  $('.resumen-table>tbody').empty()
  document.querySelectorAll('.detalles-resumen tbody tr').forEach(function (e) {
    var valor = e.querySelector('.total').innerText.replace("$", "")
    let asiento = e.querySelector('.asiento').innerText
    comision += parseFloat(asiento)
    subtotal += parseFloat(valor)
    var filas = "<tr><td class='lugar'>" + evento + "</td>"
    filas = filas + "<td class='localidad'>" + e.querySelector('.localidad').innerText + "</td>"
    filas = filas + "<td class='filas'>" + e.querySelector('.fila').innerText + "</td>"
    filas = filas + "<td class='cantida'>" + e.querySelector('.asiento').innerText + "</td>"
    filas = filas + "<td class='valor'>" + e.querySelector('.total').innerText + "</td></tr>"
    $('.resumen-table>tbody').append(filas)
  });
  let asiento = parseFloat(comision)
  let total = parseFloat(subtotal) + asiento
  //console.log(asiento)
  $('.comision-boleto').text("$" + asiento)
  $('.subtotal').text("$" + subtotal)
  $('.total-text').text("$" + total)
  if ($('#chektarjeta').is(":checked")) {
    $('#metodo-de').text('tarjeta-credito')
    $('#pagartarjetas').removeClass('d-none')
    $('#pagarcuenta').addClass('d-none')
    $('#pagardeposito').addClass('d-none')
  }
  if ($('#deposito-tarj').is(":checked")) {
    $('#metodo-de').text('Deposito')
    $('#pagardeposito').removeClass('d-none')
    $('#pagarcuenta').addClass('d-none')
    $('#pagartarjetas').addClass('d-none')
  }
  if ($('#efectivo-tarj').is(":checked")) {
    $('#metodo-de').text('Efectivo')
    $('#pagarcuenta').removeClass('d-none')
    $('#pagardeposito').addClass('d-none')
    $('#pagartarjetas').addClass('d-none')
  }
}

const tarjeta = document.getElementById('pagar-td')
tarjeta.addEventListener('click', async function (event) {
  event.preventDefault()
  event.path[2].classList.add('was-validated')
  if (!document.getElementById('idcard').value || !document.getElementById('titular').value || !document.getElementById('fechaex').value) return
  if (!document.getElementById('codigo') || !document.getElementById('diferir')) return
  let compre = {
    "cedula": $('#dni-resumen').text(),
    "metodo_envio": $('#envio-resumen').val(),
    "metodo_pago": $('#metodo-de').text(),
    "#tarjeta": $('#idcard').val(), "titualr": $('#titular').val(),
    "fecha_tarjeta": $('#fechaex').val(),
    "codigo_tarje": $('#codigo').val(),
    "difiere": $('#diferir').val(),
    "detalle": detalle_de_compra,
    "sutotal": subtotal,
    "comision": comision,
    "toatl": subtotal + comision
  }
  console.log(compre)
  Swal.fire('Transacción Guardad', 'retire su boleto con su tarjeta', 'success')

})
const depositos = () => {
  //console.log("EEe")
  // $('#depositoModal').modal('hide')
  // $('#reporteModalfi').modal('show')
}
const cerrar = () => {
  //$('#reporteModalfi').modal('hide')
}
const pagar = () => {
  evento_seleccionado = $('#evento').text()

  if ($('#metodo-de').text() == "Efectivo") {

  }
  if ($('#metodo-de').text() == "tarjeta-credito") {

    document.querySelectorAll('.resumen-table tbody tr').forEach(function (e) {
      let filas = {
        localidad: e.querySelector('.localidad').innerText,
        fila: e.querySelector('.filas').innerText,
        asiento: e.querySelector('.cantida').innerText,
        total: e.querySelector('.valor').innerText.replace("$", ""),
        data_seleccion: arrayList
      }
      detalle_de_compra.push(filas);
    })
  }
  if ($('#metodo-de').text() == "Deposito") {


    document.querySelectorAll('.resumen-table tbody tr').forEach(function (e) {
      let filas = {
        localidad: e.querySelector('.localidad').innerText,
        fila: e.querySelector('.filas').innerText,
        asiento: e.querySelector('.cantida').innerText,
        total: e.querySelector('.valor').innerText.replace("$", ""),
        data_seleccion: arrayList
      }
      detalle_de_compra.push(filas);
    })
  }
}