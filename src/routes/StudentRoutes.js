const express = require('express')
const { registerStudents, updateStudents, deleteStudents, getAllStudents, loginStudents} = require('../Controllers/StudentController')

const router = express.Router()

console.log("[starting...][StudentRoutes]")


router.post('/register', registerStudents)
router.get('/getAll', getAllStudents);
router.put('/update/:id', updateStudents)
router.delete('/delete/:id', deleteStudents)
router.post('/login', loginStudents);

module.exports = router
console.log("[end][StudentRoutes]")
