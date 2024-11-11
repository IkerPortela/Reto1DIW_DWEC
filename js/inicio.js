window.onload = () => {
    // Obtener la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Usuarios en localStorage:', usuarios); // Verifica el contenido completo de `usuarios`

    // Obtener el username activo desde localStorage
    const username = localStorage.getItem('usernameActivo');
    console.log('Username activo:', username); // Verifica que el username activo esté cargado

    // Intentar encontrar el usuario en la lista de usuarios
    const usuarioData = usuarios.find(u => u.username === username);
    
    const navProfileImage = document.getElementById("profileImage"); // Imagen en la barra de navegación

    // Cargar la imagen de perfil del usuario activo al cargar la página
    cargarImagen();

    function cargarImagen() {
        const usernameActivo = localStorage.getItem('usernameActivo');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.username === usernameActivo);

        // Cargar la imagen de perfil del usuario activo
        if (usuario && usuario.profileImage) {
            navProfileImage.src = usuario.profileImage;  // Muestra la imagen en la barra de navegación
        } else {
            // Si no hay imagen configurada, usar la imagen por defecto
            navProfileImage.src = "/sources/img/pfp.png";
        }
    }
    
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

    document.addEventListener("DOMContentLoaded", () => {
        const navProfileImage = document.getElementById("profileImage"); // Imagen en la barra de navegación
        cargarImagen();  // Cargar la imagen de perfil del usuario activo al cargar cada página

        // Función para cargar imagen guardada en localStorage y establecerla en la barra de navegación
        function cargarImagen() {
            const usernameActivo = localStorage.getItem('usernameActivo');
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(u => u.username === usernameActivo);

            // Cargar la imagen de perfil del usuario activo
            if (usuario && usuario.profileImage) {
                navProfileImage.src = usuario.profileImage;  // Muestra la imagen en la barra de navegación
            } else {
                // Si no hay imagen configurada, usar la imagen por defecto
                navProfileImage.src = "/sources/img/pfp.png";
            }
        }

        // Añade un evento al hacer clic en el enlace
        const comenzarLink = document.querySelector(".comenzar");
        comenzarLink.addEventListener("click", (event) => {
            // Verifica si hay un usuario activo en localStorage
            const activeUser = localStorage.getItem("activeUser");

            // Si no hay usuario activo, muestra una alerta y previene la navegación
            if (!activeUser) {
                event.preventDefault();  // Evita la redirección
                alert("Debes iniciar sesión primero para comenzar el juego.");
            }
        });
    });
};
