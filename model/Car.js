const { Schema, SchemaTypes, model } = require('mongoose');

const carSchema = new Schema(
  {
    registration_number: {
      type: String,
      maxLength: 20,
      require: true,
      unique: true,
    },
    brand: {
      type: String,
      maxLength: 50,
      require: true,
    },
    vin: {
      type: String,
      maxLength: 17,
      require: true,
      minLength: 17,
      maxLength: 17,
    },
    model: {
      type: String,
      maxLength: 50,
      require: true,
    },
    production_date: {
      type: Date,
      default: new Date(),
    },
    fuel_level: {
      type: SchemaTypes.Decimal128,
      require: true,
      get: v => parseFloat(v.toString()),
    },
    mileage: {
      type: Number,
      require: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Free', 'Reserved', 'In use', 'Unavailable', 'In Service'],
      default: 'Free',
    },
    geo_latitude: {
      type: SchemaTypes.Decimal128,
      require: true,
      min: -90,
      max: 90,
      get: v => parseFloat(v.toString()),
    },
    geo_longitude: {
      type: SchemaTypes.Decimal128,
      require: true,
      min: -180,
      max: 180,
      get: v => parseFloat(v.toString()),
    },
    fk_run_id: {
      type: SchemaTypes.ObjectId,
      require: true,
      ref: 'Run',
    },
  },
  { timestamps: true, toJSON: { getters: true } },
);

module.exports = model('Car', carSchema);
