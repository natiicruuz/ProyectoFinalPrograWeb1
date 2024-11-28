const Reservation = require('../Models/ReservationModel');
const Student = require('../Models/StudentModel');
const Menu = require('../Models/MenuModel');


exports.createReservation = async (req, res) => {
    try {
        const { studentId, menuId, date, status } = req.body;

        // Verificar que el estudiante existe
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Verificar que el menú existe
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: 'Menú no encontrado' });
        }

        // Crear la reserva
        const reservation = new Reservation({ student: studentId, menu: menuId, date, status });
        await reservation.save();

        res.status(201).json({ message: 'Reserva creada exitosamente', data: reservation });
    } catch (error) {
        console.error('[createReservation] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        // Obtener todas las reservas con los datos del estudiante y el menú
        const reservations = await Reservation.find()
            .populate('student', 'name email') // Solo obtenemos el nombre y el correo del estudiante
            .populate('menu', 'name price');  // Solo obtenemos el nombre y el precio del menú

        res.status(200).json({ message: 'Reservas obtenidas exitosamente', data: reservations });
    } catch (error) {
        console.error('[getAllReservations] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar la reserva por ID
        const reservation = await Reservation.findById(id)
            .populate('student', 'name email')
            .populate('menu', 'name price');

        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.status(200).json({ message: 'Reserva obtenida exitosamente', data: reservation });
    } catch (error) {
        console.error('[getReservationById] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, menuId, date, status } = req.body;

        // Buscar la reserva por ID
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Actualizar campos solo si están presentes en la solicitud
        if (studentId) {
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ message: 'Estudiante no encontrado' });
            }
            reservation.student = studentId;
        }

        if (menuId) {
            const menu = await Menu.findById(menuId);
            if (!menu) {
                return res.status(404).json({ message: 'Menú no encontrado' });
            }
            reservation.menu = menuId;
        }

        if (date) reservation.date = date;
        if (status) reservation.status = status;

        await reservation.save();

        res.status(200).json({ message: 'Reserva actualizada exitosamente', data: reservation });
    } catch (error) {
        console.error('[updateReservation] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la reserva existe
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        await Reservation.findByIdAndDelete(id);

        res.status(200).json({ message: 'Reserva eliminada exitosamente' });
    } catch (error) {
        console.error('[deleteReservation] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
