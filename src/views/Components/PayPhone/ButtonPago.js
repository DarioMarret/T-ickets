
import React, { useEffect } from 'react';

function ButtonPago(props) {
    const { cargar } = props
    useEffect(() => {
        setTimeout(() => {
            CargarpayPhone()
        },900);
    }, [cargar])
    
    function CargarpayPhone(){
        window.onload = function () {
            payphone.Button({
                //token obtenido desde la consola de developer
                token: "ClbsdglI3cltzeMd6YzcAteTJBU9Zz0l9GzyP3d150TC-wUJkP764uFRXth2q6E2l5wpFpAlhfeVY7CvEoV7cIbYvkO2ZtY6GFw8WdNwXqp7ucrKzQeycHb3psDD1Km718mrCJwLNcpWT4svQq6Mfx48z7T9CNkg_9YaAgw9LfxM-oOaRIyGTucSyXciMLJQ9rKYhvG-KHj2cuatxqgZLCdiWNsPx5-1n9r3TkuXsvSAm0kZ75YSUAiJ4vjeJShy1Z7Qf2T8AkQBc-k7keInZbo1S6fSZcqmTF9AGB8cRml5zwD7O1M3zQkEHyhwBR97ZiLBw3tltOTyRzlJQb4BQBpUEEM",
                //PARÁMETROS DE CONFIGURACIÓN
                btnHorizontal: true,
                btnCard: true,
                createOrder: function (actions) {
                    //Se ingresan los datos de la transaccion ej. monto, impuestos, etc
                    return actions.prepare({
                        amount: 100,
                        amountWithoutTax: 100,
                        currency: "USD",
                        clientTransactionId: "prueba-locales_1"
                    });
                },
                onComplete: function (model, actions) {
                    //Se confirma el pago realizado
                    actions.confirm({
                        id: model.id,
                        clientTxId: model.clientTxId
                    }).then(function (value) {
                        //EN ESTA SECCIÓN SE RECIBE LA RESPUESTA Y SE MUESTRA AL USUARIO
                        if (value.transactionStatus == "Approved") {
                            alert("Pago " + value.transactionId + " recibido, estado " + value.transactionStatus);
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            }).render("#pp-button")
        }
    }

    return (
        <div>
            <div id="pp-button"></div>
        </div>
    )
}

export default ButtonPago;