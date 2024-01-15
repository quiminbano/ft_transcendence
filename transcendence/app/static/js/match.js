class Match {
    constructor(id) {
        this.id = id;
        this.score = {
            player1Points: null,
            player2Points: null,
            asString: ""
        };
        this.completed = false;
        this.element = this.#getMatchElement(this.id);
    }
    addPlayer1(player1) { this.player1 = player1; this.updateHomeTeam(); }
    addPlayer2(player2) { this.player2 = player2; this.updateAwayTeam(); }
    #getMatchElement(id) {
        const match = document.querySelector(`.match[data-id="${id}"]`);
        return match;
    }
    updateHomeTeam() {
        const team = this.element.querySelectorAll(".team")[0];
        const teamName = team.querySelector(".teamName");
        teamName.textContent = this.player1.name;
        const teamScore = team.querySelector(".points");
        teamScore.textContent = this.score.player1Points;
    }
    updateAwayTeam() {
        const team = this.element.querySelectorAll(".team")[1];
        const teamName = team.querySelector(".teamName");
        teamName.textContent = this.player2.name;
        const teamScore = team.querySelector(".points");
        teamScore.textContent = this.score.player2Points;
    }
    addScore(player1Points, player2Points) {
        this.score.player1Points = player1Points;
        this.score.player2Points = player2Points;
        this.score.asString = player1Points + " - " + player2Points;
        this.setCompleted();
        this.updateHomeTeam();
        this.updateAwayTeam();
    }
    setCompleted() { this.completed = true; }
    updateDisplay() {
        this.updateHomeTeam();
        this.updateAwayTeam();
    }
}
