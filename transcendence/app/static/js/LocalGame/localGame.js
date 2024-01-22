class LocalPongGame {
	constructor() {
		this.canvas = document.getElementById("pongCanvas");
		this.context = this.canvas.getContext("2d");
		this.ball = new pongObject(this.canvas.width / 2, this.canvas.height / 2, 10, 10, this.context, this.canvas);
		this.pad1 = new pongObject(5, 255, 25, 100, this.context, this.canvas);
		this.pad2 = new pongObject(this.canvas.width - 30, 255, 25, 100, this.context, this.canvas);
		this.player1Score = new pongObject(this.canvas.width / 4, this.canvas.height / 10, 25, 50, this.context, this.canvas);
		this.player2Score = new pongObject(this.canvas.width * 0.75, this.canvas.height / 10, 25, 50, this.context, this.canvas);
		this.gameLoop = this.gameLoop.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);
	}

	drawObjects() {
		const net = new pongObject(this.canvas.width / 2 - 1, 0, 2, 10, this.context, this.canvas);

		this.pad1.drawPad();
		this.pad2.drawPad();
		this.ball.drawBall();
		net.drawNet();
		this.player1Score.drawText();
		this.player2Score.drawText();
	}

	drawCanvas() {
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	async gameLoop(onGameOver) {
		if (this.isOver()) {
			onGameOver();
		}
		else {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.drawCanvas();
			this.ball.moveBall(this.pad1, this.pad2, this.player1Score, this.player2Score);
			this.pad1.movePad();
			this.pad2.movePad();
			this.drawObjects();
			requestAnimationFrame(() => this.gameLoop(onGameOver));
		}
	}

	handleKeyDown(event) {
		switch (event.key) {
			case "w":
				this.pad1.padY = -4;
				break;
			case "s":
				this.pad1.padY = 4;
				break;
			case "ArrowUp":
				this.pad2.padY = -4;
				break;
			case "ArrowDown":
				this.pad2.padY = 4;
				break;
		}
	}

	handleKeyUp(event) {
		switch (event.key) {
			case "w":
			case "s":
				this.pad1.padY = 0;
				break;
			case "ArrowUp":
			case "ArrowDown":
				this.pad2.padY = 0;
				break;
		}
	}
	countdown = (seconds, onCountdownOver) => {
		const gameCountdownText = document.getElementById("gameCountdownText");
		gameCountdownText.style.display = "block";
		gameCountdownText.innerText = seconds;
		if (seconds > 0) {
			setTimeout(() => {
				this.countdown(seconds - 1, onCountdownOver);
			}, 1000);
		} else {
			gameCountdownText.style.display = "none";
			onCountdownOver();
		}
	}
	async startGame() {
		return new Promise(resolve => {
			this.countdown(3, () => this.gameLoop(resolve));
		})
	}
	isOver() {
		if (this.player1Score.score >= 3 || this.player2Score.score >= 3) {
			if (Math.abs(this.player1Score.score - this.player2Score.score) >= 2)
				return true;
		}
		return false;
	}
	getGameScore() {
		const score = {
			player1: this.player1Score.score,
			player2: this.player2Score.score
		}
		return score;
	}
}