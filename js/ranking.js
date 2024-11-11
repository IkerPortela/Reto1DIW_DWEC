document.addEventListener("DOMContentLoaded", () => {
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
});
