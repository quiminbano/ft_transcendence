let OneVOneContentDisplay;
const scenes = [
	{ name: "gamePlay", id: "OneVOne-gamePlay" },
	{ name: "endGame", id: "OneVOne-endGame"}
]

const loadOneVOne = async () => {

	OneVOneContentDisplay = new ContentDisplayManager({ name: scenes[0].name, element: document.getElementById(scenes[0].id) });
	for (let i = 1; i < scenes.length; i++) {
		OneVOneContentDisplay.addContent(scenes[i].name, document.getElementById(scenes[i].id));
	}

	playGame();
}

const playGame = async () => {
	const game = new LocalPongGame();
	await game.startGame();
	const score = game.getGameScore();
	UpdateEndGameScene(score);
	OneVOneContentDisplay.setActive("endGame");
}

const UpdateEndGameScene = (score) => {
	console.log(score);
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
