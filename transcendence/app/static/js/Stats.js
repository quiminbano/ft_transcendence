const makeChart = async () => {
	chart = new CircleChart(120, 120);
	await chart.createFragment();
	chart.setPercent(85);
	chart.appendFragment("chartTest");

}

const loadDashboard = () => {
	console.log("Loading dashboard");
	makeChart();
}
