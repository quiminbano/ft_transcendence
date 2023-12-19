class Match {
    constructor(player1, player2, id) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = id;
        this.score = {
            player1Points: null,
            player2Points: null,
            asString: ""
        };
        this.completed = false;
        this.element = this.#getMatchElement(this.id);
        this.updateField();
    }
    #getMatchElement(id) {
        const match = document.querySelector(`.match[data-id="${id}"]`);
        console.log(match);
        return match;
    }
    updateField() {
        const teamElement = this.element.querySelectorAll(".team");
        this.#updateHomeTeam(teamElement[0]);
        this.#updateAwayTeam(teamElement[1]);
    }
    #updateHomeTeam(team) {
        const teamName = team.querySelector(".teamName");
        teamName.textContent = this.player1.name;
        const teamScore = team.querySelector(".points");
        teamScore.textContent = this.score.player1Points;
    }
    #updateAwayTeam(team) {
        const teamName = team.querySelector(".teamName");
        teamName.textContent = this.player2.name;
        const teamScore = team.querySelector(".points");
        teamScore.textContent = this.score.player2Points;
    }
    addScore(player1Points, player2Points) {
        this.score.player1Points = player1Points;
        this.score.player2Points = player2Points;
        this.score.asString = player1Points + "" + player2Points;
        this.setCompleted();
        this.updateField();
    }
    setCompleted() { this.completed = true; }
}
