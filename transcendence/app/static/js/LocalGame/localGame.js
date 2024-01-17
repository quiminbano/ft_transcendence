const loadLocalGame = () => {
	const canvas = document.getElementById("pongCanvas");
	const context = canvas.getContext("2d");

	const ball = new pongObject(canvas.width / 2, canvas.height / 2, 10, 10, context, canvas);
	const pad1 = new pongObject(5, 255, 25, 100, context, canvas);
	const pad2 = new pongObject(canvas.width - 30, 255, 25, 100, context, canvas);
	const player1Score = new pongObject(canvas.width / 4, canvas.height / 10, 25, 50, context, canvas);
	const player2Score = new pongObject(canvas.width * 0.75, canvas.height / 10, 25, 50, context, canvas);

	function drawObjects() {
		const net = new pongObject(canvas.width / 2 - 1, 0, 2, 10, context, canvas);

		pad1.drawPad();
		pad2.drawPad();
		ball.drawBall();
		net.drawNet();
		player1Score.drawText();
		player2Score.drawText();
	}

	function drawCanvas() {
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	function gameLoop() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawCanvas();
		ball.moveBall(pad1, pad2, player1Score, player2Score);
		pad1.movePad();
		pad2.movePad();
		drawObjects();
		requestAnimationFrame(gameLoop);
	}

	function handleKeyDown(event) {
		switch (event.key) {
			case "w":
				pad1.padY = -4;
				break;
			case "s":
				pad1.padY = 4;
				break;
			case "ArrowUp":
				pad2.padY = -4;
				break;
			case "ArrowDown":
				pad2.padY = 4;
				break;
		}
	}

	function handleKeyUp(event) {
		switch (event.key) {
			case "w":
			case "s":
				pad1.padY = 0;
				break;
			case "ArrowUp":
			case "ArrowDown":
				pad2.padY = 0;
				break;
		}
	}

	document.addEventListener("keydown", handleKeyDown);
	document.addEventListener("keyup", handleKeyUp);

	gameLoop();
}