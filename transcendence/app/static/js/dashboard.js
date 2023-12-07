const loadDashboard = () => {
	console.log("Loading dashboard");
	const searchButton = document.getElementById("searchButton");
	const search = document.getElementById("search");

	searchButton.addEventListener("click", () => {
		console.log("clicked")
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

