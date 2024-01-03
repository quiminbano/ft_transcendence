let loadTournamentLobbyInfo;
let tournament;
const loadTournamentLobby = async () => {
	if (!loadTournamentLobbyInfo) {
		await navigateTo("/pong/tournament");
		return;
    }
	const data = loadTournamentLobbyInfo.tournament;
	tournament = createTournamentInstance(data.name, data.amount, data.id);
	tournament.setState(data.state);

	//TODO: MAKE SURE DATABASE RETURNS THE STATE ACTIVE IF TOURNAMENT AS STARTED ALREADY!!!!

	data.players.forEach(player => {
		try {
			tournament.addPlayer({ name: player.name, id: player.id });
		} catch (error) {
			console.log(error.message);
		}
	});

	//TODO: UPDATE THE MATCHES AND MOVE TO THE TOURNAMENT BOARD!!!!!
	if (tournament.state === "A") {
		await navigateTo(`/pong/tournament/${tournament.id}/start`);
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
		const url = `/api/tournament/player/${id}`;
		const response = await deleteRequest(url);
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

const addPlayerToDatabase = async (username) => {
	if (tournament.isRepeatedPlayer(username)) {
		tournament.setErrorMessage("That name already exists");
		return;
	}
	const data = {
		player: username,
		id: tournament.id
	}
	const url = "/api/tournament/player"
	try {
		const response = await postRequest(url, data);
		if (response.succeded) {
			tournament.addPlayer({ name: response.player.name, id: response.player.id });
			closeRegisterPlayerModal();
		} else {
			console.log("Response not ok")
		}
	} catch (error) {
		console.log(error);
	}
}

const addPlayer = (event) => {
	event.preventDefault();
	showLoadingSpinner();
	const formData = new FormData(event.target);
	const username = formData.get("name");
	if (modal.isNew) {
		addPlayerToDatabase(username);
	} else {
		editPlayer(username);
	}
	hideLoadingSpinner();
}

const startTournament = async () => {
	await navigateTo(`${tournament.id}/start`);
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
