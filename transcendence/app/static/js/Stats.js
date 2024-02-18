const loadStats = async () => {
	try {
		const statsData = JSON.parse(document.getElementById('stats').textContent);
		const winPercentChart = new CircleChart(120, 120);
		await winPercentChart.createFragment();
		const winPercent = Math.round(statsData.totalWins / statsData.totalGames * 100);
		winPercentChart.setPercent(winPercent);
		winPercentChart.appendFragment("winPercentChart");
		const loosePercentChart = new CircleChart(120, 120);
		await loosePercentChart.createFragment();
		const loosePercent = Math.round(statsData.totalLooses / statsData.totalGames * 100);
		loosePercentChart.setPercent(loosePercent);
		loosePercentChart.appendFragment("loosePercentChart");
	} catch (error) {

	}
}

