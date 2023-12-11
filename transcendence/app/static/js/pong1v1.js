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
	const url = "/getDoc/searchItem";
	const divToAppendTo = document.getElementById("friendsToInviteBox");
	const generator = new FragmentGenerator(url);
	friends.forEach(friend => {
		editFragment(friend, divToAppendTo, generator);
	})
}

const editFragment = async (friend, divToAppendTo, generator) => {
	const fragment = await generator.generateFragment();
	const name = fragment.querySelector("#searchItemName");
	const picture = fragment.querySelector("#searchItemPicture");
	name.textContent = friend;
	picture.setAttribute("src", "/static/images/profileIcon.png");
	generator.appendFragment(fragment, divToAppendTo);
}
