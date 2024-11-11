document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los campos del formulario y botones
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const saveButton = document.getElementById("guardar");

    // Referencia a la imagen de perfil en la barra de navegación y en el editor de perfil
    const fileInput = document.getElementById("fileReader");
    const imgPreview = document.querySelector("#preview");
    const navProfileImage = document.getElementById("profileImage"); // Imagen en la barra de navegación

    // Variable para almacenar la nueva imagen seleccionada
    let newProfileImageURL = null;

    // Cargar usuario, imagen de perfil y configurar el editor
    cargarDatosUsuario();
    cargarImagen();  // Carga la imagen de perfil en el editor y en la barra de navegación

    // Guardar cambios al hacer clic en el botón
    saveButton.addEventListener("click", guardarCambios);

    // Evento para cargar imagen
    if (fileInput) {
        fileInput.addEventListener("change", previewImage);
    }

    // Crear un lector de archivos
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        // Cuando el archivo es cargado, almacenar la URL de la imagen
        newProfileImageURL = reader.result; // Asigna la imagen al nuevo perfil
        imgPreview.src = newProfileImageURL; // Muestra la imagen previsualizada
    });

    // Función para cargar datos del usuario activo
    function cargarDatosUsuario() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usernameActivo = localStorage.getItem('usernameActivo');
        const usuario = usuarios.find(u => u.username === usernameActivo);

        if (usuario) {
            usernameField.value = usuario.username;
            emailField.value = usuario.email;
            passwordField.value = usuario.password;
        } else {
            console.log("Usuario activo no encontrado.");
        }
    }

    // Función para guardar cambios en el usuario
    function guardarCambios() {
        const username = usernameField.value;
        const email = emailField.value;
        const password = passwordField.value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usernameActivo = localStorage.getItem('usernameActivo');
        const index = usuarios.findIndex(u => u.username === usernameActivo);

        if (index !== -1) {
            usuarios[index].username = username;
            usuarios[index].email = email;
            usuarios[index].password = password;

            // Si se ha seleccionado una nueva imagen de perfil, actualizarla en los datos del usuario
            if (newProfileImageURL) {
                usuarios[index].profileImage = newProfileImageURL; // Guardamos la imagen dentro del usuario
                actualizarImagenNav(newProfileImageURL);  // Actualiza la imagen en la barra de navegación
            }

            if (username !== usernameActivo) {
                localStorage.setItem("usernameActivo", username);
            }

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("Cambios guardados exitosamente.");
        } else {
            console.log("Usuario activo no encontrado en la lista de usuarios.");
        }
    }

    // Función para previsualizar la imagen seleccionada
    function previewImage(event) {
        const input = event.target;

        if (!input.files.length) return;

        const file = input.files[0];
        reader.readAsDataURL(file); // Lee el archivo para obtener la URL base64
    }

    // Función para cargar imagen guardada en localStorage y establecerla en la barra de navegación
    function cargarImagen() {
        const usernameActivo = localStorage.getItem('usernameActivo');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.username === usernameActivo);

        // Cargar la imagen de perfil del usuario activo
        if (usuario && usuario.profileImage) {
            imgPreview.src = usuario.profileImage;  // Muestra la imagen en el editor
            navProfileImage.src = usuario.profileImage; // Muestra la imagen en la barra de navegación
        } else {
            // Si no hay imagen configurada, usar la imagen por defecto
            imgPreview.src = "/sources/img/pfp.png";
            navProfileImage.src = "/sources/img/pfp.png";
        }
    }

    // Función para actualizar la imagen en la barra de navegación
    function actualizarImagenNav(imageURL) {
        navProfileImage.src = imageURL; // Actualiza la imagen en el enlace de la navegación
    }
});
