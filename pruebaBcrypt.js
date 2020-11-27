const bcrypt = require ('bcryptjs')

const contrasena = '123456'

const contrasenaEncriptada = bcrypt.hashSync(contrasena)

console.log('contraseñaEncriptada',contrasenaEncriptada)//encriptar contraseña
//contraseñaEncriptada $2a$10$JCSVHTZsXjtfWudLrJXY3u4hebYD1.iHvBWAUfaVOB7Kogi00EtE6

const esValida = bcrypt.compareSync(contrasena, contrasenaEncriptada)//validar

console.log('¿ Es valida ?',esValida)
// ¿ Es valida ? true

/**
 * OPCION 1
 * 
 * const datosCliente = {
    username : solicitud.body.username,
    direction : solicitud.body.direction,
    phone : solicitud.body.phone,
    email : solicitud.body.email,
    password : bcrypt.hashSync(solicitud.body.password)
  }

  const nuevoCliente = new Cliente(datosCliente)

 * 
 * OPCION 2
 * 
 * 
  solicitud.body.password = bcrypt.hashSync(solicitud.body.password)

  console.log('solicitud', solicitud.body)

  respuesta.send('ok')
 * 
 * solicitud {
  username: 'Pepito',
  direction: 'Cali',
  phone: 85207419,
  email: 'sherko@gmail.com',
  password: '$2a$10$OxQvo845lZGx4cHaJbjdLOfa4IfIs6sH8h4x6NvbkiyjqcuNDyfLi'
}
 */

 /**
  * RELIZAR UNA COPIA SIN AFECTAR AL OTRO
  * 
  *   const datosCliente = {
    ...solicitud.body,
  }

  datosCliente.password = bcrypt.hashSync(solicitud.body.password)

  console.log('solicitud', solicitud.body)
  console.log('solicitud', datosCliente)

  respuesta.send('ok')

  TERMINAL

  solicitud {
  username: 'Paul',
  direction: 'Medellin',
  phone: 8552212591,
  email: 'carro1241@gmail.com',
  password: 'delfin'
}
solicitud {
  username: 'Paul',
  direction: 'Medellin',
  phone: 8552212591,
  email: 'carro1241@gmail.com',
  password: '$2a$10$mKqW/AZBaJg8/kcnUYzdtu5RsvpPElfRnDQomz858/iRMqf0ncuby'
}



//tome todas las propiedades en el body. password que la tome incrptada no como esta en el body y asi guardarla en la propiedad password
  const datosCliente = {
    ...solicitud.body,
    password : bcrypt.hashSync(solicitud.body.password)
  }
  */