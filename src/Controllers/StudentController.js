const Students = require('../Models/StudentModel')
const bcrypt = require('bcrypt') // Asegúrate de importar bcrypt
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerStudents = async (req, res) => {
    try {
        console.log("[starting...][StudentController][registerStudents]")

        const { name, email, password, enrollment } = req.body;

        // Verificar si el estudiante ya existe por email o matrícula
        const existingStudent = await Students.findOne({ $or: [{ email }] });
        if (existingStudent) {
            return res.status(409).json({ message: 'El estudiante ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo estudiante
        const newStudent = new Students({
            name,
            email,
            password: hashedPassword,
            enrollment
        });

        await newStudent.save();
        console.log("[end][StudentController][registerStudents]")

        res.status(201).json({ message: 'Estudiante registrado exitosamente' });
    } catch (error) {
        console.error('[registerStudents] Error:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
exports.updateStudents = async (req, res) => {
    try {
        console.log("[starting...][StudentController][updateStudents]");

        const { id } = req.params; // Obtener el ID desde los parámetros de la ruta
        const { name, email, password, enrollment } = req.body; // Datos a actualizar

        // Verificar si el estudiante existe
        const existingStudent = await Students.findById(id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Verificar si se desea actualizar la contraseña
        let hashedPassword = existingStudent.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar los campos proporcionados
        existingStudent.name = name || existingStudent.name;
        existingStudent.email = email || existingStudent.email;
        existingStudent.password = hashedPassword;
        existingStudent.enrollment = enrollment || existingStudent.enrollment;

        // Guardar los cambios en la base de datos
        await existingStudent.save();

        console.log("[end][StudentController][updateStudents]");
        res.status(200).json({ message: 'Estudiante actualizado exitosamente', student: existingStudent });

    } catch (error) {
        console.error("[error][StudentController][updateStudents]:", error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

exports.deleteStudents = async (req, res) => {
    try {
        console.log("[starting...][StudentController][deleteStudents]");
        const { id } = req.params;

        // Validar si el ID proporcionado es válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID no válido" });
        }

        // Verificar si el estudiante existe
        const student = await Students.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        // Eliminar el estudiante
        await Students.findByIdAndDelete(id);

        console.log("[end][StudentController][deleteStudents]");
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        console.error("[error][StudentController][deleteStudents]", error);
        res.status(500).json({ message: "Error al eliminar el estudiante", error: error.message });
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        console.log("[starting...][StudentController][getAllStudents]");

        // Buscar todos los estudiantes
        const students = await Students.find().select('-password');

        console.log("[end][StudentController][getAllStudents]");
        res.status(200).json({
            message: 'Estudiantes mostrados exitosamente',
            data: students
        })

    } catch (error) {
        console.error("[error][StudentController][getAllStudents]", error);
        res.status(500).json({
            message: "Error al mostrar los estudiantes",
            error: error.message
        })
    }
}

exports.loginStudents = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Students.findOne({ email });
        if (!student) return res.status(404).json({ error: 'Estudiante no encontrado' });

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Credenciales incorrectas' });

        // Generar el token
        const token = jwt.sign(
            { studentId: student._id, email: student.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Responder con el token y el studentId
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            studentId: student._id  // Aquí retornamos el ID del estudiante
        });
    } catch (error) {
        console.error('[login] Error:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
