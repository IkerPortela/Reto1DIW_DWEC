// classes/Game.js
import { Dino } from './Dino.js';
import { Obstacle } from './Obstacle.js';
import { Coin } from './Coin.js'; // Importar la clase Coin

export class Game {
    constructor() {
        this.gameContainer = document.getElementById('game');
        this.dinoElement = document.getElementById('dino');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');  // Elemento para el récord
        this.attemptsElement = document.getElementById('attempts');    // Elemento para intentos
        this.dino = new Dino(this.dinoElement);
        this.obstacles = [];
        this.coins = []; // Array para almacenar monedas
        this.obstacleIntervals = [];
        this.coinIntervals = []; // Array para almacenar intervalos de monedas
        this.gameInterval = null;
        this.jumpListenerAdded = false;
        this.score = 0;
        this.highScore = 0; // Variable para almacenar el récord
        this.attempts = 0;  // Variable para almacenar el número de intentos
    }

    start() {
        // Limpiar intervalos previos antes de iniciar uno nuevo
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
    
        // Generar obstáculos con un intervalo aleatorio
        const obstacleGenerator = () => {
            this.generateObstacle();
            const nextObstacleInterval = this.getRandomInterval(300, 2000);  // Ejemplo: entre 0.3 y 2 segundos
            this.gameInterval = setTimeout(obstacleGenerator, nextObstacleInterval);
        };
        obstacleGenerator();
    
        // Generar monedas con un intervalo aleatorio
        const coinGenerator = () => {
            this.generateCoin();
            const nextCoinInterval = this.getRandomInterval(3000, 7000);  // Ejemplo: entre 3 y 7 segundos
            this.coinIntervals.push(setTimeout(coinGenerator, nextCoinInterval));
        };
        coinGenerator();
    
        // Asegurarse de que el evento de salto solo se registre una vez
        if (!this.jumpListenerAdded) {
            document.addEventListener('keydown', (event) => {
                if (event.key === ' ') {
                    this.dino.jump();
                }
            });
            this.jumpListenerAdded = true;
        }
    }

    getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateObstacle() {
        const obstacle = new Obstacle(this.gameContainer);
        this.obstacles.push(obstacle);

        const obstacleInterval = setInterval(() => {
            obstacle.move();

            // Detección de colisiones
            if (obstacle.x < 90 && obstacle.x > 50 && this.dino.y < 40) {
                alert('¡Game Over! Tu puntuación fue: ' + this.score);
                this.updateHighScore();  // Actualizar el récord
                this.updateAttempts();   // Incrementar el número de intentos
                this.stopGame();
                this.resetGame();
            }
            if (obstacle.x < 50 && obstacle.x > 45) {
                this.score += 10; // Incrementar la puntuación por saltar
                this.updateScore(); // Actualizar la visualización de la puntuación
            }

            // Eliminar obstáculo cuando sale de la pantalla
            if (obstacle.x <= -20) {
                clearInterval(obstacleInterval);
                this.obstacles = this.obstacles.filter((obs) => obs !== obstacle);
                obstacle.remove(this.gameContainer);
            }
        }, 20);

        this.obstacleIntervals.push(obstacleInterval);
    }

    generateCoin() {
        const coin = new Coin(this.gameContainer);
        this.coins.push(coin);

        const coinInterval = setInterval(() => {
            coin.move();

            // Detección de colisiones con el dinosaurio
            if (coin.x < 90 && coin.x > 50 && this.dino.y < 40) {
                this.score += 50; // Incrementar la puntuación por recoger la moneda
                this.updateScore(); // Actualizar la visualización de la puntuación
                coin.remove(); // Eliminar la moneda recogida
                this.coins = this.coins.filter(c => c !== coin); // Limpiar de la lista de monedas
                clearInterval(coinInterval); // Detener el movimiento de la moneda
            }

            // Eliminar moneda cuando sale de la pantalla
            if (coin.x <= -20) {
                clearInterval(coinInterval);
                coin.remove();
                this.coins = this.coins.filter(c => c !== coin); // Limpiar de la lista de monedas
            }
        }, 20);

        // Guardar el intervalo de movimiento de la moneda
        this.coinIntervals.push(coinInterval);
    }

    updateScore() {
        this.scoreElement.textContent = 'Puntuación: ' + this.score; // Actualizar el texto de puntuación
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score; // Actualizar el récord si la puntuación actual es mayor
            this.highScoreElement.textContent = 'Record: ' + this.highScore;
        }
    }

    updateAttempts() {
        this.attempts++; // Incrementar el número de intentos en cada Game Over
        this.attemptsElement.textContent = 'Intentos: ' + this.attempts;
    }

    stopGame() {
        // Detener el intervalo principal de generación de obstáculos
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }

        // Detener y limpiar todos los intervalos de obstáculos
        this.obstacleIntervals.forEach(interval => clearInterval(interval));
        this.obstacleIntervals = [];  // Vaciar la lista de intervalos de obstáculos

        // Detener y limpiar todos los intervalos de monedas
        this.coinIntervals.forEach(interval => clearInterval(interval));
        this.coinIntervals = [];  // Vaciar la lista de intervalos de monedas

        // Eliminar todos los obstáculos del contenedor y vaciar el array de obstáculos
        this.obstacles.forEach(obstacle => obstacle.remove(this.gameContainer));
        this.obstacles = [];

        // Eliminar todas las monedas del contenedor y vaciar el array de monedas
        this.coins.forEach(coin => coin.remove(this.gameContainer));
        this.coins = [];

        // Reiniciar la posición del dinosaurio
        this.dino.y = 0;
        this.dino.element.style.bottom = '0px';

        // Reiniciar la puntuación a cero y actualizar la visualización
        this.score = 0;
        this.updateScore();
    }

    resetGame() {
        // Reiniciar el juego tras un breve descanso
        setTimeout(() => {
            this.start();  // Iniciar el juego
        }, 1000);
    }
}
