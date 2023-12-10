let tournament;
let modal;
let bracket;
let currentTournamentId;

const loadTournamentCreation = async () => {
	showLoadingSpinner();
	const tournamentInfo = await checkIfThereIsTournamentAlready();
	toggleTournamentCreationPages(tournamentInfo.hasTournament);
	if (tournamentInfo.hasTournament) {
		currentTournamentId = tournamentInfo.tournament.id;
	}
	loadTournamentLobbyInfo = tournamentInfo;
	hideLoadingSpinner();
}

const checkIfThereIsTournamentAlready = async () => {
	const url = "/api/tournament";
	const response = await getRequest(url)
	if (!response.succeded)
		response.hasTournament = false;
	else
		response.hasTournament = true;
	return response;
}

const toggleTournamentCreationPages = (hasTournament) => {
	const hasTournamentPage = document.getElementById("tournamentExistsPage");
	const newTournamentPage = document.getElementById("newTournamentPage");
	const newTournamentButton = document.getElementById("newTournamentButton");
	newTournamentButton?.addEventListener("click", () => {
		hasTournamentPage.style.display = "none";
		newTournamentPage.style.display = "block";
	})
	const continueOldTournamentButton = document.getElementById("continueOldTournamentButton");
	continueOldTournamentButton?.addEventListener("click", () => {
		hasTournamentPage.style.display = "none";
		newTournamentPage.style.display = "none";
		continuePreviousTournament();
	})
	if (hasTournament) {
		newTournamentPage.style.display = "none";
	} else {
		hasTournamentPage.style.display = "none";
	}
}

const createTournament = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const name = formData.get("tournamentName");
	const totalPlayers = formData.get("totalPlayers");
	const hostName = formData.get("hostName");
	try {
		const url = "/api/tournament"
		const data = {
			name,
			number: totalPlayers,
			player: hostName
		}
		const response = await postRequest(url, data);
		const info = response.tournament;
		loadTournamentLobbyInfo = {
			message: "Must create new tournament",
			tournament: {
				name: info.name,
				amount: info.amount,
				id: info.id,
				addPlayer: hostName
			}
		}
		await navigateTo(`tournament/${info.id}`);
	} catch (error) {
		console.log(error);
	}
}

const createTournamentInstance = (name, amount, id) => {
	modal = new AddPlayerModal();
	tournament = new LocalTournament(name, amount, id);
	tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
	tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
	return tournament;
}

const removePlayer = async (id) => {
	showLoadingSpinner();
	//properly make a delete request to remove player from DB!!!
	tournament.removePlayer(id);
	console.log(`Remove player ${id} from game`);
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
	const url  = "/api/tournament/player"
	try {
		const response = await postRequest(url, data);
		if (response.succeded) {
			console.log(response)
			tournament.addPlayer({name: response.player.name, id: response.player.id});
			closeRegisterPlayerModal();
		} else {
			console.log("Response not ok")
		}
	} catch(error) {
		console.log(error);
	}
}

const editPlayer = async (username) => {
	const url  = "/api/tournament/player"
	const data = {id: modal.getPlayerId(), username };
	const response = await putRequest(url, data);
	if (response.succeded) {
		tournament.editPlayer(modal.getPlayerId(), username)
		closeRegisterPlayerModal();
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
const continuePreviousTournament = async () => {
	const url = `/api/tournament/${currentTournamentId}`;
	const response = await getRequest(url);
	if (!response.succeded) {
		console.log(response.error);
		return;
	}
	await navigateTo(`/pong/tournament/${response.tournament.id}`);
}
