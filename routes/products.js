const express = require('express');
const router = express.Router();
const {add,detail, search,save,edit,update,remove} = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

/* validaciones */
const addProductValidator = require('../validations/addProductValidator');


/* middlewares */
const adminUserCheck = require('../middlewares/adminUserCheck');

/* subida de archivos */
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})

/* /products */
router.get('/add', add);
router.post('/add', upload.array('images'), addProductValidator,save);
router.get('/detail/:id',detail);
router.get('/search',search);
router.get('/edit/:id', edit);
router.put('/edit/:id',update);
router.delete('/remove/:id',remove);

module.exports = router;