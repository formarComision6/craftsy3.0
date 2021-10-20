var express = require('express');
var router = express.Router();

const {show,add} = require('../../controllers/api/cartsController');

/* endpoints: /api/carts */
router 
    .get('/show',show)
    .get('/add/:id',add)


module.exports = router;