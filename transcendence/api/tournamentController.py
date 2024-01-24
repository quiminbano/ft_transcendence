from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players, Database
import json

#==========================================
#                   Utils
#==========================================
def JSONTournamentResponse(tournament, message):
    response = {
            "message" : message,
            "tournament": {
                "id": str(tournament.id),
                "name": tournament.tournamentName,
                "amount": tournament.amount,
                "state": tournament.sate,
                "players": [{"name" : player.name, "id" : player.id} for player in tournament.players.all()],
            }
        }
    return (response)

def unknownMethod():
    return JsonResponse({'error': 'Method not supported'}, status=405)

#==========================================
#       Tournament Player Functions                                                                                                                                           
#==========================================
def tournamentAddPlayer(request, tournament):
    data = json.loads(request.body)
    if "player" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)
    playerdict = model_to_dict(player)
    if tournament.players.count() >= tournament.amount:
        tournament.sate = 'A'
        tournament.save()
    return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)

def tournamentUpdatePlayer(request):
    data = json.loads(request.body)
    if "id" not in data or "username" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    player = Players.objects.filter(id=data['id']).first()
    if player is not None:
        player.name =  data["username"]
        player.save()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)
    playerdict = model_to_dict(player)
    return JsonResponse({'message': 'Player name change succefull', 'player': playerdict}, status=200)

def tournamentDeletePlayer(player):
    tournament = Tournament.objects.filter(players=player).first()
    if tournament is not None:
        tournament.players.remove(player)
        player.delete()
        if tournament.players.count() < tournament.amount:
            tournament.sate = 'P'
            tournament.save()
        return JsonResponse({'succes!': 'player got removed'}, status=200)
    else:
        return JsonResponse({'error': 'player or tournament does not exist'}, status=400)


#==========================================
#         Tournament Functions                                                                                                                                           
#==========================================
def createTurnament(request):
    data = json.loads(request.body)
    if "name" not in data or "number" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    #Create a tournament object and add the player to it
    tournament = Tournament.objects.create(tournamentName=data['name'], amount=data['number'])
    playerName = Players.objects.create(name=data['player'])
    tournament.players.add(playerName)
    request.user.tournament = tournament
    request.user.save()
    print(tournament.tournamentName)
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament created successfully"), status=200)

def getTournament(tournament):
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament already exist"), status=200)

def deleteTournament(tournament):
    for TournamentPlayer in tournament.players.all():
        TournamentPlayer.delete()
    tournament.delete()
    return JsonResponse({'message': 'Succefully delete tournament'}, status=200)


#====================================================================================
#====================================================================================
#====================================================================================
#                               Tournament Managemer
#====================================================================================
#====================================================================================
#====================================================================================


#==========================================
#         Tournament Management
#==========================================
def tournamentManager(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    existing_tournament = request.user.tournament
    if existing_tournament is not None:
        # Call the function from the switch dictionary
        match request.method:
            case "GET":
                return getTournament(existing_tournament)
            case "DELETE":
                return deleteTournament(existing_tournament)
            case "POST":
                deleteTournament(existing_tournament)
                return createTurnament(request)
            case _:
                return unknownMethod()
    else:
        if request.method == "POST":
            return createTurnament(request)
        else:
            return JsonResponse({'error': 'User does not have an tournament going'}, status=404)
        

#==========================================
#         TournamentID Manager
#==========================================
def tournamentManagerID(request, id=None):
    existing_tournament = Tournament.objects.filter(id=id).first()
    if existing_tournament is not None:
        # Call the function from the switch dictionary
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
    player = Players.objects.filter(id=id).first()
    if player is not None:
        match request.method:
            case "DELETE":
                return tournamentDeletePlayer(player)
            case _:
                return unknownMethod()
    else:
        return JsonResponse({'error': 'player does not exist'}, status=400)


