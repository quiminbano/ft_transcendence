class AddPlayerModal {
	constructor() {
		this.isNew = true;
		this.playerId = -1;
		this.isShow = false;
		this.element = document.getElementById("addNewPlayerModal");
		this.inputField = document.getElementById("newPlayerInputName");
		this.title = document.getElementById("modalTitle");
		this.submitButton = document.getElementById("modalSumbitButton");
		this.bg = document.getElementById("registerNewPlayerModalBg");
	}
	open() {
		this.isShow = true;
		this.element.style.display = "flex";
		this.bg.style.display = "flex";
	}
	close() {
		this.isShow = false;
		this.inputField.value = "";
		this.element.style.display = "none";
		this.bg.style.display = "none";
	}
	setData(data) {
		this.isNew = data.isNew;
		this.playerId = data.id;
	}
	getIsNew() { return this.isNew; }
	getPlayerId() { return this.playerId; }
}
