const mongoose = require('mongoose')
const config = require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log('Database connected successfully')
  })
