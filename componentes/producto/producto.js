const express = require('express')
const enrutador = express.Router()// Se encarga de las rutas que se obtienen
const st = require('./modelo')

  /**
   * consultar algun producto
   * GET /productos
   * @return object
   */
enrutador.get('/', (solicitud, respuesta) => {
    st.find((error,product) => {
        if (error) {
            respuesta.status(500).send('There was a mistake searching for products information',error)
        } else {
            respuesta.send(product)
        }
    })
})

  /**
   * registrar algun producto
   * POST /productos
   * @return object
   */
enrutador.post('/', () => {
    st.find((error,product) => {
        if (error) {
            respuesta.status(500).send('There was a mistake searching for products information',error)
        } else {
            respuesta.send(product)
        }
    })
})

  /**
   * eliminar algun producto
   * DELETE /productos
   * @return object
   */
enrutador.delete('/', (solicitud, respuesta) => {
    respuesta.send('There was eliminated a product')
})

module.exports = enrutador
