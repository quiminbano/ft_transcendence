let loadTournamentLobbyInfo;
let t;
const loadTournamentLobby = async () => {
	if (!loadTournamentLobbyInfo) {
		await navigateTo("/pong/tournament");
		return;
    }
	const data = loadTournamentLobbyInfo.tournament;
	t = createTournamentInstance(data.name, data.amount, data.id);
	data.players.forEach(player => {
		try {
			t.addPlayer({ name: player.name, id: player.id });
		} catch (error) {
			console.log(error.message);
		}
	});
}

const editPlayer = async (username) => {
    const url = "/api/tournament/player"
    const data = { id: modal.getPlayerId(), username };
	const response = await putRequest(url, data);
	if (response.succeded) {
		t.editPlayer(modal.getPlayerId(), username)
		closeRegisterPlayerModal();
	} else {
		console.log(response);
	}
}

const removePlayer = async (id) => {
    showLoadingSpinner();
	//properly make a delete request to remove player from DB!!!
	try {
		const url = `/api/tournament/player/${id}`;
		const response = await deleteRequest(url);
		console.log(response);
		if (!response.succeded) {
			throw new Error("Failed to delete player");
		} else {
			t.removePlayer(id);
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
	if (t.isRepeatedPlayer(username)) {
		t.setErrorMessage("That name already exists");
		return;
	}
	const data = {
		player: username,
		id: t.id
	}
	const url = "/api/tournament/player"
	try {
		const response = await postRequest(url, data);
		if (response.succeded) {
			t.addPlayer({ name: response.player.name, id: response.player.id });
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
	await navigateTo(`${t.id}/start`);
	await loadStartTournament();
}

const openTournamentBracketModal = () => {
	bracket.open();
}

const closeTournamentBracketModal = () => {
	bracket.close();
}

const cancelAndDeleteTournament = async () => {
	const url = `/api/tournament/${t.id}`;
	const response = await deleteRequest(url);
	if (response.succeded) {
		navigateTo('/pong');
	} else {
		console.log("Failed to delete tournament");
	}
}

const loadStartTournament = async () => {
	bracket = new Modal(document.getElementById("bracketContent"));
	const titleElement = document.getElementById("pongTournamentStartTitle");
	titleElement.textContent = t.getName();
	const templateName = `/getDoc/bracket${t.totalPlayers}`;
	const fragment = new FragmentGenerator(templateName);
	const html = await fragment.generateFragment();
	const bracketDiv = document.getElementById("bracketContent");
	fragment.appendFragment(html, bracketDiv);
	const schedule = new Schedule(t.totalPlayers, t.players);
	t.setSchedule(schedule);
}
