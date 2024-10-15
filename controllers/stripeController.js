const StripeAcc= process.env.STRIPE_ACC;
const StripeBrowserKey= process.env.STRIPE_BROWSER_KEY;
const StripeServerKey= process.env.STRIPE_SERVER_KEY;

const stripe = require("stripe")(StripeServerKey);

const mail= require('../lib/mail');

module.exports = {
	get: (req, res) => {
		const viewData = { baseURL: "", StripeAcc, StripeBrowserKey };
		res.render("tarifas", viewData)
	},

	save: async (req, res) => {  //A: procesar y guardar los datos de un pago
		//VER: https://stripe.com/docs/payments/accept-a-payment-charges?platform=web#web-create-charge
		console.log("PAGO RECIBIDO", req.body);

		const token = req.body.stripeToken; 
		let charge= {status: "ERROR"}

		let amount = Number(req.body.amount).toFixed(0) * 100;
		try {
			charge = await stripe.charges.create({
				amount: amount,
				currency: 'usd',
				description: `${process.env.YOUR_DOMAIN} ${req.body.email}`, 
				source: token,
			});
		} catch (ex) {
			console.log("PAGO ERROR procesando", ex, req.body);
			res.json({status: "error"})
			return
		}

		console.log("PAGO PROCESADO", charge, req.body);

		try {
			await mail.sendMail({
				text: JSON.stringify({...req.body, receipt: charge.receipt_url}, null,1),
				subject: `Pago recibido ${process.env.YOUR_DOMAIN} ${req.body.email}`, 
			});
		} catch (ex) {
			console.log("PAGO error informando mail",ex)
		}

		res.json({status: "success"})
	},

	/* FLUJO NUEVO recomendado por stripe, no estamos usando
	post: async (req, res) => {
		try {

			let amount = Number(req.body.amount).toFixed(0) * 100;

			const paymentIntent = await stripe.paymentIntents.create({ // intento de pago con tarjeta
				amount: amount,
				currency: "usd",
				payment_method_types: ["card"]
			});

			console.log("PaymentIntent:", paymentIntent)
			res.send({
				clientSecret: paymentIntent.client_secret,
			});

		} catch (err) { res.status(400).json({ error: { message: err.message } }) }

	},

	pubkey:	(req, res) => {  // ENDPOINT PARA OBTENER LA CLAVE PÚBLICA STRIPE
		res.json({ publishableKey: StripeBrowserKey });
	},
	*/

	/* TODO:LIMPIAR
	cancel: (req, res) => {
		const viewData = { baseURL: "" };
		res.status(202).render("cancel", viewData)
	},
	success: (req, res) => {
		const viewData = { baseURL: "" };
		res.status(202).render("success", viewData)
	},
	*/
}

