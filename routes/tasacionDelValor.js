const { Router } = require('express');
const express = require ('express') ;
const router = express.Router () ;
const tasacionController = require ('../controllers/tasacionController') ;



router.get ('/', tasacionController.get) ;


module.exports = router