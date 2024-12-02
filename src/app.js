const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require("path");

require('dotenv').config()
require('./Config/dataBaseConfig')


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;


// Cargar certificados
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

// Rutas
// Configurar la carpeta "views" para servir archivos estáticos
app.use(express.static(path.join(__dirname, "views")));

// Ruta para la página de login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "loginPage.html"));
});

// Ruta para el dashboard
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.use('/api/student', require('./routes/StudentRoutes'))
app.use('/api/menus', require('./routes/MenuRoutes'))
app.use('/api/reservation', require('./routes/ReservationRoutes'));


// Iniciar servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://127.0.0.1:${PORT}`);
});
