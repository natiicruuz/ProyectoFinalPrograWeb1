const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateStudent = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado Authorization
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.studentId = decoded.id; // Añadir el ID del estudiante al objeto req
        next();
    } catch (error) {
        console.error('[authenticateStudent] Error:', error.message);
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authenticateStudent;
