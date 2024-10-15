const express = require ('express') ;
const router = express.Router () ;
const authController = require ('../controllers/authController') ;




router.get ('/',  authController.get) ;
router.get ('/analisis',  authController.getAnalisis) ;
router.get ('/biografica',  authController.getBio) ;
router.get ('/casos-dificiles',  authController.getCasosDificiles) ;
router.get ('/certificacion-coa',  authController.getCertificacion) ;
router.get ('/documental',  authController.getDocumental) ;
router.get ('/examinacion',  authController.getExaminacion) ;
router.get ('/investigacion',  authController.getInves) ;
router.get ('/revision-del-rechazo',  authController.getReviRechazo) ;
router.get ('/robos',  authController.getRobos) ;
router.get("/atribucion", authController.getAtribucion)
router.get("/origen", authController.getOrigen)


module.exports = router