// script.js

import { Game } from './Game.js';

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
