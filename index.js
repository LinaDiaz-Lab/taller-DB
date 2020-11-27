const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tienda_ropa', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( 'we are connected!')
});

//rutas
const rutaCliente = require('./componentes/clientes/cliente')
const rutaProducto = require('./componentes/producto/producto')
const rutaVenta = require('./componentes/sale/sale')

app.use(cors())
// Middleware para leer datos JSON desde el body de la peticion
app.use(bodyParser.json())


//productos
app.use('/productos', rutaProducto)
//clientes
app.use('/clientes', rutaCliente)
//ventas
app.use('/ventas', rutaVenta)

//me dara acceso a todo lo que haya en la carpeta imagenes, solo archivos estaticos
// Configuro una ruta y una carpeta para servicios archivos estaticos
app.use('/image', express.static('foto'))

app.listen(2500, () => {
    console.log('The serve is working!')
})