let loadTournamentLobbyInfo;
let tournament;
const loadTournamentLobby = async () => {
	if (!loadTournamentLobbyInfo) {
		await navigateTo("/pong/tournament");
		return;
    }
	const data = loadTournamentLobbyInfo.tournament;
	tournament = createTournamentInstance(data.name, data.player_amount, data.id);
	tournament.setState(data.state);
	try {
		const username = JSON.parse(document.getElementById('username').textContent);
		const picture = JSON.parse(document.getElementById('picture').textContent);
		tournament.addPlayer({ name: username, picture });
	} catch (error) {
		tournament.addPlayer({ name: "Player One", undefined });
	}
}

const removePlayer = async (id) => {
    showLoadingSpinner();
	try {
		const url = `/api/tournament/${tournament.id}/player`;
		const response = await deleteRequest(url, {player: id});
		if (!response.succeded) {
			throw new Error("Failed to delete player");
		} else {
			tournament.removePlayer(id);
		}
	} catch (error) {
		console.log(error.message);
	}
    hideLoadingSpinner();
}

const openRegisterPlayerModal = () => {
	modal.open();
	const newPlayerInputName = document.getElementById("newPlayerInputName");
	if (newPlayerInputName)
		newPlayerInputName.focus();
}
const closeRegisterPlayerModal = () => {
	const addPlayerPassword = document.getElementById("addPlayerPassword");
	if (addPlayerPassword)
		addPlayerPassword.value = "";
	const newPlayerInputName = document.getElementById("newPlayerInputName");
	if (newPlayerInputName)
		newPlayerInputName.value = "";
	modal.close();
}

const addPlayerToDatabase = async (userData) => {
	showLoadingSpinner();
	const passwordElement = document.getElementById("addPlayerPassword");
	if (tournament.isRepeatedPlayer(userData.username)) {
		tournament.setErrorMessage("That name already exists");
		if (passwordElement)
			passwordElement.value = "";
		hideLoadingSpinner();
		return;
	}
	const data = {
		player: userData.username,
		password: userData.password,
	}
	const url = `/api/tournament/${tournament.id}/player`
	if (passwordElement)
		passwordElement.value = "";
	try {
		const addNewPlayerErrorMessage = document.getElementById("addNewPlayerErrorMessage");
		const response = await postRequest(url, data);
		if (response.succeded) {
			addNewPlayerErrorMessage.innerText = "";
			tournament.addPlayer({ name: response.player.username, picture: response.player.picture });
			closeRegisterPlayerModal();
		} else {
			throw response;
		}
	} catch (error) {
		addNewPlayerErrorMessage.innerText = error.error;
	}
	hideLoadingSpinner();
}

const addPlayer = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	const username = formData.get("name");
	const password  = formData.get("password");
	const data = {username, password}
	if (modal.isNew) {
		addPlayerToDatabase(data);
	}
}

const startTournament = async () => {
	await navigateTo(`${tournament.id}/start`, {"flag": true});
	tournament.setState("A");
	await loadStartTournament();
}

const openTournamentBracketModal = () => {
	bracket.open();
}

const closeTournamentBracketModal = () => {
	bracket.close();
}

const cancelAndDeleteTournament = async () => {
	const url = `/api/tournament/${tournament.id}`;
	const response = await deleteRequest(url);
	if (response.succeded) {
		navigateTo('/pong');
	} else {
		console.log("Failed to delete tournament");
	}
}
