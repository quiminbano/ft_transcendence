class LocalTournament {
    constructor(name, totalPlayers) {
        #this.name = name;
        #this.totalPlayers = totalPlayers;
        #this.players = [];
        #this.nextId = 0;
        #this.errorElement = "";
        #this.playersDisplay = ""
        document.getElementById("tournamentTitle").innerHTML = name;
        #this.currentPlayersText = document.getElementById("currentNumberPlayers");
    }
    #updateCurrentPlayersText() {
        this.currentPlayersText.innerHTML = `${this.players.length} / ${this.totalPlayers}`;
    }
    addPlayer(name) {
        if (this.players.length >= this.totalPlayers)
            throw new Error("Lobby is full");
        if (this.players.find(p => p.name === name)) {
            const errorMessage = "That name already exists";
            this.errorElement.innerHTML = errorMessage;
            throw new Error(errorMessage);
        }
        const newPlayer = {
            id: this.nextId,
            name: name
        };
        this.nextId++;
        this.players.push(newPlayer);
        this.#updateCurrentPlayersText();
        console.log(this.players);
        this.errorElement.innerHTML = "";
    }

    removePlayer(id) {
        if (this.player.length <= 0) return;
        console.log(`id: ${id}`);
        this.players = this.players.map(p => p.id !== id);
        this.#updateCurrentPlayersText();
    }

    getPlayers() { return this.players; }
    getCurrentAmountOfPlayers() { return this.players.length; }
    setErrorElement(elem) { this.errorElement = elem; }
    setPlayersDisplay(elem) { this.playersDisplay = elem }
}
