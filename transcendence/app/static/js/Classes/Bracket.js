class Bracket extends Modal {
    constructor(element, titleId) {
        super(element);
        this.titleId = titleId;
    }
	async initialize() {
		const titleElement = document.getElementById(this.titleId);
		titleElement.textContent = tournament.getName();
		const templateName = `/getDoc/bracket${tournament.totalPlayers}`;
		const fragment = new FragmentGenerator(templateName);
		const html = await fragment.generateFragment();
		const bracketDiv = document.getElementById("bracketContent");
		fragment.appendFragment(html, bracketDiv);
	}
	updateBracketAfterMatch(player1, player2, element) {
        this.updateHomeTeam(player1, element);
        this.updateAwayTeam(player2, element);
	}
    updateHomeTeam(player1, element) {
        const team = element.querySelectorAll(".team")[0];
        const teamName = team.querySelector(".teamName");
        teamName.textContent = player1.name
        const teamScore = team.querySelector(".points");
        teamScore.textContent = player1.points;
    }
    updateAwayTeam(player2, element) {
        const team = element.querySelectorAll(".team")[1];
        const teamName = team.querySelector(".teamName");
        teamName.textContent = player2.name;
        const teamScore = team.querySelector(".points");
        teamScore.textContent = player2.points;
    }
    updateWinerToNextStage(nextMatch) {
        const htmlElement = document.querySelector(`.match[data-id="${nextMatch.id}"]`);
        if (nextMatch.player1)
            this.updateHomeTeam(nextMatch.player1, htmlElement);
        if (nextMatch.player2)
            this.updateAwayTeam(nextMatch.player2, htmlElement);
    }
}