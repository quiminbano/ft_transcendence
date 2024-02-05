const loadUsersPage = async () => {
	loadMenus();
	allGamesModal = new Modal(document.getElementById("allLastGamesModal"));
	if (allGamesModal)
		allGamesModal.close();
	const statsData = JSON.parse(document.getElementById('stats').textContent);
	const winPercentChart = new CircleChart(120, 120);
	await winPercentChart.createFragment();
	winPercentChart.setPercent(statsData.totalWins / statsData.totalGames * 100);
	winPercentChart.appendFragment("winPercentChart");
	const loosePercentChart = new CircleChart(120, 120);
	await loosePercentChart.createFragment();
	loosePercentChart.setPercent(statsData.totalLooses / statsData.totalGames *100);
	loosePercentChart.appendFragment("loosePercentChart");
}

const challengeForPong = async () => {
	const username = JSON.parse(document.getElementById('username').textContent);
	await navigateTo("/pong/single/1v1");
	const input = document.getElementById("opponentUsernameInput");
	if (input)
		input.value = username;
	const pininput = document.getElementById("opponentPinInput");
		if (pininput)
			pininput.focus();
}

