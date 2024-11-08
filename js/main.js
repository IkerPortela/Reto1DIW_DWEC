import { Game } from './Game.js';
import { User } from './User.js';

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
    let usuario;
    if (usuarioData) {
        usuario = new User(
            usuarioData.username,
            usuarioData.password,
            usuarioData.email
        );

        // Restaurar otros datos del usuario
        usuario.record = usuarioData.record;
        usuario.intentos = usuarioData.intentos;
        usuario.fechaRecord = new Date(usuarioData.fechaRecord);

        console.log('Usuario encontrado:', usuario);
        console.log(`Bienvenido, ${usuario.username}`);
    } else {
        console.log('Usuario no encontrado en la lista de usuarios');
    }

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

            // Incrementar intentos del usuario y guardar en localStorage
            if (usuario) {
                usuario.incrementarIntentos();
                actualizarUsuarioEnLocalStorage(usuario);
            }
        } else {
            // Detener el juego y restablecerlo
            const puntajeFinal = game.stopGame();
            actionButton.innerText = 'Iniciar Juego';  // Cambiar el texto del botón
            gameInProgress = false;  // Actualizar el estado del juego

            // Actualizar récord del usuario si se alcanza un nuevo récord
            if (usuario && puntajeFinal > usuario.record) {
                usuario.actualizarRecord(puntajeFinal);
                alert(`¡Nuevo récord: ${puntajeFinal}!`);
                actualizarUsuarioEnLocalStorage(usuario);
            }
        }
    });

    // Función para actualizar el usuario en localStorage
    function actualizarUsuarioEnLocalStorage(usuarioActualizado) {
        // Buscar el índice del usuario en la lista
        const index = usuarios.findIndex(u => u.username === usuarioActualizado.username);
        
        if (index !== -1) {
            // Actualizar el usuario en la lista
            usuarios[index] = usuarioActualizado;

            // Guardar la lista actualizada en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }
};
