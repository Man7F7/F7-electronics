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

        if (respuesta.ok) {
            document.getElementById('login-mensaje').innerText = 'Inicio de sesión exitoso';
            // Redirigir a la página principal o dashboard
            window.location.href = 'index.html';
        } else {
            document.getElementById('login-mensaje').innerText = 'Correo electrónico o contraseña incorrectos';
        }
    } catch (error) {
        document.getElementById('login-mensaje').innerText = 'Error en el inicio de sesión';
    }
});

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