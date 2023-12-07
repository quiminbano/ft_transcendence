let tournament;
let modal;
let bracket;

const createTournament = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const name = formData.get("tournamentName");
	const totalPlayers = formData.get("totalPlayers");
	const hostName = formData.get("hostName");
	try {
		//Make a post request to create a tounament in database
		const url = "/api/tournament"
		const data = {
			name,
			number: totalPlayers,
			player: hostName
		}
		const response = await postRequest(url, data);
		const info = response.tournament;
		await navigateTo(`tournament/${info.id}`);
		modal = new AddPlayerModal();
		tournament = new LocalTournament(info.name, info.amount, info.id);
		tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
		tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
		tournament.addPlayer(hostName);
	} catch (error) {
		console.log(error);
	}
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
		id: tournament.id
	}
	const url  = "/api/tournament/player"
	try {
		const response = await postRequest(url, data);
		if (response.succeded) {
			tournament.addPlayer(response.player.name);
			closeRegisterPlayerModal();
		} else {
			console.log("Response not ok")
		}
	} catch(error) {
		console.log(error);
	}
}

const editPlayer = async (username, tournamentId) => {
	const url  = "/api/tournament/player"
	const data = { username, id: tournamentId };
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
		editPlayer(username, tournament.id);
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
