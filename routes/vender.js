const express = require ('express') ;
const router = express.Router () ;
const venderController = require ('../controllers/venderController') ;



router.get("/", venderController.get);
router.get("/consejos", venderController.getConsejos)
router.get("/ayuda", venderController.getAyuda);
router.get("/venta-de-corretaje", venderController.getCorretaje);
router.get("/contrato-privado", venderController.getContrato);
router.get("/subastacion", venderController.getSubast);
router.get("/venta-online", venderController.getVentaOnline);



module.exports = router
