class Schedule {
    constructor(amount, players) {
        this.amount = typeof amount === "string" ? parseInt(amount) : amount;
        this.matches = [];
        this.#allocateMatches();
        this.#generateMatches(players);
        this.nextGame = this.getNextMatch();
        this.currentStage = this.getCurrentStage();
        this.#updateDisplayNextGame();
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
            case 4:
                return this.#getCurrentStage4Teams();
                break;
            case 8:
                return this.#getCurrentStage8Teams();
                break;
            default:
                return this.#getCurrentStage16Teams();
        }
    }
    #getCurrentStage4Teams() {
        if (this.nextGame.id <= 2)
            return "Semi Final";
        else
            return "Final";
    }
    #getCurrentStage8Teams() {
        if (this.nextGame.id <= 4)
            return "Quarter Finals"
        else if (this.nextGame.id >= 5 && this.nextMatch.id <= 6)
            return "Semi Final"
        else
            return "Final";
    }
    #getCurrentStage16Teams() {
        if (this.nextGame.id <= 8)
            return "Round 1";
        else if (this.nextGame.id >= 9 && this.nextGame.id <= 12)
            return "Quarter Finals";
        else if (this.nextGame.id >= 13 && this.nextGame.id <= 14)
            return "Semi Final"
        else
            return "Final";
    }
    getMatch(id) {
        const match = this.matches.find(m => m.id === id);
        return match;
    } 
    updateMatchScore(id, player1Score, player2Score) {
        const match = this.matches.find(m => m.id === id);
        if (!match) return;
        match.addScore(player1Score, player2Score);
        const nextID = this.#findNextGameID(match.id);
        const element = this.matches.find(m => m.id === nextID);
        const winnerPlayer = match.score.player1Points > match.score.player2Points ? match.player1 : match.player2;
        if (match.id % 2 === 0) {
            element.addPlayer2(winnerPlayer);
        } else {
            element.addPlayer1(winnerPlayer);
        }
        this.nextGame = this.getNextMatch();
        this.#updateDisplayNextGame();
    }
    #findNextGameID = (currentId) => {
        const nextId = (currentId - 1) / 2 + this.amount / 2 + 1
        return Math.floor(nextId);
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
    editMatch(id, match) {
        const newMatch = new Match(id);
        newMatch.addPlayer1(match.player1);
        newMatch.addPlayer2(match.player2);
        const matchToEditIndex = this.matches.findIndex(m => m.id === id);
        if (matchToEditIndex === -1) return;
        this.matches[matchToEditIndex] = newMatch;
        this.updateMatchScore(match.id, match.score.player1Points, match.score.player2Points)
    } 
}
