const loadStats = async () => {
	try {
		const statsData = JSON.parse(document.getElementById('stats').textContent);
		const winPercentChart = new CircleChart(120, 120);
		await winPercentChart.createFragment();
		winPercentChart.setPercent(statsData.totalWins / statsData.totalGames * 100);
		winPercentChart.appendFragment("winPercentChart");
		const loosePercentChart = new CircleChart(120, 120);
		await loosePercentChart.createFragment();
		loosePercentChart.setPercent(statsData.totalLooses / statsData.totalGames *100);
	} catch (error) {

	}
}

