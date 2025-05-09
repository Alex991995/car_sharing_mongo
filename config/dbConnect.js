const mongoose =  require('mongoose')
const uri = "mongodb+srv://sashe1995:z2Ys8rephNUO1YGu@car-sharing.3prvoi7.mongodb.net/car-sharing?retryWrites=true&w=majority&appName=car-sharing";

async function dbConnect() {
  try {
    await mongoose.connect(uri)
  } catch (error) {
    console.error(error)
  }
}

module.exports = dbConnect