const express = require ('express') ;
const router = express.Router () ;
const indexController = require ('../controllers/indexController') ;
const uploadFile = require('../middlewares/multer'); 
/* const cookieParser = require('cookie-parser')

router.use(cookieParser()) */



router.get ('/', uploadFile(), indexController.get) ;


module.exports = router