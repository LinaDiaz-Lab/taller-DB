const express =  require('express')
const enrutador =  express.Router()// Se encarga de las rutas que se obtienen
const Sale=  require('./modelo')
const { actualUser, middleAuthorization } = require('../../utilidades/autenticacion')

/**
 * Ruta para consultar todos los ventas
 * GET /ventas
 * @return Array Listado de ventas del cliente actual
 */
enrutador.get('/', middleAuthorization, (solicitud, respuesta) => {
    // Creo mi propio objeto {} para filtrar las ventas
    Sale.find((error, salesFromTheUser) => {
      if (error) {
        respuesta.status(500).send(error)
      } else {
        respuesta.send(salesFromTheUser)
      }
    })
  })
  
  /**
   * Ruta para consultar un venta por su ID
   * GET /ventas/:id
   * @return Object Documento de la Venta Consultada
   */
  enrutador.get('/:id', middleAuthorization, (solicitud, respuesta) => {
    // Creo mi propio objeto {} para filtrar las ventas
    const filtros = {
      _id: solicitud.params.id,
      idUser: actualUser(solicitud.headers.authorization).id // Consulto el ID del usuario autenticado para garantizar que la venta solo sea devuelta si pertenece al usuario autenticado
    }
  
    Sale.findOne(filtros, (error, foundSale) => {
      if (error) {
        respuesta.status(500).send(error)
      } else {
        respuesta.send(foundSale)
      }
    })
  })
  
  /**
   * Ruta para crear un nuevo venta
   * POST /sales
   */
  enrutador.post('/', (solicitud, respuesta) => {
    // Registrando un solo venta
    const newSale = new Sale(solicitud.body)
    //newSale.idUser = actualUser(solicitud.headers.authorization).id
    newSale.save((error,  registeredSale) => {
  
      if (error) {
        respuesta.send(error)
      } else {
        respuesta.send(registeredSale)
      }
    })
  })

module.exports = enrutador