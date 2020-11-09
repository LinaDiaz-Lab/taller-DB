const express = require('express')
const enrutador = express.Router()// Se encarga de las rutas que se obtienen
const st = require('./modelo')

  /**
   * consultar algun producto
   * GET /clientes
   * @return object
   */
enrutador.get('/', (solicitud, respuesta) => {
    st.find((error,customer) => {
        if (error) {
            respuesta.status(500).send('There was a mistake searching for products information',error)
        } else {
            respuesta.send(customer)
        }
    })
})

  /**
   * registrar algun producto
   * POST /clientes
   * @return object
   */
enrutador.post('/', () => {
    st.find((error,customer) => {
        if (error) {
            respuesta.status(500).send('There was a mistake searching for products information',error)
        } else {
            respuesta.send(customer)
        }
    })
})

  /**
   * eliminar algun producto
   * DELETE /clientes
   * @return object
   */
enrutador.delete('/', (solicitud, respuesta) => {
    respuesta.send('There was eliminated a product')
})

module.exports = enrutador