let contentManager2v2;
let current2v2players;
const scenes2v2 = [
	{ name: "chooseOpponents", id: "twoVtwo-choseeOpponents" },
	{ name: "gamePlay", id: "twoVtwo-gamePlay" },
	{ name: "endGame", id: "twoVtwo-endGame"}
]

const load2v2Page = () => {
	current2v2players = 1;
	contentManager2v2 = new ContentDisplayManager({ name: scenes2v2[0].name, element: document.getElementById(scenes2v2[0].id) });
	for (let i = 1; i < scenes2v2.length; i++) {
		contentManager2v2.addContent(scenes2v2[i].name, document.getElementById(scenes2v2[i].id));
	}
	const acceptPlayerDivs = document.querySelectorAll(".player-accepted");
	if (!acceptPlayerDivs || acceptPlayerDivs.length === 0)
		return;
	acceptPlayerDivs.forEach(div => div.style.display = "none");
	const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
	if (!play2v2ButtonArea) return;
	play2v2ButtonArea.style.display = "none";
}

const play2v2Game = async () => {
	const game = new Local2v2Game();
	await game.startGame();
	const score = game.getGameScore();
	UpdateEndGameScene2v2(score);
	contentManager2v2.setActive("endGame");
}

const UpdateEndGameScene2v2 = (score) => {
	const playerOnePointsElement = document.getElementById("playerOnePoints");
	const playerTwoPointsElement = document.getElementById("playerTwoPoints");
	playerOnePointsElement.innerText = score.player1;
	playerTwoPointsElement.innerText = score.player2;
}

const twoVtwoPlayAgain = () => {
	contentManager2v2.setActive("gamePlay");
	play2v2Game();
}

const twoVtwoContinue = () => {
	navigateTo("/pong/single");
}

const confirmPlayer = (e, playerNumber) => {
	e.preventDefault();
	const form = new FormData(e.target);
	const info = {
		username: form.get("username"),
		pin: form.get("PIN")
	}
	e.target.elements[0].value = "";
	e.target.elements[1].value = "";
	current2v2players++;
	showAcceptContent(playerNumber, info.username);
}

const showAcceptContent = (playerNumber, username) => {
	const divToHide = document.getElementById(`player${playerNumber}-register`);
	const divToShow = document.getElementById(`player${playerNumber}-accepted`);
	const playerNameOnBoard = document.getElementById(`player${playerNumber}-place-name`)
	if (!divToHide || !divToShow || !playerNameOnBoard)
		return;
	divToHide.style.display = "none";
	divToShow.style.display = "block";
	playerNameOnBoard.innerText = username;
	const playerNameDiv = document.getElementById(`player${playerNumber}-name`);
	if (!playerNameDiv)
		return;
	playerNameDiv.innerText = username;
	if (current2v2players === 4) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "block";
	}
}

const unregisterPlayer = (playerNumber) => {
	current2v2players--;
	showRegisterContent(playerNumber);
}

const showRegisterContent = (playerNumber) => {
	const divToShow = document.getElementById(`player${playerNumber}-register`);
	const divToHide = document.getElementById(`player${playerNumber}-accepted`);
	const playerNameOnBoard = document.getElementById(`player${playerNumber}-place-name`);
	if (!divToHide || !divToShow || !playerNameOnBoard)
		return;
	divToHide.style.display = "none";
	divToShow.style.display = "block";
	const playerNameDiv = document.getElementById(`player${playerNumber}-name`);
	if (!playerNameDiv)
	return;
	playerNameOnBoard.innerText = `Player ${playerNumber}`
	playerNameDiv.innerText = "";
	if (current2v2players < 4) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "none";
	}
}
