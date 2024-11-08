export class UserManager {

    constructor() {
        // Al iniciar, cargamos la lista de usuarios desde localStorage
        this.loadUsers();
    }
    registerUser(username, email, password) {
        const user = { username: username, email: email, password: password };
        localStorage.setItem('usuario', JSON.stringify(user));
        console.log('Usuario registrado y guardado en localStorage:', user);
    }
    // Cargar los usuarios desde localStorage
    loadUsers() {
        const usersData = localStorage.getItem('users');
        this.users = usersData ? JSON.parse(usersData) : [];
    }

    // Guardar la lista de usuarios en localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Agregar un nuevo usuario
    addUser(username, password, email) {
        const newUser = { username, password, email };
        this.users.push(newUser);
        this.saveUsers();  // Guardamos la lista actualizada de usuarios
    }

    // Buscar un usuario por su nombre de usuario y contraseña
    findUser(username, password) {
        return this.users.find(user => user.username === username && user.password === password);
    }

    // Obtener todos los usuarios (para mostrar o gestionar la lista)
    getAllUsers() {
        return this.users;
    }
}
