from django.shortcuts import render, redirect
from .utils import stringifyImage, setOffline, setOnline, getTextsForLanguage
from django.contrib.auth import logout
from api.api42 import getTokens
import time
from api.translations.translation import pages

def pongInterface(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', request.path, request)
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    setOnline(user=request.user)
    source = stringifyImage(request.user)
    match request.path:
        case "/pong":
            is_42 = request.user.is_42
            context = {
                "content": "PongTournamentPages/pong.html",
                "source": source,
                "is_42" : is_42,
		        "hasPin": False,
                "texts": getTextsForLanguage(pages["pong"])
            }
        case "/pong/single/1v1":
            context={"content": "Pong1v1pages/OnevOne.html", "source": source, "texts": getTextsForLanguage(pages["pongSingle1v1"])}
        case "/pong/single/2v2":
            context={"content": "Pong1v1pages/twoVtwo.html", "source": source, "texts": getTextsForLanguage(pages["pongSingle2v2"])}
        case "/pong/single":
          context = {"content": "Pong1v1pages/singleMatchPage.html", "source": source, "texts": getTextsForLanguage(pages["pongSingle"])}
        case "/pong/tournament":
            context = {
                "content": "PongTournamentPages/tournamentCreation.html",
				"username": request.user.get_username,
                "texts": getTextsForLanguage(pages["tournament"])
            }
        case _:
            context = {"content": "index.html"}
    return render(request, "index.html", context)

def pongInterfaceWithId(request, id : int):
    if not request.user.is_authenticated:
        return redirect('/login')
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', request.path, request)
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    setOnline(user=request.user)
    tournamentId = "/pong/tournament/" + str(id)
    startLocalTournament = tournamentId + "/start"
    remoteId = "/pong/remoteTournament/" + str(id)
    if request.path == tournamentId:
        context = {"content": "PongTournamentPages/pongTournament.html", "source": stringifyImage(request.user), "texts": getTextsForLanguage(pages["tournament"])}
    elif request.path == startLocalTournament:
        if "flag" not in request.headers or not request.headers["flag"]:
            return redirect("/404")
        context = {"content": "PongTournamentPages/tournamentStart.html"}
    elif request.path == remoteId:
        context = {"content": "PongTournamentPages/remoteLobby.html"}
    else:
        context = {"content": "index.html"}
    return render(request, "index.html", context)

def pongTournamentGame(request):
    if not request.user.is_authenticated:
        return redirect('/login')
    if (request.user.is_42 == True) and (time.time() > request.user.expiration_time):
        return getTokens(request.user.refresh_token, 'refresh_token', 'refresh_token', request.path, request)
    if request.user.is_login == False:
        setOffline(user=request.user)
        logout(request)
        return redirect('/login')
    setOnline(user=request.user)
    context = {
        "content": "localPong.html"
    }
    return render(request, "index.html", context)
