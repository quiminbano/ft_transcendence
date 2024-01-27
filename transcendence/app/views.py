from django.shortcuts import render
from . import errors
from . import mainPage
from . import userInterface
from . import pongTournament


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
def getFriendItem(request):
    return render(request, "SearchElements/friendItem.html", {})
def getInvitationItemTemplate(request):
    return render(request, "SearchElements/invitationItem.html", {})
