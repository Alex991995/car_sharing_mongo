const mongoose = require('mongoose');
const express = require('express');

const Credit_card = require('./model/Credit_card');
const Driver = require('./model/Driver');
const Run = require('./model/Run');
const Car = require('./model/Car');
const Booking = require('./model/Booking');

const dbConnect = require('./config/dbConnect');
dbConnect();

const app = express();
const PORT = 3000;

app.get('/get1', async (req, res) => {
  const cars = await Car.where('status').equals('In use').where('fuel_level').lt(25.0);

  if (cars.length) {
    res.json(cars);
  } else {
    res.status(404).json({ data: 'No cars' });
  }
});










mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
});



