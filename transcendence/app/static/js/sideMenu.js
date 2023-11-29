class SideMenu {
	constructor(containerId, hamburgerId, bgId) {
		this.isExpanded = true;
		this.sideMenu = document.getElementById(containerId);
		this.hamburger = document.getElementById(hamburgerId);
		this.sideMenuBg = document.getElementById(bgId);
		this.hamburgerChilds = this.hamburger.children;
	}
	toggleMenu = () => {
		this.isExpanded = !this.isExpanded;
		if (this.isExpanded) {
			sideMenu.classList.remove("sideMenuNotExpanded");
			sideMenu.classList.add("sideMenuExpanded");
			hamburger.classList.remove("hamburgerNotExpanded");
			hamburger.classList.add("hamburgerExpanded");
			sideMenuBg.style.display = "block";
		} else {
			sideMenu.classList.remove("sideMenuExpanded");
			sideMenu.classList.add("sideMenuNotExpanded");
			hamburger.classList.remove("hamburgerExpanded");
			hamburger.classList.add("hamburgerNotExpanded");
			sideMenuBg.style.display = "none";
			resetHamburgerState();
		}
	}
	resetHamburgerState = () => {
		const barOne = this.hamburgerChilds.item(0);
		const barTwo = this.hamburgerChilds.item(1);
		const barThree = this.hamburgerChilds.item(2);
		barOne.style.transform = "rotate(0deg) translateY(0px)";
		barTwo.style.visibility = "visible";
		barThree.style.transform = "rotate(0deg) translateY(0px)";
	}

	menuOnHover = () => {
		const hamburgerChilds = document.getElementById("menuHamburger").children;
		const barOne = hamburgerChilds.item(0);
		const barTwo = hamburgerChilds.item(1);
		const barThree = hamburgerChilds.item(2);
		if (isExpanded) {
			barOne.style.transform = "rotate(-27deg) translate(-5px, -3px)";
			barTwo.style.visibility = "hidden";
			barThree.style.transform = "rotate(27deg) translate(-5px, 2px)";
		} else {
			barOne.style.transform = "rotate(27deg) translate(-5px, 2px)";
			barTwo.style.visibility = "hidden";
			barThree.style.transform = "rotate(-27deg) translate(-5px, -3px)";
		}
	}

	menuOnMouseLeave = () => {
		const barOne = this.hamburgerChilds.item(0);
		const barTwo = this.hamburgerChilds.item(1);
		const barThree = this.hamburgerChilds.item(2);
		barOne.style.transformOrigin = "center";
		barTwo.style.transformOrigin = "center";
		barThree.style.transformOrigin = "center";
		if (this.isExpanded) {
			barOne.style.transform = "rotate(45deg) translateY(10px)";
			barTwo.style.visibility = "hidden";
			barThree.style.transform = "rotate(-45deg) translateY(-10px)";
		} else {
			resetHamburgerState();
		}
	}
}
