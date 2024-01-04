let bracket;
const loadStartTournament = async () => {
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

