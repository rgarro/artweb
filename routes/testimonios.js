const express = require ('express') ;
const router = express.Router () ;
const testimoniosController = require ('../controllers/testimoniosController') ;




router.get ('/',  testimoniosController.get) ;


module.exports = router