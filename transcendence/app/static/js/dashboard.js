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
	console.log(matches)
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
	element.style.opacity = 0;
	element.style.pointerEvents = "none";
}
const showDropdown = (element) => {
	if (!element)
		return;
	element.style.opacity = 1;
	element.style.pointerEvents = "all";
}

const displayMatches = (matches) => {
	const nomatches = document.getElementById("searchNoMatches");
	if (matches.length === 0) {
		nomatches.style.display = "black";
	} else {
		nomatches.style.display = "none";
	}
}

