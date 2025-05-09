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

app.get('/get2', async (req, res) => {
  const drivers = await Driver.where('fk_card_id').equals(null);
  const drivers_id = drivers.map(item => item.id);

  const runs = await Run.find({ fk_driver_id: { $in: drivers_id } });
  const runs_id = runs.map(item => item.id);

  const cars = await Car.find({ fk_run_id: { $in: runs_id } })
    .where('status')
    .equals('Reserved')
    .select('vin geo_latitude geo_longitude');

  if (cars.length) {
    res.json(cars);
  } else {
    res.status(404).json({ data: 'No cars' });
  }
});

app.post('/post1', async (req, res) => {
  try {
    await Car.create({
      registration_number: 'DEF456',
      brand: 'Ford',
      vin: '1FA6P8TH6K5103085',
      model: 'Focus',
      production_date: '2021-03-10',
      fuel_level: 45.0,
      mileage: 8500,
      status: 'In use',
      geo_latitude: 41.8781,
      geo_longitude: -87.6298,
      fk_run_id: '681c9c8b76d37917964b4046',
    });
    res.status(200).json({ data: 'Car was created' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ data: 'Car was not created' });
  }
});

app.put('/put1', async (req, res) => {
  const car = await Car.updateOne(
    {
      $or: [{ production_date: { $lt: '01/01/2017' } }, { mileage: { $gt: 100000 } }],
    },
    { status: 'In Service' },
  );

  res.json(car);
});

app.put('/put2', async (req, res) => {
  const carBookedMoreTwice = await Booking.aggregate([
    { $sortByCount: '$fk_car_id' },
    { $match: { count: { $gt: 2 } } },
    { $limit: 1 },
  ]);

  const id = carBookedMoreTwice[0]._id;

  const car = await Car.updateOne(
    {
      $and: [{ _id: id }, { status: { $nin: ['In use', 'Reserved'] } }],
    },
    { geo_latitude: 53.8882836, geo_longitude: 27.5442615 },
  );
  res.json(car);
});

app.delete('/delete1', async (req, res) => {
  const car = await Car.deleteOne({ vin: 'JHMCB7650LC012345' });
  res.json(car);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
});
