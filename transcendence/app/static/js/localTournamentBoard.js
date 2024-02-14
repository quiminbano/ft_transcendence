let bracket;
let contentManager;

const loadStartTournament = async () => {
	const displays = [
		{ name: "game", element: document.getElementById("localTournamentGameContent") },
		{ name: "endTournament", element: document.getElementById("localTournamentEndTournament") },
		{ name: "scorePage", element: document.getElementById("localTournamentScoreAfterMatch") }
	]
	const dashboardContent = {
		name: "dashboard",
		element: document.getElementById("localTournamentDashboardContent")
	}
	contentManager = new ContentDisplayManager(dashboardContent);
	for (let i = 0; i < displays.length; i++) {
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
	const pongGame = new Local1v1Game();
	const match = tournament.schedule.getNextMatch();
	await pongGame.startGame();
	const score = pongGame.getGameScore();
	tournament.updateScore(match.id, score.player1, score.player2);
	scoreAfterGamePageLoader(match);
	contentManager.setActive("scorePage");
	await saveTournamentMatch(match);
}

const endGamePopulator = () => {
	const titleText = document.getElementById("tournamentTitle");
	titleText.innerText = tournament.name;
	const winnerUsernameText = document.getElementById("localWinnerUsername");
	winnerUsernameText.innerText = tournament.winner;
}

const scoreAfterGamePageLoader = (match) => {
	const scoreGameStage = document.getElementById("scoreGameStage");
	scoreGameStage.innerText = match.stage;
	const scorePlayerOneName = document.getElementById("scorePlayerOneName");
	scorePlayerOneName.innerText = match.player1.name;
	const scorePlayerOnePoints = document.getElementById("scorePlayerOnePoints");
	scorePlayerOnePoints.innerText = match.score.player1Points;
	const scorePlayerTwoName = document.getElementById("scorePlayerTwoName");
	scorePlayerTwoName.innerText = match.player2.name;
	const scorePlayerTwoPoints = document.getElementById("scorePlayerTwoPoints");
	scorePlayerTwoPoints.innerText = match.score.player2Points;
	const defaultPic = "/static/images/profileIcon.png";
	const player1Picture = document.getElementById("score1v1Player1Picture");
	if (player1Picture)
		player1Picture.setAttribute("src", match.player1.picture || defaultPic);
	const player2Picture = document.getElementById("score1v1Player2Picture");
	if (player2Picture)
		player2Picture.setAttribute("src", match.player2.picture || defaultPic);
}

const continueAfterScorePage = () => {
	if (tournament.state === "A")
		contentManager.setActive("dashboard");
	else if (tournament.state === "C") {
		endGamePopulator();
		contentManager.setActive("endTournament");
	}
}

const saveTournamentMatch = async (match) => {
	const matchData = {
		teamOne: {
			players: [match.player1.name],
			score: match.score.player1Points
		},
		teamTwo: {
			players: [match.player2.name],
			score: match.score.player2Points
		},
		stage: tournament.state === "C" ? "Final" : "is not final"
	}
	await saveGameInDatabase(tournament.id, matchData);
}
