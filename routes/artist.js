const express = require ('express') ;
const router = express.Router () ;
const artistController = require ('../controllers/artistController') ;

/* const cookieParser = require('cookie-parser')

router.use(cookieParser()) */



router.get ('/', artistController.get) ;
router.get('/search/', artistController.search)
router.get("/filter/" , artistController.filterleter)

router.get('/:id',artistController.getOne)

module.exports = router