let bracket;
let contentManager;

const loadStartTournament = async () => {
	const displays = [
		{ name: "game", element: document.getElementById("localTournamentGameContent") },
		{ name: "endTournament", element: document.getElementById("localTournamentEndTournament") }
	]
	const dashboardContent = {
		name: "dashboard",
		element: document.getElementById("localTournamentDashboardContent")
	}
	contentManager = new ContentDisplayManager(dashboardContent);
	for (let i = 0; i < displays.length; i++) {
		console.log(displays[i]);
		contentManager.addContent(displays[i].name, displays[i].element);
	}
	await createBracket();
	generateTournamentSchedule();
}
const createBracket = async () => {
	bracket = new Bracket(document.getElementById("bracketContent"), "pongTournamentStartTitle");
	await bracket.initialize();
}
const generateTournamentSchedule = () => {
	const schedule = new Schedule(tournament.totalPlayers, tournament.players);
	tournament.setSchedule(schedule);
}
const cancelLocalTournament = () => {
	tournament = null;
	//TODO: DELETE THE LOCAL TOURNAMENT FROM THE DATABASE!!!
	navigateTo("/pong");
}

const startLocalGame = async () => {
	contentManager.setActive("game");;
	const pongGame = new LocalPongGame();
	const match = tournament.schedule.getNextMatch();
	await pongGame.startGame();
	const score = pongGame.getGameScore();
	tournament.updateScore(match.id, score.player1, score.player2);
	if (tournament.state === "A")
		contentManager.setActive("dashboard");
	else if (tournament.state === "C") {
		endGamePopulator();
		contentManager.setActive("endTournament");
	}
}

const endGamePopulator = () => {
	const titleText = document.getElementById("tournamentTitle");
	titleText.innerText = tournament.name;
	const winnerUsernameText = document.getElementById("localWinnerUsername");
	winnerUsernameText.innerText = tournament.winner;
}
