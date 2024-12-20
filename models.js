const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Conexión a la base de datos
const sequelize = new Sequelize('f7_electronics', 'root', 'piperonnn', {
    host: 'localhost',
    dialect: 'mysql',
});

// Definición del modelo de Producto
const Producto = sequelize.define('Producto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'productos',
    timestamps: false, 
});

// Definición del modelo de Usuario
const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    contraseña: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false, 
    hooks: {
        beforeCreate: async (user) => {
            user.contraseña = await bcrypt.hash(user.contraseña, 10);
        }
    }
});

// Definición del modelo de Orden
const Orden = sequelize.define('Orden', {
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
    timestamps: false, 
});

// Definición del modelo de Carrito
const Carrito = sequelize.define('Carrito', {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    producto_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
});

// Definir las relaciones correctamente
Usuario.hasMany(Carrito);
Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Producto.hasMany(Carrito);
Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });

Usuario.hasMany(Orden);
Orden.belongsTo(Usuario);

Orden.hasMany(Carrito);
Carrito.belongsTo(Orden);


// Sincronizar la base de datos
const initDb = async () => {
    await sequelize.sync({ alter: true }); 
    console.log("Base de datos sincronizada");
};
initDb();

// Exportar los modelos y la instancia de sequelize
module.exports = { sequelize, Producto, Usuario, Orden, Carrito };