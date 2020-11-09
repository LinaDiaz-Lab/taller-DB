const express = require('express')
const app = express()
const rutaCliente = require('./componentes/clientes/cliente')
const modeloCliente = require('./componentes/clientes/modelo')
const rutaProducto = require('./componentes/producto/producto')
const modeloProducto = require('./componentes/producto/modelo')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tienda_ropa', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( 'we are connected!')
});

//productos
app.use('/productos', rutaProducto)
//clientes
app.use('/clientes', rutaCliente)

app.listen(2500, () => {
    console.log('The serve is working!')
})