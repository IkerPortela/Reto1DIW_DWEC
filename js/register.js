import { UserManager } from './UserManager.js';
import { User } from './User.js';

const userManager = new UserManager();

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Referencias a los elementos del formulario
    const btnRegistrar = document.getElementById('registrarse');
    const usernameInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('contraseña');

    // Función para guardar el usuario en localStorage
    function guardarUsuarioEnLocalStorage(usuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Agregar el nuevo usuario a la lista
        usuarios.push(usuario);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Evento del botón de registrar
    btnRegistrar.addEventListener('click', () => {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
    
        // Validar que los campos no estén vacíos
        if (username && email && password) {
            // Crear una instancia de usuario usando la clase User
            const usuario = new User(username, password, email);

            // Agregar el usuario a UserManager (opcional)
            userManager.addUser(username, password, email);

            // Guardar el usuario en localStorage
            guardarUsuarioEnLocalStorage(usuario);
    
            // Limpiar campos del formulario
            usernameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
    
            alert('Usuario registrado con éxito');
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
});
