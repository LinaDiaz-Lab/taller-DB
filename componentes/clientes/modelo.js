const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//const proyeccion = ['username','direction','phone','email']

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    direction: { type: String, required: true},
    phone: { type: Number, required: true},
    email: { type: String, required: false},
    password: { type: String, required: true, unique: true}
},{
    timestamps: true //'createdAT' 'updatedAt'
})

//mongoose-unique-validator
userSchema.plugin(uniqueValidator)
//nombre de la coleccion y el esquema que creamos
const customer = mongoose.model('users', userSchema)

//module.exports = { customer, proyeccion}
module.exports = customer

/*const manyusers =  [{username:'Piarmide',direction: 'Nevada', phone: 32871772, email: 'ftjrtkgbt@gmail.com', password: 'hlkvtjtbt'},
{username:'Freedom',direction: 'Sao Pablo', phone: 346589653, email: 'jfjhekgvbj@gmail.com', password: 'eegkjgjnw'},{username:'Han',direction: 'Seul', phone: 346976543, email: 'sdhkjhgfd@gmail.com', password: 'xcvbnmd2'}]

customer.insertMany(manyusers, (error, clientesRegistrados) => {
    console.log('error', error)
    console.log('clientesRegistrados', clientesRegistrados)
})*/