const loadPong1v1 = () => {
	const tabs = document.querySelectorAll(".tabButton");
	const content = document.querySelectorAll(".tabContent");
	const line = document.querySelector(".line");
	const inviteButton = document.querySelector("#inviteButton");
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
			inviteButton.style.display = index === 0 ? "block" : "none";
		})
	})
	populateFriends();
	populateOtherUsers();
	populateInvited();
	populateYouInvited();
}

const populateFriends = async () => {
	const friends = fakeFriends;
	const url = "/getDoc/invitationItemTemplate";
	const divToAppendTo = document.getElementById("inviteFriendsOptions");
	const generator = new FragmentGenerator(url);
	friends.forEach(friend => {
		createInvitePlayerFragment(friend, divToAppendTo, generator);
	})
}

const populateOtherUsers = () => {
	const users = fakeUsers;
	const url = "/getDoc/invitationItemTemplate";
	const divToAppendTo = document.getElementById("inviteUsersOptions");
	const generator = new FragmentGenerator(url);
	users.forEach(user => {
		createInvitePlayerFragment(user.name, divToAppendTo, generator);
	})
}

const createInvitePlayerFragment = async (friend, divToAppendTo, generator) => {
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

const populateInvited = () => {
	const friends = fakeFriends;
	const url = "/getDoc/invitedItemTemplate";
	const divToAppendTo = document.getElementById("invitesBoxUL");
	const generator = new FragmentGenerator(url);
	friends.forEach(friend => {
		createInvitedFragment(friend, divToAppendTo, generator);
	})
}

const createInvitedFragment = async (friend, divToAppendTo, generator) => {
	const fragment = await generator.generateFragment();
	const name = fragment.querySelector("#opponentName");
	const picture = fragment.querySelector("#opponentPicture");
	const acceptIcon = fragment.querySelector("#acceptInvite");
	const rejectIcon = fragment.querySelector("#rejectInvite");
	name.textContent = friend;
	picture.setAttribute("src", "/static/images/profileIcon.png");
	acceptIcon.setAttribute("src", "/static/images/correct.svg");
	rejectIcon.setAttribute("src", "/static/images/wrong.svg");
	name.removeAttribute("id");
	picture.removeAttribute("id");
	acceptIcon.removeAttribute("id");
	rejectIcon.removeAttribute("id");
	generator.appendFragment(fragment, divToAppendTo);
}


const declineInvitation  = () => {
	console.log("invitation accepted");
}

const acceptInvitation = () => {
	console.log("Invitation declined");
}

const populateYouInvited = () => {
	const friends = fakeFriends;
	const url = "/getDoc/youAreInvitedItem";
	const divToAppendTo = document.getElementById("invitedBoxUL");
	const generator = new FragmentGenerator(url);
	friends.forEach(friend => {
		createYouWereInvitedFragment(friend, divToAppendTo, generator);
	})
}

const createYouWereInvitedFragment = async (friend, divToAppendTo, generator) => {
	const fragment = await generator.generateFragment();
	const name = fragment.querySelector("#opponentName");
	const picture = fragment.querySelector("#opponentPicture");
	name.textContent = friend;
	picture.setAttribute("src", "/static/images/profileIcon.png");
	name.removeAttribute("id");
	picture.removeAttribute("id");
	generator.appendFragment(fragment, divToAppendTo);
}
