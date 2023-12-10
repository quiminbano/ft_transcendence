let loadTournamentLobbyInfo;
let t;
const loadTournamentLobby = async () => {
    if (!loadTournamentLobbyInfo) {
        await navigateTo("/pong/tournament");
        return;
    }
    const data = loadTournamentLobbyInfo.tournament;
    t = createTournamentInstance(data.name, data.amount, data.id);
    if (loadTournamentLobbyInfo.hasTournament) {
        data.players.forEach(player => tournament.addPlayer({ name: player.name, id: player.id }));
    }
    else if (data.addPlayer) {
        addPlayerToDatabase(data.addPlayer);
    }
}

const editPlayer = async (username) => {
    const url = "/api/tournament/player"
    const data = { id: modal.getPlayerId(), username };
    const response = await putRequest(url, data);
    if (response.succeded) {
        t.editPlayer(modal.getPlayerId(), username)
        closeRegisterPlayerModal();
    }
}

const removePlayer = async (id) => {
    showLoadingSpinner();
    //properly make a delete request to remove player from DB!!!
    t.removePlayer(id);
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
	const data = {
		player: username,
		id: t.id
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
	bracket = new Modal(document.getElementById("bracketModal"));
}

const openTournamentBracketModal = () => {
	bracket.open();
}

const closeTournamentBracketModal = () => {
	console.log("Closing the modal");
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