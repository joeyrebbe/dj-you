const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/dj-you-database', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = connection