let OneVOneContentDisplay;
let currentTournament;
const scenes = [
	{ name: "chooseOpponent", id: "OneVOne-choseeOpponent" },
	{ name: "splash", id: "OneVOne-splash" },
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
	create1v1Tournament();
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
	const url = `/api/tournament/${currentTournament}/player`;
	const userToInvite = {
		player: username,
		password
	};
	//TODO Make the request to the backend to check if opponent is a valid user!!!!!
	const errorElement = document.getElementById("errorMessage1v1Invite");
	try {
		const response = await postRequest(url, userToInvite)
		console.log(response);
		if (response.succeded) {
			if (errorElement) {
				errorElement.innerText = "";
				errorElement.style.display = "none";
			}
			const opponent = {
				username: response.player.username,
				picture: response.player.picture
			}
			splash(opponent);
		} else {
			throw response;
		}
	} catch(error) {
		if (errorElement) {
			errorElement.innerText = error.error;
			errorElement.style.display = "block";
		}
	}
	hideLoadingSpinner();
}

const splash = (opponent) => {
	OneVOneContentDisplay.setActive("splash");
	const splashPlayerTwoName = document.getElementById("splashPlayerTwoName");
	if (splashPlayerTwoName)
		splashPlayerTwoName.innerText = opponent.username;
	const splashPlayerTwoPicture = document.getElementById("splashPlayerTwoPicture");
	if (splashPlayerTwoPicture)
		splashPlayerTwoPicture.setAttribute("src", opponent.picture || "/static/images/profileIcon.png");
	setTimeout(() => {
		oneVonePlay();
		const opponentName = document.getElementById("opponentName");
		if (opponentName)
			opponentName.innerText = opponent.username;
	}, 2500)
}

const create1v1Tournament = async () => {
	const url = "/api/tournament";
	try {
		const body = {
			name: "",
			number: 2,
			player: "",
		}
		const response = await postRequest(url, body);
		if (response.succeded) {
			currentTournament = response.tournament.id;
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
	}
}