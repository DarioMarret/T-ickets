(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

/*const container = document.querySelectorAll('p.evento');
container.forEach(c => {
  c.addEventListener('click', (e) => {
    if (!e.target.localName == "p") {
      e.path[2].children[3].classList
      return
    };
    if (e.path[2].children[1].classList.contains("container")) {
      e.path[2].children[0].classList.toggle("d-none");
      e.path[2].children[1].classList.toggle("d-none")
      e.path[2].children[6].classList.toggle("d-none");

    } else {
      e.path[2].classList.toggle("d-none");
      e.path[2].children[1].classList.toggle("d-none")
      e.path[2].children[6].classList.toggle("d-none");
    }
  })
});*/


const link = document.querySelectorAll('a')
link.forEach(c => (c.addEventListener('click', (e) => {
  if (e.target.getAttribute('class').split(" ")[0] == "efectivo") {
    //console.log(e.path[2].children)
    e.path[2].children[1].classList.toggle("d-none");
    e.path[2].children[2].classList.toggle("d-none");
    e.path[2].children[3].classList.toggle("d-none");
  }
  if (e.target.getAttribute('class').split(" ")[0] == "payphone") {
  }
  if (e.target.getAttribute('class').split(" ")[0] == "tarjeta") {
  }
  if (e.target.getAttribute('class').split(" ")[0] == "deposito") {
  }
})))
const div = document.querySelectorAll('.back')
const cancelar = document.querySelectorAll('.cancelar')

div.forEach(e => (e.addEventListener('click', (e) => {
  e.path[2].children[1].classList.toggle("d-none");
  e.path[2].children[2].classList.add("d-none");
  e.path[2].children[3].classList.add("d-none");
})))

const validacedula = async (e) => {
  const numero = document.getElementById(e).value;
  if (!numero) return
  $('.spinner-border').removeClass('d-none')
  $(".spinner").attr("disabled", true);
  $('.search').addClass('d-none')
  try {
    const { data } = await axios.get("https://api.t-ickets.com/pdfqr/api/v1/cedula/" + numero)
    const { message } = await data;
    const email = message['email'] ? message['email'] : '';
    const edad = message['fecha_nacimiento'] ? message['fecha_nacimiento'] : '';
    const telefono = message['telefono'] ? message['telefono'] : '';
    const nombres = message['name'] ? message['name'] : '';
    document.getElementById('mail').value = email
    document.getElementById('date').value = edad
    document.getElementById('celular').value = telefono
    document.getElementById('names').value = nombres
    $('.search').removeClass('d-none')
    $('.spinner-border').addClass('d-none')
    $(".spinner").attr("disabled", false);
    if (!nombres) {
      Swal.fire('', 'Cédula no registrada', 'warning')
      $('.search').removeClass('d-none')
      $('.spinner-border').addClass('d-none')
      $(".spinner").attr("disabled", false);
    }
  } catch (Error) {
    $('.search').removeClass('d-none')
    $('.spinner-border').addClass('d-none')
    $(".spinner-border").attr("disabled", false);
    Swal.fire(
      'Hubo un error',
      '' + Error,
      'warning'
    )
    return Error;
  }
}
(function () {
  'use strict'
  var forms = document.querySelectorAll('#report')
  const buttonElement = document.getElementById('td')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      buttonElement.addEventListener('click', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

const reporte = document.getElementById('td')
var form = document.querySelectorAll('.needs-validation')
reporte.addEventListener('click', async function (event) {
  event.preventDefault()
  if (!document.getElementById('names').value || !document.getElementById('ce_dni').value || !document.getElementById('mail').value) return
  if (!document.getElementById('date') || !document.getElementById('banconom') || !document.getElementById('transacciones').value) return
  if (!document.getElementById('celular')) return
  let _datos = {
    u_nombre: document.getElementById('names').value,
    u_cedula: document.getElementById('ce_dni').value,
    u_correo: document.getElementById('mail').value,
    u_fecha: document.getElementById('date').value,
    u_banco: document.getElementById('banconom').value,
    u_transaci: document.getElementById('transacciones').value,
    u_form: document.getElementById('formularios').value,
    u_telefono: document.getElementById('celular').value
  }
  try {
    const { data, status } = await axios.post('https://api.t-ickets.com/pdfqr/api/v1/registro', _datos)
    if (!data.success) {
      Swal.fire('Erro', 'hubo un error intente de nuevo', 'warning')
    } else {
      Swal.fire('Su informacion a sido guardada', 'Espere a que un colaborador se contacte con usted', 'success')
    }
    $('#Modaltarjeta').modal('hide')
  } catch (error) {
    Swal.fire('Erro', 'hubo un error intente de nuevo', 'warning')
    return error
  }
})
$('.cerrar').click(function () {
  $('#Modaltarjeta').modal('hide')
})
function reprtcompro(e) {
  document.getElementById('names').value = ''
  document.getElementById('ce_dni').value = ''
  document.getElementById('mail').value = ''
  document.getElementById('date').value = ''
  document.getElementById('bancos').value = ''
  document.getElementById('banconom').value = ''
  document.getElementById('formulario').value = ''
  document.getElementById('telefonos').value = ''
  document.getElementById('formularios').value = e;
  $('.titel').text(e);
}
const validacedula2 = async (e) => {
  const numero = document.getElementById(e).value;
  if (!numero) return
  try {
    const { data } = await axios.get("https://api.t-ickets.com/pdfqr/api/v1/cedula/" + numero)
    const { message } = await data;
    const email = message['email'] ? message['email'] : '';
    const edad = message['fecha_nacimiento'] ? message['fecha_nacimiento'] : '';
    const telefono = message['telefono'] ? message['telefono'] : '';
    const nombres = message['name'] ? message['name'] : '';
    document.getElementById('emaildos').value = email
    document.getElementById('fechados').value = edad
    document.getElementById('telefonodos').value = telefono
    document.getElementById('nombredos').value = nombres
  } catch (Error) {
    return Error;
  }
}
/*
const eventos = async () => {
  const info = await fetch('http://localhost:4000/api/eventos').then(response => response.json())
}
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps)
}*/
