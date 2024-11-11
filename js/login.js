// Referencias a los campos del formulario
const loginButton = document.getElementById('loginButton');
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('contraseña');

// Evento al hacer click en el botón de login
loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Obtener la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario en la lista usando el username y password
    const user = usuarios.find(u => u.username === username && u.password === password);

    if (user) {
        // Si el usuario es encontrado y la contraseña es correcta
        localStorage.setItem('usernameActivo', username); // Guardar el usuario activo en localStorage
        window.location.href = 'inicio.html';
    } else {
        // Si el login es incorrecto
        alert('Usuario o contraseña incorrectos.');
    }
});
