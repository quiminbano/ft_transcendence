from django.shortcuts import render
from .forms import ProfilePicture
from .sessionManager import loginUser, logoutUser, settings, dashboard, signup

def status_404(request):
    context = {}
    return render(request, "404.html", context)

def index(request):
    if request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {
            "content": "main.html"
        }
        return render(request, "index.html", context)

def pong(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/pong.html"}
        return render(request, "index.html", context)
def pongOnevsOne(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "Pong1v1pages/pongOneVsOne.html"}
        return render(request, "index.html", context)

def pongTournament(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/tournamentCreation.html"}
        return render(request, "index.html", context)

def pongTournamentLobby(request, id):
    #Make a check to see if there is a open tournament with the same id!!!
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/pongTournament.html"}
        return render(request, "index.html", context)

def pongTournamentStart(request, id):
    #Make a check to see if there is a open tournament with the same id!!!
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {"content": "PongTournamentPages/tournamentStart.html"}
        return render(request, "index.html", context)

def usersPage(request, name):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {
            "content": "usersPage.html"
        }
        return render(request, "index.html", context)

def remoteTournament(request):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {
            "content": "PongTournamentPages/remoteStart.html"
        }
        return render(request, "index.html", context)

def remoteLobby(request, id):
    if not request.user.is_authenticated:
        return dashboard(request)
    else:
        context = {
            "content": "PongTournamentPages/remoteLobby.html"
    }
        return render(request, "index.html", context)



def getRegisterPlayersTemplate(request):
    return render(request, "registeredPlayers.html", {})

def getCircleChartTemplate(request):
    return render(request, "circleChart.html", {})

def getSearchItem(request):
    return render(request, "SearchElements/searchItem.html", {})

def invitationItemTemplate(request):
    return render(request, "PongTournamentPages/invitationItemTemplate.html", {})
def invitedItemTemplate(request):
    return render(request, "PongTournamentPages/invitedItem.html", {})
def youAreInvitedItemTemplate(request):
    return render(request, "PongTournamentPages/youAreInvitedItem.html", {})
def bracketFourTemplate(request):
    return render(request, "TournamentBrackets/tournamentBracket4.html", {})
def bracketEightTemplate(request):
    return render(request, "TournamentBrackets/tournamentBracket8.html", {})
def bracketSixteenTemplate(request):
    return render(request, "TournamentBrackets/tournamentBracket16.html", {})
