const express = require('express');
const { Orden, Producto, Carrito, Usuario } = require('./models');
const bcrypt = require('bcrypt');
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

// -------------------- Rutas de Carrito --------------------
// Ruta para agregar un producto al carrito
router.post('/carrito', async (req, res) => {
    try {
        const { orden_id, producto_id, cantidad } = req.body;
        const nuevoItem = await Carrito.create({ orden_id, producto_id, cantidad });
        res.status(201).json(nuevoItem);
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(400).json({ error: 'Error al agregar al carrito' });
    }
});

// Ruta para obtener los productos en el carrito de un usuario
router.get('/carrito/:orden_id', async (req, res) => {
    const { orden_id } = req.params;
    try {
        const itemsCarrito = await Carrito.findAll({
            where: { orden_id },
            include: [Producto], // Incluir información del producto
        });
        res.json(itemsCarrito);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/carrito/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Carrito.findByPk(id);
        if (item) {
            await item.destroy();
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).json({ error: 'Error al eliminar del carrito' });
    }
});

// -------------------- Rutas de Autenticación --------------------
// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        console.log(`Contraseña ingresada: ${contraseña}`);
        console.log(`Contraseña almacenada: ${usuario.contraseña}`);

        const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
        console.log(`Contraseña correcta: ${contraseñaCorrecta}`);

        if (contraseñaCorrecta) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }
    } catch (error) {
        console.log('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
});


module.exports = router;