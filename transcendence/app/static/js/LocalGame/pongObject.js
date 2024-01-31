class pongObject {
	constructor(x, y, radius, height) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.height = height;
		this.ballSpeed = 18;
		this.paddleSpeed = 30;
		this.dirX = 1 - 2 * Math.floor(Math.random() * 2);
		this.dirY = 1 - 2 * Math.floor(Math.random() * 2);
		this.padY = 0;
		this.padX = 0;
		this.acceleration = 1.15;
		this.score = 0;
		this.canvasWidth = 60;
		this.canvasHeight = 45;
	}

	moveBall(delta, pad1, pad2, pad3, pad4, player1Score, player2Score) {
		this.x += this.dirX * this.ballSpeed * delta;
		this.y += this.dirY * this.ballSpeed * delta;

		if (this.x - this.radius < pad1.x + pad1.radius && this.y > pad1.y - pad1.height/2 && this.y < pad1.y + pad1.height/2) {
			this.x = pad1.x + pad1.radius + this.radius;
			this.dirX = Math.abs(this.dirX) * this.acceleration;
		}
		else if (this.x + this.radius > pad2.x - pad2.radius && this.y > pad2.y - pad2.height/2 && this.y < pad2.y + pad2.height/2) {
			this.x = pad2.x - pad2.radius - this.radius;
			this.dirX = -Math.abs(this.dirX) * this.acceleration;
		}
		else if (pad3 && this.y - this.radius < pad3.y + pad3.radius && this.x > pad3.x - pad3.height/2 && this.x < pad3.x + pad3.height/2) {
			this.y = pad3.y + pad3.radius + this.radius;
			this.dirY = Math.abs(this.dirY) * this.acceleration;
		}
		else if (pad4 && this.y + this.radius > pad4.y - pad4.radius && this.x > pad4.x - pad4.height/2 && this.x < pad4.x + pad4.height/2) {
			this.y = pad4.y - pad4.radius - this.radius;
			this.dirY = -Math.abs(this.dirY) * this.acceleration;
		}

		//conditions to be satisfied in order to score a goal or ball bounce back from top of the canvas
		//additionally, reset the ball to initial position when a player scores
		if (!pad3 && this.y < -this.canvasHeight/2)
			this.dirY = Math.abs(this.dirY);
		else if (!pad4 && this.y > this.canvasHeight/2)
			this.dirY = -Math.abs(this.dirY);
		else if (this.x > this.canvasWidth/2 || (pad3 && this.y > this.canvasHeight/2)) {
			player1Score.score += 1;
			this.dirX = 1 - 2 * Math.floor(Math.random() * 2);
			this.dirY = 1 - 2 * Math.floor(Math.random() * 2);
			this.x = 0;
			this.y = 0;
		} else if (this.x < -this.canvasWidth/2 || (pad4 && this.y < -this.canvasHeight/2)) {
			player2Score.score += 1;
			this.dirX = 1 - 2 * Math.floor(Math.random() * 2);
			this.dirY = 1 - 2 * Math.floor(Math.random() * 2);
			this.x = 0;
			this.y = 0;
		}
	}

	movePad(delta) {
		this.x += this.padX * this.paddleSpeed * delta;
		this.x = Math.min(this.x, this.canvasWidth/2 - this.height/2);
		this.x = Math.max(this.x, -this.canvasWidth/2 + this.height/2);

		this.y += this.padY * this.paddleSpeed * delta;
		this.y = Math.min(this.y, this.canvasHeight/2 - this.height/2);
		this.y = Math.max(this.y, -this.canvasHeight/2 + this.height/2);
	}
}
