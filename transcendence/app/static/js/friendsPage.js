const loadFriendsPage = async () => {
	loadMenus();
	const winpercentChart = new CircleChart(120, 120);
	await winpercentChart.createFragment();
	winpercentChart.setPercent(85);
	winpercentChart.setTextColor("#000");
	winpercentChart.appendFragment("friendWinsPercentDiv");
}

