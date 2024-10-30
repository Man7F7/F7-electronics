const express = require('express');
const { Producto, Usuario, Orden } = require('./models');
const router = express.Router();

// -------------------- Rutas de Productos --------------------

// Ruta para obtener todos los productos
router.get('/api/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

module.exports = router;

// -------------------- Rutas de Usuarios --------------------

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Registrar un nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar el usuario' });
  }
});

// -------------------- Rutas de Órdenes --------------------

// Crear una nueva orden
router.post('/ordenes', async (req, res) => {
  try {
    const nuevaOrden = await Orden.create(req.body);
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la orden' });
  }
});

// Obtener todas las órdenes
router.get('/ordenes', async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      include: [Usuario, Producto], // Incluir relaciones
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
});

module.exports = router;

