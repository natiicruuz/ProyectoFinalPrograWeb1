const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/StudentRoutes')
require('dotenv').config()
require('./Config/dataBaseConfig')

const app = express()
app.use(express.json())

app.get('/', (req,res) => res.send("Hello world"))

app.use('/api/student', studentRoutes)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running in the port:  ${PORT}`)
})

