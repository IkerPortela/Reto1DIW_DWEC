// classes/Dino.js
export class Dino {
    constructor(element) {
        this.element = element;
        this.y = 0;
        this.jumpPower = 15;
        this.isJumping = false;
        this.gravity = 0.9;
    }

    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        
        let jumpInterval = setInterval(() => {
            this.y += this.jumpPower;
            this.jumpPower -= this.gravity;
            this.element.style.bottom = `${this.y}px`;

            if (this.y <= 0) {
                clearInterval(jumpInterval);
                this.isJumping = false;
                this.jumpPower = 15;
                this.y = 0;
                this.element.style.bottom = '0px';
            }
        }, 20);
    }
}
