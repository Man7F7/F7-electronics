const express = require('express'); // Importa express con require

const app = express();
const PORT = 3000; // Cambia si necesitas usar otro puerto

// Configuración de la carpeta de archivos estáticos (como CSS e imágenes)
app.use(express.static('public')); 

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda en línea!');
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
