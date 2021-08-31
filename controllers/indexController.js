const {productos} = require('../data/products_db');
const tutoriales = require('../data/tutorials_db');
const banner = require('../data/banner.json')

module.exports = {
    index : (req,res) => {
        return res.render('index',{
            title : "Craftsy 2.0",
            productos,
            nuevos : productos.filter(producto => producto.category === "nuevo"),
            refact : productos.filter(producto => producto.category === "refaccionado"),
            usados : productos.filter(producto => producto.category === "usado"),
            banner,
            tutoriales
        })
    }
}