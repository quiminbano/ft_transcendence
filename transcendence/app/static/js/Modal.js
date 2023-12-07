class Modal {
	constructor(element) {
		this.show = false;
		this.element = element;
		this.close();
	}
	setElement(elem) { this.element = elem; }
	open() {
		if (this.element)
			this.element.style.display = "flex";
	}
	close() {
		if (this.element)
			this.element.style.display = "none"
	}
}
