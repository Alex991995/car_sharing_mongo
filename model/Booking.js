const { Schema, SchemaTypes, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    finish_mileage: {
      type: SchemaTypes.Decimal128,
      require: true,
      min: 0,
      get: v => parseFloat(v.toString()),
    },
    finish_fuel_level: {
      type: SchemaTypes.Decimal128,
      require: true,
      min: 0,
      max: 100,
      get: v => parseFloat(v.toString()),
    },
    fk_car_id: {
      type: SchemaTypes.ObjectId,
      ref: 'Car',
      require: true,
    },
    fk_run_id: {
      type: SchemaTypes.ObjectId,
      ref: 'Run',
      require: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } },
);

module.exports = model('Booking', bookingSchema);
