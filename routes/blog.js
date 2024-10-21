const express = require ('express') ;
const router = express.Router () ;
const blogController = require ('../controllers/blogController') ;

/* const cookieParser = require('cookie-parser')

router.use(cookieParser()) */

/*router.get("/", (req, res) => {
    //res.send("hello");
    res.send(req.body);
});*/
router.get ('/', blogController.get) ;
//router.get ('/', aboutUsController.get) ;
//router.get('/direcciones', aboutUsController.getDirecciones)
//router.get('/nuestros-clientes', aboutUsController.getClientesNuestros)

module.exports = router