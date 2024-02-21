const generator = new FragmentGenerator("/getDoc/searchItem");
const friendsFragment = new FragmentGenerator("/getDoc/friendItem");

const loadMenus = () => {
	loadLanguageDropDown();
	const searchButton = document.getElementById("searchButton");
	if (!searchButton)
		return;
	searchButton.addEventListener("click", () => loadSearchFunctionality())
	searchButton.addEventListener("keyup", (e) => e.key === "Enter" && searchButton.click());
	const searchContainer = document.getElementById("search-container");
	searchButton.addEventListener("focus", () => {
		searchContainer.classList.add("focused");
	});

	searchButton.addEventListener("blur", () => {
		searchContainer.classList.remove("focused");
	});
	const search = document.getElementById("search");
	search.addEventListener("blur", () => {
		if (search.classList.contains("searchExpanded") && search.value.length <= 0) {
			loadSearchFunctionality();
			searchButton.focus();
		}
	})
}

const loadSearchFunctionality = () => {
	const search = document.getElementById("search");
	if (search.classList.contains("search")) {
		search.classList.remove("search");
		search.classList.add("searchExpanded");
		search.focus();
	} else if (search.classList.contains("searchExpanded")) {
		hideDropdown(document.getElementById("dropdownMenu"));
		setTimeout(() => {
			search.classList.remove("searchExpanded");
			search.classList.add("search");
		}, 250);
	}
}

const debounce = (func, delay = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay);
	}
}

const onSearch = async (event) => {
	const input = event.target.value;

	const url = `/api/searchUsers/${input}`;
	try {
		const menu = document.getElementById("dropdownMenu");
		if (input.length > 0) {
			const response = await getRequest(url);
			if (response.succeded) {
				showDropdown(menu);
				const parentDiv = document.getElementById("dropdownMenu");
				const matches = response.data;
				displayDropdownElements(matches, parentDiv);
			} else {
				throw response;
			}
		} else {
			hideDropdown(menu);
		}
	} catch (error) {
		console.log(error);
	}
}
const onInput = debounce(onSearch);

const hideDropdown = (element) => {
	if (!element)
		return;
	const inputField = document.getElementById("search");
	inputField.style.borderBottomLeftRadius = "30px";
	inputField.style.borderBottomRightRadius = "30px";
	inputField.value = "";
	element.classList.remove("dropdownExpanded");
	element.classList.add("dropdownCollapsed");
}
const showDropdown = (element) => {
	if (!element)
		return;
	element.classList.remove("dropdownCollapsed");
	element.classList.add("dropdownExpanded");
	const inputField = document.getElementById("search");
	inputField.style.borderBottomLeftRadius = "0px";
	inputField.style.borderBottomRightRadius = "0px";
}

const displayDropdownElements = (matches = [], parentDiv) => {
	while (parentDiv.firstChild) {
	  parentDiv.removeChild(parentDiv.firstChild);
	}
	if (matches.length === 0) {
		const noMatches = document.createElement("div");
		noMatches.textContent = getNoMatchText();
		noMatches.setAttribute("class", "searchItemName");
		parentDiv.appendChild(noMatches);
	} else {
		const username = document.getElementById("navbarUsername").textContent;
		matches.forEach((match, i) => {
			if (match.username !== username)
				searchMatchItem(match.avatar_image || "/static/images/profileIcon.png", match.username, parentDiv)
		});
	}
}

const getNoMatchText = () => {
	let message;
	try {
		const language = JSON.parse(document.getElementById('language').textContent);
		switch(language) {
			case "fin":
				message = "Ei osumia"
				break;
			case "swe":
				message = "Inga träffar"
				break;
			default:
				message = "No Matches";
		}
	} catch(error) {
		message = "No Matches";
	}
	return message;
}

const searchMatchItem = async (src, name, parentDiv) => {
	const fragment = await generator.generateFragment();
	const itemDiv = fragment.querySelector(".searchItem");
	itemDiv.setAttribute("data-id", name);
	itemDiv.addEventListener("click", () => navigateTo('/users/' + name));
	const picture = fragment.querySelector("#searchItemPicture");
	if (picture) {
		picture.setAttribute("src", src);
		picture.removeAttribute("id");
	}
	const itemName = fragment.querySelector("#searchItemName");
	if (itemName) {
		itemName.textContent = name;
		itemName.removeAttribute("id");
	}
	generator.appendFragment(fragment, parentDiv);
}

