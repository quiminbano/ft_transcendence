let modal;
let currentTournamentId;

const loadPong = () => {
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
	let hostName;
	try {
		const username = JSON.parse(document.getElementById('username').textContent);
		hostName = username;
	} catch (error) {
		hostName = "";
	}
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
