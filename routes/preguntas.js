const express = require ('express') ;
const router = express.Router () ;
const preguntasController = require ('../controllers/preguntasController') ;




router.get ('/',  preguntasController.get) ;


module.exports = router