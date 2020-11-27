const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Detail = new Schema({
    idProduct: { type: Schema.Types.ObjectId, required: true, ref: 'productos' },
    productName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 1 }
  })
  
  const saleSchema = new Schema({
    total: { type: Number, required: true },
    idUser: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    details: {
      type: [Detail],
      required: false,
      validate: {
        validator: function (v) {
          console.log('v ', v)
          console.log('validation ', Array.isArray(v) && v.length > 0)
          return Array.isArray(v) && v.length > 0
        },
        message: props => 'El detalle no puede venir vacío'
      }
    }
  }, {
    timestamps: true
  })
  
  const Sale = mongoose.model('sales', saleSchema)
  
  module.exports = Sale
