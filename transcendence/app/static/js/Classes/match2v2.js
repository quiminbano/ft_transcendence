class Match2v2 extends Match {
	constructor(id) {
		super(id);
		this.registeredPlayers = [];
		this.teamOne = [];
		this.teamTwo = [];
		this.playersrequired = 4;
		this.amountPlayersRegistered = 0;
		this.currentIndex = 0;
		this.readyToPlay = false;
	}
	addPlayer(username, playerNumber) {
		const playerToAdd = {
			id: this.currentIndex,
			username
		}
		this.registeredPlayers.push(playerToAdd);
		if (playerNumber === 1 || playerNumber === 4)
			this.teamOne.push(playerToAdd);
		else
			this.teamTwo.push(playerToAdd);
		this.currentIndex++;
		this.amountPlayersRegistered++;
		if (this.amountPlayersRegistered === this.playersrequired)
			this.readyToPlay = true;
	}
	removePlayer(username, playerNumber) {
		const indexToRemove = this.registeredPlayers.indexOf(player => username === player.username);
		this.registeredPlayers.splice(indexToRemove, 1);
		if (playerNumber === 1 || playerNumber === 4) {
			const indexToRemove = this.teamOne.indexOf(player => username === player.username);
			this.teamOne.splice(indexToRemove, 1);
		}
		else if (playerNumber === 2 || playerNumber === 3) {
			const indexToRemove = this.teamTwo.indexOf(player => username === player.username);
			this.teamTwo.splice(indexToRemove, 1);
		}
		this.amountPlayersRegistered--;
		if (this.readyToPlay)
			this.readyToPlay = false;
	}
	get
}
