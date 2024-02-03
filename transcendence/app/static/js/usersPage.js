const loadUsersPage = async () => {
	loadMenus();
	allGamesModal = new Modal(document.getElementById("allLastGamesModal"));
	if (allGamesModal)
		allGamesModal.close();
	const winpercentChart = new CircleChart(120, 120);
	await winpercentChart.createFragment();
	const totalWinsText = document.getElementById("totalWins").innerText;
	const totalGamesText = document.getElementById("totalGames").innerText;
	const percent = parseInt(totalWinsText) / parseInt(totalGamesText) * 100;
	winpercentChart.setPercent(percent);
	winpercentChart.setTextColor("#000");
	winpercentChart.appendFragment("userWinsPercentDiv");
}

