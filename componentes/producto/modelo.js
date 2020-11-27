const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    image:{type: String, required: true},// se guarda una ruta http://localhost:2500/publico/fondo.jpg
    productName: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: false},
    category: {type: String, required: true},
}, {
    timestamps: true
})

//nombre de la coleccion y el esquema que creamos
const producto = mongoose.model('productos', productoSchema)

module.exports = producto