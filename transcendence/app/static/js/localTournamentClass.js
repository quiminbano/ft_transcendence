class LocalTournament {
    constructor(name, totalPlayers) {
        this.name = name;
        this.totalPlayers = totalPlayers;
        this.players = [];
        this.nextId = 0;
        this.errorElement = "";
        this.playersDisplay = ""
        document.getElementById("tournamentTitle").innerHTML = name;
        this.currentPlayersText = document.getElementById("currentNumberPlayers");
        this.startButton = document.getElementById("startTournamentBtn");
        this.startButton.style.display = "none";
        this.addNewPlayerButton = document.getElementById("addNewPlayerButton");
		this.inputField = document.getElementById("newPlayerInputName");
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
		this.inputField.value = "";
		this.#updateDisplay(name);
        if (this.players.length >= this.totalPlayers) {
            this.startButton.style.display = "flex";
            this.addNewPlayerButton.style.display = "none";
        }
    }

    removePlayer(id) {
        if (this.player.length <= 0) return;
        console.log(`id: ${id}`);
        this.players = this.players.map(p => p.id !== id);
        this.#updateCurrentPlayersText();
    }
	editPlayer(id, name) {
		console.log(id, name)
		const playerToEdit = this.players.find(p => p.id === id);
		if (playerToEdit)
			playerToEdit.name = name;
	}

    getPlayers() { return this.players; }
    getCurrentAmountOfPlayers() { return this.players.length; }
    setErrorElement(elem) { this.errorElement = elem; }
    setPlayersDisplay(elem) { this.playersDisplay = elem }

	async #updateDisplay(name) {
		const parser = new DOMParser();
		const url = "/getDoc/registerPlayer";
		try {
			const response = await fetch(url);
			const html = await response.text();
			const doc = parser.parseFromString(html, 'text/html');
			const content = doc.body.innerHTML;
			const indexText = doc.getElementById("index");
			indexText.innerHTML = this.nextId;
			const nameText = doc.getElementById("playerName");
			nameText.innerHTML = name;
			const element = document.createElement("div");
			element.innerHTML = content;
			const div = document.getElementById("registeredPlayerBox");
			div.appendChild(element);
			this.nextId++;
		} catch (error) {
			console.log(error);
		}
	}
}
