const express = require ('express') ;
const router = express.Router () ;
const blogpostController = require ('../controllers/blogpostController') ;


router.get ('/', blogpostController.get) ;


module.exports = router