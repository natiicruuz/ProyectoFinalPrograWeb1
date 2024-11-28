const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    enrollment: { type: Number, required: true }
  })
  

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
module.exports = Student