const express = require('express');
const authenticateStudent = require('../middleware/Auth');

const {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} = require('../Controllers/ReservationController');

const router = express.Router();

router.post('/create', authenticateStudent, createReservation);
router.get('/getAll', getAllReservations);
router.get('/get/:id', getReservationById);
router.put('/update/:id', updateReservation);
router.delete('/delete/:id', deleteReservation);

module.exports = router;
