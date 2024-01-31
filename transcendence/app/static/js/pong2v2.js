let contentManager2v2;
const scenes2v2 = [
	{ name: "gamePlay", id: "twoVtwo-gamePlay" },
	{ name: "endGame", id: "twoVtwo-endGame"}
]

const load2v2Page = () => {
	contentManager2v2 = new ContentDisplayManager({ name: scenes2v2[0].name, element: document.getElementById(scenes2v2[0].id) });
	for (let i = 1; i < scenes2v2.length; i++) {
		contentManager2v2.addContent(scenes2v2[i].name, document.getElementById(scenes2v2[i].id));
	}

	play2v2Game();
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
