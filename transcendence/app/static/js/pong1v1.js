const loadPong1v1 = () => {
	const tabs = document.querySelectorAll(".tabButton");
	const content = document.querySelectorAll(".tabContent");
	const line = document.querySelector(".line");
	tabs[0].classList.add("activeTab");
	content[0].classList.add("activeTab");
	line.style.width = tabs[0].offsetWidth + "px";
	line.style.left = tabs[0].offsetLeft + "px";
	tabs.forEach((tab, index) => {
		tab.addEventListener("click", (e) => {
			tabs.forEach(tab => tab.classList.remove("activeTab"));
			tab.classList.add("activeTab");
			line.style.width = e.target.offsetWidth + "px";
			line.style.left = e.target.offsetLeft + "px";
			content.forEach(item => item.classList.remove("activeTab"));
			content[index].classList.add("activeTab");
		})
	})
	populateFriends();
}

const populateFriends = async () => {
	const friends = fakeFriends;
	const url = "/getDoc/invitationItemTemplate";
	const divToAppendTo = document.getElementById("options");
	const generator = new FragmentGenerator(url);
	friends.forEach(friend => {
		editFragment(friend, divToAppendTo, generator);
	})
}

const editFragment = async (friend, divToAppendTo, generator) => {
	const fragment = await generator.generateFragment();
	const name = fragment.querySelector("#opponentName");
	const picture = fragment.querySelector("#opponentPicture");
	const checkedIcon = fragment.querySelector("#checkedIcon");
	name.textContent = friend;
	picture.setAttribute("src", "/static/images/profileIcon.png");
	checkedIcon.setAttribute("src", "/static/images/correct.svg");
	name.removeAttribute("id");
	picture.removeAttribute("id");
	checkedIcon.removeAttribute("id");
	const input = fragment.querySelector("input");
	input.setAttribute("value", friend);
	input.setAttribute("data-label", friend);
	generator.appendFragment(fragment, divToAppendTo);
}
