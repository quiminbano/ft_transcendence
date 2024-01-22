let matchMakingModal;
let invitedUser;
let timerToFindOpponent;
const timeToFindOpponentInSeconds = 5;
const loadPong1v1 = async () => {
	matchMakingModal = new Modal(document.getElementById("oneVoneMatchmakingModal"));
}

const openMatchmakingModal = () => {
	searchOpponent();
	matchMakingModal.open();
}
const closeMatchmakingModal = () => {
	matchMakingModal.close();
}

const searchOpponent = () => {
	//TODO: Handle all networking connections to find a match!!!
	const matchmakingBoxActive = document.getElementById("matchmakingBoxActive");
	const matchmakingBoxNonActive = document.getElementById("matchmakingBoxNonActive");
	matchmakingBoxActive.style.display = "flex";
	matchmakingBoxNonActive.style.display = "none";
	timerToFindOpponent = setTimeout(() => {
		matchmakingBoxActive.style.display = "none";
		matchmakingBoxNonActive.style.display = "flex";
		clearInterval(timerToFindOpponent);
	}, timeToFindOpponentInSeconds * 1000);
}
