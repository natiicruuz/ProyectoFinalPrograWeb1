const express = require('express')
const { registerStudents } = require('../Controllers/StudentController')

const router = express.Router()

console.log("[starting...][StudentRoutes]")


router.post('/register', registerStudents)


// router.post('/login', loginStudents) // hace falta el middleware

module.exports = router
console.log("[end][StudentRoutes]")
