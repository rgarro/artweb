//INFO: funciones para enviar mail

const nodemailer = require("nodemailer")
const path = require("path")

const MailOptionsDflt = { //DFLT
	from: "Expertos en Arte",
	to: process.env.MAIL_RECEIVER,
	subject: "Expertos en Arte.org"
}


module.exports = {
  sendMail: async (a_mailOptions) => {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE, //ej. "personaimportante2022@gmail.com", 
      auth: {
        user: process.env.MAIL_USER, //ej. "personaimportante2022@gmail.com",
				pass: process.env.MAIL_PASS, //ej. 'dbyp vdsy kjqw ykwy',
      },
      tls: { rejectUnauthorized: false } //A: para evitar error self signed certificate
    })

    let mailOptions = {
			...MailOptionsDflt,
			...a_mailOptions, //A: pisamos los defaults con las que nos manden
    }

    console.log("MAIL enviando", mailOptions)
    try {
      //TEST: throw "test"
      await transporter.sendMail(mailOptions);
      console.log("MAIL enviado", mailOptions);
    }
    catch (ex) {
      console.log("MAIL error", ex);
     	throw ex; //A: que la maneje el caller 
		}

   	return true; 
  },
}

