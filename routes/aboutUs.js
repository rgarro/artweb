const express = require ('express') ;
const router = express.Router () ;
const aboutUsController = require ('../controllers/aboutUsController') ;

/* const cookieParser = require('cookie-parser')

router.use(cookieParser()) */



router.get ('/', aboutUsController.get) ;
router.get('/direcciones', aboutUsController.getDirecciones)
router.get('/nuestros-clientes', aboutUsController.getClientesNuestros)

module.exports = router