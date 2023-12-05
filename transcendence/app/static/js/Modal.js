class Modal {
	constructor(element) {
		this.show = false;
		this.element = element;
		this.close();
	}
	setElement(elem) { this.element = elem; }
	open() {
		this.element.style.display = "flex";
	}
	close() {
		console.log("closing the modal");
		console.log(this.element);
		this.element.style.display = "none"
	}
}
