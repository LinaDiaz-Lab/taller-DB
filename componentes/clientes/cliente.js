const express =  require('express')
const enrutador =  express.Router()// Se encarga de las rutas que se obtienen
const Cliente =  require('./modelo')
const { crearToken, middleAuthorization } = require('../../utilidades/autenticacion')
const bcrypt = require('bcryptjs')
const proyeccion =  ['username','direction','phone','email']

/**
 * Ruta para consultar todos los clientes
 * GET /clientes
 * @return Array
 * recordar colocarle el middleAuthorization
 */
enrutador.get('/' ,(solicitud, respuesta) => {
  Cliente.find(solicitud.query,(error, clientes) => {
    if (error) {
      respuesta.status(500).send(error)
    } else {
      respuesta.send(clientes)
    }
  })
}
)
/**
 * bucar algun cliente por id
 * GET /clientes/:id
 * @return object
 */
enrutador.get('/:id', middleAuthorization,(solicitud, respuesta) => {

  Cliente.findById(solicitud.params.id, proyeccion,  (error, customer) => {
    if (error !== null) {
      respuesta.status(500).send('There was a mistake searching information', error)
    } else {
      respuesta.send(customer)
    }
  })
})

/**
 * registrar algun cliente
 * POST /clientes
 * @return object
 *///despues utilizamos el middleware image
enrutador.post('/', (solicitud, respuesta) => {


  // antes de que se guarde la informacion lo que vamos a hacer es incriptar la informacion
 solicitud.body.password = bcrypt.hashSync(solicitud.body.password)

  // Registrando un solo cliente
  const nuevoCliente = new Cliente(solicitud.body)
//aqui es donde guardamos el documento
  nuevoCliente.save((error, clienteRegistrado) => {  
 
    if (error) {
      respuesta.status(422).send(error)
    } else {
      let cliente = clienteRegistrado.toObject()
      delete cliente.password
      respuesta.status(201).send(cliente)
    }
    })
  
})

/**
* Ruta para actualizar la información de un cliente
* PUT /clientes/:id
* @return Object Resultado de la operación
*/
enrutador.put('/:id',middleAuthorization, (solicitud, respuesta) => {
  //       lo que venga en el body lo convierte en un objeto 👇🏻
  Cliente.updateOne({ _id: solicitud.params.id }, solicitud.body, (error, resultado) => {

    if (error !== null) {
      respuesta.status(422).send(error)
    } else {
      respuesta.send(resultado)
    }
  })
})

/**
 * Ruta para eliminar un cliente de la base de datos
 * PUT /clientes/:id
 * @return Object Resultado de la operación
 */
enrutador.delete('/:id',middleAuthorization, (solicitud, respuesta) => {
  Cliente.findByIdAndDelete(solicitud.params.id, (error, resultado) => {

    if (error !== null) {
      respuesta.status(500).send(error)
    } else {
      respuesta.status(204).send()
    }
  })
})

/**
* Ruta para logear, especificamente para pedir la llave,token
* POST /clientes
* @return Object Resultado de la operación
se usa req.body porque se esta usando un metodo POST */
enrutador.post('/sign_in', (req, res) => {

  Cliente.findOne({ username: req.body.username },
    (error, user) => {
      if (error) {
        res.status(500).send(error)
      } else if (user && bcrypt.compareSync(req.body.password, user.password)){//comparar las dos contraseña, la que esta escribiendo yla que tienen guardada
        res.send({ jwt: crearToken(user) })
      } else {// cuando esta vacio, no se encontro
        res.status(401).send({ error: 'Your username or password is not valid' })
      }
    })
      
})

module.exports = enrutador

/*else if (user && bcrypt.compareSync(req.body.password, user.password)) {// si el cliente es encontrado, debemos devolver la llave
        const token = crearToken(user)//creamos un token en otro archivo llamado autenticacion
        res.send({ jwt: token })} */