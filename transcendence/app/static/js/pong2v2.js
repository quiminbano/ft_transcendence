let contentManager2v2;
let match2v2;
const scenes2v2 = [
	{ name: "chooseOpponents", id: "twoVtwo-choseeOpponents" },
	{ name: "splash", id: "towVtwo-splash" },
	{ name: "gamePlay", id: "twoVtwo-gamePlay" },
	{ name: "endGame", id: "twoVtwo-endGame"}
]

const load2v2Page = async () => {
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
	try {
		const id = await create2v2Tournament();
		match2v2 = new Match2v2(id);
		const username = JSON.parse(document.getElementById('username').textContent);
		const picture = JSON.parse(document.getElementById('picture').textContent);
		const hostPlayer = {
			username,
			picture
		}
		match2v2.addPlayer(hostPlayer, 1);
	} catch (error) {
		navigateTo("/404");
	}
}

const play2v2Game = async () => {
	contentManager2v2.setActive("gamePlay");
	const game = new Local2v2Game();
	await game.startGame();
	const score = game.getGameScore();
	match2v2.addScore(score.player1, score.player2);
	UpdateEndGameScene2v2(score);
	contentManager2v2.setActive("endGame");
	await save2v2Match();
}

const UpdateEndGameScene2v2 = (score) => {
	const playerOnePointsElement = document.getElementById("playerOnePoints");
	const playerTwoPointsElement = document.getElementById("playerTwoPoints");
	playerOnePointsElement.innerText = score.player1;
	playerTwoPointsElement.innerText = score.player2;
	const playerPictures = [];
	playerPictures.push(document.getElementById("score2v2Player1Picture"));
	playerPictures.push(document.getElementById("score2v2Player2Picture"));
	playerPictures.push(document.getElementById("score2v2Player3Picture"));
	playerPictures.push(document.getElementById("score2v2Player4Picture"));
	if (playerPictures.length === 4) {
		for (let i = 0; i < playerPictures.length; i++) {
			playerPictures[i].setAttribute("src", match2v2.registeredPlayers[i].picture || "/static/images/profileIcon.png");
		}
	}
	for (let i = 0; i < 4; i++) {
		const element = document.getElementById(`score2v2Player${i + 1}Name`);
		if (element) {
			element.innerText = match2v2.registeredPlayers[i].username || getTranslationFor2v2() + ` ${i + 1}`;
		}
	}
}

const getTranslationFor2v2 = () => {
	let str;
	try {
		const language = JSON.parse(document.getElementById('userLanguage').textContent);
		switch (language) {
			case "fin":
				str = "Pelaaja";
				break;
			case "swe":
				str = "Spelare";
                break;
			default:
				str = "Player";
		}
	} catch (error) {
		str = "Player";
	}
	return str;
}

const twoVtwoContinue = () => {
	navigateTo("/pong/single");
}

const confirmPlayer = async (e, playerNumber) => {
	e.preventDefault();
	showLoadingSpinner();
	const form = new FormData(e.target);
	const info = {
		player: form.get("username"),
		password: form.get("password")
	}
	const url = `/api/tournament/${match2v2.id}/player`;
	const errorMessageElement = document.getElementById(`errorMessageP${playerNumber}Invite`);
	try {
		const response = await postRequest(url, info);
		if (response.succeded) {
			match2v2.addPlayer(response.player, playerNumber);
			showAcceptContent(playerNumber, response.player.username);
			e.target.elements[0].value = "";
			if (errorMessageElement) {
				errorMessageElement.innerText = "";
				errorMessageElement.style.display = "none";
			}
		} else {
			throw response;
		}
	} catch(error) {
		if (errorMessageElement) {
			errorMessageElement.innerText = error.error;
			errorMessageElement.style.display = "block";
		}
		console.log(error);
	}
	e.target.elements[1].value = "";
	hideLoadingSpinner();
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
	if (match2v2.readyToPlay) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "block";
	}
}

const unregisterPlayer = async (playerNumber) => {
	showLoadingSpinner();

	const url = `/api/tournament/${match2v2.id}/player`;
	const unregisterErrorElement = document.getElementById(`p${playerNumber}UnregisterError`);
	const usernameElement = document.getElementById(`player${playerNumber}-name`);
	if (!usernameElement)
		return;
	const username = usernameElement.innerText;
	try {
		const response = await deleteRequest(url, {player: username});
		if (response.succeded) {
			match2v2.removePlayer(username, playerNumber);
			showRegisterContent(playerNumber);
			if (unregisterErrorElement) {
				unregisterErrorElement.innerText = "";
				unregisterErrorElement.style.display = "none";
			}
		} else {
			throw response;
		}
	} catch (error) {
		if (unregisterErrorElement) {
			unregisterErrorElement.innerText = "Something happened. Try again";
			unregisterErrorElement.style.display = "block";
		}
		console.log(error);
	}
	hideLoadingSpinner();
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
	playerNameOnBoard.innerText = getTranslationFor2v2() + ` ${playerNumber}`
	playerNameDiv.innerText = "";
	if (!match2v2.readyToPlay) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "none";
	}
}

const splash2v2 = () => {
	contentManager2v2.setActive("splash");
	match2v2.registeredPlayers.forEach((player, i) => splashSetPlayerData(i + 1, player));
	setTimeout(() => {
		play2v2Game();
	}, 4000);
}

const splashSetPlayerData = (idShortcut, player) => {
	const splashPlayerName = document.getElementById(`splashPlayer${idShortcut}Name`);
	if (splashPlayerName)
		splashPlayerName.innerText = player.username;
	const splashPlayerPicture = document.getElementById(`splashPlayer${idShortcut}Picture`);
	if (splashPlayerPicture)
		splashPlayerPicture.setAttribute("src", player.picture || "/static/images/profileIcon.png");
}

const create2v2Tournament = async () => {
	showLoadingSpinner();
	const url = "/api/tournament";
	try {
		const body = {
			name: "",
			number: 4,
			player: "",
		}
		const response = await postRequest(url, body);
		if (response.succeded) {
			return response.tournament.id;
		} else {
			throw response;
		}
	} catch(error) {
		throw error;
	}
	hideLoadingSpinner();
}

const play2v2Again = async () => {
	showLoadingSpinner();
	const id = await create2v2Tournament();
	match2v2.id = id;
	hideLoadingSpinner();
	play2v2Game();
}

const save2v2Match = async () => {
	const matchData = {
		teamOne: {
			players: [match2v2.teamOne[0].username, match2v2.teamOne[1].username],
			score: match2v2.score.teamOne
		},
		teamTwo: {
			players: [match2v2.teamTwo[0].username, match2v2.teamTwo[1].username],
			score: match2v2.score.teamTwo
		},
		stage: "Final"
	}
	await saveGameInDatabase(match2v2.id, matchData);
}