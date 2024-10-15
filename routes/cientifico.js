const express = require ('express') ;
const router = express.Router () ;
const cientificoController = require ('../controllers/cientificoController') ;

router.get ('/',  cientificoController.get) ;
router.get ('/analisis-de-pigmentos',  cientificoController.getAnalisisPigmen) ;
router.get ('/analisis-del-papel',  cientificoController.getAnalisisPapel) ;
router.get ('/datacion-por-metales',  cientificoController.getDatMetales) ;
router.get ('/especies-de-madera',  cientificoController.getEspeciesMadera) ;
router.get ('/datacion',  cientificoController.getDatacion) ;
router.get ('/datacion-por-carbono',  cientificoController.getDataCarbo) ;
router.get ('/estudios-forenses',  cientificoController.getEstudiosFore) ;
router.get ('/firma',  cientificoController.getFirma) ;
router.get ('/firma-y-caligrafia',  cientificoController.getFirmaCali) ;
router.get ('/fotografia-especial',  cientificoController.getFotoEsp) ;
router.get ('/linguistica-forense',  cientificoController.getLinguistica) ;
router.get ('/montaje-de-bastidores',  cientificoController.getMontajeBasti) ;
router.get ('/paneles',  cientificoController.getPaneles) ;
router.get ('/pruebas-cientificas',  cientificoController.getPruebasCientificas) ;
router.get ('/rayos-x',  cientificoController.getRayosX) ;
router.get ('/sellos',  cientificoController.getSellos) ;
router.get ('/sellos-y-etiquetas',  cientificoController.getSellosEtiquetas) ;
router.get ('/sobre-la-datacion',  cientificoController.getSobreDatacion) ;
router.get ('/sobre-la-termoluminiscencia',  cientificoController.getTermo) ;
router.get ('/tablas',  cientificoController.getTablas) ;
router.get ('/tachuelas',  cientificoController.getTachuelas) ;


module.exports = router