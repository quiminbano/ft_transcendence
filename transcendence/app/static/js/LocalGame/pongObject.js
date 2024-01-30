class pongObject {
	constructor(x, y, radius, height) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.height = height;
		this.dirX = 0.1;
		this.dirY = 0.1;
		this.padY = 0;
		this.ballSpeed = 0.1;
		this.acceleration = 1.25;
		this.score = 0;
		this.canvasWidth = 60;
		this.canvasHeight = 45;
	}

	moveBall(pad1, pad2, player1Score, player2Score) {
		this.x += this.dirX * 3;
		this.y += this.dirY * 3;

		if (this.x - this.radius < pad1.x + pad1.radius && this.y > pad1.y - pad1.height/2 && this.y < pad1.y + pad1.height/2) {
			this.x = pad1.x + pad1.radius + this.radius
			this.dirX = Math.abs(this.dirX) * this.acceleration;
		}
		else if (this.x + this.radius > pad2.x - pad2.radius && this.y > pad2.y - pad2.height/2 && this.y < pad2.y + pad2.height/2) {
			this.x = pad2.x - pad2.radius - this.radius
			this.dirX = -Math.abs(this.dirX) * this.acceleration;
		}

		//conditions to be satisfied in order to score a goal or ball bounce back from top of the canvas
		//additionally, reset the ball to initial position when a player scores
		if (this.y > this.canvasHeight/2 || this.y < -this.canvasHeight/2)
			this.dirY = -this.dirY;
		else if (this.x > this.canvasWidth/2) {
			player1Score.score += 1;
			this.dirX = -this.ballSpeed;
			this.dirY = this.ballSpeed;
			this.x = 0;
			this.y = 0;
		} else if (this.x < -this.canvasWidth/2) {
			player2Score.score += 1;
			this.dirX = this.ballSpeed;
			this.dirY = this.ballSpeed;
			this.x = 0;
			this.y = 0;
		}
	}

	movePad() {
		this.y += this.padY;
		this.y = Math.min(this.y, this.canvasHeight/2 - this.height/2)
		this.y = Math.max(this.y, -this.canvasHeight/2 + this.height/2)
	}
}
