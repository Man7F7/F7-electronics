// Funcion para gestionar el inicio de sesion
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        // Enviar los datos de incio de sesion al servidor
        const respuesta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Guarda los datos del usuario en sessionStorage
            sessionStorage.setItem('nombreUsuario', datos.nombre); 
            sessionStorage.setItem('usuarioID', datos.id); 

            // Mostrar mensaje de exito y redirigir
            document.getElementById('login-mensaje').innerText = 'Inicio de sesión exitoso';
            window.location.href = 'index.html';
        } else {
            // Mostrar mensaje de error de autenticacion
            document.getElementById('login-mensaje').innerText = 'Correo electrónico o contraseña incorrectos';
        }
    } catch (error) {
        // Mostrar mensaje de error generico
        document.getElementById('login-mensaje').innerText = 'Error en el inicio de sesión';
    }
});

// Funcionalidad del menu desplegable
const menuButton = document.querySelector('.boton-menu');
const menu = document.querySelector('.menu');
menuButton.addEventListener('click', () => {
    menu.classList.toggle('show');
});
// Cerrar el menu si se hace click fuera de el
window.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove('show');
    }
});