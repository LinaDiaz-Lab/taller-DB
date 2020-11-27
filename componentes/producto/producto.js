const express = require('express')
const enrutador = express.Router()// Se encarga de las rutas que se obtienen
const producto = require('./modelo')
const multer =  require('multer')// importamos
const middleimage =  multer({ dest: 'foto/'})// creamos un middle ware
  /**
   * consultar algun producto
   * GET /productos
   * @return object
   */
enrutador.get('/', (solicitud, respuesta) => {
    producto.find(solicitud.query, (error,product) => {
        if (error) {
            respuesta.status(500).send('There was a mistake searching for products information',error)
        } else {
            respuesta.send(product)
        }
    })
})

/**
 * Ruta para consultar un producto por su ID
 * GET /libros/:id
 */
enrutador.get('/:id', (solicitud, respuesta) => {
    producto.findOne({ _id: solicitud.params.id }, (error, product) => {
      if (error) {
        respuesta.status(500).send(error)
      } else {
        respuesta.send(product)
      }
    })
  })

/**
 * registrar algun producto
 * POST /productos
 * @return object
 *///despues utilizamos el middleware image
 enrutador.post('/',middleimage.single('image'), (solicitud, respuesta) => {

    // Registrando un solo producto
    const nuevoProducto = new producto(solicitud.body)
    //host => localhost:2500 
    if (solicitud.file) {
      nuevoProducto.image = `${solicitud.protocol}://${solicitud.get('host')}/${solicitud.file.destination}${solicitud.file.filename}`
    }
   //aqui es donde guardamos el documento
    nuevoProducto.save((error, productoRegistrado) => {
  
      if (error !== null) {
        respuesta.status(422).send(error)
      } else {
        respuesta.status(201).send(productoRegistrado)
      }
    })
  })

  /**
 * Ruta para actualizar la información de un producto
 * PUT /productos/:id
 */
enrutador.put('/:id', (solicitud, respuesta) => {
    producto.updateOne({ _id: solicitud.params.id }, solicitud.body, (error, resultado) => {
  
      if (error) {
        respuesta.status(422).send(error)
      } else {
        respuesta.send(resultado)
      }
    })
  })

/**
 * Ruta para eliminar un producto
 * DELETE /productos/:id
 * @return String Mensaje de confirmación
 */
enrutador.delete('/:id', (solicitud, respuesta) => {
    producto.findByIdAndDelete(solicitud.params.id, (error, resultado) => {
  
      if (error) {
        respuesta.status(500).send(error)
      } else {
        respuesta.status(204).send()
      }
  
    })
  })


module.exports = enrutador
