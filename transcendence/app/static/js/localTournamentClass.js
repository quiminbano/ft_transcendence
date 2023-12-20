class LocalTournament {
    constructor(name, totalPlayers, id) {
        this.name = name;
        this.id = id;
        this.state = "P";
        this.totalPlayers = totalPlayers;
        this.players = [];
        this.errorElement = "";
        this.playersDisplay = ""
        document.getElementById("tournamentTitle").innerHTML = name;
        this.currentPlayersText = document.getElementById("currentNumberPlayers");
        this.startButton = document.getElementById("startTournamentBtn");
        this.startButton.style.display = "none";
        this.addNewPlayerButton = document.getElementById("addNewPlayerButton");
        this.inputField = document.getElementById("newPlayerInputName");
    }
    setState(state) {
        this.state = state;
    }
    #updateCurrentPlayersText() {
        this.currentPlayersText.innerHTML = `${this.players.length} / ${this.totalPlayers}`;
    }
    addPlayer(player) {
        if (this.players.length >= this.totalPlayers)
            throw new Error("Lobby is full");
        if (this.isRepeatedPlayer())
            return;
        this.players.push(player);
        this.errorElement.innerHTML = "";
		this.inputField.value = "";
        this.#updateCurrentPlayersText();
        this.#updateDisplay();
    }

    removePlayer(id) {
        if (this.players.length <= 0) return;
        this.players = this.players.filter(p => p.id !== id);
        this.#updateCurrentPlayersText();
        this.#updateDisplay();
    }
	editPlayer(id, name) {
		const playerToEdit = this.players.find(p => p.id === id);
        if (playerToEdit) {
            playerToEdit.name = name;
            this.#updateDisplay();
        }

	}

    getPlayers() { return this.players; }
    getCurrentAmountOfPlayers() { return this.players.length; }
    setErrorElement(elem) { this.errorElement = elem; }
    setPlayersDisplay(elem) { this.playersDisplay = elem }
    #cleanDisplay() {
        const div = document.getElementById("registeredPlayerBox");
        while (div.firstChild)
            div.removeChild(div.firstChild);
    }
    #populateDisplay(doc) {
        const div = document.getElementById("registeredPlayerBox");
        for (let i = 0; i < this.players.length; i++) {
            const fragment = document.createDocumentFragment();
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = doc.body.innerHTML;
            while (tempDiv.firstChild)
                fragment.appendChild(tempDiv.firstChild);
            fragment.getElementById("playerItem").setAttribute("data-id", this.players[i].id);
            fragment.getElementById("index").innerHTML = i + 1;
            fragment.getElementById("playerName").innerHTML = this.players[i].name;
            const deleteIcon = fragment.querySelector('.unregisterUserButton[alt="Remove user button"]');
            deleteIcon.addEventListener("click", () => removePlayer(this.players[i].id));
            const editIcon = fragment.querySelector('.unregisterUserButton[alt="Edit user button"]')
            editIcon.addEventListener("click", () => openRegisterPlayerModal({ isNew: false, id: this.players[i].id }));
            div.appendChild(fragment);
        }
    }
    #updateButtons() {
        if (this.players.length >= this.totalPlayers) {
            this.startButton.style.display = "flex";
            this.addNewPlayerButton.style.display = "none";
        } else {
            this.startButton.style.display = "none";
            this.addNewPlayerButton.style.display = "flex";
        }
    }
	async #updateDisplay() {
		const parser = new DOMParser();
        const url = "/getDoc/registerPlayer";
		try {
			const response = await fetch(url);
			const html = await response.text();
            const doc = parser.parseFromString(html, 'text/html');

            this.#cleanDisplay();
            this.#populateDisplay(doc);
            this.#updateButtons();
		} catch (error) {
			console.log(error);
		}
    }
    isRepeatedPlayer(name) {
        if (this.players.find(p => p.name === name))
            return true;
        return false;
    }
    setErrorMessage(message) {
        this.errorElement.innerHTML = message;
    }
    getName() { return this.name; }
    setSchedule(schedule) { this.schedule = schedule; }
}
