// Funcion para gestionar el registro de nuevos usuarios
document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        // Enviar los datos de registro al servidor
        const respuesta = await fetch('/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, contraseña })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Mostrar mensaje de registro exitoso y redirigir al inicio de sesion.
            document.getElementById('registro-mensaje').innerText = 'Registro exitoso';
            
            window.location.href = 'login.html';
        } else {
            //Mostrar mensaje de error en el registro
            document.getElementById('registro-mensaje').innerText = 'Error en el registro';
        }
    } catch (error) {
        // Mensaje de error generico
        document.getElementById('registro-mensaje').innerText = 'Error en el registro';
    }
});

// Funcionalidad de menu desplegable
const menuButton = document.querySelector('.boton-menu');
const menu = document.querySelector('.menu');
menuButton.addEventListener('click', () => {
    menu.classList.toggle('show');
});
// Cerrar menu cuando se haga click fuera de el
window.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove('show');
    }
});