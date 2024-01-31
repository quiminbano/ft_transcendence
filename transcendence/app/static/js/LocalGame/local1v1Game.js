class Local1v1Game {
	constructor() {
		this.clock = new THREE.Clock(true);
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("localGameContainer").appendChild(this.renderer.domElement);

		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
		directionalLight.position.set(0, 8, 2);
		directionalLight.target.position.set(0, 0, 0);
		this.scene.add(directionalLight);
		this.scene.add(directionalLight.target);

		const lineMaterial = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
		const points = [];
		points.push(new THREE.Vector3(0, -50, 10));
		points.push(new THREE.Vector3(0, 50, 10));
		const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
		this.line = new THREE.Line(lineGeometry, lineMaterial);
		this.scene.add(this.line);

		const ballGeometry = new THREE.BoxGeometry(1, 1, 1);
		const ballMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00 });
		this.ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
		this.scene.add(this.ballMesh);

		const padGeometry = new THREE.BoxGeometry(1, 5, 1);
		const player1Material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
		const player2Material = new THREE.MeshPhongMaterial({ color: 0x0000FF });
		this.padMesh1 = new THREE.Mesh(padGeometry, player1Material);
		this.scene.add(this.padMesh1);

		this.padMesh2 = new THREE.Mesh(padGeometry, player2Material);
		this.scene.add(this.padMesh2);

		this.camera.position.z = 30;

		this.ball = new pongObject(0, 0, 1, 1);
		this.pad1 = new pongObject(-30, 0, 0.5, 5);
		this.pad2 = new pongObject(30, 0, 0.5, 5);
		this.player1Score = new pongObject(0, 0, 0, 0);
		this.player2Score = new pongObject(0, 0, 0, 0);
		this.gameLoop = this.gameLoop.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		document.addEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keyup", this.handleKeyUp);

		this.player1ScoreUI = document.getElementById("player1Score");
		this.player2ScoreUI = document.getElementById("player2Score");
	}

	async gameLoop(onGameOver) {
		if (this.isOver()) {
			this.player1ScoreUI.innerText = "";
			this.player2ScoreUI.innerText = "";
			this.line.material.dispose();
			this.line.geometry.dispose();
			this.ballMesh.geometry.dispose();
			this.ballMesh.material.dispose();
			this.padMesh1.geometry.dispose();
			this.padMesh1.material.dispose();
			this.padMesh2.material.dispose();
			document.getElementById("localGameContainer").removeChild(this.renderer.domElement);
			onGameOver();
		}
		else {
			const deltaTime = this.clock.getDelta();
			this.ball.moveBall(deltaTime, this.pad1, this.pad2, null, null, this.player1Score, this.player2Score);
			this.pad1.movePad(deltaTime);
			this.pad2.movePad(deltaTime);

			this.ballMesh.position.x = this.ball.x;
			this.ballMesh.position.y = this.ball.y;
			this.padMesh1.position.x = this.pad1.x;
			this.padMesh1.position.y = this.pad1.y;
			this.padMesh2.position.x = this.pad2.x;
			this.padMesh2.position.y = this.pad2.y;
			this.ballMesh.rotation.x += 2 * deltaTime;
			this.ballMesh.rotation.y += 2 * deltaTime;
			this.renderer.render(this.scene, this.camera);
			this.player1ScoreUI.innerText = this.player1Score.score;
			this.player2ScoreUI.innerText = this.player2Score.score;
			requestAnimationFrame(() => this.gameLoop(onGameOver));
		}
	}

	handleKeyDown(event) {
		switch (event.key) {
			case "w":
				this.pad1.padY = 1;
				break;
			case "s":
				this.pad1.padY = -1;
				break;
			case "ArrowUp":
				this.pad2.padY = 1;
				break;
			case "ArrowDown":
				this.pad2.padY = -1;
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