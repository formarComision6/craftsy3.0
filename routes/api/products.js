var express = require('express');
var router = express.Router();

const { list,detail, create } = require('../../controllers/api/productsController');

/* endpoints: /api/products */
router 
    .get('/',list)
    .get('/:id',detail)
    .post('/',create)

module.exports = router;
