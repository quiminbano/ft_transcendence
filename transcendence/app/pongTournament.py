from django.shortcuts import render
from .userInterface import loginUser
from .utils import stringifyImage

def pongInterface(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    match request.path:
        case "/pong":
            source = stringifyImage(request.user)
            context = {
                "content": "PongTournamentPages/pong.html",
                "source": source
            }
        case "/pong/1v1":
            context = {"content": "Pong1v1pages/oneVoneRemote.html"}
        case "/pong/tournament":
            context = {"content": "PongTournamentPages/tournamentCreation.html"}
        case "/pong/remoteTournament":
            context = {"content": "PongTournamentPages/remoteStart.html"}
        case _:
            context = {"content": "index.html"}
    return render(request, "index.html", context)

def pongInterfaceWithId(request, id : int):
    if not request.user.is_authenticated:
        return loginUser(request)
    tournamentId = "/pong/tournament/" + str(id)
    startLocalTournament = tournamentId + "/start"
    remoteId = "/pong/remoteTournament/" + str(id)
    if request.path == tournamentId:
        context = {"content": "PongTournamentPages/pongTournament.html"}
    elif request.path == startLocalTournament:
        context = {"content": "PongTournamentPages/tournamentStart.html"}
    elif request.path == remoteId:
        context = {"content": "PongTournamentPages/remoteLobby.html"}
    else:
        context = {"content": "index.html"}
    return render(request, "index.html", context)
