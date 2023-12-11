from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Tournament, Players, CustomUserData
import json

#==========================================
#                   Utils
#==========================================
def JSONTournamentResponse(tournament, message):
    response = {
            "message" : message,
            "tournament": {
                "id": str(tournament.id),
                "uuid": tournament.uuid,
                "name": tournament.name,
                "amount": tournament.amount,
                "state": tournament.sate,
                "players": [{"name" : player.name, "id" : player.id} for player in tournament.players.all()],
            }
        }
    return (response)

#==========================================
#         Tournament Functions
#==========================================
def tournamentAddPlayer(data, tournament):
    player = Players.objects.create(name=data['player'])
    tournament.players.add(player)
    playerdict = model_to_dict(player)
    return JsonResponse({'message': 'Player added successfully', 'player': playerdict}, status=200)


def createTurnament(request):
    data = json.loads(request.body)
    if "name" not in data or "number" not in data:
        return JsonResponse({'error': 'missing fields in request body'}, status=400)
    #Create a tournament object and add the player to it
    tournament = Tournament.objects.create(name=data['name'], amount=data['number'], uuid=request.user.uuid)
    playerName = Players.objects.create(name=data['player'])
    tournament.players.add(playerName)
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament created successfully"), status=200)

#==========================================
#         Tournament Methods
#==========================================
def getMethod(request, tournament):
    return JsonResponse(JSONTournamentResponse(tournament.first(), "Tournament already exist"), status=200)

def postMethod(request, tournament):
    data = json.loads(request.body)
    if "player" in data and "id" in data:
        return (tournamentAddPlayer(data, tournament.first()))
    else:
        return (createTurnament(request))

def putMethod(request, tournament):
    return JsonResponse({'error': 'Method not implemented'}, status=501)

def deleteMethod(request, tournament):
    tournament.first().delete()
    return JsonResponse({'message': 'Succefully delete tournament'}, status=200)


def unknownMethod(request, tournament):
    return JsonResponse({'error': 'Method not supported'}, status=405)

#==========================================
#         Tournament Switch
#==========================================
switch = {
    'GET': getMethod,
    'POST': postMethod,
    'PUT': putMethod,
    'DELETE': deleteMethod,
}


