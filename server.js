const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const rutas = require('./routes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Procesar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Procesar datos de formularios

app.use(express.static('public'));
app.use(rutas);

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