const onClickFriendsButton = () => {
	const friendsDropdown = document.getElementById("friendsDropdown");
	if (friendsDropdown.classList.contains("friendsDropdownCollapsed")) {
		showFriendsMenu();
	} else if (friendsDropdown.classList.contains("friendsDropdownExpanded")) {
		collapseFriendsMenu();
	}
}

const collapseFriendsMenu = () => {
	const friendsDropdown = document.getElementById("friendsDropdown");
	friendsDropdown.classList.remove("friendsDropdownExpanded");
	friendsDropdown.classList.add("friendsDropdownCollapsed");
	document.removeEventListener("click", closeFriendsMenuEventHandler);
}



const showFriendsMenu = async () => {
	const url = "/api/friends";
	try {
		const response = await getRequest(url);
		if (response.succeded) {
			const friends = response.data;
			document.addEventListener("click", closeFriendsMenuEventHandler);
			const friendsDropdown = document.getElementById("friendsDropdown");
			friendsDropdown.classList.remove("friendsDropdownCollapsed");
			friendsDropdown.classList.add("friendsDropdownExpanded");
			const parentDiv = document.getElementById("friendsDropdown");
			await displayFriendsElements(friends, parentDiv);
		} else {
			throw response;
		}
	} catch(error) {
		console.log(error);
	}
}

const displayFriendsElements = async (friends = [], parentDiv) => {
	while (parentDiv.firstChild) {
	  parentDiv.removeChild(parentDiv.firstChild);
	}
	await updateNotification();
	if (friends.length === 0) {
		const noFriends = document.createElement("div");
		let message;
		try {
			const language = JSON.parse(document.getElementById('language').textContent);
			switch(language){
				case "eng":
					case "fin":
						message = "Ei ystäviä";
						break;
					case "swe":
						message = "Inga vänner";
						break;
					default:
						message = "No friends";

			}
		} catch(error) {
			message = "No friends"
		}
		noFriends.textContent = message;
		noFriends.setAttribute("class", "searchItemName");
		parentDiv.appendChild(noFriends);
	} else {
		friends.forEach(friend => friendItem(friend,  parentDiv));
	}
}

const friendItem = async (friend, parentDiv) => {
	const fragment = await friendsFragment.generateFragment();
	const itemDiv = fragment.querySelector(".searchItem");
	itemDiv.setAttribute("data-id", friend.username);
	itemDiv.addEventListener("click", () => navigateTo('/users/' + friend.username));
	const picture = fragment.querySelector("#searchItemPicture");
	if (picture) {
		picture.setAttribute("src", friend.avatar_image || "/static/images/profileIcon.png");
		picture.removeAttribute("id");
	}
	const itemName = fragment.querySelector("#searchItemName");
	if (itemName) {
		itemName.textContent = friend.username;
		itemName.removeAttribute("id");
	}
	const online_statusIcon = fragment.querySelector("#seachitemonline_status");
	if (online_statusIcon) {
		if (friend.online_status)
			online_statusIcon.style.backgroundColor = "green";
		else
			online_statusIcon.style.backgroundColor = 'red';
	}
	generator.appendFragment(fragment, parentDiv);
}


const closeFriendsMenuEventHandler = (e) => {
	const friendsMenuArea = document.getElementById("friendsDropdown");
	if (!friendsMenuArea) return;
	if (friendsMenuArea?.contains(e.target)) return;
	const friendsButton = document.getElementById("friendsMenuButton");
	const friendsImage = document.getElementById("friendsIconButton");
	if (!(e.target === friendsButton || e.target === friendsImage)) {
		collapseFriendsMenu();
	}
}


const loadLanguageDropDown  = () => {
	const button = document.getElementById("lan-currentLanguage");
	if (!button)
		return;
	button.setAttribute("src", "/static/images/england.png");
}

const toggleDropdown = (e) => {
	const isDropdownButton = e.target.matches("[data-lan-dropdown-btn]");
	if (!isDropdownButton && e.target.closest('[data-dropdown') !== null)
		return;
	let currentDropdown;
	if (isDropdownButton) {
		currentDropdown = e.target.closest('[data-dropdown]');
		currentDropdown.classList.toggle("active");
	}
	document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
		if (dropdown === currentDropdown)
			return;
		dropdown.classList.remove('active');
	})
}

const selectLanguage = (value) => {
	const button = document.getElementById("lan-currentLanguage");
	button.setAttribute("src", `/static/images/${value}.png`);
	const dropdown = document.getElementById("language-dropdown");
	dropdown.classList.remove("active");
}
