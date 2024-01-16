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
                "uuid": tournament.uuid,
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
    tournament.first().players.add(player)
    playerdict = model_to_dict(player)
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
    print ("method DELETE")
    tournament = Tournament.objects.filter(players=player)
    if tournament.exists():
        tournament.first().players.remove(player)
        player.delete()
        print("SUCCESS!")
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
    tournament = Tournament.objects.create(tournamentName=data['name'], amount=data['number'], uuid=request.user.uuid)
    playerName = Players.objects.create(name=data['player'])
    tournament.players.add(playerName)
    request.user.tournament = tournament
    request.user.save()
    print(tournament.tournamentName)
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament created successfully"), status=200)

def getTournament(tournament):
    return JsonResponse(JSONTournamentResponse(tournament, "Tournament already exist"), status=200)

def deleteTournament(tournament):
    for TournamentPlayer in tournament.first().players.all():
        TournamentPlayer.delete()
    tournament.delete()
    print("REMOVE tour")
    return JsonResponse({'message': 'Succefully delete tournament'}, status=200)
