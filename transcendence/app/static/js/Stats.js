const loadStats = async () => {
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
const makeChart = async (divId) => {
	chart = new CircleChart(120, 120);
	await chart.createFragment();
	chart.setPercent(85);
	chart.appendFragment("chartTest");
}
