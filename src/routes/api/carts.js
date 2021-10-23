var express = require('express');
var router = express.Router();

const {show,add, remove,empty} = require('../../controllers/api/cartsController');

/* endpoints: /api/carts */
router 
    .get('/show',show)
    .get('/add/:id',add)
    .get('/remove/:id',remove)
    .get('/empty',empty);


module.exports = router;