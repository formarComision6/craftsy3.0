const db = require('../../database/models');
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = req => `${req.protocol}://${req.get('host')}`;
const {Op} = require('sequelize');
const fs = require('fs');

const throwError = (res,error) => {
    return res.status(error.status || 500).json({
        status : error.status || 500,
        message : error.message
    })
}

module.exports = {
    list : async (req,res) => {
        let offset = +req.query.limit * (+req.query.current - 1)
        try {
            const total = await db.Product.findAll()
            const products = await db.Product.findAll({
                limit : +req.query.limit || 10,
                offset : offset || 0,
                include : [
                    {association : 'category'}                ]
            })
            let response = {
                status : 200,
                meta : {
                    total : total.length,
                    url : getURL(req)
                },
                data : products
            }
            return res.status(200).json(response)
        } catch (error) {
           throwError(res,error)
        }
    },
    detail : async (req,res) =>{

        if(req.params.id % 1 != 0){
            return res.status(422).json({
                status : 422,
                message : 'ID incorrecto'
            })
        }

        try {
            const product = await db.Product.findByPk(req.params.id,{
                include : [
                    {association : 'images'},
                    {association : 'category'}
                ]
            })
            if(product){
                let response = {
                    status : 200,
                    meta : {
                        url : getURL(req)
                    },
                    data : product
                }
                return res.status(200).json(response)
            }else{
                const error = new Error('Producto inexistente')
                error.status = 400
                throw error
            }
         
        } catch (error) {
            throwError(res,error)
        }
    },
    create : async (req,res) => {
        console.log(req.body)
        try {
            const product = await db.Product.create({
                ...req.body,

            })
            let response = {
                status : 201,
                meta : {
                    url : getURLBase(req) + '/api/products/' + product.id
                },
                message : 'Producto agregado con éxito'
            }
            return res.status(201).json(response)
        } catch (error) {
            return res.status(400).json({
                status : 400,
                messages : error.errors.map(error => error.message)
            })
        }
    },
    search : async (req,res) => {
        console.log(req.query.keywords)
        try {
            let products = await db.Product.findAll({
                where : {
                    [Op.or] : [
                        {
                            name :  {
                                [Op.substring] : req.query.keywords
                            }
                        },
                        {
                            description : {
                                [Op.substring] : req.query.keywords
                            }
                        }
                    ]
                },
                include : ['images']
            })
            let response = {
                status : 200,
                meta : {
                    total : products.length,
                    url : getURL(req)
                },
                data : products
            }
            return res.status(200).json(response)
        } catch (error) {
            throwError(res,error)

        }
    },
    deleteImage : async (req,res) => {
        try {
            let image = await db.Image.findByPk(req.params.id);
            console.log(image)

            fs.existsSync(path.join(__dirname, '../../public/images/' +image.file)) ? fs.unlinkSync(path.join(__dirname, '../../public/images/' +image.file)) : null

            db.Image.destroy(
                {
                    where : {
                        id : req.params.id
                    }
                }
            ).then(async result => {
                console.log(result);
                let images = await db.Image.findAll({
                    where : {
                        productId : image.productId
                    }
                })
                console.log(images)
    
                let response = {
                    status : 200,
                    message : 'Imagen eliminada',
                    images
                }
                return res.status(201).json(response)
            })
          
        
        } catch (error) {
            return res.status(400).json({
                status : 400,
                message : error
            })
        }
    },
    addImage : async (req,res) => {
        console.log(req.files)
        try {
            let files = req.files.map(image => {
                let img = {
                    file : image.filename,
                    productId : req.params.id
                }
                return img
            })
            await db.Image.bulkCreate(files,{validate :  true})
            let images = await db.Image.findAll({
                where : {
                    productId : req.params.id
                }
            })
            let response = {
                status : 200,
                message : 'Imagenes agregadas',
                images
            }
            return res.status(201).json(response)
        } catch (error) {
            return res.status(400).json({
                status : 400,
                message : error
            })
        }
    },
}