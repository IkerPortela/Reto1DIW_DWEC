// script.js

import { Game } from './Game.js';
import { User } from './User.js';
import { UserManager } from './UserManager.js';

window.onload = () => {
    // Obtener la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Usuarios en localStorage:', usuarios); // Verifica el contenido completo de `usuarios`

    // Obtener el username activo desde localStorage
    const username = localStorage.getItem('usernameActivo');
    console.log('Username activo:', username); // Verifica que el username activo esté cargado

    // Intentar encontrar el usuario en la lista de usuarios
    const usuarioData = usuarios.find(u => u.username === username);
    
    // Verificar si el usuario fue encontrado y reconstruir como instancia de User
    if (usuarioData) {
        // Crear una instancia de User usando los datos recuperados
        const usuario = new User(
            usuarioData.username,
            usuarioData.password,
            usuarioData.email
        );

        // Restaurar otros datos del usuario
        usuario.record = usuarioData.record;
        usuario.intentos = usuarioData.intentos;
        usuario.fechaRecord = new Date(usuarioData.fechaRecord); // Convertir a fecha

        console.log('Usuario encontrado:', usuario);
        console.log(`Bienvenido, ${usuario.username}`);
    } else {
        console.log('Usuario no encontrado en la lista de usuarios');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el usuario logueado desde localStorage
    const usernameActivo = localStorage.getItem('usernameActivo');
    if (usernameActivo) {
        // Obtener los datos del usuario desde localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioLogueado = usuarios.find(user => user.username === usernameActivo);

        if (usuarioLogueado) {
            // Mostrar el récord y los intentos en los elementos correspondientes
            const scoreElement = document.getElementById('score');
            const highScoreElement = document.getElementById('highScore');
            const attemptsElement = document.getElementById('attempts');
            
            // Mostrar la puntuación, récord e intentos
            highScoreElement.textContent = `Record: ${usuarioLogueado.record}`;
            attemptsElement.textContent = `Intentos: ${usuarioLogueado.intentos}`;
        }
    }
});



// Crear una instancia del juego
const game = new Game();

// Seleccionar el botón de inicio/detención
const actionButton = document.getElementById('botonJuego');

// Variable para rastrear el estado del juego
let gameInProgress = false;

// Añadir el evento de clic exclusivamente para el ratón
actionButton.addEventListener('pointerdown', (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del botón
    actionButton.blur();    // Elimina el foco inmediatamente después del clic

    if (!gameInProgress) {
        game.start();  // Iniciar el juego
        actionButton.innerText = 'Detener Juego';  // Cambiar el texto del botón
        gameInProgress = true;  // Actualizar el estado del juego
    } else {
        game.stopGame();  // Detener el juego y restablecerlo
        actionButton.innerText = 'Iniciar Juego';  // Cambiar el texto del botón
        gameInProgress = false;  // Actualizar el estado del juego
    }
});
