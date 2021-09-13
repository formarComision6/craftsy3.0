const {productos} = require('../data/products_db');
const tutoriales = require('../data/tutorials_db');
const banner = require('../data/banner.json')

module.exports = {
    index : (req,res) => {
        return res.render('index',{
            title : "Craftsy 2.0",
            productos,
            nuevos,
            refact,
            usados,
            banner,
            tutoriales
        })
    }
}