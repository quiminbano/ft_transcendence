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

let modalInfo = {
	isNew: true,
	id: -1
}
const openRegisterPlayerModal = (data) => {
	modalInfo = data;
	console.log(modalInfo)
	const modalElement = document.getElementById("addNewPlayerModal");
	const bg = document.getElementById("registerNewPlayerModalBg");
	modalElement.style.display = "flex";
	bg.style.display = "flex";
	const title = document.getElementById("modalTitle");
	const submitButton = document.getElementById("modalSumbitButton");
	if (modalInfo.isNew) {
		title.innerHTML = "Add new player";
		submitButton.innerHTML = "Add";
	} else {
		title.innerHTML = "Edit player";
		submitButton.innerHTML = "Confirm";
	}
}
const closeRegisterPlayerModal = () => {
	const modalElement = document.getElementById("addNewPlayerModal");
	const bg = document.getElementById("registerNewPlayerModalBg");
	const inputField = document.getElementById("newPlayerInputName");
	inputField.value = "";
	modalElement.style.display = "none";
	bg.style.display = "none";
}

const addPlayer = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	try {
		const username = formData.get("name");
		if (modalInfo.isNew) {
			tournament.addPlayer(username);
		} else {
			tournament.editPlayer(modalInfo.id, username)
		}
		closeRegisterPlayerModal();
	} catch (error) {
		console.log(error);
	}
}

