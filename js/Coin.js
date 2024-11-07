// Coin.js
export class Coin {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.classList.add('coin');
        this.x = 800; // Iniciar a la derecha de la pantalla
        this.element.style.left = `${this.x}px`;
        this.container.appendChild(this.element);
    }

    move() {
        this.x -= 5; // Mover la moneda hacia la izquierda
        this.element.style.left = `${this.x}px`;
    }

    remove() {
        this.container.removeChild(this.element);
    }
}
