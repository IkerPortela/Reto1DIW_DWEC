import { UserManager } from './UserManager.js';

const userManager = new UserManager();

// Agregar un usuario de prueba (o lo puedes hacer manualmente para pruebas)
userManager.addUser('usuario1', 'password123', 'usuario1@email.com');

// Referencias a los campos del formulario
const loginButton = document.getElementById('loginButton');
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('contraseña');

// Función para recuperar los datos del usuario desde localStorage
function cargarUsuarioGuardado() {
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (usuarioGuardado) {
        const user = JSON.parse(usuarioGuardado);
        // Completar los campos con los datos del usuario guardado
        usernameInput.value = user.usuario;
        passwordInput.value = user.contraseña;
    }
}

// Llamamos a la función para cargar el usuario guardado al cargar la página
cargarUsuarioGuardado();

// Evento al hacer click en el botón de login
loginButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Verificar si el usuario y la contraseña son correctos
    const user = userManager.findUser(username, password);  // Asegúrate de que este método busque correctamente

    if (user) {
        // Después de un login exitoso
localStorage.setItem('usernameActivo', username);

        window.location.href = 'game.html';
    } else {
        // Si el login es incorrecto
        alert('Usuario o contraseña incorrectos.');
    }
});
