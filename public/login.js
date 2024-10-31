document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const respuesta = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
        });

        const datos = await respuesta.json();
        console.log('Respuesta del servidor:', datos); // Verificar los datos recibidos

        if (respuesta.ok) {
            sessionStorage.setItem('nombreUsuario', datos.nombre); // Guardar el nombre del usuario
            document.getElementById('login-mensaje').innerText = 'Inicio de sesión exitoso';
            window.location.href = 'index.html';
        } else {
            document.getElementById('login-mensaje').innerText = 'Correo electrónico o contraseña incorrectos';
        }
    } catch (error) {
        console.log('Error en el inicio de sesión:', error);
        document.getElementById('login-mensaje').innerText = 'Error en el inicio de sesión';
    }
});


//Desplegar menu
const menuButton = document.querySelector('.boton-menu');
const menu = document.querySelector('.menu');
menuButton.addEventListener('click', () => {
    menu.classList.toggle('show');
});
window.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove('show');
    }
});