// classes/Obstacle.js
export class Obstacle {
    constructor(gameContainer) {
        this.element = document.createElement('div');
        this.element.classList.add('obstacle');
        this.x = gameContainer.offsetWidth;
        this.speed = 7;
        this.passed = false;
        this.element.style.left = `${this.x}px`;
        gameContainer.appendChild(this.element);
    }

    move() {
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }

    remove(gameContainer) {
        gameContainer.removeChild(this.element);
    }
}
