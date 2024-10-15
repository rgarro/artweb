var style = {
	base: {
		fontWeight: 400,
		fontFamily: 'Arial',
		fontSize: '16px',
		lineHeight: '1.4',
		color: '#605E5E',
		borderStyle: 'solid',
		borderColor: '#ccc',
		backgroundColor: '#white',
		borderRadius: '4px',
		padding: '16px',
		'::placeholder': {
			color: '#888',
		},
	},
	invalid: {
		color: '#eb1c26',
	}
};

stripe = Stripe(StripeBrowserKey);
elements = stripe.elements();

var cardElement = elements.create('cardNumber', {
	classes: { base: 'cc_number', focus: 'cc_number_focus' },
	style: style
});
cardElement.mount('#card_number');

var exp = elements.create('cardExpiry', { 'style': style });
exp.mount('#card_expiry');

var cvc = elements.create('cardCvc', { 'style': style });
cvc.mount('#card_cvc');

// Validate input of the card elements
var resultContainer = document.querySelector('#paymentResponse');
cardElement.addEventListener('change', function (event) {
	if (event.error) {
		console.log('card error',event.error)
		resultContainer.innerHTML = '<span class="text-red-400">' + (event.error.message|'') + '</span>';
	} else {
		resultContainer.innerHTML = '';
	}
});

var form = document.querySelector('#paymentFrm');

// Create a token when the form is submitted.
form.addEventListener('submit', function (e) {
	e.preventDefault();
	createToken();
});

// Create single-use token to charge the user
function createToken() {
	const formData= new FormData(form)
	//VER: https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement#stripe_create_token-data
	const data= {
		name: formData.get('name')+' '+formData.get('surname'),
	}
	console.log("> Create Token with data", data);

	stripe.createToken(cardElement, data).then(function (result) {

		console.log('> Create Token...',result)
		if (result.error) {
			// Inform the user if there was an error
			resultContainer.innerHTML = '<p>' + (result.error.message||'') + '</p>';
			console.log('> Token ERROR!', result)
		} else {
			console.log('> Token SUCCESS!', result)
			resultContainer.innerHTML = '<p>' + (result.message || '') + '</p>';
			document.getElementById('show-pay-text').classList.add('hidden')
			document.getElementById('lds-circle').classList.remove('hidden')

			// disblae the pay no button
			document.getElementById('payNowBtn').disabled = true;
			// Send the token to your server
			handleSubmit(result.token);
		}
	});
}

async function handleSubmit(token) {
	console.log('> Token received')
	console.log(token);

	const xmlhttp = ajaxReq();
	const url = '/payment/save';

	// add new fields
	const hiddenInput = document.createElement('input');
	hiddenInput.setAttribute('type', 'hidden');
	hiddenInput.setAttribute('name', 'stripeToken');
	hiddenInput.setAttribute('value', token.id);
	form.appendChild(hiddenInput);

	console.log(form)

	const params  = new URLSearchParams(new FormData(form)).toString();

	console.log("SAVE PARAMS", params)
	xmlhttp.open('POST', url, true); // set true for async, false for sync request
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.send(params); // or null, if no parameters are passed

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			try {
				const obj = JSON.parse(xmlhttp.responseText);

				console.log('> PAYMENT accepted with')
				console.log(obj)
				console.log('> PAYMENT '+obj.status)
				if(obj.status==='success'){

					document.getElementById('success').classList.remove('hidden');
					document.getElementById('paymentFrm').classList.add('hidden');
					document.getElementById('success_msg').innerHTML = '<p class="text-green-800 text-xs p-2 text-center">' + (obj.message||'') + '</p>';
					// TODO REDIRECT
				} else {

					document.getElementById('payment-message').classList.remove('hidden');
					if (obj.message)   document.getElementById('payment-message').innerHTML = '<p class="text-red-800 text-xs p-2 text-center">' + (obj.message||'') + '</p>';

				}
				document.getElementById('lds-circle').classList.add('hidden')


			} catch (error) {
				console.log('> PAYMENT ERROR !')
				console.log(error)
				document.getElementById('lds-circle').classList.add('hidden')
				resultContainer.innerHTML = '<p class="text-reed-400">' + (error.message || '')+ '</p>';
				throw Error;
			}
		}
	}
}

function ajaxReq() {
	if (window.XMLHttpRequest) { return new XMLHttpRequest(); } 
	else if (window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); } 

	alert("Browser does not support XMLHTTP.");
	return false;
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31
		&& (charCode < 48 || charCode > 57))
		return false;

	return true;
}

