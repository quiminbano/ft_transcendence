let modal;
let currentTournamentId;
let pinModal

const loadPong = () => {
	const pinModalElement = document.getElementById("pinModal");
	if (pinModalElement) {
		pinModal = new Modal(pinModalElement);
		pinModal.open();
	}
	loadMenus();
}

const loadTournamentCreation = async () => {

}

const toggleTournamentCreationPages = (hasTournament) => {
	const hasTournamentPage = document.getElementById("tournamentExistsPage");
	const newTournamentPage = document.getElementById("newTournamentPage");
	const newTournamentButton = document.getElementById("newTournamentButton");
	newTournamentButton?.addEventListener("click", () => {
		hasTournamentPage.style.display = "none";
		newTournamentPage.style.display = "block";
	})
}

const createTournament = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const name = formData.get("tournament_name");
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

const play1v1 = () => {
	navigateTo("/pong/single");
}

const closePinModal = () => {
	pinModal.close();
}

const savePin = async (e) => {
	e.preventDefault();
	const form = new FormData(e.target);
	const pin = form.get("PIN");

	//TODO: SEND POST REQUEST TO DB TO SAVE THE PIN!!!!!!

	console.log(pin);
	pinModal.close();
}
