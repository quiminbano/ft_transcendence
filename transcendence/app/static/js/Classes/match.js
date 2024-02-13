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
    addPlayer1(player1) { this.player1 = player1; }
    addPlayer2(player2) { this.player2 = player2; }
    #getMatchElement(id) {
        const match = document.querySelector(`.match[data-id="${id}"]`);
        return match;
    }
    addScore(player1Points, player2Points) {
        this.score.player1Points = player1Points;
        this.score.player2Points = player2Points;
        this.score.asString = player1Points + " - " + player2Points;
        this.setCompleted();
    }
    setCompleted() { this.completed = true; }
}
