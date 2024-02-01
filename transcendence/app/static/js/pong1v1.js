let OneVOneContentDisplay;
const scenes = [
	{ name: "chooseOpponent", id: "OneVOne-choseeOpponent"},
	{ name: "gamePlay", id: "OneVOne-gamePlay" },
	{ name: "endGame", id: "OneVOne-endGame"}
]

const loadSingle = () => {
	loadMenus();
}

const loadOneVOne = async () => {

	OneVOneContentDisplay = new ContentDisplayManager({ name: scenes[0].name, element: document.getElementById(scenes[0].id) });
	for (let i = 1; i < scenes.length; i++) {
		OneVOneContentDisplay.addContent(scenes[i].name, document.getElementById(scenes[i].id));
	}
}

const playGame = async () => {
	const game = new Local1v1Game();
	await game.startGame();
	const score = game.getGameScore();
	UpdateEndGameScene(score);
	OneVOneContentDisplay.setActive("endGame");
}

const UpdateEndGameScene = (score) => {
	const playerOnePointsElement = document.getElementById("playerOnePoints");
	const playerTwoPointsElement = document.getElementById("playerTwoPoints");
	playerOnePointsElement.innerText = score.player1;
	playerTwoPointsElement.innerText = score.player2;
}

const oneVonePlayAgain = () => {
	OneVOneContentDisplay.setActive("gamePlay");
	playGame();
}

const oneVoneContinue = () => {
	navigateTo("/pong/single");
}

const inviteOpponent1v1 = (e) => {
	e.preventDefault();
	console.log("invited friend");
	const form = new FormData(e.target);
	const username = form.get("username");
	const PIN = form.get("PIN");
	console.log(username, PIN);
}
