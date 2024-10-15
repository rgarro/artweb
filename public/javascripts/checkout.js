document.addEventListener("DOMContentLoaded", async () => {

	spinnerEl= document.querySelector("#spinner");
	formEl= document.querySelector("#payment-form-in");
	stripeEl= document.querySelector("#payment-element");
	montoEl= document.querySelector("#amount");
	montoEditarEl= document.querySelector("#amount_edit");
	montoPrepararEl= document.querySelector("#amount_prepare");
	enviarPagoEl= document.querySelector("#enviar_pago");
	datosPagoEl= document.querySelector("#datos_pago");

	montoPrepararEl.addEventListener("click", prepararPago);
	montoEditarEl.addEventListener("click", editarPago);
	enviarPagoEl.addEventListener("click", enviarPago);

	
  const stripe = Stripe(StripeBrowserKey, {
    stripeAccount: StripeAcc,
  }); 

  let elements;

  let NoHayPagoPendiente= await checkStatus();
	console.log("NoHayPagoPendiente",NoHayPagoPendiente);
	if (NoHayPagoPendiente) {
		formEl.classList.remove("hidden");
	}

	function editarPago() {
		montoEl.removeAttribute("readonly")
		montoPrepararEl.classList.remove("hidden") //TODO: ojo cuando carga la pagina para status
		montoEditarEl.classList.add("hidden")
		datosPagoEl.classList.add("hidden")
	}
	
  async function prepararPago(e) {
    e.preventDefault();

		montoError= "El monto no es válido" //DFLT

    const montoStr = montoEl.value; //A: leer monto del input
    console.log("ItemCrear montoStr", montoStr)

		try { 
			monto= Number(montoStr); 
			if (monto>0) { //A: es un monto ok
				montoError= null
			}
		}
		catch (ex) { 
			console.log("ItemCrear ERROR monto",montoStr, ex) 
			montoError= ex+"" //TODO: poner un mensaje lindo
		}

		if (montoError) {
			//TODO: mostrar al usuario
			alert("Error monto: "+montoError);
			return;
		}

		//A: tenemos un monto valido
		itemError= "No se pudo crear item"
    setLoading(true);
		let itemData;
		try {
						const response = await fetch("/payment", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ amount: monto }),
						});

						itemData  = await response.json();

						console.log("ItemCrear clientSecret:", itemData.clientSecret)
						if (itemData.clientSecret) {
							itemError= null;
						}
		} catch(ex) {
			itemError= ex;
		}
    setLoading(false);

		if (itemError) {
			alert("Error creando item "+itemError);
			return;
		}

		//A: tenemos monto e item validos
		setLoading(true);
    const appearance = { theme: 'flat', };
    elements = stripe.elements({ appearance, clientSecret: itemData.clientSecret });

		stripeEl.innerHTML=""
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

		montoEl.setAttribute("readonly",true)
		montoPrepararEl.classList.add("hidden") //TODO: ojo cuando carga la pagina para status
		montoEditarEl.classList.remove("hidden")
		datosPagoEl.classList.remove("hidden")

		let timer= setInterval(() => {
			let c= document.querySelector("#Field-countryInput"); 
			if (c) {
				console.log("wait for stripe");
			} else {
				clearInterval(timer);
				setLoading(false); //TODO: arreglar setLoading
				console.log("wait for stripe: ready", c);
			}
		},500);
  }

  async function enviarPago(e) { //A: ya puso los datos de tarjeta
    e.preventDefault();

    setLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location}#success`
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
      } else {
        showMessage("An unexpected error occurred.");
      }
      setLoading(false);
    } catch(ex) {
      console.log("enviarPago error:", ex)
			//TODO: avisar a usuario?
      setLoading(false);
    }
} 

  // Fetches the payment intent status after payment submission
  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log("Check Status:", clientSecret )

    if (!clientSecret) { return true; }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    console.log("Check Status, Intent:", paymentIntent )
		//TODO: mostrar el amount y el id del paymentIntent
    switch (paymentIntent.status) {
      case "succeeded":
        showMessage("Pago realizado! "+paymentIntent.currency+(paymentIntent.amount/100)+" id:"+paymentIntent.id);
        break;
      case "processing":
        showMessage("Su pago se está procesando "+" id:"+paymentIntent.id);
        break;
      case "requires_payment_method":
        showMessage("No se pudo completar su pago. Por favor intente nuevamente.");
        break;
      default:
        showMessage("Algo anduvo mal.");
        break;
    }
		
  }

  // ------- UI helpers -------

  function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

  /*  setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageText.textContent = "";
    }, 4000);*/
  }

  // Show a spinner on payment submission
  function setLoading(isLoading) {
    if (isLoading) {
			//TODO: enmascarar el form?
      spinnerEl.classList.remove("hidden");
    } else {
      spinnerEl.classList.add("hidden");
    }
  }

})
