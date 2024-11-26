const Students = require('../Models/StudentModel')

// Registrar Optometric POST
exports.registerStudents = async (req, res) => {
    try {
        console.log("[starting...][StudentsController][registerStudents]")
        console.log(req.body)
        const newStudents = new Students(req.body)
        await newStudents.save()
        res.status(201).json({ message: 'Optometric registrado exitosamente' })
        console.log("[End][StudentsController][registerStudents]")

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}