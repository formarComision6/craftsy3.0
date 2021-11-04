var express = require('express');
var router = express.Router();

const upload = require('../../middlewares/upImagesProduct')


const { list,detail, create, search, deleteImage, addImage } = require('../../controllers/api/productsController');

/* endpoints: /api/products */
router 
    .get('/',list)
    .get('/search',search)
    .get('/:id',detail)
    .post('/',create)
    .get('/delete-image/:id',deleteImage)
    .post('/add-images/:id',upload.any(), addImage)

module.exports = router;
