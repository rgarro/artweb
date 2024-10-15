const mail= require('../lib/mail');

const db = require("../database/models")
const Op = db.Sequelize.Op
const path = require("path")
const { validationResult } = require("express-validator")

const filenameValidationRegex = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$|([<>:"\/\\|?*])|(\.|\s)$/gi

module.exports = {
  get: (req, res) => {
    res.status(202).render("contact")
  },

  post: async (req, res) => {
    const viewData = { baseURL: "", errores: "desconocido" } //DFLT

    const errors = await validationResult(req);

    if (errors.isEmpty()) {

    } else { 
      res.render("mail-result", viewData)
    }

    const images = req.files
    const attach = [];
    const enlaces = [];

    await images.forEach((imagen) => {
      //TODO: seguridad sanitizar  o formar file name
      if (!imagen.filename.match(filenameValidationRegex)) {
        // throw new Error("Filename not valid")
      }
      let url = new URL(path.join("../public/files/" + imagen.filename), process.env.YOUR_DOMAIN).toString();

      enlaces.push(url)


      attach.push({
        filename: imagen.originalname,
        path: path.join(__dirname, "../public/files/" + imagen.filename),
        content: "img",
      })
    })

    const imagenesLink = enlaces.map(i => {
      return `<li><a href=${i}>${i} </a></li>`

    }).join("")

    let mailOptions = {
      from: "Expertos en Arte",
      to: process.env.MAIL_RECEIVER,
      subject: "Expertos en Arte.org",
      html: `<h1>Consulta de ExpertosenArte.org ${req.body.name} .</h1><h2>Nombre : ${req.body.name}</h2>
   <ul>${imagenesLink}</ul>
      <h2>Mail: ${req.body.email} </h2><h3> ${req.body.text} </h3>`,
      attachments: attach,
    }

    console.log("contacto enlaces: ", enlaces)


    console.log("contacto enviando mail")
    try {
      //TEST: throw "test"
      await mail.sendMail(mailOptions);
      console.log("contacto enviado");
    }
    catch (ex) {
      console.log("contacto error", ex);
      res.render("mail-result", viewData);
      return
    }

    res.render("mail-result", {...viewData, errores: null });
  },
}

