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

const fakeFriends = ["Andre", "Carlos", "Hans", "Joao", "Lucas"]

const onSearch = (event) => {
	const input = event.target.value;
	const matches = fakeFriends.filter(friend => friend.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
	console.log(matches)
}

