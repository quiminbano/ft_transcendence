const loadDashboard = () => {
	console.log("Loading dashboard");
	const searchButton = document.getElementById("searchButton");
	const search = document.getElementById("search");

	searchButton.addEventListener("click", () => {
		if (search.classList.contains("search")) {
			search.classList.remove("search");
			search.classList.add("searchExpanded");
			search.focus();
			search.setAttribute("placeholder", "Search for friends");
		} else if (search.classList.contains("searchExpanded")) {
			search.classList.remove("searchExpanded");
			search.classList.add("search");
		}
	})
	makeChart();
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

const fakeFriends = ["Andre", "Carlos", "Hans", "Joao", "Lucas"]

const onSearch = (event) => {
	const input = event.target.value;
	const matches = fakeFriends.filter(friend => friend.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
	const menu = document.getElementById("dropdownMenu");
	if (input.length > 0) {
		showDropdown(menu);
		displayMatches(matches);
	}
	else
		hideDropdown(menu);
}
const onInput = debounce(onSearch);

const hideDropdown = (element) => {
	if (!element)
		return;
	const inputField = document.getElementById("search");
	inputField.style.borderBottomLeftRadius = "30px";
	inputField.style.borderBottomRightRadius = "30px";
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

const displayMatches = (matches = []) => {
	const parentDiv = document.getElementById("dropdownMenu");
	while (parentDiv.firstChild) {
	  parentDiv.removeChild(parentDiv.firstChild);
	}
	if (matches.length === 0) {
		const noMatches = document.createElement("div");
		noMatches.textContent = "No Matches";
		noMatches.setAttribute("class", "searchItemName");
		parentDiv.appendChild(noMatches);
	} else {
		matches.forEach(match => searchMatchItem("/static/images/profileIcon.png", match));
	}
}

const searchMatchItem = async (src, name) => {
	const generator = new FragmentGenerator("/getDoc/searchItem");
	const fragment = await generator.generateFragment();
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
	const parentDiv = document.getElementById("dropdownMenu");
	generator.appendFragment(fragment, parentDiv);
}