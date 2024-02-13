let OneVOneContentDisplay;
let match1v1;
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
	try {
		const id = await create1v1Tournament();
		match1v1 = new Match(id);
		const username = JSON.parse(document.getElementById('username').textContent);
		const picture = JSON.parse(document.getElementById('picture').textContent);
		match1v1.addPlayer1({username, picture})
		console.log("match: ", match1v1);
	} catch (error) {
		console.log(error);
	}
}

const playGame = async () => {
	const game = new Local1v1Game();
	await game.startGame();
	const score = game.getGameScore();
	UpdateEndGameScene(score);
	OneVOneContentDisplay.setActive("endGame");
	match1v1.addScore(score.player1, score.player2);
	await save1v1Score();
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
	const url = `/api/tournament/${match1v1.id}/player`;
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
			match1v1.addPlayer2(opponent);
			console.log(match1v1);
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
			return response.tournament.id;
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
		throw error;
	}
}

const save1v1Score = async () => {
	const url = `/api/tournament/${match1v1.id}/match`;
	try {
		console.log(match1v1);
		const score = {
			teamOne: {
				players:[match1v1.player1.username],
				score: match1v1.score.player1Points
			},
			teamTwo: {
				players: [match1v1.player2.username],
				score: match1v1.score.player2Points
			},
			stage: "Final"
		}
		console.log("score: ", score);
		const response = await postRequest(url, {score: match1v1.score});
		console.log(response);
		if (response.succeded) {
			console.log(response);
		} else {
			throw response;
		}
	} catch (error) {
		console.log(error);
	}
}

const play1v1Again = async () => {
	try {
		const id = await create1v1Tournament();
		const tempMatch = new Match(id);
		tempMatch.addPlayer1(match1v1.player1);
		tempMatch.addPlayer2(match1v1.player2);
		match1v1 = tempMatch;
		console.log("current Match: ", match1v1);
		oneVonePlay();
	} catch (error) {
		console.log(error);
	}
}
