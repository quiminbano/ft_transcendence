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

	//TODO: MAKE SURE DATABASE RETURNS THE STATE ACTIVE IF TOURNAMENT AS STARTED ALREADY!!!!

	data.players.forEach(player => {
		try {
			tournament.addPlayer({ name: player.name, id: player.id });
		} catch (error) {
			console.log(error.message);
		}
	});

	if (tournament.state === "A") {
		await navigateTo(`/pong/tournament/${tournament.id}/start`, {"flag": true});
		await loadStartTournament();
		//TODO: DATABASE SHOULD RETURN MATCHES AS WELL!!!!
		data.matches.forEach(match => tournament.schedule.editMatch(match.id, match));
	}
}

const editPlayer = async (username) => {
    const url = "/api/tournament/player"
    const data = { id: modal.getPlayerId(), username };
	const response = await putRequest(url, data);
	if (response.succeded) {
		tournament.editPlayer(modal.getPlayerId(), username)
		closeRegisterPlayerModal();
	} else {
		console.log(response);
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

const openRegisterPlayerModal = (data) => {
	modal.setData(data);
	modal.open();
}
const closeRegisterPlayerModal = () => {
	modal.close();
}

const addPlayerToDatabase = async (userData) => {
	if (tournament.isRepeatedPlayer(userData.username)) {
		tournament.setErrorMessage("That name already exists");
		return;
	}
	const data = {
		player: userData.username,
		password: userData.password,
	}
	const url = `/api/tournament/${tournament.id}/player`
	const passwordElement = document.getElementById("addPlayerPassword");
	if (passwordElement)
		passwordElement.value = "";
	try {
		const addNewPlayerErrorMessage = document.getElementById("addNewPlayerErrorMessage");
		const response = await postRequest(url, data);
		if (response.succeded) {
			addNewPlayerErrorMessage.innerText = "";
			tournament.addPlayer({ name: response.player.username, id: response.player.id || 0 });
			closeRegisterPlayerModal();
		} else {
			throw response;
		}
	} catch (error) {
		addNewPlayerErrorMessage.innerText = error.error;
		console.log(error);
	}
}

const addPlayer = (event) => {
	event.preventDefault();
	showLoadingSpinner();
	const formData = new FormData(event.target);
	const username = formData.get("name");
	const password  = formData.get("password");
	const data = {username, password}
	if (modal.isNew) {
		addPlayerToDatabase(data);
	} else {
		editPlayer(username);
	}
	hideLoadingSpinner();
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
