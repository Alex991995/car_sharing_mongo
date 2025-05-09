const { Schema, SchemaTypes, model } = require('mongoose');

const runSchema = new Schema({
  start_date: {
    type: Date
  },
  start_fuel_level:{
    type: String
  },
  start_mileage: {
    type: Number
  },
  fk_driver_id: {
    type: SchemaTypes.ObjectId,
    ref: 'Driver',
    require: true
  }

}, {timestamps: true})

runSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})



module.exports = model('Run', runSchema);
