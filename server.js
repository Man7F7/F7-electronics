const express = require('express'); // Cambiado a express
const { sequelize } = require('./models'); // Asegúrate de que la instancia sequelize esté exportada correctamente en tu modelo
const rutas = require('./routes');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para las rutas
app.use(rutas);

// Verificar conexión con la base de datos
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
