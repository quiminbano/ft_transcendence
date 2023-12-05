let tournament;
let modal;

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
		modal = new Modal();
		tournament = new LocalTournament(name, totalPlayers, id);
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

let modalInfo = {
	isNew: true,
	id: -1
}
const openRegisterPlayerModal = (data) => {
	modal.setData(data);
	modalInfo = data;
	modal.open();
}
const closeRegisterPlayerModal = () => {
	modal.close();
}

const addPlayer = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	try {
		const username = formData.get("name");
		if (modal.isNew) {
			tournament.addPlayer(username);
		} else {
			tournament.editPlayer(modal.getPlayerId(), username)
		}
		closeRegisterPlayerModal();
	} catch (error) {
		console.log(error);
	}
}

const startTournament = async () => {
	await navigateTo(`${tournament.id}/start`);
}
