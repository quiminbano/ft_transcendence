const loadUsersPage = async () => {
	loadMenus();
	allGamesModal = new Modal(document.getElementById("allLastGamesModal"));
	if (allGamesModal)
		allGamesModal.close();
	await loadStats();
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
