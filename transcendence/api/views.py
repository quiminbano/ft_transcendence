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
#         USER GET
#==========================================
def getUser(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    if request.method == 'GET':
        user = request.user
        user_dict = model_to_dict(user)
        if user_dict.get('avatarImage'):
            user_dict['avatarImage'] = user.avatarImage.url if user.avatarImage else None
            user_dict.pop('password', None)

        user_data = Database.objects.filter(username="admin").first()
    return JsonResponse(user_dict, safe=False)

#==========================================
#         USER PUT
#==========================================
def putUser(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    user = request.user
    user.username = "test"
    user.save()
    return JsonResponse({"message":"Success"}, safe=False)

#==========================================
#         USER DELETE
#==========================================
def deleteUser(request):
    if not request.user.is_authenticated:
        return loginUser(request)
    user = request.user
    user.delete()
    return JsonResponse({"message":"Success"}, safe=False)

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
            case "POST":
                print("DEL_POST")
                deleteTournament(existing_tournament)
                return createTurnament(request)
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
def tournamentPlayer(request):
    print("tournamentPlayer")
    data = json.loads(request.body)
    print(data)
    print(request.method)
    match request.method:
        case "PUT":
            return(tournamentUpdatePlayer(request))
        case _:
            return unknownMethod()
    return JsonResponse({'error': 'player does not exist'}, status=400)




#==========================================
#         Tournament Player ID Management
#==========================================
def tournamentManagerPlayerID(request, id=None):
    print("tournamentManagerPlayerID")
    player = Players.objects.filter(id=id).first()
    if player is not None:
        print("Player ID EXIST")
        match request.method:
            case "DELETE":
                return tournamentDeletePlayer(player)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)


