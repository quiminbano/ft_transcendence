const loadPong1v1 = () => {
	const tabs = document.querySelectorAll(".tabButton");
	const content = document.querySelectorAll(".tabContent");
	tabs[0].classList.add("activeTab");
	content[0].classList.add("activeTab");
	tabs.forEach((tab, index) => {
		tab.addEventListener("click", (e) => {
			tabs.forEach(tab => tab.classList.remove("activeTab"));
			tab.classList.add("activeTab");
			const line = document.querySelector(".line");
			line.style.width = e.target.offsetWidth + "px";
			line.style.left = e.target.offsetLeft + "px";
			content.forEach(item => item.classList.remove("activeTab"));
			content[index].classList.add("activeTab");
		})
	})
}
