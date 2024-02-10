let contentManager2v2;
let current2v2players;
const opponents = [];
const scenes2v2 = [
	{ name: "chooseOpponents", id: "twoVtwo-choseeOpponents" },
	{ name: "splash", id: "towVtwo-splash" },
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
	contentManager2v2.setActive("gamePlay");
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

const twoVtwoContinue = () => {
	navigateTo("/pong/single");
}

const confirmPlayer = async (e, playerNumber) => {
	e.preventDefault();
	showLoadingSpinner();
	const form = new FormData(e.target);
	const info = {
		username: form.get("username"),
		pin: form.get("PIN")
	}

	const url = ""; //TODO: ADD THE PROPER URL!!!!!
	const errorMessageElement = document.getElementById(`errorMessageP${playerNumber}Invite`);
	try {
		const response = await postRequest(url, info);
		if (response.succeeded) {
			opponents.push({ username: info.username, picture: undefined });
			current2v2players++;
			showAcceptContent(playerNumber, info.username);
			if (errorMessageElement) {
				errorMessageElement.innerText = "";
				errorMessageElement.style.display = "none";
			}
		} else {
			throw response;
		}
	} catch(error) {
		if (errorMessageElement) {
			errorMessageElement.innerText = "Invalid user";
			errorMessageElement.style.display = "block";
		}
		console.log(error);
	}
	e.target.elements[0].value = "";
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
	if (current2v2players === 4) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "block";
	}
}

const unregisterPlayer = (playerNumber) => {
	showLoadingSpinner();
	current2v2players--;

	const url = ""; //TODO: USE THE CORRECT URL FOR THIS DELETION!!!!!!!
	const unregisterErrorElement = document.getElementById(`p${playerNumber}UnregisterError`);
	try {
		const response = deleteRequest(url);
		if (response.succeeded) {
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
	playerNameOnBoard.innerText = `Player ${playerNumber}`
	playerNameDiv.innerText = "";
	if (current2v2players < 4) {
		const play2v2ButtonArea = document.getElementById("play2v2ButtonArea");
		if (!play2v2ButtonArea) return;
		play2v2ButtonArea.style.display = "none";
	}
}

const splash2v2 = () => {
	contentManager2v2.setActive("splash");
	opponents.forEach((opponent, i) => splashSetPlayerData(i + 2, opponent));
	setTimeout(() => {
		while (opponents.length)
			opponents.pop();
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
