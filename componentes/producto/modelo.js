const mongoose = require('mongoose')

const ropaSchema = new mongoose.Schema({
    nombreProducto: String,
    marca: String,
    precio: Number
})

//nombre de la coleccion y el esquema que creamos
const producto = mongoose.model('productos', ropaSchema)

module.exports = producto
/*
const manyclothes =  [
    { nombreProducto: 'camisa', marca: 'Kenso' },
    { nombreProducto: 'pantalon', marca: 'Sevilla' },
    { nombreProducto: 'blusa', marca: 'Kenso' },
    { nombreProducto: 'falda', marca: 'Koaj' },
]

producto.insertMany(manyclothes, (error, productosRegistrados) => {
    console.log('error', error)
    console.log('productosRegistrados', productosRegistrados)
})
*/
