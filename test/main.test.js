import { expect } from 'chai';
import { LocalStorage } from 'node-localstorage';

// Crear un nuevo LocalStorage para simular el localStorage del navegador
const localStorage = new LocalStorage('./scratch'); // 'scratch' es el directorio donde se almacenarán los datos

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para eliminar del carrito
function eliminarDelCarrito(nombre) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para finalizar la compra
function finalizarCompra() {
    localStorage.removeItem('carrito');
}

// Pruebas
describe('Funciones del Carrito', () => {
    beforeEach(() => {
        localStorage.clear(); // Limpiar el localStorage antes de cada prueba
    });

    it('debería agregar un nuevo producto al carrito', () => {
        agregarAlCarrito('Samsung S23 Ultra', 1350);

        const carritoActual = JSON.parse(localStorage.getItem('carrito'));
        expect(carritoActual).to.deep.equal([{ nombre: 'Samsung S23 Ultra', precio: 1350, cantidad: 1 }]);
    });

    it('debería incrementar la cantidad de un producto existente', () => {
        agregarAlCarrito('Samsung S23 Ultra', 1350);
        agregarAlCarrito('Samsung S23 Ultra', 1350);

        const carritoActual = JSON.parse(localStorage.getItem('carrito'));
        expect(carritoActual).to.deep.equal([{ nombre: 'Samsung S23 Ultra', precio: 1350, cantidad: 2 }]);
    });

    it('debería eliminar un producto del carrito', () => {
        agregarAlCarrito('Samsung S23 Ultra', 1350);
        agregarAlCarrito('Iphone 16 Pro Max', 1200);
        eliminarDelCarrito('Samsung S23 Ultra');

        const carritoActual = JSON.parse(localStorage.getItem('carrito'));
        expect(carritoActual).to.deep.equal([{ nombre: 'Iphone 16 Pro Max', precio: 1200, cantidad: 1 }]);
    });

    it('debería finalizar la compra y limpiar el carrito', () => {
        agregarAlCarrito('Samsung S23 Ultra', 1350);
        finalizarCompra();

        const carritoActual = JSON.parse(localStorage.getItem('carrito'));
        expect(carritoActual).to.deep.equal(null);
    });
});
