export class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.record = 0;
        this.intentos = 0;
        this.fechaRecord = new Date();
    }

    actualizarRecord(nuevoRecord) {
        if (nuevoRecord > this.record) {
            this.record = nuevoRecord;
            this.fechaRecord = new Date();
        }
    }

    incrementarIntentos() {
        this.intentos += 1;
    }
}
