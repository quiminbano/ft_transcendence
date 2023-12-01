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
}

const removePlayer = (id) => {
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
	console.log("register new player")
}
