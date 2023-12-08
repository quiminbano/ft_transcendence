let tournament;
let modal;
let bracket;

const loadTournamentCreation = async () => {
	console.log("Loading tournament")
	showLoadingSpinner();
	const url = "/api/tournament"
	let hasTournament;
	try {
		const response = await fetch(url);
		if (response.ok)
			hasTournament = true;
		else
			hasTournament = false;

	} catch (error) {
		console.log(error);
	}
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

		//SHOULD NAVIGATE TO TOURNAMENT PAGE!! ALSO CREATE AND UPDATE A LOCALTOURNAMENT INSTANCE!!!!!!!
	})
	if (hasTournament) {
		newTournamentPage.style.display = "none";
	} else {
		hasTournamentPage.style.display = "none";
	}
	hideLoadingSpinner();
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
		await navigateTo(`tournament/${info.id}`);
		modal = new AddPlayerModal();
		tournament = new LocalTournament(info.name, info.amount, info.id);
		tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
		tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
		addPlayerToDatabase(hostName);
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
	console.log(response);
	navigateTo('/pong');
}
const continuePreviousTournament = async () => {
	const url = `/api/tournament/${tournament.id}`;
	const response = await fetch(url);
	const data = JSON.parse(response);
	console.log(data);

	await navigateTo(`tournament/${info.id}`);
	modal = new AddPlayerModal();
	tournament = new LocalTournament(info.name, info.amount, info.id); // GIVE PROPER VALUES FOR INITIALIZATION!!!!
	tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
	tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
	//TODO: POPULATE THE PAYERS AND MATCHES FROM THE TOURNAMENT!!!!
}
