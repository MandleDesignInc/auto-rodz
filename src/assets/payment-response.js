/*
function responseHandler(response) {
    if (response.messages.resultCode === 'Error') {
        var i = 0;
        while (i < response.messages.message.length) {
            console.log(
                response.messages.message[i].code + ': ' +
                response.messages.message[i].text
            );
            i = i + 1;
        }
        this.onPaymentResponse(response);
    } else {
        // paymentFormUpdate(response.opaqueData);
        console.log(response.opaqueData);
    }
}
*/

function responseHandler(response) {

    if (response.messages.resultCode === 'Error') {
        var i = 0;
        while (i < response.messages.message.length) {
            console.log(
                response.messages.message[i].code + ': ' +
                response.messages.message[i].text
            );
            i = i + 1;
        }

    } else {
        var responseEvent = new CustomEvent('payment-response', {'detail': {'response': response }});
        window.dispatchEvent(responseEvent);
    }
}