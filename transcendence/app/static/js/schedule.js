class Schedule {
    constructor(amount, players) {
        this.amount = amount;
        this.matches = [];
        this.#generateMatches(players);
        this.nextGame = this.#getNextMatch();
    }
    #generateMatches(players = []) {
        let playersCopy = [];
        players.forEach(player => playersCopy.push(player));
        let sortedPlayers = this.#sortPlayers(playersCopy);
        this.#populateMatches(sortedPlayers);
    }
    #populateMatches(players) {
        for (let i = 0; i < players.length; i += 2) {
            const player1 = players[i];
            const player2 = players[i + 1];
            const match = new Match(player1, player2, this.matches.length + 1);
            this.matches.push(match);
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
    #getNextMatch() {
        const nextMatch = this.matches.find(match => match.completed === false);
        return nextMatch;
    }
}
