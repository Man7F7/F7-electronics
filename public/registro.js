document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const respuesta = await fetch('/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, contraseña })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            document.getElementById('registro-mensaje').innerText = 'Registro exitoso';
            // Redirigir a la página de inicio de sesión
            window.location.href = 'login.html';
        } else {
            document.getElementById('registro-mensaje').innerText = 'Error en el registro';
        }
    } catch (error) {
        document.getElementById('registro-mensaje').innerText = 'Error en el registro';
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