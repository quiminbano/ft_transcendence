let loadTournamentLobbyInfo;
let t;
const loadTournamentLobby = async () => {
    if (!loadTournamentLobbyInfo) {
        await navigateTo("/pong/tournament");
        return;
    }
    const data = loadTournamentLobbyInfo.tournament;
    console.log(data);
    t = createTournamentInstance(data.name, data.amount, data.id);
    if (loadTournamentLobbyInfo.hasTournament) {
        data.players.forEach(player => tournament.addPlayer({ name: player, id: player.id | 0 })) //Make sure backend returns an ID!!!!
    }
    else if (data.addPlayer) {
        addPlayerToDatabase(data.addPlayer);
    }
}
