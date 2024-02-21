class Schedule {
    constructor(amount, players) {
        this.amount = typeof amount === "string" ? parseInt(amount) : amount;
        this.matches = [];
        this.#allocateMatches();
        this.#generateMatches(players);
        this.nextGame = this.getNextMatch();
        this.currentStage = this.getCurrentStage();
        this.#updateDisplayNextGame();
        this.totalMatchesToPlay = this.#getTotalAmountOfMatches(this.amount);
        this.totalmatches_played = 0;
    }
    #getTotalAmountOfMatches(totalTeams) {
        switch (totalTeams) {
            case 4:
                return 3;
                break;
            case 8:
                return 7;
                break;
            case 16:
                return 15;
                break;
            default:
                return 0;
        }
    }
    #allocateMatches() {
        const totalMatches = this.#getTotalAmountOfMatches(this.amount);
        for (let i = 0; i < totalMatches; i++) {
            const match = new Match(i + 1);
            this.matches.push(match);
        }
    }
    #generateMatches(players = []) {
        let playersCopy = [];
        players.forEach(player => playersCopy.push(player));
        let sortedPlayers = this.#sortPlayers(playersCopy);
        this.remainingPlayers = sortedPlayers;
        this.#populateMatches(this.remainingPlayers);
    }
    #populateMatches(players) {
        for (let i = 0, j = 0; i < players.length; i += 2) {
            const player1 = players[i];
            const player2 = players[i + 1];
            const match = this.matches[j];
            match.addPlayer1(player1);
            match.addPlayer2(player2);
            j++;
        }
    }
    #sortPlayers(players) {
        const sortedPlayers = [];
        while (players.length > 0) {
            const player = this.#getRandomPlayer(players);
            sortedPlayers.push(player);
            players = players.filter(p => p.name !== player.name)
        }
        return sortedPlayers;
    }
    #getRandomPlayer(players = []) {
        const random = Math.floor(Math.random() * players.length);
        return players[random];
    }
    getNextMatch() {
        const nextMatch = this.matches.find(match => match.completed === false);
        return nextMatch;
    }
    getCurrentStage() {
        switch (this.amount) {
            case 8:
                return this.#getCurrentStage8Teams();
                break;
            default:
                return this.#getCurrentStage4Teams();
        }
    }
    #getCurrentStage4Teams() {
        if (this.nextGame.id <= 2)
            return this.#getTranslatedStage("Semi Final");
        else
            return this.#getTranslatedStage("Final");
    }
    #getCurrentStage8Teams() {
        if (this.nextGame.id <= 4)
            return this.#getTranslatedStage("Quarter Finals")
        else if (this.nextGame.id >= 5 && this.nextGame.id <= 6)
            return this.#getTranslatedStage("Semi Final")
        else
            return this.#getTranslatedStage("Final");
    }
	#getTranslatedStage(stage) {
		let text;
		try {
			const language = JSON.parse(document.getElementById('currentLanguage').textContent);
			switch(stage) {
				case "Quarter Finals":
					switch(language) {
						case "fin":
							text = "puolivälierä";
							break;
						case "swe":
							text = "Kvartsfinaler";
							break;
						default:
							text = stage;
					}
					break;
				case "Semi Final":
					switch(language) {
						case "fin":
							text = "Välierä";
							break;
						case "swe":
							text = "Semifinal";
							break;
						default:
							text = stage;
					}
					break;
				case "Final":
					switch(language) {
						case "fin":
							text = "Finaali";
							break;
						case "swe":
							text = "Final";
							break;
						default:
							text = stage;
					}
					break;
				default:
					text = stage;
			}
		} catch(error) {
			text = stage;
		}
		return text;
	}
    getMatch(id) {
        const match = this.matches.find(m => m.id === id);
        return match;
    }
    updateMatchScore(id, player1Score, player2Score) {
        this.totalmatches_played++;
        const match = this.matches.find(m => m.id === id);
        if (!match) return;
        match.addScore(player1Score, player2Score);
        if (this.areAllGamesPlayed())
            return;
        this.#addWinnerToNextStage(match);
        this.nextGame = this.getNextMatch();
        this.#updateDisplayNextGame();
    }
    #findNextGameID = (currentId) => {
        const nextId = (currentId - 1) / 2 + this.amount / 2 + 1
        return Math.floor(nextId);
    }
    #addWinnerToNextStage(currentMatch) {
        const nextMatch = this.getWinnersNextMatch(currentMatch);
        const winnerPlayer = currentMatch.score.player1Points > currentMatch.score.player2Points ? currentMatch.player1 : currentMatch.player2;
        if (this.areAllGamesPlayed())
            return;
        if (currentMatch.id % 2 === 0) {
            nextMatch.addPlayer2(winnerPlayer);
        } else {
            nextMatch.addPlayer1(winnerPlayer);
        }
    }
    #updateDisplayNextGame() {
        const nextHomePlayer = document.getElementById("nextHomePlayerName");
        const nextAwayPlayer = document.getElementById("nextAwayPlayerName");
        const nextMatch = this.getNextMatch();
        nextHomePlayer.textContent = nextMatch.player1.name;
        nextAwayPlayer.textContent = nextMatch.player2.name;
        const matchRound = document.getElementById("matchRound");
        this.currentStage = this.getCurrentStage();
        matchRound.textContent = this.currentStage;
    }
    getWinnersNextMatch(currentMatch) {
        const nextID = this.#findNextGameID(currentMatch.id);
        const nextMatch = this.matches.find(m => m.id === nextID);
        return nextMatch;
    }
    editMatch(id, match) {
        const newMatch = new Match(id);
        newMatch.addPlayer1(match.player1);
        newMatch.addPlayer2(match.player2);
        const matchToEditIndex = this.matches.findIndex(m => m.id === id);
        if (matchToEditIndex === -1) return;
        this.matches[matchToEditIndex] = newMatch;
        this.updateMatchScore(match.id, match.score.player1Points, match.score.player2Points)
    }
    areAllGamesPlayed() {
        if (this.totalmatches_played >= this.totalMatchesToPlay)
            return true;
        return false;
    }
}
