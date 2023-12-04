let tournament;

const createTournament = async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const name = formData.get("tournamentName");
	const totalPlayers = formData.get("totalPlayers");
	const hostName = formData.get("hostName");
	console.log(name, totalPlayers, hostName);
	try {
		//Make a post request to create a tounament in database

		//if succeded to create tournament
		const id = 1 // get Proper id from db
		await navigateTo(`tournament/${id}`);
		tournament = new LocalTournament(name, totalPlayers);
		tournament.setErrorElement(document.getElementById("addNewPlayerErrorMessage"));
		tournament.setPlayersDisplay(document.getElementById("registeredPlayerBox"));
		tournament.addPlayer(hostName);
		/**********************************/
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

const editPlayerName = (id) => {
	console.log("editing player name");
}
