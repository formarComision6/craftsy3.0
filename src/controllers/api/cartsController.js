const db = require('../../database/models');
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;

module.exports = {
    show : (req, res) => {
        let response = {
            meta : {
                link : getURL(req)
            },
            data : req.session.cart
        }
        res.status(200).json(response)
            
    },
    add : async (req,res) => {
        try {
            let product = await db.Product.findByPk(req.params.id,{
                include : ['category', 'images']
            })
            
            let order  = await db.Order.findOne({
                where : {
                    userId : req.session.userLogin.id,
                    status : 'pending'
                }
            })

            let item = {
                id : product.id,
                nombre: product.name,
                imagen : product.images[0].file,
                categoria : product.category.name,
                cantidad : 1,
                precio : product.price,
                total : product.price,
                orderId : order.id
            }
            req.session.cart.push(item)

            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)

            return res.status(500).json(error)
        }
    }
}