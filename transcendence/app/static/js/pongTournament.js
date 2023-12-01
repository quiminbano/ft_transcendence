const createTournament = (event) => {
    event.preventDefault();
    const creationContainer = document.getElementById("tournamentCreationContainer");
    const registrationContainer = document.getElementById("pongRegistrationContainer");

    const formData = new FormData(event.target);
    const tournamentName = formData.get("tournamentName");
    const totalPlayers = formData.get("totalPlayers");
    const hostName = formData.get("hostName");
    console.log(tournamentName);
    console.log(totalPlayers);
    console.log(hostName);
    creationContainer.style.display = "none";
    registrationContainer.style.display = "block";
}
