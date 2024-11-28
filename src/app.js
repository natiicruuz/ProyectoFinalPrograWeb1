const fs = require('fs');
const https = require('https');
const express = require('express');
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
app.get('/', (req, res) => res.send('Hello world'))
app.use('/api/student', require('./routes/StudentRoutes'))
app.use('/api/menus', require('./routes/MenuRoutes'))
app.use('/api/reservation', require('./routes/ReservationRoutes'));


// Iniciar servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on https://127.0.0.1:${PORT}`);
});
