document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('.navbar').classList.add('fixed-top');
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.querySelector('.navbar').classList.remove('fixed-top')
      document.body.style.paddingTop = '0';
    }
  });
});


function obtenervariables() {
  const variables = {}
  let data = JSON.stringify("a:16:{s:6:\"olt_id\";s:1:\"2\";s:8:\"pon_type\";s:4:\"gpon\";s:5:\"board\";s:1:\"0\";s:4:\"port\";s:1:\"7\";s:2:\"sn\";s:12:\"HWTC3549C29C\";s:4:\"vlan\";s:3:\"100\";s:8:\"onu_type\";s:7:\"HG8240H\";s:4:\"zone\";s:22:\"PANCHO JACOME SECTOR A\";s:3:\"odb\";s:0:\"\";s:4:\"name\";s:12:\"ANDRES TAPIA\";s:18:\"address_or_comment\";s:0:\"\";s:8:\"onu_mode\";s:7:\"Routing\";s:15:\"onu_external_id\";s:4:\"1270\";s:11:\"onu_type_id\";s:2:\"50\";s:25:\"upload_speed_profile_name\";s:10:\"PLAN-SPEED\";s:27:\"download_speed_profile_name\";s:10:\"PLAN-SPEED\";}")
  const procesar = JSON.parse(data).split("{")[1]
  /* .replace("s:", "").split(":")[1].replace(/['"]+/g, '')
  // procesar.replace("{", "").replace("}", "").split(";")[1].replace("s:", "").split(":")[1].replace(/['"]+/g, '')
  /*procesar.replace("{", "").replace("}", "").split(";").forEach((element, i) => {
    if (!(i % 2 == 0)) {
      let index = procesar.replace("{", "").replace("}", "").split(";")[i - 1].replace("s:", "").split(":")[1]
      variables[i] = index.replace(/['"]+/g, '') + "&-&" + element.replace("s:", "").split(":")[1].replace(/['"]+/g, '')
    }
  })
  console.log(procesar.replace("{", "").replace("}", "").split(";")[1].replace("s:", ""))*/
  return procesar.replace("{", "").replace("}", "").split(";")[1].replace("s:", "").split(":")[1].replace(/['"]+/g, '')
}
//let nuevo = { 1: 'olt_id&-&2', 3: 'pon_type&-&gpon', 5: 'board&-&0', 7: 'port&-&7', 9: 'sn&-&HWTC3549C29C', 11: 'vlan&-&100', 13: 'onu_type&-&HG8240H', 15: 'zone&-&PANCHO JACOME SECTOR A', 17: 'odb&-&', 19: 'name&-&ANDRES TAPIA', 21: 'address_or_comment&-&', 23: 'onu_mode&-&Routing', 25: 'onu_external_id&-&1270', 27: 'onu_type_id&-&50', 29: 'upload_speed_profile_name&-&PLAN-SPEED', 31: 'download_speed_profile_name&-&PLAN-SPEED' }

console.log(obtenervariables())
function obtenerEstado() {
  //variable ->Json

  let respuesta = { "status": true, "response": [{ "board": "0", "pon_port": "0", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up  \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.21 dBm", "onus_count": 1, "online_onus_count": 1, "average_signal": -11.04 }, { "board": "0", "pon_port": "1", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.14 dBm", "onus_count": 0, "online_onus_count": 0, "average_signal": 0 }, { "board": "0", "pon_port": "2", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up  \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000  m", "tx_power": "4.95  dBm", "onus_count": 51, "online_onus_count": 41, "average_signal": -25.81 }, { "board": "0", "pon_port": "3", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.24 dBm", "onus_count": 15, "online_onus_count": 1, "average_signal": -24.69 }, { "board": "0", "pon_port": "4", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down  \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.2 dBm", "onus_count": 2, "online_onus_count": 0, "average_signal": 0 }, { "board": "0", "pon_port": "5", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.1 dBm", "onus_count": 0, "online_onus_count": 0, "average_signal": 0 }, { "board": "0", "pon_port": "6", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.3 dBm", "onus_count": 0, "online_onus_count": 0, "average_signal": 0 }, { "board": "0", "pon_port": "7", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down  \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.21 dBm", "onus_count": 0, "online_onus_count": 0, "average_signal": 0 }, { "board": "1", "pon_port": "0", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000  m", "tx_power": "5.18 dBm", "onus_count": 6, "online_onus_count": 5, "average_signal": -23.3 }, { "board": "1", "pon_port": "1", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5 dBm", "onus_count": 22, "online_onus_count": 19, "average_signal": -28.44 }, { "board": "1", "pon_port": "2", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down  \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.13 dBm", "onus_count": 1, "online_onus_count": 0, "average_signal": 0 }, { "board": "1", "pon_port": "3", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Down \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.09 dBm", "onus_count": 9, "online_onus_count": 0, "average_signal": 0 }, { "board": "1", "pon_port": "4", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up  \/  Autofind", "description": "", "min_range": "0 m", "max_range": "20000  m", "tx_power": "5.12 dBm", "onus_count": 34, "online_onus_count": 23, "average_signal": -26.37 }, { "board": "1", "pon_port": "5", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000 m", "tx_power": "5.12  dBm", "onus_count": 31, "online_onus_count": 24, "average_signal": -27.25 }, { "board": "1", "pon_port": "6", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up \/ Autofind", "description": "", "min_range": "0 m", "max_range": "20000  m", "tx_power": "5.17 dBm", "onus_count": 17, "online_onus_count": 15, "average_signal": -23.52 }, { "board": "1", "pon_port": "7", "pon_type": "GPON", "admin_status": "Enabled", "operational_status": "Up  \/ Autofind", "description": "", "min_range": "0  m", "max_range": "20000 m", "tx_power": "4.95 dBm", "onus_count": 9, "online_onus_count": 7, "average_signal": -20.79 }] }

  let data = [...respuesta.response]
  if (data.length > 0) return data.find(e => e.board == 0 && e.pon_port == 6).operational_status.split("/")[0]
  return "Estado Desconocido"
}
//return obtenerEstado()
//console.log(obtenerEstado())
/*window.onbeforeunload = preguntarAntesDeSalir;
function preguntarAntesDeSalir() {
  var respuesta;
  var bPreguntar = (JSON.parse(sessionStorage.getItem("CarritoTicket:")) != null && JSON.parse(sessionStorage.getItem("CarritoTicket:")).length > 0)
  if (bPreguntar) {
    respuesta = window.confirm('¿Seguro que quieres salir?');

    if (respuesta) {

      window.onunload = function () {
        alert("confirm")
        return true;
      }
    } else {
      return false;
    }
  }
}*/