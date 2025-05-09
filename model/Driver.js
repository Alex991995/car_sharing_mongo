const { Schema, SchemaTypes, model } = require('mongoose');

const driverSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    license_number: {
      type: String,
      require: true,
      maxLength: 20,
    },
    fk_card_id: {
      type: SchemaTypes.ObjectId,
      ref: 'Credit_card',
      require: true
    }
  },
  { timestamps: true },
);

driverSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = model('Driver', driverSchema);
