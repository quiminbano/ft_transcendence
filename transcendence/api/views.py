from django.http import JsonResponse, QueryDict
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .tournamentController import unknownMethod, createTurnament, deleteTournament, getTournament, tournamentAddPlayer, tournamentUpdatePlayer, tournamentDeletePlayer
from .models import Tournament, Players, Database
from app.forms import ProfilePicture
from app.userInterface import loginUser
from django.shortcuts import render
from app.utils import stringifyImage
import json



#==========================================
#          Profile Picture
#==========================================

def profilePicture(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    if request.method == 'POST':
        form = ProfilePicture(request.POST, request.FILES)
        if form.is_valid():
            form.save(request.user)
            source = stringifyImage(request.user)
            return JsonResponse({"source": source, "message": "Avatar image updated sucessfully"}, status=200)
        else:
            return JsonResponse({"success": "false", "message": "Failed to update the avatar picture"}, status=400)
    return JsonResponse({"success": "false", "message": "Accessing to an API route, not allowed"}, status=400)

#==========================================
#         Tournament Management
#==========================================
def tournamentManager(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    # existing_tournament = Tournament.objects.filter(uuid=request.user.uuid)
    print("tournamentManager")
    existing_tournament = request.user.tournament
    if existing_tournament is not None:
        # Call the function from the switch dictionary
        print("EXIST")
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "DELETE":
                return deleteTournament(existing_tournament)
            case _:
                return unknownMethod()
    else:
        if request.method == "POST":
            print("NO EXIST")
            return createTurnament(request)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=404)
        

#==========================================
#         TournamentID Manager
#==========================================
def tournamentManagerID(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id)
    print("tournamentManagerID")
    if existing_tournament.exists():
        # Call the function from the switch dictionary
        print("EXIST")
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "POST":
                return tournamentAddPlayer(request, existing_tournament)
            case "DELETE":
                return deleteTournament(existing_tournament)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'User does not have an tournament going'}, status=404)

#==========================================
#         Tournament Player Management
#==========================================
def tournamentManagerPlayerID(request, id=None):
    print("tournamentManagerPlayerID")
    player = Players.objects.filter(id=id).first()
    if player is not None:
        print("Player ID EXIST")
        match request.method:
            case "PUT":
                return tournamentUpdatePlayer(request)
            case "DELETE":
                return tournamentDeletePlayer(player)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)


