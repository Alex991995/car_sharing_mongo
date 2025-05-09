const { Schema, model } = require('mongoose');


const creditCardSchema = new Schema(
  {
    card_number: {
      type: Number,
      require: true,
      min: 1000000000000000,
      max: 9999999999999999n
    },
    card_holder: {
      type: String,
      require: true,
    },
    card_valid: {
      type: Date,
      default: Date.now(),
      require: true,
    },
  },
  { timestamps: true },
);
creditCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = model('Credit_card', creditCardSchema);
