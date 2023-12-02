let tournament;

const createTournament = (event) => {
    event.preventDefault();
    const creationContainer = document.getElementById("tournamentCreationContainer");
    const registrationContainer = document.getElementById("pongRegistrationContainer");

    creationContainer.style.display = "none";
    registrationContainer.style.display = "block";
    const formData = new FormData(event.target);
	const name = formData.get("tournamentName");
	const totalPlayers = formData.get("totalPlayers");
	const hostName = formData.get("hostName");
	console.log(name, totalPlayers, hostName);
	tournament = new LocalTournament(name, totalPlayers);
	tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
	tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
	try {
		tournament.addPlayer(hostName);
	} catch (error) {
		console.log(error);
	}
}

const removePlayer = (id) => {
	tournament.removePlayer(id);
	console.log(`Remove player ${id} from game`);
}

const openRegisterPlayerModal = () => {
	const modalElement = document.getElementById("addNewPlayerModal");
	const bg = document.getElementById("registerNewPlayerModalBg");
	modalElement.style.display = "flex";
	bg.style.display = "flex";
}
const closeRegisterPlayerModal = () => {
	const modalElement = document.getElementById("addNewPlayerModal");
	const bg = document.getElementById("registerNewPlayerModalBg");
	modalElement.style.display = "none";
	bg.style.display = "none";
}

const addPlayer = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	try {
		tournament.addPlayer(formData.get("name"));
		closeRegisterPlayerModal();
	} catch (error) {
		console.log(error);
	}
}
