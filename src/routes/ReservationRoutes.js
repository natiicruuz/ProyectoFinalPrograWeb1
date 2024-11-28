const express = require('express');
const {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} = require('../Controllers/ReservationController');

const router = express.Router();

router.post('/create', createReservation);
router.get('/getAll', getAllReservations);
router.get('/get/:id', getReservationById);
router.put('/update/:id', updateReservation);
router.delete('/delete/:id', deleteReservation);

module.exports = router;
