let modal;
let currentTournamentId;

const loadPong = () => {
	loadMenus();
}

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
		loadTournamentLobbyInfo = response;
		await navigateTo(`tournament/${response.tournament.id}`);
	} catch (error) {
		console.log(error);
	}
}

const createTournamentInstance = (name, amount, id) => {
	modal = new AddPlayerModal();
	const tournament = new LocalTournament(name, amount, id);
	tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
	tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
	return tournament;
}

const continuePreviousTournament = async () => {
	await navigateTo(`/pong/tournament/${currentTournamentId}`);
}

const play1v1 = () => {
	navigateTo("/pong/1v1");
}
