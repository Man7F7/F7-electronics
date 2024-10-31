const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const rutas = require('./routes');
const app = express();
const PORT = 3000;

// Configuracion de body-parser para manejar datos JSON y URL encoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para las rutas
app.use(rutas);

// Verificar conexión con la base de datos y levantar el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión con la base de datos exitosa');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:3000`);
        });
    })
    .catch((error) => {
        console.error('No se pudo conectar con la base de datos:', error);
    });
