const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    id: { type: Number, required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    enrollment: { type: Number, required: true }
  }, { timestamps: true })
  

const Student = mongoose.model('Student', StudentSchema)
module.exports = Student