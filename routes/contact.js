const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contactController")
const uploadFile = require("../middlewares/multer")
const deleteTimer = require("../middlewares/deleteTimer")
const expressValidator = require("../middlewares/express-validator")

router.get("/", deleteTimer, contactController.get)
router.post("/", expressValidator, uploadFile(), contactController.post)

module.exports = router
