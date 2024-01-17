let bracket;
let contentManager;
const localTournamentScenes = ["dashboard", "game", "endGame"];
const loadStartTournament = async () => {
	const dashboardContent = {
		name: "dashboard",
		element: document.getElementById("localTournamentDashboardContent")
	}
	contentManager = new ContentDisplayManager(dashboardContent);
	contentManager.addContent("game", document.getElementById("localTournamentGameContent"));
	console.log(contentManager.contentList);
	await createBracket();
	generateTournamentSchedule();
}
const createBracket = async () => {
	bracket = new Modal(document.getElementById("bracketContent"));
	const titleElement = document.getElementById("pongTournamentStartTitle");
	titleElement.textContent = tournament.getName();
	const templateName = `/getDoc/bracket${tournament.totalPlayers}`;
	const fragment = new FragmentGenerator(templateName);
	const html = await fragment.generateFragment();
	const bracketDiv = document.getElementById("bracketContent");
	fragment.appendFragment(html, bracketDiv);
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

const startLocalGame = () => {
	contentManager.setActive("game");;
	countdown(3);
}

const countdown = (seconds) => {
	const gameCountdownText = document.getElementById("gameCountdownText");
	gameCountdownText.innerText = seconds;
	if (seconds > 0) {
		setTimeout(() => {
			countdown(seconds - 1);
		}, 1000);
	} else {
		gameCountdownText.style.display = "none";
		loadLocalGame();
	}
}

