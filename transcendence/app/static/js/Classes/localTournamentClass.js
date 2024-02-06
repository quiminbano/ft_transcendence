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
			if (deleteIcon)
            	deleteIcon.addEventListener("click", () => removePlayer(this.players[i].id));
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
    setSchedule(schedule) {
        this.schedule = schedule;
        for (let i = 1; i <= this.schedule.matches.length; i++) {
            const match = this.schedule.matches.find(m => m.id === i);
            const id = match.id;
            const matchHTMLElement = document.querySelector(`.match[data-id="${id}"]`);
            if (match.player1)
                bracket.updateHomeTeam(match.player1, matchHTMLElement);
            if (match.player2)
                bracket.updateAwayTeam(match.player2, matchHTMLElement);
        }
    }
    updateScore(id, playerOneScore, playerTwoScore) {
        const match = this.schedule.getMatch(id);
        match.stage = this.schedule.currentStage;
        this.schedule.updateMatchScore(id, playerOneScore, playerTwoScore);

        const player1 = { name: match.player1.name, points: match.score.player1Points };
        const player2 = { name: match.player2.name, points: match.score.player2Points };
        const htmlElement = document.querySelector(`.match[data-id="${match.id}"]`);

        if (this.schedule.totalmatches_played === this.schedule.totalMatchesToPlay) {
            if (player1.points > player2.points)
                this.winner = player1.name;
            else
                this.winner = player2.name;
            this.setState("C");
        } else {
            bracket.updateBracketAfterMatch(player1, player2, htmlElement);
            const winnersNextMatch = this.schedule.getWinnersNextMatch(match);
            bracket.updateWinerToNextStage(winnersNextMatch);
        }
    }
}
