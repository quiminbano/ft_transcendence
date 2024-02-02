from django.shortcuts import render, redirect
from .userInterface import loginUser
from .utils import stringifyImage

def pongInterface(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    match request.path:
        case "/pong":
            is42 = request.user.is42
            source = stringifyImage(request.user)
            context = {
                "content": "PongTournamentPages/pong.html",
                "source": source,
                "is42" : is42,
				"hasPin": False
            }
        case "/pong/single/1v1":
            context={"content": "Pong1v1pages/OnevOne.html"}
        case "/pong/single/2v2":
            context={"content": "Pong1v1pages/twoVtwo.html"}
        case "/pong/single":
          context = {"content": "Pong1v1pages/singleMatchPage.html", "source": stringifyImage(request.user)}
        case "/pong/tournament":
            context = {"content": "PongTournamentPages/tournamentCreation.html"}
        case _:
            context = {"content": "index.html"}
    return render(request, "index.html", context)

def pongInterfaceWithId(request, id : int):
    if not request.user.is_authenticated:
        return redirect('/login')
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

def pongTournamentGame(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    context = {
        "content": "localPong.html"
    }
    return render(request, "index.html", context)
