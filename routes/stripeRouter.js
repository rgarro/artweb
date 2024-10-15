const express = require ('express') ;
const router = express.Router () ;
const stripeController = require ('../controllers/stripeController') ;

router.get ('/', stripeController.get) ;
router.post('/save', stripeController.save);

module.exports = router
