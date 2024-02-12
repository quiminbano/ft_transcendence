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

const oneVonePlay = () => {
	OneVOneContentDisplay.setActive("gamePlay");
	playGame();
}

const oneVoneContinue = () => {
	navigateTo("/pong/single");
}

const inviteOpponent1v1 = async (e) => {
	e.preventDefault();
	showLoadingSpinner();
	const form = new FormData(e.target);
	const username = form.get("username");
	const password = form.get("password");
	const url = "";
	const userToInvite = {
		username,
		password
	};
	//TODO Make the request to the backend to check if opponent is a valid user!!!!!
	const errorElement = document.getElementById("errorMessage1v1Invite");
	try {
		const response = await postRequest(url, userToInvite)
		if (response.succeded) {
			if (errorElement) {
				errorElement.innerText = "";
				errorElement.style.display = "none";
			}
			oneVonePlay();
			const opponentName = document.getElementById("opponentName");
			if (opponentName)
				opponentName.innerText = userToInvite.username;
		} else {
			throw response;
		}
	} catch(error) {
		if (errorElement) {
			errorElement.innerText = "User doesnt exist or can't be invited";
			errorElement.style.display = "block";
		}
		console.log(error);
	}
	oneVonePlay();
	const opponentName = document.getElementById("opponentName");
	if (opponentName)
		opponentName.innerText = userToInvite.username;
	hideLoadingSpinner();
}
