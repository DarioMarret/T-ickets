import jsPDF from "jspdf"
export const index = {
    backgroundColor: "#311C7C"
}
export function logWithCallback(message, typo = "log") {
    if (true) return ""
    switch (typo) {
        case "error":
            console.error(message)
            break
        case "ingo":
            console.info(message)
            break
        case "warning":
            console.warn(message)
            break
        default:
            console.log(message)
            break
    }
}

export function GeneraComprobante(info) {
    const result2 = new Date().toLocaleString('en-GB', {
        hour12: false,
    });
    var opciones = {
        format: [69, 140]
    };
    var doc = new jsPDF(opciones)
    doc.setFontSize(7);
    doc.text(12, 3, 'T-ICKETS (TICKETSECUADOR S.A.)');
    doc.text(20, 12, 'RUC 0993377293001');
    doc.text(15, 15, 'Edifico City Officce Oficina 310');
    doc.text(3, 18, 'Fecha:' + result2);
    doc.text(3, 21, '*******************************************************************');
    doc.text(25, 23, 'DESCRIPCIÓN');
    doc.text(3, 26, '*******************************************************************');
    doc.text(3, 29, "Evento: " + info.concierto[0].nombreConcierto);
    let num = 29
    info.concierto.forEach(function (val, index) {
        num = num + 5
        doc.text(3, num, "Localidad:" + val.localidad_nombre)
        doc.text(50, num, "Cantidad:" + val.cantidad)
    })
    // doc.text(3, 34, "Boletos:" + sumaCantidad);
    // doc.text(3, 38, "facturación del " + descri.factura.emitido + " " + descri.factura.vencimiento);

    //nombres.info_concierto[nombreConcierto]

    doc.text(3, 49, "*******************************************************************");
    //doc.text(35, 54, "DESCUENTO $0.00");
    doc.text(40, 58, "TOTAL: " + (parseFloat(info.valores.total)).toFixed(2));
    doc.text(40, 62, "SALDO: $0.00");
    doc.text(3, 65, "*******************************************************************");
    doc.text(4, 69, "CLIENTE")
    doc.text(3, 73, "Nombres: " + info.nombreCompleto ?? '')
    doc.text(3, 76, "Correo: " + info.email ?? '')
    doc.text(3, 79, "Cédula: " + info.cedula ?? '')
    doc.text(3, 84, "Fecha registro: " + result2)
    doc.text(3, 88, "*******************************************************************");
    // doc.text(3, 94, "Operador " + nombres.usuario);
    doc.text(3, 92, "Impresión:" + result2);
    doc.text(3, 95, "*******************************************************************");
    if (info.forma_pago == "Tarjeta") {
        doc.text(25, 95, "Información de tarjeta ");
        doc.text(35, 105, "Forma de pago: " + info.forma_pago);
        doc.text(3, 125, "*******************************************************************");
        doc.text(25, 130, "Recibí conforme:")
        doc.text(20, 135, "_____________________")
    } else if (info.forma_pago == "Deposito") {
        doc.text(35, 105, "Forma de pago: " + info.forma_pago);
        doc.text(3, 110, "*******************************************************************");
        doc.text(25, 115, "Recibí conforme:")
        doc.text(20, 120, "_____________________")
    } else {
        doc.text(3, 100, "Forma de pago: " + info.forma_pago);
        doc.text(3, 105, "*******************************************************************");
        doc.text(25, 110, "Recibí conforme:")
        doc.text(20, 115, "_____________________")
    }

    $.confirm({
        title: 'Imprimir recibo',
        content: '¿Deseas imprimir recibo en una nueva ventana?',
        buttons: {
            confirmar: {
                text: 'Sí',
                btnClass: 'btn-blue',
                action: function () {
                    doc.output('dataurlnewwindow');
                }
            },
            cancelar: {
                text: 'No',
                action: function () {
                    // Nada, solo se cierra
                }
            }
        }
    });
}