var express = require('express');
var router = express.Router();

const { list,detail, create, search } = require('../../controllers/api/productsController');

/* endpoints: /api/products */
router 
    .get('/',list)
    .get('/search',search)
    .get('/:id',detail)
    .post('/',create)

module.exports = router;
